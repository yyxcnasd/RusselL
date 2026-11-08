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

同一个生成器还会写 `src/levels-generated.js`，每章补 48 关，共 192 关。模板有六种：

| 模板 | 做法 |
| --- | --- |
| 推理 | 从公理或已证结论出发：代入、全称闭包、闭包 + 例化（不使用档案直连目标） |
| 代入 / 双代入 | archive + 一到两个 `subst` 链 + 复合公式构造 |
| 全称闭包 | archive + `∀I` 链 |
| 例化 | `∀I` 闭包后用 `∀E` 换常元 |
| 闭包 + 部分例化 | 先闭包，再消去部分量词 |
| 分离 | 把一条 set.mm 定理作为前件代入另一条，再用 ax-mp |

生成器会逐关调用 `src/engine.js` 求值，任何一关不完整就停下，不会写出有问题的关卡。手写的 48 关留在 `src/levels.js`，四章各 12 关。全部 240 关由 `tests/levels.test.js` 逐关校验。

关卡顺序也由生成器安排：基础段前三段是推理入门（代入、全称闭包、闭包 + 例化），再放档案引理、单次代入和定义置换；挑战段放分离、双代入、闭包后例化等组合操作。档案条目只作为已证引理参与代入/闭包/分离，不再有“把档案模块直接接到目标”的关卡。两段内部都按难度升序排列，挑战段最后一关是该章难度最高的收尾。

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

## 边界

1. **没有完整证明器**：游戏不重证 set.mm 的 40,000+ 条定理，也不声称能推出所有 set.mm 定理。参考电路是人工或搜索器搭出来的，逐关用引擎验证。
2. **DV 条件**：`ax-5` 带 `$d ph x`（x 不在 P 中自由）。现行 set.mm 的 `ax-12`、`ax-13` 本身没有 `$d`，带 DV 的弱化版是 `ax12v`、`ax13v`。游戏在注记里声明这些限制，但引擎没有完整的 distinct-variable 检查，相关关卡只做安全实例。
3. **wff 变元**：`ax-rep` 原式的 φ 是任意 wff，游戏里用原子 `P` 占位，这是简化。
4. **集合论章**：以“公理即元件 + 闭包/例化”为主，不假装在游戏内重证 ZF 定理。
5. **定义的身份**：`df-or / df-an / dfbi2 / df-ex` 是缩写，不是对象语言的断言；它们不进入 `RSL.AXIOMS`、不进入档案，也不作为关卡模块。

## 复现

```bash
# 重新解析 set.mm，生成 research/setmm-data.json
node research/parse-setmm.cjs --json

# 重新生成档案和关卡；会逐关跑引擎校验
node scripts/gen-levels.js
```

提取器会解析 `$a / $p / $e / $f / $d` 语句和注释区段，并把压缩证明解码成引用的 label 列表。产物字段包括 `label / kind / section / subsection / formulaAscii / formulaUnicode / hypotheses / proofRefs / proofLength / dv / comment / assertionForm`。当前有 3027 条（公理 29 / 定义 156 / 语法构造 160 / 定理 2682），set-pred 的 10,448 个压缩证明全部解码成功。
