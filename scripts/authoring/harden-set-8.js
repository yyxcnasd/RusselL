#!/usr/bin/env node
'use strict';
/* 第Ⅳ章 *94–*96：从配对公理推出“同时含两个给定集合的集合”（没有无序对语法，
 * 所以用 ∃u(x∈u ∧ y∈u) 表达）。每关都用 ∃E 消去配对公理的存在量词，
 * 逐点用 ∀E + ∨I + ↔E 拿到成员资格，最后用 ∧I / ∃I 重建结论。 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');
const D = require('./dt.js');

const X = F.term('x'), Y = F.term('y'), Z = F.term('z'), U = F.term('u');
const eq = (a, b) => F.pred('=', a, b);
const mem = (a, b) => F.mem(a, b);
const AOF = F.all('z', F.iff(F.or(eq(Z, X), eq(Z, Y)), mem(Z, U))); // 配对公理内层

/* 假设 A(u)：∀z((z=x∨z=y)↔z∈u)，取出成员 t∈u。 */
function memberOf(h, t) {
  const orT = F.or(eq(t, X), eq(t, Y));
  const iffT = F.iff(orT, mem(t, U));
  const inst = D.leaf(P.allInst(F.iff(F.or(eq(Z, X), eq(Z, Y)), mem(Z, U)), 'z', t[0]),
    F.imp(AOF, iffT));
  const it = D.mpp(inst, h);
  const elim = D.leaf(P.iffElimAx(orT, mem(t, U), 'lr'),
    F.imp(iffT, F.imp(orT, mem(t, U))));
  const imp = D.mpp(elim, it);                             // (t=x∨t=y) → t∈u
  const refl = D.leaf(P.eqRefl(t[0]), eq(t, t));
  const side = String(t[0]) === 'x' ? 'l' : 'r';
  const intro = D.leaf(P.orIntroAx(eq(t, X), eq(t, Y), side), F.imp(eq(t, t), orT));
  return D.mpp(D.mpp(intro, refl), imp);                   // t∈u
}

function pairBase() { return P.setPair('x', 'y'); }

function buildSingle(t) {
  const h = D.hyp(AOF);
  const tin = memberOf(h, t);
  const B = F.exists('u', mem(t, U));
  const gen = D.leaf(P.existsGen(mem(t, U), 'u', 'u'), F.imp(mem(t, U), B));
  const bx = D.mpp(gen, tin);
  const after = D.dt(bx, AOF);
  const ex = P.existsE(pairBase(), after.t);
  return P.gen(P.gen(ex, 'y'), 'x');
}

function buildBoth() {
  const h = D.hyp(AOF);
  const xin = memberOf(h, X);
  const yin = memberOf(h, Y);
  const C = F.and(mem(X, U), mem(Y, U));
  const ai = D.leaf(P.andIntroAx(mem(X, U), mem(Y, U)),
    F.imp(mem(X, U), F.imp(mem(Y, U), C)));
  const conj = D.mpp(D.mpp(ai, xin), yin);
  const B = F.exists('u', C);
  const gen = D.leaf(P.existsGen(C, 'u', 'u'), F.imp(C, B));
  const bx = D.mpp(gen, conj);
  const after = D.dt(bx, AOF);
  const ex = P.existsE(pairBase(), after.t);
  return P.gen(P.gen(ex, 'y'), 'x');
}

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

const lv94 = buildSingle(X);
const lv95 = buildSingle(Y);
const lv96 = buildBoth();
[lv94, lv95, lv96].forEach((p, i) => { check(p, 'lv' + (94 + i)); });

const target94 = F.all('x', F.all('y', F.exists('u', mem(X, U))));
const target95 = F.all('x', F.all('y', F.exists('u', mem(Y, U))));
const target96 = F.all('x', F.all('y', F.exists('u', F.and(mem(X, U), mem(Y, U)))));

const file = path.join(ROOT, 'campaign', 'chapter4.json');
const levels = JSON.parse(fs.readFileSync(file, 'utf8'));
const entries = [
  { no: 94, title: '配对集含左元', teaches: '配对公理保证 x 属于某个集合：∀x∀y∃u(x∈u)。',
    hint: '从配对公理取 u，全称例化到 x，用 x=x∨x=y 与 ↔E 得到 x∈u，再 ∃I/∃E 与全称推广。',
    target: target94, proof: lv94 },
  { no: 95, title: '配对集含右元', teaches: '配对集同样含 y：∀x∀y∃u(y∈u)。',
    hint: '同左元，但用 y=y 从析取的右支进入。',
    target: target95, proof: lv95 },
  { no: 96, title: '综合：配对给出公共容器', teaches: '任意两个集合同属某个集合：∀x∀y∃u(x∈u ∧ y∈u)。',
    hint: '在同一个配对集 u 上分别取 x∈u、y∈u，用 ∧I 合并，再用 ∃I 收束；两次存在消去。',
    target: target96, proof: lv96 }
];
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
  console.log('*' + e.no, 'nodes', nodesOf(e.proof), 'target', e.target.join(' ').slice(0, 110));
});
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('replaced *94–*96 with pair-membership derivations');
