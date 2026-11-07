# set.mm 数据抽取说明（公理板 · 内容源）

> 交付物：`research/setmm-data.json`（UTF-8，3027 条）、`research/parse-setmm.cjs`（可复现解析器）。
> 数据源：`assets/data/set.mm`（GitHub `metamath/set.mm` develop，51,812,832 字节，827,537 行）。
> 本文所有行号、公式、DV、证明长度均来自该文件本身；JSON 为唯一事实来源，本文是导读。

## 0. 结论速览

| 项目 | 结果 |
|---|---|
| 解析范围 | `set-pred.mm`、`set-class.mm`、`set-zf.mm`、`set-zfc.mm` 四个区段（共 345 个 `$a`、10,448 个 `$p`） |
| 压缩证明解码 | 10,448 个 `$p` 全部解码成功，**0 失败**；2,682 条 JSON 定理的 `proofRefs` **0 条悬空引用** |
| 公式核对 | 47 个任务目标定理的 `formulaAscii` 与源文件逐 token 比对，**0 处不一致** |
| JSON | 3027 条（公理 29 / 定义 156 / 语法构造 160 / 定理 2682），2,612,211 字节，每行一个对象，UTF-8 |
| 缺失/无法解析 | 无缺失目标；没有解码失败项 |

JSON 内公理、定义、语法构造齐全（四模块内全部 `$a`），定理收录全部 `set-pred.mm`（逻辑/谓词/等词）
以及 `eqid` 依赖闭包里的 5 条类等式定理；`set-class/zf/zfc` 的普通定理（约 7,700 条）不在默认
JSON 内（见 §6 的 `--full` 说明）。

---

## 1. 区段结构

### 1.1 模块（`$[ ... $]` 分段）

| 区段 | 行范围 | 内容 | 本任务用途 |
|---|---|---|---|
| `set-header.mm` | 128–313 | 文件头、致谢 | 不用 |
| `set-main.mm` | 316–482382 | 主文件外壳（包含下列子区段） | 外壳 |
| **`set-pred.mm`** | **317–24879** | 经典一阶逻辑与等词（CLASSICAL FIRST-ORDER LOGIC WITH EQUALITY） | 命题/谓词/等词 |
| **`set-class.mm`** | **24882–49814** | ZF 集合论开头 + 类理论（含 ax-ext、df-cleq/df-clel、df-ss） | 集合论公理与核心定义 |
| **`set-zf.mm`** | **49817–117691** | ZF 其余公理（rep/pow/un/reg/inf）与 ZF 定理库 | 集合论公理 |
| **`set-zfc.mm`** | **117694–123029** | ZFC（ax-ac、ax-cc、ax-dc、ax-ac2） | ax-ac |
| `set-num.mm` 等 | 125137 起 | 数论、实数、拓扑等 | 不用（`df-0`/`df-1` 等在 `set-num.mm`，不在 JSON） |

> ⚠️ 区段名与主题不完全对应：**`ax-ext` 在 `set-class.mm`（24970 行）**，**`ax-ac` 在 `set-zfc.mm`
> （118630 行）**，不在 `set-zf.mm`。DESIGN 里「ax-ac 在 set-zf.mm 49817 行以后」的说法只是行号区间
> 近似，取数据时请按 JSON 的 `module` 字段。

### 1.2 标题层级

set.mm 注释标题四层（JSON 的 `section` 取「节」，`subsection` 取「小节/子小节」）：

| 层级 | 标记线 | 例（行号） |
|---|---|---|
| 章 Chapter | `########...` | 326 `CLASSICAL FIRST-ORDER LOGIC WITH EQUALITY` |
| 节 Section | `#*#*#*...` | 528 `Propositional calculus`；14816 `Predicate calculus with equality: Tarski's system S2 (1 rule, 6 schemes)` |
| 小节 Subsection | `=======...` | 624 `The axioms of propositional calculus`；19020 `Axiom scheme ax-12 (Substitution)` |
| 子小节 Sub-subsection | `-=-=-=-...` | 14543 `Stoic logic non-modal portion (Chrysippus of Soli)` |

### 1.3 与四章相关的结构树（行号 = 该标题后第一条语句所在行）

**`set-pred.mm`**

