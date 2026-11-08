# set.mm 证明重放：实现契约（v1，冻结）

> 本文件是 mm-replay 子系统各模块之间的**接口契约**。数据形状、文件路径、命名空间一旦冻结，
> 各模块并行开发时不得单方面改动；确需改动先在本文件里改版本号并通知所有实现者。
>
> 相关背景见 [REPLAY-HANDOFF.md](REPLAY-HANDOFF.md)。现有 240 关与 `src/logic.js` **不动**。

## 0. 文件与加载顺序

新增文件（全部经典 `<script>`、IIFE、挂 `window.RSL`）：

| 文件 | 命名空间 | 职责 | 生产者 |
| --- | --- | --- | --- |
| `src/mm/flags.js` | `RSL.MM.Flags` | feature flag，默认关闭 | wiring |
| `src/mm/proofs.js` | `RSL.MM_PROOFS` | 生成：48 个证明 DAG（自包含） | 生成器 |
| `src/mm/levels.js` | `RSL.MM_LEVELS` | 生成：48 个 `mm-proof` 关卡（每章 12 个） | 生成器 |
| `src/mm/expr.js` | `RSL.MM.Expr` | MM token 公式层（替换/匹配/应用/显示） | core |
| `src/mm/verify.js` | `RSL.MM.Verify` | 压缩证明重放 + DAG 校验 | core |
| `src/mm/graph.js` | `RSL.MM.Graph` | 证明 → 棋盘图（节点求值 / 布局 / 元件栏 / 参考推进） | core |
| `src/mm/mm.css` | — | 重放卡片、重放元件栏与 token 公式排版 | panel |

`index.html` 与 `scripts/build-toy.js` 的 `RUNTIME_JS` 顺序（新增项插在标注位置）：

```
logic → archive → library → levels → levels-generated
      → mm/flags → mm/proofs → mm/levels        ← 新增，必须在 catalog 之前
      → engine → route → achievements → save → ui
      → term → modules → engine                  ← 唯一表达式/模块/求值层（运行时）
      → audio → coach → catalog → screens → board → main
```

## 1. 公式 = token 数组

完整 set.mm 表达式就是 token 串，例如 `pm3.24`：

```js
['|-', '-.', '(', 'ph', '/\\', '-.', 'ph', ')']
```

常量 token：`|- wff wn wi wa wb wal wex weq wel ...` 与语法符号 `-. ( ) -> /\ <-> A. E. = e.`。
变量 token 分两类，由 frame 的 `$f` 声明决定：`wff` 类（`ph ps ch ...`）与 `setvar` 类
（`x y z w v u ...`）。**不要**把 token 解析成 AST；重放全程按 token 序列处理。

## 2. `RSL.MM.Expr` API（`src/mm/expr.js`）

纯函数、无 DOM、无全局可变状态；同时支持 `window.RSL.MM.Expr` 与 `module.exports`。

```js
toASCII(tokens) -> string        // '|- -. ( ph /\\ -. ph )'
toUnicode(tokens) -> string      // '⊢ ¬ ( φ ∧ ¬ φ )'
parse(text) -> string[]          // 反向；未知记号按原样成 token
key(tokens) -> string            // 规范化比较键（join('\u0000')）
substTokens(tokens, sub) -> string[]
    // 直接替换：token 若出现在 sub 里就整体换成 sub[token]；不检查捕获（Metamath 语义）
matchFormula(pattern, actual, sub) -> boolean
    // pattern 里出现的变量（sub 中尚无绑定者且不是常量）绑定到 actual 的 token 子序列；
    // 已绑定的变量必须 token 相等；常量逐 token 相等。会就地写 sub。
applyAssertion(frame, actualFormulas) -> { ok, conclusion, sub, error }
    // frame = { math, mandatory:[{label,kind,math,var}] }
    // actualFormulas 长度必须 = frame.mandatory.length；按 mandatory 顺序匹配；
    // 全部匹配成功后 conclusion = substTokens(frame.math, sub)
stripType(tokens) -> string[]    // 去掉首 token 的 typecode（'wff' / '|-' 等）
```

变量判定：`Expr.isWffVar`, `Expr.isSetVar` 只在显式传入变量集合时使用；重放器内部一律用
`sub` 中「是否已出现绑定」来区分变量与常量，避免依赖全局符号表。

## 3. `RSL.MM.Verify` API（`src/mm/verify.js`）

依赖 `RSL.MM.Expr`（Node 下 `require('./expr.js')`）。

