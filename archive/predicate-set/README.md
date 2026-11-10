# 第 Ⅱ/Ⅲ/Ⅳ 章冻结归档（谓词 / 等词 / 集合论）

> **一句话**：这里保存的是 Axiom Board 还是「152 关四章」时的第 Ⅱ、Ⅲ、Ⅳ 章数据与作者源。
> 主游戏正在改造成**单章命题逻辑**（只保留第 Ⅰ 章），这三章从主游戏中移出，因此在这里冻结。
> 可玩性以 git tag `archive/predicate-set-v1` 为准，**不是**以本目录的 JSON 副本单独保证。

## 1. 这是什么

Axiom Board 是一个用一屏电路证明 Metamath `set.mm` 命题的静态网页游戏。152 关版本分四章：

| 章 | 主题 | 内容 |
| --- | --- | --- |
| Ⅰ | 命题演算 | A1–A3、S/M、∧/∨/↔ 的引理关 |
| Ⅱ | 谓词逻辑 | ∀E*、∀I + ∀*、∃I*、∃E |
| Ⅲ | 等词 | =I、=L（抽象）、=L（替换）、theorem 引用 |
| Ⅳ | 集合论 | EXT、EMPTY、PAIR、UNION 及其组合证明 |

本目录冻结的是其中的 **Ⅱ / Ⅲ / Ⅳ** 三章，共 **114 关**（每章 38 关：4 教学 + 10 普通 + 24 进阶）。

## 2. 为什么冻结

主游戏的产品方向已经收窄：新版本是**单章命题逻辑**，只保留第 Ⅰ 章的重做内容。第 Ⅱ/Ⅲ/Ⅳ 章
（谓词、等词、集合论）不再进入新主线的关卡表，但它们是已经编译、当时能跑通、且花了大量
设计工作的内容，直接删掉会失去可追溯性。因此：

- 数据与作者源**原样冻结**在 `archive/predicate-set/`；
- 完整可玩状态**锚定在 git tag**（含 `src/levels.js`、`campaign/campaign2-levels.json` 全量 152 关、
  引擎与 UI），tag 不移动；
- 主游戏后续对 `src/`、`scripts/`、`campaign/campaign2.js` 的改造**不影响**这份快照。

## 3. 冻结信息

| 项 | 值 |
| --- | --- |
| 归档日期 | 2026-11-10 |
| 冻结提交 | `8987493e3be7c8fe2c917d3cf0d54a531ba42c5d`（`8987493`，`Record final acceptance for the 152-level redesign`） |
| 标签 | `archive/predicate-set-v1`（annotated，指向上述提交，不移动） |
| 分支 | `main` |
| 冻结时关卡总数 | 152（Ⅰ/Ⅱ/Ⅲ/Ⅳ 各 38） |
| 本归档抽取 | 114 关（Ⅱ/Ⅲ/Ⅳ） |

## 4. 包含内容

| 文件 | 说明 |
| --- | --- |
| [`README.md`](README.md) | 本文件 |
| [`levels-ii-iv.json`](levels-ii-iv.json) | 从 `campaign/campaign2-levels.json` 抽取的 Ⅱ/Ⅲ/Ⅳ 章关卡，**源顺序、pretty-printed**，含章节/分带计数。`levels` 数组元素与编译产物逐字段一致，可直接作为关卡数据读取 |
| [`campaign2-snapshot.js`](campaign2-snapshot.js) | `campaign/campaign2.js` 的精确副本：git blob OID `cbb6c1573d1ad2c00e00eaee638810b8a41e16bb`，与**冻结提交 `8987493` 中的版本逐字节相同**（工作区后续的主游戏改造不计入）。即三章的作者源 |
| [`docs/LEVEL-REDESIGN-PLAN.md`](docs/LEVEL-REDESIGN-PLAN.md) | 四章重做施工图：约束、课程大纲、风险 |
| [`docs/HANDOFF-LOGIC.md`](docs/HANDOFF-LOGIC.md) | 逻辑系统重做交接清单 |
| [`docs/AXIOM-AUDIT.md`](docs/AXIOM-AUDIT.md) | 公理审计记录——下面「存疑公式」的原始出处 |
| [`manifest.json`](manifest.json) | 机器可读清单：tag/commit/日期/计数/文件 SHA-256/未包含项/note |
| [`restore.md`](restore.md) | 从 tag 还原冻结完整游戏、以及检视关卡的精确命令 |

各章关卡数与分带计数以 `manifest.json` 的 `levelCounts` 为准（校验过：38+38+38=114；
每章 tutorial 4 / base 10 / challenge 24）。

## 5. 主游戏移出了什么

152 关版本的主线里，下面这些**只属于** Ⅱ/Ⅲ/Ⅳ 章的东西不再进入新主游戏（新主线只有第 Ⅰ 章命题逻辑）：

- `campaign/campaign2.js` 中 Ⅱ/Ⅲ/Ⅳ 章的作者定义（`label` 引用与手写 `target/proof`）；
- `campaign/campaign2-levels.json` 中 `chapterGroup` 为 `Ⅱ`/`Ⅲ`/`Ⅳ` 的 114 个关卡对象；
- 由它编译进 `src/levels.js` 的对应关卡数据（`src/levels.js` 是 743 KB / 761,200 字节的生成产物，本归档**不复制**）；
- 谓词/等词/集合论专用的模块（∀/∃/=/∈/EXT/EMPTY/PAIR/UNION）、成就与说明文字中对应的章节描述。

