'use strict';
/* 引理关参考解构造器（产品脚本，运行时 `node scripts/build-lemmas.js`）。
 *
 * 目标（docs/LOGIC-REDESIGN.md §3）：把 ∧/∨/↔ 的 9 条派生规则做成「真实证明出来的
 * 引理关」，不再有派生连接词公理模块。
 *
 * 构造方式全部是「已验证电路 + 公理实例」的机械组合，不发明结论：
 *   1. campaign/legacy-levels.json 第Ⅰ章 *01–*24 是早先用真实 Engine 验证过的原始
 *      希尔伯特证明电路；把其中的 theorem 引用递归展平后，只剩 axiom/subst/mp/构造。
 *   2. 用 axiom(A1/A2/A3) + subst + mp 把展平后的引理组合成每条规则的原始结论。
 *      DT 风格的组合由本文件的 dt()/mpp() 负责（演绎定理的电路翻译）。
 *   3. 最后接 def-contract 折回表面语法（∧/∨/↔），输出与关卡目标逐 token 一致。
 *
 * 产物：campaign/lemma-levels.json（9 个引理关，band 'lemma'，code Ⅰ-11…Ⅰ-19）。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const { loadRuntime } = require(path.join(ROOT, 'scripts', 'lib', 'load-runtime.js'));
const RSL = loadRuntime({ files: ['src/term.js', 'src/modules.js', 'src/engine.js'] });
const T = RSL.Term;
const Engine = RSL.Engine;

const LEGACY = require(path.join(ROOT, 'campaign', 'legacy-levels.json'));
const OUT = path.join(ROOT, 'campaign', 'lemma-levels.json');

/* ---------------- token 工具 ---------------- */
const ATOM = (n) => [n];
const NOT = (a) => ['-.'].concat(a);
const IMP = (a, b) => ['('].concat(a, ['->'], b, [')']);
const body = (text) => T.body(T.parse(text));

