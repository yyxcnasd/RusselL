#!/usr/bin/env node
'use strict';
/* 第Ⅲ章（等词，24 关）作者脚本。 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');

const X = F.term('x'), Y = F.term('y'), Z = F.term('z');
const eq = (a, b) => F.pred('=', a, b);
const Fz = F.pred('F', Z), Fx = F.pred('F', X), Fy = F.pred('F', Y);
const Gz = F.pred('G', Z), Gx = F.pred('G', X), Gy = F.pred('G', Y);
const abstract = { mode: 'abstract', v: 'z' };
const replace = { mode: 'replace' };

const perm = (a, b, c) => P.subst(P.thm(8), { atoms: { P: a, Q: b, R: c } });
const hs = (a, b, c) => P.subst(P.thm(5), { atoms: { P: a, Q: b, R: c } });
const L = (x, y, formula, opts) => P.leibniz(x, y, formula, opts || abstract);

const levels = [];
function add(no, title, teaches, hint, target, proof) {
  levels.push({ no, chapter: 2, title, teaches, hint, targetTokens: ['|-'].concat(target), proof, stats: {} });
}

add(49, '自反（x）', '任何个体等于自己：x=x。', '直接用等词自反规则。', eq(X, X), P.eqRefl('x'));
add(50, '自反（y）', 'y=y 同样成立。', '用等词自反并选 y。', eq(Y, Y), P.eqRefl('y'));

const symProof = (() => {
  const R = P.eqRefl('x');
  const L1 = L('x', 'y', eq(Z, X));
  const pm = perm(eq(X, Y), eq(X, X), eq(Y, X));
  return P.mp(R, P.mp(L1, pm));
})();
add(51, '对称性', 'x=y 可以反转成 y=x。', '用替换把 x=x 变成 y=x，再用置换律。', F.imp(eq(X, Y), eq(Y, X)), symProof);

add(52, '传递性', 'x=y 与 y=z 推出 x=z。', '对 y=z 用替换得到 x=y→x=z，再置换前件。',
  F.imp(eq(X, Y), F.imp(eq(Y, Z), eq(X, Z))),
  P.mp(L('y', 'z', eq(X, Z)), perm(eq(Y, Z), eq(X, Y), eq(X, Z))));

add(53, '谓词替换', 'x=y 说明 F(x) 与 F(y) 不可区分。', '把 F(z) 作为抽象公式。',
  F.imp(eq(X, Y), F.imp(Fx, Fy)), L('x', 'y', Fz));

add(54, '谓词替换（反向）', 'x=y 也能把 F(y) 换回 F(x)。', '先对称，再替换，最后用三段论。',
  F.imp(eq(X, Y), F.imp(Fy, Fx)),
  (() => {
    const chain = hs(eq(X, Y), eq(Y, X), F.imp(Fy, Fx));
    return P.mp(L('y', 'x', Fz), P.mp(P.thm(51), chain));
  })());

add(55, '全称自反', '∀x x=x：自反式的全称闭包。', '用全称推广。', F.all('x', eq(X, X)), P.gen(P.eqRefl('x'), 'x'));
add(56, '全称对称', '∀x∀y(x=y→y=x)。', '对 *51 连续两次全称推广。',
  F.all('x', F.all('y', F.imp(eq(X, Y), eq(Y, X)))), P.gen(P.gen(P.thm(51), 'y'), 'x'));

add(57, '复合替换', 'x=y 时 F(x)→G(x) 与 F(y)→G(y) 等价。', '把整个蕴涵式作为抽象公式。',
  F.imp(eq(X, Y), F.imp(F.imp(Fx, Gx), F.imp(Fy, Gy))),
  L('x', 'y', F.imp(Fz, Gz)));

add(58, '否定替换', 'x=y 时 ¬F(x) 与 ¬F(y) 等价。', '把 ¬F(z) 作为抽象公式。',
  F.imp(eq(X, Y), F.imp(F.not(Fx), F.not(Fy))), L('x', 'y', F.not(Fz)));

add(59, '条件替换', 'x=y 时 (x=x→F(x)) 与 (y=y→F(y)) 等价。', '把条件式作为抽象公式。',
  F.imp(eq(X, Y), F.imp(F.imp(eq(X, X), Fx), F.imp(eq(Y, Y), Fy))),
  L('x', 'y', F.imp(eq(Z, Z), Fz)));

add(60, '不含 x 的公式', '公式里没有占位变元时，替换不改变它。', '公式取 ∀z(z=z)，替换是空操作。',
  F.imp(eq(X, Y), F.imp(F.all('z', eq(Z, Z)), F.all('z', eq(Z, Z)))),
  L('x', 'y', F.all('z', eq(Z, Z))));

add(61, '全称谓词替换', '∀x∀y(x=y→F(x)→F(y))。', '对 *53 连续两次全称推广。',
  F.all('x', F.all('y', F.imp(eq(X, Y), F.imp(Fx, Fy)))), P.gen(P.gen(P.thm(53), 'y'), 'x'));

add(62, '否定复合替换', 'x=y 时 ¬(F(x)→G(x)) 与 ¬(F(y)→G(y)) 等价。', '把整个否定蕴涵作为抽象公式。',
  F.imp(eq(X, Y), F.imp(F.not(F.imp(Fx, Gx)), F.not(F.imp(Fy, Gy)))),
  L('x', 'y', F.not(F.imp(Fz, Gz))));

add(63, '自反条件替换', 'x=y 时 (F(x)→F(x)) 与 (F(y)→F(y)) 等价。', '把 F(z)→F(z) 作为抽象公式。',
  F.imp(eq(X, Y), F.imp(F.imp(Fx, Fx), F.imp(Fy, Fy))),
  L('x', 'y', F.imp(Fz, Fz)));

add(64, '混合公式替换', 'x=y 时 (F(x)→G(y)) 与 (F(y)→G(y)) 等价。', '把 F(z)→G(y) 作为抽象公式。',
  F.imp(eq(X, Y), F.imp(F.imp(Fx, Gy), F.imp(Fy, Gy))),
  L('x', 'y', F.imp(Fz, Gy)));

add(65, '替换的实例化', 'x=y→(x=x→y=x)：自反式替换的直接实例。', '把 z=x 作为抽象公式。',
  F.imp(eq(X, Y), F.imp(eq(X, X), eq(Y, X))), L('x', 'y', eq(Z, X)));

add(66, '全称不变式', 'x=y→(∀x x=x→∀x x=x)：抽象公式里没有占位变元。', '取 ∀x x=x 作为抽象公式，替换为空操作。',
  F.imp(eq(X, Y), F.imp(F.all('x', eq(X, X)), F.all('x', eq(X, X)))),
  L('x', 'y', F.all('x', eq(X, X))));

add(67, '全称传递', '∀x∀y∀z(x=y→(y=z→x=z))。', '对 *52 连续三次全称推广。',
  F.all('x', F.all('y', F.all('z', F.imp(eq(X, Y), F.imp(eq(Y, Z), eq(X, Z)))))),
  P.gen(P.gen(P.gen(P.thm(52), 'z'), 'y'), 'x'));

add(68, '全称复合替换', '∀x∀y(x=y→(F(x)→G(x))→(F(y)→G(y)))。', '对 *57 全称推广两次。',
  F.all('x', F.all('y', F.imp(eq(X, Y), F.imp(F.imp(Fx, Gx), F.imp(Fy, Gy))))),
  P.gen(P.gen(P.thm(57), 'y'), 'x'));

add(69, '全称等词替换', 'x=y→(∀z(z=x)→∀z(z=y))。', '用直接替换模式把 ∀z(z=x) 里的 x 换成 y。',
  F.imp(eq(X, Y), F.imp(F.all('z', eq(Z, X)), F.all('z', eq(Z, Y)))),
  L('x', 'y', F.all('z', eq(Z, X)), replace));

add(70, '全称等词替换（反向）', 'x=y→(∀z(z=y)→∀z(z=x))。', '先对称，再用替换与三段论。',
  F.imp(eq(X, Y), F.imp(F.all('z', eq(Z, Y)), F.all('z', eq(Z, X)))),
  (() => {
    const chain = hs(eq(X, Y), eq(Y, X), F.imp(F.all('z', eq(Z, Y)), F.all('z', eq(Z, X))));
    return P.mp(L('y', 'x', F.all('z', eq(Z, Y)), replace), P.mp(P.thm(51), chain));
  })());

add(71, '嵌套全称替换', 'x=y→(∀z(x=z)→∀z(y=z))。', '用直接替换模式替换全称公式里的自由 x。',
  F.imp(eq(X, Y), F.imp(F.all('z', eq(X, Z)), F.all('z', eq(Y, Z)))),
  L('x', 'y', F.all('z', eq(X, Z)), replace));

add(72, '深层替换', 'x=y 可以替换公式深层位置的 x。', '把 F(z)→(G(z)→F(z)) 作为抽象公式。',
  F.imp(eq(X, Y), F.imp(F.imp(Fx, F.imp(Gx, Fx)), F.imp(Fy, F.imp(Gy, Fy)))),
  L('x', 'y', F.imp(Fz, F.imp(Gz, Fz))));

fs.writeFileSync(path.join(ROOT, 'campaign', 'chapter3.json'), JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('written campaign/chapter3.json', levels.length, 'levels');
