'use strict';
/*!
 * 单章课程编排（作者侧唯一入口）
 *
 * 游戏只有一个命题演算章节：8–12 个教学关 + 普通关 + 困难关，总计 96 关。
 * 内容全部来自 set.mm 的命题演算证明（scripts/mm-import.js 导出的 DAG，
 * scripts/lib/mm-bridge.js 翻译）以及少量手写的 ∧/∨/↔ 定义关。
 *
 * 每关：{ key, label?, title, teaches, hint, target, proof | circuit, tutorial?, tip? }
 *   - label = set.mm 断言 label；构建器会把同目标、更小的重复项合并。
 *   - 教学关由 tutorialDefs() 给出，tip 说明这一关教哪个元件。
 *
 * 输出未排序；scripts/build-campaign2.js 负责编译、测量、去重、排序和门禁。
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

/* set.mm 里公理闭包 ⊆ 我们的 A1–A3 的命题演算定理（49 条）。 */
const LABELS = require(path.join(ROOT, 'campaign', 'mm', 'seeds.json')).labels;

/* 用 legacy 已验证电路补 5 个真实小证明；它们的目标与部分导入定理相同，
   构建器按目标去重时保留模块数更小的那一份。 */
const LEGACY_LEVELS = require(path.join(ROOT, 'campaign', 'legacy-levels.json'));
const LEGACY_BY_NO = new Map();
LEGACY_LEVELS.forEach((lv) => { if (lv.no != null) LEGACY_BY_NO.set(lv.no, lv); });

const BSLASH = String.fromCharCode(92);
const P = ['P'], Q = ['Q'], R = ['R'], S = ['S'];
const NOT = (a) => ['-.'].concat(a);
const IMP = (a, b) => ['('].concat(a, ['->'], b, [')']);
const AND = (a, b) => ['('].concat(a, ['/' + BSLASH], b, [')']);
const OR = (a, b) => ['('].concat(a, [BSLASH + '/'], b, [')']);
const IFF = (a, b) => ['('].concat(a, ['<->'], b, [')']);
const tk = (text) => T.body(T.parse(text));
const ax = (schema, atoms) => ({ op: 'axiom', schema, atoms: atoms || {} });
const labelRef = (label, atoms) => ({ op: 'lemma', code: '@' + label, atoms: atoms || {} });
const dCon = (of) => ({ op: 'defContract', of });
const dExp = (of) => ({ op: 'defExpand', of });

/* 把 legacy 已验证电路包装成 circuit 关（定理引用 {n} → 占位符 @legacyN） */
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
  return {
    nodes,
    edges: edges.map((e) => ({ from: { node: e.from.node, port: e.from.port }, to: { node: e.to.node, port: e.to.port } })),
    outputId,
  };
}

const LEGACY_BASE = [1, 2, 3, 4, 14];
const LEGACY_TITLES = {
  1: '同一律', 2: '后件恒等', 3: '前件自应用', 4: '前件交换', 14: '空真（爆炸）',
};

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

/* ---------- 教学关（10 个）：只教一个元件，目标与主线不重复 ---------- */
function tutorialDefs() {
  const out = [];
  const tut = (key, title, code, flow, teaches, target, proof) => {
    out.push({
      key: 'tut_' + key, tutorial: true, band: 'tutorial',
      title, teaches, hint: teaches, tip: { code, flow }, target, proof,
    });
  };
  tut('axiom', '取出公理', 'A1', 'A1 ⇒ (P→(Q→P))', '接一块 A1。',
    tk('P→(Q→P)'), ax('A1'));
  tut('subst', '代入', 'S', 'A1 · P:=(R→Q) ⇒ (R→Q)→(Q→(R→Q))', '取 A1，把 P 代入 (R→Q)。',
    tk('(R→Q)→(Q→(R→Q))'), { op: 'axiom', schema: 'A1', atoms: { P: tk('R→Q') } });
  tut('mp', '分离', 'M', 'A · A→B ⇒ B', 'A1 与它的实例接 M。',
    tk('S→(P→(Q→P))'), {
      op: 'mp', a: ax('A1'),
      b: ax('A1', { P: tk('P→(Q→P)'), Q: ['S'] }),
    });
  tut('a2', '分配公理', 'A2', 'A2 ⇒ (P→(Q→R))→((P→Q)→(P→R))', '接一块 A2。',
    tk('(P→(Q→R))→((P→Q)→(P→R))'), ax('A2'));
  tut('a3', '逆否公理', 'A3', 'A3 ⇒ (¬P→¬Q)→(Q→P)', '接一块 A3。',
    tk('(¬P→¬Q)→(Q→P)'), ax('A3'));
  const a1And = IMP(AND(P, S), IMP(Q, AND(P, S)));
  tut('expand', '定义展开', 'D', 'A∧B ⇒ ¬(A→¬B)', '先造一个含 ∧ 的断言，再用 D 展开成原始公式。',
    T.body(T.expandDefinitions(['|-'].concat(a1And))), dExp(ax('A1', { P: AND(P, S) })));
  tut('contract', '定义收缩', 'D⁻', '¬(A→¬B) ⇒ A∧B', '先造原始公式，再用 D⁻ 折回 ∧。',
    tk('(P∧R)→(Q→(P∧R))'), dCon(ax('A1', { P: tk('¬(P→¬R)') })));
  tut('thmref', '引用已证定理', '⊢', '第 i 关 · P:=(P→Q), Q:=R ⇒ (P→Q)→(R→(P→Q))',
    '用 theorem 引用第 i 关，再代入。',
    tk('(P→Q)→(R→(P→Q))'), labelRef('tut_axiom', { P: tk('P→Q'), Q: ['R'] }));
  return out;
}

