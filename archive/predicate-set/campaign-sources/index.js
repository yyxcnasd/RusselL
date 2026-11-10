/*!
 * 关卡内容（手写）：目标、顺序、提示、允许模块与参考证明。
 *
 * 第Ⅰ/Ⅱ章参考证明来自 set.mm 真实证明的展开（scripts/authoring/），
 * 更早关卡以 *NN 引用；关卡顺序/标题/提示由人写。
 * 教学关（tutorials.json）用小写罗马数字，不占 *NN 编号，排在每章主线之前。
 */
'use strict';

const chapter1 = require('./chapter1.json');
const chapter2 = require('./chapter2.json');
const chapter3 = require('./chapter3.json');
const chapter4 = require('./chapter4.json');
const tutorialData = require('./tutorials.json');

const chapters = [
  { key: 'prop', id: 'Ⅰ', title: '命题演算' },
  { key: 'pred', id: 'Ⅱ', title: '谓词与量词' },
  { key: 'eq', id: 'Ⅲ', title: '等词' },
  { key: 'classic', id: 'Ⅳ', title: '经典定理' }
];

function fromJson(lv, chapter) {
  return {
    no: lv.no,
    chapter,
    title: lv.title,
    teaches: lv.teaches,
    hint: lv.hint,
    target: lv.targetTokens.slice(1),
    proof: lv.proof
  };
}

function fromTutorial(lv, chapter) {
  return {
    tutorial: true,
    label: lv.label,
    chapter,
    title: lv.title,
    teaches: lv.teaches,
    hint: lv.hint,
    tip: lv.tip || null,
    target: lv.targetTokens.slice(1),
    proof: lv.proof
  };
}

const chapterData = [chapter1, chapter2, chapter3, chapter4];
const levels = [];
chapterData.forEach((list, chapter) => {
  tutorialData
    .filter((t) => Number(t.chapter) === chapter)
    .forEach((t) => levels.push(fromTutorial(t, chapter)));
  list.forEach((lv) => levels.push(fromJson(lv, chapter)));
});

module.exports = { chapters, levels };
