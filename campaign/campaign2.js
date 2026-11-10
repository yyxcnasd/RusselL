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

const LEGACY_LEVELS = require(path.join(ROOT, 'campaign', 'legacy-levels.json'));
const LEGACY_BY_NO = new Map();
LEGACY_LEVELS.forEach((lv) => { if (lv.no != null) LEGACY_BY_NO.set(lv.no, lv); });

/* 把 legacy 已验证电路包装成 circuit 关卡（定理引用 {n} → 占位符 @legacyN） */
function legacyCircuit(no) {
  const lv = LEGACY_BY_NO.get(no);
  if (!lv) throw new Error('缺少 legacy 关卡 *' + no);
  const solNodes = lv.solution.nodes;
  const solIds = new Set(solNodes.map((n) => n.id));
  const edges = lv.solution.edges.filter((e) => solIds.has(e.from.node) && solIds.has(e.to.node));
  let outputId = null;
  lv.solution.edges.forEach((e) => { if (!solIds.has(e.to.node) && outputId == null) outputId = e.from.node; });
  if (!outputId) throw new Error('legacy *' + no + ' 找不到输出节点');
  const nodes = solNodes.map((n) => {
    const copy = { id: n.id, kind: n.kind, config: JSON.parse(JSON.stringify(n.config || {})) };
    if (n.kind === 'theorem' && n.config && n.config.n != null) copy.config = { code: '@legacy' + n.config.n };
    return copy;
  });
  return { nodes, edges: edges.map((e) => ({ from: { node: e.from.node, port: e.from.port }, to: { node: e.to.node, port: e.to.port } })), outputId };
}

const LEGACY_BASE = [1, 2, 3, 4, 14];

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


