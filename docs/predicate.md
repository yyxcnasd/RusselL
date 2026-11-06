# 谓词层 / Predicate Layer — 设计说明

> 文件：`src/predicate.js`、`docs/predicate.md`（predicate-smith 的写域）
> 状态：内容设计完成并已实测。`src/predicate.js` 为 UTF-8 无 BOM；5 个 `solution` 已用
> `src/logic.js` + `src/engine.js` 逐一评估，全部 `complete === true` 且无 `errors`。
> `src/app.js` 已把 `RSL.PREDICATE.levels` 接进关卡表，`src/library.js` 已接进调色板。
> 依赖：`window.RSL.Logic`（逻辑层 API）、`window.RSL.PREDICATE`（本文件）、`src/engine.js` 的谓词模块。

---

## 1. 设计立场：还是同一块 PCB

谓词层不是换一个游戏，而是在同一块板上插一排新元件：

- **同一套视觉语法**：模块、1px 丝印、铜走线、目标焊盘、侧栏检验器都不变；量词只是新增的门形与夹具符号（`∀`、`∃`），不引入新的配色或“卡片墙”。
- **同一套阅读顺序**：先把量词当作“夹住公式的夹具”，再学两个方向——**例化**（从全称取出个体）与**推广**（把任意个体收回全称），最后才处理量词与命题联结词的交换。这与《数学原理》*9 → *10 的次序一致：*9 先处理量词的否定与作用域，*10 再把命题演算推广到含量词的公式。
- **同一套诚实标注**：板上的模块必须分清四种身份——**原始命题 / 定义 / 导出规则 / 档案定理**。谓词层没有把 PM 的 *10 结果说成“本游戏重证”，也不声称覆盖一阶谓词演算的完备性。

目标断言仍然是“一条公式”，胜利条件仍然是“目标焊盘的输入与关卡断言定义等价、约束变元可 α-改名”。因此谓词层不需要新的判定器，只需要新的模块语义。

---

## 2. 语形 / formation

`PREDICATE.formation` 给出完整条目；核心约定：

| 类别 | 写法 | 说明 |
| --- | --- | --- |
| 原子命题 | `P`、`Q` | 0 元谓词，可出现在谓词层公式内部（如 `P∨F(x)`）。 |
| 谓词原子 | `F(x)`、`R(x,y)` | 谓词字母作用于个体词；本层关卡主要用一元谓词。 |
| 个体词 | `x`、`y`、`z`；`a`、`b`、`c` | 变元可被约束；常元不被约束。 |
| 联结词 | `¬`、`∨`、`∧`、`→`、`↔` | `∧/→/↔` 按 D1–D3 定义展开；判定时与展开式同义。 |
| 量词 | `∀x A`、`∃x A` | 量词只约束作用域内自由的 `x`；身体是后随的最短公式，括号可延长。 |
| 约束变元 | `∀x F(x)` ≡ `∀y F(y)` | α-等价；`RSL.Logic.key/eq` 应把它们判为同一公式。 |
| 作用域 | `¬∀x ¬F(x)` = `¬(∀x (¬F(x)))` | PM 记法 `∼(x).∼φx`；`*9.01`、`*9.02` 给出量词否定的定义。 |

不建模的部分：PM 的 ramified theory of types、命题函项的高阶量词、`*13` 的同一性、函数符号与摹状词。本层按**一阶读法**解释量词，这是教学取舍，不是对 PM 全系统的复刻。

### 常元在 AST 里的约定

`RSL.Logic` 的 AST 只有 `{k:'var', name}`，没有独立的 const 节点。为避免改动逻辑层接口，本设计约定：

- 变元名：`x`、`y`、`z`；
- 常元名：`a`、`b`、`c`，同样用 `{k:'var', name:'a'}` 表示；
- 引擎按命名区分语义：`term` 模块可产出两者；`all-intro` / `exists-intro` 拒绝以常元为约束变元；`all-elim` 允许用常元做例化项。

如果 Lead 更愿意在逻辑层新增 `{k:'const'}`，需要同步改 `parse/fmt/eq/freeVars/substituteVar` 与测试；本设计不依赖这个改动。

---

## 3. 谓词材料的三层身份

