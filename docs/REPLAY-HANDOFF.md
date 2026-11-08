# set.mm 证明重放器：交接大纲

> 交接对象：另一个实现 agent  
> 仓库：`D:\Random Things\RusselL`  
> 基线：`main` @ `284d1db`，工作树干净  
> 当前测试：`npm test` 43 项 + 240 关、`npm run test:ui` 143 checks、`npm run test:acceptance` 193 checks

## 0. 一句话目标

把 set.mm 的**完整压缩证明**重放成可验证的证明 DAG，再把 DAG 接到公理板里，使 31 个“难证档案定理”可以作为**精确目标公式**出现，而不是只当已证引理使用。

这不是小工具；需要新增一层完整的 Metamath 表达式/证明运行时。当前 240 关和 `Logic` 公式层不要为了这个功能重写；用**并行子系统 + feature flag**接入。

## 1. 当前状态与已确认约束

### 1.1 已有内容

- 240 关：4 章 × 60，每章 12 手写 + 48 生成。
- 993 条 set.mm assertion-form 档案，`src/archive.js`，公式是**简化后的游戏公式**，不是 set.mm 原始断言。
- 31 个原“档案直连”关已改成推理关：难定理作为 archive 引理，目标是它的代入/闭包/定义变形。
- 游戏公式语言 `src/logic.js` 只有：
  - 命题原子
  - 谓词（参数只能是变元）
  - `¬ / → / ∨ / ∧ / ↔ / ∀ / ∃ / ∈ / =`
  - 没有类项、函数符号、嵌套 term、wff/setvar 类型区分。
- 引擎模块：`atom/not/imp/.../subst/replace/detach/all-intro/all-elim/exists-intro/exists-elim/syllogism/...`（见 `src/library.js` `PARTS` 与 `src/engine.js`）。

### 1.2 硬阻塞（实现前必须知道）

1. **set.mm 原始公式超出游戏 AST 表达能力**  
   `Logic.parse` 能解析简化后的 `x ∈ V`，但不能表示 `{ x | ph }`、`U.`、类抽象、函数项等。
2. **archive 公式不是原定理**  
   例如 `vex` 在档案里存的是 `x ∈ V`，而 set.mm 原始断言是 `∃x x ∈ V`。  
   **不能拿现有 archive 公式当重放目标**，必须回读 `assets/data/set.mm`。
3. **证明里大量使用 `$e` 假设**  
   例如 `mpbi`、`a1i`、`syl`。当前引擎没有“给定 `$e` 前提 + 变量替换后应用任意断言”的通用规则。
4. **证明 DAG 可能巨大**  
   set theory 目标的证明可能几十到几千步；直接铺到棋盘上不可玩，必须提前测量并设计 UI/降级策略。
5. **现有解析器只解码 label 引用，不保留证明帧/公式栈**  
   `research/parse-setmm.cjs` 的 `decodeCompressedProof` 只算 `refs/proofLength`；重放需要完整的 mandatory `$f/$e`、公式 token、栈、替换。

## 2. 方案选择（建议先锁这个）

### 方案 A：并行 MM 公式/证明子系统（推荐）

不改 `src/logic.js` 的现有公式语义；新增：

- `src/mm/`：完整 Metamath token 公式、替换、统一、证明重放、DV 检查。
- 新关卡类型 `mode: "mm-proof"`：目标用完整 set.mm 公式 token 表示。
- 新 UI：证明步骤面板/逐步重放，而不是把几百个节点铺到走线棋盘。
- 现有 240 关完全不动；feature flag 默认关闭。

优点：风险隔离、能覆盖集合论、可先离线验证。  
缺点：新增一套公式渲染/比较/关卡 UI，工作量接近一个子系统。

### 方案 B：把 `Logic` AST 直接扩成完整 Metamath 表达式

优点：一套公式语言，最终棋盘可复用。  
缺点：会波及解析、格式化、存档、走线、关卡生成、全部 240 关；风险远大于 A。  
**不建议作为第一步。**

