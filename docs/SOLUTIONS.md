# 公理板 · 152 关参考解法清单

> 由 `scripts/export-solutions.js` 从 `src/levels.js` 自动生成。每个参考电路都先经过真实 Engine 求值验证；
> 清单里的模块按参考电路中的节点顺序排列，接线单独列出，按 `模块.端口 → 模块.端口` 连即可。
> 目标槽的节点已在关卡棋盘上，标为 `[target]`。

## 快速索引

| 章节 | 关 | 标题 | 目标 | 提示 | 模块/接线 |
| --- | --- | --- | --- | --- | --- |
| Ⅰ | Ⅰ-i | 取出公理 | `⊢ ( P → ( Q → P ) )` | 接一块 A1。 | 1 / 1 |
| Ⅰ | Ⅰ-ii | 代入 | `⊢ ( ( R → Q ) → ( Q → ( R → Q ) ) )` | 取 A1，把 P 代入 (R→Q)。 | 6 / 6 |
| Ⅰ | Ⅰ-iii | 分离 | `⊢ ( S → ( P → ( Q → P ) ) )` | A1 与它的实例接 M。 | 10 / 12 |
| Ⅰ | Ⅰ-iv | 定义收缩 | `⊢ ( ( P ∧ R ) → ( Q → ( P ∧ R ) ) )` | 先造原始公式，再用 D⁻ 折回 ∧。 | 9 / 9 |
| Ⅰ | `Ⅰ-01` | 同一律 | `⊢ ( P → P )` | 目标是 P→P。从最左的构造块开始，按参考接线接到 ⊢。 | 11 / 18 |
| Ⅰ | `Ⅰ-02` | 前件交换 | `⊢ ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) )` | 目标是 (P→Q)→(R→P)→R→Q。从最左的构造块开始，按参考接线接到 ⊢。 | 18 / 43 |
| Ⅰ | `Ⅰ-03` | 空真（爆炸） | `⊢ ( ¬ P → ( P → Q ) )` | 目标是 ¬P→P→Q。从最左的构造块开始，按参考接线接到 ⊢。 | 18 / 37 |
| Ⅰ | `Ⅰ-04` | 前件自应用 | `⊢ ( P → ( ( P → Q ) → Q ) )` | 目标是 P→(P→Q)→Q。从最左的构造块开始，按参考接线接到 ⊢。 | 19 / 40 |
| Ⅰ | `Ⅰ-05` | 析取引入右 | `⊢ ( Q → ( P ∨ Q ) )` | 目标是 Q→P∨Q。Q 给出 P∨Q，是公理 A1 的实例。 末尾用 D⁻ 把原始结论折回表面语法。 | 8 / 8 |
| Ⅰ | `Ⅰ-06` | 同一律 | `⊢ ( P → P )` | 目标是 P→P。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。 | 13 / 18 |
| Ⅰ | `Ⅰ-07` | 弱化公理 | `⊢ ( P → ( Q → ( R → Q ) ) )` | 目标是 P→Q→R→Q。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。 | 13 / 17 |
| Ⅰ | `Ⅰ-08` | 中间引理 | `⊢ ( ( P → ( ( P → P ) → P ) ) → ( ( P → ( P → P ) ) → ( P → P ) ) )` | 目标 (P→(P→P)→P)→(P→P→P)→P→P：把这段子证明按接线一路拆到公理，后面会把它当黑盒。 | 6 / 8 |
| Ⅰ | `Ⅰ-09` | 中间引理 | `⊢ ( ( P → Q ) → ( R → ( P → Q ) ) )` | 目标 (P→Q)→R→P→Q：把这段子证明按接线一路拆到公理，后面会把它当黑盒。 | 6 / 8 |
| Ⅰ | `Ⅰ-10` | 中间引理 | `⊢ ( ¬ P → ( ¬ Q → ¬ P ) )` | 目标 ¬P→¬Q→¬P：把这段子证明按接线一路拆到公理，后面会把它当黑盒。 | 6 / 8 |
| Ⅰ | `Ⅰ-11` | A3 的改写形式 | `⊢ ( ( ¬ P → ¬ Q ) → ( Q → P ) )` | (¬P→¬Q)→Q→P | 1 / 1 |
| Ⅰ | `Ⅰ-12` | 后件恒等 | `⊢ ( P → ( Q → Q ) )` | P→Q→Q | 8 / 13 |
| Ⅰ | `Ⅰ-13` | 后件恒等 | `⊢ ( P → ( Q → Q ) )` | P→Q→Q | 11 / 13 |
| Ⅰ | `Ⅰ-14` | 弱化加一层 | `⊢ ( P → ( Q → ( R → P ) ) )` | P→Q→R→P | 36 / 47 |
| Ⅰ | `Ⅰ-15` | 前件自应用 | `⊢ ( P → ( ( P → Q ) → Q ) )` | P→(P→Q)→Q | 42 / 58 |
| Ⅰ | `Ⅰ-16` | 前件收缩 | `⊢ ( ( P → ( P → Q ) ) → ( P → Q ) )` | (P→P→Q)→P→Q | 9 / 10 |
| Ⅰ | `Ⅰ-17` | 空真（爆炸） | `⊢ ( ¬ P → ( P → Q ) )` | ¬P→P→Q | 43 / 60 |
| Ⅰ | `Ⅰ-18` | 双重否定爆炸 | `⊢ ( P → ( ¬ P → Q ) )` | P→¬P→Q | 40 / 54 |
| Ⅰ | `Ⅰ-19` | 析取引入左 | `⊢ ( P → ( P ∨ Q ) )` | P 给出 P∨Q（∨ 是 ¬A→B 的缩写）。 | 2 / 2 |
| Ⅰ | `Ⅰ-20` | 后件替换 | `⊢ ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) )` | (P→Q)→(R→P)→R→Q | 46 / 66 |
| Ⅰ | `Ⅰ-21` | 反证收尾 | `⊢ ( ( ¬ P → P ) → P )` | (¬P→P)→P | 54 / 78 |
| Ⅰ | `Ⅰ-22` | 双重否定消去 | `⊢ ( ¬ ¬ P → P )` | ¬¬P→P | 22 / 30 |
| Ⅰ | `Ⅰ-23` | 前件交换 | `⊢ ( ( P → ( Q → R ) ) → ( Q → ( P → R ) ) )` | (P→Q→R)→Q→P→R | 95 / 140 |
| Ⅰ | `Ⅰ-24` | 反件消去 | `⊢ ( ( ( P → Q ) → R ) → ( Q → R ) )` | ((P→Q)→R)→Q→R | 97 / 138 |
| Ⅰ | `Ⅰ-25` | 前件二次 | `⊢ ( ( ( P → Q ) → ( P → R ) ) → ( ( Q → P ) → ( Q → R ) ) )` | ((P→Q)→P→R)→(Q→P)→Q→R | 30 / 43 |
| Ⅰ | `Ⅰ-26` | 二次否定 | `⊢ ( ( ( P → Q ) → ( Q → P ) ) → ( Q → P ) )` | ((P→Q)→Q→P)→Q→P | 43 / 62 |
| Ⅰ | `Ⅰ-27` | 反件左消 | `⊢ ( ( ( P → Q ) → R ) → ( ¬ P → R ) )` | ((P→Q)→R)→¬P→R | 98 / 140 |
| Ⅰ | `Ⅰ-28` | 合取的蕴涵形式 | `⊢ ( P → ( Q → ¬ ( P → ¬ Q ) ) )` | P→Q→¬(P→¬Q) | 100 / 141 |
| Ⅰ | `Ⅰ-29` | 合取引入 | `⊢ ( P → ( Q → ( P ∧ Q ) ) )` | P、Q 一起给出 P∧Q（∧ 是 ¬(A→¬B) 的缩写）。 | 2 / 2 |
| Ⅰ | `Ⅰ-30` | 等值引入 | `⊢ ( ( P → Q ) → ( ( Q → P ) → ( P ↔ Q ) ) )` | A→B 与 B→A 一起给出 A↔B。 | 9 / 11 |
| Ⅰ | `Ⅰ-31` | 否定后件换位 | `⊢ ( ( P → ¬ Q ) → ( Q → ¬ P ) )` | (P→¬Q)→Q→¬P | 102 / 148 |
| Ⅰ | `Ⅰ-32` | 双重否定引入 | `⊢ ( P → ¬ ¬ P )` | P→¬¬P | 111 / 159 |
| Ⅰ | `Ⅰ-33` | 逆否换位 | `⊢ ( ( ¬ P → Q ) → ( ¬ Q → P ) )` | (¬P→Q)→¬Q→P | 54 / 75 |
| Ⅰ | `Ⅰ-34` | 蕴涵传递 | `⊢ ( ( P → Q ) → ( ( Q → R ) → ( P → R ) ) )` | (P→Q)→(Q→R)→P→R | 125 / 185 |
| Ⅱ | Ⅱ-i | 全称例化 | `⊢ ( ∀ x F ( x ) → F ( z ) )` | 接一块 ∀E*：公式 F(x)、个体 z。 | 4 / 4 |
| Ⅱ | Ⅱ-ii | 全称推广 | `⊢ ∀ x ( P → ( Q → P ) )` | 接一块 ∀I：给 A1 的断言加 ∀x。 | 2 / 2 |
| Ⅱ | Ⅱ-iii | 全称引入（∀*） | `⊢ ( R → ∀ x R )` | 接一块 ∀*：x 不在 R 中自由出现。 | 2 / 2 |
| Ⅱ | Ⅱ-iv | 存在推广 | `⊢ ( F ( z ) → ∃ x F ( x ) )` | 接一块 ∃I*：公式 F(x)、个体 z。 | 4 / 4 |
| Ⅱ | `Ⅱ-01` | 全称弱化 | `⊢ ( ∀ x F ( x ) → ∀ x ( G ( x ) → F ( x ) ) )` | 目标是 ∀x F(x)→∀x (G(x)→F(x))。从最左的构造块接起，按参考接线接到 ⊢。 | 12 / 18 |
| Ⅱ | `Ⅱ-02` | 嵌套全称引入 | `⊢ ( F ( x ) → ( G ( y ) → ∀ x G ( y ) ) )` | 目标是 F(x)→G(y)→∀x G(y)。从最左的构造块接起，按参考接线接到 ⊢。 | 12 / 14 |
| Ⅱ | `Ⅱ-03` | 前件提取 | `⊢ ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → G ( x ) ) )` | 目标是 (F(x)→∀x G(x))→F(x)→G(x)。从最左的构造块接起，按参考接线接到 ⊢。 | 16 / 25 |
| Ⅱ | `Ⅱ-04` | 双重量词消去 | `⊢ ( ∀ x ∀ y F ( x ) → F ( x ) )` | 目标是 ∀x ∀y F(x)→F(x)。从最左的构造块接起，按参考接线接到 ⊢。 | 19 / 30 |
| Ⅱ | `Ⅱ-05` | 二次回指 | `⊢ ( F ( x ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) )` | 目标是 F(x)→G(x)→H(x)→F(x)。从最左的构造块接起，按参考接线接到 ⊢。 | 19 / 38 |
| Ⅱ | `Ⅱ-06` | 二元谓词例化 | `⊢ ( ∀ x F ( x , y ) → F ( z , y ) )` | 目标是 ∀x F(x,y)→F(z,y)：接一块 ∀E*，公式填 F(x,y)、个体填 z。 | 5 / 5 |
| Ⅱ | `Ⅱ-07` | 全称分配（实例） | `⊢ ( ∀ x ( F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → ∀ x G ( x ) ) )` | 目标是 ∀x(F(x)→G(x))→(∀xF(x)→∀xG(x))：接一块 A5，把 P、Q 分别代入 F(x)、G(x)。 | 7 / 8 |
| Ⅱ | `Ⅱ-08` | 无自由变元的全称引入 | `⊢ ( P → ( Q → ∀ x Q ) )` | 目标是 P→Q→∀x Q。先看量词在哪一层，再把 ∀ 分配/全称泛化接上。 | 10 / 12 |
| Ⅱ | `Ⅱ-09` | 中间引理 | `⊢ ( ∀ x ∀ y F ( x ) → ∀ y F ( x ) )` | 目标 ∀x ∀y F(x)→∀y F(x)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。 | 6 / 6 |
| Ⅱ | `Ⅱ-10` | 中间引理 | `⊢ ( H ( x ) → ( H ( x ) → H ( x ) ) )` | 目标 H(x)→H(x)→H(x)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。 | 6 / 7 |
| Ⅱ | `Ⅱ-11` | 全称分配蕴涵 | `⊢ ( ∀ x ( P → Q ) → ( ∀ x P → ∀ x Q ) )` | ∀x (P→Q)→∀x P→∀x Q | 1 / 1 |
| Ⅱ | `Ⅱ-12` | 全称引入（wff） | `⊢ ( P → ∀ x P )` | P 里没有 x，所以 P→∀x P 成立。 | 2 / 2 |
| Ⅱ | `Ⅱ-13` | 无自由变元的全称引入 | `⊢ ( F ( y ) → ∀ x F ( y ) )` | F(y) 里的 y 与 x 不同，所以可以加 ∀x。 | 3 / 3 |
| Ⅱ | `Ⅱ-14` | 全称例化（实例） | `⊢ ( ∀ x F ( x ) → F ( y ) )` | ∀x F(x) 可以例化到具体个体 y。 | 4 / 4 |
| Ⅱ | `Ⅱ-15` | 存在推广（实例） | `⊢ ( F ( y ) → ∃ x F ( x ) )` | F(y) 可以推广成 ∃x F(x)。 | 4 / 4 |
| Ⅱ | `Ⅱ-16` | 全称弱化 | `⊢ ( ∀ x P → ∀ x ( Q → P ) )` | ∀x P→∀x (Q→P) | 9 / 9 |
| Ⅱ | `Ⅱ-17` | 全称分配（长公式二） | `⊢ ( ∀ x ( ( F ( x ) → G ( x ) ) → H ( x ) ) → ( ∀ x ( F ( x ) → G ( x ) ) → ∀ x H ( x ) ) )` | 量词分配对任意复杂公式都成立。 | 9 / 11 |
| Ⅱ | `Ⅱ-18` | 全称分配（长公式） | `⊢ ( ∀ x ( ( F ( x ) → ( G ( x ) → H ( x ) ) ) → F ( x ) ) → ( ∀ x ( F ( x ) → ( G ( x ) → H ( x ) ) ) → ∀ x F ( x ) ) )` | 量词分配对任意复杂公式都成立。 | 10 / 13 |
| Ⅱ | `Ⅱ-19` | 双重量词引入 | `⊢ ( F ( z ) → ∀ x ∀ y F ( z ) )` | F(z)→∀x ∀y F(z) | 22 / 35 |
| Ⅱ | `Ⅱ-20` | 三段全称分配 | `⊢ ( ∀ x ( F ( x ) → ( G ( x ) → H ( x ) ) ) → ( ∀ x F ( x ) → ( ∀ x G ( x ) → ∀ x H ( x ) ) ) )` | ∀x (F(x)→G(x)→H(x))→∀x F(x)→∀x G(x)→∀x H(x) | 33 / 67 |
| Ⅱ | `Ⅱ-21` | 混合三段论 | `⊢ ( ( F ( x ) → ∀ x ( G ( x ) → H ( x ) ) ) → ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )` | (F(x)→∀x (G(x)→H(x)))→(F(x)→∀x G(x))→F(x)→∀x H(x) | 33 / 71 |
| Ⅱ | `Ⅱ-22` | 全称三段论 | `⊢ ( ∀ x ( G ( x ) → H ( x ) ) → ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )` | ∀x (G(x)→H(x))→(F(x)→∀x G(x))→F(x)→∀x H(x) | 34 / 76 |
| Ⅱ | `Ⅱ-23` | 全称后件组合 | `⊢ ( ( F ( x ) → ∀ x G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )` | (F(x)→∀x G(x))→∀x (G(x)→H(x))→F(x)→∀x H(x) | 27 / 51 |
| Ⅱ | `Ⅱ-24` | 全称三段论（H/F） | `⊢ ( ∀ x ( F ( x ) → H ( x ) ) → ( ( G ( x ) → ∀ x F ( x ) ) → ( G ( x ) → ∀ x H ( x ) ) ) )` | ∀x (F(x)→H(x))→(G(x)→∀x F(x))→G(x)→∀x H(x) | 34 / 76 |
| Ⅱ | `Ⅱ-25` | 双层分配 | `⊢ ( ∀ x ∀ y ( F ( x ) → G ( x ) ) → ( ∀ x ∀ y F ( x ) → ∀ x ∀ y G ( x ) ) )` | ∀x ∀y (F(x)→G(x))→∀x ∀y F(x)→∀x ∀y G(x) | 40 / 79 |
| Ⅱ | `Ⅱ-26` | 辖域移动（变体二） | `⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )` | ∀x (F(y)→G(x))→F(y)→∀x G(x) | 44 / 110 |
| Ⅱ | `Ⅱ-27` | 辖域移动（H/G） | `⊢ ( ∀ x ( H ( y ) → F ( x ) ) → ( H ( y ) → ∀ x F ( x ) ) )` | ∀x (H(y)→F(x))→H(y)→∀x F(x) | 44 / 110 |
| Ⅱ | `Ⅱ-28` | 辖域移动（F/G 变体） | `⊢ ( ∀ x ( F ( z ) → G ( y ) ) → ( F ( z ) → ∀ x G ( y ) ) )` | ∀x (F(z)→G(y))→F(z)→∀x G(y) | 44 / 110 |
| Ⅱ | `Ⅱ-29` | 全称三段分配 | `⊢ ( ∀ x ( P → ( Q → R ) ) → ( ∀ x P → ( ∀ x Q → ∀ x R ) ) )` | ∀x (P→Q→R)→∀x P→∀x Q→∀x R | 45 / 62 |
| Ⅱ | `Ⅱ-30` | 全称替换前件 | `⊢ ( ( F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → G ( x ) ) )` | (F(x)→G(x))→∀x F(x)→G(x) | 46 / 128 |
| Ⅱ | `Ⅱ-31` | 全称替换前件（G） | `⊢ ( ( G ( x ) → F ( x ) ) → ( ∀ x G ( x ) → F ( x ) ) )` | (G(x)→F(x))→∀x G(x)→F(x) | 46 / 128 |
| Ⅱ | `Ⅱ-32` | 全称后件传递 | `⊢ ( ∀ x ( P → Q ) → ( ( R → ∀ x P ) → ( R → ∀ x Q ) ) )` | ∀x (P→Q)→(R→∀x P)→R→∀x Q | 48 / 68 |
| Ⅱ | `Ⅱ-33` | 四段分配 | `⊢ ( ∀ x ( F ( x ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) ) → ( ∀ x F ( x ) → ( ∀ x G ( x ) → ( ∀ x H ( x ) → ∀ x F ( x ) ) ) ) )` | ∀x (F(x)→G(x)→H(x)→F(x))→∀x F(x)→∀x G(x)→∀x H(x)→∀x F(x) | 49 / 117 |
| Ⅱ | `Ⅱ-34` | 全称堆叠 | `⊢ ( P → ∀ x ∀ y P )` | P→∀x ∀y P | 56 / 74 |
| Ⅲ | Ⅲ-i | 等词自反 | `⊢ y = y` | 接一块 =I。 | 1 / 1 |
| Ⅲ | Ⅲ-ii | 等词替换 | `⊢ ( y = x → ( F ( y ) → F ( x ) ) )` | 接一块 =L：把 F(y) 里的 y 换成 x。 | 5 / 5 |
| Ⅲ | Ⅲ-iii | 等词替换（抽象） | `⊢ ( y = x → ( G ( y ) → G ( x ) ) )` | =L 的抽象模式。 | 5 / 5 |
| Ⅲ | Ⅲ-iv | 引用已证定理 | `⊢ ( ∀ x ( F ( z ) → G ( z ) ) → ( ∀ x F ( z ) → ∀ x G ( z ) ) )` | 用 theorem 引用前章关卡再代入。 | 7 / 8 |
| Ⅲ | `Ⅲ-01` | 谓词替换 | `⊢ ( x = y → ( F ( x ) → F ( y ) ) )` | 目标是 x = y→F(x)→F(y)。从最左的构造块接起，按参考接线接到 ⊢。 | 5 / 5 |
| Ⅲ | `Ⅲ-02` | 复合替换 | `⊢ ( x = y → ( ( F ( x ) → G ( x ) ) → ( F ( y ) → G ( y ) ) ) )` | 目标是 x = y→(F(x)→G(x))→F(y)→G(y)。从最左的构造块接起，按参考接线接到 ⊢。 | 7 / 8 |
| Ⅲ | `Ⅲ-03` | 否定复合替换 | `⊢ ( x = y → ( ¬ ( F ( x ) → G ( x ) ) → ¬ ( F ( y ) → G ( y ) ) ) )` | 目标是 x = y→¬(F(x)→G(x))→¬(F(y)→G(y))。从最左的构造块接起，按参考接线接到 ⊢。 | 8 / 9 |
| Ⅲ | `Ⅲ-04` | 中间引理 | `⊢ ( ∀ z ( P → Q ) → ( P → ∀ z ( P → Q ) ) )` | 目标 ∀z (P→Q)→P→∀z (P→Q)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。 | 6 / 9 |
| Ⅲ | `Ⅲ-05` | 中间引理 | `⊢ ∀ z ( x = y → ( z ∈ x → z ∈ y ) )` | 目标 ∀z (x = y→z ∈ x→z ∈ y)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。 | 6 / 7 |
| Ⅲ | `Ⅲ-06` | 中间引理 | `⊢ ( y = x → ( ( F ( y ) → G ( y ) ) → ( F ( x ) → G ( x ) ) ) )` | 目标 y = x→(F(y)→G(y))→F(x)→G(x)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。 | 6 / 8 |
| Ⅲ | `Ⅲ-07` | 中间引理 | `⊢ ( y = x → ( ∀ z z = y → ∀ z z = x ) )` | 目标 y = x→∀z z = y→∀z z = x：把这段子证明按接线一路拆到公理，后面会把它当黑盒。 | 6 / 7 |
| Ⅲ | `Ⅲ-08` | 中间引理 | `⊢ ( F ( y ) → ( y = y → F ( y ) ) )` | 目标 F(y)→y = y→F(y)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。 | 7 / 9 |
| Ⅲ | `Ⅲ-09` | 中间引理 | `⊢ ( ( P → ( ∀ z P → ∀ z Q ) ) → ( ( P → ∀ z P ) → ( P → ∀ z Q ) ) )` | 目标 (P→∀z P→∀z Q)→(P→∀z P)→P→∀z Q：把这段子证明按接线一路拆到公理，后面会把它当黑盒。 | 7 / 8 |
| Ⅲ | `Ⅲ-10` | 中间引理 | `⊢ ( ∀ z ( z ∈ y → z ∈ x ) → ( z ∈ y → z ∈ x ) )` | 目标 ∀z (z ∈ y→z ∈ x)→z ∈ y→z ∈ x：把这段子证明按接线一路拆到公理，后面会把它当黑盒。 | 7 / 9 |
| Ⅲ | `Ⅲ-11` | 自反（x） | `⊢ x = x` | x = x | 1 / 1 |
| Ⅲ | `Ⅲ-12` | 全称自反 | `⊢ ∀ x x = x` | ∀x x = x | 2 / 2 |
| Ⅲ | `Ⅲ-13` | 不含 x 的公式 | `⊢ ( x = y → ( ∀ z z = z → ∀ z z = z ) )` | x = y→∀z z = z→∀z z = z | 14 / 18 |
| Ⅲ | `Ⅲ-14` | 全称辖域（定理） | `⊢ ( ∀ z ( P → Q ) → ( P → ∀ z Q ) )` | ∀z (P→Q)→P→∀z Q | 52 / 141 |
| Ⅲ | `Ⅲ-15` | 全称等词替换 | `⊢ ( x = y → ( ∀ z z = x → ∀ z z = y ) )` | x = y→∀z z = x→∀z z = y | 69 / 188 |
| Ⅲ | `Ⅲ-16` | 嵌套全称替换 | `⊢ ( x = y → ( ∀ z x = z → ∀ z y = z ) )` | x = y→∀z x = z→∀z y = z | 69 / 188 |
| Ⅲ | `Ⅲ-17` | 条件替换 | `⊢ ( x = y → ( ( x = x → F ( x ) ) → ( y = y → F ( y ) ) ) )` | x = y→(x = x→F(x))→y = y→F(y) | 105 / 313 |
| Ⅲ | `Ⅲ-18` | 中间引理 | `⊢ ( ∀ z ( z ∈ x → z ∈ y ) → ( z ∈ x → z ∈ y ) )` | ( A. z ( z e. x -> z e. y ) -> ( z e. x -> z e. y ) ) | 7 / 9 |
| Ⅲ | `Ⅲ-19` | 中间引理 | `⊢ ( x = x → ( x = y → x = x ) )` | ( x = x -> ( x = y -> x = x ) ) | 8 / 10 |
| Ⅲ | `Ⅲ-20` | 中间引理 | `⊢ ( x = x → ( ( x = x → F ( x ) ) → x = x ) )` | ( x = x -> ( ( x = x -> F ( x ) ) -> x = x ) ) | 8 / 11 |
| Ⅲ | `Ⅲ-21` | 中间引理 | `⊢ ( ( P → ∀ z P ) → ( ∀ z ( P → Q ) → ( P → ∀ z P ) ) )` | ( ( P -> A. z P ) -> ( A. z ( P -> Q ) -> ( P -> A. z P ) ) ) | 8 / 12 |
| Ⅲ | `Ⅲ-22` | 中间引理 | `⊢ ( ( F ( y ) → F ( y ) ) → ( x = y → ( F ( y ) → F ( y ) ) ) )` | ( ( F ( y ) -> F ( y ) ) -> ( x = y -> ( F ( y ) -> F ( y ) ) ) ) | 9 / 11 |
| Ⅲ | `Ⅲ-23` | 中间引理 | `⊢ ( ( x = y → y = x ) → ( x = y → ( x = y → y = x ) ) )` | ( ( x = y -> y = x ) -> ( x = y -> ( x = y -> y = x ) ) ) | 9 / 12 |
| Ⅲ | `Ⅲ-24` | 中间引理 | `⊢ ( x = y → ( ( x = x → F ( x ) ) → x = y ) )` | ( x = y -> ( ( x = x -> F ( x ) ) -> x = y ) ) | 10 / 13 |
| Ⅲ | `Ⅲ-25` | 中间引理 | `⊢ ( ∀ z ( P → Q ) → ( P → ∀ z P ) )` | ( A. z ( P -> Q ) -> ( P -> A. z P ) ) | 10 / 15 |
| Ⅲ | `Ⅲ-26` | 中间引理 | `⊢ ( x = y → ( ∀ z z = x → x = y ) )` | ( x = y -> ( A. z z = x -> x = y ) ) | 10 / 11 |
| Ⅲ | `Ⅲ-27` | 中间引理 | `⊢ ( x = y → ( ∀ z x = z → x = y ) )` | ( x = y -> ( A. z x = z -> x = y ) ) | 10 / 11 |
| Ⅲ | `Ⅲ-28` | 中间引理 | `⊢ ( ( ∀ z z = z → ∀ z z = z ) → ( x = y → ( ∀ z z = z → ∀ z z = z ) ) )` | ( ( A. z z = z -> A. z z = z ) -> ( x = y -> ( A. z z = z -> A. z z = z ) ) ) | 11 / 13 |
| Ⅲ | `Ⅲ-29` | 中间引理 | `⊢ ( ( ∀ z z = x → z = x ) → ( x = y → ( ∀ z z = x → z = x ) ) )` | ( ( A. z z = x -> z = x ) -> ( x = y -> ( A. z z = x -> z = x ) ) ) | 11 / 13 |
| Ⅲ | `Ⅲ-30` | 中间引理 | `⊢ ( ( ∀ z x = z → x = z ) → ( x = y → ( ∀ z x = z → x = z ) ) )` | ( ( A. z x = z -> x = z ) -> ( x = y -> ( A. z x = z -> x = z ) ) ) | 11 / 13 |
| Ⅲ | `Ⅲ-31` | 中间引理 | `⊢ ( ∀ z ( P → Q ) → ( ∀ z ( P → Q ) → ( ∀ z P → ∀ z Q ) ) )` | ( A. z ( P -> Q ) -> ( A. z ( P -> Q ) -> ( A. z P -> A. z Q ) ) ) | 12 / 17 |
| Ⅲ | `Ⅲ-32` | 中间引理 | `⊢ ( x = y → ( F ( y ) → ( y = y → F ( y ) ) ) )` | ( x = y -> ( F ( y ) -> ( y = y -> F ( y ) ) ) ) | 13 / 22 |
| Ⅲ | `Ⅲ-33` | 中间引理 | `⊢ ( x = y → ( ∀ z z = x → z = x ) )` | ( x = y -> ( A. z z = x -> z = x ) ) | 13 / 17 |
| Ⅲ | `Ⅲ-34` | 中间引理 | `⊢ ( x = y → ( ∀ z x = z → x = z ) )` | ( x = y -> ( A. z x = z -> x = z ) ) | 13 / 17 |
| Ⅳ | Ⅳ-i | 外延公理 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → x = y )` | 接一块 EXT。 | 3 / 3 |
| Ⅳ | Ⅳ-ii | 配对公理 | `⊢ ∃ u ∀ z ( ( z = y ∨ z = x ) ↔ z ∈ u )` | 接一块配对公理（u=y、v=x）。 | 3 / 3 |
| Ⅳ | Ⅳ-iii | 并集公理 | `⊢ ∃ x ∀ z ( ∃ u ( z ∈ u ∧ u ∈ y ) ↔ z ∈ x )` | 接一块并集公理（a=y）。 | 2 / 2 |
| Ⅳ | Ⅳ-iv | 外延公理（换序） | `⊢ ( ∀ z ( z ∈ y ↔ z ∈ x ) → y = x )` | EXT 换一组变量。 | 3 / 3 |
| Ⅳ | `Ⅳ-01` | 外延公理（全称） | `⊢ ∀ x ∀ y ( ∀ z ( z ∈ x ↔ z ∈ y ) → x = y )` | 目标是 ∀x ∀y (∀z (z ∈ x↔z ∈ y)→x = y)。从最左的构造块接起，按参考接线接到 ⊢。 | 5 / 5 |
| Ⅳ | `Ⅳ-02` | 配对公理（全称） | `⊢ ∀ x ∀ y ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )` | 目标是 ∀x ∀y ∃u ∀z (z = x∨z = y↔z ∈ u)。从最左的构造块接起，按参考接线接到 ⊢。 | 5 / 5 |
| Ⅳ | `Ⅳ-03` | 外延（y,z） | `⊢ ∀ y ∀ z ( ∀ x ( x ∈ y ↔ x ∈ z ) → y = z )` | 目标是 ∀y ∀z (∀x (x ∈ y↔x ∈ z)→y = z)。从最左的构造块接起，按参考接线接到 ⊢。 | 5 / 5 |
| Ⅳ | `Ⅳ-04` | 配对（y,x） | `⊢ ∀ y ∀ x ∃ u ∀ z ( ( z = y ∨ z = x ) ↔ z ∈ u )` | 目标是 ∀y ∀x ∃u ∀z (z = y∨z = x↔z ∈ u)。从最左的构造块接起，按参考接线接到 ⊢。 | 5 / 5 |
| Ⅳ | `Ⅳ-05` | 属于替换（反向） | `⊢ ∀ x ∀ y ( x = y → ( y ∈ x → y ∈ y ) )` | 目标是 ∀x ∀y (x = y→y ∈ x→y ∈ y)。从最左的构造块接起，按参考接线接到 ⊢。 | 6 / 8 |
| Ⅳ | `Ⅳ-06` | 等词进入属于（全称） | `⊢ ∀ y ∀ z ( y = z → ( x ∈ y → x ∈ z ) )` | 目标是 ∀y ∀z (y = z→x ∈ y→x ∈ z)。从最左的构造块接起，按参考接线接到 ⊢。 | 7 / 8 |
| Ⅳ | `Ⅳ-07` | 等词进入属于（反向） | `⊢ ∀ y ∀ z ( y = z → ( y ∈ x → z ∈ x ) )` | 目标是 ∀y ∀z (y = z→y ∈ x→z ∈ x)。从最左的构造块接起，按参考接线接到 ⊢。 | 7 / 8 |
| Ⅳ | `Ⅳ-08` | 外延的闭包（换序） | `⊢ ∀ y ∀ x ( ∀ z ( z ∈ y ↔ z ∈ x ) → y = x )` | 目标是 ∀y∀x((∀z(z∈y↔z∈x))→y=x)：接 set-ext，再 gen x、gen y。 | 5 / 5 |
| Ⅳ | `Ⅳ-09` | 中间引理 | `⊢ ∀ z ( y = z → ( x ∈ y → x ∈ z ) )` | 目标 ∀z (y = z→x ∈ y→x ∈ z)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。 | 6 / 7 |
| Ⅳ | `Ⅳ-10` | 中间引理 | `⊢ ∀ z ( y = z → ( y ∈ x → z ∈ x ) )` | 目标 ∀z (y = z→y ∈ x→z ∈ x)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。 | 6 / 7 |
| Ⅳ | `Ⅳ-11` | 空集 | `⊢ ∃ z ∀ x ¬ x ∈ z` | ∃z ∀x ¬x ∈ z | 1 / 1 |
| Ⅳ | `Ⅳ-12` | 并集公理（实例） | `⊢ ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )` | ∃y ∀z (∃u (z ∈ u∧u ∈ x)↔z ∈ y) | 2 / 2 |
| Ⅳ | `Ⅳ-13` | 配对公理（实例） | `⊢ ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )` | ∃u ∀z (z = x∨z = y↔z ∈ u) | 3 / 3 |
| Ⅳ | `Ⅳ-14` | 并集公理（全称） | `⊢ ∀ x ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )` | ∀x ∃y ∀z (∃u (z ∈ u∧u ∈ x)↔z ∈ y) | 3 / 3 |
| Ⅳ | `Ⅳ-15` | 并集（y） | `⊢ ∀ y ∃ u ∀ z ( ∃ v ( z ∈ v ∧ v ∈ y ) ↔ z ∈ u )` | ∀y ∃u ∀z (∃v (z ∈ v∧v ∈ y)↔z ∈ u) | 3 / 3 |
| Ⅳ | `Ⅳ-16` | 中间引理 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ u ) → ( z ∈ x ↔ z ∈ y ) ) )` | ( A. z ( z e. x <-> z e. y ) -> ( A. z ( z e. y <-> z e. u ) -> ( z e. x <-> z e. y ) ) ) | 42 / 100 |
| Ⅳ | `Ⅳ-17` | 中间引理 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( z ∈ x ↔ z ∈ y ) )` | ( A. z ( z e. x <-> z e. y ) -> ( z e. x <-> z e. y ) ) | 7 / 9 |
| Ⅳ | `Ⅳ-18` | 中间引理 | `⊢ ( ∀ z ( z ∈ y ↔ z ∈ u ) → ( z ∈ y ↔ z ∈ u ) )` | ( A. z ( z e. y <-> z e. u ) -> ( z e. y <-> z e. u ) ) | 7 / 9 |
| Ⅳ | `Ⅳ-19` | 中间引理 | `⊢ ( ( x ∈ u ∧ y ∈ u ) → ∃ u ( x ∈ u ∧ y ∈ u ) )` | ( ( x e. u /\ y e. u ) -> E. u ( x e. u /\ y e. u ) ) | 7 / 9 |
| Ⅳ | `Ⅳ-20` | 中间引理 | `⊢ ( y = y → ( y = z → y = y ) )` | ( y = y -> ( y = z -> y = y ) ) | 8 / 10 |
| Ⅳ | `Ⅳ-21` | 中间引理 | `⊢ ( ( y = z → z = y ) → ( y = z → ( y = z → z = y ) ) )` | ( ( y = z -> z = y ) -> ( y = z -> ( y = z -> z = y ) ) ) | 9 / 12 |
| Ⅳ | `Ⅳ-22` | 中间引理 | `⊢ ( y = z → y = y )` | ( y = z -> y = y ) | 10 / 12 |
| Ⅳ | `Ⅳ-23` | 中间引理 | `⊢ ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → ( ( x = x ∨ x = y ) ↔ x ∈ u ) )` | ( A. z ( ( z = x \/ z = y ) <-> z e. u ) -> ( ( x = x \/ x = y ) <-> x e. u ) ) | 10 / 13 |
| Ⅳ | `Ⅳ-24` | 中间引理 | `⊢ ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → ( ( y = x ∨ y = y ) ↔ y ∈ u ) )` | ( A. z ( ( z = x \/ z = y ) <-> z e. u ) -> ( ( y = x \/ y = y ) <-> y e. u ) ) | 10 / 13 |
| Ⅳ | `Ⅳ-25` | 中间引理 | `⊢ ( ( y = z → y = y ) → ( y = z → z = y ) )` | ( ( y = z -> y = y ) -> ( y = z -> z = y ) ) | 12 / 19 |
| Ⅳ | `Ⅳ-26` | 中间引理 | `⊢ ( x = y → ( y = x → ( y ∈ z → x ∈ z ) ) )` | ( x = y -> ( y = x -> ( y e. z -> x e. z ) ) ) | 15 / 23 |
| Ⅳ | `Ⅳ-27` | 中间引理 | `⊢ ( y = z → ( z = y → ( x ∈ z → x ∈ y ) ) )` | ( y = z -> ( z = y -> ( x e. z -> x e. y ) ) ) | 15 / 23 |
| Ⅳ | `Ⅳ-28` | 中间引理 | `⊢ ( x = x → ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → x = x ) )` | ( x = x -> ( A. z ( ( z = x \/ z = y ) <-> z e. u ) -> x = x ) ) | 15 / 19 |
| Ⅳ | `Ⅳ-29` | 中间引理 | `⊢ ( y = y → ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → y = y ) )` | ( y = y -> ( A. z ( ( z = x \/ z = y ) <-> z e. u ) -> y = y ) ) | 15 / 19 |
| Ⅳ | `Ⅳ-30` | 中间引理 | `⊢ ( y = z → z = y )` | ( y = z -> z = y ) | 17 / 28 |
| Ⅳ | `Ⅳ-31` | 中间引理 | `⊢ ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → y = y )` | ( A. z ( ( z = x \/ z = y ) <-> z e. u ) -> y = y ) | 17 / 21 |
| Ⅳ | `Ⅳ-32` | 中间引理 | `⊢ ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → ( x ∈ u → ∃ u x ∈ u ) )` | ( A. z ( ( z = x \/ z = y ) <-> z e. u ) -> ( x e. u -> E. u x e. u ) ) | 19 / 26 |
| Ⅳ | `Ⅳ-33` | 中间引理 | `⊢ ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → ( y ∈ u → ∃ u y ∈ u ) )` | ( A. z ( ( z = x \/ z = y ) <-> z e. u ) -> ( y e. u -> E. u y e. u ) ) | 19 / 26 |
| Ⅳ | `Ⅳ-34` | 中间引理 | `⊢ ( y = z → ( y = z → z = y ) )` | ( y = z -> ( y = z -> z = y ) ) | 20 / 37 |

## Ⅰ 章

### Ⅰ-i · 取出公理

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

### Ⅰ-ii · 代入

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

### Ⅰ-iii · 分离

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

### Ⅰ-iv · 定义收缩

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

### Ⅰ-01 · 同一律

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

### Ⅰ-02 · 前件交换

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

### Ⅰ-03 · 空真（爆炸）

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

### Ⅰ-04 · 前件自应用

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

### Ⅰ-05 · 析取引入右

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

### Ⅰ-06 · 同一律

- 目标：`⊢ ( P → P )`
- 提示：目标是 P→P。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。
- 参考解：13 个模块 / 18 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n15  [target]
n1  mp
n2  axiom A1
n3  subst(groups=0)
n4  atom Q
n5  atom P
n6  mp
n8  subst(groups=0)
n9  atom Q
n10  imp
n11  axiom A2
n12  subst(groups=1)
n13  atom Q
n14  atom R

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n3.formula1
n3.out → n1.a
n2.out → n8.assertion
n9.out → n8.atom1
n5.out → n10.a
n5.out → n10.b
n10.out → n8.formula1
n8.out → n6.a
n11.out → n12.assertion
n13.out → n12.atom1
n10.out → n12.formula1
n14.out → n12.atom2
n5.out → n12.formula2
n12.out → n6.b
n6.out → n1.b
n1.out → n15.proof
```

