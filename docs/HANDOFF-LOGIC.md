# 逻辑系统重做交接清单

本文件是给下一个 agent 的交接说明。当前维护页仍然生效，未经用户明确同意不要删除 `.maintenance`，也不要更新 Toy。

## 0. 当前基线

> 以下是**重构前**的基线。本轮完成后实际为 **166 关 / 21 教学关**（6 个派生公理已删、9 个引理关已落地），
> 详见 §10。

- 分支：`main`
- 最新提交：`81f8baf`（原子参数弹层事件隔离）
- 关卡：**159**
  - 40 普通关
  - 96 困难关
  - 23 教学关
- 每章：10 普通 + 24 困难
- 普通关：5–20 元件，`mustUse` 非空，不能单 S 通关
- 困难关：`hint = null`
- 内部关卡编号：`Ⅰ-01`；显示：左上角/定理模块为浅色 `I/II/III/IV` 底纹 + `*NN`
- 维护页：`.maintenance` + `maintenance.html` + Pages workflow 条件发布
- Toy：上一版已发布，但本轮没有继续更新

## 1. 目标

把派生连接词从“公理模块”改成：

**原始语言 → D 定义 → 证明出来的引理 → 关卡引用**

而不是：

**公理模块 + S 元件直接产生派生规则。**

至少要解决：

- `and-intro-ax`
- `and-elim-ax`
- `or-intro-ax`
- `or-elim-ax`
- `iff-intro-ax`
- `iff-elim-ax`

这些现在都是希尔伯特式公理，不符合“A1–A3 + S/M 证明”的要求。

## 2. 原始语言约定

保留为原始符号/规则：

- `¬`
- `→`
- `∀`
- `∃`
- `∈`
- `=`
- A1–A3
- A5
- S、M
- ∀I、∀E*
- ∃I*、∃E
- 等词自反、Leibniz
- 集合公理：外延、空集、配对、并集

不要再把 `∧`、`∨`、`↔` 的引入/消去直接注册成公理模块。

## 3. D 定义设计

建议定义：

```text
A ∧ B := ¬(A → ¬B)
A ∨ B := ¬A → B
A ↔ B := (A → B) ∧ (B → A)
```

实现时确定一种统一策略：

1. **表面语法 + 规范化**：棋盘仍显示 `∧/∨/↔`，引擎在比较、定理引用、参考解验证前统一展开。
2. **纯原始语法**：目标和 tile 全部只显示 `¬/→`，不保留连接词构造器。

二选一，不要两套并存。建议保留表面语法，但 D 是唯一的定义入口。

D 模块要求：

- D-expand：把带定义连接词的公式展开成原始公式
- D-contract：反向收缩（如果界面需要）
- D 不算公理，不能凭空产生结论
- D 的输入输出必须经过 canonical token 比较
- 目标、定理引用、palette、参考解全部用同一套规范化

## 4. 派生规则必须做成关

以下每条都要先作为**普通关/引理关**证出来，再由困难关以定理模块引用：

- 合取引入
- 合取消去左/右
- 析取引入左/右
- 析取消去
- 等值引入
- 等值消去左/右

建议顺序：

1. D 展开教学
2. ∧ 的引入/消去
3. ∨ 的引入/消去
4. ↔ 的引入/消去
5. 困难关引用上述定理

## 5. 模块/引擎改动

### `src/modules.js`

- 删除六个 `and-* / or-* / iff-*` 公理模块
- 增加 D 模块
- 更新 `label`、`kindLabel`、`ports`、`apply`
- 保证 `construct` 标记正确：D 是定义重写，不是构造器，也不是公理

### `src/term.js`

- canonical token / 公式规范化
- 定义展开后的等价判断
- 需要时提供 `expandDefinitions(tokens)` / `contractDefinitions(tokens)`

### `src/engine.js`

- `Target` 比较前调用规范化
- 定理引用按规范化后的公式取目标
- 校验不能只靠构造模块拼公式
- `mustUse` 继续生效

### `src/board.js` / `src/catalog.js`

- D 模块的代号、端口、调色板 tile
- 定理 tile 仍用浅色罗马数字底 + `*NN`
- 不允许派生公理 tile 继续出现

### `campaign/proof.js` / `scripts/restructure-levels.js`

- 证明 DSL 增加 D 证明项
- 参考解编译时生成 D 节点
- 旧 `and-* / or-* / iff-*` 证明项迁移成 D + 定理引用

## 6. 内容迁移

1. 先备份当前 `src/levels.js` 和 `campaign/legacy-levels.json`
2. 扫描 40 普通 + 96 困难中所有派生连接词引用
3. 为每条派生规则建立引理关
4. 把困难关的派生规则子证明替换成定理引用
5. 普通关保持：
   - 10 关/章
   - 5–20 元件
   - `mustUse` 非空
   - 一对一提示
6. 教学关：
   - 增加 D 定义教学
   - 新规则教学浮窗只放符号流程，不放中文
7. 第二、三、四章重新审计：
   - 哪些是原始规则
   - 哪些是定义
   - 哪些是引理
   - 不再用“公理模块 + S”冒充派生规则