- `Pre-logic`（473）：推理辅助定理（如 `idi` 473、`a1ii` 522，属 `$p`/`$e` 辅助，不进四个章节）。
- `Propositional calculus`（528–13148）
  - 576 `Recursively define primitive wffs for propositional calculus`（`wn` 576、`wi` 617）
  - 674 `The axioms of propositional calculus`（`ax-mp` 674、`ax-1` 685、`ax-2` 694、`ax-3` 707）
  - 730 `Logical implication`（`id` 884、`2a1` 937、`pm2.27` 1060、`pm2.43` 1185、`imim1` 1445、`pm2.04` 1492）
  - 1649 `Logical negation`（`pm2.18` 1775、`con2` 1842、`con1` 1932）
  - 2450 `Logical equivalence`（`df-bi` 2513、`wb` 2450）
  - 4096 `Logical conjunction`（`df-an` 4119、`dfbi2` 4621）
  - 7420 `Logical disjunction`（`df-or` 7434）
  - 8147 `Mixed connectives`；8921 `The conditional operator for propositions`；9127 `The weak deduction theorem`；
    9162 `Abbreviated conjunction and disjunction of three wff's`；11877 `nand`；12019 `xor`；12141 `nor`；
    12255 `True and false constants`；12560 `Truth tables`；12866 `Half adder and full adder`
- `Other axiomatizations related to classical propositional calculus`（13149–14933）：**关卡不用**（Meredith/Nicod/Russell-Bernays 等替代系统）。
- `Predicate calculus with equality: Tarski's system S2 (1 rule, 6 schemes)`（14934–18742）
  - 14934 `Universal quantifier (continued); define "exists" and "not free"`（`wex` 14934、`df-ex` 14940、`wnf` 14968）
  - 15096 `Rule scheme ax-gen`；15216 `Axiom scheme ax-4`；15993 `Axiom scheme ax-5`
  - 16520 `Equality predicate (continued)`（`weq` 16520）；16595 `ax-6`；17007 `ax-7`（`equid` 17054、`equcomi` 17100、`equcom` 17105、`equtr` 17125、`equequ1` 17146、`equtr2` 17158）
  - 17642 `Define proper substitution`；18198 `Membership predicate`（`wel` 18233）；18264 `ax-8`；18362 `ax-9`
- `Predicate calculus with equality: Auxiliary axiom schemes (4 schemes)`（18743–22773）
  - 18743 `ax-10`；18876 `ax-11`；19045 `ax-12`；20967 `ax-13`
- `Uniqueness and unique existence`（22774–24324）；`Other axiomatizations related to classical predicate calculus`（24325–24878，关卡不用）。

**`set-class.mm`**（24882–49814）`ZF (ZERMELO-FRAENKEL) SET THEORY`

- 24917 `ZF Set Theory - start with the Axiom of Extensionality`
  - 24923 `Introduce the Axiom of Extensionality`（`ax-ext` 24970）
  - 25054 `Classes`（`cab` 25054、`df-clab` 25133、`df-cleq` 25575、`df-clel` 26409；`eqid` 25686）
  - 27160 `Class form not-free predicate`；27681 `Negated equality and membership`；28622 `Restricted quantification`；
    32311 `The universal class`；35763 `Russell's Paradox`；37656 `Subclasses and subsets, proper subclasses and subsets`（`df-ss` 37682）；
    38912 `Basic operations on classes`（`df-in` 39278、`df-un` 39730）；40711 `The empty set`；42562 `Conditional operator`；
    43384 `Power classes`（`df-pw` 43409）；43606 `Singletons, unordered pairs`（`df-sn` 43620、`df-pr` 43638）；
    45846 `Ordered pairs`；46138 `The union of a class`（`df-uni` 46147）；46507 `The intersection of a class`（`df-int` 46515）；
    46924 `Indexed union and intersection`；48538 `Binary relations`；49075 `Ordered-pair class abstractions`；
    49327 `Functions in maps-to notation`；49639 `Transitive classes`

**`set-zf.mm`**（49817–117691）

- 49819 `ZF Set Theory - add the Axiom of Replacement`：`ax-rep` 49860、`ax-sep` 50137、`ax-nul` 50292
- 50907 `... add the Axiom of Power Sets`：`ax-pow` 50926、`ax-pr` 51735，其后是关系/序/函数/序数等 ZF 定理库
- 76731 `... add the Axiom of Union`：`ax-un` 76755，其后是自然数、基数、有限集等
- 102608 `... add the Axiom of Regularity`：`ax-reg` 102629
- 103307 `... add the Axiom of Infinity`：`ax-inf` 103344、`ax-inf2` 103382
- 其余（112000+）为 AC 等价、基数算术等

**`set-zfc.mm`**（117694–123029）

- 117740 `ax-cc`；118011 `ax-dc`；118630 `ax-ac`；118712 `ax-ac2`
- 120915 `ZFC Axioms with no distinct variable requirements`（另一套无 DV 的 ZFC 公理，图标 `$a`）

---

## 2. 四组公理表

