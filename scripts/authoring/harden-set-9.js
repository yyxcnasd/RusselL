#!/usr/bin/env node
'use strict';
/* 第Ⅳ章 *81/*86/*92：把三个“公理实例/闭包”关换成组合证明：
 *   *81 外延的等价刻画      x=y ↔ ∀z(z∈x↔z∈y)（EXT + *66 + ↔I）
 *   *86 等词的双向同余      x=y → (x=z↔y=z)（Leibniz 两个方向 + *51 + HS + ↔I + DT）
 *   *92 属于替换的双向版    x=y → (x∈z↔y∈z)（同上，作用于 ∈）
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');
const T = require('../../src/term.js');
const D = require('./dt.js');

const X = F.term('x'), Y = F.term('y'), Z = F.term('z');
const eq = (a, b) => F.pred('=', a, b);
const mem = (a, b) => F.mem(a, b);

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

/* 在假设 H 下，用 Leibniz 正反两个方向 + 对称性，得到 H → (A↔B) 的闭合证明项。 */
function congruence(H, A, B, fwdFormula, revFormula, symFormula) {
  const h = D.hyp(H);
  const fwd = D.mpp(D.leaf(P.leibniz('x', 'y', fwdFormula.formula, { mode: 'replace' }), fwdFormula.thm), h);
  const revH = (() => {
    const revLeaf = D.leaf(P.leibniz('y', 'x', revFormula.formula, { mode: 'replace' }), revFormula.thm);
    const chain = D.leaf(P.subst(P.thm(5), { atoms: { P: H, Q: eq(Y, X), R: F.imp(B, A) } }),
      F.imp(F.imp(H, eq(Y, X)), F.imp(F.imp(eq(Y, X), F.imp(B, A)), F.imp(H, F.imp(B, A)))));
    const sym = D.leaf(P.thm(51), symFormula);
    return D.mpp(revLeaf, D.mpp(sym, chain));
  })();
  const rev = D.mpp(revH, h);
  const ii = D.leaf(P.iffIntroAx(A, B), F.imp(F.imp(A, B), F.imp(F.imp(B, A), F.iff(A, B))));
  const iff = D.mpp(D.mpp(ii, fwd), rev);
  return D.dt(iff, H).t;
}

/* *81：外延的等价刻画。A = x=y，B = ∀z(z∈x↔z∈y)。 */
const A81 = eq(X, Y);
const B81 = F.all('z', F.iff(mem(Z, X), mem(Z, Y)));
const fwd81 = D.leaf(P.thm(66), F.imp(A81, B81));
const ext81 = D.leaf(P.setExt('x', 'y'), F.imp(B81, A81));
const ii81 = D.leaf(P.iffIntroAx(A81, B81), F.imp(F.imp(A81, B81), F.imp(F.imp(B81, A81), F.iff(A81, B81))));
const iff81 = D.mpp(D.mpp(ii81, fwd81), ext81);
const proof81 = P.gen(P.gen(iff81.t, 'y'), 'x');
const target81 = F.all('x', F.all('y', F.iff(A81, B81)));

/* *86：等词的双向同余 x=y → (x=z↔y=z)。 */
const H86 = eq(X, Y), A86 = eq(X, Z), B86 = eq(Y, Z);
const proof86 = P.gen(P.gen(
  congruence(H86, A86, B86,
    { formula: eq(X, Z), thm: F.imp(H86, F.imp(A86, B86)) },
    { formula: eq(Y, Z), thm: F.imp(eq(Y, X), F.imp(B86, A86)) },
    F.imp(H86, eq(Y, X))),
  'y'), 'x');
const target86 = F.all('x', F.all('y', F.imp(H86, F.iff(A86, B86))));

/* *92：属于替换的双向版 x=y → (x∈z↔y∈z)。 */
const H92 = eq(X, Y), A92 = mem(X, Z), B92 = mem(Y, Z);
const proof92 = P.gen(P.gen(P.gen(
  congruence(H92, A92, B92,
    { formula: mem(X, Z), thm: F.imp(H92, F.imp(A92, B92)) },
    { formula: mem(Y, Z), thm: F.imp(eq(Y, X), F.imp(B92, A92)) },
    F.imp(H92, eq(Y, X))),
  'z'), 'y'), 'x');
const target92 = F.all('x', F.all('y', F.all('z', F.imp(H92, F.iff(A92, B92)))));

/* *93：y=z → (x∈y↔x∈z)。反向需要 z=y；用 *56（全称对称）两次 A4 例化得到
 * u=z→z=u，再用代入规则改名 u→y；随后 Leibniz 两个方向 + HS + ↔I，DT 消去假设。 */