### 方案 C：只重放命题/谓词短证明

能给 CH1/部分 CH2 精确目标，但集合论仍做不到。作为 A 的降级路径可以，不作为最终交付。

## 3. 推荐架构

```
assets/data/set.mm
  └─ scripts/mm-build-frames.js
       → research/mm-frames.json          （完整 frame：math tokens、$f/$e、DV、proof tokens）
       → scripts/mm-verify.js            （压缩证明 → 证明 DAG，带替换/前提）
       → research/mm-proofs/<label>.json （仅 31 个目标，剪枝后的 DAG）
       → scripts/mm-to-level.js          （DAG → 游戏关卡 + 参考重放证书）
            → src/mm-levels.js           （生成，独立于 levels-generated.js）
            → src/mm/proofs.js           （压缩后的证明步骤数据）
```

### 3.1 `src/mm/expr.js`：MM 公式层

不要先用 AST 解析 set.mm；**先按 token 序列做重放**，最后再转显示。

数据结构建议：

```js
// 公式 = token 数组；变量名通过 frame 的 $f/$v 区分
{
  label: 'pm3.24',
  kind: '$p',
  math: ['|-', '-.', '(', 'ph', '/\\', '-.', 'ph', ')'],
  mandatory: [
    { label: 'wph', kind: '$f', math: ['wff', 'ph'], var: 'ph' }
  ],
  proofTokens: ['(', 'wi', 'wn', 'wa', 'id', 'iman', 'mpbi', ')', 'AABAACDCAEAAFG']
}
```

必须实现：

- `substTokens(tokens, map)`：按 Metamath 语义做直接替换（wff 变元可含被约束变元）。
- `unify(pattern, actual)`：pattern 里的变量（wff/setvar）绑定到 token 序列；常量必须逐 token 相等。
- `applyAssertion(assertion, poppedFormulas)`：
  - 弹出哪个数量？**只按 `$e` 数量弹**；`$f` 是变量声明，不是栈操作数。  
  - 用 `$e` 公式与栈公式统一，得到替换；再把替换应用到断言结论。
- `checkDv(dvPairs, substMap)`：先做基本冲突检测；完整 DV 可作为第二阶段。
- `tokenToUnicode` / `tokenToGame`：显示；`tokenToGame` 只在目标公式能映射到现有 AST 时使用。

### 3.2 `scripts/mm-build-frames.js`

- 复用/扩展 `research/parse-setmm.cjs`，但**不要依赖 `setmm-data.json`**，它没有证明帧。
- 产物 `research/mm-frames.json`：
  - 所有 `$a/$p/$f/$e/$v/$d` 的 label、kind、math、mandatory、DV、proofTokens。
  - 只保留 `set-pred.mm / set-class.mm / set-zf.mm / set-zfc.mm`。
- 验收：能查到 31 个目标每个的 proofTokens 和 mandatory。
- 注意：当前 `parseDatabase` 的 `arityOf` 用 `mandatory.length`，不能直接当“应用时弹栈数”；必须按 `$e` 数量重算。

### 3.3 `scripts/mm-verify.js`

输入 label，输出验证后的证明 DAG：

```js
{
  label: 'pm3.24',
  conclusion: ['|-', '-.', ...],
  steps: [
    {
      id: 's0', label: 'id', kind: 'assert',
      inputs: [],                 // $e 前提的 step id
      subst: { ph: [...] },       // 变量 → token 序列
      conclusion: [...]           // 应用后的公式
    }
  ],
  finalStep: 's...',
  stats: { steps: 14, maxDepth: 8 }
}
```

要求：

- 对 31 个 hard labels 全部运行，输出成功/失败报告。
- 失败必须给可定位原因（未知 label、DV、未支持语法），不能静默跳过。
- 验收样例：`pm3.24`、`pm2.07`、`alex`、`ax8`、`axacnd`。
- 先不做 DAG 最小化；先证明“能完整验证”。

### 3.4 证明 DAG → 关卡

只有当 3.3 在 31 个目标上全部通过才开始这一步。

