#!/usr/bin/env node
'use strict';
/* 第Ⅳ章 *74：把元素等价拆成两条全称方向并合取（多步证明）。 */
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
const DX = F.imp(A, B);
const DY = F.imp(B, A);
const QX = F.all('z', DX);
const QY = F.all('z', DY);

function compose(pAB, pBC, a, b, c) {
  const chain = P.subst(P.thm(5), { atoms: { P: a, Q: b, R: c } });
  return P.mp(pBC, P.mp(pAB, chain));
}

/* 分支 1：H → ∀z(A→B) */
const h1 = P.allInst(F.iff(A, B), 'z', 'z');
const e1 = P.iffElimAx(A, B, 'lr');
const c1 = compose(h1, e1, H, F.iff(A, B), DX);
const g1 = P.gen(c1, 'z');
const s1 = P.subst(P.thm(64), { atoms: { P: H, Q: DX } });
const branchX = P.mp(g1, s1);

/* 分支 2：H → ∀z(B→A) */
const e2 = P.iffElimAx(A, B, 'rl');
const c2 = compose(h1, e2, H, F.iff(A, B), DY);
const g2 = P.gen(c2, 'z');
const s2 = P.subst(P.thm(64), { atoms: { P: H, Q: DY } });
const branchY = P.mp(g2, s2);

/* 合取：X→(Y→(X∧Y))，再用 A2 合并到 H→(X∧Y) */
const ai = P.andIntroAx(QX, QY);
const hY = compose(branchX, ai, H, QX, F.imp(QY, F.and(QX, QY)));
const a2 = P.subst(P.ax('A2'), {
  atoms: { P: H, Q: QY, R: F.and(QX, QY) }
});
const m1 = P.mp(hY, a2);
const proof = P.mp(branchY, m1);

let nodes = 0;
(function count(t) {
  nodes += 1;
  if (t.op === 'mp') { count(t.a); count(t.b); }
  else if (t.op === 'gen') count(t.of);
})(proof);

const target = F.imp(H, F.and(QX, QY));
console.log('nodes', nodes, 'target', target.join(' '));

const file = path.join(ROOT, 'campaign', 'chapter4.json');
const levels = JSON.parse(fs.readFileSync(file, 'utf8'));
levels[1] = {
  no: 74,
  chapter: 3,
  title: '元素等价的两个方向',
  teaches: '∀z(z∈x↔z∈y) 可以拆成两条全称蕴涵并合成合取。',
  hint: '分别用 ↔E 取两个方向，各自推广并移动 ∀，最后用 ∧I 与 A2 合并。',
  targetTokens: ['|-'].concat(target),
  proof,
  stats: { nodes }
};
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('replaced *74 with a multi-branch proof');
