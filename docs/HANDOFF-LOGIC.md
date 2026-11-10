# 逻辑系统重做交接清单

本文件是给下一个 agent 的交接说明。当前维护页仍然生效，未经用户明确同意不要删除 `.maintenance`，也不要更新 Toy。

## 0. 当前基线

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
