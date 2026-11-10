'use strict';
/*!
 * 课程编排（作者侧唯一入口）
 *
 * 输出一组**未排序**的关卡定义，交给 scripts/build-campaign2.js 去编译、测量、
 * 排成引理阶梯（前 10 关普通、其余困难）并跑门禁。
 *
 * 每关：{ key, label?, chapterGroup, title, teaches, hint, target, proof }
 *   - label = set.mm 断言 label → 目标/证明由 scripts/lib/mm-bridge.js 从导入的证明 DAG 翻译；
 *     证明里对其它关卡的引用通过占位代号 '@<label>' 表示，构建器最后统一重映射成 Ⅰ-01 等。
 *   - 手写关：直接给 target 与证明项。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const bridge = require(path.join(ROOT, 'scripts', 'lib', 'mm-bridge.js'));
const T = require(path.join(ROOT, 'src', 'term.js'));

const PROOF_DIR = path.join(ROOT, 'campaign', 'mm', 'proofs');
const PROOFS = new Map();
fs.readdirSync(PROOF_DIR).filter((f) => f.endsWith('.json')).forEach((f) => {
  const dag = JSON.parse(fs.readFileSync(path.join(PROOF_DIR, f), 'utf8'));
  PROOFS.set(dag.label, dag);
});
const loadDag = (label) => PROOFS.get(label) || null;

/* ---------- 手写关（表面语法；末尾 def-contract） ---------- */
const BSLASH = String.fromCharCode(92);
const P = ['P'], Q = ['Q'], R = ['R'], S = ['S'];
const NOT = (a) => ['-.'].concat(a);
const IMP = (a, b) => ['('].concat(a, ['->'], b, [')']);
const AND = (a, b) => ['('].concat(a, ['/' + BSLASH], b, [')']);
const OR = (a, b) => ['('].concat(a, [BSLASH + '/'], b, [')']);
const IFF = (a, b) => ['('].concat(a, ['<->'], b, [')']);
const labelRef = (label, atoms) => ({ op: 'lemma', code: '@' + label, atoms: atoms || {} });
const dCon = (of) => ({ op: 'defContract', of });
const ax = (schema, atoms) => ({ op: 'axiom', schema, atoms: atoms || {} });

const MANUAL = [
  {
    key: 'andI', title: '合取引入', teaches: 'P、Q 一起给出 P∧Q（∧ 是 ¬(A→¬B) 的缩写）。',
    target: IMP(P, IMP(Q, AND(P, Q))), proof: dCon(labelRef('pm3.2im')),
  },
  {
    key: 'andEl', title: '合取消去左', teaches: 'P∧Q 给出 P。',
    target: IMP(AND(P, Q), P), proof: dCon(labelRef('simplim', { Q: NOT(Q) })),
  },
  {
    key: 'andEr', title: '合取消去右', teaches: 'P∧Q 给出 Q。',
    target: IMP(AND(P, Q), Q), proof: dCon(labelRef('simprim')),
  },
  {
    key: 'orIl', title: '析取引入左', teaches: 'P 给出 P∨Q（∨ 是 ¬A→B 的缩写）。',
    target: IMP(P, OR(P, Q)), proof: dCon(labelRef('pm2.24')),
  },
  {
    key: 'orIr', title: '析取引入右', teaches: 'Q 给出 P∨Q，是公理 A1 的实例。',
    target: IMP(Q, OR(P, Q)), proof: dCon(ax('A1', { P: Q, Q: NOT(P) })),
  },
  {
    key: 'iffI', title: '等值引入', teaches: 'A→B 与 B→A 一起给出 A↔B。',
    target: IMP(IMP(P, Q), IMP(IMP(Q, P), IFF(P, Q))),
    proof: dCon(labelRef('pm3.2im', { P: IMP(P, Q), Q: IMP(Q, P) })),
  },
  {
    key: 'iffEl', title: '等值消去左', teaches: 'A↔B 给出 A→B。',
    target: IMP(IFF(P, Q), IMP(P, Q)),
    proof: dCon(labelRef('simplim', { P: IMP(P, Q), Q: NOT(IMP(Q, P)) })),
  },
  {
    key: 'iffEr', title: '等值消去右', teaches: 'A↔B 给出 B→A。',
    target: IMP(IFF(P, Q), IMP(Q, P)),
    proof: dCon(labelRef('simprim', { P: IMP(P, Q), Q: IMP(Q, P) })),
  },
];