| 层 | 条目 | PM 编号 | 身份 | 游戏中的载体 |
| --- | --- | --- | --- | --- |
| 原始命题 | 全称例化 `∀x A ⊃ A[y/x]` | `*10.1` | PM 的 `Pp`（原始命题） | `pred-axiom:PA1`（公式形式）+ `all-elim` 规则模块 |
| 原始规则 | 全称推广：若 `⊢A` 则 `⊢∀x A′` | `*10.11` | PM 的原始推理规则 | `all-intro` 规则模块 |
| 定义 | `∃x A := ¬∀x ¬A` | `*10.01` | `Df`，不是定理 | `pred-axiom:DfE` |
| 定义 | `¬∀x F(x) := ∃x ¬F(x)` | `*9.01` | `Df` | `pred-axiom:DfNotAll` |
| 定义 | `¬∃x F(x) := ∀x ¬F(x)` | `*9.02` | `Df` | `pred-axiom:DfNotExists` |
| 导出规则 | `∀x A ⊢ A[t/x]` | 同 `*10.1` | 由原始命题使用 | `all-elim`（与 PA1 并存，教学上分“公式”与“规则”） |
| 导出规则 | `A[t/x] ⊢ ∃x A` | 由 `*10.01` + `*10.1` + 命题演算 | 导出，不是 PM 原始规则 | `exists-intro` |
| 导出规则 | `∃x A, A[y/x]→B ⊢ B` | 由 `*10.23` + 分离 | 导出 | `exists-elim` |
| 档案定理 | `∀x(P∨F(x)) → (P∨∀xF(x))` | `*10.12` | PM *10 已证结果 | `theorem:*10.12`（可引用，不重证） |
| 档案定理 | `∀x(P→F(x)) ↔ (P→∀xF(x))` | `*10.21` | PM *10 已证结果 | `theorem:*10.21` |
| 档案定理 | `∀x(F(x)→P) ↔ (∃xF(x)→P)` | `*10.23` | PM *10 已证结果 | `theorem:*10.23` |

**PM *10 的前提**：SEP 指出，*10 的出发点是“把命题演算的定理对所有合式公式（包括含量词公式）成立地使用”。本游戏的命题层模块（`axiom`、`subst`、`detach`、`replace`）在这一层继续可用；谓词层不另造一套命题公理。

**没有声称的东西**：

1. 没有在游戏内重证 `*10.12`、`*10.21`、`*10.23`；它们作为**档案定理**接入，和命题层的 `*2.14` 同类。
2. 没有声称本模块集合是**完备**的一阶谓词演算。它是 PM *9–*10 语法与推理的一段教学切片；`exists-elim` 等规则也只是常见导出规则。
3. 没有把 `*10.1` 与 `all-elim` 说成两个不同定理：它们是同一条原始命题的“公式形态”与“规则形态”，板子上并存是为了让玩家看见“公理 vs 规则”的区别。

---

## 4. 模块语义（与 `src/engine.js` 对齐）

`PREDICATE.modules` 是机器可读版本；这里给出解释与 side condition。

### 4.1 `pred` — 谓词原子

- 配置：`{ name:'F', arg:'x' }`（当前一元；`args` 为将来的 n 元扩展）。
- 输出：`{k:'pred', name:'F', args:[{k:'var', name:'x'}]}`。
- 端口：无输入，`out` 为公式。
- 说明：这是**公式构造器**，不产生断言。`F(x)` 的自由变元 `x` 只是丝印，可被后续量词约束。

### 4.2 `term` — 个体词

- 配置：`{ name:'x' }`；`x/y/z` 为变元，`a/b/c` 为常元（按第 2 节约定）。
- 输出：`{k:'var', name}`。
- 说明：当前引擎的 `pred` 只读 `config.arg`，`term` 输出还没有接到 `pred` 的自变量端口；因此本层关卡不把 `term` 放进 `allowed`。等 Lead 给 `pred` 增加 `arg0…argn` 输入端口后，`term` 就能作为真正的“项源”使用。

### 4.3 `quant` — 量词门

- 输入：`a`（公式）。
- 配置：`{ kind:'all'|'exists', v:'x' }`。
- 输出：`{k:'all'|'exists', v, a}`。
- 说明：公式构造器，不是推理规则。`kind:'exists'` 在 PM 里应读作 `*10.01` 的 `¬∀x¬`；本游戏把 `∃` 做成原生 AST 节点，因此需要 `DfE` 在元层桥接。