/* ---------- 手写困难关（演绎定理生成，补足数量） ---------- */
const DT = require(path.join(ROOT, 'scripts', 'lib', 'proof-dt.js'));
function authoredHards() {
  const out = [];
  /* 1) 三段蕴涵链：(P→Q)→((Q→R)→((R→S)→(P→S))) */
  {
    const A = IMP(P, Q), B = IMP(Q, R), C = IMP(R, S);
    let d = DT.mpNode({ f: A, node: null, hyp: true }, { f: P, node: null, hyp: true });   /* Q */
    d = DT.mpNode({ f: B, node: null, hyp: true }, d);                                    /* R */
    d = DT.mpNode({ f: C, node: null, hyp: true }, d);                                    /* S */
    const r = DT.dtMany(d, [P, A, B, C]);
    if (false) out.push({ key: 'chain3', title: '三段蕴涵链', teaches: '三节链条接起来：P→Q、Q→R、R→S 一路读到 P→S。',
      target: r.f, dtProof: r.node });
  }
  /* 2) 后件合并：(P→(Q→R))→((P→Q)→(P→R)) 是 A2；这里做它“反方向”的实用形式
   *    ((P→Q)→(P→R))→(P→(Q→R)) */
  {
    const A = IMP(IMP(P, Q), IMP(P, R));
    const a1 = { f: IMP(Q, IMP(P, Q)), node: DT.ax('A1', { P: Q, Q: P }), hyp: false, op: null };
    const pq = DT.mpNode(a1, { f: Q, node: null, hyp: true });                            /* Q→P? 实际 Q→(P→Q) 与 Q 分离后得 P→Q */
    const pr = DT.mpNode({ f: A, node: null, hyp: true }, pq);                            /* P→R */
    const r0 = DT.mpNode(pr, { f: P, node: null, hyp: true });                            /* R */
    const r = DT.dtMany(r0, [P, Q, A]);
    out.push({ key: 'expConv', title: '后件合并', teaches: '把 (P→Q)→(P→R) 整理成 P→(Q→R)。',
      target: r.f, dtProof: r.node });
  }
  /* 3) 前件换位：(P→Q)→R 与 P、Q 一起可以得到 R，写成三条前件的链 */
  {
    const X = IMP(IMP(P, Q), R);
    const a1 = { f: IMP(Q, IMP(P, Q)), node: DT.ax('A1', { P: Q, Q: P }), hyp: false, op: null };
    const pq = DT.mpNode(a1, { f: Q, node: null, hyp: true });                            /* P→Q */
    const r0 = DT.mpNode({ f: X, node: null, hyp: true }, pq);                            /* R */
    const r = DT.dtMany(r0, [P, Q, X]);
    out.push({ key: 'preSwap', title: '前件换位', teaches: '((P→Q)→R) 先接 P、Q 得到 P→Q，再分离出 R。',
      target: r.f, dtProof: r.node });
  }
  /* 4) 四段链：(P→Q)→((Q→R)→((R→S)→((S→T)→(P→T)))) */
  {
    const T2 = ['T'];
    const A = IMP(P, Q), B = IMP(Q, R), C = IMP(R, S), D = IMP(S, T2);
    let d = DT.mpNode({ f: A, node: null, hyp: true }, { f: P, node: null, hyp: true });
    d = DT.mpNode({ f: B, node: null, hyp: true }, d);
    d = DT.mpNode({ f: C, node: null, hyp: true }, d);
    d = DT.mpNode({ f: D, node: null, hyp: true }, d);
    const r = DT.dtMany(d, [P, A, B, C, D]);
    if (false) out.push({ key: 'chain4', title: '四段蕴涵链', teaches: '四节链条：把 P→Q→R→S→T 一路接成 P→T。', target: r.f, dtProof: r.node });
  }
  /* 5) 前后件混合链：(P→Q)→((R→P)→((S→R)→(S→Q))) */
  {
    const A = IMP(P, Q), B = IMP(R, P), C = IMP(S, R);
    let d = DT.mpNode({ f: C, node: null, hyp: true }, { f: S, node: null, hyp: true });   /* R */
    d = DT.mpNode({ f: B, node: null, hyp: true }, d);                                     /* P */
    d = DT.mpNode({ f: A, node: null, hyp: true }, d);                                     /* Q */
    const r = DT.dtMany(d, [S, A, B, C]);
    if (false) out.push({ key: 'mixChain', title: '前后件混合链', teaches: '先由 S→R、R→P 得 S→P，再由 P→Q 得 S→Q。', target: r.f, dtProof: r.node });
  }
  /* 6) 前件搬移：(P→(Q→R))→((S→P)→(S→(Q→R))) */
  {
    const A = IMP(P, IMP(Q, R)), B = IMP(S, P);
    let d = DT.mpNode({ f: B, node: null, hyp: true }, { f: S, node: null, hyp: true });   /* P */
    d = DT.mpNode({ f: A, node: null, hyp: true }, d);                                     /* Q→R */
    const r = DT.dtMany(d, [S, A, B]);
    out.push({ key: 'preLift', title: '前件搬移', teaches: '把 P 换成 S→P 之后再接 P→(Q→R)。', target: r.f, dtProof: r.node });
  }
  return out;
}

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

const LEGACY_TITLES = {
  1: '同一律', 2: '后件恒等', 3: '前件自应用', 4: '前件交换', 14: '空真（爆炸）',
};

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
  LEGACY_BASE.forEach((no) => {
    const lv = LEGACY_BY_NO.get(no);
    const target = lv.targetTokens.slice(1);
    defs.push({
      key: 'legacy' + no, label: 'legacy' + no, chapter: 0, chapterGroup: 'Ⅰ',
      forceBand: 'base',
      title: LEGACY_TITLES[no] || ('原始引理 *' + no),
      teaches: T.fmt(['wff'].concat(target)),
      hint: '目标是 ' + T.fmt(['wff'].concat(target)) + '。从最左的构造块开始，按参考接线接到 ⊢。',
      target, circuit: legacyCircuit(no),
    });
  });
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
      target: m.target, proof: m.proof || m.dtProof,
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