/* ---------------- 电路构造器 ---------------- */
function graph() {
  const nodes = [];
  const edges = [];
  let seq = 0;
  let edgeSeq = 0;
  const add = (kind, config) => {
    const id = 'n' + (++seq);
    nodes.push({ id, kind, config: config || {}, x: 0, y: 0 });
    return id;
  };
  const link = (from, fromPort, to, toPort) => {
    edges.push({ id: 'e' + (++edgeSeq), from: { node: from, port: fromPort }, to: { node: to, port: toPort } });
  };
  const fcache = new Map();
  function formula(b) {
    const key = b.join('\u0000');
    if (fcache.has(key)) return fcache.get(key);
    let id;
    if (b.length === 1) {
      id = add('atom', { name: b[0] });
    } else if (b[0] === '-.') {
      id = add('not', {});
      link(formula(b.slice(1)), 'out', id, 'a');
    } else if (b[0] === '(') {
      const inner = b.slice(1, -1);
      let depth = 0, split = -1, op = null;
      for (let i = 0; i < inner.length && split < 0; i += 1) {
        const c = inner[i];
        if (c === '(') depth += 1;
        else if (c === ')') depth -= 1;
        else if (depth === 0 && (c === '->' || c === '/\\' || c === '\\/' || c === '<->')) { split = i; op = c; }
      }
      if (split < 0) throw new Error('无法构造公式：' + b.join(' '));
      const kind = { '->': 'imp', '/\\': 'and', '\\/': 'or', '<->': 'iff' }[op];
      const left = formula(inner.slice(0, split));
      const right = formula(inner.slice(split + 1));
      id = add(kind, {});
      link(left, 'out', id, 'a');
      link(right, 'out', id, 'b');
    } else if (b[0] === 'A.' || b[0] === 'E.') {
      const inner = formula(b.slice(2));
      id = add(b[0] === 'A.' ? 'all' : 'exists', { v: b[1] });
      link(inner, 'out', id, 'a');
    } else if (b.length === 3 && (b[1] === '=' || b[1] === 'e.')) {
      const t1 = term(b[0]), t2 = term(b[2]);
      if (b[1] === '=') {
        id = add('pred', { symbol: '=' });
        link(t1, 'out', id, 't1');
        link(t2, 'out', id, 't2');
      } else {
        id = add('mem', {});
        link(t1, 'out', id, 'a');
        link(t2, 'out', id, 'b');
      }
    } else {
      throw new Error('无法构造公式：' + b.join(' '));
    }
    fcache.set(key, id);
    return id;
  }
  const tcache = new Map();
  function term(name) {
    if (tcache.has(name)) return tcache.get(name);
    const id = add('term', { name });
    tcache.set(name, id);
    return id;
  }
  function subst(src, atoms) {
    const names = Object.keys(atoms || {});
    if (!names.length) return src;
    const id = add('subst', { groups: Math.max(0, names.length - 1) });
    link(src, 'out', id, 'assertion');
    names.forEach((name, i) => {
      link(add('atom', { name }), 'out', id, 'atom' + (i + 1));
      link(formula(atoms[name]), 'out', id, 'formula' + (i + 1));
    });
    return id;
  }
  const axiom = (schema, atoms) => subst(add('axiom', { schema }), atoms);
  const theorem = (code, atoms) => subst(add('theorem', { code }), atoms);
  const mp = (a, b) => {
    const id = add('mp', {});
    link(a, 'out', id, 'a');
    link(b, 'out', id, 'b');
    return id;
  };
  const rewrite = (kind, of) => {
    const id = add(kind, {});
    link(of, 'out', id, 'assertion');
    return id;
  };
  function palette() {
    const seen = new Set(), out = [];
    nodes.forEach((n) => {
      if (n.kind === 'target') return;
      const cfg = n.kind === 'subst' ? {} : (n.config || {});
      const k = n.kind + ':' + JSON.stringify(cfg);
      if (seen.has(k)) return;
      seen.add(k);
      out.push({ kind: n.kind, config: cfg });
    });
    return out;
  }
  return { nodes, edges, add, link, formula, term, subst, axiom, theorem, mp, rewrite, palette };
}

/* ---------------- legacy 电路展平 ----------------
 * 把第Ⅰ章某关（旧编号 no）的参考电路整段拷进当前图；theorem 引用递归展平，
 * 结果只含 axiom/subst/mp/构造，返回「输出断言」节点 id。
 */
function flattenLegacy(g, no, memo) {
  if (memo.has(no)) return memo.get(no);
  const lv = LEGACY.find((l) => l.no === no && l.chapterGroup === 'Ⅰ' && !l.tutorial);
  if (!lv) throw new Error('找不到 legacy 关卡 *' + no);
  const idMap = new Map();
  const solutionIds = new Set(lv.solution.nodes.map((n) => n.id));
  let outputId = null;
  lv.solution.edges.forEach((e) => {
    if (!solutionIds.has(e.to.node) && outputId == null) outputId = e.from.node;
  });
  if (!outputId) throw new Error('*' + no + ' 找不到目标焊盘的输入节点');
  lv.solution.nodes.forEach((n) => {
    if (n.kind === 'theorem') return;
    idMap.set(n.id, g.add(n.kind, JSON.parse(JSON.stringify(n.config || {}))));
  });
  lv.solution.nodes.forEach((n) => {
    if (n.kind !== 'theorem') return;
    const ref = n.config && n.config.n;
    if (ref == null) throw new Error('*' + no + ' 的 theorem 节点缺少旧编号');
    idMap.set(n.id, flattenLegacy(g, ref, memo));
  });
  lv.solution.edges.forEach((e) => {
    const from = idMap.get(e.from.node);
    const to = idMap.get(e.to.node);
    if (from == null || to == null) return;
    g.link(from, e.from.port, to, e.to.port);
  });
  memo.set(no, idMap.get(outputId));
  return idMap.get(outputId);
}