### 4.4 `all-elim` — 全称例化（`*10.1`）

- 输入：`assertion`，必须是 `{k:'all'}`。
- 配置：`{ term:'y' }`（变元或常元）。
- 输出：`substituteVar(A, x, {k:'var', name:cfg.term})`。
- Side condition：`t` 对 `x` 可代入；捕获时改名内部同名约束变元。`RSL.Logic.substituteVar` 必须是 capture-avoiding，并且要能下钻 `not/or/imp/and/iff/all/exists` 节点（PC-04 会对 `∀x(F(x)→G(x))` 的 `imp` 身体做例化）。

### 4.5 `all-intro` — 全称推广（`*10.11`）

- 输入：`assertion`（任意断言）。
- 配置：`{ v:'x' }`。
- 输出：`{k:'all', v, a:input}`。
- Side condition：
  1. `v` 是变元，不是常元；
  2. `v` 在输入断言中自由出现（否则只是空量化，教学上拒绝）；
  3. `v` 不在任何**未消去的前提**中自由出现。
- 游戏现状：没有“假设 / premise”模块，因此条件 3 在所有现有关卡里自动满足。**但引擎仍应检查 1、2**；当前 `engine.js` 的实现是无条件包装，建议补上。若以后加入“假设”模块，必须实现条件 3，否则 ∀I 会不sound。

### 4.6 `exists-intro` — 存在引入

- 输入：`assertion`。
- 配置：`{ v:'x' }`。
- 输出：`{k:'exists', v, a:input}`。
- 标准形式：`A[t/x] ⊢ ∃x A`。当前引擎只做“把 `v` 绑到输入上”，等价于 `t = v` 的特例；`PC-02` 正是 `F(x) ⊢ ∃x F(x)`，因此在当前引擎下可跑。
- 若要支持 `F(a) ⊢ ∃x F(x)`，增加 `from:'a'` 配置并在输出前做 `substituteVar(input, a, v)`；注意 `v` 不能在输入中自由，避免自捕获。
- 身份：由 `*10.01` + `*10.1` + 命题演算导出，**不是** PM 的原始规则。

### 4.7 `exists-elim` — 存在消去

- 输入：`exists`（必须是 `{k:'exists'}`）、`implication`（必须是 `{k:'imp'}`）。
- 配置：`{ y:'y' }`，`y` 必须是新变元。
- 输出：`implication.b`。
- 校验：`implication.a` 必须与 `substituteVar(exists.a, exists.v, {k:'var', name:y})` 定义等价；`y` 不得在 `implication.b` 中自由。
- 身份：由 `*10.23` 与分离导出。注意 `*10.23` 的 `∀x(A→B)` 形式是“全称”，而本模块把第二路直接写成 `A[y/x]→B`（free `y`），这是常见的 ∃E 表述；两者在“y 任意”的前提下等价。文档不把这一步说成 PM 原始规则。

### 4.8 `pred-axiom` — 谓词公理 / 定义

- 配置：`{ axiomId }`，在 `RSL.PREDICATE.axioms` 中按 `id` 查找。
- 输出：`L.parse(axiom.schema)`。
- 说明：一个模块实例对应一条公理/定义。`DfE`、`DfNotAll`、`DfNotExists` 的 note 都明确标了 `Df`，调色板/图鉴不要把它们渲染成“档案定理”。

---

## 5. 关卡与参考解法

5 关都满足同一套关卡形状；`solution` 的节点/连线格式与 `src/levels.js` 一致（`{id,kind,x,y,config}` 与 `{from:{node,port},to:{node,port}}`），目标节点由 app 自动注入，引用 id 为 `target`。

### PC-01 例化 — `(∀x F(x))→F(x)`

- `allowed`: `pred`, `quant`, `not`, `or`, `all-elim`, `target`
- 参考电路：
  1. `pred F(x)` → `quant(all,x)` 得 `∀x F(x)`；
  2. 该全称式扇出：一路 `not` 得 `¬∀x F(x)`，一路 `all-elim(term=x)` 得 `F(x)`；
  3. `or(¬∀xF(x), F(x))` 得 `¬∀xF(x)∨F(x)`，按 D1 即目标。
