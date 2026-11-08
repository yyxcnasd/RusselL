#!/usr/bin/env node
'use strict';
/* 第Ⅲ章 *65：等词在 ∈ 上的双向同余（多分支、多步证明）。 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');

const X = F.term('x'), Y = F.term('y'), Z = F.term('z');
const mem = (a, b) => F.mem(a, b);
const H = F.pred('=', X, Y);
const Pz = mem(Z, X);
const Qz = mem(Z, Y);
const DX = F.imp(Pz, Qz);
const DY = F.imp(Qz, Pz);
const QX = F.all('z', DX);
const QY = F.all('z', DY);

function compose(pAB, pBC, a, b, c) {
  const chain = P.subst(P.thm(5), { atoms: { P: a, Q: b, R: c } });
  return P.mp(pBC, P.mp(pAB, chain));
}

/* 正向：x=y → ∀z(z∈x→z∈y) */
const l1 = P.leibniz('x', 'y', Pz, { mode: 'replace' });
const g1 = P.gen(l1, 'z');
const s1 = P.subst(P.thm(64), { atoms: { P: H, Q: DX } });
const branchX = P.mp(g1, s1);

/* 反向：x=y → ∀z(z∈y→z∈x)（先对称，再反向替换） */
const sym = P.thm(51);
const l2 = P.leibniz('y', 'x', Qz, { mode: 'replace' });
const c2 = compose(sym, l2, H, F.pred('=', Y, X), DY);
const g2 = P.gen(c2, 'z');
const s2 = P.subst(P.thm(64), { atoms: { P: H, Q: DY } });
const branchY = P.mp(g2, s2);

/* 合取 */
const ai = P.andIntroAx(QX, QY);
const hY = compose(branchX, ai, H, QX, F.imp(QY, F.and(QX, QY)));
const a2 = P.subst(P.ax('A2'), {
  atoms: { P: H, Q: QY, R: F.and(QX, QY) }
});
const proof = P.mp(branchY, P.mp(hY, a2));

let nodes = 0;
(function count(t) {
  nodes += 1;
  if (t.op === 'mp') { count(t.a); count(t.b); }
  else if (t.op === 'gen') count(t.of);
})(proof);

const target = F.imp(H, F.and(QX, QY));
console.log('nodes', nodes, 'target', target.join(' '));

const file = path.join(ROOT, 'campaign', 'chapter3.json');
const levels = JSON.parse(fs.readFileSync(file, 'utf8'));
const idx = levels.findIndex((lv) => lv.no === 65);
if (idx < 0) { console.error('level 65 not found'); process.exit(1); }
levels[idx] = {
  no: 65,
  chapter: 2,
  title: '等词的双向同余',
  teaches: 'x=y 同时给出 ∀z(z∈x→z∈y) 与反向全称蕴涵。',
  hint: '正向用替换，反向先对称再替换；各自推广并移动 ∀，最后合取。',
  targetTokens: ['|-'].concat(target),
  proof,
  stats: { nodes }
};
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('replaced *65 with a multi-branch equality proof');
