/*!
 * 关卡内容（手写）：目标、顺序、提示、允许模块与参考证明。
 *
 * 参考证明用 campaign/proof.js 的组合子写成；scripts/build-campaign.js 会
 * 把它展开成棋盘电路并用真实引擎验证。这里不引用任何 set.mm 缩写。
 */
'use strict';

const F = require('./formula.js');
const P = require('./proof.js');

const P0 = F.atom('P');
const Q0 = F.atom('Q');

const chapters = [
  { key: 'prop', id: 'Ⅰ', title: '命题演算' },
  { key: 'pred', id: 'Ⅱ', title: '谓词与量词' },
  { key: 'eq', id: 'Ⅲ', title: '等词' },
  { key: 'classic', id: 'Ⅳ', title: '经典定理' }
];

/* 命题演算：P→P 的标准希尔伯特证明。
   A1: P→(Q→P)
   A1[Q:=P→P]: P→((P→P)→P)
   A2[Q:=P→P, R:=P]: (P→((P→P)→P))→((P→(P→P))→(P→P))
   MP ⇒ (P→(P→P))→(P→P)
   A1[Q:=P]: P→(P→P)
   MP ⇒ P→P */
function proofSelfImp() {
  return P.mp(
    P.subst(P.ax('A1'), { atoms: { Q: P0 } }),
    P.mp(
      P.subst(P.ax('A1'), { atoms: { Q: F.imp(P0, P0) } }),
      P.subst(P.ax('A2'), { atoms: { Q: F.imp(P0, P0), R: P0 } })
    )
  );
}

const levels = [
  {
    no: 1,
    chapter: 0,
    title: '同一律',
    teaches: '最基础的定理：任何命题都推出它自己。先用公理堆出两条蕴涵，再用分离规则。',
    hint: '试三条 A1/A2 的实例，最后用两次分离。',
    target: F.imp(P0, P0),
    allowed: ['atom', 'not', 'imp', 'axiom', 'subst', 'mp'],
    proof: proofSelfImp()
  },
  {
    no: 2,
    chapter: 0,
    title: '代入同一律',
    teaches: '把 *01 里的原子 P 同时换成任意公式，结论随之实例化。',
    hint: '引用 *01，再用代入规则把 P 换成 Q。',
    target: F.imp(Q0, Q0),
    allowed: ['atom', 'not', 'imp', 'subst', 'theorem:1'],
    proof: P.subst(P.thm(1), { atoms: { P: Q0 } })
  },
  {
    no: 3,
    chapter: 0,
    title: '蕴涵的自反',
    teaches: '同一律可以直接作用于复合公式：把 P 换成 P→Q。',
    hint: '引用 *01，把 P 换成一个蕴涵式。',
    target: F.imp(F.imp(P0, Q0), F.imp(P0, Q0)),
    allowed: ['atom', 'not', 'imp', 'subst', 'theorem:1'],
    proof: P.subst(P.thm(1), { atoms: { P: F.imp(P0, Q0) } })
  }
];

module.exports = { chapters, levels };
