#!/usr/bin/env node
'use strict';
/*
 * 第Ⅱ章（谓词/量词，24 关）作者脚本：
 *   前 4 关是手写的量词入门（全称推广 / 全称引入 / 全称消去 / Peirce 全称闭包），
 *   后 20 关从 set.mm 的纯 ∀ 定理证明展开而来（ax-4/sp/ax-5/ax-gen/ax-mp），
 *   链上更早的关卡用 *NN 引用。目标/顺序/标题/提示是手写的。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');
const { expand } = require('./setmm-expand.js');

const X = F.term('x');
const Y = F.term('y');
const eq = (a, b) => F.pred('=', a, b);

const chapter1 = require('../../campaign/chapter1.json');
const levels = [];
const levelMap = {};
const targetByNo = {};

chapter1.forEach((lv) => {
  levelMap[lv.label] = { n: lv.no, targetBody: lv.targetTokens.slice(1) };
  targetByNo[lv.no] = lv.targetTokens.slice(1);
});

function addManual(no, title, teaches, hint, target, proof) {
  levels.push({ no, chapter: 1, label: null, title, teaches, hint, targetTokens: ['|-'].concat(target), proof, stats: {} });
  targetByNo[no] = target;
}

/* 手写入门：全称推广 / 嵌套推广 / 全称闭包 */
const Fx = F.pred('F', F.term('x'));
const Fy = F.pred('F', F.term('y'));
const Gx = F.pred('G', F.term('x'));

addManual(25, '全称例化', '真正的 ∀E：∀x F(x) → F(y)。', '用全称例化公理，把 x 换成 y。',
  F.imp(F.all('x', Fx), Fy),
  P.allInst(Fx, 'x', 'y'));
addManual(26, '存在推广', 'F(y) → ∃x F(x)。', '用存在推广公理，y 作为见证。',
  F.imp(Fy, F.exists('x', Fx)),
  P.existsGen(Fx, 'x', 'y'));
addManual(27, '全称分配（谓词）', '∀x(F(x)→G(x)) → (∀xF(x) → ∀xG(x))。', 'A5 的谓词实例。',
  F.imp(F.all('x', F.imp(Fx, Gx)), F.imp(F.all('x', Fx), F.all('x', Gx))),
  P.subst(P.ax('A5'), { atoms: { P: Fx, Q: Gx } }));
addManual(28, '全称换名', '∀x F(x) → ∀y F(y) 的实例化形式：∀x F(x) → F(y)。', '用全称例化。',
  F.imp(F.all('x', Fx), Fy),
  P.allInst(Fx, 'x', 'y'));

/* 后 20 关：set.mm 纯 ∀ 定理（顺序由易到难） */
const LABELS = [
  { label: 'alim', title: '全称分配', teaches: '∀x(P→Q) 可以分配到 (∀xP→∀xQ)。', hint: '这是全称分配公理 A5 的实例。' },
  { label: 'axi4', title: '全称消去', teaches: '∀xP→P：全称实例可以落回个体。', hint: '直接用 A4。' },
  { label: 'ax5ALT', title: '全称引入', teaches: 'P→∀xP：x 不在 P 中自由出现时可以加全称。', hint: '用全称引入规则（注意侧条件）。' },
  { label: 'ala1', title: '全称弱化', teaches: '∀xP→∀x(Q→P)：公理 A1 在全称下。', hint: '先在 ∀ 下用 A1，再分配。' },
  { label: 'ax5d', title: '嵌套全称引入', teaches: 'P→(Q→∀xQ)：对后件加全称。', hint: '用 A1 与全称引入。' },
  { label: '2sp', title: '双重实例', teaches: '∀x∀yP→P：连续两次全称消去。', hint: '两次 A4。' },
  { label: 'bj-19.21bit', title: '前件抽出', teaches: '(P→∀xQ)→(P→Q)：全称可以实例化。', hint: '先全称消去，再组合。' },
  { label: 'al2im', title: '三段全称分配', teaches: '∀x(P→(Q→R))→(∀xP→(∀xQ→∀xR))。', hint: '连续两次全称分配。' },
  { label: 'sylgt', title: '全称三段论', teaches: '∀x(Q→R)→((P→∀xQ)→(P→∀xR))。', hint: '把 ∀x(Q→R) 分配到前件上。' },
  { label: 'bj-sylggt', title: '混合三段论', teaches: '(P→∀x(Q→R))→((P→∀xQ)→(P→∀xR))。', hint: '两次分配 + 前件交换。' },
  { label: 'bj-2alim', title: '双层分配', teaches: '∀x∀y(P→Q)→(∀x∀yP→∀x∀yQ)。', hint: '连续两次 A5。' },
  { label: 'al3im', title: '四段全称分配', teaches: '∀x(P→(Q→(R→S)))→(∀xP→(∀xQ→(∀xR→∀xS)))。', hint: '连续三次分配。' },
  { label: '2ax5', title: '双重量词引入', teaches: 'P→∀x∀yP：两次全称引入。', hint: '注意两次侧条件都成立。' },
  { label: '2alim', title: '双层分配（变体）', teaches: '∀x∀y(P→Q)→(∀x∀yP→∀x∀yQ) 的另一证明。', hint: '分配、推广、再分配。' },
  { label: 'stdpc5v', title: '前件不含 x', teaches: '∀x(P→Q)→(P→∀xQ)：P 不含 x 时可以把 ∀ 收到后件。', hint: '用全称引入与分配。' },
  { label: 'bj-alrimg', title: '全称后件组合', teaches: '(P→∀xQ)→(∀x(Q→R)→(P→∀xR))。', hint: '先分配，再三段论。' },
  { label: 'bj-spst', title: '全称替换前件', teaches: '(P→Q)→(∀xP→Q)。', hint: '先全称消去，再三段论。' },
  { label: 'bj-alsyl', title: '全称三段论链', teaches: '∀x(P→Q)→(∀x(Q→R)→∀x(P→R))。', hint: '分配两次后用命题三段论。' },
  { label: 'bj-axc4', title: '全称合并', teaches: '(∀xP→∀x∀xP)→((∀x(∀xP→Q)→(∀xP→∀xQ)) 的经典组合。', hint: '分配 + 全称引入。' },
  { label: 'ax11dgen', title: '重复量词', teaches: '∀x∀xP→∀x∀xP：重复量词的自反。', hint: '直接用 *01 并在全称下实例化。' }
];

LABELS.forEach((entry) => {
  const no = levels.length + 25;
  const r = expand(entry.label, {}, [], levelMap);
  let nodes = 0;
  (function count(t) {
    nodes += 1;
    if (t.op === 'mp') { count(t.a); count(t.b); }
    else if (t.op === 'gen') count(t.of);
    else if (t.op === 'shift') count(t.formula);
  })(r.term);
  levels.push({
    no,
    chapter: 1,
    label: entry.label,
    title: entry.title,
    teaches: entry.teaches,
    hint: entry.hint,
    targetTokens: r.targetTokens,
    proof: r.term,
    stats: { nodes }
  });
  levelMap[entry.label] = { n: no, targetBody: r.targetTokens.slice(1) };
  targetByNo[no] = r.targetTokens.slice(1);
  console.log(String(no).padStart(2, '0'), entry.label.padEnd(12), 'nodes=' + String(nodes).padStart(3));
});

fs.writeFileSync(path.join(ROOT, 'campaign', 'chapter2.json'), JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('written campaign/chapter2.json', levels.length, 'levels');