公式为 set.mm 原文 token（`formulaAscii`）；Unicode 版见 JSON。`assertionForm`：
无 `$e` 假设（只有 scheme 的 `$f` 变量）→ `true`；规则（ax-mp/ax-gen）→ `false`。
`$f` 数 = mandatory hypotheses 数（含 scheme 变量）。

### 2.1 命题演算（Łukasiewicz / Church P2）

| label | 行 | 公式（ASCII / Unicode） | `$f` 数 | DV | 说明 |
|---|---|---|---|---|---|
| `ax-1` | 685 | `|- ( ph -> ( ps -> ph ) )` / `⊢ ( ph → ( ps → ph ) )` | 2 | — | Simp |
| `ax-2` | 694 | `|- ( ( ph -> ( ps -> ch ) ) -> ( ( ph -> ps ) -> ( ph -> ch ) ) )` / `⊢ ( ( ph → ( ps → ch ) ) → ( ( ph → ps ) → ( ph → ch ) ) )` | 3 | — | Frege |
| `ax-3` | 707 | `|- ( ( -. ph -> -. ps ) -> ( ps -> ph ) )` / `⊢ ( ( ¬ ph → ¬ ps ) → ( ps → ph ) )` | 2 | — | Transp |
| `ax-mp` | 674 | `|- ps`（`$e`：`|- ph`、`|- ( ph -> ps )`）/ `⊢ ps` | 4 | — | 规则，非 assertion-form |

### 2.2 谓词演算（Tarski S2）

| label | 行 | 公式（Unicode） | `$f` 数 | DV | 说明 |
|---|---|---|---|---|---|
| `ax-gen` | 15096 | `⊢ ∀ x ph`（`$e`：`|- ph`） | 3 | — | 规则，非 assertion-form |
| `ax-4` | 15216 | `⊢ ( ∀ x ( ph → ps ) → ( ∀ x ph → ∀ x ps ) )` | 3 | — | Quantified Implication |
| `ax-5` | 15993 | `⊢ ( ph → ∀ x ph )` | 2 | `ph x` | Distinctness（x 不在 ph 自由） |
| `ax-10` | 18743 | `⊢ ( ¬ ∀ x ph → ∀ x ¬ ∀ x ph )` | 2 | — | Quantified Negation |
| `ax-11` | 18876 | `⊢ ( ∀ x ∀ y ph → ∀ y ∀ x ph )` | 3 | — | Quantifier Commutation |

### 2.3 等词

| label | 行 | 公式（Unicode） | `$f` 数 | DV | 说明 |
|---|---|---|---|---|---|
| `ax-6` | 16595 | `⊢ ¬ ∀ x ¬ x = y` | 2 | — | Existence（强形式，无 DV） |
| `ax-7` | 17007 | `⊢ ( x = y → ( x = z → y = z ) )` | 3 | — | Equality |
| `ax-8` | 18264 | `⊢ ( x = y → ( x ∈ z → y ∈ z ) )` | 3 | — | ∈ 左替换 |
| `ax-9` | 18362 | `⊢ ( x = y → ( z ∈ x → z ∈ y ) )` | 3 | — | ∈ 右替换 |
| `ax-12` | 19045 | `⊢ ( x = y → ( ∀ y ph → ∀ x ( x = y → ph ) ) )` | 3 | — | Substitution（**现版无 DV**） |
| `ax-13` | 20967 | `⊢ ( ¬ x = y → ( y = z → ∀ x y = z ) )` | 3 | — | Quantified Equality（**现版无 DV**） |

### 2.4 集合论（ZFC，DESIGN 的七条）

| label | 行 | 模块 | 公式（Unicode） | `$f` 数 | DV（`$d`） |
|---|---|---|---|---|---|
| `ax-ext` | 24970 | set-class | `⊢ ( ∀ z ( z ∈ x ↔ z ∈ y ) → x = y )` | 3 | x-y, x-z, y-z |
| `ax-rep` | 49860 | set-zf | `⊢ ( ∀ w ∃ y ∀ z ( ∀ y ph → z = y ) → ∃ y ∀ z ( z ∈ y ↔ ∃ w ( w ∈ x ∧ ∀ y ph ) ) )` | 5（x,y,z,w,ph） | x,y,z,w 两两全 DV |
| `ax-pow` | 50926 | set-zf | `⊢ ∃ y ∀ z ( ∀ w ( w ∈ z → w ∈ x ) → z ∈ y )` | 4 | x,y,z,w 两两全 DV |
| `ax-un` | 76755 | set-zf | `⊢ ∃ y ∀ z ( ∃ w ( z ∈ w ∧ w ∈ x ) → z ∈ y )` | 4 | w,x,y,z 两两全 DV |
| `ax-reg` | 102629 | set-zf | `⊢ ( ∃ y y ∈ x → ∃ y ( y ∈ x ∧ ∀ z ( z ∈ y → ¬ z ∈ x ) ) )` | 3 | x-y, x-z, y-z |
| `ax-inf` | 103344 | set-zf | `⊢ ∃ y ( x ∈ y ∧ ∀ z ( z ∈ y → ∃ w ( z ∈ w ∧ w ∈ y ) ) )` | 4 | x,y,z,w 两两全 DV |
| `ax-ac` | 118630 | set-zfc | `⊢ ∃ y ∀ z ∀ w ( ( z ∈ w ∧ w ∈ x ) → ∃ v ∀ u ( ∃ t ( ( u ∈ w ∧ w ∈ t ) ∧ ( u ∈ t ∧ t ∈ y ) ) ↔ u = v ) )` | 7 | x,y,z,w,v,u,t 两两全 DV |

