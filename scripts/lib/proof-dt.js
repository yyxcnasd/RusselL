'use strict';
/*!
 * 证明项层面的演绎定理（DT）工具：把「假设 H 下推出 F」的推导写成 H→F 的闭证明项。
 *
 * 与 scripts/authoring/dt.js（旧、依赖 thm(1)/thm(64)）的区别：这里产出的是
 * scripts/build-campaign2.js 认的证明项对象，只依赖 A1/A2/A3 与显式给出的引理项，
 * 不引用任何「旧编号关卡」。用于手写紧凑的普通关（5–21 模块）。
 *
 * 推导节点：{ f: 公式体 token[], node: 证明项 | null, hyp: true|false, op:'mp'|null, a, b }
 *   leaf(f, node)  已证断言 F
 *   hyp(f)         假设 F（由外层 DT 消去）
 *   mpNode(impN, antN)  一次分离
 *   dt(node, H)    返回 { f: H→node.f, node: 证明项 }
 */
'use strict';

const IMP = (a, b) => ['('].concat(a, ['->'], b, [')']);
const ax = (schema, atoms) => ({ op: 'axiom', schema, atoms: atoms || {} });
const mp = (a, b) => ({ op: 'mp', a, b });
const thm = (label, atoms) => ({ op: 'lemma', code: '@' + label, atoms: atoms || {} });
const subst = (of, atoms, vars) => ({ op: 'subst', of, atoms: atoms || {}, vars: vars || null });

function key(body) { return body.join('\u0000'); }

function splitImp(body) {
  if (!Array.isArray(body) || body[0] !== '(') return null;
  const inner = body.slice(1, -1);
  let depth = 0;
  for (let i = 0; i < inner.length; i += 1) {
    const c = inner[i];
    if (c === '(') depth += 1;
    else if (c === ')') depth -= 1;
    else if (depth === 0 && c === '->') return { ant: inner.slice(0, i), cons: inner.slice(i + 1) };
  }
  return null;
}

function leaf(f, node) { return { f, node, hyp: false, op: null }; }
function hyp(f) { return { f, node: null, hyp: true, op: null }; }

function mpNode(impNode, antNode) {
  const imp = splitImp(impNode.f);
  if (!imp) throw new Error('mpNode：左件不是蕴涵：' + impNode.f.join(' '));
  if (key(imp.ant) !== key(antNode.f)) {
    throw new Error('mpNode：前件不匹配\n  ' + imp.ant.join(' ') + '\n  ' + antNode.f.join(' '));
  }
  const node = impNode.node && antNode.node ? mp(antNode.node, impNode.node) : null;
  return { f: imp.cons, node, hyp: false, op: 'mp', a: antNode, b: impNode };
}

/** H→H 的 5 节点证明（A1/A2/A3 组合） */
function identityNode(A) {
  const a2 = ax('A2', { P: A, Q: IMP(A, A), R: A });
  const a1a = ax('A1', { P: A, Q: IMP(A, A) });
  const m1 = mp(a2, a1a);
  const a1b = ax('A1', { P: A, Q: A });
  return leaf(IMP(A, A), mp(m1, a1b));
}

/** dt(node, H) → { f: H→node.f, node } */
function dt(node, H) {
  if (node.hyp) {
    if (key(node.f) === key(H)) return identityNode(H);
    const a1 = leaf(IMP(node.f, IMP(H, node.f)), ax('A1', { P: node.f, Q: H }));
    return mpNode(a1, node);
  }
  if (node.op === 'mp') {
    const da = dt(node.a, H);
    const db = dt(node.b, H);
    const a2 = leaf(IMP(IMP(H, IMP(node.a.f, node.f)), IMP(IMP(H, node.a.f), IMP(H, node.f))),
      ax('A2', { P: H, Q: node.a.f, R: node.f }));
    const m1 = mpNode(a2, db);
    return mpNode(m1, da);
  }
  const a1 = leaf(IMP(node.f, IMP(H, node.f)), ax('A1', { P: node.f, Q: H }));
  return mpNode(a1, node);
}

/** 多假设 DT：dtMany(node, [H1, H2, …]) → H1→(H2→(…→node.f)) */
function dtMany(node, hs) {
  let cur = node;
  for (let i = hs.length - 1; i >= 0; i -= 1) cur = dt(cur, hs[i]);
  return cur;
}

module.exports = { IMP, ax, mp, thm, subst, leaf, hyp, mpNode, dt, dtMany, identityNode, splitImp, key };
