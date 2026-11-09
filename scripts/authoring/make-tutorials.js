#!/usr/bin/env node
'use strict';
/* 教学关（不计入 *NN 编号，用小写罗马数字）：每关只演示一个元件。
 * 参考证明尽量一步直连；仅“分离”需要 A1/A2 的同一律小例子。
 * tip 是关卡浮窗的规则提示：只有代号与符号，不放汉字。 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');

const Pz = F.atom('P'), Qz = F.atom('Q'), Rz = F.atom('R');
const X = F.term('x'), Y = F.term('y'), Z = F.term('z');
const Fx = F.pred('F', X), Fy = F.pred('F', Y), Fz = F.pred('F', Z);
const E = (a, b) => F.pred('=', a, b);
const mem = (a, b) => F.mem(a, b);

/* 一次分离：A1 给出 P→(Q→P)，A2 把它接到 (P→Q)→(P→P)。 */
const mpTutorial = (() => {
  const a1 = P.subst(P.ax('A1'), { atoms: { P: Pz, Q: Qz } });
  const a2 = P.subst(P.ax('A2'), { atoms: { P: Pz, Q: Qz, R: Pz } });
  return P.mp(a1, a2);
})();

const levels = [];
function add(chapter, label, code, flow, title, target, proof) {
  levels.push({
    chapter,
    label,
    title,
    teaches: code + ' · ' + flow,
    hint: code + ' · ' + flow,
    tip: { code, flow },
    targetTokens: ['|-'].concat(target),
    proof
  });
}

/* 第Ⅰ章：公理 + 代入 + 分离。 */
add(0, 'i', 'A1', 'P → (Q → P)', '公理 A1', F.imp(Pz, F.imp(Qz, Pz)), P.ax('A1'));
add(0, 'ii', 'A2', '(P→(Q→R)) → ((P→Q)→(P→R))', '公理 A2',
  F.imp(F.imp(Pz, F.imp(Qz, Rz)), F.imp(F.imp(Pz, Qz), F.imp(Pz, Rz))), P.ax('A2'));
add(0, 'iii', 'A3', '(¬P→¬Q) → (Q→P)', '公理 A3',
  F.imp(F.imp(F.not(Pz), F.not(Qz)), F.imp(Qz, Pz)), P.ax('A3'));
add(0, 'iv', 'S', 'A[P↦B] ⇒ A′', '代入',
  F.imp(Qz, F.imp(Rz, Qz)), P.subst(P.ax('A1'), { atoms: { P: Qz, Q: Rz } }));
add(0, 'v', 'M', 'A · A→B ⇒ B', '分离',
  F.imp(F.imp(Pz, Qz), F.imp(Pz, Pz)), mpTutorial);

/* 第Ⅱ章：量词规则 + A5。 */
add(1, 'i', '∀*', 'A ⇒ A → ∀x A', '全称引入',
  F.imp(Pz, F.all('x', Pz)), P.shift(Pz, 'x'));
add(1, 'ii', '∀E*', '∀x A ⇒ A[t/x]', '全称例化',
  F.imp(F.all('x', Pz), Pz), P.allInst(Pz, 'x', 'x'));
add(1, 'iii', '∀I', 'A ⇒ ∀x A', '全称推广',
  F.all('x', F.imp(Pz, F.imp(Qz, Pz))), P.gen(P.ax('A1'), 'x'));
add(1, 'iv', '∃I*', 'A[t/x] ⇒ ∃x A', '存在推广',
  F.imp(Pz, F.exists('x', Pz)), P.existsGen(Pz, 'x', 'x'));
add(1, 'v', 'A5', '∀x(P→Q) ⇒ ∀xP → ∀xQ', '全称分配公理',
  F.imp(F.all('x', F.imp(Pz, Qz)), F.imp(F.all('x', Pz), F.all('x', Qz))), P.ax('A5', { v: 'x' }));

/* 第Ⅲ章：等词规则。 */
add(2, 'i', '=I', 't = t', '等词自反', E(X, X), P.eqRefl('x'));
add(2, 'ii', '=L', 'x=y ⇒ F(x) → F(y)', 'Leibniz 替换',
  F.imp(E(X, Y), F.imp(Fx, Fy)), P.leibniz('x', 'y', Fz, { mode: 'abstract', v: 'z' }));
add(2, 'iii', '=L', 'y=x ⇒ F(y) → F(x)', 'Leibniz 反向',
  F.imp(E(Y, X), F.imp(Fy, Fx)), P.leibniz('y', 'x', Fz, { mode: 'abstract', v: 'z' }));
add(2, 'iv', '=L', 'x=y ⇒ (x=z → y=z)', '等词替换（直接模式）',
  F.imp(E(X, Y), F.imp(E(X, Z), E(Y, Z))), P.leibniz('x', 'y', E(X, Z), { mode: 'replace' }));

/* 第Ⅳ章：集合论公理。 */
add(3, 'i', 'EXT', '∀z(z∈x↔z∈y) ⇒ x=y', '外延公理',
  F.imp(F.all('z', F.iff(mem(Z, X), mem(Z, Y))), E(X, Y)), P.setExt('x', 'y'));
add(3, 'ii', '∅', '∃z∀x ¬(x∈z)', '空集公理',
  F.exists('z', F.all('x', F.not(mem(X, Z)))), P.setEmpty());
add(3, 'iii', '{,}', '∃u∀z((z=x∨z=y) ↔ z∈u)', '配对公理',
  F.exists('u', F.all('z', F.iff(F.or(E(Z, X), E(Z, Y)), mem(Z, F.term('u'))))), P.setPair('x', 'y'));
add(3, 'iv', '∪', '∃y∀z((∃u(z∈u∧u∈x)) ↔ z∈y)', '并集公理',
  F.exists('y', F.all('z', F.iff(
    F.exists('u', F.and(mem(Z, F.term('u')), mem(F.term('u'), X))), mem(Z, F.term('y'))))), P.setUnion('x'));

const file = path.join(ROOT, 'campaign', 'tutorials.json');
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('written campaign/tutorials.json', levels.length, 'tutorials');
