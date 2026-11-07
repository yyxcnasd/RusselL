# 公理板 · Metamath 重设计（工作稿）

> 状态：Lead 决策稿。所有成员以本文件为准；数值/公式以 `assets/data/set.mm` 为准。
> 本文件不是最终文档，最终说明写回 `docs/` 与 `README.md`。

## 0. 一句话

把游戏从「PM Solitaire / pmproofs 档案」改成「Metamath set.mm 的逻辑与集合论」：以 set.mm 的
公理、定义、定理为唯一内容来源，重做 4 章 × 12 关 = 48 关，四章体量相等。

## 1. 数据来源

- 本地文件：`assets/data/set.mm`（GitHub `metamath/set.mm` develop，2026-11-07 下载，51,812,832 字节）。
- 逻辑/谓词/等词：文件内 `set-pred.mm` 区段（约 317–24879 行）。
- 集合论：`set-class.mm` / `set-zf.mm` 区段（约 24882 行起）。
- 站点：<https://us.metamath.org/mpeuni/mmset.html>（公理表）。
- set.mm 为 CC0 / public domain；不保留 pmproofs 依赖。`src/theorems.js`、`src/metamath.js`、
  `assets/data/pm-proofs.md` 退出运行时，最终删除。

## 2. 公理基（set.mm）

命题演算（Łukasiewicz / Church P2）：

- `ax-1` `P→(Q→P)`（Simp）
- `ax-2` `(P→(Q→R))→((P→Q)→(P→R))`（Frege）
- `ax-3` `(¬P→¬Q)→(Q→P)`（Transp）
- 规则：`ax-mp`（游戏中仍是 `detach` 模块）

谓词演算（Tarski S2，选取游戏可表达且不需要额外 DV 机制的部分）：

- `ax-gen`（游戏中仍由 `all-intro` 规则承担）
- `ax-4` `∀x(P→Q)→(∀xP→∀xQ)`
- `ax-5` `P→∀xP`（x 不在 P 中自由；游戏中用注记声明）
- `ax-10` `¬∀xP→∀x¬∀xP`
- `ax-11` `∀x∀yP→∀y∀xP`

等词：

- `ax-6` `¬∀x¬x=y`（存在）
- `ax-7` `x=y→(x=z→y=z)`（相等）
- `ax-8` `x=y→(x∈z→y∈z)`（∈ 左替换）
- `ax-9` `x=y→(z∈x→z∈y)`（∈ 右替换）
- `ax-12` `x=y→(∀yP→∀x(x=y→P))`（替换；DV x,y）
- `ax-13` `¬x=y→(y=z→∀x y=z)`（量化相等；DV x,z）

集合论（ZFC）：

- `ax-ext` `∀z(z∈x↔z∈y)→x=y`
- `ax-rep` `∀w∃y∀z(∀yP→z=y)→∃y∀z(z∈y↔∃w(w∈x∧∀yP))`（P 为 wff 变元，游戏中用原子 P 占位，注记声明）
- `ax-pow` `∃y∀z(∀w(w∈z→w∈x)→z∈y)`
- `ax-un` `∃y∀z(∃w(z∈w∧w∈x)→z∈y)`
- `ax-reg` `∃y y∈x→∃y(y∈x∧∀z(z∈y→¬z∈x))`
- `ax-inf` `∃y(x∈y∧∀z(z∈y→∃w(z∈w∧w∈y)))`
- `ax-ac` `∃y∀z∀w((z∈w∧w∈x)→∃v∀u(∃t((u∈w∧w∈t)∧(u∈t∧t∈y))↔u=v))`

### 定义（display/expand 用）

- `df-or` `(P∨Q)↔(¬P→Q)`（∨ 由 → 定义）
- `df-an` `(P∧Q)↔¬(P→¬Q)`
- `dfbi2` `(P↔Q)↔((P→Q)∧(Q→P))`（set.mm 由 df-bi 导出的展开式；游戏用它作为 ↔ 的桥）
- `df-ex` `(∃xP)↔(¬∀x¬P)`

`Logic.expand` 的规范核：`¬`、`→`、`∀`、原子/谓词/变元。`∨/∧/↔/∃` 全部展开成它们；
`eq()` 仍是「定义展开 + α 等价」。`replace` 模块支持 `df-or / df-an / dfbi2 / df-ex` 双向。

### 语法扩展

- 新增中缀关系 `∈`：`x∈y` → `{k:'pred', name:'∈', args:[x,y]}`；显示 `x ∈ y`。
- 不引入类抽象 `{x|φ}`、⊆、∪ 等；集合论关卡只用 setvar + ∈ + = 的原始语言。

## 3. 章节与关卡（4 × 12 = 48）

编号：`CH1-01`…`CH1-12`，`CH2-…`，`CH3-…`，`CH4-…`。全局顺序即解锁顺序。
`theorem:<levelId>` 表示「引用前面已经通关的关卡结论」，只能引用 index 更小的关卡；
引擎从 `RSL.LEVELS` 里按 id 取 target 作为模块输出，`main.js` 调色板同样按 id 生成。

