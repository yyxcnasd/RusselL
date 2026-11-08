# 重放关 / 普通关底层融合方案（RFC，待拍板）

> 仓库：`D:\Random Things\RusselL`（`main` @ `0661de8`）
> 现状：288 关（240 接线 + 48 重放）看起来已经在同一块棋盘上，但**底层仍是两套并行的表达式、
> 求值器、模块表、关卡 schema 与关卡流程**；本文件给出彻底融合的方案、阶段、风险与验收。
> 本文只做方案，不改代码；需要拍板的决策在 §4。

## 0. 结论摘要

- **问题定性**：不是 UI 不一致，而是**两套运行时**。重放关走 `MM.Graph`/token，普通关走
  `Engine`/Logic AST；两套模块、两套关卡数据、两套流程分支、两套公式比较与渲染。新功能要贴两遍
  （难度公式、目标渲染、错误提示、通关面板都是双份），91 处 `mm` 专用标记散在 15 个文件里。
- **推荐方案**：把 **canonical set.mm token 表达式** 作为唯一核心表示，`Logic` AST 降级为
  “作者侧编译器 / 测试参考实现”；同时统一模块注册表、关卡 schema、求值管线、流程、渲染、存档。
  这不是把重放塞进游戏，而是**把游戏公式看成 set.mm token 的一个受限子集**（可行且可证明）。
- **工作量**：7–9 人日（单 agent），风险集中在 P2（模块迁移双跑）与 P5（渲染融合）。
- **降级方案**：只统一管线与流程、用 Formula 适配器隔离两种表达式（3–4 人日）；能消掉流程分叉，
  但表达式/求值仍是两套，不推荐作为最终态（§9）。
- **不可逆结论**：set.mm 的类抽象、函数项、任意嵌套 term **无法**表示进现有 Logic AST，
  所以方向只能是“Logic → token”，不能是“token → Logic”。

## 1. 现状：两套系统到底分在哪

### 1.1 分层对照（附证据）

| 层 | 普通关 | 重放关 | 分叉点 | 代价 |
| --- | --- | --- | --- | --- |
| 公式表示 | `Logic` AST（简化语言：原子/谓词/¬→∨∧↔∀∃∈=） | set.mm token 串（可含类抽象/函数项） | `src/logic.js` 37 KB vs `src/mm/expr.js` 8.6 KB | 两套公式语义 |
| 公式比较 | `Logic.eq`（定义展开 + α 等价） | `Expr.key`（token 精确相等） | `logic.js` vs `expr.js` | 同一目标两种“相等” |
| 求值 | `Engine.evaluate`（AST，topo + 21 模块） | `MM.Graph.evaluate`（token，topo + 2 模块） | `src/engine.js` 24.6 KB vs `src/mm/graph.js` 13.4 KB | 两个错误模型 |
| 模块表 | 21 个 AST 模块（atom…exists-elim） | `mmhyp` / `mmstep`（8 端口按 arity 裁剪） | `engine.js` MODULES vs `graph.js` | 端口/配置语义两套 |
| 关卡数据 | `target` 字符串、`allowed` key 列表、`solution` 电路 | `targetTokens`、`proofId`、`stats`，图在运行时生成 | `src/levels*.js` vs `src/mm/levels.js` | 两种 schema |
| 关卡流程 | `loadLevel` 正常分支 → `refresh` → `check` → `win` | `loadMmLevel` → `refresh`(Graph) → `mmCheck` → `mmWin` | `main.js:215,320,577,675,789` | 近 200 行双份流程 |
| 关卡目录 | `Catalog.build` + `partsForLevel(allowed)` | 同函数里按 mode 取 `MM_LEVELS`、按 proof 生成 palette | `catalog.js:70,92,107,114` | 目录逻辑混两种来源 |
| 棋盘走线 | A* 避障（`Route.route`） | 简单正交折线（`board.simpleWires`） | `board.js:795` | 按 mode 分支 |
| 公式渲染 | `UI.formulaHTML`（全括号 AST） | `window.RSL.formatTokens` 钩子（token） | `ui.js` vs `main.js:964` | 两个渲染器 |
| 通关面板 | `Screens.openWin` | `Screens.openMmWin` | `screens.js:229` | 两个面板 |
| 存档 | 存 `circuits`，`bestLen` = 模块数 | 不存电路，`bestLen` = 断言节点数 | `save.js` / `main.js:mmWin` | 双语义 |
| 成就 | 240 关进度/规则/长度 | 被 `mode !== 'mm-proof'` 过滤 | `achievements.js:34` | 特例过滤 |
| 难度 | `N + 0.1·AST` | `1.4 + 2.2417·log2(1+steps)` | `Catalog.difficultyOf` | 两把尺子（可接受） |
| 测试 | 240 关引擎求值 | 48 个图求值 | `tests/levels.test.js` vs `mm-*.test.js` | 两套心智模型 |