</details>

### Ⅰ-07 · 弱化公理

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

### Ⅰ-08 · 中间引理

- 目标：`⊢ ( ( P → ( ( P → P ) → P ) ) → ( ( P → ( P → P ) ) → ( P → P ) ) )`
- 提示：目标 (P→(P→P)→P)→(P→P→P)→P→P：把这段子证明按接线一路拆到公理，后面会把它当黑盒。
- 参考解：6 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n4  atom Q
n5  atom P
n8  imp
n9  axiom A2
n10  subst(groups=1)
n11  atom R

接线：
n5.out → n8.a
n5.out → n8.b
n9.out → n10.assertion
n4.out → n10.atom1
n8.out → n10.formula1
n11.out → n10.atom2
n5.out → n10.formula2
n10.out → tgt.proof
```

</details>

### Ⅰ-09 · 中间引理

- 目标：`⊢ ( ( P → Q ) → ( R → ( P → Q ) ) )`
- 提示：目标 (P→Q)→R→P→Q：把这段子证明按接线一路拆到公理，后面会把它当黑盒。
- 参考解：6 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n2  atom P
n3  atom Q
n4  imp
n5  axiom A1
n6  subst(groups=1)
n7  atom R

接线：
n2.out → n4.a
n3.out → n4.b
n5.out → n6.assertion
n2.out → n6.atom1
n4.out → n6.formula1
n3.out → n6.atom2
n7.out → n6.formula2
n6.out → tgt.proof
```

</details>

### Ⅰ-10 · 中间引理

- 目标：`⊢ ( ¬ P → ( ¬ Q → ¬ P ) )`
- 提示：目标 ¬P→¬Q→¬P：把这段子证明按接线一路拆到公理，后面会把它当黑盒。
- 参考解：6 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n2  atom P
n3  not
n4  axiom A1
n5  subst(groups=1)
n6  atom Q
n7  not

接线：
n2.out → n3.a
n4.out → n5.assertion
n2.out → n5.atom1
n3.out → n5.formula1
n6.out → n7.a
n6.out → n5.atom2
n7.out → n5.formula2
n5.out → tgt.proof
```

</details>

### Ⅰ-11 · A3 的改写形式

- 目标：`⊢ ( ( ¬ P → ¬ Q ) → ( Q → P ) )`
- 提示：(¬P→¬Q)→Q→P
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

### Ⅰ-12 · 后件恒等

- 目标：`⊢ ( P → ( Q → Q ) )`
- 提示：P→Q→Q
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

### Ⅰ-13 · 后件恒等

- 目标：`⊢ ( P → ( Q → Q ) )`
- 提示：P→Q→Q
- 参考解：11 个模块 / 13 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n12  [target]
n1  mp
n2  定理 *06
n3  subst(groups=0)
n4  atom P
n5  atom Q
n6  axiom A1
n7  subst(groups=1)
n8  atom P
n9  imp
n10  atom Q
n11  atom P

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n3.formula1
n3.out → n1.a
n6.out → n7.assertion
n8.out → n7.atom1
n5.out → n9.a
n5.out → n9.b
n9.out → n7.formula1
n10.out → n7.atom2
n11.out → n7.formula2
n7.out → n1.b
n1.out → n12.proof
```

</details>

### Ⅰ-14 · 弱化加一层

- 目标：`⊢ ( P → ( Q → ( R → P ) ) )`
- 提示：P→Q→R→P
- 参考解：36 个模块 / 47 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n37  [target]
n1  mp
n2  mp
n3  定理 *06
n4  mp
n5  mp
n6  axiom A1
n7  subst(groups=0)
n8  atom Q
n9  atom R
n10  axiom A1
n11  subst(groups=1)
n12  atom P
n13  atom P
n14  imp
n15  imp
n16  atom Q
n17  axiom A2
n18  subst(groups=1)
n19  atom Q
n20  atom R
n21  mp
n22  mp
n23  axiom A1
n24  subst(groups=0)
n25  atom P
n26  axiom A1
n27  subst(groups=1)
n28  atom P
n29  atom Q
n30  imp
n31  imp
n32  atom Q
n33  axiom A2
n34  subst(groups=1)
n35  atom Q
n36  atom R

接线：
n3.out → n2.a
n6.out → n7.assertion
n8.out → n7.atom1
n9.out → n7.formula1
n7.out → n5.a
n10.out → n11.assertion
n12.out → n11.atom1
n9.out → n14.a
n13.out → n14.b
n13.out → n15.a
n14.out → n15.b
n15.out → n11.formula1
n16.out → n11.atom2
n13.out → n11.formula2
n11.out → n5.b
n5.out → n4.a
n17.out → n18.assertion
n19.out → n18.atom1
n13.out → n18.formula1
n20.out → n18.atom2
n14.out → n18.formula2
n18.out → n4.b
n4.out → n2.b
n2.out → n1.a
n23.out → n24.assertion
n25.out → n24.atom1
n14.out → n24.formula1
n24.out → n22.a
n26.out → n27.assertion
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
n33.out → n34.assertion
n35.out → n34.atom1
n14.out → n34.formula1
n36.out → n34.atom2
n30.out → n34.formula2
n34.out → n21.b
n21.out → n1.b
n1.out → n37.proof
```

</details>

### Ⅰ-15 · 前件自应用

- 目标：`⊢ ( P → ( ( P → Q ) → Q ) )`
- 提示：P→(P→Q)→Q
- 参考解：42 个模块 / 58 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n43  [target]
n1  mp
n2  mp
n3  定理 *06
n4  mp
n5  mp
n6  axiom A1
n7  subst(groups=0)
n8  atom Q
n9  atom P
n10  atom Q
n11  imp
n12  axiom A1
n13  subst(groups=1)
n14  atom P
n15  imp
n16  imp
n17  atom Q
n18  axiom A2
n19  subst(groups=1)
n20  atom Q
n21  atom R
n22  mp
n23  mp
n24  mp
n25  定理 *06
n26  subst(groups=0)
n27  atom P
n28  axiom A2
n29  subst(groups=2)
n30  atom P
n31  atom Q
n32  atom R
n33  axiom A1
n34  subst(groups=1)
n35  atom P
n36  imp
n37  imp
n38  atom Q
n39  axiom A2
n40  subst(groups=1)
n41  atom Q
n42  atom R

接线：
n3.out → n2.a
n6.out → n7.assertion
n8.out → n7.atom1
n9.out → n11.a
n10.out → n11.b
n11.out → n7.formula1
n7.out → n5.a
n12.out → n13.assertion
n14.out → n13.atom1
n11.out → n15.a
n9.out → n15.b
n9.out → n16.a
n15.out → n16.b
n16.out → n13.formula1
n17.out → n13.atom2
n9.out → n13.formula2
n13.out → n5.b
n5.out → n4.a
n18.out → n19.assertion
n20.out → n19.atom1
n9.out → n19.formula1
n21.out → n19.atom2
n15.out → n19.formula2
n19.out → n4.b
n4.out → n2.b
n2.out → n1.a
n25.out → n26.assertion
n27.out → n26.atom1
n11.out → n26.formula1
n26.out → n24.a
n28.out → n29.assertion
n30.out → n29.atom1
n11.out → n29.formula1
n31.out → n29.atom2
n9.out → n29.formula2
n32.out → n29.atom3
n10.out → n29.formula3
n29.out → n24.b
n24.out → n23.a
n33.out → n34.assertion
n35.out → n34.atom1
n11.out → n36.a
n10.out → n36.b
n15.out → n37.a
n36.out → n37.b
n37.out → n34.formula1
n38.out → n34.atom2
n9.out → n34.formula2
n34.out → n23.b
n23.out → n22.a
n39.out → n40.assertion
n41.out → n40.atom1
n15.out → n40.formula1
n42.out → n40.atom2
n36.out → n40.formula2
n40.out → n22.b
n22.out → n1.b
n1.out → n43.proof
```

</details>

### Ⅰ-16 · 前件收缩

- 目标：`⊢ ( ( P → ( P → Q ) ) → ( P → Q ) )`
- 提示：(P→P→Q)→P→Q
- 参考解：9 个模块 / 10 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n10  [target]
n1  mp
n2  定理 *15
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

### Ⅰ-17 · 空真（爆炸）

- 目标：`⊢ ( ¬ P → ( P → Q ) )`
- 提示：¬P→P→Q
- 参考解：43 个模块 / 60 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n44  [target]
n1  mp
n2  mp
n3  定理 *06
n4  subst(groups=0)
n5  atom P
n6  atom P
n7  not
n8  mp
n9  mp
n10  axiom A1
n11  subst(groups=1)
n12  atom P
n13  atom Q
n14  atom Q
n15  not
n16  axiom A1
n17  subst(groups=1)
n18  atom P
n19  imp
n20  imp
n21  atom Q
n22  axiom A2
n23  subst(groups=2)
n24  atom P
n25  atom Q
n26  atom R
n27  mp
n28  mp
n29  定理 *11
n30  subst(groups=1)
n31  atom P
n32  atom Q
n33  axiom A1
n34  subst(groups=1)
n35  atom P
n36  imp
n37  imp
n38  atom Q
n39  axiom A2
n40  subst(groups=2)
n41  atom P
n42  atom Q
n43  atom R

接线：
n3.out → n4.assertion
n5.out → n4.atom1
n6.out → n7.a
n7.out → n4.formula1
n4.out → n2.a
n10.out → n11.assertion
n12.out → n11.atom1
n7.out → n11.formula1
n13.out → n11.atom2
n14.out → n15.a
n15.out → n11.formula2
n11.out → n9.a
n16.out → n17.assertion
n18.out → n17.atom1
n15.out → n19.a
n7.out → n19.b
n7.out → n20.a
n19.out → n20.b
n20.out → n17.formula1
n21.out → n17.atom2
n7.out → n17.formula2
n17.out → n9.b
n9.out → n8.a
n22.out → n23.assertion
n24.out → n23.atom1
n7.out → n23.formula1
n25.out → n23.atom2
n7.out → n23.formula2
n26.out → n23.atom3
n19.out → n23.formula3
n23.out → n8.b
n8.out → n2.b
n2.out → n1.a
n29.out → n30.assertion
n31.out → n30.atom1
n14.out → n30.formula1
n32.out → n30.atom2
n6.out → n30.formula2
n30.out → n28.a
n33.out → n34.assertion
n35.out → n34.atom1
n6.out → n36.a
n14.out → n36.b
n19.out → n37.a
n36.out → n37.b
n37.out → n34.formula1
n38.out → n34.atom2
n7.out → n34.formula2
n34.out → n28.b
n28.out → n27.a
n39.out → n40.assertion
n41.out → n40.atom1
n7.out → n40.formula1
n42.out → n40.atom2
n19.out → n40.formula2
n43.out → n40.atom3
n36.out → n40.formula3
n40.out → n27.b
n27.out → n1.b
n1.out → n44.proof
```

</details>

### Ⅰ-18 · 双重否定爆炸

- 目标：`⊢ ( P → ( ¬ P → Q ) )`
- 提示：P→¬P→Q
- 参考解：40 个模块 / 54 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n41  [target]
n1  mp
n2  mp
n3  定理 *06
n4  mp
n5  mp
n6  axiom A1
n7  subst(groups=0)
n8  atom Q
n9  atom P
n10  not
n11  axiom A1
n12  subst(groups=1)
n13  atom P
n14  imp
n15  imp
n16  atom Q
n17  axiom A2
n18  subst(groups=1)
n19  atom Q
n20  atom R
n21  mp
n22  mp
n23  mp
n24  定理 *17
n25  axiom A2
n26  subst(groups=2)
n27  atom P
n28  atom Q
n29  atom R
n30  atom Q
n31  axiom A1
n32  subst(groups=1)
n33  atom P
n34  imp
n35  imp
n36  atom Q
n37  axiom A2
n38  subst(groups=1)
n39  atom Q
n40  atom R

接线：
n3.out → n2.a
n6.out → n7.assertion
n8.out → n7.atom1
n9.out → n10.a
n10.out → n7.formula1
n7.out → n5.a
n11.out → n12.assertion
n13.out → n12.atom1
n10.out → n14.a
n9.out → n14.b
n9.out → n15.a
n14.out → n15.b
n15.out → n12.formula1
n16.out → n12.atom2
n9.out → n12.formula2
n12.out → n5.b
n5.out → n4.a
n17.out → n18.assertion
n19.out → n18.atom1
n9.out → n18.formula1
n20.out → n18.atom2
n14.out → n18.formula2
n18.out → n4.b
n4.out → n2.b
n2.out → n1.a
n24.out → n23.a
n25.out → n26.assertion
n27.out → n26.atom1
n10.out → n26.formula1
n28.out → n26.atom2
n9.out → n26.formula2
n29.out → n26.atom3
n30.out → n26.formula3
n26.out → n23.b
n23.out → n22.a
n31.out → n32.assertion
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
n37.out → n38.assertion
n39.out → n38.atom1
n14.out → n38.formula1
n40.out → n38.atom2
n34.out → n38.formula2
n38.out → n21.b
n21.out → n1.b
n1.out → n41.proof
```

</details>

### Ⅰ-19 · 析取引入左

- 目标：`⊢ ( P → ( P ∨ Q ) )`
- 提示：P 给出 P∨Q（∨ 是 ¬A→B 的缩写）。
- 参考解：2 个模块 / 2 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n3  [target]
n1  def-contract
n2  定理 *18

接线：
n2.out → n1.assertion
n1.out → n3.proof
```

</details>

### Ⅰ-20 · 后件替换

- 目标：`⊢ ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) )`
- 提示：(P→Q)→(R→P)→R→Q
- 参考解：46 个模块 / 66 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n47  [target]
n1  mp
n2  mp
n3  定理 *06
n4  subst(groups=0)
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  mp
n10  mp
n11  axiom A1
n12  subst(groups=1)
n13  atom P
n14  atom Q
n15  atom R
n16  axiom A1
n17  subst(groups=1)
n18  atom P
n19  imp
n20  imp
n21  atom Q
n22  axiom A2
n23  subst(groups=2)
n24  atom P
n25  atom Q
n26  atom R
n27  mp
n28  mp
n29  axiom A2
n30  subst(groups=2)
n31  atom P
n32  atom Q
n33  atom R
n34  axiom A1
n35  subst(groups=1)
n36  atom P
n37  imp
n38  imp
n39  imp
n40  imp
n41  atom Q
n42  axiom A2
n43  subst(groups=2)
n44  atom P
n45  atom Q
n46  atom R

接线：
n3.out → n4.assertion
n5.out → n4.atom1
n6.out → n8.a
n7.out → n8.b
n8.out → n4.formula1
n4.out → n2.a
n11.out → n12.assertion
n13.out → n12.atom1
n8.out → n12.formula1
n14.out → n12.atom2
n15.out → n12.formula2
n12.out → n10.a
n16.out → n17.assertion
n18.out → n17.atom1
n15.out → n19.a
n8.out → n19.b
n8.out → n20.a
n19.out → n20.b
n20.out → n17.formula1
n21.out → n17.atom2
n8.out → n17.formula2
n17.out → n10.b
n10.out → n9.a
n22.out → n23.assertion
n24.out → n23.atom1
n8.out → n23.formula1
n25.out → n23.atom2
n8.out → n23.formula2
n26.out → n23.atom3
n19.out → n23.formula3
n23.out → n9.b
n9.out → n2.b
n2.out → n1.a
n29.out → n30.assertion
n31.out → n30.atom1
n15.out → n30.formula1
n32.out → n30.atom2
n6.out → n30.formula2
n33.out → n30.atom3
n7.out → n30.formula3
n30.out → n28.a
n34.out → n35.assertion
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
n28.out → n27.a
n42.out → n43.assertion
n44.out → n43.atom1
n8.out → n43.formula1
n45.out → n43.atom2
n19.out → n43.formula2
n46.out → n43.atom3
n39.out → n43.formula3
n43.out → n27.b
n27.out → n1.b
n1.out → n47.proof
```

</details>

### Ⅰ-21 · 反证收尾

- 目标：`⊢ ( ( ¬ P → P ) → P )`
- 提示：(¬P→P)→P
- 参考解：54 个模块 / 78 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n55  [target]
n1  mp
n2  定理 *06
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
n14  定理 *17
n15  subst(groups=0)
n16  atom Q
n17  not
n18  axiom A2
n19  subst(groups=2)
n20  atom P
n21  atom Q
n22  atom R
n23  axiom A1
n24  subst(groups=1)
n25  atom P
n26  imp
n27  imp
n28  atom Q
n29  axiom A2
n30  subst(groups=2)
n31  atom P
n32  atom Q
n33  atom R
n34  mp
n35  mp
n36  定理 *11
n37  subst(groups=0)
n38  atom Q
n39  axiom A1
n40  subst(groups=1)
n41  atom P
n42  imp
n43  imp
n44  atom Q
n45  axiom A2
n46  subst(groups=2)
n47  atom P
n48  atom Q
n49  atom R
n50  axiom A2
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
n3.out → n10.a
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
n13.out → n12.a
n23.out → n24.assertion
n25.out → n24.atom1
n6.out → n26.a
n17.out → n26.b
n7.out → n27.a
n26.out → n27.b
n27.out → n24.formula1
n28.out → n24.atom2
n7.out → n24.formula2
n24.out → n12.b
n12.out → n11.a
n29.out → n30.assertion
n31.out → n30.atom1
n7.out → n30.formula1
n32.out → n30.atom2
n7.out → n30.formula2
n33.out → n30.atom3
n26.out → n30.formula3
n30.out → n11.b
n11.out → n10.b
n10.out → n9.a
n36.out → n37.assertion
n38.out → n37.atom1
n7.out → n37.formula1
n37.out → n35.a
n39.out → n40.assertion
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
n45.out → n46.assertion
n47.out → n46.atom1
n7.out → n46.formula1
n48.out → n46.atom2
n26.out → n46.formula2
n49.out → n46.atom3
n42.out → n46.formula3
n46.out → n34.b
n34.out → n9.b
n9.out → n8.a
n50.out → n51.assertion
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

### Ⅰ-22 · 双重否定消去

- 目标：`⊢ ( ¬ ¬ P → P )`
- 提示：¬¬P→P
- 参考解：22 个模块 / 30 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n23  [target]
n1  mp
n2  定理 *17
n3  subst(groups=1)
n4  atom P
n5  atom P
n6  not
n7  atom Q
n8  mp
n9  mp
n10  定理 *21
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