/* ---------------- 电路级演绎定理（DT） ----------------
 * 推导节点 = { f: 公式体, id: 断言节点 id 或 null, hyp?: true, op?: 'mp', a, b }
 * mpNode(imp, ant) 构造一次分离；dt(node, H) 返回断言 H→node.f 的推导节点
 * （结构保留，id 可为 null，供外层 DT 继续消去假设；全部消完后 id 必非空）。
 */
function consequentOf(impBody, antBody) {
  const t = T.read(['wff'].concat(impBody));
  if (t.k !== 'imp') throw new Error('不是蕴涵式：' + T.fmt(['wff'].concat(impBody)));
  const ante = T.treeToBody(t.a);
  if (!T.eq(['wff'].concat(ante), ['wff'].concat(antBody))) {
    throw new Error('前件不匹配：' + T.fmt(['wff'].concat(ante)) + ' vs ' + T.fmt(['wff'].concat(antBody)));
  }
  return T.treeToBody(t.b);
}

function makeDt(g) {
  function mpNode(imp, ant) {
    const f = consequentOf(imp.f, ant.f);
    const id = imp.id != null && ant.id != null ? g.mp(ant.id, imp.id) : null;
    return { f, id, op: 'mp', a: ant, b: imp };
  }
  function leaf(f, id) { return { f, id }; }
  function hyp(f) { return { f, hyp: true, id: null }; }
  function identityProof(A) {
    const a2 = g.axiom('A2', { P: A, Q: IMP(A, A), R: A });
    const a1a = g.axiom('A1', { P: A, Q: IMP(A, A) });
    const m1 = g.mp(a2, a1a);
    const a1b = g.axiom('A1', { P: A, Q: A });
    return g.mp(m1, a1b);
  }
  function dt(node, H) {
    if (node.hyp) {
      if (T.eq(['wff'].concat(node.f), ['wff'].concat(H))) return leaf(IMP(H, H), identityProof(H));
      const a1 = leaf(IMP(node.f, IMP(H, node.f)), g.axiom('A1', { P: node.f, Q: H }));
      return mpNode(a1, node);
    }
    if (node.op === 'mp') {
      const da = dt(node.a, H);
      const db = dt(node.b, H);
      const a2 = leaf(IMP(IMP(H, IMP(node.a.f, node.f)), IMP(IMP(H, node.a.f), IMP(H, node.f))),
        g.axiom('A2', { P: H, Q: node.a.f, R: node.f }));
      const m1 = mpNode(a2, db);
      return mpNode(m1, da);
    }
    const a1 = leaf(IMP(node.f, IMP(H, node.f)), g.axiom('A1', { P: node.f, Q: H }));
    return mpNode(a1, node);
  }
  return { dt, identityProof, leaf, hyp, mpNode, consequentOf };
}

/* ---------------- 关卡组装 ---------------- */
function makeLevel(g, opts) {
  const targetTokens = ['|-'].concat(opts.targetBody);
  const target = { id: 'nt', kind: 'target', config: {}, x: 0, y: 0, targetTokens };
  g.nodes.push(target);
  g.link(opts.outputId, 'out', 'nt', 'proof');
  const solutionNodes = g.nodes.filter((n) => n.id !== 'nt');
  return {
    id: 'LE' + opts.no,
    code: 'Ⅰ-' + String(opts.no).padStart(2, '0'),
    no: opts.no,
    tutorial: false,
    hard: false,
    band: 'lemma',
    chapter: 0,
    chapterGroup: 'Ⅰ',
    title: opts.title,
    teaches: opts.teaches,
    hint: opts.hint,
    tip: null,
    targetTokens,
    palette: g.palette(),
    initialNodes: [target],
    solution: { nodes: solutionNodes, edges: g.edges },
    difficulty: solutionNodes.length + 0.1 * (targetTokens.length / 4),
    stats: { steps: solutionNodes.length }
  };
}