建议先做**只读重放关卡**：

- `level.mode = "mm-proof"`，`level.targetTokens` 是完整 set.mm 结论。
- `level.proofId` 指向 `src/mm/proofs.js` 中的 DAG。
- 初始化时只展示目标/依赖引理；玩家按“下一步”重放证明；每步显示 label、替换、结论。
- 不做“把每步铺到棋盘”的版本，除非 DAG 实测很小。

如果必须接入棋盘：

- 新增模块 `mmstep`：`config={label, subst}`，输入 `$e` 前提，输出结论。
- `allowed` 只包含该关 DAG 用到的 archive/axiom/`mmstep`；**不能包含目标定理自身**。
- 参考电路用 DAG 生成，`Engine` 对 MM token 公式求值。
- 需要新渲染：token 公式文本、`mmstep` 节点端口数由 `$e` 数量决定。

### 3.5 UI 与性能

先测量 31 个 DAG 的 `steps`、`nodes`、`max fan-in`、JSON 大小。  
决策阈值建议：

- `steps <= 80`：可考虑棋盘/分页重放。
- `steps > 80`：只做证明步骤列表/时间轴，不做自由连线。
- `steps > 800`：只做折叠分段/导出报告，不进入可玩关卡。

## 4. 工作包与验收

### WP0 基线（0.5 天）

- 新建分支（如 `feat/mm-replay`）。
- 记录基线测试全部通过。
- 加 feature flag（默认关闭），不改现有 240 关行为。
- 验收：`git diff` 不含 `levels.js` / `levels-generated.js` 语义变化。

### WP1 完整 frame 提取（2–4 天）

- 扩展 `research/parse-setmm.cjs` 的导出能力；新增 `scripts/mm-build-frames.js`。
- 验收：目标 label / mandatory / proofTokens / DV 可查询；31 个 hard label 全部存在。

### WP2 证明验证/重放（3–5 天）

- 实现 token 替换、统一、`$e` 应用、压缩证明栈重放、DV 基本检查。
- 验收：至少 `pm3.24`、`pm2.07`、`alex`、`ax8` 完整验证；生成步骤数报告。
- 全部 31 个目标跑一遍；失败列表必须可复现。

### WP3 DAG 剪枝与产物（2–3 天）

- 只保留被目标最终节点依赖的步骤；去掉未使用语法构造（如果重放不依赖）。
- 输出 `src/mm/proofs.js`（压缩 JSON/字符串）。
- 验收：每个 DAG 可离线重新验证；文件大小有上限（建议 < 2 MB）。

### WP4 关卡/公式接入（3–6 天）

- 方案 A：新增 `mm-proof` 关卡模式与 token 目标。
- 或方案 B：新增 `mmstep` 模块并接 `Engine`。
- 验收：至少 1 个精确目标关（建议 `pm3.24`）载入、参考 DAG 校验通过、失败时给明确错误。

### WP5 UI（3–7 天）

- 证明步骤面板：步骤列表、当前 step、前提/结论、替换 map、上一步/下一步。
- 大 DAG 分页/折叠；键盘可操作；移动端可用。
- 验收：31 个目标都能打开；不卡死；无需把 DAG 铺到画布。

### WP6 回归与文档（2 天）

- 保持现有 `npm test` / `test:ui` / `test:acceptance` 全绿。
- 新测试：MM 单元测试、DAG 验证测试、至少 1 个端到端重放关。
- 文档更新 `docs/ARCHITECTURE.md`、`docs/metamath.md`、本文件。

## 5. 交付分层（Definition of Done）

### Tier 1：离线重放器

- CLI 输入 label，输出验证通过的证明 DAG。
- 31 个 hard label 有明确报告（成功/失败/原因）。
- 不影响现有游戏。

### Tier 2：精确目标关卡（只读）

- 31 个目标可载入，目标公式来自 set.mm 原始结论。
- 证明步骤可逐步重放；参考证明校验通过。
- 现有 240 关仍全绿。

