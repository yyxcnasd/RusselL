#!/usr/bin/env node
'use strict';
/* 第Ⅲ章：把“全称闭包/直接接规则”的教学关改成组合结论（目标可改的关卡）。
 *   *50 自反式合并        x=x ∧ y=y（eq-refl + ∧I*）
 *   *56 对称的双向结论    x=y → (x=y ∧ y=x)（*51 + ∧I* + DT）
 *   *61 谓词替换（双向）  x=y → (F(x)↔F(y))（*53+*54+↔I+DT+∀I）
 *   *67 传递后的谓词替换  x=y → (y=z → (F(x)→F(z)))（*52 + Leibniz + DT）
 *   *68 复合替换（双向）  x=y → ((F(x)→G(x))↔(F(y)→G(y)))（*57 + *51 + Leibniz + HS + ↔I + DT）
 *   *69 全称等词替换      x=y → (∀z z=x → ∀z z=y)（∀E + Leibniz + ∀I + *64 + DT）
 *   *71 嵌套全称替换      x=y → (∀z x=z → ∀z y=z)（同上）
 *   *72 深层替换（双向）  x=y → ((F(x)→(G(x)→F(x)))↔(F(y)→(G(y)→F(y))))
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
const Fz = F.pred('F', Z);
const Gx = F.pred('G', X), Gy = F.pred('G', Y);

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
function hsimp(H, P1, Q, R) {
  return D.leaf(P.subst(P.thm(5), { atoms: { P: H, Q, R } }),
    F.imp(F.imp(H, Q), F.imp(F.imp(Q, R), F.imp(H, R))));
}

/* *50：∀x∀y(x=x ∧ y=y)。 */
const proof50 = (() => {
  const ai = D.leaf(P.andIntroAx(eq(X, X), eq(Y, Y)),
    F.imp(eq(X, X), F.imp(eq(Y, Y), F.and(eq(X, X), eq(Y, Y)))));
  const conj = D.mpp(D.mpp(ai, D.leaf(P.eqRefl('x'), eq(X, X))),
    D.leaf(P.eqRefl('y'), eq(Y, Y)));
  return P.gen(P.gen(conj.t, 'y'), 'x');
})();
const target50 = F.all('x', F.all('y', F.and(eq(X, X), eq(Y, Y))));

/* *56：∀x∀y(x=y → (x=y ∧ y=x))。 */
const proof56 = (() => {
  const H = eq(X, Y);
  const h = D.hyp(H);
  const sym = D.mpp(D.leaf(P.thm(51), F.imp(H, eq(Y, X))), h);
  const ai = D.leaf(P.andIntroAx(H, eq(Y, X)),
    F.imp(H, F.imp(eq(Y, X), F.and(H, eq(Y, X)))));
  const conj = D.mpp(D.mpp(ai, h), sym);
  return P.gen(P.gen(D.dt(conj, H).t, 'y'), 'x');
})();
const target56 = F.all('x', F.all('y', F.imp(eq(X, Y), F.and(eq(X, Y), eq(Y, X)))));

/* *61：∀x∀y(x=y → (F(x)↔F(y)))。 */
const proof61 = (() => {
  const H = eq(X, Y);
  const h = D.hyp(H);
  const fwd = D.mpp(D.leaf(P.thm(53), F.imp(H, F.imp(Fx, Fy))), h);
  const rev = D.mpp(D.leaf(P.thm(54), F.imp(H, F.imp(Fy, Fx))), h);
  const ii = D.leaf(P.iffIntroAx(Fx, Fy), F.imp(F.imp(Fx, Fy), F.imp(F.imp(Fy, Fx), F.iff(Fx, Fy))));
  const iff = D.mpp(D.mpp(ii, fwd), rev);
  return P.gen(P.gen(D.dt(iff, H).t, 'y'), 'x');
})();
const target61 = F.all('x', F.all('y', F.imp(eq(X, Y), F.iff(Fx, Fy))));