const wff = (b) => ['wff'].concat(b);
const sub = (body, v, t) => T.body(T.substituteVar(wff(body), v, t));
const body56 = F.all('y', F.imp(eq(X, Y), eq(Y, X)));
const U = F.term('u');
const inst1 = sub(body56, 'x', 'u');                 // ∀y(u=y→y=u)
const body1 = inst1.slice(2);
const inst2 = sub(body1, 'y', 'z');                  // u=z→z=u
const ax1 = D.leaf(P.allInst(body56, 'x', 'u'), F.imp(F.all('x', body56), inst1));
const thm56 = D.leaf(P.thm(56), F.all('x', body56));
const s1 = D.mpp(ax1, thm56);
const ax2 = D.leaf(P.allInst(body1, 'y', 'z'), F.imp(inst1, inst2));
const s2 = D.mpp(ax2, s1);
const symYZ = D.leaf(P.subst(s2.t, { vars: { u: 'y' } }), F.imp(eq(Y, Z), eq(Z, Y)));

const H93 = eq(Y, Z), A93 = mem(X, Y), B93 = mem(X, Z);
const h93 = D.hyp(H93);
const fwd93 = D.mpp(D.leaf(P.leibniz('y', 'z', mem(X, Y), { mode: 'replace' }),
  F.imp(H93, F.imp(A93, B93))), h93);
const revLeaf93 = D.leaf(P.leibniz('z', 'y', mem(X, Z), { mode: 'replace' }),
  F.imp(eq(Z, Y), F.imp(B93, A93)));
const chain93 = D.leaf(P.subst(P.thm(5), { atoms: { P: H93, Q: eq(Z, Y), R: F.imp(B93, A93) } }),
  F.imp(F.imp(H93, eq(Z, Y)), F.imp(F.imp(eq(Z, Y), F.imp(B93, A93)), F.imp(H93, F.imp(B93, A93)))));
const revH93 = D.mpp(revLeaf93, D.mpp(symYZ, chain93));
const rev93 = D.mpp(revH93, h93);
const ii93 = D.leaf(P.iffIntroAx(A93, B93),
  F.imp(F.imp(A93, B93), F.imp(F.imp(B93, A93), F.iff(A93, B93))));
const iff93 = D.mpp(D.mpp(ii93, fwd93), rev93);
const proof93 = P.gen(P.gen(P.gen(D.dt(iff93, H93).t, 'x'), 'z'), 'y');
const target93 = F.all('y', F.all('z', F.all('x', F.imp(H93, F.iff(A93, B93)))));

const entries = [
  { no: 81, title: '外延的等价刻画', teaches: 'x=y 与 ∀z(z∈x↔z∈y) 互相蕴涵：外延公理加上等词→元素等价。',
    hint: '正向引用 *66；反向直接接外延公理；再用 ↔I 合成等价并全称推广。',
    target: target81, proof: proof81 },
  { no: 86, title: '等词的双向同余', teaches: 'x=y 使 x=z 与 y=z 等价：两个 Leibniz 方向 + 对称性。',
    hint: '正向用 Leibniz(x→y)，反向先用对称性得到 y=x 再用 Leibniz(y→x)；↔I 合成后 DT 消去假设。',
    target: target86, proof: proof86 },
  { no: 92, title: '属于替换的双向版', teaches: 'x=y 使 x∈z 与 y∈z 等价：Leibniz 两个方向合成 ↔。',
    hint: '同 *86，但替换作用在 ∈ 的左项；正向和反向各接一条 Leibniz 公理。',
    target: target92, proof: proof92 },
  { no: 93, title: '三层等词链（双向）', teaches: 'y=z 使 x∈y 与 x∈z 等价：先例化 *56 取得 z=y，再走两个 Leibniz 方向。',
    hint: '反向需要 z=y：把 *56 连续例化两次；再用 Leibniz 两个方向、HS 与 ↔I，最后 DT 消去 y=z。',
    target: target93, proof: proof93 }
];

const all = [proof81, proof86, proof92, proof93];
all.forEach((p, i) => check(p, 'proof' + i));

const file = path.join(ROOT, 'campaign', 'chapter4.json');
const levels = JSON.parse(fs.readFileSync(file, 'utf8'));
entries.forEach((e) => {
  const idx = levels.findIndex((lv) => lv.no === e.no);
  if (idx < 0) throw new Error('level ' + e.no + ' not found');
  levels[idx] = {
    no: e.no,
    chapter: 3,
    title: e.title,
    teaches: e.teaches,
    hint: e.hint,
    targetTokens: ['|-'].concat(e.target),
    proof: e.proof,
    stats: { nodes: nodesOf(e.proof) }
  };
  console.log('*' + e.no, 'nodes', nodesOf(e.proof), 'target', e.target.join(' ').slice(0, 130));
});
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('replaced *81/*86/*92 with combination proofs');