### 1.2 量化

- `mm` 专用标记（`mm-proof|mmMode|simpleWires|formatTokens|MM.Graph|MM.Expr|is-mm`）
  在上述文件里 **91 处**，分布在 15 个文件中的 11 个。
- 同一概念有两份实现：目标渲染（`UI.goalHTML` / `Expr.toHTML`）、错误提示
  （`check()` / `mmCheck()`）、通关面板（`openWin` / `openMmWin`）、难度（两个公式）、
  模块端口（两套 registry）、拓扑与错误模型（两份 `topo`）。
- 新功能的“双写成本”已被验证：这一轮加“重放关”时，目标渲染、通关、错误提示、成就过滤、
  进度、目录都各写了两遍；再加重放玩法时又重写了第三遍（面板 → 棋盘）。

**结论：继续在现有结构上加功能，成本是线性叠加而不是复用。必须合并。**

## 2. 目标架构

### 2.1 唯一表达式核心：canonical token term（`src/term.js`）

**值 = token 数组，首 token 是类型码**，与 set.mm frame 的 `$f`/`$e`/结论完全同构：

| 场景 | 值示例 |
| --- | --- |
| 普通关原子 | `['wff', 'P']` |
| 普通关 `P→(Q→P)` | `['wff', '(', 'P', '->', '(', 'Q', '->', 'P', ')', ')']` |
| 普通关目标 | `['|-', ...同上...]` |
| 重放关前提 `wph` | `['wff', 'ph']` |
| 重放关目标 | `['|-', '-.', '(', 'ph', '/\\', '-.', 'ph', ')']` |

**canonical 形式（核心契约）**：
1. 二元运算与绑定子式一律**全括号**（`wi`/`wa`/`wo`/`wb`/`wal`/`wex` 的 syntax 形态）；
2. 糖（`∨ ∧ ↔ ∃`）保留在 token 里用于显示，**比较时展开**成 `¬/→/∀`（与今天
   `Logic.expand` 完全相同的 4 条 `df-or/df-an/dfbi2/df-ex` 规则）；
3. 绑定变元按出现顺序做 α 规范化（`x1, x2…`）；
4. 类型码（`wff` / `|-`）必须一致才算相等。

**API**（一个文件，纯函数，Node + 浏览器双导出）：

```js
Term.subst(tokens, sub)            // 盲替换（wff 变元可含被约束变元）
Term.apply(frame, inputs)          // $f 绑定 + $e 逐 token 比对 + 结论替换（= 现有 Expr.applyAssertion）
Term.read(tokens, ctx) -> node?    // 按元数派生结构视图（replace/detach/subst 规则用）
Term.normalize(tokens, ctx)        // 糖展开 + 定义展开 + α 规范化（= 现有 Logic.expand+key）
Term.eq(a, b, ctx)                 // 规范化后逐 token 比较（= 现有 Logic.eq）
Term.render(tokens, opts) -> HTML  // 全括号 → 最小括号的 pretty-print（= 现有 Logic.toHTML/fmt）
Term.parse(text, ctx)              // 作者侧文本 → token（= 现有 Logic.parse）
Term.vars(tokens, ctx)             // 变元/原子集合（= atomsOf/freeVars 的 token 版）
```

**“方言”不是第二套运行时**：普通关的变元是 `PQRSTUVWXYZABC / x y z / F G H`，重放关的变元由
frame 的 `$f` 决定；两者都只是 token 名字，由关卡上下文 `ctx.vars` 提供。模块实现只依赖 token
与 ctx，不认识“关卡类型”。

**方向论证（为什么不是把 set.mm 塞进 AST）**：`{ x | ph }`、`U. A`、`+o`、任意函数项都不是现有
AST 的节点；改造 AST 等于重写 `logic.js` 的语义并波及全部 240 关与 993 条档案——风险和本方案
同一量级，但收益更小（仍要处理两套比较/渲染）。token 则是 set.mm 的原生表示，普通关公式是其
**受限子集**，合并只会“收窄”，不会“失真”。

### 2.2 唯一模块注册表（`src/modules.js`）

