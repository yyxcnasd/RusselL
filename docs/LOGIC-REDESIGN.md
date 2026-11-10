# 逻辑系统重做 · 实施契约（LOGIC-REDESIGN）

本文件是 `docs/HANDOFF-LOGIC.md` 的落地契约。所有 agent 以本文件为准；与 HANDOFF 冲突时以 HANDOFF 的目标为准、以本文件的**名称/编号/文件归属**为准。

## 1. 已确定的策略（二选一中的第 1 种）

**表面语法 + 规范化。** 棋盘继续显示 `∧ / ∨ / ↔`，比较时统一展开：

```
A ∧ B := ¬(A → ¬B)
A ∨ B := ¬A → B
A ↔ B := ¬(¬(A → B) → ¬(B → A))     # 即 (A→B) ∧ (B→A) 的展开
```

`src/term.js` 已有 `expandNode` + α 规范化的 `key/eq`（`T.eq` 已经是定义展开后的比较），**不要推翻它**，只补公开接口。

规范化只用于**比较**，不用于显示：`T.fmt` / `T.toHTML` 保持原样（不做 contract），因此已有 159 关的显示不变。

## 2. 模块表变化（唯一注册表 `src/modules.js`）

删除 6 个模块：`and-intro-ax`、`and-elim-ax`、`or-intro-ax`、`or-elim-ax`、`iff-intro-ax`、`iff-elim-ax`。

新增 2 个 D 模块（**断言→断言**的定义重写，不是构造器、不是公理）：

| kind | label | kindLabel | symbol | 端口 | apply |
| --- | --- | --- | --- | --- | --- |
| `def-expand` | 定义展开 | `D` | `D` | in `assertion`(|-), out `out`(|-) | 把断言体按 §1 全部展开成原始公式 |
| `def-contract` | 定义收缩 | `D⁻` | `D⁻` | in `assertion`(|-), out `out`(|-) | 反向收缩成表面语法 |

- 两者 `construct: false`；它们只重写公式，**不能凭空产生结论**（输入必须是 `|-` 断言）。
- `apply` 抛出的错误消息即玩家看到的中文。
- 端口 id 固定 `assertion`（输入）/ `out`（输出）。

`src/term.js` 新增公开 API（HANDOFF §5 要求的名字）：

- `T.expandDefinitions(tokens)` → 同类型码、定义完全展开的 token（幂等）
- `T.contractDefinitions(tokens)` → 同类型码、定义收缩成表面语法的 token（幂等，与 expand 互逆到规范化）
- 保留 `T.eq` 语义不变（定义展开 + α 规范化）。

## 3. 关卡结构（编号固定，勿改）

每章：教学关 → **10 普通关** → 第Ⅰ章额外 9 个**引理关** → **24 困难关**。

第Ⅰ章编号：普通 `Ⅰ-01…Ⅰ-10`，引理 `Ⅰ-11…Ⅰ-19`，困难 `Ⅰ-20…Ⅰ-43`。
第Ⅱ/Ⅲ/Ⅳ章编号不变：普通 `X-01…X-10`，困难 `X-11…X-34`。

引理关（band `lemma`，`hard: false`，`no` 照常递增）：

| code | 规则 | 目标（表面语法，`targetTokens = ['|-'].concat(目标)`) | 参考解的原始结论 |
| --- | --- | --- | --- |
| Ⅰ-11 | 析取引入左 | `P→(P∨Q)` | `P→(¬P→Q)` |
| Ⅰ-12 | 析取引入右 | `Q→(P∨Q)` | `Q→(¬P→Q)`（A1 实例） |
| Ⅰ-13 | 合取引入 | `P→(Q→(P∧Q))` | `P→(Q→¬(P→¬Q))` |
| Ⅰ-14 | 合取消去左 | `(P∧Q)→P` | `¬(P→¬Q)→P` |
| Ⅰ-15 | 合取消去右 | `(P∧Q)→Q` | `¬(P→¬Q)→Q` |
| Ⅰ-16 | 析取消去 | `(P∨Q)→((P→R)→((Q→R)→R))` | `(¬P→Q)→((P→R)→((Q→R)→R))` |
| Ⅰ-17 | 等值引入 | `(P→Q)→((Q→P)→(P↔Q))` | `(P→Q)→((Q→P)→¬((P→Q)→¬(Q→P)))` |
| Ⅰ-18 | 等值消去左 | `(P↔Q)→(P→Q)` | `¬((P→Q)→¬(Q→P))→(P→Q)` |
| Ⅰ-19 | 等值消去右 | `(P↔Q)→(Q→P)` | `¬((P→Q)→¬(Q→P))→(Q→P)` |