### Ⅰ-23 · 前件交换

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( Q → ( P → R ) ) )`
- 提示：(P→Q→R)→Q→P→R
- 参考解：95 个模块 / 140 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n96  [target]
n1  mp
n2  mp
n3  定理 *06
n4  subst(groups=0)
n5  atom P
n6  atom P
n7  atom Q
n8  atom R
n9  imp
n10  imp
n11  mp
n12  mp
n13  axiom A1
n14  subst(groups=0)
n15  atom P
n16  axiom A1
n17  subst(groups=1)
n18  atom P
n19  imp
n20  imp
n21  atom Q
n22  axiom A2
n23  subst(groups=2)
n24  atom P
n25  atom Q
n26  atom R
n27  mp
n28  mp
n29  mp
n30  mp
n31  定理 *15
n32  subst(groups=1)
n33  atom P
n34  atom Q
n35  axiom A1
n36  subst(groups=1)
n37  atom P
n38  imp
n39  imp
n40  atom Q
n41  mp
n42  mp
n43  mp
n44  mp
n45  定理 *20
n46  subst(groups=2)
n47  atom P
n48  atom Q
n49  atom R
n50  axiom A1
n51  subst(groups=0)
n52  atom P
n53  imp
n54  imp
n55  imp
n56  axiom A2
n57  subst(groups=2)
n58  atom P
n59  atom Q
n60  atom R
n61  axiom A1
n62  subst(groups=1)
n63  atom P
n64  imp
n65  imp
n66  atom Q
n67  axiom A2
n68  subst(groups=2)
n69  atom P
n70  atom Q
n71  atom R
n72  mp
n73  mp
n74  axiom A2
n75  subst(groups=2)
n76  atom P
n77  atom Q
n78  atom R
n79  axiom A1
n80  subst(groups=1)
n81  atom P
n82  imp
n83  imp
n84  imp
n85  atom Q
n86  axiom A2
n87  subst(groups=2)
n88  atom P
n89  atom Q
n90  atom R
n91  axiom A2
n92  subst(groups=2)
n93  atom P
n94  atom Q
n95  atom R

接线：
n3.out → n4.assertion
n5.out → n4.atom1
n7.out → n9.a
n8.out → n9.b
n6.out → n10.a
n9.out → n10.b
n10.out → n4.formula1
n4.out → n2.a
n13.out → n14.assertion
n15.out → n14.atom1
n10.out → n14.formula1
n14.out → n12.a
n16.out → n17.assertion
n18.out → n17.atom1
n7.out → n19.a
n10.out → n19.b
n10.out → n20.a
n19.out → n20.b
n20.out → n17.formula1
n21.out → n17.atom2
n10.out → n17.formula2
n17.out → n12.b
n12.out → n11.a
n22.out → n23.assertion
n24.out → n23.atom1
n10.out → n23.formula1
n25.out → n23.atom2
n10.out → n23.formula2
n26.out → n23.atom3
n19.out → n23.formula3
n23.out → n11.b
n11.out → n2.b
n2.out → n1.a
n31.out → n32.assertion
n33.out → n32.atom1
n7.out → n32.formula1
n34.out → n32.atom2
n8.out → n32.formula2
n32.out → n30.a
n35.out → n36.assertion
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
n50.out → n51.assertion
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
n56.out → n57.assertion
n58.out → n57.atom1
n7.out → n57.formula1
n59.out → n57.atom2
n38.out → n57.formula2
n60.out → n57.atom3
n54.out → n57.formula3
n57.out → n43.b
n43.out → n42.a
n61.out → n62.assertion
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
n67.out → n68.assertion
n69.out → n68.atom1
n10.out → n68.formula1
n70.out → n68.atom2
n39.out → n68.formula2
n71.out → n68.atom3
n64.out → n68.formula3
n68.out → n41.b
n41.out → n29.b
n29.out → n28.a
n74.out → n75.assertion
n76.out → n75.atom1
n7.out → n75.formula1
n77.out → n75.atom2
n10.out → n75.formula2
n78.out → n75.atom3
n53.out → n75.formula3
n75.out → n73.a
n79.out → n80.assertion
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
n86.out → n87.assertion
n88.out → n87.atom1
n10.out → n87.formula1
n89.out → n87.atom2
n64.out → n87.formula2
n90.out → n87.atom3
n83.out → n87.formula3
n87.out → n72.b
n72.out → n28.b
n28.out → n27.a
n91.out → n92.assertion
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

### Ⅰ-24 · 反件消去

- 目标：`⊢ ( ( ( P → Q ) → R ) → ( Q → R ) )`
- 提示：((P→Q)→R)→Q→R
- 参考解：97 个模块 / 138 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n98  [target]
n1  mp
n2  mp
n3  定理 *06
n4  subst(groups=0)
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  atom R
n10  imp
n11  mp
n12  mp
n13  axiom A1
n14  subst(groups=0)
n15  atom P
n16  axiom A1
n17  subst(groups=1)
n18  atom P
n19  imp
n20  imp
n21  atom Q
n22  axiom A2
n23  subst(groups=2)
n24  atom P
n25  atom Q
n26  atom R
n27  mp
n28  mp
n29  mp
n30  mp
n31  mp
n32  axiom A1
n33  subst(groups=1)
n34  atom P
n35  atom Q
n36  mp
n37  mp
n38  axiom A1
n39  subst(groups=1)
n40  atom P
n41  atom Q
n42  axiom A1
n43  subst(groups=0)
n44  atom P
n45  imp
n46  imp
n47  axiom A2
n48  subst(groups=2)
n49  atom P
n50  atom Q
n51  atom R
n52  mp
n53  mp
n54  mp
n55  mp
n56  mp
n57  定理 *06
n58  subst(groups=0)
n59  atom P
n60  axiom A1
n61  subst(groups=1)
n62  atom P
n63  imp
n64  atom Q
n65  axiom A2
n66  subst(groups=1)
n67  atom P
n68  atom Q
n69  axiom A2
n70  subst(groups=1)
n71  atom P
n72  atom Q
n73  axiom A1
n74  subst(groups=0)
n75  atom P
n76  imp
n77  imp
n78  axiom A2
n79  subst(groups=2)
n80  atom P
n81  atom Q
n82  atom R
n83  axiom A2
n84  subst(groups=1)
n85  atom P
n86  atom Q
n87  axiom A1
n88  subst(groups=1)
n89  atom P
n90  imp
n91  imp
n92  atom Q
n93  axiom A2
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
n4.out → n2.a
n13.out → n14.assertion
n15.out → n14.atom1
n10.out → n14.formula1
n14.out → n12.a
n16.out → n17.assertion
n18.out → n17.atom1
n7.out → n19.a
n10.out → n19.b
n10.out → n20.a
n19.out → n20.b
n20.out → n17.formula1
n21.out → n17.atom2
n10.out → n17.formula2
n17.out → n12.b
n12.out → n11.a
n22.out → n23.assertion
n24.out → n23.atom1
n10.out → n23.formula1
n25.out → n23.atom2
n10.out → n23.formula2
n26.out → n23.atom3
n19.out → n23.formula3
n23.out → n11.b
n11.out → n2.b
n2.out → n1.a
n32.out → n33.assertion
n34.out → n33.atom1
n7.out → n33.formula1
n35.out → n33.atom2
n6.out → n33.formula2
n33.out → n31.a
n38.out → n39.assertion
n40.out → n39.atom1
n8.out → n39.formula1
n41.out → n39.atom2
n10.out → n39.formula2
n39.out → n37.a
n42.out → n43.assertion
n44.out → n43.atom1
n10.out → n45.a
n8.out → n45.b
n8.out → n46.a
n45.out → n46.b
n46.out → n43.formula1
n43.out → n37.b
n37.out → n36.a
n47.out → n48.assertion
n49.out → n48.atom1
n7.out → n48.formula1
n50.out → n48.atom2
n8.out → n48.formula2
n51.out → n48.atom3
n45.out → n48.formula3
n48.out → n36.b
n36.out → n31.b
n31.out → n30.a
n57.out → n58.assertion
n59.out → n58.atom1
n9.out → n58.formula1
n58.out → n56.a
n60.out → n61.assertion
n62.out → n61.atom1
n9.out → n63.a
n9.out → n63.b
n63.out → n61.formula1
n64.out → n61.atom2
n8.out → n61.formula2
n61.out → n56.b
n56.out → n55.a
n65.out → n66.assertion
n67.out → n66.atom1
n8.out → n66.formula1
n68.out → n66.atom2
n9.out → n66.formula2
n66.out → n55.b
n55.out → n54.a
n69.out → n70.assertion
n71.out → n70.atom1
n10.out → n70.formula1
n72.out → n70.atom2
n8.out → n70.formula2
n70.out → n54.b
n54.out → n53.a
n73.out → n74.assertion
n75.out → n74.atom1
n10.out → n76.a
n9.out → n76.b
n45.out → n77.a
n76.out → n77.b
n77.out → n74.formula1
n74.out → n53.b
n53.out → n52.a
n78.out → n79.assertion
n80.out → n79.atom1
n7.out → n79.formula1
n81.out → n79.atom2
n45.out → n79.formula2
n82.out → n79.atom3
n76.out → n79.formula3
n79.out → n52.b
n52.out → n30.b
n30.out → n29.a
n83.out → n84.assertion
n85.out → n84.atom1
n7.out → n84.formula1
n86.out → n84.atom2
n10.out → n84.formula2
n84.out → n29.b
n29.out → n28.a
n87.out → n88.assertion
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
n93.out → n94.assertion
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

### Ⅰ-25 · 前件二次

- 目标：`⊢ ( ( ( P → Q ) → ( P → R ) ) → ( ( Q → P ) → ( Q → R ) ) )`
- 提示：((P→Q)→P→R)→(Q→P)→Q→R
- 参考解：30 个模块 / 43 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n31  [target]
n1  mp
n2  定理 *24
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
n26  axiom A2
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
n26.out → n27.assertion
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

### Ⅰ-26 · 二次否定

- 目标：`⊢ ( ( ( P → Q ) → ( Q → P ) ) → ( Q → P ) )`
- 提示：((P→Q)→Q→P)→Q→P
- 参考解：43 个模块 / 62 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n44  [target]
n1  mp
n2  mp
n3  定理 *06
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
n18  定理 *24
n19  subst(groups=0)
n20  atom R
n21  mp
n22  mp
n23  axiom A2
n24  subst(groups=1)
n25  atom P
n26  atom R
n27  axiom A1
n28  subst(groups=1)
n29  atom P
n30  imp
n31  imp
n32  imp
n33  atom Q
n34  axiom A2
n35  subst(groups=2)
n36  atom P
n37  atom Q
n38  atom R
n39  axiom A2
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
n27.out → n28.assertion
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
n34.out → n35.assertion
n36.out → n35.atom1
n15.out → n35.formula1
n37.out → n35.atom2
n30.out → n35.formula2
n38.out → n35.atom3
n31.out → n35.formula3
n35.out → n21.b
n21.out → n17.b
n17.out → n16.a
n39.out → n40.assertion
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

### Ⅰ-27 · 反件左消

- 目标：`⊢ ( ( ( P → Q ) → R ) → ( ¬ P → R ) )`
- 提示：((P→Q)→R)→¬P→R
- 参考解：98 个模块 / 140 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n99  [target]
n1  mp
n2  mp
n3  定理 *06
n4  subst(groups=0)
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  atom R
n10  imp
n11  mp
n12  mp
n13  axiom A1
n14  subst(groups=1)
n15  atom P
n16  atom Q
n17  not
n18  axiom A1
n19  subst(groups=1)
n20  atom P
n21  imp
n22  imp
n23  atom Q
n24  axiom A2
n25  subst(groups=2)
n26  atom P
n27  atom Q
n28  atom R
n29  mp
n30  mp
n31  mp
n32  mp
n33  mp
n34  定理 *17
n35  mp
n36  mp
n37  axiom A1
n38  subst(groups=1)
n39  atom P
n40  atom Q
n41  axiom A1
n42  subst(groups=1)
n43  atom P
n44  imp
n45  imp
n46  atom Q
n47  axiom A2
n48  subst(groups=2)
n49  atom P
n50  atom Q
n51  atom R
n52  mp
n53  mp
n54  mp
n55  mp
n56  mp
n57  定理 *06
n58  subst(groups=0)
n59  atom P
n60  axiom A1
n61  subst(groups=1)
n62  atom P
n63  imp
n64  atom Q
n65  axiom A2
n66  subst(groups=1)
n67  atom P
n68  atom Q
n69  axiom A2
n70  subst(groups=1)
n71  atom P
n72  atom Q
n73  axiom A1
n74  subst(groups=1)
n75  atom P
n76  imp
n77  imp
n78  atom Q
n79  axiom A2
n80  subst(groups=2)
n81  atom P
n82  atom Q
n83  atom R
n84  axiom A2
n85  subst(groups=1)
n86  atom P
n87  atom Q
n88  axiom A1
n89  subst(groups=1)
n90  atom P
n91  imp
n92  imp
n93  atom Q
n94  axiom A2
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
n4.out → n2.a
n13.out → n14.assertion
n15.out → n14.atom1
n10.out → n14.formula1
n16.out → n14.atom2
n6.out → n17.a
n17.out → n14.formula2
n14.out → n12.a
n18.out → n19.assertion
n20.out → n19.atom1
n17.out → n21.a
n10.out → n21.b
n10.out → n22.a
n21.out → n22.b
n22.out → n19.formula1
n23.out → n19.atom2
n10.out → n19.formula2
n19.out → n12.b
n12.out → n11.a
n24.out → n25.assertion
n26.out → n25.atom1
n10.out → n25.formula1
n27.out → n25.atom2
n10.out → n25.formula2
n28.out → n25.atom3
n21.out → n25.formula3
n25.out → n11.b
n11.out → n2.b
n2.out → n1.a
n34.out → n33.a
n37.out → n38.assertion
n39.out → n38.atom1
n8.out → n38.formula1
n40.out → n38.atom2
n10.out → n38.formula2
n38.out → n36.a
n41.out → n42.assertion
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
n47.out → n48.assertion
n49.out → n48.atom1
n17.out → n48.formula1
n50.out → n48.atom2
n8.out → n48.formula2
n51.out → n48.atom3
n44.out → n48.formula3
n48.out → n35.b
n35.out → n33.b
n33.out → n32.a
n57.out → n58.assertion
n59.out → n58.atom1
n9.out → n58.formula1
n58.out → n56.a
n60.out → n61.assertion
n62.out → n61.atom1
n9.out → n63.a
n9.out → n63.b
n63.out → n61.formula1
n64.out → n61.atom2
n8.out → n61.formula2
n61.out → n56.b
n56.out → n55.a
n65.out → n66.assertion
n67.out → n66.atom1
n8.out → n66.formula1
n68.out → n66.atom2
n9.out → n66.formula2
n66.out → n55.b
n55.out → n54.a
n69.out → n70.assertion
n71.out → n70.atom1
n10.out → n70.formula1
n72.out → n70.atom2
n8.out → n70.formula2
n70.out → n54.b
n54.out → n53.a
n73.out → n74.assertion
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
n79.out → n80.assertion
n81.out → n80.atom1
n17.out → n80.formula1
n82.out → n80.atom2
n44.out → n80.formula2
n83.out → n80.atom3
n76.out → n80.formula3
n80.out → n52.b
n52.out → n32.b
n32.out → n31.a
n84.out → n85.assertion
n86.out → n85.atom1
n17.out → n85.formula1
n87.out → n85.atom2
n10.out → n85.formula2
n85.out → n31.b
n31.out → n30.a
n88.out → n89.assertion
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
n94.out → n95.assertion
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

### Ⅰ-28 · 合取的蕴涵形式

- 目标：`⊢ ( P → ( Q → ¬ ( P → ¬ Q ) ) )`
- 提示：P→Q→¬(P→¬Q)
- 参考解：100 个模块 / 141 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n101  [target]
n1  mp
n2  mp
n3  mp
n4  定理 *06
n5  mp
n6  mp
n7  axiom A1
n8  subst(groups=0)
n9  atom Q
n10  atom P
n11  atom Q
n12  not
n13  imp
n14  not
n15  not
n16  axiom A1
n17  subst(groups=1)
n18  atom P
n19  imp
n20  imp
n21  atom Q
n22  axiom A2
n23  subst(groups=1)
n24  atom Q
n25  atom R
n26  mp
n27  mp
n28  mp
n29  mp
n30  mp
n31  定理 *22
n32  subst(groups=0)
n33  atom P
n34  mp
n35  mp
n36  axiom A1
n37  subst(groups=1)
n38  atom P
n39  atom Q
n40  axiom A1
n41  subst(groups=1)
n42  atom P
n43  imp
n44  imp
n45  atom Q
n46  axiom A2
n47  subst(groups=2)
n48  atom P
n49  atom Q
n50  atom R
n51  mp
n52  mp
n53  mp
n54  定理 *15
n55  subst(groups=0)
n56  atom Q
n57  axiom A2
n58  subst(groups=1)
n59  atom Q
n60  atom R
n61  axiom A1
n62  subst(groups=1)
n63  atom P
n64  imp
n65  atom Q
n66  axiom A2
n67  subst(groups=2)
n68  atom P
n69  atom Q
n70  atom R
n71  axiom A2
n72  subst(groups=2)
n73  atom P
n74  atom Q
n75  atom R
n76  axiom A1
n77  subst(groups=1)
n78  atom P
n79  imp
n80  imp
n81  atom Q
n82  axiom A2
n83  subst(groups=1)
n84  atom Q
n85  atom R
n86  mp
n87  mp
n88  定理 *11
n89  subst(groups=0)
n90  atom P
n91  axiom A1
n92  subst(groups=1)
n93  atom P
n94  imp
n95  imp
n96  atom Q
n97  axiom A2
n98  subst(groups=1)
n99  atom Q
n100  atom R

接线：
n4.out → n3.a
n7.out → n8.assertion
n9.out → n8.atom1
n11.out → n12.a
n10.out → n13.a
n12.out → n13.b
n13.out → n14.a
n14.out → n15.a
n15.out → n8.formula1
n8.out → n6.a
n16.out → n17.assertion
n18.out → n17.atom1
n15.out → n19.a
n10.out → n19.b
n10.out → n20.a
n19.out → n20.b
n20.out → n17.formula1
n21.out → n17.atom2
n10.out → n17.formula2
n17.out → n6.b
n6.out → n5.a
n22.out → n23.assertion
n24.out → n23.atom1
n10.out → n23.formula1
n25.out → n23.atom2
n19.out → n23.formula2
n23.out → n5.b
n5.out → n3.b
n3.out → n2.a
n31.out → n32.assertion
n33.out → n32.atom1
n13.out → n32.formula1
n32.out → n30.a
n36.out → n37.assertion
n38.out → n37.atom1
n13.out → n37.formula1
n39.out → n37.atom2
n10.out → n37.formula2
n37.out → n35.a
n40.out → n41.assertion
n42.out → n41.atom1
n10.out → n43.a
n13.out → n43.b
n13.out → n44.a
n43.out → n44.b
n44.out → n41.formula1
n45.out → n41.atom2
n15.out → n41.formula2
n41.out → n35.b
n35.out → n34.a
n46.out → n47.assertion
n48.out → n47.atom1
n15.out → n47.formula1
n49.out → n47.atom2
n13.out → n47.formula2
n50.out → n47.atom3
n43.out → n47.formula3
n47.out → n34.b
n34.out → n30.b
n30.out → n29.a
n54.out → n55.assertion
n56.out → n55.atom1
n12.out → n55.formula1
n55.out → n53.a
n57.out → n58.assertion
n59.out → n58.atom1
n13.out → n58.formula1
n60.out → n58.atom2
n12.out → n58.formula2
n58.out → n53.b
n53.out → n52.a
n61.out → n62.assertion
n63.out → n62.atom1
n43.out → n64.a
n13.out → n64.b
n64.out → n62.formula1
n65.out → n62.atom2
n15.out → n62.formula2
n62.out → n52.b
n52.out → n51.a
n66.out → n67.assertion
n68.out → n67.atom1
n15.out → n67.formula1
n69.out → n67.atom2
n43.out → n67.formula2
n70.out → n67.atom3
n13.out → n67.formula3
n67.out → n51.b
n51.out → n29.b
n29.out → n28.a
n71.out → n72.assertion
n73.out → n72.atom1
n15.out → n72.formula1
n74.out → n72.atom2
n10.out → n72.formula2
n75.out → n72.atom3
n12.out → n72.formula3
n72.out → n28.b
n28.out → n27.a
n76.out → n77.assertion
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
n82.out → n83.assertion
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
n91.out → n92.assertion
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
n97.out → n98.assertion
n99.out → n98.atom1
n79.out → n98.formula1
n100.out → n98.atom2
n94.out → n98.formula2
n98.out → n86.b
n86.out → n1.b
n1.out → n101.proof
```

</details>

### Ⅰ-29 · 合取引入

- 目标：`⊢ ( P → ( Q → ( P ∧ Q ) ) )`
- 提示：P、Q 一起给出 P∧Q（∧ 是 ¬(A→¬B) 的缩写）。
- 参考解：2 个模块 / 2 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n3  [target]
n1  def-contract
n2  定理 *28

接线：
n2.out → n1.assertion
n1.out → n3.proof
```

</details>

### Ⅰ-30 · 等值引入

- 目标：`⊢ ( ( P → Q ) → ( ( Q → P ) → ( P ↔ Q ) ) )`
- 提示：A→B 与 B→A 一起给出 A↔B。
- 参考解：9 个模块 / 11 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n10  [target]
n1  def-contract
n2  定理 *28
n3  subst(groups=1)
n4  atom P
n5  atom P
n6  atom Q
n7  imp
n8  atom Q
n9  imp

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n7.a
n6.out → n7.b
n7.out → n3.formula1
n8.out → n3.atom2
n6.out → n9.a
n5.out → n9.b
n9.out → n3.formula2
n3.out → n1.assertion
n1.out → n10.proof
```

</details>

### Ⅰ-31 · 否定后件换位

- 目标：`⊢ ( ( P → ¬ Q ) → ( Q → ¬ P ) )`
- 提示：(P→¬Q)→Q→¬P
- 参考解：102 个模块 / 148 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n103  [target]
n1  mp
n2  mp
n3  mp
n4  定理 *06
n5  subst(groups=0)
n6  atom P
n7  atom P
n8  atom Q
n9  not
n10  imp
n11  mp
n12  mp
n13  axiom A1
n14  subst(groups=1)
n15  atom P
n16  atom Q
n17  not
n18  not
n19  axiom A1
n20  subst(groups=1)
n21  atom P
n22  imp
n23  imp
n24  atom Q
n25  axiom A2
n26  subst(groups=2)
n27  atom P
n28  atom Q
n29  atom R
n30  mp
n31  mp
n32  mp
n33  mp
n34  mp
n35  定理 *22
n36  mp
n37  mp
n38  axiom A1
n39  subst(groups=0)
n40  atom Q
n41  axiom A1
n42  subst(groups=1)
n43  atom P
n44  imp
n45  imp
n46  atom Q
n47  axiom A2
n48  subst(groups=2)
n49  atom P
n50  atom Q
n51  atom R
n52  mp
n53  mp
n54  mp
n55  axiom A2
n56  subst(groups=2)
n57  atom P
n58  atom Q
n59  atom R
n60  axiom A1
n61  subst(groups=1)
n62  atom P
n63  imp
n64  imp
n65  atom Q
n66  axiom A2
n67  subst(groups=2)
n68  atom P
n69  atom Q
n70  atom R
n71  axiom A2
n72  subst(groups=2)
n73  atom P
n74  atom Q
n75  atom R
n76  axiom A1
n77  subst(groups=1)
n78  atom P
n79  imp
n80  imp
n81  atom Q
n82  axiom A2
n83  subst(groups=2)
n84  atom P
n85  atom Q
n86  atom R
n87  mp
n88  mp
n89  定理 *11
n90  subst(groups=0)
n91  atom P
n92  axiom A1
n93  subst(groups=1)
n94  atom P
n95  imp
n96  imp
n97  atom Q
n98  axiom A2
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
n5.out → n3.a
n13.out → n14.assertion
n15.out → n14.atom1
n10.out → n14.formula1
n16.out → n14.atom2
n7.out → n17.a
n17.out → n18.a
n18.out → n14.formula2
n14.out → n12.a
n19.out → n20.assertion
n21.out → n20.atom1
n18.out → n22.a
n10.out → n22.b
n10.out → n23.a
n22.out → n23.b
n23.out → n20.formula1
n24.out → n20.atom2
n10.out → n20.formula2
n20.out → n12.b
n12.out → n11.a
n25.out → n26.assertion
n27.out → n26.atom1
n10.out → n26.formula1
n28.out → n26.atom2
n10.out → n26.formula2
n29.out → n26.atom3
n22.out → n26.formula3
n26.out → n11.b
n11.out → n3.b
n3.out → n2.a
n35.out → n34.a
n38.out → n39.assertion
n40.out → n39.atom1
n10.out → n39.formula1
n39.out → n37.a
n41.out → n42.assertion
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
n47.out → n48.assertion
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
n55.out → n56.assertion
n57.out → n56.atom1
n10.out → n56.formula1
n58.out → n56.atom2
n7.out → n56.formula2
n59.out → n56.atom3
n9.out → n56.formula3
n56.out → n54.b
n54.out → n53.a
n60.out → n61.assertion
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
n66.out → n67.assertion
n68.out → n67.atom1
n18.out → n67.formula1
n69.out → n67.atom2
n44.out → n67.formula2
n70.out → n67.atom3
n63.out → n67.formula3
n67.out → n52.b
n52.out → n33.b
n33.out → n32.a
n71.out → n72.assertion
n73.out → n72.atom1
n18.out → n72.formula1
n74.out → n72.atom2
n10.out → n72.formula2
n75.out → n72.atom3
n9.out → n72.formula3
n72.out → n32.b
n32.out → n31.a
n76.out → n77.assertion
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
n82.out → n83.assertion
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
n92.out → n93.assertion
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
n98.out → n99.assertion
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

### Ⅰ-32 · 双重否定引入

- 目标：`⊢ ( P → ¬ ¬ P )`
- 提示：P→¬¬P
- 参考解：111 个模块 / 159 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n112  [target]
n1  mp
n2  定理 *06
n3  mp
n4  mp
n5  mp
n6  mp
n7  mp
n8  mp
n9  axiom A1
n10  subst(groups=0)
n11  atom Q
n12  atom P
n13  not
n14  not
n15  not
n16  axiom A1
n17  subst(groups=1)
n18  atom P
n19  imp
n20  imp
n21  atom Q
n22  axiom A2
n23  subst(groups=1)
n24  atom Q
n25  atom R
n26  mp
n27  mp
n28  mp
n29  mp
n30  mp
n31  定理 *22
n32  subst(groups=0)
n33  atom P
n34  mp
n35  mp
n36  axiom A1
n37  subst(groups=1)
n38  atom P
n39  atom Q
n40  axiom A1
n41  subst(groups=1)
n42  atom P
n43  imp
n44  imp
n45  atom Q
n46  axiom A2
n47  subst(groups=2)
n48  atom P
n49  atom Q
n50  atom R
n51  mp
n52  mp
n53  mp
n54  mp
n55  定理 *06
n56  subst(groups=0)
n57  atom P
n58  axiom A1
n59  subst(groups=1)
n60  atom P
n61  imp
n62  atom Q
n63  axiom A2
n64  subst(groups=1)
n65  atom Q
n66  atom R
n67  axiom A1
n68  subst(groups=1)
n69  atom P
n70  imp
n71  atom Q
n72  axiom A2
n73  subst(groups=2)
n74  atom P
n75  atom Q
n76  atom R
n77  axiom A2
n78  subst(groups=2)
n79  atom P
n80  atom Q
n81  atom R
n82  axiom A1
n83  subst(groups=1)
n84  atom P
n85  imp
n86  imp
n87  atom Q
n88  axiom A2
n89  subst(groups=1)
n90  atom Q
n91  atom R
n92  mp
n93  mp
n94  定理 *11
n95  subst(groups=1)
n96  atom P
n97  atom Q
n98  axiom A1
n99  subst(groups=1)
n100  atom P
n101  imp
n102  imp
n103  atom Q
n104  axiom A2
n105  subst(groups=1)
n106  atom Q
n107  atom R
n108  axiom A2
n109  subst(groups=1)
n110  atom Q
n111  atom R

接线：
n2.out → n1.a
n2.out → n6.a
n9.out → n10.assertion
n11.out → n10.atom1
n12.out → n13.a
n13.out → n14.a
n14.out → n15.a
n15.out → n10.formula1
n10.out → n8.a
n16.out → n17.assertion
n18.out → n17.atom1
n15.out → n19.a
n12.out → n19.b
n12.out → n20.a
n19.out → n20.b
n20.out → n17.formula1
n21.out → n17.atom2
n12.out → n17.formula2
n17.out → n8.b
n8.out → n7.a
n22.out → n23.assertion
n24.out → n23.atom1
n12.out → n23.formula1
n25.out → n23.atom2
n19.out → n23.formula2
n23.out → n7.b
n7.out → n6.b
n6.out → n5.a
n31.out → n32.assertion
n33.out → n32.atom1
n13.out → n32.formula1
n32.out → n30.a
n36.out → n37.assertion
n38.out → n37.atom1
n13.out → n37.formula1
n39.out → n37.atom2
n12.out → n37.formula2
n37.out → n35.a
n40.out → n41.assertion
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
n46.out → n47.assertion
n48.out → n47.atom1
n15.out → n47.formula1
n49.out → n47.atom2
n13.out → n47.formula2
n50.out → n47.atom3
n43.out → n47.formula3
n47.out → n34.b
n34.out → n30.b
n30.out → n29.a
n55.out → n56.assertion
n57.out → n56.atom1
n13.out → n56.formula1
n56.out → n54.a
n58.out → n59.assertion
n60.out → n59.atom1
n13.out → n61.a
n13.out → n61.b
n61.out → n59.formula1
n62.out → n59.atom2
n12.out → n59.formula2
n59.out → n54.b
n54.out → n53.a
n63.out → n64.assertion
n65.out → n64.atom1
n13.out → n64.formula1
n66.out → n64.atom2
n13.out → n64.formula2
n64.out → n53.b
n53.out → n52.a
n67.out → n68.assertion
n69.out → n68.atom1
n43.out → n70.a
n43.out → n70.b
n70.out → n68.formula1
n71.out → n68.atom2
n15.out → n68.formula2
n68.out → n52.b
n52.out → n51.a
n72.out → n73.assertion
n74.out → n73.atom1
n15.out → n73.formula1
n75.out → n73.atom2
n43.out → n73.formula2
n76.out → n73.atom3
n43.out → n73.formula3
n73.out → n51.b
n51.out → n29.b
n29.out → n28.a
n77.out → n78.assertion
n79.out → n78.atom1
n15.out → n78.formula1
n80.out → n78.atom2
n12.out → n78.formula2
n81.out → n78.atom3
n13.out → n78.formula3
n78.out → n28.b
n28.out → n27.a
n82.out → n83.assertion
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
n88.out → n89.assertion
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
n98.out → n99.assertion
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
n104.out → n105.assertion
n106.out → n105.atom1
n85.out → n105.formula1
n107.out → n105.atom2
n101.out → n105.formula2
n105.out → n92.b
n92.out → n4.b
n4.out → n3.a
n108.out → n109.assertion
n110.out → n109.atom1
n12.out → n109.formula1
n111.out → n109.atom2
n14.out → n109.formula2
n109.out → n3.b
n3.out → n1.b
n1.out → n112.proof
```

</details>

### Ⅰ-33 · 逆否换位

- 目标：`⊢ ( ( ¬ P → Q ) → ( ¬ Q → P ) )`
- 提示：(¬P→Q)→¬Q→P
- 参考解：54 个模块 / 75 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n55  [target]
n1  mp
n2  mp
n3  定理 *06
n4  subst(groups=0)
n5  atom P
n6  atom P
n7  not
n8  atom Q
n9  imp
n10  mp
n11  mp
n12  mp
n13  mp
n14  定理 *32
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
n28  axiom A1
n29  subst(groups=1)
n30  atom P
n31  imp
n32  imp
n33  atom Q
n34  axiom A2
n35  subst(groups=2)
n36  atom P
n37  atom Q
n38  atom R
n39  mp
n40  mp
n41  定理 *11
n42  subst(groups=0)
n43  atom Q
n44  axiom A1
n45  subst(groups=1)
n46  atom P
n47  imp
n48  imp
n49  atom Q
n50  axiom A2
n51  subst(groups=2)
n52  atom P
n53  atom Q
n54  atom R

接线：
n3.out → n4.assertion
n5.out → n4.atom1
n6.out → n7.a
n7.out → n9.a
n8.out → n9.b
n9.out → n4.formula1
n4.out → n2.a
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
n12.out → n11.a
n28.out → n29.assertion
n30.out → n29.atom1
n7.out → n31.a
n21.out → n31.b
n9.out → n32.a
n31.out → n32.b
n32.out → n29.formula1
n33.out → n29.atom2
n9.out → n29.formula2
n29.out → n11.b
n11.out → n10.a
n34.out → n35.assertion
n36.out → n35.atom1
n9.out → n35.formula1
n37.out → n35.atom2
n9.out → n35.formula2
n38.out → n35.atom3
n31.out → n35.formula3
n35.out → n10.b
n10.out → n2.b
n2.out → n1.a
n41.out → n42.assertion
n43.out → n42.atom1
n20.out → n42.formula1
n42.out → n40.a
n44.out → n45.assertion
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
n50.out → n51.assertion
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

### Ⅰ-34 · 蕴涵传递

- 目标：`⊢ ( ( P → Q ) → ( ( Q → R ) → ( P → R ) ) )`
- 提示：(P→Q)→(Q→R)→P→R
- 参考解：125 个模块 / 185 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n126  [target]
n1  mp
n2  mp
n3  定理 *06
n4  subst(groups=0)
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  mp
n10  mp
n11  axiom A1
n12  subst(groups=1)
n13  atom P
n14  atom Q
n15  atom R
n16  imp
n17  axiom A1
n18  subst(groups=1)
n19  atom P
n20  imp
n21  imp
n22  atom Q
n23  axiom A2
n24  subst(groups=2)
n25  atom P
n26  atom Q
n27  atom R
n28  mp
n29  mp
n30  mp
n31  mp
n32  mp
n33  定理 *13
n34  subst(groups=1)
n35  atom P
n36  atom Q
n37  mp
n38  mp
n39  axiom A1
n40  subst(groups=0)
n41  atom P
n42  imp
n43  axiom A1
n44  subst(groups=1)
n45  atom P
n46  imp
n47  imp
n48  atom Q
n49  axiom A2
n50  subst(groups=2)
n51  atom P
n52  atom Q
n53  atom R
n54  mp
n55  mp
n56  axiom A2
n57  subst(groups=1)
n58  atom P
n59  atom Q
n60  axiom A1
n61  subst(groups=1)
n62  atom P
n63  imp
n64  imp
n65  atom Q
n66  axiom A2
n67  subst(groups=2)
n68  atom P
n69  atom Q
n70  atom R
n71  mp
n72  mp
n73  mp
n74  mp
n75  定理 *20
n76  subst(groups=2)
n77  atom P
n78  atom Q
n79  atom R
n80  axiom A1
n81  subst(groups=1)
n82  atom P
n83  imp
n84  imp
n85  imp
n86  atom Q
n87  axiom A2
n88  subst(groups=2)
n89  atom P
n90  atom Q
n91  atom R
n92  axiom A1
n93  subst(groups=1)
n94  atom P
n95  imp
n96  atom Q
n97  axiom A2
n98  subst(groups=2)
n99  atom P
n100  atom Q
n101  atom R
n102  mp
n103  mp
n104  axiom A2
n105  subst(groups=2)
n106  atom P
n107  atom Q
n108  atom R
n109  axiom A1
n110  subst(groups=1)
n111  atom P
n112  imp
n113  imp
n114  imp
n115  atom Q
n116  axiom A2
n117  subst(groups=2)
n118  atom P
n119  atom Q
n120  atom R
n121  axiom A2
n122  subst(groups=2)
n123  atom P
n124  atom Q
n125  atom R

接线：
n3.out → n4.assertion
n5.out → n4.atom1
n6.out → n8.a
n7.out → n8.b
n8.out → n4.formula1
n4.out → n2.a
n11.out → n12.assertion
n13.out → n12.atom1
n8.out → n12.formula1
n14.out → n12.atom2
n7.out → n16.a
n15.out → n16.b
n16.out → n12.formula2
n12.out → n10.a
n17.out → n18.assertion
n19.out → n18.atom1
n16.out → n20.a
n8.out → n20.b
n8.out → n21.a
n20.out → n21.b
n21.out → n18.formula1
n22.out → n18.atom2
n8.out → n18.formula2
n18.out → n10.b
n10.out → n9.a
n23.out → n24.assertion
n25.out → n24.atom1
n8.out → n24.formula1
n26.out → n24.atom2
n8.out → n24.formula2
n27.out → n24.atom3
n20.out → n24.formula3
n24.out → n9.b
n9.out → n2.b
n2.out → n1.a
n33.out → n34.assertion
n35.out → n34.atom1
n8.out → n34.formula1
n36.out → n34.atom2
n15.out → n34.formula2
n34.out → n32.a
n39.out → n40.assertion
n41.out → n40.atom1
n15.out → n42.a
n15.out → n42.b
n42.out → n40.formula1
n40.out → n38.a
n43.out → n44.assertion
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
n49.out → n50.assertion
n51.out → n50.atom1
n8.out → n50.formula1
n52.out → n50.atom2
n42.out → n50.formula2
n53.out → n50.atom3
n46.out → n50.formula3
n50.out → n37.b
n37.out → n32.b
n32.out → n31.a
n56.out → n57.assertion
n58.out → n57.atom1
n7.out → n57.formula1
n59.out → n57.atom2
n15.out → n57.formula2
n57.out → n55.a
n60.out → n61.assertion
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
n66.out → n67.assertion
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
n80.out → n81.assertion
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
n87.out → n88.assertion
n89.out → n88.atom1
n16.out → n88.formula1
n90.out → n88.atom2
n16.out → n88.formula2
n91.out → n88.atom3
n84.out → n88.formula3
n88.out → n73.b
n73.out → n72.a
n92.out → n93.assertion
n94.out → n93.atom1
n63.out → n95.a
n85.out → n95.b
n95.out → n93.formula1
n96.out → n93.atom2
n8.out → n93.formula2
n93.out → n72.b
n72.out → n71.a
n97.out → n98.assertion
n99.out → n98.atom1
n8.out → n98.formula1
n100.out → n98.atom2
n63.out → n98.formula2
n101.out → n98.atom3
n85.out → n98.formula3
n98.out → n71.b
n71.out → n30.b
n30.out → n29.a
n104.out → n105.assertion
n106.out → n105.atom1
n16.out → n105.formula1
n107.out → n105.atom2
n8.out → n105.formula2
n108.out → n105.atom3
n83.out → n105.formula3
n105.out → n103.a
n109.out → n110.assertion
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
n116.out → n117.assertion
n118.out → n117.atom1
n8.out → n117.formula1
n119.out → n117.atom2
n85.out → n117.formula2
n120.out → n117.atom3
n113.out → n117.formula3
n117.out → n102.b
n102.out → n29.b
n29.out → n28.a
n121.out → n122.assertion
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

## Ⅱ 章

### Ⅱ-i · 全称例化

- 目标：`⊢ ( ∀ x F ( x ) → F ( z ) )`
- 提示：接一块 ∀E*：公式 F(x)、个体 z。
- 参考解：4 个模块 / 4 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n5  [target]
n1  all-inst(v=x)
n2  term x
n3  pred F
n4  term z

接线：
n2.out → n3.t1
n3.out → n1.formula
n4.out → n1.term
n1.out → n5.proof
```