**四模块内另有 7 条 `$a`（JSON 里 kind=axiom，但不在 DESIGN 的七条内）**：
`ax-sep` 50137、`ax-nul` 50292、`ax-pr` 51735（set.mm 注释说明它们是「为了便于识别使用而重述的冗余公理」）、
`ax-inf2` 103382、`ax-cc` 117740、`ax-dc` 118011、`ax-ac2` 118712（AC 的弱/等价形式）。

### 2.5 与 `DESIGN.md` 不一致、需要 Lead 决策的点

1. **ax-12 / ax-13 在现行 set.mm 中都没有 `$d`**。DESIGN 写的「ax-12 DV x,y」「ax-13 DV x,z」对应的是
   弱化版定理 `ax12v`（19077 行，`$d x y`、`$d y ph`）与 `ax13v`（20982 行，`$d x z`、`$d y z`）。
   若关卡要显式 DV 机制，应给 `ax12v`/`ax13v` 建模，或让 `ax-12/ax-13` 按无 DV 处理。
2. **`ax-5` 有 `$d ph x`**（wff 变量 ph 与 setvar x 不同），DESIGN 的「x 不在 P 中自由；游戏中用注记声明」与此一致。
3. **`ax-6` 无 DV**（强形式存在性）；带 DV 的弱形式是 `ax6v`（16618 行，`$d x y`）。
4. **ax-ext 的 converse**（`axextb` 24999）在 set.mm 中由 `elequ2g` + `axextg` 证明；JSON 有（闭包带入）。
5. 公式中的 `x = y` 在 set.mm 里形式上走 `wceq` + 隐式 `cv`（类等式的显示），`∈` 同理走 `wcel` + `cv`；
   因此 `weq`（16520）、`wel`（18233）是 `$p`（定理）而不是 `$a`，它们的作用是把 setvar 的 `=`/`∈` 变成 wff。
   游戏把 `=`、`∈` 当原始谓词使用，与 set.mm 的**显示层**完全一致，不需要 `cv`。

---

## 3. 定义表（display / expand 用）

逻辑与谓词（全部在 `set-pred.mm`；JSON 里 kind=definition）：

| label | 行 | assertion-form | 公式（Unicode） | 备注 |
|---|---|---|---|---|
| `df-bi` | 2513 | true | `⊢ ¬ ( ( ( ph ↔ ps ) → ¬ ( ( ph → ps ) → ¬ ( ps → ph ) ) ) → ¬ ( ¬ ( ( ph → ps ) → ¬ ( ps → ph ) ) → ( ph ↔ ps ) ) )` | 原始定义，很长；不建议直接做关卡目标 |
| `df-an` | 4119 | true | `⊢ ( ( ph ∧ ps ) ↔ ¬ ( ph → ¬ ps ) )` | ∧ 定义 |
| `df-or` | 7434 | true | `⊢ ( ( ph ∨ ps ) ↔ ( ¬ ph → ps ) )` | ∨ 定义 |
| `dfbi2` | 4621 | **true（是定理 `$p`）** | `⊢ ( ( ph ↔ ps ) ↔ ( ( ph → ps ) ∧ ( ps → ph ) ) )` | proofLength 22，依赖 `wb wi wn wa dfbi1 df-an bitr4i`；DESIGN 要用的 ↔ 桥 |
| `df-ex` | 14940 | true | `⊢ ( ∃ x ph ↔ ¬ ∀ x ¬ ph )` | ∃ 定义 |
| `df-nf` | 15008 | true | `⊢ ( F/ x ph ↔ ( ∃ x ph → ∀ x ph ) )` | 可选 |
| `df-sb` / `df-mo` | 17727 / 22849 | false | — | 有 `$e`，非 assertion-form |

集合论核心定义（JSON 内 156 条定义全部可用，这里列与 DESIGN 相关的）：

