# 公理板 · 96 关参考解法清单

> 由 `scripts/export-solutions.js` 从 `src/levels.js` 自动生成。每个参考电路都先经过真实 Engine 求值验证；
> 清单里的模块按参考电路中的节点顺序排列，接线单独列出，按 `模块.端口 → 模块.端口` 连即可。
> 目标槽的节点已在关卡棋盘上，标为 `[target]`。

## 快速索引

| 关 | 标题 | 目标 | 提示 | 模块/接线 |
| --- | --- | --- | --- | --- |
| i | 取出公理 | `⊢ ( P → ( Q → P ) )` | 接一块 A1。 | 1 / 1 |
| ii | 代入 | `⊢ ( ( R → Q ) → ( Q → ( R → Q ) ) )` | 取 A1，把 P 代入 (R→Q)。 | 6 / 6 |
| iii | 分离 | `⊢ ( S → ( P → ( Q → P ) ) )` | A1 与它的实例接 M。 | 10 / 12 |
| iv | 分配公理 | `⊢ ( ( P → ( Q → R ) ) → ( ( P → Q ) → ( P → R ) ) )` | 接一块 A2。 | 1 / 1 |
| v | 逆否公理 | `⊢ ( ( ¬ P → ¬ Q ) → ( Q → P ) )` | 接一块 A3。 | 1 / 1 |
| vi | 定义展开 | `⊢ ( ¬ ( P → ¬ S ) → ( Q → ¬ ( P → ¬ S ) ) )` | 先造一个含 ∧ 的断言，再用 D 展开成原始公式。 | 7 / 7 |
| vii | 定义收缩 | `⊢ ( ( P ∧ R ) → ( Q → ( P ∧ R ) ) )` | 先造原始公式，再用 D⁻ 折回 ∧。 | 9 / 9 |
| viii | 引用已证定理 | `⊢ ( ( P → Q ) → ( R → ( P → Q ) ) )` | 用 theorem 引用第 i 关，再代入。 | 8 / 8 |
| `01` | 同一律 | `⊢ ( P → P )` | 目标是 P→P。从最左的构造块开始，按参考接线接到 ⊢。 | 11 / 18 |
| `02` | 后件恒等 | `⊢ ( P → ( Q → Q ) )` | 目标是 P→Q→Q。从最左的构造块开始，按参考接线接到 ⊢。 | 8 / 13 |
| `03` | 前件自应用 | `⊢ ( P → ( ( P → Q ) → Q ) )` | 目标是 P→(P→Q)→Q。从最左的构造块开始，按参考接线接到 ⊢。 | 19 / 40 |
| `04` | 前件交换 | `⊢ ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) )` | 目标是 (P→Q)→(R→P)→R→Q。从最左的构造块开始，按参考接线接到 ⊢。 | 18 / 43 |
| `05` | 空真（爆炸） | `⊢ ( ¬ P → ( P → Q ) )` | 目标是 ¬P→P→Q。从最左的构造块开始，按参考接线接到 ⊢。 | 18 / 37 |
| `06` | 弱化公理 | `⊢ ( P → ( Q → ( R → Q ) ) )` | 目标是 P→Q→R→Q。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。 | 13 / 17 |
| `07` | 弱化加一层 | `⊢ ( P → ( Q → ( R → P ) ) )` | 目标是 P→Q→R→P。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。 | 21 / 29 |
| `08` | 前件收缩 | `⊢ ( ( P → ( P → Q ) ) → ( P → Q ) )` | 目标是 (P→P→Q)→P→Q。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。 | 9 / 10 |
| `09` | 析取引入右 | `⊢ ( Q → ( P ∨ Q ) )` | 目标是 Q→P∨Q。Q 给出 P∨Q，是公理 A1 的实例。 末尾用 D⁻ 把原始结论折回表面语法。 | 8 / 8 |
| `10` | 蕴涵传递 · 中间结论 | `⊢ ( ( R → R ) → ( Q → ( R → R ) ) )` | 目标是 (R→R)→Q→R→R。这是〈蕴涵传递〉证明里的一个中间结论，按接线把它单独证出来。 | 5 / 6 |
| `11` | 双重否定引入 · 中间结论 | `⊢ ( ¬ P → ( P → ¬ P ) )` | 目标是 ¬P→P→¬P。这是〈双重否定引入〉证明里的一个中间结论，按接线把它单独证出来。 | 6 / 7 |
| `12` | 否定蕴涵取后件 · 中间结论 | `⊢ ( ¬ ( P → Q ) → ( Q → ¬ ( P → Q ) ) )` | 目标是 ¬(P→Q)→Q→¬(P→Q)。这是〈否定蕴涵取后件〉证明里的一个中间结论，按接线把它单独证出来。 | 7 / 7 |
| `13` | 空真（爆炸） · 中间结论 | `⊢ ( ¬ P → ( ¬ Q → ¬ P ) )` | 目标是 ¬P→¬Q→¬P。这是〈空真（爆炸）〉证明里的一个中间结论，按接线把它单独证出来。 | 8 / 8 |
| `14` | 否定蕴涵取后件 · 中间结论 | `⊢ ( ¬ ( P → ¬ Q ) → ( ¬ Q → ¬ ( P → ¬ Q ) ) )` | 目标是 ¬(P→¬Q)→¬Q→¬(P→¬Q)。这是〈否定蕴涵取后件〉证明里的一个中间结论，按接线把它单独证出来。 | 9 / 10 |
| `15` | 合取消去左 · 中间结论 | `⊢ ( ¬ ¬ ¬ ( P → Q ) → ( ¬ ¬ ( P → Q ) → ¬ ¬ ¬ ( P → Q ) ) )` | 目标是 ¬¬¬(P→Q)→¬¬(P→Q)→¬¬¬(P→Q)。这是〈合取消去左〉证明里的一个中间结论，按接线把它单独证出来。 | 10 / 11 |
| `16` | 等值消去右 · 中间结论 | `⊢ ( ¬ ¬ ¬ ( P → ¬ Q ) → ( ¬ ¬ ( P → ¬ Q ) → ¬ ¬ ¬ ( P → ¬ Q ) ) )` | 目标是 ¬¬¬(P→¬Q)→¬¬(P→¬Q)→¬¬¬(P→¬Q)。这是〈等值消去右〉证明里的一个中间结论，按接线把它单独证出来。 | 11 / 12 |
| `17` | 否定蕴涵取后件二 · 中间结论 | `⊢ ( ( ¬ Q → ( R → ¬ Q ) ) → ( ¬ ( P → Q ) → ( ¬ Q → ( R → ¬ Q ) ) ) )` | 目标是 (¬Q→R→¬Q)→¬(P→Q)→¬Q→R→¬Q。这是〈否定蕴涵取后件二〉证明里的一个中间结论，按接线把它单独证出来。 | 12 / 14 |
| `18` | 否定蕴涵后件三 · 中间结论 | `⊢ ( ( ¬ Q → ( ¬ R → ¬ Q ) ) → ( ¬ ( P → Q ) → ( ¬ Q → ( ¬ R → ¬ Q ) ) ) )` | 目标是 (¬Q→¬R→¬Q)→¬(P→Q)→¬Q→¬R→¬Q。这是〈否定蕴涵后件三〉证明里的一个中间结论，按接线把它单独证出来。 | 13 / 15 |
| `19` | 双重否定引入 · 中间结论 | `⊢ ( ¬ ¬ ¬ P → ( ¬ P → ( P → ¬ P ) ) )` | 目标是 ¬¬¬P→¬P→P→¬P。这是〈双重否定引入〉证明里的一个中间结论，按接线把它单独证出来。 | 14 / 20 |
| `20` | 否定蕴涵取后件 · 中间结论 | `⊢ ( ¬ ¬ ¬ ( P → Q ) → ( ¬ ( P → Q ) → ( Q → ¬ ( P → Q ) ) ) )` | 目标是 ¬¬¬(P→Q)→¬(P→Q)→Q→¬(P→Q)。这是〈否定蕴涵取后件〉证明里的一个中间结论，按接线把它单独证出来。 | 15 / 20 |
| `21` | 否定后件换位 · 中间结论 | `⊢ ( ¬ ¬ P → ( P → ( ( P → ¬ Q ) → P ) ) )` | 目标是 ¬¬P→P→(P→¬Q)→P。这是〈否定后件换位〉证明里的一个中间结论，按接线把它单独证出来。 | 15 / 20 |
| `22` | 否定蕴涵取后件 · 中间结论 | `⊢ ( ¬ ¬ Q → ( Q → ( ¬ ( P → Q ) → Q ) ) )` | 目标是 ¬¬Q→Q→¬(P→Q)→Q。这是〈否定蕴涵取后件〉证明里的一个中间结论，按接线把它单独证出来。 | 16 / 22 |
| `23` | 否定蕴涵取后件二 · 中间结论 | `⊢ ( ¬ ( P → Q ) → ( ¬ Q → ( R → ¬ Q ) ) )` | 目标是 ¬(P→Q)→¬Q→R→¬Q。这是〈否定蕴涵取后件二〉证明里的一个中间结论，按接线把它单独证出来。 | 16 / 21 |
| `24` | 否定蕴涵取后件 · 中间结论 | `⊢ ( ¬ ¬ ¬ ( P → ¬ Q ) → ( ¬ ( P → ¬ Q ) → ( ¬ Q → ¬ ( P → ¬ Q ) ) ) )` | 目标是 ¬¬¬(P→¬Q)→¬(P→¬Q)→¬Q→¬(P→¬Q)。这是〈否定蕴涵取后件〉证明里的一个中间结论，按接线把它单独证出来。 | 17 / 23 |
| `25` | 否定蕴涵取前件 · 中间结论 | `⊢ ( ¬ ¬ ¬ ( P → Q ) → ( ¬ ( P → Q ) → ( ¬ P → ¬ ( P → Q ) ) ) )` | 目标是 ¬¬¬(P→Q)→¬(P→Q)→¬P→¬(P→Q)。这是〈否定蕴涵取前件〉证明里的一个中间结论，按接线把它单独证出来。 | 17 / 23 |
| `26` | 蕴涵传递 · 中间结论 | `⊢ ( ( P → Q ) → ( ( Q → ( R → R ) ) → ( ( Q → R ) → ( Q → R ) ) ) )` | 目标是 (P→Q)→(Q→R→R)→(Q→R)→Q→R。这是〈蕴涵传递〉证明里的一个中间结论，按接线把它单独证出来。 | 18 / 25 |
| `27` | 分情况一 · 中间结论 | `⊢ ( ( P → Q ) → ( P → ( ( ¬ P → Q ) → Q ) ) )` | 目标是 (P→Q)→P→(¬P→Q)→Q。这是〈分情况一〉证明里的一个中间结论，按接线把它单独证出来。 | 18 / 25 |
| `28` | 后件替换 · 中间结论 | `⊢ ( ( P → Q ) → ( ( R → ( P → Q ) ) → ( ( R → P ) → ( R → Q ) ) ) )` | 目标是 (P→Q)→(R→P→Q)→(R→P)→R→Q。这是〈后件替换〉证明里的一个中间结论，按接线把它单独证出来。 | 19 / 27 |
| `29` | 双重否定引入 · 中间结论 | `⊢ ( ( ¬ ¬ ¬ P → ¬ P ) → ( ¬ ¬ ¬ P → ( P → ¬ P ) ) )` | 目标是 (¬¬¬P→¬P)→¬¬¬P→P→¬P。这是〈双重否定引入〉证明里的一个中间结论，按接线把它单独证出来。 | 20 / 29 |
| `30` | 逆否 · 中间结论 | `⊢ ( ( ¬ ¬ P → P ) → ( ¬ ¬ P → ( ( P → Q ) → P ) ) )` | 目标是 (¬¬P→P)→¬¬P→(P→Q)→P。这是〈逆否〉证明里的一个中间结论，按接线把它单独证出来。 | 20 / 28 |
| `31` | 合取消去左 · 中间结论 | `⊢ ( ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) → ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) )` | 目标是 (¬¬(P→Q)→¬(P→Q))→¬¬(P→Q)→¬(P→Q)。这是〈合取消去左〉证明里的一个中间结论，按接线把它单独证出来。 | 21 / 30 |
| `32` | 否定后件换位 · 中间结论 | `⊢ ( ( ¬ ¬ P → P ) → ( ¬ ¬ P → ( ( P → ¬ Q ) → P ) ) )` | 目标是 (¬¬P→P)→¬¬P→(P→¬Q)→P。这是〈否定后件换位〉证明里的一个中间结论，按接线把它单独证出来。 | 21 / 29 |
| `33` | 双重否定爆炸 | `⊢ ( P → ( ¬ P → Q ) )` | P→¬P→Q | 25 / 36 |
| `34` | 反证收尾 | `⊢ ( ( ¬ P → P ) → P )` | (¬P→P)→P | 39 / 58 |
| `35` | 双重否定消去 | `⊢ ( ¬ ¬ P → P )` | ¬¬P→P | 22 / 30 |
| `36` | 合取的蕴涵形式 | `⊢ ( P → ( Q → ¬ ( P → ¬ Q ) ) )` | P→Q→¬(P→¬Q) | 44 / 66 |
| `37` | 分情况一 · 中间结论 | `⊢ ( ( P → Q ) → ( ( ¬ ( ( ¬ P → Q ) → Q ) → P ) → ( ¬ ( ( ¬ P → Q ) → Q ) → ( ( ¬ P → Q ) → Q ) ) ) )` | (P→Q)→(¬((¬P→Q)→Q)→P)→¬((¬P→Q)→Q)→(¬P→Q)→Q | 54 / 90 |
| `38` | 合取消去左 · 中间结论 | `⊢ ( ( ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) → ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) ) → ( ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) → ¬ ( P → Q ) ) )` | ((¬¬(P→Q)→¬(P→Q))→¬¬(P→Q)→¬(P→Q))→(¬¬(P→Q)→¬(P→Q))→¬(P→Q) | 56 / 90 |
| `39` | 等值引入 · 中间结论 | `⊢ ( ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) ) → ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( P → ¬ Q ) ) )` | ((¬(P→¬Q)→P→¬Q)→¬(P→¬Q)→P→¬Q)→(¬(P→¬Q)→P→¬Q)→P→¬Q | 56 / 90 |
| `40` | 分情况一 · 中间结论 | `⊢ ( ( ( P → Q ) → ( ¬ ( ( ¬ P → Q ) → Q ) → P ) ) → ( ( P → Q ) → ( ¬ ( ( ¬ P → Q ) → Q ) → ( ( ¬ P → Q ) → Q ) ) ) )` | ((P→Q)→¬((¬P→Q)→Q)→P)→(P→Q)→¬((¬P→Q)→Q)→(¬P→Q)→Q | 59 / 99 |
| `41` | 双重否定引入 | `⊢ ( P → ¬ ¬ P )` | P→¬¬P | 64 / 102 |
| `42` | 逆否换位 | `⊢ ( ( ¬ P → Q ) → ( ¬ Q → P ) )` | (¬P→Q)→¬Q→P | 36 / 52 |
| `43` | 先否后件 | `⊢ ( P → ( ¬ Q → ¬ ( P → Q ) ) )` | P→¬Q→¬(P→Q) | 69 / 108 |
| `44` | 合取消去左 · 中间结论 | `⊢ ( ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) → ¬ ( P → Q ) )` | (¬¬(P→Q)→¬(P→Q))→¬(P→Q) | 70 / 115 |
| `45` | 等值引入 · 中间结论 | `⊢ ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( P → ¬ Q ) )` | (¬(P→¬Q)→P→¬Q)→P→¬Q | 70 / 115 |
| `46` | 反件消去 | `⊢ ( ( ( P → Q ) → R ) → ( Q → R ) )` | ((P→Q)→R)→Q→R | 71 / 118 |
| `47` | 前件二次 | `⊢ ( ( ( P → Q ) → ( P → R ) ) → ( ( Q → P ) → ( Q → R ) ) )` | ((P→Q)→P→R)→(Q→P)→Q→R | 29 / 43 |
| `48` | 二次否定 | `⊢ ( ( ( P → Q ) → ( Q → P ) ) → ( Q → P ) )` | ((P→Q)→Q→P)→Q→P | 40 / 62 |
| `49` | 前件交换 | `⊢ ( ( P → ( Q → R ) ) → ( Q → ( P → R ) ) )` | (P→Q→R)→Q→P→R | 71 / 117 |
| `50` | 等值消去右 · 中间结论 | `⊢ ( ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) → ¬ ( P → ¬ Q ) )` | (¬¬(P→¬Q)→¬(P→¬Q))→¬(P→¬Q) | 71 / 116 |
| `51` | 反件左消 | `⊢ ( ( ( P → Q ) → R ) → ( ¬ P → R ) )` | ((P→Q)→R)→¬P→R | 73 / 120 |
| `52` | 否定蕴涵取前件 | `⊢ ( ¬ ( P → Q ) → P )` | ¬(P→Q)→P | 74 / 118 |
| `53` | 否定蕴涵前件三 | `⊢ ( ¬ ( P → Q ) → ( R → P ) )` | ¬(P→Q)→R→P | 22 / 29 |
| `54` | 否定蕴涵分配二 | `⊢ ( ¬ ( P → Q ) → ( ¬ P → R ) )` | ¬(P→Q)→¬P→R | 64 / 99 |
| `55` | 合取消去左 · 中间结论 | `⊢ ( ¬ ¬ ¬ ( P → Q ) → ( ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) → ¬ ( P → Q ) ) )` | ¬¬¬(P→Q)→(¬¬(P→Q)→¬(P→Q))→¬(P→Q) | 75 / 123 |
| `56` | 等值引入 · 中间结论 | `⊢ ( ¬ ¬ ( P → ¬ Q ) → ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( P → ¬ Q ) ) )` | ¬¬(P→¬Q)→(¬(P→¬Q)→P→¬Q)→P→¬Q | 75 / 123 |
| `57` | 等值消去右 · 中间结论 | `⊢ ( ¬ ¬ ¬ ( P → ¬ Q ) → ( ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) → ¬ ( P → ¬ Q ) ) )` | ¬¬¬(P→¬Q)→(¬¬(P→¬Q)→¬(P→¬Q))→¬(P→¬Q) | 76 / 124 |
| `58` | 否定蕴涵取后件 | `⊢ ( ¬ ( P → ¬ Q ) → Q )` | ¬(P→¬Q)→Q | 77 / 125 |
| `59` | 否定后件换位 | `⊢ ( ( P → ¬ Q ) → ( Q → ¬ P ) )` | (P→¬Q)→Q→¬P | 79 / 128 |
| `60` | 合取消去左 · 中间结论 | `⊢ ( ( ¬ ¬ ¬ ( P → Q ) → ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) ) → ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) )` | (¬¬¬(P→Q)→¬¬(P→Q)→¬(P→Q))→¬¬¬(P→Q)→¬(P→Q) | 80 / 132 |
| `61` | 等值引入 · 中间结论 | `⊢ ( ( ¬ ¬ ( P → ¬ Q ) → ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) ) → ( ¬ ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) )` | (¬¬(P→¬Q)→¬(P→¬Q)→P→¬Q)→¬¬(P→¬Q)→P→¬Q | 80 / 132 |
| `62` | 等值消去右 · 中间结论 | `⊢ ( ( ¬ ¬ ¬ ( P → ¬ Q ) → ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) ) → ( ¬ ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) )` | (¬¬¬(P→¬Q)→¬¬(P→¬Q)→¬(P→¬Q))→¬¬¬(P→¬Q)→¬(P→¬Q) | 81 / 133 |
| `63` | 蕴涵传递 | `⊢ ( ( P → Q ) → ( ( Q → R ) → ( P → R ) ) )` | (P→Q)→(Q→R)→P→R | 96 / 162 |
| `64` | 前件重排 | `⊢ ( ( P → ( Q → R ) ) → ( ( P → ( R → S ) ) → ( P → ( Q → S ) ) ) )` | (P→Q→R)→(P→R→S)→P→Q→S | 43 / 67 |
| `65` | 合取消去左 · 中间结论 | `⊢ ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) )` | ¬¬¬(P→Q)→¬(P→Q) | 99 / 166 |
| `66` | 等值引入 · 中间结论 | `⊢ ( ¬ ¬ ( P → ¬ Q ) → ( P → ¬ Q ) )` | ¬¬(P→¬Q)→P→¬Q | 99 / 166 |
| `67` | 等值消去右 · 中间结论 | `⊢ ( ¬ ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) )` | ¬¬¬(P→¬Q)→¬(P→¬Q) | 100 / 167 |
| `68` | 合取前件导出 | `⊢ ( ( ¬ ( P → ¬ Q ) → R ) → ( P → ( Q → R ) ) )` | (¬(P→¬Q)→R)→P→Q→R | 101 / 167 |
| `69` | 等值引入 · 中间结论 | `⊢ ( ( ¬ ¬ ( P → ¬ Q ) → P ) → ( ¬ ¬ ( P → ¬ Q ) → ¬ Q ) )` | (¬¬(P→¬Q)→P)→¬¬(P→¬Q)→¬Q | 104 / 175 |
| `70` | 合取前件引入 | `⊢ ( ( P → ( Q → R ) ) → ( ¬ ( P → ¬ Q ) → R ) )` | (P→Q→R)→¬(P→¬Q)→R | 105 / 175 |
| `71` | 逆否 | `⊢ ( ( P → Q ) → ( ¬ Q → ¬ P ) )` | (P→Q)→¬Q→¬P | 105 / 172 |
| `72` | 皮尔士回滚 | `⊢ ( ( ( ( P → Q ) → P ) → P ) → ( ( ( P → Q ) → R ) → ( ( R → P ) → P ) ) )` | (((P→Q)→P)→P)→((P→Q)→R)→(R→P)→P | 111 / 188 |
| `73` | 等值引入 · 中间结论 | `⊢ ( P → ( ( ¬ ¬ ( P → ¬ Q ) → P ) → ( ¬ ¬ ( P → ¬ Q ) → ¬ Q ) ) )` | P→(¬¬(P→¬Q)→P)→¬¬(P→¬Q)→¬Q | 111 / 188 |
| `74` | 蕴涵组合 | `⊢ ( ( P → Q ) → ( ( R → S ) → ( ( Q → R ) → ( P → S ) ) ) )` | (P→Q)→(R→S)→(Q→R)→P→S | 113 / 192 |
| `75` | 矛盾推出否定 | `⊢ ( ( P → ¬ P ) → ¬ P )` | (P→¬P)→¬P | 133 / 225 |
| `76` | 皮尔士律 | `⊢ ( ( ( P → Q ) → P ) → P )` | ((P→Q)→P)→P | 134 / 225 |
| `77` | 反件换位 | `⊢ ( ( ( P → Q ) → Q ) → ( ( Q → P ) → P ) )` | ((P→Q)→Q)→(Q→P)→P | 36 / 56 |
| `78` | 等值引入 | `⊢ ( ( P → Q ) → ( ( Q → P ) → ( P ↔ Q ) ) )` | A→B 与 B→A 一起给出 A↔B。 | 137 / 233 |
| `79` | 前件合并 | `⊢ ( ( ( P → Q ) → ( P → R ) ) → ( P → ( Q → R ) ) )` | ((P→Q)→P→R)→P→Q→R | 138 / 235 |
| `80` | 否定蕴涵取后件 | `⊢ ( ¬ ( P → Q ) → ¬ Q )` | ¬(P→Q)→¬Q | 152 / 256 |
| `81` | 否定蕴涵取后件二 | `⊢ ( ¬ ( P → Q ) → ( R → ¬ Q ) )` | ¬(P→Q)→R→¬Q | 24 / 32 |
| `82` | 否定蕴涵后件三 | `⊢ ( ¬ ( P → Q ) → ( Q → R ) )` | ¬(P→Q)→Q→R | 40 / 58 |
| `83` | 等值消去右 | `⊢ ( ( P ↔ Q ) → ( Q → P ) )` | A↔B 给出 B→A。 | 170 / 292 |
| `84` | 合取消去左 | `⊢ ( ( P ∧ Q ) → P )` | P∧Q 给出 P。 | 182 / 312 |
| `85` | 等值消去左 | `⊢ ( ( P ↔ Q ) → ( P → Q ) )` | A↔B 给出 A→B。 | 185 / 317 |
| `86` | 分情况一 | `⊢ ( ( ¬ P → Q ) → ( ( P → Q ) → Q ) )` | (¬P→Q)→(P→Q)→Q | 194 / 332 |
| `87` | 分情况二 | `⊢ ( ( P → Q ) → ( ( ¬ P → Q ) → Q ) )` | (P→Q)→(¬P→Q)→Q | 29 / 44 |
| `88` | 矛盾消去 | `⊢ ( ( P → Q ) → ( ( P → ¬ Q ) → ¬ P ) )` | (P→Q)→(P→¬Q)→¬P | 195 / 332 |

## 课程

### i · 取出公理

- 目标：`⊢ ( P → ( Q → P ) )`
- 提示：接一块 A1。
- 参考解：1 个模块 / 1 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n2  [target]
n1  axiom A1

接线：
n1.out → n2.proof
```

</details>

### ii · 代入

- 目标：`⊢ ( ( R → Q ) → ( Q → ( R → Q ) ) )`
- 提示：取 A1，把 P 代入 (R→Q)。
- 参考解：6 个模块 / 6 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n7  [target]
n1  axiom A1
n2  subst(groups=0)
n3  atom P
n4  atom R
n5  atom Q
n6  imp

接线：
n1.out → n2.assertion
n3.out → n2.atom1
n4.out → n6.a
n5.out → n6.b
n6.out → n2.formula1
n2.out → n7.proof
```

</details>

### iii · 分离

- 目标：`⊢ ( S → ( P → ( Q → P ) ) )`
- 提示：A1 与它的实例接 M。
- 参考解：10 个模块 / 12 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n12  [target]
n1  mp
n2  axiom A1
n4  subst(groups=1)
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  imp
n10  atom Q
n11  atom S

接线：
n2.out → n1.a
n2.out → n4.assertion
n5.out → n4.atom1
n7.out → n8.a
n6.out → n8.b
n6.out → n9.a
n8.out → n9.b
n9.out → n4.formula1
n10.out → n4.atom2
n11.out → n4.formula2
n4.out → n1.b
n1.out → n12.proof
```

</details>

### iv · 分配公理

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( ( P → Q ) → ( P → R ) ) )`
- 提示：接一块 A2。
- 参考解：1 个模块 / 1 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n2  [target]
n1  axiom A2

接线：
n1.out → n2.proof
```

</details>

### v · 逆否公理

- 目标：`⊢ ( ( ¬ P → ¬ Q ) → ( Q → P ) )`
- 提示：接一块 A3。
- 参考解：1 个模块 / 1 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n2  [target]
n1  axiom A3

接线：
n1.out → n2.proof
```

</details>

### vi · 定义展开

- 目标：`⊢ ( ¬ ( P → ¬ S ) → ( Q → ¬ ( P → ¬ S ) ) )`
- 提示：先造一个含 ∧ 的断言，再用 D 展开成原始公式。
- 参考解：7 个模块 / 7 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n8  [target]
n1  def-expand
n2  axiom A1
n3  subst(groups=0)
n4  atom P
n5  atom P
n6  atom S
n7  and

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n7.a
n6.out → n7.b
n7.out → n3.formula1
n3.out → n1.assertion
n1.out → n8.proof
```

</details>

### vii · 定义收缩

- 目标：`⊢ ( ( P ∧ R ) → ( Q → ( P ∧ R ) ) )`
- 提示：先造原始公式，再用 D⁻ 折回 ∧。
- 参考解：9 个模块 / 9 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n10  [target]
n1  def-contract
n2  axiom A1
n3  subst(groups=0)
n4  atom P
n5  atom P
n6  atom R
n7  not
n8  imp
n9  not

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n6.out → n7.a
n5.out → n8.a
n7.out → n8.b
n8.out → n9.a
n9.out → n3.formula1
n3.out → n1.assertion
n1.out → n10.proof
```

</details>

### viii · 引用已证定理

- 目标：`⊢ ( ( P → Q ) → ( R → ( P → Q ) ) )`
- 提示：用 theorem 引用第 i 关，再代入。
- 参考解：8 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n9  [target]
n1  定理 *?
n2  subst(groups=1)
n3  atom P
n4  atom P
n5  atom Q
n6  imp
n7  atom Q
n8  atom R

接线：
n1.out → n2.assertion
n3.out → n2.atom1
n4.out → n6.a
n5.out → n6.b
n6.out → n2.formula1
n7.out → n2.atom2
n8.out → n2.formula2
n2.out → n9.proof
```

</details>

### 01 · 同一律

- 目标：`⊢ ( P → P )`
- 提示：目标是 P→P。从最左的构造块开始，按参考接线接到 ⊢。
- 参考解：11 个模块 / 18 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n12  [target]
n1  mp
n2  axiom A1
n3  subst(groups=0)
n4  atom Q
n5  atom P
n6  mp
n7  subst(groups=0)
n8  imp
n9  axiom A2
n10  subst(groups=1)
n11  atom R

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n3.formula1
n2.out → n7.assertion
n5.out → n8.a
n5.out → n8.b
n4.out → n7.atom1
n8.out → n7.formula1
n9.out → n10.assertion
n4.out → n10.atom1
n8.out → n10.formula1
n11.out → n10.atom2
n5.out → n10.formula2
n7.out → n6.a
n10.out → n6.b
n3.out → n1.a
n6.out → n1.b
n1.out → n12.proof
```

</details>

### 02 · 后件恒等

- 目标：`⊢ ( P → ( Q → Q ) )`
- 提示：目标是 P→Q→Q。从最左的构造块开始，按参考接线接到 ⊢。
- 参考解：8 个模块 / 13 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n9  [target]
n1  mp
n2  定理 *01
n3  subst(groups=0)
n4  atom P
n5  atom Q
n6  axiom A1
n7  subst(groups=1)
n8  imp

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n3.formula1
n6.out → n7.assertion
n5.out → n8.a
n5.out → n8.b
n4.out → n7.atom1
n8.out → n7.formula1
n5.out → n7.atom2
n4.out → n7.formula2
n3.out → n1.a
n7.out → n1.b
n1.out → n9.proof
```

</details>

### 03 · 前件自应用

- 目标：`⊢ ( P → ( ( P → Q ) → Q ) )`
- 提示：目标是 P→(P→Q)→Q。从最左的构造块开始，按参考接线接到 ⊢。
- 参考解：19 个模块 / 40 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n20  [target]
n1  mp
n2  定理 *01
n3  axiom A1
n4  subst(groups=0)
n5  atom Q
n6  atom P
n7  imp
n8  imp
n9  axiom A2
n10  atom R
n11  mp
n12  mp
n13  mp
n14  subst(groups=0)
n15  subst(groups=2)
n16  subst(groups=1)
n17  imp
n18  imp
n19  subst(groups=1)

接线：
n3.out → n4.assertion
n6.out → n7.a
n5.out → n7.b
n5.out → n4.atom1
n7.out → n4.formula1
n7.out → n8.a
n6.out → n8.b
n2.out → n14.assertion
n6.out → n14.atom1
n7.out → n14.formula1
n9.out → n15.assertion
n6.out → n15.atom1
n7.out → n15.formula1
n5.out → n15.atom2
n6.out → n15.formula2
n10.out → n15.atom3
n5.out → n15.formula3
n14.out → n13.a
n15.out → n13.b
n3.out → n16.assertion
n7.out → n17.a
n5.out → n17.b
n8.out → n18.a
n17.out → n18.b
n6.out → n16.atom1
n18.out → n16.formula1
n5.out → n16.atom2
n6.out → n16.formula2
n13.out → n12.a
n16.out → n12.b
n9.out → n19.assertion
n5.out → n19.atom1
n8.out → n19.formula1
n10.out → n19.atom2
n17.out → n19.formula2
n12.out → n11.a
n19.out → n11.b
n4.out → n1.a
n11.out → n1.b
n1.out → n20.proof
```

</details>

### 04 · 前件交换

- 目标：`⊢ ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) )`
- 提示：目标是 (P→Q)→(R→P)→R→Q。从最左的构造块开始，按参考接线接到 ⊢。
- 参考解：18 个模块 / 43 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n19  [target]
n1  mp
n2  atom P
n3  atom Q
n4  imp
n5  axiom A1
n6  subst(groups=1)
n7  atom R
n8  imp
n9  axiom A2
n10  mp
n11  mp
n12  subst(groups=2)
n13  subst(groups=1)
n14  imp
n15  imp
n16  imp
n17  imp
n18  subst(groups=2)

接线：
n2.out → n4.a
n3.out → n4.b
n5.out → n6.assertion
n2.out → n6.atom1
n4.out → n6.formula1
n3.out → n6.atom2
n7.out → n6.formula2
n7.out → n8.a
n4.out → n8.b
n9.out → n12.assertion
n2.out → n12.atom1
n7.out → n12.formula1
n3.out → n12.atom2
n2.out → n12.formula2
n7.out → n12.atom3
n3.out → n12.formula3
n5.out → n13.assertion
n7.out → n14.a
n2.out → n14.b
n7.out → n15.a
n3.out → n15.b
n14.out → n16.a
n15.out → n16.b
n8.out → n17.a
n16.out → n17.b
n2.out → n13.atom1
n17.out → n13.formula1
n3.out → n13.atom2
n4.out → n13.formula2
n12.out → n11.a
n13.out → n11.b
n9.out → n18.assertion
n2.out → n18.atom1
n4.out → n18.formula1
n3.out → n18.atom2
n8.out → n18.formula2
n7.out → n18.atom3
n16.out → n18.formula3
n11.out → n10.a
n18.out → n10.b
n6.out → n1.a
n10.out → n1.b
n1.out → n19.proof
```

</details>

### 05 · 空真（爆炸）

- 目标：`⊢ ( ¬ P → ( P → Q ) )`
- 提示：目标是 ¬P→P→Q。从最左的构造块开始，按参考接线接到 ⊢。
- 参考解：18 个模块 / 37 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n19  [target]
n1  mp
n2  atom P
n3  not
n4  axiom A1
n5  subst(groups=1)
n6  atom Q
n7  not
n8  imp
n9  axiom A2
n10  atom R
n11  mp
n12  mp
n13  axiom A3
n14  subst(groups=1)
n15  subst(groups=1)
n16  imp
n17  imp
n18  subst(groups=2)

接线：
n2.out → n3.a
n4.out → n5.assertion
n2.out → n5.atom1
n3.out → n5.formula1
n6.out → n7.a
n6.out → n5.atom2
n7.out → n5.formula2
n7.out → n8.a
n3.out → n8.b
n13.out → n14.assertion
n2.out → n14.atom1
n6.out → n14.formula1
n6.out → n14.atom2
n2.out → n14.formula2
n4.out → n15.assertion
n2.out → n16.a
n6.out → n16.b
n8.out → n17.a
n16.out → n17.b
n2.out → n15.atom1
n17.out → n15.formula1
n6.out → n15.atom2
n3.out → n15.formula2
n14.out → n12.a
n15.out → n12.b
n9.out → n18.assertion
n2.out → n18.atom1
n3.out → n18.formula1
n6.out → n18.atom2
n8.out → n18.formula2
n10.out → n18.atom3
n16.out → n18.formula3
n12.out → n11.a
n18.out → n11.b
n5.out → n1.a
n11.out → n1.b
n1.out → n19.proof
```

</details>

### 06 · 弱化公理

- 目标：`⊢ ( P → ( Q → ( R → Q ) ) )`
- 提示：目标是 P→Q→R→Q。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。
- 参考解：13 个模块 / 17 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n15  [target]
n1  mp
n2  axiom A1
n3  subst(groups=1)
n4  atom P
n5  atom Q
n6  atom Q
n7  atom R
n9  subst(groups=1)
n10  atom P
n11  imp
n12  imp
n13  atom Q
n14  atom P

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n3.formula1
n6.out → n3.atom2
n7.out → n3.formula2
n3.out → n1.a
n2.out → n9.assertion
n10.out → n9.atom1
n7.out → n11.a
n5.out → n11.b
n5.out → n12.a
n11.out → n12.b
n12.out → n9.formula1
n13.out → n9.atom2
n14.out → n9.formula2
n9.out → n1.b
n1.out → n15.proof
```

</details>

### 07 · 弱化加一层

- 目标：`⊢ ( P → ( Q → ( R → P ) ) )`
- 提示：目标是 P→Q→R→P。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。
- 参考解：21 个模块 / 29 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n37  [target]
n1  mp
n6  axiom A1
n7  subst(groups=0)
n8  atom Q
n9  atom R
n13  atom P
n14  imp
n17  axiom A2
n21  mp
n22  mp
n24  subst(groups=0)
n25  atom P
n27  subst(groups=1)
n28  atom P
n29  atom Q
n30  imp
n31  imp
n32  atom Q
n34  subst(groups=1)
n35  atom Q
n36  atom R

接线：
n6.out → n7.assertion
n8.out → n7.atom1
n9.out → n7.formula1
n9.out → n14.a
n13.out → n14.b
n7.out → n1.a
n6.out → n24.assertion
n25.out → n24.atom1
n14.out → n24.formula1
n24.out → n22.a
n6.out → n27.assertion
n28.out → n27.atom1
n29.out → n30.a
n14.out → n30.b
n14.out → n31.a
n30.out → n31.b
n31.out → n27.formula1
n32.out → n27.atom2
n13.out → n27.formula2
n27.out → n22.b
n22.out → n21.a
n17.out → n34.assertion
n35.out → n34.atom1
n14.out → n34.formula1
n36.out → n34.atom2
n30.out → n34.formula2
n34.out → n21.b
n21.out → n1.b
n1.out → n37.proof
```

</details>

### 08 · 前件收缩

- 目标：`⊢ ( ( P → ( P → Q ) ) → ( P → Q ) )`
- 提示：目标是 (P→P→Q)→P→Q。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。
- 参考解：9 个模块 / 10 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n10  [target]
n1  mp
n2  定理 *03
n3  axiom A2
n4  subst(groups=1)
n5  atom Q
n6  atom P
n7  atom Q
n8  imp
n9  atom R

接线：
n2.out → n1.a
n3.out → n4.assertion
n5.out → n4.atom1
n6.out → n8.a
n7.out → n8.b
n8.out → n4.formula1
n9.out → n4.atom2
n7.out → n4.formula2
n4.out → n1.b
n1.out → n10.proof
```

</details>

### 09 · 析取引入右

- 目标：`⊢ ( Q → ( P ∨ Q ) )`
- 提示：目标是 Q→P∨Q。Q 给出 P∨Q，是公理 A1 的实例。 末尾用 D⁻ 把原始结论折回表面语法。
- 参考解：8 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n9  [target]
n1  def-contract
n2  axiom A1
n3  subst(groups=1)
n4  atom P
n5  atom Q
n6  atom Q
n7  atom P
n8  not

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n3.formula1
n6.out → n3.atom2
n7.out → n8.a
n8.out → n3.formula2
n3.out → n1.assertion
n1.out → n9.proof
```

</details>

### 10 · 蕴涵传递 · 中间结论

- 目标：`⊢ ( ( R → R ) → ( Q → ( R → R ) ) )`
- 提示：目标是 (R→R)→Q→R→R。这是〈蕴涵传递〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：5 个模块 / 6 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n11  axiom A1
n15  atom R
n40  subst(groups=0)
n41  atom P
n42  imp

接线：
n11.out → n40.assertion
n41.out → n40.atom1
n15.out → n42.a
n15.out → n42.b
n42.out → n40.formula1
n40.out → tgt.proof
```

</details>

### 11 · 双重否定引入 · 中间结论

- 目标：`⊢ ( ¬ P → ( P → ¬ P ) )`
- 提示：目标是 ¬P→P→¬P。这是〈双重否定引入〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：6 个模块 / 7 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n9  axiom A1
n12  atom P
n13  not
n37  subst(groups=1)
n38  atom P
n39  atom Q

接线：
n12.out → n13.a
n9.out → n37.assertion
n38.out → n37.atom1
n13.out → n37.formula1
n39.out → n37.atom2
n12.out → n37.formula2
n37.out → tgt.proof
```

</details>

### 12 · 否定蕴涵取后件 · 中间结论

- 目标：`⊢ ( ¬ ( P → Q ) → ( Q → ¬ ( P → Q ) ) )`
- 提示：目标是 ¬(P→Q)→Q→¬(P→Q)。这是〈否定蕴涵取后件〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：7 个模块 / 7 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  atom P
n6  atom Q
n7  imp
n8  not
n15  axiom A1
n100  subst(groups=0)
n101  atom P

接线：
n5.out → n7.a
n6.out → n7.b
n7.out → n8.a
n15.out → n100.assertion
n101.out → n100.atom1
n8.out → n100.formula1
n100.out → tgt.proof
```

</details>

### 13 · 空真（爆炸） · 中间结论

- 目标：`⊢ ( ¬ P → ( ¬ Q → ¬ P ) )`
- 提示：目标是 ¬P→¬Q→¬P。这是〈空真（爆炸）〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：8 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  atom P
n7  not
n10  axiom A1
n11  subst(groups=1)
n12  atom P
n13  atom Q
n14  atom Q
n15  not

接线：
n6.out → n7.a
n10.out → n11.assertion
n12.out → n11.atom1
n7.out → n11.formula1
n13.out → n11.atom2
n14.out → n15.a
n15.out → n11.formula2
n11.out → tgt.proof
```

</details>

### 14 · 否定蕴涵取后件 · 中间结论

- 目标：`⊢ ( ¬ ( P → ¬ Q ) → ( ¬ Q → ¬ ( P → ¬ Q ) ) )`
- 提示：目标是 ¬(P→¬Q)→¬Q→¬(P→¬Q)。这是〈否定蕴涵取后件〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：9 个模块 / 10 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n8  atom Q
n9  not
n12  axiom A1
n16  atom P
n20  imp
n174  not
n199  subst(groups=1)
n200  atom P
n201  atom Q

接线：
n8.out → n9.a
n16.out → n20.a
n9.out → n20.b
n20.out → n174.a
n12.out → n199.assertion
n200.out → n199.atom1
n174.out → n199.formula1
n201.out → n199.atom2
n9.out → n199.formula2
n199.out → tgt.proof
```

</details>

### 15 · 合取消去左 · 中间结论

- 目标：`⊢ ( ¬ ¬ ¬ ( P → Q ) → ( ¬ ¬ ( P → Q ) → ¬ ¬ ¬ ( P → Q ) ) )`
- 提示：目标是 ¬¬¬(P→Q)→¬¬(P→Q)→¬¬¬(P→Q)。这是〈合取消去左〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：10 个模块 / 11 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n10  atom P
n30  atom Q
n52  imp
n70  not
n71  not
n72  not
n111  subst(groups=1)
n112  atom P
n113  atom Q

接线：
n10.out → n52.a
n30.out → n52.b
n52.out → n70.a
n70.out → n71.a
n71.out → n72.a
n7.out → n111.assertion
n112.out → n111.atom1
n72.out → n111.formula1
n113.out → n111.atom2
n71.out → n111.formula2
n111.out → tgt.proof
```

</details>

### 16 · 等值消去右 · 中间结论

- 目标：`⊢ ( ¬ ¬ ¬ ( P → ¬ Q ) → ( ¬ ¬ ( P → ¬ Q ) → ¬ ¬ ¬ ( P → ¬ Q ) ) )`
- 提示：目标是 ¬¬¬(P→¬Q)→¬¬(P→¬Q)→¬¬¬(P→¬Q)。这是〈等值消去右〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：11 个模块 / 12 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n10  atom Q
n11  not
n30  atom P
n34  imp
n631  not
n632  not
n633  not
n672  subst(groups=1)
n673  atom P
n674  atom Q

接线：
n10.out → n11.a
n30.out → n34.a
n11.out → n34.b
n34.out → n631.a
n631.out → n632.a
n632.out → n633.a
n7.out → n672.assertion
n673.out → n672.atom1
n633.out → n672.formula1
n674.out → n672.atom2
n632.out → n672.formula2
n672.out → tgt.proof
```

</details>

### 17 · 否定蕴涵取后件二 · 中间结论

- 目标：`⊢ ( ( ¬ Q → ( R → ¬ Q ) ) → ( ¬ ( P → Q ) → ( ¬ Q → ( R → ¬ Q ) ) ) )`
- 提示：目标是 (¬Q→R→¬Q)→¬(P→Q)→¬Q→R→¬Q。这是〈否定蕴涵取后件二〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：12 个模块 / 14 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  axiom A1
n8  atom Q
n9  not
n11  atom R
n13  subst(groups=1)
n14  atom P
n15  imp
n16  imp
n17  atom Q
n18  atom P
n19  imp
n20  not

接线：
n8.out → n9.a
n5.out → n13.assertion
n14.out → n13.atom1
n11.out → n15.a
n9.out → n15.b
n9.out → n16.a
n15.out → n16.b
n16.out → n13.formula1
n17.out → n13.atom2
n18.out → n19.a
n8.out → n19.b
n19.out → n20.a
n20.out → n13.formula2
n13.out → tgt.proof
```

</details>

### 18 · 否定蕴涵后件三 · 中间结论

- 目标：`⊢ ( ( ¬ Q → ( ¬ R → ¬ Q ) ) → ( ¬ ( P → Q ) → ( ¬ Q → ( ¬ R → ¬ Q ) ) ) )`
- 提示：目标是 (¬Q→¬R→¬Q)→¬(P→Q)→¬Q→¬R→¬Q。这是〈否定蕴涵后件三〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：13 个模块 / 15 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  axiom A1
n9  atom Q
n10  not
n12  atom R
n13  not
n15  subst(groups=1)
n16  atom P
n17  imp
n18  imp
n19  atom Q
n20  atom P
n21  imp
n22  not

接线：
n9.out → n10.a
n12.out → n13.a
n6.out → n15.assertion
n16.out → n15.atom1
n13.out → n17.a
n10.out → n17.b
n10.out → n18.a
n17.out → n18.b
n18.out → n15.formula1
n19.out → n15.atom2
n20.out → n21.a
n9.out → n21.b
n21.out → n22.a
n22.out → n15.formula2
n15.out → tgt.proof
```

</details>

### 19 · 双重否定引入 · 中间结论

- 目标：`⊢ ( ¬ ¬ ¬ P → ( ¬ P → ( P → ¬ P ) ) )`
- 提示：目标是 ¬¬¬P→¬P→P→¬P。这是〈双重否定引入〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：14 个模块 / 20 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n9  axiom A1
n12  atom P
n13  not
n14  not
n15  not
n35  mp
n37  subst(groups=1)
n38  atom P
n39  atom Q
n41  subst(groups=1)
n42  atom P
n43  imp
n44  imp
n45  atom Q

接线：
n12.out → n13.a
n13.out → n14.a
n14.out → n15.a
n9.out → n37.assertion
n38.out → n37.atom1
n13.out → n37.formula1
n39.out → n37.atom2
n12.out → n37.formula2
n37.out → n35.a
n9.out → n41.assertion
n42.out → n41.atom1
n12.out → n43.a
n13.out → n43.b
n13.out → n44.a
n43.out → n44.b
n44.out → n41.formula1
n45.out → n41.atom2
n15.out → n41.formula2
n41.out → n35.b
n35.out → tgt.proof
```

</details>

### 20 · 否定蕴涵取后件 · 中间结论

- 目标：`⊢ ( ¬ ¬ ¬ ( P → Q ) → ( ¬ ( P → Q ) → ( Q → ¬ ( P → Q ) ) ) )`
- 提示：目标是 ¬¬¬(P→Q)→¬(P→Q)→Q→¬(P→Q)。这是〈否定蕴涵取后件〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：15 个模块 / 20 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  atom P
n6  atom Q
n7  imp
n8  not
n15  axiom A1
n78  not
n79  not
n98  mp
n100  subst(groups=0)
n101  atom P
n103  subst(groups=1)
n104  atom P
n105  imp
n106  imp
n107  atom Q

接线：
n5.out → n7.a
n6.out → n7.b
n7.out → n8.a
n8.out → n78.a
n78.out → n79.a
n15.out → n100.assertion
n101.out → n100.atom1
n8.out → n100.formula1
n100.out → n98.a
n15.out → n103.assertion
n104.out → n103.atom1
n6.out → n105.a
n8.out → n105.b
n8.out → n106.a
n105.out → n106.b
n106.out → n103.formula1
n107.out → n103.atom2
n79.out → n103.formula2
n103.out → n98.b
n98.out → tgt.proof
```

</details>

### 21 · 否定后件换位 · 中间结论

- 目标：`⊢ ( ¬ ¬ P → ( P → ( ( P → ¬ Q ) → P ) ) )`
- 提示：目标是 ¬¬P→P→(P→¬Q)→P。这是〈否定后件换位〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：15 个模块 / 20 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  atom P
n8  atom Q
n9  not
n10  imp
n13  axiom A1
n17  not
n18  not
n37  mp
n39  subst(groups=0)
n40  atom Q
n42  subst(groups=1)
n43  atom P
n44  imp
n45  imp
n46  atom Q

接线：
n8.out → n9.a
n7.out → n10.a
n9.out → n10.b
n7.out → n17.a
n17.out → n18.a
n13.out → n39.assertion
n40.out → n39.atom1
n10.out → n39.formula1
n39.out → n37.a
n13.out → n42.assertion
n43.out → n42.atom1
n10.out → n44.a
n7.out → n44.b
n7.out → n45.a
n44.out → n45.b
n45.out → n42.formula1
n46.out → n42.atom2
n18.out → n42.formula2
n42.out → n37.b
n37.out → tgt.proof
```

</details>

### 22 · 否定蕴涵取后件 · 中间结论

- 目标：`⊢ ( ¬ ¬ Q → ( Q → ( ¬ ( P → Q ) → Q ) ) )`
- 提示：目标是 ¬¬Q→Q→¬(P→Q)→Q。这是〈否定蕴涵取后件〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：16 个模块 / 22 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  atom P
n6  atom Q
n7  imp
n8  not
n15  axiom A1
n19  not
n20  not
n41  mp
n43  subst(groups=1)
n44  atom P
n45  atom Q
n47  subst(groups=1)
n48  atom P
n49  imp
n50  imp
n51  atom Q

接线：
n5.out → n7.a
n6.out → n7.b
n7.out → n8.a
n6.out → n19.a
n19.out → n20.a
n15.out → n43.assertion
n44.out → n43.atom1
n6.out → n43.formula1
n45.out → n43.atom2
n8.out → n43.formula2
n43.out → n41.a
n15.out → n47.assertion
n48.out → n47.atom1
n8.out → n49.a
n6.out → n49.b
n6.out → n50.a
n49.out → n50.b
n50.out → n47.formula1
n51.out → n47.atom2
n20.out → n47.formula2
n47.out → n41.b
n41.out → tgt.proof
```

</details>

### 23 · 否定蕴涵取后件二 · 中间结论

- 目标：`⊢ ( ¬ ( P → Q ) → ( ¬ Q → ( R → ¬ Q ) ) )`
- 提示：目标是 ¬(P→Q)→¬Q→R→¬Q。这是〈否定蕴涵取后件二〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：16 个模块 / 21 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n4  mp
n5  axiom A1
n6  subst(groups=1)
n7  atom P
n8  atom Q
n9  not
n10  atom Q
n11  atom R
n13  subst(groups=1)
n14  atom P
n15  imp
n16  imp
n17  atom Q
n18  atom P
n19  imp
n20  not

接线：
n5.out → n6.assertion
n7.out → n6.atom1
n8.out → n9.a
n9.out → n6.formula1
n10.out → n6.atom2
n11.out → n6.formula2
n6.out → n4.a
n5.out → n13.assertion
n14.out → n13.atom1
n11.out → n15.a
n9.out → n15.b
n9.out → n16.a
n15.out → n16.b
n16.out → n13.formula1
n17.out → n13.atom2
n18.out → n19.a
n8.out → n19.b
n19.out → n20.a
n20.out → n13.formula2
n13.out → n4.b
n4.out → tgt.proof
```

</details>

### 24 · 否定蕴涵取后件 · 中间结论

- 目标：`⊢ ( ¬ ¬ ¬ ( P → ¬ Q ) → ( ¬ ( P → ¬ Q ) → ( ¬ Q → ¬ ( P → ¬ Q ) ) ) )`
- 提示：目标是 ¬¬¬(P→¬Q)→¬(P→¬Q)→¬Q→¬(P→¬Q)。这是〈否定蕴涵取后件〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：17 个模块 / 23 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n8  atom Q
n9  not
n12  axiom A1
n16  atom P
n20  imp
n174  not
n175  not
n176  not
n197  mp
n199  subst(groups=1)
n200  atom P
n201  atom Q
n203  subst(groups=1)
n204  atom P
n205  imp
n206  imp
n207  atom Q

接线：
n8.out → n9.a
n16.out → n20.a
n9.out → n20.b
n20.out → n174.a
n174.out → n175.a
n175.out → n176.a
n12.out → n199.assertion
n200.out → n199.atom1
n174.out → n199.formula1
n201.out → n199.atom2
n9.out → n199.formula2
n199.out → n197.a
n12.out → n203.assertion
n204.out → n203.atom1
n9.out → n205.a
n174.out → n205.b
n174.out → n206.a
n205.out → n206.b
n206.out → n203.formula1
n207.out → n203.atom2
n176.out → n203.formula2
n203.out → n197.b
n197.out → tgt.proof
```

</details>

### 25 · 否定蕴涵取前件 · 中间结论

- 目标：`⊢ ( ¬ ¬ ¬ ( P → Q ) → ( ¬ ( P → Q ) → ( ¬ P → ¬ ( P → Q ) ) ) )`
- 提示：目标是 ¬¬¬(P→Q)→¬(P→Q)→¬P→¬(P→Q)。这是〈否定蕴涵取前件〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：17 个模块 / 23 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n11  atom P
n12  not
n15  axiom A1
n19  atom Q
n20  imp
n21  not
n22  not
n23  not
n44  mp
n46  subst(groups=1)
n47  atom P
n48  atom Q
n50  subst(groups=1)
n51  atom P
n52  imp
n53  imp
n54  atom Q

接线：
n11.out → n12.a
n11.out → n20.a
n19.out → n20.b
n20.out → n21.a
n21.out → n22.a
n22.out → n23.a
n15.out → n46.assertion
n47.out → n46.atom1
n21.out → n46.formula1
n48.out → n46.atom2
n12.out → n46.formula2
n46.out → n44.a
n15.out → n50.assertion
n51.out → n50.atom1
n12.out → n52.a
n21.out → n52.b
n21.out → n53.a
n52.out → n53.b
n53.out → n50.formula1
n54.out → n50.atom2
n23.out → n50.formula2
n50.out → n44.b
n44.out → tgt.proof
```

</details>

### 26 · 蕴涵传递 · 中间结论

- 目标：`⊢ ( ( P → Q ) → ( ( Q → ( R → R ) ) → ( ( Q → R ) → ( Q → R ) ) ) )`
- 提示：目标是 (P→Q)→(Q→R→R)→(Q→R)→Q→R。这是〈蕴涵传递〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：18 个模块 / 25 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  atom P
n7  atom Q
n8  imp
n11  axiom A1
n15  atom R
n16  imp
n23  axiom A2
n42  imp
n46  imp
n55  mp
n57  subst(groups=1)
n58  atom P
n59  atom Q
n61  subst(groups=1)
n62  atom P
n63  imp
n64  imp
n65  atom Q

接线：
n6.out → n8.a
n7.out → n8.b
n7.out → n16.a
n15.out → n16.b
n15.out → n42.a
n15.out → n42.b
n7.out → n46.a
n42.out → n46.b
n23.out → n57.assertion
n58.out → n57.atom1
n7.out → n57.formula1
n59.out → n57.atom2
n15.out → n57.formula2
n57.out → n55.a
n11.out → n61.assertion
n62.out → n61.atom1
n16.out → n63.a
n16.out → n63.b
n46.out → n64.a
n63.out → n64.b
n64.out → n61.formula1
n65.out → n61.atom2
n8.out → n61.formula2
n61.out → n55.b
n55.out → tgt.proof
```

</details>

### 27 · 分情况一 · 中间结论

- 目标：`⊢ ( ( P → Q ) → ( P → ( ( ¬ P → Q ) → Q ) ) )`
- 提示：目标是 (P→Q)→P→(¬P→Q)→Q。这是〈分情况一〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：18 个模块 / 25 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  atom P
n7  not
n8  atom Q
n9  imp
n12  axiom A1
n23  axiom A2
n75  imp
n137  mp
n138  mp
n147  subst(groups=1)
n148  atom P
n149  atom Q
n153  imp
n178  subst(groups=1)
n179  atom P
n180  atom Q
n182  subst(groups=0)
n183  atom R

接线：
n6.out → n7.a
n7.out → n9.a
n8.out → n9.b
n9.out → n75.a
n8.out → n75.b
n12.out → n147.assertion
n148.out → n147.atom1
n8.out → n147.formula1
n149.out → n147.atom2
n9.out → n147.formula2
n8.out → n153.a
n75.out → n153.b
n147.out → n138.a
n12.out → n178.assertion
n179.out → n178.atom1
n153.out → n178.formula1
n180.out → n178.atom2
n6.out → n178.formula2
n178.out → n138.b
n138.out → n137.a
n23.out → n182.assertion
n183.out → n182.atom1
n75.out → n182.formula1
n182.out → n137.b
n137.out → tgt.proof
```

</details>

### 28 · 后件替换 · 中间结论

- 目标：`⊢ ( ( P → Q ) → ( ( R → ( P → Q ) ) → ( ( R → P ) → ( R → Q ) ) ) )`
- 提示：目标是 (P→Q)→(R→P→Q)→(R→P)→R→Q。这是〈后件替换〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：19 个模块 / 27 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  atom P
n7  atom Q
n8  imp
n11  axiom A1
n15  atom R
n19  imp
n22  axiom A2
n28  mp
n30  subst(groups=2)
n31  atom P
n32  atom Q
n33  atom R
n35  subst(groups=1)
n36  atom P
n37  imp
n38  imp
n39  imp
n40  imp
n41  atom Q

接线：
n6.out → n8.a
n7.out → n8.b
n15.out → n19.a
n8.out → n19.b
n22.out → n30.assertion
n31.out → n30.atom1
n15.out → n30.formula1
n32.out → n30.atom2
n6.out → n30.formula2
n33.out → n30.atom3
n7.out → n30.formula3
n30.out → n28.a
n11.out → n35.assertion
n36.out → n35.atom1
n15.out → n37.a
n6.out → n37.b
n15.out → n38.a
n7.out → n38.b
n37.out → n39.a
n38.out → n39.b
n19.out → n40.a
n39.out → n40.b
n40.out → n35.formula1
n41.out → n35.atom2
n8.out → n35.formula2
n35.out → n28.b
n28.out → tgt.proof
```

</details>

### 29 · 双重否定引入 · 中间结论

- 目标：`⊢ ( ( ¬ ¬ ¬ P → ¬ P ) → ( ¬ ¬ ¬ P → ( P → ¬ P ) ) )`
- 提示：目标是 (¬¬¬P→¬P)→¬¬¬P→P→¬P。这是〈双重否定引入〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：20 个模块 / 29 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n9  axiom A1
n12  atom P
n13  not
n14  not
n15  not
n22  axiom A2
n34  mp
n35  mp
n37  subst(groups=1)
n38  atom P
n39  atom Q
n41  subst(groups=1)
n42  atom P
n43  imp
n44  imp
n45  atom Q
n47  subst(groups=2)
n48  atom P
n49  atom Q
n50  atom R

接线：
n12.out → n13.a
n13.out → n14.a
n14.out → n15.a
n9.out → n37.assertion
n38.out → n37.atom1
n13.out → n37.formula1
n39.out → n37.atom2
n12.out → n37.formula2
n37.out → n35.a
n9.out → n41.assertion
n42.out → n41.atom1
n12.out → n43.a
n13.out → n43.b
n13.out → n44.a
n43.out → n44.b
n44.out → n41.formula1
n45.out → n41.atom2
n15.out → n41.formula2
n41.out → n35.b
n35.out → n34.a
n22.out → n47.assertion
n48.out → n47.atom1
n15.out → n47.formula1
n49.out → n47.atom2
n13.out → n47.formula2
n50.out → n47.atom3
n43.out → n47.formula3
n47.out → n34.b
n34.out → tgt.proof
```

</details>

### 30 · 逆否 · 中间结论

- 目标：`⊢ ( ( ¬ ¬ P → P ) → ( ¬ ¬ P → ( ( P → Q ) → P ) ) )`
- 提示：目标是 (¬¬P→P)→¬¬P→(P→Q)→P。这是〈逆否〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：20 个模块 / 28 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n8  atom P
n9  atom Q
n10  imp
n13  axiom A1
n17  not
n18  not
n25  axiom A2
n36  mp
n37  mp
n39  subst(groups=0)
n40  atom Q
n42  subst(groups=1)
n43  atom P
n44  imp
n45  imp
n46  atom Q
n48  subst(groups=2)
n49  atom P
n50  atom Q
n51  atom R

接线：
n8.out → n10.a
n9.out → n10.b
n8.out → n17.a
n17.out → n18.a
n13.out → n39.assertion
n40.out → n39.atom1
n10.out → n39.formula1
n39.out → n37.a
n13.out → n42.assertion
n43.out → n42.atom1
n10.out → n44.a
n8.out → n44.b
n8.out → n45.a
n44.out → n45.b
n45.out → n42.formula1
n46.out → n42.atom2
n18.out → n42.formula2
n42.out → n37.b
n37.out → n36.a
n25.out → n48.assertion
n49.out → n48.atom1
n18.out → n48.formula1
n50.out → n48.atom2
n8.out → n48.formula2
n51.out → n48.atom3
n44.out → n48.formula3
n48.out → n36.b
n36.out → tgt.proof
```

</details>

### 31 · 合取消去左 · 中间结论

- 目标：`⊢ ( ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) → ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) )`
- 提示：目标是 (¬¬(P→Q)→¬(P→Q))→¬¬(P→Q)→¬(P→Q)。这是〈合取消去左〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：21 个模块 / 30 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n10  atom P
n19  axiom A2
n30  atom Q
n52  imp
n70  not
n71  not
n134  imp
n145  mp
n147  subst(groups=1)
n148  atom P
n149  atom Q
n150  mp
n152  subst(groups=1)
n153  atom P
n154  atom Q
n155  imp
n157  subst(groups=2)
n158  atom P
n159  atom Q
n160  atom R

接线：
n10.out → n52.a
n30.out → n52.b
n52.out → n70.a
n70.out → n71.a
n71.out → n134.a
n70.out → n134.b
n7.out → n147.assertion
n148.out → n147.atom1
n134.out → n147.formula1
n149.out → n147.atom2
n134.out → n147.formula2
n147.out → n145.a
n7.out → n152.assertion
n153.out → n152.atom1
n134.out → n152.formula1
n154.out → n152.atom2
n134.out → n155.a
n134.out → n155.b
n155.out → n152.formula2
n152.out → n150.a
n19.out → n157.assertion
n158.out → n157.atom1
n134.out → n157.formula1
n159.out → n157.atom2
n155.out → n157.formula2
n160.out → n157.atom3
n134.out → n157.formula3
n157.out → n150.b
n150.out → n145.b
n145.out → tgt.proof
```

</details>

### 32 · 否定后件换位 · 中间结论

- 目标：`⊢ ( ( ¬ ¬ P → P ) → ( ¬ ¬ P → ( ( P → ¬ Q ) → P ) ) )`
- 提示：目标是 (¬¬P→P)→¬¬P→(P→¬Q)→P。这是〈否定后件换位〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：21 个模块 / 29 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  atom P
n8  atom Q
n9  not
n10  imp
n13  axiom A1
n17  not
n18  not
n25  axiom A2
n36  mp
n37  mp
n39  subst(groups=0)
n40  atom Q
n42  subst(groups=1)
n43  atom P
n44  imp
n45  imp
n46  atom Q
n48  subst(groups=2)
n49  atom P
n50  atom Q
n51  atom R

接线：
n8.out → n9.a
n7.out → n10.a
n9.out → n10.b
n7.out → n17.a
n17.out → n18.a
n13.out → n39.assertion
n40.out → n39.atom1
n10.out → n39.formula1
n39.out → n37.a
n13.out → n42.assertion
n43.out → n42.atom1
n10.out → n44.a
n7.out → n44.b
n7.out → n45.a
n44.out → n45.b
n45.out → n42.formula1
n46.out → n42.atom2
n18.out → n42.formula2
n42.out → n37.b
n37.out → n36.a
n25.out → n48.assertion
n49.out → n48.atom1
n18.out → n48.formula1
n50.out → n48.atom2
n7.out → n48.formula2
n51.out → n48.atom3
n44.out → n48.formula3
n48.out → n36.b
n36.out → tgt.proof
```

</details>

### 33 · 双重否定爆炸

- 目标：`⊢ ( P → ( ¬ P → Q ) )`
- 提示：P→¬P→Q
- 参考解：25 个模块 / 36 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n41  [target]
n1  mp
n6  axiom A1
n7  subst(groups=0)
n8  atom Q
n9  atom P
n10  not
n14  imp
n17  axiom A2
n21  mp
n22  mp
n23  mp
n24  定理 *05
n26  subst(groups=2)
n27  atom P
n28  atom Q
n29  atom R
n30  atom Q
n32  subst(groups=1)
n33  atom P
n34  imp
n35  imp
n36  atom Q
n38  subst(groups=1)
n39  atom Q
n40  atom R

接线：
n6.out → n7.assertion
n8.out → n7.atom1
n9.out → n10.a
n10.out → n7.formula1
n10.out → n14.a
n9.out → n14.b
n7.out → n1.a
n24.out → n23.a
n17.out → n26.assertion
n27.out → n26.atom1
n10.out → n26.formula1
n28.out → n26.atom2
n9.out → n26.formula2
n29.out → n26.atom3
n30.out → n26.formula3
n26.out → n23.b
n23.out → n22.a
n6.out → n32.assertion
n33.out → n32.atom1
n10.out → n34.a
n30.out → n34.b
n14.out → n35.a
n34.out → n35.b
n35.out → n32.formula1
n36.out → n32.atom2
n9.out → n32.formula2
n32.out → n22.b
n22.out → n21.a
n17.out → n38.assertion
n39.out → n38.atom1
n14.out → n38.formula1
n40.out → n38.atom2
n34.out → n38.formula2
n38.out → n21.b
n21.out → n1.b
n1.out → n41.proof
```

</details>

### 34 · 反证收尾

- 目标：`⊢ ( ( ¬ P → P ) → P )`
- 提示：(¬P→P)→P
- 参考解：39 个模块 / 58 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n55  [target]
n1  mp
n2  定理 *01
n3  subst(groups=0)
n4  atom P
n5  atom P
n6  not
n7  imp
n8  mp
n9  mp
n13  mp
n14  定理 *05
n15  subst(groups=0)
n16  atom Q
n17  not
n18  axiom A2
n19  subst(groups=2)
n20  atom P
n21  atom Q
n22  atom R
n23  axiom A1
n26  imp
n34  mp
n35  mp
n36  定理 *?
n37  subst(groups=0)
n38  atom Q
n40  subst(groups=1)
n41  atom P
n42  imp
n43  imp
n44  atom Q
n46  subst(groups=2)
n47  atom P
n48  atom Q
n49  atom R
n51  subst(groups=2)
n52  atom P
n53  atom Q
n54  atom R

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n6.a
n6.out → n7.a
n5.out → n7.b
n7.out → n3.formula1
n3.out → n1.a
n14.out → n15.assertion
n16.out → n15.atom1
n7.out → n17.a
n17.out → n15.formula1
n15.out → n13.a
n18.out → n19.assertion
n20.out → n19.atom1
n6.out → n19.formula1
n21.out → n19.atom2
n5.out → n19.formula2
n22.out → n19.atom3
n17.out → n19.formula3
n19.out → n13.b
n6.out → n26.a
n17.out → n26.b
n13.out → n9.a
n36.out → n37.assertion
n38.out → n37.atom1
n7.out → n37.formula1
n37.out → n35.a
n23.out → n40.assertion
n41.out → n40.atom1
n7.out → n42.a
n5.out → n42.b
n26.out → n43.a
n42.out → n43.b
n43.out → n40.formula1
n44.out → n40.atom2
n7.out → n40.formula2
n40.out → n35.b
n35.out → n34.a
n18.out → n46.assertion
n47.out → n46.atom1
n7.out → n46.formula1
n48.out → n46.atom2
n26.out → n46.formula2
n49.out → n46.atom3
n42.out → n46.formula3
n46.out → n34.b
n34.out → n9.b
n9.out → n8.a
n18.out → n51.assertion
n52.out → n51.atom1
n7.out → n51.formula1
n53.out → n51.atom2
n7.out → n51.formula2
n54.out → n51.atom3
n5.out → n51.formula3
n51.out → n8.b
n8.out → n1.b
n1.out → n55.proof
```

</details>

### 35 · 双重否定消去

- 目标：`⊢ ( ¬ ¬ P → P )`
- 提示：¬¬P→P
- 参考解：22 个模块 / 30 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n23  [target]
n1  mp
n2  定理 *05
n3  subst(groups=1)
n4  atom P
n5  atom P
n6  not
n7  atom Q
n8  mp
n9  mp
n10  定理 *34
n11  axiom A1
n12  subst(groups=1)
n13  atom P
n14  imp
n15  imp
n16  atom Q
n17  not
n18  axiom A2
n19  subst(groups=2)
n20  atom P
n21  atom Q
n22  atom R

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n6.a
n6.out → n3.formula1
n7.out → n3.atom2
n5.out → n3.formula2
n3.out → n1.a
n10.out → n9.a
n11.out → n12.assertion
n13.out → n12.atom1
n6.out → n14.a
n5.out → n14.b
n14.out → n15.a
n5.out → n15.b
n15.out → n12.formula1
n16.out → n12.atom2
n6.out → n17.a
n17.out → n12.formula2
n12.out → n9.b
n9.out → n8.a
n18.out → n19.assertion
n20.out → n19.atom1
n17.out → n19.formula1
n21.out → n19.atom2
n14.out → n19.formula2
n22.out → n19.atom3
n5.out → n19.formula3
n19.out → n8.b
n8.out → n1.b
n1.out → n23.proof
```

</details>

### 36 · 合取的蕴涵形式

- 目标：`⊢ ( P → ( Q → ¬ ( P → ¬ Q ) ) )`
- 提示：P→Q→¬(P→¬Q)
- 参考解：44 个模块 / 66 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n101  [target]
n1  mp
n2  mp
n7  axiom A1
n8  subst(groups=0)
n9  atom Q
n10  atom P
n11  atom Q
n12  not
n13  imp
n14  not
n15  not
n19  imp
n22  axiom A2
n26  mp
n27  mp
n28  mp
n31  定理 *35
n32  subst(groups=0)
n33  atom P
n72  subst(groups=2)
n73  atom P
n74  atom Q
n75  atom R
n77  subst(groups=1)
n78  atom P
n79  imp
n80  imp
n81  atom Q
n83  subst(groups=1)
n84  atom Q
n85  atom R
n86  mp
n87  mp
n88  定理 *?
n89  subst(groups=0)
n90  atom P
n92  subst(groups=1)
n93  atom P
n94  imp
n95  imp
n96  atom Q
n98  subst(groups=1)
n99  atom Q
n100  atom R

接线：
n7.out → n8.assertion
n9.out → n8.atom1
n11.out → n12.a
n10.out → n13.a
n12.out → n13.b
n13.out → n14.a
n14.out → n15.a
n15.out → n8.formula1
n15.out → n19.a
n10.out → n19.b
n8.out → n2.a
n31.out → n32.assertion
n33.out → n32.atom1
n13.out → n32.formula1
n32.out → n28.a
n22.out → n72.assertion
n73.out → n72.atom1
n15.out → n72.formula1
n74.out → n72.atom2
n10.out → n72.formula2
n75.out → n72.atom3
n12.out → n72.formula3
n72.out → n28.b
n28.out → n27.a
n7.out → n77.assertion
n78.out → n77.atom1
n15.out → n79.a
n12.out → n79.b
n19.out → n80.a
n79.out → n80.b
n80.out → n77.formula1
n81.out → n77.atom2
n10.out → n77.formula2
n77.out → n27.b
n27.out → n26.a
n22.out → n83.assertion
n84.out → n83.atom1
n19.out → n83.formula1
n85.out → n83.atom2
n79.out → n83.formula2
n83.out → n26.b
n26.out → n2.b
n2.out → n1.a
n88.out → n89.assertion
n90.out → n89.atom1
n14.out → n89.formula1
n89.out → n87.a
n7.out → n92.assertion
n93.out → n92.atom1
n11.out → n94.a
n14.out → n94.b
n79.out → n95.a
n94.out → n95.b
n95.out → n92.formula1
n96.out → n92.atom2
n10.out → n92.formula2
n92.out → n87.b
n87.out → n86.a
n22.out → n98.assertion
n99.out → n98.atom1
n79.out → n98.formula1
n100.out → n98.atom2
n94.out → n98.formula2
n98.out → n86.b
n86.out → n1.b
n1.out → n101.proof
```

</details>

### 37 · 分情况一 · 中间结论

- 目标：`⊢ ( ( P → Q ) → ( ( ¬ ( ( ¬ P → Q ) → Q ) → P ) → ( ¬ ( ( ¬ P → Q ) → Q ) → ( ( ¬ P → Q ) → Q ) ) ) )`
- 提示：(P→Q)→(¬((¬P→Q)→Q)→P)→¬((¬P→Q)→Q)→(¬P→Q)→Q
- 参考解：54 个模块 / 90 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  atom P
n7  not
n8  atom Q
n9  imp
n12  axiom A1
n16  imp
n23  axiom A2
n75  imp
n98  not
n126  imp
n135  mp
n136  mp
n137  mp
n138  mp
n147  subst(groups=1)
n148  atom P
n149  atom Q
n153  imp
n178  subst(groups=1)
n179  atom P
n180  atom Q
n182  subst(groups=0)
n183  atom R
n184  mp
n185  mp
n187  subst(groups=1)
n188  atom P
n189  imp
n190  atom Q
n192  subst(groups=1)
n193  atom P
n194  imp
n195  imp
n196  atom Q
n198  subst(groups=2)
n199  atom P
n200  atom Q
n201  atom R
n202  mp
n203  mp
n205  subst(groups=2)
n206  atom P
n207  atom Q
n208  atom R
n210  subst(groups=1)
n211  atom P
n212  imp
n213  imp
n214  imp
n215  atom Q
n217  subst(groups=2)
n218  atom P
n219  atom Q
n220  atom R

接线：
n6.out → n7.a
n7.out → n9.a
n8.out → n9.b
n6.out → n16.a
n8.out → n16.b
n9.out → n75.a
n8.out → n75.b
n75.out → n98.a
n98.out → n126.a
n6.out → n126.b
n12.out → n147.assertion
n148.out → n147.atom1
n8.out → n147.formula1
n149.out → n147.atom2
n9.out → n147.formula2
n8.out → n153.a
n75.out → n153.b
n147.out → n138.a
n12.out → n178.assertion
n179.out → n178.atom1
n153.out → n178.formula1
n180.out → n178.atom2
n6.out → n178.formula2
n178.out → n138.b
n138.out → n137.a
n23.out → n182.assertion
n183.out → n182.atom1
n75.out → n182.formula1
n182.out → n137.b
n137.out → n136.a
n12.out → n187.assertion
n188.out → n187.atom1
n6.out → n189.a
n75.out → n189.b
n189.out → n187.formula1
n190.out → n187.atom2
n98.out → n187.formula2
n187.out → n185.a
n12.out → n192.assertion
n193.out → n192.atom1
n98.out → n194.a
n189.out → n194.b
n189.out → n195.a
n194.out → n195.b
n195.out → n192.formula1
n196.out → n192.atom2
n16.out → n192.formula2
n192.out → n185.b
n185.out → n184.a
n23.out → n198.assertion
n199.out → n198.atom1
n16.out → n198.formula1
n200.out → n198.atom2
n189.out → n198.formula2
n201.out → n198.atom3
n194.out → n198.formula3
n198.out → n184.b
n184.out → n136.b
n136.out → n135.a
n23.out → n205.assertion
n206.out → n205.atom1
n98.out → n205.formula1
n207.out → n205.atom2
n6.out → n205.formula2
n208.out → n205.atom3
n75.out → n205.formula3
n205.out → n203.a
n12.out → n210.assertion
n211.out → n210.atom1
n98.out → n212.a
n75.out → n212.b
n126.out → n213.a
n212.out → n213.b
n194.out → n214.a
n213.out → n214.b
n214.out → n210.formula1
n215.out → n210.atom2
n16.out → n210.formula2
n210.out → n203.b
n203.out → n202.a
n23.out → n217.assertion
n218.out → n217.atom1
n16.out → n217.formula1
n219.out → n217.atom2
n194.out → n217.formula2
n220.out → n217.atom3
n213.out → n217.formula3
n217.out → n202.b
n202.out → n135.b
n135.out → tgt.proof
```

</details>

### 38 · 合取消去左 · 中间结论

- 目标：`⊢ ( ( ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) → ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) ) → ( ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) → ¬ ( P → Q ) ) )`
- 提示：((¬¬(P→Q)→¬(P→Q))→¬¬(P→Q)→¬(P→Q))→(¬¬(P→Q)→¬(P→Q))→¬(P→Q)
- 参考解：56 个模块 / 90 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n10  atom P
n19  axiom A2
n30  atom Q
n45  axiom A3
n52  imp
n70  not
n71  not
n134  imp
n161  mp
n162  mp
n166  mp
n167  mp
n188  subst(groups=1)
n189  atom P
n190  atom Q
n191  not
n192  not
n196  imp
n204  mp
n205  mp
n207  subst(groups=1)
n208  atom P
n209  atom Q
n211  subst(groups=1)
n212  atom P
n213  imp
n214  imp
n215  atom Q
n217  subst(groups=2)
n218  atom P
n219  atom Q
n220  atom R
n222  subst(groups=2)
n223  atom P
n224  atom Q
n225  atom R
n229  imp
n237  mp
n238  mp
n240  subst(groups=1)
n241  atom P
n242  atom Q
n244  subst(groups=1)
n245  atom P
n246  imp
n247  imp
n248  atom Q
n250  subst(groups=2)
n251  atom P
n252  atom Q
n253  atom R
n255  subst(groups=2)
n256  atom P
n257  atom Q
n258  atom R

接线：
n10.out → n52.a
n30.out → n52.b
n52.out → n70.a
n70.out → n71.a
n71.out → n134.a
n70.out → n134.b
n7.out → n188.assertion
n189.out → n188.atom1
n71.out → n188.formula1
n190.out → n188.atom2
n134.out → n191.a
n191.out → n192.a
n192.out → n188.formula2
n192.out → n196.a
n71.out → n196.b
n188.out → n167.a
n45.out → n207.assertion
n208.out → n207.atom1
n191.out → n207.formula1
n209.out → n207.atom2
n70.out → n207.formula2
n207.out → n205.a
n7.out → n211.assertion
n212.out → n211.atom1
n70.out → n213.a
n191.out → n213.b
n196.out → n214.a
n213.out → n214.b
n214.out → n211.formula1
n215.out → n211.atom2
n71.out → n211.formula2
n211.out → n205.b
n205.out → n204.a
n19.out → n217.assertion
n218.out → n217.atom1
n71.out → n217.formula1
n219.out → n217.atom2
n196.out → n217.formula2
n220.out → n217.atom3
n213.out → n217.formula3
n217.out → n204.b
n204.out → n167.b
n167.out → n166.a
n19.out → n222.assertion
n223.out → n222.atom1
n71.out → n222.formula1
n224.out → n222.atom2
n70.out → n222.formula2
n225.out → n222.atom3
n191.out → n222.formula3
n222.out → n166.b
n71.out → n229.a
n191.out → n229.b
n166.out → n162.a
n45.out → n240.assertion
n241.out → n240.atom1
n70.out → n240.formula1
n242.out → n240.atom2
n134.out → n240.formula2
n240.out → n238.a
n7.out → n244.assertion
n245.out → n244.atom1
n134.out → n246.a
n70.out → n246.b
n229.out → n247.a
n246.out → n247.b
n247.out → n244.formula1
n248.out → n244.atom2
n134.out → n244.formula2
n244.out → n238.b
n238.out → n237.a
n19.out → n250.assertion
n251.out → n250.atom1
n134.out → n250.formula1
n252.out → n250.atom2
n229.out → n250.formula2
n253.out → n250.atom3
n246.out → n250.formula3
n250.out → n237.b
n237.out → n162.b
n162.out → n161.a
n19.out → n255.assertion
n256.out → n255.atom1
n134.out → n255.formula1
n257.out → n255.atom2
n134.out → n255.formula2
n258.out → n255.atom3
n70.out → n255.formula3
n255.out → n161.b
n161.out → tgt.proof
```

</details>

### 39 · 等值引入 · 中间结论

- 目标：`⊢ ( ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) ) → ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( P → ¬ Q ) ) )`
- 提示：((¬(P→¬Q)→P→¬Q)→¬(P→¬Q)→P→¬Q)→(¬(P→¬Q)→P→¬Q)→P→¬Q
- 参考解：56 个模块 / 90 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  axiom A1
n9  atom P
n15  axiom A2
n24  atom Q
n25  not
n26  imp
n27  not
n82  axiom A3
n89  imp
n116  mp
n117  mp
n121  mp
n122  mp
n143  subst(groups=1)
n144  atom P
n145  atom Q
n146  not
n147  not
n151  imp
n159  mp
n160  mp
n162  subst(groups=1)
n163  atom P
n164  atom Q
n166  subst(groups=1)
n167  atom P
n168  imp
n169  imp
n170  atom Q
n172  subst(groups=2)
n173  atom P
n174  atom Q
n175  atom R
n177  subst(groups=2)
n178  atom P
n179  atom Q
n180  atom R
n184  imp
n192  mp
n193  mp
n195  subst(groups=1)
n196  atom P
n197  atom Q
n199  subst(groups=1)
n200  atom P
n201  imp
n202  imp
n203  atom Q
n205  subst(groups=2)
n206  atom P
n207  atom Q
n208  atom R
n210  subst(groups=2)
n211  atom P
n212  atom Q
n213  atom R

接线：
n24.out → n25.a
n9.out → n26.a
n25.out → n26.b
n26.out → n27.a
n27.out → n89.a
n26.out → n89.b
n6.out → n143.assertion
n144.out → n143.atom1
n27.out → n143.formula1
n145.out → n143.atom2
n89.out → n146.a
n146.out → n147.a
n147.out → n143.formula2
n147.out → n151.a
n27.out → n151.b
n143.out → n122.a
n82.out → n162.assertion
n163.out → n162.atom1
n146.out → n162.formula1
n164.out → n162.atom2
n26.out → n162.formula2
n162.out → n160.a
n6.out → n166.assertion
n167.out → n166.atom1
n26.out → n168.a
n146.out → n168.b
n151.out → n169.a
n168.out → n169.b
n169.out → n166.formula1
n170.out → n166.atom2
n27.out → n166.formula2
n166.out → n160.b
n160.out → n159.a
n15.out → n172.assertion
n173.out → n172.atom1
n27.out → n172.formula1
n174.out → n172.atom2
n151.out → n172.formula2
n175.out → n172.atom3
n168.out → n172.formula3
n172.out → n159.b
n159.out → n122.b
n122.out → n121.a
n15.out → n177.assertion
n178.out → n177.atom1
n27.out → n177.formula1
n179.out → n177.atom2
n26.out → n177.formula2
n180.out → n177.atom3
n146.out → n177.formula3
n177.out → n121.b
n27.out → n184.a
n146.out → n184.b
n121.out → n117.a
n82.out → n195.assertion
n196.out → n195.atom1
n26.out → n195.formula1
n197.out → n195.atom2
n89.out → n195.formula2
n195.out → n193.a
n6.out → n199.assertion
n200.out → n199.atom1
n89.out → n201.a
n26.out → n201.b
n184.out → n202.a
n201.out → n202.b
n202.out → n199.formula1
n203.out → n199.atom2
n89.out → n199.formula2
n199.out → n193.b
n193.out → n192.a
n15.out → n205.assertion
n206.out → n205.atom1
n89.out → n205.formula1
n207.out → n205.atom2
n184.out → n205.formula2
n208.out → n205.atom3
n201.out → n205.formula3
n205.out → n192.b
n192.out → n117.b
n117.out → n116.a
n15.out → n210.assertion
n211.out → n210.atom1
n89.out → n210.formula1
n212.out → n210.atom2
n89.out → n210.formula2
n213.out → n210.atom3
n26.out → n210.formula3
n210.out → n116.b
n116.out → tgt.proof
```

</details>

### 40 · 分情况一 · 中间结论

- 目标：`⊢ ( ( ( P → Q ) → ( ¬ ( ( ¬ P → Q ) → Q ) → P ) ) → ( ( P → Q ) → ( ¬ ( ( ¬ P → Q ) → Q ) → ( ( ¬ P → Q ) → Q ) ) ) )`
- 提示：((P→Q)→¬((¬P→Q)→Q)→P)→(P→Q)→¬((¬P→Q)→Q)→(¬P→Q)→Q
- 参考解：59 个模块 / 99 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  atom P
n7  not
n8  atom Q
n9  imp
n12  axiom A1
n16  imp
n23  axiom A2
n75  imp
n98  not
n126  imp
n134  mp
n135  mp
n136  mp
n137  mp
n138  mp
n147  subst(groups=1)
n148  atom P
n149  atom Q
n153  imp
n178  subst(groups=1)
n179  atom P
n180  atom Q
n182  subst(groups=0)
n183  atom R
n184  mp
n185  mp
n187  subst(groups=1)
n188  atom P
n189  imp
n190  atom Q
n192  subst(groups=1)
n193  atom P
n194  imp
n195  imp
n196  atom Q
n198  subst(groups=2)
n199  atom P
n200  atom Q
n201  atom R
n202  mp
n203  mp
n205  subst(groups=2)
n206  atom P
n207  atom Q
n208  atom R
n210  subst(groups=1)
n211  atom P
n212  imp
n213  imp
n214  imp
n215  atom Q
n217  subst(groups=2)
n218  atom P
n219  atom Q
n220  atom R
n222  subst(groups=2)
n223  atom P
n224  atom Q
n225  atom R

接线：
n6.out → n7.a
n7.out → n9.a
n8.out → n9.b
n6.out → n16.a
n8.out → n16.b
n9.out → n75.a
n8.out → n75.b
n75.out → n98.a
n98.out → n126.a
n6.out → n126.b
n12.out → n147.assertion
n148.out → n147.atom1
n8.out → n147.formula1
n149.out → n147.atom2
n9.out → n147.formula2
n8.out → n153.a
n75.out → n153.b
n147.out → n138.a
n12.out → n178.assertion
n179.out → n178.atom1
n153.out → n178.formula1
n180.out → n178.atom2
n6.out → n178.formula2
n178.out → n138.b
n138.out → n137.a
n23.out → n182.assertion
n183.out → n182.atom1
n75.out → n182.formula1
n182.out → n137.b
n137.out → n136.a
n12.out → n187.assertion
n188.out → n187.atom1
n6.out → n189.a
n75.out → n189.b
n189.out → n187.formula1
n190.out → n187.atom2
n98.out → n187.formula2
n187.out → n185.a
n12.out → n192.assertion
n193.out → n192.atom1
n98.out → n194.a
n189.out → n194.b
n189.out → n195.a
n194.out → n195.b
n195.out → n192.formula1
n196.out → n192.atom2
n16.out → n192.formula2
n192.out → n185.b
n185.out → n184.a
n23.out → n198.assertion
n199.out → n198.atom1
n16.out → n198.formula1
n200.out → n198.atom2
n189.out → n198.formula2
n201.out → n198.atom3
n194.out → n198.formula3
n198.out → n184.b
n184.out → n136.b
n136.out → n135.a
n23.out → n205.assertion
n206.out → n205.atom1
n98.out → n205.formula1
n207.out → n205.atom2
n6.out → n205.formula2
n208.out → n205.atom3
n75.out → n205.formula3
n205.out → n203.a
n12.out → n210.assertion
n211.out → n210.atom1
n98.out → n212.a
n75.out → n212.b
n126.out → n213.a
n212.out → n213.b
n194.out → n214.a
n213.out → n214.b
n214.out → n210.formula1
n215.out → n210.atom2
n16.out → n210.formula2
n210.out → n203.b
n203.out → n202.a
n23.out → n217.assertion
n218.out → n217.atom1
n16.out → n217.formula1
n219.out → n217.atom2
n194.out → n217.formula2
n220.out → n217.atom3
n213.out → n217.formula3
n217.out → n202.b
n202.out → n135.b
n135.out → n134.a
n23.out → n222.assertion
n223.out → n222.atom1
n16.out → n222.formula1
n224.out → n222.atom2
n126.out → n222.formula2
n225.out → n222.atom3
n212.out → n222.formula3
n222.out → n134.b
n134.out → tgt.proof
```

</details>

### 41 · 双重否定引入

- 目标：`⊢ ( P → ¬ ¬ P )`
- 提示：P→¬¬P
- 参考解：64 个模块 / 102 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n112  [target]
n1  mp
n2  定理 *01
n3  mp
n4  mp
n5  mp
n9  axiom A1
n10  subst(groups=0)
n11  atom Q
n12  atom P
n13  not
n14  not
n15  not
n19  imp
n22  axiom A2
n26  mp
n27  mp
n28  mp
n30  mp
n31  定理 *35
n32  subst(groups=0)
n33  atom P
n34  mp
n35  mp
n37  subst(groups=1)
n38  atom P
n39  atom Q
n41  subst(groups=1)
n42  atom P
n43  imp
n44  imp
n45  atom Q
n47  subst(groups=2)
n48  atom P
n49  atom Q
n50  atom R
n78  subst(groups=2)
n79  atom P
n80  atom Q
n81  atom R
n83  subst(groups=1)
n84  atom P
n85  imp
n86  imp
n87  atom Q
n89  subst(groups=1)
n90  atom Q
n91  atom R
n92  mp
n93  mp
n94  定理 *?
n95  subst(groups=1)
n96  atom P
n97  atom Q
n99  subst(groups=1)
n100  atom P
n101  imp
n102  imp
n103  atom Q
n105  subst(groups=1)
n106  atom Q
n107  atom R
n109  subst(groups=1)
n110  atom Q
n111  atom R

接线：
n2.out → n1.a
n9.out → n10.assertion
n11.out → n10.atom1
n12.out → n13.a
n13.out → n14.a
n14.out → n15.a
n15.out → n10.formula1
n15.out → n19.a
n12.out → n19.b
n10.out → n5.a
n31.out → n32.assertion
n33.out → n32.atom1
n13.out → n32.formula1
n32.out → n30.a
n9.out → n37.assertion
n38.out → n37.atom1
n13.out → n37.formula1
n39.out → n37.atom2
n12.out → n37.formula2
n37.out → n35.a
n9.out → n41.assertion
n42.out → n41.atom1
n12.out → n43.a
n13.out → n43.b
n13.out → n44.a
n43.out → n44.b
n44.out → n41.formula1
n45.out → n41.atom2
n15.out → n41.formula2
n41.out → n35.b
n35.out → n34.a
n22.out → n47.assertion
n48.out → n47.atom1
n15.out → n47.formula1
n49.out → n47.atom2
n13.out → n47.formula2
n50.out → n47.atom3
n43.out → n47.formula3
n47.out → n34.b
n34.out → n30.b
n30.out → n28.a
n22.out → n78.assertion
n79.out → n78.atom1
n15.out → n78.formula1
n80.out → n78.atom2
n12.out → n78.formula2
n81.out → n78.atom3
n13.out → n78.formula3
n78.out → n28.b
n28.out → n27.a
n9.out → n83.assertion
n84.out → n83.atom1
n15.out → n85.a
n13.out → n85.b
n19.out → n86.a
n85.out → n86.b
n86.out → n83.formula1
n87.out → n83.atom2
n12.out → n83.formula2
n83.out → n27.b
n27.out → n26.a
n22.out → n89.assertion
n90.out → n89.atom1
n19.out → n89.formula1
n91.out → n89.atom2
n85.out → n89.formula2
n89.out → n26.b
n26.out → n5.b
n5.out → n4.a
n94.out → n95.assertion
n96.out → n95.atom1
n14.out → n95.formula1
n97.out → n95.atom2
n12.out → n95.formula2
n95.out → n93.a
n9.out → n99.assertion
n100.out → n99.atom1
n12.out → n101.a
n14.out → n101.b
n85.out → n102.a
n101.out → n102.b
n102.out → n99.formula1
n103.out → n99.atom2
n12.out → n99.formula2
n99.out → n93.b
n93.out → n92.a
n22.out → n105.assertion
n106.out → n105.atom1
n85.out → n105.formula1
n107.out → n105.atom2
n101.out → n105.formula2
n105.out → n92.b
n92.out → n4.b
n4.out → n3.a
n22.out → n109.assertion
n110.out → n109.atom1
n12.out → n109.formula1
n111.out → n109.atom2
n14.out → n109.formula2
n109.out → n3.b
n3.out → n1.b
n1.out → n112.proof
```

</details>

### 42 · 逆否换位

- 目标：`⊢ ( ( ¬ P → Q ) → ( ¬ Q → P ) )`
- 提示：(¬P→Q)→¬Q→P
- 参考解：36 个模块 / 52 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n55  [target]
n1  mp
n6  atom P
n7  not
n8  atom Q
n9  imp
n12  mp
n13  mp
n14  定理 *41
n15  subst(groups=0)
n16  atom P
n17  axiom A1
n18  subst(groups=1)
n19  atom P
n20  not
n21  not
n22  imp
n23  atom Q
n24  axiom A2
n25  subst(groups=1)
n26  atom P
n27  atom R
n31  imp
n39  mp
n40  mp
n41  定理 *?
n42  subst(groups=0)
n43  atom Q
n45  subst(groups=1)
n46  atom P
n47  imp
n48  imp
n49  atom Q
n51  subst(groups=2)
n52  atom P
n53  atom Q
n54  atom R

接线：
n6.out → n7.a
n7.out → n9.a
n8.out → n9.b
n14.out → n15.assertion
n16.out → n15.atom1
n8.out → n15.formula1
n15.out → n13.a
n17.out → n18.assertion
n19.out → n18.atom1
n8.out → n20.a
n20.out → n21.a
n8.out → n22.a
n21.out → n22.b
n22.out → n18.formula1
n23.out → n18.atom2
n7.out → n18.formula2
n18.out → n13.b
n13.out → n12.a
n24.out → n25.assertion
n26.out → n25.atom1
n7.out → n25.formula1
n27.out → n25.atom2
n21.out → n25.formula2
n25.out → n12.b
n7.out → n31.a
n21.out → n31.b
n12.out → n1.a
n41.out → n42.assertion
n43.out → n42.atom1
n20.out → n42.formula1
n42.out → n40.a
n17.out → n45.assertion
n46.out → n45.atom1
n20.out → n47.a
n6.out → n47.b
n31.out → n48.a
n47.out → n48.b
n48.out → n45.formula1
n49.out → n45.atom2
n9.out → n45.formula2
n45.out → n40.b
n40.out → n39.a
n24.out → n51.assertion
n52.out → n51.atom1
n9.out → n51.formula1
n53.out → n51.atom2
n31.out → n51.formula2
n54.out → n51.atom3
n47.out → n51.formula3
n51.out → n39.b
n39.out → n1.b
n1.out → n55.proof
```

</details>

### 43 · 先否后件

- 目标：`⊢ ( P → ( ¬ Q → ¬ ( P → Q ) ) )`
- 提示：P→¬Q→¬(P→Q)
- 参考解：69 个模块 / 108 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n128  [target]
n1  mp
n2  mp
n3  mp
n8  axiom A1
n9  subst(groups=0)
n10  atom Q
n11  atom P
n12  atom Q
n13  imp
n14  not
n15  not
n19  imp
n22  axiom A2
n26  mp
n27  mp
n28  mp
n31  定理 *35
n32  subst(groups=0)
n33  atom P
n70  subst(groups=2)
n71  atom P
n72  atom Q
n73  atom R
n75  subst(groups=1)
n76  atom P
n77  imp
n78  imp
n79  atom Q
n81  subst(groups=1)
n82  atom Q
n83  atom R
n84  mp
n85  mp
n86  mp
n87  mp
n88  定理 *41
n89  subst(groups=0)
n90  atom P
n92  subst(groups=1)
n93  atom P
n94  not
n95  not
n96  imp
n97  atom Q
n99  subst(groups=1)
n100  atom P
n101  atom R
n103  subst(groups=1)
n104  atom P
n105  imp
n106  imp
n107  atom Q
n109  subst(groups=1)
n110  atom Q
n111  atom R
n112  mp
n113  mp
n114  定理 *?
n115  subst(groups=1)
n116  atom P
n117  atom Q
n119  subst(groups=1)
n120  atom P
n121  imp
n122  imp
n123  atom Q
n125  subst(groups=1)
n126  atom Q
n127  atom R

接线：
n8.out → n9.assertion
n10.out → n9.atom1
n11.out → n13.a
n12.out → n13.b
n13.out → n14.a
n14.out → n15.a
n15.out → n9.formula1
n15.out → n19.a
n11.out → n19.b
n9.out → n3.a
n31.out → n32.assertion
n33.out → n32.atom1
n13.out → n32.formula1
n32.out → n28.a
n22.out → n70.assertion
n71.out → n70.atom1
n15.out → n70.formula1
n72.out → n70.atom2
n11.out → n70.formula2
n73.out → n70.atom3
n12.out → n70.formula3
n70.out → n28.b
n28.out → n27.a
n8.out → n75.assertion
n76.out → n75.atom1
n15.out → n77.a
n12.out → n77.b
n19.out → n78.a
n77.out → n78.b
n78.out → n75.formula1
n79.out → n75.atom2
n11.out → n75.formula2
n75.out → n27.b
n27.out → n26.a
n22.out → n81.assertion
n82.out → n81.atom1
n19.out → n81.formula1
n83.out → n81.atom2
n77.out → n81.formula2
n81.out → n26.b
n26.out → n3.b
n3.out → n2.a
n88.out → n89.assertion
n90.out → n89.atom1
n12.out → n89.formula1
n89.out → n87.a
n8.out → n92.assertion
n93.out → n92.atom1
n12.out → n94.a
n94.out → n95.a
n12.out → n96.a
n95.out → n96.b
n96.out → n92.formula1
n97.out → n92.atom2
n15.out → n92.formula2
n92.out → n87.b
n87.out → n86.a
n22.out → n99.assertion
n100.out → n99.atom1
n15.out → n99.formula1
n101.out → n99.atom2
n95.out → n99.formula2
n99.out → n86.b
n86.out → n85.a
n8.out → n103.assertion
n104.out → n103.atom1
n15.out → n105.a
n95.out → n105.b
n77.out → n106.a
n105.out → n106.b
n106.out → n103.formula1
n107.out → n103.atom2
n11.out → n103.formula2
n103.out → n85.b
n85.out → n84.a
n22.out → n109.assertion
n110.out → n109.atom1
n77.out → n109.formula1
n111.out → n109.atom2
n105.out → n109.formula2
n109.out → n84.b
n84.out → n2.b
n2.out → n1.a
n114.out → n115.assertion
n116.out → n115.atom1
n14.out → n115.formula1
n117.out → n115.atom2
n94.out → n115.formula2
n115.out → n113.a
n8.out → n119.assertion
n120.out → n119.atom1
n94.out → n121.a
n14.out → n121.b
n105.out → n122.a
n121.out → n122.b
n122.out → n119.formula1
n123.out → n119.atom2
n11.out → n119.formula2
n119.out → n113.b
n113.out → n112.a
n22.out → n125.assertion
n126.out → n125.atom1
n105.out → n125.formula1
n127.out → n125.atom2
n121.out → n125.formula2
n125.out → n112.b
n112.out → n1.b
n1.out → n128.proof
```

</details>

### 44 · 合取消去左 · 中间结论

- 目标：`⊢ ( ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) → ¬ ( P → Q ) )`
- 提示：(¬¬(P→Q)→¬(P→Q))→¬(P→Q)
- 参考解：70 个模块 / 115 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n10  atom P
n19  axiom A2
n30  atom Q
n45  axiom A3
n52  imp
n70  not
n71  not
n134  imp
n144  mp
n145  mp
n147  subst(groups=1)
n148  atom P
n149  atom Q
n150  mp
n152  subst(groups=1)
n153  atom P
n154  atom Q
n155  imp
n157  subst(groups=2)
n158  atom P
n159  atom Q
n160  atom R
n161  mp
n162  mp
n166  mp
n167  mp
n188  subst(groups=1)
n189  atom P
n190  atom Q
n191  not
n192  not
n196  imp
n204  mp
n205  mp
n207  subst(groups=1)
n208  atom P
n209  atom Q
n211  subst(groups=1)
n212  atom P
n213  imp
n214  imp
n215  atom Q
n217  subst(groups=2)
n218  atom P
n219  atom Q
n220  atom R
n222  subst(groups=2)
n223  atom P
n224  atom Q
n225  atom R
n229  imp
n237  mp
n238  mp
n240  subst(groups=1)
n241  atom P
n242  atom Q
n244  subst(groups=1)
n245  atom P
n246  imp
n247  imp
n248  atom Q
n250  subst(groups=2)
n251  atom P
n252  atom Q
n253  atom R
n255  subst(groups=2)
n256  atom P
n257  atom Q
n258  atom R

接线：
n10.out → n52.a
n30.out → n52.b
n52.out → n70.a
n70.out → n71.a
n71.out → n134.a
n70.out → n134.b
n7.out → n147.assertion
n148.out → n147.atom1
n134.out → n147.formula1
n149.out → n147.atom2
n134.out → n147.formula2
n147.out → n145.a
n7.out → n152.assertion
n153.out → n152.atom1
n134.out → n152.formula1
n154.out → n152.atom2
n134.out → n155.a
n134.out → n155.b
n155.out → n152.formula2
n152.out → n150.a
n19.out → n157.assertion
n158.out → n157.atom1
n134.out → n157.formula1
n159.out → n157.atom2
n155.out → n157.formula2
n160.out → n157.atom3
n134.out → n157.formula3
n157.out → n150.b
n150.out → n145.b
n145.out → n144.a
n7.out → n188.assertion
n189.out → n188.atom1
n71.out → n188.formula1
n190.out → n188.atom2
n134.out → n191.a
n191.out → n192.a
n192.out → n188.formula2
n192.out → n196.a
n71.out → n196.b
n188.out → n167.a
n45.out → n207.assertion
n208.out → n207.atom1
n191.out → n207.formula1
n209.out → n207.atom2
n70.out → n207.formula2
n207.out → n205.a
n7.out → n211.assertion
n212.out → n211.atom1
n70.out → n213.a
n191.out → n213.b
n196.out → n214.a
n213.out → n214.b
n214.out → n211.formula1
n215.out → n211.atom2
n71.out → n211.formula2
n211.out → n205.b
n205.out → n204.a
n19.out → n217.assertion
n218.out → n217.atom1
n71.out → n217.formula1
n219.out → n217.atom2
n196.out → n217.formula2
n220.out → n217.atom3
n213.out → n217.formula3
n217.out → n204.b
n204.out → n167.b
n167.out → n166.a
n19.out → n222.assertion
n223.out → n222.atom1
n71.out → n222.formula1
n224.out → n222.atom2
n70.out → n222.formula2
n225.out → n222.atom3
n191.out → n222.formula3
n222.out → n166.b
n71.out → n229.a
n191.out → n229.b
n166.out → n162.a
n45.out → n240.assertion
n241.out → n240.atom1
n70.out → n240.formula1
n242.out → n240.atom2
n134.out → n240.formula2
n240.out → n238.a
n7.out → n244.assertion
n245.out → n244.atom1
n134.out → n246.a
n70.out → n246.b
n229.out → n247.a
n246.out → n247.b
n247.out → n244.formula1
n248.out → n244.atom2
n134.out → n244.formula2
n244.out → n238.b
n238.out → n237.a
n19.out → n250.assertion
n251.out → n250.atom1
n134.out → n250.formula1
n252.out → n250.atom2
n229.out → n250.formula2
n253.out → n250.atom3
n246.out → n250.formula3
n250.out → n237.b
n237.out → n162.b
n162.out → n161.a
n19.out → n255.assertion
n256.out → n255.atom1
n134.out → n255.formula1
n257.out → n255.atom2
n134.out → n255.formula2
n258.out → n255.atom3
n70.out → n255.formula3
n255.out → n161.b
n161.out → n144.b
n144.out → tgt.proof
```

</details>

### 45 · 等值引入 · 中间结论

- 目标：`⊢ ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( P → ¬ Q ) )`
- 提示：(¬(P→¬Q)→P→¬Q)→P→¬Q
- 参考解：70 个模块 / 115 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  axiom A1
n9  atom P
n15  axiom A2
n24  atom Q
n25  not
n26  imp
n27  not
n82  axiom A3
n89  imp
n99  mp
n100  mp
n102  subst(groups=1)
n103  atom P
n104  atom Q
n105  mp
n107  subst(groups=1)
n108  atom P
n109  atom Q
n110  imp
n112  subst(groups=2)
n113  atom P
n114  atom Q
n115  atom R
n116  mp
n117  mp
n121  mp
n122  mp
n143  subst(groups=1)
n144  atom P
n145  atom Q
n146  not
n147  not
n151  imp
n159  mp
n160  mp
n162  subst(groups=1)
n163  atom P
n164  atom Q
n166  subst(groups=1)
n167  atom P
n168  imp
n169  imp
n170  atom Q
n172  subst(groups=2)
n173  atom P
n174  atom Q
n175  atom R
n177  subst(groups=2)
n178  atom P
n179  atom Q
n180  atom R
n184  imp
n192  mp
n193  mp
n195  subst(groups=1)
n196  atom P
n197  atom Q
n199  subst(groups=1)
n200  atom P
n201  imp
n202  imp
n203  atom Q
n205  subst(groups=2)
n206  atom P
n207  atom Q
n208  atom R
n210  subst(groups=2)
n211  atom P
n212  atom Q
n213  atom R

接线：
n24.out → n25.a
n9.out → n26.a
n25.out → n26.b
n26.out → n27.a
n27.out → n89.a
n26.out → n89.b
n6.out → n102.assertion
n103.out → n102.atom1
n89.out → n102.formula1
n104.out → n102.atom2
n89.out → n102.formula2
n102.out → n100.a
n6.out → n107.assertion
n108.out → n107.atom1
n89.out → n107.formula1
n109.out → n107.atom2
n89.out → n110.a
n89.out → n110.b
n110.out → n107.formula2
n107.out → n105.a
n15.out → n112.assertion
n113.out → n112.atom1
n89.out → n112.formula1
n114.out → n112.atom2
n110.out → n112.formula2
n115.out → n112.atom3
n89.out → n112.formula3
n112.out → n105.b
n105.out → n100.b
n100.out → n99.a
n6.out → n143.assertion
n144.out → n143.atom1
n27.out → n143.formula1
n145.out → n143.atom2
n89.out → n146.a
n146.out → n147.a
n147.out → n143.formula2
n147.out → n151.a
n27.out → n151.b
n143.out → n122.a
n82.out → n162.assertion
n163.out → n162.atom1
n146.out → n162.formula1
n164.out → n162.atom2
n26.out → n162.formula2
n162.out → n160.a
n6.out → n166.assertion
n167.out → n166.atom1
n26.out → n168.a
n146.out → n168.b
n151.out → n169.a
n168.out → n169.b
n169.out → n166.formula1
n170.out → n166.atom2
n27.out → n166.formula2
n166.out → n160.b
n160.out → n159.a
n15.out → n172.assertion
n173.out → n172.atom1
n27.out → n172.formula1
n174.out → n172.atom2
n151.out → n172.formula2
n175.out → n172.atom3
n168.out → n172.formula3
n172.out → n159.b
n159.out → n122.b
n122.out → n121.a
n15.out → n177.assertion
n178.out → n177.atom1
n27.out → n177.formula1
n179.out → n177.atom2
n26.out → n177.formula2
n180.out → n177.atom3
n146.out → n177.formula3
n177.out → n121.b
n27.out → n184.a
n146.out → n184.b
n121.out → n117.a
n82.out → n195.assertion
n196.out → n195.atom1
n26.out → n195.formula1
n197.out → n195.atom2
n89.out → n195.formula2
n195.out → n193.a
n6.out → n199.assertion
n200.out → n199.atom1
n89.out → n201.a
n26.out → n201.b
n184.out → n202.a
n201.out → n202.b
n202.out → n199.formula1
n203.out → n199.atom2
n89.out → n199.formula2
n199.out → n193.b
n193.out → n192.a
n15.out → n205.assertion
n206.out → n205.atom1
n89.out → n205.formula1
n207.out → n205.atom2
n184.out → n205.formula2
n208.out → n205.atom3
n201.out → n205.formula3
n205.out → n192.b
n192.out → n117.b
n117.out → n116.a
n15.out → n210.assertion
n211.out → n210.atom1
n89.out → n210.formula1
n212.out → n210.atom2
n89.out → n210.formula2
n213.out → n210.atom3
n26.out → n210.formula3
n210.out → n116.b
n116.out → n99.b
n99.out → tgt.proof
```

</details>

### 46 · 反件消去

- 目标：`⊢ ( ( ( P → Q ) → R ) → ( Q → R ) )`
- 提示：((P→Q)→R)→Q→R
- 参考解：71 个模块 / 118 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n98  [target]
n1  mp
n3  定理 *01
n4  subst(groups=0)
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  atom R
n10  imp
n13  axiom A1
n14  subst(groups=0)
n15  atom P
n19  imp
n22  axiom A2
n27  mp
n28  mp
n29  mp
n30  mp
n31  mp
n33  subst(groups=1)
n34  atom P
n35  atom Q
n36  mp
n37  mp
n39  subst(groups=1)
n40  atom P
n41  atom Q
n43  subst(groups=0)
n44  atom P
n45  imp
n46  imp
n48  subst(groups=2)
n49  atom P
n50  atom Q
n51  atom R
n52  mp
n53  mp
n54  mp
n56  mp
n58  subst(groups=0)
n59  atom P
n61  subst(groups=1)
n62  atom P
n63  imp
n64  atom Q
n66  subst(groups=1)
n67  atom P
n68  atom Q
n70  subst(groups=1)
n71  atom P
n72  atom Q
n74  subst(groups=0)
n75  atom P
n76  imp
n77  imp
n79  subst(groups=2)
n80  atom P
n81  atom Q
n82  atom R
n84  subst(groups=1)
n85  atom P
n86  atom Q
n88  subst(groups=1)
n89  atom P
n90  imp
n91  imp
n92  atom Q
n94  subst(groups=2)
n95  atom P
n96  atom Q
n97  atom R

接线：
n3.out → n4.assertion
n5.out → n4.atom1
n6.out → n8.a
n7.out → n8.b
n8.out → n10.a
n9.out → n10.b
n10.out → n4.formula1
n13.out → n14.assertion
n15.out → n14.atom1
n10.out → n14.formula1
n7.out → n19.a
n10.out → n19.b
n14.out → n1.a
n13.out → n33.assertion
n34.out → n33.atom1
n7.out → n33.formula1
n35.out → n33.atom2
n6.out → n33.formula2
n33.out → n31.a
n13.out → n39.assertion
n40.out → n39.atom1
n8.out → n39.formula1
n41.out → n39.atom2
n10.out → n39.formula2
n39.out → n37.a
n13.out → n43.assertion
n44.out → n43.atom1
n10.out → n45.a
n8.out → n45.b
n8.out → n46.a
n45.out → n46.b
n46.out → n43.formula1
n43.out → n37.b
n37.out → n36.a
n22.out → n48.assertion
n49.out → n48.atom1
n7.out → n48.formula1
n50.out → n48.atom2
n8.out → n48.formula2
n51.out → n48.atom3
n45.out → n48.formula3
n48.out → n36.b
n36.out → n31.b
n31.out → n30.a
n3.out → n58.assertion
n59.out → n58.atom1
n9.out → n58.formula1
n58.out → n56.a
n13.out → n61.assertion
n62.out → n61.atom1
n9.out → n63.a
n9.out → n63.b
n63.out → n61.formula1
n64.out → n61.atom2
n8.out → n61.formula2
n61.out → n56.b
n56.out → n4.a
n22.out → n66.assertion
n67.out → n66.atom1
n8.out → n66.formula1
n68.out → n66.atom2
n9.out → n66.formula2
n66.out → n4.b
n4.out → n54.a
n22.out → n70.assertion
n71.out → n70.atom1
n10.out → n70.formula1
n72.out → n70.atom2
n8.out → n70.formula2
n70.out → n54.b
n54.out → n53.a
n13.out → n74.assertion
n75.out → n74.atom1
n10.out → n76.a
n9.out → n76.b
n45.out → n77.a
n76.out → n77.b
n77.out → n74.formula1
n74.out → n53.b
n53.out → n52.a
n22.out → n79.assertion
n80.out → n79.atom1
n7.out → n79.formula1
n81.out → n79.atom2
n45.out → n79.formula2
n82.out → n79.atom3
n76.out → n79.formula3
n79.out → n52.b
n52.out → n30.b
n30.out → n29.a
n22.out → n84.assertion
n85.out → n84.atom1
n7.out → n84.formula1
n86.out → n84.atom2
n10.out → n84.formula2
n84.out → n29.b
n29.out → n28.a
n13.out → n88.assertion
n89.out → n88.atom1
n7.out → n90.a
n9.out → n90.b
n19.out → n91.a
n90.out → n91.b
n91.out → n88.formula1
n92.out → n88.atom2
n10.out → n88.formula2
n88.out → n28.b
n28.out → n27.a
n22.out → n94.assertion
n95.out → n94.atom1
n10.out → n94.formula1
n96.out → n94.atom2
n19.out → n94.formula2
n97.out → n94.atom3
n90.out → n94.formula3
n94.out → n27.b
n27.out → n1.b
n1.out → n98.proof
```

</details>

### 47 · 前件二次

- 目标：`⊢ ( ( ( P → Q ) → ( P → R ) ) → ( ( Q → P ) → ( Q → R ) ) )`
- 提示：((P→Q)→P→R)→(Q→P)→Q→R
- 参考解：29 个模块 / 43 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n31  [target]
n1  mp
n2  定理 *46
n3  subst(groups=0)
n4  atom R
n5  atom P
n6  atom R
n7  imp
n8  mp
n9  mp
n10  axiom A2
n11  subst(groups=1)
n12  atom P
n13  atom Q
n14  atom Q
n15  axiom A1
n16  subst(groups=1)
n17  atom P
n18  imp
n19  imp
n20  imp
n21  imp
n22  imp
n23  atom Q
n24  imp
n25  imp
n27  subst(groups=2)
n28  atom P
n29  atom Q
n30  atom R

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n7.a
n6.out → n7.b
n7.out → n3.formula1
n3.out → n1.a
n10.out → n11.assertion
n12.out → n11.atom1
n13.out → n11.formula1
n14.out → n11.atom2
n5.out → n11.formula2
n11.out → n9.a
n15.out → n16.assertion
n17.out → n16.atom1
n13.out → n18.a
n7.out → n18.b
n13.out → n19.a
n5.out → n19.b
n13.out → n20.a
n6.out → n20.b
n19.out → n21.a
n20.out → n21.b
n18.out → n22.a
n21.out → n22.b
n22.out → n16.formula1
n23.out → n16.atom2
n5.out → n24.a
n13.out → n24.b
n24.out → n25.a
n7.out → n25.b
n25.out → n16.formula2
n16.out → n9.b
n9.out → n8.a
n10.out → n27.assertion
n28.out → n27.atom1
n25.out → n27.formula1
n29.out → n27.atom2
n18.out → n27.formula2
n30.out → n27.atom3
n21.out → n27.formula3
n27.out → n8.b
n8.out → n1.b
n1.out → n31.proof
```

</details>

### 48 · 二次否定

- 目标：`⊢ ( ( ( P → Q ) → ( Q → P ) ) → ( Q → P ) )`
- 提示：((P→Q)→Q→P)→Q→P
- 参考解：40 个模块 / 62 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n44  [target]
n1  mp
n2  mp
n3  定理 *01
n4  subst(groups=0)
n5  atom P
n6  atom Q
n7  axiom A1
n8  subst(groups=1)
n9  atom P
n10  imp
n11  atom Q
n12  atom P
n13  imp
n14  imp
n15  imp
n16  mp
n17  mp
n18  定理 *46
n19  subst(groups=0)
n20  atom R
n21  mp
n22  mp
n23  axiom A2
n24  subst(groups=1)
n25  atom P
n26  atom R
n28  subst(groups=1)
n29  atom P
n30  imp
n31  imp
n32  imp
n33  atom Q
n35  subst(groups=2)
n36  atom P
n37  atom Q
n38  atom R
n40  subst(groups=2)
n41  atom P
n42  atom Q
n43  atom R

接线：
n3.out → n4.assertion
n5.out → n4.atom1
n6.out → n4.formula1
n4.out → n2.a
n7.out → n8.assertion
n9.out → n8.atom1
n6.out → n10.a
n6.out → n10.b
n10.out → n8.formula1
n11.out → n8.atom2
n12.out → n13.a
n6.out → n13.b
n6.out → n14.a
n12.out → n14.b
n13.out → n15.a
n14.out → n15.b
n15.out → n8.formula2
n8.out → n2.b
n2.out → n1.a
n18.out → n19.assertion
n20.out → n19.atom1
n14.out → n19.formula1
n19.out → n17.a
n23.out → n24.assertion
n25.out → n24.atom1
n6.out → n24.formula1
n26.out → n24.atom2
n12.out → n24.formula2
n24.out → n22.a
n7.out → n28.assertion
n29.out → n28.atom1
n6.out → n30.a
n14.out → n30.b
n10.out → n31.a
n14.out → n31.b
n30.out → n32.a
n31.out → n32.b
n32.out → n28.formula1
n33.out → n28.atom2
n15.out → n28.formula2
n28.out → n22.b
n22.out → n21.a
n23.out → n35.assertion
n36.out → n35.atom1
n15.out → n35.formula1
n37.out → n35.atom2
n30.out → n35.formula2
n38.out → n35.atom3
n31.out → n35.formula3
n35.out → n21.b
n21.out → n17.b
n17.out → n16.a
n23.out → n40.assertion
n41.out → n40.atom1
n15.out → n40.formula1
n42.out → n40.atom2
n10.out → n40.formula2
n43.out → n40.atom3
n14.out → n40.formula3
n40.out → n16.b
n16.out → n1.b
n1.out → n44.proof
```

</details>

### 49 · 前件交换

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( Q → ( P → R ) ) )`
- 提示：(P→Q→R)→Q→P→R
- 参考解：71 个模块 / 117 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n96  [target]
n1  mp
n6  atom P
n7  atom Q
n8  atom R
n9  imp
n10  imp
n13  axiom A1
n14  subst(groups=0)
n15  atom P
n19  imp
n22  axiom A2
n27  mp
n28  mp
n29  mp
n30  mp
n31  定理 *03
n32  subst(groups=1)
n33  atom P
n34  atom Q
n36  subst(groups=1)
n37  atom P
n38  imp
n39  imp
n40  atom Q
n41  mp
n42  mp
n43  mp
n44  mp
n45  定理 *04
n46  subst(groups=2)
n47  atom P
n48  atom Q
n49  atom R
n51  subst(groups=0)
n52  atom P
n53  imp
n54  imp
n55  imp
n57  subst(groups=2)
n58  atom P
n59  atom Q
n60  atom R
n62  subst(groups=1)
n63  atom P
n64  imp
n65  imp
n66  atom Q
n68  subst(groups=2)
n69  atom P
n70  atom Q
n71  atom R
n72  mp
n73  mp
n75  subst(groups=2)
n76  atom P
n77  atom Q
n78  atom R
n80  subst(groups=1)
n81  atom P
n82  imp
n83  imp
n84  imp
n85  atom Q
n87  subst(groups=2)
n88  atom P
n89  atom Q
n90  atom R
n92  subst(groups=2)
n93  atom P
n94  atom Q
n95  atom R

接线：
n7.out → n9.a
n8.out → n9.b
n6.out → n10.a
n9.out → n10.b
n13.out → n14.assertion
n15.out → n14.atom1
n10.out → n14.formula1
n7.out → n19.a
n10.out → n19.b
n14.out → n1.a
n31.out → n32.assertion
n33.out → n32.atom1
n7.out → n32.formula1
n34.out → n32.atom2
n8.out → n32.formula2
n32.out → n30.a
n13.out → n36.assertion
n37.out → n36.atom1
n9.out → n38.a
n8.out → n38.b
n7.out → n39.a
n38.out → n39.b
n39.out → n36.formula1
n40.out → n36.atom2
n10.out → n36.formula2
n36.out → n30.b
n30.out → n29.a
n45.out → n46.assertion
n47.out → n46.atom1
n9.out → n46.formula1
n48.out → n46.atom2
n8.out → n46.formula2
n49.out → n46.atom3
n6.out → n46.formula3
n46.out → n44.a
n13.out → n51.assertion
n52.out → n51.atom1
n6.out → n53.a
n8.out → n53.b
n10.out → n54.a
n53.out → n54.b
n38.out → n55.a
n54.out → n55.b
n55.out → n51.formula1
n51.out → n44.b
n44.out → n43.a
n22.out → n57.assertion
n58.out → n57.atom1
n7.out → n57.formula1
n59.out → n57.atom2
n38.out → n57.formula2
n60.out → n57.atom3
n54.out → n57.formula3
n57.out → n43.b
n43.out → n42.a
n13.out → n62.assertion
n63.out → n62.atom1
n7.out → n64.a
n54.out → n64.b
n39.out → n65.a
n64.out → n65.b
n65.out → n62.formula1
n66.out → n62.atom2
n10.out → n62.formula2
n62.out → n42.b
n42.out → n41.a
n22.out → n68.assertion
n69.out → n68.atom1
n10.out → n68.formula1
n70.out → n68.atom2
n39.out → n68.formula2
n71.out → n68.atom3
n64.out → n68.formula3
n68.out → n41.b
n41.out → n29.b
n29.out → n28.a
n22.out → n75.assertion
n76.out → n75.atom1
n7.out → n75.formula1
n77.out → n75.atom2
n10.out → n75.formula2
n78.out → n75.atom3
n53.out → n75.formula3
n75.out → n73.a
n13.out → n80.assertion
n81.out → n80.atom1
n7.out → n82.a
n53.out → n82.b
n19.out → n83.a
n82.out → n83.b
n64.out → n84.a
n83.out → n84.b
n84.out → n80.formula1
n85.out → n80.atom2
n10.out → n80.formula2
n80.out → n73.b
n73.out → n72.a
n22.out → n87.assertion
n88.out → n87.atom1
n10.out → n87.formula1
n89.out → n87.atom2
n64.out → n87.formula2
n90.out → n87.atom3
n83.out → n87.formula3
n87.out → n72.b
n72.out → n28.b
n28.out → n27.a
n22.out → n92.assertion
n93.out → n92.atom1
n10.out → n92.formula1
n94.out → n92.atom2
n19.out → n92.formula2
n95.out → n92.atom3
n82.out → n92.formula3
n92.out → n27.b
n27.out → n1.b
n1.out → n96.proof
```

</details>

### 50 · 等值消去右 · 中间结论

- 目标：`⊢ ( ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) → ¬ ( P → ¬ Q ) )`
- 提示：(¬¬(P→¬Q)→¬(P→¬Q))→¬(P→¬Q)
- 参考解：71 个模块 / 116 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n10  atom Q
n11  not
n19  axiom A2
n30  atom P
n34  imp
n121  axiom A3
n631  not
n632  not
n695  imp
n705  mp
n706  mp
n708  subst(groups=1)
n709  atom P
n710  atom Q
n711  mp
n713  subst(groups=1)
n714  atom P
n715  atom Q
n716  imp
n718  subst(groups=2)
n719  atom P
n720  atom Q
n721  atom R
n722  mp
n723  mp
n727  mp
n728  mp
n749  subst(groups=1)
n750  atom P
n751  atom Q
n752  not
n753  not
n757  imp
n765  mp
n766  mp
n768  subst(groups=1)
n769  atom P
n770  atom Q
n772  subst(groups=1)
n773  atom P
n774  imp
n775  imp
n776  atom Q
n778  subst(groups=2)
n779  atom P
n780  atom Q
n781  atom R
n783  subst(groups=2)
n784  atom P
n785  atom Q
n786  atom R
n790  imp
n798  mp
n799  mp
n801  subst(groups=1)
n802  atom P
n803  atom Q
n805  subst(groups=1)
n806  atom P
n807  imp
n808  imp
n809  atom Q
n811  subst(groups=2)
n812  atom P
n813  atom Q
n814  atom R
n816  subst(groups=2)
n817  atom P
n818  atom Q
n819  atom R

接线：
n10.out → n11.a
n30.out → n34.a
n11.out → n34.b
n34.out → n631.a
n631.out → n632.a
n632.out → n695.a
n631.out → n695.b
n7.out → n708.assertion
n709.out → n708.atom1
n695.out → n708.formula1
n710.out → n708.atom2
n695.out → n708.formula2
n708.out → n706.a
n7.out → n713.assertion
n714.out → n713.atom1
n695.out → n713.formula1
n715.out → n713.atom2
n695.out → n716.a
n695.out → n716.b
n716.out → n713.formula2
n713.out → n711.a
n19.out → n718.assertion
n719.out → n718.atom1
n695.out → n718.formula1
n720.out → n718.atom2
n716.out → n718.formula2
n721.out → n718.atom3
n695.out → n718.formula3
n718.out → n711.b
n711.out → n706.b
n706.out → n705.a
n7.out → n749.assertion
n750.out → n749.atom1
n632.out → n749.formula1
n751.out → n749.atom2
n695.out → n752.a
n752.out → n753.a
n753.out → n749.formula2
n753.out → n757.a
n632.out → n757.b
n749.out → n728.a
n121.out → n768.assertion
n769.out → n768.atom1
n752.out → n768.formula1
n770.out → n768.atom2
n631.out → n768.formula2
n768.out → n766.a
n7.out → n772.assertion
n773.out → n772.atom1
n631.out → n774.a
n752.out → n774.b
n757.out → n775.a
n774.out → n775.b
n775.out → n772.formula1
n776.out → n772.atom2
n632.out → n772.formula2
n772.out → n766.b
n766.out → n765.a
n19.out → n778.assertion
n779.out → n778.atom1
n632.out → n778.formula1
n780.out → n778.atom2
n757.out → n778.formula2
n781.out → n778.atom3
n774.out → n778.formula3
n778.out → n765.b
n765.out → n728.b
n728.out → n727.a
n19.out → n783.assertion
n784.out → n783.atom1
n632.out → n783.formula1
n785.out → n783.atom2
n631.out → n783.formula2
n786.out → n783.atom3
n752.out → n783.formula3
n783.out → n727.b
n632.out → n790.a
n752.out → n790.b
n727.out → n723.a
n121.out → n801.assertion
n802.out → n801.atom1
n631.out → n801.formula1
n803.out → n801.atom2
n695.out → n801.formula2
n801.out → n799.a
n7.out → n805.assertion
n806.out → n805.atom1
n695.out → n807.a
n631.out → n807.b
n790.out → n808.a
n807.out → n808.b
n808.out → n805.formula1
n809.out → n805.atom2
n695.out → n805.formula2
n805.out → n799.b
n799.out → n798.a
n19.out → n811.assertion
n812.out → n811.atom1
n695.out → n811.formula1
n813.out → n811.atom2
n790.out → n811.formula2
n814.out → n811.atom3
n807.out → n811.formula3
n811.out → n798.b
n798.out → n723.b
n723.out → n722.a
n19.out → n816.assertion
n817.out → n816.atom1
n695.out → n816.formula1
n818.out → n816.atom2
n695.out → n816.formula2
n819.out → n816.atom3
n631.out → n816.formula3
n816.out → n722.b
n722.out → n705.b
n705.out → tgt.proof
```

</details>

### 51 · 反件左消

- 目标：`⊢ ( ( ( P → Q ) → R ) → ( ¬ P → R ) )`
- 提示：((P→Q)→R)→¬P→R
- 参考解：73 个模块 / 120 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n99  [target]
n1  mp
n3  定理 *01
n4  subst(groups=0)
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  atom R
n10  imp
n13  axiom A1
n14  subst(groups=1)
n15  atom P
n16  atom Q
n17  not
n21  imp
n24  axiom A2
n29  mp
n30  mp
n31  mp
n32  mp
n33  mp
n34  定理 *05
n35  mp
n36  mp
n38  subst(groups=1)
n39  atom P
n40  atom Q
n42  subst(groups=1)
n43  atom P
n44  imp
n45  imp
n46  atom Q
n48  subst(groups=2)
n49  atom P
n50  atom Q
n51  atom R
n52  mp
n53  mp
n54  mp
n56  mp
n58  subst(groups=0)
n59  atom P
n61  subst(groups=1)
n62  atom P
n63  imp
n64  atom Q
n66  subst(groups=1)
n67  atom P
n68  atom Q
n70  subst(groups=1)
n71  atom P
n72  atom Q
n74  subst(groups=1)
n75  atom P
n76  imp
n77  imp
n78  atom Q
n80  subst(groups=2)
n81  atom P
n82  atom Q
n83  atom R
n85  subst(groups=1)
n86  atom P
n87  atom Q
n89  subst(groups=1)
n90  atom P
n91  imp
n92  imp
n93  atom Q
n95  subst(groups=2)
n96  atom P
n97  atom Q
n98  atom R

接线：
n3.out → n4.assertion
n5.out → n4.atom1
n6.out → n8.a
n7.out → n8.b
n8.out → n10.a
n9.out → n10.b
n10.out → n4.formula1
n13.out → n14.assertion
n15.out → n14.atom1
n10.out → n14.formula1
n16.out → n14.atom2
n6.out → n17.a
n17.out → n14.formula2
n17.out → n21.a
n10.out → n21.b
n14.out → n1.a
n34.out → n33.a
n13.out → n38.assertion
n39.out → n38.atom1
n8.out → n38.formula1
n40.out → n38.atom2
n10.out → n38.formula2
n38.out → n36.a
n13.out → n42.assertion
n43.out → n42.atom1
n10.out → n44.a
n8.out → n44.b
n8.out → n45.a
n44.out → n45.b
n45.out → n42.formula1
n46.out → n42.atom2
n17.out → n42.formula2
n42.out → n36.b
n36.out → n35.a
n24.out → n48.assertion
n49.out → n48.atom1
n17.out → n48.formula1
n50.out → n48.atom2
n8.out → n48.formula2
n51.out → n48.atom3
n44.out → n48.formula3
n48.out → n35.b
n35.out → n33.b
n33.out → n32.a
n3.out → n58.assertion
n59.out → n58.atom1
n9.out → n58.formula1
n58.out → n56.a
n13.out → n61.assertion
n62.out → n61.atom1
n9.out → n63.a
n9.out → n63.b
n63.out → n61.formula1
n64.out → n61.atom2
n8.out → n61.formula2
n61.out → n56.b
n56.out → n4.a
n24.out → n66.assertion
n67.out → n66.atom1
n8.out → n66.formula1
n68.out → n66.atom2
n9.out → n66.formula2
n66.out → n4.b
n4.out → n54.a
n24.out → n70.assertion
n71.out → n70.atom1
n10.out → n70.formula1
n72.out → n70.atom2
n8.out → n70.formula2
n70.out → n54.b
n54.out → n53.a
n13.out → n74.assertion
n75.out → n74.atom1
n10.out → n76.a
n9.out → n76.b
n44.out → n77.a
n76.out → n77.b
n77.out → n74.formula1
n78.out → n74.atom2
n17.out → n74.formula2
n74.out → n53.b
n53.out → n52.a
n24.out → n80.assertion
n81.out → n80.atom1
n17.out → n80.formula1
n82.out → n80.atom2
n44.out → n80.formula2
n83.out → n80.atom3
n76.out → n80.formula3
n80.out → n52.b
n52.out → n32.b
n32.out → n31.a
n24.out → n85.assertion
n86.out → n85.atom1
n17.out → n85.formula1
n87.out → n85.atom2
n10.out → n85.formula2
n85.out → n31.b
n31.out → n30.a
n13.out → n89.assertion
n90.out → n89.atom1
n17.out → n91.a
n9.out → n91.b
n21.out → n92.a
n91.out → n92.b
n92.out → n89.formula1
n93.out → n89.atom2
n10.out → n89.formula2
n89.out → n30.b
n30.out → n29.a
n24.out → n95.assertion
n96.out → n95.atom1
n10.out → n95.formula1
n97.out → n95.atom2
n21.out → n95.formula2
n98.out → n95.atom3
n91.out → n95.formula3
n95.out → n29.b
n29.out → n1.b
n1.out → n99.proof
```

</details>

### 52 · 否定蕴涵取前件

- 目标：`⊢ ( ¬ ( P → Q ) → P )`
- 提示：¬(P→Q)→P
- 参考解：74 个模块 / 118 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n128  [target]
n1  mp
n2  mp
n3  定理 *05
n4  mp
n5  mp
n6  mp
n11  atom P
n12  not
n15  axiom A1
n16  subst(groups=1)
n17  atom P
n18  atom Q
n19  atom Q
n20  imp
n21  not
n22  not
n23  not
n27  imp
n30  axiom A2
n35  mp
n36  mp
n37  mp
n39  mp
n40  定理 *35
n41  subst(groups=0)
n42  atom P
n43  mp
n44  mp
n46  subst(groups=1)
n47  atom P
n48  atom Q
n50  subst(groups=1)
n51  atom P
n52  imp
n53  imp
n54  atom Q
n56  subst(groups=2)
n57  atom P
n58  atom Q
n59  atom R
n88  subst(groups=2)
n89  atom P
n90  atom Q
n91  atom R
n93  subst(groups=1)
n94  atom P
n95  imp
n96  imp
n97  atom Q
n99  subst(groups=2)
n100  atom P
n101  atom Q
n102  atom R
n103  mp
n104  mp
n105  定理 *?
n106  subst(groups=1)
n107  atom P
n108  atom Q
n110  subst(groups=1)
n111  atom P
n112  imp
n113  imp
n114  atom Q
n116  subst(groups=2)
n117  atom P
n118  atom Q
n119  atom R
n121  subst(groups=2)
n122  atom P
n123  atom Q
n124  atom R
n126  subst(groups=0)
n127  atom Q

接线：
n3.out → n2.a
n11.out → n12.a
n15.out → n16.assertion
n17.out → n16.atom1
n12.out → n16.formula1
n18.out → n16.atom2
n11.out → n20.a
n19.out → n20.b
n20.out → n21.a
n21.out → n22.a
n22.out → n23.a
n23.out → n16.formula2
n23.out → n27.a
n12.out → n27.b
n16.out → n6.a
n40.out → n41.assertion
n42.out → n41.atom1
n21.out → n41.formula1
n41.out → n39.a
n15.out → n46.assertion
n47.out → n46.atom1
n21.out → n46.formula1
n48.out → n46.atom2
n12.out → n46.formula2
n46.out → n44.a
n15.out → n50.assertion
n51.out → n50.atom1
n12.out → n52.a
n21.out → n52.b
n21.out → n53.a
n52.out → n53.b
n53.out → n50.formula1
n54.out → n50.atom2
n23.out → n50.formula2
n50.out → n44.b
n44.out → n43.a
n30.out → n56.assertion
n57.out → n56.atom1
n23.out → n56.formula1
n58.out → n56.atom2
n21.out → n56.formula2
n59.out → n56.atom3
n52.out → n56.formula3
n56.out → n43.b
n43.out → n39.b
n39.out → n37.a
n30.out → n88.assertion
n89.out → n88.atom1
n23.out → n88.formula1
n90.out → n88.atom2
n12.out → n88.formula2
n91.out → n88.atom3
n21.out → n88.formula3
n88.out → n37.b
n37.out → n36.a
n15.out → n93.assertion
n94.out → n93.atom1
n23.out → n95.a
n21.out → n95.b
n27.out → n96.a
n95.out → n96.b
n96.out → n93.formula1
n97.out → n93.atom2
n12.out → n93.formula2
n93.out → n36.b
n36.out → n35.a
n30.out → n99.assertion
n100.out → n99.atom1
n12.out → n99.formula1
n101.out → n99.atom2
n27.out → n99.formula2
n102.out → n99.atom3
n95.out → n99.formula3
n99.out → n35.b
n35.out → n6.b
n6.out → n5.a
n105.out → n106.assertion
n107.out → n106.atom1
n22.out → n106.formula1
n108.out → n106.atom2
n20.out → n106.formula2
n106.out → n104.a
n15.out → n110.assertion
n111.out → n110.atom1
n20.out → n112.a
n22.out → n112.b
n95.out → n113.a
n112.out → n113.b
n113.out → n110.formula1
n114.out → n110.atom2
n12.out → n110.formula2
n110.out → n104.b
n104.out → n103.a
n30.out → n116.assertion
n117.out → n116.atom1
n12.out → n116.formula1
n118.out → n116.atom2
n95.out → n116.formula2
n119.out → n116.atom3
n112.out → n116.formula3
n116.out → n103.b
n103.out → n5.b
n5.out → n4.a
n30.out → n121.assertion
n122.out → n121.atom1
n12.out → n121.formula1
n123.out → n121.atom2
n20.out → n121.formula2
n124.out → n121.atom3
n22.out → n121.formula3
n121.out → n4.b
n4.out → n2.b
n2.out → n1.a
n105.out → n126.assertion
n127.out → n126.atom1
n21.out → n126.formula1
n126.out → n1.b
n1.out → n128.proof
```

</details>

### 53 · 否定蕴涵前件三

- 目标：`⊢ ( ¬ ( P → Q ) → ( R → P ) )`
- 提示：¬(P→Q)→R→P
- 参考解：22 个模块 / 29 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n24  [target]
n1  mp
n2  定理 *52
n3  mp
n4  mp
n5  axiom A1
n6  subst(groups=0)
n7  atom Q
n8  atom R
n10  subst(groups=1)
n11  atom P
n12  atom P
n13  imp
n14  imp
n15  atom Q
n16  atom Q
n17  imp
n18  not
n19  axiom A2
n20  subst(groups=2)
n21  atom P
n22  atom Q
n23  atom R

接线：
n2.out → n1.a
n5.out → n6.assertion
n7.out → n6.atom1
n8.out → n6.formula1
n6.out → n4.a
n5.out → n10.assertion
n11.out → n10.atom1
n8.out → n13.a
n12.out → n13.b
n12.out → n14.a
n13.out → n14.b
n14.out → n10.formula1
n15.out → n10.atom2
n12.out → n17.a
n16.out → n17.b
n17.out → n18.a
n18.out → n10.formula2
n10.out → n4.b
n4.out → n3.a
n19.out → n20.assertion
n21.out → n20.atom1
n18.out → n20.formula1
n22.out → n20.atom2
n12.out → n20.formula2
n23.out → n20.atom3
n13.out → n20.formula3
n20.out → n3.b
n3.out → n1.b
n1.out → n24.proof
```

</details>

### 54 · 否定蕴涵分配二

- 目标：`⊢ ( ¬ ( P → Q ) → ( ¬ P → R ) )`
- 提示：¬(P→Q)→¬P→R
- 参考解：64 个模块 / 99 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n72  [target]
n1  mp
n2  mp
n3  mp
n4  定理 *52
n5  mp
n6  mp
n7  axiom A1
n8  subst(groups=0)
n9  atom Q
n10  atom R
n11  not
n13  subst(groups=1)
n14  atom P
n15  atom P
n16  imp
n17  imp
n18  atom Q
n19  atom Q
n20  imp
n21  not
n22  axiom A2
n23  subst(groups=2)
n24  atom P
n25  atom Q
n26  atom R
n27  mp
n28  mp
n29  mp
n30  mp
n31  定理 *41
n33  subst(groups=1)
n34  atom P
n35  not
n36  not
n37  imp
n38  atom Q
n40  subst(groups=2)
n41  atom P
n42  atom Q
n43  atom R
n45  subst(groups=1)
n46  atom P
n47  imp
n48  imp
n49  atom Q
n51  subst(groups=2)
n52  atom P
n53  atom Q
n54  atom R
n55  mp
n56  mp
n57  定理 *?
n58  subst(groups=1)
n59  atom P
n60  atom Q
n62  subst(groups=1)
n63  atom P
n64  imp
n65  imp
n66  atom Q
n68  subst(groups=2)
n69  atom P
n70  atom Q
n71  atom R

接线：
n4.out → n3.a
n7.out → n8.assertion
n9.out → n8.atom1
n10.out → n11.a
n11.out → n8.formula1
n8.out → n6.a
n7.out → n13.assertion
n14.out → n13.atom1
n11.out → n16.a
n15.out → n16.b
n15.out → n17.a
n16.out → n17.b
n17.out → n13.formula1
n18.out → n13.atom2
n15.out → n20.a
n19.out → n20.b
n20.out → n21.a
n21.out → n13.formula2
n13.out → n6.b
n6.out → n5.a
n22.out → n23.assertion
n24.out → n23.atom1
n21.out → n23.formula1
n25.out → n23.atom2
n15.out → n23.formula2
n26.out → n23.atom3
n16.out → n23.formula3
n23.out → n5.b
n5.out → n3.b
n3.out → n2.a
n31.out → n30.a
n7.out → n33.assertion
n34.out → n33.atom1
n15.out → n35.a
n35.out → n36.a
n15.out → n37.a
n36.out → n37.b
n37.out → n33.formula1
n38.out → n33.atom2
n11.out → n33.formula2
n33.out → n30.b
n30.out → n29.a
n22.out → n40.assertion
n41.out → n40.atom1
n11.out → n40.formula1
n42.out → n40.atom2
n15.out → n40.formula2
n43.out → n40.atom3
n36.out → n40.formula3
n40.out → n29.b
n29.out → n28.a
n7.out → n45.assertion
n46.out → n45.atom1
n11.out → n47.a
n36.out → n47.b
n16.out → n48.a
n47.out → n48.b
n48.out → n45.formula1
n49.out → n45.atom2
n21.out → n45.formula2
n45.out → n28.b
n28.out → n27.a
n22.out → n51.assertion
n52.out → n51.atom1
n21.out → n51.formula1
n53.out → n51.atom2
n16.out → n51.formula2
n54.out → n51.atom3
n47.out → n51.formula3
n51.out → n27.b
n27.out → n2.b
n2.out → n1.a
n57.out → n58.assertion
n59.out → n58.atom1
n10.out → n58.formula1
n60.out → n58.atom2
n35.out → n58.formula2
n58.out → n56.a
n7.out → n62.assertion
n63.out → n62.atom1
n35.out → n64.a
n10.out → n64.b
n47.out → n65.a
n64.out → n65.b
n65.out → n62.formula1
n66.out → n62.atom2
n21.out → n62.formula2
n62.out → n56.b
n56.out → n55.a
n22.out → n68.assertion
n69.out → n68.atom1
n21.out → n68.formula1
n70.out → n68.atom2
n47.out → n68.formula2
n71.out → n68.atom3
n64.out → n68.formula3
n68.out → n55.b
n55.out → n1.b
n1.out → n72.proof
```

</details>

### 55 · 合取消去左 · 中间结论

- 目标：`⊢ ( ¬ ¬ ¬ ( P → Q ) → ( ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) → ¬ ( P → Q ) ) )`
- 提示：¬¬¬(P→Q)→(¬¬(P→Q)→¬(P→Q))→¬(P→Q)
- 参考解：75 个模块 / 123 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n10  atom P
n19  axiom A2
n30  atom Q
n45  axiom A3
n52  imp
n70  not
n71  not
n72  not
n134  imp
n143  mp
n144  mp
n145  mp
n147  subst(groups=1)
n148  atom P
n149  atom Q
n150  mp
n152  subst(groups=1)
n153  atom P
n154  atom Q
n155  imp
n157  subst(groups=2)
n158  atom P
n159  atom Q
n160  atom R
n161  mp
n162  mp
n166  mp
n167  mp
n188  subst(groups=1)
n189  atom P
n190  atom Q
n191  not
n192  not
n196  imp
n204  mp
n205  mp
n207  subst(groups=1)
n208  atom P
n209  atom Q
n211  subst(groups=1)
n212  atom P
n213  imp
n214  imp
n215  atom Q
n217  subst(groups=2)
n218  atom P
n219  atom Q
n220  atom R
n222  subst(groups=2)
n223  atom P
n224  atom Q
n225  atom R
n229  imp
n237  mp
n238  mp
n240  subst(groups=1)
n241  atom P
n242  atom Q
n244  subst(groups=1)
n245  atom P
n246  imp
n247  imp
n248  atom Q
n250  subst(groups=2)
n251  atom P
n252  atom Q
n253  atom R
n255  subst(groups=2)
n256  atom P
n257  atom Q
n258  atom R
n260  subst(groups=1)
n261  atom P
n262  atom Q

接线：
n10.out → n52.a
n30.out → n52.b
n52.out → n70.a
n70.out → n71.a
n71.out → n72.a
n71.out → n134.a
n70.out → n134.b
n7.out → n147.assertion
n148.out → n147.atom1
n134.out → n147.formula1
n149.out → n147.atom2
n134.out → n147.formula2
n147.out → n145.a
n7.out → n152.assertion
n153.out → n152.atom1
n134.out → n152.formula1
n154.out → n152.atom2
n134.out → n155.a
n134.out → n155.b
n155.out → n152.formula2
n152.out → n150.a
n19.out → n157.assertion
n158.out → n157.atom1
n134.out → n157.formula1
n159.out → n157.atom2
n155.out → n157.formula2
n160.out → n157.atom3
n134.out → n157.formula3
n157.out → n150.b
n150.out → n145.b
n145.out → n144.a
n7.out → n188.assertion
n189.out → n188.atom1
n71.out → n188.formula1
n190.out → n188.atom2
n134.out → n191.a
n191.out → n192.a
n192.out → n188.formula2
n192.out → n196.a
n71.out → n196.b
n188.out → n167.a
n45.out → n207.assertion
n208.out → n207.atom1
n191.out → n207.formula1
n209.out → n207.atom2
n70.out → n207.formula2
n207.out → n205.a
n7.out → n211.assertion
n212.out → n211.atom1
n70.out → n213.a
n191.out → n213.b
n196.out → n214.a
n213.out → n214.b
n214.out → n211.formula1
n215.out → n211.atom2
n71.out → n211.formula2
n211.out → n205.b
n205.out → n204.a
n19.out → n217.assertion
n218.out → n217.atom1
n71.out → n217.formula1
n219.out → n217.atom2
n196.out → n217.formula2
n220.out → n217.atom3
n213.out → n217.formula3
n217.out → n204.b
n204.out → n167.b
n167.out → n166.a
n19.out → n222.assertion
n223.out → n222.atom1
n71.out → n222.formula1
n224.out → n222.atom2
n70.out → n222.formula2
n225.out → n222.atom3
n191.out → n222.formula3
n222.out → n166.b
n71.out → n229.a
n191.out → n229.b
n166.out → n162.a
n45.out → n240.assertion
n241.out → n240.atom1
n70.out → n240.formula1
n242.out → n240.atom2
n134.out → n240.formula2
n240.out → n238.a
n7.out → n244.assertion
n245.out → n244.atom1
n134.out → n246.a
n70.out → n246.b
n229.out → n247.a
n246.out → n247.b
n247.out → n244.formula1
n248.out → n244.atom2
n134.out → n244.formula2
n244.out → n238.b
n238.out → n237.a
n19.out → n250.assertion
n251.out → n250.atom1
n134.out → n250.formula1
n252.out → n250.atom2
n229.out → n250.formula2
n253.out → n250.atom3
n246.out → n250.formula3
n250.out → n237.b
n237.out → n162.b
n162.out → n161.a
n19.out → n255.assertion
n256.out → n255.atom1
n134.out → n255.formula1
n257.out → n255.atom2
n134.out → n255.formula2
n258.out → n255.atom3
n70.out → n255.formula3
n255.out → n161.b
n161.out → n144.b
n144.out → n143.a
n7.out → n260.assertion
n261.out → n260.atom1
n246.out → n260.formula1
n262.out → n260.atom2
n72.out → n260.formula2
n260.out → n143.b
n143.out → tgt.proof
```

</details>

### 56 · 等值引入 · 中间结论

- 目标：`⊢ ( ¬ ¬ ( P → ¬ Q ) → ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( P → ¬ Q ) ) )`
- 提示：¬¬(P→¬Q)→(¬(P→¬Q)→P→¬Q)→P→¬Q
- 参考解：75 个模块 / 123 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  axiom A1
n9  atom P
n15  axiom A2
n24  atom Q
n25  not
n26  imp
n27  not
n28  not
n82  axiom A3
n89  imp
n98  mp
n99  mp
n100  mp
n102  subst(groups=1)
n103  atom P
n104  atom Q
n105  mp
n107  subst(groups=1)
n108  atom P
n109  atom Q
n110  imp
n112  subst(groups=2)
n113  atom P
n114  atom Q
n115  atom R
n116  mp
n117  mp
n121  mp
n122  mp
n143  subst(groups=1)
n144  atom P
n145  atom Q
n146  not
n147  not
n151  imp
n159  mp
n160  mp
n162  subst(groups=1)
n163  atom P
n164  atom Q
n166  subst(groups=1)
n167  atom P
n168  imp
n169  imp
n170  atom Q
n172  subst(groups=2)
n173  atom P
n174  atom Q
n175  atom R
n177  subst(groups=2)
n178  atom P
n179  atom Q
n180  atom R
n184  imp
n192  mp
n193  mp
n195  subst(groups=1)
n196  atom P
n197  atom Q
n199  subst(groups=1)
n200  atom P
n201  imp
n202  imp
n203  atom Q
n205  subst(groups=2)
n206  atom P
n207  atom Q
n208  atom R
n210  subst(groups=2)
n211  atom P
n212  atom Q
n213  atom R
n215  subst(groups=1)
n216  atom P
n217  atom Q

接线：
n24.out → n25.a
n9.out → n26.a
n25.out → n26.b
n26.out → n27.a
n27.out → n28.a
n27.out → n89.a
n26.out → n89.b
n6.out → n102.assertion
n103.out → n102.atom1
n89.out → n102.formula1
n104.out → n102.atom2
n89.out → n102.formula2
n102.out → n100.a
n6.out → n107.assertion
n108.out → n107.atom1
n89.out → n107.formula1
n109.out → n107.atom2
n89.out → n110.a
n89.out → n110.b
n110.out → n107.formula2
n107.out → n105.a
n15.out → n112.assertion
n113.out → n112.atom1
n89.out → n112.formula1
n114.out → n112.atom2
n110.out → n112.formula2
n115.out → n112.atom3
n89.out → n112.formula3
n112.out → n105.b
n105.out → n100.b
n100.out → n99.a
n6.out → n143.assertion
n144.out → n143.atom1
n27.out → n143.formula1
n145.out → n143.atom2
n89.out → n146.a
n146.out → n147.a
n147.out → n143.formula2
n147.out → n151.a
n27.out → n151.b
n143.out → n122.a
n82.out → n162.assertion
n163.out → n162.atom1
n146.out → n162.formula1
n164.out → n162.atom2
n26.out → n162.formula2
n162.out → n160.a
n6.out → n166.assertion
n167.out → n166.atom1
n26.out → n168.a
n146.out → n168.b
n151.out → n169.a
n168.out → n169.b
n169.out → n166.formula1
n170.out → n166.atom2
n27.out → n166.formula2
n166.out → n160.b
n160.out → n159.a
n15.out → n172.assertion
n173.out → n172.atom1
n27.out → n172.formula1
n174.out → n172.atom2
n151.out → n172.formula2
n175.out → n172.atom3
n168.out → n172.formula3
n172.out → n159.b
n159.out → n122.b
n122.out → n121.a
n15.out → n177.assertion
n178.out → n177.atom1
n27.out → n177.formula1
n179.out → n177.atom2
n26.out → n177.formula2
n180.out → n177.atom3
n146.out → n177.formula3
n177.out → n121.b
n27.out → n184.a
n146.out → n184.b
n121.out → n117.a
n82.out → n195.assertion
n196.out → n195.atom1
n26.out → n195.formula1
n197.out → n195.atom2
n89.out → n195.formula2
n195.out → n193.a
n6.out → n199.assertion
n200.out → n199.atom1
n89.out → n201.a
n26.out → n201.b
n184.out → n202.a
n201.out → n202.b
n202.out → n199.formula1
n203.out → n199.atom2
n89.out → n199.formula2
n199.out → n193.b
n193.out → n192.a
n15.out → n205.assertion
n206.out → n205.atom1
n89.out → n205.formula1
n207.out → n205.atom2
n184.out → n205.formula2
n208.out → n205.atom3
n201.out → n205.formula3
n205.out → n192.b
n192.out → n117.b
n117.out → n116.a
n15.out → n210.assertion
n211.out → n210.atom1
n89.out → n210.formula1
n212.out → n210.atom2
n89.out → n210.formula2
n213.out → n210.atom3
n26.out → n210.formula3
n210.out → n116.b
n116.out → n99.b
n99.out → n98.a
n6.out → n215.assertion
n216.out → n215.atom1
n201.out → n215.formula1
n217.out → n215.atom2
n28.out → n215.formula2
n215.out → n98.b
n98.out → tgt.proof
```

</details>

### 57 · 等值消去右 · 中间结论

- 目标：`⊢ ( ¬ ¬ ¬ ( P → ¬ Q ) → ( ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) → ¬ ( P → ¬ Q ) ) )`
- 提示：¬¬¬(P→¬Q)→(¬¬(P→¬Q)→¬(P→¬Q))→¬(P→¬Q)
- 参考解：76 个模块 / 124 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n10  atom Q
n11  not
n19  axiom A2
n30  atom P
n34  imp
n121  axiom A3
n631  not
n632  not
n633  not
n695  imp
n704  mp
n705  mp
n706  mp
n708  subst(groups=1)
n709  atom P
n710  atom Q
n711  mp
n713  subst(groups=1)
n714  atom P
n715  atom Q
n716  imp
n718  subst(groups=2)
n719  atom P
n720  atom Q
n721  atom R
n722  mp
n723  mp
n727  mp
n728  mp
n749  subst(groups=1)
n750  atom P
n751  atom Q
n752  not
n753  not
n757  imp
n765  mp
n766  mp
n768  subst(groups=1)
n769  atom P
n770  atom Q
n772  subst(groups=1)
n773  atom P
n774  imp
n775  imp
n776  atom Q
n778  subst(groups=2)
n779  atom P
n780  atom Q
n781  atom R
n783  subst(groups=2)
n784  atom P
n785  atom Q
n786  atom R
n790  imp
n798  mp
n799  mp
n801  subst(groups=1)
n802  atom P
n803  atom Q
n805  subst(groups=1)
n806  atom P
n807  imp
n808  imp
n809  atom Q
n811  subst(groups=2)
n812  atom P
n813  atom Q
n814  atom R
n816  subst(groups=2)
n817  atom P
n818  atom Q
n819  atom R
n821  subst(groups=1)
n822  atom P
n823  atom Q

接线：
n10.out → n11.a
n30.out → n34.a
n11.out → n34.b
n34.out → n631.a
n631.out → n632.a
n632.out → n633.a
n632.out → n695.a
n631.out → n695.b
n7.out → n708.assertion
n709.out → n708.atom1
n695.out → n708.formula1
n710.out → n708.atom2
n695.out → n708.formula2
n708.out → n706.a
n7.out → n713.assertion
n714.out → n713.atom1
n695.out → n713.formula1
n715.out → n713.atom2
n695.out → n716.a
n695.out → n716.b
n716.out → n713.formula2
n713.out → n711.a
n19.out → n718.assertion
n719.out → n718.atom1
n695.out → n718.formula1
n720.out → n718.atom2
n716.out → n718.formula2
n721.out → n718.atom3
n695.out → n718.formula3
n718.out → n711.b
n711.out → n706.b
n706.out → n705.a
n7.out → n749.assertion
n750.out → n749.atom1
n632.out → n749.formula1
n751.out → n749.atom2
n695.out → n752.a
n752.out → n753.a
n753.out → n749.formula2
n753.out → n757.a
n632.out → n757.b
n749.out → n728.a
n121.out → n768.assertion
n769.out → n768.atom1
n752.out → n768.formula1
n770.out → n768.atom2
n631.out → n768.formula2
n768.out → n766.a
n7.out → n772.assertion
n773.out → n772.atom1
n631.out → n774.a
n752.out → n774.b
n757.out → n775.a
n774.out → n775.b
n775.out → n772.formula1
n776.out → n772.atom2
n632.out → n772.formula2
n772.out → n766.b
n766.out → n765.a
n19.out → n778.assertion
n779.out → n778.atom1
n632.out → n778.formula1
n780.out → n778.atom2
n757.out → n778.formula2
n781.out → n778.atom3
n774.out → n778.formula3
n778.out → n765.b
n765.out → n728.b
n728.out → n727.a
n19.out → n783.assertion
n784.out → n783.atom1
n632.out → n783.formula1
n785.out → n783.atom2
n631.out → n783.formula2
n786.out → n783.atom3
n752.out → n783.formula3
n783.out → n727.b
n632.out → n790.a
n752.out → n790.b
n727.out → n723.a
n121.out → n801.assertion
n802.out → n801.atom1
n631.out → n801.formula1
n803.out → n801.atom2
n695.out → n801.formula2
n801.out → n799.a
n7.out → n805.assertion
n806.out → n805.atom1
n695.out → n807.a
n631.out → n807.b
n790.out → n808.a
n807.out → n808.b
n808.out → n805.formula1
n809.out → n805.atom2
n695.out → n805.formula2
n805.out → n799.b
n799.out → n798.a
n19.out → n811.assertion
n812.out → n811.atom1
n695.out → n811.formula1
n813.out → n811.atom2
n790.out → n811.formula2
n814.out → n811.atom3
n807.out → n811.formula3
n811.out → n798.b
n798.out → n723.b
n723.out → n722.a
n19.out → n816.assertion
n817.out → n816.atom1
n695.out → n816.formula1
n818.out → n816.atom2
n695.out → n816.formula2
n819.out → n816.atom3
n631.out → n816.formula3
n816.out → n722.b
n722.out → n705.b
n705.out → n704.a
n7.out → n821.assertion
n822.out → n821.atom1
n807.out → n821.formula1
n823.out → n821.atom2
n633.out → n821.formula2
n821.out → n704.b
n704.out → tgt.proof
```

</details>

### 58 · 否定蕴涵取后件

- 目标：`⊢ ( ¬ ( P → ¬ Q ) → Q )`
- 提示：¬(P→¬Q)→Q
- 参考解：77 个模块 / 125 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n282  [target]
n1  mp
n2  mp
n8  atom Q
n9  not
n12  axiom A1
n13  subst(groups=1)
n14  atom P
n15  atom Q
n16  atom P
n20  imp
n23  axiom A2
n57  定理 *35
n136  定理 *?
n164  mp
n165  mp
n166  mp
n171  subst(groups=1)
n172  atom P
n173  atom Q
n174  not
n175  not
n176  not
n180  imp
n188  mp
n189  mp
n190  mp
n192  mp
n194  subst(groups=0)
n195  atom P
n196  mp
n197  mp
n199  subst(groups=1)
n200  atom P
n201  atom Q
n203  subst(groups=1)
n204  atom P
n205  imp
n206  imp
n207  atom Q
n209  subst(groups=2)
n210  atom P
n211  atom Q
n212  atom R
n241  subst(groups=2)
n242  atom P
n243  atom Q
n244  atom R
n246  subst(groups=1)
n247  atom P
n248  imp
n249  imp
n250  atom Q
n252  subst(groups=2)
n253  atom P
n254  atom Q
n255  atom R
n256  mp
n257  mp
n259  subst(groups=1)
n260  atom P
n261  atom Q
n263  subst(groups=1)
n264  atom P
n265  imp
n266  imp
n267  atom Q
n269  subst(groups=2)
n270  atom P
n271  atom Q
n272  atom R
n274  subst(groups=2)
n275  atom P
n276  atom Q
n277  atom R
n279  subst(groups=1)
n280  atom P
n281  atom Q

接线：
n8.out → n9.a
n12.out → n13.assertion
n14.out → n13.atom1
n9.out → n13.formula1
n15.out → n13.atom2
n16.out → n13.formula2
n16.out → n20.a
n9.out → n20.b
n13.out → n2.a
n12.out → n171.assertion
n172.out → n171.atom1
n9.out → n171.formula1
n173.out → n171.atom2
n20.out → n174.a
n174.out → n175.a
n175.out → n176.a
n176.out → n171.formula2
n176.out → n180.a
n9.out → n180.b
n171.out → n166.a
n57.out → n194.assertion
n195.out → n194.atom1
n174.out → n194.formula1
n194.out → n192.a
n12.out → n199.assertion
n200.out → n199.atom1
n174.out → n199.formula1
n201.out → n199.atom2
n9.out → n199.formula2
n199.out → n197.a
n12.out → n203.assertion
n204.out → n203.atom1
n9.out → n205.a
n174.out → n205.b
n174.out → n206.a
n205.out → n206.b
n206.out → n203.formula1
n207.out → n203.atom2
n176.out → n203.formula2
n203.out → n197.b
n197.out → n196.a
n23.out → n209.assertion
n210.out → n209.atom1
n176.out → n209.formula1
n211.out → n209.atom2
n174.out → n209.formula2
n212.out → n209.atom3
n205.out → n209.formula3
n209.out → n196.b
n196.out → n192.b
n192.out → n190.a
n23.out → n241.assertion
n242.out → n241.atom1
n176.out → n241.formula1
n243.out → n241.atom2
n9.out → n241.formula2
n244.out → n241.atom3
n174.out → n241.formula3
n241.out → n190.b
n190.out → n189.a
n12.out → n246.assertion
n247.out → n246.atom1
n176.out → n248.a
n174.out → n248.b
n180.out → n249.a
n248.out → n249.b
n249.out → n246.formula1
n250.out → n246.atom2
n9.out → n246.formula2
n246.out → n189.b
n189.out → n188.a
n23.out → n252.assertion
n253.out → n252.atom1
n9.out → n252.formula1
n254.out → n252.atom2
n180.out → n252.formula2
n255.out → n252.atom3
n248.out → n252.formula3
n252.out → n188.b
n188.out → n166.b
n166.out → n165.a
n136.out → n259.assertion
n260.out → n259.atom1
n175.out → n259.formula1
n261.out → n259.atom2
n20.out → n259.formula2
n259.out → n257.a
n12.out → n263.assertion
n264.out → n263.atom1
n20.out → n265.a
n175.out → n265.b
n248.out → n266.a
n265.out → n266.b
n266.out → n263.formula1
n267.out → n263.atom2
n9.out → n263.formula2
n263.out → n257.b
n257.out → n256.a
n23.out → n269.assertion
n270.out → n269.atom1
n9.out → n269.formula1
n271.out → n269.atom2
n248.out → n269.formula2
n272.out → n269.atom3
n265.out → n269.formula3
n269.out → n256.b
n256.out → n165.b
n165.out → n164.a
n23.out → n274.assertion
n275.out → n274.atom1
n9.out → n274.formula1
n276.out → n274.atom2
n20.out → n274.formula2
n277.out → n274.atom3
n175.out → n274.formula3
n274.out → n164.b
n164.out → n2.b
n2.out → n1.a
n136.out → n279.assertion
n280.out → n279.atom1
n8.out → n279.formula1
n281.out → n279.atom2
n174.out → n279.formula2
n279.out → n1.b
n1.out → n282.proof
```

</details>

### 59 · 否定后件换位

- 目标：`⊢ ( ( P → ¬ Q ) → ( Q → ¬ P ) )`
- 提示：(P→¬Q)→Q→¬P
- 参考解：79 个模块 / 128 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n103  [target]
n1  mp
n2  mp
n4  定理 *01
n5  subst(groups=0)
n6  atom P
n7  atom P
n8  atom Q
n9  not
n10  imp
n13  axiom A1
n14  subst(groups=1)
n15  atom P
n16  atom Q
n17  not
n18  not
n22  imp
n25  axiom A2
n30  mp
n31  mp
n32  mp
n33  mp
n34  mp
n35  定理 *35
n36  mp
n37  mp
n39  subst(groups=0)
n40  atom Q
n42  subst(groups=1)
n43  atom P
n44  imp
n45  imp
n46  atom Q
n48  subst(groups=2)
n49  atom P
n50  atom Q
n51  atom R
n52  mp
n53  mp
n54  mp
n56  subst(groups=2)
n57  atom P
n58  atom Q
n59  atom R
n61  subst(groups=1)
n62  atom P
n63  imp
n64  imp
n65  atom Q
n67  subst(groups=2)
n68  atom P
n69  atom Q
n70  atom R
n72  subst(groups=2)
n73  atom P
n74  atom Q
n75  atom R
n77  subst(groups=1)
n78  atom P
n79  imp
n80  imp
n81  atom Q
n83  subst(groups=2)
n84  atom P
n85  atom Q
n86  atom R
n87  mp
n88  mp
n89  定理 *?
n90  subst(groups=0)
n91  atom P
n93  subst(groups=1)
n94  atom P
n95  imp
n96  imp
n97  atom Q
n99  subst(groups=2)
n100  atom P
n101  atom Q
n102  atom R

接线：
n4.out → n5.assertion
n6.out → n5.atom1
n8.out → n9.a
n7.out → n10.a
n9.out → n10.b
n10.out → n5.formula1
n13.out → n14.assertion
n15.out → n14.atom1
n10.out → n14.formula1
n16.out → n14.atom2
n7.out → n17.a
n17.out → n18.a
n18.out → n14.formula2
n18.out → n22.a
n10.out → n22.b
n14.out → n2.a
n35.out → n34.a
n13.out → n39.assertion
n40.out → n39.atom1
n10.out → n39.formula1
n39.out → n37.a
n13.out → n42.assertion
n43.out → n42.atom1
n10.out → n44.a
n7.out → n44.b
n7.out → n45.a
n44.out → n45.b
n45.out → n42.formula1
n46.out → n42.atom2
n18.out → n42.formula2
n42.out → n37.b
n37.out → n36.a
n25.out → n48.assertion
n49.out → n48.atom1
n18.out → n48.formula1
n50.out → n48.atom2
n7.out → n48.formula2
n51.out → n48.atom3
n44.out → n48.formula3
n48.out → n36.b
n36.out → n34.b
n34.out → n33.a
n5.out → n54.a
n25.out → n56.assertion
n57.out → n56.atom1
n10.out → n56.formula1
n58.out → n56.atom2
n7.out → n56.formula2
n59.out → n56.atom3
n9.out → n56.formula3
n56.out → n54.b
n54.out → n53.a
n13.out → n61.assertion
n62.out → n61.atom1
n10.out → n63.a
n9.out → n63.b
n44.out → n64.a
n63.out → n64.b
n64.out → n61.formula1
n65.out → n61.atom2
n18.out → n61.formula2
n61.out → n53.b
n53.out → n52.a
n25.out → n67.assertion
n68.out → n67.atom1
n18.out → n67.formula1
n69.out → n67.atom2
n44.out → n67.formula2
n70.out → n67.atom3
n63.out → n67.formula3
n67.out → n52.b
n52.out → n33.b
n33.out → n32.a
n25.out → n72.assertion
n73.out → n72.atom1
n18.out → n72.formula1
n74.out → n72.atom2
n10.out → n72.formula2
n75.out → n72.atom3
n9.out → n72.formula3
n72.out → n32.b
n32.out → n31.a
n13.out → n77.assertion
n78.out → n77.atom1
n18.out → n79.a
n9.out → n79.b
n22.out → n80.a
n79.out → n80.b
n80.out → n77.formula1
n81.out → n77.atom2
n10.out → n77.formula2
n77.out → n31.b
n31.out → n30.a
n25.out → n83.assertion
n84.out → n83.atom1
n10.out → n83.formula1
n85.out → n83.atom2
n22.out → n83.formula2
n86.out → n83.atom3
n79.out → n83.formula3
n83.out → n30.b
n30.out → n2.b
n2.out → n1.a
n89.out → n90.assertion
n91.out → n90.atom1
n17.out → n90.formula1
n90.out → n88.a
n13.out → n93.assertion
n94.out → n93.atom1
n8.out → n95.a
n17.out → n95.b
n79.out → n96.a
n95.out → n96.b
n96.out → n93.formula1
n97.out → n93.atom2
n10.out → n93.formula2
n93.out → n88.b
n88.out → n87.a
n25.out → n99.assertion
n100.out → n99.atom1
n10.out → n99.formula1
n101.out → n99.atom2
n79.out → n99.formula2
n102.out → n99.atom3
n95.out → n99.formula3
n99.out → n87.b
n87.out → n1.b
n1.out → n103.proof
```

</details>

### 60 · 合取消去左 · 中间结论

- 目标：`⊢ ( ( ¬ ¬ ¬ ( P → Q ) → ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) ) → ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) )`
- 提示：(¬¬¬(P→Q)→¬¬(P→Q)→¬(P→Q))→¬¬¬(P→Q)→¬(P→Q)
- 参考解：80 个模块 / 132 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n10  atom P
n19  axiom A2
n30  atom Q
n45  axiom A3
n52  imp
n70  not
n71  not
n72  not
n134  imp
n142  mp
n143  mp
n144  mp
n145  mp
n147  subst(groups=1)
n148  atom P
n149  atom Q
n150  mp
n152  subst(groups=1)
n153  atom P
n154  atom Q
n155  imp
n157  subst(groups=2)
n158  atom P
n159  atom Q
n160  atom R
n161  mp
n162  mp
n166  mp
n167  mp
n188  subst(groups=1)
n189  atom P
n190  atom Q
n191  not
n192  not
n196  imp
n204  mp
n205  mp
n207  subst(groups=1)
n208  atom P
n209  atom Q
n211  subst(groups=1)
n212  atom P
n213  imp
n214  imp
n215  atom Q
n217  subst(groups=2)
n218  atom P
n219  atom Q
n220  atom R
n222  subst(groups=2)
n223  atom P
n224  atom Q
n225  atom R
n229  imp
n237  mp
n238  mp
n240  subst(groups=1)
n241  atom P
n242  atom Q
n244  subst(groups=1)
n245  atom P
n246  imp
n247  imp
n248  atom Q
n250  subst(groups=2)
n251  atom P
n252  atom Q
n253  atom R
n255  subst(groups=2)
n256  atom P
n257  atom Q
n258  atom R
n260  subst(groups=1)
n261  atom P
n262  atom Q
n264  subst(groups=2)
n265  atom P
n266  atom Q
n267  atom R

接线：
n10.out → n52.a
n30.out → n52.b
n52.out → n70.a
n70.out → n71.a
n71.out → n72.a
n71.out → n134.a
n70.out → n134.b
n7.out → n147.assertion
n148.out → n147.atom1
n134.out → n147.formula1
n149.out → n147.atom2
n134.out → n147.formula2
n147.out → n145.a
n7.out → n152.assertion
n153.out → n152.atom1
n134.out → n152.formula1
n154.out → n152.atom2
n134.out → n155.a
n134.out → n155.b
n155.out → n152.formula2
n152.out → n150.a
n19.out → n157.assertion
n158.out → n157.atom1
n134.out → n157.formula1
n159.out → n157.atom2
n155.out → n157.formula2
n160.out → n157.atom3
n134.out → n157.formula3
n157.out → n150.b
n150.out → n145.b
n145.out → n144.a
n7.out → n188.assertion
n189.out → n188.atom1
n71.out → n188.formula1
n190.out → n188.atom2
n134.out → n191.a
n191.out → n192.a
n192.out → n188.formula2
n192.out → n196.a
n71.out → n196.b
n188.out → n167.a
n45.out → n207.assertion
n208.out → n207.atom1
n191.out → n207.formula1
n209.out → n207.atom2
n70.out → n207.formula2
n207.out → n205.a
n7.out → n211.assertion
n212.out → n211.atom1
n70.out → n213.a
n191.out → n213.b
n196.out → n214.a
n213.out → n214.b
n214.out → n211.formula1
n215.out → n211.atom2
n71.out → n211.formula2
n211.out → n205.b
n205.out → n204.a
n19.out → n217.assertion
n218.out → n217.atom1
n71.out → n217.formula1
n219.out → n217.atom2
n196.out → n217.formula2
n220.out → n217.atom3
n213.out → n217.formula3
n217.out → n204.b
n204.out → n167.b
n167.out → n166.a
n19.out → n222.assertion
n223.out → n222.atom1
n71.out → n222.formula1
n224.out → n222.atom2
n70.out → n222.formula2
n225.out → n222.atom3
n191.out → n222.formula3
n222.out → n166.b
n71.out → n229.a
n191.out → n229.b
n166.out → n162.a
n45.out → n240.assertion
n241.out → n240.atom1
n70.out → n240.formula1
n242.out → n240.atom2
n134.out → n240.formula2
n240.out → n238.a
n7.out → n244.assertion
n245.out → n244.atom1
n134.out → n246.a
n70.out → n246.b
n229.out → n247.a
n246.out → n247.b
n247.out → n244.formula1
n248.out → n244.atom2
n134.out → n244.formula2
n244.out → n238.b
n238.out → n237.a
n19.out → n250.assertion
n251.out → n250.atom1
n134.out → n250.formula1
n252.out → n250.atom2
n229.out → n250.formula2
n253.out → n250.atom3
n246.out → n250.formula3
n250.out → n237.b
n237.out → n162.b
n162.out → n161.a
n19.out → n255.assertion
n256.out → n255.atom1
n134.out → n255.formula1
n257.out → n255.atom2
n134.out → n255.formula2
n258.out → n255.atom3
n70.out → n255.formula3
n255.out → n161.b
n161.out → n144.b
n144.out → n143.a
n7.out → n260.assertion
n261.out → n260.atom1
n246.out → n260.formula1
n262.out → n260.atom2
n72.out → n260.formula2
n260.out → n143.b
n143.out → n142.a
n19.out → n264.assertion
n265.out → n264.atom1
n72.out → n264.formula1
n266.out → n264.atom2
n134.out → n264.formula2
n267.out → n264.atom3
n70.out → n264.formula3
n264.out → n142.b
n142.out → tgt.proof
```

</details>

### 61 · 等值引入 · 中间结论

- 目标：`⊢ ( ( ¬ ¬ ( P → ¬ Q ) → ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) ) → ( ¬ ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) )`
- 提示：(¬¬(P→¬Q)→¬(P→¬Q)→P→¬Q)→¬¬(P→¬Q)→P→¬Q
- 参考解：80 个模块 / 132 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  axiom A1
n9  atom P
n15  axiom A2
n24  atom Q
n25  not
n26  imp
n27  not
n28  not
n82  axiom A3
n89  imp
n97  mp
n98  mp
n99  mp
n100  mp
n102  subst(groups=1)
n103  atom P
n104  atom Q
n105  mp
n107  subst(groups=1)
n108  atom P
n109  atom Q
n110  imp
n112  subst(groups=2)
n113  atom P
n114  atom Q
n115  atom R
n116  mp
n117  mp
n121  mp
n122  mp
n143  subst(groups=1)
n144  atom P
n145  atom Q
n146  not
n147  not
n151  imp
n159  mp
n160  mp
n162  subst(groups=1)
n163  atom P
n164  atom Q
n166  subst(groups=1)
n167  atom P
n168  imp
n169  imp
n170  atom Q
n172  subst(groups=2)
n173  atom P
n174  atom Q
n175  atom R
n177  subst(groups=2)
n178  atom P
n179  atom Q
n180  atom R
n184  imp
n192  mp
n193  mp
n195  subst(groups=1)
n196  atom P
n197  atom Q
n199  subst(groups=1)
n200  atom P
n201  imp
n202  imp
n203  atom Q
n205  subst(groups=2)
n206  atom P
n207  atom Q
n208  atom R
n210  subst(groups=2)
n211  atom P
n212  atom Q
n213  atom R
n215  subst(groups=1)
n216  atom P
n217  atom Q
n219  subst(groups=2)
n220  atom P
n221  atom Q
n222  atom R

接线：
n24.out → n25.a
n9.out → n26.a
n25.out → n26.b
n26.out → n27.a
n27.out → n28.a
n27.out → n89.a
n26.out → n89.b
n6.out → n102.assertion
n103.out → n102.atom1
n89.out → n102.formula1
n104.out → n102.atom2
n89.out → n102.formula2
n102.out → n100.a
n6.out → n107.assertion
n108.out → n107.atom1
n89.out → n107.formula1
n109.out → n107.atom2
n89.out → n110.a
n89.out → n110.b
n110.out → n107.formula2
n107.out → n105.a
n15.out → n112.assertion
n113.out → n112.atom1
n89.out → n112.formula1
n114.out → n112.atom2
n110.out → n112.formula2
n115.out → n112.atom3
n89.out → n112.formula3
n112.out → n105.b
n105.out → n100.b
n100.out → n99.a
n6.out → n143.assertion
n144.out → n143.atom1
n27.out → n143.formula1
n145.out → n143.atom2
n89.out → n146.a
n146.out → n147.a
n147.out → n143.formula2
n147.out → n151.a
n27.out → n151.b
n143.out → n122.a
n82.out → n162.assertion
n163.out → n162.atom1
n146.out → n162.formula1
n164.out → n162.atom2
n26.out → n162.formula2
n162.out → n160.a
n6.out → n166.assertion
n167.out → n166.atom1
n26.out → n168.a
n146.out → n168.b
n151.out → n169.a
n168.out → n169.b
n169.out → n166.formula1
n170.out → n166.atom2
n27.out → n166.formula2
n166.out → n160.b
n160.out → n159.a
n15.out → n172.assertion
n173.out → n172.atom1
n27.out → n172.formula1
n174.out → n172.atom2
n151.out → n172.formula2
n175.out → n172.atom3
n168.out → n172.formula3
n172.out → n159.b
n159.out → n122.b
n122.out → n121.a
n15.out → n177.assertion
n178.out → n177.atom1
n27.out → n177.formula1
n179.out → n177.atom2
n26.out → n177.formula2
n180.out → n177.atom3
n146.out → n177.formula3
n177.out → n121.b
n27.out → n184.a
n146.out → n184.b
n121.out → n117.a
n82.out → n195.assertion
n196.out → n195.atom1
n26.out → n195.formula1
n197.out → n195.atom2
n89.out → n195.formula2
n195.out → n193.a
n6.out → n199.assertion
n200.out → n199.atom1
n89.out → n201.a
n26.out → n201.b
n184.out → n202.a
n201.out → n202.b
n202.out → n199.formula1
n203.out → n199.atom2
n89.out → n199.formula2
n199.out → n193.b
n193.out → n192.a
n15.out → n205.assertion
n206.out → n205.atom1
n89.out → n205.formula1
n207.out → n205.atom2
n184.out → n205.formula2
n208.out → n205.atom3
n201.out → n205.formula3
n205.out → n192.b
n192.out → n117.b
n117.out → n116.a
n15.out → n210.assertion
n211.out → n210.atom1
n89.out → n210.formula1
n212.out → n210.atom2
n89.out → n210.formula2
n213.out → n210.atom3
n26.out → n210.formula3
n210.out → n116.b
n116.out → n99.b
n99.out → n98.a
n6.out → n215.assertion
n216.out → n215.atom1
n201.out → n215.formula1
n217.out → n215.atom2
n28.out → n215.formula2
n215.out → n98.b
n98.out → n97.a
n15.out → n219.assertion
n220.out → n219.atom1
n28.out → n219.formula1
n221.out → n219.atom2
n89.out → n219.formula2
n222.out → n219.atom3
n26.out → n219.formula3
n219.out → n97.b
n97.out → tgt.proof
```

</details>

### 62 · 等值消去右 · 中间结论

- 目标：`⊢ ( ( ¬ ¬ ¬ ( P → ¬ Q ) → ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) ) → ( ¬ ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) )`
- 提示：(¬¬¬(P→¬Q)→¬¬(P→¬Q)→¬(P→¬Q))→¬¬¬(P→¬Q)→¬(P→¬Q)
- 参考解：81 个模块 / 133 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n10  atom Q
n11  not
n19  axiom A2
n30  atom P
n34  imp
n121  axiom A3
n631  not
n632  not
n633  not
n695  imp
n703  mp
n704  mp
n705  mp
n706  mp
n708  subst(groups=1)
n709  atom P
n710  atom Q
n711  mp
n713  subst(groups=1)
n714  atom P
n715  atom Q
n716  imp
n718  subst(groups=2)
n719  atom P
n720  atom Q
n721  atom R
n722  mp
n723  mp
n727  mp
n728  mp
n749  subst(groups=1)
n750  atom P
n751  atom Q
n752  not
n753  not
n757  imp
n765  mp
n766  mp
n768  subst(groups=1)
n769  atom P
n770  atom Q
n772  subst(groups=1)
n773  atom P
n774  imp
n775  imp
n776  atom Q
n778  subst(groups=2)
n779  atom P
n780  atom Q
n781  atom R
n783  subst(groups=2)
n784  atom P
n785  atom Q
n786  atom R
n790  imp
n798  mp
n799  mp
n801  subst(groups=1)
n802  atom P
n803  atom Q
n805  subst(groups=1)
n806  atom P
n807  imp
n808  imp
n809  atom Q
n811  subst(groups=2)
n812  atom P
n813  atom Q
n814  atom R
n816  subst(groups=2)
n817  atom P
n818  atom Q
n819  atom R
n821  subst(groups=1)
n822  atom P
n823  atom Q
n825  subst(groups=2)
n826  atom P
n827  atom Q
n828  atom R

接线：
n10.out → n11.a
n30.out → n34.a
n11.out → n34.b
n34.out → n631.a
n631.out → n632.a
n632.out → n633.a
n632.out → n695.a
n631.out → n695.b
n7.out → n708.assertion
n709.out → n708.atom1
n695.out → n708.formula1
n710.out → n708.atom2
n695.out → n708.formula2
n708.out → n706.a
n7.out → n713.assertion
n714.out → n713.atom1
n695.out → n713.formula1
n715.out → n713.atom2
n695.out → n716.a
n695.out → n716.b
n716.out → n713.formula2
n713.out → n711.a
n19.out → n718.assertion
n719.out → n718.atom1
n695.out → n718.formula1
n720.out → n718.atom2
n716.out → n718.formula2
n721.out → n718.atom3
n695.out → n718.formula3
n718.out → n711.b
n711.out → n706.b
n706.out → n705.a
n7.out → n749.assertion
n750.out → n749.atom1
n632.out → n749.formula1
n751.out → n749.atom2
n695.out → n752.a
n752.out → n753.a
n753.out → n749.formula2
n753.out → n757.a
n632.out → n757.b
n749.out → n728.a
n121.out → n768.assertion
n769.out → n768.atom1
n752.out → n768.formula1
n770.out → n768.atom2
n631.out → n768.formula2
n768.out → n766.a
n7.out → n772.assertion
n773.out → n772.atom1
n631.out → n774.a
n752.out → n774.b
n757.out → n775.a
n774.out → n775.b
n775.out → n772.formula1
n776.out → n772.atom2
n632.out → n772.formula2
n772.out → n766.b
n766.out → n765.a
n19.out → n778.assertion
n779.out → n778.atom1
n632.out → n778.formula1
n780.out → n778.atom2
n757.out → n778.formula2
n781.out → n778.atom3
n774.out → n778.formula3
n778.out → n765.b
n765.out → n728.b
n728.out → n727.a
n19.out → n783.assertion
n784.out → n783.atom1
n632.out → n783.formula1
n785.out → n783.atom2
n631.out → n783.formula2
n786.out → n783.atom3
n752.out → n783.formula3
n783.out → n727.b
n632.out → n790.a
n752.out → n790.b
n727.out → n723.a
n121.out → n801.assertion
n802.out → n801.atom1
n631.out → n801.formula1
n803.out → n801.atom2
n695.out → n801.formula2
n801.out → n799.a
n7.out → n805.assertion
n806.out → n805.atom1
n695.out → n807.a
n631.out → n807.b
n790.out → n808.a
n807.out → n808.b
n808.out → n805.formula1
n809.out → n805.atom2
n695.out → n805.formula2
n805.out → n799.b
n799.out → n798.a
n19.out → n811.assertion
n812.out → n811.atom1
n695.out → n811.formula1
n813.out → n811.atom2
n790.out → n811.formula2
n814.out → n811.atom3
n807.out → n811.formula3
n811.out → n798.b
n798.out → n723.b
n723.out → n722.a
n19.out → n816.assertion
n817.out → n816.atom1
n695.out → n816.formula1
n818.out → n816.atom2
n695.out → n816.formula2
n819.out → n816.atom3
n631.out → n816.formula3
n816.out → n722.b
n722.out → n705.b
n705.out → n704.a
n7.out → n821.assertion
n822.out → n821.atom1
n807.out → n821.formula1
n823.out → n821.atom2
n633.out → n821.formula2
n821.out → n704.b
n704.out → n703.a
n19.out → n825.assertion
n826.out → n825.atom1
n633.out → n825.formula1
n827.out → n825.atom2
n695.out → n825.formula2
n828.out → n825.atom3
n631.out → n825.formula3
n825.out → n703.b
n703.out → tgt.proof
```

</details>

### 63 · 蕴涵传递

- 目标：`⊢ ( ( P → Q ) → ( ( Q → R ) → ( P → R ) ) )`
- 提示：(P→Q)→(Q→R)→P→R
- 参考解：96 个模块 / 162 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n126  [target]
n1  mp
n6  atom P
n7  atom Q
n8  imp
n11  axiom A1
n12  subst(groups=1)
n13  atom P
n14  atom Q
n15  atom R
n16  imp
n20  imp
n23  axiom A2
n28  mp
n29  mp
n30  mp
n31  mp
n32  mp
n33  定理 *02
n34  subst(groups=1)
n35  atom P
n36  atom Q
n37  mp
n38  mp
n40  subst(groups=0)
n41  atom P
n42  imp
n44  subst(groups=1)
n45  atom P
n46  imp
n47  imp
n48  atom Q
n50  subst(groups=2)
n51  atom P
n52  atom Q
n53  atom R
n54  mp
n55  mp
n57  subst(groups=1)
n58  atom P
n59  atom Q
n61  subst(groups=1)
n62  atom P
n63  imp
n64  imp
n65  atom Q
n67  subst(groups=2)
n68  atom P
n69  atom Q
n70  atom R
n71  mp
n72  mp
n73  mp
n74  mp
n75  定理 *04
n76  subst(groups=2)
n77  atom P
n78  atom Q
n79  atom R
n81  subst(groups=1)
n82  atom P
n83  imp
n84  imp
n85  imp
n86  atom Q
n88  subst(groups=2)
n89  atom P
n90  atom Q
n91  atom R
n93  subst(groups=1)
n94  atom P
n95  imp
n96  atom Q
n98  subst(groups=2)
n99  atom P
n100  atom Q
n101  atom R
n102  mp
n103  mp
n105  subst(groups=2)
n106  atom P
n107  atom Q
n108  atom R
n110  subst(groups=1)
n111  atom P
n112  imp
n113  imp
n114  imp
n115  atom Q
n117  subst(groups=2)
n118  atom P
n119  atom Q
n120  atom R
n122  subst(groups=2)
n123  atom P
n124  atom Q
n125  atom R

接线：
n6.out → n8.a
n7.out → n8.b
n11.out → n12.assertion
n13.out → n12.atom1
n8.out → n12.formula1
n14.out → n12.atom2
n7.out → n16.a
n15.out → n16.b
n16.out → n12.formula2
n16.out → n20.a
n8.out → n20.b
n12.out → n1.a
n33.out → n34.assertion
n35.out → n34.atom1
n8.out → n34.formula1
n36.out → n34.atom2
n15.out → n34.formula2
n34.out → n32.a
n11.out → n40.assertion
n41.out → n40.atom1
n15.out → n42.a
n15.out → n42.b
n42.out → n40.formula1
n40.out → n38.a
n11.out → n44.assertion
n45.out → n44.atom1
n7.out → n46.a
n42.out → n46.b
n42.out → n47.a
n46.out → n47.b
n47.out → n44.formula1
n48.out → n44.atom2
n8.out → n44.formula2
n44.out → n38.b
n38.out → n37.a
n23.out → n50.assertion
n51.out → n50.atom1
n8.out → n50.formula1
n52.out → n50.atom2
n42.out → n50.formula2
n53.out → n50.atom3
n46.out → n50.formula3
n50.out → n37.b
n37.out → n32.b
n32.out → n31.a
n23.out → n57.assertion
n58.out → n57.atom1
n7.out → n57.formula1
n59.out → n57.atom2
n15.out → n57.formula2
n57.out → n55.a
n11.out → n61.assertion
n62.out → n61.atom1
n16.out → n63.a
n16.out → n63.b
n46.out → n64.a
n63.out → n64.b
n64.out → n61.formula1
n65.out → n61.atom2
n8.out → n61.formula2
n61.out → n55.b
n55.out → n54.a
n23.out → n67.assertion
n68.out → n67.atom1
n8.out → n67.formula1
n69.out → n67.atom2
n46.out → n67.formula2
n70.out → n67.atom3
n63.out → n67.formula3
n67.out → n54.b
n54.out → n31.b
n31.out → n30.a
n75.out → n76.assertion
n77.out → n76.atom1
n7.out → n76.formula1
n78.out → n76.atom2
n15.out → n76.formula2
n79.out → n76.atom3
n6.out → n76.formula3
n76.out → n74.a
n11.out → n81.assertion
n82.out → n81.atom1
n6.out → n83.a
n15.out → n83.b
n8.out → n84.a
n83.out → n84.b
n16.out → n85.a
n84.out → n85.b
n85.out → n81.formula1
n86.out → n81.atom2
n16.out → n81.formula2
n81.out → n74.b
n74.out → n73.a
n23.out → n88.assertion
n89.out → n88.atom1
n16.out → n88.formula1
n90.out → n88.atom2
n16.out → n88.formula2
n91.out → n88.atom3
n84.out → n88.formula3
n88.out → n73.b
n73.out → n72.a
n11.out → n93.assertion
n94.out → n93.atom1
n63.out → n95.a
n85.out → n95.b
n95.out → n93.formula1
n96.out → n93.atom2
n8.out → n93.formula2
n93.out → n72.b
n72.out → n71.a
n23.out → n98.assertion
n99.out → n98.atom1
n8.out → n98.formula1
n100.out → n98.atom2
n63.out → n98.formula2
n101.out → n98.atom3
n85.out → n98.formula3
n98.out → n71.b
n71.out → n30.b
n30.out → n29.a
n23.out → n105.assertion
n106.out → n105.atom1
n16.out → n105.formula1
n107.out → n105.atom2
n8.out → n105.formula2
n108.out → n105.atom3
n83.out → n105.formula3
n105.out → n103.a
n11.out → n110.assertion
n111.out → n110.atom1
n16.out → n112.a
n83.out → n112.b
n20.out → n113.a
n112.out → n113.b
n85.out → n114.a
n113.out → n114.b
n114.out → n110.formula1
n115.out → n110.atom2
n8.out → n110.formula2
n110.out → n103.b
n103.out → n102.a
n23.out → n117.assertion
n118.out → n117.atom1
n8.out → n117.formula1
n119.out → n117.atom2
n85.out → n117.formula2
n120.out → n117.atom3
n113.out → n117.formula3
n117.out → n102.b
n102.out → n29.b
n29.out → n28.a
n23.out → n122.assertion
n123.out → n122.atom1
n8.out → n122.formula1
n124.out → n122.atom2
n20.out → n122.formula2
n125.out → n122.atom3
n112.out → n122.formula3
n122.out → n28.b
n28.out → n1.b
n1.out → n126.proof
```

</details>

### 64 · 前件重排

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( ( P → ( R → S ) ) → ( P → ( Q → S ) ) ) )`
- 提示：(P→Q→R)→(P→R→S)→P→Q→S
- 参考解：43 个模块 / 67 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n47  [target]
n1  mp
n2  mp
n3  mp
n4  定理 *63
n5  subst(groups=2)
n6  atom P
n7  atom Q
n8  atom Q
n9  atom R
n10  atom R
n11  atom S
n12  axiom A1
n13  subst(groups=1)
n14  atom P
n15  imp
n16  imp
n17  imp
n18  imp
n19  imp
n20  atom Q
n21  atom P
n22  axiom A2
n23  subst(groups=1)
n24  atom Q
n25  atom R
n26  mp
n27  mp
n29  subst(groups=1)
n30  atom Q
n31  atom R
n33  subst(groups=1)
n34  atom P
n35  imp
n36  imp
n37  imp
n38  imp
n39  imp
n40  atom Q
n41  imp
n43  subst(groups=2)
n44  atom P
n45  atom Q
n46  atom R

接线：
n4.out → n5.assertion
n6.out → n5.atom1
n7.out → n5.formula1
n8.out → n5.atom2
n9.out → n5.formula2
n10.out → n5.atom3
n11.out → n5.formula3
n5.out → n3.a
n12.out → n13.assertion
n14.out → n13.atom1
n7.out → n15.a
n9.out → n15.b
n9.out → n16.a
n11.out → n16.b
n7.out → n17.a
n11.out → n17.b
n16.out → n18.a
n17.out → n18.b
n15.out → n19.a
n18.out → n19.b
n19.out → n13.formula1
n20.out → n13.atom2
n21.out → n13.formula2
n13.out → n3.b
n3.out → n2.a
n22.out → n23.assertion
n24.out → n23.atom1
n15.out → n23.formula1
n25.out → n23.atom2
n18.out → n23.formula2
n23.out → n2.b
n2.out → n1.a
n22.out → n29.assertion
n30.out → n29.atom1
n16.out → n29.formula1
n31.out → n29.atom2
n17.out → n29.formula2
n29.out → n27.a
n12.out → n33.assertion
n34.out → n33.atom1
n21.out → n35.a
n18.out → n35.b
n21.out → n36.a
n16.out → n36.b
n21.out → n37.a
n17.out → n37.b
n36.out → n38.a
n37.out → n38.b
n35.out → n39.a
n38.out → n39.b
n39.out → n33.formula1
n40.out → n33.atom2
n21.out → n41.a
n15.out → n41.b
n41.out → n33.formula2
n33.out → n27.b
n27.out → n26.a
n22.out → n43.assertion
n44.out → n43.atom1
n41.out → n43.formula1
n45.out → n43.atom2
n35.out → n43.formula2
n46.out → n43.atom3
n38.out → n43.formula3
n43.out → n26.b
n26.out → n1.b
n1.out → n47.proof
```

</details>

### 65 · 合取消去左 · 中间结论

- 目标：`⊢ ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) )`
- 提示：¬¬¬(P→Q)→¬(P→Q)
- 参考解：99 个模块 / 166 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n10  atom P
n19  axiom A2
n30  atom Q
n45  axiom A3
n52  imp
n70  not
n71  not
n72  not
n89  mp
n90  mp
n111  subst(groups=1)
n112  atom P
n113  atom Q
n117  imp
n125  mp
n126  mp
n128  subst(groups=1)
n129  atom P
n130  atom Q
n132  subst(groups=1)
n133  atom P
n134  imp
n135  imp
n136  atom Q
n138  subst(groups=2)
n139  atom P
n140  atom Q
n141  atom R
n142  mp
n143  mp
n144  mp
n145  mp
n147  subst(groups=1)
n148  atom P
n149  atom Q
n150  mp
n152  subst(groups=1)
n153  atom P
n154  atom Q
n155  imp
n157  subst(groups=2)
n158  atom P
n159  atom Q
n160  atom R
n161  mp
n162  mp
n166  mp
n167  mp
n188  subst(groups=1)
n189  atom P
n190  atom Q
n191  not
n192  not
n196  imp
n204  mp
n205  mp
n207  subst(groups=1)
n208  atom P
n209  atom Q
n211  subst(groups=1)
n212  atom P
n213  imp
n214  imp
n215  atom Q
n217  subst(groups=2)
n218  atom P
n219  atom Q
n220  atom R
n222  subst(groups=2)
n223  atom P
n224  atom Q
n225  atom R
n229  imp
n237  mp
n238  mp
n240  subst(groups=1)
n241  atom P
n242  atom Q
n244  subst(groups=1)
n245  atom P
n246  imp
n247  imp
n248  atom Q
n250  subst(groups=2)
n251  atom P
n252  atom Q
n253  atom R
n255  subst(groups=2)
n256  atom P
n257  atom Q
n258  atom R
n260  subst(groups=1)
n261  atom P
n262  atom Q
n264  subst(groups=2)
n265  atom P
n266  atom Q
n267  atom R

接线：
n10.out → n52.a
n30.out → n52.b
n52.out → n70.a
n70.out → n71.a
n71.out → n72.a
n7.out → n111.assertion
n112.out → n111.atom1
n72.out → n111.formula1
n113.out → n111.atom2
n71.out → n111.formula2
n71.out → n117.a
n72.out → n117.b
n111.out → n90.a
n45.out → n128.assertion
n129.out → n128.atom1
n70.out → n128.formula1
n130.out → n128.atom2
n71.out → n128.formula2
n128.out → n126.a
n7.out → n132.assertion
n133.out → n132.atom1
n71.out → n134.a
n70.out → n134.b
n117.out → n135.a
n134.out → n135.b
n135.out → n132.formula1
n136.out → n132.atom2
n72.out → n132.formula2
n132.out → n126.b
n126.out → n125.a
n19.out → n138.assertion
n139.out → n138.atom1
n72.out → n138.formula1
n140.out → n138.atom2
n117.out → n138.formula2
n141.out → n138.atom3
n134.out → n138.formula3
n138.out → n125.b
n125.out → n90.b
n90.out → n89.a
n7.out → n147.assertion
n148.out → n147.atom1
n134.out → n147.formula1
n149.out → n147.atom2
n134.out → n147.formula2
n147.out → n145.a
n7.out → n152.assertion
n153.out → n152.atom1
n134.out → n152.formula1
n154.out → n152.atom2
n134.out → n155.a
n134.out → n155.b
n155.out → n152.formula2
n152.out → n150.a
n19.out → n157.assertion
n158.out → n157.atom1
n134.out → n157.formula1
n159.out → n157.atom2
n155.out → n157.formula2
n160.out → n157.atom3
n134.out → n157.formula3
n157.out → n150.b
n150.out → n145.b
n145.out → n144.a
n7.out → n188.assertion
n189.out → n188.atom1
n71.out → n188.formula1
n190.out → n188.atom2
n134.out → n191.a
n191.out → n192.a
n192.out → n188.formula2
n192.out → n196.a
n71.out → n196.b
n188.out → n167.a
n45.out → n207.assertion
n208.out → n207.atom1
n191.out → n207.formula1
n209.out → n207.atom2
n70.out → n207.formula2
n207.out → n205.a
n7.out → n211.assertion
n212.out → n211.atom1
n70.out → n213.a
n191.out → n213.b
n196.out → n214.a
n213.out → n214.b
n214.out → n211.formula1
n215.out → n211.atom2
n71.out → n211.formula2
n211.out → n205.b
n205.out → n204.a
n19.out → n217.assertion
n218.out → n217.atom1
n71.out → n217.formula1
n219.out → n217.atom2
n196.out → n217.formula2
n220.out → n217.atom3
n213.out → n217.formula3
n217.out → n204.b
n204.out → n167.b
n167.out → n166.a
n19.out → n222.assertion
n223.out → n222.atom1
n71.out → n222.formula1
n224.out → n222.atom2
n70.out → n222.formula2
n225.out → n222.atom3
n191.out → n222.formula3
n222.out → n166.b
n71.out → n229.a
n191.out → n229.b
n166.out → n162.a
n45.out → n240.assertion
n241.out → n240.atom1
n70.out → n240.formula1
n242.out → n240.atom2
n134.out → n240.formula2
n240.out → n238.a
n7.out → n244.assertion
n245.out → n244.atom1
n134.out → n246.a
n70.out → n246.b
n229.out → n247.a
n246.out → n247.b
n247.out → n244.formula1
n248.out → n244.atom2
n134.out → n244.formula2
n244.out → n238.b
n238.out → n237.a
n19.out → n250.assertion
n251.out → n250.atom1
n134.out → n250.formula1
n252.out → n250.atom2
n229.out → n250.formula2
n253.out → n250.atom3
n246.out → n250.formula3
n250.out → n237.b
n237.out → n162.b
n162.out → n161.a
n19.out → n255.assertion
n256.out → n255.atom1
n134.out → n255.formula1
n257.out → n255.atom2
n134.out → n255.formula2
n258.out → n255.atom3
n70.out → n255.formula3
n255.out → n161.b
n161.out → n144.b
n144.out → n143.a
n7.out → n260.assertion
n261.out → n260.atom1
n246.out → n260.formula1
n262.out → n260.atom2
n72.out → n260.formula2
n260.out → n143.b
n143.out → n142.a
n19.out → n264.assertion
n265.out → n264.atom1
n72.out → n264.formula1
n266.out → n264.atom2
n134.out → n264.formula2
n267.out → n264.atom3
n70.out → n264.formula3
n264.out → n142.b
n142.out → n89.b
n89.out → tgt.proof
```

</details>

### 66 · 等值引入 · 中间结论

- 目标：`⊢ ( ¬ ¬ ( P → ¬ Q ) → ( P → ¬ Q ) )`
- 提示：¬¬(P→¬Q)→P→¬Q
- 参考解：99 个模块 / 166 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  axiom A1
n9  atom P
n15  axiom A2
n24  atom Q
n25  not
n26  imp
n27  not
n28  not
n44  mp
n45  mp
n66  subst(groups=1)
n67  atom P
n68  atom Q
n72  imp
n80  mp
n81  mp
n82  axiom A3
n83  subst(groups=1)
n84  atom P
n85  atom Q
n87  subst(groups=1)
n88  atom P
n89  imp
n90  imp
n91  atom Q
n93  subst(groups=2)
n94  atom P
n95  atom Q
n96  atom R
n97  mp
n98  mp
n99  mp
n100  mp
n102  subst(groups=1)
n103  atom P
n104  atom Q
n105  mp
n107  subst(groups=1)
n108  atom P
n109  atom Q
n110  imp
n112  subst(groups=2)
n113  atom P
n114  atom Q
n115  atom R
n116  mp
n117  mp
n121  mp
n122  mp
n143  subst(groups=1)
n144  atom P
n145  atom Q
n146  not
n147  not
n151  imp
n159  mp
n160  mp
n162  subst(groups=1)
n163  atom P
n164  atom Q
n166  subst(groups=1)
n167  atom P
n168  imp
n169  imp
n170  atom Q
n172  subst(groups=2)
n173  atom P
n174  atom Q
n175  atom R
n177  subst(groups=2)
n178  atom P
n179  atom Q
n180  atom R
n184  imp
n192  mp
n193  mp
n195  subst(groups=1)
n196  atom P
n197  atom Q
n199  subst(groups=1)
n200  atom P
n201  imp
n202  imp
n203  atom Q
n205  subst(groups=2)
n206  atom P
n207  atom Q
n208  atom R
n210  subst(groups=2)
n211  atom P
n212  atom Q
n213  atom R
n215  subst(groups=1)
n216  atom P
n217  atom Q
n219  subst(groups=2)
n220  atom P
n221  atom Q
n222  atom R

接线：
n24.out → n25.a
n9.out → n26.a
n25.out → n26.b
n26.out → n27.a
n27.out → n28.a
n6.out → n66.assertion
n67.out → n66.atom1
n28.out → n66.formula1
n68.out → n66.atom2
n27.out → n66.formula2
n27.out → n72.a
n28.out → n72.b
n66.out → n45.a
n82.out → n83.assertion
n84.out → n83.atom1
n26.out → n83.formula1
n85.out → n83.atom2
n27.out → n83.formula2
n83.out → n81.a
n6.out → n87.assertion
n88.out → n87.atom1
n27.out → n89.a
n26.out → n89.b
n72.out → n90.a
n89.out → n90.b
n90.out → n87.formula1
n91.out → n87.atom2
n28.out → n87.formula2
n87.out → n81.b
n81.out → n80.a
n15.out → n93.assertion
n94.out → n93.atom1
n28.out → n93.formula1
n95.out → n93.atom2
n72.out → n93.formula2
n96.out → n93.atom3
n89.out → n93.formula3
n93.out → n80.b
n80.out → n45.b
n45.out → n44.a
n6.out → n102.assertion
n103.out → n102.atom1
n89.out → n102.formula1
n104.out → n102.atom2
n89.out → n102.formula2
n102.out → n100.a
n6.out → n107.assertion
n108.out → n107.atom1
n89.out → n107.formula1
n109.out → n107.atom2
n89.out → n110.a
n89.out → n110.b
n110.out → n107.formula2
n107.out → n105.a
n15.out → n112.assertion
n113.out → n112.atom1
n89.out → n112.formula1
n114.out → n112.atom2
n110.out → n112.formula2
n115.out → n112.atom3
n89.out → n112.formula3
n112.out → n105.b
n105.out → n100.b
n100.out → n99.a
n6.out → n143.assertion
n144.out → n143.atom1
n27.out → n143.formula1
n145.out → n143.atom2
n89.out → n146.a
n146.out → n147.a
n147.out → n143.formula2
n147.out → n151.a
n27.out → n151.b
n143.out → n122.a
n82.out → n162.assertion
n163.out → n162.atom1
n146.out → n162.formula1
n164.out → n162.atom2
n26.out → n162.formula2
n162.out → n160.a
n6.out → n166.assertion
n167.out → n166.atom1
n26.out → n168.a
n146.out → n168.b
n151.out → n169.a
n168.out → n169.b
n169.out → n166.formula1
n170.out → n166.atom2
n27.out → n166.formula2
n166.out → n160.b
n160.out → n159.a
n15.out → n172.assertion
n173.out → n172.atom1
n27.out → n172.formula1
n174.out → n172.atom2
n151.out → n172.formula2
n175.out → n172.atom3
n168.out → n172.formula3
n172.out → n159.b
n159.out → n122.b
n122.out → n121.a
n15.out → n177.assertion
n178.out → n177.atom1
n27.out → n177.formula1
n179.out → n177.atom2
n26.out → n177.formula2
n180.out → n177.atom3
n146.out → n177.formula3
n177.out → n121.b
n27.out → n184.a
n146.out → n184.b
n121.out → n117.a
n82.out → n195.assertion
n196.out → n195.atom1
n26.out → n195.formula1
n197.out → n195.atom2
n89.out → n195.formula2
n195.out → n193.a
n6.out → n199.assertion
n200.out → n199.atom1
n89.out → n201.a
n26.out → n201.b
n184.out → n202.a
n201.out → n202.b
n202.out → n199.formula1
n203.out → n199.atom2
n89.out → n199.formula2
n199.out → n193.b
n193.out → n192.a
n15.out → n205.assertion
n206.out → n205.atom1
n89.out → n205.formula1
n207.out → n205.atom2
n184.out → n205.formula2
n208.out → n205.atom3
n201.out → n205.formula3
n205.out → n192.b
n192.out → n117.b
n117.out → n116.a
n15.out → n210.assertion
n211.out → n210.atom1
n89.out → n210.formula1
n212.out → n210.atom2
n89.out → n210.formula2
n213.out → n210.atom3
n26.out → n210.formula3
n210.out → n116.b
n116.out → n99.b
n99.out → n98.a
n6.out → n215.assertion
n216.out → n215.atom1
n201.out → n215.formula1
n217.out → n215.atom2
n28.out → n215.formula2
n215.out → n98.b
n98.out → n97.a
n15.out → n219.assertion
n220.out → n219.atom1
n28.out → n219.formula1
n221.out → n219.atom2
n89.out → n219.formula2
n222.out → n219.atom3
n26.out → n219.formula3
n219.out → n97.b
n97.out → n44.b
n44.out → tgt.proof
```

</details>

### 67 · 等值消去右 · 中间结论

- 目标：`⊢ ( ¬ ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) )`
- 提示：¬¬¬(P→¬Q)→¬(P→¬Q)
- 参考解：100 个模块 / 167 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n10  atom Q
n11  not
n19  axiom A2
n30  atom P
n34  imp
n121  axiom A3
n631  not
n632  not
n633  not
n650  mp
n651  mp
n672  subst(groups=1)
n673  atom P
n674  atom Q
n678  imp
n686  mp
n687  mp
n689  subst(groups=1)
n690  atom P
n691  atom Q
n693  subst(groups=1)
n694  atom P
n695  imp
n696  imp
n697  atom Q
n699  subst(groups=2)
n700  atom P
n701  atom Q
n702  atom R
n703  mp
n704  mp
n705  mp
n706  mp
n708  subst(groups=1)
n709  atom P
n710  atom Q
n711  mp
n713  subst(groups=1)
n714  atom P
n715  atom Q
n716  imp
n718  subst(groups=2)
n719  atom P
n720  atom Q
n721  atom R
n722  mp
n723  mp
n727  mp
n728  mp
n749  subst(groups=1)
n750  atom P
n751  atom Q
n752  not
n753  not
n757  imp
n765  mp
n766  mp
n768  subst(groups=1)
n769  atom P
n770  atom Q
n772  subst(groups=1)
n773  atom P
n774  imp
n775  imp
n776  atom Q
n778  subst(groups=2)
n779  atom P
n780  atom Q
n781  atom R
n783  subst(groups=2)
n784  atom P
n785  atom Q
n786  atom R
n790  imp
n798  mp
n799  mp
n801  subst(groups=1)
n802  atom P
n803  atom Q
n805  subst(groups=1)
n806  atom P
n807  imp
n808  imp
n809  atom Q
n811  subst(groups=2)
n812  atom P
n813  atom Q
n814  atom R
n816  subst(groups=2)
n817  atom P
n818  atom Q
n819  atom R
n821  subst(groups=1)
n822  atom P
n823  atom Q
n825  subst(groups=2)
n826  atom P
n827  atom Q
n828  atom R

接线：
n10.out → n11.a
n30.out → n34.a
n11.out → n34.b
n34.out → n631.a
n631.out → n632.a
n632.out → n633.a
n7.out → n672.assertion
n673.out → n672.atom1
n633.out → n672.formula1
n674.out → n672.atom2
n632.out → n672.formula2
n632.out → n678.a
n633.out → n678.b
n672.out → n651.a
n121.out → n689.assertion
n690.out → n689.atom1
n631.out → n689.formula1
n691.out → n689.atom2
n632.out → n689.formula2
n689.out → n687.a
n7.out → n693.assertion
n694.out → n693.atom1
n632.out → n695.a
n631.out → n695.b
n678.out → n696.a
n695.out → n696.b
n696.out → n693.formula1
n697.out → n693.atom2
n633.out → n693.formula2
n693.out → n687.b
n687.out → n686.a
n19.out → n699.assertion
n700.out → n699.atom1
n633.out → n699.formula1
n701.out → n699.atom2
n678.out → n699.formula2
n702.out → n699.atom3
n695.out → n699.formula3
n699.out → n686.b
n686.out → n651.b
n651.out → n650.a
n7.out → n708.assertion
n709.out → n708.atom1
n695.out → n708.formula1
n710.out → n708.atom2
n695.out → n708.formula2
n708.out → n706.a
n7.out → n713.assertion
n714.out → n713.atom1
n695.out → n713.formula1
n715.out → n713.atom2
n695.out → n716.a
n695.out → n716.b
n716.out → n713.formula2
n713.out → n711.a
n19.out → n718.assertion
n719.out → n718.atom1
n695.out → n718.formula1
n720.out → n718.atom2
n716.out → n718.formula2
n721.out → n718.atom3
n695.out → n718.formula3
n718.out → n711.b
n711.out → n706.b
n706.out → n705.a
n7.out → n749.assertion
n750.out → n749.atom1
n632.out → n749.formula1
n751.out → n749.atom2
n695.out → n752.a
n752.out → n753.a
n753.out → n749.formula2
n753.out → n757.a
n632.out → n757.b
n749.out → n728.a
n121.out → n768.assertion
n769.out → n768.atom1
n752.out → n768.formula1
n770.out → n768.atom2
n631.out → n768.formula2
n768.out → n766.a
n7.out → n772.assertion
n773.out → n772.atom1
n631.out → n774.a
n752.out → n774.b
n757.out → n775.a
n774.out → n775.b
n775.out → n772.formula1
n776.out → n772.atom2
n632.out → n772.formula2
n772.out → n766.b
n766.out → n765.a
n19.out → n778.assertion
n779.out → n778.atom1
n632.out → n778.formula1
n780.out → n778.atom2
n757.out → n778.formula2
n781.out → n778.atom3
n774.out → n778.formula3
n778.out → n765.b
n765.out → n728.b
n728.out → n727.a
n19.out → n783.assertion
n784.out → n783.atom1
n632.out → n783.formula1
n785.out → n783.atom2
n631.out → n783.formula2
n786.out → n783.atom3
n752.out → n783.formula3
n783.out → n727.b
n632.out → n790.a
n752.out → n790.b
n727.out → n723.a
n121.out → n801.assertion
n802.out → n801.atom1
n631.out → n801.formula1
n803.out → n801.atom2
n695.out → n801.formula2
n801.out → n799.a
n7.out → n805.assertion
n806.out → n805.atom1
n695.out → n807.a
n631.out → n807.b
n790.out → n808.a
n807.out → n808.b
n808.out → n805.formula1
n809.out → n805.atom2
n695.out → n805.formula2
n805.out → n799.b
n799.out → n798.a
n19.out → n811.assertion
n812.out → n811.atom1
n695.out → n811.formula1
n813.out → n811.atom2
n790.out → n811.formula2
n814.out → n811.atom3
n807.out → n811.formula3
n811.out → n798.b
n798.out → n723.b
n723.out → n722.a
n19.out → n816.assertion
n817.out → n816.atom1
n695.out → n816.formula1
n818.out → n816.atom2
n695.out → n816.formula2
n819.out → n816.atom3
n631.out → n816.formula3
n816.out → n722.b
n722.out → n705.b
n705.out → n704.a
n7.out → n821.assertion
n822.out → n821.atom1
n807.out → n821.formula1
n823.out → n821.atom2
n633.out → n821.formula2
n821.out → n704.b
n704.out → n703.a
n19.out → n825.assertion
n826.out → n825.atom1
n633.out → n825.formula1
n827.out → n825.atom2
n695.out → n825.formula2
n828.out → n825.atom3
n631.out → n825.formula3
n825.out → n703.b
n703.out → n650.b
n650.out → tgt.proof
```

</details>

### 68 · 合取前件导出

- 目标：`⊢ ( ( ¬ ( P → ¬ Q ) → R ) → ( P → ( Q → R ) ) )`
- 提示：(¬(P→¬Q)→R)→P→Q→R
- 参考解：101 个模块 / 167 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n129  [target]
n1  mp
n3  定理 *01
n4  subst(groups=0)
n5  atom P
n6  atom P
n7  atom Q
n8  not
n9  imp
n10  not
n11  atom R
n12  imp
n15  axiom A1
n16  subst(groups=1)
n17  atom P
n18  atom Q
n22  imp
n25  axiom A2
n30  mp
n31  mp
n32  mp
n33  mp
n34  mp
n35  定理 *36
n36  mp
n37  mp
n39  subst(groups=1)
n40  atom P
n41  imp
n42  atom Q
n44  subst(groups=1)
n45  atom P
n46  imp
n47  imp
n48  atom Q
n50  subst(groups=1)
n51  atom Q
n52  atom R
n53  mp
n54  mp
n55  mp
n56  mp
n58  subst(groups=1)
n59  atom P
n60  imp
n61  atom Q
n62  mp
n63  mp
n64  mp
n65  mp
n66  定理 *04
n67  subst(groups=2)
n68  atom P
n69  atom Q
n70  atom R
n72  subst(groups=1)
n73  atom P
n74  imp
n75  imp
n76  imp
n77  atom Q
n79  subst(groups=2)
n80  atom P
n81  atom Q
n82  atom R
n84  subst(groups=1)
n85  atom P
n86  imp
n87  atom Q
n89  subst(groups=1)
n90  atom Q
n91  atom R
n92  mp
n93  mp
n95  subst(groups=2)
n96  atom P
n97  atom Q
n98  atom R
n100  subst(groups=1)
n101  atom P
n102  imp
n103  imp
n104  imp
n105  atom Q
n107  subst(groups=1)
n108  atom Q
n109  atom R
n111  subst(groups=1)
n112  atom Q
n113  atom R
n115  subst(groups=1)
n116  atom Q
n117  atom R
n119  subst(groups=1)
n120  atom P
n121  imp
n122  imp
n123  atom Q
n125  subst(groups=2)
n126  atom P
n127  atom Q
n128  atom R

接线：
n3.out → n4.assertion
n5.out → n4.atom1
n7.out → n8.a
n6.out → n9.a
n8.out → n9.b
n9.out → n10.a
n10.out → n12.a
n11.out → n12.b
n12.out → n4.formula1
n15.out → n16.assertion
n17.out → n16.atom1
n12.out → n16.formula1
n18.out → n16.atom2
n6.out → n16.formula2
n6.out → n22.a
n12.out → n22.b
n16.out → n1.a
n35.out → n34.a
n15.out → n39.assertion
n40.out → n39.atom1
n7.out → n41.a
n10.out → n41.b
n41.out → n39.formula1
n42.out → n39.atom2
n12.out → n39.formula2
n39.out → n37.a
n15.out → n44.assertion
n45.out → n44.atom1
n12.out → n46.a
n41.out → n46.b
n41.out → n47.a
n46.out → n47.b
n47.out → n44.formula1
n48.out → n44.atom2
n6.out → n44.formula2
n44.out → n37.b
n37.out → n36.a
n25.out → n50.assertion
n51.out → n50.atom1
n41.out → n50.formula1
n52.out → n50.atom2
n46.out → n50.formula2
n50.out → n36.b
n36.out → n34.b
n34.out → n33.a
n4.out → n56.a
n15.out → n58.assertion
n59.out → n58.atom1
n12.out → n60.a
n12.out → n60.b
n60.out → n58.formula1
n61.out → n58.atom2
n6.out → n58.formula2
n58.out → n56.b
n56.out → n55.a
n66.out → n67.assertion
n68.out → n67.atom1
n10.out → n67.formula1
n69.out → n67.atom2
n11.out → n67.formula2
n70.out → n67.atom3
n7.out → n67.formula3
n67.out → n65.a
n15.out → n72.assertion
n73.out → n72.atom1
n7.out → n74.a
n11.out → n74.b
n41.out → n75.a
n74.out → n75.b
n12.out → n76.a
n75.out → n76.b
n76.out → n72.formula1
n77.out → n72.atom2
n12.out → n72.formula2
n72.out → n65.b
n65.out → n64.a
n25.out → n79.assertion
n80.out → n79.atom1
n12.out → n79.formula1
n81.out → n79.atom2
n12.out → n79.formula2
n82.out → n79.atom3
n75.out → n79.formula3
n79.out → n64.b
n64.out → n63.a
n15.out → n84.assertion
n85.out → n84.atom1
n60.out → n86.a
n76.out → n86.b
n86.out → n84.formula1
n87.out → n84.atom2
n6.out → n84.formula2
n84.out → n63.b
n63.out → n62.a
n25.out → n89.assertion
n90.out → n89.atom1
n60.out → n89.formula1
n91.out → n89.atom2
n76.out → n89.formula2
n89.out → n62.b
n62.out → n55.b
n55.out → n54.a
n25.out → n95.assertion
n96.out → n95.atom1
n12.out → n95.formula1
n97.out → n95.atom2
n41.out → n95.formula2
n98.out → n95.atom3
n74.out → n95.formula3
n95.out → n93.a
n15.out → n100.assertion
n101.out → n100.atom1
n12.out → n102.a
n74.out → n102.b
n46.out → n103.a
n102.out → n103.b
n76.out → n104.a
n103.out → n104.b
n104.out → n100.formula1
n105.out → n100.atom2
n6.out → n100.formula2
n100.out → n93.b
n93.out → n92.a
n25.out → n107.assertion
n108.out → n107.atom1
n76.out → n107.formula1
n109.out → n107.atom2
n103.out → n107.formula2
n107.out → n92.b
n92.out → n54.b
n54.out → n53.a
n25.out → n111.assertion
n112.out → n111.atom1
n46.out → n111.formula1
n113.out → n111.atom2
n102.out → n111.formula2
n111.out → n53.b
n53.out → n33.b
n33.out → n32.a
n25.out → n115.assertion
n116.out → n115.atom1
n12.out → n115.formula1
n117.out → n115.atom2
n74.out → n115.formula2
n115.out → n32.b
n32.out → n31.a
n15.out → n119.assertion
n120.out → n119.atom1
n6.out → n121.a
n74.out → n121.b
n22.out → n122.a
n121.out → n122.b
n122.out → n119.formula1
n123.out → n119.atom2
n12.out → n119.formula2
n119.out → n31.b
n31.out → n30.a
n25.out → n125.assertion
n126.out → n125.atom1
n12.out → n125.formula1
n127.out → n125.atom2
n22.out → n125.formula2
n128.out → n125.atom3
n121.out → n125.formula3
n125.out → n30.b
n30.out → n1.b
n1.out → n129.proof
```

</details>

### 69 · 等值引入 · 中间结论

- 目标：`⊢ ( ( ¬ ¬ ( P → ¬ Q ) → P ) → ( ¬ ¬ ( P → ¬ Q ) → ¬ Q ) )`
- 提示：(¬¬(P→¬Q)→P)→¬¬(P→¬Q)→¬Q
- 参考解：104 个模块 / 175 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  axiom A1
n9  atom P
n15  axiom A2
n24  atom Q
n25  not
n26  imp
n27  not
n28  not
n41  mp
n44  mp
n45  mp
n66  subst(groups=1)
n67  atom P
n68  atom Q
n72  imp
n80  mp
n81  mp
n82  axiom A3
n83  subst(groups=1)
n84  atom P
n85  atom Q
n87  subst(groups=1)
n88  atom P
n89  imp
n90  imp
n91  atom Q
n93  subst(groups=2)
n94  atom P
n95  atom Q
n96  atom R
n97  mp
n98  mp
n99  mp
n100  mp
n102  subst(groups=1)
n103  atom P
n104  atom Q
n105  mp
n107  subst(groups=1)
n108  atom P
n109  atom Q
n110  imp
n112  subst(groups=2)
n113  atom P
n114  atom Q
n115  atom R
n116  mp
n117  mp
n121  mp
n122  mp
n143  subst(groups=1)
n144  atom P
n145  atom Q
n146  not
n147  not
n151  imp
n159  mp
n160  mp
n162  subst(groups=1)
n163  atom P
n164  atom Q
n166  subst(groups=1)
n167  atom P
n168  imp
n169  imp
n170  atom Q
n172  subst(groups=2)
n173  atom P
n174  atom Q
n175  atom R
n177  subst(groups=2)
n178  atom P
n179  atom Q
n180  atom R
n184  imp
n192  mp
n193  mp
n195  subst(groups=1)
n196  atom P
n197  atom Q
n199  subst(groups=1)
n200  atom P
n201  imp
n202  imp
n203  atom Q
n205  subst(groups=2)
n206  atom P
n207  atom Q
n208  atom R
n210  subst(groups=2)
n211  atom P
n212  atom Q
n213  atom R
n215  subst(groups=1)
n216  atom P
n217  atom Q
n219  subst(groups=2)
n220  atom P
n221  atom Q
n222  atom R
n309  subst(groups=2)
n310  atom P
n311  atom Q
n312  atom R

接线：
n24.out → n25.a
n9.out → n26.a
n25.out → n26.b
n26.out → n27.a
n27.out → n28.a
n6.out → n66.assertion
n67.out → n66.atom1
n28.out → n66.formula1
n68.out → n66.atom2
n27.out → n66.formula2
n27.out → n72.a
n28.out → n72.b
n66.out → n45.a
n82.out → n83.assertion
n84.out → n83.atom1
n26.out → n83.formula1
n85.out → n83.atom2
n27.out → n83.formula2
n83.out → n81.a
n6.out → n87.assertion
n88.out → n87.atom1
n27.out → n89.a
n26.out → n89.b
n72.out → n90.a
n89.out → n90.b
n90.out → n87.formula1
n91.out → n87.atom2
n28.out → n87.formula2
n87.out → n81.b
n81.out → n80.a
n15.out → n93.assertion
n94.out → n93.atom1
n28.out → n93.formula1
n95.out → n93.atom2
n72.out → n93.formula2
n96.out → n93.atom3
n89.out → n93.formula3
n93.out → n80.b
n80.out → n45.b
n45.out → n44.a
n6.out → n102.assertion
n103.out → n102.atom1
n89.out → n102.formula1
n104.out → n102.atom2
n89.out → n102.formula2
n102.out → n100.a
n6.out → n107.assertion
n108.out → n107.atom1
n89.out → n107.formula1
n109.out → n107.atom2
n89.out → n110.a
n89.out → n110.b
n110.out → n107.formula2
n107.out → n105.a
n15.out → n112.assertion
n113.out → n112.atom1
n89.out → n112.formula1
n114.out → n112.atom2
n110.out → n112.formula2
n115.out → n112.atom3
n89.out → n112.formula3
n112.out → n105.b
n105.out → n100.b
n100.out → n99.a
n6.out → n143.assertion
n144.out → n143.atom1
n27.out → n143.formula1
n145.out → n143.atom2
n89.out → n146.a
n146.out → n147.a
n147.out → n143.formula2
n147.out → n151.a
n27.out → n151.b
n143.out → n122.a
n82.out → n162.assertion
n163.out → n162.atom1
n146.out → n162.formula1
n164.out → n162.atom2
n26.out → n162.formula2
n162.out → n160.a
n6.out → n166.assertion
n167.out → n166.atom1
n26.out → n168.a
n146.out → n168.b
n151.out → n169.a
n168.out → n169.b
n169.out → n166.formula1
n170.out → n166.atom2
n27.out → n166.formula2
n166.out → n160.b
n160.out → n159.a
n15.out → n172.assertion
n173.out → n172.atom1
n27.out → n172.formula1
n174.out → n172.atom2
n151.out → n172.formula2
n175.out → n172.atom3
n168.out → n172.formula3
n172.out → n159.b
n159.out → n122.b
n122.out → n121.a
n15.out → n177.assertion
n178.out → n177.atom1
n27.out → n177.formula1
n179.out → n177.atom2
n26.out → n177.formula2
n180.out → n177.atom3
n146.out → n177.formula3
n177.out → n121.b
n27.out → n184.a
n146.out → n184.b
n121.out → n117.a
n82.out → n195.assertion
n196.out → n195.atom1
n26.out → n195.formula1
n197.out → n195.atom2
n89.out → n195.formula2
n195.out → n193.a
n6.out → n199.assertion
n200.out → n199.atom1
n89.out → n201.a
n26.out → n201.b
n184.out → n202.a
n201.out → n202.b
n202.out → n199.formula1
n203.out → n199.atom2
n89.out → n199.formula2
n199.out → n193.b
n193.out → n192.a
n15.out → n205.assertion
n206.out → n205.atom1
n89.out → n205.formula1
n207.out → n205.atom2
n184.out → n205.formula2
n208.out → n205.atom3
n201.out → n205.formula3
n205.out → n192.b
n192.out → n117.b
n117.out → n116.a
n15.out → n210.assertion
n211.out → n210.atom1
n89.out → n210.formula1
n212.out → n210.atom2
n89.out → n210.formula2
n213.out → n210.atom3
n26.out → n210.formula3
n210.out → n116.b
n116.out → n99.b
n99.out → n98.a
n6.out → n215.assertion
n216.out → n215.atom1
n201.out → n215.formula1
n217.out → n215.atom2
n28.out → n215.formula2
n215.out → n98.b
n98.out → n97.a
n15.out → n219.assertion
n220.out → n219.atom1
n28.out → n219.formula1
n221.out → n219.atom2
n89.out → n219.formula2
n222.out → n219.atom3
n26.out → n219.formula3
n219.out → n97.b
n97.out → n44.b
n44.out → n41.a
n15.out → n309.assertion
n310.out → n309.atom1
n28.out → n309.formula1
n311.out → n309.atom2
n9.out → n309.formula2
n312.out → n309.atom3
n25.out → n309.formula3
n309.out → n41.b
n41.out → tgt.proof
```

</details>

### 70 · 合取前件引入

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( ¬ ( P → ¬ Q ) → R ) )`
- 提示：(P→Q→R)→¬(P→¬Q)→R
- 参考解：105 个模块 / 175 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n136  [target]
n1  mp
n2  mp
n3  定理 *58
n4  axiom A1
n5  subst(groups=1)
n6  atom P
n7  atom P
n8  atom Q
n9  not
n10  imp
n11  not
n12  imp
n13  atom Q
n14  atom R
n15  imp
n16  imp
n17  mp
n18  mp
n19  mp
n21  定理 *01
n22  subst(groups=0)
n23  atom P
n27  subst(groups=1)
n28  atom P
n29  atom Q
n33  imp
n36  axiom A2
n41  mp
n42  mp
n43  mp
n44  mp
n45  mp
n46  定理 *52
n47  subst(groups=0)
n48  atom Q
n49  mp
n50  mp
n52  subst(groups=0)
n53  atom Q
n55  subst(groups=1)
n56  atom P
n57  imp
n58  imp
n59  atom Q
n61  subst(groups=2)
n62  atom P
n63  atom Q
n64  atom R
n65  mp
n66  mp
n67  mp
n69  mp
n71  subst(groups=0)
n72  atom P
n74  subst(groups=1)
n75  atom P
n76  imp
n77  atom Q
n79  subst(groups=1)
n80  atom Q
n81  atom R
n83  subst(groups=2)
n84  atom P
n85  atom Q
n86  atom R
n88  subst(groups=1)
n89  atom P
n90  imp
n91  imp
n92  atom Q
n94  subst(groups=2)
n95  atom P
n96  atom Q
n97  atom R
n99  subst(groups=2)
n100  atom P
n101  atom Q
n102  atom R
n104  subst(groups=1)
n105  atom P
n106  imp
n107  imp
n108  atom Q
n110  subst(groups=2)
n111  atom P
n112  atom Q
n113  atom R
n114  mp
n115  mp
n117  subst(groups=0)
n118  atom P
n120  subst(groups=1)
n121  atom P
n122  imp
n123  imp
n124  imp
n125  atom Q
n127  subst(groups=2)
n128  atom P
n129  atom Q
n130  atom R
n132  subst(groups=2)
n133  atom P
n134  atom Q
n135  atom R

接线：
n3.out → n2.a
n4.out → n5.assertion
n6.out → n5.atom1
n8.out → n9.a
n7.out → n10.a
n9.out → n10.b
n10.out → n11.a
n11.out → n12.a
n8.out → n12.b
n12.out → n5.formula1
n13.out → n5.atom2
n8.out → n15.a
n14.out → n15.b
n7.out → n16.a
n15.out → n16.b
n16.out → n5.formula2
n5.out → n2.b
n2.out → n1.a
n21.out → n22.assertion
n23.out → n22.atom1
n16.out → n22.formula1
n4.out → n27.assertion
n28.out → n27.atom1
n16.out → n27.formula1
n29.out → n27.atom2
n11.out → n27.formula2
n11.out → n33.a
n16.out → n33.b
n27.out → n19.a
n46.out → n47.assertion
n48.out → n47.atom1
n9.out → n47.formula1
n47.out → n45.a
n4.out → n52.assertion
n53.out → n52.atom1
n16.out → n52.formula1
n52.out → n50.a
n4.out → n55.assertion
n56.out → n55.atom1
n16.out → n57.a
n7.out → n57.b
n7.out → n58.a
n57.out → n58.b
n58.out → n55.formula1
n59.out → n55.atom2
n11.out → n55.formula2
n55.out → n50.b
n50.out → n49.a
n36.out → n61.assertion
n62.out → n61.atom1
n11.out → n61.formula1
n63.out → n61.atom2
n7.out → n61.formula2
n64.out → n61.atom3
n57.out → n61.formula3
n61.out → n49.b
n49.out → n45.b
n45.out → n44.a
n21.out → n71.assertion
n72.out → n71.atom1
n15.out → n71.formula1
n71.out → n69.a
n4.out → n74.assertion
n75.out → n74.atom1
n15.out → n76.a
n15.out → n76.b
n76.out → n74.formula1
n77.out → n74.atom2
n7.out → n74.formula2
n74.out → n69.b
n69.out → n22.a
n36.out → n79.assertion
n80.out → n79.atom1
n15.out → n79.formula1
n81.out → n79.atom2
n15.out → n79.formula2
n79.out → n22.b
n22.out → n67.a
n36.out → n83.assertion
n84.out → n83.atom1
n16.out → n83.formula1
n85.out → n83.atom2
n7.out → n83.formula2
n86.out → n83.atom3
n15.out → n83.formula3
n83.out → n67.b
n67.out → n66.a
n4.out → n88.assertion
n89.out → n88.atom1
n16.out → n90.a
n15.out → n90.b
n57.out → n91.a
n90.out → n91.b
n91.out → n88.formula1
n92.out → n88.atom2
n11.out → n88.formula2
n88.out → n66.b
n66.out → n65.a
n36.out → n94.assertion
n95.out → n94.atom1
n11.out → n94.formula1
n96.out → n94.atom2
n57.out → n94.formula2
n97.out → n94.atom3
n90.out → n94.formula3
n94.out → n65.b
n65.out → n44.b
n44.out → n43.a
n36.out → n99.assertion
n100.out → n99.atom1
n11.out → n99.formula1
n101.out → n99.atom2
n16.out → n99.formula2
n102.out → n99.atom3
n15.out → n99.formula3
n99.out → n43.b
n43.out → n42.a
n4.out → n104.assertion
n105.out → n104.atom1
n11.out → n106.a
n15.out → n106.b
n33.out → n107.a
n106.out → n107.b
n107.out → n104.formula1
n108.out → n104.atom2
n16.out → n104.formula2
n104.out → n42.b
n42.out → n41.a
n36.out → n110.assertion
n111.out → n110.atom1
n16.out → n110.formula1
n112.out → n110.atom2
n33.out → n110.formula2
n113.out → n110.atom3
n106.out → n110.formula3
n110.out → n41.b
n41.out → n19.b
n19.out → n18.a
n36.out → n117.assertion
n118.out → n117.atom1
n11.out → n117.formula1
n117.out → n115.a
n4.out → n120.assertion
n121.out → n120.atom1
n11.out → n122.a
n14.out → n122.b
n12.out → n123.a
n122.out → n123.b
n106.out → n124.a
n123.out → n124.b
n124.out → n120.formula1
n125.out → n120.atom2
n16.out → n120.formula2
n120.out → n115.b
n115.out → n114.a
n36.out → n127.assertion
n128.out → n127.atom1
n16.out → n127.formula1
n129.out → n127.atom2
n106.out → n127.formula2
n130.out → n127.atom3
n123.out → n127.formula3
n127.out → n114.b
n114.out → n18.b
n18.out → n17.a
n36.out → n132.assertion
n133.out → n132.atom1
n16.out → n132.formula1
n134.out → n132.atom2
n12.out → n132.formula2
n135.out → n132.atom3
n122.out → n132.formula3
n132.out → n17.b
n17.out → n1.b
n1.out → n136.proof
```

</details>

### 71 · 逆否

- 目标：`⊢ ( ( P → Q ) → ( ¬ Q → ¬ P ) )`
- 提示：(P→Q)→¬Q→¬P
- 参考解：105 个模块 / 172 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n133  [target]
n1  mp
n2  mp
n3  mp
n5  定理 *01
n6  subst(groups=0)
n7  atom P
n8  atom P
n9  atom Q
n10  imp
n13  axiom A1
n14  subst(groups=1)
n15  atom P
n16  atom Q
n17  not
n18  not
n22  imp
n25  axiom A2
n30  mp
n31  mp
n32  mp
n33  mp
n34  mp
n35  定理 *35
n36  mp
n37  mp
n39  subst(groups=0)
n40  atom Q
n42  subst(groups=1)
n43  atom P
n44  imp
n45  imp
n46  atom Q
n48  subst(groups=2)
n49  atom P
n50  atom Q
n51  atom R
n52  mp
n53  mp
n54  mp
n56  subst(groups=2)
n57  atom P
n58  atom Q
n59  atom R
n61  subst(groups=1)
n62  atom P
n63  imp
n64  imp
n65  atom Q
n67  subst(groups=2)
n68  atom P
n69  atom Q
n70  atom R
n72  subst(groups=2)
n73  atom P
n74  atom Q
n75  atom R
n77  subst(groups=1)
n78  atom P
n79  imp
n80  imp
n81  atom Q
n83  subst(groups=2)
n84  atom P
n85  atom Q
n86  atom R
n87  mp
n88  mp
n89  mp
n90  mp
n91  定理 *41
n92  subst(groups=0)
n93  atom P
n95  subst(groups=1)
n96  atom P
n97  not
n98  not
n99  imp
n100  atom Q
n102  subst(groups=1)
n103  atom P
n104  atom R
n106  subst(groups=1)
n107  atom P
n108  imp
n109  imp
n110  atom Q
n112  subst(groups=2)
n113  atom P
n114  atom Q
n115  atom R
n116  mp
n117  mp
n118  定理 *?
n119  subst(groups=1)
n120  atom P
n121  atom Q
n123  subst(groups=1)
n124  atom P
n125  imp
n126  imp
n127  atom Q
n129  subst(groups=2)
n130  atom P
n131  atom Q
n132  atom R

接线：
n5.out → n6.assertion
n7.out → n6.atom1
n8.out → n10.a
n9.out → n10.b
n10.out → n6.formula1
n13.out → n14.assertion
n15.out → n14.atom1
n10.out → n14.formula1
n16.out → n14.atom2
n8.out → n17.a
n17.out → n18.a
n18.out → n14.formula2
n18.out → n22.a
n10.out → n22.b
n14.out → n3.a
n35.out → n34.a
n13.out → n39.assertion
n40.out → n39.atom1
n10.out → n39.formula1
n39.out → n37.a
n13.out → n42.assertion
n43.out → n42.atom1
n10.out → n44.a
n8.out → n44.b
n8.out → n45.a
n44.out → n45.b
n45.out → n42.formula1
n46.out → n42.atom2
n18.out → n42.formula2
n42.out → n37.b
n37.out → n36.a
n25.out → n48.assertion
n49.out → n48.atom1
n18.out → n48.formula1
n50.out → n48.atom2
n8.out → n48.formula2
n51.out → n48.atom3
n44.out → n48.formula3
n48.out → n36.b
n36.out → n34.b
n34.out → n33.a
n6.out → n54.a
n25.out → n56.assertion
n57.out → n56.atom1
n10.out → n56.formula1
n58.out → n56.atom2
n8.out → n56.formula2
n59.out → n56.atom3
n9.out → n56.formula3
n56.out → n54.b
n54.out → n53.a
n13.out → n61.assertion
n62.out → n61.atom1
n10.out → n63.a
n9.out → n63.b
n44.out → n64.a
n63.out → n64.b
n64.out → n61.formula1
n65.out → n61.atom2
n18.out → n61.formula2
n61.out → n53.b
n53.out → n52.a
n25.out → n67.assertion
n68.out → n67.atom1
n18.out → n67.formula1
n69.out → n67.atom2
n44.out → n67.formula2
n70.out → n67.atom3
n63.out → n67.formula3
n67.out → n52.b
n52.out → n33.b
n33.out → n32.a
n25.out → n72.assertion
n73.out → n72.atom1
n18.out → n72.formula1
n74.out → n72.atom2
n10.out → n72.formula2
n75.out → n72.atom3
n9.out → n72.formula3
n72.out → n32.b
n32.out → n31.a
n13.out → n77.assertion
n78.out → n77.atom1
n18.out → n79.a
n9.out → n79.b
n22.out → n80.a
n79.out → n80.b
n80.out → n77.formula1
n81.out → n77.atom2
n10.out → n77.formula2
n77.out → n31.b
n31.out → n30.a
n25.out → n83.assertion
n84.out → n83.atom1
n10.out → n83.formula1
n85.out → n83.atom2
n22.out → n83.formula2
n86.out → n83.atom3
n79.out → n83.formula3
n83.out → n30.b
n30.out → n3.b
n3.out → n2.a
n91.out → n92.assertion
n93.out → n92.atom1
n9.out → n92.formula1
n92.out → n90.a
n13.out → n95.assertion
n96.out → n95.atom1
n9.out → n97.a
n97.out → n98.a
n9.out → n99.a
n98.out → n99.b
n99.out → n95.formula1
n100.out → n95.atom2
n18.out → n95.formula2
n95.out → n90.b
n90.out → n89.a
n25.out → n102.assertion
n103.out → n102.atom1
n18.out → n102.formula1
n104.out → n102.atom2
n98.out → n102.formula2
n102.out → n89.b
n89.out → n88.a
n13.out → n106.assertion
n107.out → n106.atom1
n18.out → n108.a
n98.out → n108.b
n79.out → n109.a
n108.out → n109.b
n109.out → n106.formula1
n110.out → n106.atom2
n10.out → n106.formula2
n106.out → n88.b
n88.out → n87.a
n25.out → n112.assertion
n113.out → n112.atom1
n10.out → n112.formula1
n114.out → n112.atom2
n79.out → n112.formula2
n115.out → n112.atom3
n108.out → n112.formula3
n112.out → n87.b
n87.out → n2.b
n2.out → n1.a
n118.out → n119.assertion
n120.out → n119.atom1
n17.out → n119.formula1
n121.out → n119.atom2
n97.out → n119.formula2
n119.out → n117.a
n13.out → n123.assertion
n124.out → n123.atom1
n97.out → n125.a
n17.out → n125.b
n108.out → n126.a
n125.out → n126.b
n126.out → n123.formula1
n127.out → n123.atom2
n10.out → n123.formula2
n123.out → n117.b
n117.out → n116.a
n25.out → n129.assertion
n130.out → n129.atom1
n10.out → n129.formula1
n131.out → n129.atom2
n108.out → n129.formula2
n132.out → n129.atom3
n125.out → n129.formula3
n129.out → n116.b
n116.out → n1.b
n1.out → n133.proof
```

</details>

### 72 · 皮尔士回滚

- 目标：`⊢ ( ( ( ( P → Q ) → P ) → P ) → ( ( ( P → Q ) → R ) → ( ( R → P ) → P ) ) )`
- 提示：(((P→Q)→P)→P)→((P→Q)→R)→(R→P)→P
- 参考解：111 个模块 / 188 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n139  [target]
n1  mp
n3  定理 *01
n4  subst(groups=0)
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  imp
n10  imp
n13  axiom A1
n14  subst(groups=1)
n15  atom P
n16  atom Q
n17  atom R
n18  imp
n22  imp
n25  axiom A2
n30  mp
n31  mp
n32  mp
n33  mp
n34  mp
n35  定理 *63
n36  subst(groups=2)
n37  atom P
n38  atom Q
n39  atom R
n40  mp
n41  mp
n43  subst(groups=1)
n44  atom P
n45  imp
n46  imp
n47  atom Q
n49  subst(groups=1)
n50  atom P
n51  imp
n52  imp
n53  atom Q
n55  subst(groups=2)
n56  atom P
n57  atom Q
n58  atom R
n59  mp
n60  mp
n61  mp
n62  mp
n64  subst(groups=1)
n65  atom P
n66  imp
n67  atom Q
n68  mp
n69  mp
n70  mp
n71  mp
n72  定理 *04
n73  subst(groups=2)
n74  atom P
n75  atom Q
n76  atom R
n78  subst(groups=1)
n79  atom P
n80  imp
n81  imp
n82  imp
n83  atom Q
n85  subst(groups=2)
n86  atom P
n87  atom Q
n88  atom R
n90  subst(groups=1)
n91  atom P
n92  imp
n93  atom Q
n95  subst(groups=2)
n96  atom P
n97  atom Q
n98  atom R
n99  mp
n100  mp
n102  subst(groups=2)
n103  atom P
n104  atom Q
n105  atom R
n107  subst(groups=1)
n108  atom P
n109  imp
n110  imp
n111  imp
n112  atom Q
n114  subst(groups=2)
n115  atom P
n116  atom Q
n117  atom R
n119  subst(groups=2)
n120  atom P
n121  atom Q
n122  atom R
n124  subst(groups=2)
n125  atom P
n126  atom Q
n127  atom R
n129  subst(groups=1)
n130  atom P
n131  imp
n132  imp
n133  atom Q
n135  subst(groups=2)
n136  atom P
n137  atom Q
n138  atom R

接线：
n3.out → n4.assertion
n5.out → n4.atom1
n6.out → n8.a
n7.out → n8.b
n8.out → n9.a
n6.out → n9.b
n9.out → n10.a
n6.out → n10.b
n10.out → n4.formula1
n13.out → n14.assertion
n15.out → n14.atom1
n10.out → n14.formula1
n16.out → n14.atom2
n8.out → n18.a
n17.out → n18.b
n18.out → n14.formula2
n18.out → n22.a
n10.out → n22.b
n14.out → n1.a
n35.out → n36.assertion
n37.out → n36.atom1
n8.out → n36.formula1
n38.out → n36.atom2
n17.out → n36.formula2
n39.out → n36.atom3
n6.out → n36.formula3
n36.out → n34.a
n13.out → n43.assertion
n44.out → n43.atom1
n17.out → n45.a
n6.out → n45.b
n45.out → n46.a
n9.out → n46.b
n46.out → n43.formula1
n47.out → n43.atom2
n10.out → n43.formula2
n43.out → n41.a
n13.out → n49.assertion
n50.out → n49.atom1
n10.out → n51.a
n46.out → n51.b
n46.out → n52.a
n51.out → n52.b
n52.out → n49.formula1
n53.out → n49.atom2
n18.out → n49.formula2
n49.out → n41.b
n41.out → n40.a
n25.out → n55.assertion
n56.out → n55.atom1
n18.out → n55.formula1
n57.out → n55.atom2
n46.out → n55.formula2
n58.out → n55.atom3
n51.out → n55.formula3
n55.out → n40.b
n40.out → n34.b
n34.out → n33.a
n4.out → n62.a
n13.out → n64.assertion
n65.out → n64.atom1
n10.out → n66.a
n10.out → n66.b
n66.out → n64.formula1
n67.out → n64.atom2
n18.out → n64.formula2
n64.out → n62.b
n62.out → n61.a
n72.out → n73.assertion
n74.out → n73.atom1
n9.out → n73.formula1
n75.out → n73.atom2
n6.out → n73.formula2
n76.out → n73.atom3
n45.out → n73.formula3
n73.out → n71.a
n13.out → n78.assertion
n79.out → n78.atom1
n45.out → n80.a
n6.out → n80.b
n46.out → n81.a
n80.out → n81.b
n10.out → n82.a
n81.out → n82.b
n82.out → n78.formula1
n83.out → n78.atom2
n10.out → n78.formula2
n78.out → n71.b
n71.out → n70.a
n25.out → n85.assertion
n86.out → n85.atom1
n10.out → n85.formula1
n87.out → n85.atom2
n10.out → n85.formula2
n88.out → n85.atom3
n81.out → n85.formula3
n85.out → n70.b
n70.out → n69.a
n13.out → n90.assertion
n91.out → n90.atom1
n66.out → n92.a
n82.out → n92.b
n92.out → n90.formula1
n93.out → n90.atom2
n18.out → n90.formula2
n90.out → n69.b
n69.out → n68.a
n25.out → n95.assertion
n96.out → n95.atom1
n18.out → n95.formula1
n97.out → n95.atom2
n66.out → n95.formula2
n98.out → n95.atom3
n82.out → n95.formula3
n95.out → n68.b
n68.out → n61.b
n61.out → n60.a
n25.out → n102.assertion
n103.out → n102.atom1
n10.out → n102.formula1
n104.out → n102.atom2
n46.out → n102.formula2
n105.out → n102.atom3
n80.out → n102.formula3
n102.out → n100.a
n13.out → n107.assertion
n108.out → n107.atom1
n10.out → n109.a
n80.out → n109.b
n51.out → n110.a
n109.out → n110.b
n82.out → n111.a
n110.out → n111.b
n111.out → n107.formula1
n112.out → n107.atom2
n18.out → n107.formula2
n107.out → n100.b
n100.out → n99.a
n25.out → n114.assertion
n115.out → n114.atom1
n18.out → n114.formula1
n116.out → n114.atom2
n82.out → n114.formula2
n117.out → n114.atom3
n110.out → n114.formula3
n114.out → n99.b
n99.out → n60.b
n60.out → n59.a
n25.out → n119.assertion
n120.out → n119.atom1
n18.out → n119.formula1
n121.out → n119.atom2
n51.out → n119.formula2
n122.out → n119.atom3
n109.out → n119.formula3
n119.out → n59.b
n59.out → n33.b
n33.out → n32.a
n25.out → n124.assertion
n125.out → n124.atom1
n18.out → n124.formula1
n126.out → n124.atom2
n10.out → n124.formula2
n127.out → n124.atom3
n80.out → n124.formula3
n124.out → n32.b
n32.out → n31.a
n13.out → n129.assertion
n130.out → n129.atom1
n18.out → n131.a
n80.out → n131.b
n22.out → n132.a
n131.out → n132.b
n132.out → n129.formula1
n133.out → n129.atom2
n10.out → n129.formula2
n129.out → n31.b
n31.out → n30.a
n25.out → n135.assertion
n136.out → n135.atom1
n10.out → n135.formula1
n137.out → n135.atom2
n22.out → n135.formula2
n138.out → n135.atom3
n131.out → n135.formula3
n135.out → n30.b
n30.out → n1.b
n1.out → n139.proof
```

</details>

### 73 · 等值引入 · 中间结论

- 目标：`⊢ ( P → ( ( ¬ ¬ ( P → ¬ Q ) → P ) → ( ¬ ¬ ( P → ¬ Q ) → ¬ Q ) ) )`
- 提示：P→(¬¬(P→¬Q)→P)→¬¬(P→¬Q)→¬Q
- 参考解：111 个模块 / 188 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  axiom A1
n9  atom P
n15  axiom A2
n24  atom Q
n25  not
n26  imp
n27  not
n28  not
n32  imp
n40  mp
n41  mp
n44  mp
n45  mp
n66  subst(groups=1)
n67  atom P
n68  atom Q
n72  imp
n80  mp
n81  mp
n82  axiom A3
n83  subst(groups=1)
n84  atom P
n85  atom Q
n87  subst(groups=1)
n88  atom P
n89  imp
n90  imp
n91  atom Q
n93  subst(groups=2)
n94  atom P
n95  atom Q
n96  atom R
n97  mp
n98  mp
n99  mp
n100  mp
n102  subst(groups=1)
n103  atom P
n104  atom Q
n105  mp
n107  subst(groups=1)
n108  atom P
n109  atom Q
n110  imp
n112  subst(groups=2)
n113  atom P
n114  atom Q
n115  atom R
n116  mp
n117  mp
n121  mp
n122  mp
n143  subst(groups=1)
n144  atom P
n145  atom Q
n146  not
n147  not
n151  imp
n159  mp
n160  mp
n162  subst(groups=1)
n163  atom P
n164  atom Q
n166  subst(groups=1)
n167  atom P
n168  imp
n169  imp
n170  atom Q
n172  subst(groups=2)
n173  atom P
n174  atom Q
n175  atom R
n177  subst(groups=2)
n178  atom P
n179  atom Q
n180  atom R
n184  imp
n192  mp
n193  mp
n195  subst(groups=1)
n196  atom P
n197  atom Q
n199  subst(groups=1)
n200  atom P
n201  imp
n202  imp
n203  atom Q
n205  subst(groups=2)
n206  atom P
n207  atom Q
n208  atom R
n210  subst(groups=2)
n211  atom P
n212  atom Q
n213  atom R
n215  subst(groups=1)
n216  atom P
n217  atom Q
n219  subst(groups=2)
n220  atom P
n221  atom Q
n222  atom R
n309  subst(groups=2)
n310  atom P
n311  atom Q
n312  atom R
n314  subst(groups=1)
n315  atom P
n316  imp
n317  imp
n318  atom Q

接线：
n24.out → n25.a
n9.out → n26.a
n25.out → n26.b
n26.out → n27.a
n27.out → n28.a
n28.out → n32.a
n9.out → n32.b
n6.out → n66.assertion
n67.out → n66.atom1
n28.out → n66.formula1
n68.out → n66.atom2
n27.out → n66.formula2
n27.out → n72.a
n28.out → n72.b
n66.out → n45.a
n82.out → n83.assertion
n84.out → n83.atom1
n26.out → n83.formula1
n85.out → n83.atom2
n27.out → n83.formula2
n83.out → n81.a
n6.out → n87.assertion
n88.out → n87.atom1
n27.out → n89.a
n26.out → n89.b
n72.out → n90.a
n89.out → n90.b
n90.out → n87.formula1
n91.out → n87.atom2
n28.out → n87.formula2
n87.out → n81.b
n81.out → n80.a
n15.out → n93.assertion
n94.out → n93.atom1
n28.out → n93.formula1
n95.out → n93.atom2
n72.out → n93.formula2
n96.out → n93.atom3
n89.out → n93.formula3
n93.out → n80.b
n80.out → n45.b
n45.out → n44.a
n6.out → n102.assertion
n103.out → n102.atom1
n89.out → n102.formula1
n104.out → n102.atom2
n89.out → n102.formula2
n102.out → n100.a
n6.out → n107.assertion
n108.out → n107.atom1
n89.out → n107.formula1
n109.out → n107.atom2
n89.out → n110.a
n89.out → n110.b
n110.out → n107.formula2
n107.out → n105.a
n15.out → n112.assertion
n113.out → n112.atom1
n89.out → n112.formula1
n114.out → n112.atom2
n110.out → n112.formula2
n115.out → n112.atom3
n89.out → n112.formula3
n112.out → n105.b
n105.out → n100.b
n100.out → n99.a
n6.out → n143.assertion
n144.out → n143.atom1
n27.out → n143.formula1
n145.out → n143.atom2
n89.out → n146.a
n146.out → n147.a
n147.out → n143.formula2
n147.out → n151.a
n27.out → n151.b
n143.out → n122.a
n82.out → n162.assertion
n163.out → n162.atom1
n146.out → n162.formula1
n164.out → n162.atom2
n26.out → n162.formula2
n162.out → n160.a
n6.out → n166.assertion
n167.out → n166.atom1
n26.out → n168.a
n146.out → n168.b
n151.out → n169.a
n168.out → n169.b
n169.out → n166.formula1
n170.out → n166.atom2
n27.out → n166.formula2
n166.out → n160.b
n160.out → n159.a
n15.out → n172.assertion
n173.out → n172.atom1
n27.out → n172.formula1
n174.out → n172.atom2
n151.out → n172.formula2
n175.out → n172.atom3
n168.out → n172.formula3
n172.out → n159.b
n159.out → n122.b
n122.out → n121.a
n15.out → n177.assertion
n178.out → n177.atom1
n27.out → n177.formula1
n179.out → n177.atom2
n26.out → n177.formula2
n180.out → n177.atom3
n146.out → n177.formula3
n177.out → n121.b
n27.out → n184.a
n146.out → n184.b
n121.out → n117.a
n82.out → n195.assertion
n196.out → n195.atom1
n26.out → n195.formula1
n197.out → n195.atom2
n89.out → n195.formula2
n195.out → n193.a
n6.out → n199.assertion
n200.out → n199.atom1
n89.out → n201.a
n26.out → n201.b
n184.out → n202.a
n201.out → n202.b
n202.out → n199.formula1
n203.out → n199.atom2
n89.out → n199.formula2
n199.out → n193.b
n193.out → n192.a
n15.out → n205.assertion
n206.out → n205.atom1
n89.out → n205.formula1
n207.out → n205.atom2
n184.out → n205.formula2
n208.out → n205.atom3
n201.out → n205.formula3
n205.out → n192.b
n192.out → n117.b
n117.out → n116.a
n15.out → n210.assertion
n211.out → n210.atom1
n89.out → n210.formula1
n212.out → n210.atom2
n89.out → n210.formula2
n213.out → n210.atom3
n26.out → n210.formula3
n210.out → n116.b
n116.out → n99.b
n99.out → n98.a
n6.out → n215.assertion
n216.out → n215.atom1
n201.out → n215.formula1
n217.out → n215.atom2
n28.out → n215.formula2
n215.out → n98.b
n98.out → n97.a
n15.out → n219.assertion
n220.out → n219.atom1
n28.out → n219.formula1
n221.out → n219.atom2
n89.out → n219.formula2
n222.out → n219.atom3
n26.out → n219.formula3
n219.out → n97.b
n97.out → n44.b
n44.out → n41.a
n15.out → n309.assertion
n310.out → n309.atom1
n28.out → n309.formula1
n311.out → n309.atom2
n9.out → n309.formula2
n312.out → n309.atom3
n25.out → n309.formula3
n309.out → n41.b
n41.out → n40.a
n6.out → n314.assertion
n315.out → n314.atom1
n28.out → n316.a
n25.out → n316.b
n32.out → n317.a
n316.out → n317.b
n317.out → n314.formula1
n318.out → n314.atom2
n9.out → n314.formula2
n314.out → n40.b
n40.out → tgt.proof
```

</details>

### 74 · 蕴涵组合

- 目标：`⊢ ( ( P → Q ) → ( ( R → S ) → ( ( Q → R ) → ( P → S ) ) ) )`
- 提示：(P→Q)→(R→S)→(Q→R)→P→S
- 参考解：113 个模块 / 192 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n145  [target]
n1  mp
n6  atom P
n7  atom Q
n8  imp
n11  axiom A1
n12  subst(groups=1)
n13  atom P
n14  atom Q
n15  atom R
n16  atom S
n17  imp
n21  imp
n24  axiom A2
n29  mp
n30  mp
n31  mp
n32  mp
n33  mp
n34  定理 *04
n35  subst(groups=2)
n36  atom P
n37  atom Q
n38  atom R
n39  mp
n40  mp
n42  subst(groups=1)
n43  atom P
n44  imp
n45  imp
n46  imp
n47  atom Q
n49  subst(groups=1)
n50  atom P
n51  imp
n52  imp
n53  atom Q
n55  subst(groups=2)
n56  atom P
n57  atom Q
n58  atom R
n59  mp
n60  mp
n61  mp
n62  mp
n63  定理 *63
n64  subst(groups=0)
n65  atom R
n67  subst(groups=1)
n68  atom P
n69  imp
n70  imp
n71  imp
n72  atom Q
n73  mp
n74  mp
n75  mp
n76  mp
n78  subst(groups=2)
n79  atom P
n80  atom Q
n81  atom R
n83  subst(groups=1)
n84  atom P
n85  imp
n86  imp
n87  imp
n88  atom Q
n90  subst(groups=2)
n91  atom P
n92  atom Q
n93  atom R
n95  subst(groups=1)
n96  atom P
n97  imp
n98  imp
n99  atom Q
n101  subst(groups=2)
n102  atom P
n103  atom Q
n104  atom R
n105  mp
n106  mp
n108  subst(groups=2)
n109  atom P
n110  atom Q
n111  atom R
n113  subst(groups=1)
n114  atom P
n115  imp
n116  imp
n117  imp
n118  atom Q
n120  subst(groups=2)
n121  atom P
n122  atom Q
n123  atom R
n125  subst(groups=2)
n126  atom P
n127  atom Q
n128  atom R
n130  subst(groups=2)
n131  atom P
n132  atom Q
n133  atom R
n135  subst(groups=1)
n136  atom P
n137  imp
n138  imp
n139  atom Q
n141  subst(groups=2)
n142  atom P
n143  atom Q
n144  atom R

接线：
n6.out → n8.a
n7.out → n8.b
n11.out → n12.assertion
n13.out → n12.atom1
n8.out → n12.formula1
n14.out → n12.atom2
n15.out → n17.a
n16.out → n17.b
n17.out → n12.formula2
n17.out → n21.a
n8.out → n21.b
n12.out → n1.a
n34.out → n35.assertion
n36.out → n35.atom1
n15.out → n35.formula1
n37.out → n35.atom2
n16.out → n35.formula2
n38.out → n35.atom3
n7.out → n35.formula3
n35.out → n33.a
n11.out → n42.assertion
n43.out → n42.atom1
n7.out → n44.a
n15.out → n44.b
n7.out → n45.a
n16.out → n45.b
n44.out → n46.a
n45.out → n46.b
n46.out → n42.formula1
n47.out → n42.atom2
n8.out → n42.formula2
n42.out → n40.a
n11.out → n49.assertion
n50.out → n49.atom1
n8.out → n51.a
n46.out → n51.b
n46.out → n52.a
n51.out → n52.b
n52.out → n49.formula1
n53.out → n49.atom2
n17.out → n49.formula2
n49.out → n40.b
n40.out → n39.a
n24.out → n55.assertion
n56.out → n55.atom1
n17.out → n55.formula1
n57.out → n55.atom2
n46.out → n55.formula2
n58.out → n55.atom3
n51.out → n55.formula3
n55.out → n39.b
n39.out → n33.b
n33.out → n32.a
n63.out → n64.assertion
n65.out → n64.atom1
n16.out → n64.formula1
n64.out → n62.a
n11.out → n67.assertion
n68.out → n67.atom1
n6.out → n69.a
n16.out → n69.b
n45.out → n70.a
n69.out → n70.b
n8.out → n71.a
n70.out → n71.b
n71.out → n67.formula1
n72.out → n67.atom2
n17.out → n67.formula2
n67.out → n62.b
n62.out → n61.a
n34.out → n78.assertion
n79.out → n78.atom1
n45.out → n78.formula1
n80.out → n78.atom2
n69.out → n78.formula2
n81.out → n78.atom3
n44.out → n78.formula3
n78.out → n76.a
n11.out → n83.assertion
n84.out → n83.atom1
n44.out → n85.a
n69.out → n85.b
n46.out → n86.a
n85.out → n86.b
n70.out → n87.a
n86.out → n87.b
n87.out → n83.formula1
n88.out → n83.atom2
n8.out → n83.formula2
n83.out → n76.b
n76.out → n75.a
n24.out → n90.assertion
n91.out → n90.atom1
n8.out → n90.formula1
n92.out → n90.atom2
n70.out → n90.formula2
n93.out → n90.atom3
n86.out → n90.formula3
n90.out → n75.b
n75.out → n74.a
n11.out → n95.assertion
n96.out → n95.atom1
n8.out → n97.a
n86.out → n97.b
n71.out → n98.a
n97.out → n98.b
n98.out → n95.formula1
n99.out → n95.atom2
n17.out → n95.formula2
n95.out → n74.b
n74.out → n73.a
n24.out → n101.assertion
n102.out → n101.atom1
n17.out → n101.formula1
n103.out → n101.atom2
n71.out → n101.formula2
n104.out → n101.atom3
n97.out → n101.formula3
n101.out → n73.b
n73.out → n61.b
n61.out → n60.a
n24.out → n108.assertion
n109.out → n108.atom1
n8.out → n108.formula1
n110.out → n108.atom2
n46.out → n108.formula2
n111.out → n108.atom3
n85.out → n108.formula3
n108.out → n106.a
n11.out → n113.assertion
n114.out → n113.atom1
n8.out → n115.a
n85.out → n115.b
n51.out → n116.a
n115.out → n116.b
n97.out → n117.a
n116.out → n117.b
n117.out → n113.formula1
n118.out → n113.atom2
n17.out → n113.formula2
n113.out → n106.b
n106.out → n105.a
n24.out → n120.assertion
n121.out → n120.atom1
n17.out → n120.formula1
n122.out → n120.atom2
n97.out → n120.formula2
n123.out → n120.atom3
n116.out → n120.formula3
n120.out → n105.b
n105.out → n60.b
n60.out → n59.a
n24.out → n125.assertion
n126.out → n125.atom1
n17.out → n125.formula1
n127.out → n125.atom2
n51.out → n125.formula2
n128.out → n125.atom3
n115.out → n125.formula3
n125.out → n59.b
n59.out → n32.b
n32.out → n31.a
n24.out → n130.assertion
n131.out → n130.atom1
n17.out → n130.formula1
n132.out → n130.atom2
n8.out → n130.formula2
n133.out → n130.atom3
n85.out → n130.formula3
n130.out → n31.b
n31.out → n30.a
n11.out → n135.assertion
n136.out → n135.atom1
n17.out → n137.a
n85.out → n137.b
n21.out → n138.a
n137.out → n138.b
n138.out → n135.formula1
n139.out → n135.atom2
n8.out → n135.formula2
n135.out → n30.b
n30.out → n29.a
n24.out → n141.assertion
n142.out → n141.atom1
n8.out → n141.formula1
n143.out → n141.atom2
n21.out → n141.formula2
n144.out → n141.atom3
n137.out → n141.formula3
n141.out → n29.b
n29.out → n1.b
n1.out → n145.proof
```

</details>

### 75 · 矛盾推出否定

- 目标：`⊢ ( ( P → ¬ P ) → ¬ P )`
- 提示：(P→¬P)→¬P
- 参考解：133 个模块 / 225 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n168  [target]
n1  mp
n2  定理 *01
n3  subst(groups=0)
n4  atom P
n5  atom P
n6  not
n7  imp
n8  mp
n9  mp
n10  mp
n11  mp
n12  mp
n13  mp
n14  mp
n16  subst(groups=0)
n17  atom P
n18  axiom A1
n19  subst(groups=1)
n20  atom P
n21  imp
n22  atom Q
n23  mp
n24  mp
n25  mp
n26  mp
n27  定理 *41
n28  subst(groups=0)
n29  atom P
n31  subst(groups=1)
n32  atom P
n33  not
n34  not
n35  imp
n36  atom Q
n37  axiom A2
n38  subst(groups=2)
n39  atom P
n40  atom Q
n41  atom R
n43  subst(groups=1)
n44  atom P
n45  imp
n46  atom Q
n48  subst(groups=2)
n49  atom P
n50  atom Q
n51  atom R
n52  mp
n53  mp
n54  定理 *?
n55  subst(groups=0)
n56  atom Q
n58  subst(groups=1)
n59  atom P
n60  imp
n61  imp
n62  atom Q
n64  subst(groups=2)
n65  atom P
n66  atom Q
n67  atom R
n68  mp
n69  mp
n72  mp
n74  subst(groups=1)
n75  atom P
n76  atom Q
n78  subst(groups=1)
n79  atom Q
n80  atom R
n84  subst(groups=1)
n85  atom P
n86  atom Q
n90  imp
n98  mp
n99  mp
n101  subst(groups=2)
n102  atom P
n103  atom Q
n104  atom R
n106  subst(groups=1)
n107  atom P
n108  imp
n109  imp
n110  imp
n111  atom Q
n113  subst(groups=2)
n114  atom P
n115  atom Q
n116  atom R
n118  subst(groups=2)
n119  atom P
n120  atom Q
n121  atom R
n122  mp
n123  mp
n124  mp
n125  定理 *05
n126  subst(groups=1)
n127  atom P
n128  atom Q
n129  not
n131  subst(groups=2)
n132  atom P
n133  atom Q
n134  atom R
n136  subst(groups=1)
n137  atom P
n138  imp
n139  imp
n140  atom Q
n142  subst(groups=2)
n143  atom P
n144  atom Q
n145  atom R
n146  mp
n147  mp
n149  subst(groups=1)
n150  atom P
n151  atom Q
n153  subst(groups=1)
n154  atom P
n155  imp
n156  imp
n157  atom Q
n159  subst(groups=2)
n160  atom P
n161  atom Q
n162  atom R
n164  subst(groups=2)
n165  atom P
n166  atom Q
n167  atom R

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n6.a
n5.out → n7.a
n6.out → n7.b
n7.out → n3.formula1
n3.out → n1.a
n2.out → n16.assertion
n17.out → n16.atom1
n6.out → n16.formula1
n16.out → n14.a
n18.out → n19.assertion
n20.out → n19.atom1
n6.out → n21.a
n6.out → n21.b
n21.out → n19.formula1
n22.out → n19.atom2
n7.out → n19.formula2
n19.out → n14.b
n14.out → n13.a
n27.out → n28.assertion
n29.out → n28.atom1
n6.out → n28.formula1
n28.out → n26.a
n18.out → n31.assertion
n32.out → n31.atom1
n6.out → n33.a
n33.out → n34.a
n6.out → n35.a
n34.out → n35.b
n35.out → n31.formula1
n36.out → n31.atom2
n6.out → n31.formula2
n31.out → n26.b
n26.out → n25.a
n37.out → n38.assertion
n39.out → n38.atom1
n6.out → n38.formula1
n40.out → n38.atom2
n6.out → n38.formula2
n41.out → n38.atom3
n34.out → n38.formula3
n38.out → n25.b
n25.out → n24.a
n18.out → n43.assertion
n44.out → n43.atom1
n21.out → n45.a
n35.out → n45.b
n45.out → n43.formula1
n46.out → n43.atom2
n7.out → n43.formula2
n43.out → n24.b
n24.out → n23.a
n37.out → n48.assertion
n49.out → n48.atom1
n7.out → n48.formula1
n50.out → n48.atom2
n21.out → n48.formula2
n51.out → n48.atom3
n35.out → n48.formula3
n48.out → n23.b
n23.out → n13.b
n13.out → n12.a
n54.out → n55.assertion
n56.out → n55.atom1
n33.out → n55.formula1
n55.out → n53.a
n18.out → n58.assertion
n59.out → n58.atom1
n33.out → n60.a
n5.out → n60.b
n35.out → n61.a
n60.out → n61.b
n61.out → n58.formula1
n62.out → n58.atom2
n7.out → n58.formula2
n58.out → n53.b
n53.out → n52.a
n37.out → n64.assertion
n65.out → n64.atom1
n7.out → n64.formula1
n66.out → n64.atom2
n35.out → n64.formula2
n67.out → n64.atom3
n60.out → n64.formula3
n64.out → n52.b
n52.out → n12.b
n12.out → n11.a
n16.out → n72.a
n18.out → n74.assertion
n75.out → n74.atom1
n21.out → n74.formula1
n76.out → n74.atom2
n5.out → n74.formula2
n74.out → n72.b
n72.out → n3.a
n37.out → n78.assertion
n79.out → n78.atom1
n6.out → n78.formula1
n80.out → n78.atom2
n6.out → n78.formula2
n78.out → n3.b
n18.out → n84.assertion
n85.out → n84.atom1
n7.out → n84.formula1
n86.out → n84.atom2
n33.out → n84.formula2
n33.out → n90.a
n7.out → n90.b
n84.out → n69.a
n37.out → n101.assertion
n102.out → n101.atom1
n33.out → n101.formula1
n103.out → n101.atom2
n5.out → n101.formula2
n104.out → n101.atom3
n6.out → n101.formula3
n101.out → n99.a
n18.out → n106.assertion
n107.out → n106.atom1
n33.out → n108.a
n6.out → n108.b
n60.out → n109.a
n108.out → n109.b
n90.out → n110.a
n109.out → n110.b
n110.out → n106.formula1
n111.out → n106.atom2
n7.out → n106.formula2
n106.out → n99.b
n99.out → n98.a
n37.out → n113.assertion
n114.out → n113.atom1
n7.out → n113.formula1
n115.out → n113.atom2
n90.out → n113.formula2
n116.out → n113.atom3
n109.out → n113.formula3
n113.out → n98.b
n98.out → n69.b
n69.out → n68.a
n37.out → n118.assertion
n119.out → n118.atom1
n7.out → n118.formula1
n120.out → n118.atom2
n60.out → n118.formula2
n121.out → n118.atom3
n108.out → n118.formula3
n118.out → n68.b
n68.out → n11.b
n11.out → n10.a
n125.out → n126.assertion
n127.out → n126.atom1
n6.out → n126.formula1
n128.out → n126.atom2
n7.out → n129.a
n129.out → n126.formula2
n126.out → n124.a
n37.out → n131.assertion
n132.out → n131.atom1
n33.out → n131.formula1
n133.out → n131.atom2
n6.out → n131.formula2
n134.out → n131.atom3
n129.out → n131.formula3
n131.out → n124.b
n124.out → n123.a
n18.out → n136.assertion
n137.out → n136.atom1
n33.out → n138.a
n129.out → n138.b
n108.out → n139.a
n138.out → n139.b
n139.out → n136.formula1
n140.out → n136.atom2
n7.out → n136.formula2
n136.out → n123.b
n123.out → n122.a
n37.out → n142.assertion
n143.out → n142.atom1
n7.out → n142.formula1
n144.out → n142.atom2
n108.out → n142.formula2
n145.out → n142.atom3
n138.out → n142.formula3
n142.out → n122.b
n122.out → n10.b
n10.out → n9.a
n54.out → n149.assertion
n150.out → n149.atom1
n6.out → n149.formula1
n151.out → n149.atom2
n7.out → n149.formula2
n149.out → n147.a
n18.out → n153.assertion
n154.out → n153.atom1
n7.out → n155.a
n6.out → n155.b
n138.out → n156.a
n155.out → n156.b
n156.out → n153.formula1
n157.out → n153.atom2
n7.out → n153.formula2
n153.out → n147.b
n147.out → n146.a
n37.out → n159.assertion
n160.out → n159.atom1
n7.out → n159.formula1
n161.out → n159.atom2
n138.out → n159.formula2
n162.out → n159.atom3
n155.out → n159.formula3
n159.out → n146.b
n146.out → n9.b
n9.out → n8.a
n37.out → n164.assertion
n165.out → n164.atom1
n7.out → n164.formula1
n166.out → n164.atom2
n7.out → n164.formula2
n167.out → n164.atom3
n6.out → n164.formula3
n164.out → n8.b
n8.out → n1.b
n1.out → n168.proof
```

</details>

### 76 · 皮尔士律

- 目标：`⊢ ( ( ( P → Q ) → P ) → P )`
- 提示：((P→Q)→P)→P
- 参考解：134 个模块 / 225 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n169  [target]
n1  mp
n2  定理 *01
n3  subst(groups=0)
n4  atom P
n5  atom P
n6  atom Q
n7  imp
n8  imp
n9  mp
n10  mp
n11  mp
n12  mp
n13  mp
n14  mp
n15  mp
n16  定理 *52
n17  axiom A1
n18  subst(groups=1)
n19  atom P
n20  not
n21  imp
n22  atom Q
n23  mp
n24  mp
n25  mp
n26  mp
n27  定理 *41
n29  subst(groups=1)
n30  atom P
n31  not
n32  not
n33  imp
n34  atom Q
n35  axiom A2
n36  subst(groups=2)
n37  atom P
n38  atom Q
n39  atom R
n41  subst(groups=1)
n42  atom P
n43  imp
n44  imp
n45  atom Q
n47  subst(groups=2)
n48  atom P
n49  atom Q
n50  atom R
n51  mp
n52  mp
n53  定理 *?
n54  subst(groups=1)
n55  atom P
n56  atom Q
n58  subst(groups=1)
n59  atom P
n60  imp
n61  imp
n62  atom Q
n64  subst(groups=2)
n65  atom P
n66  atom Q
n67  atom R
n68  mp
n69  mp
n72  mp
n75  subst(groups=1)
n76  atom P
n77  imp
n78  atom Q
n80  subst(groups=2)
n81  atom P
n82  atom Q
n83  atom R
n87  subst(groups=1)
n88  atom P
n89  atom Q
n93  imp
n101  mp
n102  mp
n104  subst(groups=2)
n105  atom P
n106  atom Q
n107  atom R
n109  subst(groups=1)
n110  atom P
n111  imp
n112  imp
n113  imp
n114  atom Q
n116  subst(groups=2)
n117  atom P
n118  atom Q
n119  atom R
n121  subst(groups=2)
n122  atom P
n123  atom Q
n124  atom R
n125  mp
n126  mp
n127  mp
n128  定理 *05
n129  subst(groups=0)
n130  atom Q
n131  not
n133  subst(groups=2)
n134  atom P
n135  atom Q
n136  atom R
n138  subst(groups=1)
n139  atom P
n140  imp
n141  imp
n142  atom Q
n144  subst(groups=2)
n145  atom P
n146  atom Q
n147  atom R
n148  mp
n149  mp
n151  subst(groups=0)
n152  atom Q
n154  subst(groups=1)
n155  atom P
n156  imp
n157  imp
n158  atom Q
n160  subst(groups=2)
n161  atom P
n162  atom Q
n163  atom R
n165  subst(groups=2)
n166  atom P
n167  atom Q
n168  atom R

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n7.a
n6.out → n7.b
n7.out → n8.a
n5.out → n8.b
n8.out → n3.formula1
n3.out → n1.a
n16.out → n15.a
n17.out → n18.assertion
n19.out → n18.atom1
n7.out → n20.a
n20.out → n21.a
n5.out → n21.b
n21.out → n18.formula1
n22.out → n18.atom2
n8.out → n18.formula2
n18.out → n15.b
n15.out → n14.a
n27.out → n26.a
n17.out → n29.assertion
n30.out → n29.atom1
n5.out → n31.a
n31.out → n32.a
n5.out → n33.a
n32.out → n33.b
n33.out → n29.formula1
n34.out → n29.atom2
n20.out → n29.formula2
n29.out → n26.b
n26.out → n25.a
n35.out → n36.assertion
n37.out → n36.atom1
n20.out → n36.formula1
n38.out → n36.atom2
n5.out → n36.formula2
n39.out → n36.atom3
n32.out → n36.formula3
n36.out → n25.b
n25.out → n24.a
n17.out → n41.assertion
n42.out → n41.atom1
n20.out → n43.a
n32.out → n43.b
n21.out → n44.a
n43.out → n44.b
n44.out → n41.formula1
n45.out → n41.atom2
n8.out → n41.formula2
n41.out → n24.b
n24.out → n23.a
n35.out → n47.assertion
n48.out → n47.atom1
n8.out → n47.formula1
n49.out → n47.atom2
n21.out → n47.formula2
n50.out → n47.atom3
n43.out → n47.formula3
n47.out → n23.b
n23.out → n14.b
n14.out → n13.a
n53.out → n54.assertion
n55.out → n54.atom1
n7.out → n54.formula1
n56.out → n54.atom2
n31.out → n54.formula2
n54.out → n52.a
n17.out → n58.assertion
n59.out → n58.atom1
n31.out → n60.a
n7.out → n60.b
n43.out → n61.a
n60.out → n61.b
n61.out → n58.formula1
n62.out → n58.atom2
n8.out → n58.formula2
n58.out → n52.b
n52.out → n51.a
n35.out → n64.assertion
n65.out → n64.atom1
n8.out → n64.formula1
n66.out → n64.atom2
n43.out → n64.formula2
n67.out → n64.atom3
n60.out → n64.formula3
n64.out → n51.b
n51.out → n13.b
n13.out → n12.a
n2.out → n72.a
n17.out → n75.assertion
n76.out → n75.atom1
n5.out → n77.a
n5.out → n77.b
n77.out → n75.formula1
n78.out → n75.atom2
n7.out → n75.formula2
n75.out → n72.b
n72.out → n3.a
n35.out → n80.assertion
n81.out → n80.atom1
n7.out → n80.formula1
n82.out → n80.atom2
n5.out → n80.formula2
n83.out → n80.atom3
n5.out → n80.formula3
n80.out → n3.b
n17.out → n87.assertion
n88.out → n87.atom1
n8.out → n87.formula1
n89.out → n87.atom2
n31.out → n87.formula2
n31.out → n93.a
n8.out → n93.b
n87.out → n69.a
n35.out → n104.assertion
n105.out → n104.atom1
n31.out → n104.formula1
n106.out → n104.atom2
n7.out → n104.formula2
n107.out → n104.atom3
n5.out → n104.formula3
n104.out → n102.a
n17.out → n109.assertion
n110.out → n109.atom1
n31.out → n111.a
n5.out → n111.b
n60.out → n112.a
n111.out → n112.b
n93.out → n113.a
n112.out → n113.b
n113.out → n109.formula1
n114.out → n109.atom2
n8.out → n109.formula2
n109.out → n102.b
n102.out → n101.a
n35.out → n116.assertion
n117.out → n116.atom1
n8.out → n116.formula1
n118.out → n116.atom2
n93.out → n116.formula2
n119.out → n116.atom3
n112.out → n116.formula3
n116.out → n101.b
n101.out → n69.b
n69.out → n68.a
n35.out → n121.assertion
n122.out → n121.atom1
n8.out → n121.formula1
n123.out → n121.atom2
n60.out → n121.formula2
n124.out → n121.atom3
n111.out → n121.formula3
n121.out → n68.b
n68.out → n12.b
n12.out → n11.a
n128.out → n129.assertion
n130.out → n129.atom1
n8.out → n131.a
n131.out → n129.formula1
n129.out → n127.a
n35.out → n133.assertion
n134.out → n133.atom1
n31.out → n133.formula1
n135.out → n133.atom2
n5.out → n133.formula2
n136.out → n133.atom3
n131.out → n133.formula3
n133.out → n127.b
n127.out → n126.a
n17.out → n138.assertion
n139.out → n138.atom1
n31.out → n140.a
n131.out → n140.b
n111.out → n141.a
n140.out → n141.b
n141.out → n138.formula1
n142.out → n138.atom2
n8.out → n138.formula2
n138.out → n126.b
n126.out → n125.a
n35.out → n144.assertion
n145.out → n144.atom1
n8.out → n144.formula1
n146.out → n144.atom2
n111.out → n144.formula2
n147.out → n144.atom3
n140.out → n144.formula3
n144.out → n125.b
n125.out → n11.b
n11.out → n10.a
n53.out → n151.assertion
n152.out → n151.atom1
n8.out → n151.formula1
n151.out → n149.a
n17.out → n154.assertion
n155.out → n154.atom1
n8.out → n156.a
n5.out → n156.b
n140.out → n157.a
n156.out → n157.b
n157.out → n154.formula1
n158.out → n154.atom2
n8.out → n154.formula2
n154.out → n149.b
n149.out → n148.a
n35.out → n160.assertion
n161.out → n160.atom1
n8.out → n160.formula1
n162.out → n160.atom2
n140.out → n160.formula2
n163.out → n160.atom3
n156.out → n160.formula3
n160.out → n148.b
n148.out → n10.b
n10.out → n9.a
n35.out → n165.assertion
n166.out → n165.atom1
n8.out → n165.formula1
n167.out → n165.atom2
n8.out → n165.formula2
n168.out → n165.atom3
n5.out → n165.formula3
n165.out → n9.b
n9.out → n1.b
n1.out → n169.proof
```

</details>

### 77 · 反件换位

- 目标：`⊢ ( ( ( P → Q ) → Q ) → ( ( Q → P ) → P ) )`
- 提示：((P→Q)→Q)→(Q→P)→P
- 参考解：36 个模块 / 56 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n39  [target]
n1  mp
n2  定理 *63
n3  subst(groups=1)
n4  atom P
n5  atom P
n6  atom Q
n7  imp
n8  atom R
n9  mp
n10  mp
n11  mp
n12  mp
n13  定理 *76
n14  axiom A1
n15  subst(groups=1)
n16  atom P
n17  imp
n18  imp
n19  atom Q
n20  imp
n21  axiom A2
n22  subst(groups=2)
n23  atom P
n24  atom Q
n25  atom R
n27  subst(groups=1)
n28  atom P
n29  imp
n30  imp
n31  imp
n32  atom Q
n33  imp
n35  subst(groups=2)
n36  atom P
n37  atom Q
n38  atom R

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n7.a
n6.out → n7.b
n7.out → n3.formula1
n8.out → n3.atom2
n5.out → n3.formula2
n3.out → n1.a
n13.out → n12.a
n14.out → n15.assertion
n16.out → n15.atom1
n7.out → n17.a
n5.out → n17.b
n17.out → n18.a
n5.out → n18.b
n18.out → n15.formula1
n19.out → n15.atom2
n6.out → n20.a
n5.out → n20.b
n20.out → n15.formula2
n15.out → n12.b
n12.out → n11.a
n21.out → n22.assertion
n23.out → n22.atom1
n20.out → n22.formula1
n24.out → n22.atom2
n17.out → n22.formula2
n25.out → n22.atom3
n5.out → n22.formula3
n22.out → n11.b
n11.out → n10.a
n14.out → n27.assertion
n28.out → n27.atom1
n20.out → n29.a
n17.out → n29.b
n20.out → n30.a
n5.out → n30.b
n29.out → n31.a
n30.out → n31.b
n31.out → n27.formula1
n32.out → n27.atom2
n7.out → n33.a
n6.out → n33.b
n33.out → n27.formula2
n27.out → n10.b
n10.out → n9.a
n21.out → n35.assertion
n36.out → n35.atom1
n33.out → n35.formula1
n37.out → n35.atom2
n29.out → n35.formula2
n38.out → n35.atom3
n30.out → n35.formula3
n35.out → n9.b
n9.out → n1.b
n1.out → n39.proof
```

</details>

### 78 · 等值引入

- 目标：`⊢ ( ( P → Q ) → ( ( Q → P ) → ( P ↔ Q ) ) )`
- 提示：A→B 与 B→A 一起给出 A↔B。
- 参考解：137 个模块 / 233 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n343  [target]
n1  def-contract
n2  mp
n3  mp
n6  axiom A1
n9  atom P
n15  axiom A2
n22  subst(groups=0)
n23  atom Q
n24  atom Q
n25  not
n26  imp
n27  not
n28  not
n32  imp
n39  mp
n40  mp
n41  mp
n44  mp
n45  mp
n66  subst(groups=1)
n67  atom P
n68  atom Q
n72  imp
n80  mp
n81  mp
n82  axiom A3
n83  subst(groups=1)
n84  atom P
n85  atom Q
n87  subst(groups=1)
n88  atom P
n89  imp
n90  imp
n91  atom Q
n93  subst(groups=2)
n94  atom P
n95  atom Q
n96  atom R
n97  mp
n98  mp
n99  mp
n100  mp
n102  subst(groups=1)
n103  atom P
n104  atom Q
n105  mp
n107  subst(groups=1)
n108  atom P
n109  atom Q
n110  imp
n112  subst(groups=2)
n113  atom P
n114  atom Q
n115  atom R
n116  mp
n117  mp
n121  mp
n122  mp
n143  subst(groups=1)
n144  atom P
n145  atom Q
n146  not
n147  not
n151  imp
n159  mp
n160  mp
n162  subst(groups=1)
n163  atom P
n164  atom Q
n166  subst(groups=1)
n167  atom P
n168  imp
n169  imp
n170  atom Q
n172  subst(groups=2)
n173  atom P
n174  atom Q
n175  atom R
n177  subst(groups=2)
n178  atom P
n179  atom Q
n180  atom R
n184  imp
n192  mp
n193  mp
n195  subst(groups=1)
n196  atom P
n197  atom Q
n199  subst(groups=1)
n200  atom P
n201  imp
n202  imp
n203  atom Q
n205  subst(groups=2)
n206  atom P
n207  atom Q
n208  atom R
n210  subst(groups=2)
n211  atom P
n212  atom Q
n213  atom R
n215  subst(groups=1)
n216  atom P
n217  atom Q
n219  subst(groups=2)
n220  atom P
n221  atom Q
n222  atom R
n309  subst(groups=2)
n310  atom P
n311  atom Q
n312  atom R
n314  subst(groups=1)
n315  atom P
n316  imp
n317  imp
n318  atom Q
n320  subst(groups=1)
n321  atom Q
n322  atom R
n323  mp
n324  mp
n326  subst(groups=0)
n327  atom P
n329  subst(groups=1)
n330  atom P
n331  imp
n332  imp
n333  atom Q
n335  subst(groups=1)
n336  atom Q
n337  atom R
n338  subst(groups=1)
n339  atom P
n340  imp
n341  atom Q
n342  imp

接线：
n6.out → n22.assertion
n23.out → n22.atom1
n24.out → n25.a
n9.out → n26.a
n25.out → n26.b
n26.out → n27.a
n27.out → n28.a
n28.out → n22.formula1
n28.out → n32.a
n9.out → n32.b
n22.out → n3.a
n6.out → n66.assertion
n67.out → n66.atom1
n28.out → n66.formula1
n68.out → n66.atom2
n27.out → n66.formula2
n27.out → n72.a
n28.out → n72.b
n66.out → n45.a
n82.out → n83.assertion
n84.out → n83.atom1
n26.out → n83.formula1
n85.out → n83.atom2
n27.out → n83.formula2
n83.out → n81.a
n6.out → n87.assertion
n88.out → n87.atom1
n27.out → n89.a
n26.out → n89.b
n72.out → n90.a
n89.out → n90.b
n90.out → n87.formula1
n91.out → n87.atom2
n28.out → n87.formula2
n87.out → n81.b
n81.out → n80.a
n15.out → n93.assertion
n94.out → n93.atom1
n28.out → n93.formula1
n95.out → n93.atom2
n72.out → n93.formula2
n96.out → n93.atom3
n89.out → n93.formula3
n93.out → n80.b
n80.out → n45.b
n45.out → n44.a
n6.out → n102.assertion
n103.out → n102.atom1
n89.out → n102.formula1
n104.out → n102.atom2
n89.out → n102.formula2
n102.out → n100.a
n6.out → n107.assertion
n108.out → n107.atom1
n89.out → n107.formula1
n109.out → n107.atom2
n89.out → n110.a
n89.out → n110.b
n110.out → n107.formula2
n107.out → n105.a
n15.out → n112.assertion
n113.out → n112.atom1
n89.out → n112.formula1
n114.out → n112.atom2
n110.out → n112.formula2
n115.out → n112.atom3
n89.out → n112.formula3
n112.out → n105.b
n105.out → n100.b
n100.out → n99.a
n6.out → n143.assertion
n144.out → n143.atom1
n27.out → n143.formula1
n145.out → n143.atom2
n89.out → n146.a
n146.out → n147.a
n147.out → n143.formula2
n147.out → n151.a
n27.out → n151.b
n143.out → n122.a
n82.out → n162.assertion
n163.out → n162.atom1
n146.out → n162.formula1
n164.out → n162.atom2
n26.out → n162.formula2
n162.out → n160.a
n6.out → n166.assertion
n167.out → n166.atom1
n26.out → n168.a
n146.out → n168.b
n151.out → n169.a
n168.out → n169.b
n169.out → n166.formula1
n170.out → n166.atom2
n27.out → n166.formula2
n166.out → n160.b
n160.out → n159.a
n15.out → n172.assertion
n173.out → n172.atom1
n27.out → n172.formula1
n174.out → n172.atom2
n151.out → n172.formula2
n175.out → n172.atom3
n168.out → n172.formula3
n172.out → n159.b
n159.out → n122.b
n122.out → n121.a
n15.out → n177.assertion
n178.out → n177.atom1
n27.out → n177.formula1
n179.out → n177.atom2
n26.out → n177.formula2
n180.out → n177.atom3
n146.out → n177.formula3
n177.out → n121.b
n27.out → n184.a
n146.out → n184.b
n121.out → n117.a
n82.out → n195.assertion
n196.out → n195.atom1
n26.out → n195.formula1
n197.out → n195.atom2
n89.out → n195.formula2
n195.out → n193.a
n6.out → n199.assertion
n200.out → n199.atom1
n89.out → n201.a
n26.out → n201.b
n184.out → n202.a
n201.out → n202.b
n202.out → n199.formula1
n203.out → n199.atom2
n89.out → n199.formula2
n199.out → n193.b
n193.out → n192.a
n15.out → n205.assertion
n206.out → n205.atom1
n89.out → n205.formula1
n207.out → n205.atom2
n184.out → n205.formula2
n208.out → n205.atom3
n201.out → n205.formula3
n205.out → n192.b
n192.out → n117.b
n117.out → n116.a
n15.out → n210.assertion
n211.out → n210.atom1
n89.out → n210.formula1
n212.out → n210.atom2
n89.out → n210.formula2
n213.out → n210.atom3
n26.out → n210.formula3
n210.out → n116.b
n116.out → n99.b
n99.out → n98.a
n6.out → n215.assertion
n216.out → n215.atom1
n201.out → n215.formula1
n217.out → n215.atom2
n28.out → n215.formula2
n215.out → n98.b
n98.out → n97.a
n15.out → n219.assertion
n220.out → n219.atom1
n28.out → n219.formula1
n221.out → n219.atom2
n89.out → n219.formula2
n222.out → n219.atom3
n26.out → n219.formula3
n219.out → n97.b
n97.out → n44.b
n44.out → n41.a
n15.out → n309.assertion
n310.out → n309.atom1
n28.out → n309.formula1
n311.out → n309.atom2
n9.out → n309.formula2
n312.out → n309.atom3
n25.out → n309.formula3
n309.out → n41.b
n41.out → n40.a
n6.out → n314.assertion
n315.out → n314.atom1
n28.out → n316.a
n25.out → n316.b
n32.out → n317.a
n316.out → n317.b
n317.out → n314.formula1
n318.out → n314.atom2
n9.out → n314.formula2
n314.out → n40.b
n40.out → n39.a
n15.out → n320.assertion
n321.out → n320.atom1
n32.out → n320.formula1
n322.out → n320.atom2
n316.out → n320.formula2
n320.out → n39.b
n39.out → n3.b
n3.out → n2.a
n82.out → n326.assertion
n327.out → n326.atom1
n27.out → n326.formula1
n326.out → n324.a
n6.out → n329.assertion
n330.out → n329.atom1
n24.out → n331.a
n27.out → n331.b
n316.out → n332.a
n331.out → n332.b
n332.out → n329.formula1
n333.out → n329.atom2
n9.out → n329.formula2
n329.out → n324.b
n324.out → n323.a
n15.out → n335.assertion
n336.out → n335.atom1
n316.out → n335.formula1
n337.out → n335.atom2
n331.out → n335.formula2
n335.out → n323.b
n323.out → n2.b
n2.out → n338.assertion
n339.out → n338.atom1
n9.out → n340.a
n24.out → n340.b
n340.out → n338.formula1
n341.out → n338.atom2
n24.out → n342.a
n9.out → n342.b
n342.out → n338.formula2
n338.out → n1.assertion
n1.out → n343.proof
```

</details>

### 79 · 前件合并

- 目标：`⊢ ( ( ( P → Q ) → ( P → R ) ) → ( P → ( Q → R ) ) )`
- 提示：((P→Q)→P→R)→P→Q→R
- 参考解：138 个模块 / 235 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n173  [target]
n1  mp
n2  mp
n3  mp
n5  定理 *01
n6  subst(groups=0)
n7  atom P
n8  atom P
n9  atom Q
n10  imp
n11  atom R
n12  imp
n13  imp
n16  axiom A1
n17  subst(groups=0)
n18  atom P
n22  imp
n25  axiom A2
n30  mp
n31  mp
n32  mp
n33  mp
n34  mp
n36  subst(groups=1)
n37  atom P
n38  atom Q
n39  mp
n40  mp
n42  subst(groups=1)
n43  atom P
n44  atom Q
n46  subst(groups=0)
n47  atom P
n48  imp
n49  imp
n51  subst(groups=2)
n52  atom P
n53  atom Q
n54  atom R
n55  mp
n56  mp
n57  mp
n59  subst(groups=2)
n60  atom P
n61  atom Q
n62  atom R
n64  subst(groups=0)
n65  atom P
n66  imp
n67  imp
n69  subst(groups=2)
n70  atom P
n71  atom Q
n72  atom R
n74  subst(groups=2)
n75  atom P
n76  atom Q
n77  atom R
n79  subst(groups=1)
n80  atom P
n81  imp
n82  imp
n83  atom Q
n85  subst(groups=2)
n86  atom P
n87  atom Q
n88  atom R
n89  mp
n90  mp
n92  subst(groups=1)
n93  atom P
n94  atom Q
n96  subst(groups=1)
n97  atom P
n98  imp
n99  imp
n100  atom Q
n102  subst(groups=2)
n103  atom P
n104  atom Q
n105  atom R
n106  mp
n107  mp
n108  mp
n109  mp
n110  定理 *03
n111  subst(groups=0)
n112  atom Q
n114  subst(groups=1)
n115  atom P
n116  imp
n117  imp
n118  atom Q
n119  mp
n120  mp
n121  mp
n122  mp
n123  定理 *04
n124  subst(groups=2)
n125  atom P
n126  atom Q
n127  atom R
n129  subst(groups=1)
n130  atom P
n131  imp
n132  imp
n133  imp
n134  atom Q
n136  subst(groups=1)
n137  atom Q
n138  atom R
n140  subst(groups=1)
n141  atom P
n142  imp
n143  imp
n144  atom Q
n146  subst(groups=2)
n147  atom P
n148  atom Q
n149  atom R
n150  mp
n151  mp
n153  subst(groups=1)
n154  atom Q
n155  atom R
n157  subst(groups=1)
n158  atom P
n159  imp
n160  imp
n161  imp
n162  atom Q
n164  subst(groups=2)
n165  atom P
n166  atom Q
n167  atom R
n169  subst(groups=2)
n170  atom P
n171  atom Q
n172  atom R

接线：
n5.out → n6.assertion
n7.out → n6.atom1
n8.out → n10.a
n9.out → n10.b
n8.out → n12.a
n11.out → n12.b
n10.out → n13.a
n12.out → n13.b
n13.out → n6.formula1
n16.out → n17.assertion
n18.out → n17.atom1
n13.out → n17.formula1
n9.out → n22.a
n13.out → n22.b
n17.out → n3.a
n16.out → n36.assertion
n37.out → n36.atom1
n9.out → n36.formula1
n38.out → n36.atom2
n8.out → n36.formula2
n36.out → n34.a
n16.out → n42.assertion
n43.out → n42.atom1
n10.out → n42.formula1
n44.out → n42.atom2
n13.out → n42.formula2
n42.out → n40.a
n16.out → n46.assertion
n47.out → n46.atom1
n13.out → n48.a
n10.out → n48.b
n10.out → n49.a
n48.out → n49.b
n49.out → n46.formula1
n46.out → n40.b
n40.out → n39.a
n25.out → n51.assertion
n52.out → n51.atom1
n9.out → n51.formula1
n53.out → n51.atom2
n10.out → n51.formula2
n54.out → n51.atom3
n48.out → n51.formula3
n51.out → n39.b
n39.out → n34.b
n34.out → n33.a
n6.out → n57.a
n25.out → n59.assertion
n60.out → n59.atom1
n13.out → n59.formula1
n61.out → n59.atom2
n10.out → n59.formula2
n62.out → n59.atom3
n12.out → n59.formula3
n59.out → n57.b
n57.out → n56.a
n16.out → n64.assertion
n65.out → n64.atom1
n13.out → n66.a
n12.out → n66.b
n48.out → n67.a
n66.out → n67.b
n67.out → n64.formula1
n64.out → n56.b
n56.out → n55.a
n25.out → n69.assertion
n70.out → n69.atom1
n9.out → n69.formula1
n71.out → n69.atom2
n48.out → n69.formula2
n72.out → n69.atom3
n66.out → n69.formula3
n69.out → n55.b
n55.out → n33.b
n33.out → n32.a
n25.out → n74.assertion
n75.out → n74.atom1
n9.out → n74.formula1
n76.out → n74.atom2
n13.out → n74.formula2
n77.out → n74.atom3
n12.out → n74.formula3
n74.out → n32.b
n32.out → n31.a
n16.out → n79.assertion
n80.out → n79.atom1
n9.out → n81.a
n12.out → n81.b
n22.out → n82.a
n81.out → n82.b
n82.out → n79.formula1
n83.out → n79.atom2
n13.out → n79.formula2
n79.out → n31.b
n31.out → n30.a
n25.out → n85.assertion
n86.out → n85.atom1
n13.out → n85.formula1
n87.out → n85.atom2
n22.out → n85.formula2
n88.out → n85.atom3
n81.out → n85.formula3
n85.out → n30.b
n30.out → n3.b
n3.out → n2.a
n16.out → n92.assertion
n93.out → n92.atom1
n81.out → n92.formula1
n94.out → n92.atom2
n8.out → n92.formula2
n92.out → n90.a
n16.out → n96.assertion
n97.out → n96.atom1
n8.out → n98.a
n81.out → n98.b
n81.out → n99.a
n98.out → n99.b
n99.out → n96.formula1
n100.out → n96.atom2
n13.out → n96.formula2
n96.out → n90.b
n90.out → n89.a
n25.out → n102.assertion
n103.out → n102.atom1
n13.out → n102.formula1
n104.out → n102.atom2
n81.out → n102.formula2
n105.out → n102.atom3
n98.out → n102.formula3
n102.out → n89.b
n89.out → n2.b
n2.out → n1.a
n110.out → n111.assertion
n112.out → n111.atom1
n11.out → n111.formula1
n111.out → n109.a
n16.out → n114.assertion
n115.out → n114.atom1
n12.out → n116.a
n11.out → n116.b
n8.out → n117.a
n116.out → n117.b
n117.out → n114.formula1
n118.out → n114.atom2
n13.out → n114.formula2
n114.out → n109.b
n109.out → n108.a
n123.out → n124.assertion
n125.out → n124.atom1
n12.out → n124.formula1
n126.out → n124.atom2
n11.out → n124.formula2
n127.out → n124.atom3
n9.out → n124.formula3
n124.out → n122.a
n16.out → n129.assertion
n130.out → n129.atom1
n9.out → n131.a
n11.out → n131.b
n81.out → n132.a
n131.out → n132.b
n116.out → n133.a
n132.out → n133.b
n133.out → n129.formula1
n134.out → n129.atom2
n8.out → n129.formula2
n129.out → n122.b
n122.out → n121.a
n25.out → n136.assertion
n137.out → n136.atom1
n116.out → n136.formula1
n138.out → n136.atom2
n132.out → n136.formula2
n136.out → n121.b
n121.out → n120.a
n16.out → n140.assertion
n141.out → n140.atom1
n8.out → n142.a
n132.out → n142.b
n117.out → n143.a
n142.out → n143.b
n143.out → n140.formula1
n144.out → n140.atom2
n13.out → n140.formula2
n140.out → n120.b
n120.out → n119.a
n25.out → n146.assertion
n147.out → n146.atom1
n13.out → n146.formula1
n148.out → n146.atom2
n117.out → n146.formula2
n149.out → n146.atom3
n142.out → n146.formula3
n146.out → n119.b
n119.out → n108.b
n108.out → n107.a
n25.out → n153.assertion
n154.out → n153.atom1
n81.out → n153.formula1
n155.out → n153.atom2
n131.out → n153.formula2
n153.out → n151.a
n16.out → n157.assertion
n158.out → n157.atom1
n8.out → n159.a
n131.out → n159.b
n98.out → n160.a
n159.out → n160.b
n142.out → n161.a
n160.out → n161.b
n161.out → n157.formula1
n162.out → n157.atom2
n13.out → n157.formula2
n157.out → n151.b
n151.out → n150.a
n25.out → n164.assertion
n165.out → n164.atom1
n13.out → n164.formula1
n166.out → n164.atom2
n142.out → n164.formula2
n167.out → n164.atom3
n160.out → n164.formula3
n164.out → n150.b
n150.out → n107.b
n107.out → n106.a
n25.out → n169.assertion
n170.out → n169.atom1
n13.out → n169.formula1
n171.out → n169.atom2
n98.out → n169.formula2
n172.out → n169.atom3
n159.out → n169.formula3
n169.out → n106.b
n106.out → n1.b
n1.out → n173.proof
```

</details>

### 80 · 否定蕴涵取后件

- 目标：`⊢ ( ¬ ( P → Q ) → ¬ Q )`
- 提示：¬(P→Q)→¬Q
- 参考解：152 个模块 / 256 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n229  [target]
n1  mp
n2  定理 *01
n3  subst(groups=0)
n4  atom P
n5  atom P
n6  atom Q
n7  imp
n8  not
n9  mp
n10  mp
n11  mp
n15  axiom A1
n16  subst(groups=1)
n17  atom P
n18  atom Q
n19  not
n20  not
n24  imp
n27  axiom A2
n32  mp
n33  mp
n34  mp
n35  mp
n36  mp
n37  定理 *35
n38  subst(groups=0)
n39  atom P
n40  mp
n41  mp
n43  subst(groups=1)
n44  atom P
n45  atom Q
n47  subst(groups=1)
n48  atom P
n49  imp
n50  imp
n51  atom Q
n53  subst(groups=1)
n54  atom P
n55  atom R
n56  mp
n57  mp
n58  mp
n59  mp
n60  mp
n62  subst(groups=1)
n63  atom P
n64  atom Q
n65  mp
n66  mp
n67  mp
n75  subst(groups=1)
n76  atom P
n77  atom Q
n78  not
n79  not
n83  imp
n89  mp
n90  mp
n91  mp
n93  mp
n95  subst(groups=0)
n96  atom P
n97  mp
n98  mp
n100  subst(groups=0)
n101  atom P
n103  subst(groups=1)
n104  atom P
n105  imp
n106  imp
n107  atom Q
n109  subst(groups=2)
n110  atom P
n111  atom Q
n112  atom R
n137  subst(groups=1)
n138  atom P
n139  atom R
n141  subst(groups=0)
n142  atom P
n143  imp
n144  imp
n146  subst(groups=2)
n147  atom P
n148  atom Q
n149  atom R
n150  mp
n151  mp
n152  定理 *?
n153  subst(groups=1)
n154  atom P
n155  atom Q
n157  subst(groups=0)
n158  atom P
n159  imp
n160  imp
n162  subst(groups=2)
n163  atom P
n164  atom Q
n165  atom R
n167  subst(groups=2)
n168  atom P
n169  atom Q
n170  atom R
n172  subst(groups=1)
n173  atom P
n174  imp
n175  atom Q
n177  subst(groups=1)
n178  atom P
n179  atom R
n181  subst(groups=1)
n182  atom P
n183  imp
n184  imp
n185  atom Q
n187  subst(groups=2)
n188  atom P
n189  atom Q
n190  atom R
n192  subst(groups=2)
n193  atom P
n194  atom Q
n195  atom R
n197  subst(groups=1)
n198  atom P
n199  imp
n200  imp
n201  atom Q
n203  subst(groups=2)
n204  atom P
n205  atom Q
n206  atom R
n207  mp
n208  mp
n210  subst(groups=1)
n211  atom P
n212  atom Q
n214  subst(groups=1)
n215  atom P
n216  imp
n217  imp
n218  atom Q
n220  subst(groups=2)
n221  atom P
n222  atom Q
n223  atom R
n225  subst(groups=2)
n226  atom P
n227  atom Q
n228  atom R

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n7.a
n6.out → n7.b
n7.out → n8.a
n8.out → n3.formula1
n3.out → n1.a
n15.out → n16.assertion
n17.out → n16.atom1
n8.out → n16.formula1
n18.out → n16.atom2
n6.out → n19.a
n19.out → n20.a
n20.out → n16.formula2
n20.out → n24.a
n8.out → n24.b
n16.out → n11.a
n37.out → n38.assertion
n39.out → n38.atom1
n6.out → n38.formula1
n38.out → n36.a
n15.out → n43.assertion
n44.out → n43.atom1
n6.out → n43.formula1
n45.out → n43.atom2
n8.out → n43.formula2
n43.out → n41.a
n15.out → n47.assertion
n48.out → n47.atom1
n8.out → n49.a
n6.out → n49.b
n6.out → n50.a
n49.out → n50.b
n50.out → n47.formula1
n51.out → n47.atom2
n20.out → n47.formula2
n47.out → n41.b
n41.out → n40.a
n27.out → n53.assertion
n54.out → n53.atom1
n20.out → n53.formula1
n55.out → n53.atom2
n49.out → n53.formula2
n53.out → n40.b
n40.out → n36.b
n36.out → n35.a
n15.out → n62.assertion
n63.out → n62.atom1
n6.out → n62.formula1
n64.out → n62.atom2
n5.out → n62.formula2
n62.out → n60.a
n15.out → n75.assertion
n76.out → n75.atom1
n6.out → n75.formula1
n77.out → n75.atom2
n8.out → n78.a
n78.out → n79.a
n79.out → n75.formula2
n79.out → n83.a
n6.out → n83.b
n75.out → n67.a
n37.out → n95.assertion
n96.out → n95.atom1
n8.out → n95.formula1
n95.out → n93.a
n15.out → n100.assertion
n101.out → n100.atom1
n8.out → n100.formula1
n100.out → n98.a
n15.out → n103.assertion
n104.out → n103.atom1
n6.out → n105.a
n8.out → n105.b
n8.out → n106.a
n105.out → n106.b
n106.out → n103.formula1
n107.out → n103.atom2
n79.out → n103.formula2
n103.out → n98.b
n98.out → n97.a
n27.out → n109.assertion
n110.out → n109.atom1
n79.out → n109.formula1
n111.out → n109.atom2
n8.out → n109.formula2
n112.out → n109.atom3
n105.out → n109.formula3
n109.out → n97.b
n97.out → n93.b
n93.out → n91.a
n27.out → n137.assertion
n138.out → n137.atom1
n79.out → n137.formula1
n139.out → n137.atom2
n8.out → n137.formula2
n137.out → n91.b
n91.out → n90.a
n15.out → n141.assertion
n142.out → n141.atom1
n79.out → n143.a
n8.out → n143.b
n83.out → n144.a
n143.out → n144.b
n144.out → n141.formula1
n141.out → n90.b
n90.out → n89.a
n27.out → n146.assertion
n147.out → n146.atom1
n6.out → n146.formula1
n148.out → n146.atom2
n83.out → n146.formula2
n149.out → n146.atom3
n143.out → n146.formula3
n146.out → n89.b
n89.out → n67.b
n67.out → n66.a
n152.out → n153.assertion
n154.out → n153.atom1
n78.out → n153.formula1
n155.out → n153.atom2
n7.out → n153.formula2
n153.out → n151.a
n15.out → n157.assertion
n158.out → n157.atom1
n7.out → n159.a
n78.out → n159.b
n143.out → n160.a
n159.out → n160.b
n160.out → n157.formula1
n157.out → n151.b
n151.out → n150.a
n27.out → n162.assertion
n163.out → n162.atom1
n6.out → n162.formula1
n164.out → n162.atom2
n143.out → n162.formula2
n165.out → n162.atom3
n159.out → n162.formula3
n162.out → n150.b
n150.out → n66.b
n66.out → n65.a
n27.out → n167.assertion
n168.out → n167.atom1
n6.out → n167.formula1
n169.out → n167.atom2
n7.out → n167.formula2
n170.out → n167.atom3
n78.out → n167.formula3
n167.out → n65.b
n65.out → n60.b
n60.out → n59.a
n15.out → n172.assertion
n173.out → n172.atom1
n6.out → n174.a
n78.out → n174.b
n174.out → n172.formula1
n175.out → n172.atom2
n8.out → n172.formula2
n172.out → n59.b
n59.out → n58.a
n27.out → n177.assertion
n178.out → n177.atom1
n8.out → n177.formula1
n179.out → n177.atom2
n78.out → n177.formula2
n177.out → n58.b
n58.out → n57.a
n15.out → n181.assertion
n182.out → n181.atom1
n8.out → n183.a
n78.out → n183.b
n49.out → n184.a
n183.out → n184.b
n184.out → n181.formula1
n185.out → n181.atom2
n20.out → n181.formula2
n181.out → n57.b
n57.out → n56.a
n27.out → n187.assertion
n188.out → n187.atom1
n20.out → n187.formula1
n189.out → n187.atom2
n49.out → n187.formula2
n190.out → n187.atom3
n183.out → n187.formula3
n187.out → n56.b
n56.out → n35.b
n35.out → n34.a
n27.out → n192.assertion
n193.out → n192.atom1
n20.out → n192.formula1
n194.out → n192.atom2
n8.out → n192.formula2
n195.out → n192.atom3
n78.out → n192.formula3
n192.out → n34.b
n34.out → n33.a
n15.out → n197.assertion
n198.out → n197.atom1
n20.out → n199.a
n78.out → n199.b
n24.out → n200.a
n199.out → n200.b
n200.out → n197.formula1
n201.out → n197.atom2
n8.out → n197.formula2
n197.out → n33.b
n33.out → n32.a
n27.out → n203.assertion
n204.out → n203.atom1
n8.out → n203.formula1
n205.out → n203.atom2
n24.out → n203.formula2
n206.out → n203.atom3
n199.out → n203.formula3
n203.out → n32.b
n32.out → n11.b
n11.out → n10.a
n152.out → n210.assertion
n211.out → n210.atom1
n19.out → n210.formula1
n212.out → n210.atom2
n8.out → n210.formula2
n210.out → n208.a
n15.out → n214.assertion
n215.out → n214.atom1
n8.out → n216.a
n19.out → n216.b
n199.out → n217.a
n216.out → n217.b
n217.out → n214.formula1
n218.out → n214.atom2
n8.out → n214.formula2
n214.out → n208.b
n208.out → n207.a
n27.out → n220.assertion
n221.out → n220.atom1
n8.out → n220.formula1
n222.out → n220.atom2
n199.out → n220.formula2
n223.out → n220.atom3
n216.out → n220.formula3
n220.out → n207.b
n207.out → n10.b
n10.out → n9.a
n27.out → n225.assertion
n226.out → n225.atom1
n8.out → n225.formula1
n227.out → n225.atom2
n8.out → n225.formula2
n228.out → n225.atom3
n19.out → n225.formula3
n225.out → n9.b
n9.out → n1.b
n1.out → n229.proof
```

</details>

### 81 · 否定蕴涵取后件二

- 目标：`⊢ ( ¬ ( P → Q ) → ( R → ¬ Q ) )`
- 提示：¬(P→Q)→R→¬Q
- 参考解：24 个模块 / 32 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n26  [target]
n1  mp
n2  定理 *80
n3  mp
n4  mp
n5  axiom A1
n6  subst(groups=1)
n7  atom P
n8  atom Q
n9  not
n10  atom Q
n11  atom R
n13  subst(groups=1)
n14  atom P
n15  imp
n16  imp
n17  atom Q
n18  atom P
n19  imp
n20  not
n21  axiom A2
n22  subst(groups=2)
n23  atom P
n24  atom Q
n25  atom R

接线：
n2.out → n1.a
n5.out → n6.assertion
n7.out → n6.atom1
n8.out → n9.a
n9.out → n6.formula1
n10.out → n6.atom2
n11.out → n6.formula2
n6.out → n4.a
n5.out → n13.assertion
n14.out → n13.atom1
n11.out → n15.a
n9.out → n15.b
n9.out → n16.a
n15.out → n16.b
n16.out → n13.formula1
n17.out → n13.atom2
n18.out → n19.a
n8.out → n19.b
n19.out → n20.a
n20.out → n13.formula2
n13.out → n4.b
n4.out → n3.a
n21.out → n22.assertion
n23.out → n22.atom1
n20.out → n22.formula1
n24.out → n22.atom2
n9.out → n22.formula2
n25.out → n22.atom3
n15.out → n22.formula3
n22.out → n3.b
n3.out → n1.b
n1.out → n26.proof
```

</details>

### 82 · 否定蕴涵后件三

- 目标：`⊢ ( ¬ ( P → Q ) → ( Q → R ) )`
- 提示：¬(P→Q)→Q→R
- 参考解：40 个模块 / 58 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n44  [target]
n1  mp
n2  mp
n3  定理 *80
n4  mp
n5  mp
n6  axiom A1
n7  subst(groups=1)
n8  atom P
n9  atom Q
n10  not
n11  atom Q
n12  atom R
n13  not
n15  subst(groups=1)
n16  atom P
n17  imp
n18  imp
n19  atom Q
n20  atom P
n21  imp
n22  not
n23  axiom A2
n24  subst(groups=2)
n25  atom P
n26  atom Q
n27  atom R
n28  mp
n29  mp
n30  定理 *?
n31  subst(groups=0)
n32  atom P
n34  subst(groups=1)
n35  atom P
n36  imp
n37  imp
n38  atom Q
n40  subst(groups=2)
n41  atom P
n42  atom Q
n43  atom R

接线：
n3.out → n2.a
n6.out → n7.assertion
n8.out → n7.atom1
n9.out → n10.a
n10.out → n7.formula1
n11.out → n7.atom2
n12.out → n13.a
n13.out → n7.formula2
n7.out → n5.a
n6.out → n15.assertion
n16.out → n15.atom1
n13.out → n17.a
n10.out → n17.b
n10.out → n18.a
n17.out → n18.b
n18.out → n15.formula1
n19.out → n15.atom2
n20.out → n21.a
n9.out → n21.b
n21.out → n22.a
n22.out → n15.formula2
n15.out → n5.b
n5.out → n4.a
n23.out → n24.assertion
n25.out → n24.atom1
n22.out → n24.formula1
n26.out → n24.atom2
n10.out → n24.formula2
n27.out → n24.atom3
n17.out → n24.formula3
n24.out → n4.b
n4.out → n2.b
n2.out → n1.a
n30.out → n31.assertion
n32.out → n31.atom1
n12.out → n31.formula1
n31.out → n29.a
n6.out → n34.assertion
n35.out → n34.atom1
n9.out → n36.a
n12.out → n36.b
n17.out → n37.a
n36.out → n37.b
n37.out → n34.formula1
n38.out → n34.atom2
n22.out → n34.formula2
n34.out → n29.b
n29.out → n28.a
n23.out → n40.assertion
n41.out → n40.atom1
n22.out → n40.formula1
n42.out → n40.atom2
n17.out → n40.formula2
n43.out → n40.atom3
n36.out → n40.formula3
n40.out → n28.b
n28.out → n1.b
n1.out → n44.proof
```

</details>

### 83 · 等值消去右

- 目标：`⊢ ( ( P ↔ Q ) → ( Q → P ) )`
- 提示：A↔B 给出 B→A。
- 参考解：170 个模块 / 292 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n931  [target]
n1  def-contract
n2  mp
n3  mp
n7  axiom A1
n10  atom Q
n11  not
n19  axiom A2
n27  subst(groups=1)
n28  atom P
n29  atom Q
n30  atom P
n34  imp
n121  axiom A3
n253  imp
n621  mp
n622  mp
n623  mp
n628  subst(groups=1)
n629  atom P
n630  atom Q
n631  not
n632  not
n633  not
n637  imp
n645  mp
n646  mp
n647  mp
n649  mp
n650  mp
n651  mp
n672  subst(groups=1)
n673  atom P
n674  atom Q
n678  imp
n686  mp
n687  mp
n689  subst(groups=1)
n690  atom P
n691  atom Q
n693  subst(groups=1)
n694  atom P
n695  imp
n696  imp
n697  atom Q
n699  subst(groups=2)
n700  atom P
n701  atom Q
n702  atom R
n703  mp
n704  mp
n705  mp
n706  mp
n708  subst(groups=1)
n709  atom P
n710  atom Q
n711  mp
n713  subst(groups=1)
n714  atom P
n715  atom Q
n716  imp
n718  subst(groups=2)
n719  atom P
n720  atom Q
n721  atom R
n722  mp
n723  mp
n727  mp
n728  mp
n749  subst(groups=1)
n750  atom P
n751  atom Q
n752  not
n753  not
n757  imp
n765  mp
n766  mp
n768  subst(groups=1)
n769  atom P
n770  atom Q
n772  subst(groups=1)
n773  atom P
n774  imp
n775  imp
n776  atom Q
n778  subst(groups=2)
n779  atom P
n780  atom Q
n781  atom R
n783  subst(groups=2)
n784  atom P
n785  atom Q
n786  atom R
n790  imp
n798  mp
n799  mp
n801  subst(groups=1)
n802  atom P
n803  atom Q
n805  subst(groups=1)
n806  atom P
n807  imp
n808  imp
n809  atom Q
n811  subst(groups=2)
n812  atom P
n813  atom Q
n814  atom R
n816  subst(groups=2)
n817  atom P
n818  atom Q
n819  atom R
n821  subst(groups=1)
n822  atom P
n823  atom Q
n825  subst(groups=2)
n826  atom P
n827  atom Q
n828  atom R
n829  mp
n830  mp
n832  subst(groups=1)
n833  atom P
n834  atom Q
n836  subst(groups=1)
n837  atom P
n838  imp
n839  imp
n840  atom Q
n842  subst(groups=2)
n843  atom P
n844  atom Q
n845  atom R
n886  subst(groups=2)
n887  atom P
n888  atom Q
n889  atom R
n891  subst(groups=1)
n892  atom P
n893  imp
n894  imp
n895  atom Q
n897  subst(groups=2)
n898  atom P
n899  atom Q
n900  atom R
n901  mp
n902  mp
n904  subst(groups=1)
n905  atom P
n906  atom Q
n908  subst(groups=1)
n909  atom P
n910  imp
n911  imp
n912  atom Q
n914  subst(groups=2)
n915  atom P
n916  atom Q
n917  atom R
n919  subst(groups=2)
n920  atom P
n921  atom Q
n922  atom R
n924  subst(groups=1)
n925  atom P
n926  atom Q
n927  subst(groups=1)
n928  atom P
n929  atom Q
n930  imp

接线：
n10.out → n11.a
n7.out → n27.assertion
n28.out → n27.atom1
n11.out → n27.formula1
n29.out → n27.atom2
n30.out → n27.formula2
n30.out → n34.a
n11.out → n34.b
n30.out → n253.a
n10.out → n253.b
n27.out → n3.a
n7.out → n628.assertion
n629.out → n628.atom1
n11.out → n628.formula1
n630.out → n628.atom2
n34.out → n631.a
n631.out → n632.a
n632.out → n633.a
n633.out → n628.formula2
n633.out → n637.a
n11.out → n637.b
n628.out → n623.a
n7.out → n672.assertion
n673.out → n672.atom1
n633.out → n672.formula1
n674.out → n672.atom2
n632.out → n672.formula2
n632.out → n678.a
n633.out → n678.b
n672.out → n651.a
n121.out → n689.assertion
n690.out → n689.atom1
n631.out → n689.formula1
n691.out → n689.atom2
n632.out → n689.formula2
n689.out → n687.a
n7.out → n693.assertion
n694.out → n693.atom1
n632.out → n695.a
n631.out → n695.b
n678.out → n696.a
n695.out → n696.b
n696.out → n693.formula1
n697.out → n693.atom2
n633.out → n693.formula2
n693.out → n687.b
n687.out → n686.a
n19.out → n699.assertion
n700.out → n699.atom1
n633.out → n699.formula1
n701.out → n699.atom2
n678.out → n699.formula2
n702.out → n699.atom3
n695.out → n699.formula3
n699.out → n686.b
n686.out → n651.b
n651.out → n650.a
n7.out → n708.assertion
n709.out → n708.atom1
n695.out → n708.formula1
n710.out → n708.atom2
n695.out → n708.formula2
n708.out → n706.a
n7.out → n713.assertion
n714.out → n713.atom1
n695.out → n713.formula1
n715.out → n713.atom2
n695.out → n716.a
n695.out → n716.b
n716.out → n713.formula2
n713.out → n711.a
n19.out → n718.assertion
n719.out → n718.atom1
n695.out → n718.formula1
n720.out → n718.atom2
n716.out → n718.formula2
n721.out → n718.atom3
n695.out → n718.formula3
n718.out → n711.b
n711.out → n706.b
n706.out → n705.a
n7.out → n749.assertion
n750.out → n749.atom1
n632.out → n749.formula1
n751.out → n749.atom2
n695.out → n752.a
n752.out → n753.a
n753.out → n749.formula2
n753.out → n757.a
n632.out → n757.b
n749.out → n728.a
n121.out → n768.assertion
n769.out → n768.atom1
n752.out → n768.formula1
n770.out → n768.atom2
n631.out → n768.formula2
n768.out → n766.a
n7.out → n772.assertion
n773.out → n772.atom1
n631.out → n774.a
n752.out → n774.b
n757.out → n775.a
n774.out → n775.b
n775.out → n772.formula1
n776.out → n772.atom2
n632.out → n772.formula2
n772.out → n766.b
n766.out → n765.a
n19.out → n778.assertion
n779.out → n778.atom1
n632.out → n778.formula1
n780.out → n778.atom2
n757.out → n778.formula2
n781.out → n778.atom3
n774.out → n778.formula3
n778.out → n765.b
n765.out → n728.b
n728.out → n727.a
n19.out → n783.assertion
n784.out → n783.atom1
n632.out → n783.formula1
n785.out → n783.atom2
n631.out → n783.formula2
n786.out → n783.atom3
n752.out → n783.formula3
n783.out → n727.b
n632.out → n790.a
n752.out → n790.b
n727.out → n723.a
n121.out → n801.assertion
n802.out → n801.atom1
n631.out → n801.formula1
n803.out → n801.atom2
n695.out → n801.formula2
n801.out → n799.a
n7.out → n805.assertion
n806.out → n805.atom1
n695.out → n807.a
n631.out → n807.b
n790.out → n808.a
n807.out → n808.b
n808.out → n805.formula1
n809.out → n805.atom2
n695.out → n805.formula2
n805.out → n799.b
n799.out → n798.a
n19.out → n811.assertion
n812.out → n811.atom1
n695.out → n811.formula1
n813.out → n811.atom2
n790.out → n811.formula2
n814.out → n811.atom3
n807.out → n811.formula3
n811.out → n798.b
n798.out → n723.b
n723.out → n722.a
n19.out → n816.assertion
n817.out → n816.atom1
n695.out → n816.formula1
n818.out → n816.atom2
n695.out → n816.formula2
n819.out → n816.atom3
n631.out → n816.formula3
n816.out → n722.b
n722.out → n705.b
n705.out → n704.a
n7.out → n821.assertion
n822.out → n821.atom1
n807.out → n821.formula1
n823.out → n821.atom2
n633.out → n821.formula2
n821.out → n704.b
n704.out → n703.a
n19.out → n825.assertion
n826.out → n825.atom1
n633.out → n825.formula1
n827.out → n825.atom2
n695.out → n825.formula2
n828.out → n825.atom3
n631.out → n825.formula3
n825.out → n703.b
n703.out → n650.b
n650.out → n649.a
n7.out → n832.assertion
n833.out → n832.atom1
n631.out → n832.formula1
n834.out → n832.atom2
n11.out → n832.formula2
n832.out → n830.a
n7.out → n836.assertion
n837.out → n836.atom1
n11.out → n838.a
n631.out → n838.b
n631.out → n839.a
n838.out → n839.b
n839.out → n836.formula1
n840.out → n836.atom2
n633.out → n836.formula2
n836.out → n830.b
n830.out → n829.a
n19.out → n842.assertion
n843.out → n842.atom1
n633.out → n842.formula1
n844.out → n842.atom2
n631.out → n842.formula2
n845.out → n842.atom3
n838.out → n842.formula3
n842.out → n829.b
n829.out → n649.b
n649.out → n647.a
n19.out → n886.assertion
n887.out → n886.atom1
n633.out → n886.formula1
n888.out → n886.atom2
n11.out → n886.formula2
n889.out → n886.atom3
n631.out → n886.formula3
n886.out → n647.b
n647.out → n646.a
n7.out → n891.assertion
n892.out → n891.atom1
n633.out → n893.a
n631.out → n893.b
n637.out → n894.a
n893.out → n894.b
n894.out → n891.formula1
n895.out → n891.atom2
n11.out → n891.formula2
n891.out → n646.b
n646.out → n645.a
n19.out → n897.assertion
n898.out → n897.atom1
n11.out → n897.formula1
n899.out → n897.atom2
n637.out → n897.formula2
n900.out → n897.atom3
n893.out → n897.formula3
n897.out → n645.b
n645.out → n623.b
n623.out → n622.a
n121.out → n904.assertion
n905.out → n904.atom1
n632.out → n904.formula1
n906.out → n904.atom2
n34.out → n904.formula2
n904.out → n902.a
n7.out → n908.assertion
n909.out → n908.atom1
n34.out → n910.a
n632.out → n910.b
n893.out → n911.a
n910.out → n911.b
n911.out → n908.formula1
n912.out → n908.atom2
n11.out → n908.formula2
n908.out → n902.b
n902.out → n901.a
n19.out → n914.assertion
n915.out → n914.atom1
n11.out → n914.formula1
n916.out → n914.atom2
n893.out → n914.formula2
n917.out → n914.atom3
n910.out → n914.formula3
n914.out → n901.b
n901.out → n622.b
n622.out → n621.a
n19.out → n919.assertion
n920.out → n919.atom1
n11.out → n919.formula1
n921.out → n919.atom2
n34.out → n919.formula2
n922.out → n919.atom3
n632.out → n919.formula3
n919.out → n621.b
n621.out → n3.b
n3.out → n2.a
n121.out → n924.assertion
n925.out → n924.atom1
n10.out → n924.formula1
n926.out → n924.atom2
n631.out → n924.formula2
n924.out → n2.b
n2.out → n927.assertion
n928.out → n927.atom1
n253.out → n927.formula1
n929.out → n927.atom2
n10.out → n930.a
n30.out → n930.b
n930.out → n927.formula2
n927.out → n1.assertion
n1.out → n931.proof
```

</details>

### 84 · 合取消去左

- 目标：`⊢ ( ( P ∧ Q ) → P )`
- 提示：P∧Q 给出 P。
- 参考解：182 个模块 / 312 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n367  [target]
n1  def-contract
n2  mp
n3  mp
n4  mp
n7  axiom A1
n10  atom P
n11  not
n19  axiom A2
n27  subst(groups=1)
n28  atom P
n29  atom Q
n30  atom Q
n31  not
n35  imp
n43  mp
n44  mp
n45  axiom A3
n46  subst(groups=1)
n47  atom P
n48  atom Q
n50  subst(groups=1)
n51  atom P
n52  imp
n53  imp
n54  atom Q
n56  subst(groups=2)
n57  atom P
n58  atom Q
n59  atom R
n60  mp
n61  mp
n62  mp
n67  subst(groups=1)
n68  atom P
n69  atom Q
n70  not
n71  not
n72  not
n76  imp
n84  mp
n85  mp
n86  mp
n88  mp
n89  mp
n90  mp
n111  subst(groups=1)
n112  atom P
n113  atom Q
n117  imp
n125  mp
n126  mp
n128  subst(groups=1)
n129  atom P
n130  atom Q
n132  subst(groups=1)
n133  atom P
n134  imp
n135  imp
n136  atom Q
n138  subst(groups=2)
n139  atom P
n140  atom Q
n141  atom R
n142  mp
n143  mp
n144  mp
n145  mp
n147  subst(groups=1)
n148  atom P
n149  atom Q
n150  mp
n152  subst(groups=1)
n153  atom P
n154  atom Q
n155  imp
n157  subst(groups=2)
n158  atom P
n159  atom Q
n160  atom R
n161  mp
n162  mp
n166  mp
n167  mp
n188  subst(groups=1)
n189  atom P
n190  atom Q
n191  not
n192  not
n196  imp
n204  mp
n205  mp
n207  subst(groups=1)
n208  atom P
n209  atom Q
n211  subst(groups=1)
n212  atom P
n213  imp
n214  imp
n215  atom Q
n217  subst(groups=2)
n218  atom P
n219  atom Q
n220  atom R
n222  subst(groups=2)
n223  atom P
n224  atom Q
n225  atom R
n229  imp
n237  mp
n238  mp
n240  subst(groups=1)
n241  atom P
n242  atom Q
n244  subst(groups=1)
n245  atom P
n246  imp
n247  imp
n248  atom Q
n250  subst(groups=2)
n251  atom P
n252  atom Q
n253  atom R
n255  subst(groups=2)
n256  atom P
n257  atom Q
n258  atom R
n260  subst(groups=1)
n261  atom P
n262  atom Q
n264  subst(groups=2)
n265  atom P
n266  atom Q
n267  atom R
n268  mp
n269  mp
n271  subst(groups=1)
n272  atom P
n273  atom Q
n275  subst(groups=1)
n276  atom P
n277  imp
n278  imp
n279  atom Q
n281  subst(groups=2)
n282  atom P
n283  atom Q
n284  atom R
n325  subst(groups=2)
n326  atom P
n327  atom Q
n328  atom R
n330  subst(groups=1)
n331  atom P
n332  imp
n333  imp
n334  atom Q
n336  subst(groups=2)
n337  atom P
n338  atom Q
n339  atom R
n340  mp
n341  mp
n343  subst(groups=1)
n344  atom P
n345  atom Q
n347  subst(groups=1)
n348  atom P
n349  imp
n350  imp
n351  atom Q
n353  subst(groups=2)
n354  atom P
n355  atom Q
n356  atom R
n358  subst(groups=2)
n359  atom P
n360  atom Q
n361  atom R
n363  subst(groups=0)
n364  atom Q
n365  subst(groups=0)
n366  atom Q

接线：
n10.out → n11.a
n7.out → n27.assertion
n28.out → n27.atom1
n11.out → n27.formula1
n29.out → n27.atom2
n30.out → n31.a
n31.out → n27.formula2
n31.out → n35.a
n11.out → n35.b
n27.out → n4.a
n45.out → n46.assertion
n47.out → n46.atom1
n30.out → n46.formula1
n48.out → n46.atom2
n10.out → n46.formula2
n46.out → n44.a
n7.out → n50.assertion
n51.out → n50.atom1
n10.out → n52.a
n30.out → n52.b
n35.out → n53.a
n52.out → n53.b
n53.out → n50.formula1
n54.out → n50.atom2
n11.out → n50.formula2
n50.out → n44.b
n44.out → n43.a
n19.out → n56.assertion
n57.out → n56.atom1
n11.out → n56.formula1
n58.out → n56.atom2
n35.out → n56.formula2
n59.out → n56.atom3
n52.out → n56.formula3
n56.out → n43.b
n43.out → n4.b
n4.out → n3.a
n7.out → n67.assertion
n68.out → n67.atom1
n11.out → n67.formula1
n69.out → n67.atom2
n52.out → n70.a
n70.out → n71.a
n71.out → n72.a
n72.out → n67.formula2
n72.out → n76.a
n11.out → n76.b
n67.out → n62.a
n7.out → n111.assertion
n112.out → n111.atom1
n72.out → n111.formula1
n113.out → n111.atom2
n71.out → n111.formula2
n71.out → n117.a
n72.out → n117.b
n111.out → n90.a
n45.out → n128.assertion
n129.out → n128.atom1
n70.out → n128.formula1
n130.out → n128.atom2
n71.out → n128.formula2
n128.out → n126.a
n7.out → n132.assertion
n133.out → n132.atom1
n71.out → n134.a
n70.out → n134.b
n117.out → n135.a
n134.out → n135.b
n135.out → n132.formula1
n136.out → n132.atom2
n72.out → n132.formula2
n132.out → n126.b
n126.out → n125.a
n19.out → n138.assertion
n139.out → n138.atom1
n72.out → n138.formula1
n140.out → n138.atom2
n117.out → n138.formula2
n141.out → n138.atom3
n134.out → n138.formula3
n138.out → n125.b
n125.out → n90.b
n90.out → n89.a
n7.out → n147.assertion
n148.out → n147.atom1
n134.out → n147.formula1
n149.out → n147.atom2
n134.out → n147.formula2
n147.out → n145.a
n7.out → n152.assertion
n153.out → n152.atom1
n134.out → n152.formula1
n154.out → n152.atom2
n134.out → n155.a
n134.out → n155.b
n155.out → n152.formula2
n152.out → n150.a
n19.out → n157.assertion
n158.out → n157.atom1
n134.out → n157.formula1
n159.out → n157.atom2
n155.out → n157.formula2
n160.out → n157.atom3
n134.out → n157.formula3
n157.out → n150.b
n150.out → n145.b
n145.out → n144.a
n7.out → n188.assertion
n189.out → n188.atom1
n71.out → n188.formula1
n190.out → n188.atom2
n134.out → n191.a
n191.out → n192.a
n192.out → n188.formula2
n192.out → n196.a
n71.out → n196.b
n188.out → n167.a
n45.out → n207.assertion
n208.out → n207.atom1
n191.out → n207.formula1
n209.out → n207.atom2
n70.out → n207.formula2
n207.out → n205.a
n7.out → n211.assertion
n212.out → n211.atom1
n70.out → n213.a
n191.out → n213.b
n196.out → n214.a
n213.out → n214.b
n214.out → n211.formula1
n215.out → n211.atom2
n71.out → n211.formula2
n211.out → n205.b
n205.out → n204.a
n19.out → n217.assertion
n218.out → n217.atom1
n71.out → n217.formula1
n219.out → n217.atom2
n196.out → n217.formula2
n220.out → n217.atom3
n213.out → n217.formula3
n217.out → n204.b
n204.out → n167.b
n167.out → n166.a
n19.out → n222.assertion
n223.out → n222.atom1
n71.out → n222.formula1
n224.out → n222.atom2
n70.out → n222.formula2
n225.out → n222.atom3
n191.out → n222.formula3
n222.out → n166.b
n71.out → n229.a
n191.out → n229.b
n166.out → n162.a
n45.out → n240.assertion
n241.out → n240.atom1
n70.out → n240.formula1
n242.out → n240.atom2
n134.out → n240.formula2
n240.out → n238.a
n7.out → n244.assertion
n245.out → n244.atom1
n134.out → n246.a
n70.out → n246.b
n229.out → n247.a
n246.out → n247.b
n247.out → n244.formula1
n248.out → n244.atom2
n134.out → n244.formula2
n244.out → n238.b
n238.out → n237.a
n19.out → n250.assertion
n251.out → n250.atom1
n134.out → n250.formula1
n252.out → n250.atom2
n229.out → n250.formula2
n253.out → n250.atom3
n246.out → n250.formula3
n250.out → n237.b
n237.out → n162.b
n162.out → n161.a
n19.out → n255.assertion
n256.out → n255.atom1
n134.out → n255.formula1
n257.out → n255.atom2
n134.out → n255.formula2
n258.out → n255.atom3
n70.out → n255.formula3
n255.out → n161.b
n161.out → n144.b
n144.out → n143.a
n7.out → n260.assertion
n261.out → n260.atom1
n246.out → n260.formula1
n262.out → n260.atom2
n72.out → n260.formula2
n260.out → n143.b
n143.out → n142.a
n19.out → n264.assertion
n265.out → n264.atom1
n72.out → n264.formula1
n266.out → n264.atom2
n134.out → n264.formula2
n267.out → n264.atom3
n70.out → n264.formula3
n264.out → n142.b
n142.out → n89.b
n89.out → n88.a
n7.out → n271.assertion
n272.out → n271.atom1
n70.out → n271.formula1
n273.out → n271.atom2
n11.out → n271.formula2
n271.out → n269.a
n7.out → n275.assertion
n276.out → n275.atom1
n11.out → n277.a
n70.out → n277.b
n70.out → n278.a
n277.out → n278.b
n278.out → n275.formula1
n279.out → n275.atom2
n72.out → n275.formula2
n275.out → n269.b
n269.out → n268.a
n19.out → n281.assertion
n282.out → n281.atom1
n72.out → n281.formula1
n283.out → n281.atom2
n70.out → n281.formula2
n284.out → n281.atom3
n277.out → n281.formula3
n281.out → n268.b
n268.out → n88.b
n88.out → n86.a
n19.out → n325.assertion
n326.out → n325.atom1
n72.out → n325.formula1
n327.out → n325.atom2
n11.out → n325.formula2
n328.out → n325.atom3
n70.out → n325.formula3
n325.out → n86.b
n86.out → n85.a
n7.out → n330.assertion
n331.out → n330.atom1
n72.out → n332.a
n70.out → n332.b
n76.out → n333.a
n332.out → n333.b
n333.out → n330.formula1
n334.out → n330.atom2
n11.out → n330.formula2
n330.out → n85.b
n85.out → n84.a
n19.out → n336.assertion
n337.out → n336.atom1
n11.out → n336.formula1
n338.out → n336.atom2
n76.out → n336.formula2
n339.out → n336.atom3
n332.out → n336.formula3
n336.out → n84.b
n84.out → n62.b
n62.out → n61.a
n45.out → n343.assertion
n344.out → n343.atom1
n71.out → n343.formula1
n345.out → n343.atom2
n52.out → n343.formula2
n343.out → n341.a
n7.out → n347.assertion
n348.out → n347.atom1
n52.out → n349.a
n71.out → n349.b
n332.out → n350.a
n349.out → n350.b
n350.out → n347.formula1
n351.out → n347.atom2
n11.out → n347.formula2
n347.out → n341.b
n341.out → n340.a
n19.out → n353.assertion
n354.out → n353.atom1
n11.out → n353.formula1
n355.out → n353.atom2
n332.out → n353.formula2
n356.out → n353.atom3
n349.out → n353.formula3
n353.out → n340.b
n340.out → n61.b
n61.out → n60.a
n19.out → n358.assertion
n359.out → n358.atom1
n11.out → n358.formula1
n360.out → n358.atom2
n52.out → n358.formula2
n361.out → n358.atom3
n71.out → n358.formula3
n358.out → n60.b
n60.out → n3.b
n3.out → n2.a
n45.out → n363.assertion
n364.out → n363.atom1
n70.out → n363.formula1
n363.out → n2.b
n2.out → n365.assertion
n366.out → n365.atom1
n31.out → n365.formula1
n365.out → n1.assertion
n1.out → n367.proof
```

</details>

### 85 · 等值消去左

- 目标：`⊢ ( ( P ↔ Q ) → ( P → Q ) )`
- 提示：A↔B 给出 A→B。
- 参考解：185 个模块 / 317 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n370  [target]
n1  def-contract
n2  mp
n3  mp
n4  mp
n7  axiom A1
n10  atom P
n11  not
n19  axiom A2
n27  subst(groups=1)
n28  atom P
n29  atom Q
n30  atom Q
n31  not
n35  imp
n43  mp
n44  mp
n45  axiom A3
n46  subst(groups=1)
n47  atom P
n48  atom Q
n50  subst(groups=1)
n51  atom P
n52  imp
n53  imp
n54  atom Q
n56  subst(groups=2)
n57  atom P
n58  atom Q
n59  atom R
n60  mp
n61  mp
n62  mp
n67  subst(groups=1)
n68  atom P
n69  atom Q
n70  not
n71  not
n72  not
n76  imp
n84  mp
n85  mp
n86  mp
n88  mp
n89  mp
n90  mp
n111  subst(groups=1)
n112  atom P
n113  atom Q
n117  imp
n125  mp
n126  mp
n128  subst(groups=1)
n129  atom P
n130  atom Q
n132  subst(groups=1)
n133  atom P
n134  imp
n135  imp
n136  atom Q
n138  subst(groups=2)
n139  atom P
n140  atom Q
n141  atom R
n142  mp
n143  mp
n144  mp
n145  mp
n147  subst(groups=1)
n148  atom P
n149  atom Q
n150  mp
n152  subst(groups=1)
n153  atom P
n154  atom Q
n155  imp
n157  subst(groups=2)
n158  atom P
n159  atom Q
n160  atom R
n161  mp
n162  mp
n166  mp
n167  mp
n188  subst(groups=1)
n189  atom P
n190  atom Q
n191  not
n192  not
n196  imp
n204  mp
n205  mp
n207  subst(groups=1)
n208  atom P
n209  atom Q
n211  subst(groups=1)
n212  atom P
n213  imp
n214  imp
n215  atom Q
n217  subst(groups=2)
n218  atom P
n219  atom Q
n220  atom R
n222  subst(groups=2)
n223  atom P
n224  atom Q
n225  atom R
n229  imp
n237  mp
n238  mp
n240  subst(groups=1)
n241  atom P
n242  atom Q
n244  subst(groups=1)
n245  atom P
n246  imp
n247  imp
n248  atom Q
n250  subst(groups=2)
n251  atom P
n252  atom Q
n253  atom R
n255  subst(groups=2)
n256  atom P
n257  atom Q
n258  atom R
n260  subst(groups=1)
n261  atom P
n262  atom Q
n264  subst(groups=2)
n265  atom P
n266  atom Q
n267  atom R
n268  mp
n269  mp
n271  subst(groups=1)
n272  atom P
n273  atom Q
n275  subst(groups=1)
n276  atom P
n277  imp
n278  imp
n279  atom Q
n281  subst(groups=2)
n282  atom P
n283  atom Q
n284  atom R
n325  subst(groups=2)
n326  atom P
n327  atom Q
n328  atom R
n330  subst(groups=1)
n331  atom P
n332  imp
n333  imp
n334  atom Q
n336  subst(groups=2)
n337  atom P
n338  atom Q
n339  atom R
n340  mp
n341  mp
n343  subst(groups=1)
n344  atom P
n345  atom Q
n347  subst(groups=1)
n348  atom P
n349  imp
n350  imp
n351  atom Q
n353  subst(groups=2)
n354  atom P
n355  atom Q
n356  atom R
n358  subst(groups=2)
n359  atom P
n360  atom Q
n361  atom R
n363  subst(groups=0)
n364  atom Q
n365  subst(groups=1)
n366  atom P
n367  atom Q
n368  imp
n369  not

接线：
n10.out → n11.a
n7.out → n27.assertion
n28.out → n27.atom1
n11.out → n27.formula1
n29.out → n27.atom2
n30.out → n31.a
n31.out → n27.formula2
n31.out → n35.a
n11.out → n35.b
n27.out → n4.a
n45.out → n46.assertion
n47.out → n46.atom1
n30.out → n46.formula1
n48.out → n46.atom2
n10.out → n46.formula2
n46.out → n44.a
n7.out → n50.assertion
n51.out → n50.atom1
n10.out → n52.a
n30.out → n52.b
n35.out → n53.a
n52.out → n53.b
n53.out → n50.formula1
n54.out → n50.atom2
n11.out → n50.formula2
n50.out → n44.b
n44.out → n43.a
n19.out → n56.assertion
n57.out → n56.atom1
n11.out → n56.formula1
n58.out → n56.atom2
n35.out → n56.formula2
n59.out → n56.atom3
n52.out → n56.formula3
n56.out → n43.b
n43.out → n4.b
n4.out → n3.a
n7.out → n67.assertion
n68.out → n67.atom1
n11.out → n67.formula1
n69.out → n67.atom2
n52.out → n70.a
n70.out → n71.a
n71.out → n72.a
n72.out → n67.formula2
n72.out → n76.a
n11.out → n76.b
n67.out → n62.a
n7.out → n111.assertion
n112.out → n111.atom1
n72.out → n111.formula1
n113.out → n111.atom2
n71.out → n111.formula2
n71.out → n117.a
n72.out → n117.b
n111.out → n90.a
n45.out → n128.assertion
n129.out → n128.atom1
n70.out → n128.formula1
n130.out → n128.atom2
n71.out → n128.formula2
n128.out → n126.a
n7.out → n132.assertion
n133.out → n132.atom1
n71.out → n134.a
n70.out → n134.b
n117.out → n135.a
n134.out → n135.b
n135.out → n132.formula1
n136.out → n132.atom2
n72.out → n132.formula2
n132.out → n126.b
n126.out → n125.a
n19.out → n138.assertion
n139.out → n138.atom1
n72.out → n138.formula1
n140.out → n138.atom2
n117.out → n138.formula2
n141.out → n138.atom3
n134.out → n138.formula3
n138.out → n125.b
n125.out → n90.b
n90.out → n89.a
n7.out → n147.assertion
n148.out → n147.atom1
n134.out → n147.formula1
n149.out → n147.atom2
n134.out → n147.formula2
n147.out → n145.a
n7.out → n152.assertion
n153.out → n152.atom1
n134.out → n152.formula1
n154.out → n152.atom2
n134.out → n155.a
n134.out → n155.b
n155.out → n152.formula2
n152.out → n150.a
n19.out → n157.assertion
n158.out → n157.atom1
n134.out → n157.formula1
n159.out → n157.atom2
n155.out → n157.formula2
n160.out → n157.atom3
n134.out → n157.formula3
n157.out → n150.b
n150.out → n145.b
n145.out → n144.a
n7.out → n188.assertion
n189.out → n188.atom1
n71.out → n188.formula1
n190.out → n188.atom2
n134.out → n191.a
n191.out → n192.a
n192.out → n188.formula2
n192.out → n196.a
n71.out → n196.b
n188.out → n167.a
n45.out → n207.assertion
n208.out → n207.atom1
n191.out → n207.formula1
n209.out → n207.atom2
n70.out → n207.formula2
n207.out → n205.a
n7.out → n211.assertion
n212.out → n211.atom1
n70.out → n213.a
n191.out → n213.b
n196.out → n214.a
n213.out → n214.b
n214.out → n211.formula1
n215.out → n211.atom2
n71.out → n211.formula2
n211.out → n205.b
n205.out → n204.a
n19.out → n217.assertion
n218.out → n217.atom1
n71.out → n217.formula1
n219.out → n217.atom2
n196.out → n217.formula2
n220.out → n217.atom3
n213.out → n217.formula3
n217.out → n204.b
n204.out → n167.b
n167.out → n166.a
n19.out → n222.assertion
n223.out → n222.atom1
n71.out → n222.formula1
n224.out → n222.atom2
n70.out → n222.formula2
n225.out → n222.atom3
n191.out → n222.formula3
n222.out → n166.b
n71.out → n229.a
n191.out → n229.b
n166.out → n162.a
n45.out → n240.assertion
n241.out → n240.atom1
n70.out → n240.formula1
n242.out → n240.atom2
n134.out → n240.formula2
n240.out → n238.a
n7.out → n244.assertion
n245.out → n244.atom1
n134.out → n246.a
n70.out → n246.b
n229.out → n247.a
n246.out → n247.b
n247.out → n244.formula1
n248.out → n244.atom2
n134.out → n244.formula2
n244.out → n238.b
n238.out → n237.a
n19.out → n250.assertion
n251.out → n250.atom1
n134.out → n250.formula1
n252.out → n250.atom2
n229.out → n250.formula2
n253.out → n250.atom3
n246.out → n250.formula3
n250.out → n237.b
n237.out → n162.b
n162.out → n161.a
n19.out → n255.assertion
n256.out → n255.atom1
n134.out → n255.formula1
n257.out → n255.atom2
n134.out → n255.formula2
n258.out → n255.atom3
n70.out → n255.formula3
n255.out → n161.b
n161.out → n144.b
n144.out → n143.a
n7.out → n260.assertion
n261.out → n260.atom1
n246.out → n260.formula1
n262.out → n260.atom2
n72.out → n260.formula2
n260.out → n143.b
n143.out → n142.a
n19.out → n264.assertion
n265.out → n264.atom1
n72.out → n264.formula1
n266.out → n264.atom2
n134.out → n264.formula2
n267.out → n264.atom3
n70.out → n264.formula3
n264.out → n142.b
n142.out → n89.b
n89.out → n88.a
n7.out → n271.assertion
n272.out → n271.atom1
n70.out → n271.formula1
n273.out → n271.atom2
n11.out → n271.formula2
n271.out → n269.a
n7.out → n275.assertion
n276.out → n275.atom1
n11.out → n277.a
n70.out → n277.b
n70.out → n278.a
n277.out → n278.b
n278.out → n275.formula1
n279.out → n275.atom2
n72.out → n275.formula2
n275.out → n269.b
n269.out → n268.a
n19.out → n281.assertion
n282.out → n281.atom1
n72.out → n281.formula1
n283.out → n281.atom2
n70.out → n281.formula2
n284.out → n281.atom3
n277.out → n281.formula3
n281.out → n268.b
n268.out → n88.b
n88.out → n86.a
n19.out → n325.assertion
n326.out → n325.atom1
n72.out → n325.formula1
n327.out → n325.atom2
n11.out → n325.formula2
n328.out → n325.atom3
n70.out → n325.formula3
n325.out → n86.b
n86.out → n85.a
n7.out → n330.assertion
n331.out → n330.atom1
n72.out → n332.a
n70.out → n332.b
n76.out → n333.a
n332.out → n333.b
n333.out → n330.formula1
n334.out → n330.atom2
n11.out → n330.formula2
n330.out → n85.b
n85.out → n84.a
n19.out → n336.assertion
n337.out → n336.atom1
n11.out → n336.formula1
n338.out → n336.atom2
n76.out → n336.formula2
n339.out → n336.atom3
n332.out → n336.formula3
n336.out → n84.b
n84.out → n62.b
n62.out → n61.a
n45.out → n343.assertion
n344.out → n343.atom1
n71.out → n343.formula1
n345.out → n343.atom2
n52.out → n343.formula2
n343.out → n341.a
n7.out → n347.assertion
n348.out → n347.atom1
n52.out → n349.a
n71.out → n349.b
n332.out → n350.a
n349.out → n350.b
n350.out → n347.formula1
n351.out → n347.atom2
n11.out → n347.formula2
n347.out → n341.b
n341.out → n340.a
n19.out → n353.assertion
n354.out → n353.atom1
n11.out → n353.formula1
n355.out → n353.atom2
n332.out → n353.formula2
n356.out → n353.atom3
n349.out → n353.formula3
n353.out → n340.b
n340.out → n61.b
n61.out → n60.a
n19.out → n358.assertion
n359.out → n358.atom1
n11.out → n358.formula1
n360.out → n358.atom2
n52.out → n358.formula2
n361.out → n358.atom3
n71.out → n358.formula3
n358.out → n60.b
n60.out → n3.b
n3.out → n2.a
n45.out → n363.assertion
n364.out → n363.atom1
n70.out → n363.formula1
n363.out → n2.b
n2.out → n365.assertion
n366.out → n365.atom1
n52.out → n365.formula1
n367.out → n365.atom2
n30.out → n368.a
n10.out → n368.b
n368.out → n369.a
n369.out → n365.formula2
n365.out → n1.assertion
n1.out → n370.proof
```

</details>

### 86 · 分情况一

- 目标：`⊢ ( ( ¬ P → Q ) → ( ( P → Q ) → Q ) )`
- 提示：(¬P→Q)→(P→Q)→Q
- 参考解：194 个模块 / 332 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n288  [target]
n1  mp
n3  定理 *01
n4  subst(groups=0)
n5  atom P
n6  atom P
n7  not
n8  atom Q
n9  imp
n12  axiom A1
n13  subst(groups=1)
n14  atom P
n15  atom Q
n16  imp
n20  imp
n23  axiom A2
n28  mp
n29  mp
n30  mp
n31  mp
n33  subst(groups=0)
n34  atom P
n35  mp
n36  mp
n37  mp
n38  mp
n39  mp
n40  mp
n41  mp
n42  mp
n50  subst(groups=1)
n51  atom P
n52  atom Q
n56  imp
n64  mp
n65  mp
n66  mp
n68  subst(groups=2)
n69  atom P
n70  atom Q
n71  atom R
n73  subst(groups=1)
n74  atom P
n75  imp
n76  imp
n77  atom Q
n79  subst(groups=2)
n80  atom P
n81  atom Q
n82  atom R
n84  subst(groups=1)
n85  atom P
n86  imp
n87  atom Q
n88  mp
n89  mp
n90  mp
n91  mp
n92  定理 *41
n93  subst(groups=0)
n94  atom P
n96  subst(groups=1)
n97  atom P
n98  not
n99  not
n100  imp
n101  atom Q
n103  subst(groups=2)
n104  atom P
n105  atom Q
n106  atom R
n108  subst(groups=1)
n109  atom P
n110  imp
n111  imp
n112  atom Q
n114  subst(groups=2)
n115  atom P
n116  atom Q
n117  atom R
n118  mp
n119  mp
n120  定理 *?
n121  subst(groups=0)
n122  atom Q
n124  subst(groups=1)
n125  atom P
n126  imp
n127  imp
n128  atom Q
n130  subst(groups=2)
n131  atom P
n132  atom Q
n133  atom R
n134  mp
n135  mp
n136  mp
n137  mp
n138  mp
n147  subst(groups=1)
n148  atom P
n149  atom Q
n153  imp
n178  subst(groups=1)
n179  atom P
n180  atom Q
n182  subst(groups=0)
n183  atom R
n184  mp
n185  mp
n187  subst(groups=1)
n188  atom P
n189  imp
n190  atom Q
n192  subst(groups=1)
n193  atom P
n194  imp
n195  imp
n196  atom Q
n198  subst(groups=2)
n199  atom P
n200  atom Q
n201  atom R
n202  mp
n203  mp
n205  subst(groups=2)
n206  atom P
n207  atom Q
n208  atom R
n210  subst(groups=1)
n211  atom P
n212  imp
n213  imp
n214  imp
n215  atom Q
n217  subst(groups=2)
n218  atom P
n219  atom Q
n220  atom R
n222  subst(groups=2)
n223  atom P
n224  atom Q
n225  atom R
n226  mp
n227  mp
n228  mp
n229  定理 *05
n230  subst(groups=1)
n231  atom P
n232  atom Q
n233  not
n235  subst(groups=2)
n236  atom P
n237  atom Q
n238  atom R
n240  subst(groups=1)
n241  atom P
n242  imp
n243  imp
n244  atom Q
n246  subst(groups=2)
n247  atom P
n248  atom Q
n249  atom R
n250  mp
n251  mp
n253  subst(groups=1)
n254  atom P
n255  atom Q
n257  subst(groups=1)
n258  atom P
n259  imp
n260  imp
n261  atom Q
n263  subst(groups=2)
n264  atom P
n265  atom Q
n266  atom R
n268  subst(groups=2)
n269  atom P
n270  atom Q
n271  atom R
n273  subst(groups=2)
n274  atom P
n275  atom Q
n276  atom R
n278  subst(groups=1)
n279  atom P
n280  imp
n281  imp
n282  atom Q
n284  subst(groups=2)
n285  atom P
n286  atom Q
n287  atom R

接线：
n3.out → n4.assertion
n5.out → n4.atom1
n6.out → n7.a
n7.out → n9.a
n8.out → n9.b
n9.out → n4.formula1
n12.out → n13.assertion
n14.out → n13.atom1
n9.out → n13.formula1
n15.out → n13.atom2
n6.out → n16.a
n8.out → n16.b
n16.out → n13.formula2
n16.out → n20.a
n9.out → n20.b
n13.out → n1.a
n3.out → n33.assertion
n34.out → n33.atom1
n16.out → n33.formula1
n33.out → n31.a
n12.out → n50.assertion
n51.out → n50.atom1
n7.out → n50.formula1
n52.out → n50.atom2
n9.out → n50.formula2
n9.out → n56.a
n7.out → n56.b
n50.out → n42.a
n4.out → n66.a
n23.out → n68.assertion
n69.out → n68.atom1
n9.out → n68.formula1
n70.out → n68.atom2
n7.out → n68.formula2
n71.out → n68.atom3
n8.out → n68.formula3
n68.out → n66.b
n66.out → n65.a
n12.out → n73.assertion
n74.out → n73.atom1
n9.out → n75.a
n8.out → n75.b
n56.out → n76.a
n75.out → n76.b
n76.out → n73.formula1
n77.out → n73.atom2
n7.out → n73.formula2
n73.out → n65.b
n65.out → n64.a
n23.out → n79.assertion
n80.out → n79.atom1
n7.out → n79.formula1
n81.out → n79.atom2
n56.out → n79.formula2
n82.out → n79.atom3
n75.out → n79.formula3
n79.out → n64.b
n64.out → n42.b
n42.out → n41.a
n12.out → n84.assertion
n85.out → n84.atom1
n7.out → n86.a
n75.out → n86.b
n86.out → n84.formula1
n87.out → n84.atom2
n16.out → n84.formula2
n84.out → n41.b
n41.out → n40.a
n92.out → n93.assertion
n94.out → n93.atom1
n75.out → n93.formula1
n93.out → n91.a
n12.out → n96.assertion
n97.out → n96.atom1
n75.out → n98.a
n98.out → n99.a
n75.out → n100.a
n99.out → n100.b
n100.out → n96.formula1
n101.out → n96.atom2
n7.out → n96.formula2
n96.out → n91.b
n91.out → n90.a
n23.out → n103.assertion
n104.out → n103.atom1
n7.out → n103.formula1
n105.out → n103.atom2
n75.out → n103.formula2
n106.out → n103.atom3
n99.out → n103.formula3
n103.out → n90.b
n90.out → n89.a
n12.out → n108.assertion
n109.out → n108.atom1
n7.out → n110.a
n99.out → n110.b
n86.out → n111.a
n110.out → n111.b
n111.out → n108.formula1
n112.out → n108.atom2
n16.out → n108.formula2
n108.out → n89.b
n89.out → n88.a
n23.out → n114.assertion
n115.out → n114.atom1
n16.out → n114.formula1
n116.out → n114.atom2
n86.out → n114.formula2
n117.out → n114.atom3
n110.out → n114.formula3
n114.out → n88.b
n88.out → n40.b
n40.out → n39.a
n120.out → n121.assertion
n122.out → n121.atom1
n98.out → n121.formula1
n121.out → n119.a
n12.out → n124.assertion
n125.out → n124.atom1
n98.out → n126.a
n6.out → n126.b
n110.out → n127.a
n126.out → n127.b
n127.out → n124.formula1
n128.out → n124.atom2
n16.out → n124.formula2
n124.out → n119.b
n119.out → n118.a
n23.out → n130.assertion
n131.out → n130.atom1
n16.out → n130.formula1
n132.out → n130.atom2
n110.out → n130.formula2
n133.out → n130.atom3
n126.out → n130.formula3
n130.out → n118.b
n118.out → n39.b
n39.out → n38.a
n12.out → n147.assertion
n148.out → n147.atom1
n8.out → n147.formula1
n149.out → n147.atom2
n9.out → n147.formula2
n8.out → n153.a
n75.out → n153.b
n147.out → n138.a
n12.out → n178.assertion
n179.out → n178.atom1
n153.out → n178.formula1
n180.out → n178.atom2
n6.out → n178.formula2
n178.out → n138.b
n138.out → n137.a
n23.out → n182.assertion
n183.out → n182.atom1
n75.out → n182.formula1
n182.out → n137.b
n137.out → n136.a
n12.out → n187.assertion
n188.out → n187.atom1
n6.out → n189.a
n75.out → n189.b
n189.out → n187.formula1
n190.out → n187.atom2
n98.out → n187.formula2
n187.out → n185.a
n12.out → n192.assertion
n193.out → n192.atom1
n98.out → n194.a
n189.out → n194.b
n189.out → n195.a
n194.out → n195.b
n195.out → n192.formula1
n196.out → n192.atom2
n16.out → n192.formula2
n192.out → n185.b
n185.out → n184.a
n23.out → n198.assertion
n199.out → n198.atom1
n16.out → n198.formula1
n200.out → n198.atom2
n189.out → n198.formula2
n201.out → n198.atom3
n194.out → n198.formula3
n198.out → n184.b
n184.out → n136.b
n136.out → n135.a
n23.out → n205.assertion
n206.out → n205.atom1
n98.out → n205.formula1
n207.out → n205.atom2
n6.out → n205.formula2
n208.out → n205.atom3
n75.out → n205.formula3
n205.out → n203.a
n12.out → n210.assertion
n211.out → n210.atom1
n98.out → n212.a
n75.out → n212.b
n126.out → n213.a
n212.out → n213.b
n194.out → n214.a
n213.out → n214.b
n214.out → n210.formula1
n215.out → n210.atom2
n16.out → n210.formula2
n210.out → n203.b
n203.out → n202.a
n23.out → n217.assertion
n218.out → n217.atom1
n16.out → n217.formula1
n219.out → n217.atom2
n194.out → n217.formula2
n220.out → n217.atom3
n213.out → n217.formula3
n217.out → n202.b
n202.out → n135.b
n135.out → n134.a
n23.out → n222.assertion
n223.out → n222.atom1
n16.out → n222.formula1
n224.out → n222.atom2
n126.out → n222.formula2
n225.out → n222.atom3
n212.out → n222.formula3
n222.out → n134.b
n134.out → n38.b
n38.out → n37.a
n229.out → n230.assertion
n231.out → n230.atom1
n75.out → n230.formula1
n232.out → n230.atom2
n16.out → n233.a
n233.out → n230.formula2
n230.out → n228.a
n23.out → n235.assertion
n236.out → n235.atom1
n98.out → n235.formula1
n237.out → n235.atom2
n75.out → n235.formula2
n238.out → n235.atom3
n233.out → n235.formula3
n235.out → n228.b
n228.out → n227.a
n12.out → n240.assertion
n241.out → n240.atom1
n98.out → n242.a
n233.out → n242.b
n212.out → n243.a
n242.out → n243.b
n243.out → n240.formula1
n244.out → n240.atom2
n16.out → n240.formula2
n240.out → n227.b
n227.out → n226.a
n23.out → n246.assertion
n247.out → n246.atom1
n16.out → n246.formula1
n248.out → n246.atom2
n212.out → n246.formula2
n249.out → n246.atom3
n242.out → n246.formula3
n246.out → n226.b
n226.out → n37.b
n37.out → n36.a
n120.out → n253.assertion
n254.out → n253.atom1
n75.out → n253.formula1
n255.out → n253.atom2
n16.out → n253.formula2
n253.out → n251.a
n12.out → n257.assertion
n258.out → n257.atom1
n16.out → n259.a
n75.out → n259.b
n242.out → n260.a
n259.out → n260.b
n260.out → n257.formula1
n261.out → n257.atom2
n16.out → n257.formula2
n257.out → n251.b
n251.out → n250.a
n23.out → n263.assertion
n264.out → n263.atom1
n16.out → n263.formula1
n265.out → n263.atom2
n242.out → n263.formula2
n266.out → n263.atom3
n259.out → n263.formula3
n263.out → n250.b
n250.out → n36.b
n36.out → n35.a
n23.out → n268.assertion
n269.out → n268.atom1
n16.out → n268.formula1
n270.out → n268.atom2
n16.out → n268.formula2
n271.out → n268.atom3
n75.out → n268.formula3
n268.out → n35.b
n35.out → n31.b
n31.out → n30.a
n23.out → n273.assertion
n274.out → n273.atom1
n16.out → n273.formula1
n275.out → n273.atom2
n9.out → n273.formula2
n276.out → n273.atom3
n8.out → n273.formula3
n273.out → n30.b
n30.out → n29.a
n12.out → n278.assertion
n279.out → n278.atom1
n16.out → n280.a
n8.out → n280.b
n20.out → n281.a
n280.out → n281.b
n281.out → n278.formula1
n282.out → n278.atom2
n9.out → n278.formula2
n278.out → n29.b
n29.out → n28.a
n23.out → n284.assertion
n285.out → n284.atom1
n9.out → n284.formula1
n286.out → n284.atom2
n20.out → n284.formula2
n287.out → n284.atom3
n280.out → n284.formula3
n284.out → n28.b
n28.out → n1.b
n1.out → n288.proof
```

</details>

### 87 · 分情况二

- 目标：`⊢ ( ( P → Q ) → ( ( ¬ P → Q ) → Q ) )`
- 提示：(P→Q)→(¬P→Q)→Q
- 参考解：29 个模块 / 44 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n48  [target]
n1  mp
n6  atom P
n7  atom Q
n8  imp
n11  axiom A1
n12  subst(groups=1)
n13  atom P
n14  atom Q
n15  not
n16  imp
n20  imp
n23  axiom A2
n28  mp
n29  mp
n30  mp
n31  定理 *86
n33  subst(groups=2)
n34  atom P
n35  atom Q
n36  atom R
n38  subst(groups=1)
n39  atom P
n40  imp
n41  imp
n42  atom Q
n44  subst(groups=2)
n45  atom P
n46  atom Q
n47  atom R

接线：
n6.out → n8.a
n7.out → n8.b
n11.out → n12.assertion
n13.out → n12.atom1
n8.out → n12.formula1
n14.out → n12.atom2
n6.out → n15.a
n15.out → n16.a
n7.out → n16.b
n16.out → n12.formula2
n16.out → n20.a
n8.out → n20.b
n12.out → n1.a
n31.out → n30.a
n23.out → n33.assertion
n34.out → n33.atom1
n16.out → n33.formula1
n35.out → n33.atom2
n8.out → n33.formula2
n36.out → n33.atom3
n7.out → n33.formula3
n33.out → n30.b
n30.out → n29.a
n11.out → n38.assertion
n39.out → n38.atom1
n16.out → n40.a
n7.out → n40.b
n20.out → n41.a
n40.out → n41.b
n41.out → n38.formula1
n42.out → n38.atom2
n8.out → n38.formula2
n38.out → n29.b
n29.out → n28.a
n23.out → n44.assertion
n45.out → n44.atom1
n8.out → n44.formula1
n46.out → n44.atom2
n20.out → n44.formula2
n47.out → n44.atom3
n40.out → n44.formula3
n44.out → n28.b
n28.out → n1.b
n1.out → n48.proof
```

</details>

### 88 · 矛盾消去

- 目标：`⊢ ( ( P → Q ) → ( ( P → ¬ Q ) → ¬ P ) )`
- 提示：(P→Q)→(P→¬Q)→¬P
- 参考解：195 个模块 / 332 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n296  [target]
n1  mp
n3  定理 *01
n6  atom P
n7  atom Q
n8  imp
n11  axiom A1
n12  subst(groups=1)
n13  atom P
n14  atom Q
n15  not
n16  imp
n20  imp
n23  axiom A2
n28  mp
n29  mp
n30  mp
n31  mp
n33  subst(groups=0)
n34  atom P
n35  mp
n36  mp
n37  mp
n38  mp
n39  mp
n40  mp
n41  mp
n47  not
n51  subst(groups=1)
n52  atom P
n53  atom Q
n57  imp
n58  imp
n88  subst(groups=1)
n89  atom P
n90  atom Q
n91  mp
n92  mp
n93  mp
n94  mp
n95  定理 *41
n96  subst(groups=0)
n97  atom P
n99  subst(groups=1)
n100  atom P
n101  not
n102  not
n103  imp
n104  atom Q
n106  subst(groups=2)
n107  atom P
n108  atom Q
n109  atom R
n111  subst(groups=1)
n112  atom P
n113  imp
n114  imp
n115  atom Q
n117  subst(groups=2)
n118  atom P
n119  atom Q
n120  atom R
n121  mp
n122  mp
n123  定理 *?
n124  subst(groups=0)
n125  atom Q
n127  subst(groups=1)
n128  atom P
n129  imp
n130  imp
n131  atom Q
n133  subst(groups=2)
n134  atom P
n135  atom Q
n136  atom R
n137  mp
n138  mp
n139  mp
n140  mp
n141  mp
n142  mp
n150  subst(groups=1)
n151  atom P
n152  atom Q
n156  imp
n164  mp
n165  mp
n166  mp
n167  定理 *71
n169  subst(groups=2)
n170  atom P
n171  atom Q
n172  atom R
n174  subst(groups=1)
n175  atom P
n176  imp
n177  atom Q
n179  subst(groups=2)
n180  atom P
n181  atom Q
n182  atom R
n184  subst(groups=1)
n185  atom P
n186  imp
n187  atom Q
n189  subst(groups=1)
n190  atom Q
n191  atom R
n192  mp
n193  mp
n195  subst(groups=1)
n196  atom P
n197  imp
n198  atom Q
n200  subst(groups=1)
n201  atom P
n202  imp
n203  imp
n204  atom Q
n206  subst(groups=2)
n207  atom P
n208  atom Q
n209  atom R
n210  mp
n211  mp
n213  subst(groups=2)
n214  atom P
n215  atom Q
n216  atom R
n218  subst(groups=1)
n219  atom P
n220  imp
n221  imp
n222  imp
n223  atom Q
n225  subst(groups=2)
n226  atom P
n227  atom Q
n228  atom R
n230  subst(groups=2)
n231  atom P
n232  atom Q
n233  atom R
n234  mp
n235  mp
n236  mp
n237  定理 *05
n238  subst(groups=1)
n239  atom P
n240  atom Q
n241  not
n243  subst(groups=2)
n244  atom P
n245  atom Q
n246  atom R
n248  subst(groups=1)
n249  atom P
n250  imp
n251  imp
n252  atom Q
n254  subst(groups=2)
n255  atom P
n256  atom Q
n257  atom R
n258  mp
n259  mp
n261  subst(groups=1)
n262  atom P
n263  atom Q
n265  subst(groups=1)
n266  atom P
n267  imp
n268  imp
n269  atom Q
n271  subst(groups=2)
n272  atom P
n273  atom Q
n274  atom R
n276  subst(groups=2)
n277  atom P
n278  atom Q
n279  atom R
n281  subst(groups=2)
n282  atom P
n283  atom Q
n284  atom R
n286  subst(groups=1)
n287  atom P
n288  imp
n289  imp
n290  atom Q
n292  subst(groups=2)
n293  atom P
n294  atom Q
n295  atom R

接线：
n6.out → n8.a
n7.out → n8.b
n11.out → n12.assertion
n13.out → n12.atom1
n8.out → n12.formula1
n14.out → n12.atom2
n7.out → n15.a
n6.out → n16.a
n15.out → n16.b
n16.out → n12.formula2
n16.out → n20.a
n8.out → n20.b
n12.out → n1.a
n3.out → n33.assertion
n34.out → n33.atom1
n16.out → n33.formula1
n33.out → n31.a
n6.out → n47.a
n11.out → n51.assertion
n52.out → n51.atom1
n47.out → n51.formula1
n53.out → n51.atom2
n8.out → n51.formula2
n8.out → n57.a
n47.out → n57.b
n47.out → n58.a
n57.out → n58.b
n51.out → n41.a
n11.out → n88.assertion
n89.out → n88.atom1
n58.out → n88.formula1
n90.out → n88.atom2
n16.out → n88.formula2
n88.out → n41.b
n41.out → n40.a
n95.out → n96.assertion
n97.out → n96.atom1
n57.out → n96.formula1
n96.out → n94.a
n11.out → n99.assertion
n100.out → n99.atom1
n57.out → n101.a
n101.out → n102.a
n57.out → n103.a
n102.out → n103.b
n103.out → n99.formula1
n104.out → n99.atom2
n47.out → n99.formula2
n99.out → n94.b
n94.out → n93.a
n23.out → n106.assertion
n107.out → n106.atom1
n47.out → n106.formula1
n108.out → n106.atom2
n57.out → n106.formula2
n109.out → n106.atom3
n102.out → n106.formula3
n106.out → n93.b
n93.out → n92.a
n11.out → n111.assertion
n112.out → n111.atom1
n47.out → n113.a
n102.out → n113.b
n58.out → n114.a
n113.out → n114.b
n114.out → n111.formula1
n115.out → n111.atom2
n16.out → n111.formula2
n111.out → n92.b
n92.out → n91.a
n23.out → n117.assertion
n118.out → n117.atom1
n16.out → n117.formula1
n119.out → n117.atom2
n58.out → n117.formula2
n120.out → n117.atom3
n113.out → n117.formula3
n117.out → n91.b
n91.out → n40.b
n40.out → n39.a
n123.out → n124.assertion
n125.out → n124.atom1
n101.out → n124.formula1
n124.out → n122.a
n11.out → n127.assertion
n128.out → n127.atom1
n101.out → n129.a
n6.out → n129.b
n113.out → n130.a
n129.out → n130.b
n130.out → n127.formula1
n131.out → n127.atom2
n16.out → n127.formula2
n127.out → n122.b
n122.out → n121.a
n23.out → n133.assertion
n134.out → n133.atom1
n16.out → n133.formula1
n135.out → n133.atom2
n113.out → n133.formula2
n136.out → n133.atom3
n129.out → n133.formula3
n133.out → n121.b
n121.out → n39.b
n39.out → n38.a
n11.out → n150.assertion
n151.out → n150.atom1
n15.out → n150.formula1
n152.out → n150.atom2
n8.out → n150.formula2
n8.out → n156.a
n15.out → n156.b
n150.out → n142.a
n167.out → n166.a
n23.out → n169.assertion
n170.out → n169.atom1
n8.out → n169.formula1
n171.out → n169.atom2
n15.out → n169.formula2
n172.out → n169.atom3
n47.out → n169.formula3
n169.out → n166.b
n166.out → n165.a
n11.out → n174.assertion
n175.out → n174.atom1
n156.out → n176.a
n57.out → n176.b
n176.out → n174.formula1
n177.out → n174.atom2
n15.out → n174.formula2
n174.out → n165.b
n165.out → n164.a
n23.out → n179.assertion
n180.out → n179.atom1
n15.out → n179.formula1
n181.out → n179.atom2
n156.out → n179.formula2
n182.out → n179.atom3
n57.out → n179.formula3
n179.out → n164.b
n164.out → n142.b
n142.out → n141.a
n11.out → n184.assertion
n185.out → n184.atom1
n15.out → n186.a
n57.out → n186.b
n186.out → n184.formula1
n187.out → n184.atom2
n6.out → n184.formula2
n184.out → n141.b
n141.out → n140.a
n23.out → n189.assertion
n190.out → n189.atom1
n15.out → n189.formula1
n191.out → n189.atom2
n57.out → n189.formula2
n189.out → n140.b
n140.out → n139.a
n11.out → n195.assertion
n196.out → n195.atom1
n6.out → n197.a
n57.out → n197.b
n197.out → n195.formula1
n198.out → n195.atom2
n101.out → n195.formula2
n195.out → n193.a
n11.out → n200.assertion
n201.out → n200.atom1
n101.out → n202.a
n197.out → n202.b
n197.out → n203.a
n202.out → n203.b
n203.out → n200.formula1
n204.out → n200.atom2
n16.out → n200.formula2
n200.out → n193.b
n193.out → n192.a
n23.out → n206.assertion
n207.out → n206.atom1
n16.out → n206.formula1
n208.out → n206.atom2
n197.out → n206.formula2
n209.out → n206.atom3
n202.out → n206.formula3
n206.out → n192.b
n192.out → n139.b
n139.out → n138.a
n23.out → n213.assertion
n214.out → n213.atom1
n101.out → n213.formula1
n215.out → n213.atom2
n6.out → n213.formula2
n216.out → n213.atom3
n57.out → n213.formula3
n213.out → n211.a
n11.out → n218.assertion
n219.out → n218.atom1
n101.out → n220.a
n57.out → n220.b
n129.out → n221.a
n220.out → n221.b
n202.out → n222.a
n221.out → n222.b
n222.out → n218.formula1
n223.out → n218.atom2
n16.out → n218.formula2
n218.out → n211.b
n211.out → n210.a
n23.out → n225.assertion
n226.out → n225.atom1
n16.out → n225.formula1
n227.out → n225.atom2
n202.out → n225.formula2
n228.out → n225.atom3
n221.out → n225.formula3
n225.out → n210.b
n210.out → n138.b
n138.out → n137.a
n23.out → n230.assertion
n231.out → n230.atom1
n16.out → n230.formula1
n232.out → n230.atom2
n129.out → n230.formula2
n233.out → n230.atom3
n220.out → n230.formula3
n230.out → n137.b
n137.out → n38.b
n38.out → n37.a
n237.out → n238.assertion
n239.out → n238.atom1
n57.out → n238.formula1
n240.out → n238.atom2
n16.out → n241.a
n241.out → n238.formula2
n238.out → n236.a
n23.out → n243.assertion
n244.out → n243.atom1
n101.out → n243.formula1
n245.out → n243.atom2
n57.out → n243.formula2
n246.out → n243.atom3
n241.out → n243.formula3
n243.out → n236.b
n236.out → n235.a
n11.out → n248.assertion
n249.out → n248.atom1
n101.out → n250.a
n241.out → n250.b
n220.out → n251.a
n250.out → n251.b
n251.out → n248.formula1
n252.out → n248.atom2
n16.out → n248.formula2
n248.out → n235.b
n235.out → n234.a
n23.out → n254.assertion
n255.out → n254.atom1
n16.out → n254.formula1
n256.out → n254.atom2
n220.out → n254.formula2
n257.out → n254.atom3
n250.out → n254.formula3
n254.out → n234.b
n234.out → n37.b
n37.out → n36.a
n123.out → n261.assertion
n262.out → n261.atom1
n57.out → n261.formula1
n263.out → n261.atom2
n16.out → n261.formula2
n261.out → n259.a
n11.out → n265.assertion
n266.out → n265.atom1
n16.out → n267.a
n57.out → n267.b
n250.out → n268.a
n267.out → n268.b
n268.out → n265.formula1
n269.out → n265.atom2
n16.out → n265.formula2
n265.out → n259.b
n259.out → n258.a
n23.out → n271.assertion
n272.out → n271.atom1
n16.out → n271.formula1
n273.out → n271.atom2
n250.out → n271.formula2
n274.out → n271.atom3
n267.out → n271.formula3
n271.out → n258.b
n258.out → n36.b
n36.out → n35.a
n23.out → n276.assertion
n277.out → n276.atom1
n16.out → n276.formula1
n278.out → n276.atom2
n16.out → n276.formula2
n279.out → n276.atom3
n57.out → n276.formula3
n276.out → n35.b
n35.out → n31.b
n31.out → n30.a
n23.out → n281.assertion
n282.out → n281.atom1
n16.out → n281.formula1
n283.out → n281.atom2
n8.out → n281.formula2
n284.out → n281.atom3
n47.out → n281.formula3
n281.out → n30.b
n30.out → n29.a
n11.out → n286.assertion
n287.out → n286.atom1
n16.out → n288.a
n47.out → n288.b
n20.out → n289.a
n288.out → n289.b
n289.out → n286.formula1
n290.out → n286.atom2
n8.out → n286.formula2
n286.out → n29.b
n29.out → n28.a
n23.out → n292.assertion
n293.out → n292.atom1
n8.out → n292.formula1
n294.out → n292.atom2
n20.out → n292.formula2
n295.out → n292.atom3
n288.out → n292.formula3
n292.out → n28.b
n28.out → n1.b
n1.out → n296.proof
```

</details>
