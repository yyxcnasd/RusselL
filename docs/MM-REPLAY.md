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
| `src/mm/panel.js` | `RSL.MM.Panel` | 只读重放面板（DOM） | panel |
| `src/mm/mm.css` | — | 面板样式 | panel |

`index.html` 与 `scripts/build-toy.js` 的 `RUNTIME_JS` 顺序（新增项插在标注位置）：

```
logic → archive → library → levels → levels-generated
      → mm/flags → mm/proofs → mm/levels        ← 新增，必须在 catalog 之前
      → engine → route → achievements → save → ui
      → mm/panel                                ← 新增，在 ui 之后、catalog 之前
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

## 8. `RSL.MM.Panel` API（`src/mm/panel.js` + `src/mm/mm.css`）

```js
Panel.mount(container, opts) -> handle
// opts = { level, proof, mode:'replay'|'interactive', onSolved(){}, onProgress(info){}, sfx(name){} }
// handle = { destroy(), state(), mode(), setMode(mode), next(), prev(), goTo(i) }
```

容器由 `main.js` 提供（`#mm-root`，与棋盘同级）。面板自己建根节点、加 class `mm-panel`。

必须渲染并可被测试驱动的钩子（`data-*` 属性，DOM 里必须存在）：

| 钩子 | 含义 |
| --- | --- |
| `[data-mm-target]` | 目标公式（Unicode token 文本） |
| `[data-mm-code]` | set.mm label |
| `[data-mm-progress]` | `当前步骤 / 总步骤` 文本 |
| `[data-mm-step-list]` | 步骤列表容器 |
| `[data-mm-step="<stepId>"]` | 单个步骤行（可点击跳转） |
| `[data-mm-prev]` / `[data-mm-next]` | 上一步 / 下一步按钮（第一步禁用 prev，最后一步禁用 next） |
| `[data-mm-current]` | 当前步骤详情区 |
| `[data-mm-label]` | 当前步骤 label |
| `[data-mm-subst]` | 当前步骤替换 map（`var ↦ tokens`） |
| `[data-mm-conclusion]` | 当前步骤结论 |
| `[data-mm-state="pending|current|done"]` | 步骤行状态 |

行为：
- 初始只显示第 1 步为 `current`，其余 `pending`；`next` 逐条揭示，`prev` 回退（回退后已揭示的步骤仍可见，状态按当前位置重算）。
- 到 `finalStep` 时触发一次 `onSolved()`（同一次挂载不重复触发）。
- 键盘：`←`/`→` 上一步/下一步，`Home`/`End` 首/末步；焦点在输入框时不拦截。
- 步骤数 > 80 时分页/分段折叠（每段 40 步，可跳到段首），不一次性把上千行塞进 DOM。
- 步骤数 = 0（`$a` 公理）：显示「公理图式 · 无可重放步骤」+ 断言本身，不提供模式切换，
  由顶栏按钮确认完成（不自动通关）。
- **交互式自推（Tier 3）**：头部有 `[data-mm-mode-toggle]`；切到 interactive 后，左列是
  `[data-mm-hyp="<label>"]` / `[data-mm-assert="<label>"]` 候选（不可用的 `disabled` + `title`
  写原因），右列是 `[data-mm-stack]`（底→顶）、`[data-mm-actions]`、`[data-mm-ref]`、
  `[data-mm-hint]` / `[data-mm-hint-text]`、`[data-mm-error]`、`[data-mm-undo]`、
  `[data-mm-reset]`，通关后才有 `[data-mm-solved]`。键盘 `Backspace` 撤销、`h` 提示。
- 移动端（≤ 700px）：纵向堆叠，步骤列表在详情下方。
- 文案与设计走 `docs/DESIGN.md`：少字、对象语言用 → / ↔、变量与公式用 STIX 斜体（`class="formula"`）。
- 面板不得读取 `RSL.APP` / 全局状态；只通过参数与回调通信。

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
6. **加载顺序多了 `mm/expr.js` 与 `mm/verify.js`**：契约 §0 的顺序块只标了 data 与 panel；
   实际在 `mm/levels` 之后、`engine` 之前插入 expr → verify（panel 依赖 Expr）。
7. **`Panel.mount` 的 handle 是 `{ destroy(), state() }`**；`main.js` 不依赖
   `next()`，顶栏按钮通过点击面板内的 `[data-mm-next]` 推进（`mmAdvance`）。
   步骤数 0 的 `$a` 关卡传 `onSolved: null`，由顶栏按钮确认完成。
8. **关卡多了展示字段**：`group`（命题/谓词/等词/集合）、`note`（一句说明）、
   `axiom`（是否 `$a` 公理图式）、`stats`（steps/asserts/maxDepth/refs）、`order`。
   `chapter` 固定 `'mm'`、`band` 固定 `'mm'`、`requires` 固定 `[]`。
9. **容器**：`main.js` 懒创建 `#mmRoot`（`.stage` 的 flex 子项，`flex-direction:column`），
   与 `.board` 互斥显示；`mm.css` 只管 `.mm-panel` 内部与选关行样式。
10. **验收命令**：`npm run build:mm` 重建数据；`node scripts/mm-verify.js` 出报告；
    `node --test tests/mm-replay.test.js` 数据层断言；`node tests/mm-ui.js` 真浏览器
    端到端（88 checks，含回放 + 自推 + 移动端）。
11. **目标清单唯一来源是 `scripts/mm-targets.js`**：加目标只要往那里加一行
    `{label, chapter, title, note}`，再 `npm run build:mm`；每章 12 个、章内按步数升序是
    设计约束（`tests/mm-replay.test.js` 会检查）。
12. **统一难度与交错**：`Catalog.build()` 用 `D(接线)=模块数+0.1·AST`、
    `D(重放)=1.4+2.2417·log2(1+steps)` 排序，位置 1–36 基础段 / 37–72 挑战段；
    这消除了「304 步之后回到 3 个模块」的断崖（数据见 `docs/LEVEL-DESIGN-PROPOSAL.md`）。
    重放关在选关面板里是横跨 4 格的卡片，显示章内位置号而不是 `MM-xx`。