| label | 行 | 模块 | assertion-form | 公式（Unicode） |
|---|---|---|---|---|
| `df-cleq` | 25575 | set-class | **false**（10 个 mandatory，其中 2 个 `$e`） | `⊢ ( A = B ↔ ∀ x ( x ∈ A ↔ x ∈ B ) )` |
| `df-clel` | 26409 | set-class | **false**（10 个 mandatory，其中 2 个 `$e`） | `⊢ ( A ∈ B ↔ ∃ x ( x = A ∧ x ∈ B ) )` |
| `df-ss` | 37682 | set-class | true | `⊢ ( A ⊆ B ↔ ∀ x ( x ∈ A → x ∈ B ) )` |
| `df-v` | 32345 | set-class | true | `⊢ V = { x | x = x }` |
| `df-in` / `df-un` | 39278 / 39730 | set-class | true | `A ∩ B` / `A ∪ B` 的类抽象定义 |
| `df-pw` | 43409 | set-class | true | `⊢ 𝒫 A = { x | x ⊆ A }` |
| `df-sn` / `df-pr` | 43620 / 43638 | set-class | true | `{ A }` / `{ A , B }` |
| `df-uni` / `df-int` | 46147 / 46515 | set-class | true | `⋃ A` / `⋂ A` |
| `df-nul` | 40721 | set-class | true | `⊢ ∅ = ( V \ V )` |

> `df-0`/`df-1`/`df-2` 等数字定义在 `set-num.mm`（128794 行起），**不在四模块、不在 JSON**。
> `df-cleq`/`df-clel` 形式上带假设，不能直接当 assertion-form 关卡目标；游戏若需要「类等式/类成员」
> 只能作为元件或另造上下文。

---

## 4. 推荐关卡定理（assertion-form，按四章）

说明：`proofLength` = 解码后的未压缩证明步数（RPN token 数，不含压缩格式的 `Z`；hypothesis 步骤也计 1）。
「关键依赖」= `proofRefs` 去重后的 label。公式为 Unicode 版；`|-`/`⊢` 只是断言记号，关卡 target 应去掉。

### Ⅰ 命题（12 关素材）

直接公理：`ax-1`、`ax-2`、`ax-3`（以及规则 `ax-mp`，非 assertion-form，游戏中是 `detach`）。
定义桥：`df-or`、`df-an`、`dfbi2`（定义桥首选，别用 `df-bi`）。

| label | 行 | 公式（Unicode） | proofLength | 关键依赖 | 备注 |
|---|---|---|---|---|---|
| `id` | 884 | `⊢ ( ph → ph )` | 12 | `wi ax-1 mpd` | DESIGN 7 号关卡 |
| `2a1` | 937 | `⊢ ( ph → ( ps → ( ch → ph ) ) )` | 7 | `id 2a1d` | ax-1 的双重弱化 |
| `ax1w` | 766 | `⊢ ( ph → ( ps → ( ch → ps ) ) )` | 10 | `wi ax-1 a1i` | 名字带 w，实际是定理 |
| `pm2.27` | 1060 | `⊢ ( ph → ( ( ph → ps ) → ps ) )` | 8 | `wi id com12` | 断言形式 modus ponens |
| `pm2.43` | 1185 | `⊢ ( ( ph → ( ph → ps ) ) → ( ph → ps ) )` | 9 | `wi pm2.27 a2i` | 收缩律 |
| `imim1` | 1445 | `⊢ ( ( ph → ps ) → ( ( ps → ch ) → ( ph → ch ) ) )` | 9 | `wi id imim1d` | 三段论闭式 |
| `pm2.04` | 1492 | `⊢ ( ( ph → ( ps → ch ) ) → ( ps → ( ph → ch ) ) )` | 11 | `wi id com23` | 交换前件 |
| `pm2.18` | 1775 | `⊢ ( ( ¬ ph → ph ) → ph )` | 8 | `wn wi id pm2.18d` | |
| `con2` | 1842 | `⊢ ( ( ph → ¬ ps ) → ( ps → ¬ ph ) )` | 9 | `wn wi id con2d` | |
| `con1` | 1932 | `⊢ ( ( ¬ ph → ps ) → ( ¬ ps → ph ) )` | 9 | `wn wi id con1d` | |
| `dfbi2` | 4621 | `⊢ ( ( ph ↔ ps ) ↔ ( ( ph → ps ) ∧ ( ps → ph ) ) )` | 22 | `wb wi wn wa dfbi1 df-an bitr4i` | ↔ 桥 |

备选（同章 assertion-form）：`idd`(905, len 7, deps `wi id a1i`)、`imim2`(1201, len 9)、`con3`(1989, len 8)、
`notnot`(1902, len 6)、`con4`(1649, len 3，公式与 `ax-3` 相同)、`peirce`(2387, len 11)、`pm2.61`(2282, len 12)、`biid`(2988, len 6)。

