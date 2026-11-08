#!/usr/bin/env node
'use strict';
/* 第Ⅳ章 *76：元素等价的逐点传递性（H,K 假设下推出 A↔C，再用 DT 消去假设）。 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');
const D = require('./dt.js');

const X = F.term('x'), Y = F.term('y'), Z = F.term('z'), U = F.term('u');
const mem = (a, b) => F.mem(a, b);
const A = mem(Z, X), B = mem(Z, Y), C = mem(Z, U);
const H = F.all('z', F.iff(A, B));
const K = F.all('z', F.iff(B, C));

function compose(pAB, pBC) {
  const a = pAB.f, b = pBC.f;
  const i = D.splitImp(a), j = D.splitImp(b);
  // pAB: A→B, pBC: B→C
  if (!i || !j) throw new Error('compose inputs must be implications');
  const chain = D.leaf(P.subst(P.thm(5), { atoms: { P: i.ant, Q: i.cons, R: j.cons } }),
    F.imp(a, F.imp(b, F.imp(i.ant, j.cons))));
  const step = D.mpp(pAB, chain);     // ((B→C)→(A→C))
  return D.mpp(pBC, step);
}

const h = D.hyp(H);
const k = D.hyp(K);
const hAB = D.mpp(D.leaf(P.allInst(F.iff(A, B), 'z', 'z'), F.imp(H, F.iff(A, B))), h);
const hBC = D.mpp(D.leaf(P.allInst(F.iff(B, C), 'z', 'z'), F.imp(K, F.iff(B, C))), k);
const ab = D.mpp(D.leaf(P.iffElimAx(A, B, 'lr'), F.imp(F.iff(A, B), F.imp(A, B))), hAB);
const bc = D.mpp(D.leaf(P.iffElimAx(B, C, 'lr'), F.imp(F.iff(B, C), F.imp(B, C))), hBC);
const ac = compose(ab, bc);           // A→C
const cb = D.mpp(D.leaf(P.iffElimAx(B, C, 'rl'), F.imp(F.iff(B, C), F.imp(C, B))), hBC);
const ba = D.mpp(D.leaf(P.iffElimAx(A, B, 'rl'), F.imp(F.iff(A, B), F.imp(B, A))), hAB);
const ca = compose(cb, ba);           // C→A
const iff = D.mpp(D.mpp(D.leaf(P.iffIntroAx(A, C), F.imp(F.imp(A, C), F.imp(F.imp(C, A), F.iff(A, C)))), ac), ca);
const afterK = D.dt(iff, K);
const proof = D.dt(afterK, H).t;

function nodesOf(t) {
  if (!t || !t.op) return 1;
  if (t.op === 'mp') return 1 + nodesOf(t.a) + nodesOf(t.b);
  if (t.op === 'gen') return 1 + nodesOf(t.of);
  return 1;
}
const target = F.imp(H, F.imp(K, F.iff(A, C)));
console.log('nodes', nodesOf(proof), 'target', target.join(' '));

const file = path.join(ROOT, 'campaign', 'chapter4.json');
const levels = JSON.parse(fs.readFileSync(file, 'utf8'));
levels[3] = {
  no: 76,
  chapter: 3,
  title: '元素等价的逐点传递',
  teaches: '两个元素等价关系合起来给出逐点等价：∀z(z∈x↔z∈y)、∀z(z∈y↔z∈u) ⇒ z∈x↔z∈u。',
  hint: '假设两个全称等价，逐点取出两个方向，用 HS 串起来再重建 ↔。',
  targetTokens: ['|-'].concat(target),
  proof,
  stats: { nodes: nodesOf(proof) }
};
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('replaced *76 with a DT-derived transitivity proof');