```js
replay(assertion, frameOf) -> { ok, errors:[], steps:[], finalStep, stats }
    // assertion = { label, kind, math, mandatory, dv, proofTokens }
    // frameOf(label) -> frame | null        （未知 label 必须报错，不得静默跳过）
    // 压缩证明语义：
    //   '(' labels ') ' + 编码串；H = mandatory.length；L = labels.length；base = H + L
    //   数字 < H  → mandatory[i] 假设步骤（$f/$e 都在栈上占一个位置）
    //   H <= 数字 < base → labels[数字-H] 断言步骤
    //   数字 >= base → 已保存栈条目 (Z 之前压入的)
    //   断言步骤弹出 mandatory.length 个公式（**包括 $f**），按 mandatory 顺序匹配，
    //   替换后把结论压回栈；结束时栈高必须为 1，且等于 assertion.math。
    // 每步输出：
    //   { id:'s1', label, kind:'hyp'|'assert', inputs:[stepId...],
    //     subst:{var:[tokens]}, conclusion:[tokens], stackDepth }
verifyProof(proof) -> { ok, errors:[], checked:number }
    // 校验已保存的 DAG（自包含）：逐 step 用 proof.frames[step.label] 重新应用
    // inputs 的 conclusion，检查与 step.conclusion 一致；finalStep 的 conclusion
    // 必须等于 proof.conclusion；hyp 步骤的 conclusion 必须等于 mandatory[i].math。
checkDv(proof) -> { ok, errors:[], checked, mode:'basic' }
    // 基本 DV：只要某步替换把两个 $d 变元绑到「共享同一 setvar」的公式上就报错。
    // Tier 1/2 只声明这个覆盖范围，不声称完整 Metamath 验证器。
```

重放失败必须给出可定位原因：`unknown label: X`、`stack underflow at step N (label X)`、
`mismatch at step N (label X) hypothesis #k`、`final stack height 2 != 1`、`final formula != conclusion`。

## 4. `research/mm-frames.json`（生成，工作产物）

```json
{
  "generatedAt": "2026-11-08T…",
  "source": "assets/data/set.mm",
  "modules": ["set-pred.mm","set-class.mm","set-zf.mm","set-zfc.mm"],
  "counts": { "frames": 1234, "assertions": 1200, "proofs": 1100 },
  "frames": {
    "pm3.24": {
      "label": "pm3.24", "kind": "$p",
      "math": ["|-","-.","(","ph","/\\","-.","ph",")"],
      "mandatory": [{ "label":"wph", "kind":"$f", "math":["wff","ph"], "var":"ph" }],
      "dv": [],
      "proofTokens": ["(","wi","wn","wa","id","iman","mpbi",")","AABAACDCAEAAFG"],
      "module": "set-pred.mm", "line": 1123,
      "section": "…", "subsection": "…", "comment": "…"
    }
  }
}
```

`frames` 必须包含 48 个目标的**传递闭包**（目标本身 + 其证明里引用到的全部 label），
否则校验会缺 frame。文件只进 `research/`，不进 `src/`、不进 `dist/`。

## 5. `RSL.MM_PROOFS`（生成，随游戏发布）

`src/mm/proofs.js` 内容形如：

```js
(function (host) {
  'use strict';
  host.RSL = host.RSL || {};
  host.RSL.MM_PROOFS = { /* ← 生成器写入 */ };
  if (typeof module !== 'undefined' && module.exports) module.exports = host.RSL.MM_PROOFS;
})(typeof window !== 'undefined' ? window : globalThis);
```

`RSL.MM_PROOFS[label]` 形状（**自包含**，不依赖 frames.json，可离线重新校验）：

```js
{
  label: 'pm3.24',
  kind: '$p',                     // '$p' 定理 | '$a' 公理（公理没有 steps）
  conclusion: ['|-', '…'],
  mandatory: [{ label:'wph', kind:'$f', math:['wff','ph'], var:'ph' }],
  dv: [],
  steps: [
    { id:'s1', label:'wph', kind:'hyp', hypIndex:0, inputs:[], subst:{}, conclusion:['wff','ph'] },
    { id:'s7', label:'mpbi', kind:'assert', inputs:['s3','s4','s5','s6'],
      subst:{ ph:['(', 'ph', '->', 'ph', ')'], ps:['-.', 'ph'] },
      conclusion:['|-', '…'] }
  ],
  finalStep: 's14',               // 无 steps 时为 null
  frames: {                       // 仅本证明用到的 label → 拆掉 proofTokens 的 frame
    'mpbi': { label:'mpbi', kind:'$p', math:['|-','ps'],
              mandatory:[{label:'wph',kind:'$f',math:['wff','ph'],var:'ph'}, …], dv:[] }
  },
  stats: { steps: 14, asserts: 7, hyps: 7, maxDepth: 4, refs: ['wi','wn','wa','id','iman','mpbi'] }
}
```