### Ⅱ 谓词（12 关素材）

直接公理：`ax-4`、`ax-5`、`ax-10`、`ax-11`（规则 `ax-gen` 非 assertion-form，游戏中是 `all-intro`）。
定义桥：`df-ex`。

| label | 行 | 公式（Unicode） | proofLength | 关键依赖 | DV |
|---|---|---|---|---|---|
| `alnex` | 14946 | `⊢ ( ∀ x ¬ ph ↔ ¬ ∃ x ph )` | 11 | `wex wn wal df-ex con2bii` | — |
| `exnal` | 15341 | `⊢ ( ∃ x ¬ ph ↔ ¬ ∀ x ph )` | 11 | `wal wn wex alex con2bii` | — |
| `exim` | 15389 | `⊢ ( ∀ x ( ph → ps ) → ( ∃ x ph → ∃ x ps ) )` | 9 | `wi id aleximi` | — |
| `exa1` | 15415 | `⊢ ( ∃ x ph → ∃ x ( ps → ph ) )` | 9 | `wi ax-1 eximi` | — |
| `19.2` | 16705 | `⊢ ( ∀ x ph → ∃ x ph )` | 11 | `wi id exgen 19.35i` | — |
| `19.8v` | 16763 | `⊢ ( ph → ∃ x ph )` | 6 | `ax-5 19.8w` | ph x |
| `spvw` | 16748 | `⊢ ( ∀ x ph → ph )` | 7 | `wn ax-5 spnfw` | ph x |
| `19.3v` | 16757 | `⊢ ( ∀ x ph ↔ ph )` | 11 | `wal spvw ax-5 impbii` | ph x |
| `ax5d` | 16001 | `⊢ ( ph → ( ps → ∀ x ps ) )` | 10 | `wal wi ax-5 a1i` | ps x |
| `ax5ea` | 16018 | `⊢ ( ∃ x ph → ∀ x ph )` | 14 | `wex wal ax5e ax-5 syl` | ph x |
| `alim` | 15220 | `⊢ ( ∀ x ( ph → ps ) → ( ∀ x ph → ∀ x ps ) )` | 4 | `ax-4` | — |

> **注意**：DESIGN 的 11–12 号关（∀I 闭包 / ∀E 取回）靠引擎的 `all-intro`/`all-elim` 规则完成，
> 不是 set.mm 定理；上表是「额外可用作关卡」的 assertion-form 素材。若严格遵守 DESIGN，命题/谓词章
> 的参考电路应由 proof-smith 用公理+规则生成，`proofRefs` 仅用于交叉核对。
> （`alim` 公式与 `ax-4` 相同，只是重述；`exim` 等则真正引入了 ∃。）

### Ⅲ 等词（12 关素材）

直接公理：`ax-6`、`ax-7`、`ax-8`、`ax-9`、`ax-12`、`ax-13`。

| label | 行 | 公式（Unicode） | proofLength | 关键依赖 | DV |
|---|---|---|---|---|---|
| `equid` | 17054 | `⊢ x = x` | 18 | `weq ax7v1 pm2.43i ax6ev exlimiiv` | —（作用域内 x y 仅供证明，已剔除） |
| `equcomi` | 17100 | `⊢ ( x = y → y = x )` | 16 | `weq equid ax7 mpi` | — |
| `equcom` | 17105 | `⊢ ( x = y ↔ y = x )` | 13 | `weq equcomi impbii` | — |
| `equtr` | 17125 | `⊢ ( x = y → ( y = z → x = z ) )` | 14 | `weq wi ax7 equcoms` | — |
| `equtr2` | 17158 | `⊢ ( ( x = z ∧ y = z ) → x = y )` | 14 | `weq equeucl imp` | — |
| `equequ1` | 17146 | `⊢ ( x = y → ( x = z ↔ y = z ) )` | 18 | `weq ax7 equtr impbid` | — |
| `equeucl` | 17141 | `⊢ ( x = z → ( y = z → x = y ) )` | 14 | `weq equeuclr com12` | — |
| `stdpc6` | 17166 | `⊢ ∀ x x = x` | 7 | `weq equid ax-gen` | — |
| `spaev` | 17492 | `⊢ ( ∀ x x = y → x = y )` | 13 | `weq equequ1 spw` | x y |
| `equvelv` | 17191 | `⊢ ( ∀ z ( z = x → z = y ) ↔ x = y )` | 13 | `weq equequ1 equsalvw` | x z, y z |
| `ax6v` | 16618 | `⊢ ¬ ∀ x ¬ x = y` | 3 | `ax-6` | x y |
| `ax7v` | 17027 | `⊢ ( x = y → ( x = z → y = z ) )` | 4 | `ax-7` | x y |
| `ax8v` | 18275 | `⊢ ( x = y → ( x ∈ z → y ∈ z ) )` | 4 | `ax-8` | x y |
| `ax9v` | 18373 | `⊢ ( x = y → ( z ∈ x → z ∈ y ) )` | 4 | `ax-9` | x y |
| `ax13w` | 18656 | `⊢ ( ¬ x = y → ( y = z → ∀ x y = z ) )` | 9 | `weq wn ax5d` | x y, x z |