```js
{
  kind: 'imp',
  group: 'build',                       // build | rule | source
  inputs: [{ id: 'a', type: 'wff' }, { id: 'b', type: 'wff' }],
  output: 'wff',
  config: { },
  source: false,                        // 反作弊用：是否“产生断言”
  apply(inputs, config, ctx) -> tokens  // 失败抛 ModuleError（带中文可定位消息）
}
```

- 普通关 21 个模块与重放关 `mmhyp` / `mmstep` 用**同一接口**；`mmstep` 只是
  `inputs: dyn(arity)` + `apply = Term.apply(frame, inputs)`；`archive/axiom/theorem` 变成
  “数据模块”（`apply` 返回预编译 token）。
- `Engine.info(kind)` 由注册表派生，不再有第二份端口元数据；动态端口（`subst` 的 5 组、
  `mmstep` 的 arity）统一为 `inputs(ctx.config)` 函数。
- **反作弊统一**：目标上游必须出现 `source: true` 的模块（公理/定理/档案/规则/mmstep/mmhyp）。
  重放关天然满足，不需要再为它写豁免分支。

### 2.3 统一关卡 schema（v3）

```js
{
  id, chapter, band, track: 'wiring' | 'replay',   // track 只影响文案/成就，不影响执行
  targetTokens: ['|-', ...],
  initialNodes: [{ id:'target', kind:'target', ... }, ...],  // 重放关额外有前提节点
  palette: [{ kind:'imp', config:{} }, { kind:'mmstep', config:{label:'mpbi',arity:4} }, ...],
  solution: { nodes, edges } | null,               // 参考电路（普通关）或参考证明图（重放关）
  reference: { steps, plan } | null,               // 重放关提示用；普通关为 null
  meta: { title, note, code, stats, difficulty }
}
```

- 普通关的 `target` 字符串由 `scripts/gen-levels.js` **在生成阶段编译成 `targetTokens`**
  （保留 `target` 到迁移结束，便于对拍与回滚）；`allowed` 编译成 `palette`。
- 重放关的 `palette` / `initialNodes` / `reference` 由 `scripts/mm-to-levels.js` 生成，
  运行时不再需要 `proofId` 之外的“图生成”逻辑（`proofs.js` 仍作为参考证明数据）。
- `Catalog.partsForLevel` 只读 `palette`；难度统一用 `difficultyOf(level)`（token 节点数 /
  证明步数映射到同一标尺，保留现有两条公式作为映射函数）。

### 2.4 单一求值管线

```
loadLevel → Board.setData(level.initialNodes) → Engine.evaluate(level, nodes, edges)
          → Board.paint → check → win
```

- `Engine.evaluate` 只保留一份：topo → 逐节点 `registry.apply` → 端口类型校验 →
  `{ results, errors, target, complete }`；结果里公式统一是 token。
- 走线策略变成**通用性能选项**：`board.simpleWires = nodes.length > 阈值`，不再按 mode。
- 大图（重放 139 节点/496 线）仍是“简单正交折线”，普通 18 节点仍 A*。

### 2.5 单一流程、存档与成就

- `loadLevel / refresh / check / win` 无分支；`win` 统一写 `circuits`（token 可序列化），
  `bestLen` 统一为模块节点数；重放关也保存自己的解，重进可回放。
- 存档升到 v3：`save.clean` 同时接受 v2（把 `target` 字符串在加载时编译成 token），
  v3 直接存 token；迁移脚本 + 单测覆盖。
- 成就与进度：`level.track` 决定“是否计入 240 关成就”（替代 `mode !== 'mm-proof'` 特例）；
  进度条统计全部关卡（可配置）。

### 2.6 统一渲染

- 唯一渲染器 `Term.render`：全括号 token → 与今天 `Logic.toHTML` 视觉一致的 HTML
  （最小括号省略规则、STIX 斜体、`⊢` 由外壳画）。
- 顶栏目标、节点公式、通关面板、目录卡片全部走它；删除 `formatTokens` 钩子。

## 3. 迁移阶段（每阶段独立可回滚）