</details>

### Ⅱ-ii · 全称推广

- 目标：`⊢ ∀ x ( P → ( Q → P ) )`
- 提示：接一块 ∀I：给 A1 的断言加 ∀x。
- 参考解：2 个模块 / 2 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n3  [target]
n1  gen(v=x)
n2  axiom A1

接线：
n2.out → n1.assertion
n1.out → n3.proof
```

</details>

### Ⅱ-iii · 全称引入（∀*）

- 目标：`⊢ ( R → ∀ x R )`
- 提示：接一块 ∀*：x 不在 R 中自由出现。
- 参考解：2 个模块 / 2 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n3  [target]
n1  shift(v=x)
n2  atom R

接线：
n2.out → n1.formula
n1.out → n3.proof
```

</details>

### Ⅱ-iv · 存在推广

- 目标：`⊢ ( F ( z ) → ∃ x F ( x ) )`
- 提示：接一块 ∃I*：公式 F(x)、个体 z。
- 参考解：4 个模块 / 4 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n5  [target]
n1  exists-gen(v=x)
n2  term x
n3  pred F
n4  term z

接线：
n2.out → n3.t1
n3.out → n1.formula
n4.out → n1.term
n1.out → n5.proof
```

</details>

### Ⅱ-01 · 全称弱化

- 目标：`⊢ ( ∀ x F ( x ) → ∀ x ( G ( x ) → F ( x ) ) )`
- 提示：目标是 ∀x F(x)→∀x (G(x)→F(x))。从最左的构造块接起，按参考接线接到 ⊢。
- 参考解：12 个模块 / 18 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n13  [target]
n1  mp
n2  gen(v=x)
n3  axiom A1
n4  subst(groups=1)
n5  atom P
n6  term x
n7  pred F
n8  atom Q
n9  pred G
n10  axiom A5(v=x)
n11  subst(groups=1)
n12  imp

接线：
n3.out → n4.assertion
n6.out → n7.t1
n5.out → n4.atom1
n7.out → n4.formula1
n6.out → n9.t1
n8.out → n4.atom2
n9.out → n4.formula2
n4.out → n2.assertion
n10.out → n11.assertion
n5.out → n11.atom1
n7.out → n11.formula1
n9.out → n12.a
n7.out → n12.b
n8.out → n11.atom2
n12.out → n11.formula2
n2.out → n1.a
n11.out → n1.b
n1.out → n13.proof
```

</details>

### Ⅱ-02 · 嵌套全称引入

- 目标：`⊢ ( F ( x ) → ( G ( y ) → ∀ x G ( y ) ) )`
- 提示：目标是 F(x)→G(y)→∀x G(y)。从最左的构造块接起，按参考接线接到 ⊢。
- 参考解：12 个模块 / 14 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n13  [target]
n1  mp
n2  shift(v=x)
n3  term y
n4  pred G
n5  axiom A1
n6  subst(groups=1)
n7  atom P
n8  all(v=x)
n9  imp
n10  atom Q
n11  term x
n12  pred F

接线：
n3.out → n4.t1
n4.out → n2.formula
n5.out → n6.assertion
n4.out → n8.a
n4.out → n9.a
n8.out → n9.b
n7.out → n6.atom1
n9.out → n6.formula1
n11.out → n12.t1
n10.out → n6.atom2
n12.out → n6.formula2
n2.out → n1.a
n6.out → n1.b
n1.out → n13.proof
```

</details>

### Ⅱ-03 · 前件提取

- 目标：`⊢ ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → G ( x ) ) )`
- 提示：目标是 (F(x)→∀x G(x))→F(x)→G(x)。从最左的构造块接起，按参考接线接到 ⊢。
- 参考解：16 个模块 / 25 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n17  [target]
n1  mp
n2  mp
n3  axiom A4(v=x)
n4  subst(groups=0)
n5  atom P
n6  term x
n7  pred G
n8  axiom A1
n9  subst(groups=1)
n10  all(v=x)
n11  imp
n12  atom Q
n13  pred F
n14  axiom A2
n15  subst(groups=2)
n16  atom R

接线：
n3.out → n4.assertion
n6.out → n7.t1
n5.out → n4.atom1
n7.out → n4.formula1
n8.out → n9.assertion
n7.out → n10.a
n10.out → n11.a
n7.out → n11.b
n5.out → n9.atom1
n11.out → n9.formula1
n6.out → n13.t1
n12.out → n9.atom2
n13.out → n9.formula2
n4.out → n2.a
n9.out → n2.b
n14.out → n15.assertion
n5.out → n15.atom1
n13.out → n15.formula1
n12.out → n15.atom2
n10.out → n15.formula2
n16.out → n15.atom3
n7.out → n15.formula3
n2.out → n1.a
n15.out → n1.b
n1.out → n17.proof
```

</details>

### Ⅱ-04 · 双重量词消去

- 目标：`⊢ ( ∀ x ∀ y F ( x ) → F ( x ) )`
- 提示：目标是 ∀x ∀y F(x)→F(x)。从最左的构造块接起，按参考接线接到 ⊢。
- 参考解：19 个模块 / 30 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n20  [target]
n1  mp
n2  axiom A4(v=x)
n3  subst(groups=0)
n4  atom P
n5  term x
n6  pred F
n7  all(v=y)
n8  mp
n9  mp
n10  axiom A4(v=y)
n11  subst(groups=0)
n12  axiom A1
n13  subst(groups=1)
n14  imp
n15  atom Q
n16  all(v=x)
n17  axiom A2
n18  subst(groups=2)
n19  atom R

接线：
n2.out → n3.assertion
n5.out → n6.t1
n6.out → n7.a
n4.out → n3.atom1
n7.out → n3.formula1
n10.out → n11.assertion
n4.out → n11.atom1
n6.out → n11.formula1
n12.out → n13.assertion
n7.out → n14.a
n6.out → n14.b
n4.out → n13.atom1
n14.out → n13.formula1
n7.out → n16.a
n15.out → n13.atom2
n16.out → n13.formula2
n11.out → n9.a
n13.out → n9.b
n17.out → n18.assertion
n4.out → n18.atom1
n16.out → n18.formula1
n15.out → n18.atom2
n7.out → n18.formula2
n19.out → n18.atom3
n6.out → n18.formula3
n9.out → n8.a
n18.out → n8.b
n3.out → n1.a
n8.out → n1.b
n1.out → n20.proof
```

</details>

### Ⅱ-05 · 二次回指

- 目标：`⊢ ( F ( x ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) )`
- 提示：目标是 F(x)→G(x)→H(x)→F(x)。从最左的构造块接起，按参考接线接到 ⊢。
- 参考解：19 个模块 / 38 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n20  [target]
n1  mp
n2  axiom A1
n3  atom P
n4  term x
n5  pred F
n6  atom Q
n7  axiom A2
n8  atom R
n9  subst(groups=1)
n10  pred H
n11  imp
n12  mp
n13  mp
n14  subst(groups=1)
n15  pred G
n16  subst(groups=1)
n17  imp
n18  imp
n19  subst(groups=2)

接线：
n4.out → n5.t1
n2.out → n9.assertion
n3.out → n9.atom1
n5.out → n9.formula1
n4.out → n10.t1
n6.out → n9.atom2
n10.out → n9.formula2
n10.out → n11.a
n5.out → n11.b
n2.out → n14.assertion
n3.out → n14.atom1
n11.out → n14.formula1
n4.out → n15.t1
n6.out → n14.atom2
n15.out → n14.formula2
n2.out → n16.assertion
n15.out → n17.a
n11.out → n17.b
n11.out → n18.a
n17.out → n18.b
n3.out → n16.atom1
n18.out → n16.formula1
n6.out → n16.atom2
n5.out → n16.formula2
n14.out → n13.a
n16.out → n13.b
n7.out → n19.assertion
n3.out → n19.atom1
n5.out → n19.formula1
n6.out → n19.atom2
n11.out → n19.formula2
n8.out → n19.atom3
n17.out → n19.formula3
n13.out → n12.a
n19.out → n12.b
n9.out → n1.a
n12.out → n1.b
n1.out → n20.proof
```

</details>

### Ⅱ-06 · 二元谓词例化

- 目标：`⊢ ( ∀ x F ( x , y ) → F ( z , y ) )`
- 提示：目标是 ∀x F(x,y)→F(z,y)：接一块 ∀E*，公式填 F(x,y)、个体填 z。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n6  [target]
n1  all-inst(v=x)
n2  term x
n3  term y
n4  pred F
n5  term z

接线：
n2.out → n4.t1
n3.out → n4.t2
n4.out → n1.formula
n5.out → n1.term
n1.out → n6.proof
```

</details>

### Ⅱ-07 · 全称分配（实例）

- 目标：`⊢ ( ∀ x ( F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → ∀ x G ( x ) ) )`
- 提示：目标是 ∀x(F(x)→G(x))→(∀xF(x)→∀xG(x))：接一块 A5，把 P、Q 分别代入 F(x)、G(x)。
- 参考解：7 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n8  [target]
n1  axiom A5(v=x)
n2  subst(groups=1)
n3  atom P
n4  term x
n5  pred F
n6  atom Q
n7  pred G

接线：
n1.out → n2.assertion
n3.out → n2.atom1
n4.out → n5.t1
n5.out → n2.formula1
n6.out → n2.atom2
n4.out → n7.t1
n7.out → n2.formula2
n2.out → n8.proof
```

</details>

### Ⅱ-08 · 无自由变元的全称引入

- 目标：`⊢ ( P → ( Q → ∀ x Q ) )`
- 提示：目标是 P→Q→∀x Q。先看量词在哪一层，再把 ∀ 分配/全称泛化接上。
- 参考解：10 个模块 / 12 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n11  [target]
n1  mp
n2  shift(v=x)
n3  atom Q
n4  axiom A1
n5  subst(groups=1)
n6  atom P
n7  all(v=x)
n8  imp
n9  atom Q
n10  atom P

接线：
n3.out → n2.formula
n2.out → n1.a
n4.out → n5.assertion
n6.out → n5.atom1
n3.out → n7.a
n3.out → n8.a
n7.out → n8.b
n8.out → n5.formula1
n9.out → n5.atom2
n10.out → n5.formula2
n5.out → n1.b
n1.out → n11.proof
```

</details>

### Ⅱ-09 · 中间引理

- 目标：`⊢ ( ∀ x ∀ y F ( x ) → ∀ y F ( x ) )`
- 提示：目标 ∀x ∀y F(x)→∀y F(x)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。
- 参考解：6 个模块 / 6 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n2  axiom A4(v=x)
n3  subst(groups=0)
n4  atom P
n5  term x
n6  pred F
n7  all(v=y)

接线：
n2.out → n3.assertion
n5.out → n6.t1
n6.out → n7.a
n4.out → n3.atom1
n7.out → n3.formula1
n3.out → tgt.proof
```

</details>

### Ⅱ-10 · 中间引理

- 目标：`⊢ ( H ( x ) → ( H ( x ) → H ( x ) ) )`
- 提示：目标 H(x)→H(x)→H(x)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。
- 参考解：6 个模块 / 7 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n4  axiom A1
n5  atom P
n6  term x
n10  atom Q
n14  pred H
n24  subst(groups=1)

接线：
n6.out → n14.t1
n4.out → n24.assertion
n5.out → n24.atom1
n14.out → n24.formula1
n10.out → n24.atom2
n14.out → n24.formula2
n24.out → tgt.proof
```

</details>

### Ⅱ-11 · 全称分配蕴涵

- 目标：`⊢ ( ∀ x ( P → Q ) → ( ∀ x P → ∀ x Q ) )`
- 提示：∀x (P→Q)→∀x P→∀x Q
- 参考解：1 个模块 / 1 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n2  [target]
n1  axiom A5(v=x)

接线：
n1.out → n2.proof
```

</details>

### Ⅱ-12 · 全称引入（wff）

- 目标：`⊢ ( P → ∀ x P )`
- 提示：P 里没有 x，所以 P→∀x P 成立。
- 参考解：2 个模块 / 2 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n3  [target]
n1  shift(v=x)
n2  atom P

接线：
n2.out → n1.formula
n1.out → n3.proof
```

</details>

### Ⅱ-13 · 无自由变元的全称引入

- 目标：`⊢ ( F ( y ) → ∀ x F ( y ) )`
- 提示：F(y) 里的 y 与 x 不同，所以可以加 ∀x。
- 参考解：3 个模块 / 3 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n4  [target]
n1  shift(v=x)
n2  term y
n3  pred F

接线：
n2.out → n3.t1
n3.out → n1.formula
n1.out → n4.proof
```

</details>

### Ⅱ-14 · 全称例化（实例）

- 目标：`⊢ ( ∀ x F ( x ) → F ( y ) )`
- 提示：∀x F(x) 可以例化到具体个体 y。
- 参考解：4 个模块 / 4 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n5  [target]
n1  all-inst(v=x)
n2  term x
n3  pred F
n4  term y

接线：
n2.out → n3.t1
n3.out → n1.formula
n4.out → n1.term
n1.out → n5.proof
```

</details>

### Ⅱ-15 · 存在推广（实例）

- 目标：`⊢ ( F ( y ) → ∃ x F ( x ) )`
- 提示：F(y) 可以推广成 ∃x F(x)。
- 参考解：4 个模块 / 4 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n5  [target]
n1  exists-gen(v=x)
n2  term x
n3  pred F
n4  term y

接线：
n2.out → n3.t1
n3.out → n1.formula
n4.out → n1.term
n1.out → n5.proof
```

</details>

### Ⅱ-16 · 全称弱化

- 目标：`⊢ ( ∀ x P → ∀ x ( Q → P ) )`
- 提示：∀x P→∀x (Q→P)
- 参考解：9 个模块 / 9 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n10  [target]
n1  mp
n2  gen(v=x)
n3  axiom A1
n4  定理 *11
n5  subst(groups=0)
n6  atom Q
n7  atom Q
n8  atom P
n9  imp

接线：
n3.out → n2.assertion
n2.out → n1.a
n4.out → n5.assertion
n6.out → n5.atom1
n7.out → n9.a
n8.out → n9.b
n9.out → n5.formula1
n5.out → n1.b
n1.out → n10.proof
```

</details>

### Ⅱ-17 · 全称分配（长公式二）

- 目标：`⊢ ( ∀ x ( ( F ( x ) → G ( x ) ) → H ( x ) ) → ( ∀ x ( F ( x ) → G ( x ) ) → ∀ x H ( x ) ) )`
- 提示：量词分配对任意复杂公式都成立。
- 参考解：9 个模块 / 11 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n10  [target]
n1  axiom A5(v=x)
n2  subst(groups=1)
n3  atom P
n4  term x
n5  pred F
n6  pred G
n7  imp
n8  atom Q
n9  pred H

接线：
n1.out → n2.assertion
n3.out → n2.atom1
n4.out → n5.t1
n4.out → n6.t1
n5.out → n7.a
n6.out → n7.b
n7.out → n2.formula1
n8.out → n2.atom2
n4.out → n9.t1
n9.out → n2.formula2
n2.out → n10.proof
```

</details>

### Ⅱ-18 · 全称分配（长公式）

- 目标：`⊢ ( ∀ x ( ( F ( x ) → ( G ( x ) → H ( x ) ) ) → F ( x ) ) → ( ∀ x ( F ( x ) → ( G ( x ) → H ( x ) ) ) → ∀ x F ( x ) ) )`
- 提示：量词分配对任意复杂公式都成立。
- 参考解：10 个模块 / 13 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n11  [target]
n1  axiom A5(v=x)
n2  subst(groups=1)
n3  atom P
n4  term x
n5  pred F
n6  pred G
n7  pred H
n8  imp
n9  imp
n10  atom Q

接线：
n1.out → n2.assertion
n3.out → n2.atom1
n4.out → n5.t1
n4.out → n6.t1
n4.out → n7.t1
n6.out → n8.a
n7.out → n8.b
n5.out → n9.a
n8.out → n9.b
n9.out → n2.formula1
n10.out → n2.atom2
n5.out → n2.formula2
n2.out → n11.proof
```

</details>

### Ⅱ-19 · 双重量词引入

- 目标：`⊢ ( F ( z ) → ∀ x ∀ y F ( z ) )`
- 提示：F(z)→∀x ∀y F(z)
- 参考解：22 个模块 / 35 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n23  [target]
n1  mp
n2  shift(v=x)
n3  term z
n4  pred F
n5  mp
n6  mp
n7  mp
n8  gen(v=x)
n9  shift(v=y)
n10  axiom A1
n11  atom P
n12  atom Q
n13  axiom A2
n14  atom R
n15  all(v=y)
n16  axiom A5(v=x)
n17  subst(groups=1)
n18  subst(groups=1)
n19  all(v=x)
n20  all(v=x)
n21  imp
n22  subst(groups=2)

接线：
n3.out → n4.t1
n4.out → n2.formula
n4.out → n9.formula
n4.out → n15.a
n9.out → n8.assertion
n16.out → n17.assertion
n11.out → n17.atom1
n4.out → n17.formula1
n12.out → n17.atom2
n15.out → n17.formula2
n8.out → n7.a
n17.out → n7.b
n10.out → n18.assertion
n4.out → n19.a
n15.out → n20.a
n19.out → n21.a
n20.out → n21.b
n11.out → n18.atom1
n21.out → n18.formula1
n12.out → n18.atom2
n4.out → n18.formula2
n7.out → n6.a
n18.out → n6.b
n13.out → n22.assertion
n11.out → n22.atom1
n4.out → n22.formula1
n12.out → n22.atom2
n19.out → n22.formula2
n14.out → n22.atom3
n20.out → n22.formula3
n6.out → n5.a
n22.out → n5.b
n2.out → n1.a
n5.out → n1.b
n1.out → n23.proof
```

</details>

### Ⅱ-20 · 三段全称分配

- 目标：`⊢ ( ∀ x ( F ( x ) → ( G ( x ) → H ( x ) ) ) → ( ∀ x F ( x ) → ( ∀ x G ( x ) → ∀ x H ( x ) ) ) )`
- 提示：∀x (F(x)→G(x)→H(x))→∀x F(x)→∀x G(x)→∀x H(x)
- 参考解：33 个模块 / 67 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n34  [target]
n1  mp
n2  axiom A5(v=x)
n3  subst(groups=1)
n4  atom P
n5  term x
n6  pred F
n7  atom Q
n8  pred G
n9  pred H
n10  imp
n11  mp
n12  mp
n13  mp
n14  mp
n15  subst(groups=1)
n16  axiom A1
n17  subst(groups=1)
n18  all(v=x)
n19  all(v=x)
n20  all(v=x)
n21  imp
n22  imp
n23  all(v=x)
n24  axiom A2
n25  subst(groups=2)
n26  atom R
n27  subst(groups=1)
n28  imp
n29  imp
n30  imp
n31  imp
n32  all(v=x)
n33  subst(groups=2)

接线：
n2.out → n3.assertion
n5.out → n6.t1
n4.out → n3.atom1
n6.out → n3.formula1
n5.out → n8.t1
n5.out → n9.t1
n8.out → n10.a
n9.out → n10.b
n7.out → n3.atom2
n10.out → n3.formula2
n2.out → n15.assertion
n4.out → n15.atom1
n8.out → n15.formula1
n7.out → n15.atom2
n9.out → n15.formula2
n16.out → n17.assertion
n10.out → n18.a
n8.out → n19.a
n9.out → n20.a
n19.out → n21.a
n20.out → n21.b
n18.out → n22.a
n21.out → n22.b
n4.out → n17.atom1
n22.out → n17.formula1
n6.out → n23.a
n7.out → n17.atom2
n23.out → n17.formula2
n15.out → n14.a
n17.out → n14.b
n24.out → n25.assertion
n4.out → n25.atom1
n23.out → n25.formula1
n7.out → n25.atom2
n18.out → n25.formula2
n26.out → n25.atom3
n21.out → n25.formula3
n14.out → n13.a
n25.out → n13.b
n16.out → n27.assertion
n23.out → n28.a
n18.out → n28.b
n23.out → n29.a
n21.out → n29.b
n28.out → n30.a
n29.out → n30.b
n4.out → n27.atom1
n30.out → n27.formula1
n6.out → n31.a
n10.out → n31.b
n31.out → n32.a
n7.out → n27.atom2
n32.out → n27.formula2
n13.out → n12.a
n27.out → n12.b
n24.out → n33.assertion
n4.out → n33.atom1
n32.out → n33.formula1
n7.out → n33.atom2
n28.out → n33.formula2
n26.out → n33.atom3
n29.out → n33.formula3
n12.out → n11.a
n33.out → n11.b
n3.out → n1.a
n11.out → n1.b
n1.out → n34.proof
```

</details>

### Ⅱ-21 · 混合三段论

- 目标：`⊢ ( ( F ( x ) → ∀ x ( G ( x ) → H ( x ) ) ) → ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )`
- 提示：(F(x)→∀x (G(x)→H(x)))→(F(x)→∀x G(x))→F(x)→∀x H(x)
- 参考解：33 个模块 / 71 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n34  [target]
n1  mp
n2  mp
n3  mp
n4  axiom A5(v=x)
n5  subst(groups=1)
n6  atom P
n7  term x
n8  pred G
n9  atom Q
n10  pred H
n11  axiom A1
n12  subst(groups=1)
n13  imp
n14  all(v=x)
n15  all(v=x)
n16  all(v=x)
n17  imp
n18  imp
n19  pred F
n20  axiom A2
n21  subst(groups=2)
n22  atom R
n23  mp
n24  mp
n25  subst(groups=2)
n26  subst(groups=1)
n27  imp
n28  imp
n29  imp
n30  imp
n31  imp
n32  imp
n33  subst(groups=2)

接线：
n4.out → n5.assertion
n7.out → n8.t1
n6.out → n5.atom1
n8.out → n5.formula1
n7.out → n10.t1
n9.out → n5.atom2
n10.out → n5.formula2
n11.out → n12.assertion
n8.out → n13.a
n10.out → n13.b
n13.out → n14.a
n8.out → n15.a
n10.out → n16.a
n15.out → n17.a
n16.out → n17.b
n14.out → n18.a
n17.out → n18.b
n6.out → n12.atom1
n18.out → n12.formula1
n7.out → n19.t1
n9.out → n12.atom2
n19.out → n12.formula2
n5.out → n3.a
n12.out → n3.b
n20.out → n21.assertion
n6.out → n21.atom1
n19.out → n21.formula1
n9.out → n21.atom2
n14.out → n21.formula2
n22.out → n21.atom3
n17.out → n21.formula3
n3.out → n2.a
n21.out → n2.b
n20.out → n25.assertion
n6.out → n25.atom1
n19.out → n25.formula1
n9.out → n25.atom2
n15.out → n25.formula2
n22.out → n25.atom3
n16.out → n25.formula3
n11.out → n26.assertion
n19.out → n27.a
n17.out → n27.b
n19.out → n28.a
n15.out → n28.b
n19.out → n29.a
n16.out → n29.b
n28.out → n30.a
n29.out → n30.b
n27.out → n31.a
n30.out → n31.b
n6.out → n26.atom1
n31.out → n26.formula1
n19.out → n32.a
n14.out → n32.b
n9.out → n26.atom2
n32.out → n26.formula2
n25.out → n24.a
n26.out → n24.b
n20.out → n33.assertion
n6.out → n33.atom1
n32.out → n33.formula1
n9.out → n33.atom2
n27.out → n33.formula2
n22.out → n33.atom3
n30.out → n33.formula3
n24.out → n23.a
n33.out → n23.b
n2.out → n1.a
n23.out → n1.b
n1.out → n34.proof
```

</details>

### Ⅱ-22 · 全称三段论

- 目标：`⊢ ( ∀ x ( G ( x ) → H ( x ) ) → ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )`
- 提示：∀x (G(x)→H(x))→(F(x)→∀x G(x))→F(x)→∀x H(x)
- 参考解：34 个模块 / 76 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n35  [target]
n1  mp
n2  mp
n3  axiom A5(v=x)
n4  subst(groups=1)
n5  atom P
n6  term x
n7  pred G
n8  atom Q
n9  pred H
n10  mp
n11  mp
n12  axiom A1
n13  subst(groups=1)
n14  all(v=x)
n15  all(v=x)
n16  imp
n17  pred F
n18  subst(groups=1)
n19  imp
n20  imp
n21  imp
n22  all(v=x)
n23  axiom A2
n24  subst(groups=2)
n25  atom R
n26  mp
n27  mp
n28  subst(groups=2)
n29  subst(groups=1)
n30  imp
n31  imp
n32  imp
n33  imp
n34  subst(groups=2)