（上表行号为 JSON `line` 字段，已逐条核对。`ax6v`/`ax7v`/… 带 DV，正好对应 DESIGN 想表达的
「ax-12/ax-13 的 DV 版本」：`ax12v`、`ax13v` 是同类弱化定理。）

**`eqid` 是类等式，不是集合变量等式**：`eqid`（set-class.mm 25686 行）公式为 `⊢ A = A`，
1 个 mandatory hypothesis `cA: class A`，assertion-form = true，proofLength 9，依赖 `cv wcel biid eqriv`。
若关卡要 `x = x`，请用 `equid`（17054 行，`⊢ x = x`）。

### Ⅳ 集合论（12 关素材）

按 DESIGN，本章 = 公理直接 + 变元闭包/例化，不引用 set.mm 定理：

- 直接：`ax-ext`、`ax-rep`、`ax-pow`、`ax-un`、`ax-reg`、`ax-inf`、`ax-ac`（公式/DV 见 §2.4）。
- 闭包/例化：由引擎的 `all-intro`/`all-elim`/`subst` 生成，无需 set.mm 定理。
- 定义（只记录，不作关卡）：`df-ss`（assertion-form）、`df-cleq`/`df-clel`（非 assertion-form，见 §3）。
- 如需「集合论定理」备选，JSON 闭包里有 `axextg`(24989, len 57)、`axextb`(24999, len 21,
  `⊢ ( x = y ↔ ∀ z ( z ∈ x ↔ z ∈ y ) )`)、`dfcleq`(25588, len 17)；它们都不是 DESIGN 必需的。

---

## 5. JSON 字段规格

`research/setmm-data.json` 是 JSON 数组，**每行一个对象**（方便 grep/awk），UTF-8 无 BOM。

| 字段 | 类型 | 含义 |
|---|---|---|
| `label` | string | 语句 label（如 `ax-1`、`id`、`df-or`） |
| `kind` | string | `axiom` / `definition` / `syntax` / `theorem`（`syntax` 是任务三种之外的补充：160 个语法构造 `$a`，如 `wi`、`wn`、`weq`、`cv`） |
| `section` | string | 最近的二级标题（节），如 `Propositional calculus` |
| `formulaAscii` | string | 源文件 math token 以单空格连接，含开头 `|-`；如 `|- ( ph -> ( ps -> ph ) )` |
| `formulaUnicode` | string | 同上，符号替换：`-.`→¬、`->`→→、`<->`→↔、`/\`→∧、`\/`→∨、`A.`→∀、`E.`→∃、`e.`→∈、`|-`→⊢、`=/=`→≠、`C_`→⊆、`~P`→𝒫、`_V`→V、`(/)`→∅ 等；**`v` 不替换**（set.mm 里 `v` 是 setvar，ax-ac 用到） |
| `hypotheses` | array | mandatory hypotheses（按 Metamath 索引顺序），每项 `{label, kind:"$f"|"$e", formulaAscii, formulaUnicode}`；`$p` 的 `$f` 只含结论/假设里出现的变量 |
| `proofRefs` | array | 解码后的证明引用序列（**含重复**，即每次实际引用），只含 assertion label（含 `wi`/`wn` 这类 syntax `$a`），不列 index<H 的 mandatory hypothesis 引用、不列 `Z`；去重即「依赖集」 |
| `proofLength` | number | 解码后的未压缩证明步数（RPN token 数，不含 `Z`）；`$a` 为 0 |
| `dv` | array | 断言相关的 `$d` 对，如 `[["x","y"],["ph","x"]]`；**只保留两变量都出现在结论或 mandatory hypothesis 里的对**（纯证明哑变量的 `$d` 已剔除；例如 `equid` 的 `$d x y` 不出现） |
| `comment` | string | 语句注释的第一句（去格式化） |
| `assertionForm` | bool | 无 mandatory `$e` 即 true（=`$p` 且无 `$e`，或 `$a` 且无 `$e`） |
| `subsection` | string | 最近的三/四级标题（小节），如 `Axiom scheme ax-12 (Substitution)`（额外字段） |
| `module` | string | `set-pred.mm` / `set-class.mm` / `set-zf.mm` / `set-zfc.mm`（额外字段） |
| `line` | number | 语句 label 所在行号（额外字段） |

**收录范围（默认）**：四模块全部 `$a`（345 条）+ `set-pred.mm` 全部 `$p`（2677 条）+
`eqid` 依赖闭包（`eqid`、`eqriv`、`dfcleq`、`axextb`、`axextg`，5 条） = **3027 条**。
这样 JSON 内部 `proofRefs` 全部可解析（0 悬空），同时不把 set.mm 的数万条 ZF 定理库堆进来。

---

## 6. 复现与统计

```bash
# 统计模式（解析 + 解码校验 + 目标明细）
node research/parse-setmm.cjs

