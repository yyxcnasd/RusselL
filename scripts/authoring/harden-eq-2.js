#!/usr/bin/env node
'use strict';
/* 第Ⅲ章 *66：等词给出逐点元素等价 x=y → ∀z(z∈x↔z∈y)（外延的“容易方向”）。
 * 先引用 *65 取两个方向的 ∀ 蕴含，逐点重建 ↔，再全称推广并用 DT 消去 x=y。 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');
const D = require('./dt.js');

const X = F.term('x'), Y = F.term('y'), Z = F.term('z');
const eq = (a, b) => F.pred('=', a, b);
const mem = (a, b) => F.mem(a, b);
const H = eq(X, Y);
const A = mem(Z, X), B = mem(Z, Y);
const AB = F.imp(A, B), BA = F.imp(B, A);
const QX = F.all('z', AB), QY = F.all('z', BA);
const CONJ = F.and(QX, QY);
const IFF = F.iff(A, B);

const h = D.hyp(H);
const c = D.mpp(D.leaf(P.thm(65), F.imp(H, CONJ)), h);
const qx = D.mpp(D.leaf(P.andElimAx(QX, QY, 'l'), F.imp(CONJ, QX)), c);
const qy = D.mpp(D.leaf(P.andElimAx(QX, QY, 'r'), F.imp(CONJ, QY)), c);
const axab = D.leaf(P.allInst(AB, 'z', 'z'), F.imp(QX, AB));
const axba = D.leaf(P.allInst(BA, 'z', 'z'), F.imp(QY, BA));
const ab = D.mpp(axab, qx);
const ba = D.mpp(axba, qy);
const ii = D.leaf(P.iffIntroAx(A, B), F.imp(AB, F.imp(BA, IFF)));
const iff = D.mpp(D.mpp(ii, ab), ba);
const g = D.gen(iff, 'z');
const proof = D.dt(g, H).t;

const target = F.imp(H, F.all('z', IFF));
(function check(t, p) {
  if (!t || typeof t !== 'object') throw new Error('bad proof node at ' + p);
  if (!t.op) throw new Error('missing op at ' + p);
  const kids = t.op === 'mp' ? [t.a, t.b]
    : (t.op === 'subst' || t.op === 'gen' || t.op === 'allE' || t.op === 'allDist') ? [t.of] : [];
  kids.forEach((k, i) => check(k, p + '.' + i));
})(proof, 'proof');
function nodesOf(t) {
  if (!t || !t.op) return 1;
  if (t.op === 'mp') return 1 + nodesOf(t.a) + nodesOf(t.b);
  if (t.op === 'gen') return 1 + nodesOf(t.of);
  return 1;
}
const nodes = nodesOf(proof);
console.log('nodes', nodes, 'target', target.join(' ').slice(0, 120));

const file = path.join(ROOT, 'campaign', 'chapter3.json');
const levels = JSON.parse(fs.readFileSync(file, 'utf8'));
const idx = levels.findIndex((lv) => lv.no === 66);
if (idx < 0) { console.error('level 66 not found'); process.exit(1); }
levels[idx] = {
  no: 66,
  chapter: 2,
  title: '等词给出元素等价',
  teaches: 'x=y 推出 ∀z(z∈x↔z∈y)：外延公理的“容易方向”，连接等词与集合论。',
  hint: '先引用 *65 得到两个方向的 ∀ 蕴含，逐个元素用 ↔E 拆、↔I 合，再全称推广；假设用 DT 消去。',
  targetTokens: ['|-'].concat(target),
  proof,
  stats: { nodes }
};
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('replaced *66 with equality → element equivalence');
