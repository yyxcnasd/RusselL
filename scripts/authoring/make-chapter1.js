#!/usr/bin/env node
'use strict';
/*
 * 第Ⅰ章（命题演算，24 关）作者脚本：
 *   - 关卡目标/顺序/标题/提示是手写的（下面 LABELS 表）；
 *   - 参考证明由 set.mm 的真实证明展开而来（scripts/authoring/setmm-expand.js），
 *     链上更早的定理用 *NN 引用，其余推理式引理全部内联成公理+分离。
 *
 * 产物：campaign/chapter1.json（供 campaign/index.js 与 build-campaign 使用）。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const { expand } = require('./setmm-expand.js');

const LABELS = [
  { label: 'id', title: '同一律', teaches: '任何命题都推出自己：A→A。', hint: '两条 A1 和一条 A2，用两次分离。' },
  { label: 'idd', title: '后件自反', teaches: '前件无关时，后件仍然自反：A→(B→B)。', hint: '先得 B→B，再用 A1 把 A 加回前件。' },
  { label: 'pm2.27', title: '回指前件', teaches: 'A 可以推出“若 A 则 B”的后件 B。', hint: '把 (A→B) 当前件，构造 A→((A→B)→B)。' },
  { label: 'imim2', title: '后件强化', teaches: '若 A→B，则任意 C 也能走到 C→B。', hint: '先用 A1 把 A→B 嵌进 C 的前件。' },
  { label: 'imim1', title: '前件弱化', teaches: '若 A→B，则 (B→C)→(A→C)。', hint: '把 A→B 与 B→C 接起来。' },
  { label: '2a1', title: '二级回指', teaches: 'A→(B→(C→A))：公理 A1 的两次实例。', hint: '对 A1 连续代入两次，再用分离。' },
  { label: 'pm2.83', title: '蕴涵分配', teaches: '(A→(B→C))→((A→B)→(A→C))，即公理 A2。', hint: '直接引用 A2 并代入。' },
  { label: 'pm2.04', title: '前件重排', teaches: 'A→(B→C) 可以换成 B→(A→C)。', hint: '用 A2 把前件换位，再接 A1。' },
  { label: 'con3', title: '逆否命题', teaches: '(A→B)→(¬B→¬A)。', hint: 'A3 给出 (¬B→¬A)→(A→B)，再用前件重排。' },
  { label: 'con2', title: '逆否（否定后件）', teaches: '(A→¬B)→(B→¬A)。', hint: '把 B→¬A 写成 B→(A→¬A) 的形状，用 A3。' },
  { label: 'con1', title: '逆否（否定前件）', teaches: '(¬A→B)→(¬B→A)。', hint: 'A3 的变体：把 ¬B 当前件。' },
  { label: 'notnot', title: '双重否定引入', teaches: 'A→¬¬A。', hint: '用 A3 的逆否方向：¬A→¬A 得到 A→¬¬A。' },
  { label: 'notnotr', title: '双重否定消去', teaches: '¬¬A→A。', hint: '先证 ¬¬A→(¬A→¬¬A)，再用反证法。' },
  { label: 'pm2.21', title: '矛盾推出一切', teaches: '¬A→(A→B)：矛盾可以推出任何命题。', hint: '用 A1 造出 A→(¬B→A)，再用 A3。' },
  { label: 'pm2.24', title: '否定前件', teaches: 'A→(¬A→B)：A 与 ¬A 并存时什么都能推。', hint: '先证 A→(¬B→A)，再用 A3。' },
  { label: 'pm2.43', title: '收缩律', teaches: '((A→(A→B))→(A→B))：重复的前件可以合并。', hint: '用 A2 分配前件，再用 id。' },
  { label: 'imim12', title: '蕴涵合成', teaches: '(A→B)→((C→D)→((B→C)→(A→D)))。', hint: '两次前件/后件组合。' },
  { label: 'jarr', title: '替换前件（左）', teaches: '((A→B)→C)→(B→C)。', hint: '从 B 出发先用 A1 得到 A→B。' },
  { label: 'jarl', title: '替换前件（右）', teaches: '((A→B)→C)→(A→C)。', hint: '从 A 出发先用 A1 得到 A→B。' },
  { label: 'loowoz', title: 'Łukasiewicz 律', teaches: '((A→B)→(A→C))→(A→(B→C))。', hint: '经典的三段论变形。' },
  { label: 'pm2.86', title: '预线性', teaches: '((A→B)→(A→C))→(A→(B→C)) 的另一形式。', hint: '用 A2 与交换。' },
  { label: 'pm2.18', title: '反证法', teaches: '(¬A→A)→A：如果否定 A 能推出 A，那么 A 成立。', hint: '用 A3 把 ¬A→A 翻成 ¬A→¬¬A，再配合双重否定。' },
  { label: 'simprim', title: '简化蕴涵', teaches: '¬(A→¬B)→B：否定一个蕴涵可以得到后件。', hint: '把 ¬B 当前件，用 A3 得到逆否。' },
  { label: 'peirce', title: '皮尔士律', teaches: '((A→B)→A)→A：经典逻辑的标志性定理。', hint: '假设 (A→B)→A，再分 A 与 ¬A 两种情况。' }
];

const levels = [];
const levelMap = {};
LABELS.forEach((entry, i) => {
  const no = i + 1;
  const r = expand(entry.label, {}, [], levelMap);
  let nodes = 0;
  (function count(t) {
    nodes += 1;
    if (t.op === 'mp') { count(t.a); count(t.b); }
  })(r.term);
  levels.push({
    no,
    chapter: 0,
    label: entry.label,
    title: entry.title,
    teaches: entry.teaches,
    hint: entry.hint,
    targetTokens: r.targetTokens,
    proof: r.term,
    stats: { nodes }
  });
  levelMap[entry.label] = { n: no, targetBody: r.targetTokens.slice(1) };
  console.log(String(no).padStart(2, '0'), entry.label.padEnd(10), entry.title.padEnd(8), 'nodes=' + String(nodes).padStart(4));
});

fs.writeFileSync(path.join(ROOT, 'campaign', 'chapter1.json'), JSON.stringify(levels, null, 2) + '\n', 'utf8');
console.log('written campaign/chapter1.json', levels.length, 'levels');