function evaluate(level, ctxLevels) {
  const idx = ctxLevels.findIndex((x) => x.code === level.code);
  const nodes = JSON.parse(JSON.stringify(level.initialNodes)).concat(JSON.parse(JSON.stringify(level.solution.nodes)));
  const edges = JSON.parse(JSON.stringify(level.solution.edges));
  return Engine.evaluate(level, nodes, edges, { levels: ctxLevels, levelIndex: idx });
}

/* ---------------- 9 关 ---------------- */
const P = ATOM('P'), Q = ATOM('Q'), R = ATOM('R');

/* Ⅰ-11 P→(P∨Q)：原始结论 P→(¬P→Q)
 * *14 = ¬P→(P→Q)；*08 = (P→(Q→R))→(Q→(P→R))
 * *08 代入 (P:=¬P, Q:=P, R:=Q) 得 (¬P→(P→Q))→(P→(¬P→Q))，与 *14 分离。 */
function level11() {
  const g = graph();
  const memo = new Map();
  const efsq = g.subst(flattenLegacy(g, 14, memo), { P, Q });
  const exchange = g.subst(flattenLegacy(g, 8, memo), { P: NOT(P), Q: P, R: Q });
  const raw = g.mp(efsq, exchange);
  return makeLevel(g, {
    no: 11, outputId: g.rewrite('def-contract', raw), targetBody: body('P→(P∨Q)'),
    title: '析取引入左',
    teaches: '从 P 得到 P∨Q；P∨Q 是 ¬P→Q 的缩写。',
    hint: '接上已证的 ¬P→(P→Q) 与“前后件交换”两条原始引理得到 P→(¬P→Q)，再用 D⁻ 收缩成 P∨Q。'
  });
}

/* Ⅰ-12 Q→(P∨Q)：A1 实例（P:=Q, Q:=¬P）。 */
function level12() {
  const g = graph();
  const raw = g.axiom('A1', { P: Q, Q: NOT(P) });
  return makeLevel(g, {
    no: 12, outputId: g.rewrite('def-contract', raw), targetBody: body('Q→(P∨Q)'),
    title: '析取引入右',
    teaches: '从 Q 得到 P∨Q，是公理 A1 的直接实例。',
    hint: '取 A1，把 P 代入 Q、把 Q 代入 ¬P 得 Q→(¬P→Q)，再用 D⁻ 收缩。'
  });
}

/* Ⅰ-13 P→(Q→(P∧Q))：原始结论 P→(Q→¬(P→¬Q))，记 C = P→¬Q
 *  d1 = *03(P:=P, Q:=¬Q) : P→(C→¬Q)
 *  t  = *10(P:=C, Q:=Q) : (C→¬Q)→(Q→¬C)
 *  t2 = A1(P:=t, Q:=P) 与 t 分离 : P→t
 *  s  = A2(P:=P, Q:=C→¬Q, R:=Q→¬C) 与 t2 分离 : (P→(C→¬Q))→(P→(Q→¬C))
 *  与 d1 分离得 P→(Q→¬C)。 */
