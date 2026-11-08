/*!
 * 关卡内容（手写）：目标、顺序、提示、允许模块与参考证明。
 *
 * 第Ⅰ/Ⅱ章参考证明来自 set.mm 真实证明的展开（scripts/authoring/），
 * 更早关卡以 *NN 引用；关卡顺序/标题/提示由人写。
 */
'use strict';

const chapter1 = require('./chapter1.json');
const chapter2 = require('./chapter2.json');
const chapter3 = require('./chapter3.json');

const chapters = [
  { key: 'prop', id: 'Ⅰ', title: '命题演算' },
  { key: 'pred', id: 'Ⅱ', title: '谓词与量词' },
  { key: 'eq', id: 'Ⅲ', title: '等词' },
  { key: 'classic', id: 'Ⅳ', title: '经典定理' }
];

const allowed = ['atom', 'term', 'pred', 'not', 'imp', 'all', 'axiom', 'subst', 'mp'];

function fromJson(lv, chapter) {
  return {
    no: lv.no,
    chapter,
    title: lv.title,
    teaches: lv.teaches,
    hint: lv.hint,
    target: lv.targetTokens.slice(1),
    allowed,
    proof: lv.proof
  };
}

const levels = chapter1.map((lv) => fromJson(lv, 0))
  .concat(chapter2.map((lv) => fromJson(lv, 1)))
  .concat(chapter3.map((lv) => fromJson(lv, 2)));

module.exports = { chapters, levels };
