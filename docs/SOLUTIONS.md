# 公理板 · 114 关参考解法清单

> 由 `scripts/export-solutions.js` 从 `src/levels.js` 自动生成。每个参考电路都先经过真实 Engine 求值验证；
> 清单里的模块按参考电路中的节点顺序排列，接线单独列出，按 `模块.端口 → 模块.端口` 连即可。
> 目标槽的节点已在关卡棋盘上，标为 `[target]`。

## 快速索引

| 章节 | 关 | 标题 | 目标 | 提示 | 模块/接线 |
| --- | --- | --- | --- | --- | --- |
| Ⅰ | i | 公理 A1 | `⊢ ( P → ( Q → P ) )` | A1 · P → (Q → P) | 1 / 1 |
| Ⅰ | ii | 公理 A2 | `⊢ ( ( P → ( Q → R ) ) → ( ( P → Q ) → ( P → R ) ) )` | A2 · (P→(Q→R)) → ((P→Q)→(P→R)) | 1 / 1 |
| Ⅰ | iii | 公理 A3 | `⊢ ( ( ¬ P → ¬ Q ) → ( Q → P ) )` | A3 · (¬P→¬Q) → (Q→P) | 1 / 1 |
| Ⅰ | iv | 代入 | `⊢ ( Q → ( R → Q ) )` | S · A[P↦B] ⇒ A′ | 6 / 6 |
| Ⅰ | v | 分离 | `⊢ ( ( P → Q ) → ( P → P ) )` | M · A · A→B ⇒ B | 6 / 6 |
| Ⅰ | `*01` | 同一律 | `⊢ ( P → P )` | 两条 A1 和一条 A2，用两次分离。 | 13 / 18 |
| Ⅰ | `*02` | 后件自反 | `⊢ ( P → ( Q → Q ) )` | 先得 B→B，再用 A1 把 A 加回前件。 | 11 / 13 |
| Ⅰ | `*03` | 回指前件 | `⊢ ( P → ( ( P → Q ) → Q ) )` | 把 (A→B) 当前件，构造 A→((A→B)→B)。 | 27 / 40 |
| Ⅰ | `*04` | 后件强化 | `⊢ ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) )` | 先用 A1 把 A→B 嵌进 C 的前件。 | 28 / 43 |
| Ⅰ | `*05` | 前件弱化 | `⊢ ( ( P → Q ) → ( ( Q → R ) → ( P → R ) ) )` | 把 A→B 与 B→C 接起来。 | 96 / 162 |
| Ⅰ | `*06` | 否定的蕴涵 | `⊢ ( ¬ ( P → Q ) → ( P → ¬ Q ) )` | 从否定蕴涵出发，用反证与双重否定。 | 318 / 553 |
| Ⅰ | `*07` | 否定的前件 | `⊢ ( ¬ ( P → Q ) → ( ¬ P → ¬ Q ) )` | 与上一关对称，用 A3 与双重否定。 | 319 / 554 |
| Ⅰ | `*08` | 前件重排 | `⊢ ( ( P → ( Q → R ) ) → ( Q → ( P → R ) ) )` | 用 A2 把前件换位，再接 A1。 | 71 / 117 |
| Ⅰ | `*09` | 逆否命题 | `⊢ ( ( P → Q ) → ( ¬ Q → ¬ P ) )` | A3 给出 (¬B→¬A)→(A→B)，再用前件重排。 | 310 / 538 |
| Ⅰ | `*10` | 逆否（否定后件） | `⊢ ( ( P → ¬ Q ) → ( Q → ¬ P ) )` | 把 B→¬A 写成 B→(A→¬A) 的形状，用 A3。 | 155 / 264 |
| Ⅰ | `*11` | 逆否（否定前件） | `⊢ ( ( ¬ P → Q ) → ( ¬ Q → P ) )` | A3 的变体：把 ¬B 当前件。 | 166 / 282 |
| Ⅰ | `*12` | 双重否定引入 | `⊢ ( P → ¬ ¬ P )` | 用 A3 的逆否方向：¬A→¬A 得到 A→¬¬A。 | 140 / 239 |
| Ⅰ | `*13` | 双重否定消去 | `⊢ ( ¬ ¬ P → P )` | 先证 ¬¬A→(¬A→¬¬A)，再用反证法。 | 84 / 139 |
| Ⅰ | `*14` | 矛盾推出一切 | `⊢ ( ¬ P → ( P → Q ) )` | 用 A1 造出 A→(¬B→A)，再用 A3。 | 26 / 37 |
| Ⅰ | `*15` | 合取前件合并 | `⊢ ( ( P → ( Q → R ) ) → ( ( P ∧ Q ) → R ) )` | 把合取拆成两个前件再用 A2 合并（演绎定理自动处理假设）。 | 68 / 116 |
| Ⅰ | `*16` | 分情况 | `⊢ ( ( ¬ P → Q ) → ( ( P → Q ) → Q ) )` | 分别从 ¬A 和 A 推出 B，再用 A3 合并。 | 194 / 332 |
| Ⅰ | `*17` | 蕴涵合成 | `⊢ ( ( P → Q ) → ( ( R → S ) → ( ( Q → R ) → ( P → S ) ) ) )` | 两次前件/后件组合。 | 113 / 192 |
| Ⅰ | `*18` | 替换前件（左） | `⊢ ( ( ( P → Q ) → R ) → ( Q → R ) )` | 从 B 出发先用 A1 得到 A→B。 | 61 / 99 |
| Ⅰ | `*19` | 替换前件（右） | `⊢ ( ( ( P → Q ) → R ) → ( ¬ P → R ) )` | 从 A 出发先用 A1 得到 A→B。 | 63 / 101 |
| Ⅰ | `*20` | 合取前件拆分 | `⊢ ( ( ( P ∧ Q ) → R ) → ( P → ( Q → R ) ) )` | 把合取前件拆成两层前件（演绎定理自动处理假设）。 | 132 / 231 |
| Ⅰ | `*21` | 预线性 | `⊢ ( ( ( P → Q ) → ( P → R ) ) → ( P → ( Q → R ) ) )` | 用 A2 与交换。 | 138 / 235 |
| Ⅰ | `*22` | 反证法 | `⊢ ( ( ¬ P → P ) → P )` | 用 A3 把 ¬A→A 翻成 ¬A→¬¬A，再配合双重否定。 | 39 / 58 |
| Ⅰ | `*23` | 简化蕴涵 | `⊢ ( ¬ ( P → ¬ Q ) → Q )` | 把 ¬B 当前件，用 A3 得到逆否。 | 77 / 125 |
| Ⅰ | `*24` | 皮尔士律 | `⊢ ( ( ( P → Q ) → P ) → P )` | 假设 (A→B)→A，再分 A 与 ¬A 两种情况。 | 189 / 320 |
| Ⅱ | i | 全称引入 | `⊢ ( P → ∀ x P )` | ∀* · A ⇒ A → ∀x A | 2 / 2 |
| Ⅱ | ii | 全称例化 | `⊢ ( ∀ x P → P )` | ∀E* · ∀x A ⇒ A[t/x] | 3 / 3 |
| Ⅱ | iii | 全称推广 | `⊢ ∀ x ( P → ( Q → P ) )` | ∀I · A ⇒ ∀x A | 2 / 2 |
| Ⅱ | iv | 存在推广 | `⊢ ( P → ∃ x P )` | ∃I* · A[t/x] ⇒ ∃x A | 3 / 3 |
| Ⅱ | v | 全称分配公理 | `⊢ ( ∀ x ( P → Q ) → ( ∀ x P → ∀ x Q ) )` | A5 · ∀x(P→Q) ⇒ ∀xP → ∀xQ | 1 / 1 |
| Ⅱ | `*25` | 前件提取 | `⊢ ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → G ( x ) ) )` | 把 P 从全称前件里提出/收回。 | 19 / 25 |
| Ⅱ | `*26` | 全称弱化 | `⊢ ( ∀ x F ( x ) → ∀ x ( G ( x ) → F ( x ) ) )` | 在 ∀ 下用 A1，再分配。 | 14 / 18 |
| Ⅱ | `*27` | 嵌套全称引入 | `⊢ ( F ( x ) → ( G ( y ) → ∀ x G ( y ) ) )` | A1 与全称引入。 | 12 / 14 |
| Ⅱ | `*28` | 双重量词消去 | `⊢ ( ∀ x ∀ y F ( x ) → F ( x ) )` | 两次全称例化。 | 23 / 30 |
| Ⅱ | `*29` | 三段全称分配 | `⊢ ( ∀ x ( F ( x ) → ( G ( x ) → H ( x ) ) ) → ( ∀ x F ( x ) → ( ∀ x G ( x ) → ∀ x H ( x ) ) ) )` | 连续两次全称分配。 | 44 / 67 |
| Ⅱ | `*30` | 混合三段论 | `⊢ ( ( F ( x ) → ∀ x ( G ( x ) → H ( x ) ) ) → ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )` | 分配后接三段论。 | 45 / 71 |
| Ⅱ | `*31` | 全称三段论 | `⊢ ( ∀ x ( G ( x ) → H ( x ) ) → ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )` | 分配 + HS。 | 48 / 76 |
| Ⅱ | `*32` | 双层分配 | `⊢ ( ∀ x ∀ y ( F ( x ) → G ( x ) ) → ( ∀ x ∀ y F ( x ) → ∀ x ∀ y G ( x ) ) )` | 两次 A5。 | 53 / 79 |
| Ⅱ | `*33` | 二次回指 | `⊢ ( F ( x ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) )` | A1 连续两次代入。 | 25 / 38 |
| Ⅱ | `*34` | 四段分配 | `⊢ ( ∀ x ( F ( x ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) ) → ( ∀ x F ( x ) → ( ∀ x G ( x ) → ( ∀ x H ( x ) → ∀ x F ( x ) ) ) ) )` | 连续三次分配。 | 72 / 117 |
| Ⅱ | `*35` | 双重量词引入 | `⊢ ( F ( z ) → ∀ x ∀ y F ( z ) )` | 两次全称引入。 | 26 / 35 |
| Ⅱ | `*36` | 辖域移动（变体二） | `⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )` | 同 *38。 | 68 / 110 |
| Ⅱ | `*37` | 全称后件组合 | `⊢ ( ( F ( x ) → ∀ x G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )` | 先分配，再三段论。 | 69 / 114 |
| Ⅱ | `*38` | 辖域移动 | `⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )` | 用全称引入与分配。 | 68 / 110 |
| Ⅱ | `*39` | 全称替换前件 | `⊢ ( ( F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → G ( x ) ) )` | 先全称例化，再三段论。 | 76 / 128 |
| Ⅱ | `*40` | 全称合并 | `⊢ ( ( ∀ x F ( x ) → ∀ x ∀ x F ( x ) ) → ( ( ∀ x ( ∀ x F ( x ) → G ( x ) ) → ( ∀ x ∀ x F ( x ) → ∀ x G ( x ) ) ) → ( ∀ x ( ∀ x F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → ∀ x G ( x ) ) ) ) )` | 分配、引入、再分配。 | 162 / 284 |
| Ⅱ | `*41` | 全称三段论链 | `⊢ ( ∀ x ( F ( x ) → G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ∀ x ( F ( x ) → H ( x ) ) ) )` | 两次分配后接命题三段论。 | 164 / 283 |
| Ⅱ | `*42` | 辖域移动（H/G） | `⊢ ( ∀ x ( H ( y ) → F ( x ) ) → ( H ( y ) → ∀ x F ( x ) ) )` | 同 *39，换谓词。 | 68 / 110 |
| Ⅱ | `*43` | 全称三段论（换序） | `⊢ ( ∀ x ( F ( x ) → G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ∀ x ( F ( x ) → H ( x ) ) ) )` | 同 *42，换谓词顺序。 | 164 / 283 |
| Ⅱ | `*44` | 辖域移动（变体三） | `⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )` | 同 *38。 | 68 / 110 |
| Ⅱ | `*45` | 全称三段论（H/F） | `⊢ ( ∀ x ( F ( x ) → H ( x ) ) → ( ( G ( x ) → ∀ x F ( x ) ) → ( G ( x ) → ∀ x H ( x ) ) ) )` | 同 *32，换谓词。 | 48 / 76 |
| Ⅱ | `*46` | 全称合并（换序） | `⊢ ( ( ∀ x G ( x ) → ∀ x ∀ x G ( x ) ) → ( ( ∀ x ( ∀ x G ( x ) → F ( x ) ) → ( ∀ x ∀ x G ( x ) → ∀ x F ( x ) ) ) → ( ∀ x ( ∀ x G ( x ) → F ( x ) ) → ( ∀ x G ( x ) → ∀ x F ( x ) ) ) ) )` | 同 *41，换谓词。 | 162 / 284 |
| Ⅱ | `*47` | 全称替换前件（G） | `⊢ ( ( G ( x ) → F ( x ) ) → ( ∀ x G ( x ) → F ( x ) ) )` | 同 *40，换谓词。 | 76 / 128 |
| Ⅱ | `*48` | 辖域移动（F/G 变体） | `⊢ ( ∀ x ( F ( z ) → G ( y ) ) → ( F ( z ) → ∀ x G ( y ) ) )` | 同 *39，换变元位置。 | 68 / 110 |
| Ⅲ | i | 等词自反 | `⊢ x = x` | =I · t = t | 1 / 1 |
| Ⅲ | ii | Leibniz 替换 | `⊢ ( x = y → ( F ( x ) → F ( y ) ) )` | =L · x=y ⇒ F(x) → F(y) | 5 / 5 |
| Ⅲ | iii | Leibniz 反向 | `⊢ ( y = x → ( F ( y ) → F ( x ) ) )` | =L · y=x ⇒ F(y) → F(x) | 5 / 5 |
| Ⅲ | iv | 等词替换（直接模式） | `⊢ ( x = y → ( x = z → y = z ) )` | =L · x=y ⇒ (x=z → y=z) | 5 / 6 |
| Ⅲ | `*49` | 自反（x） | `⊢ x = x` | 直接用等词自反规则。 | 1 / 1 |
| Ⅲ | `*50` | 自反式合并 | `⊢ ∀ x ∀ y ( x = x ∧ y = y )` | 分别用等词自反取 x、y，再用 ∧I* 合并，最后全称推广。 | 11 / 13 |
| Ⅲ | `*51` | 对称性 | `⊢ ( x = y → y = x )` | 用替换把 x=x 变成 y=x，再用置换律。 | 16 / 23 |
| Ⅲ | `*52` | 传递性 | `⊢ ( x = y → ( y = z → x = z ) )` | 对 y=z 用替换得到 x=y→x=z，再置换前件。 | 13 / 19 |
| Ⅲ | `*53` | 谓词替换 | `⊢ ( x = y → ( F ( x ) → F ( y ) ) )` | 把 F(z) 作为抽象公式。 | 5 / 5 |
| Ⅲ | `*54` | 谓词替换（反向） | `⊢ ( x = y → ( F ( y ) → F ( x ) ) )` | 先对称，再替换，最后用三段论。 | 18 / 24 |
| Ⅲ | `*55` | 全称自反 | `⊢ ∀ x x = x` | 用全称推广。 | 2 / 2 |
| Ⅲ | `*56` | 对称的双向结论 | `⊢ ∀ x ∀ y ( x = y → ( x = y ∧ y = x ) )` | 用 *51 得到 y=x，再与假设本身用 ∧I* 合并；DT 消去假设后全称推广。 | 16 / 22 |
| Ⅲ | `*57` | 复合替换 | `⊢ ( x = y → ( ( F ( x ) → G ( x ) ) → ( F ( y ) → G ( y ) ) ) )` | 把整个蕴涵式作为抽象公式。 | 7 / 8 |
| Ⅲ | `*58` | 否定替换 | `⊢ ( x = y → ( ¬ F ( x ) → ¬ F ( y ) ) )` | 先用 *54 得到 F(y)→F(x)，再套逆否定理 *9 得到 ¬F(x)→¬F(y)，最后用 HS 串起 x=y。 | 21 / 27 |
| Ⅲ | `*59` | 条件替换 | `⊢ ( x = y → ( ( x = x → F ( x ) ) → ( y = y → F ( y ) ) ) )` | 假设 x=y 与 x=x→F(x)：由等词自反得 x=x，配合 *53 得 F(y)，再用 A1 补出 y=y→F(y)；两次 DT。 | 180 / 313 |
| Ⅲ | `*60` | 不含 x 的公式 | `⊢ ( x = y → ( ∀ z z = z → ∀ z z = z ) )` | 先取 B→B（同一律实例），再用 A1 把 x=y 插到前面。 | 15 / 18 |
| Ⅲ | `*61` | 谓词替换（双向） | `⊢ ∀ x ∀ y ( x = y → ( F ( x ) ↔ F ( y ) ) )` | *53 给正向、*54 给反向，用 ↔I 合成，DT 消去 x=y 后全称推广。 | 33 / 48 |
| Ⅲ | `*62` | 否定复合替换 | `⊢ ( x = y → ( ¬ ( F ( x ) → G ( x ) ) → ¬ ( F ( y ) → G ( y ) ) ) )` | 把整个否定蕴涵作为抽象公式。 | 8 / 9 |
| Ⅲ | `*63` | 自反条件替换 | `⊢ ( x = y → ( ( F ( x ) → F ( x ) ) → ( F ( y ) → F ( y ) ) ) )` | 由同一律得 F(y)→F(y)，A1 插入 x=y 与 F(x)→F(x)，再用前件重排 *8。 | 26 / 37 |
| Ⅲ | `*64` | 全称辖域（定理） | `⊢ ( ∀ z ( P → Q ) → ( P → ∀ z Q ) )` | 先引用 *66 这条已证定理，再用分离。 | 84 / 141 |
| Ⅲ | `*65` | 等词的双向同余 | `⊢ ( x = y → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) )` | 正向用替换，反向先对称再替换；各自推广并移动 ∀，最后合取。 | 48 / 76 |
| Ⅲ | `*66` | 等词给出元素等价 | `⊢ ( x = y → ∀ z ( z ∈ x ↔ z ∈ y ) )` | 先引用 *65 得到两个方向的 ∀ 蕴含，逐个元素用 ↔E 拆、↔I 合，再全称推广；假设用 DT 消去。 | 88 / 148 |
| Ⅲ | `*67` | 传递后的谓词替换 | `⊢ ∀ x ∀ y ∀ z ( x = y → ( y = z → ( F ( x ) → F ( z ) ) ) )` | 先用 *52 得到 x=z，再用 Leibniz 把 F(x) 换成 F(z)；两次 DT 后全称推广。 | 60 / 97 |
| Ⅲ | `*68` | 复合替换（双向） | `⊢ ∀ x ∀ y ( x = y → ( ( F ( x ) → G ( x ) ) ↔ ( F ( y ) → G ( y ) ) ) )` | 正向引用 *57；反向先用 *51 得到 y=x，再 Leibniz 反向替换；↔I 后 DT。 | 82 / 133 |
| Ⅲ | `*69` | 全称等词替换 | `⊢ ( x = y → ( ∀ z z = x → ∀ z z = y ) )` | 从 ∀z z=x 全称例化到 z，用 Leibniz 换成 z=y，再全称推广；假设用 DT 分两层消去。 | 110 / 188 |
| Ⅲ | `*70` | 全称等词替换（反向） | `⊢ ( x = y → ( ∀ z z = y → ∀ z z = x ) )` | 先对称，再用替换与三段论。 | 19 / 27 |
| Ⅲ | `*71` | 嵌套全称替换 | `⊢ ( x = y → ( ∀ z x = z → ∀ z y = z ) )` | 同 *69，但 Leibniz 作用在 x=z 的左侧。 | 110 / 188 |
| Ⅲ | `*72` | 深层替换（双向） | `⊢ ( x = y → ( ( F ( x ) → ( G ( x ) → F ( x ) ) ) ↔ ( F ( y ) → ( G ( y ) → F ( y ) ) ) ) )` | 正向 Leibniz 直接替换；反向先对称再 Leibniz；↔I 后 DT。 | 82 / 138 |
| Ⅳ | i | 外延公理 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → x = y )` | EXT · ∀z(z∈x↔z∈y) ⇒ x=y | 3 / 3 |
| Ⅳ | ii | 空集公理 | `⊢ ∃ z ∀ x ¬ x ∈ z` | ∅ · ∃z∀x ¬(x∈z) | 1 / 1 |
| Ⅳ | iii | 配对公理 | `⊢ ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )` | {,} · ∃u∀z((z=x∨z=y) ↔ z∈u) | 3 / 3 |
| Ⅳ | iv | 并集公理 | `⊢ ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )` | ∪ · ∃y∀z((∃u(z∈u∧u∈x)) ↔ z∈y) | 2 / 2 |
| Ⅳ | `*73` | 元素等价的对称性 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ∀ z ( z ∈ y ↔ z ∈ x ) )` | 全称例化到 z，用 ↔E/↔I 做对称，再用全辖域公理移到外层。 | 47 / 76 |
| Ⅳ | `*74` | 元素等价的两个方向 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) )` | 分别用 ↔E 取两个方向，各自推广并移动 ∀，最后用 ∧I 与 A2 合并。 | 54 / 86 |
| Ⅳ | `*75` | 元素等价的三重结论 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ∧ ∀ z ( z ∈ y ↔ z ∈ x ) ) )` | 分别引用 *74 与 *73，再用 ∧I 与 A2 合并两个后件。 | 33 / 47 |
| Ⅳ | `*76` | 元素等价的逐点传递 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ u ) → ( z ∈ x ↔ z ∈ u ) ) )` | 假设两个全称等价，逐点取出两个方向，用 HS 串起来再重建 ↔。 | 461 / 827 |
| Ⅳ | `*77` | 元素等价的全称传递 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ u ) → ∀ z ( z ∈ x ↔ z ∈ u ) ) )` | 先逐点传递，再全称推广；两次假设用 DT 消去。 | 484 / 864 |
| Ⅳ | `*78` | 属于替换（反向） | `⊢ ∀ x ∀ y ( x = y → ( y ∈ x → y ∈ y ) )` | Leibniz 替换。 | 6 / 8 |
| Ⅳ | `*79` | 空集 | `⊢ ∃ z ∀ x ¬ x ∈ z` | 直接使用空集公理。 | 1 / 1 |
| Ⅳ | `*80` | 外延公理（全称） | `⊢ ∀ x ∀ y ( ∀ z ( z ∈ x ↔ z ∈ y ) → x = y )` | 外延公理 + 全称推广。 | 5 / 5 |
| Ⅳ | `*81` | 外延的等价刻画 | `⊢ ∀ x ∀ y ( x = y ↔ ∀ z ( z ∈ x ↔ z ∈ y ) )` | 正向引用 *66；反向直接接外延公理；再用 ↔I 合成等价并全称推广。 | 15 / 20 |
| Ⅳ | `*82` | 配对公理（全称） | `⊢ ∀ x ∀ y ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )` | 配对公理 + 全称推广。 | 5 / 5 |
| Ⅳ | `*83` | 配对公理（实例） | `⊢ ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )` | 直接使用配对公理。 | 3 / 3 |
| Ⅳ | `*84` | 并集公理（全称） | `⊢ ∀ x ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )` | 并集公理 + 全称推广。 | 3 / 3 |
| Ⅳ | `*85` | 并集公理（实例） | `⊢ ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )` | 直接使用并集公理。 | 2 / 2 |
| Ⅳ | `*86` | 等词的双向同余 | `⊢ ∀ x ∀ y ( x = y → ( x = z ↔ y = z ) )` | 正向用 Leibniz(x→y)，反向先用对称性得到 y=x 再用 Leibniz(y→x)；↔I 合成后 DT 消去假设。 | 79 / 132 |
| Ⅳ | `*87` | 等词进入属于（全称） | `⊢ ∀ y ∀ z ( y = z → ( x ∈ y → x ∈ z ) )` | Leibniz 替换后全称推广。 | 7 / 8 |
| Ⅳ | `*88` | 等词进入属于（反向） | `⊢ ∀ y ∀ z ( y = z → ( y ∈ x → z ∈ x ) )` | Leibniz 替换。 | 7 / 8 |
| Ⅳ | `*89` | 外延（y,z） | `⊢ ∀ y ∀ z ( ∀ x ( x ∈ y ↔ x ∈ z ) → y = z )` | 外延公理换变量。 | 5 / 5 |
| Ⅳ | `*90` | 配对（y,x） | `⊢ ∀ y ∀ x ∃ u ∀ z ( ( z = y ∨ z = x ) ↔ z ∈ u )` | 配对公理换变量。 | 5 / 5 |
| Ⅳ | `*91` | 并集（y） | `⊢ ∀ y ∃ u ∀ z ( ∃ v ( z ∈ v ∧ v ∈ y ) ↔ z ∈ u )` | 并集公理换变量。 | 3 / 3 |
| Ⅳ | `*92` | 属于替换的双向版 | `⊢ ∀ x ∀ y ∀ z ( x = y → ( x ∈ z ↔ y ∈ z ) )` | 同 *86，但替换作用在 ∈ 的左项；正向和反向各接一条 Leibniz 公理。 | 80 / 133 |
| Ⅳ | `*93` | 三层等词链（双向） | `⊢ ∀ y ∀ z ∀ x ( y = z → ( x ∈ y ↔ x ∈ z ) )` | 反向需要 z=y：把 *56 连续例化两次；再用 Leibniz 两个方向、HS 与 ↔I，最后 DT 消去 y=z。 | 92 / 156 |
| Ⅳ | `*94` | 配对集含左元 | `⊢ ∀ x ∀ y ∃ u x ∈ u` | 从配对公理取 u，全称例化到 x，用 x=x∨x=y 与 ↔E 得到 x∈u，再 ∃I/∃E 与全称推广。 | 71 / 117 |
| Ⅳ | `*95` | 配对集含右元 | `⊢ ∀ x ∀ y ∃ u y ∈ u` | 同左元，但用 y=y 从析取的右支进入。 | 71 / 117 |
| Ⅳ | `*96` | 综合：配对给出公共容器 | `⊢ ∀ x ∀ y ∃ u ( x ∈ u ∧ y ∈ u )` | 在同一个配对集 u 上分别取 x∈u、y∈u，用 ∧I 合并，再用 ∃I 收束；两次存在消去。 | 133 / 230 |

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
- 参考解：6 个模块 / 6 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n7  [target]
n1  axiom A1
n2  subst(groups=1)
n3  atom P
n4  atom Q
n5  atom Q
n6  atom R

接线：
n1.out → n2.assertion
n3.out → n2.atom1
n4.out → n2.formula1
n5.out → n2.atom2
n6.out → n2.formula2
n2.out → n7.proof
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

### *01 · 同一律

- 目标：`⊢ ( P → P )`
- 提示：两条 A1 和一条 A2，用两次分离。
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
n2.out → n8.assertion
n5.out → n10.a
n5.out → n10.b
n9.out → n8.atom1
n10.out → n8.formula1
n11.out → n12.assertion
n13.out → n12.atom1
n10.out → n12.formula1
n14.out → n12.atom2
n5.out → n12.formula2
n8.out → n6.a
n12.out → n6.b
n3.out → n1.a
n6.out → n1.b
n1.out → n15.proof
```

</details>

### *02 · 后件自反

- 目标：`⊢ ( P → ( Q → Q ) )`
- 提示：先得 B→B，再用 A1 把 A 加回前件。
- 参考解：11 个模块 / 13 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n12  [target]
n1  mp
n2  定理 *01
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
n6.out → n7.assertion
n5.out → n9.a
n5.out → n9.b
n8.out → n7.atom1
n9.out → n7.formula1
n10.out → n7.atom2
n11.out → n7.formula2
n3.out → n1.a
n7.out → n1.b
n1.out → n12.proof
```

</details>

### *03 · 回指前件

- 目标：`⊢ ( P → ( ( P → Q ) → Q ) )`
- 提示：把 (A→B) 当前件，构造 A→((A→B)→B)。
- 参考解：27 个模块 / 40 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n43  [target]
n1  mp
n3  定理 *01
n6  axiom A1
n7  subst(groups=0)
n8  atom Q
n9  atom P
n10  atom Q
n11  imp
n15  imp
n18  axiom A2
n22  mp
n23  mp
n24  mp
n26  subst(groups=0)
n27  atom P
n29  subst(groups=2)
n30  atom P
n31  atom Q
n32  atom R
n34  subst(groups=1)
n35  atom P
n36  imp
n37  imp
n38  atom Q
n40  subst(groups=1)
n41  atom Q
n42  atom R

接线：
n6.out → n7.assertion
n9.out → n11.a
n10.out → n11.b
n8.out → n7.atom1
n11.out → n7.formula1
n11.out → n15.a
n9.out → n15.b
n3.out → n26.assertion
n27.out → n26.atom1
n11.out → n26.formula1
n18.out → n29.assertion
n30.out → n29.atom1
n11.out → n29.formula1
n31.out → n29.atom2
n9.out → n29.formula2
n32.out → n29.atom3
n10.out → n29.formula3
n26.out → n24.a
n29.out → n24.b
n6.out → n34.assertion
n11.out → n36.a
n10.out → n36.b
n15.out → n37.a
n36.out → n37.b
n35.out → n34.atom1
n37.out → n34.formula1
n38.out → n34.atom2
n9.out → n34.formula2
n24.out → n23.a
n34.out → n23.b
n18.out → n40.assertion
n41.out → n40.atom1
n15.out → n40.formula1
n42.out → n40.atom2
n36.out → n40.formula2
n23.out → n22.a
n40.out → n22.b
n7.out → n1.a
n22.out → n1.b
n1.out → n43.proof
```

</details>

### *04 · 后件强化

- 目标：`⊢ ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) )`
- 提示：先用 A1 把 A→B 嵌进 C 的前件。
- 参考解：28 个模块 / 43 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n47  [target]
n1  mp
n6  atom P
n7  atom Q
n8  imp
n11  axiom A1
n12  subst(groups=1)
n13  atom P
n14  atom Q
n15  atom R
n19  imp
n22  axiom A2
n27  mp
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
n43  subst(groups=2)
n44  atom P
n45  atom Q
n46  atom R

接线：
n6.out → n8.a
n7.out → n8.b
n11.out → n12.assertion
n13.out → n12.atom1
n8.out → n12.formula1
n14.out → n12.atom2
n15.out → n12.formula2
n15.out → n19.a
n8.out → n19.b
n22.out → n30.assertion
n31.out → n30.atom1
n15.out → n30.formula1
n32.out → n30.atom2
n6.out → n30.formula2
n33.out → n30.atom3
n7.out → n30.formula3
n11.out → n35.assertion
n15.out → n37.a
n6.out → n37.b
n15.out → n38.a
n7.out → n38.b
n37.out → n39.a
n38.out → n39.b
n19.out → n40.a
n39.out → n40.b
n36.out → n35.atom1
n40.out → n35.formula1
n41.out → n35.atom2
n8.out → n35.formula2
n30.out → n28.a
n35.out → n28.b
n22.out → n43.assertion
n44.out → n43.atom1
n8.out → n43.formula1
n45.out → n43.atom2
n19.out → n43.formula2
n46.out → n43.atom3
n39.out → n43.formula3
n28.out → n27.a
n43.out → n27.b
n12.out → n1.a
n27.out → n1.b
n1.out → n47.proof
```

</details>

### *05 · 前件弱化

- 目标：`⊢ ( ( P → Q ) → ( ( Q → R ) → ( P → R ) ) )`
- 提示：把 A→B 与 B→C 接起来。
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
n7.out → n16.a
n15.out → n16.b
n14.out → n12.atom2
n16.out → n12.formula2
n16.out → n20.a
n8.out → n20.b
n33.out → n34.assertion
n35.out → n34.atom1
n8.out → n34.formula1
n36.out → n34.atom2
n15.out → n34.formula2
n11.out → n40.assertion
n15.out → n42.a
n15.out → n42.b
n41.out → n40.atom1
n42.out → n40.formula1
n11.out → n44.assertion
n7.out → n46.a
n42.out → n46.b
n42.out → n47.a
n46.out → n47.b
n45.out → n44.atom1
n47.out → n44.formula1
n48.out → n44.atom2
n8.out → n44.formula2
n40.out → n38.a
n44.out → n38.b
n23.out → n50.assertion
n51.out → n50.atom1
n8.out → n50.formula1
n52.out → n50.atom2
n42.out → n50.formula2
n53.out → n50.atom3
n46.out → n50.formula3
n38.out → n37.a
n50.out → n37.b
n34.out → n32.a
n37.out → n32.b
n23.out → n57.assertion
n58.out → n57.atom1
n7.out → n57.formula1
n59.out → n57.atom2
n15.out → n57.formula2
n11.out → n61.assertion
n16.out → n63.a
n16.out → n63.b
n46.out → n64.a
n63.out → n64.b
n62.out → n61.atom1
n64.out → n61.formula1
n65.out → n61.atom2
n8.out → n61.formula2
n57.out → n55.a
n61.out → n55.b
n23.out → n67.assertion
n68.out → n67.atom1
n8.out → n67.formula1
n69.out → n67.atom2
n46.out → n67.formula2
n70.out → n67.atom3
n63.out → n67.formula3
n55.out → n54.a
n67.out → n54.b
n32.out → n31.a
n54.out → n31.b
n75.out → n76.assertion
n77.out → n76.atom1
n7.out → n76.formula1
n78.out → n76.atom2
n15.out → n76.formula2
n79.out → n76.atom3
n6.out → n76.formula3
n11.out → n81.assertion
n6.out → n83.a
n15.out → n83.b
n8.out → n84.a
n83.out → n84.b
n16.out → n85.a
n84.out → n85.b
n82.out → n81.atom1
n85.out → n81.formula1
n86.out → n81.atom2
n16.out → n81.formula2
n76.out → n74.a
n81.out → n74.b
n23.out → n88.assertion
n89.out → n88.atom1
n16.out → n88.formula1
n90.out → n88.atom2
n16.out → n88.formula2
n91.out → n88.atom3
n84.out → n88.formula3
n74.out → n73.a
n88.out → n73.b
n11.out → n93.assertion
n63.out → n95.a
n85.out → n95.b
n94.out → n93.atom1
n95.out → n93.formula1
n96.out → n93.atom2
n8.out → n93.formula2
n73.out → n72.a
n93.out → n72.b
n23.out → n98.assertion
n99.out → n98.atom1
n8.out → n98.formula1
n100.out → n98.atom2
n63.out → n98.formula2
n101.out → n98.atom3
n85.out → n98.formula3
n72.out → n71.a
n98.out → n71.b
n31.out → n30.a
n71.out → n30.b
n23.out → n105.assertion
n106.out → n105.atom1
n16.out → n105.formula1
n107.out → n105.atom2
n8.out → n105.formula2
n108.out → n105.atom3
n83.out → n105.formula3
n11.out → n110.assertion
n16.out → n112.a
n83.out → n112.b
n20.out → n113.a
n112.out → n113.b
n85.out → n114.a
n113.out → n114.b
n111.out → n110.atom1
n114.out → n110.formula1
n115.out → n110.atom2
n8.out → n110.formula2
n105.out → n103.a
n110.out → n103.b
n23.out → n117.assertion
n118.out → n117.atom1
n8.out → n117.formula1
n119.out → n117.atom2
n85.out → n117.formula2
n120.out → n117.atom3
n113.out → n117.formula3
n103.out → n102.a
n117.out → n102.b
n30.out → n29.a
n102.out → n29.b
n23.out → n122.assertion
n123.out → n122.atom1
n8.out → n122.formula1
n124.out → n122.atom2
n20.out → n122.formula2
n125.out → n122.atom3
n112.out → n122.formula3
n29.out → n28.a
n122.out → n28.b
n12.out → n1.a
n28.out → n1.b
n1.out → n126.proof
```

</details>

### *06 · 否定的蕴涵

- 目标：`⊢ ( ¬ ( P → Q ) → ( P → ¬ Q ) )`
- 提示：从否定蕴涵出发，用反证与双重否定。
- 参考解：318 个模块 / 553 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n519  [target]
n1  mp
n2  mp
n3  定理 *01
n4  subst(groups=0)
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  not
n10  mp
n11  mp
n12  mp
n16  axiom A1
n17  subst(groups=1)
n18  atom P
n19  atom Q
n20  not
n21  not
n25  imp
n28  axiom A2
n33  mp
n34  mp
n35  mp
n36  mp
n37  mp
n38  mp
n39  mp
n47  subst(groups=1)
n48  atom P
n49  atom Q
n53  imp
n61  mp
n62  mp
n63  axiom A3
n64  subst(groups=1)
n65  atom P
n66  atom Q
n68  subst(groups=1)
n69  atom P
n70  imp
n71  imp
n72  atom Q
n74  subst(groups=2)
n75  atom P
n76  atom Q
n77  atom R
n78  mp
n79  mp
n80  mp
n82  subst(groups=0)
n83  atom P
n84  mp
n85  mp
n89  mp
n90  mp
n98  subst(groups=1)
n99  atom P
n100  atom Q
n101  not
n102  not
n106  imp
n114  mp
n115  mp
n117  subst(groups=0)
n118  atom P
n120  subst(groups=1)
n121  atom P
n122  imp
n123  imp
n124  atom Q
n126  subst(groups=2)
n127  atom P
n128  atom Q
n129  atom R
n131  subst(groups=1)
n132  atom P
n133  atom R
n137  imp
n145  mp
n146  mp
n148  subst(groups=1)
n149  atom P
n150  atom Q
n152  subst(groups=1)
n153  atom P
n154  imp
n155  imp
n156  atom Q
n158  subst(groups=2)
n159  atom P
n160  atom Q
n161  atom R
n163  subst(groups=2)
n164  atom P
n165  atom Q
n166  atom R
n168  subst(groups=1)
n169  atom P
n170  atom Q
n172  subst(groups=2)
n173  atom P
n174  atom Q
n175  atom R
n176  mp
n177  mp
n179  subst(groups=1)
n180  atom P
n181  atom Q
n183  subst(groups=1)
n184  atom P
n185  imp
n186  imp
n187  atom Q
n189  subst(groups=1)
n190  atom P
n191  atom R
n192  mp
n193  mp
n194  mp
n195  mp
n196  mp
n198  subst(groups=1)
n199  atom P
n200  atom Q
n201  mp
n202  mp
n203  mp
n211  subst(groups=1)
n212  atom P
n213  atom Q
n214  not
n215  not
n219  imp
n225  mp
n226  mp
n227  mp
n229  mp
n230  mp
n231  mp
n239  subst(groups=1)
n240  atom P
n241  atom Q
n245  imp
n253  mp
n254  mp
n256  subst(groups=1)
n257  atom P
n258  atom Q
n260  subst(groups=1)
n261  atom P
n262  imp
n263  imp
n264  atom Q
n266  subst(groups=2)
n267  atom P
n268  atom Q
n269  atom R
n270  mp
n271  mp
n272  mp
n274  subst(groups=0)
n275  atom P
n276  mp
n277  mp
n281  mp
n282  mp
n290  subst(groups=1)
n291  atom P
n292  atom Q
n293  not
n294  not
n298  imp
n306  mp
n307  mp
n309  subst(groups=1)
n310  atom P
n311  atom Q
n313  subst(groups=1)
n314  atom P
n315  imp
n316  imp
n317  atom Q
n319  subst(groups=2)
n320  atom P
n321  atom Q
n322  atom R
n324  subst(groups=2)
n325  atom P
n326  atom Q
n327  atom R
n331  imp
n339  mp
n340  mp
n342  subst(groups=1)
n343  atom P
n344  atom Q
n346  subst(groups=1)
n347  atom P
n348  imp
n349  imp
n350  atom Q
n352  subst(groups=2)
n353  atom P
n354  atom Q
n355  atom R
n357  subst(groups=2)
n358  atom P
n359  atom Q
n360  atom R
n362  subst(groups=1)
n363  atom P
n364  atom Q
n366  subst(groups=2)
n367  atom P
n368  atom Q
n369  atom R
n370  mp
n371  mp
n373  subst(groups=0)
n374  atom P
n376  subst(groups=1)
n377  atom P
n378  imp
n379  imp
n380  atom Q
n382  subst(groups=2)
n383  atom P
n384  atom Q
n385  atom R
n410  subst(groups=1)
n411  atom P
n412  atom R
n414  subst(groups=0)
n415  atom P
n416  imp
n417  imp
n419  subst(groups=2)
n420  atom P
n421  atom Q
n422  atom R
n423  mp
n424  mp
n426  subst(groups=1)
n427  atom P
n428  atom Q
n430  subst(groups=0)
n431  atom P
n432  imp
n433  imp
n435  subst(groups=2)
n436  atom P
n437  atom Q
n438  atom R
n440  subst(groups=2)
n441  atom P
n442  atom Q
n443  atom R
n445  subst(groups=1)
n446  atom P
n447  imp
n448  atom Q
n450  subst(groups=1)
n451  atom P
n452  atom R
n454  subst(groups=1)
n455  atom P
n456  imp
n457  imp
n458  atom Q
n460  subst(groups=2)
n461  atom P
n462  atom Q
n463  atom R
n465  subst(groups=2)
n466  atom P
n467  atom Q
n468  atom R
n470  subst(groups=1)
n471  atom P
n472  imp
n473  imp
n474  atom Q
n476  subst(groups=2)
n477  atom P
n478  atom Q
n479  atom R
n480  mp
n481  mp
n483  subst(groups=1)
n484  atom P
n485  atom Q
n487  subst(groups=1)
n488  atom P
n489  imp
n490  imp
n491  atom Q
n493  subst(groups=2)
n494  atom P
n495  atom Q
n496  atom R
n498  subst(groups=2)
n499  atom P
n500  atom Q
n501  atom R
n502  mp
n503  mp
n505  subst(groups=1)
n506  atom P
n507  atom Q
n509  subst(groups=1)
n510  atom P
n511  imp
n512  imp
n513  atom Q
n515  subst(groups=2)
n516  atom P
n517  atom Q
n518  atom R

接线：
n3.out → n4.assertion
n6.out → n8.a
n7.out → n8.b
n8.out → n9.a
n5.out → n4.atom1
n9.out → n4.formula1
n16.out → n17.assertion
n18.out → n17.atom1
n9.out → n17.formula1
n7.out → n20.a
n20.out → n21.a
n19.out → n17.atom2
n21.out → n17.formula2
n21.out → n25.a
n9.out → n25.b
n16.out → n47.assertion
n48.out → n47.atom1
n21.out → n47.formula1
n49.out → n47.atom2
n20.out → n47.formula2
n20.out → n53.a
n21.out → n53.b
n63.out → n64.assertion
n65.out → n64.atom1
n7.out → n64.formula1
n66.out → n64.atom2
n20.out → n64.formula2
n16.out → n68.assertion
n20.out → n70.a
n7.out → n70.b
n53.out → n71.a
n70.out → n71.b
n69.out → n68.atom1
n71.out → n68.formula1
n72.out → n68.atom2
n21.out → n68.formula2
n64.out → n62.a
n68.out → n62.b
n28.out → n74.assertion
n75.out → n74.atom1
n21.out → n74.formula1
n76.out → n74.atom2
n53.out → n74.formula2
n77.out → n74.atom3
n70.out → n74.formula3
n62.out → n61.a
n74.out → n61.b
n47.out → n39.a
n61.out → n39.b
n3.out → n82.assertion
n83.out → n82.atom1
n70.out → n82.formula1
n16.out → n98.assertion
n99.out → n98.atom1
n20.out → n98.formula1
n70.out → n101.a
n101.out → n102.a
n100.out → n98.atom2
n102.out → n98.formula2
n102.out → n106.a
n20.out → n106.b
n63.out → n117.assertion
n118.out → n117.atom1
n101.out → n117.formula1
n16.out → n120.assertion
n7.out → n122.a
n101.out → n122.b
n106.out → n123.a
n122.out → n123.b
n121.out → n120.atom1
n123.out → n120.formula1
n124.out → n120.atom2
n20.out → n120.formula2
n117.out → n115.a
n120.out → n115.b
n28.out → n126.assertion
n127.out → n126.atom1
n20.out → n126.formula1
n128.out → n126.atom2
n106.out → n126.formula2
n129.out → n126.atom3
n122.out → n126.formula3
n115.out → n114.a
n126.out → n114.b
n98.out → n90.a
n114.out → n90.b
n28.out → n131.assertion
n132.out → n131.atom1
n20.out → n131.formula1
n133.out → n131.atom2
n101.out → n131.formula2
n90.out → n89.a
n131.out → n89.b
n20.out → n137.a
n101.out → n137.b
n63.out → n148.assertion
n149.out → n148.atom1
n7.out → n148.formula1
n150.out → n148.atom2
n70.out → n148.formula2
n16.out → n152.assertion
n70.out → n154.a
n7.out → n154.b
n137.out → n155.a
n154.out → n155.b
n153.out → n152.atom1
n155.out → n152.formula1
n156.out → n152.atom2
n70.out → n152.formula2
n148.out → n146.a
n152.out → n146.b
n28.out → n158.assertion
n159.out → n158.atom1
n70.out → n158.formula1
n160.out → n158.atom2
n137.out → n158.formula2
n161.out → n158.atom3
n154.out → n158.formula3
n146.out → n145.a
n158.out → n145.b
n89.out → n85.a
n145.out → n85.b
n28.out → n163.assertion
n164.out → n163.atom1
n70.out → n163.formula1
n165.out → n163.atom2
n70.out → n163.formula2
n166.out → n163.atom3
n7.out → n163.formula3
n85.out → n84.a
n163.out → n84.b
n82.out → n80.a
n84.out → n80.b
n16.out → n168.assertion
n169.out → n168.atom1
n154.out → n168.formula1
n170.out → n168.atom2
n21.out → n168.formula2
n80.out → n79.a
n168.out → n79.b
n28.out → n172.assertion
n173.out → n172.atom1
n21.out → n172.formula1
n174.out → n172.atom2
n70.out → n172.formula2
n175.out → n172.atom3
n7.out → n172.formula3
n79.out → n78.a
n172.out → n78.b
n39.out → n38.a
n78.out → n38.b
n16.out → n179.assertion
n180.out → n179.atom1
n7.out → n179.formula1
n181.out → n179.atom2
n9.out → n179.formula2
n16.out → n183.assertion
n9.out → n185.a
n7.out → n185.b
n7.out → n186.a
n185.out → n186.b
n184.out → n183.atom1
n186.out → n183.formula1
n187.out → n183.atom2
n21.out → n183.formula2
n179.out → n177.a
n183.out → n177.b
n28.out → n189.assertion
n190.out → n189.atom1
n21.out → n189.formula1
n191.out → n189.atom2
n185.out → n189.formula2
n177.out → n176.a
n189.out → n176.b
n38.out → n37.a
n176.out → n37.b
n16.out → n198.assertion
n199.out → n198.atom1
n7.out → n198.formula1
n200.out → n198.atom2
n6.out → n198.formula2
n16.out → n211.assertion
n212.out → n211.atom1
n7.out → n211.formula1
n9.out → n214.a
n214.out → n215.a
n213.out → n211.atom2
n215.out → n211.formula2
n215.out → n219.a
n7.out → n219.b
n16.out → n239.assertion
n240.out → n239.atom1
n215.out → n239.formula1
n241.out → n239.atom2
n214.out → n239.formula2
n214.out → n245.a
n215.out → n245.b
n63.out → n256.assertion
n257.out → n256.atom1
n9.out → n256.formula1
n258.out → n256.atom2
n214.out → n256.formula2
n16.out → n260.assertion
n214.out → n262.a
n9.out → n262.b
n245.out → n263.a
n262.out → n263.b
n261.out → n260.atom1
n263.out → n260.formula1
n264.out → n260.atom2
n215.out → n260.formula2
n256.out → n254.a
n260.out → n254.b
n28.out → n266.assertion
n267.out → n266.atom1
n215.out → n266.formula1
n268.out → n266.atom2
n245.out → n266.formula2
n269.out → n266.atom3
n262.out → n266.formula3
n254.out → n253.a
n266.out → n253.b
n239.out → n231.a
n253.out → n231.b
n3.out → n274.assertion
n275.out → n274.atom1
n262.out → n274.formula1
n16.out → n290.assertion
n291.out → n290.atom1
n214.out → n290.formula1
n262.out → n293.a
n293.out → n294.a
n292.out → n290.atom2
n294.out → n290.formula2
n294.out → n298.a
n214.out → n298.b
n63.out → n309.assertion
n310.out → n309.atom1
n293.out → n309.formula1
n311.out → n309.atom2
n9.out → n309.formula2
n16.out → n313.assertion
n9.out → n315.a
n293.out → n315.b
n298.out → n316.a
n315.out → n316.b
n314.out → n313.atom1
n316.out → n313.formula1
n317.out → n313.atom2
n214.out → n313.formula2
n309.out → n307.a
n313.out → n307.b
n28.out → n319.assertion
n320.out → n319.atom1
n214.out → n319.formula1
n321.out → n319.atom2
n298.out → n319.formula2
n322.out → n319.atom3
n315.out → n319.formula3
n307.out → n306.a
n319.out → n306.b
n290.out → n282.a
n306.out → n282.b
n28.out → n324.assertion
n325.out → n324.atom1
n214.out → n324.formula1
n326.out → n324.atom2
n9.out → n324.formula2
n327.out → n324.atom3
n293.out → n324.formula3
n282.out → n281.a
n324.out → n281.b
n214.out → n331.a
n293.out → n331.b
n63.out → n342.assertion
n343.out → n342.atom1
n9.out → n342.formula1
n344.out → n342.atom2
n262.out → n342.formula2
n16.out → n346.assertion
n262.out → n348.a
n9.out → n348.b
n331.out → n349.a
n348.out → n349.b
n347.out → n346.atom1
n349.out → n346.formula1
n350.out → n346.atom2
n262.out → n346.formula2
n342.out → n340.a
n346.out → n340.b
n28.out → n352.assertion
n353.out → n352.atom1
n262.out → n352.formula1
n354.out → n352.atom2
n331.out → n352.formula2
n355.out → n352.atom3
n348.out → n352.formula3
n340.out → n339.a
n352.out → n339.b
n281.out → n277.a
n339.out → n277.b
n28.out → n357.assertion
n358.out → n357.atom1
n262.out → n357.formula1
n359.out → n357.atom2
n262.out → n357.formula2
n360.out → n357.atom3
n9.out → n357.formula3
n277.out → n276.a
n357.out → n276.b
n274.out → n272.a
n276.out → n272.b
n16.out → n362.assertion
n363.out → n362.atom1
n348.out → n362.formula1
n364.out → n362.atom2
n215.out → n362.formula2
n272.out → n271.a
n362.out → n271.b
n28.out → n366.assertion
n367.out → n366.atom1
n215.out → n366.formula1
n368.out → n366.atom2
n262.out → n366.formula2
n369.out → n366.atom3
n9.out → n366.formula3
n271.out → n270.a
n366.out → n270.b
n231.out → n230.a
n270.out → n230.b
n16.out → n373.assertion
n374.out → n373.atom1
n9.out → n373.formula1
n16.out → n376.assertion
n7.out → n378.a
n9.out → n378.b
n9.out → n379.a
n378.out → n379.b
n377.out → n376.atom1
n379.out → n376.formula1
n380.out → n376.atom2
n215.out → n376.formula2
n373.out → n371.a
n376.out → n371.b
n28.out → n382.assertion
n383.out → n382.atom1
n215.out → n382.formula1
n384.out → n382.atom2
n9.out → n382.formula2
n385.out → n382.atom3
n378.out → n382.formula3
n371.out → n370.a
n382.out → n370.b
n230.out → n229.a
n370.out → n229.b
n28.out → n410.assertion
n411.out → n410.atom1
n215.out → n410.formula1
n412.out → n410.atom2
n9.out → n410.formula2
n229.out → n227.a
n410.out → n227.b
n16.out → n414.assertion
n215.out → n416.a
n9.out → n416.b
n219.out → n417.a
n416.out → n417.b
n415.out → n414.atom1
n417.out → n414.formula1
n227.out → n226.a
n414.out → n226.b
n28.out → n419.assertion
n420.out → n419.atom1
n7.out → n419.formula1
n421.out → n419.atom2
n219.out → n419.formula2
n422.out → n419.atom3
n416.out → n419.formula3
n226.out → n225.a
n419.out → n225.b
n211.out → n203.a
n225.out → n203.b
n63.out → n426.assertion
n427.out → n426.atom1
n214.out → n426.formula1
n428.out → n426.atom2
n8.out → n426.formula2
n16.out → n430.assertion
n8.out → n432.a
n214.out → n432.b
n416.out → n433.a
n432.out → n433.b
n431.out → n430.atom1
n433.out → n430.formula1
n426.out → n424.a
n430.out → n424.b
n28.out → n435.assertion
n436.out → n435.atom1
n7.out → n435.formula1
n437.out → n435.atom2
n416.out → n435.formula2
n438.out → n435.atom3
n432.out → n435.formula3
n424.out → n423.a
n435.out → n423.b
n203.out → n202.a
n423.out → n202.b
n28.out → n440.assertion
n441.out → n440.atom1
n7.out → n440.formula1
n442.out → n440.atom2
n8.out → n440.formula2
n443.out → n440.atom3
n214.out → n440.formula3
n202.out → n201.a
n440.out → n201.b
n198.out → n196.a
n201.out → n196.b
n16.out → n445.assertion
n7.out → n447.a
n214.out → n447.b
n446.out → n445.atom1
n447.out → n445.formula1
n448.out → n445.atom2
n9.out → n445.formula2
n196.out → n195.a
n445.out → n195.b
n28.out → n450.assertion
n451.out → n450.atom1
n9.out → n450.formula1
n452.out → n450.atom2
n214.out → n450.formula2
n195.out → n194.a
n450.out → n194.b
n16.out → n454.assertion
n9.out → n456.a
n214.out → n456.b
n185.out → n457.a
n456.out → n457.b
n455.out → n454.atom1
n457.out → n454.formula1
n458.out → n454.atom2
n21.out → n454.formula2
n194.out → n193.a
n454.out → n193.b
n28.out → n460.assertion
n461.out → n460.atom1
n21.out → n460.formula1
n462.out → n460.atom2
n185.out → n460.formula2
n463.out → n460.atom3
n456.out → n460.formula3
n193.out → n192.a
n460.out → n192.b
n37.out → n36.a
n192.out → n36.b
n28.out → n465.assertion
n466.out → n465.atom1
n21.out → n465.formula1
n467.out → n465.atom2
n9.out → n465.formula2
n468.out → n465.atom3
n214.out → n465.formula3
n36.out → n35.a
n465.out → n35.b
n16.out → n470.assertion
n21.out → n472.a
n214.out → n472.b
n25.out → n473.a
n472.out → n473.b
n471.out → n470.atom1
n473.out → n470.formula1
n474.out → n470.atom2
n9.out → n470.formula2
n35.out → n34.a
n470.out → n34.b
n28.out → n476.assertion
n477.out → n476.atom1
n9.out → n476.formula1
n478.out → n476.atom2
n25.out → n476.formula2
n479.out → n476.atom3
n472.out → n476.formula3
n34.out → n33.a
n476.out → n33.b
n17.out → n12.a
n33.out → n12.b
n63.out → n483.assertion
n484.out → n483.atom1
n20.out → n483.formula1
n485.out → n483.atom2
n9.out → n483.formula2
n16.out → n487.assertion
n9.out → n489.a
n20.out → n489.b
n472.out → n490.a
n489.out → n490.b
n488.out → n487.atom1
n490.out → n487.formula1
n491.out → n487.atom2
n9.out → n487.formula2
n483.out → n481.a
n487.out → n481.b
n28.out → n493.assertion
n494.out → n493.atom1
n9.out → n493.formula1
n495.out → n493.atom2
n472.out → n493.formula2
n496.out → n493.atom3
n489.out → n493.formula3
n481.out → n480.a
n493.out → n480.b
n12.out → n11.a
n480.out → n11.b
n28.out → n498.assertion
n499.out → n498.atom1
n9.out → n498.formula1
n500.out → n498.atom2
n9.out → n498.formula2
n501.out → n498.atom3
n20.out → n498.formula3
n11.out → n10.a
n498.out → n10.b
n4.out → n2.a
n10.out → n2.b
n16.out → n505.assertion
n506.out → n505.atom1
n20.out → n505.formula1
n507.out → n505.atom2
n6.out → n505.formula2
n16.out → n509.assertion
n6.out → n511.a
n20.out → n511.b
n20.out → n512.a
n511.out → n512.b
n510.out → n509.atom1
n512.out → n509.formula1
n513.out → n509.atom2
n9.out → n509.formula2
n505.out → n503.a
n509.out → n503.b
n28.out → n515.assertion
n516.out → n515.atom1
n9.out → n515.formula1
n517.out → n515.atom2
n20.out → n515.formula2
n518.out → n515.atom3
n511.out → n515.formula3
n503.out → n502.a
n515.out → n502.b
n2.out → n1.a
n502.out → n1.b
n1.out → n519.proof
```

</details>

### *07 · 否定的前件

- 目标：`⊢ ( ¬ ( P → Q ) → ( ¬ P → ¬ Q ) )`
- 提示：与上一关对称，用 A3 与双重否定。
- 参考解：319 个模块 / 554 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n520  [target]
n1  mp
n2  mp
n3  定理 *01
n4  subst(groups=0)
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  not
n10  mp
n11  mp
n12  mp
n16  axiom A1
n17  subst(groups=1)
n18  atom P
n19  atom Q
n20  not
n21  not
n25  imp
n28  axiom A2
n33  mp
n34  mp
n35  mp
n36  mp
n37  mp
n38  mp
n39  mp
n47  subst(groups=1)
n48  atom P
n49  atom Q
n53  imp
n61  mp
n62  mp
n63  axiom A3
n64  subst(groups=1)
n65  atom P
n66  atom Q
n68  subst(groups=1)
n69  atom P
n70  imp
n71  imp
n72  atom Q
n74  subst(groups=2)
n75  atom P
n76  atom Q
n77  atom R
n78  mp
n79  mp
n80  mp
n82  subst(groups=0)
n83  atom P
n84  mp
n85  mp
n89  mp
n90  mp
n98  subst(groups=1)
n99  atom P
n100  atom Q
n101  not
n102  not
n106  imp
n114  mp
n115  mp
n117  subst(groups=0)
n118  atom P
n120  subst(groups=1)
n121  atom P
n122  imp
n123  imp
n124  atom Q
n126  subst(groups=2)
n127  atom P
n128  atom Q
n129  atom R
n131  subst(groups=1)
n132  atom P
n133  atom R
n137  imp
n145  mp
n146  mp
n148  subst(groups=1)
n149  atom P
n150  atom Q
n152  subst(groups=1)
n153  atom P
n154  imp
n155  imp
n156  atom Q
n158  subst(groups=2)
n159  atom P
n160  atom Q
n161  atom R
n163  subst(groups=2)
n164  atom P
n165  atom Q
n166  atom R
n168  subst(groups=1)
n169  atom P
n170  atom Q
n172  subst(groups=2)
n173  atom P
n174  atom Q
n175  atom R
n176  mp
n177  mp
n179  subst(groups=1)
n180  atom P
n181  atom Q
n183  subst(groups=1)
n184  atom P
n185  imp
n186  imp
n187  atom Q
n189  subst(groups=1)
n190  atom P
n191  atom R
n192  mp
n193  mp
n194  mp
n195  mp
n196  mp
n198  subst(groups=1)
n199  atom P
n200  atom Q
n201  mp
n202  mp
n203  mp
n211  subst(groups=1)
n212  atom P
n213  atom Q
n214  not
n215  not
n219  imp
n225  mp
n226  mp
n227  mp
n229  mp
n230  mp
n231  mp
n239  subst(groups=1)
n240  atom P
n241  atom Q
n245  imp
n253  mp
n254  mp
n256  subst(groups=1)
n257  atom P
n258  atom Q
n260  subst(groups=1)
n261  atom P
n262  imp
n263  imp
n264  atom Q
n266  subst(groups=2)
n267  atom P
n268  atom Q
n269  atom R
n270  mp
n271  mp
n272  mp
n274  subst(groups=0)
n275  atom P
n276  mp
n277  mp
n281  mp
n282  mp
n290  subst(groups=1)
n291  atom P
n292  atom Q
n293  not
n294  not
n298  imp
n306  mp
n307  mp
n309  subst(groups=1)
n310  atom P
n311  atom Q
n313  subst(groups=1)
n314  atom P
n315  imp
n316  imp
n317  atom Q
n319  subst(groups=2)
n320  atom P
n321  atom Q
n322  atom R
n324  subst(groups=2)
n325  atom P
n326  atom Q
n327  atom R
n331  imp
n339  mp
n340  mp
n342  subst(groups=1)
n343  atom P
n344  atom Q
n346  subst(groups=1)
n347  atom P
n348  imp
n349  imp
n350  atom Q
n352  subst(groups=2)
n353  atom P
n354  atom Q
n355  atom R
n357  subst(groups=2)
n358  atom P
n359  atom Q
n360  atom R
n362  subst(groups=1)
n363  atom P
n364  atom Q
n366  subst(groups=2)
n367  atom P
n368  atom Q
n369  atom R
n370  mp
n371  mp
n373  subst(groups=0)
n374  atom P
n376  subst(groups=1)
n377  atom P
n378  imp
n379  imp
n380  atom Q
n382  subst(groups=2)
n383  atom P
n384  atom Q
n385  atom R
n410  subst(groups=1)
n411  atom P
n412  atom R
n414  subst(groups=0)
n415  atom P
n416  imp
n417  imp
n419  subst(groups=2)
n420  atom P
n421  atom Q
n422  atom R
n423  mp
n424  mp
n426  subst(groups=1)
n427  atom P
n428  atom Q
n430  subst(groups=0)
n431  atom P
n432  imp
n433  imp
n435  subst(groups=2)
n436  atom P
n437  atom Q
n438  atom R
n440  subst(groups=2)
n441  atom P
n442  atom Q
n443  atom R
n445  subst(groups=1)
n446  atom P
n447  imp
n448  atom Q
n450  subst(groups=1)
n451  atom P
n452  atom R
n454  subst(groups=1)
n455  atom P
n456  imp
n457  imp
n458  atom Q
n460  subst(groups=2)
n461  atom P
n462  atom Q
n463  atom R
n465  subst(groups=2)
n466  atom P
n467  atom Q
n468  atom R
n470  subst(groups=1)
n471  atom P
n472  imp
n473  imp
n474  atom Q
n476  subst(groups=2)
n477  atom P
n478  atom Q
n479  atom R
n480  mp
n481  mp
n483  subst(groups=1)
n484  atom P
n485  atom Q
n487  subst(groups=1)
n488  atom P
n489  imp
n490  imp
n491  atom Q
n493  subst(groups=2)
n494  atom P
n495  atom Q
n496  atom R
n498  subst(groups=2)
n499  atom P
n500  atom Q
n501  atom R
n502  mp
n503  mp
n505  subst(groups=1)
n506  atom P
n507  atom Q
n508  not
n510  subst(groups=1)
n511  atom P
n512  imp
n513  imp
n514  atom Q
n516  subst(groups=2)
n517  atom P
n518  atom Q
n519  atom R

接线：
n3.out → n4.assertion
n6.out → n8.a
n7.out → n8.b
n8.out → n9.a
n5.out → n4.atom1
n9.out → n4.formula1
n16.out → n17.assertion
n18.out → n17.atom1
n9.out → n17.formula1
n7.out → n20.a
n20.out → n21.a
n19.out → n17.atom2
n21.out → n17.formula2
n21.out → n25.a
n9.out → n25.b
n16.out → n47.assertion
n48.out → n47.atom1
n21.out → n47.formula1
n49.out → n47.atom2
n20.out → n47.formula2
n20.out → n53.a
n21.out → n53.b
n63.out → n64.assertion
n65.out → n64.atom1
n7.out → n64.formula1
n66.out → n64.atom2
n20.out → n64.formula2
n16.out → n68.assertion
n20.out → n70.a
n7.out → n70.b
n53.out → n71.a
n70.out → n71.b
n69.out → n68.atom1
n71.out → n68.formula1
n72.out → n68.atom2
n21.out → n68.formula2
n64.out → n62.a
n68.out → n62.b
n28.out → n74.assertion
n75.out → n74.atom1
n21.out → n74.formula1
n76.out → n74.atom2
n53.out → n74.formula2
n77.out → n74.atom3
n70.out → n74.formula3
n62.out → n61.a
n74.out → n61.b
n47.out → n39.a
n61.out → n39.b
n3.out → n82.assertion
n83.out → n82.atom1
n70.out → n82.formula1
n16.out → n98.assertion
n99.out → n98.atom1
n20.out → n98.formula1
n70.out → n101.a
n101.out → n102.a
n100.out → n98.atom2
n102.out → n98.formula2
n102.out → n106.a
n20.out → n106.b
n63.out → n117.assertion
n118.out → n117.atom1
n101.out → n117.formula1
n16.out → n120.assertion
n7.out → n122.a
n101.out → n122.b
n106.out → n123.a
n122.out → n123.b
n121.out → n120.atom1
n123.out → n120.formula1
n124.out → n120.atom2
n20.out → n120.formula2
n117.out → n115.a
n120.out → n115.b
n28.out → n126.assertion
n127.out → n126.atom1
n20.out → n126.formula1
n128.out → n126.atom2
n106.out → n126.formula2
n129.out → n126.atom3
n122.out → n126.formula3
n115.out → n114.a
n126.out → n114.b
n98.out → n90.a
n114.out → n90.b
n28.out → n131.assertion
n132.out → n131.atom1
n20.out → n131.formula1
n133.out → n131.atom2
n101.out → n131.formula2
n90.out → n89.a
n131.out → n89.b
n20.out → n137.a
n101.out → n137.b
n63.out → n148.assertion
n149.out → n148.atom1
n7.out → n148.formula1
n150.out → n148.atom2
n70.out → n148.formula2
n16.out → n152.assertion
n70.out → n154.a
n7.out → n154.b
n137.out → n155.a
n154.out → n155.b
n153.out → n152.atom1
n155.out → n152.formula1
n156.out → n152.atom2
n70.out → n152.formula2
n148.out → n146.a
n152.out → n146.b
n28.out → n158.assertion
n159.out → n158.atom1
n70.out → n158.formula1
n160.out → n158.atom2
n137.out → n158.formula2
n161.out → n158.atom3
n154.out → n158.formula3
n146.out → n145.a
n158.out → n145.b
n89.out → n85.a
n145.out → n85.b
n28.out → n163.assertion
n164.out → n163.atom1
n70.out → n163.formula1
n165.out → n163.atom2
n70.out → n163.formula2
n166.out → n163.atom3
n7.out → n163.formula3
n85.out → n84.a
n163.out → n84.b
n82.out → n80.a
n84.out → n80.b
n16.out → n168.assertion
n169.out → n168.atom1
n154.out → n168.formula1
n170.out → n168.atom2
n21.out → n168.formula2
n80.out → n79.a
n168.out → n79.b
n28.out → n172.assertion
n173.out → n172.atom1
n21.out → n172.formula1
n174.out → n172.atom2
n70.out → n172.formula2
n175.out → n172.atom3
n7.out → n172.formula3
n79.out → n78.a
n172.out → n78.b
n39.out → n38.a
n78.out → n38.b
n16.out → n179.assertion
n180.out → n179.atom1
n7.out → n179.formula1
n181.out → n179.atom2
n9.out → n179.formula2
n16.out → n183.assertion
n9.out → n185.a
n7.out → n185.b
n7.out → n186.a
n185.out → n186.b
n184.out → n183.atom1
n186.out → n183.formula1
n187.out → n183.atom2
n21.out → n183.formula2
n179.out → n177.a
n183.out → n177.b
n28.out → n189.assertion
n190.out → n189.atom1
n21.out → n189.formula1
n191.out → n189.atom2
n185.out → n189.formula2
n177.out → n176.a
n189.out → n176.b
n38.out → n37.a
n176.out → n37.b
n16.out → n198.assertion
n199.out → n198.atom1
n7.out → n198.formula1
n200.out → n198.atom2
n6.out → n198.formula2
n16.out → n211.assertion
n212.out → n211.atom1
n7.out → n211.formula1
n9.out → n214.a
n214.out → n215.a
n213.out → n211.atom2
n215.out → n211.formula2
n215.out → n219.a
n7.out → n219.b
n16.out → n239.assertion
n240.out → n239.atom1
n215.out → n239.formula1
n241.out → n239.atom2
n214.out → n239.formula2
n214.out → n245.a
n215.out → n245.b
n63.out → n256.assertion
n257.out → n256.atom1
n9.out → n256.formula1
n258.out → n256.atom2
n214.out → n256.formula2
n16.out → n260.assertion
n214.out → n262.a
n9.out → n262.b
n245.out → n263.a
n262.out → n263.b
n261.out → n260.atom1
n263.out → n260.formula1
n264.out → n260.atom2
n215.out → n260.formula2
n256.out → n254.a
n260.out → n254.b
n28.out → n266.assertion
n267.out → n266.atom1
n215.out → n266.formula1
n268.out → n266.atom2
n245.out → n266.formula2
n269.out → n266.atom3
n262.out → n266.formula3
n254.out → n253.a
n266.out → n253.b
n239.out → n231.a
n253.out → n231.b
n3.out → n274.assertion
n275.out → n274.atom1
n262.out → n274.formula1
n16.out → n290.assertion
n291.out → n290.atom1
n214.out → n290.formula1
n262.out → n293.a
n293.out → n294.a
n292.out → n290.atom2
n294.out → n290.formula2
n294.out → n298.a
n214.out → n298.b
n63.out → n309.assertion
n310.out → n309.atom1
n293.out → n309.formula1
n311.out → n309.atom2
n9.out → n309.formula2
n16.out → n313.assertion
n9.out → n315.a
n293.out → n315.b
n298.out → n316.a
n315.out → n316.b
n314.out → n313.atom1
n316.out → n313.formula1
n317.out → n313.atom2
n214.out → n313.formula2
n309.out → n307.a
n313.out → n307.b
n28.out → n319.assertion
n320.out → n319.atom1
n214.out → n319.formula1
n321.out → n319.atom2
n298.out → n319.formula2
n322.out → n319.atom3
n315.out → n319.formula3
n307.out → n306.a
n319.out → n306.b
n290.out → n282.a
n306.out → n282.b
n28.out → n324.assertion
n325.out → n324.atom1
n214.out → n324.formula1
n326.out → n324.atom2
n9.out → n324.formula2
n327.out → n324.atom3
n293.out → n324.formula3
n282.out → n281.a
n324.out → n281.b
n214.out → n331.a
n293.out → n331.b
n63.out → n342.assertion
n343.out → n342.atom1
n9.out → n342.formula1
n344.out → n342.atom2
n262.out → n342.formula2
n16.out → n346.assertion
n262.out → n348.a
n9.out → n348.b
n331.out → n349.a
n348.out → n349.b
n347.out → n346.atom1
n349.out → n346.formula1
n350.out → n346.atom2
n262.out → n346.formula2
n342.out → n340.a
n346.out → n340.b
n28.out → n352.assertion
n353.out → n352.atom1
n262.out → n352.formula1
n354.out → n352.atom2
n331.out → n352.formula2
n355.out → n352.atom3
n348.out → n352.formula3
n340.out → n339.a
n352.out → n339.b
n281.out → n277.a
n339.out → n277.b
n28.out → n357.assertion
n358.out → n357.atom1
n262.out → n357.formula1
n359.out → n357.atom2
n262.out → n357.formula2
n360.out → n357.atom3
n9.out → n357.formula3
n277.out → n276.a
n357.out → n276.b
n274.out → n272.a
n276.out → n272.b
n16.out → n362.assertion
n363.out → n362.atom1
n348.out → n362.formula1
n364.out → n362.atom2
n215.out → n362.formula2
n272.out → n271.a
n362.out → n271.b
n28.out → n366.assertion
n367.out → n366.atom1
n215.out → n366.formula1
n368.out → n366.atom2
n262.out → n366.formula2
n369.out → n366.atom3
n9.out → n366.formula3
n271.out → n270.a
n366.out → n270.b
n231.out → n230.a
n270.out → n230.b
n16.out → n373.assertion
n374.out → n373.atom1
n9.out → n373.formula1
n16.out → n376.assertion
n7.out → n378.a
n9.out → n378.b
n9.out → n379.a
n378.out → n379.b
n377.out → n376.atom1
n379.out → n376.formula1
n380.out → n376.atom2
n215.out → n376.formula2
n373.out → n371.a
n376.out → n371.b
n28.out → n382.assertion
n383.out → n382.atom1
n215.out → n382.formula1
n384.out → n382.atom2
n9.out → n382.formula2
n385.out → n382.atom3
n378.out → n382.formula3
n371.out → n370.a
n382.out → n370.b
n230.out → n229.a
n370.out → n229.b
n28.out → n410.assertion
n411.out → n410.atom1
n215.out → n410.formula1
n412.out → n410.atom2
n9.out → n410.formula2
n229.out → n227.a
n410.out → n227.b
n16.out → n414.assertion
n215.out → n416.a
n9.out → n416.b
n219.out → n417.a
n416.out → n417.b
n415.out → n414.atom1
n417.out → n414.formula1
n227.out → n226.a
n414.out → n226.b
n28.out → n419.assertion
n420.out → n419.atom1
n7.out → n419.formula1
n421.out → n419.atom2
n219.out → n419.formula2
n422.out → n419.atom3
n416.out → n419.formula3
n226.out → n225.a
n419.out → n225.b
n211.out → n203.a
n225.out → n203.b
n63.out → n426.assertion
n427.out → n426.atom1
n214.out → n426.formula1
n428.out → n426.atom2
n8.out → n426.formula2
n16.out → n430.assertion
n8.out → n432.a
n214.out → n432.b
n416.out → n433.a
n432.out → n433.b
n431.out → n430.atom1
n433.out → n430.formula1
n426.out → n424.a
n430.out → n424.b
n28.out → n435.assertion
n436.out → n435.atom1
n7.out → n435.formula1
n437.out → n435.atom2
n416.out → n435.formula2
n438.out → n435.atom3
n432.out → n435.formula3
n424.out → n423.a
n435.out → n423.b
n203.out → n202.a
n423.out → n202.b
n28.out → n440.assertion
n441.out → n440.atom1
n7.out → n440.formula1
n442.out → n440.atom2
n8.out → n440.formula2
n443.out → n440.atom3
n214.out → n440.formula3
n202.out → n201.a
n440.out → n201.b
n198.out → n196.a
n201.out → n196.b
n16.out → n445.assertion
n7.out → n447.a
n214.out → n447.b
n446.out → n445.atom1
n447.out → n445.formula1
n448.out → n445.atom2
n9.out → n445.formula2
n196.out → n195.a
n445.out → n195.b
n28.out → n450.assertion
n451.out → n450.atom1
n9.out → n450.formula1
n452.out → n450.atom2
n214.out → n450.formula2
n195.out → n194.a
n450.out → n194.b
n16.out → n454.assertion
n9.out → n456.a
n214.out → n456.b
n185.out → n457.a
n456.out → n457.b
n455.out → n454.atom1
n457.out → n454.formula1
n458.out → n454.atom2
n21.out → n454.formula2
n194.out → n193.a
n454.out → n193.b
n28.out → n460.assertion
n461.out → n460.atom1
n21.out → n460.formula1
n462.out → n460.atom2
n185.out → n460.formula2
n463.out → n460.atom3
n456.out → n460.formula3
n193.out → n192.a
n460.out → n192.b
n37.out → n36.a
n192.out → n36.b
n28.out → n465.assertion
n466.out → n465.atom1
n21.out → n465.formula1
n467.out → n465.atom2
n9.out → n465.formula2
n468.out → n465.atom3
n214.out → n465.formula3
n36.out → n35.a
n465.out → n35.b
n16.out → n470.assertion
n21.out → n472.a
n214.out → n472.b
n25.out → n473.a
n472.out → n473.b
n471.out → n470.atom1
n473.out → n470.formula1
n474.out → n470.atom2
n9.out → n470.formula2
n35.out → n34.a
n470.out → n34.b
n28.out → n476.assertion
n477.out → n476.atom1
n9.out → n476.formula1
n478.out → n476.atom2
n25.out → n476.formula2
n479.out → n476.atom3
n472.out → n476.formula3
n34.out → n33.a
n476.out → n33.b
n17.out → n12.a
n33.out → n12.b
n63.out → n483.assertion
n484.out → n483.atom1
n20.out → n483.formula1
n485.out → n483.atom2
n9.out → n483.formula2
n16.out → n487.assertion
n9.out → n489.a
n20.out → n489.b
n472.out → n490.a
n489.out → n490.b
n488.out → n487.atom1
n490.out → n487.formula1
n491.out → n487.atom2
n9.out → n487.formula2
n483.out → n481.a
n487.out → n481.b
n28.out → n493.assertion
n494.out → n493.atom1
n9.out → n493.formula1
n495.out → n493.atom2
n472.out → n493.formula2
n496.out → n493.atom3
n489.out → n493.formula3
n481.out → n480.a
n493.out → n480.b
n12.out → n11.a
n480.out → n11.b
n28.out → n498.assertion
n499.out → n498.atom1
n9.out → n498.formula1
n500.out → n498.atom2
n9.out → n498.formula2
n501.out → n498.atom3
n20.out → n498.formula3
n11.out → n10.a
n498.out → n10.b
n4.out → n2.a
n10.out → n2.b
n16.out → n505.assertion
n506.out → n505.atom1
n20.out → n505.formula1
n6.out → n508.a
n507.out → n505.atom2
n508.out → n505.formula2
n16.out → n510.assertion
n508.out → n512.a
n20.out → n512.b
n20.out → n513.a
n512.out → n513.b
n511.out → n510.atom1
n513.out → n510.formula1
n514.out → n510.atom2
n9.out → n510.formula2
n505.out → n503.a
n510.out → n503.b
n28.out → n516.assertion
n517.out → n516.atom1
n9.out → n516.formula1
n518.out → n516.atom2
n20.out → n516.formula2
n519.out → n516.atom3
n512.out → n516.formula3
n503.out → n502.a
n516.out → n502.b
n2.out → n1.a
n502.out → n1.b
n1.out → n520.proof
```

</details>

### *08 · 前件重排

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( Q → ( P → R ) ) )`
- 提示：用 A2 把前件换位，再接 A1。
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
n31.out → n32.assertion
n33.out → n32.atom1
n7.out → n32.formula1
n34.out → n32.atom2
n8.out → n32.formula2
n13.out → n36.assertion
n9.out → n38.a
n8.out → n38.b
n7.out → n39.a
n38.out → n39.b
n37.out → n36.atom1
n39.out → n36.formula1
n40.out → n36.atom2
n10.out → n36.formula2
n32.out → n30.a
n36.out → n30.b
n45.out → n46.assertion
n47.out → n46.atom1
n9.out → n46.formula1
n48.out → n46.atom2
n8.out → n46.formula2
n49.out → n46.atom3
n6.out → n46.formula3
n13.out → n51.assertion
n6.out → n53.a
n8.out → n53.b
n10.out → n54.a
n53.out → n54.b
n38.out → n55.a
n54.out → n55.b
n52.out → n51.atom1
n55.out → n51.formula1
n46.out → n44.a
n51.out → n44.b
n22.out → n57.assertion
n58.out → n57.atom1
n7.out → n57.formula1
n59.out → n57.atom2
n38.out → n57.formula2
n60.out → n57.atom3
n54.out → n57.formula3
n44.out → n43.a
n57.out → n43.b
n13.out → n62.assertion
n7.out → n64.a
n54.out → n64.b
n39.out → n65.a
n64.out → n65.b
n63.out → n62.atom1
n65.out → n62.formula1
n66.out → n62.atom2
n10.out → n62.formula2
n43.out → n42.a
n62.out → n42.b
n22.out → n68.assertion
n69.out → n68.atom1
n10.out → n68.formula1
n70.out → n68.atom2
n39.out → n68.formula2
n71.out → n68.atom3
n64.out → n68.formula3
n42.out → n41.a
n68.out → n41.b
n30.out → n29.a
n41.out → n29.b
n22.out → n75.assertion
n76.out → n75.atom1
n7.out → n75.formula1
n77.out → n75.atom2
n10.out → n75.formula2
n78.out → n75.atom3
n53.out → n75.formula3
n13.out → n80.assertion
n7.out → n82.a
n53.out → n82.b
n19.out → n83.a
n82.out → n83.b
n64.out → n84.a
n83.out → n84.b
n81.out → n80.atom1
n84.out → n80.formula1
n85.out → n80.atom2
n10.out → n80.formula2
n75.out → n73.a
n80.out → n73.b
n22.out → n87.assertion
n88.out → n87.atom1
n10.out → n87.formula1
n89.out → n87.atom2
n64.out → n87.formula2
n90.out → n87.atom3
n83.out → n87.formula3
n73.out → n72.a
n87.out → n72.b
n29.out → n28.a
n72.out → n28.b
n22.out → n92.assertion
n93.out → n92.atom1
n10.out → n92.formula1
n94.out → n92.atom2
n19.out → n92.formula2
n95.out → n92.atom3
n82.out → n92.formula3
n28.out → n27.a
n92.out → n27.b
n14.out → n1.a
n27.out → n1.b
n1.out → n96.proof
```

</details>

### *09 · 逆否命题

- 目标：`⊢ ( ( P → Q ) → ( ¬ Q → ¬ P ) )`
- 提示：A3 给出 (¬B→¬A)→(A→B)，再用前件重排。
- 参考解：310 个模块 / 538 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n510  [target]
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
n35  mp
n36  mp
n44  subst(groups=1)
n45  atom P
n46  atom Q
n50  imp
n58  mp
n59  mp
n60  axiom A3
n61  subst(groups=0)
n62  atom Q
n64  subst(groups=1)
n65  atom P
n66  imp
n67  imp
n68  atom Q
n70  subst(groups=2)
n71  atom P
n72  atom Q
n73  atom R
n74  mp
n75  mp
n76  mp
n78  subst(groups=0)
n79  atom P
n80  mp
n81  mp
n85  mp
n86  mp
n94  subst(groups=1)
n95  atom P
n96  atom Q
n97  not
n98  not
n102  imp
n110  mp
n111  mp
n113  subst(groups=1)
n114  atom P
n115  atom Q
n117  subst(groups=1)
n118  atom P
n119  imp
n120  imp
n121  atom Q
n123  subst(groups=2)
n124  atom P
n125  atom Q
n126  atom R
n128  subst(groups=2)
n129  atom P
n130  atom Q
n131  atom R
n135  imp
n143  mp
n144  mp
n146  subst(groups=0)
n147  atom Q
n149  subst(groups=1)
n150  atom P
n151  imp
n152  imp
n153  atom Q
n155  subst(groups=2)
n156  atom P
n157  atom Q
n158  atom R
n160  subst(groups=2)
n161  atom P
n162  atom Q
n163  atom R
n165  subst(groups=1)
n166  atom P
n167  atom Q
n169  subst(groups=2)
n170  atom P
n171  atom Q
n172  atom R
n173  mp
n174  mp
n176  subst(groups=0)
n177  atom Q
n179  subst(groups=1)
n180  atom P
n181  imp
n182  imp
n183  atom Q
n185  subst(groups=2)
n186  atom P
n187  atom Q
n188  atom R
n189  mp
n190  mp
n191  mp
n193  subst(groups=2)
n194  atom P
n195  atom Q
n196  atom R
n198  subst(groups=1)
n199  atom P
n200  imp
n201  imp
n202  atom Q
n204  subst(groups=2)
n205  atom P
n206  atom Q
n207  atom R
n209  subst(groups=2)
n210  atom P
n211  atom Q
n212  atom R
n214  subst(groups=1)
n215  atom P
n216  imp
n217  imp
n218  atom Q
n220  subst(groups=2)
n221  atom P
n222  atom Q
n223  atom R
n224  mp
n225  mp
n226  mp
n227  mp
n228  mp
n230  subst(groups=0)
n231  atom P
n232  mp
n233  mp
n234  mp
n239  subst(groups=1)
n240  atom P
n241  atom Q
n242  not
n243  not
n244  not
n248  imp
n254  mp
n255  mp
n256  mp
n258  mp
n259  mp
n260  mp
n268  subst(groups=1)
n269  atom P
n270  atom Q
n274  imp
n282  mp
n283  mp
n285  subst(groups=1)
n286  atom P
n287  atom Q
n289  subst(groups=1)
n290  atom P
n291  imp
n292  imp
n293  atom Q
n295  subst(groups=2)
n296  atom P
n297  atom Q
n298  atom R
n299  mp
n300  mp
n301  mp
n303  subst(groups=0)
n304  atom P
n305  mp
n306  mp
n310  mp
n311  mp
n319  subst(groups=1)
n320  atom P
n321  atom Q
n322  not
n323  not
n327  imp
n335  mp
n336  mp
n338  subst(groups=1)
n339  atom P
n340  atom Q
n342  subst(groups=1)
n343  atom P
n344  imp
n345  imp
n346  atom Q
n348  subst(groups=2)
n349  atom P
n350  atom Q
n351  atom R
n353  subst(groups=2)
n354  atom P
n355  atom Q
n356  atom R
n360  imp
n368  mp
n369  mp
n371  subst(groups=1)
n372  atom P
n373  atom Q
n375  subst(groups=1)
n376  atom P
n377  imp
n378  imp
n379  atom Q
n381  subst(groups=2)
n382  atom P
n383  atom Q
n384  atom R
n386  subst(groups=2)
n387  atom P
n388  atom Q
n389  atom R
n391  subst(groups=1)
n392  atom P
n393  atom Q
n395  subst(groups=2)
n396  atom P
n397  atom Q
n398  atom R
n399  mp
n400  mp
n402  subst(groups=0)
n403  atom P
n405  subst(groups=1)
n406  atom P
n407  imp
n408  imp
n409  atom Q
n411  subst(groups=2)
n412  atom P
n413  atom Q
n414  atom R
n442  subst(groups=1)
n443  atom P
n444  atom R
n446  subst(groups=0)
n447  atom P
n448  imp
n449  imp
n451  subst(groups=2)
n452  atom P
n453  atom Q
n454  atom R
n455  mp
n456  mp
n458  subst(groups=0)
n459  atom P
n461  subst(groups=0)
n462  atom P
n463  imp
n464  imp
n466  subst(groups=2)
n467  atom P
n468  atom Q
n469  atom R
n471  subst(groups=1)
n472  atom P
n473  atom R
n475  subst(groups=1)
n476  atom P
n477  atom Q
n479  subst(groups=1)
n480  atom P
n481  atom R
n483  subst(groups=1)
n484  atom P
n485  imp
n486  imp
n487  atom Q
n489  subst(groups=2)
n490  atom P
n491  atom Q
n492  atom R
n493  mp
n494  mp
n496  subst(groups=1)
n497  atom P
n498  atom Q
n500  subst(groups=1)
n501  atom P
n502  imp
n503  imp
n504  atom Q
n506  subst(groups=2)
n507  atom P
n508  atom Q
n509  atom R

接线：
n5.out → n6.assertion
n8.out → n10.a
n9.out → n10.b
n7.out → n6.atom1
n10.out → n6.formula1
n13.out → n14.assertion
n15.out → n14.atom1
n10.out → n14.formula1
n8.out → n17.a
n17.out → n18.a
n16.out → n14.atom2
n18.out → n14.formula2
n18.out → n22.a
n10.out → n22.b
n13.out → n44.assertion
n45.out → n44.atom1
n18.out → n44.formula1
n46.out → n44.atom2
n17.out → n44.formula2
n17.out → n50.a
n18.out → n50.b
n60.out → n61.assertion
n62.out → n61.atom1
n17.out → n61.formula1
n13.out → n64.assertion
n17.out → n66.a
n8.out → n66.b
n50.out → n67.a
n66.out → n67.b
n65.out → n64.atom1
n67.out → n64.formula1
n68.out → n64.atom2
n18.out → n64.formula2
n61.out → n59.a
n64.out → n59.b
n25.out → n70.assertion
n71.out → n70.atom1
n18.out → n70.formula1
n72.out → n70.atom2
n50.out → n70.formula2
n73.out → n70.atom3
n66.out → n70.formula3
n59.out → n58.a
n70.out → n58.b
n44.out → n36.a
n58.out → n36.b
n5.out → n78.assertion
n79.out → n78.atom1
n66.out → n78.formula1
n13.out → n94.assertion
n95.out → n94.atom1
n17.out → n94.formula1
n66.out → n97.a
n97.out → n98.a
n96.out → n94.atom2
n98.out → n94.formula2
n98.out → n102.a
n17.out → n102.b
n60.out → n113.assertion
n114.out → n113.atom1
n97.out → n113.formula1
n115.out → n113.atom2
n8.out → n113.formula2
n13.out → n117.assertion
n8.out → n119.a
n97.out → n119.b
n102.out → n120.a
n119.out → n120.b
n118.out → n117.atom1
n120.out → n117.formula1
n121.out → n117.atom2
n17.out → n117.formula2
n113.out → n111.a
n117.out → n111.b
n25.out → n123.assertion
n124.out → n123.atom1
n17.out → n123.formula1
n125.out → n123.atom2
n102.out → n123.formula2
n126.out → n123.atom3
n119.out → n123.formula3
n111.out → n110.a
n123.out → n110.b
n94.out → n86.a
n110.out → n86.b
n25.out → n128.assertion
n129.out → n128.atom1
n17.out → n128.formula1
n130.out → n128.atom2
n8.out → n128.formula2
n131.out → n128.atom3
n97.out → n128.formula3
n86.out → n85.a
n128.out → n85.b
n17.out → n135.a
n97.out → n135.b
n60.out → n146.assertion
n147.out → n146.atom1
n66.out → n146.formula1
n13.out → n149.assertion
n66.out → n151.a
n8.out → n151.b
n135.out → n152.a
n151.out → n152.b
n150.out → n149.atom1
n152.out → n149.formula1
n153.out → n149.atom2
n66.out → n149.formula2
n146.out → n144.a
n149.out → n144.b
n25.out → n155.assertion
n156.out → n155.atom1
n66.out → n155.formula1
n157.out → n155.atom2
n135.out → n155.formula2
n158.out → n155.atom3
n151.out → n155.formula3
n144.out → n143.a
n155.out → n143.b
n85.out → n81.a
n143.out → n81.b
n25.out → n160.assertion
n161.out → n160.atom1
n66.out → n160.formula1
n162.out → n160.atom2
n66.out → n160.formula2
n163.out → n160.atom3
n8.out → n160.formula3
n81.out → n80.a
n160.out → n80.b
n78.out → n76.a
n80.out → n76.b
n13.out → n165.assertion
n166.out → n165.atom1
n151.out → n165.formula1
n167.out → n165.atom2
n18.out → n165.formula2
n76.out → n75.a
n165.out → n75.b
n25.out → n169.assertion
n170.out → n169.atom1
n18.out → n169.formula1
n171.out → n169.atom2
n66.out → n169.formula2
n172.out → n169.atom3
n8.out → n169.formula3
n75.out → n74.a
n169.out → n74.b
n36.out → n35.a
n74.out → n35.b
n13.out → n176.assertion
n177.out → n176.atom1
n10.out → n176.formula1
n13.out → n179.assertion
n10.out → n181.a
n8.out → n181.b
n8.out → n182.a
n181.out → n182.b
n180.out → n179.atom1
n182.out → n179.formula1
n183.out → n179.atom2
n18.out → n179.formula2
n176.out → n174.a
n179.out → n174.b
n25.out → n185.assertion
n186.out → n185.atom1
n18.out → n185.formula1
n187.out → n185.atom2
n8.out → n185.formula2
n188.out → n185.atom3
n181.out → n185.formula3
n174.out → n173.a
n185.out → n173.b
n35.out → n34.a
n173.out → n34.b
n25.out → n193.assertion
n194.out → n193.atom1
n10.out → n193.formula1
n195.out → n193.atom2
n8.out → n193.formula2
n196.out → n193.atom3
n9.out → n193.formula3
n6.out → n191.a
n193.out → n191.b
n13.out → n198.assertion
n10.out → n200.a
n9.out → n200.b
n181.out → n201.a
n200.out → n201.b
n199.out → n198.atom1
n201.out → n198.formula1
n202.out → n198.atom2
n18.out → n198.formula2
n191.out → n190.a
n198.out → n190.b
n25.out → n204.assertion
n205.out → n204.atom1
n18.out → n204.formula1
n206.out → n204.atom2
n181.out → n204.formula2
n207.out → n204.atom3
n200.out → n204.formula3
n190.out → n189.a
n204.out → n189.b
n34.out → n33.a
n189.out → n33.b
n25.out → n209.assertion
n210.out → n209.atom1
n18.out → n209.formula1
n211.out → n209.atom2
n10.out → n209.formula2
n212.out → n209.atom3
n9.out → n209.formula3
n33.out → n32.a
n209.out → n32.b
n13.out → n214.assertion
n18.out → n216.a
n9.out → n216.b
n22.out → n217.a
n216.out → n217.b
n215.out → n214.atom1
n217.out → n214.formula1
n218.out → n214.atom2
n10.out → n214.formula2
n32.out → n31.a
n214.out → n31.b
n25.out → n220.assertion
n221.out → n220.atom1
n10.out → n220.formula1
n222.out → n220.atom2
n22.out → n220.formula2
n223.out → n220.atom3
n216.out → n220.formula3
n31.out → n30.a
n220.out → n30.b
n14.out → n3.a
n30.out → n3.b
n5.out → n230.assertion
n231.out → n230.atom1
n9.out → n230.formula1
n13.out → n239.assertion
n240.out → n239.atom1
n9.out → n239.formula1
n9.out → n242.a
n242.out → n243.a
n243.out → n244.a
n241.out → n239.atom2
n244.out → n239.formula2
n244.out → n248.a
n9.out → n248.b
n13.out → n268.assertion
n269.out → n268.atom1
n244.out → n268.formula1
n270.out → n268.atom2
n243.out → n268.formula2
n243.out → n274.a
n244.out → n274.b
n60.out → n285.assertion
n286.out → n285.atom1
n242.out → n285.formula1
n287.out → n285.atom2
n243.out → n285.formula2
n13.out → n289.assertion
n243.out → n291.a
n242.out → n291.b
n274.out → n292.a
n291.out → n292.b
n290.out → n289.atom1
n292.out → n289.formula1
n293.out → n289.atom2
n244.out → n289.formula2
n285.out → n283.a
n289.out → n283.b
n25.out → n295.assertion
n296.out → n295.atom1
n244.out → n295.formula1
n297.out → n295.atom2
n274.out → n295.formula2
n298.out → n295.atom3
n291.out → n295.formula3
n283.out → n282.a
n295.out → n282.b
n268.out → n260.a
n282.out → n260.b
n5.out → n303.assertion
n304.out → n303.atom1
n291.out → n303.formula1
n13.out → n319.assertion
n320.out → n319.atom1
n243.out → n319.formula1
n291.out → n322.a
n322.out → n323.a
n321.out → n319.atom2
n323.out → n319.formula2
n323.out → n327.a
n243.out → n327.b
n60.out → n338.assertion
n339.out → n338.atom1
n322.out → n338.formula1
n340.out → n338.atom2
n242.out → n338.formula2
n13.out → n342.assertion
n242.out → n344.a
n322.out → n344.b
n327.out → n345.a
n344.out → n345.b
n343.out → n342.atom1
n345.out → n342.formula1
n346.out → n342.atom2
n243.out → n342.formula2
n338.out → n336.a
n342.out → n336.b
n25.out → n348.assertion
n349.out → n348.atom1
n243.out → n348.formula1
n350.out → n348.atom2
n327.out → n348.formula2
n351.out → n348.atom3
n344.out → n348.formula3
n336.out → n335.a
n348.out → n335.b
n319.out → n311.a
n335.out → n311.b
n25.out → n353.assertion
n354.out → n353.atom1
n243.out → n353.formula1
n355.out → n353.atom2
n242.out → n353.formula2
n356.out → n353.atom3
n322.out → n353.formula3
n311.out → n310.a
n353.out → n310.b
n243.out → n360.a
n322.out → n360.b
n60.out → n371.assertion
n372.out → n371.atom1
n242.out → n371.formula1
n373.out → n371.atom2
n291.out → n371.formula2
n13.out → n375.assertion
n291.out → n377.a
n242.out → n377.b
n360.out → n378.a
n377.out → n378.b
n376.out → n375.atom1
n378.out → n375.formula1
n379.out → n375.atom2
n291.out → n375.formula2
n371.out → n369.a
n375.out → n369.b
n25.out → n381.assertion
n382.out → n381.atom1
n291.out → n381.formula1
n383.out → n381.atom2
n360.out → n381.formula2
n384.out → n381.atom3
n377.out → n381.formula3
n369.out → n368.a
n381.out → n368.b
n310.out → n306.a
n368.out → n306.b
n25.out → n386.assertion
n387.out → n386.atom1
n291.out → n386.formula1
n388.out → n386.atom2
n291.out → n386.formula2
n389.out → n386.atom3
n242.out → n386.formula3
n306.out → n305.a
n386.out → n305.b
n303.out → n301.a
n305.out → n301.b
n13.out → n391.assertion
n392.out → n391.atom1
n377.out → n391.formula1
n393.out → n391.atom2
n244.out → n391.formula2
n301.out → n300.a
n391.out → n300.b
n25.out → n395.assertion
n396.out → n395.atom1
n244.out → n395.formula1
n397.out → n395.atom2
n291.out → n395.formula2
n398.out → n395.atom3
n242.out → n395.formula3
n300.out → n299.a
n395.out → n299.b
n260.out → n259.a
n299.out → n259.b
n13.out → n402.assertion
n403.out → n402.atom1
n242.out → n402.formula1
n13.out → n405.assertion
n9.out → n407.a
n242.out → n407.b
n242.out → n408.a
n407.out → n408.b
n406.out → n405.atom1
n408.out → n405.formula1
n409.out → n405.atom2
n244.out → n405.formula2
n402.out → n400.a
n405.out → n400.b
n25.out → n411.assertion
n412.out → n411.atom1
n244.out → n411.formula1
n413.out → n411.atom2
n242.out → n411.formula2
n414.out → n411.atom3
n407.out → n411.formula3
n400.out → n399.a
n411.out → n399.b
n259.out → n258.a
n399.out → n258.b
n25.out → n442.assertion
n443.out → n442.atom1
n244.out → n442.formula1
n444.out → n442.atom2
n242.out → n442.formula2
n258.out → n256.a
n442.out → n256.b
n13.out → n446.assertion
n244.out → n448.a
n242.out → n448.b
n248.out → n449.a
n448.out → n449.b
n447.out → n446.atom1
n449.out → n446.formula1
n256.out → n255.a
n446.out → n255.b
n25.out → n451.assertion
n452.out → n451.atom1
n9.out → n451.formula1
n453.out → n451.atom2
n248.out → n451.formula2
n454.out → n451.atom3
n448.out → n451.formula3
n255.out → n254.a
n451.out → n254.b
n239.out → n234.a
n254.out → n234.b
n60.out → n458.assertion
n459.out → n458.atom1
n243.out → n458.formula1
n13.out → n461.assertion
n9.out → n463.a
n243.out → n463.b
n448.out → n464.a
n463.out → n464.b
n462.out → n461.atom1
n464.out → n461.formula1
n458.out → n456.a
n461.out → n456.b
n25.out → n466.assertion
n467.out → n466.atom1
n9.out → n466.formula1
n468.out → n466.atom2
n448.out → n466.formula2
n469.out → n466.atom3
n463.out → n466.formula3
n456.out → n455.a
n466.out → n455.b
n234.out → n233.a
n455.out → n233.b
n25.out → n471.assertion
n472.out → n471.atom1
n9.out → n471.formula1
n473.out → n471.atom2
n243.out → n471.formula2
n233.out → n232.a
n471.out → n232.b
n230.out → n228.a
n232.out → n228.b
n13.out → n475.assertion
n476.out → n475.atom1
n463.out → n475.formula1
n477.out → n475.atom2
n18.out → n475.formula2
n228.out → n227.a
n475.out → n227.b
n25.out → n479.assertion
n480.out → n479.atom1
n18.out → n479.formula1
n481.out → n479.atom2
n243.out → n479.formula2
n227.out → n226.a
n479.out → n226.b
n13.out → n483.assertion
n18.out → n485.a
n243.out → n485.b
n216.out → n486.a
n485.out → n486.b
n484.out → n483.atom1
n486.out → n483.formula1
n487.out → n483.atom2
n10.out → n483.formula2
n226.out → n225.a
n483.out → n225.b
n25.out → n489.assertion
n490.out → n489.atom1
n10.out → n489.formula1
n491.out → n489.atom2
n216.out → n489.formula2
n492.out → n489.atom3
n485.out → n489.formula3
n225.out → n224.a
n489.out → n224.b
n3.out → n2.a
n224.out → n2.b
n60.out → n496.assertion
n497.out → n496.atom1
n17.out → n496.formula1
n498.out → n496.atom2
n242.out → n496.formula2
n13.out → n500.assertion
n242.out → n502.a
n17.out → n502.b
n485.out → n503.a
n502.out → n503.b
n501.out → n500.atom1
n503.out → n500.formula1
n504.out → n500.atom2
n10.out → n500.formula2
n496.out → n494.a
n500.out → n494.b
n25.out → n506.assertion
n507.out → n506.atom1
n10.out → n506.formula1
n508.out → n506.atom2
n485.out → n506.formula2
n509.out → n506.atom3
n502.out → n506.formula3
n494.out → n493.a
n506.out → n493.b
n2.out → n1.a
n493.out → n1.b
n1.out → n510.proof
```

</details>

### *10 · 逆否（否定后件）

- 目标：`⊢ ( ( P → ¬ Q ) → ( Q → ¬ P ) )`
- 提示：把 B→¬A 写成 B→(A→¬A) 的形状，用 A3。
- 参考解：155 个模块 / 264 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n240  [target]
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
n35  mp
n36  mp
n44  subst(groups=1)
n45  atom P
n46  atom Q
n50  imp
n58  mp
n59  mp
n60  axiom A3
n61  subst(groups=0)
n62  atom Q
n64  subst(groups=1)
n65  atom P
n66  imp
n67  imp
n68  atom Q
n70  subst(groups=2)
n71  atom P
n72  atom Q
n73  atom R
n74  mp
n75  mp
n76  mp
n78  subst(groups=0)
n79  atom P
n80  mp
n81  mp
n85  mp
n86  mp
n94  subst(groups=1)
n95  atom P
n96  atom Q
n97  not
n98  not
n102  imp
n110  mp
n111  mp
n113  subst(groups=1)
n114  atom P
n115  atom Q
n117  subst(groups=1)
n118  atom P
n119  imp
n120  imp
n121  atom Q
n123  subst(groups=2)
n124  atom P
n125  atom Q
n126  atom R
n128  subst(groups=2)
n129  atom P
n130  atom Q
n131  atom R
n135  imp
n143  mp
n144  mp
n146  subst(groups=0)
n147  atom Q
n149  subst(groups=1)
n150  atom P
n151  imp
n152  imp
n153  atom Q
n155  subst(groups=2)
n156  atom P
n157  atom Q
n158  atom R
n160  subst(groups=2)
n161  atom P
n162  atom Q
n163  atom R
n165  subst(groups=1)
n166  atom P
n167  atom Q
n169  subst(groups=2)
n170  atom P
n171  atom Q
n172  atom R
n173  mp
n174  mp
n176  subst(groups=0)
n177  atom Q
n179  subst(groups=1)
n180  atom P
n181  imp
n182  imp
n183  atom Q
n185  subst(groups=2)
n186  atom P
n187  atom Q
n188  atom R
n189  mp
n190  mp
n191  mp
n193  subst(groups=2)
n194  atom P
n195  atom Q
n196  atom R
n198  subst(groups=1)
n199  atom P
n200  imp
n201  imp
n202  atom Q
n204  subst(groups=2)
n205  atom P
n206  atom Q
n207  atom R
n209  subst(groups=2)
n210  atom P
n211  atom Q
n212  atom R
n214  subst(groups=1)
n215  atom P
n216  imp
n217  imp
n218  atom Q
n220  subst(groups=2)
n221  atom P
n222  atom Q
n223  atom R
n224  mp
n225  mp
n227  subst(groups=0)
n228  atom P
n230  subst(groups=1)
n231  atom P
n232  imp
n233  imp
n234  atom Q
n236  subst(groups=2)
n237  atom P
n238  atom Q
n239  atom R

接线：
n4.out → n5.assertion
n8.out → n9.a
n7.out → n10.a
n9.out → n10.b
n6.out → n5.atom1
n10.out → n5.formula1
n13.out → n14.assertion
n15.out → n14.atom1
n10.out → n14.formula1
n7.out → n17.a
n17.out → n18.a
n16.out → n14.atom2
n18.out → n14.formula2
n18.out → n22.a
n10.out → n22.b
n13.out → n44.assertion
n45.out → n44.atom1
n18.out → n44.formula1
n46.out → n44.atom2
n17.out → n44.formula2
n17.out → n50.a
n18.out → n50.b
n60.out → n61.assertion
n62.out → n61.atom1
n17.out → n61.formula1
n13.out → n64.assertion
n17.out → n66.a
n7.out → n66.b
n50.out → n67.a
n66.out → n67.b
n65.out → n64.atom1
n67.out → n64.formula1
n68.out → n64.atom2
n18.out → n64.formula2
n61.out → n59.a
n64.out → n59.b
n25.out → n70.assertion
n71.out → n70.atom1
n18.out → n70.formula1
n72.out → n70.atom2
n50.out → n70.formula2
n73.out → n70.atom3
n66.out → n70.formula3
n59.out → n58.a
n70.out → n58.b
n44.out → n36.a
n58.out → n36.b
n4.out → n78.assertion
n79.out → n78.atom1
n66.out → n78.formula1
n13.out → n94.assertion
n95.out → n94.atom1
n17.out → n94.formula1
n66.out → n97.a
n97.out → n98.a
n96.out → n94.atom2
n98.out → n94.formula2
n98.out → n102.a
n17.out → n102.b
n60.out → n113.assertion
n114.out → n113.atom1
n97.out → n113.formula1
n115.out → n113.atom2
n7.out → n113.formula2
n13.out → n117.assertion
n7.out → n119.a
n97.out → n119.b
n102.out → n120.a
n119.out → n120.b
n118.out → n117.atom1
n120.out → n117.formula1
n121.out → n117.atom2
n17.out → n117.formula2
n113.out → n111.a
n117.out → n111.b
n25.out → n123.assertion
n124.out → n123.atom1
n17.out → n123.formula1
n125.out → n123.atom2
n102.out → n123.formula2
n126.out → n123.atom3
n119.out → n123.formula3
n111.out → n110.a
n123.out → n110.b
n94.out → n86.a
n110.out → n86.b
n25.out → n128.assertion
n129.out → n128.atom1
n17.out → n128.formula1
n130.out → n128.atom2
n7.out → n128.formula2
n131.out → n128.atom3
n97.out → n128.formula3
n86.out → n85.a
n128.out → n85.b
n17.out → n135.a
n97.out → n135.b
n60.out → n146.assertion
n147.out → n146.atom1
n66.out → n146.formula1
n13.out → n149.assertion
n66.out → n151.a
n7.out → n151.b
n135.out → n152.a
n151.out → n152.b
n150.out → n149.atom1
n152.out → n149.formula1
n153.out → n149.atom2
n66.out → n149.formula2
n146.out → n144.a
n149.out → n144.b
n25.out → n155.assertion
n156.out → n155.atom1
n66.out → n155.formula1
n157.out → n155.atom2
n135.out → n155.formula2
n158.out → n155.atom3
n151.out → n155.formula3
n144.out → n143.a
n155.out → n143.b
n85.out → n81.a
n143.out → n81.b
n25.out → n160.assertion
n161.out → n160.atom1
n66.out → n160.formula1
n162.out → n160.atom2
n66.out → n160.formula2
n163.out → n160.atom3
n7.out → n160.formula3
n81.out → n80.a
n160.out → n80.b
n78.out → n76.a
n80.out → n76.b
n13.out → n165.assertion
n166.out → n165.atom1
n151.out → n165.formula1
n167.out → n165.atom2
n18.out → n165.formula2
n76.out → n75.a
n165.out → n75.b
n25.out → n169.assertion
n170.out → n169.atom1
n18.out → n169.formula1
n171.out → n169.atom2
n66.out → n169.formula2
n172.out → n169.atom3
n7.out → n169.formula3
n75.out → n74.a
n169.out → n74.b
n36.out → n35.a
n74.out → n35.b
n13.out → n176.assertion
n177.out → n176.atom1
n10.out → n176.formula1
n13.out → n179.assertion
n10.out → n181.a
n7.out → n181.b
n7.out → n182.a
n181.out → n182.b
n180.out → n179.atom1
n182.out → n179.formula1
n183.out → n179.atom2
n18.out → n179.formula2
n176.out → n174.a
n179.out → n174.b
n25.out → n185.assertion
n186.out → n185.atom1
n18.out → n185.formula1
n187.out → n185.atom2
n7.out → n185.formula2
n188.out → n185.atom3
n181.out → n185.formula3
n174.out → n173.a
n185.out → n173.b
n35.out → n34.a
n173.out → n34.b
n25.out → n193.assertion
n194.out → n193.atom1
n10.out → n193.formula1
n195.out → n193.atom2
n7.out → n193.formula2
n196.out → n193.atom3
n9.out → n193.formula3
n5.out → n191.a
n193.out → n191.b
n13.out → n198.assertion
n10.out → n200.a
n9.out → n200.b
n181.out → n201.a
n200.out → n201.b
n199.out → n198.atom1
n201.out → n198.formula1
n202.out → n198.atom2
n18.out → n198.formula2
n191.out → n190.a
n198.out → n190.b
n25.out → n204.assertion
n205.out → n204.atom1
n18.out → n204.formula1
n206.out → n204.atom2
n181.out → n204.formula2
n207.out → n204.atom3
n200.out → n204.formula3
n190.out → n189.a
n204.out → n189.b
n34.out → n33.a
n189.out → n33.b
n25.out → n209.assertion
n210.out → n209.atom1
n18.out → n209.formula1
n211.out → n209.atom2
n10.out → n209.formula2
n212.out → n209.atom3
n9.out → n209.formula3
n33.out → n32.a
n209.out → n32.b
n13.out → n214.assertion
n18.out → n216.a
n9.out → n216.b
n22.out → n217.a
n216.out → n217.b
n215.out → n214.atom1
n217.out → n214.formula1
n218.out → n214.atom2
n10.out → n214.formula2
n32.out → n31.a
n214.out → n31.b
n25.out → n220.assertion
n221.out → n220.atom1
n10.out → n220.formula1
n222.out → n220.atom2
n22.out → n220.formula2
n223.out → n220.atom3
n216.out → n220.formula3
n31.out → n30.a
n220.out → n30.b
n14.out → n2.a
n30.out → n2.b
n60.out → n227.assertion
n228.out → n227.atom1
n17.out → n227.formula1
n13.out → n230.assertion
n8.out → n232.a
n17.out → n232.b
n216.out → n233.a
n232.out → n233.b
n231.out → n230.atom1
n233.out → n230.formula1
n234.out → n230.atom2
n10.out → n230.formula2
n227.out → n225.a
n230.out → n225.b
n25.out → n236.assertion
n237.out → n236.atom1
n10.out → n236.formula1
n238.out → n236.atom2
n216.out → n236.formula2
n239.out → n236.atom3
n232.out → n236.formula3
n225.out → n224.a
n236.out → n224.b
n2.out → n1.a
n224.out → n1.b
n1.out → n240.proof
```

</details>

### *11 · 逆否（否定前件）

- 目标：`⊢ ( ( ¬ P → Q ) → ( ¬ Q → P ) )`
- 提示：A3 的变体：把 ¬B 当前件。
- 参考解：166 个模块 / 282 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n295  [target]
n1  mp
n3  定理 *01
n6  atom P
n7  not
n8  atom Q
n9  imp
n12  mp
n13  mp
n14  mp
n16  subst(groups=0)
n17  atom P
n18  mp
n19  mp
n20  mp
n24  axiom A1
n25  subst(groups=1)
n26  atom P
n27  atom Q
n28  not
n29  not
n30  not
n34  imp
n36  axiom A2
n40  mp
n41  mp
n42  mp
n44  mp
n45  mp
n46  mp
n54  subst(groups=1)
n55  atom P
n56  atom Q
n60  imp
n68  mp
n69  mp
n70  axiom A3
n71  subst(groups=1)
n72  atom P
n73  atom Q
n75  subst(groups=1)
n76  atom P
n77  imp
n78  imp
n79  atom Q
n81  subst(groups=2)
n82  atom P
n83  atom Q
n84  atom R
n85  mp
n86  mp
n87  mp
n89  subst(groups=0)
n90  atom P
n91  mp
n92  mp
n96  mp
n97  mp
n105  subst(groups=1)
n106  atom P
n107  atom Q
n108  not
n109  not
n113  imp
n121  mp
n122  mp
n124  subst(groups=1)
n125  atom P
n126  atom Q
n128  subst(groups=1)
n129  atom P
n130  imp
n131  imp
n132  atom Q
n134  subst(groups=2)
n135  atom P
n136  atom Q
n137  atom R
n139  subst(groups=2)
n140  atom P
n141  atom Q
n142  atom R
n146  imp
n154  mp
n155  mp
n157  subst(groups=1)
n158  atom P
n159  atom Q
n161  subst(groups=1)
n162  atom P
n163  imp
n164  imp
n165  atom Q
n167  subst(groups=2)
n168  atom P
n169  atom Q
n170  atom R
n172  subst(groups=2)
n173  atom P
n174  atom Q
n175  atom R
n177  subst(groups=1)
n178  atom P
n179  atom Q
n181  subst(groups=2)
n182  atom P
n183  atom Q
n184  atom R
n185  mp
n186  mp
n188  subst(groups=0)
n189  atom P
n191  subst(groups=1)
n192  atom P
n193  imp
n194  imp
n195  atom Q
n197  subst(groups=2)
n198  atom P
n199  atom Q
n200  atom R
n228  subst(groups=1)
n229  atom P
n230  atom R
n232  subst(groups=0)
n233  atom P
n234  imp
n235  imp
n237  subst(groups=2)
n238  atom P
n239  atom Q
n240  atom R
n241  mp
n242  mp
n244  subst(groups=0)
n245  atom P
n247  subst(groups=0)
n248  atom P
n249  imp
n250  imp
n252  subst(groups=2)
n253  atom P
n254  atom Q
n255  atom R
n257  subst(groups=1)
n258  atom P
n259  atom R
n261  subst(groups=1)
n262  atom P
n263  atom Q
n265  subst(groups=1)
n266  atom P
n267  atom R
n271  imp
n279  mp
n280  mp
n282  subst(groups=0)
n283  atom Q
n285  subst(groups=1)
n286  atom P
n287  imp
n288  imp
n289  atom Q
n291  subst(groups=2)
n292  atom P
n293  atom Q
n294  atom R

接线：
n6.out → n7.a
n7.out → n9.a
n8.out → n9.b
n3.out → n16.assertion
n17.out → n16.atom1
n8.out → n16.formula1
n24.out → n25.assertion
n26.out → n25.atom1
n8.out → n25.formula1
n8.out → n28.a
n28.out → n29.a
n29.out → n30.a
n27.out → n25.atom2
n30.out → n25.formula2
n30.out → n34.a
n8.out → n34.b
n24.out → n54.assertion
n55.out → n54.atom1
n30.out → n54.formula1
n56.out → n54.atom2
n29.out → n54.formula2
n29.out → n60.a
n30.out → n60.b
n70.out → n71.assertion
n72.out → n71.atom1
n28.out → n71.formula1
n73.out → n71.atom2
n29.out → n71.formula2
n24.out → n75.assertion
n29.out → n77.a
n28.out → n77.b
n60.out → n78.a
n77.out → n78.b
n76.out → n75.atom1
n78.out → n75.formula1
n79.out → n75.atom2
n30.out → n75.formula2
n71.out → n69.a
n75.out → n69.b
n36.out → n81.assertion
n82.out → n81.atom1
n30.out → n81.formula1
n83.out → n81.atom2
n60.out → n81.formula2
n84.out → n81.atom3
n77.out → n81.formula3
n69.out → n68.a
n81.out → n68.b
n54.out → n46.a
n68.out → n46.b
n3.out → n89.assertion
n90.out → n89.atom1
n77.out → n89.formula1
n24.out → n105.assertion
n106.out → n105.atom1
n29.out → n105.formula1
n77.out → n108.a
n108.out → n109.a
n107.out → n105.atom2
n109.out → n105.formula2
n109.out → n113.a
n29.out → n113.b
n70.out → n124.assertion
n125.out → n124.atom1
n108.out → n124.formula1
n126.out → n124.atom2
n28.out → n124.formula2
n24.out → n128.assertion
n28.out → n130.a
n108.out → n130.b
n113.out → n131.a
n130.out → n131.b
n129.out → n128.atom1
n131.out → n128.formula1
n132.out → n128.atom2
n29.out → n128.formula2
n124.out → n122.a
n128.out → n122.b
n36.out → n134.assertion
n135.out → n134.atom1
n29.out → n134.formula1
n136.out → n134.atom2
n113.out → n134.formula2
n137.out → n134.atom3
n130.out → n134.formula3
n122.out → n121.a
n134.out → n121.b
n105.out → n97.a
n121.out → n97.b
n36.out → n139.assertion
n140.out → n139.atom1
n29.out → n139.formula1
n141.out → n139.atom2
n28.out → n139.formula2
n142.out → n139.atom3
n108.out → n139.formula3
n97.out → n96.a
n139.out → n96.b
n29.out → n146.a
n108.out → n146.b
n70.out → n157.assertion
n158.out → n157.atom1
n28.out → n157.formula1
n159.out → n157.atom2
n77.out → n157.formula2
n24.out → n161.assertion
n77.out → n163.a
n28.out → n163.b
n146.out → n164.a
n163.out → n164.b
n162.out → n161.atom1
n164.out → n161.formula1
n165.out → n161.atom2
n77.out → n161.formula2
n157.out → n155.a
n161.out → n155.b
n36.out → n167.assertion
n168.out → n167.atom1
n77.out → n167.formula1
n169.out → n167.atom2
n146.out → n167.formula2
n170.out → n167.atom3
n163.out → n167.formula3
n155.out → n154.a
n167.out → n154.b
n96.out → n92.a
n154.out → n92.b
n36.out → n172.assertion
n173.out → n172.atom1
n77.out → n172.formula1
n174.out → n172.atom2
n77.out → n172.formula2
n175.out → n172.atom3
n28.out → n172.formula3
n92.out → n91.a
n172.out → n91.b
n89.out → n87.a
n91.out → n87.b
n24.out → n177.assertion
n178.out → n177.atom1
n163.out → n177.formula1
n179.out → n177.atom2
n30.out → n177.formula2
n87.out → n86.a
n177.out → n86.b
n36.out → n181.assertion
n182.out → n181.atom1
n30.out → n181.formula1
n183.out → n181.atom2
n77.out → n181.formula2
n184.out → n181.atom3
n28.out → n181.formula3
n86.out → n85.a
n181.out → n85.b
n46.out → n45.a
n85.out → n45.b
n24.out → n188.assertion
n189.out → n188.atom1
n28.out → n188.formula1
n24.out → n191.assertion
n8.out → n193.a
n28.out → n193.b
n28.out → n194.a
n193.out → n194.b
n192.out → n191.atom1
n194.out → n191.formula1
n195.out → n191.atom2
n30.out → n191.formula2
n188.out → n186.a
n191.out → n186.b
n36.out → n197.assertion
n198.out → n197.atom1
n30.out → n197.formula1
n199.out → n197.atom2
n28.out → n197.formula2
n200.out → n197.atom3
n193.out → n197.formula3
n186.out → n185.a
n197.out → n185.b
n45.out → n44.a
n185.out → n44.b
n36.out → n228.assertion
n229.out → n228.atom1
n30.out → n228.formula1
n230.out → n228.atom2
n28.out → n228.formula2
n44.out → n42.a
n228.out → n42.b
n24.out → n232.assertion
n30.out → n234.a
n28.out → n234.b
n34.out → n235.a
n234.out → n235.b
n233.out → n232.atom1
n235.out → n232.formula1
n42.out → n41.a
n232.out → n41.b
n36.out → n237.assertion
n238.out → n237.atom1
n8.out → n237.formula1
n239.out → n237.atom2
n34.out → n237.formula2
n240.out → n237.atom3
n234.out → n237.formula3
n41.out → n40.a
n237.out → n40.b
n25.out → n20.a
n40.out → n20.b
n70.out → n244.assertion
n245.out → n244.atom1
n29.out → n244.formula1
n24.out → n247.assertion
n8.out → n249.a
n29.out → n249.b
n234.out → n250.a
n249.out → n250.b
n248.out → n247.atom1
n250.out → n247.formula1
n244.out → n242.a
n247.out → n242.b
n36.out → n252.assertion
n253.out → n252.atom1
n8.out → n252.formula1
n254.out → n252.atom2
n234.out → n252.formula2
n255.out → n252.atom3
n249.out → n252.formula3
n242.out → n241.a
n252.out → n241.b
n20.out → n19.a
n241.out → n19.b
n36.out → n257.assertion
n258.out → n257.atom1
n8.out → n257.formula1
n259.out → n257.atom2
n29.out → n257.formula2
n19.out → n18.a
n257.out → n18.b
n16.out → n14.a
n18.out → n14.b
n24.out → n261.assertion
n262.out → n261.atom1
n249.out → n261.formula1
n263.out → n261.atom2
n7.out → n261.formula2
n14.out → n13.a
n261.out → n13.b
n36.out → n265.assertion
n266.out → n265.atom1
n7.out → n265.formula1
n267.out → n265.atom2
n29.out → n265.formula2
n13.out → n12.a
n265.out → n12.b
n7.out → n271.a
n29.out → n271.b
n70.out → n282.assertion
n283.out → n282.atom1
n28.out → n282.formula1
n24.out → n285.assertion
n28.out → n287.a
n6.out → n287.b
n271.out → n288.a
n287.out → n288.b
n286.out → n285.atom1
n288.out → n285.formula1
n289.out → n285.atom2
n9.out → n285.formula2
n282.out → n280.a
n285.out → n280.b
n36.out → n291.assertion
n292.out → n291.atom1
n9.out → n291.formula1
n293.out → n291.atom2
n271.out → n291.formula2
n294.out → n291.atom3
n287.out → n291.formula3
n280.out → n279.a
n291.out → n279.b
n12.out → n1.a
n279.out → n1.b
n1.out → n295.proof
```

</details>

### *12 · 双重否定引入

- 目标：`⊢ ( P → ¬ ¬ P )`
- 提示：用 A3 的逆否方向：¬A→¬A 得到 A→¬¬A。
- 参考解：140 个模块 / 239 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n249  [target]
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
n31  mp
n32  mp
n40  subst(groups=1)
n41  atom P
n42  atom Q
n46  imp
n54  mp
n55  mp
n56  axiom A3
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
n75  subst(groups=0)
n76  atom P
n77  mp
n78  mp
n82  mp
n83  mp
n91  subst(groups=1)
n92  atom P
n93  atom Q
n94  not
n95  not
n99  imp
n107  mp
n108  mp
n110  subst(groups=1)
n111  atom P
n112  atom Q
n114  subst(groups=1)
n115  atom P
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
n132  imp
n140  mp
n141  mp
n143  subst(groups=1)
n144  atom P
n145  atom Q
n147  subst(groups=1)
n148  atom P
n149  imp
n150  imp
n151  atom Q
n153  subst(groups=2)
n154  atom P
n155  atom Q
n156  atom R
n158  subst(groups=2)
n159  atom P
n160  atom Q
n161  atom R
n163  subst(groups=1)
n164  atom P
n165  atom Q
n167  subst(groups=2)
n168  atom P
n169  atom Q
n170  atom R
n171  mp
n172  mp
n174  subst(groups=1)
n175  atom P
n176  atom Q
n178  subst(groups=1)
n179  atom P
n180  imp
n181  imp
n182  atom Q
n184  subst(groups=2)
n185  atom P
n186  atom Q
n187  atom R
n215  subst(groups=2)
n216  atom P
n217  atom Q
n218  atom R
n220  subst(groups=1)
n221  atom P
n222  imp
n223  imp
n224  atom Q
n226  subst(groups=1)
n227  atom Q
n228  atom R
n229  mp
n230  mp
n232  subst(groups=1)
n233  atom P
n234  atom Q
n236  subst(groups=1)
n237  atom P
n238  imp
n239  imp
n240  atom Q
n242  subst(groups=1)
n243  atom Q
n244  atom R
n246  subst(groups=1)
n247  atom Q
n248  atom R

接线：
n9.out → n10.assertion
n12.out → n13.a
n13.out → n14.a
n14.out → n15.a
n11.out → n10.atom1
n15.out → n10.formula1
n15.out → n19.a
n12.out → n19.b
n9.out → n40.assertion
n41.out → n40.atom1
n15.out → n40.formula1
n42.out → n40.atom2
n14.out → n40.formula2
n14.out → n46.a
n15.out → n46.b
n56.out → n57.assertion
n58.out → n57.atom1
n13.out → n57.formula1
n59.out → n57.atom2
n14.out → n57.formula2
n9.out → n61.assertion
n14.out → n63.a
n13.out → n63.b
n46.out → n64.a
n63.out → n64.b
n62.out → n61.atom1
n64.out → n61.formula1
n65.out → n61.atom2
n15.out → n61.formula2
n57.out → n55.a
n61.out → n55.b
n22.out → n67.assertion
n68.out → n67.atom1
n15.out → n67.formula1
n69.out → n67.atom2
n46.out → n67.formula2
n70.out → n67.atom3
n63.out → n67.formula3
n55.out → n54.a
n67.out → n54.b
n40.out → n32.a
n54.out → n32.b
n2.out → n75.assertion
n76.out → n75.atom1
n63.out → n75.formula1
n9.out → n91.assertion
n92.out → n91.atom1
n14.out → n91.formula1
n63.out → n94.a
n94.out → n95.a
n93.out → n91.atom2
n95.out → n91.formula2
n95.out → n99.a
n14.out → n99.b
n56.out → n110.assertion
n111.out → n110.atom1
n94.out → n110.formula1
n112.out → n110.atom2
n13.out → n110.formula2
n9.out → n114.assertion
n13.out → n116.a
n94.out → n116.b
n99.out → n117.a
n116.out → n117.b
n115.out → n114.atom1
n117.out → n114.formula1
n118.out → n114.atom2
n14.out → n114.formula2
n110.out → n108.a
n114.out → n108.b
n22.out → n120.assertion
n121.out → n120.atom1
n14.out → n120.formula1
n122.out → n120.atom2
n99.out → n120.formula2
n123.out → n120.atom3
n116.out → n120.formula3
n108.out → n107.a
n120.out → n107.b
n91.out → n83.a
n107.out → n83.b
n22.out → n125.assertion
n126.out → n125.atom1
n14.out → n125.formula1
n127.out → n125.atom2
n13.out → n125.formula2
n128.out → n125.atom3
n94.out → n125.formula3
n83.out → n82.a
n125.out → n82.b
n14.out → n132.a
n94.out → n132.b
n56.out → n143.assertion
n144.out → n143.atom1
n13.out → n143.formula1
n145.out → n143.atom2
n63.out → n143.formula2
n9.out → n147.assertion
n63.out → n149.a
n13.out → n149.b
n132.out → n150.a
n149.out → n150.b
n148.out → n147.atom1
n150.out → n147.formula1
n151.out → n147.atom2
n63.out → n147.formula2
n143.out → n141.a
n147.out → n141.b
n22.out → n153.assertion
n154.out → n153.atom1
n63.out → n153.formula1
n155.out → n153.atom2
n132.out → n153.formula2
n156.out → n153.atom3
n149.out → n153.formula3
n141.out → n140.a
n153.out → n140.b
n82.out → n78.a
n140.out → n78.b
n22.out → n158.assertion
n159.out → n158.atom1
n63.out → n158.formula1
n160.out → n158.atom2
n63.out → n158.formula2
n161.out → n158.atom3
n13.out → n158.formula3
n78.out → n77.a
n158.out → n77.b
n75.out → n73.a
n77.out → n73.b
n9.out → n163.assertion
n164.out → n163.atom1
n149.out → n163.formula1
n165.out → n163.atom2
n15.out → n163.formula2
n73.out → n72.a
n163.out → n72.b
n22.out → n167.assertion
n168.out → n167.atom1
n15.out → n167.formula1
n169.out → n167.atom2
n63.out → n167.formula2
n170.out → n167.atom3
n13.out → n167.formula3
n72.out → n71.a
n167.out → n71.b
n32.out → n31.a
n71.out → n31.b
n9.out → n174.assertion
n175.out → n174.atom1
n13.out → n174.formula1
n176.out → n174.atom2
n12.out → n174.formula2
n9.out → n178.assertion
n12.out → n180.a
n13.out → n180.b
n13.out → n181.a
n180.out → n181.b
n179.out → n178.atom1
n181.out → n178.formula1
n182.out → n178.atom2
n15.out → n178.formula2
n174.out → n172.a
n178.out → n172.b
n22.out → n184.assertion
n185.out → n184.atom1
n15.out → n184.formula1
n186.out → n184.atom2
n13.out → n184.formula2
n187.out → n184.atom3
n180.out → n184.formula3
n172.out → n171.a
n184.out → n171.b
n31.out → n30.a
n171.out → n30.b
n22.out → n215.assertion
n216.out → n215.atom1
n15.out → n215.formula1
n217.out → n215.atom2
n12.out → n215.formula2
n218.out → n215.atom3
n13.out → n215.formula3
n30.out → n28.a
n215.out → n28.b
n9.out → n220.assertion
n15.out → n222.a
n13.out → n222.b
n19.out → n223.a
n222.out → n223.b
n221.out → n220.atom1
n223.out → n220.formula1
n224.out → n220.atom2
n12.out → n220.formula2
n28.out → n27.a
n220.out → n27.b
n22.out → n226.assertion
n227.out → n226.atom1
n19.out → n226.formula1
n228.out → n226.atom2
n222.out → n226.formula2
n27.out → n26.a
n226.out → n26.b
n10.out → n5.a
n26.out → n5.b
n56.out → n232.assertion
n233.out → n232.atom1
n14.out → n232.formula1
n234.out → n232.atom2
n12.out → n232.formula2
n9.out → n236.assertion
n12.out → n238.a
n14.out → n238.b
n222.out → n239.a
n238.out → n239.b
n237.out → n236.atom1
n239.out → n236.formula1
n240.out → n236.atom2
n12.out → n236.formula2
n232.out → n230.a
n236.out → n230.b
n22.out → n242.assertion
n243.out → n242.atom1
n222.out → n242.formula1
n244.out → n242.atom2
n238.out → n242.formula2
n230.out → n229.a
n242.out → n229.b
n5.out → n4.a
n229.out → n4.b
n22.out → n246.assertion
n247.out → n246.atom1
n12.out → n246.formula1
n248.out → n246.atom2
n14.out → n246.formula2
n4.out → n3.a
n246.out → n3.b
n2.out → n1.a
n3.out → n1.b
n1.out → n249.proof
```

</details>

### *13 · 双重否定消去

- 目标：`⊢ ( ¬ ¬ P → P )`
- 提示：先证 ¬¬A→(¬A→¬¬A)，再用反证法。
- 参考解：84 个模块 / 139 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n142  [target]
n1  mp
n2  mp
n4  定理 *01
n7  atom P
n8  not
n9  not
n12  axiom A1
n13  subst(groups=1)
n14  atom P
n15  atom Q
n19  imp
n22  axiom A2
n27  mp
n28  mp
n29  axiom A3
n30  subst(groups=0)
n31  atom Q
n33  subst(groups=1)
n34  atom P
n35  imp
n36  imp
n37  atom Q
n39  subst(groups=2)
n40  atom P
n41  atom Q
n42  atom R
n43  mp
n44  mp
n45  mp
n47  subst(groups=0)
n48  atom P
n49  mp
n50  mp
n54  mp
n55  mp
n63  subst(groups=1)
n64  atom P
n65  atom Q
n66  not
n67  not
n71  imp
n79  mp
n80  mp
n82  subst(groups=1)
n83  atom P
n84  atom Q
n86  subst(groups=1)
n87  atom P
n88  imp
n89  imp
n90  atom Q
n92  subst(groups=2)
n93  atom P
n94  atom Q
n95  atom R
n97  subst(groups=2)
n98  atom P
n99  atom Q
n100  atom R
n104  imp
n112  mp
n113  mp
n115  subst(groups=0)
n116  atom Q
n118  subst(groups=1)
n119  atom P
n120  imp
n121  imp
n122  atom Q
n124  subst(groups=2)
n125  atom P
n126  atom Q
n127  atom R
n129  subst(groups=2)
n130  atom P
n131  atom Q
n132  atom R
n134  subst(groups=1)
n135  atom P
n136  atom Q
n138  subst(groups=2)
n139  atom P
n140  atom Q
n141  atom R

接线：
n7.out → n8.a
n8.out → n9.a
n12.out → n13.assertion
n14.out → n13.atom1
n9.out → n13.formula1
n15.out → n13.atom2
n8.out → n13.formula2
n8.out → n19.a
n9.out → n19.b
n29.out → n30.assertion
n31.out → n30.atom1
n8.out → n30.formula1
n12.out → n33.assertion
n8.out → n35.a
n7.out → n35.b
n19.out → n36.a
n35.out → n36.b
n34.out → n33.atom1
n36.out → n33.formula1
n37.out → n33.atom2
n9.out → n33.formula2
n30.out → n28.a
n33.out → n28.b
n22.out → n39.assertion
n40.out → n39.atom1
n9.out → n39.formula1
n41.out → n39.atom2
n19.out → n39.formula2
n42.out → n39.atom3
n35.out → n39.formula3
n28.out → n27.a
n39.out → n27.b
n13.out → n2.a
n27.out → n2.b
n4.out → n47.assertion
n48.out → n47.atom1
n35.out → n47.formula1
n12.out → n63.assertion
n64.out → n63.atom1
n8.out → n63.formula1
n35.out → n66.a
n66.out → n67.a
n65.out → n63.atom2
n67.out → n63.formula2
n67.out → n71.a
n8.out → n71.b
n29.out → n82.assertion
n83.out → n82.atom1
n66.out → n82.formula1
n84.out → n82.atom2
n7.out → n82.formula2
n12.out → n86.assertion
n7.out → n88.a
n66.out → n88.b
n71.out → n89.a
n88.out → n89.b
n87.out → n86.atom1
n89.out → n86.formula1
n90.out → n86.atom2
n8.out → n86.formula2
n82.out → n80.a
n86.out → n80.b
n22.out → n92.assertion
n93.out → n92.atom1
n8.out → n92.formula1
n94.out → n92.atom2
n71.out → n92.formula2
n95.out → n92.atom3
n88.out → n92.formula3
n80.out → n79.a
n92.out → n79.b
n63.out → n55.a
n79.out → n55.b
n22.out → n97.assertion
n98.out → n97.atom1
n8.out → n97.formula1
n99.out → n97.atom2
n7.out → n97.formula2
n100.out → n97.atom3
n66.out → n97.formula3
n55.out → n54.a
n97.out → n54.b
n8.out → n104.a
n66.out → n104.b
n29.out → n115.assertion
n116.out → n115.atom1
n35.out → n115.formula1
n12.out → n118.assertion
n35.out → n120.a
n7.out → n120.b
n104.out → n121.a
n120.out → n121.b
n119.out → n118.atom1
n121.out → n118.formula1
n122.out → n118.atom2
n35.out → n118.formula2
n115.out → n113.a
n118.out → n113.b
n22.out → n124.assertion
n125.out → n124.atom1
n35.out → n124.formula1
n126.out → n124.atom2
n104.out → n124.formula2
n127.out → n124.atom3
n120.out → n124.formula3
n113.out → n112.a
n124.out → n112.b
n54.out → n50.a
n112.out → n50.b
n22.out → n129.assertion
n130.out → n129.atom1
n35.out → n129.formula1
n131.out → n129.atom2
n35.out → n129.formula2
n132.out → n129.atom3
n7.out → n129.formula3
n50.out → n49.a
n129.out → n49.b
n47.out → n45.a
n49.out → n45.b
n12.out → n134.assertion
n135.out → n134.atom1
n120.out → n134.formula1
n136.out → n134.atom2
n9.out → n134.formula2
n45.out → n44.a
n134.out → n44.b
n22.out → n138.assertion
n139.out → n138.atom1
n9.out → n138.formula1
n140.out → n138.atom2
n35.out → n138.formula2
n141.out → n138.atom3
n7.out → n138.formula3
n44.out → n43.a
n138.out → n43.b
n2.out → n1.a
n43.out → n1.b
n1.out → n142.proof
```

</details>

### *14 · 矛盾推出一切

- 目标：`⊢ ( ¬ P → ( P → Q ) )`
- 提示：用 A1 造出 A→(¬B→A)，再用 A3。
- 参考解：26 个模块 / 37 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n44  [target]
n1  mp
n6  atom P
n7  not
n10  axiom A1
n11  subst(groups=1)
n12  atom P
n13  atom Q
n14  atom Q
n15  not
n19  imp
n22  axiom A2
n27  mp
n28  mp
n29  axiom A3
n30  subst(groups=1)
n31  atom P
n32  atom Q
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
n6.out → n7.a
n10.out → n11.assertion
n12.out → n11.atom1
n7.out → n11.formula1
n14.out → n15.a
n13.out → n11.atom2
n15.out → n11.formula2
n15.out → n19.a
n7.out → n19.b
n29.out → n30.assertion
n31.out → n30.atom1
n14.out → n30.formula1
n32.out → n30.atom2
n6.out → n30.formula2
n10.out → n34.assertion
n6.out → n36.a
n14.out → n36.b
n19.out → n37.a
n36.out → n37.b
n35.out → n34.atom1
n37.out → n34.formula1
n38.out → n34.atom2
n7.out → n34.formula2
n30.out → n28.a
n34.out → n28.b
n22.out → n40.assertion
n41.out → n40.atom1
n7.out → n40.formula1
n42.out → n40.atom2
n19.out → n40.formula2
n43.out → n40.atom3
n36.out → n40.formula3
n28.out → n27.a
n40.out → n27.b
n11.out → n1.a
n27.out → n1.b
n1.out → n44.proof
```

</details>

### *15 · 合取前件合并

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( ( P ∧ Q ) → R ) )`
- 提示：把合取拆成两个前件再用 A2 合并（演绎定理自动处理假设）。
- 参考解：68 个模块 / 116 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n164  [target]
n1  mp
n7  atom P
n8  atom Q
n9  and
n10  axiom A1
n15  atom R
n16  imp
n17  imp
n21  mp
n22  and-elim-ax(side=r)
n23  subst(groups=1)
n24  atom P
n25  imp
n26  atom Q
n37  axiom A2
n61  mp
n62  mp
n63  mp
n68  mp
n69  and-elim-ax(side=l)
n70  subst(groups=1)
n71  atom P
n72  imp
n73  atom Q
n107  mp
n108  mp
n114  subst(groups=1)
n115  atom P
n116  atom Q
n119  imp
n126  mp
n127  mp
n128  subst(groups=2)
n129  atom P
n130  atom Q
n131  atom R
n132  subst(groups=1)
n133  atom P
n134  imp
n135  imp
n136  imp
n137  atom Q
n138  subst(groups=2)
n139  atom P
n140  atom Q
n141  atom R
n142  subst(groups=2)
n143  atom P
n144  atom Q
n145  atom R
n146  mp
n147  mp
n148  subst(groups=0)
n149  atom P
n150  subst(groups=1)
n151  atom P
n152  imp
n153  imp
n154  imp
n155  atom Q
n156  subst(groups=2)
n157  atom P
n158  atom Q
n159  atom R
n160  subst(groups=2)
n161  atom P
n162  atom Q
n163  atom R

接线：
n7.out → n9.a
n8.out → n9.b
n8.out → n16.a
n15.out → n16.b
n7.out → n17.a
n16.out → n17.b
n7.out → n22.a
n8.out → n22.b
n10.out → n23.assertion
n9.out → n25.a
n8.out → n25.b
n24.out → n23.atom1
n25.out → n23.formula1
n26.out → n23.atom2
n17.out → n23.formula2
n22.out → n21.a
n23.out → n21.b
n7.out → n69.a
n8.out → n69.b
n10.out → n70.assertion
n9.out → n72.a
n7.out → n72.b
n71.out → n70.atom1
n72.out → n70.formula1
n73.out → n70.atom2
n17.out → n70.formula2
n69.out → n68.a
n70.out → n68.b
n10.out → n114.assertion
n115.out → n114.atom1
n17.out → n114.formula1
n116.out → n114.atom2
n9.out → n114.formula2
n9.out → n119.a
n17.out → n119.b
n37.out → n128.assertion
n129.out → n128.atom1
n9.out → n128.formula1
n130.out → n128.atom2
n7.out → n128.formula2
n131.out → n128.atom3
n16.out → n128.formula3
n10.out → n132.assertion
n9.out → n134.a
n16.out → n134.b
n72.out → n135.a
n134.out → n135.b
n119.out → n136.a
n135.out → n136.b
n133.out → n132.atom1
n136.out → n132.formula1
n137.out → n132.atom2
n17.out → n132.formula2
n128.out → n127.a
n132.out → n127.b
n37.out → n138.assertion
n139.out → n138.atom1
n17.out → n138.formula1
n140.out → n138.atom2
n119.out → n138.formula2
n141.out → n138.atom3
n135.out → n138.formula3
n127.out → n126.a
n138.out → n126.b
n114.out → n108.a
n126.out → n108.b
n37.out → n142.assertion
n143.out → n142.atom1
n17.out → n142.formula1
n144.out → n142.atom2
n72.out → n142.formula2
n145.out → n142.atom3
n134.out → n142.formula3
n108.out → n107.a
n142.out → n107.b
n68.out → n63.a
n107.out → n63.b
n37.out → n148.assertion
n149.out → n148.atom1
n9.out → n148.formula1
n10.out → n150.assertion
n9.out → n152.a
n15.out → n152.b
n25.out → n153.a
n152.out → n153.b
n134.out → n154.a
n153.out → n154.b
n151.out → n150.atom1
n154.out → n150.formula1
n155.out → n150.atom2
n17.out → n150.formula2
n148.out → n147.a
n150.out → n147.b
n37.out → n156.assertion
n157.out → n156.atom1
n17.out → n156.formula1
n158.out → n156.atom2
n134.out → n156.formula2
n159.out → n156.atom3
n153.out → n156.formula3
n147.out → n146.a
n156.out → n146.b
n63.out → n62.a
n146.out → n62.b
n37.out → n160.assertion
n161.out → n160.atom1
n17.out → n160.formula1
n162.out → n160.atom2
n25.out → n160.formula2
n163.out → n160.atom3
n152.out → n160.formula3
n62.out → n61.a
n160.out → n61.b
n21.out → n1.a
n61.out → n1.b
n1.out → n164.proof
```

</details>

### *16 · 分情况

- 目标：`⊢ ( ( ¬ P → Q ) → ( ( P → Q ) → Q ) )`
- 提示：分别从 ¬A 和 A 推出 B，再用 A3 合并。
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
n92  定理 *12
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
n120  axiom A3
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
n229  定理 *14
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
n6.out → n7.a
n7.out → n9.a
n8.out → n9.b
n5.out → n4.atom1
n9.out → n4.formula1
n12.out → n13.assertion
n14.out → n13.atom1
n9.out → n13.formula1
n6.out → n16.a
n8.out → n16.b
n15.out → n13.atom2
n16.out → n13.formula2
n16.out → n20.a
n9.out → n20.b
n3.out → n33.assertion
n34.out → n33.atom1
n16.out → n33.formula1
n12.out → n50.assertion
n51.out → n50.atom1
n7.out → n50.formula1
n52.out → n50.atom2
n9.out → n50.formula2
n9.out → n56.a
n7.out → n56.b
n23.out → n68.assertion
n69.out → n68.atom1
n9.out → n68.formula1
n70.out → n68.atom2
n7.out → n68.formula2
n71.out → n68.atom3
n8.out → n68.formula3
n4.out → n66.a
n68.out → n66.b
n12.out → n73.assertion
n9.out → n75.a
n8.out → n75.b
n56.out → n76.a
n75.out → n76.b
n74.out → n73.atom1
n76.out → n73.formula1
n77.out → n73.atom2
n7.out → n73.formula2
n66.out → n65.a
n73.out → n65.b
n23.out → n79.assertion
n80.out → n79.atom1
n7.out → n79.formula1
n81.out → n79.atom2
n56.out → n79.formula2
n82.out → n79.atom3
n75.out → n79.formula3
n65.out → n64.a
n79.out → n64.b
n50.out → n42.a
n64.out → n42.b
n12.out → n84.assertion
n7.out → n86.a
n75.out → n86.b
n85.out → n84.atom1
n86.out → n84.formula1
n87.out → n84.atom2
n16.out → n84.formula2
n42.out → n41.a
n84.out → n41.b
n92.out → n93.assertion
n94.out → n93.atom1
n75.out → n93.formula1
n12.out → n96.assertion
n75.out → n98.a
n98.out → n99.a
n75.out → n100.a
n99.out → n100.b
n97.out → n96.atom1
n100.out → n96.formula1
n101.out → n96.atom2
n7.out → n96.formula2
n93.out → n91.a
n96.out → n91.b
n23.out → n103.assertion
n104.out → n103.atom1
n7.out → n103.formula1
n105.out → n103.atom2
n75.out → n103.formula2
n106.out → n103.atom3
n99.out → n103.formula3
n91.out → n90.a
n103.out → n90.b
n12.out → n108.assertion
n7.out → n110.a
n99.out → n110.b
n86.out → n111.a
n110.out → n111.b
n109.out → n108.atom1
n111.out → n108.formula1
n112.out → n108.atom2
n16.out → n108.formula2
n90.out → n89.a
n108.out → n89.b
n23.out → n114.assertion
n115.out → n114.atom1
n16.out → n114.formula1
n116.out → n114.atom2
n86.out → n114.formula2
n117.out → n114.atom3
n110.out → n114.formula3
n89.out → n88.a
n114.out → n88.b
n41.out → n40.a
n88.out → n40.b
n120.out → n121.assertion
n122.out → n121.atom1
n98.out → n121.formula1
n12.out → n124.assertion
n98.out → n126.a
n6.out → n126.b
n110.out → n127.a
n126.out → n127.b
n125.out → n124.atom1
n127.out → n124.formula1
n128.out → n124.atom2
n16.out → n124.formula2
n121.out → n119.a
n124.out → n119.b
n23.out → n130.assertion
n131.out → n130.atom1
n16.out → n130.formula1
n132.out → n130.atom2
n110.out → n130.formula2
n133.out → n130.atom3
n126.out → n130.formula3
n119.out → n118.a
n130.out → n118.b
n40.out → n39.a
n118.out → n39.b
n12.out → n147.assertion
n148.out → n147.atom1
n8.out → n147.formula1
n149.out → n147.atom2
n9.out → n147.formula2
n8.out → n153.a
n75.out → n153.b
n12.out → n178.assertion
n179.out → n178.atom1
n153.out → n178.formula1
n180.out → n178.atom2
n6.out → n178.formula2
n147.out → n138.a
n178.out → n138.b
n23.out → n182.assertion
n183.out → n182.atom1
n75.out → n182.formula1
n138.out → n137.a
n182.out → n137.b
n12.out → n187.assertion
n6.out → n189.a
n75.out → n189.b
n188.out → n187.atom1
n189.out → n187.formula1
n190.out → n187.atom2
n98.out → n187.formula2
n12.out → n192.assertion
n98.out → n194.a
n189.out → n194.b
n189.out → n195.a
n194.out → n195.b
n193.out → n192.atom1
n195.out → n192.formula1
n196.out → n192.atom2
n16.out → n192.formula2
n187.out → n185.a
n192.out → n185.b
n23.out → n198.assertion
n199.out → n198.atom1
n16.out → n198.formula1
n200.out → n198.atom2
n189.out → n198.formula2
n201.out → n198.atom3
n194.out → n198.formula3
n185.out → n184.a
n198.out → n184.b
n137.out → n136.a
n184.out → n136.b
n23.out → n205.assertion
n206.out → n205.atom1
n98.out → n205.formula1
n207.out → n205.atom2
n6.out → n205.formula2
n208.out → n205.atom3
n75.out → n205.formula3
n12.out → n210.assertion
n98.out → n212.a
n75.out → n212.b
n126.out → n213.a
n212.out → n213.b
n194.out → n214.a
n213.out → n214.b
n211.out → n210.atom1
n214.out → n210.formula1
n215.out → n210.atom2
n16.out → n210.formula2
n205.out → n203.a
n210.out → n203.b
n23.out → n217.assertion
n218.out → n217.atom1
n16.out → n217.formula1
n219.out → n217.atom2
n194.out → n217.formula2
n220.out → n217.atom3
n213.out → n217.formula3
n203.out → n202.a
n217.out → n202.b
n136.out → n135.a
n202.out → n135.b
n23.out → n222.assertion
n223.out → n222.atom1
n16.out → n222.formula1
n224.out → n222.atom2
n126.out → n222.formula2
n225.out → n222.atom3
n212.out → n222.formula3
n135.out → n134.a
n222.out → n134.b
n39.out → n38.a
n134.out → n38.b
n229.out → n230.assertion
n231.out → n230.atom1
n75.out → n230.formula1
n16.out → n233.a
n232.out → n230.atom2
n233.out → n230.formula2
n23.out → n235.assertion
n236.out → n235.atom1
n98.out → n235.formula1
n237.out → n235.atom2
n75.out → n235.formula2
n238.out → n235.atom3
n233.out → n235.formula3
n230.out → n228.a
n235.out → n228.b
n12.out → n240.assertion
n98.out → n242.a
n233.out → n242.b
n212.out → n243.a
n242.out → n243.b
n241.out → n240.atom1
n243.out → n240.formula1
n244.out → n240.atom2
n16.out → n240.formula2
n228.out → n227.a
n240.out → n227.b
n23.out → n246.assertion
n247.out → n246.atom1
n16.out → n246.formula1
n248.out → n246.atom2
n212.out → n246.formula2
n249.out → n246.atom3
n242.out → n246.formula3
n227.out → n226.a
n246.out → n226.b
n38.out → n37.a
n226.out → n37.b
n120.out → n253.assertion
n254.out → n253.atom1
n75.out → n253.formula1
n255.out → n253.atom2
n16.out → n253.formula2
n12.out → n257.assertion
n16.out → n259.a
n75.out → n259.b
n242.out → n260.a
n259.out → n260.b
n258.out → n257.atom1
n260.out → n257.formula1
n261.out → n257.atom2
n16.out → n257.formula2
n253.out → n251.a
n257.out → n251.b
n23.out → n263.assertion
n264.out → n263.atom1
n16.out → n263.formula1
n265.out → n263.atom2
n242.out → n263.formula2
n266.out → n263.atom3
n259.out → n263.formula3
n251.out → n250.a
n263.out → n250.b
n37.out → n36.a
n250.out → n36.b
n23.out → n268.assertion
n269.out → n268.atom1
n16.out → n268.formula1
n270.out → n268.atom2
n16.out → n268.formula2
n271.out → n268.atom3
n75.out → n268.formula3
n36.out → n35.a
n268.out → n35.b
n33.out → n31.a
n35.out → n31.b
n23.out → n273.assertion
n274.out → n273.atom1
n16.out → n273.formula1
n275.out → n273.atom2
n9.out → n273.formula2
n276.out → n273.atom3
n8.out → n273.formula3
n31.out → n30.a
n273.out → n30.b
n12.out → n278.assertion
n16.out → n280.a
n8.out → n280.b
n20.out → n281.a
n280.out → n281.b
n279.out → n278.atom1
n281.out → n278.formula1
n282.out → n278.atom2
n9.out → n278.formula2
n30.out → n29.a
n278.out → n29.b
n23.out → n284.assertion
n285.out → n284.atom1
n9.out → n284.formula1
n286.out → n284.atom2
n20.out → n284.formula2
n287.out → n284.atom3
n280.out → n284.formula3
n29.out → n28.a
n284.out → n28.b
n13.out → n1.a
n28.out → n1.b
n1.out → n288.proof
```

</details>

### *17 · 蕴涵合成

- 目标：`⊢ ( ( P → Q ) → ( ( R → S ) → ( ( Q → R ) → ( P → S ) ) ) )`
- 提示：两次前件/后件组合。
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
n63  定理 *05
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
n15.out → n17.a
n16.out → n17.b
n14.out → n12.atom2
n17.out → n12.formula2
n17.out → n21.a
n8.out → n21.b
n34.out → n35.assertion
n36.out → n35.atom1
n15.out → n35.formula1
n37.out → n35.atom2
n16.out → n35.formula2
n38.out → n35.atom3
n7.out → n35.formula3
n11.out → n42.assertion
n7.out → n44.a
n15.out → n44.b
n7.out → n45.a
n16.out → n45.b
n44.out → n46.a
n45.out → n46.b
n43.out → n42.atom1
n46.out → n42.formula1
n47.out → n42.atom2
n8.out → n42.formula2
n11.out → n49.assertion
n8.out → n51.a
n46.out → n51.b
n46.out → n52.a
n51.out → n52.b
n50.out → n49.atom1
n52.out → n49.formula1
n53.out → n49.atom2
n17.out → n49.formula2
n42.out → n40.a
n49.out → n40.b
n24.out → n55.assertion
n56.out → n55.atom1
n17.out → n55.formula1
n57.out → n55.atom2
n46.out → n55.formula2
n58.out → n55.atom3
n51.out → n55.formula3
n40.out → n39.a
n55.out → n39.b
n35.out → n33.a
n39.out → n33.b
n63.out → n64.assertion
n65.out → n64.atom1
n16.out → n64.formula1
n11.out → n67.assertion
n6.out → n69.a
n16.out → n69.b
n45.out → n70.a
n69.out → n70.b
n8.out → n71.a
n70.out → n71.b
n68.out → n67.atom1
n71.out → n67.formula1
n72.out → n67.atom2
n17.out → n67.formula2
n64.out → n62.a
n67.out → n62.b
n34.out → n78.assertion
n79.out → n78.atom1
n45.out → n78.formula1
n80.out → n78.atom2
n69.out → n78.formula2
n81.out → n78.atom3
n44.out → n78.formula3
n11.out → n83.assertion
n44.out → n85.a
n69.out → n85.b
n46.out → n86.a
n85.out → n86.b
n70.out → n87.a
n86.out → n87.b
n84.out → n83.atom1
n87.out → n83.formula1
n88.out → n83.atom2
n8.out → n83.formula2
n78.out → n76.a
n83.out → n76.b
n24.out → n90.assertion
n91.out → n90.atom1
n8.out → n90.formula1
n92.out → n90.atom2
n70.out → n90.formula2
n93.out → n90.atom3
n86.out → n90.formula3
n76.out → n75.a
n90.out → n75.b
n11.out → n95.assertion
n8.out → n97.a
n86.out → n97.b
n71.out → n98.a
n97.out → n98.b
n96.out → n95.atom1
n98.out → n95.formula1
n99.out → n95.atom2
n17.out → n95.formula2
n75.out → n74.a
n95.out → n74.b
n24.out → n101.assertion
n102.out → n101.atom1
n17.out → n101.formula1
n103.out → n101.atom2
n71.out → n101.formula2
n104.out → n101.atom3
n97.out → n101.formula3
n74.out → n73.a
n101.out → n73.b
n62.out → n61.a
n73.out → n61.b
n24.out → n108.assertion
n109.out → n108.atom1
n8.out → n108.formula1
n110.out → n108.atom2
n46.out → n108.formula2
n111.out → n108.atom3
n85.out → n108.formula3
n11.out → n113.assertion
n8.out → n115.a
n85.out → n115.b
n51.out → n116.a
n115.out → n116.b
n97.out → n117.a
n116.out → n117.b
n114.out → n113.atom1
n117.out → n113.formula1
n118.out → n113.atom2
n17.out → n113.formula2
n108.out → n106.a
n113.out → n106.b
n24.out → n120.assertion
n121.out → n120.atom1
n17.out → n120.formula1
n122.out → n120.atom2
n97.out → n120.formula2
n123.out → n120.atom3
n116.out → n120.formula3
n106.out → n105.a
n120.out → n105.b
n61.out → n60.a
n105.out → n60.b
n24.out → n125.assertion
n126.out → n125.atom1
n17.out → n125.formula1
n127.out → n125.atom2
n51.out → n125.formula2
n128.out → n125.atom3
n115.out → n125.formula3
n60.out → n59.a
n125.out → n59.b
n33.out → n32.a
n59.out → n32.b
n24.out → n130.assertion
n131.out → n130.atom1
n17.out → n130.formula1
n132.out → n130.atom2
n8.out → n130.formula2
n133.out → n130.atom3
n85.out → n130.formula3
n32.out → n31.a
n130.out → n31.b
n11.out → n135.assertion
n17.out → n137.a
n85.out → n137.b
n21.out → n138.a
n137.out → n138.b
n136.out → n135.atom1
n138.out → n135.formula1
n139.out → n135.atom2
n8.out → n135.formula2
n31.out → n30.a
n135.out → n30.b
n24.out → n141.assertion
n142.out → n141.atom1
n8.out → n141.formula1
n143.out → n141.atom2
n21.out → n141.formula2
n144.out → n141.atom3
n137.out → n141.formula3
n30.out → n29.a
n141.out → n29.b
n12.out → n1.a
n29.out → n1.b
n1.out → n145.proof
```

</details>

### *18 · 替换前件（左）

- 目标：`⊢ ( ( ( P → Q ) → R ) → ( Q → R ) )`
- 提示：从 B 出发先用 A1 得到 A→B。
- 参考解：61 个模块 / 99 条接线

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
n6.out → n8.a
n7.out → n8.b
n8.out → n10.a
n9.out → n10.b
n5.out → n4.atom1
n10.out → n4.formula1
n13.out → n14.assertion
n15.out → n14.atom1
n10.out → n14.formula1
n7.out → n19.a
n10.out → n19.b
n13.out → n33.assertion
n34.out → n33.atom1
n7.out → n33.formula1
n35.out → n33.atom2
n6.out → n33.formula2
n13.out → n39.assertion
n40.out → n39.atom1
n8.out → n39.formula1
n41.out → n39.atom2
n10.out → n39.formula2
n13.out → n43.assertion
n10.out → n45.a
n8.out → n45.b
n8.out → n46.a
n45.out → n46.b
n44.out → n43.atom1
n46.out → n43.formula1
n39.out → n37.a
n43.out → n37.b
n22.out → n48.assertion
n49.out → n48.atom1
n7.out → n48.formula1
n50.out → n48.atom2
n8.out → n48.formula2
n51.out → n48.atom3
n45.out → n48.formula3
n37.out → n36.a
n48.out → n36.b
n33.out → n31.a
n36.out → n31.b
n22.out → n70.assertion
n71.out → n70.atom1
n10.out → n70.formula1
n72.out → n70.atom2
n8.out → n70.formula2
n4.out → n54.a
n70.out → n54.b
n13.out → n74.assertion
n10.out → n76.a
n9.out → n76.b
n45.out → n77.a
n76.out → n77.b
n75.out → n74.atom1
n77.out → n74.formula1
n54.out → n53.a
n74.out → n53.b
n22.out → n79.assertion
n80.out → n79.atom1
n7.out → n79.formula1
n81.out → n79.atom2
n45.out → n79.formula2
n82.out → n79.atom3
n76.out → n79.formula3
n53.out → n52.a
n79.out → n52.b
n31.out → n30.a
n52.out → n30.b
n22.out → n84.assertion
n85.out → n84.atom1
n7.out → n84.formula1
n86.out → n84.atom2
n10.out → n84.formula2
n30.out → n29.a
n84.out → n29.b
n13.out → n88.assertion
n7.out → n90.a
n9.out → n90.b
n19.out → n91.a
n90.out → n91.b
n89.out → n88.atom1
n91.out → n88.formula1
n92.out → n88.atom2
n10.out → n88.formula2
n29.out → n28.a
n88.out → n28.b
n22.out → n94.assertion
n95.out → n94.atom1
n10.out → n94.formula1
n96.out → n94.atom2
n19.out → n94.formula2
n97.out → n94.atom3
n90.out → n94.formula3
n28.out → n27.a
n94.out → n27.b
n14.out → n1.a
n27.out → n1.b
n1.out → n98.proof
```

</details>

### *19 · 替换前件（右）

- 目标：`⊢ ( ( ( P → Q ) → R ) → ( ¬ P → R ) )`
- 提示：从 A 出发先用 A1 得到 A→B。
- 参考解：63 个模块 / 101 条接线

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
n34  定理 *14
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
n6.out → n8.a
n7.out → n8.b
n8.out → n10.a
n9.out → n10.b
n5.out → n4.atom1
n10.out → n4.formula1
n13.out → n14.assertion
n15.out → n14.atom1
n10.out → n14.formula1
n6.out → n17.a
n16.out → n14.atom2
n17.out → n14.formula2
n17.out → n21.a
n10.out → n21.b
n13.out → n38.assertion
n39.out → n38.atom1
n8.out → n38.formula1
n40.out → n38.atom2
n10.out → n38.formula2
n13.out → n42.assertion
n10.out → n44.a
n8.out → n44.b
n8.out → n45.a
n44.out → n45.b
n43.out → n42.atom1
n45.out → n42.formula1
n46.out → n42.atom2
n17.out → n42.formula2
n38.out → n36.a
n42.out → n36.b
n24.out → n48.assertion
n49.out → n48.atom1
n17.out → n48.formula1
n50.out → n48.atom2
n8.out → n48.formula2
n51.out → n48.atom3
n44.out → n48.formula3
n36.out → n35.a
n48.out → n35.b
n34.out → n33.a
n35.out → n33.b
n24.out → n70.assertion
n71.out → n70.atom1
n10.out → n70.formula1
n72.out → n70.atom2
n8.out → n70.formula2
n4.out → n54.a
n70.out → n54.b
n13.out → n74.assertion
n10.out → n76.a
n9.out → n76.b
n44.out → n77.a
n76.out → n77.b
n75.out → n74.atom1
n77.out → n74.formula1
n78.out → n74.atom2
n17.out → n74.formula2
n54.out → n53.a
n74.out → n53.b
n24.out → n80.assertion
n81.out → n80.atom1
n17.out → n80.formula1
n82.out → n80.atom2
n44.out → n80.formula2
n83.out → n80.atom3
n76.out → n80.formula3
n53.out → n52.a
n80.out → n52.b
n33.out → n32.a
n52.out → n32.b
n24.out → n85.assertion
n86.out → n85.atom1
n17.out → n85.formula1
n87.out → n85.atom2
n10.out → n85.formula2
n32.out → n31.a
n85.out → n31.b
n13.out → n89.assertion
n17.out → n91.a
n9.out → n91.b
n21.out → n92.a
n91.out → n92.b
n90.out → n89.atom1
n92.out → n89.formula1
n93.out → n89.atom2
n10.out → n89.formula2
n31.out → n30.a
n89.out → n30.b
n24.out → n95.assertion
n96.out → n95.atom1
n10.out → n95.formula1
n97.out → n95.atom2
n21.out → n95.formula2
n98.out → n95.atom3
n91.out → n95.formula3
n30.out → n29.a
n95.out → n29.b
n14.out → n1.a
n29.out → n1.b
n1.out → n99.proof
```

</details>

### *20 · 合取前件拆分

- 目标：`⊢ ( ( ( P ∧ Q ) → R ) → ( P → ( Q → R ) ) )`
- 提示：把合取前件拆成两层前件（演绎定理自动处理假设）。
- 参考解：132 个模块 / 231 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n413  [target]
n1  mp
n8  atom Q
n9  axiom A1
n14  atom P
n15  and
n16  atom R
n17  imp
n28  axiom A2
n89  mp
n90  and-intro-ax
n91  subst(groups=1)
n92  atom P
n93  imp
n94  imp
n95  atom Q
n283  mp
n284  mp
n285  mp
n286  mp
n292  subst(groups=1)
n293  atom P
n294  atom Q
n297  imp
n304  mp
n305  mp
n306  mp
n307  mp
n308  subst(groups=0)
n309  atom P
n310  subst(groups=1)
n311  atom P
n312  imp
n313  imp
n314  atom Q
n315  mp
n316  mp
n317  subst(groups=1)
n318  atom P
n319  atom Q
n320  subst(groups=1)
n321  atom P
n322  imp
n323  imp
n324  atom Q
n325  subst(groups=2)
n326  atom P
n327  atom Q
n328  atom R
n329  mp
n330  mp
n331  subst(groups=1)
n332  atom Q
n333  atom R
n334  subst(groups=1)
n335  atom P
n336  imp
n337  imp
n338  imp
n339  atom Q
n340  subst(groups=2)
n341  atom P
n342  atom Q
n343  atom R
n344  subst(groups=2)
n345  atom P
n346  atom Q
n347  atom R
n348  mp
n349  mp
n350  mp
n351  mp
n352  subst(groups=1)
n353  atom P
n354  atom Q
n355  subst(groups=1)
n356  atom P
n357  imp
n358  imp
n359  imp
n360  atom Q
n361  mp
n362  mp
n363  subst(groups=1)
n364  atom P
n365  atom Q
n366  subst(groups=1)
n367  atom P
n368  imp
n369  imp
n370  atom Q
n371  subst(groups=2)
n372  atom P
n373  atom Q
n374  atom R
n375  mp
n376  mp
n377  subst(groups=1)
n378  atom Q
n379  atom R
n380  subst(groups=1)
n381  atom P
n382  imp
n383  imp
n384  imp
n385  atom Q
n386  subst(groups=2)
n387  atom P
n388  atom Q
n389  atom R
n390  subst(groups=2)
n391  atom P
n392  atom Q
n393  atom R
n394  mp
n395  mp
n396  subst(groups=1)
n397  atom Q
n398  atom R
n399  subst(groups=1)
n400  atom P
n401  imp
n402  imp
n403  imp
n404  atom Q
n405  subst(groups=2)
n406  atom P
n407  atom Q
n408  atom R
n409  subst(groups=2)
n410  atom P
n411  atom Q
n412  atom R

接线：
n14.out → n15.a
n8.out → n15.b
n15.out → n17.a
n16.out → n17.b
n14.out → n90.a
n8.out → n90.b
n9.out → n91.assertion
n8.out → n93.a
n15.out → n93.b
n14.out → n94.a
n93.out → n94.b
n92.out → n91.atom1
n94.out → n91.formula1
n95.out → n91.atom2
n17.out → n91.formula2
n90.out → n89.a
n91.out → n89.b
n9.out → n292.assertion
n293.out → n292.atom1
n17.out → n292.formula1
n294.out → n292.atom2
n14.out → n292.formula2
n14.out → n297.a
n17.out → n297.b
n9.out → n308.assertion
n309.out → n308.atom1
n17.out → n308.formula1
n9.out → n310.assertion
n8.out → n312.a
n17.out → n312.b
n17.out → n313.a
n312.out → n313.b
n311.out → n310.atom1
n313.out → n310.formula1
n314.out → n310.atom2
n17.out → n310.formula2
n308.out → n307.a
n310.out → n307.b
n9.out → n317.assertion
n318.out → n317.atom1
n313.out → n317.formula1
n319.out → n317.atom2
n14.out → n317.formula2
n9.out → n320.assertion
n14.out → n322.a
n313.out → n322.b
n313.out → n323.a
n322.out → n323.b
n321.out → n320.atom1
n323.out → n320.formula1
n324.out → n320.atom2
n17.out → n320.formula2
n317.out → n316.a
n320.out → n316.b
n28.out → n325.assertion
n326.out → n325.atom1
n17.out → n325.formula1
n327.out → n325.atom2
n313.out → n325.formula2
n328.out → n325.atom3
n322.out → n325.formula3
n316.out → n315.a
n325.out → n315.b
n307.out → n306.a
n315.out → n306.b
n28.out → n331.assertion
n332.out → n331.atom1
n17.out → n331.formula1
n333.out → n331.atom2
n312.out → n331.formula2
n9.out → n334.assertion
n14.out → n336.a
n312.out → n336.b
n297.out → n337.a
n336.out → n337.b
n322.out → n338.a
n337.out → n338.b
n335.out → n334.atom1
n338.out → n334.formula1
n339.out → n334.atom2
n17.out → n334.formula2
n331.out → n330.a
n334.out → n330.b
n28.out → n340.assertion
n341.out → n340.atom1
n17.out → n340.formula1
n342.out → n340.atom2
n322.out → n340.formula2
n343.out → n340.atom3
n337.out → n340.formula3
n330.out → n329.a
n340.out → n329.b
n306.out → n305.a
n329.out → n305.b
n28.out → n344.assertion
n345.out → n344.atom1
n17.out → n344.formula1
n346.out → n344.atom2
n297.out → n344.formula2
n347.out → n344.atom3
n336.out → n344.formula3
n305.out → n304.a
n344.out → n304.b
n292.out → n286.a
n304.out → n286.b
n28.out → n352.assertion
n353.out → n352.atom1
n8.out → n352.formula1
n354.out → n352.atom2
n15.out → n352.formula2
n9.out → n355.assertion
n8.out → n357.a
n16.out → n357.b
n93.out → n358.a
n357.out → n358.b
n312.out → n359.a
n358.out → n359.b
n356.out → n355.atom1
n359.out → n355.formula1
n360.out → n355.atom2
n17.out → n355.formula2
n352.out → n351.a
n355.out → n351.b
n9.out → n363.assertion
n364.out → n363.atom1
n359.out → n363.formula1
n365.out → n363.atom2
n14.out → n363.formula2
n9.out → n366.assertion
n14.out → n368.a
n359.out → n368.b
n359.out → n369.a
n368.out → n369.b
n367.out → n366.atom1
n369.out → n366.formula1
n370.out → n366.atom2
n17.out → n366.formula2
n363.out → n362.a
n366.out → n362.b
n28.out → n371.assertion
n372.out → n371.atom1
n17.out → n371.formula1
n373.out → n371.atom2
n359.out → n371.formula2
n374.out → n371.atom3
n368.out → n371.formula3
n362.out → n361.a
n371.out → n361.b
n351.out → n350.a
n361.out → n350.b
n28.out → n377.assertion
n378.out → n377.atom1
n312.out → n377.formula1
n379.out → n377.atom2
n358.out → n377.formula2
n9.out → n380.assertion
n14.out → n382.a
n358.out → n382.b
n336.out → n383.a
n382.out → n383.b
n368.out → n384.a
n383.out → n384.b
n381.out → n380.atom1
n384.out → n380.formula1
n385.out → n380.atom2
n17.out → n380.formula2
n377.out → n376.a
n380.out → n376.b
n28.out → n386.assertion
n387.out → n386.atom1
n17.out → n386.formula1
n388.out → n386.atom2
n368.out → n386.formula2
n389.out → n386.atom3
n383.out → n386.formula3
n376.out → n375.a
n386.out → n375.b
n350.out → n349.a
n375.out → n349.b
n28.out → n390.assertion
n391.out → n390.atom1
n17.out → n390.formula1
n392.out → n390.atom2
n336.out → n390.formula2
n393.out → n390.atom3
n382.out → n390.formula3
n349.out → n348.a
n390.out → n348.b
n286.out → n285.a
n348.out → n285.b
n28.out → n396.assertion
n397.out → n396.atom1
n93.out → n396.formula1
n398.out → n396.atom2
n357.out → n396.formula2
n9.out → n399.assertion
n14.out → n401.a
n357.out → n401.b
n94.out → n402.a
n401.out → n402.b
n382.out → n403.a
n402.out → n403.b
n400.out → n399.atom1
n403.out → n399.formula1
n404.out → n399.atom2
n17.out → n399.formula2
n396.out → n395.a
n399.out → n395.b
n28.out → n405.assertion
n406.out → n405.atom1
n17.out → n405.formula1
n407.out → n405.atom2
n382.out → n405.formula2
n408.out → n405.atom3
n402.out → n405.formula3
n395.out → n394.a
n405.out → n394.b
n285.out → n284.a
n394.out → n284.b
n28.out → n409.assertion
n410.out → n409.atom1
n17.out → n409.formula1
n411.out → n409.atom2
n94.out → n409.formula2
n412.out → n409.atom3
n401.out → n409.formula3
n284.out → n283.a
n409.out → n283.b
n89.out → n1.a
n283.out → n1.b
n1.out → n413.proof
```

</details>

### *21 · 预线性

- 目标：`⊢ ( ( ( P → Q ) → ( P → R ) ) → ( P → ( Q → R ) ) )`
- 提示：用 A2 与交换。
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
n8.out → n10.a
n9.out → n10.b
n8.out → n12.a
n11.out → n12.b
n10.out → n13.a
n12.out → n13.b
n7.out → n6.atom1
n13.out → n6.formula1
n16.out → n17.assertion
n18.out → n17.atom1
n13.out → n17.formula1
n9.out → n22.a
n13.out → n22.b
n16.out → n36.assertion
n37.out → n36.atom1
n9.out → n36.formula1
n38.out → n36.atom2
n8.out → n36.formula2
n16.out → n42.assertion
n43.out → n42.atom1
n10.out → n42.formula1
n44.out → n42.atom2
n13.out → n42.formula2
n16.out → n46.assertion
n13.out → n48.a
n10.out → n48.b
n10.out → n49.a
n48.out → n49.b
n47.out → n46.atom1
n49.out → n46.formula1
n42.out → n40.a
n46.out → n40.b
n25.out → n51.assertion
n52.out → n51.atom1
n9.out → n51.formula1
n53.out → n51.atom2
n10.out → n51.formula2
n54.out → n51.atom3
n48.out → n51.formula3
n40.out → n39.a
n51.out → n39.b
n36.out → n34.a
n39.out → n34.b
n25.out → n59.assertion
n60.out → n59.atom1
n13.out → n59.formula1
n61.out → n59.atom2
n10.out → n59.formula2
n62.out → n59.atom3
n12.out → n59.formula3
n6.out → n57.a
n59.out → n57.b
n16.out → n64.assertion
n13.out → n66.a
n12.out → n66.b
n48.out → n67.a
n66.out → n67.b
n65.out → n64.atom1
n67.out → n64.formula1
n57.out → n56.a
n64.out → n56.b
n25.out → n69.assertion
n70.out → n69.atom1
n9.out → n69.formula1
n71.out → n69.atom2
n48.out → n69.formula2
n72.out → n69.atom3
n66.out → n69.formula3
n56.out → n55.a
n69.out → n55.b
n34.out → n33.a
n55.out → n33.b
n25.out → n74.assertion
n75.out → n74.atom1
n9.out → n74.formula1
n76.out → n74.atom2
n13.out → n74.formula2
n77.out → n74.atom3
n12.out → n74.formula3
n33.out → n32.a
n74.out → n32.b
n16.out → n79.assertion
n9.out → n81.a
n12.out → n81.b
n22.out → n82.a
n81.out → n82.b
n80.out → n79.atom1
n82.out → n79.formula1
n83.out → n79.atom2
n13.out → n79.formula2
n32.out → n31.a
n79.out → n31.b
n25.out → n85.assertion
n86.out → n85.atom1
n13.out → n85.formula1
n87.out → n85.atom2
n22.out → n85.formula2
n88.out → n85.atom3
n81.out → n85.formula3
n31.out → n30.a
n85.out → n30.b
n17.out → n3.a
n30.out → n3.b
n16.out → n92.assertion
n93.out → n92.atom1
n81.out → n92.formula1
n94.out → n92.atom2
n8.out → n92.formula2
n16.out → n96.assertion
n8.out → n98.a
n81.out → n98.b
n81.out → n99.a
n98.out → n99.b
n97.out → n96.atom1
n99.out → n96.formula1
n100.out → n96.atom2
n13.out → n96.formula2
n92.out → n90.a
n96.out → n90.b
n25.out → n102.assertion
n103.out → n102.atom1
n13.out → n102.formula1
n104.out → n102.atom2
n81.out → n102.formula2
n105.out → n102.atom3
n98.out → n102.formula3
n90.out → n89.a
n102.out → n89.b
n3.out → n2.a
n89.out → n2.b
n110.out → n111.assertion
n112.out → n111.atom1
n11.out → n111.formula1
n16.out → n114.assertion
n12.out → n116.a
n11.out → n116.b
n8.out → n117.a
n116.out → n117.b
n115.out → n114.atom1
n117.out → n114.formula1
n118.out → n114.atom2
n13.out → n114.formula2
n111.out → n109.a
n114.out → n109.b
n123.out → n124.assertion
n125.out → n124.atom1
n12.out → n124.formula1
n126.out → n124.atom2
n11.out → n124.formula2
n127.out → n124.atom3
n9.out → n124.formula3
n16.out → n129.assertion
n9.out → n131.a
n11.out → n131.b
n81.out → n132.a
n131.out → n132.b
n116.out → n133.a
n132.out → n133.b
n130.out → n129.atom1
n133.out → n129.formula1
n134.out → n129.atom2
n8.out → n129.formula2
n124.out → n122.a
n129.out → n122.b
n25.out → n136.assertion
n137.out → n136.atom1
n116.out → n136.formula1
n138.out → n136.atom2
n132.out → n136.formula2
n122.out → n121.a
n136.out → n121.b
n16.out → n140.assertion
n8.out → n142.a
n132.out → n142.b
n117.out → n143.a
n142.out → n143.b
n141.out → n140.atom1
n143.out → n140.formula1
n144.out → n140.atom2
n13.out → n140.formula2
n121.out → n120.a
n140.out → n120.b
n25.out → n146.assertion
n147.out → n146.atom1
n13.out → n146.formula1
n148.out → n146.atom2
n117.out → n146.formula2
n149.out → n146.atom3
n142.out → n146.formula3
n120.out → n119.a
n146.out → n119.b
n109.out → n108.a
n119.out → n108.b
n25.out → n153.assertion
n154.out → n153.atom1
n81.out → n153.formula1
n155.out → n153.atom2
n131.out → n153.formula2
n16.out → n157.assertion
n8.out → n159.a
n131.out → n159.b
n98.out → n160.a
n159.out → n160.b
n142.out → n161.a
n160.out → n161.b
n158.out → n157.atom1
n161.out → n157.formula1
n162.out → n157.atom2
n13.out → n157.formula2
n153.out → n151.a
n157.out → n151.b
n25.out → n164.assertion
n165.out → n164.atom1
n13.out → n164.formula1
n166.out → n164.atom2
n142.out → n164.formula2
n167.out → n164.atom3
n160.out → n164.formula3
n151.out → n150.a
n164.out → n150.b
n108.out → n107.a
n150.out → n107.b
n25.out → n169.assertion
n170.out → n169.atom1
n13.out → n169.formula1
n171.out → n169.atom2
n98.out → n169.formula2
n172.out → n169.atom3
n159.out → n169.formula3
n107.out → n106.a
n169.out → n106.b
n2.out → n1.a
n106.out → n1.b
n1.out → n173.proof
```

</details>

### *22 · 反证法

- 目标：`⊢ ( ( ¬ P → P ) → P )`
- 提示：用 A3 把 ¬A→A 翻成 ¬A→¬¬A，再配合双重否定。
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
n14  定理 *14
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
n36  axiom A3
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
n5.out → n6.a
n6.out → n7.a
n5.out → n7.b
n4.out → n3.atom1
n7.out → n3.formula1
n14.out → n15.assertion
n7.out → n17.a
n16.out → n15.atom1
n17.out → n15.formula1
n18.out → n19.assertion
n20.out → n19.atom1
n6.out → n19.formula1
n21.out → n19.atom2
n5.out → n19.formula2
n22.out → n19.atom3
n17.out → n19.formula3
n15.out → n13.a
n19.out → n13.b
n6.out → n26.a
n17.out → n26.b
n36.out → n37.assertion
n38.out → n37.atom1
n7.out → n37.formula1
n23.out → n40.assertion
n7.out → n42.a
n5.out → n42.b
n26.out → n43.a
n42.out → n43.b
n41.out → n40.atom1
n43.out → n40.formula1
n44.out → n40.atom2
n7.out → n40.formula2
n37.out → n35.a
n40.out → n35.b
n18.out → n46.assertion
n47.out → n46.atom1
n7.out → n46.formula1
n48.out → n46.atom2
n26.out → n46.formula2
n49.out → n46.atom3
n42.out → n46.formula3
n35.out → n34.a
n46.out → n34.b
n13.out → n9.a
n34.out → n9.b
n18.out → n51.assertion
n52.out → n51.atom1
n7.out → n51.formula1
n53.out → n51.atom2
n7.out → n51.formula2
n54.out → n51.atom3
n5.out → n51.formula3
n9.out → n8.a
n51.out → n8.b
n3.out → n1.a
n8.out → n1.b
n1.out → n55.proof
```

</details>

### *23 · 简化蕴涵

- 目标：`⊢ ( ¬ ( P → ¬ Q ) → Q )`
- 提示：把 ¬B 当前件，用 A3 得到逆否。
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
n57  定理 *13
n136  axiom A3
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
n12.out → n171.assertion
n172.out → n171.atom1
n9.out → n171.formula1
n20.out → n174.a
n174.out → n175.a
n175.out → n176.a
n173.out → n171.atom2
n176.out → n171.formula2
n176.out → n180.a
n9.out → n180.b
n57.out → n194.assertion
n195.out → n194.atom1
n174.out → n194.formula1
n12.out → n199.assertion
n200.out → n199.atom1
n174.out → n199.formula1
n201.out → n199.atom2
n9.out → n199.formula2
n12.out → n203.assertion
n9.out → n205.a
n174.out → n205.b
n174.out → n206.a
n205.out → n206.b
n204.out → n203.atom1
n206.out → n203.formula1
n207.out → n203.atom2
n176.out → n203.formula2
n199.out → n197.a
n203.out → n197.b
n23.out → n209.assertion
n210.out → n209.atom1
n176.out → n209.formula1
n211.out → n209.atom2
n174.out → n209.formula2
n212.out → n209.atom3
n205.out → n209.formula3
n197.out → n196.a
n209.out → n196.b
n194.out → n192.a
n196.out → n192.b
n23.out → n241.assertion
n242.out → n241.atom1
n176.out → n241.formula1
n243.out → n241.atom2
n9.out → n241.formula2
n244.out → n241.atom3
n174.out → n241.formula3
n192.out → n190.a
n241.out → n190.b
n12.out → n246.assertion
n176.out → n248.a
n174.out → n248.b
n180.out → n249.a
n248.out → n249.b
n247.out → n246.atom1
n249.out → n246.formula1
n250.out → n246.atom2
n9.out → n246.formula2
n190.out → n189.a
n246.out → n189.b
n23.out → n252.assertion
n253.out → n252.atom1
n9.out → n252.formula1
n254.out → n252.atom2
n180.out → n252.formula2
n255.out → n252.atom3
n248.out → n252.formula3
n189.out → n188.a
n252.out → n188.b
n171.out → n166.a
n188.out → n166.b
n136.out → n259.assertion
n260.out → n259.atom1
n175.out → n259.formula1
n261.out → n259.atom2
n20.out → n259.formula2
n12.out → n263.assertion
n20.out → n265.a
n175.out → n265.b
n248.out → n266.a
n265.out → n266.b
n264.out → n263.atom1
n266.out → n263.formula1
n267.out → n263.atom2
n9.out → n263.formula2
n259.out → n257.a
n263.out → n257.b
n23.out → n269.assertion
n270.out → n269.atom1
n9.out → n269.formula1
n271.out → n269.atom2
n248.out → n269.formula2
n272.out → n269.atom3
n265.out → n269.formula3
n257.out → n256.a
n269.out → n256.b
n166.out → n165.a
n256.out → n165.b
n23.out → n274.assertion
n275.out → n274.atom1
n9.out → n274.formula1
n276.out → n274.atom2
n20.out → n274.formula2
n277.out → n274.atom3
n175.out → n274.formula3
n165.out → n164.a
n274.out → n164.b
n13.out → n2.a
n164.out → n2.b
n136.out → n279.assertion
n280.out → n279.atom1
n8.out → n279.formula1
n281.out → n279.atom2
n174.out → n279.formula2
n2.out → n1.a
n279.out → n1.b
n1.out → n282.proof
```

</details>

### *24 · 皮尔士律

- 目标：`⊢ ( ( ( P → Q ) → P ) → P )`
- 提示：假设 (A→B)→A，再分 A 与 ¬A 两种情况。
- 参考解：189 个模块 / 320 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n290  [target]
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
n16  mp
n17  mp
n18  定理 *14
n19  mp
n20  mp
n21  mp
n26  not
n29  axiom A1
n30  subst(groups=1)
n31  atom P
n32  atom Q
n33  not
n34  not
n35  not
n39  imp
n42  axiom A2
n47  mp
n48  mp
n49  mp
n51  mp
n52  定理 *13
n53  subst(groups=0)
n54  atom P
n55  mp
n56  mp
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
n100  subst(groups=2)
n101  atom P
n102  atom Q
n103  atom R
n105  subst(groups=1)
n106  atom P
n107  imp
n108  imp
n109  atom Q
n111  subst(groups=2)
n112  atom P
n113  atom Q
n114  atom R
n115  mp
n116  mp
n117  axiom A3
n118  subst(groups=1)
n119  atom P
n120  atom Q
n122  subst(groups=1)
n123  atom P
n124  imp
n125  imp
n126  atom Q
n128  subst(groups=2)
n129  atom P
n130  atom Q
n131  atom R
n133  subst(groups=2)
n134  atom P
n135  atom Q
n136  atom R
n138  subst(groups=0)
n139  atom Q
n141  subst(groups=1)
n142  atom P
n143  imp
n144  atom Q
n145  mp
n146  mp
n147  mp
n148  mp
n149  定理 *12
n151  subst(groups=1)
n152  atom P
n153  not
n154  imp
n155  atom Q
n157  subst(groups=2)
n158  atom P
n159  atom Q
n160  atom R
n162  subst(groups=1)
n163  atom P
n164  imp
n165  imp
n166  atom Q
n168  subst(groups=2)
n169  atom P
n170  atom Q
n171  atom R
n172  mp
n173  mp
n175  subst(groups=1)
n176  atom P
n177  atom Q
n179  subst(groups=1)
n180  atom P
n181  imp
n182  imp
n183  atom Q
n185  subst(groups=2)
n186  atom P
n187  atom Q
n188  atom R
n189  mp
n190  mp
n208  subst(groups=1)
n209  atom P
n210  atom Q
n214  imp
n222  mp
n223  mp
n225  subst(groups=2)
n226  atom P
n227  atom Q
n228  atom R
n230  subst(groups=1)
n231  atom P
n232  imp
n233  imp
n234  imp
n235  atom Q
n237  subst(groups=2)
n238  atom P
n239  atom Q
n240  atom R
n242  subst(groups=2)
n243  atom P
n244  atom Q
n245  atom R
n246  mp
n247  mp
n248  mp
n250  subst(groups=0)
n251  atom Q
n252  not
n254  subst(groups=2)
n255  atom P
n256  atom Q
n257  atom R
n259  subst(groups=1)
n260  atom P
n261  imp
n262  imp
n263  atom Q
n265  subst(groups=2)
n266  atom P
n267  atom Q
n268  atom R
n269  mp
n270  mp
n272  subst(groups=0)
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
n286  subst(groups=2)
n287  atom P
n288  atom Q
n289  atom R

接线：
n2.out → n3.assertion
n5.out → n7.a
n6.out → n7.b
n7.out → n8.a
n5.out → n8.b
n4.out → n3.atom1
n8.out → n3.formula1
n5.out → n26.a
n29.out → n30.assertion
n31.out → n30.atom1
n26.out → n30.formula1
n7.out → n33.a
n33.out → n34.a
n34.out → n35.a
n32.out → n30.atom2
n35.out → n30.formula2
n35.out → n39.a
n26.out → n39.b
n52.out → n53.assertion
n54.out → n53.atom1
n33.out → n53.formula1
n29.out → n58.assertion
n59.out → n58.atom1
n33.out → n58.formula1
n60.out → n58.atom2
n26.out → n58.formula2
n29.out → n62.assertion
n26.out → n64.a
n33.out → n64.b
n33.out → n65.a
n64.out → n65.b
n63.out → n62.atom1
n65.out → n62.formula1
n66.out → n62.atom2
n35.out → n62.formula2
n58.out → n56.a
n62.out → n56.b
n42.out → n68.assertion
n69.out → n68.atom1
n35.out → n68.formula1
n70.out → n68.atom2
n33.out → n68.formula2
n71.out → n68.atom3
n64.out → n68.formula3
n56.out → n55.a
n68.out → n55.b
n53.out → n51.a
n55.out → n51.b
n42.out → n100.assertion
n101.out → n100.atom1
n35.out → n100.formula1
n102.out → n100.atom2
n26.out → n100.formula2
n103.out → n100.atom3
n33.out → n100.formula3
n51.out → n49.a
n100.out → n49.b
n29.out → n105.assertion
n35.out → n107.a
n33.out → n107.b
n39.out → n108.a
n107.out → n108.b
n106.out → n105.atom1
n108.out → n105.formula1
n109.out → n105.atom2
n26.out → n105.formula2
n49.out → n48.a
n105.out → n48.b
n42.out → n111.assertion
n112.out → n111.atom1
n26.out → n111.formula1
n113.out → n111.atom2
n39.out → n111.formula2
n114.out → n111.atom3
n107.out → n111.formula3
n48.out → n47.a
n111.out → n47.b
n30.out → n21.a
n47.out → n21.b
n117.out → n118.assertion
n119.out → n118.atom1
n34.out → n118.formula1
n120.out → n118.atom2
n7.out → n118.formula2
n29.out → n122.assertion
n7.out → n124.a
n34.out → n124.b
n107.out → n125.a
n124.out → n125.b
n123.out → n122.atom1
n125.out → n122.formula1
n126.out → n122.atom2
n26.out → n122.formula2
n118.out → n116.a
n122.out → n116.b
n42.out → n128.assertion
n129.out → n128.atom1
n26.out → n128.formula1
n130.out → n128.atom2
n107.out → n128.formula2
n131.out → n128.atom3
n124.out → n128.formula3
n116.out → n115.a
n128.out → n115.b
n21.out → n20.a
n115.out → n20.b
n42.out → n133.assertion
n134.out → n133.atom1
n26.out → n133.formula1
n135.out → n133.atom2
n7.out → n133.formula2
n136.out → n133.atom3
n34.out → n133.formula3
n20.out → n19.a
n133.out → n19.b
n18.out → n17.a
n19.out → n17.b
n117.out → n138.assertion
n139.out → n138.atom1
n33.out → n138.formula1
n17.out → n16.a
n138.out → n16.b
n29.out → n141.assertion
n33.out → n143.a
n5.out → n143.b
n142.out → n141.atom1
n143.out → n141.formula1
n144.out → n141.atom2
n8.out → n141.formula2
n16.out → n15.a
n141.out → n15.b
n29.out → n151.assertion
n26.out → n153.a
n5.out → n154.a
n153.out → n154.b
n152.out → n151.atom1
n154.out → n151.formula1
n155.out → n151.atom2
n33.out → n151.formula2
n149.out → n148.a
n151.out → n148.b
n42.out → n157.assertion
n158.out → n157.atom1
n33.out → n157.formula1
n159.out → n157.atom2
n5.out → n157.formula2
n160.out → n157.atom3
n153.out → n157.formula3
n148.out → n147.a
n157.out → n147.b
n29.out → n162.assertion
n33.out → n164.a
n153.out → n164.b
n143.out → n165.a
n164.out → n165.b
n163.out → n162.atom1
n165.out → n162.formula1
n166.out → n162.atom2
n8.out → n162.formula2
n147.out → n146.a
n162.out → n146.b
n42.out → n168.assertion
n169.out → n168.atom1
n8.out → n168.formula1
n170.out → n168.atom2
n143.out → n168.formula2
n171.out → n168.atom3
n164.out → n168.formula3
n146.out → n145.a
n168.out → n145.b
n15.out → n14.a
n145.out → n14.b
n117.out → n175.assertion
n176.out → n175.atom1
n7.out → n175.formula1
n177.out → n175.atom2
n26.out → n175.formula2
n29.out → n179.assertion
n26.out → n181.a
n7.out → n181.b
n164.out → n182.a
n181.out → n182.b
n180.out → n179.atom1
n182.out → n179.formula1
n183.out → n179.atom2
n8.out → n179.formula2
n175.out → n173.a
n179.out → n173.b
n42.out → n185.assertion
n186.out → n185.atom1
n8.out → n185.formula1
n187.out → n185.atom2
n164.out → n185.formula2
n188.out → n185.atom3
n181.out → n185.formula3
n173.out → n172.a
n185.out → n172.b
n14.out → n13.a
n172.out → n13.b
n29.out → n208.assertion
n209.out → n208.atom1
n8.out → n208.formula1
n210.out → n208.atom2
n26.out → n208.formula2
n26.out → n214.a
n8.out → n214.b
n42.out → n225.assertion
n226.out → n225.atom1
n26.out → n225.formula1
n227.out → n225.atom2
n7.out → n225.formula2
n228.out → n225.atom3
n5.out → n225.formula3
n29.out → n230.assertion
n26.out → n232.a
n5.out → n232.b
n181.out → n233.a
n232.out → n233.b
n214.out → n234.a
n233.out → n234.b
n231.out → n230.atom1
n234.out → n230.formula1
n235.out → n230.atom2
n8.out → n230.formula2
n225.out → n223.a
n230.out → n223.b
n42.out → n237.assertion
n238.out → n237.atom1
n8.out → n237.formula1
n239.out → n237.atom2
n214.out → n237.formula2
n240.out → n237.atom3
n233.out → n237.formula3
n223.out → n222.a
n237.out → n222.b
n208.out → n190.a
n222.out → n190.b
n42.out → n242.assertion
n243.out → n242.atom1
n8.out → n242.formula1
n244.out → n242.atom2
n181.out → n242.formula2
n245.out → n242.atom3
n232.out → n242.formula3
n190.out → n189.a
n242.out → n189.b
n13.out → n12.a
n189.out → n12.b
n18.out → n250.assertion
n8.out → n252.a
n251.out → n250.atom1
n252.out → n250.formula1
n42.out → n254.assertion
n255.out → n254.atom1
n26.out → n254.formula1
n256.out → n254.atom2
n5.out → n254.formula2
n257.out → n254.atom3
n252.out → n254.formula3
n250.out → n248.a
n254.out → n248.b
n29.out → n259.assertion
n26.out → n261.a
n252.out → n261.b
n232.out → n262.a
n261.out → n262.b
n260.out → n259.atom1
n262.out → n259.formula1
n263.out → n259.atom2
n8.out → n259.formula2
n248.out → n247.a
n259.out → n247.b
n42.out → n265.assertion
n266.out → n265.atom1
n8.out → n265.formula1
n267.out → n265.atom2
n232.out → n265.formula2
n268.out → n265.atom3
n261.out → n265.formula3
n247.out → n246.a
n265.out → n246.b
n12.out → n11.a
n246.out → n11.b
n117.out → n272.assertion
n273.out → n272.atom1
n8.out → n272.formula1
n29.out → n275.assertion
n8.out → n277.a
n5.out → n277.b
n261.out → n278.a
n277.out → n278.b
n276.out → n275.atom1
n278.out → n275.formula1
n279.out → n275.atom2
n8.out → n275.formula2
n272.out → n270.a
n275.out → n270.b
n42.out → n281.assertion
n282.out → n281.atom1
n8.out → n281.formula1
n283.out → n281.atom2
n261.out → n281.formula2
n284.out → n281.atom3
n277.out → n281.formula3
n270.out → n269.a
n281.out → n269.b
n11.out → n10.a
n269.out → n10.b
n42.out → n286.assertion
n287.out → n286.atom1
n8.out → n286.formula1
n288.out → n286.atom2
n8.out → n286.formula2
n289.out → n286.atom3
n5.out → n286.formula3
n10.out → n9.a
n286.out → n9.b
n3.out → n1.a
n9.out → n1.b
n1.out → n290.proof
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

### *25 · 前件提取

- 目标：`⊢ ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → G ( x ) ) )`
- 提示：把 P 从全称前件里提出/收回。
- 参考解：19 个模块 / 25 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n20  [target]
n1  mp
n2  mp
n3  axiom A4(v=x)
n4  subst(groups=0)
n5  atom P
n6  term x
n7  pred G
n8  axiom A1
n9  subst(groups=1)
n10  atom P
n11  all(v=x)
n12  imp
n13  atom Q
n14  pred F
n15  axiom A2
n16  subst(groups=2)
n17  atom P
n18  atom Q
n19  atom R

接线：
n3.out → n4.assertion
n6.out → n7.t1
n5.out → n4.atom1
n7.out → n4.formula1
n8.out → n9.assertion
n7.out → n11.a
n11.out → n12.a
n7.out → n12.b
n10.out → n9.atom1
n12.out → n9.formula1
n6.out → n14.t1
n13.out → n9.atom2
n14.out → n9.formula2
n4.out → n2.a
n9.out → n2.b
n15.out → n16.assertion
n17.out → n16.atom1
n14.out → n16.formula1
n18.out → n16.atom2
n11.out → n16.formula2
n19.out → n16.atom3
n7.out → n16.formula3
n2.out → n1.a
n16.out → n1.b
n1.out → n20.proof
```

</details>

### *26 · 全称弱化

- 目标：`⊢ ( ∀ x F ( x ) → ∀ x ( G ( x ) → F ( x ) ) )`
- 提示：在 ∀ 下用 A1，再分配。
- 参考解：14 个模块 / 18 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n15  [target]
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
n12  atom P
n13  atom Q
n14  imp

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
n12.out → n11.atom1
n7.out → n11.formula1
n9.out → n14.a
n7.out → n14.b
n13.out → n11.atom2
n14.out → n11.formula2
n2.out → n1.a
n11.out → n1.b
n1.out → n15.proof
```

</details>

### *27 · 嵌套全称引入

- 目标：`⊢ ( F ( x ) → ( G ( y ) → ∀ x G ( y ) ) )`
- 提示：A1 与全称引入。
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

### *28 · 双重量词消去

- 目标：`⊢ ( ∀ x ∀ y F ( x ) → F ( x ) )`
- 提示：两次全称例化。
- 参考解：23 个模块 / 30 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n24  [target]
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
n12  atom P
n13  axiom A1
n14  subst(groups=1)
n15  atom P
n16  imp
n17  atom Q
n18  all(v=x)
n19  axiom A2
n20  subst(groups=2)
n21  atom P
n22  atom Q
n23  atom R

接线：
n2.out → n3.assertion
n5.out → n6.t1
n6.out → n7.a
n4.out → n3.atom1
n7.out → n3.formula1
n10.out → n11.assertion
n12.out → n11.atom1
n6.out → n11.formula1
n13.out → n14.assertion
n7.out → n16.a
n6.out → n16.b
n15.out → n14.atom1
n16.out → n14.formula1
n7.out → n18.a
n17.out → n14.atom2
n18.out → n14.formula2
n11.out → n9.a
n14.out → n9.b
n19.out → n20.assertion
n21.out → n20.atom1
n18.out → n20.formula1
n22.out → n20.atom2
n7.out → n20.formula2
n23.out → n20.atom3
n6.out → n20.formula3
n9.out → n8.a
n20.out → n8.b
n3.out → n1.a
n8.out → n1.b
n1.out → n24.proof
```

</details>

### *29 · 三段全称分配

- 目标：`⊢ ( ∀ x ( F ( x ) → ( G ( x ) → H ( x ) ) ) → ( ∀ x F ( x ) → ( ∀ x G ( x ) → ∀ x H ( x ) ) ) )`
- 提示：连续两次全称分配。
- 参考解：44 个模块 / 67 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n48  [target]
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
n16  subst(groups=1)
n17  atom P
n18  atom Q
n19  axiom A1
n20  subst(groups=1)
n21  atom P
n22  all(v=x)
n23  all(v=x)
n24  all(v=x)
n25  imp
n26  imp
n27  atom Q
n28  all(v=x)
n29  axiom A2
n30  subst(groups=2)
n31  atom P
n32  atom Q
n33  atom R
n35  subst(groups=1)
n36  atom P
n37  imp
n38  imp
n39  imp
n40  atom Q
n41  imp
n42  all(v=x)
n44  subst(groups=2)
n45  atom P
n46  atom Q
n47  atom R

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
n2.out → n16.assertion
n17.out → n16.atom1
n8.out → n16.formula1
n18.out → n16.atom2
n9.out → n16.formula2
n19.out → n20.assertion
n10.out → n22.a
n8.out → n23.a
n9.out → n24.a
n23.out → n25.a
n24.out → n25.b
n22.out → n26.a
n25.out → n26.b
n21.out → n20.atom1
n26.out → n20.formula1
n6.out → n28.a
n27.out → n20.atom2
n28.out → n20.formula2
n16.out → n14.a
n20.out → n14.b
n29.out → n30.assertion
n31.out → n30.atom1
n28.out → n30.formula1
n32.out → n30.atom2
n22.out → n30.formula2
n33.out → n30.atom3
n25.out → n30.formula3
n14.out → n13.a
n30.out → n13.b
n19.out → n35.assertion
n28.out → n37.a
n22.out → n37.b
n28.out → n38.a
n25.out → n38.b
n37.out → n39.a
n38.out → n39.b
n36.out → n35.atom1
n39.out → n35.formula1
n6.out → n41.a
n10.out → n41.b
n41.out → n42.a
n40.out → n35.atom2
n42.out → n35.formula2
n13.out → n12.a
n35.out → n12.b
n29.out → n44.assertion
n45.out → n44.atom1
n42.out → n44.formula1
n46.out → n44.atom2
n37.out → n44.formula2
n47.out → n44.atom3
n38.out → n44.formula3
n12.out → n11.a
n44.out → n11.b
n3.out → n1.a
n11.out → n1.b
n1.out → n48.proof
```

</details>

### *30 · 混合三段论

- 目标：`⊢ ( ( F ( x ) → ∀ x ( G ( x ) → H ( x ) ) ) → ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )`
- 提示：分配后接三段论。
- 参考解：45 个模块 / 71 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n49  [target]
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
n13  atom P
n14  imp
n15  all(v=x)
n16  all(v=x)
n17  all(v=x)
n18  imp
n19  imp
n20  atom Q
n21  pred F
n22  axiom A2
n23  subst(groups=2)
n24  atom P
n25  atom Q
n26  atom R
n27  mp
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
n41  imp
n42  atom Q
n43  imp
n45  subst(groups=2)
n46  atom P
n47  atom Q
n48  atom R

接线：
n4.out → n5.assertion
n7.out → n8.t1
n6.out → n5.atom1
n8.out → n5.formula1
n7.out → n10.t1
n9.out → n5.atom2
n10.out → n5.formula2
n11.out → n12.assertion
n8.out → n14.a
n10.out → n14.b
n14.out → n15.a
n8.out → n16.a
n10.out → n17.a
n16.out → n18.a
n17.out → n18.b
n15.out → n19.a
n18.out → n19.b
n13.out → n12.atom1
n19.out → n12.formula1
n7.out → n21.t1
n20.out → n12.atom2
n21.out → n12.formula2
n5.out → n3.a
n12.out → n3.b
n22.out → n23.assertion
n24.out → n23.atom1
n21.out → n23.formula1
n25.out → n23.atom2
n15.out → n23.formula2
n26.out → n23.atom3
n18.out → n23.formula3
n3.out → n2.a
n23.out → n2.b
n22.out → n30.assertion
n31.out → n30.atom1
n21.out → n30.formula1
n32.out → n30.atom2
n16.out → n30.formula2
n33.out → n30.atom3
n17.out → n30.formula3
n11.out → n35.assertion
n21.out → n37.a
n18.out → n37.b
n21.out → n38.a
n16.out → n38.b
n21.out → n39.a
n17.out → n39.b
n38.out → n40.a
n39.out → n40.b
n37.out → n41.a
n40.out → n41.b
n36.out → n35.atom1
n41.out → n35.formula1
n21.out → n43.a
n15.out → n43.b
n42.out → n35.atom2
n43.out → n35.formula2
n30.out → n28.a
n35.out → n28.b
n22.out → n45.assertion
n46.out → n45.atom1
n43.out → n45.formula1
n47.out → n45.atom2
n37.out → n45.formula2
n48.out → n45.atom3
n40.out → n45.formula3
n28.out → n27.a
n45.out → n27.b
n2.out → n1.a
n27.out → n1.b
n1.out → n49.proof
```

</details>

### *31 · 全称三段论

- 目标：`⊢ ( ∀ x ( G ( x ) → H ( x ) ) → ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )`
- 提示：分配 + HS。
- 参考解：48 个模块 / 76 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n53  [target]
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
n14  atom P
n15  all(v=x)
n16  all(v=x)
n17  imp
n18  atom Q
n19  pred F
n21  subst(groups=1)
n22  atom P
n23  imp
n24  imp
n25  atom Q
n26  imp
n27  all(v=x)
n28  axiom A2
n29  subst(groups=2)
n30  atom P
n31  atom Q
n32  atom R
n33  mp
n34  mp
n36  subst(groups=2)
n37  atom P
n38  atom Q
n39  atom R
n41  subst(groups=1)
n42  atom P
n43  imp
n44  imp
n45  imp
n46  imp
n47  atom Q
n49  subst(groups=2)
n50  atom P
n51  atom Q
n52  atom R

接线：
n3.out → n4.assertion
n6.out → n7.t1
n5.out → n4.atom1
n7.out → n4.formula1
n6.out → n9.t1
n8.out → n4.atom2
n9.out → n4.formula2
n12.out → n13.assertion
n7.out → n15.a
n9.out → n16.a
n15.out → n17.a
n16.out → n17.b
n14.out → n13.atom1
n17.out → n13.formula1
n6.out → n19.t1
n18.out → n13.atom2
n19.out → n13.formula2
n12.out → n21.assertion
n19.out → n23.a
n17.out → n23.b
n17.out → n24.a
n23.out → n24.b
n22.out → n21.atom1
n24.out → n21.formula1
n7.out → n26.a
n9.out → n26.b
n26.out → n27.a
n25.out → n21.atom2
n27.out → n21.formula2
n13.out → n11.a
n21.out → n11.b
n28.out → n29.assertion
n30.out → n29.atom1
n27.out → n29.formula1
n31.out → n29.atom2
n17.out → n29.formula2
n32.out → n29.atom3
n23.out → n29.formula3
n11.out → n10.a
n29.out → n10.b
n4.out → n2.a
n10.out → n2.b
n28.out → n36.assertion
n37.out → n36.atom1
n19.out → n36.formula1
n38.out → n36.atom2
n15.out → n36.formula2
n39.out → n36.atom3
n16.out → n36.formula3
n12.out → n41.assertion
n19.out → n43.a
n15.out → n43.b
n19.out → n44.a
n16.out → n44.b
n43.out → n45.a
n44.out → n45.b
n23.out → n46.a
n45.out → n46.b
n42.out → n41.atom1
n46.out → n41.formula1
n47.out → n41.atom2
n27.out → n41.formula2
n36.out → n34.a
n41.out → n34.b
n28.out → n49.assertion
n50.out → n49.atom1
n27.out → n49.formula1
n51.out → n49.atom2
n23.out → n49.formula2
n52.out → n49.atom3
n45.out → n49.formula3
n34.out → n33.a
n49.out → n33.b
n2.out → n1.a
n33.out → n1.b
n1.out → n53.proof
```

</details>

### *32 · 双层分配

- 目标：`⊢ ( ∀ x ∀ y ( F ( x ) → G ( x ) ) → ( ∀ x ∀ y F ( x ) → ∀ x ∀ y G ( x ) ) )`
- 提示：两次 A5。
- 参考解：53 个模块 / 79 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n57  [target]
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
n13  atom P
n14  imp
n15  all(v=y)
n16  atom Q
n17  all(v=y)
n18  all(v=y)
n19  imp
n20  mp
n21  mp
n22  mp
n23  mp
n25  subst(groups=1)
n26  atom P
n27  atom Q
n28  axiom A1
n29  subst(groups=1)
n30  atom P
n31  all(v=x)
n32  all(v=x)
n33  all(v=x)
n34  imp
n35  imp
n36  atom Q
n37  all(v=x)
n38  axiom A2
n39  subst(groups=2)
n40  atom P
n41  atom Q
n42  atom R
n44  subst(groups=1)
n45  atom P
n46  imp
n47  imp
n48  imp
n49  atom Q
n50  imp
n51  all(v=x)
n53  subst(groups=2)
n54  atom P
n55  atom Q
n56  atom R

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
n7.out → n14.a
n9.out → n14.b
n14.out → n15.a
n13.out → n12.atom1
n15.out → n12.formula1
n7.out → n17.a
n9.out → n18.a
n17.out → n19.a
n18.out → n19.b
n16.out → n12.atom2
n19.out → n12.formula2
n11.out → n25.assertion
n26.out → n25.atom1
n17.out → n25.formula1
n27.out → n25.atom2
n18.out → n25.formula2
n28.out → n29.assertion
n19.out → n31.a
n17.out → n32.a
n18.out → n33.a
n32.out → n34.a
n33.out → n34.b
n31.out → n35.a
n34.out → n35.b
n30.out → n29.atom1
n35.out → n29.formula1
n15.out → n37.a
n36.out → n29.atom2
n37.out → n29.formula2
n25.out → n23.a
n29.out → n23.b
n38.out → n39.assertion
n40.out → n39.atom1
n37.out → n39.formula1
n41.out → n39.atom2
n31.out → n39.formula2
n42.out → n39.atom3
n34.out → n39.formula3
n23.out → n22.a
n39.out → n22.b
n28.out → n44.assertion
n37.out → n46.a
n31.out → n46.b
n37.out → n47.a
n34.out → n47.b
n46.out → n48.a
n47.out → n48.b
n45.out → n44.atom1
n48.out → n44.formula1
n15.out → n50.a
n19.out → n50.b
n50.out → n51.a
n49.out → n44.atom2
n51.out → n44.formula2
n22.out → n21.a
n44.out → n21.b
n38.out → n53.assertion
n54.out → n53.atom1
n51.out → n53.formula1
n55.out → n53.atom2
n46.out → n53.formula2
n56.out → n53.atom3
n47.out → n53.formula3
n21.out → n20.a
n53.out → n20.b
n12.out → n10.a
n20.out → n10.b
n2.out → n1.a
n10.out → n1.b
n1.out → n57.proof
```

</details>

### *33 · 二次回指

- 目标：`⊢ ( F ( x ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) )`
- 提示：A1 连续两次代入。
- 参考解：25 个模块 / 38 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n57  [target]
n1  mp
n4  axiom A1
n7  term x
n8  pred F
n16  axiom A2
n24  subst(groups=1)
n25  atom P
n26  atom Q
n27  pred H
n31  imp
n39  mp
n40  mp
n42  subst(groups=1)
n43  atom P
n44  atom Q
n45  pred G
n47  subst(groups=1)
n48  atom P
n49  imp
n50  imp
n51  atom Q
n53  subst(groups=2)
n54  atom P
n55  atom Q
n56  atom R

接线：
n7.out → n8.t1
n4.out → n24.assertion
n25.out → n24.atom1
n8.out → n24.formula1
n7.out → n27.t1
n26.out → n24.atom2
n27.out → n24.formula2
n27.out → n31.a
n8.out → n31.b
n4.out → n42.assertion
n43.out → n42.atom1
n31.out → n42.formula1
n7.out → n45.t1
n44.out → n42.atom2
n45.out → n42.formula2
n4.out → n47.assertion
n45.out → n49.a
n31.out → n49.b
n31.out → n50.a
n49.out → n50.b
n48.out → n47.atom1
n50.out → n47.formula1
n51.out → n47.atom2
n8.out → n47.formula2
n42.out → n40.a
n47.out → n40.b
n16.out → n53.assertion
n54.out → n53.atom1
n8.out → n53.formula1
n55.out → n53.atom2
n31.out → n53.formula2
n56.out → n53.atom3
n49.out → n53.formula3
n40.out → n39.a
n53.out → n39.b
n24.out → n1.a
n39.out → n1.b
n1.out → n57.proof
```

</details>

### *34 · 四段分配

- 目标：`⊢ ( ∀ x ( F ( x ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) ) → ( ∀ x F ( x ) → ( ∀ x G ( x ) → ( ∀ x H ( x ) → ∀ x F ( x ) ) ) ) )`
- 提示：连续三次分配。
- 参考解：72 个模块 / 117 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n81  [target]
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
n19  atom P
n20  atom Q
n21  mp
n22  mp
n23  mp
n24  mp
n26  subst(groups=1)
n27  atom P
n28  atom Q
n29  axiom A1
n30  subst(groups=1)
n31  atom P
n32  all(v=x)
n33  all(v=x)
n34  all(v=x)
n35  imp
n36  imp
n37  atom Q
n38  all(v=x)
n39  axiom A2
n40  subst(groups=2)
n41  atom P
n42  atom Q
n43  atom R
n45  subst(groups=1)
n46  atom P
n47  imp
n48  imp
n49  imp
n50  atom Q
n51  all(v=x)
n53  subst(groups=2)
n54  atom P
n55  atom Q
n56  atom R
n58  subst(groups=1)
n59  atom P
n60  imp
n61  atom Q
n63  subst(groups=2)
n64  atom P
n65  atom Q
n66  atom R
n68  subst(groups=1)
n69  atom P
n70  imp
n71  imp
n72  imp
n73  atom Q
n74  imp
n75  all(v=x)
n77  subst(groups=2)
n78  atom P
n79  atom Q
n80  atom R

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
n19.out → n18.atom1
n8.out → n18.formula1
n20.out → n18.atom2
n10.out → n18.formula2
n2.out → n26.assertion
n27.out → n26.atom1
n9.out → n26.formula1
n28.out → n26.atom2
n6.out → n26.formula2
n29.out → n30.assertion
n10.out → n32.a
n9.out → n33.a
n6.out → n34.a
n33.out → n35.a
n34.out → n35.b
n32.out → n36.a
n35.out → n36.b
n31.out → n30.atom1
n36.out → n30.formula1
n8.out → n38.a
n37.out → n30.atom2
n38.out → n30.formula2
n26.out → n24.a
n30.out → n24.b
n39.out → n40.assertion
n41.out → n40.atom1
n38.out → n40.formula1
n42.out → n40.atom2
n32.out → n40.formula2
n43.out → n40.atom3
n35.out → n40.formula3
n24.out → n23.a
n40.out → n23.b
n29.out → n45.assertion
n38.out → n47.a
n32.out → n47.b
n38.out → n48.a
n35.out → n48.b
n47.out → n49.a
n48.out → n49.b
n46.out → n45.atom1
n49.out → n45.formula1
n11.out → n51.a
n50.out → n45.atom2
n51.out → n45.formula2
n23.out → n22.a
n45.out → n22.b
n39.out → n53.assertion
n54.out → n53.atom1
n51.out → n53.formula1
n55.out → n53.atom2
n47.out → n53.formula2
n56.out → n53.atom3
n48.out → n53.formula3
n22.out → n21.a
n53.out → n21.b
n18.out → n16.a
n21.out → n16.b
n29.out → n58.assertion
n51.out → n60.a
n48.out → n60.b
n59.out → n58.atom1
n60.out → n58.formula1
n61.out → n58.atom2
n34.out → n58.formula2
n16.out → n15.a
n58.out → n15.b
n39.out → n63.assertion
n64.out → n63.atom1
n34.out → n63.formula1
n65.out → n63.atom2
n51.out → n63.formula2
n66.out → n63.atom3
n48.out → n63.formula3
n15.out → n14.a
n63.out → n14.b
n29.out → n68.assertion
n34.out → n70.a
n51.out → n70.b
n34.out → n71.a
n48.out → n71.b
n70.out → n72.a
n71.out → n72.b
n69.out → n68.atom1
n72.out → n68.formula1
n6.out → n74.a
n11.out → n74.b
n74.out → n75.a
n73.out → n68.atom2
n75.out → n68.formula2
n14.out → n13.a
n68.out → n13.b
n39.out → n77.assertion
n78.out → n77.atom1
n75.out → n77.formula1
n79.out → n77.atom2
n70.out → n77.formula2
n80.out → n77.atom3
n71.out → n77.formula3
n13.out → n12.a
n77.out → n12.b
n3.out → n1.a
n12.out → n1.b
n1.out → n81.proof
```

</details>

### *35 · 双重量词引入

- 目标：`⊢ ( F ( z ) → ∀ x ∀ y F ( z ) )`
- 提示：两次全称引入。
- 参考解：26 个模块 / 35 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n62  [target]
n1  mp
n2  shift(v=x)
n3  term z
n4  pred F
n5  mp
n6  mp
n7  mp
n8  gen(v=x)
n10  shift(v=y)
n16  axiom A1
n26  axiom A2
n38  all(v=y)
n46  axiom A5(v=x)
n47  subst(groups=1)
n48  atom P
n49  atom Q
n51  subst(groups=1)
n52  atom P
n53  all(v=x)
n54  all(v=x)
n55  imp
n56  atom Q
n58  subst(groups=2)
n59  atom P
n60  atom Q
n61  atom R

接线：
n3.out → n4.t1
n4.out → n2.formula
n4.out → n10.formula
n4.out → n38.a
n10.out → n8.assertion
n46.out → n47.assertion
n48.out → n47.atom1
n4.out → n47.formula1
n49.out → n47.atom2
n38.out → n47.formula2
n8.out → n7.a
n47.out → n7.b
n16.out → n51.assertion
n4.out → n53.a
n38.out → n54.a
n53.out → n55.a
n54.out → n55.b
n52.out → n51.atom1
n55.out → n51.formula1
n56.out → n51.atom2
n4.out → n51.formula2
n7.out → n6.a
n51.out → n6.b
n26.out → n58.assertion
n59.out → n58.atom1
n4.out → n58.formula1
n60.out → n58.atom2
n53.out → n58.formula2
n61.out → n58.atom3
n54.out → n58.formula3
n6.out → n5.a
n58.out → n5.b
n2.out → n1.a
n5.out → n1.b
n1.out → n62.proof
```

</details>

### *36 · 辖域移动（变体二）

- 目标：`⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )`
- 提示：同 *38。
- 参考解：68 个模块 / 110 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n106  [target]
n1  mp
n4  axiom A1
n7  term y
n8  pred F
n9  term x
n10  pred G
n11  imp
n12  all(v=x)
n20  axiom A2
n28  subst(groups=1)
n29  atom P
n30  atom Q
n34  imp
n42  mp
n43  mp
n44  mp
n45  mp
n46  mp
n47  shift(v=x)
n48  mp
n49  mp
n51  subst(groups=1)
n52  atom P
n53  all(v=x)
n54  atom Q
n56  subst(groups=1)
n57  atom P
n58  imp
n59  imp
n60  atom Q
n62  subst(groups=2)
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n69  axiom A5(v=x)
n70  subst(groups=1)
n71  atom P
n72  atom Q
n74  subst(groups=2)
n75  atom P
n76  atom Q
n77  atom R
n78  all(v=x)
n80  subst(groups=1)
n81  atom P
n82  imp
n83  imp
n84  atom Q
n86  subst(groups=2)
n87  atom P
n88  atom Q
n89  atom R
n91  subst(groups=2)
n92  atom P
n93  atom Q
n94  atom R
n96  subst(groups=1)
n97  atom P
n98  imp
n99  imp
n100  atom Q
n102  subst(groups=2)
n103  atom P
n104  atom Q
n105  atom R

接线：
n7.out → n8.t1
n9.out → n10.t1
n8.out → n11.a
n10.out → n11.b
n11.out → n12.a
n4.out → n28.assertion
n29.out → n28.atom1
n12.out → n28.formula1
n30.out → n28.atom2
n8.out → n28.formula2
n8.out → n34.a
n12.out → n34.b
n8.out → n47.formula
n4.out → n51.assertion
n8.out → n53.a
n52.out → n51.atom1
n53.out → n51.formula1
n54.out → n51.atom2
n12.out → n51.formula2
n4.out → n56.assertion
n12.out → n58.a
n53.out → n58.b
n53.out → n59.a
n58.out → n59.b
n57.out → n56.atom1
n59.out → n56.formula1
n60.out → n56.atom2
n8.out → n56.formula2
n51.out → n49.a
n56.out → n49.b
n20.out → n62.assertion
n63.out → n62.atom1
n8.out → n62.formula1
n64.out → n62.atom2
n53.out → n62.formula2
n65.out → n62.atom3
n58.out → n62.formula3
n49.out → n48.a
n62.out → n48.b
n47.out → n46.a
n48.out → n46.b
n69.out → n70.assertion
n71.out → n70.atom1
n8.out → n70.formula1
n72.out → n70.atom2
n10.out → n70.formula2
n20.out → n74.assertion
n75.out → n74.atom1
n12.out → n74.formula1
n76.out → n74.atom2
n53.out → n74.formula2
n10.out → n78.a
n77.out → n74.atom3
n78.out → n74.formula3
n70.out → n68.a
n74.out → n68.b
n4.out → n80.assertion
n12.out → n82.a
n78.out → n82.b
n58.out → n83.a
n82.out → n83.b
n81.out → n80.atom1
n83.out → n80.formula1
n84.out → n80.atom2
n8.out → n80.formula2
n68.out → n67.a
n80.out → n67.b
n20.out → n86.assertion
n87.out → n86.atom1
n8.out → n86.formula1
n88.out → n86.atom2
n58.out → n86.formula2
n89.out → n86.atom3
n82.out → n86.formula3
n67.out → n66.a
n86.out → n66.b
n46.out → n45.a
n66.out → n45.b
n20.out → n91.assertion
n92.out → n91.atom1
n8.out → n91.formula1
n93.out → n91.atom2
n12.out → n91.formula2
n94.out → n91.atom3
n78.out → n91.formula3
n45.out → n44.a
n91.out → n44.b
n4.out → n96.assertion
n8.out → n98.a
n78.out → n98.b
n34.out → n99.a
n98.out → n99.b
n97.out → n96.atom1
n99.out → n96.formula1
n100.out → n96.atom2
n12.out → n96.formula2
n44.out → n43.a
n96.out → n43.b
n20.out → n102.assertion
n103.out → n102.atom1
n12.out → n102.formula1
n104.out → n102.atom2
n34.out → n102.formula2
n105.out → n102.atom3
n98.out → n102.formula3
n43.out → n42.a
n102.out → n42.b
n28.out → n1.a
n42.out → n1.b
n1.out → n106.proof
```

</details>

### *37 · 全称后件组合

- 目标：`⊢ ( ( F ( x ) → ∀ x G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )`
- 提示：先分配，再三段论。
- 参考解：69 个模块 / 114 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n107  [target]
n1  mp
n4  axiom A1
n7  term x
n8  pred F
n9  pred G
n10  all(v=x)
n11  imp
n19  axiom A2
n27  subst(groups=1)
n28  atom P
n29  atom Q
n30  pred H
n31  imp
n32  all(v=x)
n36  imp
n44  mp
n45  mp
n46  mp
n47  mp
n48  mp
n49  axiom A5(v=x)
n50  subst(groups=1)
n51  atom P
n52  atom Q
n53  mp
n54  mp
n56  subst(groups=1)
n57  atom P
n58  all(v=x)
n59  imp
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
n97  subst(groups=1)
n98  atom P
n99  imp
n100  imp
n101  atom Q
n103  subst(groups=2)
n104  atom P
n105  atom Q
n106  atom R

接线：
n7.out → n8.t1
n7.out → n9.t1
n9.out → n10.a
n8.out → n11.a
n10.out → n11.b
n4.out → n27.assertion
n28.out → n27.atom1
n11.out → n27.formula1
n7.out → n30.t1
n9.out → n31.a
n30.out → n31.b
n31.out → n32.a
n29.out → n27.atom2
n32.out → n27.formula2
n32.out → n36.a
n11.out → n36.b
n49.out → n50.assertion
n51.out → n50.atom1
n9.out → n50.formula1
n52.out → n50.atom2
n30.out → n50.formula2
n4.out → n56.assertion
n30.out → n58.a
n10.out → n59.a
n58.out → n59.b
n57.out → n56.atom1
n59.out → n56.formula1
n60.out → n56.atom2
n8.out → n56.formula2
n4.out → n62.assertion
n8.out → n64.a
n59.out → n64.b
n59.out → n65.a
n64.out → n65.b
n63.out → n62.atom1
n65.out → n62.formula1
n66.out → n62.atom2
n32.out → n62.formula2
n56.out → n54.a
n62.out → n54.b
n19.out → n68.assertion
n69.out → n68.atom1
n32.out → n68.formula1
n70.out → n68.atom2
n59.out → n68.formula2
n71.out → n68.atom3
n64.out → n68.formula3
n54.out → n53.a
n68.out → n53.b
n50.out → n48.a
n53.out → n48.b
n19.out → n75.assertion
n76.out → n75.atom1
n8.out → n75.formula1
n77.out → n75.atom2
n10.out → n75.formula2
n78.out → n75.atom3
n58.out → n75.formula3
n4.out → n80.assertion
n8.out → n82.a
n58.out → n82.b
n11.out → n83.a
n82.out → n83.b
n64.out → n84.a
n83.out → n84.b
n81.out → n80.atom1
n84.out → n80.formula1
n85.out → n80.atom2
n32.out → n80.formula2
n75.out → n73.a
n80.out → n73.b
n19.out → n87.assertion
n88.out → n87.atom1
n32.out → n87.formula1
n89.out → n87.atom2
n64.out → n87.formula2
n90.out → n87.atom3
n83.out → n87.formula3
n73.out → n72.a
n87.out → n72.b
n48.out → n47.a
n72.out → n47.b
n19.out → n92.assertion
n93.out → n92.atom1
n32.out → n92.formula1
n94.out → n92.atom2
n11.out → n92.formula2
n95.out → n92.atom3
n82.out → n92.formula3
n47.out → n46.a
n92.out → n46.b
n4.out → n97.assertion
n32.out → n99.a
n82.out → n99.b
n36.out → n100.a
n99.out → n100.b
n98.out → n97.atom1
n100.out → n97.formula1
n101.out → n97.atom2
n11.out → n97.formula2
n46.out → n45.a
n97.out → n45.b
n19.out → n103.assertion
n104.out → n103.atom1
n11.out → n103.formula1
n105.out → n103.atom2
n36.out → n103.formula2
n106.out → n103.atom3
n99.out → n103.formula3
n45.out → n44.a
n103.out → n44.b
n27.out → n1.a
n44.out → n1.b
n1.out → n107.proof
```

</details>

### *38 · 辖域移动

- 目标：`⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )`
- 提示：用全称引入与分配。
- 参考解：68 个模块 / 110 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n106  [target]
n1  mp
n4  axiom A1
n7  term y
n8  pred F
n9  term x
n10  pred G
n11  imp
n12  all(v=x)
n20  axiom A2
n28  subst(groups=1)
n29  atom P
n30  atom Q
n34  imp
n42  mp
n43  mp
n44  mp
n45  mp
n46  mp
n47  shift(v=x)
n48  mp
n49  mp
n51  subst(groups=1)
n52  atom P
n53  all(v=x)
n54  atom Q
n56  subst(groups=1)
n57  atom P
n58  imp
n59  imp
n60  atom Q
n62  subst(groups=2)
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n69  axiom A5(v=x)
n70  subst(groups=1)
n71  atom P
n72  atom Q
n74  subst(groups=2)
n75  atom P
n76  atom Q
n77  atom R
n78  all(v=x)
n80  subst(groups=1)
n81  atom P
n82  imp
n83  imp
n84  atom Q
n86  subst(groups=2)
n87  atom P
n88  atom Q
n89  atom R
n91  subst(groups=2)
n92  atom P
n93  atom Q
n94  atom R
n96  subst(groups=1)
n97  atom P
n98  imp
n99  imp
n100  atom Q
n102  subst(groups=2)
n103  atom P
n104  atom Q
n105  atom R

接线：
n7.out → n8.t1
n9.out → n10.t1
n8.out → n11.a
n10.out → n11.b
n11.out → n12.a
n4.out → n28.assertion
n29.out → n28.atom1
n12.out → n28.formula1
n30.out → n28.atom2
n8.out → n28.formula2
n8.out → n34.a
n12.out → n34.b
n8.out → n47.formula
n4.out → n51.assertion
n8.out → n53.a
n52.out → n51.atom1
n53.out → n51.formula1
n54.out → n51.atom2
n12.out → n51.formula2
n4.out → n56.assertion
n12.out → n58.a
n53.out → n58.b
n53.out → n59.a
n58.out → n59.b
n57.out → n56.atom1
n59.out → n56.formula1
n60.out → n56.atom2
n8.out → n56.formula2
n51.out → n49.a
n56.out → n49.b
n20.out → n62.assertion
n63.out → n62.atom1
n8.out → n62.formula1
n64.out → n62.atom2
n53.out → n62.formula2
n65.out → n62.atom3
n58.out → n62.formula3
n49.out → n48.a
n62.out → n48.b
n47.out → n46.a
n48.out → n46.b
n69.out → n70.assertion
n71.out → n70.atom1
n8.out → n70.formula1
n72.out → n70.atom2
n10.out → n70.formula2
n20.out → n74.assertion
n75.out → n74.atom1
n12.out → n74.formula1
n76.out → n74.atom2
n53.out → n74.formula2
n10.out → n78.a
n77.out → n74.atom3
n78.out → n74.formula3
n70.out → n68.a
n74.out → n68.b
n4.out → n80.assertion
n12.out → n82.a
n78.out → n82.b
n58.out → n83.a
n82.out → n83.b
n81.out → n80.atom1
n83.out → n80.formula1
n84.out → n80.atom2
n8.out → n80.formula2
n68.out → n67.a
n80.out → n67.b
n20.out → n86.assertion
n87.out → n86.atom1
n8.out → n86.formula1
n88.out → n86.atom2
n58.out → n86.formula2
n89.out → n86.atom3
n82.out → n86.formula3
n67.out → n66.a
n86.out → n66.b
n46.out → n45.a
n66.out → n45.b
n20.out → n91.assertion
n92.out → n91.atom1
n8.out → n91.formula1
n93.out → n91.atom2
n12.out → n91.formula2
n94.out → n91.atom3
n78.out → n91.formula3
n45.out → n44.a
n91.out → n44.b
n4.out → n96.assertion
n8.out → n98.a
n78.out → n98.b
n34.out → n99.a
n98.out → n99.b
n97.out → n96.atom1
n99.out → n96.formula1
n100.out → n96.atom2
n12.out → n96.formula2
n44.out → n43.a
n96.out → n43.b
n20.out → n102.assertion
n103.out → n102.atom1
n12.out → n102.formula1
n104.out → n102.atom2
n34.out → n102.formula2
n105.out → n102.atom3
n98.out → n102.formula3
n43.out → n42.a
n102.out → n42.b
n28.out → n1.a
n42.out → n1.b
n1.out → n106.proof
```

</details>

### *39 · 全称替换前件

- 目标：`⊢ ( ( F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → G ( x ) ) )`
- 提示：先全称例化，再三段论。
- 参考解：76 个模块 / 128 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n128  [target]
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
n15  atom P
n16  atom Q
n17  imp
n18  axiom A2
n19  subst(groups=2)
n20  atom P
n21  atom Q
n22  atom R
n26  subst(groups=1)
n27  atom P
n28  atom Q
n29  all(v=x)
n33  imp
n41  mp
n42  mp
n43  mp
n44  mp
n45  mp
n46  axiom A4(v=x)
n47  subst(groups=0)
n48  atom P
n49  mp
n50  mp
n52  subst(groups=1)
n53  atom P
n54  atom Q
n56  subst(groups=1)
n57  atom P
n58  imp
n59  imp
n60  atom Q
n62  subst(groups=2)
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n97  subst(groups=2)
n98  atom P
n99  atom Q
n100  atom R
n102  subst(groups=1)
n103  atom P
n104  imp
n105  imp
n106  atom Q
n108  subst(groups=2)
n109  atom P
n110  atom Q
n111  atom R
n113  subst(groups=2)
n114  atom P
n115  atom Q
n116  atom R
n118  subst(groups=1)
n119  atom P
n120  imp
n121  imp
n122  atom Q
n124  subst(groups=2)
n125  atom P
n126  atom Q
n127  atom R

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
n15.out → n14.atom1
n10.out → n14.formula1
n10.out → n17.a
n10.out → n17.b
n16.out → n14.atom2
n17.out → n14.formula2
n18.out → n19.assertion
n20.out → n19.atom1
n10.out → n19.formula1
n21.out → n19.atom2
n17.out → n19.formula2
n22.out → n19.atom3
n10.out → n19.formula3
n14.out → n12.a
n19.out → n12.b
n5.out → n3.a
n12.out → n3.b
n4.out → n26.assertion
n27.out → n26.atom1
n10.out → n26.formula1
n8.out → n29.a
n28.out → n26.atom2
n29.out → n26.formula2
n29.out → n33.a
n10.out → n33.b
n46.out → n47.assertion
n48.out → n47.atom1
n8.out → n47.formula1
n4.out → n52.assertion
n53.out → n52.atom1
n8.out → n52.formula1
n54.out → n52.atom2
n10.out → n52.formula2
n4.out → n56.assertion
n10.out → n58.a
n8.out → n58.b
n8.out → n59.a
n58.out → n59.b
n57.out → n56.atom1
n59.out → n56.formula1
n60.out → n56.atom2
n29.out → n56.formula2
n52.out → n50.a
n56.out → n50.b
n18.out → n62.assertion
n63.out → n62.atom1
n29.out → n62.formula1
n64.out → n62.atom2
n8.out → n62.formula2
n65.out → n62.atom3
n58.out → n62.formula3
n50.out → n49.a
n62.out → n49.b
n47.out → n45.a
n49.out → n45.b
n18.out → n97.assertion
n98.out → n97.atom1
n10.out → n97.formula1
n99.out → n97.atom2
n8.out → n97.formula2
n100.out → n97.atom3
n9.out → n97.formula3
n3.out → n68.a
n97.out → n68.b
n4.out → n102.assertion
n10.out → n104.a
n9.out → n104.b
n58.out → n105.a
n104.out → n105.b
n103.out → n102.atom1
n105.out → n102.formula1
n106.out → n102.atom2
n29.out → n102.formula2
n68.out → n67.a
n102.out → n67.b
n18.out → n108.assertion
n109.out → n108.atom1
n29.out → n108.formula1
n110.out → n108.atom2
n58.out → n108.formula2
n111.out → n108.atom3
n104.out → n108.formula3
n67.out → n66.a
n108.out → n66.b
n45.out → n44.a
n66.out → n44.b
n18.out → n113.assertion
n114.out → n113.atom1
n29.out → n113.formula1
n115.out → n113.atom2
n10.out → n113.formula2
n116.out → n113.atom3
n9.out → n113.formula3
n44.out → n43.a
n113.out → n43.b
n4.out → n118.assertion
n29.out → n120.a
n9.out → n120.b
n33.out → n121.a
n120.out → n121.b
n119.out → n118.atom1
n121.out → n118.formula1
n122.out → n118.atom2
n10.out → n118.formula2
n43.out → n42.a
n118.out → n42.b
n18.out → n124.assertion
n125.out → n124.atom1
n10.out → n124.formula1
n126.out → n124.atom2
n33.out → n124.formula2
n127.out → n124.atom3
n120.out → n124.formula3
n42.out → n41.a
n124.out → n41.b
n26.out → n1.a
n41.out → n1.b
n1.out → n128.proof
```

</details>

### *40 · 全称合并

- 目标：`⊢ ( ( ∀ x F ( x ) → ∀ x ∀ x F ( x ) ) → ( ( ∀ x ( ∀ x F ( x ) → G ( x ) ) → ( ∀ x ∀ x F ( x ) → ∀ x G ( x ) ) ) → ( ∀ x ( ∀ x F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → ∀ x G ( x ) ) ) ) )`
- 提示：分配、引入、再分配。
- 参考解：162 个模块 / 284 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n247  [target]
n1  mp
n2  mp
n3  mp
n6  axiom A1
n9  term x
n10  pred F
n11  all(v=x)
n12  all(v=x)
n13  imp
n21  axiom A2
n29  subst(groups=1)
n30  atom P
n31  atom Q
n32  pred G
n33  all(v=x)
n34  imp
n38  imp
n46  mp
n47  mp
n48  mp
n49  mp
n50  mp
n51  mp
n52  mp
n54  subst(groups=1)
n55  atom P
n56  atom Q
n57  mp
n59  subst(groups=1)
n60  atom P
n61  atom Q
n62  imp
n64  subst(groups=2)
n65  atom P
n66  atom Q
n67  atom R
n69  subst(groups=1)
n70  atom P
n71  atom Q
n72  mp
n73  mp
n75  subst(groups=1)
n76  atom P
n77  atom Q
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
n92  subst(groups=2)
n93  atom P
n94  atom Q
n95  atom R
n97  subst(groups=1)
n98  atom P
n99  imp
n100  imp
n101  atom Q
n103  subst(groups=2)
n104  atom P
n105  atom Q
n106  atom R
n107  mp
n108  mp
n109  mp
n110  mp
n111  mp
n131  subst(groups=1)
n132  atom P
n133  atom Q
n137  imp
n145  mp
n146  mp
n148  subst(groups=2)
n149  atom P
n150  atom Q
n151  atom R
n153  subst(groups=1)
n154  atom P
n155  imp
n156  imp
n157  imp
n158  atom Q
n160  subst(groups=2)
n161  atom P
n162  atom Q
n163  atom R
n165  subst(groups=1)
n166  atom P
n167  imp
n168  atom Q
n170  subst(groups=2)
n171  atom P
n172  atom Q
n173  atom R
n175  subst(groups=1)
n176  atom P
n177  imp
n178  atom Q
n180  subst(groups=2)
n181  atom P
n182  atom Q
n183  atom R
n184  mp
n185  mp
n187  subst(groups=2)
n188  atom P
n189  atom Q
n190  atom R
n192  subst(groups=1)
n193  atom P
n194  imp
n195  imp
n196  imp
n197  atom Q
n199  subst(groups=2)
n200  atom P
n201  atom Q
n202  atom R
n204  subst(groups=2)
n205  atom P
n206  atom Q
n207  atom R
n208  mp
n209  mp
n211  subst(groups=1)
n212  atom P
n213  atom Q
n214  imp
n215  all(v=x)
n217  subst(groups=1)
n218  atom P
n219  imp
n220  imp
n221  atom Q
n223  subst(groups=2)
n224  atom P
n225  atom Q
n226  atom R
n227  mp
n228  mp
n230  subst(groups=2)
n231  atom P
n232  atom Q
n233  atom R
n235  subst(groups=1)
n236  atom P
n237  imp
n238  imp
n239  imp
n240  imp
n241  atom Q
n243  subst(groups=2)
n244  atom P
n245  atom Q
n246  atom R

接线：
n9.out → n10.t1
n10.out → n11.a
n11.out → n12.a
n11.out → n13.a
n12.out → n13.b
n6.out → n29.assertion
n30.out → n29.atom1
n13.out → n29.formula1
n9.out → n32.t1
n32.out → n33.a
n12.out → n34.a
n33.out → n34.b
n31.out → n29.atom2
n34.out → n29.formula2
n34.out → n38.a
n13.out → n38.b
n6.out → n54.assertion
n55.out → n54.atom1
n33.out → n54.formula1
n56.out → n54.atom2
n33.out → n54.formula2
n6.out → n59.assertion
n60.out → n59.atom1
n33.out → n59.formula1
n33.out → n62.a
n33.out → n62.b
n61.out → n59.atom2
n62.out → n59.formula2
n21.out → n64.assertion
n65.out → n64.atom1
n33.out → n64.formula1
n66.out → n64.atom2
n62.out → n64.formula2
n67.out → n64.atom3
n33.out → n64.formula3
n59.out → n57.a
n64.out → n57.b
n54.out → n52.a
n57.out → n52.b
n6.out → n69.assertion
n70.out → n69.atom1
n62.out → n69.formula1
n71.out → n69.atom2
n13.out → n69.formula2
n52.out → n51.a
n69.out → n51.b
n6.out → n75.assertion
n76.out → n75.atom1
n62.out → n75.formula1
n77.out → n75.atom2
n12.out → n75.formula2
n6.out → n79.assertion
n12.out → n81.a
n62.out → n81.b
n62.out → n82.a
n81.out → n82.b
n80.out → n79.atom1
n82.out → n79.formula1
n83.out → n79.atom2
n13.out → n79.formula2
n75.out → n73.a
n79.out → n73.b
n21.out → n85.assertion
n86.out → n85.atom1
n13.out → n85.formula1
n87.out → n85.atom2
n62.out → n85.formula2
n88.out → n85.atom3
n81.out → n85.formula3
n73.out → n72.a
n85.out → n72.b
n51.out → n50.a
n72.out → n50.b
n21.out → n92.assertion
n93.out → n92.atom1
n12.out → n92.formula1
n94.out → n92.atom2
n33.out → n92.formula2
n95.out → n92.atom3
n33.out → n92.formula3
n6.out → n97.assertion
n34.out → n99.a
n34.out → n99.b
n81.out → n100.a
n99.out → n100.b
n98.out → n97.atom1
n100.out → n97.formula1
n101.out → n97.atom2
n13.out → n97.formula2
n92.out → n90.a
n97.out → n90.b
n21.out → n103.assertion
n104.out → n103.atom1
n13.out → n103.formula1
n105.out → n103.atom2
n81.out → n103.formula2
n106.out → n103.atom3
n99.out → n103.formula3
n90.out → n89.a
n103.out → n89.b
n50.out → n49.a
n89.out → n49.b
n6.out → n131.assertion
n132.out → n131.atom1
n34.out → n131.formula1
n133.out → n131.atom2
n11.out → n131.formula2
n11.out → n137.a
n34.out → n137.b
n21.out → n148.assertion
n149.out → n148.atom1
n11.out → n148.formula1
n150.out → n148.atom2
n12.out → n148.formula2
n151.out → n148.atom3
n33.out → n148.formula3
n6.out → n153.assertion
n11.out → n155.a
n33.out → n155.b
n13.out → n156.a
n155.out → n156.b
n137.out → n157.a
n156.out → n157.b
n154.out → n153.atom1
n157.out → n153.formula1
n158.out → n153.atom2
n34.out → n153.formula2
n148.out → n146.a
n153.out → n146.b
n21.out → n160.assertion
n161.out → n160.atom1
n34.out → n160.formula1
n162.out → n160.atom2
n137.out → n160.formula2
n163.out → n160.atom3
n156.out → n160.formula3
n146.out → n145.a
n160.out → n145.b
n131.out → n111.a
n145.out → n111.b
n6.out → n165.assertion
n34.out → n167.a
n156.out → n167.b
n166.out → n165.atom1
n167.out → n165.formula1
n168.out → n165.atom2
n34.out → n165.formula2
n111.out → n110.a
n165.out → n110.b
n21.out → n170.assertion
n171.out → n170.atom1
n34.out → n170.formula1
n172.out → n170.atom2
n34.out → n170.formula2
n173.out → n170.atom3
n156.out → n170.formula3
n110.out → n109.a
n170.out → n109.b
n6.out → n175.assertion
n99.out → n177.a
n167.out → n177.b
n176.out → n175.atom1
n177.out → n175.formula1
n178.out → n175.atom2
n13.out → n175.formula2
n109.out → n108.a
n175.out → n108.b
n21.out → n180.assertion
n181.out → n180.atom1
n13.out → n180.formula1
n182.out → n180.atom2
n99.out → n180.formula2
n183.out → n180.atom3
n167.out → n180.formula3
n108.out → n107.a
n180.out → n107.b
n49.out → n48.a
n107.out → n48.b
n21.out → n187.assertion
n188.out → n187.atom1
n34.out → n187.formula1
n189.out → n187.atom2
n13.out → n187.formula2
n190.out → n187.atom3
n155.out → n187.formula3
n6.out → n192.assertion
n34.out → n194.a
n155.out → n194.b
n38.out → n195.a
n194.out → n195.b
n167.out → n196.a
n195.out → n196.b
n193.out → n192.atom1
n196.out → n192.formula1
n197.out → n192.atom2
n13.out → n192.formula2
n187.out → n185.a
n192.out → n185.b
n21.out → n199.assertion
n200.out → n199.atom1
n13.out → n199.formula1
n201.out → n199.atom2
n167.out → n199.formula2
n202.out → n199.atom3
n195.out → n199.formula3
n185.out → n184.a
n199.out → n184.b
n48.out → n47.a
n184.out → n47.b
n21.out → n204.assertion
n205.out → n204.atom1
n13.out → n204.formula1
n206.out → n204.atom2
n38.out → n204.formula2
n207.out → n204.atom3
n194.out → n204.formula3
n47.out → n46.a
n204.out → n46.b
n29.out → n3.a
n46.out → n3.b
n6.out → n211.assertion
n212.out → n211.atom1
n194.out → n211.formula1
n11.out → n214.a
n32.out → n214.b
n214.out → n215.a
n213.out → n211.atom2
n215.out → n211.formula2
n6.out → n217.assertion
n215.out → n219.a
n194.out → n219.b
n194.out → n220.a
n219.out → n220.b
n218.out → n217.atom1
n220.out → n217.formula1
n221.out → n217.atom2
n13.out → n217.formula2
n211.out → n209.a
n217.out → n209.b
n21.out → n223.assertion
n224.out → n223.atom1
n13.out → n223.formula1
n225.out → n223.atom2
n194.out → n223.formula2
n226.out → n223.atom3
n219.out → n223.formula3
n209.out → n208.a
n223.out → n208.b
n3.out → n2.a
n208.out → n2.b
n21.out → n230.assertion
n231.out → n230.atom1
n215.out → n230.formula1
n232.out → n230.atom2
n34.out → n230.formula2
n233.out → n230.atom3
n155.out → n230.formula3
n6.out → n235.assertion
n215.out → n237.a
n34.out → n237.b
n215.out → n238.a
n155.out → n238.b
n237.out → n239.a
n238.out → n239.b
n219.out → n240.a
n239.out → n240.b
n236.out → n235.atom1
n240.out → n235.formula1
n241.out → n235.atom2
n13.out → n235.formula2
n230.out → n228.a
n235.out → n228.b
n21.out → n243.assertion
n244.out → n243.atom1
n13.out → n243.formula1
n245.out → n243.atom2
n219.out → n243.formula2
n246.out → n243.atom3
n239.out → n243.formula3
n228.out → n227.a
n243.out → n227.b
n2.out → n1.a
n227.out → n1.b
n1.out → n247.proof
```

</details>

### *41 · 全称三段论链

- 目标：`⊢ ( ∀ x ( F ( x ) → G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ∀ x ( F ( x ) → H ( x ) ) ) )`
- 提示：两次分配后接命题三段论。
- 参考解：164 个模块 / 283 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n248  [target]
n1  mp
n2  gen(v=x)
n3  mp
n6  axiom A1
n9  term x
n10  pred F
n11  pred G
n12  imp
n20  axiom A2
n28  subst(groups=1)
n29  atom P
n30  atom Q
n31  pred H
n32  imp
n36  imp
n44  mp
n45  mp
n46  mp
n47  mp
n48  mp
n49  mp
n50  mp
n52  subst(groups=1)
n53  atom P
n54  atom Q
n55  mp
n57  subst(groups=1)
n58  atom P
n59  atom Q
n60  imp
n62  subst(groups=2)
n63  atom P
n64  atom Q
n65  atom R
n67  subst(groups=1)
n68  atom P
n69  atom Q
n70  mp
n71  mp
n73  subst(groups=1)
n74  atom P
n75  atom Q
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
n107  mp
n108  mp
n109  mp
n129  subst(groups=1)
n130  atom P
n131  atom Q
n135  imp
n143  mp
n144  mp
n146  subst(groups=2)
n147  atom P
n148  atom Q
n149  atom R
n151  subst(groups=1)
n152  atom P
n153  imp
n154  imp
n155  imp
n156  atom Q
n158  subst(groups=2)
n159  atom P
n160  atom Q
n161  atom R
n163  subst(groups=1)
n164  atom P
n165  imp
n166  atom Q
n168  subst(groups=2)
n169  atom P
n170  atom Q
n171  atom R
n173  subst(groups=1)
n174  atom P
n175  imp
n176  atom Q
n178  subst(groups=2)
n179  atom P
n180  atom Q
n181  atom R
n182  mp
n183  mp
n185  subst(groups=2)
n186  atom P
n187  atom Q
n188  atom R
n190  subst(groups=1)
n191  atom P
n192  imp
n193  imp
n194  imp
n195  atom Q
n197  subst(groups=2)
n198  atom P
n199  atom Q
n200  atom R
n202  subst(groups=2)
n203  atom P
n204  atom Q
n205  atom R
n206  mp
n207  axiom A5(v=x)
n208  subst(groups=1)
n209  atom P
n210  atom Q
n211  mp
n212  mp
n213  mp
n214  mp
n216  subst(groups=1)
n217  atom P
n218  atom Q
n220  subst(groups=1)
n221  atom P
n222  all(v=x)
n223  all(v=x)
n224  all(v=x)
n225  imp
n226  imp
n227  atom Q
n228  all(v=x)
n230  subst(groups=2)
n231  atom P
n232  atom Q
n233  atom R
n235  subst(groups=1)
n236  atom P
n237  imp
n238  imp
n239  imp
n240  atom Q
n241  imp
n242  all(v=x)
n244  subst(groups=2)
n245  atom P
n246  atom Q
n247  atom R

接线：
n9.out → n10.t1
n9.out → n11.t1
n10.out → n12.a
n11.out → n12.b
n6.out → n28.assertion
n29.out → n28.atom1
n12.out → n28.formula1
n9.out → n31.t1
n11.out → n32.a
n31.out → n32.b
n30.out → n28.atom2
n32.out → n28.formula2
n32.out → n36.a
n12.out → n36.b
n6.out → n52.assertion
n53.out → n52.atom1
n31.out → n52.formula1
n54.out → n52.atom2
n31.out → n52.formula2
n6.out → n57.assertion
n58.out → n57.atom1
n31.out → n57.formula1
n31.out → n60.a
n31.out → n60.b
n59.out → n57.atom2
n60.out → n57.formula2
n20.out → n62.assertion
n63.out → n62.atom1
n31.out → n62.formula1
n64.out → n62.atom2
n60.out → n62.formula2
n65.out → n62.atom3
n31.out → n62.formula3
n57.out → n55.a
n62.out → n55.b
n52.out → n50.a
n55.out → n50.b
n6.out → n67.assertion
n68.out → n67.atom1
n60.out → n67.formula1
n69.out → n67.atom2
n12.out → n67.formula2
n50.out → n49.a
n67.out → n49.b
n6.out → n73.assertion
n74.out → n73.atom1
n60.out → n73.formula1
n75.out → n73.atom2
n11.out → n73.formula2
n6.out → n77.assertion
n11.out → n79.a
n60.out → n79.b
n60.out → n80.a
n79.out → n80.b
n78.out → n77.atom1
n80.out → n77.formula1
n81.out → n77.atom2
n12.out → n77.formula2
n73.out → n71.a
n77.out → n71.b
n20.out → n83.assertion
n84.out → n83.atom1
n12.out → n83.formula1
n85.out → n83.atom2
n60.out → n83.formula2
n86.out → n83.atom3
n79.out → n83.formula3
n71.out → n70.a
n83.out → n70.b
n49.out → n48.a
n70.out → n48.b
n20.out → n90.assertion
n91.out → n90.atom1
n11.out → n90.formula1
n92.out → n90.atom2
n31.out → n90.formula2
n93.out → n90.atom3
n31.out → n90.formula3
n6.out → n95.assertion
n32.out → n97.a
n32.out → n97.b
n79.out → n98.a
n97.out → n98.b
n96.out → n95.atom1
n98.out → n95.formula1
n99.out → n95.atom2
n12.out → n95.formula2
n90.out → n88.a
n95.out → n88.b
n20.out → n101.assertion
n102.out → n101.atom1
n12.out → n101.formula1
n103.out → n101.atom2
n79.out → n101.formula2
n104.out → n101.atom3
n97.out → n101.formula3
n88.out → n87.a
n101.out → n87.b
n48.out → n47.a
n87.out → n47.b
n6.out → n129.assertion
n130.out → n129.atom1
n32.out → n129.formula1
n131.out → n129.atom2
n10.out → n129.formula2
n10.out → n135.a
n32.out → n135.b
n20.out → n146.assertion
n147.out → n146.atom1
n10.out → n146.formula1
n148.out → n146.atom2
n11.out → n146.formula2
n149.out → n146.atom3
n31.out → n146.formula3
n6.out → n151.assertion
n10.out → n153.a
n31.out → n153.b
n12.out → n154.a
n153.out → n154.b
n135.out → n155.a
n154.out → n155.b
n152.out → n151.atom1
n155.out → n151.formula1
n156.out → n151.atom2
n32.out → n151.formula2
n146.out → n144.a
n151.out → n144.b
n20.out → n158.assertion
n159.out → n158.atom1
n32.out → n158.formula1
n160.out → n158.atom2
n135.out → n158.formula2
n161.out → n158.atom3
n154.out → n158.formula3
n144.out → n143.a
n158.out → n143.b
n129.out → n109.a
n143.out → n109.b
n6.out → n163.assertion
n32.out → n165.a
n154.out → n165.b
n164.out → n163.atom1
n165.out → n163.formula1
n166.out → n163.atom2
n32.out → n163.formula2
n109.out → n108.a
n163.out → n108.b
n20.out → n168.assertion
n169.out → n168.atom1
n32.out → n168.formula1
n170.out → n168.atom2
n32.out → n168.formula2
n171.out → n168.atom3
n154.out → n168.formula3
n108.out → n107.a
n168.out → n107.b
n6.out → n173.assertion
n97.out → n175.a
n165.out → n175.b
n174.out → n173.atom1
n175.out → n173.formula1
n176.out → n173.atom2
n12.out → n173.formula2
n107.out → n106.a
n173.out → n106.b
n20.out → n178.assertion
n179.out → n178.atom1
n12.out → n178.formula1
n180.out → n178.atom2
n97.out → n178.formula2
n181.out → n178.atom3
n165.out → n178.formula3
n106.out → n105.a
n178.out → n105.b
n47.out → n46.a
n105.out → n46.b
n20.out → n185.assertion
n186.out → n185.atom1
n32.out → n185.formula1
n187.out → n185.atom2
n12.out → n185.formula2
n188.out → n185.atom3
n153.out → n185.formula3
n6.out → n190.assertion
n32.out → n192.a
n153.out → n192.b
n36.out → n193.a
n192.out → n193.b
n165.out → n194.a
n193.out → n194.b
n191.out → n190.atom1
n194.out → n190.formula1
n195.out → n190.atom2
n12.out → n190.formula2
n185.out → n183.a
n190.out → n183.b
n20.out → n197.assertion
n198.out → n197.atom1
n12.out → n197.formula1
n199.out → n197.atom2
n165.out → n197.formula2
n200.out → n197.atom3
n193.out → n197.formula3
n183.out → n182.a
n197.out → n182.b
n46.out → n45.a
n182.out → n45.b
n20.out → n202.assertion
n203.out → n202.atom1
n12.out → n202.formula1
n204.out → n202.atom2
n36.out → n202.formula2
n205.out → n202.atom3
n192.out → n202.formula3
n45.out → n44.a
n202.out → n44.b
n28.out → n3.a
n44.out → n3.b
n3.out → n2.assertion
n207.out → n208.assertion
n209.out → n208.atom1
n12.out → n208.formula1
n210.out → n208.atom2
n192.out → n208.formula2
n207.out → n216.assertion
n217.out → n216.atom1
n32.out → n216.formula1
n218.out → n216.atom2
n153.out → n216.formula2
n6.out → n220.assertion
n192.out → n222.a
n32.out → n223.a
n153.out → n224.a
n223.out → n225.a
n224.out → n225.b
n222.out → n226.a
n225.out → n226.b
n221.out → n220.atom1
n226.out → n220.formula1
n12.out → n228.a
n227.out → n220.atom2
n228.out → n220.formula2
n216.out → n214.a
n220.out → n214.b
n20.out → n230.assertion
n231.out → n230.atom1
n228.out → n230.formula1
n232.out → n230.atom2
n222.out → n230.formula2
n233.out → n230.atom3
n225.out → n230.formula3
n214.out → n213.a
n230.out → n213.b
n6.out → n235.assertion
n228.out → n237.a
n222.out → n237.b
n228.out → n238.a
n225.out → n238.b
n237.out → n239.a
n238.out → n239.b
n236.out → n235.atom1
n239.out → n235.formula1
n12.out → n241.a
n192.out → n241.b
n241.out → n242.a
n240.out → n235.atom2
n242.out → n235.formula2
n213.out → n212.a
n235.out → n212.b
n20.out → n244.assertion
n245.out → n244.atom1
n242.out → n244.formula1
n246.out → n244.atom2
n237.out → n244.formula2
n247.out → n244.atom3
n238.out → n244.formula3
n212.out → n211.a
n244.out → n211.b
n208.out → n206.a
n211.out → n206.b
n2.out → n1.a
n206.out → n1.b
n1.out → n248.proof
```

</details>

### *42 · 辖域移动（H/G）

- 目标：`⊢ ( ∀ x ( H ( y ) → F ( x ) ) → ( H ( y ) → ∀ x F ( x ) ) )`
- 提示：同 *39，换谓词。
- 参考解：68 个模块 / 110 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n106  [target]
n1  mp
n4  axiom A1
n7  term y
n8  pred H
n9  term x
n10  pred F
n11  imp
n12  all(v=x)
n20  axiom A2
n28  subst(groups=1)
n29  atom P
n30  atom Q
n34  imp
n42  mp
n43  mp
n44  mp
n45  mp
n46  mp
n47  shift(v=x)
n48  mp
n49  mp
n51  subst(groups=1)
n52  atom P
n53  all(v=x)
n54  atom Q
n56  subst(groups=1)
n57  atom P
n58  imp
n59  imp
n60  atom Q
n62  subst(groups=2)
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n69  axiom A5(v=x)
n70  subst(groups=1)
n71  atom P
n72  atom Q
n74  subst(groups=2)
n75  atom P
n76  atom Q
n77  atom R
n78  all(v=x)
n80  subst(groups=1)
n81  atom P
n82  imp
n83  imp
n84  atom Q
n86  subst(groups=2)
n87  atom P
n88  atom Q
n89  atom R
n91  subst(groups=2)
n92  atom P
n93  atom Q
n94  atom R
n96  subst(groups=1)
n97  atom P
n98  imp
n99  imp
n100  atom Q
n102  subst(groups=2)
n103  atom P
n104  atom Q
n105  atom R

接线：
n7.out → n8.t1
n9.out → n10.t1
n8.out → n11.a
n10.out → n11.b
n11.out → n12.a
n4.out → n28.assertion
n29.out → n28.atom1
n12.out → n28.formula1
n30.out → n28.atom2
n8.out → n28.formula2
n8.out → n34.a
n12.out → n34.b
n8.out → n47.formula
n4.out → n51.assertion
n8.out → n53.a
n52.out → n51.atom1
n53.out → n51.formula1
n54.out → n51.atom2
n12.out → n51.formula2
n4.out → n56.assertion
n12.out → n58.a
n53.out → n58.b
n53.out → n59.a
n58.out → n59.b
n57.out → n56.atom1
n59.out → n56.formula1
n60.out → n56.atom2
n8.out → n56.formula2
n51.out → n49.a
n56.out → n49.b
n20.out → n62.assertion
n63.out → n62.atom1
n8.out → n62.formula1
n64.out → n62.atom2
n53.out → n62.formula2
n65.out → n62.atom3
n58.out → n62.formula3
n49.out → n48.a
n62.out → n48.b
n47.out → n46.a
n48.out → n46.b
n69.out → n70.assertion
n71.out → n70.atom1
n8.out → n70.formula1
n72.out → n70.atom2
n10.out → n70.formula2
n20.out → n74.assertion
n75.out → n74.atom1
n12.out → n74.formula1
n76.out → n74.atom2
n53.out → n74.formula2
n10.out → n78.a
n77.out → n74.atom3
n78.out → n74.formula3
n70.out → n68.a
n74.out → n68.b
n4.out → n80.assertion
n12.out → n82.a
n78.out → n82.b
n58.out → n83.a
n82.out → n83.b
n81.out → n80.atom1
n83.out → n80.formula1
n84.out → n80.atom2
n8.out → n80.formula2
n68.out → n67.a
n80.out → n67.b
n20.out → n86.assertion
n87.out → n86.atom1
n8.out → n86.formula1
n88.out → n86.atom2
n58.out → n86.formula2
n89.out → n86.atom3
n82.out → n86.formula3
n67.out → n66.a
n86.out → n66.b
n46.out → n45.a
n66.out → n45.b
n20.out → n91.assertion
n92.out → n91.atom1
n8.out → n91.formula1
n93.out → n91.atom2
n12.out → n91.formula2
n94.out → n91.atom3
n78.out → n91.formula3
n45.out → n44.a
n91.out → n44.b
n4.out → n96.assertion
n8.out → n98.a
n78.out → n98.b
n34.out → n99.a
n98.out → n99.b
n97.out → n96.atom1
n99.out → n96.formula1
n100.out → n96.atom2
n12.out → n96.formula2
n44.out → n43.a
n96.out → n43.b
n20.out → n102.assertion
n103.out → n102.atom1
n12.out → n102.formula1
n104.out → n102.atom2
n34.out → n102.formula2
n105.out → n102.atom3
n98.out → n102.formula3
n43.out → n42.a
n102.out → n42.b
n28.out → n1.a
n42.out → n1.b
n1.out → n106.proof
```

</details>

### *43 · 全称三段论（换序）

- 目标：`⊢ ( ∀ x ( F ( x ) → G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ∀ x ( F ( x ) → H ( x ) ) ) )`
- 提示：同 *42，换谓词顺序。
- 参考解：164 个模块 / 283 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n248  [target]
n1  mp
n2  gen(v=x)
n3  mp
n6  axiom A1
n9  term x
n10  pred F
n11  pred G
n12  imp
n20  axiom A2
n28  subst(groups=1)
n29  atom P
n30  atom Q
n31  pred H
n32  imp
n36  imp
n44  mp
n45  mp
n46  mp
n47  mp
n48  mp
n49  mp
n50  mp
n52  subst(groups=1)
n53  atom P
n54  atom Q
n55  mp
n57  subst(groups=1)
n58  atom P
n59  atom Q
n60  imp
n62  subst(groups=2)
n63  atom P
n64  atom Q
n65  atom R
n67  subst(groups=1)
n68  atom P
n69  atom Q
n70  mp
n71  mp
n73  subst(groups=1)
n74  atom P
n75  atom Q
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
n107  mp
n108  mp
n109  mp
n129  subst(groups=1)
n130  atom P
n131  atom Q
n135  imp
n143  mp
n144  mp
n146  subst(groups=2)
n147  atom P
n148  atom Q
n149  atom R
n151  subst(groups=1)
n152  atom P
n153  imp
n154  imp
n155  imp
n156  atom Q
n158  subst(groups=2)
n159  atom P
n160  atom Q
n161  atom R
n163  subst(groups=1)
n164  atom P
n165  imp
n166  atom Q
n168  subst(groups=2)
n169  atom P
n170  atom Q
n171  atom R
n173  subst(groups=1)
n174  atom P
n175  imp
n176  atom Q
n178  subst(groups=2)
n179  atom P
n180  atom Q
n181  atom R
n182  mp
n183  mp
n185  subst(groups=2)
n186  atom P
n187  atom Q
n188  atom R
n190  subst(groups=1)
n191  atom P
n192  imp
n193  imp
n194  imp
n195  atom Q
n197  subst(groups=2)
n198  atom P
n199  atom Q
n200  atom R
n202  subst(groups=2)
n203  atom P
n204  atom Q
n205  atom R
n206  mp
n207  axiom A5(v=x)
n208  subst(groups=1)
n209  atom P
n210  atom Q
n211  mp
n212  mp
n213  mp
n214  mp
n216  subst(groups=1)
n217  atom P
n218  atom Q
n220  subst(groups=1)
n221  atom P
n222  all(v=x)
n223  all(v=x)
n224  all(v=x)
n225  imp
n226  imp
n227  atom Q
n228  all(v=x)
n230  subst(groups=2)
n231  atom P
n232  atom Q
n233  atom R
n235  subst(groups=1)
n236  atom P
n237  imp
n238  imp
n239  imp
n240  atom Q
n241  imp
n242  all(v=x)
n244  subst(groups=2)
n245  atom P
n246  atom Q
n247  atom R

接线：
n9.out → n10.t1
n9.out → n11.t1
n10.out → n12.a
n11.out → n12.b
n6.out → n28.assertion
n29.out → n28.atom1
n12.out → n28.formula1
n9.out → n31.t1
n11.out → n32.a
n31.out → n32.b
n30.out → n28.atom2
n32.out → n28.formula2
n32.out → n36.a
n12.out → n36.b
n6.out → n52.assertion
n53.out → n52.atom1
n31.out → n52.formula1
n54.out → n52.atom2
n31.out → n52.formula2
n6.out → n57.assertion
n58.out → n57.atom1
n31.out → n57.formula1
n31.out → n60.a
n31.out → n60.b
n59.out → n57.atom2
n60.out → n57.formula2
n20.out → n62.assertion
n63.out → n62.atom1
n31.out → n62.formula1
n64.out → n62.atom2
n60.out → n62.formula2
n65.out → n62.atom3
n31.out → n62.formula3
n57.out → n55.a
n62.out → n55.b
n52.out → n50.a
n55.out → n50.b
n6.out → n67.assertion
n68.out → n67.atom1
n60.out → n67.formula1
n69.out → n67.atom2
n12.out → n67.formula2
n50.out → n49.a
n67.out → n49.b
n6.out → n73.assertion
n74.out → n73.atom1
n60.out → n73.formula1
n75.out → n73.atom2
n11.out → n73.formula2
n6.out → n77.assertion
n11.out → n79.a
n60.out → n79.b
n60.out → n80.a
n79.out → n80.b
n78.out → n77.atom1
n80.out → n77.formula1
n81.out → n77.atom2
n12.out → n77.formula2
n73.out → n71.a
n77.out → n71.b
n20.out → n83.assertion
n84.out → n83.atom1
n12.out → n83.formula1
n85.out → n83.atom2
n60.out → n83.formula2
n86.out → n83.atom3
n79.out → n83.formula3
n71.out → n70.a
n83.out → n70.b
n49.out → n48.a
n70.out → n48.b
n20.out → n90.assertion
n91.out → n90.atom1
n11.out → n90.formula1
n92.out → n90.atom2
n31.out → n90.formula2
n93.out → n90.atom3
n31.out → n90.formula3
n6.out → n95.assertion
n32.out → n97.a
n32.out → n97.b
n79.out → n98.a
n97.out → n98.b
n96.out → n95.atom1
n98.out → n95.formula1
n99.out → n95.atom2
n12.out → n95.formula2
n90.out → n88.a
n95.out → n88.b
n20.out → n101.assertion
n102.out → n101.atom1
n12.out → n101.formula1
n103.out → n101.atom2
n79.out → n101.formula2
n104.out → n101.atom3
n97.out → n101.formula3
n88.out → n87.a
n101.out → n87.b
n48.out → n47.a
n87.out → n47.b
n6.out → n129.assertion
n130.out → n129.atom1
n32.out → n129.formula1
n131.out → n129.atom2
n10.out → n129.formula2
n10.out → n135.a
n32.out → n135.b
n20.out → n146.assertion
n147.out → n146.atom1
n10.out → n146.formula1
n148.out → n146.atom2
n11.out → n146.formula2
n149.out → n146.atom3
n31.out → n146.formula3
n6.out → n151.assertion
n10.out → n153.a
n31.out → n153.b
n12.out → n154.a
n153.out → n154.b
n135.out → n155.a
n154.out → n155.b
n152.out → n151.atom1
n155.out → n151.formula1
n156.out → n151.atom2
n32.out → n151.formula2
n146.out → n144.a
n151.out → n144.b
n20.out → n158.assertion
n159.out → n158.atom1
n32.out → n158.formula1
n160.out → n158.atom2
n135.out → n158.formula2
n161.out → n158.atom3
n154.out → n158.formula3
n144.out → n143.a
n158.out → n143.b
n129.out → n109.a
n143.out → n109.b
n6.out → n163.assertion
n32.out → n165.a
n154.out → n165.b
n164.out → n163.atom1
n165.out → n163.formula1
n166.out → n163.atom2
n32.out → n163.formula2
n109.out → n108.a
n163.out → n108.b
n20.out → n168.assertion
n169.out → n168.atom1
n32.out → n168.formula1
n170.out → n168.atom2
n32.out → n168.formula2
n171.out → n168.atom3
n154.out → n168.formula3
n108.out → n107.a
n168.out → n107.b
n6.out → n173.assertion
n97.out → n175.a
n165.out → n175.b
n174.out → n173.atom1
n175.out → n173.formula1
n176.out → n173.atom2
n12.out → n173.formula2
n107.out → n106.a
n173.out → n106.b
n20.out → n178.assertion
n179.out → n178.atom1
n12.out → n178.formula1
n180.out → n178.atom2
n97.out → n178.formula2
n181.out → n178.atom3
n165.out → n178.formula3
n106.out → n105.a
n178.out → n105.b
n47.out → n46.a
n105.out → n46.b
n20.out → n185.assertion
n186.out → n185.atom1
n32.out → n185.formula1
n187.out → n185.atom2
n12.out → n185.formula2
n188.out → n185.atom3
n153.out → n185.formula3
n6.out → n190.assertion
n32.out → n192.a
n153.out → n192.b
n36.out → n193.a
n192.out → n193.b
n165.out → n194.a
n193.out → n194.b
n191.out → n190.atom1
n194.out → n190.formula1
n195.out → n190.atom2
n12.out → n190.formula2
n185.out → n183.a
n190.out → n183.b
n20.out → n197.assertion
n198.out → n197.atom1
n12.out → n197.formula1
n199.out → n197.atom2
n165.out → n197.formula2
n200.out → n197.atom3
n193.out → n197.formula3
n183.out → n182.a
n197.out → n182.b
n46.out → n45.a
n182.out → n45.b
n20.out → n202.assertion
n203.out → n202.atom1
n12.out → n202.formula1
n204.out → n202.atom2
n36.out → n202.formula2
n205.out → n202.atom3
n192.out → n202.formula3
n45.out → n44.a
n202.out → n44.b
n28.out → n3.a
n44.out → n3.b
n3.out → n2.assertion
n207.out → n208.assertion
n209.out → n208.atom1
n12.out → n208.formula1
n210.out → n208.atom2
n192.out → n208.formula2
n207.out → n216.assertion
n217.out → n216.atom1
n32.out → n216.formula1
n218.out → n216.atom2
n153.out → n216.formula2
n6.out → n220.assertion
n192.out → n222.a
n32.out → n223.a
n153.out → n224.a
n223.out → n225.a
n224.out → n225.b
n222.out → n226.a
n225.out → n226.b
n221.out → n220.atom1
n226.out → n220.formula1
n12.out → n228.a
n227.out → n220.atom2
n228.out → n220.formula2
n216.out → n214.a
n220.out → n214.b
n20.out → n230.assertion
n231.out → n230.atom1
n228.out → n230.formula1
n232.out → n230.atom2
n222.out → n230.formula2
n233.out → n230.atom3
n225.out → n230.formula3
n214.out → n213.a
n230.out → n213.b
n6.out → n235.assertion
n228.out → n237.a
n222.out → n237.b
n228.out → n238.a
n225.out → n238.b
n237.out → n239.a
n238.out → n239.b
n236.out → n235.atom1
n239.out → n235.formula1
n12.out → n241.a
n192.out → n241.b
n241.out → n242.a
n240.out → n235.atom2
n242.out → n235.formula2
n213.out → n212.a
n235.out → n212.b
n20.out → n244.assertion
n245.out → n244.atom1
n242.out → n244.formula1
n246.out → n244.atom2
n237.out → n244.formula2
n247.out → n244.atom3
n238.out → n244.formula3
n212.out → n211.a
n244.out → n211.b
n208.out → n206.a
n211.out → n206.b
n2.out → n1.a
n206.out → n1.b
n1.out → n248.proof
```

</details>

### *44 · 辖域移动（变体三）

- 目标：`⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )`
- 提示：同 *38。
- 参考解：68 个模块 / 110 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n106  [target]
n1  mp
n4  axiom A1
n7  term y
n8  pred F
n9  term x
n10  pred G
n11  imp
n12  all(v=x)
n20  axiom A2
n28  subst(groups=1)
n29  atom P
n30  atom Q
n34  imp
n42  mp
n43  mp
n44  mp
n45  mp
n46  mp
n47  shift(v=x)
n48  mp
n49  mp
n51  subst(groups=1)
n52  atom P
n53  all(v=x)
n54  atom Q
n56  subst(groups=1)
n57  atom P
n58  imp
n59  imp
n60  atom Q
n62  subst(groups=2)
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n69  axiom A5(v=x)
n70  subst(groups=1)
n71  atom P
n72  atom Q
n74  subst(groups=2)
n75  atom P
n76  atom Q
n77  atom R
n78  all(v=x)
n80  subst(groups=1)
n81  atom P
n82  imp
n83  imp
n84  atom Q
n86  subst(groups=2)
n87  atom P
n88  atom Q
n89  atom R
n91  subst(groups=2)
n92  atom P
n93  atom Q
n94  atom R
n96  subst(groups=1)
n97  atom P
n98  imp
n99  imp
n100  atom Q
n102  subst(groups=2)
n103  atom P
n104  atom Q
n105  atom R

接线：
n7.out → n8.t1
n9.out → n10.t1
n8.out → n11.a
n10.out → n11.b
n11.out → n12.a
n4.out → n28.assertion
n29.out → n28.atom1
n12.out → n28.formula1
n30.out → n28.atom2
n8.out → n28.formula2
n8.out → n34.a
n12.out → n34.b
n8.out → n47.formula
n4.out → n51.assertion
n8.out → n53.a
n52.out → n51.atom1
n53.out → n51.formula1
n54.out → n51.atom2
n12.out → n51.formula2
n4.out → n56.assertion
n12.out → n58.a
n53.out → n58.b
n53.out → n59.a
n58.out → n59.b
n57.out → n56.atom1
n59.out → n56.formula1
n60.out → n56.atom2
n8.out → n56.formula2
n51.out → n49.a
n56.out → n49.b
n20.out → n62.assertion
n63.out → n62.atom1
n8.out → n62.formula1
n64.out → n62.atom2
n53.out → n62.formula2
n65.out → n62.atom3
n58.out → n62.formula3
n49.out → n48.a
n62.out → n48.b
n47.out → n46.a
n48.out → n46.b
n69.out → n70.assertion
n71.out → n70.atom1
n8.out → n70.formula1
n72.out → n70.atom2
n10.out → n70.formula2
n20.out → n74.assertion
n75.out → n74.atom1
n12.out → n74.formula1
n76.out → n74.atom2
n53.out → n74.formula2
n10.out → n78.a
n77.out → n74.atom3
n78.out → n74.formula3
n70.out → n68.a
n74.out → n68.b
n4.out → n80.assertion
n12.out → n82.a
n78.out → n82.b
n58.out → n83.a
n82.out → n83.b
n81.out → n80.atom1
n83.out → n80.formula1
n84.out → n80.atom2
n8.out → n80.formula2
n68.out → n67.a
n80.out → n67.b
n20.out → n86.assertion
n87.out → n86.atom1
n8.out → n86.formula1
n88.out → n86.atom2
n58.out → n86.formula2
n89.out → n86.atom3
n82.out → n86.formula3
n67.out → n66.a
n86.out → n66.b
n46.out → n45.a
n66.out → n45.b
n20.out → n91.assertion
n92.out → n91.atom1
n8.out → n91.formula1
n93.out → n91.atom2
n12.out → n91.formula2
n94.out → n91.atom3
n78.out → n91.formula3
n45.out → n44.a
n91.out → n44.b
n4.out → n96.assertion
n8.out → n98.a
n78.out → n98.b
n34.out → n99.a
n98.out → n99.b
n97.out → n96.atom1
n99.out → n96.formula1
n100.out → n96.atom2
n12.out → n96.formula2
n44.out → n43.a
n96.out → n43.b
n20.out → n102.assertion
n103.out → n102.atom1
n12.out → n102.formula1
n104.out → n102.atom2
n34.out → n102.formula2
n105.out → n102.atom3
n98.out → n102.formula3
n43.out → n42.a
n102.out → n42.b
n28.out → n1.a
n42.out → n1.b
n1.out → n106.proof
```

</details>

### *45 · 全称三段论（H/F）

- 目标：`⊢ ( ∀ x ( F ( x ) → H ( x ) ) → ( ( G ( x ) → ∀ x F ( x ) ) → ( G ( x ) → ∀ x H ( x ) ) ) )`
- 提示：同 *32，换谓词。
- 参考解：48 个模块 / 76 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n53  [target]
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
n14  atom P
n15  all(v=x)
n16  all(v=x)
n17  imp
n18  atom Q
n19  pred G
n21  subst(groups=1)
n22  atom P
n23  imp
n24  imp
n25  atom Q
n26  imp
n27  all(v=x)
n28  axiom A2
n29  subst(groups=2)
n30  atom P
n31  atom Q
n32  atom R
n33  mp
n34  mp
n36  subst(groups=2)
n37  atom P
n38  atom Q
n39  atom R
n41  subst(groups=1)
n42  atom P
n43  imp
n44  imp
n45  imp
n46  imp
n47  atom Q
n49  subst(groups=2)
n50  atom P
n51  atom Q
n52  atom R

接线：
n3.out → n4.assertion
n6.out → n7.t1
n5.out → n4.atom1
n7.out → n4.formula1
n6.out → n9.t1
n8.out → n4.atom2
n9.out → n4.formula2
n12.out → n13.assertion
n7.out → n15.a
n9.out → n16.a
n15.out → n17.a
n16.out → n17.b
n14.out → n13.atom1
n17.out → n13.formula1
n6.out → n19.t1
n18.out → n13.atom2
n19.out → n13.formula2
n12.out → n21.assertion
n19.out → n23.a
n17.out → n23.b
n17.out → n24.a
n23.out → n24.b
n22.out → n21.atom1
n24.out → n21.formula1
n7.out → n26.a
n9.out → n26.b
n26.out → n27.a
n25.out → n21.atom2
n27.out → n21.formula2
n13.out → n11.a
n21.out → n11.b
n28.out → n29.assertion
n30.out → n29.atom1
n27.out → n29.formula1
n31.out → n29.atom2
n17.out → n29.formula2
n32.out → n29.atom3
n23.out → n29.formula3
n11.out → n10.a
n29.out → n10.b
n4.out → n2.a
n10.out → n2.b
n28.out → n36.assertion
n37.out → n36.atom1
n19.out → n36.formula1
n38.out → n36.atom2
n15.out → n36.formula2
n39.out → n36.atom3
n16.out → n36.formula3
n12.out → n41.assertion
n19.out → n43.a
n15.out → n43.b
n19.out → n44.a
n16.out → n44.b
n43.out → n45.a
n44.out → n45.b
n23.out → n46.a
n45.out → n46.b
n42.out → n41.atom1
n46.out → n41.formula1
n47.out → n41.atom2
n27.out → n41.formula2
n36.out → n34.a
n41.out → n34.b
n28.out → n49.assertion
n50.out → n49.atom1
n27.out → n49.formula1
n51.out → n49.atom2
n23.out → n49.formula2
n52.out → n49.atom3
n45.out → n49.formula3
n34.out → n33.a
n49.out → n33.b
n2.out → n1.a
n33.out → n1.b
n1.out → n53.proof
```

</details>

### *46 · 全称合并（换序）

- 目标：`⊢ ( ( ∀ x G ( x ) → ∀ x ∀ x G ( x ) ) → ( ( ∀ x ( ∀ x G ( x ) → F ( x ) ) → ( ∀ x ∀ x G ( x ) → ∀ x F ( x ) ) ) → ( ∀ x ( ∀ x G ( x ) → F ( x ) ) → ( ∀ x G ( x ) → ∀ x F ( x ) ) ) ) )`
- 提示：同 *41，换谓词。
- 参考解：162 个模块 / 284 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n247  [target]
n1  mp
n2  mp
n3  mp
n6  axiom A1
n9  term x
n10  pred G
n11  all(v=x)
n12  all(v=x)
n13  imp
n21  axiom A2
n29  subst(groups=1)
n30  atom P
n31  atom Q
n32  pred F
n33  all(v=x)
n34  imp
n38  imp
n46  mp
n47  mp
n48  mp
n49  mp
n50  mp
n51  mp
n52  mp
n54  subst(groups=1)
n55  atom P
n56  atom Q
n57  mp
n59  subst(groups=1)
n60  atom P
n61  atom Q
n62  imp
n64  subst(groups=2)
n65  atom P
n66  atom Q
n67  atom R
n69  subst(groups=1)
n70  atom P
n71  atom Q
n72  mp
n73  mp
n75  subst(groups=1)
n76  atom P
n77  atom Q
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
n92  subst(groups=2)
n93  atom P
n94  atom Q
n95  atom R
n97  subst(groups=1)
n98  atom P
n99  imp
n100  imp
n101  atom Q
n103  subst(groups=2)
n104  atom P
n105  atom Q
n106  atom R
n107  mp
n108  mp
n109  mp
n110  mp
n111  mp
n131  subst(groups=1)
n132  atom P
n133  atom Q
n137  imp
n145  mp
n146  mp
n148  subst(groups=2)
n149  atom P
n150  atom Q
n151  atom R
n153  subst(groups=1)
n154  atom P
n155  imp
n156  imp
n157  imp
n158  atom Q
n160  subst(groups=2)
n161  atom P
n162  atom Q
n163  atom R
n165  subst(groups=1)
n166  atom P
n167  imp
n168  atom Q
n170  subst(groups=2)
n171  atom P
n172  atom Q
n173  atom R
n175  subst(groups=1)
n176  atom P
n177  imp
n178  atom Q
n180  subst(groups=2)
n181  atom P
n182  atom Q
n183  atom R
n184  mp
n185  mp
n187  subst(groups=2)
n188  atom P
n189  atom Q
n190  atom R
n192  subst(groups=1)
n193  atom P
n194  imp
n195  imp
n196  imp
n197  atom Q
n199  subst(groups=2)
n200  atom P
n201  atom Q
n202  atom R
n204  subst(groups=2)
n205  atom P
n206  atom Q
n207  atom R
n208  mp
n209  mp
n211  subst(groups=1)
n212  atom P
n213  atom Q
n214  imp
n215  all(v=x)
n217  subst(groups=1)
n218  atom P
n219  imp
n220  imp
n221  atom Q
n223  subst(groups=2)
n224  atom P
n225  atom Q
n226  atom R
n227  mp
n228  mp
n230  subst(groups=2)
n231  atom P
n232  atom Q
n233  atom R
n235  subst(groups=1)
n236  atom P
n237  imp
n238  imp
n239  imp
n240  imp
n241  atom Q
n243  subst(groups=2)
n244  atom P
n245  atom Q
n246  atom R

接线：
n9.out → n10.t1
n10.out → n11.a
n11.out → n12.a
n11.out → n13.a
n12.out → n13.b
n6.out → n29.assertion
n30.out → n29.atom1
n13.out → n29.formula1
n9.out → n32.t1
n32.out → n33.a
n12.out → n34.a
n33.out → n34.b
n31.out → n29.atom2
n34.out → n29.formula2
n34.out → n38.a
n13.out → n38.b
n6.out → n54.assertion
n55.out → n54.atom1
n33.out → n54.formula1
n56.out → n54.atom2
n33.out → n54.formula2
n6.out → n59.assertion
n60.out → n59.atom1
n33.out → n59.formula1
n33.out → n62.a
n33.out → n62.b
n61.out → n59.atom2
n62.out → n59.formula2
n21.out → n64.assertion
n65.out → n64.atom1
n33.out → n64.formula1
n66.out → n64.atom2
n62.out → n64.formula2
n67.out → n64.atom3
n33.out → n64.formula3
n59.out → n57.a
n64.out → n57.b
n54.out → n52.a
n57.out → n52.b
n6.out → n69.assertion
n70.out → n69.atom1
n62.out → n69.formula1
n71.out → n69.atom2
n13.out → n69.formula2
n52.out → n51.a
n69.out → n51.b
n6.out → n75.assertion
n76.out → n75.atom1
n62.out → n75.formula1
n77.out → n75.atom2
n12.out → n75.formula2
n6.out → n79.assertion
n12.out → n81.a
n62.out → n81.b
n62.out → n82.a
n81.out → n82.b
n80.out → n79.atom1
n82.out → n79.formula1
n83.out → n79.atom2
n13.out → n79.formula2
n75.out → n73.a
n79.out → n73.b
n21.out → n85.assertion
n86.out → n85.atom1
n13.out → n85.formula1
n87.out → n85.atom2
n62.out → n85.formula2
n88.out → n85.atom3
n81.out → n85.formula3
n73.out → n72.a
n85.out → n72.b
n51.out → n50.a
n72.out → n50.b
n21.out → n92.assertion
n93.out → n92.atom1
n12.out → n92.formula1
n94.out → n92.atom2
n33.out → n92.formula2
n95.out → n92.atom3
n33.out → n92.formula3
n6.out → n97.assertion
n34.out → n99.a
n34.out → n99.b
n81.out → n100.a
n99.out → n100.b
n98.out → n97.atom1
n100.out → n97.formula1
n101.out → n97.atom2
n13.out → n97.formula2
n92.out → n90.a
n97.out → n90.b
n21.out → n103.assertion
n104.out → n103.atom1
n13.out → n103.formula1
n105.out → n103.atom2
n81.out → n103.formula2
n106.out → n103.atom3
n99.out → n103.formula3
n90.out → n89.a
n103.out → n89.b
n50.out → n49.a
n89.out → n49.b
n6.out → n131.assertion
n132.out → n131.atom1
n34.out → n131.formula1
n133.out → n131.atom2
n11.out → n131.formula2
n11.out → n137.a
n34.out → n137.b
n21.out → n148.assertion
n149.out → n148.atom1
n11.out → n148.formula1
n150.out → n148.atom2
n12.out → n148.formula2
n151.out → n148.atom3
n33.out → n148.formula3
n6.out → n153.assertion
n11.out → n155.a
n33.out → n155.b
n13.out → n156.a
n155.out → n156.b
n137.out → n157.a
n156.out → n157.b
n154.out → n153.atom1
n157.out → n153.formula1
n158.out → n153.atom2
n34.out → n153.formula2
n148.out → n146.a
n153.out → n146.b
n21.out → n160.assertion
n161.out → n160.atom1
n34.out → n160.formula1
n162.out → n160.atom2
n137.out → n160.formula2
n163.out → n160.atom3
n156.out → n160.formula3
n146.out → n145.a
n160.out → n145.b
n131.out → n111.a
n145.out → n111.b
n6.out → n165.assertion
n34.out → n167.a
n156.out → n167.b
n166.out → n165.atom1
n167.out → n165.formula1
n168.out → n165.atom2
n34.out → n165.formula2
n111.out → n110.a
n165.out → n110.b
n21.out → n170.assertion
n171.out → n170.atom1
n34.out → n170.formula1
n172.out → n170.atom2
n34.out → n170.formula2
n173.out → n170.atom3
n156.out → n170.formula3
n110.out → n109.a
n170.out → n109.b
n6.out → n175.assertion
n99.out → n177.a
n167.out → n177.b
n176.out → n175.atom1
n177.out → n175.formula1
n178.out → n175.atom2
n13.out → n175.formula2
n109.out → n108.a
n175.out → n108.b
n21.out → n180.assertion
n181.out → n180.atom1
n13.out → n180.formula1
n182.out → n180.atom2
n99.out → n180.formula2
n183.out → n180.atom3
n167.out → n180.formula3
n108.out → n107.a
n180.out → n107.b
n49.out → n48.a
n107.out → n48.b
n21.out → n187.assertion
n188.out → n187.atom1
n34.out → n187.formula1
n189.out → n187.atom2
n13.out → n187.formula2
n190.out → n187.atom3
n155.out → n187.formula3
n6.out → n192.assertion
n34.out → n194.a
n155.out → n194.b
n38.out → n195.a
n194.out → n195.b
n167.out → n196.a
n195.out → n196.b
n193.out → n192.atom1
n196.out → n192.formula1
n197.out → n192.atom2
n13.out → n192.formula2
n187.out → n185.a
n192.out → n185.b
n21.out → n199.assertion
n200.out → n199.atom1
n13.out → n199.formula1
n201.out → n199.atom2
n167.out → n199.formula2
n202.out → n199.atom3
n195.out → n199.formula3
n185.out → n184.a
n199.out → n184.b
n48.out → n47.a
n184.out → n47.b
n21.out → n204.assertion
n205.out → n204.atom1
n13.out → n204.formula1
n206.out → n204.atom2
n38.out → n204.formula2
n207.out → n204.atom3
n194.out → n204.formula3
n47.out → n46.a
n204.out → n46.b
n29.out → n3.a
n46.out → n3.b
n6.out → n211.assertion
n212.out → n211.atom1
n194.out → n211.formula1
n11.out → n214.a
n32.out → n214.b
n214.out → n215.a
n213.out → n211.atom2
n215.out → n211.formula2
n6.out → n217.assertion
n215.out → n219.a
n194.out → n219.b
n194.out → n220.a
n219.out → n220.b
n218.out → n217.atom1
n220.out → n217.formula1
n221.out → n217.atom2
n13.out → n217.formula2
n211.out → n209.a
n217.out → n209.b
n21.out → n223.assertion
n224.out → n223.atom1
n13.out → n223.formula1
n225.out → n223.atom2
n194.out → n223.formula2
n226.out → n223.atom3
n219.out → n223.formula3
n209.out → n208.a
n223.out → n208.b
n3.out → n2.a
n208.out → n2.b
n21.out → n230.assertion
n231.out → n230.atom1
n215.out → n230.formula1
n232.out → n230.atom2
n34.out → n230.formula2
n233.out → n230.atom3
n155.out → n230.formula3
n6.out → n235.assertion
n215.out → n237.a
n34.out → n237.b
n215.out → n238.a
n155.out → n238.b
n237.out → n239.a
n238.out → n239.b
n219.out → n240.a
n239.out → n240.b
n236.out → n235.atom1
n240.out → n235.formula1
n241.out → n235.atom2
n13.out → n235.formula2
n230.out → n228.a
n235.out → n228.b
n21.out → n243.assertion
n244.out → n243.atom1
n13.out → n243.formula1
n245.out → n243.atom2
n219.out → n243.formula2
n246.out → n243.atom3
n239.out → n243.formula3
n228.out → n227.a
n243.out → n227.b
n2.out → n1.a
n227.out → n1.b
n1.out → n247.proof
```

</details>

### *47 · 全称替换前件（G）

- 目标：`⊢ ( ( G ( x ) → F ( x ) ) → ( ∀ x G ( x ) → F ( x ) ) )`
- 提示：同 *40，换谓词。
- 参考解：76 个模块 / 128 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n128  [target]
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
n15  atom P
n16  atom Q
n17  imp
n18  axiom A2
n19  subst(groups=2)
n20  atom P
n21  atom Q
n22  atom R
n26  subst(groups=1)
n27  atom P
n28  atom Q
n29  all(v=x)
n33  imp
n41  mp
n42  mp
n43  mp
n44  mp
n45  mp
n46  axiom A4(v=x)
n47  subst(groups=0)
n48  atom P
n49  mp
n50  mp
n52  subst(groups=1)
n53  atom P
n54  atom Q
n56  subst(groups=1)
n57  atom P
n58  imp
n59  imp
n60  atom Q
n62  subst(groups=2)
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n97  subst(groups=2)
n98  atom P
n99  atom Q
n100  atom R
n102  subst(groups=1)
n103  atom P
n104  imp
n105  imp
n106  atom Q
n108  subst(groups=2)
n109  atom P
n110  atom Q
n111  atom R
n113  subst(groups=2)
n114  atom P
n115  atom Q
n116  atom R
n118  subst(groups=1)
n119  atom P
n120  imp
n121  imp
n122  atom Q
n124  subst(groups=2)
n125  atom P
n126  atom Q
n127  atom R

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
n15.out → n14.atom1
n10.out → n14.formula1
n10.out → n17.a
n10.out → n17.b
n16.out → n14.atom2
n17.out → n14.formula2
n18.out → n19.assertion
n20.out → n19.atom1
n10.out → n19.formula1
n21.out → n19.atom2
n17.out → n19.formula2
n22.out → n19.atom3
n10.out → n19.formula3
n14.out → n12.a
n19.out → n12.b
n5.out → n3.a
n12.out → n3.b
n4.out → n26.assertion
n27.out → n26.atom1
n10.out → n26.formula1
n8.out → n29.a
n28.out → n26.atom2
n29.out → n26.formula2
n29.out → n33.a
n10.out → n33.b
n46.out → n47.assertion
n48.out → n47.atom1
n8.out → n47.formula1
n4.out → n52.assertion
n53.out → n52.atom1
n8.out → n52.formula1
n54.out → n52.atom2
n10.out → n52.formula2
n4.out → n56.assertion
n10.out → n58.a
n8.out → n58.b
n8.out → n59.a
n58.out → n59.b
n57.out → n56.atom1
n59.out → n56.formula1
n60.out → n56.atom2
n29.out → n56.formula2
n52.out → n50.a
n56.out → n50.b
n18.out → n62.assertion
n63.out → n62.atom1
n29.out → n62.formula1
n64.out → n62.atom2
n8.out → n62.formula2
n65.out → n62.atom3
n58.out → n62.formula3
n50.out → n49.a
n62.out → n49.b
n47.out → n45.a
n49.out → n45.b
n18.out → n97.assertion
n98.out → n97.atom1
n10.out → n97.formula1
n99.out → n97.atom2
n8.out → n97.formula2
n100.out → n97.atom3
n9.out → n97.formula3
n3.out → n68.a
n97.out → n68.b
n4.out → n102.assertion
n10.out → n104.a
n9.out → n104.b
n58.out → n105.a
n104.out → n105.b
n103.out → n102.atom1
n105.out → n102.formula1
n106.out → n102.atom2
n29.out → n102.formula2
n68.out → n67.a
n102.out → n67.b
n18.out → n108.assertion
n109.out → n108.atom1
n29.out → n108.formula1
n110.out → n108.atom2
n58.out → n108.formula2
n111.out → n108.atom3
n104.out → n108.formula3
n67.out → n66.a
n108.out → n66.b
n45.out → n44.a
n66.out → n44.b
n18.out → n113.assertion
n114.out → n113.atom1
n29.out → n113.formula1
n115.out → n113.atom2
n10.out → n113.formula2
n116.out → n113.atom3
n9.out → n113.formula3
n44.out → n43.a
n113.out → n43.b
n4.out → n118.assertion
n29.out → n120.a
n9.out → n120.b
n33.out → n121.a
n120.out → n121.b
n119.out → n118.atom1
n121.out → n118.formula1
n122.out → n118.atom2
n10.out → n118.formula2
n43.out → n42.a
n118.out → n42.b
n18.out → n124.assertion
n125.out → n124.atom1
n10.out → n124.formula1
n126.out → n124.atom2
n33.out → n124.formula2
n127.out → n124.atom3
n120.out → n124.formula3
n42.out → n41.a
n124.out → n41.b
n26.out → n1.a
n41.out → n1.b
n1.out → n128.proof
```

</details>

### *48 · 辖域移动（F/G 变体）

- 目标：`⊢ ( ∀ x ( F ( z ) → G ( y ) ) → ( F ( z ) → ∀ x G ( y ) ) )`
- 提示：同 *39，换变元位置。
- 参考解：68 个模块 / 110 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n106  [target]
n1  mp
n4  axiom A1
n7  term z
n8  pred F
n9  term y
n10  pred G
n11  imp
n12  all(v=x)
n20  axiom A2
n28  subst(groups=1)
n29  atom P
n30  atom Q
n34  imp
n42  mp
n43  mp
n44  mp
n45  mp
n46  mp
n47  shift(v=x)
n48  mp
n49  mp
n51  subst(groups=1)
n52  atom P
n53  all(v=x)
n54  atom Q
n56  subst(groups=1)
n57  atom P
n58  imp
n59  imp
n60  atom Q
n62  subst(groups=2)
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n69  axiom A5(v=x)
n70  subst(groups=1)
n71  atom P
n72  atom Q
n74  subst(groups=2)
n75  atom P
n76  atom Q
n77  atom R
n78  all(v=x)
n80  subst(groups=1)
n81  atom P
n82  imp
n83  imp
n84  atom Q
n86  subst(groups=2)
n87  atom P
n88  atom Q
n89  atom R
n91  subst(groups=2)
n92  atom P
n93  atom Q
n94  atom R
n96  subst(groups=1)
n97  atom P
n98  imp
n99  imp
n100  atom Q
n102  subst(groups=2)
n103  atom P
n104  atom Q
n105  atom R

接线：
n7.out → n8.t1
n9.out → n10.t1
n8.out → n11.a
n10.out → n11.b
n11.out → n12.a
n4.out → n28.assertion
n29.out → n28.atom1
n12.out → n28.formula1
n30.out → n28.atom2
n8.out → n28.formula2
n8.out → n34.a
n12.out → n34.b
n8.out → n47.formula
n4.out → n51.assertion
n8.out → n53.a
n52.out → n51.atom1
n53.out → n51.formula1
n54.out → n51.atom2
n12.out → n51.formula2
n4.out → n56.assertion
n12.out → n58.a
n53.out → n58.b
n53.out → n59.a
n58.out → n59.b
n57.out → n56.atom1
n59.out → n56.formula1
n60.out → n56.atom2
n8.out → n56.formula2
n51.out → n49.a
n56.out → n49.b
n20.out → n62.assertion
n63.out → n62.atom1
n8.out → n62.formula1
n64.out → n62.atom2
n53.out → n62.formula2
n65.out → n62.atom3
n58.out → n62.formula3
n49.out → n48.a
n62.out → n48.b
n47.out → n46.a
n48.out → n46.b
n69.out → n70.assertion
n71.out → n70.atom1
n8.out → n70.formula1
n72.out → n70.atom2
n10.out → n70.formula2
n20.out → n74.assertion
n75.out → n74.atom1
n12.out → n74.formula1
n76.out → n74.atom2
n53.out → n74.formula2
n10.out → n78.a
n77.out → n74.atom3
n78.out → n74.formula3
n70.out → n68.a
n74.out → n68.b
n4.out → n80.assertion
n12.out → n82.a
n78.out → n82.b
n58.out → n83.a
n82.out → n83.b
n81.out → n80.atom1
n83.out → n80.formula1
n84.out → n80.atom2
n8.out → n80.formula2
n68.out → n67.a
n80.out → n67.b
n20.out → n86.assertion
n87.out → n86.atom1
n8.out → n86.formula1
n88.out → n86.atom2
n58.out → n86.formula2
n89.out → n86.atom3
n82.out → n86.formula3
n67.out → n66.a
n86.out → n66.b
n46.out → n45.a
n66.out → n45.b
n20.out → n91.assertion
n92.out → n91.atom1
n8.out → n91.formula1
n93.out → n91.atom2
n12.out → n91.formula2
n94.out → n91.atom3
n78.out → n91.formula3
n45.out → n44.a
n91.out → n44.b
n4.out → n96.assertion
n8.out → n98.a
n78.out → n98.b
n34.out → n99.a
n98.out → n99.b
n97.out → n96.atom1
n99.out → n96.formula1
n100.out → n96.atom2
n12.out → n96.formula2
n44.out → n43.a
n96.out → n43.b
n20.out → n102.assertion
n103.out → n102.atom1
n12.out → n102.formula1
n104.out → n102.atom2
n34.out → n102.formula2
n105.out → n102.atom3
n98.out → n102.formula3
n43.out → n42.a
n102.out → n42.b
n28.out → n1.a
n42.out → n1.b
n1.out → n106.proof
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

### *49 · 自反（x）

- 目标：`⊢ x = x`
- 提示：直接用等词自反规则。
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

### *50 · 自反式合并

- 目标：`⊢ ∀ x ∀ y ( x = x ∧ y = y )`
- 提示：分别用等词自反取 x、y，再用 ∧I* 合并，最后全称推广。
- 参考解：11 个模块 / 13 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n12  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  mp
n4  mp
n5  and-intro-ax
n6  term x
n7  pred =
n8  term y
n9  pred =
n10  eq-refl(t=x)
n11  eq-refl(t=y)

接线：
n6.out → n7.t1
n6.out → n7.t2
n7.out → n5.a
n8.out → n9.t1
n8.out → n9.t2
n9.out → n5.b
n5.out → n4.a
n10.out → n4.b
n4.out → n3.a
n11.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n12.proof
```

</details>

### *51 · 对称性

- 目标：`⊢ ( x = y → y = x )`
- 提示：用替换把 x=x 变成 y=x，再用置换律。
- 参考解：16 个模块 / 23 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n17  [target]
n1  mp
n2  eq-refl(t=x)
n3  mp
n4  leibniz(mode=abstract, v=z)
n5  term x
n6  term y
n7  term z
n8  pred =
n9  定理 *08
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
n1.out → n17.proof
```

</details>

### *52 · 传递性

- 目标：`⊢ ( x = y → ( y = z → x = z ) )`
- 提示：对 y=z 用替换得到 x=y→x=z，再置换前件。
- 参考解：13 个模块 / 19 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n14  [target]
n1  mp
n2  leibniz(mode=abstract, v=z)
n3  term y
n4  term z
n5  term x
n6  pred =
n7  定理 *08
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
n1.out → n14.proof
```

</details>

### *53 · 谓词替换

- 目标：`⊢ ( x = y → ( F ( x ) → F ( y ) ) )`
- 提示：把 F(z) 作为抽象公式。
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

### *54 · 谓词替换（反向）

- 目标：`⊢ ( x = y → ( F ( y ) → F ( x ) ) )`
- 提示：先对称，再替换，最后用三段论。
- 参考解：18 个模块 / 24 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n19  [target]
n1  mp
n2  leibniz(mode=abstract, v=z)
n3  term y
n4  term x
n5  term z
n6  pred F
n7  mp
n8  定理 *51
n9  定理 *05
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
n1.out → n19.proof
```

</details>

### *55 · 全称自反

- 目标：`⊢ ∀ x x = x`
- 提示：用全称推广。
- 参考解：2 个模块 / 2 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n3  [target]
n1  gen(v=x)
n2  eq-refl(t=x)

接线：
n2.out → n1.assertion
n1.out → n3.proof
```

</details>

### *56 · 对称的双向结论

- 目标：`⊢ ∀ x ∀ y ( x = y → ( x = y ∧ y = x ) )`
- 提示：用 *51 得到 y=x，再与假设本身用 ∧I* 合并；DT 消去假设后全称推广。
- 参考解：16 个模块 / 22 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n44  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  mp
n8  term x
n9  term y
n10  pred =
n13  定理 *51
n17  pred =
n20  axiom A2
n25  mp
n29  and-intro-ax
n32  and
n40  subst(groups=2)
n41  atom P
n42  atom Q
n43  atom R

接线：
n8.out → n10.t1
n9.out → n10.t2
n9.out → n17.t1
n8.out → n17.t2
n10.out → n29.a
n17.out → n29.b
n10.out → n32.a
n17.out → n32.b
n20.out → n40.assertion
n41.out → n40.atom1
n10.out → n40.formula1
n42.out → n40.atom2
n17.out → n40.formula2
n43.out → n40.atom3
n32.out → n40.formula3
n29.out → n25.a
n40.out → n25.b
n13.out → n3.a
n25.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n44.proof
```

</details>

### *57 · 复合替换

- 目标：`⊢ ( x = y → ( ( F ( x ) → G ( x ) ) → ( F ( y ) → G ( y ) ) ) )`
- 提示：把整个蕴涵式作为抽象公式。
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

### *58 · 否定替换

- 目标：`⊢ ( x = y → ( ¬ F ( x ) → ¬ F ( y ) ) )`
- 提示：先用 *54 得到 F(y)→F(x)，再套逆否定理 *9 得到 ¬F(x)→¬F(y)，最后用 HS 串起 x=y。
- 参考解：21 个模块 / 27 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n22  [target]
n1  mp
n2  定理 *09
n3  subst(groups=1)
n4  atom P
n5  term y
n6  pred F
n7  atom Q
n8  term x
n9  pred F
n10  mp
n11  定理 *54
n12  定理 *05
n13  subst(groups=2)
n14  atom P
n15  pred =
n16  atom Q
n17  imp
n18  atom R
n19  not
n20  not
n21  imp

接线：
n2.out → n3.assertion
n5.out → n6.t1
n4.out → n3.atom1
n6.out → n3.formula1
n8.out → n9.t1
n7.out → n3.atom2
n9.out → n3.formula2
n12.out → n13.assertion
n8.out → n15.t1
n5.out → n15.t2
n14.out → n13.atom1
n15.out → n13.formula1
n6.out → n17.a
n9.out → n17.b
n16.out → n13.atom2
n17.out → n13.formula2
n9.out → n19.a
n6.out → n20.a
n19.out → n21.a
n20.out → n21.b
n18.out → n13.atom3
n21.out → n13.formula3
n11.out → n10.a
n13.out → n10.b
n3.out → n1.a
n10.out → n1.b
n1.out → n22.proof
```

</details>

### *59 · 条件替换

- 目标：`⊢ ( x = y → ( ( x = x → F ( x ) ) → ( y = y → F ( y ) ) ) )`
- 提示：假设 x=y 与 x=x→F(x)：由等词自反得 x=x，配合 *53 得 F(y)，再用 A1 补出 y=y→F(y)；两次 DT。
- 参考解：180 个模块 / 313 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n194  [target]
n1  mp
n2  mp
n3  mp
n4  mp
n5  mp
n6  eq-refl(t=x)
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
n18  atom P
n19  atom Q
n20  pred F
n21  imp
n22  subst(groups=1)
n23  atom P
n24  imp
n25  imp
n26  atom Q
n27  axiom A2
n28  subst(groups=2)
n29  atom P
n30  atom Q
n31  atom R
n32  mp
n33  mp
n34  mp
n35  定理 *01
n36  subst(groups=0)
n37  atom P
n38  subst(groups=1)
n39  atom P
n40  imp
n41  atom Q
n42  mp
n43  mp
n44  subst(groups=2)
n45  atom P
n46  atom Q
n47  atom R
n48  subst(groups=1)
n49  atom P
n50  imp
n51  imp
n52  imp
n53  atom Q
n54  subst(groups=2)
n55  atom P
n56  atom Q
n57  atom R
n58  subst(groups=2)
n59  atom P
n60  atom Q
n61  atom R
n62  mp
n63  mp
n64  mp
n70  subst(groups=1)
n71  atom P
n72  atom Q
n75  imp
n82  mp
n83  mp
n84  mp
n85  mp
n86  定理 *53
n87  subst(groups=1)
n88  atom P
n89  pred F
n90  imp
n91  imp
n92  atom Q
n93  mp
n94  mp
n95  subst(groups=1)
n96  atom P
n97  atom Q
n98  subst(groups=1)
n99  atom P
n100  imp
n101  imp
n102  atom Q
n103  subst(groups=2)
n104  atom P
n105  atom Q
n106  atom R
n107  mp
n108  mp
n109  subst(groups=2)
n110  atom P
n111  atom Q
n112  atom R
n113  subst(groups=1)
n114  atom P
n115  imp
n116  imp
n117  imp
n118  atom Q
n119  subst(groups=2)
n120  atom P
n121  atom Q
n122  atom R
n123  subst(groups=2)
n124  atom P
n125  atom Q
n126  atom R
n127  mp
n128  mp
n129  subst(groups=2)
n130  atom P
n131  atom Q
n132  atom R
n133  subst(groups=1)
n134  atom P
n135  imp
n136  imp
n137  imp
n138  atom Q
n139  subst(groups=2)
n140  atom P
n141  atom Q
n142  atom R
n143  subst(groups=2)
n144  atom P
n145  atom Q
n146  atom R
n147  mp
n148  mp
n149  mp
n150  mp
n151  subst(groups=1)
n152  atom P
n153  atom Q
n154  pred =
n155  subst(groups=1)
n156  atom P
n157  imp
n158  imp
n159  atom Q
n160  mp
n161  mp
n162  subst(groups=1)
n163  atom P
n164  atom Q
n165  subst(groups=1)
n166  atom P
n167  imp
n168  imp
n169  atom Q
n170  subst(groups=2)
n171  atom P
n172  atom Q
n173  atom R
n174  mp
n175  mp
n176  subst(groups=2)
n177  atom P
n178  atom Q
n179  atom R
n180  subst(groups=1)
n181  atom P
n182  imp
n183  imp
n184  imp
n185  atom Q
n186  subst(groups=2)
n187  atom P
n188  atom Q
n189  atom R
n190  subst(groups=2)
n191  atom P
n192  atom Q
n193  atom R

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
n18.out → n17.atom1
n11.out → n17.formula1
n10.out → n20.t1
n11.out → n21.a
n20.out → n21.b
n19.out → n17.atom2
n21.out → n17.formula2
n7.out → n22.assertion
n21.out → n24.a
n11.out → n24.b
n11.out → n25.a
n24.out → n25.b
n23.out → n22.atom1
n25.out → n22.formula1
n26.out → n22.atom2
n14.out → n22.formula2
n17.out → n16.a
n22.out → n16.b
n27.out → n28.assertion
n29.out → n28.atom1
n14.out → n28.formula1
n30.out → n28.atom2
n11.out → n28.formula2
n31.out → n28.atom3
n24.out → n28.formula3
n16.out → n15.a
n28.out → n15.b
n5.out → n4.a
n15.out → n4.b
n35.out → n36.assertion
n37.out → n36.atom1
n21.out → n36.formula1
n7.out → n38.assertion
n21.out → n40.a
n21.out → n40.b
n39.out → n38.atom1
n40.out → n38.formula1
n41.out → n38.atom2
n14.out → n38.formula2
n36.out → n34.a
n38.out → n34.b
n27.out → n44.assertion
n45.out → n44.atom1
n21.out → n44.formula1
n46.out → n44.atom2
n11.out → n44.formula2
n47.out → n44.atom3
n20.out → n44.formula3
n7.out → n48.assertion
n21.out → n50.a
n20.out → n50.b
n24.out → n51.a
n50.out → n51.b
n40.out → n52.a
n51.out → n52.b
n49.out → n48.atom1
n52.out → n48.formula1
n53.out → n48.atom2
n14.out → n48.formula2
n44.out → n43.a
n48.out → n43.b
n27.out → n54.assertion
n55.out → n54.atom1
n14.out → n54.formula1
n56.out → n54.atom2
n40.out → n54.formula2
n57.out → n54.atom3
n51.out → n54.formula3
n43.out → n42.a
n54.out → n42.b
n34.out → n33.a
n42.out → n33.b
n27.out → n58.assertion
n59.out → n58.atom1
n14.out → n58.formula1
n60.out → n58.atom2
n24.out → n58.formula2
n61.out → n58.atom3
n50.out → n58.formula3
n33.out → n32.a
n58.out → n32.b
n4.out → n3.a
n32.out → n3.b
n7.out → n70.assertion
n71.out → n70.atom1
n14.out → n70.formula1
n72.out → n70.atom2
n21.out → n70.formula2
n21.out → n75.a
n14.out → n75.b
n7.out → n87.assertion
n13.out → n89.t1
n20.out → n90.a
n89.out → n90.b
n14.out → n91.a
n90.out → n91.b
n88.out → n87.atom1
n91.out → n87.formula1
n92.out → n87.atom2
n14.out → n87.formula2
n86.out → n85.a
n87.out → n85.b
n7.out → n95.assertion
n96.out → n95.atom1
n91.out → n95.formula1
n97.out → n95.atom2
n21.out → n95.formula2
n7.out → n98.assertion
n21.out → n100.a
n91.out → n100.b
n91.out → n101.a
n100.out → n101.b
n99.out → n98.atom1
n101.out → n98.formula1
n102.out → n98.atom2
n14.out → n98.formula2
n95.out → n94.a
n98.out → n94.b
n27.out → n103.assertion
n104.out → n103.atom1
n14.out → n103.formula1
n105.out → n103.atom2
n91.out → n103.formula2
n106.out → n103.atom3
n100.out → n103.formula3
n94.out → n93.a
n103.out → n93.b
n85.out → n84.a
n93.out → n84.b
n27.out → n109.assertion
n110.out → n109.atom1
n21.out → n109.formula1
n111.out → n109.atom2
n14.out → n109.formula2
n112.out → n109.atom3
n90.out → n109.formula3
n7.out → n113.assertion
n21.out → n115.a
n90.out → n115.b
n75.out → n116.a
n115.out → n116.b
n100.out → n117.a
n116.out → n117.b
n114.out → n113.atom1
n117.out → n113.formula1
n118.out → n113.atom2
n14.out → n113.formula2
n109.out → n108.a
n113.out → n108.b
n27.out → n119.assertion
n120.out → n119.atom1
n14.out → n119.formula1
n121.out → n119.atom2
n100.out → n119.formula2
n122.out → n119.atom3
n116.out → n119.formula3
n108.out → n107.a
n119.out → n107.b
n84.out → n83.a
n107.out → n83.b
n27.out → n123.assertion
n124.out → n123.atom1
n14.out → n123.formula1
n125.out → n123.atom2
n75.out → n123.formula2
n126.out → n123.atom3
n115.out → n123.formula3
n83.out → n82.a
n123.out → n82.b
n70.out → n64.a
n82.out → n64.b
n27.out → n129.assertion
n130.out → n129.atom1
n21.out → n129.formula1
n131.out → n129.atom2
n20.out → n129.formula2
n132.out → n129.atom3
n89.out → n129.formula3
n7.out → n133.assertion
n21.out → n135.a
n89.out → n135.b
n50.out → n136.a
n135.out → n136.b
n115.out → n137.a
n136.out → n137.b
n134.out → n133.atom1
n137.out → n133.formula1
n138.out → n133.atom2
n14.out → n133.formula2
n129.out → n128.a
n133.out → n128.b
n27.out → n139.assertion
n140.out → n139.atom1
n14.out → n139.formula1
n141.out → n139.atom2
n115.out → n139.formula2
n142.out → n139.atom3
n136.out → n139.formula3
n128.out → n127.a
n139.out → n127.b
n64.out → n63.a
n127.out → n63.b
n27.out → n143.assertion
n144.out → n143.atom1
n14.out → n143.formula1
n145.out → n143.atom2
n50.out → n143.formula2
n146.out → n143.atom3
n135.out → n143.formula3
n63.out → n62.a
n143.out → n62.b
n3.out → n2.a
n62.out → n2.b
n7.out → n151.assertion
n152.out → n151.atom1
n89.out → n151.formula1
n13.out → n154.t1
n13.out → n154.t2
n153.out → n151.atom2
n154.out → n151.formula2
n7.out → n155.assertion
n154.out → n157.a
n89.out → n157.b
n89.out → n158.a
n157.out → n158.b
n156.out → n155.atom1
n158.out → n155.formula1
n159.out → n155.atom2
n14.out → n155.formula2
n151.out → n150.a
n155.out → n150.b
n7.out → n162.assertion
n163.out → n162.atom1
n158.out → n162.formula1
n164.out → n162.atom2
n21.out → n162.formula2
n7.out → n165.assertion
n21.out → n167.a
n158.out → n167.b
n158.out → n168.a
n167.out → n168.b
n166.out → n165.atom1
n168.out → n165.formula1
n169.out → n165.atom2
n14.out → n165.formula2
n162.out → n161.a
n165.out → n161.b
n27.out → n170.assertion
n171.out → n170.atom1
n14.out → n170.formula1
n172.out → n170.atom2
n158.out → n170.formula2
n173.out → n170.atom3
n167.out → n170.formula3
n161.out → n160.a
n170.out → n160.b
n150.out → n149.a
n160.out → n149.b
n27.out → n176.assertion
n177.out → n176.atom1
n21.out → n176.formula1
n178.out → n176.atom2
n89.out → n176.formula2
n179.out → n176.atom3
n157.out → n176.formula3
n7.out → n180.assertion
n21.out → n182.a
n157.out → n182.b
n135.out → n183.a
n182.out → n183.b
n167.out → n184.a
n183.out → n184.b
n181.out → n180.atom1
n184.out → n180.formula1
n185.out → n180.atom2
n14.out → n180.formula2
n176.out → n175.a
n180.out → n175.b
n27.out → n186.assertion
n187.out → n186.atom1
n14.out → n186.formula1
n188.out → n186.atom2
n167.out → n186.formula2
n189.out → n186.atom3
n183.out → n186.formula3
n175.out → n174.a
n186.out → n174.b
n149.out → n148.a
n174.out → n148.b
n27.out → n190.assertion
n191.out → n190.atom1
n14.out → n190.formula1
n192.out → n190.atom2
n135.out → n190.formula2
n193.out → n190.atom3
n182.out → n190.formula3
n148.out → n147.a
n190.out → n147.b
n2.out → n1.a
n147.out → n1.b
n1.out → n194.proof
```

</details>

### *60 · 不含 x 的公式

- 目标：`⊢ ( x = y → ( ∀ z z = z → ∀ z z = z ) )`
- 提示：先取 B→B（同一律实例），再用 A1 把 x=y 插到前面。
- 参考解：15 个模块 / 18 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n16  [target]
n1  mp
n2  定理 *01
n3  subst(groups=0)
n4  atom P
n5  term z
n6  pred =
n7  all(v=z)
n8  axiom A1
n9  subst(groups=1)
n10  atom P
n11  imp
n12  atom Q
n13  term x
n14  term y
n15  pred =

接线：
n2.out → n3.assertion
n5.out → n6.t1
n5.out → n6.t2
n6.out → n7.a
n4.out → n3.atom1
n7.out → n3.formula1
n8.out → n9.assertion
n7.out → n11.a
n7.out → n11.b
n10.out → n9.atom1
n11.out → n9.formula1
n13.out → n15.t1
n14.out → n15.t2
n12.out → n9.atom2
n15.out → n9.formula2
n3.out → n1.a
n9.out → n1.b
n1.out → n16.proof
```

</details>

### *61 · 谓词替换（双向）

- 目标：`⊢ ∀ x ∀ y ( x = y → ( F ( x ) ↔ F ( y ) ) )`
- 提示：*53 给正向、*54 给反向，用 ↔I 合成，DT 消去 x=y 后全称推广。
- 参考解：33 个模块 / 48 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n59  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  mp
n8  term x
n9  term y
n10  pred =
n13  定理 *54
n14  axiom A1
n17  pred F
n18  pred F
n19  imp
n22  axiom A2
n27  mp
n28  mp
n32  定理 *53
n35  imp
n42  mp
n43  mp
n44  iff-intro-ax
n45  subst(groups=1)
n46  atom P
n47  iff
n48  imp
n49  imp
n50  atom Q
n51  subst(groups=2)
n52  atom P
n53  atom Q
n54  atom R
n55  subst(groups=2)
n56  atom P
n57  atom Q
n58  atom R

接线：
n8.out → n10.t1
n9.out → n10.t2
n9.out → n17.t1
n8.out → n18.t1
n17.out → n19.a
n18.out → n19.b
n18.out → n35.a
n17.out → n35.b
n18.out → n44.a
n17.out → n44.b
n14.out → n45.assertion
n18.out → n47.a
n17.out → n47.b
n19.out → n48.a
n47.out → n48.b
n35.out → n49.a
n48.out → n49.b
n46.out → n45.atom1
n49.out → n45.formula1
n50.out → n45.atom2
n10.out → n45.formula2
n44.out → n43.a
n45.out → n43.b
n22.out → n51.assertion
n52.out → n51.atom1
n10.out → n51.formula1
n53.out → n51.atom2
n35.out → n51.formula2
n54.out → n51.atom3
n48.out → n51.formula3
n43.out → n42.a
n51.out → n42.b
n32.out → n28.a
n42.out → n28.b
n22.out → n55.assertion
n56.out → n55.atom1
n10.out → n55.formula1
n57.out → n55.atom2
n19.out → n55.formula2
n58.out → n55.atom3
n47.out → n55.formula3
n28.out → n27.a
n55.out → n27.b
n13.out → n3.a
n27.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n59.proof
```

</details>

### *62 · 否定复合替换

- 目标：`⊢ ( x = y → ( ¬ ( F ( x ) → G ( x ) ) → ¬ ( F ( y ) → G ( y ) ) ) )`
- 提示：把整个否定蕴涵作为抽象公式。
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

### *63 · 自反条件替换

- 目标：`⊢ ( x = y → ( ( F ( x ) → F ( x ) ) → ( F ( y ) → F ( y ) ) ) )`
- 提示：由同一律得 F(y)→F(y)，A1 插入 x=y 与 F(x)→F(x)，再用前件重排 *8。
- 参考解：26 个模块 / 37 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n27  [target]
n1  mp
n2  定理 *08
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
n17  atom P
n18  imp
n19  atom Q
n20  mp
n21  定理 *01
n22  subst(groups=0)
n23  atom P
n24  subst(groups=1)
n25  atom P
n26  atom Q

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
n10.out → n18.a
n13.out → n18.b
n17.out → n16.atom1
n18.out → n16.formula1
n19.out → n16.atom2
n7.out → n16.formula2
n21.out → n22.assertion
n23.out → n22.atom1
n12.out → n22.formula1
n15.out → n24.assertion
n25.out → n24.atom1
n13.out → n24.formula1
n26.out → n24.atom2
n10.out → n24.formula2
n22.out → n20.a
n24.out → n20.b
n16.out → n14.a
n20.out → n14.b
n3.out → n1.a
n14.out → n1.b
n1.out → n27.proof
```

</details>

### *64 · 全称辖域（定理）

- 目标：`⊢ ( ∀ z ( P → Q ) → ( P → ∀ z Q ) )`
- 提示：先引用 *66 这条已证定理，再用分离。
- 参考解：84 个模块 / 141 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n140  [target]
n1  mp
n5  axiom A1
n8  atom P
n11  atom Q
n12  imp
n13  all(v=z)
n17  mp
n18  shift(v=z)
n19  subst(groups=1)
n20  atom P
n21  all(v=z)
n22  imp
n23  atom Q
n34  axiom A2
n57  mp
n58  mp
n59  mp
n65  subst(groups=1)
n66  atom P
n67  atom Q
n70  imp
n77  mp
n78  mp
n79  mp
n80  mp
n81  axiom A5(v=z)
n82  subst(groups=1)
n83  atom P
n84  all(v=z)
n85  imp
n86  imp
n87  atom Q
n88  mp
n89  mp
n90  subst(groups=1)
n91  atom P
n92  atom Q
n93  subst(groups=1)
n94  atom P
n95  imp
n96  imp
n97  atom Q
n98  subst(groups=2)
n99  atom P
n100  atom Q
n101  atom R
n102  mp
n103  mp
n104  subst(groups=1)
n105  atom Q
n106  atom R
n107  subst(groups=1)
n108  atom P
n109  imp
n110  imp
n111  imp
n112  atom Q
n113  subst(groups=2)
n114  atom P
n115  atom Q
n116  atom R
n117  subst(groups=2)
n118  atom P
n119  atom Q
n120  atom R
n121  mp
n122  mp
n123  subst(groups=1)
n124  atom Q
n125  atom R
n126  subst(groups=1)
n127  atom P
n128  imp
n129  imp
n130  imp
n131  atom Q
n132  subst(groups=2)
n133  atom P
n134  atom Q
n135  atom R
n136  subst(groups=2)
n137  atom P
n138  atom Q
n139  atom R

接线：
n8.out → n12.a
n11.out → n12.b
n12.out → n13.a
n8.out → n18.formula
n5.out → n19.assertion
n8.out → n21.a
n8.out → n22.a
n21.out → n22.b
n20.out → n19.atom1
n22.out → n19.formula1
n23.out → n19.atom2
n13.out → n19.formula2
n18.out → n17.a
n19.out → n17.b
n5.out → n65.assertion
n66.out → n65.atom1
n13.out → n65.formula1
n67.out → n65.atom2
n8.out → n65.formula2
n8.out → n70.a
n13.out → n70.b
n5.out → n82.assertion
n11.out → n84.a
n21.out → n85.a
n84.out → n85.b
n13.out → n86.a
n85.out → n86.b
n83.out → n82.atom1
n86.out → n82.formula1
n87.out → n82.atom2
n13.out → n82.formula2
n81.out → n80.a
n82.out → n80.b
n5.out → n90.assertion
n91.out → n90.atom1
n86.out → n90.formula1
n92.out → n90.atom2
n8.out → n90.formula2
n5.out → n93.assertion
n8.out → n95.a
n86.out → n95.b
n86.out → n96.a
n95.out → n96.b
n94.out → n93.atom1
n96.out → n93.formula1
n97.out → n93.atom2
n13.out → n93.formula2
n90.out → n89.a
n93.out → n89.b
n34.out → n98.assertion
n99.out → n98.atom1
n13.out → n98.formula1
n100.out → n98.atom2
n86.out → n98.formula2
n101.out → n98.atom3
n95.out → n98.formula3
n89.out → n88.a
n98.out → n88.b
n80.out → n79.a
n88.out → n79.b
n34.out → n104.assertion
n105.out → n104.atom1
n13.out → n104.formula1
n106.out → n104.atom2
n85.out → n104.formula2
n5.out → n107.assertion
n8.out → n109.a
n85.out → n109.b
n70.out → n110.a
n109.out → n110.b
n95.out → n111.a
n110.out → n111.b
n108.out → n107.atom1
n111.out → n107.formula1
n112.out → n107.atom2
n13.out → n107.formula2
n104.out → n103.a
n107.out → n103.b
n34.out → n113.assertion
n114.out → n113.atom1
n13.out → n113.formula1
n115.out → n113.atom2
n95.out → n113.formula2
n116.out → n113.atom3
n110.out → n113.formula3
n103.out → n102.a
n113.out → n102.b
n79.out → n78.a
n102.out → n78.b
n34.out → n117.assertion
n118.out → n117.atom1
n13.out → n117.formula1
n119.out → n117.atom2
n70.out → n117.formula2
n120.out → n117.atom3
n109.out → n117.formula3
n78.out → n77.a
n117.out → n77.b
n65.out → n59.a
n77.out → n59.b
n34.out → n123.assertion
n124.out → n123.atom1
n21.out → n123.formula1
n125.out → n123.atom2
n84.out → n123.formula2
n5.out → n126.assertion
n8.out → n128.a
n84.out → n128.b
n22.out → n129.a
n128.out → n129.b
n109.out → n130.a
n129.out → n130.b
n127.out → n126.atom1
n130.out → n126.formula1
n131.out → n126.atom2
n13.out → n126.formula2
n123.out → n122.a
n126.out → n122.b
n34.out → n132.assertion
n133.out → n132.atom1
n13.out → n132.formula1
n134.out → n132.atom2
n109.out → n132.formula2
n135.out → n132.atom3
n129.out → n132.formula3
n122.out → n121.a
n132.out → n121.b
n59.out → n58.a
n121.out → n58.b
n34.out → n136.assertion
n137.out → n136.atom1
n13.out → n136.formula1
n138.out → n136.atom2
n22.out → n136.formula2
n139.out → n136.atom3
n128.out → n136.formula3
n58.out → n57.a
n136.out → n57.b
n17.out → n1.a
n57.out → n1.b
n1.out → n140.proof
```

</details>

### *65 · 等词的双向同余

- 目标：`⊢ ( x = y → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) )`
- 提示：正向用替换，反向先对称再替换；各自推广并移动 ∀，最后合取。
- 参考解：48 个模块 / 76 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n49  [target]
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
n11  定理 *51
n12  定理 *05
n13  subst(groups=2)
n14  atom P
n15  pred =
n16  atom Q
n17  pred =
n18  atom R
n19  mem
n20  imp
n21  定理 *64
n22  subst(groups=1)
n23  atom P
n24  atom Q
n25  mp
n26  mp
n27  and-intro-ax
n28  imp
n29  all(v=z)
n30  all(v=z)
n31  mp
n32  mp
n33  gen(v=z)
n34  leibniz(mode=replace, v=z)
n35  subst(groups=1)
n36  atom P
n37  atom Q
n38  subst(groups=2)
n39  atom P
n40  atom Q
n41  atom R
n42  and
n43  imp
n44  axiom A2
n45  subst(groups=2)
n46  atom P
n47  atom Q
n48  atom R

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
n23.out → n22.atom1
n15.out → n22.formula1
n24.out → n22.atom2
n20.out → n22.formula2
n3.out → n2.a
n22.out → n2.b
n19.out → n28.a
n9.out → n28.b
n28.out → n29.a
n29.out → n27.a
n20.out → n30.a
n30.out → n27.b
n7.out → n34.x
n6.out → n34.y
n19.out → n34.formula
n34.out → n33.assertion
n21.out → n35.assertion
n36.out → n35.atom1
n15.out → n35.formula1
n37.out → n35.atom2
n28.out → n35.formula2
n33.out → n32.a
n35.out → n32.b
n12.out → n38.assertion
n39.out → n38.atom1
n15.out → n38.formula1
n40.out → n38.atom2
n29.out → n38.formula2
n29.out → n42.a
n30.out → n42.b
n30.out → n43.a
n42.out → n43.b
n41.out → n38.atom3
n43.out → n38.formula3
n32.out → n31.a
n38.out → n31.b
n27.out → n26.a
n31.out → n26.b
n44.out → n45.assertion
n46.out → n45.atom1
n15.out → n45.formula1
n47.out → n45.atom2
n30.out → n45.formula2
n48.out → n45.atom3
n42.out → n45.formula3
n26.out → n25.a
n45.out → n25.b
n2.out → n1.a
n25.out → n1.b
n1.out → n49.proof
```

</details>

### *66 · 等词给出元素等价

- 目标：`⊢ ( x = y → ∀ z ( z ∈ x ↔ z ∈ y ) )`
- 提示：先引用 *65 得到两个方向的 ∀ 蕴含，逐个元素用 ↔E 拆、↔I 合，再全称推广；假设用 DT 消去。
- 参考解：88 个模块 / 148 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n103  [target]
n1  mp
n2  gen(v=z)
n3  mp
n4  mp
n5  mp
n10  term x
n11  term y
n12  pred =
n15  定理 *65
n16  axiom A1
n19  term z
n20  mem
n21  mem
n22  imp
n23  all(v=z)
n24  imp
n25  all(v=z)
n26  and
n29  axiom A2
n34  mp
n35  mp
n36  and-elim-ax(side=r)
n37  subst(groups=1)
n38  atom P
n39  imp
n40  atom Q
n41  subst(groups=2)
n42  atom P
n43  atom Q
n44  atom R
n45  mp
n46  mp
n47  all-inst(v=z)
n48  subst(groups=1)
n49  atom P
n50  imp
n51  atom Q
n52  subst(groups=2)
n53  atom P
n54  atom Q
n55  atom R
n56  mp
n57  mp
n58  mp
n59  mp
n60  mp
n61  mp
n62  and-elim-ax(side=l)
n63  subst(groups=1)
n64  atom P
n65  imp
n66  atom Q
n67  subst(groups=2)
n68  atom P
n69  atom Q
n70  atom R
n71  mp
n72  mp
n73  all-inst(v=z)
n74  subst(groups=1)
n75  atom P
n76  imp
n77  atom Q
n78  subst(groups=2)
n79  atom P
n80  atom Q
n81  atom R
n82  mp
n83  mp
n84  iff-intro-ax
n85  subst(groups=1)
n86  atom P
n87  iff
n88  imp
n89  imp
n90  atom Q
n91  subst(groups=2)
n92  atom P
n93  atom Q
n94  atom R
n95  subst(groups=2)
n96  atom P
n97  atom Q
n98  atom R
n99  定理 *64
n100  subst(groups=1)
n101  atom P
n102  atom Q

接线：
n10.out → n12.t1
n11.out → n12.t2
n19.out → n20.a
n10.out → n20.b
n19.out → n21.a
n11.out → n21.b
n20.out → n22.a
n21.out → n22.b
n22.out → n23.a
n21.out → n24.a
n20.out → n24.b
n24.out → n25.a
n23.out → n26.a
n25.out → n26.b
n23.out → n36.a
n25.out → n36.b
n16.out → n37.assertion
n26.out → n39.a
n25.out → n39.b
n38.out → n37.atom1
n39.out → n37.formula1
n40.out → n37.atom2
n12.out → n37.formula2
n36.out → n35.a
n37.out → n35.b
n29.out → n41.assertion
n42.out → n41.atom1
n12.out → n41.formula1
n43.out → n41.atom2
n26.out → n41.formula2
n44.out → n41.atom3
n25.out → n41.formula3
n35.out → n34.a
n41.out → n34.b
n15.out → n5.a
n34.out → n5.b
n24.out → n47.formula
n19.out → n47.term
n16.out → n48.assertion
n25.out → n50.a
n24.out → n50.b
n49.out → n48.atom1
n50.out → n48.formula1
n51.out → n48.atom2
n12.out → n48.formula2
n47.out → n46.a
n48.out → n46.b
n29.out → n52.assertion
n53.out → n52.atom1
n12.out → n52.formula1
n54.out → n52.atom2
n25.out → n52.formula2
n55.out → n52.atom3
n24.out → n52.formula3
n46.out → n45.a
n52.out → n45.b
n5.out → n4.a
n45.out → n4.b
n23.out → n62.a
n25.out → n62.b
n16.out → n63.assertion
n26.out → n65.a
n23.out → n65.b
n64.out → n63.atom1
n65.out → n63.formula1
n66.out → n63.atom2
n12.out → n63.formula2
n62.out → n61.a
n63.out → n61.b
n29.out → n67.assertion
n68.out → n67.atom1
n12.out → n67.formula1
n69.out → n67.atom2
n26.out → n67.formula2
n70.out → n67.atom3
n23.out → n67.formula3
n61.out → n60.a
n67.out → n60.b
n15.out → n59.a
n60.out → n59.b
n22.out → n73.formula
n19.out → n73.term
n16.out → n74.assertion
n23.out → n76.a
n22.out → n76.b
n75.out → n74.atom1
n76.out → n74.formula1
n77.out → n74.atom2
n12.out → n74.formula2
n73.out → n72.a
n74.out → n72.b
n29.out → n78.assertion
n79.out → n78.atom1
n12.out → n78.formula1
n80.out → n78.atom2
n23.out → n78.formula2
n81.out → n78.atom3
n22.out → n78.formula3
n72.out → n71.a
n78.out → n71.b
n59.out → n58.a
n71.out → n58.b
n20.out → n84.a
n21.out → n84.b
n16.out → n85.assertion
n20.out → n87.a
n21.out → n87.b
n24.out → n88.a
n87.out → n88.b
n22.out → n89.a
n88.out → n89.b
n86.out → n85.atom1
n89.out → n85.formula1
n90.out → n85.atom2
n12.out → n85.formula2
n84.out → n83.a
n85.out → n83.b
n29.out → n91.assertion
n92.out → n91.atom1
n12.out → n91.formula1
n93.out → n91.atom2
n22.out → n91.formula2
n94.out → n91.atom3
n88.out → n91.formula3
n83.out → n82.a
n91.out → n82.b
n58.out → n57.a
n82.out → n57.b
n29.out → n95.assertion
n96.out → n95.atom1
n12.out → n95.formula1
n97.out → n95.atom2
n24.out → n95.formula2
n98.out → n95.atom3
n87.out → n95.formula3
n57.out → n56.a
n95.out → n56.b
n4.out → n3.a
n56.out → n3.b
n3.out → n2.assertion
n99.out → n100.assertion
n101.out → n100.atom1
n12.out → n100.formula1
n102.out → n100.atom2
n87.out → n100.formula2
n2.out → n1.a
n100.out → n1.b
n1.out → n103.proof
```

</details>

### *67 · 传递后的谓词替换

- 目标：`⊢ ∀ x ∀ y ∀ z ( x = y → ( y = z → ( F ( x ) → F ( z ) ) ) )`
- 提示：先用 *52 得到 x=z，再用 Leibniz 把 F(x) 换成 F(z)；两次 DT 后全称推广。
- 参考解：60 个模块 / 97 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n151  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  gen(v=z)
n4  mp
n10  term y
n11  term z
n12  pred =
n13  axiom A1
n18  term x
n19  pred =
n36  axiom A2
n45  定理 *52
n48  pred =
n49  imp
n105  mp
n106  mp
n107  mp
n108  mp
n109  leibniz(mode=replace, v=z)
n110  pred F
n111  subst(groups=1)
n112  atom P
n113  pred F
n114  imp
n115  imp
n116  atom Q
n117  mp
n118  mp
n119  subst(groups=1)
n120  atom P
n121  atom Q
n122  subst(groups=1)
n123  atom P
n124  imp
n125  imp
n126  atom Q
n127  subst(groups=2)
n128  atom P
n129  atom Q
n130  atom R
n131  mp
n132  mp
n133  subst(groups=2)
n134  atom P
n135  atom Q
n136  atom R
n137  subst(groups=1)
n138  atom P
n139  imp
n140  imp
n141  imp
n142  atom Q
n143  subst(groups=2)
n144  atom P
n145  atom Q
n146  atom R
n147  subst(groups=2)
n148  atom P
n149  atom Q
n150  atom R

接线：
n10.out → n12.t1
n11.out → n12.t2
n18.out → n19.t1
n10.out → n19.t2
n18.out → n48.t1
n11.out → n48.t2
n12.out → n49.a
n48.out → n49.b
n18.out → n109.x
n11.out → n109.y
n18.out → n110.t1
n110.out → n109.formula
n13.out → n111.assertion
n11.out → n113.t1
n110.out → n114.a
n113.out → n114.b
n48.out → n115.a
n114.out → n115.b
n112.out → n111.atom1
n115.out → n111.formula1
n116.out → n111.atom2
n19.out → n111.formula2
n109.out → n108.a
n111.out → n108.b
n13.out → n119.assertion
n120.out → n119.atom1
n115.out → n119.formula1
n121.out → n119.atom2
n12.out → n119.formula2
n13.out → n122.assertion
n12.out → n124.a
n115.out → n124.b
n115.out → n125.a
n124.out → n125.b
n123.out → n122.atom1
n125.out → n122.formula1
n126.out → n122.atom2
n19.out → n122.formula2
n119.out → n118.a
n122.out → n118.b
n36.out → n127.assertion
n128.out → n127.atom1
n19.out → n127.formula1
n129.out → n127.atom2
n115.out → n127.formula2
n130.out → n127.atom3
n124.out → n127.formula3
n118.out → n117.a
n127.out → n117.b
n108.out → n107.a
n117.out → n107.b
n36.out → n133.assertion
n134.out → n133.atom1
n12.out → n133.formula1
n135.out → n133.atom2
n48.out → n133.formula2
n136.out → n133.atom3
n114.out → n133.formula3
n13.out → n137.assertion
n12.out → n139.a
n114.out → n139.b
n49.out → n140.a
n139.out → n140.b
n124.out → n141.a
n140.out → n141.b
n138.out → n137.atom1
n141.out → n137.formula1
n142.out → n137.atom2
n19.out → n137.formula2
n133.out → n132.a
n137.out → n132.b
n36.out → n143.assertion
n144.out → n143.atom1
n19.out → n143.formula1
n145.out → n143.atom2
n124.out → n143.formula2
n146.out → n143.atom3
n140.out → n143.formula3
n132.out → n131.a
n143.out → n131.b
n107.out → n106.a
n131.out → n106.b
n36.out → n147.assertion
n148.out → n147.atom1
n19.out → n147.formula1
n149.out → n147.atom2
n49.out → n147.formula2
n150.out → n147.atom3
n139.out → n147.formula3
n106.out → n105.a
n147.out → n105.b
n45.out → n4.a
n105.out → n4.b
n4.out → n3.assertion
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n151.proof
```

</details>

### *68 · 复合替换（双向）

- 目标：`⊢ ∀ x ∀ y ( x = y → ( ( F ( x ) → G ( x ) ) ↔ ( F ( y ) → G ( y ) ) ) )`
- 提示：正向引用 *57；反向先用 *51 得到 y=x，再 Leibniz 反向替换；↔I 后 DT。
- 参考解：82 个模块 / 133 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n94  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  mp
n4  mp
n5  定理 *01
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
n20  atom P
n21  pred =
n22  pred F
n23  pred G
n24  imp
n25  imp
n26  imp
n27  atom Q
n28  mp
n29  mp
n30  mp
n31  定理 *51
n32  subst(groups=1)
n33  atom P
n34  imp
n35  atom Q
n36  mp
n37  mp
n38  定理 *05
n39  subst(groups=2)
n40  atom P
n41  atom Q
n42  atom R
n43  subst(groups=1)
n44  atom P
n45  imp
n46  imp
n47  imp
n48  atom Q
n49  axiom A2
n50  subst(groups=2)
n51  atom P
n52  atom Q
n53  atom R
n54  subst(groups=2)
n55  atom P
n56  atom Q
n57  atom R
n58  subst(groups=2)
n59  atom P
n60  atom Q
n61  atom R
n62  mp
n63  mp
n67  定理 *57
n70  imp
n77  mp
n78  mp
n79  iff-intro-ax
n80  subst(groups=1)
n81  atom P
n82  iff
n83  imp
n84  imp
n85  atom Q
n86  subst(groups=2)
n87  atom P
n88  atom Q
n89  atom R
n90  subst(groups=2)
n91  atom P
n92  atom Q
n93  atom R

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
n9.out → n21.t1
n8.out → n21.t2
n8.out → n22.t1
n8.out → n23.t1
n22.out → n24.a
n23.out → n24.b
n17.out → n25.a
n24.out → n25.b
n21.out → n26.a
n25.out → n26.b
n20.out → n19.atom1
n26.out → n19.formula1
n27.out → n19.atom2
n10.out → n19.formula2
n14.out → n13.a
n19.out → n13.b
n18.out → n32.assertion
n10.out → n34.a
n21.out → n34.b
n33.out → n32.atom1
n34.out → n32.formula1
n35.out → n32.atom2
n10.out → n32.formula2
n31.out → n30.a
n32.out → n30.b
n38.out → n39.assertion
n40.out → n39.atom1
n10.out → n39.formula1
n41.out → n39.atom2
n21.out → n39.formula2
n42.out → n39.atom3
n25.out → n39.formula3
n18.out → n43.assertion
n10.out → n45.a
n25.out → n45.b
n26.out → n46.a
n45.out → n46.b
n34.out → n47.a
n46.out → n47.b
n44.out → n43.atom1
n47.out → n43.formula1
n48.out → n43.atom2
n10.out → n43.formula2
n39.out → n37.a
n43.out → n37.b
n49.out → n50.assertion
n51.out → n50.atom1
n10.out → n50.formula1
n52.out → n50.atom2
n34.out → n50.formula2
n53.out → n50.atom3
n46.out → n50.formula3
n37.out → n36.a
n50.out → n36.b
n30.out → n29.a
n36.out → n29.b
n49.out → n54.assertion
n55.out → n54.atom1
n10.out → n54.formula1
n56.out → n54.atom2
n26.out → n54.formula2
n57.out → n54.atom3
n45.out → n54.formula3
n29.out → n28.a
n54.out → n28.b
n13.out → n12.a
n28.out → n12.b
n49.out → n58.assertion
n59.out → n58.atom1
n10.out → n58.formula1
n60.out → n58.atom2
n10.out → n58.formula2
n61.out → n58.atom3
n25.out → n58.formula3
n12.out → n11.a
n58.out → n11.b
n6.out → n4.a
n11.out → n4.b
n24.out → n70.a
n17.out → n70.b
n24.out → n79.a
n17.out → n79.b
n18.out → n80.assertion
n24.out → n82.a
n17.out → n82.b
n25.out → n83.a
n82.out → n83.b
n70.out → n84.a
n83.out → n84.b
n81.out → n80.atom1
n84.out → n80.formula1
n85.out → n80.atom2
n10.out → n80.formula2
n79.out → n78.a
n80.out → n78.b
n49.out → n86.assertion
n87.out → n86.atom1
n10.out → n86.formula1
n88.out → n86.atom2
n70.out → n86.formula2
n89.out → n86.atom3
n83.out → n86.formula3
n78.out → n77.a
n86.out → n77.b
n67.out → n63.a
n77.out → n63.b
n49.out → n90.assertion
n91.out → n90.atom1
n10.out → n90.formula1
n92.out → n90.atom2
n25.out → n90.formula2
n93.out → n90.atom3
n82.out → n90.formula3
n63.out → n62.a
n90.out → n62.b
n4.out → n3.a
n62.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n94.proof
```

</details>

### *69 · 全称等词替换

- 目标：`⊢ ( x = y → ( ∀ z z = x → ∀ z z = y ) )`
- 提示：从 ∀z z=x 全称例化到 z，用 Leibniz 换成 z=y，再全称推广；假设用 DT 分两层消去。
- 参考解：110 个模块 / 188 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n169  [target]
n1  mp
n2  mp
n3  gen(v=z)
n4  mp
n10  term z
n11  term x
n12  pred =
n13  all(v=z)
n14  axiom A1
n19  term y
n20  pred =
n24  mp
n25  all-inst(v=z)
n26  subst(groups=1)
n27  atom P
n28  imp
n29  atom Q
n40  axiom A2
n64  mp
n65  mp
n66  mp
n72  subst(groups=1)
n73  atom P
n74  atom Q
n77  imp
n84  mp
n85  mp
n86  mp
n87  mp
n88  leibniz(mode=replace, v=z)
n89  subst(groups=1)
n90  atom P
n91  pred =
n92  imp
n93  imp
n94  atom Q
n95  mp
n96  mp
n97  subst(groups=1)
n98  atom P
n99  atom Q
n100  subst(groups=1)
n101  atom P
n102  imp
n103  imp
n104  atom Q
n105  subst(groups=2)
n106  atom P
n107  atom Q
n108  atom R
n109  mp
n110  mp
n111  subst(groups=2)
n112  atom P
n113  atom Q
n114  atom R
n115  subst(groups=1)
n116  atom P
n117  imp
n118  imp
n119  imp
n120  atom Q
n121  subst(groups=2)
n122  atom P
n123  atom Q
n124  atom R
n125  subst(groups=2)
n126  atom P
n127  atom Q
n128  atom R
n129  mp
n130  mp
n131  subst(groups=2)
n132  atom P
n133  atom Q
n134  atom R
n135  subst(groups=1)
n136  atom P
n137  imp
n138  imp
n139  imp
n140  atom Q
n141  subst(groups=2)
n142  atom P
n143  atom Q
n144  atom R
n145  subst(groups=2)
n146  atom P
n147  atom Q
n148  atom R
n149  定理 *64
n150  subst(groups=1)
n151  atom P
n152  atom Q
n153  mp
n154  mp
n155  subst(groups=1)
n156  atom P
n157  atom Q
n158  subst(groups=1)
n159  atom P
n160  all(v=z)
n161  all(v=z)
n162  imp
n163  imp
n164  atom Q
n165  subst(groups=2)
n166  atom P
n167  atom Q
n168  atom R

接线：
n10.out → n12.t1
n11.out → n12.t2
n12.out → n13.a
n11.out → n20.t1
n19.out → n20.t2
n12.out → n25.formula
n10.out → n25.term
n14.out → n26.assertion
n13.out → n28.a
n12.out → n28.b
n27.out → n26.atom1
n28.out → n26.formula1
n29.out → n26.atom2
n20.out → n26.formula2
n25.out → n24.a
n26.out → n24.b
n14.out → n72.assertion
n73.out → n72.atom1
n20.out → n72.formula1
n74.out → n72.atom2
n13.out → n72.formula2
n13.out → n77.a
n20.out → n77.b
n11.out → n88.x
n19.out → n88.y
n12.out → n88.formula
n14.out → n89.assertion
n10.out → n91.t1
n19.out → n91.t2
n12.out → n92.a
n91.out → n92.b
n20.out → n93.a
n92.out → n93.b
n90.out → n89.atom1
n93.out → n89.formula1
n94.out → n89.atom2
n20.out → n89.formula2
n88.out → n87.a
n89.out → n87.b
n14.out → n97.assertion
n98.out → n97.atom1
n93.out → n97.formula1
n99.out → n97.atom2
n13.out → n97.formula2
n14.out → n100.assertion
n13.out → n102.a
n93.out → n102.b
n93.out → n103.a
n102.out → n103.b
n101.out → n100.atom1
n103.out → n100.formula1
n104.out → n100.atom2
n20.out → n100.formula2
n97.out → n96.a
n100.out → n96.b
n40.out → n105.assertion
n106.out → n105.atom1
n20.out → n105.formula1
n107.out → n105.atom2
n93.out → n105.formula2
n108.out → n105.atom3
n102.out → n105.formula3
n96.out → n95.a
n105.out → n95.b
n87.out → n86.a
n95.out → n86.b
n40.out → n111.assertion
n112.out → n111.atom1
n13.out → n111.formula1
n113.out → n111.atom2
n20.out → n111.formula2
n114.out → n111.atom3
n92.out → n111.formula3
n14.out → n115.assertion
n13.out → n117.a
n92.out → n117.b
n77.out → n118.a
n117.out → n118.b
n102.out → n119.a
n118.out → n119.b
n116.out → n115.atom1
n119.out → n115.formula1
n120.out → n115.atom2
n20.out → n115.formula2
n111.out → n110.a
n115.out → n110.b
n40.out → n121.assertion
n122.out → n121.atom1
n20.out → n121.formula1
n123.out → n121.atom2
n102.out → n121.formula2
n124.out → n121.atom3
n118.out → n121.formula3
n110.out → n109.a
n121.out → n109.b
n86.out → n85.a
n109.out → n85.b
n40.out → n125.assertion
n126.out → n125.atom1
n20.out → n125.formula1
n127.out → n125.atom2
n77.out → n125.formula2
n128.out → n125.atom3
n117.out → n125.formula3
n85.out → n84.a
n125.out → n84.b
n72.out → n66.a
n84.out → n66.b
n40.out → n131.assertion
n132.out → n131.atom1
n13.out → n131.formula1
n133.out → n131.atom2
n12.out → n131.formula2
n134.out → n131.atom3
n91.out → n131.formula3
n14.out → n135.assertion
n13.out → n137.a
n91.out → n137.b
n28.out → n138.a
n137.out → n138.b
n117.out → n139.a
n138.out → n139.b
n136.out → n135.atom1
n139.out → n135.formula1
n140.out → n135.atom2
n20.out → n135.formula2
n131.out → n130.a
n135.out → n130.b
n40.out → n141.assertion
n142.out → n141.atom1
n20.out → n141.formula1
n143.out → n141.atom2
n117.out → n141.formula2
n144.out → n141.atom3
n138.out → n141.formula3
n130.out → n129.a
n141.out → n129.b
n66.out → n65.a
n129.out → n65.b
n40.out → n145.assertion
n146.out → n145.atom1
n20.out → n145.formula1
n147.out → n145.atom2
n28.out → n145.formula2
n148.out → n145.atom3
n137.out → n145.formula3
n65.out → n64.a
n145.out → n64.b
n24.out → n4.a
n64.out → n4.b
n4.out → n3.assertion
n149.out → n150.assertion
n151.out → n150.atom1
n20.out → n150.formula1
n152.out → n150.atom2
n137.out → n150.formula2
n3.out → n2.a
n150.out → n2.b
n149.out → n155.assertion
n156.out → n155.atom1
n13.out → n155.formula1
n157.out → n155.atom2
n91.out → n155.formula2
n14.out → n158.assertion
n137.out → n160.a
n91.out → n161.a
n13.out → n162.a
n161.out → n162.b
n160.out → n163.a
n162.out → n163.b
n159.out → n158.atom1
n163.out → n158.formula1
n164.out → n158.atom2
n20.out → n158.formula2
n155.out → n154.a
n158.out → n154.b
n40.out → n165.assertion
n166.out → n165.atom1
n20.out → n165.formula1
n167.out → n165.atom2
n160.out → n165.formula2
n168.out → n165.atom3
n162.out → n165.formula3
n154.out → n153.a
n165.out → n153.b
n2.out → n1.a
n153.out → n1.b
n1.out → n169.proof
```

</details>

### *70 · 全称等词替换（反向）

- 目标：`⊢ ( x = y → ( ∀ z z = y → ∀ z z = x ) )`
- 提示：先对称，再用替换与三段论。
- 参考解：19 个模块 / 27 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n20  [target]
n1  mp
n2  leibniz(mode=replace, v=z)
n3  term y
n4  term x
n5  term z
n6  pred =
n7  all(v=z)
n8  mp
n9  定理 *51
n10  定理 *05
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
n1.out → n20.proof
```

</details>

### *71 · 嵌套全称替换

- 目标：`⊢ ( x = y → ( ∀ z x = z → ∀ z y = z ) )`
- 提示：同 *69，但 Leibniz 作用在 x=z 的左侧。
- 参考解：110 个模块 / 188 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n169  [target]
n1  mp
n2  mp
n3  gen(v=z)
n4  mp
n10  term x
n11  term z
n12  pred =
n13  all(v=z)
n14  axiom A1
n19  term y
n20  pred =
n24  mp
n25  all-inst(v=z)
n26  subst(groups=1)
n27  atom P
n28  imp
n29  atom Q
n40  axiom A2
n64  mp
n65  mp
n66  mp
n72  subst(groups=1)
n73  atom P
n74  atom Q
n77  imp
n84  mp
n85  mp
n86  mp
n87  mp
n88  leibniz(mode=replace, v=z)
n89  subst(groups=1)
n90  atom P
n91  pred =
n92  imp
n93  imp
n94  atom Q
n95  mp
n96  mp
n97  subst(groups=1)
n98  atom P
n99  atom Q
n100  subst(groups=1)
n101  atom P
n102  imp
n103  imp
n104  atom Q
n105  subst(groups=2)
n106  atom P
n107  atom Q
n108  atom R
n109  mp
n110  mp
n111  subst(groups=2)
n112  atom P
n113  atom Q
n114  atom R
n115  subst(groups=1)
n116  atom P
n117  imp
n118  imp
n119  imp
n120  atom Q
n121  subst(groups=2)
n122  atom P
n123  atom Q
n124  atom R
n125  subst(groups=2)
n126  atom P
n127  atom Q
n128  atom R
n129  mp
n130  mp
n131  subst(groups=2)
n132  atom P
n133  atom Q
n134  atom R
n135  subst(groups=1)
n136  atom P
n137  imp
n138  imp
n139  imp
n140  atom Q
n141  subst(groups=2)
n142  atom P
n143  atom Q
n144  atom R
n145  subst(groups=2)
n146  atom P
n147  atom Q
n148  atom R
n149  定理 *64
n150  subst(groups=1)
n151  atom P
n152  atom Q
n153  mp
n154  mp
n155  subst(groups=1)
n156  atom P
n157  atom Q
n158  subst(groups=1)
n159  atom P
n160  all(v=z)
n161  all(v=z)
n162  imp
n163  imp
n164  atom Q
n165  subst(groups=2)
n166  atom P
n167  atom Q
n168  atom R

接线：
n10.out → n12.t1
n11.out → n12.t2
n12.out → n13.a
n10.out → n20.t1
n19.out → n20.t2
n12.out → n25.formula
n11.out → n25.term
n14.out → n26.assertion
n13.out → n28.a
n12.out → n28.b
n27.out → n26.atom1
n28.out → n26.formula1
n29.out → n26.atom2
n20.out → n26.formula2
n25.out → n24.a
n26.out → n24.b
n14.out → n72.assertion
n73.out → n72.atom1
n20.out → n72.formula1
n74.out → n72.atom2
n13.out → n72.formula2
n13.out → n77.a
n20.out → n77.b
n10.out → n88.x
n19.out → n88.y
n12.out → n88.formula
n14.out → n89.assertion
n19.out → n91.t1
n11.out → n91.t2
n12.out → n92.a
n91.out → n92.b
n20.out → n93.a
n92.out → n93.b
n90.out → n89.atom1
n93.out → n89.formula1
n94.out → n89.atom2
n20.out → n89.formula2
n88.out → n87.a
n89.out → n87.b
n14.out → n97.assertion
n98.out → n97.atom1
n93.out → n97.formula1
n99.out → n97.atom2
n13.out → n97.formula2
n14.out → n100.assertion
n13.out → n102.a
n93.out → n102.b
n93.out → n103.a
n102.out → n103.b
n101.out → n100.atom1
n103.out → n100.formula1
n104.out → n100.atom2
n20.out → n100.formula2
n97.out → n96.a
n100.out → n96.b
n40.out → n105.assertion
n106.out → n105.atom1
n20.out → n105.formula1
n107.out → n105.atom2
n93.out → n105.formula2
n108.out → n105.atom3
n102.out → n105.formula3
n96.out → n95.a
n105.out → n95.b
n87.out → n86.a
n95.out → n86.b
n40.out → n111.assertion
n112.out → n111.atom1
n13.out → n111.formula1
n113.out → n111.atom2
n20.out → n111.formula2
n114.out → n111.atom3
n92.out → n111.formula3
n14.out → n115.assertion
n13.out → n117.a
n92.out → n117.b
n77.out → n118.a
n117.out → n118.b
n102.out → n119.a
n118.out → n119.b
n116.out → n115.atom1
n119.out → n115.formula1
n120.out → n115.atom2
n20.out → n115.formula2
n111.out → n110.a
n115.out → n110.b
n40.out → n121.assertion
n122.out → n121.atom1
n20.out → n121.formula1
n123.out → n121.atom2
n102.out → n121.formula2
n124.out → n121.atom3
n118.out → n121.formula3
n110.out → n109.a
n121.out → n109.b
n86.out → n85.a
n109.out → n85.b
n40.out → n125.assertion
n126.out → n125.atom1
n20.out → n125.formula1
n127.out → n125.atom2
n77.out → n125.formula2
n128.out → n125.atom3
n117.out → n125.formula3
n85.out → n84.a
n125.out → n84.b
n72.out → n66.a
n84.out → n66.b
n40.out → n131.assertion
n132.out → n131.atom1
n13.out → n131.formula1
n133.out → n131.atom2
n12.out → n131.formula2
n134.out → n131.atom3
n91.out → n131.formula3
n14.out → n135.assertion
n13.out → n137.a
n91.out → n137.b
n28.out → n138.a
n137.out → n138.b
n117.out → n139.a
n138.out → n139.b
n136.out → n135.atom1
n139.out → n135.formula1
n140.out → n135.atom2
n20.out → n135.formula2
n131.out → n130.a
n135.out → n130.b
n40.out → n141.assertion
n142.out → n141.atom1
n20.out → n141.formula1
n143.out → n141.atom2
n117.out → n141.formula2
n144.out → n141.atom3
n138.out → n141.formula3
n130.out → n129.a
n141.out → n129.b
n66.out → n65.a
n129.out → n65.b
n40.out → n145.assertion
n146.out → n145.atom1
n20.out → n145.formula1
n147.out → n145.atom2
n28.out → n145.formula2
n148.out → n145.atom3
n137.out → n145.formula3
n65.out → n64.a
n145.out → n64.b
n24.out → n4.a
n64.out → n4.b
n4.out → n3.assertion
n149.out → n150.assertion
n151.out → n150.atom1
n20.out → n150.formula1
n152.out → n150.atom2
n137.out → n150.formula2
n3.out → n2.a
n150.out → n2.b
n149.out → n155.assertion
n156.out → n155.atom1
n13.out → n155.formula1
n157.out → n155.atom2
n91.out → n155.formula2
n14.out → n158.assertion
n137.out → n160.a
n91.out → n161.a
n13.out → n162.a
n161.out → n162.b
n160.out → n163.a
n162.out → n163.b
n159.out → n158.atom1
n163.out → n158.formula1
n164.out → n158.atom2
n20.out → n158.formula2
n155.out → n154.a
n158.out → n154.b
n40.out → n165.assertion
n166.out → n165.atom1
n20.out → n165.formula1
n167.out → n165.atom2
n160.out → n165.formula2
n168.out → n165.atom3
n162.out → n165.formula3
n154.out → n153.a
n165.out → n153.b
n2.out → n1.a
n153.out → n1.b
n1.out → n169.proof
```

</details>

### *72 · 深层替换（双向）

- 目标：`⊢ ( x = y → ( ( F ( x ) → ( G ( x ) → F ( x ) ) ) ↔ ( F ( y ) → ( G ( y ) → F ( y ) ) ) ) )`
- 提示：正向 Leibniz 直接替换；反向先对称再 Leibniz；↔I 后 DT。
- 参考解：82 个模块 / 138 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n94  [target]
n1  mp
n2  mp
n3  定理 *01
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
n19  atom P
n20  pred =
n21  pred F
n22  pred G
n23  imp
n24  imp
n25  imp
n26  imp
n27  atom Q
n28  mp
n29  mp
n30  mp
n31  定理 *51
n32  subst(groups=1)
n33  atom P
n34  imp
n35  atom Q
n36  mp
n37  mp
n38  定理 *05
n39  subst(groups=2)
n40  atom P
n41  atom Q
n42  atom R
n43  subst(groups=1)
n44  atom P
n45  imp
n46  imp
n47  imp
n48  atom Q
n49  axiom A2
n50  subst(groups=2)
n51  atom P
n52  atom Q
n53  atom R
n54  subst(groups=2)
n55  atom P
n56  atom Q
n57  atom R
n58  subst(groups=2)
n59  atom P
n60  atom Q
n61  atom R
n62  mp
n63  mp
n67  leibniz(mode=replace, v=z)
n70  imp
n77  mp
n78  mp
n79  iff-intro-ax
n80  subst(groups=1)
n81  atom P
n82  iff
n83  imp
n84  imp
n85  atom Q
n86  subst(groups=2)
n87  atom P
n88  atom Q
n89  atom R
n90  subst(groups=2)
n91  atom P
n92  atom Q
n93  atom R

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
n7.out → n20.t1
n6.out → n20.t2
n6.out → n21.t1
n6.out → n22.t1
n22.out → n23.a
n21.out → n23.b
n21.out → n24.a
n23.out → n24.b
n16.out → n25.a
n24.out → n25.b
n20.out → n26.a
n25.out → n26.b
n19.out → n18.atom1
n26.out → n18.formula1
n27.out → n18.atom2
n8.out → n18.formula2
n12.out → n11.a
n18.out → n11.b
n17.out → n32.assertion
n8.out → n34.a
n20.out → n34.b
n33.out → n32.atom1
n34.out → n32.formula1
n35.out → n32.atom2
n8.out → n32.formula2
n31.out → n30.a
n32.out → n30.b
n38.out → n39.assertion
n40.out → n39.atom1
n8.out → n39.formula1
n41.out → n39.atom2
n20.out → n39.formula2
n42.out → n39.atom3
n25.out → n39.formula3
n17.out → n43.assertion
n8.out → n45.a
n25.out → n45.b
n26.out → n46.a
n45.out → n46.b
n34.out → n47.a
n46.out → n47.b
n44.out → n43.atom1
n47.out → n43.formula1
n48.out → n43.atom2
n8.out → n43.formula2
n39.out → n37.a
n43.out → n37.b
n49.out → n50.assertion
n51.out → n50.atom1
n8.out → n50.formula1
n52.out → n50.atom2
n34.out → n50.formula2
n53.out → n50.atom3
n46.out → n50.formula3
n37.out → n36.a
n50.out → n36.b
n30.out → n29.a
n36.out → n29.b
n49.out → n54.assertion
n55.out → n54.atom1
n8.out → n54.formula1
n56.out → n54.atom2
n26.out → n54.formula2
n57.out → n54.atom3
n45.out → n54.formula3
n29.out → n28.a
n54.out → n28.b
n11.out → n10.a
n28.out → n10.b
n49.out → n58.assertion
n59.out → n58.atom1
n8.out → n58.formula1
n60.out → n58.atom2
n8.out → n58.formula2
n61.out → n58.atom3
n25.out → n58.formula3
n10.out → n9.a
n58.out → n9.b
n4.out → n2.a
n9.out → n2.b
n6.out → n67.x
n7.out → n67.y
n24.out → n67.formula
n24.out → n70.a
n16.out → n70.b
n24.out → n79.a
n16.out → n79.b
n17.out → n80.assertion
n24.out → n82.a
n16.out → n82.b
n25.out → n83.a
n82.out → n83.b
n70.out → n84.a
n83.out → n84.b
n81.out → n80.atom1
n84.out → n80.formula1
n85.out → n80.atom2
n8.out → n80.formula2
n79.out → n78.a
n80.out → n78.b
n49.out → n86.assertion
n87.out → n86.atom1
n8.out → n86.formula1
n88.out → n86.atom2
n70.out → n86.formula2
n89.out → n86.atom3
n83.out → n86.formula3
n78.out → n77.a
n86.out → n77.b
n67.out → n63.a
n77.out → n63.b
n49.out → n90.assertion
n91.out → n90.atom1
n8.out → n90.formula1
n92.out → n90.atom2
n25.out → n90.formula2
n93.out → n90.atom3
n82.out → n90.formula3
n63.out → n62.a
n90.out → n62.b
n2.out → n1.a
n62.out → n1.b
n1.out → n94.proof
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

### *73 · 元素等价的对称性

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ∀ z ( z ∈ y ↔ z ∈ x ) )`
- 提示：全称例化到 z，用 ↔E/↔I 做对称，再用全辖域公理移到外层。
- 参考解：47 个模块 / 76 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n48  [target]
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
n12  all-inst(v=z)
n13  iff
n14  定理 *05
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
n29  atom P
n30  atom Q
n31  atom R
n32  imp
n33  subst(groups=2)
n34  atom P
n35  atom Q
n36  atom R
n37  iff
n38  imp
n39  axiom A2
n40  subst(groups=2)
n41  atom P
n42  atom Q
n43  atom R
n44  定理 *64
n45  subst(groups=1)
n46  atom P
n47  atom Q

接线：
n6.out → n8.a
n7.out → n8.b
n8.out → n5.a
n6.out → n10.a
n9.out → n10.b
n10.out → n5.b
n8.out → n13.a
n10.out → n13.b
n13.out → n12.formula
n6.out → n12.term
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
n29.out → n28.atom1
n17.out → n28.formula1
n30.out → n28.atom2
n13.out → n28.formula2
n10.out → n32.a
n8.out → n32.b
n31.out → n28.atom3
n32.out → n28.formula3
n12.out → n27.a
n28.out → n27.b
n26.out → n25.a
n27.out → n25.b
n14.out → n33.assertion
n34.out → n33.atom1
n17.out → n33.formula1
n35.out → n33.atom2
n32.out → n33.formula2
n10.out → n37.a
n8.out → n37.b
n20.out → n38.a
n37.out → n38.b
n36.out → n33.atom3
n38.out → n33.formula3
n25.out → n24.a
n33.out → n24.b
n23.out → n22.a
n24.out → n22.b
n39.out → n40.assertion
n41.out → n40.atom1
n17.out → n40.formula1
n42.out → n40.atom2
n20.out → n40.formula2
n43.out → n40.atom3
n37.out → n40.formula3
n22.out → n21.a
n40.out → n21.b
n4.out → n3.a
n21.out → n3.b
n3.out → n2.assertion
n44.out → n45.assertion
n46.out → n45.atom1
n17.out → n45.formula1
n47.out → n45.atom2
n37.out → n45.formula2
n2.out → n1.a
n45.out → n1.b
n1.out → n48.proof
```

</details>

### *74 · 元素等价的两个方向

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) )`
- 提示：分别用 ↔E 取两个方向，各自推广并移动 ∀，最后用 ∧I 与 A2 合并。
- 参考解：54 个模块 / 86 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n55  [target]
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
n12  all-inst(v=z)
n13  iff
n14  定理 *05
n15  subst(groups=2)
n16  atom P
n17  all(v=z)
n18  atom Q
n19  atom R
n20  imp
n21  定理 *64
n22  subst(groups=1)
n23  atom P
n24  atom Q
n25  mp
n26  mp
n27  and-intro-ax
n28  imp
n29  all(v=z)
n30  all(v=z)
n31  mp
n32  mp
n33  gen(v=z)
n34  mp
n35  iff-elim-ax(dir=lr)
n36  mp
n37  subst(groups=2)
n38  atom P
n39  atom Q
n40  atom R
n41  subst(groups=1)
n42  atom P
n43  atom Q
n44  subst(groups=2)
n45  atom P
n46  atom Q
n47  atom R
n48  and
n49  imp
n50  axiom A2
n51  subst(groups=2)
n52  atom P
n53  atom Q
n54  atom R

接线：
n6.out → n8.a
n7.out → n8.b
n8.out → n5.a
n6.out → n10.a
n9.out → n10.b
n10.out → n5.b
n8.out → n13.a
n10.out → n13.b
n13.out → n12.formula
n6.out → n12.term
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
n23.out → n22.atom1
n17.out → n22.formula1
n24.out → n22.atom2
n20.out → n22.formula2
n3.out → n2.a
n22.out → n2.b
n8.out → n28.a
n10.out → n28.b
n28.out → n29.a
n29.out → n27.a
n20.out → n30.a
n30.out → n27.b
n8.out → n35.a
n10.out → n35.b
n14.out → n37.assertion
n38.out → n37.atom1
n17.out → n37.formula1
n39.out → n37.atom2
n13.out → n37.formula2
n40.out → n37.atom3
n28.out → n37.formula3
n12.out → n36.a
n37.out → n36.b
n35.out → n34.a
n36.out → n34.b
n34.out → n33.assertion
n21.out → n41.assertion
n42.out → n41.atom1
n17.out → n41.formula1
n43.out → n41.atom2
n28.out → n41.formula2
n33.out → n32.a
n41.out → n32.b
n14.out → n44.assertion
n45.out → n44.atom1
n17.out → n44.formula1
n46.out → n44.atom2
n29.out → n44.formula2
n29.out → n48.a
n30.out → n48.b
n30.out → n49.a
n48.out → n49.b
n47.out → n44.atom3
n49.out → n44.formula3
n32.out → n31.a
n44.out → n31.b
n27.out → n26.a
n31.out → n26.b
n50.out → n51.assertion
n52.out → n51.atom1
n17.out → n51.formula1
n53.out → n51.atom2
n30.out → n51.formula2
n54.out → n51.atom3
n48.out → n51.formula3
n26.out → n25.a
n51.out → n25.b
n2.out → n1.a
n25.out → n1.b
n1.out → n55.proof
```

</details>

### *75 · 元素等价的三重结论

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ∧ ∀ z ( z ∈ y ↔ z ∈ x ) ) )`
- 提示：分别引用 *74 与 *73，再用 ∧I 与 A2 合并两个后件。
- 参考解：33 个模块 / 47 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n34  [target]
n1  mp
n2  定理 *73
n3  mp
n4  mp
n5  and-intro-ax
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
n19  定理 *74
n20  定理 *05
n21  subst(groups=2)
n22  atom P
n23  iff
n24  all(v=z)
n25  atom Q
n26  atom R
n27  and
n28  imp
n29  axiom A2
n30  subst(groups=2)
n31  atom P
n32  atom Q
n33  atom R

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
n15.out → n5.a
n10.out → n16.a
n8.out → n16.b
n16.out → n17.a
n17.out → n5.b
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
n29.out → n30.assertion
n31.out → n30.atom1
n24.out → n30.formula1
n32.out → n30.atom2
n17.out → n30.formula2
n33.out → n30.atom3
n27.out → n30.formula3
n4.out → n3.a
n30.out → n3.b
n2.out → n1.a
n3.out → n1.b
n1.out → n34.proof
```

</details>

### *76 · 元素等价的逐点传递

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ u ) → ( z ∈ x ↔ z ∈ u ) ) )`
- 提示：假设两个全称等价，逐点取出两个方向，用 HS 串起来再重建 ↔。
- 参考解：461 个模块 / 827 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n520  [target]
n1  mp
n2  mp
n3  mp
n4  mp
n9  term z
n10  term x
n11  mem
n12  term y
n13  mem
n14  iff
n15  all(v=z)
n18  axiom A1
n19  subst(groups=1)
n20  atom P
n21  atom Q
n22  term u
n23  mem
n24  iff
n25  all(v=z)
n28  imp
n31  axiom A2
n36  mp
n37  mp
n38  mp
n39  mp
n40  all-inst(v=z)
n41  subst(groups=1)
n42  atom P
n43  imp
n44  atom Q
n45  mp
n46  mp
n47  subst(groups=1)
n48  atom P
n49  atom Q
n50  subst(groups=1)
n51  atom P
n52  imp
n53  imp
n54  atom Q
n55  subst(groups=2)
n56  atom P
n57  atom Q
n58  atom R
n59  mp
n60  mp
n61  subst(groups=2)
n62  atom P
n63  atom Q
n64  atom R
n65  subst(groups=1)
n66  atom P
n67  imp
n68  imp
n69  imp
n70  atom Q
n71  subst(groups=2)
n72  atom P
n73  atom Q
n74  atom R
n75  subst(groups=2)
n76  atom P
n77  atom Q
n78  atom R
n79  mp
n80  mp
n81  mp
n82  mp
n83  iff-elim-ax(dir=rl)
n84  subst(groups=1)
n85  atom P
n86  imp
n87  imp
n88  atom Q
n89  mp
n90  mp
n91  subst(groups=1)
n92  atom P
n93  atom Q
n94  subst(groups=1)
n95  atom P
n96  imp
n97  imp
n98  atom Q
n99  subst(groups=2)
n100  atom P
n101  atom Q
n102  atom R
n103  mp
n104  mp
n105  subst(groups=2)
n106  atom P
n107  atom Q
n108  atom R
n109  subst(groups=1)
n110  atom P
n111  imp
n112  imp
n113  imp
n114  atom Q
n115  subst(groups=2)
n116  atom P
n117  atom Q
n118  atom R
n119  subst(groups=2)
n120  atom P
n121  atom Q
n122  atom R
n123  mp
n124  mp
n125  mp
n126  mp
n138  mp
n139  all-inst(v=z)
n140  subst(groups=1)
n141  atom P
n142  imp
n143  atom Q
n177  mp
n178  mp
n179  mp
n180  mp
n181  iff-elim-ax(dir=rl)
n182  subst(groups=1)
n183  atom P
n184  imp
n185  imp
n186  atom Q
n187  mp
n188  mp
n189  subst(groups=1)
n190  atom P
n191  atom Q
n192  subst(groups=1)
n193  atom P
n194  imp
n195  imp
n196  atom Q
n197  subst(groups=2)
n198  atom P
n199  atom Q
n200  atom R
n201  mp
n202  mp
n203  subst(groups=2)
n204  atom P
n205  atom Q
n206  atom R
n207  subst(groups=1)
n208  atom P
n209  imp
n210  imp
n211  imp
n212  atom Q
n213  subst(groups=2)
n214  atom P
n215  atom Q
n216  atom R
n217  subst(groups=2)
n218  atom P
n219  atom Q
n220  atom R
n221  mp
n222  mp
n223  mp
n224  mp
n225  定理 *05
n226  subst(groups=2)
n227  atom P
n228  atom Q
n229  atom R
n230  subst(groups=1)
n231  atom P
n232  imp
n233  imp
n234  imp
n235  atom Q
n236  mp
n237  mp
n238  subst(groups=1)
n239  atom P
n240  atom Q
n241  subst(groups=1)
n242  atom P
n243  imp
n244  imp
n245  atom Q
n246  subst(groups=2)
n247  atom P
n248  atom Q
n249  atom R
n250  mp
n251  mp
n252  subst(groups=2)
n253  atom P
n254  atom Q
n255  atom R
n256  subst(groups=1)
n257  atom P
n258  imp
n259  imp
n260  imp
n261  atom Q
n262  subst(groups=2)
n263  atom P
n264  atom Q
n265  atom R
n266  subst(groups=2)
n267  atom P
n268  atom Q
n269  atom R
n270  mp
n271  mp
n272  subst(groups=2)
n273  atom P
n274  atom Q
n275  atom R
n276  subst(groups=1)
n277  atom P
n278  imp
n279  imp
n280  imp
n281  atom Q
n282  subst(groups=2)
n283  atom P
n284  atom Q
n285  atom R
n286  subst(groups=2)
n287  atom P
n288  atom Q
n289  atom R
n290  mp
n291  mp
n292  mp
n293  mp
n294  mp
n295  mp
n296  mp
n297  mp
n298  mp
n299  iff-elim-ax(dir=lr)
n300  subst(groups=1)
n301  atom P
n302  imp
n303  imp
n304  atom Q
n305  mp
n306  mp
n307  subst(groups=1)
n308  atom P
n309  atom Q
n310  subst(groups=1)
n311  atom P
n312  imp
n313  imp
n314  atom Q
n315  subst(groups=2)
n316  atom P
n317  atom Q
n318  atom R
n319  mp
n320  mp
n321  subst(groups=2)
n322  atom P
n323  atom Q
n324  atom R
n325  subst(groups=1)
n326  atom P
n327  imp
n328  imp
n329  imp
n330  atom Q
n331  subst(groups=2)
n332  atom P
n333  atom Q
n334  atom R
n335  subst(groups=2)
n336  atom P
n337  atom Q
n338  atom R
n339  mp
n340  mp
n341  mp
n342  mp
n343  mp
n344  mp
n345  mp
n346  mp
n347  iff-elim-ax(dir=lr)
n348  subst(groups=1)
n349  atom P
n350  imp
n351  imp
n352  atom Q
n353  mp
n354  mp
n355  subst(groups=1)
n356  atom P
n357  atom Q
n358  subst(groups=1)
n359  atom P
n360  imp
n361  imp
n362  atom Q
n363  subst(groups=2)
n364  atom P
n365  atom Q
n366  atom R
n367  mp
n368  mp
n369  subst(groups=2)
n370  atom P
n371  atom Q
n372  atom R
n373  subst(groups=1)
n374  atom P
n375  imp
n376  imp
n377  imp
n378  atom Q
n379  subst(groups=2)
n380  atom P
n381  atom Q
n382  atom R
n383  subst(groups=2)
n384  atom P
n385  atom Q
n386  atom R
n387  mp
n388  mp
n389  mp
n390  mp
n391  subst(groups=2)
n392  atom P
n393  atom Q
n394  atom R
n395  subst(groups=1)
n396  atom P
n397  imp
n398  imp
n399  imp
n400  atom Q
n401  mp
n402  mp
n403  subst(groups=1)
n404  atom P
n405  atom Q
n406  subst(groups=1)
n407  atom P
n408  imp
n409  imp
n410  atom Q
n411  subst(groups=2)
n412  atom P
n413  atom Q
n414  atom R
n415  mp
n416  mp
n417  subst(groups=2)
n418  atom P
n419  atom Q
n420  atom R
n421  subst(groups=1)
n422  atom P
n423  imp
n424  imp
n425  imp
n426  atom Q
n427  subst(groups=2)
n428  atom P
n429  atom Q
n430  atom R
n431  subst(groups=2)
n432  atom P
n433  atom Q
n434  atom R
n435  mp
n436  mp
n437  subst(groups=2)
n438  atom P
n439  atom Q
n440  atom R
n441  subst(groups=1)
n442  atom P
n443  imp
n444  imp
n445  imp
n446  atom Q
n447  subst(groups=2)
n448  atom P
n449  atom Q
n450  atom R
n451  subst(groups=2)
n452  atom P
n453  atom Q
n454  atom R
n455  mp
n456  mp
n457  mp
n458  mp
n459  iff-intro-ax
n460  subst(groups=1)
n461  atom P
n462  iff
n463  imp
n464  imp
n465  atom Q
n466  mp
n467  mp
n468  subst(groups=1)
n469  atom P
n470  atom Q
n471  subst(groups=1)
n472  atom P
n473  imp
n474  imp
n475  atom Q
n476  subst(groups=2)
n477  atom P
n478  atom Q
n479  atom R
n480  mp
n481  mp
n482  subst(groups=2)
n483  atom P
n484  atom Q
n485  atom R
n486  subst(groups=1)
n487  atom P
n488  imp
n489  imp
n490  imp
n491  atom Q
n492  subst(groups=2)
n493  atom P
n494  atom Q
n495  atom R
n496  subst(groups=2)
n497  atom P
n498  atom Q
n499  atom R
n500  mp
n501  mp
n502  subst(groups=2)
n503  atom P
n504  atom Q
n505  atom R
n506  subst(groups=1)
n507  atom P
n508  imp
n509  imp
n510  imp
n511  atom Q
n512  subst(groups=2)
n513  atom P
n514  atom Q
n515  atom R
n516  subst(groups=2)
n517  atom P
n518  atom Q
n519  atom R

接线：
n9.out → n11.a
n10.out → n11.b
n9.out → n13.a
n12.out → n13.b
n11.out → n14.a
n13.out → n14.b
n14.out → n15.a
n18.out → n19.assertion
n20.out → n19.atom1
n15.out → n19.formula1
n9.out → n23.a
n22.out → n23.b
n13.out → n24.a
n23.out → n24.b
n24.out → n25.a
n21.out → n19.atom2
n25.out → n19.formula2
n25.out → n28.a
n15.out → n28.b
n14.out → n40.formula
n9.out → n40.term
n18.out → n41.assertion
n15.out → n43.a
n14.out → n43.b
n42.out → n41.atom1
n43.out → n41.formula1
n44.out → n41.atom2
n15.out → n41.formula2
n40.out → n39.a
n41.out → n39.b
n18.out → n47.assertion
n48.out → n47.atom1
n43.out → n47.formula1
n49.out → n47.atom2
n25.out → n47.formula2
n18.out → n50.assertion
n25.out → n52.a
n43.out → n52.b
n43.out → n53.a
n52.out → n53.b
n51.out → n50.atom1
n53.out → n50.formula1
n54.out → n50.atom2
n15.out → n50.formula2
n47.out → n46.a
n50.out → n46.b
n31.out → n55.assertion
n56.out → n55.atom1
n15.out → n55.formula1
n57.out → n55.atom2
n43.out → n55.formula2
n58.out → n55.atom3
n52.out → n55.formula3
n46.out → n45.a
n55.out → n45.b
n39.out → n38.a
n45.out → n38.b
n31.out → n61.assertion
n62.out → n61.atom1
n25.out → n61.formula1
n63.out → n61.atom2
n15.out → n61.formula2
n64.out → n61.atom3
n14.out → n61.formula3
n18.out → n65.assertion
n25.out → n67.a
n14.out → n67.b
n28.out → n68.a
n67.out → n68.b
n52.out → n69.a
n68.out → n69.b
n66.out → n65.atom1
n69.out → n65.formula1
n70.out → n65.atom2
n15.out → n65.formula2
n61.out → n60.a
n65.out → n60.b
n31.out → n71.assertion
n72.out → n71.atom1
n15.out → n71.formula1
n73.out → n71.atom2
n52.out → n71.formula2
n74.out → n71.atom3
n68.out → n71.formula3
n60.out → n59.a
n71.out → n59.b
n38.out → n37.a
n59.out → n37.b
n31.out → n75.assertion
n76.out → n75.atom1
n15.out → n75.formula1
n77.out → n75.atom2
n28.out → n75.formula2
n78.out → n75.atom3
n67.out → n75.formula3
n37.out → n36.a
n75.out → n36.b
n19.out → n4.a
n36.out → n4.b
n11.out → n83.a
n13.out → n83.b
n18.out → n84.assertion
n13.out → n86.a
n11.out → n86.b
n14.out → n87.a
n86.out → n87.b
n85.out → n84.atom1
n87.out → n84.formula1
n88.out → n84.atom2
n15.out → n84.formula2
n83.out → n82.a
n84.out → n82.b
n18.out → n91.assertion
n92.out → n91.atom1
n87.out → n91.formula1
n93.out → n91.atom2
n25.out → n91.formula2
n18.out → n94.assertion
n25.out → n96.a
n87.out → n96.b
n87.out → n97.a
n96.out → n97.b
n95.out → n94.atom1
n97.out → n94.formula1
n98.out → n94.atom2
n15.out → n94.formula2
n91.out → n90.a
n94.out → n90.b
n31.out → n99.assertion
n100.out → n99.atom1
n15.out → n99.formula1
n101.out → n99.atom2
n87.out → n99.formula2
n102.out → n99.atom3
n96.out → n99.formula3
n90.out → n89.a
n99.out → n89.b
n82.out → n81.a
n89.out → n81.b
n31.out → n105.assertion
n106.out → n105.atom1
n25.out → n105.formula1
n107.out → n105.atom2
n14.out → n105.formula2
n108.out → n105.atom3
n86.out → n105.formula3
n18.out → n109.assertion
n25.out → n111.a
n86.out → n111.b
n67.out → n112.a
n111.out → n112.b
n96.out → n113.a
n112.out → n113.b
n110.out → n109.atom1
n113.out → n109.formula1
n114.out → n109.atom2
n15.out → n109.formula2
n105.out → n104.a
n109.out → n104.b
n31.out → n115.assertion
n116.out → n115.atom1
n15.out → n115.formula1
n117.out → n115.atom2
n96.out → n115.formula2
n118.out → n115.atom3
n112.out → n115.formula3
n104.out → n103.a
n115.out → n103.b
n81.out → n80.a
n103.out → n80.b
n31.out → n119.assertion
n120.out → n119.atom1
n15.out → n119.formula1
n121.out → n119.atom2
n67.out → n119.formula2
n122.out → n119.atom3
n111.out → n119.formula3
n80.out → n79.a
n119.out → n79.b
n4.out → n3.a
n79.out → n3.b
n24.out → n139.formula
n9.out → n139.term
n18.out → n140.assertion
n25.out → n142.a
n24.out → n142.b
n141.out → n140.atom1
n142.out → n140.formula1
n143.out → n140.atom2
n15.out → n140.formula2
n139.out → n138.a
n140.out → n138.b
n13.out → n181.a
n23.out → n181.b
n18.out → n182.assertion
n23.out → n184.a
n13.out → n184.b
n24.out → n185.a
n184.out → n185.b
n183.out → n182.atom1
n185.out → n182.formula1
n186.out → n182.atom2
n15.out → n182.formula2
n181.out → n180.a
n182.out → n180.b
n18.out → n189.assertion
n190.out → n189.atom1
n185.out → n189.formula1
n191.out → n189.atom2
n25.out → n189.formula2
n18.out → n192.assertion
n25.out → n194.a
n185.out → n194.b
n185.out → n195.a
n194.out → n195.b
n193.out → n192.atom1
n195.out → n192.formula1
n196.out → n192.atom2
n15.out → n192.formula2
n189.out → n188.a
n192.out → n188.b
n31.out → n197.assertion
n198.out → n197.atom1
n15.out → n197.formula1
n199.out → n197.atom2
n185.out → n197.formula2
n200.out → n197.atom3
n194.out → n197.formula3
n188.out → n187.a
n197.out → n187.b
n180.out → n179.a
n187.out → n179.b
n31.out → n203.assertion
n204.out → n203.atom1
n25.out → n203.formula1
n205.out → n203.atom2
n24.out → n203.formula2
n206.out → n203.atom3
n184.out → n203.formula3
n18.out → n207.assertion
n25.out → n209.a
n184.out → n209.b
n142.out → n210.a
n209.out → n210.b
n194.out → n211.a
n210.out → n211.b
n208.out → n207.atom1
n211.out → n207.formula1
n212.out → n207.atom2
n15.out → n207.formula2
n203.out → n202.a
n207.out → n202.b
n31.out → n213.assertion
n214.out → n213.atom1
n15.out → n213.formula1
n215.out → n213.atom2
n194.out → n213.formula2
n216.out → n213.atom3
n210.out → n213.formula3
n202.out → n201.a
n213.out → n201.b
n179.out → n178.a
n201.out → n178.b
n31.out → n217.assertion
n218.out → n217.atom1
n15.out → n217.formula1
n219.out → n217.atom2
n142.out → n217.formula2
n220.out → n217.atom3
n209.out → n217.formula3
n178.out → n177.a
n217.out → n177.b
n138.out → n126.a
n177.out → n126.b
n225.out → n226.assertion
n227.out → n226.atom1
n23.out → n226.formula1
n228.out → n226.atom2
n13.out → n226.formula2
n229.out → n226.atom3
n11.out → n226.formula3
n18.out → n230.assertion
n23.out → n232.a
n11.out → n232.b
n86.out → n233.a
n232.out → n233.b
n184.out → n234.a
n233.out → n234.b
n231.out → n230.atom1
n234.out → n230.formula1
n235.out → n230.atom2
n15.out → n230.formula2
n226.out → n224.a
n230.out → n224.b
n18.out → n238.assertion
n239.out → n238.atom1
n234.out → n238.formula1
n240.out → n238.atom2
n25.out → n238.formula2
n18.out → n241.assertion
n25.out → n243.a
n234.out → n243.b
n234.out → n244.a
n243.out → n244.b
n242.out → n241.atom1
n244.out → n241.formula1
n245.out → n241.atom2
n15.out → n241.formula2
n238.out → n237.a
n241.out → n237.b
n31.out → n246.assertion
n247.out → n246.atom1
n15.out → n246.formula1
n248.out → n246.atom2
n234.out → n246.formula2
n249.out → n246.atom3
n243.out → n246.formula3
n237.out → n236.a
n246.out → n236.b
n224.out → n223.a
n236.out → n223.b
n31.out → n252.assertion
n253.out → n252.atom1
n25.out → n252.formula1
n254.out → n252.atom2
n184.out → n252.formula2
n255.out → n252.atom3
n233.out → n252.formula3
n18.out → n256.assertion
n25.out → n258.a
n233.out → n258.b
n209.out → n259.a
n258.out → n259.b
n243.out → n260.a
n259.out → n260.b
n257.out → n256.atom1
n260.out → n256.formula1
n261.out → n256.atom2
n15.out → n256.formula2
n252.out → n251.a
n256.out → n251.b
n31.out → n262.assertion
n263.out → n262.atom1
n15.out → n262.formula1
n264.out → n262.atom2
n243.out → n262.formula2
n265.out → n262.atom3
n259.out → n262.formula3
n251.out → n250.a
n262.out → n250.b
n223.out → n222.a
n250.out → n222.b
n31.out → n266.assertion
n267.out → n266.atom1
n15.out → n266.formula1
n268.out → n266.atom2
n209.out → n266.formula2
n269.out → n266.atom3
n258.out → n266.formula3
n222.out → n221.a
n266.out → n221.b
n126.out → n125.a
n221.out → n125.b
n31.out → n272.assertion
n273.out → n272.atom1
n25.out → n272.formula1
n274.out → n272.atom2
n86.out → n272.formula2
n275.out → n272.atom3
n232.out → n272.formula3
n18.out → n276.assertion
n25.out → n278.a
n232.out → n278.b
n111.out → n279.a
n278.out → n279.b
n258.out → n280.a
n279.out → n280.b
n277.out → n276.atom1
n280.out → n276.formula1
n281.out → n276.atom2
n15.out → n276.formula2
n272.out → n271.a
n276.out → n271.b
n31.out → n282.assertion
n283.out → n282.atom1
n15.out → n282.formula1
n284.out → n282.atom2
n258.out → n282.formula2
n285.out → n282.atom3
n279.out → n282.formula3
n271.out → n270.a
n282.out → n270.b
n125.out → n124.a
n270.out → n124.b
n31.out → n286.assertion
n287.out → n286.atom1
n15.out → n286.formula1
n288.out → n286.atom2
n111.out → n286.formula2
n289.out → n286.atom3
n278.out → n286.formula3
n124.out → n123.a
n286.out → n123.b
n3.out → n2.a
n123.out → n2.b
n13.out → n299.a
n23.out → n299.b
n18.out → n300.assertion
n13.out → n302.a
n23.out → n302.b
n24.out → n303.a
n302.out → n303.b
n301.out → n300.atom1
n303.out → n300.formula1
n304.out → n300.atom2
n15.out → n300.formula2
n299.out → n298.a
n300.out → n298.b
n18.out → n307.assertion
n308.out → n307.atom1
n303.out → n307.formula1
n309.out → n307.atom2
n25.out → n307.formula2
n18.out → n310.assertion
n25.out → n312.a
n303.out → n312.b
n303.out → n313.a
n312.out → n313.b
n311.out → n310.atom1
n313.out → n310.formula1
n314.out → n310.atom2
n15.out → n310.formula2
n307.out → n306.a
n310.out → n306.b
n31.out → n315.assertion
n316.out → n315.atom1
n15.out → n315.formula1
n317.out → n315.atom2
n303.out → n315.formula2
n318.out → n315.atom3
n312.out → n315.formula3
n306.out → n305.a
n315.out → n305.b
n298.out → n297.a
n305.out → n297.b
n31.out → n321.assertion
n322.out → n321.atom1
n25.out → n321.formula1
n323.out → n321.atom2
n24.out → n321.formula2
n324.out → n321.atom3
n302.out → n321.formula3
n18.out → n325.assertion
n25.out → n327.a
n302.out → n327.b
n142.out → n328.a
n327.out → n328.b
n312.out → n329.a
n328.out → n329.b
n326.out → n325.atom1
n329.out → n325.formula1
n330.out → n325.atom2
n15.out → n325.formula2
n321.out → n320.a
n325.out → n320.b
n31.out → n331.assertion
n332.out → n331.atom1
n15.out → n331.formula1
n333.out → n331.atom2
n312.out → n331.formula2
n334.out → n331.atom3
n328.out → n331.formula3
n320.out → n319.a
n331.out → n319.b
n297.out → n296.a
n319.out → n296.b
n31.out → n335.assertion
n336.out → n335.atom1
n15.out → n335.formula1
n337.out → n335.atom2
n142.out → n335.formula2
n338.out → n335.atom3
n327.out → n335.formula3
n296.out → n295.a
n335.out → n295.b
n138.out → n294.a
n295.out → n294.b
n11.out → n347.a
n13.out → n347.b
n18.out → n348.assertion
n11.out → n350.a
n13.out → n350.b
n14.out → n351.a
n350.out → n351.b
n349.out → n348.atom1
n351.out → n348.formula1
n352.out → n348.atom2
n15.out → n348.formula2
n347.out → n346.a
n348.out → n346.b
n18.out → n355.assertion
n356.out → n355.atom1
n351.out → n355.formula1
n357.out → n355.atom2
n25.out → n355.formula2
n18.out → n358.assertion
n25.out → n360.a
n351.out → n360.b
n351.out → n361.a
n360.out → n361.b
n359.out → n358.atom1
n361.out → n358.formula1
n362.out → n358.atom2
n15.out → n358.formula2
n355.out → n354.a
n358.out → n354.b
n31.out → n363.assertion
n364.out → n363.atom1
n15.out → n363.formula1
n365.out → n363.atom2
n351.out → n363.formula2
n366.out → n363.atom3
n360.out → n363.formula3
n354.out → n353.a
n363.out → n353.b
n346.out → n345.a
n353.out → n345.b
n31.out → n369.assertion
n370.out → n369.atom1
n25.out → n369.formula1
n371.out → n369.atom2
n14.out → n369.formula2
n372.out → n369.atom3
n350.out → n369.formula3
n18.out → n373.assertion
n25.out → n375.a
n350.out → n375.b
n67.out → n376.a
n375.out → n376.b
n360.out → n377.a
n376.out → n377.b
n374.out → n373.atom1
n377.out → n373.formula1
n378.out → n373.atom2
n15.out → n373.formula2
n369.out → n368.a
n373.out → n368.b
n31.out → n379.assertion
n380.out → n379.atom1
n15.out → n379.formula1
n381.out → n379.atom2
n360.out → n379.formula2
n382.out → n379.atom3
n376.out → n379.formula3
n368.out → n367.a
n379.out → n367.b
n345.out → n344.a
n367.out → n344.b
n31.out → n383.assertion
n384.out → n383.atom1
n15.out → n383.formula1
n385.out → n383.atom2
n67.out → n383.formula2
n386.out → n383.atom3
n375.out → n383.formula3
n344.out → n343.a
n383.out → n343.b
n4.out → n342.a
n343.out → n342.b
n225.out → n391.assertion
n392.out → n391.atom1
n11.out → n391.formula1
n393.out → n391.atom2
n13.out → n391.formula2
n394.out → n391.atom3
n23.out → n391.formula3
n18.out → n395.assertion
n11.out → n397.a
n23.out → n397.b
n302.out → n398.a
n397.out → n398.b
n350.out → n399.a
n398.out → n399.b
n396.out → n395.atom1
n399.out → n395.formula1
n400.out → n395.atom2
n15.out → n395.formula2
n391.out → n390.a
n395.out → n390.b
n18.out → n403.assertion
n404.out → n403.atom1
n399.out → n403.formula1
n405.out → n403.atom2
n25.out → n403.formula2
n18.out → n406.assertion
n25.out → n408.a
n399.out → n408.b
n399.out → n409.a
n408.out → n409.b
n407.out → n406.atom1
n409.out → n406.formula1
n410.out → n406.atom2
n15.out → n406.formula2
n403.out → n402.a
n406.out → n402.b
n31.out → n411.assertion
n412.out → n411.atom1
n15.out → n411.formula1
n413.out → n411.atom2
n399.out → n411.formula2
n414.out → n411.atom3
n408.out → n411.formula3
n402.out → n401.a
n411.out → n401.b
n390.out → n389.a
n401.out → n389.b
n31.out → n417.assertion
n418.out → n417.atom1
n25.out → n417.formula1
n419.out → n417.atom2
n350.out → n417.formula2
n420.out → n417.atom3
n398.out → n417.formula3
n18.out → n421.assertion
n25.out → n423.a
n398.out → n423.b
n375.out → n424.a
n423.out → n424.b
n408.out → n425.a
n424.out → n425.b
n422.out → n421.atom1
n425.out → n421.formula1
n426.out → n421.atom2
n15.out → n421.formula2
n417.out → n416.a
n421.out → n416.b
n31.out → n427.assertion
n428.out → n427.atom1
n15.out → n427.formula1
n429.out → n427.atom2
n408.out → n427.formula2
n430.out → n427.atom3
n424.out → n427.formula3
n416.out → n415.a
n427.out → n415.b
n389.out → n388.a
n415.out → n388.b
n31.out → n431.assertion
n432.out → n431.atom1
n15.out → n431.formula1
n433.out → n431.atom2
n375.out → n431.formula2
n434.out → n431.atom3
n423.out → n431.formula3
n388.out → n387.a
n431.out → n387.b
n342.out → n341.a
n387.out → n341.b
n31.out → n437.assertion
n438.out → n437.atom1
n25.out → n437.formula1
n439.out → n437.atom2
n302.out → n437.formula2
n440.out → n437.atom3
n397.out → n437.formula3
n18.out → n441.assertion
n25.out → n443.a
n397.out → n443.b
n327.out → n444.a
n443.out → n444.b
n423.out → n445.a
n444.out → n445.b
n442.out → n441.atom1
n445.out → n441.formula1
n446.out → n441.atom2
n15.out → n441.formula2
n437.out → n436.a
n441.out → n436.b
n31.out → n447.assertion
n448.out → n447.atom1
n15.out → n447.formula1
n449.out → n447.atom2
n423.out → n447.formula2
n450.out → n447.atom3
n444.out → n447.formula3
n436.out → n435.a
n447.out → n435.b
n341.out → n340.a
n435.out → n340.b
n31.out → n451.assertion
n452.out → n451.atom1
n15.out → n451.formula1
n453.out → n451.atom2
n327.out → n451.formula2
n454.out → n451.atom3
n443.out → n451.formula3
n340.out → n339.a
n451.out → n339.b
n294.out → n293.a
n339.out → n293.b
n11.out → n459.a
n23.out → n459.b
n18.out → n460.assertion
n11.out → n462.a
n23.out → n462.b
n232.out → n463.a
n462.out → n463.b
n397.out → n464.a
n463.out → n464.b
n461.out → n460.atom1
n464.out → n460.formula1
n465.out → n460.atom2
n15.out → n460.formula2
n459.out → n458.a
n460.out → n458.b
n18.out → n468.assertion
n469.out → n468.atom1
n464.out → n468.formula1
n470.out → n468.atom2
n25.out → n468.formula2
n18.out → n471.assertion
n25.out → n473.a
n464.out → n473.b
n464.out → n474.a
n473.out → n474.b
n472.out → n471.atom1
n474.out → n471.formula1
n475.out → n471.atom2
n15.out → n471.formula2
n468.out → n467.a
n471.out → n467.b
n31.out → n476.assertion
n477.out → n476.atom1
n15.out → n476.formula1
n478.out → n476.atom2
n464.out → n476.formula2
n479.out → n476.atom3
n473.out → n476.formula3
n467.out → n466.a
n476.out → n466.b
n458.out → n457.a
n466.out → n457.b
n31.out → n482.assertion
n483.out → n482.atom1
n25.out → n482.formula1
n484.out → n482.atom2
n397.out → n482.formula2
n485.out → n482.atom3
n463.out → n482.formula3
n18.out → n486.assertion
n25.out → n488.a
n463.out → n488.b
n443.out → n489.a
n488.out → n489.b
n473.out → n490.a
n489.out → n490.b
n487.out → n486.atom1
n490.out → n486.formula1
n491.out → n486.atom2
n15.out → n486.formula2
n482.out → n481.a
n486.out → n481.b
n31.out → n492.assertion
n493.out → n492.atom1
n15.out → n492.formula1
n494.out → n492.atom2
n473.out → n492.formula2
n495.out → n492.atom3
n489.out → n492.formula3
n481.out → n480.a
n492.out → n480.b
n457.out → n456.a
n480.out → n456.b
n31.out → n496.assertion
n497.out → n496.atom1
n15.out → n496.formula1
n498.out → n496.atom2
n443.out → n496.formula2
n499.out → n496.atom3
n488.out → n496.formula3
n456.out → n455.a
n496.out → n455.b
n293.out → n292.a
n455.out → n292.b
n31.out → n502.assertion
n503.out → n502.atom1
n25.out → n502.formula1
n504.out → n502.atom2
n232.out → n502.formula2
n505.out → n502.atom3
n462.out → n502.formula3
n18.out → n506.assertion
n25.out → n508.a
n462.out → n508.b
n278.out → n509.a
n508.out → n509.b
n488.out → n510.a
n509.out → n510.b
n507.out → n506.atom1
n510.out → n506.formula1
n511.out → n506.atom2
n15.out → n506.formula2
n502.out → n501.a
n506.out → n501.b
n31.out → n512.assertion
n513.out → n512.atom1
n15.out → n512.formula1
n514.out → n512.atom2
n488.out → n512.formula2
n515.out → n512.atom3
n509.out → n512.formula3
n501.out → n500.a
n512.out → n500.b
n292.out → n291.a
n500.out → n291.b
n31.out → n516.assertion
n517.out → n516.atom1
n15.out → n516.formula1
n518.out → n516.atom2
n278.out → n516.formula2
n519.out → n516.atom3
n508.out → n516.formula3
n291.out → n290.a
n516.out → n290.b
n2.out → n1.a
n290.out → n1.b
n1.out → n520.proof
```

</details>

### *77 · 元素等价的全称传递

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ u ) → ∀ z ( z ∈ x ↔ z ∈ u ) ) )`
- 提示：先逐点传递，再全称推广；两次假设用 DT 消去。
- 参考解：484 个模块 / 864 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n543  [target]
n1  mp
n2  mp
n3  gen(v=z)
n4  mp
n5  mp
n6  mp
n7  mp
n12  term z
n13  term x
n14  mem
n15  term y
n16  mem
n17  iff
n18  all(v=z)
n21  axiom A1
n22  subst(groups=1)
n23  atom P
n24  atom Q
n25  term u
n26  mem
n27  iff
n28  all(v=z)
n31  imp
n34  axiom A2
n39  mp
n40  mp
n41  mp
n42  mp
n43  all-inst(v=z)
n44  subst(groups=1)
n45  atom P
n46  imp
n47  atom Q
n48  mp
n49  mp
n50  subst(groups=1)
n51  atom P
n52  atom Q
n53  subst(groups=1)
n54  atom P
n55  imp
n56  imp
n57  atom Q
n58  subst(groups=2)
n59  atom P
n60  atom Q
n61  atom R
n62  mp
n63  mp
n64  subst(groups=2)
n65  atom P
n66  atom Q
n67  atom R
n68  subst(groups=1)
n69  atom P
n70  imp
n71  imp
n72  imp
n73  atom Q
n74  subst(groups=2)
n75  atom P
n76  atom Q
n77  atom R
n78  subst(groups=2)
n79  atom P
n80  atom Q
n81  atom R
n82  mp
n83  mp
n84  mp
n85  mp
n86  iff-elim-ax(dir=rl)
n87  subst(groups=1)
n88  atom P
n89  imp
n90  imp
n91  atom Q
n92  mp
n93  mp
n94  subst(groups=1)
n95  atom P
n96  atom Q
n97  subst(groups=1)
n98  atom P
n99  imp
n100  imp
n101  atom Q
n102  subst(groups=2)
n103  atom P
n104  atom Q
n105  atom R
n106  mp
n107  mp
n108  subst(groups=2)
n109  atom P
n110  atom Q
n111  atom R
n112  subst(groups=1)
n113  atom P
n114  imp
n115  imp
n116  imp
n117  atom Q
n118  subst(groups=2)
n119  atom P
n120  atom Q
n121  atom R
n122  subst(groups=2)
n123  atom P
n124  atom Q
n125  atom R
n126  mp
n127  mp
n128  mp
n129  mp
n141  mp
n142  all-inst(v=z)
n143  subst(groups=1)
n144  atom P
n145  imp
n146  atom Q
n180  mp
n181  mp
n182  mp
n183  mp
n184  iff-elim-ax(dir=rl)
n185  subst(groups=1)
n186  atom P
n187  imp
n188  imp
n189  atom Q
n190  mp
n191  mp
n192  subst(groups=1)
n193  atom P
n194  atom Q
n195  subst(groups=1)
n196  atom P
n197  imp
n198  imp
n199  atom Q
n200  subst(groups=2)
n201  atom P
n202  atom Q
n203  atom R
n204  mp
n205  mp
n206  subst(groups=2)
n207  atom P
n208  atom Q
n209  atom R
n210  subst(groups=1)
n211  atom P
n212  imp
n213  imp
n214  imp
n215  atom Q
n216  subst(groups=2)
n217  atom P
n218  atom Q
n219  atom R
n220  subst(groups=2)
n221  atom P
n222  atom Q
n223  atom R
n224  mp
n225  mp
n226  mp
n227  mp
n228  定理 *05
n229  subst(groups=2)
n230  atom P
n231  atom Q
n232  atom R
n233  subst(groups=1)
n234  atom P
n235  imp
n236  imp
n237  imp
n238  atom Q
n239  mp
n240  mp
n241  subst(groups=1)
n242  atom P
n243  atom Q
n244  subst(groups=1)
n245  atom P
n246  imp
n247  imp
n248  atom Q
n249  subst(groups=2)
n250  atom P
n251  atom Q
n252  atom R
n253  mp
n254  mp
n255  subst(groups=2)
n256  atom P
n257  atom Q
n258  atom R
n259  subst(groups=1)
n260  atom P
n261  imp
n262  imp
n263  imp
n264  atom Q
n265  subst(groups=2)
n266  atom P
n267  atom Q
n268  atom R
n269  subst(groups=2)
n270  atom P
n271  atom Q
n272  atom R
n273  mp
n274  mp
n275  subst(groups=2)
n276  atom P
n277  atom Q
n278  atom R
n279  subst(groups=1)
n280  atom P
n281  imp
n282  imp
n283  imp
n284  atom Q
n285  subst(groups=2)
n286  atom P
n287  atom Q
n288  atom R
n289  subst(groups=2)
n290  atom P
n291  atom Q
n292  atom R
n293  mp
n294  mp
n295  mp
n296  mp
n297  mp
n298  mp
n299  mp
n300  mp
n301  mp
n302  iff-elim-ax(dir=lr)
n303  subst(groups=1)
n304  atom P
n305  imp
n306  imp
n307  atom Q
n308  mp
n309  mp
n310  subst(groups=1)
n311  atom P
n312  atom Q
n313  subst(groups=1)
n314  atom P
n315  imp
n316  imp
n317  atom Q
n318  subst(groups=2)
n319  atom P
n320  atom Q
n321  atom R
n322  mp
n323  mp
n324  subst(groups=2)
n325  atom P
n326  atom Q
n327  atom R
n328  subst(groups=1)
n329  atom P
n330  imp
n331  imp
n332  imp
n333  atom Q
n334  subst(groups=2)
n335  atom P
n336  atom Q
n337  atom R
n338  subst(groups=2)
n339  atom P
n340  atom Q
n341  atom R
n342  mp
n343  mp
n344  mp
n345  mp
n346  mp
n347  mp
n348  mp
n349  mp
n350  iff-elim-ax(dir=lr)
n351  subst(groups=1)
n352  atom P
n353  imp
n354  imp
n355  atom Q
n356  mp
n357  mp
n358  subst(groups=1)
n359  atom P
n360  atom Q
n361  subst(groups=1)
n362  atom P
n363  imp
n364  imp
n365  atom Q
n366  subst(groups=2)
n367  atom P
n368  atom Q
n369  atom R
n370  mp
n371  mp
n372  subst(groups=2)
n373  atom P
n374  atom Q
n375  atom R
n376  subst(groups=1)
n377  atom P
n378  imp
n379  imp
n380  imp
n381  atom Q
n382  subst(groups=2)
n383  atom P
n384  atom Q
n385  atom R
n386  subst(groups=2)
n387  atom P
n388  atom Q
n389  atom R
n390  mp
n391  mp
n392  mp
n393  mp
n394  subst(groups=2)
n395  atom P
n396  atom Q
n397  atom R
n398  subst(groups=1)
n399  atom P
n400  imp
n401  imp
n402  imp
n403  atom Q
n404  mp
n405  mp
n406  subst(groups=1)
n407  atom P
n408  atom Q
n409  subst(groups=1)
n410  atom P
n411  imp
n412  imp
n413  atom Q
n414  subst(groups=2)
n415  atom P
n416  atom Q
n417  atom R
n418  mp
n419  mp
n420  subst(groups=2)
n421  atom P
n422  atom Q
n423  atom R
n424  subst(groups=1)
n425  atom P
n426  imp
n427  imp
n428  imp
n429  atom Q
n430  subst(groups=2)
n431  atom P
n432  atom Q
n433  atom R
n434  subst(groups=2)
n435  atom P
n436  atom Q
n437  atom R
n438  mp
n439  mp
n440  subst(groups=2)
n441  atom P
n442  atom Q
n443  atom R
n444  subst(groups=1)
n445  atom P
n446  imp
n447  imp
n448  imp
n449  atom Q
n450  subst(groups=2)
n451  atom P
n452  atom Q
n453  atom R
n454  subst(groups=2)
n455  atom P
n456  atom Q
n457  atom R
n458  mp
n459  mp
n460  mp
n461  mp
n462  iff-intro-ax
n463  subst(groups=1)
n464  atom P
n465  iff
n466  imp
n467  imp
n468  atom Q
n469  mp
n470  mp
n471  subst(groups=1)
n472  atom P
n473  atom Q
n474  subst(groups=1)
n475  atom P
n476  imp
n477  imp
n478  atom Q
n479  subst(groups=2)
n480  atom P
n481  atom Q
n482  atom R
n483  mp
n484  mp
n485  subst(groups=2)
n486  atom P
n487  atom Q
n488  atom R
n489  subst(groups=1)
n490  atom P
n491  imp
n492  imp
n493  imp
n494  atom Q
n495  subst(groups=2)
n496  atom P
n497  atom Q
n498  atom R
n499  subst(groups=2)
n500  atom P
n501  atom Q
n502  atom R
n503  mp
n504  mp
n505  subst(groups=2)
n506  atom P
n507  atom Q
n508  atom R
n509  subst(groups=1)
n510  atom P
n511  imp
n512  imp
n513  imp
n514  atom Q
n515  subst(groups=2)
n516  atom P
n517  atom Q
n518  atom R
n519  subst(groups=2)
n520  atom P
n521  atom Q
n522  atom R
n523  定理 *64
n524  subst(groups=1)
n525  atom P
n526  atom Q
n527  mp
n528  mp
n529  subst(groups=1)
n530  atom P
n531  atom Q
n532  subst(groups=1)
n533  atom P
n534  all(v=z)
n535  all(v=z)
n536  imp
n537  imp
n538  atom Q
n539  subst(groups=2)
n540  atom P
n541  atom Q
n542  atom R

接线：
n12.out → n14.a
n13.out → n14.b
n12.out → n16.a
n15.out → n16.b
n14.out → n17.a
n16.out → n17.b
n17.out → n18.a
n21.out → n22.assertion
n23.out → n22.atom1
n18.out → n22.formula1
n12.out → n26.a
n25.out → n26.b
n16.out → n27.a
n26.out → n27.b
n27.out → n28.a
n24.out → n22.atom2
n28.out → n22.formula2
n28.out → n31.a
n18.out → n31.b
n17.out → n43.formula
n12.out → n43.term
n21.out → n44.assertion
n18.out → n46.a
n17.out → n46.b
n45.out → n44.atom1
n46.out → n44.formula1
n47.out → n44.atom2
n18.out → n44.formula2
n43.out → n42.a
n44.out → n42.b
n21.out → n50.assertion
n51.out → n50.atom1
n46.out → n50.formula1
n52.out → n50.atom2
n28.out → n50.formula2
n21.out → n53.assertion
n28.out → n55.a
n46.out → n55.b
n46.out → n56.a
n55.out → n56.b
n54.out → n53.atom1
n56.out → n53.formula1
n57.out → n53.atom2
n18.out → n53.formula2
n50.out → n49.a
n53.out → n49.b
n34.out → n58.assertion
n59.out → n58.atom1
n18.out → n58.formula1
n60.out → n58.atom2
n46.out → n58.formula2
n61.out → n58.atom3
n55.out → n58.formula3
n49.out → n48.a
n58.out → n48.b
n42.out → n41.a
n48.out → n41.b
n34.out → n64.assertion
n65.out → n64.atom1
n28.out → n64.formula1
n66.out → n64.atom2
n18.out → n64.formula2
n67.out → n64.atom3
n17.out → n64.formula3
n21.out → n68.assertion
n28.out → n70.a
n17.out → n70.b
n31.out → n71.a
n70.out → n71.b
n55.out → n72.a
n71.out → n72.b
n69.out → n68.atom1
n72.out → n68.formula1
n73.out → n68.atom2
n18.out → n68.formula2
n64.out → n63.a
n68.out → n63.b
n34.out → n74.assertion
n75.out → n74.atom1
n18.out → n74.formula1
n76.out → n74.atom2
n55.out → n74.formula2
n77.out → n74.atom3
n71.out → n74.formula3
n63.out → n62.a
n74.out → n62.b
n41.out → n40.a
n62.out → n40.b
n34.out → n78.assertion
n79.out → n78.atom1
n18.out → n78.formula1
n80.out → n78.atom2
n31.out → n78.formula2
n81.out → n78.atom3
n70.out → n78.formula3
n40.out → n39.a
n78.out → n39.b
n22.out → n7.a
n39.out → n7.b
n14.out → n86.a
n16.out → n86.b
n21.out → n87.assertion
n16.out → n89.a
n14.out → n89.b
n17.out → n90.a
n89.out → n90.b
n88.out → n87.atom1
n90.out → n87.formula1
n91.out → n87.atom2
n18.out → n87.formula2
n86.out → n85.a
n87.out → n85.b
n21.out → n94.assertion
n95.out → n94.atom1
n90.out → n94.formula1
n96.out → n94.atom2
n28.out → n94.formula2
n21.out → n97.assertion
n28.out → n99.a
n90.out → n99.b
n90.out → n100.a
n99.out → n100.b
n98.out → n97.atom1
n100.out → n97.formula1
n101.out → n97.atom2
n18.out → n97.formula2
n94.out → n93.a
n97.out → n93.b
n34.out → n102.assertion
n103.out → n102.atom1
n18.out → n102.formula1
n104.out → n102.atom2
n90.out → n102.formula2
n105.out → n102.atom3
n99.out → n102.formula3
n93.out → n92.a
n102.out → n92.b
n85.out → n84.a
n92.out → n84.b
n34.out → n108.assertion
n109.out → n108.atom1
n28.out → n108.formula1
n110.out → n108.atom2
n17.out → n108.formula2
n111.out → n108.atom3
n89.out → n108.formula3
n21.out → n112.assertion
n28.out → n114.a
n89.out → n114.b
n70.out → n115.a
n114.out → n115.b
n99.out → n116.a
n115.out → n116.b
n113.out → n112.atom1
n116.out → n112.formula1
n117.out → n112.atom2
n18.out → n112.formula2
n108.out → n107.a
n112.out → n107.b
n34.out → n118.assertion
n119.out → n118.atom1
n18.out → n118.formula1
n120.out → n118.atom2
n99.out → n118.formula2
n121.out → n118.atom3
n115.out → n118.formula3
n107.out → n106.a
n118.out → n106.b
n84.out → n83.a
n106.out → n83.b
n34.out → n122.assertion
n123.out → n122.atom1
n18.out → n122.formula1
n124.out → n122.atom2
n70.out → n122.formula2
n125.out → n122.atom3
n114.out → n122.formula3
n83.out → n82.a
n122.out → n82.b
n7.out → n6.a
n82.out → n6.b
n27.out → n142.formula
n12.out → n142.term
n21.out → n143.assertion
n28.out → n145.a
n27.out → n145.b
n144.out → n143.atom1
n145.out → n143.formula1
n146.out → n143.atom2
n18.out → n143.formula2
n142.out → n141.a
n143.out → n141.b
n16.out → n184.a
n26.out → n184.b
n21.out → n185.assertion
n26.out → n187.a
n16.out → n187.b
n27.out → n188.a
n187.out → n188.b
n186.out → n185.atom1
n188.out → n185.formula1
n189.out → n185.atom2
n18.out → n185.formula2
n184.out → n183.a
n185.out → n183.b
n21.out → n192.assertion
n193.out → n192.atom1
n188.out → n192.formula1
n194.out → n192.atom2
n28.out → n192.formula2
n21.out → n195.assertion
n28.out → n197.a
n188.out → n197.b
n188.out → n198.a
n197.out → n198.b
n196.out → n195.atom1
n198.out → n195.formula1
n199.out → n195.atom2
n18.out → n195.formula2
n192.out → n191.a
n195.out → n191.b
n34.out → n200.assertion
n201.out → n200.atom1
n18.out → n200.formula1
n202.out → n200.atom2
n188.out → n200.formula2
n203.out → n200.atom3
n197.out → n200.formula3
n191.out → n190.a
n200.out → n190.b
n183.out → n182.a
n190.out → n182.b
n34.out → n206.assertion
n207.out → n206.atom1
n28.out → n206.formula1
n208.out → n206.atom2
n27.out → n206.formula2
n209.out → n206.atom3
n187.out → n206.formula3
n21.out → n210.assertion
n28.out → n212.a
n187.out → n212.b
n145.out → n213.a
n212.out → n213.b
n197.out → n214.a
n213.out → n214.b
n211.out → n210.atom1
n214.out → n210.formula1
n215.out → n210.atom2
n18.out → n210.formula2
n206.out → n205.a
n210.out → n205.b
n34.out → n216.assertion
n217.out → n216.atom1
n18.out → n216.formula1
n218.out → n216.atom2
n197.out → n216.formula2
n219.out → n216.atom3
n213.out → n216.formula3
n205.out → n204.a
n216.out → n204.b
n182.out → n181.a
n204.out → n181.b
n34.out → n220.assertion
n221.out → n220.atom1
n18.out → n220.formula1
n222.out → n220.atom2
n145.out → n220.formula2
n223.out → n220.atom3
n212.out → n220.formula3
n181.out → n180.a
n220.out → n180.b
n141.out → n129.a
n180.out → n129.b
n228.out → n229.assertion
n230.out → n229.atom1
n26.out → n229.formula1
n231.out → n229.atom2
n16.out → n229.formula2
n232.out → n229.atom3
n14.out → n229.formula3
n21.out → n233.assertion
n26.out → n235.a
n14.out → n235.b
n89.out → n236.a
n235.out → n236.b
n187.out → n237.a
n236.out → n237.b
n234.out → n233.atom1
n237.out → n233.formula1
n238.out → n233.atom2
n18.out → n233.formula2
n229.out → n227.a
n233.out → n227.b
n21.out → n241.assertion
n242.out → n241.atom1
n237.out → n241.formula1
n243.out → n241.atom2
n28.out → n241.formula2
n21.out → n244.assertion
n28.out → n246.a
n237.out → n246.b
n237.out → n247.a
n246.out → n247.b
n245.out → n244.atom1
n247.out → n244.formula1
n248.out → n244.atom2
n18.out → n244.formula2
n241.out → n240.a
n244.out → n240.b
n34.out → n249.assertion
n250.out → n249.atom1
n18.out → n249.formula1
n251.out → n249.atom2
n237.out → n249.formula2
n252.out → n249.atom3
n246.out → n249.formula3
n240.out → n239.a
n249.out → n239.b
n227.out → n226.a
n239.out → n226.b
n34.out → n255.assertion
n256.out → n255.atom1
n28.out → n255.formula1
n257.out → n255.atom2
n187.out → n255.formula2
n258.out → n255.atom3
n236.out → n255.formula3
n21.out → n259.assertion
n28.out → n261.a
n236.out → n261.b
n212.out → n262.a
n261.out → n262.b
n246.out → n263.a
n262.out → n263.b
n260.out → n259.atom1
n263.out → n259.formula1
n264.out → n259.atom2
n18.out → n259.formula2
n255.out → n254.a
n259.out → n254.b
n34.out → n265.assertion
n266.out → n265.atom1
n18.out → n265.formula1
n267.out → n265.atom2
n246.out → n265.formula2
n268.out → n265.atom3
n262.out → n265.formula3
n254.out → n253.a
n265.out → n253.b
n226.out → n225.a
n253.out → n225.b
n34.out → n269.assertion
n270.out → n269.atom1
n18.out → n269.formula1
n271.out → n269.atom2
n212.out → n269.formula2
n272.out → n269.atom3
n261.out → n269.formula3
n225.out → n224.a
n269.out → n224.b
n129.out → n128.a
n224.out → n128.b
n34.out → n275.assertion
n276.out → n275.atom1
n28.out → n275.formula1
n277.out → n275.atom2
n89.out → n275.formula2
n278.out → n275.atom3
n235.out → n275.formula3
n21.out → n279.assertion
n28.out → n281.a
n235.out → n281.b
n114.out → n282.a
n281.out → n282.b
n261.out → n283.a
n282.out → n283.b
n280.out → n279.atom1
n283.out → n279.formula1
n284.out → n279.atom2
n18.out → n279.formula2
n275.out → n274.a
n279.out → n274.b
n34.out → n285.assertion
n286.out → n285.atom1
n18.out → n285.formula1
n287.out → n285.atom2
n261.out → n285.formula2
n288.out → n285.atom3
n282.out → n285.formula3
n274.out → n273.a
n285.out → n273.b
n128.out → n127.a
n273.out → n127.b
n34.out → n289.assertion
n290.out → n289.atom1
n18.out → n289.formula1
n291.out → n289.atom2
n114.out → n289.formula2
n292.out → n289.atom3
n281.out → n289.formula3
n127.out → n126.a
n289.out → n126.b
n6.out → n5.a
n126.out → n5.b
n16.out → n302.a
n26.out → n302.b
n21.out → n303.assertion
n16.out → n305.a
n26.out → n305.b
n27.out → n306.a
n305.out → n306.b
n304.out → n303.atom1
n306.out → n303.formula1
n307.out → n303.atom2
n18.out → n303.formula2
n302.out → n301.a
n303.out → n301.b
n21.out → n310.assertion
n311.out → n310.atom1
n306.out → n310.formula1
n312.out → n310.atom2
n28.out → n310.formula2
n21.out → n313.assertion
n28.out → n315.a
n306.out → n315.b
n306.out → n316.a
n315.out → n316.b
n314.out → n313.atom1
n316.out → n313.formula1
n317.out → n313.atom2
n18.out → n313.formula2
n310.out → n309.a
n313.out → n309.b
n34.out → n318.assertion
n319.out → n318.atom1
n18.out → n318.formula1
n320.out → n318.atom2
n306.out → n318.formula2
n321.out → n318.atom3
n315.out → n318.formula3
n309.out → n308.a
n318.out → n308.b
n301.out → n300.a
n308.out → n300.b
n34.out → n324.assertion
n325.out → n324.atom1
n28.out → n324.formula1
n326.out → n324.atom2
n27.out → n324.formula2
n327.out → n324.atom3
n305.out → n324.formula3
n21.out → n328.assertion
n28.out → n330.a
n305.out → n330.b
n145.out → n331.a
n330.out → n331.b
n315.out → n332.a
n331.out → n332.b
n329.out → n328.atom1
n332.out → n328.formula1
n333.out → n328.atom2
n18.out → n328.formula2
n324.out → n323.a
n328.out → n323.b
n34.out → n334.assertion
n335.out → n334.atom1
n18.out → n334.formula1
n336.out → n334.atom2
n315.out → n334.formula2
n337.out → n334.atom3
n331.out → n334.formula3
n323.out → n322.a
n334.out → n322.b
n300.out → n299.a
n322.out → n299.b
n34.out → n338.assertion
n339.out → n338.atom1
n18.out → n338.formula1
n340.out → n338.atom2
n145.out → n338.formula2
n341.out → n338.atom3
n330.out → n338.formula3
n299.out → n298.a
n338.out → n298.b
n141.out → n297.a
n298.out → n297.b
n14.out → n350.a
n16.out → n350.b
n21.out → n351.assertion
n14.out → n353.a
n16.out → n353.b
n17.out → n354.a
n353.out → n354.b
n352.out → n351.atom1
n354.out → n351.formula1
n355.out → n351.atom2
n18.out → n351.formula2
n350.out → n349.a
n351.out → n349.b
n21.out → n358.assertion
n359.out → n358.atom1
n354.out → n358.formula1
n360.out → n358.atom2
n28.out → n358.formula2
n21.out → n361.assertion
n28.out → n363.a
n354.out → n363.b
n354.out → n364.a
n363.out → n364.b
n362.out → n361.atom1
n364.out → n361.formula1
n365.out → n361.atom2
n18.out → n361.formula2
n358.out → n357.a
n361.out → n357.b
n34.out → n366.assertion
n367.out → n366.atom1
n18.out → n366.formula1
n368.out → n366.atom2
n354.out → n366.formula2
n369.out → n366.atom3
n363.out → n366.formula3
n357.out → n356.a
n366.out → n356.b
n349.out → n348.a
n356.out → n348.b
n34.out → n372.assertion
n373.out → n372.atom1
n28.out → n372.formula1
n374.out → n372.atom2
n17.out → n372.formula2
n375.out → n372.atom3
n353.out → n372.formula3
n21.out → n376.assertion
n28.out → n378.a
n353.out → n378.b
n70.out → n379.a
n378.out → n379.b
n363.out → n380.a
n379.out → n380.b
n377.out → n376.atom1
n380.out → n376.formula1
n381.out → n376.atom2
n18.out → n376.formula2
n372.out → n371.a
n376.out → n371.b
n34.out → n382.assertion
n383.out → n382.atom1
n18.out → n382.formula1
n384.out → n382.atom2
n363.out → n382.formula2
n385.out → n382.atom3
n379.out → n382.formula3
n371.out → n370.a
n382.out → n370.b
n348.out → n347.a
n370.out → n347.b
n34.out → n386.assertion
n387.out → n386.atom1
n18.out → n386.formula1
n388.out → n386.atom2
n70.out → n386.formula2
n389.out → n386.atom3
n378.out → n386.formula3
n347.out → n346.a
n386.out → n346.b
n7.out → n345.a
n346.out → n345.b
n228.out → n394.assertion
n395.out → n394.atom1
n14.out → n394.formula1
n396.out → n394.atom2
n16.out → n394.formula2
n397.out → n394.atom3
n26.out → n394.formula3
n21.out → n398.assertion
n14.out → n400.a
n26.out → n400.b
n305.out → n401.a
n400.out → n401.b
n353.out → n402.a
n401.out → n402.b
n399.out → n398.atom1
n402.out → n398.formula1
n403.out → n398.atom2
n18.out → n398.formula2
n394.out → n393.a
n398.out → n393.b
n21.out → n406.assertion
n407.out → n406.atom1
n402.out → n406.formula1
n408.out → n406.atom2
n28.out → n406.formula2
n21.out → n409.assertion
n28.out → n411.a
n402.out → n411.b
n402.out → n412.a
n411.out → n412.b
n410.out → n409.atom1
n412.out → n409.formula1
n413.out → n409.atom2
n18.out → n409.formula2
n406.out → n405.a
n409.out → n405.b
n34.out → n414.assertion
n415.out → n414.atom1
n18.out → n414.formula1
n416.out → n414.atom2
n402.out → n414.formula2
n417.out → n414.atom3
n411.out → n414.formula3
n405.out → n404.a
n414.out → n404.b
n393.out → n392.a
n404.out → n392.b
n34.out → n420.assertion
n421.out → n420.atom1
n28.out → n420.formula1
n422.out → n420.atom2
n353.out → n420.formula2
n423.out → n420.atom3
n401.out → n420.formula3
n21.out → n424.assertion
n28.out → n426.a
n401.out → n426.b
n378.out → n427.a
n426.out → n427.b
n411.out → n428.a
n427.out → n428.b
n425.out → n424.atom1
n428.out → n424.formula1
n429.out → n424.atom2
n18.out → n424.formula2
n420.out → n419.a
n424.out → n419.b
n34.out → n430.assertion
n431.out → n430.atom1
n18.out → n430.formula1
n432.out → n430.atom2
n411.out → n430.formula2
n433.out → n430.atom3
n427.out → n430.formula3
n419.out → n418.a
n430.out → n418.b
n392.out → n391.a
n418.out → n391.b
n34.out → n434.assertion
n435.out → n434.atom1
n18.out → n434.formula1
n436.out → n434.atom2
n378.out → n434.formula2
n437.out → n434.atom3
n426.out → n434.formula3
n391.out → n390.a
n434.out → n390.b
n345.out → n344.a
n390.out → n344.b
n34.out → n440.assertion
n441.out → n440.atom1
n28.out → n440.formula1
n442.out → n440.atom2
n305.out → n440.formula2
n443.out → n440.atom3
n400.out → n440.formula3
n21.out → n444.assertion
n28.out → n446.a
n400.out → n446.b
n330.out → n447.a
n446.out → n447.b
n426.out → n448.a
n447.out → n448.b
n445.out → n444.atom1
n448.out → n444.formula1
n449.out → n444.atom2
n18.out → n444.formula2
n440.out → n439.a
n444.out → n439.b
n34.out → n450.assertion
n451.out → n450.atom1
n18.out → n450.formula1
n452.out → n450.atom2
n426.out → n450.formula2
n453.out → n450.atom3
n447.out → n450.formula3
n439.out → n438.a
n450.out → n438.b
n344.out → n343.a
n438.out → n343.b
n34.out → n454.assertion
n455.out → n454.atom1
n18.out → n454.formula1
n456.out → n454.atom2
n330.out → n454.formula2
n457.out → n454.atom3
n446.out → n454.formula3
n343.out → n342.a
n454.out → n342.b
n297.out → n296.a
n342.out → n296.b
n14.out → n462.a
n26.out → n462.b
n21.out → n463.assertion
n14.out → n465.a
n26.out → n465.b
n235.out → n466.a
n465.out → n466.b
n400.out → n467.a
n466.out → n467.b
n464.out → n463.atom1
n467.out → n463.formula1
n468.out → n463.atom2
n18.out → n463.formula2
n462.out → n461.a
n463.out → n461.b
n21.out → n471.assertion
n472.out → n471.atom1
n467.out → n471.formula1
n473.out → n471.atom2
n28.out → n471.formula2
n21.out → n474.assertion
n28.out → n476.a
n467.out → n476.b
n467.out → n477.a
n476.out → n477.b
n475.out → n474.atom1
n477.out → n474.formula1
n478.out → n474.atom2
n18.out → n474.formula2
n471.out → n470.a
n474.out → n470.b
n34.out → n479.assertion
n480.out → n479.atom1
n18.out → n479.formula1
n481.out → n479.atom2
n467.out → n479.formula2
n482.out → n479.atom3
n476.out → n479.formula3
n470.out → n469.a
n479.out → n469.b
n461.out → n460.a
n469.out → n460.b
n34.out → n485.assertion
n486.out → n485.atom1
n28.out → n485.formula1
n487.out → n485.atom2
n400.out → n485.formula2
n488.out → n485.atom3
n466.out → n485.formula3
n21.out → n489.assertion
n28.out → n491.a
n466.out → n491.b
n446.out → n492.a
n491.out → n492.b
n476.out → n493.a
n492.out → n493.b
n490.out → n489.atom1
n493.out → n489.formula1
n494.out → n489.atom2
n18.out → n489.formula2
n485.out → n484.a
n489.out → n484.b
n34.out → n495.assertion
n496.out → n495.atom1
n18.out → n495.formula1
n497.out → n495.atom2
n476.out → n495.formula2
n498.out → n495.atom3
n492.out → n495.formula3
n484.out → n483.a
n495.out → n483.b
n460.out → n459.a
n483.out → n459.b
n34.out → n499.assertion
n500.out → n499.atom1
n18.out → n499.formula1
n501.out → n499.atom2
n446.out → n499.formula2
n502.out → n499.atom3
n491.out → n499.formula3
n459.out → n458.a
n499.out → n458.b
n296.out → n295.a
n458.out → n295.b
n34.out → n505.assertion
n506.out → n505.atom1
n28.out → n505.formula1
n507.out → n505.atom2
n235.out → n505.formula2
n508.out → n505.atom3
n465.out → n505.formula3
n21.out → n509.assertion
n28.out → n511.a
n465.out → n511.b
n281.out → n512.a
n511.out → n512.b
n491.out → n513.a
n512.out → n513.b
n510.out → n509.atom1
n513.out → n509.formula1
n514.out → n509.atom2
n18.out → n509.formula2
n505.out → n504.a
n509.out → n504.b
n34.out → n515.assertion
n516.out → n515.atom1
n18.out → n515.formula1
n517.out → n515.atom2
n491.out → n515.formula2
n518.out → n515.atom3
n512.out → n515.formula3
n504.out → n503.a
n515.out → n503.b
n295.out → n294.a
n503.out → n294.b
n34.out → n519.assertion
n520.out → n519.atom1
n18.out → n519.formula1
n521.out → n519.atom2
n281.out → n519.formula2
n522.out → n519.atom3
n511.out → n519.formula3
n294.out → n293.a
n519.out → n293.b
n5.out → n4.a
n293.out → n4.b
n4.out → n3.assertion
n523.out → n524.assertion
n525.out → n524.atom1
n18.out → n524.formula1
n526.out → n524.atom2
n511.out → n524.formula2
n3.out → n2.a
n524.out → n2.b
n523.out → n529.assertion
n530.out → n529.atom1
n28.out → n529.formula1
n531.out → n529.atom2
n465.out → n529.formula2
n21.out → n532.assertion
n511.out → n534.a
n465.out → n535.a
n28.out → n536.a
n535.out → n536.b
n534.out → n537.a
n536.out → n537.b
n533.out → n532.atom1
n537.out → n532.formula1
n538.out → n532.atom2
n18.out → n532.formula2
n529.out → n528.a
n532.out → n528.b
n34.out → n539.assertion
n540.out → n539.atom1
n18.out → n539.formula1
n541.out → n539.atom2
n534.out → n539.formula2
n542.out → n539.atom3
n536.out → n539.formula3
n528.out → n527.a
n539.out → n527.b
n2.out → n1.a
n527.out → n1.b
n1.out → n543.proof
```

</details>

### *78 · 属于替换（反向）

- 目标：`⊢ ∀ x ∀ y ( x = y → ( y ∈ x → y ∈ y ) )`
- 提示：Leibniz 替换。
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

### *79 · 空集

- 目标：`⊢ ∃ z ∀ x ¬ x ∈ z`
- 提示：直接使用空集公理。
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

### *80 · 外延公理（全称）

- 目标：`⊢ ∀ x ∀ y ( ∀ z ( z ∈ x ↔ z ∈ y ) → x = y )`
- 提示：外延公理 + 全称推广。
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

### *81 · 外延的等价刻画

- 目标：`⊢ ∀ x ∀ y ( x = y ↔ ∀ z ( z ∈ x ↔ z ∈ y ) )`
- 提示：正向引用 *66；反向直接接外延公理；再用 ↔I 合成等价并全称推广。
- 参考解：15 个模块 / 20 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n16  [target]
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
n14  定理 *66
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
n1.out → n16.proof
```

</details>

### *82 · 配对公理（全称）

- 目标：`⊢ ∀ x ∀ y ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )`
- 提示：配对公理 + 全称推广。
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

### *83 · 配对公理（实例）

- 目标：`⊢ ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )`
- 提示：直接使用配对公理。
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

### *84 · 并集公理（全称）

- 目标：`⊢ ∀ x ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )`
- 提示：并集公理 + 全称推广。
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

### *85 · 并集公理（实例）

- 目标：`⊢ ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )`
- 提示：直接使用并集公理。
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

### *86 · 等词的双向同余

- 目标：`⊢ ∀ x ∀ y ( x = y → ( x = z ↔ y = z ) )`
- 提示：正向用 Leibniz(x→y)，反向先用对称性得到 y=x 再用 Leibniz(y→x)；↔I 合成后 DT 消去假设。
- 参考解：79 个模块 / 132 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n91  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  mp
n4  mp
n5  定理 *01
n6  subst(groups=0)
n7  atom P
n8  term x
n9  term y
n10  pred =
n11  mp
n12  mp
n13  mp
n14  leibniz(mode=replace, v=z)
n15  term z
n16  pred =
n17  axiom A1
n18  subst(groups=1)
n19  atom P
n20  pred =
n21  pred =
n22  imp
n23  imp
n24  atom Q
n25  mp
n26  mp
n27  mp
n28  定理 *51
n29  subst(groups=1)
n30  atom P
n31  imp
n32  atom Q
n33  mp
n34  mp
n35  定理 *05
n36  subst(groups=2)
n37  atom P
n38  atom Q
n39  atom R
n40  subst(groups=1)
n41  atom P
n42  imp
n43  imp
n44  imp
n45  atom Q
n46  axiom A2
n47  subst(groups=2)
n48  atom P
n49  atom Q
n50  atom R
n51  subst(groups=2)
n52  atom P
n53  atom Q
n54  atom R
n55  subst(groups=2)
n56  atom P
n57  atom Q
n58  atom R
n59  mp
n60  mp
n64  leibniz(mode=replace, v=z)
n67  imp
n74  mp
n75  mp
n76  iff-intro-ax
n77  subst(groups=1)
n78  atom P
n79  iff
n80  imp
n81  imp
n82  atom Q
n83  subst(groups=2)
n84  atom P
n85  atom Q
n86  atom R
n87  subst(groups=2)
n88  atom P
n89  atom Q
n90  atom R

接线：
n5.out → n6.assertion
n8.out → n10.t1
n9.out → n10.t2
n7.out → n6.atom1
n10.out → n6.formula1
n9.out → n14.x
n8.out → n14.y
n9.out → n16.t1
n15.out → n16.t2
n16.out → n14.formula
n17.out → n18.assertion
n9.out → n20.t1
n8.out → n20.t2
n8.out → n21.t1
n15.out → n21.t2
n16.out → n22.a
n21.out → n22.b
n20.out → n23.a
n22.out → n23.b
n19.out → n18.atom1
n23.out → n18.formula1
n24.out → n18.atom2
n10.out → n18.formula2
n14.out → n13.a
n18.out → n13.b
n17.out → n29.assertion
n10.out → n31.a
n20.out → n31.b
n30.out → n29.atom1
n31.out → n29.formula1
n32.out → n29.atom2
n10.out → n29.formula2
n28.out → n27.a
n29.out → n27.b
n35.out → n36.assertion
n37.out → n36.atom1
n10.out → n36.formula1
n38.out → n36.atom2
n20.out → n36.formula2
n39.out → n36.atom3
n22.out → n36.formula3
n17.out → n40.assertion
n10.out → n42.a
n22.out → n42.b
n23.out → n43.a
n42.out → n43.b
n31.out → n44.a
n43.out → n44.b
n41.out → n40.atom1
n44.out → n40.formula1
n45.out → n40.atom2
n10.out → n40.formula2
n36.out → n34.a
n40.out → n34.b
n46.out → n47.assertion
n48.out → n47.atom1
n10.out → n47.formula1
n49.out → n47.atom2
n31.out → n47.formula2
n50.out → n47.atom3
n43.out → n47.formula3
n34.out → n33.a
n47.out → n33.b
n27.out → n26.a
n33.out → n26.b
n46.out → n51.assertion
n52.out → n51.atom1
n10.out → n51.formula1
n53.out → n51.atom2
n23.out → n51.formula2
n54.out → n51.atom3
n42.out → n51.formula3
n26.out → n25.a
n51.out → n25.b
n13.out → n12.a
n25.out → n12.b
n46.out → n55.assertion
n56.out → n55.atom1
n10.out → n55.formula1
n57.out → n55.atom2
n10.out → n55.formula2
n58.out → n55.atom3
n22.out → n55.formula3
n12.out → n11.a
n55.out → n11.b
n6.out → n4.a
n11.out → n4.b
n8.out → n64.x
n9.out → n64.y
n21.out → n64.formula
n21.out → n67.a
n16.out → n67.b
n21.out → n76.a
n16.out → n76.b
n17.out → n77.assertion
n21.out → n79.a
n16.out → n79.b
n22.out → n80.a
n79.out → n80.b
n67.out → n81.a
n80.out → n81.b
n78.out → n77.atom1
n81.out → n77.formula1
n82.out → n77.atom2
n10.out → n77.formula2
n76.out → n75.a
n77.out → n75.b
n46.out → n83.assertion
n84.out → n83.atom1
n10.out → n83.formula1
n85.out → n83.atom2
n67.out → n83.formula2
n86.out → n83.atom3
n80.out → n83.formula3
n75.out → n74.a
n83.out → n74.b
n64.out → n60.a
n74.out → n60.b
n46.out → n87.assertion
n88.out → n87.atom1
n10.out → n87.formula1
n89.out → n87.atom2
n22.out → n87.formula2
n90.out → n87.atom3
n79.out → n87.formula3
n60.out → n59.a
n87.out → n59.b
n4.out → n3.a
n59.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n91.proof
```

</details>

### *87 · 等词进入属于（全称）

- 目标：`⊢ ∀ y ∀ z ( y = z → ( x ∈ y → x ∈ z ) )`
- 提示：Leibniz 替换后全称推广。
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

### *88 · 等词进入属于（反向）

- 目标：`⊢ ∀ y ∀ z ( y = z → ( y ∈ x → z ∈ x ) )`
- 提示：Leibniz 替换。
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

### *89 · 外延（y,z）

- 目标：`⊢ ∀ y ∀ z ( ∀ x ( x ∈ y ↔ x ∈ z ) → y = z )`
- 提示：外延公理换变量。
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

### *90 · 配对（y,x）

- 目标：`⊢ ∀ y ∀ x ∃ u ∀ z ( ( z = y ∨ z = x ) ↔ z ∈ u )`
- 提示：配对公理换变量。
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

### *91 · 并集（y）

- 目标：`⊢ ∀ y ∃ u ∀ z ( ∃ v ( z ∈ v ∧ v ∈ y ) ↔ z ∈ u )`
- 提示：并集公理换变量。
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

### *92 · 属于替换的双向版

- 目标：`⊢ ∀ x ∀ y ∀ z ( x = y → ( x ∈ z ↔ y ∈ z ) )`
- 提示：同 *86，但替换作用在 ∈ 的左项；正向和反向各接一条 Leibniz 公理。
- 参考解：80 个模块 / 133 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n92  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  gen(v=z)
n4  mp
n5  mp
n6  定理 *01
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
n20  atom P
n21  pred =
n22  mem
n23  imp
n24  imp
n25  atom Q
n26  mp
n27  mp
n28  mp
n29  定理 *51
n30  subst(groups=1)
n31  atom P
n32  imp
n33  atom Q
n34  mp
n35  mp
n36  定理 *05
n37  subst(groups=2)
n38  atom P
n39  atom Q
n40  atom R
n41  subst(groups=1)
n42  atom P
n43  imp
n44  imp
n45  imp
n46  atom Q
n47  axiom A2
n48  subst(groups=2)
n49  atom P
n50  atom Q
n51  atom R
n52  subst(groups=2)
n53  atom P
n54  atom Q
n55  atom R
n56  subst(groups=2)
n57  atom P
n58  atom Q
n59  atom R
n60  mp
n61  mp
n65  leibniz(mode=replace, v=z)
n68  imp
n75  mp
n76  mp
n77  iff-intro-ax
n78  subst(groups=1)
n79  atom P
n80  iff
n81  imp
n82  imp
n83  atom Q
n84  subst(groups=2)
n85  atom P
n86  atom Q
n87  atom R
n88  subst(groups=2)
n89  atom P
n90  atom Q
n91  atom R

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
n10.out → n21.t1
n9.out → n21.t2
n9.out → n22.a
n16.out → n22.b
n17.out → n23.a
n22.out → n23.b
n21.out → n24.a
n23.out → n24.b
n20.out → n19.atom1
n24.out → n19.formula1
n25.out → n19.atom2
n11.out → n19.formula2
n15.out → n14.a
n19.out → n14.b
n18.out → n30.assertion
n11.out → n32.a
n21.out → n32.b
n31.out → n30.atom1
n32.out → n30.formula1
n33.out → n30.atom2
n11.out → n30.formula2
n29.out → n28.a
n30.out → n28.b
n36.out → n37.assertion
n38.out → n37.atom1
n11.out → n37.formula1
n39.out → n37.atom2
n21.out → n37.formula2
n40.out → n37.atom3
n23.out → n37.formula3
n18.out → n41.assertion
n11.out → n43.a
n23.out → n43.b
n24.out → n44.a
n43.out → n44.b
n32.out → n45.a
n44.out → n45.b
n42.out → n41.atom1
n45.out → n41.formula1
n46.out → n41.atom2
n11.out → n41.formula2
n37.out → n35.a
n41.out → n35.b
n47.out → n48.assertion
n49.out → n48.atom1
n11.out → n48.formula1
n50.out → n48.atom2
n32.out → n48.formula2
n51.out → n48.atom3
n44.out → n48.formula3
n35.out → n34.a
n48.out → n34.b
n28.out → n27.a
n34.out → n27.b
n47.out → n52.assertion
n53.out → n52.atom1
n11.out → n52.formula1
n54.out → n52.atom2
n24.out → n52.formula2
n55.out → n52.atom3
n43.out → n52.formula3
n27.out → n26.a
n52.out → n26.b
n14.out → n13.a
n26.out → n13.b
n47.out → n56.assertion
n57.out → n56.atom1
n11.out → n56.formula1
n58.out → n56.atom2
n11.out → n56.formula2
n59.out → n56.atom3
n23.out → n56.formula3
n13.out → n12.a
n56.out → n12.b
n7.out → n5.a
n12.out → n5.b
n9.out → n65.x
n10.out → n65.y
n22.out → n65.formula
n22.out → n68.a
n17.out → n68.b
n22.out → n77.a
n17.out → n77.b
n18.out → n78.assertion
n22.out → n80.a
n17.out → n80.b
n23.out → n81.a
n80.out → n81.b
n68.out → n82.a
n81.out → n82.b
n79.out → n78.atom1
n82.out → n78.formula1
n83.out → n78.atom2
n11.out → n78.formula2
n77.out → n76.a
n78.out → n76.b
n47.out → n84.assertion
n85.out → n84.atom1
n11.out → n84.formula1
n86.out → n84.atom2
n68.out → n84.formula2
n87.out → n84.atom3
n81.out → n84.formula3
n76.out → n75.a
n84.out → n75.b
n65.out → n61.a
n75.out → n61.b
n47.out → n88.assertion
n89.out → n88.atom1
n11.out → n88.formula1
n90.out → n88.atom2
n23.out → n88.formula2
n91.out → n88.atom3
n80.out → n88.formula3
n61.out → n60.a
n88.out → n60.b
n5.out → n4.a
n60.out → n4.b
n4.out → n3.assertion
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n92.proof
```

</details>

### *93 · 三层等词链（双向）

- 目标：`⊢ ∀ y ∀ z ∀ x ( y = z → ( x ∈ y ↔ x ∈ z ) )`
- 提示：反向需要 z=y：把 *56 连续例化两次；再用 Leibniz 两个方向、HS 与 ↔I，最后 DT 消去 y=z。
- 参考解：92 个模块 / 156 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n116  [target]
n1  gen(v=y)
n2  gen(v=z)
n3  gen(v=x)
n4  mp
n5  mp
n6  定理 *01
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
n20  atom P
n21  pred =
n22  mem
n23  imp
n24  imp
n25  atom Q
n26  mp
n27  mp
n28  mp
n29  mp
n30  mp
n31  eq-refl(t=y)
n32  subst(groups=1)
n33  atom P
n34  pred =
n35  atom Q
n36  mp
n40  leibniz(mode=abstract, v=z)
n46  axiom A2
n51  subst(groups=2)
n52  atom P
n53  atom Q
n54  atom R
n55  subst(groups=1)
n56  atom P
n57  imp
n58  atom Q
n59  mp
n60  mp
n61  定理 *05
n62  subst(groups=2)
n63  atom P
n64  atom Q
n65  atom R
n66  subst(groups=1)
n67  atom P
n68  imp
n69  imp
n70  imp
n71  atom Q
n72  subst(groups=2)
n73  atom P
n74  atom Q
n75  atom R
n76  subst(groups=2)
n77  atom P
n78  atom Q
n79  atom R
n80  subst(groups=2)
n81  atom P
n82  atom Q
n83  atom R
n84  mp
n85  mp
n89  leibniz(mode=replace, v=z)
n92  imp
n99  mp
n100  mp
n101  iff-intro-ax
n102  subst(groups=1)
n103  atom P
n104  iff
n105  imp
n106  imp
n107  atom Q
n108  subst(groups=2)
n109  atom P
n110  atom Q
n111  atom R
n112  subst(groups=2)
n113  atom P
n114  atom Q
n115  atom R

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
n10.out → n21.t1
n9.out → n21.t2
n16.out → n22.a
n9.out → n22.b
n17.out → n23.a
n22.out → n23.b
n21.out → n24.a
n23.out → n24.b
n20.out → n19.atom1
n24.out → n19.formula1
n25.out → n19.atom2
n11.out → n19.formula2
n15.out → n14.a
n19.out → n14.b
n18.out → n32.assertion
n9.out → n34.t1
n9.out → n34.t2
n33.out → n32.atom1
n34.out → n32.formula1
n35.out → n32.atom2
n11.out → n32.formula2
n31.out → n30.a
n32.out → n30.b
n9.out → n40.x
n10.out → n40.y
n21.out → n40.formula
n46.out → n51.assertion
n52.out → n51.atom1
n11.out → n51.formula1
n53.out → n51.atom2
n34.out → n51.formula2
n54.out → n51.atom3
n21.out → n51.formula3
n40.out → n36.a
n51.out → n36.b
n30.out → n29.a
n36.out → n29.b
n18.out → n55.assertion
n11.out → n57.a
n21.out → n57.b
n56.out → n55.atom1
n57.out → n55.formula1
n58.out → n55.atom2
n11.out → n55.formula2
n29.out → n28.a
n55.out → n28.b
n61.out → n62.assertion
n63.out → n62.atom1
n11.out → n62.formula1
n64.out → n62.atom2
n21.out → n62.formula2
n65.out → n62.atom3
n23.out → n62.formula3
n18.out → n66.assertion
n11.out → n68.a
n23.out → n68.b
n24.out → n69.a
n68.out → n69.b
n57.out → n70.a
n69.out → n70.b
n67.out → n66.atom1
n70.out → n66.formula1
n71.out → n66.atom2
n11.out → n66.formula2
n62.out → n60.a
n66.out → n60.b
n46.out → n72.assertion
n73.out → n72.atom1
n11.out → n72.formula1
n74.out → n72.atom2
n57.out → n72.formula2
n75.out → n72.atom3
n69.out → n72.formula3
n60.out → n59.a
n72.out → n59.b
n28.out → n27.a
n59.out → n27.b
n46.out → n76.assertion
n77.out → n76.atom1
n11.out → n76.formula1
n78.out → n76.atom2
n24.out → n76.formula2
n79.out → n76.atom3
n68.out → n76.formula3
n27.out → n26.a
n76.out → n26.b
n14.out → n13.a
n26.out → n13.b
n46.out → n80.assertion
n81.out → n80.atom1
n11.out → n80.formula1
n82.out → n80.atom2
n11.out → n80.formula2
n83.out → n80.atom3
n23.out → n80.formula3
n13.out → n12.a
n80.out → n12.b
n7.out → n5.a
n12.out → n5.b
n9.out → n89.x
n10.out → n89.y
n22.out → n89.formula
n22.out → n92.a
n17.out → n92.b
n22.out → n101.a
n17.out → n101.b
n18.out → n102.assertion
n22.out → n104.a
n17.out → n104.b
n23.out → n105.a
n104.out → n105.b
n92.out → n106.a
n105.out → n106.b
n103.out → n102.atom1
n106.out → n102.formula1
n107.out → n102.atom2
n11.out → n102.formula2
n101.out → n100.a
n102.out → n100.b
n46.out → n108.assertion
n109.out → n108.atom1
n11.out → n108.formula1
n110.out → n108.atom2
n92.out → n108.formula2
n111.out → n108.atom3
n105.out → n108.formula3
n100.out → n99.a
n108.out → n99.b
n89.out → n85.a
n99.out → n85.b
n46.out → n112.assertion
n113.out → n112.atom1
n11.out → n112.formula1
n114.out → n112.atom2
n23.out → n112.formula2
n115.out → n112.atom3
n104.out → n112.formula3
n85.out → n84.a
n112.out → n84.b
n5.out → n4.a
n84.out → n4.b
n4.out → n3.assertion
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n116.proof
```

</details>

### *94 · 配对集含左元

- 目标：`⊢ ∀ x ∀ y ∃ u x ∈ u`
- 提示：从配对公理取 u，全称例化到 x，用 x=x∨x=y 与 ↔E 得到 x∈u，再 ∃I/∃E 与全称推广。
- 参考解：71 个模块 / 117 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n86  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  exists-elim
n4  set-pair
n5  term x
n6  term y
n7  mp
n8  mp
n9  mp
n10  mp
n11  eq-refl(t=x)
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
n29  subst(groups=1)
n30  atom P
n31  or
n32  imp
n33  atom Q
n34  axiom A2
n35  subst(groups=2)
n36  atom P
n37  atom Q
n38  atom R
n39  mp
n40  mp
n47  all-inst(v=z)
n50  mem
n51  iff
n58  mp
n59  mp
n60  iff-elim-ax(dir=lr)
n61  subst(groups=1)
n62  atom P
n63  imp
n64  imp
n65  atom Q
n66  subst(groups=2)
n67  atom P
n68  atom Q
n69  atom R
n70  subst(groups=2)
n71  atom P
n72  atom Q
n73  atom R
n74  mp
n75  mp
n76  exists-gen(v=u)
n77  subst(groups=1)
n78  atom P
n79  exists(v=u)
n80  imp
n81  atom Q
n82  subst(groups=2)
n83  atom P
n84  atom Q
n85  atom R

接线：
n5.out → n4.u
n6.out → n4.v
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
n12.out → n29.assertion
n15.out → n31.a
n28.out → n31.b
n15.out → n32.a
n31.out → n32.b
n30.out → n29.atom1
n32.out → n29.formula1
n33.out → n29.atom2
n24.out → n29.formula2
n27.out → n26.a
n29.out → n26.b
n34.out → n35.assertion
n36.out → n35.atom1
n24.out → n35.formula1
n37.out → n35.atom2
n15.out → n35.formula2
n38.out → n35.atom3
n31.out → n35.formula3
n26.out → n25.a
n35.out → n25.b
n10.out → n9.a
n25.out → n9.b
n23.out → n47.formula
n5.out → n47.term
n5.out → n50.a
n21.out → n50.b
n31.out → n51.a
n50.out → n51.b
n31.out → n60.a
n50.out → n60.b
n12.out → n61.assertion
n31.out → n63.a
n50.out → n63.b
n51.out → n64.a
n63.out → n64.b
n62.out → n61.atom1
n64.out → n61.formula1
n65.out → n61.atom2
n24.out → n61.formula2
n60.out → n59.a
n61.out → n59.b
n34.out → n66.assertion
n67.out → n66.atom1
n24.out → n66.formula1
n68.out → n66.atom2
n51.out → n66.formula2
n69.out → n66.atom3
n63.out → n66.formula3
n59.out → n58.a
n66.out → n58.b
n47.out → n40.a
n58.out → n40.b
n34.out → n70.assertion
n71.out → n70.atom1
n24.out → n70.formula1
n72.out → n70.atom2
n31.out → n70.formula2
n73.out → n70.atom3
n50.out → n70.formula3
n40.out → n39.a
n70.out → n39.b
n9.out → n8.a
n39.out → n8.b
n50.out → n76.formula
n21.out → n76.term
n12.out → n77.assertion
n50.out → n79.a
n50.out → n80.a
n79.out → n80.b
n78.out → n77.atom1
n80.out → n77.formula1
n81.out → n77.atom2
n24.out → n77.formula2
n76.out → n75.a
n77.out → n75.b
n34.out → n82.assertion
n83.out → n82.atom1
n24.out → n82.formula1
n84.out → n82.atom2
n50.out → n82.formula2
n85.out → n82.atom3
n79.out → n82.formula3
n75.out → n74.a
n82.out → n74.b
n8.out → n7.a
n74.out → n7.b
n7.out → n3.implication
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n86.proof
```

</details>

### *95 · 配对集含右元

- 目标：`⊢ ∀ x ∀ y ∃ u y ∈ u`
- 提示：同左元，但用 y=y 从析取的右支进入。
- 参考解：71 个模块 / 117 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n86  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  exists-elim
n4  set-pair
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
n30  atom P
n31  or
n32  imp
n33  atom Q
n34  axiom A2
n35  subst(groups=2)
n36  atom P
n37  atom Q
n38  atom R
n39  mp
n40  mp
n47  all-inst(v=z)
n50  mem
n51  iff
n58  mp
n59  mp
n60  iff-elim-ax(dir=lr)
n61  subst(groups=1)
n62  atom P
n63  imp
n64  imp
n65  atom Q
n66  subst(groups=2)
n67  atom P
n68  atom Q
n69  atom R
n70  subst(groups=2)
n71  atom P
n72  atom Q
n73  atom R
n74  mp
n75  mp
n76  exists-gen(v=u)
n77  subst(groups=1)
n78  atom P
n79  exists(v=u)
n80  imp
n81  atom Q
n82  subst(groups=2)
n83  atom P
n84  atom Q
n85  atom R

接线：
n5.out → n4.u
n6.out → n4.v
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
n28.out → n31.a
n15.out → n31.b
n15.out → n32.a
n31.out → n32.b
n30.out → n29.atom1
n32.out → n29.formula1
n33.out → n29.atom2
n24.out → n29.formula2
n27.out → n26.a
n29.out → n26.b
n34.out → n35.assertion
n36.out → n35.atom1
n24.out → n35.formula1
n37.out → n35.atom2
n15.out → n35.formula2
n38.out → n35.atom3
n31.out → n35.formula3
n26.out → n25.a
n35.out → n25.b
n10.out → n9.a
n25.out → n9.b
n23.out → n47.formula
n6.out → n47.term
n6.out → n50.a
n21.out → n50.b
n31.out → n51.a
n50.out → n51.b
n31.out → n60.a
n50.out → n60.b
n12.out → n61.assertion
n31.out → n63.a
n50.out → n63.b
n51.out → n64.a
n63.out → n64.b
n62.out → n61.atom1
n64.out → n61.formula1
n65.out → n61.atom2
n24.out → n61.formula2
n60.out → n59.a
n61.out → n59.b
n34.out → n66.assertion
n67.out → n66.atom1
n24.out → n66.formula1
n68.out → n66.atom2
n51.out → n66.formula2
n69.out → n66.atom3
n63.out → n66.formula3
n59.out → n58.a
n66.out → n58.b
n47.out → n40.a
n58.out → n40.b
n34.out → n70.assertion
n71.out → n70.atom1
n24.out → n70.formula1
n72.out → n70.atom2
n31.out → n70.formula2
n73.out → n70.atom3
n50.out → n70.formula3
n40.out → n39.a
n70.out → n39.b
n9.out → n8.a
n39.out → n8.b
n50.out → n76.formula
n21.out → n76.term
n12.out → n77.assertion
n50.out → n79.a
n50.out → n80.a
n79.out → n80.b
n78.out → n77.atom1
n80.out → n77.formula1
n81.out → n77.atom2
n24.out → n77.formula2
n76.out → n75.a
n77.out → n75.b
n34.out → n82.assertion
n83.out → n82.atom1
n24.out → n82.formula1
n84.out → n82.atom2
n50.out → n82.formula2
n85.out → n82.atom3
n79.out → n82.formula3
n75.out → n74.a
n82.out → n74.b
n8.out → n7.a
n74.out → n7.b
n7.out → n3.implication
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n86.proof
```

</details>

### *96 · 综合：配对给出公共容器

- 目标：`⊢ ∀ x ∀ y ∃ u ( x ∈ u ∧ y ∈ u )`
- 提示：在同一个配对集 u 上分别取 x∈u、y∈u，用 ∧I 合并，再用 ∃I 收束；两次存在消去。
- 参考解：133 个模块 / 230 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n159  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  exists-elim
n4  set-pair
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
n31  atom P
n32  or
n33  imp
n34  atom Q
n35  axiom A2
n36  subst(groups=2)
n37  atom P
n38  atom Q
n39  atom R
n40  mp
n41  mp
n48  all-inst(v=z)
n51  mem
n52  iff
n59  mp
n60  mp
n61  iff-elim-ax(dir=lr)
n62  subst(groups=1)
n63  atom P
n64  imp
n65  imp
n66  atom Q
n67  subst(groups=2)
n68  atom P
n69  atom Q
n70  atom R
n71  subst(groups=2)
n72  atom P
n73  atom Q
n74  atom R
n75  mp
n76  mp
n77  mp
n78  mp
n79  mp
n80  eq-refl(t=x)
n81  subst(groups=1)
n82  atom P
n83  pred =
n84  atom Q
n85  mp
n86  mp
n87  or-intro-ax(side=l)
n88  pred =
n89  subst(groups=1)
n90  atom P
n91  or
n92  imp
n93  atom Q
n94  subst(groups=2)
n95  atom P
n96  atom Q
n97  atom R
n98  mp
n99  mp
n103  all-inst(v=z)
n106  mem
n107  iff
n114  mp
n115  mp
n116  iff-elim-ax(dir=lr)
n117  subst(groups=1)
n118  atom P
n119  imp
n120  imp
n121  atom Q
n122  subst(groups=2)
n123  atom P
n124  atom Q
n125  atom R
n126  subst(groups=2)
n127  atom P
n128  atom Q
n129  atom R
n130  mp
n131  mp
n132  and-intro-ax
n133  subst(groups=1)
n134  atom P
n135  and
n136  imp
n137  imp
n138  atom Q
n139  subst(groups=2)
n140  atom P
n141  atom Q
n142  atom R
n143  subst(groups=2)
n144  atom P
n145  atom Q
n146  atom R
n147  mp
n148  mp
n149  exists-gen(v=u)
n150  subst(groups=1)
n151  atom P
n152  exists(v=u)
n153  imp
n154  atom Q
n155  subst(groups=2)
n156  atom P
n157  atom Q
n158  atom R

接线：
n5.out → n4.u
n6.out → n4.v
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
n29.out → n32.a
n16.out → n32.b
n16.out → n33.a
n32.out → n33.b
n31.out → n30.atom1
n33.out → n30.formula1
n34.out → n30.atom2
n25.out → n30.formula2
n28.out → n27.a
n30.out → n27.b
n35.out → n36.assertion
n37.out → n36.atom1
n25.out → n36.formula1
n38.out → n36.atom2
n16.out → n36.formula2
n39.out → n36.atom3
n32.out → n36.formula3
n27.out → n26.a
n36.out → n26.b
n11.out → n10.a
n26.out → n10.b
n24.out → n48.formula
n6.out → n48.term
n6.out → n51.a
n22.out → n51.b
n32.out → n52.a
n51.out → n52.b
n32.out → n61.a
n51.out → n61.b
n13.out → n62.assertion
n32.out → n64.a
n51.out → n64.b
n52.out → n65.a
n64.out → n65.b
n63.out → n62.atom1
n65.out → n62.formula1
n66.out → n62.atom2
n25.out → n62.formula2
n61.out → n60.a
n62.out → n60.b
n35.out → n67.assertion
n68.out → n67.atom1
n25.out → n67.formula1
n69.out → n67.atom2
n52.out → n67.formula2
n70.out → n67.atom3
n64.out → n67.formula3
n60.out → n59.a
n67.out → n59.b
n48.out → n41.a
n59.out → n41.b
n35.out → n71.assertion
n72.out → n71.atom1
n25.out → n71.formula1
n73.out → n71.atom2
n32.out → n71.formula2
n74.out → n71.atom3
n51.out → n71.formula3
n41.out → n40.a
n71.out → n40.b
n10.out → n9.a
n40.out → n9.b
n13.out → n81.assertion
n5.out → n83.t1
n5.out → n83.t2
n82.out → n81.atom1
n83.out → n81.formula1
n84.out → n81.atom2
n25.out → n81.formula2
n80.out → n79.a
n81.out → n79.b
n83.out → n87.a
n5.out → n88.t1
n6.out → n88.t2
n88.out → n87.b
n13.out → n89.assertion
n83.out → n91.a
n88.out → n91.b
n83.out → n92.a
n91.out → n92.b
n90.out → n89.atom1
n92.out → n89.formula1
n93.out → n89.atom2
n25.out → n89.formula2
n87.out → n86.a
n89.out → n86.b
n35.out → n94.assertion
n95.out → n94.atom1
n25.out → n94.formula1
n96.out → n94.atom2
n83.out → n94.formula2
n97.out → n94.atom3
n91.out → n94.formula3
n86.out → n85.a
n94.out → n85.b
n79.out → n78.a
n85.out → n78.b
n24.out → n103.formula
n5.out → n103.term
n5.out → n106.a
n22.out → n106.b
n91.out → n107.a
n106.out → n107.b
n91.out → n116.a
n106.out → n116.b
n13.out → n117.assertion
n91.out → n119.a
n106.out → n119.b
n107.out → n120.a
n119.out → n120.b
n118.out → n117.atom1
n120.out → n117.formula1
n121.out → n117.atom2
n25.out → n117.formula2
n116.out → n115.a
n117.out → n115.b
n35.out → n122.assertion
n123.out → n122.atom1
n25.out → n122.formula1
n124.out → n122.atom2
n107.out → n122.formula2
n125.out → n122.atom3
n119.out → n122.formula3
n115.out → n114.a
n122.out → n114.b
n103.out → n99.a
n114.out → n99.b
n35.out → n126.assertion
n127.out → n126.atom1
n25.out → n126.formula1
n128.out → n126.atom2
n91.out → n126.formula2
n129.out → n126.atom3
n106.out → n126.formula3
n99.out → n98.a
n126.out → n98.b
n78.out → n77.a
n98.out → n77.b
n106.out → n132.a
n51.out → n132.b
n13.out → n133.assertion
n106.out → n135.a
n51.out → n135.b
n51.out → n136.a
n135.out → n136.b
n106.out → n137.a
n136.out → n137.b
n134.out → n133.atom1
n137.out → n133.formula1
n138.out → n133.atom2
n25.out → n133.formula2
n132.out → n131.a
n133.out → n131.b
n35.out → n139.assertion
n140.out → n139.atom1
n25.out → n139.formula1
n141.out → n139.atom2
n106.out → n139.formula2
n142.out → n139.atom3
n136.out → n139.formula3
n131.out → n130.a
n139.out → n130.b
n77.out → n76.a
n130.out → n76.b
n35.out → n143.assertion
n144.out → n143.atom1
n25.out → n143.formula1
n145.out → n143.atom2
n51.out → n143.formula2
n146.out → n143.atom3
n135.out → n143.formula3
n76.out → n75.a
n143.out → n75.b
n9.out → n8.a
n75.out → n8.b
n135.out → n149.formula
n22.out → n149.term
n13.out → n150.assertion
n135.out → n152.a
n135.out → n153.a
n152.out → n153.b
n151.out → n150.atom1
n153.out → n150.formula1
n154.out → n150.atom2
n25.out → n150.formula2
n149.out → n148.a
n150.out → n148.b
n35.out → n155.assertion
n156.out → n155.atom1
n25.out → n155.formula1
n157.out → n155.atom2
n135.out → n155.formula2
n158.out → n155.atom3
n152.out → n155.formula3
n148.out → n147.a
n155.out → n147.b
n8.out → n7.a
n147.out → n7.b
n7.out → n3.implication
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n159.proof
```

</details>
