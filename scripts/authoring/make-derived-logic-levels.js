#!/usr/bin/env node
'use strict';
/*
 * 把 EXP/IMP 从“公理模块”降级为关卡：
 *  - *20 证明 ((P∧Q)→R)→(P→(Q→R))
 *  - *15 证明 (P→(Q→R))→((P∧Q)→R)
 * 之后它们只能作为 *20/*15 定理被引用。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');

const A = F.atom('P');
const B = F.atom('Q');
const C = F.atom('R');
const X = F.and(A, B);

function compose(pAB, pBC, a, b, c) {
  const chain = P.subst(P.thm(5), { atoms: { P: a, Q: b, R: c } });
  return P.mp(pBC, P.mp(pAB, chain));
}
function nodesOf(t) {
  if (t.op === 'mp') return 1 + nodesOf(t.a) + nodesOf(t.b);
  if (t.op === 'gen') return 1 + nodesOf(t.of);
  return 1;
}

/* *20：EXP */
const exp20 = (() => {
  const H = F.imp(X, C);
  const andI = P.andIntroAx(A, B);                         // P→(Q→(P∧Q))
  const imim2 = P.subst(P.thm(4), { atoms: { P: X, Q: C, R: B } }); // (X→C)→((Q→X)→(Q→C))
  const inner = P.mp(H, imim2);                            // (Q→X)→(Q→C)
  const d = compose(andI, inner, A, F.imp(B, X), F.imp(B, C)); // P→(Q→C)
  const a1 = P.subst(P.ax('A1'), { atoms: { P: F.imp(A, F.imp(B, C)), Q: H } });
  return P.mp(d, a1);                                      // H→(P→(Q→C))
})();

/* *15：IMP */
const imp15 = (() => {
  const H = F.imp(A, F.imp(B, C));
  const e1 = P.andElimAx(A, B, 'l');                       // (P∧Q)→P
  const c1 = compose(e1, H, X, A, F.imp(B, C));            // (P∧Q)→(Q→C)
  const e2 = P.andElimAx(A, B, 'r');                       // (P∧Q)→Q
  const a2 = P.subst(P.ax('A2'), { atoms: { P: X, Q: B, R: C } });
  const m2 = P.mp(c1, a2);                                 // (X→Q)→(X→C)
  return P.mp(e2, m2);                                     // (P∧Q)→C
})();

const file = path.join(ROOT, 'campaign', 'chapter1.json');
const levels = JSON.parse(fs.readFileSync(file, 'utf8'));
function replace(no, title, teaches, hint, target, proof) {
  const i = levels.findIndex((lv) => lv.no === no);
  if (i < 0) throw new Error('missing level ' + no);
  levels[i] = {
    no, chapter: 0, title, teaches, hint,
    targetTokens: ['|-'].concat(target),
    proof, stats: { nodes: nodesOf(proof) }
  };
  console.log(no, title, 'nodes=' + nodesOf(proof));
}
replace(15, '合取前件合并', '(P→(Q→R))→((P∧Q)→R)：把两个前件合成合取。',
  '分别从合取取出两个前件，再用 A2 合并。', F.imp(F.imp(A, F.imp(B, C)), F.imp(X, C)), imp15);
replace(20, '合取前件拆分', '((P∧Q)→R)→(P→(Q→R))：把合取前件拆成两层前件。',
  '由 ∧I 得到 P→(Q→P∧Q)，再用 imim2 与 A1 组合。', F.imp(F.imp(X, C), F.imp(A, F.imp(B, C))), exp20);
fs.writeFileSync(file, JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('chapter I: EXP/IMP are now proved levels *20/*15');