### Ⅰ 命题（12）

1. ax-1 直接
2. ax-2 直接
3. ax-3 直接
4. df-or 定义桥
5. df-an 定义桥
6. dfbi2 定义桥
7. id：`P→P`（ax-1, ax-2, detach）
8. pm2.27：`P→((P→Q)→Q)`
9. con1：`(¬P→Q)→(¬Q→P)`
10. pm2.04：`(P→(Q→R))→(Q→(P→R))`
11. imim1：`(P→Q)→((Q→R)→(P→R))`
12. 挑战：con2 `(P→Q)→(¬Q→¬P)`

7–12 的参考电路由 `scripts/prove.js` 生成/校验；可用前面关卡当定理模块。

### Ⅱ 谓词（12）

1. ax-4 直接
2. ax-4 实例（P:=F(x), Q:=G(x)）
3. ax-5 直接
4. ax-5 实例（P:=F(y)）
5. ax-10 直接
6. ax-10 实例（P:=F(x)）
7. ax-11 直接
8. ax-11 实例（P:=F(x)）
9. df-ex 定义桥
10. df-ex 实例（P:=F(x)）
11. ∀I 闭包：`∀x(F(x)→(G(x)→F(x)))`（ax-1 + subst + all-intro）
12. ∀E 取回：`F(a)→(G(a)→F(a))`（上题 + all-elim(a)）

### Ⅲ 等词（12）

1. ax-6 直接
2. ax-6 闭包：`∀y¬∀x¬x=y`
3. ax-6 实例：`¬∀x¬x=a`
4. ax-7 直接
5. ax-7 闭包：`∀x∀y∀z(x=y→(x=z→y=z))`
6. ax-7 实例：`a=b→(a=c→b=c)`
7. ax-8 直接
8. ax-8 实例：`a=b→(a∈c→b∈c)`
9. ax-9 直接
10. ax-9 实例：`a=b→(c∈a→c∈b)`
11. ax-12 直接
12. ax-13 直接

### Ⅳ 集合论（12）

1. ax-ext 直接
2. ax-ext 闭包：`∀x∀y(∀z(z∈x↔z∈y)→x=y)`
3. ax-ext 实例：`∀z(z∈a↔z∈b)→a=b`
4. ax-pow 直接
5. ax-pow 实例：`∃y∀z(∀w(w∈z→w∈a)→z∈y)`
6. ax-un 直接
7. ax-un 实例：`∃y∀z(∃w(z∈w∧w∈a)→z∈y)`
8. ax-reg 直接
9. ax-reg 实例：`∃y y∈a→∃y(y∈a∧∀z(z∈y→¬z∈a))`
10. ax-inf 直接
11. ax-ac 直接
12. ax-rep 直接

> 集合论章以「公理即元件 + 变元闭包/例化」为主，不假装在游戏内重证 ZF 定理。

## 4. 游戏机制（不改大框架）

- 关卡仍 = 目标断言 + 可用元件 + 参考电路；胜利条件仍是目标焊盘输入与目标定义等价。
- `allowed` 键：`axiom:<id>`、`theorem:<levelId>`、构造函数 / 规则模块名、`target`。
- 删除所有来自 pmproofs 的 `theorem` 模块；`theorem:` 只指本游戏前面关卡。
- 关卡数据必须自带 reference solution；`tests/levels.test.js` 逐关跑引擎，且校验：
  - 48 关、四章各 12 关；
  - 每关 target 可解析；
  - 每关 solution 完整；
  - 所有 `theorem:<id>` 指向更早关卡；
  - 所有 `axiom:<id>` 在 `RSL.AXIOMS` 中存在。
- `main.js` 章节：Ⅰ 命题 / Ⅱ 谓词 / Ⅲ 等词 / Ⅳ 集合；同章顺序解锁，跨章依赖上一章末关。
- 保留 UI 的极简风格、音效、深色模式、选关面板。

## 5. 文件职责

- Lead：`src/logic.js`（定义/∈/expand/replace）、`src/library.js`（公理/定义/调色板）、
  `src/engine.js`（theorem 解析、∈）、`src/main.js`（章节/元件表）、`src/levels.js`（48 关）。
- scout：只写 `research/`，产出 `research/setmm-data.json` + `research/SETMM-NOTES.md`。
- proof-smith：只写 `scripts/prove.js` 与 `research/PROVER.md`；不改 `src/`。
- 任何成员不得改别人写域；Lead 合并后统一跑 `npm test`。

## 6. 验收

- `npm test` 全绿（logic + levels）。
- `node tests/simple-smoke.js`（如本机 Edge 可用）。
- `node scripts/build-toy.js` 成功。
- README/docs 数据与新关卡一致；不再出现 pmproofs 作为内容来源。
