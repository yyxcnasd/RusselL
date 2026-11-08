#!/usr/bin/env node
'use strict';
/* 第Ⅳ章：把 *73 换成真正多步的集合论证明（元素等价的对称性）。 */
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

function compose(pAB, pBC, a, b, c) {
  const chain = P.subst(P.thm(5), { atoms: { P: a, Q: b, R: c } });
  return P.mp(pBC, P.mp(pAB, chain));
}

const h1 = P.allInst(F.iff(A, B), 'z', 'z');            // H → (A↔B)
const h2 = P.iffElimAx(A, B, 'rl');                       // (A↔B) → (B→A)
const h3 = compose(h1, h2, H, F.iff(A, B), F.imp(B, A));
const h4 = P.iffElimAx(A, B, 'lr');                       // (A↔B) → (A→B)
const h5 = compose(h1, h4, H, F.iff(A, B), F.imp(A, B));
const h6 = P.iffIntroAx(B, A);                            // (B→A)→((A→B)→(B↔A))
const h7 = compose(h3, h6, H, F.imp(B, A), F.imp(F.imp(A, B), F.iff(B, A)));
const a2 = P.subst(P.ax('A2'), {
  atoms: { P: H, Q: F.imp(A, B), R: F.iff(B, A) }
});
const m1 = P.mp(h7, a2);                                  // (H→(A→B)) → (H→(B↔A))
const h8 = P.mp(h5, m1);                                  // H → (B↔A)
const h9 = P.gen(h8, 'z');                                // ∀z(H→(B↔A))
const h10 = P.shiftAx(H, F.iff(B, A), 'z');               // ∀z(H→(B↔A)) → (H→∀z(B↔A))
const proof = P.mp(h9, h10);

let nodes = 0;
(function count(t) {
  nodes += 1;
  if (t.op === 'mp') { count(t.a); count(t.b); }
  else if (t.op === 'gen') count(t.of);
})(proof);

const target = F.imp(H, F.all('z', F.iff(B, A)));
console.log('nodes', nodes, 'target', target.join(' '));

const file = path.join(ROOT, 'campaign', 'chapter4.json');
const levels = JSON.parse(fs.readFileSync(file, 'utf8'));
levels[0] = {
  no: 73,
  chapter: 3,
  title: '元素等价的对称性',
  teaches: '∀z(z∈x↔z∈y) 与 ∀z(z∈y↔z∈x) 等价：先逐点对称，再把 ∀ 提到前件外。',
  hint: '全称例化到 z，用 ↔E/↔I 做对称，再用全辖域公理移到外层。',
  targetTokens: ['|-'].concat(target),
  proof,
  stats: { nodes }
};
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('replaced level *73 with a multi-step proof');
