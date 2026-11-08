#!/usr/bin/env node
'use strict';
/* 第Ⅳ章（集合论，24 关）：∈ + 外延/空集/配对/并集，手写目标/顺序/提示。 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');

const X = F.term('x'), Y = F.term('y'), Z = F.term('z');
const eq = (a, b) => F.pred('=', a, b);
const mem = (a, b) => F.mem(a, b);
const genN = (proof, vars) => vars.slice().reverse().reduce((acc, v) => P.gen(acc, v), proof);
const rep = { mode: 'replace' };
const L = (x, y, f) => P.leibniz(x, y, f, rep);

const levels = [];
function add(no, title, teaches, hint, target, proof) {
  levels.push({ no, chapter: 3, title, teaches, hint, targetTokens: ['|-'].concat(target), proof, stats: {} });
}

add(73, '属于自反', '任何集合都包含自己的每个元素：x∈y→x∈y。', '用同一律实例再全称推广。',
  F.all('x', F.imp(mem(X, Y), mem(X, Y))), P.gen(P.subst(P.thm(1), { atoms: { P: mem(X, Y) } }), 'x'));

add(74, '集合自反', '∀x x=x。', '等词自反 + 全称推广。', F.all('x', eq(X, X)), P.gen(P.eqRefl('x'), 'x'));

add(75, '等词自反式', '∀x∀y(x=y→x=y)。', '对同一律实例全称推广。',
  F.all('x', F.all('y', F.imp(eq(X, Y), eq(X, Y)))),
  genN(P.subst(P.thm(1), { atoms: { P: eq(X, Y) } }), ['x', 'y']));

add(76, '属于替换（左）', 'x=y 时 x∈z 与 y∈z 不可区分。', 'Leibniz 直接替换模式。',
  F.all('x', F.all('y', F.imp(eq(X, Y), F.imp(mem(X, Z), mem(Y, Z))))),
  genN(L('x', 'y', mem(X, Z)), ['x', 'y']));

add(77, '属于替换（同集）', 'x=y 时 x∈y 与 y∈y 不可区分。', 'Leibniz 替换。',
  F.all('x', F.all('y', F.imp(eq(X, Y), F.imp(mem(X, Y), mem(Y, Y))))),
  genN(L('x', 'y', mem(X, Y)), ['x', 'y']));

add(78, '属于替换（反向）', 'x=y 时 y∈x 与 y∈y 不可区分。', 'Leibniz 替换。',
  F.all('x', F.all('y', F.imp(eq(X, Y), F.imp(mem(Y, X), mem(Y, Y))))),
  genN(L('x', 'y', mem(Y, X)), ['x', 'y']));

add(79, '空集', '存在不含任何元素的集合：∃z∀x¬(x∈z)。', '直接使用空集公理。',
  F.exists('z', F.all('x', F.not(mem(X, Z)))), P.setEmpty());

add(80, '外延公理（全称）', '∀x∀y((∀z(z∈x↔z∈y))→x=y)。', '外延公理 + 全称推广。',
  F.all('x', F.all('y', F.imp(F.all('z', F.iff(mem(Z, X), mem(Z, Y))), eq(X, Y)))),
  genN(P.setExt('x', 'y'), ['x', 'y']));

add(81, '外延公理（实例）', '(∀z(z∈x↔z∈y))→x=y。', '直接使用外延公理。',
  F.imp(F.all('z', F.iff(mem(Z, X), mem(Z, Y))), eq(X, Y)), P.setExt('x', 'y'));

add(82, '配对公理（全称）', '∀x∀y∃u∀z((z=x∨z=y)↔z∈u)。', '配对公理 + 全称推广。',
  F.all('x', F.all('y', F.exists('u', F.all('z', F.iff(F.or(eq(Z, X), eq(Z, Y)), mem(Z, F.term('u'))))))),
  genN(P.setPair('x', 'y'), ['x', 'y']));

add(83, '配对公理（实例）', '∃u∀z((z=x∨z=y)↔z∈u)。', '直接使用配对公理。',
  F.exists('u', F.all('z', F.iff(F.or(eq(Z, X), eq(Z, Y)), mem(Z, F.term('u'))))), P.setPair('x', 'y'));

add(84, '并集公理（全称）', '∀x∃y∀z((∃u(z∈u∧u∈x))↔z∈y)。', '并集公理 + 全称推广。',
  F.all('x', F.exists('y', F.all('z', F.iff(
    F.exists('u', F.and(mem(Z, F.term('u')), mem(F.term('u'), X))), mem(Z, F.term('y')))))),
  P.gen(P.setUnion('x'), 'x'));

add(85, '并集公理（实例）', '∃y∀z((∃u(z∈u∧u∈x))↔z∈y)。', '直接使用并集公理。',
  F.exists('y', F.all('z', F.iff(
    F.exists('u', F.and(mem(Z, F.term('u')), mem(F.term('u'), X))), mem(Z, F.term('y'))))),
  P.setUnion('x'));

add(86, '等词进入属于', 'x=y→(x=z→y=z)。', 'Leibniz 替换。',
  F.all('x', F.all('y', F.imp(eq(X, Y), F.imp(eq(X, Z), eq(Y, Z))))),
  genN(L('x', 'y', eq(X, Z)), ['x', 'y']));

add(87, '等词进入属于（全称）', '∀y∀z(y=z→(x∈y→x∈z))。', 'Leibniz 替换后全称推广。',
  F.all('y', F.all('z', F.imp(eq(Y, Z), F.imp(mem(X, Y), mem(X, Z))))),
  genN(L('y', 'z', mem(X, Y)), ['y', 'z']));

add(88, '等词进入属于（反向）', '∀y∀z(y=z→(y∈x→z∈x))。', 'Leibniz 替换。',
  F.all('y', F.all('z', F.imp(eq(Y, Z), F.imp(mem(Y, X), mem(Z, X))))),
  genN(L('y', 'z', mem(Y, X)), ['y', 'z']));

add(89, '外延（y,z）', '∀y∀z((∀x(x∈y↔x∈z))→y=z)。', '外延公理换变量。',
  F.all('y', F.all('z', F.imp(F.all('x', F.iff(mem(X, Y), mem(X, Z))), eq(Y, Z)))),
  genN(P.setExt('y', 'z'), ['y', 'z']));

add(90, '配对（y,x）', '∀y∀x∃u∀z((z=y∨z=x)↔z∈u)。', '配对公理换变量。',
  F.all('y', F.all('x', F.exists('u', F.all('z', F.iff(F.or(eq(Z, Y), eq(Z, X)), mem(Z, F.term('u'))))))),
  genN(P.setPair('y', 'x'), ['y', 'x']));

add(91, '并集（y）', '∀y∃u∀z((∃v(z∈v∧v∈y))↔z∈u)。', '并集公理换变量。',
  F.all('y', F.exists('u', F.all('z', F.iff(
    F.exists('v', F.and(mem(Z, F.term('v')), mem(F.term('v'), Y))), mem(Z, F.term('u')))))),
  P.gen(P.setUnion('y'), 'y'));

add(92, '三层属于替换', '∀x∀y∀z(x=y→(x∈z→y∈z))。', 'Leibniz 替换 + 三次全称推广。',
  F.all('x', F.all('y', F.all('z', F.imp(eq(X, Y), F.imp(mem(X, Z), mem(Y, Z)))))),
  genN(L('x', 'y', mem(X, Z)), ['x', 'y', 'z']));

add(93, '三层等词链', '∀y∀z(y=z→(x∈y→x∈z)) 的三层写法。', 'Leibniz 替换。',
  F.all('y', F.all('z', F.all('x', F.imp(eq(Y, Z), F.imp(mem(X, Y), mem(X, Z)))))),
  genN(L('y', 'z', mem(X, Y)), ['y', 'z', 'x']));

add(94, '等词自反式', '∀x(x=x→x=x)。', '同一律实例 + 全称推广。',
  F.all('x', F.imp(eq(X, X), eq(X, X))),
  P.gen(P.subst(P.thm(1), { atoms: { P: eq(X, X) } }), 'x'));

add(95, '属于同一', '∀x(x∈x→x∈x)。', '同一律实例 + 全称推广。',
  F.all('x', F.imp(mem(X, X), mem(X, X))),
  P.gen(P.subst(P.thm(1), { atoms: { P: mem(X, X) } }), 'x'));

add(96, '综合：外延与配对', '∀x∀y∃u∀z((z=x∨z=y)↔z∈u) 的另一个变量版本。', '配对公理换变量并全称推广。',
  F.all('x', F.all('z', F.exists('u', F.all('w', F.iff(F.or(eq(F.term('w'), X), eq(F.term('w'), Z)), mem(F.term('w'), F.term('u'))))))),
  genN(P.setPair('x', 'z'), ['x', 'z']));

fs.writeFileSync(path.join(ROOT, 'campaign', 'chapter4.json'), JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('written campaign/chapter4.json', levels.length, 'levels');
