# 公理板 · 154 关参考解法清单

> 由 `scripts/export-solutions.js` 从 `src/levels.js` 自动生成。每个参考电路都先经过真实 Engine 求值验证；
> 清单里的模块按参考电路中的节点顺序排列，接线单独列出，按 `模块.端口 → 模块.端口` 连即可。
> 目标槽的节点已在关卡棋盘上，标为 `[target]`。

## 快速索引

| 章节 | 关 | 标题 | 目标 | 提示 | 模块/接线 |
| --- | --- | --- | --- | --- | --- |
| Ⅰ | i | 公理 A1 | `⊢ ( P → ( Q → P ) )` | A1 · P → (Q → P) | 1 / 1 |
| Ⅰ | ii | 公理 A2 | `⊢ ( ( P → ( Q → R ) ) → ( ( P → Q ) → ( P → R ) ) )` | A2 · (P→(Q→R)) → ((P→Q)→(P→R)) | 1 / 1 |
| Ⅰ | iii | 公理 A3 | `⊢ ( ( ¬ P → ¬ Q ) → ( Q → P ) )` | A3 · (¬P→¬Q) → (Q→P) | 1 / 1 |
| Ⅰ | iv | 代入 | `⊢ ( Q → ( R → Q ) )` | S · A[P↦B] ⇒ A′ | 5 / 6 |
| Ⅰ | v | 分离 | `⊢ ( ( P → Q ) → ( P → P ) )` | M · A · A→B ⇒ B | 6 / 6 |
| Ⅰ | `Ⅰ-01` | 引理 · P→(P→P)→P | `⊢ ( P → ( ( P → P ) → P ) )` | 第Ⅰ章先证：P→(P→P)→P。先搭最左边的构造块，再沿依赖接到 ⊢。 | 5 / 6 |
| Ⅰ | `Ⅰ-02` | 引理 · (P→Q)→(Q→R)→P→Q | `⊢ ( ( P → Q ) → ( ( Q → R ) → ( P → Q ) ) )` | 第Ⅰ章先证：(P→Q)→(Q→R)→P→Q。先搭最左边的构造块，再沿依赖接到 ⊢。 | 7 / 10 |
| Ⅰ | `Ⅰ-03` | 引理 · (((P→Q)→P)→(P→Q)→Q)→ | `⊢ ( ( ( ( P → Q ) → P ) → ( ( P → Q ) → Q ) ) → ( P → ( ( ( P → Q ) → P ) → ( ( P → Q ) → Q ) ) ) )` | 第Ⅰ章先证：(((P→Q)→P)→(P→Q)→Q)→P→((P→Q)→P)→(P→Q)→Q。先搭最左边的构造块，再沿依赖接到 ⊢。 | 8 / 14 |
| Ⅰ | `Ⅰ-04` | 引理 · ((P→Q)→(R→P→Q)→(R→P) | `⊢ ( ( ( P → Q ) → ( ( R → ( P → Q ) ) → ( ( R → P ) → ( R → Q ) ) ) ) → ( ( ( P → Q ) → ( R → ( P → Q ) ) ) → ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) ) ) )` | 第Ⅰ章先证：((P→Q)→(R→P→Q)→(R→P)→R→Q)→((P→Q)→R→P→Q)→(P→Q)→(R→P)→R→Q。先搭最左边的构造块，再沿依赖接到 ⊢。 | 10 / 18 |
| Ⅰ | `Ⅰ-05` | 引理 · ((P→Q→R)→(Q→(Q→R)→R) | `⊢ ( ( ( P → ( Q → R ) ) → ( ( Q → ( ( Q → R ) → R ) ) → ( Q → ( ( P → ( Q → R ) ) → ( P → R ) ) ) ) ) → ( ( ( P → ( Q → R ) ) → ( Q → ( ( Q → R ) → R ) ) ) → ( ( P → ( Q → R ) ) → ( Q → ( ( P → ( Q → R ) ) → ( P → R ) ) ) ) ) )` | 第Ⅰ章先证：((P→Q→R)→(Q→(Q→R)→R)→Q→(P→Q→R)→P→R)→((P→Q→R)→Q→(Q→R)→R)→(P→Q→R)→Q→(P→Q→R)→P→R。先搭最左边的构造块，再沿依赖接到 ⊢。 | 12 / 22 |
| Ⅰ | `Ⅰ-06` | 引理 · ((Q→(Q→R)→R)→Q→(P→Q→ | `⊢ ( ( ( Q → ( ( Q → R ) → R ) ) → ( Q → ( ( P → ( Q → R ) ) → ( P → R ) ) ) ) → ( ( P → ( Q → R ) ) → ( ( Q → ( ( Q → R ) → R ) ) → ( Q → ( ( P → ( Q → R ) ) → ( P → R ) ) ) ) ) )` | 第Ⅰ章先证：((Q→(Q→R)→R)→Q→(P→Q→R)→P→R)→(P→Q→R)→(Q→(Q→R)→R)→Q→(P→Q→R)→P→R。先搭最左边的构造块，再沿依赖接到 ⊢。 | 13 / 22 |
| Ⅰ | `Ⅰ-07` | 引理 · (P→Q)→(R→P→Q)→(R→P)→ | `⊢ ( ( P → Q ) → ( ( R → ( P → Q ) ) → ( ( R → P ) → ( R → Q ) ) ) )` | 第Ⅰ章先证：(P→Q)→(R→P→Q)→(R→P)→R→Q。先搭最左边的构造块，再沿依赖接到 ⊢。 | 14 / 27 |
| Ⅰ | `Ⅰ-08` | 引理 · ((P→Q)→R→P→Q)→(P→Q)→ | `⊢ ( ( ( P → Q ) → ( R → ( P → Q ) ) ) → ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) ) )` | 第Ⅰ章先证：((P→Q)→R→P→Q)→(P→Q)→(R→P)→R→Q。先搭最左边的构造块，再沿依赖接到 ⊢。 | 16 / 36 |
| Ⅰ | `Ⅰ-09` | 引理 · (¬P→¬Q→¬P)→¬P→P→Q | `⊢ ( ( ¬ P → ( ¬ Q → ¬ P ) ) → ( ¬ P → ( P → Q ) ) )` | 第Ⅰ章先证：(¬P→¬Q→¬P)→¬P→P→Q。先搭最左边的构造块，再沿依赖接到 ⊢。 | 16 / 30 |
| Ⅰ | `Ⅰ-10` | 引理 · ((¬P→P)→¬P→¬(¬P→P))→ | `⊢ ( ( ( ¬ P → P ) → ( ¬ P → ¬ ( ¬ P → P ) ) ) → ( ( ¬ P → P ) → ( ( ¬ P → P ) → P ) ) )` | 第Ⅰ章先证：((¬P→P)→¬P→¬(¬P→P))→(¬P→P)→(¬P→P)→P。先搭最左边的构造块，再沿依赖接到 ⊢。 | 17 / 30 |
| Ⅰ | `Ⅰ-11` | 同一律 | `⊢ ( P → P )` | 任何命题都推出自己：A→A。 | 11 / 15 |
| Ⅰ | `Ⅰ-12` | 后件自反 | `⊢ ( P → ( Q → Q ) )` | 前件无关时，后件仍然自反：A→(B→B)。 | 8 / 13 |
| Ⅰ | `Ⅰ-13` | 回指前件 | `⊢ ( P → ( ( P → Q ) → Q ) )` | A 可以推出“若 A 则 B”的后件 B。 | 18 / 33 |
| Ⅰ | `Ⅰ-14` | 后件强化 | `⊢ ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) )` | 若 A→B，则任意 C 也能走到 C→B。 | 8 / 10 |
| Ⅰ | `Ⅰ-15` | 前件弱化 | `⊢ ( ( P → Q ) → ( ( Q → R ) → ( P → R ) ) )` | 若 A→B，则 (B→C)→(A→C)。 | 55 / 157 |
| Ⅰ | `Ⅰ-16` | 否定的蕴涵 | `⊢ ( ¬ ( P → Q ) → ( P → ¬ Q ) )` | ¬(A→B) → (A→¬B)：否定一个蕴涵可以得到后件的否定。 | 179 / 553 |
| Ⅰ | `Ⅰ-17` | 否定的前件 | `⊢ ( ¬ ( P → Q ) → ( ¬ P → ¬ Q ) )` | ¬(A→B) → (¬A→¬B)：否定蕴涵的另一条推论。 | 180 / 554 |
| Ⅰ | `Ⅰ-18` | 前件重排 | `⊢ ( ( P → ( Q → R ) ) → ( Q → ( P → R ) ) )` | A→(B→C) 可以换成 B→(A→C)。 | 42 / 103 |
| Ⅰ | `Ⅰ-19` | 逆否命题 | `⊢ ( ( P → Q ) → ( ¬ Q → ¬ P ) )` | (A→B)→(¬B→¬A)。 | 170 / 515 |
| Ⅰ | `Ⅰ-20` | 逆否（否定后件） | `⊢ ( ( P → ¬ Q ) → ( Q → ¬ P ) )` | (A→¬B)→(B→¬A)。 | 84 / 241 |
| Ⅰ | `Ⅰ-21` | 逆否（否定前件） | `⊢ ( ( ¬ P → Q ) → ( ¬ Q → P ) )` | (¬A→B)→(¬B→A)。 | 98 / 282 |
| Ⅰ | `Ⅰ-22` | 双重否定引入 | `⊢ ( P → ¬ ¬ P )` | A→¬¬A。 | 82 / 239 |
| Ⅰ | `Ⅰ-23` | 双重否定消去 | `⊢ ( ¬ ¬ P → P )` | ¬¬A→A。 | 45 / 116 |
| Ⅰ | `Ⅰ-24` | 矛盾推出一切 | `⊢ ( ¬ P → ( P → Q ) )` | ¬A→(A→B)：矛盾可以推出任何命题。 | 8 / 10 |
| Ⅰ | `Ⅰ-25` | 合取前件合并 | `⊢ ( ( P → ( Q → R ) ) → ( ( P ∧ Q ) → R ) )` | (P→(Q→R))→((P∧Q)→R)，由 A1/A2/∧ 规则证明。 | 42 / 116 |
| Ⅰ | `Ⅰ-26` | 分情况 | `⊢ ( ( ¬ P → Q ) → ( ( P → Q ) → Q ) )` | (¬A→B)→((A→B)→B)：两条路径都通向 B。 | 111 / 332 |
| Ⅰ | `Ⅰ-27` | 蕴涵合成 | `⊢ ( ( P → Q ) → ( ( R → S ) → ( ( Q → R ) → ( P → S ) ) ) )` | (A→B)→((C→D)→((B→C)→(A→D)))。 | 66 / 192 |
| Ⅰ | `Ⅰ-28` | 替换前件（左） | `⊢ ( ( ( P → Q ) → R ) → ( Q → R ) )` | ((A→B)→C)→(B→C)。 | 38 / 99 |
| Ⅰ | `Ⅰ-29` | 替换前件（右） | `⊢ ( ( ( P → Q ) → R ) → ( ¬ P → R ) )` | ((A→B)→C)→(A→C)。 | 39 / 101 |
| Ⅰ | `Ⅰ-30` | 合取前件拆分 | `⊢ ( ( ( P ∧ Q ) → R ) → ( P → ( Q → R ) ) )` | ((P∧Q)→R)→(P→(Q→R))，由 A1/A2/∧ 规则证明。 | 77 / 231 |
| Ⅰ | `Ⅰ-31` | 预线性 | `⊢ ( ( ( P → Q ) → ( P → R ) ) → ( P → ( Q → R ) ) )` | ((A→B)→(A→C))→(A→(B→C)) 的另一形式。 | 81 / 235 |
| Ⅰ | `Ⅰ-32` | 反证法 | `⊢ ( ( ¬ P → P ) → P )` | (¬A→A)→A：如果否定 A 能推出 A，那么 A 成立。 | 18 / 33 |
| Ⅰ | `Ⅰ-33` | 简化蕴涵 | `⊢ ( ¬ ( P → ¬ Q ) → Q )` | ¬(A→¬B)→B：否定一个蕴涵可以得到后件。 | 46 / 125 |
| Ⅰ | `Ⅰ-34` | 皮尔士律 | `⊢ ( ( ( P → Q ) → P ) → P )` | ((A→B)→A)→A：经典逻辑的标志性定理。 | 110 / 320 |
| Ⅱ | i | 全称引入 | `⊢ ( P → ∀ x P )` | ∀* · A ⇒ A → ∀x A | 2 / 2 |
| Ⅱ | ii | 全称例化 | `⊢ ( ∀ x P → P )` | ∀E* · ∀x A ⇒ A[t/x] | 3 / 3 |
| Ⅱ | iii | 全称推广 | `⊢ ∀ x ( P → ( Q → P ) )` | ∀I · A ⇒ ∀x A | 2 / 2 |
| Ⅱ | iv | 存在推广 | `⊢ ( P → ∃ x P )` | ∃I* · A[t/x] ⇒ ∃x A | 3 / 3 |
| Ⅱ | v | 全称分配公理 | `⊢ ( ∀ x ( P → Q ) → ( ∀ x P → ∀ x Q ) )` | A5 · ∀x(P→Q) ⇒ ∀xP → ∀xQ | 1 / 1 |
| Ⅱ | `Ⅱ-01` | 引理 · ∀x G(x)→G(x) | `⊢ ( ∀ x G ( x ) → G ( x ) )` | 第Ⅱ章先证：∀x G(x)→G(x)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 5 / 5 |
| Ⅱ | `Ⅱ-02` | 引理 · F(x)→G(x)→F(x) | `⊢ ( F ( x ) → ( G ( x ) → F ( x ) ) )` | 第Ⅱ章先证：F(x)→G(x)→F(x)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 7 / 8 |
| Ⅱ | `Ⅱ-03` | 引理 · ∀x (F(x)→G(x)→F(x)) | `⊢ ∀ x ( F ( x ) → ( G ( x ) → F ( x ) ) )` | 第Ⅱ章先证：∀x (F(x)→G(x)→F(x))。先搭最左边的构造块，再沿依赖接到 ⊢。 | 8 / 9 |
| Ⅱ | `Ⅱ-04` | 引理 · (G(y)→∀x G(y))→F(x)→ | `⊢ ( ( G ( y ) → ∀ x G ( y ) ) → ( F ( x ) → ( G ( y ) → ∀ x G ( y ) ) ) )` | 第Ⅱ章先证：(G(y)→∀x G(y))→F(x)→G(y)→∀x G(y)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 10 / 11 |
| Ⅱ | `Ⅱ-05` | 引理 · F(x)→∀x G(x)→G(x) | `⊢ ( F ( x ) → ( ∀ x G ( x ) → G ( x ) ) )` | 第Ⅱ章先证：F(x)→∀x G(x)→G(x)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 12 / 16 |
| Ⅱ | `Ⅱ-06` | 引理 · F(x)→(H(x)→F(x))→G(x | `⊢ ( F ( x ) → ( ( H ( x ) → F ( x ) ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) ) )` | 第Ⅱ章先证：F(x)→(H(x)→F(x))→G(x)→H(x)→F(x)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 13 / 22 |
| Ⅱ | `Ⅱ-07` | 引理 · (∀x (G(x)→H(x))→∀x G | `⊢ ( ( ∀ x ( G ( x ) → H ( x ) ) → ( ∀ x G ( x ) → ∀ x H ( x ) ) ) → ( ∀ x F ( x ) → ( ∀ x ( G ( x ) → H ( x ) ) → ( ∀ x G ( x ) → ∀ x H ( x ) ) ) ) )` | 第Ⅱ章先证：(∀x (G(x)→H(x))→∀x G(x)→∀x H(x))→∀x F(x)→∀x (G(x)→H(x))→∀x G(x)→∀x H(x)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 15 / 19 |
| Ⅱ | `Ⅱ-08` | 引理 · F(x)→∀x (G(x)→H(x))→ | `⊢ ( F ( x ) → ( ∀ x ( G ( x ) → H ( x ) ) → ( ∀ x G ( x ) → ∀ x H ( x ) ) ) )` | 第Ⅱ章先证：F(x)→∀x (G(x)→H(x))→∀x G(x)→∀x H(x)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 17 / 25 |
| Ⅱ | `Ⅱ-09` | 引理 · ∀x F(x)→∀x (G(x)→H(x | `⊢ ( ∀ x F ( x ) → ( ∀ x ( G ( x ) → H ( x ) ) → ( ∀ x G ( x ) → ∀ x H ( x ) ) ) )` | 第Ⅱ章先证：∀x F(x)→∀x (G(x)→H(x))→∀x G(x)→∀x H(x)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 18 / 26 |
| Ⅱ | `Ⅱ-10` | 引理 · (F(z)→∀x F(z))→F(z)→ | `⊢ ( ( F ( z ) → ∀ x F ( z ) ) → ( F ( z ) → ∀ x ∀ y F ( z ) ) )` | 第Ⅱ章先证：(F(z)→∀x F(z))→F(z)→∀x ∀y F(z)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 20 / 32 |
| Ⅱ | `Ⅱ-11` | 前件提取 | `⊢ ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → G ( x ) ) )` | P→∀xQ 与 P→Q 的辖域关系。 | 11 / 13 |
| Ⅱ | `Ⅱ-12` | 全称弱化 | `⊢ ( ∀ x F ( x ) → ∀ x ( G ( x ) → F ( x ) ) )` | ∀xF(x) → ∀x(F(x)→G(x))? 由公理 A1 的全称形式。 | 10 / 12 |
| Ⅱ | `Ⅱ-13` | 嵌套全称引入 | `⊢ ( F ( x ) → ( G ( y ) → ∀ x G ( y ) ) )` | P→(Q→∀xQ) 的谓词实例。 | 5 / 5 |
| Ⅱ | `Ⅱ-14` | 双重量词消去 | `⊢ ( ∀ x ∀ y F ( x ) → F ( x ) )` | ∀x∀yF(x)→F(x) 的双重实例化。 | 19 / 30 |
| Ⅱ | `Ⅱ-15` | 三段全称分配 | `⊢ ( ∀ x ( F ( x ) → ( G ( x ) → H ( x ) ) ) → ( ∀ x F ( x ) → ( ∀ x G ( x ) → ∀ x H ( x ) ) ) )` | ∀x(F→(G→H)) 分配到三个前件。 | 30 / 53 |
| Ⅱ | `Ⅱ-16` | 混合三段论 | `⊢ ( ( F ( x ) → ∀ x ( G ( x ) → H ( x ) ) ) → ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )` | P→∀x(Q→R) 与 P→∀xQ 推出 P→∀xR。 | 29 / 57 |
| Ⅱ | `Ⅱ-17` | 全称三段论 | `⊢ ( ∀ x ( G ( x ) → H ( x ) ) → ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )` | ∀x(G→H) 把 P→∀xG 接到 P→∀xH。 | 34 / 76 |
| Ⅱ | `Ⅱ-18` | 双层分配 | `⊢ ( ∀ x ∀ y ( F ( x ) → G ( x ) ) → ( ∀ x ∀ y F ( x ) → ∀ x ∀ y G ( x ) ) )` | ∀x∀y(F→G) 的分配。 | 40 / 79 |
| Ⅱ | `Ⅱ-19` | 二次回指 | `⊢ ( F ( x ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) )` | 谓词版 A1 的两次实例。 | 16 / 24 |
| Ⅱ | `Ⅱ-20` | 四段分配 | `⊢ ( ∀ x ( F ( x ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) ) → ( ∀ x F ( x ) → ( ∀ x G ( x ) → ( ∀ x H ( x ) → ∀ x F ( x ) ) ) ) )` | ∀x(F→(G→(H→I))) 的四层分配。 | 49 / 117 |
| Ⅱ | `Ⅱ-21` | 双重量词引入 | `⊢ ( F ( z ) → ∀ x ∀ y F ( z ) )` | P→∀x∀yP 的双层引入。 | 5 / 5 |
| Ⅱ | `Ⅱ-22` | 辖域移动（变体二） | `⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )` | 另一组合法的辖域移动实例。 | 44 / 110 |
| Ⅱ | `Ⅱ-23` | 全称后件组合 | `⊢ ( ( F ( x ) → ∀ x G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )` | P→∀xQ 与 ∀x(Q→R) 推出 P→∀xR。 | 27 / 51 |
| Ⅱ | `Ⅱ-24` | 辖域移动 | `⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )` | ∀x(F(y)→G(x)) → (F(y)→∀xG(x))，y 不受 x 影响。 | 1 / 1 |
| Ⅱ | `Ⅱ-25` | 全称替换前件 | `⊢ ( ( F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → G ( x ) ) )` | (F(x)→G(x))→(∀xF(x)→G(x))。 | 46 / 128 |
| Ⅱ | `Ⅱ-26` | 全称合并 | `⊢ ( ( ∀ x F ( x ) → ∀ x ∀ x F ( x ) ) → ( ( ∀ x ( ∀ x F ( x ) → G ( x ) ) → ( ∀ x ∀ x F ( x ) → ∀ x G ( x ) ) ) → ( ∀ x ( ∀ x F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → ∀ x G ( x ) ) ) ) )` | 两层 ∀ 与蕴含的复杂合并。 | 93 / 284 |
| Ⅱ | `Ⅱ-27` | 全称三段论链 | `⊢ ( ∀ x ( F ( x ) → G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ∀ x ( F ( x ) → H ( x ) ) ) )` | ∀x(F→G) 与 ∀x(G→H) 推出 ∀x(F→H)。 | 96 / 283 |
| Ⅱ | `Ⅱ-28` | 辖域移动（H/G） | `⊢ ( ∀ x ( H ( y ) → F ( x ) ) → ( H ( y ) → ∀ x F ( x ) ) )` | 另一组谓词的辖域移动。 | 44 / 110 |
| Ⅱ | `Ⅱ-29` | 全称三段论（换序） | `⊢ ( ∀ x ( F ( x ) → G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ∀ x ( F ( x ) → H ( x ) ) ) )` | 谓词换序后的全称三段论。 | 1 / 1 |
| Ⅱ | `Ⅱ-30` | 辖域移动（变体三） | `⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )` | 另一组合法的辖域移动实例。 | 1 / 1 |
| Ⅱ | `Ⅱ-31` | 全称三段论（H/F） | `⊢ ( ∀ x ( F ( x ) → H ( x ) ) → ( ( G ( x ) → ∀ x F ( x ) ) → ( G ( x ) → ∀ x H ( x ) ) ) )` | 换谓词的全称三段论。 | 34 / 76 |
| Ⅱ | `Ⅱ-32` | 全称合并（换序） | `⊢ ( ( ∀ x G ( x ) → ∀ x ∀ x G ( x ) ) → ( ( ∀ x ( ∀ x G ( x ) → F ( x ) ) → ( ∀ x ∀ x G ( x ) → ∀ x F ( x ) ) ) → ( ∀ x ( ∀ x G ( x ) → F ( x ) ) → ( ∀ x G ( x ) → ∀ x F ( x ) ) ) ) )` | 换谓词后的全称合并。 | 93 / 284 |
| Ⅱ | `Ⅱ-33` | 全称替换前件（G） | `⊢ ( ( G ( x ) → F ( x ) ) → ( ∀ x G ( x ) → F ( x ) ) )` | (G(x)→F(x))→(∀xG(x)→F(x))。 | 45 / 125 |
| Ⅱ | `Ⅱ-34` | 辖域移动（F/G 变体） | `⊢ ( ∀ x ( F ( z ) → G ( y ) ) → ( F ( z ) → ∀ x G ( y ) ) )` | 另一组合法的辖域移动。 | 44 / 110 |
| Ⅲ | i | 等词自反 | `⊢ x = x` | =I · t = t | 1 / 1 |
| Ⅲ | ii | Leibniz 替换 | `⊢ ( x = y → ( F ( x ) → F ( y ) ) )` | =L · x=y ⇒ F(x) → F(y) | 5 / 5 |
| Ⅲ | iii | Leibniz 反向 | `⊢ ( y = x → ( F ( y ) → F ( x ) ) )` | =L · y=x ⇒ F(y) → F(x) | 5 / 5 |
| Ⅲ | iv | 等词替换（直接模式） | `⊢ ( x = y → ( x = z → y = z ) )` | =L · x=y ⇒ (x=z → y=z) | 5 / 6 |
| Ⅲ | `Ⅲ-01` | 引理 · x = x→y = y→x = x∧y  | `⊢ ( x = x → ( y = y → ( x = x ∧ y = y ) ) )` | 第Ⅲ章先证：x = x→y = y→x = x∧y = y。先搭最左边的构造块，再沿依赖接到 ⊢。 | 5 / 7 |
| Ⅲ | `Ⅲ-02` | 引理 · F(y)→y = y→F(y) | `⊢ ( F ( y ) → ( y = y → F ( y ) ) )` | 第Ⅲ章先证：F(y)→y = y→F(y)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 7 / 9 |
| Ⅲ | `Ⅲ-03` | 引理 · x = x→x = y→x = x | `⊢ ( x = x → ( x = y → x = x ) )` | 第Ⅲ章先证：x = x→x = y→x = x。先搭最左边的构造块，再沿依赖接到 ⊢。 | 8 / 10 |
| Ⅲ | `Ⅲ-04` | 引理 · (x = y→y = x→x = y∧y | `⊢ ( ( x = y → ( y = x → ( x = y ∧ y = x ) ) ) → ( ( x = y → y = x ) → ( x = y → ( x = y ∧ y = x ) ) ) )` | 第Ⅲ章先证：(x = y→y = x→x = y∧y = x)→(x = y→y = x)→x = y→x = y∧y = x。先搭最左边的构造块，再沿依赖接到 ⊢。 | 10 / 14 |
| Ⅲ | `Ⅲ-05` | 引理 · (x = y→y = x)→x = y→ | `⊢ ( ( x = y → y = x ) → ( x = y → ( x = y ∧ y = x ) ) )` | 第Ⅲ章先证：(x = y→y = x)→x = y→x = y∧y = x。先搭最左边的构造块，再沿依赖接到 ⊢。 | 12 / 18 |
| Ⅲ | `Ⅲ-06` | 引理 · (∀z (z ∈ y→z ∈ x)→z  | `⊢ ( ( ∀ z ( z ∈ y → z ∈ x ) → ( z ∈ y → z ∈ x ) ) → ( x = y → ( ∀ z ( z ∈ y → z ∈ x ) → ( z ∈ y → z ∈ x ) ) ) )` | 第Ⅲ章先证：(∀z (z ∈ y→z ∈ x)→z ∈ y→z ∈ x)→x = y→∀z (z ∈ y→z ∈ x)→z ∈ y→z ∈ x。先搭最左边的构造块，再沿依赖接到 ⊢。 | 13 / 17 |
| Ⅲ | `Ⅲ-07` | 引理 · x = y→x = z→F(x)→F(z | `⊢ ( x = y → ( x = z → ( F ( x ) → F ( z ) ) ) )` | 第Ⅲ章先证：x = y→x = z→F(x)→F(z)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 15 / 21 |
| Ⅲ | `Ⅲ-08` | 引理 · (x = y→x = y→(F(y)→G | `⊢ ( ( x = y → ( x = y → ( ( F ( y ) → ( G ( y ) → F ( y ) ) ) → ( F ( x ) → ( G ( x ) → F ( x ) ) ) ) ) ) → ( ( x = y → x = y ) → ( x = y → ( ( F ( y ) → ( G ( y ) → F ( y ) ) ) → ( F ( x ) → ( G ( x ) → F ( x ) ) ) ) ) ) )` | 第Ⅲ章先证：(x = y→x = y→(F(y)→G(y)→F(y))→F(x)→G(x)→F(x))→(x = y→x = y)→x = y→(F(y)→G(y)→F(y))→F(x)→G(x)→F(x)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 17 / 24 |
| Ⅲ | `Ⅲ-09` | 引理 · x = y→(x = z→F(x)→F( | `⊢ ( x = y → ( ( x = z → ( F ( x ) → F ( z ) ) ) → ( y = z → ( x = z → ( F ( x ) → F ( z ) ) ) ) ) )` | 第Ⅲ章先证：x = y→(x = z→F(x)→F(z))→y = z→x = z→F(x)→F(z)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 18 / 29 |
| Ⅲ | `Ⅲ-10` | 引理 · (x = y→F(x)→F(y))→x  | `⊢ ( ( x = y → ( F ( x ) → F ( y ) ) ) → ( x = y → ( ( F ( y ) → F ( x ) ) → ( F ( x ) ↔ F ( y ) ) ) ) )` | 第Ⅲ章先证：(x = y→F(x)→F(y))→x = y→(F(y)→F(x))→(F(x)↔F(y))。先搭最左边的构造块，再沿依赖接到 ⊢。 | 20 / 33 |
| Ⅲ | `Ⅲ-11` | 自反（x） | `⊢ x = x` | 任何个体等于自己：x=x。 | 1 / 1 |
| Ⅲ | `Ⅲ-12` | 自反式合并 | `⊢ ∀ x ∀ y ( x = x ∧ y = y )` | 两条自反式可以合成合取：∀x∀y(x=x ∧ y=y)。 | 7 / 7 |
| Ⅲ | `Ⅲ-13` | 对称性 | `⊢ ( x = y → y = x )` | x=y 可以反转成 y=x。 | 16 / 23 |
| Ⅲ | `Ⅲ-14` | 传递性 | `⊢ ( x = y → ( y = z → x = z ) )` | x=y 与 y=z 推出 x=z。 | 13 / 19 |
| Ⅲ | `Ⅲ-15` | 谓词替换 | `⊢ ( x = y → ( F ( x ) → F ( y ) ) )` | x=y 说明 F(x) 与 F(y) 不可区分。 | 5 / 5 |
| Ⅲ | `Ⅲ-16` | 谓词替换（反向） | `⊢ ( x = y → ( F ( y ) → F ( x ) ) )` | x=y 也能把 F(y) 换回 F(x)。 | 18 / 24 |
| Ⅲ | `Ⅲ-17` | 全称自反 | `⊢ ∀ x x = x` | ∀x x=x：自反式的全称闭包。 | 2 / 2 |
| Ⅲ | `Ⅲ-18` | 对称的双向结论 | `⊢ ∀ x ∀ y ( x = y → ( x = y ∧ y = x ) )` | x=y 同时给出 y=x 与 x=y 本身。 | 5 / 5 |
| Ⅲ | `Ⅲ-19` | 复合替换 | `⊢ ( x = y → ( ( F ( x ) → G ( x ) ) → ( F ( y ) → G ( y ) ) ) )` | x=y 时 F(x)→G(x) 与 F(y)→G(y) 等价。 | 7 / 8 |
| Ⅲ | `Ⅲ-20` | 否定替换 | `⊢ ( x = y → ( ¬ F ( x ) → ¬ F ( y ) ) )` | x=y 时 ¬F(x) 与 ¬F(y) 等价：从反向替换接逆否，不再直接接 Leibniz。 | 19 / 27 |
| Ⅲ | `Ⅲ-21` | 条件替换 | `⊢ ( x = y → ( ( x = x → F ( x ) ) → ( y = y → F ( y ) ) ) )` | x=y 时 (x=x→F(x)) 与 (y=y→F(y)) 等价：用自反式与前件插入。 | 105 / 303 |
| Ⅲ | `Ⅲ-22` | 不含 x 的公式 | `⊢ ( x = y → ( ∀ z z = z → ∀ z z = z ) )` | 公式里没有占位变元时替换不改变它：用同一律 + A1 插入前件。 | 14 / 18 |
| Ⅲ | `Ⅲ-23` | 谓词替换（双向） | `⊢ ∀ x ∀ y ( x = y → ( F ( x ) ↔ F ( y ) ) )` | ∀x∀y(x=y → (F(x)↔F(y)))：两个方向的替换合起来是等价。 | 20 / 24 |
| Ⅲ | `Ⅲ-24` | 否定复合替换 | `⊢ ( x = y → ( ¬ ( F ( x ) → G ( x ) ) → ¬ ( F ( y ) → G ( y ) ) ) )` | x=y 时 ¬(F(x)→G(x)) 与 ¬(F(y)→G(y)) 等价。 | 8 / 9 |
| Ⅲ | `Ⅲ-25` | 自反条件替换 | `⊢ ( x = y → ( ( F ( x ) → F ( x ) ) → ( F ( y ) → F ( y ) ) ) )` | x=y 时 (F(x)→F(x)) 与 (F(y)→F(y)) 等价：完全是命题演算的组合。 | 21 / 37 |
| Ⅲ | `Ⅲ-26` | 全称辖域（定理） | `⊢ ( ∀ z ( P → Q ) → ( P → ∀ z Q ) )` | ∀z(P→Q)→(P→∀zQ)，由 A5 + 全称引入 + A1/A2 证明，不再是公理。 | 52 / 141 |
| Ⅲ | `Ⅲ-27` | 等词的双向同余 | `⊢ ( x = y → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) )` | x=y 同时给出 ∀z(z∈x→z∈y) 与反向全称蕴涵。 | 38 / 76 |
| Ⅲ | `Ⅲ-28` | 等词给出元素等价 | `⊢ ( x = y → ∀ z ( z ∈ x ↔ z ∈ y ) )` | x=y 推出 ∀z(z∈x↔z∈y)：外延公理的“容易方向”，连接等词与集合论。 | 60 / 141 |
| Ⅲ | `Ⅲ-29` | 传递后的谓词替换 | `⊢ ∀ x ∀ y ∀ z ( x = y → ( y = z → ( F ( x ) → F ( z ) ) ) )` | x=y、y=z 先推出 x=z，再把它用于谓词替换。 | 38 / 73 |
| Ⅲ | `Ⅲ-30` | 复合替换（双向） | `⊢ ∀ x ∀ y ( x = y → ( ( F ( x ) → G ( x ) ) ↔ ( F ( y ) → G ( y ) ) ) )` | x=y 时 F(x)→G(x) 与 F(y)→G(y) 等价。 | 58 / 133 |
| Ⅲ | `Ⅲ-31` | 全称等词替换 | `⊢ ( x = y → ( ∀ z z = x → ∀ z z = y ) )` | x=y → (∀z z=x → ∀z z=y)：替换进入全称内部。 | 69 / 188 |
| Ⅲ | `Ⅲ-32` | 全称等词替换（反向） | `⊢ ( x = y → ( ∀ z z = y → ∀ z z = x ) )` | x=y→(∀z(z=y)→∀z(z=x))。 | 19 / 27 |
| Ⅲ | `Ⅲ-33` | 嵌套全称替换 | `⊢ ( x = y → ( ∀ z x = z → ∀ z y = z ) )` | x=y → (∀z x=z → ∀z y=z)：替换全称式的另一侧。 | 69 / 188 |
| Ⅲ | `Ⅲ-34` | 深层替换（双向） | `⊢ ( x = y → ( ( F ( x ) → ( G ( x ) → F ( x ) ) ) ↔ ( F ( y ) → ( G ( y ) → F ( y ) ) ) ) )` | 深层公式里的 x 也可以双向替换。 | 58 / 131 |
| Ⅳ | i | 外延公理 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → x = y )` | EXT · ∀z(z∈x↔z∈y) ⇒ x=y | 3 / 3 |
| Ⅳ | ii | 空集公理 | `⊢ ∃ z ∀ x ¬ x ∈ z` | ∅ · ∃z∀x ¬(x∈z) | 1 / 1 |
| Ⅳ | iii | 配对公理 | `⊢ ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )` | {,} · ∃u∀z((z=x∨z=y) ↔ z∈u) | 3 / 3 |
| Ⅳ | iv | 并集公理 | `⊢ ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )` | ∪ · ∃y∀z((∃u(z∈u∧u∈x)) ↔ z∈y) | 2 / 2 |
| Ⅳ | `Ⅳ-01` | 引理 · ∀y (x = y→y ∈ x→y ∈  | `⊢ ∀ y ( x = y → ( y ∈ x → y ∈ y ) )` | 第Ⅳ章先证：∀y (x = y→y ∈ x→y ∈ y)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 5 / 7 |
| Ⅳ | `Ⅳ-02` | 引理 · ∀z (z ∈ x↔z ∈ y)→(z  | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( z ∈ x ↔ z ∈ y ) )` | 第Ⅳ章先证：∀z (z ∈ x↔z ∈ y)→(z ∈ x↔z ∈ y)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 7 / 9 |
| Ⅳ | `Ⅳ-03` | 引理 · y = y→y = z→y = y | `⊢ ( y = y → ( y = z → y = y ) )` | 第Ⅳ章先证：y = y→y = z→y = y。先搭最左边的构造块，再沿依赖接到 ⊢。 | 8 / 10 |
| Ⅳ | `Ⅳ-04` | 引理 · ∀z (z ∈ x→z ∈ y)→∀z  | `⊢ ( ∀ z ( z ∈ x → z ∈ y ) → ( ∀ z ( z ∈ y → z ∈ x ) → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ) )` | 第Ⅳ章先证：∀z (z ∈ x→z ∈ y)→∀z (z ∈ y→z ∈ x)→∀z (z ∈ x→z ∈ y)∧∀z (z ∈ y→z ∈ x)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 10 / 13 |
| Ⅳ | `Ⅳ-05` | 引理 · (∀z (z ∈ x↔z ∈ y)→(z | `⊢ ( ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( z ∈ x ↔ z ∈ y ) ) → ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( z ∈ x ↔ z ∈ y ) ) ) )` | 第Ⅳ章先证：(∀z (z ∈ x↔z ∈ y)→(z ∈ x↔z ∈ y))→∀z (z ∈ x↔z ∈ y)→∀z (z ∈ x↔z ∈ y)→(z ∈ x↔z ∈ y)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 12 / 15 |
| Ⅳ | `Ⅳ-06` | 引理 · ∀z (z ∈ x→z ∈ y)∧∀z  | `⊢ ( ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) → ( ∀ z ( z ∈ y ↔ z ∈ x ) → ( ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ∧ ∀ z ( z ∈ y ↔ z ∈ x ) ) ) )` | 第Ⅳ章先证：∀z (z ∈ x→z ∈ y)∧∀z (z ∈ y→z ∈ x)→∀z (z ∈ y↔z ∈ x)→∀z (z ∈ x→z ∈ y)∧∀z (z ∈ y→z ∈ x)∧∀z (z ∈ y↔z ∈ x)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 13 / 18 |
| Ⅳ | `Ⅳ-07` | 引理 · ((x = z→y = z)→(y =  | `⊢ ( ( ( x = z → y = z ) → ( ( y = z → x = z ) → ( x = z ↔ y = z ) ) ) → ( x = y → ( ( x = z → y = z ) → ( ( y = z → x = z ) → ( x = z ↔ y = z ) ) ) ) )` | 第Ⅳ章先证：((x = z→y = z)→(y = z→x = z)→(x = z↔y = z))→x = y→(x = z→y = z)→(y = z→x = z)→(x = z↔y = z)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 15 / 22 |
| Ⅳ | `Ⅳ-08` | 引理 · (∀z (z ∈ x↔z ∈ y)→∀z | `⊢ ( ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y → z ∈ x ) → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ) ) → ( ( ∀ z ( z ∈ x ↔ z ∈ y ) → ∀ z ( z ∈ y → z ∈ x ) ) → ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ) ) )` | 第Ⅳ章先证：(∀z (z ∈ x↔z ∈ y)→∀z (z ∈ y→z ∈ x)→∀z (z ∈ x→z ∈ y)∧∀z (z ∈ y→z ∈ x))→(∀z (z ∈ x↔z ∈ y)→∀z (z ∈ y→z ∈ x))→∀z (z ∈ x↔z ∈ y)→∀z (z ∈ x→z ∈ y)∧∀z (z ∈ y→z ∈ x)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 17 / 23 |
| Ⅳ | `Ⅳ-09` | 引理 · (x = x→x = x∨x = y)→ | `⊢ ( ( x = x → ( x = x ∨ x = y ) ) → ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → ( x = x → ( x = x ∨ x = y ) ) ) )` | 第Ⅳ章先证：(x = x→x = x∨x = y)→∀z (z = x∨z = y↔z ∈ u)→x = x→x = x∨x = y。先搭最左边的构造块，再沿依赖接到 ⊢。 | 18 / 25 |
| Ⅳ | `Ⅳ-10` | 引理 · (∀z (z ∈ x↔z ∈ y)→∀z | `⊢ ( ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ x ) → ( ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ∧ ∀ z ( z ∈ y ↔ z ∈ x ) ) ) ) → ( ( ∀ z ( z ∈ x ↔ z ∈ y ) → ∀ z ( z ∈ y ↔ z ∈ x ) ) → ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ∧ ∀ z ( z ∈ y ↔ z ∈ x ) ) ) ) )` | 第Ⅳ章先证：(∀z (z ∈ x↔z ∈ y)→∀z (z ∈ y↔z ∈ x)→∀z (z ∈ x→z ∈ y)∧∀z (z ∈ y→z ∈ x)∧∀z (z ∈ y↔z ∈ x))→(∀z (z ∈ x↔z ∈ y)→∀z (z ∈ y↔z ∈ x))→∀z (z ∈ x↔z ∈ y)→∀z (z ∈ x→z ∈ y)∧∀z (z ∈ y→z ∈ x)∧∀z (z ∈ y↔z ∈ x)。先搭最左边的构造块，再沿依赖接到 ⊢。 | 20 / 28 |
| Ⅳ | `Ⅳ-11` | 元素等价的对称性 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ∀ z ( z ∈ y ↔ z ∈ x ) )` | ∀z(z∈x↔z∈y) 与 ∀z(z∈y↔z∈x) 等价：先逐点对称，再把 ∀ 提到前件外。 | 36 / 74 |
| Ⅳ | `Ⅳ-12` | 元素等价的两个方向 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) )` | ∀z(z∈x↔z∈y) 可以拆成两条全称蕴涵并合成合取。 | 40 / 75 |
| Ⅳ | `Ⅳ-13` | 元素等价的三重结论 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ∧ ∀ z ( z ∈ y ↔ z ∈ x ) ) )` | 把“两个方向”与“元素等价反向”组合成一个合取结论。 | 29 / 38 |
| Ⅳ | `Ⅳ-14` | 元素等价的逐点传递 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ u ) → ( z ∈ x ↔ z ∈ u ) ) )` | 两个元素等价关系合起来给出逐点等价：∀z(z∈x↔z∈y)、∀z(z∈y↔z∈u) ⇒ z∈x↔z∈u。 | 261 / 820 |
| Ⅳ | `Ⅳ-15` | 元素等价的全称传递 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ u ) → ∀ z ( z ∈ x ↔ z ∈ u ) ) )` | ∀z(z∈x↔z∈y) 与 ∀z(z∈y↔z∈u) 推出 ∀z(z∈x↔z∈u)。 | 33 / 54 |
| Ⅳ | `Ⅳ-16` | 属于替换（反向） | `⊢ ∀ x ∀ y ( x = y → ( y ∈ x → y ∈ y ) )` | x=y 时 y∈x 与 y∈y 不可区分。 | 2 / 2 |
| Ⅳ | `Ⅳ-17` | 空集 | `⊢ ∃ z ∀ x ¬ x ∈ z` | 存在不含任何元素的集合：∃z∀x¬(x∈z)。 | 1 / 1 |
| Ⅳ | `Ⅳ-18` | 外延公理（全称） | `⊢ ∀ x ∀ y ( ∀ z ( z ∈ x ↔ z ∈ y ) → x = y )` | ∀x∀y((∀z(z∈x↔z∈y))→x=y)。 | 5 / 5 |
| Ⅳ | `Ⅳ-19` | 外延的等价刻画 | `⊢ ∀ x ∀ y ( x = y ↔ ∀ z ( z ∈ x ↔ z ∈ y ) )` | x=y 与 ∀z(z∈x↔z∈y) 互相蕴涵：外延公理加上等词→元素等价。 | 15 / 20 |
| Ⅳ | `Ⅳ-20` | 配对公理（全称） | `⊢ ∀ x ∀ y ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )` | ∀x∀y∃u∀z((z=x∨z=y)↔z∈u)。 | 5 / 5 |
| Ⅳ | `Ⅳ-21` | 配对公理（实例） | `⊢ ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )` | ∃u∀z((z=x∨z=y)↔z∈u)。 | 3 / 3 |
| Ⅳ | `Ⅳ-22` | 并集公理（全称） | `⊢ ∀ x ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )` | ∀x∃y∀z((∃u(z∈u∧u∈x))↔z∈y)。 | 3 / 3 |
| Ⅳ | `Ⅳ-23` | 并集公理（实例） | `⊢ ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )` | ∃y∀z((∃u(z∈u∧u∈x))↔z∈y)。 | 2 / 2 |
| Ⅳ | `Ⅳ-24` | 等词的双向同余 | `⊢ ∀ x ∀ y ( x = y → ( x = z ↔ y = z ) )` | x=y 使 x=z 与 y=z 等价：两个 Leibniz 方向 + 对称性。 | 27 / 46 |
| Ⅳ | `Ⅳ-25` | 等词进入属于（全称） | `⊢ ∀ y ∀ z ( y = z → ( x ∈ y → x ∈ z ) )` | ∀y∀z(y=z→(x∈y→x∈z))。 | 7 / 8 |
| Ⅳ | `Ⅳ-26` | 等词进入属于（反向） | `⊢ ∀ y ∀ z ( y = z → ( y ∈ x → z ∈ x ) )` | ∀y∀z(y=z→(y∈x→z∈x))。 | 7 / 8 |
| Ⅳ | `Ⅳ-27` | 外延（y,z） | `⊢ ∀ y ∀ z ( ∀ x ( x ∈ y ↔ x ∈ z ) → y = z )` | ∀y∀z((∀x(x∈y↔x∈z))→y=z)。 | 5 / 5 |
| Ⅳ | `Ⅳ-28` | 配对（y,x） | `⊢ ∀ y ∀ x ∃ u ∀ z ( ( z = y ∨ z = x ) ↔ z ∈ u )` | ∀y∀x∃u∀z((z=y∨z=x)↔z∈u)。 | 5 / 5 |
| Ⅳ | `Ⅳ-29` | 并集（y） | `⊢ ∀ y ∃ u ∀ z ( ∃ v ( z ∈ v ∧ v ∈ y ) ↔ z ∈ u )` | ∀y∃u∀z((∃v(z∈v∧v∈y))↔z∈u)。 | 3 / 3 |
| Ⅳ | `Ⅳ-30` | 属于替换的双向版 | `⊢ ∀ x ∀ y ∀ z ( x = y → ( x ∈ z ↔ y ∈ z ) )` | x=y 使 x∈z 与 y∈z 等价：Leibniz 两个方向合成 ↔。 | 56 / 133 |
| Ⅳ | `Ⅳ-31` | 三层等词链（双向） | `⊢ ∀ y ∀ z ∀ x ( y = z → ( x ∈ y ↔ x ∈ z ) )` | y=z 使 x∈y 与 x∈z 等价：先例化 *56 取得 z=y，再走两个 Leibniz 方向。 | 63 / 151 |
| Ⅳ | `Ⅳ-32` | 配对集含左元 | `⊢ ∀ x ∀ y ∃ u x ∈ u` | 配对公理保证 x 属于某个集合：∀x∀y∃u(x∈u)。 | 53 / 108 |
| Ⅳ | `Ⅳ-33` | 配对集含右元 | `⊢ ∀ x ∀ y ∃ u y ∈ u` | 配对集同样含 y：∀x∀y∃u(y∈u)。 | 54 / 115 |
| Ⅳ | `Ⅳ-34` | 综合：配对给出公共容器 | `⊢ ∀ x ∀ y ∃ u ( x ∈ u ∧ y ∈ u )` | 任意两个集合同属某个集合：∀x∀y∃u(x∈u ∧ y∈u)。 | 92 / 221 |

## Ⅰ 章

### i · 公理 A1

- 目标：`⊢ ( P → ( Q → P ) )`
- 提示：A1 · P → (Q → P)
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

### ii · 公理 A2

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( ( P → Q ) → ( P → R ) ) )`
- 提示：A2 · (P→(Q→R)) → ((P→Q)→(P→R))
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

### iii · 公理 A3

- 目标：`⊢ ( ( ¬ P → ¬ Q ) → ( Q → P ) )`
- 提示：A3 · (¬P→¬Q) → (Q→P)
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

### iv · 代入

- 目标：`⊢ ( Q → ( R → Q ) )`
- 提示：S · A[P↦B] ⇒ A′
- 参考解：5 个模块 / 6 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n6  [target]
n1  axiom A1
n2  subst(groups=1)
n3  atom P
n4  atom Q
n5  atom R

接线：
n1.out → n2.assertion
n3.out → n2.atom1
n4.out → n2.formula1
n4.out → n2.atom2
n5.out → n2.formula2
n2.out → n6.proof
```

</details>

### v · 分离

- 目标：`⊢ ( ( P → Q ) → ( P → P ) )`
- 提示：M · A · A→B ⇒ B
- 参考解：6 个模块 / 6 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n7  [target]
n1  mp
n2  axiom A1
n3  axiom A2
n4  subst(groups=0)
n5  atom R
n6  atom P

接线：
n3.out → n4.assertion
n5.out → n4.atom1
n6.out → n4.formula1
n2.out → n1.a
n4.out → n1.b
n1.out → n7.proof
```

</details>

### Ⅰ-01 · 引理 · P→(P→P)→P

- 目标：`⊢ ( P → ( ( P → P ) → P ) )`
- 提示：第Ⅰ章先证：P→(P→P)→P。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：5 个模块 / 6 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=0)
n2  axiom A1
n3  atom Q
n4  imp
n5  atom P

接线：
n2.out → n1.assertion
n5.out → n4.a
n5.out → n4.b
n3.out → n1.atom1
n4.out → n1.formula1
n1.out → nt.proof
```

</details>

### Ⅰ-02 · 引理 · (P→Q)→(Q→R)→P→Q

- 目标：`⊢ ( ( P → Q ) → ( ( Q → R ) → ( P → Q ) ) )`
- 提示：第Ⅰ章先证：(P→Q)→(Q→R)→P→Q。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：7 个模块 / 10 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=1)
n2  axiom A1
n3  atom P
n4  imp
n5  atom Q
n6  imp
n7  atom R

接线：
n3.out → n4.a
n5.out → n4.b
n2.out → n1.assertion
n3.out → n1.atom1
n4.out → n1.formula1
n5.out → n6.a
n7.out → n6.b
n5.out → n1.atom2
n6.out → n1.formula2
n1.out → nt.proof
```

</details>

### Ⅰ-03 · 引理 · (((P→Q)→P)→(P→Q)→Q)→

- 目标：`⊢ ( ( ( ( P → Q ) → P ) → ( ( P → Q ) → Q ) ) → ( P → ( ( ( P → Q ) → P ) → ( ( P → Q ) → Q ) ) ) )`
- 提示：第Ⅰ章先证：(((P→Q)→P)→(P→Q)→Q)→P→((P→Q)→P)→(P→Q)→Q。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：8 个模块 / 14 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=1)
n2  axiom A1
n3  atom P
n4  imp
n5  atom Q
n6  imp
n7  imp
n8  imp

接线：
n3.out → n8.a
n5.out → n8.b
n8.out → n6.a
n3.out → n6.b
n2.out → n1.assertion
n8.out → n7.a
n5.out → n7.b
n6.out → n4.a
n7.out → n4.b
n3.out → n1.atom1
n4.out → n1.formula1
n5.out → n1.atom2
n3.out → n1.formula2
n1.out → nt.proof
```

</details>

### Ⅰ-04 · 引理 · ((P→Q)→(R→P→Q)→(R→P)

- 目标：`⊢ ( ( ( P → Q ) → ( ( R → ( P → Q ) ) → ( ( R → P ) → ( R → Q ) ) ) ) → ( ( ( P → Q ) → ( R → ( P → Q ) ) ) → ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) ) ) )`
- 提示：第Ⅰ章先证：((P→Q)→(R→P→Q)→(R→P)→R→Q)→((P→Q)→R→P→Q)→(P→Q)→(R→P)→R→Q。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：10 个模块 / 18 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=2)
n2  axiom A2
n3  atom P
n4  imp
n5  atom Q
n6  imp
n7  atom R
n8  imp
n9  imp
n10  imp

接线：
n3.out → n4.a
n5.out → n4.b
n7.out → n6.a
n4.out → n6.b
n7.out → n9.a
n3.out → n9.b
n7.out → n10.a
n5.out → n10.b
n9.out → n8.a
n10.out → n8.b
n2.out → n1.assertion
n3.out → n1.atom1
n4.out → n1.formula1
n5.out → n1.atom2
n6.out → n1.formula2
n7.out → n1.atom3
n8.out → n1.formula3
n1.out → nt.proof
```

</details>

### Ⅰ-05 · 引理 · ((P→Q→R)→(Q→(Q→R)→R)

- 目标：`⊢ ( ( ( P → ( Q → R ) ) → ( ( Q → ( ( Q → R ) → R ) ) → ( Q → ( ( P → ( Q → R ) ) → ( P → R ) ) ) ) ) → ( ( ( P → ( Q → R ) ) → ( Q → ( ( Q → R ) → R ) ) ) → ( ( P → ( Q → R ) ) → ( Q → ( ( P → ( Q → R ) ) → ( P → R ) ) ) ) ) )`
- 提示：第Ⅰ章先证：((P→Q→R)→(Q→(Q→R)→R)→Q→(P→Q→R)→P→R)→((P→Q→R)→Q→(Q→R)→R)→(P→Q→R)→Q→(P→Q→R)→P→R。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：12 个模块 / 22 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=2)
n2  axiom A2
n3  atom P
n4  imp
n5  atom Q
n6  imp
n7  atom R
n8  imp
n9  imp
n10  imp
n11  imp
n12  imp

接线：
n5.out → n12.a
n7.out → n12.b
n3.out → n4.a
n12.out → n4.b
n12.out → n11.a
n7.out → n11.b
n5.out → n6.a
n11.out → n6.b
n3.out → n10.a
n7.out → n10.b
n4.out → n9.a
n10.out → n9.b
n5.out → n8.a
n9.out → n8.b
n2.out → n1.assertion
n3.out → n1.atom1
n4.out → n1.formula1
n5.out → n1.atom2
n6.out → n1.formula2
n7.out → n1.atom3
n8.out → n1.formula3
n1.out → nt.proof
```

</details>

### Ⅰ-06 · 引理 · ((Q→(Q→R)→R)→Q→(P→Q→

- 目标：`⊢ ( ( ( Q → ( ( Q → R ) → R ) ) → ( Q → ( ( P → ( Q → R ) ) → ( P → R ) ) ) ) → ( ( P → ( Q → R ) ) → ( ( Q → ( ( Q → R ) → R ) ) → ( Q → ( ( P → ( Q → R ) ) → ( P → R ) ) ) ) ) )`
- 提示：第Ⅰ章先证：((Q→(Q→R)→R)→Q→(P→Q→R)→P→R)→(P→Q→R)→(Q→(Q→R)→R)→Q→(P→Q→R)→P→R。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：13 个模块 / 22 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=1)
n2  axiom A1
n3  atom P
n4  imp
n5  atom Q
n6  imp
n7  imp
n8  atom R
n9  imp
n10  imp
n11  imp
n12  imp
n13  imp

接线：
n5.out → n7.a
n8.out → n7.b
n3.out → n6.a
n7.out → n6.b
n7.out → n13.a
n8.out → n13.b
n5.out → n9.a
n13.out → n9.b
n3.out → n12.a
n8.out → n12.b
n6.out → n11.a
n12.out → n11.b
n2.out → n1.assertion
n5.out → n10.a
n11.out → n10.b
n9.out → n4.a
n10.out → n4.b
n3.out → n1.atom1
n4.out → n1.formula1
n5.out → n1.atom2
n6.out → n1.formula2
n1.out → nt.proof
```

</details>

### Ⅰ-07 · 引理 · (P→Q)→(R→P→Q)→(R→P)→

- 目标：`⊢ ( ( P → Q ) → ( ( R → ( P → Q ) ) → ( ( R → P ) → ( R → Q ) ) ) )`
- 提示：第Ⅰ章先证：(P→Q)→(R→P→Q)→(R→P)→R→Q。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：14 个模块 / 27 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  subst(groups=2)
n3  subst(groups=1)
n4  axiom A1
n5  atom P
n6  imp
n7  atom Q
n8  imp
n9  imp
n10  imp
n11  imp
n12  imp
n13  atom R
n14  axiom A2

接线：
n5.out → n8.a
n7.out → n8.b
n13.out → n9.a
n8.out → n9.b
n14.out → n2.assertion
n5.out → n2.atom1
n13.out → n2.formula1
n7.out → n2.atom2
n5.out → n2.formula2
n13.out → n2.atom3
n7.out → n2.formula3
n4.out → n3.assertion
n13.out → n11.a
n5.out → n11.b
n13.out → n12.a
n7.out → n12.b
n11.out → n10.a
n12.out → n10.b
n9.out → n6.a
n10.out → n6.b
n5.out → n3.atom1
n6.out → n3.formula1
n7.out → n3.atom2
n8.out → n3.formula2
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-08 · 引理 · ((P→Q)→R→P→Q)→(P→Q)→

- 目标：`⊢ ( ( ( P → Q ) → ( R → ( P → Q ) ) ) → ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) ) )`
- 提示：第Ⅰ章先证：((P→Q)→R→P→Q)→(P→Q)→(R→P)→R→Q。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：16 个模块 / 36 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  subst(groups=2)
n4  axiom A2
n5  atom P
n6  imp
n7  atom Q
n8  imp
n9  atom R
n10  imp
n11  imp
n12  imp
n13  subst(groups=2)
n14  subst(groups=1)
n15  axiom A1
n16  imp

接线：
n5.out → n6.a
n7.out → n6.b
n9.out → n8.a
n6.out → n8.b
n4.out → n13.assertion
n5.out → n13.atom1
n9.out → n13.formula1
n7.out → n13.atom2
n5.out → n13.formula2
n9.out → n13.atom3
n7.out → n13.formula3
n15.out → n14.assertion
n9.out → n11.a
n5.out → n11.b
n9.out → n12.a
n7.out → n12.b
n11.out → n10.a
n12.out → n10.b
n8.out → n16.a
n10.out → n16.b
n5.out → n14.atom1
n16.out → n14.formula1
n7.out → n14.atom2
n6.out → n14.formula2
n13.out → n2.a
n14.out → n2.b
n4.out → n3.assertion
n5.out → n3.atom1
n6.out → n3.formula1
n7.out → n3.atom2
n8.out → n3.formula2
n9.out → n3.atom3
n10.out → n3.formula3
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-09 · 引理 · (¬P→¬Q→¬P)→¬P→P→Q

- 目标：`⊢ ( ( ¬ P → ( ¬ Q → ¬ P ) ) → ( ¬ P → ( P → Q ) ) )`
- 提示：第Ⅰ章先证：(¬P→¬Q→¬P)→¬P→P→Q。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：16 个模块 / 30 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  subst(groups=2)
n4  axiom A2
n5  atom P
n6  not
n7  atom Q
n8  imp
n9  atom R
n10  imp
n11  not
n12  subst(groups=1)
n13  subst(groups=1)
n14  axiom A1
n15  imp
n16  axiom A3

接线：
n5.out → n6.a
n7.out → n11.a
n11.out → n8.a
n6.out → n8.b
n16.out → n12.assertion
n5.out → n12.atom1
n7.out → n12.formula1
n7.out → n12.atom2
n5.out → n12.formula2
n14.out → n13.assertion
n5.out → n10.a
n7.out → n10.b
n8.out → n15.a
n10.out → n15.b
n5.out → n13.atom1
n15.out → n13.formula1
n7.out → n13.atom2
n6.out → n13.formula2
n12.out → n2.a
n13.out → n2.b
n4.out → n3.assertion
n5.out → n3.atom1
n6.out → n3.formula1
n7.out → n3.atom2
n8.out → n3.formula2
n9.out → n3.atom3
n10.out → n3.formula3
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-10 · 引理 · ((¬P→P)→¬P→¬(¬P→P))→

- 目标：`⊢ ( ( ( ¬ P → P ) → ( ¬ P → ¬ ( ¬ P → P ) ) ) → ( ( ¬ P → P ) → ( ( ¬ P → P ) → P ) ) )`
- 提示：第Ⅰ章先证：((¬P→P)→¬P→¬(¬P→P))→(¬P→P)→(¬P→P)→P。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：17 个模块 / 30 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  subst(groups=2)
n4  axiom A2
n5  atom P
n6  imp
n7  atom Q
n8  imp
n9  atom R
n10  imp
n11  not
n12  not
n13  subst(groups=0)
n14  subst(groups=1)
n15  axiom A1
n16  imp
n17  axiom A3

接线：
n5.out → n11.a
n11.out → n6.a
n5.out → n6.b
n6.out → n12.a
n11.out → n8.a
n12.out → n8.b
n17.out → n13.assertion
n7.out → n13.atom1
n6.out → n13.formula1
n15.out → n14.assertion
n6.out → n10.a
n5.out → n10.b
n8.out → n16.a
n10.out → n16.b
n5.out → n14.atom1
n16.out → n14.formula1
n7.out → n14.atom2
n6.out → n14.formula2
n13.out → n2.a
n14.out → n2.b
n4.out → n3.assertion
n5.out → n3.atom1
n6.out → n3.formula1
n7.out → n3.atom2
n8.out → n3.formula2
n9.out → n3.atom3
n10.out → n3.formula3
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-11 · 同一律

- 目标：`⊢ ( P → P )`
- 提示：任何命题都推出自己：A→A。
- 参考解：11 个模块 / 15 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  axiom A1
n3  subst(groups=0)
n4  atom Q
n5  atom P
n6  mp
n8  定理 *undefined
n9  imp
n10  axiom A2
n11  subst(groups=1)
n12  atom R

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n3.formula1
n5.out → n9.a
n5.out → n9.b
n10.out → n11.assertion
n4.out → n11.atom1
n9.out → n11.formula1
n12.out → n11.atom2
n5.out → n11.formula2
n8.out → n6.a
n11.out → n6.b
n3.out → n1.a
n6.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-12 · 后件自反

- 目标：`⊢ ( P → ( Q → Q ) )`
- 提示：前件无关时，后件仍然自反：A→(B→B)。
- 参考解：8 个模块 / 13 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  定理 *undefined
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
n1.out → nt.proof
```

</details>

### Ⅰ-13 · 回指前件

- 目标：`⊢ ( P → ( ( P → Q ) → Q ) )`
- 提示：A 可以推出“若 A 则 B”的后件 B。
- 参考解：18 个模块 / 33 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n3  定理 *undefined
n6  axiom A1
n7  subst(groups=0)
n8  atom Q
n9  atom P
n10  imp
n13  imp
n15  axiom A2
n17  atom R
n18  mp
n19  mp
n20  mp
n22  subst(groups=0)
n24  subst(groups=2)
n26  定理 *undefined
n27  imp
n30  subst(groups=1)

接线：
n6.out → n7.assertion
n9.out → n10.a
n8.out → n10.b
n8.out → n7.atom1
n10.out → n7.formula1
n10.out → n13.a
n9.out → n13.b
n3.out → n22.assertion
n9.out → n22.atom1
n10.out → n22.formula1
n15.out → n24.assertion
n9.out → n24.atom1
n10.out → n24.formula1
n8.out → n24.atom2
n9.out → n24.formula2
n17.out → n24.atom3
n8.out → n24.formula3
n22.out → n20.a
n24.out → n20.b
n10.out → n27.a
n8.out → n27.b
n20.out → n19.a
n26.out → n19.b
n15.out → n30.assertion
n8.out → n30.atom1
n13.out → n30.formula1
n17.out → n30.atom2
n27.out → n30.formula2
n19.out → n18.a
n30.out → n18.b
n7.out → n1.a
n18.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-14 · 后件强化

- 目标：`⊢ ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) )`
- 提示：若 A→B，则任意 C 也能走到 C→B。
- 参考解：8 个模块 / 10 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n5  atom P
n6  atom Q
n7  imp
n10  axiom A1
n11  subst(groups=1)
n12  atom R
n19  定理 *undefined

接线：
n5.out → n7.a
n6.out → n7.b
n10.out → n11.assertion
n5.out → n11.atom1
n7.out → n11.formula1
n6.out → n11.atom2
n12.out → n11.formula2
n11.out → n1.a
n19.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-15 · 前件弱化

- 目标：`⊢ ( ( P → Q ) → ( ( Q → R ) → ( P → R ) ) )`
- 提示：若 A→B，则 (B→C)→(A→C)。
- 参考解：55 个模块 / 157 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n5  atom P
n6  atom Q
n7  imp
n10  axiom A1
n11  定理 *undefined
n12  atom R
n13  imp
n16  imp
n18  axiom A2
n20  mp
n21  mp
n22  mp
n23  mp
n24  mp
n25  定理 *undefined
n26  subst(groups=1)
n27  mp
n28  mp
n30  subst(groups=0)
n31  imp
n33  subst(groups=1)
n34  imp
n35  imp
n37  subst(groups=2)
n38  mp
n39  mp
n41  subst(groups=1)
n43  subst(groups=1)
n44  imp
n45  imp
n47  subst(groups=2)
n48  mp
n49  mp
n50  mp
n51  mp
n52  定理 *undefined
n53  subst(groups=2)
n55  subst(groups=1)
n56  imp
n57  imp
n58  imp
n60  subst(groups=2)
n62  subst(groups=1)
n63  imp
n65  subst(groups=2)
n66  mp
n67  mp
n69  subst(groups=2)
n71  subst(groups=1)
n72  imp
n73  imp
n74  imp
n76  subst(groups=2)
n78  subst(groups=2)

接线：
n5.out → n7.a
n6.out → n7.b
n6.out → n13.a
n12.out → n13.b
n13.out → n16.a
n7.out → n16.b
n25.out → n26.assertion
n5.out → n26.atom1
n7.out → n26.formula1
n6.out → n26.atom2
n12.out → n26.formula2
n10.out → n30.assertion
n12.out → n31.a
n12.out → n31.b
n5.out → n30.atom1
n31.out → n30.formula1
n10.out → n33.assertion
n6.out → n34.a
n31.out → n34.b
n31.out → n35.a
n34.out → n35.b
n5.out → n33.atom1
n35.out → n33.formula1
n6.out → n33.atom2
n7.out → n33.formula2
n30.out → n28.a
n33.out → n28.b
n18.out → n37.assertion
n5.out → n37.atom1
n7.out → n37.formula1
n6.out → n37.atom2
n31.out → n37.formula2
n12.out → n37.atom3
n34.out → n37.formula3
n28.out → n27.a
n37.out → n27.b
n26.out → n24.a
n27.out → n24.b
n18.out → n41.assertion
n5.out → n41.atom1
n6.out → n41.formula1
n6.out → n41.atom2
n12.out → n41.formula2
n10.out → n43.assertion
n13.out → n44.a
n13.out → n44.b
n34.out → n45.a
n44.out → n45.b
n5.out → n43.atom1
n45.out → n43.formula1
n6.out → n43.atom2
n7.out → n43.formula2
n41.out → n39.a
n43.out → n39.b
n18.out → n47.assertion
n5.out → n47.atom1
n7.out → n47.formula1
n6.out → n47.atom2
n34.out → n47.formula2
n12.out → n47.atom3
n44.out → n47.formula3
n39.out → n38.a
n47.out → n38.b
n24.out → n23.a
n38.out → n23.b
n52.out → n53.assertion
n5.out → n53.atom1
n6.out → n53.formula1
n6.out → n53.atom2
n12.out → n53.formula2
n12.out → n53.atom3
n5.out → n53.formula3
n10.out → n55.assertion
n5.out → n56.a
n12.out → n56.b
n7.out → n57.a
n56.out → n57.b
n13.out → n58.a
n57.out → n58.b
n5.out → n55.atom1
n58.out → n55.formula1
n6.out → n55.atom2
n13.out → n55.formula2
n53.out → n51.a
n55.out → n51.b
n18.out → n60.assertion
n5.out → n60.atom1
n13.out → n60.formula1
n6.out → n60.atom2
n13.out → n60.formula2
n12.out → n60.atom3
n57.out → n60.formula3
n51.out → n50.a
n60.out → n50.b
n10.out → n62.assertion
n44.out → n63.a
n58.out → n63.b
n5.out → n62.atom1
n63.out → n62.formula1
n6.out → n62.atom2
n7.out → n62.formula2
n50.out → n49.a
n62.out → n49.b
n18.out → n65.assertion
n5.out → n65.atom1
n7.out → n65.formula1
n6.out → n65.atom2
n44.out → n65.formula2
n12.out → n65.atom3
n58.out → n65.formula3
n49.out → n48.a
n65.out → n48.b
n23.out → n22.a
n48.out → n22.b
n18.out → n69.assertion
n5.out → n69.atom1
n13.out → n69.formula1
n6.out → n69.atom2
n7.out → n69.formula2
n12.out → n69.atom3
n56.out → n69.formula3
n10.out → n71.assertion
n13.out → n72.a
n56.out → n72.b
n16.out → n73.a
n72.out → n73.b
n58.out → n74.a
n73.out → n74.b
n5.out → n71.atom1
n74.out → n71.formula1
n6.out → n71.atom2
n7.out → n71.formula2
n69.out → n67.a
n71.out → n67.b
n18.out → n76.assertion
n5.out → n76.atom1
n7.out → n76.formula1
n6.out → n76.atom2
n58.out → n76.formula2
n12.out → n76.atom3
n73.out → n76.formula3
n67.out → n66.a
n76.out → n66.b
n22.out → n21.a
n66.out → n21.b
n18.out → n78.assertion
n5.out → n78.atom1
n7.out → n78.formula1
n6.out → n78.atom2
n16.out → n78.formula2
n12.out → n78.atom3
n72.out → n78.formula3
n21.out → n20.a
n78.out → n20.b
n11.out → n1.a
n20.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-16 · 否定的蕴涵

- 目标：`⊢ ( ¬ ( P → Q ) → ( P → ¬ Q ) )`
- 提示：¬(A→B) → (A→¬B)：否定一个蕴涵可以得到后件的否定。
- 参考解：179 个模块 / 553 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  定理 *undefined
n4  subst(groups=0)
n5  atom P
n6  atom Q
n7  imp
n8  not
n9  mp
n10  mp
n11  mp
n15  axiom A1
n16  subst(groups=1)
n17  not
n18  not
n21  imp
n23  axiom A2
n25  atom R
n26  mp
n27  mp
n28  mp
n29  mp
n30  mp
n31  mp
n32  mp
n39  subst(groups=1)
n42  imp
n46  mp
n47  mp
n48  axiom A3
n49  subst(groups=1)
n51  subst(groups=1)
n52  imp
n53  imp
n55  subst(groups=2)
n56  mp
n57  mp
n58  mp
n60  subst(groups=0)
n61  mp
n62  mp
n66  mp
n67  mp
n74  subst(groups=1)
n75  not
n76  not
n79  imp
n83  mp
n84  mp
n86  subst(groups=0)
n88  subst(groups=1)
n89  imp
n90  imp
n92  subst(groups=2)
n94  subst(groups=1)
n97  imp
n101  mp
n102  mp
n104  subst(groups=1)
n106  subst(groups=1)
n107  imp
n108  imp
n110  subst(groups=2)
n112  subst(groups=2)
n114  subst(groups=1)
n116  subst(groups=2)
n117  mp
n118  mp
n120  subst(groups=1)
n122  subst(groups=1)
n123  imp
n124  imp
n126  subst(groups=1)
n127  mp
n128  mp
n129  mp
n130  mp
n131  mp
n133  subst(groups=1)
n134  mp
n135  mp
n136  mp
n143  subst(groups=1)
n144  not
n145  not
n148  imp
n152  mp
n153  mp
n154  mp
n156  mp
n157  mp
n158  mp
n165  subst(groups=1)
n168  imp
n172  mp
n173  mp
n175  subst(groups=1)
n177  subst(groups=1)
n178  imp
n179  imp
n181  subst(groups=2)
n182  mp
n183  mp
n184  mp
n186  subst(groups=0)
n187  mp
n188  mp
n192  mp
n193  mp
n200  subst(groups=1)
n201  not
n202  not
n205  imp
n209  mp
n210  mp
n212  subst(groups=1)
n214  subst(groups=1)
n215  imp
n216  imp
n218  subst(groups=2)
n220  subst(groups=2)
n223  imp
n227  mp
n228  mp
n230  subst(groups=1)
n232  subst(groups=1)
n233  imp
n234  imp
n236  subst(groups=2)
n238  subst(groups=2)
n240  subst(groups=1)
n242  subst(groups=2)
n243  mp
n244  mp
n246  subst(groups=0)
n248  subst(groups=1)
n249  imp
n250  imp
n252  subst(groups=2)
n268  subst(groups=1)
n270  subst(groups=0)
n271  imp
n272  imp
n274  subst(groups=2)
n275  mp
n276  mp
n278  subst(groups=1)
n280  subst(groups=0)
n281  imp
n282  imp
n284  subst(groups=2)
n286  subst(groups=2)
n288  subst(groups=1)
n289  imp
n291  subst(groups=1)
n293  subst(groups=1)
n294  imp
n295  imp
n297  subst(groups=2)
n299  subst(groups=2)
n301  subst(groups=1)
n302  imp
n303  imp
n305  subst(groups=2)
n306  mp
n307  mp
n309  subst(groups=1)
n311  subst(groups=1)
n312  imp
n313  imp
n315  subst(groups=2)
n317  subst(groups=2)
n318  mp
n319  mp
n321  subst(groups=1)
n323  subst(groups=1)
n324  imp
n325  imp
n327  subst(groups=2)

接线：
n3.out → n4.assertion
n5.out → n7.a
n6.out → n7.b
n7.out → n8.a
n5.out → n4.atom1
n8.out → n4.formula1
n15.out → n16.assertion
n5.out → n16.atom1
n8.out → n16.formula1
n6.out → n17.a
n17.out → n18.a
n6.out → n16.atom2
n18.out → n16.formula2
n18.out → n21.a
n8.out → n21.b
n15.out → n39.assertion
n5.out → n39.atom1
n18.out → n39.formula1
n6.out → n39.atom2
n17.out → n39.formula2
n17.out → n42.a
n18.out → n42.b
n48.out → n49.assertion
n5.out → n49.atom1
n6.out → n49.formula1
n6.out → n49.atom2
n17.out → n49.formula2
n15.out → n51.assertion
n17.out → n52.a
n6.out → n52.b
n42.out → n53.a
n52.out → n53.b
n5.out → n51.atom1
n53.out → n51.formula1
n6.out → n51.atom2
n18.out → n51.formula2
n49.out → n47.a
n51.out → n47.b
n23.out → n55.assertion
n5.out → n55.atom1
n18.out → n55.formula1
n6.out → n55.atom2
n42.out → n55.formula2
n25.out → n55.atom3
n52.out → n55.formula3
n47.out → n46.a
n55.out → n46.b
n39.out → n32.a
n46.out → n32.b
n3.out → n60.assertion
n5.out → n60.atom1
n52.out → n60.formula1
n15.out → n74.assertion
n5.out → n74.atom1
n17.out → n74.formula1
n52.out → n75.a
n75.out → n76.a
n6.out → n74.atom2
n76.out → n74.formula2
n76.out → n79.a
n17.out → n79.b
n48.out → n86.assertion
n5.out → n86.atom1
n75.out → n86.formula1
n15.out → n88.assertion
n6.out → n89.a
n75.out → n89.b
n79.out → n90.a
n89.out → n90.b
n5.out → n88.atom1
n90.out → n88.formula1
n6.out → n88.atom2
n17.out → n88.formula2
n86.out → n84.a
n88.out → n84.b
n23.out → n92.assertion
n5.out → n92.atom1
n17.out → n92.formula1
n6.out → n92.atom2
n79.out → n92.formula2
n25.out → n92.atom3
n89.out → n92.formula3
n84.out → n83.a
n92.out → n83.b
n74.out → n67.a
n83.out → n67.b
n23.out → n94.assertion
n5.out → n94.atom1
n17.out → n94.formula1
n25.out → n94.atom2
n75.out → n94.formula2
n67.out → n66.a
n94.out → n66.b
n17.out → n97.a
n75.out → n97.b
n48.out → n104.assertion
n5.out → n104.atom1
n6.out → n104.formula1
n6.out → n104.atom2
n52.out → n104.formula2
n15.out → n106.assertion
n52.out → n107.a
n6.out → n107.b
n97.out → n108.a
n107.out → n108.b
n5.out → n106.atom1
n108.out → n106.formula1
n6.out → n106.atom2
n52.out → n106.formula2
n104.out → n102.a
n106.out → n102.b
n23.out → n110.assertion
n5.out → n110.atom1
n52.out → n110.formula1
n6.out → n110.atom2
n97.out → n110.formula2
n25.out → n110.atom3
n107.out → n110.formula3
n102.out → n101.a
n110.out → n101.b
n66.out → n62.a
n101.out → n62.b
n23.out → n112.assertion
n5.out → n112.atom1
n52.out → n112.formula1
n6.out → n112.atom2
n52.out → n112.formula2
n25.out → n112.atom3
n6.out → n112.formula3
n62.out → n61.a
n112.out → n61.b
n60.out → n58.a
n61.out → n58.b
n15.out → n114.assertion
n5.out → n114.atom1
n107.out → n114.formula1
n6.out → n114.atom2
n18.out → n114.formula2
n58.out → n57.a
n114.out → n57.b
n23.out → n116.assertion
n5.out → n116.atom1
n18.out → n116.formula1
n6.out → n116.atom2
n52.out → n116.formula2
n25.out → n116.atom3
n6.out → n116.formula3
n57.out → n56.a
n116.out → n56.b
n32.out → n31.a
n56.out → n31.b
n15.out → n120.assertion
n5.out → n120.atom1
n6.out → n120.formula1
n6.out → n120.atom2
n8.out → n120.formula2
n15.out → n122.assertion
n8.out → n123.a
n6.out → n123.b
n6.out → n124.a
n123.out → n124.b
n5.out → n122.atom1
n124.out → n122.formula1
n6.out → n122.atom2
n18.out → n122.formula2
n120.out → n118.a
n122.out → n118.b
n23.out → n126.assertion
n5.out → n126.atom1
n18.out → n126.formula1
n25.out → n126.atom2
n123.out → n126.formula2
n118.out → n117.a
n126.out → n117.b
n31.out → n30.a
n117.out → n30.b
n15.out → n133.assertion
n5.out → n133.atom1
n6.out → n133.formula1
n6.out → n133.atom2
n5.out → n133.formula2
n15.out → n143.assertion
n5.out → n143.atom1
n6.out → n143.formula1
n8.out → n144.a
n144.out → n145.a
n6.out → n143.atom2
n145.out → n143.formula2
n145.out → n148.a
n6.out → n148.b
n15.out → n165.assertion
n5.out → n165.atom1
n145.out → n165.formula1
n6.out → n165.atom2
n144.out → n165.formula2
n144.out → n168.a
n145.out → n168.b
n48.out → n175.assertion
n5.out → n175.atom1
n8.out → n175.formula1
n6.out → n175.atom2
n144.out → n175.formula2
n15.out → n177.assertion
n144.out → n178.a
n8.out → n178.b
n168.out → n179.a
n178.out → n179.b
n5.out → n177.atom1
n179.out → n177.formula1
n6.out → n177.atom2
n145.out → n177.formula2
n175.out → n173.a
n177.out → n173.b
n23.out → n181.assertion
n5.out → n181.atom1
n145.out → n181.formula1
n6.out → n181.atom2
n168.out → n181.formula2
n25.out → n181.atom3
n178.out → n181.formula3
n173.out → n172.a
n181.out → n172.b
n165.out → n158.a
n172.out → n158.b
n3.out → n186.assertion
n5.out → n186.atom1
n178.out → n186.formula1
n15.out → n200.assertion
n5.out → n200.atom1
n144.out → n200.formula1
n178.out → n201.a
n201.out → n202.a
n6.out → n200.atom2
n202.out → n200.formula2
n202.out → n205.a
n144.out → n205.b
n48.out → n212.assertion
n5.out → n212.atom1
n201.out → n212.formula1
n6.out → n212.atom2
n8.out → n212.formula2
n15.out → n214.assertion
n8.out → n215.a
n201.out → n215.b
n205.out → n216.a
n215.out → n216.b
n5.out → n214.atom1
n216.out → n214.formula1
n6.out → n214.atom2
n144.out → n214.formula2
n212.out → n210.a
n214.out → n210.b
n23.out → n218.assertion
n5.out → n218.atom1
n144.out → n218.formula1
n6.out → n218.atom2
n205.out → n218.formula2
n25.out → n218.atom3
n215.out → n218.formula3
n210.out → n209.a
n218.out → n209.b
n200.out → n193.a
n209.out → n193.b
n23.out → n220.assertion
n5.out → n220.atom1
n144.out → n220.formula1
n6.out → n220.atom2
n8.out → n220.formula2
n25.out → n220.atom3
n201.out → n220.formula3
n193.out → n192.a
n220.out → n192.b
n144.out → n223.a
n201.out → n223.b
n48.out → n230.assertion
n5.out → n230.atom1
n8.out → n230.formula1
n6.out → n230.atom2
n178.out → n230.formula2
n15.out → n232.assertion
n178.out → n233.a
n8.out → n233.b
n223.out → n234.a
n233.out → n234.b
n5.out → n232.atom1
n234.out → n232.formula1
n6.out → n232.atom2
n178.out → n232.formula2
n230.out → n228.a
n232.out → n228.b
n23.out → n236.assertion
n5.out → n236.atom1
n178.out → n236.formula1
n6.out → n236.atom2
n223.out → n236.formula2
n25.out → n236.atom3
n233.out → n236.formula3
n228.out → n227.a
n236.out → n227.b
n192.out → n188.a
n227.out → n188.b
n23.out → n238.assertion
n5.out → n238.atom1
n178.out → n238.formula1
n6.out → n238.atom2
n178.out → n238.formula2
n25.out → n238.atom3
n8.out → n238.formula3
n188.out → n187.a
n238.out → n187.b
n186.out → n184.a
n187.out → n184.b
n15.out → n240.assertion
n5.out → n240.atom1
n233.out → n240.formula1
n6.out → n240.atom2
n145.out → n240.formula2
n184.out → n183.a
n240.out → n183.b
n23.out → n242.assertion
n5.out → n242.atom1
n145.out → n242.formula1
n6.out → n242.atom2
n178.out → n242.formula2
n25.out → n242.atom3
n8.out → n242.formula3
n183.out → n182.a
n242.out → n182.b
n158.out → n157.a
n182.out → n157.b
n15.out → n246.assertion
n5.out → n246.atom1
n8.out → n246.formula1
n15.out → n248.assertion
n6.out → n249.a
n8.out → n249.b
n8.out → n250.a
n249.out → n250.b
n5.out → n248.atom1
n250.out → n248.formula1
n6.out → n248.atom2
n145.out → n248.formula2
n246.out → n244.a
n248.out → n244.b
n23.out → n252.assertion
n5.out → n252.atom1
n145.out → n252.formula1
n6.out → n252.atom2
n8.out → n252.formula2
n25.out → n252.atom3
n249.out → n252.formula3
n244.out → n243.a
n252.out → n243.b
n157.out → n156.a
n243.out → n156.b
n23.out → n268.assertion
n5.out → n268.atom1
n145.out → n268.formula1
n25.out → n268.atom2
n8.out → n268.formula2
n156.out → n154.a
n268.out → n154.b
n15.out → n270.assertion
n145.out → n271.a
n8.out → n271.b
n148.out → n272.a
n271.out → n272.b
n5.out → n270.atom1
n272.out → n270.formula1
n154.out → n153.a
n270.out → n153.b
n23.out → n274.assertion
n5.out → n274.atom1
n6.out → n274.formula1
n6.out → n274.atom2
n148.out → n274.formula2
n25.out → n274.atom3
n271.out → n274.formula3
n153.out → n152.a
n274.out → n152.b
n143.out → n136.a
n152.out → n136.b
n48.out → n278.assertion
n5.out → n278.atom1
n144.out → n278.formula1
n6.out → n278.atom2
n7.out → n278.formula2
n15.out → n280.assertion
n7.out → n281.a
n144.out → n281.b
n271.out → n282.a
n281.out → n282.b
n5.out → n280.atom1
n282.out → n280.formula1
n278.out → n276.a
n280.out → n276.b
n23.out → n284.assertion
n5.out → n284.atom1
n6.out → n284.formula1
n6.out → n284.atom2
n271.out → n284.formula2
n25.out → n284.atom3
n281.out → n284.formula3
n276.out → n275.a
n284.out → n275.b
n136.out → n135.a
n275.out → n135.b
n23.out → n286.assertion
n5.out → n286.atom1
n6.out → n286.formula1
n6.out → n286.atom2
n7.out → n286.formula2
n25.out → n286.atom3
n144.out → n286.formula3
n135.out → n134.a
n286.out → n134.b
n133.out → n131.a
n134.out → n131.b
n15.out → n288.assertion
n6.out → n289.a
n144.out → n289.b
n5.out → n288.atom1
n289.out → n288.formula1
n6.out → n288.atom2
n8.out → n288.formula2
n131.out → n130.a
n288.out → n130.b
n23.out → n291.assertion
n5.out → n291.atom1
n8.out → n291.formula1
n25.out → n291.atom2
n144.out → n291.formula2
n130.out → n129.a
n291.out → n129.b
n15.out → n293.assertion
n8.out → n294.a
n144.out → n294.b
n123.out → n295.a
n294.out → n295.b
n5.out → n293.atom1
n295.out → n293.formula1
n6.out → n293.atom2
n18.out → n293.formula2
n129.out → n128.a
n293.out → n128.b
n23.out → n297.assertion
n5.out → n297.atom1
n18.out → n297.formula1
n6.out → n297.atom2
n123.out → n297.formula2
n25.out → n297.atom3
n294.out → n297.formula3
n128.out → n127.a
n297.out → n127.b
n30.out → n29.a
n127.out → n29.b
n23.out → n299.assertion
n5.out → n299.atom1
n18.out → n299.formula1
n6.out → n299.atom2
n8.out → n299.formula2
n25.out → n299.atom3
n144.out → n299.formula3
n29.out → n28.a
n299.out → n28.b
n15.out → n301.assertion
n18.out → n302.a
n144.out → n302.b
n21.out → n303.a
n302.out → n303.b
n5.out → n301.atom1
n303.out → n301.formula1
n6.out → n301.atom2
n8.out → n301.formula2
n28.out → n27.a
n301.out → n27.b
n23.out → n305.assertion
n5.out → n305.atom1
n8.out → n305.formula1
n6.out → n305.atom2
n21.out → n305.formula2
n25.out → n305.atom3
n302.out → n305.formula3
n27.out → n26.a
n305.out → n26.b
n16.out → n11.a
n26.out → n11.b
n48.out → n309.assertion
n5.out → n309.atom1
n17.out → n309.formula1
n6.out → n309.atom2
n8.out → n309.formula2
n15.out → n311.assertion
n8.out → n312.a
n17.out → n312.b
n302.out → n313.a
n312.out → n313.b
n5.out → n311.atom1
n313.out → n311.formula1
n6.out → n311.atom2
n8.out → n311.formula2
n309.out → n307.a
n311.out → n307.b
n23.out → n315.assertion
n5.out → n315.atom1
n8.out → n315.formula1
n6.out → n315.atom2
n302.out → n315.formula2
n25.out → n315.atom3
n312.out → n315.formula3
n307.out → n306.a
n315.out → n306.b
n11.out → n10.a
n306.out → n10.b
n23.out → n317.assertion
n5.out → n317.atom1
n8.out → n317.formula1
n6.out → n317.atom2
n8.out → n317.formula2
n25.out → n317.atom3
n17.out → n317.formula3
n10.out → n9.a
n317.out → n9.b
n4.out → n2.a
n9.out → n2.b
n15.out → n321.assertion
n5.out → n321.atom1
n17.out → n321.formula1
n6.out → n321.atom2
n5.out → n321.formula2
n15.out → n323.assertion
n5.out → n324.a
n17.out → n324.b
n17.out → n325.a
n324.out → n325.b
n5.out → n323.atom1
n325.out → n323.formula1
n6.out → n323.atom2
n8.out → n323.formula2
n321.out → n319.a
n323.out → n319.b
n23.out → n327.assertion
n5.out → n327.atom1
n8.out → n327.formula1
n6.out → n327.atom2
n17.out → n327.formula2
n25.out → n327.atom3
n324.out → n327.formula3
n319.out → n318.a
n327.out → n318.b
n2.out → n1.a
n318.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-17 · 否定的前件

- 目标：`⊢ ( ¬ ( P → Q ) → ( ¬ P → ¬ Q ) )`
- 提示：¬(A→B) → (¬A→¬B)：否定蕴涵的另一条推论。
- 参考解：180 个模块 / 554 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  定理 *undefined
n4  subst(groups=0)
n5  atom P
n6  atom Q
n7  imp
n8  not
n9  mp
n10  mp
n11  mp
n15  axiom A1
n16  subst(groups=1)
n17  not
n18  not
n21  imp
n23  axiom A2
n25  atom R
n26  mp
n27  mp
n28  mp
n29  mp
n30  mp
n31  mp
n32  mp
n39  subst(groups=1)
n42  imp
n46  mp
n47  mp
n48  axiom A3
n49  subst(groups=1)
n51  subst(groups=1)
n52  imp
n53  imp
n55  subst(groups=2)
n56  mp
n57  mp
n58  mp
n60  subst(groups=0)
n61  mp
n62  mp
n66  mp
n67  mp
n74  subst(groups=1)
n75  not
n76  not
n79  imp
n83  mp
n84  mp
n86  subst(groups=0)
n88  subst(groups=1)
n89  imp
n90  imp
n92  subst(groups=2)
n94  subst(groups=1)
n97  imp
n101  mp
n102  mp
n104  subst(groups=1)
n106  subst(groups=1)
n107  imp
n108  imp
n110  subst(groups=2)
n112  subst(groups=2)
n114  subst(groups=1)
n116  subst(groups=2)
n117  mp
n118  mp
n120  subst(groups=1)
n122  subst(groups=1)
n123  imp
n124  imp
n126  subst(groups=1)
n127  mp
n128  mp
n129  mp
n130  mp
n131  mp
n133  subst(groups=1)
n134  mp
n135  mp
n136  mp
n143  subst(groups=1)
n144  not
n145  not
n148  imp
n152  mp
n153  mp
n154  mp
n156  mp
n157  mp
n158  mp
n165  subst(groups=1)
n168  imp
n172  mp
n173  mp
n175  subst(groups=1)
n177  subst(groups=1)
n178  imp
n179  imp
n181  subst(groups=2)
n182  mp
n183  mp
n184  mp
n186  subst(groups=0)
n187  mp
n188  mp
n192  mp
n193  mp
n200  subst(groups=1)
n201  not
n202  not
n205  imp
n209  mp
n210  mp
n212  subst(groups=1)
n214  subst(groups=1)
n215  imp
n216  imp
n218  subst(groups=2)
n220  subst(groups=2)
n223  imp
n227  mp
n228  mp
n230  subst(groups=1)
n232  subst(groups=1)
n233  imp
n234  imp
n236  subst(groups=2)
n238  subst(groups=2)
n240  subst(groups=1)
n242  subst(groups=2)
n243  mp
n244  mp
n246  subst(groups=0)
n248  subst(groups=1)
n249  imp
n250  imp
n252  subst(groups=2)
n268  subst(groups=1)
n270  subst(groups=0)
n271  imp
n272  imp
n274  subst(groups=2)
n275  mp
n276  mp
n278  subst(groups=1)
n280  subst(groups=0)
n281  imp
n282  imp
n284  subst(groups=2)
n286  subst(groups=2)
n288  subst(groups=1)
n289  imp
n291  subst(groups=1)
n293  subst(groups=1)
n294  imp
n295  imp
n297  subst(groups=2)
n299  subst(groups=2)
n301  subst(groups=1)
n302  imp
n303  imp
n305  subst(groups=2)
n306  mp
n307  mp
n309  subst(groups=1)
n311  subst(groups=1)
n312  imp
n313  imp
n315  subst(groups=2)
n317  subst(groups=2)
n318  mp
n319  mp
n321  subst(groups=1)
n322  not
n324  subst(groups=1)
n325  imp
n326  imp
n328  subst(groups=2)

接线：
n3.out → n4.assertion
n5.out → n7.a
n6.out → n7.b
n7.out → n8.a
n5.out → n4.atom1
n8.out → n4.formula1
n15.out → n16.assertion
n5.out → n16.atom1
n8.out → n16.formula1
n6.out → n17.a
n17.out → n18.a
n6.out → n16.atom2
n18.out → n16.formula2
n18.out → n21.a
n8.out → n21.b
n15.out → n39.assertion
n5.out → n39.atom1
n18.out → n39.formula1
n6.out → n39.atom2
n17.out → n39.formula2
n17.out → n42.a
n18.out → n42.b
n48.out → n49.assertion
n5.out → n49.atom1
n6.out → n49.formula1
n6.out → n49.atom2
n17.out → n49.formula2
n15.out → n51.assertion
n17.out → n52.a
n6.out → n52.b
n42.out → n53.a
n52.out → n53.b
n5.out → n51.atom1
n53.out → n51.formula1
n6.out → n51.atom2
n18.out → n51.formula2
n49.out → n47.a
n51.out → n47.b
n23.out → n55.assertion
n5.out → n55.atom1
n18.out → n55.formula1
n6.out → n55.atom2
n42.out → n55.formula2
n25.out → n55.atom3
n52.out → n55.formula3
n47.out → n46.a
n55.out → n46.b
n39.out → n32.a
n46.out → n32.b
n3.out → n60.assertion
n5.out → n60.atom1
n52.out → n60.formula1
n15.out → n74.assertion
n5.out → n74.atom1
n17.out → n74.formula1
n52.out → n75.a
n75.out → n76.a
n6.out → n74.atom2
n76.out → n74.formula2
n76.out → n79.a
n17.out → n79.b
n48.out → n86.assertion
n5.out → n86.atom1
n75.out → n86.formula1
n15.out → n88.assertion
n6.out → n89.a
n75.out → n89.b
n79.out → n90.a
n89.out → n90.b
n5.out → n88.atom1
n90.out → n88.formula1
n6.out → n88.atom2
n17.out → n88.formula2
n86.out → n84.a
n88.out → n84.b
n23.out → n92.assertion
n5.out → n92.atom1
n17.out → n92.formula1
n6.out → n92.atom2
n79.out → n92.formula2
n25.out → n92.atom3
n89.out → n92.formula3
n84.out → n83.a
n92.out → n83.b
n74.out → n67.a
n83.out → n67.b
n23.out → n94.assertion
n5.out → n94.atom1
n17.out → n94.formula1
n25.out → n94.atom2
n75.out → n94.formula2
n67.out → n66.a
n94.out → n66.b
n17.out → n97.a
n75.out → n97.b
n48.out → n104.assertion
n5.out → n104.atom1
n6.out → n104.formula1
n6.out → n104.atom2
n52.out → n104.formula2
n15.out → n106.assertion
n52.out → n107.a
n6.out → n107.b
n97.out → n108.a
n107.out → n108.b
n5.out → n106.atom1
n108.out → n106.formula1
n6.out → n106.atom2
n52.out → n106.formula2
n104.out → n102.a
n106.out → n102.b
n23.out → n110.assertion
n5.out → n110.atom1
n52.out → n110.formula1
n6.out → n110.atom2
n97.out → n110.formula2
n25.out → n110.atom3
n107.out → n110.formula3
n102.out → n101.a
n110.out → n101.b
n66.out → n62.a
n101.out → n62.b
n23.out → n112.assertion
n5.out → n112.atom1
n52.out → n112.formula1
n6.out → n112.atom2
n52.out → n112.formula2
n25.out → n112.atom3
n6.out → n112.formula3
n62.out → n61.a
n112.out → n61.b
n60.out → n58.a
n61.out → n58.b
n15.out → n114.assertion
n5.out → n114.atom1
n107.out → n114.formula1
n6.out → n114.atom2
n18.out → n114.formula2
n58.out → n57.a
n114.out → n57.b
n23.out → n116.assertion
n5.out → n116.atom1
n18.out → n116.formula1
n6.out → n116.atom2
n52.out → n116.formula2
n25.out → n116.atom3
n6.out → n116.formula3
n57.out → n56.a
n116.out → n56.b
n32.out → n31.a
n56.out → n31.b
n15.out → n120.assertion
n5.out → n120.atom1
n6.out → n120.formula1
n6.out → n120.atom2
n8.out → n120.formula2
n15.out → n122.assertion
n8.out → n123.a
n6.out → n123.b
n6.out → n124.a
n123.out → n124.b
n5.out → n122.atom1
n124.out → n122.formula1
n6.out → n122.atom2
n18.out → n122.formula2
n120.out → n118.a
n122.out → n118.b
n23.out → n126.assertion
n5.out → n126.atom1
n18.out → n126.formula1
n25.out → n126.atom2
n123.out → n126.formula2
n118.out → n117.a
n126.out → n117.b
n31.out → n30.a
n117.out → n30.b
n15.out → n133.assertion
n5.out → n133.atom1
n6.out → n133.formula1
n6.out → n133.atom2
n5.out → n133.formula2
n15.out → n143.assertion
n5.out → n143.atom1
n6.out → n143.formula1
n8.out → n144.a
n144.out → n145.a
n6.out → n143.atom2
n145.out → n143.formula2
n145.out → n148.a
n6.out → n148.b
n15.out → n165.assertion
n5.out → n165.atom1
n145.out → n165.formula1
n6.out → n165.atom2
n144.out → n165.formula2
n144.out → n168.a
n145.out → n168.b
n48.out → n175.assertion
n5.out → n175.atom1
n8.out → n175.formula1
n6.out → n175.atom2
n144.out → n175.formula2
n15.out → n177.assertion
n144.out → n178.a
n8.out → n178.b
n168.out → n179.a
n178.out → n179.b
n5.out → n177.atom1
n179.out → n177.formula1
n6.out → n177.atom2
n145.out → n177.formula2
n175.out → n173.a
n177.out → n173.b
n23.out → n181.assertion
n5.out → n181.atom1
n145.out → n181.formula1
n6.out → n181.atom2
n168.out → n181.formula2
n25.out → n181.atom3
n178.out → n181.formula3
n173.out → n172.a
n181.out → n172.b
n165.out → n158.a
n172.out → n158.b
n3.out → n186.assertion
n5.out → n186.atom1
n178.out → n186.formula1
n15.out → n200.assertion
n5.out → n200.atom1
n144.out → n200.formula1
n178.out → n201.a
n201.out → n202.a
n6.out → n200.atom2
n202.out → n200.formula2
n202.out → n205.a
n144.out → n205.b
n48.out → n212.assertion
n5.out → n212.atom1
n201.out → n212.formula1
n6.out → n212.atom2
n8.out → n212.formula2
n15.out → n214.assertion
n8.out → n215.a
n201.out → n215.b
n205.out → n216.a
n215.out → n216.b
n5.out → n214.atom1
n216.out → n214.formula1
n6.out → n214.atom2
n144.out → n214.formula2
n212.out → n210.a
n214.out → n210.b
n23.out → n218.assertion
n5.out → n218.atom1
n144.out → n218.formula1
n6.out → n218.atom2
n205.out → n218.formula2
n25.out → n218.atom3
n215.out → n218.formula3
n210.out → n209.a
n218.out → n209.b
n200.out → n193.a
n209.out → n193.b
n23.out → n220.assertion
n5.out → n220.atom1
n144.out → n220.formula1
n6.out → n220.atom2
n8.out → n220.formula2
n25.out → n220.atom3
n201.out → n220.formula3
n193.out → n192.a
n220.out → n192.b
n144.out → n223.a
n201.out → n223.b
n48.out → n230.assertion
n5.out → n230.atom1
n8.out → n230.formula1
n6.out → n230.atom2
n178.out → n230.formula2
n15.out → n232.assertion
n178.out → n233.a
n8.out → n233.b
n223.out → n234.a
n233.out → n234.b
n5.out → n232.atom1
n234.out → n232.formula1
n6.out → n232.atom2
n178.out → n232.formula2
n230.out → n228.a
n232.out → n228.b
n23.out → n236.assertion
n5.out → n236.atom1
n178.out → n236.formula1
n6.out → n236.atom2
n223.out → n236.formula2
n25.out → n236.atom3
n233.out → n236.formula3
n228.out → n227.a
n236.out → n227.b
n192.out → n188.a
n227.out → n188.b
n23.out → n238.assertion
n5.out → n238.atom1
n178.out → n238.formula1
n6.out → n238.atom2
n178.out → n238.formula2
n25.out → n238.atom3
n8.out → n238.formula3
n188.out → n187.a
n238.out → n187.b
n186.out → n184.a
n187.out → n184.b
n15.out → n240.assertion
n5.out → n240.atom1
n233.out → n240.formula1
n6.out → n240.atom2
n145.out → n240.formula2
n184.out → n183.a
n240.out → n183.b
n23.out → n242.assertion
n5.out → n242.atom1
n145.out → n242.formula1
n6.out → n242.atom2
n178.out → n242.formula2
n25.out → n242.atom3
n8.out → n242.formula3
n183.out → n182.a
n242.out → n182.b
n158.out → n157.a
n182.out → n157.b
n15.out → n246.assertion
n5.out → n246.atom1
n8.out → n246.formula1
n15.out → n248.assertion
n6.out → n249.a
n8.out → n249.b
n8.out → n250.a
n249.out → n250.b
n5.out → n248.atom1
n250.out → n248.formula1
n6.out → n248.atom2
n145.out → n248.formula2
n246.out → n244.a
n248.out → n244.b
n23.out → n252.assertion
n5.out → n252.atom1
n145.out → n252.formula1
n6.out → n252.atom2
n8.out → n252.formula2
n25.out → n252.atom3
n249.out → n252.formula3
n244.out → n243.a
n252.out → n243.b
n157.out → n156.a
n243.out → n156.b
n23.out → n268.assertion
n5.out → n268.atom1
n145.out → n268.formula1
n25.out → n268.atom2
n8.out → n268.formula2
n156.out → n154.a
n268.out → n154.b
n15.out → n270.assertion
n145.out → n271.a
n8.out → n271.b
n148.out → n272.a
n271.out → n272.b
n5.out → n270.atom1
n272.out → n270.formula1
n154.out → n153.a
n270.out → n153.b
n23.out → n274.assertion
n5.out → n274.atom1
n6.out → n274.formula1
n6.out → n274.atom2
n148.out → n274.formula2
n25.out → n274.atom3
n271.out → n274.formula3
n153.out → n152.a
n274.out → n152.b
n143.out → n136.a
n152.out → n136.b
n48.out → n278.assertion
n5.out → n278.atom1
n144.out → n278.formula1
n6.out → n278.atom2
n7.out → n278.formula2
n15.out → n280.assertion
n7.out → n281.a
n144.out → n281.b
n271.out → n282.a
n281.out → n282.b
n5.out → n280.atom1
n282.out → n280.formula1
n278.out → n276.a
n280.out → n276.b
n23.out → n284.assertion
n5.out → n284.atom1
n6.out → n284.formula1
n6.out → n284.atom2
n271.out → n284.formula2
n25.out → n284.atom3
n281.out → n284.formula3
n276.out → n275.a
n284.out → n275.b
n136.out → n135.a
n275.out → n135.b
n23.out → n286.assertion
n5.out → n286.atom1
n6.out → n286.formula1
n6.out → n286.atom2
n7.out → n286.formula2
n25.out → n286.atom3
n144.out → n286.formula3
n135.out → n134.a
n286.out → n134.b
n133.out → n131.a
n134.out → n131.b
n15.out → n288.assertion
n6.out → n289.a
n144.out → n289.b
n5.out → n288.atom1
n289.out → n288.formula1
n6.out → n288.atom2
n8.out → n288.formula2
n131.out → n130.a
n288.out → n130.b
n23.out → n291.assertion
n5.out → n291.atom1
n8.out → n291.formula1
n25.out → n291.atom2
n144.out → n291.formula2
n130.out → n129.a
n291.out → n129.b
n15.out → n293.assertion
n8.out → n294.a
n144.out → n294.b
n123.out → n295.a
n294.out → n295.b
n5.out → n293.atom1
n295.out → n293.formula1
n6.out → n293.atom2
n18.out → n293.formula2
n129.out → n128.a
n293.out → n128.b
n23.out → n297.assertion
n5.out → n297.atom1
n18.out → n297.formula1
n6.out → n297.atom2
n123.out → n297.formula2
n25.out → n297.atom3
n294.out → n297.formula3
n128.out → n127.a
n297.out → n127.b
n30.out → n29.a
n127.out → n29.b
n23.out → n299.assertion
n5.out → n299.atom1
n18.out → n299.formula1
n6.out → n299.atom2
n8.out → n299.formula2
n25.out → n299.atom3
n144.out → n299.formula3
n29.out → n28.a
n299.out → n28.b
n15.out → n301.assertion
n18.out → n302.a
n144.out → n302.b
n21.out → n303.a
n302.out → n303.b
n5.out → n301.atom1
n303.out → n301.formula1
n6.out → n301.atom2
n8.out → n301.formula2
n28.out → n27.a
n301.out → n27.b
n23.out → n305.assertion
n5.out → n305.atom1
n8.out → n305.formula1
n6.out → n305.atom2
n21.out → n305.formula2
n25.out → n305.atom3
n302.out → n305.formula3
n27.out → n26.a
n305.out → n26.b
n16.out → n11.a
n26.out → n11.b
n48.out → n309.assertion
n5.out → n309.atom1
n17.out → n309.formula1
n6.out → n309.atom2
n8.out → n309.formula2
n15.out → n311.assertion
n8.out → n312.a
n17.out → n312.b
n302.out → n313.a
n312.out → n313.b
n5.out → n311.atom1
n313.out → n311.formula1
n6.out → n311.atom2
n8.out → n311.formula2
n309.out → n307.a
n311.out → n307.b
n23.out → n315.assertion
n5.out → n315.atom1
n8.out → n315.formula1
n6.out → n315.atom2
n302.out → n315.formula2
n25.out → n315.atom3
n312.out → n315.formula3
n307.out → n306.a
n315.out → n306.b
n11.out → n10.a
n306.out → n10.b
n23.out → n317.assertion
n5.out → n317.atom1
n8.out → n317.formula1
n6.out → n317.atom2
n8.out → n317.formula2
n25.out → n317.atom3
n17.out → n317.formula3
n10.out → n9.a
n317.out → n9.b
n4.out → n2.a
n9.out → n2.b
n15.out → n321.assertion
n5.out → n321.atom1
n17.out → n321.formula1
n5.out → n322.a
n6.out → n321.atom2
n322.out → n321.formula2
n15.out → n324.assertion
n322.out → n325.a
n17.out → n325.b
n17.out → n326.a
n325.out → n326.b
n5.out → n324.atom1
n326.out → n324.formula1
n6.out → n324.atom2
n8.out → n324.formula2
n321.out → n319.a
n324.out → n319.b
n23.out → n328.assertion
n5.out → n328.atom1
n8.out → n328.formula1
n6.out → n328.atom2
n17.out → n328.formula2
n25.out → n328.atom3
n325.out → n328.formula3
n319.out → n318.a
n328.out → n318.b
n2.out → n1.a
n318.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-18 · 前件重排

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( Q → ( P → R ) ) )`
- 提示：A→(B→C) 可以换成 B→(A→C)。
- 参考解：42 个模块 / 103 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n5  atom P
n6  atom Q
n7  atom R
n8  imp
n9  imp
n12  axiom A1
n13  subst(groups=0)
n16  imp
n18  axiom A2
n20  mp
n21  mp
n22  mp
n23  mp
n24  定理 *undefined
n25  subst(groups=1)
n27  subst(groups=1)
n28  imp
n29  imp
n30  mp
n31  mp
n32  mp
n33  mp
n34  定理 *undefined
n35  subst(groups=2)
n37  subst(groups=0)
n38  imp
n39  imp
n40  imp
n42  subst(groups=2)
n44  定理 *undefined
n45  imp
n48  定理 *undefined
n49  mp
n50  mp
n52  subst(groups=2)
n54  subst(groups=1)
n55  imp
n56  imp
n57  imp
n59  subst(groups=2)
n61  subst(groups=2)

接线：
n6.out → n8.a
n7.out → n8.b
n5.out → n9.a
n8.out → n9.b
n12.out → n13.assertion
n5.out → n13.atom1
n9.out → n13.formula1
n6.out → n16.a
n9.out → n16.b
n24.out → n25.assertion
n5.out → n25.atom1
n6.out → n25.formula1
n6.out → n25.atom2
n7.out → n25.formula2
n12.out → n27.assertion
n8.out → n28.a
n7.out → n28.b
n6.out → n29.a
n28.out → n29.b
n5.out → n27.atom1
n29.out → n27.formula1
n6.out → n27.atom2
n9.out → n27.formula2
n25.out → n23.a
n27.out → n23.b
n34.out → n35.assertion
n5.out → n35.atom1
n8.out → n35.formula1
n6.out → n35.atom2
n7.out → n35.formula2
n7.out → n35.atom3
n5.out → n35.formula3
n12.out → n37.assertion
n5.out → n38.a
n7.out → n38.b
n9.out → n39.a
n38.out → n39.b
n28.out → n40.a
n39.out → n40.b
n5.out → n37.atom1
n40.out → n37.formula1
n35.out → n33.a
n37.out → n33.b
n18.out → n42.assertion
n5.out → n42.atom1
n6.out → n42.formula1
n6.out → n42.atom2
n28.out → n42.formula2
n7.out → n42.atom3
n39.out → n42.formula3
n33.out → n32.a
n42.out → n32.b
n6.out → n45.a
n39.out → n45.b
n32.out → n31.a
n44.out → n31.b
n31.out → n30.a
n48.out → n30.b
n23.out → n22.a
n30.out → n22.b
n18.out → n52.assertion
n5.out → n52.atom1
n6.out → n52.formula1
n6.out → n52.atom2
n9.out → n52.formula2
n7.out → n52.atom3
n38.out → n52.formula3
n12.out → n54.assertion
n6.out → n55.a
n38.out → n55.b
n16.out → n56.a
n55.out → n56.b
n45.out → n57.a
n56.out → n57.b
n5.out → n54.atom1
n57.out → n54.formula1
n6.out → n54.atom2
n9.out → n54.formula2
n52.out → n50.a
n54.out → n50.b
n18.out → n59.assertion
n5.out → n59.atom1
n9.out → n59.formula1
n6.out → n59.atom2
n45.out → n59.formula2
n7.out → n59.atom3
n56.out → n59.formula3
n50.out → n49.a
n59.out → n49.b
n22.out → n21.a
n49.out → n21.b
n18.out → n61.assertion
n5.out → n61.atom1
n9.out → n61.formula1
n6.out → n61.atom2
n16.out → n61.formula2
n7.out → n61.atom3
n55.out → n61.formula3
n21.out → n20.a
n61.out → n20.b
n13.out → n1.a
n20.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-19 · 逆否命题

- 目标：`⊢ ( ( P → Q ) → ( ¬ Q → ¬ P ) )`
- 提示：(A→B)→(¬B→¬A)。
- 参考解：170 个模块 / 515 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  mp
n5  定理 *undefined
n6  subst(groups=0)
n7  atom P
n8  atom Q
n9  imp
n12  axiom A1
n13  subst(groups=1)
n14  not
n15  not
n18  imp
n20  axiom A2
n22  atom R
n23  mp
n24  mp
n25  mp
n26  mp
n27  mp
n28  mp
n29  mp
n36  subst(groups=1)
n39  imp
n43  mp
n44  mp
n45  axiom A3
n46  subst(groups=0)
n48  subst(groups=1)
n49  imp
n50  imp
n52  subst(groups=2)
n53  mp
n54  mp
n55  mp
n57  subst(groups=0)
n58  mp
n59  mp
n63  mp
n64  mp
n71  subst(groups=1)
n72  not
n73  not
n76  imp
n80  mp
n81  mp
n83  subst(groups=1)
n85  subst(groups=1)
n86  imp
n87  imp
n89  subst(groups=2)
n91  subst(groups=2)
n98  定理 *undefined
n104  imp
n109  subst(groups=2)
n111  subst(groups=1)
n113  subst(groups=2)
n114  mp
n115  mp
n117  subst(groups=0)
n119  subst(groups=1)
n120  imp
n121  imp
n123  subst(groups=2)
n124  mp
n125  mp
n126  mp
n128  subst(groups=2)
n130  subst(groups=1)
n131  imp
n132  imp
n134  subst(groups=2)
n136  subst(groups=2)
n138  subst(groups=1)
n139  imp
n140  imp
n142  subst(groups=2)
n143  mp
n144  mp
n145  mp
n146  mp
n147  mp
n149  subst(groups=0)
n150  mp
n151  mp
n152  mp
n157  subst(groups=1)
n158  not
n159  not
n160  not
n163  imp
n167  mp
n168  mp
n169  mp
n171  mp
n172  mp
n173  mp
n180  subst(groups=1)
n183  imp
n187  mp
n188  mp
n190  subst(groups=1)
n192  subst(groups=1)
n193  imp
n194  imp
n196  subst(groups=2)
n197  mp
n198  mp
n199  mp
n201  subst(groups=0)
n202  mp
n203  mp
n207  mp
n208  mp
n215  subst(groups=1)
n216  not
n217  not
n220  imp
n224  mp
n225  mp
n227  subst(groups=1)
n229  subst(groups=1)
n230  imp
n231  imp
n233  subst(groups=2)
n235  subst(groups=2)
n238  imp
n242  mp
n243  mp
n245  subst(groups=1)
n247  subst(groups=1)
n248  imp
n249  imp
n251  subst(groups=2)
n253  subst(groups=2)
n255  subst(groups=1)
n257  subst(groups=2)
n258  mp
n259  mp
n261  subst(groups=0)
n263  subst(groups=1)
n264  imp
n265  imp
n267  subst(groups=2)
n285  subst(groups=1)
n287  subst(groups=0)
n288  imp
n289  imp
n291  subst(groups=2)
n292  mp
n293  mp
n295  subst(groups=0)
n297  subst(groups=0)
n298  imp
n299  imp
n301  subst(groups=2)
n303  subst(groups=1)
n305  subst(groups=1)
n307  subst(groups=1)
n309  subst(groups=1)
n310  imp
n311  imp
n313  subst(groups=2)
n314  mp
n315  mp
n317  subst(groups=1)
n319  subst(groups=1)
n320  imp
n321  imp
n323  subst(groups=2)

接线：
n5.out → n6.assertion
n7.out → n9.a
n8.out → n9.b
n7.out → n6.atom1
n9.out → n6.formula1
n12.out → n13.assertion
n7.out → n13.atom1
n9.out → n13.formula1
n7.out → n14.a
n14.out → n15.a
n8.out → n13.atom2
n15.out → n13.formula2
n15.out → n18.a
n9.out → n18.b
n12.out → n36.assertion
n7.out → n36.atom1
n15.out → n36.formula1
n8.out → n36.atom2
n14.out → n36.formula2
n14.out → n39.a
n15.out → n39.b
n45.out → n46.assertion
n8.out → n46.atom1
n14.out → n46.formula1
n12.out → n48.assertion
n14.out → n49.a
n7.out → n49.b
n39.out → n50.a
n49.out → n50.b
n7.out → n48.atom1
n50.out → n48.formula1
n8.out → n48.atom2
n15.out → n48.formula2
n46.out → n44.a
n48.out → n44.b
n20.out → n52.assertion
n7.out → n52.atom1
n15.out → n52.formula1
n8.out → n52.atom2
n39.out → n52.formula2
n22.out → n52.atom3
n49.out → n52.formula3
n44.out → n43.a
n52.out → n43.b
n36.out → n29.a
n43.out → n29.b
n5.out → n57.assertion
n7.out → n57.atom1
n49.out → n57.formula1
n12.out → n71.assertion
n7.out → n71.atom1
n14.out → n71.formula1
n49.out → n72.a
n72.out → n73.a
n8.out → n71.atom2
n73.out → n71.formula2
n73.out → n76.a
n14.out → n76.b
n45.out → n83.assertion
n7.out → n83.atom1
n72.out → n83.formula1
n8.out → n83.atom2
n7.out → n83.formula2
n12.out → n85.assertion
n7.out → n86.a
n72.out → n86.b
n76.out → n87.a
n86.out → n87.b
n7.out → n85.atom1
n87.out → n85.formula1
n8.out → n85.atom2
n14.out → n85.formula2
n83.out → n81.a
n85.out → n81.b
n20.out → n89.assertion
n7.out → n89.atom1
n14.out → n89.formula1
n8.out → n89.atom2
n76.out → n89.formula2
n22.out → n89.atom3
n86.out → n89.formula3
n81.out → n80.a
n89.out → n80.b
n71.out → n64.a
n80.out → n64.b
n20.out → n91.assertion
n7.out → n91.atom1
n14.out → n91.formula1
n8.out → n91.atom2
n7.out → n91.formula2
n22.out → n91.atom3
n72.out → n91.formula3
n64.out → n63.a
n91.out → n63.b
n49.out → n104.a
n7.out → n104.b
n63.out → n59.a
n98.out → n59.b
n20.out → n109.assertion
n7.out → n109.atom1
n49.out → n109.formula1
n8.out → n109.atom2
n49.out → n109.formula2
n22.out → n109.atom3
n7.out → n109.formula3
n59.out → n58.a
n109.out → n58.b
n57.out → n55.a
n58.out → n55.b
n12.out → n111.assertion
n7.out → n111.atom1
n104.out → n111.formula1
n8.out → n111.atom2
n15.out → n111.formula2
n55.out → n54.a
n111.out → n54.b
n20.out → n113.assertion
n7.out → n113.atom1
n15.out → n113.formula1
n8.out → n113.atom2
n49.out → n113.formula2
n22.out → n113.atom3
n7.out → n113.formula3
n54.out → n53.a
n113.out → n53.b
n29.out → n28.a
n53.out → n28.b
n12.out → n117.assertion
n8.out → n117.atom1
n9.out → n117.formula1
n12.out → n119.assertion
n9.out → n120.a
n7.out → n120.b
n7.out → n121.a
n120.out → n121.b
n7.out → n119.atom1
n121.out → n119.formula1
n8.out → n119.atom2
n15.out → n119.formula2
n117.out → n115.a
n119.out → n115.b
n20.out → n123.assertion
n7.out → n123.atom1
n15.out → n123.formula1
n8.out → n123.atom2
n7.out → n123.formula2
n22.out → n123.atom3
n120.out → n123.formula3
n115.out → n114.a
n123.out → n114.b
n28.out → n27.a
n114.out → n27.b
n20.out → n128.assertion
n7.out → n128.atom1
n9.out → n128.formula1
n8.out → n128.atom2
n7.out → n128.formula2
n22.out → n128.atom3
n8.out → n128.formula3
n6.out → n126.a
n128.out → n126.b
n12.out → n130.assertion
n9.out → n131.a
n8.out → n131.b
n120.out → n132.a
n131.out → n132.b
n7.out → n130.atom1
n132.out → n130.formula1
n8.out → n130.atom2
n15.out → n130.formula2
n126.out → n125.a
n130.out → n125.b
n20.out → n134.assertion
n7.out → n134.atom1
n15.out → n134.formula1
n8.out → n134.atom2
n120.out → n134.formula2
n22.out → n134.atom3
n131.out → n134.formula3
n125.out → n124.a
n134.out → n124.b
n27.out → n26.a
n124.out → n26.b
n20.out → n136.assertion
n7.out → n136.atom1
n15.out → n136.formula1
n8.out → n136.atom2
n9.out → n136.formula2
n22.out → n136.atom3
n8.out → n136.formula3
n26.out → n25.a
n136.out → n25.b
n12.out → n138.assertion
n15.out → n139.a
n8.out → n139.b
n18.out → n140.a
n139.out → n140.b
n7.out → n138.atom1
n140.out → n138.formula1
n8.out → n138.atom2
n9.out → n138.formula2
n25.out → n24.a
n138.out → n24.b
n20.out → n142.assertion
n7.out → n142.atom1
n9.out → n142.formula1
n8.out → n142.atom2
n18.out → n142.formula2
n22.out → n142.atom3
n139.out → n142.formula3
n24.out → n23.a
n142.out → n23.b
n13.out → n3.a
n23.out → n3.b
n5.out → n149.assertion
n7.out → n149.atom1
n8.out → n149.formula1
n12.out → n157.assertion
n7.out → n157.atom1
n8.out → n157.formula1
n8.out → n158.a
n158.out → n159.a
n159.out → n160.a
n8.out → n157.atom2
n160.out → n157.formula2
n160.out → n163.a
n8.out → n163.b
n12.out → n180.assertion
n7.out → n180.atom1
n160.out → n180.formula1
n8.out → n180.atom2
n159.out → n180.formula2
n159.out → n183.a
n160.out → n183.b
n45.out → n190.assertion
n7.out → n190.atom1
n158.out → n190.formula1
n8.out → n190.atom2
n159.out → n190.formula2
n12.out → n192.assertion
n159.out → n193.a
n158.out → n193.b
n183.out → n194.a
n193.out → n194.b
n7.out → n192.atom1
n194.out → n192.formula1
n8.out → n192.atom2
n160.out → n192.formula2
n190.out → n188.a
n192.out → n188.b
n20.out → n196.assertion
n7.out → n196.atom1
n160.out → n196.formula1
n8.out → n196.atom2
n183.out → n196.formula2
n22.out → n196.atom3
n193.out → n196.formula3
n188.out → n187.a
n196.out → n187.b
n180.out → n173.a
n187.out → n173.b
n5.out → n201.assertion
n7.out → n201.atom1
n193.out → n201.formula1
n12.out → n215.assertion
n7.out → n215.atom1
n159.out → n215.formula1
n193.out → n216.a
n216.out → n217.a
n8.out → n215.atom2
n217.out → n215.formula2
n217.out → n220.a
n159.out → n220.b
n45.out → n227.assertion
n7.out → n227.atom1
n216.out → n227.formula1
n8.out → n227.atom2
n158.out → n227.formula2
n12.out → n229.assertion
n158.out → n230.a
n216.out → n230.b
n220.out → n231.a
n230.out → n231.b
n7.out → n229.atom1
n231.out → n229.formula1
n8.out → n229.atom2
n159.out → n229.formula2
n227.out → n225.a
n229.out → n225.b
n20.out → n233.assertion
n7.out → n233.atom1
n159.out → n233.formula1
n8.out → n233.atom2
n220.out → n233.formula2
n22.out → n233.atom3
n230.out → n233.formula3
n225.out → n224.a
n233.out → n224.b
n215.out → n208.a
n224.out → n208.b
n20.out → n235.assertion
n7.out → n235.atom1
n159.out → n235.formula1
n8.out → n235.atom2
n158.out → n235.formula2
n22.out → n235.atom3
n216.out → n235.formula3
n208.out → n207.a
n235.out → n207.b
n159.out → n238.a
n216.out → n238.b
n45.out → n245.assertion
n7.out → n245.atom1
n158.out → n245.formula1
n8.out → n245.atom2
n193.out → n245.formula2
n12.out → n247.assertion
n193.out → n248.a
n158.out → n248.b
n238.out → n249.a
n248.out → n249.b
n7.out → n247.atom1
n249.out → n247.formula1
n8.out → n247.atom2
n193.out → n247.formula2
n245.out → n243.a
n247.out → n243.b
n20.out → n251.assertion
n7.out → n251.atom1
n193.out → n251.formula1
n8.out → n251.atom2
n238.out → n251.formula2
n22.out → n251.atom3
n248.out → n251.formula3
n243.out → n242.a
n251.out → n242.b
n207.out → n203.a
n242.out → n203.b
n20.out → n253.assertion
n7.out → n253.atom1
n193.out → n253.formula1
n8.out → n253.atom2
n193.out → n253.formula2
n22.out → n253.atom3
n158.out → n253.formula3
n203.out → n202.a
n253.out → n202.b
n201.out → n199.a
n202.out → n199.b
n12.out → n255.assertion
n7.out → n255.atom1
n248.out → n255.formula1
n8.out → n255.atom2
n160.out → n255.formula2
n199.out → n198.a
n255.out → n198.b
n20.out → n257.assertion
n7.out → n257.atom1
n160.out → n257.formula1
n8.out → n257.atom2
n193.out → n257.formula2
n22.out → n257.atom3
n158.out → n257.formula3
n198.out → n197.a
n257.out → n197.b
n173.out → n172.a
n197.out → n172.b
n12.out → n261.assertion
n7.out → n261.atom1
n158.out → n261.formula1
n12.out → n263.assertion
n8.out → n264.a
n158.out → n264.b
n158.out → n265.a
n264.out → n265.b
n7.out → n263.atom1
n265.out → n263.formula1
n8.out → n263.atom2
n160.out → n263.formula2
n261.out → n259.a
n263.out → n259.b
n20.out → n267.assertion
n7.out → n267.atom1
n160.out → n267.formula1
n8.out → n267.atom2
n158.out → n267.formula2
n22.out → n267.atom3
n264.out → n267.formula3
n259.out → n258.a
n267.out → n258.b
n172.out → n171.a
n258.out → n171.b
n20.out → n285.assertion
n7.out → n285.atom1
n160.out → n285.formula1
n22.out → n285.atom2
n158.out → n285.formula2
n171.out → n169.a
n285.out → n169.b
n12.out → n287.assertion
n160.out → n288.a
n158.out → n288.b
n163.out → n289.a
n288.out → n289.b
n7.out → n287.atom1
n289.out → n287.formula1
n169.out → n168.a
n287.out → n168.b
n20.out → n291.assertion
n7.out → n291.atom1
n8.out → n291.formula1
n8.out → n291.atom2
n163.out → n291.formula2
n22.out → n291.atom3
n288.out → n291.formula3
n168.out → n167.a
n291.out → n167.b
n157.out → n152.a
n167.out → n152.b
n45.out → n295.assertion
n7.out → n295.atom1
n159.out → n295.formula1
n12.out → n297.assertion
n8.out → n298.a
n159.out → n298.b
n288.out → n299.a
n298.out → n299.b
n7.out → n297.atom1
n299.out → n297.formula1
n295.out → n293.a
n297.out → n293.b
n20.out → n301.assertion
n7.out → n301.atom1
n8.out → n301.formula1
n8.out → n301.atom2
n288.out → n301.formula2
n22.out → n301.atom3
n298.out → n301.formula3
n293.out → n292.a
n301.out → n292.b
n152.out → n151.a
n292.out → n151.b
n20.out → n303.assertion
n7.out → n303.atom1
n8.out → n303.formula1
n22.out → n303.atom2
n159.out → n303.formula2
n151.out → n150.a
n303.out → n150.b
n149.out → n147.a
n150.out → n147.b
n12.out → n305.assertion
n7.out → n305.atom1
n298.out → n305.formula1
n8.out → n305.atom2
n15.out → n305.formula2
n147.out → n146.a
n305.out → n146.b
n20.out → n307.assertion
n7.out → n307.atom1
n15.out → n307.formula1
n22.out → n307.atom2
n159.out → n307.formula2
n146.out → n145.a
n307.out → n145.b
n12.out → n309.assertion
n15.out → n310.a
n159.out → n310.b
n139.out → n311.a
n310.out → n311.b
n7.out → n309.atom1
n311.out → n309.formula1
n8.out → n309.atom2
n9.out → n309.formula2
n145.out → n144.a
n309.out → n144.b
n20.out → n313.assertion
n7.out → n313.atom1
n9.out → n313.formula1
n8.out → n313.atom2
n139.out → n313.formula2
n22.out → n313.atom3
n310.out → n313.formula3
n144.out → n143.a
n313.out → n143.b
n3.out → n2.a
n143.out → n2.b
n45.out → n317.assertion
n7.out → n317.atom1
n14.out → n317.formula1
n8.out → n317.atom2
n158.out → n317.formula2
n12.out → n319.assertion
n158.out → n320.a
n14.out → n320.b
n310.out → n321.a
n320.out → n321.b
n7.out → n319.atom1
n321.out → n319.formula1
n8.out → n319.atom2
n9.out → n319.formula2
n317.out → n315.a
n319.out → n315.b
n20.out → n323.assertion
n7.out → n323.atom1
n9.out → n323.formula1
n8.out → n323.atom2
n310.out → n323.formula2
n22.out → n323.atom3
n320.out → n323.formula3
n315.out → n314.a
n323.out → n314.b
n2.out → n1.a
n314.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-20 · 逆否（否定后件）

- 目标：`⊢ ( ( P → ¬ Q ) → ( Q → ¬ P ) )`
- 提示：(A→¬B)→(B→¬A)。
- 参考解：84 个模块 / 241 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n4  定理 *undefined
n5  subst(groups=0)
n6  atom P
n7  atom Q
n8  not
n9  imp
n12  axiom A1
n13  subst(groups=1)
n14  not
n15  not
n18  imp
n20  axiom A2
n22  atom R
n23  mp
n24  mp
n25  mp
n26  mp
n27  mp
n28  mp
n29  mp
n36  subst(groups=1)
n39  imp
n43  mp
n44  mp
n45  axiom A3
n46  subst(groups=0)
n48  subst(groups=1)
n49  imp
n50  imp
n52  subst(groups=2)
n53  mp
n54  mp
n55  mp
n57  subst(groups=0)
n58  mp
n59  mp
n63  mp
n64  mp
n71  subst(groups=1)
n72  not
n73  not
n76  imp
n80  mp
n81  mp
n83  subst(groups=1)
n85  subst(groups=1)
n86  imp
n87  imp
n89  subst(groups=2)
n91  subst(groups=2)
n98  定理 *undefined
n104  imp
n109  subst(groups=2)
n111  subst(groups=1)
n113  subst(groups=2)
n114  mp
n115  mp
n117  subst(groups=0)
n119  subst(groups=1)
n120  imp
n121  imp
n123  subst(groups=2)
n124  mp
n125  mp
n126  mp
n128  subst(groups=2)
n130  subst(groups=1)
n131  imp
n132  imp
n134  subst(groups=2)
n136  subst(groups=2)
n138  subst(groups=1)
n139  imp
n140  imp
n142  subst(groups=2)
n143  mp
n144  mp
n146  subst(groups=0)
n148  subst(groups=1)
n149  imp
n150  imp
n152  subst(groups=2)

接线：
n4.out → n5.assertion
n7.out → n8.a
n6.out → n9.a
n8.out → n9.b
n6.out → n5.atom1
n9.out → n5.formula1
n12.out → n13.assertion
n6.out → n13.atom1
n9.out → n13.formula1
n6.out → n14.a
n14.out → n15.a
n7.out → n13.atom2
n15.out → n13.formula2
n15.out → n18.a
n9.out → n18.b
n12.out → n36.assertion
n6.out → n36.atom1
n15.out → n36.formula1
n7.out → n36.atom2
n14.out → n36.formula2
n14.out → n39.a
n15.out → n39.b
n45.out → n46.assertion
n7.out → n46.atom1
n14.out → n46.formula1
n12.out → n48.assertion
n14.out → n49.a
n6.out → n49.b
n39.out → n50.a
n49.out → n50.b
n6.out → n48.atom1
n50.out → n48.formula1
n7.out → n48.atom2
n15.out → n48.formula2
n46.out → n44.a
n48.out → n44.b
n20.out → n52.assertion
n6.out → n52.atom1
n15.out → n52.formula1
n7.out → n52.atom2
n39.out → n52.formula2
n22.out → n52.atom3
n49.out → n52.formula3
n44.out → n43.a
n52.out → n43.b
n36.out → n29.a
n43.out → n29.b
n4.out → n57.assertion
n6.out → n57.atom1
n49.out → n57.formula1
n12.out → n71.assertion
n6.out → n71.atom1
n14.out → n71.formula1
n49.out → n72.a
n72.out → n73.a
n7.out → n71.atom2
n73.out → n71.formula2
n73.out → n76.a
n14.out → n76.b
n45.out → n83.assertion
n6.out → n83.atom1
n72.out → n83.formula1
n7.out → n83.atom2
n6.out → n83.formula2
n12.out → n85.assertion
n6.out → n86.a
n72.out → n86.b
n76.out → n87.a
n86.out → n87.b
n6.out → n85.atom1
n87.out → n85.formula1
n7.out → n85.atom2
n14.out → n85.formula2
n83.out → n81.a
n85.out → n81.b
n20.out → n89.assertion
n6.out → n89.atom1
n14.out → n89.formula1
n7.out → n89.atom2
n76.out → n89.formula2
n22.out → n89.atom3
n86.out → n89.formula3
n81.out → n80.a
n89.out → n80.b
n71.out → n64.a
n80.out → n64.b
n20.out → n91.assertion
n6.out → n91.atom1
n14.out → n91.formula1
n7.out → n91.atom2
n6.out → n91.formula2
n22.out → n91.atom3
n72.out → n91.formula3
n64.out → n63.a
n91.out → n63.b
n49.out → n104.a
n6.out → n104.b
n63.out → n59.a
n98.out → n59.b
n20.out → n109.assertion
n6.out → n109.atom1
n49.out → n109.formula1
n7.out → n109.atom2
n49.out → n109.formula2
n22.out → n109.atom3
n6.out → n109.formula3
n59.out → n58.a
n109.out → n58.b
n57.out → n55.a
n58.out → n55.b
n12.out → n111.assertion
n6.out → n111.atom1
n104.out → n111.formula1
n7.out → n111.atom2
n15.out → n111.formula2
n55.out → n54.a
n111.out → n54.b
n20.out → n113.assertion
n6.out → n113.atom1
n15.out → n113.formula1
n7.out → n113.atom2
n49.out → n113.formula2
n22.out → n113.atom3
n6.out → n113.formula3
n54.out → n53.a
n113.out → n53.b
n29.out → n28.a
n53.out → n28.b
n12.out → n117.assertion
n7.out → n117.atom1
n9.out → n117.formula1
n12.out → n119.assertion
n9.out → n120.a
n6.out → n120.b
n6.out → n121.a
n120.out → n121.b
n6.out → n119.atom1
n121.out → n119.formula1
n7.out → n119.atom2
n15.out → n119.formula2
n117.out → n115.a
n119.out → n115.b
n20.out → n123.assertion
n6.out → n123.atom1
n15.out → n123.formula1
n7.out → n123.atom2
n6.out → n123.formula2
n22.out → n123.atom3
n120.out → n123.formula3
n115.out → n114.a
n123.out → n114.b
n28.out → n27.a
n114.out → n27.b
n20.out → n128.assertion
n6.out → n128.atom1
n9.out → n128.formula1
n7.out → n128.atom2
n6.out → n128.formula2
n22.out → n128.atom3
n8.out → n128.formula3
n5.out → n126.a
n128.out → n126.b
n12.out → n130.assertion
n9.out → n131.a
n8.out → n131.b
n120.out → n132.a
n131.out → n132.b
n6.out → n130.atom1
n132.out → n130.formula1
n7.out → n130.atom2
n15.out → n130.formula2
n126.out → n125.a
n130.out → n125.b
n20.out → n134.assertion
n6.out → n134.atom1
n15.out → n134.formula1
n7.out → n134.atom2
n120.out → n134.formula2
n22.out → n134.atom3
n131.out → n134.formula3
n125.out → n124.a
n134.out → n124.b
n27.out → n26.a
n124.out → n26.b
n20.out → n136.assertion
n6.out → n136.atom1
n15.out → n136.formula1
n7.out → n136.atom2
n9.out → n136.formula2
n22.out → n136.atom3
n8.out → n136.formula3
n26.out → n25.a
n136.out → n25.b
n12.out → n138.assertion
n15.out → n139.a
n8.out → n139.b
n18.out → n140.a
n139.out → n140.b
n6.out → n138.atom1
n140.out → n138.formula1
n7.out → n138.atom2
n9.out → n138.formula2
n25.out → n24.a
n138.out → n24.b
n20.out → n142.assertion
n6.out → n142.atom1
n9.out → n142.formula1
n7.out → n142.atom2
n18.out → n142.formula2
n22.out → n142.atom3
n139.out → n142.formula3
n24.out → n23.a
n142.out → n23.b
n13.out → n2.a
n23.out → n2.b
n45.out → n146.assertion
n6.out → n146.atom1
n14.out → n146.formula1
n12.out → n148.assertion
n7.out → n149.a
n14.out → n149.b
n139.out → n150.a
n149.out → n150.b
n6.out → n148.atom1
n150.out → n148.formula1
n7.out → n148.atom2
n9.out → n148.formula2
n146.out → n144.a
n148.out → n144.b
n20.out → n152.assertion
n6.out → n152.atom1
n9.out → n152.formula1
n7.out → n152.atom2
n139.out → n152.formula2
n22.out → n152.atom3
n149.out → n152.formula3
n144.out → n143.a
n152.out → n143.b
n2.out → n1.a
n143.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-21 · 逆否（否定前件）

- 目标：`⊢ ( ( ¬ P → Q ) → ( ¬ Q → P ) )`
- 提示：(¬A→B)→(¬B→A)。
- 参考解：98 个模块 / 282 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n3  定理 *undefined
n5  atom P
n6  not
n7  atom Q
n8  imp
n11  mp
n12  mp
n13  mp
n15  subst(groups=0)
n16  mp
n17  mp
n18  mp
n22  axiom A1
n23  subst(groups=1)
n24  not
n25  not
n26  not
n29  imp
n31  axiom A2
n33  atom R
n34  mp
n35  mp
n36  mp
n38  mp
n39  mp
n40  mp
n47  subst(groups=1)
n50  imp
n54  mp
n55  mp
n56  axiom A3
n57  subst(groups=1)
n59  subst(groups=1)
n60  imp
n61  imp
n63  subst(groups=2)
n64  mp
n65  mp
n66  mp
n68  subst(groups=0)
n69  mp
n70  mp
n74  mp
n75  mp
n82  subst(groups=1)
n83  not
n84  not
n87  imp
n91  mp
n92  mp
n94  subst(groups=1)
n96  subst(groups=1)
n97  imp
n98  imp
n100  subst(groups=2)
n102  subst(groups=2)
n105  imp
n109  mp
n110  mp
n112  subst(groups=1)
n114  subst(groups=1)
n115  imp
n116  imp
n118  subst(groups=2)
n120  subst(groups=2)
n122  subst(groups=1)
n124  subst(groups=2)
n125  mp
n126  mp
n128  subst(groups=0)
n130  subst(groups=1)
n131  imp
n132  imp
n134  subst(groups=2)
n152  subst(groups=1)
n154  subst(groups=0)
n155  imp
n156  imp
n158  subst(groups=2)
n159  mp
n160  mp
n162  subst(groups=0)
n164  subst(groups=0)
n165  imp
n166  imp
n168  subst(groups=2)
n170  subst(groups=1)
n172  subst(groups=1)
n174  subst(groups=1)
n177  imp
n181  mp
n182  mp
n184  subst(groups=0)
n186  subst(groups=1)
n187  imp
n188  imp
n190  subst(groups=2)

接线：
n5.out → n6.a
n6.out → n8.a
n7.out → n8.b
n3.out → n15.assertion
n5.out → n15.atom1
n7.out → n15.formula1
n22.out → n23.assertion
n5.out → n23.atom1
n7.out → n23.formula1
n7.out → n24.a
n24.out → n25.a
n25.out → n26.a
n7.out → n23.atom2
n26.out → n23.formula2
n26.out → n29.a
n7.out → n29.b
n22.out → n47.assertion
n5.out → n47.atom1
n26.out → n47.formula1
n7.out → n47.atom2
n25.out → n47.formula2
n25.out → n50.a
n26.out → n50.b
n56.out → n57.assertion
n5.out → n57.atom1
n24.out → n57.formula1
n7.out → n57.atom2
n25.out → n57.formula2
n22.out → n59.assertion
n25.out → n60.a
n24.out → n60.b
n50.out → n61.a
n60.out → n61.b
n5.out → n59.atom1
n61.out → n59.formula1
n7.out → n59.atom2
n26.out → n59.formula2
n57.out → n55.a
n59.out → n55.b
n31.out → n63.assertion
n5.out → n63.atom1
n26.out → n63.formula1
n7.out → n63.atom2
n50.out → n63.formula2
n33.out → n63.atom3
n60.out → n63.formula3
n55.out → n54.a
n63.out → n54.b
n47.out → n40.a
n54.out → n40.b
n3.out → n68.assertion
n5.out → n68.atom1
n60.out → n68.formula1
n22.out → n82.assertion
n5.out → n82.atom1
n25.out → n82.formula1
n60.out → n83.a
n83.out → n84.a
n7.out → n82.atom2
n84.out → n82.formula2
n84.out → n87.a
n25.out → n87.b
n56.out → n94.assertion
n5.out → n94.atom1
n83.out → n94.formula1
n7.out → n94.atom2
n24.out → n94.formula2
n22.out → n96.assertion
n24.out → n97.a
n83.out → n97.b
n87.out → n98.a
n97.out → n98.b
n5.out → n96.atom1
n98.out → n96.formula1
n7.out → n96.atom2
n25.out → n96.formula2
n94.out → n92.a
n96.out → n92.b
n31.out → n100.assertion
n5.out → n100.atom1
n25.out → n100.formula1
n7.out → n100.atom2
n87.out → n100.formula2
n33.out → n100.atom3
n97.out → n100.formula3
n92.out → n91.a
n100.out → n91.b
n82.out → n75.a
n91.out → n75.b
n31.out → n102.assertion
n5.out → n102.atom1
n25.out → n102.formula1
n7.out → n102.atom2
n24.out → n102.formula2
n33.out → n102.atom3
n83.out → n102.formula3
n75.out → n74.a
n102.out → n74.b
n25.out → n105.a
n83.out → n105.b
n56.out → n112.assertion
n5.out → n112.atom1
n24.out → n112.formula1
n7.out → n112.atom2
n60.out → n112.formula2
n22.out → n114.assertion
n60.out → n115.a
n24.out → n115.b
n105.out → n116.a
n115.out → n116.b
n5.out → n114.atom1
n116.out → n114.formula1
n7.out → n114.atom2
n60.out → n114.formula2
n112.out → n110.a
n114.out → n110.b
n31.out → n118.assertion
n5.out → n118.atom1
n60.out → n118.formula1
n7.out → n118.atom2
n105.out → n118.formula2
n33.out → n118.atom3
n115.out → n118.formula3
n110.out → n109.a
n118.out → n109.b
n74.out → n70.a
n109.out → n70.b
n31.out → n120.assertion
n5.out → n120.atom1
n60.out → n120.formula1
n7.out → n120.atom2
n60.out → n120.formula2
n33.out → n120.atom3
n24.out → n120.formula3
n70.out → n69.a
n120.out → n69.b
n68.out → n66.a
n69.out → n66.b
n22.out → n122.assertion
n5.out → n122.atom1
n115.out → n122.formula1
n7.out → n122.atom2
n26.out → n122.formula2
n66.out → n65.a
n122.out → n65.b
n31.out → n124.assertion
n5.out → n124.atom1
n26.out → n124.formula1
n7.out → n124.atom2
n60.out → n124.formula2
n33.out → n124.atom3
n24.out → n124.formula3
n65.out → n64.a
n124.out → n64.b
n40.out → n39.a
n64.out → n39.b
n22.out → n128.assertion
n5.out → n128.atom1
n24.out → n128.formula1
n22.out → n130.assertion
n7.out → n131.a
n24.out → n131.b
n24.out → n132.a
n131.out → n132.b
n5.out → n130.atom1
n132.out → n130.formula1
n7.out → n130.atom2
n26.out → n130.formula2
n128.out → n126.a
n130.out → n126.b
n31.out → n134.assertion
n5.out → n134.atom1
n26.out → n134.formula1
n7.out → n134.atom2
n24.out → n134.formula2
n33.out → n134.atom3
n131.out → n134.formula3
n126.out → n125.a
n134.out → n125.b
n39.out → n38.a
n125.out → n38.b
n31.out → n152.assertion
n5.out → n152.atom1
n26.out → n152.formula1
n33.out → n152.atom2
n24.out → n152.formula2
n38.out → n36.a
n152.out → n36.b
n22.out → n154.assertion
n26.out → n155.a
n24.out → n155.b
n29.out → n156.a
n155.out → n156.b
n5.out → n154.atom1
n156.out → n154.formula1
n36.out → n35.a
n154.out → n35.b
n31.out → n158.assertion
n5.out → n158.atom1
n7.out → n158.formula1
n7.out → n158.atom2
n29.out → n158.formula2
n33.out → n158.atom3
n155.out → n158.formula3
n35.out → n34.a
n158.out → n34.b
n23.out → n18.a
n34.out → n18.b
n56.out → n162.assertion
n5.out → n162.atom1
n25.out → n162.formula1
n22.out → n164.assertion
n7.out → n165.a
n25.out → n165.b
n155.out → n166.a
n165.out → n166.b
n5.out → n164.atom1
n166.out → n164.formula1
n162.out → n160.a
n164.out → n160.b
n31.out → n168.assertion
n5.out → n168.atom1
n7.out → n168.formula1
n7.out → n168.atom2
n155.out → n168.formula2
n33.out → n168.atom3
n165.out → n168.formula3
n160.out → n159.a
n168.out → n159.b
n18.out → n17.a
n159.out → n17.b
n31.out → n170.assertion
n5.out → n170.atom1
n7.out → n170.formula1
n33.out → n170.atom2
n25.out → n170.formula2
n17.out → n16.a
n170.out → n16.b
n15.out → n13.a
n16.out → n13.b
n22.out → n172.assertion
n5.out → n172.atom1
n165.out → n172.formula1
n7.out → n172.atom2
n6.out → n172.formula2
n13.out → n12.a
n172.out → n12.b
n31.out → n174.assertion
n5.out → n174.atom1
n6.out → n174.formula1
n33.out → n174.atom2
n25.out → n174.formula2
n12.out → n11.a
n174.out → n11.b
n6.out → n177.a
n25.out → n177.b
n56.out → n184.assertion
n7.out → n184.atom1
n24.out → n184.formula1
n22.out → n186.assertion
n24.out → n187.a
n5.out → n187.b
n177.out → n188.a
n187.out → n188.b
n5.out → n186.atom1
n188.out → n186.formula1
n7.out → n186.atom2
n8.out → n186.formula2
n184.out → n182.a
n186.out → n182.b
n31.out → n190.assertion
n5.out → n190.atom1
n8.out → n190.formula1
n7.out → n190.atom2
n177.out → n190.formula2
n33.out → n190.atom3
n187.out → n190.formula3
n182.out → n181.a
n190.out → n181.b
n11.out → n1.a
n181.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-22 · 双重否定引入

- 目标：`⊢ ( P → ¬ ¬ P )`
- 提示：A→¬¬A。
- 参考解：82 个模块 / 239 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  定理 *undefined
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
n18  imp
n20  axiom A2
n22  atom R
n23  mp
n24  mp
n25  mp
n27  mp
n28  mp
n29  mp
n36  subst(groups=1)
n39  imp
n43  mp
n44  mp
n45  axiom A3
n46  subst(groups=1)
n48  subst(groups=1)
n49  imp
n50  imp
n52  subst(groups=2)
n53  mp
n54  mp
n55  mp
n57  subst(groups=0)
n58  mp
n59  mp
n63  mp
n64  mp
n71  subst(groups=1)
n72  not
n73  not
n76  imp
n80  mp
n81  mp
n83  subst(groups=1)
n85  subst(groups=1)
n86  imp
n87  imp
n89  subst(groups=2)
n91  subst(groups=2)
n94  imp
n98  mp
n99  mp
n101  subst(groups=1)
n103  subst(groups=1)
n104  imp
n105  imp
n107  subst(groups=2)
n109  subst(groups=2)
n111  subst(groups=1)
n113  subst(groups=2)
n114  mp
n115  mp
n117  subst(groups=1)
n119  subst(groups=1)
n120  imp
n121  imp
n123  subst(groups=2)
n141  subst(groups=2)
n143  subst(groups=1)
n144  imp
n145  imp
n147  subst(groups=1)
n148  mp
n149  mp
n151  subst(groups=1)
n153  subst(groups=1)
n154  imp
n155  imp
n157  subst(groups=1)
n159  subst(groups=1)

接线：
n9.out → n10.assertion
n12.out → n13.a
n13.out → n14.a
n14.out → n15.a
n11.out → n10.atom1
n15.out → n10.formula1
n15.out → n18.a
n12.out → n18.b
n9.out → n36.assertion
n12.out → n36.atom1
n15.out → n36.formula1
n11.out → n36.atom2
n14.out → n36.formula2
n14.out → n39.a
n15.out → n39.b
n45.out → n46.assertion
n12.out → n46.atom1
n13.out → n46.formula1
n11.out → n46.atom2
n14.out → n46.formula2
n9.out → n48.assertion
n14.out → n49.a
n13.out → n49.b
n39.out → n50.a
n49.out → n50.b
n12.out → n48.atom1
n50.out → n48.formula1
n11.out → n48.atom2
n15.out → n48.formula2
n46.out → n44.a
n48.out → n44.b
n20.out → n52.assertion
n12.out → n52.atom1
n15.out → n52.formula1
n11.out → n52.atom2
n39.out → n52.formula2
n22.out → n52.atom3
n49.out → n52.formula3
n44.out → n43.a
n52.out → n43.b
n36.out → n29.a
n43.out → n29.b
n2.out → n57.assertion
n12.out → n57.atom1
n49.out → n57.formula1
n9.out → n71.assertion
n12.out → n71.atom1
n14.out → n71.formula1
n49.out → n72.a
n72.out → n73.a
n11.out → n71.atom2
n73.out → n71.formula2
n73.out → n76.a
n14.out → n76.b
n45.out → n83.assertion
n12.out → n83.atom1
n72.out → n83.formula1
n11.out → n83.atom2
n13.out → n83.formula2
n9.out → n85.assertion
n13.out → n86.a
n72.out → n86.b
n76.out → n87.a
n86.out → n87.b
n12.out → n85.atom1
n87.out → n85.formula1
n11.out → n85.atom2
n14.out → n85.formula2
n83.out → n81.a
n85.out → n81.b
n20.out → n89.assertion
n12.out → n89.atom1
n14.out → n89.formula1
n11.out → n89.atom2
n76.out → n89.formula2
n22.out → n89.atom3
n86.out → n89.formula3
n81.out → n80.a
n89.out → n80.b
n71.out → n64.a
n80.out → n64.b
n20.out → n91.assertion
n12.out → n91.atom1
n14.out → n91.formula1
n11.out → n91.atom2
n13.out → n91.formula2
n22.out → n91.atom3
n72.out → n91.formula3
n64.out → n63.a
n91.out → n63.b
n14.out → n94.a
n72.out → n94.b
n45.out → n101.assertion
n12.out → n101.atom1
n13.out → n101.formula1
n11.out → n101.atom2
n49.out → n101.formula2
n9.out → n103.assertion
n49.out → n104.a
n13.out → n104.b
n94.out → n105.a
n104.out → n105.b
n12.out → n103.atom1
n105.out → n103.formula1
n11.out → n103.atom2
n49.out → n103.formula2
n101.out → n99.a
n103.out → n99.b
n20.out → n107.assertion
n12.out → n107.atom1
n49.out → n107.formula1
n11.out → n107.atom2
n94.out → n107.formula2
n22.out → n107.atom3
n104.out → n107.formula3
n99.out → n98.a
n107.out → n98.b
n63.out → n59.a
n98.out → n59.b
n20.out → n109.assertion
n12.out → n109.atom1
n49.out → n109.formula1
n11.out → n109.atom2
n49.out → n109.formula2
n22.out → n109.atom3
n13.out → n109.formula3
n59.out → n58.a
n109.out → n58.b
n57.out → n55.a
n58.out → n55.b
n9.out → n111.assertion
n12.out → n111.atom1
n104.out → n111.formula1
n11.out → n111.atom2
n15.out → n111.formula2
n55.out → n54.a
n111.out → n54.b
n20.out → n113.assertion
n12.out → n113.atom1
n15.out → n113.formula1
n11.out → n113.atom2
n49.out → n113.formula2
n22.out → n113.atom3
n13.out → n113.formula3
n54.out → n53.a
n113.out → n53.b
n29.out → n28.a
n53.out → n28.b
n9.out → n117.assertion
n12.out → n117.atom1
n13.out → n117.formula1
n11.out → n117.atom2
n12.out → n117.formula2
n9.out → n119.assertion
n12.out → n120.a
n13.out → n120.b
n13.out → n121.a
n120.out → n121.b
n12.out → n119.atom1
n121.out → n119.formula1
n11.out → n119.atom2
n15.out → n119.formula2
n117.out → n115.a
n119.out → n115.b
n20.out → n123.assertion
n12.out → n123.atom1
n15.out → n123.formula1
n11.out → n123.atom2
n13.out → n123.formula2
n22.out → n123.atom3
n120.out → n123.formula3
n115.out → n114.a
n123.out → n114.b
n28.out → n27.a
n114.out → n27.b
n20.out → n141.assertion
n12.out → n141.atom1
n15.out → n141.formula1
n11.out → n141.atom2
n12.out → n141.formula2
n22.out → n141.atom3
n13.out → n141.formula3
n27.out → n25.a
n141.out → n25.b
n9.out → n143.assertion
n15.out → n144.a
n13.out → n144.b
n18.out → n145.a
n144.out → n145.b
n12.out → n143.atom1
n145.out → n143.formula1
n11.out → n143.atom2
n12.out → n143.formula2
n25.out → n24.a
n143.out → n24.b
n20.out → n147.assertion
n11.out → n147.atom1
n18.out → n147.formula1
n22.out → n147.atom2
n144.out → n147.formula2
n24.out → n23.a
n147.out → n23.b
n10.out → n5.a
n23.out → n5.b
n45.out → n151.assertion
n12.out → n151.atom1
n14.out → n151.formula1
n11.out → n151.atom2
n12.out → n151.formula2
n9.out → n153.assertion
n12.out → n154.a
n14.out → n154.b
n144.out → n155.a
n154.out → n155.b
n12.out → n153.atom1
n155.out → n153.formula1
n11.out → n153.atom2
n12.out → n153.formula2
n151.out → n149.a
n153.out → n149.b
n20.out → n157.assertion
n11.out → n157.atom1
n144.out → n157.formula1
n22.out → n157.atom2
n154.out → n157.formula2
n149.out → n148.a
n157.out → n148.b
n5.out → n4.a
n148.out → n4.b
n20.out → n159.assertion
n11.out → n159.atom1
n12.out → n159.formula1
n22.out → n159.atom2
n14.out → n159.formula2
n4.out → n3.a
n159.out → n3.b
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-23 · 双重否定消去

- 目标：`⊢ ( ¬ ¬ P → P )`
- 提示：¬¬A→A。
- 参考解：45 个模块 / 116 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n4  定理 *undefined
n6  atom P
n7  not
n8  not
n11  axiom A1
n12  subst(groups=1)
n13  atom Q
n16  imp
n18  axiom A2
n20  atom R
n21  mp
n22  mp
n23  axiom A3
n24  subst(groups=0)
n26  subst(groups=1)
n27  imp
n28  imp
n30  subst(groups=2)
n31  mp
n32  mp
n33  mp
n35  subst(groups=0)
n36  mp
n37  mp
n41  mp
n42  mp
n49  subst(groups=1)
n50  not
n51  not
n54  imp
n58  mp
n59  mp
n61  subst(groups=1)
n63  subst(groups=1)
n64  imp
n65  imp
n67  subst(groups=2)
n69  subst(groups=2)
n76  定理 *undefined
n82  imp
n87  subst(groups=2)
n89  subst(groups=1)
n91  subst(groups=2)

接线：
n6.out → n7.a
n7.out → n8.a
n11.out → n12.assertion
n6.out → n12.atom1
n8.out → n12.formula1
n13.out → n12.atom2
n7.out → n12.formula2
n7.out → n16.a
n8.out → n16.b
n23.out → n24.assertion
n13.out → n24.atom1
n7.out → n24.formula1
n11.out → n26.assertion
n7.out → n27.a
n6.out → n27.b
n16.out → n28.a
n27.out → n28.b
n6.out → n26.atom1
n28.out → n26.formula1
n13.out → n26.atom2
n8.out → n26.formula2
n24.out → n22.a
n26.out → n22.b
n18.out → n30.assertion
n6.out → n30.atom1
n8.out → n30.formula1
n13.out → n30.atom2
n16.out → n30.formula2
n20.out → n30.atom3
n27.out → n30.formula3
n22.out → n21.a
n30.out → n21.b
n12.out → n2.a
n21.out → n2.b
n4.out → n35.assertion
n6.out → n35.atom1
n27.out → n35.formula1
n11.out → n49.assertion
n6.out → n49.atom1
n7.out → n49.formula1
n27.out → n50.a
n50.out → n51.a
n13.out → n49.atom2
n51.out → n49.formula2
n51.out → n54.a
n7.out → n54.b
n23.out → n61.assertion
n6.out → n61.atom1
n50.out → n61.formula1
n13.out → n61.atom2
n6.out → n61.formula2
n11.out → n63.assertion
n6.out → n64.a
n50.out → n64.b
n54.out → n65.a
n64.out → n65.b
n6.out → n63.atom1
n65.out → n63.formula1
n13.out → n63.atom2
n7.out → n63.formula2
n61.out → n59.a
n63.out → n59.b
n18.out → n67.assertion
n6.out → n67.atom1
n7.out → n67.formula1
n13.out → n67.atom2
n54.out → n67.formula2
n20.out → n67.atom3
n64.out → n67.formula3
n59.out → n58.a
n67.out → n58.b
n49.out → n42.a
n58.out → n42.b
n18.out → n69.assertion
n6.out → n69.atom1
n7.out → n69.formula1
n13.out → n69.atom2
n6.out → n69.formula2
n20.out → n69.atom3
n50.out → n69.formula3
n42.out → n41.a
n69.out → n41.b
n27.out → n82.a
n6.out → n82.b
n41.out → n37.a
n76.out → n37.b
n18.out → n87.assertion
n6.out → n87.atom1
n27.out → n87.formula1
n13.out → n87.atom2
n27.out → n87.formula2
n20.out → n87.atom3
n6.out → n87.formula3
n37.out → n36.a
n87.out → n36.b
n35.out → n33.a
n36.out → n33.b
n11.out → n89.assertion
n6.out → n89.atom1
n82.out → n89.formula1
n13.out → n89.atom2
n8.out → n89.formula2
n33.out → n32.a
n89.out → n32.b
n18.out → n91.assertion
n6.out → n91.atom1
n8.out → n91.formula1
n13.out → n91.atom2
n27.out → n91.formula2
n20.out → n91.atom3
n6.out → n91.formula3
n32.out → n31.a
n91.out → n31.b
n2.out → n1.a
n31.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-24 · 矛盾推出一切

- 目标：`⊢ ( ¬ P → ( P → Q ) )`
- 提示：¬A→(A→B)：矛盾可以推出任何命题。
- 参考解：8 个模块 / 10 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n5  atom P
n6  not
n9  axiom A1
n10  subst(groups=1)
n11  atom Q
n12  not
n20  定理 *undefined

接线：
n5.out → n6.a
n9.out → n10.assertion
n5.out → n10.atom1
n6.out → n10.formula1
n11.out → n12.a
n11.out → n10.atom2
n12.out → n10.formula2
n10.out → n1.a
n20.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-25 · 合取前件合并

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( ( P ∧ Q ) → R ) )`
- 提示：(P→(Q→R))→((P∧Q)→R)，由 A1/A2/∧ 规则证明。
- 参考解：42 个模块 / 116 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n6  atom P
n7  atom Q
n8  and
n9  axiom A1
n12  atom R
n13  imp
n14  imp
n18  mp
n19  and-elim-ax(side=r)
n20  subst(groups=1)
n21  imp
n28  axiom A2
n38  mp
n39  mp
n40  mp
n45  mp
n46  and-elim-ax(side=l)
n47  subst(groups=1)
n48  imp
n64  mp
n65  mp
n70  subst(groups=1)
n72  imp
n75  mp
n76  mp
n77  subst(groups=2)
n78  subst(groups=1)
n79  imp
n80  imp
n81  imp
n82  subst(groups=2)
n83  subst(groups=2)
n84  mp
n85  mp
n86  subst(groups=0)
n87  subst(groups=1)
n88  imp
n89  imp
n90  imp
n91  subst(groups=2)
n92  subst(groups=2)

接线：
n6.out → n8.a
n7.out → n8.b
n7.out → n13.a
n12.out → n13.b
n6.out → n14.a
n13.out → n14.b
n6.out → n19.a
n7.out → n19.b
n9.out → n20.assertion
n8.out → n21.a
n7.out → n21.b
n6.out → n20.atom1
n21.out → n20.formula1
n7.out → n20.atom2
n14.out → n20.formula2
n19.out → n18.a
n20.out → n18.b
n6.out → n46.a
n7.out → n46.b
n9.out → n47.assertion
n8.out → n48.a
n6.out → n48.b
n6.out → n47.atom1
n48.out → n47.formula1
n7.out → n47.atom2
n14.out → n47.formula2
n46.out → n45.a
n47.out → n45.b
n9.out → n70.assertion
n6.out → n70.atom1
n14.out → n70.formula1
n7.out → n70.atom2
n8.out → n70.formula2
n8.out → n72.a
n14.out → n72.b
n28.out → n77.assertion
n6.out → n77.atom1
n8.out → n77.formula1
n7.out → n77.atom2
n6.out → n77.formula2
n12.out → n77.atom3
n13.out → n77.formula3
n9.out → n78.assertion
n8.out → n79.a
n13.out → n79.b
n48.out → n80.a
n79.out → n80.b
n72.out → n81.a
n80.out → n81.b
n6.out → n78.atom1
n81.out → n78.formula1
n7.out → n78.atom2
n14.out → n78.formula2
n77.out → n76.a
n78.out → n76.b
n28.out → n82.assertion
n6.out → n82.atom1
n14.out → n82.formula1
n7.out → n82.atom2
n72.out → n82.formula2
n12.out → n82.atom3
n80.out → n82.formula3
n76.out → n75.a
n82.out → n75.b
n70.out → n65.a
n75.out → n65.b
n28.out → n83.assertion
n6.out → n83.atom1
n14.out → n83.formula1
n7.out → n83.atom2
n48.out → n83.formula2
n12.out → n83.atom3
n79.out → n83.formula3
n65.out → n64.a
n83.out → n64.b
n45.out → n40.a
n64.out → n40.b
n28.out → n86.assertion
n6.out → n86.atom1
n8.out → n86.formula1
n9.out → n87.assertion
n8.out → n88.a
n12.out → n88.b
n21.out → n89.a
n88.out → n89.b
n79.out → n90.a
n89.out → n90.b
n6.out → n87.atom1
n90.out → n87.formula1
n7.out → n87.atom2
n14.out → n87.formula2
n86.out → n85.a
n87.out → n85.b
n28.out → n91.assertion
n6.out → n91.atom1
n14.out → n91.formula1
n7.out → n91.atom2
n79.out → n91.formula2
n12.out → n91.atom3
n89.out → n91.formula3
n85.out → n84.a
n91.out → n84.b
n40.out → n39.a
n84.out → n39.b
n28.out → n92.assertion
n6.out → n92.atom1
n14.out → n92.formula1
n7.out → n92.atom2
n21.out → n92.formula2
n12.out → n92.atom3
n88.out → n92.formula3
n39.out → n38.a
n92.out → n38.b
n18.out → n1.a
n38.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-26 · 分情况

- 目标：`⊢ ( ( ¬ P → Q ) → ( ( P → Q ) → Q ) )`
- 提示：(¬A→B)→((A→B)→B)：两条路径都通向 B。
- 参考解：111 个模块 / 332 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n3  定理 *undefined
n4  subst(groups=0)
n5  atom P
n6  not
n7  atom Q
n8  imp
n11  axiom A1
n12  subst(groups=1)
n13  imp
n16  imp
n18  axiom A2
n20  atom R
n21  mp
n22  mp
n23  mp
n24  mp
n26  subst(groups=0)
n27  mp
n28  mp
n29  mp
n30  mp
n31  mp
n32  mp
n33  mp
n34  mp
n41  subst(groups=1)
n44  imp
n48  mp
n49  mp
n50  mp
n52  subst(groups=2)
n54  subst(groups=1)
n55  imp
n56  imp
n58  subst(groups=2)
n60  subst(groups=1)
n61  imp
n62  mp
n63  mp
n64  mp
n65  mp
n66  定理 *undefined
n67  subst(groups=0)
n69  subst(groups=1)
n70  not
n71  not
n72  imp
n74  subst(groups=2)
n76  subst(groups=1)
n77  imp
n78  imp
n80  subst(groups=2)
n81  mp
n82  mp
n83  axiom A3
n84  subst(groups=0)
n86  subst(groups=1)
n87  imp
n88  imp
n90  subst(groups=2)
n91  mp
n92  mp
n93  mp
n94  mp
n95  mp
n103  subst(groups=1)
n106  imp
n122  subst(groups=1)
n124  subst(groups=0)
n125  mp
n126  mp
n128  subst(groups=1)
n129  imp
n131  subst(groups=1)
n132  imp
n133  imp
n135  subst(groups=2)
n136  mp
n137  mp
n139  subst(groups=2)
n141  subst(groups=1)
n142  imp
n143  imp
n144  imp
n146  subst(groups=2)
n148  subst(groups=2)
n149  mp
n150  mp
n151  mp
n152  定理 *undefined
n153  subst(groups=1)
n154  not
n156  subst(groups=2)
n158  subst(groups=1)
n159  imp
n160  imp
n162  subst(groups=2)
n163  mp
n164  mp
n166  subst(groups=1)
n168  subst(groups=1)
n169  imp
n170  imp
n172  subst(groups=2)
n174  subst(groups=2)
n176  subst(groups=2)
n178  subst(groups=1)
n179  imp
n180  imp
n182  subst(groups=2)

接线：
n3.out → n4.assertion
n5.out → n6.a
n6.out → n8.a
n7.out → n8.b
n5.out → n4.atom1
n8.out → n4.formula1
n11.out → n12.assertion
n5.out → n12.atom1
n8.out → n12.formula1
n5.out → n13.a
n7.out → n13.b
n7.out → n12.atom2
n13.out → n12.formula2
n13.out → n16.a
n8.out → n16.b
n3.out → n26.assertion
n5.out → n26.atom1
n13.out → n26.formula1
n11.out → n41.assertion
n5.out → n41.atom1
n6.out → n41.formula1
n7.out → n41.atom2
n8.out → n41.formula2
n8.out → n44.a
n6.out → n44.b
n18.out → n52.assertion
n5.out → n52.atom1
n8.out → n52.formula1
n7.out → n52.atom2
n6.out → n52.formula2
n20.out → n52.atom3
n7.out → n52.formula3
n4.out → n50.a
n52.out → n50.b
n11.out → n54.assertion
n8.out → n55.a
n7.out → n55.b
n44.out → n56.a
n55.out → n56.b
n5.out → n54.atom1
n56.out → n54.formula1
n7.out → n54.atom2
n6.out → n54.formula2
n50.out → n49.a
n54.out → n49.b
n18.out → n58.assertion
n5.out → n58.atom1
n6.out → n58.formula1
n7.out → n58.atom2
n44.out → n58.formula2
n20.out → n58.atom3
n55.out → n58.formula3
n49.out → n48.a
n58.out → n48.b
n41.out → n34.a
n48.out → n34.b
n11.out → n60.assertion
n6.out → n61.a
n55.out → n61.b
n5.out → n60.atom1
n61.out → n60.formula1
n7.out → n60.atom2
n13.out → n60.formula2
n34.out → n33.a
n60.out → n33.b
n66.out → n67.assertion
n5.out → n67.atom1
n55.out → n67.formula1
n11.out → n69.assertion
n55.out → n70.a
n70.out → n71.a
n55.out → n72.a
n71.out → n72.b
n5.out → n69.atom1
n72.out → n69.formula1
n7.out → n69.atom2
n6.out → n69.formula2
n67.out → n65.a
n69.out → n65.b
n18.out → n74.assertion
n5.out → n74.atom1
n6.out → n74.formula1
n7.out → n74.atom2
n55.out → n74.formula2
n20.out → n74.atom3
n71.out → n74.formula3
n65.out → n64.a
n74.out → n64.b
n11.out → n76.assertion
n6.out → n77.a
n71.out → n77.b
n61.out → n78.a
n77.out → n78.b
n5.out → n76.atom1
n78.out → n76.formula1
n7.out → n76.atom2
n13.out → n76.formula2
n64.out → n63.a
n76.out → n63.b
n18.out → n80.assertion
n5.out → n80.atom1
n13.out → n80.formula1
n7.out → n80.atom2
n61.out → n80.formula2
n20.out → n80.atom3
n77.out → n80.formula3
n63.out → n62.a
n80.out → n62.b
n33.out → n32.a
n62.out → n32.b
n83.out → n84.assertion
n7.out → n84.atom1
n70.out → n84.formula1
n11.out → n86.assertion
n70.out → n87.a
n5.out → n87.b
n77.out → n88.a
n87.out → n88.b
n5.out → n86.atom1
n88.out → n86.formula1
n7.out → n86.atom2
n13.out → n86.formula2
n84.out → n82.a
n86.out → n82.b
n18.out → n90.assertion
n5.out → n90.atom1
n13.out → n90.formula1
n7.out → n90.atom2
n77.out → n90.formula2
n20.out → n90.atom3
n87.out → n90.formula3
n82.out → n81.a
n90.out → n81.b
n32.out → n31.a
n81.out → n31.b
n11.out → n103.assertion
n5.out → n103.atom1
n7.out → n103.formula1
n7.out → n103.atom2
n8.out → n103.formula2
n7.out → n106.a
n55.out → n106.b
n11.out → n122.assertion
n5.out → n122.atom1
n106.out → n122.formula1
n7.out → n122.atom2
n5.out → n122.formula2
n103.out → n95.a
n122.out → n95.b
n18.out → n124.assertion
n20.out → n124.atom1
n55.out → n124.formula1
n95.out → n94.a
n124.out → n94.b
n11.out → n128.assertion
n5.out → n129.a
n55.out → n129.b
n5.out → n128.atom1
n129.out → n128.formula1
n7.out → n128.atom2
n70.out → n128.formula2
n11.out → n131.assertion
n70.out → n132.a
n129.out → n132.b
n129.out → n133.a
n132.out → n133.b
n5.out → n131.atom1
n133.out → n131.formula1
n7.out → n131.atom2
n13.out → n131.formula2
n128.out → n126.a
n131.out → n126.b
n18.out → n135.assertion
n5.out → n135.atom1
n13.out → n135.formula1
n7.out → n135.atom2
n129.out → n135.formula2
n20.out → n135.atom3
n132.out → n135.formula3
n126.out → n125.a
n135.out → n125.b
n94.out → n93.a
n125.out → n93.b
n18.out → n139.assertion
n5.out → n139.atom1
n70.out → n139.formula1
n7.out → n139.atom2
n5.out → n139.formula2
n20.out → n139.atom3
n55.out → n139.formula3
n11.out → n141.assertion
n70.out → n142.a
n55.out → n142.b
n87.out → n143.a
n142.out → n143.b
n132.out → n144.a
n143.out → n144.b
n5.out → n141.atom1
n144.out → n141.formula1
n7.out → n141.atom2
n13.out → n141.formula2
n139.out → n137.a
n141.out → n137.b
n18.out → n146.assertion
n5.out → n146.atom1
n13.out → n146.formula1
n7.out → n146.atom2
n132.out → n146.formula2
n20.out → n146.atom3
n143.out → n146.formula3
n137.out → n136.a
n146.out → n136.b
n93.out → n92.a
n136.out → n92.b
n18.out → n148.assertion
n5.out → n148.atom1
n13.out → n148.formula1
n7.out → n148.atom2
n87.out → n148.formula2
n20.out → n148.atom3
n142.out → n148.formula3
n92.out → n91.a
n148.out → n91.b
n31.out → n30.a
n91.out → n30.b
n152.out → n153.assertion
n5.out → n153.atom1
n55.out → n153.formula1
n13.out → n154.a
n7.out → n153.atom2
n154.out → n153.formula2
n18.out → n156.assertion
n5.out → n156.atom1
n70.out → n156.formula1
n7.out → n156.atom2
n55.out → n156.formula2
n20.out → n156.atom3
n154.out → n156.formula3
n153.out → n151.a
n156.out → n151.b
n11.out → n158.assertion
n70.out → n159.a
n154.out → n159.b
n142.out → n160.a
n159.out → n160.b
n5.out → n158.atom1
n160.out → n158.formula1
n7.out → n158.atom2
n13.out → n158.formula2
n151.out → n150.a
n158.out → n150.b
n18.out → n162.assertion
n5.out → n162.atom1
n13.out → n162.formula1
n7.out → n162.atom2
n142.out → n162.formula2
n20.out → n162.atom3
n159.out → n162.formula3
n150.out → n149.a
n162.out → n149.b
n30.out → n29.a
n149.out → n29.b
n83.out → n166.assertion
n5.out → n166.atom1
n55.out → n166.formula1
n7.out → n166.atom2
n13.out → n166.formula2
n11.out → n168.assertion
n13.out → n169.a
n55.out → n169.b
n159.out → n170.a
n169.out → n170.b
n5.out → n168.atom1
n170.out → n168.formula1
n7.out → n168.atom2
n13.out → n168.formula2
n166.out → n164.a
n168.out → n164.b
n18.out → n172.assertion
n5.out → n172.atom1
n13.out → n172.formula1
n7.out → n172.atom2
n159.out → n172.formula2
n20.out → n172.atom3
n169.out → n172.formula3
n164.out → n163.a
n172.out → n163.b
n29.out → n28.a
n163.out → n28.b
n18.out → n174.assertion
n5.out → n174.atom1
n13.out → n174.formula1
n7.out → n174.atom2
n13.out → n174.formula2
n20.out → n174.atom3
n55.out → n174.formula3
n28.out → n27.a
n174.out → n27.b
n26.out → n24.a
n27.out → n24.b
n18.out → n176.assertion
n5.out → n176.atom1
n13.out → n176.formula1
n7.out → n176.atom2
n8.out → n176.formula2
n20.out → n176.atom3
n7.out → n176.formula3
n24.out → n23.a
n176.out → n23.b
n11.out → n178.assertion
n13.out → n179.a
n7.out → n179.b
n16.out → n180.a
n179.out → n180.b
n5.out → n178.atom1
n180.out → n178.formula1
n7.out → n178.atom2
n8.out → n178.formula2
n23.out → n22.a
n178.out → n22.b
n18.out → n182.assertion
n5.out → n182.atom1
n8.out → n182.formula1
n7.out → n182.atom2
n16.out → n182.formula2
n20.out → n182.atom3
n179.out → n182.formula3
n22.out → n21.a
n182.out → n21.b
n12.out → n1.a
n21.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-27 · 蕴涵合成

- 目标：`⊢ ( ( P → Q ) → ( ( R → S ) → ( ( Q → R ) → ( P → S ) ) ) )`
- 提示：(A→B)→((C→D)→((B→C)→(A→D)))。
- 参考解：66 个模块 / 192 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n5  atom P
n6  atom Q
n7  imp
n10  axiom A1
n11  subst(groups=1)
n12  atom R
n13  atom S
n14  imp
n17  imp
n19  axiom A2
n21  mp
n22  mp
n23  mp
n24  mp
n25  mp
n26  定理 *undefined
n27  subst(groups=2)
n28  mp
n29  mp
n31  subst(groups=1)
n32  imp
n33  imp
n34  imp
n36  subst(groups=1)
n37  imp
n38  imp
n40  subst(groups=2)
n41  mp
n42  mp
n43  mp
n44  mp
n45  定理 *undefined
n46  subst(groups=0)
n48  subst(groups=1)
n49  imp
n50  imp
n51  imp
n52  mp
n53  mp
n54  mp
n55  mp
n57  subst(groups=2)
n59  subst(groups=1)
n60  imp
n61  imp
n62  imp
n64  subst(groups=2)
n66  subst(groups=1)
n67  imp
n68  imp
n70  subst(groups=2)
n71  mp
n72  mp
n74  subst(groups=2)
n76  subst(groups=1)
n77  imp
n78  imp
n79  imp
n81  subst(groups=2)
n83  subst(groups=2)
n85  subst(groups=2)
n87  subst(groups=1)
n88  imp
n89  imp
n91  subst(groups=2)

接线：
n5.out → n7.a
n6.out → n7.b
n10.out → n11.assertion
n5.out → n11.atom1
n7.out → n11.formula1
n12.out → n14.a
n13.out → n14.b
n6.out → n11.atom2
n14.out → n11.formula2
n14.out → n17.a
n7.out → n17.b
n26.out → n27.assertion
n5.out → n27.atom1
n12.out → n27.formula1
n6.out → n27.atom2
n13.out → n27.formula2
n12.out → n27.atom3
n6.out → n27.formula3
n10.out → n31.assertion
n6.out → n32.a
n12.out → n32.b
n6.out → n33.a
n13.out → n33.b
n32.out → n34.a
n33.out → n34.b
n5.out → n31.atom1
n34.out → n31.formula1
n6.out → n31.atom2
n7.out → n31.formula2
n10.out → n36.assertion
n7.out → n37.a
n34.out → n37.b
n34.out → n38.a
n37.out → n38.b
n5.out → n36.atom1
n38.out → n36.formula1
n6.out → n36.atom2
n14.out → n36.formula2
n31.out → n29.a
n36.out → n29.b
n19.out → n40.assertion
n5.out → n40.atom1
n14.out → n40.formula1
n6.out → n40.atom2
n34.out → n40.formula2
n12.out → n40.atom3
n37.out → n40.formula3
n29.out → n28.a
n40.out → n28.b
n27.out → n25.a
n28.out → n25.b
n45.out → n46.assertion
n12.out → n46.atom1
n13.out → n46.formula1
n10.out → n48.assertion
n5.out → n49.a
n13.out → n49.b
n33.out → n50.a
n49.out → n50.b
n7.out → n51.a
n50.out → n51.b
n5.out → n48.atom1
n51.out → n48.formula1
n6.out → n48.atom2
n14.out → n48.formula2
n46.out → n44.a
n48.out → n44.b
n26.out → n57.assertion
n5.out → n57.atom1
n33.out → n57.formula1
n6.out → n57.atom2
n49.out → n57.formula2
n12.out → n57.atom3
n32.out → n57.formula3
n10.out → n59.assertion
n32.out → n60.a
n49.out → n60.b
n34.out → n61.a
n60.out → n61.b
n50.out → n62.a
n61.out → n62.b
n5.out → n59.atom1
n62.out → n59.formula1
n6.out → n59.atom2
n7.out → n59.formula2
n57.out → n55.a
n59.out → n55.b
n19.out → n64.assertion
n5.out → n64.atom1
n7.out → n64.formula1
n6.out → n64.atom2
n50.out → n64.formula2
n12.out → n64.atom3
n61.out → n64.formula3
n55.out → n54.a
n64.out → n54.b
n10.out → n66.assertion
n7.out → n67.a
n61.out → n67.b
n51.out → n68.a
n67.out → n68.b
n5.out → n66.atom1
n68.out → n66.formula1
n6.out → n66.atom2
n14.out → n66.formula2
n54.out → n53.a
n66.out → n53.b
n19.out → n70.assertion
n5.out → n70.atom1
n14.out → n70.formula1
n6.out → n70.atom2
n51.out → n70.formula2
n12.out → n70.atom3
n67.out → n70.formula3
n53.out → n52.a
n70.out → n52.b
n44.out → n43.a
n52.out → n43.b
n19.out → n74.assertion
n5.out → n74.atom1
n7.out → n74.formula1
n6.out → n74.atom2
n34.out → n74.formula2
n12.out → n74.atom3
n60.out → n74.formula3
n10.out → n76.assertion
n7.out → n77.a
n60.out → n77.b
n37.out → n78.a
n77.out → n78.b
n67.out → n79.a
n78.out → n79.b
n5.out → n76.atom1
n79.out → n76.formula1
n6.out → n76.atom2
n14.out → n76.formula2
n74.out → n72.a
n76.out → n72.b
n19.out → n81.assertion
n5.out → n81.atom1
n14.out → n81.formula1
n6.out → n81.atom2
n67.out → n81.formula2
n12.out → n81.atom3
n78.out → n81.formula3
n72.out → n71.a
n81.out → n71.b
n43.out → n42.a
n71.out → n42.b
n19.out → n83.assertion
n5.out → n83.atom1
n14.out → n83.formula1
n6.out → n83.atom2
n37.out → n83.formula2
n12.out → n83.atom3
n77.out → n83.formula3
n42.out → n41.a
n83.out → n41.b
n25.out → n24.a
n41.out → n24.b
n19.out → n85.assertion
n5.out → n85.atom1
n14.out → n85.formula1
n6.out → n85.atom2
n7.out → n85.formula2
n12.out → n85.atom3
n60.out → n85.formula3
n24.out → n23.a
n85.out → n23.b
n10.out → n87.assertion
n14.out → n88.a
n60.out → n88.b
n17.out → n89.a
n88.out → n89.b
n5.out → n87.atom1
n89.out → n87.formula1
n6.out → n87.atom2
n7.out → n87.formula2
n23.out → n22.a
n87.out → n22.b
n19.out → n91.assertion
n5.out → n91.atom1
n7.out → n91.formula1
n6.out → n91.atom2
n17.out → n91.formula2
n12.out → n91.atom3
n88.out → n91.formula3
n22.out → n21.a
n91.out → n21.b
n11.out → n1.a
n21.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-28 · 替换前件（左）

- 目标：`⊢ ( ( ( P → Q ) → R ) → ( Q → R ) )`
- 提示：((A→B)→C)→(B→C)。
- 参考解：38 个模块 / 99 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n3  定理 *undefined
n4  subst(groups=0)
n5  atom P
n6  atom Q
n7  imp
n8  atom R
n9  imp
n12  axiom A1
n13  subst(groups=0)
n16  imp
n18  axiom A2
n20  mp
n21  mp
n22  mp
n23  mp
n24  mp
n26  subst(groups=1)
n27  mp
n28  mp
n30  subst(groups=1)
n32  subst(groups=0)
n33  imp
n34  imp
n36  subst(groups=2)
n37  mp
n38  mp
n39  mp
n50  subst(groups=1)
n52  subst(groups=0)
n53  imp
n54  imp
n56  subst(groups=2)
n58  subst(groups=1)
n60  subst(groups=1)
n61  imp
n62  imp
n64  subst(groups=2)

接线：
n3.out → n4.assertion
n5.out → n7.a
n6.out → n7.b
n7.out → n9.a
n8.out → n9.b
n5.out → n4.atom1
n9.out → n4.formula1
n12.out → n13.assertion
n5.out → n13.atom1
n9.out → n13.formula1
n6.out → n16.a
n9.out → n16.b
n12.out → n26.assertion
n5.out → n26.atom1
n6.out → n26.formula1
n6.out → n26.atom2
n5.out → n26.formula2
n12.out → n30.assertion
n5.out → n30.atom1
n7.out → n30.formula1
n6.out → n30.atom2
n9.out → n30.formula2
n12.out → n32.assertion
n9.out → n33.a
n7.out → n33.b
n7.out → n34.a
n33.out → n34.b
n5.out → n32.atom1
n34.out → n32.formula1
n30.out → n28.a
n32.out → n28.b
n18.out → n36.assertion
n5.out → n36.atom1
n6.out → n36.formula1
n6.out → n36.atom2
n7.out → n36.formula2
n8.out → n36.atom3
n33.out → n36.formula3
n28.out → n27.a
n36.out → n27.b
n26.out → n24.a
n27.out → n24.b
n18.out → n50.assertion
n5.out → n50.atom1
n9.out → n50.formula1
n6.out → n50.atom2
n7.out → n50.formula2
n4.out → n39.a
n50.out → n39.b
n12.out → n52.assertion
n9.out → n53.a
n8.out → n53.b
n33.out → n54.a
n53.out → n54.b
n5.out → n52.atom1
n54.out → n52.formula1
n39.out → n38.a
n52.out → n38.b
n18.out → n56.assertion
n5.out → n56.atom1
n6.out → n56.formula1
n6.out → n56.atom2
n33.out → n56.formula2
n8.out → n56.atom3
n53.out → n56.formula3
n38.out → n37.a
n56.out → n37.b
n24.out → n23.a
n37.out → n23.b
n18.out → n58.assertion
n5.out → n58.atom1
n6.out → n58.formula1
n6.out → n58.atom2
n9.out → n58.formula2
n23.out → n22.a
n58.out → n22.b
n12.out → n60.assertion
n6.out → n61.a
n8.out → n61.b
n16.out → n62.a
n61.out → n62.b
n5.out → n60.atom1
n62.out → n60.formula1
n6.out → n60.atom2
n9.out → n60.formula2
n22.out → n21.a
n60.out → n21.b
n18.out → n64.assertion
n5.out → n64.atom1
n9.out → n64.formula1
n6.out → n64.atom2
n16.out → n64.formula2
n8.out → n64.atom3
n61.out → n64.formula3
n21.out → n20.a
n64.out → n20.b
n13.out → n1.a
n20.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-29 · 替换前件（右）

- 目标：`⊢ ( ( ( P → Q ) → R ) → ( ¬ P → R ) )`
- 提示：((A→B)→C)→(A→C)。
- 参考解：39 个模块 / 101 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n3  定理 *undefined
n4  subst(groups=0)
n5  atom P
n6  atom Q
n7  imp
n8  atom R
n9  imp
n12  axiom A1
n13  subst(groups=1)
n14  not
n17  imp
n19  axiom A2
n21  mp
n22  mp
n23  mp
n24  mp
n25  mp
n26  定理 *undefined
n27  mp
n28  mp
n30  subst(groups=1)
n32  subst(groups=1)
n33  imp
n34  imp
n36  subst(groups=2)
n37  mp
n38  mp
n39  mp
n50  subst(groups=1)
n52  subst(groups=1)
n53  imp
n54  imp
n56  subst(groups=2)
n58  subst(groups=1)
n60  subst(groups=1)
n61  imp
n62  imp
n64  subst(groups=2)

接线：
n3.out → n4.assertion
n5.out → n7.a
n6.out → n7.b
n7.out → n9.a
n8.out → n9.b
n5.out → n4.atom1
n9.out → n4.formula1
n12.out → n13.assertion
n5.out → n13.atom1
n9.out → n13.formula1
n5.out → n14.a
n6.out → n13.atom2
n14.out → n13.formula2
n14.out → n17.a
n9.out → n17.b
n12.out → n30.assertion
n5.out → n30.atom1
n7.out → n30.formula1
n6.out → n30.atom2
n9.out → n30.formula2
n12.out → n32.assertion
n9.out → n33.a
n7.out → n33.b
n7.out → n34.a
n33.out → n34.b
n5.out → n32.atom1
n34.out → n32.formula1
n6.out → n32.atom2
n14.out → n32.formula2
n30.out → n28.a
n32.out → n28.b
n19.out → n36.assertion
n5.out → n36.atom1
n14.out → n36.formula1
n6.out → n36.atom2
n7.out → n36.formula2
n8.out → n36.atom3
n33.out → n36.formula3
n28.out → n27.a
n36.out → n27.b
n26.out → n25.a
n27.out → n25.b
n19.out → n50.assertion
n5.out → n50.atom1
n9.out → n50.formula1
n6.out → n50.atom2
n7.out → n50.formula2
n4.out → n39.a
n50.out → n39.b
n12.out → n52.assertion
n9.out → n53.a
n8.out → n53.b
n33.out → n54.a
n53.out → n54.b
n5.out → n52.atom1
n54.out → n52.formula1
n6.out → n52.atom2
n14.out → n52.formula2
n39.out → n38.a
n52.out → n38.b
n19.out → n56.assertion
n5.out → n56.atom1
n14.out → n56.formula1
n6.out → n56.atom2
n33.out → n56.formula2
n8.out → n56.atom3
n53.out → n56.formula3
n38.out → n37.a
n56.out → n37.b
n25.out → n24.a
n37.out → n24.b
n19.out → n58.assertion
n5.out → n58.atom1
n14.out → n58.formula1
n6.out → n58.atom2
n9.out → n58.formula2
n24.out → n23.a
n58.out → n23.b
n12.out → n60.assertion
n14.out → n61.a
n8.out → n61.b
n17.out → n62.a
n61.out → n62.b
n5.out → n60.atom1
n62.out → n60.formula1
n6.out → n60.atom2
n9.out → n60.formula2
n23.out → n22.a
n60.out → n22.b
n19.out → n64.assertion
n5.out → n64.atom1
n9.out → n64.formula1
n6.out → n64.atom2
n17.out → n64.formula2
n8.out → n64.atom3
n61.out → n64.formula3
n22.out → n21.a
n64.out → n21.b
n13.out → n1.a
n21.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-30 · 合取前件拆分

- 目标：`⊢ ( ( ( P ∧ Q ) → R ) → ( P → ( Q → R ) ) )`
- 提示：((P∧Q)→R)→(P→(Q→R))，由 A1/A2/∧ 规则证明。
- 参考解：77 个模块 / 231 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n7  atom P
n8  atom Q
n9  axiom A1
n12  and
n13  atom R
n14  imp
n21  axiom A2
n58  mp
n59  and-intro-ax
n60  subst(groups=1)
n61  imp
n62  imp
n160  mp
n161  mp
n162  mp
n163  mp
n168  subst(groups=1)
n170  imp
n173  mp
n174  mp
n175  mp
n176  mp
n177  subst(groups=0)
n178  subst(groups=1)
n179  imp
n180  imp
n181  mp
n182  mp
n183  subst(groups=1)
n184  subst(groups=1)
n185  imp
n186  imp
n187  subst(groups=2)
n188  mp
n189  mp
n190  subst(groups=1)
n191  subst(groups=1)
n192  imp
n193  imp
n194  imp
n195  subst(groups=2)
n196  subst(groups=2)
n197  mp
n198  mp
n199  mp
n200  mp
n201  subst(groups=1)
n202  subst(groups=1)
n203  imp
n204  imp
n205  imp
n206  mp
n207  mp
n208  subst(groups=1)
n209  subst(groups=1)
n210  imp
n211  imp
n212  subst(groups=2)
n213  mp
n214  mp
n215  subst(groups=1)
n216  subst(groups=1)
n217  imp
n218  imp
n219  imp
n220  subst(groups=2)
n221  subst(groups=2)
n222  mp
n223  mp
n224  subst(groups=1)
n225  subst(groups=1)
n226  imp
n227  imp
n228  imp
n229  subst(groups=2)
n230  subst(groups=2)

接线：
n7.out → n12.a
n8.out → n12.b
n12.out → n14.a
n13.out → n14.b
n7.out → n59.a
n8.out → n59.b
n9.out → n60.assertion
n8.out → n61.a
n12.out → n61.b
n7.out → n62.a
n61.out → n62.b
n7.out → n60.atom1
n62.out → n60.formula1
n8.out → n60.atom2
n14.out → n60.formula2
n59.out → n58.a
n60.out → n58.b
n9.out → n168.assertion
n7.out → n168.atom1
n14.out → n168.formula1
n8.out → n168.atom2
n7.out → n168.formula2
n7.out → n170.a
n14.out → n170.b
n9.out → n177.assertion
n7.out → n177.atom1
n14.out → n177.formula1
n9.out → n178.assertion
n8.out → n179.a
n14.out → n179.b
n14.out → n180.a
n179.out → n180.b
n7.out → n178.atom1
n180.out → n178.formula1
n8.out → n178.atom2
n14.out → n178.formula2
n177.out → n176.a
n178.out → n176.b
n9.out → n183.assertion
n7.out → n183.atom1
n180.out → n183.formula1
n8.out → n183.atom2
n7.out → n183.formula2
n9.out → n184.assertion
n7.out → n185.a
n180.out → n185.b
n180.out → n186.a
n185.out → n186.b
n7.out → n184.atom1
n186.out → n184.formula1
n8.out → n184.atom2
n14.out → n184.formula2
n183.out → n182.a
n184.out → n182.b
n21.out → n187.assertion
n7.out → n187.atom1
n14.out → n187.formula1
n8.out → n187.atom2
n180.out → n187.formula2
n13.out → n187.atom3
n185.out → n187.formula3
n182.out → n181.a
n187.out → n181.b
n176.out → n175.a
n181.out → n175.b
n21.out → n190.assertion
n8.out → n190.atom1
n14.out → n190.formula1
n13.out → n190.atom2
n179.out → n190.formula2
n9.out → n191.assertion
n7.out → n192.a
n179.out → n192.b
n170.out → n193.a
n192.out → n193.b
n185.out → n194.a
n193.out → n194.b
n7.out → n191.atom1
n194.out → n191.formula1
n8.out → n191.atom2
n14.out → n191.formula2
n190.out → n189.a
n191.out → n189.b
n21.out → n195.assertion
n7.out → n195.atom1
n14.out → n195.formula1
n8.out → n195.atom2
n185.out → n195.formula2
n13.out → n195.atom3
n193.out → n195.formula3
n189.out → n188.a
n195.out → n188.b
n175.out → n174.a
n188.out → n174.b
n21.out → n196.assertion
n7.out → n196.atom1
n14.out → n196.formula1
n8.out → n196.atom2
n170.out → n196.formula2
n13.out → n196.atom3
n192.out → n196.formula3
n174.out → n173.a
n196.out → n173.b
n168.out → n163.a
n173.out → n163.b
n21.out → n201.assertion
n7.out → n201.atom1
n8.out → n201.formula1
n8.out → n201.atom2
n12.out → n201.formula2
n9.out → n202.assertion
n8.out → n203.a
n13.out → n203.b
n61.out → n204.a
n203.out → n204.b
n179.out → n205.a
n204.out → n205.b
n7.out → n202.atom1
n205.out → n202.formula1
n8.out → n202.atom2
n14.out → n202.formula2
n201.out → n200.a
n202.out → n200.b
n9.out → n208.assertion
n7.out → n208.atom1
n205.out → n208.formula1
n8.out → n208.atom2
n7.out → n208.formula2
n9.out → n209.assertion
n7.out → n210.a
n205.out → n210.b
n205.out → n211.a
n210.out → n211.b
n7.out → n209.atom1
n211.out → n209.formula1
n8.out → n209.atom2
n14.out → n209.formula2
n208.out → n207.a
n209.out → n207.b
n21.out → n212.assertion
n7.out → n212.atom1
n14.out → n212.formula1
n8.out → n212.atom2
n205.out → n212.formula2
n13.out → n212.atom3
n210.out → n212.formula3
n207.out → n206.a
n212.out → n206.b
n200.out → n199.a
n206.out → n199.b
n21.out → n215.assertion
n8.out → n215.atom1
n179.out → n215.formula1
n13.out → n215.atom2
n204.out → n215.formula2
n9.out → n216.assertion
n7.out → n217.a
n204.out → n217.b
n192.out → n218.a
n217.out → n218.b
n210.out → n219.a
n218.out → n219.b
n7.out → n216.atom1
n219.out → n216.formula1
n8.out → n216.atom2
n14.out → n216.formula2
n215.out → n214.a
n216.out → n214.b
n21.out → n220.assertion
n7.out → n220.atom1
n14.out → n220.formula1
n8.out → n220.atom2
n210.out → n220.formula2
n13.out → n220.atom3
n218.out → n220.formula3
n214.out → n213.a
n220.out → n213.b
n199.out → n198.a
n213.out → n198.b
n21.out → n221.assertion
n7.out → n221.atom1
n14.out → n221.formula1
n8.out → n221.atom2
n192.out → n221.formula2
n13.out → n221.atom3
n217.out → n221.formula3
n198.out → n197.a
n221.out → n197.b
n163.out → n162.a
n197.out → n162.b
n21.out → n224.assertion
n8.out → n224.atom1
n61.out → n224.formula1
n13.out → n224.atom2
n203.out → n224.formula2
n9.out → n225.assertion
n7.out → n226.a
n203.out → n226.b
n62.out → n227.a
n226.out → n227.b
n217.out → n228.a
n227.out → n228.b
n7.out → n225.atom1
n228.out → n225.formula1
n8.out → n225.atom2
n14.out → n225.formula2
n224.out → n223.a
n225.out → n223.b
n21.out → n229.assertion
n7.out → n229.atom1
n14.out → n229.formula1
n8.out → n229.atom2
n217.out → n229.formula2
n13.out → n229.atom3
n227.out → n229.formula3
n223.out → n222.a
n229.out → n222.b
n162.out → n161.a
n222.out → n161.b
n21.out → n230.assertion
n7.out → n230.atom1
n14.out → n230.formula1
n8.out → n230.atom2
n62.out → n230.formula2
n13.out → n230.atom3
n226.out → n230.formula3
n161.out → n160.a
n230.out → n160.b
n58.out → n1.a
n160.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-31 · 预线性

- 目标：`⊢ ( ( ( P → Q ) → ( P → R ) ) → ( P → ( Q → R ) ) )`
- 提示：((A→B)→(A→C))→(A→(B→C)) 的另一形式。
- 参考解：81 个模块 / 235 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  mp
n5  定理 *undefined
n6  subst(groups=0)
n7  atom P
n8  atom Q
n9  imp
n10  atom R
n11  imp
n12  imp
n15  axiom A1
n16  subst(groups=0)
n19  imp
n21  axiom A2
n23  mp
n24  mp
n25  mp
n26  mp
n27  mp
n29  subst(groups=1)
n30  mp
n31  mp
n33  subst(groups=1)
n35  subst(groups=0)
n36  imp
n37  imp
n39  subst(groups=2)
n40  mp
n41  mp
n42  mp
n44  subst(groups=2)
n46  subst(groups=0)
n47  imp
n48  imp
n50  subst(groups=2)
n52  subst(groups=2)
n54  subst(groups=1)
n55  imp
n56  imp
n58  subst(groups=2)
n59  mp
n60  mp
n62  subst(groups=1)
n64  subst(groups=1)
n65  imp
n66  imp
n68  subst(groups=2)
n69  mp
n70  mp
n71  mp
n72  mp
n73  定理 *undefined
n74  subst(groups=0)
n76  subst(groups=1)
n77  imp
n78  imp
n79  mp
n80  mp
n81  mp
n82  mp
n83  定理 *undefined
n84  subst(groups=2)
n86  subst(groups=1)
n87  imp
n88  imp
n89  imp
n91  subst(groups=1)
n93  subst(groups=1)
n94  imp
n95  imp
n97  subst(groups=2)
n98  mp
n99  mp
n101  subst(groups=1)
n103  subst(groups=1)
n104  imp
n105  imp
n106  imp
n108  subst(groups=2)
n110  subst(groups=2)

接线：
n5.out → n6.assertion
n7.out → n9.a
n8.out → n9.b
n7.out → n11.a
n10.out → n11.b
n9.out → n12.a
n11.out → n12.b
n7.out → n6.atom1
n12.out → n6.formula1
n15.out → n16.assertion
n7.out → n16.atom1
n12.out → n16.formula1
n8.out → n19.a
n12.out → n19.b
n15.out → n29.assertion
n7.out → n29.atom1
n8.out → n29.formula1
n8.out → n29.atom2
n7.out → n29.formula2
n15.out → n33.assertion
n7.out → n33.atom1
n9.out → n33.formula1
n8.out → n33.atom2
n12.out → n33.formula2
n15.out → n35.assertion
n12.out → n36.a
n9.out → n36.b
n9.out → n37.a
n36.out → n37.b
n7.out → n35.atom1
n37.out → n35.formula1
n33.out → n31.a
n35.out → n31.b
n21.out → n39.assertion
n7.out → n39.atom1
n8.out → n39.formula1
n8.out → n39.atom2
n9.out → n39.formula2
n10.out → n39.atom3
n36.out → n39.formula3
n31.out → n30.a
n39.out → n30.b
n29.out → n27.a
n30.out → n27.b
n21.out → n44.assertion
n7.out → n44.atom1
n12.out → n44.formula1
n8.out → n44.atom2
n9.out → n44.formula2
n10.out → n44.atom3
n11.out → n44.formula3
n6.out → n42.a
n44.out → n42.b
n15.out → n46.assertion
n12.out → n47.a
n11.out → n47.b
n36.out → n48.a
n47.out → n48.b
n7.out → n46.atom1
n48.out → n46.formula1
n42.out → n41.a
n46.out → n41.b
n21.out → n50.assertion
n7.out → n50.atom1
n8.out → n50.formula1
n8.out → n50.atom2
n36.out → n50.formula2
n10.out → n50.atom3
n47.out → n50.formula3
n41.out → n40.a
n50.out → n40.b
n27.out → n26.a
n40.out → n26.b
n21.out → n52.assertion
n7.out → n52.atom1
n8.out → n52.formula1
n8.out → n52.atom2
n12.out → n52.formula2
n10.out → n52.atom3
n11.out → n52.formula3
n26.out → n25.a
n52.out → n25.b
n15.out → n54.assertion
n8.out → n55.a
n11.out → n55.b
n19.out → n56.a
n55.out → n56.b
n7.out → n54.atom1
n56.out → n54.formula1
n8.out → n54.atom2
n12.out → n54.formula2
n25.out → n24.a
n54.out → n24.b
n21.out → n58.assertion
n7.out → n58.atom1
n12.out → n58.formula1
n8.out → n58.atom2
n19.out → n58.formula2
n10.out → n58.atom3
n55.out → n58.formula3
n24.out → n23.a
n58.out → n23.b
n16.out → n3.a
n23.out → n3.b
n15.out → n62.assertion
n7.out → n62.atom1
n55.out → n62.formula1
n8.out → n62.atom2
n7.out → n62.formula2
n15.out → n64.assertion
n7.out → n65.a
n55.out → n65.b
n55.out → n66.a
n65.out → n66.b
n7.out → n64.atom1
n66.out → n64.formula1
n8.out → n64.atom2
n12.out → n64.formula2
n62.out → n60.a
n64.out → n60.b
n21.out → n68.assertion
n7.out → n68.atom1
n12.out → n68.formula1
n8.out → n68.atom2
n55.out → n68.formula2
n10.out → n68.atom3
n65.out → n68.formula3
n60.out → n59.a
n68.out → n59.b
n3.out → n2.a
n59.out → n2.b
n73.out → n74.assertion
n8.out → n74.atom1
n10.out → n74.formula1
n15.out → n76.assertion
n11.out → n77.a
n10.out → n77.b
n7.out → n78.a
n77.out → n78.b
n7.out → n76.atom1
n78.out → n76.formula1
n8.out → n76.atom2
n12.out → n76.formula2
n74.out → n72.a
n76.out → n72.b
n83.out → n84.assertion
n7.out → n84.atom1
n11.out → n84.formula1
n8.out → n84.atom2
n10.out → n84.formula2
n10.out → n84.atom3
n8.out → n84.formula3
n15.out → n86.assertion
n8.out → n87.a
n10.out → n87.b
n55.out → n88.a
n87.out → n88.b
n77.out → n89.a
n88.out → n89.b
n7.out → n86.atom1
n89.out → n86.formula1
n8.out → n86.atom2
n7.out → n86.formula2
n84.out → n82.a
n86.out → n82.b
n21.out → n91.assertion
n8.out → n91.atom1
n77.out → n91.formula1
n10.out → n91.atom2
n88.out → n91.formula2
n82.out → n81.a
n91.out → n81.b
n15.out → n93.assertion
n7.out → n94.a
n88.out → n94.b
n78.out → n95.a
n94.out → n95.b
n7.out → n93.atom1
n95.out → n93.formula1
n8.out → n93.atom2
n12.out → n93.formula2
n81.out → n80.a
n93.out → n80.b
n21.out → n97.assertion
n7.out → n97.atom1
n12.out → n97.formula1
n8.out → n97.atom2
n78.out → n97.formula2
n10.out → n97.atom3
n94.out → n97.formula3
n80.out → n79.a
n97.out → n79.b
n72.out → n71.a
n79.out → n71.b
n21.out → n101.assertion
n8.out → n101.atom1
n55.out → n101.formula1
n10.out → n101.atom2
n87.out → n101.formula2
n15.out → n103.assertion
n7.out → n104.a
n87.out → n104.b
n65.out → n105.a
n104.out → n105.b
n94.out → n106.a
n105.out → n106.b
n7.out → n103.atom1
n106.out → n103.formula1
n8.out → n103.atom2
n12.out → n103.formula2
n101.out → n99.a
n103.out → n99.b
n21.out → n108.assertion
n7.out → n108.atom1
n12.out → n108.formula1
n8.out → n108.atom2
n94.out → n108.formula2
n10.out → n108.atom3
n105.out → n108.formula3
n99.out → n98.a
n108.out → n98.b
n71.out → n70.a
n98.out → n70.b
n21.out → n110.assertion
n7.out → n110.atom1
n12.out → n110.formula1
n8.out → n110.atom2
n65.out → n110.formula2
n10.out → n110.atom3
n104.out → n110.formula3
n70.out → n69.a
n110.out → n69.b
n2.out → n1.a
n69.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-32 · 反证法

- 目标：`⊢ ( ( ¬ P → P ) → P )`
- 提示：(¬A→A)→A：如果否定 A 能推出 A，那么 A 成立。
- 参考解：18 个模块 / 33 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  定理 *undefined
n3  subst(groups=0)
n4  atom P
n5  not
n6  imp
n7  mp
n8  mp
n12  mp
n13  定理 *undefined
n14  subst(groups=0)
n15  atom Q
n16  not
n17  axiom A2
n18  subst(groups=2)
n19  atom R
n26  定理 *undefined
n37  subst(groups=2)

接线：
n2.out → n3.assertion
n4.out → n5.a
n5.out → n6.a
n4.out → n6.b
n4.out → n3.atom1
n6.out → n3.formula1
n13.out → n14.assertion
n6.out → n16.a
n15.out → n14.atom1
n16.out → n14.formula1
n17.out → n18.assertion
n4.out → n18.atom1
n5.out → n18.formula1
n15.out → n18.atom2
n4.out → n18.formula2
n19.out → n18.atom3
n16.out → n18.formula3
n14.out → n12.a
n18.out → n12.b
n12.out → n8.a
n26.out → n8.b
n17.out → n37.assertion
n4.out → n37.atom1
n6.out → n37.formula1
n15.out → n37.atom2
n6.out → n37.formula2
n19.out → n37.atom3
n4.out → n37.formula3
n8.out → n7.a
n37.out → n7.b
n3.out → n1.a
n7.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-33 · 简化蕴涵

- 目标：`⊢ ( ¬ ( P → ¬ Q ) → Q )`
- 提示：¬(A→¬B)→B：否定一个蕴涵可以得到后件。
- 参考解：46 个模块 / 125 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n7  atom P
n8  atom Q
n9  not
n12  axiom A1
n13  subst(groups=1)
n16  imp
n18  axiom A2
n20  atom R
n45  定理 *undefined
n95  axiom A3
n110  mp
n111  mp
n112  mp
n117  subst(groups=1)
n118  not
n119  not
n120  not
n123  imp
n127  mp
n128  mp
n129  mp
n131  mp
n133  subst(groups=0)
n134  mp
n135  mp
n137  subst(groups=1)
n139  subst(groups=1)
n140  imp
n141  imp
n143  subst(groups=2)
n161  subst(groups=2)
n163  subst(groups=1)
n164  imp
n165  imp
n167  subst(groups=2)
n168  mp
n169  mp
n171  subst(groups=1)
n173  subst(groups=1)
n174  imp
n175  imp
n177  subst(groups=2)
n179  subst(groups=2)
n181  subst(groups=1)

接线：
n8.out → n9.a
n12.out → n13.assertion
n7.out → n13.atom1
n9.out → n13.formula1
n8.out → n13.atom2
n7.out → n13.formula2
n7.out → n16.a
n9.out → n16.b
n12.out → n117.assertion
n7.out → n117.atom1
n9.out → n117.formula1
n16.out → n118.a
n118.out → n119.a
n119.out → n120.a
n8.out → n117.atom2
n120.out → n117.formula2
n120.out → n123.a
n9.out → n123.b
n45.out → n133.assertion
n7.out → n133.atom1
n118.out → n133.formula1
n12.out → n137.assertion
n7.out → n137.atom1
n118.out → n137.formula1
n8.out → n137.atom2
n9.out → n137.formula2
n12.out → n139.assertion
n9.out → n140.a
n118.out → n140.b
n118.out → n141.a
n140.out → n141.b
n7.out → n139.atom1
n141.out → n139.formula1
n8.out → n139.atom2
n120.out → n139.formula2
n137.out → n135.a
n139.out → n135.b
n18.out → n143.assertion
n7.out → n143.atom1
n120.out → n143.formula1
n8.out → n143.atom2
n118.out → n143.formula2
n20.out → n143.atom3
n140.out → n143.formula3
n135.out → n134.a
n143.out → n134.b
n133.out → n131.a
n134.out → n131.b
n18.out → n161.assertion
n7.out → n161.atom1
n120.out → n161.formula1
n8.out → n161.atom2
n9.out → n161.formula2
n20.out → n161.atom3
n118.out → n161.formula3
n131.out → n129.a
n161.out → n129.b
n12.out → n163.assertion
n120.out → n164.a
n118.out → n164.b
n123.out → n165.a
n164.out → n165.b
n7.out → n163.atom1
n165.out → n163.formula1
n8.out → n163.atom2
n9.out → n163.formula2
n129.out → n128.a
n163.out → n128.b
n18.out → n167.assertion
n7.out → n167.atom1
n9.out → n167.formula1
n8.out → n167.atom2
n123.out → n167.formula2
n20.out → n167.atom3
n164.out → n167.formula3
n128.out → n127.a
n167.out → n127.b
n117.out → n112.a
n127.out → n112.b
n95.out → n171.assertion
n7.out → n171.atom1
n119.out → n171.formula1
n8.out → n171.atom2
n16.out → n171.formula2
n12.out → n173.assertion
n16.out → n174.a
n119.out → n174.b
n164.out → n175.a
n174.out → n175.b
n7.out → n173.atom1
n175.out → n173.formula1
n8.out → n173.atom2
n9.out → n173.formula2
n171.out → n169.a
n173.out → n169.b
n18.out → n177.assertion
n7.out → n177.atom1
n9.out → n177.formula1
n8.out → n177.atom2
n164.out → n177.formula2
n20.out → n177.atom3
n174.out → n177.formula3
n169.out → n168.a
n177.out → n168.b
n112.out → n111.a
n168.out → n111.b
n18.out → n179.assertion
n7.out → n179.atom1
n9.out → n179.formula1
n8.out → n179.atom2
n16.out → n179.formula2
n20.out → n179.atom3
n119.out → n179.formula3
n111.out → n110.a
n179.out → n110.b
n13.out → n2.a
n110.out → n2.b
n95.out → n181.assertion
n7.out → n181.atom1
n8.out → n181.formula1
n8.out → n181.atom2
n118.out → n181.formula2
n2.out → n1.a
n181.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅰ-34 · 皮尔士律

- 目标：`⊢ ( ( ( P → Q ) → P ) → P )`
- 提示：((A→B)→A)→A：经典逻辑的标志性定理。
- 参考解：110 个模块 / 320 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  定理 *undefined
n3  subst(groups=0)
n4  atom P
n5  atom Q
n6  imp
n7  imp
n8  mp
n9  mp
n10  mp
n11  mp
n12  mp
n13  mp
n14  mp
n15  mp
n16  mp
n17  定理 *undefined
n18  mp
n19  mp
n20  mp
n24  not
n27  axiom A1
n28  subst(groups=1)
n29  not
n30  not
n31  not
n34  imp
n36  axiom A2
n38  atom R
n39  mp
n40  mp
n41  mp
n43  mp
n44  定理 *undefined
n45  subst(groups=0)
n46  mp
n47  mp
n49  subst(groups=1)
n51  subst(groups=1)
n52  imp
n53  imp
n55  subst(groups=2)
n73  subst(groups=2)
n75  subst(groups=1)
n76  imp
n77  imp
n79  subst(groups=2)
n80  mp
n81  mp
n82  axiom A3
n83  subst(groups=1)
n85  subst(groups=1)
n86  imp
n87  imp
n89  subst(groups=2)
n91  subst(groups=2)
n93  subst(groups=0)
n95  subst(groups=1)
n96  imp
n97  mp
n98  mp
n99  mp
n100  mp
n101  定理 *undefined
n103  subst(groups=1)
n104  not
n105  imp
n107  subst(groups=2)
n109  subst(groups=1)
n110  imp
n111  imp
n113  subst(groups=2)
n114  mp
n115  mp
n117  subst(groups=1)
n119  subst(groups=1)
n120  imp
n121  imp
n123  subst(groups=2)
n124  mp
n125  mp
n138  subst(groups=1)
n141  imp
n145  mp
n146  mp
n148  subst(groups=2)
n150  subst(groups=1)
n151  imp
n152  imp
n153  imp
n155  subst(groups=2)
n157  subst(groups=2)
n158  mp
n159  mp
n160  mp
n162  subst(groups=0)
n163  not
n165  subst(groups=2)
n167  subst(groups=1)
n168  imp
n169  imp
n171  subst(groups=2)
n172  mp
n173  mp
n175  subst(groups=0)
n177  subst(groups=1)
n178  imp
n179  imp
n181  subst(groups=2)
n183  subst(groups=2)

接线：
n2.out → n3.assertion
n4.out → n6.a
n5.out → n6.b
n6.out → n7.a
n4.out → n7.b
n4.out → n3.atom1
n7.out → n3.formula1
n4.out → n24.a
n27.out → n28.assertion
n4.out → n28.atom1
n24.out → n28.formula1
n6.out → n29.a
n29.out → n30.a
n30.out → n31.a
n5.out → n28.atom2
n31.out → n28.formula2
n31.out → n34.a
n24.out → n34.b
n44.out → n45.assertion
n4.out → n45.atom1
n29.out → n45.formula1
n27.out → n49.assertion
n4.out → n49.atom1
n29.out → n49.formula1
n5.out → n49.atom2
n24.out → n49.formula2
n27.out → n51.assertion
n24.out → n52.a
n29.out → n52.b
n29.out → n53.a
n52.out → n53.b
n4.out → n51.atom1
n53.out → n51.formula1
n5.out → n51.atom2
n31.out → n51.formula2
n49.out → n47.a
n51.out → n47.b
n36.out → n55.assertion
n4.out → n55.atom1
n31.out → n55.formula1
n5.out → n55.atom2
n29.out → n55.formula2
n38.out → n55.atom3
n52.out → n55.formula3
n47.out → n46.a
n55.out → n46.b
n45.out → n43.a
n46.out → n43.b
n36.out → n73.assertion
n4.out → n73.atom1
n31.out → n73.formula1
n5.out → n73.atom2
n24.out → n73.formula2
n38.out → n73.atom3
n29.out → n73.formula3
n43.out → n41.a
n73.out → n41.b
n27.out → n75.assertion
n31.out → n76.a
n29.out → n76.b
n34.out → n77.a
n76.out → n77.b
n4.out → n75.atom1
n77.out → n75.formula1
n5.out → n75.atom2
n24.out → n75.formula2
n41.out → n40.a
n75.out → n40.b
n36.out → n79.assertion
n4.out → n79.atom1
n24.out → n79.formula1
n5.out → n79.atom2
n34.out → n79.formula2
n38.out → n79.atom3
n76.out → n79.formula3
n40.out → n39.a
n79.out → n39.b
n28.out → n20.a
n39.out → n20.b
n82.out → n83.assertion
n4.out → n83.atom1
n30.out → n83.formula1
n5.out → n83.atom2
n6.out → n83.formula2
n27.out → n85.assertion
n6.out → n86.a
n30.out → n86.b
n76.out → n87.a
n86.out → n87.b
n4.out → n85.atom1
n87.out → n85.formula1
n5.out → n85.atom2
n24.out → n85.formula2
n83.out → n81.a
n85.out → n81.b
n36.out → n89.assertion
n4.out → n89.atom1
n24.out → n89.formula1
n5.out → n89.atom2
n76.out → n89.formula2
n38.out → n89.atom3
n86.out → n89.formula3
n81.out → n80.a
n89.out → n80.b
n20.out → n19.a
n80.out → n19.b
n36.out → n91.assertion
n4.out → n91.atom1
n24.out → n91.formula1
n5.out → n91.atom2
n6.out → n91.formula2
n38.out → n91.atom3
n30.out → n91.formula3
n19.out → n18.a
n91.out → n18.b
n17.out → n16.a
n18.out → n16.b
n82.out → n93.assertion
n5.out → n93.atom1
n29.out → n93.formula1
n16.out → n15.a
n93.out → n15.b
n27.out → n95.assertion
n29.out → n96.a
n4.out → n96.b
n4.out → n95.atom1
n96.out → n95.formula1
n5.out → n95.atom2
n7.out → n95.formula2
n15.out → n14.a
n95.out → n14.b
n27.out → n103.assertion
n24.out → n104.a
n4.out → n105.a
n104.out → n105.b
n4.out → n103.atom1
n105.out → n103.formula1
n5.out → n103.atom2
n29.out → n103.formula2
n101.out → n100.a
n103.out → n100.b
n36.out → n107.assertion
n4.out → n107.atom1
n29.out → n107.formula1
n5.out → n107.atom2
n4.out → n107.formula2
n38.out → n107.atom3
n104.out → n107.formula3
n100.out → n99.a
n107.out → n99.b
n27.out → n109.assertion
n29.out → n110.a
n104.out → n110.b
n96.out → n111.a
n110.out → n111.b
n4.out → n109.atom1
n111.out → n109.formula1
n5.out → n109.atom2
n7.out → n109.formula2
n99.out → n98.a
n109.out → n98.b
n36.out → n113.assertion
n4.out → n113.atom1
n7.out → n113.formula1
n5.out → n113.atom2
n96.out → n113.formula2
n38.out → n113.atom3
n110.out → n113.formula3
n98.out → n97.a
n113.out → n97.b
n14.out → n13.a
n97.out → n13.b
n82.out → n117.assertion
n4.out → n117.atom1
n6.out → n117.formula1
n5.out → n117.atom2
n24.out → n117.formula2
n27.out → n119.assertion
n24.out → n120.a
n6.out → n120.b
n110.out → n121.a
n120.out → n121.b
n4.out → n119.atom1
n121.out → n119.formula1
n5.out → n119.atom2
n7.out → n119.formula2
n117.out → n115.a
n119.out → n115.b
n36.out → n123.assertion
n4.out → n123.atom1
n7.out → n123.formula1
n5.out → n123.atom2
n110.out → n123.formula2
n38.out → n123.atom3
n120.out → n123.formula3
n115.out → n114.a
n123.out → n114.b
n13.out → n12.a
n114.out → n12.b
n27.out → n138.assertion
n4.out → n138.atom1
n7.out → n138.formula1
n5.out → n138.atom2
n24.out → n138.formula2
n24.out → n141.a
n7.out → n141.b
n36.out → n148.assertion
n4.out → n148.atom1
n24.out → n148.formula1
n5.out → n148.atom2
n6.out → n148.formula2
n38.out → n148.atom3
n4.out → n148.formula3
n27.out → n150.assertion
n24.out → n151.a
n4.out → n151.b
n120.out → n152.a
n151.out → n152.b
n141.out → n153.a
n152.out → n153.b
n4.out → n150.atom1
n153.out → n150.formula1
n5.out → n150.atom2
n7.out → n150.formula2
n148.out → n146.a
n150.out → n146.b
n36.out → n155.assertion
n4.out → n155.atom1
n7.out → n155.formula1
n5.out → n155.atom2
n141.out → n155.formula2
n38.out → n155.atom3
n152.out → n155.formula3
n146.out → n145.a
n155.out → n145.b
n138.out → n125.a
n145.out → n125.b
n36.out → n157.assertion
n4.out → n157.atom1
n7.out → n157.formula1
n5.out → n157.atom2
n120.out → n157.formula2
n38.out → n157.atom3
n151.out → n157.formula3
n125.out → n124.a
n157.out → n124.b
n12.out → n11.a
n124.out → n11.b
n17.out → n162.assertion
n7.out → n163.a
n5.out → n162.atom1
n163.out → n162.formula1
n36.out → n165.assertion
n4.out → n165.atom1
n24.out → n165.formula1
n5.out → n165.atom2
n4.out → n165.formula2
n38.out → n165.atom3
n163.out → n165.formula3
n162.out → n160.a
n165.out → n160.b
n27.out → n167.assertion
n24.out → n168.a
n163.out → n168.b
n151.out → n169.a
n168.out → n169.b
n4.out → n167.atom1
n169.out → n167.formula1
n5.out → n167.atom2
n7.out → n167.formula2
n160.out → n159.a
n167.out → n159.b
n36.out → n171.assertion
n4.out → n171.atom1
n7.out → n171.formula1
n5.out → n171.atom2
n151.out → n171.formula2
n38.out → n171.atom3
n168.out → n171.formula3
n159.out → n158.a
n171.out → n158.b
n11.out → n10.a
n158.out → n10.b
n82.out → n175.assertion
n5.out → n175.atom1
n7.out → n175.formula1
n27.out → n177.assertion
n7.out → n178.a
n4.out → n178.b
n168.out → n179.a
n178.out → n179.b
n4.out → n177.atom1
n179.out → n177.formula1
n5.out → n177.atom2
n7.out → n177.formula2
n175.out → n173.a
n177.out → n173.b
n36.out → n181.assertion
n4.out → n181.atom1
n7.out → n181.formula1
n5.out → n181.atom2
n168.out → n181.formula2
n38.out → n181.atom3
n178.out → n181.formula3
n173.out → n172.a
n181.out → n172.b
n10.out → n9.a
n172.out → n9.b
n36.out → n183.assertion
n4.out → n183.atom1
n7.out → n183.formula1
n5.out → n183.atom2
n7.out → n183.formula2
n38.out → n183.atom3
n4.out → n183.formula3
n9.out → n8.a
n183.out → n8.b
n3.out → n1.a
n8.out → n1.b
n1.out → nt.proof
```

</details>

## Ⅱ 章

### i · 全称引入

- 目标：`⊢ ( P → ∀ x P )`
- 提示：∀* · A ⇒ A → ∀x A
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

### ii · 全称例化

- 目标：`⊢ ( ∀ x P → P )`
- 提示：∀E* · ∀x A ⇒ A[t/x]
- 参考解：3 个模块 / 3 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n4  [target]
n1  all-inst(v=x)
n2  atom P
n3  term x

接线：
n2.out → n1.formula
n3.out → n1.term
n1.out → n4.proof
```

</details>

### iii · 全称推广

- 目标：`⊢ ∀ x ( P → ( Q → P ) )`
- 提示：∀I · A ⇒ ∀x A
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

### iv · 存在推广

- 目标：`⊢ ( P → ∃ x P )`
- 提示：∃I* · A[t/x] ⇒ ∃x A
- 参考解：3 个模块 / 3 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n4  [target]
n1  exists-gen(v=x)
n2  atom P
n3  term x

接线：
n2.out → n1.formula
n3.out → n1.term
n1.out → n4.proof
```

</details>

### v · 全称分配公理

- 目标：`⊢ ( ∀ x ( P → Q ) → ( ∀ x P → ∀ x Q ) )`
- 提示：A5 · ∀x(P→Q) ⇒ ∀xP → ∀xQ
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

### Ⅱ-01 · 引理 · ∀x G(x)→G(x)

- 目标：`⊢ ( ∀ x G ( x ) → G ( x ) )`
- 提示：第Ⅱ章先证：∀x G(x)→G(x)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=0)
n2  axiom A4(v=x)
n3  atom P
n4  pred G
n5  term x

接线：
n2.out → n1.assertion
n5.out → n4.t1
n3.out → n1.atom1
n4.out → n1.formula1
n1.out → nt.proof
```

</details>

### Ⅱ-02 · 引理 · F(x)→G(x)→F(x)

- 目标：`⊢ ( F ( x ) → ( G ( x ) → F ( x ) ) )`
- 提示：第Ⅱ章先证：F(x)→G(x)→F(x)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：7 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=1)
n2  axiom A1
n3  atom P
n4  pred F
n5  atom Q
n6  pred G
n7  term x

接线：
n2.out → n1.assertion
n7.out → n4.t1
n3.out → n1.atom1
n4.out → n1.formula1
n7.out → n6.t1
n5.out → n1.atom2
n6.out → n1.formula2
n1.out → nt.proof
```

</details>

### Ⅱ-03 · 引理 · ∀x (F(x)→G(x)→F(x))

- 目标：`⊢ ∀ x ( F ( x ) → ( G ( x ) → F ( x ) ) )`
- 提示：第Ⅱ章先证：∀x (F(x)→G(x)→F(x))。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：8 个模块 / 9 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=x)
n2  subst(groups=1)
n3  axiom A1
n4  atom P
n5  pred F
n6  atom Q
n7  pred G
n8  term x

接线：
n3.out → n2.assertion
n8.out → n5.t1
n4.out → n2.atom1
n5.out → n2.formula1
n8.out → n7.t1
n6.out → n2.atom2
n7.out → n2.formula2
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅱ-04 · 引理 · (G(y)→∀x G(y))→F(x)→

- 目标：`⊢ ( ( G ( y ) → ∀ x G ( y ) ) → ( F ( x ) → ( G ( y ) → ∀ x G ( y ) ) ) )`
- 提示：第Ⅱ章先证：(G(y)→∀x G(y))→F(x)→G(y)→∀x G(y)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：10 个模块 / 11 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=1)
n2  axiom A1
n3  atom P
n4  imp
n5  atom Q
n6  pred F
n7  term x
n8  pred G
n9  all(v=x)
n10  term y

接线：
n10.out → n8.t1
n2.out → n1.assertion
n8.out → n9.a
n8.out → n4.a
n9.out → n4.b
n3.out → n1.atom1
n4.out → n1.formula1
n7.out → n6.t1
n5.out → n1.atom2
n6.out → n1.formula2
n1.out → nt.proof
```

</details>

### Ⅱ-05 · 引理 · F(x)→∀x G(x)→G(x)

- 目标：`⊢ ( F ( x ) → ( ∀ x G ( x ) → G ( x ) ) )`
- 提示：第Ⅱ章先证：F(x)→∀x G(x)→G(x)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：12 个模块 / 16 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  subst(groups=0)
n3  subst(groups=1)
n4  axiom A1
n5  atom P
n6  imp
n7  atom Q
n8  pred F
n9  term x
n10  all(v=x)
n11  pred G
n12  axiom A4(v=x)

接线：
n12.out → n2.assertion
n9.out → n11.t1
n5.out → n2.atom1
n11.out → n2.formula1
n4.out → n3.assertion
n11.out → n10.a
n10.out → n6.a
n11.out → n6.b
n5.out → n3.atom1
n6.out → n3.formula1
n9.out → n8.t1
n7.out → n3.atom2
n8.out → n3.formula2
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-06 · 引理 · F(x)→(H(x)→F(x))→G(x

- 目标：`⊢ ( F ( x ) → ( ( H ( x ) → F ( x ) ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) ) )`
- 提示：第Ⅱ章先证：F(x)→(H(x)→F(x))→G(x)→H(x)→F(x)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：13 个模块 / 22 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  subst(groups=1)
n3  subst(groups=1)
n4  axiom A1
n5  atom P
n6  imp
n7  atom Q
n8  pred F
n9  term x
n10  imp
n11  imp
n12  pred G
n13  pred H

接线：
n9.out → n8.t1
n9.out → n13.t1
n13.out → n10.a
n8.out → n10.b
n4.out → n2.assertion
n5.out → n2.atom1
n10.out → n2.formula1
n9.out → n12.t1
n7.out → n2.atom2
n12.out → n2.formula2
n4.out → n3.assertion
n12.out → n11.a
n10.out → n11.b
n10.out → n6.a
n11.out → n6.b
n5.out → n3.atom1
n6.out → n3.formula1
n7.out → n3.atom2
n8.out → n3.formula2
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-07 · 引理 · (∀x (G(x)→H(x))→∀x G

- 目标：`⊢ ( ( ∀ x ( G ( x ) → H ( x ) ) → ( ∀ x G ( x ) → ∀ x H ( x ) ) ) → ( ∀ x F ( x ) → ( ∀ x ( G ( x ) → H ( x ) ) → ( ∀ x G ( x ) → ∀ x H ( x ) ) ) ) )`
- 提示：第Ⅱ章先证：(∀x (G(x)→H(x))→∀x G(x)→∀x H(x))→∀x F(x)→∀x (G(x)→H(x))→∀x G(x)→∀x H(x)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：15 个模块 / 19 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=1)
n2  axiom A1
n3  atom P
n4  imp
n5  atom Q
n6  all(v=x)
n7  pred F
n8  term x
n9  all(v=x)
n10  imp
n11  all(v=x)
n12  all(v=x)
n13  pred H
n14  pred G
n15  imp

接线：
n8.out → n7.t1
n8.out → n14.t1
n8.out → n13.t1
n14.out → n15.a
n13.out → n15.b
n2.out → n1.assertion
n15.out → n9.a
n14.out → n11.a
n13.out → n12.a
n11.out → n10.a
n12.out → n10.b
n9.out → n4.a
n10.out → n4.b
n3.out → n1.atom1
n4.out → n1.formula1
n7.out → n6.a
n5.out → n1.atom2
n6.out → n1.formula2
n1.out → nt.proof
```

</details>

### Ⅱ-08 · 引理 · F(x)→∀x (G(x)→H(x))→

- 目标：`⊢ ( F ( x ) → ( ∀ x ( G ( x ) → H ( x ) ) → ( ∀ x G ( x ) → ∀ x H ( x ) ) ) )`
- 提示：第Ⅱ章先证：F(x)→∀x (G(x)→H(x))→∀x G(x)→∀x H(x)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：17 个模块 / 25 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  subst(groups=1)
n3  subst(groups=1)
n4  axiom A1
n5  atom P
n6  imp
n7  atom Q
n8  pred F
n9  term x
n10  all(v=x)
n11  imp
n12  all(v=x)
n13  all(v=x)
n14  pred H
n15  pred G
n16  imp
n17  axiom A5(v=x)

接线：
n17.out → n2.assertion
n9.out → n15.t1
n5.out → n2.atom1
n15.out → n2.formula1
n9.out → n14.t1
n7.out → n2.atom2
n14.out → n2.formula2
n4.out → n3.assertion
n15.out → n16.a
n14.out → n16.b
n16.out → n10.a
n15.out → n12.a
n14.out → n13.a
n12.out → n11.a
n13.out → n11.b
n10.out → n6.a
n11.out → n6.b
n5.out → n3.atom1
n6.out → n3.formula1
n9.out → n8.t1
n7.out → n3.atom2
n8.out → n3.formula2
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-09 · 引理 · ∀x F(x)→∀x (G(x)→H(x

- 目标：`⊢ ( ∀ x F ( x ) → ( ∀ x ( G ( x ) → H ( x ) ) → ( ∀ x G ( x ) → ∀ x H ( x ) ) ) )`
- 提示：第Ⅱ章先证：∀x F(x)→∀x (G(x)→H(x))→∀x G(x)→∀x H(x)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：18 个模块 / 26 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  subst(groups=1)
n3  subst(groups=1)
n4  axiom A1
n5  atom P
n6  imp
n7  atom Q
n8  all(v=x)
n9  pred F
n10  term x
n11  all(v=x)
n12  imp
n13  all(v=x)
n14  all(v=x)
n15  pred H
n16  pred G
n17  imp
n18  axiom A5(v=x)

接线：
n10.out → n9.t1
n10.out → n16.t1
n10.out → n15.t1
n16.out → n17.a
n15.out → n17.b
n18.out → n2.assertion
n5.out → n2.atom1
n16.out → n2.formula1
n7.out → n2.atom2
n15.out → n2.formula2
n4.out → n3.assertion
n17.out → n11.a
n16.out → n13.a
n15.out → n14.a
n13.out → n12.a
n14.out → n12.b
n11.out → n6.a
n12.out → n6.b
n5.out → n3.atom1
n6.out → n3.formula1
n9.out → n8.a
n7.out → n3.atom2
n8.out → n3.formula2
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-10 · 引理 · (F(z)→∀x F(z))→F(z)→

- 目标：`⊢ ( ( F ( z ) → ∀ x F ( z ) ) → ( F ( z ) → ∀ x ∀ y F ( z ) ) )`
- 提示：第Ⅱ章先证：(F(z)→∀x F(z))→F(z)→∀x ∀y F(z)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：20 个模块 / 32 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  subst(groups=2)
n4  axiom A2
n5  atom P
n6  pred F
n7  atom Q
n8  all(v=x)
n9  atom R
n10  all(v=x)
n11  all(v=y)
n12  term z
n13  mp
n14  subst(groups=1)
n15  axiom A1
n16  imp
n17  gen(v=x)
n18  subst(groups=1)
n19  axiom A5(v=x)
n20  shift(v=y)

接线：
n12.out → n6.t1
n6.out → n20.formula
n6.out → n11.a
n20.out → n17.assertion
n19.out → n18.assertion
n5.out → n18.atom1
n6.out → n18.formula1
n7.out → n18.atom2
n11.out → n18.formula2
n17.out → n13.a
n18.out → n13.b
n15.out → n14.assertion
n6.out → n8.a
n11.out → n10.a
n8.out → n16.a
n10.out → n16.b
n5.out → n14.atom1
n16.out → n14.formula1
n7.out → n14.atom2
n6.out → n14.formula2
n13.out → n2.a
n14.out → n2.b
n4.out → n3.assertion
n5.out → n3.atom1
n6.out → n3.formula1
n7.out → n3.atom2
n8.out → n3.formula2
n9.out → n3.atom3
n10.out → n3.formula3
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-11 · 前件提取

- 目标：`⊢ ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → G ( x ) ) )`
- 提示：P→∀xQ 与 P→Q 的辖域关系。
- 参考解：11 个模块 / 13 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  定理 *undefined
n5  atom P
n6  term x
n7  pred G
n10  all(v=x)
n12  atom Q
n13  pred F
n14  axiom A2
n15  subst(groups=2)
n16  atom R

接线：
n6.out → n7.t1
n7.out → n10.a
n6.out → n13.t1
n14.out → n15.assertion
n5.out → n15.atom1
n13.out → n15.formula1
n12.out → n15.atom2
n10.out → n15.formula2
n16.out → n15.atom3
n7.out → n15.formula3
n2.out → n1.a
n15.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-12 · 全称弱化

- 目标：`⊢ ( ∀ x F ( x ) → ∀ x ( G ( x ) → F ( x ) ) )`
- 提示：∀xF(x) → ∀x(F(x)→G(x))? 由公理 A1 的全称形式。
- 参考解：10 个模块 / 12 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  定理 *undefined
n5  atom P
n6  term x
n7  pred F
n8  atom Q
n9  pred G
n10  axiom A5(v=x)
n11  subst(groups=1)
n12  imp

接线：
n6.out → n7.t1
n6.out → n9.t1
n10.out → n11.assertion
n5.out → n11.atom1
n7.out → n11.formula1
n9.out → n12.a
n7.out → n12.b
n8.out → n11.atom2
n12.out → n11.formula2
n2.out → n1.a
n11.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-13 · 嵌套全称引入

- 目标：`⊢ ( F ( x ) → ( G ( y ) → ∀ x G ( y ) ) )`
- 提示：P→(Q→∀xQ) 的谓词实例。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  shift(v=x)
n3  term y
n4  pred G
n6  定理 *undefined

接线：
n3.out → n4.t1
n4.out → n2.formula
n2.out → n1.a
n6.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-14 · 双重量词消去

- 目标：`⊢ ( ∀ x ∀ y F ( x ) → F ( x ) )`
- 提示：∀x∀yF(x)→F(x) 的双重实例化。
- 参考解：19 个模块 / 30 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
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
n1.out → nt.proof
```

</details>

### Ⅱ-15 · 三段全称分配

- 目标：`⊢ ( ∀ x ( F ( x ) → ( G ( x ) → H ( x ) ) ) → ( ∀ x F ( x ) → ( ∀ x G ( x ) → ∀ x H ( x ) ) ) )`
- 提示：∀x(F→(G→H)) 分配到三个前件。
- 参考解：30 个模块 / 53 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
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
n14  定理 *undefined
n17  axiom A1
n19  all(v=x)
n20  all(v=x)
n21  all(v=x)
n22  imp
n24  all(v=x)
n25  axiom A2
n26  subst(groups=2)
n27  atom R
n29  subst(groups=1)
n30  imp
n31  imp
n32  imp
n33  imp
n34  all(v=x)
n36  subst(groups=2)

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
n10.out → n19.a
n8.out → n20.a
n9.out → n21.a
n20.out → n22.a
n21.out → n22.b
n6.out → n24.a
n25.out → n26.assertion
n4.out → n26.atom1
n24.out → n26.formula1
n7.out → n26.atom2
n19.out → n26.formula2
n27.out → n26.atom3
n22.out → n26.formula3
n14.out → n13.a
n26.out → n13.b
n17.out → n29.assertion
n24.out → n30.a
n19.out → n30.b
n24.out → n31.a
n22.out → n31.b
n30.out → n32.a
n31.out → n32.b
n4.out → n29.atom1
n32.out → n29.formula1
n6.out → n33.a
n10.out → n33.b
n33.out → n34.a
n7.out → n29.atom2
n34.out → n29.formula2
n13.out → n12.a
n29.out → n12.b
n25.out → n36.assertion
n4.out → n36.atom1
n34.out → n36.formula1
n7.out → n36.atom2
n30.out → n36.formula2
n27.out → n36.atom3
n31.out → n36.formula3
n12.out → n11.a
n36.out → n11.b
n3.out → n1.a
n11.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-16 · 混合三段论

- 目标：`⊢ ( ( F ( x ) → ∀ x ( G ( x ) → H ( x ) ) ) → ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )`
- 提示：P→∀x(Q→R) 与 P→∀xQ 推出 P→∀xR。
- 参考解：29 个模块 / 57 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  定理 *undefined
n6  atom P
n7  term x
n8  pred G
n9  atom Q
n10  pred H
n11  axiom A1
n13  imp
n14  all(v=x)
n15  all(v=x)
n16  all(v=x)
n17  imp
n19  pred F
n20  axiom A2
n21  subst(groups=2)
n22  atom R
n23  mp
n24  mp
n26  subst(groups=2)
n28  subst(groups=1)
n29  imp
n30  imp
n31  imp
n32  imp
n33  imp
n34  imp
n36  subst(groups=2)

接线：
n7.out → n8.t1
n7.out → n10.t1
n8.out → n13.a
n10.out → n13.b
n13.out → n14.a
n8.out → n15.a
n10.out → n16.a
n15.out → n17.a
n16.out → n17.b
n7.out → n19.t1
n20.out → n21.assertion
n6.out → n21.atom1
n19.out → n21.formula1
n9.out → n21.atom2
n14.out → n21.formula2
n22.out → n21.atom3
n17.out → n21.formula3
n3.out → n2.a
n21.out → n2.b
n20.out → n26.assertion
n6.out → n26.atom1
n19.out → n26.formula1
n9.out → n26.atom2
n15.out → n26.formula2
n22.out → n26.atom3
n16.out → n26.formula3
n11.out → n28.assertion
n19.out → n29.a
n17.out → n29.b
n19.out → n30.a
n15.out → n30.b
n19.out → n31.a
n16.out → n31.b
n30.out → n32.a
n31.out → n32.b
n29.out → n33.a
n32.out → n33.b
n6.out → n28.atom1
n33.out → n28.formula1
n19.out → n34.a
n14.out → n34.b
n9.out → n28.atom2
n34.out → n28.formula2
n26.out → n24.a
n28.out → n24.b
n20.out → n36.assertion
n6.out → n36.atom1
n34.out → n36.formula1
n9.out → n36.atom2
n29.out → n36.formula2
n22.out → n36.atom3
n32.out → n36.formula3
n24.out → n23.a
n36.out → n23.b
n2.out → n1.a
n23.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-17 · 全称三段论

- 目标：`⊢ ( ∀ x ( G ( x ) → H ( x ) ) → ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )`
- 提示：∀x(G→H) 把 P→∀xG 接到 P→∀xH。
- 参考解：34 个模块 / 76 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
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
n19  subst(groups=1)
n20  imp
n21  imp
n22  imp
n23  all(v=x)
n24  axiom A2
n25  subst(groups=2)
n26  atom R
n27  mp
n28  mp
n30  subst(groups=2)
n32  subst(groups=1)
n33  imp
n34  imp
n35  imp
n36  imp
n38  subst(groups=2)

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
n12.out → n19.assertion
n17.out → n20.a
n16.out → n20.b
n16.out → n21.a
n20.out → n21.b
n5.out → n19.atom1
n21.out → n19.formula1
n7.out → n22.a
n9.out → n22.b
n22.out → n23.a
n8.out → n19.atom2
n23.out → n19.formula2
n13.out → n11.a
n19.out → n11.b
n24.out → n25.assertion
n5.out → n25.atom1
n23.out → n25.formula1
n8.out → n25.atom2
n16.out → n25.formula2
n26.out → n25.atom3
n20.out → n25.formula3
n11.out → n10.a
n25.out → n10.b
n4.out → n2.a
n10.out → n2.b
n24.out → n30.assertion
n5.out → n30.atom1
n17.out → n30.formula1
n8.out → n30.atom2
n14.out → n30.formula2
n26.out → n30.atom3
n15.out → n30.formula3
n12.out → n32.assertion
n17.out → n33.a
n14.out → n33.b
n17.out → n34.a
n15.out → n34.b
n33.out → n35.a
n34.out → n35.b
n20.out → n36.a
n35.out → n36.b
n5.out → n32.atom1
n36.out → n32.formula1
n8.out → n32.atom2
n23.out → n32.formula2
n30.out → n28.a
n32.out → n28.b
n24.out → n38.assertion
n5.out → n38.atom1
n23.out → n38.formula1
n8.out → n38.atom2
n20.out → n38.formula2
n26.out → n38.atom3
n35.out → n38.formula3
n28.out → n27.a
n38.out → n27.b
n2.out → n1.a
n27.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-18 · 双层分配

- 目标：`⊢ ( ∀ x ∀ y ( F ( x ) → G ( x ) ) → ( ∀ x ∀ y F ( x ) → ∀ x ∀ y G ( x ) ) )`
- 提示：∀x∀y(F→G) 的分配。
- 参考解：40 个模块 / 79 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
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
n23  subst(groups=1)
n24  axiom A1
n25  subst(groups=1)
n26  all(v=x)
n27  all(v=x)
n28  all(v=x)
n29  imp
n30  imp
n31  all(v=x)
n32  axiom A2
n33  subst(groups=2)
n34  atom R
n36  subst(groups=1)
n37  imp
n38  imp
n39  imp
n40  imp
n41  all(v=x)
n43  subst(groups=2)

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
n11.out → n23.assertion
n5.out → n23.atom1
n15.out → n23.formula1
n8.out → n23.atom2
n16.out → n23.formula2
n24.out → n25.assertion
n17.out → n26.a
n15.out → n27.a
n16.out → n28.a
n27.out → n29.a
n28.out → n29.b
n26.out → n30.a
n29.out → n30.b
n5.out → n25.atom1
n30.out → n25.formula1
n14.out → n31.a
n8.out → n25.atom2
n31.out → n25.formula2
n23.out → n21.a
n25.out → n21.b
n32.out → n33.assertion
n5.out → n33.atom1
n31.out → n33.formula1
n8.out → n33.atom2
n26.out → n33.formula2
n34.out → n33.atom3
n29.out → n33.formula3
n21.out → n20.a
n33.out → n20.b
n24.out → n36.assertion
n31.out → n37.a
n26.out → n37.b
n31.out → n38.a
n29.out → n38.b
n37.out → n39.a
n38.out → n39.b
n5.out → n36.atom1
n39.out → n36.formula1
n14.out → n40.a
n17.out → n40.b
n40.out → n41.a
n8.out → n36.atom2
n41.out → n36.formula2
n20.out → n19.a
n36.out → n19.b
n32.out → n43.assertion
n5.out → n43.atom1
n41.out → n43.formula1
n8.out → n43.atom2
n37.out → n43.formula2
n34.out → n43.atom3
n38.out → n43.formula3
n19.out → n18.a
n43.out → n18.b
n12.out → n10.a
n18.out → n10.b
n2.out → n1.a
n10.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-19 · 二次回指

- 目标：`⊢ ( F ( x ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) )`
- 提示：谓词版 A1 的两次实例。
- 参考解：16 个模块 / 24 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n4  axiom A1
n6  atom P
n7  term x
n8  pred F
n9  atom Q
n14  axiom A2
n16  atom R
n20  subst(groups=1)
n21  pred H
n24  imp
n28  mp
n29  定理 *undefined
n32  pred G
n35  imp
n38  subst(groups=2)

接线：
n7.out → n8.t1
n4.out → n20.assertion
n6.out → n20.atom1
n8.out → n20.formula1
n7.out → n21.t1
n9.out → n20.atom2
n21.out → n20.formula2
n21.out → n24.a
n8.out → n24.b
n7.out → n32.t1
n32.out → n35.a
n24.out → n35.b
n14.out → n38.assertion
n6.out → n38.atom1
n8.out → n38.formula1
n9.out → n38.atom2
n24.out → n38.formula2
n16.out → n38.atom3
n35.out → n38.formula3
n29.out → n28.a
n38.out → n28.b
n20.out → n1.a
n28.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-20 · 四段分配

- 目标：`⊢ ( ∀ x ( F ( x ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) ) → ( ∀ x F ( x ) → ( ∀ x G ( x ) → ( ∀ x H ( x ) → ∀ x F ( x ) ) ) ) )`
- 提示：∀x(F→(G→(H→I))) 的四层分配。
- 参考解：49 个模块 / 117 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
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
n18  subst(groups=1)
n19  mp
n20  mp
n21  mp
n22  mp
n24  subst(groups=1)
n25  axiom A1
n26  subst(groups=1)
n27  all(v=x)
n28  all(v=x)
n29  all(v=x)
n30  imp
n31  imp
n32  all(v=x)
n33  axiom A2
n34  subst(groups=2)
n35  atom R
n37  subst(groups=1)
n38  imp
n39  imp
n40  imp
n41  all(v=x)
n43  subst(groups=2)
n45  subst(groups=1)
n46  imp
n48  subst(groups=2)
n50  subst(groups=1)
n51  imp
n52  imp
n53  imp
n54  imp
n55  all(v=x)
n57  subst(groups=2)

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
n2.out → n18.assertion
n4.out → n18.atom1
n8.out → n18.formula1
n7.out → n18.atom2
n10.out → n18.formula2
n2.out → n24.assertion
n4.out → n24.atom1
n9.out → n24.formula1
n7.out → n24.atom2
n6.out → n24.formula2
n25.out → n26.assertion
n10.out → n27.a
n9.out → n28.a
n6.out → n29.a
n28.out → n30.a
n29.out → n30.b
n27.out → n31.a
n30.out → n31.b
n4.out → n26.atom1
n31.out → n26.formula1
n8.out → n32.a
n7.out → n26.atom2
n32.out → n26.formula2
n24.out → n22.a
n26.out → n22.b
n33.out → n34.assertion
n4.out → n34.atom1
n32.out → n34.formula1
n7.out → n34.atom2
n27.out → n34.formula2
n35.out → n34.atom3
n30.out → n34.formula3
n22.out → n21.a
n34.out → n21.b
n25.out → n37.assertion
n32.out → n38.a
n27.out → n38.b
n32.out → n39.a
n30.out → n39.b
n38.out → n40.a
n39.out → n40.b
n4.out → n37.atom1
n40.out → n37.formula1
n11.out → n41.a
n7.out → n37.atom2
n41.out → n37.formula2
n21.out → n20.a
n37.out → n20.b
n33.out → n43.assertion
n4.out → n43.atom1
n41.out → n43.formula1
n7.out → n43.atom2
n38.out → n43.formula2
n35.out → n43.atom3
n39.out → n43.formula3
n20.out → n19.a
n43.out → n19.b
n18.out → n16.a
n19.out → n16.b
n25.out → n45.assertion
n41.out → n46.a
n39.out → n46.b
n4.out → n45.atom1
n46.out → n45.formula1
n7.out → n45.atom2
n29.out → n45.formula2
n16.out → n15.a
n45.out → n15.b
n33.out → n48.assertion
n4.out → n48.atom1
n29.out → n48.formula1
n7.out → n48.atom2
n41.out → n48.formula2
n35.out → n48.atom3
n39.out → n48.formula3
n15.out → n14.a
n48.out → n14.b
n25.out → n50.assertion
n29.out → n51.a
n41.out → n51.b
n29.out → n52.a
n39.out → n52.b
n51.out → n53.a
n52.out → n53.b
n4.out → n50.atom1
n53.out → n50.formula1
n6.out → n54.a
n11.out → n54.b
n54.out → n55.a
n7.out → n50.atom2
n55.out → n50.formula2
n14.out → n13.a
n50.out → n13.b
n33.out → n57.assertion
n4.out → n57.atom1
n55.out → n57.formula1
n7.out → n57.atom2
n51.out → n57.formula2
n35.out → n57.atom3
n52.out → n57.formula3
n13.out → n12.a
n57.out → n12.b
n3.out → n1.a
n12.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-21 · 双重量词引入

- 目标：`⊢ ( F ( z ) → ∀ x ∀ y F ( z ) )`
- 提示：P→∀x∀yP 的双层引入。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  shift(v=x)
n3  term z
n4  pred F
n5  定理 *undefined

接线：
n3.out → n4.t1
n4.out → n2.formula
n2.out → n1.a
n5.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-22 · 辖域移动（变体二）

- 目标：`⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )`
- 提示：另一组合法的辖域移动实例。
- 参考解：44 个模块 / 110 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n4  axiom A1
n6  atom P
n7  term y
n8  pred F
n9  term x
n10  pred G
n11  imp
n12  all(v=x)
n13  atom Q
n18  axiom A2
n20  atom R
n24  subst(groups=1)
n27  imp
n31  mp
n32  mp
n33  mp
n34  mp
n35  mp
n36  shift(v=x)
n37  mp
n38  mp
n40  subst(groups=1)
n41  all(v=x)
n43  subst(groups=1)
n44  imp
n45  imp
n47  subst(groups=2)
n48  mp
n49  mp
n50  mp
n51  axiom A5(v=x)
n52  subst(groups=1)
n54  subst(groups=2)
n55  all(v=x)
n57  subst(groups=1)
n58  imp
n59  imp
n61  subst(groups=2)
n63  subst(groups=2)
n65  subst(groups=1)
n66  imp
n67  imp
n69  subst(groups=2)

接线：
n7.out → n8.t1
n9.out → n10.t1
n8.out → n11.a
n10.out → n11.b
n11.out → n12.a
n4.out → n24.assertion
n6.out → n24.atom1
n12.out → n24.formula1
n13.out → n24.atom2
n8.out → n24.formula2
n8.out → n27.a
n12.out → n27.b
n8.out → n36.formula
n4.out → n40.assertion
n8.out → n41.a
n6.out → n40.atom1
n41.out → n40.formula1
n13.out → n40.atom2
n12.out → n40.formula2
n4.out → n43.assertion
n12.out → n44.a
n41.out → n44.b
n41.out → n45.a
n44.out → n45.b
n6.out → n43.atom1
n45.out → n43.formula1
n13.out → n43.atom2
n8.out → n43.formula2
n40.out → n38.a
n43.out → n38.b
n18.out → n47.assertion
n6.out → n47.atom1
n8.out → n47.formula1
n13.out → n47.atom2
n41.out → n47.formula2
n20.out → n47.atom3
n44.out → n47.formula3
n38.out → n37.a
n47.out → n37.b
n36.out → n35.a
n37.out → n35.b
n51.out → n52.assertion
n6.out → n52.atom1
n8.out → n52.formula1
n13.out → n52.atom2
n10.out → n52.formula2
n18.out → n54.assertion
n6.out → n54.atom1
n12.out → n54.formula1
n13.out → n54.atom2
n41.out → n54.formula2
n10.out → n55.a
n20.out → n54.atom3
n55.out → n54.formula3
n52.out → n50.a
n54.out → n50.b
n4.out → n57.assertion
n12.out → n58.a
n55.out → n58.b
n44.out → n59.a
n58.out → n59.b
n6.out → n57.atom1
n59.out → n57.formula1
n13.out → n57.atom2
n8.out → n57.formula2
n50.out → n49.a
n57.out → n49.b
n18.out → n61.assertion
n6.out → n61.atom1
n8.out → n61.formula1
n13.out → n61.atom2
n44.out → n61.formula2
n20.out → n61.atom3
n58.out → n61.formula3
n49.out → n48.a
n61.out → n48.b
n35.out → n34.a
n48.out → n34.b
n18.out → n63.assertion
n6.out → n63.atom1
n8.out → n63.formula1
n13.out → n63.atom2
n12.out → n63.formula2
n20.out → n63.atom3
n55.out → n63.formula3
n34.out → n33.a
n63.out → n33.b
n4.out → n65.assertion
n8.out → n66.a
n55.out → n66.b
n27.out → n67.a
n66.out → n67.b
n6.out → n65.atom1
n67.out → n65.formula1
n13.out → n65.atom2
n12.out → n65.formula2
n33.out → n32.a
n65.out → n32.b
n18.out → n69.assertion
n6.out → n69.atom1
n12.out → n69.formula1
n13.out → n69.atom2
n27.out → n69.formula2
n20.out → n69.atom3
n66.out → n69.formula3
n32.out → n31.a
n69.out → n31.b
n24.out → n1.a
n31.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-23 · 全称后件组合

- 目标：`⊢ ( ( F ( x ) → ∀ x G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )`
- 提示：P→∀xQ 与 ∀x(Q→R) 推出 P→∀xR。
- 参考解：27 个模块 / 51 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n4  axiom A1
n6  atom P
n7  term x
n8  pred F
n9  pred G
n10  all(v=x)
n11  imp
n12  atom Q
n17  axiom A2
n19  atom R
n23  subst(groups=1)
n24  pred H
n25  imp
n26  all(v=x)
n29  imp
n33  mp
n34  mp
n35  mp
n36  定理 *undefined
n44  all(v=x)
n58  imp
n64  subst(groups=2)
n66  subst(groups=1)
n67  imp
n68  imp
n70  subst(groups=2)

接线：
n7.out → n8.t1
n7.out → n9.t1
n9.out → n10.a
n8.out → n11.a
n10.out → n11.b
n4.out → n23.assertion
n6.out → n23.atom1
n11.out → n23.formula1
n7.out → n24.t1
n9.out → n25.a
n24.out → n25.b
n25.out → n26.a
n12.out → n23.atom2
n26.out → n23.formula2
n26.out → n29.a
n11.out → n29.b
n24.out → n44.a
n8.out → n58.a
n44.out → n58.b
n17.out → n64.assertion
n6.out → n64.atom1
n26.out → n64.formula1
n12.out → n64.atom2
n11.out → n64.formula2
n19.out → n64.atom3
n58.out → n64.formula3
n36.out → n35.a
n64.out → n35.b
n4.out → n66.assertion
n26.out → n67.a
n58.out → n67.b
n29.out → n68.a
n67.out → n68.b
n6.out → n66.atom1
n68.out → n66.formula1
n12.out → n66.atom2
n11.out → n66.formula2
n35.out → n34.a
n66.out → n34.b
n17.out → n70.assertion
n6.out → n70.atom1
n11.out → n70.formula1
n12.out → n70.atom2
n29.out → n70.formula2
n19.out → n70.atom3
n67.out → n70.formula3
n34.out → n33.a
n70.out → n33.b
n23.out → n1.a
n33.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-24 · 辖域移动

- 目标：`⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )`
- 提示：∀x(F(y)→G(x)) → (F(y)→∀xG(x))，y 不受 x 影响。
- 参考解：1 个模块 / 1 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  定理 *undefined

接线：
n1.out → nt.proof
```

</details>

### Ⅱ-25 · 全称替换前件

- 目标：`⊢ ( ( F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → G ( x ) ) )`
- 提示：(F(x)→G(x))→(∀xF(x)→G(x))。
- 参考解：46 个模块 / 128 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n3  mp
n4  axiom A1
n5  subst(groups=1)
n6  atom P
n7  term x
n8  pred F
n9  pred G
n10  imp
n11  atom Q
n12  mp
n14  subst(groups=1)
n15  imp
n16  axiom A2
n17  subst(groups=2)
n18  atom R
n22  subst(groups=1)
n23  all(v=x)
n26  imp
n30  mp
n31  mp
n32  mp
n33  mp
n34  mp
n35  axiom A4(v=x)
n36  subst(groups=0)
n37  mp
n38  mp
n40  subst(groups=1)
n42  subst(groups=1)
n43  imp
n44  imp
n46  subst(groups=2)
n47  mp
n48  mp
n49  mp
n66  subst(groups=2)
n68  subst(groups=1)
n69  imp
n70  imp
n72  subst(groups=2)
n74  subst(groups=2)
n76  subst(groups=1)
n77  imp
n78  imp
n80  subst(groups=2)

接线：
n4.out → n5.assertion
n7.out → n8.t1
n7.out → n9.t1
n8.out → n10.a
n9.out → n10.b
n6.out → n5.atom1
n10.out → n5.formula1
n11.out → n5.atom2
n10.out → n5.formula2
n4.out → n14.assertion
n6.out → n14.atom1
n10.out → n14.formula1
n10.out → n15.a
n10.out → n15.b
n11.out → n14.atom2
n15.out → n14.formula2
n16.out → n17.assertion
n6.out → n17.atom1
n10.out → n17.formula1
n11.out → n17.atom2
n15.out → n17.formula2
n18.out → n17.atom3
n10.out → n17.formula3
n14.out → n12.a
n17.out → n12.b
n5.out → n3.a
n12.out → n3.b
n4.out → n22.assertion
n6.out → n22.atom1
n10.out → n22.formula1
n8.out → n23.a
n11.out → n22.atom2
n23.out → n22.formula2
n23.out → n26.a
n10.out → n26.b
n35.out → n36.assertion
n6.out → n36.atom1
n8.out → n36.formula1
n4.out → n40.assertion
n6.out → n40.atom1
n8.out → n40.formula1
n11.out → n40.atom2
n10.out → n40.formula2
n4.out → n42.assertion
n10.out → n43.a
n8.out → n43.b
n8.out → n44.a
n43.out → n44.b
n6.out → n42.atom1
n44.out → n42.formula1
n11.out → n42.atom2
n23.out → n42.formula2
n40.out → n38.a
n42.out → n38.b
n16.out → n46.assertion
n6.out → n46.atom1
n23.out → n46.formula1
n11.out → n46.atom2
n8.out → n46.formula2
n18.out → n46.atom3
n43.out → n46.formula3
n38.out → n37.a
n46.out → n37.b
n36.out → n34.a
n37.out → n34.b
n16.out → n66.assertion
n6.out → n66.atom1
n10.out → n66.formula1
n11.out → n66.atom2
n8.out → n66.formula2
n18.out → n66.atom3
n9.out → n66.formula3
n3.out → n49.a
n66.out → n49.b
n4.out → n68.assertion
n10.out → n69.a
n9.out → n69.b
n43.out → n70.a
n69.out → n70.b
n6.out → n68.atom1
n70.out → n68.formula1
n11.out → n68.atom2
n23.out → n68.formula2
n49.out → n48.a
n68.out → n48.b
n16.out → n72.assertion
n6.out → n72.atom1
n23.out → n72.formula1
n11.out → n72.atom2
n43.out → n72.formula2
n18.out → n72.atom3
n69.out → n72.formula3
n48.out → n47.a
n72.out → n47.b
n34.out → n33.a
n47.out → n33.b
n16.out → n74.assertion
n6.out → n74.atom1
n23.out → n74.formula1
n11.out → n74.atom2
n10.out → n74.formula2
n18.out → n74.atom3
n9.out → n74.formula3
n33.out → n32.a
n74.out → n32.b
n4.out → n76.assertion
n23.out → n77.a
n9.out → n77.b
n26.out → n78.a
n77.out → n78.b
n6.out → n76.atom1
n78.out → n76.formula1
n11.out → n76.atom2
n10.out → n76.formula2
n32.out → n31.a
n76.out → n31.b
n16.out → n80.assertion
n6.out → n80.atom1
n10.out → n80.formula1
n11.out → n80.atom2
n26.out → n80.formula2
n18.out → n80.atom3
n77.out → n80.formula3
n31.out → n30.a
n80.out → n30.b
n22.out → n1.a
n30.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-26 · 全称合并

- 目标：`⊢ ( ( ∀ x F ( x ) → ∀ x ∀ x F ( x ) ) → ( ( ∀ x ( ∀ x F ( x ) → G ( x ) ) → ( ∀ x ∀ x F ( x ) → ∀ x G ( x ) ) ) → ( ∀ x ( ∀ x F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → ∀ x G ( x ) ) ) ) )`
- 提示：两层 ∀ 与蕴含的复杂合并。
- 参考解：93 个模块 / 284 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  mp
n6  axiom A1
n8  atom P
n9  term x
n10  pred F
n11  all(v=x)
n12  all(v=x)
n13  imp
n14  atom Q
n19  axiom A2
n21  atom R
n25  subst(groups=1)
n26  pred G
n27  all(v=x)
n28  imp
n31  imp
n35  mp
n36  mp
n37  mp
n38  mp
n39  mp
n40  mp
n41  mp
n43  subst(groups=1)
n44  mp
n46  subst(groups=1)
n47  imp
n49  subst(groups=2)
n51  subst(groups=1)
n52  mp
n53  mp
n55  subst(groups=1)
n57  subst(groups=1)
n58  imp
n59  imp
n61  subst(groups=2)
n62  mp
n63  mp
n65  subst(groups=2)
n67  subst(groups=1)
n68  imp
n69  imp
n71  subst(groups=2)
n72  mp
n73  mp
n74  mp
n75  mp
n76  mp
n89  subst(groups=1)
n92  imp
n96  mp
n97  mp
n99  subst(groups=2)
n101  subst(groups=1)
n102  imp
n103  imp
n104  imp
n106  subst(groups=2)
n108  subst(groups=1)
n109  imp
n111  subst(groups=2)
n113  subst(groups=1)
n114  imp
n116  subst(groups=2)
n117  mp
n118  mp
n120  subst(groups=2)
n122  subst(groups=1)
n123  imp
n124  imp
n125  imp
n127  subst(groups=2)
n129  subst(groups=2)
n130  mp
n131  mp
n133  subst(groups=1)
n134  imp
n135  all(v=x)
n137  subst(groups=1)
n138  imp
n139  imp
n141  subst(groups=2)
n142  mp
n143  mp
n145  subst(groups=2)
n147  subst(groups=1)
n148  imp
n149  imp
n150  imp
n151  imp
n153  subst(groups=2)

接线：
n9.out → n10.t1
n10.out → n11.a
n11.out → n12.a
n11.out → n13.a
n12.out → n13.b
n6.out → n25.assertion
n8.out → n25.atom1
n13.out → n25.formula1
n9.out → n26.t1
n26.out → n27.a
n12.out → n28.a
n27.out → n28.b
n14.out → n25.atom2
n28.out → n25.formula2
n28.out → n31.a
n13.out → n31.b
n6.out → n43.assertion
n8.out → n43.atom1
n27.out → n43.formula1
n14.out → n43.atom2
n27.out → n43.formula2
n6.out → n46.assertion
n8.out → n46.atom1
n27.out → n46.formula1
n27.out → n47.a
n27.out → n47.b
n14.out → n46.atom2
n47.out → n46.formula2
n19.out → n49.assertion
n8.out → n49.atom1
n27.out → n49.formula1
n14.out → n49.atom2
n47.out → n49.formula2
n21.out → n49.atom3
n27.out → n49.formula3
n46.out → n44.a
n49.out → n44.b
n43.out → n41.a
n44.out → n41.b
n6.out → n51.assertion
n8.out → n51.atom1
n47.out → n51.formula1
n14.out → n51.atom2
n13.out → n51.formula2
n41.out → n40.a
n51.out → n40.b
n6.out → n55.assertion
n8.out → n55.atom1
n47.out → n55.formula1
n14.out → n55.atom2
n12.out → n55.formula2
n6.out → n57.assertion
n12.out → n58.a
n47.out → n58.b
n47.out → n59.a
n58.out → n59.b
n8.out → n57.atom1
n59.out → n57.formula1
n14.out → n57.atom2
n13.out → n57.formula2
n55.out → n53.a
n57.out → n53.b
n19.out → n61.assertion
n8.out → n61.atom1
n13.out → n61.formula1
n14.out → n61.atom2
n47.out → n61.formula2
n21.out → n61.atom3
n58.out → n61.formula3
n53.out → n52.a
n61.out → n52.b
n40.out → n39.a
n52.out → n39.b
n19.out → n65.assertion
n8.out → n65.atom1
n12.out → n65.formula1
n14.out → n65.atom2
n27.out → n65.formula2
n21.out → n65.atom3
n27.out → n65.formula3
n6.out → n67.assertion
n28.out → n68.a
n28.out → n68.b
n58.out → n69.a
n68.out → n69.b
n8.out → n67.atom1
n69.out → n67.formula1
n14.out → n67.atom2
n13.out → n67.formula2
n65.out → n63.a
n67.out → n63.b
n19.out → n71.assertion
n8.out → n71.atom1
n13.out → n71.formula1
n14.out → n71.atom2
n58.out → n71.formula2
n21.out → n71.atom3
n68.out → n71.formula3
n63.out → n62.a
n71.out → n62.b
n39.out → n38.a
n62.out → n38.b
n6.out → n89.assertion
n8.out → n89.atom1
n28.out → n89.formula1
n14.out → n89.atom2
n11.out → n89.formula2
n11.out → n92.a
n28.out → n92.b
n19.out → n99.assertion
n8.out → n99.atom1
n11.out → n99.formula1
n14.out → n99.atom2
n12.out → n99.formula2
n21.out → n99.atom3
n27.out → n99.formula3
n6.out → n101.assertion
n11.out → n102.a
n27.out → n102.b
n13.out → n103.a
n102.out → n103.b
n92.out → n104.a
n103.out → n104.b
n8.out → n101.atom1
n104.out → n101.formula1
n14.out → n101.atom2
n28.out → n101.formula2
n99.out → n97.a
n101.out → n97.b
n19.out → n106.assertion
n8.out → n106.atom1
n28.out → n106.formula1
n14.out → n106.atom2
n92.out → n106.formula2
n21.out → n106.atom3
n103.out → n106.formula3
n97.out → n96.a
n106.out → n96.b
n89.out → n76.a
n96.out → n76.b
n6.out → n108.assertion
n28.out → n109.a
n103.out → n109.b
n8.out → n108.atom1
n109.out → n108.formula1
n14.out → n108.atom2
n28.out → n108.formula2
n76.out → n75.a
n108.out → n75.b
n19.out → n111.assertion
n8.out → n111.atom1
n28.out → n111.formula1
n14.out → n111.atom2
n28.out → n111.formula2
n21.out → n111.atom3
n103.out → n111.formula3
n75.out → n74.a
n111.out → n74.b
n6.out → n113.assertion
n68.out → n114.a
n109.out → n114.b
n8.out → n113.atom1
n114.out → n113.formula1
n14.out → n113.atom2
n13.out → n113.formula2
n74.out → n73.a
n113.out → n73.b
n19.out → n116.assertion
n8.out → n116.atom1
n13.out → n116.formula1
n14.out → n116.atom2
n68.out → n116.formula2
n21.out → n116.atom3
n109.out → n116.formula3
n73.out → n72.a
n116.out → n72.b
n38.out → n37.a
n72.out → n37.b
n19.out → n120.assertion
n8.out → n120.atom1
n28.out → n120.formula1
n14.out → n120.atom2
n13.out → n120.formula2
n21.out → n120.atom3
n102.out → n120.formula3
n6.out → n122.assertion
n28.out → n123.a
n102.out → n123.b
n31.out → n124.a
n123.out → n124.b
n109.out → n125.a
n124.out → n125.b
n8.out → n122.atom1
n125.out → n122.formula1
n14.out → n122.atom2
n13.out → n122.formula2
n120.out → n118.a
n122.out → n118.b
n19.out → n127.assertion
n8.out → n127.atom1
n13.out → n127.formula1
n14.out → n127.atom2
n109.out → n127.formula2
n21.out → n127.atom3
n124.out → n127.formula3
n118.out → n117.a
n127.out → n117.b
n37.out → n36.a
n117.out → n36.b
n19.out → n129.assertion
n8.out → n129.atom1
n13.out → n129.formula1
n14.out → n129.atom2
n31.out → n129.formula2
n21.out → n129.atom3
n123.out → n129.formula3
n36.out → n35.a
n129.out → n35.b
n25.out → n3.a
n35.out → n3.b
n6.out → n133.assertion
n8.out → n133.atom1
n123.out → n133.formula1
n11.out → n134.a
n26.out → n134.b
n134.out → n135.a
n14.out → n133.atom2
n135.out → n133.formula2
n6.out → n137.assertion
n135.out → n138.a
n123.out → n138.b
n123.out → n139.a
n138.out → n139.b
n8.out → n137.atom1
n139.out → n137.formula1
n14.out → n137.atom2
n13.out → n137.formula2
n133.out → n131.a
n137.out → n131.b
n19.out → n141.assertion
n8.out → n141.atom1
n13.out → n141.formula1
n14.out → n141.atom2
n123.out → n141.formula2
n21.out → n141.atom3
n138.out → n141.formula3
n131.out → n130.a
n141.out → n130.b
n3.out → n2.a
n130.out → n2.b
n19.out → n145.assertion
n8.out → n145.atom1
n135.out → n145.formula1
n14.out → n145.atom2
n28.out → n145.formula2
n21.out → n145.atom3
n102.out → n145.formula3
n6.out → n147.assertion
n135.out → n148.a
n28.out → n148.b
n135.out → n149.a
n102.out → n149.b
n148.out → n150.a
n149.out → n150.b
n138.out → n151.a
n150.out → n151.b
n8.out → n147.atom1
n151.out → n147.formula1
n14.out → n147.atom2
n13.out → n147.formula2
n145.out → n143.a
n147.out → n143.b
n19.out → n153.assertion
n8.out → n153.atom1
n13.out → n153.formula1
n14.out → n153.atom2
n138.out → n153.formula2
n21.out → n153.atom3
n150.out → n153.formula3
n143.out → n142.a
n153.out → n142.b
n2.out → n1.a
n142.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-27 · 全称三段论链

- 目标：`⊢ ( ∀ x ( F ( x ) → G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ∀ x ( F ( x ) → H ( x ) ) ) )`
- 提示：∀x(F→G) 与 ∀x(G→H) 推出 ∀x(F→H)。
- 参考解：96 个模块 / 283 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  gen(v=x)
n3  mp
n6  axiom A1
n8  atom P
n9  term x
n10  pred F
n11  pred G
n12  imp
n13  atom Q
n18  axiom A2
n20  atom R
n24  subst(groups=1)
n25  pred H
n26  imp
n29  imp
n33  mp
n34  mp
n35  mp
n36  mp
n37  mp
n38  mp
n39  mp
n41  subst(groups=1)
n42  mp
n44  subst(groups=1)
n45  imp
n47  subst(groups=2)
n49  subst(groups=1)
n50  mp
n51  mp
n53  subst(groups=1)
n55  subst(groups=1)
n56  imp
n57  imp
n59  subst(groups=2)
n60  mp
n61  mp
n63  subst(groups=2)
n65  subst(groups=1)
n66  imp
n67  imp
n69  subst(groups=2)
n70  mp
n71  mp
n72  mp
n73  mp
n74  mp
n87  subst(groups=1)
n90  imp
n94  mp
n95  mp
n97  subst(groups=2)
n99  subst(groups=1)
n100  imp
n101  imp
n102  imp
n104  subst(groups=2)
n106  subst(groups=1)
n107  imp
n109  subst(groups=2)
n111  subst(groups=1)
n112  imp
n114  subst(groups=2)
n115  mp
n116  mp
n118  subst(groups=2)
n120  subst(groups=1)
n121  imp
n122  imp
n123  imp
n125  subst(groups=2)
n127  subst(groups=2)
n128  mp
n129  axiom A5(v=x)
n130  subst(groups=1)
n131  mp
n132  mp
n133  mp
n134  mp
n136  subst(groups=1)
n138  subst(groups=1)
n139  all(v=x)
n140  all(v=x)
n141  all(v=x)
n142  imp
n143  imp
n144  all(v=x)
n146  subst(groups=2)
n148  subst(groups=1)
n149  imp
n150  imp
n151  imp
n152  imp
n153  all(v=x)
n155  subst(groups=2)

接线：
n9.out → n10.t1
n9.out → n11.t1
n10.out → n12.a
n11.out → n12.b
n6.out → n24.assertion
n8.out → n24.atom1
n12.out → n24.formula1
n9.out → n25.t1
n11.out → n26.a
n25.out → n26.b
n13.out → n24.atom2
n26.out → n24.formula2
n26.out → n29.a
n12.out → n29.b
n6.out → n41.assertion
n8.out → n41.atom1
n25.out → n41.formula1
n13.out → n41.atom2
n25.out → n41.formula2
n6.out → n44.assertion
n8.out → n44.atom1
n25.out → n44.formula1
n25.out → n45.a
n25.out → n45.b
n13.out → n44.atom2
n45.out → n44.formula2
n18.out → n47.assertion
n8.out → n47.atom1
n25.out → n47.formula1
n13.out → n47.atom2
n45.out → n47.formula2
n20.out → n47.atom3
n25.out → n47.formula3
n44.out → n42.a
n47.out → n42.b
n41.out → n39.a
n42.out → n39.b
n6.out → n49.assertion
n8.out → n49.atom1
n45.out → n49.formula1
n13.out → n49.atom2
n12.out → n49.formula2
n39.out → n38.a
n49.out → n38.b
n6.out → n53.assertion
n8.out → n53.atom1
n45.out → n53.formula1
n13.out → n53.atom2
n11.out → n53.formula2
n6.out → n55.assertion
n11.out → n56.a
n45.out → n56.b
n45.out → n57.a
n56.out → n57.b
n8.out → n55.atom1
n57.out → n55.formula1
n13.out → n55.atom2
n12.out → n55.formula2
n53.out → n51.a
n55.out → n51.b
n18.out → n59.assertion
n8.out → n59.atom1
n12.out → n59.formula1
n13.out → n59.atom2
n45.out → n59.formula2
n20.out → n59.atom3
n56.out → n59.formula3
n51.out → n50.a
n59.out → n50.b
n38.out → n37.a
n50.out → n37.b
n18.out → n63.assertion
n8.out → n63.atom1
n11.out → n63.formula1
n13.out → n63.atom2
n25.out → n63.formula2
n20.out → n63.atom3
n25.out → n63.formula3
n6.out → n65.assertion
n26.out → n66.a
n26.out → n66.b
n56.out → n67.a
n66.out → n67.b
n8.out → n65.atom1
n67.out → n65.formula1
n13.out → n65.atom2
n12.out → n65.formula2
n63.out → n61.a
n65.out → n61.b
n18.out → n69.assertion
n8.out → n69.atom1
n12.out → n69.formula1
n13.out → n69.atom2
n56.out → n69.formula2
n20.out → n69.atom3
n66.out → n69.formula3
n61.out → n60.a
n69.out → n60.b
n37.out → n36.a
n60.out → n36.b
n6.out → n87.assertion
n8.out → n87.atom1
n26.out → n87.formula1
n13.out → n87.atom2
n10.out → n87.formula2
n10.out → n90.a
n26.out → n90.b
n18.out → n97.assertion
n8.out → n97.atom1
n10.out → n97.formula1
n13.out → n97.atom2
n11.out → n97.formula2
n20.out → n97.atom3
n25.out → n97.formula3
n6.out → n99.assertion
n10.out → n100.a
n25.out → n100.b
n12.out → n101.a
n100.out → n101.b
n90.out → n102.a
n101.out → n102.b
n8.out → n99.atom1
n102.out → n99.formula1
n13.out → n99.atom2
n26.out → n99.formula2
n97.out → n95.a
n99.out → n95.b
n18.out → n104.assertion
n8.out → n104.atom1
n26.out → n104.formula1
n13.out → n104.atom2
n90.out → n104.formula2
n20.out → n104.atom3
n101.out → n104.formula3
n95.out → n94.a
n104.out → n94.b
n87.out → n74.a
n94.out → n74.b
n6.out → n106.assertion
n26.out → n107.a
n101.out → n107.b
n8.out → n106.atom1
n107.out → n106.formula1
n13.out → n106.atom2
n26.out → n106.formula2
n74.out → n73.a
n106.out → n73.b
n18.out → n109.assertion
n8.out → n109.atom1
n26.out → n109.formula1
n13.out → n109.atom2
n26.out → n109.formula2
n20.out → n109.atom3
n101.out → n109.formula3
n73.out → n72.a
n109.out → n72.b
n6.out → n111.assertion
n66.out → n112.a
n107.out → n112.b
n8.out → n111.atom1
n112.out → n111.formula1
n13.out → n111.atom2
n12.out → n111.formula2
n72.out → n71.a
n111.out → n71.b
n18.out → n114.assertion
n8.out → n114.atom1
n12.out → n114.formula1
n13.out → n114.atom2
n66.out → n114.formula2
n20.out → n114.atom3
n107.out → n114.formula3
n71.out → n70.a
n114.out → n70.b
n36.out → n35.a
n70.out → n35.b
n18.out → n118.assertion
n8.out → n118.atom1
n26.out → n118.formula1
n13.out → n118.atom2
n12.out → n118.formula2
n20.out → n118.atom3
n100.out → n118.formula3
n6.out → n120.assertion
n26.out → n121.a
n100.out → n121.b
n29.out → n122.a
n121.out → n122.b
n107.out → n123.a
n122.out → n123.b
n8.out → n120.atom1
n123.out → n120.formula1
n13.out → n120.atom2
n12.out → n120.formula2
n118.out → n116.a
n120.out → n116.b
n18.out → n125.assertion
n8.out → n125.atom1
n12.out → n125.formula1
n13.out → n125.atom2
n107.out → n125.formula2
n20.out → n125.atom3
n122.out → n125.formula3
n116.out → n115.a
n125.out → n115.b
n35.out → n34.a
n115.out → n34.b
n18.out → n127.assertion
n8.out → n127.atom1
n12.out → n127.formula1
n13.out → n127.atom2
n29.out → n127.formula2
n20.out → n127.atom3
n121.out → n127.formula3
n34.out → n33.a
n127.out → n33.b
n24.out → n3.a
n33.out → n3.b
n3.out → n2.assertion
n129.out → n130.assertion
n8.out → n130.atom1
n12.out → n130.formula1
n13.out → n130.atom2
n121.out → n130.formula2
n129.out → n136.assertion
n8.out → n136.atom1
n26.out → n136.formula1
n13.out → n136.atom2
n100.out → n136.formula2
n6.out → n138.assertion
n121.out → n139.a
n26.out → n140.a
n100.out → n141.a
n140.out → n142.a
n141.out → n142.b
n139.out → n143.a
n142.out → n143.b
n8.out → n138.atom1
n143.out → n138.formula1
n12.out → n144.a
n13.out → n138.atom2
n144.out → n138.formula2
n136.out → n134.a
n138.out → n134.b
n18.out → n146.assertion
n8.out → n146.atom1
n144.out → n146.formula1
n13.out → n146.atom2
n139.out → n146.formula2
n20.out → n146.atom3
n142.out → n146.formula3
n134.out → n133.a
n146.out → n133.b
n6.out → n148.assertion
n144.out → n149.a
n139.out → n149.b
n144.out → n150.a
n142.out → n150.b
n149.out → n151.a
n150.out → n151.b
n8.out → n148.atom1
n151.out → n148.formula1
n12.out → n152.a
n121.out → n152.b
n152.out → n153.a
n13.out → n148.atom2
n153.out → n148.formula2
n133.out → n132.a
n148.out → n132.b
n18.out → n155.assertion
n8.out → n155.atom1
n153.out → n155.formula1
n13.out → n155.atom2
n149.out → n155.formula2
n20.out → n155.atom3
n150.out → n155.formula3
n132.out → n131.a
n155.out → n131.b
n130.out → n128.a
n131.out → n128.b
n2.out → n1.a
n128.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-28 · 辖域移动（H/G）

- 目标：`⊢ ( ∀ x ( H ( y ) → F ( x ) ) → ( H ( y ) → ∀ x F ( x ) ) )`
- 提示：另一组谓词的辖域移动。
- 参考解：44 个模块 / 110 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n4  axiom A1
n6  atom P
n7  term y
n8  pred H
n9  term x
n10  pred F
n11  imp
n12  all(v=x)
n13  atom Q
n18  axiom A2
n20  atom R
n24  subst(groups=1)
n27  imp
n31  mp
n32  mp
n33  mp
n34  mp
n35  mp
n36  shift(v=x)
n37  mp
n38  mp
n40  subst(groups=1)
n41  all(v=x)
n43  subst(groups=1)
n44  imp
n45  imp
n47  subst(groups=2)
n48  mp
n49  mp
n50  mp
n51  axiom A5(v=x)
n52  subst(groups=1)
n54  subst(groups=2)
n55  all(v=x)
n57  subst(groups=1)
n58  imp
n59  imp
n61  subst(groups=2)
n63  subst(groups=2)
n65  subst(groups=1)
n66  imp
n67  imp
n69  subst(groups=2)

接线：
n7.out → n8.t1
n9.out → n10.t1
n8.out → n11.a
n10.out → n11.b
n11.out → n12.a
n4.out → n24.assertion
n6.out → n24.atom1
n12.out → n24.formula1
n13.out → n24.atom2
n8.out → n24.formula2
n8.out → n27.a
n12.out → n27.b
n8.out → n36.formula
n4.out → n40.assertion
n8.out → n41.a
n6.out → n40.atom1
n41.out → n40.formula1
n13.out → n40.atom2
n12.out → n40.formula2
n4.out → n43.assertion
n12.out → n44.a
n41.out → n44.b
n41.out → n45.a
n44.out → n45.b
n6.out → n43.atom1
n45.out → n43.formula1
n13.out → n43.atom2
n8.out → n43.formula2
n40.out → n38.a
n43.out → n38.b
n18.out → n47.assertion
n6.out → n47.atom1
n8.out → n47.formula1
n13.out → n47.atom2
n41.out → n47.formula2
n20.out → n47.atom3
n44.out → n47.formula3
n38.out → n37.a
n47.out → n37.b
n36.out → n35.a
n37.out → n35.b
n51.out → n52.assertion
n6.out → n52.atom1
n8.out → n52.formula1
n13.out → n52.atom2
n10.out → n52.formula2
n18.out → n54.assertion
n6.out → n54.atom1
n12.out → n54.formula1
n13.out → n54.atom2
n41.out → n54.formula2
n10.out → n55.a
n20.out → n54.atom3
n55.out → n54.formula3
n52.out → n50.a
n54.out → n50.b
n4.out → n57.assertion
n12.out → n58.a
n55.out → n58.b
n44.out → n59.a
n58.out → n59.b
n6.out → n57.atom1
n59.out → n57.formula1
n13.out → n57.atom2
n8.out → n57.formula2
n50.out → n49.a
n57.out → n49.b
n18.out → n61.assertion
n6.out → n61.atom1
n8.out → n61.formula1
n13.out → n61.atom2
n44.out → n61.formula2
n20.out → n61.atom3
n58.out → n61.formula3
n49.out → n48.a
n61.out → n48.b
n35.out → n34.a
n48.out → n34.b
n18.out → n63.assertion
n6.out → n63.atom1
n8.out → n63.formula1
n13.out → n63.atom2
n12.out → n63.formula2
n20.out → n63.atom3
n55.out → n63.formula3
n34.out → n33.a
n63.out → n33.b
n4.out → n65.assertion
n8.out → n66.a
n55.out → n66.b
n27.out → n67.a
n66.out → n67.b
n6.out → n65.atom1
n67.out → n65.formula1
n13.out → n65.atom2
n12.out → n65.formula2
n33.out → n32.a
n65.out → n32.b
n18.out → n69.assertion
n6.out → n69.atom1
n12.out → n69.formula1
n13.out → n69.atom2
n27.out → n69.formula2
n20.out → n69.atom3
n66.out → n69.formula3
n32.out → n31.a
n69.out → n31.b
n24.out → n1.a
n31.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-29 · 全称三段论（换序）

- 目标：`⊢ ( ∀ x ( F ( x ) → G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ∀ x ( F ( x ) → H ( x ) ) ) )`
- 提示：谓词换序后的全称三段论。
- 参考解：1 个模块 / 1 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  定理 *undefined

接线：
n1.out → nt.proof
```

</details>

### Ⅱ-30 · 辖域移动（变体三）

- 目标：`⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )`
- 提示：另一组合法的辖域移动实例。
- 参考解：1 个模块 / 1 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  定理 *undefined

接线：
n1.out → nt.proof
```

</details>

### Ⅱ-31 · 全称三段论（H/F）

- 目标：`⊢ ( ∀ x ( F ( x ) → H ( x ) ) → ( ( G ( x ) → ∀ x F ( x ) ) → ( G ( x ) → ∀ x H ( x ) ) ) )`
- 提示：换谓词的全称三段论。
- 参考解：34 个模块 / 76 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
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
n19  subst(groups=1)
n20  imp
n21  imp
n22  imp
n23  all(v=x)
n24  axiom A2
n25  subst(groups=2)
n26  atom R
n27  mp
n28  mp
n30  subst(groups=2)
n32  subst(groups=1)
n33  imp
n34  imp
n35  imp
n36  imp
n38  subst(groups=2)

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
n12.out → n19.assertion
n17.out → n20.a
n16.out → n20.b
n16.out → n21.a
n20.out → n21.b
n5.out → n19.atom1
n21.out → n19.formula1
n7.out → n22.a
n9.out → n22.b
n22.out → n23.a
n8.out → n19.atom2
n23.out → n19.formula2
n13.out → n11.a
n19.out → n11.b
n24.out → n25.assertion
n5.out → n25.atom1
n23.out → n25.formula1
n8.out → n25.atom2
n16.out → n25.formula2
n26.out → n25.atom3
n20.out → n25.formula3
n11.out → n10.a
n25.out → n10.b
n4.out → n2.a
n10.out → n2.b
n24.out → n30.assertion
n5.out → n30.atom1
n17.out → n30.formula1
n8.out → n30.atom2
n14.out → n30.formula2
n26.out → n30.atom3
n15.out → n30.formula3
n12.out → n32.assertion
n17.out → n33.a
n14.out → n33.b
n17.out → n34.a
n15.out → n34.b
n33.out → n35.a
n34.out → n35.b
n20.out → n36.a
n35.out → n36.b
n5.out → n32.atom1
n36.out → n32.formula1
n8.out → n32.atom2
n23.out → n32.formula2
n30.out → n28.a
n32.out → n28.b
n24.out → n38.assertion
n5.out → n38.atom1
n23.out → n38.formula1
n8.out → n38.atom2
n20.out → n38.formula2
n26.out → n38.atom3
n35.out → n38.formula3
n28.out → n27.a
n38.out → n27.b
n2.out → n1.a
n27.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-32 · 全称合并（换序）

- 目标：`⊢ ( ( ∀ x G ( x ) → ∀ x ∀ x G ( x ) ) → ( ( ∀ x ( ∀ x G ( x ) → F ( x ) ) → ( ∀ x ∀ x G ( x ) → ∀ x F ( x ) ) ) → ( ∀ x ( ∀ x G ( x ) → F ( x ) ) → ( ∀ x G ( x ) → ∀ x F ( x ) ) ) ) )`
- 提示：换谓词后的全称合并。
- 参考解：93 个模块 / 284 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  mp
n6  axiom A1
n8  atom P
n9  term x
n10  pred G
n11  all(v=x)
n12  all(v=x)
n13  imp
n14  atom Q
n19  axiom A2
n21  atom R
n25  subst(groups=1)
n26  pred F
n27  all(v=x)
n28  imp
n31  imp
n35  mp
n36  mp
n37  mp
n38  mp
n39  mp
n40  mp
n41  mp
n43  subst(groups=1)
n44  mp
n46  subst(groups=1)
n47  imp
n49  subst(groups=2)
n51  subst(groups=1)
n52  mp
n53  mp
n55  subst(groups=1)
n57  subst(groups=1)
n58  imp
n59  imp
n61  subst(groups=2)
n62  mp
n63  mp
n65  subst(groups=2)
n67  subst(groups=1)
n68  imp
n69  imp
n71  subst(groups=2)
n72  mp
n73  mp
n74  mp
n75  mp
n76  mp
n89  subst(groups=1)
n92  imp
n96  mp
n97  mp
n99  subst(groups=2)
n101  subst(groups=1)
n102  imp
n103  imp
n104  imp
n106  subst(groups=2)
n108  subst(groups=1)
n109  imp
n111  subst(groups=2)
n113  subst(groups=1)
n114  imp
n116  subst(groups=2)
n117  mp
n118  mp
n120  subst(groups=2)
n122  subst(groups=1)
n123  imp
n124  imp
n125  imp
n127  subst(groups=2)
n129  subst(groups=2)
n130  mp
n131  mp
n133  subst(groups=1)
n134  imp
n135  all(v=x)
n137  subst(groups=1)
n138  imp
n139  imp
n141  subst(groups=2)
n142  mp
n143  mp
n145  subst(groups=2)
n147  subst(groups=1)
n148  imp
n149  imp
n150  imp
n151  imp
n153  subst(groups=2)

接线：
n9.out → n10.t1
n10.out → n11.a
n11.out → n12.a
n11.out → n13.a
n12.out → n13.b
n6.out → n25.assertion
n8.out → n25.atom1
n13.out → n25.formula1
n9.out → n26.t1
n26.out → n27.a
n12.out → n28.a
n27.out → n28.b
n14.out → n25.atom2
n28.out → n25.formula2
n28.out → n31.a
n13.out → n31.b
n6.out → n43.assertion
n8.out → n43.atom1
n27.out → n43.formula1
n14.out → n43.atom2
n27.out → n43.formula2
n6.out → n46.assertion
n8.out → n46.atom1
n27.out → n46.formula1
n27.out → n47.a
n27.out → n47.b
n14.out → n46.atom2
n47.out → n46.formula2
n19.out → n49.assertion
n8.out → n49.atom1
n27.out → n49.formula1
n14.out → n49.atom2
n47.out → n49.formula2
n21.out → n49.atom3
n27.out → n49.formula3
n46.out → n44.a
n49.out → n44.b
n43.out → n41.a
n44.out → n41.b
n6.out → n51.assertion
n8.out → n51.atom1
n47.out → n51.formula1
n14.out → n51.atom2
n13.out → n51.formula2
n41.out → n40.a
n51.out → n40.b
n6.out → n55.assertion
n8.out → n55.atom1
n47.out → n55.formula1
n14.out → n55.atom2
n12.out → n55.formula2
n6.out → n57.assertion
n12.out → n58.a
n47.out → n58.b
n47.out → n59.a
n58.out → n59.b
n8.out → n57.atom1
n59.out → n57.formula1
n14.out → n57.atom2
n13.out → n57.formula2
n55.out → n53.a
n57.out → n53.b
n19.out → n61.assertion
n8.out → n61.atom1
n13.out → n61.formula1
n14.out → n61.atom2
n47.out → n61.formula2
n21.out → n61.atom3
n58.out → n61.formula3
n53.out → n52.a
n61.out → n52.b
n40.out → n39.a
n52.out → n39.b
n19.out → n65.assertion
n8.out → n65.atom1
n12.out → n65.formula1
n14.out → n65.atom2
n27.out → n65.formula2
n21.out → n65.atom3
n27.out → n65.formula3
n6.out → n67.assertion
n28.out → n68.a
n28.out → n68.b
n58.out → n69.a
n68.out → n69.b
n8.out → n67.atom1
n69.out → n67.formula1
n14.out → n67.atom2
n13.out → n67.formula2
n65.out → n63.a
n67.out → n63.b
n19.out → n71.assertion
n8.out → n71.atom1
n13.out → n71.formula1
n14.out → n71.atom2
n58.out → n71.formula2
n21.out → n71.atom3
n68.out → n71.formula3
n63.out → n62.a
n71.out → n62.b
n39.out → n38.a
n62.out → n38.b
n6.out → n89.assertion
n8.out → n89.atom1
n28.out → n89.formula1
n14.out → n89.atom2
n11.out → n89.formula2
n11.out → n92.a
n28.out → n92.b
n19.out → n99.assertion
n8.out → n99.atom1
n11.out → n99.formula1
n14.out → n99.atom2
n12.out → n99.formula2
n21.out → n99.atom3
n27.out → n99.formula3
n6.out → n101.assertion
n11.out → n102.a
n27.out → n102.b
n13.out → n103.a
n102.out → n103.b
n92.out → n104.a
n103.out → n104.b
n8.out → n101.atom1
n104.out → n101.formula1
n14.out → n101.atom2
n28.out → n101.formula2
n99.out → n97.a
n101.out → n97.b
n19.out → n106.assertion
n8.out → n106.atom1
n28.out → n106.formula1
n14.out → n106.atom2
n92.out → n106.formula2
n21.out → n106.atom3
n103.out → n106.formula3
n97.out → n96.a
n106.out → n96.b
n89.out → n76.a
n96.out → n76.b
n6.out → n108.assertion
n28.out → n109.a
n103.out → n109.b
n8.out → n108.atom1
n109.out → n108.formula1
n14.out → n108.atom2
n28.out → n108.formula2
n76.out → n75.a
n108.out → n75.b
n19.out → n111.assertion
n8.out → n111.atom1
n28.out → n111.formula1
n14.out → n111.atom2
n28.out → n111.formula2
n21.out → n111.atom3
n103.out → n111.formula3
n75.out → n74.a
n111.out → n74.b
n6.out → n113.assertion
n68.out → n114.a
n109.out → n114.b
n8.out → n113.atom1
n114.out → n113.formula1
n14.out → n113.atom2
n13.out → n113.formula2
n74.out → n73.a
n113.out → n73.b
n19.out → n116.assertion
n8.out → n116.atom1
n13.out → n116.formula1
n14.out → n116.atom2
n68.out → n116.formula2
n21.out → n116.atom3
n109.out → n116.formula3
n73.out → n72.a
n116.out → n72.b
n38.out → n37.a
n72.out → n37.b
n19.out → n120.assertion
n8.out → n120.atom1
n28.out → n120.formula1
n14.out → n120.atom2
n13.out → n120.formula2
n21.out → n120.atom3
n102.out → n120.formula3
n6.out → n122.assertion
n28.out → n123.a
n102.out → n123.b
n31.out → n124.a
n123.out → n124.b
n109.out → n125.a
n124.out → n125.b
n8.out → n122.atom1
n125.out → n122.formula1
n14.out → n122.atom2
n13.out → n122.formula2
n120.out → n118.a
n122.out → n118.b
n19.out → n127.assertion
n8.out → n127.atom1
n13.out → n127.formula1
n14.out → n127.atom2
n109.out → n127.formula2
n21.out → n127.atom3
n124.out → n127.formula3
n118.out → n117.a
n127.out → n117.b
n37.out → n36.a
n117.out → n36.b
n19.out → n129.assertion
n8.out → n129.atom1
n13.out → n129.formula1
n14.out → n129.atom2
n31.out → n129.formula2
n21.out → n129.atom3
n123.out → n129.formula3
n36.out → n35.a
n129.out → n35.b
n25.out → n3.a
n35.out → n3.b
n6.out → n133.assertion
n8.out → n133.atom1
n123.out → n133.formula1
n11.out → n134.a
n26.out → n134.b
n134.out → n135.a
n14.out → n133.atom2
n135.out → n133.formula2
n6.out → n137.assertion
n135.out → n138.a
n123.out → n138.b
n123.out → n139.a
n138.out → n139.b
n8.out → n137.atom1
n139.out → n137.formula1
n14.out → n137.atom2
n13.out → n137.formula2
n133.out → n131.a
n137.out → n131.b
n19.out → n141.assertion
n8.out → n141.atom1
n13.out → n141.formula1
n14.out → n141.atom2
n123.out → n141.formula2
n21.out → n141.atom3
n138.out → n141.formula3
n131.out → n130.a
n141.out → n130.b
n3.out → n2.a
n130.out → n2.b
n19.out → n145.assertion
n8.out → n145.atom1
n135.out → n145.formula1
n14.out → n145.atom2
n28.out → n145.formula2
n21.out → n145.atom3
n102.out → n145.formula3
n6.out → n147.assertion
n135.out → n148.a
n28.out → n148.b
n135.out → n149.a
n102.out → n149.b
n148.out → n150.a
n149.out → n150.b
n138.out → n151.a
n150.out → n151.b
n8.out → n147.atom1
n151.out → n147.formula1
n14.out → n147.atom2
n13.out → n147.formula2
n145.out → n143.a
n147.out → n143.b
n19.out → n153.assertion
n8.out → n153.atom1
n13.out → n153.formula1
n14.out → n153.atom2
n138.out → n153.formula2
n21.out → n153.atom3
n150.out → n153.formula3
n143.out → n142.a
n153.out → n142.b
n2.out → n1.a
n142.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-33 · 全称替换前件（G）

- 目标：`⊢ ( ( G ( x ) → F ( x ) ) → ( ∀ x G ( x ) → F ( x ) ) )`
- 提示：(G(x)→F(x))→(∀xG(x)→F(x))。
- 参考解：45 个模块 / 125 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n3  mp
n4  axiom A1
n5  subst(groups=1)
n6  atom P
n7  term x
n8  pred G
n9  pred F
n10  imp
n11  atom Q
n12  mp
n14  subst(groups=1)
n15  imp
n16  axiom A2
n17  subst(groups=2)
n18  atom R
n22  subst(groups=1)
n23  all(v=x)
n26  imp
n30  mp
n31  mp
n32  mp
n33  mp
n34  mp
n36  定理 *undefined
n37  mp
n38  mp
n40  subst(groups=1)
n42  subst(groups=1)
n43  imp
n44  imp
n46  subst(groups=2)
n47  mp
n48  mp
n49  mp
n66  subst(groups=2)
n68  subst(groups=1)
n69  imp
n70  imp
n72  subst(groups=2)
n74  subst(groups=2)
n76  subst(groups=1)
n77  imp
n78  imp
n80  subst(groups=2)

接线：
n4.out → n5.assertion
n7.out → n8.t1
n7.out → n9.t1
n8.out → n10.a
n9.out → n10.b
n6.out → n5.atom1
n10.out → n5.formula1
n11.out → n5.atom2
n10.out → n5.formula2
n4.out → n14.assertion
n6.out → n14.atom1
n10.out → n14.formula1
n10.out → n15.a
n10.out → n15.b
n11.out → n14.atom2
n15.out → n14.formula2
n16.out → n17.assertion
n6.out → n17.atom1
n10.out → n17.formula1
n11.out → n17.atom2
n15.out → n17.formula2
n18.out → n17.atom3
n10.out → n17.formula3
n14.out → n12.a
n17.out → n12.b
n5.out → n3.a
n12.out → n3.b
n4.out → n22.assertion
n6.out → n22.atom1
n10.out → n22.formula1
n8.out → n23.a
n11.out → n22.atom2
n23.out → n22.formula2
n23.out → n26.a
n10.out → n26.b
n4.out → n40.assertion
n6.out → n40.atom1
n8.out → n40.formula1
n11.out → n40.atom2
n10.out → n40.formula2
n4.out → n42.assertion
n10.out → n43.a
n8.out → n43.b
n8.out → n44.a
n43.out → n44.b
n6.out → n42.atom1
n44.out → n42.formula1
n11.out → n42.atom2
n23.out → n42.formula2
n40.out → n38.a
n42.out → n38.b
n16.out → n46.assertion
n6.out → n46.atom1
n23.out → n46.formula1
n11.out → n46.atom2
n8.out → n46.formula2
n18.out → n46.atom3
n43.out → n46.formula3
n38.out → n37.a
n46.out → n37.b
n36.out → n34.a
n37.out → n34.b
n16.out → n66.assertion
n6.out → n66.atom1
n10.out → n66.formula1
n11.out → n66.atom2
n8.out → n66.formula2
n18.out → n66.atom3
n9.out → n66.formula3
n3.out → n49.a
n66.out → n49.b
n4.out → n68.assertion
n10.out → n69.a
n9.out → n69.b
n43.out → n70.a
n69.out → n70.b
n6.out → n68.atom1
n70.out → n68.formula1
n11.out → n68.atom2
n23.out → n68.formula2
n49.out → n48.a
n68.out → n48.b
n16.out → n72.assertion
n6.out → n72.atom1
n23.out → n72.formula1
n11.out → n72.atom2
n43.out → n72.formula2
n18.out → n72.atom3
n69.out → n72.formula3
n48.out → n47.a
n72.out → n47.b
n34.out → n33.a
n47.out → n33.b
n16.out → n74.assertion
n6.out → n74.atom1
n23.out → n74.formula1
n11.out → n74.atom2
n10.out → n74.formula2
n18.out → n74.atom3
n9.out → n74.formula3
n33.out → n32.a
n74.out → n32.b
n4.out → n76.assertion
n23.out → n77.a
n9.out → n77.b
n26.out → n78.a
n77.out → n78.b
n6.out → n76.atom1
n78.out → n76.formula1
n11.out → n76.atom2
n10.out → n76.formula2
n32.out → n31.a
n76.out → n31.b
n16.out → n80.assertion
n6.out → n80.atom1
n10.out → n80.formula1
n11.out → n80.atom2
n26.out → n80.formula2
n18.out → n80.atom3
n77.out → n80.formula3
n31.out → n30.a
n80.out → n30.b
n22.out → n1.a
n30.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅱ-34 · 辖域移动（F/G 变体）

- 目标：`⊢ ( ∀ x ( F ( z ) → G ( y ) ) → ( F ( z ) → ∀ x G ( y ) ) )`
- 提示：另一组合法的辖域移动。
- 参考解：44 个模块 / 110 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n4  axiom A1
n6  atom P
n7  term z
n8  pred F
n9  term y
n10  pred G
n11  imp
n12  all(v=x)
n13  atom Q
n18  axiom A2
n20  atom R
n24  subst(groups=1)
n27  imp
n31  mp
n32  mp
n33  mp
n34  mp
n35  mp
n36  shift(v=x)
n37  mp
n38  mp
n40  subst(groups=1)
n41  all(v=x)
n43  subst(groups=1)
n44  imp
n45  imp
n47  subst(groups=2)
n48  mp
n49  mp
n50  mp
n51  axiom A5(v=x)
n52  subst(groups=1)
n54  subst(groups=2)
n55  all(v=x)
n57  subst(groups=1)
n58  imp
n59  imp
n61  subst(groups=2)
n63  subst(groups=2)
n65  subst(groups=1)
n66  imp
n67  imp
n69  subst(groups=2)

接线：
n7.out → n8.t1
n9.out → n10.t1
n8.out → n11.a
n10.out → n11.b
n11.out → n12.a
n4.out → n24.assertion
n6.out → n24.atom1
n12.out → n24.formula1
n13.out → n24.atom2
n8.out → n24.formula2
n8.out → n27.a
n12.out → n27.b
n8.out → n36.formula
n4.out → n40.assertion
n8.out → n41.a
n6.out → n40.atom1
n41.out → n40.formula1
n13.out → n40.atom2
n12.out → n40.formula2
n4.out → n43.assertion
n12.out → n44.a
n41.out → n44.b
n41.out → n45.a
n44.out → n45.b
n6.out → n43.atom1
n45.out → n43.formula1
n13.out → n43.atom2
n8.out → n43.formula2
n40.out → n38.a
n43.out → n38.b
n18.out → n47.assertion
n6.out → n47.atom1
n8.out → n47.formula1
n13.out → n47.atom2
n41.out → n47.formula2
n20.out → n47.atom3
n44.out → n47.formula3
n38.out → n37.a
n47.out → n37.b
n36.out → n35.a
n37.out → n35.b
n51.out → n52.assertion
n6.out → n52.atom1
n8.out → n52.formula1
n13.out → n52.atom2
n10.out → n52.formula2
n18.out → n54.assertion
n6.out → n54.atom1
n12.out → n54.formula1
n13.out → n54.atom2
n41.out → n54.formula2
n10.out → n55.a
n20.out → n54.atom3
n55.out → n54.formula3
n52.out → n50.a
n54.out → n50.b
n4.out → n57.assertion
n12.out → n58.a
n55.out → n58.b
n44.out → n59.a
n58.out → n59.b
n6.out → n57.atom1
n59.out → n57.formula1
n13.out → n57.atom2
n8.out → n57.formula2
n50.out → n49.a
n57.out → n49.b
n18.out → n61.assertion
n6.out → n61.atom1
n8.out → n61.formula1
n13.out → n61.atom2
n44.out → n61.formula2
n20.out → n61.atom3
n58.out → n61.formula3
n49.out → n48.a
n61.out → n48.b
n35.out → n34.a
n48.out → n34.b
n18.out → n63.assertion
n6.out → n63.atom1
n8.out → n63.formula1
n13.out → n63.atom2
n12.out → n63.formula2
n20.out → n63.atom3
n55.out → n63.formula3
n34.out → n33.a
n63.out → n33.b
n4.out → n65.assertion
n8.out → n66.a
n55.out → n66.b
n27.out → n67.a
n66.out → n67.b
n6.out → n65.atom1
n67.out → n65.formula1
n13.out → n65.atom2
n12.out → n65.formula2
n33.out → n32.a
n65.out → n32.b
n18.out → n69.assertion
n6.out → n69.atom1
n12.out → n69.formula1
n13.out → n69.atom2
n27.out → n69.formula2
n20.out → n69.atom3
n66.out → n69.formula3
n32.out → n31.a
n69.out → n31.b
n24.out → n1.a
n31.out → n1.b
n1.out → nt.proof
```

</details>

## Ⅲ 章

### i · 等词自反

- 目标：`⊢ x = x`
- 提示：=I · t = t
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

### ii · Leibniz 替换

- 目标：`⊢ ( x = y → ( F ( x ) → F ( y ) ) )`
- 提示：=L · x=y ⇒ F(x) → F(y)
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

### iii · Leibniz 反向

- 目标：`⊢ ( y = x → ( F ( y ) → F ( x ) ) )`
- 提示：=L · y=x ⇒ F(y) → F(x)
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n6  [target]
n1  leibniz(mode=abstract, v=z)
n2  term y
n3  term x
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

### iv · 等词替换（直接模式）

- 目标：`⊢ ( x = y → ( x = z → y = z ) )`
- 提示：=L · x=y ⇒ (x=z → y=z)
- 参考解：5 个模块 / 6 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n6  [target]
n1  leibniz(mode=replace, v=z)
n2  term x
n3  term y
n4  term z
n5  pred =

接线：
n2.out → n1.x
n3.out → n1.y
n2.out → n5.t1
n4.out → n5.t2
n5.out → n1.formula
n1.out → n6.proof
```

</details>

### Ⅲ-01 · 引理 · x = x→y = y→x = x∧y 

- 目标：`⊢ ( x = x → ( y = y → ( x = x ∧ y = y ) ) )`
- 提示：第Ⅲ章先证：x = x→y = y→x = x∧y = y。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：5 个模块 / 7 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  and-intro-ax
n2  pred =
n3  pred =
n4  term y
n5  term x

接线：
n5.out → n2.t1
n5.out → n2.t2
n2.out → n1.a
n4.out → n3.t1
n4.out → n3.t2
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-02 · 引理 · F(y)→y = y→F(y)

- 目标：`⊢ ( F ( y ) → ( y = y → F ( y ) ) )`
- 提示：第Ⅲ章先证：F(y)→y = y→F(y)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：7 个模块 / 9 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=1)
n2  axiom A1
n3  atom P
n4  pred F
n5  atom Q
n6  pred =
n7  term y

接线：
n7.out → n4.t1
n2.out → n1.assertion
n3.out → n1.atom1
n4.out → n1.formula1
n7.out → n6.t1
n7.out → n6.t2
n5.out → n1.atom2
n6.out → n1.formula2
n1.out → nt.proof
```

</details>

### Ⅲ-03 · 引理 · x = x→x = y→x = x

- 目标：`⊢ ( x = x → ( x = y → x = x ) )`
- 提示：第Ⅲ章先证：x = x→x = y→x = x。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：8 个模块 / 10 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=1)
n2  axiom A1
n3  atom P
n4  pred =
n5  atom Q
n6  pred =
n7  term x
n8  term y

接线：
n2.out → n1.assertion
n7.out → n4.t1
n7.out → n4.t2
n3.out → n1.atom1
n4.out → n1.formula1
n7.out → n6.t1
n8.out → n6.t2
n5.out → n1.atom2
n6.out → n1.formula2
n1.out → nt.proof
```

</details>

### Ⅲ-04 · 引理 · (x = y→y = x→x = y∧y

- 目标：`⊢ ( ( x = y → ( y = x → ( x = y ∧ y = x ) ) ) → ( ( x = y → y = x ) → ( x = y → ( x = y ∧ y = x ) ) ) )`
- 提示：第Ⅲ章先证：(x = y→y = x→x = y∧y = x)→(x = y→y = x)→x = y→x = y∧y = x。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：10 个模块 / 14 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=2)
n2  axiom A2
n3  atom P
n4  pred =
n5  atom Q
n6  pred =
n7  atom R
n8  and
n9  term y
n10  term x

接线：
n10.out → n4.t1
n9.out → n4.t2
n9.out → n6.t1
n10.out → n6.t2
n4.out → n8.a
n6.out → n8.b
n2.out → n1.assertion
n3.out → n1.atom1
n4.out → n1.formula1
n5.out → n1.atom2
n6.out → n1.formula2
n7.out → n1.atom3
n8.out → n1.formula3
n1.out → nt.proof
```

</details>

### Ⅲ-05 · 引理 · (x = y→y = x)→x = y→

- 目标：`⊢ ( ( x = y → y = x ) → ( x = y → ( x = y ∧ y = x ) ) )`
- 提示：第Ⅲ章先证：(x = y→y = x)→x = y→x = y∧y = x。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：12 个模块 / 18 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  and-intro-ax
n3  subst(groups=2)
n4  axiom A2
n5  atom P
n6  pred =
n7  atom Q
n8  pred =
n9  atom R
n10  and
n11  term y
n12  term x

接线：
n12.out → n6.t1
n11.out → n6.t2
n11.out → n8.t1
n12.out → n8.t2
n6.out → n2.a
n8.out → n2.b
n6.out → n10.a
n8.out → n10.b
n4.out → n3.assertion
n5.out → n3.atom1
n6.out → n3.formula1
n7.out → n3.atom2
n8.out → n3.formula2
n9.out → n3.atom3
n10.out → n3.formula3
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-06 · 引理 · (∀z (z ∈ y→z ∈ x)→z 

- 目标：`⊢ ( ( ∀ z ( z ∈ y → z ∈ x ) → ( z ∈ y → z ∈ x ) ) → ( x = y → ( ∀ z ( z ∈ y → z ∈ x ) → ( z ∈ y → z ∈ x ) ) ) )`
- 提示：第Ⅲ章先证：(∀z (z ∈ y→z ∈ x)→z ∈ y→z ∈ x)→x = y→∀z (z ∈ y→z ∈ x)→z ∈ y→z ∈ x。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：13 个模块 / 17 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=1)
n2  axiom A1
n3  atom P
n4  imp
n5  atom Q
n6  pred =
n7  term x
n8  term y
n9  all(v=z)
n10  imp
n11  mem
n12  mem
n13  term z

接线：
n7.out → n6.t1
n8.out → n6.t2
n13.out → n12.a
n7.out → n12.b
n13.out → n11.a
n8.out → n11.b
n11.out → n10.a
n12.out → n10.b
n10.out → n9.a
n2.out → n1.assertion
n9.out → n4.a
n10.out → n4.b
n3.out → n1.atom1
n4.out → n1.formula1
n5.out → n1.atom2
n6.out → n1.formula2
n1.out → nt.proof
```

</details>

### Ⅲ-07 · 引理 · x = y→x = z→F(x)→F(z

- 目标：`⊢ ( x = y → ( x = z → ( F ( x ) → F ( z ) ) ) )`
- 提示：第Ⅲ章先证：x = y→x = z→F(x)→F(z)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：15 个模块 / 21 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  leibniz(mode=replace, v=z)
n3  subst(groups=1)
n4  axiom A1
n5  atom P
n6  imp
n7  atom Q
n8  pred =
n9  term x
n10  term y
n11  pred =
n12  imp
n13  pred F
n14  pred F
n15  term z

接线：
n9.out → n8.t1
n10.out → n8.t2
n9.out → n11.t1
n15.out → n11.t2
n9.out → n2.x
n15.out → n2.y
n9.out → n13.t1
n13.out → n2.formula
n4.out → n3.assertion
n15.out → n14.t1
n13.out → n12.a
n14.out → n12.b
n11.out → n6.a
n12.out → n6.b
n5.out → n3.atom1
n6.out → n3.formula1
n7.out → n3.atom2
n8.out → n3.formula2
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-08 · 引理 · (x = y→x = y→(F(y)→G

- 目标：`⊢ ( ( x = y → ( x = y → ( ( F ( y ) → ( G ( y ) → F ( y ) ) ) → ( F ( x ) → ( G ( x ) → F ( x ) ) ) ) ) ) → ( ( x = y → x = y ) → ( x = y → ( ( F ( y ) → ( G ( y ) → F ( y ) ) ) → ( F ( x ) → ( G ( x ) → F ( x ) ) ) ) ) ) )`
- 提示：第Ⅲ章先证：(x = y→x = y→(F(y)→G(y)→F(y))→F(x)→G(x)→F(x))→(x = y→x = y)→x = y→(F(y)→G(y)→F(y))→F(x)→G(x)→F(x)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：17 个模块 / 24 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=2)
n2  axiom A2
n3  atom P
n4  pred =
n5  atom Q
n6  atom R
n7  imp
n8  imp
n9  imp
n10  pred F
n11  imp
n12  pred G
n13  term x
n14  pred F
n15  imp
n16  pred G
n17  term y

接线：
n13.out → n4.t1
n17.out → n4.t2
n17.out → n14.t1
n17.out → n16.t1
n16.out → n15.a
n14.out → n15.b
n14.out → n8.a
n15.out → n8.b
n13.out → n10.t1
n13.out → n12.t1
n12.out → n11.a
n10.out → n11.b
n10.out → n9.a
n11.out → n9.b
n8.out → n7.a
n9.out → n7.b
n2.out → n1.assertion
n3.out → n1.atom1
n4.out → n1.formula1
n5.out → n1.atom2
n4.out → n1.formula2
n6.out → n1.atom3
n7.out → n1.formula3
n1.out → nt.proof
```

</details>

### Ⅲ-09 · 引理 · x = y→(x = z→F(x)→F(

- 目标：`⊢ ( x = y → ( ( x = z → ( F ( x ) → F ( z ) ) ) → ( y = z → ( x = z → ( F ( x ) → F ( z ) ) ) ) ) )`
- 提示：第Ⅲ章先证：x = y→(x = z→F(x)→F(z))→y = z→x = z→F(x)→F(z)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：18 个模块 / 29 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  subst(groups=1)
n3  subst(groups=1)
n4  axiom A1
n5  atom P
n6  imp
n7  atom Q
n8  pred =
n9  term x
n10  term y
n11  imp
n12  imp
n13  pred =
n14  term z
n15  pred =
n16  imp
n17  pred F
n18  pred F

接线：
n10.out → n13.t1
n14.out → n13.t2
n9.out → n8.t1
n10.out → n8.t2
n9.out → n15.t1
n14.out → n15.t2
n9.out → n17.t1
n14.out → n18.t1
n17.out → n16.a
n18.out → n16.b
n15.out → n11.a
n16.out → n11.b
n4.out → n2.assertion
n5.out → n2.atom1
n11.out → n2.formula1
n7.out → n2.atom2
n13.out → n2.formula2
n4.out → n3.assertion
n13.out → n12.a
n11.out → n12.b
n11.out → n6.a
n12.out → n6.b
n5.out → n3.atom1
n6.out → n3.formula1
n7.out → n3.atom2
n8.out → n3.formula2
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-10 · 引理 · (x = y→F(x)→F(y))→x 

- 目标：`⊢ ( ( x = y → ( F ( x ) → F ( y ) ) ) → ( x = y → ( ( F ( y ) → F ( x ) ) → ( F ( x ) ↔ F ( y ) ) ) ) )`
- 提示：第Ⅲ章先证：(x = y→F(x)→F(y))→x = y→(F(y)→F(x))→(F(x)↔F(y))。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：20 个模块 / 33 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  subst(groups=2)
n4  axiom A2
n5  atom P
n6  pred =
n7  atom Q
n8  imp
n9  atom R
n10  imp
n11  imp
n12  iff
n13  pred F
n14  pred F
n15  term y
n16  term x
n17  iff-intro-ax
n18  subst(groups=1)
n19  axiom A1
n20  imp

接线：
n16.out → n6.t1
n15.out → n6.t2
n15.out → n14.t1
n16.out → n13.t1
n14.out → n11.a
n13.out → n11.b
n13.out → n8.a
n14.out → n8.b
n13.out → n17.a
n14.out → n17.b
n19.out → n18.assertion
n13.out → n12.a
n14.out → n12.b
n11.out → n10.a
n12.out → n10.b
n8.out → n20.a
n10.out → n20.b
n5.out → n18.atom1
n20.out → n18.formula1
n7.out → n18.atom2
n6.out → n18.formula2
n17.out → n2.a
n18.out → n2.b
n4.out → n3.assertion
n5.out → n3.atom1
n6.out → n3.formula1
n7.out → n3.atom2
n8.out → n3.formula2
n9.out → n3.atom3
n10.out → n3.formula3
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-11 · 自反（x）

- 目标：`⊢ x = x`
- 提示：任何个体等于自己：x=x。
- 参考解：1 个模块 / 1 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  eq-refl(t=x)

接线：
n1.out → nt.proof
```

</details>

### Ⅲ-12 · 自反式合并

- 目标：`⊢ ∀ x ∀ y ( x = x ∧ y = y )`
- 提示：两条自反式可以合成合取：∀x∀y(x=x ∧ y=y)。
- 参考解：7 个模块 / 7 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  mp
n4  mp
n5  定理 *undefined
n10  定理 *undefined
n11  eq-refl(t=y)

接线：
n5.out → n4.a
n10.out → n4.b
n4.out → n3.a
n11.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅲ-13 · 对称性

- 目标：`⊢ ( x = y → y = x )`
- 提示：x=y 可以反转成 y=x。
- 参考解：16 个模块 / 23 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  定理 *undefined
n3  mp
n4  leibniz(mode=abstract, v=z)
n5  term x
n6  term y
n7  term z
n8  pred =
n9  定理 *undefined
n10  subst(groups=2)
n11  atom P
n12  pred =
n13  atom Q
n14  pred =
n15  atom R
n16  pred =

接线：
n5.out → n4.x
n6.out → n4.y
n7.out → n8.t1
n5.out → n8.t2
n8.out → n4.formula
n9.out → n10.assertion
n5.out → n12.t1
n6.out → n12.t2
n11.out → n10.atom1
n12.out → n10.formula1
n5.out → n14.t1
n5.out → n14.t2
n13.out → n10.atom2
n14.out → n10.formula2
n6.out → n16.t1
n5.out → n16.t2
n15.out → n10.atom3
n16.out → n10.formula3
n4.out → n3.a
n10.out → n3.b
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-14 · 传递性

- 目标：`⊢ ( x = y → ( y = z → x = z ) )`
- 提示：x=y 与 y=z 推出 x=z。
- 参考解：13 个模块 / 19 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  leibniz(mode=abstract, v=z)
n3  term y
n4  term z
n5  term x
n6  pred =
n7  定理 *undefined
n8  subst(groups=2)
n9  atom P
n10  pred =
n11  atom Q
n12  pred =
n13  atom R

接线：
n3.out → n2.x
n4.out → n2.y
n5.out → n6.t1
n4.out → n6.t2
n6.out → n2.formula
n7.out → n8.assertion
n3.out → n10.t1
n4.out → n10.t2
n9.out → n8.atom1
n10.out → n8.formula1
n5.out → n12.t1
n3.out → n12.t2
n11.out → n8.atom2
n12.out → n8.formula2
n13.out → n8.atom3
n6.out → n8.formula3
n2.out → n1.a
n8.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-15 · 谓词替换

- 目标：`⊢ ( x = y → ( F ( x ) → F ( y ) ) )`
- 提示：x=y 说明 F(x) 与 F(y) 不可区分。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
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
n1.out → nt.proof
```

</details>

### Ⅲ-16 · 谓词替换（反向）

- 目标：`⊢ ( x = y → ( F ( y ) → F ( x ) ) )`
- 提示：x=y 也能把 F(y) 换回 F(x)。
- 参考解：18 个模块 / 24 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  leibniz(mode=abstract, v=z)
n3  term y
n4  term x
n5  term z
n6  pred F
n7  mp
n8  定理 *undefined
n9  定理 *undefined
n10  subst(groups=2)
n11  atom P
n12  pred =
n13  atom Q
n14  pred =
n15  atom R
n16  pred F
n17  pred F
n18  imp

接线：
n3.out → n2.x
n4.out → n2.y
n5.out → n6.t1
n6.out → n2.formula
n9.out → n10.assertion
n4.out → n12.t1
n3.out → n12.t2
n11.out → n10.atom1
n12.out → n10.formula1
n3.out → n14.t1
n4.out → n14.t2
n13.out → n10.atom2
n14.out → n10.formula2
n3.out → n16.t1
n4.out → n17.t1
n16.out → n18.a
n17.out → n18.b
n15.out → n10.atom3
n18.out → n10.formula3
n8.out → n7.a
n10.out → n7.b
n2.out → n1.a
n7.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-17 · 全称自反

- 目标：`⊢ ∀ x x = x`
- 提示：∀x x=x：自反式的全称闭包。
- 参考解：2 个模块 / 2 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=x)
n2  定理 *undefined

接线：
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅲ-18 · 对称的双向结论

- 目标：`⊢ ∀ x ∀ y ( x = y → ( x = y ∧ y = x ) )`
- 提示：x=y 同时给出 y=x 与 x=y 本身。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  mp
n4  定理 *undefined
n22  定理 *undefined

接线：
n4.out → n3.a
n22.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅲ-19 · 复合替换

- 目标：`⊢ ( x = y → ( ( F ( x ) → G ( x ) ) → ( F ( y ) → G ( y ) ) ) )`
- 提示：x=y 时 F(x)→G(x) 与 F(y)→G(y) 等价。
- 参考解：7 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
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
n1.out → nt.proof
```

</details>

### Ⅲ-20 · 否定替换

- 目标：`⊢ ( x = y → ( ¬ F ( x ) → ¬ F ( y ) ) )`
- 提示：x=y 时 ¬F(x) 与 ¬F(y) 等价：从反向替换接逆否，不再直接接 Leibniz。
- 参考解：19 个模块 / 27 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  定理 *undefined
n3  subst(groups=1)
n4  atom P
n5  term y
n6  pred F
n7  atom Q
n8  term x
n9  pred F
n10  mp
n11  定理 *undefined
n12  定理 *undefined
n13  subst(groups=2)
n14  pred =
n15  imp
n16  atom R
n17  not
n18  not
n19  imp

接线：
n2.out → n3.assertion
n5.out → n6.t1
n4.out → n3.atom1
n6.out → n3.formula1
n8.out → n9.t1
n7.out → n3.atom2
n9.out → n3.formula2
n12.out → n13.assertion
n8.out → n14.t1
n5.out → n14.t2
n4.out → n13.atom1
n14.out → n13.formula1
n6.out → n15.a
n9.out → n15.b
n7.out → n13.atom2
n15.out → n13.formula2
n9.out → n17.a
n6.out → n18.a
n17.out → n19.a
n18.out → n19.b
n16.out → n13.atom3
n19.out → n13.formula3
n11.out → n10.a
n13.out → n10.b
n3.out → n1.a
n10.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-21 · 条件替换

- 目标：`⊢ ( x = y → ( ( x = x → F ( x ) ) → ( y = y → F ( y ) ) ) )`
- 提示：x=y 时 (x=x→F(x)) 与 (y=y→F(y)) 等价：用自反式与前件插入。
- 参考解：105 个模块 / 303 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  mp
n4  mp
n5  mp
n6  定理 *undefined
n7  axiom A1
n8  定理 *undefined
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
n29  定理 *undefined
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
n49  subst(groups=1)
n51  imp
n54  mp
n55  mp
n56  mp
n57  mp
n58  定理 *undefined
n59  subst(groups=1)
n60  pred F
n61  imp
n62  imp
n63  mp
n64  mp
n65  subst(groups=1)
n66  subst(groups=1)
n67  imp
n68  imp
n69  subst(groups=2)
n70  mp
n71  mp
n72  subst(groups=2)
n73  subst(groups=1)
n74  imp
n75  imp
n76  imp
n77  subst(groups=2)
n78  subst(groups=2)
n79  mp
n80  mp
n81  subst(groups=2)
n82  subst(groups=1)
n83  imp
n84  imp
n85  imp
n86  subst(groups=2)
n87  subst(groups=2)
n88  mp
n89  mp
n90  mp
n91  mp
n92  定理 *undefined
n93  pred =
n94  subst(groups=1)
n95  imp
n96  imp
n97  mp
n98  mp
n99  subst(groups=1)
n100  subst(groups=1)
n101  imp
n102  imp
n103  subst(groups=2)
n104  mp
n105  mp
n106  subst(groups=2)
n107  subst(groups=1)
n108  imp
n109  imp
n110  imp
n111  subst(groups=2)
n112  subst(groups=2)

接线：
n10.out → n11.t1
n10.out → n11.t2
n10.out → n14.t1
n13.out → n14.t2
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
n7.out → n49.assertion
n9.out → n49.atom1
n14.out → n49.formula1
n12.out → n49.atom2
n19.out → n49.formula2
n19.out → n51.a
n14.out → n51.b
n7.out → n59.assertion
n13.out → n60.t1
n18.out → n61.a
n60.out → n61.b
n14.out → n62.a
n61.out → n62.b
n9.out → n59.atom1
n62.out → n59.formula1
n12.out → n59.atom2
n14.out → n59.formula2
n58.out → n57.a
n59.out → n57.b
n7.out → n65.assertion
n9.out → n65.atom1
n62.out → n65.formula1
n12.out → n65.atom2
n19.out → n65.formula2
n7.out → n66.assertion
n19.out → n67.a
n62.out → n67.b
n62.out → n68.a
n67.out → n68.b
n9.out → n66.atom1
n68.out → n66.formula1
n12.out → n66.atom2
n14.out → n66.formula2
n65.out → n64.a
n66.out → n64.b
n23.out → n69.assertion
n9.out → n69.atom1
n14.out → n69.formula1
n12.out → n69.atom2
n62.out → n69.formula2
n25.out → n69.atom3
n67.out → n69.formula3
n64.out → n63.a
n69.out → n63.b
n57.out → n56.a
n63.out → n56.b
n23.out → n72.assertion
n9.out → n72.atom1
n19.out → n72.formula1
n12.out → n72.atom2
n14.out → n72.formula2
n25.out → n72.atom3
n61.out → n72.formula3
n7.out → n73.assertion
n19.out → n74.a
n61.out → n74.b
n51.out → n75.a
n74.out → n75.b
n67.out → n76.a
n75.out → n76.b
n9.out → n73.atom1
n76.out → n73.formula1
n12.out → n73.atom2
n14.out → n73.formula2
n72.out → n71.a
n73.out → n71.b
n23.out → n77.assertion
n9.out → n77.atom1
n14.out → n77.formula1
n12.out → n77.atom2
n67.out → n77.formula2
n25.out → n77.atom3
n75.out → n77.formula3
n71.out → n70.a
n77.out → n70.b
n56.out → n55.a
n70.out → n55.b
n23.out → n78.assertion
n9.out → n78.atom1
n14.out → n78.formula1
n12.out → n78.atom2
n51.out → n78.formula2
n25.out → n78.atom3
n74.out → n78.formula3
n55.out → n54.a
n78.out → n54.b
n49.out → n44.a
n54.out → n44.b
n23.out → n81.assertion
n9.out → n81.atom1
n19.out → n81.formula1
n12.out → n81.atom2
n18.out → n81.formula2
n25.out → n81.atom3
n60.out → n81.formula3
n7.out → n82.assertion
n19.out → n83.a
n60.out → n83.b
n37.out → n84.a
n83.out → n84.b
n74.out → n85.a
n84.out → n85.b
n9.out → n82.atom1
n85.out → n82.formula1
n12.out → n82.atom2
n14.out → n82.formula2
n81.out → n80.a
n82.out → n80.b
n23.out → n86.assertion
n9.out → n86.atom1
n14.out → n86.formula1
n12.out → n86.atom2
n74.out → n86.formula2
n25.out → n86.atom3
n84.out → n86.formula3
n80.out → n79.a
n86.out → n79.b
n44.out → n43.a
n79.out → n43.b
n23.out → n87.assertion
n9.out → n87.atom1
n14.out → n87.formula1
n12.out → n87.atom2
n37.out → n87.formula2
n25.out → n87.atom3
n83.out → n87.formula3
n43.out → n42.a
n87.out → n42.b
n3.out → n2.a
n42.out → n2.b
n13.out → n93.t1
n13.out → n93.t2
n7.out → n94.assertion
n93.out → n95.a
n60.out → n95.b
n60.out → n96.a
n95.out → n96.b
n9.out → n94.atom1
n96.out → n94.formula1
n12.out → n94.atom2
n14.out → n94.formula2
n92.out → n91.a
n94.out → n91.b
n7.out → n99.assertion
n9.out → n99.atom1
n96.out → n99.formula1
n12.out → n99.atom2
n19.out → n99.formula2
n7.out → n100.assertion
n19.out → n101.a
n96.out → n101.b
n96.out → n102.a
n101.out → n102.b
n9.out → n100.atom1
n102.out → n100.formula1
n12.out → n100.atom2
n14.out → n100.formula2
n99.out → n98.a
n100.out → n98.b
n23.out → n103.assertion
n9.out → n103.atom1
n14.out → n103.formula1
n12.out → n103.atom2
n96.out → n103.formula2
n25.out → n103.atom3
n101.out → n103.formula3
n98.out → n97.a
n103.out → n97.b
n91.out → n90.a
n97.out → n90.b
n23.out → n106.assertion
n9.out → n106.atom1
n19.out → n106.formula1
n12.out → n106.atom2
n60.out → n106.formula2
n25.out → n106.atom3
n95.out → n106.formula3
n7.out → n107.assertion
n19.out → n108.a
n95.out → n108.b
n83.out → n109.a
n108.out → n109.b
n101.out → n110.a
n109.out → n110.b
n9.out → n107.atom1
n110.out → n107.formula1
n12.out → n107.atom2
n14.out → n107.formula2
n106.out → n105.a
n107.out → n105.b
n23.out → n111.assertion
n9.out → n111.atom1
n14.out → n111.formula1
n12.out → n111.atom2
n101.out → n111.formula2
n25.out → n111.atom3
n109.out → n111.formula3
n105.out → n104.a
n111.out → n104.b
n90.out → n89.a
n104.out → n89.b
n23.out → n112.assertion
n9.out → n112.atom1
n14.out → n112.formula1
n12.out → n112.atom2
n83.out → n112.formula2
n25.out → n112.atom3
n108.out → n112.formula3
n89.out → n88.a
n112.out → n88.b
n2.out → n1.a
n88.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-22 · 不含 x 的公式

- 目标：`⊢ ( x = y → ( ∀ z z = z → ∀ z z = z ) )`
- 提示：公式里没有占位变元时替换不改变它：用同一律 + A1 插入前件。
- 参考解：14 个模块 / 18 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  定理 *undefined
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
n1.out → nt.proof
```

</details>

### Ⅲ-23 · 谓词替换（双向）

- 目标：`⊢ ∀ x ∀ y ( x = y → ( F ( x ) ↔ F ( y ) ) )`
- 提示：∀x∀y(x=y → (F(x)↔F(y)))：两个方向的替换合起来是等价。
- 参考解：20 个模块 / 24 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  mp
n4  定理 *undefined
n7  atom P
n8  term x
n9  term y
n10  pred =
n16  pred F
n17  pred F
n18  imp
n20  atom Q
n21  axiom A2
n23  atom R
n24  mp
n25  mp
n26  定理 *undefined
n34  定理 *undefined
n38  iff
n42  subst(groups=2)

接线：
n8.out → n10.t1
n9.out → n10.t2
n9.out → n16.t1
n8.out → n17.t1
n16.out → n18.a
n17.out → n18.b
n17.out → n38.a
n16.out → n38.b
n26.out → n25.a
n34.out → n25.b
n21.out → n42.assertion
n7.out → n42.atom1
n10.out → n42.formula1
n20.out → n42.atom2
n18.out → n42.formula2
n23.out → n42.atom3
n38.out → n42.formula3
n25.out → n24.a
n42.out → n24.b
n4.out → n3.a
n24.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅲ-24 · 否定复合替换

- 目标：`⊢ ( x = y → ( ¬ ( F ( x ) → G ( x ) ) → ¬ ( F ( y ) → G ( y ) ) ) )`
- 提示：x=y 时 ¬(F(x)→G(x)) 与 ¬(F(y)→G(y)) 等价。
- 参考解：8 个模块 / 9 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
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
n1.out → nt.proof
```

</details>

### Ⅲ-25 · 自反条件替换

- 目标：`⊢ ( x = y → ( ( F ( x ) → F ( x ) ) → ( F ( y ) → F ( y ) ) ) )`
- 提示：x=y 时 (F(x)→F(x)) 与 (F(y)→F(y)) 等价：完全是命题演算的组合。
- 参考解：21 个模块 / 37 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  定理 *undefined
n3  subst(groups=2)
n4  atom P
n5  term x
n6  pred F
n7  imp
n8  atom Q
n9  term y
n10  pred =
n11  atom R
n12  pred F
n13  imp
n14  mp
n15  axiom A1
n16  subst(groups=1)
n17  imp
n18  mp
n19  定理 *undefined
n20  subst(groups=0)
n21  subst(groups=1)

接线：
n2.out → n3.assertion
n5.out → n6.t1
n6.out → n7.a
n6.out → n7.b
n4.out → n3.atom1
n7.out → n3.formula1
n5.out → n10.t1
n9.out → n10.t2
n8.out → n3.atom2
n10.out → n3.formula2
n9.out → n12.t1
n12.out → n13.a
n12.out → n13.b
n11.out → n3.atom3
n13.out → n3.formula3
n15.out → n16.assertion
n10.out → n17.a
n13.out → n17.b
n4.out → n16.atom1
n17.out → n16.formula1
n8.out → n16.atom2
n7.out → n16.formula2
n19.out → n20.assertion
n4.out → n20.atom1
n12.out → n20.formula1
n15.out → n21.assertion
n4.out → n21.atom1
n13.out → n21.formula1
n8.out → n21.atom2
n10.out → n21.formula2
n20.out → n18.a
n21.out → n18.b
n16.out → n14.a
n18.out → n14.b
n3.out → n1.a
n14.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-26 · 全称辖域（定理）

- 目标：`⊢ ( ∀ z ( P → Q ) → ( P → ∀ z Q ) )`
- 提示：∀z(P→Q)→(P→∀zQ)，由 A5 + 全称引入 + A1/A2 证明，不再是公理。
- 参考解：52 个模块 / 141 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n5  axiom A1
n7  atom P
n9  atom Q
n10  imp
n11  all(v=z)
n15  mp
n16  shift(v=z)
n17  subst(groups=1)
n18  all(v=z)
n19  imp
n26  axiom A2
n28  atom R
n37  mp
n38  mp
n39  mp
n44  subst(groups=1)
n46  imp
n49  mp
n50  mp
n51  mp
n52  mp
n53  axiom A5(v=z)
n54  subst(groups=1)
n55  all(v=z)
n56  imp
n57  imp
n58  mp
n59  mp
n60  subst(groups=1)
n61  subst(groups=1)
n62  imp
n63  imp
n64  subst(groups=2)
n65  mp
n66  mp
n67  subst(groups=1)
n68  subst(groups=1)
n69  imp
n70  imp
n71  imp
n72  subst(groups=2)
n73  subst(groups=2)
n74  mp
n75  mp
n76  subst(groups=1)
n77  subst(groups=1)
n78  imp
n79  imp
n80  imp
n81  subst(groups=2)
n82  subst(groups=2)

接线：
n7.out → n10.a
n9.out → n10.b
n10.out → n11.a
n7.out → n16.formula
n5.out → n17.assertion
n7.out → n18.a
n7.out → n19.a
n18.out → n19.b
n7.out → n17.atom1
n19.out → n17.formula1
n9.out → n17.atom2
n11.out → n17.formula2
n16.out → n15.a
n17.out → n15.b
n5.out → n44.assertion
n7.out → n44.atom1
n11.out → n44.formula1
n9.out → n44.atom2
n7.out → n44.formula2
n7.out → n46.a
n11.out → n46.b
n5.out → n54.assertion
n9.out → n55.a
n18.out → n56.a
n55.out → n56.b
n11.out → n57.a
n56.out → n57.b
n7.out → n54.atom1
n57.out → n54.formula1
n9.out → n54.atom2
n11.out → n54.formula2
n53.out → n52.a
n54.out → n52.b
n5.out → n60.assertion
n7.out → n60.atom1
n57.out → n60.formula1
n9.out → n60.atom2
n7.out → n60.formula2
n5.out → n61.assertion
n7.out → n62.a
n57.out → n62.b
n57.out → n63.a
n62.out → n63.b
n7.out → n61.atom1
n63.out → n61.formula1
n9.out → n61.atom2
n11.out → n61.formula2
n60.out → n59.a
n61.out → n59.b
n26.out → n64.assertion
n7.out → n64.atom1
n11.out → n64.formula1
n9.out → n64.atom2
n57.out → n64.formula2
n28.out → n64.atom3
n62.out → n64.formula3
n59.out → n58.a
n64.out → n58.b
n52.out → n51.a
n58.out → n51.b
n26.out → n67.assertion
n9.out → n67.atom1
n11.out → n67.formula1
n28.out → n67.atom2
n56.out → n67.formula2
n5.out → n68.assertion
n7.out → n69.a
n56.out → n69.b
n46.out → n70.a
n69.out → n70.b
n62.out → n71.a
n70.out → n71.b
n7.out → n68.atom1
n71.out → n68.formula1
n9.out → n68.atom2
n11.out → n68.formula2
n67.out → n66.a
n68.out → n66.b
n26.out → n72.assertion
n7.out → n72.atom1
n11.out → n72.formula1
n9.out → n72.atom2
n62.out → n72.formula2
n28.out → n72.atom3
n70.out → n72.formula3
n66.out → n65.a
n72.out → n65.b
n51.out → n50.a
n65.out → n50.b
n26.out → n73.assertion
n7.out → n73.atom1
n11.out → n73.formula1
n9.out → n73.atom2
n46.out → n73.formula2
n28.out → n73.atom3
n69.out → n73.formula3
n50.out → n49.a
n73.out → n49.b
n44.out → n39.a
n49.out → n39.b
n26.out → n76.assertion
n9.out → n76.atom1
n18.out → n76.formula1
n28.out → n76.atom2
n55.out → n76.formula2
n5.out → n77.assertion
n7.out → n78.a
n55.out → n78.b
n19.out → n79.a
n78.out → n79.b
n69.out → n80.a
n79.out → n80.b
n7.out → n77.atom1
n80.out → n77.formula1
n9.out → n77.atom2
n11.out → n77.formula2
n76.out → n75.a
n77.out → n75.b
n26.out → n81.assertion
n7.out → n81.atom1
n11.out → n81.formula1
n9.out → n81.atom2
n69.out → n81.formula2
n28.out → n81.atom3
n79.out → n81.formula3
n75.out → n74.a
n81.out → n74.b
n39.out → n38.a
n74.out → n38.b
n26.out → n82.assertion
n7.out → n82.atom1
n11.out → n82.formula1
n9.out → n82.atom2
n19.out → n82.formula2
n28.out → n82.atom3
n78.out → n82.formula3
n38.out → n37.a
n82.out → n37.b
n15.out → n1.a
n37.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-27 · 等词的双向同余

- 目标：`⊢ ( x = y → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) )`
- 提示：x=y 同时给出 ∀z(z∈x→z∈y) 与反向全称蕴涵。
- 参考解：38 个模块 / 76 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  gen(v=z)
n4  mp
n5  leibniz(mode=replace, v=z)
n6  term y
n7  term x
n8  term z
n9  mem
n10  mp
n11  定理 *undefined
n12  定理 *undefined
n13  subst(groups=2)
n14  atom P
n15  pred =
n16  atom Q
n17  pred =
n18  atom R
n19  mem
n20  imp
n21  定理 *undefined
n22  subst(groups=1)
n23  mp
n24  mp
n25  and-intro-ax
n26  imp
n27  all(v=z)
n28  all(v=z)
n29  mp
n30  mp
n31  gen(v=z)
n32  leibniz(mode=replace, v=z)
n33  subst(groups=1)
n34  subst(groups=2)
n35  and
n36  imp
n37  axiom A2
n38  subst(groups=2)

接线：
n6.out → n5.x
n7.out → n5.y
n8.out → n9.a
n6.out → n9.b
n9.out → n5.formula
n12.out → n13.assertion
n7.out → n15.t1
n6.out → n15.t2
n14.out → n13.atom1
n15.out → n13.formula1
n6.out → n17.t1
n7.out → n17.t2
n16.out → n13.atom2
n17.out → n13.formula2
n8.out → n19.a
n7.out → n19.b
n9.out → n20.a
n19.out → n20.b
n18.out → n13.atom3
n20.out → n13.formula3
n11.out → n10.a
n13.out → n10.b
n5.out → n4.a
n10.out → n4.b
n4.out → n3.assertion
n21.out → n22.assertion
n14.out → n22.atom1
n15.out → n22.formula1
n16.out → n22.atom2
n20.out → n22.formula2
n3.out → n2.a
n22.out → n2.b
n19.out → n26.a
n9.out → n26.b
n26.out → n27.a
n27.out → n25.a
n20.out → n28.a
n28.out → n25.b
n7.out → n32.x
n6.out → n32.y
n19.out → n32.formula
n32.out → n31.assertion
n21.out → n33.assertion
n14.out → n33.atom1
n15.out → n33.formula1
n16.out → n33.atom2
n26.out → n33.formula2
n31.out → n30.a
n33.out → n30.b
n12.out → n34.assertion
n14.out → n34.atom1
n15.out → n34.formula1
n16.out → n34.atom2
n27.out → n34.formula2
n27.out → n35.a
n28.out → n35.b
n28.out → n36.a
n35.out → n36.b
n18.out → n34.atom3
n36.out → n34.formula3
n30.out → n29.a
n34.out → n29.b
n25.out → n24.a
n29.out → n24.b
n37.out → n38.assertion
n14.out → n38.atom1
n15.out → n38.formula1
n16.out → n38.atom2
n28.out → n38.formula2
n18.out → n38.atom3
n35.out → n38.formula3
n24.out → n23.a
n38.out → n23.b
n2.out → n1.a
n23.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-28 · 等词给出元素等价

- 目标：`⊢ ( x = y → ∀ z ( z ∈ x ↔ z ∈ y ) )`
- 提示：x=y 推出 ∀z(z∈x↔z∈y)：外延公理的“容易方向”，连接等词与集合论。
- 参考解：60 个模块 / 141 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  gen(v=z)
n3  mp
n4  mp
n5  mp
n6  定理 *undefined
n9  atom P
n10  term x
n11  term y
n12  pred =
n16  axiom A1
n18  term z
n19  mem
n20  mem
n21  imp
n22  all(v=z)
n23  imp
n24  all(v=z)
n25  and
n27  atom Q
n28  axiom A2
n30  atom R
n31  mp
n32  mp
n33  and-elim-ax(side=r)
n34  subst(groups=1)
n35  imp
n36  subst(groups=2)
n37  mp
n38  mp
n39  all-inst(v=z)
n40  定理 *undefined
n42  subst(groups=2)
n43  mp
n44  mp
n45  mp
n46  mp
n47  mp
n48  mp
n49  and-elim-ax(side=l)
n50  subst(groups=1)
n51  imp
n52  subst(groups=2)
n53  mp
n54  mp
n55  all-inst(v=z)
n56  subst(groups=1)
n57  imp
n58  subst(groups=2)
n59  mp
n60  mp
n61  iff-intro-ax
n62  subst(groups=1)
n63  iff
n64  imp
n65  imp
n66  subst(groups=2)
n67  subst(groups=2)
n68  定理 *undefined
n69  subst(groups=1)

接线：
n10.out → n12.t1
n11.out → n12.t2
n18.out → n19.a
n10.out → n19.b
n18.out → n20.a
n11.out → n20.b
n19.out → n21.a
n20.out → n21.b
n21.out → n22.a
n20.out → n23.a
n19.out → n23.b
n23.out → n24.a
n22.out → n25.a
n24.out → n25.b
n22.out → n33.a
n24.out → n33.b
n16.out → n34.assertion
n25.out → n35.a
n24.out → n35.b
n9.out → n34.atom1
n35.out → n34.formula1
n27.out → n34.atom2
n12.out → n34.formula2
n33.out → n32.a
n34.out → n32.b
n28.out → n36.assertion
n9.out → n36.atom1
n12.out → n36.formula1
n27.out → n36.atom2
n25.out → n36.formula2
n30.out → n36.atom3
n24.out → n36.formula3
n32.out → n31.a
n36.out → n31.b
n6.out → n5.a
n31.out → n5.b
n23.out → n39.formula
n18.out → n39.term
n39.out → n38.a
n40.out → n38.b
n28.out → n42.assertion
n9.out → n42.atom1
n12.out → n42.formula1
n27.out → n42.atom2
n24.out → n42.formula2
n30.out → n42.atom3
n23.out → n42.formula3
n38.out → n37.a
n42.out → n37.b
n5.out → n4.a
n37.out → n4.b
n22.out → n49.a
n24.out → n49.b
n16.out → n50.assertion
n25.out → n51.a
n22.out → n51.b
n9.out → n50.atom1
n51.out → n50.formula1
n27.out → n50.atom2
n12.out → n50.formula2
n49.out → n48.a
n50.out → n48.b
n28.out → n52.assertion
n9.out → n52.atom1
n12.out → n52.formula1
n27.out → n52.atom2
n25.out → n52.formula2
n30.out → n52.atom3
n22.out → n52.formula3
n48.out → n47.a
n52.out → n47.b
n6.out → n46.a
n47.out → n46.b
n21.out → n55.formula
n18.out → n55.term
n16.out → n56.assertion
n22.out → n57.a
n21.out → n57.b
n9.out → n56.atom1
n57.out → n56.formula1
n27.out → n56.atom2
n12.out → n56.formula2
n55.out → n54.a
n56.out → n54.b
n28.out → n58.assertion
n9.out → n58.atom1
n12.out → n58.formula1
n27.out → n58.atom2
n22.out → n58.formula2
n30.out → n58.atom3
n21.out → n58.formula3
n54.out → n53.a
n58.out → n53.b
n46.out → n45.a
n53.out → n45.b
n19.out → n61.a
n20.out → n61.b
n16.out → n62.assertion
n19.out → n63.a
n20.out → n63.b
n23.out → n64.a
n63.out → n64.b
n21.out → n65.a
n64.out → n65.b
n9.out → n62.atom1
n65.out → n62.formula1
n27.out → n62.atom2
n12.out → n62.formula2
n61.out → n60.a
n62.out → n60.b
n28.out → n66.assertion
n9.out → n66.atom1
n12.out → n66.formula1
n27.out → n66.atom2
n21.out → n66.formula2
n30.out → n66.atom3
n64.out → n66.formula3
n60.out → n59.a
n66.out → n59.b
n45.out → n44.a
n59.out → n44.b
n28.out → n67.assertion
n9.out → n67.atom1
n12.out → n67.formula1
n27.out → n67.atom2
n23.out → n67.formula2
n30.out → n67.atom3
n63.out → n67.formula3
n44.out → n43.a
n67.out → n43.b
n4.out → n3.a
n43.out → n3.b
n3.out → n2.assertion
n68.out → n69.assertion
n9.out → n69.atom1
n12.out → n69.formula1
n27.out → n69.atom2
n63.out → n69.formula2
n2.out → n1.a
n69.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-29 · 传递后的谓词替换

- 目标：`⊢ ∀ x ∀ y ∀ z ( x = y → ( y = z → ( F ( x ) → F ( z ) ) ) )`
- 提示：x=y、y=z 先推出 x=z，再把它用于谓词替换。
- 参考解：38 个模块 / 73 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  gen(v=z)
n4  mp
n5  定理 *undefined
n9  atom P
n10  term y
n11  term z
n12  pred =
n13  axiom A1
n16  atom Q
n17  term x
n18  pred =
n30  axiom A2
n32  atom R
n39  pred =
n40  imp
n66  mp
n67  mp
n68  mp
n69  定理 *undefined
n71  pred F
n73  pred F
n74  imp
n75  imp
n76  mp
n77  定理 *undefined
n80  imp
n82  subst(groups=2)
n83  mp
n84  mp
n85  subst(groups=2)
n86  subst(groups=1)
n87  imp
n88  imp
n89  imp
n90  subst(groups=2)
n91  subst(groups=2)

接线：
n10.out → n12.t1
n11.out → n12.t2
n17.out → n18.t1
n10.out → n18.t2
n17.out → n39.t1
n11.out → n39.t2
n12.out → n40.a
n39.out → n40.b
n17.out → n71.t1
n11.out → n73.t1
n71.out → n74.a
n73.out → n74.b
n39.out → n75.a
n74.out → n75.b
n12.out → n80.a
n75.out → n80.b
n30.out → n82.assertion
n9.out → n82.atom1
n18.out → n82.formula1
n16.out → n82.atom2
n75.out → n82.formula2
n32.out → n82.atom3
n80.out → n82.formula3
n77.out → n76.a
n82.out → n76.b
n69.out → n68.a
n76.out → n68.b
n30.out → n85.assertion
n9.out → n85.atom1
n12.out → n85.formula1
n16.out → n85.atom2
n39.out → n85.formula2
n32.out → n85.atom3
n74.out → n85.formula3
n13.out → n86.assertion
n12.out → n87.a
n74.out → n87.b
n40.out → n88.a
n87.out → n88.b
n80.out → n89.a
n88.out → n89.b
n9.out → n86.atom1
n89.out → n86.formula1
n16.out → n86.atom2
n18.out → n86.formula2
n85.out → n84.a
n86.out → n84.b
n30.out → n90.assertion
n9.out → n90.atom1
n18.out → n90.formula1
n16.out → n90.atom2
n80.out → n90.formula2
n32.out → n90.atom3
n88.out → n90.formula3
n84.out → n83.a
n90.out → n83.b
n68.out → n67.a
n83.out → n67.b
n30.out → n91.assertion
n9.out → n91.atom1
n18.out → n91.formula1
n16.out → n91.atom2
n40.out → n91.formula2
n32.out → n91.atom3
n87.out → n91.formula3
n67.out → n66.a
n91.out → n66.b
n5.out → n4.a
n66.out → n4.b
n4.out → n3.assertion
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅲ-30 · 复合替换（双向）

- 目标：`⊢ ∀ x ∀ y ( x = y → ( ( F ( x ) → G ( x ) ) ↔ ( F ( y ) → G ( y ) ) ) )`
- 提示：x=y 时 F(x)→G(x) 与 F(y)→G(y) 等价。
- 参考解：58 个模块 / 133 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  mp
n4  mp
n5  定理 *undefined
n6  subst(groups=0)
n7  atom P
n8  term x
n9  term y
n10  pred =
n11  mp
n12  mp
n13  mp
n14  leibniz(mode=replace, v=z)
n15  pred F
n16  pred G
n17  imp
n18  axiom A1
n19  subst(groups=1)
n20  pred =
n21  pred F
n22  pred G
n23  imp
n24  imp
n25  imp
n26  atom Q
n27  mp
n28  mp
n29  mp
n30  定理 *undefined
n31  subst(groups=1)
n32  imp
n33  mp
n34  mp
n35  定理 *undefined
n36  subst(groups=2)
n37  atom R
n38  subst(groups=1)
n39  imp
n40  imp
n41  imp
n42  axiom A2
n43  subst(groups=2)
n44  subst(groups=2)
n45  subst(groups=2)
n46  mp
n47  mp
n48  定理 *undefined
n53  imp
n56  mp
n57  mp
n58  iff-intro-ax
n59  subst(groups=1)
n60  iff
n61  imp
n62  imp
n63  subst(groups=2)
n64  subst(groups=2)

接线：
n5.out → n6.assertion
n8.out → n10.t1
n9.out → n10.t2
n7.out → n6.atom1
n10.out → n6.formula1
n9.out → n14.x
n8.out → n14.y
n9.out → n15.t1
n9.out → n16.t1
n15.out → n17.a
n16.out → n17.b
n17.out → n14.formula
n18.out → n19.assertion
n9.out → n20.t1
n8.out → n20.t2
n8.out → n21.t1
n8.out → n22.t1
n21.out → n23.a
n22.out → n23.b
n17.out → n24.a
n23.out → n24.b
n20.out → n25.a
n24.out → n25.b
n7.out → n19.atom1
n25.out → n19.formula1
n26.out → n19.atom2
n10.out → n19.formula2
n14.out → n13.a
n19.out → n13.b
n18.out → n31.assertion
n10.out → n32.a
n20.out → n32.b
n7.out → n31.atom1
n32.out → n31.formula1
n26.out → n31.atom2
n10.out → n31.formula2
n30.out → n29.a
n31.out → n29.b
n35.out → n36.assertion
n7.out → n36.atom1
n10.out → n36.formula1
n26.out → n36.atom2
n20.out → n36.formula2
n37.out → n36.atom3
n24.out → n36.formula3
n18.out → n38.assertion
n10.out → n39.a
n24.out → n39.b
n25.out → n40.a
n39.out → n40.b
n32.out → n41.a
n40.out → n41.b
n7.out → n38.atom1
n41.out → n38.formula1
n26.out → n38.atom2
n10.out → n38.formula2
n36.out → n34.a
n38.out → n34.b
n42.out → n43.assertion
n7.out → n43.atom1
n10.out → n43.formula1
n26.out → n43.atom2
n32.out → n43.formula2
n37.out → n43.atom3
n40.out → n43.formula3
n34.out → n33.a
n43.out → n33.b
n29.out → n28.a
n33.out → n28.b
n42.out → n44.assertion
n7.out → n44.atom1
n10.out → n44.formula1
n26.out → n44.atom2
n25.out → n44.formula2
n37.out → n44.atom3
n39.out → n44.formula3
n28.out → n27.a
n44.out → n27.b
n13.out → n12.a
n27.out → n12.b
n42.out → n45.assertion
n7.out → n45.atom1
n10.out → n45.formula1
n26.out → n45.atom2
n10.out → n45.formula2
n37.out → n45.atom3
n24.out → n45.formula3
n12.out → n11.a
n45.out → n11.b
n6.out → n4.a
n11.out → n4.b
n23.out → n53.a
n17.out → n53.b
n23.out → n58.a
n17.out → n58.b
n18.out → n59.assertion
n23.out → n60.a
n17.out → n60.b
n24.out → n61.a
n60.out → n61.b
n53.out → n62.a
n61.out → n62.b
n7.out → n59.atom1
n62.out → n59.formula1
n26.out → n59.atom2
n10.out → n59.formula2
n58.out → n57.a
n59.out → n57.b
n42.out → n63.assertion
n7.out → n63.atom1
n10.out → n63.formula1
n26.out → n63.atom2
n53.out → n63.formula2
n37.out → n63.atom3
n61.out → n63.formula3
n57.out → n56.a
n63.out → n56.b
n48.out → n47.a
n56.out → n47.b
n42.out → n64.assertion
n7.out → n64.atom1
n10.out → n64.formula1
n26.out → n64.atom2
n24.out → n64.formula2
n37.out → n64.atom3
n60.out → n64.formula3
n47.out → n46.a
n64.out → n46.b
n4.out → n3.a
n46.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅲ-31 · 全称等词替换

- 目标：`⊢ ( x = y → ( ∀ z z = x → ∀ z z = y ) )`
- 提示：x=y → (∀z z=x → ∀z z=y)：替换进入全称内部。
- 参考解：69 个模块 / 188 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  gen(v=z)
n4  mp
n9  atom P
n10  term z
n11  term x
n12  pred =
n13  all(v=z)
n14  axiom A1
n17  atom Q
n18  term y
n19  pred =
n23  mp
n24  all-inst(v=z)
n25  subst(groups=1)
n26  imp
n33  axiom A2
n35  atom R
n44  mp
n45  mp
n46  mp
n51  subst(groups=1)
n53  imp
n56  mp
n57  mp
n58  mp
n59  mp
n60  leibniz(mode=replace, v=z)
n61  subst(groups=1)
n62  pred =
n63  imp
n64  imp
n65  mp
n66  mp
n67  subst(groups=1)
n68  subst(groups=1)
n69  imp
n70  imp
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
n83  subst(groups=2)
n84  subst(groups=1)
n85  imp
n86  imp
n87  imp
n88  subst(groups=2)
n89  subst(groups=2)
n90  定理 *undefined
n91  subst(groups=1)
n92  mp
n93  mp
n94  subst(groups=1)
n95  subst(groups=1)
n96  all(v=z)
n97  all(v=z)
n98  imp
n99  imp
n100  subst(groups=2)

接线：
n10.out → n12.t1
n11.out → n12.t2
n12.out → n13.a
n11.out → n19.t1
n18.out → n19.t2
n12.out → n24.formula
n10.out → n24.term
n14.out → n25.assertion
n13.out → n26.a
n12.out → n26.b
n9.out → n25.atom1
n26.out → n25.formula1
n17.out → n25.atom2
n19.out → n25.formula2
n24.out → n23.a
n25.out → n23.b
n14.out → n51.assertion
n9.out → n51.atom1
n19.out → n51.formula1
n17.out → n51.atom2
n13.out → n51.formula2
n13.out → n53.a
n19.out → n53.b
n11.out → n60.x
n18.out → n60.y
n12.out → n60.formula
n14.out → n61.assertion
n10.out → n62.t1
n18.out → n62.t2
n12.out → n63.a
n62.out → n63.b
n19.out → n64.a
n63.out → n64.b
n9.out → n61.atom1
n64.out → n61.formula1
n17.out → n61.atom2
n19.out → n61.formula2
n60.out → n59.a
n61.out → n59.b
n14.out → n67.assertion
n9.out → n67.atom1
n64.out → n67.formula1
n17.out → n67.atom2
n13.out → n67.formula2
n14.out → n68.assertion
n13.out → n69.a
n64.out → n69.b
n64.out → n70.a
n69.out → n70.b
n9.out → n68.atom1
n70.out → n68.formula1
n17.out → n68.atom2
n19.out → n68.formula2
n67.out → n66.a
n68.out → n66.b
n33.out → n71.assertion
n9.out → n71.atom1
n19.out → n71.formula1
n17.out → n71.atom2
n64.out → n71.formula2
n35.out → n71.atom3
n69.out → n71.formula3
n66.out → n65.a
n71.out → n65.b
n59.out → n58.a
n65.out → n58.b
n33.out → n74.assertion
n9.out → n74.atom1
n13.out → n74.formula1
n17.out → n74.atom2
n19.out → n74.formula2
n35.out → n74.atom3
n63.out → n74.formula3
n14.out → n75.assertion
n13.out → n76.a
n63.out → n76.b
n53.out → n77.a
n76.out → n77.b
n69.out → n78.a
n77.out → n78.b
n9.out → n75.atom1
n78.out → n75.formula1
n17.out → n75.atom2
n19.out → n75.formula2
n74.out → n73.a
n75.out → n73.b
n33.out → n79.assertion
n9.out → n79.atom1
n19.out → n79.formula1
n17.out → n79.atom2
n69.out → n79.formula2
n35.out → n79.atom3
n77.out → n79.formula3
n73.out → n72.a
n79.out → n72.b
n58.out → n57.a
n72.out → n57.b
n33.out → n80.assertion
n9.out → n80.atom1
n19.out → n80.formula1
n17.out → n80.atom2
n53.out → n80.formula2
n35.out → n80.atom3
n76.out → n80.formula3
n57.out → n56.a
n80.out → n56.b
n51.out → n46.a
n56.out → n46.b
n33.out → n83.assertion
n9.out → n83.atom1
n13.out → n83.formula1
n17.out → n83.atom2
n12.out → n83.formula2
n35.out → n83.atom3
n62.out → n83.formula3
n14.out → n84.assertion
n13.out → n85.a
n62.out → n85.b
n26.out → n86.a
n85.out → n86.b
n76.out → n87.a
n86.out → n87.b
n9.out → n84.atom1
n87.out → n84.formula1
n17.out → n84.atom2
n19.out → n84.formula2
n83.out → n82.a
n84.out → n82.b
n33.out → n88.assertion
n9.out → n88.atom1
n19.out → n88.formula1
n17.out → n88.atom2
n76.out → n88.formula2
n35.out → n88.atom3
n86.out → n88.formula3
n82.out → n81.a
n88.out → n81.b
n46.out → n45.a
n81.out → n45.b
n33.out → n89.assertion
n9.out → n89.atom1
n19.out → n89.formula1
n17.out → n89.atom2
n26.out → n89.formula2
n35.out → n89.atom3
n85.out → n89.formula3
n45.out → n44.a
n89.out → n44.b
n23.out → n4.a
n44.out → n4.b
n4.out → n3.assertion
n90.out → n91.assertion
n9.out → n91.atom1
n19.out → n91.formula1
n17.out → n91.atom2
n85.out → n91.formula2
n3.out → n2.a
n91.out → n2.b
n90.out → n94.assertion
n9.out → n94.atom1
n13.out → n94.formula1
n17.out → n94.atom2
n62.out → n94.formula2
n14.out → n95.assertion
n85.out → n96.a
n62.out → n97.a
n13.out → n98.a
n97.out → n98.b
n96.out → n99.a
n98.out → n99.b
n9.out → n95.atom1
n99.out → n95.formula1
n17.out → n95.atom2
n19.out → n95.formula2
n94.out → n93.a
n95.out → n93.b
n33.out → n100.assertion
n9.out → n100.atom1
n19.out → n100.formula1
n17.out → n100.atom2
n96.out → n100.formula2
n35.out → n100.atom3
n98.out → n100.formula3
n93.out → n92.a
n100.out → n92.b
n2.out → n1.a
n92.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-32 · 全称等词替换（反向）

- 目标：`⊢ ( x = y → ( ∀ z z = y → ∀ z z = x ) )`
- 提示：x=y→(∀z(z=y)→∀z(z=x))。
- 参考解：19 个模块 / 27 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  leibniz(mode=replace, v=z)
n3  term y
n4  term x
n5  term z
n6  pred =
n7  all(v=z)
n8  mp
n9  定理 *undefined
n10  定理 *undefined
n11  subst(groups=2)
n12  atom P
n13  pred =
n14  atom Q
n15  pred =
n16  atom R
n17  pred =
n18  all(v=z)
n19  imp

接线：
n3.out → n2.x
n4.out → n2.y
n5.out → n6.t1
n3.out → n6.t2
n6.out → n7.a
n7.out → n2.formula
n10.out → n11.assertion
n4.out → n13.t1
n3.out → n13.t2
n12.out → n11.atom1
n13.out → n11.formula1
n3.out → n15.t1
n4.out → n15.t2
n14.out → n11.atom2
n15.out → n11.formula2
n5.out → n17.t1
n4.out → n17.t2
n17.out → n18.a
n7.out → n19.a
n18.out → n19.b
n16.out → n11.atom3
n19.out → n11.formula3
n9.out → n8.a
n11.out → n8.b
n2.out → n1.a
n8.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-33 · 嵌套全称替换

- 目标：`⊢ ( x = y → ( ∀ z x = z → ∀ z y = z ) )`
- 提示：x=y → (∀z x=z → ∀z y=z)：替换全称式的另一侧。
- 参考解：69 个模块 / 188 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  gen(v=z)
n4  mp
n9  atom P
n10  term x
n11  term z
n12  pred =
n13  all(v=z)
n14  axiom A1
n17  atom Q
n18  term y
n19  pred =
n23  mp
n24  all-inst(v=z)
n25  subst(groups=1)
n26  imp
n33  axiom A2
n35  atom R
n44  mp
n45  mp
n46  mp
n51  subst(groups=1)
n53  imp
n56  mp
n57  mp
n58  mp
n59  mp
n60  leibniz(mode=replace, v=z)
n61  subst(groups=1)
n62  pred =
n63  imp
n64  imp
n65  mp
n66  mp
n67  subst(groups=1)
n68  subst(groups=1)
n69  imp
n70  imp
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
n83  subst(groups=2)
n84  subst(groups=1)
n85  imp
n86  imp
n87  imp
n88  subst(groups=2)
n89  subst(groups=2)
n90  定理 *undefined
n91  subst(groups=1)
n92  mp
n93  mp
n94  subst(groups=1)
n95  subst(groups=1)
n96  all(v=z)
n97  all(v=z)
n98  imp
n99  imp
n100  subst(groups=2)

接线：
n10.out → n12.t1
n11.out → n12.t2
n12.out → n13.a
n10.out → n19.t1
n18.out → n19.t2
n12.out → n24.formula
n11.out → n24.term
n14.out → n25.assertion
n13.out → n26.a
n12.out → n26.b
n9.out → n25.atom1
n26.out → n25.formula1
n17.out → n25.atom2
n19.out → n25.formula2
n24.out → n23.a
n25.out → n23.b
n14.out → n51.assertion
n9.out → n51.atom1
n19.out → n51.formula1
n17.out → n51.atom2
n13.out → n51.formula2
n13.out → n53.a
n19.out → n53.b
n10.out → n60.x
n18.out → n60.y
n12.out → n60.formula
n14.out → n61.assertion
n18.out → n62.t1
n11.out → n62.t2
n12.out → n63.a
n62.out → n63.b
n19.out → n64.a
n63.out → n64.b
n9.out → n61.atom1
n64.out → n61.formula1
n17.out → n61.atom2
n19.out → n61.formula2
n60.out → n59.a
n61.out → n59.b
n14.out → n67.assertion
n9.out → n67.atom1
n64.out → n67.formula1
n17.out → n67.atom2
n13.out → n67.formula2
n14.out → n68.assertion
n13.out → n69.a
n64.out → n69.b
n64.out → n70.a
n69.out → n70.b
n9.out → n68.atom1
n70.out → n68.formula1
n17.out → n68.atom2
n19.out → n68.formula2
n67.out → n66.a
n68.out → n66.b
n33.out → n71.assertion
n9.out → n71.atom1
n19.out → n71.formula1
n17.out → n71.atom2
n64.out → n71.formula2
n35.out → n71.atom3
n69.out → n71.formula3
n66.out → n65.a
n71.out → n65.b
n59.out → n58.a
n65.out → n58.b
n33.out → n74.assertion
n9.out → n74.atom1
n13.out → n74.formula1
n17.out → n74.atom2
n19.out → n74.formula2
n35.out → n74.atom3
n63.out → n74.formula3
n14.out → n75.assertion
n13.out → n76.a
n63.out → n76.b
n53.out → n77.a
n76.out → n77.b
n69.out → n78.a
n77.out → n78.b
n9.out → n75.atom1
n78.out → n75.formula1
n17.out → n75.atom2
n19.out → n75.formula2
n74.out → n73.a
n75.out → n73.b
n33.out → n79.assertion
n9.out → n79.atom1
n19.out → n79.formula1
n17.out → n79.atom2
n69.out → n79.formula2
n35.out → n79.atom3
n77.out → n79.formula3
n73.out → n72.a
n79.out → n72.b
n58.out → n57.a
n72.out → n57.b
n33.out → n80.assertion
n9.out → n80.atom1
n19.out → n80.formula1
n17.out → n80.atom2
n53.out → n80.formula2
n35.out → n80.atom3
n76.out → n80.formula3
n57.out → n56.a
n80.out → n56.b
n51.out → n46.a
n56.out → n46.b
n33.out → n83.assertion
n9.out → n83.atom1
n13.out → n83.formula1
n17.out → n83.atom2
n12.out → n83.formula2
n35.out → n83.atom3
n62.out → n83.formula3
n14.out → n84.assertion
n13.out → n85.a
n62.out → n85.b
n26.out → n86.a
n85.out → n86.b
n76.out → n87.a
n86.out → n87.b
n9.out → n84.atom1
n87.out → n84.formula1
n17.out → n84.atom2
n19.out → n84.formula2
n83.out → n82.a
n84.out → n82.b
n33.out → n88.assertion
n9.out → n88.atom1
n19.out → n88.formula1
n17.out → n88.atom2
n76.out → n88.formula2
n35.out → n88.atom3
n86.out → n88.formula3
n82.out → n81.a
n88.out → n81.b
n46.out → n45.a
n81.out → n45.b
n33.out → n89.assertion
n9.out → n89.atom1
n19.out → n89.formula1
n17.out → n89.atom2
n26.out → n89.formula2
n35.out → n89.atom3
n85.out → n89.formula3
n45.out → n44.a
n89.out → n44.b
n23.out → n4.a
n44.out → n4.b
n4.out → n3.assertion
n90.out → n91.assertion
n9.out → n91.atom1
n19.out → n91.formula1
n17.out → n91.atom2
n85.out → n91.formula2
n3.out → n2.a
n91.out → n2.b
n90.out → n94.assertion
n9.out → n94.atom1
n13.out → n94.formula1
n17.out → n94.atom2
n62.out → n94.formula2
n14.out → n95.assertion
n85.out → n96.a
n62.out → n97.a
n13.out → n98.a
n97.out → n98.b
n96.out → n99.a
n98.out → n99.b
n9.out → n95.atom1
n99.out → n95.formula1
n17.out → n95.atom2
n19.out → n95.formula2
n94.out → n93.a
n95.out → n93.b
n33.out → n100.assertion
n9.out → n100.atom1
n19.out → n100.formula1
n17.out → n100.atom2
n96.out → n100.formula2
n35.out → n100.atom3
n98.out → n100.formula3
n93.out → n92.a
n100.out → n92.b
n2.out → n1.a
n92.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅲ-34 · 深层替换（双向）

- 目标：`⊢ ( x = y → ( ( F ( x ) → ( G ( x ) → F ( x ) ) ) ↔ ( F ( y ) → ( G ( y ) → F ( y ) ) ) ) )`
- 提示：深层公式里的 x 也可以双向替换。
- 参考解：58 个模块 / 131 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  定理 *undefined
n4  subst(groups=0)
n5  atom P
n6  term x
n7  term y
n8  pred =
n9  mp
n10  mp
n11  mp
n12  leibniz(mode=replace, v=z)
n13  pred F
n14  pred G
n15  imp
n16  imp
n17  axiom A1
n18  subst(groups=1)
n19  pred =
n20  pred F
n21  pred G
n22  imp
n23  imp
n24  imp
n25  imp
n26  atom Q
n27  mp
n28  mp
n29  mp
n30  定理 *undefined
n31  subst(groups=1)
n32  imp
n33  mp
n34  mp
n35  定理 *undefined
n36  subst(groups=2)
n37  atom R
n38  subst(groups=1)
n39  imp
n40  imp
n41  imp
n42  axiom A2
n43  subst(groups=2)
n44  subst(groups=2)
n45  定理 *undefined
n46  mp
n47  mp
n51  leibniz(mode=replace, v=z)
n53  imp
n56  mp
n57  mp
n58  iff-intro-ax
n59  subst(groups=1)
n60  iff
n61  imp
n62  imp
n63  subst(groups=2)
n64  subst(groups=2)

接线：
n3.out → n4.assertion
n6.out → n8.t1
n7.out → n8.t2
n5.out → n4.atom1
n8.out → n4.formula1
n7.out → n12.x
n6.out → n12.y
n7.out → n13.t1
n7.out → n14.t1
n14.out → n15.a
n13.out → n15.b
n13.out → n16.a
n15.out → n16.b
n16.out → n12.formula
n17.out → n18.assertion
n7.out → n19.t1
n6.out → n19.t2
n6.out → n20.t1
n6.out → n21.t1
n21.out → n22.a
n20.out → n22.b
n20.out → n23.a
n22.out → n23.b
n16.out → n24.a
n23.out → n24.b
n19.out → n25.a
n24.out → n25.b
n5.out → n18.atom1
n25.out → n18.formula1
n26.out → n18.atom2
n8.out → n18.formula2
n12.out → n11.a
n18.out → n11.b
n17.out → n31.assertion
n8.out → n32.a
n19.out → n32.b
n5.out → n31.atom1
n32.out → n31.formula1
n26.out → n31.atom2
n8.out → n31.formula2
n30.out → n29.a
n31.out → n29.b
n35.out → n36.assertion
n5.out → n36.atom1
n8.out → n36.formula1
n26.out → n36.atom2
n19.out → n36.formula2
n37.out → n36.atom3
n24.out → n36.formula3
n17.out → n38.assertion
n8.out → n39.a
n24.out → n39.b
n25.out → n40.a
n39.out → n40.b
n32.out → n41.a
n40.out → n41.b
n5.out → n38.atom1
n41.out → n38.formula1
n26.out → n38.atom2
n8.out → n38.formula2
n36.out → n34.a
n38.out → n34.b
n42.out → n43.assertion
n5.out → n43.atom1
n8.out → n43.formula1
n26.out → n43.atom2
n32.out → n43.formula2
n37.out → n43.atom3
n40.out → n43.formula3
n34.out → n33.a
n43.out → n33.b
n29.out → n28.a
n33.out → n28.b
n42.out → n44.assertion
n5.out → n44.atom1
n8.out → n44.formula1
n26.out → n44.atom2
n25.out → n44.formula2
n37.out → n44.atom3
n39.out → n44.formula3
n28.out → n27.a
n44.out → n27.b
n11.out → n10.a
n27.out → n10.b
n10.out → n9.a
n45.out → n9.b
n4.out → n2.a
n9.out → n2.b
n6.out → n51.x
n7.out → n51.y
n23.out → n51.formula
n23.out → n53.a
n16.out → n53.b
n23.out → n58.a
n16.out → n58.b
n17.out → n59.assertion
n23.out → n60.a
n16.out → n60.b
n24.out → n61.a
n60.out → n61.b
n53.out → n62.a
n61.out → n62.b
n5.out → n59.atom1
n62.out → n59.formula1
n26.out → n59.atom2
n8.out → n59.formula2
n58.out → n57.a
n59.out → n57.b
n42.out → n63.assertion
n5.out → n63.atom1
n8.out → n63.formula1
n26.out → n63.atom2
n53.out → n63.formula2
n37.out → n63.atom3
n61.out → n63.formula3
n57.out → n56.a
n63.out → n56.b
n51.out → n47.a
n56.out → n47.b
n42.out → n64.assertion
n5.out → n64.atom1
n8.out → n64.formula1
n26.out → n64.atom2
n24.out → n64.formula2
n37.out → n64.atom3
n60.out → n64.formula3
n47.out → n46.a
n64.out → n46.b
n2.out → n1.a
n46.out → n1.b
n1.out → nt.proof
```

</details>

## Ⅳ 章

### i · 外延公理

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → x = y )`
- 提示：EXT · ∀z(z∈x↔z∈y) ⇒ x=y
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

### ii · 空集公理

- 目标：`⊢ ∃ z ∀ x ¬ x ∈ z`
- 提示：∅ · ∃z∀x ¬(x∈z)
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

### iii · 配对公理

- 目标：`⊢ ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )`
- 提示：{,} · ∃u∀z((z=x∨z=y) ↔ z∈u)
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

### iv · 并集公理

- 目标：`⊢ ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )`
- 提示：∪ · ∃y∀z((∃u(z∈u∧u∈x)) ↔ z∈y)
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

### Ⅳ-01 · 引理 · ∀y (x = y→y ∈ x→y ∈ 

- 目标：`⊢ ∀ y ( x = y → ( y ∈ x → y ∈ y ) )`
- 提示：第Ⅳ章先证：∀y (x = y→y ∈ x→y ∈ y)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：5 个模块 / 7 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=y)
n2  leibniz(mode=replace, v=z)
n3  term x
n4  term y
n5  mem

接线：
n3.out → n2.x
n4.out → n2.y
n4.out → n5.a
n3.out → n5.b
n5.out → n2.formula
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅳ-02 · 引理 · ∀z (z ∈ x↔z ∈ y)→(z 

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( z ∈ x ↔ z ∈ y ) )`
- 提示：第Ⅳ章先证：∀z (z ∈ x↔z ∈ y)→(z ∈ x↔z ∈ y)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：7 个模块 / 9 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  all-inst(v=z)
n2  iff
n3  term z
n4  mem
n5  mem
n6  term y
n7  term x

接线：
n3.out → n4.a
n7.out → n4.b
n3.out → n5.a
n6.out → n5.b
n4.out → n2.a
n5.out → n2.b
n2.out → n1.formula
n3.out → n1.term
n1.out → nt.proof
```

</details>

### Ⅳ-03 · 引理 · y = y→y = z→y = y

- 目标：`⊢ ( y = y → ( y = z → y = y ) )`
- 提示：第Ⅳ章先证：y = y→y = z→y = y。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：8 个模块 / 10 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=1)
n2  axiom A1
n3  atom P
n4  pred =
n5  atom Q
n6  pred =
n7  term y
n8  term z

接线：
n7.out → n6.t1
n8.out → n6.t2
n2.out → n1.assertion
n7.out → n4.t1
n7.out → n4.t2
n3.out → n1.atom1
n4.out → n1.formula1
n5.out → n1.atom2
n6.out → n1.formula2
n1.out → nt.proof
```

</details>

### Ⅳ-04 · 引理 · ∀z (z ∈ x→z ∈ y)→∀z 

- 目标：`⊢ ( ∀ z ( z ∈ x → z ∈ y ) → ( ∀ z ( z ∈ y → z ∈ x ) → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ) )`
- 提示：第Ⅳ章先证：∀z (z ∈ x→z ∈ y)→∀z (z ∈ y→z ∈ x)→∀z (z ∈ x→z ∈ y)∧∀z (z ∈ y→z ∈ x)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：10 个模块 / 13 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  and-intro-ax
n2  all(v=z)
n3  all(v=z)
n4  imp
n5  mem
n6  mem
n7  term z
n8  term x
n9  term y
n10  imp

接线：
n7.out → n6.a
n8.out → n6.b
n7.out → n5.a
n9.out → n5.b
n5.out → n4.a
n6.out → n4.b
n6.out → n10.a
n5.out → n10.b
n10.out → n2.a
n2.out → n1.a
n4.out → n3.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅳ-05 · 引理 · (∀z (z ∈ x↔z ∈ y)→(z

- 目标：`⊢ ( ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( z ∈ x ↔ z ∈ y ) ) → ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( z ∈ x ↔ z ∈ y ) ) ) )`
- 提示：第Ⅳ章先证：(∀z (z ∈ x↔z ∈ y)→(z ∈ x↔z ∈ y))→∀z (z ∈ x↔z ∈ y)→∀z (z ∈ x↔z ∈ y)→(z ∈ x↔z ∈ y)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：12 个模块 / 15 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=1)
n2  axiom A1
n3  atom P
n4  imp
n5  atom Q
n6  all(v=z)
n7  iff
n8  mem
n9  mem
n10  term z
n11  term y
n12  term x

接线：
n10.out → n8.a
n12.out → n8.b
n10.out → n9.a
n11.out → n9.b
n8.out → n7.a
n9.out → n7.b
n7.out → n6.a
n2.out → n1.assertion
n6.out → n4.a
n7.out → n4.b
n3.out → n1.atom1
n4.out → n1.formula1
n5.out → n1.atom2
n6.out → n1.formula2
n1.out → nt.proof
```

</details>

### Ⅳ-06 · 引理 · ∀z (z ∈ x→z ∈ y)∧∀z 

- 目标：`⊢ ( ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) → ( ∀ z ( z ∈ y ↔ z ∈ x ) → ( ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ∧ ∀ z ( z ∈ y ↔ z ∈ x ) ) ) )`
- 提示：第Ⅳ章先证：∀z (z ∈ x→z ∈ y)∧∀z (z ∈ y→z ∈ x)→∀z (z ∈ y↔z ∈ x)→∀z (z ∈ x→z ∈ y)∧∀z (z ∈ y→z ∈ x)∧∀z (z ∈ y↔z ∈ x)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：13 个模块 / 18 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  and-intro-ax
n2  and
n3  all(v=z)
n4  iff
n5  mem
n6  mem
n7  term z
n8  term x
n9  term y
n10  all(v=z)
n11  all(v=z)
n12  imp
n13  imp

接线：
n7.out → n6.a
n8.out → n6.b
n7.out → n5.a
n9.out → n5.b
n6.out → n13.a
n5.out → n13.b
n13.out → n10.a
n5.out → n12.a
n6.out → n12.b
n12.out → n11.a
n10.out → n2.a
n11.out → n2.b
n2.out → n1.a
n5.out → n4.a
n6.out → n4.b
n4.out → n3.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅳ-07 · 引理 · ((x = z→y = z)→(y = 

- 目标：`⊢ ( ( ( x = z → y = z ) → ( ( y = z → x = z ) → ( x = z ↔ y = z ) ) ) → ( x = y → ( ( x = z → y = z ) → ( ( y = z → x = z ) → ( x = z ↔ y = z ) ) ) ) )`
- 提示：第Ⅳ章先证：((x = z→y = z)→(y = z→x = z)→(x = z↔y = z))→x = y→(x = z→y = z)→(y = z→x = z)→(x = z↔y = z)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：15 个模块 / 22 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=1)
n2  axiom A1
n3  atom P
n4  imp
n5  atom Q
n6  pred =
n7  term x
n8  term y
n9  imp
n10  imp
n11  imp
n12  iff
n13  pred =
n14  pred =
n15  term z

接线：
n7.out → n6.t1
n8.out → n6.t2
n8.out → n14.t1
n15.out → n14.t2
n7.out → n13.t1
n15.out → n13.t2
n14.out → n11.a
n13.out → n11.b
n13.out → n9.a
n14.out → n9.b
n2.out → n1.assertion
n13.out → n12.a
n14.out → n12.b
n11.out → n10.a
n12.out → n10.b
n9.out → n4.a
n10.out → n4.b
n3.out → n1.atom1
n4.out → n1.formula1
n5.out → n1.atom2
n6.out → n1.formula2
n1.out → nt.proof
```

</details>

### Ⅳ-08 · 引理 · (∀z (z ∈ x↔z ∈ y)→∀z

- 目标：`⊢ ( ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y → z ∈ x ) → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ) ) → ( ( ∀ z ( z ∈ x ↔ z ∈ y ) → ∀ z ( z ∈ y → z ∈ x ) ) → ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ) ) )`
- 提示：第Ⅳ章先证：(∀z (z ∈ x↔z ∈ y)→∀z (z ∈ y→z ∈ x)→∀z (z ∈ x→z ∈ y)∧∀z (z ∈ y→z ∈ x))→(∀z (z ∈ x↔z ∈ y)→∀z (z ∈ y→z ∈ x))→∀z (z ∈ x↔z ∈ y)→∀z (z ∈ x→z ∈ y)∧∀z (z ∈ y→z ∈ x)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：17 个模块 / 23 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=2)
n2  axiom A2
n3  atom P
n4  all(v=z)
n5  atom Q
n6  all(v=z)
n7  atom R
n8  and
n9  all(v=z)
n10  imp
n11  mem
n12  mem
n13  term z
n14  term y
n15  term x
n16  imp
n17  iff

接线：
n13.out → n11.a
n15.out → n11.b
n13.out → n12.a
n14.out → n12.b
n11.out → n17.a
n12.out → n17.b
n17.out → n4.a
n12.out → n16.a
n11.out → n16.b
n11.out → n10.a
n12.out → n10.b
n10.out → n9.a
n16.out → n6.a
n9.out → n8.a
n6.out → n8.b
n2.out → n1.assertion
n3.out → n1.atom1
n4.out → n1.formula1
n5.out → n1.atom2
n6.out → n1.formula2
n7.out → n1.atom3
n8.out → n1.formula3
n1.out → nt.proof
```

</details>

### Ⅳ-09 · 引理 · (x = x→x = x∨x = y)→

- 目标：`⊢ ( ( x = x → ( x = x ∨ x = y ) ) → ( ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u ) → ( x = x → ( x = x ∨ x = y ) ) ) )`
- 提示：第Ⅳ章先证：(x = x→x = x∨x = y)→∀z (z = x∨z = y↔z ∈ u)→x = x→x = x∨x = y。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：18 个模块 / 25 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=1)
n2  axiom A1
n3  atom P
n4  imp
n5  atom Q
n6  all(v=z)
n7  iff
n8  or
n9  mem
n10  term z
n11  term u
n12  pred =
n13  pred =
n14  term y
n15  term x
n16  pred =
n17  or
n18  pred =

接线：
n15.out → n16.t1
n15.out → n16.t2
n10.out → n12.t1
n15.out → n12.t2
n10.out → n13.t1
n14.out → n13.t2
n12.out → n8.a
n13.out → n8.b
n10.out → n9.a
n11.out → n9.b
n8.out → n7.a
n9.out → n7.b
n7.out → n6.a
n15.out → n18.t1
n14.out → n18.t2
n2.out → n1.assertion
n16.out → n17.a
n18.out → n17.b
n16.out → n4.a
n17.out → n4.b
n3.out → n1.atom1
n4.out → n1.formula1
n5.out → n1.atom2
n6.out → n1.formula2
n1.out → nt.proof
```

</details>

### Ⅳ-10 · 引理 · (∀z (z ∈ x↔z ∈ y)→∀z

- 目标：`⊢ ( ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ x ) → ( ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ∧ ∀ z ( z ∈ y ↔ z ∈ x ) ) ) ) → ( ( ∀ z ( z ∈ x ↔ z ∈ y ) → ∀ z ( z ∈ y ↔ z ∈ x ) ) → ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ∧ ∀ z ( z ∈ y ↔ z ∈ x ) ) ) ) )`
- 提示：第Ⅳ章先证：(∀z (z ∈ x↔z ∈ y)→∀z (z ∈ y↔z ∈ x)→∀z (z ∈ x→z ∈ y)∧∀z (z ∈ y→z ∈ x)∧∀z (z ∈ y↔z ∈ x))→(∀z (z ∈ x↔z ∈ y)→∀z (z ∈ y↔z ∈ x))→∀z (z ∈ x↔z ∈ y)→∀z (z ∈ x→z ∈ y)∧∀z (z ∈ y→z ∈ x)∧∀z (z ∈ y↔z ∈ x)。先搭最左边的构造块，再沿依赖接到 ⊢。
- 参考解：20 个模块 / 28 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  subst(groups=2)
n2  axiom A2
n3  atom P
n4  all(v=z)
n5  atom Q
n6  all(v=z)
n7  atom R
n8  and
n9  and
n10  all(v=z)
n11  all(v=z)
n12  imp
n13  mem
n14  mem
n15  term z
n16  term x
n17  term y
n18  imp
n19  iff
n20  iff

接线：
n15.out → n14.a
n16.out → n14.b
n15.out → n13.a
n17.out → n13.b
n14.out → n18.a
n13.out → n18.b
n18.out → n10.a
n13.out → n12.a
n14.out → n12.b
n12.out → n11.a
n10.out → n9.a
n11.out → n9.b
n13.out → n19.a
n14.out → n19.b
n19.out → n6.a
n14.out → n20.a
n13.out → n20.b
n20.out → n4.a
n9.out → n8.a
n6.out → n8.b
n2.out → n1.assertion
n3.out → n1.atom1
n4.out → n1.formula1
n5.out → n1.atom2
n6.out → n1.formula2
n7.out → n1.atom3
n8.out → n1.formula3
n1.out → nt.proof
```

</details>

### Ⅳ-11 · 元素等价的对称性

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ∀ z ( z ∈ y ↔ z ∈ x ) )`
- 提示：∀z(z∈x↔z∈y) 与 ∀z(z∈y↔z∈x) 等价：先逐点对称，再把 ∀ 提到前件外。
- 参考解：36 个模块 / 74 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  gen(v=z)
n3  mp
n4  mp
n5  iff-elim-ax(dir=lr)
n6  term z
n7  term x
n8  mem
n9  term y
n10  mem
n11  mp
n12  定理 *undefined
n13  iff
n14  定理 *undefined
n15  subst(groups=2)
n16  atom P
n17  all(v=z)
n18  atom Q
n19  atom R
n20  imp
n21  mp
n22  mp
n23  iff-intro-ax
n24  mp
n25  mp
n26  iff-elim-ax(dir=rl)
n27  mp
n28  subst(groups=2)
n29  imp
n30  subst(groups=2)
n31  iff
n32  imp
n33  axiom A2
n34  subst(groups=2)
n35  定理 *undefined
n36  subst(groups=1)

接线：
n6.out → n8.a
n7.out → n8.b
n8.out → n5.a
n6.out → n10.a
n9.out → n10.b
n10.out → n5.b
n8.out → n13.a
n10.out → n13.b
n14.out → n15.assertion
n13.out → n17.a
n16.out → n15.atom1
n17.out → n15.formula1
n18.out → n15.atom2
n13.out → n15.formula2
n8.out → n20.a
n10.out → n20.b
n19.out → n15.atom3
n20.out → n15.formula3
n12.out → n11.a
n15.out → n11.b
n5.out → n4.a
n11.out → n4.b
n10.out → n23.a
n8.out → n23.b
n8.out → n26.a
n10.out → n26.b
n14.out → n28.assertion
n16.out → n28.atom1
n17.out → n28.formula1
n18.out → n28.atom2
n13.out → n28.formula2
n10.out → n29.a
n8.out → n29.b
n19.out → n28.atom3
n29.out → n28.formula3
n12.out → n27.a
n28.out → n27.b
n26.out → n25.a
n27.out → n25.b
n14.out → n30.assertion
n16.out → n30.atom1
n17.out → n30.formula1
n18.out → n30.atom2
n29.out → n30.formula2
n10.out → n31.a
n8.out → n31.b
n20.out → n32.a
n31.out → n32.b
n19.out → n30.atom3
n32.out → n30.formula3
n25.out → n24.a
n30.out → n24.b
n23.out → n22.a
n24.out → n22.b
n33.out → n34.assertion
n16.out → n34.atom1
n17.out → n34.formula1
n18.out → n34.atom2
n20.out → n34.formula2
n19.out → n34.atom3
n31.out → n34.formula3
n22.out → n21.a
n34.out → n21.b
n4.out → n3.a
n21.out → n3.b
n3.out → n2.assertion
n35.out → n36.assertion
n16.out → n36.atom1
n17.out → n36.formula1
n18.out → n36.atom2
n31.out → n36.formula2
n2.out → n1.a
n36.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅳ-12 · 元素等价的两个方向

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) )`
- 提示：∀z(z∈x↔z∈y) 可以拆成两条全称蕴涵并合成合取。
- 参考解：40 个模块 / 75 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  gen(v=z)
n4  mp
n5  iff-elim-ax(dir=rl)
n6  term z
n7  term x
n8  mem
n9  term y
n10  mem
n11  mp
n12  定理 *undefined
n13  iff
n14  定理 *undefined
n15  subst(groups=2)
n16  atom P
n17  all(v=z)
n18  atom Q
n19  atom R
n20  imp
n21  定理 *undefined
n22  subst(groups=1)
n23  mp
n24  mp
n25  定理 *undefined
n26  imp
n27  all(v=z)
n28  all(v=z)
n29  mp
n30  mp
n31  gen(v=z)
n32  mp
n33  iff-elim-ax(dir=lr)
n34  mp
n35  subst(groups=2)
n36  subst(groups=1)
n37  subst(groups=2)
n38  and
n39  imp
n41  定理 *undefined

接线：
n6.out → n8.a
n7.out → n8.b
n8.out → n5.a
n6.out → n10.a
n9.out → n10.b
n10.out → n5.b
n8.out → n13.a
n10.out → n13.b
n14.out → n15.assertion
n13.out → n17.a
n16.out → n15.atom1
n17.out → n15.formula1
n18.out → n15.atom2
n13.out → n15.formula2
n10.out → n20.a
n8.out → n20.b
n19.out → n15.atom3
n20.out → n15.formula3
n12.out → n11.a
n15.out → n11.b
n5.out → n4.a
n11.out → n4.b
n4.out → n3.assertion
n21.out → n22.assertion
n16.out → n22.atom1
n17.out → n22.formula1
n18.out → n22.atom2
n20.out → n22.formula2
n3.out → n2.a
n22.out → n2.b
n8.out → n26.a
n10.out → n26.b
n26.out → n27.a
n20.out → n28.a
n8.out → n33.a
n10.out → n33.b
n14.out → n35.assertion
n16.out → n35.atom1
n17.out → n35.formula1
n18.out → n35.atom2
n13.out → n35.formula2
n19.out → n35.atom3
n26.out → n35.formula3
n12.out → n34.a
n35.out → n34.b
n33.out → n32.a
n34.out → n32.b
n32.out → n31.assertion
n21.out → n36.assertion
n16.out → n36.atom1
n17.out → n36.formula1
n18.out → n36.atom2
n26.out → n36.formula2
n31.out → n30.a
n36.out → n30.b
n14.out → n37.assertion
n16.out → n37.atom1
n17.out → n37.formula1
n18.out → n37.atom2
n27.out → n37.formula2
n27.out → n38.a
n28.out → n38.b
n28.out → n39.a
n38.out → n39.b
n19.out → n37.atom3
n39.out → n37.formula3
n30.out → n29.a
n37.out → n29.b
n25.out → n24.a
n29.out → n24.b
n24.out → n23.a
n41.out → n23.b
n2.out → n1.a
n23.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅳ-13 · 元素等价的三重结论

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ∧ ∀ z ( z ∈ y ↔ z ∈ x ) ) )`
- 提示：把“两个方向”与“元素等价反向”组合成一个合取结论。
- 参考解：29 个模块 / 38 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  定理 *undefined
n3  mp
n4  mp
n5  定理 *undefined
n6  term z
n7  term x
n8  mem
n9  term y
n10  mem
n11  imp
n12  all(v=z)
n13  imp
n14  all(v=z)
n15  and
n16  iff
n17  all(v=z)
n18  mp
n19  定理 *undefined
n20  定理 *undefined
n21  subst(groups=2)
n22  atom P
n23  iff
n24  all(v=z)
n25  atom Q
n26  atom R
n27  and
n28  imp
n30  定理 *undefined

接线：
n6.out → n8.a
n7.out → n8.b
n6.out → n10.a
n9.out → n10.b
n8.out → n11.a
n10.out → n11.b
n11.out → n12.a
n10.out → n13.a
n8.out → n13.b
n13.out → n14.a
n12.out → n15.a
n14.out → n15.b
n10.out → n16.a
n8.out → n16.b
n16.out → n17.a
n20.out → n21.assertion
n8.out → n23.a
n10.out → n23.b
n23.out → n24.a
n22.out → n21.atom1
n24.out → n21.formula1
n25.out → n21.atom2
n15.out → n21.formula2
n15.out → n27.a
n17.out → n27.b
n17.out → n28.a
n27.out → n28.b
n26.out → n21.atom3
n28.out → n21.formula3
n19.out → n18.a
n21.out → n18.b
n5.out → n4.a
n18.out → n4.b
n4.out → n3.a
n30.out → n3.b
n2.out → n1.a
n3.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅳ-14 · 元素等价的逐点传递

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ u ) → ( z ∈ x ↔ z ∈ u ) ) )`
- 提示：两个元素等价关系合起来给出逐点等价：∀z(z∈x↔z∈y)、∀z(z∈y↔z∈u) ⇒ z∈x↔z∈u。
- 参考解：261 个模块 / 820 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  mp
n4  mp
n8  atom P
n9  term z
n10  term x
n11  mem
n12  term y
n13  mem
n14  iff
n15  all(v=z)
n18  axiom A1
n19  subst(groups=1)
n20  atom Q
n21  term u
n22  mem
n23  iff
n24  all(v=z)
n26  imp
n28  axiom A2
n30  atom R
n31  mp
n32  mp
n33  mp
n34  mp
n35  定理 *undefined
n36  定理 *undefined
n37  imp
n38  mp
n39  mp
n40  subst(groups=1)
n41  subst(groups=1)
n42  imp
n43  imp
n44  subst(groups=2)
n45  mp
n46  mp
n47  subst(groups=2)
n48  subst(groups=1)
n49  imp
n50  imp
n51  imp
n52  subst(groups=2)
n53  subst(groups=2)
n54  mp
n55  mp
n56  mp
n57  mp
n58  iff-elim-ax(dir=rl)
n59  subst(groups=1)
n60  imp
n61  imp
n62  mp
n63  mp
n64  subst(groups=1)
n65  subst(groups=1)
n66  imp
n67  imp
n68  subst(groups=2)
n69  mp
n70  mp
n71  subst(groups=2)
n72  subst(groups=1)
n73  imp
n74  imp
n75  imp
n76  subst(groups=2)
n77  subst(groups=2)
n78  mp
n79  mp
n80  mp
n81  mp
n90  mp
n91  all-inst(v=z)
n92  subst(groups=1)
n93  imp
n109  mp
n110  mp
n111  mp
n112  mp
n113  iff-elim-ax(dir=rl)
n114  subst(groups=1)
n115  imp
n116  imp
n117  mp
n118  mp
n119  subst(groups=1)
n120  subst(groups=1)
n121  imp
n122  imp
n123  subst(groups=2)
n124  mp
n125  mp
n126  subst(groups=2)
n127  subst(groups=1)
n128  imp
n129  imp
n130  imp
n131  subst(groups=2)
n132  subst(groups=2)
n133  mp
n134  mp
n135  mp
n136  mp
n137  定理 *undefined
n138  subst(groups=2)
n139  subst(groups=1)
n140  imp
n141  imp
n142  imp
n143  mp
n144  mp
n145  subst(groups=1)
n146  subst(groups=1)
n147  imp
n148  imp
n149  subst(groups=2)
n150  mp
n151  mp
n152  subst(groups=2)
n153  subst(groups=1)
n154  imp
n155  imp
n156  imp
n157  subst(groups=2)
n158  subst(groups=2)
n159  mp
n160  mp
n161  subst(groups=2)
n162  subst(groups=1)
n163  imp
n164  imp
n165  imp
n166  subst(groups=2)
n167  subst(groups=2)
n168  mp
n169  mp
n170  mp
n171  mp
n172  mp
n173  mp
n174  mp
n175  mp
n176  mp
n177  iff-elim-ax(dir=lr)
n178  subst(groups=1)
n179  imp
n180  imp
n181  mp
n182  mp
n183  subst(groups=1)
n184  subst(groups=1)
n185  imp
n186  imp
n187  subst(groups=2)
n188  mp
n189  mp
n190  subst(groups=2)
n191  subst(groups=1)
n192  imp
n193  imp
n194  imp
n195  subst(groups=2)
n196  subst(groups=2)
n197  mp
n198  mp
n199  mp
n200  mp
n201  mp
n202  mp
n203  mp
n204  mp
n205  iff-elim-ax(dir=lr)
n206  subst(groups=1)
n207  imp
n208  imp
n209  mp
n210  mp
n211  subst(groups=1)
n212  subst(groups=1)
n213  imp
n214  imp
n215  subst(groups=2)
n216  mp
n217  mp
n218  subst(groups=2)
n219  subst(groups=1)
n220  imp
n221  imp
n222  imp
n223  subst(groups=2)
n224  subst(groups=2)
n225  mp
n226  mp
n227  mp
n228  mp
n229  subst(groups=2)
n230  subst(groups=1)
n231  imp
n232  imp
n233  imp
n234  mp
n235  mp
n236  subst(groups=1)
n237  subst(groups=1)
n238  imp
n239  imp
n240  subst(groups=2)
n241  mp
n242  mp
n243  subst(groups=2)
n244  subst(groups=1)
n245  imp
n246  imp
n247  imp
n248  subst(groups=2)
n249  subst(groups=2)
n250  mp
n251  mp
n252  subst(groups=2)
n253  subst(groups=1)
n254  imp
n255  imp
n256  imp
n257  subst(groups=2)
n258  subst(groups=2)
n259  mp
n260  mp
n261  mp
n262  mp
n263  iff-intro-ax
n264  subst(groups=1)
n265  iff
n266  imp
n267  imp
n268  mp
n269  mp
n270  subst(groups=1)
n271  subst(groups=1)
n272  imp
n273  imp
n274  subst(groups=2)
n275  mp
n276  mp
n277  subst(groups=2)
n278  subst(groups=1)
n279  imp
n280  imp
n281  imp
n282  subst(groups=2)
n283  subst(groups=2)
n284  mp
n285  mp
n286  subst(groups=2)
n287  subst(groups=1)
n288  imp
n289  imp
n290  imp
n291  subst(groups=2)
n292  subst(groups=2)

接线：
n9.out → n11.a
n10.out → n11.b
n9.out → n13.a
n12.out → n13.b
n11.out → n14.a
n13.out → n14.b
n14.out → n15.a
n18.out → n19.assertion
n8.out → n19.atom1
n15.out → n19.formula1
n9.out → n22.a
n21.out → n22.b
n13.out → n23.a
n22.out → n23.b
n23.out → n24.a
n20.out → n19.atom2
n24.out → n19.formula2
n24.out → n26.a
n15.out → n26.b
n15.out → n37.a
n14.out → n37.b
n35.out → n34.a
n36.out → n34.b
n18.out → n40.assertion
n8.out → n40.atom1
n37.out → n40.formula1
n20.out → n40.atom2
n24.out → n40.formula2
n18.out → n41.assertion
n24.out → n42.a
n37.out → n42.b
n37.out → n43.a
n42.out → n43.b
n8.out → n41.atom1
n43.out → n41.formula1
n20.out → n41.atom2
n15.out → n41.formula2
n40.out → n39.a
n41.out → n39.b
n28.out → n44.assertion
n8.out → n44.atom1
n15.out → n44.formula1
n20.out → n44.atom2
n37.out → n44.formula2
n30.out → n44.atom3
n42.out → n44.formula3
n39.out → n38.a
n44.out → n38.b
n34.out → n33.a
n38.out → n33.b
n28.out → n47.assertion
n8.out → n47.atom1
n24.out → n47.formula1
n20.out → n47.atom2
n15.out → n47.formula2
n30.out → n47.atom3
n14.out → n47.formula3
n18.out → n48.assertion
n24.out → n49.a
n14.out → n49.b
n26.out → n50.a
n49.out → n50.b
n42.out → n51.a
n50.out → n51.b
n8.out → n48.atom1
n51.out → n48.formula1
n20.out → n48.atom2
n15.out → n48.formula2
n47.out → n46.a
n48.out → n46.b
n28.out → n52.assertion
n8.out → n52.atom1
n15.out → n52.formula1
n20.out → n52.atom2
n42.out → n52.formula2
n30.out → n52.atom3
n50.out → n52.formula3
n46.out → n45.a
n52.out → n45.b
n33.out → n32.a
n45.out → n32.b
n28.out → n53.assertion
n8.out → n53.atom1
n15.out → n53.formula1
n20.out → n53.atom2
n26.out → n53.formula2
n30.out → n53.atom3
n49.out → n53.formula3
n32.out → n31.a
n53.out → n31.b
n19.out → n4.a
n31.out → n4.b
n11.out → n58.a
n13.out → n58.b
n18.out → n59.assertion
n13.out → n60.a
n11.out → n60.b
n14.out → n61.a
n60.out → n61.b
n8.out → n59.atom1
n61.out → n59.formula1
n20.out → n59.atom2
n15.out → n59.formula2
n58.out → n57.a
n59.out → n57.b
n18.out → n64.assertion
n8.out → n64.atom1
n61.out → n64.formula1
n20.out → n64.atom2
n24.out → n64.formula2
n18.out → n65.assertion
n24.out → n66.a
n61.out → n66.b
n61.out → n67.a
n66.out → n67.b
n8.out → n65.atom1
n67.out → n65.formula1
n20.out → n65.atom2
n15.out → n65.formula2
n64.out → n63.a
n65.out → n63.b
n28.out → n68.assertion
n8.out → n68.atom1
n15.out → n68.formula1
n20.out → n68.atom2
n61.out → n68.formula2
n30.out → n68.atom3
n66.out → n68.formula3
n63.out → n62.a
n68.out → n62.b
n57.out → n56.a
n62.out → n56.b
n28.out → n71.assertion
n8.out → n71.atom1
n24.out → n71.formula1
n20.out → n71.atom2
n14.out → n71.formula2
n30.out → n71.atom3
n60.out → n71.formula3
n18.out → n72.assertion
n24.out → n73.a
n60.out → n73.b
n49.out → n74.a
n73.out → n74.b
n66.out → n75.a
n74.out → n75.b
n8.out → n72.atom1
n75.out → n72.formula1
n20.out → n72.atom2
n15.out → n72.formula2
n71.out → n70.a
n72.out → n70.b
n28.out → n76.assertion
n8.out → n76.atom1
n15.out → n76.formula1
n20.out → n76.atom2
n66.out → n76.formula2
n30.out → n76.atom3
n74.out → n76.formula3
n70.out → n69.a
n76.out → n69.b
n56.out → n55.a
n69.out → n55.b
n28.out → n77.assertion
n8.out → n77.atom1
n15.out → n77.formula1
n20.out → n77.atom2
n49.out → n77.formula2
n30.out → n77.atom3
n73.out → n77.formula3
n55.out → n54.a
n77.out → n54.b
n4.out → n3.a
n54.out → n3.b
n23.out → n91.formula
n9.out → n91.term
n18.out → n92.assertion
n24.out → n93.a
n23.out → n93.b
n8.out → n92.atom1
n93.out → n92.formula1
n20.out → n92.atom2
n15.out → n92.formula2
n91.out → n90.a
n92.out → n90.b
n13.out → n113.a
n22.out → n113.b
n18.out → n114.assertion
n22.out → n115.a
n13.out → n115.b
n23.out → n116.a
n115.out → n116.b
n8.out → n114.atom1
n116.out → n114.formula1
n20.out → n114.atom2
n15.out → n114.formula2
n113.out → n112.a
n114.out → n112.b
n18.out → n119.assertion
n8.out → n119.atom1
n116.out → n119.formula1
n20.out → n119.atom2
n24.out → n119.formula2
n18.out → n120.assertion
n24.out → n121.a
n116.out → n121.b
n116.out → n122.a
n121.out → n122.b
n8.out → n120.atom1
n122.out → n120.formula1
n20.out → n120.atom2
n15.out → n120.formula2
n119.out → n118.a
n120.out → n118.b
n28.out → n123.assertion
n8.out → n123.atom1
n15.out → n123.formula1
n20.out → n123.atom2
n116.out → n123.formula2
n30.out → n123.atom3
n121.out → n123.formula3
n118.out → n117.a
n123.out → n117.b
n112.out → n111.a
n117.out → n111.b
n28.out → n126.assertion
n8.out → n126.atom1
n24.out → n126.formula1
n20.out → n126.atom2
n23.out → n126.formula2
n30.out → n126.atom3
n115.out → n126.formula3
n18.out → n127.assertion
n24.out → n128.a
n115.out → n128.b
n93.out → n129.a
n128.out → n129.b
n121.out → n130.a
n129.out → n130.b
n8.out → n127.atom1
n130.out → n127.formula1
n20.out → n127.atom2
n15.out → n127.formula2
n126.out → n125.a
n127.out → n125.b
n28.out → n131.assertion
n8.out → n131.atom1
n15.out → n131.formula1
n20.out → n131.atom2
n121.out → n131.formula2
n30.out → n131.atom3
n129.out → n131.formula3
n125.out → n124.a
n131.out → n124.b
n111.out → n110.a
n124.out → n110.b
n28.out → n132.assertion
n8.out → n132.atom1
n15.out → n132.formula1
n20.out → n132.atom2
n93.out → n132.formula2
n30.out → n132.atom3
n128.out → n132.formula3
n110.out → n109.a
n132.out → n109.b
n90.out → n81.a
n109.out → n81.b
n137.out → n138.assertion
n8.out → n138.atom1
n22.out → n138.formula1
n20.out → n138.atom2
n13.out → n138.formula2
n30.out → n138.atom3
n11.out → n138.formula3
n18.out → n139.assertion
n22.out → n140.a
n11.out → n140.b
n60.out → n141.a
n140.out → n141.b
n115.out → n142.a
n141.out → n142.b
n8.out → n139.atom1
n142.out → n139.formula1
n20.out → n139.atom2
n15.out → n139.formula2
n138.out → n136.a
n139.out → n136.b
n18.out → n145.assertion
n8.out → n145.atom1
n142.out → n145.formula1
n20.out → n145.atom2
n24.out → n145.formula2
n18.out → n146.assertion
n24.out → n147.a
n142.out → n147.b
n142.out → n148.a
n147.out → n148.b
n8.out → n146.atom1
n148.out → n146.formula1
n20.out → n146.atom2
n15.out → n146.formula2
n145.out → n144.a
n146.out → n144.b
n28.out → n149.assertion
n8.out → n149.atom1
n15.out → n149.formula1
n20.out → n149.atom2
n142.out → n149.formula2
n30.out → n149.atom3
n147.out → n149.formula3
n144.out → n143.a
n149.out → n143.b
n136.out → n135.a
n143.out → n135.b
n28.out → n152.assertion
n8.out → n152.atom1
n24.out → n152.formula1
n20.out → n152.atom2
n115.out → n152.formula2
n30.out → n152.atom3
n141.out → n152.formula3
n18.out → n153.assertion
n24.out → n154.a
n141.out → n154.b
n128.out → n155.a
n154.out → n155.b
n147.out → n156.a
n155.out → n156.b
n8.out → n153.atom1
n156.out → n153.formula1
n20.out → n153.atom2
n15.out → n153.formula2
n152.out → n151.a
n153.out → n151.b
n28.out → n157.assertion
n8.out → n157.atom1
n15.out → n157.formula1
n20.out → n157.atom2
n147.out → n157.formula2
n30.out → n157.atom3
n155.out → n157.formula3
n151.out → n150.a
n157.out → n150.b
n135.out → n134.a
n150.out → n134.b
n28.out → n158.assertion
n8.out → n158.atom1
n15.out → n158.formula1
n20.out → n158.atom2
n128.out → n158.formula2
n30.out → n158.atom3
n154.out → n158.formula3
n134.out → n133.a
n158.out → n133.b
n81.out → n80.a
n133.out → n80.b
n28.out → n161.assertion
n8.out → n161.atom1
n24.out → n161.formula1
n20.out → n161.atom2
n60.out → n161.formula2
n30.out → n161.atom3
n140.out → n161.formula3
n18.out → n162.assertion
n24.out → n163.a
n140.out → n163.b
n73.out → n164.a
n163.out → n164.b
n154.out → n165.a
n164.out → n165.b
n8.out → n162.atom1
n165.out → n162.formula1
n20.out → n162.atom2
n15.out → n162.formula2
n161.out → n160.a
n162.out → n160.b
n28.out → n166.assertion
n8.out → n166.atom1
n15.out → n166.formula1
n20.out → n166.atom2
n154.out → n166.formula2
n30.out → n166.atom3
n164.out → n166.formula3
n160.out → n159.a
n166.out → n159.b
n80.out → n79.a
n159.out → n79.b
n28.out → n167.assertion
n8.out → n167.atom1
n15.out → n167.formula1
n20.out → n167.atom2
n73.out → n167.formula2
n30.out → n167.atom3
n163.out → n167.formula3
n79.out → n78.a
n167.out → n78.b
n3.out → n2.a
n78.out → n2.b
n13.out → n177.a
n22.out → n177.b
n18.out → n178.assertion
n13.out → n179.a
n22.out → n179.b
n23.out → n180.a
n179.out → n180.b
n8.out → n178.atom1
n180.out → n178.formula1
n20.out → n178.atom2
n15.out → n178.formula2
n177.out → n176.a
n178.out → n176.b
n18.out → n183.assertion
n8.out → n183.atom1
n180.out → n183.formula1
n20.out → n183.atom2
n24.out → n183.formula2
n18.out → n184.assertion
n24.out → n185.a
n180.out → n185.b
n180.out → n186.a
n185.out → n186.b
n8.out → n184.atom1
n186.out → n184.formula1
n20.out → n184.atom2
n15.out → n184.formula2
n183.out → n182.a
n184.out → n182.b
n28.out → n187.assertion
n8.out → n187.atom1
n15.out → n187.formula1
n20.out → n187.atom2
n180.out → n187.formula2
n30.out → n187.atom3
n185.out → n187.formula3
n182.out → n181.a
n187.out → n181.b
n176.out → n175.a
n181.out → n175.b
n28.out → n190.assertion
n8.out → n190.atom1
n24.out → n190.formula1
n20.out → n190.atom2
n23.out → n190.formula2
n30.out → n190.atom3
n179.out → n190.formula3
n18.out → n191.assertion
n24.out → n192.a
n179.out → n192.b
n93.out → n193.a
n192.out → n193.b
n185.out → n194.a
n193.out → n194.b
n8.out → n191.atom1
n194.out → n191.formula1
n20.out → n191.atom2
n15.out → n191.formula2
n190.out → n189.a
n191.out → n189.b
n28.out → n195.assertion
n8.out → n195.atom1
n15.out → n195.formula1
n20.out → n195.atom2
n185.out → n195.formula2
n30.out → n195.atom3
n193.out → n195.formula3
n189.out → n188.a
n195.out → n188.b
n175.out → n174.a
n188.out → n174.b
n28.out → n196.assertion
n8.out → n196.atom1
n15.out → n196.formula1
n20.out → n196.atom2
n93.out → n196.formula2
n30.out → n196.atom3
n192.out → n196.formula3
n174.out → n173.a
n196.out → n173.b
n90.out → n172.a
n173.out → n172.b
n11.out → n205.a
n13.out → n205.b
n18.out → n206.assertion
n11.out → n207.a
n13.out → n207.b
n14.out → n208.a
n207.out → n208.b
n8.out → n206.atom1
n208.out → n206.formula1
n20.out → n206.atom2
n15.out → n206.formula2
n205.out → n204.a
n206.out → n204.b
n18.out → n211.assertion
n8.out → n211.atom1
n208.out → n211.formula1
n20.out → n211.atom2
n24.out → n211.formula2
n18.out → n212.assertion
n24.out → n213.a
n208.out → n213.b
n208.out → n214.a
n213.out → n214.b
n8.out → n212.atom1
n214.out → n212.formula1
n20.out → n212.atom2
n15.out → n212.formula2
n211.out → n210.a
n212.out → n210.b
n28.out → n215.assertion
n8.out → n215.atom1
n15.out → n215.formula1
n20.out → n215.atom2
n208.out → n215.formula2
n30.out → n215.atom3
n213.out → n215.formula3
n210.out → n209.a
n215.out → n209.b
n204.out → n203.a
n209.out → n203.b
n28.out → n218.assertion
n8.out → n218.atom1
n24.out → n218.formula1
n20.out → n218.atom2
n14.out → n218.formula2
n30.out → n218.atom3
n207.out → n218.formula3
n18.out → n219.assertion
n24.out → n220.a
n207.out → n220.b
n49.out → n221.a
n220.out → n221.b
n213.out → n222.a
n221.out → n222.b
n8.out → n219.atom1
n222.out → n219.formula1
n20.out → n219.atom2
n15.out → n219.formula2
n218.out → n217.a
n219.out → n217.b
n28.out → n223.assertion
n8.out → n223.atom1
n15.out → n223.formula1
n20.out → n223.atom2
n213.out → n223.formula2
n30.out → n223.atom3
n221.out → n223.formula3
n217.out → n216.a
n223.out → n216.b
n203.out → n202.a
n216.out → n202.b
n28.out → n224.assertion
n8.out → n224.atom1
n15.out → n224.formula1
n20.out → n224.atom2
n49.out → n224.formula2
n30.out → n224.atom3
n220.out → n224.formula3
n202.out → n201.a
n224.out → n201.b
n4.out → n200.a
n201.out → n200.b
n137.out → n229.assertion
n8.out → n229.atom1
n11.out → n229.formula1
n20.out → n229.atom2
n13.out → n229.formula2
n30.out → n229.atom3
n22.out → n229.formula3
n18.out → n230.assertion
n11.out → n231.a
n22.out → n231.b
n179.out → n232.a
n231.out → n232.b
n207.out → n233.a
n232.out → n233.b
n8.out → n230.atom1
n233.out → n230.formula1
n20.out → n230.atom2
n15.out → n230.formula2
n229.out → n228.a
n230.out → n228.b
n18.out → n236.assertion
n8.out → n236.atom1
n233.out → n236.formula1
n20.out → n236.atom2
n24.out → n236.formula2
n18.out → n237.assertion
n24.out → n238.a
n233.out → n238.b
n233.out → n239.a
n238.out → n239.b
n8.out → n237.atom1
n239.out → n237.formula1
n20.out → n237.atom2
n15.out → n237.formula2
n236.out → n235.a
n237.out → n235.b
n28.out → n240.assertion
n8.out → n240.atom1
n15.out → n240.formula1
n20.out → n240.atom2
n233.out → n240.formula2
n30.out → n240.atom3
n238.out → n240.formula3
n235.out → n234.a
n240.out → n234.b
n228.out → n227.a
n234.out → n227.b
n28.out → n243.assertion
n8.out → n243.atom1
n24.out → n243.formula1
n20.out → n243.atom2
n207.out → n243.formula2
n30.out → n243.atom3
n232.out → n243.formula3
n18.out → n244.assertion
n24.out → n245.a
n232.out → n245.b
n220.out → n246.a
n245.out → n246.b
n238.out → n247.a
n246.out → n247.b
n8.out → n244.atom1
n247.out → n244.formula1
n20.out → n244.atom2
n15.out → n244.formula2
n243.out → n242.a
n244.out → n242.b
n28.out → n248.assertion
n8.out → n248.atom1
n15.out → n248.formula1
n20.out → n248.atom2
n238.out → n248.formula2
n30.out → n248.atom3
n246.out → n248.formula3
n242.out → n241.a
n248.out → n241.b
n227.out → n226.a
n241.out → n226.b
n28.out → n249.assertion
n8.out → n249.atom1
n15.out → n249.formula1
n20.out → n249.atom2
n220.out → n249.formula2
n30.out → n249.atom3
n245.out → n249.formula3
n226.out → n225.a
n249.out → n225.b
n200.out → n199.a
n225.out → n199.b
n28.out → n252.assertion
n8.out → n252.atom1
n24.out → n252.formula1
n20.out → n252.atom2
n179.out → n252.formula2
n30.out → n252.atom3
n231.out → n252.formula3
n18.out → n253.assertion
n24.out → n254.a
n231.out → n254.b
n192.out → n255.a
n254.out → n255.b
n245.out → n256.a
n255.out → n256.b
n8.out → n253.atom1
n256.out → n253.formula1
n20.out → n253.atom2
n15.out → n253.formula2
n252.out → n251.a
n253.out → n251.b
n28.out → n257.assertion
n8.out → n257.atom1
n15.out → n257.formula1
n20.out → n257.atom2
n245.out → n257.formula2
n30.out → n257.atom3
n255.out → n257.formula3
n251.out → n250.a
n257.out → n250.b
n199.out → n198.a
n250.out → n198.b
n28.out → n258.assertion
n8.out → n258.atom1
n15.out → n258.formula1
n20.out → n258.atom2
n192.out → n258.formula2
n30.out → n258.atom3
n254.out → n258.formula3
n198.out → n197.a
n258.out → n197.b
n172.out → n171.a
n197.out → n171.b
n11.out → n263.a
n22.out → n263.b
n18.out → n264.assertion
n11.out → n265.a
n22.out → n265.b
n140.out → n266.a
n265.out → n266.b
n231.out → n267.a
n266.out → n267.b
n8.out → n264.atom1
n267.out → n264.formula1
n20.out → n264.atom2
n15.out → n264.formula2
n263.out → n262.a
n264.out → n262.b
n18.out → n270.assertion
n8.out → n270.atom1
n267.out → n270.formula1
n20.out → n270.atom2
n24.out → n270.formula2
n18.out → n271.assertion
n24.out → n272.a
n267.out → n272.b
n267.out → n273.a
n272.out → n273.b
n8.out → n271.atom1
n273.out → n271.formula1
n20.out → n271.atom2
n15.out → n271.formula2
n270.out → n269.a
n271.out → n269.b
n28.out → n274.assertion
n8.out → n274.atom1
n15.out → n274.formula1
n20.out → n274.atom2
n267.out → n274.formula2
n30.out → n274.atom3
n272.out → n274.formula3
n269.out → n268.a
n274.out → n268.b
n262.out → n261.a
n268.out → n261.b
n28.out → n277.assertion
n8.out → n277.atom1
n24.out → n277.formula1
n20.out → n277.atom2
n231.out → n277.formula2
n30.out → n277.atom3
n266.out → n277.formula3
n18.out → n278.assertion
n24.out → n279.a
n266.out → n279.b
n254.out → n280.a
n279.out → n280.b
n272.out → n281.a
n280.out → n281.b
n8.out → n278.atom1
n281.out → n278.formula1
n20.out → n278.atom2
n15.out → n278.formula2
n277.out → n276.a
n278.out → n276.b
n28.out → n282.assertion
n8.out → n282.atom1
n15.out → n282.formula1
n20.out → n282.atom2
n272.out → n282.formula2
n30.out → n282.atom3
n280.out → n282.formula3
n276.out → n275.a
n282.out → n275.b
n261.out → n260.a
n275.out → n260.b
n28.out → n283.assertion
n8.out → n283.atom1
n15.out → n283.formula1
n20.out → n283.atom2
n254.out → n283.formula2
n30.out → n283.atom3
n279.out → n283.formula3
n260.out → n259.a
n283.out → n259.b
n171.out → n170.a
n259.out → n170.b
n28.out → n286.assertion
n8.out → n286.atom1
n24.out → n286.formula1
n20.out → n286.atom2
n140.out → n286.formula2
n30.out → n286.atom3
n265.out → n286.formula3
n18.out → n287.assertion
n24.out → n288.a
n265.out → n288.b
n163.out → n289.a
n288.out → n289.b
n279.out → n290.a
n289.out → n290.b
n8.out → n287.atom1
n290.out → n287.formula1
n20.out → n287.atom2
n15.out → n287.formula2
n286.out → n285.a
n287.out → n285.b
n28.out → n291.assertion
n8.out → n291.atom1
n15.out → n291.formula1
n20.out → n291.atom2
n279.out → n291.formula2
n30.out → n291.atom3
n289.out → n291.formula3
n285.out → n284.a
n291.out → n284.b
n170.out → n169.a
n284.out → n169.b
n28.out → n292.assertion
n8.out → n292.atom1
n15.out → n292.formula1
n20.out → n292.atom2
n163.out → n292.formula2
n30.out → n292.atom3
n288.out → n292.formula3
n169.out → n168.a
n292.out → n168.b
n2.out → n1.a
n168.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅳ-15 · 元素等价的全称传递

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ u ) → ∀ z ( z ∈ x ↔ z ∈ u ) ) )`
- 提示：∀z(z∈x↔z∈y) 与 ∀z(z∈y↔z∈u) 推出 ∀z(z∈x↔z∈u)。
- 参考解：33 个模块 / 54 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  mp
n2  mp
n3  gen(v=z)
n4  定理 *undefined
n11  atom P
n12  term z
n13  term x
n14  mem
n15  term y
n16  mem
n17  iff
n18  all(v=z)
n21  axiom A1
n23  atom Q
n24  term u
n25  mem
n26  iff
n27  all(v=z)
n31  axiom A2
n33  atom R
n268  iff
n291  imp
n296  定理 *undefined
n297  subst(groups=1)
n298  mp
n299  mp
n300  subst(groups=1)
n301  subst(groups=1)
n302  all(v=z)
n303  all(v=z)
n304  imp
n305  imp
n306  subst(groups=2)

接线：
n12.out → n14.a
n13.out → n14.b
n12.out → n16.a
n15.out → n16.b
n14.out → n17.a
n16.out → n17.b
n17.out → n18.a
n12.out → n25.a
n24.out → n25.b
n16.out → n26.a
n25.out → n26.b
n26.out → n27.a
n14.out → n268.a
n25.out → n268.b
n27.out → n291.a
n268.out → n291.b
n4.out → n3.assertion
n296.out → n297.assertion
n11.out → n297.atom1
n18.out → n297.formula1
n23.out → n297.atom2
n291.out → n297.formula2
n3.out → n2.a
n297.out → n2.b
n296.out → n300.assertion
n11.out → n300.atom1
n27.out → n300.formula1
n23.out → n300.atom2
n268.out → n300.formula2
n21.out → n301.assertion
n291.out → n302.a
n268.out → n303.a
n27.out → n304.a
n303.out → n304.b
n302.out → n305.a
n304.out → n305.b
n11.out → n301.atom1
n305.out → n301.formula1
n23.out → n301.atom2
n18.out → n301.formula2
n300.out → n299.a
n301.out → n299.b
n31.out → n306.assertion
n11.out → n306.atom1
n18.out → n306.formula1
n23.out → n306.atom2
n302.out → n306.formula2
n33.out → n306.atom3
n304.out → n306.formula3
n299.out → n298.a
n306.out → n298.b
n2.out → n1.a
n298.out → n1.b
n1.out → nt.proof
```

</details>

### Ⅳ-16 · 属于替换（反向）

- 目标：`⊢ ∀ x ∀ y ( x = y → ( y ∈ x → y ∈ y ) )`
- 提示：x=y 时 y∈x 与 y∈y 不可区分。
- 参考解：2 个模块 / 2 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=x)
n2  定理 *undefined

接线：
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅳ-17 · 空集

- 目标：`⊢ ∃ z ∀ x ¬ x ∈ z`
- 提示：存在不含任何元素的集合：∃z∀x¬(x∈z)。
- 参考解：1 个模块 / 1 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  set-empty

接线：
n1.out → nt.proof
```

</details>

### Ⅳ-18 · 外延公理（全称）

- 目标：`⊢ ∀ x ∀ y ( ∀ z ( z ∈ x ↔ z ∈ y ) → x = y )`
- 提示：∀x∀y((∀z(z∈x↔z∈y))→x=y)。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
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
n1.out → nt.proof
```

</details>

### Ⅳ-19 · 外延的等价刻画

- 目标：`⊢ ∀ x ∀ y ( x = y ↔ ∀ z ( z ∈ x ↔ z ∈ y ) )`
- 提示：x=y 与 ∀z(z∈x↔z∈y) 互相蕴涵：外延公理加上等词→元素等价。
- 参考解：15 个模块 / 20 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  mp
n4  mp
n5  iff-intro-ax
n6  term x
n7  term y
n8  pred =
n9  term z
n10  mem
n11  mem
n12  iff
n13  all(v=z)
n14  定理 *undefined
n15  set-ext

接线：
n6.out → n8.t1
n7.out → n8.t2
n8.out → n5.a
n9.out → n10.a
n6.out → n10.b
n9.out → n11.a
n7.out → n11.b
n10.out → n12.a
n11.out → n12.b
n12.out → n13.a
n13.out → n5.b
n5.out → n4.a
n14.out → n4.b
n6.out → n15.a
n7.out → n15.b
n4.out → n3.a
n15.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅳ-20 · 配对公理（全称）

- 目标：`⊢ ∀ x ∀ y ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )`
- 提示：∀x∀y∃u∀z((z=x∨z=y)↔z∈u)。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
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
n1.out → nt.proof
```

</details>

### Ⅳ-21 · 配对公理（实例）

- 目标：`⊢ ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )`
- 提示：∃u∀z((z=x∨z=y)↔z∈u)。
- 参考解：3 个模块 / 3 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  set-pair
n2  term x
n3  term y

接线：
n2.out → n1.u
n3.out → n1.v
n1.out → nt.proof
```

</details>

### Ⅳ-22 · 并集公理（全称）

- 目标：`⊢ ∀ x ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )`
- 提示：∀x∃y∀z((∃u(z∈u∧u∈x))↔z∈y)。
- 参考解：3 个模块 / 3 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=x)
n2  set-union
n3  term x

接线：
n3.out → n2.a
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅳ-23 · 并集公理（实例）

- 目标：`⊢ ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )`
- 提示：∃y∀z((∃u(z∈u∧u∈x))↔z∈y)。
- 参考解：2 个模块 / 2 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  set-union
n2  term x

接线：
n2.out → n1.a
n1.out → nt.proof
```

</details>

### Ⅳ-24 · 等词的双向同余

- 目标：`⊢ ∀ x ∀ y ( x = y → ( x = z ↔ y = z ) )`
- 提示：x=y 使 x=z 与 y=z 等价：两个 Leibniz 方向 + 对称性。
- 参考解：27 个模块 / 46 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  mp
n4  定理 *undefined
n7  atom P
n8  term x
n9  term y
n10  pred =
n15  term z
n16  pred =
n20  pred =
n21  imp
n23  atom Q
n34  atom R
n39  axiom A2
n43  mp
n44  mp
n48  leibniz(mode=replace, v=z)
n50  imp
n53  mp
n54  mp
n55  iff-intro-ax
n56  定理 *undefined
n57  iff
n58  imp
n60  subst(groups=2)
n61  subst(groups=2)

接线：
n8.out → n10.t1
n9.out → n10.t2
n9.out → n16.t1
n15.out → n16.t2
n8.out → n20.t1
n15.out → n20.t2
n16.out → n21.a
n20.out → n21.b
n8.out → n48.x
n9.out → n48.y
n20.out → n48.formula
n20.out → n50.a
n16.out → n50.b
n20.out → n55.a
n16.out → n55.b
n20.out → n57.a
n16.out → n57.b
n21.out → n58.a
n57.out → n58.b
n55.out → n54.a
n56.out → n54.b
n39.out → n60.assertion
n7.out → n60.atom1
n10.out → n60.formula1
n23.out → n60.atom2
n50.out → n60.formula2
n34.out → n60.atom3
n58.out → n60.formula3
n54.out → n53.a
n60.out → n53.b
n48.out → n44.a
n53.out → n44.b
n39.out → n61.assertion
n7.out → n61.atom1
n10.out → n61.formula1
n23.out → n61.atom2
n21.out → n61.formula2
n34.out → n61.atom3
n57.out → n61.formula3
n44.out → n43.a
n61.out → n43.b
n4.out → n3.a
n43.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅳ-25 · 等词进入属于（全称）

- 目标：`⊢ ∀ y ∀ z ( y = z → ( x ∈ y → x ∈ z ) )`
- 提示：∀y∀z(y=z→(x∈y→x∈z))。
- 参考解：7 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
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
n1.out → nt.proof
```

</details>

### Ⅳ-26 · 等词进入属于（反向）

- 目标：`⊢ ∀ y ∀ z ( y = z → ( y ∈ x → z ∈ x ) )`
- 提示：∀y∀z(y=z→(y∈x→z∈x))。
- 参考解：7 个模块 / 8 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
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
n1.out → nt.proof
```

</details>

### Ⅳ-27 · 外延（y,z）

- 目标：`⊢ ∀ y ∀ z ( ∀ x ( x ∈ y ↔ x ∈ z ) → y = z )`
- 提示：∀y∀z((∀x(x∈y↔x∈z))→y=z)。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
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
n1.out → nt.proof
```

</details>

### Ⅳ-28 · 配对（y,x）

- 目标：`⊢ ∀ y ∀ x ∃ u ∀ z ( ( z = y ∨ z = x ) ↔ z ∈ u )`
- 提示：∀y∀x∃u∀z((z=y∨z=x)↔z∈u)。
- 参考解：5 个模块 / 5 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
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
n1.out → nt.proof
```

</details>

### Ⅳ-29 · 并集（y）

- 目标：`⊢ ∀ y ∃ u ∀ z ( ∃ v ( z ∈ v ∧ v ∈ y ) ↔ z ∈ u )`
- 提示：∀y∃u∀z((∃v(z∈v∧v∈y))↔z∈u)。
- 参考解：3 个模块 / 3 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=y)
n2  set-union
n3  term y

接线：
n3.out → n2.a
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅳ-30 · 属于替换的双向版

- 目标：`⊢ ∀ x ∀ y ∀ z ( x = y → ( x ∈ z ↔ y ∈ z ) )`
- 提示：x=y 使 x∈z 与 y∈z 等价：Leibniz 两个方向合成 ↔。
- 参考解：56 个模块 / 133 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  gen(v=z)
n4  mp
n5  mp
n6  定理 *undefined
n7  subst(groups=0)
n8  atom P
n9  term x
n10  term y
n11  pred =
n12  mp
n13  mp
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
n25  mp
n26  mp
n27  mp
n28  定理 *undefined
n29  subst(groups=1)
n30  imp
n31  mp
n32  mp
n33  定理 *undefined
n34  subst(groups=2)
n35  atom R
n36  subst(groups=1)
n37  imp
n38  imp
n39  imp
n40  axiom A2
n41  subst(groups=2)
n42  subst(groups=2)
n43  subst(groups=2)
n44  mp
n45  mp
n49  leibniz(mode=replace, v=z)
n51  imp
n54  mp
n55  mp
n56  iff-intro-ax
n57  subst(groups=1)
n58  iff
n59  imp
n60  imp
n61  subst(groups=2)
n62  subst(groups=2)

接线：
n6.out → n7.assertion
n9.out → n11.t1
n10.out → n11.t2
n8.out → n7.atom1
n11.out → n7.formula1
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
n18.out → n29.assertion
n11.out → n30.a
n20.out → n30.b
n8.out → n29.atom1
n30.out → n29.formula1
n24.out → n29.atom2
n11.out → n29.formula2
n28.out → n27.a
n29.out → n27.b
n33.out → n34.assertion
n8.out → n34.atom1
n11.out → n34.formula1
n24.out → n34.atom2
n20.out → n34.formula2
n35.out → n34.atom3
n22.out → n34.formula3
n18.out → n36.assertion
n11.out → n37.a
n22.out → n37.b
n23.out → n38.a
n37.out → n38.b
n30.out → n39.a
n38.out → n39.b
n8.out → n36.atom1
n39.out → n36.formula1
n24.out → n36.atom2
n11.out → n36.formula2
n34.out → n32.a
n36.out → n32.b
n40.out → n41.assertion
n8.out → n41.atom1
n11.out → n41.formula1
n24.out → n41.atom2
n30.out → n41.formula2
n35.out → n41.atom3
n38.out → n41.formula3
n32.out → n31.a
n41.out → n31.b
n27.out → n26.a
n31.out → n26.b
n40.out → n42.assertion
n8.out → n42.atom1
n11.out → n42.formula1
n24.out → n42.atom2
n23.out → n42.formula2
n35.out → n42.atom3
n37.out → n42.formula3
n26.out → n25.a
n42.out → n25.b
n14.out → n13.a
n25.out → n13.b
n40.out → n43.assertion
n8.out → n43.atom1
n11.out → n43.formula1
n24.out → n43.atom2
n11.out → n43.formula2
n35.out → n43.atom3
n22.out → n43.formula3
n13.out → n12.a
n43.out → n12.b
n7.out → n5.a
n12.out → n5.b
n9.out → n49.x
n10.out → n49.y
n21.out → n49.formula
n21.out → n51.a
n17.out → n51.b
n21.out → n56.a
n17.out → n56.b
n18.out → n57.assertion
n21.out → n58.a
n17.out → n58.b
n22.out → n59.a
n58.out → n59.b
n51.out → n60.a
n59.out → n60.b
n8.out → n57.atom1
n60.out → n57.formula1
n24.out → n57.atom2
n11.out → n57.formula2
n56.out → n55.a
n57.out → n55.b
n40.out → n61.assertion
n8.out → n61.atom1
n11.out → n61.formula1
n24.out → n61.atom2
n51.out → n61.formula2
n35.out → n61.atom3
n59.out → n61.formula3
n55.out → n54.a
n61.out → n54.b
n49.out → n45.a
n54.out → n45.b
n40.out → n62.assertion
n8.out → n62.atom1
n11.out → n62.formula1
n24.out → n62.atom2
n22.out → n62.formula2
n35.out → n62.atom3
n58.out → n62.formula3
n45.out → n44.a
n62.out → n44.b
n5.out → n4.a
n44.out → n4.b
n4.out → n3.assertion
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅳ-31 · 三层等词链（双向）

- 目标：`⊢ ∀ y ∀ z ∀ x ( y = z → ( x ∈ y ↔ x ∈ z ) )`
- 提示：y=z 使 x∈y 与 x∈z 等价：先例化 *56 取得 z=y，再走两个 Leibniz 方向。
- 参考解：63 个模块 / 151 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=y)
n2  gen(v=z)
n3  gen(v=x)
n4  mp
n5  mp
n6  定理 *undefined
n7  subst(groups=0)
n8  atom P
n9  term y
n10  term z
n11  pred =
n12  mp
n13  mp
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
n25  mp
n26  mp
n27  mp
n28  mp
n29  mp
n30  eq-refl(t=y)
n31  定理 *undefined
n32  pred =
n33  mp
n37  leibniz(mode=abstract, v=z)
n41  axiom A2
n43  atom R
n44  subst(groups=2)
n45  subst(groups=1)
n46  imp
n47  mp
n48  mp
n49  定理 *undefined
n50  subst(groups=2)
n51  subst(groups=1)
n52  imp
n53  imp
n54  imp
n55  subst(groups=2)
n56  subst(groups=2)
n57  subst(groups=2)
n58  mp
n59  mp
n63  leibniz(mode=replace, v=z)
n65  imp
n68  mp
n69  mp
n70  iff-intro-ax
n71  subst(groups=1)
n72  iff
n73  imp
n74  imp
n75  subst(groups=2)
n76  subst(groups=2)

接线：
n6.out → n7.assertion
n9.out → n11.t1
n10.out → n11.t2
n8.out → n7.atom1
n11.out → n7.formula1
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
n9.out → n32.t1
n9.out → n32.t2
n30.out → n29.a
n31.out → n29.b
n9.out → n37.x
n10.out → n37.y
n20.out → n37.formula
n41.out → n44.assertion
n8.out → n44.atom1
n11.out → n44.formula1
n24.out → n44.atom2
n32.out → n44.formula2
n43.out → n44.atom3
n20.out → n44.formula3
n37.out → n33.a
n44.out → n33.b
n29.out → n28.a
n33.out → n28.b
n18.out → n45.assertion
n11.out → n46.a
n20.out → n46.b
n8.out → n45.atom1
n46.out → n45.formula1
n24.out → n45.atom2
n11.out → n45.formula2
n28.out → n27.a
n45.out → n27.b
n49.out → n50.assertion
n8.out → n50.atom1
n11.out → n50.formula1
n24.out → n50.atom2
n20.out → n50.formula2
n43.out → n50.atom3
n22.out → n50.formula3
n18.out → n51.assertion
n11.out → n52.a
n22.out → n52.b
n23.out → n53.a
n52.out → n53.b
n46.out → n54.a
n53.out → n54.b
n8.out → n51.atom1
n54.out → n51.formula1
n24.out → n51.atom2
n11.out → n51.formula2
n50.out → n48.a
n51.out → n48.b
n41.out → n55.assertion
n8.out → n55.atom1
n11.out → n55.formula1
n24.out → n55.atom2
n46.out → n55.formula2
n43.out → n55.atom3
n53.out → n55.formula3
n48.out → n47.a
n55.out → n47.b
n27.out → n26.a
n47.out → n26.b
n41.out → n56.assertion
n8.out → n56.atom1
n11.out → n56.formula1
n24.out → n56.atom2
n23.out → n56.formula2
n43.out → n56.atom3
n52.out → n56.formula3
n26.out → n25.a
n56.out → n25.b
n14.out → n13.a
n25.out → n13.b
n41.out → n57.assertion
n8.out → n57.atom1
n11.out → n57.formula1
n24.out → n57.atom2
n11.out → n57.formula2
n43.out → n57.atom3
n22.out → n57.formula3
n13.out → n12.a
n57.out → n12.b
n7.out → n5.a
n12.out → n5.b
n9.out → n63.x
n10.out → n63.y
n21.out → n63.formula
n21.out → n65.a
n17.out → n65.b
n21.out → n70.a
n17.out → n70.b
n18.out → n71.assertion
n21.out → n72.a
n17.out → n72.b
n22.out → n73.a
n72.out → n73.b
n65.out → n74.a
n73.out → n74.b
n8.out → n71.atom1
n74.out → n71.formula1
n24.out → n71.atom2
n11.out → n71.formula2
n70.out → n69.a
n71.out → n69.b
n41.out → n75.assertion
n8.out → n75.atom1
n11.out → n75.formula1
n24.out → n75.atom2
n65.out → n75.formula2
n43.out → n75.atom3
n73.out → n75.formula3
n69.out → n68.a
n75.out → n68.b
n63.out → n59.a
n68.out → n59.b
n41.out → n76.assertion
n8.out → n76.atom1
n11.out → n76.formula1
n24.out → n76.atom2
n22.out → n76.formula2
n43.out → n76.atom3
n72.out → n76.formula3
n59.out → n58.a
n76.out → n58.b
n5.out → n4.a
n58.out → n4.b
n4.out → n3.assertion
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅳ-32 · 配对集含左元

- 目标：`⊢ ∀ x ∀ y ∃ u x ∈ u`
- 提示：配对公理保证 x 属于某个集合：∀x∀y∃u(x∈u)。
- 参考解：53 个模块 / 108 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  exists-elim
n4  定理 *undefined
n5  term x
n6  term y
n7  mp
n8  mp
n9  mp
n10  mp
n11  定理 *undefined
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
n25  mp
n26  mp
n27  or-intro-ax(side=l)
n28  pred =
n29  定理 *undefined
n30  or
n32  axiom A2
n33  subst(groups=2)
n34  atom R
n35  mp
n36  mp
n42  all-inst(v=z)
n44  mem
n45  iff
n48  mp
n49  mp
n50  iff-elim-ax(dir=lr)
n51  subst(groups=1)
n52  imp
n53  imp
n54  subst(groups=2)
n55  subst(groups=2)
n56  mp
n57  mp
n58  exists-gen(v=u)
n59  subst(groups=1)
n60  exists(v=u)
n61  imp
n62  subst(groups=2)

接线：
n4.out → n3.exists
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
n11.out → n10.a
n13.out → n10.b
n15.out → n27.a
n5.out → n28.t1
n6.out → n28.t2
n28.out → n27.b
n15.out → n30.a
n28.out → n30.b
n27.out → n26.a
n29.out → n26.b
n32.out → n33.assertion
n14.out → n33.atom1
n24.out → n33.formula1
n16.out → n33.atom2
n15.out → n33.formula2
n34.out → n33.atom3
n30.out → n33.formula3
n26.out → n25.a
n33.out → n25.b
n10.out → n9.a
n25.out → n9.b
n23.out → n42.formula
n5.out → n42.term
n5.out → n44.a
n21.out → n44.b
n30.out → n45.a
n44.out → n45.b
n30.out → n50.a
n44.out → n50.b
n12.out → n51.assertion
n30.out → n52.a
n44.out → n52.b
n45.out → n53.a
n52.out → n53.b
n14.out → n51.atom1
n53.out → n51.formula1
n16.out → n51.atom2
n24.out → n51.formula2
n50.out → n49.a
n51.out → n49.b
n32.out → n54.assertion
n14.out → n54.atom1
n24.out → n54.formula1
n16.out → n54.atom2
n45.out → n54.formula2
n34.out → n54.atom3
n52.out → n54.formula3
n49.out → n48.a
n54.out → n48.b
n42.out → n36.a
n48.out → n36.b
n32.out → n55.assertion
n14.out → n55.atom1
n24.out → n55.formula1
n16.out → n55.atom2
n30.out → n55.formula2
n34.out → n55.atom3
n44.out → n55.formula3
n36.out → n35.a
n55.out → n35.b
n9.out → n8.a
n35.out → n8.b
n44.out → n58.formula
n21.out → n58.term
n12.out → n59.assertion
n44.out → n60.a
n44.out → n61.a
n60.out → n61.b
n14.out → n59.atom1
n61.out → n59.formula1
n16.out → n59.atom2
n24.out → n59.formula2
n58.out → n57.a
n59.out → n57.b
n32.out → n62.assertion
n14.out → n62.atom1
n24.out → n62.formula1
n16.out → n62.atom2
n44.out → n62.formula2
n34.out → n62.atom3
n60.out → n62.formula3
n57.out → n56.a
n62.out → n56.b
n8.out → n7.a
n56.out → n7.b
n7.out → n3.implication
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅳ-33 · 配对集含右元

- 目标：`⊢ ∀ x ∀ y ∃ u y ∈ u`
- 提示：配对集同样含 y：∀x∀y∃u(y∈u)。
- 参考解：54 个模块 / 115 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  exists-elim
n4  定理 *undefined
n5  term x
n6  term y
n7  mp
n8  mp
n9  mp
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
n25  mp
n26  mp
n27  or-intro-ax(side=r)
n28  pred =
n29  subst(groups=1)
n30  or
n31  imp
n32  axiom A2
n33  subst(groups=2)
n34  atom R
n35  mp
n36  mp
n42  all-inst(v=z)
n44  mem
n45  iff
n48  mp
n49  mp
n50  iff-elim-ax(dir=lr)
n51  subst(groups=1)
n52  imp
n53  imp
n54  subst(groups=2)
n55  subst(groups=2)
n56  mp
n57  mp
n58  exists-gen(v=u)
n59  subst(groups=1)
n60  exists(v=u)
n61  imp
n62  subst(groups=2)

接线：
n4.out → n3.exists
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
n6.out → n28.t1
n5.out → n28.t2
n28.out → n27.a
n15.out → n27.b
n12.out → n29.assertion
n28.out → n30.a
n15.out → n30.b
n15.out → n31.a
n30.out → n31.b
n14.out → n29.atom1
n31.out → n29.formula1
n16.out → n29.atom2
n24.out → n29.formula2
n27.out → n26.a
n29.out → n26.b
n32.out → n33.assertion
n14.out → n33.atom1
n24.out → n33.formula1
n16.out → n33.atom2
n15.out → n33.formula2
n34.out → n33.atom3
n30.out → n33.formula3
n26.out → n25.a
n33.out → n25.b
n10.out → n9.a
n25.out → n9.b
n23.out → n42.formula
n6.out → n42.term
n6.out → n44.a
n21.out → n44.b
n30.out → n45.a
n44.out → n45.b
n30.out → n50.a
n44.out → n50.b
n12.out → n51.assertion
n30.out → n52.a
n44.out → n52.b
n45.out → n53.a
n52.out → n53.b
n14.out → n51.atom1
n53.out → n51.formula1
n16.out → n51.atom2
n24.out → n51.formula2
n50.out → n49.a
n51.out → n49.b
n32.out → n54.assertion
n14.out → n54.atom1
n24.out → n54.formula1
n16.out → n54.atom2
n45.out → n54.formula2
n34.out → n54.atom3
n52.out → n54.formula3
n49.out → n48.a
n54.out → n48.b
n42.out → n36.a
n48.out → n36.b
n32.out → n55.assertion
n14.out → n55.atom1
n24.out → n55.formula1
n16.out → n55.atom2
n30.out → n55.formula2
n34.out → n55.atom3
n44.out → n55.formula3
n36.out → n35.a
n55.out → n35.b
n9.out → n8.a
n35.out → n8.b
n44.out → n58.formula
n21.out → n58.term
n12.out → n59.assertion
n44.out → n60.a
n44.out → n61.a
n60.out → n61.b
n14.out → n59.atom1
n61.out → n59.formula1
n16.out → n59.atom2
n24.out → n59.formula2
n58.out → n57.a
n59.out → n57.b
n32.out → n62.assertion
n14.out → n62.atom1
n24.out → n62.formula1
n16.out → n62.atom2
n44.out → n62.formula2
n34.out → n62.atom3
n60.out → n62.formula3
n57.out → n56.a
n62.out → n56.b
n8.out → n7.a
n56.out → n7.b
n7.out → n3.implication
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → nt.proof
```

</details>

### Ⅳ-34 · 综合：配对给出公共容器

- 目标：`⊢ ∀ x ∀ y ∃ u ( x ∈ u ∧ y ∈ u )`
- 提示：任意两个集合同属某个集合：∀x∀y∃u(x∈u ∧ y∈u)。
- 参考解：92 个模块 / 221 条接线

<details><summary>展开参考电路</summary>

```text
模块：
nt  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  exists-elim
n4  定理 *undefined
n5  term x
n6  term y
n7  mp
n8  mp
n9  mp
n10  mp
n11  mp
n12  eq-refl(t=y)
n13  axiom A1
n14  subst(groups=1)
n15  atom P
n16  pred =
n17  atom Q
n18  term z
n19  pred =
n20  pred =
n21  or
n22  term u
n23  mem
n24  iff
n25  all(v=z)
n26  mp
n27  mp
n28  or-intro-ax(side=r)
n29  pred =
n30  subst(groups=1)
n31  or
n32  imp
n33  axiom A2
n34  subst(groups=2)
n35  atom R
n36  mp
n37  mp
n43  all-inst(v=z)
n45  mem
n46  iff
n49  mp
n50  mp
n51  iff-elim-ax(dir=lr)
n52  subst(groups=1)
n53  imp
n54  imp
n55  subst(groups=2)
n56  subst(groups=2)
n57  mp
n58  mp
n59  mp
n60  mp
n61  mp
n62  定理 *undefined
n63  subst(groups=1)
n64  pred =
n65  mp
n66  mp
n67  or-intro-ax(side=l)
n68  pred =
n69  定理 *undefined
n70  or
n72  subst(groups=2)
n73  mp
n74  mp
n78  all-inst(v=z)
n80  mem
n81  iff
n84  mp
n85  mp
n86  iff-elim-ax(dir=lr)
n87  subst(groups=1)
n88  imp
n89  imp
n90  subst(groups=2)
n91  subst(groups=2)
n92  mp
n93  mp
n94  and-intro-ax
n95  subst(groups=1)
n96  and
n97  imp
n98  imp
n99  subst(groups=2)
n100  subst(groups=2)
n101  mp
n102  mp
n103  exists-gen(v=u)
n104  subst(groups=1)
n105  exists(v=u)
n106  imp
n107  subst(groups=2)

接线：
n4.out → n3.exists
n13.out → n14.assertion
n6.out → n16.t1
n6.out → n16.t2
n15.out → n14.atom1
n16.out → n14.formula1
n18.out → n19.t1
n5.out → n19.t2
n18.out → n20.t1
n6.out → n20.t2
n19.out → n21.a
n20.out → n21.b
n18.out → n23.a
n22.out → n23.b
n21.out → n24.a
n23.out → n24.b
n24.out → n25.a
n17.out → n14.atom2
n25.out → n14.formula2
n12.out → n11.a
n14.out → n11.b
n6.out → n29.t1
n5.out → n29.t2
n29.out → n28.a
n16.out → n28.b
n13.out → n30.assertion
n29.out → n31.a
n16.out → n31.b
n16.out → n32.a
n31.out → n32.b
n15.out → n30.atom1
n32.out → n30.formula1
n17.out → n30.atom2
n25.out → n30.formula2
n28.out → n27.a
n30.out → n27.b
n33.out → n34.assertion
n15.out → n34.atom1
n25.out → n34.formula1
n17.out → n34.atom2
n16.out → n34.formula2
n35.out → n34.atom3
n31.out → n34.formula3
n27.out → n26.a
n34.out → n26.b
n11.out → n10.a
n26.out → n10.b
n24.out → n43.formula
n6.out → n43.term
n6.out → n45.a
n22.out → n45.b
n31.out → n46.a
n45.out → n46.b
n31.out → n51.a
n45.out → n51.b
n13.out → n52.assertion
n31.out → n53.a
n45.out → n53.b
n46.out → n54.a
n53.out → n54.b
n15.out → n52.atom1
n54.out → n52.formula1
n17.out → n52.atom2
n25.out → n52.formula2
n51.out → n50.a
n52.out → n50.b
n33.out → n55.assertion
n15.out → n55.atom1
n25.out → n55.formula1
n17.out → n55.atom2
n46.out → n55.formula2
n35.out → n55.atom3
n53.out → n55.formula3
n50.out → n49.a
n55.out → n49.b
n43.out → n37.a
n49.out → n37.b
n33.out → n56.assertion
n15.out → n56.atom1
n25.out → n56.formula1
n17.out → n56.atom2
n31.out → n56.formula2
n35.out → n56.atom3
n45.out → n56.formula3
n37.out → n36.a
n56.out → n36.b
n10.out → n9.a
n36.out → n9.b
n13.out → n63.assertion
n5.out → n64.t1
n5.out → n64.t2
n15.out → n63.atom1
n64.out → n63.formula1
n17.out → n63.atom2
n25.out → n63.formula2
n62.out → n61.a
n63.out → n61.b
n64.out → n67.a
n5.out → n68.t1
n6.out → n68.t2
n68.out → n67.b
n64.out → n70.a
n68.out → n70.b
n67.out → n66.a
n69.out → n66.b
n33.out → n72.assertion
n15.out → n72.atom1
n25.out → n72.formula1
n17.out → n72.atom2
n64.out → n72.formula2
n35.out → n72.atom3
n70.out → n72.formula3
n66.out → n65.a
n72.out → n65.b
n61.out → n60.a
n65.out → n60.b
n24.out → n78.formula
n5.out → n78.term
n5.out → n80.a
n22.out → n80.b
n70.out → n81.a
n80.out → n81.b
n70.out → n86.a
n80.out → n86.b
n13.out → n87.assertion
n70.out → n88.a
n80.out → n88.b
n81.out → n89.a
n88.out → n89.b
n15.out → n87.atom1
n89.out → n87.formula1
n17.out → n87.atom2
n25.out → n87.formula2
n86.out → n85.a
n87.out → n85.b
n33.out → n90.assertion
n15.out → n90.atom1
n25.out → n90.formula1
n17.out → n90.atom2
n81.out → n90.formula2
n35.out → n90.atom3
n88.out → n90.formula3
n85.out → n84.a
n90.out → n84.b
n78.out → n74.a
n84.out → n74.b
n33.out → n91.assertion
n15.out → n91.atom1
n25.out → n91.formula1
n17.out → n91.atom2
n70.out → n91.formula2
n35.out → n91.atom3
n80.out → n91.formula3
n74.out → n73.a
n91.out → n73.b
n60.out → n59.a
n73.out → n59.b
n80.out → n94.a
n45.out → n94.b
n13.out → n95.assertion
n80.out → n96.a
n45.out → n96.b
n45.out → n97.a
n96.out → n97.b
n80.out → n98.a
n97.out → n98.b
n15.out → n95.atom1
n98.out → n95.formula1
n17.out → n95.atom2
n25.out → n95.formula2
n94.out → n93.a
n95.out → n93.b
n33.out → n99.assertion
n15.out → n99.atom1
n25.out → n99.formula1
n17.out → n99.atom2
n80.out → n99.formula2
n35.out → n99.atom3
n97.out → n99.formula3
n93.out → n92.a
n99.out → n92.b
n59.out → n58.a
n92.out → n58.b
n33.out → n100.assertion
n15.out → n100.atom1
n25.out → n100.formula1
n17.out → n100.atom2
n45.out → n100.formula2
n35.out → n100.atom3
n96.out → n100.formula3
n58.out → n57.a
n100.out → n57.b
n9.out → n8.a
n57.out → n8.b
n96.out → n103.formula
n22.out → n103.term
n13.out → n104.assertion
n96.out → n105.a
n96.out → n106.a
n105.out → n106.b
n15.out → n104.atom1
n106.out → n104.formula1
n17.out → n104.atom2
n25.out → n104.formula2
n103.out → n102.a
n104.out → n102.b
n33.out → n107.assertion
n15.out → n107.atom1
n25.out → n107.formula1
n17.out → n107.atom2
n96.out → n107.formula2
n35.out → n107.atom3
n105.out → n107.formula3
n102.out → n101.a
n107.out → n101.b
n8.out → n7.a
n101.out → n7.b
n7.out → n3.implication
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → nt.proof
```

</details>