接线：
n3.out → n4.assertion
n6.out → n7.t1
n5.out → n4.atom1
n7.out → n4.formula1
n6.out → n9.t1
n8.out → n4.atom2
n9.out → n4.formula2
n12.out → n13.assertion
n7.out → n14.a
n9.out → n15.a
n14.out → n16.a
n15.out → n16.b
n5.out → n13.atom1
n16.out → n13.formula1
n6.out → n17.t1
n8.out → n13.atom2
n17.out → n13.formula2
n12.out → n18.assertion
n17.out → n19.a
n16.out → n19.b
n16.out → n20.a
n19.out → n20.b
n5.out → n18.atom1
n20.out → n18.formula1
n7.out → n21.a
n9.out → n21.b
n21.out → n22.a
n8.out → n18.atom2
n22.out → n18.formula2
n13.out → n11.a
n18.out → n11.b
n23.out → n24.assertion
n5.out → n24.atom1
n22.out → n24.formula1
n8.out → n24.atom2
n16.out → n24.formula2
n25.out → n24.atom3
n19.out → n24.formula3
n11.out → n10.a
n24.out → n10.b
n4.out → n2.a
n10.out → n2.b
n23.out → n28.assertion
n5.out → n28.atom1
n17.out → n28.formula1
n8.out → n28.atom2
n14.out → n28.formula2
n25.out → n28.atom3
n15.out → n28.formula3
n12.out → n29.assertion
n17.out → n30.a
n14.out → n30.b
n17.out → n31.a
n15.out → n31.b
n30.out → n32.a
n31.out → n32.b
n19.out → n33.a
n32.out → n33.b
n5.out → n29.atom1
n33.out → n29.formula1
n8.out → n29.atom2
n22.out → n29.formula2
n28.out → n27.a
n29.out → n27.b
n23.out → n34.assertion
n5.out → n34.atom1
n22.out → n34.formula1
n8.out → n34.atom2
n19.out → n34.formula2
n25.out → n34.atom3
n32.out → n34.formula3
n27.out → n26.a
n34.out → n26.b
n2.out → n1.a
n26.out → n1.b
n1.out → n35.proof
```

</details>

### Ⅱ-23 · 全称后件组合

- 目标：`⊢ ( ( F ( x ) → ∀ x G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )`
- 提示：(F(x)→∀x G(x))→∀x (G(x)→H(x))→F(x)→∀x H(x)
- 参考解：27 个模块 / 51 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n28  [target]
n1  mp
n2  axiom A1
n3  atom P
n4  term x
n5  pred F
n6  pred G
n7  all(v=x)
n8  imp
n9  atom Q
n10  axiom A2
n11  atom R
n12  subst(groups=1)
n13  pred H
n14  imp
n15  all(v=x)
n16  imp
n17  mp
n18  mp
n19  mp
n20  定理 *22
n21  all(v=x)
n22  imp
n23  subst(groups=2)
n24  subst(groups=1)
n25  imp
n26  imp
n27  subst(groups=2)

接线：
n4.out → n5.t1
n4.out → n6.t1
n6.out → n7.a
n5.out → n8.a
n7.out → n8.b
n2.out → n12.assertion
n3.out → n12.atom1
n8.out → n12.formula1
n4.out → n13.t1
n6.out → n14.a
n13.out → n14.b
n14.out → n15.a
n9.out → n12.atom2
n15.out → n12.formula2
n15.out → n16.a
n8.out → n16.b
n13.out → n21.a
n5.out → n22.a
n21.out → n22.b
n10.out → n23.assertion
n3.out → n23.atom1
n15.out → n23.formula1
n9.out → n23.atom2
n8.out → n23.formula2
n11.out → n23.atom3
n22.out → n23.formula3
n20.out → n19.a
n23.out → n19.b
n2.out → n24.assertion
n15.out → n25.a
n22.out → n25.b
n16.out → n26.a
n25.out → n26.b
n3.out → n24.atom1
n26.out → n24.formula1
n9.out → n24.atom2
n8.out → n24.formula2
n19.out → n18.a
n24.out → n18.b
n10.out → n27.assertion
n3.out → n27.atom1
n8.out → n27.formula1
n9.out → n27.atom2
n16.out → n27.formula2
n11.out → n27.atom3
n25.out → n27.formula3
n18.out → n17.a
n27.out → n17.b
n12.out → n1.a
n17.out → n1.b
n1.out → n28.proof
```

</details>

### Ⅱ-24 · 全称三段论（H/F）

- 目标：`⊢ ( ∀ x ( F ( x ) → H ( x ) ) → ( ( G ( x ) → ∀ x F ( x ) ) → ( G ( x ) → ∀ x H ( x ) ) ) )`
- 提示：∀x (F(x)→H(x))→(G(x)→∀x F(x))→G(x)→∀x H(x)
- 参考解：34 个模块 / 76 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n35  [target]
n1  mp
n2  mp
n3  axiom A5(v=x)
n4  subst(groups=1)
n5  atom P
n6  term x
n7  pred F
n8  atom Q
n9  pred H
n10  mp
n11  mp
n12  axiom A1
n13  subst(groups=1)
n14  all(v=x)
n15  all(v=x)
n16  imp
n17  pred G
n18  subst(groups=1)
n19  imp
n20  imp
n21  imp
n22  all(v=x)
n23  axiom A2
n24  subst(groups=2)
n25  atom R
n26  mp
n27  mp
n28  subst(groups=2)
n29  subst(groups=1)
n30  imp
n31  imp
n32  imp
n33  imp
n34  subst(groups=2)

接线：
n3.out → n4.assertion
n6.out → n7.t1
n5.out → n4.atom1
n7.out → n4.formula1
n6.out → n9.t1
n8.out → n4.atom2
n9.out → n4.formula2
n12.out → n13.assertion
n7.out → n14.a
n9.out → n15.a
n14.out → n16.a
n15.out → n16.b
n5.out → n13.atom1
n16.out → n13.formula1
n6.out → n17.t1
n8.out → n13.atom2
n17.out → n13.formula2
n12.out → n18.assertion
n17.out → n19.a
n16.out → n19.b
n16.out → n20.a
n19.out → n20.b
n5.out → n18.atom1
n20.out → n18.formula1
n7.out → n21.a
n9.out → n21.b
n21.out → n22.a
n8.out → n18.atom2
n22.out → n18.formula2
n13.out → n11.a
n18.out → n11.b
n23.out → n24.assertion
n5.out → n24.atom1
n22.out → n24.formula1
n8.out → n24.atom2
n16.out → n24.formula2
n25.out → n24.atom3
n19.out → n24.formula3
n11.out → n10.a
n24.out → n10.b
n4.out → n2.a
n10.out → n2.b
n23.out → n28.assertion
n5.out → n28.atom1
n17.out → n28.formula1
n8.out → n28.atom2
n14.out → n28.formula2
n25.out → n28.atom3
n15.out → n28.formula3
n12.out → n29.assertion
n17.out → n30.a
n14.out → n30.b
n17.out → n31.a
n15.out → n31.b
n30.out → n32.a
n31.out → n32.b
n19.out → n33.a
n32.out → n33.b
n5.out → n29.atom1
n33.out → n29.formula1
n8.out → n29.atom2
n22.out → n29.formula2
n28.out → n27.a
n29.out → n27.b
n23.out → n34.assertion
n5.out → n34.atom1
n22.out → n34.formula1
n8.out → n34.atom2
n19.out → n34.formula2
n25.out → n34.atom3
n32.out → n34.formula3
n27.out → n26.a
n34.out → n26.b
n2.out → n1.a
n26.out → n1.b
n1.out → n35.proof
```

</details>

### Ⅱ-25 · 双层分配

- 目标：`⊢ ( ∀ x ∀ y ( F ( x ) → G ( x ) ) → ( ∀ x ∀ y F ( x ) → ∀ x ∀ y G ( x ) ) )`
- 提示：∀x ∀y (F(x)→G(x))→∀x ∀y F(x)→∀x ∀y G(x)
- 参考解：40 个模块 / 79 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n41  [target]
n1  mp
n2  gen(v=x)
n3  axiom A5(v=y)
n4  subst(groups=1)
n5  atom P
n6  term x
n7  pred F
n8  atom Q
n9  pred G
n10  mp
n11  axiom A5(v=x)
n12  subst(groups=1)
n13  imp
n14  all(v=y)
n15  all(v=y)
n16  all(v=y)
n17  imp
n18  mp
n19  mp
n20  mp
n21  mp
n22  subst(groups=1)
n23  axiom A1
n24  subst(groups=1)
n25  all(v=x)
n26  all(v=x)
n27  all(v=x)
n28  imp
n29  imp
n30  all(v=x)
n31  axiom A2
n32  subst(groups=2)
n33  atom R
n34  subst(groups=1)
n35  imp
n36  imp
n37  imp
n38  imp
n39  all(v=x)
n40  subst(groups=2)

接线：
n3.out → n4.assertion
n6.out → n7.t1
n5.out → n4.atom1
n7.out → n4.formula1
n6.out → n9.t1
n8.out → n4.atom2
n9.out → n4.formula2
n4.out → n2.assertion
n11.out → n12.assertion
n7.out → n13.a
n9.out → n13.b
n13.out → n14.a
n5.out → n12.atom1
n14.out → n12.formula1
n7.out → n15.a
n9.out → n16.a
n15.out → n17.a
n16.out → n17.b
n8.out → n12.atom2
n17.out → n12.formula2
n11.out → n22.assertion
n5.out → n22.atom1
n15.out → n22.formula1
n8.out → n22.atom2
n16.out → n22.formula2
n23.out → n24.assertion
n17.out → n25.a
n15.out → n26.a
n16.out → n27.a
n26.out → n28.a
n27.out → n28.b
n25.out → n29.a
n28.out → n29.b
n5.out → n24.atom1
n29.out → n24.formula1
n14.out → n30.a
n8.out → n24.atom2
n30.out → n24.formula2
n22.out → n21.a
n24.out → n21.b
n31.out → n32.assertion
n5.out → n32.atom1
n30.out → n32.formula1
n8.out → n32.atom2
n25.out → n32.formula2
n33.out → n32.atom3
n28.out → n32.formula3
n21.out → n20.a
n32.out → n20.b
n23.out → n34.assertion
n30.out → n35.a
n25.out → n35.b
n30.out → n36.a
n28.out → n36.b
n35.out → n37.a
n36.out → n37.b
n5.out → n34.atom1
n37.out → n34.formula1
n14.out → n38.a
n17.out → n38.b
n38.out → n39.a
n8.out → n34.atom2
n39.out → n34.formula2
n20.out → n19.a
n34.out → n19.b
n31.out → n40.assertion
n5.out → n40.atom1
n39.out → n40.formula1
n8.out → n40.atom2
n35.out → n40.formula2
n33.out → n40.atom3
n36.out → n40.formula3
n19.out → n18.a
n40.out → n18.b
n12.out → n10.a
n18.out → n10.b
n2.out → n1.a
n10.out → n1.b
n1.out → n41.proof
```

</details>

### Ⅱ-26 · 辖域移动（变体二）

- 目标：`⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )`
- 提示：∀x (F(y)→G(x))→F(y)→∀x G(x)
- 参考解：44 个模块 / 110 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n45  [target]
n1  mp
n2  axiom A1
n3  atom P
n4  term y
n5  pred F
n6  term x
n7  pred G
n8  imp
n9  all(v=x)
n10  atom Q
n11  axiom A2
n12  atom R
n13  subst(groups=1)
n14  imp
n15  mp
n16  mp
n17  mp
n18  mp
n19  mp
n20  shift(v=x)
n21  mp
n22  mp
n23  subst(groups=1)
n24  all(v=x)
n25  subst(groups=1)
n26  imp
n27  imp
n28  subst(groups=2)
n29  mp
n30  mp
n31  mp
n32  axiom A5(v=x)
n33  subst(groups=1)
n34  subst(groups=2)
n35  all(v=x)
n36  subst(groups=1)
n37  imp
n38  imp
n39  subst(groups=2)
n40  subst(groups=2)
n41  subst(groups=1)
n42  imp
n43  imp
n44  subst(groups=2)

接线：
n4.out → n5.t1
n6.out → n7.t1
n5.out → n8.a
n7.out → n8.b
n8.out → n9.a
n2.out → n13.assertion
n3.out → n13.atom1
n9.out → n13.formula1
n10.out → n13.atom2
n5.out → n13.formula2
n5.out → n14.a
n9.out → n14.b
n5.out → n20.formula
n2.out → n23.assertion
n5.out → n24.a
n3.out → n23.atom1
n24.out → n23.formula1
n10.out → n23.atom2
n9.out → n23.formula2
n2.out → n25.assertion
n9.out → n26.a
n24.out → n26.b
n24.out → n27.a
n26.out → n27.b
n3.out → n25.atom1
n27.out → n25.formula1
n10.out → n25.atom2
n5.out → n25.formula2
n23.out → n22.a
n25.out → n22.b
n11.out → n28.assertion
n3.out → n28.atom1
n5.out → n28.formula1
n10.out → n28.atom2
n24.out → n28.formula2
n12.out → n28.atom3
n26.out → n28.formula3
n22.out → n21.a
n28.out → n21.b
n20.out → n19.a
n21.out → n19.b
n32.out → n33.assertion
n3.out → n33.atom1
n5.out → n33.formula1
n10.out → n33.atom2
n7.out → n33.formula2
n11.out → n34.assertion
n3.out → n34.atom1
n9.out → n34.formula1
n10.out → n34.atom2
n24.out → n34.formula2
n7.out → n35.a
n12.out → n34.atom3
n35.out → n34.formula3
n33.out → n31.a
n34.out → n31.b
n2.out → n36.assertion
n9.out → n37.a
n35.out → n37.b
n26.out → n38.a
n37.out → n38.b
n3.out → n36.atom1
n38.out → n36.formula1
n10.out → n36.atom2
n5.out → n36.formula2
n31.out → n30.a
n36.out → n30.b
n11.out → n39.assertion
n3.out → n39.atom1
n5.out → n39.formula1
n10.out → n39.atom2
n26.out → n39.formula2
n12.out → n39.atom3
n37.out → n39.formula3
n30.out → n29.a
n39.out → n29.b
n19.out → n18.a
n29.out → n18.b
n11.out → n40.assertion
n3.out → n40.atom1
n5.out → n40.formula1
n10.out → n40.atom2
n9.out → n40.formula2
n12.out → n40.atom3
n35.out → n40.formula3
n18.out → n17.a
n40.out → n17.b
n2.out → n41.assertion
n5.out → n42.a
n35.out → n42.b
n14.out → n43.a
n42.out → n43.b
n3.out → n41.atom1
n43.out → n41.formula1
n10.out → n41.atom2
n9.out → n41.formula2
n17.out → n16.a
n41.out → n16.b
n11.out → n44.assertion
n3.out → n44.atom1
n9.out → n44.formula1
n10.out → n44.atom2
n14.out → n44.formula2
n12.out → n44.atom3
n42.out → n44.formula3
n16.out → n15.a
n44.out → n15.b
n13.out → n1.a
n15.out → n1.b
n1.out → n45.proof
```

</details>

### Ⅱ-27 · 辖域移动（H/G）

- 目标：`⊢ ( ∀ x ( H ( y ) → F ( x ) ) → ( H ( y ) → ∀ x F ( x ) ) )`
- 提示：∀x (H(y)→F(x))→H(y)→∀x F(x)
- 参考解：44 个模块 / 110 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n45  [target]
n1  mp
n2  axiom A1
n3  atom P
n4  term y
n5  pred H
n6  term x
n7  pred F
n8  imp
n9  all(v=x)
n10  atom Q
n11  axiom A2
n12  atom R
n13  subst(groups=1)
n14  imp
n15  mp
n16  mp
n17  mp
n18  mp
n19  mp
n20  shift(v=x)
n21  mp
n22  mp
n23  subst(groups=1)
n24  all(v=x)
n25  subst(groups=1)
n26  imp
n27  imp
n28  subst(groups=2)
n29  mp
n30  mp
n31  mp
n32  axiom A5(v=x)
n33  subst(groups=1)
n34  subst(groups=2)
n35  all(v=x)
n36  subst(groups=1)
n37  imp
n38  imp
n39  subst(groups=2)
n40  subst(groups=2)
n41  subst(groups=1)
n42  imp
n43  imp
n44  subst(groups=2)

接线：
n4.out → n5.t1
n6.out → n7.t1
n5.out → n8.a
n7.out → n8.b
n8.out → n9.a
n2.out → n13.assertion
n3.out → n13.atom1
n9.out → n13.formula1
n10.out → n13.atom2
n5.out → n13.formula2
n5.out → n14.a
n9.out → n14.b
n5.out → n20.formula
n2.out → n23.assertion
n5.out → n24.a
n3.out → n23.atom1
n24.out → n23.formula1
n10.out → n23.atom2
n9.out → n23.formula2
n2.out → n25.assertion
n9.out → n26.a
n24.out → n26.b
n24.out → n27.a
n26.out → n27.b
n3.out → n25.atom1
n27.out → n25.formula1
n10.out → n25.atom2
n5.out → n25.formula2
n23.out → n22.a
n25.out → n22.b
n11.out → n28.assertion
n3.out → n28.atom1
n5.out → n28.formula1
n10.out → n28.atom2
n24.out → n28.formula2
n12.out → n28.atom3
n26.out → n28.formula3
n22.out → n21.a
n28.out → n21.b
n20.out → n19.a
n21.out → n19.b
n32.out → n33.assertion
n3.out → n33.atom1
n5.out → n33.formula1
n10.out → n33.atom2
n7.out → n33.formula2
n11.out → n34.assertion
n3.out → n34.atom1
n9.out → n34.formula1
n10.out → n34.atom2
n24.out → n34.formula2
n7.out → n35.a
n12.out → n34.atom3
n35.out → n34.formula3
n33.out → n31.a
n34.out → n31.b
n2.out → n36.assertion
n9.out → n37.a
n35.out → n37.b
n26.out → n38.a
n37.out → n38.b
n3.out → n36.atom1
n38.out → n36.formula1
n10.out → n36.atom2
n5.out → n36.formula2
n31.out → n30.a
n36.out → n30.b
n11.out → n39.assertion
n3.out → n39.atom1
n5.out → n39.formula1
n10.out → n39.atom2
n26.out → n39.formula2
n12.out → n39.atom3
n37.out → n39.formula3
n30.out → n29.a
n39.out → n29.b
n19.out → n18.a
n29.out → n18.b
n11.out → n40.assertion
n3.out → n40.atom1
n5.out → n40.formula1
n10.out → n40.atom2
n9.out → n40.formula2
n12.out → n40.atom3
n35.out → n40.formula3
n18.out → n17.a
n40.out → n17.b
n2.out → n41.assertion
n5.out → n42.a
n35.out → n42.b
n14.out → n43.a
n42.out → n43.b
n3.out → n41.atom1
n43.out → n41.formula1
n10.out → n41.atom2
n9.out → n41.formula2
n17.out → n16.a
n41.out → n16.b
n11.out → n44.assertion
n3.out → n44.atom1
n9.out → n44.formula1
n10.out → n44.atom2
n14.out → n44.formula2
n12.out → n44.atom3
n42.out → n44.formula3
n16.out → n15.a
n44.out → n15.b
n13.out → n1.a
n15.out → n1.b
n1.out → n45.proof
```

</details>

### Ⅱ-28 · 辖域移动（F/G 变体）

- 目标：`⊢ ( ∀ x ( F ( z ) → G ( y ) ) → ( F ( z ) → ∀ x G ( y ) ) )`
- 提示：∀x (F(z)→G(y))→F(z)→∀x G(y)
- 参考解：44 个模块 / 110 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n45  [target]
n1  mp
n2  axiom A1
n3  atom P
n4  term z
n5  pred F
n6  term y
n7  pred G
n8  imp
n9  all(v=x)
n10  atom Q
n11  axiom A2
n12  atom R
n13  subst(groups=1)
n14  imp
n15  mp
n16  mp
n17  mp
n18  mp
n19  mp
n20  shift(v=x)
n21  mp
n22  mp
n23  subst(groups=1)
n24  all(v=x)
n25  subst(groups=1)
n26  imp
n27  imp
n28  subst(groups=2)
n29  mp
n30  mp
n31  mp
n32  axiom A5(v=x)
n33  subst(groups=1)
n34  subst(groups=2)
n35  all(v=x)
n36  subst(groups=1)
n37  imp
n38  imp
n39  subst(groups=2)
n40  subst(groups=2)
n41  subst(groups=1)
n42  imp
n43  imp
n44  subst(groups=2)

接线：
n4.out → n5.t1
n6.out → n7.t1
n5.out → n8.a
n7.out → n8.b
n8.out → n9.a
n2.out → n13.assertion
n3.out → n13.atom1
n9.out → n13.formula1
n10.out → n13.atom2
n5.out → n13.formula2
n5.out → n14.a
n9.out → n14.b
n5.out → n20.formula
n2.out → n23.assertion
n5.out → n24.a
n3.out → n23.atom1
n24.out → n23.formula1
n10.out → n23.atom2
n9.out → n23.formula2
n2.out → n25.assertion
n9.out → n26.a
n24.out → n26.b
n24.out → n27.a
n26.out → n27.b
n3.out → n25.atom1
n27.out → n25.formula1
n10.out → n25.atom2
n5.out → n25.formula2
n23.out → n22.a
n25.out → n22.b
n11.out → n28.assertion
n3.out → n28.atom1
n5.out → n28.formula1
n10.out → n28.atom2
n24.out → n28.formula2
n12.out → n28.atom3
n26.out → n28.formula3
n22.out → n21.a
n28.out → n21.b
n20.out → n19.a
n21.out → n19.b
n32.out → n33.assertion
n3.out → n33.atom1
n5.out → n33.formula1
n10.out → n33.atom2
n7.out → n33.formula2
n11.out → n34.assertion
n3.out → n34.atom1
n9.out → n34.formula1
n10.out → n34.atom2
n24.out → n34.formula2
n7.out → n35.a
n12.out → n34.atom3
n35.out → n34.formula3
n33.out → n31.a
n34.out → n31.b
n2.out → n36.assertion
n9.out → n37.a
n35.out → n37.b
n26.out → n38.a
n37.out → n38.b
n3.out → n36.atom1
n38.out → n36.formula1
n10.out → n36.atom2
n5.out → n36.formula2
n31.out → n30.a
n36.out → n30.b
n11.out → n39.assertion
n3.out → n39.atom1
n5.out → n39.formula1
n10.out → n39.atom2
n26.out → n39.formula2
n12.out → n39.atom3
n37.out → n39.formula3
n30.out → n29.a
n39.out → n29.b
n19.out → n18.a
n29.out → n18.b
n11.out → n40.assertion
n3.out → n40.atom1
n5.out → n40.formula1
n10.out → n40.atom2
n9.out → n40.formula2
n12.out → n40.atom3
n35.out → n40.formula3
n18.out → n17.a
n40.out → n17.b
n2.out → n41.assertion
n5.out → n42.a
n35.out → n42.b
n14.out → n43.a
n42.out → n43.b
n3.out → n41.atom1
n43.out → n41.formula1
n10.out → n41.atom2
n9.out → n41.formula2
n17.out → n16.a
n41.out → n16.b
n11.out → n44.assertion
n3.out → n44.atom1
n9.out → n44.formula1
n10.out → n44.atom2
n14.out → n44.formula2
n12.out → n44.atom3
n42.out → n44.formula3
n16.out → n15.a
n44.out → n15.b
n13.out → n1.a
n15.out → n1.b
n1.out → n45.proof
```

</details>

### Ⅱ-29 · 全称三段分配

- 目标：`⊢ ( ∀ x ( P → ( Q → R ) ) → ( ∀ x P → ( ∀ x Q → ∀ x R ) ) )`
- 提示：∀x (P→Q→R)→∀x P→∀x Q→∀x R
- 参考解：45 个模块 / 62 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n46  [target]
n1  mp
n2  定理 *11
n3  subst(groups=0)
n4  atom Q
n5  atom Q
n6  atom R
n7  imp
n8  mp
n9  mp
n10  mp
n11  mp
n12  定理 *11
n13  subst(groups=1)
n14  atom P
n15  atom Q
n16  axiom A1
n17  subst(groups=1)
n18  atom P
n19  all(v=x)
n20  all(v=x)
n21  all(v=x)
n22  imp
n23  imp
n24  atom Q
n25  atom P
n26  all(v=x)
n27  axiom A2
n28  subst(groups=2)
n29  atom P
n30  atom Q
n31  atom R
n32  axiom A1
n33  subst(groups=1)
n34  atom P
n35  imp
n36  imp
n37  imp
n38  atom Q
n39  imp
n40  all(v=x)
n41  axiom A2
n42  subst(groups=2)
n43  atom P
n44  atom Q
n45  atom R

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n7.a
n6.out → n7.b
n7.out → n3.formula1
n3.out → n1.a
n12.out → n13.assertion
n14.out → n13.atom1
n5.out → n13.formula1
n15.out → n13.atom2
n6.out → n13.formula2
n13.out → n11.a
n16.out → n17.assertion
n18.out → n17.atom1
n7.out → n19.a
n5.out → n20.a
n6.out → n21.a
n20.out → n22.a
n21.out → n22.b
n19.out → n23.a
n22.out → n23.b
n23.out → n17.formula1
n24.out → n17.atom2
n25.out → n26.a
n26.out → n17.formula2
n17.out → n11.b
n11.out → n10.a
n27.out → n28.assertion
n29.out → n28.atom1
n26.out → n28.formula1
n30.out → n28.atom2
n19.out → n28.formula2
n31.out → n28.atom3
n22.out → n28.formula3
n28.out → n10.b
n10.out → n9.a
n32.out → n33.assertion
n34.out → n33.atom1
n26.out → n35.a
n19.out → n35.b
n26.out → n36.a
n22.out → n36.b
n35.out → n37.a
n36.out → n37.b
n37.out → n33.formula1
n38.out → n33.atom2
n25.out → n39.a
n7.out → n39.b
n39.out → n40.a
n40.out → n33.formula2
n33.out → n9.b
n9.out → n8.a
n41.out → n42.assertion
n43.out → n42.atom1
n40.out → n42.formula1
n44.out → n42.atom2
n35.out → n42.formula2
n45.out → n42.atom3
n36.out → n42.formula3
n42.out → n8.b
n8.out → n1.b
n1.out → n46.proof
```

</details>

### Ⅱ-30 · 全称替换前件

- 目标：`⊢ ( ( F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → G ( x ) ) )`
- 提示：(F(x)→G(x))→∀x F(x)→G(x)
- 参考解：46 个模块 / 128 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n47  [target]
n1  mp
n2  mp
n3  axiom A1
n4  subst(groups=1)
n5  atom P
n6  term x
n7  pred F
n8  pred G
n9  imp
n10  atom Q
n11  mp
n12  subst(groups=1)
n13  imp
n14  axiom A2
n15  subst(groups=2)
n16  atom R
n17  subst(groups=1)
n18  all(v=x)
n19  imp
n20  mp
n21  mp
n22  mp
n23  mp
n24  mp
n25  axiom A4(v=x)
n26  subst(groups=0)
n27  mp
n28  mp
n29  subst(groups=1)
n30  subst(groups=1)
n31  imp
n32  imp
n33  subst(groups=2)
n34  mp
n35  mp
n36  mp
n37  subst(groups=2)
n38  subst(groups=1)
n39  imp
n40  imp
n41  subst(groups=2)
n42  subst(groups=2)
n43  subst(groups=1)
n44  imp
n45  imp
n46  subst(groups=2)

接线：
n3.out → n4.assertion
n6.out → n7.t1
n6.out → n8.t1
n7.out → n9.a
n8.out → n9.b
n5.out → n4.atom1
n9.out → n4.formula1
n10.out → n4.atom2
n9.out → n4.formula2
n3.out → n12.assertion
n5.out → n12.atom1
n9.out → n12.formula1
n9.out → n13.a
n9.out → n13.b
n10.out → n12.atom2
n13.out → n12.formula2
n14.out → n15.assertion
n5.out → n15.atom1
n9.out → n15.formula1
n10.out → n15.atom2
n13.out → n15.formula2
n16.out → n15.atom3
n9.out → n15.formula3
n12.out → n11.a
n15.out → n11.b
n4.out → n2.a
n11.out → n2.b
n3.out → n17.assertion
n5.out → n17.atom1
n9.out → n17.formula1
n7.out → n18.a
n10.out → n17.atom2
n18.out → n17.formula2
n18.out → n19.a
n9.out → n19.b
n25.out → n26.assertion
n5.out → n26.atom1
n7.out → n26.formula1
n3.out → n29.assertion
n5.out → n29.atom1
n7.out → n29.formula1
n10.out → n29.atom2
n9.out → n29.formula2
n3.out → n30.assertion
n9.out → n31.a
n7.out → n31.b
n7.out → n32.a
n31.out → n32.b
n5.out → n30.atom1
n32.out → n30.formula1
n10.out → n30.atom2
n18.out → n30.formula2
n29.out → n28.a
n30.out → n28.b
n14.out → n33.assertion
n5.out → n33.atom1
n18.out → n33.formula1
n10.out → n33.atom2
n7.out → n33.formula2
n16.out → n33.atom3
n31.out → n33.formula3
n28.out → n27.a
n33.out → n27.b
n26.out → n24.a
n27.out → n24.b
n14.out → n37.assertion
n5.out → n37.atom1
n9.out → n37.formula1
n10.out → n37.atom2
n7.out → n37.formula2
n16.out → n37.atom3
n8.out → n37.formula3
n2.out → n36.a
n37.out → n36.b
n3.out → n38.assertion
n9.out → n39.a
n8.out → n39.b
n31.out → n40.a
n39.out → n40.b
n5.out → n38.atom1
n40.out → n38.formula1
n10.out → n38.atom2
n18.out → n38.formula2
n36.out → n35.a
n38.out → n35.b
n14.out → n41.assertion
n5.out → n41.atom1
n18.out → n41.formula1
n10.out → n41.atom2
n31.out → n41.formula2
n16.out → n41.atom3
n39.out → n41.formula3
n35.out → n34.a
n41.out → n34.b
n24.out → n23.a
n34.out → n23.b
n14.out → n42.assertion
n5.out → n42.atom1
n18.out → n42.formula1
n10.out → n42.atom2
n9.out → n42.formula2
n16.out → n42.atom3
n8.out → n42.formula3
n23.out → n22.a
n42.out → n22.b
n3.out → n43.assertion
n18.out → n44.a
n8.out → n44.b
n19.out → n45.a
n44.out → n45.b
n5.out → n43.atom1
n45.out → n43.formula1
n10.out → n43.atom2
n9.out → n43.formula2
n22.out → n21.a
n43.out → n21.b
n14.out → n46.assertion
n5.out → n46.atom1
n9.out → n46.formula1
n10.out → n46.atom2
n19.out → n46.formula2
n16.out → n46.atom3
n44.out → n46.formula3
n21.out → n20.a
n46.out → n20.b
n17.out → n1.a
n20.out → n1.b
n1.out → n47.proof
```

</details>

### Ⅱ-31 · 全称替换前件（G）

- 目标：`⊢ ( ( G ( x ) → F ( x ) ) → ( ∀ x G ( x ) → F ( x ) ) )`
- 提示：(G(x)→F(x))→∀x G(x)→F(x)
- 参考解：46 个模块 / 128 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n47  [target]
n1  mp
n2  mp
n3  axiom A1
n4  subst(groups=1)
n5  atom P
n6  term x
n7  pred G
n8  pred F
n9  imp
n10  atom Q
n11  mp
n12  subst(groups=1)
n13  imp
n14  axiom A2
n15  subst(groups=2)
n16  atom R
n17  subst(groups=1)
n18  all(v=x)
n19  imp
n20  mp
n21  mp
n22  mp
n23  mp
n24  mp
n25  axiom A4(v=x)
n26  subst(groups=0)
n27  mp
n28  mp
n29  subst(groups=1)
n30  subst(groups=1)
n31  imp
n32  imp
n33  subst(groups=2)
n34  mp
n35  mp
n36  mp
n37  subst(groups=2)
n38  subst(groups=1)
n39  imp
n40  imp
n41  subst(groups=2)
n42  subst(groups=2)
n43  subst(groups=1)
n44  imp
n45  imp
n46  subst(groups=2)

接线：
n3.out → n4.assertion
n6.out → n7.t1
n6.out → n8.t1
n7.out → n9.a
n8.out → n9.b
n5.out → n4.atom1
n9.out → n4.formula1
n10.out → n4.atom2
n9.out → n4.formula2
n3.out → n12.assertion
n5.out → n12.atom1
n9.out → n12.formula1
n9.out → n13.a
n9.out → n13.b
n10.out → n12.atom2
n13.out → n12.formula2
n14.out → n15.assertion
n5.out → n15.atom1
n9.out → n15.formula1
n10.out → n15.atom2
n13.out → n15.formula2
n16.out → n15.atom3
n9.out → n15.formula3
n12.out → n11.a
n15.out → n11.b
n4.out → n2.a
n11.out → n2.b
n3.out → n17.assertion
n5.out → n17.atom1
n9.out → n17.formula1
n7.out → n18.a
n10.out → n17.atom2
n18.out → n17.formula2
n18.out → n19.a
n9.out → n19.b
n25.out → n26.assertion
n5.out → n26.atom1
n7.out → n26.formula1
n3.out → n29.assertion
n5.out → n29.atom1
n7.out → n29.formula1
n10.out → n29.atom2
n9.out → n29.formula2
n3.out → n30.assertion
n9.out → n31.a
n7.out → n31.b
n7.out → n32.a
n31.out → n32.b
n5.out → n30.atom1
n32.out → n30.formula1
n10.out → n30.atom2
n18.out → n30.formula2
n29.out → n28.a
n30.out → n28.b
n14.out → n33.assertion
n5.out → n33.atom1
n18.out → n33.formula1
n10.out → n33.atom2
n7.out → n33.formula2
n16.out → n33.atom3
n31.out → n33.formula3
n28.out → n27.a
n33.out → n27.b
n26.out → n24.a
n27.out → n24.b
n14.out → n37.assertion
n5.out → n37.atom1
n9.out → n37.formula1
n10.out → n37.atom2
n7.out → n37.formula2
n16.out → n37.atom3
n8.out → n37.formula3
n2.out → n36.a
n37.out → n36.b
n3.out → n38.assertion
n9.out → n39.a
n8.out → n39.b
n31.out → n40.a
n39.out → n40.b
n5.out → n38.atom1
n40.out → n38.formula1
n10.out → n38.atom2
n18.out → n38.formula2
n36.out → n35.a
n38.out → n35.b
n14.out → n41.assertion
n5.out → n41.atom1
n18.out → n41.formula1
n10.out → n41.atom2
n31.out → n41.formula2
n16.out → n41.atom3
n39.out → n41.formula3
n35.out → n34.a
n41.out → n34.b
n24.out → n23.a
n34.out → n23.b
n14.out → n42.assertion
n5.out → n42.atom1
n18.out → n42.formula1
n10.out → n42.atom2
n9.out → n42.formula2
n16.out → n42.atom3
n8.out → n42.formula3
n23.out → n22.a
n42.out → n22.b
n3.out → n43.assertion
n18.out → n44.a
n8.out → n44.b
n19.out → n45.a
n44.out → n45.b
n5.out → n43.atom1
n45.out → n43.formula1
n10.out → n43.atom2
n9.out → n43.formula2
n22.out → n21.a
n43.out → n21.b
n14.out → n46.assertion
n5.out → n46.atom1
n9.out → n46.formula1
n10.out → n46.atom2
n19.out → n46.formula2
n16.out → n46.atom3
n44.out → n46.formula3
n21.out → n20.a
n46.out → n20.b
n17.out → n1.a
n20.out → n1.b
n1.out → n47.proof
```

</details>

### Ⅱ-32 · 全称后件传递

- 目标：`⊢ ( ∀ x ( P → Q ) → ( ( R → ∀ x P ) → ( R → ∀ x Q ) ) )`
- 提示：∀x (P→Q)→(R→∀x P)→R→∀x Q
- 参考解：48 个模块 / 68 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n49  [target]
n1  mp
n2  mp
n3  定理 *11
n4  mp
n5  mp
n6  axiom A1
n7  subst(groups=1)
n8  atom P
n9  atom P
n10  all(v=x)
n11  atom Q
n12  all(v=x)
n13  imp
n14  atom Q
n15  atom R
n16  axiom A1
n17  subst(groups=1)
n18  atom P
n19  imp
n20  imp
n21  atom Q
n22  imp
n23  all(v=x)
n24  axiom A2
n25  subst(groups=2)
n26  atom P
n27  atom Q
n28  atom R
n29  mp
n30  mp
n31  axiom A2
n32  subst(groups=2)
n33  atom P
n34  atom Q
n35  atom R
n36  axiom A1
n37  subst(groups=1)
n38  atom P
n39  imp
n40  imp
n41  imp
n42  imp
n43  atom Q
n44  axiom A2
n45  subst(groups=2)
n46  atom P
n47  atom Q
n48  atom R

接线：
n3.out → n2.a
n6.out → n7.assertion
n8.out → n7.atom1
n9.out → n10.a
n11.out → n12.a
n10.out → n13.a
n12.out → n13.b
n13.out → n7.formula1
n14.out → n7.atom2
n15.out → n7.formula2
n7.out → n5.a
n16.out → n17.assertion
n18.out → n17.atom1
n15.out → n19.a
n13.out → n19.b
n13.out → n20.a
n19.out → n20.b
n20.out → n17.formula1
n21.out → n17.atom2
n9.out → n22.a
n11.out → n22.b
n22.out → n23.a
n23.out → n17.formula2
n17.out → n5.b
n5.out → n4.a
n24.out → n25.assertion
n26.out → n25.atom1
n23.out → n25.formula1
n27.out → n25.atom2
n13.out → n25.formula2
n28.out → n25.atom3
n19.out → n25.formula3
n25.out → n4.b
n4.out → n2.b
n2.out → n1.a
n31.out → n32.assertion
n33.out → n32.atom1
n15.out → n32.formula1
n34.out → n32.atom2
n10.out → n32.formula2
n35.out → n32.atom3
n12.out → n32.formula3
n32.out → n30.a
n36.out → n37.assertion
n38.out → n37.atom1
n15.out → n39.a
n10.out → n39.b
n15.out → n40.a
n12.out → n40.b
n39.out → n41.a
n40.out → n41.b
n19.out → n42.a
n41.out → n42.b
n42.out → n37.formula1
n43.out → n37.atom2
n23.out → n37.formula2
n37.out → n30.b
n30.out → n29.a
n44.out → n45.assertion
n46.out → n45.atom1
n23.out → n45.formula1
n47.out → n45.atom2
n19.out → n45.formula2
n48.out → n45.atom3
n41.out → n45.formula3
n45.out → n29.b
n29.out → n1.b
n1.out → n49.proof
```

</details>

### Ⅱ-33 · 四段分配

- 目标：`⊢ ( ∀ x ( F ( x ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) ) → ( ∀ x F ( x ) → ( ∀ x G ( x ) → ( ∀ x H ( x ) → ∀ x F ( x ) ) ) ) )`
- 提示：∀x (F(x)→G(x)→H(x)→F(x))→∀x F(x)→∀x G(x)→∀x H(x)→∀x F(x)
- 参考解：49 个模块 / 117 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n50  [target]
n1  mp
n2  axiom A5(v=x)
n3  subst(groups=1)
n4  atom P
n5  term x
n6  pred F
n7  atom Q
n8  pred G
n9  pred H
n10  imp
n11  imp
n12  mp
n13  mp
n14  mp
n15  mp
n16  mp
n17  subst(groups=1)
n18  mp
n19  mp
n20  mp
n21  mp
n22  subst(groups=1)
n23  axiom A1
n24  subst(groups=1)
n25  all(v=x)
n26  all(v=x)
n27  all(v=x)
n28  imp
n29  imp
n30  all(v=x)
n31  axiom A2
n32  subst(groups=2)
n33  atom R
n34  subst(groups=1)
n35  imp
n36  imp
n37  imp
n38  all(v=x)
n39  subst(groups=2)
n40  subst(groups=1)
n41  imp
n42  subst(groups=2)
n43  subst(groups=1)
n44  imp
n45  imp
n46  imp
n47  imp
n48  all(v=x)
n49  subst(groups=2)

接线：
n2.out → n3.assertion
n5.out → n6.t1
n4.out → n3.atom1
n6.out → n3.formula1
n5.out → n8.t1
n5.out → n9.t1
n9.out → n10.a
n6.out → n10.b
n8.out → n11.a
n10.out → n11.b
n7.out → n3.atom2
n11.out → n3.formula2
n2.out → n17.assertion
n4.out → n17.atom1
n8.out → n17.formula1
n7.out → n17.atom2
n10.out → n17.formula2
n2.out → n22.assertion
n4.out → n22.atom1
n9.out → n22.formula1
n7.out → n22.atom2
n6.out → n22.formula2
n23.out → n24.assertion
n10.out → n25.a
n9.out → n26.a
n6.out → n27.a
n26.out → n28.a
n27.out → n28.b
n25.out → n29.a
n28.out → n29.b
n4.out → n24.atom1
n29.out → n24.formula1
n8.out → n30.a
n7.out → n24.atom2
n30.out → n24.formula2
n22.out → n21.a
n24.out → n21.b
n31.out → n32.assertion
n4.out → n32.atom1
n30.out → n32.formula1
n7.out → n32.atom2
n25.out → n32.formula2
n33.out → n32.atom3
n28.out → n32.formula3
n21.out → n20.a
n32.out → n20.b
n23.out → n34.assertion
n30.out → n35.a
n25.out → n35.b
n30.out → n36.a
n28.out → n36.b
n35.out → n37.a
n36.out → n37.b
n4.out → n34.atom1
n37.out → n34.formula1
n11.out → n38.a
n7.out → n34.atom2
n38.out → n34.formula2
n20.out → n19.a
n34.out → n19.b
n31.out → n39.assertion
n4.out → n39.atom1
n38.out → n39.formula1
n7.out → n39.atom2
n35.out → n39.formula2
n33.out → n39.atom3
n36.out → n39.formula3
n19.out → n18.a
n39.out → n18.b
n17.out → n16.a
n18.out → n16.b
n23.out → n40.assertion
n38.out → n41.a
n36.out → n41.b
n4.out → n40.atom1
n41.out → n40.formula1
n7.out → n40.atom2
n27.out → n40.formula2
n16.out → n15.a
n40.out → n15.b
n31.out → n42.assertion
n4.out → n42.atom1
n27.out → n42.formula1
n7.out → n42.atom2
n38.out → n42.formula2
n33.out → n42.atom3
n36.out → n42.formula3
n15.out → n14.a
n42.out → n14.b
n23.out → n43.assertion
n27.out → n44.a
n38.out → n44.b
n27.out → n45.a
n36.out → n45.b
n44.out → n46.a
n45.out → n46.b
n4.out → n43.atom1
n46.out → n43.formula1
n6.out → n47.a
n11.out → n47.b
n47.out → n48.a
n7.out → n43.atom2
n48.out → n43.formula2
n14.out → n13.a
n43.out → n13.b
n31.out → n49.assertion
n4.out → n49.atom1
n48.out → n49.formula1
n7.out → n49.atom2
n44.out → n49.formula2
n33.out → n49.atom3
n45.out → n49.formula3
n13.out → n12.a
n49.out → n12.b
n3.out → n1.a
n12.out → n1.b
n1.out → n50.proof
```

</details>

### Ⅱ-34 · 全称堆叠

- 目标：`⊢ ( P → ∀ x ∀ y P )`
- 提示：P→∀x ∀y P
- 参考解：56 个模块 / 74 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n57  [target]
n1  mp
n2  shift(v=x)
n3  atom P
n4  mp
n5  mp
n6  mp
n7  gen(v=x)
n8  mp
n9  shift(v=y)
n10  mp
n11  mp
n12  mp
n13  gen(v=y)
n14  mp
n15  axiom A1
n16  subst(groups=0)
n17  atom Q
n18  mp
n19  axiom A1
n20  subst(groups=0)
n21  atom Q
n22  imp
n23  axiom A2
n24  subst(groups=1)
n25  atom Q
n26  atom R
n27  定理 *11
n28  subst(groups=0)
n29  atom Q
n30  subst(groups=0)
n31  term x
n32  term y
n33  axiom A1
n34  subst(groups=1)
n35  atom P
n36  all(v=y)
n37  imp
n38  atom Q
n39  axiom A2
n40  subst(groups=1)
n41  atom Q
n42  atom R
n43  定理 *11
n44  subst(groups=0)
n45  atom Q
n46  axiom A1
n47  subst(groups=1)
n48  atom P
n49  all(v=x)
n50  all(v=x)
n51  imp
n52  atom Q
n53  axiom A2
n54  subst(groups=1)
n55  atom Q
n56  atom R

接线：
n3.out → n2.formula
n2.out → n1.a
n3.out → n9.formula
n9.out → n8.a
n15.out → n16.assertion
n17.out → n16.atom1
n3.out → n16.formula1
n16.out → n14.a
n19.out → n20.assertion
n21.out → n20.atom1
n3.out → n22.a
n3.out → n22.b
n22.out → n20.formula1
n20.out → n18.a
n23.out → n24.assertion
n25.out → n24.atom1
n22.out → n24.formula1
n26.out → n24.atom2
n3.out → n24.formula2
n24.out → n18.b
n18.out → n14.b
n14.out → n13.assertion
n13.out → n12.a
n27.out → n28.assertion
n29.out → n28.atom1
n3.out → n28.formula1
n28.out → n30.assertion
n31.out → n30.vleft
n32.out → n30.vright
n30.out → n12.b
n12.out → n11.a
n33.out → n34.assertion
n35.out → n34.atom1
n3.out → n36.a
n36.out → n37.a
n36.out → n37.b
n37.out → n34.formula1
n38.out → n34.atom2
n3.out → n34.formula2
n34.out → n11.b
n11.out → n10.a
n39.out → n40.assertion
n41.out → n40.atom1
n36.out → n40.formula1
n42.out → n40.atom2
n36.out → n40.formula2
n40.out → n10.b
n10.out → n8.b
n8.out → n7.assertion
n7.out → n6.a
n43.out → n44.assertion
n45.out → n44.atom1
n36.out → n44.formula1
n44.out → n6.b
n6.out → n5.a
n46.out → n47.assertion
n48.out → n47.atom1
n3.out → n49.a
n36.out → n50.a
n49.out → n51.a
n50.out → n51.b
n51.out → n47.formula1
n52.out → n47.atom2
n3.out → n47.formula2
n47.out → n5.b
n5.out → n4.a
n53.out → n54.assertion
n55.out → n54.atom1
n49.out → n54.formula1
n56.out → n54.atom2
n50.out → n54.formula2
n54.out → n4.b
n4.out → n1.b
n1.out → n57.proof
```

</details>

## Ⅲ 章

### Ⅲ-i · 等词自反

- 目标：`⊢ y = y`
- 提示：接一块 =I。
- 参考解：1 个模块 / 1 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n2  [target]
n1  eq-refl(t=y)

接线：
n1.out → n2.proof
```

</details>

### Ⅲ-ii · 等词替换

- 目标：`⊢ ( y = x → ( F ( y ) → F ( x ) ) )`
- 提示：接一块 =L：把 F(y) 里的 y 换成 x。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n6  [target]
n1  leibniz(mode=replace, v=z)
n2  term y
n3  term x
n4  term y
n5  pred F

接线：
n2.out → n1.x
n3.out → n1.y
n4.out → n5.t1
n5.out → n1.formula
n1.out → n6.proof
```

</details>

### Ⅲ-iii · 等词替换（抽象）

- 目标：`⊢ ( y = x → ( G ( y ) → G ( x ) ) )`
- 提示：=L 的抽象模式。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n6  [target]
n1  leibniz(mode=abstract, v=z)
n2  term y
n3  term x
n4  term z
n5  pred G

接线：
n2.out → n1.x
n3.out → n1.y
n4.out → n5.t1
n5.out → n1.formula
n1.out → n6.proof
```

</details>

### Ⅲ-iv · 引用已证定理

- 目标：`⊢ ( ∀ x ( F ( z ) → G ( z ) ) → ( ∀ x F ( z ) → ∀ x G ( z ) ) )`
- 提示：用 theorem 引用前章关卡再代入。
- 参考解：7 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n8  [target]
n1  定理 *11
n2  subst(groups=1)
n3  atom P
n4  term z
n5  pred F
n6  atom Q
n7  pred G

接线：
n1.out → n2.assertion
n3.out → n2.atom1
n4.out → n5.t1
n5.out → n2.formula1
n6.out → n2.atom2
n4.out → n7.t1
n7.out → n2.formula2
n2.out → n8.proof
```

</details>

### Ⅲ-01 · 谓词替换

- 目标：`⊢ ( x = y → ( F ( x ) → F ( y ) ) )`
- 提示：目标是 x = y→F(x)→F(y)。从最左的构造块接起，按参考接线接到 ⊢。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n6  [target]
n1  leibniz(mode=abstract, v=z)
n2  term x
n3  term y
n4  term z
n5  pred F

接线：
n2.out → n1.x
n3.out → n1.y
n4.out → n5.t1
n5.out → n1.formula
n1.out → n6.proof
```

</details>

### Ⅲ-02 · 复合替换

- 目标：`⊢ ( x = y → ( ( F ( x ) → G ( x ) ) → ( F ( y ) → G ( y ) ) ) )`
- 提示：目标是 x = y→(F(x)→G(x))→F(y)→G(y)。从最左的构造块接起，按参考接线接到 ⊢。
- 参考解：7 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n8  [target]
n1  leibniz(mode=abstract, v=z)
n2  term x
n3  term y
n4  term z
n5  pred F
n6  pred G
n7  imp

接线：
n2.out → n1.x
n3.out → n1.y
n4.out → n5.t1
n4.out → n6.t1
n5.out → n7.a
n6.out → n7.b
n7.out → n1.formula
n1.out → n8.proof
```

</details>

### Ⅲ-03 · 否定复合替换

- 目标：`⊢ ( x = y → ( ¬ ( F ( x ) → G ( x ) ) → ¬ ( F ( y ) → G ( y ) ) ) )`
- 提示：目标是 x = y→¬(F(x)→G(x))→¬(F(y)→G(y))。从最左的构造块接起，按参考接线接到 ⊢。
- 参考解：8 个模块 / 9 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n9  [target]
n1  leibniz(mode=abstract, v=z)
n2  term x
n3  term y
n4  term z
n5  pred F
n6  pred G
n7  imp
n8  not

接线：
n2.out → n1.x
n3.out → n1.y
n4.out → n5.t1
n4.out → n6.t1
n5.out → n7.a
n6.out → n7.b
n7.out → n8.a
n8.out → n1.formula
n1.out → n9.proof
```

</details>

### Ⅲ-04 · 中间引理

- 目标：`⊢ ( ∀ z ( P → Q ) → ( P → ∀ z ( P → Q ) ) )`
- 提示：目标 ∀z (P→Q)→P→∀z (P→Q)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。
- 参考解：6 个模块 / 9 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n2  axiom A1
n3  atom P
n4  atom Q
n5  imp
n6  all(v=z)
n17  subst(groups=1)

接线：
n3.out → n5.a
n4.out → n5.b
n5.out → n6.a
n2.out → n17.assertion
n3.out → n17.atom1
n6.out → n17.formula1
n4.out → n17.atom2
n3.out → n17.formula2
n17.out → tgt.proof
```

</details>

### Ⅲ-05 · 中间引理

- 目标：`⊢ ∀ z ( x = y → ( z ∈ x → z ∈ y ) )`
- 提示：目标 ∀z (x = y→z ∈ x→z ∈ y)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。
- 参考解：6 个模块 / 7 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  term y
n7  term x
n8  term z
n19  mem
n32  gen(v=z)
n33  leibniz(mode=replace, v=z)

接线：
n8.out → n19.a
n7.out → n19.b
n7.out → n33.x
n6.out → n33.y
n19.out → n33.formula
n33.out → n32.assertion
n32.out → tgt.proof
```

</details>

### Ⅲ-06 · 中间引理

- 目标：`⊢ ( y = x → ( ( F ( y ) → G ( y ) ) → ( F ( x ) → G ( x ) ) ) )`
- 提示：目标 y = x→(F(y)→G(y))→F(x)→G(x)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。
- 参考解：6 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n8  term x
n9  term y
n14  leibniz(mode=replace, v=z)
n15  pred F
n16  pred G
n17  imp

接线：
n9.out → n14.x
n8.out → n14.y
n9.out → n15.t1
n9.out → n16.t1
n15.out → n17.a
n16.out → n17.b
n17.out → n14.formula
n14.out → tgt.proof
```

</details>

### Ⅲ-07 · 中间引理

- 目标：`⊢ ( y = x → ( ∀ z z = y → ∀ z z = x ) )`
- 提示：目标 y = x→∀z z = y→∀z z = x：把这段子证明按接线一路拆到公理，后面会把它当黑盒。
- 参考解：6 个模块 / 7 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n2  leibniz(mode=replace, v=z)
n3  term y
n4  term x
n5  term z
n6  pred =
n7  all(v=z)

接线：
n3.out → n2.x
n4.out → n2.y
n5.out → n6.t1
n3.out → n6.t2
n6.out → n7.a
n7.out → n2.formula
n2.out → tgt.proof
```

</details>

### Ⅲ-08 · 中间引理

- 目标：`⊢ ( F ( y ) → ( y = y → F ( y ) ) )`
- 提示：目标 F(y)→y = y→F(y)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。
- 参考解：7 个模块 / 9 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n9  atom P
n12  atom Q
n13  term y
n53  pred F
n85  subst(groups=1)
n86  pred =

接线：
n13.out → n53.t1
n7.out → n85.assertion
n9.out → n85.atom1
n53.out → n85.formula1
n13.out → n86.t1
n13.out → n86.t2
n12.out → n85.atom2
n86.out → n85.formula2
n85.out → tgt.proof
```

</details>

### Ⅲ-09 · 中间引理

- 目标：`⊢ ( ( P → ( ∀ z P → ∀ z Q ) ) → ( ( P → ∀ z P ) → ( P → ∀ z Q ) ) )`
- 提示：目标 (P→∀z P→∀z Q)→(P→∀z P)→P→∀z Q：把这段子证明按接线一路拆到公理，后面会把它当黑盒。
- 参考解：7 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n3  atom P
n4  atom Q
n10  all(v=z)
n12  axiom A2
n13  atom R
n25  all(v=z)
n46  subst(groups=1)

接线：
n3.out → n10.a
n4.out → n25.a
n12.out → n46.assertion
n4.out → n46.atom1
n10.out → n46.formula1
n13.out → n46.atom2
n25.out → n46.formula2
n46.out → tgt.proof
```

</details>

### Ⅲ-10 · 中间引理

- 目标：`⊢ ( ∀ z ( z ∈ y → z ∈ x ) → ( z ∈ y → z ∈ x ) )`
- 提示：目标 ∀z (z ∈ y→z ∈ x)→z ∈ y→z ∈ x：把这段子证明按接线一路拆到公理，后面会把它当黑盒。
- 参考解：7 个模块 / 9 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n8  term x
n9  term y
n12  term z
n13  mem
n14  mem
n17  imp
n32  all-inst(v=z)

接线：
n12.out → n13.a
n8.out → n13.b
n12.out → n14.a
n9.out → n14.b
n14.out → n17.a
n13.out → n17.b
n17.out → n32.formula
n12.out → n32.term
n32.out → tgt.proof
```

</details>

### Ⅲ-11 · 自反（x）

- 目标：`⊢ x = x`
- 提示：x = x
- 参考解：1 个模块 / 1 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n2  [target]
n1  eq-refl(t=x)

接线：
n1.out → n2.proof
```

</details>

### Ⅲ-12 · 全称自反

- 目标：`⊢ ∀ x x = x`
- 提示：∀x x = x
- 参考解：2 个模块 / 2 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n3  [target]
n1  gen(v=x)
n2  定理 *11

接线：
n2.out → n1.assertion
n1.out → n3.proof
```

</details>

### Ⅲ-13 · 不含 x 的公式

- 目标：`⊢ ( x = y → ( ∀ z z = z → ∀ z z = z ) )`
- 提示：x = y→∀z z = z→∀z z = z
- 参考解：14 个模块 / 18 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n15  [target]
n1  mp
n2  定理 *01
n3  subst(groups=0)
n4  atom P
n5  term z
n6  pred =
n7  all(v=z)
n8  axiom A1
n9  subst(groups=1)
n10  imp
n11  atom Q
n12  term x
n13  term y
n14  pred =

接线：
n2.out → n3.assertion
n5.out → n6.t1
n5.out → n6.t2
n6.out → n7.a
n4.out → n3.atom1
n7.out → n3.formula1
n8.out → n9.assertion
n7.out → n10.a
n7.out → n10.b
n4.out → n9.atom1
n10.out → n9.formula1
n12.out → n14.t1
n13.out → n14.t2
n11.out → n9.atom2
n14.out → n9.formula2
n3.out → n1.a
n9.out → n1.b
n1.out → n15.proof
```

</details>

### Ⅲ-14 · 全称辖域（定理）

- 目标：`⊢ ( ∀ z ( P → Q ) → ( P → ∀ z Q ) )`
- 提示：∀z (P→Q)→P→∀z Q
- 参考解：52 个模块 / 141 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n53  [target]
n1  mp
n2  axiom A1
n3  atom P
n4  atom Q
n5  imp
n6  all(v=z)
n7  mp
n8  shift(v=z)
n9  subst(groups=1)
n10  all(v=z)
n11  imp
n12  axiom A2
n13  atom R
n14  mp
n15  mp
n16  mp
n17  subst(groups=1)
n18  imp
n19  mp
n20  mp
n21  mp
n22  mp
n23  axiom A5(v=z)
n24  subst(groups=1)
n25  all(v=z)
n26  imp
n27  imp
n28  mp
n29  mp
n30  subst(groups=1)
n31  subst(groups=1)
n32  imp
n33  imp
n34  subst(groups=2)
n35  mp
n36  mp
n37  subst(groups=1)
n38  subst(groups=1)
n39  imp
n40  imp
n41  imp
n42  subst(groups=2)
n43  subst(groups=2)
n44  mp
n45  mp
n46  subst(groups=1)
n47  subst(groups=1)
n48  imp
n49  imp
n50  imp
n51  subst(groups=2)
n52  subst(groups=2)

接线：
n3.out → n5.a
n4.out → n5.b
n5.out → n6.a
n3.out → n8.formula
n2.out → n9.assertion
n3.out → n10.a
n3.out → n11.a
n10.out → n11.b
n3.out → n9.atom1
n11.out → n9.formula1
n4.out → n9.atom2
n6.out → n9.formula2
n8.out → n7.a
n9.out → n7.b
n2.out → n17.assertion
n3.out → n17.atom1
n6.out → n17.formula1
n4.out → n17.atom2
n3.out → n17.formula2
n3.out → n18.a
n6.out → n18.b
n2.out → n24.assertion
n4.out → n25.a
n10.out → n26.a
n25.out → n26.b
n6.out → n27.a
n26.out → n27.b
n3.out → n24.atom1
n27.out → n24.formula1
n4.out → n24.atom2
n6.out → n24.formula2
n23.out → n22.a
n24.out → n22.b
n2.out → n30.assertion
n3.out → n30.atom1
n27.out → n30.formula1
n4.out → n30.atom2
n3.out → n30.formula2
n2.out → n31.assertion
n3.out → n32.a
n27.out → n32.b
n27.out → n33.a
n32.out → n33.b
n3.out → n31.atom1
n33.out → n31.formula1
n4.out → n31.atom2
n6.out → n31.formula2
n30.out → n29.a
n31.out → n29.b
n12.out → n34.assertion
n3.out → n34.atom1
n6.out → n34.formula1
n4.out → n34.atom2
n27.out → n34.formula2
n13.out → n34.atom3
n32.out → n34.formula3
n29.out → n28.a
n34.out → n28.b
n22.out → n21.a
n28.out → n21.b
n12.out → n37.assertion
n4.out → n37.atom1
n6.out → n37.formula1
n13.out → n37.atom2
n26.out → n37.formula2
n2.out → n38.assertion
n3.out → n39.a
n26.out → n39.b
n18.out → n40.a
n39.out → n40.b
n32.out → n41.a
n40.out → n41.b
n3.out → n38.atom1
n41.out → n38.formula1
n4.out → n38.atom2
n6.out → n38.formula2
n37.out → n36.a
n38.out → n36.b
n12.out → n42.assertion
n3.out → n42.atom1
n6.out → n42.formula1
n4.out → n42.atom2
n32.out → n42.formula2
n13.out → n42.atom3
n40.out → n42.formula3
n36.out → n35.a
n42.out → n35.b
n21.out → n20.a
n35.out → n20.b
n12.out → n43.assertion
n3.out → n43.atom1
n6.out → n43.formula1
n4.out → n43.atom2
n18.out → n43.formula2
n13.out → n43.atom3
n39.out → n43.formula3
n20.out → n19.a
n43.out → n19.b
n17.out → n16.a
n19.out → n16.b
n12.out → n46.assertion
n4.out → n46.atom1
n10.out → n46.formula1
n13.out → n46.atom2
n25.out → n46.formula2
n2.out → n47.assertion
n3.out → n48.a
n25.out → n48.b
n11.out → n49.a
n48.out → n49.b
n39.out → n50.a
n49.out → n50.b
n3.out → n47.atom1
n50.out → n47.formula1
n4.out → n47.atom2
n6.out → n47.formula2
n46.out → n45.a
n47.out → n45.b
n12.out → n51.assertion
n3.out → n51.atom1
n6.out → n51.formula1
n4.out → n51.atom2
n39.out → n51.formula2
n13.out → n51.atom3
n49.out → n51.formula3
n45.out → n44.a
n51.out → n44.b
n16.out → n15.a
n44.out → n15.b
n12.out → n52.assertion
n3.out → n52.atom1
n6.out → n52.formula1
n4.out → n52.atom2
n11.out → n52.formula2
n13.out → n52.atom3
n48.out → n52.formula3
n15.out → n14.a
n52.out → n14.b
n7.out → n1.a
n14.out → n1.b
n1.out → n53.proof
```

</details>

### Ⅲ-15 · 全称等词替换

- 目标：`⊢ ( x = y → ( ∀ z z = x → ∀ z z = y ) )`
- 提示：x = y→∀z z = x→∀z z = y
- 参考解：69 个模块 / 188 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n70  [target]
n1  mp
n2  mp
n3  gen(v=z)
n4  mp
n5  atom P
n6  term z
n7  term x
n8  pred =
n9  all(v=z)
n10  axiom A1
n11  atom Q
n12  term y
n13  pred =
n14  mp
n15  all-inst(v=z)
n16  subst(groups=1)
n17  imp
n18  axiom A2
n19  atom R
n20  mp
n21  mp
n22  mp
n23  subst(groups=1)
n24  imp
n25  mp
n26  mp
n27  mp
n28  mp
n29  leibniz(mode=replace, v=z)
n30  subst(groups=1)
n31  pred =
n32  imp
n33  imp
n34  mp
n35  mp
n36  subst(groups=1)
n37  subst(groups=1)
n38  imp
n39  imp
n40  subst(groups=2)
n41  mp
n42  mp
n43  subst(groups=2)
n44  subst(groups=1)
n45  imp
n46  imp
n47  imp
n48  subst(groups=2)
n49  subst(groups=2)
n50  mp
n51  mp
n52  subst(groups=2)
n53  subst(groups=1)
n54  imp
n55  imp
n56  imp
n57  subst(groups=2)
n58  subst(groups=2)
n59  定理 *14
n60  subst(groups=1)
n61  mp
n62  mp
n63  subst(groups=1)
n64  subst(groups=1)
n65  all(v=z)
n66  all(v=z)
n67  imp
n68  imp
n69  subst(groups=2)

接线：
n6.out → n8.t1
n7.out → n8.t2
n8.out → n9.a
n7.out → n13.t1
n12.out → n13.t2
n8.out → n15.formula
n6.out → n15.term
n10.out → n16.assertion
n9.out → n17.a
n8.out → n17.b
n5.out → n16.atom1
n17.out → n16.formula1
n11.out → n16.atom2
n13.out → n16.formula2
n15.out → n14.a
n16.out → n14.b
n10.out → n23.assertion
n5.out → n23.atom1
n13.out → n23.formula1
n11.out → n23.atom2
n9.out → n23.formula2
n9.out → n24.a
n13.out → n24.b
n7.out → n29.x
n12.out → n29.y
n8.out → n29.formula
n10.out → n30.assertion
n6.out → n31.t1
n12.out → n31.t2
n8.out → n32.a
n31.out → n32.b
n13.out → n33.a
n32.out → n33.b
n5.out → n30.atom1
n33.out → n30.formula1
n11.out → n30.atom2
n13.out → n30.formula2
n29.out → n28.a
n30.out → n28.b
n10.out → n36.assertion
n5.out → n36.atom1
n33.out → n36.formula1
n11.out → n36.atom2
n9.out → n36.formula2
n10.out → n37.assertion
n9.out → n38.a
n33.out → n38.b
n33.out → n39.a
n38.out → n39.b
n5.out → n37.atom1
n39.out → n37.formula1
n11.out → n37.atom2
n13.out → n37.formula2
n36.out → n35.a
n37.out → n35.b
n18.out → n40.assertion
n5.out → n40.atom1
n13.out → n40.formula1
n11.out → n40.atom2
n33.out → n40.formula2
n19.out → n40.atom3
n38.out → n40.formula3
n35.out → n34.a
n40.out → n34.b
n28.out → n27.a
n34.out → n27.b
n18.out → n43.assertion
n5.out → n43.atom1
n9.out → n43.formula1
n11.out → n43.atom2
n13.out → n43.formula2
n19.out → n43.atom3
n32.out → n43.formula3
n10.out → n44.assertion
n9.out → n45.a
n32.out → n45.b
n24.out → n46.a
n45.out → n46.b
n38.out → n47.a
n46.out → n47.b
n5.out → n44.atom1
n47.out → n44.formula1
n11.out → n44.atom2
n13.out → n44.formula2
n43.out → n42.a
n44.out → n42.b
n18.out → n48.assertion
n5.out → n48.atom1
n13.out → n48.formula1
n11.out → n48.atom2
n38.out → n48.formula2
n19.out → n48.atom3
n46.out → n48.formula3
n42.out → n41.a
n48.out → n41.b
n27.out → n26.a
n41.out → n26.b
n18.out → n49.assertion
n5.out → n49.atom1
n13.out → n49.formula1
n11.out → n49.atom2
n24.out → n49.formula2
n19.out → n49.atom3
n45.out → n49.formula3
n26.out → n25.a
n49.out → n25.b
n23.out → n22.a
n25.out → n22.b
n18.out → n52.assertion
n5.out → n52.atom1
n9.out → n52.formula1
n11.out → n52.atom2
n8.out → n52.formula2
n19.out → n52.atom3
n31.out → n52.formula3
n10.out → n53.assertion
n9.out → n54.a
n31.out → n54.b
n17.out → n55.a
n54.out → n55.b
n45.out → n56.a
n55.out → n56.b
n5.out → n53.atom1
n56.out → n53.formula1
n11.out → n53.atom2
n13.out → n53.formula2
n52.out → n51.a
n53.out → n51.b
n18.out → n57.assertion
n5.out → n57.atom1
n13.out → n57.formula1
n11.out → n57.atom2
n45.out → n57.formula2
n19.out → n57.atom3
n55.out → n57.formula3
n51.out → n50.a
n57.out → n50.b
n22.out → n21.a
n50.out → n21.b
n18.out → n58.assertion
n5.out → n58.atom1
n13.out → n58.formula1
n11.out → n58.atom2
n17.out → n58.formula2
n19.out → n58.atom3
n54.out → n58.formula3
n21.out → n20.a
n58.out → n20.b
n14.out → n4.a
n20.out → n4.b
n4.out → n3.assertion
n59.out → n60.assertion
n5.out → n60.atom1
n13.out → n60.formula1
n11.out → n60.atom2
n54.out → n60.formula2
n3.out → n2.a
n60.out → n2.b
n59.out → n63.assertion
n5.out → n63.atom1
n9.out → n63.formula1
n11.out → n63.atom2
n31.out → n63.formula2
n10.out → n64.assertion
n54.out → n65.a
n31.out → n66.a
n9.out → n67.a
n66.out → n67.b
n65.out → n68.a
n67.out → n68.b
n5.out → n64.atom1
n68.out → n64.formula1
n11.out → n64.atom2
n13.out → n64.formula2
n63.out → n62.a
n64.out → n62.b
n18.out → n69.assertion
n5.out → n69.atom1
n13.out → n69.formula1
n11.out → n69.atom2
n65.out → n69.formula2
n19.out → n69.atom3
n67.out → n69.formula3
n62.out → n61.a
n69.out → n61.b
n2.out → n1.a
n61.out → n1.b
n1.out → n70.proof
```

</details>

### Ⅲ-16 · 嵌套全称替换

- 目标：`⊢ ( x = y → ( ∀ z x = z → ∀ z y = z ) )`
- 提示：x = y→∀z x = z→∀z y = z
- 参考解：69 个模块 / 188 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n70  [target]
n1  mp
n2  mp
n3  gen(v=z)
n4  mp
n5  atom P
n6  term x
n7  term z
n8  pred =
n9  all(v=z)
n10  axiom A1
n11  atom Q
n12  term y
n13  pred =
n14  mp
n15  all-inst(v=z)
n16  subst(groups=1)
n17  imp
n18  axiom A2
n19  atom R
n20  mp
n21  mp
n22  mp
n23  subst(groups=1)
n24  imp
n25  mp
n26  mp
n27  mp
n28  mp
n29  leibniz(mode=replace, v=z)
n30  subst(groups=1)
n31  pred =
n32  imp
n33  imp
n34  mp
n35  mp
n36  subst(groups=1)
n37  subst(groups=1)
n38  imp
n39  imp
n40  subst(groups=2)
n41  mp
n42  mp
n43  subst(groups=2)
n44  subst(groups=1)
n45  imp
n46  imp
n47  imp
n48  subst(groups=2)
n49  subst(groups=2)
n50  mp
n51  mp
n52  subst(groups=2)
n53  subst(groups=1)
n54  imp
n55  imp
n56  imp
n57  subst(groups=2)
n58  subst(groups=2)
n59  定理 *14
n60  subst(groups=1)
n61  mp
n62  mp
n63  subst(groups=1)
n64  subst(groups=1)
n65  all(v=z)
n66  all(v=z)
n67  imp
n68  imp
n69  subst(groups=2)

接线：
n6.out → n8.t1
n7.out → n8.t2
n8.out → n9.a
n6.out → n13.t1
n12.out → n13.t2
n8.out → n15.formula
n7.out → n15.term
n10.out → n16.assertion
n9.out → n17.a
n8.out → n17.b
n5.out → n16.atom1
n17.out → n16.formula1
n11.out → n16.atom2
n13.out → n16.formula2
n15.out → n14.a
n16.out → n14.b
n10.out → n23.assertion
n5.out → n23.atom1
n13.out → n23.formula1
n11.out → n23.atom2
n9.out → n23.formula2
n9.out → n24.a
n13.out → n24.b
n6.out → n29.x
n12.out → n29.y
n8.out → n29.formula
n10.out → n30.assertion
n12.out → n31.t1
n7.out → n31.t2
n8.out → n32.a
n31.out → n32.b
n13.out → n33.a
n32.out → n33.b
n5.out → n30.atom1
n33.out → n30.formula1
n11.out → n30.atom2
n13.out → n30.formula2
n29.out → n28.a
n30.out → n28.b
n10.out → n36.assertion
n5.out → n36.atom1
n33.out → n36.formula1
n11.out → n36.atom2
n9.out → n36.formula2
n10.out → n37.assertion
n9.out → n38.a
n33.out → n38.b
n33.out → n39.a
n38.out → n39.b
n5.out → n37.atom1
n39.out → n37.formula1
n11.out → n37.atom2
n13.out → n37.formula2
n36.out → n35.a
n37.out → n35.b
n18.out → n40.assertion
n5.out → n40.atom1
n13.out → n40.formula1
n11.out → n40.atom2
n33.out → n40.formula2
n19.out → n40.atom3
n38.out → n40.formula3
n35.out → n34.a
n40.out → n34.b
n28.out → n27.a
n34.out → n27.b
n18.out → n43.assertion
n5.out → n43.atom1
n9.out → n43.formula1
n11.out → n43.atom2
n13.out → n43.formula2
n19.out → n43.atom3
n32.out → n43.formula3
n10.out → n44.assertion
n9.out → n45.a
n32.out → n45.b
n24.out → n46.a
n45.out → n46.b
n38.out → n47.a
n46.out → n47.b
n5.out → n44.atom1
n47.out → n44.formula1
n11.out → n44.atom2
n13.out → n44.formula2
n43.out → n42.a
n44.out → n42.b
n18.out → n48.assertion
n5.out → n48.atom1
n13.out → n48.formula1
n11.out → n48.atom2
n38.out → n48.formula2
n19.out → n48.atom3
n46.out → n48.formula3
n42.out → n41.a
n48.out → n41.b
n27.out → n26.a
n41.out → n26.b
n18.out → n49.assertion
n5.out → n49.atom1
n13.out → n49.formula1
n11.out → n49.atom2
n24.out → n49.formula2
n19.out → n49.atom3
n45.out → n49.formula3
n26.out → n25.a
n49.out → n25.b
n23.out → n22.a
n25.out → n22.b
n18.out → n52.assertion
n5.out → n52.atom1
n9.out → n52.formula1
n11.out → n52.atom2
n8.out → n52.formula2
n19.out → n52.atom3
n31.out → n52.formula3
n10.out → n53.assertion
n9.out → n54.a
n31.out → n54.b
n17.out → n55.a
n54.out → n55.b
n45.out → n56.a
n55.out → n56.b
n5.out → n53.atom1
n56.out → n53.formula1
n11.out → n53.atom2
n13.out → n53.formula2
n52.out → n51.a
n53.out → n51.b
n18.out → n57.assertion
n5.out → n57.atom1
n13.out → n57.formula1
n11.out → n57.atom2
n45.out → n57.formula2
n19.out → n57.atom3
n55.out → n57.formula3
n51.out → n50.a
n57.out → n50.b
n22.out → n21.a
n50.out → n21.b
n18.out → n58.assertion
n5.out → n58.atom1
n13.out → n58.formula1
n11.out → n58.atom2
n17.out → n58.formula2
n19.out → n58.atom3
n54.out → n58.formula3
n21.out → n20.a
n58.out → n20.b
n14.out → n4.a
n20.out → n4.b
n4.out → n3.assertion
n59.out → n60.assertion
n5.out → n60.atom1
n13.out → n60.formula1
n11.out → n60.atom2
n54.out → n60.formula2
n3.out → n2.a
n60.out → n2.b
n59.out → n63.assertion
n5.out → n63.atom1
n9.out → n63.formula1
n11.out → n63.atom2
n31.out → n63.formula2
n10.out → n64.assertion
n54.out → n65.a
n31.out → n66.a
n9.out → n67.a
n66.out → n67.b
n65.out → n68.a
n67.out → n68.b
n5.out → n64.atom1
n68.out → n64.formula1
n11.out → n64.atom2
n13.out → n64.formula2
n63.out → n62.a
n64.out → n62.b
n18.out → n69.assertion
n5.out → n69.atom1
n13.out → n69.formula1
n11.out → n69.atom2
n65.out → n69.formula2
n19.out → n69.atom3
n67.out → n69.formula3
n62.out → n61.a
n69.out → n61.b
n2.out → n1.a
n61.out → n1.b
n1.out → n70.proof
```

</details>

### Ⅲ-17 · 条件替换

- 目标：`⊢ ( x = y → ( ( x = x → F ( x ) ) → ( y = y → F ( y ) ) ) )`
- 提示：x = y→(x = x→F(x))→y = y→F(y)
- 参考解：105 个模块 / 313 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n106  [target]
n1  mp
n2  mp
n3  mp
n4  mp
n5  mp
n6  定理 *11
n7  axiom A1
n8  subst(groups=1)
n9  atom P
n10  term x
n11  pred =
n12  atom Q
n13  term y
n14  pred =
n15  mp
n16  mp
n17  subst(groups=1)
n18  pred F
n19  imp
n20  subst(groups=1)
n21  imp
n22  imp
n23  axiom A2
n24  subst(groups=2)
n25  atom R
n26  mp
n27  mp
n28  mp
n29  定理 *01
n30  subst(groups=0)
n31  subst(groups=1)
n32  imp
n33  mp
n34  mp
n35  subst(groups=2)
n36  subst(groups=1)
n37  imp
n38  imp
n39  imp
n40  subst(groups=2)
n41  subst(groups=2)
n42  mp
n43  mp
n44  mp
n45  subst(groups=1)
n46  imp
n47  mp
n48  mp
n49  mp
n50  mp
n51  定理 *01
n52  subst(groups=1)
n53  pred F
n54  imp
n55  imp
n56  mp
n57  mp
n58  subst(groups=1)
n59  subst(groups=1)
n60  imp
n61  imp
n62  subst(groups=2)
n63  mp
n64  mp
n65  subst(groups=2)
n66  subst(groups=1)
n67  imp
n68  imp
n69  imp
n70  subst(groups=2)
n71  subst(groups=2)
n72  mp
n73  mp
n74  subst(groups=2)
n75  subst(groups=1)
n76  imp
n77  imp
n78  imp
n79  subst(groups=2)
n80  subst(groups=2)
n81  mp
n82  mp
n83  mp
n84  mp
n85  subst(groups=1)
n86  pred =
n87  subst(groups=1)
n88  imp
n89  imp
n90  mp
n91  mp
n92  subst(groups=1)
n93  subst(groups=1)
n94  imp
n95  imp
n96  subst(groups=2)
n97  mp
n98  mp
n99  subst(groups=2)
n100  subst(groups=1)
n101  imp
n102  imp
n103  imp
n104  subst(groups=2)
n105  subst(groups=2)

接线：
n7.out → n8.assertion
n10.out → n11.t1
n10.out → n11.t2
n9.out → n8.atom1
n11.out → n8.formula1
n10.out → n14.t1
n13.out → n14.t2
n12.out → n8.atom2
n14.out → n8.formula2
n6.out → n5.a
n8.out → n5.b
n7.out → n17.assertion
n9.out → n17.atom1
n11.out → n17.formula1
n10.out → n18.t1
n11.out → n19.a
n18.out → n19.b
n12.out → n17.atom2
n19.out → n17.formula2
n7.out → n20.assertion
n19.out → n21.a
n11.out → n21.b
n11.out → n22.a
n21.out → n22.b
n9.out → n20.atom1
n22.out → n20.formula1
n12.out → n20.atom2
n14.out → n20.formula2
n17.out → n16.a
n20.out → n16.b
n23.out → n24.assertion
n9.out → n24.atom1
n14.out → n24.formula1
n12.out → n24.atom2
n11.out → n24.formula2
n25.out → n24.atom3
n21.out → n24.formula3
n16.out → n15.a
n24.out → n15.b
n5.out → n4.a
n15.out → n4.b
n29.out → n30.assertion
n9.out → n30.atom1
n19.out → n30.formula1
n7.out → n31.assertion
n19.out → n32.a
n19.out → n32.b
n9.out → n31.atom1
n32.out → n31.formula1
n12.out → n31.atom2
n14.out → n31.formula2
n30.out → n28.a
n31.out → n28.b
n23.out → n35.assertion
n9.out → n35.atom1
n19.out → n35.formula1
n12.out → n35.atom2
n11.out → n35.formula2
n25.out → n35.atom3
n18.out → n35.formula3
n7.out → n36.assertion
n19.out → n37.a
n18.out → n37.b
n21.out → n38.a
n37.out → n38.b
n32.out → n39.a
n38.out → n39.b
n9.out → n36.atom1
n39.out → n36.formula1
n12.out → n36.atom2
n14.out → n36.formula2
n35.out → n34.a
n36.out → n34.b
n23.out → n40.assertion
n9.out → n40.atom1
n14.out → n40.formula1
n12.out → n40.atom2
n32.out → n40.formula2
n25.out → n40.atom3
n38.out → n40.formula3
n34.out → n33.a
n40.out → n33.b
n28.out → n27.a
n33.out → n27.b
n23.out → n41.assertion
n9.out → n41.atom1
n14.out → n41.formula1
n12.out → n41.atom2
n21.out → n41.formula2
n25.out → n41.atom3
n37.out → n41.formula3
n27.out → n26.a
n41.out → n26.b
n4.out → n3.a
n26.out → n3.b
n7.out → n45.assertion
n9.out → n45.atom1
n14.out → n45.formula1
n12.out → n45.atom2
n19.out → n45.formula2
n19.out → n46.a
n14.out → n46.b
n7.out → n52.assertion
n13.out → n53.t1
n18.out → n54.a
n53.out → n54.b
n14.out → n55.a
n54.out → n55.b
n9.out → n52.atom1
n55.out → n52.formula1
n12.out → n52.atom2
n14.out → n52.formula2
n51.out → n50.a
n52.out → n50.b
n7.out → n58.assertion
n9.out → n58.atom1
n55.out → n58.formula1
n12.out → n58.atom2
n19.out → n58.formula2
n7.out → n59.assertion
n19.out → n60.a
n55.out → n60.b
n55.out → n61.a
n60.out → n61.b
n9.out → n59.atom1
n61.out → n59.formula1
n12.out → n59.atom2
n14.out → n59.formula2
n58.out → n57.a
n59.out → n57.b
n23.out → n62.assertion
n9.out → n62.atom1
n14.out → n62.formula1
n12.out → n62.atom2
n55.out → n62.formula2
n25.out → n62.atom3
n60.out → n62.formula3
n57.out → n56.a
n62.out → n56.b
n50.out → n49.a
n56.out → n49.b
n23.out → n65.assertion
n9.out → n65.atom1
n19.out → n65.formula1
n12.out → n65.atom2
n14.out → n65.formula2
n25.out → n65.atom3
n54.out → n65.formula3
n7.out → n66.assertion
n19.out → n67.a
n54.out → n67.b
n46.out → n68.a
n67.out → n68.b
n60.out → n69.a
n68.out → n69.b
n9.out → n66.atom1
n69.out → n66.formula1
n12.out → n66.atom2
n14.out → n66.formula2
n65.out → n64.a
n66.out → n64.b
n23.out → n70.assertion
n9.out → n70.atom1
n14.out → n70.formula1
n12.out → n70.atom2
n60.out → n70.formula2
n25.out → n70.atom3
n68.out → n70.formula3
n64.out → n63.a
n70.out → n63.b
n49.out → n48.a
n63.out → n48.b
n23.out → n71.assertion
n9.out → n71.atom1
n14.out → n71.formula1
n12.out → n71.atom2
n46.out → n71.formula2
n25.out → n71.atom3
n67.out → n71.formula3
n48.out → n47.a
n71.out → n47.b
n45.out → n44.a
n47.out → n44.b
n23.out → n74.assertion
n9.out → n74.atom1
n19.out → n74.formula1
n12.out → n74.atom2
n18.out → n74.formula2
n25.out → n74.atom3
n53.out → n74.formula3
n7.out → n75.assertion
n19.out → n76.a
n53.out → n76.b
n37.out → n77.a
n76.out → n77.b
n67.out → n78.a
n77.out → n78.b
n9.out → n75.atom1
n78.out → n75.formula1
n12.out → n75.atom2
n14.out → n75.formula2
n74.out → n73.a
n75.out → n73.b
n23.out → n79.assertion
n9.out → n79.atom1
n14.out → n79.formula1
n12.out → n79.atom2
n67.out → n79.formula2
n25.out → n79.atom3
n77.out → n79.formula3
n73.out → n72.a
n79.out → n72.b
n44.out → n43.a
n72.out → n43.b
n23.out → n80.assertion
n9.out → n80.atom1
n14.out → n80.formula1
n12.out → n80.atom2
n37.out → n80.formula2
n25.out → n80.atom3
n76.out → n80.formula3
n43.out → n42.a
n80.out → n42.b
n3.out → n2.a
n42.out → n2.b
n7.out → n85.assertion
n9.out → n85.atom1
n53.out → n85.formula1
n13.out → n86.t1
n13.out → n86.t2
n12.out → n85.atom2
n86.out → n85.formula2
n7.out → n87.assertion
n86.out → n88.a
n53.out → n88.b
n53.out → n89.a
n88.out → n89.b
n9.out → n87.atom1
n89.out → n87.formula1
n12.out → n87.atom2
n14.out → n87.formula2
n85.out → n84.a
n87.out → n84.b
n7.out → n92.assertion
n9.out → n92.atom1
n89.out → n92.formula1
n12.out → n92.atom2
n19.out → n92.formula2
n7.out → n93.assertion
n19.out → n94.a
n89.out → n94.b
n89.out → n95.a
n94.out → n95.b
n9.out → n93.atom1
n95.out → n93.formula1
n12.out → n93.atom2
n14.out → n93.formula2
n92.out → n91.a
n93.out → n91.b
n23.out → n96.assertion
n9.out → n96.atom1
n14.out → n96.formula1
n12.out → n96.atom2
n89.out → n96.formula2
n25.out → n96.atom3
n94.out → n96.formula3
n91.out → n90.a
n96.out → n90.b
n84.out → n83.a
n90.out → n83.b
n23.out → n99.assertion
n9.out → n99.atom1
n19.out → n99.formula1
n12.out → n99.atom2
n53.out → n99.formula2
n25.out → n99.atom3
n88.out → n99.formula3
n7.out → n100.assertion
n19.out → n101.a
n88.out → n101.b
n76.out → n102.a
n101.out → n102.b
n94.out → n103.a
n102.out → n103.b
n9.out → n100.atom1
n103.out → n100.formula1
n12.out → n100.atom2
n14.out → n100.formula2
n99.out → n98.a
n100.out → n98.b
n23.out → n104.assertion
n9.out → n104.atom1
n14.out → n104.formula1
n12.out → n104.atom2
n94.out → n104.formula2
n25.out → n104.atom3
n102.out → n104.formula3
n98.out → n97.a
n104.out → n97.b
n83.out → n82.a
n97.out → n82.b
n23.out → n105.assertion
n9.out → n105.atom1
n14.out → n105.formula1
n12.out → n105.atom2
n76.out → n105.formula2
n25.out → n105.atom3
n101.out → n105.formula3
n82.out → n81.a
n105.out → n81.b
n2.out → n1.a
n81.out → n1.b
n1.out → n106.proof
```

</details>

### Ⅲ-18 · 中间引理

- 目标：`⊢ ( ∀ z ( z ∈ x → z ∈ y ) → ( z ∈ x → z ∈ y ) )`
- 提示：( A. z ( z e. x -> z e. y ) -> ( z e. x -> z e. y ) )
- 参考解：7 个模块 / 9 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n8  term x
n9  term y
n12  term z
n13  mem
n14  mem
n15  imp
n49  all-inst(v=z)

接线：
n12.out → n13.a
n8.out → n13.b
n12.out → n14.a
n9.out → n14.b
n13.out → n15.a
n14.out → n15.b
n15.out → n49.formula
n12.out → n49.term
n49.out → tgt.proof
```

</details>

### Ⅲ-19 · 中间引理

- 目标：`⊢ ( x = x → ( x = y → x = x ) )`
- 提示：( x = x -> ( x = y -> x = x ) )
- 参考解：8 个模块 / 10 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n8  subst(groups=1)
n9  atom P
n10  term x
n11  pred =
n12  atom Q
n13  term y
n14  pred =

接线：
n7.out → n8.assertion
n10.out → n11.t1
n10.out → n11.t2
n9.out → n8.atom1
n11.out → n8.formula1
n10.out → n14.t1
n13.out → n14.t2
n12.out → n8.atom2
n14.out → n8.formula2
n8.out → tgt.proof
```

</details>

### Ⅲ-20 · 中间引理

- 目标：`⊢ ( x = x → ( ( x = x → F ( x ) ) → x = x ) )`
- 提示：( x = x -> ( ( x = x -> F ( x ) ) -> x = x ) )
- 参考解：8 个模块 / 11 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n9  atom P
n10  term x
n11  pred =
n12  atom Q
n17  subst(groups=1)
n18  pred F
n19  imp

接线：
n10.out → n11.t1
n10.out → n11.t2
n7.out → n17.assertion
n9.out → n17.atom1
n11.out → n17.formula1
n10.out → n18.t1
n11.out → n19.a
n18.out → n19.b
n12.out → n17.atom2
n19.out → n17.formula2
n17.out → tgt.proof
```

</details>

### Ⅲ-21 · 中间引理

- 目标：`⊢ ( ( P → ∀ z P ) → ( ∀ z ( P → Q ) → ( P → ∀ z P ) ) )`
- 提示：( ( P -> A. z P ) -> ( A. z ( P -> Q ) -> ( P -> A. z P ) ) )
- 参考解：8 个模块 / 12 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n2  axiom A1
n3  atom P
n4  atom Q
n5  imp
n6  all(v=z)
n9  subst(groups=1)
n10  all(v=z)
n11  imp

接线：
n3.out → n5.a
n4.out → n5.b
n5.out → n6.a
n2.out → n9.assertion
n3.out → n10.a
n3.out → n11.a
n10.out → n11.b
n3.out → n9.atom1
n11.out → n9.formula1
n4.out → n9.atom2
n6.out → n9.formula2
n9.out → tgt.proof
```

</details>

### Ⅲ-22 · 中间引理

- 目标：`⊢ ( ( F ( y ) → F ( y ) ) → ( x = y → ( F ( y ) → F ( y ) ) ) )`
- 提示：( ( F ( y ) -> F ( y ) ) -> ( x = y -> ( F ( y ) -> F ( y ) ) ) )
- 参考解：9 个模块 / 11 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n4  atom P
n5  term x
n8  atom Q
n9  term y
n10  pred =
n12  pred F
n13  imp
n15  axiom A1
n21  subst(groups=1)

接线：
n5.out → n10.t1
n9.out → n10.t2
n9.out → n12.t1
n12.out → n13.a
n12.out → n13.b
n15.out → n21.assertion
n4.out → n21.atom1
n13.out → n21.formula1
n8.out → n21.atom2
n10.out → n21.formula2
n21.out → tgt.proof
```

</details>

### Ⅲ-23 · 中间引理

- 目标：`⊢ ( ( x = y → y = x ) → ( x = y → ( x = y → y = x ) ) )`
- 提示：( ( x = y -> y = x ) -> ( x = y -> ( x = y -> y = x ) ) )
- 参考解：9 个模块 / 12 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  atom P
n8  term x
n9  term y
n10  pred =
n18  axiom A1
n20  pred =
n26  atom Q
n31  subst(groups=1)
n32  imp

接线：
n8.out → n10.t1
n9.out → n10.t2
n9.out → n20.t1
n8.out → n20.t2
n18.out → n31.assertion
n10.out → n32.a
n20.out → n32.b
n7.out → n31.atom1
n32.out → n31.formula1
n26.out → n31.atom2
n10.out → n31.formula2
n31.out → tgt.proof
```

</details>

### Ⅲ-24 · 中间引理

- 目标：`⊢ ( x = y → ( ( x = x → F ( x ) ) → x = y ) )`
- 提示：( x = y -> ( ( x = x -> F ( x ) ) -> x = y ) )
- 参考解：10 个模块 / 13 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n9  atom P
n10  term x
n11  pred =
n12  atom Q
n13  term y
n14  pred =
n18  pred F
n19  imp
n45  subst(groups=1)

接线：
n10.out → n11.t1
n10.out → n11.t2
n10.out → n14.t1
n13.out → n14.t2
n10.out → n18.t1
n11.out → n19.a
n18.out → n19.b
n7.out → n45.assertion
n9.out → n45.atom1
n14.out → n45.formula1
n12.out → n45.atom2
n19.out → n45.formula2
n45.out → tgt.proof
```

</details>

### Ⅲ-25 · 中间引理

- 目标：`⊢ ( ∀ z ( P → Q ) → ( P → ∀ z P ) )`
- 提示：( A. z ( P -> Q ) -> ( P -> A. z P ) )
- 参考解：10 个模块 / 15 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n2  axiom A1
n3  atom P
n4  atom Q
n5  imp
n6  all(v=z)
n7  mp
n8  shift(v=z)
n9  subst(groups=1)
n10  all(v=z)
n11  imp

接线：
n3.out → n5.a
n4.out → n5.b
n5.out → n6.a
n3.out → n8.formula
n2.out → n9.assertion
n3.out → n10.a
n3.out → n11.a
n10.out → n11.b
n3.out → n9.atom1
n11.out → n9.formula1
n4.out → n9.atom2
n6.out → n9.formula2
n8.out → n7.a
n9.out → n7.b
n7.out → tgt.proof
```

</details>

### Ⅲ-26 · 中间引理

- 目标：`⊢ ( x = y → ( ∀ z z = x → x = y ) )`
- 提示：( x = y -> ( A. z z = x -> x = y ) )
- 参考解：10 个模块 / 11 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  atom P
n6  term z
n7  term x
n8  pred =
n9  all(v=z)
n10  axiom A1
n11  atom Q
n12  term y
n13  pred =
n23  subst(groups=1)

接线：
n6.out → n8.t1
n7.out → n8.t2
n8.out → n9.a
n7.out → n13.t1
n12.out → n13.t2
n10.out → n23.assertion
n5.out → n23.atom1
n13.out → n23.formula1
n11.out → n23.atom2
n9.out → n23.formula2
n23.out → tgt.proof
```

</details>

### Ⅲ-27 · 中间引理

- 目标：`⊢ ( x = y → ( ∀ z x = z → x = y ) )`
- 提示：( x = y -> ( A. z x = z -> x = y ) )
- 参考解：10 个模块 / 11 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  atom P
n6  term x
n7  term z
n8  pred =
n9  all(v=z)
n10  axiom A1
n11  atom Q
n12  term y
n13  pred =
n23  subst(groups=1)

接线：
n6.out → n8.t1
n7.out → n8.t2
n8.out → n9.a
n6.out → n13.t1
n12.out → n13.t2
n10.out → n23.assertion
n5.out → n23.atom1
n13.out → n23.formula1
n11.out → n23.atom2
n9.out → n23.formula2
n23.out → tgt.proof
```

</details>

### Ⅲ-28 · 中间引理

- 目标：`⊢ ( ( ∀ z z = z → ∀ z z = z ) → ( x = y → ( ∀ z z = z → ∀ z z = z ) ) )`
- 提示：( ( A. z z = z -> A. z z = z ) -> ( x = y -> ( A. z z = z -> A. z z = z ) ) )
- 参考解：11 个模块 / 13 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n4  atom P
n5  term z
n6  pred =
n7  all(v=z)
n8  axiom A1
n9  subst(groups=1)
n10  imp
n11  atom Q
n12  term x
n13  term y
n14  pred =

接线：
n5.out → n6.t1
n5.out → n6.t2
n6.out → n7.a
n8.out → n9.assertion
n7.out → n10.a
n7.out → n10.b
n4.out → n9.atom1
n10.out → n9.formula1
n12.out → n14.t1
n13.out → n14.t2
n11.out → n9.atom2
n14.out → n9.formula2
n9.out → tgt.proof
```

</details>

### Ⅲ-29 · 中间引理

- 目标：`⊢ ( ( ∀ z z = x → z = x ) → ( x = y → ( ∀ z z = x → z = x ) ) )`
- 提示：( ( A. z z = x -> z = x ) -> ( x = y -> ( A. z z = x -> z = x ) ) )
- 参考解：11 个模块 / 13 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  atom P
n6  term z
n7  term x
n8  pred =
n9  all(v=z)
n10  axiom A1
n11  atom Q
n12  term y
n13  pred =
n16  subst(groups=1)
n17  imp

接线：
n6.out → n8.t1
n7.out → n8.t2
n8.out → n9.a
n7.out → n13.t1
n12.out → n13.t2
n10.out → n16.assertion
n9.out → n17.a
n8.out → n17.b
n5.out → n16.atom1
n17.out → n16.formula1
n11.out → n16.atom2
n13.out → n16.formula2
n16.out → tgt.proof
```

</details>

### Ⅲ-30 · 中间引理

- 目标：`⊢ ( ( ∀ z x = z → x = z ) → ( x = y → ( ∀ z x = z → x = z ) ) )`
- 提示：( ( A. z x = z -> x = z ) -> ( x = y -> ( A. z x = z -> x = z ) ) )
- 参考解：11 个模块 / 13 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  atom P
n6  term x
n7  term z
n8  pred =
n9  all(v=z)
n10  axiom A1
n11  atom Q
n12  term y
n13  pred =
n16  subst(groups=1)
n17  imp

接线：
n6.out → n8.t1
n7.out → n8.t2
n8.out → n9.a
n6.out → n13.t1
n12.out → n13.t2
n10.out → n16.assertion
n9.out → n17.a
n8.out → n17.b
n5.out → n16.atom1
n17.out → n16.formula1
n11.out → n16.atom2
n13.out → n16.formula2
n16.out → tgt.proof
```

</details>

### Ⅲ-31 · 中间引理

- 目标：`⊢ ( ∀ z ( P → Q ) → ( ∀ z ( P → Q ) → ( ∀ z P → ∀ z Q ) ) )`
- 提示：( A. z ( P -> Q ) -> ( A. z ( P -> Q ) -> ( A. z P -> A. z Q ) ) )
- 参考解：12 个模块 / 17 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n2  axiom A1
n3  atom P
n4  atom Q
n5  imp
n6  all(v=z)
n10  all(v=z)
n22  mp
n23  axiom A5(v=z)
n24  subst(groups=1)
n25  all(v=z)
n26  imp
n27  imp

接线：
n3.out → n5.a
n4.out → n5.b
n5.out → n6.a
n3.out → n10.a
n2.out → n24.assertion
n4.out → n25.a
n10.out → n26.a
n25.out → n26.b
n6.out → n27.a
n26.out → n27.b
n3.out → n24.atom1
n27.out → n24.formula1
n4.out → n24.atom2
n6.out → n24.formula2
n23.out → n22.a
n24.out → n22.b
n22.out → tgt.proof
```

</details>

### Ⅲ-32 · 中间引理

- 目标：`⊢ ( x = y → ( F ( y ) → ( y = y → F ( y ) ) ) )`
- 提示：( x = y -> ( F ( y ) -> ( y = y -> F ( y ) ) ) )
- 参考解：13 个模块 / 22 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  axiom A1
n9  atom P
n10  term x
n12  atom Q
n13  term y
n14  pred =
n53  pred F
n84  mp
n85  subst(groups=1)
n86  pred =
n87  subst(groups=1)
n88  imp
n89  imp

接线：
n10.out → n14.t1
n13.out → n14.t2
n13.out → n53.t1
n7.out → n85.assertion
n9.out → n85.atom1
n53.out → n85.formula1
n13.out → n86.t1
n13.out → n86.t2
n12.out → n85.atom2
n86.out → n85.formula2
n7.out → n87.assertion
n86.out → n88.a
n53.out → n88.b
n53.out → n89.a
n88.out → n89.b
n9.out → n87.atom1
n89.out → n87.formula1
n12.out → n87.atom2
n14.out → n87.formula2
n85.out → n84.a
n87.out → n84.b
n84.out → tgt.proof
```

</details>

### Ⅲ-33 · 中间引理

- 目标：`⊢ ( x = y → ( ∀ z z = x → z = x ) )`
- 提示：( x = y -> ( A. z z = x -> z = x ) )
- 参考解：13 个模块 / 17 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  atom P
n6  term z
n7  term x
n8  pred =
n9  all(v=z)
n10  axiom A1
n11  atom Q
n12  term y
n13  pred =
n14  mp
n15  all-inst(v=z)
n16  subst(groups=1)
n17  imp

接线：
n6.out → n8.t1
n7.out → n8.t2
n8.out → n9.a
n7.out → n13.t1
n12.out → n13.t2
n8.out → n15.formula
n6.out → n15.term
n10.out → n16.assertion
n9.out → n17.a
n8.out → n17.b
n5.out → n16.atom1
n17.out → n16.formula1
n11.out → n16.atom2
n13.out → n16.formula2
n15.out → n14.a
n16.out → n14.b
n14.out → tgt.proof
```

</details>

### Ⅲ-34 · 中间引理

- 目标：`⊢ ( x = y → ( ∀ z x = z → x = z ) )`
- 提示：( x = y -> ( A. z x = z -> x = z ) )
- 参考解：13 个模块 / 17 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  atom P
n6  term x
n7  term z
n8  pred =
n9  all(v=z)
n10  axiom A1
n11  atom Q
n12  term y
n13  pred =
n14  mp
n15  all-inst(v=z)
n16  subst(groups=1)
n17  imp

接线：
n6.out → n8.t1
n7.out → n8.t2
n8.out → n9.a
n6.out → n13.t1
n12.out → n13.t2
n8.out → n15.formula
n7.out → n15.term
n10.out → n16.assertion
n9.out → n17.a
n8.out → n17.b
n5.out → n16.atom1
n17.out → n16.formula1
n11.out → n16.atom2
n13.out → n16.formula2
n15.out → n14.a
n16.out → n14.b
n14.out → tgt.proof
```

</details>

## Ⅳ 章

### Ⅳ-i · 外延公理

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → x = y )`
- 提示：接一块 EXT。
- 参考解：3 个模块 / 3 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n4  [target]
n1  set-ext
n2  term x
n3  term y

接线：
n2.out → n1.a
n3.out → n1.b
n1.out → n4.proof
```

</details>

### Ⅳ-ii · 配对公理

- 目标：`⊢ ∃ u ∀ z ( ( z = y ∨ z = x ) ↔ z ∈ u )`
- 提示：接一块配对公理（u=y、v=x）。
- 参考解：3 个模块 / 3 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n4  [target]
n1  set-pair
n2  term y
n3  term x

接线：
n2.out → n1.u
n3.out → n1.v
n1.out → n4.proof
```

</details>

### Ⅳ-iii · 并集公理

- 目标：`⊢ ∃ x ∀ z ( ∃ u ( z ∈ u ∧ u ∈ y ) ↔ z ∈ x )`
- 提示：接一块并集公理（a=y）。
- 参考解：2 个模块 / 2 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n3  [target]
n1  set-union
n2  term y

接线：
n2.out → n1.a
n1.out → n3.proof
```

</details>

### Ⅳ-iv · 外延公理（换序）

- 目标：`⊢ ( ∀ z ( z ∈ y ↔ z ∈ x ) → y = x )`
- 提示：EXT 换一组变量。
- 参考解：3 个模块 / 3 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n4  [target]
n1  set-ext
n2  term y
n3  term x

接线：
n2.out → n1.a
n3.out → n1.b
n1.out → n4.proof
```

</details>

### Ⅳ-01 · 外延公理（全称）

- 目标：`⊢ ∀ x ∀ y ( ∀ z ( z ∈ x ↔ z ∈ y ) → x = y )`
- 提示：目标是 ∀x ∀y (∀z (z ∈ x↔z ∈ y)→x = y)。从最左的构造块接起，按参考接线接到 ⊢。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n6  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  set-ext
n4  term x
n5  term y

接线：
n4.out → n3.a
n5.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n6.proof
```

</details>

### Ⅳ-02 · 配对公理（全称）

- 目标：`⊢ ∀ x ∀ y ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )`
- 提示：目标是 ∀x ∀y ∃u ∀z (z = x∨z = y↔z ∈ u)。从最左的构造块接起，按参考接线接到 ⊢。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n6  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  set-pair
n4  term x
n5  term y

接线：
n4.out → n3.u
n5.out → n3.v
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n6.proof
```

