#!/usr/bin/env node
'use strict';
/* 第Ⅳ章 *75：元素等价链的传递（在假设下用合取前件与 HS 组合）。 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');

const X = F.term('x'), Y = F.term('y'), Z = F.term('z'), U = F.term('u');
const mem = (a, b) => F.mem(a, b);
const A = mem(Z, X);
const B = mem(Z, Y);
const C = mem(Z, U);
const H = F.all('z', F.iff(A, B));
const K = F.all('z', F.iff(B, C));

function compose(pAB, pBC, a, b, c) {
  const chain = P.subst(P.thm(5), { atoms: { P: a, Q: b, R: c } });
  return P.mp(pBC, P.mp(pAB, chain));
}
const HtoAB = compose(P.allInst(F.iff(A, B), 'z', 'z'), P.iffElimAx(A, B, 'lr'), H, F.iff(A, B), F.imp(A, B));
const KtoBC = compose(P.allInst(F.iff(B, C), 'z', 'z'), P.iffElimAx(B, C, 'lr'), K, F.iff(B, C), F.imp(B, C));

const HK = F.and(H, K);
const E1 = P.andElimAx(H, K, 'l');
const E2 = P.andElimAx(H, K, 'r');
const P1 = compose(E1, HtoAB, HK, H, F.imp(A, B));
const P2 = compose(E2, KtoBC, HK, K, F.imp(B, C));
const HS = P.subst(P.thm(5), { atoms: { P: F.imp(A, B), Q: F.imp(B, C), R: F.imp(A, C) } });
const P3 = compose(P1, HS, HK, F.imp(A, B), F.imp(F.imp(B, C), F.imp(A, C)));
const a2 = P.subst(P.ax('A2'), {
  atoms: { P: HK, Q: F.imp(B, C), R: F.imp(A, C) }
});
const m1 = P.mp(P3, a2);
const PAC = P.mp(P2, m1); // (H∧K)→(A→C)
const exp = P.exportAx(H, K, F.imp(A, C));
const proof = P.mp(PAC, exp);

let nodes = 0;
(function count(t) {
  nodes += 1;
  if (t.op === 'mp') { count(t.a); count(t.b); }
  else if (t.op === 'gen') count(t.of);
})(proof);

const target = F.imp(H, F.imp(K, F.imp(A, C)));
console.log('nodes', nodes, 'target', target.join(' '));

const file = path.join(ROOT, 'campaign', 'chapter4.json');
const levels = JSON.parse(fs.readFileSync(file, 'utf8'));
levels[2] = {
  no: 75,
  chapter: 3,
  title: '元素等价链',
  teaches: '两个元素等价关系可以串成传递：∀z(z∈x↔z∈y) 与 ∀z(z∈y↔z∈u) 推出 ∀z(z∈x→z∈u)。',
  hint: '用合取前件把两个假设放在一起，各自取出方向，再用 HS 与输出公理。',
  targetTokens: ['|-'].concat(target),
  proof,
  stats: { nodes }
};
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('replaced *75 with a transitivity chain proof');
