#!/usr/bin/env node
'use strict';
/* 第Ⅲ章 *58/*59/*60/*63：不再直接接 Leibniz，而是用已证定理/命题公理组合出来。
 *   *58 否定替换      ：*54 + 逆否定理 *9 + HS
 *   *59 条件替换      ：*53 + 等词自反 + A1，嵌套 DT 消去两个假设
 *   *60 不含 x 的公式 ：同一律 *1 + A1（把前件插进去）
 *   *63 自反条件替换  ：*1 + A1 + 前件重排 *8
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');
const D = require('./dt.js');

const X = F.term('x'), Y = F.term('y'), Z = F.term('z');
const eq = (a, b) => F.pred('=', a, b);
const Fx = F.pred('F', X), Fy = F.pred('F', Y);

function children(t) {
  if (!t || typeof t !== 'object') return [];
  switch (t.op) {
    case 'mp': return [t.a, t.b];
    case 'subst':
    case 'gen':
    case 'allE':
    case 'existsI':
    case 'andE':
    case 'iffE':
    case 'orI': return [t.of];
    case 'existsE': return [t.ex, t.imp];
    case 'orE': return [t.or, t.ca, t.cb];
    case 'andI':
    case 'iffI': return [t.a, t.b];
    case 'eqSubst': return [t.eq, t.of];
    default: return [];
  }
}
function nodesOf(t) {
  if (!t || typeof t !== 'object') return 0;
  return 1 + children(t).reduce((s, c) => s + nodesOf(c), 0);
}
function check(t, p) {
  if (!t || typeof t !== 'object') throw new Error('bad proof node at ' + p);
  if (!t.op) throw new Error('missing op at ' + p);
  children(t).forEach((k, i) => check(k, p + '.' + i));
}

/* *58：x=y → (¬F(x)→¬F(y)) = *54 与逆否 *9 的 HS。 */
const H58 = eq(X, Y);
const mid58 = F.imp(Fy, Fx);
const res58 = F.imp(F.not(Fx), F.not(Fy));
const p54 = D.leaf(P.thm(54), F.imp(H58, mid58));
const contra9 = D.leaf(P.subst(P.thm(9), { atoms: { P: Fy, Q: Fx } }), F.imp(mid58, res58));
const hs58 = D.leaf(P.subst(P.thm(5), { atoms: { P: H58, Q: mid58, R: res58 } }),
  F.imp(F.imp(H58, mid58), F.imp(F.imp(mid58, res58), F.imp(H58, res58))));
const proof58 = D.mpp(contra9, D.mpp(p54, hs58)).t;
const target58 = F.imp(H58, res58);

/* *59：x=y → ((x=x→F(x)) → (y=y→F(y)))。 */
const H59 = eq(X, Y);
const A59 = F.imp(eq(X, X), Fx);
const B59 = F.imp(eq(Y, Y), Fy);
const proof59 = (() => {
  const hH = D.hyp(H59);
  const hA = D.hyp(A59);
  const p53 = D.leaf(P.thm(53), F.imp(H59, F.imp(Fx, Fy)));
  const fxToFy = D.mpp(p53, hH);
  const xx = D.leaf(P.eqRefl('x'), eq(X, X));
  const fx = D.mpp(hA, xx);
  const fy = D.mpp(fxToFy, fx);
  const a1 = D.leaf(P.subst(P.ax('A1'), { atoms: { P: Fy, Q: eq(Y, Y) } }),
    F.imp(Fy, F.imp(eq(Y, Y), Fy)));
  const yToFy = D.mpp(fy, a1);
  const afterA = D.dt(yToFy, A59);
  return D.dt(afterA, H59).t;
})();
const target59 = F.imp(H59, F.imp(A59, B59));