## 7. 已修 UI，不要回退

- 原子/个体参数弹层：
  - 点选项后保持节点选中
  - 弹层不拦截画布点击；空白处可穿透选中下面节点
- 左上角：浅色 `I/II/III/IV` 底 + `*NN`
- 深色模式：底纹使用浅色填充
- 教学关：单行横向滚动，不换行
- 教学浮窗：符号流程，不含中文
- 章节解锁：第 N 章在第 N−1 章普通关全部完成后解锁
- 下栏定理 tile：浅色罗马数字底 + `*NN`

## 8. 必跑验收

```bash
npm test
npm run test:wire
npm run test:leaderboard
node tests/game-ui.js
npm run test:acceptance
node scripts/export-solutions.js
```

额外必须检查：

- 所有关卡参考解逐关 Engine 求值通过
- 模块表里不再有 `and-intro-ax` / `and-elim-ax` / `or-intro-ax` / `or-elim-ax` / `iff-intro-ax` / `iff-elim-ax`
- 普通关全部 5–20 元件且 `mustUse` 非空
- 困难关 hint 为 null
- 每个 palette 中的非构造规则都有教学
- 章节解锁回归
- 深色模式截图
- 维护页仍然生效
- Toy 没有被误更新

## 9. 相关文件

- `src/modules.js`
- `src/engine.js`
- `src/term.js`
- `src/board.js`
- `src/catalog.js`
- `src/main.js`
- `src/hints.js`
- `src/levels.js`
- `src/simple.css`
- `scripts/restructure-levels.js`
- `campaign/legacy-levels.json`
- `tests/game.test.js`
- `tests/game-ui.js`
- `tests/acceptance.js`
- `docs/SOLUTIONS.md`
- `.maintenance`
- `maintenance.html`
- `.github/workflows/pages.yml`

## 10. 实际完成情况（verifier 收尾）

> 本节只记录实际跑通、实际检查过的内容；未做到或与契约有偏差的条目写在最后，不写“完全达成”。
> 验收日期：2026-11-10；`src/levels.js` 由 `scripts/restructure-levels.js` 重新生成后逐项实跑。

### 对照 §1 目标：派生连接词从“公理模块”改为“定义 + 引理关”

- 已做到：`and-intro-ax` / `and-elim-ax` / `or-intro-ax` / `or-elim-ax` / `iff-intro-ax` /
  `iff-elim-ax` 六个模块已从 `src/modules.js` 删除；模块表、palette、参考解三处都不再出现
  （测试逐关断言）。
- 已做到：9 条派生规则成为第Ⅰ章引理关 Ⅰ-11…Ⅰ-19；参考解只用 A1–A3 + S/M + 更早引理关
  `theorem` + `def-contract`，全部通过真实 `Engine.evaluate`。
- 已做到：困难关/普通关中的派生规则改为 `theorem` 引用引理关或更早编号关；
  `campaign/legacy-levels.json` 的 6 个派生节点由 `scripts/migrate-derived-modules.js` 迁移为
  `theorem → subst`，脚本幂等。
- 没有做到/限制：Ⅰ-16（析取消去）的原始语言参考解 **562 元件**，是从 A1–A3 真证 ∨E 的直接
  后果，不是数据错误；引理关不套普通关 5–20 的限制。

### 对照 §2 原始语言约定

- 保留：`¬`、`→`、`∀`、`∃`、`∈`、`=`、A1–A3、A5、S/M、∀I/∀E*、∃I*/∃E、等词自反、Leibniz、
  集合公理（外延/空集/配对/并集）；`npm test` 的模块表测试逐项断言。
- 已改：`∧ / ∨ / ↔` 不再是引入/消去公理模块，只是表面语法；`∃` 仍是原始符号（∃I*/∃E 以 ∃
  陈述），比较时按 `¬∀¬` 参与展开。

### 对照 §3 D 定义设计

- 已做到：`def-expand`（D）/ `def-contract`（D⁻），端口 `assertion` → `out`，`construct:false`，
  只重写公式，不能凭空产生结论（无 `⊢` 输入会等待/报错）。
- 已做到：`Term.expandDefinitions` / `Term.contractDefinitions` 公开；展开幂等、收缩与展开互逆到
  规范化；`T.eq` 语义不变；`fmt/toHTML` 保持表面语法。
- 已做到：第Ⅰ章教学关 vi（定义 D）/ vii（原始语法）演示定义入口；引理关参考解统一以
  `def-contract` 收回表面语法后接目标焊盘。
- 限制：`D⁻` 折叠按固定优先级（↔ → ∧ → ∨ → ∃）取一种表面写法；同一公式可能有多种表面写法，
  折叠结果与玩家手写不完全一致，但 `T.eq` 意义下等价。

### 对照 §4 派生规则必须做成关

9 关全部通过真实 Engine，单关元件数：

| 关 | Ⅰ-11 | Ⅰ-12 | Ⅰ-13 | Ⅰ-14 | Ⅰ-15 | Ⅰ-16 | Ⅰ-17 | Ⅰ-18 | Ⅰ-19 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 元件 | 118 | 8 | 145 | 138 | 107 | 562 | 9 | 9 | 9 |

