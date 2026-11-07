# Metamath 数据源与内容映射

本作的内容来源是 [Metamath Proof Explorer](https://us.metamath.org/mpeuni/mmset.html) 的
`set.mm` 数据库，不再使用 `pmproofs-orig.txt` 的《数学原理》命题档案。

## 来源与授权

- 仓库：<https://github.com/metamath/set.mm>，`develop` 分支
- 下载日期：2026-11-07
- 本地文件：`assets/data/set.mm`，51,812,832 字节；只作为开发/核对数据，**不参与构建**
- 授权：set.mm 以 **CC0 1.0** 放弃版权；Metamath 站点文本为公有领域
- 本作不是 Metamath 官方产品

`set.mm` 是一个模块化数据库：本次用到的内容位于

| 区段 | 内容 | 行号（本地文件） |
| --- | --- | --- |
| `set-pred.mm` | 命题演算、谓词演算、等词 | 约 317–24879 |
| `set-class.mm` | 类、外延（`ax-ext` 在 24970）、集合基本运算 | 约 24882–49814 |
| `set-zf.mm` | ZF 公理与后续集合论 | 约 49817 起 |
| `set-zfc.mm` | 选择公理（`ax-ac` 在 118630） | 约 117694 起 |

游戏只取 set.mm 的**原始语言**：¬、→、∀、=、∈。类抽象 `{x | φ}`、⊆、∪、∅ 等派生记法
不在关卡里出现；集合论章只用 setvar + ∈ + = 的原始语言。

## 提取了什么

`research/parse-setmm.cjs` 是一个只读解析器（供核对用）：它解析 `$a / $p / $e / $f / $d`
语句、注释区段标题，并把压缩证明解码成引用的 label 列表。运行：

```bash
node research/parse-setmm.cjs --json   # 生成 research/setmm-data.json
```

产物字段：`label / kind / section / subsection / formulaAscii / formulaUnicode / hypotheses /
proofRefs / proofLength / dv / comment / assertionForm`。当前产物 3027 条（公理 29 / 定义 156 /
语法构造 160 / 定理 2682），set-pred 的 10,448 个压缩证明全部解码成功。

游戏内实际采用的是 `src/library.js` 里人工校对的 24 条公理/定义/定理桥：

- 命题：`ax-1`、`ax-2`、`ax-3`；定义 `df-or`、`df-an`、`df-ex`；`dfbi2`（由 df-bi 导出的定理桥）
- 谓词：`ax-4`、`ax-5`、`ax-10`、`ax-11`；规则形态 `ax-gen` 由 `all-intro` 承担
- 等词：`ax-6`、`ax-7`、`ax-8`、`ax-9`、`ax-12`、`ax-13`
- 集合论：`ax-ext`、`ax-rep`、`ax-pow`、`ax-un`、`ax-reg`、`ax-inf`、`ax-ac`

命题章的 `id`、`pm2.27`、`con1`、`pm2.04`、`imim1`、`con2` 等定理目标同样取自 set.mm
（label 与公式见 `research/setmm-data.json`）。

## 档案模块（src/archive.js）

`src/archive.js` 由 `scripts/gen-levels.js` 从 `research/setmm-data.json` 生成，收录 **845 条**
可被游戏 AST 解析的 assertion-form 条目（命题 581 / 谓词 101 / 等词 144 / 集合 19）：

- 每条含 `label / formula / kind / section / module / proofLength / source`；
- 关卡用 `archive:<label>` 引用，模块输出该条目的公式；
- 它们是 set.mm 的已证定理/公理/定义，**不是本游戏重证的结果**；UI 用 ARCHIVE/银色标注。

`scripts/gen-levels.js` 还会生成 `src/levels-generated.js`：每章追加 48 关（第 13–60 关），
共 192 关。模板包括：

| 模板 | 做法 |
| --- | --- |
| 档案 | archive 模块直接接目标 |
| 代入 / 双代入 | archive + 1–2 个 subst 链 + 复合公式构造 |
| 全称闭包 | archive + ∀I 链 |
| 例化 | archive + ∀I 闭包 + ∀E 到常元 |
| 闭包 + 部分例化 | 先闭包，再消去部分量词 |
| 分离 | 把一条 set.mm 定理作为前件代入另一条，再用 ax-mp |

生成器逐关调用 `src/engine.js` 求值；任何一关失败就拒绝写出。手写的 48 关（每章前 12 关）
保持在 `src/levels.js`。全部 240 关由 `tests/levels.test.js` 逐关校验。

## 公式与定义的处理

游戏 AST 直接支持 `¬ ∨ → ∧ ↔ ∀ ∃`。为了让“目标相等”有唯一判据，`src/logic.js` 的
`expand()` 按 set.mm 的定义把公式展开到 `¬ / → / ∀` 核心：

```
df-or    A∨B  := ¬A→B
df-an    A∧B  := ¬(A→¬B)
dfbi2    A↔B  := (A→B)∧(B→A)        （set.mm 由 df-bi 导出的展开式）
df-ex    ∃x A := ¬∀x ¬A
```

`Logic.eq(a,b)` 仍等价于 `key(expand(a)) === key(expand(b))`，并带 α-等价。由于 ∧ 在
set.mm 里是 `¬(A→¬B)`，`∧/∨/↔/∃` 只是显示记法；`replace` 模块可在这四个定义上双向置换。

## 变量替换

`subst` 模块（游戏里的代入）按 Metamath 的方式做**直接替换**：wff 变元可以换成含被约束
变元的公式，替换式里的自由变元会被外层量词捕获。这是 Metamath 替换语义，不是 bug；它与
`substituteVar`（个体变元替换、capture-avoiding）分开。

## 关卡与证明

- 关卡目标均为 set.mm 的公式（或安全的实例/闭包）。
- `theorem:<关卡 id>` 模块表示**本游戏前面已经通关的关卡结论**；测试保证只能引用更早的关卡。
- 本作没有实现 set.mm 的完整证明器；参考电路由人/搜索器搭建，并用 `src/engine.js` 逐关求值。
- 命题章 7–12 关的参考电路可由 `scripts/prove.js` 复算（若该脚本可用）。

## 诚实边界

1. **不重证 set.mm**：游戏内没有完整的 40,000+ 定理证明链，也不声称能推出所有 set.mm 定理。
2. **DV 条件**：`ax-5` 带 `$d ph x`（x 不在 P 中自由）。现行 set.mm 的 `ax-12`、`ax-13`
   本身没有 `$d`；带 DV 的弱化版分别是 `ax12v`、`ax13v`。游戏在注记中声明，但引擎没有
   完整的 DV 检查；关卡只做安全实例。
3. **wff 变元**：`ax-rep` 原式的 φ 是任意 wff，游戏里用原子 `P` 占位，属于简化。
4. **集合论章**：以“公理即元件 + 闭包/例化”为主，不假装在游戏内重证 ZF 定理。
5. **定义的身份**：`df-or / df-an / dfbi2 / df-ex` 是定义（`dfbi2` 为 set.mm 的导出展开式），
   不是原始公理；调色板与注记都用“定义”标注。
