#!/usr/bin/env node
'use strict';
/* 第Ⅲ章 *66：把 ∀→* 从公理降级为定理（由 A5 + shift + A1/A2 证明）。 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');
const D = require('./dt.js');

const Pz = F.atom('P');
const Qz = F.atom('Q');
const H = F.all('z', F.imp(Pz, Qz));
const target = F.imp(H, F.imp(Pz, F.all('z', Qz)));

const h = D.hyp(H);
const p = D.hyp(Pz);
const a5 = D.leaf(P.ax('A5', { v: 'z' }), F.imp(H, F.imp(F.all('z', Pz), F.all('z', Qz))));
const m = D.mpp(a5, h);                                   // ∀zP→∀zQ
const sh = D.leaf(P.shift(Pz, 'z'), F.imp(Pz, F.all('z', Pz)));
const pz = D.mpp(sh, p);                                  // ∀zP
const qz = D.mpp(m, pz);                                  // ∀zQ
const d1 = D.dt(qz, Pz);                                  // P→∀zQ
const proof = D.dt(d1, H).t;

function nodesOf(t) {
  if (!t || !t.op) return 1;
  if (t.op === 'mp') return 1 + nodesOf(t.a) + nodesOf(t.b);
  if (t.op === 'gen') return 1 + nodesOf(t.of);
  return 1;
}
console.log('shift-ax level nodes', nodesOf(proof));

const file = path.join(ROOT, 'campaign', 'chapter3.json');
const levels = JSON.parse(fs.readFileSync(file, 'utf8'));
const idx = levels.findIndex((lv) => lv.no === 64);
if (idx < 0) { console.error('level 66 missing'); process.exit(1); }
levels[idx] = {
  no: 64,
  chapter: 2,
  title: '全称辖域（定理）',
  teaches: '∀z(P→Q)→(P→∀zQ)，由 A5 + 全称引入 + A1/A2 证明，不再是公理。',
  hint: '先引用 *66 这条已证定理，再用分离。',
  targetTokens: ['|-'].concat(target),
  proof,
  stats: { nodes: nodesOf(proof) }
};
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('*66 now proves the ∀-scope shift');
