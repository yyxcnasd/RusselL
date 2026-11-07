# 集合论层（第 Ⅳ 章）

第 Ⅳ 章把 ZFC 公理作为“元件”接进同一块板。只用 set.mm 的 setvar 原始语言：
`∀`、`¬`、`→`、`=`、`∈`；不引入类抽象、⊆、∪、∅。

## 公理

| 模块 | set.mm | 公式 |
| --- | --- | --- |
| `axiom:ax-ext` | ax-ext | `∀z(z∈x↔z∈y)→x=y` |
| `axiom:ax-rep` | ax-rep | `∀w∃y∀z(∀yP→z=y)→∃y∀z(z∈y↔∃w(w∈x∧∀yP))` |
| `axiom:ax-pow` | ax-pow | `∃y∀z(∀w(w∈z→w∈x)→z∈y)` |
| `axiom:ax-un` | ax-un | `∃y∀z(∃w(z∈w∧w∈x)→z∈y)` |
| `axiom:ax-reg` | ax-reg | `∃y y∈x→∃y(y∈x∧∀z(z∈y→¬z∈x))` |
| `axiom:ax-inf` | ax-inf | `∃y(x∈y∧∀z(z∈y→∃w(z∈w∧w∈y)))` |
| `axiom:ax-ac` | ax-ac | `∃y∀z∀w((z∈w∧w∈x)→∃v∀u(∃t((u∈w∧w∈t)∧(u∈t∧t∈y))↔u=v))` |

`ax-rep` 原式中的 φ 是任意 wff；游戏用原子 `P` 占位，属于可读性简化。

## 第 Ⅳ 章的 60 关

前 12 关是手写概念关（下表）；第 13–60 关由 set.mm 档案 + 闭包/例化/定义置换模板生成，
其中集合论的 define 条目来自 `set-class.mm`、`set-zf.mm`、`set-zfc.mm`。

| 关 | 目标 | 做法 |
| --- | --- | --- |
| CH4-01 | ax-ext | 直接接公理 |
| CH4-02 | `∀x∀y(∀z(z∈x↔z∈y)→x=y)` | ∀I 闭包 |
| CH4-03 | `∀z(z∈a↔z∈b)→a=b` | 引用闭包 + ∀E 到 a、b |
| CH4-04 | ax-pow | 直接接公理 |
| CH4-05 | ax-pow 的 a 实例 | ∀I(x) 后 ∀E(a) |
| CH4-06 | ax-un | 直接接公理 |
| CH4-07 | ax-un 的 a 实例 | ∀I(x) 后 ∀E(a) |
| CH4-08 | ax-reg | 直接接公理 |
| CH4-09 | ax-reg 的 a 实例 | ∀I(x) 后 ∀E(a) |
| CH4-10 | ax-inf | 直接接公理 |
| CH4-11 | ax-ac | 直接接公理 |
| CH4-12 | ax-rep | 直接接公理（P 为占位） |

## 说明

- 这一章是“公理墙”：先让玩家看见 ZFC 的七条公理长什么样，再练习把自由变元闭包、
  再例化到常元。它**不是**在游戏内重证 ZF 定理，也没有实现类抽象或分离/空集/配对等
  由公理导出的定理。
- `∈` 是解析器新增的中缀关系，AST 仍是 `pred` 节点；`Logic.eq`、`freeVars`、`substituteVar`
  都能正常处理。
- 若以后要扩展到 `df-ss`、`df-cleq`、`df-clel`，需要先给逻辑层加入类项/类抽象语法。