</details>

### Ⅳ-03 · 外延（y,z）

- 目标：`⊢ ∀ y ∀ z ( ∀ x ( x ∈ y ↔ x ∈ z ) → y = z )`
- 提示：目标是 ∀y ∀z (∀x (x ∈ y↔x ∈ z)→y = z)。从最左的构造块接起，按参考接线接到 ⊢。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n6  [target]
n1  gen(v=y)
n2  gen(v=z)
n3  set-ext
n4  term y
n5  term z

接线：
n4.out → n3.a
n5.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n6.proof
```

</details>

### Ⅳ-04 · 配对（y,x）

- 目标：`⊢ ∀ y ∀ x ∃ u ∀ z ( ( z = y ∨ z = x ) ↔ z ∈ u )`
- 提示：目标是 ∀y ∀x ∃u ∀z (z = y∨z = x↔z ∈ u)。从最左的构造块接起，按参考接线接到 ⊢。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n6  [target]
n1  gen(v=y)
n2  gen(v=x)
n3  set-pair
n4  term y
n5  term x

接线：
n4.out → n3.u
n5.out → n3.v
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n6.proof
```

</details>

### Ⅳ-05 · 属于替换（反向）

- 目标：`⊢ ∀ x ∀ y ( x = y → ( y ∈ x → y ∈ y ) )`
- 提示：目标是 ∀x ∀y (x = y→y ∈ x→y ∈ y)。从最左的构造块接起，按参考接线接到 ⊢。
- 参考解：6 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n7  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  leibniz(mode=replace, v=z)
n4  term x
n5  term y
n6  mem