| 阶段 | 内容 | 主要文件 | 验收门 | 回滚 | 人日 |
| --- | --- | --- | --- | --- | --- |
| **P0 特征化基线** | 生成 golden：240 关参考电路逐节点结果、全部节点/目标公式的旧渲染 HTML、48 个重放图求值结果、993 条档案+20 公理公式 | `tests/golden/*`、`scripts/golden.js` | golden 与当前程序逐字节一致 | 纯新增 | 0.5 |
| **P1 term 核心** | `src/term.js`（§2.1）+ `compileFormula` + 渲染/比较对拍；不接产品 | `src/term.js`、`scripts/term-diff.js` | 对拍：240 目标 + 约 2700 条公式的 `eq/render` 与旧实现 0 差异（白名单≤N 处需批准） | 删文件 | 1.5 |
| **P2 模块注册表** | 21 个模块 token 移植；双跑 `Engine` 旧/新对 240 关所有参考电路逐节点比对；`?engine=token` 开关 | `src/modules.js`、`src/engine.js` | 双跑 0 差异；`npm test` 全绿；开关关闭时行为不变 | 开关关掉 | 2 |
| **P3 数据/目录** | 生成器输出 `targetTokens/palette`；`Catalog` 去 mode；重放关生成 `palette/initialNodes/reference`；存档 v3 | `gen-levels.js`、`mm-to-levels.js`、`catalog.js`、`save.js` | 288 关全部可载入；目录/难度/解锁链与现在一致；v2 存档可升级 | 保留旧生成器输出 | 1.5 |
| **P4 流程融合** | 删 `loadMmLevel/mmCheck/mmWin/formatTokens`，统一 `loadLevel/refresh/check/win`；统一通关面板 | `main.js`、`screens.js`、`achievements.js` | 8 个浏览器套件全绿；重放关与普通关走同一回调 | 分支回滚 | 1 |
| **P5 渲染/棋盘融合** | `UI` 改 token 渲染；`Board` 去掉 mm 特判；走线阈值化；删除 `Logic` 运行时依赖 | `ui.js`、`board.js`、`engine.js` | 视觉对拍 0 差异（或已批准白名单）；性能预算达标 | 逐个文件回滚 | 1 |
| **P6 清理** | `src/mm/*` 合并进 `src/core/*`；`Logic` 仅留作者工具或删除；`grep` 门禁；文档 | 全仓 | §6 清单全部满足 | — | 0.5 |

**总估算 7.5–9 人日**（单 agent）；关键路径 P1→P2→P3，P4/P5 可与 P3 部分并行（Team 分工见 §7）。

### 各阶段门禁（每次提交都要跑）

```
npm test、npm run test:ui、npm run test:acceptance、npm run build:mm
+ 新增：node scripts/golden.js --check（P0 后）
+ 新增：node scripts/term-diff.js（P1 后）
+ 新增：node scripts/dual-run.js（P2 后，逐节点 0 差异）
```

## 4. 需要拍板的决策

| 决策 | 选项 | 建议 |
| --- | --- | --- |
| **D1 表达式核心** | A. canonical token（本方案）；B. 保留双表达式 + Formula 适配器隔离 | **A**。B 治标不治本（§9） |
| **D2 渲染一致性** | A. 用 golden corpus 保证逐字符一致；B. 允许少量括号/空格 diff（人工审） | **A**；若 P1 对拍出现 >20 处差异再讨论 B |
| **D3 存档** | A. v3 + 自动升级 v2；B. 只加字段不升版本 | **A**（重放关要能回放解、公式变 token 必须升版） |
| **D4 `scripts/prove.js`（40 KB 证明搜索器/电路生成器）** | A. 一起迁移到 token；B. 加 token 适配层，P5 后再迁 | **B**（它不是产品运行时，先隔离风险） |
| **D5 时间盒** | P2 超过 2.5 人日、或双跑差异无法在 0.5 人日内收敛 | 自动触发 §9 降级方案，先交付“流程统一” |

## 5. 风险与对策

| 风险 | 权重 | 触发信号 | 对策 |
| --- | --- | --- | --- |
| 240 关等价语义回归（定义展开/α/类型码细微差异） | 最高 | P1 对拍差异 > 白名单；P2 双跑出现 `valid→error` | golden + 双跑；差异按“先修 term，再改期望”处理 |
| 公式显示变化（括号/空格） | 高 | P5 视觉对拍 diff | 保留旧渲染器做对照；差异逐条人工审 |
| token 模块移植（replace/detach/∀I/∃E 的捕获规避） | 高 | P2 双跑失败集中在 4 个规则模块 | 先做 `Term.read` 结构视图；模块逐个迁移、逐个对拍 |
| 生成器改 token 后 993 条档案/240 关产物变化 | 中 | `git diff src/archive.js src/levels-generated.js` 非预期 | 生成器先“双写”（旧字段 + 新 token 字段），P6 再删旧字段 |
| 存档/成就语义漂移 | 中 | v2 存档升级测试失败；成就条件变化 | 独立迁移脚本 + 单测；成就改 `track` 判断并回归 |
| 测试改造面（71 单测 + 238 浏览器 checks + 251 验收） | 中 | 断言里的关数/公式字符串失效 | 抽 `tests/lib/expectations.js` 常量；分阶段改断言 |
| 大棋盘性能 | 低 | axacnd 载入/推进 >2s | 走线阈值 + 只在可见区渲染（已有 pan/zoom 基础） |
| `scripts/prove.js` 与 `gen-levels` 耦合 | 低 | 生成器报错 | D4：适配层隔离 |

