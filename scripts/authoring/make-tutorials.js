#!/usr/bin/env node
'use strict';
/* 教学关（不计入 *NN 编号，用小写罗马数字）：每关只演示一个元件的用法。
 * 输出 campaign/tutorials.json；主线 96 关仍由 chapter*.json 维护。 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');

const Pz = F.atom('P'), Qz = F.atom('Q'), Rz = F.atom('R');
const X = F.term('x'), Y = F.term('y'), Z = F.term('z');
const Fz = F.pred('F', Z);
const E = (a, b) => F.pred('=', a, b);
const mem = (a, b) => F.mem(a, b);

/* 不引用任何 *NN 的同一律证明：A→A（A1 + A2 + 分离）。 */
function identity(A) {
  const AA = F.imp(A, A);
  const a1 = P.subst(P.ax('A1'), { atoms: { P: A, Q: AA } });       // A → (AA→A)
  const a2 = P.subst(P.ax('A2'), { atoms: { P: A, Q: AA, R: A } }); // (A→(AA→A))→((A→AA)→(A→A))
  const step = P.mp(a1, a2);                                        // (A→AA)→(A→A)
  const a1b = P.subst(P.ax('A1'), { atoms: { P: A, Q: A } });       // A→(A→A)
  return P.mp(a1b, step);                                           // A→A
}

const levels = [];
function add(chapter, label, title, teaches, hint, target, proof) {
  levels.push({ chapter, label, title, teaches, hint, targetTokens: ['|-'].concat(target), proof });
}

/* 第Ⅰ章：命题演算的入口元件。 */
add(0, 'i', '原子与同一律', '把原子 P 接到 → 的两端，得到 P→P；参考证明只用 A1/A2 + 分离。',
  '拖两个原子 P，用 → 连起来；再用公理 A1/A2 与分离拼出同一律。',
  F.imp(Pz, Pz), identity(Pz));
add(0, 'ii', '公理 A1', '直接接公理 A1，得到 P→(Q→P)。',
  '从元件栏取公理，选 A1，直接接到目标。', F.imp(Pz, F.imp(Qz, Pz)), P.ax('A1'));
add(0, 'iii', '代入', '用代入规则把 A1 里的 P、Q 换成别的原子。',
  '接 A1，再用 S 把 P↦Q、Q↦R。', F.imp(Qz, F.imp(Rz, Qz)),
  P.subst(P.ax('A1'), { atoms: { P: Qz, Q: Rz } }));
add(0, 'iv', '分离', '用分离把 (A→B) 与 A 接成 B；这里用它拼 (P→Q)→(P→Q)。',
  '按参考证明接 A1、A2 与分离，得到蕴涵式自身的同一律。',
  F.imp(F.imp(Pz, Qz), F.imp(Pz, Qz)), identity(F.imp(Pz, Qz)));

/* 第Ⅱ章：量词与连接词的入口元件。 */
add(1, 'i', '全称构造与推广', '用 ∀ 构造全称式，再用全称推广得到 ∀x(P→P)。',
  '先拼出 P→P，再取全称推广选 x。', F.all('x', F.imp(Pz, Pz)), P.gen(identity(Pz), 'x'));
add(1, 'ii', '全称引入规则', 'A→∀xA（x 不在 A 中自由出现）。',
  '接全称引入规则，公式取 P，变元选 x。', F.imp(Pz, F.all('x', Pz)), P.shift(Pz, 'x'));
add(1, 'iii', '全称例化', '∀x A → A[t/x]：把全称式里的 x 换成个体。',
  '接全称例化公理，公式取 P，项取 x。', F.imp(F.all('x', Pz), Pz), P.allInst(Pz, 'x', 'x'));
add(1, 'iv', '存在构造与推广', '用 ∃ 构造存在式，再用存在推广得到 ∃x(P→P)。',
  '先拼 P→P，再用存在推广收成 ∃x(P→P)。', F.exists('x', F.imp(Pz, Pz)),
  P.mp(identity(Pz), P.existsGen(F.imp(Pz, Pz), 'x', 'x')));
