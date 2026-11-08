# 设计记录

这是一份工作笔记，记录公理板从 PM 档案迁到 Metamath set.mm 时的取舍。玩家文档看 [README](../README.md)，数据细节看 [docs/metamath.md](../docs/metamath.md)。

## 目标

- 用 set.mm 的公理、定义和定理做一款接线证明游戏。
- 四章体量一致：命题、谓词、等词、集合论，每章 60 关。
- 定义只作缩写，不能当断言模块；代入、分离、量词规则用电路模块表达。
- 少用说明文字，尽量用规则提示窗、图标、进度条和长度指标来引导。

## 结构

每章 60 关，分两段：

- 基础 30 关：概念关 + 档案、单次代入、闭包、定义置换；顺序解锁。打通后解锁下一章基础段。
- 挑战 30 关：分离、双代入、闭包后例化等组合操作；基础段完成后解锁，不挡下一章。两段内部按难度升序，挑战段最后一关是该章收尾。

每章前 12 关是手工关，其余由 `scripts/gen-levels.js` 从 set.mm 档案生成。手工关在 `src/levels.js`，生成关在 `src/levels-generated.js`。

## 公理与定义

公理 20 条，全部进入 `RSL.AXIOMS`：

- 命题：ax-1、ax-2、ax-3
- 谓词：ax-4、ax-5、ax-10、ax-11
- 等词：ax-6、ax-7、ax-8、ax-9、ax-12、ax-13
- 集合：ax-ext、ax-rep、ax-pow、ax-un、ax-reg、ax-inf、ax-ac

定义 4 条，只放在 `RSL.DEFINITIONS`，由 `Logic.expand` 和 `replace` 使用：

- df-or：`(P∨Q) ↔ (¬P→Q)`
- df-an：`(P∧Q) ↔ ¬(P→¬Q)`
- dfbi2：`(P↔Q) ↔ ((P→Q)∧(Q→P))`
- df-ex：`(∃x P) ↔ (¬∀x ¬P)`

它们不会出现在关卡模块、档案或关卡目标里。

## 档案与生成

`src/archive.js` 收录 993 条可解析的 set.mm 公理/定理条目，排除 `df-*` 定义。关卡可以用 `archive:<label>` 直接引用。

生成器使用六类模板：档案、代入/双代入、全称闭包、例化、闭包 + 部分例化、分离。每一关都会先交给 `src/engine.js` 求值，通过后才写入文件。

## 数据流

1. `research/parse-setmm.cjs` 解析 `assets/data/set.mm`，产出 `research/setmm-data.json`。
2. `scripts/gen-levels.js` 生成 `src/archive.js` 和 `src/levels-generated.js`。
3. 浏览器按 `logic → archive → library → levels → levels-generated → engine → route → achievements → save → ui → audio → coach → catalog → screens → board → main` 的顺序加载（详见 docs/ARCHITECTURE.md）。
4. `target` 的目标相等由 `Logic.eq`（定义展开 + α-等价）判定；目标上游必须含有公理、规则、档案或已证结论，不能只用构造门拼公式。

## 已知边界

- 游戏没有实现完整的 set.mm 证明器，也不声称重证 set.mm 的定理。
- 引擎没有完整的 distinct-variable 检查；ax-5 的 DV 条件写在注记里，相关关卡只做安全实例。
- ax-rep 原式的 φ 用原子 P 占位，属于简化。
- 集合论章以公理展示和闭包/例化为主，没有类抽象，也没有在游戏内重证 ZF 定理。
