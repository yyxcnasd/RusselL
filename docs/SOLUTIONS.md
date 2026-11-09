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
| Ⅰ | v | 分离 | `⊢ ( ( P → Q ) → ( P → P ) )` | M · A · A→B ⇒ B | 12 / 15 |
| Ⅰ | `*01` | 同一律 | `⊢ ( P → P )` | 两条 A1 和一条 A2，用两次分离。 | 17 / 24 |
| Ⅰ | `*02` | 后件自反 | `⊢ ( P → ( Q → Q ) )` | 先得 B→B，再用 A1 把 A 加回前件。 | 11 / 13 |
| Ⅰ | `*03` | 回指前件 | `⊢ ( P → ( ( P → Q ) → Q ) )` | 把 (A→B) 当前件，构造 A→((A→B)→B)。 | 47 / 67 |
| Ⅰ | `*04` | 后件强化 | `⊢ ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) )` | 先用 A1 把 A→B 嵌进 C 的前件。 | 46 / 66 |
| Ⅰ | `*05` | 前件弱化 | `⊢ ( ( P → Q ) → ( ( Q → R ) → ( P → R ) ) )` | 把 A→B 与 B→C 接起来。 | 127 / 189 |
| Ⅰ | `*06` | 否定的蕴涵 | `⊢ ( ¬ ( P → Q ) → ( P → ¬ Q ) )` | 从否定蕴涵出发，用反证与双重否定。 | 541 / 794 |
| Ⅰ | `*07` | 否定的前件 | `⊢ ( ¬ ( P → Q ) → ( ¬ P → ¬ Q ) )` | 与上一关对称，用 A3 与双重否定。 | 542 / 795 |
| Ⅰ | `*08` | 前件重排 | `⊢ ( ( P → ( Q → R ) ) → ( Q → ( P → R ) ) )` | 用 A2 把前件换位，再接 A1。 | 97 / 144 |
| Ⅰ | `*09` | 逆否命题 | `⊢ ( ( P → Q ) → ( ¬ Q → ¬ P ) )` | A3 给出 (¬B→¬A)→(A→B)，再用前件重排。 | 534 / 783 |
| Ⅰ | `*10` | 逆否（否定后件） | `⊢ ( ( P → ¬ Q ) → ( Q → ¬ P ) )` | 把 B→¬A 写成 B→(A→¬A) 的形状，用 A3。 | 249 / 364 |
| Ⅰ | `*11` | 逆否（否定前件） | `⊢ ( ( ¬ P → Q ) → ( ¬ Q → P ) )` | A3 的变体：把 ¬B 当前件。 | 311 / 454 |
| Ⅰ | `*12` | 双重否定引入 | `⊢ ( P → ¬ ¬ P )` | 用 A3 的逆否方向：¬A→¬A 得到 A→¬¬A。 | 262 / 383 |
| Ⅰ | `*13` | 双重否定消去 | `⊢ ( ¬ ¬ P → P )` | 先证 ¬¬A→(¬A→¬¬A)，再用反证法。 | 146 / 212 |
| Ⅰ | `*14` | 矛盾推出一切 | `⊢ ( ¬ P → ( P → Q ) )` | 用 A1 造出 A→(¬B→A)，再用 A3。 | 43 / 60 |
| Ⅰ | `*15` | 合取前件合并 | `⊢ ( ( P → ( Q → R ) ) → ( ( P ∧ Q ) → R ) )` | 把合取拆成两个前件再用 A2 合并（演绎定理自动处理假设）。 | 200 / 299 |
| Ⅰ | `*16` | 分情况 | `⊢ ( ( ¬ P → Q ) → ( ( P → Q ) → Q ) )` | 分别从 ¬A 和 A 推出 B，再用 A3 合并。 | 298 / 439 |
| Ⅰ | `*17` | 蕴涵合成 | `⊢ ( ( P → Q ) → ( ( R → S ) → ( ( Q → R ) → ( P → S ) ) ) )` | 两次前件/后件组合。 | 146 / 219 |
| Ⅰ | `*18` | 替换前件（左） | `⊢ ( ( ( P → Q ) → R ) → ( Q → R ) )` | 从 B 出发先用 A1 得到 A→B。 | 103 / 150 |
| Ⅰ | `*19` | 替换前件（右） | `⊢ ( ( ( P → Q ) → R ) → ( ¬ P → R ) )` | 从 A 出发先用 A1 得到 A→B。 | 104 / 151 |
| Ⅰ | `*20` | 合取前件拆分 | `⊢ ( ( ( P ∧ Q ) → R ) → ( P → ( Q → R ) ) )` | 把合取前件拆成两层前件（演绎定理自动处理假设）。 | 508 / 768 |
| Ⅰ | `*21` | 预线性 | `⊢ ( ( ( P → Q ) → ( P → R ) ) → ( P → ( Q → R ) ) )` | 用 A2 与交换。 | 181 / 270 |
| Ⅰ | `*22` | 反证法 | `⊢ ( ( ¬ P → P ) → P )` | 用 A3 把 ¬A→A 翻成 ¬A→¬¬A，再配合双重否定。 | 59 / 85 |
| Ⅰ | `*23` | 简化蕴涵 | `⊢ ( ¬ ( P → ¬ Q ) → Q )` | 把 ¬B 当前件，用 A3 得到逆否。 | 299 / 437 |
| Ⅰ | `*24` | 皮尔士律 | `⊢ ( ( ( P → Q ) → P ) → P )` | 假设 (A→B)→A，再分 A 与 ¬A 两种情况。 | 299 / 439 |
| Ⅱ | i | 全称引入 | `⊢ ( P → ∀ x P )` | ∀* · A ⇒ A → ∀x A | 2 / 2 |
| Ⅱ | ii | 全称例化 | `⊢ ( ∀ x P → P )` | ∀E* · ∀x A ⇒ A[t/x] | 3 / 3 |
| Ⅱ | iii | 全称推广 | `⊢ ∀ x ( P → ( Q → P ) )` | ∀I · A ⇒ ∀x A | 2 / 2 |
| Ⅱ | iv | 存在推广 | `⊢ ( P → ∃ x P )` | ∃I* · A[t/x] ⇒ ∃x A | 3 / 3 |
| Ⅱ | v | 全称分配公理 | `⊢ ( ∀ x ( P → Q ) → ( ∀ x P → ∀ x Q ) )` | A5 · ∀x(P→Q) ⇒ ∀xP → ∀xQ | 1 / 1 |
| Ⅱ | `*25` | 前件提取 | `⊢ ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → G ( x ) ) )` | 把 P 从全称前件里提出/收回。 | 19 / 25 |
| Ⅱ | `*26` | 全称弱化 | `⊢ ( ∀ x F ( x ) → ∀ x ( G ( x ) → F ( x ) ) )` | 在 ∀ 下用 A1，再分配。 | 14 / 18 |
| Ⅱ | `*27` | 嵌套全称引入 | `⊢ ( F ( x ) → ( G ( y ) → ∀ x G ( y ) ) )` | A1 与全称引入。 | 12 / 14 |
| Ⅱ | `*28` | 双重量词消去 | `⊢ ( ∀ x ∀ y F ( x ) → F ( x ) )` | 两次全称例化。 | 23 / 30 |
| Ⅱ | `*29` | 三段全称分配 | `⊢ ( ∀ x ( F ( x ) → ( G ( x ) → H ( x ) ) ) → ( ∀ x F ( x ) → ( ∀ x G ( x ) → ∀ x H ( x ) ) ) )` | 连续两次全称分配。 | 47 / 67 |
| Ⅱ | `*30` | 混合三段论 | `⊢ ( ( F ( x ) → ∀ x ( G ( x ) → H ( x ) ) ) → ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )` | 分配后接三段论。 | 48 / 71 |
| Ⅱ | `*31` | 全称三段论 | `⊢ ( ∀ x ( G ( x ) → H ( x ) ) → ( ( F ( x ) → ∀ x G ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )` | 分配 + HS。 | 52 / 76 |
| Ⅱ | `*32` | 双层分配 | `⊢ ( ∀ x ∀ y ( F ( x ) → G ( x ) ) → ( ∀ x ∀ y F ( x ) → ∀ x ∀ y G ( x ) ) )` | 两次 A5。 | 56 / 79 |
| Ⅱ | `*33` | 二次回指 | `⊢ ( F ( x ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) )` | A1 连续两次代入。 | 56 / 81 |
| Ⅱ | `*34` | 四段分配 | `⊢ ( ∀ x ( F ( x ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) ) → ( ∀ x F ( x ) → ( ∀ x G ( x ) → ( ∀ x H ( x ) → ∀ x F ( x ) ) ) ) )` | 连续三次分配。 | 80 / 117 |
| Ⅱ | `*35` | 双重量词引入 | `⊢ ( F ( z ) → ∀ x ∀ y F ( z ) )` | 两次全称引入。 | 61 / 86 |
| Ⅱ | `*36` | 辖域移动（变体二） | `⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )` | 同 *38。 | 105 / 153 |
| Ⅱ | `*37` | 全称后件组合 | `⊢ ( ( F ( x ) → ∀ x G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )` | 先分配，再三段论。 | 106 / 157 |
| Ⅱ | `*38` | 辖域移动 | `⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )` | 用全称引入与分配。 | 105 / 153 |
| Ⅱ | `*39` | 全称替换前件 | `⊢ ( ( F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → G ( x ) ) )` | 先全称例化，再三段论。 | 127 / 187 |
| Ⅱ | `*40` | 全称合并 | `⊢ ( ( ∀ x F ( x ) → ∀ x ∀ x F ( x ) ) → ( ( ∀ x ( ∀ x F ( x ) → G ( x ) ) → ( ∀ x ∀ x F ( x ) → ∀ x G ( x ) ) ) → ( ∀ x ( ∀ x F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → ∀ x G ( x ) ) ) ) )` | 分配、引入、再分配。 | 246 / 368 |
| Ⅱ | `*41` | 全称三段论链 | `⊢ ( ∀ x ( F ( x ) → G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ∀ x ( F ( x ) → H ( x ) ) ) )` | 两次分配后接命题三段论。 | 247 / 367 |
| Ⅱ | `*42` | 辖域移动（H/G） | `⊢ ( ∀ x ( H ( y ) → F ( x ) ) → ( H ( y ) → ∀ x F ( x ) ) )` | 同 *39，换谓词。 | 105 / 153 |
| Ⅱ | `*43` | 全称三段论（换序） | `⊢ ( ∀ x ( F ( x ) → G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ∀ x ( F ( x ) → H ( x ) ) ) )` | 同 *42，换谓词顺序。 | 247 / 367 |
| Ⅱ | `*44` | 辖域移动（变体三） | `⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )` | 同 *38。 | 105 / 153 |
| Ⅱ | `*45` | 全称三段论（H/F） | `⊢ ( ∀ x ( F ( x ) → H ( x ) ) → ( ( G ( x ) → ∀ x F ( x ) ) → ( G ( x ) → ∀ x H ( x ) ) ) )` | 同 *32，换谓词。 | 52 / 76 |
| Ⅱ | `*46` | 全称合并（换序） | `⊢ ( ( ∀ x G ( x ) → ∀ x ∀ x G ( x ) ) → ( ( ∀ x ( ∀ x G ( x ) → F ( x ) ) → ( ∀ x ∀ x G ( x ) → ∀ x F ( x ) ) ) → ( ∀ x ( ∀ x G ( x ) → F ( x ) ) → ( ∀ x G ( x ) → ∀ x F ( x ) ) ) ) )` | 同 *41，换谓词。 | 246 / 368 |
| Ⅱ | `*47` | 全称替换前件（G） | `⊢ ( ( G ( x ) → F ( x ) ) → ( ∀ x G ( x ) → F ( x ) ) )` | 同 *40，换谓词。 | 127 / 187 |
| Ⅱ | `*48` | 辖域移动（F/G 变体） | `⊢ ( ∀ x ( F ( z ) → G ( y ) ) → ( F ( z ) → ∀ x G ( y ) ) )` | 同 *39，换变元位置。 | 105 / 153 |
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
| Ⅲ | `*56` | 对称的双向结论 | `⊢ ∀ x ∀ y ( x = y → ( x = y ∧ y = x ) )` | 用 *51 得到 y=x，再与假设本身用 ∧I* 合并；DT 消去假设后全称推广。 | 49 / 70 |
| Ⅲ | `*57` | 复合替换 | `⊢ ( x = y → ( ( F ( x ) → G ( x ) ) → ( F ( y ) → G ( y ) ) ) )` | 把整个蕴涵式作为抽象公式。 | 7 / 8 |
| Ⅲ | `*58` | 否定替换 | `⊢ ( x = y → ( ¬ F ( x ) → ¬ F ( y ) ) )` | 先用 *54 得到 F(y)→F(x)，再套逆否定理 *9 得到 ¬F(x)→¬F(y)，最后用 HS 串起 x=y。 | 21 / 27 |
| Ⅲ | `*59` | 条件替换 | `⊢ ( x = y → ( ( x = x → F ( x ) ) → ( y = y → F ( y ) ) ) )` | 假设 x=y 与 x=x→F(x)：由等词自反得 x=x，配合 *53 得 F(y)，再用 A1 补出 y=y→F(y)；两次 DT。 | 225 / 336 |
| Ⅲ | `*60` | 不含 x 的公式 | `⊢ ( x = y → ( ∀ z z = z → ∀ z z = z ) )` | 先取 B→B（同一律实例），再用 A1 把 x=y 插到前面。 | 15 / 18 |
| Ⅲ | `*61` | 谓词替换（双向） | `⊢ ∀ x ∀ y ( x = y → ( F ( x ) ↔ F ( y ) ) )` | *53 给正向、*54 给反向，用 ↔I 合成，DT 消去 x=y 后全称推广。 | 66 / 94 |
| Ⅲ | `*62` | 否定复合替换 | `⊢ ( x = y → ( ¬ ( F ( x ) → G ( x ) ) → ¬ ( F ( y ) → G ( y ) ) ) )` | 把整个否定蕴涵作为抽象公式。 | 8 / 9 |
| Ⅲ | `*63` | 自反条件替换 | `⊢ ( x = y → ( ( F ( x ) → F ( x ) ) → ( F ( y ) → F ( y ) ) ) )` | 由同一律得 F(y)→F(y)，A1 插入 x=y 与 F(x)→F(x)，再用前件重排 *8。 | 27 / 37 |
| Ⅲ | `*64` | 全称辖域（定理） | `⊢ ( ∀ z ( P → Q ) → ( P → ∀ z Q ) )` | 先引用 *66 这条已证定理，再用分离。 | 167 / 247 |
| Ⅲ | `*65` | 等词的双向同余 | `⊢ ( x = y → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) )` | 正向用替换，反向先对称再替换；各自推广并移动 ∀，最后合取。 | 50 / 76 |
| Ⅲ | `*66` | 等词给出元素等价 | `⊢ ( x = y → ∀ z ( z ∈ x ↔ z ∈ y ) )` | 先引用 *65 得到两个方向的 ∀ 蕴含，逐个元素用 ↔E 拆、↔I 合，再全称推广；假设用 DT 消去。 | 129 / 192 |
| Ⅲ | `*67` | 传递后的谓词替换 | `⊢ ∀ x ∀ y ∀ z ( x = y → ( y = z → ( F ( x ) → F ( z ) ) ) )` | 先用 *52 得到 x=z，再用 Leibniz 把 F(x) 换成 F(z)；两次 DT 后全称推广。 | 173 / 257 |
| Ⅲ | `*68` | 复合替换（双向） | `⊢ ∀ x ∀ y ( x = y → ( ( F ( x ) → G ( x ) ) ↔ ( F ( y ) → G ( y ) ) ) )` | 正向引用 *57；反向先用 *51 得到 y=x，再 Leibniz 反向替换；↔I 后 DT。 | 105 / 156 |
| Ⅲ | `*69` | 全称等词替换 | `⊢ ( x = y → ( ∀ z z = x → ∀ z z = y ) )` | 从 ∀z z=x 全称例化到 z，用 Leibniz 换成 z=y，再全称推广；假设用 DT 分两层消去。 | 194 / 290 |
| Ⅲ | `*70` | 全称等词替换（反向） | `⊢ ( x = y → ( ∀ z z = y → ∀ z z = x ) )` | 先对称，再用替换与三段论。 | 19 / 27 |
| Ⅲ | `*71` | 嵌套全称替换 | `⊢ ( x = y → ( ∀ z x = z → ∀ z y = z ) )` | 同 *69，但 Leibniz 作用在 x=z 的左侧。 | 194 / 290 |
| Ⅲ | `*72` | 深层替换（双向） | `⊢ ( x = y → ( ( F ( x ) → ( G ( x ) → F ( x ) ) ) ↔ ( F ( y ) → ( G ( y ) → F ( y ) ) ) ) )` | 正向 Leibniz 直接替换；反向先对称再 Leibniz；↔I 后 DT。 | 105 / 161 |
| Ⅳ | i | 外延公理 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → x = y )` | EXT · ∀z(z∈x↔z∈y) ⇒ x=y | 3 / 3 |
| Ⅳ | ii | 空集公理 | `⊢ ∃ z ∀ x ¬ x ∈ z` | ∅ · ∃z∀x ¬(x∈z) | 1 / 1 |
| Ⅳ | iii | 配对公理 | `⊢ ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )` | {,} · ∃u∀z((z=x∨z=y) ↔ z∈u) | 3 / 3 |
| Ⅳ | iv | 并集公理 | `⊢ ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )` | ∪ · ∃y∀z((∃u(z∈u∧u∈x)) ↔ z∈y) | 2 / 2 |
| Ⅳ | `*73` | 元素等价的对称性 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ∀ z ( z ∈ y ↔ z ∈ x ) )` | 全称例化到 z，用 ↔E/↔I 做对称，再用全辖域公理移到外层。 | 50 / 78 |
| Ⅳ | `*74` | 元素等价的两个方向 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) )` | 分别用 ↔E 取两个方向，各自推广并移动 ∀，最后用 ∧I 与 A2 合并。 | 58 / 88 |
| Ⅳ | `*75` | 元素等价的三重结论 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) ∧ ∀ z ( z ∈ y ↔ z ∈ x ) ) )` | 分别引用 *74 与 *73，再用 ∧I 与 A2 合并两个后件。 | 33 / 47 |
| Ⅳ | `*76` | 元素等价的逐点传递 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ u ) → ( z ∈ x ↔ z ∈ u ) ) )` | 假设两个全称等价，逐点取出两个方向，用 HS 串起来再重建 ↔。 | 726 / 1101 |
| Ⅳ | `*77` | 元素等价的全称传递 | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ u ) → ∀ z ( z ∈ x ↔ z ∈ u ) ) )` | 先逐点传递，再全称推广；两次假设用 DT 消去。 | 752 / 1138 |
| Ⅳ | `*78` | 属于替换（反向） | `⊢ ∀ x ∀ y ( x = y → ( y ∈ x → y ∈ y ) )` | Leibniz 替换。 | 6 / 8 |
| Ⅳ | `*79` | 空集 | `⊢ ∃ z ∀ x ¬ x ∈ z` | 直接使用空集公理。 | 1 / 1 |
| Ⅳ | `*80` | 外延公理（全称） | `⊢ ∀ x ∀ y ( ∀ z ( z ∈ x ↔ z ∈ y ) → x = y )` | 外延公理 + 全称推广。 | 5 / 5 |
| Ⅳ | `*81` | 外延的等价刻画 | `⊢ ∀ x ∀ y ( x = y ↔ ∀ z ( z ∈ x ↔ z ∈ y ) )` | 正向引用 *66；反向直接接外延公理；再用 ↔I 合成等价并全称推广。 | 15 / 20 |
| Ⅳ | `*82` | 配对公理（全称） | `⊢ ∀ x ∀ y ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )` | 配对公理 + 全称推广。 | 5 / 5 |
| Ⅳ | `*83` | 配对公理（实例） | `⊢ ∃ u ∀ z ( ( z = x ∨ z = y ) ↔ z ∈ u )` | 直接使用配对公理。 | 3 / 3 |
| Ⅳ | `*84` | 并集公理（全称） | `⊢ ∀ x ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )` | 并集公理 + 全称推广。 | 3 / 3 |
| Ⅳ | `*85` | 并集公理（实例） | `⊢ ∃ y ∀ z ( ∃ u ( z ∈ u ∧ u ∈ x ) ↔ z ∈ y )` | 直接使用并集公理。 | 2 / 2 |
| Ⅳ | `*86` | 等词的双向同余 | `⊢ ∀ x ∀ y ( x = y → ( x = z ↔ y = z ) )` | 正向用 Leibniz(x→y)，反向先用对称性得到 y=x 再用 Leibniz(y→x)；↔I 合成后 DT 消去假设。 | 102 / 155 |
| Ⅳ | `*87` | 等词进入属于（全称） | `⊢ ∀ y ∀ z ( y = z → ( x ∈ y → x ∈ z ) )` | Leibniz 替换后全称推广。 | 7 / 8 |
| Ⅳ | `*88` | 等词进入属于（反向） | `⊢ ∀ y ∀ z ( y = z → ( y ∈ x → z ∈ x ) )` | Leibniz 替换。 | 7 / 8 |
| Ⅳ | `*89` | 外延（y,z） | `⊢ ∀ y ∀ z ( ∀ x ( x ∈ y ↔ x ∈ z ) → y = z )` | 外延公理换变量。 | 5 / 5 |
| Ⅳ | `*90` | 配对（y,x） | `⊢ ∀ y ∀ x ∃ u ∀ z ( ( z = y ∨ z = x ) ↔ z ∈ u )` | 配对公理换变量。 | 5 / 5 |
| Ⅳ | `*91` | 并集（y） | `⊢ ∀ y ∃ u ∀ z ( ∃ v ( z ∈ v ∧ v ∈ y ) ↔ z ∈ u )` | 并集公理换变量。 | 3 / 3 |
| Ⅳ | `*92` | 属于替换的双向版 | `⊢ ∀ x ∀ y ∀ z ( x = y → ( x ∈ z ↔ y ∈ z ) )` | 同 *86，但替换作用在 ∈ 的左项；正向和反向各接一条 Leibniz 公理。 | 103 / 156 |
| Ⅳ | `*93` | 三层等词链（双向） | `⊢ ∀ y ∀ z ∀ x ( y = z → ( x ∈ y ↔ x ∈ z ) )` | 反向需要 z=y：把 *56 连续例化两次；再用 Leibniz 两个方向、HS 与 ↔I，最后 DT 消去 y=z。 | 134 / 204 |
| Ⅳ | `*94` | 配对集含左元 | `⊢ ∀ x ∀ y ∃ u x ∈ u` | 从配对公理取 u，全称例化到 x，用 x=x∨x=y 与 ↔E 得到 x∈u，再 ∃I/∃E 与全称推广。 | 93 / 140 |
| Ⅳ | `*95` | 配对集含右元 | `⊢ ∀ x ∀ y ∃ u y ∈ u` | 同左元，但用 y=y 从析取的右支进入。 | 93 / 140 |
| Ⅳ | `*96` | 综合：配对给出公共容器 | `⊢ ∀ x ∀ y ∃ u ( x ∈ u ∧ y ∈ u )` | 在同一个配对集 u 上分别取 x∈u、y∈u，用 ∧I 合并，再用 ∃I 收束；两次存在消去。 | 180 / 276 |

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
n1  subst
n2  axiom A1
n3  atom P
n4  atom Q
n5  atom Q
n6  atom R

接线：
n2.out → n1.assertion
n3.out → n1.atom1
n4.out → n1.formula1
n5.out → n1.atom2
n6.out → n1.formula2
n1.out → n7.proof
```

</details>

### v · 分离

- 目标：`⊢ ( ( P → Q ) → ( P → P ) )`
- 提示：M · A · A→B ⇒ B
- 参考解：12 个模块 / 15 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n13  [target]
n1  mp
n2  subst
n3  axiom A1
n4  atom P
n5  atom P
n6  atom Q
n7  atom Q
n8  subst
n9  axiom A2
n10  atom P
n11  atom Q
n12  atom R

接线：
n3.out → n2.assertion
n4.out → n2.atom1
n5.out → n2.formula1
n6.out → n2.atom2
n7.out → n2.formula2
n9.out → n8.assertion
n10.out → n8.atom1
n5.out → n8.formula1
n11.out → n8.atom2
n7.out → n8.formula2
n12.out → n8.atom3
n5.out → n8.formula3
n2.out → n1.a
n8.out → n1.b
n1.out → n13.proof
```

</details>

### *01 · 同一律

- 目标：`⊢ ( P → P )`
- 提示：两条 A1 和一条 A2，用两次分离。
- 参考解：17 个模块 / 24 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n18  [target]
n1  mp
n2  axiom A1
n3  subst
n4  atom P
n5  atom P
n6  atom Q
n7  mp
n8  axiom A1
n9  subst
n10  atom P
n11  atom Q
n12  imp
n13  axiom A2
n14  subst
n15  atom P
n16  atom Q
n17  atom R

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n3.formula1
n6.out → n3.atom2
n5.out → n3.formula2
n8.out → n9.assertion
n10.out → n9.atom1
n5.out → n9.formula1
n5.out → n12.a
n5.out → n12.b
n11.out → n9.atom2
n12.out → n9.formula2
n13.out → n14.assertion
n15.out → n14.atom1
n5.out → n14.formula1
n16.out → n14.atom2
n12.out → n14.formula2
n17.out → n14.atom3
n5.out → n14.formula3
n9.out → n7.a
n14.out → n7.b
n3.out → n1.a
n7.out → n1.b
n1.out → n18.proof
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
n3  subst
n4  atom P
n5  atom Q
n6  axiom A1
n7  subst
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
- 参考解：47 个模块 / 67 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n48  [target]
n1  mp
n2  mp
n3  定理 *01
n4  subst
n5  atom P
n6  atom P
n7  mp
n8  mp
n9  axiom A1
n10  subst
n11  atom P
n12  atom Q
n13  atom Q
n14  imp
n15  axiom A1
n16  subst
n17  atom P
n18  imp
n19  imp
n20  atom Q
n21  axiom A2
n22  subst
n23  atom P
n24  atom Q
n25  atom R
n26  mp
n27  mp
n28  mp
n29  定理 *01
n30  subst
n31  atom P
n32  axiom A2
n33  subst
n34  atom P
n35  atom Q
n36  atom R
n37  axiom A1
n38  subst
n39  atom P
n40  imp
n41  imp
n42  atom Q
n43  axiom A2
n44  subst
n45  atom P
n46  atom Q
n47  atom R

接线：
n3.out → n4.assertion
n5.out → n4.atom1
n6.out → n4.formula1
n9.out → n10.assertion
n11.out → n10.atom1
n6.out → n10.formula1
n6.out → n14.a
n13.out → n14.b
n12.out → n10.atom2
n14.out → n10.formula2
n15.out → n16.assertion
n14.out → n18.a
n6.out → n18.b
n6.out → n19.a
n18.out → n19.b
n17.out → n16.atom1
n19.out → n16.formula1
n20.out → n16.atom2
n6.out → n16.formula2
n10.out → n8.a
n16.out → n8.b
n21.out → n22.assertion
n23.out → n22.atom1
n6.out → n22.formula1
n24.out → n22.atom2
n6.out → n22.formula2
n25.out → n22.atom3
n18.out → n22.formula3
n8.out → n7.a
n22.out → n7.b
n4.out → n2.a
n7.out → n2.b
n29.out → n30.assertion
n31.out → n30.atom1
n14.out → n30.formula1
n32.out → n33.assertion
n34.out → n33.atom1
n14.out → n33.formula1
n35.out → n33.atom2
n6.out → n33.formula2
n36.out → n33.atom3
n13.out → n33.formula3
n30.out → n28.a
n33.out → n28.b
n37.out → n38.assertion
n14.out → n40.a
n13.out → n40.b
n18.out → n41.a
n40.out → n41.b
n39.out → n38.atom1
n41.out → n38.formula1
n42.out → n38.atom2
n6.out → n38.formula2
n28.out → n27.a
n38.out → n27.b
n43.out → n44.assertion
n45.out → n44.atom1
n6.out → n44.formula1
n46.out → n44.atom2
n18.out → n44.formula2
n47.out → n44.atom3
n40.out → n44.formula3
n27.out → n26.a
n44.out → n26.b
n2.out → n1.a
n26.out → n1.b
n1.out → n48.proof
```

</details>

### *04 · 后件强化

- 目标：`⊢ ( ( P → Q ) → ( ( R → P ) → ( R → Q ) ) )`
- 提示：先用 A1 把 A→B 嵌进 C 的前件。
- 参考解：46 个模块 / 66 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n47  [target]
n1  mp
n2  mp
n3  定理 *01
n4  subst
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  mp
n10  mp
n11  axiom A1
n12  subst
n13  atom P
n14  atom Q
n15  atom R
n16  axiom A1
n17  subst
n18  atom P
n19  imp
n20  imp
n21  atom Q
n22  axiom A2
n23  subst
n24  atom P
n25  atom Q
n26  atom R
n27  mp
n28  mp
n29  axiom A2
n30  subst
n31  atom P
n32  atom Q
n33  atom R
n34  axiom A1
n35  subst
n36  atom P
n37  imp
n38  imp
n39  imp
n40  imp
n41  atom Q
n42  axiom A2
n43  subst
n44  atom P
n45  atom Q
n46  atom R

接线：
n3.out → n4.assertion
n6.out → n8.a
n7.out → n8.b
n5.out → n4.atom1
n8.out → n4.formula1
n11.out → n12.assertion
n13.out → n12.atom1
n8.out → n12.formula1
n14.out → n12.atom2
n15.out → n12.formula2
n16.out → n17.assertion
n15.out → n19.a
n8.out → n19.b
n8.out → n20.a
n19.out → n20.b
n18.out → n17.atom1
n20.out → n17.formula1
n21.out → n17.atom2
n8.out → n17.formula2
n12.out → n10.a
n17.out → n10.b
n22.out → n23.assertion
n24.out → n23.atom1
n8.out → n23.formula1
n25.out → n23.atom2
n8.out → n23.formula2
n26.out → n23.atom3
n19.out → n23.formula3
n10.out → n9.a
n23.out → n9.b
n4.out → n2.a
n9.out → n2.b
n29.out → n30.assertion
n31.out → n30.atom1
n15.out → n30.formula1
n32.out → n30.atom2
n6.out → n30.formula2
n33.out → n30.atom3
n7.out → n30.formula3
n34.out → n35.assertion
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
n42.out → n43.assertion
n44.out → n43.atom1
n8.out → n43.formula1
n45.out → n43.atom2
n19.out → n43.formula2
n46.out → n43.atom3
n39.out → n43.formula3
n28.out → n27.a
n43.out → n27.b
n2.out → n1.a
n27.out → n1.b
n1.out → n47.proof
```

</details>

### *05 · 前件弱化

- 目标：`⊢ ( ( P → Q ) → ( ( Q → R ) → ( P → R ) ) )`
- 提示：把 A→B 与 B→C 接起来。
- 参考解：127 个模块 / 189 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n128  [target]
n1  mp
n2  mp
n3  定理 *01
n4  subst
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  mp
n10  mp
n11  axiom A1
n12  subst
n13  atom P
n14  atom Q
n15  atom R
n16  imp
n17  axiom A1
n18  subst
n19  atom P
n20  imp
n21  imp
n22  atom Q
n23  axiom A2
n24  subst
n25  atom P
n26  atom Q
n27  atom R
n28  mp
n29  mp
n30  mp
n31  mp
n32  mp
n33  定理 *02
n34  subst
n35  atom P
n36  atom Q
n37  mp
n38  mp
n39  axiom A1
n40  subst
n41  atom P
n42  imp
n43  atom Q
n44  axiom A1
n45  subst
n46  atom P
n47  imp
n48  imp
n49  atom Q
n50  axiom A2
n51  subst
n52  atom P
n53  atom Q
n54  atom R
n55  mp
n56  mp
n57  axiom A2
n58  subst
n59  atom P
n60  atom Q
n61  atom R
n62  axiom A1
n63  subst
n64  atom P
n65  imp
n66  imp
n67  atom Q
n68  axiom A2
n69  subst
n70  atom P
n71  atom Q
n72  atom R
n73  mp
n74  mp
n75  mp
n76  mp
n77  定理 *04
n78  subst
n79  atom P
n80  atom Q
n81  atom R
n82  axiom A1
n83  subst
n84  atom P
n85  imp
n86  imp
n87  imp
n88  atom Q
n89  axiom A2
n90  subst
n91  atom P
n92  atom Q
n93  atom R
n94  axiom A1
n95  subst
n96  atom P
n97  imp
n98  atom Q
n99  axiom A2
n100  subst
n101  atom P
n102  atom Q
n103  atom R
n104  mp
n105  mp
n106  axiom A2
n107  subst
n108  atom P
n109  atom Q
n110  atom R
n111  axiom A1
n112  subst
n113  atom P
n114  imp
n115  imp
n116  imp
n117  atom Q
n118  axiom A2
n119  subst
n120  atom P
n121  atom Q
n122  atom R
n123  axiom A2
n124  subst
n125  atom P
n126  atom Q
n127  atom R

接线：
n3.out → n4.assertion
n6.out → n8.a
n7.out → n8.b
n5.out → n4.atom1
n8.out → n4.formula1
n11.out → n12.assertion
n13.out → n12.atom1
n8.out → n12.formula1
n7.out → n16.a
n15.out → n16.b
n14.out → n12.atom2
n16.out → n12.formula2
n17.out → n18.assertion
n16.out → n20.a
n8.out → n20.b
n8.out → n21.a
n20.out → n21.b
n19.out → n18.atom1
n21.out → n18.formula1
n22.out → n18.atom2
n8.out → n18.formula2
n12.out → n10.a
n18.out → n10.b
n23.out → n24.assertion
n25.out → n24.atom1
n8.out → n24.formula1
n26.out → n24.atom2
n8.out → n24.formula2
n27.out → n24.atom3
n20.out → n24.formula3
n10.out → n9.a
n24.out → n9.b
n4.out → n2.a
n9.out → n2.b
n33.out → n34.assertion
n35.out → n34.atom1
n8.out → n34.formula1
n36.out → n34.atom2
n15.out → n34.formula2
n39.out → n40.assertion
n15.out → n42.a
n15.out → n42.b
n41.out → n40.atom1
n42.out → n40.formula1
n43.out → n40.atom2
n7.out → n40.formula2
n44.out → n45.assertion
n7.out → n47.a
n42.out → n47.b
n42.out → n48.a
n47.out → n48.b
n46.out → n45.atom1
n48.out → n45.formula1
n49.out → n45.atom2
n8.out → n45.formula2
n40.out → n38.a
n45.out → n38.b
n50.out → n51.assertion
n52.out → n51.atom1
n8.out → n51.formula1
n53.out → n51.atom2
n42.out → n51.formula2
n54.out → n51.atom3
n47.out → n51.formula3
n38.out → n37.a
n51.out → n37.b
n34.out → n32.a
n37.out → n32.b
n57.out → n58.assertion
n59.out → n58.atom1
n7.out → n58.formula1
n60.out → n58.atom2
n15.out → n58.formula2
n61.out → n58.atom3
n15.out → n58.formula3
n62.out → n63.assertion
n16.out → n65.a
n16.out → n65.b
n47.out → n66.a
n65.out → n66.b
n64.out → n63.atom1
n66.out → n63.formula1
n67.out → n63.atom2
n8.out → n63.formula2
n58.out → n56.a
n63.out → n56.b
n68.out → n69.assertion
n70.out → n69.atom1
n8.out → n69.formula1
n71.out → n69.atom2
n47.out → n69.formula2
n72.out → n69.atom3
n65.out → n69.formula3
n56.out → n55.a
n69.out → n55.b
n32.out → n31.a
n55.out → n31.b
n77.out → n78.assertion
n79.out → n78.atom1
n7.out → n78.formula1
n80.out → n78.atom2
n15.out → n78.formula2
n81.out → n78.atom3
n6.out → n78.formula3
n82.out → n83.assertion
n6.out → n85.a
n15.out → n85.b
n8.out → n86.a
n85.out → n86.b
n16.out → n87.a
n86.out → n87.b
n84.out → n83.atom1
n87.out → n83.formula1
n88.out → n83.atom2
n16.out → n83.formula2
n78.out → n76.a
n83.out → n76.b
n89.out → n90.assertion
n91.out → n90.atom1
n16.out → n90.formula1
n92.out → n90.atom2
n16.out → n90.formula2
n93.out → n90.atom3
n86.out → n90.formula3
n76.out → n75.a
n90.out → n75.b
n94.out → n95.assertion
n65.out → n97.a
n87.out → n97.b
n96.out → n95.atom1
n97.out → n95.formula1
n98.out → n95.atom2
n8.out → n95.formula2
n75.out → n74.a
n95.out → n74.b
n99.out → n100.assertion
n101.out → n100.atom1
n8.out → n100.formula1
n102.out → n100.atom2
n65.out → n100.formula2
n103.out → n100.atom3
n87.out → n100.formula3
n74.out → n73.a
n100.out → n73.b
n31.out → n30.a
n73.out → n30.b
n106.out → n107.assertion
n108.out → n107.atom1
n16.out → n107.formula1
n109.out → n107.atom2
n8.out → n107.formula2
n110.out → n107.atom3
n85.out → n107.formula3
n111.out → n112.assertion
n16.out → n114.a
n85.out → n114.b
n20.out → n115.a
n114.out → n115.b
n87.out → n116.a
n115.out → n116.b
n113.out → n112.atom1
n116.out → n112.formula1
n117.out → n112.atom2
n8.out → n112.formula2
n107.out → n105.a
n112.out → n105.b
n118.out → n119.assertion
n120.out → n119.atom1
n8.out → n119.formula1
n121.out → n119.atom2
n87.out → n119.formula2
n122.out → n119.atom3
n115.out → n119.formula3
n105.out → n104.a
n119.out → n104.b
n30.out → n29.a
n104.out → n29.b
n123.out → n124.assertion
n125.out → n124.atom1
n8.out → n124.formula1
n126.out → n124.atom2
n20.out → n124.formula2
n127.out → n124.atom3
n114.out → n124.formula3
n29.out → n28.a
n124.out → n28.b
n2.out → n1.a
n28.out → n1.b
n1.out → n128.proof
```

</details>

### *06 · 否定的蕴涵

- 目标：`⊢ ( ¬ ( P → Q ) → ( P → ¬ Q ) )`
- 提示：从否定蕴涵出发，用反证与双重否定。
- 参考解：541 个模块 / 794 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n542  [target]
n1  mp
n2  mp
n3  定理 *01
n4  subst
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  not
n10  mp
n11  mp
n12  mp
n13  mp
n14  定理 *01
n15  subst
n16  atom P
n17  mp
n18  mp
n19  axiom A1
n20  subst
n21  atom P
n22  atom Q
n23  not
n24  not
n25  axiom A1
n26  subst
n27  atom P
n28  imp
n29  imp
n30  atom Q
n31  axiom A2
n32  subst
n33  atom P
n34  atom Q
n35  atom R
n36  mp
n37  mp
n38  mp
n39  mp
n40  mp
n41  mp
n42  mp
n43  mp
n44  定理 *01
n45  subst
n46  atom P
n47  mp
n48  mp
n49  axiom A1
n50  subst
n51  atom P
n52  atom Q
n53  axiom A1
n54  subst
n55  atom P
n56  imp
n57  imp
n58  atom Q
n59  axiom A2
n60  subst
n61  atom P
n62  atom Q
n63  atom R
n64  mp
n65  mp
n66  axiom A3
n67  subst
n68  atom P
n69  atom Q
n70  axiom A1
n71  subst
n72  atom P
n73  imp
n74  imp
n75  atom Q
n76  axiom A2
n77  subst
n78  atom P
n79  atom Q
n80  atom R
n81  mp
n82  mp
n83  mp
n84  定理 *01
n85  subst
n86  atom P
n87  mp
n88  mp
n89  mp
n90  定理 *01
n91  subst
n92  atom P
n93  mp
n94  mp
n95  mp
n96  mp
n97  mp
n98  定理 *01
n99  subst
n100  atom P
n101  mp
n102  mp
n103  axiom A1
n104  subst
n105  atom P
n106  atom Q
n107  not
n108  not
n109  axiom A1
n110  subst
n111  atom P
n112  imp
n113  imp
n114  atom Q
n115  axiom A2
n116  subst
n117  atom P
n118  atom Q
n119  atom R
n120  mp
n121  mp
n122  axiom A3
n123  subst
n124  atom P
n125  atom Q
n126  axiom A1
n127  subst
n128  atom P
n129  imp
n130  imp
n131  atom Q
n132  axiom A2
n133  subst
n134  atom P
n135  atom Q
n136  atom R
n137  axiom A2
n138  subst
n139  atom P
n140  atom Q
n141  atom R
n142  axiom A1
n143  subst
n144  atom P
n145  imp
n146  imp
n147  atom Q
n148  axiom A2
n149  subst
n150  atom P
n151  atom Q
n152  atom R
n153  mp
n154  mp
n155  axiom A3
n156  subst
n157  atom P
n158  atom Q
n159  axiom A1
n160  subst
n161  atom P
n162  imp
n163  imp
n164  atom Q
n165  axiom A2
n166  subst
n167  atom P
n168  atom Q
n169  atom R
n170  axiom A2
n171  subst
n172  atom P
n173  atom Q
n174  atom R
n175  axiom A1
n176  subst
n177  atom P
n178  atom Q
n179  axiom A2
n180  subst
n181  atom P
n182  atom Q
n183  atom R
n184  mp
n185  mp
n186  axiom A1
n187  subst
n188  atom P
n189  atom Q
n190  axiom A1
n191  subst
n192  atom P
n193  imp
n194  imp
n195  atom Q
n196  axiom A2
n197  subst
n198  atom P
n199  atom Q
n200  atom R
n201  mp
n202  mp
n203  mp
n204  mp
n205  mp
n206  axiom A1
n207  subst
n208  atom P
n209  atom Q
n210  mp
n211  mp
n212  mp
n213  mp
n214  定理 *01
n215  subst
n216  atom P
n217  mp
n218  mp
n219  axiom A1
n220  subst
n221  atom P
n222  atom Q
n223  not
n224  not
n225  axiom A1
n226  subst
n227  atom P
n228  imp
n229  imp
n230  atom Q
n231  axiom A2
n232  subst
n233  atom P
n234  atom Q
n235  atom R
n236  mp
n237  mp
n238  mp
n239  mp
n240  mp
n241  mp
n242  mp
n243  mp
n244  定理 *01
n245  subst
n246  atom P
n247  mp
n248  mp
n249  axiom A1
n250  subst
n251  atom P
n252  atom Q
n253  axiom A1
n254  subst
n255  atom P
n256  imp
n257  imp
n258  atom Q
n259  axiom A2
n260  subst
n261  atom P
n262  atom Q
n263  atom R
n264  mp
n265  mp
n266  axiom A3
n267  subst
n268  atom P
n269  atom Q
n270  axiom A1
n271  subst
n272  atom P
n273  imp
n274  imp
n275  atom Q
n276  axiom A2
n277  subst
n278  atom P
n279  atom Q
n280  atom R
n281  mp
n282  mp
n283  mp
n284  定理 *01
n285  subst
n286  atom P
n287  mp
n288  mp
n289  mp
n290  定理 *01
n291  subst
n292  atom P
n293  mp
n294  mp
n295  mp
n296  mp
n297  mp
n298  定理 *01
n299  subst
n300  atom P
n301  mp
n302  mp
n303  axiom A1
n304  subst
n305  atom P
n306  atom Q
n307  not
n308  not
n309  axiom A1
n310  subst
n311  atom P
n312  imp
n313  imp
n314  atom Q
n315  axiom A2
n316  subst
n317  atom P
n318  atom Q
n319  atom R
n320  mp
n321  mp
n322  axiom A3
n323  subst
n324  atom P
n325  atom Q
n326  axiom A1
n327  subst
n328  atom P
n329  imp
n330  imp
n331  atom Q
n332  axiom A2
n333  subst
n334  atom P
n335  atom Q
n336  atom R
n337  axiom A2
n338  subst
n339  atom P
n340  atom Q
n341  atom R
n342  axiom A1
n343  subst
n344  atom P
n345  imp
n346  imp
n347  atom Q
n348  axiom A2
n349  subst
n350  atom P
n351  atom Q
n352  atom R
n353  mp
n354  mp
n355  axiom A3
n356  subst
n357  atom P
n358  atom Q
n359  axiom A1
n360  subst
n361  atom P
n362  imp
n363  imp
n364  atom Q
n365  axiom A2
n366  subst
n367  atom P
n368  atom Q
n369  atom R
n370  axiom A2
n371  subst
n372  atom P
n373  atom Q
n374  atom R
n375  axiom A1
n376  subst
n377  atom P
n378  atom Q
n379  axiom A2
n380  subst
n381  atom P
n382  atom Q
n383  atom R
n384  mp
n385  mp
n386  axiom A1
n387  subst
n388  atom P
n389  atom Q
n390  axiom A1
n391  subst
n392  atom P
n393  imp
n394  imp
n395  atom Q
n396  axiom A2
n397  subst
n398  atom P
n399  atom Q
n400  atom R
n401  mp
n402  mp
n403  mp
n404  mp
n405  定理 *01
n406  subst
n407  atom P
n408  axiom A1
n409  subst
n410  atom P
n411  imp
n412  atom Q
n413  axiom A2
n414  subst
n415  atom P
n416  atom Q
n417  atom R
n418  axiom A1
n419  subst
n420  atom P
n421  imp
n422  atom Q
n423  axiom A2
n424  subst
n425  atom P
n426  atom Q
n427  atom R
n428  axiom A2
n429  subst
n430  atom P
n431  atom Q
n432  atom R
n433  axiom A1
n434  subst
n435  atom P
n436  imp
n437  imp
n438  atom Q
n439  axiom A2
n440  subst
n441  atom P
n442  atom Q
n443  atom R
n444  mp
n445  mp
n446  axiom A3
n447  subst
n448  atom P
n449  atom Q
n450  axiom A1
n451  subst
n452  atom P
n453  imp
n454  imp
n455  atom Q
n456  axiom A2
n457  subst
n458  atom P
n459  atom Q
n460  atom R
n461  axiom A2
n462  subst
n463  atom P
n464  atom Q
n465  atom R
n466  axiom A1
n467  subst
n468  atom P
n469  imp
n470  atom Q
n471  axiom A2
n472  subst
n473  atom P
n474  atom Q
n475  atom R
n476  axiom A1
n477  subst
n478  atom P
n479  imp
n480  imp
n481  atom Q
n482  axiom A2
n483  subst
n484  atom P
n485  atom Q
n486  atom R
n487  axiom A2
n488  subst
n489  atom P
n490  atom Q
n491  atom R
n492  axiom A1
n493  subst
n494  atom P
n495  imp
n496  imp
n497  atom Q
n498  axiom A2
n499  subst
n500  atom P
n501  atom Q
n502  atom R
n503  mp
n504  mp
n505  axiom A3
n506  subst
n507  atom P
n508  atom Q
n509  axiom A1
n510  subst
n511  atom P
n512  imp
n513  imp
n514  atom Q
n515  axiom A2
n516  subst
n517  atom P
n518  atom Q
n519  atom R
n520  axiom A2
n521  subst
n522  atom P
n523  atom Q
n524  atom R
n525  mp
n526  mp
n527  axiom A1
n528  subst
n529  atom P
n530  atom Q
n531  axiom A1
n532  subst
n533  atom P
n534  imp
n535  imp
n536  atom Q
n537  axiom A2
n538  subst
n539  atom P
n540  atom Q
n541  atom R

接线：
n3.out → n4.assertion
n6.out → n8.a
n7.out → n8.b
n8.out → n9.a
n5.out → n4.atom1
n9.out → n4.formula1
n14.out → n15.assertion
n16.out → n15.atom1
n9.out → n15.formula1
n19.out → n20.assertion
n21.out → n20.atom1
n9.out → n20.formula1
n7.out → n23.a
n23.out → n24.a
n22.out → n20.atom2
n24.out → n20.formula2
n25.out → n26.assertion
n24.out → n28.a
n9.out → n28.b
n9.out → n29.a
n28.out → n29.b
n27.out → n26.atom1
n29.out → n26.formula1
n30.out → n26.atom2
n9.out → n26.formula2
n20.out → n18.a
n26.out → n18.b
n31.out → n32.assertion
n33.out → n32.atom1
n9.out → n32.formula1
n34.out → n32.atom2
n9.out → n32.formula2
n35.out → n32.atom3
n28.out → n32.formula3
n18.out → n17.a
n32.out → n17.b
n15.out → n13.a
n17.out → n13.b
n44.out → n45.assertion
n46.out → n45.atom1
n24.out → n45.formula1
n49.out → n50.assertion
n51.out → n50.atom1
n24.out → n50.formula1
n52.out → n50.atom2
n23.out → n50.formula2
n53.out → n54.assertion
n23.out → n56.a
n24.out → n56.b
n24.out → n57.a
n56.out → n57.b
n55.out → n54.atom1
n57.out → n54.formula1
n58.out → n54.atom2
n24.out → n54.formula2
n50.out → n48.a
n54.out → n48.b
n59.out → n60.assertion
n61.out → n60.atom1
n24.out → n60.formula1
n62.out → n60.atom2
n24.out → n60.formula2
n63.out → n60.atom3
n56.out → n60.formula3
n48.out → n47.a
n60.out → n47.b
n45.out → n43.a
n47.out → n43.b
n66.out → n67.assertion
n68.out → n67.atom1
n7.out → n67.formula1
n69.out → n67.atom2
n23.out → n67.formula2
n70.out → n71.assertion
n23.out → n73.a
n7.out → n73.b
n56.out → n74.a
n73.out → n74.b
n72.out → n71.atom1
n74.out → n71.formula1
n75.out → n71.atom2
n24.out → n71.formula2
n67.out → n65.a
n71.out → n65.b
n76.out → n77.assertion
n78.out → n77.atom1
n24.out → n77.formula1
n79.out → n77.atom2
n56.out → n77.formula2
n80.out → n77.atom3
n73.out → n77.formula3
n65.out → n64.a
n77.out → n64.b
n43.out → n42.a
n64.out → n42.b
n84.out → n85.assertion
n86.out → n85.atom1
n73.out → n85.formula1
n90.out → n91.assertion
n92.out → n91.atom1
n73.out → n91.formula1
n98.out → n99.assertion
n100.out → n99.atom1
n23.out → n99.formula1
n103.out → n104.assertion
n105.out → n104.atom1
n23.out → n104.formula1
n73.out → n107.a
n107.out → n108.a
n106.out → n104.atom2
n108.out → n104.formula2
n109.out → n110.assertion
n108.out → n112.a
n23.out → n112.b
n23.out → n113.a
n112.out → n113.b
n111.out → n110.atom1
n113.out → n110.formula1
n114.out → n110.atom2
n23.out → n110.formula2
n104.out → n102.a
n110.out → n102.b
n115.out → n116.assertion
n117.out → n116.atom1
n23.out → n116.formula1
n118.out → n116.atom2
n23.out → n116.formula2
n119.out → n116.atom3
n112.out → n116.formula3
n102.out → n101.a
n116.out → n101.b
n99.out → n97.a
n101.out → n97.b
n122.out → n123.assertion
n124.out → n123.atom1
n107.out → n123.formula1
n125.out → n123.atom2
n7.out → n123.formula2
n126.out → n127.assertion
n7.out → n129.a
n107.out → n129.b
n112.out → n130.a
n129.out → n130.b
n128.out → n127.atom1
n130.out → n127.formula1
n131.out → n127.atom2
n23.out → n127.formula2
n123.out → n121.a
n127.out → n121.b
n132.out → n133.assertion
n134.out → n133.atom1
n23.out → n133.formula1
n135.out → n133.atom2
n112.out → n133.formula2
n136.out → n133.atom3
n129.out → n133.formula3
n121.out → n120.a
n133.out → n120.b
n97.out → n96.a
n120.out → n96.b
n137.out → n138.assertion
n139.out → n138.atom1
n23.out → n138.formula1
n140.out → n138.atom2
n7.out → n138.formula2
n141.out → n138.atom3
n107.out → n138.formula3
n96.out → n95.a
n138.out → n95.b
n142.out → n143.assertion
n23.out → n145.a
n107.out → n145.b
n73.out → n146.a
n145.out → n146.b
n144.out → n143.atom1
n146.out → n143.formula1
n147.out → n143.atom2
n73.out → n143.formula2
n95.out → n94.a
n143.out → n94.b
n148.out → n149.assertion
n150.out → n149.atom1
n73.out → n149.formula1
n151.out → n149.atom2
n73.out → n149.formula2
n152.out → n149.atom3
n145.out → n149.formula3
n94.out → n93.a
n149.out → n93.b
n91.out → n89.a
n93.out → n89.b
n155.out → n156.assertion
n157.out → n156.atom1
n7.out → n156.formula1
n158.out → n156.atom2
n73.out → n156.formula2
n159.out → n160.assertion
n73.out → n162.a
n7.out → n162.b
n145.out → n163.a
n162.out → n163.b
n161.out → n160.atom1
n163.out → n160.formula1
n164.out → n160.atom2
n73.out → n160.formula2
n156.out → n154.a
n160.out → n154.b
n165.out → n166.assertion
n167.out → n166.atom1
n73.out → n166.formula1
n168.out → n166.atom2
n145.out → n166.formula2
n169.out → n166.atom3
n162.out → n166.formula3
n154.out → n153.a
n166.out → n153.b
n89.out → n88.a
n153.out → n88.b
n170.out → n171.assertion
n172.out → n171.atom1
n73.out → n171.formula1
n173.out → n171.atom2
n73.out → n171.formula2
n174.out → n171.atom3
n7.out → n171.formula3
n88.out → n87.a
n171.out → n87.b
n85.out → n83.a
n87.out → n83.b
n175.out → n176.assertion
n177.out → n176.atom1
n162.out → n176.formula1
n178.out → n176.atom2
n24.out → n176.formula2
n83.out → n82.a
n176.out → n82.b
n179.out → n180.assertion
n181.out → n180.atom1
n24.out → n180.formula1
n182.out → n180.atom2
n73.out → n180.formula2
n183.out → n180.atom3
n7.out → n180.formula3
n82.out → n81.a
n180.out → n81.b
n42.out → n41.a
n81.out → n41.b
n186.out → n187.assertion
n188.out → n187.atom1
n7.out → n187.formula1
n189.out → n187.atom2
n9.out → n187.formula2
n190.out → n191.assertion
n9.out → n193.a
n7.out → n193.b
n7.out → n194.a
n193.out → n194.b
n192.out → n191.atom1
n194.out → n191.formula1
n195.out → n191.atom2
n24.out → n191.formula2
n187.out → n185.a
n191.out → n185.b
n196.out → n197.assertion
n198.out → n197.atom1
n24.out → n197.formula1
n199.out → n197.atom2
n7.out → n197.formula2
n200.out → n197.atom3
n193.out → n197.formula3
n185.out → n184.a
n197.out → n184.b
n41.out → n40.a
n184.out → n40.b
n206.out → n207.assertion
n208.out → n207.atom1
n7.out → n207.formula1
n209.out → n207.atom2
n6.out → n207.formula2
n214.out → n215.assertion
n216.out → n215.atom1
n7.out → n215.formula1
n219.out → n220.assertion
n221.out → n220.atom1
n7.out → n220.formula1
n9.out → n223.a
n223.out → n224.a
n222.out → n220.atom2
n224.out → n220.formula2
n225.out → n226.assertion
n224.out → n228.a
n7.out → n228.b
n7.out → n229.a
n228.out → n229.b
n227.out → n226.atom1
n229.out → n226.formula1
n230.out → n226.atom2
n7.out → n226.formula2
n220.out → n218.a
n226.out → n218.b
n231.out → n232.assertion
n233.out → n232.atom1
n7.out → n232.formula1
n234.out → n232.atom2
n7.out → n232.formula2
n235.out → n232.atom3
n228.out → n232.formula3
n218.out → n217.a
n232.out → n217.b
n215.out → n213.a
n217.out → n213.b
n244.out → n245.assertion
n246.out → n245.atom1
n224.out → n245.formula1
n249.out → n250.assertion
n251.out → n250.atom1
n224.out → n250.formula1
n252.out → n250.atom2
n223.out → n250.formula2
n253.out → n254.assertion
n223.out → n256.a
n224.out → n256.b
n224.out → n257.a
n256.out → n257.b
n255.out → n254.atom1
n257.out → n254.formula1
n258.out → n254.atom2
n224.out → n254.formula2
n250.out → n248.a
n254.out → n248.b
n259.out → n260.assertion
n261.out → n260.atom1
n224.out → n260.formula1
n262.out → n260.atom2
n224.out → n260.formula2
n263.out → n260.atom3
n256.out → n260.formula3
n248.out → n247.a
n260.out → n247.b
n245.out → n243.a
n247.out → n243.b
n266.out → n267.assertion
n268.out → n267.atom1
n9.out → n267.formula1
n269.out → n267.atom2
n223.out → n267.formula2
n270.out → n271.assertion
n223.out → n273.a
n9.out → n273.b
n256.out → n274.a
n273.out → n274.b
n272.out → n271.atom1
n274.out → n271.formula1
n275.out → n271.atom2
n224.out → n271.formula2
n267.out → n265.a
n271.out → n265.b
n276.out → n277.assertion
n278.out → n277.atom1
n224.out → n277.formula1
n279.out → n277.atom2
n256.out → n277.formula2
n280.out → n277.atom3
n273.out → n277.formula3
n265.out → n264.a
n277.out → n264.b
n243.out → n242.a
n264.out → n242.b
n284.out → n285.assertion
n286.out → n285.atom1
n273.out → n285.formula1
n290.out → n291.assertion
n292.out → n291.atom1
n273.out → n291.formula1
n298.out → n299.assertion
n300.out → n299.atom1
n223.out → n299.formula1
n303.out → n304.assertion
n305.out → n304.atom1
n223.out → n304.formula1
n273.out → n307.a
n307.out → n308.a
n306.out → n304.atom2
n308.out → n304.formula2
n309.out → n310.assertion
n308.out → n312.a
n223.out → n312.b
n223.out → n313.a
n312.out → n313.b
n311.out → n310.atom1
n313.out → n310.formula1
n314.out → n310.atom2
n223.out → n310.formula2
n304.out → n302.a
n310.out → n302.b
n315.out → n316.assertion
n317.out → n316.atom1
n223.out → n316.formula1
n318.out → n316.atom2
n223.out → n316.formula2
n319.out → n316.atom3
n312.out → n316.formula3
n302.out → n301.a
n316.out → n301.b
n299.out → n297.a
n301.out → n297.b
n322.out → n323.assertion
n324.out → n323.atom1
n307.out → n323.formula1
n325.out → n323.atom2
n9.out → n323.formula2
n326.out → n327.assertion
n9.out → n329.a
n307.out → n329.b
n312.out → n330.a
n329.out → n330.b
n328.out → n327.atom1
n330.out → n327.formula1
n331.out → n327.atom2
n223.out → n327.formula2
n323.out → n321.a
n327.out → n321.b
n332.out → n333.assertion
n334.out → n333.atom1
n223.out → n333.formula1
n335.out → n333.atom2
n312.out → n333.formula2
n336.out → n333.atom3
n329.out → n333.formula3
n321.out → n320.a
n333.out → n320.b
n297.out → n296.a
n320.out → n296.b
n337.out → n338.assertion
n339.out → n338.atom1
n223.out → n338.formula1
n340.out → n338.atom2
n9.out → n338.formula2
n341.out → n338.atom3
n307.out → n338.formula3
n296.out → n295.a
n338.out → n295.b
n342.out → n343.assertion
n223.out → n345.a
n307.out → n345.b
n273.out → n346.a
n345.out → n346.b
n344.out → n343.atom1
n346.out → n343.formula1
n347.out → n343.atom2
n273.out → n343.formula2
n295.out → n294.a
n343.out → n294.b
n348.out → n349.assertion
n350.out → n349.atom1
n273.out → n349.formula1
n351.out → n349.atom2
n273.out → n349.formula2
n352.out → n349.atom3
n345.out → n349.formula3
n294.out → n293.a
n349.out → n293.b
n291.out → n289.a
n293.out → n289.b
n355.out → n356.assertion
n357.out → n356.atom1
n9.out → n356.formula1
n358.out → n356.atom2
n273.out → n356.formula2
n359.out → n360.assertion
n273.out → n362.a
n9.out → n362.b
n345.out → n363.a
n362.out → n363.b
n361.out → n360.atom1
n363.out → n360.formula1
n364.out → n360.atom2
n273.out → n360.formula2
n356.out → n354.a
n360.out → n354.b
n365.out → n366.assertion
n367.out → n366.atom1
n273.out → n366.formula1
n368.out → n366.atom2
n345.out → n366.formula2
n369.out → n366.atom3
n362.out → n366.formula3
n354.out → n353.a
n366.out → n353.b
n289.out → n288.a
n353.out → n288.b
n370.out → n371.assertion
n372.out → n371.atom1
n273.out → n371.formula1
n373.out → n371.atom2
n273.out → n371.formula2
n374.out → n371.atom3
n9.out → n371.formula3
n288.out → n287.a
n371.out → n287.b
n285.out → n283.a
n287.out → n283.b
n375.out → n376.assertion
n377.out → n376.atom1
n362.out → n376.formula1
n378.out → n376.atom2
n224.out → n376.formula2
n283.out → n282.a
n376.out → n282.b
n379.out → n380.assertion
n381.out → n380.atom1
n224.out → n380.formula1
n382.out → n380.atom2
n273.out → n380.formula2
n383.out → n380.atom3
n9.out → n380.formula3
n282.out → n281.a
n380.out → n281.b
n242.out → n241.a
n281.out → n241.b
n386.out → n387.assertion
n388.out → n387.atom1
n9.out → n387.formula1
n389.out → n387.atom2
n7.out → n387.formula2
n390.out → n391.assertion
n7.out → n393.a
n9.out → n393.b
n9.out → n394.a
n393.out → n394.b
n392.out → n391.atom1
n394.out → n391.formula1
n395.out → n391.atom2
n224.out → n391.formula2
n387.out → n385.a
n391.out → n385.b
n396.out → n397.assertion
n398.out → n397.atom1
n224.out → n397.formula1
n399.out → n397.atom2
n9.out → n397.formula2
n400.out → n397.atom3
n393.out → n397.formula3
n385.out → n384.a
n397.out → n384.b
n241.out → n240.a
n384.out → n240.b
n405.out → n406.assertion
n407.out → n406.atom1
n9.out → n406.formula1
n408.out → n409.assertion
n9.out → n411.a
n9.out → n411.b
n410.out → n409.atom1
n411.out → n409.formula1
n412.out → n409.atom2
n7.out → n409.formula2
n406.out → n404.a
n409.out → n404.b
n413.out → n414.assertion
n415.out → n414.atom1
n7.out → n414.formula1
n416.out → n414.atom2
n9.out → n414.formula2
n417.out → n414.atom3
n9.out → n414.formula3
n404.out → n403.a
n414.out → n403.b
n418.out → n419.assertion
n393.out → n421.a
n393.out → n421.b
n420.out → n419.atom1
n421.out → n419.formula1
n422.out → n419.atom2
n224.out → n419.formula2
n403.out → n402.a
n419.out → n402.b
n423.out → n424.assertion
n425.out → n424.atom1
n224.out → n424.formula1
n426.out → n424.atom2
n393.out → n424.formula2
n427.out → n424.atom3
n393.out → n424.formula3
n402.out → n401.a
n424.out → n401.b
n240.out → n239.a
n401.out → n239.b
n428.out → n429.assertion
n430.out → n429.atom1
n224.out → n429.formula1
n431.out → n429.atom2
n7.out → n429.formula2
n432.out → n429.atom3
n9.out → n429.formula3
n239.out → n238.a
n429.out → n238.b
n433.out → n434.assertion
n224.out → n436.a
n9.out → n436.b
n228.out → n437.a
n436.out → n437.b
n435.out → n434.atom1
n437.out → n434.formula1
n438.out → n434.atom2
n7.out → n434.formula2
n238.out → n237.a
n434.out → n237.b
n439.out → n440.assertion
n441.out → n440.atom1
n7.out → n440.formula1
n442.out → n440.atom2
n228.out → n440.formula2
n443.out → n440.atom3
n436.out → n440.formula3
n237.out → n236.a
n440.out → n236.b
n213.out → n212.a
n236.out → n212.b
n446.out → n447.assertion
n448.out → n447.atom1
n223.out → n447.formula1
n449.out → n447.atom2
n8.out → n447.formula2
n450.out → n451.assertion
n8.out → n453.a
n223.out → n453.b
n436.out → n454.a
n453.out → n454.b
n452.out → n451.atom1
n454.out → n451.formula1
n455.out → n451.atom2
n7.out → n451.formula2
n447.out → n445.a
n451.out → n445.b
n456.out → n457.assertion
n458.out → n457.atom1
n7.out → n457.formula1
n459.out → n457.atom2
n436.out → n457.formula2
n460.out → n457.atom3
n453.out → n457.formula3
n445.out → n444.a
n457.out → n444.b
n212.out → n211.a
n444.out → n211.b
n461.out → n462.assertion
n463.out → n462.atom1
n7.out → n462.formula1
n464.out → n462.atom2
n8.out → n462.formula2
n465.out → n462.atom3
n223.out → n462.formula3
n211.out → n210.a
n462.out → n210.b
n207.out → n205.a
n210.out → n205.b
n466.out → n467.assertion
n7.out → n469.a
n223.out → n469.b
n468.out → n467.atom1
n469.out → n467.formula1
n470.out → n467.atom2
n9.out → n467.formula2
n205.out → n204.a
n467.out → n204.b
n471.out → n472.assertion
n473.out → n472.atom1
n9.out → n472.formula1
n474.out → n472.atom2
n7.out → n472.formula2
n475.out → n472.atom3
n223.out → n472.formula3
n204.out → n203.a
n472.out → n203.b
n476.out → n477.assertion
n9.out → n479.a
n223.out → n479.b
n193.out → n480.a
n479.out → n480.b
n478.out → n477.atom1
n480.out → n477.formula1
n481.out → n477.atom2
n24.out → n477.formula2
n203.out → n202.a
n477.out → n202.b
n482.out → n483.assertion
n484.out → n483.atom1
n24.out → n483.formula1
n485.out → n483.atom2
n193.out → n483.formula2
n486.out → n483.atom3
n479.out → n483.formula3
n202.out → n201.a
n483.out → n201.b
n40.out → n39.a
n201.out → n39.b
n487.out → n488.assertion
n489.out → n488.atom1
n24.out → n488.formula1
n490.out → n488.atom2
n9.out → n488.formula2
n491.out → n488.atom3
n223.out → n488.formula3
n39.out → n38.a
n488.out → n38.b
n492.out → n493.assertion
n24.out → n495.a
n223.out → n495.b
n28.out → n496.a
n495.out → n496.b
n494.out → n493.atom1
n496.out → n493.formula1
n497.out → n493.atom2
n9.out → n493.formula2
n38.out → n37.a
n493.out → n37.b
n498.out → n499.assertion
n500.out → n499.atom1
n9.out → n499.formula1
n501.out → n499.atom2
n28.out → n499.formula2
n502.out → n499.atom3
n495.out → n499.formula3
n37.out → n36.a
n499.out → n36.b
n13.out → n12.a
n36.out → n12.b
n505.out → n506.assertion
n507.out → n506.atom1
n23.out → n506.formula1
n508.out → n506.atom2
n9.out → n506.formula2
n509.out → n510.assertion
n9.out → n512.a
n23.out → n512.b
n495.out → n513.a
n512.out → n513.b
n511.out → n510.atom1
n513.out → n510.formula1
n514.out → n510.atom2
n9.out → n510.formula2
n506.out → n504.a
n510.out → n504.b
n515.out → n516.assertion
n517.out → n516.atom1
n9.out → n516.formula1
n518.out → n516.atom2
n495.out → n516.formula2
n519.out → n516.atom3
n512.out → n516.formula3
n504.out → n503.a
n516.out → n503.b
n12.out → n11.a
n503.out → n11.b
n520.out → n521.assertion
n522.out → n521.atom1
n9.out → n521.formula1
n523.out → n521.atom2
n9.out → n521.formula2
n524.out → n521.atom3
n23.out → n521.formula3
n11.out → n10.a
n521.out → n10.b
n4.out → n2.a
n10.out → n2.b
n527.out → n528.assertion
n529.out → n528.atom1
n23.out → n528.formula1
n530.out → n528.atom2
n6.out → n528.formula2
n531.out → n532.assertion
n6.out → n534.a
n23.out → n534.b
n23.out → n535.a
n534.out → n535.b
n533.out → n532.atom1
n535.out → n532.formula1
n536.out → n532.atom2
n9.out → n532.formula2
n528.out → n526.a
n532.out → n526.b
n537.out → n538.assertion
n539.out → n538.atom1
n9.out → n538.formula1
n540.out → n538.atom2
n23.out → n538.formula2
n541.out → n538.atom3
n534.out → n538.formula3
n526.out → n525.a
n538.out → n525.b
n2.out → n1.a
n525.out → n1.b
n1.out → n542.proof
```

</details>

### *07 · 否定的前件

- 目标：`⊢ ( ¬ ( P → Q ) → ( ¬ P → ¬ Q ) )`
- 提示：与上一关对称，用 A3 与双重否定。
- 参考解：542 个模块 / 795 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n543  [target]
n1  mp
n2  mp
n3  定理 *01
n4  subst
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  not
n10  mp
n11  mp
n12  mp
n13  mp
n14  定理 *01
n15  subst
n16  atom P
n17  mp
n18  mp
n19  axiom A1
n20  subst
n21  atom P
n22  atom Q
n23  not
n24  not
n25  axiom A1
n26  subst
n27  atom P
n28  imp
n29  imp
n30  atom Q
n31  axiom A2
n32  subst
n33  atom P
n34  atom Q
n35  atom R
n36  mp
n37  mp
n38  mp
n39  mp
n40  mp
n41  mp
n42  mp
n43  mp
n44  定理 *01
n45  subst
n46  atom P
n47  mp
n48  mp
n49  axiom A1
n50  subst
n51  atom P
n52  atom Q
n53  axiom A1
n54  subst
n55  atom P
n56  imp
n57  imp
n58  atom Q
n59  axiom A2
n60  subst
n61  atom P
n62  atom Q
n63  atom R
n64  mp
n65  mp
n66  axiom A3
n67  subst
n68  atom P
n69  atom Q
n70  axiom A1
n71  subst
n72  atom P
n73  imp
n74  imp
n75  atom Q
n76  axiom A2
n77  subst
n78  atom P
n79  atom Q
n80  atom R
n81  mp
n82  mp
n83  mp
n84  定理 *01
n85  subst
n86  atom P
n87  mp
n88  mp
n89  mp
n90  定理 *01
n91  subst
n92  atom P
n93  mp
n94  mp
n95  mp
n96  mp
n97  mp
n98  定理 *01
n99  subst
n100  atom P
n101  mp
n102  mp
n103  axiom A1
n104  subst
n105  atom P
n106  atom Q
n107  not
n108  not
n109  axiom A1
n110  subst
n111  atom P
n112  imp
n113  imp
n114  atom Q
n115  axiom A2
n116  subst
n117  atom P
n118  atom Q
n119  atom R
n120  mp
n121  mp
n122  axiom A3
n123  subst
n124  atom P
n125  atom Q
n126  axiom A1
n127  subst
n128  atom P
n129  imp
n130  imp
n131  atom Q
n132  axiom A2
n133  subst
n134  atom P
n135  atom Q
n136  atom R
n137  axiom A2
n138  subst
n139  atom P
n140  atom Q
n141  atom R
n142  axiom A1
n143  subst
n144  atom P
n145  imp
n146  imp
n147  atom Q
n148  axiom A2
n149  subst
n150  atom P
n151  atom Q
n152  atom R
n153  mp
n154  mp
n155  axiom A3
n156  subst
n157  atom P
n158  atom Q
n159  axiom A1
n160  subst
n161  atom P
n162  imp
n163  imp
n164  atom Q
n165  axiom A2
n166  subst
n167  atom P
n168  atom Q
n169  atom R
n170  axiom A2
n171  subst
n172  atom P
n173  atom Q
n174  atom R
n175  axiom A1
n176  subst
n177  atom P
n178  atom Q
n179  axiom A2
n180  subst
n181  atom P
n182  atom Q
n183  atom R
n184  mp
n185  mp
n186  axiom A1
n187  subst
n188  atom P
n189  atom Q
n190  axiom A1
n191  subst
n192  atom P
n193  imp
n194  imp
n195  atom Q
n196  axiom A2
n197  subst
n198  atom P
n199  atom Q
n200  atom R
n201  mp
n202  mp
n203  mp
n204  mp
n205  mp
n206  axiom A1
n207  subst
n208  atom P
n209  atom Q
n210  mp
n211  mp
n212  mp
n213  mp
n214  定理 *01
n215  subst
n216  atom P
n217  mp
n218  mp
n219  axiom A1
n220  subst
n221  atom P
n222  atom Q
n223  not
n224  not
n225  axiom A1
n226  subst
n227  atom P
n228  imp
n229  imp
n230  atom Q
n231  axiom A2
n232  subst
n233  atom P
n234  atom Q
n235  atom R
n236  mp
n237  mp
n238  mp
n239  mp
n240  mp
n241  mp
n242  mp
n243  mp
n244  定理 *01
n245  subst
n246  atom P
n247  mp
n248  mp
n249  axiom A1
n250  subst
n251  atom P
n252  atom Q
n253  axiom A1
n254  subst
n255  atom P
n256  imp
n257  imp
n258  atom Q
n259  axiom A2
n260  subst
n261  atom P
n262  atom Q
n263  atom R
n264  mp
n265  mp
n266  axiom A3
n267  subst
n268  atom P
n269  atom Q
n270  axiom A1
n271  subst
n272  atom P
n273  imp
n274  imp
n275  atom Q
n276  axiom A2
n277  subst
n278  atom P
n279  atom Q
n280  atom R
n281  mp
n282  mp
n283  mp
n284  定理 *01
n285  subst
n286  atom P
n287  mp
n288  mp
n289  mp
n290  定理 *01
n291  subst
n292  atom P
n293  mp
n294  mp
n295  mp
n296  mp
n297  mp
n298  定理 *01
n299  subst
n300  atom P
n301  mp
n302  mp
n303  axiom A1
n304  subst
n305  atom P
n306  atom Q
n307  not
n308  not
n309  axiom A1
n310  subst
n311  atom P
n312  imp
n313  imp
n314  atom Q
n315  axiom A2
n316  subst
n317  atom P
n318  atom Q
n319  atom R
n320  mp
n321  mp
n322  axiom A3
n323  subst
n324  atom P
n325  atom Q
n326  axiom A1
n327  subst
n328  atom P
n329  imp
n330  imp
n331  atom Q
n332  axiom A2
n333  subst
n334  atom P
n335  atom Q
n336  atom R
n337  axiom A2
n338  subst
n339  atom P
n340  atom Q
n341  atom R
n342  axiom A1
n343  subst
n344  atom P
n345  imp
n346  imp
n347  atom Q
n348  axiom A2
n349  subst
n350  atom P
n351  atom Q
n352  atom R
n353  mp
n354  mp
n355  axiom A3
n356  subst
n357  atom P
n358  atom Q
n359  axiom A1
n360  subst
n361  atom P
n362  imp
n363  imp
n364  atom Q
n365  axiom A2
n366  subst
n367  atom P
n368  atom Q
n369  atom R
n370  axiom A2
n371  subst
n372  atom P
n373  atom Q
n374  atom R
n375  axiom A1
n376  subst
n377  atom P
n378  atom Q
n379  axiom A2
n380  subst
n381  atom P
n382  atom Q
n383  atom R
n384  mp
n385  mp
n386  axiom A1
n387  subst
n388  atom P
n389  atom Q
n390  axiom A1
n391  subst
n392  atom P
n393  imp
n394  imp
n395  atom Q
n396  axiom A2
n397  subst
n398  atom P
n399  atom Q
n400  atom R
n401  mp
n402  mp
n403  mp
n404  mp
n405  定理 *01
n406  subst
n407  atom P
n408  axiom A1
n409  subst
n410  atom P
n411  imp
n412  atom Q
n413  axiom A2
n414  subst
n415  atom P
n416  atom Q
n417  atom R
n418  axiom A1
n419  subst
n420  atom P
n421  imp
n422  atom Q
n423  axiom A2
n424  subst
n425  atom P
n426  atom Q
n427  atom R
n428  axiom A2
n429  subst
n430  atom P
n431  atom Q
n432  atom R
n433  axiom A1
n434  subst
n435  atom P
n436  imp
n437  imp
n438  atom Q
n439  axiom A2
n440  subst
n441  atom P
n442  atom Q
n443  atom R
n444  mp
n445  mp
n446  axiom A3
n447  subst
n448  atom P
n449  atom Q
n450  axiom A1
n451  subst
n452  atom P
n453  imp
n454  imp
n455  atom Q
n456  axiom A2
n457  subst
n458  atom P
n459  atom Q
n460  atom R
n461  axiom A2
n462  subst
n463  atom P
n464  atom Q
n465  atom R
n466  axiom A1
n467  subst
n468  atom P
n469  imp
n470  atom Q
n471  axiom A2
n472  subst
n473  atom P
n474  atom Q
n475  atom R
n476  axiom A1
n477  subst
n478  atom P
n479  imp
n480  imp
n481  atom Q
n482  axiom A2
n483  subst
n484  atom P
n485  atom Q
n486  atom R
n487  axiom A2
n488  subst
n489  atom P
n490  atom Q
n491  atom R
n492  axiom A1
n493  subst
n494  atom P
n495  imp
n496  imp
n497  atom Q
n498  axiom A2
n499  subst
n500  atom P
n501  atom Q
n502  atom R
n503  mp
n504  mp
n505  axiom A3
n506  subst
n507  atom P
n508  atom Q
n509  axiom A1
n510  subst
n511  atom P
n512  imp
n513  imp
n514  atom Q
n515  axiom A2
n516  subst
n517  atom P
n518  atom Q
n519  atom R
n520  axiom A2
n521  subst
n522  atom P
n523  atom Q
n524  atom R
n525  mp
n526  mp
n527  axiom A1
n528  subst
n529  atom P
n530  atom Q
n531  not
n532  axiom A1
n533  subst
n534  atom P
n535  imp
n536  imp
n537  atom Q
n538  axiom A2
n539  subst
n540  atom P
n541  atom Q
n542  atom R

接线：
n3.out → n4.assertion
n6.out → n8.a
n7.out → n8.b
n8.out → n9.a
n5.out → n4.atom1
n9.out → n4.formula1
n14.out → n15.assertion
n16.out → n15.atom1
n9.out → n15.formula1
n19.out → n20.assertion
n21.out → n20.atom1
n9.out → n20.formula1
n7.out → n23.a
n23.out → n24.a
n22.out → n20.atom2
n24.out → n20.formula2
n25.out → n26.assertion
n24.out → n28.a
n9.out → n28.b
n9.out → n29.a
n28.out → n29.b
n27.out → n26.atom1
n29.out → n26.formula1
n30.out → n26.atom2
n9.out → n26.formula2
n20.out → n18.a
n26.out → n18.b
n31.out → n32.assertion
n33.out → n32.atom1
n9.out → n32.formula1
n34.out → n32.atom2
n9.out → n32.formula2
n35.out → n32.atom3
n28.out → n32.formula3
n18.out → n17.a
n32.out → n17.b
n15.out → n13.a
n17.out → n13.b
n44.out → n45.assertion
n46.out → n45.atom1
n24.out → n45.formula1
n49.out → n50.assertion
n51.out → n50.atom1
n24.out → n50.formula1
n52.out → n50.atom2
n23.out → n50.formula2
n53.out → n54.assertion
n23.out → n56.a
n24.out → n56.b
n24.out → n57.a
n56.out → n57.b
n55.out → n54.atom1
n57.out → n54.formula1
n58.out → n54.atom2
n24.out → n54.formula2
n50.out → n48.a
n54.out → n48.b
n59.out → n60.assertion
n61.out → n60.atom1
n24.out → n60.formula1
n62.out → n60.atom2
n24.out → n60.formula2
n63.out → n60.atom3
n56.out → n60.formula3
n48.out → n47.a
n60.out → n47.b
n45.out → n43.a
n47.out → n43.b
n66.out → n67.assertion
n68.out → n67.atom1
n7.out → n67.formula1
n69.out → n67.atom2
n23.out → n67.formula2
n70.out → n71.assertion
n23.out → n73.a
n7.out → n73.b
n56.out → n74.a
n73.out → n74.b
n72.out → n71.atom1
n74.out → n71.formula1
n75.out → n71.atom2
n24.out → n71.formula2
n67.out → n65.a
n71.out → n65.b
n76.out → n77.assertion
n78.out → n77.atom1
n24.out → n77.formula1
n79.out → n77.atom2
n56.out → n77.formula2
n80.out → n77.atom3
n73.out → n77.formula3
n65.out → n64.a
n77.out → n64.b
n43.out → n42.a
n64.out → n42.b
n84.out → n85.assertion
n86.out → n85.atom1
n73.out → n85.formula1
n90.out → n91.assertion
n92.out → n91.atom1
n73.out → n91.formula1
n98.out → n99.assertion
n100.out → n99.atom1
n23.out → n99.formula1
n103.out → n104.assertion
n105.out → n104.atom1
n23.out → n104.formula1
n73.out → n107.a
n107.out → n108.a
n106.out → n104.atom2
n108.out → n104.formula2
n109.out → n110.assertion
n108.out → n112.a
n23.out → n112.b
n23.out → n113.a
n112.out → n113.b
n111.out → n110.atom1
n113.out → n110.formula1
n114.out → n110.atom2
n23.out → n110.formula2
n104.out → n102.a
n110.out → n102.b
n115.out → n116.assertion
n117.out → n116.atom1
n23.out → n116.formula1
n118.out → n116.atom2
n23.out → n116.formula2
n119.out → n116.atom3
n112.out → n116.formula3
n102.out → n101.a
n116.out → n101.b
n99.out → n97.a
n101.out → n97.b
n122.out → n123.assertion
n124.out → n123.atom1
n107.out → n123.formula1
n125.out → n123.atom2
n7.out → n123.formula2
n126.out → n127.assertion
n7.out → n129.a
n107.out → n129.b
n112.out → n130.a
n129.out → n130.b
n128.out → n127.atom1
n130.out → n127.formula1
n131.out → n127.atom2
n23.out → n127.formula2
n123.out → n121.a
n127.out → n121.b
n132.out → n133.assertion
n134.out → n133.atom1
n23.out → n133.formula1
n135.out → n133.atom2
n112.out → n133.formula2
n136.out → n133.atom3
n129.out → n133.formula3
n121.out → n120.a
n133.out → n120.b
n97.out → n96.a
n120.out → n96.b
n137.out → n138.assertion
n139.out → n138.atom1
n23.out → n138.formula1
n140.out → n138.atom2
n7.out → n138.formula2
n141.out → n138.atom3
n107.out → n138.formula3
n96.out → n95.a
n138.out → n95.b
n142.out → n143.assertion
n23.out → n145.a
n107.out → n145.b
n73.out → n146.a
n145.out → n146.b
n144.out → n143.atom1
n146.out → n143.formula1
n147.out → n143.atom2
n73.out → n143.formula2
n95.out → n94.a
n143.out → n94.b
n148.out → n149.assertion
n150.out → n149.atom1
n73.out → n149.formula1
n151.out → n149.atom2
n73.out → n149.formula2
n152.out → n149.atom3
n145.out → n149.formula3
n94.out → n93.a
n149.out → n93.b
n91.out → n89.a
n93.out → n89.b
n155.out → n156.assertion
n157.out → n156.atom1
n7.out → n156.formula1
n158.out → n156.atom2
n73.out → n156.formula2
n159.out → n160.assertion
n73.out → n162.a
n7.out → n162.b
n145.out → n163.a
n162.out → n163.b
n161.out → n160.atom1
n163.out → n160.formula1
n164.out → n160.atom2
n73.out → n160.formula2
n156.out → n154.a
n160.out → n154.b
n165.out → n166.assertion
n167.out → n166.atom1
n73.out → n166.formula1
n168.out → n166.atom2
n145.out → n166.formula2
n169.out → n166.atom3
n162.out → n166.formula3
n154.out → n153.a
n166.out → n153.b
n89.out → n88.a
n153.out → n88.b
n170.out → n171.assertion
n172.out → n171.atom1
n73.out → n171.formula1
n173.out → n171.atom2
n73.out → n171.formula2
n174.out → n171.atom3
n7.out → n171.formula3
n88.out → n87.a
n171.out → n87.b
n85.out → n83.a
n87.out → n83.b
n175.out → n176.assertion
n177.out → n176.atom1
n162.out → n176.formula1
n178.out → n176.atom2
n24.out → n176.formula2
n83.out → n82.a
n176.out → n82.b
n179.out → n180.assertion
n181.out → n180.atom1
n24.out → n180.formula1
n182.out → n180.atom2
n73.out → n180.formula2
n183.out → n180.atom3
n7.out → n180.formula3
n82.out → n81.a
n180.out → n81.b
n42.out → n41.a
n81.out → n41.b
n186.out → n187.assertion
n188.out → n187.atom1
n7.out → n187.formula1
n189.out → n187.atom2
n9.out → n187.formula2
n190.out → n191.assertion
n9.out → n193.a
n7.out → n193.b
n7.out → n194.a
n193.out → n194.b
n192.out → n191.atom1
n194.out → n191.formula1
n195.out → n191.atom2
n24.out → n191.formula2
n187.out → n185.a
n191.out → n185.b
n196.out → n197.assertion
n198.out → n197.atom1
n24.out → n197.formula1
n199.out → n197.atom2
n7.out → n197.formula2
n200.out → n197.atom3
n193.out → n197.formula3
n185.out → n184.a
n197.out → n184.b
n41.out → n40.a
n184.out → n40.b
n206.out → n207.assertion
n208.out → n207.atom1
n7.out → n207.formula1
n209.out → n207.atom2
n6.out → n207.formula2
n214.out → n215.assertion
n216.out → n215.atom1
n7.out → n215.formula1
n219.out → n220.assertion
n221.out → n220.atom1
n7.out → n220.formula1
n9.out → n223.a
n223.out → n224.a
n222.out → n220.atom2
n224.out → n220.formula2
n225.out → n226.assertion
n224.out → n228.a
n7.out → n228.b
n7.out → n229.a
n228.out → n229.b
n227.out → n226.atom1
n229.out → n226.formula1
n230.out → n226.atom2
n7.out → n226.formula2
n220.out → n218.a
n226.out → n218.b
n231.out → n232.assertion
n233.out → n232.atom1
n7.out → n232.formula1
n234.out → n232.atom2
n7.out → n232.formula2
n235.out → n232.atom3
n228.out → n232.formula3
n218.out → n217.a
n232.out → n217.b
n215.out → n213.a
n217.out → n213.b
n244.out → n245.assertion
n246.out → n245.atom1
n224.out → n245.formula1
n249.out → n250.assertion
n251.out → n250.atom1
n224.out → n250.formula1
n252.out → n250.atom2
n223.out → n250.formula2
n253.out → n254.assertion
n223.out → n256.a
n224.out → n256.b
n224.out → n257.a
n256.out → n257.b
n255.out → n254.atom1
n257.out → n254.formula1
n258.out → n254.atom2
n224.out → n254.formula2
n250.out → n248.a
n254.out → n248.b
n259.out → n260.assertion
n261.out → n260.atom1
n224.out → n260.formula1
n262.out → n260.atom2
n224.out → n260.formula2
n263.out → n260.atom3
n256.out → n260.formula3
n248.out → n247.a
n260.out → n247.b
n245.out → n243.a
n247.out → n243.b
n266.out → n267.assertion
n268.out → n267.atom1
n9.out → n267.formula1
n269.out → n267.atom2
n223.out → n267.formula2
n270.out → n271.assertion
n223.out → n273.a
n9.out → n273.b
n256.out → n274.a
n273.out → n274.b
n272.out → n271.atom1
n274.out → n271.formula1
n275.out → n271.atom2
n224.out → n271.formula2
n267.out → n265.a
n271.out → n265.b
n276.out → n277.assertion
n278.out → n277.atom1
n224.out → n277.formula1
n279.out → n277.atom2
n256.out → n277.formula2
n280.out → n277.atom3
n273.out → n277.formula3
n265.out → n264.a
n277.out → n264.b
n243.out → n242.a
n264.out → n242.b
n284.out → n285.assertion
n286.out → n285.atom1
n273.out → n285.formula1
n290.out → n291.assertion
n292.out → n291.atom1
n273.out → n291.formula1
n298.out → n299.assertion
n300.out → n299.atom1
n223.out → n299.formula1
n303.out → n304.assertion
n305.out → n304.atom1
n223.out → n304.formula1
n273.out → n307.a
n307.out → n308.a
n306.out → n304.atom2
n308.out → n304.formula2
n309.out → n310.assertion
n308.out → n312.a
n223.out → n312.b
n223.out → n313.a
n312.out → n313.b
n311.out → n310.atom1
n313.out → n310.formula1
n314.out → n310.atom2
n223.out → n310.formula2
n304.out → n302.a
n310.out → n302.b
n315.out → n316.assertion
n317.out → n316.atom1
n223.out → n316.formula1
n318.out → n316.atom2
n223.out → n316.formula2
n319.out → n316.atom3
n312.out → n316.formula3
n302.out → n301.a
n316.out → n301.b
n299.out → n297.a
n301.out → n297.b
n322.out → n323.assertion
n324.out → n323.atom1
n307.out → n323.formula1
n325.out → n323.atom2
n9.out → n323.formula2
n326.out → n327.assertion
n9.out → n329.a
n307.out → n329.b
n312.out → n330.a
n329.out → n330.b
n328.out → n327.atom1
n330.out → n327.formula1
n331.out → n327.atom2
n223.out → n327.formula2
n323.out → n321.a
n327.out → n321.b
n332.out → n333.assertion
n334.out → n333.atom1
n223.out → n333.formula1
n335.out → n333.atom2
n312.out → n333.formula2
n336.out → n333.atom3
n329.out → n333.formula3
n321.out → n320.a
n333.out → n320.b
n297.out → n296.a
n320.out → n296.b
n337.out → n338.assertion
n339.out → n338.atom1
n223.out → n338.formula1
n340.out → n338.atom2
n9.out → n338.formula2
n341.out → n338.atom3
n307.out → n338.formula3
n296.out → n295.a
n338.out → n295.b
n342.out → n343.assertion
n223.out → n345.a
n307.out → n345.b
n273.out → n346.a
n345.out → n346.b
n344.out → n343.atom1
n346.out → n343.formula1
n347.out → n343.atom2
n273.out → n343.formula2
n295.out → n294.a
n343.out → n294.b
n348.out → n349.assertion
n350.out → n349.atom1
n273.out → n349.formula1
n351.out → n349.atom2
n273.out → n349.formula2
n352.out → n349.atom3
n345.out → n349.formula3
n294.out → n293.a
n349.out → n293.b
n291.out → n289.a
n293.out → n289.b
n355.out → n356.assertion
n357.out → n356.atom1
n9.out → n356.formula1
n358.out → n356.atom2
n273.out → n356.formula2
n359.out → n360.assertion
n273.out → n362.a
n9.out → n362.b
n345.out → n363.a
n362.out → n363.b
n361.out → n360.atom1
n363.out → n360.formula1
n364.out → n360.atom2
n273.out → n360.formula2
n356.out → n354.a
n360.out → n354.b
n365.out → n366.assertion
n367.out → n366.atom1
n273.out → n366.formula1
n368.out → n366.atom2
n345.out → n366.formula2
n369.out → n366.atom3
n362.out → n366.formula3
n354.out → n353.a
n366.out → n353.b
n289.out → n288.a
n353.out → n288.b
n370.out → n371.assertion
n372.out → n371.atom1
n273.out → n371.formula1
n373.out → n371.atom2
n273.out → n371.formula2
n374.out → n371.atom3
n9.out → n371.formula3
n288.out → n287.a
n371.out → n287.b
n285.out → n283.a
n287.out → n283.b
n375.out → n376.assertion
n377.out → n376.atom1
n362.out → n376.formula1
n378.out → n376.atom2
n224.out → n376.formula2
n283.out → n282.a
n376.out → n282.b
n379.out → n380.assertion
n381.out → n380.atom1
n224.out → n380.formula1
n382.out → n380.atom2
n273.out → n380.formula2
n383.out → n380.atom3
n9.out → n380.formula3
n282.out → n281.a
n380.out → n281.b
n242.out → n241.a
n281.out → n241.b
n386.out → n387.assertion
n388.out → n387.atom1
n9.out → n387.formula1
n389.out → n387.atom2
n7.out → n387.formula2
n390.out → n391.assertion
n7.out → n393.a
n9.out → n393.b
n9.out → n394.a
n393.out → n394.b
n392.out → n391.atom1
n394.out → n391.formula1
n395.out → n391.atom2
n224.out → n391.formula2
n387.out → n385.a
n391.out → n385.b
n396.out → n397.assertion
n398.out → n397.atom1
n224.out → n397.formula1
n399.out → n397.atom2
n9.out → n397.formula2
n400.out → n397.atom3
n393.out → n397.formula3
n385.out → n384.a
n397.out → n384.b
n241.out → n240.a
n384.out → n240.b
n405.out → n406.assertion
n407.out → n406.atom1
n9.out → n406.formula1
n408.out → n409.assertion
n9.out → n411.a
n9.out → n411.b
n410.out → n409.atom1
n411.out → n409.formula1
n412.out → n409.atom2
n7.out → n409.formula2
n406.out → n404.a
n409.out → n404.b
n413.out → n414.assertion
n415.out → n414.atom1
n7.out → n414.formula1
n416.out → n414.atom2
n9.out → n414.formula2
n417.out → n414.atom3
n9.out → n414.formula3
n404.out → n403.a
n414.out → n403.b
n418.out → n419.assertion
n393.out → n421.a
n393.out → n421.b
n420.out → n419.atom1
n421.out → n419.formula1
n422.out → n419.atom2
n224.out → n419.formula2
n403.out → n402.a
n419.out → n402.b
n423.out → n424.assertion
n425.out → n424.atom1
n224.out → n424.formula1
n426.out → n424.atom2
n393.out → n424.formula2
n427.out → n424.atom3
n393.out → n424.formula3
n402.out → n401.a
n424.out → n401.b
n240.out → n239.a
n401.out → n239.b
n428.out → n429.assertion
n430.out → n429.atom1
n224.out → n429.formula1
n431.out → n429.atom2
n7.out → n429.formula2
n432.out → n429.atom3
n9.out → n429.formula3
n239.out → n238.a
n429.out → n238.b
n433.out → n434.assertion
n224.out → n436.a
n9.out → n436.b
n228.out → n437.a
n436.out → n437.b
n435.out → n434.atom1
n437.out → n434.formula1
n438.out → n434.atom2
n7.out → n434.formula2
n238.out → n237.a
n434.out → n237.b
n439.out → n440.assertion
n441.out → n440.atom1
n7.out → n440.formula1
n442.out → n440.atom2
n228.out → n440.formula2
n443.out → n440.atom3
n436.out → n440.formula3
n237.out → n236.a
n440.out → n236.b
n213.out → n212.a
n236.out → n212.b
n446.out → n447.assertion
n448.out → n447.atom1
n223.out → n447.formula1
n449.out → n447.atom2
n8.out → n447.formula2
n450.out → n451.assertion
n8.out → n453.a
n223.out → n453.b
n436.out → n454.a
n453.out → n454.b
n452.out → n451.atom1
n454.out → n451.formula1
n455.out → n451.atom2
n7.out → n451.formula2
n447.out → n445.a
n451.out → n445.b
n456.out → n457.assertion
n458.out → n457.atom1
n7.out → n457.formula1
n459.out → n457.atom2
n436.out → n457.formula2
n460.out → n457.atom3
n453.out → n457.formula3
n445.out → n444.a
n457.out → n444.b
n212.out → n211.a
n444.out → n211.b
n461.out → n462.assertion
n463.out → n462.atom1
n7.out → n462.formula1
n464.out → n462.atom2
n8.out → n462.formula2
n465.out → n462.atom3
n223.out → n462.formula3
n211.out → n210.a
n462.out → n210.b
n207.out → n205.a
n210.out → n205.b
n466.out → n467.assertion
n7.out → n469.a
n223.out → n469.b
n468.out → n467.atom1
n469.out → n467.formula1
n470.out → n467.atom2
n9.out → n467.formula2
n205.out → n204.a
n467.out → n204.b
n471.out → n472.assertion
n473.out → n472.atom1
n9.out → n472.formula1
n474.out → n472.atom2
n7.out → n472.formula2
n475.out → n472.atom3
n223.out → n472.formula3
n204.out → n203.a
n472.out → n203.b
n476.out → n477.assertion
n9.out → n479.a
n223.out → n479.b
n193.out → n480.a
n479.out → n480.b
n478.out → n477.atom1
n480.out → n477.formula1
n481.out → n477.atom2
n24.out → n477.formula2
n203.out → n202.a
n477.out → n202.b
n482.out → n483.assertion
n484.out → n483.atom1
n24.out → n483.formula1
n485.out → n483.atom2
n193.out → n483.formula2
n486.out → n483.atom3
n479.out → n483.formula3
n202.out → n201.a
n483.out → n201.b
n40.out → n39.a
n201.out → n39.b
n487.out → n488.assertion
n489.out → n488.atom1
n24.out → n488.formula1
n490.out → n488.atom2
n9.out → n488.formula2
n491.out → n488.atom3
n223.out → n488.formula3
n39.out → n38.a
n488.out → n38.b
n492.out → n493.assertion
n24.out → n495.a
n223.out → n495.b
n28.out → n496.a
n495.out → n496.b
n494.out → n493.atom1
n496.out → n493.formula1
n497.out → n493.atom2
n9.out → n493.formula2
n38.out → n37.a
n493.out → n37.b
n498.out → n499.assertion
n500.out → n499.atom1
n9.out → n499.formula1
n501.out → n499.atom2
n28.out → n499.formula2
n502.out → n499.atom3
n495.out → n499.formula3
n37.out → n36.a
n499.out → n36.b
n13.out → n12.a
n36.out → n12.b
n505.out → n506.assertion
n507.out → n506.atom1
n23.out → n506.formula1
n508.out → n506.atom2
n9.out → n506.formula2
n509.out → n510.assertion
n9.out → n512.a
n23.out → n512.b
n495.out → n513.a
n512.out → n513.b
n511.out → n510.atom1
n513.out → n510.formula1
n514.out → n510.atom2
n9.out → n510.formula2
n506.out → n504.a
n510.out → n504.b
n515.out → n516.assertion
n517.out → n516.atom1
n9.out → n516.formula1
n518.out → n516.atom2
n495.out → n516.formula2
n519.out → n516.atom3
n512.out → n516.formula3
n504.out → n503.a
n516.out → n503.b
n12.out → n11.a
n503.out → n11.b
n520.out → n521.assertion
n522.out → n521.atom1
n9.out → n521.formula1
n523.out → n521.atom2
n9.out → n521.formula2
n524.out → n521.atom3
n23.out → n521.formula3
n11.out → n10.a
n521.out → n10.b
n4.out → n2.a
n10.out → n2.b
n527.out → n528.assertion
n529.out → n528.atom1
n23.out → n528.formula1
n6.out → n531.a
n530.out → n528.atom2
n531.out → n528.formula2
n532.out → n533.assertion
n531.out → n535.a
n23.out → n535.b
n23.out → n536.a
n535.out → n536.b
n534.out → n533.atom1
n536.out → n533.formula1
n537.out → n533.atom2
n9.out → n533.formula2
n528.out → n526.a
n533.out → n526.b
n538.out → n539.assertion
n540.out → n539.atom1
n9.out → n539.formula1
n541.out → n539.atom2
n23.out → n539.formula2
n542.out → n539.atom3
n535.out → n539.formula3
n526.out → n525.a
n539.out → n525.b
n2.out → n1.a
n525.out → n1.b
n1.out → n543.proof
```

</details>

### *08 · 前件重排

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( Q → ( P → R ) ) )`
- 提示：用 A2 把前件换位，再接 A1。
- 参考解：97 个模块 / 144 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n98  [target]
n1  mp
n2  mp
n3  定理 *01
n4  subst
n5  atom P
n6  atom P
n7  atom Q
n8  atom R
n9  imp
n10  imp
n11  mp
n12  mp
n13  axiom A1
n14  subst
n15  atom P
n16  atom Q
n17  axiom A1
n18  subst
n19  atom P
n20  imp
n21  imp
n22  atom Q
n23  axiom A2
n24  subst
n25  atom P
n26  atom Q
n27  atom R
n28  mp
n29  mp
n30  mp
n31  mp
n32  定理 *03
n33  subst
n34  atom P
n35  atom Q
n36  axiom A1
n37  subst
n38  atom P
n39  imp
n40  imp
n41  atom Q
n42  mp
n43  mp
n44  mp
n45  mp
n46  定理 *04
n47  subst
n48  atom P
n49  atom Q
n50  atom R
n51  axiom A1
n52  subst
n53  atom P
n54  imp
n55  imp
n56  imp
n57  atom Q
n58  axiom A2
n59  subst
n60  atom P
n61  atom Q
n62  atom R
n63  axiom A1
n64  subst
n65  atom P
n66  imp
n67  imp
n68  atom Q
n69  axiom A2
n70  subst
n71  atom P
n72  atom Q
n73  atom R
n74  mp
n75  mp
n76  axiom A2
n77  subst
n78  atom P
n79  atom Q
n80  atom R
n81  axiom A1
n82  subst
n83  atom P
n84  imp
n85  imp
n86  imp
n87  atom Q
n88  axiom A2
n89  subst
n90  atom P
n91  atom Q
n92  atom R
n93  axiom A2
n94  subst
n95  atom P
n96  atom Q
n97  atom R

接线：
n3.out → n4.assertion
n7.out → n9.a
n8.out → n9.b
n6.out → n10.a
n9.out → n10.b
n5.out → n4.atom1
n10.out → n4.formula1
n13.out → n14.assertion
n15.out → n14.atom1
n10.out → n14.formula1
n16.out → n14.atom2
n7.out → n14.formula2
n17.out → n18.assertion
n7.out → n20.a
n10.out → n20.b
n10.out → n21.a
n20.out → n21.b
n19.out → n18.atom1
n21.out → n18.formula1
n22.out → n18.atom2
n10.out → n18.formula2
n14.out → n12.a
n18.out → n12.b
n23.out → n24.assertion
n25.out → n24.atom1
n10.out → n24.formula1
n26.out → n24.atom2
n10.out → n24.formula2
n27.out → n24.atom3
n20.out → n24.formula3
n12.out → n11.a
n24.out → n11.b
n4.out → n2.a
n11.out → n2.b
n32.out → n33.assertion
n34.out → n33.atom1
n7.out → n33.formula1
n35.out → n33.atom2
n8.out → n33.formula2
n36.out → n37.assertion
n9.out → n39.a
n8.out → n39.b
n7.out → n40.a
n39.out → n40.b
n38.out → n37.atom1
n40.out → n37.formula1
n41.out → n37.atom2
n10.out → n37.formula2
n33.out → n31.a
n37.out → n31.b
n46.out → n47.assertion
n48.out → n47.atom1
n9.out → n47.formula1
n49.out → n47.atom2
n8.out → n47.formula2
n50.out → n47.atom3
n6.out → n47.formula3
n51.out → n52.assertion
n6.out → n54.a
n8.out → n54.b
n10.out → n55.a
n54.out → n55.b
n39.out → n56.a
n55.out → n56.b
n53.out → n52.atom1
n56.out → n52.formula1
n57.out → n52.atom2
n7.out → n52.formula2
n47.out → n45.a
n52.out → n45.b
n58.out → n59.assertion
n60.out → n59.atom1
n7.out → n59.formula1
n61.out → n59.atom2
n39.out → n59.formula2
n62.out → n59.atom3
n55.out → n59.formula3
n45.out → n44.a
n59.out → n44.b
n63.out → n64.assertion
n7.out → n66.a
n55.out → n66.b
n40.out → n67.a
n66.out → n67.b
n65.out → n64.atom1
n67.out → n64.formula1
n68.out → n64.atom2
n10.out → n64.formula2
n44.out → n43.a
n64.out → n43.b
n69.out → n70.assertion
n71.out → n70.atom1
n10.out → n70.formula1
n72.out → n70.atom2
n40.out → n70.formula2
n73.out → n70.atom3
n66.out → n70.formula3
n43.out → n42.a
n70.out → n42.b
n31.out → n30.a
n42.out → n30.b
n76.out → n77.assertion
n78.out → n77.atom1
n7.out → n77.formula1
n79.out → n77.atom2
n10.out → n77.formula2
n80.out → n77.atom3
n54.out → n77.formula3
n81.out → n82.assertion
n7.out → n84.a
n54.out → n84.b
n20.out → n85.a
n84.out → n85.b
n66.out → n86.a
n85.out → n86.b
n83.out → n82.atom1
n86.out → n82.formula1
n87.out → n82.atom2
n10.out → n82.formula2
n77.out → n75.a
n82.out → n75.b
n88.out → n89.assertion
n90.out → n89.atom1
n10.out → n89.formula1
n91.out → n89.atom2
n66.out → n89.formula2
n92.out → n89.atom3
n85.out → n89.formula3
n75.out → n74.a
n89.out → n74.b
n30.out → n29.a
n74.out → n29.b
n93.out → n94.assertion
n95.out → n94.atom1
n10.out → n94.formula1
n96.out → n94.atom2
n20.out → n94.formula2
n97.out → n94.atom3
n84.out → n94.formula3
n29.out → n28.a
n94.out → n28.b
n2.out → n1.a
n28.out → n1.b
n1.out → n98.proof
```

</details>

### *09 · 逆否命题

- 目标：`⊢ ( ( P → Q ) → ( ¬ Q → ¬ P ) )`
- 提示：A3 给出 (¬B→¬A)→(A→B)，再用前件重排。
- 参考解：534 个模块 / 783 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n535  [target]
n1  mp
n2  mp
n3  mp
n4  mp
n5  定理 *01
n6  subst
n7  atom P
n8  atom P
n9  atom Q
n10  imp
n11  mp
n12  mp
n13  axiom A1
n14  subst
n15  atom P
n16  atom Q
n17  not
n18  not
n19  axiom A1
n20  subst
n21  atom P
n22  imp
n23  imp
n24  atom Q
n25  axiom A2
n26  subst
n27  atom P
n28  atom Q
n29  atom R
n30  mp
n31  mp
n32  mp
n33  mp
n34  mp
n35  mp
n36  mp
n37  mp
n38  定理 *01
n39  subst
n40  atom P
n41  mp
n42  mp
n43  axiom A1
n44  subst
n45  atom P
n46  atom Q
n47  axiom A1
n48  subst
n49  atom P
n50  imp
n51  imp
n52  atom Q
n53  axiom A2
n54  subst
n55  atom P
n56  atom Q
n57  atom R
n58  mp
n59  mp
n60  axiom A3
n61  subst
n62  atom P
n63  atom Q
n64  axiom A1
n65  subst
n66  atom P
n67  imp
n68  imp
n69  atom Q
n70  axiom A2
n71  subst
n72  atom P
n73  atom Q
n74  atom R
n75  mp
n76  mp
n77  mp
n78  定理 *01
n79  subst
n80  atom P
n81  mp
n82  mp
n83  mp
n84  定理 *01
n85  subst
n86  atom P
n87  mp
n88  mp
n89  mp
n90  mp
n91  mp
n92  定理 *01
n93  subst
n94  atom P
n95  mp
n96  mp
n97  axiom A1
n98  subst
n99  atom P
n100  atom Q
n101  not
n102  not
n103  axiom A1
n104  subst
n105  atom P
n106  imp
n107  imp
n108  atom Q
n109  axiom A2
n110  subst
n111  atom P
n112  atom Q
n113  atom R
n114  mp
n115  mp
n116  axiom A3
n117  subst
n118  atom P
n119  atom Q
n120  axiom A1
n121  subst
n122  atom P
n123  imp
n124  imp
n125  atom Q
n126  axiom A2
n127  subst
n128  atom P
n129  atom Q
n130  atom R
n131  axiom A2
n132  subst
n133  atom P
n134  atom Q
n135  atom R
n136  axiom A1
n137  subst
n138  atom P
n139  imp
n140  imp
n141  atom Q
n142  axiom A2
n143  subst
n144  atom P
n145  atom Q
n146  atom R
n147  mp
n148  mp
n149  axiom A3
n150  subst
n151  atom P
n152  atom Q
n153  axiom A1
n154  subst
n155  atom P
n156  imp
n157  imp
n158  atom Q
n159  axiom A2
n160  subst
n161  atom P
n162  atom Q
n163  atom R
n164  axiom A2
n165  subst
n166  atom P
n167  atom Q
n168  atom R
n169  axiom A1
n170  subst
n171  atom P
n172  atom Q
n173  axiom A2
n174  subst
n175  atom P
n176  atom Q
n177  atom R
n178  mp
n179  mp
n180  axiom A1
n181  subst
n182  atom P
n183  atom Q
n184  axiom A1
n185  subst
n186  atom P
n187  imp
n188  imp
n189  atom Q
n190  axiom A2
n191  subst
n192  atom P
n193  atom Q
n194  atom R
n195  mp
n196  mp
n197  mp
n198  定理 *01
n199  subst
n200  atom P
n201  axiom A2
n202  subst
n203  atom P
n204  atom Q
n205  atom R
n206  axiom A1
n207  subst
n208  atom P
n209  imp
n210  imp
n211  atom Q
n212  axiom A2
n213  subst
n214  atom P
n215  atom Q
n216  atom R
n217  axiom A2
n218  subst
n219  atom P
n220  atom Q
n221  atom R
n222  axiom A1
n223  subst
n224  atom P
n225  imp
n226  imp
n227  atom Q
n228  axiom A2
n229  subst
n230  atom P
n231  atom Q
n232  atom R
n233  mp
n234  mp
n235  mp
n236  mp
n237  mp
n238  定理 *01
n239  subst
n240  atom P
n241  mp
n242  mp
n243  mp
n244  mp
n245  定理 *01
n246  subst
n247  atom P
n248  mp
n249  mp
n250  axiom A1
n251  subst
n252  atom P
n253  atom Q
n254  not
n255  not
n256  not
n257  axiom A1
n258  subst
n259  atom P
n260  imp
n261  imp
n262  atom Q
n263  axiom A2
n264  subst
n265  atom P
n266  atom Q
n267  atom R
n268  mp
n269  mp
n270  mp
n271  mp
n272  mp
n273  mp
n274  mp
n275  mp
n276  定理 *01
n277  subst
n278  atom P
n279  mp
n280  mp
n281  axiom A1
n282  subst
n283  atom P
n284  atom Q
n285  axiom A1
n286  subst
n287  atom P
n288  imp
n289  imp
n290  atom Q
n291  axiom A2
n292  subst
n293  atom P
n294  atom Q
n295  atom R
n296  mp
n297  mp
n298  axiom A3
n299  subst
n300  atom P
n301  atom Q
n302  axiom A1
n303  subst
n304  atom P
n305  imp
n306  imp
n307  atom Q
n308  axiom A2
n309  subst
n310  atom P
n311  atom Q
n312  atom R
n313  mp
n314  mp
n315  mp
n316  定理 *01
n317  subst
n318  atom P
n319  mp
n320  mp
n321  mp
n322  定理 *01
n323  subst
n324  atom P
n325  mp
n326  mp
n327  mp
n328  mp
n329  mp
n330  定理 *01
n331  subst
n332  atom P
n333  mp
n334  mp
n335  axiom A1
n336  subst
n337  atom P
n338  atom Q
n339  not
n340  not
n341  axiom A1
n342  subst
n343  atom P
n344  imp
n345  imp
n346  atom Q
n347  axiom A2
n348  subst
n349  atom P
n350  atom Q
n351  atom R
n352  mp
n353  mp
n354  axiom A3
n355  subst
n356  atom P
n357  atom Q
n358  axiom A1
n359  subst
n360  atom P
n361  imp
n362  imp
n363  atom Q
n364  axiom A2
n365  subst
n366  atom P
n367  atom Q
n368  atom R
n369  axiom A2
n370  subst
n371  atom P
n372  atom Q
n373  atom R
n374  axiom A1
n375  subst
n376  atom P
n377  imp
n378  imp
n379  atom Q
n380  axiom A2
n381  subst
n382  atom P
n383  atom Q
n384  atom R
n385  mp
n386  mp
n387  axiom A3
n388  subst
n389  atom P
n390  atom Q
n391  axiom A1
n392  subst
n393  atom P
n394  imp
n395  imp
n396  atom Q
n397  axiom A2
n398  subst
n399  atom P
n400  atom Q
n401  atom R
n402  axiom A2
n403  subst
n404  atom P
n405  atom Q
n406  atom R
n407  axiom A1
n408  subst
n409  atom P
n410  atom Q
n411  axiom A2
n412  subst
n413  atom P
n414  atom Q
n415  atom R
n416  mp
n417  mp
n418  axiom A1
n419  subst
n420  atom P
n421  atom Q
n422  axiom A1
n423  subst
n424  atom P
n425  imp
n426  imp
n427  atom Q
n428  axiom A2
n429  subst
n430  atom P
n431  atom Q
n432  atom R
n433  mp
n434  mp
n435  mp
n436  mp
n437  定理 *01
n438  subst
n439  atom P
n440  axiom A1
n441  subst
n442  atom P
n443  imp
n444  atom Q
n445  axiom A2
n446  subst
n447  atom P
n448  atom Q
n449  atom R
n450  axiom A1
n451  subst
n452  atom P
n453  imp
n454  atom Q
n455  axiom A2
n456  subst
n457  atom P
n458  atom Q
n459  atom R
n460  axiom A2
n461  subst
n462  atom P
n463  atom Q
n464  atom R
n465  axiom A1
n466  subst
n467  atom P
n468  imp
n469  imp
n470  atom Q
n471  axiom A2
n472  subst
n473  atom P
n474  atom Q
n475  atom R
n476  mp
n477  mp
n478  axiom A3
n479  subst
n480  atom P
n481  atom Q
n482  axiom A1
n483  subst
n484  atom P
n485  imp
n486  imp
n487  atom Q
n488  axiom A2
n489  subst
n490  atom P
n491  atom Q
n492  atom R
n493  axiom A2
n494  subst
n495  atom P
n496  atom Q
n497  atom R
n498  axiom A1
n499  subst
n500  atom P
n501  atom Q
n502  axiom A2
n503  subst
n504  atom P
n505  atom Q
n506  atom R
n507  axiom A1
n508  subst
n509  atom P
n510  imp
n511  imp
n512  atom Q
n513  axiom A2
n514  subst
n515  atom P
n516  atom Q
n517  atom R
n518  mp
n519  mp
n520  axiom A3
n521  subst
n522  atom P
n523  atom Q
n524  axiom A1
n525  subst
n526  atom P
n527  imp
n528  imp
n529  atom Q
n530  axiom A2
n531  subst
n532  atom P
n533  atom Q
n534  atom R

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
n19.out → n20.assertion
n18.out → n22.a
n10.out → n22.b
n10.out → n23.a
n22.out → n23.b
n21.out → n20.atom1
n23.out → n20.formula1
n24.out → n20.atom2
n10.out → n20.formula2
n14.out → n12.a
n20.out → n12.b
n25.out → n26.assertion
n27.out → n26.atom1
n10.out → n26.formula1
n28.out → n26.atom2
n10.out → n26.formula2
n29.out → n26.atom3
n22.out → n26.formula3
n12.out → n11.a
n26.out → n11.b
n6.out → n4.a
n11.out → n4.b
n38.out → n39.assertion
n40.out → n39.atom1
n18.out → n39.formula1
n43.out → n44.assertion
n45.out → n44.atom1
n18.out → n44.formula1
n46.out → n44.atom2
n17.out → n44.formula2
n47.out → n48.assertion
n17.out → n50.a
n18.out → n50.b
n18.out → n51.a
n50.out → n51.b
n49.out → n48.atom1
n51.out → n48.formula1
n52.out → n48.atom2
n18.out → n48.formula2
n44.out → n42.a
n48.out → n42.b
n53.out → n54.assertion
n55.out → n54.atom1
n18.out → n54.formula1
n56.out → n54.atom2
n18.out → n54.formula2
n57.out → n54.atom3
n50.out → n54.formula3
n42.out → n41.a
n54.out → n41.b
n39.out → n37.a
n41.out → n37.b
n60.out → n61.assertion
n62.out → n61.atom1
n8.out → n61.formula1
n63.out → n61.atom2
n17.out → n61.formula2
n64.out → n65.assertion
n17.out → n67.a
n8.out → n67.b
n50.out → n68.a
n67.out → n68.b
n66.out → n65.atom1
n68.out → n65.formula1
n69.out → n65.atom2
n18.out → n65.formula2
n61.out → n59.a
n65.out → n59.b
n70.out → n71.assertion
n72.out → n71.atom1
n18.out → n71.formula1
n73.out → n71.atom2
n50.out → n71.formula2
n74.out → n71.atom3
n67.out → n71.formula3
n59.out → n58.a
n71.out → n58.b
n37.out → n36.a
n58.out → n36.b
n78.out → n79.assertion
n80.out → n79.atom1
n67.out → n79.formula1
n84.out → n85.assertion
n86.out → n85.atom1
n67.out → n85.formula1
n92.out → n93.assertion
n94.out → n93.atom1
n17.out → n93.formula1
n97.out → n98.assertion
n99.out → n98.atom1
n17.out → n98.formula1
n67.out → n101.a
n101.out → n102.a
n100.out → n98.atom2
n102.out → n98.formula2
n103.out → n104.assertion
n102.out → n106.a
n17.out → n106.b
n17.out → n107.a
n106.out → n107.b
n105.out → n104.atom1
n107.out → n104.formula1
n108.out → n104.atom2
n17.out → n104.formula2
n98.out → n96.a
n104.out → n96.b
n109.out → n110.assertion
n111.out → n110.atom1
n17.out → n110.formula1
n112.out → n110.atom2
n17.out → n110.formula2
n113.out → n110.atom3
n106.out → n110.formula3
n96.out → n95.a
n110.out → n95.b
n93.out → n91.a
n95.out → n91.b
n116.out → n117.assertion
n118.out → n117.atom1
n101.out → n117.formula1
n119.out → n117.atom2
n8.out → n117.formula2
n120.out → n121.assertion
n8.out → n123.a
n101.out → n123.b
n106.out → n124.a
n123.out → n124.b
n122.out → n121.atom1
n124.out → n121.formula1
n125.out → n121.atom2
n17.out → n121.formula2
n117.out → n115.a
n121.out → n115.b
n126.out → n127.assertion
n128.out → n127.atom1
n17.out → n127.formula1
n129.out → n127.atom2
n106.out → n127.formula2
n130.out → n127.atom3
n123.out → n127.formula3
n115.out → n114.a
n127.out → n114.b
n91.out → n90.a
n114.out → n90.b
n131.out → n132.assertion
n133.out → n132.atom1
n17.out → n132.formula1
n134.out → n132.atom2
n8.out → n132.formula2
n135.out → n132.atom3
n101.out → n132.formula3
n90.out → n89.a
n132.out → n89.b
n136.out → n137.assertion
n17.out → n139.a
n101.out → n139.b
n67.out → n140.a
n139.out → n140.b
n138.out → n137.atom1
n140.out → n137.formula1
n141.out → n137.atom2
n67.out → n137.formula2
n89.out → n88.a
n137.out → n88.b
n142.out → n143.assertion
n144.out → n143.atom1
n67.out → n143.formula1
n145.out → n143.atom2
n67.out → n143.formula2
n146.out → n143.atom3
n139.out → n143.formula3
n88.out → n87.a
n143.out → n87.b
n85.out → n83.a
n87.out → n83.b
n149.out → n150.assertion
n151.out → n150.atom1
n8.out → n150.formula1
n152.out → n150.atom2
n67.out → n150.formula2
n153.out → n154.assertion
n67.out → n156.a
n8.out → n156.b
n139.out → n157.a
n156.out → n157.b
n155.out → n154.atom1
n157.out → n154.formula1
n158.out → n154.atom2
n67.out → n154.formula2
n150.out → n148.a
n154.out → n148.b
n159.out → n160.assertion
n161.out → n160.atom1
n67.out → n160.formula1
n162.out → n160.atom2
n139.out → n160.formula2
n163.out → n160.atom3
n156.out → n160.formula3
n148.out → n147.a
n160.out → n147.b
n83.out → n82.a
n147.out → n82.b
n164.out → n165.assertion
n166.out → n165.atom1
n67.out → n165.formula1
n167.out → n165.atom2
n67.out → n165.formula2
n168.out → n165.atom3
n8.out → n165.formula3
n82.out → n81.a
n165.out → n81.b
n79.out → n77.a
n81.out → n77.b
n169.out → n170.assertion
n171.out → n170.atom1
n156.out → n170.formula1
n172.out → n170.atom2
n18.out → n170.formula2
n77.out → n76.a
n170.out → n76.b
n173.out → n174.assertion
n175.out → n174.atom1
n18.out → n174.formula1
n176.out → n174.atom2
n67.out → n174.formula2
n177.out → n174.atom3
n8.out → n174.formula3
n76.out → n75.a
n174.out → n75.b
n36.out → n35.a
n75.out → n35.b
n180.out → n181.assertion
n182.out → n181.atom1
n8.out → n181.formula1
n183.out → n181.atom2
n10.out → n181.formula2
n184.out → n185.assertion
n10.out → n187.a
n8.out → n187.b
n8.out → n188.a
n187.out → n188.b
n186.out → n185.atom1
n188.out → n185.formula1
n189.out → n185.atom2
n18.out → n185.formula2
n181.out → n179.a
n185.out → n179.b
n190.out → n191.assertion
n192.out → n191.atom1
n18.out → n191.formula1
n193.out → n191.atom2
n8.out → n191.formula2
n194.out → n191.atom3
n187.out → n191.formula3
n179.out → n178.a
n191.out → n178.b
n35.out → n34.a
n178.out → n34.b
n198.out → n199.assertion
n200.out → n199.atom1
n10.out → n199.formula1
n201.out → n202.assertion
n203.out → n202.atom1
n10.out → n202.formula1
n204.out → n202.atom2
n8.out → n202.formula2
n205.out → n202.atom3
n9.out → n202.formula3
n199.out → n197.a
n202.out → n197.b
n206.out → n207.assertion
n10.out → n209.a
n9.out → n209.b
n187.out → n210.a
n209.out → n210.b
n208.out → n207.atom1
n210.out → n207.formula1
n211.out → n207.atom2
n18.out → n207.formula2
n197.out → n196.a
n207.out → n196.b
n212.out → n213.assertion
n214.out → n213.atom1
n18.out → n213.formula1
n215.out → n213.atom2
n187.out → n213.formula2
n216.out → n213.atom3
n209.out → n213.formula3
n196.out → n195.a
n213.out → n195.b
n34.out → n33.a
n195.out → n33.b
n217.out → n218.assertion
n219.out → n218.atom1
n18.out → n218.formula1
n220.out → n218.atom2
n10.out → n218.formula2
n221.out → n218.atom3
n9.out → n218.formula3
n33.out → n32.a
n218.out → n32.b
n222.out → n223.assertion
n18.out → n225.a
n9.out → n225.b
n22.out → n226.a
n225.out → n226.b
n224.out → n223.atom1
n226.out → n223.formula1
n227.out → n223.atom2
n10.out → n223.formula2
n32.out → n31.a
n223.out → n31.b
n228.out → n229.assertion
n230.out → n229.atom1
n10.out → n229.formula1
n231.out → n229.atom2
n22.out → n229.formula2
n232.out → n229.atom3
n225.out → n229.formula3
n31.out → n30.a
n229.out → n30.b
n4.out → n3.a
n30.out → n3.b
n238.out → n239.assertion
n240.out → n239.atom1
n9.out → n239.formula1
n245.out → n246.assertion
n247.out → n246.atom1
n9.out → n246.formula1
n250.out → n251.assertion
n252.out → n251.atom1
n9.out → n251.formula1
n9.out → n254.a
n254.out → n255.a
n255.out → n256.a
n253.out → n251.atom2
n256.out → n251.formula2
n257.out → n258.assertion
n256.out → n260.a
n9.out → n260.b
n9.out → n261.a
n260.out → n261.b
n259.out → n258.atom1
n261.out → n258.formula1
n262.out → n258.atom2
n9.out → n258.formula2
n251.out → n249.a
n258.out → n249.b
n263.out → n264.assertion
n265.out → n264.atom1
n9.out → n264.formula1
n266.out → n264.atom2
n9.out → n264.formula2
n267.out → n264.atom3
n260.out → n264.formula3
n249.out → n248.a
n264.out → n248.b
n246.out → n244.a
n248.out → n244.b
n276.out → n277.assertion
n278.out → n277.atom1
n256.out → n277.formula1
n281.out → n282.assertion
n283.out → n282.atom1
n256.out → n282.formula1
n284.out → n282.atom2
n255.out → n282.formula2
n285.out → n286.assertion
n255.out → n288.a
n256.out → n288.b
n256.out → n289.a
n288.out → n289.b
n287.out → n286.atom1
n289.out → n286.formula1
n290.out → n286.atom2
n256.out → n286.formula2
n282.out → n280.a
n286.out → n280.b
n291.out → n292.assertion
n293.out → n292.atom1
n256.out → n292.formula1
n294.out → n292.atom2
n256.out → n292.formula2
n295.out → n292.atom3
n288.out → n292.formula3
n280.out → n279.a
n292.out → n279.b
n277.out → n275.a
n279.out → n275.b
n298.out → n299.assertion
n300.out → n299.atom1
n254.out → n299.formula1
n301.out → n299.atom2
n255.out → n299.formula2
n302.out → n303.assertion
n255.out → n305.a
n254.out → n305.b
n288.out → n306.a
n305.out → n306.b
n304.out → n303.atom1
n306.out → n303.formula1
n307.out → n303.atom2
n256.out → n303.formula2
n299.out → n297.a
n303.out → n297.b
n308.out → n309.assertion
n310.out → n309.atom1
n256.out → n309.formula1
n311.out → n309.atom2
n288.out → n309.formula2
n312.out → n309.atom3
n305.out → n309.formula3
n297.out → n296.a
n309.out → n296.b
n275.out → n274.a
n296.out → n274.b
n316.out → n317.assertion
n318.out → n317.atom1
n305.out → n317.formula1
n322.out → n323.assertion
n324.out → n323.atom1
n305.out → n323.formula1
n330.out → n331.assertion
n332.out → n331.atom1
n255.out → n331.formula1
n335.out → n336.assertion
n337.out → n336.atom1
n255.out → n336.formula1
n305.out → n339.a
n339.out → n340.a
n338.out → n336.atom2
n340.out → n336.formula2
n341.out → n342.assertion
n340.out → n344.a
n255.out → n344.b
n255.out → n345.a
n344.out → n345.b
n343.out → n342.atom1
n345.out → n342.formula1
n346.out → n342.atom2
n255.out → n342.formula2
n336.out → n334.a
n342.out → n334.b
n347.out → n348.assertion
n349.out → n348.atom1
n255.out → n348.formula1
n350.out → n348.atom2
n255.out → n348.formula2
n351.out → n348.atom3
n344.out → n348.formula3
n334.out → n333.a
n348.out → n333.b
n331.out → n329.a
n333.out → n329.b
n354.out → n355.assertion
n356.out → n355.atom1
n339.out → n355.formula1
n357.out → n355.atom2
n254.out → n355.formula2
n358.out → n359.assertion
n254.out → n361.a
n339.out → n361.b
n344.out → n362.a
n361.out → n362.b
n360.out → n359.atom1
n362.out → n359.formula1
n363.out → n359.atom2
n255.out → n359.formula2
n355.out → n353.a
n359.out → n353.b
n364.out → n365.assertion
n366.out → n365.atom1
n255.out → n365.formula1
n367.out → n365.atom2
n344.out → n365.formula2
n368.out → n365.atom3
n361.out → n365.formula3
n353.out → n352.a
n365.out → n352.b
n329.out → n328.a
n352.out → n328.b
n369.out → n370.assertion
n371.out → n370.atom1
n255.out → n370.formula1
n372.out → n370.atom2
n254.out → n370.formula2
n373.out → n370.atom3
n339.out → n370.formula3
n328.out → n327.a
n370.out → n327.b
n374.out → n375.assertion
n255.out → n377.a
n339.out → n377.b
n305.out → n378.a
n377.out → n378.b
n376.out → n375.atom1
n378.out → n375.formula1
n379.out → n375.atom2
n305.out → n375.formula2
n327.out → n326.a
n375.out → n326.b
n380.out → n381.assertion
n382.out → n381.atom1
n305.out → n381.formula1
n383.out → n381.atom2
n305.out → n381.formula2
n384.out → n381.atom3
n377.out → n381.formula3
n326.out → n325.a
n381.out → n325.b
n323.out → n321.a
n325.out → n321.b
n387.out → n388.assertion
n389.out → n388.atom1
n254.out → n388.formula1
n390.out → n388.atom2
n305.out → n388.formula2
n391.out → n392.assertion
n305.out → n394.a
n254.out → n394.b
n377.out → n395.a
n394.out → n395.b
n393.out → n392.atom1
n395.out → n392.formula1
n396.out → n392.atom2
n305.out → n392.formula2
n388.out → n386.a
n392.out → n386.b
n397.out → n398.assertion
n399.out → n398.atom1
n305.out → n398.formula1
n400.out → n398.atom2
n377.out → n398.formula2
n401.out → n398.atom3
n394.out → n398.formula3
n386.out → n385.a
n398.out → n385.b
n321.out → n320.a
n385.out → n320.b
n402.out → n403.assertion
n404.out → n403.atom1
n305.out → n403.formula1
n405.out → n403.atom2
n305.out → n403.formula2
n406.out → n403.atom3
n254.out → n403.formula3
n320.out → n319.a
n403.out → n319.b
n317.out → n315.a
n319.out → n315.b
n407.out → n408.assertion
n409.out → n408.atom1
n394.out → n408.formula1
n410.out → n408.atom2
n256.out → n408.formula2
n315.out → n314.a
n408.out → n314.b
n411.out → n412.assertion
n413.out → n412.atom1
n256.out → n412.formula1
n414.out → n412.atom2
n305.out → n412.formula2
n415.out → n412.atom3
n254.out → n412.formula3
n314.out → n313.a
n412.out → n313.b
n274.out → n273.a
n313.out → n273.b
n418.out → n419.assertion
n420.out → n419.atom1
n254.out → n419.formula1
n421.out → n419.atom2
n9.out → n419.formula2
n422.out → n423.assertion
n9.out → n425.a
n254.out → n425.b
n254.out → n426.a
n425.out → n426.b
n424.out → n423.atom1
n426.out → n423.formula1
n427.out → n423.atom2
n256.out → n423.formula2
n419.out → n417.a
n423.out → n417.b
n428.out → n429.assertion
n430.out → n429.atom1
n256.out → n429.formula1
n431.out → n429.atom2
n254.out → n429.formula2
n432.out → n429.atom3
n425.out → n429.formula3
n417.out → n416.a
n429.out → n416.b
n273.out → n272.a
n416.out → n272.b
n437.out → n438.assertion
n439.out → n438.atom1
n254.out → n438.formula1
n440.out → n441.assertion
n254.out → n443.a
n254.out → n443.b
n442.out → n441.atom1
n443.out → n441.formula1
n444.out → n441.atom2
n9.out → n441.formula2
n438.out → n436.a
n441.out → n436.b
n445.out → n446.assertion
n447.out → n446.atom1
n9.out → n446.formula1
n448.out → n446.atom2
n254.out → n446.formula2
n449.out → n446.atom3
n254.out → n446.formula3
n436.out → n435.a
n446.out → n435.b
n450.out → n451.assertion
n425.out → n453.a
n425.out → n453.b
n452.out → n451.atom1
n453.out → n451.formula1
n454.out → n451.atom2
n256.out → n451.formula2
n435.out → n434.a
n451.out → n434.b
n455.out → n456.assertion
n457.out → n456.atom1
n256.out → n456.formula1
n458.out → n456.atom2
n425.out → n456.formula2
n459.out → n456.atom3
n425.out → n456.formula3
n434.out → n433.a
n456.out → n433.b
n272.out → n271.a
n433.out → n271.b
n460.out → n461.assertion
n462.out → n461.atom1
n256.out → n461.formula1
n463.out → n461.atom2
n9.out → n461.formula2
n464.out → n461.atom3
n254.out → n461.formula3
n271.out → n270.a
n461.out → n270.b
n465.out → n466.assertion
n256.out → n468.a
n254.out → n468.b
n260.out → n469.a
n468.out → n469.b
n467.out → n466.atom1
n469.out → n466.formula1
n470.out → n466.atom2
n9.out → n466.formula2
n270.out → n269.a
n466.out → n269.b
n471.out → n472.assertion
n473.out → n472.atom1
n9.out → n472.formula1
n474.out → n472.atom2
n260.out → n472.formula2
n475.out → n472.atom3
n468.out → n472.formula3
n269.out → n268.a
n472.out → n268.b
n244.out → n243.a
n268.out → n243.b
n478.out → n479.assertion
n480.out → n479.atom1
n255.out → n479.formula1
n481.out → n479.atom2
n9.out → n479.formula2
n482.out → n483.assertion
n9.out → n485.a
n255.out → n485.b
n468.out → n486.a
n485.out → n486.b
n484.out → n483.atom1
n486.out → n483.formula1
n487.out → n483.atom2
n9.out → n483.formula2
n479.out → n477.a
n483.out → n477.b
n488.out → n489.assertion
n490.out → n489.atom1
n9.out → n489.formula1
n491.out → n489.atom2
n468.out → n489.formula2
n492.out → n489.atom3
n485.out → n489.formula3
n477.out → n476.a
n489.out → n476.b
n243.out → n242.a
n476.out → n242.b
n493.out → n494.assertion
n495.out → n494.atom1
n9.out → n494.formula1
n496.out → n494.atom2
n9.out → n494.formula2
n497.out → n494.atom3
n255.out → n494.formula3
n242.out → n241.a
n494.out → n241.b
n239.out → n237.a
n241.out → n237.b
n498.out → n499.assertion
n500.out → n499.atom1
n485.out → n499.formula1
n501.out → n499.atom2
n18.out → n499.formula2
n237.out → n236.a
n499.out → n236.b
n502.out → n503.assertion
n504.out → n503.atom1
n18.out → n503.formula1
n505.out → n503.atom2
n9.out → n503.formula2
n506.out → n503.atom3
n255.out → n503.formula3
n236.out → n235.a
n503.out → n235.b
n507.out → n508.assertion
n18.out → n510.a
n255.out → n510.b
n225.out → n511.a
n510.out → n511.b
n509.out → n508.atom1
n511.out → n508.formula1
n512.out → n508.atom2
n10.out → n508.formula2
n235.out → n234.a
n508.out → n234.b
n513.out → n514.assertion
n515.out → n514.atom1
n10.out → n514.formula1
n516.out → n514.atom2
n225.out → n514.formula2
n517.out → n514.atom3
n510.out → n514.formula3
n234.out → n233.a
n514.out → n233.b
n3.out → n2.a
n233.out → n2.b
n520.out → n521.assertion
n522.out → n521.atom1
n17.out → n521.formula1
n523.out → n521.atom2
n254.out → n521.formula2
n524.out → n525.assertion
n254.out → n527.a
n17.out → n527.b
n510.out → n528.a
n527.out → n528.b
n526.out → n525.atom1
n528.out → n525.formula1
n529.out → n525.atom2
n10.out → n525.formula2
n521.out → n519.a
n525.out → n519.b
n530.out → n531.assertion
n532.out → n531.atom1
n10.out → n531.formula1
n533.out → n531.atom2
n510.out → n531.formula2
n534.out → n531.atom3
n527.out → n531.formula3
n519.out → n518.a
n531.out → n518.b
n2.out → n1.a
n518.out → n1.b
n1.out → n535.proof
```

</details>

### *10 · 逆否（否定后件）

- 目标：`⊢ ( ( P → ¬ Q ) → ( Q → ¬ P ) )`
- 提示：把 B→¬A 写成 B→(A→¬A) 的形状，用 A3。
- 参考解：249 个模块 / 364 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n250  [target]
n1  mp
n2  mp
n3  mp
n4  定理 *01
n5  subst
n6  atom P
n7  atom P
n8  atom Q
n9  not
n10  imp
n11  mp
n12  mp
n13  axiom A1
n14  subst
n15  atom P
n16  atom Q
n17  not
n18  not
n19  axiom A1
n20  subst
n21  atom P
n22  imp
n23  imp
n24  atom Q
n25  axiom A2
n26  subst
n27  atom P
n28  atom Q
n29  atom R
n30  mp
n31  mp
n32  mp
n33  mp
n34  mp
n35  mp
n36  mp
n37  mp
n38  定理 *01
n39  subst
n40  atom P
n41  mp
n42  mp
n43  axiom A1
n44  subst
n45  atom P
n46  atom Q
n47  axiom A1
n48  subst
n49  atom P
n50  imp
n51  imp
n52  atom Q
n53  axiom A2
n54  subst
n55  atom P
n56  atom Q
n57  atom R
n58  mp
n59  mp
n60  axiom A3
n61  subst
n62  atom P
n63  atom Q
n64  axiom A1
n65  subst
n66  atom P
n67  imp
n68  imp
n69  atom Q
n70  axiom A2
n71  subst
n72  atom P
n73  atom Q
n74  atom R
n75  mp
n76  mp
n77  mp
n78  定理 *01
n79  subst
n80  atom P
n81  mp
n82  mp
n83  mp
n84  定理 *01
n85  subst
n86  atom P
n87  mp
n88  mp
n89  mp
n90  mp
n91  mp
n92  定理 *01
n93  subst
n94  atom P
n95  mp
n96  mp
n97  axiom A1
n98  subst
n99  atom P
n100  atom Q
n101  not
n102  not
n103  axiom A1
n104  subst
n105  atom P
n106  imp
n107  imp
n108  atom Q
n109  axiom A2
n110  subst
n111  atom P
n112  atom Q
n113  atom R
n114  mp
n115  mp
n116  axiom A3
n117  subst
n118  atom P
n119  atom Q
n120  axiom A1
n121  subst
n122  atom P
n123  imp
n124  imp
n125  atom Q
n126  axiom A2
n127  subst
n128  atom P
n129  atom Q
n130  atom R
n131  axiom A2
n132  subst
n133  atom P
n134  atom Q
n135  atom R
n136  axiom A1
n137  subst
n138  atom P
n139  imp
n140  imp
n141  atom Q
n142  axiom A2
n143  subst
n144  atom P
n145  atom Q
n146  atom R
n147  mp
n148  mp
n149  axiom A3
n150  subst
n151  atom P
n152  atom Q
n153  axiom A1
n154  subst
n155  atom P
n156  imp
n157  imp
n158  atom Q
n159  axiom A2
n160  subst
n161  atom P
n162  atom Q
n163  atom R
n164  axiom A2
n165  subst
n166  atom P
n167  atom Q
n168  atom R
n169  axiom A1
n170  subst
n171  atom P
n172  atom Q
n173  axiom A2
n174  subst
n175  atom P
n176  atom Q
n177  atom R
n178  mp
n179  mp
n180  axiom A1
n181  subst
n182  atom P
n183  atom Q
n184  axiom A1
n185  subst
n186  atom P
n187  imp
n188  imp
n189  atom Q
n190  axiom A2
n191  subst
n192  atom P
n193  atom Q
n194  atom R
n195  mp
n196  mp
n197  mp
n198  定理 *01
n199  subst
n200  atom P
n201  axiom A2
n202  subst
n203  atom P
n204  atom Q
n205  atom R
n206  axiom A1
n207  subst
n208  atom P
n209  imp
n210  imp
n211  atom Q
n212  axiom A2
n213  subst
n214  atom P
n215  atom Q
n216  atom R
n217  axiom A2
n218  subst
n219  atom P
n220  atom Q
n221  atom R
n222  axiom A1
n223  subst
n224  atom P
n225  imp
n226  imp
n227  atom Q
n228  axiom A2
n229  subst
n230  atom P
n231  atom Q
n232  atom R
n233  mp
n234  mp
n235  axiom A3
n236  subst
n237  atom P
n238  atom Q
n239  axiom A1
n240  subst
n241  atom P
n242  imp
n243  imp
n244  atom Q
n245  axiom A2
n246  subst
n247  atom P
n248  atom Q
n249  atom R

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
n19.out → n20.assertion
n18.out → n22.a
n10.out → n22.b
n10.out → n23.a
n22.out → n23.b
n21.out → n20.atom1
n23.out → n20.formula1
n24.out → n20.atom2
n10.out → n20.formula2
n14.out → n12.a
n20.out → n12.b
n25.out → n26.assertion
n27.out → n26.atom1
n10.out → n26.formula1
n28.out → n26.atom2
n10.out → n26.formula2
n29.out → n26.atom3
n22.out → n26.formula3
n12.out → n11.a
n26.out → n11.b
n5.out → n3.a
n11.out → n3.b
n38.out → n39.assertion
n40.out → n39.atom1
n18.out → n39.formula1
n43.out → n44.assertion
n45.out → n44.atom1
n18.out → n44.formula1
n46.out → n44.atom2
n17.out → n44.formula2
n47.out → n48.assertion
n17.out → n50.a
n18.out → n50.b
n18.out → n51.a
n50.out → n51.b
n49.out → n48.atom1
n51.out → n48.formula1
n52.out → n48.atom2
n18.out → n48.formula2
n44.out → n42.a
n48.out → n42.b
n53.out → n54.assertion
n55.out → n54.atom1
n18.out → n54.formula1
n56.out → n54.atom2
n18.out → n54.formula2
n57.out → n54.atom3
n50.out → n54.formula3
n42.out → n41.a
n54.out → n41.b
n39.out → n37.a
n41.out → n37.b
n60.out → n61.assertion
n62.out → n61.atom1
n7.out → n61.formula1
n63.out → n61.atom2
n17.out → n61.formula2
n64.out → n65.assertion
n17.out → n67.a
n7.out → n67.b
n50.out → n68.a
n67.out → n68.b
n66.out → n65.atom1
n68.out → n65.formula1
n69.out → n65.atom2
n18.out → n65.formula2
n61.out → n59.a
n65.out → n59.b
n70.out → n71.assertion
n72.out → n71.atom1
n18.out → n71.formula1
n73.out → n71.atom2
n50.out → n71.formula2
n74.out → n71.atom3
n67.out → n71.formula3
n59.out → n58.a
n71.out → n58.b
n37.out → n36.a
n58.out → n36.b
n78.out → n79.assertion
n80.out → n79.atom1
n67.out → n79.formula1
n84.out → n85.assertion
n86.out → n85.atom1
n67.out → n85.formula1
n92.out → n93.assertion
n94.out → n93.atom1
n17.out → n93.formula1
n97.out → n98.assertion
n99.out → n98.atom1
n17.out → n98.formula1
n67.out → n101.a
n101.out → n102.a
n100.out → n98.atom2
n102.out → n98.formula2
n103.out → n104.assertion
n102.out → n106.a
n17.out → n106.b
n17.out → n107.a
n106.out → n107.b
n105.out → n104.atom1
n107.out → n104.formula1
n108.out → n104.atom2
n17.out → n104.formula2
n98.out → n96.a
n104.out → n96.b
n109.out → n110.assertion
n111.out → n110.atom1
n17.out → n110.formula1
n112.out → n110.atom2
n17.out → n110.formula2
n113.out → n110.atom3
n106.out → n110.formula3
n96.out → n95.a
n110.out → n95.b
n93.out → n91.a
n95.out → n91.b
n116.out → n117.assertion
n118.out → n117.atom1
n101.out → n117.formula1
n119.out → n117.atom2
n7.out → n117.formula2
n120.out → n121.assertion
n7.out → n123.a
n101.out → n123.b
n106.out → n124.a
n123.out → n124.b
n122.out → n121.atom1
n124.out → n121.formula1
n125.out → n121.atom2
n17.out → n121.formula2
n117.out → n115.a
n121.out → n115.b
n126.out → n127.assertion
n128.out → n127.atom1
n17.out → n127.formula1
n129.out → n127.atom2
n106.out → n127.formula2
n130.out → n127.atom3
n123.out → n127.formula3
n115.out → n114.a
n127.out → n114.b
n91.out → n90.a
n114.out → n90.b
n131.out → n132.assertion
n133.out → n132.atom1
n17.out → n132.formula1
n134.out → n132.atom2
n7.out → n132.formula2
n135.out → n132.atom3
n101.out → n132.formula3
n90.out → n89.a
n132.out → n89.b
n136.out → n137.assertion
n17.out → n139.a
n101.out → n139.b
n67.out → n140.a
n139.out → n140.b
n138.out → n137.atom1
n140.out → n137.formula1
n141.out → n137.atom2
n67.out → n137.formula2
n89.out → n88.a
n137.out → n88.b
n142.out → n143.assertion
n144.out → n143.atom1
n67.out → n143.formula1
n145.out → n143.atom2
n67.out → n143.formula2
n146.out → n143.atom3
n139.out → n143.formula3
n88.out → n87.a
n143.out → n87.b
n85.out → n83.a
n87.out → n83.b
n149.out → n150.assertion
n151.out → n150.atom1
n7.out → n150.formula1
n152.out → n150.atom2
n67.out → n150.formula2
n153.out → n154.assertion
n67.out → n156.a
n7.out → n156.b
n139.out → n157.a
n156.out → n157.b
n155.out → n154.atom1
n157.out → n154.formula1
n158.out → n154.atom2
n67.out → n154.formula2
n150.out → n148.a
n154.out → n148.b
n159.out → n160.assertion
n161.out → n160.atom1
n67.out → n160.formula1
n162.out → n160.atom2
n139.out → n160.formula2
n163.out → n160.atom3
n156.out → n160.formula3
n148.out → n147.a
n160.out → n147.b
n83.out → n82.a
n147.out → n82.b
n164.out → n165.assertion
n166.out → n165.atom1
n67.out → n165.formula1
n167.out → n165.atom2
n67.out → n165.formula2
n168.out → n165.atom3
n7.out → n165.formula3
n82.out → n81.a
n165.out → n81.b
n79.out → n77.a
n81.out → n77.b
n169.out → n170.assertion
n171.out → n170.atom1
n156.out → n170.formula1
n172.out → n170.atom2
n18.out → n170.formula2
n77.out → n76.a
n170.out → n76.b
n173.out → n174.assertion
n175.out → n174.atom1
n18.out → n174.formula1
n176.out → n174.atom2
n67.out → n174.formula2
n177.out → n174.atom3
n7.out → n174.formula3
n76.out → n75.a
n174.out → n75.b
n36.out → n35.a
n75.out → n35.b
n180.out → n181.assertion
n182.out → n181.atom1
n7.out → n181.formula1
n183.out → n181.atom2
n10.out → n181.formula2
n184.out → n185.assertion
n10.out → n187.a
n7.out → n187.b
n7.out → n188.a
n187.out → n188.b
n186.out → n185.atom1
n188.out → n185.formula1
n189.out → n185.atom2
n18.out → n185.formula2
n181.out → n179.a
n185.out → n179.b
n190.out → n191.assertion
n192.out → n191.atom1
n18.out → n191.formula1
n193.out → n191.atom2
n7.out → n191.formula2
n194.out → n191.atom3
n187.out → n191.formula3
n179.out → n178.a
n191.out → n178.b
n35.out → n34.a
n178.out → n34.b
n198.out → n199.assertion
n200.out → n199.atom1
n10.out → n199.formula1
n201.out → n202.assertion
n203.out → n202.atom1
n10.out → n202.formula1
n204.out → n202.atom2
n7.out → n202.formula2
n205.out → n202.atom3
n9.out → n202.formula3
n199.out → n197.a
n202.out → n197.b
n206.out → n207.assertion
n10.out → n209.a
n9.out → n209.b
n187.out → n210.a
n209.out → n210.b
n208.out → n207.atom1
n210.out → n207.formula1
n211.out → n207.atom2
n18.out → n207.formula2
n197.out → n196.a
n207.out → n196.b
n212.out → n213.assertion
n214.out → n213.atom1
n18.out → n213.formula1
n215.out → n213.atom2
n187.out → n213.formula2
n216.out → n213.atom3
n209.out → n213.formula3
n196.out → n195.a
n213.out → n195.b
n34.out → n33.a
n195.out → n33.b
n217.out → n218.assertion
n219.out → n218.atom1
n18.out → n218.formula1
n220.out → n218.atom2
n10.out → n218.formula2
n221.out → n218.atom3
n9.out → n218.formula3
n33.out → n32.a
n218.out → n32.b
n222.out → n223.assertion
n18.out → n225.a
n9.out → n225.b
n22.out → n226.a
n225.out → n226.b
n224.out → n223.atom1
n226.out → n223.formula1
n227.out → n223.atom2
n10.out → n223.formula2
n32.out → n31.a
n223.out → n31.b
n228.out → n229.assertion
n230.out → n229.atom1
n10.out → n229.formula1
n231.out → n229.atom2
n22.out → n229.formula2
n232.out → n229.atom3
n225.out → n229.formula3
n31.out → n30.a
n229.out → n30.b
n3.out → n2.a
n30.out → n2.b
n235.out → n236.assertion
n237.out → n236.atom1
n17.out → n236.formula1
n238.out → n236.atom2
n8.out → n236.formula2
n239.out → n240.assertion
n8.out → n242.a
n17.out → n242.b
n225.out → n243.a
n242.out → n243.b
n241.out → n240.atom1
n243.out → n240.formula1
n244.out → n240.atom2
n10.out → n240.formula2
n236.out → n234.a
n240.out → n234.b
n245.out → n246.assertion
n247.out → n246.atom1
n10.out → n246.formula1
n248.out → n246.atom2
n225.out → n246.formula2
n249.out → n246.atom3
n242.out → n246.formula3
n234.out → n233.a
n246.out → n233.b
n2.out → n1.a
n233.out → n1.b
n1.out → n250.proof
```

</details>

### *11 · 逆否（否定前件）

- 目标：`⊢ ( ( ¬ P → Q ) → ( ¬ Q → P ) )`
- 提示：A3 的变体：把 ¬B 当前件。
- 参考解：311 个模块 / 454 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n312  [target]
n1  mp
n2  mp
n3  定理 *01
n4  subst
n5  atom P
n6  atom P
n7  not
n8  atom Q
n9  imp
n10  mp
n11  mp
n12  mp
n13  mp
n14  mp
n15  定理 *01
n16  subst
n17  atom P
n18  mp
n19  mp
n20  mp
n21  mp
n22  定理 *01
n23  subst
n24  atom P
n25  mp
n26  mp
n27  axiom A1
n28  subst
n29  atom P
n30  atom Q
n31  not
n32  not
n33  not
n34  axiom A1
n35  subst
n36  atom P
n37  imp
n38  imp
n39  atom Q
n40  axiom A2
n41  subst
n42  atom P
n43  atom Q
n44  atom R
n45  mp
n46  mp
n47  mp
n48  mp
n49  mp
n50  mp
n51  mp
n52  mp
n53  定理 *01
n54  subst
n55  atom P
n56  mp
n57  mp
n58  axiom A1
n59  subst
n60  atom P
n61  atom Q
n62  axiom A1
n63  subst
n64  atom P
n65  imp
n66  imp
n67  atom Q
n68  axiom A2
n69  subst
n70  atom P
n71  atom Q
n72  atom R
n73  mp
n74  mp
n75  axiom A3
n76  subst
n77  atom P
n78  atom Q
n79  axiom A1
n80  subst
n81  atom P
n82  imp
n83  imp
n84  atom Q
n85  axiom A2
n86  subst
n87  atom P
n88  atom Q
n89  atom R
n90  mp
n91  mp
n92  mp
n93  定理 *01
n94  subst
n95  atom P
n96  mp
n97  mp
n98  mp
n99  定理 *01
n100  subst
n101  atom P
n102  mp
n103  mp
n104  mp
n105  mp
n106  mp
n107  定理 *01
n108  subst
n109  atom P
n110  mp
n111  mp
n112  axiom A1
n113  subst
n114  atom P
n115  atom Q
n116  not
n117  not
n118  axiom A1
n119  subst
n120  atom P
n121  imp
n122  imp
n123  atom Q
n124  axiom A2
n125  subst
n126  atom P
n127  atom Q
n128  atom R
n129  mp
n130  mp
n131  axiom A3
n132  subst
n133  atom P
n134  atom Q
n135  axiom A1
n136  subst
n137  atom P
n138  imp
n139  imp
n140  atom Q
n141  axiom A2
n142  subst
n143  atom P
n144  atom Q
n145  atom R
n146  axiom A2
n147  subst
n148  atom P
n149  atom Q
n150  atom R
n151  axiom A1
n152  subst
n153  atom P
n154  imp
n155  imp
n156  atom Q
n157  axiom A2
n158  subst
n159  atom P
n160  atom Q
n161  atom R
n162  mp
n163  mp
n164  axiom A3
n165  subst
n166  atom P
n167  atom Q
n168  axiom A1
n169  subst
n170  atom P
n171  imp
n172  imp
n173  atom Q
n174  axiom A2
n175  subst
n176  atom P
n177  atom Q
n178  atom R
n179  axiom A2
n180  subst
n181  atom P
n182  atom Q
n183  atom R
n184  axiom A1
n185  subst
n186  atom P
n187  atom Q
n188  axiom A2
n189  subst
n190  atom P
n191  atom Q
n192  atom R
n193  mp
n194  mp
n195  axiom A1
n196  subst
n197  atom P
n198  atom Q
n199  axiom A1
n200  subst
n201  atom P
n202  imp
n203  imp
n204  atom Q
n205  axiom A2
n206  subst
n207  atom P
n208  atom Q
n209  atom R
n210  mp
n211  mp
n212  mp
n213  mp
n214  定理 *01
n215  subst
n216  atom P
n217  axiom A1
n218  subst
n219  atom P
n220  imp
n221  atom Q
n222  axiom A2
n223  subst
n224  atom P
n225  atom Q
n226  atom R
n227  axiom A1
n228  subst
n229  atom P
n230  imp
n231  atom Q
n232  axiom A2
n233  subst
n234  atom P
n235  atom Q
n236  atom R
n237  axiom A2
n238  subst
n239  atom P
n240  atom Q
n241  atom R
n242  axiom A1
n243  subst
n244  atom P
n245  imp
n246  imp
n247  atom Q
n248  axiom A2
n249  subst
n250  atom P
n251  atom Q
n252  atom R
n253  mp
n254  mp
n255  axiom A3
n256  subst
n257  atom P
n258  atom Q
n259  axiom A1
n260  subst
n261  atom P
n262  imp
n263  imp
n264  atom Q
n265  axiom A2
n266  subst
n267  atom P
n268  atom Q
n269  atom R
n270  axiom A2
n271  subst
n272  atom P
n273  atom Q
n274  atom R
n275  axiom A1
n276  subst
n277  atom P
n278  atom Q
n279  axiom A2
n280  subst
n281  atom P
n282  atom Q
n283  atom R
n284  axiom A1
n285  subst
n286  atom P
n287  imp
n288  imp
n289  atom Q
n290  axiom A2
n291  subst
n292  atom P
n293  atom Q
n294  atom R
n295  mp
n296  mp
n297  axiom A3
n298  subst
n299  atom P
n300  atom Q
n301  axiom A1
n302  subst
n303  atom P
n304  imp
n305  imp
n306  atom Q
n307  axiom A2
n308  subst
n309  atom P
n310  atom Q
n311  atom R

接线：
n3.out → n4.assertion
n6.out → n7.a
n7.out → n9.a
n8.out → n9.b
n5.out → n4.atom1
n9.out → n4.formula1
n15.out → n16.assertion
n17.out → n16.atom1
n8.out → n16.formula1
n22.out → n23.assertion
n24.out → n23.atom1
n8.out → n23.formula1
n27.out → n28.assertion
n29.out → n28.atom1
n8.out → n28.formula1
n8.out → n31.a
n31.out → n32.a
n32.out → n33.a
n30.out → n28.atom2
n33.out → n28.formula2
n34.out → n35.assertion
n33.out → n37.a
n8.out → n37.b
n8.out → n38.a
n37.out → n38.b
n36.out → n35.atom1
n38.out → n35.formula1
n39.out → n35.atom2
n8.out → n35.formula2
n28.out → n26.a
n35.out → n26.b
n40.out → n41.assertion
n42.out → n41.atom1
n8.out → n41.formula1
n43.out → n41.atom2
n8.out → n41.formula2
n44.out → n41.atom3
n37.out → n41.formula3
n26.out → n25.a
n41.out → n25.b
n23.out → n21.a
n25.out → n21.b
n53.out → n54.assertion
n55.out → n54.atom1
n33.out → n54.formula1
n58.out → n59.assertion
n60.out → n59.atom1
n33.out → n59.formula1
n61.out → n59.atom2
n32.out → n59.formula2
n62.out → n63.assertion
n32.out → n65.a
n33.out → n65.b
n33.out → n66.a
n65.out → n66.b
n64.out → n63.atom1
n66.out → n63.formula1
n67.out → n63.atom2
n33.out → n63.formula2
n59.out → n57.a
n63.out → n57.b
n68.out → n69.assertion
n70.out → n69.atom1
n33.out → n69.formula1
n71.out → n69.atom2
n33.out → n69.formula2
n72.out → n69.atom3
n65.out → n69.formula3
n57.out → n56.a
n69.out → n56.b
n54.out → n52.a
n56.out → n52.b
n75.out → n76.assertion
n77.out → n76.atom1
n31.out → n76.formula1
n78.out → n76.atom2
n32.out → n76.formula2
n79.out → n80.assertion
n32.out → n82.a
n31.out → n82.b
n65.out → n83.a
n82.out → n83.b
n81.out → n80.atom1
n83.out → n80.formula1
n84.out → n80.atom2
n33.out → n80.formula2
n76.out → n74.a
n80.out → n74.b
n85.out → n86.assertion
n87.out → n86.atom1
n33.out → n86.formula1
n88.out → n86.atom2
n65.out → n86.formula2
n89.out → n86.atom3
n82.out → n86.formula3
n74.out → n73.a
n86.out → n73.b
n52.out → n51.a
n73.out → n51.b
n93.out → n94.assertion
n95.out → n94.atom1
n82.out → n94.formula1
n99.out → n100.assertion
n101.out → n100.atom1
n82.out → n100.formula1
n107.out → n108.assertion
n109.out → n108.atom1
n32.out → n108.formula1
n112.out → n113.assertion
n114.out → n113.atom1
n32.out → n113.formula1
n82.out → n116.a
n116.out → n117.a
n115.out → n113.atom2
n117.out → n113.formula2
n118.out → n119.assertion
n117.out → n121.a
n32.out → n121.b
n32.out → n122.a
n121.out → n122.b
n120.out → n119.atom1
n122.out → n119.formula1
n123.out → n119.atom2
n32.out → n119.formula2
n113.out → n111.a
n119.out → n111.b
n124.out → n125.assertion
n126.out → n125.atom1
n32.out → n125.formula1
n127.out → n125.atom2
n32.out → n125.formula2
n128.out → n125.atom3
n121.out → n125.formula3
n111.out → n110.a
n125.out → n110.b
n108.out → n106.a
n110.out → n106.b
n131.out → n132.assertion
n133.out → n132.atom1
n116.out → n132.formula1
n134.out → n132.atom2
n31.out → n132.formula2
n135.out → n136.assertion
n31.out → n138.a
n116.out → n138.b
n121.out → n139.a
n138.out → n139.b
n137.out → n136.atom1
n139.out → n136.formula1
n140.out → n136.atom2
n32.out → n136.formula2
n132.out → n130.a
n136.out → n130.b
n141.out → n142.assertion
n143.out → n142.atom1
n32.out → n142.formula1
n144.out → n142.atom2
n121.out → n142.formula2
n145.out → n142.atom3
n138.out → n142.formula3
n130.out → n129.a
n142.out → n129.b
n106.out → n105.a
n129.out → n105.b
n146.out → n147.assertion
n148.out → n147.atom1
n32.out → n147.formula1
n149.out → n147.atom2
n31.out → n147.formula2
n150.out → n147.atom3
n116.out → n147.formula3
n105.out → n104.a
n147.out → n104.b
n151.out → n152.assertion
n32.out → n154.a
n116.out → n154.b
n82.out → n155.a
n154.out → n155.b
n153.out → n152.atom1
n155.out → n152.formula1
n156.out → n152.atom2
n82.out → n152.formula2
n104.out → n103.a
n152.out → n103.b
n157.out → n158.assertion
n159.out → n158.atom1
n82.out → n158.formula1
n160.out → n158.atom2
n82.out → n158.formula2
n161.out → n158.atom3
n154.out → n158.formula3
n103.out → n102.a
n158.out → n102.b
n100.out → n98.a
n102.out → n98.b
n164.out → n165.assertion
n166.out → n165.atom1
n31.out → n165.formula1
n167.out → n165.atom2
n82.out → n165.formula2
n168.out → n169.assertion
n82.out → n171.a
n31.out → n171.b
n154.out → n172.a
n171.out → n172.b
n170.out → n169.atom1
n172.out → n169.formula1
n173.out → n169.atom2
n82.out → n169.formula2
n165.out → n163.a
n169.out → n163.b
n174.out → n175.assertion
n176.out → n175.atom1
n82.out → n175.formula1
n177.out → n175.atom2
n154.out → n175.formula2
n178.out → n175.atom3
n171.out → n175.formula3
n163.out → n162.a
n175.out → n162.b
n98.out → n97.a
n162.out → n97.b
n179.out → n180.assertion
n181.out → n180.atom1
n82.out → n180.formula1
n182.out → n180.atom2
n82.out → n180.formula2
n183.out → n180.atom3
n31.out → n180.formula3
n97.out → n96.a
n180.out → n96.b
n94.out → n92.a
n96.out → n92.b
n184.out → n185.assertion
n186.out → n185.atom1
n171.out → n185.formula1
n187.out → n185.atom2
n33.out → n185.formula2
n92.out → n91.a
n185.out → n91.b
n188.out → n189.assertion
n190.out → n189.atom1
n33.out → n189.formula1
n191.out → n189.atom2
n82.out → n189.formula2
n192.out → n189.atom3
n31.out → n189.formula3
n91.out → n90.a
n189.out → n90.b
n51.out → n50.a
n90.out → n50.b
n195.out → n196.assertion
n197.out → n196.atom1
n31.out → n196.formula1
n198.out → n196.atom2
n8.out → n196.formula2
n199.out → n200.assertion
n8.out → n202.a
n31.out → n202.b
n31.out → n203.a
n202.out → n203.b
n201.out → n200.atom1
n203.out → n200.formula1
n204.out → n200.atom2
n33.out → n200.formula2
n196.out → n194.a
n200.out → n194.b
n205.out → n206.assertion
n207.out → n206.atom1
n33.out → n206.formula1
n208.out → n206.atom2
n31.out → n206.formula2
n209.out → n206.atom3
n202.out → n206.formula3
n194.out → n193.a
n206.out → n193.b
n50.out → n49.a
n193.out → n49.b
n214.out → n215.assertion
n216.out → n215.atom1
n31.out → n215.formula1
n217.out → n218.assertion
n31.out → n220.a
n31.out → n220.b
n219.out → n218.atom1
n220.out → n218.formula1
n221.out → n218.atom2
n8.out → n218.formula2
n215.out → n213.a
n218.out → n213.b
n222.out → n223.assertion
n224.out → n223.atom1
n8.out → n223.formula1
n225.out → n223.atom2
n31.out → n223.formula2
n226.out → n223.atom3
n31.out → n223.formula3
n213.out → n212.a
n223.out → n212.b
n227.out → n228.assertion
n202.out → n230.a
n202.out → n230.b
n229.out → n228.atom1
n230.out → n228.formula1
n231.out → n228.atom2
n33.out → n228.formula2
n212.out → n211.a
n228.out → n211.b
n232.out → n233.assertion
n234.out → n233.atom1
n33.out → n233.formula1
n235.out → n233.atom2
n202.out → n233.formula2
n236.out → n233.atom3
n202.out → n233.formula3
n211.out → n210.a
n233.out → n210.b
n49.out → n48.a
n210.out → n48.b
n237.out → n238.assertion
n239.out → n238.atom1
n33.out → n238.formula1
n240.out → n238.atom2
n8.out → n238.formula2
n241.out → n238.atom3
n31.out → n238.formula3
n48.out → n47.a
n238.out → n47.b
n242.out → n243.assertion
n33.out → n245.a
n31.out → n245.b
n37.out → n246.a
n245.out → n246.b
n244.out → n243.atom1
n246.out → n243.formula1
n247.out → n243.atom2
n8.out → n243.formula2
n47.out → n46.a
n243.out → n46.b
n248.out → n249.assertion
n250.out → n249.atom1
n8.out → n249.formula1
n251.out → n249.atom2
n37.out → n249.formula2
n252.out → n249.atom3
n245.out → n249.formula3
n46.out → n45.a
n249.out → n45.b
n21.out → n20.a
n45.out → n20.b
n255.out → n256.assertion
n257.out → n256.atom1
n32.out → n256.formula1
n258.out → n256.atom2
n8.out → n256.formula2
n259.out → n260.assertion
n8.out → n262.a
n32.out → n262.b
n245.out → n263.a
n262.out → n263.b
n261.out → n260.atom1
n263.out → n260.formula1
n264.out → n260.atom2
n8.out → n260.formula2
n256.out → n254.a
n260.out → n254.b
n265.out → n266.assertion
n267.out → n266.atom1
n8.out → n266.formula1
n268.out → n266.atom2
n245.out → n266.formula2
n269.out → n266.atom3
n262.out → n266.formula3
n254.out → n253.a
n266.out → n253.b
n20.out → n19.a
n253.out → n19.b
n270.out → n271.assertion
n272.out → n271.atom1
n8.out → n271.formula1
n273.out → n271.atom2
n8.out → n271.formula2
n274.out → n271.atom3
n32.out → n271.formula3
n19.out → n18.a
n271.out → n18.b
n16.out → n14.a
n18.out → n14.b
n275.out → n276.assertion
n277.out → n276.atom1
n262.out → n276.formula1
n278.out → n276.atom2
n7.out → n276.formula2
n14.out → n13.a
n276.out → n13.b
n279.out → n280.assertion
n281.out → n280.atom1
n7.out → n280.formula1
n282.out → n280.atom2
n8.out → n280.formula2
n283.out → n280.atom3
n32.out → n280.formula3
n13.out → n12.a
n280.out → n12.b
n284.out → n285.assertion
n7.out → n287.a
n32.out → n287.b
n9.out → n288.a
n287.out → n288.b
n286.out → n285.atom1
n288.out → n285.formula1
n289.out → n285.atom2
n9.out → n285.formula2
n12.out → n11.a
n285.out → n11.b
n290.out → n291.assertion
n292.out → n291.atom1
n9.out → n291.formula1
n293.out → n291.atom2
n9.out → n291.formula2
n294.out → n291.atom3
n287.out → n291.formula3
n11.out → n10.a
n291.out → n10.b
n4.out → n2.a
n10.out → n2.b
n297.out → n298.assertion
n299.out → n298.atom1
n6.out → n298.formula1
n300.out → n298.atom2
n31.out → n298.formula2
n301.out → n302.assertion
n31.out → n304.a
n6.out → n304.b
n287.out → n305.a
n304.out → n305.b
n303.out → n302.atom1
n305.out → n302.formula1
n306.out → n302.atom2
n9.out → n302.formula2
n298.out → n296.a
n302.out → n296.b
n307.out → n308.assertion
n309.out → n308.atom1
n9.out → n308.formula1
n310.out → n308.atom2
n287.out → n308.formula2
n311.out → n308.atom3
n304.out → n308.formula3
n296.out → n295.a
n308.out → n295.b
n2.out → n1.a
n295.out → n1.b
n1.out → n312.proof
```

</details>

### *12 · 双重否定引入

- 目标：`⊢ ( P → ¬ ¬ P )`
- 提示：用 A3 的逆否方向：¬A→¬A 得到 A→¬¬A。
- 参考解：262 个模块 / 383 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n263  [target]
n1  mp
n2  定理 *01
n3  subst
n4  atom P
n5  atom P
n6  mp
n7  mp
n8  mp
n9  mp
n10  定理 *01
n11  subst
n12  atom P
n13  mp
n14  mp
n15  axiom A1
n16  subst
n17  atom P
n18  atom Q
n19  not
n20  not
n21  not
n22  axiom A1
n23  subst
n24  atom P
n25  imp
n26  imp
n27  atom Q
n28  axiom A2
n29  subst
n30  atom P
n31  atom Q
n32  atom R
n33  mp
n34  mp
n35  mp
n36  mp
n37  mp
n38  mp
n39  mp
n40  mp
n41  定理 *01
n42  subst
n43  atom P
n44  mp
n45  mp
n46  axiom A1
n47  subst
n48  atom P
n49  atom Q
n50  axiom A1
n51  subst
n52  atom P
n53  imp
n54  imp
n55  atom Q
n56  axiom A2
n57  subst
n58  atom P
n59  atom Q
n60  atom R
n61  mp
n62  mp
n63  axiom A3
n64  subst
n65  atom P
n66  atom Q
n67  axiom A1
n68  subst
n69  atom P
n70  imp
n71  imp
n72  atom Q
n73  axiom A2
n74  subst
n75  atom P
n76  atom Q
n77  atom R
n78  mp
n79  mp
n80  mp
n81  定理 *01
n82  subst
n83  atom P
n84  mp
n85  mp
n86  mp
n87  定理 *01
n88  subst
n89  atom P
n90  mp
n91  mp
n92  mp
n93  mp
n94  mp
n95  定理 *01
n96  subst
n97  atom P
n98  mp
n99  mp
n100  axiom A1
n101  subst
n102  atom P
n103  atom Q
n104  not
n105  not
n106  axiom A1
n107  subst
n108  atom P
n109  imp
n110  imp
n111  atom Q
n112  axiom A2
n113  subst
n114  atom P
n115  atom Q
n116  atom R
n117  mp
n118  mp
n119  axiom A3
n120  subst
n121  atom P
n122  atom Q
n123  axiom A1
n124  subst
n125  atom P
n126  imp
n127  imp
n128  atom Q
n129  axiom A2
n130  subst
n131  atom P
n132  atom Q
n133  atom R
n134  axiom A2
n135  subst
n136  atom P
n137  atom Q
n138  atom R
n139  axiom A1
n140  subst
n141  atom P
n142  imp
n143  imp
n144  atom Q
n145  axiom A2
n146  subst
n147  atom P
n148  atom Q
n149  atom R
n150  mp
n151  mp
n152  axiom A3
n153  subst
n154  atom P
n155  atom Q
n156  axiom A1
n157  subst
n158  atom P
n159  imp
n160  imp
n161  atom Q
n162  axiom A2
n163  subst
n164  atom P
n165  atom Q
n166  atom R
n167  axiom A2
n168  subst
n169  atom P
n170  atom Q
n171  atom R
n172  axiom A1
n173  subst
n174  atom P
n175  atom Q
n176  axiom A2
n177  subst
n178  atom P
n179  atom Q
n180  atom R
n181  mp
n182  mp
n183  axiom A1
n184  subst
n185  atom P
n186  atom Q
n187  axiom A1
n188  subst
n189  atom P
n190  imp
n191  imp
n192  atom Q
n193  axiom A2
n194  subst
n195  atom P
n196  atom Q
n197  atom R
n198  mp
n199  mp
n200  mp
n201  mp
n202  定理 *01
n203  subst
n204  atom P
n205  axiom A1
n206  subst
n207  atom P
n208  imp
n209  atom Q
n210  axiom A2
n211  subst
n212  atom P
n213  atom Q
n214  atom R
n215  axiom A1
n216  subst
n217  atom P
n218  imp
n219  atom Q
n220  axiom A2
n221  subst
n222  atom P
n223  atom Q
n224  atom R
n225  axiom A2
n226  subst
n227  atom P
n228  atom Q
n229  atom R
n230  axiom A1
n231  subst
n232  atom P
n233  imp
n234  imp
n235  atom Q
n236  axiom A2
n237  subst
n238  atom P
n239  atom Q
n240  atom R
n241  mp
n242  mp
n243  axiom A3
n244  subst
n245  atom P
n246  atom Q
n247  axiom A1
n248  subst
n249  atom P
n250  imp
n251  imp
n252  atom Q
n253  axiom A2
n254  subst
n255  atom P
n256  atom Q
n257  atom R
n258  axiom A2
n259  subst
n260  atom P
n261  atom Q
n262  atom R

接线：
n2.out → n3.assertion
n4.out → n3.atom1
n5.out → n3.formula1
n10.out → n11.assertion
n12.out → n11.atom1
n5.out → n11.formula1
n15.out → n16.assertion
n17.out → n16.atom1
n5.out → n16.formula1
n5.out → n19.a
n19.out → n20.a
n20.out → n21.a
n18.out → n16.atom2
n21.out → n16.formula2
n22.out → n23.assertion
n21.out → n25.a
n5.out → n25.b
n5.out → n26.a
n25.out → n26.b
n24.out → n23.atom1
n26.out → n23.formula1
n27.out → n23.atom2
n5.out → n23.formula2
n16.out → n14.a
n23.out → n14.b
n28.out → n29.assertion
n30.out → n29.atom1
n5.out → n29.formula1
n31.out → n29.atom2
n5.out → n29.formula2
n32.out → n29.atom3
n25.out → n29.formula3
n14.out → n13.a
n29.out → n13.b
n11.out → n9.a
n13.out → n9.b
n41.out → n42.assertion
n43.out → n42.atom1
n21.out → n42.formula1
n46.out → n47.assertion
n48.out → n47.atom1
n21.out → n47.formula1
n49.out → n47.atom2
n20.out → n47.formula2
n50.out → n51.assertion
n20.out → n53.a
n21.out → n53.b
n21.out → n54.a
n53.out → n54.b
n52.out → n51.atom1
n54.out → n51.formula1
n55.out → n51.atom2
n21.out → n51.formula2
n47.out → n45.a
n51.out → n45.b
n56.out → n57.assertion
n58.out → n57.atom1
n21.out → n57.formula1
n59.out → n57.atom2
n21.out → n57.formula2
n60.out → n57.atom3
n53.out → n57.formula3
n45.out → n44.a
n57.out → n44.b
n42.out → n40.a
n44.out → n40.b
n63.out → n64.assertion
n65.out → n64.atom1
n19.out → n64.formula1
n66.out → n64.atom2
n20.out → n64.formula2
n67.out → n68.assertion
n20.out → n70.a
n19.out → n70.b
n53.out → n71.a
n70.out → n71.b
n69.out → n68.atom1
n71.out → n68.formula1
n72.out → n68.atom2
n21.out → n68.formula2
n64.out → n62.a
n68.out → n62.b
n73.out → n74.assertion
n75.out → n74.atom1
n21.out → n74.formula1
n76.out → n74.atom2
n53.out → n74.formula2
n77.out → n74.atom3
n70.out → n74.formula3
n62.out → n61.a
n74.out → n61.b
n40.out → n39.a
n61.out → n39.b
n81.out → n82.assertion
n83.out → n82.atom1
n70.out → n82.formula1
n87.out → n88.assertion
n89.out → n88.atom1
n70.out → n88.formula1
n95.out → n96.assertion
n97.out → n96.atom1
n20.out → n96.formula1
n100.out → n101.assertion
n102.out → n101.atom1
n20.out → n101.formula1
n70.out → n104.a
n104.out → n105.a
n103.out → n101.atom2
n105.out → n101.formula2
n106.out → n107.assertion
n105.out → n109.a
n20.out → n109.b
n20.out → n110.a
n109.out → n110.b
n108.out → n107.atom1
n110.out → n107.formula1
n111.out → n107.atom2
n20.out → n107.formula2
n101.out → n99.a
n107.out → n99.b
n112.out → n113.assertion
n114.out → n113.atom1
n20.out → n113.formula1
n115.out → n113.atom2
n20.out → n113.formula2
n116.out → n113.atom3
n109.out → n113.formula3
n99.out → n98.a
n113.out → n98.b
n96.out → n94.a
n98.out → n94.b
n119.out → n120.assertion
n121.out → n120.atom1
n104.out → n120.formula1
n122.out → n120.atom2
n19.out → n120.formula2
n123.out → n124.assertion
n19.out → n126.a
n104.out → n126.b
n109.out → n127.a
n126.out → n127.b
n125.out → n124.atom1
n127.out → n124.formula1
n128.out → n124.atom2
n20.out → n124.formula2
n120.out → n118.a
n124.out → n118.b
n129.out → n130.assertion
n131.out → n130.atom1
n20.out → n130.formula1
n132.out → n130.atom2
n109.out → n130.formula2
n133.out → n130.atom3
n126.out → n130.formula3
n118.out → n117.a
n130.out → n117.b
n94.out → n93.a
n117.out → n93.b
n134.out → n135.assertion
n136.out → n135.atom1
n20.out → n135.formula1
n137.out → n135.atom2
n19.out → n135.formula2
n138.out → n135.atom3
n104.out → n135.formula3
n93.out → n92.a
n135.out → n92.b
n139.out → n140.assertion
n20.out → n142.a
n104.out → n142.b
n70.out → n143.a
n142.out → n143.b
n141.out → n140.atom1
n143.out → n140.formula1
n144.out → n140.atom2
n70.out → n140.formula2
n92.out → n91.a
n140.out → n91.b
n145.out → n146.assertion
n147.out → n146.atom1
n70.out → n146.formula1
n148.out → n146.atom2
n70.out → n146.formula2
n149.out → n146.atom3
n142.out → n146.formula3
n91.out → n90.a
n146.out → n90.b
n88.out → n86.a
n90.out → n86.b
n152.out → n153.assertion
n154.out → n153.atom1
n19.out → n153.formula1
n155.out → n153.atom2
n70.out → n153.formula2
n156.out → n157.assertion
n70.out → n159.a
n19.out → n159.b
n142.out → n160.a
n159.out → n160.b
n158.out → n157.atom1
n160.out → n157.formula1
n161.out → n157.atom2
n70.out → n157.formula2
n153.out → n151.a
n157.out → n151.b
n162.out → n163.assertion
n164.out → n163.atom1
n70.out → n163.formula1
n165.out → n163.atom2
n142.out → n163.formula2
n166.out → n163.atom3
n159.out → n163.formula3
n151.out → n150.a
n163.out → n150.b
n86.out → n85.a
n150.out → n85.b
n167.out → n168.assertion
n169.out → n168.atom1
n70.out → n168.formula1
n170.out → n168.atom2
n70.out → n168.formula2
n171.out → n168.atom3
n19.out → n168.formula3
n85.out → n84.a
n168.out → n84.b
n82.out → n80.a
n84.out → n80.b
n172.out → n173.assertion
n174.out → n173.atom1
n159.out → n173.formula1
n175.out → n173.atom2
n21.out → n173.formula2
n80.out → n79.a
n173.out → n79.b
n176.out → n177.assertion
n178.out → n177.atom1
n21.out → n177.formula1
n179.out → n177.atom2
n70.out → n177.formula2
n180.out → n177.atom3
n19.out → n177.formula3
n79.out → n78.a
n177.out → n78.b
n39.out → n38.a
n78.out → n38.b
n183.out → n184.assertion
n185.out → n184.atom1
n19.out → n184.formula1
n186.out → n184.atom2
n5.out → n184.formula2
n187.out → n188.assertion
n5.out → n190.a
n19.out → n190.b
n19.out → n191.a
n190.out → n191.b
n189.out → n188.atom1
n191.out → n188.formula1
n192.out → n188.atom2
n21.out → n188.formula2
n184.out → n182.a
n188.out → n182.b
n193.out → n194.assertion
n195.out → n194.atom1
n21.out → n194.formula1
n196.out → n194.atom2
n19.out → n194.formula2
n197.out → n194.atom3
n190.out → n194.formula3
n182.out → n181.a
n194.out → n181.b
n38.out → n37.a
n181.out → n37.b
n202.out → n203.assertion
n204.out → n203.atom1
n19.out → n203.formula1
n205.out → n206.assertion
n19.out → n208.a
n19.out → n208.b
n207.out → n206.atom1
n208.out → n206.formula1
n209.out → n206.atom2
n5.out → n206.formula2
n203.out → n201.a
n206.out → n201.b
n210.out → n211.assertion
n212.out → n211.atom1
n5.out → n211.formula1
n213.out → n211.atom2
n19.out → n211.formula2
n214.out → n211.atom3
n19.out → n211.formula3
n201.out → n200.a
n211.out → n200.b
n215.out → n216.assertion
n190.out → n218.a
n190.out → n218.b
n217.out → n216.atom1
n218.out → n216.formula1
n219.out → n216.atom2
n21.out → n216.formula2
n200.out → n199.a
n216.out → n199.b
n220.out → n221.assertion
n222.out → n221.atom1
n21.out → n221.formula1
n223.out → n221.atom2
n190.out → n221.formula2
n224.out → n221.atom3
n190.out → n221.formula3
n199.out → n198.a
n221.out → n198.b
n37.out → n36.a
n198.out → n36.b
n225.out → n226.assertion
n227.out → n226.atom1
n21.out → n226.formula1
n228.out → n226.atom2
n5.out → n226.formula2
n229.out → n226.atom3
n19.out → n226.formula3
n36.out → n35.a
n226.out → n35.b
n230.out → n231.assertion
n21.out → n233.a
n19.out → n233.b
n25.out → n234.a
n233.out → n234.b
n232.out → n231.atom1
n234.out → n231.formula1
n235.out → n231.atom2
n5.out → n231.formula2
n35.out → n34.a
n231.out → n34.b
n236.out → n237.assertion
n238.out → n237.atom1
n5.out → n237.formula1
n239.out → n237.atom2
n25.out → n237.formula2
n240.out → n237.atom3
n233.out → n237.formula3
n34.out → n33.a
n237.out → n33.b
n9.out → n8.a
n33.out → n8.b
n243.out → n244.assertion
n245.out → n244.atom1
n20.out → n244.formula1
n246.out → n244.atom2
n5.out → n244.formula2
n247.out → n248.assertion
n5.out → n250.a
n20.out → n250.b
n233.out → n251.a
n250.out → n251.b
n249.out → n248.atom1
n251.out → n248.formula1
n252.out → n248.atom2
n5.out → n248.formula2
n244.out → n242.a
n248.out → n242.b
n253.out → n254.assertion
n255.out → n254.atom1
n5.out → n254.formula1
n256.out → n254.atom2
n233.out → n254.formula2
n257.out → n254.atom3
n250.out → n254.formula3
n242.out → n241.a
n254.out → n241.b
n8.out → n7.a
n241.out → n7.b
n258.out → n259.assertion
n260.out → n259.atom1
n5.out → n259.formula1
n261.out → n259.atom2
n5.out → n259.formula2
n262.out → n259.atom3
n20.out → n259.formula3
n7.out → n6.a
n259.out → n6.b
n3.out → n1.a
n6.out → n1.b
n1.out → n263.proof
```

</details>

### *13 · 双重否定消去

- 目标：`⊢ ( ¬ ¬ P → P )`
- 提示：先证 ¬¬A→(¬A→¬¬A)，再用反证法。
- 参考解：146 个模块 / 212 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n147  [target]
n1  mp
n2  mp
n3  mp
n4  定理 *01
n5  subst
n6  atom P
n7  atom P
n8  not
n9  not
n10  mp
n11  mp
n12  axiom A1
n13  subst
n14  atom P
n15  atom Q
n16  axiom A1
n17  subst
n18  atom P
n19  imp
n20  imp
n21  atom Q
n22  axiom A2
n23  subst
n24  atom P
n25  atom Q
n26  atom R
n27  mp
n28  mp
n29  axiom A3
n30  subst
n31  atom P
n32  atom Q
n33  axiom A1
n34  subst
n35  atom P
n36  imp
n37  imp
n38  atom Q
n39  axiom A2
n40  subst
n41  atom P
n42  atom Q
n43  atom R
n44  mp
n45  mp
n46  mp
n47  定理 *01
n48  subst
n49  atom P
n50  mp
n51  mp
n52  mp
n53  定理 *01
n54  subst
n55  atom P
n56  mp
n57  mp
n58  mp
n59  mp
n60  mp
n61  定理 *01
n62  subst
n63  atom P
n64  mp
n65  mp
n66  axiom A1
n67  subst
n68  atom P
n69  atom Q
n70  not
n71  not
n72  axiom A1
n73  subst
n74  atom P
n75  imp
n76  imp
n77  atom Q
n78  axiom A2
n79  subst
n80  atom P
n81  atom Q
n82  atom R
n83  mp
n84  mp
n85  axiom A3
n86  subst
n87  atom P
n88  atom Q
n89  axiom A1
n90  subst
n91  atom P
n92  imp
n93  imp
n94  atom Q
n95  axiom A2
n96  subst
n97  atom P
n98  atom Q
n99  atom R
n100  axiom A2
n101  subst
n102  atom P
n103  atom Q
n104  atom R
n105  axiom A1
n106  subst
n107  atom P
n108  imp
n109  imp
n110  atom Q
n111  axiom A2
n112  subst
n113  atom P
n114  atom Q
n115  atom R
n116  mp
n117  mp
n118  axiom A3
n119  subst
n120  atom P
n121  atom Q
n122  axiom A1
n123  subst
n124  atom P
n125  imp
n126  imp
n127  atom Q
n128  axiom A2
n129  subst
n130  atom P
n131  atom Q
n132  atom R
n133  axiom A2
n134  subst
n135  atom P
n136  atom Q
n137  atom R
n138  axiom A1
n139  subst
n140  atom P
n141  atom Q
n142  axiom A2
n143  subst
n144  atom P
n145  atom Q
n146  atom R

接线：
n4.out → n5.assertion
n7.out → n8.a
n8.out → n9.a
n6.out → n5.atom1
n9.out → n5.formula1
n12.out → n13.assertion
n14.out → n13.atom1
n9.out → n13.formula1
n15.out → n13.atom2
n8.out → n13.formula2
n16.out → n17.assertion
n8.out → n19.a
n9.out → n19.b
n9.out → n20.a
n19.out → n20.b
n18.out → n17.atom1
n20.out → n17.formula1
n21.out → n17.atom2
n9.out → n17.formula2
n13.out → n11.a
n17.out → n11.b
n22.out → n23.assertion
n24.out → n23.atom1
n9.out → n23.formula1
n25.out → n23.atom2
n9.out → n23.formula2
n26.out → n23.atom3
n19.out → n23.formula3
n11.out → n10.a
n23.out → n10.b
n5.out → n3.a
n10.out → n3.b
n29.out → n30.assertion
n31.out → n30.atom1
n7.out → n30.formula1
n32.out → n30.atom2
n8.out → n30.formula2
n33.out → n34.assertion
n8.out → n36.a
n7.out → n36.b
n19.out → n37.a
n36.out → n37.b
n35.out → n34.atom1
n37.out → n34.formula1
n38.out → n34.atom2
n9.out → n34.formula2
n30.out → n28.a
n34.out → n28.b
n39.out → n40.assertion
n41.out → n40.atom1
n9.out → n40.formula1
n42.out → n40.atom2
n19.out → n40.formula2
n43.out → n40.atom3
n36.out → n40.formula3
n28.out → n27.a
n40.out → n27.b
n3.out → n2.a
n27.out → n2.b
n47.out → n48.assertion
n49.out → n48.atom1
n36.out → n48.formula1
n53.out → n54.assertion
n55.out → n54.atom1
n36.out → n54.formula1
n61.out → n62.assertion
n63.out → n62.atom1
n8.out → n62.formula1
n66.out → n67.assertion
n68.out → n67.atom1
n8.out → n67.formula1
n36.out → n70.a
n70.out → n71.a
n69.out → n67.atom2
n71.out → n67.formula2
n72.out → n73.assertion
n71.out → n75.a
n8.out → n75.b
n8.out → n76.a
n75.out → n76.b
n74.out → n73.atom1
n76.out → n73.formula1
n77.out → n73.atom2
n8.out → n73.formula2
n67.out → n65.a
n73.out → n65.b
n78.out → n79.assertion
n80.out → n79.atom1
n8.out → n79.formula1
n81.out → n79.atom2
n8.out → n79.formula2
n82.out → n79.atom3
n75.out → n79.formula3
n65.out → n64.a
n79.out → n64.b
n62.out → n60.a
n64.out → n60.b
n85.out → n86.assertion
n87.out → n86.atom1
n70.out → n86.formula1
n88.out → n86.atom2
n7.out → n86.formula2
n89.out → n90.assertion
n7.out → n92.a
n70.out → n92.b
n75.out → n93.a
n92.out → n93.b
n91.out → n90.atom1
n93.out → n90.formula1
n94.out → n90.atom2
n8.out → n90.formula2
n86.out → n84.a
n90.out → n84.b
n95.out → n96.assertion
n97.out → n96.atom1
n8.out → n96.formula1
n98.out → n96.atom2
n75.out → n96.formula2
n99.out → n96.atom3
n92.out → n96.formula3
n84.out → n83.a
n96.out → n83.b
n60.out → n59.a
n83.out → n59.b
n100.out → n101.assertion
n102.out → n101.atom1
n8.out → n101.formula1
n103.out → n101.atom2
n7.out → n101.formula2
n104.out → n101.atom3
n70.out → n101.formula3
n59.out → n58.a
n101.out → n58.b
n105.out → n106.assertion
n8.out → n108.a
n70.out → n108.b
n36.out → n109.a
n108.out → n109.b
n107.out → n106.atom1
n109.out → n106.formula1
n110.out → n106.atom2
n36.out → n106.formula2
n58.out → n57.a
n106.out → n57.b
n111.out → n112.assertion
n113.out → n112.atom1
n36.out → n112.formula1
n114.out → n112.atom2
n36.out → n112.formula2
n115.out → n112.atom3
n108.out → n112.formula3
n57.out → n56.a
n112.out → n56.b
n54.out → n52.a
n56.out → n52.b
n118.out → n119.assertion
n120.out → n119.atom1
n7.out → n119.formula1
n121.out → n119.atom2
n36.out → n119.formula2
n122.out → n123.assertion
n36.out → n125.a
n7.out → n125.b
n108.out → n126.a
n125.out → n126.b
n124.out → n123.atom1
n126.out → n123.formula1
n127.out → n123.atom2
n36.out → n123.formula2
n119.out → n117.a
n123.out → n117.b
n128.out → n129.assertion
n130.out → n129.atom1
n36.out → n129.formula1
n131.out → n129.atom2
n108.out → n129.formula2
n132.out → n129.atom3
n125.out → n129.formula3
n117.out → n116.a
n129.out → n116.b
n52.out → n51.a
n116.out → n51.b
n133.out → n134.assertion
n135.out → n134.atom1
n36.out → n134.formula1
n136.out → n134.atom2
n36.out → n134.formula2
n137.out → n134.atom3
n7.out → n134.formula3
n51.out → n50.a
n134.out → n50.b
n48.out → n46.a
n50.out → n46.b
n138.out → n139.assertion
n140.out → n139.atom1
n125.out → n139.formula1
n141.out → n139.atom2
n9.out → n139.formula2
n46.out → n45.a
n139.out → n45.b
n142.out → n143.assertion
n144.out → n143.atom1
n9.out → n143.formula1
n145.out → n143.atom2
n36.out → n143.formula2
n146.out → n143.atom3
n7.out → n143.formula3
n45.out → n44.a
n143.out → n44.b
n2.out → n1.a
n44.out → n1.b
n1.out → n147.proof
```

</details>

### *14 · 矛盾推出一切

- 目标：`⊢ ( ¬ P → ( P → Q ) )`
- 提示：用 A1 造出 A→(¬B→A)，再用 A3。
- 参考解：43 个模块 / 60 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n44  [target]
n1  mp
n2  mp
n3  定理 *01
n4  subst
n5  atom P
n6  atom P
n7  not
n8  mp
n9  mp
n10  axiom A1
n11  subst
n12  atom P
n13  atom Q
n14  atom Q
n15  not
n16  axiom A1
n17  subst
n18  atom P
n19  imp
n20  imp
n21  atom Q
n22  axiom A2
n23  subst
n24  atom P
n25  atom Q
n26  atom R
n27  mp
n28  mp
n29  axiom A3
n30  subst
n31  atom P
n32  atom Q
n33  axiom A1
n34  subst
n35  atom P
n36  imp
n37  imp
n38  atom Q
n39  axiom A2
n40  subst
n41  atom P
n42  atom Q
n43  atom R

接线：
n3.out → n4.assertion
n6.out → n7.a
n5.out → n4.atom1
n7.out → n4.formula1
n10.out → n11.assertion
n12.out → n11.atom1
n7.out → n11.formula1
n14.out → n15.a
n13.out → n11.atom2
n15.out → n11.formula2
n16.out → n17.assertion
n15.out → n19.a
n7.out → n19.b
n7.out → n20.a
n19.out → n20.b
n18.out → n17.atom1
n20.out → n17.formula1
n21.out → n17.atom2
n7.out → n17.formula2
n11.out → n9.a
n17.out → n9.b
n22.out → n23.assertion
n24.out → n23.atom1
n7.out → n23.formula1
n25.out → n23.atom2
n7.out → n23.formula2
n26.out → n23.atom3
n19.out → n23.formula3
n9.out → n8.a
n23.out → n8.b
n4.out → n2.a
n8.out → n2.b
n29.out → n30.assertion
n31.out → n30.atom1
n14.out → n30.formula1
n32.out → n30.atom2
n6.out → n30.formula2
n33.out → n34.assertion
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
n39.out → n40.assertion
n41.out → n40.atom1
n7.out → n40.formula1
n42.out → n40.atom2
n19.out → n40.formula2
n43.out → n40.atom3
n36.out → n40.formula3
n28.out → n27.a
n40.out → n27.b
n2.out → n1.a
n27.out → n1.b
n1.out → n44.proof
```

</details>

### *15 · 合取前件合并

- 目标：`⊢ ( ( P → ( Q → R ) ) → ( ( P ∧ Q ) → R ) )`
- 提示：把合取拆成两个前件再用 A2 合并（演绎定理自动处理假设）。
- 参考解：200 个模块 / 299 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n201  [target]
n1  mp
n2  mp
n3  mp
n4  subst
n5  定理 *01
n6  atom P
n7  atom P
n8  atom Q
n9  and
n10  subst
n11  axiom A1
n12  atom P
n13  imp
n14  atom Q
n15  atom R
n16  imp
n17  imp
n18  mp
n19  mp
n20  mp
n21  mp
n22  and-elim-ax(side=r)
n23  subst
n24  axiom A1
n25  atom P
n26  imp
n27  atom Q
n28  mp
n29  mp
n30  subst
n31  axiom A1
n32  atom P
n33  atom Q
n34  subst
n35  axiom A1
n36  atom P
n37  imp
n38  imp
n39  atom Q
n40  subst
n41  axiom A2
n42  atom P
n43  atom Q
n44  atom R
n45  mp
n46  mp
n47  subst
n48  axiom A2
n49  atom P
n50  atom Q
n51  atom R
n52  subst
n53  axiom A1
n54  atom P
n55  imp
n56  imp
n57  atom Q
n58  subst
n59  axiom A2
n60  atom P
n61  atom Q
n62  atom R
n63  subst
n64  axiom A2
n65  atom P
n66  atom Q
n67  atom R
n68  mp
n69  mp
n70  mp
n71  mp
n72  mp
n73  subst
n74  定理 *01
n75  atom P
n76  subst
n77  axiom A1
n78  atom P
n79  atom Q
n80  mp
n81  mp
n82  mp
n83  mp
n84  and-elim-ax(side=l)
n85  subst
n86  axiom A1
n87  atom P
n88  imp
n89  atom Q
n90  mp
n91  mp
n92  subst
n93  axiom A1
n94  atom P
n95  atom Q
n96  subst
n97  axiom A1
n98  atom P
n99  imp
n100  imp
n101  atom Q
n102  subst
n103  axiom A2
n104  atom P
n105  atom Q
n106  atom R
n107  mp
n108  mp
n109  subst
n110  axiom A2
n111  atom P
n112  atom Q
n113  atom R
n114  subst
n115  axiom A1
n116  atom P
n117  imp
n118  imp
n119  atom Q
n120  subst
n121  axiom A2
n122  atom P
n123  atom Q
n124  atom R
n125  subst
n126  axiom A2
n127  atom P
n128  atom Q
n129  atom R
n130  mp
n131  mp
n132  mp
n133  subst
n134  定理 *01
n135  atom P
n136  mp
n137  mp
n138  subst
n139  axiom A1
n140  atom P
n141  atom Q
n142  subst
n143  axiom A1
n144  atom P
n145  imp
n146  imp
n147  atom Q
n148  subst
n149  axiom A2
n150  atom P
n151  atom Q
n152  atom R
n153  mp
n154  mp
n155  subst
n156  axiom A2
n157  atom P
n158  atom Q
n159  atom R
n160  subst
n161  axiom A1
n162  atom P
n163  imp
n164  imp
n165  imp
n166  atom Q
n167  subst
n168  axiom A2
n169  atom P
n170  atom Q
n171  atom R
n172  subst
n173  axiom A2
n174  atom P
n175  atom Q
n176  atom R
n177  mp
n178  mp
n179  subst
n180  axiom A2
n181  atom P
n182  atom Q
n183  atom R
n184  subst
n185  axiom A1
n186  atom P
n187  imp
n188  imp
n189  imp
n190  atom Q
n191  subst
n192  axiom A2
n193  atom P
n194  atom Q
n195  atom R
n196  subst
n197  axiom A2
n198  atom P
n199  atom Q
n200  atom R

接线：
n5.out → n4.assertion
n7.out → n9.a
n8.out → n9.b
n6.out → n4.atom1
n9.out → n4.formula1
n11.out → n10.assertion
n9.out → n13.a
n9.out → n13.b
n12.out → n10.atom1
n13.out → n10.formula1
n8.out → n16.a
n15.out → n16.b
n7.out → n17.a
n16.out → n17.b
n14.out → n10.atom2
n17.out → n10.formula2
n4.out → n3.a
n10.out → n3.b
n7.out → n22.a
n8.out → n22.b
n24.out → n23.assertion
n9.out → n26.a
n8.out → n26.b
n25.out → n23.atom1
n26.out → n23.formula1
n27.out → n23.atom2
n17.out → n23.formula2
n22.out → n21.a
n23.out → n21.b
n31.out → n30.assertion
n32.out → n30.atom1
n26.out → n30.formula1
n33.out → n30.atom2
n9.out → n30.formula2
n35.out → n34.assertion
n9.out → n37.a
n26.out → n37.b
n26.out → n38.a
n37.out → n38.b
n36.out → n34.atom1
n38.out → n34.formula1
n39.out → n34.atom2
n17.out → n34.formula2
n30.out → n29.a
n34.out → n29.b
n41.out → n40.assertion
n42.out → n40.atom1
n17.out → n40.formula1
n43.out → n40.atom2
n26.out → n40.formula2
n44.out → n40.atom3
n37.out → n40.formula3
n29.out → n28.a
n40.out → n28.b
n21.out → n20.a
n28.out → n20.b
n48.out → n47.assertion
n49.out → n47.atom1
n9.out → n47.formula1
n50.out → n47.atom2
n9.out → n47.formula2
n51.out → n47.atom3
n8.out → n47.formula3
n53.out → n52.assertion
n13.out → n55.a
n26.out → n55.b
n37.out → n56.a
n55.out → n56.b
n54.out → n52.atom1
n56.out → n52.formula1
n57.out → n52.atom2
n17.out → n52.formula2
n47.out → n46.a
n52.out → n46.b
n59.out → n58.assertion
n60.out → n58.atom1
n17.out → n58.formula1
n61.out → n58.atom2
n37.out → n58.formula2
n62.out → n58.atom3
n55.out → n58.formula3
n46.out → n45.a
n58.out → n45.b
n20.out → n19.a
n45.out → n19.b
n64.out → n63.assertion
n65.out → n63.atom1
n17.out → n63.formula1
n66.out → n63.atom2
n13.out → n63.formula2
n67.out → n63.atom3
n26.out → n63.formula3
n19.out → n18.a
n63.out → n18.b
n3.out → n2.a
n18.out → n2.b
n74.out → n73.assertion
n75.out → n73.atom1
n9.out → n73.formula1
n77.out → n76.assertion
n78.out → n76.atom1
n13.out → n76.formula1
n79.out → n76.atom2
n17.out → n76.formula2
n73.out → n72.a
n76.out → n72.b
n7.out → n84.a
n8.out → n84.b
n86.out → n85.assertion
n9.out → n88.a
n7.out → n88.b
n87.out → n85.atom1
n88.out → n85.formula1
n89.out → n85.atom2
n17.out → n85.formula2
n84.out → n83.a
n85.out → n83.b
n93.out → n92.assertion
n94.out → n92.atom1
n88.out → n92.formula1
n95.out → n92.atom2
n9.out → n92.formula2
n97.out → n96.assertion
n9.out → n99.a
n88.out → n99.b
n88.out → n100.a
n99.out → n100.b
n98.out → n96.atom1
n100.out → n96.formula1
n101.out → n96.atom2
n17.out → n96.formula2
n92.out → n91.a
n96.out → n91.b
n103.out → n102.assertion
n104.out → n102.atom1
n17.out → n102.formula1
n105.out → n102.atom2
n88.out → n102.formula2
n106.out → n102.atom3
n99.out → n102.formula3
n91.out → n90.a
n102.out → n90.b
n83.out → n82.a
n90.out → n82.b
n110.out → n109.assertion
n111.out → n109.atom1
n9.out → n109.formula1
n112.out → n109.atom2
n9.out → n109.formula2
n113.out → n109.atom3
n7.out → n109.formula3
n115.out → n114.assertion
n13.out → n117.a
n88.out → n117.b
n99.out → n118.a
n117.out → n118.b
n116.out → n114.atom1
n118.out → n114.formula1
n119.out → n114.atom2
n17.out → n114.formula2
n109.out → n108.a
n114.out → n108.b
n121.out → n120.assertion
n122.out → n120.atom1
n17.out → n120.formula1
n123.out → n120.atom2
n99.out → n120.formula2
n124.out → n120.atom3
n117.out → n120.formula3
n108.out → n107.a
n120.out → n107.b
n82.out → n81.a
n107.out → n81.b
n126.out → n125.assertion
n127.out → n125.atom1
n17.out → n125.formula1
n128.out → n125.atom2
n13.out → n125.formula2
n129.out → n125.atom3
n88.out → n125.formula3
n81.out → n80.a
n125.out → n80.b
n72.out → n71.a
n80.out → n71.b
n134.out → n133.assertion
n135.out → n133.atom1
n17.out → n133.formula1
n139.out → n138.assertion
n140.out → n138.atom1
n17.out → n138.formula1
n141.out → n138.atom2
n9.out → n138.formula2
n143.out → n142.assertion
n9.out → n145.a
n17.out → n145.b
n17.out → n146.a
n145.out → n146.b
n144.out → n142.atom1
n146.out → n142.formula1
n147.out → n142.atom2
n17.out → n142.formula2
n138.out → n137.a
n142.out → n137.b
n149.out → n148.assertion
n150.out → n148.atom1
n17.out → n148.formula1
n151.out → n148.atom2
n17.out → n148.formula2
n152.out → n148.atom3
n145.out → n148.formula3
n137.out → n136.a
n148.out → n136.b
n133.out → n132.a
n136.out → n132.b
n156.out → n155.assertion
n157.out → n155.atom1
n9.out → n155.formula1
n158.out → n155.atom2
n7.out → n155.formula2
n159.out → n155.atom3
n16.out → n155.formula3
n161.out → n160.assertion
n9.out → n163.a
n16.out → n163.b
n88.out → n164.a
n163.out → n164.b
n145.out → n165.a
n164.out → n165.b
n162.out → n160.atom1
n165.out → n160.formula1
n166.out → n160.atom2
n17.out → n160.formula2
n155.out → n154.a
n160.out → n154.b
n168.out → n167.assertion
n169.out → n167.atom1
n17.out → n167.formula1
n170.out → n167.atom2
n145.out → n167.formula2
n171.out → n167.atom3
n164.out → n167.formula3
n154.out → n153.a
n167.out → n153.b
n132.out → n131.a
n153.out → n131.b
n173.out → n172.assertion
n174.out → n172.atom1
n17.out → n172.formula1
n175.out → n172.atom2
n88.out → n172.formula2
n176.out → n172.atom3
n163.out → n172.formula3
n131.out → n130.a
n172.out → n130.b
n71.out → n70.a
n130.out → n70.b
n180.out → n179.assertion
n181.out → n179.atom1
n9.out → n179.formula1
n182.out → n179.atom2
n8.out → n179.formula2
n183.out → n179.atom3
n15.out → n179.formula3
n185.out → n184.assertion
n9.out → n187.a
n15.out → n187.b
n26.out → n188.a
n187.out → n188.b
n163.out → n189.a
n188.out → n189.b
n186.out → n184.atom1
n189.out → n184.formula1
n190.out → n184.atom2
n17.out → n184.formula2
n179.out → n178.a
n184.out → n178.b
n192.out → n191.assertion
n193.out → n191.atom1
n17.out → n191.formula1
n194.out → n191.atom2
n163.out → n191.formula2
n195.out → n191.atom3
n188.out → n191.formula3
n178.out → n177.a
n191.out → n177.b
n70.out → n69.a
n177.out → n69.b
n197.out → n196.assertion
n198.out → n196.atom1
n17.out → n196.formula1
n199.out → n196.atom2
n26.out → n196.formula2
n200.out → n196.atom3
n187.out → n196.formula3
n69.out → n68.a
n196.out → n68.b
n2.out → n1.a
n68.out → n1.b
n1.out → n201.proof
```

</details>

### *16 · 分情况

- 目标：`⊢ ( ( ¬ P → Q ) → ( ( P → Q ) → Q ) )`
- 提示：分别从 ¬A 和 A 推出 B，再用 A3 合并。
- 参考解：298 个模块 / 439 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n299  [target]
n1  mp
n2  mp
n3  定理 *01
n4  subst
n5  atom P
n6  atom P
n7  not
n8  atom Q
n9  imp
n10  mp
n11  mp
n12  axiom A1
n13  subst
n14  atom P
n15  atom Q
n16  imp
n17  axiom A1
n18  subst
n19  atom P
n20  imp
n21  imp
n22  atom Q
n23  axiom A2
n24  subst
n25  atom P
n26  atom Q
n27  atom R
n28  mp
n29  mp
n30  mp
n31  mp
n32  定理 *01
n33  subst
n34  atom P
n35  mp
n36  mp
n37  mp
n38  mp
n39  mp
n40  mp
n41  mp
n42  mp
n43  mp
n44  定理 *01
n45  subst
n46  atom P
n47  mp
n48  mp
n49  axiom A1
n50  subst
n51  atom P
n52  atom Q
n53  axiom A1
n54  subst
n55  atom P
n56  imp
n57  imp
n58  atom Q
n59  axiom A2
n60  subst
n61  atom P
n62  atom Q
n63  atom R
n64  mp
n65  mp
n66  mp
n67  定理 *01
n68  subst
n69  atom P
n70  axiom A2
n71  subst
n72  atom P
n73  atom Q
n74  atom R
n75  axiom A1
n76  subst
n77  atom P
n78  imp
n79  imp
n80  atom Q
n81  axiom A2
n82  subst
n83  atom P
n84  atom Q
n85  atom R
n86  axiom A1
n87  subst
n88  atom P
n89  imp
n90  atom Q
n91  mp
n92  mp
n93  mp
n94  mp
n95  定理 *12
n96  subst
n97  atom P
n98  axiom A1
n99  subst
n100  atom P
n101  not
n102  not
n103  imp
n104  atom Q
n105  axiom A2
n106  subst
n107  atom P
n108  atom Q
n109  atom R
n110  axiom A1
n111  subst
n112  atom P
n113  imp
n114  imp
n115  atom Q
n116  axiom A2
n117  subst
n118  atom P
n119  atom Q
n120  atom R
n121  mp
n122  mp
n123  axiom A3
n124  subst
n125  atom P
n126  atom Q
n127  axiom A1
n128  subst
n129  atom P
n130  imp
n131  imp
n132  atom Q
n133  axiom A2
n134  subst
n135  atom P
n136  atom Q
n137  atom R
n138  mp
n139  mp
n140  mp
n141  mp
n142  mp
n143  mp
n144  mp
n145  定理 *01
n146  subst
n147  atom P
n148  mp
n149  mp
n150  axiom A1
n151  subst
n152  atom P
n153  atom Q
n154  axiom A1
n155  subst
n156  atom P
n157  imp
n158  atom Q
n159  axiom A2
n160  subst
n161  atom P
n162  atom Q
n163  atom R
n164  mp
n165  mp
n166  mp
n167  定理 *02
n168  subst
n169  atom P
n170  atom Q
n171  axiom A2
n172  subst
n173  atom P
n174  atom Q
n175  atom R
n176  axiom A1
n177  subst
n178  atom P
n179  imp
n180  atom Q
n181  axiom A2
n182  subst
n183  atom P
n184  atom Q
n185  atom R
n186  axiom A1
n187  subst
n188  atom P
n189  atom Q
n190  axiom A2
n191  subst
n192  atom P
n193  atom Q
n194  atom R
n195  mp
n196  mp
n197  axiom A1
n198  subst
n199  atom P
n200  imp
n201  atom Q
n202  axiom A1
n203  subst
n204  atom P
n205  imp
n206  imp
n207  atom Q
n208  axiom A2
n209  subst
n210  atom P
n211  atom Q
n212  atom R
n213  mp
n214  mp
n215  axiom A2
n216  subst
n217  atom P
n218  atom Q
n219  atom R
n220  axiom A1
n221  subst
n222  atom P
n223  imp
n224  imp
n225  imp
n226  atom Q
n227  axiom A2
n228  subst
n229  atom P
n230  atom Q
n231  atom R
n232  axiom A2
n233  subst
n234  atom P
n235  atom Q
n236  atom R
n237  mp
n238  mp
n239  mp
n240  定理 *14
n241  subst
n242  atom P
n243  atom Q
n244  not
n245  axiom A2
n246  subst
n247  atom P
n248  atom Q
n249  atom R
n250  axiom A1
n251  subst
n252  atom P
n253  imp
n254  imp
n255  atom Q
n256  axiom A2
n257  subst
n258  atom P
n259  atom Q
n260  atom R
n261  mp
n262  mp
n263  axiom A3
n264  subst
n265  atom P
n266  atom Q
n267  axiom A1
n268  subst
n269  atom P
n270  imp
n271  imp
n272  atom Q
n273  axiom A2
n274  subst
n275  atom P
n276  atom Q
n277  atom R
n278  axiom A2
n279  subst
n280  atom P
n281  atom Q
n282  atom R
n283  axiom A2
n284  subst
n285  atom P
n286  atom Q
n287  atom R
n288  axiom A1
n289  subst
n290  atom P
n291  imp
n292  imp
n293  atom Q
n294  axiom A2
n295  subst
n296  atom P
n297  atom Q
n298  atom R

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
n17.out → n18.assertion
n16.out → n20.a
n9.out → n20.b
n9.out → n21.a
n20.out → n21.b
n19.out → n18.atom1
n21.out → n18.formula1
n22.out → n18.atom2
n9.out → n18.formula2
n13.out → n11.a
n18.out → n11.b
n23.out → n24.assertion
n25.out → n24.atom1
n9.out → n24.formula1
n26.out → n24.atom2
n9.out → n24.formula2
n27.out → n24.atom3
n20.out → n24.formula3
n11.out → n10.a
n24.out → n10.b
n4.out → n2.a
n10.out → n2.b
n32.out → n33.assertion
n34.out → n33.atom1
n16.out → n33.formula1
n44.out → n45.assertion
n46.out → n45.atom1
n7.out → n45.formula1
n49.out → n50.assertion
n51.out → n50.atom1
n7.out → n50.formula1
n52.out → n50.atom2
n9.out → n50.formula2
n53.out → n54.assertion
n9.out → n56.a
n7.out → n56.b
n7.out → n57.a
n56.out → n57.b
n55.out → n54.atom1
n57.out → n54.formula1
n58.out → n54.atom2
n7.out → n54.formula2
n50.out → n48.a
n54.out → n48.b
n59.out → n60.assertion
n61.out → n60.atom1
n7.out → n60.formula1
n62.out → n60.atom2
n7.out → n60.formula2
n63.out → n60.atom3
n56.out → n60.formula3
n48.out → n47.a
n60.out → n47.b
n45.out → n43.a
n47.out → n43.b
n67.out → n68.assertion
n69.out → n68.atom1
n9.out → n68.formula1
n70.out → n71.assertion
n72.out → n71.atom1
n9.out → n71.formula1
n73.out → n71.atom2
n7.out → n71.formula2
n74.out → n71.atom3
n8.out → n71.formula3
n68.out → n66.a
n71.out → n66.b
n75.out → n76.assertion
n9.out → n78.a
n8.out → n78.b
n56.out → n79.a
n78.out → n79.b
n77.out → n76.atom1
n79.out → n76.formula1
n80.out → n76.atom2
n7.out → n76.formula2
n66.out → n65.a
n76.out → n65.b
n81.out → n82.assertion
n83.out → n82.atom1
n7.out → n82.formula1
n84.out → n82.atom2
n56.out → n82.formula2
n85.out → n82.atom3
n78.out → n82.formula3
n65.out → n64.a
n82.out → n64.b
n43.out → n42.a
n64.out → n42.b
n86.out → n87.assertion
n7.out → n89.a
n78.out → n89.b
n88.out → n87.atom1
n89.out → n87.formula1
n90.out → n87.atom2
n16.out → n87.formula2
n42.out → n41.a
n87.out → n41.b
n95.out → n96.assertion
n97.out → n96.atom1
n78.out → n96.formula1
n98.out → n99.assertion
n78.out → n101.a
n101.out → n102.a
n78.out → n103.a
n102.out → n103.b
n100.out → n99.atom1
n103.out → n99.formula1
n104.out → n99.atom2
n7.out → n99.formula2
n96.out → n94.a
n99.out → n94.b
n105.out → n106.assertion
n107.out → n106.atom1
n7.out → n106.formula1
n108.out → n106.atom2
n78.out → n106.formula2
n109.out → n106.atom3
n102.out → n106.formula3
n94.out → n93.a
n106.out → n93.b
n110.out → n111.assertion
n7.out → n113.a
n102.out → n113.b
n89.out → n114.a
n113.out → n114.b
n112.out → n111.atom1
n114.out → n111.formula1
n115.out → n111.atom2
n16.out → n111.formula2
n93.out → n92.a
n111.out → n92.b
n116.out → n117.assertion
n118.out → n117.atom1
n16.out → n117.formula1
n119.out → n117.atom2
n89.out → n117.formula2
n120.out → n117.atom3
n113.out → n117.formula3
n92.out → n91.a
n117.out → n91.b
n41.out → n40.a
n91.out → n40.b
n123.out → n124.assertion
n125.out → n124.atom1
n6.out → n124.formula1
n126.out → n124.atom2
n101.out → n124.formula2
n127.out → n128.assertion
n101.out → n130.a
n6.out → n130.b
n113.out → n131.a
n130.out → n131.b
n129.out → n128.atom1
n131.out → n128.formula1
n132.out → n128.atom2
n16.out → n128.formula2
n124.out → n122.a
n128.out → n122.b
n133.out → n134.assertion
n135.out → n134.atom1
n16.out → n134.formula1
n136.out → n134.atom2
n113.out → n134.formula2
n137.out → n134.atom3
n130.out → n134.formula3
n122.out → n121.a
n134.out → n121.b
n40.out → n39.a
n121.out → n39.b
n145.out → n146.assertion
n147.out → n146.atom1
n8.out → n146.formula1
n150.out → n151.assertion
n152.out → n151.atom1
n8.out → n151.formula1
n153.out → n151.atom2
n9.out → n151.formula2
n154.out → n155.assertion
n8.out → n157.a
n78.out → n157.b
n156.out → n155.atom1
n157.out → n155.formula1
n158.out → n155.atom2
n8.out → n155.formula2
n151.out → n149.a
n155.out → n149.b
n159.out → n160.assertion
n161.out → n160.atom1
n8.out → n160.formula1
n162.out → n160.atom2
n8.out → n160.formula2
n163.out → n160.atom3
n78.out → n160.formula3
n149.out → n148.a
n160.out → n148.b
n146.out → n144.a
n148.out → n144.b
n167.out → n168.assertion
n169.out → n168.atom1
n9.out → n168.formula1
n170.out → n168.atom2
n8.out → n168.formula2
n171.out → n172.assertion
n173.out → n172.atom1
n9.out → n172.formula1
n174.out → n172.atom2
n8.out → n172.formula2
n175.out → n172.atom3
n8.out → n172.formula3
n168.out → n166.a
n172.out → n166.b
n176.out → n177.assertion
n78.out → n179.a
n78.out → n179.b
n178.out → n177.atom1
n179.out → n177.formula1
n180.out → n177.atom2
n8.out → n177.formula2
n166.out → n165.a
n177.out → n165.b
n181.out → n182.assertion
n183.out → n182.atom1
n8.out → n182.formula1
n184.out → n182.atom2
n78.out → n182.formula2
n185.out → n182.atom3
n78.out → n182.formula3
n165.out → n164.a
n182.out → n164.b
n144.out → n143.a
n164.out → n143.b
n186.out → n187.assertion
n188.out → n187.atom1
n157.out → n187.formula1
n189.out → n187.atom2
n6.out → n187.formula2
n143.out → n142.a
n187.out → n142.b
n190.out → n191.assertion
n192.out → n191.atom1
n6.out → n191.formula1
n193.out → n191.atom2
n8.out → n191.formula2
n194.out → n191.atom3
n78.out → n191.formula3
n142.out → n141.a
n191.out → n141.b
n197.out → n198.assertion
n6.out → n200.a
n78.out → n200.b
n199.out → n198.atom1
n200.out → n198.formula1
n201.out → n198.atom2
n101.out → n198.formula2
n202.out → n203.assertion
n101.out → n205.a
n200.out → n205.b
n200.out → n206.a
n205.out → n206.b
n204.out → n203.atom1
n206.out → n203.formula1
n207.out → n203.atom2
n16.out → n203.formula2
n198.out → n196.a
n203.out → n196.b
n208.out → n209.assertion
n210.out → n209.atom1
n16.out → n209.formula1
n211.out → n209.atom2
n200.out → n209.formula2
n212.out → n209.atom3
n205.out → n209.formula3
n196.out → n195.a
n209.out → n195.b
n141.out → n140.a
n195.out → n140.b
n215.out → n216.assertion
n217.out → n216.atom1
n101.out → n216.formula1
n218.out → n216.atom2
n6.out → n216.formula2
n219.out → n216.atom3
n78.out → n216.formula3
n220.out → n221.assertion
n101.out → n223.a
n78.out → n223.b
n130.out → n224.a
n223.out → n224.b
n205.out → n225.a
n224.out → n225.b
n222.out → n221.atom1
n225.out → n221.formula1
n226.out → n221.atom2
n16.out → n221.formula2
n216.out → n214.a
n221.out → n214.b
n227.out → n228.assertion
n229.out → n228.atom1
n16.out → n228.formula1
n230.out → n228.atom2
n205.out → n228.formula2
n231.out → n228.atom3
n224.out → n228.formula3
n214.out → n213.a
n228.out → n213.b
n140.out → n139.a
n213.out → n139.b
n232.out → n233.assertion
n234.out → n233.atom1
n16.out → n233.formula1
n235.out → n233.atom2
n130.out → n233.formula2
n236.out → n233.atom3
n223.out → n233.formula3
n139.out → n138.a
n233.out → n138.b
n39.out → n38.a
n138.out → n38.b
n240.out → n241.assertion
n242.out → n241.atom1
n78.out → n241.formula1
n16.out → n244.a
n243.out → n241.atom2
n244.out → n241.formula2
n245.out → n246.assertion
n247.out → n246.atom1
n101.out → n246.formula1
n248.out → n246.atom2
n78.out → n246.formula2
n249.out → n246.atom3
n244.out → n246.formula3
n241.out → n239.a
n246.out → n239.b
n250.out → n251.assertion
n101.out → n253.a
n244.out → n253.b
n223.out → n254.a
n253.out → n254.b
n252.out → n251.atom1
n254.out → n251.formula1
n255.out → n251.atom2
n16.out → n251.formula2
n239.out → n238.a
n251.out → n238.b
n256.out → n257.assertion
n258.out → n257.atom1
n16.out → n257.formula1
n259.out → n257.atom2
n223.out → n257.formula2
n260.out → n257.atom3
n253.out → n257.formula3
n238.out → n237.a
n257.out → n237.b
n38.out → n37.a
n237.out → n37.b
n263.out → n264.assertion
n265.out → n264.atom1
n78.out → n264.formula1
n266.out → n264.atom2
n16.out → n264.formula2
n267.out → n268.assertion
n16.out → n270.a
n78.out → n270.b
n253.out → n271.a
n270.out → n271.b
n269.out → n268.atom1
n271.out → n268.formula1
n272.out → n268.atom2
n16.out → n268.formula2
n264.out → n262.a
n268.out → n262.b
n273.out → n274.assertion
n275.out → n274.atom1
n16.out → n274.formula1
n276.out → n274.atom2
n253.out → n274.formula2
n277.out → n274.atom3
n270.out → n274.formula3
n262.out → n261.a
n274.out → n261.b
n37.out → n36.a
n261.out → n36.b
n278.out → n279.assertion
n280.out → n279.atom1
n16.out → n279.formula1
n281.out → n279.atom2
n16.out → n279.formula2
n282.out → n279.atom3
n78.out → n279.formula3
n36.out → n35.a
n279.out → n35.b
n33.out → n31.a
n35.out → n31.b
n283.out → n284.assertion
n285.out → n284.atom1
n16.out → n284.formula1
n286.out → n284.atom2
n9.out → n284.formula2
n287.out → n284.atom3
n8.out → n284.formula3
n31.out → n30.a
n284.out → n30.b
n288.out → n289.assertion
n16.out → n291.a
n8.out → n291.b
n20.out → n292.a
n291.out → n292.b
n290.out → n289.atom1
n292.out → n289.formula1
n293.out → n289.atom2
n9.out → n289.formula2
n30.out → n29.a
n289.out → n29.b
n294.out → n295.assertion
n296.out → n295.atom1
n9.out → n295.formula1
n297.out → n295.atom2
n20.out → n295.formula2
n298.out → n295.atom3
n291.out → n295.formula3
n29.out → n28.a
n295.out → n28.b
n2.out → n1.a
n28.out → n1.b
n1.out → n299.proof
```

</details>

### *17 · 蕴涵合成

- 目标：`⊢ ( ( P → Q ) → ( ( R → S ) → ( ( Q → R ) → ( P → S ) ) ) )`
- 提示：两次前件/后件组合。
- 参考解：146 个模块 / 219 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n147  [target]
n1  mp
n2  mp
n3  定理 *01
n4  subst
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  mp
n10  mp
n11  axiom A1
n12  subst
n13  atom P
n14  atom Q
n15  atom R
n16  atom S
n17  imp
n18  axiom A1
n19  subst
n20  atom P
n21  imp
n22  imp
n23  atom Q
n24  axiom A2
n25  subst
n26  atom P
n27  atom Q
n28  atom R
n29  mp
n30  mp
n31  mp
n32  mp
n33  mp
n34  定理 *04
n35  subst
n36  atom P
n37  atom Q
n38  atom R
n39  mp
n40  mp
n41  axiom A1
n42  subst
n43  atom P
n44  imp
n45  imp
n46  imp
n47  atom Q
n48  axiom A1
n49  subst
n50  atom P
n51  imp
n52  imp
n53  atom Q
n54  axiom A2
n55  subst
n56  atom P
n57  atom Q
n58  atom R
n59  mp
n60  mp
n61  mp
n62  mp
n63  定理 *05
n64  subst
n65  atom P
n66  atom Q
n67  atom R
n68  axiom A1
n69  subst
n70  atom P
n71  imp
n72  imp
n73  imp
n74  atom Q
n75  mp
n76  mp
n77  mp
n78  mp
n79  定理 *04
n80  subst
n81  atom P
n82  atom Q
n83  atom R
n84  axiom A1
n85  subst
n86  atom P
n87  imp
n88  imp
n89  imp
n90  atom Q
n91  axiom A2
n92  subst
n93  atom P
n94  atom Q
n95  atom R
n96  axiom A1
n97  subst
n98  atom P
n99  imp
n100  imp
n101  atom Q
n102  axiom A2
n103  subst
n104  atom P
n105  atom Q
n106  atom R
n107  mp
n108  mp
n109  axiom A2
n110  subst
n111  atom P
n112  atom Q
n113  atom R
n114  axiom A1
n115  subst
n116  atom P
n117  imp
n118  imp
n119  imp
n120  atom Q
n121  axiom A2
n122  subst
n123  atom P
n124  atom Q
n125  atom R
n126  axiom A2
n127  subst
n128  atom P
n129  atom Q
n130  atom R
n131  axiom A2
n132  subst
n133  atom P
n134  atom Q
n135  atom R
n136  axiom A1
n137  subst
n138  atom P
n139  imp
n140  imp
n141  atom Q
n142  axiom A2
n143  subst
n144  atom P
n145  atom Q
n146  atom R

接线：
n3.out → n4.assertion
n6.out → n8.a
n7.out → n8.b
n5.out → n4.atom1
n8.out → n4.formula1
n11.out → n12.assertion
n13.out → n12.atom1
n8.out → n12.formula1
n15.out → n17.a
n16.out → n17.b
n14.out → n12.atom2
n17.out → n12.formula2
n18.out → n19.assertion
n17.out → n21.a
n8.out → n21.b
n8.out → n22.a
n21.out → n22.b
n20.out → n19.atom1
n22.out → n19.formula1
n23.out → n19.atom2
n8.out → n19.formula2
n12.out → n10.a
n19.out → n10.b
n24.out → n25.assertion
n26.out → n25.atom1
n8.out → n25.formula1
n27.out → n25.atom2
n8.out → n25.formula2
n28.out → n25.atom3
n21.out → n25.formula3
n10.out → n9.a
n25.out → n9.b
n4.out → n2.a
n9.out → n2.b
n34.out → n35.assertion
n36.out → n35.atom1
n15.out → n35.formula1
n37.out → n35.atom2
n16.out → n35.formula2
n38.out → n35.atom3
n7.out → n35.formula3
n41.out → n42.assertion
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
n48.out → n49.assertion
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
n54.out → n55.assertion
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
n6.out → n64.formula1
n66.out → n64.atom2
n7.out → n64.formula2
n67.out → n64.atom3
n16.out → n64.formula3
n68.out → n69.assertion
n6.out → n71.a
n16.out → n71.b
n45.out → n72.a
n71.out → n72.b
n8.out → n73.a
n72.out → n73.b
n70.out → n69.atom1
n73.out → n69.formula1
n74.out → n69.atom2
n17.out → n69.formula2
n64.out → n62.a
n69.out → n62.b
n79.out → n80.assertion
n81.out → n80.atom1
n45.out → n80.formula1
n82.out → n80.atom2
n71.out → n80.formula2
n83.out → n80.atom3
n44.out → n80.formula3
n84.out → n85.assertion
n44.out → n87.a
n71.out → n87.b
n46.out → n88.a
n87.out → n88.b
n72.out → n89.a
n88.out → n89.b
n86.out → n85.atom1
n89.out → n85.formula1
n90.out → n85.atom2
n8.out → n85.formula2
n80.out → n78.a
n85.out → n78.b
n91.out → n92.assertion
n93.out → n92.atom1
n8.out → n92.formula1
n94.out → n92.atom2
n72.out → n92.formula2
n95.out → n92.atom3
n88.out → n92.formula3
n78.out → n77.a
n92.out → n77.b
n96.out → n97.assertion
n8.out → n99.a
n88.out → n99.b
n73.out → n100.a
n99.out → n100.b
n98.out → n97.atom1
n100.out → n97.formula1
n101.out → n97.atom2
n17.out → n97.formula2
n77.out → n76.a
n97.out → n76.b
n102.out → n103.assertion
n104.out → n103.atom1
n17.out → n103.formula1
n105.out → n103.atom2
n73.out → n103.formula2
n106.out → n103.atom3
n99.out → n103.formula3
n76.out → n75.a
n103.out → n75.b
n62.out → n61.a
n75.out → n61.b
n109.out → n110.assertion
n111.out → n110.atom1
n8.out → n110.formula1
n112.out → n110.atom2
n46.out → n110.formula2
n113.out → n110.atom3
n87.out → n110.formula3
n114.out → n115.assertion
n8.out → n117.a
n87.out → n117.b
n51.out → n118.a
n117.out → n118.b
n99.out → n119.a
n118.out → n119.b
n116.out → n115.atom1
n119.out → n115.formula1
n120.out → n115.atom2
n17.out → n115.formula2
n110.out → n108.a
n115.out → n108.b
n121.out → n122.assertion
n123.out → n122.atom1
n17.out → n122.formula1
n124.out → n122.atom2
n99.out → n122.formula2
n125.out → n122.atom3
n118.out → n122.formula3
n108.out → n107.a
n122.out → n107.b
n61.out → n60.a
n107.out → n60.b
n126.out → n127.assertion
n128.out → n127.atom1
n17.out → n127.formula1
n129.out → n127.atom2
n51.out → n127.formula2
n130.out → n127.atom3
n117.out → n127.formula3
n60.out → n59.a
n127.out → n59.b
n33.out → n32.a
n59.out → n32.b
n131.out → n132.assertion
n133.out → n132.atom1
n17.out → n132.formula1
n134.out → n132.atom2
n8.out → n132.formula2
n135.out → n132.atom3
n87.out → n132.formula3
n32.out → n31.a
n132.out → n31.b
n136.out → n137.assertion
n17.out → n139.a
n87.out → n139.b
n21.out → n140.a
n139.out → n140.b
n138.out → n137.atom1
n140.out → n137.formula1
n141.out → n137.atom2
n8.out → n137.formula2
n31.out → n30.a
n137.out → n30.b
n142.out → n143.assertion
n144.out → n143.atom1
n8.out → n143.formula1
n145.out → n143.atom2
n21.out → n143.formula2
n146.out → n143.atom3
n139.out → n143.formula3
n30.out → n29.a
n143.out → n29.b
n2.out → n1.a
n29.out → n1.b
n1.out → n147.proof
```

</details>

### *18 · 替换前件（左）

- 目标：`⊢ ( ( ( P → Q ) → R ) → ( Q → R ) )`
- 提示：从 B 出发先用 A1 得到 A→B。
- 参考解：103 个模块 / 150 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n104  [target]
n1  mp
n2  mp
n3  定理 *01
n4  subst
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  atom R
n10  imp
n11  mp
n12  mp
n13  axiom A1
n14  subst
n15  atom P
n16  atom Q
n17  axiom A1
n18  subst
n19  atom P
n20  imp
n21  imp
n22  atom Q
n23  axiom A2
n24  subst
n25  atom P
n26  atom Q
n27  atom R
n28  mp
n29  mp
n30  mp
n31  mp
n32  mp
n33  axiom A1
n34  subst
n35  atom P
n36  atom Q
n37  mp
n38  mp
n39  axiom A1
n40  subst
n41  atom P
n42  atom Q
n43  axiom A1
n44  subst
n45  atom P
n46  imp
n47  imp
n48  atom Q
n49  axiom A2
n50  subst
n51  atom P
n52  atom Q
n53  atom R
n54  mp
n55  mp
n56  mp
n57  mp
n58  mp
n59  定理 *01
n60  subst
n61  atom P
n62  axiom A1
n63  subst
n64  atom P
n65  imp
n66  atom Q
n67  axiom A2
n68  subst
n69  atom P
n70  atom Q
n71  atom R
n72  axiom A2
n73  subst
n74  atom P
n75  atom Q
n76  atom R
n77  axiom A1
n78  subst
n79  atom P
n80  imp
n81  imp
n82  atom Q
n83  axiom A2
n84  subst
n85  atom P
n86  atom Q
n87  atom R
n88  axiom A2
n89  subst
n90  atom P
n91  atom Q
n92  atom R
n93  axiom A1
n94  subst
n95  atom P
n96  imp
n97  imp
n98  atom Q
n99  axiom A2
n100  subst
n101  atom P
n102  atom Q
n103  atom R

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
n16.out → n14.atom2
n7.out → n14.formula2
n17.out → n18.assertion
n7.out → n20.a
n10.out → n20.b
n10.out → n21.a
n20.out → n21.b
n19.out → n18.atom1
n21.out → n18.formula1
n22.out → n18.atom2
n10.out → n18.formula2
n14.out → n12.a
n18.out → n12.b
n23.out → n24.assertion
n25.out → n24.atom1
n10.out → n24.formula1
n26.out → n24.atom2
n10.out → n24.formula2
n27.out → n24.atom3
n20.out → n24.formula3
n12.out → n11.a
n24.out → n11.b
n4.out → n2.a
n11.out → n2.b
n33.out → n34.assertion
n35.out → n34.atom1
n7.out → n34.formula1
n36.out → n34.atom2
n6.out → n34.formula2
n39.out → n40.assertion
n41.out → n40.atom1
n8.out → n40.formula1
n42.out → n40.atom2
n10.out → n40.formula2
n43.out → n44.assertion
n10.out → n46.a
n8.out → n46.b
n8.out → n47.a
n46.out → n47.b
n45.out → n44.atom1
n47.out → n44.formula1
n48.out → n44.atom2
n7.out → n44.formula2
n40.out → n38.a
n44.out → n38.b
n49.out → n50.assertion
n51.out → n50.atom1
n7.out → n50.formula1
n52.out → n50.atom2
n8.out → n50.formula2
n53.out → n50.atom3
n46.out → n50.formula3
n38.out → n37.a
n50.out → n37.b
n34.out → n32.a
n37.out → n32.b
n59.out → n60.assertion
n61.out → n60.atom1
n9.out → n60.formula1
n62.out → n63.assertion
n9.out → n65.a
n9.out → n65.b
n64.out → n63.atom1
n65.out → n63.formula1
n66.out → n63.atom2
n8.out → n63.formula2
n60.out → n58.a
n63.out → n58.b
n67.out → n68.assertion
n69.out → n68.atom1
n8.out → n68.formula1
n70.out → n68.atom2
n9.out → n68.formula2
n71.out → n68.atom3
n9.out → n68.formula3
n58.out → n57.a
n68.out → n57.b
n72.out → n73.assertion
n74.out → n73.atom1
n10.out → n73.formula1
n75.out → n73.atom2
n8.out → n73.formula2
n76.out → n73.atom3
n9.out → n73.formula3
n57.out → n56.a
n73.out → n56.b
n77.out → n78.assertion
n10.out → n80.a
n9.out → n80.b
n46.out → n81.a
n80.out → n81.b
n79.out → n78.atom1
n81.out → n78.formula1
n82.out → n78.atom2
n7.out → n78.formula2
n56.out → n55.a
n78.out → n55.b
n83.out → n84.assertion
n85.out → n84.atom1
n7.out → n84.formula1
n86.out → n84.atom2
n46.out → n84.formula2
n87.out → n84.atom3
n80.out → n84.formula3
n55.out → n54.a
n84.out → n54.b
n32.out → n31.a
n54.out → n31.b
n88.out → n89.assertion
n90.out → n89.atom1
n7.out → n89.formula1
n91.out → n89.atom2
n10.out → n89.formula2
n92.out → n89.atom3
n9.out → n89.formula3
n31.out → n30.a
n89.out → n30.b
n93.out → n94.assertion
n7.out → n96.a
n9.out → n96.b
n20.out → n97.a
n96.out → n97.b
n95.out → n94.atom1
n97.out → n94.formula1
n98.out → n94.atom2
n10.out → n94.formula2
n30.out → n29.a
n94.out → n29.b
n99.out → n100.assertion
n101.out → n100.atom1
n10.out → n100.formula1
n102.out → n100.atom2
n20.out → n100.formula2
n103.out → n100.atom3
n96.out → n100.formula3
n29.out → n28.a
n100.out → n28.b
n2.out → n1.a
n28.out → n1.b
n1.out → n104.proof
```

</details>

### *19 · 替换前件（右）

- 目标：`⊢ ( ( ( P → Q ) → R ) → ( ¬ P → R ) )`
- 提示：从 A 出发先用 A1 得到 A→B。
- 参考解：104 个模块 / 151 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n105  [target]
n1  mp
n2  mp
n3  定理 *01
n4  subst
n5  atom P
n6  atom P
n7  atom Q
n8  imp
n9  atom R
n10  imp
n11  mp
n12  mp
n13  axiom A1
n14  subst
n15  atom P
n16  atom Q
n17  not
n18  axiom A1
n19  subst
n20  atom P
n21  imp
n22  imp
n23  atom Q
n24  axiom A2
n25  subst
n26  atom P
n27  atom Q
n28  atom R
n29  mp
n30  mp
n31  mp
n32  mp
n33  mp
n34  定理 *14
n35  subst
n36  atom P
n37  atom Q
n38  mp
n39  mp
n40  axiom A1
n41  subst
n42  atom P
n43  atom Q
n44  axiom A1
n45  subst
n46  atom P
n47  imp
n48  imp
n49  atom Q
n50  axiom A2
n51  subst
n52  atom P
n53  atom Q
n54  atom R
n55  mp
n56  mp
n57  mp
n58  mp
n59  mp
n60  定理 *01
n61  subst
n62  atom P
n63  axiom A1
n64  subst
n65  atom P
n66  imp
n67  atom Q
n68  axiom A2
n69  subst
n70  atom P
n71  atom Q
n72  atom R
n73  axiom A2
n74  subst
n75  atom P
n76  atom Q
n77  atom R
n78  axiom A1
n79  subst
n80  atom P
n81  imp
n82  imp
n83  atom Q
n84  axiom A2
n85  subst
n86  atom P
n87  atom Q
n88  atom R
n89  axiom A2
n90  subst
n91  atom P
n92  atom Q
n93  atom R
n94  axiom A1
n95  subst
n96  atom P
n97  imp
n98  imp
n99  atom Q
n100  axiom A2
n101  subst
n102  atom P
n103  atom Q
n104  atom R

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
n18.out → n19.assertion
n17.out → n21.a
n10.out → n21.b
n10.out → n22.a
n21.out → n22.b
n20.out → n19.atom1
n22.out → n19.formula1
n23.out → n19.atom2
n10.out → n19.formula2
n14.out → n12.a
n19.out → n12.b
n24.out → n25.assertion
n26.out → n25.atom1
n10.out → n25.formula1
n27.out → n25.atom2
n10.out → n25.formula2
n28.out → n25.atom3
n21.out → n25.formula3
n12.out → n11.a
n25.out → n11.b
n4.out → n2.a
n11.out → n2.b
n34.out → n35.assertion
n36.out → n35.atom1
n6.out → n35.formula1
n37.out → n35.atom2
n7.out → n35.formula2
n40.out → n41.assertion
n42.out → n41.atom1
n8.out → n41.formula1
n43.out → n41.atom2
n10.out → n41.formula2
n44.out → n45.assertion
n10.out → n47.a
n8.out → n47.b
n8.out → n48.a
n47.out → n48.b
n46.out → n45.atom1
n48.out → n45.formula1
n49.out → n45.atom2
n17.out → n45.formula2
n41.out → n39.a
n45.out → n39.b
n50.out → n51.assertion
n52.out → n51.atom1
n17.out → n51.formula1
n53.out → n51.atom2
n8.out → n51.formula2
n54.out → n51.atom3
n47.out → n51.formula3
n39.out → n38.a
n51.out → n38.b
n35.out → n33.a
n38.out → n33.b
n60.out → n61.assertion
n62.out → n61.atom1
n9.out → n61.formula1
n63.out → n64.assertion
n9.out → n66.a
n9.out → n66.b
n65.out → n64.atom1
n66.out → n64.formula1
n67.out → n64.atom2
n8.out → n64.formula2
n61.out → n59.a
n64.out → n59.b
n68.out → n69.assertion
n70.out → n69.atom1
n8.out → n69.formula1
n71.out → n69.atom2
n9.out → n69.formula2
n72.out → n69.atom3
n9.out → n69.formula3
n59.out → n58.a
n69.out → n58.b
n73.out → n74.assertion
n75.out → n74.atom1
n10.out → n74.formula1
n76.out → n74.atom2
n8.out → n74.formula2
n77.out → n74.atom3
n9.out → n74.formula3
n58.out → n57.a
n74.out → n57.b
n78.out → n79.assertion
n10.out → n81.a
n9.out → n81.b
n47.out → n82.a
n81.out → n82.b
n80.out → n79.atom1
n82.out → n79.formula1
n83.out → n79.atom2
n17.out → n79.formula2
n57.out → n56.a
n79.out → n56.b
n84.out → n85.assertion
n86.out → n85.atom1
n17.out → n85.formula1
n87.out → n85.atom2
n47.out → n85.formula2
n88.out → n85.atom3
n81.out → n85.formula3
n56.out → n55.a
n85.out → n55.b
n33.out → n32.a
n55.out → n32.b
n89.out → n90.assertion
n91.out → n90.atom1
n17.out → n90.formula1
n92.out → n90.atom2
n10.out → n90.formula2
n93.out → n90.atom3
n9.out → n90.formula3
n32.out → n31.a
n90.out → n31.b
n94.out → n95.assertion
n17.out → n97.a
n9.out → n97.b
n21.out → n98.a
n97.out → n98.b
n96.out → n95.atom1
n98.out → n95.formula1
n99.out → n95.atom2
n10.out → n95.formula2
n31.out → n30.a
n95.out → n30.b
n100.out → n101.assertion
n102.out → n101.atom1
n10.out → n101.formula1
n103.out → n101.atom2
n21.out → n101.formula2
n104.out → n101.atom3
n97.out → n101.formula3
n30.out → n29.a
n101.out → n29.b
n2.out → n1.a
n29.out → n1.b
n1.out → n105.proof
```

</details>

### *20 · 合取前件拆分

- 目标：`⊢ ( ( ( P ∧ Q ) → R ) → ( P → ( Q → R ) ) )`
- 提示：把合取前件拆成两层前件（演绎定理自动处理假设）。
- 参考解：508 个模块 / 768 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n509  [target]
n1  mp
n2  mp
n3  mp
n4  mp
n5  subst
n6  定理 *01
n7  atom P
n8  atom Q
n9  subst
n10  axiom A1
n11  atom P
n12  imp
n13  atom Q
n14  atom P
n15  and
n16  atom R
n17  imp
n18  mp
n19  mp
n20  subst
n21  axiom A1
n22  atom P
n23  atom Q
n24  subst
n25  axiom A1
n26  atom P
n27  imp
n28  imp
n29  atom Q
n30  subst
n31  axiom A2
n32  atom P
n33  atom Q
n34  atom R
n35  mp
n36  mp
n37  mp
n38  mp
n39  mp
n40  mp
n41  subst
n42  定理 *01
n43  atom P
n44  subst
n45  axiom A1
n46  atom P
n47  imp
n48  atom Q
n49  mp
n50  mp
n51  mp
n52  mp
n53  subst
n54  axiom A1
n55  atom P
n56  atom Q
n57  subst
n58  axiom A1
n59  atom P
n60  imp
n61  imp
n62  atom Q
n63  mp
n64  mp
n65  subst
n66  axiom A1
n67  atom P
n68  atom Q
n69  subst
n70  axiom A1
n71  atom P
n72  imp
n73  imp
n74  atom Q
n75  subst
n76  axiom A2
n77  atom P
n78  atom Q
n79  atom R
n80  mp
n81  mp
n82  subst
n83  axiom A2
n84  atom P
n85  atom Q
n86  atom R
n87  subst
n88  axiom A1
n89  atom P
n90  imp
n91  imp
n92  atom Q
n93  subst
n94  axiom A2
n95  atom P
n96  atom Q
n97  atom R
n98  subst
n99  axiom A2
n100  atom P
n101  atom Q
n102  atom R
n103  mp
n104  mp
n105  mp
n106  mp
n107  mp
n108  mp
n109  and-intro-ax
n110  subst
n111  axiom A1
n112  atom P
n113  imp
n114  imp
n115  atom Q
n116  mp
n117  mp
n118  subst
n119  axiom A1
n120  atom P
n121  atom Q
n122  subst
n123  axiom A1
n124  atom P
n125  imp
n126  imp
n127  atom Q
n128  subst
n129  axiom A2
n130  atom P
n131  atom Q
n132  atom R
n133  mp
n134  mp
n135  mp
n136  mp
n137  subst
n138  axiom A1
n139  atom P
n140  atom Q
n141  subst
n142  axiom A1
n143  atom P
n144  imp
n145  imp
n146  atom Q
n147  mp
n148  mp
n149  subst
n150  axiom A1
n151  atom P
n152  atom Q
n153  subst
n154  axiom A1
n155  atom P
n156  imp
n157  imp
n158  atom Q
n159  subst
n160  axiom A2
n161  atom P
n162  atom Q
n163  atom R
n164  mp
n165  mp
n166  subst
n167  axiom A2
n168  atom P
n169  atom Q
n170  atom R
n171  subst
n172  axiom A1
n173  atom P
n174  imp
n175  imp
n176  imp
n177  atom Q
n178  subst
n179  axiom A2
n180  atom P
n181  atom Q
n182  atom R
n183  subst
n184  axiom A2
n185  atom P
n186  atom Q
n187  atom R
n188  mp
n189  mp
n190  mp
n191  mp
n192  subst
n193  axiom A2
n194  atom P
n195  atom Q
n196  atom R
n197  subst
n198  axiom A1
n199  atom P
n200  imp
n201  imp
n202  imp
n203  atom Q
n204  mp
n205  mp
n206  subst
n207  axiom A1
n208  atom P
n209  atom Q
n210  subst
n211  axiom A1
n212  atom P
n213  imp
n214  imp
n215  atom Q
n216  subst
n217  axiom A2
n218  atom P
n219  atom Q
n220  atom R
n221  mp
n222  mp
n223  subst
n224  axiom A2
n225  atom P
n226  atom Q
n227  atom R
n228  subst
n229  axiom A1
n230  atom P
n231  imp
n232  imp
n233  imp
n234  atom Q
n235  subst
n236  axiom A2
n237  atom P
n238  atom Q
n239  atom R
n240  subst
n241  axiom A2
n242  atom P
n243  atom Q
n244  atom R
n245  mp
n246  mp
n247  subst
n248  axiom A2
n249  atom P
n250  atom Q
n251  atom R
n252  subst
n253  axiom A1
n254  atom P
n255  imp
n256  imp
n257  imp
n258  atom Q
n259  subst
n260  axiom A2
n261  atom P
n262  atom Q
n263  atom R
n264  subst
n265  axiom A2
n266  atom P
n267  atom Q
n268  atom R
n269  mp
n270  mp
n271  mp
n272  mp
n273  subst
n274  axiom A2
n275  atom P
n276  atom Q
n277  atom R
n278  subst
n279  axiom A1
n280  atom P
n281  imp
n282  imp
n283  atom Q
n284  mp
n285  mp
n286  subst
n287  axiom A1
n288  atom P
n289  atom Q
n290  subst
n291  axiom A1
n292  atom P
n293  imp
n294  imp
n295  atom Q
n296  subst
n297  axiom A2
n298  atom P
n299  atom Q
n300  atom R
n301  mp
n302  mp
n303  subst
n304  axiom A2
n305  atom P
n306  atom Q
n307  atom R
n308  subst
n309  axiom A1
n310  atom P
n311  imp
n312  imp
n313  imp
n314  atom Q
n315  subst
n316  axiom A2
n317  atom P
n318  atom Q
n319  atom R
n320  subst
n321  axiom A2
n322  atom P
n323  atom Q
n324  atom R
n325  mp
n326  mp
n327  subst
n328  axiom A2
n329  atom P
n330  atom Q
n331  atom R
n332  subst
n333  axiom A1
n334  atom P
n335  imp
n336  imp
n337  atom Q
n338  subst
n339  axiom A2
n340  atom P
n341  atom Q
n342  atom R
n343  subst
n344  axiom A2
n345  atom P
n346  atom Q
n347  atom R
n348  mp
n349  mp
n350  mp
n351  mp
n352  mp
n353  subst
n354  定理 *01
n355  atom P
n356  mp
n357  mp
n358  subst
n359  axiom A1
n360  atom P
n361  atom Q
n362  subst
n363  axiom A1
n364  atom P
n365  imp
n366  imp
n367  atom Q
n368  subst
n369  axiom A2
n370  atom P
n371  atom Q
n372  atom R
n373  mp
n374  mp
n375  mp
n376  mp
n377  subst
n378  axiom A1
n379  atom P
n380  atom Q
n381  subst
n382  axiom A1
n383  atom P
n384  imp
n385  imp
n386  atom Q
n387  mp
n388  mp
n389  subst
n390  axiom A1
n391  atom P
n392  atom Q
n393  subst
n394  axiom A1
n395  atom P
n396  imp
n397  imp
n398  atom Q
n399  subst
n400  axiom A2
n401  atom P
n402  atom Q
n403  atom R
n404  mp
n405  mp
n406  subst
n407  axiom A2
n408  atom P
n409  atom Q
n410  atom R
n411  subst
n412  axiom A1
n413  atom P
n414  imp
n415  imp
n416  imp
n417  atom Q
n418  subst
n419  axiom A2
n420  atom P
n421  atom Q
n422  atom R
n423  subst
n424  axiom A2
n425  atom P
n426  atom Q
n427  atom R
n428  mp
n429  mp
n430  mp
n431  mp
n432  subst
n433  axiom A2
n434  atom P
n435  atom Q
n436  atom R
n437  subst
n438  axiom A1
n439  atom P
n440  imp
n441  imp
n442  imp
n443  atom Q
n444  mp
n445  mp
n446  subst
n447  axiom A1
n448  atom P
n449  atom Q
n450  subst
n451  axiom A1
n452  atom P
n453  imp
n454  imp
n455  atom Q
n456  subst
n457  axiom A2
n458  atom P
n459  atom Q
n460  atom R
n461  mp
n462  mp
n463  subst
n464  axiom A2
n465  atom P
n466  atom Q
n467  atom R
n468  subst
n469  axiom A1
n470  atom P
n471  imp
n472  imp
n473  imp
n474  atom Q
n475  subst
n476  axiom A2
n477  atom P
n478  atom Q
n479  atom R
n480  subst
n481  axiom A2
n482  atom P
n483  atom Q
n484  atom R
n485  mp
n486  mp
n487  subst
n488  axiom A2
n489  atom P
n490  atom Q
n491  atom R
n492  subst
n493  axiom A1
n494  atom P
n495  imp
n496  imp
n497  imp
n498  atom Q
n499  subst
n500  axiom A2
n501  atom P
n502  atom Q
n503  atom R
n504  subst
n505  axiom A2
n506  atom P
n507  atom Q
n508  atom R

接线：
n6.out → n5.assertion
n7.out → n5.atom1
n8.out → n5.formula1
n10.out → n9.assertion
n8.out → n12.a
n8.out → n12.b
n11.out → n9.atom1
n12.out → n9.formula1
n14.out → n15.a
n8.out → n15.b
n15.out → n17.a
n16.out → n17.b
n13.out → n9.atom2
n17.out → n9.formula2
n5.out → n4.a
n9.out → n4.b
n21.out → n20.assertion
n22.out → n20.atom1
n12.out → n20.formula1
n23.out → n20.atom2
n14.out → n20.formula2
n25.out → n24.assertion
n14.out → n27.a
n12.out → n27.b
n12.out → n28.a
n27.out → n28.b
n26.out → n24.atom1
n28.out → n24.formula1
n29.out → n24.atom2
n17.out → n24.formula2
n20.out → n19.a
n24.out → n19.b
n31.out → n30.assertion
n32.out → n30.atom1
n17.out → n30.formula1
n33.out → n30.atom2
n12.out → n30.formula2
n34.out → n30.atom3
n27.out → n30.formula3
n19.out → n18.a
n30.out → n18.b
n4.out → n3.a
n18.out → n3.b
n42.out → n41.assertion
n43.out → n41.atom1
n14.out → n41.formula1
n45.out → n44.assertion
n14.out → n47.a
n14.out → n47.b
n46.out → n44.atom1
n47.out → n44.formula1
n48.out → n44.atom2
n17.out → n44.formula2
n41.out → n40.a
n44.out → n40.b
n54.out → n53.assertion
n55.out → n53.atom1
n14.out → n53.formula1
n56.out → n53.atom2
n8.out → n53.formula2
n58.out → n57.assertion
n8.out → n60.a
n14.out → n60.b
n14.out → n61.a
n60.out → n61.b
n59.out → n57.atom1
n61.out → n57.formula1
n62.out → n57.atom2
n17.out → n57.formula2
n53.out → n52.a
n57.out → n52.b
n66.out → n65.assertion
n67.out → n65.atom1
n61.out → n65.formula1
n68.out → n65.atom2
n14.out → n65.formula2
n70.out → n69.assertion
n14.out → n72.a
n61.out → n72.b
n61.out → n73.a
n72.out → n73.b
n71.out → n69.atom1
n73.out → n69.formula1
n74.out → n69.atom2
n17.out → n69.formula2
n65.out → n64.a
n69.out → n64.b
n76.out → n75.assertion
n77.out → n75.atom1
n17.out → n75.formula1
n78.out → n75.atom2
n61.out → n75.formula2
n79.out → n75.atom3
n72.out → n75.formula3
n64.out → n63.a
n75.out → n63.b
n52.out → n51.a
n63.out → n51.b
n83.out → n82.assertion
n84.out → n82.atom1
n14.out → n82.formula1
n85.out → n82.atom2
n14.out → n82.formula2
n86.out → n82.atom3
n60.out → n82.formula3
n88.out → n87.assertion
n47.out → n90.a
n61.out → n90.b
n72.out → n91.a
n90.out → n91.b
n89.out → n87.atom1
n91.out → n87.formula1
n92.out → n87.atom2
n17.out → n87.formula2
n82.out → n81.a
n87.out → n81.b
n94.out → n93.assertion
n95.out → n93.atom1
n17.out → n93.formula1
n96.out → n93.atom2
n72.out → n93.formula2
n97.out → n93.atom3
n90.out → n93.formula3
n81.out → n80.a
n93.out → n80.b
n51.out → n50.a
n80.out → n50.b
n99.out → n98.assertion
n100.out → n98.atom1
n17.out → n98.formula1
n101.out → n98.atom2
n47.out → n98.formula2
n102.out → n98.atom3
n61.out → n98.formula3
n50.out → n49.a
n98.out → n49.b
n40.out → n39.a
n49.out → n39.b
n14.out → n109.a
n8.out → n109.b
n111.out → n110.assertion
n8.out → n113.a
n15.out → n113.b
n14.out → n114.a
n113.out → n114.b
n112.out → n110.atom1
n114.out → n110.formula1
n115.out → n110.atom2
n17.out → n110.formula2
n109.out → n108.a
n110.out → n108.b
n119.out → n118.assertion
n120.out → n118.atom1
n114.out → n118.formula1
n121.out → n118.atom2
n14.out → n118.formula2
n123.out → n122.assertion
n14.out → n125.a
n114.out → n125.b
n114.out → n126.a
n125.out → n126.b
n124.out → n122.atom1
n126.out → n122.formula1
n127.out → n122.atom2
n17.out → n122.formula2
n118.out → n117.a
n122.out → n117.b
n129.out → n128.assertion
n130.out → n128.atom1
n17.out → n128.formula1
n131.out → n128.atom2
n114.out → n128.formula2
n132.out → n128.atom3
n125.out → n128.formula3
n117.out → n116.a
n128.out → n116.b
n108.out → n107.a
n116.out → n107.b
n138.out → n137.assertion
n139.out → n137.atom1
n114.out → n137.formula1
n140.out → n137.atom2
n8.out → n137.formula2
n142.out → n141.assertion
n8.out → n144.a
n114.out → n144.b
n114.out → n145.a
n144.out → n145.b
n143.out → n141.atom1
n145.out → n141.formula1
n146.out → n141.atom2
n17.out → n141.formula2
n137.out → n136.a
n141.out → n136.b
n150.out → n149.assertion
n151.out → n149.atom1
n145.out → n149.formula1
n152.out → n149.atom2
n14.out → n149.formula2
n154.out → n153.assertion
n14.out → n156.a
n145.out → n156.b
n145.out → n157.a
n156.out → n157.b
n155.out → n153.atom1
n157.out → n153.formula1
n158.out → n153.atom2
n17.out → n153.formula2
n149.out → n148.a
n153.out → n148.b
n160.out → n159.assertion
n161.out → n159.atom1
n17.out → n159.formula1
n162.out → n159.atom2
n145.out → n159.formula2
n163.out → n159.atom3
n156.out → n159.formula3
n148.out → n147.a
n159.out → n147.b
n136.out → n135.a
n147.out → n135.b
n167.out → n166.assertion
n168.out → n166.atom1
n14.out → n166.formula1
n169.out → n166.atom2
n114.out → n166.formula2
n170.out → n166.atom3
n144.out → n166.formula3
n172.out → n171.assertion
n14.out → n174.a
n144.out → n174.b
n125.out → n175.a
n174.out → n175.b
n156.out → n176.a
n175.out → n176.b
n173.out → n171.atom1
n176.out → n171.formula1
n177.out → n171.atom2
n17.out → n171.formula2
n166.out → n165.a
n171.out → n165.b
n179.out → n178.assertion
n180.out → n178.atom1
n17.out → n178.formula1
n181.out → n178.atom2
n156.out → n178.formula2
n182.out → n178.atom3
n175.out → n178.formula3
n165.out → n164.a
n178.out → n164.b
n135.out → n134.a
n164.out → n134.b
n184.out → n183.assertion
n185.out → n183.atom1
n17.out → n183.formula1
n186.out → n183.atom2
n125.out → n183.formula2
n187.out → n183.atom3
n174.out → n183.formula3
n134.out → n133.a
n183.out → n133.b
n107.out → n106.a
n133.out → n106.b
n193.out → n192.assertion
n194.out → n192.atom1
n8.out → n192.formula1
n195.out → n192.atom2
n14.out → n192.formula2
n196.out → n192.atom3
n113.out → n192.formula3
n198.out → n197.assertion
n8.out → n200.a
n113.out → n200.b
n60.out → n201.a
n200.out → n201.b
n144.out → n202.a
n201.out → n202.b
n199.out → n197.atom1
n202.out → n197.formula1
n203.out → n197.atom2
n17.out → n197.formula2
n192.out → n191.a
n197.out → n191.b
n207.out → n206.assertion
n208.out → n206.atom1
n202.out → n206.formula1
n209.out → n206.atom2
n14.out → n206.formula2
n211.out → n210.assertion
n14.out → n213.a
n202.out → n213.b
n202.out → n214.a
n213.out → n214.b
n212.out → n210.atom1
n214.out → n210.formula1
n215.out → n210.atom2
n17.out → n210.formula2
n206.out → n205.a
n210.out → n205.b
n217.out → n216.assertion
n218.out → n216.atom1
n17.out → n216.formula1
n219.out → n216.atom2
n202.out → n216.formula2
n220.out → n216.atom3
n213.out → n216.formula3
n205.out → n204.a
n216.out → n204.b
n191.out → n190.a
n204.out → n190.b
n224.out → n223.assertion
n225.out → n223.atom1
n14.out → n223.formula1
n226.out → n223.atom2
n144.out → n223.formula2
n227.out → n223.atom3
n201.out → n223.formula3
n229.out → n228.assertion
n14.out → n231.a
n201.out → n231.b
n174.out → n232.a
n231.out → n232.b
n213.out → n233.a
n232.out → n233.b
n230.out → n228.atom1
n233.out → n228.formula1
n234.out → n228.atom2
n17.out → n228.formula2
n223.out → n222.a
n228.out → n222.b
n236.out → n235.assertion
n237.out → n235.atom1
n17.out → n235.formula1
n238.out → n235.atom2
n213.out → n235.formula2
n239.out → n235.atom3
n232.out → n235.formula3
n222.out → n221.a
n235.out → n221.b
n190.out → n189.a
n221.out → n189.b
n241.out → n240.assertion
n242.out → n240.atom1
n17.out → n240.formula1
n243.out → n240.atom2
n174.out → n240.formula2
n244.out → n240.atom3
n231.out → n240.formula3
n189.out → n188.a
n240.out → n188.b
n106.out → n105.a
n188.out → n105.b
n248.out → n247.assertion
n249.out → n247.atom1
n14.out → n247.formula1
n250.out → n247.atom2
n60.out → n247.formula2
n251.out → n247.atom3
n200.out → n247.formula3
n253.out → n252.assertion
n14.out → n255.a
n200.out → n255.b
n61.out → n256.a
n255.out → n256.b
n231.out → n257.a
n256.out → n257.b
n254.out → n252.atom1
n257.out → n252.formula1
n258.out → n252.atom2
n17.out → n252.formula2
n247.out → n246.a
n252.out → n246.b
n260.out → n259.assertion
n261.out → n259.atom1
n17.out → n259.formula1
n262.out → n259.atom2
n231.out → n259.formula2
n263.out → n259.atom3
n256.out → n259.formula3
n246.out → n245.a
n259.out → n245.b
n105.out → n104.a
n245.out → n104.b
n265.out → n264.assertion
n266.out → n264.atom1
n17.out → n264.formula1
n267.out → n264.atom2
n61.out → n264.formula2
n268.out → n264.atom3
n255.out → n264.formula3
n104.out → n103.a
n264.out → n103.b
n39.out → n38.a
n103.out → n38.b
n274.out → n273.assertion
n275.out → n273.atom1
n8.out → n273.formula1
n276.out → n273.atom2
n8.out → n273.formula2
n277.out → n273.atom3
n15.out → n273.formula3
n279.out → n278.assertion
n12.out → n281.a
n113.out → n281.b
n200.out → n282.a
n281.out → n282.b
n280.out → n278.atom1
n282.out → n278.formula1
n283.out → n278.atom2
n17.out → n278.formula2
n273.out → n272.a
n278.out → n272.b
n287.out → n286.assertion
n288.out → n286.atom1
n282.out → n286.formula1
n289.out → n286.atom2
n14.out → n286.formula2
n291.out → n290.assertion
n14.out → n293.a
n282.out → n293.b
n282.out → n294.a
n293.out → n294.b
n292.out → n290.atom1
n294.out → n290.formula1
n295.out → n290.atom2
n17.out → n290.formula2
n286.out → n285.a
n290.out → n285.b
n297.out → n296.assertion
n298.out → n296.atom1
n17.out → n296.formula1
n299.out → n296.atom2
n282.out → n296.formula2
n300.out → n296.atom3
n293.out → n296.formula3
n285.out → n284.a
n296.out → n284.b
n272.out → n271.a
n284.out → n271.b
n304.out → n303.assertion
n305.out → n303.atom1
n14.out → n303.formula1
n306.out → n303.atom2
n200.out → n303.formula2
n307.out → n303.atom3
n281.out → n303.formula3
n309.out → n308.assertion
n14.out → n311.a
n281.out → n311.b
n255.out → n312.a
n311.out → n312.b
n293.out → n313.a
n312.out → n313.b
n310.out → n308.atom1
n313.out → n308.formula1
n314.out → n308.atom2
n17.out → n308.formula2
n303.out → n302.a
n308.out → n302.b
n316.out → n315.assertion
n317.out → n315.atom1
n17.out → n315.formula1
n318.out → n315.atom2
n293.out → n315.formula2
n319.out → n315.atom3
n312.out → n315.formula3
n302.out → n301.a
n315.out → n301.b
n271.out → n270.a
n301.out → n270.b
n321.out → n320.assertion
n322.out → n320.atom1
n17.out → n320.formula1
n323.out → n320.atom2
n255.out → n320.formula2
n324.out → n320.atom3
n311.out → n320.formula3
n270.out → n269.a
n320.out → n269.b
n38.out → n37.a
n269.out → n37.b
n328.out → n327.assertion
n329.out → n327.atom1
n14.out → n327.formula1
n330.out → n327.atom2
n12.out → n327.formula2
n331.out → n327.atom3
n113.out → n327.formula3
n333.out → n332.assertion
n27.out → n335.a
n114.out → n335.b
n311.out → n336.a
n335.out → n336.b
n334.out → n332.atom1
n336.out → n332.formula1
n337.out → n332.atom2
n17.out → n332.formula2
n327.out → n326.a
n332.out → n326.b
n339.out → n338.assertion
n340.out → n338.atom1
n17.out → n338.formula1
n341.out → n338.atom2
n311.out → n338.formula2
n342.out → n338.atom3
n335.out → n338.formula3
n326.out → n325.a
n338.out → n325.b
n37.out → n36.a
n325.out → n36.b
n344.out → n343.assertion
n345.out → n343.atom1
n17.out → n343.formula1
n346.out → n343.atom2
n27.out → n343.formula2
n347.out → n343.atom3
n114.out → n343.formula3
n36.out → n35.a
n343.out → n35.b
n3.out → n2.a
n35.out → n2.b
n354.out → n353.assertion
n355.out → n353.atom1
n17.out → n353.formula1
n359.out → n358.assertion
n360.out → n358.atom1
n17.out → n358.formula1
n361.out → n358.atom2
n14.out → n358.formula2
n363.out → n362.assertion
n14.out → n365.a
n17.out → n365.b
n17.out → n366.a
n365.out → n366.b
n364.out → n362.atom1
n366.out → n362.formula1
n367.out → n362.atom2
n17.out → n362.formula2
n358.out → n357.a
n362.out → n357.b
n369.out → n368.assertion
n370.out → n368.atom1
n17.out → n368.formula1
n371.out → n368.atom2
n17.out → n368.formula2
n372.out → n368.atom3
n365.out → n368.formula3
n357.out → n356.a
n368.out → n356.b
n353.out → n352.a
n356.out → n352.b
n378.out → n377.assertion
n379.out → n377.atom1
n17.out → n377.formula1
n380.out → n377.atom2
n8.out → n377.formula2
n382.out → n381.assertion
n8.out → n384.a
n17.out → n384.b
n17.out → n385.a
n384.out → n385.b
n383.out → n381.atom1
n385.out → n381.formula1
n386.out → n381.atom2
n17.out → n381.formula2
n377.out → n376.a
n381.out → n376.b
n390.out → n389.assertion
n391.out → n389.atom1
n385.out → n389.formula1
n392.out → n389.atom2
n14.out → n389.formula2
n394.out → n393.assertion
n14.out → n396.a
n385.out → n396.b
n385.out → n397.a
n396.out → n397.b
n395.out → n393.atom1
n397.out → n393.formula1
n398.out → n393.atom2
n17.out → n393.formula2
n389.out → n388.a
n393.out → n388.b
n400.out → n399.assertion
n401.out → n399.atom1
n17.out → n399.formula1
n402.out → n399.atom2
n385.out → n399.formula2
n403.out → n399.atom3
n396.out → n399.formula3
n388.out → n387.a
n399.out → n387.b
n376.out → n375.a
n387.out → n375.b
n407.out → n406.assertion
n408.out → n406.atom1
n14.out → n406.formula1
n409.out → n406.atom2
n17.out → n406.formula2
n410.out → n406.atom3
n384.out → n406.formula3
n412.out → n411.assertion
n14.out → n414.a
n384.out → n414.b
n365.out → n415.a
n414.out → n415.b
n396.out → n416.a
n415.out → n416.b
n413.out → n411.atom1
n416.out → n411.formula1
n417.out → n411.atom2
n17.out → n411.formula2
n406.out → n405.a
n411.out → n405.b
n419.out → n418.assertion
n420.out → n418.atom1
n17.out → n418.formula1
n421.out → n418.atom2
n396.out → n418.formula2
n422.out → n418.atom3
n415.out → n418.formula3
n405.out → n404.a
n418.out → n404.b
n375.out → n374.a
n404.out → n374.b
n424.out → n423.assertion
n425.out → n423.atom1
n17.out → n423.formula1
n426.out → n423.atom2
n365.out → n423.formula2
n427.out → n423.atom3
n414.out → n423.formula3
n374.out → n373.a
n423.out → n373.b
n352.out → n351.a
n373.out → n351.b
n433.out → n432.assertion
n434.out → n432.atom1
n8.out → n432.formula1
n435.out → n432.atom2
n15.out → n432.formula2
n436.out → n432.atom3
n16.out → n432.formula3
n438.out → n437.assertion
n8.out → n440.a
n16.out → n440.b
n113.out → n441.a
n440.out → n441.b
n384.out → n442.a
n441.out → n442.b
n439.out → n437.atom1
n442.out → n437.formula1
n443.out → n437.atom2
n17.out → n437.formula2
n432.out → n431.a
n437.out → n431.b
n447.out → n446.assertion
n448.out → n446.atom1
n442.out → n446.formula1
n449.out → n446.atom2
n14.out → n446.formula2
n451.out → n450.assertion
n14.out → n453.a
n442.out → n453.b
n442.out → n454.a
n453.out → n454.b
n452.out → n450.atom1
n454.out → n450.formula1
n455.out → n450.atom2
n17.out → n450.formula2
n446.out → n445.a
n450.out → n445.b
n457.out → n456.assertion
n458.out → n456.atom1
n17.out → n456.formula1
n459.out → n456.atom2
n442.out → n456.formula2
n460.out → n456.atom3
n453.out → n456.formula3
n445.out → n444.a
n456.out → n444.b
n431.out → n430.a
n444.out → n430.b
n464.out → n463.assertion
n465.out → n463.atom1
n14.out → n463.formula1
n466.out → n463.atom2
n384.out → n463.formula2
n467.out → n463.atom3
n441.out → n463.formula3
n469.out → n468.assertion
n14.out → n471.a
n441.out → n471.b
n414.out → n472.a
n471.out → n472.b
n453.out → n473.a
n472.out → n473.b
n470.out → n468.atom1
n473.out → n468.formula1
n474.out → n468.atom2
n17.out → n468.formula2
n463.out → n462.a
n468.out → n462.b
n476.out → n475.assertion
n477.out → n475.atom1
n17.out → n475.formula1
n478.out → n475.atom2
n453.out → n475.formula2
n479.out → n475.atom3
n472.out → n475.formula3
n462.out → n461.a
n475.out → n461.b
n430.out → n429.a
n461.out → n429.b
n481.out → n480.assertion
n482.out → n480.atom1
n17.out → n480.formula1
n483.out → n480.atom2
n414.out → n480.formula2
n484.out → n480.atom3
n471.out → n480.formula3
n429.out → n428.a
n480.out → n428.b
n351.out → n350.a
n428.out → n350.b
n488.out → n487.assertion
n489.out → n487.atom1
n14.out → n487.formula1
n490.out → n487.atom2
n113.out → n487.formula2
n491.out → n487.atom3
n440.out → n487.formula3
n493.out → n492.assertion
n14.out → n495.a
n440.out → n495.b
n114.out → n496.a
n495.out → n496.b
n471.out → n497.a
n496.out → n497.b
n494.out → n492.atom1
n497.out → n492.formula1
n498.out → n492.atom2
n17.out → n492.formula2
n487.out → n486.a
n492.out → n486.b
n500.out → n499.assertion
n501.out → n499.atom1
n17.out → n499.formula1
n502.out → n499.atom2
n471.out → n499.formula2
n503.out → n499.atom3
n496.out → n499.formula3
n486.out → n485.a
n499.out → n485.b
n350.out → n349.a
n485.out → n349.b
n505.out → n504.assertion
n506.out → n504.atom1
n17.out → n504.formula1
n507.out → n504.atom2
n114.out → n504.formula2
n508.out → n504.atom3
n495.out → n504.formula3
n349.out → n348.a
n504.out → n348.b
n2.out → n1.a
n348.out → n1.b
n1.out → n509.proof
```

</details>

### *21 · 预线性

- 目标：`⊢ ( ( ( P → Q ) → ( P → R ) ) → ( P → ( Q → R ) ) )`
- 提示：用 A2 与交换。
- 参考解：181 个模块 / 270 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n182  [target]
n1  mp
n2  mp
n3  mp
n4  mp
n5  定理 *01
n6  subst
n7  atom P
n8  atom P
n9  atom Q
n10  imp
n11  atom R
n12  imp
n13  imp
n14  mp
n15  mp
n16  axiom A1
n17  subst
n18  atom P
n19  atom Q
n20  axiom A1
n21  subst
n22  atom P
n23  imp
n24  imp
n25  atom Q
n26  axiom A2
n27  subst
n28  atom P
n29  atom Q
n30  atom R
n31  mp
n32  mp
n33  mp
n34  mp
n35  mp
n36  axiom A1
n37  subst
n38  atom P
n39  atom Q
n40  mp
n41  mp
n42  axiom A1
n43  subst
n44  atom P
n45  atom Q
n46  axiom A1
n47  subst
n48  atom P
n49  imp
n50  imp
n51  atom Q
n52  axiom A2
n53  subst
n54  atom P
n55  atom Q
n56  atom R
n57  mp
n58  mp
n59  mp
n60  定理 *01
n61  subst
n62  atom P
n63  axiom A2
n64  subst
n65  atom P
n66  atom Q
n67  atom R
n68  axiom A1
n69  subst
n70  atom P
n71  imp
n72  imp
n73  atom Q
n74  axiom A2
n75  subst
n76  atom P
n77  atom Q
n78  atom R
n79  axiom A2
n80  subst
n81  atom P
n82  atom Q
n83  atom R
n84  axiom A1
n85  subst
n86  atom P
n87  imp
n88  imp
n89  atom Q
n90  axiom A2
n91  subst
n92  atom P
n93  atom Q
n94  atom R
n95  mp
n96  mp
n97  axiom A1
n98  subst
n99  atom P
n100  atom Q
n101  axiom A1
n102  subst
n103  atom P
n104  imp
n105  imp
n106  atom Q
n107  axiom A2
n108  subst
n109  atom P
n110  atom Q
n111  atom R
n112  mp
n113  mp
n114  mp
n115  mp
n116  定理 *03
n117  subst
n118  atom P
n119  atom Q
n120  axiom A1
n121  subst
n122  atom P
n123  imp
n124  imp
n125  atom Q
n126  mp
n127  mp
n128  mp
n129  mp
n130  定理 *04
n131  subst
n132  atom P
n133  atom Q
n134  atom R
n135  axiom A1
n136  subst
n137  atom P
n138  imp
n139  imp
n140  imp
n141  atom Q
n142  axiom A2
n143  subst
n144  atom P
n145  atom Q
n146  atom R
n147  axiom A1
n148  subst
n149  atom P
n150  imp
n151  imp
n152  atom Q
n153  axiom A2
n154  subst
n155  atom P
n156  atom Q
n157  atom R
n158  mp
n159  mp
n160  axiom A2
n161  subst
n162  atom P
n163  atom Q
n164  atom R
n165  axiom A1
n166  subst
n167  atom P
n168  imp
n169  imp
n170  imp
n171  atom Q
n172  axiom A2
n173  subst
n174  atom P
n175  atom Q
n176  atom R
n177  axiom A2
n178  subst
n179  atom P
n180  atom Q
n181  atom R

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
n19.out → n17.atom2
n9.out → n17.formula2
n20.out → n21.assertion
n9.out → n23.a
n13.out → n23.b
n13.out → n24.a
n23.out → n24.b
n22.out → n21.atom1
n24.out → n21.formula1
n25.out → n21.atom2
n13.out → n21.formula2
n17.out → n15.a
n21.out → n15.b
n26.out → n27.assertion
n28.out → n27.atom1
n13.out → n27.formula1
n29.out → n27.atom2
n13.out → n27.formula2
n30.out → n27.atom3
n23.out → n27.formula3
n15.out → n14.a
n27.out → n14.b
n6.out → n4.a
n14.out → n4.b
n36.out → n37.assertion
n38.out → n37.atom1
n9.out → n37.formula1
n39.out → n37.atom2
n8.out → n37.formula2
n42.out → n43.assertion
n44.out → n43.atom1
n10.out → n43.formula1
n45.out → n43.atom2
n13.out → n43.formula2
n46.out → n47.assertion
n13.out → n49.a
n10.out → n49.b
n10.out → n50.a
n49.out → n50.b
n48.out → n47.atom1
n50.out → n47.formula1
n51.out → n47.atom2
n9.out → n47.formula2
n43.out → n41.a
n47.out → n41.b
n52.out → n53.assertion
n54.out → n53.atom1
n9.out → n53.formula1
n55.out → n53.atom2
n10.out → n53.formula2
n56.out → n53.atom3
n49.out → n53.formula3
n41.out → n40.a
n53.out → n40.b
n37.out → n35.a
n40.out → n35.b
n60.out → n61.assertion
n62.out → n61.atom1
n13.out → n61.formula1
n63.out → n64.assertion
n65.out → n64.atom1
n13.out → n64.formula1
n66.out → n64.atom2
n10.out → n64.formula2
n67.out → n64.atom3
n12.out → n64.formula3
n61.out → n59.a
n64.out → n59.b
n68.out → n69.assertion
n13.out → n71.a
n12.out → n71.b
n49.out → n72.a
n71.out → n72.b
n70.out → n69.atom1
n72.out → n69.formula1
n73.out → n69.atom2
n9.out → n69.formula2
n59.out → n58.a
n69.out → n58.b
n74.out → n75.assertion
n76.out → n75.atom1
n9.out → n75.formula1
n77.out → n75.atom2
n49.out → n75.formula2
n78.out → n75.atom3
n71.out → n75.formula3
n58.out → n57.a
n75.out → n57.b
n35.out → n34.a
n57.out → n34.b
n79.out → n80.assertion
n81.out → n80.atom1
n9.out → n80.formula1
n82.out → n80.atom2
n13.out → n80.formula2
n83.out → n80.atom3
n12.out → n80.formula3
n34.out → n33.a
n80.out → n33.b
n84.out → n85.assertion
n9.out → n87.a
n12.out → n87.b
n23.out → n88.a
n87.out → n88.b
n86.out → n85.atom1
n88.out → n85.formula1
n89.out → n85.atom2
n13.out → n85.formula2
n33.out → n32.a
n85.out → n32.b
n90.out → n91.assertion
n92.out → n91.atom1
n13.out → n91.formula1
n93.out → n91.atom2
n23.out → n91.formula2
n94.out → n91.atom3
n87.out → n91.formula3
n32.out → n31.a
n91.out → n31.b
n4.out → n3.a
n31.out → n3.b
n97.out → n98.assertion
n99.out → n98.atom1
n87.out → n98.formula1
n100.out → n98.atom2
n8.out → n98.formula2
n101.out → n102.assertion
n8.out → n104.a
n87.out → n104.b
n87.out → n105.a
n104.out → n105.b
n103.out → n102.atom1
n105.out → n102.formula1
n106.out → n102.atom2
n13.out → n102.formula2
n98.out → n96.a
n102.out → n96.b
n107.out → n108.assertion
n109.out → n108.atom1
n13.out → n108.formula1
n110.out → n108.atom2
n87.out → n108.formula2
n111.out → n108.atom3
n104.out → n108.formula3
n96.out → n95.a
n108.out → n95.b
n3.out → n2.a
n95.out → n2.b
n116.out → n117.assertion
n118.out → n117.atom1
n8.out → n117.formula1
n119.out → n117.atom2
n11.out → n117.formula2
n120.out → n121.assertion
n12.out → n123.a
n11.out → n123.b
n8.out → n124.a
n123.out → n124.b
n122.out → n121.atom1
n124.out → n121.formula1
n125.out → n121.atom2
n13.out → n121.formula2
n117.out → n115.a
n121.out → n115.b
n130.out → n131.assertion
n132.out → n131.atom1
n12.out → n131.formula1
n133.out → n131.atom2
n11.out → n131.formula2
n134.out → n131.atom3
n9.out → n131.formula3
n135.out → n136.assertion
n9.out → n138.a
n11.out → n138.b
n87.out → n139.a
n138.out → n139.b
n123.out → n140.a
n139.out → n140.b
n137.out → n136.atom1
n140.out → n136.formula1
n141.out → n136.atom2
n8.out → n136.formula2
n131.out → n129.a
n136.out → n129.b
n142.out → n143.assertion
n144.out → n143.atom1
n8.out → n143.formula1
n145.out → n143.atom2
n123.out → n143.formula2
n146.out → n143.atom3
n139.out → n143.formula3
n129.out → n128.a
n143.out → n128.b
n147.out → n148.assertion
n8.out → n150.a
n139.out → n150.b
n124.out → n151.a
n150.out → n151.b
n149.out → n148.atom1
n151.out → n148.formula1
n152.out → n148.atom2
n13.out → n148.formula2
n128.out → n127.a
n148.out → n127.b
n153.out → n154.assertion
n155.out → n154.atom1
n13.out → n154.formula1
n156.out → n154.atom2
n124.out → n154.formula2
n157.out → n154.atom3
n150.out → n154.formula3
n127.out → n126.a
n154.out → n126.b
n115.out → n114.a
n126.out → n114.b
n160.out → n161.assertion
n162.out → n161.atom1
n8.out → n161.formula1
n163.out → n161.atom2
n87.out → n161.formula2
n164.out → n161.atom3
n138.out → n161.formula3
n165.out → n166.assertion
n8.out → n168.a
n138.out → n168.b
n104.out → n169.a
n168.out → n169.b
n150.out → n170.a
n169.out → n170.b
n167.out → n166.atom1
n170.out → n166.formula1
n171.out → n166.atom2
n13.out → n166.formula2
n161.out → n159.a
n166.out → n159.b
n172.out → n173.assertion
n174.out → n173.atom1
n13.out → n173.formula1
n175.out → n173.atom2
n150.out → n173.formula2
n176.out → n173.atom3
n169.out → n173.formula3
n159.out → n158.a
n173.out → n158.b
n114.out → n113.a
n158.out → n113.b
n177.out → n178.assertion
n179.out → n178.atom1
n13.out → n178.formula1
n180.out → n178.atom2
n104.out → n178.formula2
n181.out → n178.atom3
n168.out → n178.formula3
n113.out → n112.a
n178.out → n112.b
n2.out → n1.a
n112.out → n1.b
n1.out → n182.proof
```

</details>

### *22 · 反证法

- 目标：`⊢ ( ( ¬ P → P ) → P )`
- 提示：用 A3 把 ¬A→A 翻成 ¬A→¬¬A，再配合双重否定。
- 参考解：59 个模块 / 85 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n60  [target]
n1  mp
n2  定理 *01
n3  subst
n4  atom P
n5  atom P
n6  not
n7  imp
n8  mp
n9  mp
n10  mp
n11  定理 *01
n12  subst
n13  atom P
n14  mp
n15  mp
n16  mp
n17  定理 *14
n18  subst
n19  atom P
n20  atom Q
n21  not
n22  axiom A2
n23  subst
n24  atom P
n25  atom Q
n26  atom R
n27  axiom A1
n28  subst
n29  atom P
n30  imp
n31  imp
n32  atom Q
n33  axiom A2
n34  subst
n35  atom P
n36  atom Q
n37  atom R
n38  mp
n39  mp
n40  axiom A3
n41  subst
n42  atom P
n43  atom Q
n44  axiom A1
n45  subst
n46  atom P
n47  imp
n48  imp
n49  atom Q
n50  axiom A2
n51  subst
n52  atom P
n53  atom Q
n54  atom R
n55  axiom A2
n56  subst
n57  atom P
n58  atom Q
n59  atom R

接线：
n2.out → n3.assertion
n5.out → n6.a
n6.out → n7.a
n5.out → n7.b
n4.out → n3.atom1
n7.out → n3.formula1
n11.out → n12.assertion
n13.out → n12.atom1
n7.out → n12.formula1
n17.out → n18.assertion
n19.out → n18.atom1
n5.out → n18.formula1
n7.out → n21.a
n20.out → n18.atom2
n21.out → n18.formula2
n22.out → n23.assertion
n24.out → n23.atom1
n6.out → n23.formula1
n25.out → n23.atom2
n5.out → n23.formula2
n26.out → n23.atom3
n21.out → n23.formula3
n18.out → n16.a
n23.out → n16.b
n27.out → n28.assertion
n6.out → n30.a
n21.out → n30.b
n7.out → n31.a
n30.out → n31.b
n29.out → n28.atom1
n31.out → n28.formula1
n32.out → n28.atom2
n7.out → n28.formula2
n16.out → n15.a
n28.out → n15.b
n33.out → n34.assertion
n35.out → n34.atom1
n7.out → n34.formula1
n36.out → n34.atom2
n7.out → n34.formula2
n37.out → n34.atom3
n30.out → n34.formula3
n15.out → n14.a
n34.out → n14.b
n12.out → n10.a
n14.out → n10.b
n40.out → n41.assertion
n42.out → n41.atom1
n5.out → n41.formula1
n43.out → n41.atom2
n7.out → n41.formula2
n44.out → n45.assertion
n7.out → n47.a
n5.out → n47.b
n30.out → n48.a
n47.out → n48.b
n46.out → n45.atom1
n48.out → n45.formula1
n49.out → n45.atom2
n7.out → n45.formula2
n41.out → n39.a
n45.out → n39.b
n50.out → n51.assertion
n52.out → n51.atom1
n7.out → n51.formula1
n53.out → n51.atom2
n30.out → n51.formula2
n54.out → n51.atom3
n47.out → n51.formula3
n39.out → n38.a
n51.out → n38.b
n10.out → n9.a
n38.out → n9.b
n55.out → n56.assertion
n57.out → n56.atom1
n7.out → n56.formula1
n58.out → n56.atom2
n7.out → n56.formula2
n59.out → n56.atom3
n5.out → n56.formula3
n9.out → n8.a
n56.out → n8.b
n3.out → n1.a
n8.out → n1.b
n1.out → n60.proof
```

</details>

### *23 · 简化蕴涵

- 目标：`⊢ ( ¬ ( P → ¬ Q ) → Q )`
- 提示：把 ¬B 当前件，用 A3 得到逆否。
- 参考解：299 个模块 / 437 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n300  [target]
n1  mp
n2  mp
n3  mp
n4  mp
n5  定理 *01
n6  subst
n7  atom P
n8  atom Q
n9  not
n10  mp
n11  mp
n12  axiom A1
n13  subst
n14  atom P
n15  atom Q
n16  atom P
n17  axiom A1
n18  subst
n19  atom P
n20  imp
n21  imp
n22  atom Q
n23  axiom A2
n24  subst
n25  atom P
n26  atom Q
n27  atom R
n28  mp
n29  mp
n30  mp
n31  mp
n32  mp
n33  mp
n34  mp
n35  定理 *01
n36  subst
n37  atom P
n38  mp
n39  mp
n40  axiom A1
n41  subst
n42  atom P
n43  atom Q
n44  not
n45  axiom A1
n46  subst
n47  atom P
n48  imp
n49  imp
n50  atom Q
n51  axiom A2
n52  subst
n53  atom P
n54  atom Q
n55  atom R
n56  mp
n57  mp
n58  mp
n59  mp
n60  mp
n61  定理 *13
n62  subst
n63  atom P
n64  mp
n65  mp
n66  axiom A1
n67  subst
n68  atom P
n69  atom Q
n70  axiom A1
n71  subst
n72  atom P
n73  imp
n74  imp
n75  atom Q
n76  axiom A2
n77  subst
n78  atom P
n79  atom Q
n80  atom R
n81  mp
n82  mp
n83  mp
n84  定理 *02
n85  subst
n86  atom P
n87  atom Q
n88  axiom A2
n89  subst
n90  atom P
n91  atom Q
n92  atom R
n93  axiom A1
n94  subst
n95  atom P
n96  imp
n97  atom Q
n98  axiom A2
n99  subst
n100  atom P
n101  atom Q
n102  atom R
n103  axiom A2
n104  subst
n105  atom P
n106  atom Q
n107  atom R
n108  axiom A1
n109  subst
n110  atom P
n111  imp
n112  imp
n113  atom Q
n114  axiom A2
n115  subst
n116  atom P
n117  atom Q
n118  atom R
n119  mp
n120  mp
n121  mp
n122  mp
n123  定理 *12
n124  subst
n125  atom P
n126  axiom A1
n127  subst
n128  atom P
n129  imp
n130  atom Q
n131  axiom A2
n132  subst
n133  atom P
n134  atom Q
n135  atom R
n136  axiom A1
n137  subst
n138  atom P
n139  imp
n140  imp
n141  atom Q
n142  axiom A2
n143  subst
n144  atom P
n145  atom Q
n146  atom R
n147  mp
n148  mp
n149  axiom A3
n150  subst
n151  atom P
n152  atom Q
n153  axiom A1
n154  subst
n155  atom P
n156  imp
n157  imp
n158  atom Q
n159  axiom A2
n160  subst
n161  atom P
n162  atom Q
n163  atom R
n164  axiom A2
n165  subst
n166  atom P
n167  atom Q
n168  atom R
n169  axiom A1
n170  subst
n171  atom P
n172  imp
n173  atom Q
n174  axiom A2
n175  subst
n176  atom P
n177  atom Q
n178  atom R
n179  mp
n180  mp
n181  mp
n182  mp
n183  定理 *01
n184  subst
n185  atom P
n186  mp
n187  mp
n188  axiom A1
n189  subst
n190  atom P
n191  atom Q
n192  not
n193  not
n194  not
n195  axiom A1
n196  subst
n197  atom P
n198  imp
n199  imp
n200  atom Q
n201  axiom A2
n202  subst
n203  atom P
n204  atom Q
n205  atom R
n206  mp
n207  mp
n208  mp
n209  mp
n210  mp
n211  定理 *13
n212  subst
n213  atom P
n214  mp
n215  mp
n216  axiom A1
n217  subst
n218  atom P
n219  atom Q
n220  axiom A1
n221  subst
n222  atom P
n223  imp
n224  imp
n225  atom Q
n226  axiom A2
n227  subst
n228  atom P
n229  atom Q
n230  atom R
n231  mp
n232  mp
n233  mp
n234  mp
n235  定理 *01
n236  subst
n237  atom P
n238  axiom A1
n239  subst
n240  atom P
n241  imp
n242  atom Q
n243  axiom A2
n244  subst
n245  atom P
n246  atom Q
n247  atom R
n248  axiom A1
n249  subst
n250  atom P
n251  imp
n252  atom Q
n253  axiom A2
n254  subst
n255  atom P
n256  atom Q
n257  atom R
n258  axiom A2
n259  subst
n260  atom P
n261  atom Q
n262  atom R
n263  axiom A1
n264  subst
n265  atom P
n266  imp
n267  imp
n268  atom Q
n269  axiom A2
n270  subst
n271  atom P
n272  atom Q
n273  atom R
n274  mp
n275  mp
n276  axiom A3
n277  subst
n278  atom P
n279  atom Q
n280  axiom A1
n281  subst
n282  atom P
n283  imp
n284  imp
n285  atom Q
n286  axiom A2
n287  subst
n288  atom P
n289  atom Q
n290  atom R
n291  axiom A2
n292  subst
n293  atom P
n294  atom Q
n295  atom R
n296  axiom A3
n297  subst
n298  atom P
n299  atom Q

接线：
n5.out → n6.assertion
n8.out → n9.a
n7.out → n6.atom1
n9.out → n6.formula1
n12.out → n13.assertion
n14.out → n13.atom1
n9.out → n13.formula1
n15.out → n13.atom2
n16.out → n13.formula2
n17.out → n18.assertion
n16.out → n20.a
n9.out → n20.b
n9.out → n21.a
n20.out → n21.b
n19.out → n18.atom1
n21.out → n18.formula1
n22.out → n18.atom2
n9.out → n18.formula2
n13.out → n11.a
n18.out → n11.b
n23.out → n24.assertion
n25.out → n24.atom1
n9.out → n24.formula1
n26.out → n24.atom2
n9.out → n24.formula2
n27.out → n24.atom3
n20.out → n24.formula3
n11.out → n10.a
n24.out → n10.b
n6.out → n4.a
n10.out → n4.b
n35.out → n36.assertion
n37.out → n36.atom1
n16.out → n36.formula1
n40.out → n41.assertion
n42.out → n41.atom1
n16.out → n41.formula1
n9.out → n44.a
n43.out → n41.atom2
n44.out → n41.formula2
n45.out → n46.assertion
n44.out → n48.a
n16.out → n48.b
n16.out → n49.a
n48.out → n49.b
n47.out → n46.atom1
n49.out → n46.formula1
n50.out → n46.atom2
n16.out → n46.formula2
n41.out → n39.a
n46.out → n39.b
n51.out → n52.assertion
n53.out → n52.atom1
n16.out → n52.formula1
n54.out → n52.atom2
n16.out → n52.formula2
n55.out → n52.atom3
n48.out → n52.formula3
n39.out → n38.a
n52.out → n38.b
n36.out → n34.a
n38.out → n34.b
n61.out → n62.assertion
n63.out → n62.atom1
n8.out → n62.formula1
n66.out → n67.assertion
n68.out → n67.atom1
n8.out → n67.formula1
n69.out → n67.atom2
n16.out → n67.formula2
n70.out → n71.assertion
n16.out → n73.a
n8.out → n73.b
n8.out → n74.a
n73.out → n74.b
n72.out → n71.atom1
n74.out → n71.formula1
n75.out → n71.atom2
n44.out → n71.formula2
n67.out → n65.a
n71.out → n65.b
n76.out → n77.assertion
n78.out → n77.atom1
n44.out → n77.formula1
n79.out → n77.atom2
n8.out → n77.formula2
n80.out → n77.atom3
n73.out → n77.formula3
n65.out → n64.a
n77.out → n64.b
n62.out → n60.a
n64.out → n60.b
n84.out → n85.assertion
n86.out → n85.atom1
n16.out → n85.formula1
n87.out → n85.atom2
n8.out → n85.formula2
n88.out → n89.assertion
n90.out → n89.atom1
n16.out → n89.formula1
n91.out → n89.atom2
n8.out → n89.formula2
n92.out → n89.atom3
n8.out → n89.formula3
n85.out → n83.a
n89.out → n83.b
n93.out → n94.assertion
n73.out → n96.a
n73.out → n96.b
n95.out → n94.atom1
n96.out → n94.formula1
n97.out → n94.atom2
n44.out → n94.formula2
n83.out → n82.a
n94.out → n82.b
n98.out → n99.assertion
n100.out → n99.atom1
n44.out → n99.formula1
n101.out → n99.atom2
n73.out → n99.formula2
n102.out → n99.atom3
n73.out → n99.formula3
n82.out → n81.a
n99.out → n81.b
n60.out → n59.a
n81.out → n59.b
n103.out → n104.assertion
n105.out → n104.atom1
n44.out → n104.formula1
n106.out → n104.atom2
n16.out → n104.formula2
n107.out → n104.atom3
n8.out → n104.formula3
n59.out → n58.a
n104.out → n58.b
n108.out → n109.assertion
n44.out → n111.a
n8.out → n111.b
n48.out → n112.a
n111.out → n112.b
n110.out → n109.atom1
n112.out → n109.formula1
n113.out → n109.atom2
n16.out → n109.formula2
n58.out → n57.a
n109.out → n57.b
n114.out → n115.assertion
n116.out → n115.atom1
n16.out → n115.formula1
n117.out → n115.atom2
n48.out → n115.formula2
n118.out → n115.atom3
n111.out → n115.formula3
n57.out → n56.a
n115.out → n56.b
n34.out → n33.a
n56.out → n33.b
n123.out → n124.assertion
n125.out → n124.atom1
n8.out → n124.formula1
n126.out → n127.assertion
n8.out → n129.a
n44.out → n129.b
n128.out → n127.atom1
n129.out → n127.formula1
n130.out → n127.atom2
n44.out → n127.formula2
n124.out → n122.a
n127.out → n122.b
n131.out → n132.assertion
n133.out → n132.atom1
n44.out → n132.formula1
n134.out → n132.atom2
n8.out → n132.formula2
n135.out → n132.atom3
n44.out → n132.formula3
n122.out → n121.a
n132.out → n121.b
n136.out → n137.assertion
n44.out → n139.a
n44.out → n139.b
n111.out → n140.a
n139.out → n140.b
n138.out → n137.atom1
n140.out → n137.formula1
n141.out → n137.atom2
n16.out → n137.formula2
n121.out → n120.a
n137.out → n120.b
n142.out → n143.assertion
n144.out → n143.atom1
n16.out → n143.formula1
n145.out → n143.atom2
n111.out → n143.formula2
n146.out → n143.atom3
n139.out → n143.formula3
n120.out → n119.a
n143.out → n119.b
n33.out → n32.a
n119.out → n32.b
n149.out → n150.assertion
n151.out → n150.atom1
n9.out → n150.formula1
n152.out → n150.atom2
n9.out → n150.formula2
n153.out → n154.assertion
n9.out → n156.a
n9.out → n156.b
n139.out → n157.a
n156.out → n157.b
n155.out → n154.atom1
n157.out → n154.formula1
n158.out → n154.atom2
n16.out → n154.formula2
n150.out → n148.a
n154.out → n148.b
n159.out → n160.assertion
n161.out → n160.atom1
n16.out → n160.formula1
n162.out → n160.atom2
n139.out → n160.formula2
n163.out → n160.atom3
n156.out → n160.formula3
n148.out → n147.a
n160.out → n147.b
n32.out → n31.a
n147.out → n31.b
n164.out → n165.assertion
n166.out → n165.atom1
n16.out → n165.formula1
n167.out → n165.atom2
n9.out → n165.formula2
n168.out → n165.atom3
n9.out → n165.formula3
n31.out → n30.a
n165.out → n30.b
n169.out → n170.assertion
n20.out → n172.a
n20.out → n172.b
n171.out → n170.atom1
n172.out → n170.formula1
n173.out → n170.atom2
n9.out → n170.formula2
n30.out → n29.a
n170.out → n29.b
n174.out → n175.assertion
n176.out → n175.atom1
n9.out → n175.formula1
n177.out → n175.atom2
n20.out → n175.formula2
n178.out → n175.atom3
n20.out → n175.formula3
n29.out → n28.a
n175.out → n28.b
n4.out → n3.a
n28.out → n3.b
n183.out → n184.assertion
n185.out → n184.atom1
n9.out → n184.formula1
n188.out → n189.assertion
n190.out → n189.atom1
n9.out → n189.formula1
n20.out → n192.a
n192.out → n193.a
n193.out → n194.a
n191.out → n189.atom2
n194.out → n189.formula2
n195.out → n196.assertion
n194.out → n198.a
n9.out → n198.b
n9.out → n199.a
n198.out → n199.b
n197.out → n196.atom1
n199.out → n196.formula1
n200.out → n196.atom2
n9.out → n196.formula2
n189.out → n187.a
n196.out → n187.b
n201.out → n202.assertion
n203.out → n202.atom1
n9.out → n202.formula1
n204.out → n202.atom2
n9.out → n202.formula2
n205.out → n202.atom3
n198.out → n202.formula3
n187.out → n186.a
n202.out → n186.b
n184.out → n182.a
n186.out → n182.b
n211.out → n212.assertion
n213.out → n212.atom1
n192.out → n212.formula1
n216.out → n217.assertion
n218.out → n217.atom1
n192.out → n217.formula1
n219.out → n217.atom2
n9.out → n217.formula2
n220.out → n221.assertion
n9.out → n223.a
n192.out → n223.b
n192.out → n224.a
n223.out → n224.b
n222.out → n221.atom1
n224.out → n221.formula1
n225.out → n221.atom2
n194.out → n221.formula2
n217.out → n215.a
n221.out → n215.b
n226.out → n227.assertion
n228.out → n227.atom1
n194.out → n227.formula1
n229.out → n227.atom2
n192.out → n227.formula2
n230.out → n227.atom3
n223.out → n227.formula3
n215.out → n214.a
n227.out → n214.b
n212.out → n210.a
n214.out → n210.b
n235.out → n236.assertion
n237.out → n236.atom1
n192.out → n236.formula1
n238.out → n239.assertion
n192.out → n241.a
n192.out → n241.b
n240.out → n239.atom1
n241.out → n239.formula1
n242.out → n239.atom2
n9.out → n239.formula2
n236.out → n234.a
n239.out → n234.b
n243.out → n244.assertion
n245.out → n244.atom1
n9.out → n244.formula1
n246.out → n244.atom2
n192.out → n244.formula2
n247.out → n244.atom3
n192.out → n244.formula3
n234.out → n233.a
n244.out → n233.b
n248.out → n249.assertion
n223.out → n251.a
n223.out → n251.b
n250.out → n249.atom1
n251.out → n249.formula1
n252.out → n249.atom2
n194.out → n249.formula2
n233.out → n232.a
n249.out → n232.b
n253.out → n254.assertion
n255.out → n254.atom1
n194.out → n254.formula1
n256.out → n254.atom2
n223.out → n254.formula2
n257.out → n254.atom3
n223.out → n254.formula3
n232.out → n231.a
n254.out → n231.b
n210.out → n209.a
n231.out → n209.b
n258.out → n259.assertion
n260.out → n259.atom1
n194.out → n259.formula1
n261.out → n259.atom2
n9.out → n259.formula2
n262.out → n259.atom3
n192.out → n259.formula3
n209.out → n208.a
n259.out → n208.b
n263.out → n264.assertion
n194.out → n266.a
n192.out → n266.b
n198.out → n267.a
n266.out → n267.b
n265.out → n264.atom1
n267.out → n264.formula1
n268.out → n264.atom2
n9.out → n264.formula2
n208.out → n207.a
n264.out → n207.b
n269.out → n270.assertion
n271.out → n270.atom1
n9.out → n270.formula1
n272.out → n270.atom2
n198.out → n270.formula2
n273.out → n270.atom3
n266.out → n270.formula3
n207.out → n206.a
n270.out → n206.b
n182.out → n181.a
n206.out → n181.b
n276.out → n277.assertion
n278.out → n277.atom1
n193.out → n277.formula1
n279.out → n277.atom2
n20.out → n277.formula2
n280.out → n281.assertion
n20.out → n283.a
n193.out → n283.b
n266.out → n284.a
n283.out → n284.b
n282.out → n281.atom1
n284.out → n281.formula1
n285.out → n281.atom2
n9.out → n281.formula2
n277.out → n275.a
n281.out → n275.b
n286.out → n287.assertion
n288.out → n287.atom1
n9.out → n287.formula1
n289.out → n287.atom2
n266.out → n287.formula2
n290.out → n287.atom3
n283.out → n287.formula3
n275.out → n274.a
n287.out → n274.b
n181.out → n180.a
n274.out → n180.b
n291.out → n292.assertion
n293.out → n292.atom1
n9.out → n292.formula1
n294.out → n292.atom2
n20.out → n292.formula2
n295.out → n292.atom3
n193.out → n292.formula3
n180.out → n179.a
n292.out → n179.b
n3.out → n2.a
n179.out → n2.b
n296.out → n297.assertion
n298.out → n297.atom1
n8.out → n297.formula1
n299.out → n297.atom2
n192.out → n297.formula2
n2.out → n1.a
n297.out → n1.b
n1.out → n300.proof
```

</details>

### *24 · 皮尔士律

- 目标：`⊢ ( ( ( P → Q ) → P ) → P )`
- 提示：假设 (A→B)→A，再分 A 与 ¬A 两种情况。
- 参考解：299 个模块 / 439 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n300  [target]
n1  mp
n2  定理 *01
n3  subst
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
n19  subst
n20  atom P
n21  atom Q
n22  mp
n23  mp
n24  mp
n25  mp
n26  定理 *01
n27  subst
n28  atom P
n29  not
n30  mp
n31  mp
n32  axiom A1
n33  subst
n34  atom P
n35  atom Q
n36  not
n37  not
n38  not
n39  axiom A1
n40  subst
n41  atom P
n42  imp
n43  imp
n44  atom Q
n45  axiom A2
n46  subst
n47  atom P
n48  atom Q
n49  atom R
n50  mp
n51  mp
n52  mp
n53  mp
n54  mp
n55  定理 *13
n56  subst
n57  atom P
n58  mp
n59  mp
n60  axiom A1
n61  subst
n62  atom P
n63  atom Q
n64  axiom A1
n65  subst
n66  atom P
n67  imp
n68  imp
n69  atom Q
n70  axiom A2
n71  subst
n72  atom P
n73  atom Q
n74  atom R
n75  mp
n76  mp
n77  mp
n78  mp
n79  定理 *01
n80  subst
n81  atom P
n82  axiom A1
n83  subst
n84  atom P
n85  imp
n86  atom Q
n87  axiom A2
n88  subst
n89  atom P
n90  atom Q
n91  atom R
n92  axiom A1
n93  subst
n94  atom P
n95  imp
n96  atom Q
n97  axiom A2
n98  subst
n99  atom P
n100  atom Q
n101  atom R
n102  axiom A2
n103  subst
n104  atom P
n105  atom Q
n106  atom R
n107  axiom A1
n108  subst
n109  atom P
n110  imp
n111  imp
n112  atom Q
n113  axiom A2
n114  subst
n115  atom P
n116  atom Q
n117  atom R
n118  mp
n119  mp
n120  axiom A3
n121  subst
n122  atom P
n123  atom Q
n124  axiom A1
n125  subst
n126  atom P
n127  imp
n128  imp
n129  atom Q
n130  axiom A2
n131  subst
n132  atom P
n133  atom Q
n134  atom R
n135  axiom A2
n136  subst
n137  atom P
n138  atom Q
n139  atom R
n140  axiom A3
n141  subst
n142  atom P
n143  atom Q
n144  axiom A1
n145  subst
n146  atom P
n147  imp
n148  atom Q
n149  mp
n150  mp
n151  mp
n152  mp
n153  定理 *12
n154  subst
n155  atom P
n156  axiom A1
n157  subst
n158  atom P
n159  not
n160  imp
n161  atom Q
n162  axiom A2
n163  subst
n164  atom P
n165  atom Q
n166  atom R
n167  axiom A1
n168  subst
n169  atom P
n170  imp
n171  imp
n172  atom Q
n173  axiom A2
n174  subst
n175  atom P
n176  atom Q
n177  atom R
n178  mp
n179  mp
n180  axiom A3
n181  subst
n182  atom P
n183  atom Q
n184  axiom A1
n185  subst
n186  atom P
n187  imp
n188  imp
n189  atom Q
n190  axiom A2
n191  subst
n192  atom P
n193  atom Q
n194  atom R
n195  mp
n196  mp
n197  mp
n198  mp
n199  mp
n200  定理 *01
n201  subst
n202  atom P
n203  axiom A1
n204  subst
n205  atom P
n206  imp
n207  atom Q
n208  axiom A2
n209  subst
n210  atom P
n211  atom Q
n212  atom R
n213  mp
n214  mp
n215  axiom A1
n216  subst
n217  atom P
n218  atom Q
n219  axiom A1
n220  subst
n221  atom P
n222  imp
n223  imp
n224  atom Q
n225  axiom A2
n226  subst
n227  atom P
n228  atom Q
n229  atom R
n230  mp
n231  mp
n232  axiom A2
n233  subst
n234  atom P
n235  atom Q
n236  atom R
n237  axiom A1
n238  subst
n239  atom P
n240  imp
n241  imp
n242  imp
n243  atom Q
n244  axiom A2
n245  subst
n246  atom P
n247  atom Q
n248  atom R
n249  axiom A2
n250  subst
n251  atom P
n252  atom Q
n253  atom R
n254  mp
n255  mp
n256  mp
n257  定理 *14
n258  subst
n259  atom P
n260  atom Q
n261  not
n262  axiom A2
n263  subst
n264  atom P
n265  atom Q
n266  atom R
n267  axiom A1
n268  subst
n269  atom P
n270  imp
n271  imp
n272  atom Q
n273  axiom A2
n274  subst
n275  atom P
n276  atom Q
n277  atom R
n278  mp
n279  mp
n280  axiom A3
n281  subst
n282  atom P
n283  atom Q
n284  axiom A1
n285  subst
n286  atom P
n287  imp
n288  imp
n289  atom Q
n290  axiom A2
n291  subst
n292  atom P
n293  atom Q
n294  atom R
n295  axiom A2
n296  subst
n297  atom P
n298  atom Q
n299  atom R

接线：
n2.out → n3.assertion
n5.out → n7.a
n6.out → n7.b
n7.out → n8.a
n5.out → n8.b
n4.out → n3.atom1
n8.out → n3.formula1
n18.out → n19.assertion
n20.out → n19.atom1
n5.out → n19.formula1
n21.out → n19.atom2
n6.out → n19.formula2
n26.out → n27.assertion
n5.out → n29.a
n28.out → n27.atom1
n29.out → n27.formula1
n32.out → n33.assertion
n34.out → n33.atom1
n29.out → n33.formula1
n7.out → n36.a
n36.out → n37.a
n37.out → n38.a
n35.out → n33.atom2
n38.out → n33.formula2
n39.out → n40.assertion
n38.out → n42.a
n29.out → n42.b
n29.out → n43.a
n42.out → n43.b
n41.out → n40.atom1
n43.out → n40.formula1
n44.out → n40.atom2
n29.out → n40.formula2
n33.out → n31.a
n40.out → n31.b
n45.out → n46.assertion
n47.out → n46.atom1
n29.out → n46.formula1
n48.out → n46.atom2
n29.out → n46.formula2
n49.out → n46.atom3
n42.out → n46.formula3
n31.out → n30.a
n46.out → n30.b
n27.out → n25.a
n30.out → n25.b
n55.out → n56.assertion
n57.out → n56.atom1
n36.out → n56.formula1
n60.out → n61.assertion
n62.out → n61.atom1
n36.out → n61.formula1
n63.out → n61.atom2
n29.out → n61.formula2
n64.out → n65.assertion
n29.out → n67.a
n36.out → n67.b
n36.out → n68.a
n67.out → n68.b
n66.out → n65.atom1
n68.out → n65.formula1
n69.out → n65.atom2
n38.out → n65.formula2
n61.out → n59.a
n65.out → n59.b
n70.out → n71.assertion
n72.out → n71.atom1
n38.out → n71.formula1
n73.out → n71.atom2
n36.out → n71.formula2
n74.out → n71.atom3
n67.out → n71.formula3
n59.out → n58.a
n71.out → n58.b
n56.out → n54.a
n58.out → n54.b
n79.out → n80.assertion
n81.out → n80.atom1
n36.out → n80.formula1
n82.out → n83.assertion
n36.out → n85.a
n36.out → n85.b
n84.out → n83.atom1
n85.out → n83.formula1
n86.out → n83.atom2
n29.out → n83.formula2
n80.out → n78.a
n83.out → n78.b
n87.out → n88.assertion
n89.out → n88.atom1
n29.out → n88.formula1
n90.out → n88.atom2
n36.out → n88.formula2
n91.out → n88.atom3
n36.out → n88.formula3
n78.out → n77.a
n88.out → n77.b
n92.out → n93.assertion
n67.out → n95.a
n67.out → n95.b
n94.out → n93.atom1
n95.out → n93.formula1
n96.out → n93.atom2
n38.out → n93.formula2
n77.out → n76.a
n93.out → n76.b
n97.out → n98.assertion
n99.out → n98.atom1
n38.out → n98.formula1
n100.out → n98.atom2
n67.out → n98.formula2
n101.out → n98.atom3
n67.out → n98.formula3
n76.out → n75.a
n98.out → n75.b
n54.out → n53.a
n75.out → n53.b
n102.out → n103.assertion
n104.out → n103.atom1
n38.out → n103.formula1
n105.out → n103.atom2
n29.out → n103.formula2
n106.out → n103.atom3
n36.out → n103.formula3
n53.out → n52.a
n103.out → n52.b
n107.out → n108.assertion
n38.out → n110.a
n36.out → n110.b
n42.out → n111.a
n110.out → n111.b
n109.out → n108.atom1
n111.out → n108.formula1
n112.out → n108.atom2
n29.out → n108.formula2
n52.out → n51.a
n108.out → n51.b
n113.out → n114.assertion
n115.out → n114.atom1
n29.out → n114.formula1
n116.out → n114.atom2
n42.out → n114.formula2
n117.out → n114.atom3
n110.out → n114.formula3
n51.out → n50.a
n114.out → n50.b
n25.out → n24.a
n50.out → n24.b
n120.out → n121.assertion
n122.out → n121.atom1
n37.out → n121.formula1
n123.out → n121.atom2
n7.out → n121.formula2
n124.out → n125.assertion
n7.out → n127.a
n37.out → n127.b
n110.out → n128.a
n127.out → n128.b
n126.out → n125.atom1
n128.out → n125.formula1
n129.out → n125.atom2
n29.out → n125.formula2
n121.out → n119.a
n125.out → n119.b
n130.out → n131.assertion
n132.out → n131.atom1
n29.out → n131.formula1
n133.out → n131.atom2
n110.out → n131.formula2
n134.out → n131.atom3
n127.out → n131.formula3
n119.out → n118.a
n131.out → n118.b
n24.out → n23.a
n118.out → n23.b
n135.out → n136.assertion
n137.out → n136.atom1
n29.out → n136.formula1
n138.out → n136.atom2
n7.out → n136.formula2
n139.out → n136.atom3
n37.out → n136.formula3
n23.out → n22.a
n136.out → n22.b
n19.out → n17.a
n22.out → n17.b
n140.out → n141.assertion
n142.out → n141.atom1
n5.out → n141.formula1
n143.out → n141.atom2
n36.out → n141.formula2
n17.out → n16.a
n141.out → n16.b
n144.out → n145.assertion
n36.out → n147.a
n5.out → n147.b
n146.out → n145.atom1
n147.out → n145.formula1
n148.out → n145.atom2
n8.out → n145.formula2
n16.out → n15.a
n145.out → n15.b
n153.out → n154.assertion
n155.out → n154.atom1
n5.out → n154.formula1
n156.out → n157.assertion
n29.out → n159.a
n5.out → n160.a
n159.out → n160.b
n158.out → n157.atom1
n160.out → n157.formula1
n161.out → n157.atom2
n36.out → n157.formula2
n154.out → n152.a
n157.out → n152.b
n162.out → n163.assertion
n164.out → n163.atom1
n36.out → n163.formula1
n165.out → n163.atom2
n5.out → n163.formula2
n166.out → n163.atom3
n159.out → n163.formula3
n152.out → n151.a
n163.out → n151.b
n167.out → n168.assertion
n36.out → n170.a
n159.out → n170.b
n147.out → n171.a
n170.out → n171.b
n169.out → n168.atom1
n171.out → n168.formula1
n172.out → n168.atom2
n8.out → n168.formula2
n151.out → n150.a
n168.out → n150.b
n173.out → n174.assertion
n175.out → n174.atom1
n8.out → n174.formula1
n176.out → n174.atom2
n147.out → n174.formula2
n177.out → n174.atom3
n170.out → n174.formula3
n150.out → n149.a
n174.out → n149.b
n15.out → n14.a
n149.out → n14.b
n180.out → n181.assertion
n182.out → n181.atom1
n7.out → n181.formula1
n183.out → n181.atom2
n29.out → n181.formula2
n184.out → n185.assertion
n29.out → n187.a
n7.out → n187.b
n170.out → n188.a
n187.out → n188.b
n186.out → n185.atom1
n188.out → n185.formula1
n189.out → n185.atom2
n8.out → n185.formula2
n181.out → n179.a
n185.out → n179.b
n190.out → n191.assertion
n192.out → n191.atom1
n8.out → n191.formula1
n193.out → n191.atom2
n170.out → n191.formula2
n194.out → n191.atom3
n187.out → n191.formula3
n179.out → n178.a
n191.out → n178.b
n14.out → n13.a
n178.out → n13.b
n200.out → n201.assertion
n202.out → n201.atom1
n5.out → n201.formula1
n203.out → n204.assertion
n5.out → n206.a
n5.out → n206.b
n205.out → n204.atom1
n206.out → n204.formula1
n207.out → n204.atom2
n7.out → n204.formula2
n201.out → n199.a
n204.out → n199.b
n208.out → n209.assertion
n210.out → n209.atom1
n7.out → n209.formula1
n211.out → n209.atom2
n5.out → n209.formula2
n212.out → n209.atom3
n5.out → n209.formula3
n199.out → n198.a
n209.out → n198.b
n215.out → n216.assertion
n217.out → n216.atom1
n8.out → n216.formula1
n218.out → n216.atom2
n29.out → n216.formula2
n219.out → n220.assertion
n29.out → n222.a
n8.out → n222.b
n8.out → n223.a
n222.out → n223.b
n221.out → n220.atom1
n223.out → n220.formula1
n224.out → n220.atom2
n8.out → n220.formula2
n216.out → n214.a
n220.out → n214.b
n225.out → n226.assertion
n227.out → n226.atom1
n8.out → n226.formula1
n228.out → n226.atom2
n8.out → n226.formula2
n229.out → n226.atom3
n222.out → n226.formula3
n214.out → n213.a
n226.out → n213.b
n198.out → n197.a
n213.out → n197.b
n232.out → n233.assertion
n234.out → n233.atom1
n29.out → n233.formula1
n235.out → n233.atom2
n7.out → n233.formula2
n236.out → n233.atom3
n5.out → n233.formula3
n237.out → n238.assertion
n29.out → n240.a
n5.out → n240.b
n187.out → n241.a
n240.out → n241.b
n222.out → n242.a
n241.out → n242.b
n239.out → n238.atom1
n242.out → n238.formula1
n243.out → n238.atom2
n8.out → n238.formula2
n233.out → n231.a
n238.out → n231.b
n244.out → n245.assertion
n246.out → n245.atom1
n8.out → n245.formula1
n247.out → n245.atom2
n222.out → n245.formula2
n248.out → n245.atom3
n241.out → n245.formula3
n231.out → n230.a
n245.out → n230.b
n197.out → n196.a
n230.out → n196.b
n249.out → n250.assertion
n251.out → n250.atom1
n8.out → n250.formula1
n252.out → n250.atom2
n187.out → n250.formula2
n253.out → n250.atom3
n240.out → n250.formula3
n196.out → n195.a
n250.out → n195.b
n13.out → n12.a
n195.out → n12.b
n257.out → n258.assertion
n259.out → n258.atom1
n5.out → n258.formula1
n8.out → n261.a
n260.out → n258.atom2
n261.out → n258.formula2
n262.out → n263.assertion
n264.out → n263.atom1
n29.out → n263.formula1
n265.out → n263.atom2
n5.out → n263.formula2
n266.out → n263.atom3
n261.out → n263.formula3
n258.out → n256.a
n263.out → n256.b
n267.out → n268.assertion
n29.out → n270.a
n261.out → n270.b
n240.out → n271.a
n270.out → n271.b
n269.out → n268.atom1
n271.out → n268.formula1
n272.out → n268.atom2
n8.out → n268.formula2
n256.out → n255.a
n268.out → n255.b
n273.out → n274.assertion
n275.out → n274.atom1
n8.out → n274.formula1
n276.out → n274.atom2
n240.out → n274.formula2
n277.out → n274.atom3
n270.out → n274.formula3
n255.out → n254.a
n274.out → n254.b
n12.out → n11.a
n254.out → n11.b
n280.out → n281.assertion
n282.out → n281.atom1
n5.out → n281.formula1
n283.out → n281.atom2
n8.out → n281.formula2
n284.out → n285.assertion
n8.out → n287.a
n5.out → n287.b
n270.out → n288.a
n287.out → n288.b
n286.out → n285.atom1
n288.out → n285.formula1
n289.out → n285.atom2
n8.out → n285.formula2
n281.out → n279.a
n285.out → n279.b
n290.out → n291.assertion
n292.out → n291.atom1
n8.out → n291.formula1
n293.out → n291.atom2
n270.out → n291.formula2
n294.out → n291.atom3
n287.out → n291.formula3
n279.out → n278.a
n291.out → n278.b
n11.out → n10.a
n278.out → n10.b
n295.out → n296.assertion
n297.out → n296.atom1
n8.out → n296.formula1
n298.out → n296.atom2
n8.out → n296.formula2
n299.out → n296.atom3
n5.out → n296.formula3
n10.out → n9.a
n296.out → n9.b
n3.out → n1.a
n9.out → n1.b
n1.out → n300.proof
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
n4  subst
n5  atom P
n6  term x
n7  pred G
n8  axiom A1
n9  subst
n10  atom P
n11  all(v=x)
n12  imp
n13  atom Q
n14  pred F
n15  axiom A2
n16  subst
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
n4  subst
n5  atom P
n6  term x
n7  pred F
n8  atom Q
n9  pred G
n10  axiom A5(v=x)
n11  subst
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
n6  subst
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
n3  subst
n4  atom P
n5  term x
n6  pred F
n7  all(v=y)
n8  mp
n9  mp
n10  axiom A4(v=y)
n11  subst
n12  atom P
n13  axiom A1
n14  subst
n15  atom P
n16  imp
n17  atom Q
n18  all(v=x)
n19  axiom A2
n20  subst
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
- 参考解：47 个模块 / 67 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n48  [target]
n1  mp
n2  axiom A5(v=x)
n3  subst
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
n15  axiom A5(v=x)
n16  subst
n17  atom P
n18  atom Q
n19  axiom A1
n20  subst
n21  atom P
n22  all(v=x)
n23  all(v=x)
n24  all(v=x)
n25  imp
n26  imp
n27  atom Q
n28  all(v=x)
n29  axiom A2
n30  subst
n31  atom P
n32  atom Q
n33  atom R
n34  axiom A1
n35  subst
n36  atom P
n37  imp
n38  imp
n39  imp
n40  atom Q
n41  imp
n42  all(v=x)
n43  axiom A2
n44  subst
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
n15.out → n16.assertion
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
n34.out → n35.assertion
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
n43.out → n44.assertion
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
- 参考解：48 个模块 / 71 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n49  [target]
n1  mp
n2  mp
n3  mp
n4  axiom A5(v=x)
n5  subst
n6  atom P
n7  term x
n8  pred G
n9  atom Q
n10  pred H
n11  axiom A1
n12  subst
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
n23  subst
n24  atom P
n25  atom Q
n26  atom R
n27  mp
n28  mp
n29  axiom A2
n30  subst
n31  atom P
n32  atom Q
n33  atom R
n34  axiom A1
n35  subst
n36  atom P
n37  imp
n38  imp
n39  imp
n40  imp
n41  imp
n42  atom Q
n43  imp
n44  axiom A2
n45  subst
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
n29.out → n30.assertion
n31.out → n30.atom1
n21.out → n30.formula1
n32.out → n30.atom2
n16.out → n30.formula2
n33.out → n30.atom3
n17.out → n30.formula3
n34.out → n35.assertion
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
n44.out → n45.assertion
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
- 参考解：52 个模块 / 76 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n53  [target]
n1  mp
n2  mp
n3  axiom A5(v=x)
n4  subst
n5  atom P
n6  term x
n7  pred G
n8  atom Q
n9  pred H
n10  mp
n11  mp
n12  axiom A1
n13  subst
n14  atom P
n15  all(v=x)
n16  all(v=x)
n17  imp
n18  atom Q
n19  pred F
n20  axiom A1
n21  subst
n22  atom P
n23  imp
n24  imp
n25  atom Q
n26  imp
n27  all(v=x)
n28  axiom A2
n29  subst
n30  atom P
n31  atom Q
n32  atom R
n33  mp
n34  mp
n35  axiom A2
n36  subst
n37  atom P
n38  atom Q
n39  atom R
n40  axiom A1
n41  subst
n42  atom P
n43  imp
n44  imp
n45  imp
n46  imp
n47  atom Q
n48  axiom A2
n49  subst
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
n20.out → n21.assertion
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
n35.out → n36.assertion
n37.out → n36.atom1
n19.out → n36.formula1
n38.out → n36.atom2
n15.out → n36.formula2
n39.out → n36.atom3
n16.out → n36.formula3
n40.out → n41.assertion
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
n48.out → n49.assertion
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
- 参考解：56 个模块 / 79 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n57  [target]
n1  mp
n2  gen(v=x)
n3  axiom A5(v=y)
n4  subst
n5  atom P
n6  term x
n7  pred F
n8  atom Q
n9  pred G
n10  mp
n11  axiom A5(v=x)
n12  subst
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
n24  axiom A5(v=x)
n25  subst
n26  atom P
n27  atom Q
n28  axiom A1
n29  subst
n30  atom P
n31  all(v=x)
n32  all(v=x)
n33  all(v=x)
n34  imp
n35  imp
n36  atom Q
n37  all(v=x)
n38  axiom A2
n39  subst
n40  atom P
n41  atom Q
n42  atom R
n43  axiom A1
n44  subst
n45  atom P
n46  imp
n47  imp
n48  imp
n49  atom Q
n50  imp
n51  all(v=x)
n52  axiom A2
n53  subst
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
n24.out → n25.assertion
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
n43.out → n44.assertion
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
n52.out → n53.assertion
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
- 参考解：56 个模块 / 81 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n57  [target]
n1  mp
n2  mp
n3  mp
n4  axiom A1
n5  subst
n6  atom P
n7  term x
n8  pred F
n9  atom Q
n10  mp
n11  axiom A1
n12  subst
n13  atom P
n14  atom Q
n15  imp
n16  axiom A2
n17  subst
n18  atom P
n19  atom Q
n20  atom R
n21  mp
n22  mp
n23  axiom A1
n24  subst
n25  atom P
n26  atom Q
n27  pred H
n28  axiom A1
n29  subst
n30  atom P
n31  imp
n32  imp
n33  atom Q
n34  axiom A2
n35  subst
n36  atom P
n37  atom Q
n38  atom R
n39  mp
n40  mp
n41  axiom A1
n42  subst
n43  atom P
n44  atom Q
n45  pred G
n46  axiom A1
n47  subst
n48  atom P
n49  imp
n50  imp
n51  atom Q
n52  axiom A2
n53  subst
n54  atom P
n55  atom Q
n56  atom R

接线：
n4.out → n5.assertion
n7.out → n8.t1
n6.out → n5.atom1
n8.out → n5.formula1
n9.out → n5.atom2
n8.out → n5.formula2
n11.out → n12.assertion
n13.out → n12.atom1
n8.out → n12.formula1
n8.out → n15.a
n8.out → n15.b
n14.out → n12.atom2
n15.out → n12.formula2
n16.out → n17.assertion
n18.out → n17.atom1
n8.out → n17.formula1
n19.out → n17.atom2
n15.out → n17.formula2
n20.out → n17.atom3
n8.out → n17.formula3
n12.out → n10.a
n17.out → n10.b
n5.out → n3.a
n10.out → n3.b
n23.out → n24.assertion
n25.out → n24.atom1
n8.out → n24.formula1
n7.out → n27.t1
n26.out → n24.atom2
n27.out → n24.formula2
n28.out → n29.assertion
n27.out → n31.a
n8.out → n31.b
n8.out → n32.a
n31.out → n32.b
n30.out → n29.atom1
n32.out → n29.formula1
n33.out → n29.atom2
n8.out → n29.formula2
n24.out → n22.a
n29.out → n22.b
n34.out → n35.assertion
n36.out → n35.atom1
n8.out → n35.formula1
n37.out → n35.atom2
n8.out → n35.formula2
n38.out → n35.atom3
n31.out → n35.formula3
n22.out → n21.a
n35.out → n21.b
n3.out → n2.a
n21.out → n2.b
n41.out → n42.assertion
n43.out → n42.atom1
n31.out → n42.formula1
n7.out → n45.t1
n44.out → n42.atom2
n45.out → n42.formula2
n46.out → n47.assertion
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
n52.out → n53.assertion
n54.out → n53.atom1
n8.out → n53.formula1
n55.out → n53.atom2
n31.out → n53.formula2
n56.out → n53.atom3
n49.out → n53.formula3
n40.out → n39.a
n53.out → n39.b
n2.out → n1.a
n39.out → n1.b
n1.out → n57.proof
```

</details>

### *34 · 四段分配

- 目标：`⊢ ( ∀ x ( F ( x ) → ( G ( x ) → ( H ( x ) → F ( x ) ) ) ) → ( ∀ x F ( x ) → ( ∀ x G ( x ) → ( ∀ x H ( x ) → ∀ x F ( x ) ) ) ) )`
- 提示：连续三次分配。
- 参考解：80 个模块 / 117 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n81  [target]
n1  mp
n2  axiom A5(v=x)
n3  subst
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
n17  axiom A5(v=x)
n18  subst
n19  atom P
n20  atom Q
n21  mp
n22  mp
n23  mp
n24  mp
n25  axiom A5(v=x)
n26  subst
n27  atom P
n28  atom Q
n29  axiom A1
n30  subst
n31  atom P
n32  all(v=x)
n33  all(v=x)
n34  all(v=x)
n35  imp
n36  imp
n37  atom Q
n38  all(v=x)
n39  axiom A2
n40  subst
n41  atom P
n42  atom Q
n43  atom R
n44  axiom A1
n45  subst
n46  atom P
n47  imp
n48  imp
n49  imp
n50  atom Q
n51  all(v=x)
n52  axiom A2
n53  subst
n54  atom P
n55  atom Q
n56  atom R
n57  axiom A1
n58  subst
n59  atom P
n60  imp
n61  atom Q
n62  axiom A2
n63  subst
n64  atom P
n65  atom Q
n66  atom R
n67  axiom A1
n68  subst
n69  atom P
n70  imp
n71  imp
n72  imp
n73  atom Q
n74  imp
n75  all(v=x)
n76  axiom A2
n77  subst
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
n17.out → n18.assertion
n19.out → n18.atom1
n8.out → n18.formula1
n20.out → n18.atom2
n10.out → n18.formula2
n25.out → n26.assertion
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
n44.out → n45.assertion
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
n52.out → n53.assertion
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
n57.out → n58.assertion
n51.out → n60.a
n48.out → n60.b
n59.out → n58.atom1
n60.out → n58.formula1
n61.out → n58.atom2
n34.out → n58.formula2
n16.out → n15.a
n58.out → n15.b
n62.out → n63.assertion
n64.out → n63.atom1
n34.out → n63.formula1
n65.out → n63.atom2
n51.out → n63.formula2
n66.out → n63.atom3
n48.out → n63.formula3
n15.out → n14.a
n63.out → n14.b
n67.out → n68.assertion
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
n76.out → n77.assertion
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
- 参考解：61 个模块 / 86 条接线

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
n9  mp
n10  shift(v=y)
n11  mp
n12  mp
n13  mp
n14  gen(v=x)
n15  mp
n16  axiom A1
n17  subst
n18  atom P
n19  atom Q
n20  mp
n21  axiom A1
n22  subst
n23  atom P
n24  atom Q
n25  imp
n26  axiom A2
n27  subst
n28  atom P
n29  atom Q
n30  atom R
n31  axiom A5(v=y)
n32  subst
n33  atom P
n34  atom Q
n35  axiom A1
n36  subst
n37  atom P
n38  all(v=y)
n39  imp
n40  atom Q
n41  axiom A2
n42  subst
n43  atom P
n44  atom Q
n45  atom R
n46  axiom A5(v=x)
n47  subst
n48  atom P
n49  atom Q
n50  axiom A1
n51  subst
n52  atom P
n53  all(v=x)
n54  all(v=x)
n55  imp
n56  atom Q
n57  axiom A2
n58  subst
n59  atom P
n60  atom Q
n61  atom R

接线：
n3.out → n4.t1
n4.out → n2.formula
n4.out → n10.formula
n16.out → n17.assertion
n18.out → n17.atom1
n4.out → n17.formula1
n19.out → n17.atom2
n4.out → n17.formula2
n21.out → n22.assertion
n23.out → n22.atom1
n4.out → n22.formula1
n4.out → n25.a
n4.out → n25.b
n24.out → n22.atom2
n25.out → n22.formula2
n26.out → n27.assertion
n28.out → n27.atom1
n4.out → n27.formula1
n29.out → n27.atom2
n25.out → n27.formula2
n30.out → n27.atom3
n4.out → n27.formula3
n22.out → n20.a
n27.out → n20.b
n17.out → n15.a
n20.out → n15.b
n15.out → n14.assertion
n31.out → n32.assertion
n33.out → n32.atom1
n4.out → n32.formula1
n34.out → n32.atom2
n4.out → n32.formula2
n14.out → n13.a
n32.out → n13.b
n35.out → n36.assertion
n4.out → n38.a
n38.out → n39.a
n38.out → n39.b
n37.out → n36.atom1
n39.out → n36.formula1
n40.out → n36.atom2
n4.out → n36.formula2
n13.out → n12.a
n36.out → n12.b
n41.out → n42.assertion
n43.out → n42.atom1
n4.out → n42.formula1
n44.out → n42.atom2
n38.out → n42.formula2
n45.out → n42.atom3
n38.out → n42.formula3
n12.out → n11.a
n42.out → n11.b
n10.out → n9.a
n11.out → n9.b
n9.out → n8.assertion
n46.out → n47.assertion
n48.out → n47.atom1
n4.out → n47.formula1
n49.out → n47.atom2
n38.out → n47.formula2
n8.out → n7.a
n47.out → n7.b
n50.out → n51.assertion
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
n57.out → n58.assertion
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
- 参考解：105 个模块 / 153 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n106  [target]
n1  mp
n2  mp
n3  mp
n4  axiom A1
n5  subst
n6  atom P
n7  term y
n8  pred F
n9  term x
n10  pred G
n11  imp
n12  all(v=x)
n13  atom Q
n14  mp
n15  axiom A1
n16  subst
n17  atom P
n18  atom Q
n19  imp
n20  axiom A2
n21  subst
n22  atom P
n23  atom Q
n24  atom R
n25  mp
n26  mp
n27  axiom A1
n28  subst
n29  atom P
n30  atom Q
n31  axiom A1
n32  subst
n33  atom P
n34  imp
n35  imp
n36  atom Q
n37  axiom A2
n38  subst
n39  atom P
n40  atom Q
n41  atom R
n42  mp
n43  mp
n44  mp
n45  mp
n46  mp
n47  shift(v=x)
n48  mp
n49  mp
n50  axiom A1
n51  subst
n52  atom P
n53  all(v=x)
n54  atom Q
n55  axiom A1
n56  subst
n57  atom P
n58  imp
n59  imp
n60  atom Q
n61  axiom A2
n62  subst
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n69  axiom A5(v=x)
n70  subst
n71  atom P
n72  atom Q
n73  axiom A2
n74  subst
n75  atom P
n76  atom Q
n77  atom R
n78  all(v=x)
n79  axiom A1
n80  subst
n81  atom P
n82  imp
n83  imp
n84  atom Q
n85  axiom A2
n86  subst
n87  atom P
n88  atom Q
n89  atom R
n90  axiom A2
n91  subst
n92  atom P
n93  atom Q
n94  atom R
n95  axiom A1
n96  subst
n97  atom P
n98  imp
n99  imp
n100  atom Q
n101  axiom A2
n102  subst
n103  atom P
n104  atom Q
n105  atom R

接线：
n4.out → n5.assertion
n7.out → n8.t1
n9.out → n10.t1
n8.out → n11.a
n10.out → n11.b
n11.out → n12.a
n6.out → n5.atom1
n12.out → n5.formula1
n13.out → n5.atom2
n12.out → n5.formula2
n15.out → n16.assertion
n17.out → n16.atom1
n12.out → n16.formula1
n12.out → n19.a
n12.out → n19.b
n18.out → n16.atom2
n19.out → n16.formula2
n20.out → n21.assertion
n22.out → n21.atom1
n12.out → n21.formula1
n23.out → n21.atom2
n19.out → n21.formula2
n24.out → n21.atom3
n12.out → n21.formula3
n16.out → n14.a
n21.out → n14.b
n5.out → n3.a
n14.out → n3.b
n27.out → n28.assertion
n29.out → n28.atom1
n12.out → n28.formula1
n30.out → n28.atom2
n8.out → n28.formula2
n31.out → n32.assertion
n8.out → n34.a
n12.out → n34.b
n12.out → n35.a
n34.out → n35.b
n33.out → n32.atom1
n35.out → n32.formula1
n36.out → n32.atom2
n12.out → n32.formula2
n28.out → n26.a
n32.out → n26.b
n37.out → n38.assertion
n39.out → n38.atom1
n12.out → n38.formula1
n40.out → n38.atom2
n12.out → n38.formula2
n41.out → n38.atom3
n34.out → n38.formula3
n26.out → n25.a
n38.out → n25.b
n3.out → n2.a
n25.out → n2.b
n8.out → n47.formula
n50.out → n51.assertion
n8.out → n53.a
n52.out → n51.atom1
n53.out → n51.formula1
n54.out → n51.atom2
n12.out → n51.formula2
n55.out → n56.assertion
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
n61.out → n62.assertion
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
n73.out → n74.assertion
n75.out → n74.atom1
n12.out → n74.formula1
n76.out → n74.atom2
n53.out → n74.formula2
n10.out → n78.a
n77.out → n74.atom3
n78.out → n74.formula3
n70.out → n68.a
n74.out → n68.b
n79.out → n80.assertion
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
n85.out → n86.assertion
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
n90.out → n91.assertion
n92.out → n91.atom1
n8.out → n91.formula1
n93.out → n91.atom2
n12.out → n91.formula2
n94.out → n91.atom3
n78.out → n91.formula3
n45.out → n44.a
n91.out → n44.b
n95.out → n96.assertion
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
n101.out → n102.assertion
n103.out → n102.atom1
n12.out → n102.formula1
n104.out → n102.atom2
n34.out → n102.formula2
n105.out → n102.atom3
n98.out → n102.formula3
n43.out → n42.a
n102.out → n42.b
n2.out → n1.a
n42.out → n1.b
n1.out → n106.proof
```

</details>

### *37 · 全称后件组合

- 目标：`⊢ ( ( F ( x ) → ∀ x G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ( F ( x ) → ∀ x H ( x ) ) ) )`
- 提示：先分配，再三段论。
- 参考解：106 个模块 / 157 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n107  [target]
n1  mp
n2  mp
n3  mp
n4  axiom A1
n5  subst
n6  atom P
n7  term x
n8  pred F
n9  pred G
n10  all(v=x)
n11  imp
n12  atom Q
n13  mp
n14  axiom A1
n15  subst
n16  atom P
n17  atom Q
n18  imp
n19  axiom A2
n20  subst
n21  atom P
n22  atom Q
n23  atom R
n24  mp
n25  mp
n26  axiom A1
n27  subst
n28  atom P
n29  atom Q
n30  pred H
n31  imp
n32  all(v=x)
n33  axiom A1
n34  subst
n35  atom P
n36  imp
n37  imp
n38  atom Q
n39  axiom A2
n40  subst
n41  atom P
n42  atom Q
n43  atom R
n44  mp
n45  mp
n46  mp
n47  mp
n48  mp
n49  axiom A5(v=x)
n50  subst
n51  atom P
n52  atom Q
n53  mp
n54  mp
n55  axiom A1
n56  subst
n57  atom P
n58  all(v=x)
n59  imp
n60  atom Q
n61  axiom A1
n62  subst
n63  atom P
n64  imp
n65  imp
n66  atom Q
n67  axiom A2
n68  subst
n69  atom P
n70  atom Q
n71  atom R
n72  mp
n73  mp
n74  axiom A2
n75  subst
n76  atom P
n77  atom Q
n78  atom R
n79  axiom A1
n80  subst
n81  atom P
n82  imp
n83  imp
n84  imp
n85  atom Q
n86  axiom A2
n87  subst
n88  atom P
n89  atom Q
n90  atom R
n91  axiom A2
n92  subst
n93  atom P
n94  atom Q
n95  atom R
n96  axiom A1
n97  subst
n98  atom P
n99  imp
n100  imp
n101  atom Q
n102  axiom A2
n103  subst
n104  atom P
n105  atom Q
n106  atom R

接线：
n4.out → n5.assertion
n7.out → n8.t1
n7.out → n9.t1
n9.out → n10.a
n8.out → n11.a
n10.out → n11.b
n6.out → n5.atom1
n11.out → n5.formula1
n12.out → n5.atom2
n11.out → n5.formula2
n14.out → n15.assertion
n16.out → n15.atom1
n11.out → n15.formula1
n11.out → n18.a
n11.out → n18.b
n17.out → n15.atom2
n18.out → n15.formula2
n19.out → n20.assertion
n21.out → n20.atom1
n11.out → n20.formula1
n22.out → n20.atom2
n18.out → n20.formula2
n23.out → n20.atom3
n11.out → n20.formula3
n15.out → n13.a
n20.out → n13.b
n5.out → n3.a
n13.out → n3.b
n26.out → n27.assertion
n28.out → n27.atom1
n11.out → n27.formula1
n7.out → n30.t1
n9.out → n31.a
n30.out → n31.b
n31.out → n32.a
n29.out → n27.atom2
n32.out → n27.formula2
n33.out → n34.assertion
n32.out → n36.a
n11.out → n36.b
n11.out → n37.a
n36.out → n37.b
n35.out → n34.atom1
n37.out → n34.formula1
n38.out → n34.atom2
n11.out → n34.formula2
n27.out → n25.a
n34.out → n25.b
n39.out → n40.assertion
n41.out → n40.atom1
n11.out → n40.formula1
n42.out → n40.atom2
n11.out → n40.formula2
n43.out → n40.atom3
n36.out → n40.formula3
n25.out → n24.a
n40.out → n24.b
n3.out → n2.a
n24.out → n2.b
n49.out → n50.assertion
n51.out → n50.atom1
n9.out → n50.formula1
n52.out → n50.atom2
n30.out → n50.formula2
n55.out → n56.assertion
n30.out → n58.a
n10.out → n59.a
n58.out → n59.b
n57.out → n56.atom1
n59.out → n56.formula1
n60.out → n56.atom2
n8.out → n56.formula2
n61.out → n62.assertion
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
n67.out → n68.assertion
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
n74.out → n75.assertion
n76.out → n75.atom1
n8.out → n75.formula1
n77.out → n75.atom2
n10.out → n75.formula2
n78.out → n75.atom3
n58.out → n75.formula3
n79.out → n80.assertion
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
n86.out → n87.assertion
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
n91.out → n92.assertion
n93.out → n92.atom1
n32.out → n92.formula1
n94.out → n92.atom2
n11.out → n92.formula2
n95.out → n92.atom3
n82.out → n92.formula3
n47.out → n46.a
n92.out → n46.b
n96.out → n97.assertion
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
n102.out → n103.assertion
n104.out → n103.atom1
n11.out → n103.formula1
n105.out → n103.atom2
n36.out → n103.formula2
n106.out → n103.atom3
n99.out → n103.formula3
n45.out → n44.a
n103.out → n44.b
n2.out → n1.a
n44.out → n1.b
n1.out → n107.proof
```

</details>

### *38 · 辖域移动

- 目标：`⊢ ( ∀ x ( F ( y ) → G ( x ) ) → ( F ( y ) → ∀ x G ( x ) ) )`
- 提示：用全称引入与分配。
- 参考解：105 个模块 / 153 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n106  [target]
n1  mp
n2  mp
n3  mp
n4  axiom A1
n5  subst
n6  atom P
n7  term y
n8  pred F
n9  term x
n10  pred G
n11  imp
n12  all(v=x)
n13  atom Q
n14  mp
n15  axiom A1
n16  subst
n17  atom P
n18  atom Q
n19  imp
n20  axiom A2
n21  subst
n22  atom P
n23  atom Q
n24  atom R
n25  mp
n26  mp
n27  axiom A1
n28  subst
n29  atom P
n30  atom Q
n31  axiom A1
n32  subst
n33  atom P
n34  imp
n35  imp
n36  atom Q
n37  axiom A2
n38  subst
n39  atom P
n40  atom Q
n41  atom R
n42  mp
n43  mp
n44  mp
n45  mp
n46  mp
n47  shift(v=x)
n48  mp
n49  mp
n50  axiom A1
n51  subst
n52  atom P
n53  all(v=x)
n54  atom Q
n55  axiom A1
n56  subst
n57  atom P
n58  imp
n59  imp
n60  atom Q
n61  axiom A2
n62  subst
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n69  axiom A5(v=x)
n70  subst
n71  atom P
n72  atom Q
n73  axiom A2
n74  subst
n75  atom P
n76  atom Q
n77  atom R
n78  all(v=x)
n79  axiom A1
n80  subst
n81  atom P
n82  imp
n83  imp
n84  atom Q
n85  axiom A2
n86  subst
n87  atom P
n88  atom Q
n89  atom R
n90  axiom A2
n91  subst
n92  atom P
n93  atom Q
n94  atom R
n95  axiom A1
n96  subst
n97  atom P
n98  imp
n99  imp
n100  atom Q
n101  axiom A2
n102  subst
n103  atom P
n104  atom Q
n105  atom R

接线：
n4.out → n5.assertion
n7.out → n8.t1
n9.out → n10.t1
n8.out → n11.a
n10.out → n11.b
n11.out → n12.a
n6.out → n5.atom1
n12.out → n5.formula1
n13.out → n5.atom2
n12.out → n5.formula2
n15.out → n16.assertion
n17.out → n16.atom1
n12.out → n16.formula1
n12.out → n19.a
n12.out → n19.b
n18.out → n16.atom2
n19.out → n16.formula2
n20.out → n21.assertion
n22.out → n21.atom1
n12.out → n21.formula1
n23.out → n21.atom2
n19.out → n21.formula2
n24.out → n21.atom3
n12.out → n21.formula3
n16.out → n14.a
n21.out → n14.b
n5.out → n3.a
n14.out → n3.b
n27.out → n28.assertion
n29.out → n28.atom1
n12.out → n28.formula1
n30.out → n28.atom2
n8.out → n28.formula2
n31.out → n32.assertion
n8.out → n34.a
n12.out → n34.b
n12.out → n35.a
n34.out → n35.b
n33.out → n32.atom1
n35.out → n32.formula1
n36.out → n32.atom2
n12.out → n32.formula2
n28.out → n26.a
n32.out → n26.b
n37.out → n38.assertion
n39.out → n38.atom1
n12.out → n38.formula1
n40.out → n38.atom2
n12.out → n38.formula2
n41.out → n38.atom3
n34.out → n38.formula3
n26.out → n25.a
n38.out → n25.b
n3.out → n2.a
n25.out → n2.b
n8.out → n47.formula
n50.out → n51.assertion
n8.out → n53.a
n52.out → n51.atom1
n53.out → n51.formula1
n54.out → n51.atom2
n12.out → n51.formula2
n55.out → n56.assertion
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
n61.out → n62.assertion
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
n73.out → n74.assertion
n75.out → n74.atom1
n12.out → n74.formula1
n76.out → n74.atom2
n53.out → n74.formula2
n10.out → n78.a
n77.out → n74.atom3
n78.out → n74.formula3
n70.out → n68.a
n74.out → n68.b
n79.out → n80.assertion
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
n85.out → n86.assertion
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
n90.out → n91.assertion
n92.out → n91.atom1
n8.out → n91.formula1
n93.out → n91.atom2
n12.out → n91.formula2
n94.out → n91.atom3
n78.out → n91.formula3
n45.out → n44.a
n91.out → n44.b
n95.out → n96.assertion
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
n101.out → n102.assertion
n103.out → n102.atom1
n12.out → n102.formula1
n104.out → n102.atom2
n34.out → n102.formula2
n105.out → n102.atom3
n98.out → n102.formula3
n43.out → n42.a
n102.out → n42.b
n2.out → n1.a
n42.out → n1.b
n1.out → n106.proof
```

</details>

### *39 · 全称替换前件

- 目标：`⊢ ( ( F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → G ( x ) ) )`
- 提示：先全称例化，再三段论。
- 参考解：127 个模块 / 187 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n128  [target]
n1  mp
n2  mp
n3  mp
n4  axiom A1
n5  subst
n6  atom P
n7  term x
n8  pred F
n9  pred G
n10  imp
n11  atom Q
n12  mp
n13  axiom A1
n14  subst
n15  atom P
n16  atom Q
n17  imp
n18  axiom A2
n19  subst
n20  atom P
n21  atom Q
n22  atom R
n23  mp
n24  mp
n25  axiom A1
n26  subst
n27  atom P
n28  atom Q
n29  all(v=x)
n30  axiom A1
n31  subst
n32  atom P
n33  imp
n34  imp
n35  atom Q
n36  axiom A2
n37  subst
n38  atom P
n39  atom Q
n40  atom R
n41  mp
n42  mp
n43  mp
n44  mp
n45  mp
n46  axiom A4(v=x)
n47  subst
n48  atom P
n49  mp
n50  mp
n51  axiom A1
n52  subst
n53  atom P
n54  atom Q
n55  axiom A1
n56  subst
n57  atom P
n58  imp
n59  imp
n60  atom Q
n61  axiom A2
n62  subst
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n69  mp
n70  mp
n71  mp
n72  axiom A1
n73  subst
n74  atom P
n75  atom Q
n76  mp
n77  axiom A1
n78  subst
n79  atom P
n80  atom Q
n81  imp
n82  axiom A2
n83  subst
n84  atom P
n85  atom Q
n86  atom R
n87  axiom A1
n88  subst
n89  atom P
n90  atom Q
n91  axiom A2
n92  subst
n93  atom P
n94  atom Q
n95  atom R
n96  axiom A2
n97  subst
n98  atom P
n99  atom Q
n100  atom R
n101  axiom A1
n102  subst
n103  atom P
n104  imp
n105  imp
n106  atom Q
n107  axiom A2
n108  subst
n109  atom P
n110  atom Q
n111  atom R
n112  axiom A2
n113  subst
n114  atom P
n115  atom Q
n116  atom R
n117  axiom A1
n118  subst
n119  atom P
n120  imp
n121  imp
n122  atom Q
n123  axiom A2
n124  subst
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
n13.out → n14.assertion
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
n25.out → n26.assertion
n27.out → n26.atom1
n10.out → n26.formula1
n8.out → n29.a
n28.out → n26.atom2
n29.out → n26.formula2
n30.out → n31.assertion
n29.out → n33.a
n10.out → n33.b
n10.out → n34.a
n33.out → n34.b
n32.out → n31.atom1
n34.out → n31.formula1
n35.out → n31.atom2
n10.out → n31.formula2
n26.out → n24.a
n31.out → n24.b
n36.out → n37.assertion
n38.out → n37.atom1
n10.out → n37.formula1
n39.out → n37.atom2
n10.out → n37.formula2
n40.out → n37.atom3
n33.out → n37.formula3
n24.out → n23.a
n37.out → n23.b
n3.out → n2.a
n23.out → n2.b
n46.out → n47.assertion
n48.out → n47.atom1
n8.out → n47.formula1
n51.out → n52.assertion
n53.out → n52.atom1
n8.out → n52.formula1
n54.out → n52.atom2
n10.out → n52.formula2
n55.out → n56.assertion
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
n61.out → n62.assertion
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
n72.out → n73.assertion
n74.out → n73.atom1
n9.out → n73.formula1
n75.out → n73.atom2
n9.out → n73.formula2
n77.out → n78.assertion
n79.out → n78.atom1
n9.out → n78.formula1
n9.out → n81.a
n9.out → n81.b
n80.out → n78.atom2
n81.out → n78.formula2
n82.out → n83.assertion
n84.out → n83.atom1
n9.out → n83.formula1
n85.out → n83.atom2
n81.out → n83.formula2
n86.out → n83.atom3
n9.out → n83.formula3
n78.out → n76.a
n83.out → n76.b
n73.out → n71.a
n76.out → n71.b
n87.out → n88.assertion
n89.out → n88.atom1
n81.out → n88.formula1
n90.out → n88.atom2
n8.out → n88.formula2
n71.out → n70.a
n88.out → n70.b
n91.out → n92.assertion
n93.out → n92.atom1
n8.out → n92.formula1
n94.out → n92.atom2
n9.out → n92.formula2
n95.out → n92.atom3
n9.out → n92.formula3
n70.out → n69.a
n92.out → n69.b
n96.out → n97.assertion
n98.out → n97.atom1
n10.out → n97.formula1
n99.out → n97.atom2
n8.out → n97.formula2
n100.out → n97.atom3
n9.out → n97.formula3
n69.out → n68.a
n97.out → n68.b
n101.out → n102.assertion
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
n107.out → n108.assertion
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
n112.out → n113.assertion
n114.out → n113.atom1
n29.out → n113.formula1
n115.out → n113.atom2
n10.out → n113.formula2
n116.out → n113.atom3
n9.out → n113.formula3
n44.out → n43.a
n113.out → n43.b
n117.out → n118.assertion
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
n123.out → n124.assertion
n125.out → n124.atom1
n10.out → n124.formula1
n126.out → n124.atom2
n33.out → n124.formula2
n127.out → n124.atom3
n120.out → n124.formula3
n42.out → n41.a
n124.out → n41.b
n2.out → n1.a
n41.out → n1.b
n1.out → n128.proof
```

</details>

### *40 · 全称合并

- 目标：`⊢ ( ( ∀ x F ( x ) → ∀ x ∀ x F ( x ) ) → ( ( ∀ x ( ∀ x F ( x ) → G ( x ) ) → ( ∀ x ∀ x F ( x ) → ∀ x G ( x ) ) ) → ( ∀ x ( ∀ x F ( x ) → G ( x ) ) → ( ∀ x F ( x ) → ∀ x G ( x ) ) ) ) )`
- 提示：分配、引入、再分配。
- 参考解：246 个模块 / 368 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n247  [target]
n1  mp
n2  mp
n3  mp
n4  mp
n5  mp
n6  axiom A1
n7  subst
n8  atom P
n9  term x
n10  pred F
n11  all(v=x)
n12  all(v=x)
n13  imp
n14  atom Q
n15  mp
n16  axiom A1
n17  subst
n18  atom P
n19  atom Q
n20  imp
n21  axiom A2
n22  subst
n23  atom P
n24  atom Q
n25  atom R
n26  mp
n27  mp
n28  axiom A1
n29  subst
n30  atom P
n31  atom Q
n32  pred G
n33  all(v=x)
n34  imp
n35  axiom A1
n36  subst
n37  atom P
n38  imp
n39  imp
n40  atom Q
n41  axiom A2
n42  subst
n43  atom P
n44  atom Q
n45  atom R
n46  mp
n47  mp
n48  mp
n49  mp
n50  mp
n51  mp
n52  mp
n53  axiom A1
n54  subst
n55  atom P
n56  atom Q
n57  mp
n58  axiom A1
n59  subst
n60  atom P
n61  atom Q
n62  imp
n63  axiom A2
n64  subst
n65  atom P
n66  atom Q
n67  atom R
n68  axiom A1
n69  subst
n70  atom P
n71  atom Q
n72  mp
n73  mp
n74  axiom A1
n75  subst
n76  atom P
n77  atom Q
n78  axiom A1
n79  subst
n80  atom P
n81  imp
n82  imp
n83  atom Q
n84  axiom A2
n85  subst
n86  atom P
n87  atom Q
n88  atom R
n89  mp
n90  mp
n91  axiom A2
n92  subst
n93  atom P
n94  atom Q
n95  atom R
n96  axiom A1
n97  subst
n98  atom P
n99  imp
n100  imp
n101  atom Q
n102  axiom A2
n103  subst
n104  atom P
n105  atom Q
n106  atom R
n107  mp
n108  mp
n109  mp
n110  mp
n111  mp
n112  mp
n113  mp
n114  axiom A1
n115  subst
n116  atom P
n117  atom Q
n118  mp
n119  axiom A1
n120  subst
n121  atom P
n122  atom Q
n123  axiom A2
n124  subst
n125  atom P
n126  atom Q
n127  atom R
n128  mp
n129  mp
n130  axiom A1
n131  subst
n132  atom P
n133  atom Q
n134  axiom A1
n135  subst
n136  atom P
n137  imp
n138  imp
n139  atom Q
n140  axiom A2
n141  subst
n142  atom P
n143  atom Q
n144  atom R
n145  mp
n146  mp
n147  axiom A2
n148  subst
n149  atom P
n150  atom Q
n151  atom R
n152  axiom A1
n153  subst
n154  atom P
n155  imp
n156  imp
n157  imp
n158  atom Q
n159  axiom A2
n160  subst
n161  atom P
n162  atom Q
n163  atom R
n164  axiom A1
n165  subst
n166  atom P
n167  imp
n168  atom Q
n169  axiom A2
n170  subst
n171  atom P
n172  atom Q
n173  atom R
n174  axiom A1
n175  subst
n176  atom P
n177  imp
n178  atom Q
n179  axiom A2
n180  subst
n181  atom P
n182  atom Q
n183  atom R
n184  mp
n185  mp
n186  axiom A2
n187  subst
n188  atom P
n189  atom Q
n190  atom R
n191  axiom A1
n192  subst
n193  atom P
n194  imp
n195  imp
n196  imp
n197  atom Q
n198  axiom A2
n199  subst
n200  atom P
n201  atom Q
n202  atom R
n203  axiom A2
n204  subst
n205  atom P
n206  atom Q
n207  atom R
n208  mp
n209  mp
n210  axiom A1
n211  subst
n212  atom P
n213  atom Q
n214  imp
n215  all(v=x)
n216  axiom A1
n217  subst
n218  atom P
n219  imp
n220  imp
n221  atom Q
n222  axiom A2
n223  subst
n224  atom P
n225  atom Q
n226  atom R
n227  mp
n228  mp
n229  axiom A2
n230  subst
n231  atom P
n232  atom Q
n233  atom R
n234  axiom A1
n235  subst
n236  atom P
n237  imp
n238  imp
n239  imp
n240  imp
n241  atom Q
n242  axiom A2
n243  subst
n244  atom P
n245  atom Q
n246  atom R

接线：
n6.out → n7.assertion
n9.out → n10.t1
n10.out → n11.a
n11.out → n12.a
n11.out → n13.a
n12.out → n13.b
n8.out → n7.atom1
n13.out → n7.formula1
n14.out → n7.atom2
n13.out → n7.formula2
n16.out → n17.assertion
n18.out → n17.atom1
n13.out → n17.formula1
n13.out → n20.a
n13.out → n20.b
n19.out → n17.atom2
n20.out → n17.formula2
n21.out → n22.assertion
n23.out → n22.atom1
n13.out → n22.formula1
n24.out → n22.atom2
n20.out → n22.formula2
n25.out → n22.atom3
n13.out → n22.formula3
n17.out → n15.a
n22.out → n15.b
n7.out → n5.a
n15.out → n5.b
n28.out → n29.assertion
n30.out → n29.atom1
n13.out → n29.formula1
n9.out → n32.t1
n32.out → n33.a
n12.out → n34.a
n33.out → n34.b
n31.out → n29.atom2
n34.out → n29.formula2
n35.out → n36.assertion
n34.out → n38.a
n13.out → n38.b
n13.out → n39.a
n38.out → n39.b
n37.out → n36.atom1
n39.out → n36.formula1
n40.out → n36.atom2
n13.out → n36.formula2
n29.out → n27.a
n36.out → n27.b
n41.out → n42.assertion
n43.out → n42.atom1
n13.out → n42.formula1
n44.out → n42.atom2
n13.out → n42.formula2
n45.out → n42.atom3
n38.out → n42.formula3
n27.out → n26.a
n42.out → n26.b
n5.out → n4.a
n26.out → n4.b
n53.out → n54.assertion
n55.out → n54.atom1
n33.out → n54.formula1
n56.out → n54.atom2
n33.out → n54.formula2
n58.out → n59.assertion
n60.out → n59.atom1
n33.out → n59.formula1
n33.out → n62.a
n33.out → n62.b
n61.out → n59.atom2
n62.out → n59.formula2
n63.out → n64.assertion
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
n68.out → n69.assertion
n70.out → n69.atom1
n62.out → n69.formula1
n71.out → n69.atom2
n13.out → n69.formula2
n52.out → n51.a
n69.out → n51.b
n74.out → n75.assertion
n76.out → n75.atom1
n62.out → n75.formula1
n77.out → n75.atom2
n12.out → n75.formula2
n78.out → n79.assertion
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
n84.out → n85.assertion
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
n91.out → n92.assertion
n93.out → n92.atom1
n12.out → n92.formula1
n94.out → n92.atom2
n33.out → n92.formula2
n95.out → n92.atom3
n33.out → n92.formula3
n96.out → n97.assertion
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
n102.out → n103.assertion
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
n114.out → n115.assertion
n116.out → n115.atom1
n34.out → n115.formula1
n117.out → n115.atom2
n34.out → n115.formula2
n119.out → n120.assertion
n121.out → n120.atom1
n34.out → n120.formula1
n122.out → n120.atom2
n99.out → n120.formula2
n123.out → n124.assertion
n125.out → n124.atom1
n34.out → n124.formula1
n126.out → n124.atom2
n99.out → n124.formula2
n127.out → n124.atom3
n34.out → n124.formula3
n120.out → n118.a
n124.out → n118.b
n115.out → n113.a
n118.out → n113.b
n130.out → n131.assertion
n132.out → n131.atom1
n34.out → n131.formula1
n133.out → n131.atom2
n11.out → n131.formula2
n134.out → n135.assertion
n11.out → n137.a
n34.out → n137.b
n34.out → n138.a
n137.out → n138.b
n136.out → n135.atom1
n138.out → n135.formula1
n139.out → n135.atom2
n34.out → n135.formula2
n131.out → n129.a
n135.out → n129.b
n140.out → n141.assertion
n142.out → n141.atom1
n34.out → n141.formula1
n143.out → n141.atom2
n34.out → n141.formula2
n144.out → n141.atom3
n137.out → n141.formula3
n129.out → n128.a
n141.out → n128.b
n113.out → n112.a
n128.out → n112.b
n147.out → n148.assertion
n149.out → n148.atom1
n11.out → n148.formula1
n150.out → n148.atom2
n12.out → n148.formula2
n151.out → n148.atom3
n33.out → n148.formula3
n152.out → n153.assertion
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
n159.out → n160.assertion
n161.out → n160.atom1
n34.out → n160.formula1
n162.out → n160.atom2
n137.out → n160.formula2
n163.out → n160.atom3
n156.out → n160.formula3
n146.out → n145.a
n160.out → n145.b
n112.out → n111.a
n145.out → n111.b
n164.out → n165.assertion
n34.out → n167.a
n156.out → n167.b
n166.out → n165.atom1
n167.out → n165.formula1
n168.out → n165.atom2
n34.out → n165.formula2
n111.out → n110.a
n165.out → n110.b
n169.out → n170.assertion
n171.out → n170.atom1
n34.out → n170.formula1
n172.out → n170.atom2
n34.out → n170.formula2
n173.out → n170.atom3
n156.out → n170.formula3
n110.out → n109.a
n170.out → n109.b
n174.out → n175.assertion
n99.out → n177.a
n167.out → n177.b
n176.out → n175.atom1
n177.out → n175.formula1
n178.out → n175.atom2
n13.out → n175.formula2
n109.out → n108.a
n175.out → n108.b
n179.out → n180.assertion
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
n186.out → n187.assertion
n188.out → n187.atom1
n34.out → n187.formula1
n189.out → n187.atom2
n13.out → n187.formula2
n190.out → n187.atom3
n155.out → n187.formula3
n191.out → n192.assertion
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
n198.out → n199.assertion
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
n203.out → n204.assertion
n205.out → n204.atom1
n13.out → n204.formula1
n206.out → n204.atom2
n38.out → n204.formula2
n207.out → n204.atom3
n194.out → n204.formula3
n47.out → n46.a
n204.out → n46.b
n4.out → n3.a
n46.out → n3.b
n210.out → n211.assertion
n212.out → n211.atom1
n194.out → n211.formula1
n11.out → n214.a
n32.out → n214.b
n214.out → n215.a
n213.out → n211.atom2
n215.out → n211.formula2
n216.out → n217.assertion
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
n222.out → n223.assertion
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
n229.out → n230.assertion
n231.out → n230.atom1
n215.out → n230.formula1
n232.out → n230.atom2
n34.out → n230.formula2
n233.out → n230.atom3
n155.out → n230.formula3
n234.out → n235.assertion
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
n242.out → n243.assertion
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
- 参考解：247 个模块 / 367 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n248  [target]
n1  mp
n2  gen(v=x)
n3  mp
n4  mp
n5  mp
n6  axiom A1
n7  subst
n8  atom P
n9  term x
n10  pred F
n11  pred G
n12  imp
n13  atom Q
n14  mp
n15  axiom A1
n16  subst
n17  atom P
n18  atom Q
n19  imp
n20  axiom A2
n21  subst
n22  atom P
n23  atom Q
n24  atom R
n25  mp
n26  mp
n27  axiom A1
n28  subst
n29  atom P
n30  atom Q
n31  pred H
n32  imp
n33  axiom A1
n34  subst
n35  atom P
n36  imp
n37  imp
n38  atom Q
n39  axiom A2
n40  subst
n41  atom P
n42  atom Q
n43  atom R
n44  mp
n45  mp
n46  mp
n47  mp
n48  mp
n49  mp
n50  mp
n51  axiom A1
n52  subst
n53  atom P
n54  atom Q
n55  mp
n56  axiom A1
n57  subst
n58  atom P
n59  atom Q
n60  imp
n61  axiom A2
n62  subst
n63  atom P
n64  atom Q
n65  atom R
n66  axiom A1
n67  subst
n68  atom P
n69  atom Q
n70  mp
n71  mp
n72  axiom A1
n73  subst
n74  atom P
n75  atom Q
n76  axiom A1
n77  subst
n78  atom P
n79  imp
n80  imp
n81  atom Q
n82  axiom A2
n83  subst
n84  atom P
n85  atom Q
n86  atom R
n87  mp
n88  mp
n89  axiom A2
n90  subst
n91  atom P
n92  atom Q
n93  atom R
n94  axiom A1
n95  subst
n96  atom P
n97  imp
n98  imp
n99  atom Q
n100  axiom A2
n101  subst
n102  atom P
n103  atom Q
n104  atom R
n105  mp
n106  mp
n107  mp
n108  mp
n109  mp
n110  mp
n111  mp
n112  axiom A1
n113  subst
n114  atom P
n115  atom Q
n116  mp
n117  axiom A1
n118  subst
n119  atom P
n120  atom Q
n121  axiom A2
n122  subst
n123  atom P
n124  atom Q
n125  atom R
n126  mp
n127  mp
n128  axiom A1
n129  subst
n130  atom P
n131  atom Q
n132  axiom A1
n133  subst
n134  atom P
n135  imp
n136  imp
n137  atom Q
n138  axiom A2
n139  subst
n140  atom P
n141  atom Q
n142  atom R
n143  mp
n144  mp
n145  axiom A2
n146  subst
n147  atom P
n148  atom Q
n149  atom R
n150  axiom A1
n151  subst
n152  atom P
n153  imp
n154  imp
n155  imp
n156  atom Q
n157  axiom A2
n158  subst
n159  atom P
n160  atom Q
n161  atom R
n162  axiom A1
n163  subst
n164  atom P
n165  imp
n166  atom Q
n167  axiom A2
n168  subst
n169  atom P
n170  atom Q
n171  atom R
n172  axiom A1
n173  subst
n174  atom P
n175  imp
n176  atom Q
n177  axiom A2
n178  subst
n179  atom P
n180  atom Q
n181  atom R
n182  mp
n183  mp
n184  axiom A2
n185  subst
n186  atom P
n187  atom Q
n188  atom R
n189  axiom A1
n190  subst
n191  atom P
n192  imp
n193  imp
n194  imp
n195  atom Q
n196  axiom A2
n197  subst
n198  atom P
n199  atom Q
n200  atom R
n201  axiom A2
n202  subst
n203  atom P
n204  atom Q
n205  atom R
n206  mp
n207  axiom A5(v=x)
n208  subst
n209  atom P
n210  atom Q
n211  mp
n212  mp
n213  mp
n214  mp
n215  axiom A5(v=x)
n216  subst
n217  atom P
n218  atom Q
n219  axiom A1
n220  subst
n221  atom P
n222  all(v=x)
n223  all(v=x)
n224  all(v=x)
n225  imp
n226  imp
n227  atom Q
n228  all(v=x)
n229  axiom A2
n230  subst
n231  atom P
n232  atom Q
n233  atom R
n234  axiom A1
n235  subst
n236  atom P
n237  imp
n238  imp
n239  imp
n240  atom Q
n241  imp
n242  all(v=x)
n243  axiom A2
n244  subst
n245  atom P
n246  atom Q
n247  atom R

接线：
n6.out → n7.assertion
n9.out → n10.t1
n9.out → n11.t1
n10.out → n12.a
n11.out → n12.b
n8.out → n7.atom1
n12.out → n7.formula1
n13.out → n7.atom2
n12.out → n7.formula2
n15.out → n16.assertion
n17.out → n16.atom1
n12.out → n16.formula1
n12.out → n19.a
n12.out → n19.b
n18.out → n16.atom2
n19.out → n16.formula2
n20.out → n21.assertion
n22.out → n21.atom1
n12.out → n21.formula1
n23.out → n21.atom2
n19.out → n21.formula2
n24.out → n21.atom3
n12.out → n21.formula3
n16.out → n14.a
n21.out → n14.b
n7.out → n5.a
n14.out → n5.b
n27.out → n28.assertion
n29.out → n28.atom1
n12.out → n28.formula1
n9.out → n31.t1
n11.out → n32.a
n31.out → n32.b
n30.out → n28.atom2
n32.out → n28.formula2
n33.out → n34.assertion
n32.out → n36.a
n12.out → n36.b
n12.out → n37.a
n36.out → n37.b
n35.out → n34.atom1
n37.out → n34.formula1
n38.out → n34.atom2
n12.out → n34.formula2
n28.out → n26.a
n34.out → n26.b
n39.out → n40.assertion
n41.out → n40.atom1
n12.out → n40.formula1
n42.out → n40.atom2
n12.out → n40.formula2
n43.out → n40.atom3
n36.out → n40.formula3
n26.out → n25.a
n40.out → n25.b
n5.out → n4.a
n25.out → n4.b
n51.out → n52.assertion
n53.out → n52.atom1
n31.out → n52.formula1
n54.out → n52.atom2
n31.out → n52.formula2
n56.out → n57.assertion
n58.out → n57.atom1
n31.out → n57.formula1
n31.out → n60.a
n31.out → n60.b
n59.out → n57.atom2
n60.out → n57.formula2
n61.out → n62.assertion
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
n66.out → n67.assertion
n68.out → n67.atom1
n60.out → n67.formula1
n69.out → n67.atom2
n12.out → n67.formula2
n50.out → n49.a
n67.out → n49.b
n72.out → n73.assertion
n74.out → n73.atom1
n60.out → n73.formula1
n75.out → n73.atom2
n11.out → n73.formula2
n76.out → n77.assertion
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
n82.out → n83.assertion
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
n89.out → n90.assertion
n91.out → n90.atom1
n11.out → n90.formula1
n92.out → n90.atom2
n31.out → n90.formula2
n93.out → n90.atom3
n31.out → n90.formula3
n94.out → n95.assertion
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
n100.out → n101.assertion
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
n112.out → n113.assertion
n114.out → n113.atom1
n32.out → n113.formula1
n115.out → n113.atom2
n32.out → n113.formula2
n117.out → n118.assertion
n119.out → n118.atom1
n32.out → n118.formula1
n120.out → n118.atom2
n97.out → n118.formula2
n121.out → n122.assertion
n123.out → n122.atom1
n32.out → n122.formula1
n124.out → n122.atom2
n97.out → n122.formula2
n125.out → n122.atom3
n32.out → n122.formula3
n118.out → n116.a
n122.out → n116.b
n113.out → n111.a
n116.out → n111.b
n128.out → n129.assertion
n130.out → n129.atom1
n32.out → n129.formula1
n131.out → n129.atom2
n10.out → n129.formula2
n132.out → n133.assertion
n10.out → n135.a
n32.out → n135.b
n32.out → n136.a
n135.out → n136.b
n134.out → n133.atom1
n136.out → n133.formula1
n137.out → n133.atom2
n32.out → n133.formula2
n129.out → n127.a
n133.out → n127.b
n138.out → n139.assertion
n140.out → n139.atom1
n32.out → n139.formula1
n141.out → n139.atom2
n32.out → n139.formula2
n142.out → n139.atom3
n135.out → n139.formula3
n127.out → n126.a
n139.out → n126.b
n111.out → n110.a
n126.out → n110.b
n145.out → n146.assertion
n147.out → n146.atom1
n10.out → n146.formula1
n148.out → n146.atom2
n11.out → n146.formula2
n149.out → n146.atom3
n31.out → n146.formula3
n150.out → n151.assertion
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
n157.out → n158.assertion
n159.out → n158.atom1
n32.out → n158.formula1
n160.out → n158.atom2
n135.out → n158.formula2
n161.out → n158.atom3
n154.out → n158.formula3
n144.out → n143.a
n158.out → n143.b
n110.out → n109.a
n143.out → n109.b
n162.out → n163.assertion
n32.out → n165.a
n154.out → n165.b
n164.out → n163.atom1
n165.out → n163.formula1
n166.out → n163.atom2
n32.out → n163.formula2
n109.out → n108.a
n163.out → n108.b
n167.out → n168.assertion
n169.out → n168.atom1
n32.out → n168.formula1
n170.out → n168.atom2
n32.out → n168.formula2
n171.out → n168.atom3
n154.out → n168.formula3
n108.out → n107.a
n168.out → n107.b
n172.out → n173.assertion
n97.out → n175.a
n165.out → n175.b
n174.out → n173.atom1
n175.out → n173.formula1
n176.out → n173.atom2
n12.out → n173.formula2
n107.out → n106.a
n173.out → n106.b
n177.out → n178.assertion
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
n184.out → n185.assertion
n186.out → n185.atom1
n32.out → n185.formula1
n187.out → n185.atom2
n12.out → n185.formula2
n188.out → n185.atom3
n153.out → n185.formula3
n189.out → n190.assertion
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
n196.out → n197.assertion
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
n201.out → n202.assertion
n203.out → n202.atom1
n12.out → n202.formula1
n204.out → n202.atom2
n36.out → n202.formula2
n205.out → n202.atom3
n192.out → n202.formula3
n45.out → n44.a
n202.out → n44.b
n4.out → n3.a
n44.out → n3.b
n3.out → n2.assertion
n207.out → n208.assertion
n209.out → n208.atom1
n12.out → n208.formula1
n210.out → n208.atom2
n192.out → n208.formula2
n215.out → n216.assertion
n217.out → n216.atom1
n32.out → n216.formula1
n218.out → n216.atom2
n153.out → n216.formula2
n219.out → n220.assertion
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
n229.out → n230.assertion
n231.out → n230.atom1
n228.out → n230.formula1
n232.out → n230.atom2
n222.out → n230.formula2
n233.out → n230.atom3
n225.out → n230.formula3
n214.out → n213.a
n230.out → n213.b
n234.out → n235.assertion
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
n243.out → n244.assertion
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
- 参考解：105 个模块 / 153 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n106  [target]
n1  mp
n2  mp
n3  mp
n4  axiom A1
n5  subst
n6  atom P
n7  term y
n8  pred H
n9  term x
n10  pred F
n11  imp
n12  all(v=x)
n13  atom Q
n14  mp
n15  axiom A1
n16  subst
n17  atom P
n18  atom Q
n19  imp
n20  axiom A2
n21  subst
n22  atom P
n23  atom Q
n24  atom R
n25  mp
n26  mp
n27  axiom A1
n28  subst
n29  atom P
n30  atom Q
n31  axiom A1
n32  subst
n33  atom P
n34  imp
n35  imp
n36  atom Q
n37  axiom A2
n38  subst
n39  atom P
n40  atom Q
n41  atom R
n42  mp
n43  mp
n44  mp
n45  mp
n46  mp
n47  shift(v=x)
n48  mp
n49  mp
n50  axiom A1
n51  subst
n52  atom P
n53  all(v=x)
n54  atom Q
n55  axiom A1
n56  subst
n57  atom P
n58  imp
n59  imp
n60  atom Q
n61  axiom A2
n62  subst
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n69  axiom A5(v=x)
n70  subst
n71  atom P
n72  atom Q
n73  axiom A2
n74  subst
n75  atom P
n76  atom Q
n77  atom R
n78  all(v=x)
n79  axiom A1
n80  subst
n81  atom P
n82  imp
n83  imp
n84  atom Q
n85  axiom A2
n86  subst
n87  atom P
n88  atom Q
n89  atom R
n90  axiom A2
n91  subst
n92  atom P
n93  atom Q
n94  atom R
n95  axiom A1
n96  subst
n97  atom P
n98  imp
n99  imp
n100  atom Q
n101  axiom A2
n102  subst
n103  atom P
n104  atom Q
n105  atom R

接线：
n4.out → n5.assertion
n7.out → n8.t1
n9.out → n10.t1
n8.out → n11.a
n10.out → n11.b
n11.out → n12.a
n6.out → n5.atom1
n12.out → n5.formula1
n13.out → n5.atom2
n12.out → n5.formula2
n15.out → n16.assertion
n17.out → n16.atom1
n12.out → n16.formula1
n12.out → n19.a
n12.out → n19.b
n18.out → n16.atom2
n19.out → n16.formula2
n20.out → n21.assertion
n22.out → n21.atom1
n12.out → n21.formula1
n23.out → n21.atom2
n19.out → n21.formula2
n24.out → n21.atom3
n12.out → n21.formula3
n16.out → n14.a
n21.out → n14.b
n5.out → n3.a
n14.out → n3.b
n27.out → n28.assertion
n29.out → n28.atom1
n12.out → n28.formula1
n30.out → n28.atom2
n8.out → n28.formula2
n31.out → n32.assertion
n8.out → n34.a
n12.out → n34.b
n12.out → n35.a
n34.out → n35.b
n33.out → n32.atom1
n35.out → n32.formula1
n36.out → n32.atom2
n12.out → n32.formula2
n28.out → n26.a
n32.out → n26.b
n37.out → n38.assertion
n39.out → n38.atom1
n12.out → n38.formula1
n40.out → n38.atom2
n12.out → n38.formula2
n41.out → n38.atom3
n34.out → n38.formula3
n26.out → n25.a
n38.out → n25.b
n3.out → n2.a
n25.out → n2.b
n8.out → n47.formula
n50.out → n51.assertion
n8.out → n53.a
n52.out → n51.atom1
n53.out → n51.formula1
n54.out → n51.atom2
n12.out → n51.formula2
n55.out → n56.assertion
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
n61.out → n62.assertion
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
n73.out → n74.assertion
n75.out → n74.atom1
n12.out → n74.formula1
n76.out → n74.atom2
n53.out → n74.formula2
n10.out → n78.a
n77.out → n74.atom3
n78.out → n74.formula3
n70.out → n68.a
n74.out → n68.b
n79.out → n80.assertion
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
n85.out → n86.assertion
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
n90.out → n91.assertion
n92.out → n91.atom1
n8.out → n91.formula1
n93.out → n91.atom2
n12.out → n91.formula2
n94.out → n91.atom3
n78.out → n91.formula3
n45.out → n44.a
n91.out → n44.b
n95.out → n96.assertion
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
n101.out → n102.assertion
n103.out → n102.atom1
n12.out → n102.formula1
n104.out → n102.atom2
n34.out → n102.formula2
n105.out → n102.atom3
n98.out → n102.formula3
n43.out → n42.a
n102.out → n42.b
n2.out → n1.a
n42.out → n1.b
n1.out → n106.proof
```

</details>

### *43 · 全称三段论（换序）

- 目标：`⊢ ( ∀ x ( F ( x ) → G ( x ) ) → ( ∀ x ( G ( x ) → H ( x ) ) → ∀ x ( F ( x ) → H ( x ) ) ) )`
- 提示：同 *42，换谓词顺序。
- 参考解：247 个模块 / 367 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n248  [target]
n1  mp
n2  gen(v=x)
n3  mp
n4  mp
n5  mp
n6  axiom A1
n7  subst
n8  atom P
n9  term x
n10  pred F
n11  pred G
n12  imp
n13  atom Q
n14  mp
n15  axiom A1
n16  subst
n17  atom P
n18  atom Q
n19  imp
n20  axiom A2
n21  subst
n22  atom P
n23  atom Q
n24  atom R
n25  mp
n26  mp
n27  axiom A1
n28  subst
n29  atom P
n30  atom Q
n31  pred H
n32  imp
n33  axiom A1
n34  subst
n35  atom P
n36  imp
n37  imp
n38  atom Q
n39  axiom A2
n40  subst
n41  atom P
n42  atom Q
n43  atom R
n44  mp
n45  mp
n46  mp
n47  mp
n48  mp
n49  mp
n50  mp
n51  axiom A1
n52  subst
n53  atom P
n54  atom Q
n55  mp
n56  axiom A1
n57  subst
n58  atom P
n59  atom Q
n60  imp
n61  axiom A2
n62  subst
n63  atom P
n64  atom Q
n65  atom R
n66  axiom A1
n67  subst
n68  atom P
n69  atom Q
n70  mp
n71  mp
n72  axiom A1
n73  subst
n74  atom P
n75  atom Q
n76  axiom A1
n77  subst
n78  atom P
n79  imp
n80  imp
n81  atom Q
n82  axiom A2
n83  subst
n84  atom P
n85  atom Q
n86  atom R
n87  mp
n88  mp
n89  axiom A2
n90  subst
n91  atom P
n92  atom Q
n93  atom R
n94  axiom A1
n95  subst
n96  atom P
n97  imp
n98  imp
n99  atom Q
n100  axiom A2
n101  subst
n102  atom P
n103  atom Q
n104  atom R
n105  mp
n106  mp
n107  mp
n108  mp
n109  mp
n110  mp
n111  mp
n112  axiom A1
n113  subst
n114  atom P
n115  atom Q
n116  mp
n117  axiom A1
n118  subst
n119  atom P
n120  atom Q
n121  axiom A2
n122  subst
n123  atom P
n124  atom Q
n125  atom R
n126  mp
n127  mp
n128  axiom A1
n129  subst
n130  atom P
n131  atom Q
n132  axiom A1
n133  subst
n134  atom P
n135  imp
n136  imp
n137  atom Q
n138  axiom A2
n139  subst
n140  atom P
n141  atom Q
n142  atom R
n143  mp
n144  mp
n145  axiom A2
n146  subst
n147  atom P
n148  atom Q
n149  atom R
n150  axiom A1
n151  subst
n152  atom P
n153  imp
n154  imp
n155  imp
n156  atom Q
n157  axiom A2
n158  subst
n159  atom P
n160  atom Q
n161  atom R
n162  axiom A1
n163  subst
n164  atom P
n165  imp
n166  atom Q
n167  axiom A2
n168  subst
n169  atom P
n170  atom Q
n171  atom R
n172  axiom A1
n173  subst
n174  atom P
n175  imp
n176  atom Q
n177  axiom A2
n178  subst
n179  atom P
n180  atom Q
n181  atom R
n182  mp
n183  mp
n184  axiom A2
n185  subst
n186  atom P
n187  atom Q
n188  atom R
n189  axiom A1
n190  subst
n191  atom P
n192  imp
n193  imp
n194  imp
n195  atom Q
n196  axiom A2
n197  subst
n198  atom P
n199  atom Q
n200  atom R
n201  axiom A2
n202  subst
n203  atom P
n204  atom Q
n205  atom R
n206  mp
n207  axiom A5(v=x)
n208  subst
n209  atom P
n210  atom Q
n211  mp
n212  mp
n213  mp
n214  mp
n215  axiom A5(v=x)
n216  subst
n217  atom P
n218  atom Q
n219  axiom A1
n220  subst
n221  atom P
n222  all(v=x)
n223  all(v=x)
n224  all(v=x)
n225  imp
n226  imp
n227  atom Q
n228  all(v=x)
n229  axiom A2
n230  subst
n231  atom P
n232  atom Q
n233  atom R
n234  axiom A1
n235  subst
n236  atom P
n237  imp
n238  imp
n239  imp
n240  atom Q
n241  imp
n242  all(v=x)
n243  axiom A2
n244  subst
n245  atom P
n246  atom Q
n247  atom R

接线：
n6.out → n7.assertion
n9.out → n10.t1
n9.out → n11.t1
n10.out → n12.a
n11.out → n12.b
n8.out → n7.atom1
n12.out → n7.formula1
n13.out → n7.atom2
n12.out → n7.formula2
n15.out → n16.assertion
n17.out → n16.atom1
n12.out → n16.formula1
n12.out → n19.a
n12.out → n19.b
n18.out → n16.atom2
n19.out → n16.formula2
n20.out → n21.assertion
n22.out → n21.atom1
n12.out → n21.formula1
n23.out → n21.atom2
n19.out → n21.formula2
n24.out → n21.atom3
n12.out → n21.formula3
n16.out → n14.a
n21.out → n14.b
n7.out → n5.a
n14.out → n5.b
n27.out → n28.assertion
n29.out → n28.atom1
n12.out → n28.formula1
n9.out → n31.t1
n11.out → n32.a
n31.out → n32.b
n30.out → n28.atom2
n32.out → n28.formula2
n33.out → n34.assertion
n32.out → n36.a
n12.out → n36.b
n12.out → n37.a
n36.out → n37.b
n35.out → n34.atom1
n37.out → n34.formula1
n38.out → n34.atom2
n12.out → n34.formula2
n28.out → n26.a
n34.out → n26.b
n39.out → n40.assertion
n41.out → n40.atom1
n12.out → n40.formula1
n42.out → n40.atom2
n12.out → n40.formula2
n43.out → n40.atom3
n36.out → n40.formula3
n26.out → n25.a
n40.out → n25.b
n5.out → n4.a
n25.out → n4.b
n51.out → n52.assertion
n53.out → n52.atom1
n31.out → n52.formula1
n54.out → n52.atom2
n31.out → n52.formula2
n56.out → n57.assertion
n58.out → n57.atom1
n31.out → n57.formula1
n31.out → n60.a
n31.out → n60.b
n59.out → n57.atom2
n60.out → n57.formula2
n61.out → n62.assertion
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
n66.out → n67.assertion
n68.out → n67.atom1
n60.out → n67.formula1
n69.out → n67.atom2
n12.out → n67.formula2
n50.out → n49.a
n67.out → n49.b
n72.out → n73.assertion
n74.out → n73.atom1
n60.out → n73.formula1
n75.out → n73.atom2
n11.out → n73.formula2
n76.out → n77.assertion
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
n82.out → n83.assertion
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
n89.out → n90.assertion
n91.out → n90.atom1
n11.out → n90.formula1
n92.out → n90.atom2
n31.out → n90.formula2
n93.out → n90.atom3
n31.out → n90.formula3
n94.out → n95.assertion
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
n100.out → n101.assertion
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
n112.out → n113.assertion
n114.out → n113.atom1
n32.out → n113.formula1
n115.out → n113.atom2
n32.out → n113.formula2
n117.out → n118.assertion
n119.out → n118.atom1
n32.out → n118.formula1
n120.out → n118.atom2
n97.out → n118.formula2
n121.out → n122.assertion
n123.out → n122.atom1
n32.out → n122.formula1
n124.out → n122.atom2
n97.out → n122.formula2
n125.out → n122.atom3
n32.out → n122.formula3
n118.out → n116.a
n122.out → n116.b
n113.out → n111.a
n116.out → n111.b
n128.out → n129.assertion
n130.out → n129.atom1
n32.out → n129.formula1
n131.out → n129.atom2
n10.out → n129.formula2
n132.out → n133.assertion
n10.out → n135.a
n32.out → n135.b
n32.out → n136.a
n135.out → n136.b
n134.out → n133.atom1
n136.out → n133.formula1
n137.out → n133.atom2
n32.out → n133.formula2
n129.out → n127.a
n133.out → n127.b
n138.out → n139.assertion
n140.out → n139.atom1
n32.out → n139.formula1
n141.out → n139.atom2
n32.out → n139.formula2
n142.out → n139.atom3
n135.out → n139.formula3
n127.out → n126.a
n139.out → n126.b
n111.out → n110.a
n126.out → n110.b
n145.out → n146.assertion
n147.out → n146.atom1
n10.out → n146.formula1
n148.out → n146.atom2
n11.out → n146.formula2
n149.out → n146.atom3
n31.out → n146.formula3
n150.out → n151.assertion
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
n157.out → n158.assertion
n159.out → n158.atom1
n32.out → n158.formula1
n160.out → n158.atom2
n135.out → n158.formula2
n161.out → n158.atom3
n154.out → n158.formula3
n144.out → n143.a
n158.out → n143.b
n110.out → n109.a
n143.out → n109.b
n162.out → n163.assertion
n32.out → n165.a
n154.out → n165.b
n164.out → n163.atom1
n165.out → n163.formula1
n166.out → n163.atom2
n32.out → n163.formula2
n109.out → n108.a
n163.out → n108.b
n167.out → n168.assertion
n169.out → n168.atom1
n32.out → n168.formula1
n170.out → n168.atom2
n32.out → n168.formula2
n171.out → n168.atom3
n154.out → n168.formula3
n108.out → n107.a
n168.out → n107.b
n172.out → n173.assertion
n97.out → n175.a
n165.out → n175.b
n174.out → n173.atom1
n175.out → n173.formula1
n176.out → n173.atom2
n12.out → n173.formula2
n107.out → n106.a
n173.out → n106.b
n177.out → n178.assertion
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
n184.out → n185.assertion
n186.out → n185.atom1
n32.out → n185.formula1
n187.out → n185.atom2
n12.out → n185.formula2
n188.out → n185.atom3
n153.out → n185.formula3
n189.out → n190.assertion
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
n196.out → n197.assertion
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
n201.out → n202.assertion
n203.out → n202.atom1
n12.out → n202.formula1
n204.out → n202.atom2
n36.out → n202.formula2
n205.out → n202.atom3
n192.out → n202.formula3
n45.out → n44.a
n202.out → n44.b
n4.out → n3.a
n44.out → n3.b
n3.out → n2.assertion
n207.out → n208.assertion
n209.out → n208.atom1
n12.out → n208.formula1
n210.out → n208.atom2
n192.out → n208.formula2
n215.out → n216.assertion
n217.out → n216.atom1
n32.out → n216.formula1
n218.out → n216.atom2
n153.out → n216.formula2
n219.out → n220.assertion
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
n229.out → n230.assertion
n231.out → n230.atom1
n228.out → n230.formula1
n232.out → n230.atom2
n222.out → n230.formula2
n233.out → n230.atom3
n225.out → n230.formula3
n214.out → n213.a
n230.out → n213.b
n234.out → n235.assertion
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
n243.out → n244.assertion
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
- 参考解：105 个模块 / 153 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n106  [target]
n1  mp
n2  mp
n3  mp
n4  axiom A1
n5  subst
n6  atom P
n7  term y
n8  pred F
n9  term x
n10  pred G
n11  imp
n12  all(v=x)
n13  atom Q
n14  mp
n15  axiom A1
n16  subst
n17  atom P
n18  atom Q
n19  imp
n20  axiom A2
n21  subst
n22  atom P
n23  atom Q
n24  atom R
n25  mp
n26  mp
n27  axiom A1
n28  subst
n29  atom P
n30  atom Q
n31  axiom A1
n32  subst
n33  atom P
n34  imp
n35  imp
n36  atom Q
n37  axiom A2
n38  subst
n39  atom P
n40  atom Q
n41  atom R
n42  mp
n43  mp
n44  mp
n45  mp
n46  mp
n47  shift(v=x)
n48  mp
n49  mp
n50  axiom A1
n51  subst
n52  atom P
n53  all(v=x)
n54  atom Q
n55  axiom A1
n56  subst
n57  atom P
n58  imp
n59  imp
n60  atom Q
n61  axiom A2
n62  subst
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n69  axiom A5(v=x)
n70  subst
n71  atom P
n72  atom Q
n73  axiom A2
n74  subst
n75  atom P
n76  atom Q
n77  atom R
n78  all(v=x)
n79  axiom A1
n80  subst
n81  atom P
n82  imp
n83  imp
n84  atom Q
n85  axiom A2
n86  subst
n87  atom P
n88  atom Q
n89  atom R
n90  axiom A2
n91  subst
n92  atom P
n93  atom Q
n94  atom R
n95  axiom A1
n96  subst
n97  atom P
n98  imp
n99  imp
n100  atom Q
n101  axiom A2
n102  subst
n103  atom P
n104  atom Q
n105  atom R

接线：
n4.out → n5.assertion
n7.out → n8.t1
n9.out → n10.t1
n8.out → n11.a
n10.out → n11.b
n11.out → n12.a
n6.out → n5.atom1
n12.out → n5.formula1
n13.out → n5.atom2
n12.out → n5.formula2
n15.out → n16.assertion
n17.out → n16.atom1
n12.out → n16.formula1
n12.out → n19.a
n12.out → n19.b
n18.out → n16.atom2
n19.out → n16.formula2
n20.out → n21.assertion
n22.out → n21.atom1
n12.out → n21.formula1
n23.out → n21.atom2
n19.out → n21.formula2
n24.out → n21.atom3
n12.out → n21.formula3
n16.out → n14.a
n21.out → n14.b
n5.out → n3.a
n14.out → n3.b
n27.out → n28.assertion
n29.out → n28.atom1
n12.out → n28.formula1
n30.out → n28.atom2
n8.out → n28.formula2
n31.out → n32.assertion
n8.out → n34.a
n12.out → n34.b
n12.out → n35.a
n34.out → n35.b
n33.out → n32.atom1
n35.out → n32.formula1
n36.out → n32.atom2
n12.out → n32.formula2
n28.out → n26.a
n32.out → n26.b
n37.out → n38.assertion
n39.out → n38.atom1
n12.out → n38.formula1
n40.out → n38.atom2
n12.out → n38.formula2
n41.out → n38.atom3
n34.out → n38.formula3
n26.out → n25.a
n38.out → n25.b
n3.out → n2.a
n25.out → n2.b
n8.out → n47.formula
n50.out → n51.assertion
n8.out → n53.a
n52.out → n51.atom1
n53.out → n51.formula1
n54.out → n51.atom2
n12.out → n51.formula2
n55.out → n56.assertion
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
n61.out → n62.assertion
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
n73.out → n74.assertion
n75.out → n74.atom1
n12.out → n74.formula1
n76.out → n74.atom2
n53.out → n74.formula2
n10.out → n78.a
n77.out → n74.atom3
n78.out → n74.formula3
n70.out → n68.a
n74.out → n68.b
n79.out → n80.assertion
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
n85.out → n86.assertion
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
n90.out → n91.assertion
n92.out → n91.atom1
n8.out → n91.formula1
n93.out → n91.atom2
n12.out → n91.formula2
n94.out → n91.atom3
n78.out → n91.formula3
n45.out → n44.a
n91.out → n44.b
n95.out → n96.assertion
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
n101.out → n102.assertion
n103.out → n102.atom1
n12.out → n102.formula1
n104.out → n102.atom2
n34.out → n102.formula2
n105.out → n102.atom3
n98.out → n102.formula3
n43.out → n42.a
n102.out → n42.b
n2.out → n1.a
n42.out → n1.b
n1.out → n106.proof
```

</details>

### *45 · 全称三段论（H/F）

- 目标：`⊢ ( ∀ x ( F ( x ) → H ( x ) ) → ( ( G ( x ) → ∀ x F ( x ) ) → ( G ( x ) → ∀ x H ( x ) ) ) )`
- 提示：同 *32，换谓词。
- 参考解：52 个模块 / 76 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n53  [target]
n1  mp
n2  mp
n3  axiom A5(v=x)
n4  subst
n5  atom P
n6  term x
n7  pred F
n8  atom Q
n9  pred H
n10  mp
n11  mp
n12  axiom A1
n13  subst
n14  atom P
n15  all(v=x)
n16  all(v=x)
n17  imp
n18  atom Q
n19  pred G
n20  axiom A1
n21  subst
n22  atom P
n23  imp
n24  imp
n25  atom Q
n26  imp
n27  all(v=x)
n28  axiom A2
n29  subst
n30  atom P
n31  atom Q
n32  atom R
n33  mp
n34  mp
n35  axiom A2
n36  subst
n37  atom P
n38  atom Q
n39  atom R
n40  axiom A1
n41  subst
n42  atom P
n43  imp
n44  imp
n45  imp
n46  imp
n47  atom Q
n48  axiom A2
n49  subst
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
n20.out → n21.assertion
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
n35.out → n36.assertion
n37.out → n36.atom1
n19.out → n36.formula1
n38.out → n36.atom2
n15.out → n36.formula2
n39.out → n36.atom3
n16.out → n36.formula3
n40.out → n41.assertion
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
n48.out → n49.assertion
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
- 参考解：246 个模块 / 368 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n247  [target]
n1  mp
n2  mp
n3  mp
n4  mp
n5  mp
n6  axiom A1
n7  subst
n8  atom P
n9  term x
n10  pred G
n11  all(v=x)
n12  all(v=x)
n13  imp
n14  atom Q
n15  mp
n16  axiom A1
n17  subst
n18  atom P
n19  atom Q
n20  imp
n21  axiom A2
n22  subst
n23  atom P
n24  atom Q
n25  atom R
n26  mp
n27  mp
n28  axiom A1
n29  subst
n30  atom P
n31  atom Q
n32  pred F
n33  all(v=x)
n34  imp
n35  axiom A1
n36  subst
n37  atom P
n38  imp
n39  imp
n40  atom Q
n41  axiom A2
n42  subst
n43  atom P
n44  atom Q
n45  atom R
n46  mp
n47  mp
n48  mp
n49  mp
n50  mp
n51  mp
n52  mp
n53  axiom A1
n54  subst
n55  atom P
n56  atom Q
n57  mp
n58  axiom A1
n59  subst
n60  atom P
n61  atom Q
n62  imp
n63  axiom A2
n64  subst
n65  atom P
n66  atom Q
n67  atom R
n68  axiom A1
n69  subst
n70  atom P
n71  atom Q
n72  mp
n73  mp
n74  axiom A1
n75  subst
n76  atom P
n77  atom Q
n78  axiom A1
n79  subst
n80  atom P
n81  imp
n82  imp
n83  atom Q
n84  axiom A2
n85  subst
n86  atom P
n87  atom Q
n88  atom R
n89  mp
n90  mp
n91  axiom A2
n92  subst
n93  atom P
n94  atom Q
n95  atom R
n96  axiom A1
n97  subst
n98  atom P
n99  imp
n100  imp
n101  atom Q
n102  axiom A2
n103  subst
n104  atom P
n105  atom Q
n106  atom R
n107  mp
n108  mp
n109  mp
n110  mp
n111  mp
n112  mp
n113  mp
n114  axiom A1
n115  subst
n116  atom P
n117  atom Q
n118  mp
n119  axiom A1
n120  subst
n121  atom P
n122  atom Q
n123  axiom A2
n124  subst
n125  atom P
n126  atom Q
n127  atom R
n128  mp
n129  mp
n130  axiom A1
n131  subst
n132  atom P
n133  atom Q
n134  axiom A1
n135  subst
n136  atom P
n137  imp
n138  imp
n139  atom Q
n140  axiom A2
n141  subst
n142  atom P
n143  atom Q
n144  atom R
n145  mp
n146  mp
n147  axiom A2
n148  subst
n149  atom P
n150  atom Q
n151  atom R
n152  axiom A1
n153  subst
n154  atom P
n155  imp
n156  imp
n157  imp
n158  atom Q
n159  axiom A2
n160  subst
n161  atom P
n162  atom Q
n163  atom R
n164  axiom A1
n165  subst
n166  atom P
n167  imp
n168  atom Q
n169  axiom A2
n170  subst
n171  atom P
n172  atom Q
n173  atom R
n174  axiom A1
n175  subst
n176  atom P
n177  imp
n178  atom Q
n179  axiom A2
n180  subst
n181  atom P
n182  atom Q
n183  atom R
n184  mp
n185  mp
n186  axiom A2
n187  subst
n188  atom P
n189  atom Q
n190  atom R
n191  axiom A1
n192  subst
n193  atom P
n194  imp
n195  imp
n196  imp
n197  atom Q
n198  axiom A2
n199  subst
n200  atom P
n201  atom Q
n202  atom R
n203  axiom A2
n204  subst
n205  atom P
n206  atom Q
n207  atom R
n208  mp
n209  mp
n210  axiom A1
n211  subst
n212  atom P
n213  atom Q
n214  imp
n215  all(v=x)
n216  axiom A1
n217  subst
n218  atom P
n219  imp
n220  imp
n221  atom Q
n222  axiom A2
n223  subst
n224  atom P
n225  atom Q
n226  atom R
n227  mp
n228  mp
n229  axiom A2
n230  subst
n231  atom P
n232  atom Q
n233  atom R
n234  axiom A1
n235  subst
n236  atom P
n237  imp
n238  imp
n239  imp
n240  imp
n241  atom Q
n242  axiom A2
n243  subst
n244  atom P
n245  atom Q
n246  atom R

接线：
n6.out → n7.assertion
n9.out → n10.t1
n10.out → n11.a
n11.out → n12.a
n11.out → n13.a
n12.out → n13.b
n8.out → n7.atom1
n13.out → n7.formula1
n14.out → n7.atom2
n13.out → n7.formula2
n16.out → n17.assertion
n18.out → n17.atom1
n13.out → n17.formula1
n13.out → n20.a
n13.out → n20.b
n19.out → n17.atom2
n20.out → n17.formula2
n21.out → n22.assertion
n23.out → n22.atom1
n13.out → n22.formula1
n24.out → n22.atom2
n20.out → n22.formula2
n25.out → n22.atom3
n13.out → n22.formula3
n17.out → n15.a
n22.out → n15.b
n7.out → n5.a
n15.out → n5.b
n28.out → n29.assertion
n30.out → n29.atom1
n13.out → n29.formula1
n9.out → n32.t1
n32.out → n33.a
n12.out → n34.a
n33.out → n34.b
n31.out → n29.atom2
n34.out → n29.formula2
n35.out → n36.assertion
n34.out → n38.a
n13.out → n38.b
n13.out → n39.a
n38.out → n39.b
n37.out → n36.atom1
n39.out → n36.formula1
n40.out → n36.atom2
n13.out → n36.formula2
n29.out → n27.a
n36.out → n27.b
n41.out → n42.assertion
n43.out → n42.atom1
n13.out → n42.formula1
n44.out → n42.atom2
n13.out → n42.formula2
n45.out → n42.atom3
n38.out → n42.formula3
n27.out → n26.a
n42.out → n26.b
n5.out → n4.a
n26.out → n4.b
n53.out → n54.assertion
n55.out → n54.atom1
n33.out → n54.formula1
n56.out → n54.atom2
n33.out → n54.formula2
n58.out → n59.assertion
n60.out → n59.atom1
n33.out → n59.formula1
n33.out → n62.a
n33.out → n62.b
n61.out → n59.atom2
n62.out → n59.formula2
n63.out → n64.assertion
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
n68.out → n69.assertion
n70.out → n69.atom1
n62.out → n69.formula1
n71.out → n69.atom2
n13.out → n69.formula2
n52.out → n51.a
n69.out → n51.b
n74.out → n75.assertion
n76.out → n75.atom1
n62.out → n75.formula1
n77.out → n75.atom2
n12.out → n75.formula2
n78.out → n79.assertion
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
n84.out → n85.assertion
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
n91.out → n92.assertion
n93.out → n92.atom1
n12.out → n92.formula1
n94.out → n92.atom2
n33.out → n92.formula2
n95.out → n92.atom3
n33.out → n92.formula3
n96.out → n97.assertion
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
n102.out → n103.assertion
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
n114.out → n115.assertion
n116.out → n115.atom1
n34.out → n115.formula1
n117.out → n115.atom2
n34.out → n115.formula2
n119.out → n120.assertion
n121.out → n120.atom1
n34.out → n120.formula1
n122.out → n120.atom2
n99.out → n120.formula2
n123.out → n124.assertion
n125.out → n124.atom1
n34.out → n124.formula1
n126.out → n124.atom2
n99.out → n124.formula2
n127.out → n124.atom3
n34.out → n124.formula3
n120.out → n118.a
n124.out → n118.b
n115.out → n113.a
n118.out → n113.b
n130.out → n131.assertion
n132.out → n131.atom1
n34.out → n131.formula1
n133.out → n131.atom2
n11.out → n131.formula2
n134.out → n135.assertion
n11.out → n137.a
n34.out → n137.b
n34.out → n138.a
n137.out → n138.b
n136.out → n135.atom1
n138.out → n135.formula1
n139.out → n135.atom2
n34.out → n135.formula2
n131.out → n129.a
n135.out → n129.b
n140.out → n141.assertion
n142.out → n141.atom1
n34.out → n141.formula1
n143.out → n141.atom2
n34.out → n141.formula2
n144.out → n141.atom3
n137.out → n141.formula3
n129.out → n128.a
n141.out → n128.b
n113.out → n112.a
n128.out → n112.b
n147.out → n148.assertion
n149.out → n148.atom1
n11.out → n148.formula1
n150.out → n148.atom2
n12.out → n148.formula2
n151.out → n148.atom3
n33.out → n148.formula3
n152.out → n153.assertion
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
n159.out → n160.assertion
n161.out → n160.atom1
n34.out → n160.formula1
n162.out → n160.atom2
n137.out → n160.formula2
n163.out → n160.atom3
n156.out → n160.formula3
n146.out → n145.a
n160.out → n145.b
n112.out → n111.a
n145.out → n111.b
n164.out → n165.assertion
n34.out → n167.a
n156.out → n167.b
n166.out → n165.atom1
n167.out → n165.formula1
n168.out → n165.atom2
n34.out → n165.formula2
n111.out → n110.a
n165.out → n110.b
n169.out → n170.assertion
n171.out → n170.atom1
n34.out → n170.formula1
n172.out → n170.atom2
n34.out → n170.formula2
n173.out → n170.atom3
n156.out → n170.formula3
n110.out → n109.a
n170.out → n109.b
n174.out → n175.assertion
n99.out → n177.a
n167.out → n177.b
n176.out → n175.atom1
n177.out → n175.formula1
n178.out → n175.atom2
n13.out → n175.formula2
n109.out → n108.a
n175.out → n108.b
n179.out → n180.assertion
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
n186.out → n187.assertion
n188.out → n187.atom1
n34.out → n187.formula1
n189.out → n187.atom2
n13.out → n187.formula2
n190.out → n187.atom3
n155.out → n187.formula3
n191.out → n192.assertion
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
n198.out → n199.assertion
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
n203.out → n204.assertion
n205.out → n204.atom1
n13.out → n204.formula1
n206.out → n204.atom2
n38.out → n204.formula2
n207.out → n204.atom3
n194.out → n204.formula3
n47.out → n46.a
n204.out → n46.b
n4.out → n3.a
n46.out → n3.b
n210.out → n211.assertion
n212.out → n211.atom1
n194.out → n211.formula1
n11.out → n214.a
n32.out → n214.b
n214.out → n215.a
n213.out → n211.atom2
n215.out → n211.formula2
n216.out → n217.assertion
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
n222.out → n223.assertion
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
n229.out → n230.assertion
n231.out → n230.atom1
n215.out → n230.formula1
n232.out → n230.atom2
n34.out → n230.formula2
n233.out → n230.atom3
n155.out → n230.formula3
n234.out → n235.assertion
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
n242.out → n243.assertion
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
- 参考解：127 个模块 / 187 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n128  [target]
n1  mp
n2  mp
n3  mp
n4  axiom A1
n5  subst
n6  atom P
n7  term x
n8  pred G
n9  pred F
n10  imp
n11  atom Q
n12  mp
n13  axiom A1
n14  subst
n15  atom P
n16  atom Q
n17  imp
n18  axiom A2
n19  subst
n20  atom P
n21  atom Q
n22  atom R
n23  mp
n24  mp
n25  axiom A1
n26  subst
n27  atom P
n28  atom Q
n29  all(v=x)
n30  axiom A1
n31  subst
n32  atom P
n33  imp
n34  imp
n35  atom Q
n36  axiom A2
n37  subst
n38  atom P
n39  atom Q
n40  atom R
n41  mp
n42  mp
n43  mp
n44  mp
n45  mp
n46  axiom A4(v=x)
n47  subst
n48  atom P
n49  mp
n50  mp
n51  axiom A1
n52  subst
n53  atom P
n54  atom Q
n55  axiom A1
n56  subst
n57  atom P
n58  imp
n59  imp
n60  atom Q
n61  axiom A2
n62  subst
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n69  mp
n70  mp
n71  mp
n72  axiom A1
n73  subst
n74  atom P
n75  atom Q
n76  mp
n77  axiom A1
n78  subst
n79  atom P
n80  atom Q
n81  imp
n82  axiom A2
n83  subst
n84  atom P
n85  atom Q
n86  atom R
n87  axiom A1
n88  subst
n89  atom P
n90  atom Q
n91  axiom A2
n92  subst
n93  atom P
n94  atom Q
n95  atom R
n96  axiom A2
n97  subst
n98  atom P
n99  atom Q
n100  atom R
n101  axiom A1
n102  subst
n103  atom P
n104  imp
n105  imp
n106  atom Q
n107  axiom A2
n108  subst
n109  atom P
n110  atom Q
n111  atom R
n112  axiom A2
n113  subst
n114  atom P
n115  atom Q
n116  atom R
n117  axiom A1
n118  subst
n119  atom P
n120  imp
n121  imp
n122  atom Q
n123  axiom A2
n124  subst
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
n13.out → n14.assertion
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
n25.out → n26.assertion
n27.out → n26.atom1
n10.out → n26.formula1
n8.out → n29.a
n28.out → n26.atom2
n29.out → n26.formula2
n30.out → n31.assertion
n29.out → n33.a
n10.out → n33.b
n10.out → n34.a
n33.out → n34.b
n32.out → n31.atom1
n34.out → n31.formula1
n35.out → n31.atom2
n10.out → n31.formula2
n26.out → n24.a
n31.out → n24.b
n36.out → n37.assertion
n38.out → n37.atom1
n10.out → n37.formula1
n39.out → n37.atom2
n10.out → n37.formula2
n40.out → n37.atom3
n33.out → n37.formula3
n24.out → n23.a
n37.out → n23.b
n3.out → n2.a
n23.out → n2.b
n46.out → n47.assertion
n48.out → n47.atom1
n8.out → n47.formula1
n51.out → n52.assertion
n53.out → n52.atom1
n8.out → n52.formula1
n54.out → n52.atom2
n10.out → n52.formula2
n55.out → n56.assertion
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
n61.out → n62.assertion
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
n72.out → n73.assertion
n74.out → n73.atom1
n9.out → n73.formula1
n75.out → n73.atom2
n9.out → n73.formula2
n77.out → n78.assertion
n79.out → n78.atom1
n9.out → n78.formula1
n9.out → n81.a
n9.out → n81.b
n80.out → n78.atom2
n81.out → n78.formula2
n82.out → n83.assertion
n84.out → n83.atom1
n9.out → n83.formula1
n85.out → n83.atom2
n81.out → n83.formula2
n86.out → n83.atom3
n9.out → n83.formula3
n78.out → n76.a
n83.out → n76.b
n73.out → n71.a
n76.out → n71.b
n87.out → n88.assertion
n89.out → n88.atom1
n81.out → n88.formula1
n90.out → n88.atom2
n8.out → n88.formula2
n71.out → n70.a
n88.out → n70.b
n91.out → n92.assertion
n93.out → n92.atom1
n8.out → n92.formula1
n94.out → n92.atom2
n9.out → n92.formula2
n95.out → n92.atom3
n9.out → n92.formula3
n70.out → n69.a
n92.out → n69.b
n96.out → n97.assertion
n98.out → n97.atom1
n10.out → n97.formula1
n99.out → n97.atom2
n8.out → n97.formula2
n100.out → n97.atom3
n9.out → n97.formula3
n69.out → n68.a
n97.out → n68.b
n101.out → n102.assertion
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
n107.out → n108.assertion
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
n112.out → n113.assertion
n114.out → n113.atom1
n29.out → n113.formula1
n115.out → n113.atom2
n10.out → n113.formula2
n116.out → n113.atom3
n9.out → n113.formula3
n44.out → n43.a
n113.out → n43.b
n117.out → n118.assertion
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
n123.out → n124.assertion
n125.out → n124.atom1
n10.out → n124.formula1
n126.out → n124.atom2
n33.out → n124.formula2
n127.out → n124.atom3
n120.out → n124.formula3
n42.out → n41.a
n124.out → n41.b
n2.out → n1.a
n41.out → n1.b
n1.out → n128.proof
```

</details>

### *48 · 辖域移动（F/G 变体）

- 目标：`⊢ ( ∀ x ( F ( z ) → G ( y ) ) → ( F ( z ) → ∀ x G ( y ) ) )`
- 提示：同 *39，换变元位置。
- 参考解：105 个模块 / 153 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n106  [target]
n1  mp
n2  mp
n3  mp
n4  axiom A1
n5  subst
n6  atom P
n7  term z
n8  pred F
n9  term y
n10  pred G
n11  imp
n12  all(v=x)
n13  atom Q
n14  mp
n15  axiom A1
n16  subst
n17  atom P
n18  atom Q
n19  imp
n20  axiom A2
n21  subst
n22  atom P
n23  atom Q
n24  atom R
n25  mp
n26  mp
n27  axiom A1
n28  subst
n29  atom P
n30  atom Q
n31  axiom A1
n32  subst
n33  atom P
n34  imp
n35  imp
n36  atom Q
n37  axiom A2
n38  subst
n39  atom P
n40  atom Q
n41  atom R
n42  mp
n43  mp
n44  mp
n45  mp
n46  mp
n47  shift(v=x)
n48  mp
n49  mp
n50  axiom A1
n51  subst
n52  atom P
n53  all(v=x)
n54  atom Q
n55  axiom A1
n56  subst
n57  atom P
n58  imp
n59  imp
n60  atom Q
n61  axiom A2
n62  subst
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n69  axiom A5(v=x)
n70  subst
n71  atom P
n72  atom Q
n73  axiom A2
n74  subst
n75  atom P
n76  atom Q
n77  atom R
n78  all(v=x)
n79  axiom A1
n80  subst
n81  atom P
n82  imp
n83  imp
n84  atom Q
n85  axiom A2
n86  subst
n87  atom P
n88  atom Q
n89  atom R
n90  axiom A2
n91  subst
n92  atom P
n93  atom Q
n94  atom R
n95  axiom A1
n96  subst
n97  atom P
n98  imp
n99  imp
n100  atom Q
n101  axiom A2
n102  subst
n103  atom P
n104  atom Q
n105  atom R

接线：
n4.out → n5.assertion
n7.out → n8.t1
n9.out → n10.t1
n8.out → n11.a
n10.out → n11.b
n11.out → n12.a
n6.out → n5.atom1
n12.out → n5.formula1
n13.out → n5.atom2
n12.out → n5.formula2
n15.out → n16.assertion
n17.out → n16.atom1
n12.out → n16.formula1
n12.out → n19.a
n12.out → n19.b
n18.out → n16.atom2
n19.out → n16.formula2
n20.out → n21.assertion
n22.out → n21.atom1
n12.out → n21.formula1
n23.out → n21.atom2
n19.out → n21.formula2
n24.out → n21.atom3
n12.out → n21.formula3
n16.out → n14.a
n21.out → n14.b
n5.out → n3.a
n14.out → n3.b
n27.out → n28.assertion
n29.out → n28.atom1
n12.out → n28.formula1
n30.out → n28.atom2
n8.out → n28.formula2
n31.out → n32.assertion
n8.out → n34.a
n12.out → n34.b
n12.out → n35.a
n34.out → n35.b
n33.out → n32.atom1
n35.out → n32.formula1
n36.out → n32.atom2
n12.out → n32.formula2
n28.out → n26.a
n32.out → n26.b
n37.out → n38.assertion
n39.out → n38.atom1
n12.out → n38.formula1
n40.out → n38.atom2
n12.out → n38.formula2
n41.out → n38.atom3
n34.out → n38.formula3
n26.out → n25.a
n38.out → n25.b
n3.out → n2.a
n25.out → n2.b
n8.out → n47.formula
n50.out → n51.assertion
n8.out → n53.a
n52.out → n51.atom1
n53.out → n51.formula1
n54.out → n51.atom2
n12.out → n51.formula2
n55.out → n56.assertion
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
n61.out → n62.assertion
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
n73.out → n74.assertion
n75.out → n74.atom1
n12.out → n74.formula1
n76.out → n74.atom2
n53.out → n74.formula2
n10.out → n78.a
n77.out → n74.atom3
n78.out → n74.formula3
n70.out → n68.a
n74.out → n68.b
n79.out → n80.assertion
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
n85.out → n86.assertion
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
n90.out → n91.assertion
n92.out → n91.atom1
n8.out → n91.formula1
n93.out → n91.atom2
n12.out → n91.formula2
n94.out → n91.atom3
n78.out → n91.formula3
n45.out → n44.a
n91.out → n44.b
n95.out → n96.assertion
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
n101.out → n102.assertion
n103.out → n102.atom1
n12.out → n102.formula1
n104.out → n102.atom2
n34.out → n102.formula2
n105.out → n102.atom3
n98.out → n102.formula3
n43.out → n42.a
n102.out → n42.b
n2.out → n1.a
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
n9  subst
n10  定理 *08
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
n10.out → n9.assertion
n5.out → n12.t1
n6.out → n12.t2
n11.out → n9.atom1
n12.out → n9.formula1
n5.out → n14.t1
n5.out → n14.t2
n13.out → n9.atom2
n14.out → n9.formula2
n6.out → n16.t1
n5.out → n16.t2
n15.out → n9.atom3
n16.out → n9.formula3
n4.out → n3.a
n9.out → n3.b
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
n7  subst
n8  定理 *08
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
n8.out → n7.assertion
n3.out → n10.t1
n4.out → n10.t2
n9.out → n7.atom1
n10.out → n7.formula1
n5.out → n12.t1
n3.out → n12.t2
n11.out → n7.atom2
n12.out → n7.formula2
n13.out → n7.atom3
n6.out → n7.formula3
n2.out → n1.a
n7.out → n1.b
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
n9  subst
n10  定理 *05
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
n10.out → n9.assertion
n4.out → n12.t1
n3.out → n12.t2
n11.out → n9.atom1
n12.out → n9.formula1
n3.out → n14.t1
n4.out → n14.t2
n13.out → n9.atom2
n14.out → n9.formula2
n3.out → n16.t1
n4.out → n17.t1
n16.out → n18.a
n17.out → n18.b
n15.out → n9.atom3
n18.out → n9.formula3
n8.out → n7.a
n9.out → n7.b
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
- 参考解：49 个模块 / 70 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n50  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  mp
n4  mp
n5  subst
n6  定理 *01
n7  atom P
n8  term x
n9  term y
n10  pred =
n11  mp
n12  mp
n13  定理 *51
n14  subst
n15  axiom A1
n16  atom P
n17  pred =
n18  imp
n19  atom Q
n20  subst
n21  axiom A2
n22  atom P
n23  atom Q
n24  atom R
n25  mp
n26  mp
n27  subst
n28  定理 *01
n29  atom P
n30  mp
n31  mp
n32  and-intro-ax
n33  subst
n34  axiom A1
n35  atom P
n36  and
n37  imp
n38  imp
n39  atom Q
n40  subst
n41  axiom A2
n42  atom P
n43  atom Q
n44  atom R
n45  subst
n46  axiom A2
n47  atom P
n48  atom Q
n49  atom R

接线：
n6.out → n5.assertion
n8.out → n10.t1
n9.out → n10.t2
n7.out → n5.atom1
n10.out → n5.formula1
n15.out → n14.assertion
n9.out → n17.t1
n8.out → n17.t2
n10.out → n18.a
n17.out → n18.b
n16.out → n14.atom1
n18.out → n14.formula1
n19.out → n14.atom2
n10.out → n14.formula2
n13.out → n12.a
n14.out → n12.b
n21.out → n20.assertion
n22.out → n20.atom1
n10.out → n20.formula1
n23.out → n20.atom2
n10.out → n20.formula2
n24.out → n20.atom3
n17.out → n20.formula3
n12.out → n11.a
n20.out → n11.b
n5.out → n4.a
n11.out → n4.b
n28.out → n27.assertion
n29.out → n27.atom1
n10.out → n27.formula1
n10.out → n32.a
n17.out → n32.b
n34.out → n33.assertion
n10.out → n36.a
n17.out → n36.b
n17.out → n37.a
n36.out → n37.b
n10.out → n38.a
n37.out → n38.b
n35.out → n33.atom1
n38.out → n33.formula1
n39.out → n33.atom2
n10.out → n33.formula2
n32.out → n31.a
n33.out → n31.b
n41.out → n40.assertion
n42.out → n40.atom1
n10.out → n40.formula1
n43.out → n40.atom2
n10.out → n40.formula2
n44.out → n40.atom3
n37.out → n40.formula3
n31.out → n30.a
n40.out → n30.b
n27.out → n26.a
n30.out → n26.b
n46.out → n45.assertion
n47.out → n45.atom1
n10.out → n45.formula1
n48.out → n45.atom2
n17.out → n45.formula2
n49.out → n45.atom3
n36.out → n45.formula3
n26.out → n25.a
n45.out → n25.b
n4.out → n3.a
n25.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n50.proof
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
n2  subst
n3  定理 *09
n4  atom P
n5  term y
n6  pred F
n7  atom Q
n8  term x
n9  pred F
n10  mp
n11  定理 *54
n12  subst
n13  定理 *05
n14  atom P
n15  pred =
n16  atom Q
n17  imp
n18  atom R
n19  not
n20  not
n21  imp

接线：
n3.out → n2.assertion
n5.out → n6.t1
n4.out → n2.atom1
n6.out → n2.formula1
n8.out → n9.t1
n7.out → n2.atom2
n9.out → n2.formula2
n13.out → n12.assertion
n8.out → n15.t1
n5.out → n15.t2
n14.out → n12.atom1
n15.out → n12.formula1
n6.out → n17.a
n9.out → n17.b
n16.out → n12.atom2
n17.out → n12.formula2
n9.out → n19.a
n6.out → n20.a
n19.out → n21.a
n20.out → n21.b
n18.out → n12.atom3
n21.out → n12.formula3
n11.out → n10.a
n12.out → n10.b
n2.out → n1.a
n10.out → n1.b
n1.out → n22.proof
```

</details>

### *59 · 条件替换

- 目标：`⊢ ( x = y → ( ( x = x → F ( x ) ) → ( y = y → F ( y ) ) ) )`
- 提示：假设 x=y 与 x=x→F(x)：由等词自反得 x=x，配合 *53 得 F(y)，再用 A1 补出 y=y→F(y)；两次 DT。
- 参考解：225 个模块 / 336 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n226  [target]
n1  mp
n2  mp
n3  mp
n4  mp
n5  mp
n6  eq-refl(t=x)
n7  subst
n8  axiom A1
n9  atom P
n10  term x
n11  pred =
n12  atom Q
n13  term y
n14  pred =
n15  mp
n16  mp
n17  subst
n18  axiom A1
n19  atom P
n20  atom Q
n21  pred F
n22  imp
n23  subst
n24  axiom A1
n25  atom P
n26  imp
n27  imp
n28  atom Q
n29  subst
n30  axiom A2
n31  atom P
n32  atom Q
n33  atom R
n34  mp
n35  mp
n36  mp
n37  subst
n38  定理 *01
n39  atom P
n40  subst
n41  axiom A1
n42  atom P
n43  imp
n44  atom Q
n45  mp
n46  mp
n47  subst
n48  axiom A2
n49  atom P
n50  atom Q
n51  atom R
n52  subst
n53  axiom A1
n54  atom P
n55  imp
n56  imp
n57  imp
n58  atom Q
n59  subst
n60  axiom A2
n61  atom P
n62  atom Q
n63  atom R
n64  subst
n65  axiom A2
n66  atom P
n67  atom Q
n68  atom R
n69  mp
n70  mp
n71  mp
n72  mp
n73  subst
n74  定理 *01
n75  atom P
n76  mp
n77  mp
n78  subst
n79  axiom A1
n80  atom P
n81  atom Q
n82  subst
n83  axiom A1
n84  atom P
n85  imp
n86  imp
n87  atom Q
n88  subst
n89  axiom A2
n90  atom P
n91  atom Q
n92  atom R
n93  mp
n94  mp
n95  mp
n96  mp
n97  定理 *53
n98  subst
n99  axiom A1
n100  atom P
n101  pred F
n102  imp
n103  imp
n104  atom Q
n105  mp
n106  mp
n107  subst
n108  axiom A1
n109  atom P
n110  atom Q
n111  subst
n112  axiom A1
n113  atom P
n114  imp
n115  imp
n116  atom Q
n117  subst
n118  axiom A2
n119  atom P
n120  atom Q
n121  atom R
n122  mp
n123  mp
n124  subst
n125  axiom A2
n126  atom P
n127  atom Q
n128  atom R
n129  subst
n130  axiom A1
n131  atom P
n132  imp
n133  imp
n134  imp
n135  atom Q
n136  subst
n137  axiom A2
n138  atom P
n139  atom Q
n140  atom R
n141  subst
n142  axiom A2
n143  atom P
n144  atom Q
n145  atom R
n146  mp
n147  mp
n148  subst
n149  axiom A2
n150  atom P
n151  atom Q
n152  atom R
n153  subst
n154  axiom A1
n155  atom P
n156  imp
n157  imp
n158  imp
n159  atom Q
n160  subst
n161  axiom A2
n162  atom P
n163  atom Q
n164  atom R
n165  subst
n166  axiom A2
n167  atom P
n168  atom Q
n169  atom R
n170  mp
n171  mp
n172  mp
n173  mp
n174  subst
n175  axiom A1
n176  atom P
n177  atom Q
n178  pred =
n179  subst
n180  axiom A1
n181  atom P
n182  imp
n183  imp
n184  atom Q
n185  mp
n186  mp
n187  subst
n188  axiom A1
n189  atom P
n190  atom Q
n191  subst
n192  axiom A1
n193  atom P
n194  imp
n195  imp
n196  atom Q
n197  subst
n198  axiom A2
n199  atom P
n200  atom Q
n201  atom R
n202  mp
n203  mp
n204  subst
n205  axiom A2
n206  atom P
n207  atom Q
n208  atom R
n209  subst
n210  axiom A1
n211  atom P
n212  imp
n213  imp
n214  imp
n215  atom Q
n216  subst
n217  axiom A2
n218  atom P
n219  atom Q
n220  atom R
n221  subst
n222  axiom A2
n223  atom P
n224  atom Q
n225  atom R

接线：
n8.out → n7.assertion
n10.out → n11.t1
n10.out → n11.t2
n9.out → n7.atom1
n11.out → n7.formula1
n10.out → n14.t1
n13.out → n14.t2
n12.out → n7.atom2
n14.out → n7.formula2
n6.out → n5.a
n7.out → n5.b
n18.out → n17.assertion
n19.out → n17.atom1
n11.out → n17.formula1
n10.out → n21.t1
n11.out → n22.a
n21.out → n22.b
n20.out → n17.atom2
n22.out → n17.formula2
n24.out → n23.assertion
n22.out → n26.a
n11.out → n26.b
n11.out → n27.a
n26.out → n27.b
n25.out → n23.atom1
n27.out → n23.formula1
n28.out → n23.atom2
n14.out → n23.formula2
n17.out → n16.a
n23.out → n16.b
n30.out → n29.assertion
n31.out → n29.atom1
n14.out → n29.formula1
n32.out → n29.atom2
n11.out → n29.formula2
n33.out → n29.atom3
n26.out → n29.formula3
n16.out → n15.a
n29.out → n15.b
n5.out → n4.a
n15.out → n4.b
n38.out → n37.assertion
n39.out → n37.atom1
n22.out → n37.formula1
n41.out → n40.assertion
n22.out → n43.a
n22.out → n43.b
n42.out → n40.atom1
n43.out → n40.formula1
n44.out → n40.atom2
n14.out → n40.formula2
n37.out → n36.a
n40.out → n36.b
n48.out → n47.assertion
n49.out → n47.atom1
n22.out → n47.formula1
n50.out → n47.atom2
n11.out → n47.formula2
n51.out → n47.atom3
n21.out → n47.formula3
n53.out → n52.assertion
n22.out → n55.a
n21.out → n55.b
n26.out → n56.a
n55.out → n56.b
n43.out → n57.a
n56.out → n57.b
n54.out → n52.atom1
n57.out → n52.formula1
n58.out → n52.atom2
n14.out → n52.formula2
n47.out → n46.a
n52.out → n46.b
n60.out → n59.assertion
n61.out → n59.atom1
n14.out → n59.formula1
n62.out → n59.atom2
n43.out → n59.formula2
n63.out → n59.atom3
n56.out → n59.formula3
n46.out → n45.a
n59.out → n45.b
n36.out → n35.a
n45.out → n35.b
n65.out → n64.assertion
n66.out → n64.atom1
n14.out → n64.formula1
n67.out → n64.atom2
n26.out → n64.formula2
n68.out → n64.atom3
n55.out → n64.formula3
n35.out → n34.a
n64.out → n34.b
n4.out → n3.a
n34.out → n3.b
n74.out → n73.assertion
n75.out → n73.atom1
n14.out → n73.formula1
n79.out → n78.assertion
n80.out → n78.atom1
n14.out → n78.formula1
n81.out → n78.atom2
n22.out → n78.formula2
n83.out → n82.assertion
n22.out → n85.a
n14.out → n85.b
n14.out → n86.a
n85.out → n86.b
n84.out → n82.atom1
n86.out → n82.formula1
n87.out → n82.atom2
n14.out → n82.formula2
n78.out → n77.a
n82.out → n77.b
n89.out → n88.assertion
n90.out → n88.atom1
n14.out → n88.formula1
n91.out → n88.atom2
n14.out → n88.formula2
n92.out → n88.atom3
n85.out → n88.formula3
n77.out → n76.a
n88.out → n76.b
n73.out → n72.a
n76.out → n72.b
n99.out → n98.assertion
n13.out → n101.t1
n21.out → n102.a
n101.out → n102.b
n14.out → n103.a
n102.out → n103.b
n100.out → n98.atom1
n103.out → n98.formula1
n104.out → n98.atom2
n14.out → n98.formula2
n97.out → n96.a
n98.out → n96.b
n108.out → n107.assertion
n109.out → n107.atom1
n103.out → n107.formula1
n110.out → n107.atom2
n22.out → n107.formula2
n112.out → n111.assertion
n22.out → n114.a
n103.out → n114.b
n103.out → n115.a
n114.out → n115.b
n113.out → n111.atom1
n115.out → n111.formula1
n116.out → n111.atom2
n14.out → n111.formula2
n107.out → n106.a
n111.out → n106.b
n118.out → n117.assertion
n119.out → n117.atom1
n14.out → n117.formula1
n120.out → n117.atom2
n103.out → n117.formula2
n121.out → n117.atom3
n114.out → n117.formula3
n106.out → n105.a
n117.out → n105.b
n96.out → n95.a
n105.out → n95.b
n125.out → n124.assertion
n126.out → n124.atom1
n22.out → n124.formula1
n127.out → n124.atom2
n14.out → n124.formula2
n128.out → n124.atom3
n102.out → n124.formula3
n130.out → n129.assertion
n22.out → n132.a
n102.out → n132.b
n85.out → n133.a
n132.out → n133.b
n114.out → n134.a
n133.out → n134.b
n131.out → n129.atom1
n134.out → n129.formula1
n135.out → n129.atom2
n14.out → n129.formula2
n124.out → n123.a
n129.out → n123.b
n137.out → n136.assertion
n138.out → n136.atom1
n14.out → n136.formula1
n139.out → n136.atom2
n114.out → n136.formula2
n140.out → n136.atom3
n133.out → n136.formula3
n123.out → n122.a
n136.out → n122.b
n95.out → n94.a
n122.out → n94.b
n142.out → n141.assertion
n143.out → n141.atom1
n14.out → n141.formula1
n144.out → n141.atom2
n85.out → n141.formula2
n145.out → n141.atom3
n132.out → n141.formula3
n94.out → n93.a
n141.out → n93.b
n72.out → n71.a
n93.out → n71.b
n149.out → n148.assertion
n150.out → n148.atom1
n22.out → n148.formula1
n151.out → n148.atom2
n21.out → n148.formula2
n152.out → n148.atom3
n101.out → n148.formula3
n154.out → n153.assertion
n22.out → n156.a
n101.out → n156.b
n55.out → n157.a
n156.out → n157.b
n132.out → n158.a
n157.out → n158.b
n155.out → n153.atom1
n158.out → n153.formula1
n159.out → n153.atom2
n14.out → n153.formula2
n148.out → n147.a
n153.out → n147.b
n161.out → n160.assertion
n162.out → n160.atom1
n14.out → n160.formula1
n163.out → n160.atom2
n132.out → n160.formula2
n164.out → n160.atom3
n157.out → n160.formula3
n147.out → n146.a
n160.out → n146.b
n71.out → n70.a
n146.out → n70.b
n166.out → n165.assertion
n167.out → n165.atom1
n14.out → n165.formula1
n168.out → n165.atom2
n55.out → n165.formula2
n169.out → n165.atom3
n156.out → n165.formula3
n70.out → n69.a
n165.out → n69.b
n3.out → n2.a
n69.out → n2.b
n175.out → n174.assertion
n176.out → n174.atom1
n101.out → n174.formula1
n13.out → n178.t1
n13.out → n178.t2
n177.out → n174.atom2
n178.out → n174.formula2
n180.out → n179.assertion
n178.out → n182.a
n101.out → n182.b
n101.out → n183.a
n182.out → n183.b
n181.out → n179.atom1
n183.out → n179.formula1
n184.out → n179.atom2
n14.out → n179.formula2
n174.out → n173.a
n179.out → n173.b
n188.out → n187.assertion
n189.out → n187.atom1
n183.out → n187.formula1
n190.out → n187.atom2
n22.out → n187.formula2
n192.out → n191.assertion
n22.out → n194.a
n183.out → n194.b
n183.out → n195.a
n194.out → n195.b
n193.out → n191.atom1
n195.out → n191.formula1
n196.out → n191.atom2
n14.out → n191.formula2
n187.out → n186.a
n191.out → n186.b
n198.out → n197.assertion
n199.out → n197.atom1
n14.out → n197.formula1
n200.out → n197.atom2
n183.out → n197.formula2
n201.out → n197.atom3
n194.out → n197.formula3
n186.out → n185.a
n197.out → n185.b
n173.out → n172.a
n185.out → n172.b
n205.out → n204.assertion
n206.out → n204.atom1
n22.out → n204.formula1
n207.out → n204.atom2
n101.out → n204.formula2
n208.out → n204.atom3
n182.out → n204.formula3
n210.out → n209.assertion
n22.out → n212.a
n182.out → n212.b
n156.out → n213.a
n212.out → n213.b
n194.out → n214.a
n213.out → n214.b
n211.out → n209.atom1
n214.out → n209.formula1
n215.out → n209.atom2
n14.out → n209.formula2
n204.out → n203.a
n209.out → n203.b
n217.out → n216.assertion
n218.out → n216.atom1
n14.out → n216.formula1
n219.out → n216.atom2
n194.out → n216.formula2
n220.out → n216.atom3
n213.out → n216.formula3
n203.out → n202.a
n216.out → n202.b
n172.out → n171.a
n202.out → n171.b
n222.out → n221.assertion
n223.out → n221.atom1
n14.out → n221.formula1
n224.out → n221.atom2
n156.out → n221.formula2
n225.out → n221.atom3
n212.out → n221.formula3
n171.out → n170.a
n221.out → n170.b
n2.out → n1.a
n170.out → n1.b
n1.out → n226.proof
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
n2  subst
n3  定理 *01
n4  atom P
n5  term z
n6  pred =
n7  all(v=z)
n8  subst
n9  axiom A1
n10  atom P
n11  imp
n12  atom Q
n13  term x
n14  term y
n15  pred =

接线：
n3.out → n2.assertion
n5.out → n6.t1
n5.out → n6.t2
n6.out → n7.a
n4.out → n2.atom1
n7.out → n2.formula1
n9.out → n8.assertion
n7.out → n11.a
n7.out → n11.b
n10.out → n8.atom1
n11.out → n8.formula1
n13.out → n15.t1
n14.out → n15.t2
n12.out → n8.atom2
n15.out → n8.formula2
n2.out → n1.a
n8.out → n1.b
n1.out → n16.proof
```

</details>

### *61 · 谓词替换（双向）

- 目标：`⊢ ∀ x ∀ y ( x = y → ( F ( x ) ↔ F ( y ) ) )`
- 提示：*53 给正向、*54 给反向，用 ↔I 合成，DT 消去 x=y 后全称推广。
- 参考解：66 个模块 / 94 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n67  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  mp
n4  mp
n5  subst
n6  定理 *01
n7  atom P
n8  term x
n9  term y
n10  pred =
n11  mp
n12  mp
n13  定理 *54
n14  subst
n15  axiom A1
n16  atom P
n17  pred F
n18  pred F
n19  imp
n20  imp
n21  atom Q
n22  subst
n23  axiom A2
n24  atom P
n25  atom Q
n26  atom R
n27  mp
n28  mp
n29  mp
n30  subst
n31  定理 *01
n32  atom P
n33  mp
n34  mp
n35  定理 *53
n36  subst
n37  axiom A1
n38  atom P
n39  imp
n40  imp
n41  atom Q
n42  subst
n43  axiom A2
n44  atom P
n45  atom Q
n46  atom R
n47  mp
n48  mp
n49  iff-intro-ax
n50  subst
n51  axiom A1
n52  atom P
n53  iff
n54  imp
n55  imp
n56  atom Q
n57  subst
n58  axiom A2
n59  atom P
n60  atom Q
n61  atom R
n62  subst
n63  axiom A2
n64  atom P
n65  atom Q
n66  atom R

接线：
n6.out → n5.assertion
n8.out → n10.t1
n9.out → n10.t2
n7.out → n5.atom1
n10.out → n5.formula1
n15.out → n14.assertion
n9.out → n17.t1
n8.out → n18.t1
n17.out → n19.a
n18.out → n19.b
n10.out → n20.a
n19.out → n20.b
n16.out → n14.atom1
n20.out → n14.formula1
n21.out → n14.atom2
n10.out → n14.formula2
n13.out → n12.a
n14.out → n12.b
n23.out → n22.assertion
n24.out → n22.atom1
n10.out → n22.formula1
n25.out → n22.atom2
n10.out → n22.formula2
n26.out → n22.atom3
n19.out → n22.formula3
n12.out → n11.a
n22.out → n11.b
n5.out → n4.a
n11.out → n4.b
n31.out → n30.assertion
n32.out → n30.atom1
n10.out → n30.formula1
n37.out → n36.assertion
n18.out → n39.a
n17.out → n39.b
n10.out → n40.a
n39.out → n40.b
n38.out → n36.atom1
n40.out → n36.formula1
n41.out → n36.atom2
n10.out → n36.formula2
n35.out → n34.a
n36.out → n34.b
n43.out → n42.assertion
n44.out → n42.atom1
n10.out → n42.formula1
n45.out → n42.atom2
n10.out → n42.formula2
n46.out → n42.atom3
n39.out → n42.formula3
n34.out → n33.a
n42.out → n33.b
n30.out → n29.a
n33.out → n29.b
n18.out → n49.a
n17.out → n49.b
n51.out → n50.assertion
n18.out → n53.a
n17.out → n53.b
n19.out → n54.a
n53.out → n54.b
n39.out → n55.a
n54.out → n55.b
n52.out → n50.atom1
n55.out → n50.formula1
n56.out → n50.atom2
n10.out → n50.formula2
n49.out → n48.a
n50.out → n48.b
n58.out → n57.assertion
n59.out → n57.atom1
n10.out → n57.formula1
n60.out → n57.atom2
n39.out → n57.formula2
n61.out → n57.atom3
n54.out → n57.formula3
n48.out → n47.a
n57.out → n47.b
n29.out → n28.a
n47.out → n28.b
n63.out → n62.assertion
n64.out → n62.atom1
n10.out → n62.formula1
n65.out → n62.atom2
n19.out → n62.formula2
n66.out → n62.atom3
n53.out → n62.formula3
n28.out → n27.a
n62.out → n27.b
n4.out → n3.a
n27.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n67.proof
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
- 参考解：27 个模块 / 37 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n28  [target]
n1  mp
n2  subst
n3  定理 *08
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
n15  subst
n16  axiom A1
n17  atom P
n18  imp
n19  atom Q
n20  mp
n21  subst
n22  定理 *01
n23  atom P
n24  subst
n25  axiom A1
n26  atom P
n27  atom Q

接线：
n3.out → n2.assertion
n5.out → n6.t1
n6.out → n7.a
n6.out → n7.b
n4.out → n2.atom1
n7.out → n2.formula1
n5.out → n10.t1
n9.out → n10.t2
n8.out → n2.atom2
n10.out → n2.formula2
n9.out → n12.t1
n12.out → n13.a
n12.out → n13.b
n11.out → n2.atom3
n13.out → n2.formula3
n16.out → n15.assertion
n10.out → n18.a
n13.out → n18.b
n17.out → n15.atom1
n18.out → n15.formula1
n19.out → n15.atom2
n7.out → n15.formula2
n22.out → n21.assertion
n23.out → n21.atom1
n12.out → n21.formula1
n25.out → n24.assertion
n26.out → n24.atom1
n13.out → n24.formula1
n27.out → n24.atom2
n10.out → n24.formula2
n21.out → n20.a
n24.out → n20.b
n15.out → n14.a
n20.out → n14.b
n2.out → n1.a
n14.out → n1.b
n1.out → n28.proof
```

</details>

### *64 · 全称辖域（定理）

- 目标：`⊢ ( ∀ z ( P → Q ) → ( P → ∀ z Q ) )`
- 提示：先引用 *66 这条已证定理，再用分离。
- 参考解：167 个模块 / 247 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n168  [target]
n1  mp
n2  mp
n3  mp
n4  subst
n5  定理 *01
n6  atom P
n7  atom P
n8  subst
n9  axiom A1
n10  atom P
n11  imp
n12  atom Q
n13  atom Q
n14  imp
n15  all(v=z)
n16  mp
n17  mp
n18  mp
n19  mp
n20  shift(v=z)
n21  subst
n22  axiom A1
n23  atom P
n24  all(v=z)
n25  imp
n26  atom Q
n27  mp
n28  mp
n29  subst
n30  axiom A1
n31  atom P
n32  atom Q
n33  subst
n34  axiom A1
n35  atom P
n36  imp
n37  imp
n38  atom Q
n39  subst
n40  axiom A2
n41  atom P
n42  atom Q
n43  atom R
n44  mp
n45  mp
n46  subst
n47  axiom A2
n48  atom P
n49  atom Q
n50  atom R
n51  subst
n52  axiom A1
n53  atom P
n54  imp
n55  imp
n56  atom Q
n57  subst
n58  axiom A2
n59  atom P
n60  atom Q
n61  atom R
n62  subst
n63  axiom A2
n64  atom P
n65  atom Q
n66  atom R
n67  mp
n68  mp
n69  mp
n70  mp
n71  subst
n72  定理 *01
n73  atom P
n74  mp
n75  mp
n76  subst
n77  axiom A1
n78  atom P
n79  atom Q
n80  subst
n81  axiom A1
n82  atom P
n83  imp
n84  imp
n85  atom Q
n86  subst
n87  axiom A2
n88  atom P
n89  atom Q
n90  atom R
n91  mp
n92  mp
n93  mp
n94  mp
n95  axiom A5(v=z)
n96  subst
n97  axiom A1
n98  atom P
n99  all(v=z)
n100  imp
n101  imp
n102  atom Q
n103  mp
n104  mp
n105  subst
n106  axiom A1
n107  atom P
n108  atom Q
n109  subst
n110  axiom A1
n111  atom P
n112  imp
n113  imp
n114  atom Q
n115  subst
n116  axiom A2
n117  atom P
n118  atom Q
n119  atom R
n120  mp
n121  mp
n122  subst
n123  axiom A2
n124  atom P
n125  atom Q
n126  atom R
n127  subst
n128  axiom A1
n129  atom P
n130  imp
n131  imp
n132  imp
n133  atom Q
n134  subst
n135  axiom A2
n136  atom P
n137  atom Q
n138  atom R
n139  subst
n140  axiom A2
n141  atom P
n142  atom Q
n143  atom R
n144  mp
n145  mp
n146  subst
n147  axiom A2
n148  atom P
n149  atom Q
n150  atom R
n151  subst
n152  axiom A1
n153  atom P
n154  imp
n155  imp
n156  imp
n157  atom Q
n158  subst
n159  axiom A2
n160  atom P
n161  atom Q
n162  atom R
n163  subst
n164  axiom A2
n165  atom P
n166  atom Q
n167  atom R

接线：
n5.out → n4.assertion
n6.out → n4.atom1
n7.out → n4.formula1
n9.out → n8.assertion
n7.out → n11.a
n7.out → n11.b
n10.out → n8.atom1
n11.out → n8.formula1
n7.out → n14.a
n13.out → n14.b
n14.out → n15.a
n12.out → n8.atom2
n15.out → n8.formula2
n4.out → n3.a
n8.out → n3.b
n7.out → n20.formula
n22.out → n21.assertion
n7.out → n24.a
n7.out → n25.a
n24.out → n25.b
n23.out → n21.atom1
n25.out → n21.formula1
n26.out → n21.atom2
n15.out → n21.formula2
n20.out → n19.a
n21.out → n19.b
n30.out → n29.assertion
n31.out → n29.atom1
n25.out → n29.formula1
n32.out → n29.atom2
n7.out → n29.formula2
n34.out → n33.assertion
n7.out → n36.a
n25.out → n36.b
n25.out → n37.a
n36.out → n37.b
n35.out → n33.atom1
n37.out → n33.formula1
n38.out → n33.atom2
n15.out → n33.formula2
n29.out → n28.a
n33.out → n28.b
n40.out → n39.assertion
n41.out → n39.atom1
n15.out → n39.formula1
n42.out → n39.atom2
n25.out → n39.formula2
n43.out → n39.atom3
n36.out → n39.formula3
n28.out → n27.a
n39.out → n27.b
n19.out → n18.a
n27.out → n18.b
n47.out → n46.assertion
n48.out → n46.atom1
n7.out → n46.formula1
n49.out → n46.atom2
n7.out → n46.formula2
n50.out → n46.atom3
n24.out → n46.formula3
n52.out → n51.assertion
n11.out → n54.a
n25.out → n54.b
n36.out → n55.a
n54.out → n55.b
n53.out → n51.atom1
n55.out → n51.formula1
n56.out → n51.atom2
n15.out → n51.formula2
n46.out → n45.a
n51.out → n45.b
n58.out → n57.assertion
n59.out → n57.atom1
n15.out → n57.formula1
n60.out → n57.atom2
n36.out → n57.formula2
n61.out → n57.atom3
n54.out → n57.formula3
n45.out → n44.a
n57.out → n44.b
n18.out → n17.a
n44.out → n17.b
n63.out → n62.assertion
n64.out → n62.atom1
n15.out → n62.formula1
n65.out → n62.atom2
n11.out → n62.formula2
n66.out → n62.atom3
n25.out → n62.formula3
n17.out → n16.a
n62.out → n16.b
n3.out → n2.a
n16.out → n2.b
n72.out → n71.assertion
n73.out → n71.atom1
n15.out → n71.formula1
n77.out → n76.assertion
n78.out → n76.atom1
n15.out → n76.formula1
n79.out → n76.atom2
n7.out → n76.formula2
n81.out → n80.assertion
n7.out → n83.a
n15.out → n83.b
n15.out → n84.a
n83.out → n84.b
n82.out → n80.atom1
n84.out → n80.formula1
n85.out → n80.atom2
n15.out → n80.formula2
n76.out → n75.a
n80.out → n75.b
n87.out → n86.assertion
n88.out → n86.atom1
n15.out → n86.formula1
n89.out → n86.atom2
n15.out → n86.formula2
n90.out → n86.atom3
n83.out → n86.formula3
n75.out → n74.a
n86.out → n74.b
n71.out → n70.a
n74.out → n70.b
n97.out → n96.assertion
n13.out → n99.a
n24.out → n100.a
n99.out → n100.b
n15.out → n101.a
n100.out → n101.b
n98.out → n96.atom1
n101.out → n96.formula1
n102.out → n96.atom2
n15.out → n96.formula2
n95.out → n94.a
n96.out → n94.b
n106.out → n105.assertion
n107.out → n105.atom1
n101.out → n105.formula1
n108.out → n105.atom2
n7.out → n105.formula2
n110.out → n109.assertion
n7.out → n112.a
n101.out → n112.b
n101.out → n113.a
n112.out → n113.b
n111.out → n109.atom1
n113.out → n109.formula1
n114.out → n109.atom2
n15.out → n109.formula2
n105.out → n104.a
n109.out → n104.b
n116.out → n115.assertion
n117.out → n115.atom1
n15.out → n115.formula1
n118.out → n115.atom2
n101.out → n115.formula2
n119.out → n115.atom3
n112.out → n115.formula3
n104.out → n103.a
n115.out → n103.b
n94.out → n93.a
n103.out → n93.b
n123.out → n122.assertion
n124.out → n122.atom1
n7.out → n122.formula1
n125.out → n122.atom2
n15.out → n122.formula2
n126.out → n122.atom3
n100.out → n122.formula3
n128.out → n127.assertion
n7.out → n130.a
n100.out → n130.b
n83.out → n131.a
n130.out → n131.b
n112.out → n132.a
n131.out → n132.b
n129.out → n127.atom1
n132.out → n127.formula1
n133.out → n127.atom2
n15.out → n127.formula2
n122.out → n121.a
n127.out → n121.b
n135.out → n134.assertion
n136.out → n134.atom1
n15.out → n134.formula1
n137.out → n134.atom2
n112.out → n134.formula2
n138.out → n134.atom3
n131.out → n134.formula3
n121.out → n120.a
n134.out → n120.b
n93.out → n92.a
n120.out → n92.b
n140.out → n139.assertion
n141.out → n139.atom1
n15.out → n139.formula1
n142.out → n139.atom2
n83.out → n139.formula2
n143.out → n139.atom3
n130.out → n139.formula3
n92.out → n91.a
n139.out → n91.b
n70.out → n69.a
n91.out → n69.b
n147.out → n146.assertion
n148.out → n146.atom1
n7.out → n146.formula1
n149.out → n146.atom2
n24.out → n146.formula2
n150.out → n146.atom3
n99.out → n146.formula3
n152.out → n151.assertion
n7.out → n154.a
n99.out → n154.b
n25.out → n155.a
n154.out → n155.b
n130.out → n156.a
n155.out → n156.b
n153.out → n151.atom1
n156.out → n151.formula1
n157.out → n151.atom2
n15.out → n151.formula2
n146.out → n145.a
n151.out → n145.b
n159.out → n158.assertion
n160.out → n158.atom1
n15.out → n158.formula1
n161.out → n158.atom2
n130.out → n158.formula2
n162.out → n158.atom3
n155.out → n158.formula3
n145.out → n144.a
n158.out → n144.b
n69.out → n68.a
n144.out → n68.b
n164.out → n163.assertion
n165.out → n163.atom1
n15.out → n163.formula1
n166.out → n163.atom2
n25.out → n163.formula2
n167.out → n163.atom3
n154.out → n163.formula3
n68.out → n67.a
n163.out → n67.b
n2.out → n1.a
n67.out → n1.b
n1.out → n168.proof
```

</details>

### *65 · 等词的双向同余

- 目标：`⊢ ( x = y → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) )`
- 提示：正向用替换，反向先对称再替换；各自推广并移动 ∀，最后合取。
- 参考解：50 个模块 / 76 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n51  [target]
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
n12  subst
n13  定理 *05
n14  atom P
n15  pred =
n16  atom Q
n17  pred =
n18  atom R
n19  mem
n20  imp
n21  subst
n22  定理 *64
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
n35  subst
n36  定理 *64
n37  atom P
n38  atom Q
n39  subst
n40  定理 *05
n41  atom P
n42  atom Q
n43  atom R
n44  and
n45  imp
n46  subst
n47  axiom A2
n48  atom P
n49  atom Q
n50  atom R

接线：
n6.out → n5.x
n7.out → n5.y
n8.out → n9.a
n6.out → n9.b
n9.out → n5.formula
n13.out → n12.assertion
n7.out → n15.t1
n6.out → n15.t2
n14.out → n12.atom1
n15.out → n12.formula1
n6.out → n17.t1
n7.out → n17.t2
n16.out → n12.atom2
n17.out → n12.formula2
n8.out → n19.a
n7.out → n19.b
n9.out → n20.a
n19.out → n20.b
n18.out → n12.atom3
n20.out → n12.formula3
n11.out → n10.a
n12.out → n10.b
n5.out → n4.a
n10.out → n4.b
n4.out → n3.assertion
n22.out → n21.assertion
n23.out → n21.atom1
n15.out → n21.formula1
n24.out → n21.atom2
n20.out → n21.formula2
n3.out → n2.a
n21.out → n2.b
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
n36.out → n35.assertion
n37.out → n35.atom1
n15.out → n35.formula1
n38.out → n35.atom2
n28.out → n35.formula2
n33.out → n32.a
n35.out → n32.b
n40.out → n39.assertion
n41.out → n39.atom1
n15.out → n39.formula1
n42.out → n39.atom2
n29.out → n39.formula2
n29.out → n44.a
n30.out → n44.b
n30.out → n45.a
n44.out → n45.b
n43.out → n39.atom3
n45.out → n39.formula3
n32.out → n31.a
n39.out → n31.b
n27.out → n26.a
n31.out → n26.b
n47.out → n46.assertion
n48.out → n46.atom1
n15.out → n46.formula1
n49.out → n46.atom2
n30.out → n46.formula2
n50.out → n46.atom3
n44.out → n46.formula3
n26.out → n25.a
n46.out → n25.b
n2.out → n1.a
n25.out → n1.b
n1.out → n51.proof
```

</details>

### *66 · 等词给出元素等价

- 目标：`⊢ ( x = y → ∀ z ( z ∈ x ↔ z ∈ y ) )`
- 提示：先引用 *65 得到两个方向的 ∀ 蕴含，逐个元素用 ↔E 拆、↔I 合，再全称推广；假设用 DT 消去。
- 参考解：129 个模块 / 192 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n130  [target]
n1  mp
n2  gen(v=z)
n3  mp
n4  mp
n5  mp
n6  mp
n7  subst
n8  定理 *01
n9  atom P
n10  term x
n11  term y
n12  pred =
n13  mp
n14  mp
n15  定理 *65
n16  subst
n17  axiom A1
n18  atom P
n19  term z
n20  mem
n21  mem
n22  imp
n23  all(v=z)
n24  imp
n25  all(v=z)
n26  and
n27  imp
n28  atom Q
n29  subst
n30  axiom A2
n31  atom P
n32  atom Q
n33  atom R
n34  mp
n35  mp
n36  and-elim-ax(side=r)
n37  subst
n38  axiom A1
n39  atom P
n40  imp
n41  atom Q
n42  subst
n43  axiom A2
n44  atom P
n45  atom Q
n46  atom R
n47  mp
n48  mp
n49  all-inst(v=z)
n50  subst
n51  axiom A1
n52  atom P
n53  imp
n54  atom Q
n55  subst
n56  axiom A2
n57  atom P
n58  atom Q
n59  atom R
n60  mp
n61  mp
n62  mp
n63  mp
n64  mp
n65  subst
n66  定理 *01
n67  atom P
n68  mp
n69  mp
n70  定理 *65
n71  subst
n72  axiom A1
n73  atom P
n74  atom Q
n75  subst
n76  axiom A2
n77  atom P
n78  atom Q
n79  atom R
n80  mp
n81  mp
n82  and-elim-ax(side=l)
n83  subst
n84  axiom A1
n85  atom P
n86  imp
n87  atom Q
n88  subst
n89  axiom A2
n90  atom P
n91  atom Q
n92  atom R
n93  mp
n94  mp
n95  all-inst(v=z)
n96  subst
n97  axiom A1
n98  atom P
n99  imp
n100  atom Q
n101  subst
n102  axiom A2
n103  atom P
n104  atom Q
n105  atom R
n106  mp
n107  mp
n108  iff-intro-ax
n109  subst
n110  axiom A1
n111  atom P
n112  iff
n113  imp
n114  imp
n115  atom Q
n116  subst
n117  axiom A2
n118  atom P
n119  atom Q
n120  atom R
n121  subst
n122  axiom A2
n123  atom P
n124  atom Q
n125  atom R
n126  subst
n127  定理 *64
n128  atom P
n129  atom Q

接线：
n8.out → n7.assertion
n10.out → n12.t1
n11.out → n12.t2
n9.out → n7.atom1
n12.out → n7.formula1
n17.out → n16.assertion
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
n12.out → n27.a
n26.out → n27.b
n18.out → n16.atom1
n27.out → n16.formula1
n28.out → n16.atom2
n12.out → n16.formula2
n15.out → n14.a
n16.out → n14.b
n30.out → n29.assertion
n31.out → n29.atom1
n12.out → n29.formula1
n32.out → n29.atom2
n12.out → n29.formula2
n33.out → n29.atom3
n26.out → n29.formula3
n14.out → n13.a
n29.out → n13.b
n7.out → n6.a
n13.out → n6.b
n23.out → n36.a
n25.out → n36.b
n38.out → n37.assertion
n26.out → n40.a
n25.out → n40.b
n39.out → n37.atom1
n40.out → n37.formula1
n41.out → n37.atom2
n12.out → n37.formula2
n36.out → n35.a
n37.out → n35.b
n43.out → n42.assertion
n44.out → n42.atom1
n12.out → n42.formula1
n45.out → n42.atom2
n26.out → n42.formula2
n46.out → n42.atom3
n25.out → n42.formula3
n35.out → n34.a
n42.out → n34.b
n6.out → n5.a
n34.out → n5.b
n24.out → n49.formula
n19.out → n49.term
n51.out → n50.assertion
n25.out → n53.a
n24.out → n53.b
n52.out → n50.atom1
n53.out → n50.formula1
n54.out → n50.atom2
n12.out → n50.formula2
n49.out → n48.a
n50.out → n48.b
n56.out → n55.assertion
n57.out → n55.atom1
n12.out → n55.formula1
n58.out → n55.atom2
n25.out → n55.formula2
n59.out → n55.atom3
n24.out → n55.formula3
n48.out → n47.a
n55.out → n47.b
n5.out → n4.a
n47.out → n4.b
n66.out → n65.assertion
n67.out → n65.atom1
n12.out → n65.formula1
n72.out → n71.assertion
n73.out → n71.atom1
n27.out → n71.formula1
n74.out → n71.atom2
n12.out → n71.formula2
n70.out → n69.a
n71.out → n69.b
n76.out → n75.assertion
n77.out → n75.atom1
n12.out → n75.formula1
n78.out → n75.atom2
n12.out → n75.formula2
n79.out → n75.atom3
n26.out → n75.formula3
n69.out → n68.a
n75.out → n68.b
n65.out → n64.a
n68.out → n64.b
n23.out → n82.a
n25.out → n82.b
n84.out → n83.assertion
n26.out → n86.a
n23.out → n86.b
n85.out → n83.atom1
n86.out → n83.formula1
n87.out → n83.atom2
n12.out → n83.formula2
n82.out → n81.a
n83.out → n81.b
n89.out → n88.assertion
n90.out → n88.atom1
n12.out → n88.formula1
n91.out → n88.atom2
n26.out → n88.formula2
n92.out → n88.atom3
n23.out → n88.formula3
n81.out → n80.a
n88.out → n80.b
n64.out → n63.a
n80.out → n63.b
n22.out → n95.formula
n19.out → n95.term
n97.out → n96.assertion
n23.out → n99.a
n22.out → n99.b
n98.out → n96.atom1
n99.out → n96.formula1
n100.out → n96.atom2
n12.out → n96.formula2
n95.out → n94.a
n96.out → n94.b
n102.out → n101.assertion
n103.out → n101.atom1
n12.out → n101.formula1
n104.out → n101.atom2
n23.out → n101.formula2
n105.out → n101.atom3
n22.out → n101.formula3
n94.out → n93.a
n101.out → n93.b
n63.out → n62.a
n93.out → n62.b
n20.out → n108.a
n21.out → n108.b
n110.out → n109.assertion
n20.out → n112.a
n21.out → n112.b
n24.out → n113.a
n112.out → n113.b
n22.out → n114.a
n113.out → n114.b
n111.out → n109.atom1
n114.out → n109.formula1
n115.out → n109.atom2
n12.out → n109.formula2
n108.out → n107.a
n109.out → n107.b
n117.out → n116.assertion
n118.out → n116.atom1
n12.out → n116.formula1
n119.out → n116.atom2
n22.out → n116.formula2
n120.out → n116.atom3
n113.out → n116.formula3
n107.out → n106.a
n116.out → n106.b
n62.out → n61.a
n106.out → n61.b
n122.out → n121.assertion
n123.out → n121.atom1
n12.out → n121.formula1
n124.out → n121.atom2
n24.out → n121.formula2
n125.out → n121.atom3
n112.out → n121.formula3
n61.out → n60.a
n121.out → n60.b
n4.out → n3.a
n60.out → n3.b
n3.out → n2.assertion
n127.out → n126.assertion
n128.out → n126.atom1
n12.out → n126.formula1
n129.out → n126.atom2
n112.out → n126.formula2
n2.out → n1.a
n126.out → n1.b
n1.out → n130.proof
```

</details>

### *67 · 传递后的谓词替换

- 目标：`⊢ ∀ x ∀ y ∀ z ( x = y → ( y = z → ( F ( x ) → F ( z ) ) ) )`
- 提示：先用 *52 得到 x=z，再用 Leibniz 把 F(x) 换成 F(z)；两次 DT 后全称推广。
- 参考解：173 个模块 / 257 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n174  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  gen(v=z)
n4  mp
n5  mp
n6  mp
n7  subst
n8  定理 *01
n9  atom P
n10  term y
n11  term z
n12  pred =
n13  subst
n14  axiom A1
n15  atom P
n16  imp
n17  atom Q
n18  term x
n19  pred =
n20  mp
n21  mp
n22  mp
n23  mp
n24  subst
n25  定理 *01
n26  atom P
n27  mp
n28  mp
n29  subst
n30  axiom A1
n31  atom P
n32  atom Q
n33  subst
n34  axiom A1
n35  atom P
n36  imp
n37  imp
n38  atom Q
n39  subst
n40  axiom A2
n41  atom P
n42  atom Q
n43  atom R
n44  mp
n45  mp
n46  mp
n47  mp
n48  定理 *52
n49  subst
n50  axiom A1
n51  atom P
n52  pred =
n53  imp
n54  imp
n55  atom Q
n56  mp
n57  mp
n58  subst
n59  axiom A1
n60  atom P
n61  atom Q
n62  subst
n63  axiom A1
n64  atom P
n65  imp
n66  imp
n67  atom Q
n68  subst
n69  axiom A2
n70  atom P
n71  atom Q
n72  atom R
n73  mp
n74  mp
n75  subst
n76  axiom A2
n77  atom P
n78  atom Q
n79  atom R
n80  subst
n81  axiom A1
n82  atom P
n83  imp
n84  imp
n85  imp
n86  atom Q
n87  subst
n88  axiom A2
n89  atom P
n90  atom Q
n91  atom R
n92  subst
n93  axiom A2
n94  atom P
n95  atom Q
n96  atom R
n97  mp
n98  mp
n99  subst
n100  axiom A2
n101  atom P
n102  atom Q
n103  atom R
n104  subst
n105  axiom A1
n106  atom P
n107  imp
n108  imp
n109  atom Q
n110  subst
n111  axiom A2
n112  atom P
n113  atom Q
n114  atom R
n115  subst
n116  axiom A2
n117  atom P
n118  atom Q
n119  atom R
n120  mp
n121  mp
n122  mp
n123  mp
n124  leibniz(mode=replace, v=z)
n125  pred F
n126  subst
n127  axiom A1
n128  atom P
n129  pred F
n130  imp
n131  imp
n132  atom Q
n133  mp
n134  mp
n135  subst
n136  axiom A1
n137  atom P
n138  atom Q
n139  subst
n140  axiom A1
n141  atom P
n142  imp
n143  imp
n144  atom Q
n145  subst
n146  axiom A2
n147  atom P
n148  atom Q
n149  atom R
n150  mp
n151  mp
n152  subst
n153  axiom A2
n154  atom P
n155  atom Q
n156  atom R
n157  subst
n158  axiom A1
n159  atom P
n160  imp
n161  imp
n162  imp
n163  atom Q
n164  subst
n165  axiom A2
n166  atom P
n167  atom Q
n168  atom R
n169  subst
n170  axiom A2
n171  atom P
n172  atom Q
n173  atom R

接线：
n8.out → n7.assertion
n10.out → n12.t1
n11.out → n12.t2
n9.out → n7.atom1
n12.out → n7.formula1
n14.out → n13.assertion
n12.out → n16.a
n12.out → n16.b
n15.out → n13.atom1
n16.out → n13.formula1
n18.out → n19.t1
n10.out → n19.t2
n17.out → n13.atom2
n19.out → n13.formula2
n7.out → n6.a
n13.out → n6.b
n25.out → n24.assertion
n26.out → n24.atom1
n19.out → n24.formula1
n30.out → n29.assertion
n31.out → n29.atom1
n19.out → n29.formula1
n32.out → n29.atom2
n12.out → n29.formula2
n34.out → n33.assertion
n12.out → n36.a
n19.out → n36.b
n19.out → n37.a
n36.out → n37.b
n35.out → n33.atom1
n37.out → n33.formula1
n38.out → n33.atom2
n19.out → n33.formula2
n29.out → n28.a
n33.out → n28.b
n40.out → n39.assertion
n41.out → n39.atom1
n19.out → n39.formula1
n42.out → n39.atom2
n19.out → n39.formula2
n43.out → n39.atom3
n36.out → n39.formula3
n28.out → n27.a
n39.out → n27.b
n24.out → n23.a
n27.out → n23.b
n50.out → n49.assertion
n18.out → n52.t1
n11.out → n52.t2
n12.out → n53.a
n52.out → n53.b
n19.out → n54.a
n53.out → n54.b
n51.out → n49.atom1
n54.out → n49.formula1
n55.out → n49.atom2
n19.out → n49.formula2
n48.out → n47.a
n49.out → n47.b
n59.out → n58.assertion
n60.out → n58.atom1
n54.out → n58.formula1
n61.out → n58.atom2
n12.out → n58.formula2
n63.out → n62.assertion
n12.out → n65.a
n54.out → n65.b
n54.out → n66.a
n65.out → n66.b
n64.out → n62.atom1
n66.out → n62.formula1
n67.out → n62.atom2
n19.out → n62.formula2
n58.out → n57.a
n62.out → n57.b
n69.out → n68.assertion
n70.out → n68.atom1
n19.out → n68.formula1
n71.out → n68.atom2
n54.out → n68.formula2
n72.out → n68.atom3
n65.out → n68.formula3
n57.out → n56.a
n68.out → n56.b
n47.out → n46.a
n56.out → n46.b
n76.out → n75.assertion
n77.out → n75.atom1
n12.out → n75.formula1
n78.out → n75.atom2
n19.out → n75.formula2
n79.out → n75.atom3
n53.out → n75.formula3
n81.out → n80.assertion
n12.out → n83.a
n53.out → n83.b
n36.out → n84.a
n83.out → n84.b
n65.out → n85.a
n84.out → n85.b
n82.out → n80.atom1
n85.out → n80.formula1
n86.out → n80.atom2
n19.out → n80.formula2
n75.out → n74.a
n80.out → n74.b
n88.out → n87.assertion
n89.out → n87.atom1
n19.out → n87.formula1
n90.out → n87.atom2
n65.out → n87.formula2
n91.out → n87.atom3
n84.out → n87.formula3
n74.out → n73.a
n87.out → n73.b
n46.out → n45.a
n73.out → n45.b
n93.out → n92.assertion
n94.out → n92.atom1
n19.out → n92.formula1
n95.out → n92.atom2
n36.out → n92.formula2
n96.out → n92.atom3
n83.out → n92.formula3
n45.out → n44.a
n92.out → n44.b
n23.out → n22.a
n44.out → n22.b
n100.out → n99.assertion
n101.out → n99.atom1
n12.out → n99.formula1
n102.out → n99.atom2
n12.out → n99.formula2
n103.out → n99.atom3
n52.out → n99.formula3
n105.out → n104.assertion
n16.out → n107.a
n53.out → n107.b
n83.out → n108.a
n107.out → n108.b
n106.out → n104.atom1
n108.out → n104.formula1
n109.out → n104.atom2
n19.out → n104.formula2
n99.out → n98.a
n104.out → n98.b
n111.out → n110.assertion
n112.out → n110.atom1
n19.out → n110.formula1
n113.out → n110.atom2
n83.out → n110.formula2
n114.out → n110.atom3
n107.out → n110.formula3
n98.out → n97.a
n110.out → n97.b
n22.out → n21.a
n97.out → n21.b
n116.out → n115.assertion
n117.out → n115.atom1
n19.out → n115.formula1
n118.out → n115.atom2
n16.out → n115.formula2
n119.out → n115.atom3
n53.out → n115.formula3
n21.out → n20.a
n115.out → n20.b
n6.out → n5.a
n20.out → n5.b
n18.out → n124.x
n11.out → n124.y
n18.out → n125.t1
n125.out → n124.formula
n127.out → n126.assertion
n11.out → n129.t1
n125.out → n130.a
n129.out → n130.b
n52.out → n131.a
n130.out → n131.b
n128.out → n126.atom1
n131.out → n126.formula1
n132.out → n126.atom2
n19.out → n126.formula2
n124.out → n123.a
n126.out → n123.b
n136.out → n135.assertion
n137.out → n135.atom1
n131.out → n135.formula1
n138.out → n135.atom2
n12.out → n135.formula2
n140.out → n139.assertion
n12.out → n142.a
n131.out → n142.b
n131.out → n143.a
n142.out → n143.b
n141.out → n139.atom1
n143.out → n139.formula1
n144.out → n139.atom2
n19.out → n139.formula2
n135.out → n134.a
n139.out → n134.b
n146.out → n145.assertion
n147.out → n145.atom1
n19.out → n145.formula1
n148.out → n145.atom2
n131.out → n145.formula2
n149.out → n145.atom3
n142.out → n145.formula3
n134.out → n133.a
n145.out → n133.b
n123.out → n122.a
n133.out → n122.b
n153.out → n152.assertion
n154.out → n152.atom1
n12.out → n152.formula1
n155.out → n152.atom2
n52.out → n152.formula2
n156.out → n152.atom3
n130.out → n152.formula3
n158.out → n157.assertion
n12.out → n160.a
n130.out → n160.b
n53.out → n161.a
n160.out → n161.b
n142.out → n162.a
n161.out → n162.b
n159.out → n157.atom1
n162.out → n157.formula1
n163.out → n157.atom2
n19.out → n157.formula2
n152.out → n151.a
n157.out → n151.b
n165.out → n164.assertion
n166.out → n164.atom1
n19.out → n164.formula1
n167.out → n164.atom2
n142.out → n164.formula2
n168.out → n164.atom3
n161.out → n164.formula3
n151.out → n150.a
n164.out → n150.b
n122.out → n121.a
n150.out → n121.b
n170.out → n169.assertion
n171.out → n169.atom1
n19.out → n169.formula1
n172.out → n169.atom2
n53.out → n169.formula2
n173.out → n169.atom3
n160.out → n169.formula3
n121.out → n120.a
n169.out → n120.b
n5.out → n4.a
n120.out → n4.b
n4.out → n3.assertion
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n174.proof
```

</details>

### *68 · 复合替换（双向）

- 目标：`⊢ ∀ x ∀ y ( x = y → ( ( F ( x ) → G ( x ) ) ↔ ( F ( y ) → G ( y ) ) ) )`
- 提示：正向引用 *57；反向先用 *51 得到 y=x，再 Leibniz 反向替换；↔I 后 DT。
- 参考解：105 个模块 / 156 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n106  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  mp
n4  mp
n5  subst
n6  定理 *01
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
n18  subst
n19  axiom A1
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
n32  subst
n33  axiom A1
n34  atom P
n35  imp
n36  atom Q
n37  mp
n38  mp
n39  subst
n40  定理 *05
n41  atom P
n42  atom Q
n43  atom R
n44  subst
n45  axiom A1
n46  atom P
n47  imp
n48  imp
n49  imp
n50  atom Q
n51  subst
n52  axiom A2
n53  atom P
n54  atom Q
n55  atom R
n56  subst
n57  axiom A2
n58  atom P
n59  atom Q
n60  atom R
n61  subst
n62  axiom A2
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n69  subst
n70  定理 *01
n71  atom P
n72  mp
n73  mp
n74  定理 *57
n75  subst
n76  axiom A1
n77  atom P
n78  imp
n79  imp
n80  atom Q
n81  subst
n82  axiom A2
n83  atom P
n84  atom Q
n85  atom R
n86  mp
n87  mp
n88  iff-intro-ax
n89  subst
n90  axiom A1
n91  atom P
n92  iff
n93  imp
n94  imp
n95  atom Q
n96  subst
n97  axiom A2
n98  atom P
n99  atom Q
n100  atom R
n101  subst
n102  axiom A2
n103  atom P
n104  atom Q
n105  atom R

接线：
n6.out → n5.assertion
n8.out → n10.t1
n9.out → n10.t2
n7.out → n5.atom1
n10.out → n5.formula1
n9.out → n14.x
n8.out → n14.y
n9.out → n15.t1
n9.out → n16.t1
n15.out → n17.a
n16.out → n17.b
n17.out → n14.formula
n19.out → n18.assertion
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
n20.out → n18.atom1
n26.out → n18.formula1
n27.out → n18.atom2
n10.out → n18.formula2
n14.out → n13.a
n18.out → n13.b
n33.out → n32.assertion
n10.out → n35.a
n21.out → n35.b
n34.out → n32.atom1
n35.out → n32.formula1
n36.out → n32.atom2
n10.out → n32.formula2
n31.out → n30.a
n32.out → n30.b
n40.out → n39.assertion
n41.out → n39.atom1
n10.out → n39.formula1
n42.out → n39.atom2
n21.out → n39.formula2
n43.out → n39.atom3
n25.out → n39.formula3
n45.out → n44.assertion
n10.out → n47.a
n25.out → n47.b
n26.out → n48.a
n47.out → n48.b
n35.out → n49.a
n48.out → n49.b
n46.out → n44.atom1
n49.out → n44.formula1
n50.out → n44.atom2
n10.out → n44.formula2
n39.out → n38.a
n44.out → n38.b
n52.out → n51.assertion
n53.out → n51.atom1
n10.out → n51.formula1
n54.out → n51.atom2
n35.out → n51.formula2
n55.out → n51.atom3
n48.out → n51.formula3
n38.out → n37.a
n51.out → n37.b
n30.out → n29.a
n37.out → n29.b
n57.out → n56.assertion
n58.out → n56.atom1
n10.out → n56.formula1
n59.out → n56.atom2
n26.out → n56.formula2
n60.out → n56.atom3
n47.out → n56.formula3
n29.out → n28.a
n56.out → n28.b
n13.out → n12.a
n28.out → n12.b
n62.out → n61.assertion
n63.out → n61.atom1
n10.out → n61.formula1
n64.out → n61.atom2
n10.out → n61.formula2
n65.out → n61.atom3
n25.out → n61.formula3
n12.out → n11.a
n61.out → n11.b
n5.out → n4.a
n11.out → n4.b
n70.out → n69.assertion
n71.out → n69.atom1
n10.out → n69.formula1
n76.out → n75.assertion
n24.out → n78.a
n17.out → n78.b
n10.out → n79.a
n78.out → n79.b
n77.out → n75.atom1
n79.out → n75.formula1
n80.out → n75.atom2
n10.out → n75.formula2
n74.out → n73.a
n75.out → n73.b
n82.out → n81.assertion
n83.out → n81.atom1
n10.out → n81.formula1
n84.out → n81.atom2
n10.out → n81.formula2
n85.out → n81.atom3
n78.out → n81.formula3
n73.out → n72.a
n81.out → n72.b
n69.out → n68.a
n72.out → n68.b
n24.out → n88.a
n17.out → n88.b
n90.out → n89.assertion
n24.out → n92.a
n17.out → n92.b
n25.out → n93.a
n92.out → n93.b
n78.out → n94.a
n93.out → n94.b
n91.out → n89.atom1
n94.out → n89.formula1
n95.out → n89.atom2
n10.out → n89.formula2
n88.out → n87.a
n89.out → n87.b
n97.out → n96.assertion
n98.out → n96.atom1
n10.out → n96.formula1
n99.out → n96.atom2
n78.out → n96.formula2
n100.out → n96.atom3
n93.out → n96.formula3
n87.out → n86.a
n96.out → n86.b
n68.out → n67.a
n86.out → n67.b
n102.out → n101.assertion
n103.out → n101.atom1
n10.out → n101.formula1
n104.out → n101.atom2
n25.out → n101.formula2
n105.out → n101.atom3
n92.out → n101.formula3
n67.out → n66.a
n101.out → n66.b
n4.out → n3.a
n66.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n106.proof
```

</details>

### *69 · 全称等词替换

- 目标：`⊢ ( x = y → ( ∀ z z = x → ∀ z z = y ) )`
- 提示：从 ∀z z=x 全称例化到 z，用 Leibniz 换成 z=y，再全称推广；假设用 DT 分两层消去。
- 参考解：194 个模块 / 290 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n195  [target]
n1  mp
n2  mp
n3  gen(v=z)
n4  mp
n5  mp
n6  mp
n7  subst
n8  定理 *01
n9  atom P
n10  term z
n11  term x
n12  pred =
n13  all(v=z)
n14  subst
n15  axiom A1
n16  atom P
n17  imp
n18  atom Q
n19  term y
n20  pred =
n21  mp
n22  mp
n23  mp
n24  mp
n25  all-inst(v=z)
n26  subst
n27  axiom A1
n28  atom P
n29  imp
n30  atom Q
n31  mp
n32  mp
n33  subst
n34  axiom A1
n35  atom P
n36  atom Q
n37  subst
n38  axiom A1
n39  atom P
n40  imp
n41  imp
n42  atom Q
n43  subst
n44  axiom A2
n45  atom P
n46  atom Q
n47  atom R
n48  mp
n49  mp
n50  subst
n51  axiom A2
n52  atom P
n53  atom Q
n54  atom R
n55  subst
n56  axiom A1
n57  atom P
n58  imp
n59  imp
n60  atom Q
n61  subst
n62  axiom A2
n63  atom P
n64  atom Q
n65  atom R
n66  subst
n67  axiom A2
n68  atom P
n69  atom Q
n70  atom R
n71  mp
n72  mp
n73  mp
n74  mp
n75  subst
n76  定理 *01
n77  atom P
n78  mp
n79  mp
n80  subst
n81  axiom A1
n82  atom P
n83  atom Q
n84  subst
n85  axiom A1
n86  atom P
n87  imp
n88  imp
n89  atom Q
n90  subst
n91  axiom A2
n92  atom P
n93  atom Q
n94  atom R
n95  mp
n96  mp
n97  mp
n98  mp
n99  leibniz(mode=replace, v=z)
n100  subst
n101  axiom A1
n102  atom P
n103  pred =
n104  imp
n105  imp
n106  atom Q
n107  mp
n108  mp
n109  subst
n110  axiom A1
n111  atom P
n112  atom Q
n113  subst
n114  axiom A1
n115  atom P
n116  imp
n117  imp
n118  atom Q
n119  subst
n120  axiom A2
n121  atom P
n122  atom Q
n123  atom R
n124  mp
n125  mp
n126  subst
n127  axiom A2
n128  atom P
n129  atom Q
n130  atom R
n131  subst
n132  axiom A1
n133  atom P
n134  imp
n135  imp
n136  imp
n137  atom Q
n138  subst
n139  axiom A2
n140  atom P
n141  atom Q
n142  atom R
n143  subst
n144  axiom A2
n145  atom P
n146  atom Q
n147  atom R
n148  mp
n149  mp
n150  subst
n151  axiom A2
n152  atom P
n153  atom Q
n154  atom R
n155  subst
n156  axiom A1
n157  atom P
n158  imp
n159  imp
n160  imp
n161  atom Q
n162  subst
n163  axiom A2
n164  atom P
n165  atom Q
n166  atom R
n167  subst
n168  axiom A2
n169  atom P
n170  atom Q
n171  atom R
n172  subst
n173  定理 *64
n174  atom P
n175  atom Q
n176  mp
n177  mp
n178  subst
n179  定理 *64
n180  atom P
n181  atom Q
n182  subst
n183  axiom A1
n184  atom P
n185  all(v=z)
n186  all(v=z)
n187  imp
n188  imp
n189  atom Q
n190  subst
n191  axiom A2
n192  atom P
n193  atom Q
n194  atom R

接线：
n8.out → n7.assertion
n10.out → n12.t1
n11.out → n12.t2
n12.out → n13.a
n9.out → n7.atom1
n13.out → n7.formula1
n15.out → n14.assertion
n13.out → n17.a
n13.out → n17.b
n16.out → n14.atom1
n17.out → n14.formula1
n11.out → n20.t1
n19.out → n20.t2
n18.out → n14.atom2
n20.out → n14.formula2
n7.out → n6.a
n14.out → n6.b
n12.out → n25.formula
n10.out → n25.term
n27.out → n26.assertion
n13.out → n29.a
n12.out → n29.b
n28.out → n26.atom1
n29.out → n26.formula1
n30.out → n26.atom2
n20.out → n26.formula2
n25.out → n24.a
n26.out → n24.b
n34.out → n33.assertion
n35.out → n33.atom1
n29.out → n33.formula1
n36.out → n33.atom2
n13.out → n33.formula2
n38.out → n37.assertion
n13.out → n40.a
n29.out → n40.b
n29.out → n41.a
n40.out → n41.b
n39.out → n37.atom1
n41.out → n37.formula1
n42.out → n37.atom2
n20.out → n37.formula2
n33.out → n32.a
n37.out → n32.b
n44.out → n43.assertion
n45.out → n43.atom1
n20.out → n43.formula1
n46.out → n43.atom2
n29.out → n43.formula2
n47.out → n43.atom3
n40.out → n43.formula3
n32.out → n31.a
n43.out → n31.b
n24.out → n23.a
n31.out → n23.b
n51.out → n50.assertion
n52.out → n50.atom1
n13.out → n50.formula1
n53.out → n50.atom2
n13.out → n50.formula2
n54.out → n50.atom3
n12.out → n50.formula3
n56.out → n55.assertion
n17.out → n58.a
n29.out → n58.b
n40.out → n59.a
n58.out → n59.b
n57.out → n55.atom1
n59.out → n55.formula1
n60.out → n55.atom2
n20.out → n55.formula2
n50.out → n49.a
n55.out → n49.b
n62.out → n61.assertion
n63.out → n61.atom1
n20.out → n61.formula1
n64.out → n61.atom2
n40.out → n61.formula2
n65.out → n61.atom3
n58.out → n61.formula3
n49.out → n48.a
n61.out → n48.b
n23.out → n22.a
n48.out → n22.b
n67.out → n66.assertion
n68.out → n66.atom1
n20.out → n66.formula1
n69.out → n66.atom2
n17.out → n66.formula2
n70.out → n66.atom3
n29.out → n66.formula3
n22.out → n21.a
n66.out → n21.b
n6.out → n5.a
n21.out → n5.b
n76.out → n75.assertion
n77.out → n75.atom1
n20.out → n75.formula1
n81.out → n80.assertion
n82.out → n80.atom1
n20.out → n80.formula1
n83.out → n80.atom2
n13.out → n80.formula2
n85.out → n84.assertion
n13.out → n87.a
n20.out → n87.b
n20.out → n88.a
n87.out → n88.b
n86.out → n84.atom1
n88.out → n84.formula1
n89.out → n84.atom2
n20.out → n84.formula2
n80.out → n79.a
n84.out → n79.b
n91.out → n90.assertion
n92.out → n90.atom1
n20.out → n90.formula1
n93.out → n90.atom2
n20.out → n90.formula2
n94.out → n90.atom3
n87.out → n90.formula3
n79.out → n78.a
n90.out → n78.b
n75.out → n74.a
n78.out → n74.b
n11.out → n99.x
n19.out → n99.y
n12.out → n99.formula
n101.out → n100.assertion
n10.out → n103.t1
n19.out → n103.t2
n12.out → n104.a
n103.out → n104.b
n20.out → n105.a
n104.out → n105.b
n102.out → n100.atom1
n105.out → n100.formula1
n106.out → n100.atom2
n20.out → n100.formula2
n99.out → n98.a
n100.out → n98.b
n110.out → n109.assertion
n111.out → n109.atom1
n105.out → n109.formula1
n112.out → n109.atom2
n13.out → n109.formula2
n114.out → n113.assertion
n13.out → n116.a
n105.out → n116.b
n105.out → n117.a
n116.out → n117.b
n115.out → n113.atom1
n117.out → n113.formula1
n118.out → n113.atom2
n20.out → n113.formula2
n109.out → n108.a
n113.out → n108.b
n120.out → n119.assertion
n121.out → n119.atom1
n20.out → n119.formula1
n122.out → n119.atom2
n105.out → n119.formula2
n123.out → n119.atom3
n116.out → n119.formula3
n108.out → n107.a
n119.out → n107.b
n98.out → n97.a
n107.out → n97.b
n127.out → n126.assertion
n128.out → n126.atom1
n13.out → n126.formula1
n129.out → n126.atom2
n20.out → n126.formula2
n130.out → n126.atom3
n104.out → n126.formula3
n132.out → n131.assertion
n13.out → n134.a
n104.out → n134.b
n87.out → n135.a
n134.out → n135.b
n116.out → n136.a
n135.out → n136.b
n133.out → n131.atom1
n136.out → n131.formula1
n137.out → n131.atom2
n20.out → n131.formula2
n126.out → n125.a
n131.out → n125.b
n139.out → n138.assertion
n140.out → n138.atom1
n20.out → n138.formula1
n141.out → n138.atom2
n116.out → n138.formula2
n142.out → n138.atom3
n135.out → n138.formula3
n125.out → n124.a
n138.out → n124.b
n97.out → n96.a
n124.out → n96.b
n144.out → n143.assertion
n145.out → n143.atom1
n20.out → n143.formula1
n146.out → n143.atom2
n87.out → n143.formula2
n147.out → n143.atom3
n134.out → n143.formula3
n96.out → n95.a
n143.out → n95.b
n74.out → n73.a
n95.out → n73.b
n151.out → n150.assertion
n152.out → n150.atom1
n13.out → n150.formula1
n153.out → n150.atom2
n12.out → n150.formula2
n154.out → n150.atom3
n103.out → n150.formula3
n156.out → n155.assertion
n13.out → n158.a
n103.out → n158.b
n29.out → n159.a
n158.out → n159.b
n134.out → n160.a
n159.out → n160.b
n157.out → n155.atom1
n160.out → n155.formula1
n161.out → n155.atom2
n20.out → n155.formula2
n150.out → n149.a
n155.out → n149.b
n163.out → n162.assertion
n164.out → n162.atom1
n20.out → n162.formula1
n165.out → n162.atom2
n134.out → n162.formula2
n166.out → n162.atom3
n159.out → n162.formula3
n149.out → n148.a
n162.out → n148.b
n73.out → n72.a
n148.out → n72.b
n168.out → n167.assertion
n169.out → n167.atom1
n20.out → n167.formula1
n170.out → n167.atom2
n29.out → n167.formula2
n171.out → n167.atom3
n158.out → n167.formula3
n72.out → n71.a
n167.out → n71.b
n5.out → n4.a
n71.out → n4.b
n4.out → n3.assertion
n173.out → n172.assertion
n174.out → n172.atom1
n20.out → n172.formula1
n175.out → n172.atom2
n158.out → n172.formula2
n3.out → n2.a
n172.out → n2.b
n179.out → n178.assertion
n180.out → n178.atom1
n13.out → n178.formula1
n181.out → n178.atom2
n103.out → n178.formula2
n183.out → n182.assertion
n158.out → n185.a
n103.out → n186.a
n13.out → n187.a
n186.out → n187.b
n185.out → n188.a
n187.out → n188.b
n184.out → n182.atom1
n188.out → n182.formula1
n189.out → n182.atom2
n20.out → n182.formula2
n178.out → n177.a
n182.out → n177.b
n191.out → n190.assertion
n192.out → n190.atom1
n20.out → n190.formula1
n193.out → n190.atom2
n185.out → n190.formula2
n194.out → n190.atom3
n187.out → n190.formula3
n177.out → n176.a
n190.out → n176.b
n2.out → n1.a
n176.out → n1.b
n1.out → n195.proof
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
n10  subst
n11  定理 *05
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
n11.out → n10.assertion
n4.out → n13.t1
n3.out → n13.t2
n12.out → n10.atom1
n13.out → n10.formula1
n3.out → n15.t1
n4.out → n15.t2
n14.out → n10.atom2
n15.out → n10.formula2
n5.out → n17.t1
n4.out → n17.t2
n17.out → n18.a
n7.out → n19.a
n18.out → n19.b
n16.out → n10.atom3
n19.out → n10.formula3
n9.out → n8.a
n10.out → n8.b
n2.out → n1.a
n8.out → n1.b
n1.out → n20.proof
```

</details>

### *71 · 嵌套全称替换

- 目标：`⊢ ( x = y → ( ∀ z x = z → ∀ z y = z ) )`
- 提示：同 *69，但 Leibniz 作用在 x=z 的左侧。
- 参考解：194 个模块 / 290 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n195  [target]
n1  mp
n2  mp
n3  gen(v=z)
n4  mp
n5  mp
n6  mp
n7  subst
n8  定理 *01
n9  atom P
n10  term x
n11  term z
n12  pred =
n13  all(v=z)
n14  subst
n15  axiom A1
n16  atom P
n17  imp
n18  atom Q
n19  term y
n20  pred =
n21  mp
n22  mp
n23  mp
n24  mp
n25  all-inst(v=z)
n26  subst
n27  axiom A1
n28  atom P
n29  imp
n30  atom Q
n31  mp
n32  mp
n33  subst
n34  axiom A1
n35  atom P
n36  atom Q
n37  subst
n38  axiom A1
n39  atom P
n40  imp
n41  imp
n42  atom Q
n43  subst
n44  axiom A2
n45  atom P
n46  atom Q
n47  atom R
n48  mp
n49  mp
n50  subst
n51  axiom A2
n52  atom P
n53  atom Q
n54  atom R
n55  subst
n56  axiom A1
n57  atom P
n58  imp
n59  imp
n60  atom Q
n61  subst
n62  axiom A2
n63  atom P
n64  atom Q
n65  atom R
n66  subst
n67  axiom A2
n68  atom P
n69  atom Q
n70  atom R
n71  mp
n72  mp
n73  mp
n74  mp
n75  subst
n76  定理 *01
n77  atom P
n78  mp
n79  mp
n80  subst
n81  axiom A1
n82  atom P
n83  atom Q
n84  subst
n85  axiom A1
n86  atom P
n87  imp
n88  imp
n89  atom Q
n90  subst
n91  axiom A2
n92  atom P
n93  atom Q
n94  atom R
n95  mp
n96  mp
n97  mp
n98  mp
n99  leibniz(mode=replace, v=z)
n100  subst
n101  axiom A1
n102  atom P
n103  pred =
n104  imp
n105  imp
n106  atom Q
n107  mp
n108  mp
n109  subst
n110  axiom A1
n111  atom P
n112  atom Q
n113  subst
n114  axiom A1
n115  atom P
n116  imp
n117  imp
n118  atom Q
n119  subst
n120  axiom A2
n121  atom P
n122  atom Q
n123  atom R
n124  mp
n125  mp
n126  subst
n127  axiom A2
n128  atom P
n129  atom Q
n130  atom R
n131  subst
n132  axiom A1
n133  atom P
n134  imp
n135  imp
n136  imp
n137  atom Q
n138  subst
n139  axiom A2
n140  atom P
n141  atom Q
n142  atom R
n143  subst
n144  axiom A2
n145  atom P
n146  atom Q
n147  atom R
n148  mp
n149  mp
n150  subst
n151  axiom A2
n152  atom P
n153  atom Q
n154  atom R
n155  subst
n156  axiom A1
n157  atom P
n158  imp
n159  imp
n160  imp
n161  atom Q
n162  subst
n163  axiom A2
n164  atom P
n165  atom Q
n166  atom R
n167  subst
n168  axiom A2
n169  atom P
n170  atom Q
n171  atom R
n172  subst
n173  定理 *64
n174  atom P
n175  atom Q
n176  mp
n177  mp
n178  subst
n179  定理 *64
n180  atom P
n181  atom Q
n182  subst
n183  axiom A1
n184  atom P
n185  all(v=z)
n186  all(v=z)
n187  imp
n188  imp
n189  atom Q
n190  subst
n191  axiom A2
n192  atom P
n193  atom Q
n194  atom R

接线：
n8.out → n7.assertion
n10.out → n12.t1
n11.out → n12.t2
n12.out → n13.a
n9.out → n7.atom1
n13.out → n7.formula1
n15.out → n14.assertion
n13.out → n17.a
n13.out → n17.b
n16.out → n14.atom1
n17.out → n14.formula1
n10.out → n20.t1
n19.out → n20.t2
n18.out → n14.atom2
n20.out → n14.formula2
n7.out → n6.a
n14.out → n6.b
n12.out → n25.formula
n11.out → n25.term
n27.out → n26.assertion
n13.out → n29.a
n12.out → n29.b
n28.out → n26.atom1
n29.out → n26.formula1
n30.out → n26.atom2
n20.out → n26.formula2
n25.out → n24.a
n26.out → n24.b
n34.out → n33.assertion
n35.out → n33.atom1
n29.out → n33.formula1
n36.out → n33.atom2
n13.out → n33.formula2
n38.out → n37.assertion
n13.out → n40.a
n29.out → n40.b
n29.out → n41.a
n40.out → n41.b
n39.out → n37.atom1
n41.out → n37.formula1
n42.out → n37.atom2
n20.out → n37.formula2
n33.out → n32.a
n37.out → n32.b
n44.out → n43.assertion
n45.out → n43.atom1
n20.out → n43.formula1
n46.out → n43.atom2
n29.out → n43.formula2
n47.out → n43.atom3
n40.out → n43.formula3
n32.out → n31.a
n43.out → n31.b
n24.out → n23.a
n31.out → n23.b
n51.out → n50.assertion
n52.out → n50.atom1
n13.out → n50.formula1
n53.out → n50.atom2
n13.out → n50.formula2
n54.out → n50.atom3
n12.out → n50.formula3
n56.out → n55.assertion
n17.out → n58.a
n29.out → n58.b
n40.out → n59.a
n58.out → n59.b
n57.out → n55.atom1
n59.out → n55.formula1
n60.out → n55.atom2
n20.out → n55.formula2
n50.out → n49.a
n55.out → n49.b
n62.out → n61.assertion
n63.out → n61.atom1
n20.out → n61.formula1
n64.out → n61.atom2
n40.out → n61.formula2
n65.out → n61.atom3
n58.out → n61.formula3
n49.out → n48.a
n61.out → n48.b
n23.out → n22.a
n48.out → n22.b
n67.out → n66.assertion
n68.out → n66.atom1
n20.out → n66.formula1
n69.out → n66.atom2
n17.out → n66.formula2
n70.out → n66.atom3
n29.out → n66.formula3
n22.out → n21.a
n66.out → n21.b
n6.out → n5.a
n21.out → n5.b
n76.out → n75.assertion
n77.out → n75.atom1
n20.out → n75.formula1
n81.out → n80.assertion
n82.out → n80.atom1
n20.out → n80.formula1
n83.out → n80.atom2
n13.out → n80.formula2
n85.out → n84.assertion
n13.out → n87.a
n20.out → n87.b
n20.out → n88.a
n87.out → n88.b
n86.out → n84.atom1
n88.out → n84.formula1
n89.out → n84.atom2
n20.out → n84.formula2
n80.out → n79.a
n84.out → n79.b
n91.out → n90.assertion
n92.out → n90.atom1
n20.out → n90.formula1
n93.out → n90.atom2
n20.out → n90.formula2
n94.out → n90.atom3
n87.out → n90.formula3
n79.out → n78.a
n90.out → n78.b
n75.out → n74.a
n78.out → n74.b
n10.out → n99.x
n19.out → n99.y
n12.out → n99.formula
n101.out → n100.assertion
n19.out → n103.t1
n11.out → n103.t2
n12.out → n104.a
n103.out → n104.b
n20.out → n105.a
n104.out → n105.b
n102.out → n100.atom1
n105.out → n100.formula1
n106.out → n100.atom2
n20.out → n100.formula2
n99.out → n98.a
n100.out → n98.b
n110.out → n109.assertion
n111.out → n109.atom1
n105.out → n109.formula1
n112.out → n109.atom2
n13.out → n109.formula2
n114.out → n113.assertion
n13.out → n116.a
n105.out → n116.b
n105.out → n117.a
n116.out → n117.b
n115.out → n113.atom1
n117.out → n113.formula1
n118.out → n113.atom2
n20.out → n113.formula2
n109.out → n108.a
n113.out → n108.b
n120.out → n119.assertion
n121.out → n119.atom1
n20.out → n119.formula1
n122.out → n119.atom2
n105.out → n119.formula2
n123.out → n119.atom3
n116.out → n119.formula3
n108.out → n107.a
n119.out → n107.b
n98.out → n97.a
n107.out → n97.b
n127.out → n126.assertion
n128.out → n126.atom1
n13.out → n126.formula1
n129.out → n126.atom2
n20.out → n126.formula2
n130.out → n126.atom3
n104.out → n126.formula3
n132.out → n131.assertion
n13.out → n134.a
n104.out → n134.b
n87.out → n135.a
n134.out → n135.b
n116.out → n136.a
n135.out → n136.b
n133.out → n131.atom1
n136.out → n131.formula1
n137.out → n131.atom2
n20.out → n131.formula2
n126.out → n125.a
n131.out → n125.b
n139.out → n138.assertion
n140.out → n138.atom1
n20.out → n138.formula1
n141.out → n138.atom2
n116.out → n138.formula2
n142.out → n138.atom3
n135.out → n138.formula3
n125.out → n124.a
n138.out → n124.b
n97.out → n96.a
n124.out → n96.b
n144.out → n143.assertion
n145.out → n143.atom1
n20.out → n143.formula1
n146.out → n143.atom2
n87.out → n143.formula2
n147.out → n143.atom3
n134.out → n143.formula3
n96.out → n95.a
n143.out → n95.b
n74.out → n73.a
n95.out → n73.b
n151.out → n150.assertion
n152.out → n150.atom1
n13.out → n150.formula1
n153.out → n150.atom2
n12.out → n150.formula2
n154.out → n150.atom3
n103.out → n150.formula3
n156.out → n155.assertion
n13.out → n158.a
n103.out → n158.b
n29.out → n159.a
n158.out → n159.b
n134.out → n160.a
n159.out → n160.b
n157.out → n155.atom1
n160.out → n155.formula1
n161.out → n155.atom2
n20.out → n155.formula2
n150.out → n149.a
n155.out → n149.b
n163.out → n162.assertion
n164.out → n162.atom1
n20.out → n162.formula1
n165.out → n162.atom2
n134.out → n162.formula2
n166.out → n162.atom3
n159.out → n162.formula3
n149.out → n148.a
n162.out → n148.b
n73.out → n72.a
n148.out → n72.b
n168.out → n167.assertion
n169.out → n167.atom1
n20.out → n167.formula1
n170.out → n167.atom2
n29.out → n167.formula2
n171.out → n167.atom3
n158.out → n167.formula3
n72.out → n71.a
n167.out → n71.b
n5.out → n4.a
n71.out → n4.b
n4.out → n3.assertion
n173.out → n172.assertion
n174.out → n172.atom1
n20.out → n172.formula1
n175.out → n172.atom2
n158.out → n172.formula2
n3.out → n2.a
n172.out → n2.b
n179.out → n178.assertion
n180.out → n178.atom1
n13.out → n178.formula1
n181.out → n178.atom2
n103.out → n178.formula2
n183.out → n182.assertion
n158.out → n185.a
n103.out → n186.a
n13.out → n187.a
n186.out → n187.b
n185.out → n188.a
n187.out → n188.b
n184.out → n182.atom1
n188.out → n182.formula1
n189.out → n182.atom2
n20.out → n182.formula2
n178.out → n177.a
n182.out → n177.b
n191.out → n190.assertion
n192.out → n190.atom1
n20.out → n190.formula1
n193.out → n190.atom2
n185.out → n190.formula2
n194.out → n190.atom3
n187.out → n190.formula3
n177.out → n176.a
n190.out → n176.b
n2.out → n1.a
n176.out → n1.b
n1.out → n195.proof
```

</details>

### *72 · 深层替换（双向）

- 目标：`⊢ ( x = y → ( ( F ( x ) → ( G ( x ) → F ( x ) ) ) ↔ ( F ( y ) → ( G ( y ) → F ( y ) ) ) ) )`
- 提示：正向 Leibniz 直接替换；反向先对称再 Leibniz；↔I 后 DT。
- 参考解：105 个模块 / 161 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n106  [target]
n1  mp
n2  mp
n3  subst
n4  定理 *01
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
n17  subst
n18  axiom A1
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
n32  subst
n33  axiom A1
n34  atom P
n35  imp
n36  atom Q
n37  mp
n38  mp
n39  subst
n40  定理 *05
n41  atom P
n42  atom Q
n43  atom R
n44  subst
n45  axiom A1
n46  atom P
n47  imp
n48  imp
n49  imp
n50  atom Q
n51  subst
n52  axiom A2
n53  atom P
n54  atom Q
n55  atom R
n56  subst
n57  axiom A2
n58  atom P
n59  atom Q
n60  atom R
n61  subst
n62  axiom A2
n63  atom P
n64  atom Q
n65  atom R
n66  mp
n67  mp
n68  mp
n69  subst
n70  定理 *01
n71  atom P
n72  mp
n73  mp
n74  leibniz(mode=replace, v=z)
n75  subst
n76  axiom A1
n77  atom P
n78  imp
n79  imp
n80  atom Q
n81  subst
n82  axiom A2
n83  atom P
n84  atom Q
n85  atom R
n86  mp
n87  mp
n88  iff-intro-ax
n89  subst
n90  axiom A1
n91  atom P
n92  iff
n93  imp
n94  imp
n95  atom Q
n96  subst
n97  axiom A2
n98  atom P
n99  atom Q
n100  atom R
n101  subst
n102  axiom A2
n103  atom P
n104  atom Q
n105  atom R

接线：
n4.out → n3.assertion
n6.out → n8.t1
n7.out → n8.t2
n5.out → n3.atom1
n8.out → n3.formula1
n7.out → n12.x
n6.out → n12.y
n7.out → n13.t1
n7.out → n14.t1
n14.out → n15.a
n13.out → n15.b
n13.out → n16.a
n15.out → n16.b
n16.out → n12.formula
n18.out → n17.assertion
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
n19.out → n17.atom1
n26.out → n17.formula1
n27.out → n17.atom2
n8.out → n17.formula2
n12.out → n11.a
n17.out → n11.b
n33.out → n32.assertion
n8.out → n35.a
n20.out → n35.b
n34.out → n32.atom1
n35.out → n32.formula1
n36.out → n32.atom2
n8.out → n32.formula2
n31.out → n30.a
n32.out → n30.b
n40.out → n39.assertion
n41.out → n39.atom1
n8.out → n39.formula1
n42.out → n39.atom2
n20.out → n39.formula2
n43.out → n39.atom3
n25.out → n39.formula3
n45.out → n44.assertion
n8.out → n47.a
n25.out → n47.b
n26.out → n48.a
n47.out → n48.b
n35.out → n49.a
n48.out → n49.b
n46.out → n44.atom1
n49.out → n44.formula1
n50.out → n44.atom2
n8.out → n44.formula2
n39.out → n38.a
n44.out → n38.b
n52.out → n51.assertion
n53.out → n51.atom1
n8.out → n51.formula1
n54.out → n51.atom2
n35.out → n51.formula2
n55.out → n51.atom3
n48.out → n51.formula3
n38.out → n37.a
n51.out → n37.b
n30.out → n29.a
n37.out → n29.b
n57.out → n56.assertion
n58.out → n56.atom1
n8.out → n56.formula1
n59.out → n56.atom2
n26.out → n56.formula2
n60.out → n56.atom3
n47.out → n56.formula3
n29.out → n28.a
n56.out → n28.b
n11.out → n10.a
n28.out → n10.b
n62.out → n61.assertion
n63.out → n61.atom1
n8.out → n61.formula1
n64.out → n61.atom2
n8.out → n61.formula2
n65.out → n61.atom3
n25.out → n61.formula3
n10.out → n9.a
n61.out → n9.b
n3.out → n2.a
n9.out → n2.b
n70.out → n69.assertion
n71.out → n69.atom1
n8.out → n69.formula1
n6.out → n74.x
n7.out → n74.y
n24.out → n74.formula
n76.out → n75.assertion
n24.out → n78.a
n16.out → n78.b
n8.out → n79.a
n78.out → n79.b
n77.out → n75.atom1
n79.out → n75.formula1
n80.out → n75.atom2
n8.out → n75.formula2
n74.out → n73.a
n75.out → n73.b
n82.out → n81.assertion
n83.out → n81.atom1
n8.out → n81.formula1
n84.out → n81.atom2
n8.out → n81.formula2
n85.out → n81.atom3
n78.out → n81.formula3
n73.out → n72.a
n81.out → n72.b
n69.out → n68.a
n72.out → n68.b
n24.out → n88.a
n16.out → n88.b
n90.out → n89.assertion
n24.out → n92.a
n16.out → n92.b
n25.out → n93.a
n92.out → n93.b
n78.out → n94.a
n93.out → n94.b
n91.out → n89.atom1
n94.out → n89.formula1
n95.out → n89.atom2
n8.out → n89.formula2
n88.out → n87.a
n89.out → n87.b
n97.out → n96.assertion
n98.out → n96.atom1
n8.out → n96.formula1
n99.out → n96.atom2
n78.out → n96.formula2
n100.out → n96.atom3
n93.out → n96.formula3
n87.out → n86.a
n96.out → n86.b
n68.out → n67.a
n86.out → n67.b
n102.out → n101.assertion
n103.out → n101.atom1
n8.out → n101.formula1
n104.out → n101.atom2
n25.out → n101.formula2
n105.out → n101.atom3
n92.out → n101.formula3
n67.out → n66.a
n101.out → n66.b
n2.out → n1.a
n66.out → n1.b
n1.out → n106.proof
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
- 参考解：50 个模块 / 78 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n51  [target]
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
n14  subst
n15  定理 *05
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
n28  all-inst(v=z)
n29  subst
n30  定理 *05
n31  atom P
n32  atom Q
n33  atom R
n34  imp
n35  subst
n36  定理 *05
n37  atom P
n38  atom Q
n39  atom R
n40  iff
n41  imp
n42  subst
n43  axiom A2
n44  atom P
n45  atom Q
n46  atom R
n47  subst
n48  定理 *64
n49  atom P
n50  atom Q

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
n15.out → n14.assertion
n13.out → n17.a
n16.out → n14.atom1
n17.out → n14.formula1
n18.out → n14.atom2
n13.out → n14.formula2
n8.out → n20.a
n10.out → n20.b
n19.out → n14.atom3
n20.out → n14.formula3
n12.out → n11.a
n14.out → n11.b
n5.out → n4.a
n11.out → n4.b
n10.out → n23.a
n8.out → n23.b
n8.out → n26.a
n10.out → n26.b
n13.out → n28.formula
n6.out → n28.term
n30.out → n29.assertion
n31.out → n29.atom1
n17.out → n29.formula1
n32.out → n29.atom2
n13.out → n29.formula2
n10.out → n34.a
n8.out → n34.b
n33.out → n29.atom3
n34.out → n29.formula3
n28.out → n27.a
n29.out → n27.b
n26.out → n25.a
n27.out → n25.b
n36.out → n35.assertion
n37.out → n35.atom1
n17.out → n35.formula1
n38.out → n35.atom2
n34.out → n35.formula2
n10.out → n40.a
n8.out → n40.b
n20.out → n41.a
n40.out → n41.b
n39.out → n35.atom3
n41.out → n35.formula3
n25.out → n24.a
n35.out → n24.b
n23.out → n22.a
n24.out → n22.b
n43.out → n42.assertion
n44.out → n42.atom1
n17.out → n42.formula1
n45.out → n42.atom2
n20.out → n42.formula2
n46.out → n42.atom3
n40.out → n42.formula3
n22.out → n21.a
n42.out → n21.b
n4.out → n3.a
n21.out → n3.b
n3.out → n2.assertion
n48.out → n47.assertion
n49.out → n47.atom1
n17.out → n47.formula1
n50.out → n47.atom2
n40.out → n47.formula2
n2.out → n1.a
n47.out → n1.b
n1.out → n51.proof
```

</details>

### *74 · 元素等价的两个方向

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ x → z ∈ y ) ∧ ∀ z ( z ∈ y → z ∈ x ) ) )`
- 提示：分别用 ↔E 取两个方向，各自推广并移动 ∀，最后用 ∧I 与 A2 合并。
- 参考解：58 个模块 / 88 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n59  [target]
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
n14  subst
n15  定理 *05
n16  atom P
n17  all(v=z)
n18  atom Q
n19  atom R
n20  imp
n21  subst
n22  定理 *64
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
n37  all-inst(v=z)
n38  subst
n39  定理 *05
n40  atom P
n41  atom Q
n42  atom R
n43  subst
n44  定理 *64
n45  atom P
n46  atom Q
n47  subst
n48  定理 *05
n49  atom P
n50  atom Q
n51  atom R
n52  and
n53  imp
n54  subst
n55  axiom A2
n56  atom P
n57  atom Q
n58  atom R

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
n15.out → n14.assertion
n13.out → n17.a
n16.out → n14.atom1
n17.out → n14.formula1
n18.out → n14.atom2
n13.out → n14.formula2
n10.out → n20.a
n8.out → n20.b
n19.out → n14.atom3
n20.out → n14.formula3
n12.out → n11.a
n14.out → n11.b
n5.out → n4.a
n11.out → n4.b
n4.out → n3.assertion
n22.out → n21.assertion
n23.out → n21.atom1
n17.out → n21.formula1
n24.out → n21.atom2
n20.out → n21.formula2
n3.out → n2.a
n21.out → n2.b
n8.out → n28.a
n10.out → n28.b
n28.out → n29.a
n29.out → n27.a
n20.out → n30.a
n30.out → n27.b
n8.out → n35.a
n10.out → n35.b
n13.out → n37.formula
n6.out → n37.term
n39.out → n38.assertion
n40.out → n38.atom1
n17.out → n38.formula1
n41.out → n38.atom2
n13.out → n38.formula2
n42.out → n38.atom3
n28.out → n38.formula3
n37.out → n36.a
n38.out → n36.b
n35.out → n34.a
n36.out → n34.b
n34.out → n33.assertion
n44.out → n43.assertion
n45.out → n43.atom1
n17.out → n43.formula1
n46.out → n43.atom2
n28.out → n43.formula2
n33.out → n32.a
n43.out → n32.b
n48.out → n47.assertion
n49.out → n47.atom1
n17.out → n47.formula1
n50.out → n47.atom2
n29.out → n47.formula2
n29.out → n52.a
n30.out → n52.b
n30.out → n53.a
n52.out → n53.b
n51.out → n47.atom3
n53.out → n47.formula3
n32.out → n31.a
n47.out → n31.b
n27.out → n26.a
n31.out → n26.b
n55.out → n54.assertion
n56.out → n54.atom1
n17.out → n54.formula1
n57.out → n54.atom2
n30.out → n54.formula2
n58.out → n54.atom3
n52.out → n54.formula3
n26.out → n25.a
n54.out → n25.b
n2.out → n1.a
n25.out → n1.b
n1.out → n59.proof
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
n20  subst
n21  定理 *05
n22  atom P
n23  iff
n24  all(v=z)
n25  atom Q
n26  atom R
n27  and
n28  imp
n29  subst
n30  axiom A2
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
n21.out → n20.assertion
n8.out → n23.a
n10.out → n23.b
n23.out → n24.a
n22.out → n20.atom1
n24.out → n20.formula1
n25.out → n20.atom2
n15.out → n20.formula2
n15.out → n27.a
n17.out → n27.b
n17.out → n28.a
n27.out → n28.b
n26.out → n20.atom3
n28.out → n20.formula3
n19.out → n18.a
n20.out → n18.b
n5.out → n4.a
n18.out → n4.b
n30.out → n29.assertion
n31.out → n29.atom1
n24.out → n29.formula1
n32.out → n29.atom2
n17.out → n29.formula2
n33.out → n29.atom3
n27.out → n29.formula3
n4.out → n3.a
n29.out → n3.b
n2.out → n1.a
n3.out → n1.b
n1.out → n34.proof
```

</details>

### *76 · 元素等价的逐点传递

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ u ) → ( z ∈ x ↔ z ∈ u ) ) )`
- 提示：假设两个全称等价，逐点取出两个方向，用 HS 串起来再重建 ↔。
- 参考解：726 个模块 / 1101 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n727  [target]
n1  mp
n2  mp
n3  mp
n4  mp
n5  mp
n6  subst
n7  定理 *01
n8  atom P
n9  term z
n10  term x
n11  mem
n12  term y
n13  mem
n14  iff
n15  all(v=z)
n16  mp
n17  mp
n18  subst
n19  axiom A1
n20  atom P
n21  atom Q
n22  term u
n23  mem
n24  iff
n25  all(v=z)
n26  subst
n27  axiom A1
n28  atom P
n29  imp
n30  imp
n31  atom Q
n32  subst
n33  axiom A2
n34  atom P
n35  atom Q
n36  atom R
n37  mp
n38  mp
n39  mp
n40  mp
n41  all-inst(v=z)
n42  subst
n43  axiom A1
n44  atom P
n45  imp
n46  atom Q
n47  mp
n48  mp
n49  subst
n50  axiom A1
n51  atom P
n52  atom Q
n53  subst
n54  axiom A1
n55  atom P
n56  imp
n57  imp
n58  atom Q
n59  subst
n60  axiom A2
n61  atom P
n62  atom Q
n63  atom R
n64  mp
n65  mp
n66  subst
n67  axiom A2
n68  atom P
n69  atom Q
n70  atom R
n71  subst
n72  axiom A1
n73  atom P
n74  imp
n75  imp
n76  imp
n77  atom Q
n78  subst
n79  axiom A2
n80  atom P
n81  atom Q
n82  atom R
n83  subst
n84  axiom A2
n85  atom P
n86  atom Q
n87  atom R
n88  mp
n89  mp
n90  mp
n91  mp
n92  iff-elim-ax(dir=rl)
n93  subst
n94  axiom A1
n95  atom P
n96  imp
n97  imp
n98  atom Q
n99  mp
n100  mp
n101  subst
n102  axiom A1
n103  atom P
n104  atom Q
n105  subst
n106  axiom A1
n107  atom P
n108  imp
n109  imp
n110  atom Q
n111  subst
n112  axiom A2
n113  atom P
n114  atom Q
n115  atom R
n116  mp
n117  mp
n118  subst
n119  axiom A2
n120  atom P
n121  atom Q
n122  atom R
n123  subst
n124  axiom A1
n125  atom P
n126  imp
n127  imp
n128  imp
n129  atom Q
n130  subst
n131  axiom A2
n132  atom P
n133  atom Q
n134  atom R
n135  subst
n136  axiom A2
n137  atom P
n138  atom Q
n139  atom R
n140  mp
n141  mp
n142  mp
n143  mp
n144  mp
n145  mp
n146  subst
n147  定理 *01
n148  atom P
n149  subst
n150  axiom A1
n151  atom P
n152  imp
n153  atom Q
n154  mp
n155  mp
n156  mp
n157  mp
n158  all-inst(v=z)
n159  subst
n160  axiom A1
n161  atom P
n162  imp
n163  atom Q
n164  mp
n165  mp
n166  subst
n167  axiom A1
n168  atom P
n169  atom Q
n170  subst
n171  axiom A1
n172  atom P
n173  imp
n174  imp
n175  atom Q
n176  subst
n177  axiom A2
n178  atom P
n179  atom Q
n180  atom R
n181  mp
n182  mp
n183  subst
n184  axiom A2
n185  atom P
n186  atom Q
n187  atom R
n188  subst
n189  axiom A1
n190  atom P
n191  imp
n192  imp
n193  atom Q
n194  subst
n195  axiom A2
n196  atom P
n197  atom Q
n198  atom R
n199  subst
n200  axiom A2
n201  atom P
n202  atom Q
n203  atom R
n204  mp
n205  mp
n206  mp
n207  mp
n208  iff-elim-ax(dir=rl)
n209  subst
n210  axiom A1
n211  atom P
n212  imp
n213  imp
n214  atom Q
n215  mp
n216  mp
n217  subst
n218  axiom A1
n219  atom P
n220  atom Q
n221  subst
n222  axiom A1
n223  atom P
n224  imp
n225  imp
n226  atom Q
n227  subst
n228  axiom A2
n229  atom P
n230  atom Q
n231  atom R
n232  mp
n233  mp
n234  subst
n235  axiom A2
n236  atom P
n237  atom Q
n238  atom R
n239  subst
n240  axiom A1
n241  atom P
n242  imp
n243  imp
n244  imp
n245  atom Q
n246  subst
n247  axiom A2
n248  atom P
n249  atom Q
n250  atom R
n251  subst
n252  axiom A2
n253  atom P
n254  atom Q
n255  atom R
n256  mp
n257  mp
n258  mp
n259  mp
n260  subst
n261  定理 *05
n262  atom P
n263  atom Q
n264  atom R
n265  subst
n266  axiom A1
n267  atom P
n268  imp
n269  imp
n270  imp
n271  atom Q
n272  mp
n273  mp
n274  subst
n275  axiom A1
n276  atom P
n277  atom Q
n278  subst
n279  axiom A1
n280  atom P
n281  imp
n282  imp
n283  atom Q
n284  subst
n285  axiom A2
n286  atom P
n287  atom Q
n288  atom R
n289  mp
n290  mp
n291  subst
n292  axiom A2
n293  atom P
n294  atom Q
n295  atom R
n296  subst
n297  axiom A1
n298  atom P
n299  imp
n300  imp
n301  imp
n302  atom Q
n303  subst
n304  axiom A2
n305  atom P
n306  atom Q
n307  atom R
n308  subst
n309  axiom A2
n310  atom P
n311  atom Q
n312  atom R
n313  mp
n314  mp
n315  subst
n316  axiom A2
n317  atom P
n318  atom Q
n319  atom R
n320  subst
n321  axiom A1
n322  atom P
n323  imp
n324  imp
n325  imp
n326  atom Q
n327  subst
n328  axiom A2
n329  atom P
n330  atom Q
n331  atom R
n332  subst
n333  axiom A2
n334  atom P
n335  atom Q
n336  atom R
n337  mp
n338  mp
n339  mp
n340  mp
n341  mp
n342  mp
n343  mp
n344  subst
n345  定理 *01
n346  atom P
n347  subst
n348  axiom A1
n349  atom P
n350  atom Q
n351  mp
n352  mp
n353  mp
n354  mp
n355  all-inst(v=z)
n356  subst
n357  axiom A1
n358  atom P
n359  atom Q
n360  mp
n361  mp
n362  subst
n363  axiom A1
n364  atom P
n365  atom Q
n366  subst
n367  axiom A1
n368  atom P
n369  atom Q
n370  subst
n371  axiom A2
n372  atom P
n373  atom Q
n374  atom R
n375  mp
n376  mp
n377  subst
n378  axiom A2
n379  atom P
n380  atom Q
n381  atom R
n382  subst
n383  axiom A1
n384  atom P
n385  atom Q
n386  subst
n387  axiom A2
n388  atom P
n389  atom Q
n390  atom R
n391  subst
n392  axiom A2
n393  atom P
n394  atom Q
n395  atom R
n396  mp
n397  mp
n398  mp
n399  mp
n400  iff-elim-ax(dir=lr)
n401  subst
n402  axiom A1
n403  atom P
n404  imp
n405  imp
n406  atom Q
n407  mp
n408  mp
n409  subst
n410  axiom A1
n411  atom P
n412  atom Q
n413  subst
n414  axiom A1
n415  atom P
n416  imp
n417  imp
n418  atom Q
n419  subst
n420  axiom A2
n421  atom P
n422  atom Q
n423  atom R
n424  mp
n425  mp
n426  subst
n427  axiom A2
n428  atom P
n429  atom Q
n430  atom R
n431  subst
n432  axiom A1
n433  atom P
n434  imp
n435  imp
n436  imp
n437  atom Q
n438  subst
n439  axiom A2
n440  atom P
n441  atom Q
n442  atom R
n443  subst
n444  axiom A2
n445  atom P
n446  atom Q
n447  atom R
n448  mp
n449  mp
n450  mp
n451  mp
n452  mp
n453  mp
n454  subst
n455  定理 *01
n456  atom P
n457  mp
n458  mp
n459  subst
n460  axiom A1
n461  atom P
n462  atom Q
n463  subst
n464  axiom A1
n465  atom P
n466  atom Q
n467  subst
n468  axiom A2
n469  atom P
n470  atom Q
n471  atom R
n472  mp
n473  mp
n474  mp
n475  mp
n476  all-inst(v=z)
n477  subst
n478  axiom A1
n479  atom P
n480  atom Q
n481  mp
n482  mp
n483  subst
n484  axiom A1
n485  atom P
n486  atom Q
n487  subst
n488  axiom A1
n489  atom P
n490  atom Q
n491  subst
n492  axiom A2
n493  atom P
n494  atom Q
n495  atom R
n496  mp
n497  mp
n498  subst
n499  axiom A2
n500  atom P
n501  atom Q
n502  atom R
n503  subst
n504  axiom A1
n505  atom P
n506  atom Q
n507  subst
n508  axiom A2
n509  atom P
n510  atom Q
n511  atom R
n512  subst
n513  axiom A2
n514  atom P
n515  atom Q
n516  atom R
n517  mp
n518  mp
n519  mp
n520  mp
n521  iff-elim-ax(dir=lr)
n522  subst
n523  axiom A1
n524  atom P
n525  imp
n526  imp
n527  atom Q
n528  mp
n529  mp
n530  subst
n531  axiom A1
n532  atom P
n533  atom Q
n534  subst
n535  axiom A1
n536  atom P
n537  imp
n538  imp
n539  atom Q
n540  subst
n541  axiom A2
n542  atom P
n543  atom Q
n544  atom R
n545  mp
n546  mp
n547  subst
n548  axiom A2
n549  atom P
n550  atom Q
n551  atom R
n552  subst
n553  axiom A1
n554  atom P
n555  imp
n556  imp
n557  imp
n558  atom Q
n559  subst
n560  axiom A2
n561  atom P
n562  atom Q
n563  atom R
n564  subst
n565  axiom A2
n566  atom P
n567  atom Q
n568  atom R
n569  mp
n570  mp
n571  mp
n572  mp
n573  subst
n574  定理 *05
n575  atom P
n576  atom Q
n577  atom R
n578  subst
n579  axiom A1
n580  atom P
n581  imp
n582  imp
n583  imp
n584  atom Q
n585  mp
n586  mp
n587  subst
n588  axiom A1
n589  atom P
n590  atom Q
n591  subst
n592  axiom A1
n593  atom P
n594  imp
n595  imp
n596  atom Q
n597  subst
n598  axiom A2
n599  atom P
n600  atom Q
n601  atom R
n602  mp
n603  mp
n604  subst
n605  axiom A2
n606  atom P
n607  atom Q
n608  atom R
n609  subst
n610  axiom A1
n611  atom P
n612  imp
n613  imp
n614  imp
n615  atom Q
n616  subst
n617  axiom A2
n618  atom P
n619  atom Q
n620  atom R
n621  subst
n622  axiom A2
n623  atom P
n624  atom Q
n625  atom R
n626  mp
n627  mp
n628  subst
n629  axiom A2
n630  atom P
n631  atom Q
n632  atom R
n633  subst
n634  axiom A1
n635  atom P
n636  imp
n637  imp
n638  imp
n639  atom Q
n640  subst
n641  axiom A2
n642  atom P
n643  atom Q
n644  atom R
n645  subst
n646  axiom A2
n647  atom P
n648  atom Q
n649  atom R
n650  mp
n651  mp
n652  mp
n653  mp
n654  iff-intro-ax
n655  subst
n656  axiom A1
n657  atom P
n658  iff
n659  imp
n660  imp
n661  atom Q
n662  mp
n663  mp
n664  subst
n665  axiom A1
n666  atom P
n667  atom Q
n668  subst
n669  axiom A1
n670  atom P
n671  imp
n672  imp
n673  atom Q
n674  subst
n675  axiom A2
n676  atom P
n677  atom Q
n678  atom R
n679  mp
n680  mp
n681  subst
n682  axiom A2
n683  atom P
n684  atom Q
n685  atom R
n686  subst
n687  axiom A1
n688  atom P
n689  imp
n690  imp
n691  imp
n692  atom Q
n693  subst
n694  axiom A2
n695  atom P
n696  atom Q
n697  atom R
n698  subst
n699  axiom A2
n700  atom P
n701  atom Q
n702  atom R
n703  mp
n704  mp
n705  subst
n706  axiom A2
n707  atom P
n708  atom Q
n709  atom R
n710  subst
n711  axiom A1
n712  atom P
n713  imp
n714  imp
n715  imp
n716  atom Q
n717  subst
n718  axiom A2
n719  atom P
n720  atom Q
n721  atom R
n722  subst
n723  axiom A2
n724  atom P
n725  atom Q
n726  atom R

接线：
n7.out → n6.assertion
n9.out → n11.a
n10.out → n11.b
n9.out → n13.a
n12.out → n13.b
n11.out → n14.a
n13.out → n14.b
n14.out → n15.a
n8.out → n6.atom1
n15.out → n6.formula1
n19.out → n18.assertion
n20.out → n18.atom1
n15.out → n18.formula1
n9.out → n23.a
n22.out → n23.b
n13.out → n24.a
n23.out → n24.b
n24.out → n25.a
n21.out → n18.atom2
n25.out → n18.formula2
n27.out → n26.assertion
n25.out → n29.a
n15.out → n29.b
n15.out → n30.a
n29.out → n30.b
n28.out → n26.atom1
n30.out → n26.formula1
n31.out → n26.atom2
n15.out → n26.formula2
n18.out → n17.a
n26.out → n17.b
n33.out → n32.assertion
n34.out → n32.atom1
n15.out → n32.formula1
n35.out → n32.atom2
n15.out → n32.formula2
n36.out → n32.atom3
n29.out → n32.formula3
n17.out → n16.a
n32.out → n16.b
n6.out → n5.a
n16.out → n5.b
n14.out → n41.formula
n9.out → n41.term
n43.out → n42.assertion
n15.out → n45.a
n14.out → n45.b
n44.out → n42.atom1
n45.out → n42.formula1
n46.out → n42.atom2
n15.out → n42.formula2
n41.out → n40.a
n42.out → n40.b
n50.out → n49.assertion
n51.out → n49.atom1
n45.out → n49.formula1
n52.out → n49.atom2
n25.out → n49.formula2
n54.out → n53.assertion
n25.out → n56.a
n45.out → n56.b
n45.out → n57.a
n56.out → n57.b
n55.out → n53.atom1
n57.out → n53.formula1
n58.out → n53.atom2
n15.out → n53.formula2
n49.out → n48.a
n53.out → n48.b
n60.out → n59.assertion
n61.out → n59.atom1
n15.out → n59.formula1
n62.out → n59.atom2
n45.out → n59.formula2
n63.out → n59.atom3
n56.out → n59.formula3
n48.out → n47.a
n59.out → n47.b
n40.out → n39.a
n47.out → n39.b
n67.out → n66.assertion
n68.out → n66.atom1
n25.out → n66.formula1
n69.out → n66.atom2
n15.out → n66.formula2
n70.out → n66.atom3
n14.out → n66.formula3
n72.out → n71.assertion
n25.out → n74.a
n14.out → n74.b
n29.out → n75.a
n74.out → n75.b
n56.out → n76.a
n75.out → n76.b
n73.out → n71.atom1
n76.out → n71.formula1
n77.out → n71.atom2
n15.out → n71.formula2
n66.out → n65.a
n71.out → n65.b
n79.out → n78.assertion
n80.out → n78.atom1
n15.out → n78.formula1
n81.out → n78.atom2
n56.out → n78.formula2
n82.out → n78.atom3
n75.out → n78.formula3
n65.out → n64.a
n78.out → n64.b
n39.out → n38.a
n64.out → n38.b
n84.out → n83.assertion
n85.out → n83.atom1
n15.out → n83.formula1
n86.out → n83.atom2
n29.out → n83.formula2
n87.out → n83.atom3
n74.out → n83.formula3
n38.out → n37.a
n83.out → n37.b
n5.out → n4.a
n37.out → n4.b
n11.out → n92.a
n13.out → n92.b
n94.out → n93.assertion
n13.out → n96.a
n11.out → n96.b
n14.out → n97.a
n96.out → n97.b
n95.out → n93.atom1
n97.out → n93.formula1
n98.out → n93.atom2
n15.out → n93.formula2
n92.out → n91.a
n93.out → n91.b
n102.out → n101.assertion
n103.out → n101.atom1
n97.out → n101.formula1
n104.out → n101.atom2
n25.out → n101.formula2
n106.out → n105.assertion
n25.out → n108.a
n97.out → n108.b
n97.out → n109.a
n108.out → n109.b
n107.out → n105.atom1
n109.out → n105.formula1
n110.out → n105.atom2
n15.out → n105.formula2
n101.out → n100.a
n105.out → n100.b
n112.out → n111.assertion
n113.out → n111.atom1
n15.out → n111.formula1
n114.out → n111.atom2
n97.out → n111.formula2
n115.out → n111.atom3
n108.out → n111.formula3
n100.out → n99.a
n111.out → n99.b
n91.out → n90.a
n99.out → n90.b
n119.out → n118.assertion
n120.out → n118.atom1
n25.out → n118.formula1
n121.out → n118.atom2
n14.out → n118.formula2
n122.out → n118.atom3
n96.out → n118.formula3
n124.out → n123.assertion
n25.out → n126.a
n96.out → n126.b
n74.out → n127.a
n126.out → n127.b
n108.out → n128.a
n127.out → n128.b
n125.out → n123.atom1
n128.out → n123.formula1
n129.out → n123.atom2
n15.out → n123.formula2
n118.out → n117.a
n123.out → n117.b
n131.out → n130.assertion
n132.out → n130.atom1
n15.out → n130.formula1
n133.out → n130.atom2
n108.out → n130.formula2
n134.out → n130.atom3
n127.out → n130.formula3
n117.out → n116.a
n130.out → n116.b
n90.out → n89.a
n116.out → n89.b
n136.out → n135.assertion
n137.out → n135.atom1
n15.out → n135.formula1
n138.out → n135.atom2
n74.out → n135.formula2
n139.out → n135.atom3
n126.out → n135.formula3
n89.out → n88.a
n135.out → n88.b
n4.out → n3.a
n88.out → n3.b
n147.out → n146.assertion
n148.out → n146.atom1
n25.out → n146.formula1
n150.out → n149.assertion
n25.out → n152.a
n25.out → n152.b
n151.out → n149.atom1
n152.out → n149.formula1
n153.out → n149.atom2
n15.out → n149.formula2
n146.out → n145.a
n149.out → n145.b
n24.out → n158.formula
n9.out → n158.term
n160.out → n159.assertion
n25.out → n162.a
n24.out → n162.b
n161.out → n159.atom1
n162.out → n159.formula1
n163.out → n159.atom2
n15.out → n159.formula2
n158.out → n157.a
n159.out → n157.b
n167.out → n166.assertion
n168.out → n166.atom1
n162.out → n166.formula1
n169.out → n166.atom2
n25.out → n166.formula2
n171.out → n170.assertion
n25.out → n173.a
n162.out → n173.b
n162.out → n174.a
n173.out → n174.b
n172.out → n170.atom1
n174.out → n170.formula1
n175.out → n170.atom2
n15.out → n170.formula2
n166.out → n165.a
n170.out → n165.b
n177.out → n176.assertion
n178.out → n176.atom1
n15.out → n176.formula1
n179.out → n176.atom2
n162.out → n176.formula2
n180.out → n176.atom3
n173.out → n176.formula3
n165.out → n164.a
n176.out → n164.b
n157.out → n156.a
n164.out → n156.b
n184.out → n183.assertion
n185.out → n183.atom1
n25.out → n183.formula1
n186.out → n183.atom2
n25.out → n183.formula2
n187.out → n183.atom3
n24.out → n183.formula3
n189.out → n188.assertion
n152.out → n191.a
n162.out → n191.b
n173.out → n192.a
n191.out → n192.b
n190.out → n188.atom1
n192.out → n188.formula1
n193.out → n188.atom2
n15.out → n188.formula2
n183.out → n182.a
n188.out → n182.b
n195.out → n194.assertion
n196.out → n194.atom1
n15.out → n194.formula1
n197.out → n194.atom2
n173.out → n194.formula2
n198.out → n194.atom3
n191.out → n194.formula3
n182.out → n181.a
n194.out → n181.b
n156.out → n155.a
n181.out → n155.b
n200.out → n199.assertion
n201.out → n199.atom1
n15.out → n199.formula1
n202.out → n199.atom2
n152.out → n199.formula2
n203.out → n199.atom3
n162.out → n199.formula3
n155.out → n154.a
n199.out → n154.b
n145.out → n144.a
n154.out → n144.b
n13.out → n208.a
n23.out → n208.b
n210.out → n209.assertion
n23.out → n212.a
n13.out → n212.b
n24.out → n213.a
n212.out → n213.b
n211.out → n209.atom1
n213.out → n209.formula1
n214.out → n209.atom2
n15.out → n209.formula2
n208.out → n207.a
n209.out → n207.b
n218.out → n217.assertion
n219.out → n217.atom1
n213.out → n217.formula1
n220.out → n217.atom2
n25.out → n217.formula2
n222.out → n221.assertion
n25.out → n224.a
n213.out → n224.b
n213.out → n225.a
n224.out → n225.b
n223.out → n221.atom1
n225.out → n221.formula1
n226.out → n221.atom2
n15.out → n221.formula2
n217.out → n216.a
n221.out → n216.b
n228.out → n227.assertion
n229.out → n227.atom1
n15.out → n227.formula1
n230.out → n227.atom2
n213.out → n227.formula2
n231.out → n227.atom3
n224.out → n227.formula3
n216.out → n215.a
n227.out → n215.b
n207.out → n206.a
n215.out → n206.b
n235.out → n234.assertion
n236.out → n234.atom1
n25.out → n234.formula1
n237.out → n234.atom2
n24.out → n234.formula2
n238.out → n234.atom3
n212.out → n234.formula3
n240.out → n239.assertion
n25.out → n242.a
n212.out → n242.b
n162.out → n243.a
n242.out → n243.b
n224.out → n244.a
n243.out → n244.b
n241.out → n239.atom1
n244.out → n239.formula1
n245.out → n239.atom2
n15.out → n239.formula2
n234.out → n233.a
n239.out → n233.b
n247.out → n246.assertion
n248.out → n246.atom1
n15.out → n246.formula1
n249.out → n246.atom2
n224.out → n246.formula2
n250.out → n246.atom3
n243.out → n246.formula3
n233.out → n232.a
n246.out → n232.b
n206.out → n205.a
n232.out → n205.b
n252.out → n251.assertion
n253.out → n251.atom1
n15.out → n251.formula1
n254.out → n251.atom2
n162.out → n251.formula2
n255.out → n251.atom3
n242.out → n251.formula3
n205.out → n204.a
n251.out → n204.b
n144.out → n143.a
n204.out → n143.b
n261.out → n260.assertion
n262.out → n260.atom1
n23.out → n260.formula1
n263.out → n260.atom2
n13.out → n260.formula2
n264.out → n260.atom3
n11.out → n260.formula3
n266.out → n265.assertion
n23.out → n268.a
n11.out → n268.b
n96.out → n269.a
n268.out → n269.b
n212.out → n270.a
n269.out → n270.b
n267.out → n265.atom1
n270.out → n265.formula1
n271.out → n265.atom2
n15.out → n265.formula2
n260.out → n259.a
n265.out → n259.b
n275.out → n274.assertion
n276.out → n274.atom1
n270.out → n274.formula1
n277.out → n274.atom2
n25.out → n274.formula2
n279.out → n278.assertion
n25.out → n281.a
n270.out → n281.b
n270.out → n282.a
n281.out → n282.b
n280.out → n278.atom1
n282.out → n278.formula1
n283.out → n278.atom2
n15.out → n278.formula2
n274.out → n273.a
n278.out → n273.b
n285.out → n284.assertion
n286.out → n284.atom1
n15.out → n284.formula1
n287.out → n284.atom2
n270.out → n284.formula2
n288.out → n284.atom3
n281.out → n284.formula3
n273.out → n272.a
n284.out → n272.b
n259.out → n258.a
n272.out → n258.b
n292.out → n291.assertion
n293.out → n291.atom1
n25.out → n291.formula1
n294.out → n291.atom2
n212.out → n291.formula2
n295.out → n291.atom3
n269.out → n291.formula3
n297.out → n296.assertion
n25.out → n299.a
n269.out → n299.b
n242.out → n300.a
n299.out → n300.b
n281.out → n301.a
n300.out → n301.b
n298.out → n296.atom1
n301.out → n296.formula1
n302.out → n296.atom2
n15.out → n296.formula2
n291.out → n290.a
n296.out → n290.b
n304.out → n303.assertion
n305.out → n303.atom1
n15.out → n303.formula1
n306.out → n303.atom2
n281.out → n303.formula2
n307.out → n303.atom3
n300.out → n303.formula3
n290.out → n289.a
n303.out → n289.b
n258.out → n257.a
n289.out → n257.b
n309.out → n308.assertion
n310.out → n308.atom1
n15.out → n308.formula1
n311.out → n308.atom2
n242.out → n308.formula2
n312.out → n308.atom3
n299.out → n308.formula3
n257.out → n256.a
n308.out → n256.b
n143.out → n142.a
n256.out → n142.b
n316.out → n315.assertion
n317.out → n315.atom1
n25.out → n315.formula1
n318.out → n315.atom2
n96.out → n315.formula2
n319.out → n315.atom3
n268.out → n315.formula3
n321.out → n320.assertion
n25.out → n323.a
n268.out → n323.b
n126.out → n324.a
n323.out → n324.b
n299.out → n325.a
n324.out → n325.b
n322.out → n320.atom1
n325.out → n320.formula1
n326.out → n320.atom2
n15.out → n320.formula2
n315.out → n314.a
n320.out → n314.b
n328.out → n327.assertion
n329.out → n327.atom1
n15.out → n327.formula1
n330.out → n327.atom2
n299.out → n327.formula2
n331.out → n327.atom3
n324.out → n327.formula3
n314.out → n313.a
n327.out → n313.b
n142.out → n141.a
n313.out → n141.b
n333.out → n332.assertion
n334.out → n332.atom1
n15.out → n332.formula1
n335.out → n332.atom2
n126.out → n332.formula2
n336.out → n332.atom3
n323.out → n332.formula3
n141.out → n140.a
n332.out → n140.b
n3.out → n2.a
n140.out → n2.b
n345.out → n344.assertion
n346.out → n344.atom1
n25.out → n344.formula1
n348.out → n347.assertion
n349.out → n347.atom1
n152.out → n347.formula1
n350.out → n347.atom2
n15.out → n347.formula2
n344.out → n343.a
n347.out → n343.b
n24.out → n355.formula
n9.out → n355.term
n357.out → n356.assertion
n358.out → n356.atom1
n162.out → n356.formula1
n359.out → n356.atom2
n15.out → n356.formula2
n355.out → n354.a
n356.out → n354.b
n363.out → n362.assertion
n364.out → n362.atom1
n162.out → n362.formula1
n365.out → n362.atom2
n25.out → n362.formula2
n367.out → n366.assertion
n368.out → n366.atom1
n174.out → n366.formula1
n369.out → n366.atom2
n15.out → n366.formula2
n362.out → n361.a
n366.out → n361.b
n371.out → n370.assertion
n372.out → n370.atom1
n15.out → n370.formula1
n373.out → n370.atom2
n162.out → n370.formula2
n374.out → n370.atom3
n173.out → n370.formula3
n361.out → n360.a
n370.out → n360.b
n354.out → n353.a
n360.out → n353.b
n378.out → n377.assertion
n379.out → n377.atom1
n25.out → n377.formula1
n380.out → n377.atom2
n25.out → n377.formula2
n381.out → n377.atom3
n24.out → n377.formula3
n383.out → n382.assertion
n384.out → n382.atom1
n192.out → n382.formula1
n385.out → n382.atom2
n15.out → n382.formula2
n377.out → n376.a
n382.out → n376.b
n387.out → n386.assertion
n388.out → n386.atom1
n15.out → n386.formula1
n389.out → n386.atom2
n173.out → n386.formula2
n390.out → n386.atom3
n191.out → n386.formula3
n376.out → n375.a
n386.out → n375.b
n353.out → n352.a
n375.out → n352.b
n392.out → n391.assertion
n393.out → n391.atom1
n15.out → n391.formula1
n394.out → n391.atom2
n152.out → n391.formula2
n395.out → n391.atom3
n162.out → n391.formula3
n352.out → n351.a
n391.out → n351.b
n343.out → n342.a
n351.out → n342.b
n13.out → n400.a
n23.out → n400.b
n402.out → n401.assertion
n13.out → n404.a
n23.out → n404.b
n24.out → n405.a
n404.out → n405.b
n403.out → n401.atom1
n405.out → n401.formula1
n406.out → n401.atom2
n15.out → n401.formula2
n400.out → n399.a
n401.out → n399.b
n410.out → n409.assertion
n411.out → n409.atom1
n405.out → n409.formula1
n412.out → n409.atom2
n25.out → n409.formula2
n414.out → n413.assertion
n25.out → n416.a
n405.out → n416.b
n405.out → n417.a
n416.out → n417.b
n415.out → n413.atom1
n417.out → n413.formula1
n418.out → n413.atom2
n15.out → n413.formula2
n409.out → n408.a
n413.out → n408.b
n420.out → n419.assertion
n421.out → n419.atom1
n15.out → n419.formula1
n422.out → n419.atom2
n405.out → n419.formula2
n423.out → n419.atom3
n416.out → n419.formula3
n408.out → n407.a
n419.out → n407.b
n399.out → n398.a
n407.out → n398.b
n427.out → n426.assertion
n428.out → n426.atom1
n25.out → n426.formula1
n429.out → n426.atom2
n24.out → n426.formula2
n430.out → n426.atom3
n404.out → n426.formula3
n432.out → n431.assertion
n25.out → n434.a
n404.out → n434.b
n162.out → n435.a
n434.out → n435.b
n416.out → n436.a
n435.out → n436.b
n433.out → n431.atom1
n436.out → n431.formula1
n437.out → n431.atom2
n15.out → n431.formula2
n426.out → n425.a
n431.out → n425.b
n439.out → n438.assertion
n440.out → n438.atom1
n15.out → n438.formula1
n441.out → n438.atom2
n416.out → n438.formula2
n442.out → n438.atom3
n435.out → n438.formula3
n425.out → n424.a
n438.out → n424.b
n398.out → n397.a
n424.out → n397.b
n444.out → n443.assertion
n445.out → n443.atom1
n15.out → n443.formula1
n446.out → n443.atom2
n162.out → n443.formula2
n447.out → n443.atom3
n434.out → n443.formula3
n397.out → n396.a
n443.out → n396.b
n342.out → n341.a
n396.out → n341.b
n455.out → n454.assertion
n456.out → n454.atom1
n15.out → n454.formula1
n460.out → n459.assertion
n461.out → n459.atom1
n15.out → n459.formula1
n462.out → n459.atom2
n25.out → n459.formula2
n464.out → n463.assertion
n465.out → n463.atom1
n30.out → n463.formula1
n466.out → n463.atom2
n15.out → n463.formula2
n459.out → n458.a
n463.out → n458.b
n468.out → n467.assertion
n469.out → n467.atom1
n15.out → n467.formula1
n470.out → n467.atom2
n15.out → n467.formula2
n471.out → n467.atom3
n29.out → n467.formula3
n458.out → n457.a
n467.out → n457.b
n454.out → n453.a
n457.out → n453.b
n14.out → n476.formula
n9.out → n476.term
n478.out → n477.assertion
n479.out → n477.atom1
n45.out → n477.formula1
n480.out → n477.atom2
n15.out → n477.formula2
n476.out → n475.a
n477.out → n475.b
n484.out → n483.assertion
n485.out → n483.atom1
n45.out → n483.formula1
n486.out → n483.atom2
n25.out → n483.formula2
n488.out → n487.assertion
n489.out → n487.atom1
n57.out → n487.formula1
n490.out → n487.atom2
n15.out → n487.formula2
n483.out → n482.a
n487.out → n482.b
n492.out → n491.assertion
n493.out → n491.atom1
n15.out → n491.formula1
n494.out → n491.atom2
n45.out → n491.formula2
n495.out → n491.atom3
n56.out → n491.formula3
n482.out → n481.a
n491.out → n481.b
n475.out → n474.a
n481.out → n474.b
n499.out → n498.assertion
n500.out → n498.atom1
n25.out → n498.formula1
n501.out → n498.atom2
n15.out → n498.formula2
n502.out → n498.atom3
n14.out → n498.formula3
n504.out → n503.assertion
n505.out → n503.atom1
n76.out → n503.formula1
n506.out → n503.atom2
n15.out → n503.formula2
n498.out → n497.a
n503.out → n497.b
n508.out → n507.assertion
n509.out → n507.atom1
n15.out → n507.formula1
n510.out → n507.atom2
n56.out → n507.formula2
n511.out → n507.atom3
n75.out → n507.formula3
n497.out → n496.a
n507.out → n496.b
n474.out → n473.a
n496.out → n473.b
n513.out → n512.assertion
n514.out → n512.atom1
n15.out → n512.formula1
n515.out → n512.atom2
n29.out → n512.formula2
n516.out → n512.atom3
n74.out → n512.formula3
n473.out → n472.a
n512.out → n472.b
n453.out → n452.a
n472.out → n452.b
n11.out → n521.a
n13.out → n521.b
n523.out → n522.assertion
n11.out → n525.a
n13.out → n525.b
n14.out → n526.a
n525.out → n526.b
n524.out → n522.atom1
n526.out → n522.formula1
n527.out → n522.atom2
n15.out → n522.formula2
n521.out → n520.a
n522.out → n520.b
n531.out → n530.assertion
n532.out → n530.atom1
n526.out → n530.formula1
n533.out → n530.atom2
n25.out → n530.formula2
n535.out → n534.assertion
n25.out → n537.a
n526.out → n537.b
n526.out → n538.a
n537.out → n538.b
n536.out → n534.atom1
n538.out → n534.formula1
n539.out → n534.atom2
n15.out → n534.formula2
n530.out → n529.a
n534.out → n529.b
n541.out → n540.assertion
n542.out → n540.atom1
n15.out → n540.formula1
n543.out → n540.atom2
n526.out → n540.formula2
n544.out → n540.atom3
n537.out → n540.formula3
n529.out → n528.a
n540.out → n528.b
n520.out → n519.a
n528.out → n519.b
n548.out → n547.assertion
n549.out → n547.atom1
n25.out → n547.formula1
n550.out → n547.atom2
n14.out → n547.formula2
n551.out → n547.atom3
n525.out → n547.formula3
n553.out → n552.assertion
n25.out → n555.a
n525.out → n555.b
n74.out → n556.a
n555.out → n556.b
n537.out → n557.a
n556.out → n557.b
n554.out → n552.atom1
n557.out → n552.formula1
n558.out → n552.atom2
n15.out → n552.formula2
n547.out → n546.a
n552.out → n546.b
n560.out → n559.assertion
n561.out → n559.atom1
n15.out → n559.formula1
n562.out → n559.atom2
n537.out → n559.formula2
n563.out → n559.atom3
n556.out → n559.formula3
n546.out → n545.a
n559.out → n545.b
n519.out → n518.a
n545.out → n518.b
n565.out → n564.assertion
n566.out → n564.atom1
n15.out → n564.formula1
n567.out → n564.atom2
n74.out → n564.formula2
n568.out → n564.atom3
n555.out → n564.formula3
n518.out → n517.a
n564.out → n517.b
n452.out → n451.a
n517.out → n451.b
n574.out → n573.assertion
n575.out → n573.atom1
n11.out → n573.formula1
n576.out → n573.atom2
n13.out → n573.formula2
n577.out → n573.atom3
n23.out → n573.formula3
n579.out → n578.assertion
n11.out → n581.a
n23.out → n581.b
n404.out → n582.a
n581.out → n582.b
n525.out → n583.a
n582.out → n583.b
n580.out → n578.atom1
n583.out → n578.formula1
n584.out → n578.atom2
n15.out → n578.formula2
n573.out → n572.a
n578.out → n572.b
n588.out → n587.assertion
n589.out → n587.atom1
n583.out → n587.formula1
n590.out → n587.atom2
n25.out → n587.formula2
n592.out → n591.assertion
n25.out → n594.a
n583.out → n594.b
n583.out → n595.a
n594.out → n595.b
n593.out → n591.atom1
n595.out → n591.formula1
n596.out → n591.atom2
n15.out → n591.formula2
n587.out → n586.a
n591.out → n586.b
n598.out → n597.assertion
n599.out → n597.atom1
n15.out → n597.formula1
n600.out → n597.atom2
n583.out → n597.formula2
n601.out → n597.atom3
n594.out → n597.formula3
n586.out → n585.a
n597.out → n585.b
n572.out → n571.a
n585.out → n571.b
n605.out → n604.assertion
n606.out → n604.atom1
n25.out → n604.formula1
n607.out → n604.atom2
n525.out → n604.formula2
n608.out → n604.atom3
n582.out → n604.formula3
n610.out → n609.assertion
n25.out → n612.a
n582.out → n612.b
n555.out → n613.a
n612.out → n613.b
n594.out → n614.a
n613.out → n614.b
n611.out → n609.atom1
n614.out → n609.formula1
n615.out → n609.atom2
n15.out → n609.formula2
n604.out → n603.a
n609.out → n603.b
n617.out → n616.assertion
n618.out → n616.atom1
n15.out → n616.formula1
n619.out → n616.atom2
n594.out → n616.formula2
n620.out → n616.atom3
n613.out → n616.formula3
n603.out → n602.a
n616.out → n602.b
n571.out → n570.a
n602.out → n570.b
n622.out → n621.assertion
n623.out → n621.atom1
n15.out → n621.formula1
n624.out → n621.atom2
n555.out → n621.formula2
n625.out → n621.atom3
n612.out → n621.formula3
n570.out → n569.a
n621.out → n569.b
n451.out → n450.a
n569.out → n450.b
n629.out → n628.assertion
n630.out → n628.atom1
n25.out → n628.formula1
n631.out → n628.atom2
n404.out → n628.formula2
n632.out → n628.atom3
n581.out → n628.formula3
n634.out → n633.assertion
n25.out → n636.a
n581.out → n636.b
n434.out → n637.a
n636.out → n637.b
n612.out → n638.a
n637.out → n638.b
n635.out → n633.atom1
n638.out → n633.formula1
n639.out → n633.atom2
n15.out → n633.formula2
n628.out → n627.a
n633.out → n627.b
n641.out → n640.assertion
n642.out → n640.atom1
n15.out → n640.formula1
n643.out → n640.atom2
n612.out → n640.formula2
n644.out → n640.atom3
n637.out → n640.formula3
n627.out → n626.a
n640.out → n626.b
n450.out → n449.a
n626.out → n449.b
n646.out → n645.assertion
n647.out → n645.atom1
n15.out → n645.formula1
n648.out → n645.atom2
n434.out → n645.formula2
n649.out → n645.atom3
n636.out → n645.formula3
n449.out → n448.a
n645.out → n448.b
n341.out → n340.a
n448.out → n340.b
n11.out → n654.a
n23.out → n654.b
n656.out → n655.assertion
n11.out → n658.a
n23.out → n658.b
n268.out → n659.a
n658.out → n659.b
n581.out → n660.a
n659.out → n660.b
n657.out → n655.atom1
n660.out → n655.formula1
n661.out → n655.atom2
n15.out → n655.formula2
n654.out → n653.a
n655.out → n653.b
n665.out → n664.assertion
n666.out → n664.atom1
n660.out → n664.formula1
n667.out → n664.atom2
n25.out → n664.formula2
n669.out → n668.assertion
n25.out → n671.a
n660.out → n671.b
n660.out → n672.a
n671.out → n672.b
n670.out → n668.atom1
n672.out → n668.formula1
n673.out → n668.atom2
n15.out → n668.formula2
n664.out → n663.a
n668.out → n663.b
n675.out → n674.assertion
n676.out → n674.atom1
n15.out → n674.formula1
n677.out → n674.atom2
n660.out → n674.formula2
n678.out → n674.atom3
n671.out → n674.formula3
n663.out → n662.a
n674.out → n662.b
n653.out → n652.a
n662.out → n652.b
n682.out → n681.assertion
n683.out → n681.atom1
n25.out → n681.formula1
n684.out → n681.atom2
n581.out → n681.formula2
n685.out → n681.atom3
n659.out → n681.formula3
n687.out → n686.assertion
n25.out → n689.a
n659.out → n689.b
n636.out → n690.a
n689.out → n690.b
n671.out → n691.a
n690.out → n691.b
n688.out → n686.atom1
n691.out → n686.formula1
n692.out → n686.atom2
n15.out → n686.formula2
n681.out → n680.a
n686.out → n680.b
n694.out → n693.assertion
n695.out → n693.atom1
n15.out → n693.formula1
n696.out → n693.atom2
n671.out → n693.formula2
n697.out → n693.atom3
n690.out → n693.formula3
n680.out → n679.a
n693.out → n679.b
n652.out → n651.a
n679.out → n651.b
n699.out → n698.assertion
n700.out → n698.atom1
n15.out → n698.formula1
n701.out → n698.atom2
n636.out → n698.formula2
n702.out → n698.atom3
n689.out → n698.formula3
n651.out → n650.a
n698.out → n650.b
n340.out → n339.a
n650.out → n339.b
n706.out → n705.assertion
n707.out → n705.atom1
n25.out → n705.formula1
n708.out → n705.atom2
n268.out → n705.formula2
n709.out → n705.atom3
n658.out → n705.formula3
n711.out → n710.assertion
n25.out → n713.a
n658.out → n713.b
n323.out → n714.a
n713.out → n714.b
n689.out → n715.a
n714.out → n715.b
n712.out → n710.atom1
n715.out → n710.formula1
n716.out → n710.atom2
n15.out → n710.formula2
n705.out → n704.a
n710.out → n704.b
n718.out → n717.assertion
n719.out → n717.atom1
n15.out → n717.formula1
n720.out → n717.atom2
n689.out → n717.formula2
n721.out → n717.atom3
n714.out → n717.formula3
n704.out → n703.a
n717.out → n703.b
n339.out → n338.a
n703.out → n338.b
n723.out → n722.assertion
n724.out → n722.atom1
n15.out → n722.formula1
n725.out → n722.atom2
n323.out → n722.formula2
n726.out → n722.atom3
n713.out → n722.formula3
n338.out → n337.a
n722.out → n337.b
n2.out → n1.a
n337.out → n1.b
n1.out → n727.proof
```

</details>

### *77 · 元素等价的全称传递

- 目标：`⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → ( ∀ z ( z ∈ y ↔ z ∈ u ) → ∀ z ( z ∈ x ↔ z ∈ u ) ) )`
- 提示：先逐点传递，再全称推广；两次假设用 DT 消去。
- 参考解：752 个模块 / 1138 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n753  [target]
n1  mp
n2  mp
n3  gen(v=z)
n4  mp
n5  mp
n6  mp
n7  mp
n8  mp
n9  subst
n10  定理 *01
n11  atom P
n12  term z
n13  term x
n14  mem
n15  term y
n16  mem
n17  iff
n18  all(v=z)
n19  mp
n20  mp
n21  subst
n22  axiom A1
n23  atom P
n24  atom Q
n25  term u
n26  mem
n27  iff
n28  all(v=z)
n29  subst
n30  axiom A1
n31  atom P
n32  imp
n33  imp
n34  atom Q
n35  subst
n36  axiom A2
n37  atom P
n38  atom Q
n39  atom R
n40  mp
n41  mp
n42  mp
n43  mp
n44  all-inst(v=z)
n45  subst
n46  axiom A1
n47  atom P
n48  imp
n49  atom Q
n50  mp
n51  mp
n52  subst
n53  axiom A1
n54  atom P
n55  atom Q
n56  subst
n57  axiom A1
n58  atom P
n59  imp
n60  imp
n61  atom Q
n62  subst
n63  axiom A2
n64  atom P
n65  atom Q
n66  atom R
n67  mp
n68  mp
n69  subst
n70  axiom A2
n71  atom P
n72  atom Q
n73  atom R
n74  subst
n75  axiom A1
n76  atom P
n77  imp
n78  imp
n79  imp
n80  atom Q
n81  subst
n82  axiom A2
n83  atom P
n84  atom Q
n85  atom R
n86  subst
n87  axiom A2
n88  atom P
n89  atom Q
n90  atom R
n91  mp
n92  mp
n93  mp
n94  mp
n95  iff-elim-ax(dir=rl)
n96  subst
n97  axiom A1
n98  atom P
n99  imp
n100  imp
n101  atom Q
n102  mp
n103  mp
n104  subst
n105  axiom A1
n106  atom P
n107  atom Q
n108  subst
n109  axiom A1
n110  atom P
n111  imp
n112  imp
n113  atom Q
n114  subst
n115  axiom A2
n116  atom P
n117  atom Q
n118  atom R
n119  mp
n120  mp
n121  subst
n122  axiom A2
n123  atom P
n124  atom Q
n125  atom R
n126  subst
n127  axiom A1
n128  atom P
n129  imp
n130  imp
n131  imp
n132  atom Q
n133  subst
n134  axiom A2
n135  atom P
n136  atom Q
n137  atom R
n138  subst
n139  axiom A2
n140  atom P
n141  atom Q
n142  atom R
n143  mp
n144  mp
n145  mp
n146  mp
n147  mp
n148  mp
n149  subst
n150  定理 *01
n151  atom P
n152  subst
n153  axiom A1
n154  atom P
n155  imp
n156  atom Q
n157  mp
n158  mp
n159  mp
n160  mp
n161  all-inst(v=z)
n162  subst
n163  axiom A1
n164  atom P
n165  imp
n166  atom Q
n167  mp
n168  mp
n169  subst
n170  axiom A1
n171  atom P
n172  atom Q
n173  subst
n174  axiom A1
n175  atom P
n176  imp
n177  imp
n178  atom Q
n179  subst
n180  axiom A2
n181  atom P
n182  atom Q
n183  atom R
n184  mp
n185  mp
n186  subst
n187  axiom A2
n188  atom P
n189  atom Q
n190  atom R
n191  subst
n192  axiom A1
n193  atom P
n194  imp
n195  imp
n196  atom Q
n197  subst
n198  axiom A2
n199  atom P
n200  atom Q
n201  atom R
n202  subst
n203  axiom A2
n204  atom P
n205  atom Q
n206  atom R
n207  mp
n208  mp
n209  mp
n210  mp
n211  iff-elim-ax(dir=rl)
n212  subst
n213  axiom A1
n214  atom P
n215  imp
n216  imp
n217  atom Q
n218  mp
n219  mp
n220  subst
n221  axiom A1
n222  atom P
n223  atom Q
n224  subst
n225  axiom A1
n226  atom P
n227  imp
n228  imp
n229  atom Q
n230  subst
n231  axiom A2
n232  atom P
n233  atom Q
n234  atom R
n235  mp
n236  mp
n237  subst
n238  axiom A2
n239  atom P
n240  atom Q
n241  atom R
n242  subst
n243  axiom A1
n244  atom P
n245  imp
n246  imp
n247  imp
n248  atom Q
n249  subst
n250  axiom A2
n251  atom P
n252  atom Q
n253  atom R
n254  subst
n255  axiom A2
n256  atom P
n257  atom Q
n258  atom R
n259  mp
n260  mp
n261  mp
n262  mp
n263  subst
n264  定理 *05
n265  atom P
n266  atom Q
n267  atom R
n268  subst
n269  axiom A1
n270  atom P
n271  imp
n272  imp
n273  imp
n274  atom Q
n275  mp
n276  mp
n277  subst
n278  axiom A1
n279  atom P
n280  atom Q
n281  subst
n282  axiom A1
n283  atom P
n284  imp
n285  imp
n286  atom Q
n287  subst
n288  axiom A2
n289  atom P
n290  atom Q
n291  atom R
n292  mp
n293  mp
n294  subst
n295  axiom A2
n296  atom P
n297  atom Q
n298  atom R
n299  subst
n300  axiom A1
n301  atom P
n302  imp
n303  imp
n304  imp
n305  atom Q
n306  subst
n307  axiom A2
n308  atom P
n309  atom Q
n310  atom R
n311  subst
n312  axiom A2
n313  atom P
n314  atom Q
n315  atom R
n316  mp
n317  mp
n318  subst
n319  axiom A2
n320  atom P
n321  atom Q
n322  atom R
n323  subst
n324  axiom A1
n325  atom P
n326  imp
n327  imp
n328  imp
n329  atom Q
n330  subst
n331  axiom A2
n332  atom P
n333  atom Q
n334  atom R
n335  subst
n336  axiom A2
n337  atom P
n338  atom Q
n339  atom R
n340  mp
n341  mp
n342  mp
n343  mp
n344  mp
n345  mp
n346  mp
n347  subst
n348  定理 *01
n349  atom P
n350  subst
n351  axiom A1
n352  atom P
n353  atom Q
n354  mp
n355  mp
n356  mp
n357  mp
n358  all-inst(v=z)
n359  subst
n360  axiom A1
n361  atom P
n362  atom Q
n363  mp
n364  mp
n365  subst
n366  axiom A1
n367  atom P
n368  atom Q
n369  subst
n370  axiom A1
n371  atom P
n372  atom Q
n373  subst
n374  axiom A2
n375  atom P
n376  atom Q
n377  atom R
n378  mp
n379  mp
n380  subst
n381  axiom A2
n382  atom P
n383  atom Q
n384  atom R
n385  subst
n386  axiom A1
n387  atom P
n388  atom Q
n389  subst
n390  axiom A2
n391  atom P
n392  atom Q
n393  atom R
n394  subst
n395  axiom A2
n396  atom P
n397  atom Q
n398  atom R
n399  mp
n400  mp
n401  mp
n402  mp
n403  iff-elim-ax(dir=lr)
n404  subst
n405  axiom A1
n406  atom P
n407  imp
n408  imp
n409  atom Q
n410  mp
n411  mp
n412  subst
n413  axiom A1
n414  atom P
n415  atom Q
n416  subst
n417  axiom A1
n418  atom P
n419  imp
n420  imp
n421  atom Q
n422  subst
n423  axiom A2
n424  atom P
n425  atom Q
n426  atom R
n427  mp
n428  mp
n429  subst
n430  axiom A2
n431  atom P
n432  atom Q
n433  atom R
n434  subst
n435  axiom A1
n436  atom P
n437  imp
n438  imp
n439  imp
n440  atom Q
n441  subst
n442  axiom A2
n443  atom P
n444  atom Q
n445  atom R
n446  subst
n447  axiom A2
n448  atom P
n449  atom Q
n450  atom R
n451  mp
n452  mp
n453  mp
n454  mp
n455  mp
n456  mp
n457  subst
n458  定理 *01
n459  atom P
n460  mp
n461  mp
n462  subst
n463  axiom A1
n464  atom P
n465  atom Q
n466  subst
n467  axiom A1
n468  atom P
n469  atom Q
n470  subst
n471  axiom A2
n472  atom P
n473  atom Q
n474  atom R
n475  mp
n476  mp
n477  mp
n478  mp
n479  all-inst(v=z)
n480  subst
n481  axiom A1
n482  atom P
n483  atom Q
n484  mp
n485  mp
n486  subst
n487  axiom A1
n488  atom P
n489  atom Q
n490  subst
n491  axiom A1
n492  atom P
n493  atom Q
n494  subst
n495  axiom A2
n496  atom P
n497  atom Q
n498  atom R
n499  mp
n500  mp
n501  subst
n502  axiom A2
n503  atom P
n504  atom Q
n505  atom R
n506  subst
n507  axiom A1
n508  atom P
n509  atom Q
n510  subst
n511  axiom A2
n512  atom P
n513  atom Q
n514  atom R
n515  subst
n516  axiom A2
n517  atom P
n518  atom Q
n519  atom R
n520  mp
n521  mp
n522  mp
n523  mp
n524  iff-elim-ax(dir=lr)
n525  subst
n526  axiom A1
n527  atom P
n528  imp
n529  imp
n530  atom Q
n531  mp
n532  mp
n533  subst
n534  axiom A1
n535  atom P
n536  atom Q
n537  subst
n538  axiom A1
n539  atom P
n540  imp
n541  imp
n542  atom Q
n543  subst
n544  axiom A2
n545  atom P
n546  atom Q
n547  atom R
n548  mp
n549  mp
n550  subst
n551  axiom A2
n552  atom P
n553  atom Q
n554  atom R
n555  subst
n556  axiom A1
n557  atom P
n558  imp
n559  imp
n560  imp
n561  atom Q
n562  subst
n563  axiom A2
n564  atom P
n565  atom Q
n566  atom R
n567  subst
n568  axiom A2
n569  atom P
n570  atom Q
n571  atom R
n572  mp
n573  mp
n574  mp
n575  mp
n576  subst
n577  定理 *05
n578  atom P
n579  atom Q
n580  atom R
n581  subst
n582  axiom A1
n583  atom P
n584  imp
n585  imp
n586  imp
n587  atom Q
n588  mp
n589  mp
n590  subst
n591  axiom A1
n592  atom P
n593  atom Q
n594  subst
n595  axiom A1
n596  atom P
n597  imp
n598  imp
n599  atom Q
n600  subst
n601  axiom A2
n602  atom P
n603  atom Q
n604  atom R
n605  mp
n606  mp
n607  subst
n608  axiom A2
n609  atom P
n610  atom Q
n611  atom R
n612  subst
n613  axiom A1
n614  atom P
n615  imp
n616  imp
n617  imp
n618  atom Q
n619  subst
n620  axiom A2
n621  atom P
n622  atom Q
n623  atom R
n624  subst
n625  axiom A2
n626  atom P
n627  atom Q
n628  atom R
n629  mp
n630  mp
n631  subst
n632  axiom A2
n633  atom P
n634  atom Q
n635  atom R
n636  subst
n637  axiom A1
n638  atom P
n639  imp
n640  imp
n641  imp
n642  atom Q
n643  subst
n644  axiom A2
n645  atom P
n646  atom Q
n647  atom R
n648  subst
n649  axiom A2
n650  atom P
n651  atom Q
n652  atom R
n653  mp
n654  mp
n655  mp
n656  mp
n657  iff-intro-ax
n658  subst
n659  axiom A1
n660  atom P
n661  iff
n662  imp
n663  imp
n664  atom Q
n665  mp
n666  mp
n667  subst
n668  axiom A1
n669  atom P
n670  atom Q
n671  subst
n672  axiom A1
n673  atom P
n674  imp
n675  imp
n676  atom Q
n677  subst
n678  axiom A2
n679  atom P
n680  atom Q
n681  atom R
n682  mp
n683  mp
n684  subst
n685  axiom A2
n686  atom P
n687  atom Q
n688  atom R
n689  subst
n690  axiom A1
n691  atom P
n692  imp
n693  imp
n694  imp
n695  atom Q
n696  subst
n697  axiom A2
n698  atom P
n699  atom Q
n700  atom R
n701  subst
n702  axiom A2
n703  atom P
n704  atom Q
n705  atom R
n706  mp
n707  mp
n708  subst
n709  axiom A2
n710  atom P
n711  atom Q
n712  atom R
n713  subst
n714  axiom A1
n715  atom P
n716  imp
n717  imp
n718  imp
n719  atom Q
n720  subst
n721  axiom A2
n722  atom P
n723  atom Q
n724  atom R
n725  subst
n726  axiom A2
n727  atom P
n728  atom Q
n729  atom R
n730  subst
n731  定理 *64
n732  atom P
n733  atom Q
n734  mp
n735  mp
n736  subst
n737  定理 *64
n738  atom P
n739  atom Q
n740  subst
n741  axiom A1
n742  atom P
n743  all(v=z)
n744  all(v=z)
n745  imp
n746  imp
n747  atom Q
n748  subst
n749  axiom A2
n750  atom P
n751  atom Q
n752  atom R

接线：
n10.out → n9.assertion
n12.out → n14.a
n13.out → n14.b
n12.out → n16.a
n15.out → n16.b
n14.out → n17.a
n16.out → n17.b
n17.out → n18.a
n11.out → n9.atom1
n18.out → n9.formula1
n22.out → n21.assertion
n23.out → n21.atom1
n18.out → n21.formula1
n12.out → n26.a
n25.out → n26.b
n16.out → n27.a
n26.out → n27.b
n27.out → n28.a
n24.out → n21.atom2
n28.out → n21.formula2
n30.out → n29.assertion
n28.out → n32.a
n18.out → n32.b
n18.out → n33.a
n32.out → n33.b
n31.out → n29.atom1
n33.out → n29.formula1
n34.out → n29.atom2
n18.out → n29.formula2
n21.out → n20.a
n29.out → n20.b
n36.out → n35.assertion
n37.out → n35.atom1
n18.out → n35.formula1
n38.out → n35.atom2
n18.out → n35.formula2
n39.out → n35.atom3
n32.out → n35.formula3
n20.out → n19.a
n35.out → n19.b
n9.out → n8.a
n19.out → n8.b
n17.out → n44.formula
n12.out → n44.term
n46.out → n45.assertion
n18.out → n48.a
n17.out → n48.b
n47.out → n45.atom1
n48.out → n45.formula1
n49.out → n45.atom2
n18.out → n45.formula2
n44.out → n43.a
n45.out → n43.b
n53.out → n52.assertion
n54.out → n52.atom1
n48.out → n52.formula1
n55.out → n52.atom2
n28.out → n52.formula2
n57.out → n56.assertion
n28.out → n59.a
n48.out → n59.b
n48.out → n60.a
n59.out → n60.b
n58.out → n56.atom1
n60.out → n56.formula1
n61.out → n56.atom2
n18.out → n56.formula2
n52.out → n51.a
n56.out → n51.b
n63.out → n62.assertion
n64.out → n62.atom1
n18.out → n62.formula1
n65.out → n62.atom2
n48.out → n62.formula2
n66.out → n62.atom3
n59.out → n62.formula3
n51.out → n50.a
n62.out → n50.b
n43.out → n42.a
n50.out → n42.b
n70.out → n69.assertion
n71.out → n69.atom1
n28.out → n69.formula1
n72.out → n69.atom2
n18.out → n69.formula2
n73.out → n69.atom3
n17.out → n69.formula3
n75.out → n74.assertion
n28.out → n77.a
n17.out → n77.b
n32.out → n78.a
n77.out → n78.b
n59.out → n79.a
n78.out → n79.b
n76.out → n74.atom1
n79.out → n74.formula1
n80.out → n74.atom2
n18.out → n74.formula2
n69.out → n68.a
n74.out → n68.b
n82.out → n81.assertion
n83.out → n81.atom1
n18.out → n81.formula1
n84.out → n81.atom2
n59.out → n81.formula2
n85.out → n81.atom3
n78.out → n81.formula3
n68.out → n67.a
n81.out → n67.b
n42.out → n41.a
n67.out → n41.b
n87.out → n86.assertion
n88.out → n86.atom1
n18.out → n86.formula1
n89.out → n86.atom2
n32.out → n86.formula2
n90.out → n86.atom3
n77.out → n86.formula3
n41.out → n40.a
n86.out → n40.b
n8.out → n7.a
n40.out → n7.b
n14.out → n95.a
n16.out → n95.b
n97.out → n96.assertion
n16.out → n99.a
n14.out → n99.b
n17.out → n100.a
n99.out → n100.b
n98.out → n96.atom1
n100.out → n96.formula1
n101.out → n96.atom2
n18.out → n96.formula2
n95.out → n94.a
n96.out → n94.b
n105.out → n104.assertion
n106.out → n104.atom1
n100.out → n104.formula1
n107.out → n104.atom2
n28.out → n104.formula2
n109.out → n108.assertion
n28.out → n111.a
n100.out → n111.b
n100.out → n112.a
n111.out → n112.b
n110.out → n108.atom1
n112.out → n108.formula1
n113.out → n108.atom2
n18.out → n108.formula2
n104.out → n103.a
n108.out → n103.b
n115.out → n114.assertion
n116.out → n114.atom1
n18.out → n114.formula1
n117.out → n114.atom2
n100.out → n114.formula2
n118.out → n114.atom3
n111.out → n114.formula3
n103.out → n102.a
n114.out → n102.b
n94.out → n93.a
n102.out → n93.b
n122.out → n121.assertion
n123.out → n121.atom1
n28.out → n121.formula1
n124.out → n121.atom2
n17.out → n121.formula2
n125.out → n121.atom3
n99.out → n121.formula3
n127.out → n126.assertion
n28.out → n129.a
n99.out → n129.b
n77.out → n130.a
n129.out → n130.b
n111.out → n131.a
n130.out → n131.b
n128.out → n126.atom1
n131.out → n126.formula1
n132.out → n126.atom2
n18.out → n126.formula2
n121.out → n120.a
n126.out → n120.b
n134.out → n133.assertion
n135.out → n133.atom1
n18.out → n133.formula1
n136.out → n133.atom2
n111.out → n133.formula2
n137.out → n133.atom3
n130.out → n133.formula3
n120.out → n119.a
n133.out → n119.b
n93.out → n92.a
n119.out → n92.b
n139.out → n138.assertion
n140.out → n138.atom1
n18.out → n138.formula1
n141.out → n138.atom2
n77.out → n138.formula2
n142.out → n138.atom3
n129.out → n138.formula3
n92.out → n91.a
n138.out → n91.b
n7.out → n6.a
n91.out → n6.b
n150.out → n149.assertion
n151.out → n149.atom1
n28.out → n149.formula1
n153.out → n152.assertion
n28.out → n155.a
n28.out → n155.b
n154.out → n152.atom1
n155.out → n152.formula1
n156.out → n152.atom2
n18.out → n152.formula2
n149.out → n148.a
n152.out → n148.b
n27.out → n161.formula
n12.out → n161.term
n163.out → n162.assertion
n28.out → n165.a
n27.out → n165.b
n164.out → n162.atom1
n165.out → n162.formula1
n166.out → n162.atom2
n18.out → n162.formula2
n161.out → n160.a
n162.out → n160.b
n170.out → n169.assertion
n171.out → n169.atom1
n165.out → n169.formula1
n172.out → n169.atom2
n28.out → n169.formula2
n174.out → n173.assertion
n28.out → n176.a
n165.out → n176.b
n165.out → n177.a
n176.out → n177.b
n175.out → n173.atom1
n177.out → n173.formula1
n178.out → n173.atom2
n18.out → n173.formula2
n169.out → n168.a
n173.out → n168.b
n180.out → n179.assertion
n181.out → n179.atom1
n18.out → n179.formula1
n182.out → n179.atom2
n165.out → n179.formula2
n183.out → n179.atom3
n176.out → n179.formula3
n168.out → n167.a
n179.out → n167.b
n160.out → n159.a
n167.out → n159.b
n187.out → n186.assertion
n188.out → n186.atom1
n28.out → n186.formula1
n189.out → n186.atom2
n28.out → n186.formula2
n190.out → n186.atom3
n27.out → n186.formula3
n192.out → n191.assertion
n155.out → n194.a
n165.out → n194.b
n176.out → n195.a
n194.out → n195.b
n193.out → n191.atom1
n195.out → n191.formula1
n196.out → n191.atom2
n18.out → n191.formula2
n186.out → n185.a
n191.out → n185.b
n198.out → n197.assertion
n199.out → n197.atom1
n18.out → n197.formula1
n200.out → n197.atom2
n176.out → n197.formula2
n201.out → n197.atom3
n194.out → n197.formula3
n185.out → n184.a
n197.out → n184.b
n159.out → n158.a
n184.out → n158.b
n203.out → n202.assertion
n204.out → n202.atom1
n18.out → n202.formula1
n205.out → n202.atom2
n155.out → n202.formula2
n206.out → n202.atom3
n165.out → n202.formula3
n158.out → n157.a
n202.out → n157.b
n148.out → n147.a
n157.out → n147.b
n16.out → n211.a
n26.out → n211.b
n213.out → n212.assertion
n26.out → n215.a
n16.out → n215.b
n27.out → n216.a
n215.out → n216.b
n214.out → n212.atom1
n216.out → n212.formula1
n217.out → n212.atom2
n18.out → n212.formula2
n211.out → n210.a
n212.out → n210.b
n221.out → n220.assertion
n222.out → n220.atom1
n216.out → n220.formula1
n223.out → n220.atom2
n28.out → n220.formula2
n225.out → n224.assertion
n28.out → n227.a
n216.out → n227.b
n216.out → n228.a
n227.out → n228.b
n226.out → n224.atom1
n228.out → n224.formula1
n229.out → n224.atom2
n18.out → n224.formula2
n220.out → n219.a
n224.out → n219.b
n231.out → n230.assertion
n232.out → n230.atom1
n18.out → n230.formula1
n233.out → n230.atom2
n216.out → n230.formula2
n234.out → n230.atom3
n227.out → n230.formula3
n219.out → n218.a
n230.out → n218.b
n210.out → n209.a
n218.out → n209.b
n238.out → n237.assertion
n239.out → n237.atom1
n28.out → n237.formula1
n240.out → n237.atom2
n27.out → n237.formula2
n241.out → n237.atom3
n215.out → n237.formula3
n243.out → n242.assertion
n28.out → n245.a
n215.out → n245.b
n165.out → n246.a
n245.out → n246.b
n227.out → n247.a
n246.out → n247.b
n244.out → n242.atom1
n247.out → n242.formula1
n248.out → n242.atom2
n18.out → n242.formula2
n237.out → n236.a
n242.out → n236.b
n250.out → n249.assertion
n251.out → n249.atom1
n18.out → n249.formula1
n252.out → n249.atom2
n227.out → n249.formula2
n253.out → n249.atom3
n246.out → n249.formula3
n236.out → n235.a
n249.out → n235.b
n209.out → n208.a
n235.out → n208.b
n255.out → n254.assertion
n256.out → n254.atom1
n18.out → n254.formula1
n257.out → n254.atom2
n165.out → n254.formula2
n258.out → n254.atom3
n245.out → n254.formula3
n208.out → n207.a
n254.out → n207.b
n147.out → n146.a
n207.out → n146.b
n264.out → n263.assertion
n265.out → n263.atom1
n26.out → n263.formula1
n266.out → n263.atom2
n16.out → n263.formula2
n267.out → n263.atom3
n14.out → n263.formula3
n269.out → n268.assertion
n26.out → n271.a
n14.out → n271.b
n99.out → n272.a
n271.out → n272.b
n215.out → n273.a
n272.out → n273.b
n270.out → n268.atom1
n273.out → n268.formula1
n274.out → n268.atom2
n18.out → n268.formula2
n263.out → n262.a
n268.out → n262.b
n278.out → n277.assertion
n279.out → n277.atom1
n273.out → n277.formula1
n280.out → n277.atom2
n28.out → n277.formula2
n282.out → n281.assertion
n28.out → n284.a
n273.out → n284.b
n273.out → n285.a
n284.out → n285.b
n283.out → n281.atom1
n285.out → n281.formula1
n286.out → n281.atom2
n18.out → n281.formula2
n277.out → n276.a
n281.out → n276.b
n288.out → n287.assertion
n289.out → n287.atom1
n18.out → n287.formula1
n290.out → n287.atom2
n273.out → n287.formula2
n291.out → n287.atom3
n284.out → n287.formula3
n276.out → n275.a
n287.out → n275.b
n262.out → n261.a
n275.out → n261.b
n295.out → n294.assertion
n296.out → n294.atom1
n28.out → n294.formula1
n297.out → n294.atom2
n215.out → n294.formula2
n298.out → n294.atom3
n272.out → n294.formula3
n300.out → n299.assertion
n28.out → n302.a
n272.out → n302.b
n245.out → n303.a
n302.out → n303.b
n284.out → n304.a
n303.out → n304.b
n301.out → n299.atom1
n304.out → n299.formula1
n305.out → n299.atom2
n18.out → n299.formula2
n294.out → n293.a
n299.out → n293.b
n307.out → n306.assertion
n308.out → n306.atom1
n18.out → n306.formula1
n309.out → n306.atom2
n284.out → n306.formula2
n310.out → n306.atom3
n303.out → n306.formula3
n293.out → n292.a
n306.out → n292.b
n261.out → n260.a
n292.out → n260.b
n312.out → n311.assertion
n313.out → n311.atom1
n18.out → n311.formula1
n314.out → n311.atom2
n245.out → n311.formula2
n315.out → n311.atom3
n302.out → n311.formula3
n260.out → n259.a
n311.out → n259.b
n146.out → n145.a
n259.out → n145.b
n319.out → n318.assertion
n320.out → n318.atom1
n28.out → n318.formula1
n321.out → n318.atom2
n99.out → n318.formula2
n322.out → n318.atom3
n271.out → n318.formula3
n324.out → n323.assertion
n28.out → n326.a
n271.out → n326.b
n129.out → n327.a
n326.out → n327.b
n302.out → n328.a
n327.out → n328.b
n325.out → n323.atom1
n328.out → n323.formula1
n329.out → n323.atom2
n18.out → n323.formula2
n318.out → n317.a
n323.out → n317.b
n331.out → n330.assertion
n332.out → n330.atom1
n18.out → n330.formula1
n333.out → n330.atom2
n302.out → n330.formula2
n334.out → n330.atom3
n327.out → n330.formula3
n317.out → n316.a
n330.out → n316.b
n145.out → n144.a
n316.out → n144.b
n336.out → n335.assertion
n337.out → n335.atom1
n18.out → n335.formula1
n338.out → n335.atom2
n129.out → n335.formula2
n339.out → n335.atom3
n326.out → n335.formula3
n144.out → n143.a
n335.out → n143.b
n6.out → n5.a
n143.out → n5.b
n348.out → n347.assertion
n349.out → n347.atom1
n28.out → n347.formula1
n351.out → n350.assertion
n352.out → n350.atom1
n155.out → n350.formula1
n353.out → n350.atom2
n18.out → n350.formula2
n347.out → n346.a
n350.out → n346.b
n27.out → n358.formula
n12.out → n358.term
n360.out → n359.assertion
n361.out → n359.atom1
n165.out → n359.formula1
n362.out → n359.atom2
n18.out → n359.formula2
n358.out → n357.a
n359.out → n357.b
n366.out → n365.assertion
n367.out → n365.atom1
n165.out → n365.formula1
n368.out → n365.atom2
n28.out → n365.formula2
n370.out → n369.assertion
n371.out → n369.atom1
n177.out → n369.formula1
n372.out → n369.atom2
n18.out → n369.formula2
n365.out → n364.a
n369.out → n364.b
n374.out → n373.assertion
n375.out → n373.atom1
n18.out → n373.formula1
n376.out → n373.atom2
n165.out → n373.formula2
n377.out → n373.atom3
n176.out → n373.formula3
n364.out → n363.a
n373.out → n363.b
n357.out → n356.a
n363.out → n356.b
n381.out → n380.assertion
n382.out → n380.atom1
n28.out → n380.formula1
n383.out → n380.atom2
n28.out → n380.formula2
n384.out → n380.atom3
n27.out → n380.formula3
n386.out → n385.assertion
n387.out → n385.atom1
n195.out → n385.formula1
n388.out → n385.atom2
n18.out → n385.formula2
n380.out → n379.a
n385.out → n379.b
n390.out → n389.assertion
n391.out → n389.atom1
n18.out → n389.formula1
n392.out → n389.atom2
n176.out → n389.formula2
n393.out → n389.atom3
n194.out → n389.formula3
n379.out → n378.a
n389.out → n378.b
n356.out → n355.a
n378.out → n355.b
n395.out → n394.assertion
n396.out → n394.atom1
n18.out → n394.formula1
n397.out → n394.atom2
n155.out → n394.formula2
n398.out → n394.atom3
n165.out → n394.formula3
n355.out → n354.a
n394.out → n354.b
n346.out → n345.a
n354.out → n345.b
n16.out → n403.a
n26.out → n403.b
n405.out → n404.assertion
n16.out → n407.a
n26.out → n407.b
n27.out → n408.a
n407.out → n408.b
n406.out → n404.atom1
n408.out → n404.formula1
n409.out → n404.atom2
n18.out → n404.formula2
n403.out → n402.a
n404.out → n402.b
n413.out → n412.assertion
n414.out → n412.atom1
n408.out → n412.formula1
n415.out → n412.atom2
n28.out → n412.formula2
n417.out → n416.assertion
n28.out → n419.a
n408.out → n419.b
n408.out → n420.a
n419.out → n420.b
n418.out → n416.atom1
n420.out → n416.formula1
n421.out → n416.atom2
n18.out → n416.formula2
n412.out → n411.a
n416.out → n411.b
n423.out → n422.assertion
n424.out → n422.atom1
n18.out → n422.formula1
n425.out → n422.atom2
n408.out → n422.formula2
n426.out → n422.atom3
n419.out → n422.formula3
n411.out → n410.a
n422.out → n410.b
n402.out → n401.a
n410.out → n401.b
n430.out → n429.assertion
n431.out → n429.atom1
n28.out → n429.formula1
n432.out → n429.atom2
n27.out → n429.formula2
n433.out → n429.atom3
n407.out → n429.formula3
n435.out → n434.assertion
n28.out → n437.a
n407.out → n437.b
n165.out → n438.a
n437.out → n438.b
n419.out → n439.a
n438.out → n439.b
n436.out → n434.atom1
n439.out → n434.formula1
n440.out → n434.atom2
n18.out → n434.formula2
n429.out → n428.a
n434.out → n428.b
n442.out → n441.assertion
n443.out → n441.atom1
n18.out → n441.formula1
n444.out → n441.atom2
n419.out → n441.formula2
n445.out → n441.atom3
n438.out → n441.formula3
n428.out → n427.a
n441.out → n427.b
n401.out → n400.a
n427.out → n400.b
n447.out → n446.assertion
n448.out → n446.atom1
n18.out → n446.formula1
n449.out → n446.atom2
n165.out → n446.formula2
n450.out → n446.atom3
n437.out → n446.formula3
n400.out → n399.a
n446.out → n399.b
n345.out → n344.a
n399.out → n344.b
n458.out → n457.assertion
n459.out → n457.atom1
n18.out → n457.formula1
n463.out → n462.assertion
n464.out → n462.atom1
n18.out → n462.formula1
n465.out → n462.atom2
n28.out → n462.formula2
n467.out → n466.assertion
n468.out → n466.atom1
n33.out → n466.formula1
n469.out → n466.atom2
n18.out → n466.formula2
n462.out → n461.a
n466.out → n461.b
n471.out → n470.assertion
n472.out → n470.atom1
n18.out → n470.formula1
n473.out → n470.atom2
n18.out → n470.formula2
n474.out → n470.atom3
n32.out → n470.formula3
n461.out → n460.a
n470.out → n460.b
n457.out → n456.a
n460.out → n456.b
n17.out → n479.formula
n12.out → n479.term
n481.out → n480.assertion
n482.out → n480.atom1
n48.out → n480.formula1
n483.out → n480.atom2
n18.out → n480.formula2
n479.out → n478.a
n480.out → n478.b
n487.out → n486.assertion
n488.out → n486.atom1
n48.out → n486.formula1
n489.out → n486.atom2
n28.out → n486.formula2
n491.out → n490.assertion
n492.out → n490.atom1
n60.out → n490.formula1
n493.out → n490.atom2
n18.out → n490.formula2
n486.out → n485.a
n490.out → n485.b
n495.out → n494.assertion
n496.out → n494.atom1
n18.out → n494.formula1
n497.out → n494.atom2
n48.out → n494.formula2
n498.out → n494.atom3
n59.out → n494.formula3
n485.out → n484.a
n494.out → n484.b
n478.out → n477.a
n484.out → n477.b
n502.out → n501.assertion
n503.out → n501.atom1
n28.out → n501.formula1
n504.out → n501.atom2
n18.out → n501.formula2
n505.out → n501.atom3
n17.out → n501.formula3
n507.out → n506.assertion
n508.out → n506.atom1
n79.out → n506.formula1
n509.out → n506.atom2
n18.out → n506.formula2
n501.out → n500.a
n506.out → n500.b
n511.out → n510.assertion
n512.out → n510.atom1
n18.out → n510.formula1
n513.out → n510.atom2
n59.out → n510.formula2
n514.out → n510.atom3
n78.out → n510.formula3
n500.out → n499.a
n510.out → n499.b
n477.out → n476.a
n499.out → n476.b
n516.out → n515.assertion
n517.out → n515.atom1
n18.out → n515.formula1
n518.out → n515.atom2
n32.out → n515.formula2
n519.out → n515.atom3
n77.out → n515.formula3
n476.out → n475.a
n515.out → n475.b
n456.out → n455.a
n475.out → n455.b
n14.out → n524.a
n16.out → n524.b
n526.out → n525.assertion
n14.out → n528.a
n16.out → n528.b
n17.out → n529.a
n528.out → n529.b
n527.out → n525.atom1
n529.out → n525.formula1
n530.out → n525.atom2
n18.out → n525.formula2
n524.out → n523.a
n525.out → n523.b
n534.out → n533.assertion
n535.out → n533.atom1
n529.out → n533.formula1
n536.out → n533.atom2
n28.out → n533.formula2
n538.out → n537.assertion
n28.out → n540.a
n529.out → n540.b
n529.out → n541.a
n540.out → n541.b
n539.out → n537.atom1
n541.out → n537.formula1
n542.out → n537.atom2
n18.out → n537.formula2
n533.out → n532.a
n537.out → n532.b
n544.out → n543.assertion
n545.out → n543.atom1
n18.out → n543.formula1
n546.out → n543.atom2
n529.out → n543.formula2
n547.out → n543.atom3
n540.out → n543.formula3
n532.out → n531.a
n543.out → n531.b
n523.out → n522.a
n531.out → n522.b
n551.out → n550.assertion
n552.out → n550.atom1
n28.out → n550.formula1
n553.out → n550.atom2
n17.out → n550.formula2
n554.out → n550.atom3
n528.out → n550.formula3
n556.out → n555.assertion
n28.out → n558.a
n528.out → n558.b
n77.out → n559.a
n558.out → n559.b
n540.out → n560.a
n559.out → n560.b
n557.out → n555.atom1
n560.out → n555.formula1
n561.out → n555.atom2
n18.out → n555.formula2
n550.out → n549.a
n555.out → n549.b
n563.out → n562.assertion
n564.out → n562.atom1
n18.out → n562.formula1
n565.out → n562.atom2
n540.out → n562.formula2
n566.out → n562.atom3
n559.out → n562.formula3
n549.out → n548.a
n562.out → n548.b
n522.out → n521.a
n548.out → n521.b
n568.out → n567.assertion
n569.out → n567.atom1
n18.out → n567.formula1
n570.out → n567.atom2
n77.out → n567.formula2
n571.out → n567.atom3
n558.out → n567.formula3
n521.out → n520.a
n567.out → n520.b
n455.out → n454.a
n520.out → n454.b
n577.out → n576.assertion
n578.out → n576.atom1
n14.out → n576.formula1
n579.out → n576.atom2
n16.out → n576.formula2
n580.out → n576.atom3
n26.out → n576.formula3
n582.out → n581.assertion
n14.out → n584.a
n26.out → n584.b
n407.out → n585.a
n584.out → n585.b
n528.out → n586.a
n585.out → n586.b
n583.out → n581.atom1
n586.out → n581.formula1
n587.out → n581.atom2
n18.out → n581.formula2
n576.out → n575.a
n581.out → n575.b
n591.out → n590.assertion
n592.out → n590.atom1
n586.out → n590.formula1
n593.out → n590.atom2
n28.out → n590.formula2
n595.out → n594.assertion
n28.out → n597.a
n586.out → n597.b
n586.out → n598.a
n597.out → n598.b
n596.out → n594.atom1
n598.out → n594.formula1
n599.out → n594.atom2
n18.out → n594.formula2
n590.out → n589.a
n594.out → n589.b
n601.out → n600.assertion
n602.out → n600.atom1
n18.out → n600.formula1
n603.out → n600.atom2
n586.out → n600.formula2
n604.out → n600.atom3
n597.out → n600.formula3
n589.out → n588.a
n600.out → n588.b
n575.out → n574.a
n588.out → n574.b
n608.out → n607.assertion
n609.out → n607.atom1
n28.out → n607.formula1
n610.out → n607.atom2
n528.out → n607.formula2
n611.out → n607.atom3
n585.out → n607.formula3
n613.out → n612.assertion
n28.out → n615.a
n585.out → n615.b
n558.out → n616.a
n615.out → n616.b
n597.out → n617.a
n616.out → n617.b
n614.out → n612.atom1
n617.out → n612.formula1
n618.out → n612.atom2
n18.out → n612.formula2
n607.out → n606.a
n612.out → n606.b
n620.out → n619.assertion
n621.out → n619.atom1
n18.out → n619.formula1
n622.out → n619.atom2
n597.out → n619.formula2
n623.out → n619.atom3
n616.out → n619.formula3
n606.out → n605.a
n619.out → n605.b
n574.out → n573.a
n605.out → n573.b
n625.out → n624.assertion
n626.out → n624.atom1
n18.out → n624.formula1
n627.out → n624.atom2
n558.out → n624.formula2
n628.out → n624.atom3
n615.out → n624.formula3
n573.out → n572.a
n624.out → n572.b
n454.out → n453.a
n572.out → n453.b
n632.out → n631.assertion
n633.out → n631.atom1
n28.out → n631.formula1
n634.out → n631.atom2
n407.out → n631.formula2
n635.out → n631.atom3
n584.out → n631.formula3
n637.out → n636.assertion
n28.out → n639.a
n584.out → n639.b
n437.out → n640.a
n639.out → n640.b
n615.out → n641.a
n640.out → n641.b
n638.out → n636.atom1
n641.out → n636.formula1
n642.out → n636.atom2
n18.out → n636.formula2
n631.out → n630.a
n636.out → n630.b
n644.out → n643.assertion
n645.out → n643.atom1
n18.out → n643.formula1
n646.out → n643.atom2
n615.out → n643.formula2
n647.out → n643.atom3
n640.out → n643.formula3
n630.out → n629.a
n643.out → n629.b
n453.out → n452.a
n629.out → n452.b
n649.out → n648.assertion
n650.out → n648.atom1
n18.out → n648.formula1
n651.out → n648.atom2
n437.out → n648.formula2
n652.out → n648.atom3
n639.out → n648.formula3
n452.out → n451.a
n648.out → n451.b
n344.out → n343.a
n451.out → n343.b
n14.out → n657.a
n26.out → n657.b
n659.out → n658.assertion
n14.out → n661.a
n26.out → n661.b
n271.out → n662.a
n661.out → n662.b
n584.out → n663.a
n662.out → n663.b
n660.out → n658.atom1
n663.out → n658.formula1
n664.out → n658.atom2
n18.out → n658.formula2
n657.out → n656.a
n658.out → n656.b
n668.out → n667.assertion
n669.out → n667.atom1
n663.out → n667.formula1
n670.out → n667.atom2
n28.out → n667.formula2
n672.out → n671.assertion
n28.out → n674.a
n663.out → n674.b
n663.out → n675.a
n674.out → n675.b
n673.out → n671.atom1
n675.out → n671.formula1
n676.out → n671.atom2
n18.out → n671.formula2
n667.out → n666.a
n671.out → n666.b
n678.out → n677.assertion
n679.out → n677.atom1
n18.out → n677.formula1
n680.out → n677.atom2
n663.out → n677.formula2
n681.out → n677.atom3
n674.out → n677.formula3
n666.out → n665.a
n677.out → n665.b
n656.out → n655.a
n665.out → n655.b
n685.out → n684.assertion
n686.out → n684.atom1
n28.out → n684.formula1
n687.out → n684.atom2
n584.out → n684.formula2
n688.out → n684.atom3
n662.out → n684.formula3
n690.out → n689.assertion
n28.out → n692.a
n662.out → n692.b
n639.out → n693.a
n692.out → n693.b
n674.out → n694.a
n693.out → n694.b
n691.out → n689.atom1
n694.out → n689.formula1
n695.out → n689.atom2
n18.out → n689.formula2
n684.out → n683.a
n689.out → n683.b
n697.out → n696.assertion
n698.out → n696.atom1
n18.out → n696.formula1
n699.out → n696.atom2
n674.out → n696.formula2
n700.out → n696.atom3
n693.out → n696.formula3
n683.out → n682.a
n696.out → n682.b
n655.out → n654.a
n682.out → n654.b
n702.out → n701.assertion
n703.out → n701.atom1
n18.out → n701.formula1
n704.out → n701.atom2
n639.out → n701.formula2
n705.out → n701.atom3
n692.out → n701.formula3
n654.out → n653.a
n701.out → n653.b
n343.out → n342.a
n653.out → n342.b
n709.out → n708.assertion
n710.out → n708.atom1
n28.out → n708.formula1
n711.out → n708.atom2
n271.out → n708.formula2
n712.out → n708.atom3
n661.out → n708.formula3
n714.out → n713.assertion
n28.out → n716.a
n661.out → n716.b
n326.out → n717.a
n716.out → n717.b
n692.out → n718.a
n717.out → n718.b
n715.out → n713.atom1
n718.out → n713.formula1
n719.out → n713.atom2
n18.out → n713.formula2
n708.out → n707.a
n713.out → n707.b
n721.out → n720.assertion
n722.out → n720.atom1
n18.out → n720.formula1
n723.out → n720.atom2
n692.out → n720.formula2
n724.out → n720.atom3
n717.out → n720.formula3
n707.out → n706.a
n720.out → n706.b
n342.out → n341.a
n706.out → n341.b
n726.out → n725.assertion
n727.out → n725.atom1
n18.out → n725.formula1
n728.out → n725.atom2
n326.out → n725.formula2
n729.out → n725.atom3
n716.out → n725.formula3
n341.out → n340.a
n725.out → n340.b
n5.out → n4.a
n340.out → n4.b
n4.out → n3.assertion
n731.out → n730.assertion
n732.out → n730.atom1
n18.out → n730.formula1
n733.out → n730.atom2
n716.out → n730.formula2
n3.out → n2.a
n730.out → n2.b
n737.out → n736.assertion
n738.out → n736.atom1
n28.out → n736.formula1
n739.out → n736.atom2
n661.out → n736.formula2
n741.out → n740.assertion
n716.out → n743.a
n661.out → n744.a
n28.out → n745.a
n744.out → n745.b
n743.out → n746.a
n745.out → n746.b
n742.out → n740.atom1
n746.out → n740.formula1
n747.out → n740.atom2
n18.out → n740.formula2
n736.out → n735.a
n740.out → n735.b
n749.out → n748.assertion
n750.out → n748.atom1
n18.out → n748.formula1
n751.out → n748.atom2
n743.out → n748.formula2
n752.out → n748.atom3
n745.out → n748.formula3
n735.out → n734.a
n748.out → n734.b
n2.out → n1.a
n734.out → n1.b
n1.out → n753.proof
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
- 参考解：102 个模块 / 155 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n103  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  mp
n4  mp
n5  subst
n6  定理 *01
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
n17  subst
n18  axiom A1
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
n29  subst
n30  axiom A1
n31  atom P
n32  imp
n33  atom Q
n34  mp
n35  mp
n36  subst
n37  定理 *05
n38  atom P
n39  atom Q
n40  atom R
n41  subst
n42  axiom A1
n43  atom P
n44  imp
n45  imp
n46  imp
n47  atom Q
n48  subst
n49  axiom A2
n50  atom P
n51  atom Q
n52  atom R
n53  subst
n54  axiom A2
n55  atom P
n56  atom Q
n57  atom R
n58  subst
n59  axiom A2
n60  atom P
n61  atom Q
n62  atom R
n63  mp
n64  mp
n65  mp
n66  subst
n67  定理 *01
n68  atom P
n69  mp
n70  mp
n71  leibniz(mode=replace, v=z)
n72  subst
n73  axiom A1
n74  atom P
n75  imp
n76  imp
n77  atom Q
n78  subst
n79  axiom A2
n80  atom P
n81  atom Q
n82  atom R
n83  mp
n84  mp
n85  iff-intro-ax
n86  subst
n87  axiom A1
n88  atom P
n89  iff
n90  imp
n91  imp
n92  atom Q
n93  subst
n94  axiom A2
n95  atom P
n96  atom Q
n97  atom R
n98  subst
n99  axiom A2
n100  atom P
n101  atom Q
n102  atom R

接线：
n6.out → n5.assertion
n8.out → n10.t1
n9.out → n10.t2
n7.out → n5.atom1
n10.out → n5.formula1
n9.out → n14.x
n8.out → n14.y
n9.out → n16.t1
n15.out → n16.t2
n16.out → n14.formula
n18.out → n17.assertion
n9.out → n20.t1
n8.out → n20.t2
n8.out → n21.t1
n15.out → n21.t2
n16.out → n22.a
n21.out → n22.b
n20.out → n23.a
n22.out → n23.b
n19.out → n17.atom1
n23.out → n17.formula1
n24.out → n17.atom2
n10.out → n17.formula2
n14.out → n13.a
n17.out → n13.b
n30.out → n29.assertion
n10.out → n32.a
n20.out → n32.b
n31.out → n29.atom1
n32.out → n29.formula1
n33.out → n29.atom2
n10.out → n29.formula2
n28.out → n27.a
n29.out → n27.b
n37.out → n36.assertion
n38.out → n36.atom1
n10.out → n36.formula1
n39.out → n36.atom2
n20.out → n36.formula2
n40.out → n36.atom3
n22.out → n36.formula3
n42.out → n41.assertion
n10.out → n44.a
n22.out → n44.b
n23.out → n45.a
n44.out → n45.b
n32.out → n46.a
n45.out → n46.b
n43.out → n41.atom1
n46.out → n41.formula1
n47.out → n41.atom2
n10.out → n41.formula2
n36.out → n35.a
n41.out → n35.b
n49.out → n48.assertion
n50.out → n48.atom1
n10.out → n48.formula1
n51.out → n48.atom2
n32.out → n48.formula2
n52.out → n48.atom3
n45.out → n48.formula3
n35.out → n34.a
n48.out → n34.b
n27.out → n26.a
n34.out → n26.b
n54.out → n53.assertion
n55.out → n53.atom1
n10.out → n53.formula1
n56.out → n53.atom2
n23.out → n53.formula2
n57.out → n53.atom3
n44.out → n53.formula3
n26.out → n25.a
n53.out → n25.b
n13.out → n12.a
n25.out → n12.b
n59.out → n58.assertion
n60.out → n58.atom1
n10.out → n58.formula1
n61.out → n58.atom2
n10.out → n58.formula2
n62.out → n58.atom3
n22.out → n58.formula3
n12.out → n11.a
n58.out → n11.b
n5.out → n4.a
n11.out → n4.b
n67.out → n66.assertion
n68.out → n66.atom1
n10.out → n66.formula1
n8.out → n71.x
n9.out → n71.y
n21.out → n71.formula
n73.out → n72.assertion
n21.out → n75.a
n16.out → n75.b
n10.out → n76.a
n75.out → n76.b
n74.out → n72.atom1
n76.out → n72.formula1
n77.out → n72.atom2
n10.out → n72.formula2
n71.out → n70.a
n72.out → n70.b
n79.out → n78.assertion
n80.out → n78.atom1
n10.out → n78.formula1
n81.out → n78.atom2
n10.out → n78.formula2
n82.out → n78.atom3
n75.out → n78.formula3
n70.out → n69.a
n78.out → n69.b
n66.out → n65.a
n69.out → n65.b
n21.out → n85.a
n16.out → n85.b
n87.out → n86.assertion
n21.out → n89.a
n16.out → n89.b
n22.out → n90.a
n89.out → n90.b
n75.out → n91.a
n90.out → n91.b
n88.out → n86.atom1
n91.out → n86.formula1
n92.out → n86.atom2
n10.out → n86.formula2
n85.out → n84.a
n86.out → n84.b
n94.out → n93.assertion
n95.out → n93.atom1
n10.out → n93.formula1
n96.out → n93.atom2
n75.out → n93.formula2
n97.out → n93.atom3
n90.out → n93.formula3
n84.out → n83.a
n93.out → n83.b
n65.out → n64.a
n83.out → n64.b
n99.out → n98.assertion
n100.out → n98.atom1
n10.out → n98.formula1
n101.out → n98.atom2
n22.out → n98.formula2
n102.out → n98.atom3
n89.out → n98.formula3
n64.out → n63.a
n98.out → n63.b
n4.out → n3.a
n63.out → n3.b
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n103.proof
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
- 参考解：103 个模块 / 156 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n104  [target]
n1  gen(v=x)
n2  gen(v=y)
n3  gen(v=z)
n4  mp
n5  mp
n6  subst
n7  定理 *01
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
n18  subst
n19  axiom A1
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
n30  subst
n31  axiom A1
n32  atom P
n33  imp
n34  atom Q
n35  mp
n36  mp
n37  subst
n38  定理 *05
n39  atom P
n40  atom Q
n41  atom R
n42  subst
n43  axiom A1
n44  atom P
n45  imp
n46  imp
n47  imp
n48  atom Q
n49  subst
n50  axiom A2
n51  atom P
n52  atom Q
n53  atom R
n54  subst
n55  axiom A2
n56  atom P
n57  atom Q
n58  atom R
n59  subst
n60  axiom A2
n61  atom P
n62  atom Q
n63  atom R
n64  mp
n65  mp
n66  mp
n67  subst
n68  定理 *01
n69  atom P
n70  mp
n71  mp
n72  leibniz(mode=replace, v=z)
n73  subst
n74  axiom A1
n75  atom P
n76  imp
n77  imp
n78  atom Q
n79  subst
n80  axiom A2
n81  atom P
n82  atom Q
n83  atom R
n84  mp
n85  mp
n86  iff-intro-ax
n87  subst
n88  axiom A1
n89  atom P
n90  iff
n91  imp
n92  imp
n93  atom Q
n94  subst
n95  axiom A2
n96  atom P
n97  atom Q
n98  atom R
n99  subst
n100  axiom A2
n101  atom P
n102  atom Q
n103  atom R

接线：
n7.out → n6.assertion
n9.out → n11.t1
n10.out → n11.t2
n8.out → n6.atom1
n11.out → n6.formula1
n10.out → n15.x
n9.out → n15.y
n10.out → n17.a
n16.out → n17.b
n17.out → n15.formula
n19.out → n18.assertion
n10.out → n21.t1
n9.out → n21.t2
n9.out → n22.a
n16.out → n22.b
n17.out → n23.a
n22.out → n23.b
n21.out → n24.a
n23.out → n24.b
n20.out → n18.atom1
n24.out → n18.formula1
n25.out → n18.atom2
n11.out → n18.formula2
n15.out → n14.a
n18.out → n14.b
n31.out → n30.assertion
n11.out → n33.a
n21.out → n33.b
n32.out → n30.atom1
n33.out → n30.formula1
n34.out → n30.atom2
n11.out → n30.formula2
n29.out → n28.a
n30.out → n28.b
n38.out → n37.assertion
n39.out → n37.atom1
n11.out → n37.formula1
n40.out → n37.atom2
n21.out → n37.formula2
n41.out → n37.atom3
n23.out → n37.formula3
n43.out → n42.assertion
n11.out → n45.a
n23.out → n45.b
n24.out → n46.a
n45.out → n46.b
n33.out → n47.a
n46.out → n47.b
n44.out → n42.atom1
n47.out → n42.formula1
n48.out → n42.atom2
n11.out → n42.formula2
n37.out → n36.a
n42.out → n36.b
n50.out → n49.assertion
n51.out → n49.atom1
n11.out → n49.formula1
n52.out → n49.atom2
n33.out → n49.formula2
n53.out → n49.atom3
n46.out → n49.formula3
n36.out → n35.a
n49.out → n35.b
n28.out → n27.a
n35.out → n27.b
n55.out → n54.assertion
n56.out → n54.atom1
n11.out → n54.formula1
n57.out → n54.atom2
n24.out → n54.formula2
n58.out → n54.atom3
n45.out → n54.formula3
n27.out → n26.a
n54.out → n26.b
n14.out → n13.a
n26.out → n13.b
n60.out → n59.assertion
n61.out → n59.atom1
n11.out → n59.formula1
n62.out → n59.atom2
n11.out → n59.formula2
n63.out → n59.atom3
n23.out → n59.formula3
n13.out → n12.a
n59.out → n12.b
n6.out → n5.a
n12.out → n5.b
n68.out → n67.assertion
n69.out → n67.atom1
n11.out → n67.formula1
n9.out → n72.x
n10.out → n72.y
n22.out → n72.formula
n74.out → n73.assertion
n22.out → n76.a
n17.out → n76.b
n11.out → n77.a
n76.out → n77.b
n75.out → n73.atom1
n77.out → n73.formula1
n78.out → n73.atom2
n11.out → n73.formula2
n72.out → n71.a
n73.out → n71.b
n80.out → n79.assertion
n81.out → n79.atom1
n11.out → n79.formula1
n82.out → n79.atom2
n11.out → n79.formula2
n83.out → n79.atom3
n76.out → n79.formula3
n71.out → n70.a
n79.out → n70.b
n67.out → n66.a
n70.out → n66.b
n22.out → n86.a
n17.out → n86.b
n88.out → n87.assertion
n22.out → n90.a
n17.out → n90.b
n23.out → n91.a
n90.out → n91.b
n76.out → n92.a
n91.out → n92.b
n89.out → n87.atom1
n92.out → n87.formula1
n93.out → n87.atom2
n11.out → n87.formula2
n86.out → n85.a
n87.out → n85.b
n95.out → n94.assertion
n96.out → n94.atom1
n11.out → n94.formula1
n97.out → n94.atom2
n76.out → n94.formula2
n98.out → n94.atom3
n91.out → n94.formula3
n85.out → n84.a
n94.out → n84.b
n66.out → n65.a
n84.out → n65.b
n100.out → n99.assertion
n101.out → n99.atom1
n11.out → n99.formula1
n102.out → n99.atom2
n23.out → n99.formula2
n103.out → n99.atom3
n90.out → n99.formula3
n65.out → n64.a
n99.out → n64.b
n5.out → n4.a
n64.out → n4.b
n4.out → n3.assertion
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n104.proof
```

</details>

### *93 · 三层等词链（双向）

- 目标：`⊢ ∀ y ∀ z ∀ x ( y = z → ( x ∈ y ↔ x ∈ z ) )`
- 提示：反向需要 z=y：把 *56 连续例化两次；再用 Leibniz 两个方向、HS 与 ↔I，最后 DT 消去 y=z。
- 参考解：134 个模块 / 204 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n135  [target]
n1  gen(v=y)
n2  gen(v=z)
n3  gen(v=x)
n4  mp
n5  mp
n6  subst
n7  定理 *01
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
n18  subst
n19  axiom A1
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
n32  subst
n33  axiom A1
n34  atom P
n35  pred =
n36  atom Q
n37  mp
n38  mp
n39  subst
n40  定理 *01
n41  atom P
n42  mp
n43  mp
n44  leibniz(mode=abstract, v=z)
n45  subst
n46  axiom A1
n47  atom P
n48  imp
n49  imp
n50  atom Q
n51  subst
n52  axiom A2
n53  atom P
n54  atom Q
n55  atom R
n56  subst
n57  axiom A2
n58  atom P
n59  atom Q
n60  atom R
n61  subst
n62  axiom A1
n63  atom P
n64  imp
n65  atom Q
n66  mp
n67  mp
n68  subst
n69  定理 *05
n70  atom P
n71  atom Q
n72  atom R
n73  subst
n74  axiom A1
n75  atom P
n76  imp
n77  imp
n78  imp
n79  atom Q
n80  subst
n81  axiom A2
n82  atom P
n83  atom Q
n84  atom R
n85  subst
n86  axiom A2
n87  atom P
n88  atom Q
n89  atom R
n90  subst
n91  axiom A2
n92  atom P
n93  atom Q
n94  atom R
n95  mp
n96  mp
n97  mp
n98  subst
n99  定理 *01
n100  atom P
n101  mp
n102  mp
n103  leibniz(mode=replace, v=z)
n104  subst
n105  axiom A1
n106  atom P
n107  imp
n108  imp
n109  atom Q
n110  subst
n111  axiom A2
n112  atom P
n113  atom Q
n114  atom R
n115  mp
n116  mp
n117  iff-intro-ax
n118  subst
n119  axiom A1
n120  atom P
n121  iff
n122  imp
n123  imp
n124  atom Q
n125  subst
n126  axiom A2
n127  atom P
n128  atom Q
n129  atom R
n130  subst
n131  axiom A2
n132  atom P
n133  atom Q
n134  atom R

接线：
n7.out → n6.assertion
n9.out → n11.t1
n10.out → n11.t2
n8.out → n6.atom1
n11.out → n6.formula1
n10.out → n15.x
n9.out → n15.y
n16.out → n17.a
n10.out → n17.b
n17.out → n15.formula
n19.out → n18.assertion
n10.out → n21.t1
n9.out → n21.t2
n16.out → n22.a
n9.out → n22.b
n17.out → n23.a
n22.out → n23.b
n21.out → n24.a
n23.out → n24.b
n20.out → n18.atom1
n24.out → n18.formula1
n25.out → n18.atom2
n11.out → n18.formula2
n15.out → n14.a
n18.out → n14.b
n33.out → n32.assertion
n9.out → n35.t1
n9.out → n35.t2
n34.out → n32.atom1
n35.out → n32.formula1
n36.out → n32.atom2
n11.out → n32.formula2
n31.out → n30.a
n32.out → n30.b
n40.out → n39.assertion
n41.out → n39.atom1
n11.out → n39.formula1
n9.out → n44.x
n10.out → n44.y
n21.out → n44.formula
n46.out → n45.assertion
n35.out → n48.a
n21.out → n48.b
n11.out → n49.a
n48.out → n49.b
n47.out → n45.atom1
n49.out → n45.formula1
n50.out → n45.atom2
n11.out → n45.formula2
n44.out → n43.a
n45.out → n43.b
n52.out → n51.assertion
n53.out → n51.atom1
n11.out → n51.formula1
n54.out → n51.atom2
n11.out → n51.formula2
n55.out → n51.atom3
n48.out → n51.formula3
n43.out → n42.a
n51.out → n42.b
n39.out → n38.a
n42.out → n38.b
n57.out → n56.assertion
n58.out → n56.atom1
n11.out → n56.formula1
n59.out → n56.atom2
n35.out → n56.formula2
n60.out → n56.atom3
n21.out → n56.formula3
n38.out → n37.a
n56.out → n37.b
n30.out → n29.a
n37.out → n29.b
n62.out → n61.assertion
n11.out → n64.a
n21.out → n64.b
n63.out → n61.atom1
n64.out → n61.formula1
n65.out → n61.atom2
n11.out → n61.formula2
n29.out → n28.a
n61.out → n28.b
n69.out → n68.assertion
n70.out → n68.atom1
n11.out → n68.formula1
n71.out → n68.atom2
n21.out → n68.formula2
n72.out → n68.atom3
n23.out → n68.formula3
n74.out → n73.assertion
n11.out → n76.a
n23.out → n76.b
n24.out → n77.a
n76.out → n77.b
n64.out → n78.a
n77.out → n78.b
n75.out → n73.atom1
n78.out → n73.formula1
n79.out → n73.atom2
n11.out → n73.formula2
n68.out → n67.a
n73.out → n67.b
n81.out → n80.assertion
n82.out → n80.atom1
n11.out → n80.formula1
n83.out → n80.atom2
n64.out → n80.formula2
n84.out → n80.atom3
n77.out → n80.formula3
n67.out → n66.a
n80.out → n66.b
n28.out → n27.a
n66.out → n27.b
n86.out → n85.assertion
n87.out → n85.atom1
n11.out → n85.formula1
n88.out → n85.atom2
n24.out → n85.formula2
n89.out → n85.atom3
n76.out → n85.formula3
n27.out → n26.a
n85.out → n26.b
n14.out → n13.a
n26.out → n13.b
n91.out → n90.assertion
n92.out → n90.atom1
n11.out → n90.formula1
n93.out → n90.atom2
n11.out → n90.formula2
n94.out → n90.atom3
n23.out → n90.formula3
n13.out → n12.a
n90.out → n12.b
n6.out → n5.a
n12.out → n5.b
n99.out → n98.assertion
n100.out → n98.atom1
n11.out → n98.formula1
n9.out → n103.x
n10.out → n103.y
n22.out → n103.formula
n105.out → n104.assertion
n22.out → n107.a
n17.out → n107.b
n11.out → n108.a
n107.out → n108.b
n106.out → n104.atom1
n108.out → n104.formula1
n109.out → n104.atom2
n11.out → n104.formula2
n103.out → n102.a
n104.out → n102.b
n111.out → n110.assertion
n112.out → n110.atom1
n11.out → n110.formula1
n113.out → n110.atom2
n11.out → n110.formula2
n114.out → n110.atom3
n107.out → n110.formula3
n102.out → n101.a
n110.out → n101.b
n98.out → n97.a
n101.out → n97.b
n22.out → n117.a
n17.out → n117.b
n119.out → n118.assertion
n22.out → n121.a
n17.out → n121.b
n23.out → n122.a
n121.out → n122.b
n107.out → n123.a
n122.out → n123.b
n120.out → n118.atom1
n123.out → n118.formula1
n124.out → n118.atom2
n11.out → n118.formula2
n117.out → n116.a
n118.out → n116.b
n126.out → n125.assertion
n127.out → n125.atom1
n11.out → n125.formula1
n128.out → n125.atom2
n107.out → n125.formula2
n129.out → n125.atom3
n122.out → n125.formula3
n116.out → n115.a
n125.out → n115.b
n97.out → n96.a
n115.out → n96.b
n131.out → n130.assertion
n132.out → n130.atom1
n11.out → n130.formula1
n133.out → n130.atom2
n23.out → n130.formula2
n134.out → n130.atom3
n121.out → n130.formula3
n96.out → n95.a
n130.out → n95.b
n5.out → n4.a
n95.out → n4.b
n4.out → n3.assertion
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n135.proof
```

</details>

### *94 · 配对集含左元

- 目标：`⊢ ∀ x ∀ y ∃ u x ∈ u`
- 提示：从配对公理取 u，全称例化到 x，用 x=x∨x=y 与 ↔E 得到 x∈u，再 ∃I/∃E 与全称推广。
- 参考解：93 个模块 / 140 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n94  [target]
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
n12  subst
n13  axiom A1
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
n29  subst
n30  axiom A1
n31  atom P
n32  or
n33  imp
n34  atom Q
n35  subst
n36  axiom A2
n37  atom P
n38  atom Q
n39  atom R
n40  mp
n41  mp
n42  mp
n43  subst
n44  定理 *01
n45  atom P
n46  mp
n47  mp
n48  all-inst(v=z)
n49  subst
n50  axiom A1
n51  atom P
n52  mem
n53  iff
n54  imp
n55  atom Q
n56  subst
n57  axiom A2
n58  atom P
n59  atom Q
n60  atom R
n61  mp
n62  mp
n63  iff-elim-ax(dir=lr)
n64  subst
n65  axiom A1
n66  atom P
n67  imp
n68  imp
n69  atom Q
n70  subst
n71  axiom A2
n72  atom P
n73  atom Q
n74  atom R
n75  subst
n76  axiom A2
n77  atom P
n78  atom Q
n79  atom R
n80  mp
n81  mp
n82  exists-gen(v=u)
n83  subst
n84  axiom A1
n85  atom P
n86  exists(v=u)
n87  imp
n88  atom Q
n89  subst
n90  axiom A2
n91  atom P
n92  atom Q
n93  atom R

接线：
n5.out → n4.u
n6.out → n4.v
n4.out → n3.exists
n13.out → n12.assertion
n5.out → n15.t1
n5.out → n15.t2
n14.out → n12.atom1
n15.out → n12.formula1
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
n16.out → n12.atom2
n24.out → n12.formula2
n11.out → n10.a
n12.out → n10.b
n15.out → n27.a
n5.out → n28.t1
n6.out → n28.t2
n28.out → n27.b
n30.out → n29.assertion
n15.out → n32.a
n28.out → n32.b
n15.out → n33.a
n32.out → n33.b
n31.out → n29.atom1
n33.out → n29.formula1
n34.out → n29.atom2
n24.out → n29.formula2
n27.out → n26.a
n29.out → n26.b
n36.out → n35.assertion
n37.out → n35.atom1
n24.out → n35.formula1
n38.out → n35.atom2
n15.out → n35.formula2
n39.out → n35.atom3
n32.out → n35.formula3
n26.out → n25.a
n35.out → n25.b
n10.out → n9.a
n25.out → n9.b
n44.out → n43.assertion
n45.out → n43.atom1
n24.out → n43.formula1
n23.out → n48.formula
n5.out → n48.term
n50.out → n49.assertion
n5.out → n52.a
n21.out → n52.b
n32.out → n53.a
n52.out → n53.b
n24.out → n54.a
n53.out → n54.b
n51.out → n49.atom1
n54.out → n49.formula1
n55.out → n49.atom2
n24.out → n49.formula2
n48.out → n47.a
n49.out → n47.b
n57.out → n56.assertion
n58.out → n56.atom1
n24.out → n56.formula1
n59.out → n56.atom2
n24.out → n56.formula2
n60.out → n56.atom3
n53.out → n56.formula3
n47.out → n46.a
n56.out → n46.b
n43.out → n42.a
n46.out → n42.b
n32.out → n63.a
n52.out → n63.b
n65.out → n64.assertion
n32.out → n67.a
n52.out → n67.b
n53.out → n68.a
n67.out → n68.b
n66.out → n64.atom1
n68.out → n64.formula1
n69.out → n64.atom2
n24.out → n64.formula2
n63.out → n62.a
n64.out → n62.b
n71.out → n70.assertion
n72.out → n70.atom1
n24.out → n70.formula1
n73.out → n70.atom2
n53.out → n70.formula2
n74.out → n70.atom3
n67.out → n70.formula3
n62.out → n61.a
n70.out → n61.b
n42.out → n41.a
n61.out → n41.b
n76.out → n75.assertion
n77.out → n75.atom1
n24.out → n75.formula1
n78.out → n75.atom2
n32.out → n75.formula2
n79.out → n75.atom3
n52.out → n75.formula3
n41.out → n40.a
n75.out → n40.b
n9.out → n8.a
n40.out → n8.b
n52.out → n82.formula
n21.out → n82.term
n84.out → n83.assertion
n52.out → n86.a
n52.out → n87.a
n86.out → n87.b
n85.out → n83.atom1
n87.out → n83.formula1
n88.out → n83.atom2
n24.out → n83.formula2
n82.out → n81.a
n83.out → n81.b
n90.out → n89.assertion
n91.out → n89.atom1
n24.out → n89.formula1
n92.out → n89.atom2
n52.out → n89.formula2
n93.out → n89.atom3
n86.out → n89.formula3
n81.out → n80.a
n89.out → n80.b
n8.out → n7.a
n80.out → n7.b
n7.out → n3.implication
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n94.proof
```

</details>

### *95 · 配对集含右元

- 目标：`⊢ ∀ x ∀ y ∃ u y ∈ u`
- 提示：同左元，但用 y=y 从析取的右支进入。
- 参考解：93 个模块 / 140 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n94  [target]
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
n12  subst
n13  axiom A1
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
n29  subst
n30  axiom A1
n31  atom P
n32  or
n33  imp
n34  atom Q
n35  subst
n36  axiom A2
n37  atom P
n38  atom Q
n39  atom R
n40  mp
n41  mp
n42  mp
n43  subst
n44  定理 *01
n45  atom P
n46  mp
n47  mp
n48  all-inst(v=z)
n49  subst
n50  axiom A1
n51  atom P
n52  mem
n53  iff
n54  imp
n55  atom Q
n56  subst
n57  axiom A2
n58  atom P
n59  atom Q
n60  atom R
n61  mp
n62  mp
n63  iff-elim-ax(dir=lr)
n64  subst
n65  axiom A1
n66  atom P
n67  imp
n68  imp
n69  atom Q
n70  subst
n71  axiom A2
n72  atom P
n73  atom Q
n74  atom R
n75  subst
n76  axiom A2
n77  atom P
n78  atom Q
n79  atom R
n80  mp
n81  mp
n82  exists-gen(v=u)
n83  subst
n84  axiom A1
n85  atom P
n86  exists(v=u)
n87  imp
n88  atom Q
n89  subst
n90  axiom A2
n91  atom P
n92  atom Q
n93  atom R

接线：
n5.out → n4.u
n6.out → n4.v
n4.out → n3.exists
n13.out → n12.assertion
n6.out → n15.t1
n6.out → n15.t2
n14.out → n12.atom1
n15.out → n12.formula1
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
n16.out → n12.atom2
n24.out → n12.formula2
n11.out → n10.a
n12.out → n10.b
n6.out → n28.t1
n5.out → n28.t2
n28.out → n27.a
n15.out → n27.b
n30.out → n29.assertion
n28.out → n32.a
n15.out → n32.b
n15.out → n33.a
n32.out → n33.b
n31.out → n29.atom1
n33.out → n29.formula1
n34.out → n29.atom2
n24.out → n29.formula2
n27.out → n26.a
n29.out → n26.b
n36.out → n35.assertion
n37.out → n35.atom1
n24.out → n35.formula1
n38.out → n35.atom2
n15.out → n35.formula2
n39.out → n35.atom3
n32.out → n35.formula3
n26.out → n25.a
n35.out → n25.b
n10.out → n9.a
n25.out → n9.b
n44.out → n43.assertion
n45.out → n43.atom1
n24.out → n43.formula1
n23.out → n48.formula
n6.out → n48.term
n50.out → n49.assertion
n6.out → n52.a
n21.out → n52.b
n32.out → n53.a
n52.out → n53.b
n24.out → n54.a
n53.out → n54.b
n51.out → n49.atom1
n54.out → n49.formula1
n55.out → n49.atom2
n24.out → n49.formula2
n48.out → n47.a
n49.out → n47.b
n57.out → n56.assertion
n58.out → n56.atom1
n24.out → n56.formula1
n59.out → n56.atom2
n24.out → n56.formula2
n60.out → n56.atom3
n53.out → n56.formula3
n47.out → n46.a
n56.out → n46.b
n43.out → n42.a
n46.out → n42.b
n32.out → n63.a
n52.out → n63.b
n65.out → n64.assertion
n32.out → n67.a
n52.out → n67.b
n53.out → n68.a
n67.out → n68.b
n66.out → n64.atom1
n68.out → n64.formula1
n69.out → n64.atom2
n24.out → n64.formula2
n63.out → n62.a
n64.out → n62.b
n71.out → n70.assertion
n72.out → n70.atom1
n24.out → n70.formula1
n73.out → n70.atom2
n53.out → n70.formula2
n74.out → n70.atom3
n67.out → n70.formula3
n62.out → n61.a
n70.out → n61.b
n42.out → n41.a
n61.out → n41.b
n76.out → n75.assertion
n77.out → n75.atom1
n24.out → n75.formula1
n78.out → n75.atom2
n32.out → n75.formula2
n79.out → n75.atom3
n52.out → n75.formula3
n41.out → n40.a
n75.out → n40.b
n9.out → n8.a
n40.out → n8.b
n52.out → n82.formula
n21.out → n82.term
n84.out → n83.assertion
n52.out → n86.a
n52.out → n87.a
n86.out → n87.b
n85.out → n83.atom1
n87.out → n83.formula1
n88.out → n83.atom2
n24.out → n83.formula2
n82.out → n81.a
n83.out → n81.b
n90.out → n89.assertion
n91.out → n89.atom1
n24.out → n89.formula1
n92.out → n89.atom2
n52.out → n89.formula2
n93.out → n89.atom3
n86.out → n89.formula3
n81.out → n80.a
n89.out → n80.b
n8.out → n7.a
n80.out → n7.b
n7.out → n3.implication
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n94.proof
```

</details>

### *96 · 综合：配对给出公共容器

- 目标：`⊢ ∀ x ∀ y ∃ u ( x ∈ u ∧ y ∈ u )`
- 提示：在同一个配对集 u 上分别取 x∈u、y∈u，用 ∧I 合并，再用 ∃I 收束；两次存在消去。
- 参考解：180 个模块 / 276 条接线

<details><summary>展开参考电路</summary>

```text
模块：
n181  [target]
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
n13  subst
n14  axiom A1
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
n30  subst
n31  axiom A1
n32  atom P
n33  or
n34  imp
n35  atom Q
n36  subst
n37  axiom A2
n38  atom P
n39  atom Q
n40  atom R
n41  mp
n42  mp
n43  mp
n44  subst
n45  定理 *01
n46  atom P
n47  mp
n48  mp
n49  all-inst(v=z)
n50  subst
n51  axiom A1
n52  atom P
n53  mem
n54  iff
n55  imp
n56  atom Q
n57  subst
n58  axiom A2
n59  atom P
n60  atom Q
n61  atom R
n62  mp
n63  mp
n64  iff-elim-ax(dir=lr)
n65  subst
n66  axiom A1
n67  atom P
n68  imp
n69  imp
n70  atom Q
n71  subst
n72  axiom A2
n73  atom P
n74  atom Q
n75  atom R
n76  subst
n77  axiom A2
n78  atom P
n79  atom Q
n80  atom R
n81  mp
n82  mp
n83  mp
n84  mp
n85  mp
n86  eq-refl(t=x)
n87  subst
n88  axiom A1
n89  atom P
n90  pred =
n91  atom Q
n92  mp
n93  mp
n94  or-intro-ax(side=l)
n95  pred =
n96  subst
n97  axiom A1
n98  atom P
n99  or
n100  imp
n101  atom Q
n102  subst
n103  axiom A2
n104  atom P
n105  atom Q
n106  atom R
n107  mp
n108  mp
n109  mp
n110  subst
n111  定理 *01
n112  atom P
n113  mp
n114  mp
n115  all-inst(v=z)
n116  subst
n117  axiom A1
n118  atom P
n119  mem
n120  iff
n121  imp
n122  atom Q
n123  subst
n124  axiom A2
n125  atom P
n126  atom Q
n127  atom R
n128  mp
n129  mp
n130  iff-elim-ax(dir=lr)
n131  subst
n132  axiom A1
n133  atom P
n134  imp
n135  imp
n136  atom Q
n137  subst
n138  axiom A2
n139  atom P
n140  atom Q
n141  atom R
n142  subst
n143  axiom A2
n144  atom P
n145  atom Q
n146  atom R
n147  mp
n148  mp
n149  and-intro-ax
n150  subst
n151  axiom A1
n152  atom P
n153  and
n154  imp
n155  imp
n156  atom Q
n157  subst
n158  axiom A2
n159  atom P
n160  atom Q
n161  atom R
n162  subst
n163  axiom A2
n164  atom P
n165  atom Q
n166  atom R
n167  mp
n168  mp
n169  exists-gen(v=u)
n170  subst
n171  axiom A1
n172  atom P
n173  exists(v=u)
n174  imp
n175  atom Q
n176  subst
n177  axiom A2
n178  atom P
n179  atom Q
n180  atom R

接线：
n5.out → n4.u
n6.out → n4.v
n4.out → n3.exists
n14.out → n13.assertion
n6.out → n16.t1
n6.out → n16.t2
n15.out → n13.atom1
n16.out → n13.formula1
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
n17.out → n13.atom2
n25.out → n13.formula2
n12.out → n11.a
n13.out → n11.b
n6.out → n29.t1
n5.out → n29.t2
n29.out → n28.a
n16.out → n28.b
n31.out → n30.assertion
n29.out → n33.a
n16.out → n33.b
n16.out → n34.a
n33.out → n34.b
n32.out → n30.atom1
n34.out → n30.formula1
n35.out → n30.atom2
n25.out → n30.formula2
n28.out → n27.a
n30.out → n27.b
n37.out → n36.assertion
n38.out → n36.atom1
n25.out → n36.formula1
n39.out → n36.atom2
n16.out → n36.formula2
n40.out → n36.atom3
n33.out → n36.formula3
n27.out → n26.a
n36.out → n26.b
n11.out → n10.a
n26.out → n10.b
n45.out → n44.assertion
n46.out → n44.atom1
n25.out → n44.formula1
n24.out → n49.formula
n6.out → n49.term
n51.out → n50.assertion
n6.out → n53.a
n22.out → n53.b
n33.out → n54.a
n53.out → n54.b
n25.out → n55.a
n54.out → n55.b
n52.out → n50.atom1
n55.out → n50.formula1
n56.out → n50.atom2
n25.out → n50.formula2
n49.out → n48.a
n50.out → n48.b
n58.out → n57.assertion
n59.out → n57.atom1
n25.out → n57.formula1
n60.out → n57.atom2
n25.out → n57.formula2
n61.out → n57.atom3
n54.out → n57.formula3
n48.out → n47.a
n57.out → n47.b
n44.out → n43.a
n47.out → n43.b
n33.out → n64.a
n53.out → n64.b
n66.out → n65.assertion
n33.out → n68.a
n53.out → n68.b
n54.out → n69.a
n68.out → n69.b
n67.out → n65.atom1
n69.out → n65.formula1
n70.out → n65.atom2
n25.out → n65.formula2
n64.out → n63.a
n65.out → n63.b
n72.out → n71.assertion
n73.out → n71.atom1
n25.out → n71.formula1
n74.out → n71.atom2
n54.out → n71.formula2
n75.out → n71.atom3
n68.out → n71.formula3
n63.out → n62.a
n71.out → n62.b
n43.out → n42.a
n62.out → n42.b
n77.out → n76.assertion
n78.out → n76.atom1
n25.out → n76.formula1
n79.out → n76.atom2
n33.out → n76.formula2
n80.out → n76.atom3
n53.out → n76.formula3
n42.out → n41.a
n76.out → n41.b
n10.out → n9.a
n41.out → n9.b
n88.out → n87.assertion
n5.out → n90.t1
n5.out → n90.t2
n89.out → n87.atom1
n90.out → n87.formula1
n91.out → n87.atom2
n25.out → n87.formula2
n86.out → n85.a
n87.out → n85.b
n90.out → n94.a
n5.out → n95.t1
n6.out → n95.t2
n95.out → n94.b
n97.out → n96.assertion
n90.out → n99.a
n95.out → n99.b
n90.out → n100.a
n99.out → n100.b
n98.out → n96.atom1
n100.out → n96.formula1
n101.out → n96.atom2
n25.out → n96.formula2
n94.out → n93.a
n96.out → n93.b
n103.out → n102.assertion
n104.out → n102.atom1
n25.out → n102.formula1
n105.out → n102.atom2
n90.out → n102.formula2
n106.out → n102.atom3
n99.out → n102.formula3
n93.out → n92.a
n102.out → n92.b
n85.out → n84.a
n92.out → n84.b
n111.out → n110.assertion
n112.out → n110.atom1
n25.out → n110.formula1
n24.out → n115.formula
n5.out → n115.term
n117.out → n116.assertion
n5.out → n119.a
n22.out → n119.b
n99.out → n120.a
n119.out → n120.b
n25.out → n121.a
n120.out → n121.b
n118.out → n116.atom1
n121.out → n116.formula1
n122.out → n116.atom2
n25.out → n116.formula2
n115.out → n114.a
n116.out → n114.b
n124.out → n123.assertion
n125.out → n123.atom1
n25.out → n123.formula1
n126.out → n123.atom2
n25.out → n123.formula2
n127.out → n123.atom3
n120.out → n123.formula3
n114.out → n113.a
n123.out → n113.b
n110.out → n109.a
n113.out → n109.b
n99.out → n130.a
n119.out → n130.b
n132.out → n131.assertion
n99.out → n134.a
n119.out → n134.b
n120.out → n135.a
n134.out → n135.b
n133.out → n131.atom1
n135.out → n131.formula1
n136.out → n131.atom2
n25.out → n131.formula2
n130.out → n129.a
n131.out → n129.b
n138.out → n137.assertion
n139.out → n137.atom1
n25.out → n137.formula1
n140.out → n137.atom2
n120.out → n137.formula2
n141.out → n137.atom3
n134.out → n137.formula3
n129.out → n128.a
n137.out → n128.b
n109.out → n108.a
n128.out → n108.b
n143.out → n142.assertion
n144.out → n142.atom1
n25.out → n142.formula1
n145.out → n142.atom2
n99.out → n142.formula2
n146.out → n142.atom3
n119.out → n142.formula3
n108.out → n107.a
n142.out → n107.b
n84.out → n83.a
n107.out → n83.b
n119.out → n149.a
n53.out → n149.b
n151.out → n150.assertion
n119.out → n153.a
n53.out → n153.b
n53.out → n154.a
n153.out → n154.b
n119.out → n155.a
n154.out → n155.b
n152.out → n150.atom1
n155.out → n150.formula1
n156.out → n150.atom2
n25.out → n150.formula2
n149.out → n148.a
n150.out → n148.b
n158.out → n157.assertion
n159.out → n157.atom1
n25.out → n157.formula1
n160.out → n157.atom2
n119.out → n157.formula2
n161.out → n157.atom3
n154.out → n157.formula3
n148.out → n147.a
n157.out → n147.b
n83.out → n82.a
n147.out → n82.b
n163.out → n162.assertion
n164.out → n162.atom1
n25.out → n162.formula1
n165.out → n162.atom2
n53.out → n162.formula2
n166.out → n162.atom3
n153.out → n162.formula3
n82.out → n81.a
n162.out → n81.b
n9.out → n8.a
n81.out → n8.b
n153.out → n169.formula
n22.out → n169.term
n171.out → n170.assertion
n153.out → n173.a
n153.out → n174.a
n173.out → n174.b
n172.out → n170.atom1
n174.out → n170.formula1
n175.out → n170.atom2
n25.out → n170.formula2
n169.out → n168.a
n170.out → n168.b
n177.out → n176.assertion
n178.out → n176.atom1
n25.out → n176.formula1
n179.out → n176.atom2
n153.out → n176.formula2
n180.out → n176.atom3
n173.out → n176.formula3
n168.out → n167.a
n176.out → n167.b
n8.out → n7.a
n167.out → n7.b
n7.out → n3.implication
n3.out → n2.assertion
n2.out → n1.assertion
n1.out → n181.proof
```

</details>
