#!/usr/bin/env node
'use strict';
/*
 * 用“证明项 + 演绎定理（DT）”把可证的逻辑定理做成关卡：
 *   *15  IMP: (P→(Q→R)) → ((P∧Q)→R)
 *   *20  EXP: ((P∧Q)→R) → (P→(Q→R))
 * 全部由 A1/A2 与合取规则推导，不再需要 EXP/IMP 公理模块。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');

const A = F.atom('P');
const B = F.atom('Q');
const C = F.atom('R');
const X = F.and(A, B);

/* 推导节点：{ t: 证明项, f: 公式, hyp: 假设公式 } */
function leaf(t, f) { return { t, f }; }
function hyp(f) { return { t: null, f, hyp: true }; }
function mp(a, b) {
  // b 必须是 a.f → r
  const tb = F.imp ? null : null;
  const bf = b.f; // [ '(', ... ] -> body tokens
  const body = Array.isArray(bf) && bf[0] === '(' ? bf.slice(1, -1) : bf;
  // 找顶层 ->
  let depth = 0, split = -1;
  for (let i = 0; i < body.length; i += 1) {
    if (body[i] === '(') depth += 1;
    else if (body[i] === ')') depth -= 1;
    else if (depth === 0 && body[i] === '->') { split = i; break; }
  }
  if (split < 0) throw new Error('mp: 第二输入不是蕴涵：' + bf.join(' '));
  const ant = body.slice(0, split);
  if (ant.join(' ') !== a.f.join(' ')) {
    throw new Error('mp: 前件不匹配\n  a=' + a.f.join(' ') + '\n  需要=' + ant.join(' '));
  }
  return leaf(P.mp(a.t, b.t), body.slice(split + 1));
}
function dt(node, H) {
  if (node.hyp) {
    if (node.f.join(' ') === H.join(' ')) {
      return leaf(P.subst(P.thm(1), { atoms: { P: H } }), F.imp(H, H));
    }
    const a1 = leaf(P.subst(P.ax('A1'), { atoms: { P: node.f, Q: H } }), F.imp(node.f, F.imp(H, node.f)));
    return mp(node, a1);
  }
  if (node.t.op === 'mp') {
    const da = dt(node.a, H);
    const db = dt(node.b, H);
    const a2 = leaf(P.subst(P.ax('A2'), { atoms: { P: H, Q: node.a.f, R: node.f } }),
      F.imp(F.imp(H, F.imp(node.a.f, node.f)), F.imp(F.imp(H, node.a.f), F.imp(H, node.f))));
    return mp(da, mp(db, a2));
  }
  // 其他已证定理/公理：A1 提升
  const a1 = leaf(P.subst(P.ax('A1'), { atoms: { P: node.f, Q: H } }), F.imp(node.f, F.imp(H, node.f)));
  return mp(node, a1);
}
/* 让 mp 读 node.a */
function mp2(a, b) {
  const r = mp(a, b);
  r.a = a; r.b = b; r.t = P.mp(a.t, b.t);
  return r;
}