/* *60：x=y → (B→B)，B = ∀z z=z；只靠 *1 + A1。 */
const H60 = eq(X, Y);
const B60 = F.all('z', eq(Z, Z));
const proof60 = (() => {
  const id = D.leaf(P.subst(P.thm(1), { atoms: { P: B60 } }), F.imp(B60, B60));
  const a1 = D.leaf(P.subst(P.ax('A1'), { atoms: { P: F.imp(B60, B60), Q: H60 } }),
    F.imp(F.imp(B60, B60), F.imp(H60, F.imp(B60, B60))));
  return D.mpp(id, a1).t;
})();
const target60 = F.imp(H60, F.imp(B60, B60));

/* *63：x=y → ((F(x)→F(x)) → (F(y)→F(y)))，只靠 *1 + A1 + *8。 */
const H63 = eq(X, Y);
const A63 = F.imp(Fx, Fx);
const B63 = F.imp(Fy, Fy);
const proof63 = (() => {
  const idB = D.leaf(P.subst(P.thm(1), { atoms: { P: Fy } }), B63);
  const a1a = D.leaf(P.subst(P.ax('A1'), { atoms: { P: B63, Q: H63 } }),
    F.imp(B63, F.imp(H63, B63)));
  const hB = D.mpp(idB, a1a);
  const a1b = D.leaf(P.subst(P.ax('A1'), { atoms: { P: F.imp(H63, B63), Q: A63 } }),
    F.imp(F.imp(H63, B63), F.imp(A63, F.imp(H63, B63))));
  const aHB = D.mpp(a1b, hB);
  const perm = D.leaf(P.subst(P.thm(8), { atoms: { P: A63, Q: H63, R: B63 } }),
    F.imp(F.imp(A63, F.imp(H63, B63)), F.imp(H63, F.imp(A63, B63))));
  return D.mpp(perm, aHB).t;
})();
const target63 = F.imp(H63, F.imp(A63, B63));

const entries = [
  { no: 58, title: '否定替换', teaches: 'x=y 时 ¬F(x) 与 ¬F(y) 等价：从反向替换接逆否，不再直接接 Leibniz。',
    hint: '先用 *54 得到 F(y)→F(x)，再套逆否定理 *9 得到 ¬F(x)→¬F(y)，最后用 HS 串起 x=y。',
    target: target58, proof: proof58 },
  { no: 59, title: '条件替换', teaches: 'x=y 时 (x=x→F(x)) 与 (y=y→F(y)) 等价：用自反式与前件插入。',
    hint: '假设 x=y 与 x=x→F(x)：由等词自反得 x=x，配合 *53 得 F(y)，再用 A1 补出 y=y→F(y)；两次 DT。',
    target: target59, proof: proof59 },
  { no: 60, title: '不含 x 的公式', teaches: '公式里没有占位变元时替换不改变它：用同一律 + A1 插入前件。',
    hint: '先取 B→B（同一律实例），再用 A1 把 x=y 插到前面。',
    target: target60, proof: proof60 },
  { no: 63, title: '自反条件替换', teaches: 'x=y 时 (F(x)→F(x)) 与 (F(y)→F(y)) 等价：完全是命题演算的组合。',
    hint: '由同一律得 F(y)→F(y)，A1 插入 x=y 与 F(x)→F(x)，再用前件重排 *8。',
    target: target63, proof: proof63 }
];

const all = [proof58, proof59, proof60, proof63];
all.forEach((p, i) => check(p, 'proof' + i));

const file = path.join(ROOT, 'campaign', 'chapter3.json');
const levels = JSON.parse(fs.readFileSync(file, 'utf8'));
entries.forEach((e) => {
  const idx = levels.findIndex((lv) => lv.no === e.no);
  if (idx < 0) throw new Error('level ' + e.no + ' not found');
  levels[idx] = {
    no: e.no,
    chapter: 2,
    title: e.title,
    teaches: e.teaches,
    hint: e.hint,
    targetTokens: ['|-'].concat(e.target),
    proof: e.proof,
    stats: { nodes: nodesOf(e.proof) }
  };
  console.log('*' + e.no, 'nodes', nodesOf(e.proof), 'target', e.target.join(' ').slice(0, 120));
});
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('replaced *58/*59/*60/*63 with composed proofs');