每关 `band === 'lemma'`、`hard === false`、`no` 11–19、solution 含 `def-contract`、
palette/参考解无 6 个派生 kind、不强制 `mustUse`；困难关/后续关只以 `theorem` 引用。

### 对照 §5 模块/引擎改动

- `src/modules.js`：删除 6 个派生公理；新增 D/D⁻；`theorem` 仍拒绝引用当前及更晚关卡。
- `src/term.js`：新增公开 D API；不改显示、不改 `T.eq`。
- `src/engine.js`：**未改**。目标比较一直走 `T.eq`（已含定义展开），来源反作弊与 `mustUse` 保持原语义。
- `src/board.js` / `src/catalog.js`：D/D⁻ 代号与排序、删除 6 个派生分支；`src/screens.js` /
  `src/simple.css`：选关页 `band lemma` 分带（第Ⅰ章一行 9 格，`.band.lemma` 样式）。
- 未做：没有把 D 全量插回旧关卡；旧关卡通过迁移脚本改写，而不是逐关重排。

### 对照 §6 内容迁移

- 已做到：`restructure-levels.js` 生成 166 关 = 21 教学（第Ⅰ/Ⅱ/Ⅲ/Ⅳ章 7/6/4/4）+ 40 普通 +
  9 引理 + 96 困难；第Ⅰ章编号 Ⅰ-01…Ⅰ-10 普通、Ⅰ-11…Ⅰ-19 引理、Ⅰ-20…Ⅰ-43 困难，其它章不变。
- 已做到：普通关 5–20 元件（实测 9–20）且 `mustUse` 非空；困难关 `hint === null`；
  所有定理引用都指向数组里更早的关卡（含教学关引用第Ⅱ章 vi → Ⅰ-14）。
- 已做到：原 5 个基于派生公理的教学关删除，替换为 3 个符号教学关（第Ⅰ章 vi/vii、第Ⅱ章 vi）。
- 与契约偏差：契约 §7 写“159 → 168 关”，实际为 **166**（教学关 23 → 21：删 5 加 3），
  与“若教学关数量变化以最终值为准”一致。

### 对照 §7 已修 UI，不要回退

- `node tests/game-ui.js` 61 checks 全过：原子参数弹层保持选中、浅色罗马数字底纹、深色模式、
  教学浮窗只含符号、章节解锁、定理 tile、选关/帮助/提示/排行榜/成就面板、无 JS 错误。
- 帮助图例从 9 卡变为 **11 卡**（D、D⁻ 加入，可见文本仍全符号；中文说明只在 `title` 属性）。
- 深色截图：`screenshots/tutorial-dark.png`、`levels-dark.png`、`lemma-dark.png`、
  `game-dark.png`、`help-dark.png`；README 引用的浅色 `tutorial.png` / `levels.png` 也重拍为当前 UI。

### 对照 §8 必跑验收（实际输出）

| 命令 | 结果 |
| --- | --- |
| `npm test` | 7/7 pass（模块表、D API、166 关布局、schema、逐关 Engine complete、定理越界） |
| `npm run test:wire` | 10/10 pass |
| `npm run test:leaderboard` | 2/2 pass |
| `node tests/game-ui.js` | PASS（61 checks） |
| `npm run test:acceptance` | PASS（26 checks）；dist 28 files / 7112.4 KB |
| `node scripts/export-solutions.js` | 166 关、22476 行（非空 21472）、447.6 KB；`undefined` 0 处 |
| `node tests/screenshots.js` | PASS（7 checks）；浅色 2 张 + 深色 5 张 |

额外检查：

- 参考解逐关 Engine 求值：166/166 complete。
- palette / 参考解中 6 个派生 kind：0 个。
- 编号唯一；定理引用全部更早；普通关 5–20 元件且 `mustUse` 非空；困难关 `hint === null`。
- `.maintenance`、`maintenance.html`、`.github/workflows/pages.yml` 无改动（`git diff` 为空），维护页仍生效。
- Toy 相关文件无改动（`git status` 无 release/ 或 Toy 包改动），本轮未更新 Toy。

### 未做到 / 实际限制清单

1. Ⅰ-16 参考解 562 元件（全项目最大），普通关的 5–20 上限不适用于引理关。
2. 19 个编号关（另 3 个教学关：ii、iii、vii）的目标在 `contract(expand(target))` 后 token 序列
   与原文不同；显示层不变，只在 `D⁻` 输出/参考解末节点体现，`T.eq` 等价。
3. `D⁻` 折叠优先级固定，可能把玩家手写的另一种表面写法折叠成唯一形式。
4. 契约 §7「每个 palette 中的非构造模块都有教学」只差一项：`exists-elim` 在 3 个 palette 中出现
   但没有独立教学关（`theorem` 已由第Ⅱ章 vi 教学）。旧 `tests/game.test.js` 本就没有这条规则，
   本轮没有为此新增硬断言，也没有为了变绿放宽其它核心不变量。
5. 帮助图例 D/D⁻ 的中文说明只在 hover `title` 里，触屏看不到。
6. 维护页仍生效、Toy 未更新是**有意保持**，不是未完成项。