- 判定依据：`L.eq` 展开 D1 后比较；目标 `(∀x F(x))→F(x)` ↔ `¬∀xF(x)∨F(x)`。
- 教学点：全称式是一排焊点，例化是取其中一枚；断言可以扇出（同一条 `∀x F(x)` 同时喂 `not` 与 `∀E`）。

### PC-02 存在引入 — `F(x)→∃x F(x)`

- `allowed`: `pred`, `not`, `or`, `exists-intro`, `target`
- 参考电路：`pred F(x)` 扇出；一路 `exists-intro(v=x)` 得 `∃x F(x)`，一路 `not` 得 `¬F(x)`；`or` 合成 `¬F(x)∨∃xF(x)`。
- 判定依据：D1 展开后与目标一致。
- 教学点：例证 `F(x)` 与存在式 `∃xF(x)` 是同一枚焊点的两种看法；∃I 是导出规则，不是新公理。

### PC-03 推广 — `(∀x F(x))→(∀y F(y))`

- `allowed`: `pred`, `quant`, `not`, `or`, `all-elim`, `all-intro`, `target`
- 参考电路：`∀x F(x)` → `all-elim(term=y)` 得 `F(y)` → `all-intro(v=y)` 得 `∀y F(y)`；同时 `∀x F(x)` 过 `not` 得 `¬∀xF(x)`；`or` 合成目标。
- 判定依据：D1 展开 + α-等价（目标的内层是 `∀x F(x)`，电路给的是 `∀y F(y)`）。
- 教学点：约束变元改名不改变公式；先例化到新名再推广，是“看穿丝印”的最短回路。

### PC-04 分配 — `(∀x (F(x)→G(x)))→((∀x F(x))→(∀x G(x)))`

- `allowed`: `pred`, `imp`, `quant`, `all-elim`, `all-intro`, `detach`, `target`
- 参考电路（12 个模块）：
  1. `pred F(x)` + `pred G(x)` → `imp` 得 `F(x)→G(x)` → `quant(all,x)` 得 `A1 = ∀x(F(x)→G(x))`；
  2. `pred F(x)` → `quant(all,x)` 得 `A2 = ∀x F(x)`；
  3. `all-elim(A1, term=y)` 得 `F(y)→G(y)`；`all-elim(A2, term=y)` 得 `F(y)`；
  4. `detach` 得 `G(y)`；
  5. `all-intro(v=y)` 得 `∀y G(y)`；
  6. `imp(A2, ∀yG(y))` 得 `A2→∀yG(y)`；`imp(A1, ·)` 得 `A1→(A2→∀yG(y))`；
  7. 接 `target`。
- 判定依据：目标内层是 `∀x G(x)`，电路给 `∀y G(y)`，α-等价；蕴涵按 D1 展开比较。
- 教学点：分配律不是“再插一条公理”，而是 `*10.1` 与 `*10.11` 的配合：**例化到新变元 y → 分离 → 推广**。这也是 PC-04 的 `note` 说“PM 中具体编号参《数学原理》相应章节”的原因：确切定理号本次未核验，不编造。

### PC-05 定义桥 — `(∃x F(x))↔(¬∀x ¬F(x))`

- `allowed`: `pred-axiom:DfE`, `target`
- 参考电路：`pred-axiom(DfE)` 直接接目标。
- 判定依据：模块输出就是 `axiom.schema`，与目标字符串逐节点相等。
- 教学点：`∃` 在 PM 中是定义，不是定理。这一关特意只有一根线，让玩家看到“定义桥”与“定理模块”在身份上的区别。

### 关于“捷径”的说明

本游戏的胜利条件是**目标输入与关卡断言定义等价**，不检查证明来源。因此理论上玩家可以用 `not`/`or`/`imp` 直接拼出目标，绕过本关想教的规则（PC-01 尤其明显：`∀xF(x)` 过 `not` 后与 `pred F(x)` 做 `or`，不需要 `all-elim`）。

这是引擎层已有的普遍问题（命题层同样可用 `not`+`or` 拼出 `(P∨P)→P` 的展开式），不是谓词层新增的。若要关卡“必须用到规则”，建议 Lead 在 `engine.evaluate` 或关卡数据上增加 `provenance` 检查：目标输入的上游必须包含至少一个规则/档案/公理模块，而不是纯 `not/or/imp/pred` 构造链。**在加入该检查前，请把本层关卡当成“示范电路 + 构造沙盒”，不要对外声称它们强制了证明步骤。**

---