function level13() {
  const g = graph();
  const memo = new Map();
  const C = IMP(P, NOT(Q));
  const tFormula = IMP(C, NOT(Q));      /* C→¬Q */
  const goal = IMP(Q, NOT(C));          /* Q→¬C */
  const d1 = g.subst(flattenLegacy(g, 3, memo), { P, Q: NOT(Q) });   /* P→(C→¬Q) */
  const t = g.subst(flattenLegacy(g, 10, memo), { P: C, Q });        /* (C→¬Q)→(Q→¬C) */
  /* 把 t 提成 P→t（A1 实例 + 分离），再用 A2 分配，与 d1 分离 */
  const pT = g.mp(t, g.axiom('A1', { P: IMP(tFormula, goal), Q: P }));  /* P→(tFormula→goal) */
  const a2 = g.axiom('A2', { P, Q: tFormula, R: goal });            /* (P→(tFormula→goal))→((P→tFormula)→(P→goal)) */
  const s = g.mp(pT, a2);                                            /* (P→tFormula)→(P→goal) */
  const raw = g.mp(d1, s);                                           /* P→(Q→¬C) */
  return makeLevel(g, {
    no: 13, outputId: g.rewrite('def-contract', raw), targetBody: body('P→(Q→(P∧Q))'),
    title: '合取引入',
    teaches: 'P 与 Q 一起给出 P∧Q；P∧Q 是 ¬(P→¬Q) 的缩写。',
    hint: '用 *03 从 P 得 (P→¬Q)→¬Q，再用 *10 逆否成 Q→¬(P→¬Q)；中间用 A1/A2 把 P 的假设搬进去，最后 D⁻ 收缩。'
  });
}

/* Ⅰ-14 (P∧Q)→P：原始结论 ¬(P→¬Q)→P，记 C = P→¬Q
 *  efsp  = *14(P:=P, Q:=¬Q) : ¬P→C
 *  contra = *11(P:=P, Q:=C) : (¬P→C)→(¬C→P)
 *  分离得 ¬C→P。 */
function level14() {
  const g = graph();
  const memo = new Map();
  const C = IMP(P, NOT(Q));
  const efsp = g.subst(flattenLegacy(g, 14, memo), { P, Q: NOT(Q) });
  const contra = g.subst(flattenLegacy(g, 11, memo), { P, Q: C });
  const raw = g.mp(efsp, contra);
  return makeLevel(g, {
    no: 14, outputId: g.rewrite('def-contract', raw), targetBody: body('(P∧Q)→P'),
    title: '合取消去左',
    teaches: 'P∧Q 给出 P。',
    hint: '先证 ¬P→(P→¬Q)，再用换位引理 (¬P→Q)→(¬Q→P) 把 ¬(P→¬Q) 变成 P，最后 D⁻ 收缩。'
  });
}

/* Ⅰ-15 (P∧Q)→Q：原始结论 ¬(P→¬Q)→Q，正好是 legacy *23 的目标。 */
function level15() {
  const g = graph();
  const memo = new Map();
  const raw = flattenLegacy(g, 23, memo);
  return makeLevel(g, {
    no: 15, outputId: g.rewrite('def-contract', raw), targetBody: body('(P∧Q)→Q'),
    title: '合取消去右',
    teaches: 'P∧Q 给出 Q。',
    hint: '把 ¬(P→¬Q)→Q 的原始证明整段接上，再用 D⁻ 收缩。'
  });
}

/* Ⅰ-16 (P∨Q)→((P→R)→((Q→R)→R))：原始结论 (¬P→Q)→((P→R)→((Q→R)→R))
 *  A0=¬P→Q, A1=P→R, A2=Q→R；*16(P:=P, Q:=R) : (¬P→R)→(A1→R)
 *  在假设 A0/A1/A2 下：A1 提升 A2 得 ¬P→A2；A2 分配得 A0→(¬P→R)；两次 M 得 ¬P→R；
 *  再与 *16 实例、A1 分离得 R；最后 DT 三次把假设搬进结论。 */
