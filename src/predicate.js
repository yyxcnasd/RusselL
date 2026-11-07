/* 公理板 — 谓词层 / predicate layer.
 *
 * Classic script. Loads after src/logic.js and before src/library.js / src/app.js.
 * Exposes window.RSL.PREDICATE: symbols, formation notes, primitive axiom/definition
 * modules, archived PM *10 theorems, inference rules, module contracts and levels.
 *
 * References: PM *9.01, *9.02 (negation of quantifiers; PM vol. I, printed p. 135),
 * PM *10.01, *10.1, *10.11 (definition of ∃, ∀-instantiation, ∀-generalization),
 * PM *10.12, *10.21, *10.23 (archived quantifier-containment results). Exact PM page
 * numbers for *10 were not re-read during authoring; the *10 formulas below follow
 * the Stanford Encyclopedia of Philosophy's modernized transcription, while *9.01
 * and *9.02 were checked against the Wikisource scan. See docs/predicate.md.
 *
 * Encoding: UTF-8, no BOM.
 */
(function () {
  'use strict';
  window.RSL = window.RSL || {};

  var TARGET_X = 900;
  var TARGET_Y = 300;

  function node(id, kind, x, y, config) {
    return { id: id, kind: kind, x: x, y: y, config: config || {} };
  }
  function edge(from, fromPort, to, toPort) {
    return { from: { node: from, port: fromPort || 'out' }, to: { node: to, port: toPort } };
  }

  var PREDICATE = {
    title: '谓词层',
    en: 'PREDICATE LAYER',
    intro:
      '命题演算只会说“这件事成立 / 不成立”。谓词层把“对所有 x”“存在 x”焊进同一块板：' +
      '量词是一枚夹住公式的夹具，例化与推广是它的两个方向。\n\n' +
      '罗素在《数学原理》*9–*10 里把量词接到命题演算上：*9 先定义量词的否定与作用域，' +
      '*10 再给出例化、推广与量词包含。本层沿用这个顺序，但不假装重证 *10 的全部结果：' +
      '原始命题、定义、导出规则和档案定理在板子上用不同颜色的模块区分。',

    /* 符号表：只列玩家在本层真正会遇到的记号。 */
    symbols: [
      { glyph: '∀', name: '全称量词', desc: '“对所有 x”。∀x A 表示 A 对论域中每个个体都成立。' },
      { glyph: '∃', name: '存在量词', desc: '“存在 x”。∃x A 表示至少有一个个体使 A 成立；PM 用 ¬∀¬ 定义它。' },
      { glyph: 'x', name: '个体变元', desc: 'x、y、z 可被量词约束；约束变元只是丝印，改名为 y 不改变公式。' },
      { glyph: 'a', name: '个体常元', desc: 'a、b、c 指固定的个体，不被量词约束；可用于全称例化。' },
      { glyph: 'F', name: '谓词字母', desc: 'F、G 作用于个体词，得到 F(x)、G(y) 等原子公式。本层主要用一元谓词。' },
      { glyph: '¬', name: '否定', desc: '¬A 表示“并非 A”。量词否定由 *9.01、*9.02 定义。' },
      { glyph: '∨', name: '析取', desc: 'A∨B 表示“A 或 B”。蕴涵 A→B 在 PM 中定义为 ¬A∨B（D1）。' },
      { glyph: '→', name: '蕴涵', desc: '游戏中的现代记法；对应 PM 的 ⊃。' },
      { glyph: '⊃', name: 'PM 蕴涵号', desc: '《数学原理》印刷体中的蕴涵记号，读作“蕴涵”。' }
    ],

    /* 形成规则：什么算公式，量词的作用域到哪里。 */
    formation: [
      '原子命题：P、Q、R… 是公式；它们不含量词，可出现在谓词层公式内部。',
      '谓词原子：若 F 是一元谓词字母、t 是个体词，则 F(t) 是公式；R(t₁,…,tₙ) 是 n 元形式。',
      '个体词：变元 x、y、z 与常元 a、b、c 都是项；项只出现在谓词的自变量位置或量词配置中。',
      '若 A 是公式，则 ¬A 是公式。',
      '若 A、B 是公式，则 (A∨B)、(A∧B)、(A→B)、(A↔B) 是公式；∧、→、↔ 按 D1–D3 定义展开。',
      '若 A 是公式，x 是变元，则 ∀x A 与 ∃x A 是公式；量词只约束其作用域内自由出现的 x。',
      '作用域：∀x、∃x 后面的最短公式是它的身体；要延长身体就用括号。',
      '约束变元改名（α-等价）不改变公式：∀x F(x) 与 ∀y F(y) 在判定时视为同一公式。',
      '同一变元可以在一处自由、在另一处被约束；例化与推广必须避免把自由变元“吸进”内层量词。',
      '本层不引入类型论层级：PM 的 ramified types 不在游戏里建模，量词按一阶方式解释。'
    ],

    /* 谓词层的原始材料。定义与原始命题分开注明；code 是 PM 编号。 */
    axioms: [
      {
        id: 'PA1',
        code: '*10.1',
        name: '全称例化',
        schema: '(∀x F(x))→F(y)',
        note:
          'PM *10.1 原始命题（Pp）：⊢ ∀x A ⊃ A′，其中 A′ 是以项 y 代 x 的 A。' +
          '这是谓词层的起点，不是档案定理。游戏同时提供 ∀E 规则模块；PA1 是它的公式形式。'
      },
      {
        id: 'PA2',
        code: '*10.2',
        name: '全称分配',
        schema: '(∀x (F(x)→G(x)))→((∀x F(x))→(∀x G(x)))',
        note: '全称量词对蕴涵的分配图式。'
      },
      {
        id: 'PA3',
        code: '*10.3',
        name: '存在引入',
        schema: 'F(y)→∃x F(x)',
        note: '由一个个例 F(y) 引入存在式 ∃x F(x)。'
      },
      {
        id: 'PA4',
        code: '*10.4',
        name: '存在分配',
        schema: '(∀x (F(x)→G(x)))→((∃x F(x))→(∃x G(x)))',
        note: '全称蕴涵在存在量词上的分配。'
      },
      {
        id: 'EQ1',
        code: '*13.1',
        name: '等词自反',
        schema: 'x=x',
        note: '等词的第一条基本图式：每个个体与自身相同。'
      },
      {
        id: 'EQ2',
        code: '*13.2',
        name: '等词对称',
        schema: 'x=y→y=x',
        note: '从 x 等于 y 推出 y 等于 x。'
      },
      {
        id: 'EQ3',
        code: '*13.3',
        name: '等词传递',
        schema: '(x=y∧y=z)→x=z',
        note: '等词可以沿三段式传递。'
      },
      {
        id: 'EQ4',
        code: '*13.4',
        name: '等词替换',
        schema: 'x=y→(F(x)→F(y))',
        note: '同一个体用等词替换后，谓词真值不变；这是莱布尼茨同一律的函项形式。'
      },
      {
        id: 'EQ5',
        code: '*13.5',
        name: '等词反向替换',
        schema: 'x=y→(F(y)→F(x))',
        note: '等词替换的对称方向。'
      },
      {
        id: 'DfE',
        code: '*10.01',
        name: '存在量词定义',
        schema: '(∃x F(x))↔(¬∀x ¬F(x))',
        note:
          'PM *10.01：∃x A .= ¬(x).¬A Df。这是定义（Df），不是定理。' +
          '游戏把 ∃ 作为原生 AST 节点，因此用这块“定义公理”模块把 PM 的定义关系显式桥接出来。'
      },
      {
        id: 'DfNotAll',
        code: '*9.01',
        name: '全称否定的定义',
        schema: '(¬∀x F(x))↔(∃x ¬F(x))',
        note:
          'PM *9.01：∼{(x).φx} .= (∃x).∼φx Df。它说明“并非所有”就是“存在反例”；' +
          '作用域按 PM 的约定读作 ¬(∀x F(x))。'
      },
      {
        id: 'DfNotExists',
        code: '*9.02',
        name: '存在否定的定义',
        schema: '(¬∃x F(x))↔(∀x ¬F(x))',
        note:
          'PM *9.02：∼{(∃x).φx} .= (x).∼φx Df。它说明“不存在”就是“所有都不”；' +
          '与 DfE、DfNotAll 一起构成 ∃/∀ 的定义桥。'
      }
    ],

    /* 档案结果：PM *10 已证成的量词包含定理。游戏里作为可引用的封装电路。 */
    theorems: [
      {
        code: '*10.12',
        name: '量词包含 · 析取',
        formula: '(∀x (P∨F(x)))→(P∨(∀x F(x)))',
        note:
          'PM *10 的导出定理，按 SEP 的现代化转写引用；P 中 x 不自由（这里 P 是 0 元原子）。' +
          '它不是原始命题，也不是本游戏重证的结果。'
      },
      {
        code: '*10.21',
        name: '量词包含 · 前件',
        formula: '(∀x (P→F(x)))↔(P→(∀x F(x)))',
        note:
          'PM *10 的导出定理，按 SEP 的现代化转写引用；前提 P 中 x 不自由。'
      },
      {
        code: '*10.23',
        name: '量词包含 · 存在前件',
        formula: '(∀x (F(x)→P))↔((∃x F(x))→P)',
        note:
          'PM *10 的导出定理，按 SEP 的现代化转写引用；结论 P 中 x 不自由。' +
          '∃E 规则可从它导出。'
      }
    ],

    /* 推理规则。schema 用现代记法；side condition 写在 note 里。 */
    rules: [
      {
        id: 'all-elim',
        name: '全称例化',
        arity: 1,
        schema: '∀x A ⊢ A[t/x]',
        note:
          'PM *10.1。t 必须对 x 可代入：替换要避免被 A 内部同名约束变元捕获；' +
          '引擎用 capture-avoiding substituteVar 完成。'
      },
      {
        id: 'all-intro',
        name: '全称推广',
        arity: 1,
        schema: 'A ⊢ ∀x A',
        note:
          'PM *10.11：若 ⊢A，则 ⊢∀x A′（A′ 以项 y 代 x）。side condition：被推广的变元' +
          '不得在未消去的前提中自由出现。本游戏没有“前提/假设”模块，因此该条件在现有关卡里' +
          '自动满足；引擎仍应检查 x 是变元且在被推广式中自由出现。'
      },
      {
        id: 'exists-intro',
        name: '存在引入',
        arity: 1,
        schema: 'A[t/x] ⊢ ∃x A',
        note:
          '由 *10.01（∃ := ¬∀¬）与 *10.1 及命题演算导出，不是 PM 的原始规则。' +
          '本游戏把它封装成模块，便于布线；side condition：x 不在 A[t/x] 中自由（或替换时改名）。'
      },
      {
        id: 'exists-elim',
        name: '存在消去',
        arity: 2,
        schema: '∃x A, A[y/x]→B ⊢ B',
        note:
          '由 *10.23（∀x(A→B) ↔ (∃x A→B)）与分离导出。side condition：y 是新变元，' +
          '不得在 ∃x A、B 或未消去的前提中自由出现；至少必须保证 y 不在 B 中自由。'
      }
    ],

    /* 模块合约：供 Lead 的 engine 实现/核对。字段与 src/engine.js 的 MODULES 对齐。 */
    modules: [
      {
        id: 'pred',
        label: '谓词原子',
        kind: 'source',
        ports: { inputs: [], outputs: [{ id: 'out', type: 'formula' }] },
        config: { name: 'F', arg: 'x' },
        note:
          '输出 {k:"pred", name, args:[{k:"var",name:arg}]}；arg 缺省 x。当前引擎只支持一元谓词，' +
          'n 元扩展保留为 config.args。'
      },
      {
        id: 'term',
        label: '个体词',
        kind: 'source',
        ports: { inputs: [], outputs: [{ id: 'out', type: 'term' }] },
        config: { name: 'x' },
        note:
          '输出 {k:"var", name}。变元用 x/y/z，常元用 a/b/c；在 RSL.Logic 的 AST 中两者都落为 ' +
          'var 节点，由命名约定区分。当前引擎的 pred 只吃 config.arg，term 输出尚未接入 pred 的 ' +
          '自变量端口；接上端口前它主要是教学/未来扩展模块。'
      },
      {
        id: 'quant',
        label: '量词门',
        kind: 'constructor',
        ports: { inputs: [{ id: 'a', type: 'formula' }], outputs: [{ id: 'out', type: 'formula' }] },
        config: { kind: 'all', v: 'x' },
        note:
          '输出 {k:"all"|"exists", v, a}。kind="exists" 时按 *10.01 的定义读作 ¬∀x¬；' +
          '它是公式构造器，不是推理规则。'
      },
      {
        id: 'all-elim',
        label: '全称例化',
        kind: 'rule',
        ports: { inputs: [{ id: 'assertion', type: 'assertion' }], outputs: [{ id: 'out', type: 'assertion' }] },
        config: { term: 'y' },
        note:
          '输入必须是 all 节点；输出 substituteVar(A, x, {k:"var",name:cfg.term})。' +
          'PM *10.1；capture-avoiding。'
      },
      {
        id: 'all-intro',
        label: '全称推广',
        kind: 'rule',
        ports: { inputs: [{ id: 'assertion', type: 'assertion' }], outputs: [{ id: 'out', type: 'assertion' }] },
        config: { v: 'x' },
        note:
          '输出 {k:"all", v, a:input}。PM *10.11。side condition：v 是变元、v 在输入中自由，' +
          '且 v 不在任何未消去前提中自由（现有关卡无前提，自动满足）。'
      },
      {
        id: 'exists-intro',
        label: '存在引入',
        kind: 'rule',
        ports: { inputs: [{ id: 'assertion', type: 'assertion' }], outputs: [{ id: 'out', type: 'assertion' }] },
        config: { v: 'x' },
        note:
          '输出 {k:"exists", v, a:input}。标准形式是 A[t/x] ⊢ ∃x A；当前引擎只做“绑定 v”，' +
          '因此现有关卡都取 t = v（输入 F(x)，v=x）。若要支持 F(a)⊢∃x F(x)，需增加 from 配置并做替换。'
      },
      {
        id: 'exists-elim',
        label: '存在消去',
        kind: 'rule',
        ports: {
          inputs: [{ id: 'exists', type: 'assertion' }, { id: 'implication', type: 'assertion' }],
          outputs: [{ id: 'out', type: 'assertion' }]
        },
        config: { y: 'y' },
        note:
          '输入 ∃x A 与 A[y/x]→B（第二路须是 imp 节点）；输出 B。' +
          'side condition：y 不在 B 中自由（引擎已查），理论上也不得在 ∃x A 或前提中自由。' +
          '对应 *10.23 + 分离。'
      },
      {
        id: 'pred-axiom',
        label: '谓词公理 / 定义',
        kind: 'axiom',
        ports: { inputs: [], outputs: [{ id: 'out', type: 'assertion' }] },
        config: { axiomId: 'DfE' },
        note:
          '按 axiomId 在 RSL.PREDICATE.axioms 中取 schema，L.parse 后输出。' +
          '一个模块实例对应一条公理/定义；不要把 Df 模块标成“定理”。'
      }
    ],

    levels: [
      {
        id: "PC-01", code: "PC-01", title: "\u5168\u79f0\u4f8b\u5316 \u00b7 \u5e38\u5143",
        kicker: "\u2200E / PA1",
        target: "(\u2200x F(x))\u2192F(a)",
        brief: '', hint: '', teaches: [], reward: '—', note: '',
        allowed: ["pred-axiom:PA1", "all-intro", "all-elim", "target"],
        targetPos: { x: 1180, y: 300 },
        solution: { nodes: [
            node("ax", "pred-axiom", 80, 340, {axiomId: "PA1"}),
            node("qi", "all-intro", 560, 300, {v: "y"}),
            node("qe", "all-elim", 880, 300, {term: "a"})
        ], edges: [
            edge("ax", "out", "qi", "assertion"),
            edge("qi", "out", "qe", "assertion"),
            edge("qe", "out", "target", "proof")
        ] }
      },
      {
        id: "PC-02", code: "PC-02", title: "\u5b58\u5728\u5f15\u5165 \u00b7 \u5e38\u5143",
        kicker: "\u2203I / PA3",
        target: "F(a)\u2192\u2203x F(x)",
        brief: '', hint: '', teaches: [], reward: '—', note: '',
        allowed: ["pred-axiom:PA3", "all-intro", "all-elim", "target"],
        targetPos: { x: 1180, y: 300 },
        solution: { nodes: [
            node("ax", "pred-axiom", 80, 340, {axiomId: "PA3"}),
            node("qi", "all-intro", 560, 300, {v: "y"}),
            node("qe", "all-elim", 880, 300, {term: "a"})
        ], edges: [
            edge("ax", "out", "qi", "assertion"),
            edge("qi", "out", "qe", "assertion"),
            edge("qe", "out", "target", "proof")
        ] }
      },
      {
        id: "PC-03", code: "PC-03", title: "\u5168\u79f0\u5230\u5b58\u5728",
        kicker: "\u2200E + \u2203I + HS",
        target: "(\u2200x F(x))\u2192\u2203x F(x)",
        brief: '', hint: '', teaches: [], reward: '—', note: '',
        allowed: ["pred-axiom:PA1", "pred-axiom:PA3", "all-intro", "all-elim", "syllogism", "target"],
        targetPos: { x: 1580, y: 300 },
        solution: { nodes: [
            node("a1", "pred-axiom", 80, 180, {axiomId: "PA1"}),
            node("i1", "all-intro", 420, 160, {v: "y"}),
            node("e1", "all-elim", 740, 160, {term: "a"}),
            node("a3", "pred-axiom", 80, 520, {axiomId: "PA3"}),
            node("i3", "all-intro", 420, 500, {v: "y"}),
            node("e3", "all-elim", 740, 500, {term: "a"}),
            node("hs", "syllogism", 1120, 330, {})
        ], edges: [
            edge("a1", "out", "i1", "assertion"),
            edge("i1", "out", "e1", "assertion"),
            edge("a3", "out", "i3", "assertion"),
            edge("i3", "out", "e3", "assertion"),
            edge("e1", "out", "hs", "a"),
            edge("e3", "out", "hs", "b"),
            edge("hs", "out", "target", "proof")
        ] }
      },
      {
        id: "PC-04", code: "PC-04", title: "\u95ed\u5305\u5168\u79f0\u4f8b\u5316",
        kicker: "\u2200I / PA1",
        target: "\u2200y((\u2200x F(x))\u2192F(y))",
        brief: '', hint: '', teaches: [], reward: '—', note: '',
        allowed: ["pred-axiom:PA1", "all-intro", "target"],
        targetPos: { x: 980, y: 300 },
        solution: { nodes: [
            node("ax", "pred-axiom", 80, 340, {axiomId: "PA1"}),
            node("qi", "all-intro", 600, 300, {v: "y"})
        ], edges: [
            edge("ax", "out", "qi", "assertion"),
            edge("qi", "out", "target", "proof")
        ] }
      },
      {
        id: "PC-05", code: "PC-05", title: "\u95ed\u5305\u5b58\u5728\u5f15\u5165",
        kicker: "\u2200I / PA3",
        target: "\u2200y(F(y)\u2192\u2203x F(x))",
        brief: '', hint: '', teaches: [], reward: '—', note: '',
        allowed: ["pred-axiom:PA3", "all-intro", "target"],
        targetPos: { x: 980, y: 300 },
        solution: { nodes: [
            node("ax", "pred-axiom", 80, 340, {axiomId: "PA3"}),
            node("qi", "all-intro", 600, 300, {v: "y"})
        ], edges: [
            edge("ax", "out", "qi", "assertion"),
            edge("qi", "out", "target", "proof")
        ] }
      },
      {
        id: "PC-06", code: "PC-06", title: "\u5168\u79f0\u5206\u914d",
        kicker: "AX / PA2",
        target: "(\u2200x (F(x)\u2192G(x)))\u2192((\u2200x F(x))\u2192(\u2200x G(x)))",
        brief: '', hint: '', teaches: [], reward: '—', note: '',
        allowed: ["pred-axiom:PA2", "target"],
        targetPos: { x: 900, y: 300 },
        solution: { nodes: [
            node("ax", "pred-axiom", 260, 280, {axiomId: "PA2"})
        ], edges: [
            edge("ax", "out", "target", "proof")
        ] }
      },
      {
        id: "PC-07", code: "PC-07", title: "\u5b58\u5728\u5206\u914d",
        kicker: "AX / PA4",
        target: "(\u2200x (F(x)\u2192G(x)))\u2192((\u2203x F(x))\u2192(\u2203x G(x)))",
        brief: '', hint: '', teaches: [], reward: '—', note: '',
        allowed: ["pred-axiom:PA4", "target"],
        targetPos: { x: 900, y: 300 },
        solution: { nodes: [
            node("ax", "pred-axiom", 260, 280, {axiomId: "PA4"})
        ], edges: [
            edge("ax", "out", "target", "proof")
        ] }
      },
      {
        id: "PC-08", code: "PC-08", title: "\u5b58\u5728\u91cf\u8bcd\u5b9a\u4e49",
        kicker: "Df / *10.01",
        target: "(\u2203x F(x))\u2194(\u00ac\u2200x \u00acF(x))",
        brief: '', hint: '', teaches: [], reward: '—', note: '',
        allowed: ["pred-axiom:DfE", "target"],
        targetPos: { x: 900, y: 300 },
        solution: { nodes: [
            node("ax", "pred-axiom", 260, 280, {axiomId: "DfE"})
        ], edges: [
            edge("ax", "out", "target", "proof")
        ] }
      },
      {
        id: "PC-09", code: "PC-09", title: "\u5168\u79f0\u5426\u5b9a\u5b9a\u4e49",
        kicker: "Df / *9.01",
        target: "(\u00ac\u2200x F(x))\u2194(\u2203x \u00acF(x))",
        brief: '', hint: '', teaches: [], reward: '—', note: '',
        allowed: ["pred-axiom:DfNotAll", "target"],
        targetPos: { x: 900, y: 300 },
        solution: { nodes: [
            node("ax", "pred-axiom", 260, 280, {axiomId: "DfNotAll"})
        ], edges: [
            edge("ax", "out", "target", "proof")
        ] }
      },
      {
        id: "PC-10", code: "PC-10", title: "\u5b58\u5728\u5426\u5b9a\u5b9a\u4e49",
        kicker: "Df / *9.02",
        target: "(\u00ac\u2203x F(x))\u2194(\u2200x \u00acF(x))",
        brief: '', hint: '', teaches: [], reward: '—', note: '',
        allowed: ["pred-axiom:DfNotExists", "target"],
        targetPos: { x: 900, y: 300 },
        solution: { nodes: [
            node("ax", "pred-axiom", 260, 280, {axiomId: "DfNotExists"})
        ], edges: [
            edge("ax", "out", "target", "proof")
        ] }
      },
      {
        id: "PC-11", code: "PC-11", title: "\u5168\u79f0\u4f8b\u5316 \u00b7 \u53d8\u5143",
        kicker: "\u2200E / PA1",
        target: "(\u2200x F(x))\u2192F(x)",
        brief: '', hint: '', teaches: [], reward: '—', note: '',
        allowed: ["pred-axiom:PA1", "all-intro", "all-elim", "target"],
        targetPos: { x: 1180, y: 300 },
        solution: { nodes: [
            node("ax", "pred-axiom", 80, 340, {axiomId: "PA1"}),
            node("qi", "all-intro", 560, 300, {v: "y"}),
            node("qe", "all-elim", 880, 300, {term: "x"})
        ], edges: [
            edge("ax", "out", "qi", "assertion"),
            edge("qi", "out", "qe", "assertion"),
            edge("qe", "out", "target", "proof")
        ] }
      }
    ]
  };


  /* Curated predicate extensions. Every circuit uses assertion ports only. */
  PREDICATE.levels.push(
    {
      id: 'PC-12', code: 'PC-12', title: '全称例化 · 变元版', kicker: '∀E / PA1',
      target: 'F(x)→∃x F(x)', allowed: ['pred-axiom:PA3', 'all-intro', 'all-elim', 'target'],
      targetPos: { x: 1180, y: 300 },
      solution: { nodes: [node('ax', 'pred-axiom', 80, 340, { axiomId: 'PA3' }), node('qi', 'all-intro', 560, 300, { v: 'y' }), node('qe', 'all-elim', 880, 300, { term: 'x' })],
        edges: [edge('ax', 'out', 'qi', 'assertion'), edge('qi', 'out', 'qe', 'assertion'), edge('qe', 'out', 'target', 'proof')] }
    },
    {
      id: 'PC-13', code: 'PC-13', title: '全称例化 · b', kicker: '∀E / PA1',
      target: '(∀x F(x))→F(b)', allowed: ['pred-axiom:PA1', 'all-intro', 'all-elim', 'target'],
      targetPos: { x: 1180, y: 300 },
      solution: { nodes: [node('ax', 'pred-axiom', 80, 340, { axiomId: 'PA1' }), node('qi', 'all-intro', 560, 300, { v: 'y' }), node('qe', 'all-elim', 880, 300, { term: 'b' })],
        edges: [edge('ax', 'out', 'qi', 'assertion'), edge('qi', 'out', 'qe', 'assertion'), edge('qe', 'out', 'target', 'proof')] }
    },
    {
      id: 'PC-14', code: 'PC-14', title: '存在引入 · b', kicker: '∃I / PA3',
      target: 'F(b)→∃x F(x)', allowed: ['pred-axiom:PA3', 'all-intro', 'all-elim', 'target'],
      targetPos: { x: 1180, y: 300 },
      solution: { nodes: [node('ax', 'pred-axiom', 80, 340, { axiomId: 'PA3' }), node('qi', 'all-intro', 560, 300, { v: 'y' }), node('qe', 'all-elim', 880, 300, { term: 'b' })],
        edges: [edge('ax', 'out', 'qi', 'assertion'), edge('qi', 'out', 'qe', 'assertion'), edge('qe', 'out', 'target', 'proof')] }
    },
    {
      id: 'PC-15', code: 'PC-15', title: '全称例化 · c', kicker: '∀E / PA1',
      target: '(∀x F(x))→F(c)', allowed: ['pred-axiom:PA1', 'all-intro', 'all-elim', 'target'],
      targetPos: { x: 1180, y: 300 },
      solution: { nodes: [node('ax', 'pred-axiom', 80, 340, { axiomId: 'PA1' }), node('qi', 'all-intro', 560, 300, { v: 'y' }), node('qe', 'all-elim', 880, 300, { term: 'c' })],
        edges: [edge('ax', 'out', 'qi', 'assertion'), edge('qi', 'out', 'qe', 'assertion'), edge('qe', 'out', 'target', 'proof')] }
    },
    {
      id: 'PC-16', code: 'PC-16', title: '存在引入 · c', kicker: '∃I / PA3',
      target: 'F(c)→∃x F(x)', allowed: ['pred-axiom:PA3', 'all-intro', 'all-elim', 'target'],
      targetPos: { x: 1180, y: 300 },
      solution: { nodes: [node('ax', 'pred-axiom', 80, 340, { axiomId: 'PA3' }), node('qi', 'all-intro', 560, 300, { v: 'y' }), node('qe', 'all-elim', 880, 300, { term: 'c' })],
        edges: [edge('ax', 'out', 'qi', 'assertion'), edge('qi', 'out', 'qe', 'assertion'), edge('qe', 'out', 'target', 'proof')] }
    },
    {
      id: 'PC-17', code: 'PC-17', title: '全称例化 · 基本式', kicker: 'AX / PA1',
      target: '(∀x F(x))→F(y)', allowed: ['pred-axiom:PA1', 'target'],
      targetPos: { x: 900, y: 300 },
      solution: { nodes: [node('ax', 'pred-axiom', 260, 280, { axiomId: 'PA1' })], edges: [edge('ax', 'out', 'target', 'proof')] }
    },
    {
      id: 'PC-18', code: 'PC-18', title: '量词包含 · 析取', kicker: 'PM *10.12',
      target: '(∀x (P∨F(x)))→(P∨(∀x F(x)))', allowed: ['theorem:*10.12', 'target'],
      targetPos: { x: 900, y: 300 },
      solution: { nodes: [node('th', 'theorem', 260, 280, { theoremCode: '*10.12' })], edges: [edge('th', 'out', 'target', 'proof')] }
    },
    {
      id: 'PC-19', code: 'PC-19', title: '量词包含 · 前件', kicker: 'PM *10.21',
      target: '(∀x (P→F(x)))↔(P→(∀x F(x)))', allowed: ['theorem:*10.21', 'target'],
      targetPos: { x: 900, y: 300 },
      solution: { nodes: [node('th', 'theorem', 260, 280, { theoremCode: '*10.21' })], edges: [edge('th', 'out', 'target', 'proof')] }
    },
    {
      id: 'PC-20', code: 'PC-20', title: '量词包含 · 存在', kicker: 'PM *10.23',
      target: '(∀x (F(x)→P))↔((∃x F(x))→P)', allowed: ['theorem:*10.23', 'target'],
      targetPos: { x: 900, y: 300 },
      solution: { nodes: [node('th', 'theorem', 260, 280, { theoremCode: '*10.23' })], edges: [edge('th', 'out', 'target', 'proof')] }
    }
  );

  /* 关卡默认值。index / order 由 app.levels() 统一编号，这里不硬编码。 */
  PREDICATE.levels.forEach(function (lv) {
    lv.chapter = 'predicate';
    lv.code = lv.code || lv.id;
    lv.allowed = lv.allowed || [];
    lv.teaches = lv.teaches || [];
    lv.target = String(lv.target).trim();
    lv.targetPos = lv.targetPos || { x: TARGET_X, y: TARGET_Y };
    lv.world = lv.world || { w: 2000, h: 1000 };
  });

  window.RSL.PREDICATE = PREDICATE;
})();