## 6. PM 引用与核验

只列能核对的节号；核不到确切编号的，写“参《数学原理》相应章节”。

| 内容 | 引用 | 核验来源 | 状态 |
| --- | --- | --- | --- |
| 量词否定的两个定义 | `*9.01` `∼{(x).φx} .= (∃x).∼φx Df`；`*9.02` `∼{(∃x).φx} .= (x).∼φx Df` | [Wikisource, PM vol. I, djvu p.157 / 印刷 p.135](https://en.wikisource.org/wiki/Page:Russell,_Whitehead_-_Principia_Mathematica,_vol._I,_1910.djvu/157) | 直接核对 |
| *9 的定位 | “Extension of the theory of deduction… apparent variables”；引入 “always/sometimes” 两个原始概念 | [Wikisource, djvu p.154 / 印刷 p.132](https://en.wikisource.org/wiki/Page:Russell,_Whitehead_-_Principia_Mathematica,_vol._I,_1910.djvu/154) | 直接核对 |
| `∃` 的定义 | `*10.01` `∃x A := ¬∀x ¬A` | [SEP, Principia Mathematica, §4.1.1](https://plato.stanford.edu/entries/principia-mathematica/) | 节号与现代化转写核对 |
| 全称例化 | `*10.1` `⊢ ∀x A ⊃ A′`（A′ 以项 y 代 x） | 同上 SEP §4.1.1 | 节号与转写核对 |
| 全称推广 | `*10.11` 若 `⊢A` 则 `⊢∀x A′` | 同上 SEP §4.1.1 | 节号与转写核对 |
| 量词包含 | `*10.12`、`*10.21`、`*10.23` | 同上 SEP §4.1.1 | 节号与转写核对 |
| 全称分配律的精确 PM 编号 | 未核到 | — | **参《数学原理》相应章节** |

**核验限制（诚实说明）**：PM 第一卷 *10 的 Wikisource 扫描页从 djvu p.164 起尚未转录，本次没能直接读原书对应页；上表 *10 诸条依据 SEP 的现代化转写（其节号是 `*10.01`/`*10.1`/`*10.11`/`*10.12`/`*10.21`/`*10.23`），不把转写当成逐字原文。`*9.01`、`*9.02` 有 Wikisource 原页可查。

**Metamath**：`pmproofs-orig.txt` 是命题层 193 条 PM 定理的证明记录来源，不覆盖量词层。本文件没有使用任何未核验的 Metamath 量词定理名，也没有把 Metamath 名称伪装成 PM 编号。

---

## 7. 集成说明（Lead）

1. **加载顺序**：`index.html` 当前为 `src/logic.js` → `src/predicate.js` → `src/library.js` → `src/engine.js` → `src/app.js`。`predicate.js` 必须先于 `library.js` 的 `predicateParts()` 调用；`engine.js` 的 `getAxiom` / `getPredicateTheorem` 是按需读取，顺序更宽松。
2. **合并关卡**：`src/app.js` 的 `levels()` 已自动把 `RSL.PREDICATE.levels` 接在 `RSL.LEVELS` 之后，并统一分配 `_index` / `order` / `targetPos` / `world`。本文件不硬编码 `index`、`order`，只给每关 `targetPos` 与 `world`（默认 `{x:900,y:300}` / `2000×1000`；PC-03 用 `{x:900,y:620}`、PC-04 用 `{x:900,y:420}`，均在 2000×1000 板内）。
3. **章节**：`library.js` 的 `CHAPTERS` 已有 `predicate` / `CH.04` / “谓词层”；无需改。关卡 `chapter:'predicate'` 与 `code:'PC-xx'` 已写好。
4. **目标节点**：`app.js` 的 `createTarget(level)` 会把 `level.target` 写进目标节点的 `target` 字段（`engine.js` 用 `node.target` 解析）。五个谓词目标已实测可被 `L.parse` 解析。
5. **调色板**：`library.js` 的 `predicateParts()` 已覆盖 8 个模块 + `pred-axiom:<id>` + `theorem:<code>`。本文件的 `axioms`/`theorems` 字段名与 `library.js` 的读取方式一致（`a.id`、`a.code`、`a.name`、`a.schema`；`t.code`、`t.name`、`t.formula`）。
6. **引擎需补的检查**（按重要性）：
   - `all-intro`：检查 `v` 是变元、`v` 在输入断言中自由；若将来有前提模块，再检查 `v` 不在前提中自由。当前实现是无条件包装。
   - `exists-intro`：若要支持 `F(a) ⊢ ∃x F(x)`，增加 `from` 配置并做 `substituteVar`；当前关卡用 `t = v`，可不改。
   - `exists-elim`：第二路必须是 `imp` 节点（当前已查）；`y` 不在 `B` 自由（已查）；建议再查 `y` 不在 `∃x A` 自由。
   - `substituteVar`：必须能处理 `imp/and/iff/not/or/all/exists`（PC-04 的 `∀x(F(x)→G(x))` 是 `all` 包 `imp`）。这是逻辑层接口，需 logic-smith 配合确认。
   - 常元：按命名约定 `a/b/c`；`all-intro`/`exists-intro` 拒绝常元作约束变元，`all-elim` 允许常元作例化项。
   - 一元谓词限制：`pred` 目前 `config.arg` 只有一个；若 UI 要展示 `R(x,y)`，需扩展 `config.args` 和输入端口。本层关卡只用一元。
7. **已完成的自动验收**（本次用真实 `logic.js` + `engine.js` 跑的轻量检查，不是证明搜索）：
   - 4 条 `axioms`、3 条 `theorems`、5 条关卡 `target` 全部能被 `L.parse` 解析；
   - 5 个 `solution` 经 `engine.evaluate` 全部 `complete === true`、`errors` 为空；
   - 覆盖到了 D1 展开（PC-01/02/03）、α-等价（PC-03/04）、`substituteVar` 下钻 `imp`（PC-04）、`detach`、`all-intro` 与 `pred-axiom`（PC-05）。
   - 以后若改引擎或目标字符串，重跑同一检查即可；若 app 有“看解法”按钮，直接复用 `solution`（`target` 节点由 app 注入，`solution.edges` 里对 `target` 的引用仍可用）。
8. **视觉/渲染注意**（给 visual-smith 的接口信息）：公式渲染器需要 `.f-quant`（量词）与 `.f-var`（个体变元）的现有 span 支持；本层没有新增 Unicode 之外的图标。`∀E`/`∀I`/`∃I`/`∃E` 作为模块丝印文字，遵循 11px 以上、4.5:1 对比度。谓词公式比命题公式长（PC-04 目标 48 字符量级），节点公式区需允许两行；目标条 17–20px 需确认不溢出。

---

## 8. 已知限制与诚实声明

- **不声称完备性**：本层是一阶谓词演算的一小段教学切片，不是完备系统；游戏也不声称能推出所有一阶有效式。
- **不声称重证 PM**：`*10.12`、`*10.21`、`*10.23` 是档案定理；`*10.1` 是原始命题；`*10.01`/`*9.01`/`*9.02` 是定义。三者身份不同，UI 不应混标。
- **类型论缺席**：PM 的 ramified types 与高阶量词未建模；`∀`/`∃` 按一阶论域解释。
- **∃ 的双重身份**：PM 定义 ∃，本游戏 AST 原生支持 ∃；`DfE` 模块是二者的显式桥，不应被当成“定理”。
- **常元是命名约定**：`a/b/c` 仍是 `{k:'var'}`；如果逻辑层将来加入 `const`，需同步本文件的 `term`/`all-elim` 说明和引擎。
- **精确编号的空白**：全称分配律在 PM 中的确切定理号本次未核到，统一写“参《数学原理》相应章节”；不要从二手材料补一个看似精确的编号。
- **捷径问题**：见 §5 末尾。胜利判定只看定义等价，不检查证明来源；谓词关卡目前是“示范电路”，不是强制证明步骤的关卡。

---

## 9. 交付清单

- `src/predicate.js`：`window.RSL.PREDICATE`，含 `title / intro / symbols / formation / axioms / theorems / rules / modules / levels`；UTF-8 无 BOM，`node --check` 通过，首 80 行以 UTF-8 读取无乱码。
- `docs/predicate.md`：本文件。
- 关卡：`PC-01`（全称例化）、`PC-02`（存在引入）、`PC-03`（全称推广）、`PC-04`（全称分配）、`PC-05`（∃/∀ 定义桥）；5 个参考电路均经真实引擎评估通过。
- 未运行证明搜索或重计算；未改动他人文件。