保留在冻结提交里的东西（tag 内完整）：`src/levels.js` 全量关卡、引擎 `src/engine.js`/`src/board.js`/
`src/modules.js`、`campaign/campaign2-levels.json` 152 关、`campaign/mm/proofs/*.json` 证明数据、
`tests/` 验收脚本。**因此「完整可玩」这个说法只对 tag 成立**；本目录只是内容切片。

## 6. 怎么还原 / 怎么跑

见 [`restore.md`](restore.md)。最短路径：

```powershell
git clone "D:/Random Things/RusselL" ../RusselL-predicate-set
cd ../RusselL-predicate-set
git checkout -b predicate-set-frozen archive/predicate-set-v1
npx serve .        # 或任何静态服务器；index.html 是入口
```

`src/levels.js` 与 `campaign/campaign2-levels.json` 都是**已提交**的生成产物，所以 checkout 后
**不需要**先构建就能玩；`npm run build`（依赖本地 `assets/data/set.mm`，已 gitignore）还原后跑不通，
这是已知限制，详见 `restore.md`。

## 7. 诚实声明：集合论内容存疑，归档 ≠ 背书

**第 Ⅳ 章（集合论）以及部分谓词章节的公式，存在已知的可疑/不严谨之处。本归档只是保存，不背书其正确性，也不表示验收通过。**

依据（原文都在 `docs/AXIOM-AUDIT.md`、`docs/LEVEL-REDESIGN-PLAN.md` §6）：

- `∃E` 的侧条件「`x` 不在 `B` 中自由出现」是**元语言条件**，无法写成一阶公理图式；
  若硬写成 `∃x A → (∀x(A→B) → B)`，当 `x` 在 `B` 中自由出现时该公式**不成立**。
- 语言里没有 `⊥`、没有类项/函数符号，空域问题使 `∀xφ → ∃xφ` 一类公式**不成立**，必须避开；
  这些关卡是「教学上能过」而非「形式化已验证」。
- 引擎没有 Metamath 的 `$d`（DV）机制，谓词引理靠**字母差异**显式表达（如 `x≠y`）；
  从 `set.mm` 搬证明时若漏检查就会不严谨。
- `D⁻` 只是「展开形 → 表面语法」的规范化折叠，同一公式可能有多种表面写法，显示可能与玩家书写不同。

换句话说：这些关卡是**课程设计产物**，不是经过独立形式化验证的定理库。任何要复用它的人
都应当先按 `docs/LEVEL-REDESIGN-PLAN.md` §7 的验收标准重新核对，而不是把归档当成正确性证明。

## 8. 已知限制

1. **可玩性**：只有 tag `archive/predicate-set-v1` 的完整 checkout 是当时可玩的 152 关状态；
   `levels-ii-iv.json` 单独拿出来**不能**直接跑游戏。
2. **`assets/data/set.mm` 不在归档内**：它是本地开发参考、已 gitignore，tag 里也没有。
   缺失时 `npm run build` 会失败；但已提交的关卡产物让 checkout 后仍可直接游玩。
3. **存档不兼容**：关卡 `code` 在重设计中整体重排（旧的 `Ⅱ-01` 等编号不再对应新关卡），
   旧存档按 code 存电路，跨版本会错位——按「关卡重置」处理。
4. **本目录不参与构建**：`scripts/`、`tests/`、`package.json` 都未改动，`archive/` 不被任何
   构建脚本引用，纯数据/文档归档。
5. **未做逐关正确性复核**：归档时对 `levels-ii-iv.json` 只校验了 JSON 可解析、计数、与源数据逐字段一致；
   形式化正确性复核（114 关逐关跑引擎）**没有单独对切片做过**。冻结 tag 的克隆上跑过该提交自带的
   全量验收（见 §9），但那验证的是 152 关整体，不是本目录的 114 关切片，也不构成对公式正确性的背书。

## 9. 验证记录（2026-11-10）

在 tag `archive/predicate-set-v1` 的独立克隆上实际执行：

| 检查 | 结果 |
| --- | --- |
| `git rev-parse archive/predicate-set-v1^{commit}` | `8987493e3be7c8fe2c917d3cf0d54a531ba42c5d`（annotated tag） |
| tag 提交的 `campaign/campaign2-levels.json` | 152 关，Ⅰ/Ⅱ/Ⅲ/Ⅳ 各 38 |
| `src/levels.js` | 743 KB，`node --check` 通过 |
| `campaign/mm/proofs/` | 115 个证明 JSON 随 tag 还原 |
| `node --test tests/game.test.js`（冻结提交自带） | **7/7 通过**，含「152 关参考证明全部通过真实引擎（逐节点求值）」「152 关 = 16 教学 + 40 普通 + 96 困难；每章 4 教学 + 10 普通 + 24 困难」 |
| `archive/predicate-set/campaign2-snapshot.js` | blob OID `cbb6c157…` == tag 中 `campaign/campaign2.js` 的 blob |
| 本目录 7 个文件的 SHA-256 | 与 `manifest.json` 全部一致 |

结论：**tag 确实包含当时完整可玩的 152 关状态**（构建产物与证明数据都在 tag 里，checkout 即可游）；
本目录的 JSON/文档只是内容切片，不能单独替代那个 checkout。