/* 把 set.mm 引理的自包含证明内联成证明项（不引用课程里的其它关）。
   用于 ∧/∨/↔ 规则关：它们必须自带完整推导，不能依赖后面才出现的大引理。 */
function inlineProof(label) {
  const dag = loadDag(label);
  if (!dag) throw new Error('缺少证明 ' + label);
  const ctx = { labels: new Map(), loadDag, inlined: [] };
  return bridge.translateLevel(dag, ctx).proof;
}
function inlineWith(label, atoms) {
  const pt = inlineProof(label);
  if (!atoms) return pt;
  return { op: 'subst', of: pt, atoms };
}

/* ---------- 手写困难关：∧/∨/↔ 的基本规则（内联真实证明，不引用后面的大引理） ---------- */
const MANUAL = [
  {
    key: 'andEl', title: '合取消去左', teaches: 'P∧Q 给出 P。',
    target: IMP(AND(P, Q), P), proof: dCon(inlineWith('simplim', { Q: NOT(Q) })),
  },
  {
    key: 'orIr', title: '析取引入右', teaches: 'Q 给出 P∨Q，是公理 A1 的实例。',
    target: IMP(Q, OR(P, Q)), proof: dCon(ax('A1', { P: Q, Q: NOT(P) })),
  },
  {
    key: 'iffI', title: '等值引入', teaches: 'A→B 与 B→A 一起给出 A↔B。',
    target: IMP(IMP(P, Q), IMP(IMP(Q, P), IFF(P, Q))),
    proof: dCon(inlineWith('pm3.2im', { P: tk('P→Q'), Q: tk('Q→P') })),
  },
  {
    key: 'iffEl', title: '等值消去左', teaches: 'A↔B 给出 A→B。',
    target: IMP(IFF(P, Q), IMP(P, Q)),
    proof: dCon(inlineWith('simplim', { P: tk('P→Q'), Q: NOT(tk('Q→P')) })),
  },
  {
    key: 'iffEr', title: '等值消去右', teaches: 'A↔B 给出 B→A。',
    target: IMP(IFF(P, Q), IMP(Q, P)),
    proof: dCon(inlineWith('simprim', { P: tk('P→Q'), Q: tk('Q→P') })),
  },
];

function buildDefs() {
  const defs = [];

  /* 五个 legacy 已验证小电路：普通带里的“真实接线”关。 */
  LEGACY_BASE.forEach((no) => {
    const lv = LEGACY_BY_NO.get(no);
    const target = lv.targetTokens.slice(1);
    defs.push({
      key: 'legacy' + no, label: 'legacy' + no, origin: 'legacy',
      title: LEGACY_TITLES[no] || ('原始引理 *' + no),
      teaches: T.fmt(['wff'].concat(target)),
      hint: '目标是 ' + T.fmt(['wff'].concat(target)) + '。从最左的构造块开始，按参考接线接到 ⊢。',
      target, circuit: legacyCircuit(no),
    });
  });

  /* set.mm 命题演算定理：49 条，全部导入。 */
  const labelInfo = new Map();
  LABELS.forEach((label) => {
    const dag = loadDag(label);
    if (!dag) return;
    labelInfo.set(label, { code: '@' + label, sigmaCanon: bridge.canonicalMap(dag), index: 0 });
  });
  const ctx = { labels: labelInfo, loadDag, inlined: [] };
  LABELS.forEach((label) => {
    const dag = loadDag(label);
    if (!dag) return;
    let tr;
    try {
      tr = bridge.translateLevel(dag, ctx);
    } catch (err) {
      console.warn('跳过 ' + label + '：' + err.message);
      return;
    }
    defs.push({
      key: label, label, origin: 'setmm',
      title: TITLES[label] || ('命题定理 · ' + label),
      teaches: T.fmt(['wff'].concat(tr.target)),
      hint: '目标是 ' + T.fmt(['wff'].concat(tr.target)) + '。先看最外层是蕴涵还是否定：蕴涵就从前提接起，否定就先接到「¬(…)→…」的实例上。',
      target: tr.target, proof: tr.proof,
    });
  });

  MANUAL.forEach((m) => {
    defs.push({
      key: m.key, origin: 'manual',
      title: m.title, teaches: m.teaches,
      hint: '目标是 ' + T.fmt(['wff'].concat(m.target)) + '。' + m.teaches + ' 末尾用 D⁻ 把原始结论折回表面语法。',
      target: m.target, proof: m.proof,
    });
  });

  tutorialDefs().forEach((t) => defs.push(t));
  return { id: 'prop-96', levels: defs };
}

module.exports = buildDefs();