硬约束：整个 `src/mm/proofs.js` **< 2 MB**；`scripts/mm-targets.js` 里的 48 个 label 必须
全部存在；每个 proof 必须能被 `Verify.verifyProof` 离线校验通过。

## 6. `RSL.MM_LEVELS`（生成，随游戏发布）

```js
{
  id: 'MM-01',                    // 稳定 id（存档键），显示编号用 chapterOrder
  mode: 'mm-proof',
  chapter: 'prop',                // 真实章节：prop/pred/eq/set
  band: 'replay',                 // 生成数据的占位标记；Catalog 会按难度重新分配 base/challenge
  group: '命题',
  title: '非矛盾律',               // 中文短名（≤ 14 字）
  note: '⊢ ¬(φ ∧ ¬φ)：…',
  code: 'pm3.24',                 // set.mm label
  targetTokens: ['|-','-.','(','ph','/\\','-.','ph',')'],
  targetUnicode: '⊢ ¬ ( φ ∧ ¬ φ )',
  proofId: 'pm3.24',
  axiom: false,                   // $a 公理图式（没有可重放步骤）
  stats: { steps: 14, asserts: 7, maxDepth: 5, refs: 6 },
  requires: [], order: 1, chapterOrder: 1
}
```

重放关**不再单独成组**：`Catalog.build()` 把它们和接线关放在同一把难度尺子上，
按章交错排列（见下面的 §7 与 `docs/LEVEL-DESIGN-PROPOSAL.md`）。

## 7. `RSL.MM.Flags` API（`src/mm/flags.js`）

```js
Flags.enabled() -> boolean        // 默认 true（重放关是主线的一部分）
Flags.set(true|false)             // 写 localStorage；不刷新页面
Flags.source() -> 'query'|'storage'|'default'
```

取值优先级：`?mm=0` / `?mm=off`（本次访问关闭）→ `?mm=1` / `?mm=on`（本次访问开启）→
`localStorage['axiom-simple:mm']` 的 `'off'` / `'on'` → 默认 true。

`Catalog.build()` 在关闭时回到**旧版 240 关布局**（基础 30 → 挑战 30，逐字段等于旧基线）；
开启时把 48 个重放关并进对应章节参与统一难度排序（见 §10）。

## 8. 棋盘式重放（统一运行时）

重放关和普通关走**同一块棋盘**：同样的贴纸节点、端口、导线、拖动与缩放。区别只在公式是
set.mm token 串，节点类型是 `mmhyp` / `mmstep`。

### 8.1 数据与求值（唯一管线）

```js
level.palette      -> [{ kind:'mmstep', config:{label, arity} } | { kind:'mmhyp', config:{label}, given:true }]
level.initialNodes -> [ {id,kind,x,y,config} ... ]            // 目标 + 前提，载入即预置
level.reference    -> [ {stepId, kind:'hyp'|'assert', label, inputs, x, y} ... ]
Engine.evaluate(level, nodes, edges, { proof })               // 与接线关同一个求值器
```

生成期用 `RSL.MM.Graph` 算一次布局/参考动作，写进关卡数据；运行时不再依赖它。

- `mmhyp` 节点：本关的 `$f` / `$e` 假设（以及证明里用到的假元假设），输出该假设的 token 公式。
  载入关卡时预先摆放成「给定输入」。
- `mmstep` 节点：按 `config.arity` 渲染输入端口 `e1..e8`；按 mandatory 顺序收集上游公式，
  用 `Expr.applyAssertion` 求结论（`$f` 绑定、`$e` 逐 token 比对、basic DV）。缺输入是
  `idle`（等待第 k 个前提），接错是 `error`（带 label 与第几号假设）。
- `target` 焊盘：上游结论的 token 串必须与 `level.targetTokens` 完全一致才 `complete`。
- `$a` 公理关（ax-11 / ax-pr）：没有 steps，`Graph` 用 `mandatory + conclusion` 合成它自己的
  frame，元件栏只有它自己一条，接上全部前提即出公理图式。

### 8.2 棋盘与顶栏

- 元件栏（`#tray`）进入 `is-mm` 样式：横向可滚动、代号等宽；点/拖走和普通模块一致。
- 顶栏新增「参考」按钮 `#hintBtn`（仅重放关显示）：按参考证明摆放节点并接线；小证明一次
  一步，大证明按批推进（≤48 步/次），304 步的 axacnd 约 13 次走完。
- 顶栏「校验」：未完成时 toast 第一条可定位错误；完成时弹通关面板（显示「用了 N 个步骤节点 /
  参考 M 个断言」）。
- 重放关的导线使用简单正交折线（`board.simpleWires = true`），不做逐条 A* 避障；
  普通关仍是 A* 走线。