/* 重新实现，保留子节点 */
function splitImp(f) {
  if (!Array.isArray(f) || f[0] !== '(') return null;
  const body = f.slice(1, -1);
  let depth = 0;
  for (let i = 0; i < body.length; i += 1) {
    if (body[i] === '(') depth += 1;
    else if (body[i] === ')') depth -= 1;
    else if (depth === 0 && body[i] === '->') {
      return { ant: body.slice(0, i), cons: body.slice(i + 1) };
    }
  }
  return null;
}
function same(a, b) { return a.join(' ') === b.join(' '); }
function mpp(a, b) {
  const ia = splitImp(a.f);
  const ib = splitImp(b.f);
  /* 规范化为 node.a = 前件，node.b = 前件→结论 */
  if (ia && same(ia.ant, b.f)) return { t: P.mp(a.t, b.t), f: ia.cons, a: b, b: a };
  if (ib && same(ib.ant, a.f)) return { t: P.mp(a.t, b.t), f: ib.cons, a, b };
  throw new Error('mpp: 前件不匹配\n a=' + a.f.join(' ') + '\n b=' + b.f.join(' '));
}
function dt2(node, H) {
  if (node.hyp) {
    if (node.f.join(' ') === H.join(' ')) return leaf(P.subst(P.thm(1), { atoms: { P: H } }), F.imp(H, H));
    const a1 = leaf(P.subst(P.ax('A1'), { atoms: { P: node.f, Q: H } }), F.imp(node.f, F.imp(H, node.f)));
    return mpp(node, a1);
  }
  if (node.t && node.t.op === 'mp' && node.a) {
    const da = dt2(node.a, H), db = dt2(node.b, H);
    const a2 = leaf(P.subst(P.ax('A2'), { atoms: { P: H, Q: node.a.f, R: node.f } }),
      F.imp(F.imp(H, F.imp(node.a.f, node.f)), F.imp(F.imp(H, node.a.f), F.imp(H, node.f))));
    return mpp(da, mpp(db, a2));
  }
  const a1 = leaf(P.subst(P.ax('A1'), { atoms: { P: node.f, Q: H } }), F.imp(node.f, F.imp(H, node.f)));
  return mpp(node, a1);
}
function nodesOf(t) {
  if (!t || !t.op) return 1;
  if (t.op === 'mp') return 1 + nodesOf(t.a) + nodesOf(t.b);
  if (t.op === 'gen') return 1 + nodesOf(t.of);
  return 1;
}

/* ---- IMP: (P→(Q→R)) → ((P∧Q)→R) ---- */
function impProof() {
  const H = leaf(P.ax('A1'), null); // placeholder
  const Hf = F.imp(A, F.imp(B, C));
  const h = hyp(Hf);
  const x = hyp(X);
  const e1 = leaf(P.andElimAx(A, B, 'l'), F.imp(X, A));
  const e2 = leaf(P.andElimAx(A, B, 'r'), F.imp(X, B));
  const a = mpp(e1, x);              // A
  const b = mpp(e2, x);              // B
  const bc = mpp(h, a);              // B→C
  const c = mpp(bc, b);              // C
  const dx = dt2(c, X);              // X→C (仍依赖 H)
  const dh = dt2(dx, Hf);            // H→(X→C)
  return dh.t;
}
/* ---- EXP: ((P∧Q)→R) → (P→(Q→R)) ---- */
function expProof() {
  const Hf = F.imp(X, C);
  const h = hyp(Hf);
  const a = hyp(A);
  const b = hyp(B);
  const ai = leaf(P.andIntroAx(A, B), F.imp(A, F.imp(B, X)));
  const ba = mpp(ai, a);             // B→X
  const xx = mpp(ba, b);             // X
  const c = mpp(h, xx);              // C
  const db = dt2(c, B);              // B→C
  const da = dt2(db, A);             // A→(B→C)
  return dt2(da, Hf).t;              // H→(A→(B→C))
}

const imp = impProof();
const exp = expProof();
console.log('IMP nodes', nodesOf(imp), 'EXP nodes', nodesOf(exp));

const file = path.join(ROOT, 'campaign', 'chapter1.json');
const levels = JSON.parse(fs.readFileSync(file, 'utf8'));
function replace(no, title, teaches, hint, target, proof) {
  const i = levels.findIndex((lv) => lv.no === no);
  levels[i] = { no, chapter: 0, title, teaches, hint, targetTokens: ['|-'].concat(target), proof, stats: { nodes: nodesOf(proof) } };
}
replace(15, '合取前件合并', '(P→(Q→R))→((P∧Q)→R)，由 A1/A2/∧ 规则证明。',
  '把合取拆成两个前件再用 A2 合并（演绎定理自动处理假设）。', F.imp(F.imp(A, F.imp(B, C)), F.imp(X, C)), imp);
replace(20, '合取前件拆分', '((P∧Q)→R)→(P→(Q→R))，由 A1/A2/∧ 规则证明。',
  '把合取前件拆成两层前件（演绎定理自动处理假设）。', F.imp(F.imp(X, C), F.imp(A, F.imp(B, C))), exp);
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('chapter1 *15/*20 now proved without EXP/IMP axioms');