接线：
n4.out → n3.x
n5.out → n3.y
n5.out → n6.a
n4.out → n6.b
n6.out → n3.formula
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n7.proof
```

</details>

### Ⅳ-06 · 等词进入属于（全称）

- 目标：`⊢ ∀ y ∀ z ( y = z → ( x ∈ y → x ∈ z ) )`
- 提示：目标是 ∀y ∀z (y = z→x ∈ y→x ∈ z)。从最左的构造块接起，按参考接线接到 ⊢。
- 参考解：7 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n8  [target]
n1  gen(v=y)
n2  gen(v=z)
n3  leibniz(mode=replace, v=z)
n4  term y
n5  term z
n6  term x
n7  mem

接线：
n4.out → n3.x
n5.out → n3.y
n6.out → n7.a
n4.out → n7.b
n7.out → n3.formula
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n8.proof
```

</details>

### Ⅳ-07 · 等词进入属于（反向）

- 目标：`⊢ ∀ y ∀ z ( y = z → ( y ∈ x → z ∈ x ) )`
- 提示：目标是 ∀y ∀z (y = z→y ∈ x→z ∈ x)。从最左的构造块接起，按参考接线接到 ⊢。
- 参考解：7 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n8  [target]
n1  gen(v=y)
n2  gen(v=z)
n3  leibniz(mode=replace, v=z)
n4  term y
n5  term z
n6  term x
n7  mem