- 目标公式在顶栏用 `Expr.toHTML` 渲染（只显示公式体，⊢ 由 `.turnstile` 画）；节点公式
  最多显示 3 行，完整 token 串在节点 `title` 里。

### 8.3 验收

`node tests/mm-ui.js`（真 Edge）：目录卡片进入、节点/端口/元件栏、拖线算出公式、
「校验」反馈、pm3.24 参考走完、axacnd 304 步分批走完、$a 公理关、深色、移动端、
切回普通关恢复 A* 走线与普通元件栏。

## 9. 版本

`v1` 冻结于本次实现。改动任一 API 前先升级版本号并同步 `docs/MM-REPLAY.md`。

## 10. 实现备注（v1 落地后的补充，不回改上面的契约）

实现完成后发现的语义细节与契约里没写死的字段，记录在这里，避免下一轮踩坑：

1. **弹栈数 = mandatory.length，包含 `$f`**。契约 §3 已写对，但语义容易被误解：
   压缩证明里 `$f` 假设也占栈位，`H` 就是 mandatory 数量。
2. **假元假设（dummy variable）**：证明常用的 `vt/vy/vx/vw/vv` 这类 `$f` 不在
   mandatory 里，但会出现在 label 列表中。`research/mm-frames.json` 的 `hyps`
   单独存放这些 frame；重放时按「压入该 $f 公式」处理（`hypIndex = -1`），
   `Verify.verifyProof` 用 `proof.frames[label]` 校验它们。
3. **DV 只检查 mandatory DV 对**：`frame.dv` 里两变元都在 mandatory 假设中的对才检查；
   dummy 变量的 `$d` 对按 Metamath 语义忽略（见 `Verify.mandatoryDv`）。
   不这样做会把 fin41 / axunnd / axacnd 的合法证明误判为 DV 失败。
4. **闭包只有一层**：引用是断言级的（不展开被引定理自己的证明），所以
   `mm-frames.json` 默认只含 48 个目标 + 它们直接引用的断言（275 个）；
   `--full` 才输出四模块 10 793 个 frame。证明数据自包含：`proofs.js` 里每个
   proof 带 `frames`（refs 的 frame）与 `vars`（token → 类型码），可脱离 frames.json
   用 `Verify.verifyProof` 复验。
5. **`proof.vars` 是额外字段**：`{ 'ph': 'wff', 'x': 'setvar', … }`，供显示时把变量
   排成斜体、以及 DV 判断区分变量与常量；契约 §5 的字段是必需项，不是全集。
6. **加载顺序多了 `mm/expr.js` / `mm/verify.js` / `mm/graph.js`**：在 `mm/levels` 之后、
   `engine` 之前插入 expr → verify，`ui` 之后、`audio` 之前插入 graph（它依赖 Expr/Verify）。
7. **重放关没有独立面板**：`mm-proof` 关卡直接复用 `Board` 与普通节点/导线；`mmhyp` /
   `mmstep` 只是两种新模块（`engine.js` 提供端口元数据，求值在 `src/mm/graph.js`）。
8. **关卡多了展示字段**：`group`（命题/谓词/等词/集合）、`note`（一句说明）、
   `axiom`（是否 `$a` 公理图式）、`stats`（steps/asserts/maxDepth/refs）、`order`。
   `chapter` 固定 `'mm'`、`band` 固定 `'mm'`、`requires` 固定 `[]`。
9. **棋盘与导线**：重放关把 `board.simpleWires` 设为 true（简单正交折线，不做逐条 A*），
   初始图 = 目标焊盘 + 本关前提节点；元件栏 = 参考证明用到的断言（`is-mm` 横向滚动）。
10. **验收命令**：`npm run build:mm` 重建数据；`node scripts/mm-verify.js` 出报告；
    `node --test tests/mm-replay.test.js` 数据层断言；`node tests/mm-ui.js` 真浏览器
    端到端（59 checks，含拖线、参考推进、移动端）。
11. **目标清单唯一来源是 `scripts/mm-targets.js`**：加目标只要往那里加一行
    `{label, chapter, title, note}`，再 `npm run build:mm`；每章 12 个、章内按步数升序是
    设计约束（`tests/mm-replay.test.js` 会检查）。
12. **统一难度与交错**：`Catalog.build()` 用 `D(接线)=模块数+0.1·AST`、
    `D(重放)=1.4+2.2417·log2(1+steps)` 排序，位置 1–36 基础段 / 37–72 挑战段；
    这消除了「304 步之后回到 3 个模块」的断崖（数据见 `docs/LEVEL-DESIGN-PROPOSAL.md`）。
    重放关在选关面板里是横跨 4 格的卡片，显示章内位置号而不是 `MM-xx`。