add(1, 'v', '连接词构造', '用 ∧ 构造合取式，并用同一律证明 P∧Q→P∧Q。',
  '用 ∧ 接 P、Q，再拼同一律。', F.imp(F.and(Pz, Qz), F.and(Pz, Qz)), identity(F.and(Pz, Qz)));

/* 第Ⅲ章：等词层的入口元件。 */
add(2, 'i', '等词构造', '用谓词元件选“=”并接两个个体，得到 x=y。',
  '取谓词元件，符号选 =，接 x、y；再拼同一律。', F.imp(E(X, Y), E(X, Y)), identity(E(X, Y)));
add(2, 'ii', '等词自反', '直接接等词自反，得到 x=x。', '取等词自反，个体选 x。', E(X, X), P.eqRefl('x'));
add(2, 'iii', 'Leibniz 替换', 'x=y 时把 F(x) 换成 F(y)。',
  '接等词替换（抽象模式），公式取 F(z)，个体 x、y。', F.imp(E(X, Y), F.imp(F.pred('F', X), F.pred('F', Y))),
  P.leibniz('x', 'y', Fz, { mode: 'abstract', v: 'z' }));
add(2, 'iv', 'Leibniz 反向', 'y=x 时把 F(y) 换成 F(x)。',
  '接等词替换，个体顺序改成 y、x。', F.imp(E(Y, X), F.imp(F.pred('F', Y), F.pred('F', X))),
  P.leibniz('y', 'x', Fz, { mode: 'abstract', v: 'z' }));
add(2, 'v', '等词对称', '用 Leibniz + 等词自反把 x=y 反过来。',
  '假设 x=y，用 Leibniz 把 x=x 换成 y=x；再用 A1/A2 把 x=x 提到前件。', F.imp(E(X, Y), E(Y, X)), (() => {
    const H = E(X, Y), XX = E(X, X), YX = E(Y, X);
    const leib = P.leibniz('x', 'y', E(Z, X), { mode: 'abstract', v: 'z' }); // H→(x=x→y=x)
    const a2 = P.subst(P.ax('A2'), { atoms: { P: H, Q: XX, R: YX } });
    const m1 = P.mp(leib, a2);                         // (H→x=x)→(H→y=x)
    const a1 = P.subst(P.ax('A1'), { atoms: { P: XX, Q: H } }); // x=x→(H→x=x)
    const hxx = P.mp(P.eqRefl('x'), a1);               // H→x=x
    return P.mp(hxx, m1);                              // H→y=x
  })());

/* 第Ⅳ章：集合层的入口元件与公理。 */
add(3, 'i', '属于关系', '用 ∈ 元件把两个个体接成 x∈y，并用同一律证明它自身。',
  '取 ∈ 元件，接 x、y；再拼同一律。', F.imp(mem(X, Y), mem(X, Y)), identity(mem(X, Y)));
add(3, 'ii', '外延公理', '两个集合元素完全相同则相等。',
  '直接接外延公理，集合取 x、y。', F.imp(F.all('z', F.iff(mem(Z, X), mem(Z, Y))), E(X, Y)), P.setExt('x', 'y'));
add(3, 'iii', '空集公理', '存在不含任何元素的集合。', '直接接空集公理。',
  F.exists('z', F.all('x', F.not(mem(X, Z)))), P.setEmpty());
add(3, 'iv', '配对公理', '任给两个集合，存在恰好以它们为元素的集合。',
  '直接接配对公理，集合取 x、y。',
  F.exists('u', F.all('z', F.iff(F.or(E(Z, X), E(Z, Y)), mem(Z, F.term('u'))))), P.setPair('x', 'y'));
add(3, 'v', '并集公理', '存在一个集合，恰好包含给定集合的元素的元素。',
  '直接接并集公理，集合取 x。',
  F.exists('y', F.all('z', F.iff(
    F.exists('u', F.and(mem(Z, F.term('u')), mem(F.term('u'), X))), mem(Z, F.term('y'))))), P.setUnion('x'));

const file = path.join(ROOT, 'campaign', 'tutorials.json');
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('written campaign/tutorials.json', levels.length, 'tutorials');