### Tier 3：可交互

- 玩家可以自己选择下一步断言/替换，而不是只看回放。
- 有提示/错误反馈/进度。
- 大证明不卡死。

**不要在 Tier 1 之前改可玩关卡；不要用“目标=档案定理本身”或“单节点重放模块”冒充重放。**

## 6. 风险与备选

1. **完整 token 重放也失败**（DV、语法、未知 label）：  
   先把失败样例列出来；如果集中在少数标签，补 frame；如果集中在集合论，退回 Tier 1 报告，不硬接关卡。
2. **DAG 太大不可玩**：  
   改只读重放/折叠；不要为了“可玩”把证明截断。
3. **公式显示**：  
   先显示原始 token 串（等宽），再做美化；不要阻塞重放。
4. **与当前 archive 公式冲突**：  
   MM 模式使用独立 token 公式；不要试图把现有简化 archive 反向还原成完整公式。
5. **DV 不完整**：  
   Tier 1/2 明确标注“DV 检查覆盖范围”；不要声称完整 Metamath 验证器。

## 7. 快速检查清单（交给下一个 agent 的第一条消息）

- 先读：`docs/ARCHITECTURE.md`、`docs/metamath.md`、`research/parse-setmm.cjs`、`scripts/prove.js`。
- 不要先动：`src/logic.js`、`src/levels-generated.js`、`src/archive.js`、240 关 UI。
- 第一个提交只做：`scripts/mm-build-frames.js` + 31 个 hard label 的 frame/proofTokens 提取报告。
- 第二个提交再做：`scripts/mm-verify.js` 验证 `pm3.24`。
- 第三个提交再决定：只读重放关卡，还是 `mmstep` 棋盘模块。
- 每阶段必须跑：`npm test`、`npm run test:ui`、`npm run test:acceptance`。

## 8. 附录：31 个 hard label 与当前生成器位置

当前生成器 `scripts/gen-levels.js` 的 `HARD_LABELS` 与 `hardPlan()` 已经把这些 label 当作“引理 + 代入/闭包/定义推演”使用；重放器要替换的是这个策略，不是删掉这些 label。

- 命题（CH1-13..20）：`pm3.24, pm2.07, simp2, 3mix1, pm2.5, pm3.11, simprrr, simpr12`
- 谓词（CH2-13..18）：`alex, ax-11, exancom, 19.31v, 3exdistr, 19.33b`
- 等词（CH3-13..18）：`equequ1, ax8, axc16, axc11r, equvel, 19.12vvv`
- 集合（CH4-13..23）：`vex, vneqv, fin41, en3lp, eqtr2, axprlem1, ax-pr, axunnd, oneltri, axrep1, axacnd`

集成时必须保留的现有产品约束：

- 目标不能直接是同一 label 的 archive 模块；否则又变成“拖档案通关”。
- 命题章不出现谓词/量词元件；每关 `allowed` 只含实际需要的模块。
- 现有 240 关保持可玩；新重放关用独立模式/feature flag，不要污染现有生成器，除非新方案已验证。
- 游戏内命题变元只允许 `PQRSTUVWXYZABC`；集合论的 setvar 是另一套命名，不受此限制。

## 9. 建议给下一个 agent 的启动提示词

```text
你在仓库 D:\Random Things\RusselL（分支 main，基线 284d1db）实现 set.mm 证明重放器。
先读 docs/REPLAY-HANDOFF.md，严格按 Tier 1 → Tier 2 → Tier 3 推进。
第一步只做 scripts/mm-build-frames.js：从 assets/data/set.mm 提取 31 个 hard label 的完整 frame（math tokens、$f/$e、DV、proofTokens），输出 research/mm-frames.json 和报告。
不要先改 src/logic.js / src/levels-generated.js / src/archive.js / 现有 240 关。
每阶段结束后运行 npm test、npm run test:ui、npm run test:acceptance，并报告失败列表。
Tier 1 的目标是离线验证 pm3.24 等目标；没有验证通过前不要接可玩关卡。
```
