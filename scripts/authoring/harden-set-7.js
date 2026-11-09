#!/usr/bin/env node
'use strict';
/* 第Ⅳ章 *77：元素等价的全称传递（逐点传递后再全称推广）。 */
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
  const i = D.splitImp(pAB.f), j = D.splitImp(pBC.f);
  const chain = D.leaf(P.subst(P.thm(5), { atoms: { P: i.ant, Q: i.cons, R: j.cons } }),
    F.imp(pAB.f, F.imp(pBC.f, F.imp(i.ant, j.cons))));
  return D.mpp(pBC, D.mpp(pAB, chain));
}

const h = D.hyp(H);
const k = D.hyp(K);
const hAB = D.mpp(D.leaf(P.allInst(F.iff(A, B), 'z', 'z'), F.imp(H, F.iff(A, B))), h);
const hBC = D.mpp(D.leaf(P.allInst(F.iff(B, C), 'z', 'z'), F.imp(K, F.iff(B, C))), k);
const ab = D.mpp(D.leaf(P.iffElimAx(A, B, 'lr'), F.imp(F.iff(A, B), F.imp(A, B))), hAB);
const bc = D.mpp(D.leaf(P.iffElimAx(B, C, 'lr'), F.imp(F.iff(B, C), F.imp(B, C))), hBC);
const ac = compose(ab, bc);
const cb = D.mpp(D.leaf(P.iffElimAx(B, C, 'rl'), F.imp(F.iff(B, C), F.imp(C, B))), hBC);
const ba = D.mpp(D.leaf(P.iffElimAx(A, B, 'rl'), F.imp(F.iff(A, B), F.imp(B, A))), hAB);
const ca = compose(cb, ba);
const iff = D.mpp(D.mpp(D.leaf(P.iffIntroAx(A, C), F.imp(F.imp(A, C), F.imp(F.imp(C, A), F.iff(A, C)))), ac), ca);
const g = D.gen(iff, 'z');                 // ∀z(A↔C)，仍依赖 H,K
const afterK = D.dt(g, K);                 // K→∀z(A↔C)
const proof = D.dt(afterK, H).t;

function nodesOf(t) {
  if (!t || !t.op) return 1;
  if (t.op === 'mp') return 1 + nodesOf(t.a) + nodesOf(t.b);
  if (t.op === 'gen') return 1 + nodesOf(t.of);
  return 1;
}
const target = F.imp(H, F.imp(K, F.all('z', F.iff(A, C))));
/* 只沿真正的证明子项递归；公理参数（iffElimAx.a/.b 等）是公式，不是证明。 */
function proofChildren(pt) {
  if (!pt || typeof pt !== 'object') return [];
  switch (pt.op) {
    case 'mp': return [pt.a, pt.b];
    case 'subst':
    case 'gen':
    case 'existsI':
    case 'allE':
    case 'allDist':
    case 'andE':
    case 'iffE':
    case 'orI': return [pt.of];
    case 'existsE': return [pt.ex, pt.imp];
    case 'orE': return [pt.or, pt.ca, pt.cb];
    case 'andI':
    case 'iffI': return [pt.a, pt.b];
    case 'eqSubst': return [pt.eq, pt.of];
    default: return [];
  }
}
(function check(t, p) {
  if (!t || typeof t !== 'object') throw new Error('bad proof node at ' + p);
  if (!t.op) throw new Error('missing op at ' + p);
  proofChildren(t).forEach((c, i) => check(c, p + '.' + i));
})(proof, 'proof');
console.log('nodes', nodesOf(proof));

const file = path.join(ROOT, 'campaign', 'chapter4.json');
const levels = JSON.parse(fs.readFileSync(file, 'utf8'));
levels[4] = {
  no: 77,
  chapter: 3,
  title: '元素等价的全称传递',
  teaches: '∀z(z∈x↔z∈y) 与 ∀z(z∈y↔z∈u) 推出 ∀z(z∈x↔z∈u)。',
  hint: '先逐点传递，再全称推广；两次假设用 DT 消去。',
  targetTokens: ['|-'].concat(target),
  proof,
  stats: { nodes: nodesOf(proof) }
};
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('replaced *77 with full universal transitivity');
