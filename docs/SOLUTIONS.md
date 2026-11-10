# 公理板 · 108 关参考解法清单

> 由 `scripts/export-solutions.js` 从 `src/levels.js` 自动生成。每个参考电路都先经过真实 Engine 求值验证；
> 清单里的模块按参考电路中的节点顺序排列，接线单独列出，按 `模块.端口 → 模块.端口` 连即可。
> 目标槽的节点已在关卡棋盘上，标为 `[target]`。

## 快速索引

| 关 | 标题 | 目标 | 提示 | 模块/接线 |
| --- | --- | --- | --- | --- |
| i | 取出公理 | `⊢ ( P → ( Q → P ) )` | 接一块 A1。 | 1 / 1 |
| ii | 代入 | `⊢ ( ( R → Q ) → ( Q → ( R → Q ) ) )` | 取 A1，把 P 代入 (R→Q)。 | 6 / 6 |
| iii | 分离 | `⊢ ( S → ( P → ( Q → P ) ) )` | A1 与它的实例接 M。 | 8 / 12 |
| iv | 分配公理 | `⊢ ( ( P → ( Q → R ) ) → ( ( P → Q ) → ( P → R ) ) )` | 接一块 A2。 | 1 / 1 |
| v | 逆否公理 | `⊢ ( ( ¬ P → ¬ Q ) → ( Q → P ) )` | 接一块 A3。 | 1 / 1 |
| vi | 定义展开 | `⊢ ( ¬ ( P → ¬ S ) → ( Q → ¬ ( P → ¬ S ) ) )` | 先造一个含 ∧ 的断言，再用 D 展开成原始公式。 | 6 / 7 |
| vii | 定义收缩 | `⊢ ( ( P ∧ R ) → ( Q → ( P ∧ R ) ) )` | 先造原始公式，再用 D⁻ 折回 ∧。 | 8 / 9 |
| viii | 引用已证定理 | `⊢ ( ( P → Q ) → ( R → ( P → Q ) ) )` | 用 theorem 引用第 i 关，再代入。 | 6 / 8 |
| `00` | 同一律 | `⊢ ( P → P )` | 目标是 P→P。从最左的构造块开始，按参考接线接到 ⊢。 | 11 / 18 |
| `01` | 弱化加一层 | `⊢ ( P → ( Q → ( R → P ) ) )` | 目标是 P→Q→R→P。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。 | 15 / 29 |
| `02` | 合取前件引入 · 中间结论 | `⊢ ( ( ¬ ( P → ¬ Q ) → P ) → ( ¬ ( P → ¬ Q ) → ( ( P → ( Q → R ) ) → P ) ) )` | 目标是 (¬(P→¬Q)→P)→¬(P→¬Q)→(P→Q→R)→P。这是〈合取前件引入〉证明里的一个中间结论，按接线把它单独证出来。 | 17 / 32 |
| `03` | 前件合并 · 中间结论 | `⊢ ( Q → ( ( ( P → Q ) → ( P → R ) ) → ( P → Q ) ) )` | 目标是 Q→((P→Q)→P→R)→P→Q。这是〈前件合并〉证明里的一个中间结论，按接线把它单独证出来。 | 17 / 37 |
| `04` | 空真（爆炸） | `⊢ ( ¬ P → ( P → Q ) )` | 目标是 ¬P→P→Q。从最左的构造块开始，按参考接线接到 ⊢。 | 18 / 37 |
| `05` | 前件交换 | `⊢ ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) )` | 目标是 (P→Q)→(R→P)→R→Q。从最左的构造块开始，按参考接线接到 ⊢。 | 18 / 43 |
| `06` | 双重否定爆炸 | `⊢ ( P → ( ¬ P → Q ) )` | 目标是 P→¬P→Q。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。 | 18 / 36 |
| `07` | 前件自应用 | `⊢ ( P → ( ( P → Q ) → Q ) )` | 目标是 P→(P→Q)→Q。从最左的构造块开始，按参考接线接到 ⊢。 | 19 / 40 |
| `08` | 合取消去左 · 中间结论 | `⊢ ( ¬ ¬ ¬ ( P → Q ) → ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) )` | 目标是 ¬¬¬(P→Q)→¬¬(P→Q)→¬(P→Q)。这是〈合取消去左〉证明里的一个中间结论，按接线把它单独证出来。 | 20 / 40 |
| `09` | 等值引入 · 中间结论 | `⊢ ( ¬ ¬ ( P → ¬ Q ) → ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) )` | 目标是 ¬¬(P→¬Q)→¬(P→¬Q)→P→¬Q。这是〈等值引入〉证明里的一个中间结论，按接线把它单独证出来。 | 20 / 40 |
| `10` | 皮尔士律 · 中间结论 | `⊢ ( ( ( P → Q ) → P ) → ( ( ¬ P → ( P → Q ) ) → ( ¬ P → P ) ) )` | 目标是 ((P→Q)→P)→(¬P→P→Q)→¬P→P。这是〈皮尔士律〉证明里的一个中间结论，按接线把它单独证出来。 | 20 / 46 |
| `11` | 矛盾推出否定 · 中间结论 | `⊢ ( ( P → ¬ P ) → ( ( ¬ ¬ P → P ) → ( ¬ ¬ P → ¬ P ) ) )` | 目标是 (P→¬P)→(¬¬P→P)→¬¬P→¬P。这是〈矛盾推出否定〉证明里的一个中间结论，按接线把它单独证出来。 | 20 / 45 |
| `12` | 等值消去右 · 中间结论 | `⊢ ( ¬ ¬ ¬ ( P → ¬ Q ) → ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) )` | 目标是 ¬¬¬(P→¬Q)→¬¬(P→¬Q)→¬(P→¬Q)。这是〈等值消去右〉证明里的一个中间结论，按接线把它单独证出来。 | 21 / 41 |
| `13` | 合取消去左 · 中间结论 | `⊢ ( ¬ ¬ ( P → Q ) → ( ¬ ( P → Q ) → ¬ ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) ) )` | 目标是 ¬¬(P→Q)→¬(P→Q)→¬(¬¬(P→Q)→¬(P→Q))。这是〈合取消去左〉证明里的一个中间结论，按接线把它单独证出来。 | 22 / 43 |
| `14` | 等值引入 · 中间结论 | `⊢ ( ¬ ( P → ¬ Q ) → ( ( P → ¬ Q ) → ¬ ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) ) )` | 目标是 ¬(P→¬Q)→(P→¬Q)→¬(¬(P→¬Q)→P→¬Q)。这是〈等值引入〉证明里的一个中间结论，按接线把它单独证出来。 | 22 / 43 |
| `15` | 矛盾推出否定 · 中间结论 | `⊢ ( ( ( P → ¬ P ) → ( ¬ ¬ P → P ) ) → ( ( P → ¬ P ) → ( ¬ ¬ P → ¬ P ) ) )` | 目标是 ((P→¬P)→¬¬P→P)→(P→¬P)→¬¬P→¬P。这是〈矛盾推出否定〉证明里的一个中间结论，按接线把它单独证出来。 | 22 / 54 |
| `16` | 等值消去右 · 中间结论 | `⊢ ( ¬ ¬ ( P → ¬ Q ) → ( ¬ ( P → ¬ Q ) → ¬ ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) ) )` | 目标是 ¬¬(P→¬Q)→¬(P→¬Q)→¬(¬¬(P→¬Q)→¬(P→¬Q))。这是〈等值消去右〉证明里的一个中间结论，按接线把它单独证出来。 | 23 / 44 |
| `17` | 分情况一 · 中间结论 | `⊢ ( ( P → Q ) → ( ¬ ( ( ¬ P → Q ) → Q ) → ( P → ( ( ¬ P → Q ) → Q ) ) ) )` | 目标是 (P→Q)→¬((¬P→Q)→Q)→P→(¬P→Q)→Q。这是〈分情况一〉证明里的一个中间结论，按接线把它单独证出来。 | 25 / 57 |
| `18` | 反证收尾 | `⊢ ( ( ¬ P → P ) → P )` | 目标是 (¬P→P)→P。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。 | 27 / 58 |
| `19` | 双重否定消去 | `⊢ ( ¬ ¬ P → P )` | 目标是 ¬¬P→P。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。 | 17 / 30 |
| `20` | 等值消去右 · 中间结论 | `⊢ ( ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) → ( ¬ ¬ ( P → ¬ Q ) → ¬ ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) ) )` | (¬¬(P→¬Q)→¬(P→¬Q))→¬¬(P→¬Q)→¬(¬¬(P→¬Q)→¬(P→¬Q)) | 25 / 53 |
| `21` | 合取前件导出 · 中间结论 | `⊢ ( ( P → ( ( ¬ ( P → ¬ Q ) → R ) → ( ¬ ( P → ¬ Q ) → R ) ) ) → ( P → ( ( ¬ ( P → ¬ Q ) → R ) → ( ( Q → ¬ ( P → ¬ Q ) ) → ( Q → R ) ) ) ) )` | (P→(¬(P→¬Q)→R)→¬(P→¬Q)→R)→P→(¬(P→¬Q)→R)→(Q→¬(P→¬Q))→Q→R | 25 / 56 |
| `22` | 双重否定引入 · 中间结论 | `⊢ ( P → ( ( ¬ ¬ ¬ P → P ) → ( ¬ ¬ ¬ P → ¬ P ) ) )` | P→(¬¬¬P→P)→¬¬¬P→¬P | 25 / 56 |
| `23` | 合取前件引入 · 中间结论 | `⊢ ( ( ¬ ( P → ¬ Q ) → ( ( P → ( Q → R ) ) → P ) ) → ( ¬ ( P → ¬ Q ) → ( ( P → ( Q → R ) ) → ( Q → R ) ) ) )` | (¬(P→¬Q)→(P→Q→R)→P)→¬(P→¬Q)→(P→Q→R)→Q→R | 26 / 62 |
| `24` | 前件合并 · 中间结论 | `⊢ ( ( ( ( P → Q ) → ( P → R ) ) → ( P → ( ( P → R ) → R ) ) ) → ( ( ( P → Q ) → ( P → R ) ) → ( P → ( ( Q → ( P → R ) ) → ( Q → R ) ) ) ) )` | (((P→Q)→P→R)→P→(P→R)→R)→((P→Q)→P→R)→P→(Q→P→R)→Q→R | 26 / 60 |
| `25` | 皮尔士回滚 · 中间结论 | `⊢ ( ( ( ( P → Q ) → R ) → ( ( ( ( P → Q ) → P ) → P ) → ( ( ( P → Q ) → P ) → P ) ) ) → ( ( ( P → Q ) → R ) → ( ( ( ( P → Q ) → P ) → P ) → ( ( ( R → P ) → ( ( P → Q ) → P ) ) → ( ( R → P ) → P ) ) ) ) )` | (((P→Q)→R)→(((P→Q)→P)→P)→((P→Q)→P)→P)→((P→Q)→R)→(((P→Q)→P)→P)→((R→P)→(P→Q)→P)→(R→P)→P | 26 / 62 |
| `26` | 否定蕴涵取后件 · 中间结论 | `⊢ ( Q → ( ( ¬ ¬ ¬ ( P → Q ) → Q ) → ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) ) )` | Q→(¬¬¬(P→Q)→Q)→¬¬¬(P→Q)→¬(P→Q) | 26 / 52 |
| `27` | 否定蕴涵取前件 · 中间结论 | `⊢ ( ¬ P → ( ( ¬ ¬ ¬ ( P → Q ) → ¬ P ) → ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) ) )` | ¬P→(¬¬¬(P→Q)→¬P)→¬¬¬(P→Q)→¬(P→Q) | 27 / 59 |
| `28` | 否定蕴涵取后件 · 中间结论 | `⊢ ( ¬ Q → ( ( ¬ ¬ ¬ ( P → ¬ Q ) → ¬ Q ) → ( ¬ ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) ) )` | ¬Q→(¬¬¬(P→¬Q)→¬Q)→¬¬¬(P→¬Q)→¬(P→¬Q) | 27 / 59 |
| `29` | 双重否定引入 · 中间结论 | `⊢ ( ( P → ( ¬ ¬ ¬ P → P ) ) → ( P → ( ¬ ¬ ¬ P → ¬ P ) ) )` | (P→¬¬¬P→P)→P→¬¬¬P→¬P | 27 / 63 |
| `30` | 蕴涵组合 · 中间结论 | `⊢ ( ( R → S ) → ( ( ( P → Q ) → ( ( Q → S ) → ( P → S ) ) ) → ( ( P → Q ) → ( ( ( Q → R ) → ( Q → S ) ) → ( ( Q → R ) → ( P → S ) ) ) ) ) )` | (R→S)→((P→Q)→(Q→S)→P→S)→(P→Q)→((Q→R)→Q→S)→(Q→R)→P→S | 27 / 57 |
| `31` | 逆否 · 中间结论 | `⊢ ( ¬ ¬ P → ( ( P → Q ) → Q ) )` | ¬¬P→(P→Q)→Q | 28 / 64 |
| `32` | 否定蕴涵取后件 · 中间结论 | `⊢ ( ( Q → ( ¬ ¬ ¬ ( P → Q ) → Q ) ) → ( Q → ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) ) )` | (Q→¬¬¬(P→Q)→Q)→Q→¬¬¬(P→Q)→¬(P→Q) | 28 / 61 |
| `33` | 前件合并 · 中间结论 | `⊢ ( Q → ( ( ( P → Q ) → ( P → R ) ) → ( P → R ) ) )` | Q→((P→Q)→P→R)→P→R | 28 / 69 |
| `34` | 否定后件换位 · 中间结论 | `⊢ ( ¬ ¬ P → ( ( P → ¬ Q ) → ¬ Q ) )` | ¬¬P→(P→¬Q)→¬Q | 29 / 65 |
| `35` | 否定蕴涵取前件 · 中间结论 | `⊢ ( ( ¬ P → ( ¬ ¬ ¬ ( P → Q ) → ¬ P ) ) → ( ¬ P → ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) ) )` | (¬P→¬¬¬(P→Q)→¬P)→¬P→¬¬¬(P→Q)→¬(P→Q) | 29 / 68 |
| `36` | 否定蕴涵取后件 · 中间结论 | `⊢ ( ( ¬ Q → ( ¬ ¬ ¬ ( P → ¬ Q ) → ¬ Q ) ) → ( ¬ Q → ( ¬ ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) ) )` | (¬Q→¬¬¬(P→¬Q)→¬Q)→¬Q→¬¬¬(P→¬Q)→¬(P→¬Q) | 29 / 68 |
| `37` | 蕴涵组合 · 中间结论 | `⊢ ( ( ( R → S ) → ( ( P → Q ) → ( ( Q → S ) → ( P → S ) ) ) ) → ( ( R → S ) → ( ( P → Q ) → ( ( ( Q → R ) → ( Q → S ) ) → ( ( Q → R ) → ( P → S ) ) ) ) ) )` | ((R→S)→(P→Q)→(Q→S)→P→S)→(R→S)→(P→Q)→((Q→R)→Q→S)→(Q→R)→P→S | 29 / 66 |
| `38` | 前件交换 · 中间结论 | `⊢ ( ( P → ( Q → R ) ) → ( Q → ( ( P → ( Q → R ) ) → ( P → R ) ) ) )` | (P→Q→R)→Q→(P→Q→R)→P→R | 29 / 70 |
| `39` | 双重否定引入 · 中间结论 | `⊢ ( P → ( ¬ ¬ ¬ P → ¬ P ) )` | P→¬¬¬P→¬P | 29 / 68 |
| `40` | 逆否 · 中间结论 | `⊢ ( ( ¬ ¬ P → ( P → Q ) ) → ( ¬ ¬ P → Q ) )` | (¬¬P→P→Q)→¬¬P→Q | 30 / 73 |
| `41` | 前件合并 · 中间结论 | `⊢ ( ( Q → ( ( P → Q ) → ( P → R ) ) ) → ( Q → ( P → R ) ) )` | (Q→(P→Q)→P→R)→Q→P→R | 30 / 78 |
| `42` | 合取前件导出 · 中间结论 | `⊢ ( P → ( ( ¬ ( P → ¬ Q ) → R ) → ( ( Q → ¬ ( P → ¬ Q ) ) → ( Q → R ) ) ) )` | P→(¬(P→¬Q)→R)→(Q→¬(P→¬Q))→Q→R | 30 / 68 |
| `43` | 否定蕴涵取后件 · 中间结论 | `⊢ ( Q → ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) )` | Q→¬¬¬(P→Q)→¬(P→Q) | 30 / 68 |
| `44` | 合取的蕴涵形式 | `⊢ ( P → ( Q → ¬ ( P → ¬ Q ) ) )` | P→Q→¬(P→¬Q) | 31 / 66 |
| `45` | 否定蕴涵取前件 · 中间结论 | `⊢ ( ¬ P → ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) )` | ¬P→¬¬¬(P→Q)→¬(P→Q) | 31 / 75 |
| `46` | 否定蕴涵取后件 · 中间结论 | `⊢ ( ¬ Q → ( ¬ ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) )` | ¬Q→¬¬¬(P→¬Q)→¬(P→¬Q) | 31 / 75 |
| `47` | 否定后件换位 · 中间结论 | `⊢ ( ( ¬ ¬ P → ( P → ¬ Q ) ) → ( ¬ ¬ P → ¬ Q ) )` | (¬¬P→P→¬Q)→¬¬P→¬Q | 31 / 74 |
| `48` | 前件合并 · 中间结论 | `⊢ ( ( ( P → Q ) → ( P → R ) ) → ( P → ( ( Q → ( P → R ) ) → ( Q → R ) ) ) )` | ((P→Q)→P→R)→P→(Q→P→R)→Q→R | 31 / 72 |
| `49` | 皮尔士回滚 · 中间结论 | `⊢ ( ( ( P → Q ) → R ) → ( ( ( ( P → Q ) → P ) → P ) → ( ( ( R → P ) → ( ( P → Q ) → P ) ) → ( ( R → P ) → P ) ) ) )` | ((P→Q)→R)→(((P→Q)→P)→P)→((R→P)→(P→Q)→P)→(R→P)→P | 31 / 74 |
| `50` | 反件消去 · 中间结论 | `⊢ ( Q → ( ( ( P → Q ) → R ) → R ) )` | Q→((P→Q)→R)→R | 32 / 84 |
| `51` | 等值引入 · 中间结论 | `⊢ ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( P → ¬ Q ) ) )` | (¬(P→¬Q)→P→¬Q)→(¬(P→¬Q)→P→¬Q)→P→¬Q | 33 / 81 |
| `52` | 等值消去右 · 中间结论 | `⊢ ( ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) → ( ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) → ¬ ( P → ¬ Q ) ) )` | (¬¬(P→¬Q)→¬(P→¬Q))→(¬¬(P→¬Q)→¬(P→¬Q))→¬(P→¬Q) | 34 / 82 |
| `53` | 反件左消 · 中间结论 | `⊢ ( ( ¬ P → ( ( P → Q ) → R ) ) → ( ¬ P → R ) )` | (¬P→(P→Q)→R)→¬P→R | 35 / 91 |
| `54` | 等值引入 · 中间结论 | `⊢ ( ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) ) → ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( P → ¬ Q ) ) )` | ((¬(P→¬Q)→P→¬Q)→¬(P→¬Q)→P→¬Q)→(¬(P→¬Q)→P→¬Q)→P→¬Q | 35 / 90 |
| `55` | 前件合并 · 中间结论 | `⊢ ( ( ( ( P → Q ) → ( P → R ) ) → ( Q → ( ( P → Q ) → ( P → R ) ) ) ) → ( ( ( P → Q ) → ( P → R ) ) → ( Q → ( P → R ) ) ) )` | (((P→Q)→P→R)→Q→(P→Q)→P→R)→((P→Q)→P→R)→Q→P→R | 37 / 100 |
| `56` | 否定后件换位 · 中间结论 | `⊢ ( ( ( P → ¬ Q ) → ( ¬ ¬ P → ( P → ¬ Q ) ) ) → ( ( P → ¬ Q ) → ( ¬ ¬ P → ¬ Q ) ) )` | ((P→¬Q)→¬¬P→P→¬Q)→(P→¬Q)→¬¬P→¬Q | 38 / 96 |
| `57` | 前件合并 · 中间结论 | `⊢ ( ( ( P → Q ) → ( P → R ) ) → ( Q → ( P → R ) ) )` | ((P→Q)→P→R)→Q→P→R | 39 / 105 |
| `58` | 逆否 · 中间结论 | `⊢ ( ( P → Q ) → ( ¬ ¬ P → Q ) )` | (P→Q)→¬¬P→Q | 39 / 102 |
| `59` | 否定蕴涵取后件 · 中间结论 | `⊢ ( ¬ Q → ( ( P → ¬ Q ) → ¬ ¬ ( P → ¬ Q ) ) )` | ¬Q→(P→¬Q)→¬¬(P→¬Q) | 40 / 102 |
| `60` | 否定后件换位 · 中间结论 | `⊢ ( ( P → ¬ Q ) → ( ¬ ¬ P → ¬ Q ) )` | (P→¬Q)→¬¬P→¬Q | 40 / 103 |
| `61` | 合取前件导出 · 中间结论 | `⊢ ( P → ( ( ( ¬ ( P → ¬ Q ) → R ) → ( Q → ¬ ( P → ¬ Q ) ) ) → ( ( ¬ ( P → ¬ Q ) → R ) → ( Q → R ) ) ) )` | P→((¬(P→¬Q)→R)→Q→¬(P→¬Q))→(¬(P→¬Q)→R)→Q→R | 40 / 99 |
| `62` | 前件合并 · 中间结论 | `⊢ ( ( ( P → Q ) → ( P → R ) ) → ( ( P → ( Q → ( P → R ) ) ) → ( P → ( Q → R ) ) ) )` | ((P→Q)→P→R)→(P→Q→P→R)→P→Q→R | 41 / 103 |
| `63` | 皮尔士回滚 · 中间结论 | `⊢ ( ( ( P → Q ) → R ) → ( ( ( ( ( P → Q ) → P ) → P ) → ( ( R → P ) → ( ( P → Q ) → P ) ) ) → ( ( ( ( P → Q ) → P ) → P ) → ( ( R → P ) → P ) ) ) )` | ((P→Q)→R)→((((P→Q)→P)→P)→(R→P)→(P→Q)→P)→(((P→Q)→P)→P)→(R→P)→P | 41 / 107 |
| `64` | 双重否定引入 | `⊢ ( P → ¬ ¬ P )` | P→¬¬P | 42 / 102 |
| `65` | 分情况一 · 中间结论 | `⊢ ( ( ( P → Q ) → ( ¬ P → ( ( ¬ P → Q ) → Q ) ) ) → ( ( P → Q ) → ( ¬ P → ¬ ¬ ( ( ¬ P → Q ) → Q ) ) ) )` | ((P→Q)→¬P→(¬P→Q)→Q)→(P→Q)→¬P→¬¬((¬P→Q)→Q) | 25 / 53 |
| `66` | 逆否换位 | `⊢ ( ( ¬ P → Q ) → ( ¬ Q → P ) )` | (¬P→Q)→¬Q→P | 26 / 52 |
| `67` | 矛盾消去 · 中间结论 | `⊢ ( ( ( P → ¬ Q ) → ( ¬ P → ( ( P → Q ) → ¬ P ) ) ) → ( ( P → ¬ Q ) → ( ¬ P → ¬ ¬ ( ( P → Q ) → ¬ P ) ) ) )` | ((P→¬Q)→¬P→(P→Q)→¬P)→(P→¬Q)→¬P→¬¬((P→Q)→¬P) | 26 / 54 |
| `68` | 矛盾推出否定 · 中间结论 | `⊢ ( ( P → ¬ P ) → ( ¬ P → ¬ ¬ ¬ P ) )` | (P→¬P)→¬P→¬¬¬P | 27 / 59 |
| `69` | 矛盾消去 · 中间结论 | `⊢ ( ( P → ¬ Q ) → ( ¬ P → ¬ ¬ ( ( P → Q ) → ¬ P ) ) )` | (P→¬Q)→¬P→¬¬((P→Q)→¬P) | 30 / 68 |
| `70` | 合取消去左 · 中间结论 | `⊢ ( ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) → ¬ ( P → Q ) )` | (¬¬(P→Q)→¬(P→Q))→¬(P→Q) | 42 / 115 |
| `71` | 反件左消 · 中间结论 | `⊢ ( ( ( ( P → Q ) → R ) → ( ¬ P → ( ( P → Q ) → R ) ) ) → ( ( ( P → Q ) → R ) → ( ¬ P → R ) ) )` | (((P→Q)→R)→¬P→(P→Q)→R)→((P→Q)→R)→¬P→R | 42 / 113 |
| `72` | 反件消去 | `⊢ ( ( ( P → Q ) → R ) → ( Q → R ) )` | ((P→Q)→R)→Q→R | 43 / 118 |
| `73` | 前件交换 | `⊢ ( ( P → ( Q → R ) ) → ( Q → ( P → R ) ) )` | (P→Q→R)→Q→P→R | 43 / 117 |
| `74` | 皮尔士回滚 · 中间结论 | `⊢ ( ( ( ( P → Q ) → R ) → ( ( ( ( P → Q ) → P ) → P ) → ( ( R → P ) → ( ( P → Q ) → P ) ) ) ) → ( ( ( P → Q ) → R ) → ( ( ( ( P → Q ) → P ) → P ) → ( ( R → P ) → P ) ) ) )` | (((P→Q)→R)→(((P→Q)→P)→P)→(R→P)→(P→Q)→P)→((P→Q)→R)→(((P→Q)→P)→P)→(R→P)→P | 43 / 116 |
| `75` | 反件左消 | `⊢ ( ( ( P → Q ) → R ) → ( ¬ P → R ) )` | ((P→Q)→R)→¬P→R | 44 / 120 |
| `76` | 否定蕴涵取后件 | `⊢ ( ¬ ( P → ¬ Q ) → Q )` | ¬(P→¬Q)→Q | 46 / 125 |
| `77` | 否定蕴涵取前件 | `⊢ ( ¬ ( P → Q ) → P )` | ¬(P→Q)→P | 46 / 118 |
| `78` | 皮尔士律 · 中间结论 | `⊢ ( ( ( P → Q ) → P ) → ( ¬ ( P → Q ) → ¬ ¬ P ) )` | ((P→Q)→P)→¬(P→Q)→¬¬P | 27 / 57 |
| `79` | 否定蕴涵分配二 · 中间结论 | `⊢ ( ¬ ( P → Q ) → ( ¬ R → ¬ ¬ P ) )` | ¬(P→Q)→¬R→¬¬P | 32 / 72 |
| `80` | 合取前件引入 · 中间结论 | `⊢ ( ¬ ( P → ¬ Q ) → ( ( P → ( Q → R ) ) → ( Q → R ) ) )` | ¬(P→¬Q)→(P→Q→R)→Q→R | 36 / 90 |
| `81` | 皮尔士律 · 中间结论 | `⊢ ( ( ( P → Q ) → P ) → ( ¬ P → ( P → Q ) ) )` | ((P→Q)→P)→¬P→P→Q | 36 / 84 |
| `82` | 否定蕴涵分配二 | `⊢ ( ¬ ( P → Q ) → ( ¬ P → R ) )` | ¬(P→Q)→¬P→R | 41 / 99 |
| `83` | 合取前件引入 · 中间结论 | `⊢ ( ( P → ( Q → R ) ) → ( ( ¬ ( P → ¬ Q ) → ( P → ( Q → R ) ) ) → ( ¬ ( P → ¬ Q ) → ( Q → R ) ) ) )` | (P→Q→R)→(¬(P→¬Q)→P→Q→R)→¬(P→¬Q)→Q→R | 43 / 112 |
| `84` | 先否后件 | `⊢ ( P → ( ¬ Q → ¬ ( P → Q ) ) )` | P→¬Q→¬(P→Q) | 46 / 108 |
| `85` | 否定后件换位 | `⊢ ( ( P → ¬ Q ) → ( Q → ¬ P ) )` | (P→¬Q)→Q→¬P | 49 / 128 |
| `86` | 合取前件导出 | `⊢ ( ( ¬ ( P → ¬ Q ) → R ) → ( P → ( Q → R ) ) )` | (¬(P→¬Q)→R)→P→Q→R | 62 / 167 |
| `87` | 合取前件引入 | `⊢ ( ( P → ( Q → R ) ) → ( ¬ ( P → ¬ Q ) → R ) )` | (P→Q→R)→¬(P→¬Q)→R | 63 / 175 |
| `88` | 逆否 | `⊢ ( ( P → Q ) → ( ¬ Q → ¬ P ) )` | (P→Q)→¬Q→¬P | 64 / 172 |
| `89` | 矛盾消去 · 中间结论 | `⊢ ( ( P → ¬ Q ) → ( P → ( ( P → Q ) → ¬ P ) ) )` | (P→¬Q)→P→(P→Q)→¬P | 25 / 59 |
| `90` | 矛盾推出否定 | `⊢ ( ( P → ¬ P ) → ¬ P )` | (P→¬P)→¬P | 77 / 225 |
| `91` | 皮尔士律 | `⊢ ( ( ( P → Q ) → P ) → P )` | ((P→Q)→P)→P | 79 / 225 |
| `92` | 等值引入 | `⊢ ( ( P → Q ) → ( ( Q → P ) → ( P ↔ Q ) ) )` | A→B 与 B→A 一起给出 A↔B。 | 80 / 233 |
| `93` | 前件合并 | `⊢ ( ( ( P → Q ) → ( P → R ) ) → ( P → ( Q → R ) ) )` | ((P→Q)→P→R)→P→Q→R | 81 / 235 |
| `94` | 否定蕴涵取后件 | `⊢ ( ¬ ( P → Q ) → ¬ Q )` | ¬(P→Q)→¬Q | 90 / 256 |
| `95` | 等值消去右 | `⊢ ( ( P ↔ Q ) → ( Q → P ) )` | A↔B 给出 B→A。 | 95 / 292 |
| `96` | 合取消去左 | `⊢ ( ( P ∧ Q ) → P )` | P∧Q 给出 P。 | 102 / 312 |
| `97` | 等值消去左 | `⊢ ( ( P ↔ Q ) → ( P → Q ) )` | A↔B 给出 A→B。 | 104 / 317 |
| `98` | 分情况一 | `⊢ ( ( ¬ P → Q ) → ( ( P → Q ) → Q ) )` | (¬P→Q)→(P→Q)→Q | 111 / 332 |
| `99` | 矛盾消去 | `⊢ ( ( P → Q ) → ( ( P → ¬ Q ) → ¬ P ) )` | (P→Q)→(P→¬Q)→¬P | 112 / 332 |

## 课程

### i · 取出公理

- 目标：`⊢ ( P → ( Q → P ) )`
- 提示：接一块 A1。
- 参考解：1 个模块 / 1 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n2  target
n1  axiom A1

wires:
n1.out -> n2.proof
```

</details>

### ii · 代入

- 目标：`⊢ ( ( R → Q ) → ( Q → ( R → Q ) ) )`
- 提示：取 A1，把 P 代入 (R→Q)。
- 参考解：6 个模块 / 6 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n7  target
n1  axiom A1
n2  subst S
n3  atom P
n4  atom R
n5  atom Q
n6  imp

wires:
n1.out -> n2.assertion
n3.out -> n2.atom1
n4.out -> n6.a
n5.out -> n6.b
n6.out -> n2.formula1
n2.out -> n7.proof
```

</details>

### iii · 分离

- 目标：`⊢ ( S → ( P → ( Q → P ) ) )`
- 提示：A1 与它的实例接 M。
- 参考解：8 个模块 / 12 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n12  target
n1  mp M
n2  axiom A1
n4  subst S
n5  atom P
n7  atom Q
n8  imp
n9  imp
n11  atom S

wires:
n2.out -> n1.a
n2.out -> n4.assertion
n5.out -> n4.atom1
n7.out -> n8.a
n5.out -> n8.b
n5.out -> n9.a
n8.out -> n9.b
n9.out -> n4.formula1
n7.out -> n4.atom2
n11.out -> n4.formula2
n4.out -> n1.b
n1.out -> n12.proof
```

</details>

### iv · 分配公理

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( ( P → Q ) → ( P → R ) ) )`
- 提示：接一块 A2。
- 参考解：1 个模块 / 1 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n2  target
n1  axiom A2

wires:
n1.out -> n2.proof
```

</details>

### v · 逆否公理

- 目标：`⊢ ( ( ¬ P → ¬ Q ) → ( Q → P ) )`
- 提示：接一块 A3。
- 参考解：1 个模块 / 1 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n2  target
n1  axiom A3

wires:
n1.out -> n2.proof
```

</details>

### vi · 定义展开

- 目标：`⊢ ( ¬ ( P → ¬ S ) → ( Q → ¬ ( P → ¬ S ) ) )`
- 提示：先造一个含 ∧ 的断言，再用 D 展开成原始公式。
- 参考解：6 个模块 / 7 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n8  target
n1  def-expand D
n2  axiom A1
n3  subst S
n4  atom P
n6  atom S
n7  and

wires:
n2.out -> n3.assertion
n4.out -> n3.atom1
n4.out -> n7.a
n6.out -> n7.b
n7.out -> n3.formula1
n3.out -> n1.assertion
n1.out -> n8.proof
```

</details>

### vii · 定义收缩

- 目标：`⊢ ( ( P ∧ R ) → ( Q → ( P ∧ R ) ) )`
- 提示：先造原始公式，再用 D⁻ 折回 ∧。
- 参考解：8 个模块 / 9 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n10  target
n1  def-contract D⁻
n2  axiom A1
n3  subst S
n4  atom P
n6  atom R
n7  not
n8  imp
n9  not

wires:
n2.out -> n3.assertion
n4.out -> n3.atom1
n6.out -> n7.a
n4.out -> n8.a
n7.out -> n8.b
n8.out -> n9.a
n9.out -> n3.formula1
n3.out -> n1.assertion
n1.out -> n10.proof
```

</details>

### viii · 引用已证定理

- 目标：`⊢ ( ( P → Q ) → ( R → ( P → Q ) ) )`
- 提示：用 theorem 引用第 i 关，再代入。
- 参考解：6 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n9  target
n1  theorem *i
n2  subst S
n3  atom P
n5  atom Q
n6  imp
n8  atom R

wires:
n1.out -> n2.assertion
n3.out -> n2.atom1
n3.out -> n6.a
n5.out -> n6.b
n6.out -> n2.formula1
n5.out -> n2.atom2
n8.out -> n2.formula2
n2.out -> n9.proof
```

</details>

### 00 · 同一律

- 目标：`⊢ ( P → P )`
- 提示：目标是 P→P。从最左的构造块开始，按参考接线接到 ⊢。
- 参考解：11 个模块 / 18 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n12  target
n1  mp M
n2  axiom A1
n3  subst S
n4  atom Q
n5  atom P
n6  mp M
n7  subst S
n8  imp
n9  axiom A2
n10  subst S
n11  atom R

wires:
n2.out -> n3.assertion
n4.out -> n3.atom1
n5.out -> n3.formula1
n2.out -> n7.assertion
n5.out -> n8.a
n5.out -> n8.b
n4.out -> n7.atom1
n8.out -> n7.formula1
n9.out -> n10.assertion
n4.out -> n10.atom1
n8.out -> n10.formula1
n11.out -> n10.atom2
n5.out -> n10.formula2
n7.out -> n6.a
n10.out -> n6.b
n3.out -> n1.a
n6.out -> n1.b
n1.out -> n12.proof
```

</details>

### 01 · 弱化加一层

- 目标：`⊢ ( P → ( Q → ( R → P ) ) )`
- 提示：目标是 P→Q→R→P。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。
- 参考解：15 个模块 / 29 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n37  target
n1  mp M
n6  axiom A1
n7  subst S
n8  atom Q
n9  atom R
n12  atom P
n14  imp
n17  axiom A2
n21  mp M
n22  mp M
n24  subst S
n27  subst S
n30  imp
n31  imp
n34  subst S

wires:
n6.out -> n7.assertion
n8.out -> n7.atom1
n9.out -> n7.formula1
n9.out -> n14.a
n12.out -> n14.b
n7.out -> n1.a
n6.out -> n24.assertion
n12.out -> n24.atom1
n14.out -> n24.formula1
n24.out -> n22.a
n6.out -> n27.assertion
n12.out -> n27.atom1
n8.out -> n30.a
n14.out -> n30.b
n14.out -> n31.a
n30.out -> n31.b
n31.out -> n27.formula1
n8.out -> n27.atom2
n12.out -> n27.formula2
n27.out -> n22.b
n22.out -> n21.a
n17.out -> n34.assertion
n8.out -> n34.atom1
n14.out -> n34.formula1
n9.out -> n34.atom2
n30.out -> n34.formula2
n34.out -> n21.b
n21.out -> n1.b
n1.out -> n37.proof
```

</details>

### 02 · 合取前件引入 · 中间结论

- 目标：`⊢ ( ( ¬ ( P → ¬ Q ) → P ) → ( ¬ ( P → ¬ Q ) → ( ( P → ( Q → R ) ) → P ) ) )`
- 提示：目标是 (¬(P→¬Q)→P)→¬(P→¬Q)→(P→Q→R)→P。这是〈合取前件引入〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：17 个模块 / 32 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n4  axiom A1
n6  atom P
n8  atom Q
n9  not
n10  imp
n11  not
n14  atom R
n15  imp
n16  imp
n36  axiom A2
n49  mp M
n50  mp M
n52  subst S
n55  subst S
n57  imp
n58  imp
n61  subst S

wires:
n8.out -> n9.a
n6.out -> n10.a
n9.out -> n10.b
n10.out -> n11.a
n8.out -> n15.a
n14.out -> n15.b
n6.out -> n16.a
n15.out -> n16.b
n4.out -> n52.assertion
n8.out -> n52.atom1
n16.out -> n52.formula1
n52.out -> n50.a
n4.out -> n55.assertion
n6.out -> n55.atom1
n16.out -> n57.a
n6.out -> n57.b
n6.out -> n58.a
n57.out -> n58.b
n58.out -> n55.formula1
n8.out -> n55.atom2
n11.out -> n55.formula2
n55.out -> n50.b
n50.out -> n49.a
n36.out -> n61.assertion
n6.out -> n61.atom1
n11.out -> n61.formula1
n8.out -> n61.atom2
n6.out -> n61.formula2
n14.out -> n61.atom3
n57.out -> n61.formula3
n61.out -> n49.b
n49.out -> tgt.proof
```

</details>

### 03 · 前件合并 · 中间结论

- 目标：`⊢ ( Q → ( ( ( P → Q ) → ( P → R ) ) → ( P → Q ) ) )`
- 提示：目标是 Q→((P→Q)→P→R)→P→Q。这是〈前件合并〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：17 个模块 / 37 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n7  atom P
n9  atom Q
n10  imp
n11  atom R
n12  imp
n13  imp
n16  axiom A1
n25  axiom A2
n34  mp M
n36  subst S
n39  mp M
n40  mp M
n42  subst S
n46  subst S
n48  imp
n49  imp
n51  subst S

wires:
n7.out -> n10.a
n9.out -> n10.b
n7.out -> n12.a
n11.out -> n12.b
n10.out -> n13.a
n12.out -> n13.b
n16.out -> n36.assertion
n7.out -> n36.atom1
n9.out -> n36.formula1
n9.out -> n36.atom2
n7.out -> n36.formula2
n36.out -> n34.a
n16.out -> n42.assertion
n7.out -> n42.atom1
n10.out -> n42.formula1
n9.out -> n42.atom2
n13.out -> n42.formula2
n42.out -> n40.a
n16.out -> n46.assertion
n7.out -> n46.atom1
n13.out -> n48.a
n10.out -> n48.b
n10.out -> n49.a
n48.out -> n49.b
n49.out -> n46.formula1
n46.out -> n40.b
n40.out -> n39.a
n25.out -> n51.assertion
n7.out -> n51.atom1
n9.out -> n51.formula1
n9.out -> n51.atom2
n10.out -> n51.formula2
n11.out -> n51.atom3
n48.out -> n51.formula3
n51.out -> n39.b
n39.out -> n34.b
n34.out -> tgt.proof
```

</details>

### 04 · 空真（爆炸）

- 目标：`⊢ ( ¬ P → ( P → Q ) )`
- 提示：目标是 ¬P→P→Q。从最左的构造块开始，按参考接线接到 ⊢。
- 参考解：18 个模块 / 37 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n19  target
n1  mp M
n2  atom P
n3  not
n4  axiom A1
n5  subst S
n6  atom Q
n7  not
n8  imp
n9  axiom A2
n10  atom R
n11  mp M
n12  mp M
n13  axiom A3
n14  subst S
n15  subst S
n16  imp
n17  imp
n18  subst S

wires:
n2.out -> n3.a
n4.out -> n5.assertion
n2.out -> n5.atom1
n3.out -> n5.formula1
n6.out -> n7.a
n6.out -> n5.atom2
n7.out -> n5.formula2
n7.out -> n8.a
n3.out -> n8.b
n13.out -> n14.assertion
n2.out -> n14.atom1
n6.out -> n14.formula1
n6.out -> n14.atom2
n2.out -> n14.formula2
n4.out -> n15.assertion
n2.out -> n16.a
n6.out -> n16.b
n8.out -> n17.a
n16.out -> n17.b
n2.out -> n15.atom1
n17.out -> n15.formula1
n6.out -> n15.atom2
n3.out -> n15.formula2
n14.out -> n12.a
n15.out -> n12.b
n9.out -> n18.assertion
n2.out -> n18.atom1
n3.out -> n18.formula1
n6.out -> n18.atom2
n8.out -> n18.formula2
n10.out -> n18.atom3
n16.out -> n18.formula3
n12.out -> n11.a
n18.out -> n11.b
n5.out -> n1.a
n11.out -> n1.b
n1.out -> n19.proof
```

</details>

### 05 · 前件交换

- 目标：`⊢ ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) )`
- 提示：目标是 (P→Q)→(R→P)→R→Q。从最左的构造块开始，按参考接线接到 ⊢。
- 参考解：18 个模块 / 43 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n19  target
n1  mp M
n2  atom P
n3  atom Q
n4  imp
n5  axiom A1
n6  subst S
n7  atom R
n8  imp
n9  axiom A2
n10  mp M
n11  mp M
n12  subst S
n13  subst S
n14  imp
n15  imp
n16  imp
n17  imp
n18  subst S

wires:
n2.out -> n4.a
n3.out -> n4.b
n5.out -> n6.assertion
n2.out -> n6.atom1
n4.out -> n6.formula1
n3.out -> n6.atom2
n7.out -> n6.formula2
n7.out -> n8.a
n4.out -> n8.b
n9.out -> n12.assertion
n2.out -> n12.atom1
n7.out -> n12.formula1
n3.out -> n12.atom2
n2.out -> n12.formula2
n7.out -> n12.atom3
n3.out -> n12.formula3
n5.out -> n13.assertion
n7.out -> n14.a
n2.out -> n14.b
n7.out -> n15.a
n3.out -> n15.b
n14.out -> n16.a
n15.out -> n16.b
n8.out -> n17.a
n16.out -> n17.b
n2.out -> n13.atom1
n17.out -> n13.formula1
n3.out -> n13.atom2
n4.out -> n13.formula2
n12.out -> n11.a
n13.out -> n11.b
n9.out -> n18.assertion
n2.out -> n18.atom1
n4.out -> n18.formula1
n3.out -> n18.atom2
n8.out -> n18.formula2
n7.out -> n18.atom3
n16.out -> n18.formula3
n11.out -> n10.a
n18.out -> n10.b
n6.out -> n1.a
n10.out -> n1.b
n1.out -> n19.proof
```

</details>

### 06 · 双重否定爆炸

- 目标：`⊢ ( P → ( ¬ P → Q ) )`
- 提示：目标是 P→¬P→Q。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。
- 参考解：18 个模块 / 36 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n41  target
n1  mp M
n6  axiom A1
n7  subst S
n8  atom Q
n9  atom P
n10  not
n14  imp
n17  axiom A2
n20  atom R
n21  mp M
n22  mp M
n23  mp M
n24  theorem *04
n26  subst S
n32  subst S
n34  imp
n35  imp
n38  subst S

wires:
n6.out -> n7.assertion
n8.out -> n7.atom1
n9.out -> n10.a
n10.out -> n7.formula1
n10.out -> n14.a
n9.out -> n14.b
n7.out -> n1.a
n24.out -> n23.a
n17.out -> n26.assertion
n9.out -> n26.atom1
n10.out -> n26.formula1
n8.out -> n26.atom2
n9.out -> n26.formula2
n20.out -> n26.atom3
n8.out -> n26.formula3
n26.out -> n23.b
n23.out -> n22.a
n6.out -> n32.assertion
n9.out -> n32.atom1
n10.out -> n34.a
n8.out -> n34.b
n14.out -> n35.a
n34.out -> n35.b
n35.out -> n32.formula1
n8.out -> n32.atom2
n9.out -> n32.formula2
n32.out -> n22.b
n22.out -> n21.a
n17.out -> n38.assertion
n8.out -> n38.atom1
n14.out -> n38.formula1
n20.out -> n38.atom2
n34.out -> n38.formula2
n38.out -> n21.b
n21.out -> n1.b
n1.out -> n41.proof
```

</details>

### 07 · 前件自应用

- 目标：`⊢ ( P → ( ( P → Q ) → Q ) )`
- 提示：目标是 P→(P→Q)→Q。从最左的构造块开始，按参考接线接到 ⊢。
- 参考解：19 个模块 / 40 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n20  target
n1  mp M
n2  theorem *00
n3  axiom A1
n4  subst S
n5  atom Q
n6  atom P
n7  imp
n8  imp
n9  axiom A2
n10  atom R
n11  mp M
n12  mp M
n13  mp M
n14  subst S
n15  subst S
n16  subst S
n17  imp
n18  imp
n19  subst S

wires:
n3.out -> n4.assertion
n6.out -> n7.a
n5.out -> n7.b
n5.out -> n4.atom1
n7.out -> n4.formula1
n7.out -> n8.a
n6.out -> n8.b
n2.out -> n14.assertion
n6.out -> n14.atom1
n7.out -> n14.formula1
n9.out -> n15.assertion
n6.out -> n15.atom1
n7.out -> n15.formula1
n5.out -> n15.atom2
n6.out -> n15.formula2
n10.out -> n15.atom3
n5.out -> n15.formula3
n14.out -> n13.a
n15.out -> n13.b
n3.out -> n16.assertion
n7.out -> n17.a
n5.out -> n17.b
n8.out -> n18.a
n17.out -> n18.b
n6.out -> n16.atom1
n18.out -> n16.formula1
n5.out -> n16.atom2
n6.out -> n16.formula2
n13.out -> n12.a
n16.out -> n12.b
n9.out -> n19.assertion
n5.out -> n19.atom1
n8.out -> n19.formula1
n10.out -> n19.atom2
n17.out -> n19.formula2
n12.out -> n11.a
n19.out -> n11.b
n4.out -> n1.a
n11.out -> n1.b
n1.out -> n20.proof
```

</details>

### 08 · 合取消去左 · 中间结论

- 目标：`⊢ ( ¬ ¬ ¬ ( P → Q ) → ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) )`
- 提示：目标是 ¬¬¬(P→Q)→¬¬(P→Q)→¬(P→Q)。这是〈合取消去左〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：20 个模块 / 40 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n7  axiom A1
n9  atom P
n12  atom Q
n19  axiom A2
n23  atom R
n45  axiom A3
n52  imp
n70  not
n71  not
n72  not
n90  mp M
n111  subst S
n117  imp
n125  mp M
n126  mp M
n128  subst S
n132  subst S
n134  imp
n135  imp
n138  subst S

wires:
n9.out -> n52.a
n12.out -> n52.b
n52.out -> n70.a
n70.out -> n71.a
n71.out -> n72.a
n7.out -> n111.assertion
n9.out -> n111.atom1
n72.out -> n111.formula1
n12.out -> n111.atom2
n71.out -> n111.formula2
n71.out -> n117.a
n72.out -> n117.b
n111.out -> n90.a
n45.out -> n128.assertion
n9.out -> n128.atom1
n70.out -> n128.formula1
n12.out -> n128.atom2
n71.out -> n128.formula2
n128.out -> n126.a
n7.out -> n132.assertion
n9.out -> n132.atom1
n71.out -> n134.a
n70.out -> n134.b
n117.out -> n135.a
n134.out -> n135.b
n135.out -> n132.formula1
n12.out -> n132.atom2
n72.out -> n132.formula2
n132.out -> n126.b
n126.out -> n125.a
n19.out -> n138.assertion
n9.out -> n138.atom1
n72.out -> n138.formula1
n12.out -> n138.atom2
n117.out -> n138.formula2
n23.out -> n138.atom3
n134.out -> n138.formula3
n138.out -> n125.b
n125.out -> n90.b
n90.out -> tgt.proof
```

</details>

### 09 · 等值引入 · 中间结论

- 目标：`⊢ ( ¬ ¬ ( P → ¬ Q ) → ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) )`
- 提示：目标是 ¬¬(P→¬Q)→¬(P→¬Q)→P→¬Q。这是〈等值引入〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：20 个模块 / 40 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n6  axiom A1
n8  atom Q
n9  atom P
n15  axiom A2
n18  atom R
n25  not
n26  imp
n27  not
n28  not
n45  mp M
n66  subst S
n72  imp
n80  mp M
n81  mp M
n82  axiom A3
n83  subst S
n87  subst S
n89  imp
n90  imp
n93  subst S

wires:
n8.out -> n25.a
n9.out -> n26.a
n25.out -> n26.b
n26.out -> n27.a
n27.out -> n28.a
n6.out -> n66.assertion
n9.out -> n66.atom1
n28.out -> n66.formula1
n8.out -> n66.atom2
n27.out -> n66.formula2
n27.out -> n72.a
n28.out -> n72.b
n66.out -> n45.a
n82.out -> n83.assertion
n9.out -> n83.atom1
n26.out -> n83.formula1
n8.out -> n83.atom2
n27.out -> n83.formula2
n83.out -> n81.a
n6.out -> n87.assertion
n9.out -> n87.atom1
n27.out -> n89.a
n26.out -> n89.b
n72.out -> n90.a
n89.out -> n90.b
n90.out -> n87.formula1
n8.out -> n87.atom2
n28.out -> n87.formula2
n87.out -> n81.b
n81.out -> n80.a
n15.out -> n93.assertion
n9.out -> n93.atom1
n28.out -> n93.formula1
n8.out -> n93.atom2
n72.out -> n93.formula2
n18.out -> n93.atom3
n89.out -> n93.formula3
n93.out -> n80.b
n80.out -> n45.b
n45.out -> tgt.proof
```

</details>

### 10 · 皮尔士律 · 中间结论

- 目标：`⊢ ( ( ( P → Q ) → P ) → ( ( ¬ P → ( P → Q ) ) → ( ¬ P → P ) ) )`
- 提示：目标是 ((P→Q)→P)→(¬P→P→Q)→¬P→P。这是〈皮尔士律〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：20 个模块 / 46 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n4  atom P
n6  atom Q
n7  imp
n8  imp
n17  axiom A1
n31  not
n35  axiom A2
n39  atom R
n60  imp
n69  mp M
n87  subst S
n93  imp
n101  mp M
n102  mp M
n104  subst S
n109  subst S
n111  imp
n112  imp
n113  imp
n116  subst S

wires:
n4.out -> n7.a
n6.out -> n7.b
n7.out -> n8.a
n4.out -> n8.b
n4.out -> n31.a
n31.out -> n60.a
n7.out -> n60.b
n17.out -> n87.assertion
n4.out -> n87.atom1
n8.out -> n87.formula1
n6.out -> n87.atom2
n31.out -> n87.formula2
n31.out -> n93.a
n8.out -> n93.b
n87.out -> n69.a
n35.out -> n104.assertion
n4.out -> n104.atom1
n31.out -> n104.formula1
n6.out -> n104.atom2
n7.out -> n104.formula2
n39.out -> n104.atom3
n4.out -> n104.formula3
n104.out -> n102.a
n17.out -> n109.assertion
n4.out -> n109.atom1
n31.out -> n111.a
n4.out -> n111.b
n60.out -> n112.a
n111.out -> n112.b
n93.out -> n113.a
n112.out -> n113.b
n113.out -> n109.formula1
n6.out -> n109.atom2
n8.out -> n109.formula2
n109.out -> n102.b
n102.out -> n101.a
n35.out -> n116.assertion
n4.out -> n116.atom1
n8.out -> n116.formula1
n6.out -> n116.atom2
n93.out -> n116.formula2
n39.out -> n116.atom3
n112.out -> n116.formula3
n116.out -> n101.b
n101.out -> n69.b
n69.out -> tgt.proof
```

</details>

### 11 · 矛盾推出否定 · 中间结论

- 目标：`⊢ ( ( P → ¬ P ) → ( ( ¬ ¬ P → P ) → ( ¬ ¬ P → ¬ P ) ) )`
- 提示：目标是 (P→¬P)→(¬¬P→P)→¬¬P→¬P。这是〈矛盾推出否定〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：20 个模块 / 45 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n4  atom P
n6  not
n7  imp
n18  axiom A1
n22  atom Q
n33  not
n37  axiom A2
n41  atom R
n60  imp
n69  mp M
n84  subst S
n90  imp
n98  mp M
n99  mp M
n101  subst S
n106  subst S
n108  imp
n109  imp
n110  imp
n113  subst S

wires:
n4.out -> n6.a
n4.out -> n7.a
n6.out -> n7.b
n6.out -> n33.a
n33.out -> n60.a
n4.out -> n60.b
n18.out -> n84.assertion
n4.out -> n84.atom1
n7.out -> n84.formula1
n22.out -> n84.atom2
n33.out -> n84.formula2
n33.out -> n90.a
n7.out -> n90.b
n84.out -> n69.a
n37.out -> n101.assertion
n4.out -> n101.atom1
n33.out -> n101.formula1
n22.out -> n101.atom2
n4.out -> n101.formula2
n41.out -> n101.atom3
n6.out -> n101.formula3
n101.out -> n99.a
n18.out -> n106.assertion
n4.out -> n106.atom1
n33.out -> n108.a
n6.out -> n108.b
n60.out -> n109.a
n108.out -> n109.b
n90.out -> n110.a
n109.out -> n110.b
n110.out -> n106.formula1
n22.out -> n106.atom2
n7.out -> n106.formula2
n106.out -> n99.b
n99.out -> n98.a
n37.out -> n113.assertion
n4.out -> n113.atom1
n7.out -> n113.formula1
n22.out -> n113.atom2
n90.out -> n113.formula2
n41.out -> n113.atom3
n109.out -> n113.formula3
n113.out -> n98.b
n98.out -> n69.b
n69.out -> tgt.proof
```

</details>

### 12 · 等值消去右 · 中间结论

- 目标：`⊢ ( ¬ ¬ ¬ ( P → ¬ Q ) → ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) )`
- 提示：目标是 ¬¬¬(P→¬Q)→¬¬(P→¬Q)→¬(P→¬Q)。这是〈等值消去右〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：21 个模块 / 41 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n7  axiom A1
n9  atom P
n10  atom Q
n11  not
n19  axiom A2
n23  atom R
n34  imp
n121  axiom A3
n631  not
n632  not
n633  not
n651  mp M
n672  subst S
n678  imp
n686  mp M
n687  mp M
n689  subst S
n693  subst S
n695  imp
n696  imp
n699  subst S

wires:
n10.out -> n11.a
n9.out -> n34.a
n11.out -> n34.b
n34.out -> n631.a
n631.out -> n632.a
n632.out -> n633.a
n7.out -> n672.assertion
n9.out -> n672.atom1
n633.out -> n672.formula1
n10.out -> n672.atom2
n632.out -> n672.formula2
n632.out -> n678.a
n633.out -> n678.b
n672.out -> n651.a
n121.out -> n689.assertion
n9.out -> n689.atom1
n631.out -> n689.formula1
n10.out -> n689.atom2
n632.out -> n689.formula2
n689.out -> n687.a
n7.out -> n693.assertion
n9.out -> n693.atom1
n632.out -> n695.a
n631.out -> n695.b
n678.out -> n696.a
n695.out -> n696.b
n696.out -> n693.formula1
n10.out -> n693.atom2
n633.out -> n693.formula2
n693.out -> n687.b
n687.out -> n686.a
n19.out -> n699.assertion
n9.out -> n699.atom1
n633.out -> n699.formula1
n10.out -> n699.atom2
n678.out -> n699.formula2
n23.out -> n699.atom3
n695.out -> n699.formula3
n699.out -> n686.b
n686.out -> n651.b
n651.out -> tgt.proof
```

</details>

### 13 · 合取消去左 · 中间结论

- 目标：`⊢ ( ¬ ¬ ( P → Q ) → ( ¬ ( P → Q ) → ¬ ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) ) )`
- 提示：目标是 ¬¬(P→Q)→¬(P→Q)→¬(¬¬(P→Q)→¬(P→Q))。这是〈合取消去左〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：22 个模块 / 43 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n7  axiom A1
n9  atom P
n12  atom Q
n19  axiom A2
n23  atom R
n45  axiom A3
n52  imp
n70  not
n71  not
n134  imp
n167  mp M
n188  subst S
n191  not
n192  not
n196  imp
n204  mp M
n205  mp M
n207  subst S
n211  subst S
n213  imp
n214  imp
n217  subst S

wires:
n9.out -> n52.a
n12.out -> n52.b
n52.out -> n70.a
n70.out -> n71.a
n71.out -> n134.a
n70.out -> n134.b
n7.out -> n188.assertion
n9.out -> n188.atom1
n71.out -> n188.formula1
n12.out -> n188.atom2
n134.out -> n191.a
n191.out -> n192.a
n192.out -> n188.formula2
n192.out -> n196.a
n71.out -> n196.b
n188.out -> n167.a
n45.out -> n207.assertion
n9.out -> n207.atom1
n191.out -> n207.formula1
n12.out -> n207.atom2
n70.out -> n207.formula2
n207.out -> n205.a
n7.out -> n211.assertion
n9.out -> n211.atom1
n70.out -> n213.a
n191.out -> n213.b
n196.out -> n214.a
n213.out -> n214.b
n214.out -> n211.formula1
n12.out -> n211.atom2
n71.out -> n211.formula2
n211.out -> n205.b
n205.out -> n204.a
n19.out -> n217.assertion
n9.out -> n217.atom1
n71.out -> n217.formula1
n12.out -> n217.atom2
n196.out -> n217.formula2
n23.out -> n217.atom3
n213.out -> n217.formula3
n217.out -> n204.b
n204.out -> n167.b
n167.out -> tgt.proof
```

</details>

### 14 · 等值引入 · 中间结论

- 目标：`⊢ ( ¬ ( P → ¬ Q ) → ( ( P → ¬ Q ) → ¬ ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) ) )`
- 提示：目标是 ¬(P→¬Q)→(P→¬Q)→¬(¬(P→¬Q)→P→¬Q)。这是〈等值引入〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：22 个模块 / 43 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n6  axiom A1
n8  atom Q
n9  atom P
n15  axiom A2
n18  atom R
n25  not
n26  imp
n27  not
n82  axiom A3
n89  imp
n122  mp M
n143  subst S
n146  not
n147  not
n151  imp
n159  mp M
n160  mp M
n162  subst S
n166  subst S
n168  imp
n169  imp
n172  subst S

wires:
n8.out -> n25.a
n9.out -> n26.a
n25.out -> n26.b
n26.out -> n27.a
n27.out -> n89.a
n26.out -> n89.b
n6.out -> n143.assertion
n9.out -> n143.atom1
n27.out -> n143.formula1
n8.out -> n143.atom2
n89.out -> n146.a
n146.out -> n147.a
n147.out -> n143.formula2
n147.out -> n151.a
n27.out -> n151.b
n143.out -> n122.a
n82.out -> n162.assertion
n9.out -> n162.atom1
n146.out -> n162.formula1
n8.out -> n162.atom2
n26.out -> n162.formula2
n162.out -> n160.a
n6.out -> n166.assertion
n9.out -> n166.atom1
n26.out -> n168.a
n146.out -> n168.b
n151.out -> n169.a
n168.out -> n169.b
n169.out -> n166.formula1
n8.out -> n166.atom2
n27.out -> n166.formula2
n166.out -> n160.b
n160.out -> n159.a
n15.out -> n172.assertion
n9.out -> n172.atom1
n27.out -> n172.formula1
n8.out -> n172.atom2
n151.out -> n172.formula2
n18.out -> n172.atom3
n168.out -> n172.formula3
n172.out -> n159.b
n159.out -> n122.b
n122.out -> tgt.proof
```

</details>

### 15 · 矛盾推出否定 · 中间结论

- 目标：`⊢ ( ( ( P → ¬ P ) → ( ¬ ¬ P → P ) ) → ( ( P → ¬ P ) → ( ¬ ¬ P → ¬ P ) ) )`
- 提示：目标是 ((P→¬P)→¬¬P→P)→(P→¬P)→¬¬P→¬P。这是〈矛盾推出否定〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：22 个模块 / 54 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n4  atom P
n6  not
n7  imp
n18  axiom A1
n22  atom Q
n33  not
n37  axiom A2
n41  atom R
n60  imp
n68  mp M
n69  mp M
n84  subst S
n90  imp
n98  mp M
n99  mp M
n101  subst S
n106  subst S
n108  imp
n109  imp
n110  imp
n113  subst S
n118  subst S

wires:
n4.out -> n6.a
n4.out -> n7.a
n6.out -> n7.b
n6.out -> n33.a
n33.out -> n60.a
n4.out -> n60.b
n18.out -> n84.assertion
n4.out -> n84.atom1
n7.out -> n84.formula1
n22.out -> n84.atom2
n33.out -> n84.formula2
n33.out -> n90.a
n7.out -> n90.b
n84.out -> n69.a
n37.out -> n101.assertion
n4.out -> n101.atom1
n33.out -> n101.formula1
n22.out -> n101.atom2
n4.out -> n101.formula2
n41.out -> n101.atom3
n6.out -> n101.formula3
n101.out -> n99.a
n18.out -> n106.assertion
n4.out -> n106.atom1
n33.out -> n108.a
n6.out -> n108.b
n60.out -> n109.a
n108.out -> n109.b
n90.out -> n110.a
n109.out -> n110.b
n110.out -> n106.formula1
n22.out -> n106.atom2
n7.out -> n106.formula2
n106.out -> n99.b
n99.out -> n98.a
n37.out -> n113.assertion
n4.out -> n113.atom1
n7.out -> n113.formula1
n22.out -> n113.atom2
n90.out -> n113.formula2
n41.out -> n113.atom3
n109.out -> n113.formula3
n113.out -> n98.b
n98.out -> n69.b
n69.out -> n68.a
n37.out -> n118.assertion
n4.out -> n118.atom1
n7.out -> n118.formula1
n22.out -> n118.atom2
n60.out -> n118.formula2
n41.out -> n118.atom3
n108.out -> n118.formula3
n118.out -> n68.b
n68.out -> tgt.proof
```

</details>

### 16 · 等值消去右 · 中间结论

- 目标：`⊢ ( ¬ ¬ ( P → ¬ Q ) → ( ¬ ( P → ¬ Q ) → ¬ ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) ) )`
- 提示：目标是 ¬¬(P→¬Q)→¬(P→¬Q)→¬(¬¬(P→¬Q)→¬(P→¬Q))。这是〈等值消去右〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：23 个模块 / 44 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n7  axiom A1
n9  atom P
n10  atom Q
n11  not
n19  axiom A2
n23  atom R
n34  imp
n121  axiom A3
n631  not
n632  not
n695  imp
n728  mp M
n749  subst S
n752  not
n753  not
n757  imp
n765  mp M
n766  mp M
n768  subst S
n772  subst S
n774  imp
n775  imp
n778  subst S

wires:
n10.out -> n11.a
n9.out -> n34.a
n11.out -> n34.b
n34.out -> n631.a
n631.out -> n632.a
n632.out -> n695.a
n631.out -> n695.b
n7.out -> n749.assertion
n9.out -> n749.atom1
n632.out -> n749.formula1
n10.out -> n749.atom2
n695.out -> n752.a
n752.out -> n753.a
n753.out -> n749.formula2
n753.out -> n757.a
n632.out -> n757.b
n749.out -> n728.a
n121.out -> n768.assertion
n9.out -> n768.atom1
n752.out -> n768.formula1
n10.out -> n768.atom2
n631.out -> n768.formula2
n768.out -> n766.a
n7.out -> n772.assertion
n9.out -> n772.atom1
n631.out -> n774.a
n752.out -> n774.b
n757.out -> n775.a
n774.out -> n775.b
n775.out -> n772.formula1
n10.out -> n772.atom2
n632.out -> n772.formula2
n772.out -> n766.b
n766.out -> n765.a
n19.out -> n778.assertion
n9.out -> n778.atom1
n632.out -> n778.formula1
n10.out -> n778.atom2
n757.out -> n778.formula2
n23.out -> n778.atom3
n774.out -> n778.formula3
n778.out -> n765.b
n765.out -> n728.b
n728.out -> tgt.proof
```

</details>

### 17 · 分情况一 · 中间结论

- 目标：`⊢ ( ( P → Q ) → ( ¬ ( ( ¬ P → Q ) → Q ) → ( P → ( ( ¬ P → Q ) → Q ) ) ) )`
- 提示：目标是 (P→Q)→¬((¬P→Q)→Q)→P→(¬P→Q)→Q。这是〈分情况一〉证明里的一个中间结论，按接线把它单独证出来。
- 参考解：25 个模块 / 57 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  atom P
n7  not
n8  atom Q
n9  imp
n12  axiom A1
n16  imp
n23  axiom A2
n27  atom R
n75  imp
n98  not
n136  mp M
n137  mp M
n138  mp M
n147  subst S
n153  imp
n178  subst S
n182  subst S
n184  mp M
n185  mp M
n187  subst S
n189  imp
n192  subst S
n194  imp
n195  imp
n198  subst S

wires:
n5.out -> n7.a
n7.out -> n9.a
n8.out -> n9.b
n5.out -> n16.a
n8.out -> n16.b
n9.out -> n75.a
n8.out -> n75.b
n75.out -> n98.a
n12.out -> n147.assertion
n5.out -> n147.atom1
n8.out -> n147.formula1
n8.out -> n147.atom2
n9.out -> n147.formula2
n8.out -> n153.a
n75.out -> n153.b
n147.out -> n138.a
n12.out -> n178.assertion
n5.out -> n178.atom1
n153.out -> n178.formula1
n8.out -> n178.atom2
n5.out -> n178.formula2
n178.out -> n138.b
n138.out -> n137.a
n23.out -> n182.assertion
n27.out -> n182.atom1
n75.out -> n182.formula1
n182.out -> n137.b
n137.out -> n136.a
n12.out -> n187.assertion
n5.out -> n187.atom1
n5.out -> n189.a
n75.out -> n189.b
n189.out -> n187.formula1
n8.out -> n187.atom2
n98.out -> n187.formula2
n187.out -> n185.a
n12.out -> n192.assertion
n5.out -> n192.atom1
n98.out -> n194.a
n189.out -> n194.b
n189.out -> n195.a
n194.out -> n195.b
n195.out -> n192.formula1
n8.out -> n192.atom2
n16.out -> n192.formula2
n192.out -> n185.b
n185.out -> n184.a
n23.out -> n198.assertion
n5.out -> n198.atom1
n16.out -> n198.formula1
n8.out -> n198.atom2
n189.out -> n198.formula2
n27.out -> n198.atom3
n194.out -> n198.formula3
n198.out -> n184.b
n184.out -> n136.b
n136.out -> tgt.proof
```

</details>

### 18 · 反证收尾

- 目标：`⊢ ( ( ¬ P → P ) → P )`
- 提示：目标是 (¬P→P)→P。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。
- 参考解：27 个模块 / 58 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n55  target
n1  mp M
n2  theorem *00
n3  subst S
n4  atom P
n6  not
n7  imp
n8  mp M
n9  mp M
n13  mp M
n14  theorem *04
n15  subst S
n16  atom Q
n17  not
n18  axiom A2
n19  subst S
n22  atom R
n23  axiom A1
n26  imp
n34  mp M
n35  mp M
n36  theorem *v
n37  subst S
n40  subst S
n42  imp
n43  imp
n46  subst S
n51  subst S

wires:
n2.out -> n3.assertion
n4.out -> n3.atom1
n4.out -> n6.a
n6.out -> n7.a
n4.out -> n7.b
n7.out -> n3.formula1
n3.out -> n1.a
n14.out -> n15.assertion
n16.out -> n15.atom1
n7.out -> n17.a
n17.out -> n15.formula1
n15.out -> n13.a
n18.out -> n19.assertion
n4.out -> n19.atom1
n6.out -> n19.formula1
n16.out -> n19.atom2
n4.out -> n19.formula2
n22.out -> n19.atom3
n17.out -> n19.formula3
n19.out -> n13.b
n6.out -> n26.a
n17.out -> n26.b
n13.out -> n9.a
n36.out -> n37.assertion
n16.out -> n37.atom1
n7.out -> n37.formula1
n37.out -> n35.a
n23.out -> n40.assertion
n4.out -> n40.atom1
n7.out -> n42.a
n4.out -> n42.b
n26.out -> n43.a
n42.out -> n43.b
n43.out -> n40.formula1
n16.out -> n40.atom2
n7.out -> n40.formula2
n40.out -> n35.b
n35.out -> n34.a
n18.out -> n46.assertion
n4.out -> n46.atom1
n7.out -> n46.formula1
n16.out -> n46.atom2
n26.out -> n46.formula2
n22.out -> n46.atom3
n42.out -> n46.formula3
n46.out -> n34.b
n34.out -> n9.b
n9.out -> n8.a
n18.out -> n51.assertion
n4.out -> n51.atom1
n7.out -> n51.formula1
n16.out -> n51.atom2
n7.out -> n51.formula2
n22.out -> n51.atom3
n4.out -> n51.formula3
n51.out -> n8.b
n8.out -> n1.b
n1.out -> n55.proof
```

</details>

### 19 · 双重否定消去

- 目标：`⊢ ( ¬ ¬ P → P )`
- 提示：目标是 ¬¬P→P。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。
- 参考解：17 个模块 / 30 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n23  target
n1  mp M
n2  theorem *04
n3  subst S
n4  atom P
n6  not
n7  atom Q
n8  mp M
n9  mp M
n10  theorem *18
n11  axiom A1
n12  subst S
n14  imp
n15  imp
n17  not
n18  axiom A2
n19  subst S
n22  atom R

wires:
n2.out -> n3.assertion
n4.out -> n3.atom1
n4.out -> n6.a
n6.out -> n3.formula1
n7.out -> n3.atom2
n4.out -> n3.formula2
n3.out -> n1.a
n10.out -> n9.a
n11.out -> n12.assertion
n4.out -> n12.atom1
n6.out -> n14.a
n4.out -> n14.b
n14.out -> n15.a
n4.out -> n15.b
n15.out -> n12.formula1
n7.out -> n12.atom2
n6.out -> n17.a
n17.out -> n12.formula2
n12.out -> n9.b
n9.out -> n8.a
n18.out -> n19.assertion
n4.out -> n19.atom1
n17.out -> n19.formula1
n7.out -> n19.atom2
n14.out -> n19.formula2
n22.out -> n19.atom3
n4.out -> n19.formula3
n19.out -> n8.b
n8.out -> n1.b
n1.out -> n23.proof
```

</details>

### 20 · 等值消去右 · 中间结论

- 目标：`⊢ ( ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) → ( ¬ ¬ ( P → ¬ Q ) → ¬ ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) ) )`
- 提示：(¬¬(P→¬Q)→¬(P→¬Q))→¬¬(P→¬Q)→¬(¬¬(P→¬Q)→¬(P→¬Q))
- 参考解：25 个模块 / 53 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n7  axiom A1
n9  atom P
n10  atom Q
n11  not
n19  axiom A2
n23  atom R
n34  imp
n121  axiom A3
n631  not
n632  not
n695  imp
n727  mp M
n728  mp M
n749  subst S
n752  not
n753  not
n757  imp
n765  mp M
n766  mp M
n768  subst S
n772  subst S
n774  imp
n775  imp
n778  subst S
n783  subst S

wires:
n10.out -> n11.a
n9.out -> n34.a
n11.out -> n34.b
n34.out -> n631.a
n631.out -> n632.a
n632.out -> n695.a
n631.out -> n695.b
n7.out -> n749.assertion
n9.out -> n749.atom1
n632.out -> n749.formula1
n10.out -> n749.atom2
n695.out -> n752.a
n752.out -> n753.a
n753.out -> n749.formula2
n753.out -> n757.a
n632.out -> n757.b
n749.out -> n728.a
n121.out -> n768.assertion
n9.out -> n768.atom1
n752.out -> n768.formula1
n10.out -> n768.atom2
n631.out -> n768.formula2
n768.out -> n766.a
n7.out -> n772.assertion
n9.out -> n772.atom1
n631.out -> n774.a
n752.out -> n774.b
n757.out -> n775.a
n774.out -> n775.b
n775.out -> n772.formula1
n10.out -> n772.atom2
n632.out -> n772.formula2
n772.out -> n766.b
n766.out -> n765.a
n19.out -> n778.assertion
n9.out -> n778.atom1
n632.out -> n778.formula1
n10.out -> n778.atom2
n757.out -> n778.formula2
n23.out -> n778.atom3
n774.out -> n778.formula3
n778.out -> n765.b
n765.out -> n728.b
n728.out -> n727.a
n19.out -> n783.assertion
n9.out -> n783.atom1
n632.out -> n783.formula1
n10.out -> n783.atom2
n631.out -> n783.formula2
n23.out -> n783.atom3
n752.out -> n783.formula3
n783.out -> n727.b
n727.out -> tgt.proof
```

</details>

### 21 · 合取前件导出 · 中间结论

- 目标：`⊢ ( ( P → ( ( ¬ ( P → ¬ Q ) → R ) → ( ¬ ( P → ¬ Q ) → R ) ) ) → ( P → ( ( ¬ ( P → ¬ Q ) → R ) → ( ( Q → ¬ ( P → ¬ Q ) ) → ( Q → R ) ) ) ) )`
- 提示：(P→(¬(P→¬Q)→R)→¬(P→¬Q)→R)→P→(¬(P→¬Q)→R)→(Q→¬(P→¬Q))→Q→R
- 参考解：25 个模块 / 56 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  atom P
n7  atom Q
n8  not
n9  imp
n10  not
n11  atom R
n12  imp
n15  axiom A1
n25  axiom A2
n41  imp
n60  imp
n62  mp M
n63  mp M
n64  mp M
n65  mp M
n66  theorem *05
n67  subst S
n72  subst S
n74  imp
n75  imp
n76  imp
n79  subst S
n84  subst S
n86  imp
n89  subst S

wires:
n7.out -> n8.a
n5.out -> n9.a
n8.out -> n9.b
n9.out -> n10.a
n10.out -> n12.a
n11.out -> n12.b
n7.out -> n41.a
n10.out -> n41.b
n12.out -> n60.a
n12.out -> n60.b
n66.out -> n67.assertion
n5.out -> n67.atom1
n10.out -> n67.formula1
n7.out -> n67.atom2
n11.out -> n67.formula2
n11.out -> n67.atom3
n7.out -> n67.formula3
n67.out -> n65.a
n15.out -> n72.assertion
n5.out -> n72.atom1
n7.out -> n74.a
n11.out -> n74.b
n41.out -> n75.a
n74.out -> n75.b
n12.out -> n76.a
n75.out -> n76.b
n76.out -> n72.formula1
n7.out -> n72.atom2
n12.out -> n72.formula2
n72.out -> n65.b
n65.out -> n64.a
n25.out -> n79.assertion
n5.out -> n79.atom1
n12.out -> n79.formula1
n7.out -> n79.atom2
n12.out -> n79.formula2
n11.out -> n79.atom3
n75.out -> n79.formula3
n79.out -> n64.b
n64.out -> n63.a
n15.out -> n84.assertion
n5.out -> n84.atom1
n60.out -> n86.a
n76.out -> n86.b
n86.out -> n84.formula1
n7.out -> n84.atom2
n5.out -> n84.formula2
n84.out -> n63.b
n63.out -> n62.a
n25.out -> n89.assertion
n7.out -> n89.atom1
n60.out -> n89.formula1
n11.out -> n89.atom2
n76.out -> n89.formula2
n89.out -> n62.b
n62.out -> tgt.proof
```

</details>

### 22 · 双重否定引入 · 中间结论

- 目标：`⊢ ( P → ( ( ¬ ¬ ¬ P → P ) → ( ¬ ¬ ¬ P → ¬ P ) ) )`
- 提示：P→(¬¬¬P→P)→¬¬¬P→¬P
- 参考解：25 个模块 / 56 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n9  axiom A1
n11  atom Q
n12  atom P
n13  not
n14  not
n15  not
n19  imp
n22  axiom A2
n25  atom R
n27  mp M
n28  mp M
n30  mp M
n31  theorem *19
n32  subst S
n34  mp M
n35  mp M
n37  subst S
n41  subst S
n43  imp
n44  imp
n47  subst S
n78  subst S
n83  subst S
n85  imp
n86  imp

wires:
n12.out -> n13.a
n13.out -> n14.a
n14.out -> n15.a
n15.out -> n19.a
n12.out -> n19.b
n31.out -> n32.assertion
n12.out -> n32.atom1
n13.out -> n32.formula1
n32.out -> n30.a
n9.out -> n37.assertion
n12.out -> n37.atom1
n13.out -> n37.formula1
n11.out -> n37.atom2
n12.out -> n37.formula2
n37.out -> n35.a
n9.out -> n41.assertion
n12.out -> n41.atom1
n12.out -> n43.a
n13.out -> n43.b
n13.out -> n44.a
n43.out -> n44.b
n44.out -> n41.formula1
n11.out -> n41.atom2
n15.out -> n41.formula2
n41.out -> n35.b
n35.out -> n34.a
n22.out -> n47.assertion
n12.out -> n47.atom1
n15.out -> n47.formula1
n11.out -> n47.atom2
n13.out -> n47.formula2
n25.out -> n47.atom3
n43.out -> n47.formula3
n47.out -> n34.b
n34.out -> n30.b
n30.out -> n28.a
n22.out -> n78.assertion
n12.out -> n78.atom1
n15.out -> n78.formula1
n11.out -> n78.atom2
n12.out -> n78.formula2
n25.out -> n78.atom3
n13.out -> n78.formula3
n78.out -> n28.b
n28.out -> n27.a
n9.out -> n83.assertion
n12.out -> n83.atom1
n15.out -> n85.a
n13.out -> n85.b
n19.out -> n86.a
n85.out -> n86.b
n86.out -> n83.formula1
n11.out -> n83.atom2
n12.out -> n83.formula2
n83.out -> n27.b
n27.out -> tgt.proof
```

</details>

### 23 · 合取前件引入 · 中间结论

- 目标：`⊢ ( ( ¬ ( P → ¬ Q ) → ( ( P → ( Q → R ) ) → P ) ) → ( ¬ ( P → ¬ Q ) → ( ( P → ( Q → R ) ) → ( Q → R ) ) ) )`
- 提示：(¬(P→¬Q)→(P→Q→R)→P)→¬(P→¬Q)→(P→Q→R)→Q→R
- 参考解：26 个模块 / 62 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n4  axiom A1
n6  atom P
n8  atom Q
n9  not
n10  imp
n11  not
n14  atom R
n15  imp
n16  imp
n21  theorem *00
n22  subst S
n36  axiom A2
n57  imp
n65  mp M
n66  mp M
n67  mp M
n69  mp M
n71  subst S
n74  subst S
n76  imp
n79  subst S
n83  subst S
n88  subst S
n90  imp
n91  imp
n94  subst S

wires:
n8.out -> n9.a
n6.out -> n10.a
n9.out -> n10.b
n10.out -> n11.a
n8.out -> n15.a
n14.out -> n15.b
n6.out -> n16.a
n15.out -> n16.b
n21.out -> n22.assertion
n6.out -> n22.atom1
n16.out -> n22.formula1
n16.out -> n57.a
n6.out -> n57.b
n21.out -> n71.assertion
n6.out -> n71.atom1
n15.out -> n71.formula1
n71.out -> n69.a
n4.out -> n74.assertion
n6.out -> n74.atom1
n15.out -> n76.a
n15.out -> n76.b
n76.out -> n74.formula1
n8.out -> n74.atom2
n6.out -> n74.formula2
n74.out -> n69.b
n69.out -> n22.a
n36.out -> n79.assertion
n8.out -> n79.atom1
n15.out -> n79.formula1
n14.out -> n79.atom2
n15.out -> n79.formula2
n79.out -> n22.b
n22.out -> n67.a
n36.out -> n83.assertion
n6.out -> n83.atom1
n16.out -> n83.formula1
n8.out -> n83.atom2
n6.out -> n83.formula2
n14.out -> n83.atom3
n15.out -> n83.formula3
n83.out -> n67.b
n67.out -> n66.a
n4.out -> n88.assertion
n6.out -> n88.atom1
n16.out -> n90.a
n15.out -> n90.b
n57.out -> n91.a
n90.out -> n91.b
n91.out -> n88.formula1
n8.out -> n88.atom2
n11.out -> n88.formula2
n88.out -> n66.b
n66.out -> n65.a
n36.out -> n94.assertion
n6.out -> n94.atom1
n11.out -> n94.formula1
n8.out -> n94.atom2
n57.out -> n94.formula2
n14.out -> n94.atom3
n90.out -> n94.formula3
n94.out -> n65.b
n65.out -> tgt.proof
```

</details>

### 24 · 前件合并 · 中间结论

- 目标：`⊢ ( ( ( ( P → Q ) → ( P → R ) ) → ( P → ( ( P → R ) → R ) ) ) → ( ( ( P → Q ) → ( P → R ) ) → ( P → ( ( Q → ( P → R ) ) → ( Q → R ) ) ) ) )`
- 提示：(((P→Q)→P→R)→P→(P→R)→R)→((P→Q)→P→R)→P→(Q→P→R)→Q→R
- 参考解：26 个模块 / 60 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n7  atom P
n9  atom Q
n10  imp
n11  atom R
n12  imp
n13  imp
n16  axiom A1
n25  axiom A2
n81  imp
n116  imp
n117  imp
n119  mp M
n120  mp M
n121  mp M
n122  mp M
n123  theorem *05
n124  subst S
n129  subst S
n131  imp
n132  imp
n133  imp
n136  subst S
n140  subst S
n142  imp
n143  imp
n146  subst S

wires:
n7.out -> n10.a
n9.out -> n10.b
n7.out -> n12.a
n11.out -> n12.b
n10.out -> n13.a
n12.out -> n13.b
n9.out -> n81.a
n12.out -> n81.b
n12.out -> n116.a
n11.out -> n116.b
n7.out -> n117.a
n116.out -> n117.b
n123.out -> n124.assertion
n7.out -> n124.atom1
n12.out -> n124.formula1
n9.out -> n124.atom2
n11.out -> n124.formula2
n11.out -> n124.atom3
n9.out -> n124.formula3
n124.out -> n122.a
n16.out -> n129.assertion
n7.out -> n129.atom1
n9.out -> n131.a
n11.out -> n131.b
n81.out -> n132.a
n131.out -> n132.b
n116.out -> n133.a
n132.out -> n133.b
n133.out -> n129.formula1
n9.out -> n129.atom2
n7.out -> n129.formula2
n129.out -> n122.b
n122.out -> n121.a
n25.out -> n136.assertion
n9.out -> n136.atom1
n116.out -> n136.formula1
n11.out -> n136.atom2
n132.out -> n136.formula2
n136.out -> n121.b
n121.out -> n120.a
n16.out -> n140.assertion
n7.out -> n140.atom1
n7.out -> n142.a
n132.out -> n142.b
n117.out -> n143.a
n142.out -> n143.b
n143.out -> n140.formula1
n9.out -> n140.atom2
n13.out -> n140.formula2
n140.out -> n120.b
n120.out -> n119.a
n25.out -> n146.assertion
n7.out -> n146.atom1
n13.out -> n146.formula1
n9.out -> n146.atom2
n117.out -> n146.formula2
n11.out -> n146.atom3
n142.out -> n146.formula3
n146.out -> n119.b
n119.out -> tgt.proof
```

</details>

### 25 · 皮尔士回滚 · 中间结论

- 目标：`⊢ ( ( ( ( P → Q ) → R ) → ( ( ( ( P → Q ) → P ) → P ) → ( ( ( P → Q ) → P ) → P ) ) ) → ( ( ( P → Q ) → R ) → ( ( ( ( P → Q ) → P ) → P ) → ( ( ( R → P ) → ( ( P → Q ) → P ) ) → ( ( R → P ) → P ) ) ) ) )`
- 提示：(((P→Q)→R)→(((P→Q)→P)→P)→((P→Q)→P)→P)→((P→Q)→R)→(((P→Q)→P)→P)→((R→P)→(P→Q)→P)→(R→P)→P
- 参考解：26 个模块 / 62 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  atom P
n7  atom Q
n8  imp
n9  imp
n10  imp
n13  axiom A1
n17  atom R
n18  imp
n25  axiom A2
n45  imp
n46  imp
n66  imp
n68  mp M
n69  mp M
n70  mp M
n71  mp M
n72  theorem *05
n73  subst S
n78  subst S
n80  imp
n81  imp
n82  imp
n85  subst S
n90  subst S
n92  imp
n95  subst S

wires:
n5.out -> n8.a
n7.out -> n8.b
n8.out -> n9.a
n5.out -> n9.b
n9.out -> n10.a
n5.out -> n10.b
n8.out -> n18.a
n17.out -> n18.b
n17.out -> n45.a
n5.out -> n45.b
n45.out -> n46.a
n9.out -> n46.b
n10.out -> n66.a
n10.out -> n66.b
n72.out -> n73.assertion
n5.out -> n73.atom1
n9.out -> n73.formula1
n7.out -> n73.atom2
n5.out -> n73.formula2
n17.out -> n73.atom3
n45.out -> n73.formula3
n73.out -> n71.a
n13.out -> n78.assertion
n5.out -> n78.atom1
n45.out -> n80.a
n5.out -> n80.b
n46.out -> n81.a
n80.out -> n81.b
n10.out -> n82.a
n81.out -> n82.b
n82.out -> n78.formula1
n7.out -> n78.atom2
n10.out -> n78.formula2
n78.out -> n71.b
n71.out -> n70.a
n25.out -> n85.assertion
n5.out -> n85.atom1
n10.out -> n85.formula1
n7.out -> n85.atom2
n10.out -> n85.formula2
n17.out -> n85.atom3
n81.out -> n85.formula3
n85.out -> n70.b
n70.out -> n69.a
n13.out -> n90.assertion
n5.out -> n90.atom1
n66.out -> n92.a
n82.out -> n92.b
n92.out -> n90.formula1
n7.out -> n90.atom2
n18.out -> n90.formula2
n90.out -> n69.b
n69.out -> n68.a
n25.out -> n95.assertion
n5.out -> n95.atom1
n18.out -> n95.formula1
n7.out -> n95.atom2
n66.out -> n95.formula2
n17.out -> n95.atom3
n82.out -> n95.formula3
n95.out -> n68.b
n68.out -> tgt.proof
```

</details>

### 26 · 否定蕴涵取后件 · 中间结论

- 目标：`⊢ ( Q → ( ( ¬ ¬ ¬ ( P → Q ) → Q ) → ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) ) )`
- 提示：Q→(¬¬¬(P→Q)→Q)→¬¬¬(P→Q)→¬(P→Q)
- 参考解：26 个模块 / 52 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n4  atom P
n6  atom Q
n7  imp
n8  not
n15  axiom A1
n27  axiom A2
n31  atom R
n37  theorem *19
n78  not
n79  not
n83  imp
n90  mp M
n91  mp M
n93  mp M
n95  subst S
n97  mp M
n98  mp M
n100  subst S
n103  subst S
n105  imp
n106  imp
n109  subst S
n137  subst S
n141  subst S
n143  imp
n144  imp

wires:
n4.out -> n7.a
n6.out -> n7.b
n7.out -> n8.a
n8.out -> n78.a
n78.out -> n79.a
n79.out -> n83.a
n6.out -> n83.b
n37.out -> n95.assertion
n4.out -> n95.atom1
n8.out -> n95.formula1
n95.out -> n93.a
n15.out -> n100.assertion
n4.out -> n100.atom1
n8.out -> n100.formula1
n100.out -> n98.a
n15.out -> n103.assertion
n4.out -> n103.atom1
n6.out -> n105.a
n8.out -> n105.b
n8.out -> n106.a
n105.out -> n106.b
n106.out -> n103.formula1
n6.out -> n103.atom2
n79.out -> n103.formula2
n103.out -> n98.b
n98.out -> n97.a
n27.out -> n109.assertion
n4.out -> n109.atom1
n79.out -> n109.formula1
n6.out -> n109.atom2
n8.out -> n109.formula2
n31.out -> n109.atom3
n105.out -> n109.formula3
n109.out -> n97.b
n97.out -> n93.b
n93.out -> n91.a
n27.out -> n137.assertion
n4.out -> n137.atom1
n79.out -> n137.formula1
n31.out -> n137.atom2
n8.out -> n137.formula2
n137.out -> n91.b
n91.out -> n90.a
n15.out -> n141.assertion
n4.out -> n141.atom1
n79.out -> n143.a
n8.out -> n143.b
n83.out -> n144.a
n143.out -> n144.b
n144.out -> n141.formula1
n141.out -> n90.b
n90.out -> tgt.proof
```

</details>

### 27 · 否定蕴涵取前件 · 中间结论

- 目标：`⊢ ( ¬ P → ( ( ¬ ¬ ¬ ( P → Q ) → ¬ P ) → ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) ) )`
- 提示：¬P→(¬¬¬(P→Q)→¬P)→¬¬¬(P→Q)→¬(P→Q)
- 参考解：27 个模块 / 59 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n10  atom P
n12  not
n15  axiom A1
n18  atom Q
n20  imp
n21  not
n22  not
n23  not
n27  imp
n30  axiom A2
n34  atom R
n36  mp M
n37  mp M
n39  mp M
n40  theorem *19
n41  subst S
n43  mp M
n44  mp M
n46  subst S
n50  subst S
n52  imp
n53  imp
n56  subst S
n88  subst S
n93  subst S
n95  imp
n96  imp

wires:
n10.out -> n12.a
n10.out -> n20.a
n18.out -> n20.b
n20.out -> n21.a
n21.out -> n22.a
n22.out -> n23.a
n23.out -> n27.a
n12.out -> n27.b
n40.out -> n41.assertion
n10.out -> n41.atom1
n21.out -> n41.formula1
n41.out -> n39.a
n15.out -> n46.assertion
n10.out -> n46.atom1
n21.out -> n46.formula1
n18.out -> n46.atom2
n12.out -> n46.formula2
n46.out -> n44.a
n15.out -> n50.assertion
n10.out -> n50.atom1
n12.out -> n52.a
n21.out -> n52.b
n21.out -> n53.a
n52.out -> n53.b
n53.out -> n50.formula1
n18.out -> n50.atom2
n23.out -> n50.formula2
n50.out -> n44.b
n44.out -> n43.a
n30.out -> n56.assertion
n10.out -> n56.atom1
n23.out -> n56.formula1
n18.out -> n56.atom2
n21.out -> n56.formula2
n34.out -> n56.atom3
n52.out -> n56.formula3
n56.out -> n43.b
n43.out -> n39.b
n39.out -> n37.a
n30.out -> n88.assertion
n10.out -> n88.atom1
n23.out -> n88.formula1
n18.out -> n88.atom2
n12.out -> n88.formula2
n34.out -> n88.atom3
n21.out -> n88.formula3
n88.out -> n37.b
n37.out -> n36.a
n15.out -> n93.assertion
n10.out -> n93.atom1
n23.out -> n95.a
n21.out -> n95.b
n27.out -> n96.a
n95.out -> n96.b
n96.out -> n93.formula1
n18.out -> n93.atom2
n12.out -> n93.formula2
n93.out -> n36.b
n36.out -> tgt.proof
```

</details>

### 28 · 否定蕴涵取后件 · 中间结论

- 目标：`⊢ ( ¬ Q → ( ( ¬ ¬ ¬ ( P → ¬ Q ) → ¬ Q ) → ( ¬ ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) ) )`
- 提示：¬Q→(¬¬¬(P→¬Q)→¬Q)→¬¬¬(P→¬Q)→¬(P→¬Q)
- 参考解：27 个模块 / 59 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n7  atom P
n8  atom Q
n9  not
n12  axiom A1
n20  imp
n23  axiom A2
n27  atom R
n57  theorem *19
n174  not
n175  not
n176  not
n180  imp
n189  mp M
n190  mp M
n192  mp M
n194  subst S
n196  mp M
n197  mp M
n199  subst S
n203  subst S
n205  imp
n206  imp
n209  subst S
n241  subst S
n246  subst S
n248  imp
n249  imp

wires:
n8.out -> n9.a
n7.out -> n20.a
n9.out -> n20.b
n20.out -> n174.a
n174.out -> n175.a
n175.out -> n176.a
n176.out -> n180.a
n9.out -> n180.b
n57.out -> n194.assertion
n7.out -> n194.atom1
n174.out -> n194.formula1
n194.out -> n192.a
n12.out -> n199.assertion
n7.out -> n199.atom1
n174.out -> n199.formula1
n8.out -> n199.atom2
n9.out -> n199.formula2
n199.out -> n197.a
n12.out -> n203.assertion
n7.out -> n203.atom1
n9.out -> n205.a
n174.out -> n205.b
n174.out -> n206.a
n205.out -> n206.b
n206.out -> n203.formula1
n8.out -> n203.atom2
n176.out -> n203.formula2
n203.out -> n197.b
n197.out -> n196.a
n23.out -> n209.assertion
n7.out -> n209.atom1
n176.out -> n209.formula1
n8.out -> n209.atom2
n174.out -> n209.formula2
n27.out -> n209.atom3
n205.out -> n209.formula3
n209.out -> n196.b
n196.out -> n192.b
n192.out -> n190.a
n23.out -> n241.assertion
n7.out -> n241.atom1
n176.out -> n241.formula1
n8.out -> n241.atom2
n9.out -> n241.formula2
n27.out -> n241.atom3
n174.out -> n241.formula3
n241.out -> n190.b
n190.out -> n189.a
n12.out -> n246.assertion
n7.out -> n246.atom1
n176.out -> n248.a
n174.out -> n248.b
n180.out -> n249.a
n248.out -> n249.b
n249.out -> n246.formula1
n8.out -> n246.atom2
n9.out -> n246.formula2
n246.out -> n189.b
n189.out -> tgt.proof
```

</details>

### 29 · 双重否定引入 · 中间结论

- 目标：`⊢ ( ( P → ( ¬ ¬ ¬ P → P ) ) → ( P → ( ¬ ¬ ¬ P → ¬ P ) ) )`
- 提示：(P→¬¬¬P→P)→P→¬¬¬P→¬P
- 参考解：27 个模块 / 63 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n9  axiom A1
n11  atom Q
n12  atom P
n13  not
n14  not
n15  not
n19  imp
n22  axiom A2
n25  atom R
n26  mp M
n27  mp M
n28  mp M
n30  mp M
n31  theorem *19
n32  subst S
n34  mp M
n35  mp M
n37  subst S
n41  subst S
n43  imp
n44  imp
n47  subst S
n78  subst S
n83  subst S
n85  imp
n86  imp
n89  subst S

wires:
n12.out -> n13.a
n13.out -> n14.a
n14.out -> n15.a
n15.out -> n19.a
n12.out -> n19.b
n31.out -> n32.assertion
n12.out -> n32.atom1
n13.out -> n32.formula1
n32.out -> n30.a
n9.out -> n37.assertion
n12.out -> n37.atom1
n13.out -> n37.formula1
n11.out -> n37.atom2
n12.out -> n37.formula2
n37.out -> n35.a
n9.out -> n41.assertion
n12.out -> n41.atom1
n12.out -> n43.a
n13.out -> n43.b
n13.out -> n44.a
n43.out -> n44.b
n44.out -> n41.formula1
n11.out -> n41.atom2
n15.out -> n41.formula2
n41.out -> n35.b
n35.out -> n34.a
n22.out -> n47.assertion
n12.out -> n47.atom1
n15.out -> n47.formula1
n11.out -> n47.atom2
n13.out -> n47.formula2
n25.out -> n47.atom3
n43.out -> n47.formula3
n47.out -> n34.b
n34.out -> n30.b
n30.out -> n28.a
n22.out -> n78.assertion
n12.out -> n78.atom1
n15.out -> n78.formula1
n11.out -> n78.atom2
n12.out -> n78.formula2
n25.out -> n78.atom3
n13.out -> n78.formula3
n78.out -> n28.b
n28.out -> n27.a
n9.out -> n83.assertion
n12.out -> n83.atom1
n15.out -> n85.a
n13.out -> n85.b
n19.out -> n86.a
n85.out -> n86.b
n86.out -> n83.formula1
n11.out -> n83.atom2
n12.out -> n83.formula2
n83.out -> n27.b
n27.out -> n26.a
n22.out -> n89.assertion
n11.out -> n89.atom1
n19.out -> n89.formula1
n25.out -> n89.atom2
n85.out -> n89.formula2
n89.out -> n26.b
n26.out -> tgt.proof
```

</details>

### 30 · 蕴涵组合 · 中间结论

- 目标：`⊢ ( ( R → S ) → ( ( ( P → Q ) → ( ( Q → S ) → ( P → S ) ) ) → ( ( P → Q ) → ( ( ( Q → R ) → ( Q → S ) ) → ( ( Q → R ) → ( P → S ) ) ) ) ) )`
- 提示：(R→S)→((P→Q)→(Q→S)→P→S)→(P→Q)→((Q→R)→Q→S)→(Q→R)→P→S
- 参考解：27 个模块 / 57 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  atom P
n7  atom Q
n8  imp
n11  axiom A1
n15  atom R
n16  atom S
n17  imp
n24  axiom A2
n34  theorem *05
n44  imp
n45  imp
n46  imp
n69  imp
n70  imp
n71  imp
n74  mp M
n75  mp M
n76  mp M
n78  subst S
n83  subst S
n85  imp
n86  imp
n87  imp
n90  subst S
n95  subst S
n97  imp
n98  imp

wires:
n5.out -> n8.a
n7.out -> n8.b
n15.out -> n17.a
n16.out -> n17.b
n7.out -> n44.a
n15.out -> n44.b
n7.out -> n45.a
n16.out -> n45.b
n44.out -> n46.a
n45.out -> n46.b
n5.out -> n69.a
n16.out -> n69.b
n45.out -> n70.a
n69.out -> n70.b
n8.out -> n71.a
n70.out -> n71.b
n34.out -> n78.assertion
n5.out -> n78.atom1
n45.out -> n78.formula1
n7.out -> n78.atom2
n69.out -> n78.formula2
n15.out -> n78.atom3
n44.out -> n78.formula3
n78.out -> n76.a
n11.out -> n83.assertion
n5.out -> n83.atom1
n44.out -> n85.a
n69.out -> n85.b
n46.out -> n86.a
n85.out -> n86.b
n70.out -> n87.a
n86.out -> n87.b
n87.out -> n83.formula1
n7.out -> n83.atom2
n8.out -> n83.formula2
n83.out -> n76.b
n76.out -> n75.a
n24.out -> n90.assertion
n5.out -> n90.atom1
n8.out -> n90.formula1
n7.out -> n90.atom2
n70.out -> n90.formula2
n15.out -> n90.atom3
n86.out -> n90.formula3
n90.out -> n75.b
n75.out -> n74.a
n11.out -> n95.assertion
n5.out -> n95.atom1
n8.out -> n97.a
n86.out -> n97.b
n71.out -> n98.a
n97.out -> n98.b
n98.out -> n95.formula1
n7.out -> n95.atom2
n17.out -> n95.formula2
n95.out -> n74.b
n74.out -> tgt.proof
```

</details>

### 31 · 逆否 · 中间结论

- 目标：`⊢ ( ¬ ¬ P → ( ( P → Q ) → Q ) )`
- 提示：¬¬P→(P→Q)→Q
- 参考解：28 个模块 / 64 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  theorem *00
n6  subst S
n7  atom P
n9  atom Q
n10  imp
n13  axiom A1
n17  not
n18  not
n25  axiom A2
n29  atom R
n33  mp M
n34  mp M
n35  theorem *19
n36  mp M
n37  mp M
n39  subst S
n42  subst S
n44  imp
n45  imp
n48  subst S
n52  mp M
n53  mp M
n54  mp M
n56  subst S
n61  subst S
n63  imp
n64  imp
n67  subst S

wires:
n5.out -> n6.assertion
n7.out -> n6.atom1
n7.out -> n10.a
n9.out -> n10.b
n10.out -> n6.formula1
n7.out -> n17.a
n17.out -> n18.a
n35.out -> n34.a
n13.out -> n39.assertion
n9.out -> n39.atom1
n10.out -> n39.formula1
n39.out -> n37.a
n13.out -> n42.assertion
n7.out -> n42.atom1
n10.out -> n44.a
n7.out -> n44.b
n7.out -> n45.a
n44.out -> n45.b
n45.out -> n42.formula1
n9.out -> n42.atom2
n18.out -> n42.formula2
n42.out -> n37.b
n37.out -> n36.a
n25.out -> n48.assertion
n7.out -> n48.atom1
n18.out -> n48.formula1
n9.out -> n48.atom2
n7.out -> n48.formula2
n29.out -> n48.atom3
n44.out -> n48.formula3
n48.out -> n36.b
n36.out -> n34.b
n34.out -> n33.a
n6.out -> n54.a
n25.out -> n56.assertion
n7.out -> n56.atom1
n10.out -> n56.formula1
n9.out -> n56.atom2
n7.out -> n56.formula2
n29.out -> n56.atom3
n9.out -> n56.formula3
n56.out -> n54.b
n54.out -> n53.a
n13.out -> n61.assertion
n7.out -> n61.atom1
n10.out -> n63.a
n9.out -> n63.b
n44.out -> n64.a
n63.out -> n64.b
n64.out -> n61.formula1
n9.out -> n61.atom2
n18.out -> n61.formula2
n61.out -> n53.b
n53.out -> n52.a
n25.out -> n67.assertion
n7.out -> n67.atom1
n18.out -> n67.formula1
n9.out -> n67.atom2
n44.out -> n67.formula2
n29.out -> n67.atom3
n63.out -> n67.formula3
n67.out -> n52.b
n52.out -> n33.b
n33.out -> tgt.proof
```

</details>

### 32 · 否定蕴涵取后件 · 中间结论

- 目标：`⊢ ( ( Q → ( ¬ ¬ ¬ ( P → Q ) → Q ) ) → ( Q → ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) ) )`
- 提示：(Q→¬¬¬(P→Q)→Q)→Q→¬¬¬(P→Q)→¬(P→Q)
- 参考解：28 个模块 / 61 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n4  atom P
n6  atom Q
n7  imp
n8  not
n15  axiom A1
n27  axiom A2
n31  atom R
n37  theorem *19
n78  not
n79  not
n83  imp
n89  mp M
n90  mp M
n91  mp M
n93  mp M
n95  subst S
n97  mp M
n98  mp M
n100  subst S
n103  subst S
n105  imp
n106  imp
n109  subst S
n137  subst S
n141  subst S
n143  imp
n144  imp
n146  subst S

wires:
n4.out -> n7.a
n6.out -> n7.b
n7.out -> n8.a
n8.out -> n78.a
n78.out -> n79.a
n79.out -> n83.a
n6.out -> n83.b
n37.out -> n95.assertion
n4.out -> n95.atom1
n8.out -> n95.formula1
n95.out -> n93.a
n15.out -> n100.assertion
n4.out -> n100.atom1
n8.out -> n100.formula1
n100.out -> n98.a
n15.out -> n103.assertion
n4.out -> n103.atom1
n6.out -> n105.a
n8.out -> n105.b
n8.out -> n106.a
n105.out -> n106.b
n106.out -> n103.formula1
n6.out -> n103.atom2
n79.out -> n103.formula2
n103.out -> n98.b
n98.out -> n97.a
n27.out -> n109.assertion
n4.out -> n109.atom1
n79.out -> n109.formula1
n6.out -> n109.atom2
n8.out -> n109.formula2
n31.out -> n109.atom3
n105.out -> n109.formula3
n109.out -> n97.b
n97.out -> n93.b
n93.out -> n91.a
n27.out -> n137.assertion
n4.out -> n137.atom1
n79.out -> n137.formula1
n31.out -> n137.atom2
n8.out -> n137.formula2
n137.out -> n91.b
n91.out -> n90.a
n15.out -> n141.assertion
n4.out -> n141.atom1
n79.out -> n143.a
n8.out -> n143.b
n83.out -> n144.a
n143.out -> n144.b
n144.out -> n141.formula1
n141.out -> n90.b
n90.out -> n89.a
n27.out -> n146.assertion
n4.out -> n146.atom1
n6.out -> n146.formula1
n6.out -> n146.atom2
n83.out -> n146.formula2
n31.out -> n146.atom3
n143.out -> n146.formula3
n146.out -> n89.b
n89.out -> tgt.proof
```

</details>

### 33 · 前件合并 · 中间结论

- 目标：`⊢ ( Q → ( ( ( P → Q ) → ( P → R ) ) → ( P → R ) ) )`
- 提示：Q→((P→Q)→P→R)→P→R
- 参考解：28 个模块 / 69 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  theorem *00
n6  subst S
n7  atom P
n9  atom Q
n10  imp
n11  atom R
n12  imp
n13  imp
n16  axiom A1
n25  axiom A2
n33  mp M
n34  mp M
n36  subst S
n39  mp M
n40  mp M
n42  subst S
n46  subst S
n48  imp
n49  imp
n51  subst S
n55  mp M
n56  mp M
n57  mp M
n59  subst S
n64  subst S
n66  imp
n67  imp
n69  subst S

wires:
n5.out -> n6.assertion
n7.out -> n6.atom1
n7.out -> n10.a
n9.out -> n10.b
n7.out -> n12.a
n11.out -> n12.b
n10.out -> n13.a
n12.out -> n13.b
n13.out -> n6.formula1
n16.out -> n36.assertion
n7.out -> n36.atom1
n9.out -> n36.formula1
n9.out -> n36.atom2
n7.out -> n36.formula2
n36.out -> n34.a
n16.out -> n42.assertion
n7.out -> n42.atom1
n10.out -> n42.formula1
n9.out -> n42.atom2
n13.out -> n42.formula2
n42.out -> n40.a
n16.out -> n46.assertion
n7.out -> n46.atom1
n13.out -> n48.a
n10.out -> n48.b
n10.out -> n49.a
n48.out -> n49.b
n49.out -> n46.formula1
n46.out -> n40.b
n40.out -> n39.a
n25.out -> n51.assertion
n7.out -> n51.atom1
n9.out -> n51.formula1
n9.out -> n51.atom2
n10.out -> n51.formula2
n11.out -> n51.atom3
n48.out -> n51.formula3
n51.out -> n39.b
n39.out -> n34.b
n34.out -> n33.a
n6.out -> n57.a
n25.out -> n59.assertion
n7.out -> n59.atom1
n13.out -> n59.formula1
n9.out -> n59.atom2
n10.out -> n59.formula2
n11.out -> n59.atom3
n12.out -> n59.formula3
n59.out -> n57.b
n57.out -> n56.a
n16.out -> n64.assertion
n7.out -> n64.atom1
n13.out -> n66.a
n12.out -> n66.b
n48.out -> n67.a
n66.out -> n67.b
n67.out -> n64.formula1
n64.out -> n56.b
n56.out -> n55.a
n25.out -> n69.assertion
n7.out -> n69.atom1
n9.out -> n69.formula1
n9.out -> n69.atom2
n48.out -> n69.formula2
n11.out -> n69.atom3
n66.out -> n69.formula3
n69.out -> n55.b
n55.out -> n33.b
n33.out -> tgt.proof
```

</details>

### 34 · 否定后件换位 · 中间结论

- 目标：`⊢ ( ¬ ¬ P → ( ( P → ¬ Q ) → ¬ Q ) )`
- 提示：¬¬P→(P→¬Q)→¬Q
- 参考解：29 个模块 / 65 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n4  theorem *00
n5  subst S
n6  atom P
n8  atom Q
n9  not
n10  imp
n13  axiom A1
n17  not
n18  not
n25  axiom A2
n29  atom R
n33  mp M
n34  mp M
n35  theorem *19
n36  mp M
n37  mp M
n39  subst S
n42  subst S
n44  imp
n45  imp
n48  subst S
n52  mp M
n53  mp M
n54  mp M
n56  subst S
n61  subst S
n63  imp
n64  imp
n67  subst S

wires:
n4.out -> n5.assertion
n6.out -> n5.atom1
n8.out -> n9.a
n6.out -> n10.a
n9.out -> n10.b
n10.out -> n5.formula1
n6.out -> n17.a
n17.out -> n18.a
n35.out -> n34.a
n13.out -> n39.assertion
n8.out -> n39.atom1
n10.out -> n39.formula1
n39.out -> n37.a
n13.out -> n42.assertion
n6.out -> n42.atom1
n10.out -> n44.a
n6.out -> n44.b
n6.out -> n45.a
n44.out -> n45.b
n45.out -> n42.formula1
n8.out -> n42.atom2
n18.out -> n42.formula2
n42.out -> n37.b
n37.out -> n36.a
n25.out -> n48.assertion
n6.out -> n48.atom1
n18.out -> n48.formula1
n8.out -> n48.atom2
n6.out -> n48.formula2
n29.out -> n48.atom3
n44.out -> n48.formula3
n48.out -> n36.b
n36.out -> n34.b
n34.out -> n33.a
n5.out -> n54.a
n25.out -> n56.assertion
n6.out -> n56.atom1
n10.out -> n56.formula1
n8.out -> n56.atom2
n6.out -> n56.formula2
n29.out -> n56.atom3
n9.out -> n56.formula3
n56.out -> n54.b
n54.out -> n53.a
n13.out -> n61.assertion
n6.out -> n61.atom1
n10.out -> n63.a
n9.out -> n63.b
n44.out -> n64.a
n63.out -> n64.b
n64.out -> n61.formula1
n8.out -> n61.atom2
n18.out -> n61.formula2
n61.out -> n53.b
n53.out -> n52.a
n25.out -> n67.assertion
n6.out -> n67.atom1
n18.out -> n67.formula1
n8.out -> n67.atom2
n44.out -> n67.formula2
n29.out -> n67.atom3
n63.out -> n67.formula3
n67.out -> n52.b
n52.out -> n33.b
n33.out -> tgt.proof
```

</details>

### 35 · 否定蕴涵取前件 · 中间结论

- 目标：`⊢ ( ( ¬ P → ( ¬ ¬ ¬ ( P → Q ) → ¬ P ) ) → ( ¬ P → ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) ) )`
- 提示：(¬P→¬¬¬(P→Q)→¬P)→¬P→¬¬¬(P→Q)→¬(P→Q)
- 参考解：29 个模块 / 68 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n10  atom P
n12  not
n15  axiom A1
n18  atom Q
n20  imp
n21  not
n22  not
n23  not
n27  imp
n30  axiom A2
n34  atom R
n35  mp M
n36  mp M
n37  mp M
n39  mp M
n40  theorem *19
n41  subst S
n43  mp M
n44  mp M
n46  subst S
n50  subst S
n52  imp
n53  imp
n56  subst S
n88  subst S
n93  subst S
n95  imp
n96  imp
n99  subst S

wires:
n10.out -> n12.a
n10.out -> n20.a
n18.out -> n20.b
n20.out -> n21.a
n21.out -> n22.a
n22.out -> n23.a
n23.out -> n27.a
n12.out -> n27.b
n40.out -> n41.assertion
n10.out -> n41.atom1
n21.out -> n41.formula1
n41.out -> n39.a
n15.out -> n46.assertion
n10.out -> n46.atom1
n21.out -> n46.formula1
n18.out -> n46.atom2
n12.out -> n46.formula2
n46.out -> n44.a
n15.out -> n50.assertion
n10.out -> n50.atom1
n12.out -> n52.a
n21.out -> n52.b
n21.out -> n53.a
n52.out -> n53.b
n53.out -> n50.formula1
n18.out -> n50.atom2
n23.out -> n50.formula2
n50.out -> n44.b
n44.out -> n43.a
n30.out -> n56.assertion
n10.out -> n56.atom1
n23.out -> n56.formula1
n18.out -> n56.atom2
n21.out -> n56.formula2
n34.out -> n56.atom3
n52.out -> n56.formula3
n56.out -> n43.b
n43.out -> n39.b
n39.out -> n37.a
n30.out -> n88.assertion
n10.out -> n88.atom1
n23.out -> n88.formula1
n18.out -> n88.atom2
n12.out -> n88.formula2
n34.out -> n88.atom3
n21.out -> n88.formula3
n88.out -> n37.b
n37.out -> n36.a
n15.out -> n93.assertion
n10.out -> n93.atom1
n23.out -> n95.a
n21.out -> n95.b
n27.out -> n96.a
n95.out -> n96.b
n96.out -> n93.formula1
n18.out -> n93.atom2
n12.out -> n93.formula2
n93.out -> n36.b
n36.out -> n35.a
n30.out -> n99.assertion
n10.out -> n99.atom1
n12.out -> n99.formula1
n18.out -> n99.atom2
n27.out -> n99.formula2
n34.out -> n99.atom3
n95.out -> n99.formula3
n99.out -> n35.b
n35.out -> tgt.proof
```

</details>

### 36 · 否定蕴涵取后件 · 中间结论

- 目标：`⊢ ( ( ¬ Q → ( ¬ ¬ ¬ ( P → ¬ Q ) → ¬ Q ) ) → ( ¬ Q → ( ¬ ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) ) )`
- 提示：(¬Q→¬¬¬(P→¬Q)→¬Q)→¬Q→¬¬¬(P→¬Q)→¬(P→¬Q)
- 参考解：29 个模块 / 68 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n7  atom P
n8  atom Q
n9  not
n12  axiom A1
n20  imp
n23  axiom A2
n27  atom R
n57  theorem *19
n174  not
n175  not
n176  not
n180  imp
n188  mp M
n189  mp M
n190  mp M
n192  mp M
n194  subst S
n196  mp M
n197  mp M
n199  subst S
n203  subst S
n205  imp
n206  imp
n209  subst S
n241  subst S
n246  subst S
n248  imp
n249  imp
n252  subst S

wires:
n8.out -> n9.a
n7.out -> n20.a
n9.out -> n20.b
n20.out -> n174.a
n174.out -> n175.a
n175.out -> n176.a
n176.out -> n180.a
n9.out -> n180.b
n57.out -> n194.assertion
n7.out -> n194.atom1
n174.out -> n194.formula1
n194.out -> n192.a
n12.out -> n199.assertion
n7.out -> n199.atom1
n174.out -> n199.formula1
n8.out -> n199.atom2
n9.out -> n199.formula2
n199.out -> n197.a
n12.out -> n203.assertion
n7.out -> n203.atom1
n9.out -> n205.a
n174.out -> n205.b
n174.out -> n206.a
n205.out -> n206.b
n206.out -> n203.formula1
n8.out -> n203.atom2
n176.out -> n203.formula2
n203.out -> n197.b
n197.out -> n196.a
n23.out -> n209.assertion
n7.out -> n209.atom1
n176.out -> n209.formula1
n8.out -> n209.atom2
n174.out -> n209.formula2
n27.out -> n209.atom3
n205.out -> n209.formula3
n209.out -> n196.b
n196.out -> n192.b
n192.out -> n190.a
n23.out -> n241.assertion
n7.out -> n241.atom1
n176.out -> n241.formula1
n8.out -> n241.atom2
n9.out -> n241.formula2
n27.out -> n241.atom3
n174.out -> n241.formula3
n241.out -> n190.b
n190.out -> n189.a
n12.out -> n246.assertion
n7.out -> n246.atom1
n176.out -> n248.a
n174.out -> n248.b
n180.out -> n249.a
n248.out -> n249.b
n249.out -> n246.formula1
n8.out -> n246.atom2
n9.out -> n246.formula2
n246.out -> n189.b
n189.out -> n188.a
n23.out -> n252.assertion
n7.out -> n252.atom1
n9.out -> n252.formula1
n8.out -> n252.atom2
n180.out -> n252.formula2
n27.out -> n252.atom3
n248.out -> n252.formula3
n252.out -> n188.b
n188.out -> tgt.proof
```

</details>

### 37 · 蕴涵组合 · 中间结论

- 目标：`⊢ ( ( ( R → S ) → ( ( P → Q ) → ( ( Q → S ) → ( P → S ) ) ) ) → ( ( R → S ) → ( ( P → Q ) → ( ( ( Q → R ) → ( Q → S ) ) → ( ( Q → R ) → ( P → S ) ) ) ) ) )`
- 提示：((R→S)→(P→Q)→(Q→S)→P→S)→(R→S)→(P→Q)→((Q→R)→Q→S)→(Q→R)→P→S
- 参考解：29 个模块 / 66 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  atom P
n7  atom Q
n8  imp
n11  axiom A1
n15  atom R
n16  atom S
n17  imp
n24  axiom A2
n34  theorem *05
n44  imp
n45  imp
n46  imp
n69  imp
n70  imp
n71  imp
n73  mp M
n74  mp M
n75  mp M
n76  mp M
n78  subst S
n83  subst S
n85  imp
n86  imp
n87  imp
n90  subst S
n95  subst S
n97  imp
n98  imp
n101  subst S

wires:
n5.out -> n8.a
n7.out -> n8.b
n15.out -> n17.a
n16.out -> n17.b
n7.out -> n44.a
n15.out -> n44.b
n7.out -> n45.a
n16.out -> n45.b
n44.out -> n46.a
n45.out -> n46.b
n5.out -> n69.a
n16.out -> n69.b
n45.out -> n70.a
n69.out -> n70.b
n8.out -> n71.a
n70.out -> n71.b
n34.out -> n78.assertion
n5.out -> n78.atom1
n45.out -> n78.formula1
n7.out -> n78.atom2
n69.out -> n78.formula2
n15.out -> n78.atom3
n44.out -> n78.formula3
n78.out -> n76.a
n11.out -> n83.assertion
n5.out -> n83.atom1
n44.out -> n85.a
n69.out -> n85.b
n46.out -> n86.a
n85.out -> n86.b
n70.out -> n87.a
n86.out -> n87.b
n87.out -> n83.formula1
n7.out -> n83.atom2
n8.out -> n83.formula2
n83.out -> n76.b
n76.out -> n75.a
n24.out -> n90.assertion
n5.out -> n90.atom1
n8.out -> n90.formula1
n7.out -> n90.atom2
n70.out -> n90.formula2
n15.out -> n90.atom3
n86.out -> n90.formula3
n90.out -> n75.b
n75.out -> n74.a
n11.out -> n95.assertion
n5.out -> n95.atom1
n8.out -> n97.a
n86.out -> n97.b
n71.out -> n98.a
n97.out -> n98.b
n98.out -> n95.formula1
n7.out -> n95.atom2
n17.out -> n95.formula2
n95.out -> n74.b
n74.out -> n73.a
n24.out -> n101.assertion
n5.out -> n101.atom1
n17.out -> n101.formula1
n7.out -> n101.atom2
n71.out -> n101.formula2
n15.out -> n101.atom3
n97.out -> n101.formula3
n101.out -> n73.b
n73.out -> tgt.proof
```

</details>

### 38 · 前件交换 · 中间结论

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( Q → ( ( P → ( Q → R ) ) → ( P → R ) ) ) )`
- 提示：(P→Q→R)→Q→(P→Q→R)→P→R
- 参考解：29 个模块 / 70 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  atom P
n7  atom Q
n8  atom R
n9  imp
n10  imp
n13  axiom A1
n22  axiom A2
n29  mp M
n30  mp M
n31  theorem *07
n32  subst S
n36  subst S
n38  imp
n39  imp
n41  mp M
n42  mp M
n43  mp M
n44  mp M
n45  theorem *05
n46  subst S
n51  subst S
n53  imp
n54  imp
n55  imp
n57  subst S
n62  subst S
n64  imp
n65  imp
n68  subst S

wires:
n7.out -> n9.a
n8.out -> n9.b
n5.out -> n10.a
n9.out -> n10.b
n31.out -> n32.assertion
n5.out -> n32.atom1
n7.out -> n32.formula1
n7.out -> n32.atom2
n8.out -> n32.formula2
n32.out -> n30.a
n13.out -> n36.assertion
n5.out -> n36.atom1
n9.out -> n38.a
n8.out -> n38.b
n7.out -> n39.a
n38.out -> n39.b
n39.out -> n36.formula1
n7.out -> n36.atom2
n10.out -> n36.formula2
n36.out -> n30.b
n30.out -> n29.a
n45.out -> n46.assertion
n5.out -> n46.atom1
n9.out -> n46.formula1
n7.out -> n46.atom2
n8.out -> n46.formula2
n8.out -> n46.atom3
n5.out -> n46.formula3
n46.out -> n44.a
n13.out -> n51.assertion
n5.out -> n51.atom1
n5.out -> n53.a
n8.out -> n53.b
n10.out -> n54.a
n53.out -> n54.b
n38.out -> n55.a
n54.out -> n55.b
n55.out -> n51.formula1
n51.out -> n44.b
n44.out -> n43.a
n22.out -> n57.assertion
n5.out -> n57.atom1
n7.out -> n57.formula1
n7.out -> n57.atom2
n38.out -> n57.formula2
n8.out -> n57.atom3
n54.out -> n57.formula3
n57.out -> n43.b
n43.out -> n42.a
n13.out -> n62.assertion
n5.out -> n62.atom1
n7.out -> n64.a
n54.out -> n64.b
n39.out -> n65.a
n64.out -> n65.b
n65.out -> n62.formula1
n7.out -> n62.atom2
n10.out -> n62.formula2
n62.out -> n42.b
n42.out -> n41.a
n22.out -> n68.assertion
n5.out -> n68.atom1
n10.out -> n68.formula1
n7.out -> n68.atom2
n39.out -> n68.formula2
n8.out -> n68.atom3
n64.out -> n68.formula3
n68.out -> n41.b
n41.out -> n29.b
n29.out -> tgt.proof
```

</details>

### 39 · 双重否定引入 · 中间结论

- 目标：`⊢ ( P → ( ¬ ¬ ¬ P → ¬ P ) )`
- 提示：P→¬¬¬P→¬P
- 参考解：29 个模块 / 68 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  mp M
n9  axiom A1
n10  subst S
n11  atom Q
n12  atom P
n13  not
n14  not
n15  not
n19  imp
n22  axiom A2
n25  atom R
n26  mp M
n27  mp M
n28  mp M
n30  mp M
n31  theorem *19
n32  subst S
n34  mp M
n35  mp M
n37  subst S
n41  subst S
n43  imp
n44  imp
n47  subst S
n78  subst S
n83  subst S
n85  imp
n86  imp
n89  subst S

wires:
n9.out -> n10.assertion
n11.out -> n10.atom1
n12.out -> n13.a
n13.out -> n14.a
n14.out -> n15.a
n15.out -> n10.formula1
n15.out -> n19.a
n12.out -> n19.b
n10.out -> n5.a
n31.out -> n32.assertion
n12.out -> n32.atom1
n13.out -> n32.formula1
n32.out -> n30.a
n9.out -> n37.assertion
n12.out -> n37.atom1
n13.out -> n37.formula1
n11.out -> n37.atom2
n12.out -> n37.formula2
n37.out -> n35.a
n9.out -> n41.assertion
n12.out -> n41.atom1
n12.out -> n43.a
n13.out -> n43.b
n13.out -> n44.a
n43.out -> n44.b
n44.out -> n41.formula1
n11.out -> n41.atom2
n15.out -> n41.formula2
n41.out -> n35.b
n35.out -> n34.a
n22.out -> n47.assertion
n12.out -> n47.atom1
n15.out -> n47.formula1
n11.out -> n47.atom2
n13.out -> n47.formula2
n25.out -> n47.atom3
n43.out -> n47.formula3
n47.out -> n34.b
n34.out -> n30.b
n30.out -> n28.a
n22.out -> n78.assertion
n12.out -> n78.atom1
n15.out -> n78.formula1
n11.out -> n78.atom2
n12.out -> n78.formula2
n25.out -> n78.atom3
n13.out -> n78.formula3
n78.out -> n28.b
n28.out -> n27.a
n9.out -> n83.assertion
n12.out -> n83.atom1
n15.out -> n85.a
n13.out -> n85.b
n19.out -> n86.a
n85.out -> n86.b
n86.out -> n83.formula1
n11.out -> n83.atom2
n12.out -> n83.formula2
n83.out -> n27.b
n27.out -> n26.a
n22.out -> n89.assertion
n11.out -> n89.atom1
n19.out -> n89.formula1
n25.out -> n89.atom2
n85.out -> n89.formula2
n89.out -> n26.b
n26.out -> n5.b
n5.out -> tgt.proof
```

</details>

### 40 · 逆否 · 中间结论

- 目标：`⊢ ( ( ¬ ¬ P → ( P → Q ) ) → ( ¬ ¬ P → Q ) )`
- 提示：(¬¬P→P→Q)→¬¬P→Q
- 参考解：30 个模块 / 73 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  theorem *00
n6  subst S
n7  atom P
n9  atom Q
n10  imp
n13  axiom A1
n17  not
n18  not
n25  axiom A2
n29  atom R
n32  mp M
n33  mp M
n34  mp M
n35  theorem *19
n36  mp M
n37  mp M
n39  subst S
n42  subst S
n44  imp
n45  imp
n48  subst S
n52  mp M
n53  mp M
n54  mp M
n56  subst S
n61  subst S
n63  imp
n64  imp
n67  subst S
n72  subst S

wires:
n5.out -> n6.assertion
n7.out -> n6.atom1
n7.out -> n10.a
n9.out -> n10.b
n10.out -> n6.formula1
n7.out -> n17.a
n17.out -> n18.a
n35.out -> n34.a
n13.out -> n39.assertion
n9.out -> n39.atom1
n10.out -> n39.formula1
n39.out -> n37.a
n13.out -> n42.assertion
n7.out -> n42.atom1
n10.out -> n44.a
n7.out -> n44.b
n7.out -> n45.a
n44.out -> n45.b
n45.out -> n42.formula1
n9.out -> n42.atom2
n18.out -> n42.formula2
n42.out -> n37.b
n37.out -> n36.a
n25.out -> n48.assertion
n7.out -> n48.atom1
n18.out -> n48.formula1
n9.out -> n48.atom2
n7.out -> n48.formula2
n29.out -> n48.atom3
n44.out -> n48.formula3
n48.out -> n36.b
n36.out -> n34.b
n34.out -> n33.a
n6.out -> n54.a
n25.out -> n56.assertion
n7.out -> n56.atom1
n10.out -> n56.formula1
n9.out -> n56.atom2
n7.out -> n56.formula2
n29.out -> n56.atom3
n9.out -> n56.formula3
n56.out -> n54.b
n54.out -> n53.a
n13.out -> n61.assertion
n7.out -> n61.atom1
n10.out -> n63.a
n9.out -> n63.b
n44.out -> n64.a
n63.out -> n64.b
n64.out -> n61.formula1
n9.out -> n61.atom2
n18.out -> n61.formula2
n61.out -> n53.b
n53.out -> n52.a
n25.out -> n67.assertion
n7.out -> n67.atom1
n18.out -> n67.formula1
n9.out -> n67.atom2
n44.out -> n67.formula2
n29.out -> n67.atom3
n63.out -> n67.formula3
n67.out -> n52.b
n52.out -> n33.b
n33.out -> n32.a
n25.out -> n72.assertion
n7.out -> n72.atom1
n18.out -> n72.formula1
n9.out -> n72.atom2
n10.out -> n72.formula2
n29.out -> n72.atom3
n9.out -> n72.formula3
n72.out -> n32.b
n32.out -> tgt.proof
```

</details>

### 41 · 前件合并 · 中间结论

- 目标：`⊢ ( ( Q → ( ( P → Q ) → ( P → R ) ) ) → ( Q → ( P → R ) ) )`
- 提示：(Q→(P→Q)→P→R)→Q→P→R
- 参考解：30 个模块 / 78 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  theorem *00
n6  subst S
n7  atom P
n9  atom Q
n10  imp
n11  atom R
n12  imp
n13  imp
n16  axiom A1
n25  axiom A2
n32  mp M
n33  mp M
n34  mp M
n36  subst S
n39  mp M
n40  mp M
n42  subst S
n46  subst S
n48  imp
n49  imp
n51  subst S
n55  mp M
n56  mp M
n57  mp M
n59  subst S
n64  subst S
n66  imp
n67  imp
n69  subst S
n74  subst S

wires:
n5.out -> n6.assertion
n7.out -> n6.atom1
n7.out -> n10.a
n9.out -> n10.b
n7.out -> n12.a
n11.out -> n12.b
n10.out -> n13.a
n12.out -> n13.b
n13.out -> n6.formula1
n16.out -> n36.assertion
n7.out -> n36.atom1
n9.out -> n36.formula1
n9.out -> n36.atom2
n7.out -> n36.formula2
n36.out -> n34.a
n16.out -> n42.assertion
n7.out -> n42.atom1
n10.out -> n42.formula1
n9.out -> n42.atom2
n13.out -> n42.formula2
n42.out -> n40.a
n16.out -> n46.assertion
n7.out -> n46.atom1
n13.out -> n48.a
n10.out -> n48.b
n10.out -> n49.a
n48.out -> n49.b
n49.out -> n46.formula1
n46.out -> n40.b
n40.out -> n39.a
n25.out -> n51.assertion
n7.out -> n51.atom1
n9.out -> n51.formula1
n9.out -> n51.atom2
n10.out -> n51.formula2
n11.out -> n51.atom3
n48.out -> n51.formula3
n51.out -> n39.b
n39.out -> n34.b
n34.out -> n33.a
n6.out -> n57.a
n25.out -> n59.assertion
n7.out -> n59.atom1
n13.out -> n59.formula1
n9.out -> n59.atom2
n10.out -> n59.formula2
n11.out -> n59.atom3
n12.out -> n59.formula3
n59.out -> n57.b
n57.out -> n56.a
n16.out -> n64.assertion
n7.out -> n64.atom1
n13.out -> n66.a
n12.out -> n66.b
n48.out -> n67.a
n66.out -> n67.b
n67.out -> n64.formula1
n64.out -> n56.b
n56.out -> n55.a
n25.out -> n69.assertion
n7.out -> n69.atom1
n9.out -> n69.formula1
n9.out -> n69.atom2
n48.out -> n69.formula2
n11.out -> n69.atom3
n66.out -> n69.formula3
n69.out -> n55.b
n55.out -> n33.b
n33.out -> n32.a
n25.out -> n74.assertion
n7.out -> n74.atom1
n9.out -> n74.formula1
n9.out -> n74.atom2
n13.out -> n74.formula2
n11.out -> n74.atom3
n12.out -> n74.formula3
n74.out -> n32.b
n32.out -> tgt.proof
```

</details>

### 42 · 合取前件导出 · 中间结论

- 目标：`⊢ ( P → ( ( ¬ ( P → ¬ Q ) → R ) → ( ( Q → ¬ ( P → ¬ Q ) ) → ( Q → R ) ) ) )`
- 提示：P→(¬(P→¬Q)→R)→(Q→¬(P→¬Q))→Q→R
- 参考解：30 个模块 / 68 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n3  theorem *00
n4  subst S
n5  atom P
n7  atom Q
n8  not
n9  imp
n10  not
n11  atom R
n12  imp
n15  axiom A1
n25  axiom A2
n41  imp
n55  mp M
n56  mp M
n58  subst S
n60  imp
n62  mp M
n63  mp M
n64  mp M
n65  mp M
n66  theorem *05
n67  subst S
n72  subst S
n74  imp
n75  imp
n76  imp
n79  subst S
n84  subst S
n86  imp
n89  subst S

wires:
n3.out -> n4.assertion
n5.out -> n4.atom1
n7.out -> n8.a
n5.out -> n9.a
n8.out -> n9.b
n9.out -> n10.a
n10.out -> n12.a
n11.out -> n12.b
n12.out -> n4.formula1
n7.out -> n41.a
n10.out -> n41.b
n4.out -> n56.a
n15.out -> n58.assertion
n5.out -> n58.atom1
n12.out -> n60.a
n12.out -> n60.b
n60.out -> n58.formula1
n7.out -> n58.atom2
n5.out -> n58.formula2
n58.out -> n56.b
n56.out -> n55.a
n66.out -> n67.assertion
n5.out -> n67.atom1
n10.out -> n67.formula1
n7.out -> n67.atom2
n11.out -> n67.formula2
n11.out -> n67.atom3
n7.out -> n67.formula3
n67.out -> n65.a
n15.out -> n72.assertion
n5.out -> n72.atom1
n7.out -> n74.a
n11.out -> n74.b
n41.out -> n75.a
n74.out -> n75.b
n12.out -> n76.a
n75.out -> n76.b
n76.out -> n72.formula1
n7.out -> n72.atom2
n12.out -> n72.formula2
n72.out -> n65.b
n65.out -> n64.a
n25.out -> n79.assertion
n5.out -> n79.atom1
n12.out -> n79.formula1
n7.out -> n79.atom2
n12.out -> n79.formula2
n11.out -> n79.atom3
n75.out -> n79.formula3
n79.out -> n64.b
n64.out -> n63.a
n15.out -> n84.assertion
n5.out -> n84.atom1
n60.out -> n86.a
n76.out -> n86.b
n86.out -> n84.formula1
n7.out -> n84.atom2
n5.out -> n84.formula2
n84.out -> n63.b
n63.out -> n62.a
n25.out -> n89.assertion
n7.out -> n89.atom1
n60.out -> n89.formula1
n11.out -> n89.atom2
n76.out -> n89.formula2
n89.out -> n62.b
n62.out -> n55.b
n55.out -> tgt.proof
```

</details>

### 43 · 否定蕴涵取后件 · 中间结论

- 目标：`⊢ ( Q → ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) )`
- 提示：Q→¬¬¬(P→Q)→¬(P→Q)
- 参考解：30 个模块 / 68 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n4  atom P
n6  atom Q
n7  imp
n8  not
n15  axiom A1
n27  axiom A2
n31  atom R
n37  theorem *19
n67  mp M
n75  subst S
n78  not
n79  not
n83  imp
n89  mp M
n90  mp M
n91  mp M
n93  mp M
n95  subst S
n97  mp M
n98  mp M
n100  subst S
n103  subst S
n105  imp
n106  imp
n109  subst S
n137  subst S
n141  subst S
n143  imp
n144  imp
n146  subst S

wires:
n4.out -> n7.a
n6.out -> n7.b
n7.out -> n8.a
n15.out -> n75.assertion
n4.out -> n75.atom1
n6.out -> n75.formula1
n6.out -> n75.atom2
n8.out -> n78.a
n78.out -> n79.a
n79.out -> n75.formula2
n79.out -> n83.a
n6.out -> n83.b
n75.out -> n67.a
n37.out -> n95.assertion
n4.out -> n95.atom1
n8.out -> n95.formula1
n95.out -> n93.a
n15.out -> n100.assertion
n4.out -> n100.atom1
n8.out -> n100.formula1
n100.out -> n98.a
n15.out -> n103.assertion
n4.out -> n103.atom1
n6.out -> n105.a
n8.out -> n105.b
n8.out -> n106.a
n105.out -> n106.b
n106.out -> n103.formula1
n6.out -> n103.atom2
n79.out -> n103.formula2
n103.out -> n98.b
n98.out -> n97.a
n27.out -> n109.assertion
n4.out -> n109.atom1
n79.out -> n109.formula1
n6.out -> n109.atom2
n8.out -> n109.formula2
n31.out -> n109.atom3
n105.out -> n109.formula3
n109.out -> n97.b
n97.out -> n93.b
n93.out -> n91.a
n27.out -> n137.assertion
n4.out -> n137.atom1
n79.out -> n137.formula1
n31.out -> n137.atom2
n8.out -> n137.formula2
n137.out -> n91.b
n91.out -> n90.a
n15.out -> n141.assertion
n4.out -> n141.atom1
n79.out -> n143.a
n8.out -> n143.b
n83.out -> n144.a
n143.out -> n144.b
n144.out -> n141.formula1
n141.out -> n90.b
n90.out -> n89.a
n27.out -> n146.assertion
n4.out -> n146.atom1
n6.out -> n146.formula1
n6.out -> n146.atom2
n83.out -> n146.formula2
n31.out -> n146.atom3
n143.out -> n146.formula3
n146.out -> n89.b
n89.out -> n67.b
n67.out -> tgt.proof
```

</details>

### 44 · 合取的蕴涵形式

- 目标：`⊢ ( P → ( Q → ¬ ( P → ¬ Q ) ) )`
- 提示：P→Q→¬(P→¬Q)
- 参考解：31 个模块 / 66 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n101  target
n1  mp M
n2  mp M
n7  axiom A1
n8  subst S
n9  atom Q
n10  atom P
n12  not
n13  imp
n14  not
n15  not
n19  imp
n22  axiom A2
n25  atom R
n26  mp M
n27  mp M
n28  mp M
n31  theorem *19
n32  subst S
n72  subst S
n77  subst S
n79  imp
n80  imp
n83  subst S
n86  mp M
n87  mp M
n88  theorem *v
n89  subst S
n92  subst S
n94  imp
n95  imp
n98  subst S

wires:
n7.out -> n8.assertion
n9.out -> n8.atom1
n9.out -> n12.a
n10.out -> n13.a
n12.out -> n13.b
n13.out -> n14.a
n14.out -> n15.a
n15.out -> n8.formula1
n15.out -> n19.a
n10.out -> n19.b
n8.out -> n2.a
n31.out -> n32.assertion
n10.out -> n32.atom1
n13.out -> n32.formula1
n32.out -> n28.a
n22.out -> n72.assertion
n10.out -> n72.atom1
n15.out -> n72.formula1
n9.out -> n72.atom2
n10.out -> n72.formula2
n25.out -> n72.atom3
n12.out -> n72.formula3
n72.out -> n28.b
n28.out -> n27.a
n7.out -> n77.assertion
n10.out -> n77.atom1
n15.out -> n79.a
n12.out -> n79.b
n19.out -> n80.a
n79.out -> n80.b
n80.out -> n77.formula1
n9.out -> n77.atom2
n10.out -> n77.formula2
n77.out -> n27.b
n27.out -> n26.a
n22.out -> n83.assertion
n9.out -> n83.atom1
n19.out -> n83.formula1
n25.out -> n83.atom2
n79.out -> n83.formula2
n83.out -> n26.b
n26.out -> n2.b
n2.out -> n1.a
n88.out -> n89.assertion
n10.out -> n89.atom1
n14.out -> n89.formula1
n89.out -> n87.a
n7.out -> n92.assertion
n10.out -> n92.atom1
n9.out -> n94.a
n14.out -> n94.b
n79.out -> n95.a
n94.out -> n95.b
n95.out -> n92.formula1
n9.out -> n92.atom2
n10.out -> n92.formula2
n92.out -> n87.b
n87.out -> n86.a
n22.out -> n98.assertion
n9.out -> n98.atom1
n79.out -> n98.formula1
n25.out -> n98.atom2
n94.out -> n98.formula2
n98.out -> n86.b
n86.out -> n1.b
n1.out -> n101.proof
```

</details>

### 45 · 否定蕴涵取前件 · 中间结论

- 目标：`⊢ ( ¬ P → ( ¬ ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) )`
- 提示：¬P→¬¬¬(P→Q)→¬(P→Q)
- 参考解：31 个模块 / 75 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n6  mp M
n10  atom P
n12  not
n15  axiom A1
n16  subst S
n18  atom Q
n20  imp
n21  not
n22  not
n23  not
n27  imp
n30  axiom A2
n34  atom R
n35  mp M
n36  mp M
n37  mp M
n39  mp M
n40  theorem *19
n41  subst S
n43  mp M
n44  mp M
n46  subst S
n50  subst S
n52  imp
n53  imp
n56  subst S
n88  subst S
n93  subst S
n95  imp
n96  imp
n99  subst S

wires:
n10.out -> n12.a
n15.out -> n16.assertion
n10.out -> n16.atom1
n12.out -> n16.formula1
n18.out -> n16.atom2
n10.out -> n20.a
n18.out -> n20.b
n20.out -> n21.a
n21.out -> n22.a
n22.out -> n23.a
n23.out -> n16.formula2
n23.out -> n27.a
n12.out -> n27.b
n16.out -> n6.a
n40.out -> n41.assertion
n10.out -> n41.atom1
n21.out -> n41.formula1
n41.out -> n39.a
n15.out -> n46.assertion
n10.out -> n46.atom1
n21.out -> n46.formula1
n18.out -> n46.atom2
n12.out -> n46.formula2
n46.out -> n44.a
n15.out -> n50.assertion
n10.out -> n50.atom1
n12.out -> n52.a
n21.out -> n52.b
n21.out -> n53.a
n52.out -> n53.b
n53.out -> n50.formula1
n18.out -> n50.atom2
n23.out -> n50.formula2
n50.out -> n44.b
n44.out -> n43.a
n30.out -> n56.assertion
n10.out -> n56.atom1
n23.out -> n56.formula1
n18.out -> n56.atom2
n21.out -> n56.formula2
n34.out -> n56.atom3
n52.out -> n56.formula3
n56.out -> n43.b
n43.out -> n39.b
n39.out -> n37.a
n30.out -> n88.assertion
n10.out -> n88.atom1
n23.out -> n88.formula1
n18.out -> n88.atom2
n12.out -> n88.formula2
n34.out -> n88.atom3
n21.out -> n88.formula3
n88.out -> n37.b
n37.out -> n36.a
n15.out -> n93.assertion
n10.out -> n93.atom1
n23.out -> n95.a
n21.out -> n95.b
n27.out -> n96.a
n95.out -> n96.b
n96.out -> n93.formula1
n18.out -> n93.atom2
n12.out -> n93.formula2
n93.out -> n36.b
n36.out -> n35.a
n30.out -> n99.assertion
n10.out -> n99.atom1
n12.out -> n99.formula1
n18.out -> n99.atom2
n27.out -> n99.formula2
n34.out -> n99.atom3
n95.out -> n99.formula3
n99.out -> n35.b
n35.out -> n6.b
n6.out -> tgt.proof
```

</details>

### 46 · 否定蕴涵取后件 · 中间结论

- 目标：`⊢ ( ¬ Q → ( ¬ ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) )`
- 提示：¬Q→¬¬¬(P→¬Q)→¬(P→¬Q)
- 参考解：31 个模块 / 75 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n7  atom P
n8  atom Q
n9  not
n12  axiom A1
n20  imp
n23  axiom A2
n27  atom R
n57  theorem *19
n166  mp M
n171  subst S
n174  not
n175  not
n176  not
n180  imp
n188  mp M
n189  mp M
n190  mp M
n192  mp M
n194  subst S
n196  mp M
n197  mp M
n199  subst S
n203  subst S
n205  imp
n206  imp
n209  subst S
n241  subst S
n246  subst S
n248  imp
n249  imp
n252  subst S

wires:
n8.out -> n9.a
n7.out -> n20.a
n9.out -> n20.b
n12.out -> n171.assertion
n7.out -> n171.atom1
n9.out -> n171.formula1
n8.out -> n171.atom2
n20.out -> n174.a
n174.out -> n175.a
n175.out -> n176.a
n176.out -> n171.formula2
n176.out -> n180.a
n9.out -> n180.b
n171.out -> n166.a
n57.out -> n194.assertion
n7.out -> n194.atom1
n174.out -> n194.formula1
n194.out -> n192.a
n12.out -> n199.assertion
n7.out -> n199.atom1
n174.out -> n199.formula1
n8.out -> n199.atom2
n9.out -> n199.formula2
n199.out -> n197.a
n12.out -> n203.assertion
n7.out -> n203.atom1
n9.out -> n205.a
n174.out -> n205.b
n174.out -> n206.a
n205.out -> n206.b
n206.out -> n203.formula1
n8.out -> n203.atom2
n176.out -> n203.formula2
n203.out -> n197.b
n197.out -> n196.a
n23.out -> n209.assertion
n7.out -> n209.atom1
n176.out -> n209.formula1
n8.out -> n209.atom2
n174.out -> n209.formula2
n27.out -> n209.atom3
n205.out -> n209.formula3
n209.out -> n196.b
n196.out -> n192.b
n192.out -> n190.a
n23.out -> n241.assertion
n7.out -> n241.atom1
n176.out -> n241.formula1
n8.out -> n241.atom2
n9.out -> n241.formula2
n27.out -> n241.atom3
n174.out -> n241.formula3
n241.out -> n190.b
n190.out -> n189.a
n12.out -> n246.assertion
n7.out -> n246.atom1
n176.out -> n248.a
n174.out -> n248.b
n180.out -> n249.a
n248.out -> n249.b
n249.out -> n246.formula1
n8.out -> n246.atom2
n9.out -> n246.formula2
n246.out -> n189.b
n189.out -> n188.a
n23.out -> n252.assertion
n7.out -> n252.atom1
n9.out -> n252.formula1
n8.out -> n252.atom2
n180.out -> n252.formula2
n27.out -> n252.atom3
n248.out -> n252.formula3
n252.out -> n188.b
n188.out -> n166.b
n166.out -> tgt.proof
```

</details>

### 47 · 否定后件换位 · 中间结论

- 目标：`⊢ ( ( ¬ ¬ P → ( P → ¬ Q ) ) → ( ¬ ¬ P → ¬ Q ) )`
- 提示：(¬¬P→P→¬Q)→¬¬P→¬Q
- 参考解：31 个模块 / 74 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n4  theorem *00
n5  subst S
n6  atom P
n8  atom Q
n9  not
n10  imp
n13  axiom A1
n17  not
n18  not
n25  axiom A2
n29  atom R
n32  mp M
n33  mp M
n34  mp M
n35  theorem *19
n36  mp M
n37  mp M
n39  subst S
n42  subst S
n44  imp
n45  imp
n48  subst S
n52  mp M
n53  mp M
n54  mp M
n56  subst S
n61  subst S
n63  imp
n64  imp
n67  subst S
n72  subst S

wires:
n4.out -> n5.assertion
n6.out -> n5.atom1
n8.out -> n9.a
n6.out -> n10.a
n9.out -> n10.b
n10.out -> n5.formula1
n6.out -> n17.a
n17.out -> n18.a
n35.out -> n34.a
n13.out -> n39.assertion
n8.out -> n39.atom1
n10.out -> n39.formula1
n39.out -> n37.a
n13.out -> n42.assertion
n6.out -> n42.atom1
n10.out -> n44.a
n6.out -> n44.b
n6.out -> n45.a
n44.out -> n45.b
n45.out -> n42.formula1
n8.out -> n42.atom2
n18.out -> n42.formula2
n42.out -> n37.b
n37.out -> n36.a
n25.out -> n48.assertion
n6.out -> n48.atom1
n18.out -> n48.formula1
n8.out -> n48.atom2
n6.out -> n48.formula2
n29.out -> n48.atom3
n44.out -> n48.formula3
n48.out -> n36.b
n36.out -> n34.b
n34.out -> n33.a
n5.out -> n54.a
n25.out -> n56.assertion
n6.out -> n56.atom1
n10.out -> n56.formula1
n8.out -> n56.atom2
n6.out -> n56.formula2
n29.out -> n56.atom3
n9.out -> n56.formula3
n56.out -> n54.b
n54.out -> n53.a
n13.out -> n61.assertion
n6.out -> n61.atom1
n10.out -> n63.a
n9.out -> n63.b
n44.out -> n64.a
n63.out -> n64.b
n64.out -> n61.formula1
n8.out -> n61.atom2
n18.out -> n61.formula2
n61.out -> n53.b
n53.out -> n52.a
n25.out -> n67.assertion
n6.out -> n67.atom1
n18.out -> n67.formula1
n8.out -> n67.atom2
n44.out -> n67.formula2
n29.out -> n67.atom3
n63.out -> n67.formula3
n67.out -> n52.b
n52.out -> n33.b
n33.out -> n32.a
n25.out -> n72.assertion
n6.out -> n72.atom1
n18.out -> n72.formula1
n8.out -> n72.atom2
n10.out -> n72.formula2
n29.out -> n72.atom3
n9.out -> n72.formula3
n72.out -> n32.b
n32.out -> tgt.proof
```

</details>

### 48 · 前件合并 · 中间结论

- 目标：`⊢ ( ( ( P → Q ) → ( P → R ) ) → ( P → ( ( Q → ( P → R ) ) → ( Q → R ) ) ) )`
- 提示：((P→Q)→P→R)→P→(Q→P→R)→Q→R
- 参考解：31 个模块 / 72 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n7  atom P
n9  atom Q
n10  imp
n11  atom R
n12  imp
n13  imp
n16  axiom A1
n25  axiom A2
n81  imp
n108  mp M
n109  mp M
n110  theorem *07
n111  subst S
n114  subst S
n116  imp
n117  imp
n119  mp M
n120  mp M
n121  mp M
n122  mp M
n123  theorem *05
n124  subst S
n129  subst S
n131  imp
n132  imp
n133  imp
n136  subst S
n140  subst S
n142  imp
n143  imp
n146  subst S

wires:
n7.out -> n10.a
n9.out -> n10.b
n7.out -> n12.a
n11.out -> n12.b
n10.out -> n13.a
n12.out -> n13.b
n9.out -> n81.a
n12.out -> n81.b
n110.out -> n111.assertion
n9.out -> n111.atom1
n11.out -> n111.formula1
n111.out -> n109.a
n16.out -> n114.assertion
n7.out -> n114.atom1
n12.out -> n116.a
n11.out -> n116.b
n7.out -> n117.a
n116.out -> n117.b
n117.out -> n114.formula1
n9.out -> n114.atom2
n13.out -> n114.formula2
n114.out -> n109.b
n109.out -> n108.a
n123.out -> n124.assertion
n7.out -> n124.atom1
n12.out -> n124.formula1
n9.out -> n124.atom2
n11.out -> n124.formula2
n11.out -> n124.atom3
n9.out -> n124.formula3
n124.out -> n122.a
n16.out -> n129.assertion
n7.out -> n129.atom1
n9.out -> n131.a
n11.out -> n131.b
n81.out -> n132.a
n131.out -> n132.b
n116.out -> n133.a
n132.out -> n133.b
n133.out -> n129.formula1
n9.out -> n129.atom2
n7.out -> n129.formula2
n129.out -> n122.b
n122.out -> n121.a
n25.out -> n136.assertion
n9.out -> n136.atom1
n116.out -> n136.formula1
n11.out -> n136.atom2
n132.out -> n136.formula2
n136.out -> n121.b
n121.out -> n120.a
n16.out -> n140.assertion
n7.out -> n140.atom1
n7.out -> n142.a
n132.out -> n142.b
n117.out -> n143.a
n142.out -> n143.b
n143.out -> n140.formula1
n9.out -> n140.atom2
n13.out -> n140.formula2
n140.out -> n120.b
n120.out -> n119.a
n25.out -> n146.assertion
n7.out -> n146.atom1
n13.out -> n146.formula1
n9.out -> n146.atom2
n117.out -> n146.formula2
n11.out -> n146.atom3
n142.out -> n146.formula3
n146.out -> n119.b
n119.out -> n108.b
n108.out -> tgt.proof
```

</details>

### 49 · 皮尔士回滚 · 中间结论

- 目标：`⊢ ( ( ( P → Q ) → R ) → ( ( ( ( P → Q ) → P ) → P ) → ( ( ( R → P ) → ( ( P → Q ) → P ) ) → ( ( R → P ) → P ) ) ) )`
- 提示：((P→Q)→R)→(((P→Q)→P)→P)→((R→P)→(P→Q)→P)→(R→P)→P
- 参考解：31 个模块 / 74 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n3  theorem *00
n4  subst S
n5  atom P
n7  atom Q
n8  imp
n9  imp
n10  imp
n13  axiom A1
n17  atom R
n18  imp
n25  axiom A2
n45  imp
n46  imp
n61  mp M
n62  mp M
n64  subst S
n66  imp
n68  mp M
n69  mp M
n70  mp M
n71  mp M
n72  theorem *05
n73  subst S
n78  subst S
n80  imp
n81  imp
n82  imp
n85  subst S
n90  subst S
n92  imp
n95  subst S

wires:
n3.out -> n4.assertion
n5.out -> n4.atom1
n5.out -> n8.a
n7.out -> n8.b
n8.out -> n9.a
n5.out -> n9.b
n9.out -> n10.a
n5.out -> n10.b
n10.out -> n4.formula1
n8.out -> n18.a
n17.out -> n18.b
n17.out -> n45.a
n5.out -> n45.b
n45.out -> n46.a
n9.out -> n46.b
n4.out -> n62.a
n13.out -> n64.assertion
n5.out -> n64.atom1
n10.out -> n66.a
n10.out -> n66.b
n66.out -> n64.formula1
n7.out -> n64.atom2
n18.out -> n64.formula2
n64.out -> n62.b
n62.out -> n61.a
n72.out -> n73.assertion
n5.out -> n73.atom1
n9.out -> n73.formula1
n7.out -> n73.atom2
n5.out -> n73.formula2
n17.out -> n73.atom3
n45.out -> n73.formula3
n73.out -> n71.a
n13.out -> n78.assertion
n5.out -> n78.atom1
n45.out -> n80.a
n5.out -> n80.b
n46.out -> n81.a
n80.out -> n81.b
n10.out -> n82.a
n81.out -> n82.b
n82.out -> n78.formula1
n7.out -> n78.atom2
n10.out -> n78.formula2
n78.out -> n71.b
n71.out -> n70.a
n25.out -> n85.assertion
n5.out -> n85.atom1
n10.out -> n85.formula1
n7.out -> n85.atom2
n10.out -> n85.formula2
n17.out -> n85.atom3
n81.out -> n85.formula3
n85.out -> n70.b
n70.out -> n69.a
n13.out -> n90.assertion
n5.out -> n90.atom1
n66.out -> n92.a
n82.out -> n92.b
n92.out -> n90.formula1
n7.out -> n90.atom2
n18.out -> n90.formula2
n90.out -> n69.b
n69.out -> n68.a
n25.out -> n95.assertion
n5.out -> n95.atom1
n18.out -> n95.formula1
n7.out -> n95.atom2
n66.out -> n95.formula2
n17.out -> n95.atom3
n82.out -> n95.formula3
n95.out -> n68.b
n68.out -> n61.b
n61.out -> tgt.proof
```

</details>

### 50 · 反件消去 · 中间结论

- 目标：`⊢ ( Q → ( ( ( P → Q ) → R ) → R ) )`
- 提示：Q→((P→Q)→R)→R
- 参考解：32 个模块 / 84 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n3  theorem *00
n4  subst S
n5  atom P
n7  atom Q
n8  imp
n9  atom R
n10  imp
n13  axiom A1
n22  axiom A2
n30  mp M
n31  mp M
n33  subst S
n36  mp M
n37  mp M
n39  subst S
n43  subst S
n45  imp
n46  imp
n48  subst S
n52  mp M
n53  mp M
n54  mp M
n56  mp M
n58  subst S
n61  subst S
n63  imp
n66  subst S
n70  subst S
n74  subst S
n76  imp
n77  imp
n79  subst S

wires:
n3.out -> n4.assertion
n5.out -> n4.atom1
n5.out -> n8.a
n7.out -> n8.b
n8.out -> n10.a
n9.out -> n10.b
n10.out -> n4.formula1
n13.out -> n33.assertion
n5.out -> n33.atom1
n7.out -> n33.formula1
n7.out -> n33.atom2
n5.out -> n33.formula2
n33.out -> n31.a
n13.out -> n39.assertion
n5.out -> n39.atom1
n8.out -> n39.formula1
n7.out -> n39.atom2
n10.out -> n39.formula2
n39.out -> n37.a
n13.out -> n43.assertion
n5.out -> n43.atom1
n10.out -> n45.a
n8.out -> n45.b
n8.out -> n46.a
n45.out -> n46.b
n46.out -> n43.formula1
n43.out -> n37.b
n37.out -> n36.a
n22.out -> n48.assertion
n5.out -> n48.atom1
n7.out -> n48.formula1
n7.out -> n48.atom2
n8.out -> n48.formula2
n9.out -> n48.atom3
n45.out -> n48.formula3
n48.out -> n36.b
n36.out -> n31.b
n31.out -> n30.a
n3.out -> n58.assertion
n5.out -> n58.atom1
n9.out -> n58.formula1
n58.out -> n56.a
n13.out -> n61.assertion
n5.out -> n61.atom1
n9.out -> n63.a
n9.out -> n63.b
n63.out -> n61.formula1
n7.out -> n61.atom2
n8.out -> n61.formula2
n61.out -> n56.b
n56.out -> n4.a
n22.out -> n66.assertion
n5.out -> n66.atom1
n8.out -> n66.formula1
n7.out -> n66.atom2
n9.out -> n66.formula2
n66.out -> n4.b
n4.out -> n54.a
n22.out -> n70.assertion
n5.out -> n70.atom1
n10.out -> n70.formula1
n7.out -> n70.atom2
n8.out -> n70.formula2
n70.out -> n54.b
n54.out -> n53.a
n13.out -> n74.assertion
n5.out -> n74.atom1
n10.out -> n76.a
n9.out -> n76.b
n45.out -> n77.a
n76.out -> n77.b
n77.out -> n74.formula1
n74.out -> n53.b
n53.out -> n52.a
n22.out -> n79.assertion
n5.out -> n79.atom1
n7.out -> n79.formula1
n7.out -> n79.atom2
n45.out -> n79.formula2
n9.out -> n79.atom3
n76.out -> n79.formula3
n79.out -> n52.b
n52.out -> n30.b
n30.out -> tgt.proof
```

</details>

### 51 · 等值引入 · 中间结论

- 目标：`⊢ ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( P → ¬ Q ) ) )`
- 提示：(¬(P→¬Q)→P→¬Q)→(¬(P→¬Q)→P→¬Q)→P→¬Q
- 参考解：33 个模块 / 81 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n6  axiom A1
n8  atom Q
n9  atom P
n15  axiom A2
n18  atom R
n25  not
n26  imp
n27  not
n82  axiom A3
n89  imp
n117  mp M
n121  mp M
n122  mp M
n143  subst S
n146  not
n147  not
n151  imp
n159  mp M
n160  mp M
n162  subst S
n166  subst S
n168  imp
n169  imp
n172  subst S
n177  subst S
n184  imp
n192  mp M
n193  mp M
n195  subst S
n199  subst S
n201  imp
n202  imp
n205  subst S

wires:
n8.out -> n25.a
n9.out -> n26.a
n25.out -> n26.b
n26.out -> n27.a
n27.out -> n89.a
n26.out -> n89.b
n6.out -> n143.assertion
n9.out -> n143.atom1
n27.out -> n143.formula1
n8.out -> n143.atom2
n89.out -> n146.a
n146.out -> n147.a
n147.out -> n143.formula2
n147.out -> n151.a
n27.out -> n151.b
n143.out -> n122.a
n82.out -> n162.assertion
n9.out -> n162.atom1
n146.out -> n162.formula1
n8.out -> n162.atom2
n26.out -> n162.formula2
n162.out -> n160.a
n6.out -> n166.assertion
n9.out -> n166.atom1
n26.out -> n168.a
n146.out -> n168.b
n151.out -> n169.a
n168.out -> n169.b
n169.out -> n166.formula1
n8.out -> n166.atom2
n27.out -> n166.formula2
n166.out -> n160.b
n160.out -> n159.a
n15.out -> n172.assertion
n9.out -> n172.atom1
n27.out -> n172.formula1
n8.out -> n172.atom2
n151.out -> n172.formula2
n18.out -> n172.atom3
n168.out -> n172.formula3
n172.out -> n159.b
n159.out -> n122.b
n122.out -> n121.a
n15.out -> n177.assertion
n9.out -> n177.atom1
n27.out -> n177.formula1
n8.out -> n177.atom2
n26.out -> n177.formula2
n18.out -> n177.atom3
n146.out -> n177.formula3
n177.out -> n121.b
n27.out -> n184.a
n146.out -> n184.b
n121.out -> n117.a
n82.out -> n195.assertion
n9.out -> n195.atom1
n26.out -> n195.formula1
n8.out -> n195.atom2
n89.out -> n195.formula2
n195.out -> n193.a
n6.out -> n199.assertion
n9.out -> n199.atom1
n89.out -> n201.a
n26.out -> n201.b
n184.out -> n202.a
n201.out -> n202.b
n202.out -> n199.formula1
n8.out -> n199.atom2
n89.out -> n199.formula2
n199.out -> n193.b
n193.out -> n192.a
n15.out -> n205.assertion
n9.out -> n205.atom1
n89.out -> n205.formula1
n8.out -> n205.atom2
n184.out -> n205.formula2
n18.out -> n205.atom3
n201.out -> n205.formula3
n205.out -> n192.b
n192.out -> n117.b
n117.out -> tgt.proof
```

</details>

### 52 · 等值消去右 · 中间结论

- 目标：`⊢ ( ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) → ( ( ¬ ¬ ( P → ¬ Q ) → ¬ ( P → ¬ Q ) ) → ¬ ( P → ¬ Q ) ) )`
- 提示：(¬¬(P→¬Q)→¬(P→¬Q))→(¬¬(P→¬Q)→¬(P→¬Q))→¬(P→¬Q)
- 参考解：34 个模块 / 82 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n7  axiom A1
n9  atom P
n10  atom Q
n11  not
n19  axiom A2
n23  atom R
n34  imp
n121  axiom A3
n631  not
n632  not
n695  imp
n723  mp M
n727  mp M
n728  mp M
n749  subst S
n752  not
n753  not
n757  imp
n765  mp M
n766  mp M
n768  subst S
n772  subst S
n774  imp
n775  imp
n778  subst S
n783  subst S
n790  imp
n798  mp M
n799  mp M
n801  subst S
n805  subst S
n807  imp
n808  imp
n811  subst S

wires:
n10.out -> n11.a
n9.out -> n34.a
n11.out -> n34.b
n34.out -> n631.a
n631.out -> n632.a
n632.out -> n695.a
n631.out -> n695.b
n7.out -> n749.assertion
n9.out -> n749.atom1
n632.out -> n749.formula1
n10.out -> n749.atom2
n695.out -> n752.a
n752.out -> n753.a
n753.out -> n749.formula2
n753.out -> n757.a
n632.out -> n757.b
n749.out -> n728.a
n121.out -> n768.assertion
n9.out -> n768.atom1
n752.out -> n768.formula1
n10.out -> n768.atom2
n631.out -> n768.formula2
n768.out -> n766.a
n7.out -> n772.assertion
n9.out -> n772.atom1
n631.out -> n774.a
n752.out -> n774.b
n757.out -> n775.a
n774.out -> n775.b
n775.out -> n772.formula1
n10.out -> n772.atom2
n632.out -> n772.formula2
n772.out -> n766.b
n766.out -> n765.a
n19.out -> n778.assertion
n9.out -> n778.atom1
n632.out -> n778.formula1
n10.out -> n778.atom2
n757.out -> n778.formula2
n23.out -> n778.atom3
n774.out -> n778.formula3
n778.out -> n765.b
n765.out -> n728.b
n728.out -> n727.a
n19.out -> n783.assertion
n9.out -> n783.atom1
n632.out -> n783.formula1
n10.out -> n783.atom2
n631.out -> n783.formula2
n23.out -> n783.atom3
n752.out -> n783.formula3
n783.out -> n727.b
n632.out -> n790.a
n752.out -> n790.b
n727.out -> n723.a
n121.out -> n801.assertion
n9.out -> n801.atom1
n631.out -> n801.formula1
n10.out -> n801.atom2
n695.out -> n801.formula2
n801.out -> n799.a
n7.out -> n805.assertion
n9.out -> n805.atom1
n695.out -> n807.a
n631.out -> n807.b
n790.out -> n808.a
n807.out -> n808.b
n808.out -> n805.formula1
n10.out -> n805.atom2
n695.out -> n805.formula2
n805.out -> n799.b
n799.out -> n798.a
n19.out -> n811.assertion
n9.out -> n811.atom1
n695.out -> n811.formula1
n10.out -> n811.atom2
n790.out -> n811.formula2
n23.out -> n811.atom3
n807.out -> n811.formula3
n811.out -> n798.b
n798.out -> n723.b
n723.out -> tgt.proof
```

</details>

### 53 · 反件左消 · 中间结论

- 目标：`⊢ ( ( ¬ P → ( ( P → Q ) → R ) ) → ( ¬ P → R ) )`
- 提示：(¬P→(P→Q)→R)→¬P→R
- 参考解：35 个模块 / 91 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n3  theorem *00
n4  subst S
n5  atom P
n7  atom Q
n8  imp
n9  atom R
n10  imp
n13  axiom A1
n17  not
n24  axiom A2
n31  mp M
n32  mp M
n33  mp M
n34  theorem *04
n35  mp M
n36  mp M
n38  subst S
n42  subst S
n44  imp
n45  imp
n48  subst S
n52  mp M
n53  mp M
n54  mp M
n56  mp M
n58  subst S
n61  subst S
n63  imp
n66  subst S
n70  subst S
n74  subst S
n76  imp
n77  imp
n80  subst S
n85  subst S

wires:
n3.out -> n4.assertion
n5.out -> n4.atom1
n5.out -> n8.a
n7.out -> n8.b
n8.out -> n10.a
n9.out -> n10.b
n10.out -> n4.formula1
n5.out -> n17.a
n34.out -> n33.a
n13.out -> n38.assertion
n5.out -> n38.atom1
n8.out -> n38.formula1
n7.out -> n38.atom2
n10.out -> n38.formula2
n38.out -> n36.a
n13.out -> n42.assertion
n5.out -> n42.atom1
n10.out -> n44.a
n8.out -> n44.b
n8.out -> n45.a
n44.out -> n45.b
n45.out -> n42.formula1
n7.out -> n42.atom2
n17.out -> n42.formula2
n42.out -> n36.b
n36.out -> n35.a
n24.out -> n48.assertion
n5.out -> n48.atom1
n17.out -> n48.formula1
n7.out -> n48.atom2
n8.out -> n48.formula2
n9.out -> n48.atom3
n44.out -> n48.formula3
n48.out -> n35.b
n35.out -> n33.b
n33.out -> n32.a
n3.out -> n58.assertion
n5.out -> n58.atom1
n9.out -> n58.formula1
n58.out -> n56.a
n13.out -> n61.assertion
n5.out -> n61.atom1
n9.out -> n63.a
n9.out -> n63.b
n63.out -> n61.formula1
n7.out -> n61.atom2
n8.out -> n61.formula2
n61.out -> n56.b
n56.out -> n4.a
n24.out -> n66.assertion
n5.out -> n66.atom1
n8.out -> n66.formula1
n7.out -> n66.atom2
n9.out -> n66.formula2
n66.out -> n4.b
n4.out -> n54.a
n24.out -> n70.assertion
n5.out -> n70.atom1
n10.out -> n70.formula1
n7.out -> n70.atom2
n8.out -> n70.formula2
n70.out -> n54.b
n54.out -> n53.a
n13.out -> n74.assertion
n5.out -> n74.atom1
n10.out -> n76.a
n9.out -> n76.b
n44.out -> n77.a
n76.out -> n77.b
n77.out -> n74.formula1
n7.out -> n74.atom2
n17.out -> n74.formula2
n74.out -> n53.b
n53.out -> n52.a
n24.out -> n80.assertion
n5.out -> n80.atom1
n17.out -> n80.formula1
n7.out -> n80.atom2
n44.out -> n80.formula2
n9.out -> n80.atom3
n76.out -> n80.formula3
n80.out -> n52.b
n52.out -> n32.b
n32.out -> n31.a
n24.out -> n85.assertion
n5.out -> n85.atom1
n17.out -> n85.formula1
n7.out -> n85.atom2
n10.out -> n85.formula2
n85.out -> n31.b
n31.out -> tgt.proof
```

</details>

### 54 · 等值引入 · 中间结论

- 目标：`⊢ ( ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) ) → ( ( ¬ ( P → ¬ Q ) → ( P → ¬ Q ) ) → ( P → ¬ Q ) ) )`
- 提示：((¬(P→¬Q)→P→¬Q)→¬(P→¬Q)→P→¬Q)→(¬(P→¬Q)→P→¬Q)→P→¬Q
- 参考解：35 个模块 / 90 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n6  axiom A1
n8  atom Q
n9  atom P
n15  axiom A2
n18  atom R
n25  not
n26  imp
n27  not
n82  axiom A3
n89  imp
n116  mp M
n117  mp M
n121  mp M
n122  mp M
n143  subst S
n146  not
n147  not
n151  imp
n159  mp M
n160  mp M
n162  subst S
n166  subst S
n168  imp
n169  imp
n172  subst S
n177  subst S
n184  imp
n192  mp M
n193  mp M
n195  subst S
n199  subst S
n201  imp
n202  imp
n205  subst S
n210  subst S

wires:
n8.out -> n25.a
n9.out -> n26.a
n25.out -> n26.b
n26.out -> n27.a
n27.out -> n89.a
n26.out -> n89.b
n6.out -> n143.assertion
n9.out -> n143.atom1
n27.out -> n143.formula1
n8.out -> n143.atom2
n89.out -> n146.a
n146.out -> n147.a
n147.out -> n143.formula2
n147.out -> n151.a
n27.out -> n151.b
n143.out -> n122.a
n82.out -> n162.assertion
n9.out -> n162.atom1
n146.out -> n162.formula1
n8.out -> n162.atom2
n26.out -> n162.formula2
n162.out -> n160.a
n6.out -> n166.assertion
n9.out -> n166.atom1
n26.out -> n168.a
n146.out -> n168.b
n151.out -> n169.a
n168.out -> n169.b
n169.out -> n166.formula1
n8.out -> n166.atom2
n27.out -> n166.formula2
n166.out -> n160.b
n160.out -> n159.a
n15.out -> n172.assertion
n9.out -> n172.atom1
n27.out -> n172.formula1
n8.out -> n172.atom2
n151.out -> n172.formula2
n18.out -> n172.atom3
n168.out -> n172.formula3
n172.out -> n159.b
n159.out -> n122.b
n122.out -> n121.a
n15.out -> n177.assertion
n9.out -> n177.atom1
n27.out -> n177.formula1
n8.out -> n177.atom2
n26.out -> n177.formula2
n18.out -> n177.atom3
n146.out -> n177.formula3
n177.out -> n121.b
n27.out -> n184.a
n146.out -> n184.b
n121.out -> n117.a
n82.out -> n195.assertion
n9.out -> n195.atom1
n26.out -> n195.formula1
n8.out -> n195.atom2
n89.out -> n195.formula2
n195.out -> n193.a
n6.out -> n199.assertion
n9.out -> n199.atom1
n89.out -> n201.a
n26.out -> n201.b
n184.out -> n202.a
n201.out -> n202.b
n202.out -> n199.formula1
n8.out -> n199.atom2
n89.out -> n199.formula2
n199.out -> n193.b
n193.out -> n192.a
n15.out -> n205.assertion
n9.out -> n205.atom1
n89.out -> n205.formula1
n8.out -> n205.atom2
n184.out -> n205.formula2
n18.out -> n205.atom3
n201.out -> n205.formula3
n205.out -> n192.b
n192.out -> n117.b
n117.out -> n116.a
n15.out -> n210.assertion
n9.out -> n210.atom1
n89.out -> n210.formula1
n8.out -> n210.atom2
n89.out -> n210.formula2
n18.out -> n210.atom3
n26.out -> n210.formula3
n210.out -> n116.b
n116.out -> tgt.proof
```

</details>

### 55 · 前件合并 · 中间结论

- 目标：`⊢ ( ( ( ( P → Q ) → ( P → R ) ) → ( Q → ( ( P → Q ) → ( P → R ) ) ) ) → ( ( ( P → Q ) → ( P → R ) ) → ( Q → ( P → R ) ) ) )`
- 提示：(((P→Q)→P→R)→Q→(P→Q)→P→R)→((P→Q)→P→R)→Q→P→R
- 参考解：37 个模块 / 100 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  theorem *00
n6  subst S
n7  atom P
n9  atom Q
n10  imp
n11  atom R
n12  imp
n13  imp
n16  axiom A1
n22  imp
n25  axiom A2
n30  mp M
n31  mp M
n32  mp M
n33  mp M
n34  mp M
n36  subst S
n39  mp M
n40  mp M
n42  subst S
n46  subst S
n48  imp
n49  imp
n51  subst S
n55  mp M
n56  mp M
n57  mp M
n59  subst S
n64  subst S
n66  imp
n67  imp
n69  subst S
n74  subst S
n79  subst S
n81  imp
n82  imp
n85  subst S

wires:
n5.out -> n6.assertion
n7.out -> n6.atom1
n7.out -> n10.a
n9.out -> n10.b
n7.out -> n12.a
n11.out -> n12.b
n10.out -> n13.a
n12.out -> n13.b
n13.out -> n6.formula1
n9.out -> n22.a
n13.out -> n22.b
n16.out -> n36.assertion
n7.out -> n36.atom1
n9.out -> n36.formula1
n9.out -> n36.atom2
n7.out -> n36.formula2
n36.out -> n34.a
n16.out -> n42.assertion
n7.out -> n42.atom1
n10.out -> n42.formula1
n9.out -> n42.atom2
n13.out -> n42.formula2
n42.out -> n40.a
n16.out -> n46.assertion
n7.out -> n46.atom1
n13.out -> n48.a
n10.out -> n48.b
n10.out -> n49.a
n48.out -> n49.b
n49.out -> n46.formula1
n46.out -> n40.b
n40.out -> n39.a
n25.out -> n51.assertion
n7.out -> n51.atom1
n9.out -> n51.formula1
n9.out -> n51.atom2
n10.out -> n51.formula2
n11.out -> n51.atom3
n48.out -> n51.formula3
n51.out -> n39.b
n39.out -> n34.b
n34.out -> n33.a
n6.out -> n57.a
n25.out -> n59.assertion
n7.out -> n59.atom1
n13.out -> n59.formula1
n9.out -> n59.atom2
n10.out -> n59.formula2
n11.out -> n59.atom3
n12.out -> n59.formula3
n59.out -> n57.b
n57.out -> n56.a
n16.out -> n64.assertion
n7.out -> n64.atom1
n13.out -> n66.a
n12.out -> n66.b
n48.out -> n67.a
n66.out -> n67.b
n67.out -> n64.formula1
n64.out -> n56.b
n56.out -> n55.a
n25.out -> n69.assertion
n7.out -> n69.atom1
n9.out -> n69.formula1
n9.out -> n69.atom2
n48.out -> n69.formula2
n11.out -> n69.atom3
n66.out -> n69.formula3
n69.out -> n55.b
n55.out -> n33.b
n33.out -> n32.a
n25.out -> n74.assertion
n7.out -> n74.atom1
n9.out -> n74.formula1
n9.out -> n74.atom2
n13.out -> n74.formula2
n11.out -> n74.atom3
n12.out -> n74.formula3
n74.out -> n32.b
n32.out -> n31.a
n16.out -> n79.assertion
n7.out -> n79.atom1
n9.out -> n81.a
n12.out -> n81.b
n22.out -> n82.a
n81.out -> n82.b
n82.out -> n79.formula1
n9.out -> n79.atom2
n13.out -> n79.formula2
n79.out -> n31.b
n31.out -> n30.a
n25.out -> n85.assertion
n7.out -> n85.atom1
n13.out -> n85.formula1
n9.out -> n85.atom2
n22.out -> n85.formula2
n11.out -> n85.atom3
n81.out -> n85.formula3
n85.out -> n30.b
n30.out -> tgt.proof
```

</details>

### 56 · 否定后件换位 · 中间结论

- 目标：`⊢ ( ( ( P → ¬ Q ) → ( ¬ ¬ P → ( P → ¬ Q ) ) ) → ( ( P → ¬ Q ) → ( ¬ ¬ P → ¬ Q ) ) )`
- 提示：((P→¬Q)→¬¬P→P→¬Q)→(P→¬Q)→¬¬P→¬Q
- 参考解：38 个模块 / 96 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n4  theorem *00
n5  subst S
n6  atom P
n8  atom Q
n9  not
n10  imp
n13  axiom A1
n17  not
n18  not
n22  imp
n25  axiom A2
n29  atom R
n30  mp M
n31  mp M
n32  mp M
n33  mp M
n34  mp M
n35  theorem *19
n36  mp M
n37  mp M
n39  subst S
n42  subst S
n44  imp
n45  imp
n48  subst S
n52  mp M
n53  mp M
n54  mp M
n56  subst S
n61  subst S
n63  imp
n64  imp
n67  subst S
n72  subst S
n77  subst S
n79  imp
n80  imp
n83  subst S

wires:
n4.out -> n5.assertion
n6.out -> n5.atom1
n8.out -> n9.a
n6.out -> n10.a
n9.out -> n10.b
n10.out -> n5.formula1
n6.out -> n17.a
n17.out -> n18.a
n18.out -> n22.a
n10.out -> n22.b
n35.out -> n34.a
n13.out -> n39.assertion
n8.out -> n39.atom1
n10.out -> n39.formula1
n39.out -> n37.a
n13.out -> n42.assertion
n6.out -> n42.atom1
n10.out -> n44.a
n6.out -> n44.b
n6.out -> n45.a
n44.out -> n45.b
n45.out -> n42.formula1
n8.out -> n42.atom2
n18.out -> n42.formula2
n42.out -> n37.b
n37.out -> n36.a
n25.out -> n48.assertion
n6.out -> n48.atom1
n18.out -> n48.formula1
n8.out -> n48.atom2
n6.out -> n48.formula2
n29.out -> n48.atom3
n44.out -> n48.formula3
n48.out -> n36.b
n36.out -> n34.b
n34.out -> n33.a
n5.out -> n54.a
n25.out -> n56.assertion
n6.out -> n56.atom1
n10.out -> n56.formula1
n8.out -> n56.atom2
n6.out -> n56.formula2
n29.out -> n56.atom3
n9.out -> n56.formula3
n56.out -> n54.b
n54.out -> n53.a
n13.out -> n61.assertion
n6.out -> n61.atom1
n10.out -> n63.a
n9.out -> n63.b
n44.out -> n64.a
n63.out -> n64.b
n64.out -> n61.formula1
n8.out -> n61.atom2
n18.out -> n61.formula2
n61.out -> n53.b
n53.out -> n52.a
n25.out -> n67.assertion
n6.out -> n67.atom1
n18.out -> n67.formula1
n8.out -> n67.atom2
n44.out -> n67.formula2
n29.out -> n67.atom3
n63.out -> n67.formula3
n67.out -> n52.b
n52.out -> n33.b
n33.out -> n32.a
n25.out -> n72.assertion
n6.out -> n72.atom1
n18.out -> n72.formula1
n8.out -> n72.atom2
n10.out -> n72.formula2
n29.out -> n72.atom3
n9.out -> n72.formula3
n72.out -> n32.b
n32.out -> n31.a
n13.out -> n77.assertion
n6.out -> n77.atom1
n18.out -> n79.a
n9.out -> n79.b
n22.out -> n80.a
n79.out -> n80.b
n80.out -> n77.formula1
n8.out -> n77.atom2
n10.out -> n77.formula2
n77.out -> n31.b
n31.out -> n30.a
n25.out -> n83.assertion
n6.out -> n83.atom1
n10.out -> n83.formula1
n8.out -> n83.atom2
n22.out -> n83.formula2
n29.out -> n83.atom3
n79.out -> n83.formula3
n83.out -> n30.b
n30.out -> tgt.proof
```

</details>

### 57 · 前件合并 · 中间结论

- 目标：`⊢ ( ( ( P → Q ) → ( P → R ) ) → ( Q → ( P → R ) ) )`
- 提示：((P→Q)→P→R)→Q→P→R
- 参考解：39 个模块 / 105 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n3  mp M
n5  theorem *00
n6  subst S
n7  atom P
n9  atom Q
n10  imp
n11  atom R
n12  imp
n13  imp
n16  axiom A1
n17  subst S
n22  imp
n25  axiom A2
n30  mp M
n31  mp M
n32  mp M
n33  mp M
n34  mp M
n36  subst S
n39  mp M
n40  mp M
n42  subst S
n46  subst S
n48  imp
n49  imp
n51  subst S
n55  mp M
n56  mp M
n57  mp M
n59  subst S
n64  subst S
n66  imp
n67  imp
n69  subst S
n74  subst S
n79  subst S
n81  imp
n82  imp
n85  subst S

wires:
n5.out -> n6.assertion
n7.out -> n6.atom1
n7.out -> n10.a
n9.out -> n10.b
n7.out -> n12.a
n11.out -> n12.b
n10.out -> n13.a
n12.out -> n13.b
n13.out -> n6.formula1
n16.out -> n17.assertion
n7.out -> n17.atom1
n13.out -> n17.formula1
n9.out -> n22.a
n13.out -> n22.b
n17.out -> n3.a
n16.out -> n36.assertion
n7.out -> n36.atom1
n9.out -> n36.formula1
n9.out -> n36.atom2
n7.out -> n36.formula2
n36.out -> n34.a
n16.out -> n42.assertion
n7.out -> n42.atom1
n10.out -> n42.formula1
n9.out -> n42.atom2
n13.out -> n42.formula2
n42.out -> n40.a
n16.out -> n46.assertion
n7.out -> n46.atom1
n13.out -> n48.a
n10.out -> n48.b
n10.out -> n49.a
n48.out -> n49.b
n49.out -> n46.formula1
n46.out -> n40.b
n40.out -> n39.a
n25.out -> n51.assertion
n7.out -> n51.atom1
n9.out -> n51.formula1
n9.out -> n51.atom2
n10.out -> n51.formula2
n11.out -> n51.atom3
n48.out -> n51.formula3
n51.out -> n39.b
n39.out -> n34.b
n34.out -> n33.a
n6.out -> n57.a
n25.out -> n59.assertion
n7.out -> n59.atom1
n13.out -> n59.formula1
n9.out -> n59.atom2
n10.out -> n59.formula2
n11.out -> n59.atom3
n12.out -> n59.formula3
n59.out -> n57.b
n57.out -> n56.a
n16.out -> n64.assertion
n7.out -> n64.atom1
n13.out -> n66.a
n12.out -> n66.b
n48.out -> n67.a
n66.out -> n67.b
n67.out -> n64.formula1
n64.out -> n56.b
n56.out -> n55.a
n25.out -> n69.assertion
n7.out -> n69.atom1
n9.out -> n69.formula1
n9.out -> n69.atom2
n48.out -> n69.formula2
n11.out -> n69.atom3
n66.out -> n69.formula3
n69.out -> n55.b
n55.out -> n33.b
n33.out -> n32.a
n25.out -> n74.assertion
n7.out -> n74.atom1
n9.out -> n74.formula1
n9.out -> n74.atom2
n13.out -> n74.formula2
n11.out -> n74.atom3
n12.out -> n74.formula3
n74.out -> n32.b
n32.out -> n31.a
n16.out -> n79.assertion
n7.out -> n79.atom1
n9.out -> n81.a
n12.out -> n81.b
n22.out -> n82.a
n81.out -> n82.b
n82.out -> n79.formula1
n9.out -> n79.atom2
n13.out -> n79.formula2
n79.out -> n31.b
n31.out -> n30.a
n25.out -> n85.assertion
n7.out -> n85.atom1
n13.out -> n85.formula1
n9.out -> n85.atom2
n22.out -> n85.formula2
n11.out -> n85.atom3
n81.out -> n85.formula3
n85.out -> n30.b
n30.out -> n3.b
n3.out -> tgt.proof
```

</details>

### 58 · 逆否 · 中间结论

- 目标：`⊢ ( ( P → Q ) → ( ¬ ¬ P → Q ) )`
- 提示：(P→Q)→¬¬P→Q
- 参考解：39 个模块 / 102 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n3  mp M
n5  theorem *00
n6  subst S
n7  atom P
n9  atom Q
n10  imp
n13  axiom A1
n14  subst S
n17  not
n18  not
n22  imp
n25  axiom A2
n29  atom R
n30  mp M
n31  mp M
n32  mp M
n33  mp M
n34  mp M
n35  theorem *19
n36  mp M
n37  mp M
n39  subst S
n42  subst S
n44  imp
n45  imp
n48  subst S
n52  mp M
n53  mp M
n54  mp M
n56  subst S
n61  subst S
n63  imp
n64  imp
n67  subst S
n72  subst S
n77  subst S
n79  imp
n80  imp
n83  subst S

wires:
n5.out -> n6.assertion
n7.out -> n6.atom1
n7.out -> n10.a
n9.out -> n10.b
n10.out -> n6.formula1
n13.out -> n14.assertion
n7.out -> n14.atom1
n10.out -> n14.formula1
n9.out -> n14.atom2
n7.out -> n17.a
n17.out -> n18.a
n18.out -> n14.formula2
n18.out -> n22.a
n10.out -> n22.b
n14.out -> n3.a
n35.out -> n34.a
n13.out -> n39.assertion
n9.out -> n39.atom1
n10.out -> n39.formula1
n39.out -> n37.a
n13.out -> n42.assertion
n7.out -> n42.atom1
n10.out -> n44.a
n7.out -> n44.b
n7.out -> n45.a
n44.out -> n45.b
n45.out -> n42.formula1
n9.out -> n42.atom2
n18.out -> n42.formula2
n42.out -> n37.b
n37.out -> n36.a
n25.out -> n48.assertion
n7.out -> n48.atom1
n18.out -> n48.formula1
n9.out -> n48.atom2
n7.out -> n48.formula2
n29.out -> n48.atom3
n44.out -> n48.formula3
n48.out -> n36.b
n36.out -> n34.b
n34.out -> n33.a
n6.out -> n54.a
n25.out -> n56.assertion
n7.out -> n56.atom1
n10.out -> n56.formula1
n9.out -> n56.atom2
n7.out -> n56.formula2
n29.out -> n56.atom3
n9.out -> n56.formula3
n56.out -> n54.b
n54.out -> n53.a
n13.out -> n61.assertion
n7.out -> n61.atom1
n10.out -> n63.a
n9.out -> n63.b
n44.out -> n64.a
n63.out -> n64.b
n64.out -> n61.formula1
n9.out -> n61.atom2
n18.out -> n61.formula2
n61.out -> n53.b
n53.out -> n52.a
n25.out -> n67.assertion
n7.out -> n67.atom1
n18.out -> n67.formula1
n9.out -> n67.atom2
n44.out -> n67.formula2
n29.out -> n67.atom3
n63.out -> n67.formula3
n67.out -> n52.b
n52.out -> n33.b
n33.out -> n32.a
n25.out -> n72.assertion
n7.out -> n72.atom1
n18.out -> n72.formula1
n9.out -> n72.atom2
n10.out -> n72.formula2
n29.out -> n72.atom3
n9.out -> n72.formula3
n72.out -> n32.b
n32.out -> n31.a
n13.out -> n77.assertion
n7.out -> n77.atom1
n18.out -> n79.a
n9.out -> n79.b
n22.out -> n80.a
n79.out -> n80.b
n80.out -> n77.formula1
n9.out -> n77.atom2
n10.out -> n77.formula2
n77.out -> n31.b
n31.out -> n30.a
n25.out -> n83.assertion
n7.out -> n83.atom1
n10.out -> n83.formula1
n9.out -> n83.atom2
n22.out -> n83.formula2
n29.out -> n83.atom3
n79.out -> n83.formula3
n83.out -> n30.b
n30.out -> n3.b
n3.out -> tgt.proof
```

</details>

### 59 · 否定蕴涵取后件 · 中间结论

- 目标：`⊢ ( ¬ Q → ( ( P → ¬ Q ) → ¬ ¬ ( P → ¬ Q ) ) )`
- 提示：¬Q→(P→¬Q)→¬¬(P→¬Q)
- 参考解：40 个模块 / 102 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n7  atom P
n8  atom Q
n9  not
n12  axiom A1
n20  imp
n23  axiom A2
n27  atom R
n57  theorem *19
n136  theorem *v
n165  mp M
n166  mp M
n171  subst S
n174  not
n175  not
n176  not
n180  imp
n188  mp M
n189  mp M
n190  mp M
n192  mp M
n194  subst S
n196  mp M
n197  mp M
n199  subst S
n203  subst S
n205  imp
n206  imp
n209  subst S
n241  subst S
n246  subst S
n248  imp
n249  imp
n252  subst S
n256  mp M
n257  mp M
n259  subst S
n263  subst S
n265  imp
n266  imp
n269  subst S

wires:
n8.out -> n9.a
n7.out -> n20.a
n9.out -> n20.b
n12.out -> n171.assertion
n7.out -> n171.atom1
n9.out -> n171.formula1
n8.out -> n171.atom2
n20.out -> n174.a
n174.out -> n175.a
n175.out -> n176.a
n176.out -> n171.formula2
n176.out -> n180.a
n9.out -> n180.b
n171.out -> n166.a
n57.out -> n194.assertion
n7.out -> n194.atom1
n174.out -> n194.formula1
n194.out -> n192.a
n12.out -> n199.assertion
n7.out -> n199.atom1
n174.out -> n199.formula1
n8.out -> n199.atom2
n9.out -> n199.formula2
n199.out -> n197.a
n12.out -> n203.assertion
n7.out -> n203.atom1
n9.out -> n205.a
n174.out -> n205.b
n174.out -> n206.a
n205.out -> n206.b
n206.out -> n203.formula1
n8.out -> n203.atom2
n176.out -> n203.formula2
n203.out -> n197.b
n197.out -> n196.a
n23.out -> n209.assertion
n7.out -> n209.atom1
n176.out -> n209.formula1
n8.out -> n209.atom2
n174.out -> n209.formula2
n27.out -> n209.atom3
n205.out -> n209.formula3
n209.out -> n196.b
n196.out -> n192.b
n192.out -> n190.a
n23.out -> n241.assertion
n7.out -> n241.atom1
n176.out -> n241.formula1
n8.out -> n241.atom2
n9.out -> n241.formula2
n27.out -> n241.atom3
n174.out -> n241.formula3
n241.out -> n190.b
n190.out -> n189.a
n12.out -> n246.assertion
n7.out -> n246.atom1
n176.out -> n248.a
n174.out -> n248.b
n180.out -> n249.a
n248.out -> n249.b
n249.out -> n246.formula1
n8.out -> n246.atom2
n9.out -> n246.formula2
n246.out -> n189.b
n189.out -> n188.a
n23.out -> n252.assertion
n7.out -> n252.atom1
n9.out -> n252.formula1
n8.out -> n252.atom2
n180.out -> n252.formula2
n27.out -> n252.atom3
n248.out -> n252.formula3
n252.out -> n188.b
n188.out -> n166.b
n166.out -> n165.a
n136.out -> n259.assertion
n7.out -> n259.atom1
n175.out -> n259.formula1
n8.out -> n259.atom2
n20.out -> n259.formula2
n259.out -> n257.a
n12.out -> n263.assertion
n7.out -> n263.atom1
n20.out -> n265.a
n175.out -> n265.b
n248.out -> n266.a
n265.out -> n266.b
n266.out -> n263.formula1
n8.out -> n263.atom2
n9.out -> n263.formula2
n263.out -> n257.b
n257.out -> n256.a
n23.out -> n269.assertion
n7.out -> n269.atom1
n9.out -> n269.formula1
n8.out -> n269.atom2
n248.out -> n269.formula2
n27.out -> n269.atom3
n265.out -> n269.formula3
n269.out -> n256.b
n256.out -> n165.b
n165.out -> tgt.proof
```

</details>

### 60 · 否定后件换位 · 中间结论

- 目标：`⊢ ( ( P → ¬ Q ) → ( ¬ ¬ P → ¬ Q ) )`
- 提示：(P→¬Q)→¬¬P→¬Q
- 参考解：40 个模块 / 103 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n2  mp M
n4  theorem *00
n5  subst S
n6  atom P
n8  atom Q
n9  not
n10  imp
n13  axiom A1
n14  subst S
n17  not
n18  not
n22  imp
n25  axiom A2
n29  atom R
n30  mp M
n31  mp M
n32  mp M
n33  mp M
n34  mp M
n35  theorem *19
n36  mp M
n37  mp M
n39  subst S
n42  subst S
n44  imp
n45  imp
n48  subst S
n52  mp M
n53  mp M
n54  mp M
n56  subst S
n61  subst S
n63  imp
n64  imp
n67  subst S
n72  subst S
n77  subst S
n79  imp
n80  imp
n83  subst S

wires:
n4.out -> n5.assertion
n6.out -> n5.atom1
n8.out -> n9.a
n6.out -> n10.a
n9.out -> n10.b
n10.out -> n5.formula1
n13.out -> n14.assertion
n6.out -> n14.atom1
n10.out -> n14.formula1
n8.out -> n14.atom2
n6.out -> n17.a
n17.out -> n18.a
n18.out -> n14.formula2
n18.out -> n22.a
n10.out -> n22.b
n14.out -> n2.a
n35.out -> n34.a
n13.out -> n39.assertion
n8.out -> n39.atom1
n10.out -> n39.formula1
n39.out -> n37.a
n13.out -> n42.assertion
n6.out -> n42.atom1
n10.out -> n44.a
n6.out -> n44.b
n6.out -> n45.a
n44.out -> n45.b
n45.out -> n42.formula1
n8.out -> n42.atom2
n18.out -> n42.formula2
n42.out -> n37.b
n37.out -> n36.a
n25.out -> n48.assertion
n6.out -> n48.atom1
n18.out -> n48.formula1
n8.out -> n48.atom2
n6.out -> n48.formula2
n29.out -> n48.atom3
n44.out -> n48.formula3
n48.out -> n36.b
n36.out -> n34.b
n34.out -> n33.a
n5.out -> n54.a
n25.out -> n56.assertion
n6.out -> n56.atom1
n10.out -> n56.formula1
n8.out -> n56.atom2
n6.out -> n56.formula2
n29.out -> n56.atom3
n9.out -> n56.formula3
n56.out -> n54.b
n54.out -> n53.a
n13.out -> n61.assertion
n6.out -> n61.atom1
n10.out -> n63.a
n9.out -> n63.b
n44.out -> n64.a
n63.out -> n64.b
n64.out -> n61.formula1
n8.out -> n61.atom2
n18.out -> n61.formula2
n61.out -> n53.b
n53.out -> n52.a
n25.out -> n67.assertion
n6.out -> n67.atom1
n18.out -> n67.formula1
n8.out -> n67.atom2
n44.out -> n67.formula2
n29.out -> n67.atom3
n63.out -> n67.formula3
n67.out -> n52.b
n52.out -> n33.b
n33.out -> n32.a
n25.out -> n72.assertion
n6.out -> n72.atom1
n18.out -> n72.formula1
n8.out -> n72.atom2
n10.out -> n72.formula2
n29.out -> n72.atom3
n9.out -> n72.formula3
n72.out -> n32.b
n32.out -> n31.a
n13.out -> n77.assertion
n6.out -> n77.atom1
n18.out -> n79.a
n9.out -> n79.b
n22.out -> n80.a
n79.out -> n80.b
n80.out -> n77.formula1
n8.out -> n77.atom2
n10.out -> n77.formula2
n77.out -> n31.b
n31.out -> n30.a
n25.out -> n83.assertion
n6.out -> n83.atom1
n10.out -> n83.formula1
n8.out -> n83.atom2
n22.out -> n83.formula2
n29.out -> n83.atom3
n79.out -> n83.formula3
n83.out -> n30.b
n30.out -> n2.b
n2.out -> tgt.proof
```

</details>

### 61 · 合取前件导出 · 中间结论

- 目标：`⊢ ( P → ( ( ( ¬ ( P → ¬ Q ) → R ) → ( Q → ¬ ( P → ¬ Q ) ) ) → ( ( ¬ ( P → ¬ Q ) → R ) → ( Q → R ) ) ) )`
- 提示：P→((¬(P→¬Q)→R)→Q→¬(P→¬Q))→(¬(P→¬Q)→R)→Q→R
- 参考解：40 个模块 / 99 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n3  theorem *00
n4  subst S
n5  atom P
n7  atom Q
n8  not
n9  imp
n10  not
n11  atom R
n12  imp
n15  axiom A1
n25  axiom A2
n41  imp
n46  imp
n54  mp M
n55  mp M
n56  mp M
n58  subst S
n60  imp
n62  mp M
n63  mp M
n64  mp M
n65  mp M
n66  theorem *05
n67  subst S
n72  subst S
n74  imp
n75  imp
n76  imp
n79  subst S
n84  subst S
n86  imp
n89  subst S
n92  mp M
n93  mp M
n95  subst S
n100  subst S
n102  imp
n103  imp
n104  imp
n107  subst S

wires:
n3.out -> n4.assertion
n5.out -> n4.atom1
n7.out -> n8.a
n5.out -> n9.a
n8.out -> n9.b
n9.out -> n10.a
n10.out -> n12.a
n11.out -> n12.b
n12.out -> n4.formula1
n7.out -> n41.a
n10.out -> n41.b
n12.out -> n46.a
n41.out -> n46.b
n4.out -> n56.a
n15.out -> n58.assertion
n5.out -> n58.atom1
n12.out -> n60.a
n12.out -> n60.b
n60.out -> n58.formula1
n7.out -> n58.atom2
n5.out -> n58.formula2
n58.out -> n56.b
n56.out -> n55.a
n66.out -> n67.assertion
n5.out -> n67.atom1
n10.out -> n67.formula1
n7.out -> n67.atom2
n11.out -> n67.formula2
n11.out -> n67.atom3
n7.out -> n67.formula3
n67.out -> n65.a
n15.out -> n72.assertion
n5.out -> n72.atom1
n7.out -> n74.a
n11.out -> n74.b
n41.out -> n75.a
n74.out -> n75.b
n12.out -> n76.a
n75.out -> n76.b
n76.out -> n72.formula1
n7.out -> n72.atom2
n12.out -> n72.formula2
n72.out -> n65.b
n65.out -> n64.a
n25.out -> n79.assertion
n5.out -> n79.atom1
n12.out -> n79.formula1
n7.out -> n79.atom2
n12.out -> n79.formula2
n11.out -> n79.atom3
n75.out -> n79.formula3
n79.out -> n64.b
n64.out -> n63.a
n15.out -> n84.assertion
n5.out -> n84.atom1
n60.out -> n86.a
n76.out -> n86.b
n86.out -> n84.formula1
n7.out -> n84.atom2
n5.out -> n84.formula2
n84.out -> n63.b
n63.out -> n62.a
n25.out -> n89.assertion
n7.out -> n89.atom1
n60.out -> n89.formula1
n11.out -> n89.atom2
n76.out -> n89.formula2
n89.out -> n62.b
n62.out -> n55.b
n55.out -> n54.a
n25.out -> n95.assertion
n5.out -> n95.atom1
n12.out -> n95.formula1
n7.out -> n95.atom2
n41.out -> n95.formula2
n11.out -> n95.atom3
n74.out -> n95.formula3
n95.out -> n93.a
n15.out -> n100.assertion
n5.out -> n100.atom1
n12.out -> n102.a
n74.out -> n102.b
n46.out -> n103.a
n102.out -> n103.b
n76.out -> n104.a
n103.out -> n104.b
n104.out -> n100.formula1
n7.out -> n100.atom2
n5.out -> n100.formula2
n100.out -> n93.b
n93.out -> n92.a
n25.out -> n107.assertion
n7.out -> n107.atom1
n76.out -> n107.formula1
n11.out -> n107.atom2
n103.out -> n107.formula2
n107.out -> n92.b
n92.out -> n54.b
n54.out -> tgt.proof
```

</details>

### 62 · 前件合并 · 中间结论

- 目标：`⊢ ( ( ( P → Q ) → ( P → R ) ) → ( ( P → ( Q → ( P → R ) ) ) → ( P → ( Q → R ) ) ) )`
- 提示：((P→Q)→P→R)→(P→Q→P→R)→P→Q→R
- 参考解：41 个模块 / 103 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n7  atom P
n9  atom Q
n10  imp
n11  atom R
n12  imp
n13  imp
n16  axiom A1
n25  axiom A2
n81  imp
n98  imp
n107  mp M
n108  mp M
n109  mp M
n110  theorem *07
n111  subst S
n114  subst S
n116  imp
n117  imp
n119  mp M
n120  mp M
n121  mp M
n122  mp M
n123  theorem *05
n124  subst S
n129  subst S
n131  imp
n132  imp
n133  imp
n136  subst S
n140  subst S
n142  imp
n143  imp
n146  subst S
n150  mp M
n151  mp M
n153  subst S
n157  subst S
n159  imp
n160  imp
n161  imp
n164  subst S

wires:
n7.out -> n10.a
n9.out -> n10.b
n7.out -> n12.a
n11.out -> n12.b
n10.out -> n13.a
n12.out -> n13.b
n9.out -> n81.a
n12.out -> n81.b
n7.out -> n98.a
n81.out -> n98.b
n110.out -> n111.assertion
n9.out -> n111.atom1
n11.out -> n111.formula1
n111.out -> n109.a
n16.out -> n114.assertion
n7.out -> n114.atom1
n12.out -> n116.a
n11.out -> n116.b
n7.out -> n117.a
n116.out -> n117.b
n117.out -> n114.formula1
n9.out -> n114.atom2
n13.out -> n114.formula2
n114.out -> n109.b
n109.out -> n108.a
n123.out -> n124.assertion
n7.out -> n124.atom1
n12.out -> n124.formula1
n9.out -> n124.atom2
n11.out -> n124.formula2
n11.out -> n124.atom3
n9.out -> n124.formula3
n124.out -> n122.a
n16.out -> n129.assertion
n7.out -> n129.atom1
n9.out -> n131.a
n11.out -> n131.b
n81.out -> n132.a
n131.out -> n132.b
n116.out -> n133.a
n132.out -> n133.b
n133.out -> n129.formula1
n9.out -> n129.atom2
n7.out -> n129.formula2
n129.out -> n122.b
n122.out -> n121.a
n25.out -> n136.assertion
n9.out -> n136.atom1
n116.out -> n136.formula1
n11.out -> n136.atom2
n132.out -> n136.formula2
n136.out -> n121.b
n121.out -> n120.a
n16.out -> n140.assertion
n7.out -> n140.atom1
n7.out -> n142.a
n132.out -> n142.b
n117.out -> n143.a
n142.out -> n143.b
n143.out -> n140.formula1
n9.out -> n140.atom2
n13.out -> n140.formula2
n140.out -> n120.b
n120.out -> n119.a
n25.out -> n146.assertion
n7.out -> n146.atom1
n13.out -> n146.formula1
n9.out -> n146.atom2
n117.out -> n146.formula2
n11.out -> n146.atom3
n142.out -> n146.formula3
n146.out -> n119.b
n119.out -> n108.b
n108.out -> n107.a
n25.out -> n153.assertion
n9.out -> n153.atom1
n81.out -> n153.formula1
n11.out -> n153.atom2
n131.out -> n153.formula2
n153.out -> n151.a
n16.out -> n157.assertion
n7.out -> n157.atom1
n7.out -> n159.a
n131.out -> n159.b
n98.out -> n160.a
n159.out -> n160.b
n142.out -> n161.a
n160.out -> n161.b
n161.out -> n157.formula1
n9.out -> n157.atom2
n13.out -> n157.formula2
n157.out -> n151.b
n151.out -> n150.a
n25.out -> n164.assertion
n7.out -> n164.atom1
n13.out -> n164.formula1
n9.out -> n164.atom2
n142.out -> n164.formula2
n11.out -> n164.atom3
n160.out -> n164.formula3
n164.out -> n150.b
n150.out -> n107.b
n107.out -> tgt.proof
```

</details>

### 63 · 皮尔士回滚 · 中间结论

- 目标：`⊢ ( ( ( P → Q ) → R ) → ( ( ( ( ( P → Q ) → P ) → P ) → ( ( R → P ) → ( ( P → Q ) → P ) ) ) → ( ( ( ( P → Q ) → P ) → P ) → ( ( R → P ) → P ) ) ) )`
- 提示：((P→Q)→R)→((((P→Q)→P)→P)→(R→P)→(P→Q)→P)→(((P→Q)→P)→P)→(R→P)→P
- 参考解：41 个模块 / 107 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n3  theorem *00
n4  subst S
n5  atom P
n7  atom Q
n8  imp
n9  imp
n10  imp
n13  axiom A1
n17  atom R
n18  imp
n25  axiom A2
n45  imp
n46  imp
n51  imp
n60  mp M
n61  mp M
n62  mp M
n64  subst S
n66  imp
n68  mp M
n69  mp M
n70  mp M
n71  mp M
n72  theorem *05
n73  subst S
n78  subst S
n80  imp
n81  imp
n82  imp
n85  subst S
n90  subst S
n92  imp
n95  subst S
n99  mp M
n100  mp M
n102  subst S
n107  subst S
n109  imp
n110  imp
n111  imp
n114  subst S

wires:
n3.out -> n4.assertion
n5.out -> n4.atom1
n5.out -> n8.a
n7.out -> n8.b
n8.out -> n9.a
n5.out -> n9.b
n9.out -> n10.a
n5.out -> n10.b
n10.out -> n4.formula1
n8.out -> n18.a
n17.out -> n18.b
n17.out -> n45.a
n5.out -> n45.b
n45.out -> n46.a
n9.out -> n46.b
n10.out -> n51.a
n46.out -> n51.b
n4.out -> n62.a
n13.out -> n64.assertion
n5.out -> n64.atom1
n10.out -> n66.a
n10.out -> n66.b
n66.out -> n64.formula1
n7.out -> n64.atom2
n18.out -> n64.formula2
n64.out -> n62.b
n62.out -> n61.a
n72.out -> n73.assertion
n5.out -> n73.atom1
n9.out -> n73.formula1
n7.out -> n73.atom2
n5.out -> n73.formula2
n17.out -> n73.atom3
n45.out -> n73.formula3
n73.out -> n71.a
n13.out -> n78.assertion
n5.out -> n78.atom1
n45.out -> n80.a
n5.out -> n80.b
n46.out -> n81.a
n80.out -> n81.b
n10.out -> n82.a
n81.out -> n82.b
n82.out -> n78.formula1
n7.out -> n78.atom2
n10.out -> n78.formula2
n78.out -> n71.b
n71.out -> n70.a
n25.out -> n85.assertion
n5.out -> n85.atom1
n10.out -> n85.formula1
n7.out -> n85.atom2
n10.out -> n85.formula2
n17.out -> n85.atom3
n81.out -> n85.formula3
n85.out -> n70.b
n70.out -> n69.a
n13.out -> n90.assertion
n5.out -> n90.atom1
n66.out -> n92.a
n82.out -> n92.b
n92.out -> n90.formula1
n7.out -> n90.atom2
n18.out -> n90.formula2
n90.out -> n69.b
n69.out -> n68.a
n25.out -> n95.assertion
n5.out -> n95.atom1
n18.out -> n95.formula1
n7.out -> n95.atom2
n66.out -> n95.formula2
n17.out -> n95.atom3
n82.out -> n95.formula3
n95.out -> n68.b
n68.out -> n61.b
n61.out -> n60.a
n25.out -> n102.assertion
n5.out -> n102.atom1
n10.out -> n102.formula1
n7.out -> n102.atom2
n46.out -> n102.formula2
n17.out -> n102.atom3
n80.out -> n102.formula3
n102.out -> n100.a
n13.out -> n107.assertion
n5.out -> n107.atom1
n10.out -> n109.a
n80.out -> n109.b
n51.out -> n110.a
n109.out -> n110.b
n82.out -> n111.a
n110.out -> n111.b
n111.out -> n107.formula1
n7.out -> n107.atom2
n18.out -> n107.formula2
n107.out -> n100.b
n100.out -> n99.a
n25.out -> n114.assertion
n5.out -> n114.atom1
n18.out -> n114.formula1
n7.out -> n114.atom2
n82.out -> n114.formula2
n17.out -> n114.atom3
n110.out -> n114.formula3
n114.out -> n99.b
n99.out -> n60.b
n60.out -> tgt.proof
```

</details>

### 64 · 双重否定引入

- 目标：`⊢ ( P → ¬ ¬ P )`
- 提示：P→¬¬P
- 参考解：42 个模块 / 102 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n112  target
n1  mp M
n2  theorem *00
n3  mp M
n4  mp M
n5  mp M
n9  axiom A1
n10  subst S
n11  atom Q
n12  atom P
n13  not
n14  not
n15  not
n19  imp
n22  axiom A2
n25  atom R
n26  mp M
n27  mp M
n28  mp M
n30  mp M
n31  theorem *19
n32  subst S
n34  mp M
n35  mp M
n37  subst S
n41  subst S
n43  imp
n44  imp
n47  subst S
n78  subst S
n83  subst S
n85  imp
n86  imp
n89  subst S
n92  mp M
n93  mp M
n94  theorem *v
n95  subst S
n99  subst S
n101  imp
n102  imp
n105  subst S
n109  subst S

wires:
n2.out -> n1.a
n9.out -> n10.assertion
n11.out -> n10.atom1
n12.out -> n13.a
n13.out -> n14.a
n14.out -> n15.a
n15.out -> n10.formula1
n15.out -> n19.a
n12.out -> n19.b
n10.out -> n5.a
n31.out -> n32.assertion
n12.out -> n32.atom1
n13.out -> n32.formula1
n32.out -> n30.a
n9.out -> n37.assertion
n12.out -> n37.atom1
n13.out -> n37.formula1
n11.out -> n37.atom2
n12.out -> n37.formula2
n37.out -> n35.a
n9.out -> n41.assertion
n12.out -> n41.atom1
n12.out -> n43.a
n13.out -> n43.b
n13.out -> n44.a
n43.out -> n44.b
n44.out -> n41.formula1
n11.out -> n41.atom2
n15.out -> n41.formula2
n41.out -> n35.b
n35.out -> n34.a
n22.out -> n47.assertion
n12.out -> n47.atom1
n15.out -> n47.formula1
n11.out -> n47.atom2
n13.out -> n47.formula2
n25.out -> n47.atom3
n43.out -> n47.formula3
n47.out -> n34.b
n34.out -> n30.b
n30.out -> n28.a
n22.out -> n78.assertion
n12.out -> n78.atom1
n15.out -> n78.formula1
n11.out -> n78.atom2
n12.out -> n78.formula2
n25.out -> n78.atom3
n13.out -> n78.formula3
n78.out -> n28.b
n28.out -> n27.a
n9.out -> n83.assertion
n12.out -> n83.atom1
n15.out -> n85.a
n13.out -> n85.b
n19.out -> n86.a
n85.out -> n86.b
n86.out -> n83.formula1
n11.out -> n83.atom2
n12.out -> n83.formula2
n83.out -> n27.b
n27.out -> n26.a
n22.out -> n89.assertion
n11.out -> n89.atom1
n19.out -> n89.formula1
n25.out -> n89.atom2
n85.out -> n89.formula2
n89.out -> n26.b
n26.out -> n5.b
n5.out -> n4.a
n94.out -> n95.assertion
n12.out -> n95.atom1
n14.out -> n95.formula1
n11.out -> n95.atom2
n12.out -> n95.formula2
n95.out -> n93.a
n9.out -> n99.assertion
n12.out -> n99.atom1
n12.out -> n101.a
n14.out -> n101.b
n85.out -> n102.a
n101.out -> n102.b
n102.out -> n99.formula1
n11.out -> n99.atom2
n12.out -> n99.formula2
n99.out -> n93.b
n93.out -> n92.a
n22.out -> n105.assertion
n11.out -> n105.atom1
n85.out -> n105.formula1
n25.out -> n105.atom2
n101.out -> n105.formula2
n105.out -> n92.b
n92.out -> n4.b
n4.out -> n3.a
n22.out -> n109.assertion
n11.out -> n109.atom1
n12.out -> n109.formula1
n25.out -> n109.atom2
n14.out -> n109.formula2
n109.out -> n3.b
n3.out -> n1.b
n1.out -> n112.proof
```

</details>

### 65 · 分情况一 · 中间结论

- 目标：`⊢ ( ( ( P → Q ) → ( ¬ P → ( ( ¬ P → Q ) → Q ) ) ) → ( ( P → Q ) → ( ¬ P → ¬ ¬ ( ( ¬ P → Q ) → Q ) ) ) )`
- 提示：((P→Q)→¬P→(¬P→Q)→Q)→(P→Q)→¬P→¬¬((¬P→Q)→Q)
- 参考解：25 个模块 / 53 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  atom P
n7  not
n8  atom Q
n9  imp
n12  axiom A1
n16  imp
n23  axiom A2
n27  atom R
n75  imp
n86  imp
n88  mp M
n89  mp M
n90  mp M
n91  mp M
n92  theorem *64
n93  subst S
n96  subst S
n98  not
n99  not
n100  imp
n103  subst S
n108  subst S
n110  imp
n111  imp
n114  subst S

wires:
n5.out -> n7.a
n7.out -> n9.a
n8.out -> n9.b
n5.out -> n16.a
n8.out -> n16.b
n9.out -> n75.a
n8.out -> n75.b
n7.out -> n86.a
n75.out -> n86.b
n92.out -> n93.assertion
n5.out -> n93.atom1
n75.out -> n93.formula1
n93.out -> n91.a
n12.out -> n96.assertion
n5.out -> n96.atom1
n75.out -> n98.a
n98.out -> n99.a
n75.out -> n100.a
n99.out -> n100.b
n100.out -> n96.formula1
n8.out -> n96.atom2
n7.out -> n96.formula2
n96.out -> n91.b
n91.out -> n90.a
n23.out -> n103.assertion
n5.out -> n103.atom1
n7.out -> n103.formula1
n8.out -> n103.atom2
n75.out -> n103.formula2
n27.out -> n103.atom3
n99.out -> n103.formula3
n103.out -> n90.b
n90.out -> n89.a
n12.out -> n108.assertion
n5.out -> n108.atom1
n7.out -> n110.a
n99.out -> n110.b
n86.out -> n111.a
n110.out -> n111.b
n111.out -> n108.formula1
n8.out -> n108.atom2
n16.out -> n108.formula2
n108.out -> n89.b
n89.out -> n88.a
n23.out -> n114.assertion
n5.out -> n114.atom1
n16.out -> n114.formula1
n8.out -> n114.atom2
n86.out -> n114.formula2
n27.out -> n114.atom3
n110.out -> n114.formula3
n114.out -> n88.b
n88.out -> tgt.proof
```

</details>

### 66 · 逆否换位

- 目标：`⊢ ( ( ¬ P → Q ) → ( ¬ Q → P ) )`
- 提示：(¬P→Q)→¬Q→P
- 参考解：26 个模块 / 52 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n55  target
n1  mp M
n5  atom P
n7  not
n8  atom Q
n9  imp
n12  mp M
n13  mp M
n14  theorem *64
n15  subst S
n17  axiom A1
n18  subst S
n20  not
n21  not
n22  imp
n24  axiom A2
n25  subst S
n27  atom R
n31  imp
n39  mp M
n40  mp M
n41  theorem *v
n42  subst S
n45  subst S
n47  imp
n48  imp
n51  subst S

wires:
n5.out -> n7.a
n7.out -> n9.a
n8.out -> n9.b
n14.out -> n15.assertion
n5.out -> n15.atom1
n8.out -> n15.formula1
n15.out -> n13.a
n17.out -> n18.assertion
n5.out -> n18.atom1
n8.out -> n20.a
n20.out -> n21.a
n8.out -> n22.a
n21.out -> n22.b
n22.out -> n18.formula1
n8.out -> n18.atom2
n7.out -> n18.formula2
n18.out -> n13.b
n13.out -> n12.a
n24.out -> n25.assertion
n5.out -> n25.atom1
n7.out -> n25.formula1
n27.out -> n25.atom2
n21.out -> n25.formula2
n25.out -> n12.b
n7.out -> n31.a
n21.out -> n31.b
n12.out -> n1.a
n41.out -> n42.assertion
n8.out -> n42.atom1
n20.out -> n42.formula1
n42.out -> n40.a
n17.out -> n45.assertion
n5.out -> n45.atom1
n20.out -> n47.a
n5.out -> n47.b
n31.out -> n48.a
n47.out -> n48.b
n48.out -> n45.formula1
n8.out -> n45.atom2
n9.out -> n45.formula2
n45.out -> n40.b
n40.out -> n39.a
n24.out -> n51.assertion
n5.out -> n51.atom1
n9.out -> n51.formula1
n8.out -> n51.atom2
n31.out -> n51.formula2
n27.out -> n51.atom3
n47.out -> n51.formula3
n51.out -> n39.b
n39.out -> n1.b
n1.out -> n55.proof
```

</details>

### 67 · 矛盾消去 · 中间结论

- 目标：`⊢ ( ( ( P → ¬ Q ) → ( ¬ P → ( ( P → Q ) → ¬ P ) ) ) → ( ( P → ¬ Q ) → ( ¬ P → ¬ ¬ ( ( P → Q ) → ¬ P ) ) ) )`
- 提示：((P→¬Q)→¬P→(P→Q)→¬P)→(P→¬Q)→¬P→¬¬((P→Q)→¬P)
- 参考解：26 个模块 / 54 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  atom P
n7  atom Q
n8  imp
n11  axiom A1
n15  not
n16  imp
n23  axiom A2
n27  atom R
n47  not
n57  imp
n58  imp
n91  mp M
n92  mp M
n93  mp M
n94  mp M
n95  theorem *64
n96  subst S
n99  subst S
n101  not
n102  not
n103  imp
n106  subst S
n111  subst S
n113  imp
n114  imp
n117  subst S

wires:
n5.out -> n8.a
n7.out -> n8.b
n7.out -> n15.a
n5.out -> n16.a
n15.out -> n16.b
n5.out -> n47.a
n8.out -> n57.a
n47.out -> n57.b
n47.out -> n58.a
n57.out -> n58.b
n95.out -> n96.assertion
n5.out -> n96.atom1
n57.out -> n96.formula1
n96.out -> n94.a
n11.out -> n99.assertion
n5.out -> n99.atom1
n57.out -> n101.a
n101.out -> n102.a
n57.out -> n103.a
n102.out -> n103.b
n103.out -> n99.formula1
n7.out -> n99.atom2
n47.out -> n99.formula2
n99.out -> n94.b
n94.out -> n93.a
n23.out -> n106.assertion
n5.out -> n106.atom1
n47.out -> n106.formula1
n7.out -> n106.atom2
n57.out -> n106.formula2
n27.out -> n106.atom3
n102.out -> n106.formula3
n106.out -> n93.b
n93.out -> n92.a
n11.out -> n111.assertion
n5.out -> n111.atom1
n47.out -> n113.a
n102.out -> n113.b
n58.out -> n114.a
n113.out -> n114.b
n114.out -> n111.formula1
n7.out -> n111.atom2
n16.out -> n111.formula2
n111.out -> n92.b
n92.out -> n91.a
n23.out -> n117.assertion
n5.out -> n117.atom1
n16.out -> n117.formula1
n7.out -> n117.atom2
n58.out -> n117.formula2
n27.out -> n117.atom3
n113.out -> n117.formula3
n117.out -> n91.b
n91.out -> tgt.proof
```

</details>

### 68 · 矛盾推出否定 · 中间结论

- 目标：`⊢ ( ( P → ¬ P ) → ( ¬ P → ¬ ¬ ¬ P ) )`
- 提示：(P→¬P)→¬P→¬¬¬P
- 参考解：27 个模块 / 59 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n2  theorem *00
n4  atom P
n6  not
n7  imp
n13  mp M
n14  mp M
n16  subst S
n18  axiom A1
n19  subst S
n21  imp
n22  atom Q
n23  mp M
n24  mp M
n25  mp M
n26  mp M
n27  theorem *64
n28  subst S
n31  subst S
n33  not
n34  not
n35  imp
n37  axiom A2
n38  subst S
n41  atom R
n43  subst S
n45  imp
n48  subst S

wires:
n4.out -> n6.a
n4.out -> n7.a
n6.out -> n7.b
n2.out -> n16.assertion
n4.out -> n16.atom1
n6.out -> n16.formula1
n16.out -> n14.a
n18.out -> n19.assertion
n4.out -> n19.atom1
n6.out -> n21.a
n6.out -> n21.b
n21.out -> n19.formula1
n22.out -> n19.atom2
n7.out -> n19.formula2
n19.out -> n14.b
n14.out -> n13.a
n27.out -> n28.assertion
n4.out -> n28.atom1
n6.out -> n28.formula1
n28.out -> n26.a
n18.out -> n31.assertion
n4.out -> n31.atom1
n6.out -> n33.a
n33.out -> n34.a
n6.out -> n35.a
n34.out -> n35.b
n35.out -> n31.formula1
n22.out -> n31.atom2
n6.out -> n31.formula2
n31.out -> n26.b
n26.out -> n25.a
n37.out -> n38.assertion
n4.out -> n38.atom1
n6.out -> n38.formula1
n22.out -> n38.atom2
n6.out -> n38.formula2
n41.out -> n38.atom3
n34.out -> n38.formula3
n38.out -> n25.b
n25.out -> n24.a
n18.out -> n43.assertion
n4.out -> n43.atom1
n21.out -> n45.a
n35.out -> n45.b
n45.out -> n43.formula1
n22.out -> n43.atom2
n7.out -> n43.formula2
n43.out -> n24.b
n24.out -> n23.a
n37.out -> n48.assertion
n4.out -> n48.atom1
n7.out -> n48.formula1
n22.out -> n48.atom2
n21.out -> n48.formula2
n41.out -> n48.atom3
n35.out -> n48.formula3
n48.out -> n23.b
n23.out -> n13.b
n13.out -> tgt.proof
```

</details>

### 69 · 矛盾消去 · 中间结论

- 目标：`⊢ ( ( P → ¬ Q ) → ( ¬ P → ¬ ¬ ( ( P → Q ) → ¬ P ) ) )`
- 提示：(P→¬Q)→¬P→¬¬((P→Q)→¬P)
- 参考解：30 个模块 / 68 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  atom P
n7  atom Q
n8  imp
n11  axiom A1
n15  not
n16  imp
n23  axiom A2
n27  atom R
n40  mp M
n41  mp M
n47  not
n51  subst S
n57  imp
n58  imp
n88  subst S
n91  mp M
n92  mp M
n93  mp M
n94  mp M
n95  theorem *64
n96  subst S
n99  subst S
n101  not
n102  not
n103  imp
n106  subst S
n111  subst S
n113  imp
n114  imp
n117  subst S

wires:
n5.out -> n8.a
n7.out -> n8.b
n7.out -> n15.a
n5.out -> n16.a
n15.out -> n16.b
n5.out -> n47.a
n11.out -> n51.assertion
n5.out -> n51.atom1
n47.out -> n51.formula1
n7.out -> n51.atom2
n8.out -> n51.formula2
n8.out -> n57.a
n47.out -> n57.b
n47.out -> n58.a
n57.out -> n58.b
n51.out -> n41.a
n11.out -> n88.assertion
n5.out -> n88.atom1
n58.out -> n88.formula1
n7.out -> n88.atom2
n16.out -> n88.formula2
n88.out -> n41.b
n41.out -> n40.a
n95.out -> n96.assertion
n5.out -> n96.atom1
n57.out -> n96.formula1
n96.out -> n94.a
n11.out -> n99.assertion
n5.out -> n99.atom1
n57.out -> n101.a
n101.out -> n102.a
n57.out -> n103.a
n102.out -> n103.b
n103.out -> n99.formula1
n7.out -> n99.atom2
n47.out -> n99.formula2
n99.out -> n94.b
n94.out -> n93.a
n23.out -> n106.assertion
n5.out -> n106.atom1
n47.out -> n106.formula1
n7.out -> n106.atom2
n57.out -> n106.formula2
n27.out -> n106.atom3
n102.out -> n106.formula3
n106.out -> n93.b
n93.out -> n92.a
n11.out -> n111.assertion
n5.out -> n111.atom1
n47.out -> n113.a
n102.out -> n113.b
n58.out -> n114.a
n113.out -> n114.b
n114.out -> n111.formula1
n7.out -> n111.atom2
n16.out -> n111.formula2
n111.out -> n92.b
n92.out -> n91.a
n23.out -> n117.assertion
n5.out -> n117.atom1
n16.out -> n117.formula1
n7.out -> n117.atom2
n58.out -> n117.formula2
n27.out -> n117.atom3
n113.out -> n117.formula3
n117.out -> n91.b
n91.out -> n40.b
n40.out -> tgt.proof
```

</details>

### 70 · 合取消去左 · 中间结论

- 目标：`⊢ ( ( ¬ ¬ ( P → Q ) → ¬ ( P → Q ) ) → ¬ ( P → Q ) )`
- 提示：(¬¬(P→Q)→¬(P→Q))→¬(P→Q)
- 参考解：42 个模块 / 115 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n7  axiom A1
n9  atom P
n12  atom Q
n19  axiom A2
n23  atom R
n45  axiom A3
n52  imp
n70  not
n71  not
n134  imp
n144  mp M
n145  mp M
n147  subst S
n150  mp M
n152  subst S
n155  imp
n157  subst S
n161  mp M
n162  mp M
n166  mp M
n167  mp M
n188  subst S
n191  not
n192  not
n196  imp
n204  mp M
n205  mp M
n207  subst S
n211  subst S
n213  imp
n214  imp
n217  subst S
n222  subst S
n229  imp
n237  mp M
n238  mp M
n240  subst S
n244  subst S
n246  imp
n247  imp
n250  subst S
n255  subst S

wires:
n9.out -> n52.a
n12.out -> n52.b
n52.out -> n70.a
n70.out -> n71.a
n71.out -> n134.a
n70.out -> n134.b
n7.out -> n147.assertion
n9.out -> n147.atom1
n134.out -> n147.formula1
n12.out -> n147.atom2
n134.out -> n147.formula2
n147.out -> n145.a
n7.out -> n152.assertion
n9.out -> n152.atom1
n134.out -> n152.formula1
n12.out -> n152.atom2
n134.out -> n155.a
n134.out -> n155.b
n155.out -> n152.formula2
n152.out -> n150.a
n19.out -> n157.assertion
n9.out -> n157.atom1
n134.out -> n157.formula1
n12.out -> n157.atom2
n155.out -> n157.formula2
n23.out -> n157.atom3
n134.out -> n157.formula3
n157.out -> n150.b
n150.out -> n145.b
n145.out -> n144.a
n7.out -> n188.assertion
n9.out -> n188.atom1
n71.out -> n188.formula1
n12.out -> n188.atom2
n134.out -> n191.a
n191.out -> n192.a
n192.out -> n188.formula2
n192.out -> n196.a
n71.out -> n196.b
n188.out -> n167.a
n45.out -> n207.assertion
n9.out -> n207.atom1
n191.out -> n207.formula1
n12.out -> n207.atom2
n70.out -> n207.formula2
n207.out -> n205.a
n7.out -> n211.assertion
n9.out -> n211.atom1
n70.out -> n213.a
n191.out -> n213.b
n196.out -> n214.a
n213.out -> n214.b
n214.out -> n211.formula1
n12.out -> n211.atom2
n71.out -> n211.formula2
n211.out -> n205.b
n205.out -> n204.a
n19.out -> n217.assertion
n9.out -> n217.atom1
n71.out -> n217.formula1
n12.out -> n217.atom2
n196.out -> n217.formula2
n23.out -> n217.atom3
n213.out -> n217.formula3
n217.out -> n204.b
n204.out -> n167.b
n167.out -> n166.a
n19.out -> n222.assertion
n9.out -> n222.atom1
n71.out -> n222.formula1
n12.out -> n222.atom2
n70.out -> n222.formula2
n23.out -> n222.atom3
n191.out -> n222.formula3
n222.out -> n166.b
n71.out -> n229.a
n191.out -> n229.b
n166.out -> n162.a
n45.out -> n240.assertion
n9.out -> n240.atom1
n70.out -> n240.formula1
n12.out -> n240.atom2
n134.out -> n240.formula2
n240.out -> n238.a
n7.out -> n244.assertion
n9.out -> n244.atom1
n134.out -> n246.a
n70.out -> n246.b
n229.out -> n247.a
n246.out -> n247.b
n247.out -> n244.formula1
n12.out -> n244.atom2
n134.out -> n244.formula2
n244.out -> n238.b
n238.out -> n237.a
n19.out -> n250.assertion
n9.out -> n250.atom1
n134.out -> n250.formula1
n12.out -> n250.atom2
n229.out -> n250.formula2
n23.out -> n250.atom3
n246.out -> n250.formula3
n250.out -> n237.b
n237.out -> n162.b
n162.out -> n161.a
n19.out -> n255.assertion
n9.out -> n255.atom1
n134.out -> n255.formula1
n12.out -> n255.atom2
n134.out -> n255.formula2
n23.out -> n255.atom3
n70.out -> n255.formula3
n255.out -> n161.b
n161.out -> n144.b
n144.out -> tgt.proof
```

</details>

### 71 · 反件左消 · 中间结论

- 目标：`⊢ ( ( ( ( P → Q ) → R ) → ( ¬ P → ( ( P → Q ) → R ) ) ) → ( ( ( P → Q ) → R ) → ( ¬ P → R ) ) )`
- 提示：(((P→Q)→R)→¬P→(P→Q)→R)→((P→Q)→R)→¬P→R
- 参考解：42 个模块 / 113 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n3  theorem *00
n4  subst S
n5  atom P
n7  atom Q
n8  imp
n9  atom R
n10  imp
n13  axiom A1
n17  not
n21  imp
n24  axiom A2
n29  mp M
n30  mp M
n31  mp M
n32  mp M
n33  mp M
n34  theorem *04
n35  mp M
n36  mp M
n38  subst S
n42  subst S
n44  imp
n45  imp
n48  subst S
n52  mp M
n53  mp M
n54  mp M
n56  mp M
n58  subst S
n61  subst S
n63  imp
n66  subst S
n70  subst S
n74  subst S
n76  imp
n77  imp
n80  subst S
n85  subst S
n89  subst S
n91  imp
n92  imp
n95  subst S

wires:
n3.out -> n4.assertion
n5.out -> n4.atom1
n5.out -> n8.a
n7.out -> n8.b
n8.out -> n10.a
n9.out -> n10.b
n10.out -> n4.formula1
n5.out -> n17.a
n17.out -> n21.a
n10.out -> n21.b
n34.out -> n33.a
n13.out -> n38.assertion
n5.out -> n38.atom1
n8.out -> n38.formula1
n7.out -> n38.atom2
n10.out -> n38.formula2
n38.out -> n36.a
n13.out -> n42.assertion
n5.out -> n42.atom1
n10.out -> n44.a
n8.out -> n44.b
n8.out -> n45.a
n44.out -> n45.b
n45.out -> n42.formula1
n7.out -> n42.atom2
n17.out -> n42.formula2
n42.out -> n36.b
n36.out -> n35.a
n24.out -> n48.assertion
n5.out -> n48.atom1
n17.out -> n48.formula1
n7.out -> n48.atom2
n8.out -> n48.formula2
n9.out -> n48.atom3
n44.out -> n48.formula3
n48.out -> n35.b
n35.out -> n33.b
n33.out -> n32.a
n3.out -> n58.assertion
n5.out -> n58.atom1
n9.out -> n58.formula1
n58.out -> n56.a
n13.out -> n61.assertion
n5.out -> n61.atom1
n9.out -> n63.a
n9.out -> n63.b
n63.out -> n61.formula1
n7.out -> n61.atom2
n8.out -> n61.formula2
n61.out -> n56.b
n56.out -> n4.a
n24.out -> n66.assertion
n5.out -> n66.atom1
n8.out -> n66.formula1
n7.out -> n66.atom2
n9.out -> n66.formula2
n66.out -> n4.b
n4.out -> n54.a
n24.out -> n70.assertion
n5.out -> n70.atom1
n10.out -> n70.formula1
n7.out -> n70.atom2
n8.out -> n70.formula2
n70.out -> n54.b
n54.out -> n53.a
n13.out -> n74.assertion
n5.out -> n74.atom1
n10.out -> n76.a
n9.out -> n76.b
n44.out -> n77.a
n76.out -> n77.b
n77.out -> n74.formula1
n7.out -> n74.atom2
n17.out -> n74.formula2
n74.out -> n53.b
n53.out -> n52.a
n24.out -> n80.assertion
n5.out -> n80.atom1
n17.out -> n80.formula1
n7.out -> n80.atom2
n44.out -> n80.formula2
n9.out -> n80.atom3
n76.out -> n80.formula3
n80.out -> n52.b
n52.out -> n32.b
n32.out -> n31.a
n24.out -> n85.assertion
n5.out -> n85.atom1
n17.out -> n85.formula1
n7.out -> n85.atom2
n10.out -> n85.formula2
n85.out -> n31.b
n31.out -> n30.a
n13.out -> n89.assertion
n5.out -> n89.atom1
n17.out -> n91.a
n9.out -> n91.b
n21.out -> n92.a
n91.out -> n92.b
n92.out -> n89.formula1
n7.out -> n89.atom2
n10.out -> n89.formula2
n89.out -> n30.b
n30.out -> n29.a
n24.out -> n95.assertion
n5.out -> n95.atom1
n10.out -> n95.formula1
n7.out -> n95.atom2
n21.out -> n95.formula2
n9.out -> n95.atom3
n91.out -> n95.formula3
n95.out -> n29.b
n29.out -> tgt.proof
```

</details>

### 72 · 反件消去

- 目标：`⊢ ( ( ( P → Q ) → R ) → ( Q → R ) )`
- 提示：((P→Q)→R)→Q→R
- 参考解：43 个模块 / 118 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n98  target
n1  mp M
n3  theorem *00
n4  subst S
n5  atom P
n7  atom Q
n8  imp
n9  atom R
n10  imp
n13  axiom A1
n14  subst S
n19  imp
n22  axiom A2
n27  mp M
n28  mp M
n29  mp M
n30  mp M
n31  mp M
n33  subst S
n36  mp M
n37  mp M
n39  subst S
n43  subst S
n45  imp
n46  imp
n48  subst S
n52  mp M
n53  mp M
n54  mp M
n56  mp M
n58  subst S
n61  subst S
n63  imp
n66  subst S
n70  subst S
n74  subst S
n76  imp
n77  imp
n79  subst S
n84  subst S
n88  subst S
n90  imp
n91  imp
n94  subst S

wires:
n3.out -> n4.assertion
n5.out -> n4.atom1
n5.out -> n8.a
n7.out -> n8.b
n8.out -> n10.a
n9.out -> n10.b
n10.out -> n4.formula1
n13.out -> n14.assertion
n5.out -> n14.atom1
n10.out -> n14.formula1
n7.out -> n19.a
n10.out -> n19.b
n14.out -> n1.a
n13.out -> n33.assertion
n5.out -> n33.atom1
n7.out -> n33.formula1
n7.out -> n33.atom2
n5.out -> n33.formula2
n33.out -> n31.a
n13.out -> n39.assertion
n5.out -> n39.atom1
n8.out -> n39.formula1
n7.out -> n39.atom2
n10.out -> n39.formula2
n39.out -> n37.a
n13.out -> n43.assertion
n5.out -> n43.atom1
n10.out -> n45.a
n8.out -> n45.b
n8.out -> n46.a
n45.out -> n46.b
n46.out -> n43.formula1
n43.out -> n37.b
n37.out -> n36.a
n22.out -> n48.assertion
n5.out -> n48.atom1
n7.out -> n48.formula1
n7.out -> n48.atom2
n8.out -> n48.formula2
n9.out -> n48.atom3
n45.out -> n48.formula3
n48.out -> n36.b
n36.out -> n31.b
n31.out -> n30.a
n3.out -> n58.assertion
n5.out -> n58.atom1
n9.out -> n58.formula1
n58.out -> n56.a
n13.out -> n61.assertion
n5.out -> n61.atom1
n9.out -> n63.a
n9.out -> n63.b
n63.out -> n61.formula1
n7.out -> n61.atom2
n8.out -> n61.formula2
n61.out -> n56.b
n56.out -> n4.a
n22.out -> n66.assertion
n5.out -> n66.atom1
n8.out -> n66.formula1
n7.out -> n66.atom2
n9.out -> n66.formula2
n66.out -> n4.b
n4.out -> n54.a
n22.out -> n70.assertion
n5.out -> n70.atom1
n10.out -> n70.formula1
n7.out -> n70.atom2
n8.out -> n70.formula2
n70.out -> n54.b
n54.out -> n53.a
n13.out -> n74.assertion
n5.out -> n74.atom1
n10.out -> n76.a
n9.out -> n76.b
n45.out -> n77.a
n76.out -> n77.b
n77.out -> n74.formula1
n74.out -> n53.b
n53.out -> n52.a
n22.out -> n79.assertion
n5.out -> n79.atom1
n7.out -> n79.formula1
n7.out -> n79.atom2
n45.out -> n79.formula2
n9.out -> n79.atom3
n76.out -> n79.formula3
n79.out -> n52.b
n52.out -> n30.b
n30.out -> n29.a
n22.out -> n84.assertion
n5.out -> n84.atom1
n7.out -> n84.formula1
n7.out -> n84.atom2
n10.out -> n84.formula2
n84.out -> n29.b
n29.out -> n28.a
n13.out -> n88.assertion
n5.out -> n88.atom1
n7.out -> n90.a
n9.out -> n90.b
n19.out -> n91.a
n90.out -> n91.b
n91.out -> n88.formula1
n7.out -> n88.atom2
n10.out -> n88.formula2
n88.out -> n28.b
n28.out -> n27.a
n22.out -> n94.assertion
n5.out -> n94.atom1
n10.out -> n94.formula1
n7.out -> n94.atom2
n19.out -> n94.formula2
n9.out -> n94.atom3
n90.out -> n94.formula3
n94.out -> n27.b
n27.out -> n1.b
n1.out -> n98.proof
```

</details>

### 73 · 前件交换

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( Q → ( P → R ) ) )`
- 提示：(P→Q→R)→Q→P→R
- 参考解：43 个模块 / 117 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n96  target
n1  mp M
n5  atom P
n7  atom Q
n8  atom R
n9  imp
n10  imp
n13  axiom A1
n14  subst S
n19  imp
n22  axiom A2
n27  mp M
n28  mp M
n29  mp M
n30  mp M
n31  theorem *07
n32  subst S
n36  subst S
n38  imp
n39  imp
n41  mp M
n42  mp M
n43  mp M
n44  mp M
n45  theorem *05
n46  subst S
n51  subst S
n53  imp
n54  imp
n55  imp
n57  subst S
n62  subst S
n64  imp
n65  imp
n68  subst S
n72  mp M
n73  mp M
n75  subst S
n80  subst S
n82  imp
n83  imp
n84  imp
n87  subst S
n92  subst S

wires:
n7.out -> n9.a
n8.out -> n9.b
n5.out -> n10.a
n9.out -> n10.b
n13.out -> n14.assertion
n5.out -> n14.atom1
n10.out -> n14.formula1
n7.out -> n19.a
n10.out -> n19.b
n14.out -> n1.a
n31.out -> n32.assertion
n5.out -> n32.atom1
n7.out -> n32.formula1
n7.out -> n32.atom2
n8.out -> n32.formula2
n32.out -> n30.a
n13.out -> n36.assertion
n5.out -> n36.atom1
n9.out -> n38.a
n8.out -> n38.b
n7.out -> n39.a
n38.out -> n39.b
n39.out -> n36.formula1
n7.out -> n36.atom2
n10.out -> n36.formula2
n36.out -> n30.b
n30.out -> n29.a
n45.out -> n46.assertion
n5.out -> n46.atom1
n9.out -> n46.formula1
n7.out -> n46.atom2
n8.out -> n46.formula2
n8.out -> n46.atom3
n5.out -> n46.formula3
n46.out -> n44.a
n13.out -> n51.assertion
n5.out -> n51.atom1
n5.out -> n53.a
n8.out -> n53.b
n10.out -> n54.a
n53.out -> n54.b
n38.out -> n55.a
n54.out -> n55.b
n55.out -> n51.formula1
n51.out -> n44.b
n44.out -> n43.a
n22.out -> n57.assertion
n5.out -> n57.atom1
n7.out -> n57.formula1
n7.out -> n57.atom2
n38.out -> n57.formula2
n8.out -> n57.atom3
n54.out -> n57.formula3
n57.out -> n43.b
n43.out -> n42.a
n13.out -> n62.assertion
n5.out -> n62.atom1
n7.out -> n64.a
n54.out -> n64.b
n39.out -> n65.a
n64.out -> n65.b
n65.out -> n62.formula1
n7.out -> n62.atom2
n10.out -> n62.formula2
n62.out -> n42.b
n42.out -> n41.a
n22.out -> n68.assertion
n5.out -> n68.atom1
n10.out -> n68.formula1
n7.out -> n68.atom2
n39.out -> n68.formula2
n8.out -> n68.atom3
n64.out -> n68.formula3
n68.out -> n41.b
n41.out -> n29.b
n29.out -> n28.a
n22.out -> n75.assertion
n5.out -> n75.atom1
n7.out -> n75.formula1
n7.out -> n75.atom2
n10.out -> n75.formula2
n8.out -> n75.atom3
n53.out -> n75.formula3
n75.out -> n73.a
n13.out -> n80.assertion
n5.out -> n80.atom1
n7.out -> n82.a
n53.out -> n82.b
n19.out -> n83.a
n82.out -> n83.b
n64.out -> n84.a
n83.out -> n84.b
n84.out -> n80.formula1
n7.out -> n80.atom2
n10.out -> n80.formula2
n80.out -> n73.b
n73.out -> n72.a
n22.out -> n87.assertion
n5.out -> n87.atom1
n10.out -> n87.formula1
n7.out -> n87.atom2
n64.out -> n87.formula2
n8.out -> n87.atom3
n83.out -> n87.formula3
n87.out -> n72.b
n72.out -> n28.b
n28.out -> n27.a
n22.out -> n92.assertion
n5.out -> n92.atom1
n10.out -> n92.formula1
n7.out -> n92.atom2
n19.out -> n92.formula2
n8.out -> n92.atom3
n82.out -> n92.formula3
n92.out -> n27.b
n27.out -> n1.b
n1.out -> n96.proof
```

</details>

### 74 · 皮尔士回滚 · 中间结论

- 目标：`⊢ ( ( ( ( P → Q ) → R ) → ( ( ( ( P → Q ) → P ) → P ) → ( ( R → P ) → ( ( P → Q ) → P ) ) ) ) → ( ( ( P → Q ) → R ) → ( ( ( ( P → Q ) → P ) → P ) → ( ( R → P ) → P ) ) ) )`
- 提示：(((P→Q)→R)→(((P→Q)→P)→P)→(R→P)→(P→Q)→P)→((P→Q)→R)→(((P→Q)→P)→P)→(R→P)→P
- 参考解：43 个模块 / 116 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n3  theorem *00
n4  subst S
n5  atom P
n7  atom Q
n8  imp
n9  imp
n10  imp
n13  axiom A1
n17  atom R
n18  imp
n25  axiom A2
n45  imp
n46  imp
n51  imp
n59  mp M
n60  mp M
n61  mp M
n62  mp M
n64  subst S
n66  imp
n68  mp M
n69  mp M
n70  mp M
n71  mp M
n72  theorem *05
n73  subst S
n78  subst S
n80  imp
n81  imp
n82  imp
n85  subst S
n90  subst S
n92  imp
n95  subst S
n99  mp M
n100  mp M
n102  subst S
n107  subst S
n109  imp
n110  imp
n111  imp
n114  subst S
n119  subst S

wires:
n3.out -> n4.assertion
n5.out -> n4.atom1
n5.out -> n8.a
n7.out -> n8.b
n8.out -> n9.a
n5.out -> n9.b
n9.out -> n10.a
n5.out -> n10.b
n10.out -> n4.formula1
n8.out -> n18.a
n17.out -> n18.b
n17.out -> n45.a
n5.out -> n45.b
n45.out -> n46.a
n9.out -> n46.b
n10.out -> n51.a
n46.out -> n51.b
n4.out -> n62.a
n13.out -> n64.assertion
n5.out -> n64.atom1
n10.out -> n66.a
n10.out -> n66.b
n66.out -> n64.formula1
n7.out -> n64.atom2
n18.out -> n64.formula2
n64.out -> n62.b
n62.out -> n61.a
n72.out -> n73.assertion
n5.out -> n73.atom1
n9.out -> n73.formula1
n7.out -> n73.atom2
n5.out -> n73.formula2
n17.out -> n73.atom3
n45.out -> n73.formula3
n73.out -> n71.a
n13.out -> n78.assertion
n5.out -> n78.atom1
n45.out -> n80.a
n5.out -> n80.b
n46.out -> n81.a
n80.out -> n81.b
n10.out -> n82.a
n81.out -> n82.b
n82.out -> n78.formula1
n7.out -> n78.atom2
n10.out -> n78.formula2
n78.out -> n71.b
n71.out -> n70.a
n25.out -> n85.assertion
n5.out -> n85.atom1
n10.out -> n85.formula1
n7.out -> n85.atom2
n10.out -> n85.formula2
n17.out -> n85.atom3
n81.out -> n85.formula3
n85.out -> n70.b
n70.out -> n69.a
n13.out -> n90.assertion
n5.out -> n90.atom1
n66.out -> n92.a
n82.out -> n92.b
n92.out -> n90.formula1
n7.out -> n90.atom2
n18.out -> n90.formula2
n90.out -> n69.b
n69.out -> n68.a
n25.out -> n95.assertion
n5.out -> n95.atom1
n18.out -> n95.formula1
n7.out -> n95.atom2
n66.out -> n95.formula2
n17.out -> n95.atom3
n82.out -> n95.formula3
n95.out -> n68.b
n68.out -> n61.b
n61.out -> n60.a
n25.out -> n102.assertion
n5.out -> n102.atom1
n10.out -> n102.formula1
n7.out -> n102.atom2
n46.out -> n102.formula2
n17.out -> n102.atom3
n80.out -> n102.formula3
n102.out -> n100.a
n13.out -> n107.assertion
n5.out -> n107.atom1
n10.out -> n109.a
n80.out -> n109.b
n51.out -> n110.a
n109.out -> n110.b
n82.out -> n111.a
n110.out -> n111.b
n111.out -> n107.formula1
n7.out -> n107.atom2
n18.out -> n107.formula2
n107.out -> n100.b
n100.out -> n99.a
n25.out -> n114.assertion
n5.out -> n114.atom1
n18.out -> n114.formula1
n7.out -> n114.atom2
n82.out -> n114.formula2
n17.out -> n114.atom3
n110.out -> n114.formula3
n114.out -> n99.b
n99.out -> n60.b
n60.out -> n59.a
n25.out -> n119.assertion
n5.out -> n119.atom1
n18.out -> n119.formula1
n7.out -> n119.atom2
n51.out -> n119.formula2
n17.out -> n119.atom3
n109.out -> n119.formula3
n119.out -> n59.b
n59.out -> tgt.proof
```

</details>

### 75 · 反件左消

- 目标：`⊢ ( ( ( P → Q ) → R ) → ( ¬ P → R ) )`
- 提示：((P→Q)→R)→¬P→R
- 参考解：44 个模块 / 120 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n99  target
n1  mp M
n3  theorem *00
n4  subst S
n5  atom P
n7  atom Q
n8  imp
n9  atom R
n10  imp
n13  axiom A1
n14  subst S
n17  not
n21  imp
n24  axiom A2
n29  mp M
n30  mp M
n31  mp M
n32  mp M
n33  mp M
n34  theorem *04
n35  mp M
n36  mp M
n38  subst S
n42  subst S
n44  imp
n45  imp
n48  subst S
n52  mp M
n53  mp M
n54  mp M
n56  mp M
n58  subst S
n61  subst S
n63  imp
n66  subst S
n70  subst S
n74  subst S
n76  imp
n77  imp
n80  subst S
n85  subst S
n89  subst S
n91  imp
n92  imp
n95  subst S

wires:
n3.out -> n4.assertion
n5.out -> n4.atom1
n5.out -> n8.a
n7.out -> n8.b
n8.out -> n10.a
n9.out -> n10.b
n10.out -> n4.formula1
n13.out -> n14.assertion
n5.out -> n14.atom1
n10.out -> n14.formula1
n7.out -> n14.atom2
n5.out -> n17.a
n17.out -> n14.formula2
n17.out -> n21.a
n10.out -> n21.b
n14.out -> n1.a
n34.out -> n33.a
n13.out -> n38.assertion
n5.out -> n38.atom1
n8.out -> n38.formula1
n7.out -> n38.atom2
n10.out -> n38.formula2
n38.out -> n36.a
n13.out -> n42.assertion
n5.out -> n42.atom1
n10.out -> n44.a
n8.out -> n44.b
n8.out -> n45.a
n44.out -> n45.b
n45.out -> n42.formula1
n7.out -> n42.atom2
n17.out -> n42.formula2
n42.out -> n36.b
n36.out -> n35.a
n24.out -> n48.assertion
n5.out -> n48.atom1
n17.out -> n48.formula1
n7.out -> n48.atom2
n8.out -> n48.formula2
n9.out -> n48.atom3
n44.out -> n48.formula3
n48.out -> n35.b
n35.out -> n33.b
n33.out -> n32.a
n3.out -> n58.assertion
n5.out -> n58.atom1
n9.out -> n58.formula1
n58.out -> n56.a
n13.out -> n61.assertion
n5.out -> n61.atom1
n9.out -> n63.a
n9.out -> n63.b
n63.out -> n61.formula1
n7.out -> n61.atom2
n8.out -> n61.formula2
n61.out -> n56.b
n56.out -> n4.a
n24.out -> n66.assertion
n5.out -> n66.atom1
n8.out -> n66.formula1
n7.out -> n66.atom2
n9.out -> n66.formula2
n66.out -> n4.b
n4.out -> n54.a
n24.out -> n70.assertion
n5.out -> n70.atom1
n10.out -> n70.formula1
n7.out -> n70.atom2
n8.out -> n70.formula2
n70.out -> n54.b
n54.out -> n53.a
n13.out -> n74.assertion
n5.out -> n74.atom1
n10.out -> n76.a
n9.out -> n76.b
n44.out -> n77.a
n76.out -> n77.b
n77.out -> n74.formula1
n7.out -> n74.atom2
n17.out -> n74.formula2
n74.out -> n53.b
n53.out -> n52.a
n24.out -> n80.assertion
n5.out -> n80.atom1
n17.out -> n80.formula1
n7.out -> n80.atom2
n44.out -> n80.formula2
n9.out -> n80.atom3
n76.out -> n80.formula3
n80.out -> n52.b
n52.out -> n32.b
n32.out -> n31.a
n24.out -> n85.assertion
n5.out -> n85.atom1
n17.out -> n85.formula1
n7.out -> n85.atom2
n10.out -> n85.formula2
n85.out -> n31.b
n31.out -> n30.a
n13.out -> n89.assertion
n5.out -> n89.atom1
n17.out -> n91.a
n9.out -> n91.b
n21.out -> n92.a
n91.out -> n92.b
n92.out -> n89.formula1
n7.out -> n89.atom2
n10.out -> n89.formula2
n89.out -> n30.b
n30.out -> n29.a
n24.out -> n95.assertion
n5.out -> n95.atom1
n10.out -> n95.formula1
n7.out -> n95.atom2
n21.out -> n95.formula2
n9.out -> n95.atom3
n91.out -> n95.formula3
n95.out -> n29.b
n29.out -> n1.b
n1.out -> n99.proof
```

</details>

### 76 · 否定蕴涵取后件

- 目标：`⊢ ( ¬ ( P → ¬ Q ) → Q )`
- 提示：¬(P→¬Q)→Q
- 参考解：46 个模块 / 125 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n282  target
n1  mp M
n2  mp M
n7  atom P
n8  atom Q
n9  not
n12  axiom A1
n13  subst S
n20  imp
n23  axiom A2
n27  atom R
n57  theorem *19
n136  theorem *v
n164  mp M
n165  mp M
n166  mp M
n171  subst S
n174  not
n175  not
n176  not
n180  imp
n188  mp M
n189  mp M
n190  mp M
n192  mp M
n194  subst S
n196  mp M
n197  mp M
n199  subst S
n203  subst S
n205  imp
n206  imp
n209  subst S
n241  subst S
n246  subst S
n248  imp
n249  imp
n252  subst S
n256  mp M
n257  mp M
n259  subst S
n263  subst S
n265  imp
n266  imp
n269  subst S
n274  subst S
n279  subst S

wires:
n8.out -> n9.a
n12.out -> n13.assertion
n7.out -> n13.atom1
n9.out -> n13.formula1
n8.out -> n13.atom2
n7.out -> n13.formula2
n7.out -> n20.a
n9.out -> n20.b
n13.out -> n2.a
n12.out -> n171.assertion
n7.out -> n171.atom1
n9.out -> n171.formula1
n8.out -> n171.atom2
n20.out -> n174.a
n174.out -> n175.a
n175.out -> n176.a
n176.out -> n171.formula2
n176.out -> n180.a
n9.out -> n180.b
n171.out -> n166.a
n57.out -> n194.assertion
n7.out -> n194.atom1
n174.out -> n194.formula1
n194.out -> n192.a
n12.out -> n199.assertion
n7.out -> n199.atom1
n174.out -> n199.formula1
n8.out -> n199.atom2
n9.out -> n199.formula2
n199.out -> n197.a
n12.out -> n203.assertion
n7.out -> n203.atom1
n9.out -> n205.a
n174.out -> n205.b
n174.out -> n206.a
n205.out -> n206.b
n206.out -> n203.formula1
n8.out -> n203.atom2
n176.out -> n203.formula2
n203.out -> n197.b
n197.out -> n196.a
n23.out -> n209.assertion
n7.out -> n209.atom1
n176.out -> n209.formula1
n8.out -> n209.atom2
n174.out -> n209.formula2
n27.out -> n209.atom3
n205.out -> n209.formula3
n209.out -> n196.b
n196.out -> n192.b
n192.out -> n190.a
n23.out -> n241.assertion
n7.out -> n241.atom1
n176.out -> n241.formula1
n8.out -> n241.atom2
n9.out -> n241.formula2
n27.out -> n241.atom3
n174.out -> n241.formula3
n241.out -> n190.b
n190.out -> n189.a
n12.out -> n246.assertion
n7.out -> n246.atom1
n176.out -> n248.a
n174.out -> n248.b
n180.out -> n249.a
n248.out -> n249.b
n249.out -> n246.formula1
n8.out -> n246.atom2
n9.out -> n246.formula2
n246.out -> n189.b
n189.out -> n188.a
n23.out -> n252.assertion
n7.out -> n252.atom1
n9.out -> n252.formula1
n8.out -> n252.atom2
n180.out -> n252.formula2
n27.out -> n252.atom3
n248.out -> n252.formula3
n252.out -> n188.b
n188.out -> n166.b
n166.out -> n165.a
n136.out -> n259.assertion
n7.out -> n259.atom1
n175.out -> n259.formula1
n8.out -> n259.atom2
n20.out -> n259.formula2
n259.out -> n257.a
n12.out -> n263.assertion
n7.out -> n263.atom1
n20.out -> n265.a
n175.out -> n265.b
n248.out -> n266.a
n265.out -> n266.b
n266.out -> n263.formula1
n8.out -> n263.atom2
n9.out -> n263.formula2
n263.out -> n257.b
n257.out -> n256.a
n23.out -> n269.assertion
n7.out -> n269.atom1
n9.out -> n269.formula1
n8.out -> n269.atom2
n248.out -> n269.formula2
n27.out -> n269.atom3
n265.out -> n269.formula3
n269.out -> n256.b
n256.out -> n165.b
n165.out -> n164.a
n23.out -> n274.assertion
n7.out -> n274.atom1
n9.out -> n274.formula1
n8.out -> n274.atom2
n20.out -> n274.formula2
n27.out -> n274.atom3
n175.out -> n274.formula3
n274.out -> n164.b
n164.out -> n2.b
n2.out -> n1.a
n136.out -> n279.assertion
n7.out -> n279.atom1
n8.out -> n279.formula1
n8.out -> n279.atom2
n174.out -> n279.formula2
n279.out -> n1.b
n1.out -> n282.proof
```

</details>

### 77 · 否定蕴涵取前件

- 目标：`⊢ ( ¬ ( P → Q ) → P )`
- 提示：¬(P→Q)→P
- 参考解：46 个模块 / 118 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n128  target
n1  mp M
n2  mp M
n3  theorem *04
n4  mp M
n5  mp M
n6  mp M
n10  atom P
n12  not
n15  axiom A1
n16  subst S
n18  atom Q
n20  imp
n21  not
n22  not
n23  not
n27  imp
n30  axiom A2
n34  atom R
n35  mp M
n36  mp M
n37  mp M
n39  mp M
n40  theorem *19
n41  subst S
n43  mp M
n44  mp M
n46  subst S
n50  subst S
n52  imp
n53  imp
n56  subst S
n88  subst S
n93  subst S
n95  imp
n96  imp
n99  subst S
n103  mp M
n104  mp M
n105  theorem *v
n106  subst S
n110  subst S
n112  imp
n113  imp
n116  subst S
n121  subst S
n126  subst S

wires:
n3.out -> n2.a
n10.out -> n12.a
n15.out -> n16.assertion
n10.out -> n16.atom1
n12.out -> n16.formula1
n18.out -> n16.atom2
n10.out -> n20.a
n18.out -> n20.b
n20.out -> n21.a
n21.out -> n22.a
n22.out -> n23.a
n23.out -> n16.formula2
n23.out -> n27.a
n12.out -> n27.b
n16.out -> n6.a
n40.out -> n41.assertion
n10.out -> n41.atom1
n21.out -> n41.formula1
n41.out -> n39.a
n15.out -> n46.assertion
n10.out -> n46.atom1
n21.out -> n46.formula1
n18.out -> n46.atom2
n12.out -> n46.formula2
n46.out -> n44.a
n15.out -> n50.assertion
n10.out -> n50.atom1
n12.out -> n52.a
n21.out -> n52.b
n21.out -> n53.a
n52.out -> n53.b
n53.out -> n50.formula1
n18.out -> n50.atom2
n23.out -> n50.formula2
n50.out -> n44.b
n44.out -> n43.a
n30.out -> n56.assertion
n10.out -> n56.atom1
n23.out -> n56.formula1
n18.out -> n56.atom2
n21.out -> n56.formula2
n34.out -> n56.atom3
n52.out -> n56.formula3
n56.out -> n43.b
n43.out -> n39.b
n39.out -> n37.a
n30.out -> n88.assertion
n10.out -> n88.atom1
n23.out -> n88.formula1
n18.out -> n88.atom2
n12.out -> n88.formula2
n34.out -> n88.atom3
n21.out -> n88.formula3
n88.out -> n37.b
n37.out -> n36.a
n15.out -> n93.assertion
n10.out -> n93.atom1
n23.out -> n95.a
n21.out -> n95.b
n27.out -> n96.a
n95.out -> n96.b
n96.out -> n93.formula1
n18.out -> n93.atom2
n12.out -> n93.formula2
n93.out -> n36.b
n36.out -> n35.a
n30.out -> n99.assertion
n10.out -> n99.atom1
n12.out -> n99.formula1
n18.out -> n99.atom2
n27.out -> n99.formula2
n34.out -> n99.atom3
n95.out -> n99.formula3
n99.out -> n35.b
n35.out -> n6.b
n6.out -> n5.a
n105.out -> n106.assertion
n10.out -> n106.atom1
n22.out -> n106.formula1
n18.out -> n106.atom2
n20.out -> n106.formula2
n106.out -> n104.a
n15.out -> n110.assertion
n10.out -> n110.atom1
n20.out -> n112.a
n22.out -> n112.b
n95.out -> n113.a
n112.out -> n113.b
n113.out -> n110.formula1
n18.out -> n110.atom2
n12.out -> n110.formula2
n110.out -> n104.b
n104.out -> n103.a
n30.out -> n116.assertion
n10.out -> n116.atom1
n12.out -> n116.formula1
n18.out -> n116.atom2
n95.out -> n116.formula2
n34.out -> n116.atom3
n112.out -> n116.formula3
n116.out -> n103.b
n103.out -> n5.b
n5.out -> n4.a
n30.out -> n121.assertion
n10.out -> n121.atom1
n12.out -> n121.formula1
n18.out -> n121.atom2
n20.out -> n121.formula2
n34.out -> n121.atom3
n22.out -> n121.formula3
n121.out -> n4.b
n4.out -> n2.b
n2.out -> n1.a
n105.out -> n126.assertion
n18.out -> n126.atom1
n21.out -> n126.formula1
n126.out -> n1.b
n1.out -> n128.proof
```

</details>

### 78 · 皮尔士律 · 中间结论

- 目标：`⊢ ( ( ( P → Q ) → P ) → ( ¬ ( P → Q ) → ¬ ¬ P ) )`
- 提示：((P→Q)→P)→¬(P→Q)→¬¬P
- 参考解：27 个模块 / 57 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n4  atom P
n6  atom Q
n7  imp
n8  imp
n14  mp M
n15  mp M
n16  theorem *77
n17  axiom A1
n18  subst S
n20  not
n21  imp
n23  mp M
n24  mp M
n25  mp M
n26  mp M
n27  theorem *64
n29  subst S
n31  not
n32  not
n33  imp
n35  axiom A2
n36  subst S
n39  atom R
n41  subst S
n43  imp
n44  imp
n47  subst S

wires:
n4.out -> n7.a
n6.out -> n7.b
n7.out -> n8.a
n4.out -> n8.b
n16.out -> n15.a
n17.out -> n18.assertion
n4.out -> n18.atom1
n7.out -> n20.a
n20.out -> n21.a
n4.out -> n21.b
n21.out -> n18.formula1
n6.out -> n18.atom2
n8.out -> n18.formula2
n18.out -> n15.b
n15.out -> n14.a
n27.out -> n26.a
n17.out -> n29.assertion
n4.out -> n29.atom1
n4.out -> n31.a
n31.out -> n32.a
n4.out -> n33.a
n32.out -> n33.b
n33.out -> n29.formula1
n6.out -> n29.atom2
n20.out -> n29.formula2
n29.out -> n26.b
n26.out -> n25.a
n35.out -> n36.assertion
n4.out -> n36.atom1
n20.out -> n36.formula1
n6.out -> n36.atom2
n4.out -> n36.formula2
n39.out -> n36.atom3
n32.out -> n36.formula3
n36.out -> n25.b
n25.out -> n24.a
n17.out -> n41.assertion
n4.out -> n41.atom1
n20.out -> n43.a
n32.out -> n43.b
n21.out -> n44.a
n43.out -> n44.b
n44.out -> n41.formula1
n6.out -> n41.atom2
n8.out -> n41.formula2
n41.out -> n24.b
n24.out -> n23.a
n35.out -> n47.assertion
n4.out -> n47.atom1
n8.out -> n47.formula1
n6.out -> n47.atom2
n21.out -> n47.formula2
n39.out -> n47.atom3
n43.out -> n47.formula3
n47.out -> n23.b
n23.out -> n14.b
n14.out -> tgt.proof
```

</details>

### 79 · 否定蕴涵分配二 · 中间结论

- 目标：`⊢ ( ¬ ( P → Q ) → ( ¬ R → ¬ ¬ P ) )`
- 提示：¬(P→Q)→¬R→¬¬P
- 参考解：32 个模块 / 72 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n2  mp M
n3  mp M
n4  theorem *77
n5  mp M
n6  mp M
n7  axiom A1
n8  subst S
n9  atom Q
n10  atom R
n11  not
n13  subst S
n14  atom P
n16  imp
n17  imp
n20  imp
n21  not
n22  axiom A2
n23  subst S
n27  mp M
n28  mp M
n29  mp M
n30  mp M
n31  theorem *64
n33  subst S
n35  not
n36  not
n37  imp
n40  subst S
n45  subst S
n47  imp
n48  imp
n51  subst S

wires:
n4.out -> n3.a
n7.out -> n8.assertion
n9.out -> n8.atom1
n10.out -> n11.a
n11.out -> n8.formula1
n8.out -> n6.a
n7.out -> n13.assertion
n14.out -> n13.atom1
n11.out -> n16.a
n14.out -> n16.b
n14.out -> n17.a
n16.out -> n17.b
n17.out -> n13.formula1
n9.out -> n13.atom2
n14.out -> n20.a
n9.out -> n20.b
n20.out -> n21.a
n21.out -> n13.formula2
n13.out -> n6.b
n6.out -> n5.a
n22.out -> n23.assertion
n14.out -> n23.atom1
n21.out -> n23.formula1
n9.out -> n23.atom2
n14.out -> n23.formula2
n10.out -> n23.atom3
n16.out -> n23.formula3
n23.out -> n5.b
n5.out -> n3.b
n3.out -> n2.a
n31.out -> n30.a
n7.out -> n33.assertion
n14.out -> n33.atom1
n14.out -> n35.a
n35.out -> n36.a
n14.out -> n37.a
n36.out -> n37.b
n37.out -> n33.formula1
n9.out -> n33.atom2
n11.out -> n33.formula2
n33.out -> n30.b
n30.out -> n29.a
n22.out -> n40.assertion
n14.out -> n40.atom1
n11.out -> n40.formula1
n9.out -> n40.atom2
n14.out -> n40.formula2
n10.out -> n40.atom3
n36.out -> n40.formula3
n40.out -> n29.b
n29.out -> n28.a
n7.out -> n45.assertion
n14.out -> n45.atom1
n11.out -> n47.a
n36.out -> n47.b
n16.out -> n48.a
n47.out -> n48.b
n48.out -> n45.formula1
n9.out -> n45.atom2
n21.out -> n45.formula2
n45.out -> n28.b
n28.out -> n27.a
n22.out -> n51.assertion
n14.out -> n51.atom1
n21.out -> n51.formula1
n9.out -> n51.atom2
n16.out -> n51.formula2
n10.out -> n51.atom3
n47.out -> n51.formula3
n51.out -> n27.b
n27.out -> n2.b
n2.out -> tgt.proof
```

</details>

### 80 · 合取前件引入 · 中间结论

- 目标：`⊢ ( ¬ ( P → ¬ Q ) → ( ( P → ( Q → R ) ) → ( Q → R ) ) )`
- 提示：¬(P→¬Q)→(P→Q→R)→Q→R
- 参考解：36 个模块 / 90 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n4  axiom A1
n6  atom P
n8  atom Q
n9  not
n10  imp
n11  not
n14  atom R
n15  imp
n16  imp
n21  theorem *00
n22  subst S
n36  axiom A2
n44  mp M
n45  mp M
n46  theorem *77
n47  subst S
n49  mp M
n50  mp M
n52  subst S
n55  subst S
n57  imp
n58  imp
n61  subst S
n65  mp M
n66  mp M
n67  mp M
n69  mp M
n71  subst S
n74  subst S
n76  imp
n79  subst S
n83  subst S
n88  subst S
n90  imp
n91  imp
n94  subst S

wires:
n8.out -> n9.a
n6.out -> n10.a
n9.out -> n10.b
n10.out -> n11.a
n8.out -> n15.a
n14.out -> n15.b
n6.out -> n16.a
n15.out -> n16.b
n21.out -> n22.assertion
n6.out -> n22.atom1
n16.out -> n22.formula1
n46.out -> n47.assertion
n8.out -> n47.atom1
n9.out -> n47.formula1
n47.out -> n45.a
n4.out -> n52.assertion
n8.out -> n52.atom1
n16.out -> n52.formula1
n52.out -> n50.a
n4.out -> n55.assertion
n6.out -> n55.atom1
n16.out -> n57.a
n6.out -> n57.b
n6.out -> n58.a
n57.out -> n58.b
n58.out -> n55.formula1
n8.out -> n55.atom2
n11.out -> n55.formula2
n55.out -> n50.b
n50.out -> n49.a
n36.out -> n61.assertion
n6.out -> n61.atom1
n11.out -> n61.formula1
n8.out -> n61.atom2
n6.out -> n61.formula2
n14.out -> n61.atom3
n57.out -> n61.formula3
n61.out -> n49.b
n49.out -> n45.b
n45.out -> n44.a
n21.out -> n71.assertion
n6.out -> n71.atom1
n15.out -> n71.formula1
n71.out -> n69.a
n4.out -> n74.assertion
n6.out -> n74.atom1
n15.out -> n76.a
n15.out -> n76.b
n76.out -> n74.formula1
n8.out -> n74.atom2
n6.out -> n74.formula2
n74.out -> n69.b
n69.out -> n22.a
n36.out -> n79.assertion
n8.out -> n79.atom1
n15.out -> n79.formula1
n14.out -> n79.atom2
n15.out -> n79.formula2
n79.out -> n22.b
n22.out -> n67.a
n36.out -> n83.assertion
n6.out -> n83.atom1
n16.out -> n83.formula1
n8.out -> n83.atom2
n6.out -> n83.formula2
n14.out -> n83.atom3
n15.out -> n83.formula3
n83.out -> n67.b
n67.out -> n66.a
n4.out -> n88.assertion
n6.out -> n88.atom1
n16.out -> n90.a
n15.out -> n90.b
n57.out -> n91.a
n90.out -> n91.b
n91.out -> n88.formula1
n8.out -> n88.atom2
n11.out -> n88.formula2
n88.out -> n66.b
n66.out -> n65.a
n36.out -> n94.assertion
n6.out -> n94.atom1
n11.out -> n94.formula1
n8.out -> n94.atom2
n57.out -> n94.formula2
n14.out -> n94.atom3
n90.out -> n94.formula3
n94.out -> n65.b
n65.out -> n44.b
n44.out -> tgt.proof
```

</details>

### 81 · 皮尔士律 · 中间结论

- 目标：`⊢ ( ( ( P → Q ) → P ) → ( ¬ P → ( P → Q ) ) )`
- 提示：((P→Q)→P)→¬P→P→Q
- 参考解：36 个模块 / 84 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n4  atom P
n6  atom Q
n7  imp
n8  imp
n13  mp M
n14  mp M
n15  mp M
n16  theorem *77
n17  axiom A1
n18  subst S
n20  not
n21  imp
n23  mp M
n24  mp M
n25  mp M
n26  mp M
n27  theorem *64
n29  subst S
n31  not
n32  not
n33  imp
n35  axiom A2
n36  subst S
n39  atom R
n41  subst S
n43  imp
n44  imp
n47  subst S
n51  mp M
n52  mp M
n53  theorem *v
n54  subst S
n58  subst S
n60  imp
n61  imp
n64  subst S

wires:
n4.out -> n7.a
n6.out -> n7.b
n7.out -> n8.a
n4.out -> n8.b
n16.out -> n15.a
n17.out -> n18.assertion
n4.out -> n18.atom1
n7.out -> n20.a
n20.out -> n21.a
n4.out -> n21.b
n21.out -> n18.formula1
n6.out -> n18.atom2
n8.out -> n18.formula2
n18.out -> n15.b
n15.out -> n14.a
n27.out -> n26.a
n17.out -> n29.assertion
n4.out -> n29.atom1
n4.out -> n31.a
n31.out -> n32.a
n4.out -> n33.a
n32.out -> n33.b
n33.out -> n29.formula1
n6.out -> n29.atom2
n20.out -> n29.formula2
n29.out -> n26.b
n26.out -> n25.a
n35.out -> n36.assertion
n4.out -> n36.atom1
n20.out -> n36.formula1
n6.out -> n36.atom2
n4.out -> n36.formula2
n39.out -> n36.atom3
n32.out -> n36.formula3
n36.out -> n25.b
n25.out -> n24.a
n17.out -> n41.assertion
n4.out -> n41.atom1
n20.out -> n43.a
n32.out -> n43.b
n21.out -> n44.a
n43.out -> n44.b
n44.out -> n41.formula1
n6.out -> n41.atom2
n8.out -> n41.formula2
n41.out -> n24.b
n24.out -> n23.a
n35.out -> n47.assertion
n4.out -> n47.atom1
n8.out -> n47.formula1
n6.out -> n47.atom2
n21.out -> n47.formula2
n39.out -> n47.atom3
n43.out -> n47.formula3
n47.out -> n23.b
n23.out -> n14.b
n14.out -> n13.a
n53.out -> n54.assertion
n4.out -> n54.atom1
n7.out -> n54.formula1
n6.out -> n54.atom2
n31.out -> n54.formula2
n54.out -> n52.a
n17.out -> n58.assertion
n4.out -> n58.atom1
n31.out -> n60.a
n7.out -> n60.b
n43.out -> n61.a
n60.out -> n61.b
n61.out -> n58.formula1
n6.out -> n58.atom2
n8.out -> n58.formula2
n58.out -> n52.b
n52.out -> n51.a
n35.out -> n64.assertion
n4.out -> n64.atom1
n8.out -> n64.formula1
n6.out -> n64.atom2
n43.out -> n64.formula2
n39.out -> n64.atom3
n60.out -> n64.formula3
n64.out -> n51.b
n51.out -> n13.b
n13.out -> tgt.proof
```

</details>

### 82 · 否定蕴涵分配二

- 目标：`⊢ ( ¬ ( P → Q ) → ( ¬ P → R ) )`
- 提示：¬(P→Q)→¬P→R
- 参考解：41 个模块 / 99 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n72  target
n1  mp M
n2  mp M
n3  mp M
n4  theorem *77
n5  mp M
n6  mp M
n7  axiom A1
n8  subst S
n9  atom Q
n10  atom R
n11  not
n13  subst S
n14  atom P
n16  imp
n17  imp
n20  imp
n21  not
n22  axiom A2
n23  subst S
n27  mp M
n28  mp M
n29  mp M
n30  mp M
n31  theorem *64
n33  subst S
n35  not
n36  not
n37  imp
n40  subst S
n45  subst S
n47  imp
n48  imp
n51  subst S
n55  mp M
n56  mp M
n57  theorem *v
n58  subst S
n62  subst S
n64  imp
n65  imp
n68  subst S

wires:
n4.out -> n3.a
n7.out -> n8.assertion
n9.out -> n8.atom1
n10.out -> n11.a
n11.out -> n8.formula1
n8.out -> n6.a
n7.out -> n13.assertion
n14.out -> n13.atom1
n11.out -> n16.a
n14.out -> n16.b
n14.out -> n17.a
n16.out -> n17.b
n17.out -> n13.formula1
n9.out -> n13.atom2
n14.out -> n20.a
n9.out -> n20.b
n20.out -> n21.a
n21.out -> n13.formula2
n13.out -> n6.b
n6.out -> n5.a
n22.out -> n23.assertion
n14.out -> n23.atom1
n21.out -> n23.formula1
n9.out -> n23.atom2
n14.out -> n23.formula2
n10.out -> n23.atom3
n16.out -> n23.formula3
n23.out -> n5.b
n5.out -> n3.b
n3.out -> n2.a
n31.out -> n30.a
n7.out -> n33.assertion
n14.out -> n33.atom1
n14.out -> n35.a
n35.out -> n36.a
n14.out -> n37.a
n36.out -> n37.b
n37.out -> n33.formula1
n9.out -> n33.atom2
n11.out -> n33.formula2
n33.out -> n30.b
n30.out -> n29.a
n22.out -> n40.assertion
n14.out -> n40.atom1
n11.out -> n40.formula1
n9.out -> n40.atom2
n14.out -> n40.formula2
n10.out -> n40.atom3
n36.out -> n40.formula3
n40.out -> n29.b
n29.out -> n28.a
n7.out -> n45.assertion
n14.out -> n45.atom1
n11.out -> n47.a
n36.out -> n47.b
n16.out -> n48.a
n47.out -> n48.b
n48.out -> n45.formula1
n9.out -> n45.atom2
n21.out -> n45.formula2
n45.out -> n28.b
n28.out -> n27.a
n22.out -> n51.assertion
n14.out -> n51.atom1
n21.out -> n51.formula1
n9.out -> n51.atom2
n16.out -> n51.formula2
n10.out -> n51.atom3
n47.out -> n51.formula3
n51.out -> n27.b
n27.out -> n2.b
n2.out -> n1.a
n57.out -> n58.assertion
n14.out -> n58.atom1
n10.out -> n58.formula1
n9.out -> n58.atom2
n35.out -> n58.formula2
n58.out -> n56.a
n7.out -> n62.assertion
n14.out -> n62.atom1
n35.out -> n64.a
n10.out -> n64.b
n47.out -> n65.a
n64.out -> n65.b
n65.out -> n62.formula1
n9.out -> n62.atom2
n21.out -> n62.formula2
n62.out -> n56.b
n56.out -> n55.a
n22.out -> n68.assertion
n14.out -> n68.atom1
n21.out -> n68.formula1
n9.out -> n68.atom2
n47.out -> n68.formula2
n10.out -> n68.atom3
n64.out -> n68.formula3
n68.out -> n55.b
n55.out -> n1.b
n1.out -> n72.proof
```

</details>

### 83 · 合取前件引入 · 中间结论

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( ( ¬ ( P → ¬ Q ) → ( P → ( Q → R ) ) ) → ( ¬ ( P → ¬ Q ) → ( Q → R ) ) ) )`
- 提示：(P→Q→R)→(¬(P→¬Q)→P→Q→R)→¬(P→¬Q)→Q→R
- 参考解：43 个模块 / 112 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n4  axiom A1
n6  atom P
n8  atom Q
n9  not
n10  imp
n11  not
n14  atom R
n15  imp
n16  imp
n21  theorem *00
n22  subst S
n33  imp
n36  axiom A2
n42  mp M
n43  mp M
n44  mp M
n45  mp M
n46  theorem *77
n47  subst S
n49  mp M
n50  mp M
n52  subst S
n55  subst S
n57  imp
n58  imp
n61  subst S
n65  mp M
n66  mp M
n67  mp M
n69  mp M
n71  subst S
n74  subst S
n76  imp
n79  subst S
n83  subst S
n88  subst S
n90  imp
n91  imp
n94  subst S
n99  subst S
n104  subst S
n106  imp
n107  imp

wires:
n8.out -> n9.a
n6.out -> n10.a
n9.out -> n10.b
n10.out -> n11.a
n8.out -> n15.a
n14.out -> n15.b
n6.out -> n16.a
n15.out -> n16.b
n21.out -> n22.assertion
n6.out -> n22.atom1
n16.out -> n22.formula1
n11.out -> n33.a
n16.out -> n33.b
n46.out -> n47.assertion
n8.out -> n47.atom1
n9.out -> n47.formula1
n47.out -> n45.a
n4.out -> n52.assertion
n8.out -> n52.atom1
n16.out -> n52.formula1
n52.out -> n50.a
n4.out -> n55.assertion
n6.out -> n55.atom1
n16.out -> n57.a
n6.out -> n57.b
n6.out -> n58.a
n57.out -> n58.b
n58.out -> n55.formula1
n8.out -> n55.atom2
n11.out -> n55.formula2
n55.out -> n50.b
n50.out -> n49.a
n36.out -> n61.assertion
n6.out -> n61.atom1
n11.out -> n61.formula1
n8.out -> n61.atom2
n6.out -> n61.formula2
n14.out -> n61.atom3
n57.out -> n61.formula3
n61.out -> n49.b
n49.out -> n45.b
n45.out -> n44.a
n21.out -> n71.assertion
n6.out -> n71.atom1
n15.out -> n71.formula1
n71.out -> n69.a
n4.out -> n74.assertion
n6.out -> n74.atom1
n15.out -> n76.a
n15.out -> n76.b
n76.out -> n74.formula1
n8.out -> n74.atom2
n6.out -> n74.formula2
n74.out -> n69.b
n69.out -> n22.a
n36.out -> n79.assertion
n8.out -> n79.atom1
n15.out -> n79.formula1
n14.out -> n79.atom2
n15.out -> n79.formula2
n79.out -> n22.b
n22.out -> n67.a
n36.out -> n83.assertion
n6.out -> n83.atom1
n16.out -> n83.formula1
n8.out -> n83.atom2
n6.out -> n83.formula2
n14.out -> n83.atom3
n15.out -> n83.formula3
n83.out -> n67.b
n67.out -> n66.a
n4.out -> n88.assertion
n6.out -> n88.atom1
n16.out -> n90.a
n15.out -> n90.b
n57.out -> n91.a
n90.out -> n91.b
n91.out -> n88.formula1
n8.out -> n88.atom2
n11.out -> n88.formula2
n88.out -> n66.b
n66.out -> n65.a
n36.out -> n94.assertion
n6.out -> n94.atom1
n11.out -> n94.formula1
n8.out -> n94.atom2
n57.out -> n94.formula2
n14.out -> n94.atom3
n90.out -> n94.formula3
n94.out -> n65.b
n65.out -> n44.b
n44.out -> n43.a
n36.out -> n99.assertion
n6.out -> n99.atom1
n11.out -> n99.formula1
n8.out -> n99.atom2
n16.out -> n99.formula2
n14.out -> n99.atom3
n15.out -> n99.formula3
n99.out -> n43.b
n43.out -> n42.a
n4.out -> n104.assertion
n6.out -> n104.atom1
n11.out -> n106.a
n15.out -> n106.b
n33.out -> n107.a
n106.out -> n107.b
n107.out -> n104.formula1
n8.out -> n104.atom2
n16.out -> n104.formula2
n104.out -> n42.b
n42.out -> tgt.proof
```

</details>

### 84 · 先否后件

- 目标：`⊢ ( P → ( ¬ Q → ¬ ( P → Q ) ) )`
- 提示：P→¬Q→¬(P→Q)
- 参考解：46 个模块 / 108 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n128  target
n1  mp M
n2  mp M
n3  mp M
n8  axiom A1
n9  subst S
n10  atom Q
n11  atom P
n13  imp
n14  not
n15  not
n19  imp
n22  axiom A2
n25  atom R
n26  mp M
n27  mp M
n28  mp M
n31  theorem *19
n32  subst S
n70  subst S
n75  subst S
n77  imp
n78  imp
n81  subst S
n84  mp M
n85  mp M
n86  mp M
n87  mp M
n88  theorem *64
n89  subst S
n92  subst S
n94  not
n95  not
n96  imp
n99  subst S
n103  subst S
n105  imp
n106  imp
n109  subst S
n112  mp M
n113  mp M
n114  theorem *v
n115  subst S
n119  subst S
n121  imp
n122  imp
n125  subst S

wires:
n8.out -> n9.assertion
n10.out -> n9.atom1
n11.out -> n13.a
n10.out -> n13.b
n13.out -> n14.a
n14.out -> n15.a
n15.out -> n9.formula1
n15.out -> n19.a
n11.out -> n19.b
n9.out -> n3.a
n31.out -> n32.assertion
n11.out -> n32.atom1
n13.out -> n32.formula1
n32.out -> n28.a
n22.out -> n70.assertion
n11.out -> n70.atom1
n15.out -> n70.formula1
n10.out -> n70.atom2
n11.out -> n70.formula2
n25.out -> n70.atom3
n10.out -> n70.formula3
n70.out -> n28.b
n28.out -> n27.a
n8.out -> n75.assertion
n11.out -> n75.atom1
n15.out -> n77.a
n10.out -> n77.b
n19.out -> n78.a
n77.out -> n78.b
n78.out -> n75.formula1
n10.out -> n75.atom2
n11.out -> n75.formula2
n75.out -> n27.b
n27.out -> n26.a
n22.out -> n81.assertion
n10.out -> n81.atom1
n19.out -> n81.formula1
n25.out -> n81.atom2
n77.out -> n81.formula2
n81.out -> n26.b
n26.out -> n3.b
n3.out -> n2.a
n88.out -> n89.assertion
n11.out -> n89.atom1
n10.out -> n89.formula1
n89.out -> n87.a
n8.out -> n92.assertion
n11.out -> n92.atom1
n10.out -> n94.a
n94.out -> n95.a
n10.out -> n96.a
n95.out -> n96.b
n96.out -> n92.formula1
n10.out -> n92.atom2
n15.out -> n92.formula2
n92.out -> n87.b
n87.out -> n86.a
n22.out -> n99.assertion
n11.out -> n99.atom1
n15.out -> n99.formula1
n25.out -> n99.atom2
n95.out -> n99.formula2
n99.out -> n86.b
n86.out -> n85.a
n8.out -> n103.assertion
n11.out -> n103.atom1
n15.out -> n105.a
n95.out -> n105.b
n77.out -> n106.a
n105.out -> n106.b
n106.out -> n103.formula1
n10.out -> n103.atom2
n11.out -> n103.formula2
n103.out -> n85.b
n85.out -> n84.a
n22.out -> n109.assertion
n10.out -> n109.atom1
n77.out -> n109.formula1
n25.out -> n109.atom2
n105.out -> n109.formula2
n109.out -> n84.b
n84.out -> n2.b
n2.out -> n1.a
n114.out -> n115.assertion
n11.out -> n115.atom1
n14.out -> n115.formula1
n10.out -> n115.atom2
n94.out -> n115.formula2
n115.out -> n113.a
n8.out -> n119.assertion
n11.out -> n119.atom1
n94.out -> n121.a
n14.out -> n121.b
n105.out -> n122.a
n121.out -> n122.b
n122.out -> n119.formula1
n10.out -> n119.atom2
n11.out -> n119.formula2
n119.out -> n113.b
n113.out -> n112.a
n22.out -> n125.assertion
n10.out -> n125.atom1
n105.out -> n125.formula1
n25.out -> n125.atom2
n121.out -> n125.formula2
n125.out -> n112.b
n112.out -> n1.b
n1.out -> n128.proof
```

</details>

### 85 · 否定后件换位

- 目标：`⊢ ( ( P → ¬ Q ) → ( Q → ¬ P ) )`
- 提示：(P→¬Q)→Q→¬P
- 参考解：49 个模块 / 128 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n103  target
n1  mp M
n2  mp M
n4  theorem *00
n5  subst S
n6  atom P
n8  atom Q
n9  not
n10  imp
n13  axiom A1
n14  subst S
n17  not
n18  not
n22  imp
n25  axiom A2
n29  atom R
n30  mp M
n31  mp M
n32  mp M
n33  mp M
n34  mp M
n35  theorem *19
n36  mp M
n37  mp M
n39  subst S
n42  subst S
n44  imp
n45  imp
n48  subst S
n52  mp M
n53  mp M
n54  mp M
n56  subst S
n61  subst S
n63  imp
n64  imp
n67  subst S
n72  subst S
n77  subst S
n79  imp
n80  imp
n83  subst S
n87  mp M
n88  mp M
n89  theorem *v
n90  subst S
n93  subst S
n95  imp
n96  imp
n99  subst S

wires:
n4.out -> n5.assertion
n6.out -> n5.atom1
n8.out -> n9.a
n6.out -> n10.a
n9.out -> n10.b
n10.out -> n5.formula1
n13.out -> n14.assertion
n6.out -> n14.atom1
n10.out -> n14.formula1
n8.out -> n14.atom2
n6.out -> n17.a
n17.out -> n18.a
n18.out -> n14.formula2
n18.out -> n22.a
n10.out -> n22.b
n14.out -> n2.a
n35.out -> n34.a
n13.out -> n39.assertion
n8.out -> n39.atom1
n10.out -> n39.formula1
n39.out -> n37.a
n13.out -> n42.assertion
n6.out -> n42.atom1
n10.out -> n44.a
n6.out -> n44.b
n6.out -> n45.a
n44.out -> n45.b
n45.out -> n42.formula1
n8.out -> n42.atom2
n18.out -> n42.formula2
n42.out -> n37.b
n37.out -> n36.a
n25.out -> n48.assertion
n6.out -> n48.atom1
n18.out -> n48.formula1
n8.out -> n48.atom2
n6.out -> n48.formula2
n29.out -> n48.atom3
n44.out -> n48.formula3
n48.out -> n36.b
n36.out -> n34.b
n34.out -> n33.a
n5.out -> n54.a
n25.out -> n56.assertion
n6.out -> n56.atom1
n10.out -> n56.formula1
n8.out -> n56.atom2
n6.out -> n56.formula2
n29.out -> n56.atom3
n9.out -> n56.formula3
n56.out -> n54.b
n54.out -> n53.a
n13.out -> n61.assertion
n6.out -> n61.atom1
n10.out -> n63.a
n9.out -> n63.b
n44.out -> n64.a
n63.out -> n64.b
n64.out -> n61.formula1
n8.out -> n61.atom2
n18.out -> n61.formula2
n61.out -> n53.b
n53.out -> n52.a
n25.out -> n67.assertion
n6.out -> n67.atom1
n18.out -> n67.formula1
n8.out -> n67.atom2
n44.out -> n67.formula2
n29.out -> n67.atom3
n63.out -> n67.formula3
n67.out -> n52.b
n52.out -> n33.b
n33.out -> n32.a
n25.out -> n72.assertion
n6.out -> n72.atom1
n18.out -> n72.formula1
n8.out -> n72.atom2
n10.out -> n72.formula2
n29.out -> n72.atom3
n9.out -> n72.formula3
n72.out -> n32.b
n32.out -> n31.a
n13.out -> n77.assertion
n6.out -> n77.atom1
n18.out -> n79.a
n9.out -> n79.b
n22.out -> n80.a
n79.out -> n80.b
n80.out -> n77.formula1
n8.out -> n77.atom2
n10.out -> n77.formula2
n77.out -> n31.b
n31.out -> n30.a
n25.out -> n83.assertion
n6.out -> n83.atom1
n10.out -> n83.formula1
n8.out -> n83.atom2
n22.out -> n83.formula2
n29.out -> n83.atom3
n79.out -> n83.formula3
n83.out -> n30.b
n30.out -> n2.b
n2.out -> n1.a
n89.out -> n90.assertion
n6.out -> n90.atom1
n17.out -> n90.formula1
n90.out -> n88.a
n13.out -> n93.assertion
n6.out -> n93.atom1
n8.out -> n95.a
n17.out -> n95.b
n79.out -> n96.a
n95.out -> n96.b
n96.out -> n93.formula1
n8.out -> n93.atom2
n10.out -> n93.formula2
n93.out -> n88.b
n88.out -> n87.a
n25.out -> n99.assertion
n6.out -> n99.atom1
n10.out -> n99.formula1
n8.out -> n99.atom2
n79.out -> n99.formula2
n29.out -> n99.atom3
n95.out -> n99.formula3
n99.out -> n87.b
n87.out -> n1.b
n1.out -> n103.proof
```

</details>

### 86 · 合取前件导出

- 目标：`⊢ ( ( ¬ ( P → ¬ Q ) → R ) → ( P → ( Q → R ) ) )`
- 提示：(¬(P→¬Q)→R)→P→Q→R
- 参考解：62 个模块 / 167 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n129  target
n1  mp M
n3  theorem *00
n4  subst S
n5  atom P
n7  atom Q
n8  not
n9  imp
n10  not
n11  atom R
n12  imp
n15  axiom A1
n16  subst S
n22  imp
n25  axiom A2
n30  mp M
n31  mp M
n32  mp M
n33  mp M
n34  mp M
n35  theorem *44
n36  mp M
n37  mp M
n39  subst S
n41  imp
n44  subst S
n46  imp
n47  imp
n50  subst S
n53  mp M
n54  mp M
n55  mp M
n56  mp M
n58  subst S
n60  imp
n62  mp M
n63  mp M
n64  mp M
n65  mp M
n66  theorem *05
n67  subst S
n72  subst S
n74  imp
n75  imp
n76  imp
n79  subst S
n84  subst S
n86  imp
n89  subst S
n92  mp M
n93  mp M
n95  subst S
n100  subst S
n102  imp
n103  imp
n104  imp
n107  subst S
n111  subst S
n115  subst S
n119  subst S
n121  imp
n122  imp
n125  subst S

wires:
n3.out -> n4.assertion
n5.out -> n4.atom1
n7.out -> n8.a
n5.out -> n9.a
n8.out -> n9.b
n9.out -> n10.a
n10.out -> n12.a
n11.out -> n12.b
n12.out -> n4.formula1
n15.out -> n16.assertion
n5.out -> n16.atom1
n12.out -> n16.formula1
n7.out -> n16.atom2
n5.out -> n16.formula2
n5.out -> n22.a
n12.out -> n22.b
n16.out -> n1.a
n35.out -> n34.a
n15.out -> n39.assertion
n5.out -> n39.atom1
n7.out -> n41.a
n10.out -> n41.b
n41.out -> n39.formula1
n7.out -> n39.atom2
n12.out -> n39.formula2
n39.out -> n37.a
n15.out -> n44.assertion
n5.out -> n44.atom1
n12.out -> n46.a
n41.out -> n46.b
n41.out -> n47.a
n46.out -> n47.b
n47.out -> n44.formula1
n7.out -> n44.atom2
n5.out -> n44.formula2
n44.out -> n37.b
n37.out -> n36.a
n25.out -> n50.assertion
n7.out -> n50.atom1
n41.out -> n50.formula1
n11.out -> n50.atom2
n46.out -> n50.formula2
n50.out -> n36.b
n36.out -> n34.b
n34.out -> n33.a
n4.out -> n56.a
n15.out -> n58.assertion
n5.out -> n58.atom1
n12.out -> n60.a
n12.out -> n60.b
n60.out -> n58.formula1
n7.out -> n58.atom2
n5.out -> n58.formula2
n58.out -> n56.b
n56.out -> n55.a
n66.out -> n67.assertion
n5.out -> n67.atom1
n10.out -> n67.formula1
n7.out -> n67.atom2
n11.out -> n67.formula2
n11.out -> n67.atom3
n7.out -> n67.formula3
n67.out -> n65.a
n15.out -> n72.assertion
n5.out -> n72.atom1
n7.out -> n74.a
n11.out -> n74.b
n41.out -> n75.a
n74.out -> n75.b
n12.out -> n76.a
n75.out -> n76.b
n76.out -> n72.formula1
n7.out -> n72.atom2
n12.out -> n72.formula2
n72.out -> n65.b
n65.out -> n64.a
n25.out -> n79.assertion
n5.out -> n79.atom1
n12.out -> n79.formula1
n7.out -> n79.atom2
n12.out -> n79.formula2
n11.out -> n79.atom3
n75.out -> n79.formula3
n79.out -> n64.b
n64.out -> n63.a
n15.out -> n84.assertion
n5.out -> n84.atom1
n60.out -> n86.a
n76.out -> n86.b
n86.out -> n84.formula1
n7.out -> n84.atom2
n5.out -> n84.formula2
n84.out -> n63.b
n63.out -> n62.a
n25.out -> n89.assertion
n7.out -> n89.atom1
n60.out -> n89.formula1
n11.out -> n89.atom2
n76.out -> n89.formula2
n89.out -> n62.b
n62.out -> n55.b
n55.out -> n54.a
n25.out -> n95.assertion
n5.out -> n95.atom1
n12.out -> n95.formula1
n7.out -> n95.atom2
n41.out -> n95.formula2
n11.out -> n95.atom3
n74.out -> n95.formula3
n95.out -> n93.a
n15.out -> n100.assertion
n5.out -> n100.atom1
n12.out -> n102.a
n74.out -> n102.b
n46.out -> n103.a
n102.out -> n103.b
n76.out -> n104.a
n103.out -> n104.b
n104.out -> n100.formula1
n7.out -> n100.atom2
n5.out -> n100.formula2
n100.out -> n93.b
n93.out -> n92.a
n25.out -> n107.assertion
n7.out -> n107.atom1
n76.out -> n107.formula1
n11.out -> n107.atom2
n103.out -> n107.formula2
n107.out -> n92.b
n92.out -> n54.b
n54.out -> n53.a
n25.out -> n111.assertion
n7.out -> n111.atom1
n46.out -> n111.formula1
n11.out -> n111.atom2
n102.out -> n111.formula2
n111.out -> n53.b
n53.out -> n33.b
n33.out -> n32.a
n25.out -> n115.assertion
n7.out -> n115.atom1
n12.out -> n115.formula1
n11.out -> n115.atom2
n74.out -> n115.formula2
n115.out -> n32.b
n32.out -> n31.a
n15.out -> n119.assertion
n5.out -> n119.atom1
n5.out -> n121.a
n74.out -> n121.b
n22.out -> n122.a
n121.out -> n122.b
n122.out -> n119.formula1
n7.out -> n119.atom2
n12.out -> n119.formula2
n119.out -> n31.b
n31.out -> n30.a
n25.out -> n125.assertion
n5.out -> n125.atom1
n12.out -> n125.formula1
n7.out -> n125.atom2
n22.out -> n125.formula2
n11.out -> n125.atom3
n121.out -> n125.formula3
n125.out -> n30.b
n30.out -> n1.b
n1.out -> n129.proof
```

</details>

### 87 · 合取前件引入

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( ¬ ( P → ¬ Q ) → R ) )`
- 提示：(P→Q→R)→¬(P→¬Q)→R
- 参考解：63 个模块 / 175 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n136  target
n1  mp M
n2  mp M
n3  theorem *76
n4  axiom A1
n5  subst S
n6  atom P
n8  atom Q
n9  not
n10  imp
n11  not
n12  imp
n14  atom R
n15  imp
n16  imp
n17  mp M
n18  mp M
n19  mp M
n21  theorem *00
n22  subst S
n27  subst S
n33  imp
n36  axiom A2
n41  mp M
n42  mp M
n43  mp M
n44  mp M
n45  mp M
n46  theorem *77
n47  subst S
n49  mp M
n50  mp M
n52  subst S
n55  subst S
n57  imp
n58  imp
n61  subst S
n65  mp M
n66  mp M
n67  mp M
n69  mp M
n71  subst S
n74  subst S
n76  imp
n79  subst S
n83  subst S
n88  subst S
n90  imp
n91  imp
n94  subst S
n99  subst S
n104  subst S
n106  imp
n107  imp
n110  subst S
n114  mp M
n115  mp M
n117  subst S
n120  subst S
n122  imp
n123  imp
n124  imp
n127  subst S
n132  subst S

wires:
n3.out -> n2.a
n4.out -> n5.assertion
n6.out -> n5.atom1
n8.out -> n9.a
n6.out -> n10.a
n9.out -> n10.b
n10.out -> n11.a
n11.out -> n12.a
n8.out -> n12.b
n12.out -> n5.formula1
n8.out -> n5.atom2
n8.out -> n15.a
n14.out -> n15.b
n6.out -> n16.a
n15.out -> n16.b
n16.out -> n5.formula2
n5.out -> n2.b
n2.out -> n1.a
n21.out -> n22.assertion
n6.out -> n22.atom1
n16.out -> n22.formula1
n4.out -> n27.assertion
n6.out -> n27.atom1
n16.out -> n27.formula1
n8.out -> n27.atom2
n11.out -> n27.formula2
n11.out -> n33.a
n16.out -> n33.b
n27.out -> n19.a
n46.out -> n47.assertion
n8.out -> n47.atom1
n9.out -> n47.formula1
n47.out -> n45.a
n4.out -> n52.assertion
n8.out -> n52.atom1
n16.out -> n52.formula1
n52.out -> n50.a
n4.out -> n55.assertion
n6.out -> n55.atom1
n16.out -> n57.a
n6.out -> n57.b
n6.out -> n58.a
n57.out -> n58.b
n58.out -> n55.formula1
n8.out -> n55.atom2
n11.out -> n55.formula2
n55.out -> n50.b
n50.out -> n49.a
n36.out -> n61.assertion
n6.out -> n61.atom1
n11.out -> n61.formula1
n8.out -> n61.atom2
n6.out -> n61.formula2
n14.out -> n61.atom3
n57.out -> n61.formula3
n61.out -> n49.b
n49.out -> n45.b
n45.out -> n44.a
n21.out -> n71.assertion
n6.out -> n71.atom1
n15.out -> n71.formula1
n71.out -> n69.a
n4.out -> n74.assertion
n6.out -> n74.atom1
n15.out -> n76.a
n15.out -> n76.b
n76.out -> n74.formula1
n8.out -> n74.atom2
n6.out -> n74.formula2
n74.out -> n69.b
n69.out -> n22.a
n36.out -> n79.assertion
n8.out -> n79.atom1
n15.out -> n79.formula1
n14.out -> n79.atom2
n15.out -> n79.formula2
n79.out -> n22.b
n22.out -> n67.a
n36.out -> n83.assertion
n6.out -> n83.atom1
n16.out -> n83.formula1
n8.out -> n83.atom2
n6.out -> n83.formula2
n14.out -> n83.atom3
n15.out -> n83.formula3
n83.out -> n67.b
n67.out -> n66.a
n4.out -> n88.assertion
n6.out -> n88.atom1
n16.out -> n90.a
n15.out -> n90.b
n57.out -> n91.a
n90.out -> n91.b
n91.out -> n88.formula1
n8.out -> n88.atom2
n11.out -> n88.formula2
n88.out -> n66.b
n66.out -> n65.a
n36.out -> n94.assertion
n6.out -> n94.atom1
n11.out -> n94.formula1
n8.out -> n94.atom2
n57.out -> n94.formula2
n14.out -> n94.atom3
n90.out -> n94.formula3
n94.out -> n65.b
n65.out -> n44.b
n44.out -> n43.a
n36.out -> n99.assertion
n6.out -> n99.atom1
n11.out -> n99.formula1
n8.out -> n99.atom2
n16.out -> n99.formula2
n14.out -> n99.atom3
n15.out -> n99.formula3
n99.out -> n43.b
n43.out -> n42.a
n4.out -> n104.assertion
n6.out -> n104.atom1
n11.out -> n106.a
n15.out -> n106.b
n33.out -> n107.a
n106.out -> n107.b
n107.out -> n104.formula1
n8.out -> n104.atom2
n16.out -> n104.formula2
n104.out -> n42.b
n42.out -> n41.a
n36.out -> n110.assertion
n6.out -> n110.atom1
n16.out -> n110.formula1
n8.out -> n110.atom2
n33.out -> n110.formula2
n14.out -> n110.atom3
n106.out -> n110.formula3
n110.out -> n41.b
n41.out -> n19.b
n19.out -> n18.a
n36.out -> n117.assertion
n6.out -> n117.atom1
n11.out -> n117.formula1
n117.out -> n115.a
n4.out -> n120.assertion
n6.out -> n120.atom1
n11.out -> n122.a
n14.out -> n122.b
n12.out -> n123.a
n122.out -> n123.b
n106.out -> n124.a
n123.out -> n124.b
n124.out -> n120.formula1
n8.out -> n120.atom2
n16.out -> n120.formula2
n120.out -> n115.b
n115.out -> n114.a
n36.out -> n127.assertion
n6.out -> n127.atom1
n16.out -> n127.formula1
n8.out -> n127.atom2
n106.out -> n127.formula2
n14.out -> n127.atom3
n123.out -> n127.formula3
n127.out -> n114.b
n114.out -> n18.b
n18.out -> n17.a
n36.out -> n132.assertion
n6.out -> n132.atom1
n16.out -> n132.formula1
n8.out -> n132.atom2
n12.out -> n132.formula2
n14.out -> n132.atom3
n122.out -> n132.formula3
n132.out -> n17.b
n17.out -> n1.b
n1.out -> n136.proof
```

</details>

### 88 · 逆否

- 目标：`⊢ ( ( P → Q ) → ( ¬ Q → ¬ P ) )`
- 提示：(P→Q)→¬Q→¬P
- 参考解：64 个模块 / 172 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n133  target
n1  mp M
n2  mp M
n3  mp M
n5  theorem *00
n6  subst S
n7  atom P
n9  atom Q
n10  imp
n13  axiom A1
n14  subst S
n17  not
n18  not
n22  imp
n25  axiom A2
n29  atom R
n30  mp M
n31  mp M
n32  mp M
n33  mp M
n34  mp M
n35  theorem *19
n36  mp M
n37  mp M
n39  subst S
n42  subst S
n44  imp
n45  imp
n48  subst S
n52  mp M
n53  mp M
n54  mp M
n56  subst S
n61  subst S
n63  imp
n64  imp
n67  subst S
n72  subst S
n77  subst S
n79  imp
n80  imp
n83  subst S
n87  mp M
n88  mp M
n89  mp M
n90  mp M
n91  theorem *64
n92  subst S
n95  subst S
n97  not
n98  not
n99  imp
n102  subst S
n106  subst S
n108  imp
n109  imp
n112  subst S
n116  mp M
n117  mp M
n118  theorem *v
n119  subst S
n123  subst S
n125  imp
n126  imp
n129  subst S

wires:
n5.out -> n6.assertion
n7.out -> n6.atom1
n7.out -> n10.a
n9.out -> n10.b
n10.out -> n6.formula1
n13.out -> n14.assertion
n7.out -> n14.atom1
n10.out -> n14.formula1
n9.out -> n14.atom2
n7.out -> n17.a
n17.out -> n18.a
n18.out -> n14.formula2
n18.out -> n22.a
n10.out -> n22.b
n14.out -> n3.a
n35.out -> n34.a
n13.out -> n39.assertion
n9.out -> n39.atom1
n10.out -> n39.formula1
n39.out -> n37.a
n13.out -> n42.assertion
n7.out -> n42.atom1
n10.out -> n44.a
n7.out -> n44.b
n7.out -> n45.a
n44.out -> n45.b
n45.out -> n42.formula1
n9.out -> n42.atom2
n18.out -> n42.formula2
n42.out -> n37.b
n37.out -> n36.a
n25.out -> n48.assertion
n7.out -> n48.atom1
n18.out -> n48.formula1
n9.out -> n48.atom2
n7.out -> n48.formula2
n29.out -> n48.atom3
n44.out -> n48.formula3
n48.out -> n36.b
n36.out -> n34.b
n34.out -> n33.a
n6.out -> n54.a
n25.out -> n56.assertion
n7.out -> n56.atom1
n10.out -> n56.formula1
n9.out -> n56.atom2
n7.out -> n56.formula2
n29.out -> n56.atom3
n9.out -> n56.formula3
n56.out -> n54.b
n54.out -> n53.a
n13.out -> n61.assertion
n7.out -> n61.atom1
n10.out -> n63.a
n9.out -> n63.b
n44.out -> n64.a
n63.out -> n64.b
n64.out -> n61.formula1
n9.out -> n61.atom2
n18.out -> n61.formula2
n61.out -> n53.b
n53.out -> n52.a
n25.out -> n67.assertion
n7.out -> n67.atom1
n18.out -> n67.formula1
n9.out -> n67.atom2
n44.out -> n67.formula2
n29.out -> n67.atom3
n63.out -> n67.formula3
n67.out -> n52.b
n52.out -> n33.b
n33.out -> n32.a
n25.out -> n72.assertion
n7.out -> n72.atom1
n18.out -> n72.formula1
n9.out -> n72.atom2
n10.out -> n72.formula2
n29.out -> n72.atom3
n9.out -> n72.formula3
n72.out -> n32.b
n32.out -> n31.a
n13.out -> n77.assertion
n7.out -> n77.atom1
n18.out -> n79.a
n9.out -> n79.b
n22.out -> n80.a
n79.out -> n80.b
n80.out -> n77.formula1
n9.out -> n77.atom2
n10.out -> n77.formula2
n77.out -> n31.b
n31.out -> n30.a
n25.out -> n83.assertion
n7.out -> n83.atom1
n10.out -> n83.formula1
n9.out -> n83.atom2
n22.out -> n83.formula2
n29.out -> n83.atom3
n79.out -> n83.formula3
n83.out -> n30.b
n30.out -> n3.b
n3.out -> n2.a
n91.out -> n92.assertion
n7.out -> n92.atom1
n9.out -> n92.formula1
n92.out -> n90.a
n13.out -> n95.assertion
n7.out -> n95.atom1
n9.out -> n97.a
n97.out -> n98.a
n9.out -> n99.a
n98.out -> n99.b
n99.out -> n95.formula1
n9.out -> n95.atom2
n18.out -> n95.formula2
n95.out -> n90.b
n90.out -> n89.a
n25.out -> n102.assertion
n7.out -> n102.atom1
n18.out -> n102.formula1
n29.out -> n102.atom2
n98.out -> n102.formula2
n102.out -> n89.b
n89.out -> n88.a
n13.out -> n106.assertion
n7.out -> n106.atom1
n18.out -> n108.a
n98.out -> n108.b
n79.out -> n109.a
n108.out -> n109.b
n109.out -> n106.formula1
n9.out -> n106.atom2
n10.out -> n106.formula2
n106.out -> n88.b
n88.out -> n87.a
n25.out -> n112.assertion
n7.out -> n112.atom1
n10.out -> n112.formula1
n9.out -> n112.atom2
n79.out -> n112.formula2
n29.out -> n112.atom3
n108.out -> n112.formula3
n112.out -> n87.b
n87.out -> n2.b
n2.out -> n1.a
n118.out -> n119.assertion
n7.out -> n119.atom1
n17.out -> n119.formula1
n9.out -> n119.atom2
n97.out -> n119.formula2
n119.out -> n117.a
n13.out -> n123.assertion
n7.out -> n123.atom1
n97.out -> n125.a
n17.out -> n125.b
n108.out -> n126.a
n125.out -> n126.b
n126.out -> n123.formula1
n9.out -> n123.atom2
n10.out -> n123.formula2
n123.out -> n117.b
n117.out -> n116.a
n25.out -> n129.assertion
n7.out -> n129.atom1
n10.out -> n129.formula1
n9.out -> n129.atom2
n108.out -> n129.formula2
n29.out -> n129.atom3
n125.out -> n129.formula3
n129.out -> n116.b
n116.out -> n1.b
n1.out -> n133.proof
```

</details>

### 89 · 矛盾消去 · 中间结论

- 目标：`⊢ ( ( P → ¬ Q ) → ( P → ( ( P → Q ) → ¬ P ) ) )`
- 提示：(P→¬Q)→P→(P→Q)→¬P
- 参考解：25 个模块 / 59 条接线

<details><summary>展开参考电路</summary>

```text
modules:
tgt  target
n5  atom P
n7  atom Q
n8  imp
n11  axiom A1
n15  not
n23  axiom A2
n27  atom R
n47  not
n57  imp
n140  mp M
n141  mp M
n142  mp M
n150  subst S
n156  imp
n164  mp M
n165  mp M
n166  mp M
n167  theorem *88
n169  subst S
n174  subst S
n176  imp
n179  subst S
n184  subst S
n186  imp
n189  subst S

wires:
n5.out -> n8.a
n7.out -> n8.b
n7.out -> n15.a
n5.out -> n47.a
n8.out -> n57.a
n47.out -> n57.b
n11.out -> n150.assertion
n5.out -> n150.atom1
n15.out -> n150.formula1
n7.out -> n150.atom2
n8.out -> n150.formula2
n8.out -> n156.a
n15.out -> n156.b
n150.out -> n142.a
n167.out -> n166.a
n23.out -> n169.assertion
n5.out -> n169.atom1
n8.out -> n169.formula1
n7.out -> n169.atom2
n15.out -> n169.formula2
n27.out -> n169.atom3
n47.out -> n169.formula3
n169.out -> n166.b
n166.out -> n165.a
n11.out -> n174.assertion
n5.out -> n174.atom1
n156.out -> n176.a
n57.out -> n176.b
n176.out -> n174.formula1
n7.out -> n174.atom2
n15.out -> n174.formula2
n174.out -> n165.b
n165.out -> n164.a
n23.out -> n179.assertion
n5.out -> n179.atom1
n15.out -> n179.formula1
n7.out -> n179.atom2
n156.out -> n179.formula2
n27.out -> n179.atom3
n57.out -> n179.formula3
n179.out -> n164.b
n164.out -> n142.b
n142.out -> n141.a
n11.out -> n184.assertion
n5.out -> n184.atom1
n15.out -> n186.a
n57.out -> n186.b
n186.out -> n184.formula1
n7.out -> n184.atom2
n5.out -> n184.formula2
n184.out -> n141.b
n141.out -> n140.a
n23.out -> n189.assertion
n7.out -> n189.atom1
n15.out -> n189.formula1
n27.out -> n189.atom2
n57.out -> n189.formula2
n189.out -> n140.b
n140.out -> tgt.proof
```

</details>

### 90 · 矛盾推出否定

- 目标：`⊢ ( ( P → ¬ P ) → ¬ P )`
- 提示：(P→¬P)→¬P
- 参考解：77 个模块 / 225 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n168  target
n1  mp M
n2  theorem *00
n3  subst S
n4  atom P
n6  not
n7  imp
n8  mp M
n9  mp M
n10  mp M
n11  mp M
n12  mp M
n13  mp M
n14  mp M
n16  subst S
n18  axiom A1
n19  subst S
n21  imp
n22  atom Q
n23  mp M
n24  mp M
n25  mp M
n26  mp M
n27  theorem *64
n28  subst S
n31  subst S
n33  not
n34  not
n35  imp
n37  axiom A2
n38  subst S
n41  atom R
n43  subst S
n45  imp
n48  subst S
n52  mp M
n53  mp M
n54  theorem *v
n55  subst S
n58  subst S
n60  imp
n61  imp
n64  subst S
n68  mp M
n69  mp M
n72  mp M
n74  subst S
n78  subst S
n84  subst S
n90  imp
n98  mp M
n99  mp M
n101  subst S
n106  subst S
n108  imp
n109  imp
n110  imp
n113  subst S
n118  subst S
n122  mp M
n123  mp M
n124  mp M
n125  theorem *04
n126  subst S
n129  not
n131  subst S
n136  subst S
n138  imp
n139  imp
n142  subst S
n146  mp M
n147  mp M
n149  subst S
n153  subst S
n155  imp
n156  imp
n159  subst S
n164  subst S

wires:
n2.out -> n3.assertion
n4.out -> n3.atom1
n4.out -> n6.a
n4.out -> n7.a
n6.out -> n7.b
n7.out -> n3.formula1
n3.out -> n1.a
n2.out -> n16.assertion
n4.out -> n16.atom1
n6.out -> n16.formula1
n16.out -> n14.a
n18.out -> n19.assertion
n4.out -> n19.atom1
n6.out -> n21.a
n6.out -> n21.b
n21.out -> n19.formula1
n22.out -> n19.atom2
n7.out -> n19.formula2
n19.out -> n14.b
n14.out -> n13.a
n27.out -> n28.assertion
n4.out -> n28.atom1
n6.out -> n28.formula1
n28.out -> n26.a
n18.out -> n31.assertion
n4.out -> n31.atom1
n6.out -> n33.a
n33.out -> n34.a
n6.out -> n35.a
n34.out -> n35.b
n35.out -> n31.formula1
n22.out -> n31.atom2
n6.out -> n31.formula2
n31.out -> n26.b
n26.out -> n25.a
n37.out -> n38.assertion
n4.out -> n38.atom1
n6.out -> n38.formula1
n22.out -> n38.atom2
n6.out -> n38.formula2
n41.out -> n38.atom3
n34.out -> n38.formula3
n38.out -> n25.b
n25.out -> n24.a
n18.out -> n43.assertion
n4.out -> n43.atom1
n21.out -> n45.a
n35.out -> n45.b
n45.out -> n43.formula1
n22.out -> n43.atom2
n7.out -> n43.formula2
n43.out -> n24.b
n24.out -> n23.a
n37.out -> n48.assertion
n4.out -> n48.atom1
n7.out -> n48.formula1
n22.out -> n48.atom2
n21.out -> n48.formula2
n41.out -> n48.atom3
n35.out -> n48.formula3
n48.out -> n23.b
n23.out -> n13.b
n13.out -> n12.a
n54.out -> n55.assertion
n22.out -> n55.atom1
n33.out -> n55.formula1
n55.out -> n53.a
n18.out -> n58.assertion
n4.out -> n58.atom1
n33.out -> n60.a
n4.out -> n60.b
n35.out -> n61.a
n60.out -> n61.b
n61.out -> n58.formula1
n22.out -> n58.atom2
n7.out -> n58.formula2
n58.out -> n53.b
n53.out -> n52.a
n37.out -> n64.assertion
n4.out -> n64.atom1
n7.out -> n64.formula1
n22.out -> n64.atom2
n35.out -> n64.formula2
n41.out -> n64.atom3
n60.out -> n64.formula3
n64.out -> n52.b
n52.out -> n12.b
n12.out -> n11.a
n16.out -> n72.a
n18.out -> n74.assertion
n4.out -> n74.atom1
n21.out -> n74.formula1
n22.out -> n74.atom2
n4.out -> n74.formula2
n74.out -> n72.b
n72.out -> n3.a
n37.out -> n78.assertion
n22.out -> n78.atom1
n6.out -> n78.formula1
n41.out -> n78.atom2
n6.out -> n78.formula2
n78.out -> n3.b
n18.out -> n84.assertion
n4.out -> n84.atom1
n7.out -> n84.formula1
n22.out -> n84.atom2
n33.out -> n84.formula2
n33.out -> n90.a
n7.out -> n90.b
n84.out -> n69.a
n37.out -> n101.assertion
n4.out -> n101.atom1
n33.out -> n101.formula1
n22.out -> n101.atom2
n4.out -> n101.formula2
n41.out -> n101.atom3
n6.out -> n101.formula3
n101.out -> n99.a
n18.out -> n106.assertion
n4.out -> n106.atom1
n33.out -> n108.a
n6.out -> n108.b
n60.out -> n109.a
n108.out -> n109.b
n90.out -> n110.a
n109.out -> n110.b
n110.out -> n106.formula1
n22.out -> n106.atom2
n7.out -> n106.formula2
n106.out -> n99.b
n99.out -> n98.a
n37.out -> n113.assertion
n4.out -> n113.atom1
n7.out -> n113.formula1
n22.out -> n113.atom2
n90.out -> n113.formula2
n41.out -> n113.atom3
n109.out -> n113.formula3
n113.out -> n98.b
n98.out -> n69.b
n69.out -> n68.a
n37.out -> n118.assertion
n4.out -> n118.atom1
n7.out -> n118.formula1
n22.out -> n118.atom2
n60.out -> n118.formula2
n41.out -> n118.atom3
n108.out -> n118.formula3
n118.out -> n68.b
n68.out -> n11.b
n11.out -> n10.a
n125.out -> n126.assertion
n4.out -> n126.atom1
n6.out -> n126.formula1
n22.out -> n126.atom2
n7.out -> n129.a
n129.out -> n126.formula2
n126.out -> n124.a
n37.out -> n131.assertion
n4.out -> n131.atom1
n33.out -> n131.formula1
n22.out -> n131.atom2
n6.out -> n131.formula2
n41.out -> n131.atom3
n129.out -> n131.formula3
n131.out -> n124.b
n124.out -> n123.a
n18.out -> n136.assertion
n4.out -> n136.atom1
n33.out -> n138.a
n129.out -> n138.b
n108.out -> n139.a
n138.out -> n139.b
n139.out -> n136.formula1
n22.out -> n136.atom2
n7.out -> n136.formula2
n136.out -> n123.b
n123.out -> n122.a
n37.out -> n142.assertion
n4.out -> n142.atom1
n7.out -> n142.formula1
n22.out -> n142.atom2
n108.out -> n142.formula2
n41.out -> n142.atom3
n138.out -> n142.formula3
n142.out -> n122.b
n122.out -> n10.b
n10.out -> n9.a
n54.out -> n149.assertion
n4.out -> n149.atom1
n6.out -> n149.formula1
n22.out -> n149.atom2
n7.out -> n149.formula2
n149.out -> n147.a
n18.out -> n153.assertion
n4.out -> n153.atom1
n7.out -> n155.a
n6.out -> n155.b
n138.out -> n156.a
n155.out -> n156.b
n156.out -> n153.formula1
n22.out -> n153.atom2
n7.out -> n153.formula2
n153.out -> n147.b
n147.out -> n146.a
n37.out -> n159.assertion
n4.out -> n159.atom1
n7.out -> n159.formula1
n22.out -> n159.atom2
n138.out -> n159.formula2
n41.out -> n159.atom3
n155.out -> n159.formula3
n159.out -> n146.b
n146.out -> n9.b
n9.out -> n8.a
n37.out -> n164.assertion
n4.out -> n164.atom1
n7.out -> n164.formula1
n22.out -> n164.atom2
n7.out -> n164.formula2
n41.out -> n164.atom3
n6.out -> n164.formula3
n164.out -> n8.b
n8.out -> n1.b
n1.out -> n168.proof
```

</details>

### 91 · 皮尔士律

- 目标：`⊢ ( ( ( P → Q ) → P ) → P )`
- 提示：((P→Q)→P)→P
- 参考解：79 个模块 / 225 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n169  target
n1  mp M
n2  theorem *00
n3  subst S
n4  atom P
n6  atom Q
n7  imp
n8  imp
n9  mp M
n10  mp M
n11  mp M
n12  mp M
n13  mp M
n14  mp M
n15  mp M
n16  theorem *77
n17  axiom A1
n18  subst S
n20  not
n21  imp
n23  mp M
n24  mp M
n25  mp M
n26  mp M
n27  theorem *64
n29  subst S
n31  not
n32  not
n33  imp
n35  axiom A2
n36  subst S
n39  atom R
n41  subst S
n43  imp
n44  imp
n47  subst S
n51  mp M
n52  mp M
n53  theorem *v
n54  subst S
n58  subst S
n60  imp
n61  imp
n64  subst S
n68  mp M
n69  mp M
n72  mp M
n75  subst S
n77  imp
n80  subst S
n87  subst S
n93  imp
n101  mp M
n102  mp M
n104  subst S
n109  subst S
n111  imp
n112  imp
n113  imp
n116  subst S
n121  subst S
n125  mp M
n126  mp M
n127  mp M
n128  theorem *04
n129  subst S
n131  not
n133  subst S
n138  subst S
n140  imp
n141  imp
n144  subst S
n148  mp M
n149  mp M
n151  subst S
n154  subst S
n156  imp
n157  imp
n160  subst S
n165  subst S

wires:
n2.out -> n3.assertion
n4.out -> n3.atom1
n4.out -> n7.a
n6.out -> n7.b
n7.out -> n8.a
n4.out -> n8.b
n8.out -> n3.formula1
n3.out -> n1.a
n16.out -> n15.a
n17.out -> n18.assertion
n4.out -> n18.atom1
n7.out -> n20.a
n20.out -> n21.a
n4.out -> n21.b
n21.out -> n18.formula1
n6.out -> n18.atom2
n8.out -> n18.formula2
n18.out -> n15.b
n15.out -> n14.a
n27.out -> n26.a
n17.out -> n29.assertion
n4.out -> n29.atom1
n4.out -> n31.a
n31.out -> n32.a
n4.out -> n33.a
n32.out -> n33.b
n33.out -> n29.formula1
n6.out -> n29.atom2
n20.out -> n29.formula2
n29.out -> n26.b
n26.out -> n25.a
n35.out -> n36.assertion
n4.out -> n36.atom1
n20.out -> n36.formula1
n6.out -> n36.atom2
n4.out -> n36.formula2
n39.out -> n36.atom3
n32.out -> n36.formula3
n36.out -> n25.b
n25.out -> n24.a
n17.out -> n41.assertion
n4.out -> n41.atom1
n20.out -> n43.a
n32.out -> n43.b
n21.out -> n44.a
n43.out -> n44.b
n44.out -> n41.formula1
n6.out -> n41.atom2
n8.out -> n41.formula2
n41.out -> n24.b
n24.out -> n23.a
n35.out -> n47.assertion
n4.out -> n47.atom1
n8.out -> n47.formula1
n6.out -> n47.atom2
n21.out -> n47.formula2
n39.out -> n47.atom3
n43.out -> n47.formula3
n47.out -> n23.b
n23.out -> n14.b
n14.out -> n13.a
n53.out -> n54.assertion
n4.out -> n54.atom1
n7.out -> n54.formula1
n6.out -> n54.atom2
n31.out -> n54.formula2
n54.out -> n52.a
n17.out -> n58.assertion
n4.out -> n58.atom1
n31.out -> n60.a
n7.out -> n60.b
n43.out -> n61.a
n60.out -> n61.b
n61.out -> n58.formula1
n6.out -> n58.atom2
n8.out -> n58.formula2
n58.out -> n52.b
n52.out -> n51.a
n35.out -> n64.assertion
n4.out -> n64.atom1
n8.out -> n64.formula1
n6.out -> n64.atom2
n43.out -> n64.formula2
n39.out -> n64.atom3
n60.out -> n64.formula3
n64.out -> n51.b
n51.out -> n13.b
n13.out -> n12.a
n2.out -> n72.a
n17.out -> n75.assertion
n4.out -> n75.atom1
n4.out -> n77.a
n4.out -> n77.b
n77.out -> n75.formula1
n6.out -> n75.atom2
n7.out -> n75.formula2
n75.out -> n72.b
n72.out -> n3.a
n35.out -> n80.assertion
n4.out -> n80.atom1
n7.out -> n80.formula1
n6.out -> n80.atom2
n4.out -> n80.formula2
n39.out -> n80.atom3
n4.out -> n80.formula3
n80.out -> n3.b
n17.out -> n87.assertion
n4.out -> n87.atom1
n8.out -> n87.formula1
n6.out -> n87.atom2
n31.out -> n87.formula2
n31.out -> n93.a
n8.out -> n93.b
n87.out -> n69.a
n35.out -> n104.assertion
n4.out -> n104.atom1
n31.out -> n104.formula1
n6.out -> n104.atom2
n7.out -> n104.formula2
n39.out -> n104.atom3
n4.out -> n104.formula3
n104.out -> n102.a
n17.out -> n109.assertion
n4.out -> n109.atom1
n31.out -> n111.a
n4.out -> n111.b
n60.out -> n112.a
n111.out -> n112.b
n93.out -> n113.a
n112.out -> n113.b
n113.out -> n109.formula1
n6.out -> n109.atom2
n8.out -> n109.formula2
n109.out -> n102.b
n102.out -> n101.a
n35.out -> n116.assertion
n4.out -> n116.atom1
n8.out -> n116.formula1
n6.out -> n116.atom2
n93.out -> n116.formula2
n39.out -> n116.atom3
n112.out -> n116.formula3
n116.out -> n101.b
n101.out -> n69.b
n69.out -> n68.a
n35.out -> n121.assertion
n4.out -> n121.atom1
n8.out -> n121.formula1
n6.out -> n121.atom2
n60.out -> n121.formula2
n39.out -> n121.atom3
n111.out -> n121.formula3
n121.out -> n68.b
n68.out -> n12.b
n12.out -> n11.a
n128.out -> n129.assertion
n6.out -> n129.atom1
n8.out -> n131.a
n131.out -> n129.formula1
n129.out -> n127.a
n35.out -> n133.assertion
n4.out -> n133.atom1
n31.out -> n133.formula1
n6.out -> n133.atom2
n4.out -> n133.formula2
n39.out -> n133.atom3
n131.out -> n133.formula3
n133.out -> n127.b
n127.out -> n126.a
n17.out -> n138.assertion
n4.out -> n138.atom1
n31.out -> n140.a
n131.out -> n140.b
n111.out -> n141.a
n140.out -> n141.b
n141.out -> n138.formula1
n6.out -> n138.atom2
n8.out -> n138.formula2
n138.out -> n126.b
n126.out -> n125.a
n35.out -> n144.assertion
n4.out -> n144.atom1
n8.out -> n144.formula1
n6.out -> n144.atom2
n111.out -> n144.formula2
n39.out -> n144.atom3
n140.out -> n144.formula3
n144.out -> n125.b
n125.out -> n11.b
n11.out -> n10.a
n53.out -> n151.assertion
n6.out -> n151.atom1
n8.out -> n151.formula1
n151.out -> n149.a
n17.out -> n154.assertion
n4.out -> n154.atom1
n8.out -> n156.a
n4.out -> n156.b
n140.out -> n157.a
n156.out -> n157.b
n157.out -> n154.formula1
n6.out -> n154.atom2
n8.out -> n154.formula2
n154.out -> n149.b
n149.out -> n148.a
n35.out -> n160.assertion
n4.out -> n160.atom1
n8.out -> n160.formula1
n6.out -> n160.atom2
n140.out -> n160.formula2
n39.out -> n160.atom3
n156.out -> n160.formula3
n160.out -> n148.b
n148.out -> n10.b
n10.out -> n9.a
n35.out -> n165.assertion
n4.out -> n165.atom1
n8.out -> n165.formula1
n6.out -> n165.atom2
n8.out -> n165.formula2
n39.out -> n165.atom3
n4.out -> n165.formula3
n165.out -> n9.b
n9.out -> n1.b
n1.out -> n169.proof
```

</details>

### 92 · 等值引入

- 目标：`⊢ ( ( P → Q ) → ( ( Q → P ) → ( P ↔ Q ) ) )`
- 提示：A→B 与 B→A 一起给出 A↔B。
- 参考解：80 个模块 / 233 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n343  target
n1  def-contract D⁻
n2  mp M
n3  mp M
n6  axiom A1
n8  atom Q
n9  atom P
n15  axiom A2
n18  atom R
n22  subst S
n25  not
n26  imp
n27  not
n28  not
n32  imp
n39  mp M
n40  mp M
n41  mp M
n44  mp M
n45  mp M
n66  subst S
n72  imp
n80  mp M
n81  mp M
n82  axiom A3
n83  subst S
n87  subst S
n89  imp
n90  imp
n93  subst S
n97  mp M
n98  mp M
n99  mp M
n100  mp M
n102  subst S
n105  mp M
n107  subst S
n110  imp
n112  subst S
n116  mp M
n117  mp M
n121  mp M
n122  mp M
n143  subst S
n146  not
n147  not
n151  imp
n159  mp M
n160  mp M
n162  subst S
n166  subst S
n168  imp
n169  imp
n172  subst S
n177  subst S
n184  imp
n192  mp M
n193  mp M
n195  subst S
n199  subst S
n201  imp
n202  imp
n205  subst S
n210  subst S
n215  subst S
n219  subst S
n309  subst S
n314  subst S
n316  imp
n317  imp
n320  subst S
n323  mp M
n324  mp M
n326  subst S
n329  subst S
n331  imp
n332  imp
n335  subst S
n338  subst S
n340  imp
n342  imp

wires:
n6.out -> n22.assertion
n8.out -> n22.atom1
n8.out -> n25.a
n9.out -> n26.a
n25.out -> n26.b
n26.out -> n27.a
n27.out -> n28.a
n28.out -> n22.formula1
n28.out -> n32.a
n9.out -> n32.b
n22.out -> n3.a
n6.out -> n66.assertion
n9.out -> n66.atom1
n28.out -> n66.formula1
n8.out -> n66.atom2
n27.out -> n66.formula2
n27.out -> n72.a
n28.out -> n72.b
n66.out -> n45.a
n82.out -> n83.assertion
n9.out -> n83.atom1
n26.out -> n83.formula1
n8.out -> n83.atom2
n27.out -> n83.formula2
n83.out -> n81.a
n6.out -> n87.assertion
n9.out -> n87.atom1
n27.out -> n89.a
n26.out -> n89.b
n72.out -> n90.a
n89.out -> n90.b
n90.out -> n87.formula1
n8.out -> n87.atom2
n28.out -> n87.formula2
n87.out -> n81.b
n81.out -> n80.a
n15.out -> n93.assertion
n9.out -> n93.atom1
n28.out -> n93.formula1
n8.out -> n93.atom2
n72.out -> n93.formula2
n18.out -> n93.atom3
n89.out -> n93.formula3
n93.out -> n80.b
n80.out -> n45.b
n45.out -> n44.a
n6.out -> n102.assertion
n9.out -> n102.atom1
n89.out -> n102.formula1
n8.out -> n102.atom2
n89.out -> n102.formula2
n102.out -> n100.a
n6.out -> n107.assertion
n9.out -> n107.atom1
n89.out -> n107.formula1
n8.out -> n107.atom2
n89.out -> n110.a
n89.out -> n110.b
n110.out -> n107.formula2
n107.out -> n105.a
n15.out -> n112.assertion
n9.out -> n112.atom1
n89.out -> n112.formula1
n8.out -> n112.atom2
n110.out -> n112.formula2
n18.out -> n112.atom3
n89.out -> n112.formula3
n112.out -> n105.b
n105.out -> n100.b
n100.out -> n99.a
n6.out -> n143.assertion
n9.out -> n143.atom1
n27.out -> n143.formula1
n8.out -> n143.atom2
n89.out -> n146.a
n146.out -> n147.a
n147.out -> n143.formula2
n147.out -> n151.a
n27.out -> n151.b
n143.out -> n122.a
n82.out -> n162.assertion
n9.out -> n162.atom1
n146.out -> n162.formula1
n8.out -> n162.atom2
n26.out -> n162.formula2
n162.out -> n160.a
n6.out -> n166.assertion
n9.out -> n166.atom1
n26.out -> n168.a
n146.out -> n168.b
n151.out -> n169.a
n168.out -> n169.b
n169.out -> n166.formula1
n8.out -> n166.atom2
n27.out -> n166.formula2
n166.out -> n160.b
n160.out -> n159.a
n15.out -> n172.assertion
n9.out -> n172.atom1
n27.out -> n172.formula1
n8.out -> n172.atom2
n151.out -> n172.formula2
n18.out -> n172.atom3
n168.out -> n172.formula3
n172.out -> n159.b
n159.out -> n122.b
n122.out -> n121.a
n15.out -> n177.assertion
n9.out -> n177.atom1
n27.out -> n177.formula1
n8.out -> n177.atom2
n26.out -> n177.formula2
n18.out -> n177.atom3
n146.out -> n177.formula3
n177.out -> n121.b
n27.out -> n184.a
n146.out -> n184.b
n121.out -> n117.a
n82.out -> n195.assertion
n9.out -> n195.atom1
n26.out -> n195.formula1
n8.out -> n195.atom2
n89.out -> n195.formula2
n195.out -> n193.a
n6.out -> n199.assertion
n9.out -> n199.atom1
n89.out -> n201.a
n26.out -> n201.b
n184.out -> n202.a
n201.out -> n202.b
n202.out -> n199.formula1
n8.out -> n199.atom2
n89.out -> n199.formula2
n199.out -> n193.b
n193.out -> n192.a
n15.out -> n205.assertion
n9.out -> n205.atom1
n89.out -> n205.formula1
n8.out -> n205.atom2
n184.out -> n205.formula2
n18.out -> n205.atom3
n201.out -> n205.formula3
n205.out -> n192.b
n192.out -> n117.b
n117.out -> n116.a
n15.out -> n210.assertion
n9.out -> n210.atom1
n89.out -> n210.formula1
n8.out -> n210.atom2
n89.out -> n210.formula2
n18.out -> n210.atom3
n26.out -> n210.formula3
n210.out -> n116.b
n116.out -> n99.b
n99.out -> n98.a
n6.out -> n215.assertion
n9.out -> n215.atom1
n201.out -> n215.formula1
n8.out -> n215.atom2
n28.out -> n215.formula2
n215.out -> n98.b
n98.out -> n97.a
n15.out -> n219.assertion
n9.out -> n219.atom1
n28.out -> n219.formula1
n8.out -> n219.atom2
n89.out -> n219.formula2
n18.out -> n219.atom3
n26.out -> n219.formula3
n219.out -> n97.b
n97.out -> n44.b
n44.out -> n41.a
n15.out -> n309.assertion
n9.out -> n309.atom1
n28.out -> n309.formula1
n8.out -> n309.atom2
n9.out -> n309.formula2
n18.out -> n309.atom3
n25.out -> n309.formula3
n309.out -> n41.b
n41.out -> n40.a
n6.out -> n314.assertion
n9.out -> n314.atom1
n28.out -> n316.a
n25.out -> n316.b
n32.out -> n317.a
n316.out -> n317.b
n317.out -> n314.formula1
n8.out -> n314.atom2
n9.out -> n314.formula2
n314.out -> n40.b
n40.out -> n39.a
n15.out -> n320.assertion
n8.out -> n320.atom1
n32.out -> n320.formula1
n18.out -> n320.atom2
n316.out -> n320.formula2
n320.out -> n39.b
n39.out -> n3.b
n3.out -> n2.a
n82.out -> n326.assertion
n9.out -> n326.atom1
n27.out -> n326.formula1
n326.out -> n324.a
n6.out -> n329.assertion
n9.out -> n329.atom1
n8.out -> n331.a
n27.out -> n331.b
n316.out -> n332.a
n331.out -> n332.b
n332.out -> n329.formula1
n8.out -> n329.atom2
n9.out -> n329.formula2
n329.out -> n324.b
n324.out -> n323.a
n15.out -> n335.assertion
n8.out -> n335.atom1
n316.out -> n335.formula1
n18.out -> n335.atom2
n331.out -> n335.formula2
n335.out -> n323.b
n323.out -> n2.b
n2.out -> n338.assertion
n9.out -> n338.atom1
n9.out -> n340.a
n8.out -> n340.b
n340.out -> n338.formula1
n8.out -> n338.atom2
n8.out -> n342.a
n9.out -> n342.b
n342.out -> n338.formula2
n338.out -> n1.assertion
n1.out -> n343.proof
```

</details>

### 93 · 前件合并

- 目标：`⊢ ( ( ( P → Q ) → ( P → R ) ) → ( P → ( Q → R ) ) )`
- 提示：((P→Q)→P→R)→P→Q→R
- 参考解：81 个模块 / 235 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n173  target
n1  mp M
n2  mp M
n3  mp M
n5  theorem *00
n6  subst S
n7  atom P
n9  atom Q
n10  imp
n11  atom R
n12  imp
n13  imp
n16  axiom A1
n17  subst S
n22  imp
n25  axiom A2
n30  mp M
n31  mp M
n32  mp M
n33  mp M
n34  mp M
n36  subst S
n39  mp M
n40  mp M
n42  subst S
n46  subst S
n48  imp
n49  imp
n51  subst S
n55  mp M
n56  mp M
n57  mp M
n59  subst S
n64  subst S
n66  imp
n67  imp
n69  subst S
n74  subst S
n79  subst S
n81  imp
n82  imp
n85  subst S
n89  mp M
n90  mp M
n92  subst S
n96  subst S
n98  imp
n99  imp
n102  subst S
n106  mp M
n107  mp M
n108  mp M
n109  mp M
n110  theorem *07
n111  subst S
n114  subst S
n116  imp
n117  imp
n119  mp M
n120  mp M
n121  mp M
n122  mp M
n123  theorem *05
n124  subst S
n129  subst S
n131  imp
n132  imp
n133  imp
n136  subst S
n140  subst S
n142  imp
n143  imp
n146  subst S
n150  mp M
n151  mp M
n153  subst S
n157  subst S
n159  imp
n160  imp
n161  imp
n164  subst S
n169  subst S

wires:
n5.out -> n6.assertion
n7.out -> n6.atom1
n7.out -> n10.a
n9.out -> n10.b
n7.out -> n12.a
n11.out -> n12.b
n10.out -> n13.a
n12.out -> n13.b
n13.out -> n6.formula1
n16.out -> n17.assertion
n7.out -> n17.atom1
n13.out -> n17.formula1
n9.out -> n22.a
n13.out -> n22.b
n17.out -> n3.a
n16.out -> n36.assertion
n7.out -> n36.atom1
n9.out -> n36.formula1
n9.out -> n36.atom2
n7.out -> n36.formula2
n36.out -> n34.a
n16.out -> n42.assertion
n7.out -> n42.atom1
n10.out -> n42.formula1
n9.out -> n42.atom2
n13.out -> n42.formula2
n42.out -> n40.a
n16.out -> n46.assertion
n7.out -> n46.atom1
n13.out -> n48.a
n10.out -> n48.b
n10.out -> n49.a
n48.out -> n49.b
n49.out -> n46.formula1
n46.out -> n40.b
n40.out -> n39.a
n25.out -> n51.assertion
n7.out -> n51.atom1
n9.out -> n51.formula1
n9.out -> n51.atom2
n10.out -> n51.formula2
n11.out -> n51.atom3
n48.out -> n51.formula3
n51.out -> n39.b
n39.out -> n34.b
n34.out -> n33.a
n6.out -> n57.a
n25.out -> n59.assertion
n7.out -> n59.atom1
n13.out -> n59.formula1
n9.out -> n59.atom2
n10.out -> n59.formula2
n11.out -> n59.atom3
n12.out -> n59.formula3
n59.out -> n57.b
n57.out -> n56.a
n16.out -> n64.assertion
n7.out -> n64.atom1
n13.out -> n66.a
n12.out -> n66.b
n48.out -> n67.a
n66.out -> n67.b
n67.out -> n64.formula1
n64.out -> n56.b
n56.out -> n55.a
n25.out -> n69.assertion
n7.out -> n69.atom1
n9.out -> n69.formula1
n9.out -> n69.atom2
n48.out -> n69.formula2
n11.out -> n69.atom3
n66.out -> n69.formula3
n69.out -> n55.b
n55.out -> n33.b
n33.out -> n32.a
n25.out -> n74.assertion
n7.out -> n74.atom1
n9.out -> n74.formula1
n9.out -> n74.atom2
n13.out -> n74.formula2
n11.out -> n74.atom3
n12.out -> n74.formula3
n74.out -> n32.b
n32.out -> n31.a
n16.out -> n79.assertion
n7.out -> n79.atom1
n9.out -> n81.a
n12.out -> n81.b
n22.out -> n82.a
n81.out -> n82.b
n82.out -> n79.formula1
n9.out -> n79.atom2
n13.out -> n79.formula2
n79.out -> n31.b
n31.out -> n30.a
n25.out -> n85.assertion
n7.out -> n85.atom1
n13.out -> n85.formula1
n9.out -> n85.atom2
n22.out -> n85.formula2
n11.out -> n85.atom3
n81.out -> n85.formula3
n85.out -> n30.b
n30.out -> n3.b
n3.out -> n2.a
n16.out -> n92.assertion
n7.out -> n92.atom1
n81.out -> n92.formula1
n9.out -> n92.atom2
n7.out -> n92.formula2
n92.out -> n90.a
n16.out -> n96.assertion
n7.out -> n96.atom1
n7.out -> n98.a
n81.out -> n98.b
n81.out -> n99.a
n98.out -> n99.b
n99.out -> n96.formula1
n9.out -> n96.atom2
n13.out -> n96.formula2
n96.out -> n90.b
n90.out -> n89.a
n25.out -> n102.assertion
n7.out -> n102.atom1
n13.out -> n102.formula1
n9.out -> n102.atom2
n81.out -> n102.formula2
n11.out -> n102.atom3
n98.out -> n102.formula3
n102.out -> n89.b
n89.out -> n2.b
n2.out -> n1.a
n110.out -> n111.assertion
n9.out -> n111.atom1
n11.out -> n111.formula1
n111.out -> n109.a
n16.out -> n114.assertion
n7.out -> n114.atom1
n12.out -> n116.a
n11.out -> n116.b
n7.out -> n117.a
n116.out -> n117.b
n117.out -> n114.formula1
n9.out -> n114.atom2
n13.out -> n114.formula2
n114.out -> n109.b
n109.out -> n108.a
n123.out -> n124.assertion
n7.out -> n124.atom1
n12.out -> n124.formula1
n9.out -> n124.atom2
n11.out -> n124.formula2
n11.out -> n124.atom3
n9.out -> n124.formula3
n124.out -> n122.a
n16.out -> n129.assertion
n7.out -> n129.atom1
n9.out -> n131.a
n11.out -> n131.b
n81.out -> n132.a
n131.out -> n132.b
n116.out -> n133.a
n132.out -> n133.b
n133.out -> n129.formula1
n9.out -> n129.atom2
n7.out -> n129.formula2
n129.out -> n122.b
n122.out -> n121.a
n25.out -> n136.assertion
n9.out -> n136.atom1
n116.out -> n136.formula1
n11.out -> n136.atom2
n132.out -> n136.formula2
n136.out -> n121.b
n121.out -> n120.a
n16.out -> n140.assertion
n7.out -> n140.atom1
n7.out -> n142.a
n132.out -> n142.b
n117.out -> n143.a
n142.out -> n143.b
n143.out -> n140.formula1
n9.out -> n140.atom2
n13.out -> n140.formula2
n140.out -> n120.b
n120.out -> n119.a
n25.out -> n146.assertion
n7.out -> n146.atom1
n13.out -> n146.formula1
n9.out -> n146.atom2
n117.out -> n146.formula2
n11.out -> n146.atom3
n142.out -> n146.formula3
n146.out -> n119.b
n119.out -> n108.b
n108.out -> n107.a
n25.out -> n153.assertion
n9.out -> n153.atom1
n81.out -> n153.formula1
n11.out -> n153.atom2
n131.out -> n153.formula2
n153.out -> n151.a
n16.out -> n157.assertion
n7.out -> n157.atom1
n7.out -> n159.a
n131.out -> n159.b
n98.out -> n160.a
n159.out -> n160.b
n142.out -> n161.a
n160.out -> n161.b
n161.out -> n157.formula1
n9.out -> n157.atom2
n13.out -> n157.formula2
n157.out -> n151.b
n151.out -> n150.a
n25.out -> n164.assertion
n7.out -> n164.atom1
n13.out -> n164.formula1
n9.out -> n164.atom2
n142.out -> n164.formula2
n11.out -> n164.atom3
n160.out -> n164.formula3
n164.out -> n150.b
n150.out -> n107.b
n107.out -> n106.a
n25.out -> n169.assertion
n7.out -> n169.atom1
n13.out -> n169.formula1
n9.out -> n169.atom2
n98.out -> n169.formula2
n11.out -> n169.atom3
n159.out -> n169.formula3
n169.out -> n106.b
n106.out -> n1.b
n1.out -> n173.proof
```

</details>

### 94 · 否定蕴涵取后件

- 目标：`⊢ ( ¬ ( P → Q ) → ¬ Q )`
- 提示：¬(P→Q)→¬Q
- 参考解：90 个模块 / 256 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n229  target
n1  mp M
n2  theorem *00
n3  subst S
n4  atom P
n6  atom Q
n7  imp
n8  not
n9  mp M
n10  mp M
n11  mp M
n15  axiom A1
n16  subst S
n19  not
n20  not
n24  imp
n27  axiom A2
n31  atom R
n32  mp M
n33  mp M
n34  mp M
n35  mp M
n36  mp M
n37  theorem *19
n38  subst S
n40  mp M
n41  mp M
n43  subst S
n47  subst S
n49  imp
n50  imp
n53  subst S
n56  mp M
n57  mp M
n58  mp M
n59  mp M
n60  mp M
n62  subst S
n65  mp M
n66  mp M
n67  mp M
n75  subst S
n78  not
n79  not
n83  imp
n89  mp M
n90  mp M
n91  mp M
n93  mp M
n95  subst S
n97  mp M
n98  mp M
n100  subst S
n103  subst S
n105  imp
n106  imp
n109  subst S
n137  subst S
n141  subst S
n143  imp
n144  imp
n146  subst S
n150  mp M
n151  mp M
n152  theorem *v
n153  subst S
n157  subst S
n159  imp
n160  imp
n162  subst S
n167  subst S
n172  subst S
n174  imp
n177  subst S
n181  subst S
n183  imp
n184  imp
n187  subst S
n192  subst S
n197  subst S
n199  imp
n200  imp
n203  subst S
n207  mp M
n208  mp M
n210  subst S
n214  subst S
n216  imp
n217  imp
n220  subst S
n225  subst S

wires:
n2.out -> n3.assertion
n4.out -> n3.atom1
n4.out -> n7.a
n6.out -> n7.b
n7.out -> n8.a
n8.out -> n3.formula1
n3.out -> n1.a
n15.out -> n16.assertion
n4.out -> n16.atom1
n8.out -> n16.formula1
n6.out -> n16.atom2
n6.out -> n19.a
n19.out -> n20.a
n20.out -> n16.formula2
n20.out -> n24.a
n8.out -> n24.b
n16.out -> n11.a
n37.out -> n38.assertion
n4.out -> n38.atom1
n6.out -> n38.formula1
n38.out -> n36.a
n15.out -> n43.assertion
n4.out -> n43.atom1
n6.out -> n43.formula1
n6.out -> n43.atom2
n8.out -> n43.formula2
n43.out -> n41.a
n15.out -> n47.assertion
n4.out -> n47.atom1
n8.out -> n49.a
n6.out -> n49.b
n6.out -> n50.a
n49.out -> n50.b
n50.out -> n47.formula1
n6.out -> n47.atom2
n20.out -> n47.formula2
n47.out -> n41.b
n41.out -> n40.a
n27.out -> n53.assertion
n4.out -> n53.atom1
n20.out -> n53.formula1
n31.out -> n53.atom2
n49.out -> n53.formula2
n53.out -> n40.b
n40.out -> n36.b
n36.out -> n35.a
n15.out -> n62.assertion
n4.out -> n62.atom1
n6.out -> n62.formula1
n6.out -> n62.atom2
n4.out -> n62.formula2
n62.out -> n60.a
n15.out -> n75.assertion
n4.out -> n75.atom1
n6.out -> n75.formula1
n6.out -> n75.atom2
n8.out -> n78.a
n78.out -> n79.a
n79.out -> n75.formula2
n79.out -> n83.a
n6.out -> n83.b
n75.out -> n67.a
n37.out -> n95.assertion
n4.out -> n95.atom1
n8.out -> n95.formula1
n95.out -> n93.a
n15.out -> n100.assertion
n4.out -> n100.atom1
n8.out -> n100.formula1
n100.out -> n98.a
n15.out -> n103.assertion
n4.out -> n103.atom1
n6.out -> n105.a
n8.out -> n105.b
n8.out -> n106.a
n105.out -> n106.b
n106.out -> n103.formula1
n6.out -> n103.atom2
n79.out -> n103.formula2
n103.out -> n98.b
n98.out -> n97.a
n27.out -> n109.assertion
n4.out -> n109.atom1
n79.out -> n109.formula1
n6.out -> n109.atom2
n8.out -> n109.formula2
n31.out -> n109.atom3
n105.out -> n109.formula3
n109.out -> n97.b
n97.out -> n93.b
n93.out -> n91.a
n27.out -> n137.assertion
n4.out -> n137.atom1
n79.out -> n137.formula1
n31.out -> n137.atom2
n8.out -> n137.formula2
n137.out -> n91.b
n91.out -> n90.a
n15.out -> n141.assertion
n4.out -> n141.atom1
n79.out -> n143.a
n8.out -> n143.b
n83.out -> n144.a
n143.out -> n144.b
n144.out -> n141.formula1
n141.out -> n90.b
n90.out -> n89.a
n27.out -> n146.assertion
n4.out -> n146.atom1
n6.out -> n146.formula1
n6.out -> n146.atom2
n83.out -> n146.formula2
n31.out -> n146.atom3
n143.out -> n146.formula3
n146.out -> n89.b
n89.out -> n67.b
n67.out -> n66.a
n152.out -> n153.assertion
n4.out -> n153.atom1
n78.out -> n153.formula1
n6.out -> n153.atom2
n7.out -> n153.formula2
n153.out -> n151.a
n15.out -> n157.assertion
n4.out -> n157.atom1
n7.out -> n159.a
n78.out -> n159.b
n143.out -> n160.a
n159.out -> n160.b
n160.out -> n157.formula1
n157.out -> n151.b
n151.out -> n150.a
n27.out -> n162.assertion
n4.out -> n162.atom1
n6.out -> n162.formula1
n6.out -> n162.atom2
n143.out -> n162.formula2
n31.out -> n162.atom3
n159.out -> n162.formula3
n162.out -> n150.b
n150.out -> n66.b
n66.out -> n65.a
n27.out -> n167.assertion
n4.out -> n167.atom1
n6.out -> n167.formula1
n6.out -> n167.atom2
n7.out -> n167.formula2
n31.out -> n167.atom3
n78.out -> n167.formula3
n167.out -> n65.b
n65.out -> n60.b
n60.out -> n59.a
n15.out -> n172.assertion
n4.out -> n172.atom1
n6.out -> n174.a
n78.out -> n174.b
n174.out -> n172.formula1
n6.out -> n172.atom2
n8.out -> n172.formula2
n172.out -> n59.b
n59.out -> n58.a
n27.out -> n177.assertion
n4.out -> n177.atom1
n8.out -> n177.formula1
n31.out -> n177.atom2
n78.out -> n177.formula2
n177.out -> n58.b
n58.out -> n57.a
n15.out -> n181.assertion
n4.out -> n181.atom1
n8.out -> n183.a
n78.out -> n183.b
n49.out -> n184.a
n183.out -> n184.b
n184.out -> n181.formula1
n6.out -> n181.atom2
n20.out -> n181.formula2
n181.out -> n57.b
n57.out -> n56.a
n27.out -> n187.assertion
n4.out -> n187.atom1
n20.out -> n187.formula1
n6.out -> n187.atom2
n49.out -> n187.formula2
n31.out -> n187.atom3
n183.out -> n187.formula3
n187.out -> n56.b
n56.out -> n35.b
n35.out -> n34.a
n27.out -> n192.assertion
n4.out -> n192.atom1
n20.out -> n192.formula1
n6.out -> n192.atom2
n8.out -> n192.formula2
n31.out -> n192.atom3
n78.out -> n192.formula3
n192.out -> n34.b
n34.out -> n33.a
n15.out -> n197.assertion
n4.out -> n197.atom1
n20.out -> n199.a
n78.out -> n199.b
n24.out -> n200.a
n199.out -> n200.b
n200.out -> n197.formula1
n6.out -> n197.atom2
n8.out -> n197.formula2
n197.out -> n33.b
n33.out -> n32.a
n27.out -> n203.assertion
n4.out -> n203.atom1
n8.out -> n203.formula1
n6.out -> n203.atom2
n24.out -> n203.formula2
n31.out -> n203.atom3
n199.out -> n203.formula3
n203.out -> n32.b
n32.out -> n11.b
n11.out -> n10.a
n152.out -> n210.assertion
n4.out -> n210.atom1
n19.out -> n210.formula1
n6.out -> n210.atom2
n8.out -> n210.formula2
n210.out -> n208.a
n15.out -> n214.assertion
n4.out -> n214.atom1
n8.out -> n216.a
n19.out -> n216.b
n199.out -> n217.a
n216.out -> n217.b
n217.out -> n214.formula1
n6.out -> n214.atom2
n8.out -> n214.formula2
n214.out -> n208.b
n208.out -> n207.a
n27.out -> n220.assertion
n4.out -> n220.atom1
n8.out -> n220.formula1
n6.out -> n220.atom2
n199.out -> n220.formula2
n31.out -> n220.atom3
n216.out -> n220.formula3
n220.out -> n207.b
n207.out -> n10.b
n10.out -> n9.a
n27.out -> n225.assertion
n4.out -> n225.atom1
n8.out -> n225.formula1
n6.out -> n225.atom2
n8.out -> n225.formula2
n31.out -> n225.atom3
n19.out -> n225.formula3
n225.out -> n9.b
n9.out -> n1.b
n1.out -> n229.proof
```

</details>

### 95 · 等值消去右

- 目标：`⊢ ( ( P ↔ Q ) → ( Q → P ) )`
- 提示：A↔B 给出 B→A。
- 参考解：95 个模块 / 292 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n931  target
n1  def-contract D⁻
n2  mp M
n3  mp M
n7  axiom A1
n9  atom P
n10  atom Q
n11  not
n19  axiom A2
n23  atom R
n27  subst S
n34  imp
n121  axiom A3
n253  imp
n621  mp M
n622  mp M
n623  mp M
n628  subst S
n631  not
n632  not
n633  not
n637  imp
n645  mp M
n646  mp M
n647  mp M
n649  mp M
n650  mp M
n651  mp M
n672  subst S
n678  imp
n686  mp M
n687  mp M
n689  subst S
n693  subst S
n695  imp
n696  imp
n699  subst S
n703  mp M
n704  mp M
n705  mp M
n706  mp M
n708  subst S
n711  mp M
n713  subst S
n716  imp
n718  subst S
n722  mp M
n723  mp M
n727  mp M
n728  mp M
n749  subst S
n752  not
n753  not
n757  imp
n765  mp M
n766  mp M
n768  subst S
n772  subst S
n774  imp
n775  imp
n778  subst S
n783  subst S
n790  imp
n798  mp M
n799  mp M
n801  subst S
n805  subst S
n807  imp
n808  imp
n811  subst S
n816  subst S
n821  subst S
n825  subst S
n829  mp M
n830  mp M
n832  subst S
n836  subst S
n838  imp
n839  imp
n842  subst S
n886  subst S
n891  subst S
n893  imp
n894  imp
n897  subst S
n901  mp M
n902  mp M
n904  subst S
n908  subst S
n910  imp
n911  imp
n914  subst S
n919  subst S
n924  subst S
n927  subst S
n930  imp

wires:
n10.out -> n11.a
n7.out -> n27.assertion
n9.out -> n27.atom1
n11.out -> n27.formula1
n10.out -> n27.atom2
n9.out -> n27.formula2
n9.out -> n34.a
n11.out -> n34.b
n9.out -> n253.a
n10.out -> n253.b
n27.out -> n3.a
n7.out -> n628.assertion
n9.out -> n628.atom1
n11.out -> n628.formula1
n10.out -> n628.atom2
n34.out -> n631.a
n631.out -> n632.a
n632.out -> n633.a
n633.out -> n628.formula2
n633.out -> n637.a
n11.out -> n637.b
n628.out -> n623.a
n7.out -> n672.assertion
n9.out -> n672.atom1
n633.out -> n672.formula1
n10.out -> n672.atom2
n632.out -> n672.formula2
n632.out -> n678.a
n633.out -> n678.b
n672.out -> n651.a
n121.out -> n689.assertion
n9.out -> n689.atom1
n631.out -> n689.formula1
n10.out -> n689.atom2
n632.out -> n689.formula2
n689.out -> n687.a
n7.out -> n693.assertion
n9.out -> n693.atom1
n632.out -> n695.a
n631.out -> n695.b
n678.out -> n696.a
n695.out -> n696.b
n696.out -> n693.formula1
n10.out -> n693.atom2
n633.out -> n693.formula2
n693.out -> n687.b
n687.out -> n686.a
n19.out -> n699.assertion
n9.out -> n699.atom1
n633.out -> n699.formula1
n10.out -> n699.atom2
n678.out -> n699.formula2
n23.out -> n699.atom3
n695.out -> n699.formula3
n699.out -> n686.b
n686.out -> n651.b
n651.out -> n650.a
n7.out -> n708.assertion
n9.out -> n708.atom1
n695.out -> n708.formula1
n10.out -> n708.atom2
n695.out -> n708.formula2
n708.out -> n706.a
n7.out -> n713.assertion
n9.out -> n713.atom1
n695.out -> n713.formula1
n10.out -> n713.atom2
n695.out -> n716.a
n695.out -> n716.b
n716.out -> n713.formula2
n713.out -> n711.a
n19.out -> n718.assertion
n9.out -> n718.atom1
n695.out -> n718.formula1
n10.out -> n718.atom2
n716.out -> n718.formula2
n23.out -> n718.atom3
n695.out -> n718.formula3
n718.out -> n711.b
n711.out -> n706.b
n706.out -> n705.a
n7.out -> n749.assertion
n9.out -> n749.atom1
n632.out -> n749.formula1
n10.out -> n749.atom2
n695.out -> n752.a
n752.out -> n753.a
n753.out -> n749.formula2
n753.out -> n757.a
n632.out -> n757.b
n749.out -> n728.a
n121.out -> n768.assertion
n9.out -> n768.atom1
n752.out -> n768.formula1
n10.out -> n768.atom2
n631.out -> n768.formula2
n768.out -> n766.a
n7.out -> n772.assertion
n9.out -> n772.atom1
n631.out -> n774.a
n752.out -> n774.b
n757.out -> n775.a
n774.out -> n775.b
n775.out -> n772.formula1
n10.out -> n772.atom2
n632.out -> n772.formula2
n772.out -> n766.b
n766.out -> n765.a
n19.out -> n778.assertion
n9.out -> n778.atom1
n632.out -> n778.formula1
n10.out -> n778.atom2
n757.out -> n778.formula2
n23.out -> n778.atom3
n774.out -> n778.formula3
n778.out -> n765.b
n765.out -> n728.b
n728.out -> n727.a
n19.out -> n783.assertion
n9.out -> n783.atom1
n632.out -> n783.formula1
n10.out -> n783.atom2
n631.out -> n783.formula2
n23.out -> n783.atom3
n752.out -> n783.formula3
n783.out -> n727.b
n632.out -> n790.a
n752.out -> n790.b
n727.out -> n723.a
n121.out -> n801.assertion
n9.out -> n801.atom1
n631.out -> n801.formula1
n10.out -> n801.atom2
n695.out -> n801.formula2
n801.out -> n799.a
n7.out -> n805.assertion
n9.out -> n805.atom1
n695.out -> n807.a
n631.out -> n807.b
n790.out -> n808.a
n807.out -> n808.b
n808.out -> n805.formula1
n10.out -> n805.atom2
n695.out -> n805.formula2
n805.out -> n799.b
n799.out -> n798.a
n19.out -> n811.assertion
n9.out -> n811.atom1
n695.out -> n811.formula1
n10.out -> n811.atom2
n790.out -> n811.formula2
n23.out -> n811.atom3
n807.out -> n811.formula3
n811.out -> n798.b
n798.out -> n723.b
n723.out -> n722.a
n19.out -> n816.assertion
n9.out -> n816.atom1
n695.out -> n816.formula1
n10.out -> n816.atom2
n695.out -> n816.formula2
n23.out -> n816.atom3
n631.out -> n816.formula3
n816.out -> n722.b
n722.out -> n705.b
n705.out -> n704.a
n7.out -> n821.assertion
n9.out -> n821.atom1
n807.out -> n821.formula1
n10.out -> n821.atom2
n633.out -> n821.formula2
n821.out -> n704.b
n704.out -> n703.a
n19.out -> n825.assertion
n9.out -> n825.atom1
n633.out -> n825.formula1
n10.out -> n825.atom2
n695.out -> n825.formula2
n23.out -> n825.atom3
n631.out -> n825.formula3
n825.out -> n703.b
n703.out -> n650.b
n650.out -> n649.a
n7.out -> n832.assertion
n9.out -> n832.atom1
n631.out -> n832.formula1
n10.out -> n832.atom2
n11.out -> n832.formula2
n832.out -> n830.a
n7.out -> n836.assertion
n9.out -> n836.atom1
n11.out -> n838.a
n631.out -> n838.b
n631.out -> n839.a
n838.out -> n839.b
n839.out -> n836.formula1
n10.out -> n836.atom2
n633.out -> n836.formula2
n836.out -> n830.b
n830.out -> n829.a
n19.out -> n842.assertion
n9.out -> n842.atom1
n633.out -> n842.formula1
n10.out -> n842.atom2
n631.out -> n842.formula2
n23.out -> n842.atom3
n838.out -> n842.formula3
n842.out -> n829.b
n829.out -> n649.b
n649.out -> n647.a
n19.out -> n886.assertion
n9.out -> n886.atom1
n633.out -> n886.formula1
n10.out -> n886.atom2
n11.out -> n886.formula2
n23.out -> n886.atom3
n631.out -> n886.formula3
n886.out -> n647.b
n647.out -> n646.a
n7.out -> n891.assertion
n9.out -> n891.atom1
n633.out -> n893.a
n631.out -> n893.b
n637.out -> n894.a
n893.out -> n894.b
n894.out -> n891.formula1
n10.out -> n891.atom2
n11.out -> n891.formula2
n891.out -> n646.b
n646.out -> n645.a
n19.out -> n897.assertion
n9.out -> n897.atom1
n11.out -> n897.formula1
n10.out -> n897.atom2
n637.out -> n897.formula2
n23.out -> n897.atom3
n893.out -> n897.formula3
n897.out -> n645.b
n645.out -> n623.b
n623.out -> n622.a
n121.out -> n904.assertion
n9.out -> n904.atom1
n632.out -> n904.formula1
n10.out -> n904.atom2
n34.out -> n904.formula2
n904.out -> n902.a
n7.out -> n908.assertion
n9.out -> n908.atom1
n34.out -> n910.a
n632.out -> n910.b
n893.out -> n911.a
n910.out -> n911.b
n911.out -> n908.formula1
n10.out -> n908.atom2
n11.out -> n908.formula2
n908.out -> n902.b
n902.out -> n901.a
n19.out -> n914.assertion
n9.out -> n914.atom1
n11.out -> n914.formula1
n10.out -> n914.atom2
n893.out -> n914.formula2
n23.out -> n914.atom3
n910.out -> n914.formula3
n914.out -> n901.b
n901.out -> n622.b
n622.out -> n621.a
n19.out -> n919.assertion
n9.out -> n919.atom1
n11.out -> n919.formula1
n10.out -> n919.atom2
n34.out -> n919.formula2
n23.out -> n919.atom3
n632.out -> n919.formula3
n919.out -> n621.b
n621.out -> n3.b
n3.out -> n2.a
n121.out -> n924.assertion
n9.out -> n924.atom1
n10.out -> n924.formula1
n10.out -> n924.atom2
n631.out -> n924.formula2
n924.out -> n2.b
n2.out -> n927.assertion
n9.out -> n927.atom1
n253.out -> n927.formula1
n10.out -> n927.atom2
n10.out -> n930.a
n9.out -> n930.b
n930.out -> n927.formula2
n927.out -> n1.assertion
n1.out -> n931.proof
```

</details>

### 96 · 合取消去左

- 目标：`⊢ ( ( P ∧ Q ) → P )`
- 提示：P∧Q 给出 P。
- 参考解：102 个模块 / 312 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n367  target
n1  def-contract D⁻
n2  mp M
n3  mp M
n4  mp M
n7  axiom A1
n9  atom P
n11  not
n12  atom Q
n19  axiom A2
n23  atom R
n27  subst S
n31  not
n35  imp
n43  mp M
n44  mp M
n45  axiom A3
n46  subst S
n50  subst S
n52  imp
n53  imp
n56  subst S
n60  mp M
n61  mp M
n62  mp M
n67  subst S
n70  not
n71  not
n72  not
n76  imp
n84  mp M
n85  mp M
n86  mp M
n88  mp M
n89  mp M
n90  mp M
n111  subst S
n117  imp
n125  mp M
n126  mp M
n128  subst S
n132  subst S
n134  imp
n135  imp
n138  subst S
n142  mp M
n143  mp M
n144  mp M
n145  mp M
n147  subst S
n150  mp M
n152  subst S
n155  imp
n157  subst S
n161  mp M
n162  mp M
n166  mp M
n167  mp M
n188  subst S
n191  not
n192  not
n196  imp
n204  mp M
n205  mp M
n207  subst S
n211  subst S
n213  imp
n214  imp
n217  subst S
n222  subst S
n229  imp
n237  mp M
n238  mp M
n240  subst S
n244  subst S
n246  imp
n247  imp
n250  subst S
n255  subst S
n260  subst S
n264  subst S
n268  mp M
n269  mp M
n271  subst S
n275  subst S
n277  imp
n278  imp
n281  subst S
n325  subst S
n330  subst S
n332  imp
n333  imp
n336  subst S
n340  mp M
n341  mp M
n343  subst S
n347  subst S
n349  imp
n350  imp
n353  subst S
n358  subst S
n363  subst S
n365  subst S

wires:
n9.out -> n11.a
n7.out -> n27.assertion
n9.out -> n27.atom1
n11.out -> n27.formula1
n12.out -> n27.atom2
n12.out -> n31.a
n31.out -> n27.formula2
n31.out -> n35.a
n11.out -> n35.b
n27.out -> n4.a
n45.out -> n46.assertion
n9.out -> n46.atom1
n12.out -> n46.formula1
n12.out -> n46.atom2
n9.out -> n46.formula2
n46.out -> n44.a
n7.out -> n50.assertion
n9.out -> n50.atom1
n9.out -> n52.a
n12.out -> n52.b
n35.out -> n53.a
n52.out -> n53.b
n53.out -> n50.formula1
n12.out -> n50.atom2
n11.out -> n50.formula2
n50.out -> n44.b
n44.out -> n43.a
n19.out -> n56.assertion
n9.out -> n56.atom1
n11.out -> n56.formula1
n12.out -> n56.atom2
n35.out -> n56.formula2
n23.out -> n56.atom3
n52.out -> n56.formula3
n56.out -> n43.b
n43.out -> n4.b
n4.out -> n3.a
n7.out -> n67.assertion
n9.out -> n67.atom1
n11.out -> n67.formula1
n12.out -> n67.atom2
n52.out -> n70.a
n70.out -> n71.a
n71.out -> n72.a
n72.out -> n67.formula2
n72.out -> n76.a
n11.out -> n76.b
n67.out -> n62.a
n7.out -> n111.assertion
n9.out -> n111.atom1
n72.out -> n111.formula1
n12.out -> n111.atom2
n71.out -> n111.formula2
n71.out -> n117.a
n72.out -> n117.b
n111.out -> n90.a
n45.out -> n128.assertion
n9.out -> n128.atom1
n70.out -> n128.formula1
n12.out -> n128.atom2
n71.out -> n128.formula2
n128.out -> n126.a
n7.out -> n132.assertion
n9.out -> n132.atom1
n71.out -> n134.a
n70.out -> n134.b
n117.out -> n135.a
n134.out -> n135.b
n135.out -> n132.formula1
n12.out -> n132.atom2
n72.out -> n132.formula2
n132.out -> n126.b
n126.out -> n125.a
n19.out -> n138.assertion
n9.out -> n138.atom1
n72.out -> n138.formula1
n12.out -> n138.atom2
n117.out -> n138.formula2
n23.out -> n138.atom3
n134.out -> n138.formula3
n138.out -> n125.b
n125.out -> n90.b
n90.out -> n89.a
n7.out -> n147.assertion
n9.out -> n147.atom1
n134.out -> n147.formula1
n12.out -> n147.atom2
n134.out -> n147.formula2
n147.out -> n145.a
n7.out -> n152.assertion
n9.out -> n152.atom1
n134.out -> n152.formula1
n12.out -> n152.atom2
n134.out -> n155.a
n134.out -> n155.b
n155.out -> n152.formula2
n152.out -> n150.a
n19.out -> n157.assertion
n9.out -> n157.atom1
n134.out -> n157.formula1
n12.out -> n157.atom2
n155.out -> n157.formula2
n23.out -> n157.atom3
n134.out -> n157.formula3
n157.out -> n150.b
n150.out -> n145.b
n145.out -> n144.a
n7.out -> n188.assertion
n9.out -> n188.atom1
n71.out -> n188.formula1
n12.out -> n188.atom2
n134.out -> n191.a
n191.out -> n192.a
n192.out -> n188.formula2
n192.out -> n196.a
n71.out -> n196.b
n188.out -> n167.a
n45.out -> n207.assertion
n9.out -> n207.atom1
n191.out -> n207.formula1
n12.out -> n207.atom2
n70.out -> n207.formula2
n207.out -> n205.a
n7.out -> n211.assertion
n9.out -> n211.atom1
n70.out -> n213.a
n191.out -> n213.b
n196.out -> n214.a
n213.out -> n214.b
n214.out -> n211.formula1
n12.out -> n211.atom2
n71.out -> n211.formula2
n211.out -> n205.b
n205.out -> n204.a
n19.out -> n217.assertion
n9.out -> n217.atom1
n71.out -> n217.formula1
n12.out -> n217.atom2
n196.out -> n217.formula2
n23.out -> n217.atom3
n213.out -> n217.formula3
n217.out -> n204.b
n204.out -> n167.b
n167.out -> n166.a
n19.out -> n222.assertion
n9.out -> n222.atom1
n71.out -> n222.formula1
n12.out -> n222.atom2
n70.out -> n222.formula2
n23.out -> n222.atom3
n191.out -> n222.formula3
n222.out -> n166.b
n71.out -> n229.a
n191.out -> n229.b
n166.out -> n162.a
n45.out -> n240.assertion
n9.out -> n240.atom1
n70.out -> n240.formula1
n12.out -> n240.atom2
n134.out -> n240.formula2
n240.out -> n238.a
n7.out -> n244.assertion
n9.out -> n244.atom1
n134.out -> n246.a
n70.out -> n246.b
n229.out -> n247.a
n246.out -> n247.b
n247.out -> n244.formula1
n12.out -> n244.atom2
n134.out -> n244.formula2
n244.out -> n238.b
n238.out -> n237.a
n19.out -> n250.assertion
n9.out -> n250.atom1
n134.out -> n250.formula1
n12.out -> n250.atom2
n229.out -> n250.formula2
n23.out -> n250.atom3
n246.out -> n250.formula3
n250.out -> n237.b
n237.out -> n162.b
n162.out -> n161.a
n19.out -> n255.assertion
n9.out -> n255.atom1
n134.out -> n255.formula1
n12.out -> n255.atom2
n134.out -> n255.formula2
n23.out -> n255.atom3
n70.out -> n255.formula3
n255.out -> n161.b
n161.out -> n144.b
n144.out -> n143.a
n7.out -> n260.assertion
n9.out -> n260.atom1
n246.out -> n260.formula1
n12.out -> n260.atom2
n72.out -> n260.formula2
n260.out -> n143.b
n143.out -> n142.a
n19.out -> n264.assertion
n9.out -> n264.atom1
n72.out -> n264.formula1
n12.out -> n264.atom2
n134.out -> n264.formula2
n23.out -> n264.atom3
n70.out -> n264.formula3
n264.out -> n142.b
n142.out -> n89.b
n89.out -> n88.a
n7.out -> n271.assertion
n9.out -> n271.atom1
n70.out -> n271.formula1
n12.out -> n271.atom2
n11.out -> n271.formula2
n271.out -> n269.a
n7.out -> n275.assertion
n9.out -> n275.atom1
n11.out -> n277.a
n70.out -> n277.b
n70.out -> n278.a
n277.out -> n278.b
n278.out -> n275.formula1
n12.out -> n275.atom2
n72.out -> n275.formula2
n275.out -> n269.b
n269.out -> n268.a
n19.out -> n281.assertion
n9.out -> n281.atom1
n72.out -> n281.formula1
n12.out -> n281.atom2
n70.out -> n281.formula2
n23.out -> n281.atom3
n277.out -> n281.formula3
n281.out -> n268.b
n268.out -> n88.b
n88.out -> n86.a
n19.out -> n325.assertion
n9.out -> n325.atom1
n72.out -> n325.formula1
n12.out -> n325.atom2
n11.out -> n325.formula2
n23.out -> n325.atom3
n70.out -> n325.formula3
n325.out -> n86.b
n86.out -> n85.a
n7.out -> n330.assertion
n9.out -> n330.atom1
n72.out -> n332.a
n70.out -> n332.b
n76.out -> n333.a
n332.out -> n333.b
n333.out -> n330.formula1
n12.out -> n330.atom2
n11.out -> n330.formula2
n330.out -> n85.b
n85.out -> n84.a
n19.out -> n336.assertion
n9.out -> n336.atom1
n11.out -> n336.formula1
n12.out -> n336.atom2
n76.out -> n336.formula2
n23.out -> n336.atom3
n332.out -> n336.formula3
n336.out -> n84.b
n84.out -> n62.b
n62.out -> n61.a
n45.out -> n343.assertion
n9.out -> n343.atom1
n71.out -> n343.formula1
n12.out -> n343.atom2
n52.out -> n343.formula2
n343.out -> n341.a
n7.out -> n347.assertion
n9.out -> n347.atom1
n52.out -> n349.a
n71.out -> n349.b
n332.out -> n350.a
n349.out -> n350.b
n350.out -> n347.formula1
n12.out -> n347.atom2
n11.out -> n347.formula2
n347.out -> n341.b
n341.out -> n340.a
n19.out -> n353.assertion
n9.out -> n353.atom1
n11.out -> n353.formula1
n12.out -> n353.atom2
n332.out -> n353.formula2
n23.out -> n353.atom3
n349.out -> n353.formula3
n353.out -> n340.b
n340.out -> n61.b
n61.out -> n60.a
n19.out -> n358.assertion
n9.out -> n358.atom1
n11.out -> n358.formula1
n12.out -> n358.atom2
n52.out -> n358.formula2
n23.out -> n358.atom3
n71.out -> n358.formula3
n358.out -> n60.b
n60.out -> n3.b
n3.out -> n2.a
n45.out -> n363.assertion
n12.out -> n363.atom1
n70.out -> n363.formula1
n363.out -> n2.b
n2.out -> n365.assertion
n12.out -> n365.atom1
n31.out -> n365.formula1
n365.out -> n1.assertion
n1.out -> n367.proof
```

</details>

### 97 · 等值消去左

- 目标：`⊢ ( ( P ↔ Q ) → ( P → Q ) )`
- 提示：A↔B 给出 A→B。
- 参考解：104 个模块 / 317 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n370  target
n1  def-contract D⁻
n2  mp M
n3  mp M
n4  mp M
n7  axiom A1
n9  atom P
n11  not
n12  atom Q
n19  axiom A2
n23  atom R
n27  subst S
n31  not
n35  imp
n43  mp M
n44  mp M
n45  axiom A3
n46  subst S
n50  subst S
n52  imp
n53  imp
n56  subst S
n60  mp M
n61  mp M
n62  mp M
n67  subst S
n70  not
n71  not
n72  not
n76  imp
n84  mp M
n85  mp M
n86  mp M
n88  mp M
n89  mp M
n90  mp M
n111  subst S
n117  imp
n125  mp M
n126  mp M
n128  subst S
n132  subst S
n134  imp
n135  imp
n138  subst S
n142  mp M
n143  mp M
n144  mp M
n145  mp M
n147  subst S
n150  mp M
n152  subst S
n155  imp
n157  subst S
n161  mp M
n162  mp M
n166  mp M
n167  mp M
n188  subst S
n191  not
n192  not
n196  imp
n204  mp M
n205  mp M
n207  subst S
n211  subst S
n213  imp
n214  imp
n217  subst S
n222  subst S
n229  imp
n237  mp M
n238  mp M
n240  subst S
n244  subst S
n246  imp
n247  imp
n250  subst S
n255  subst S
n260  subst S
n264  subst S
n268  mp M
n269  mp M
n271  subst S
n275  subst S
n277  imp
n278  imp
n281  subst S
n325  subst S
n330  subst S
n332  imp
n333  imp
n336  subst S
n340  mp M
n341  mp M
n343  subst S
n347  subst S
n349  imp
n350  imp
n353  subst S
n358  subst S
n363  subst S
n365  subst S
n368  imp
n369  not

wires:
n9.out -> n11.a
n7.out -> n27.assertion
n9.out -> n27.atom1
n11.out -> n27.formula1
n12.out -> n27.atom2
n12.out -> n31.a
n31.out -> n27.formula2
n31.out -> n35.a
n11.out -> n35.b
n27.out -> n4.a
n45.out -> n46.assertion
n9.out -> n46.atom1
n12.out -> n46.formula1
n12.out -> n46.atom2
n9.out -> n46.formula2
n46.out -> n44.a
n7.out -> n50.assertion
n9.out -> n50.atom1
n9.out -> n52.a
n12.out -> n52.b
n35.out -> n53.a
n52.out -> n53.b
n53.out -> n50.formula1
n12.out -> n50.atom2
n11.out -> n50.formula2
n50.out -> n44.b
n44.out -> n43.a
n19.out -> n56.assertion
n9.out -> n56.atom1
n11.out -> n56.formula1
n12.out -> n56.atom2
n35.out -> n56.formula2
n23.out -> n56.atom3
n52.out -> n56.formula3
n56.out -> n43.b
n43.out -> n4.b
n4.out -> n3.a
n7.out -> n67.assertion
n9.out -> n67.atom1
n11.out -> n67.formula1
n12.out -> n67.atom2
n52.out -> n70.a
n70.out -> n71.a
n71.out -> n72.a
n72.out -> n67.formula2
n72.out -> n76.a
n11.out -> n76.b
n67.out -> n62.a
n7.out -> n111.assertion
n9.out -> n111.atom1
n72.out -> n111.formula1
n12.out -> n111.atom2
n71.out -> n111.formula2
n71.out -> n117.a
n72.out -> n117.b
n111.out -> n90.a
n45.out -> n128.assertion
n9.out -> n128.atom1
n70.out -> n128.formula1
n12.out -> n128.atom2
n71.out -> n128.formula2
n128.out -> n126.a
n7.out -> n132.assertion
n9.out -> n132.atom1
n71.out -> n134.a
n70.out -> n134.b
n117.out -> n135.a
n134.out -> n135.b
n135.out -> n132.formula1
n12.out -> n132.atom2
n72.out -> n132.formula2
n132.out -> n126.b
n126.out -> n125.a
n19.out -> n138.assertion
n9.out -> n138.atom1
n72.out -> n138.formula1
n12.out -> n138.atom2
n117.out -> n138.formula2
n23.out -> n138.atom3
n134.out -> n138.formula3
n138.out -> n125.b
n125.out -> n90.b
n90.out -> n89.a
n7.out -> n147.assertion
n9.out -> n147.atom1
n134.out -> n147.formula1
n12.out -> n147.atom2
n134.out -> n147.formula2
n147.out -> n145.a
n7.out -> n152.assertion
n9.out -> n152.atom1
n134.out -> n152.formula1
n12.out -> n152.atom2
n134.out -> n155.a
n134.out -> n155.b
n155.out -> n152.formula2
n152.out -> n150.a
n19.out -> n157.assertion
n9.out -> n157.atom1
n134.out -> n157.formula1
n12.out -> n157.atom2
n155.out -> n157.formula2
n23.out -> n157.atom3
n134.out -> n157.formula3
n157.out -> n150.b
n150.out -> n145.b
n145.out -> n144.a
n7.out -> n188.assertion
n9.out -> n188.atom1
n71.out -> n188.formula1
n12.out -> n188.atom2
n134.out -> n191.a
n191.out -> n192.a
n192.out -> n188.formula2
n192.out -> n196.a
n71.out -> n196.b
n188.out -> n167.a
n45.out -> n207.assertion
n9.out -> n207.atom1
n191.out -> n207.formula1
n12.out -> n207.atom2
n70.out -> n207.formula2
n207.out -> n205.a
n7.out -> n211.assertion
n9.out -> n211.atom1
n70.out -> n213.a
n191.out -> n213.b
n196.out -> n214.a
n213.out -> n214.b
n214.out -> n211.formula1
n12.out -> n211.atom2
n71.out -> n211.formula2
n211.out -> n205.b
n205.out -> n204.a
n19.out -> n217.assertion
n9.out -> n217.atom1
n71.out -> n217.formula1
n12.out -> n217.atom2
n196.out -> n217.formula2
n23.out -> n217.atom3
n213.out -> n217.formula3
n217.out -> n204.b
n204.out -> n167.b
n167.out -> n166.a
n19.out -> n222.assertion
n9.out -> n222.atom1
n71.out -> n222.formula1
n12.out -> n222.atom2
n70.out -> n222.formula2
n23.out -> n222.atom3
n191.out -> n222.formula3
n222.out -> n166.b
n71.out -> n229.a
n191.out -> n229.b
n166.out -> n162.a
n45.out -> n240.assertion
n9.out -> n240.atom1
n70.out -> n240.formula1
n12.out -> n240.atom2
n134.out -> n240.formula2
n240.out -> n238.a
n7.out -> n244.assertion
n9.out -> n244.atom1
n134.out -> n246.a
n70.out -> n246.b
n229.out -> n247.a
n246.out -> n247.b
n247.out -> n244.formula1
n12.out -> n244.atom2
n134.out -> n244.formula2
n244.out -> n238.b
n238.out -> n237.a
n19.out -> n250.assertion
n9.out -> n250.atom1
n134.out -> n250.formula1
n12.out -> n250.atom2
n229.out -> n250.formula2
n23.out -> n250.atom3
n246.out -> n250.formula3
n250.out -> n237.b
n237.out -> n162.b
n162.out -> n161.a
n19.out -> n255.assertion
n9.out -> n255.atom1
n134.out -> n255.formula1
n12.out -> n255.atom2
n134.out -> n255.formula2
n23.out -> n255.atom3
n70.out -> n255.formula3
n255.out -> n161.b
n161.out -> n144.b
n144.out -> n143.a
n7.out -> n260.assertion
n9.out -> n260.atom1
n246.out -> n260.formula1
n12.out -> n260.atom2
n72.out -> n260.formula2
n260.out -> n143.b
n143.out -> n142.a
n19.out -> n264.assertion
n9.out -> n264.atom1
n72.out -> n264.formula1
n12.out -> n264.atom2
n134.out -> n264.formula2
n23.out -> n264.atom3
n70.out -> n264.formula3
n264.out -> n142.b
n142.out -> n89.b
n89.out -> n88.a
n7.out -> n271.assertion
n9.out -> n271.atom1
n70.out -> n271.formula1
n12.out -> n271.atom2
n11.out -> n271.formula2
n271.out -> n269.a
n7.out -> n275.assertion
n9.out -> n275.atom1
n11.out -> n277.a
n70.out -> n277.b
n70.out -> n278.a
n277.out -> n278.b
n278.out -> n275.formula1
n12.out -> n275.atom2
n72.out -> n275.formula2
n275.out -> n269.b
n269.out -> n268.a
n19.out -> n281.assertion
n9.out -> n281.atom1
n72.out -> n281.formula1
n12.out -> n281.atom2
n70.out -> n281.formula2
n23.out -> n281.atom3
n277.out -> n281.formula3
n281.out -> n268.b
n268.out -> n88.b
n88.out -> n86.a
n19.out -> n325.assertion
n9.out -> n325.atom1
n72.out -> n325.formula1
n12.out -> n325.atom2
n11.out -> n325.formula2
n23.out -> n325.atom3
n70.out -> n325.formula3
n325.out -> n86.b
n86.out -> n85.a
n7.out -> n330.assertion
n9.out -> n330.atom1
n72.out -> n332.a
n70.out -> n332.b
n76.out -> n333.a
n332.out -> n333.b
n333.out -> n330.formula1
n12.out -> n330.atom2
n11.out -> n330.formula2
n330.out -> n85.b
n85.out -> n84.a
n19.out -> n336.assertion
n9.out -> n336.atom1
n11.out -> n336.formula1
n12.out -> n336.atom2
n76.out -> n336.formula2
n23.out -> n336.atom3
n332.out -> n336.formula3
n336.out -> n84.b
n84.out -> n62.b
n62.out -> n61.a
n45.out -> n343.assertion
n9.out -> n343.atom1
n71.out -> n343.formula1
n12.out -> n343.atom2
n52.out -> n343.formula2
n343.out -> n341.a
n7.out -> n347.assertion
n9.out -> n347.atom1
n52.out -> n349.a
n71.out -> n349.b
n332.out -> n350.a
n349.out -> n350.b
n350.out -> n347.formula1
n12.out -> n347.atom2
n11.out -> n347.formula2
n347.out -> n341.b
n341.out -> n340.a
n19.out -> n353.assertion
n9.out -> n353.atom1
n11.out -> n353.formula1
n12.out -> n353.atom2
n332.out -> n353.formula2
n23.out -> n353.atom3
n349.out -> n353.formula3
n353.out -> n340.b
n340.out -> n61.b
n61.out -> n60.a
n19.out -> n358.assertion
n9.out -> n358.atom1
n11.out -> n358.formula1
n12.out -> n358.atom2
n52.out -> n358.formula2
n23.out -> n358.atom3
n71.out -> n358.formula3
n358.out -> n60.b
n60.out -> n3.b
n3.out -> n2.a
n45.out -> n363.assertion
n12.out -> n363.atom1
n70.out -> n363.formula1
n363.out -> n2.b
n2.out -> n365.assertion
n9.out -> n365.atom1
n52.out -> n365.formula1
n12.out -> n365.atom2
n12.out -> n368.a
n9.out -> n368.b
n368.out -> n369.a
n369.out -> n365.formula2
n365.out -> n1.assertion
n1.out -> n370.proof
```

</details>

### 98 · 分情况一

- 目标：`⊢ ( ( ¬ P → Q ) → ( ( P → Q ) → Q ) )`
- 提示：(¬P→Q)→(P→Q)→Q
- 参考解：111 个模块 / 332 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n288  target
n1  mp M
n3  theorem *00
n4  subst S
n5  atom P
n7  not
n8  atom Q
n9  imp
n12  axiom A1
n13  subst S
n16  imp
n20  imp
n23  axiom A2
n27  atom R
n28  mp M
n29  mp M
n30  mp M
n31  mp M
n33  subst S
n35  mp M
n36  mp M
n37  mp M
n38  mp M
n39  mp M
n40  mp M
n41  mp M
n42  mp M
n50  subst S
n56  imp
n64  mp M
n65  mp M
n66  mp M
n68  subst S
n73  subst S
n75  imp
n76  imp
n79  subst S
n84  subst S
n86  imp
n88  mp M
n89  mp M
n90  mp M
n91  mp M
n92  theorem *64
n93  subst S
n96  subst S
n98  not
n99  not
n100  imp
n103  subst S
n108  subst S
n110  imp
n111  imp
n114  subst S
n118  mp M
n119  mp M
n120  theorem *v
n121  subst S
n124  subst S
n126  imp
n127  imp
n130  subst S
n134  mp M
n135  mp M
n136  mp M
n137  mp M
n138  mp M
n147  subst S
n153  imp
n178  subst S
n182  subst S
n184  mp M
n185  mp M
n187  subst S
n189  imp
n192  subst S
n194  imp
n195  imp
n198  subst S
n202  mp M
n203  mp M
n205  subst S
n210  subst S
n212  imp
n213  imp
n214  imp
n217  subst S
n222  subst S
n226  mp M
n227  mp M
n228  mp M
n229  theorem *04
n230  subst S
n233  not
n235  subst S
n240  subst S
n242  imp
n243  imp
n246  subst S
n250  mp M
n251  mp M
n253  subst S
n257  subst S
n259  imp
n260  imp
n263  subst S
n268  subst S
n273  subst S
n278  subst S
n280  imp
n281  imp
n284  subst S

wires:
n3.out -> n4.assertion
n5.out -> n4.atom1
n5.out -> n7.a
n7.out -> n9.a
n8.out -> n9.b
n9.out -> n4.formula1
n12.out -> n13.assertion
n5.out -> n13.atom1
n9.out -> n13.formula1
n8.out -> n13.atom2
n5.out -> n16.a
n8.out -> n16.b
n16.out -> n13.formula2
n16.out -> n20.a
n9.out -> n20.b
n13.out -> n1.a
n3.out -> n33.assertion
n5.out -> n33.atom1
n16.out -> n33.formula1
n33.out -> n31.a
n12.out -> n50.assertion
n5.out -> n50.atom1
n7.out -> n50.formula1
n8.out -> n50.atom2
n9.out -> n50.formula2
n9.out -> n56.a
n7.out -> n56.b
n50.out -> n42.a
n4.out -> n66.a
n23.out -> n68.assertion
n5.out -> n68.atom1
n9.out -> n68.formula1
n8.out -> n68.atom2
n7.out -> n68.formula2
n27.out -> n68.atom3
n8.out -> n68.formula3
n68.out -> n66.b
n66.out -> n65.a
n12.out -> n73.assertion
n5.out -> n73.atom1
n9.out -> n75.a
n8.out -> n75.b
n56.out -> n76.a
n75.out -> n76.b
n76.out -> n73.formula1
n8.out -> n73.atom2
n7.out -> n73.formula2
n73.out -> n65.b
n65.out -> n64.a
n23.out -> n79.assertion
n5.out -> n79.atom1
n7.out -> n79.formula1
n8.out -> n79.atom2
n56.out -> n79.formula2
n27.out -> n79.atom3
n75.out -> n79.formula3
n79.out -> n64.b
n64.out -> n42.b
n42.out -> n41.a
n12.out -> n84.assertion
n5.out -> n84.atom1
n7.out -> n86.a
n75.out -> n86.b
n86.out -> n84.formula1
n8.out -> n84.atom2
n16.out -> n84.formula2
n84.out -> n41.b
n41.out -> n40.a
n92.out -> n93.assertion
n5.out -> n93.atom1
n75.out -> n93.formula1
n93.out -> n91.a
n12.out -> n96.assertion
n5.out -> n96.atom1
n75.out -> n98.a
n98.out -> n99.a
n75.out -> n100.a
n99.out -> n100.b
n100.out -> n96.formula1
n8.out -> n96.atom2
n7.out -> n96.formula2
n96.out -> n91.b
n91.out -> n90.a
n23.out -> n103.assertion
n5.out -> n103.atom1
n7.out -> n103.formula1
n8.out -> n103.atom2
n75.out -> n103.formula2
n27.out -> n103.atom3
n99.out -> n103.formula3
n103.out -> n90.b
n90.out -> n89.a
n12.out -> n108.assertion
n5.out -> n108.atom1
n7.out -> n110.a
n99.out -> n110.b
n86.out -> n111.a
n110.out -> n111.b
n111.out -> n108.formula1
n8.out -> n108.atom2
n16.out -> n108.formula2
n108.out -> n89.b
n89.out -> n88.a
n23.out -> n114.assertion
n5.out -> n114.atom1
n16.out -> n114.formula1
n8.out -> n114.atom2
n86.out -> n114.formula2
n27.out -> n114.atom3
n110.out -> n114.formula3
n114.out -> n88.b
n88.out -> n40.b
n40.out -> n39.a
n120.out -> n121.assertion
n8.out -> n121.atom1
n98.out -> n121.formula1
n121.out -> n119.a
n12.out -> n124.assertion
n5.out -> n124.atom1
n98.out -> n126.a
n5.out -> n126.b
n110.out -> n127.a
n126.out -> n127.b
n127.out -> n124.formula1
n8.out -> n124.atom2
n16.out -> n124.formula2
n124.out -> n119.b
n119.out -> n118.a
n23.out -> n130.assertion
n5.out -> n130.atom1
n16.out -> n130.formula1
n8.out -> n130.atom2
n110.out -> n130.formula2
n27.out -> n130.atom3
n126.out -> n130.formula3
n130.out -> n118.b
n118.out -> n39.b
n39.out -> n38.a
n12.out -> n147.assertion
n5.out -> n147.atom1
n8.out -> n147.formula1
n8.out -> n147.atom2
n9.out -> n147.formula2
n8.out -> n153.a
n75.out -> n153.b
n147.out -> n138.a
n12.out -> n178.assertion
n5.out -> n178.atom1
n153.out -> n178.formula1
n8.out -> n178.atom2
n5.out -> n178.formula2
n178.out -> n138.b
n138.out -> n137.a
n23.out -> n182.assertion
n27.out -> n182.atom1
n75.out -> n182.formula1
n182.out -> n137.b
n137.out -> n136.a
n12.out -> n187.assertion
n5.out -> n187.atom1
n5.out -> n189.a
n75.out -> n189.b
n189.out -> n187.formula1
n8.out -> n187.atom2
n98.out -> n187.formula2
n187.out -> n185.a
n12.out -> n192.assertion
n5.out -> n192.atom1
n98.out -> n194.a
n189.out -> n194.b
n189.out -> n195.a
n194.out -> n195.b
n195.out -> n192.formula1
n8.out -> n192.atom2
n16.out -> n192.formula2
n192.out -> n185.b
n185.out -> n184.a
n23.out -> n198.assertion
n5.out -> n198.atom1
n16.out -> n198.formula1
n8.out -> n198.atom2
n189.out -> n198.formula2
n27.out -> n198.atom3
n194.out -> n198.formula3
n198.out -> n184.b
n184.out -> n136.b
n136.out -> n135.a
n23.out -> n205.assertion
n5.out -> n205.atom1
n98.out -> n205.formula1
n8.out -> n205.atom2
n5.out -> n205.formula2
n27.out -> n205.atom3
n75.out -> n205.formula3
n205.out -> n203.a
n12.out -> n210.assertion
n5.out -> n210.atom1
n98.out -> n212.a
n75.out -> n212.b
n126.out -> n213.a
n212.out -> n213.b
n194.out -> n214.a
n213.out -> n214.b
n214.out -> n210.formula1
n8.out -> n210.atom2
n16.out -> n210.formula2
n210.out -> n203.b
n203.out -> n202.a
n23.out -> n217.assertion
n5.out -> n217.atom1
n16.out -> n217.formula1
n8.out -> n217.atom2
n194.out -> n217.formula2
n27.out -> n217.atom3
n213.out -> n217.formula3
n217.out -> n202.b
n202.out -> n135.b
n135.out -> n134.a
n23.out -> n222.assertion
n5.out -> n222.atom1
n16.out -> n222.formula1
n8.out -> n222.atom2
n126.out -> n222.formula2
n27.out -> n222.atom3
n212.out -> n222.formula3
n222.out -> n134.b
n134.out -> n38.b
n38.out -> n37.a
n229.out -> n230.assertion
n5.out -> n230.atom1
n75.out -> n230.formula1
n8.out -> n230.atom2
n16.out -> n233.a
n233.out -> n230.formula2
n230.out -> n228.a
n23.out -> n235.assertion
n5.out -> n235.atom1
n98.out -> n235.formula1
n8.out -> n235.atom2
n75.out -> n235.formula2
n27.out -> n235.atom3
n233.out -> n235.formula3
n235.out -> n228.b
n228.out -> n227.a
n12.out -> n240.assertion
n5.out -> n240.atom1
n98.out -> n242.a
n233.out -> n242.b
n212.out -> n243.a
n242.out -> n243.b
n243.out -> n240.formula1
n8.out -> n240.atom2
n16.out -> n240.formula2
n240.out -> n227.b
n227.out -> n226.a
n23.out -> n246.assertion
n5.out -> n246.atom1
n16.out -> n246.formula1
n8.out -> n246.atom2
n212.out -> n246.formula2
n27.out -> n246.atom3
n242.out -> n246.formula3
n246.out -> n226.b
n226.out -> n37.b
n37.out -> n36.a
n120.out -> n253.assertion
n5.out -> n253.atom1
n75.out -> n253.formula1
n8.out -> n253.atom2
n16.out -> n253.formula2
n253.out -> n251.a
n12.out -> n257.assertion
n5.out -> n257.atom1
n16.out -> n259.a
n75.out -> n259.b
n242.out -> n260.a
n259.out -> n260.b
n260.out -> n257.formula1
n8.out -> n257.atom2
n16.out -> n257.formula2
n257.out -> n251.b
n251.out -> n250.a
n23.out -> n263.assertion
n5.out -> n263.atom1
n16.out -> n263.formula1
n8.out -> n263.atom2
n242.out -> n263.formula2
n27.out -> n263.atom3
n259.out -> n263.formula3
n263.out -> n250.b
n250.out -> n36.b
n36.out -> n35.a
n23.out -> n268.assertion
n5.out -> n268.atom1
n16.out -> n268.formula1
n8.out -> n268.atom2
n16.out -> n268.formula2
n27.out -> n268.atom3
n75.out -> n268.formula3
n268.out -> n35.b
n35.out -> n31.b
n31.out -> n30.a
n23.out -> n273.assertion
n5.out -> n273.atom1
n16.out -> n273.formula1
n8.out -> n273.atom2
n9.out -> n273.formula2
n27.out -> n273.atom3
n8.out -> n273.formula3
n273.out -> n30.b
n30.out -> n29.a
n12.out -> n278.assertion
n5.out -> n278.atom1
n16.out -> n280.a
n8.out -> n280.b
n20.out -> n281.a
n280.out -> n281.b
n281.out -> n278.formula1
n8.out -> n278.atom2
n9.out -> n278.formula2
n278.out -> n29.b
n29.out -> n28.a
n23.out -> n284.assertion
n5.out -> n284.atom1
n9.out -> n284.formula1
n8.out -> n284.atom2
n20.out -> n284.formula2
n27.out -> n284.atom3
n280.out -> n284.formula3
n284.out -> n28.b
n28.out -> n1.b
n1.out -> n288.proof
```

</details>

### 99 · 矛盾消去

- 目标：`⊢ ( ( P → Q ) → ( ( P → ¬ Q ) → ¬ P ) )`
- 提示：(P→Q)→(P→¬Q)→¬P
- 参考解：112 个模块 / 332 条接线

<details><summary>展开参考电路</summary>

```text
modules:
n296  target
n1  mp M
n3  theorem *00
n5  atom P
n7  atom Q
n8  imp
n11  axiom A1
n12  subst S
n15  not
n16  imp
n20  imp
n23  axiom A2
n27  atom R
n28  mp M
n29  mp M
n30  mp M
n31  mp M
n33  subst S
n35  mp M
n36  mp M
n37  mp M
n38  mp M
n39  mp M
n40  mp M
n41  mp M
n47  not
n51  subst S
n57  imp
n58  imp
n88  subst S
n91  mp M
n92  mp M
n93  mp M
n94  mp M
n95  theorem *64
n96  subst S
n99  subst S
n101  not
n102  not
n103  imp
n106  subst S
n111  subst S
n113  imp
n114  imp
n117  subst S
n121  mp M
n122  mp M
n123  theorem *v
n124  subst S
n127  subst S
n129  imp
n130  imp
n133  subst S
n137  mp M
n138  mp M
n139  mp M
n140  mp M
n141  mp M
n142  mp M
n150  subst S
n156  imp
n164  mp M
n165  mp M
n166  mp M
n167  theorem *88
n169  subst S
n174  subst S
n176  imp
n179  subst S
n184  subst S
n186  imp
n189  subst S
n192  mp M
n193  mp M
n195  subst S
n197  imp
n200  subst S
n202  imp
n203  imp
n206  subst S
n210  mp M
n211  mp M
n213  subst S
n218  subst S
n220  imp
n221  imp
n222  imp
n225  subst S
n230  subst S
n234  mp M
n235  mp M
n236  mp M
n237  theorem *04
n238  subst S
n241  not
n243  subst S
n248  subst S
n250  imp
n251  imp
n254  subst S
n258  mp M
n259  mp M
n261  subst S
n265  subst S
n267  imp
n268  imp
n271  subst S
n276  subst S
n281  subst S
n286  subst S
n288  imp
n289  imp
n292  subst S

wires:
n5.out -> n8.a
n7.out -> n8.b
n11.out -> n12.assertion
n5.out -> n12.atom1
n8.out -> n12.formula1
n7.out -> n12.atom2
n7.out -> n15.a
n5.out -> n16.a
n15.out -> n16.b
n16.out -> n12.formula2
n16.out -> n20.a
n8.out -> n20.b
n12.out -> n1.a
n3.out -> n33.assertion
n5.out -> n33.atom1
n16.out -> n33.formula1
n33.out -> n31.a
n5.out -> n47.a
n11.out -> n51.assertion
n5.out -> n51.atom1
n47.out -> n51.formula1
n7.out -> n51.atom2
n8.out -> n51.formula2
n8.out -> n57.a
n47.out -> n57.b
n47.out -> n58.a
n57.out -> n58.b
n51.out -> n41.a
n11.out -> n88.assertion
n5.out -> n88.atom1
n58.out -> n88.formula1
n7.out -> n88.atom2
n16.out -> n88.formula2
n88.out -> n41.b
n41.out -> n40.a
n95.out -> n96.assertion
n5.out -> n96.atom1
n57.out -> n96.formula1
n96.out -> n94.a
n11.out -> n99.assertion
n5.out -> n99.atom1
n57.out -> n101.a
n101.out -> n102.a
n57.out -> n103.a
n102.out -> n103.b
n103.out -> n99.formula1
n7.out -> n99.atom2
n47.out -> n99.formula2
n99.out -> n94.b
n94.out -> n93.a
n23.out -> n106.assertion
n5.out -> n106.atom1
n47.out -> n106.formula1
n7.out -> n106.atom2
n57.out -> n106.formula2
n27.out -> n106.atom3
n102.out -> n106.formula3
n106.out -> n93.b
n93.out -> n92.a
n11.out -> n111.assertion
n5.out -> n111.atom1
n47.out -> n113.a
n102.out -> n113.b
n58.out -> n114.a
n113.out -> n114.b
n114.out -> n111.formula1
n7.out -> n111.atom2
n16.out -> n111.formula2
n111.out -> n92.b
n92.out -> n91.a
n23.out -> n117.assertion
n5.out -> n117.atom1
n16.out -> n117.formula1
n7.out -> n117.atom2
n58.out -> n117.formula2
n27.out -> n117.atom3
n113.out -> n117.formula3
n117.out -> n91.b
n91.out -> n40.b
n40.out -> n39.a
n123.out -> n124.assertion
n7.out -> n124.atom1
n101.out -> n124.formula1
n124.out -> n122.a
n11.out -> n127.assertion
n5.out -> n127.atom1
n101.out -> n129.a
n5.out -> n129.b
n113.out -> n130.a
n129.out -> n130.b
n130.out -> n127.formula1
n7.out -> n127.atom2
n16.out -> n127.formula2
n127.out -> n122.b
n122.out -> n121.a
n23.out -> n133.assertion
n5.out -> n133.atom1
n16.out -> n133.formula1
n7.out -> n133.atom2
n113.out -> n133.formula2
n27.out -> n133.atom3
n129.out -> n133.formula3
n133.out -> n121.b
n121.out -> n39.b
n39.out -> n38.a
n11.out -> n150.assertion
n5.out -> n150.atom1
n15.out -> n150.formula1
n7.out -> n150.atom2
n8.out -> n150.formula2
n8.out -> n156.a
n15.out -> n156.b
n150.out -> n142.a
n167.out -> n166.a
n23.out -> n169.assertion
n5.out -> n169.atom1
n8.out -> n169.formula1
n7.out -> n169.atom2
n15.out -> n169.formula2
n27.out -> n169.atom3
n47.out -> n169.formula3
n169.out -> n166.b
n166.out -> n165.a
n11.out -> n174.assertion
n5.out -> n174.atom1
n156.out -> n176.a
n57.out -> n176.b
n176.out -> n174.formula1
n7.out -> n174.atom2
n15.out -> n174.formula2
n174.out -> n165.b
n165.out -> n164.a
n23.out -> n179.assertion
n5.out -> n179.atom1
n15.out -> n179.formula1
n7.out -> n179.atom2
n156.out -> n179.formula2
n27.out -> n179.atom3
n57.out -> n179.formula3
n179.out -> n164.b
n164.out -> n142.b
n142.out -> n141.a
n11.out -> n184.assertion
n5.out -> n184.atom1
n15.out -> n186.a
n57.out -> n186.b
n186.out -> n184.formula1
n7.out -> n184.atom2
n5.out -> n184.formula2
n184.out -> n141.b
n141.out -> n140.a
n23.out -> n189.assertion
n7.out -> n189.atom1
n15.out -> n189.formula1
n27.out -> n189.atom2
n57.out -> n189.formula2
n189.out -> n140.b
n140.out -> n139.a
n11.out -> n195.assertion
n5.out -> n195.atom1
n5.out -> n197.a
n57.out -> n197.b
n197.out -> n195.formula1
n7.out -> n195.atom2
n101.out -> n195.formula2
n195.out -> n193.a
n11.out -> n200.assertion
n5.out -> n200.atom1
n101.out -> n202.a
n197.out -> n202.b
n197.out -> n203.a
n202.out -> n203.b
n203.out -> n200.formula1
n7.out -> n200.atom2
n16.out -> n200.formula2
n200.out -> n193.b
n193.out -> n192.a
n23.out -> n206.assertion
n5.out -> n206.atom1
n16.out -> n206.formula1
n7.out -> n206.atom2
n197.out -> n206.formula2
n27.out -> n206.atom3
n202.out -> n206.formula3
n206.out -> n192.b
n192.out -> n139.b
n139.out -> n138.a
n23.out -> n213.assertion
n5.out -> n213.atom1
n101.out -> n213.formula1
n7.out -> n213.atom2
n5.out -> n213.formula2
n27.out -> n213.atom3
n57.out -> n213.formula3
n213.out -> n211.a
n11.out -> n218.assertion
n5.out -> n218.atom1
n101.out -> n220.a
n57.out -> n220.b
n129.out -> n221.a
n220.out -> n221.b
n202.out -> n222.a
n221.out -> n222.b
n222.out -> n218.formula1
n7.out -> n218.atom2
n16.out -> n218.formula2
n218.out -> n211.b
n211.out -> n210.a
n23.out -> n225.assertion
n5.out -> n225.atom1
n16.out -> n225.formula1
n7.out -> n225.atom2
n202.out -> n225.formula2
n27.out -> n225.atom3
n221.out -> n225.formula3
n225.out -> n210.b
n210.out -> n138.b
n138.out -> n137.a
n23.out -> n230.assertion
n5.out -> n230.atom1
n16.out -> n230.formula1
n7.out -> n230.atom2
n129.out -> n230.formula2
n27.out -> n230.atom3
n220.out -> n230.formula3
n230.out -> n137.b
n137.out -> n38.b
n38.out -> n37.a
n237.out -> n238.assertion
n5.out -> n238.atom1
n57.out -> n238.formula1
n7.out -> n238.atom2
n16.out -> n241.a
n241.out -> n238.formula2
n238.out -> n236.a
n23.out -> n243.assertion
n5.out -> n243.atom1
n101.out -> n243.formula1
n7.out -> n243.atom2
n57.out -> n243.formula2
n27.out -> n243.atom3
n241.out -> n243.formula3
n243.out -> n236.b
n236.out -> n235.a
n11.out -> n248.assertion
n5.out -> n248.atom1
n101.out -> n250.a
n241.out -> n250.b
n220.out -> n251.a
n250.out -> n251.b
n251.out -> n248.formula1
n7.out -> n248.atom2
n16.out -> n248.formula2
n248.out -> n235.b
n235.out -> n234.a
n23.out -> n254.assertion
n5.out -> n254.atom1
n16.out -> n254.formula1
n7.out -> n254.atom2
n220.out -> n254.formula2
n27.out -> n254.atom3
n250.out -> n254.formula3
n254.out -> n234.b
n234.out -> n37.b
n37.out -> n36.a
n123.out -> n261.assertion
n5.out -> n261.atom1
n57.out -> n261.formula1
n7.out -> n261.atom2
n16.out -> n261.formula2
n261.out -> n259.a
n11.out -> n265.assertion
n5.out -> n265.atom1
n16.out -> n267.a
n57.out -> n267.b
n250.out -> n268.a
n267.out -> n268.b
n268.out -> n265.formula1
n7.out -> n265.atom2
n16.out -> n265.formula2
n265.out -> n259.b
n259.out -> n258.a
n23.out -> n271.assertion
n5.out -> n271.atom1
n16.out -> n271.formula1
n7.out -> n271.atom2
n250.out -> n271.formula2
n27.out -> n271.atom3
n267.out -> n271.formula3
n271.out -> n258.b
n258.out -> n36.b
n36.out -> n35.a
n23.out -> n276.assertion
n5.out -> n276.atom1
n16.out -> n276.formula1
n7.out -> n276.atom2
n16.out -> n276.formula2
n27.out -> n276.atom3
n57.out -> n276.formula3
n276.out -> n35.b
n35.out -> n31.b
n31.out -> n30.a
n23.out -> n281.assertion
n5.out -> n281.atom1
n16.out -> n281.formula1
n7.out -> n281.atom2
n8.out -> n281.formula2
n27.out -> n281.atom3
n47.out -> n281.formula3
n281.out -> n30.b
n30.out -> n29.a
n11.out -> n286.assertion
n5.out -> n286.atom1
n16.out -> n288.a
n47.out -> n288.b
n20.out -> n289.a
n288.out -> n289.b
n289.out -> n286.formula1
n7.out -> n286.atom2
n8.out -> n286.formula2
n286.out -> n29.b
n29.out -> n28.a
n23.out -> n292.assertion
n5.out -> n292.atom1
n8.out -> n292.formula1
n7.out -> n292.atom2
n20.out -> n292.formula2
n27.out -> n292.atom3
n288.out -> n292.formula3
n292.out -> n28.b
n28.out -> n1.b
n1.out -> n296.proof
```

</details>
