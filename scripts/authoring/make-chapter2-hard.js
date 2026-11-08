#!/usr/bin/env node
'use strict';
/*
 * 第Ⅱ章（谓词/量词，24 关）复杂推理版：
 *   - 目标来自 set.mm 的 ∀ 定理，但把 wff 原子实例化成 F(x)/G(y)/H(z) 真谓词公式；
 *   - 证明是 set.mm 真实证明展开后做同样实例化（遵守 $d 条件），不是简单的规则套用；
 *   - 目标/顺序/标题/提示手写，参考证明逐关由 build-campaign 用真实 Engine 验证。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const { expand, db } = require('./setmm-expand.js');
const Term = require(path.join(ROOT, 'src', 'term.js'));

const WFF_KEYS = ['ph', 'ps', 'ch', 'th', 'ta'];
const SETVARS = ['x', 'y', 'z'];
const PRED = { ph: 'F', ps: 'G', ch: 'H', th: 'F', ta: 'G' };

function defaultMap(label) {
  const frame = db().frames.get(label);
  const forbidden = {};
  (frame && frame.dv ? frame.dv : []).forEach((pair) => {
    const wff = pair.find((t) => WFF_KEYS.indexOf(t) >= 0);
    const sv = pair.find((t) => SETVARS.indexOf(t) >= 0);
    if (!wff || !sv) return;
    forbidden[wff] = forbidden[wff] || {};
    forbidden[wff][sv] = true;
  });
  const map = {};
  WFF_KEYS.forEach((wff) => {
    const bad = forbidden[wff] || {};
    const sv = SETVARS.find((v) => !bad[v]) || 'z';
    map[wff.toUpperCase() === 'PH' ? 'P' : wff === 'ps' ? 'Q' : wff === 'ch' ? 'R' : wff === 'th' ? 'S' : 'T'] =
      [PRED[wff], '(', sv, ')'];
  });
  return map;
}

function convertTokens(tokens, map) {
  const out = [];
  tokens.forEach((t) => {
    if (map[t]) out.push.apply(out, map[t]);
    else out.push(t);
  });
  return out;
}
function convertProof(node, map) {
  switch (node.op) {
    case 'axiom':
    case 'lemma': {
      const atoms = {};
      Object.keys(node.atoms || {}).forEach((k) => { atoms[k] = convertTokens(node.atoms[k], map); });
      return Object.assign({}, node, { atoms });
    }
    case 'mp': return { op: 'mp', a: convertProof(node.a, map), b: convertProof(node.b, map) };
    case 'gen': return { op: 'gen', v: node.v, of: convertProof(node.of, map) };
    case 'shift': return { op: 'shift', v: node.v, formula: convertTokens(node.formula, map) };
    default: throw new Error('未支持证明项 ' + node.op);
  }
}
function nodesOf(n) {
  if (n.op === 'mp') return 1 + nodesOf(n.a) + nodesOf(n.b);
  if (n.op === 'gen') return 1 + nodesOf(n.of);
  return 1;
}

const LEVELS = [
  { label: 'bj-19.21bit', title: '前件提取', teaches: 'P→∀xQ 与 P→Q 的辖域关系。', hint: '把 P 从全称前件里提出/收回。' },
  { label: 'ala1', title: '全称弱化', teaches: '∀xF(x) → ∀x(F(x)→G(x))? 由公理 A1 的全称形式。', hint: '在 ∀ 下用 A1，再分配。' },
  { label: 'ax5d', title: '嵌套全称引入', teaches: 'P→(Q→∀xQ) 的谓词实例。', hint: 'A1 与全称引入。' },
  { label: '2sp', title: '双重量词消去', teaches: '∀x∀yF(x)→F(x) 的双重实例化。', hint: '两次全称例化。' },
  { label: 'al2im', title: '三段全称分配', teaches: '∀x(F→(G→H)) 分配到三个前件。', hint: '连续两次全称分配。' },
  { label: 'bj-sylggt', title: '混合三段论', teaches: 'P→∀x(Q→R) 与 P→∀xQ 推出 P→∀xR。', hint: '分配后接三段论。' },
  { label: 'sylgt', title: '全称三段论', teaches: '∀x(G→H) 把 P→∀xG 接到 P→∀xH。', hint: '分配 + HS。' },
  { label: 'bj-2alim', title: '双层分配', teaches: '∀x∀y(F→G) 的分配。', hint: '两次 A5。' },
  { label: '2a1', title: '二次回指', teaches: '谓词版 A1 的两次实例。', hint: 'A1 连续两次代入。' },
  { label: 'al3im', title: '四段分配', teaches: '∀x(F→(G→(H→I))) 的四层分配。', hint: '连续三次分配。' },
  { label: '2ax5', title: '双重量词引入', teaches: 'P→∀x∀yP 的双层引入。', hint: '两次全称引入。' },
  { label: 'stdpc5v', title: '辖域移动（变体二）', teaches: '另一组合法的辖域移动实例。', hint: '同 *38。' },
  { label: 'bj-alrimg', title: '全称后件组合', teaches: 'P→∀xQ 与 ∀x(Q→R) 推出 P→∀xR。', hint: '先分配，再三段论。' },
  { label: 'stdpc5v', title: '辖域移动', teaches: '∀x(F(y)→G(x)) → (F(y)→∀xG(x))，y 不受 x 影响。', hint: '用全称引入与分配。' },
  { label: 'bj-spst', title: '全称替换前件', teaches: '(F(x)→G(x))→(∀xF(x)→G(x))。', hint: '先全称例化，再三段论。' },
  { label: 'bj-axc4', title: '全称合并', teaches: '两层 ∀ 与蕴含的复杂合并。', hint: '分配、引入、再分配。' },
  { label: 'bj-alsyl', title: '全称三段论链', teaches: '∀x(F→G) 与 ∀x(G→H) 推出 ∀x(F→H)。', hint: '两次分配后接命题三段论。' },
  { label: 'stdpc5v', title: '辖域移动（H/G）', teaches: '另一组谓词的辖域移动。', hint: '同 *39，换谓词。', map: { P: ['H', '(', 'y', ')'], Q: ['F', '(', 'x', ')'], R: ['G', '(', 'x', ')'] } },
  { label: 'bj-alsyl', title: '全称三段论（换序）', teaches: '谓词换序后的全称三段论。', hint: '同 *42，换谓词顺序。' },
  { label: 'stdpc5v', title: '辖域移动（变体三）', teaches: '另一组合法的辖域移动实例。', hint: '同 *38。' },
  { label: 'sylgt', title: '全称三段论（H/F）', teaches: '换谓词的全称三段论。', hint: '同 *32，换谓词。', map: { P: ['G', '(', 'x', ')'], Q: ['F', '(', 'x', ')'], R: ['H', '(', 'x', ')'] } },
  { label: 'bj-axc4', title: '全称合并（换序）', teaches: '换谓词后的全称合并。', hint: '同 *41，换谓词。', map: { P: ['G', '(', 'x', ')'], Q: ['F', '(', 'x', ')'], R: ['H', '(', 'x', ')'] } },
  { label: 'bj-spst', title: '全称替换前件（G）', teaches: '(G(x)→F(x))→(∀xG(x)→F(x))。', hint: '同 *40，换谓词。', map: { P: ['G', '(', 'x', ')'], Q: ['F', '(', 'x', ')'], R: ['H', '(', 'x', ')'] } },
  { label: 'stdpc5v', title: '辖域移动（F/G 变体）', teaches: '另一组合法的辖域移动。', hint: '同 *39，换变元位置。', map: { P: ['F', '(', 'z', ')'], Q: ['G', '(', 'y', ')'], R: ['H', '(', 'x', ')'] } }
];

const out = [];
LEVELS.forEach((spec, i) => {
  const map = spec.map || defaultMap(spec.label);
  const r = expand(spec.label, {}, [], {});
  const proof = convertProof(r.term, map);
  const target = convertTokens(r.targetTokens.slice(1), map);
  out.push({
    no: 25 + i,
    chapter: 1,
    label: spec.label,
    title: spec.title,
    teaches: spec.teaches,
    hint: spec.hint,
    targetTokens: ['|-'].concat(target),
    proof,
    stats: { nodes: nodesOf(proof) }
  });
  console.log(String(25 + i).padStart(2, '0'), spec.label.padEnd(12), 'nodes=' + String(nodesOf(proof)).padStart(4));
});

fs.writeFileSync(path.join(ROOT, 'campaign', 'chapter2.json'), JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log('written campaign/chapter2.json', out.length, 'levels');