/* *67：∀x∀y∀z(x=y → (y=z → (F(x)→F(z))))。 */
const proof67 = (() => {
  const H1 = eq(X, Y), H2 = eq(Y, Z);
  const h1 = D.hyp(H1), h2 = D.hyp(H2);
  const tr = D.mpp(D.mpp(D.leaf(P.thm(52), F.imp(H1, F.imp(H2, eq(X, Z)))), h1), h2);
  const leib = D.leaf(P.leibniz('x', 'z', Fx, { mode: 'replace' }),
    F.imp(eq(X, Z), F.imp(Fx, Fz)));
  const fx = D.mpp(leib, tr);
  const step2 = D.dt(fx, H2);
  return P.gen(P.gen(P.gen(D.dt(step2, H1).t, 'z'), 'y'), 'x');
})();
const target67 = F.all('x', F.all('y', F.all('z', F.imp(eq(X, Y), F.imp(eq(Y, Z), F.imp(Fx, Fz))))));

/* *68：∀x∀y(x=y → ((F(x)→G(x))↔(F(y)→G(y))))。 */
const proof68 = (() => {
  const H = eq(X, Y), A = F.imp(Fx, Gx), B = F.imp(Fy, Gy);
  const h = D.hyp(H);
  const fwd = D.mpp(D.leaf(P.thm(57), F.imp(H, F.imp(A, B))), h);
  const symH = D.leaf(P.thm(51), F.imp(H, eq(Y, X)));
  const revLeaf = D.leaf(P.leibniz('y', 'x', B, { mode: 'replace' }),
    F.imp(eq(Y, X), F.imp(B, A)));
  const revH = D.mpp(revLeaf, D.mpp(symH, hsimp(H, null, eq(Y, X), F.imp(B, A))));
  const rev = D.mpp(revH, h);
  const ii = D.leaf(P.iffIntroAx(A, B), F.imp(F.imp(A, B), F.imp(F.imp(B, A), F.iff(A, B))));
  const iff = D.mpp(D.mpp(ii, fwd), rev);
  return P.gen(P.gen(D.dt(iff, H).t, 'y'), 'x');
})();
const target68 = F.all('x', F.all('y', F.imp(eq(X, Y), F.iff(F.imp(Fx, Gx), F.imp(Fy, Gy)))));

/* *69：x=y → (∀z z=x → ∀z z=y)。内部全称替换，用 *64 收口。 */
const proof69 = (() => {
  const H = eq(X, Y), K = F.all('z', eq(Z, X)), Bz = eq(Z, Y);
  const h = D.hyp(H), k = D.hyp(K);
  const inst = D.mpp(D.leaf(P.allInst(eq(Z, X), 'z', 'z'), F.imp(K, eq(Z, X))), k);
  const leib = D.mpp(D.leaf(P.leibniz('x', 'y', eq(Z, X), { mode: 'replace' }),
    F.imp(H, F.imp(eq(Z, X), Bz))), h);
  const zy = D.mpp(leib, inst);
  const g = D.gen(zy, 'z');
  const afterK = D.dt(g, K);
  return D.dt(afterK, H).t;
})();
const target69 = F.imp(eq(X, Y), F.imp(F.all('z', eq(Z, X)), F.all('z', eq(Z, Y))));

/* *71：x=y → (∀z x=z → ∀z y=z)。 */
const proof71 = (() => {
  const H = eq(X, Y), K = F.all('z', eq(X, Z)), Bz = eq(Y, Z);
  const h = D.hyp(H), k = D.hyp(K);
  const inst = D.mpp(D.leaf(P.allInst(eq(X, Z), 'z', 'z'), F.imp(K, eq(X, Z))), k);
  const leib = D.mpp(D.leaf(P.leibniz('x', 'y', eq(X, Z), { mode: 'replace' }),
    F.imp(H, F.imp(eq(X, Z), Bz))), h);
  const zy = D.mpp(leib, inst);
  const g = D.gen(zy, 'z');
  return D.dt(D.dt(g, K), H).t;
})();
const target71 = F.imp(eq(X, Y), F.imp(F.all('z', eq(X, Z)), F.all('z', eq(Y, Z))));