参考解统一结构：原始语言证明 → **`def-contract`** → 目标焊盘（保证目标与输出结构一致，同时让 D 成为可见的定义入口）。

引理关的参考解**只允许**用：`axiom`(A1/A2/A3) + `subst` + `mp` + `theorem`（仅引用**更早**的引理关 Ⅰ-1x）+ `def-contract` + 构造模块。**禁止**任何已删除的 6 个派生公理模块。

## 4. 内容迁移

`campaign/legacy-levels.json`（114 关素材，restructure 的真实输入）中所有派生公理节点改写成：

```
theorem{code: <引理关 code>} → subst{atom P:=A, atom Q:=B[, atom R:=C]} → 原下游
```

映射：`and-intro-ax→Ⅰ-13`、`and-elim-ax(side l)→Ⅰ-14`、`and-elim-ax(side r)→Ⅰ-15`、`or-intro-ax(side l)→Ⅰ-11`、`or-intro-ax(side r)→Ⅰ-12`、`or-elim-ax→Ⅰ-16`、`iff-intro-ax→Ⅰ-17`、`iff-elim-ax(dir lr)→Ⅰ-18`、`iff-elim-ax(dir rl)→Ⅰ-19`。

- 搬迁脚本：`scripts/migrate-derived-modules.js`（幂等，可重复跑）。
- 迁移后不再有任何 6 个 kind 出现在 `src/levels.js` 的 palette / solution 中。
- 困难关引用引理关后，`hint` 仍为 `null`、`mustUse` 不强制（只有普通关有 mustUse）。

## 5. 教学关

删除 `scripts/restructure-levels.js` 里基于 6 个派生公理的 5 个 componentTutorials（vi–x），改为：

- 第Ⅰ章 `vi` **定义 D**：讲 `∧/∨/↔` 是原始公式的缩写；参考解用 `def-contract`。
- 第Ⅰ章 `vii` **原始语法**：同一公式的原始写法；参考解直接产出原始断言。
- 第Ⅱ章 `vi` **引用已证定理**：theorem 引用一个第Ⅰ章已证关卡（`Ⅰ-14`）+ 代入，教玩家用定理 tile。

> 修订（落地时确定）：viii 原本计划放第Ⅰ章，但第Ⅰ章教学关在数组里排在所有编号关之前，`engine` 的「只能引用更早关卡」会拒绝让教学关引用 `Ⅰ-14`。改为放在**第Ⅱ章教学带**（下标自然在第Ⅰ章之后），既保持引擎铁律不放宽，也让教学位置贴近“第Ⅱ章困难关要引用第Ⅰ章定理”的真实使用场景。教学关总数 18 + 3 = 21。

教学关 `tip.code / tip.flow` 只放符号流程，含中文的 `teaches/hint` 允许。

## 6. 文件归属（写作用域，避免互相覆盖）

| 归属 | 文件 |
| --- | --- |
| lead | `docs/LOGIC-REDESIGN.md`、`campaign/lemma-levels.json`、`scripts/build-lemmas.js`、`src/engine.js`（本次未改） |
| core-semantics | `src/term.js`、`src/modules.js`、`src/board.js`、`src/catalog.js`、`src/screens.js`、`src/simple.css`、`src/hints.js` |
| content-pipeline | `campaign/legacy-levels.json`、`scripts/migrate-derived-modules.js`、`scripts/restructure-levels.js`、`src/levels.js`（生成物）、`src/campaign-meta.js`（生成物） |
| verifier | `tests/*`、`scripts/export-solutions.js`（显示/计数修复）、`docs/SOLUTIONS.md`、`docs/ARCHITECTURE.md`、`docs/AXIOM-AUDIT.md`、`docs/HANDOFF-LOGIC.md` 收尾、`README.md`、`dist/`、`screenshots/` |