function level16() {
  const g = graph();
  const memo = new Map();
  const A0 = IMP(NOT(P), Q);          /* 前件：¬P→Q，即 P∨Q */
  const A1f = IMP(P, R);              /* P→R */
  const A2f = IMP(Q, R);              /* Q→R */
  const S = IMP(NOT(P), R);           /* 先证出来的中间断言 ¬P→R */
  const { dt, leaf, hyp, mpNode } = makeDt(g);
  /* (P→X)→((Y→X)→(P→(Y→X))) 之类的小提升直接用 A1 实例。 */
  const lift = (formula, hypF) => leaf(IMP(formula, IMP(hypF, formula)), g.axiom('A1', { P: formula, Q: hypF }));
  /* HS：A→B 与 B→C 得 A→C（A1/A2 组合，3 次分离）。 */
  function hs(pAB, pBC) {
    const tAB = T.read(['wff'].concat(pAB.f));
    if (tAB.k !== 'imp') throw new Error('HS 左件不是蕴涵');
    const A = T.treeToBody(tAB.a);
    const bodyB = T.treeToBody(tAB.b);
    const tBC = T.read(['wff'].concat(pBC.f));
    if (tBC.k !== 'imp') throw new Error('HS 右件不是蕴涵');
    const C = T.treeToBody(tBC.b);
    if (!T.eq(['wff'].concat(T.treeToBody(tBC.a)), ['wff'].concat(bodyB))) {
      throw new Error('HS 中间命题不匹配：' + T.fmt(['wff'].concat(bodyB)) + ' vs ' + T.fmt(['wff'].concat(T.treeToBody(tBC.a))));
    }
    const bc = IMP(bodyB, C);
    const a2 = leaf(IMP(IMP(A, bc), IMP(IMP(A, bodyB), IMP(A, C))), g.axiom('A2', { P: A, Q: bodyB, R: C }));
    const a1 = leaf(IMP(bc, IMP(A, bc)), g.axiom('A1', { P: bc, Q: A }));
    const m0 = mpNode(a1, pBC);                 /* A→(B→C) */
    const m1 = mpNode(a2, m0);                  /* (A→B)→(A→C) */
    return mpNode(m1, pAB);                     /* A→C */
  }
  /* U = *16(P:=P, Q:=R) : (¬P→R)→((P→R)→R)，即分情况引理 */
  const U = leaf(IMP(S, IMP(A1f, R)), g.subst(flattenLegacy(g, 16, memo), { P, Q: R }));
  const exchange = () => flattenLegacy(g, 8, memo);   /* *08 = (P→(Q→R))→(Q→(P→R)) */
  const swap = (X, Y, Z) => g.subst(exchange(), { P: X, Q: Y, R: Z });
  /* 第一步：在假设 A2 下证 A0→S，用 A2 的 DT 与前后件交换得到 N = A0→(A2→S)。 */
  const d1 = leaf(IMP(A2f, IMP(NOT(P), A2f)), g.axiom('A1', { P: A2f, Q: NOT(P) }));
  const m1 = mpNode(d1, hyp(A2f));                                     /* ¬P→A2 */
  const d2 = leaf(IMP(IMP(NOT(P), A2f), IMP(A0, S)), g.axiom('A2', { P: NOT(P), Q, R }));
  const m2 = mpNode(d2, m1);                                           /* A0→S */
  const w = dt(m2, A2f);                                               /* A2→(A0→S) */
  const N = mpNode(leaf(IMP(IMP(A2f, IMP(A0, S)), IMP(A0, IMP(A2f, S))), swap(A2f, A0, S)), w); /* A0→(A2→S) */
  /* 第二步：假设 A0 下 A2→S，与分情况引理 HS 得 A2→(A1→R)，交换前后件后用 A0 的 DT 收尾。 */
  const u1 = mpNode(N, hyp(A0));                                       /* A2→S */
  const u2 = hs(u1, U);                                                /* A2→(A1→R) */
  const u3 = mpNode(leaf(IMP(IMP(A2f, IMP(A1f, R)), IMP(A1f, IMP(A2f, R))), swap(A2f, A1f, R)), u2); /* A1→(A2→R) */
  const raw = dt(u3, A0);                                              /* A0→(A1→(A2→R)) */
  if (raw.id == null) throw new Error('Ⅰ-16 的 DT 没能消掉全部假设');
  if (process.env.LEMMA_DEBUG) {
    const hist = {};
    g.nodes.forEach((n) => { hist[n.kind] = (hist[n.kind] || 0) + 1; });
    console.log('Ⅰ-16 node histogram', JSON.stringify(hist));
  }
  return makeLevel(g, {
    no: 16, outputId: g.rewrite('def-contract', raw.id), targetBody: body('(P∨Q)→((P→R)→((Q→R)→R))'),
    title: '析取消去',
    teaches: 'P∨Q 且两边都能走到 R，就得到 R。',
    hint: '先由 Q→R 与 ¬P→Q 得 ¬P→R（HS），再用分情况引理 (¬P→R)→((P→R)→R)；最后把假设按顺序搬进结论，D⁻ 收缩。'
  });
}