/* *72：x=y → ((F(x)→(G(x)→F(x))) ↔ (F(y)→(G(y)→F(y))))。 */
const proof72 = (() => {
  const H = eq(X, Y);
  const A = F.imp(Fx, F.imp(Gx, Fx)), B = F.imp(Fy, F.imp(Gy, Fy));
  const h = D.hyp(H);
  const fwd = D.mpp(D.leaf(P.leibniz('x', 'y', A, { mode: 'replace' }),
    F.imp(H, F.imp(A, B))), h);
  const symH = D.leaf(P.thm(51), F.imp(H, eq(Y, X)));
  const revLeaf = D.leaf(P.leibniz('y', 'x', B, { mode: 'replace' }),
    F.imp(eq(Y, X), F.imp(B, A)));
  const revH = D.mpp(revLeaf, D.mpp(symH, hsimp(H, null, eq(Y, X), F.imp(B, A))));
  const rev = D.mpp(revH, h);
  const ii = D.leaf(P.iffIntroAx(A, B), F.imp(F.imp(A, B), F.imp(F.imp(B, A), F.iff(A, B))));
  const iff = D.mpp(D.mpp(ii, fwd), rev);
  return D.dt(iff, H).t;
})();
const target72 = F.imp(eq(X, Y), F.iff(F.imp(Fx, F.imp(Gx, Fx)), F.imp(Fy, F.imp(Gy, Fy))));

const entries = [
  { no: 50, title: '自反式合并', teaches: '两条自反式可以合成合取：∀x∀y(x=x ∧ y=y)。',
    hint: '分别用等词自反取 x、y，再用 ∧I* 合并，最后全称推广。',
    target: target50, proof: proof50 },
  { no: 56, title: '对称的双向结论', teaches: 'x=y 同时给出 y=x 与 x=y 本身。',
    hint: '用 *51 得到 y=x，再与假设本身用 ∧I* 合并；DT 消去假设后全称推广。',
    target: target56, proof: proof56 },
  { no: 61, title: '谓词替换（双向）', teaches: '∀x∀y(x=y → (F(x)↔F(y)))：两个方向的替换合起来是等价。',
    hint: '*53 给正向、*54 给反向，用 ↔I 合成，DT 消去 x=y 后全称推广。',
    target: target61, proof: proof61 },
  { no: 67, title: '传递后的谓词替换', teaches: 'x=y、y=z 先推出 x=z，再把它用于谓词替换。',
    hint: '先用 *52 得到 x=z，再用 Leibniz 把 F(x) 换成 F(z)；两次 DT 后全称推广。',
    target: target67, proof: proof67 },
  { no: 68, title: '复合替换（双向）', teaches: 'x=y 时 F(x)→G(x) 与 F(y)→G(y) 等价。',
    hint: '正向引用 *57；反向先用 *51 得到 y=x，再 Leibniz 反向替换；↔I 后 DT。',
    target: target68, proof: proof68 },
  { no: 69, title: '全称等词替换', teaches: 'x=y → (∀z z=x → ∀z z=y)：替换进入全称内部。',
    hint: '从 ∀z z=x 全称例化到 z，用 Leibniz 换成 z=y，再全称推广；假设用 DT 分两层消去。',
    target: target69, proof: proof69 },
  { no: 71, title: '嵌套全称替换', teaches: 'x=y → (∀z x=z → ∀z y=z)：替换全称式的另一侧。',
    hint: '同 *69，但 Leibniz 作用在 x=z 的左侧。',
    target: target71, proof: proof71 },
  { no: 72, title: '深层替换（双向）', teaches: '深层公式里的 x 也可以双向替换。',
    hint: '正向 Leibniz 直接替换；反向先对称再 Leibniz；↔I 后 DT。',
    target: target72, proof: proof72 }
];

const all = [proof50, proof56, proof61, proof67, proof68, proof69, proof71, proof72];
all.forEach((p, i) => check(p, 'proof' + entries[i].no));

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
console.log('replaced *50/*56/*61/*67/*68/*69/*71/*72 with composed proofs');