/* ---------- 第Ⅰ章导入关 ---------- */
const TITLES = {
  id: '同一律', con4: 'A3 的改写形式', 'pm2.21': '空真（爆炸）', 'pm2.18': '反证收尾',
  simprim: '否定蕴涵取后件', idd: '后件恒等', '2a1': '弱化加一层', 'pm2.27': '前件自应用',
  'pm2.43': '前件收缩', imim2: '后件替换', imim1: '蕴涵传递', 'pm2.04': '前件交换',
  jarr: '反件消去', 'pm2.86': '前件合并', 'pm2.24': '双重否定爆炸', notnotr: '双重否定消去',
  con2: '否定后件换位', notnot: '双重否定引入', con1: '逆否换位', 'pm3.2im': '合取的蕴涵形式',
  jcn: '先否后件', simplim: '否定蕴涵取前件', 'pm2.5': '否定蕴涵分配', conax1: '否定蕴涵取后件',
  'pm2.51': '否定蕴涵结论一', 'pm2.52': '否定蕴涵结论二', expt: '合取前件导出', impt: '合取前件引入',
  'pm2.01': '矛盾推出否定', 'pm2.6': '分情况一', 'pm2.61': '分情况二', 'pm2.65': '矛盾消去',
  peirce: '皮尔士律', looinv: '反件换位', con3: '逆否', ax1w: '弱化公理', idALT: '同一律（变体）',
  'pm2.83': '前件重排', peirceroll: '皮尔士回滚', imim12: '蕴涵组合', loolin: '二次否定',
  loowoz: '前件二次', jarl: '反件左消', 'pm2.5g': '否定蕴涵分配二', conax1k: '否定蕴涵取后件二',
  'pm2.521g': '否定蕴涵后件三', 'pm2.521g2': '否定蕴涵前件三', 'pm2.521': '否定蕴涵换位',
  exptOLD: '合取前件导出（旧）',
};

const CHAPTER1_LABELS = require(path.join(ROOT, 'campaign', 'mm', 'seeds.json')).labels;

function hintFor(text) {
  return '目标是 ' + text + '。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。';
}

function buildDefs() {
  const closed = [];
  PROOFS.forEach((dag) => {
    const mand = dag.mandatory || [];
    if (!dag.finalStep) return;
    if (mand.some((h) => h.kind !== '$f')) return;      /* 只要闭公式定理 */
    if (!dag.conclusion || dag.conclusion[0] !== '|-' || dag.conclusion[1] !== '(') return;
    closed.push(dag.label);
  });
  const labelInfo = new Map();
  closed.forEach((label) => {
    labelInfo.set(label, { code: '@' + label, sigmaCanon: bridge.canonicalMap(loadDag(label)), index: 0 });
  });
  const ctx = { labels: labelInfo, loadDag, inlined: [] };
  const defs = [];
  closed.forEach((label) => {
    const dag = loadDag(label);
    let tr;
    try {
      tr = bridge.translateLevel(dag, ctx);
    } catch (err) {
      console.warn('跳过 ' + label + '：' + err.message);
      return;
    }
    defs.push({
      key: label, label, chapter: 0, chapterGroup: 'Ⅰ',
      title: TITLES[label] || ('引理 · ' + label),
      teaches: T.fmt(['wff'].concat(tr.target)),
      hint: hintFor(T.fmt(['wff'].concat(tr.target))),
      target: tr.target, proof: tr.proof,
    });
  });
  MANUAL.forEach((m) => {
    defs.push({
      key: m.key, chapter: 0, chapterGroup: 'Ⅰ',
      title: m.title, teaches: m.teaches,
      hint: '目标是 ' + T.fmt(['wff'].concat(m.target)) + '。' + m.teaches + ' 末尾用 D⁻ 把原始结论折回表面语法。',
      target: m.target, proof: m.proof,
    });
  });
  return { chapters: [
    { key: 'prop', id: 'Ⅰ', title: '命题演算' },
    { key: 'pred', id: 'Ⅱ', title: '谓词与量词' },
    { key: 'eq', id: 'Ⅲ', title: '等词' },
    { key: 'classic', id: 'Ⅳ', title: '集合论' },
  ], levels: defs };
}

module.exports = buildDefs();