不得修改：`.maintenance`、`maintenance.html`、`.github/workflows/pages.yml`、`campaign/tutorials.json` 已有 18 关的语义（只能新增/替换 component 教学关）。

## 7. 验收

- `npm test`、`npm run test:wire`、`npm run test:leaderboard`、`node tests/game-ui.js`、`npm run test:acceptance`、`node scripts/export-solutions.js` 全绿。
- 模块表里没有 6 个 `*-ax` 派生公理；有 `def-expand` / `def-contract`。
- 159 → 166 关（21 教学 + 40 普通 + 9 引理 + 96 困难），每关参考解逐关真 Engine 求值通过。
- 深色模式截图、维护页仍生效、Toy 未更新。

## 8. 落地结果与已知限制（完成时补齐）

### 8.1 做了什么

- 六个派生公理模块（`and-intro-ax` / `and-elim-ax` / `or-intro-ax` / `or-elim-ax` / `iff-intro-ax` / `iff-elim-ax`）从 `src/modules.js` 删除，模块表不再有它们。
- 新增 `def-expand`（D）/ `def-contract`（D⁻）：断言 → 断言的定义重写，`construct: false`，不能凭空产生结论；帮助面板新增两张规则卡（图例 label 为 `D` / `D⁻`，中文说明放 hover title，保持「帮助图例可见文本只用符号」的既有约定）。
- `src/term.js` 公开 `expandDefinitions` / `contractDefinitions`，与既有 `key/eq`（定义展开 + α 规范化）同源；严格自底向上折叠，9 条引理目标 `contract(expand(S))` 与 `S` **逐 token 相同**。
- 9 条派生规则成为**真实证明出来的引理关** `Ⅰ-11…Ⅰ-19`（band `lemma`），参考解全部由 A1/A2/A3 + subst + mp + 已验证的原始语言电路组合而成，最后经 `def-contract` 折回表面语法；逐关通过真实 Engine。
- 困难关里原先直接接派生公理元件的子证明，改为 `theorem(引理关) + subst`；迁移脚本幂等落在 `scripts/migrate-derived-modules.js`。
- 新增 3 个教学关（D 定义 / 原始语法 / 引用已证定理），替代原先 5 个派生公理元件教学关。

### 8.2 已知限制（诚实记录）

1. **引理关规模不均**：Ⅰ-11 118、Ⅰ-12 8、Ⅰ-13 145、Ⅰ-14 138、Ⅰ-15 107、**Ⅰ-16 562**、Ⅰ-17 9、Ⅰ-18 9、Ⅰ-19 9 元件。Ⅰ-16（析取消去）必须从 A1–A3 真证分情况，展平后的已验证电路 + 组合就是这么大；它比其它困难关（最大约 180）大一个量级，属于“逻辑上必要、玩法上偏重”的折衷，靠提示的参考接线可通过。
2. **19 个既有关卡的 target 经定义收缩后 token 与原文不同**（定义形天然歧义，例如 `(¬P→¬Q)→(Q→P)` 也可读作 `(P∨¬Q)→(Q→P)`）。显示层始终用原始 token，玩家看到的文字不变；只有 `def-contract` 的输出可能换一种等价写法。
3. **帮助图例的 D/D⁻ 中文说明只在 hover title**（触屏设备看不到），D 的教学靠第Ⅰ章教学关 `vi` / `vii`。
4. `T.eq` 比较在等价判定上是定义展开 + α 规范化，因此“目标焊盘接受定义等值”本身不强制玩家用 D；D 的价值是**可见的定义入口**与教学，而不是唯一的通行证。
5. 旧 `scripts/build-campaign.js`（114 关旧管线）本次未跟进改造；现役生成链是 `campaign/legacy-levels.json` → `scripts/restructure-levels.js` → `src/levels.js`，引理关由 `scripts/build-lemmas.js` → `campaign/lemma-levels.json` 提供。

