'use strict';
/*
 * 参考证明搜索（作者侧，不生成关卡内容）：
 *   给定手写目标和更早关卡的定理，用「分离 + 公理实例 + 蕴涵引入（DT）」的
 *   自然演绎式反推找一条希尔伯特证明，再交给 build-campaign 编译成电路。
 *
 * 输出证明项与 campaign/proof.js 的组合子同构：
 *   { op:'axiom', schema, atoms } | { op:'lemma', n, atoms } | { op:'mp', a, b }
 * 只处理命题片段（无 ∀/=/无变量）；量词与等词关的参考证明另行手写/扩展。
 */
const Term = require('../../src/term.js');

const AXIOMS = {
  A1: ['(', 'P', '->', '(', 'Q', '->', 'P', ')', ')'],
  A2: ['(', '(', 'P', '->', '(', 'Q', '->', 'R', ')', ')', '->', '(', '(', 'P', '->', 'Q', ')', '->', '(', 'P', '->', 'R', ')', ')', ')'],
  A3: ['(', '(', '-.', 'P', '->', '-.', 'Q', ')', '->', '(', 'Q', '->', 'P', ')', ')']
};

const key = (body) => body.join('\u0000');

/* 结构匹配：schema 的原子（单 token 大写）绑定到 goal 子公式；其余必须相同。 */
function matchTree(schema, goal, binds) {
  binds = binds || {};
  const s = Term.read(['wff'].concat(schema));
  const g = Term.read(['wff'].concat(goal));
  function m(a, b) {
    if (a.k === 'atom') {
      if (Object.prototype.hasOwnProperty.call(binds, a.name)) {
        return key(binds[a.name]) === key(treeBody(b));
      }
      binds[a.name] = treeBody(b);
      return true;
    }
    if (a.k !== b.k) return false;
    if (a.k === 'pred' || a.k === 'var') {
      return JSON.stringify(a) === JSON.stringify(b);
    }
    if (a.k === 'not') return m(a.a, b.a);
    if (a.k === 'all' || a.k === 'exists') {
      return a.v === b.v && m(a.a, b.a);
    }
    return m(a.a, b.a) && m(a.b, b.b);
  }
  return m(s, g) ? binds : null;
}

function treeBody(tree) { return Term.treeToBody(tree); }

function instBody(schemaBody, binds) {
  return Term.substAtoms(['wff'].concat(schemaBody), binds).slice(1);
}

function makeProver(opts) {
  const lemmas = (opts.lemmas || []).slice(); // [{n, body}]
  const axiomList = Object.keys(AXIOMS).map((k) => ({ n: null, schema: k, body: AXIOMS[k] }));
  const all = axiomList.concat(lemmas);
  const MAX_SIZE = 64;

  function size(body) { return body.length; }

  function leafFor(schema, binds) {
    return schema ? { op: 'axiom', schema, atoms: binds } : null;
  }

  /** 尝试用一条已有断言（公理/定理）匹配 goal。 */
  function tryDirect(goal) {
    for (const entry of all) {
      const binds = matchTree(entry.body, goal, {});
      if (binds) {
        return entry.schema
          ? { op: 'axiom', schema: entry.schema, atoms: binds }
          : { op: 'lemma', n: entry.n, atoms: binds };
      }
    }
    return null;
  }

  /** 尝试 MP：某条断言的结论是 C→goal。 */
  function mpCandidates(goal) {
    const out = [];
    for (const entry of all) {
      const tree = Term.read(['wff'].concat(entry.body));
      if (tree.k !== 'imp') continue;
      const binds = matchTree(treeBody(tree.b), goal, {});
      if (!binds) continue;
      const sub = instBody(treeBody(tree.a), binds);
      if (size(sub) > MAX_SIZE) continue;
      out.push({
        claim: entry.schema
          ? { op: 'axiom', schema: entry.schema, atoms: binds }
          : { op: 'lemma', n: entry.n, atoms: binds },
        sub
      });
    }
    return out;
  }

  function dt(H, node) {
    if (!node) return null;
    switch (node.op) {
      case 'hyp':
        if (node.index === 0) return selfImp(H);
        return { op: 'hyp', index: node.index - 1 };
      case 'axiom':
      case 'lemma': {
        const C = node.atoms ? instBody(node.atomsSourceBody || '', node.atoms) : null;
        return null;
      }
      case 'mp': {
        const p = dt(H, node.a);
        const q = dt(H, node.b);
        if (!p || !q) return null;
        const A = conclusionOf(node.b);
        const B = conclusionOf(node);
        const a2 = {
          op: 'axiom', schema: 'A2',
          atoms: { P: H, Q: wrap(A), R: wrap(B) }
        };
        const inner = { op: 'mp', a: a2, b: p };
        return { op: 'mp', a: inner, b: q };
      }
      default:
        return null;
    }
  }

  function selfImp(H) {
    /* P→P 的标准证明，P := H。 */
    const h = wrap(H);
    return {
      op: 'mp',
      a: { op: 'axiom', schema: 'A1', atoms: { P: H, Q: h } },
      b: {
        op: 'mp',
        a: { op: 'axiom', schema: 'A1', atoms: { P: H, Q: H } },
        b: { op: 'axiom', schema: 'A2', atoms: { P: H, Q: H, R: H } }
      }
    };
  }

  function conclusionOf(node) {
    switch (node.op) {
      case 'axiom': return instBody(AXIOMS[node.schema], node.atoms);
      case 'lemma': {
        const L = lemmas.find((x) => x.n === node.n);
        return instBody(L.body, node.atoms);
      }
      case 'mp': return conclusionOf(node.b);
      default: return node.body;
    }
  }

  function proveSequent(hyps, goal, depth) {
    if (depth < 0 || size(goal) > MAX_SIZE) return null;
    /* 1. 假设 */
    for (let i = 0; i < hyps.length; i += 1) {
      if (key(hyps[i]) === key(goal)) return { op: 'hyp', index: i };
    }
    /* 2. 直接匹配已有断言（公理或更早定理） */
    const direct = tryDirect(goal);
    if (direct) return direct;
    /* 3. 分离：结论为 C→goal 的断言 */
    for (const cand of mpCandidates(goal)) {
      const sub = proveSequent(hyps, cand.sub, depth - 1);
      if (sub) return { op: 'mp', a: cand.claim, b: sub };
    }
    /* 4. 用假设里的蕴涵做分离 */
    for (let i = 0; i < hyps.length; i += 1) {
      const tree = Term.read(['wff'].concat(hyps[i]));
      if (tree.k !== 'imp') continue;
      const D = treeBody(tree.b);
      if (key(D) !== key(goal)) continue;
      const sub = proveSequent(hyps, treeBody(tree.a), depth - 1);
      if (sub) return { op: 'mp', a: { op: 'hyp', index: i }, b: sub };
    }
    /* 5. 蕴涵引入（DT） */
    const gt = Term.read(['wff'].concat(goal));
    if (gt.k === 'imp') {
      const A = treeBody(gt.a);
      if (size(A) <= MAX_SIZE) {
        const p = proveSequent([A].concat(hyps), treeBody(gt.b), depth - 1);
        if (p) return dt(A, p);
      }
    }
    return null;
  }

  return {
    term: (goal) => proveSequent([], wrap(goal), (opts.depth || 8))
  };
}

/* 公式体加类型码只用于 Term.read；内部统一用 body。 */
function wrap(body) { return body; }
function unwrap(body) { return body; }

module.exports = { makeProver, AXIOMS, matchTree, instBody };
