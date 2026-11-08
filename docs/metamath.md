# Metamath 数据源与内容映射

游戏内容取自 [Metamath Proof Explorer](https://us.metamath.org/mpeuni/mmset.html) 的 `set.mm` 数据库。早先版本用过 `pmproofs-orig.txt` 里的《数学原理》命题档案；现在不再使用它。

## 来源与授权

- 仓库：<https://github.com/metamath/set.mm>，`develop` 分支，2026-11-07 下载。
- 本地文件：`assets/data/set.mm`（51,812,832 字节）。它只用来核对数据和生成关卡，不参与构建。
- 授权：set.mm 以 **CC0 1.0** 放弃版权；Metamath 站点文本属于公有领域。
- 本作不是 Metamath 官方产品。

本次用到的内容集中在四个区段：

| 区段 | 内容 | 本地文件行号 |
| --- | --- | --- |
| `set-pred.mm` | 命题演算、谓词演算、等词 | 约 317–24879 |
| `set-class.mm` | 类、外延（`ax-ext` 在 24970）、集合基本运算 | 约 24882–49814 |
| `set-zf.mm` | ZF 公理与后续集合论 | 约 49817 起 |
| `set-zfc.mm` | 选择公理（`ax-ac` 在 118630） | 约 117694 起 |

游戏只取 set.mm 的原始语言：`¬`、`→`、`∀`、`=`、`∈`。类抽象 `{x | φ}`、`⊆`、`∪`、`∅` 这些派生记法没有进入关卡；集合论章也只用 setvar + `∈` + `=`。

## 游戏里实际用到的公理

`src/library.js` 手工校对了 20 条公理：

- 命题：`ax-1`、`ax-2`、`ax-3`。
- 谓词：`ax-4`、`ax-5`、`ax-10`、`ax-11`；规则形态 `ax-gen` 由 `all-intro` 模块承担。
- 等词：`ax-6`、`ax-7`、`ax-8`、`ax-9`、`ax-12`、`ax-13`。
- 集合论：`ax-ext`、`ax-rep`、`ax-pow`、`ax-un`、`ax-reg`、`ax-inf`、`ax-ac`。

另外四个定义放在 `RSL.DEFINITIONS`，分别是 `df-or`、`df-an`、`df-ex`、`dfbi2`。它们是缩写，不是对象语言的断言，所以不会出现在 `RSL.AXIOMS` 里，也不会进入档案或关卡模块；只由 `Logic.expand` 和 `replace` 使用。

## 档案模块

`scripts/gen-levels.js` 从 `research/setmm-data.json` 和 `research/setmm-set-extra.json` 生成 `src/archive.js`，目前收录 993 条 assertion-form 条目：

- 命题 570 条，谓词与等词 244 条，集合 179 条。
- `df-*` 定义被排除。
- 每条包含 `label`、`formula`、`kind`、`section`、`module`、`proofLength`、`source`。
- 关卡用 `archive:<label>` 引用。模块输出该条目的公式；这些是 set.mm 的已证定理或公理，不是游戏内重新证明的结果。

同一个生成器还会写 `src/levels-generated.js`，每章补 48 关，共 192 关。档案公式的命题变元会归一化到 PQRSTUVWXYZABC 这 14 个名字（alpha 等价），关卡模板有：

| 模板 | 做法 |
| --- | --- |
| 推理 | 从档案定理/公理/已证结论出发：代入、全称闭包、定义置换（不再把档案直接接到目标） |
| 代入 / 双代入 | archive + 一到两个 `subst` 链 + 复合公式构造 |
| 全称闭包 | archive + `∀I` 链 |
| 例化 | `∀I` 闭包后用 `∀E` 换常元 |
| 闭包 + 部分例化 | 先闭包，再消去部分量词 |
| 分离 | 把一条 set.mm 定理作为前件代入另一条，再用 ax-mp |

生成器会逐关调用 `src/engine.js` 求值，任何一关不完整就停下，不会写出有问题的关卡。每关的 `allowed` 只保留参考电路实际用到的模块 + 目标，不再批量塞入所有连接词。手写的 48 关留在 `src/levels.js`，四章各 12 关。全部 240 关由 `tests/levels.test.js` 逐关校验。

关卡顺序也由生成器安排：基础段前段是推理关（把档案里的难证定理/公理当作已证引理，用代入、全称闭包、定义置换推出新目标），再放单次/双代入、闭包、分离等组合操作；挑战段放双代入、闭包后例化、分离等更难组合。档案条目只作为已证引理参与推理，不再有“把档案模块直接接到目标”的关卡，因此难证定理仍会出现在关卡里，但不会一键通关。两段内部都按难度升序排列，挑战段最后一关是该章难度最高的收尾。

## 公式比较与替换

`src/logic.js` 的 `expand()` 按 set.mm 的定义把公式展开到 `¬ / → / ∀` 核心：

```
df-or    A∨B  := ¬A→B
df-an    A∧B  := ¬(A→¬B)
dfbi2    A↔B  := (A→B)∧(B→A)
df-ex    ∃x A := ¬∀x ¬A
```

`Logic.eq(a,b)` 比较的是 `key(expand(a))` 和 `key(expand(b))`，并处理 α-等价。因为 `∧` 在 set.mm 中是 `¬(A→¬B)`，`∨/∧/↔/∃` 在游戏里只是显示记法；`replace` 模块可以在这四个定义上双向置换。

`subst` 模块按 Metamath 的方式做直接替换：wff 变元可以换成含被约束变元的公式，替换式里的自由变元会被外层量词捕获。这是 Metamath 的替换语义，不是 bug；个体变元的替换由单独的 `substituteVar` 处理，并做捕获规避。

## 证明重放（mm-replay）

除了把 set.mm 定理当“已证引理”用，仓库里还有一层**真正的证明重放器**：把 set.mm 的完整
压缩证明按 Metamath 规则重放成证明 DAG，再拿 DAG 校验结论。目标是 48 个定理/公理（每章 12 个），
让它们以**精确的 set.mm 目标公式**出现，而不是简化后的游戏公式。

### 数据管线

```
scripts/mm-targets.js           ← 48 个重放目标（label / 章节 / 中文名 / 说明，唯一来源）
assets/data/set.mm
  └─ scripts/mm-build-frames.js → research/mm-frames.json
       48 个目标 + 它们证明里直接引用的断言（引用不展开，闭包只有一层）
       另含证明里用到的假元变量 $f frame（vt / vy / vx / vw / vv …）
  └─ scripts/mm-verify.js      → research/mm-proofs/<label>.json（自包含 DAG）
                               → research/mm-report.json（逐目标成功/失败与步骤统计）
  └─ scripts/mm-to-levels.js   → src/mm/proofs.js、src/mm/levels.js（随游戏发布）
```

`npm run build:mm` 一次重建全部产物。frames.json 约 0.2 MB（重放闭包），
proofs.js 约 439 KB（48 个 DAG，共 1 494 步），都不含 set.mm 原文。

### 压缩证明语义（`src/mm/verify.js`）

一条 `$p` 的证明 = `( label… )` + 编码串。设 `H = mandatory.length`、`L = label 数`、
`base = H + L`，每个数字是一个步骤：

| 数字 | 含义 |
| --- | --- |
| `n < H` | 引用 mandatory 里的假设：`$f` 与 `$e` 都在证明栈上占一位，压入它的公式 |
| `H ≤ n < base` | 应用 `label[n-H]`：弹出 **mandatory.length** 个公式（**$f 也算**） |
| `n ≥ base` | 压入之前 `Z` 保存的栈条目 |

应用断言时先按顺序把 `$f` 的「类型码 + 变元」绑定成替换式（`ph ↦ 实际 token`），再用
已确定的替换式逐 token 比对 `$e`；两者都通过后把结论（替换后的断言公式）压回栈。
结束时栈高必须为 1，且等于该断言的结论——这一条是重放器唯一的“通过”标准。

替换是 Metamath 的**盲替换**：wff 变元换成含被约束变元的公式时会出现变量捕获，这是
语义而不是 bug（见 §公式比较与替换）。

### DV 覆盖范围（不要夸大）

实现只做 **basic** 检查，口径写死在这里：

1. 只检查该断言 **mandatory 假设里两个变元都出现**的 `$d` 对；涉及假元变量的 `$d` 对
   在套用定理时按 Metamath 语义忽略（例如 `isfin4-2` 的 `$d x A` 里的 x 是证明内部
   临时引入的假元变量）。
2. 检查方式是：两条 `$d` 变元的替换式**不共享任何变量 token**（常量不参与比较）。
3. 没有实现完整的 Metamath DV 分解/证明器，也不声称是完整验证器。

### 重放结果（2026-11-08，48/48 通过）

每章 12 个目标，括号里是重放步数；章节内按步数升序，这也是游戏里重放段的难度顺序。

| 章 | 目标（步数） |
| --- | --- |
| Ⅰ 命题 | pm2.07 (3)、pm2.5 (4)、simp2 (7)、con1 (8)、com12 (8)、pm2.04 (10)、simprrr (10)、id (11)、pm3.11 (13)、pm3.24 (14)、simpr12 (14)、3mix1 (17) |
| Ⅱ 谓词 | alim (4)、exim (8)、exancom (11)、19.2 (11)、19.9 (13)、alex (19)、19.21 (20)、19.36 (25)、19.31v (29)、3exdistr (53)、19.33b (56)、ax-11 (0，公理) |
| Ⅲ 等词 | axc16 (5)、eqeq1 (8)、eleq1 (8)、eqid (9)、equcom (13)、eqtri (13)、equtr (14)、equequ1 (18)、axc11r (28)、ax8 (42)、19.12vvv (46)、equvel (55) |
| Ⅳ 集合 | pwex (12)、vex (12)、eqtr2 (14)、vneqv (24)、fin41 (28)、oneltri (32)、axprlem1 (34)、en3lp (70)、axrep1 (131)、axunnd (206)、axacnd (304)、ax-pr (0，公理) |

`ax-11`、`ax-pr` 在 set.mm 里是 `$a` 公理，没有可重放的证明（0 步），关卡里作为
**公理图式**展示并由玩家确认，不冒充“重放通过”。

### 重放关（Tier 2 回放 + Tier 3 自推）

`src/mm/levels.js` 生成 48 个 `mode: "mm-proof"` 关卡：`targetTokens` 是 set.mm 原始结论的
token 串，`proofId` 指向 `RSL.MM_PROOFS` 里的 DAG。默认**开启**（`?mm=0` 或持久
`localStorage['axiom-simple:mm']='off'` 关闭），由 `Catalog.build()` 按统一难度
`D = 1.4 + 2.2417·log2(1+steps)` 与接线关一起排序、交错进每章的基础段/挑战段。

每关有两种玩法：

- **回放**（Tier 2）：步骤列表 + 当前步骤的 label、替换 map、结论；`←` `→` `Home` `End`。
- **自推**（Tier 3）：`Verify.session(proof)` 给出现可用的假设与断言，玩家自己点；引擎按
  同一套 Metamath 语义校验并给出「需要 n 个前提」「第 k 号假设不匹配」这类可定位错误，
  有提示（只按参考证明前缀给）、撤销、重来。允许与参考证明不同的路线。

### 明确不做的

- 不把 DAG 铺到走线棋盘（最大 304 步，铺上去不可玩）；只做步骤列表 + 当前步骤详情。
- 不展开被引定理自己的证明（引用是断言级的），所以 1 299 步是 48 个目标各自的局部证明步数。
- 不做 DAG 最小化、不做证明搜索、不做完整 set.mm 验证器。

## 边界

1. **没有完整证明器**：游戏不重证 set.mm 的 40,000+ 条定理，也不声称能推出所有 set.mm 定理。参考电路是人工或搜索器搭出来的，逐关用引擎验证。mm-replay 只重放 48 个目标的**局部**证明（引用是断言级的），它不是完整 set.mm 验证器。
2. **DV 条件**：`ax-5` 带 `$d ph x`（x 不在 P 中自由）。现行 set.mm 的 `ax-12`、`ax-13` 本身没有 `$d`，带 DV 的弱化版是 `ax12v`、`ax13v`。主游戏在注记里声明这些限制，引擎没有 distinct-variable 检查；mm-replay 有 basic DV 检查（口径见上文 §DV 覆盖范围），两条路径都不要当成完整 DV 验证。
3. **wff 变元**：`ax-rep` 原式的 φ 是任意 wff，游戏里用原子 `P` 占位，这是简化。
4. **集合论章**：以“公理即元件 + 闭包/例化”为主，不假装在游戏内重证 ZF 定理。
5. **定义的身份**：`df-or / df-an / dfbi2 / df-ex` 是缩写，不是对象语言的断言；它们不进入 `RSL.AXIOMS`、不进入档案，也不作为关卡模块。
6. **两套公式语言**：主游戏用 `Logic` AST（简化公式），重放关用 set.mm 原始 token 串；两者互不转换，不要把 `vex` 的 `|- x ∈ V` 反向还原成 `∃x x ∈ V`。

## 复现

```bash
# 重新解析 set.mm，生成 research/setmm-data.json
node research/parse-setmm.cjs --json

# 重新生成档案和关卡；会逐关跑引擎校验
node scripts/gen-levels.js

# 重放 48 个目标 并重建 mm 产物（需要 assets/data/set.mm）
node scripts/mm-build-frames.js    # → research/mm-frames.json
node scripts/mm-verify.js          # → research/mm-proofs/*.json + research/mm-report.json
node scripts/mm-to-levels.js       # → src/mm/proofs.js + src/mm/levels.js
# 等价于
npm run build:mm
```

提取器会解析 `$a / $p / $e / $f / $d` 语句和注释区段，并把压缩证明解码成引用的 label 列表。产物字段包括 `label / kind / section / subsection / formulaAscii / formulaUnicode / hypotheses / proofRefs / proofLength / dv / comment / assertionForm`。当前有 3027 条（公理 29 / 定义 156 / 语法构造 160 / 定理 2682），set-pred 的 10,448 个压缩证明全部解码成功。

`scripts/mm-verify.js --label pm3.24` 可单独打印某个目标的步骤统计与失败原因；
`node scripts/mm-build-frames.js --full` 会保留四个模块的全部 10 793 个 frame（约 11 MB，
默认只输出重放闭包的 241 个）。