/* Ⅰ-17/Ⅰ-18/Ⅰ-19：目标按定义展开后正好是 Ⅰ-13/Ⅰ-14/Ⅰ-15 的原始结论，
 * 直接 theorem + 一组代入 + def-contract。 */
function levelByLemma(no, title, teaches, hint, targetText, lemmaCode) {
  const g = graph();
  const thm = g.theorem(lemmaCode, {});
  const sub = g.subst(thm, { P: IMP(P, Q), Q: IMP(Q, P) });
  return makeLevel(g, {
    no, outputId: g.rewrite('def-contract', sub), targetBody: body(targetText),
    title, teaches, hint
  });
}

function level17() {
  return levelByLemma(17, '等值引入', '两个方向都有蕴涵，就得到 A↔B。',
    '把合取引入 Ⅰ-13 的 P、Q 换成 (P→Q) 与 (Q→P)，再用 D⁻ 收缩成 ↔。',
    '(P→Q)→((Q→P)→(P↔Q))', 'Ⅰ-13');
}
function level18() {
  return levelByLemma(18, '等值消去左', 'A↔B 给出 A→B。',
    '把合取消去左 Ⅰ-14 的 P、Q 换成 (P→Q) 与 (Q→P)，再用 D⁻ 收缩成 ↔。',
    '(P↔Q)→(P→Q)', 'Ⅰ-14');
}
function level19() {
  return levelByLemma(19, '等值消去右', 'A↔B 给出 B→A。',
    '把合取消去右 Ⅰ-15 的 P、Q 换成 (P→Q) 与 (Q→P)，再用 D⁻ 收缩。',
    '(P↔Q)→(Q→P)', 'Ⅰ-15');
}

function main() {
  const builders = [level11, level12, level13, level14, level15, level16, level17, level18, level19];
  const levels = [];
  const errors = [];
  builders.forEach((build) => {
    let lv;
    try {
      lv = build();
    } catch (err) {
      errors.push(err.message);
      return;
    }
    const res = evaluate(lv, levels.concat([lv]));
    if (!res.complete) {
      const first = (res.errors || [])[0];
      let detail = '';
      if (first) {
        const bad = lv.solution.nodes.find((n) => n.id === first.nodeId);
        detail = ' @' + (bad ? bad.kind + '/' + JSON.stringify(bad.config) : first.nodeId);
      }
      errors.push(lv.code + ' 参考解未通关：' + (first ? first.message : '未知') + detail);
      return;
    }
    levels.push(lv);
    console.log(lv.code, lv.title, '· nodes=' + lv.solution.nodes.length,
      '· palette=' + lv.palette.length);
  });
  if (errors.length) {
    console.error('引理关构造失败 ' + errors.length + ' 关：');
    errors.forEach((e) => console.error('  ' + e));
    process.exit(1);
  }
  /* 全量复检：9 关一起求值（引用更早引理关） */
  levels.forEach((lv) => {
    const res = evaluate(lv, levels);
    if (!res.complete) throw new Error(lv.code + ' 全量复检未通关');
  });
  fs.writeFileSync(OUT, JSON.stringify(levels, null, 2) + '\n', 'utf8');
  const total = levels.reduce((s, lv) => s + lv.solution.nodes.length, 0);
  console.log('写入 ' + path.relative(ROOT, OUT) + ' · ' + levels.length + ' 关 · 合计 ' + total + ' 元件');
}

main();
