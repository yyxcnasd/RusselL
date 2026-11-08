#!/usr/bin/env node
'use strict';
/* 第Ⅳ章（综合，24 关）：量词 + 等词的组合，证明由等词替换/全称推广与前面章节组合。 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');

const X = F.term('x'), Y = F.term('y'), Z = F.term('z');
const eq = (a, b) => F.pred('=', a, b);
const Fx = F.pred('F', X), Fy = F.pred('F', Y), Fz = F.pred('F', Z);
const Gx = F.pred('G', X), Gy = F.pred('G', Y), Gz = F.pred('G', Z);
const Hx = F.pred('H', X), Hy = F.pred('H', Y);
const ab = { mode: 'abstract', v: 'z' };
const rep = { mode: 'replace' };
const L = (x, y, f, opts) => P.leibniz(x, y, f, opts || ab);
const genN = (proof, vars) => vars.slice().reverse().reduce((acc, v) => P.gen(acc, v), proof);

const levels = [];
function add(no, title, teaches, hint, target, proof) {
  levels.push({ no, chapter: 3, title, teaches, hint, targetTokens: ['|-'].concat(target), proof, stats: {} });
}

add(73, '等词对称的全称闭包', '∀x(x=y→y=x)。', '对 *51 全称推广 x。',
  F.all('x', F.imp(eq(X, Y), eq(Y, X))), P.gen(P.thm(51), 'x'));

add(74, '谓词替换的全称闭包', '∀x∀y(x=y→F(x)→F(y))。', '对 *53 连续推广 x、y。',
  F.all('x', F.all('y', F.imp(eq(X, Y), F.imp(Fx, Fy)))), genN(P.thm(53), ['x', 'y']));

add(75, '传递性的全称闭包', '∀x∀y∀z(x=y→(y=z→x=z))。', '对 *52 推广 x、y、z。',
  F.all('x', F.all('y', F.all('z', F.imp(eq(X, Y), F.imp(eq(Y, Z), eq(X, Z)))))),
  genN(P.thm(52), ['x', 'y', 'z']));

add(76, '等词进入全称公式', '∀z(x=y→(z=x→z=y))。', '先替换再全称推广。',
  F.all('z', F.imp(eq(X, Y), F.imp(eq(Z, X), eq(Z, Y)))), P.gen(L('x', 'y', eq(Z, X), rep), 'z'));

add(77, '等词进入全称（反向）', '∀z(y=x→(z=y→z=x))。', '用反向替换再推广。',
  F.all('z', F.imp(eq(Y, X), F.imp(eq(Z, Y), eq(Z, X)))), P.gen(L('y', 'x', eq(Z, Y), rep), 'z'));

add(78, '三层全称等词', '∀x∀y∀z(x=y→(z=x→z=y))。', '对 *76 再推广 x、y。',
  F.all('x', F.all('y', F.all('z', F.imp(eq(X, Y), F.imp(eq(Z, X), eq(Z, Y)))))),
  genN(P.gen(L('x', 'y', eq(Z, X), rep), 'z'), ['x', 'y']));

add(79, '谓词集合替换', 'x=y→(∀z(z=x→F(z))→∀z(z=y→F(z)))。', '把 ∀z(z=x→F(z)) 作为直接替换的公式。',
  F.imp(eq(X, Y), F.imp(F.all('z', F.imp(eq(Z, X), Fz)), F.all('z', F.imp(eq(Z, Y), Fz)))),
  L('x', 'y', F.all('z', F.imp(eq(Z, X), Fz)), rep));

add(80, '谓词集合替换（反向）', 'x=y→(∀z(F(z)→z=x)→∀z(F(z)→z=y))。', '替换方向换成 y。',
  F.imp(eq(X, Y), F.imp(F.all('z', F.imp(Fz, eq(Z, X))), F.all('z', F.imp(Fz, eq(Z, Y))))),
  L('x', 'y', F.all('z', F.imp(Fz, eq(Z, X))), rep));

add(81, '全称等词化简', 'x=y→(∀z(z=x→z=z)→∀z(z=y→z=z))。', '用直接替换。',
  F.imp(eq(X, Y), F.imp(F.all('z', F.imp(eq(Z, X), eq(Z, Z))), F.all('z', F.imp(eq(Z, Y), eq(Z, Z))))),
  L('x', 'y', F.all('z', F.imp(eq(Z, X), eq(Z, Z))), rep));

add(82, '全称前件替换', 'x=y→(∀z(z=z→z=x)→∀z(z=z→z=y))。', '用直接替换。',
  F.imp(eq(X, Y), F.imp(F.all('z', F.imp(eq(Z, Z), eq(Z, X))), F.all('z', F.imp(eq(Z, Z), eq(Z, Y))))),
  L('x', 'y', F.all('z', F.imp(eq(Z, Z), eq(Z, X))), rep));

add(83, '全称自反式', '∀z(z=z)。', '自反后用全称推广。',
  F.all('z', eq(Z, Z)), P.gen(P.eqRefl('z'), 'z'));

add(84, '复合谓词的全称替换', '∀x∀y(x=y→(F(x)→G(x))→(F(y)→G(y)))。', '对 *57 推广两次。',
  F.all('x', F.all('y', F.imp(eq(X, Y), F.imp(F.imp(Fx, Gx), F.imp(Fy, Gy))))),
  genN(P.thm(57), ['x', 'y']));

add(85, '原子等词替换', 'x=y→((z=x)→(z=y))。', '等词替换的直接实例。',
  F.imp(eq(X, Y), F.imp(eq(Z, X), eq(Z, Y))), L('x', 'y', eq(Z, X), rep));

add(86, '原子等词替换（右）', 'x=y→((x=z)→(y=z))。', '替换自由 x。',
  F.imp(eq(X, Y), F.imp(eq(X, Z), eq(Y, Z))), L('x', 'y', eq(X, Z), rep));

add(87, '谓词前后件混合', 'x=y→((F(z)→G(x))→(F(z)→G(y)))。', '把 F(z)→G(x) 作为公式。',
  F.imp(eq(X, Y), F.imp(F.imp(Fz, Gx), F.imp(Fz, Gy))), L('x', 'y', F.imp(Fz, Gx), rep));

add(88, '谓词后件不变', 'x=y→((F(x)→G(z))→(F(y)→G(z)))。', '替换自由 x，保持 G(z) 不变。',
  F.imp(eq(X, Y), F.imp(F.imp(Fx, Gz), F.imp(Fy, Gz))), L('x', 'y', F.imp(Fx, Gz), rep));

add(89, '自反式的全称实例', '∀x(x=x→x=x)。', '对同一律实例推广。',
  F.all('x', F.imp(eq(X, X), eq(X, X))),
  P.gen(P.subst(P.thm(1), { atoms: { P: eq(X, X) } }), 'x'));

add(90, '等词否定替换', 'x=y→(¬(z=x)→¬(z=y))。', '直接替换。',
  F.imp(eq(X, Y), F.imp(F.not(eq(Z, X)), F.not(eq(Z, Y)))), L('x', 'y', F.not(eq(Z, X)), rep));

add(91, '三谓词替换', 'x=y→((F(x)→H(x))→(F(y)→H(y)))。', '抽象公式取 F(z)→H(z)。',
  F.imp(eq(X, Y), F.imp(F.imp(Fx, Hx), F.imp(Fy, Hy))), L('x', 'y', F.imp(Fz, F.pred('H', Z))));

add(92, '四层全称替换', '∀x∀y∀z(x=y→(z=x→z=y)) 的另一种证明。', '先替换再连续推广。',
  F.all('x', F.all('y', F.all('z', F.imp(eq(X, Y), F.imp(eq(Z, X), eq(Z, Y)))))),
  genN(P.gen(L('x', 'y', eq(Z, X), rep), 'z'), ['x', 'y']));

add(93, '全称等词双向替换', 'x=y→(∀z(z=x→F(z))→∀z(z=y→F(z))) 的反向形式。', '先对称再替换，最后用三段论。',
  F.imp(eq(X, Y), F.imp(F.all('z', F.imp(eq(Z, Y), Fz)), F.all('z', F.imp(eq(Z, X), Fz)))),
  (() => {
    const chain = P.subst(P.thm(5), { atoms: {
      P: eq(X, Y), Q: eq(Y, X), R: F.imp(F.all('z', F.imp(eq(Z, Y), Fz)), F.all('z', F.imp(eq(Z, X), Fz)))
    } });
    return P.mp(L('y', 'x', F.all('z', F.imp(eq(Z, Y), Fz)), rep), P.mp(P.thm(51), chain));
  })());

add(94, '等词传递（前件形态）', 'x=z→(x=y→y=z)。', '用替换得到 x=y→(x=z→y=z)，再置换前件。',
  F.imp(eq(X, Z), F.imp(eq(X, Y), eq(Y, Z))),
  P.mp(L('x', 'y', eq(X, Z), rep),
    P.subst(P.thm(8), { atoms: { P: eq(X, Y), Q: eq(X, Z), R: eq(Y, Z) } })));

add(95, '全称等词的恒等替换', 'x=y→(∀z(z=z)→∀z(z=z)) 的深层形式。', '取不含占位变元 z 的公式。',
  F.imp(eq(X, Y), F.imp(F.all('z', F.imp(eq(Z, Z), eq(Z, Z))), F.all('z', F.imp(eq(Z, Z), eq(Z, Z))))),
  L('x', 'y', F.all('z', F.imp(eq(Z, Z), eq(Z, Z)))));

add(96, '综合：G 的等词替换', '∀x∀y(x=y→(G(x)→G(y)))。', '用 G(z) 的抽象替换再全称推广。',
  F.all('x', F.all('y', F.imp(eq(X, Y), F.imp(Gx, Gy)))), genN(L('x', 'y', Gz), ['x', 'y']));

fs.writeFileSync(path.join(ROOT, 'campaign', 'chapter4.json'), JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('written campaign/chapter4.json', levels.length, 'levels');