## 6. 验收清单

**产品**
- 240 接线关 + 48 重放关全部可载入、可玩、可通关；两者共用同一棋盘/模块/流程。
- 重放关不再需要 `?mm=1` 之外的特殊开关语义（开关只决定“重放段是否出现在目录”）。
- 公式显示与今天一致（或差异已批准并记录）。

**代码（硬门禁）**
- `grep -R "mode === 'mm-proof'" src/` → 0（`track` 字段除外）。
- `grep -R "formatTokens\|loadMmLevel\|mmCheck\|mmWin\|simpleWires" src/` → 0（或只剩通用选项名）。
- `Engine.evaluate` 只有一份；模块注册表只有一份；公式渲染只有一份。
- `src/logic.js` 不再被运行时引用（若保留，只在 `scripts/`、`tests/` 中）。

**测试**
- 原有套件全绿；新增 `term-diff`、`dual-run`、golden 校验进入 `npm test`。
- 性能：240 关首次载入/切换 < 当前基线 ×1.2；axacnd 参考推进 < 2s。
- 存档：v2 存档可升级并继续玩；重放关解可保存/回放。

**文档**
- `ARCHITECTURE.md` 的模块/数据流只有一条；`MM-REPLAY.md` 不再描述第二套运行时；
  `DESIGN.md` 记录唯一的公式渲染规则；`README` 的玩法文案两关一致。

## 7. 分工建议（Agent Teams）

| 角色 | 负责 | 写入边界 |
| --- | --- | --- |
| Lead | P1 term 核心、P2 模块注册表、双跑门禁、最终收口 | `src/term.js`、`src/modules.js`、`src/engine.js`、`scripts/term-diff.js`、`scripts/dual-run.js` |
| teammate A（数据/生成器） | P3：`gen-levels.js` / `mm-to-levels.js` 输出 token/palette/initialNodes、catalog 去 mode | 生成器 + `src/catalog.js` + 生成产物 |
| teammate B（对拍/视觉） | P0 golden、渲染对拍工具、P5 视觉回归 | `scripts/golden.js`、`tests/golden/*`、`scripts/render-diff.js` |
| Lead + A | P4/P6 流程与清理 | `src/main.js`、`src/screens.js`、`src/ui.js`、`src/board.js` |

并行边界：P1 完成前 A/B 只做“不改运行时”的产出（golden、工具、生成器双写），避免写冲突；
P2 双跑绿了才允许动 `main.js`。

## 8. 交付物

1. 本方案（本文）与拍板记录。
2. P0 golden 数据 + `scripts/golden.js`（可重复生成/校验）。
3. `src/term.js` + `scripts/term-diff.js`（对拍报告，含差异白名单）。
4. `src/modules.js` + `scripts/dual-run.js`（240 关逐节点比对报告）。
5. 生成器双写产物与 v3 存档迁移脚本。
6. 流程/渲染融合后的代码与全量测试报告（各阶段门禁输出）。
7. 更新后的 ARCHITECTURE / MM-REPLAY / DESIGN / README 与清理后的 `grep` 证据。

## 9. 备选：轻量统一（3–4 人日，降级方案）

只做“管线与流程统一”，不碰表达式核心：

- 定义 `Formula` 接口（`compare/render/apply/read`），Logic 与 token 各提供实现。
- `loadLevel/refresh/check/win`、棋盘、存档、成就全部去 mode 分支，统一走接口。
- 好处：风险低、能立刻消掉 §1.1 里 6 层的分叉；
- 坏处：表达式/求值/模块仍是两套（`Formula` 只是隔离层），新功能仍要写两个实现；
  §6 的“只有一份求值器/注册表/渲染器”无法满足。
- **定位**：只在 D5 时间盒触发时使用，不作为最终交付；长期仍应回到本方案 P1–P2。
