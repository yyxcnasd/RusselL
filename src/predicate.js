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
        id: 'PC-01',
        chapter: 'predicate',
        code: 'PC-01',
        title: '例化',
        kicker: 'UNIVERSAL INSTANTIATION / *10·1',
        target: '(∀x F(x))→F(x)',
        brief:
          '“对所有 x 成立”是一整排焊点。取其中任意一枚，就得到 F(x)。' +
          '先用谓词原子和量词门造出全称式，再让例化模块从它取出一枚。',
        hint:
          'F(x) 经量词门（∀x）得到 ∀x F(x)。这条断言可以同时扇出两路：一路过否定门，' +
          '一路进 ∀E（term 设为 x）。把 ¬∀xF(x) 与 F(x) 接进析取门，按 D1 就是目标蕴涵。',
        teaches: ['全称例化 ∀E', '量词门', '断言扇出'],
        allowed: ['pred', 'quant', 'not', 'or', 'all-elim', 'target'],
        reward: '模块 · ∃I',
        note:
          'PM *10.1 原始命题：⊢ ∀x A ⊃ A′（A′ 以项 y 代 x）。本关用 ∀E 规则模块复现它；' +
          '公式形式的 PA1 可在公理分类里找到。',
        targetPos: { x: 1080, y: 300 },
        solution: {
          nodes: [
            node('p1', 'pred', 80, 120, { name: 'F', arg: 'x' }),
            node('q1', 'quant', 360, 120, { kind: 'all', v: 'x' }),
            node('n1', 'not', 640, 80),
            node('e1', 'all-elim', 640, 360, { term: 'x' }),
            node('o1', 'or', 400, 560)
          ],
          edges: [
            edge('p1', 'out', 'q1', 'a'),
            edge('q1', 'out', 'n1', 'a'),
            edge('q1', 'out', 'e1', 'assertion'),
            edge('n1', 'out', 'o1', 'a'),
            edge('e1', 'out', 'o1', 'b'),
            edge('o1', 'out', 'target', 'proof')
          ]
        }
      },
      {
        id: 'PC-02',
        chapter: 'predicate',
        code: 'PC-02',
        title: '存在引入',
        kicker: 'EXISTENTIAL INTRODUCTION / ∃I',
        target: 'F(x)→∃x F(x)',
        brief:
          '只要有一个个体使 F 成立，就能说“存在 x 使 F(x)”。这一关把“例证”折成“存在”。',
        hint:
          '谓词原子 F(x) 扇出两路：一路进 ∃I（v 设为 x），得到 ∃x F(x)；一路过否定门得到 ¬F(x)。' +
          '两路接进析取门，就是 F(x)→∃xF(x)。',
        teaches: ['存在引入 ∃I', '例证与存在', '按 D1 合成蕴涵'],
        allowed: ['pred', 'not', 'or', 'exists-intro', 'target'],
        reward: '模块 · ∀I',
        note:
          '∃ 在 PM 中是定义（*10.01），所以 ∃I 可由 *10.1 与命题演算导出，而不是新的原始规则；' +
          '本游戏为布线方便把它封成模块。',
        targetPos: { x: 1080, y: 300 },
        solution: {
          nodes: [
            node('p1', 'pred', 80, 140, { name: 'F', arg: 'x' }),
            node('ex', 'exists-intro', 360, 80, { v: 'x' }),
            node('n1', 'not', 360, 340),
            node('o1', 'or', 650, 540)
          ],
          edges: [
            edge('p1', 'out', 'ex', 'assertion'),
            edge('p1', 'out', 'n1', 'a'),
            edge('n1', 'out', 'o1', 'a'),
            edge('ex', 'out', 'o1', 'b'),
            edge('o1', 'out', 'target', 'proof')
          ]
        }
      },
      {
        id: 'PC-03',
        chapter: 'predicate',
        code: 'PC-03',
        title: '推广',
        kicker: 'UNIVERSAL GENERALIZATION / *10·11',
        target: '(∀x F(x))→(∀y F(y))',
        brief:
          '约束变元只是丝印。∀x F(x) 与 ∀y F(y) 说的是同一件事；先例化到 y，再在 y 上推广，' +
          '就能看清这道工序。',
        hint:
          '造出 ∀x F(x)。用 ∀E 把 term 设为 y，得到 F(y)；再用 ∀I（v 设为 y）收回成 ∀y F(y)。' +
          '最后把 ¬∀xF(x) 与 ∀yF(y) 接进析取门。',
        teaches: ['全称推广 ∀I', 'α-改名', '例化—推广回路'],
        allowed: ['pred', 'quant', 'not', 'or', 'all-elim', 'all-intro', 'target'],
        reward: '电路板 · 分配',
        note:
          'PM *10.11：若 ⊢A，则 ⊢∀x A′（A′ 以项 y 代 x）。游戏没有未消去的前提模块，' +
          '“y 不在前提中自由”自动满足；引擎仍应检查 v 是变元且在被推广式中自由出现。',
        targetPos: { x: 1360, y: 420 },
        solution: {
          nodes: [
            node('p1', 'pred', 80, 100, { name: 'F', arg: 'x' }),
            node('qa', 'quant', 360, 100, { kind: 'all', v: 'x' }),
            node('e1', 'all-elim', 640, 100, { term: 'y' }),
            node('gi', 'all-intro', 920, 100, { v: 'y' }),
            node('n1', 'not', 360, 360),
            node('o1', 'or', 600, 700)
          ],
          edges: [
            edge('p1', 'out', 'qa', 'a'),
            edge('qa', 'out', 'e1', 'assertion'),
            edge('e1', 'out', 'gi', 'assertion'),
            edge('qa', 'out', 'n1', 'a'),
            edge('n1', 'out', 'o1', 'a'),
            edge('gi', 'out', 'o1', 'b'),
            edge('o1', 'out', 'target', 'proof')
          ]
        }
      },
      {
        id: 'PC-04',
        chapter: 'predicate',
        code: 'PC-04',
        title: '分配',
        kicker: 'UNIVERSAL DISTRIBUTION / *10',
        target: '(∀x (F(x)→G(x)))→((∀x F(x))→(∀x G(x)))',
        brief:
          '“所有 F 都是 G”与“所有东西都是 F”，应当推出“所有东西都是 G”。' +
          '这一关要真正走一遍例化—分离—推广。',
        hint:
          '先合成两个前件：∀x(F(x)→G(x)) 与 ∀x F(x)。把两者都用 ∀E 例化到新变元 y，' +
          '分离得 G(y)，再用 ∀I（v 设为 y）收回 ∀yG(y)。最后用两层蕴涵门把 ∀x(F→G)、' +
          '∀xF(x)、∀yG(y) 串成目标。',
        teaches: ['∀E + 分离 + ∀I', '新变元 y 的使用', '多层蕴涵'],
        allowed: ['pred', 'imp', 'quant', 'all-elim', 'all-intro', 'detach', 'target'],
        reward: '定义桥 · *10.01',
        note:
          '分配律在 PM *10 中作为量词包含定理导出，不是本游戏的原始公理；PM 中具体编号参' +
          '《数学原理》相应章节（SEP 的现代化转写列出 *10.12、*10.21、*10.23，可对照阅读）。' +
          '本关电路复现的是 *10.1 与 *10.11 的配合。',
        targetPos: { x: 2180, y: 420 },
        world: { w: 2600, h: 1000 },
        solution: {
          nodes: [
            node('pF1', 'pred', 40, 80, { name: 'F', arg: 'x' }),
            node('pG1', 'pred', 40, 260, { name: 'G', arg: 'x' }),
            node('imp1', 'imp', 330, 170),
            node('qA1', 'quant', 620, 80, { kind: 'all', v: 'x' }),
            node('pF2', 'pred', 40, 520, { name: 'F', arg: 'x' }),
            node('qA2', 'quant', 330, 520, { kind: 'all', v: 'x' }),
            node('e1', 'all-elim', 1180, 80, { term: 'y' }),
            node('e2', 'all-elim', 1180, 480, { term: 'y' }),
            node('d1', 'detach', 1450, 260),
            node('gi', 'all-intro', 1450, 520, { v: 'y' }),
            node('inner', 'imp', 1720, 620),
            node('outer', 'imp', 1720, 260)
          ],
          edges: [
            edge('pF1', 'out', 'imp1', 'a'),
            edge('pG1', 'out', 'imp1', 'b'),
            edge('imp1', 'out', 'qA1', 'a'),
            edge('qA1', 'out', 'e1', 'assertion'),
            edge('pF2', 'out', 'qA2', 'a'),
            edge('qA2', 'out', 'e2', 'assertion'),
            edge('qA2', 'out', 'inner', 'a'),
            edge('e1', 'out', 'd1', 'a'),
            edge('e2', 'out', 'd1', 'b'),
            edge('d1', 'out', 'gi', 'assertion'),
            edge('gi', 'out', 'inner', 'b'),
            edge('qA1', 'out', 'outer', 'a'),
            edge('inner', 'out', 'outer', 'b'),
            edge('outer', 'out', 'target', 'proof')
          ]
        }
      },
      {
        id: 'PC-05',
        chapter: 'predicate',
        code: 'PC-05',
        title: '定义桥',
        kicker: 'DEFINITION OF ∃ / *10·01',
        target: '(∃x F(x))↔(¬∀x ¬F(x))',
        brief:
          '在《数学原理》里，“存在”不是新的原始概念：∃x F(x) 就是“并非所有 x 都不 F”。' +
          '这块板只焊一条定义桥。',
        hint:
          '从谓词公理里取“存在量词定义”（*10.01），它的输出正是目标等值式，直接接到目标焊盘。',
        teaches: ['∃ 的定义（Df）', '定义与定理的区别'],
        allowed: ['pred-axiom:DfE', 'target'],
        reward: '谓词层贯通',
        note:
          '*10.01 是定义（Df），不是从 *10.1 证出的定理。游戏把 ∃ 作为原生 AST，' +
          '因此用“定义公理”模块把 PM 的定义关系显式化；它不应被标成档案定理。',
        targetPos: { x: 900, y: 300 },
        solution: {
          nodes: [
            node('ax', 'pred-axiom', 260, 280, { axiomId: 'DfE' })
          ],
          edges: [
            edge('ax', 'out', 'target', 'proof')
          ]
        }
      }
    ]
  };

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

