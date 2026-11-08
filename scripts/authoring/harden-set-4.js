#!/usr/bin/env node
'use strict';
/* 第Ⅳ章 *75：把“两个方向”和“元素等价反向”两个结论合成一个更强的合取。 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');

const X = F.term('x'), Y = F.term('y'), Z = F.term('z');
const mem = (a, b) => F.mem(a, b);
const A = mem(Z, X);
const B = mem(Z, Y);
const H = F.all('z', F.iff(A, B));
const QX = F.all('z', F.imp(A, B));
const QY = F.all('z', F.imp(B, A));
const S = F.all('z', F.iff(B, A));
const CONJ = F.and(QX, QY);

function compose(pAB, pBC, a, b, c) {
  const chain = P.subst(P.thm(5), { atoms: { P: a, Q: b, R: c } });
  return P.mp(pBC, P.mp(pAB, chain));
}

const left = P.thm(74);        // H → (QX∧QY)
const right = P.thm(73);       // H → ∀z(z∈y↔z∈x)
const ai = P.andIntroAx(CONJ, S);
const step = compose(left, ai, H, CONJ, F.imp(S, F.and(CONJ, S)));
const a2 = P.subst(P.ax('A2'), { atoms: { P: H, Q: S, R: F.and(CONJ, S) } });
const proof = P.mp(right, P.mp(step, a2));

let nodes = 0;
(function count(t) {
  nodes += 1;
  if (t.op === 'mp') { count(t.a); count(t.b); }
  else if (t.op === 'gen') count(t.of);
})(proof);
const target = F.imp(H, F.and(CONJ, S));
console.log('nodes', nodes, 'target', target.join(' '));

const file = path.join(ROOT, 'campaign', 'chapter4.json');
const levels = JSON.parse(fs.readFileSync(file, 'utf8'));
levels[2] = {
  no: 75,
  chapter: 3,
  title: '元素等价的三重结论',
  teaches: '把“两个方向”与“元素等价反向”组合成一个合取结论。',
  hint: '分别引用 *74 与 *73，再用 ∧I 与 A2 合并两个后件。',
  targetTokens: ['|-'].concat(target),
  proof,
  stats: { nodes }
};
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('replaced *75 with a combined-conclusions proof');