接线：
n4.out → n3.x
n5.out → n3.y
n4.out → n7.a
n6.out → n7.b
n7.out → n3.formula
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n8.proof
```

</details>

### Ⅳ-08 · 外延的闭包（换序）

- 目标：`⊢ ∀ y ∀ x ( ∀ z ( z ∈ y ↔ z ∈ x ) → y = x )`
- 提示：目标是 ∀y∀x((∀z(z∈y↔z∈x))→y=x)：接 set-ext，再 gen x、gen y。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n6  [target]
n1  gen(v=y)
n2  gen(v=x)
n3  set-ext
n4  term y
n5  term x

接线：
n4.out → n3.a
n5.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n6.proof
```

</details>

### Ⅳ-09 · 中间引理

- 目标：`⊢ ∀ z ( y = z → ( x ∈ y → x ∈ z ) )`
- 提示：目标 ∀z (y = z→x ∈ y→x ∈ z)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。
- 参考解：6 个模块 / 7 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n2  gen(v=z)
n3  leibniz(mode=replace, v=z)
n4  term y
n5  term z
n6  term x
n7  mem

接线：
n4.out → n3.x
n5.out → n3.y
n6.out → n7.a
n4.out → n7.b
n7.out → n3.formula
n3.out → n2.assertion
n2.out → tgt.proof
```

</details>

### Ⅳ-10 · 中间引理

- 目标：`⊢ ∀ z ( y = z → ( y ∈ x → z ∈ x ) )`
- 提示：目标 ∀z (y = z→y ∈ x→z ∈ x)：把这段子证明按接线一路拆到公理，后面会把它当黑盒。
- 参考解：6 个模块 / 7 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n2  gen(v=z)
n3  leibniz(mode=replace, v=z)
n4  term y
n5  term z
n6  term x
n7  mem

接线：
n4.out → n3.x
n5.out → n3.y
n4.out → n7.a
n6.out → n7.b
n7.out → n3.formula
n3.out → n2.assertion
n2.out → tgt.proof
```

</details>

### Ⅳ-11 · 空集

- 目标：`⊢ ∃ z ∀ x ¬ x ∈ z`
- 提示：∃z ∀x ¬x ∈ z
- 参考解：1 个模块 / 1 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n2  [target]
n1  set-empty

接线：
n1.out → n2.proof
```

</details>

### Ⅳ-12 · 并集公理（实例）

- 目标：`⊢ ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )`
- 提示：∃y ∀z (∃u (z ∈ u∧u ∈ x)↔z ∈ y)
- 参考解：2 个模块 / 2 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n3  [target]
n1  set-union
n2  term x

接线：
n2.out → n1.a
n1.out → n3.proof
```

</details>

### Ⅳ-13 · 配对公理（实例）

- 目标：`⊢ ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )`
- 提示：∃u ∀z (z = x∨z = y↔z ∈ u)
- 参考解：3 个模块 / 3 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n4  [target]
n1  set-pair
n2  term x
n3  term y

接线：
n2.out → n1.u
n3.out → n1.v
n1.out → n4.proof
```

</details>

### Ⅳ-14 · 并集公理（全称）

- 目标：`⊢ ∀ x ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )`
- 提示：∀x ∃y ∀z (∃u (z ∈ u∧u ∈ x)↔z ∈ y)
- 参考解：3 个模块 / 3 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n4  [target]
n1  gen(v=x)
n2  set-union
n3  term x

接线：
n3.out → n2.a
n2.out → n1.assertion
n1.out → n4.proof
```

</details>

### Ⅳ-15 · 并集（y）

- 目标：`⊢ ∀ y ∃ u ∀ z ( ∃ v ( z ∈ v ∧ v ∈ y ) ↔ z ∈ u )`
- 提示：∀y ∃u ∀z (∃v (z ∈ v∧v ∈ y)↔z ∈ u)
- 参考解：3 个模块 / 3 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n4  [target]
n1  gen(v=y)
n2  set-union
n3  term y

接线：
n3.out → n2.a
n2.out → n1.assertion
n1.out → n4.proof
```

</details>

### Ⅳ-16 · 中间引理

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ u ) → ( z ∈ x ↔ z ∈ y ) ) )`
- 提示：( A. z ( z e. x <-> z e. y ) -> ( A. z ( z e. y <-> z e. u ) -> ( z e. x <-> z e. y ) ) )
- 参考解：42 个模块 / 100 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n4  mp
n5  atom P
n6  term z
n7  term x
n8  mem
n9  term y
n10  mem
n11  iff
n12  all(v=z)
n13  axiom A1
n14  subst(groups=1)
n15  atom Q
n16  term u
n17  mem
n18  iff
n19  all(v=z)
n20  imp
n21  axiom A2
n22  atom R
n23  mp
n24  mp
n25  mp
n26  mp
n27  all-inst(v=z)
n28  subst(groups=1)
n29  imp
n30  mp
n31  mp
n32  subst(groups=1)
n33  subst(groups=1)
n34  imp
n35  imp
n36  subst(groups=2)
n37  mp
n38  mp
n39  subst(groups=2)
n40  subst(groups=1)
n41  imp
n42  imp
n43  imp
n44  subst(groups=2)
n45  subst(groups=2)

接线：
n6.out → n8.a
n7.out → n8.b
n6.out → n10.a
n9.out → n10.b
n8.out → n11.a
n10.out → n11.b
n11.out → n12.a
n13.out → n14.assertion
n5.out → n14.atom1
n12.out → n14.formula1
n6.out → n17.a
n16.out → n17.b
n10.out → n18.a
n17.out → n18.b
n18.out → n19.a
n15.out → n14.atom2
n19.out → n14.formula2
n19.out → n20.a
n12.out → n20.b
n11.out → n27.formula
n6.out → n27.term
n13.out → n28.assertion
n12.out → n29.a
n11.out → n29.b
n5.out → n28.atom1
n29.out → n28.formula1
n15.out → n28.atom2
n12.out → n28.formula2
n27.out → n26.a
n28.out → n26.b
n13.out → n32.assertion
n5.out → n32.atom1
n29.out → n32.formula1
n15.out → n32.atom2
n19.out → n32.formula2
n13.out → n33.assertion
n19.out → n34.a
n29.out → n34.b
n29.out → n35.a
n34.out → n35.b
n5.out → n33.atom1
n35.out → n33.formula1
n15.out → n33.atom2
n12.out → n33.formula2
n32.out → n31.a
n33.out → n31.b
n21.out → n36.assertion
n5.out → n36.atom1
n12.out → n36.formula1
n15.out → n36.atom2
n29.out → n36.formula2
n22.out → n36.atom3
n34.out → n36.formula3
n31.out → n30.a
n36.out → n30.b
n26.out → n25.a
n30.out → n25.b
n21.out → n39.assertion
n5.out → n39.atom1
n19.out → n39.formula1
n15.out → n39.atom2
n12.out → n39.formula2
n22.out → n39.atom3
n11.out → n39.formula3
n13.out → n40.assertion
n19.out → n41.a
n11.out → n41.b
n20.out → n42.a
n41.out → n42.b
n34.out → n43.a
n42.out → n43.b
n5.out → n40.atom1
n43.out → n40.formula1
n15.out → n40.atom2
n12.out → n40.formula2
n39.out → n38.a
n40.out → n38.b
n21.out → n44.assertion
n5.out → n44.atom1
n12.out → n44.formula1
n15.out → n44.atom2
n34.out → n44.formula2
n22.out → n44.atom3
n42.out → n44.formula3
n38.out → n37.a
n44.out → n37.b
n25.out → n24.a
n37.out → n24.b
n21.out → n45.assertion
n5.out → n45.atom1
n12.out → n45.formula1
n15.out → n45.atom2
n20.out → n45.formula2
n22.out → n45.atom3
n41.out → n45.formula3
n24.out → n23.a
n45.out → n23.b
n14.out → n4.a
n23.out → n4.b
n4.out → tgt.proof
```

</details>

### Ⅳ-17 · 中间引理

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( z ∈ x ↔ z ∈ y ) )`
- 提示：( A. z ( z e. x <-> z e. y ) -> ( z e. x <-> z e. y ) )
- 参考解：7 个模块 / 9 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n7  term z
n8  term x
n9  mem
n10  term y
n11  mem
n13  all-inst(v=z)
n14  iff

接线：
n7.out → n9.a
n8.out → n9.b
n7.out → n11.a
n10.out → n11.b
n9.out → n14.a
n11.out → n14.b
n14.out → n13.formula
n7.out → n13.term
n13.out → tgt.proof
```

</details>

### Ⅳ-18 · 中间引理

- 目标：`⊢ ( ∀ z ( z ∈ y ↔ z ∈ u ) → ( z ∈ y ↔ z ∈ u ) )`
- 提示：( A. z ( z e. y <-> z e. u ) -> ( z e. y <-> z e. u ) )
- 参考解：7 个模块 / 9 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n6  term z
n9  term y
n10  mem
n16  term u
n17  mem
n18  iff
n76  all-inst(v=z)

接线：
n6.out → n10.a
n9.out → n10.b
n6.out → n17.a
n16.out → n17.b
n10.out → n18.a
n17.out → n18.b
n18.out → n76.formula
n6.out → n76.term
n76.out → tgt.proof
```

</details>

### Ⅳ-19 · 中间引理

- 目标：`⊢ ( ( x ∈ u ∧ y ∈ u ) → ∃ u ( x ∈ u ∧ y ∈ u ) )`
- 提示：( ( x e. u /\ y e. u ) -> E. u ( x e. u /\ y e. u ) )
- 参考解：7 个模块 / 9 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  term x
n6  term y
n22  term u
n40  mem
n71  mem
n87  and
n94  exists-gen(v=u)

接线：
n6.out → n40.a
n22.out → n40.b
n5.out → n71.a
n22.out → n71.b
n71.out → n87.a
n40.out → n87.b
n87.out → n94.formula
n22.out → n94.term
n94.out → tgt.proof
```

</details>

### Ⅳ-20 · 中间引理

- 目标：`⊢ ( y = y → ( y = z → y = y ) )`
- 提示：( y = y -> ( y = z -> y = y ) )
- 参考解：8 个模块 / 10 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n8  atom P
n9  term y
n10  term z
n11  pred =
n18  axiom A1
n24  atom Q
n31  subst(groups=1)
n32  pred =

接线：
n9.out → n11.t1
n10.out → n11.t2
n18.out → n31.assertion
n9.out → n32.t1
n9.out → n32.t2
n8.out → n31.atom1
n32.out → n31.formula1
n24.out → n31.atom2
n11.out → n31.formula2
n31.out → tgt.proof
```

</details>

### Ⅳ-21 · 中间引理

- 目标：`⊢ ( ( y = z → z = y ) → ( y = z → ( y = z → z = y ) ) )`
- 提示：( ( y = z -> z = y ) -> ( y = z -> ( y = z -> z = y ) ) )
- 参考解：9 个模块 / 12 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n8  atom P
n9  term y
n10  term z
n11  pred =
n18  axiom A1
n20  pred =
n24  atom Q
n38  subst(groups=1)
n39  imp

接线：
n9.out → n11.t1
n10.out → n11.t2
n10.out → n20.t1
n9.out → n20.t2
n18.out → n38.assertion
n11.out → n39.a
n20.out → n39.b
n8.out → n38.atom1
n39.out → n38.formula1
n24.out → n38.atom2
n11.out → n38.formula2
n38.out → tgt.proof
```

</details>

### Ⅳ-22 · 中间引理

- 目标：`⊢ ( y = z → y = y )`
- 提示：( y = z -> y = y )
- 参考解：10 个模块 / 12 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n8  atom P
n9  term y
n10  term z
n11  pred =
n18  axiom A1
n24  atom Q
n29  mp
n30  eq-refl(t=y)
n31  subst(groups=1)
n32  pred =

接线：
n9.out → n11.t1
n10.out → n11.t2
n18.out → n31.assertion
n9.out → n32.t1
n9.out → n32.t2
n8.out → n31.atom1
n32.out → n31.formula1
n24.out → n31.atom2
n11.out → n31.formula2
n30.out → n29.a
n31.out → n29.b
n29.out → tgt.proof
```

</details>

### Ⅳ-23 · 中间引理

- 目标：`⊢ ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → ( ( x = x ∨ x = y ) ↔ x ∈ u ) )`
- 提示：( A. z ( ( z = x \/ z = y ) <-> z e. u ) -> ( ( x = x \/ x = y ) <-> x e. u ) )
- 参考解：10 个模块 / 13 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  term x
n6  term y
n17  term z
n18  pred =
n19  pred =
n20  or
n21  term u
n22  mem
n23  iff
n38  all-inst(v=z)

接线：
n17.out → n18.t1
n5.out → n18.t2
n17.out → n19.t1
n6.out → n19.t2
n18.out → n20.a
n19.out → n20.b
n17.out → n22.a
n21.out → n22.b
n20.out → n23.a
n22.out → n23.b
n23.out → n38.formula
n5.out → n38.term
n38.out → tgt.proof
```

</details>

### Ⅳ-24 · 中间引理

- 目标：`⊢ ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → ( ( y = x ∨ y = y ) ↔ y ∈ u ) )`
- 提示：( A. z ( ( z = x \/ z = y ) <-> z e. u ) -> ( ( y = x \/ y = y ) <-> y e. u ) )
- 参考解：10 个模块 / 13 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  term x
n6  term y
n17  term z
n18  pred =
n19  pred =
n20  or
n21  term u
n22  mem
n23  iff
n38  all-inst(v=z)

接线：
n17.out → n18.t1
n5.out → n18.t2
n17.out → n19.t1
n6.out → n19.t2
n18.out → n20.a
n19.out → n20.b
n17.out → n22.a
n21.out → n22.b
n20.out → n23.a
n22.out → n23.b
n23.out → n38.formula
n6.out → n38.term
n38.out → tgt.proof
```

</details>

### Ⅳ-25 · 中间引理

- 目标：`⊢ ( ( y = z → y = y ) → ( y = z → z = y ) )`
- 提示：( ( y = z -> y = y ) -> ( y = z -> z = y ) )
- 参考解：12 个模块 / 19 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n8  atom P
n9  term y
n10  term z
n11  pred =
n20  pred =
n24  atom Q
n32  pred =
n33  mp
n34  leibniz(mode=abstract, v=z)
n35  axiom A2
n36  atom R
n37  subst(groups=2)

接线：
n9.out → n11.t1
n10.out → n11.t2
n10.out → n20.t1
n9.out → n20.t2
n9.out → n32.t1
n9.out → n32.t2
n9.out → n34.x
n10.out → n34.y
n20.out → n34.formula
n35.out → n37.assertion
n8.out → n37.atom1
n11.out → n37.formula1
n24.out → n37.atom2
n32.out → n37.formula2
n36.out → n37.atom3
n20.out → n37.formula3
n34.out → n33.a
n37.out → n33.b
n33.out → tgt.proof
```

</details>

### Ⅳ-26 · 中间引理

- 目标：`⊢ ( x = y → ( y = x → ( y ∈ z → x ∈ z ) ) )`
- 提示：( x = y -> ( y = x -> ( y e. z -> x e. z ) ) )
- 参考解：15 个模块 / 23 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n8  atom P
n9  term x
n10  term y
n11  pred =
n14  mp
n15  leibniz(mode=replace, v=z)
n16  term z
n17  mem
n18  axiom A1
n19  subst(groups=1)
n20  pred =
n21  mem
n22  imp
n23  imp
n24  atom Q

接线：
n9.out → n11.t1
n10.out → n11.t2
n10.out → n15.x
n9.out → n15.y
n10.out → n17.a
n16.out → n17.b
n17.out → n15.formula
n18.out → n19.assertion
n10.out → n20.t1
n9.out → n20.t2
n9.out → n21.a
n16.out → n21.b
n17.out → n22.a
n21.out → n22.b
n20.out → n23.a
n22.out → n23.b
n8.out → n19.atom1
n23.out → n19.formula1
n24.out → n19.atom2
n11.out → n19.formula2
n15.out → n14.a
n19.out → n14.b
n14.out → tgt.proof
```

</details>

### Ⅳ-27 · 中间引理

- 目标：`⊢ ( y = z → ( z = y → ( x ∈ z → x ∈ y ) ) )`
- 提示：( y = z -> ( z = y -> ( x e. z -> x e. y ) ) )
- 参考解：15 个模块 / 23 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n8  atom P
n9  term y
n10  term z
n11  pred =
n14  mp
n15  leibniz(mode=replace, v=z)
n16  term x
n17  mem
n18  axiom A1
n19  subst(groups=1)
n20  pred =
n21  mem
n22  imp
n23  imp
n24  atom Q

接线：
n9.out → n11.t1
n10.out → n11.t2
n10.out → n15.x
n9.out → n15.y
n16.out → n17.a
n10.out → n17.b
n17.out → n15.formula
n18.out → n19.assertion
n10.out → n20.t1
n9.out → n20.t2
n16.out → n21.a
n9.out → n21.b
n17.out → n22.a
n21.out → n22.b
n20.out → n23.a
n22.out → n23.b
n8.out → n19.atom1
n23.out → n19.formula1
n24.out → n19.atom2
n11.out → n19.formula2
n15.out → n14.a
n19.out → n14.b
n14.out → tgt.proof
```

</details>

### Ⅳ-28 · 中间引理

- 目标：`⊢ ( x = x → ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → x = x ) )`
- 提示：( x = x -> ( A. z ( ( z = x \/ z = y ) <-> z e. u ) -> x = x ) )
- 参考解：15 个模块 / 19 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  term x
n6  term y
n12  axiom A1
n13  subst(groups=1)
n14  atom P
n15  pred =
n16  atom Q
n17  term z
n18  pred =
n19  pred =
n20  or
n21  term u
n22  mem
n23  iff
n24  all(v=z)

接线：
n12.out → n13.assertion
n5.out → n15.t1
n5.out → n15.t2
n14.out → n13.atom1
n15.out → n13.formula1
n17.out → n18.t1
n5.out → n18.t2
n17.out → n19.t1
n6.out → n19.t2
n18.out → n20.a
n19.out → n20.b
n17.out → n22.a
n21.out → n22.b
n20.out → n23.a
n22.out → n23.b
n23.out → n24.a
n16.out → n13.atom2
n24.out → n13.formula2
n13.out → tgt.proof
```

</details>

### Ⅳ-29 · 中间引理

- 目标：`⊢ ( y = y → ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → y = y ) )`
- 提示：( y = y -> ( A. z ( ( z = x \/ z = y ) <-> z e. u ) -> y = y ) )
- 参考解：15 个模块 / 19 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  term x
n6  term y
n12  axiom A1
n13  subst(groups=1)
n14  atom P
n15  pred =
n16  atom Q
n17  term z
n18  pred =
n19  pred =
n20  or
n21  term u
n22  mem
n23  iff
n24  all(v=z)

接线：
n12.out → n13.assertion
n6.out → n15.t1
n6.out → n15.t2
n14.out → n13.atom1
n15.out → n13.formula1
n17.out → n18.t1
n5.out → n18.t2
n17.out → n19.t1
n6.out → n19.t2
n18.out → n20.a
n19.out → n20.b
n17.out → n22.a
n21.out → n22.b
n20.out → n23.a
n22.out → n23.b
n23.out → n24.a
n16.out → n13.atom2
n24.out → n13.formula2
n13.out → tgt.proof
```

</details>

### Ⅳ-30 · 中间引理

- 目标：`⊢ ( y = z → z = y )`
- 提示：( y = z -> z = y )
- 参考解：17 个模块 / 28 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n8  atom P
n9  term y
n10  term z
n11  pred =
n18  axiom A1
n20  pred =
n24  atom Q
n28  mp
n29  mp
n30  eq-refl(t=y)
n31  subst(groups=1)
n32  pred =
n33  mp
n34  leibniz(mode=abstract, v=z)
n35  axiom A2
n36  atom R
n37  subst(groups=2)

接线：
n9.out → n11.t1
n10.out → n11.t2
n10.out → n20.t1
n9.out → n20.t2
n18.out → n31.assertion
n9.out → n32.t1
n9.out → n32.t2
n8.out → n31.atom1
n32.out → n31.formula1
n24.out → n31.atom2
n11.out → n31.formula2
n30.out → n29.a
n31.out → n29.b
n9.out → n34.x
n10.out → n34.y
n20.out → n34.formula
n35.out → n37.assertion
n8.out → n37.atom1
n11.out → n37.formula1
n24.out → n37.atom2
n32.out → n37.formula2
n36.out → n37.atom3
n20.out → n37.formula3
n34.out → n33.a
n37.out → n33.b
n29.out → n28.a
n33.out → n28.b
n28.out → tgt.proof
```

</details>

### Ⅳ-31 · 中间引理

- 目标：`⊢ ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → y = y )`
- 提示：( A. z ( ( z = x \/ z = y ) <-> z e. u ) -> y = y )
- 参考解：17 个模块 / 21 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  term x
n6  term y
n10  mp
n11  eq-refl(t=y)
n12  axiom A1
n13  subst(groups=1)
n14  atom P
n15  pred =
n16  atom Q
n17  term z
n18  pred =
n19  pred =
n20  or
n21  term u
n22  mem
n23  iff
n24  all(v=z)

接线：
n12.out → n13.assertion
n6.out → n15.t1
n6.out → n15.t2
n14.out → n13.atom1
n15.out → n13.formula1
n17.out → n18.t1
n5.out → n18.t2
n17.out → n19.t1
n6.out → n19.t2
n18.out → n20.a
n19.out → n20.b
n17.out → n22.a
n21.out → n22.b
n20.out → n23.a
n22.out → n23.b
n23.out → n24.a
n16.out → n13.atom2
n24.out → n13.formula2
n11.out → n10.a
n13.out → n10.b
n10.out → tgt.proof
```

</details>

### Ⅳ-32 · 中间引理

- 目标：`⊢ ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → ( x ∈ u → ∃ u x ∈ u ) )`
- 提示：( A. z ( ( z = x \/ z = y ) <-> z e. u ) -> ( x e. u -> E. u x e. u ) )
- 参考解：19 个模块 / 26 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  term x
n6  term y
n12  axiom A1
n14  atom P
n16  atom Q
n17  term z
n18  pred =
n19  pred =
n20  or
n21  term u
n22  mem
n23  iff
n24  all(v=z)
n39  mem
n51  mp
n52  exists-gen(v=u)
n53  subst(groups=1)
n54  exists(v=u)
n55  imp

接线：
n17.out → n18.t1
n5.out → n18.t2
n17.out → n19.t1
n6.out → n19.t2
n18.out → n20.a
n19.out → n20.b
n17.out → n22.a
n21.out → n22.b
n20.out → n23.a
n22.out → n23.b
n23.out → n24.a
n5.out → n39.a
n21.out → n39.b
n39.out → n52.formula
n21.out → n52.term
n12.out → n53.assertion
n39.out → n54.a
n39.out → n55.a
n54.out → n55.b
n14.out → n53.atom1
n55.out → n53.formula1
n16.out → n53.atom2
n24.out → n53.formula2
n52.out → n51.a
n53.out → n51.b
n51.out → tgt.proof
```

</details>

### Ⅳ-33 · 中间引理

- 目标：`⊢ ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → ( y ∈ u → ∃ u y ∈ u ) )`
- 提示：( A. z ( ( z = x \/ z = y ) <-> z e. u ) -> ( y e. u -> E. u y e. u ) )
- 参考解：19 个模块 / 26 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n5  term x
n6  term y
n12  axiom A1
n14  atom P
n16  atom Q
n17  term z
n18  pred =
n19  pred =
n20  or
n21  term u
n22  mem
n23  iff
n24  all(v=z)
n39  mem
n51  mp
n52  exists-gen(v=u)
n53  subst(groups=1)
n54  exists(v=u)
n55  imp

接线：
n17.out → n18.t1
n5.out → n18.t2
n17.out → n19.t1
n6.out → n19.t2
n18.out → n20.a
n19.out → n20.b
n17.out → n22.a
n21.out → n22.b
n20.out → n23.a
n22.out → n23.b
n23.out → n24.a
n6.out → n39.a
n21.out → n39.b
n39.out → n52.formula
n21.out → n52.term
n12.out → n53.assertion
n39.out → n54.a
n39.out → n55.a
n54.out → n55.b
n14.out → n53.atom1
n55.out → n53.formula1
n16.out → n53.atom2
n24.out → n53.formula2
n52.out → n51.a
n53.out → n51.b
n51.out → tgt.proof
```

</details>

### Ⅳ-34 · 中间引理

- 目标：`⊢ ( y = z → ( y = z → z = y ) )`
- 提示：( y = z -> ( y = z -> z = y ) )
- 参考解：20 个模块 / 37 条接线

<details><summary>展开参考电路</summary>

```text
模块：
tgt  [target]
n8  atom P
n9  term y
n10  term z
n11  pred =
n18  axiom A1
n20  pred =
n24  atom Q
n27  mp
n28  mp
n29  mp
n30  eq-refl(t=y)
n31  subst(groups=1)
n32  pred =
n33  mp
n34  leibniz(mode=abstract, v=z)
n35  axiom A2
n36  atom R
n37  subst(groups=2)
n38  subst(groups=1)
n39  imp

接线：
n9.out → n11.t1
n10.out → n11.t2
n10.out → n20.t1
n9.out → n20.t2
n18.out → n31.assertion
n9.out → n32.t1
n9.out → n32.t2
n8.out → n31.atom1
n32.out → n31.formula1
n24.out → n31.atom2
n11.out → n31.formula2
n30.out → n29.a
n31.out → n29.b
n9.out → n34.x
n10.out → n34.y
n20.out → n34.formula
n35.out → n37.assertion
n8.out → n37.atom1
n11.out → n37.formula1
n24.out → n37.atom2
n32.out → n37.formula2
n36.out → n37.atom3
n20.out → n37.formula3
n34.out → n33.a
n37.out → n33.b
n29.out → n28.a
n33.out → n28.b
n18.out → n38.assertion
n11.out → n39.a
n20.out → n39.b
n8.out → n38.atom1
n39.out → n38.formula1
n24.out → n38.atom2
n11.out → n38.formula2
n28.out → n27.a
n38.out → n27.b
n27.out → tgt.proof
```

</details>