# 生成 research/setmm-data.json（默认范围，3027 条）
node research/parse-setmm.cjs --json

# 全量模式：四模块所有 $a/$p（约 10,793 条，会覆盖同一个 JSON 文件）
node research/parse-setmm.cjs --json --full
```

各模块统计（解析所得，未过滤）：

| 模块 | `$a` | `$p` | assertion-form `$p` |
|---|---|---|---|
| set-pred.mm | 57 | 2677 | 1264 |
| set-class.mm | 75 | 2425 | 1153 |
| set-zf.mm | 207 | 5098 | 3234 |
| set-zfc.mm | 6 | 248 | 141 |
| 合计 | 345 | 10448 | 5792 |

压缩证明解码算法（`parse-setmm.cjs` 内 `decodeCompressedProof`）：

1. `$p` 的 `$=` 后是 `( label list ) proofstring`；label list 列出证明中会用到的断言以及（哑变量）`$f` 的 label，每个 label 只列一次。
2. 索引空间 = mandatory hypotheses（`$e` + 出现在结论/`$e` 里的 `$f`，按声明顺序）→ label list → `Z` 保存栈。
3. 字母解码：`A..T` = 0..19；前缀 `U..Y` 为高位（`U..Y` = 1..5，位权 20、100、500…，即
   `n = d + 20*(u1 + 5*u2 + 25*u3 + …)`）。
4. `Z` 把上一步结果压入保存栈；索引越过 label list 末尾就从保存栈取。
5. 校验：按每个 label 的 mandatory hypothesis 数做栈高度模拟，最终栈高必须为 1、不得下溢/越界；
   全部 10,448 个证明通过。**只解码引用，不重放替换/合一**（任务允许；如需 mm 级验证可另写 unifier）。

`node -e "const a=require('./research/setmm-data.json'); console.log(a.length, a.filter(x=>x.label==='ax-1')[0].formulaUnicode)"`
可直接验证 JSON 可解析。

---

## 7. 无法解析 / 缺失项 / 已知限制

1. **目标缺失**：0。任务点名的 47 个 label 全部找到（含 `eqid` 在 set-class.mm、`ax-ac` 在 set-zfc.mm）。
2. **证明解码失败**：0（四模块 10,448 个 `$p` 全部通过栈高校验）。
3. **proofRefs 悬空引用**：0（闭包后全部可在 JSON 内解析）。
4. **公式核对**：47 个目标与源文件逐 token 一致；其余公式由同一 token 流生成，未单独人工核对。
5. **未做证明替换验证**：只验证了引用结构和栈高度，未做变量替换/合一验证；这不影响「引用 label 序列」的正确性。
6. **Unicode 未覆盖 token**：`F/`、`e/`、`` `' ``、`` |` ``、`o.`、`\/_`、`-/\`、`-\/` 等原样保留，
   逻辑四组公理/定义用到的符号均已覆盖。`v` 故意不映射（setvar）。
7. **kind 多出 `syntax`**：任务只要求 axiom/definition/theorem；`$a` 里的语法构造（`wi`、`wn`、`cv`、`wceq`…）
   既不是公理也不是定义，标为 `syntax`（160 条），并**包含在 JSON 内**，否则 `proofRefs` 里的 `wi`/`wn` 无法解析。
8. **set-class/zf/zfc 普通定理未全收**：默认 JSON 只有其 `$a`（定义/公理/语法）与 eqid 闭包 5 条 `$p`；
   这是按 DESIGN「集合论章只用公理」做的取舍。若 Lead 后续要 ZF 定理库，用 `--full` 重新生成。
9. **`df-0`/`df-1` 等**在 `set-num.mm`（四模块之外），如需数字定义要扩大解析范围。
10. **DESIGN 的两处 DV 描述与现行 set.mm 不符**（ax-12/ax-13 无 DV，见 §2.5），以 JSON 为准。
