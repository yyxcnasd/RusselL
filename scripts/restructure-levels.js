#!/usr/bin/env node
'use strict';
/* 内容生成器：campaign/legacy-levels.json + campaign/lemma-levels.json → src/levels.js。
 *
 * 关卡结构（docs/LOGIC-REDESIGN.md §3，编号固定）：
 *   每章：教学关 → 10 普通关 →（第Ⅰ章额外 9 引理关）→ 24 困难关
 *   第Ⅰ章：普通 Ⅰ-01…Ⅰ-10、引理 Ⅰ-11…Ⅰ-19、困难 Ⅰ-20…Ⅰ-43
 *   第Ⅱ/Ⅲ/Ⅳ章：普通 X-01…X-10、困难 X-11…X-34
 *
 * 普通关素材 = 困难关参考电路里 5–20 个元件、无定理引用的依赖锥；
 * 第Ⅰ章因为大量子证明已被 theorem 引用取代，额外从 9 个引理关的原始语言
 * 参考证明里取素材；仍不足时用 A1/A2/M 构造自蕴涵普通关兜底（会打印警告）。
 *
 * 用法：
 *   node scripts/restructure-levels.js           生成 src/levels.js / src/campaign-meta.js
 *   node scripts/restructure-levels.js --check   生成后用真实 Engine 逐关自检
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
require(path.join(ROOT, 'src', 'term.js'));
require(path.join(ROOT, 'src', 'modules.js'));
require(path.join(ROOT, 'src', 'engine.js'));
const Term = globalThis.RSL.Term;
const Engine = globalThis.RSL.Engine;

const LEGACY_FILE = path.join(ROOT, 'campaign', 'legacy-levels.json');
const LEVELS_FILE = path.join(ROOT, 'src', 'levels.js');
const LEMMA_FILE = process.env.RSL_LEMMA_FILE
  ? path.resolve(process.env.RSL_LEMMA_FILE)
  : path.join(ROOT, 'campaign', 'lemma-levels.json');
const LEGACY = fs.existsSync(LEGACY_FILE) ? JSON.parse(fs.readFileSync(LEGACY_FILE, 'utf8')) : require(LEVELS_FILE);

const CHAPTERS = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'];
const CHAPTER_INDEX = { 'Ⅰ': 0, 'Ⅱ': 1, 'Ⅲ': 2, 'Ⅳ': 3 };
const PAD = (n) => String(n).padStart(2, '0');
const NORMAL_TARGET = 10;
const LEMMA_CODES = ['Ⅰ-11', 'Ⅰ-12', 'Ⅰ-13', 'Ⅰ-14', 'Ⅰ-15', 'Ⅰ-16', 'Ⅰ-17', 'Ⅰ-18', 'Ⅰ-19'];
const LEMMA_CHAPTER = 'Ⅰ';
const DERIVED_KINDS = [
  'and-intro-ax', 'and-elim-ax', 'or-intro-ax', 'or-elim-ax', 'iff-intro-ax', 'iff-elim-ax'
];
/* 普通关的依赖锥里不允许出现的节点（契约：普通关排在引理关之前、保持原始语言）：
 * theorem 会引用更晚的关卡，def-expand/def-contract 则是定义重写、不能冒充证明。 */
const NORMAL_CONE_BANNED = ['theorem', 'target', 'def-expand', 'def-contract'];
/* 自蕴涵普通关的兜底素材（target = A→A 的原始写法，只用 A1/A2/M）。 */
const SYNTHETIC_BODIES = ['P', '(P→Q)', '¬P', '¬(P→Q)', 'P→¬Q', '¬¬P', 'Q'];
/* 兜底关元件数必须落在这个区间（(a) 素材不足时才用）。 */
const SYNTHETIC_MIN_NODES = 8;
const SYNTHETIC_MAX_NODES = 14;

function clone(x) { return JSON.parse(JSON.stringify(x)); }
function key(tokens) { return tokens.join('\u0000'); }
function fmtTarget(tokens) { return Term.fmt(tokens.slice(1)); }

/* =========================================================================
 * 0. 引理关输入
 * ========================================================================= */

function loadLemmas() {
  if (!fs.existsSync(LEMMA_FILE)) {
    console.error('缺少 ' + path.relative(ROOT, LEMMA_FILE) + '：第Ⅰ章需要 9 个引理关（Ⅰ-11…Ⅰ-19，band \'lemma\'）。');
    console.error('该文件由引理关作者脚本生成（node scripts/build-lemmas.js），请先生成它，再运行本脚本。');
    process.exit(2);
  }
  let list;
  try {
    list = JSON.parse(fs.readFileSync(LEMMA_FILE, 'utf8'));
  } catch (err) {
    console.error('无法解析 ' + path.relative(ROOT, LEMMA_FILE) + '：' + err.message);
    process.exit(2);
  }
  if (!Array.isArray(list)) {
    console.error(path.relative(ROOT, LEMMA_FILE) + ' 必须是关卡数组。');
    process.exit(2);
  }
  const problems = [];
  if (list.length !== LEMMA_CODES.length) {
    problems.push('应有 ' + LEMMA_CODES.length + ' 个引理关，实际 ' + list.length + ' 个');
  }
  list.forEach((lv, i) => {
    const want = LEMMA_CODES[i];
    const tag = want || ('#' + (i + 1));
    if (!lv || typeof lv !== 'object') { problems.push(tag + ' 不是关卡对象'); return; }
    if (lv.code !== want) problems.push(tag + ' 的 code 应为 ' + want + '，实际 ' + lv.code);
    if (lv.band !== 'lemma') problems.push(tag + ' 的 band 应为 lemma，实际 ' + lv.band);
    if (lv.hard) problems.push(tag + ' 的 hard 应为 false');
    if (lv.tutorial) problems.push(tag + ' 的 tutorial 应为 false');
    if (lv.chapter !== 0) problems.push(tag + ' 的 chapter 应为 0，实际 ' + lv.chapter);
    if (lv.chapterGroup !== LEMMA_CHAPTER) problems.push(tag + ' 的 chapterGroup 应为 ' + LEMMA_CHAPTER);
    if (!Array.isArray(lv.targetTokens) || lv.targetTokens[0] !== '|-') problems.push(tag + ' 缺少 canonical targetTokens（| - 开头）');
    if (!lv.solution || !Array.isArray(lv.solution.nodes) || !lv.solution.nodes.length) problems.push(tag + ' 缺少 solution.nodes');
    if (!lv.solution || !Array.isArray(lv.solution.edges)) problems.push(tag + ' 缺少 solution.edges');
    if (!Array.isArray(lv.initialNodes) || !lv.initialNodes.some((n) => n && n.kind === 'target')) problems.push(tag + ' 缺少目标焊盘');
    const solutionNodes = (lv.solution && lv.solution.nodes) || [];
    solutionNodes.forEach((n) => {
      if (n && DERIVED_KINDS.indexOf(n.kind) >= 0) problems.push(tag + ' 参考解残留派生模块 ' + n.kind);
      if (n && n.kind === 'theorem' && n.config && LEMMA_CODES.indexOf(n.config.code) >= i) {
        problems.push(tag + ' 引用了不更早的引理 ' + n.config.code);
      }
    });
    (lv.palette || []).forEach((p) => {
      if (p && DERIVED_KINDS.indexOf(p.kind) >= 0) problems.push(tag + ' palette 残留派生模块 ' + p.kind);
    });
  });
  if (problems.length) {
    console.error('引理关数据不合格（' + path.relative(ROOT, LEMMA_FILE) + '）：');
    problems.slice(0, 20).forEach((p) => console.error('  - ' + p));
    if (problems.length > 20) console.error('  …还有 ' + (problems.length - 20) + ' 项');
    process.exit(3);
  }
  /* 字段保持；只补 proof-author 允许缺省的派生字段。 */
  return list.map((lv, i) => {
    const out = clone(lv);
    if (typeof out.no !== 'number') out.no = 11 + i;
    if (!out.palette || !out.palette.length) out.palette = paletteOf((out.solution.nodes || []));
    if (!out.stats || typeof out.stats.steps !== 'number') {
      out.stats = Object.assign({}, out.stats, { steps: (out.solution.nodes || []).length });
    }
    return out;
  });
}

/* =========================================================================
 * 1. 基础工具
 * ========================================================================= */

/** 定理模块求值用的关卡表：先放引理关，再放 legacy 素材（旧号）。 */
let THEOREM_LEVELS = [];
function evalLevel(level, nodes, edges) {
  return Engine.evaluate(level, nodes, edges, { levels: THEOREM_LEVELS, levelNo: level.no || 99 });
}

function paletteOf(nodes) {
  const out = [], seen = new Set();
  nodes.forEach((n) => {
    if (n.kind === 'target') return;
    const cfg = n.kind === 'subst' ? {} : (n.config || {});
    const k = n.kind + ':' + JSON.stringify(cfg);
    if (seen.has(k)) return;
    seen.add(k);
    out.push({ kind: n.kind, config: cfg });
  });
  return out;
}

/** 按依赖深度自动排版（教学关/兜底关用），target 由调用方放到最右。 */
function layout(nodes, edges) {
  const incoming = new Map(nodes.map((n) => [n.id, []]));
  edges.forEach((e) => { if (incoming.has(e.to.node)) incoming.get(e.to.node).push(e.from.node); });
  const depth = new Map();
  const active = new Set();
  function depthOf(id) {
    if (depth.has(id)) return depth.get(id);
    if (active.has(id)) return 0;
    active.add(id);
    let d = 0;
    (incoming.get(id) || []).forEach((src) => { d = Math.max(d, depthOf(src) + 1); });
    active.delete(id);
    depth.set(id, d);
    return d;
  }
  nodes.forEach((n) => depthOf(n.id));
  const columns = new Map();
  nodes.forEach((n) => {
    const d = depth.get(n.id) || 0;
    if (!columns.has(d)) columns.set(d, []);
    columns.get(d).push(n);
  });
  nodes.forEach((n) => {
    const d = depth.get(n.id) || 0;
    n.x = 40 + 268 * d;
    n.y = 40 + 140 * columns.get(d).indexOf(n);
  });
}

function attachTarget(nodes, edges, outId, targetTokens) {
  const target = { id: 'nt', kind: 'target', config: {}, x: 0, y: 0, targetTokens: targetTokens };
  const allEdges = edges.concat([{ id: 'eT', from: { node: outId, port: 'out' }, to: { node: 'nt', port: 'proof' } }]);
  layout(nodes, allEdges);
  const maxX = Math.max.apply(null, nodes.map((n) => n.x).concat([0]));
  target.x = maxX + 268;
  target.y = 40;
  return { target: target, edges: allEdges };
}

/* =========================================================================
 * 2. 普通关：从参考电路里取依赖锥
 * ========================================================================= */

function normalCandidates(level, hardTargets) {
  const target = level.initialNodes.find((n) => n.kind === 'target');
  const nodes = [target].concat(level.solution.nodes);
  const edges = level.solution.edges;
  const incoming = new Map();
  nodes.forEach((n) => incoming.set(n.id, []));
  edges.forEach((e) => { if (incoming.has(e.to.node)) incoming.get(e.to.node).push(e.from.node); });
  const result = evalLevel(level, nodes, edges);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const out = [];
  level.solution.nodes.forEach((n, order) => {
    const r = result.results[n.id];
    if (!r || !r.tokens || r.tokens[0] !== '|-') return;
    if (hardTargets.has(key(r.tokens))) return;
    const seen = new Set([n.id]), stack = [n.id];
    let bad = false;
    while (stack.length) {
      const id = stack.pop();
      const node = byId.get(id);
      if (!node) continue;
      if (NORMAL_CONE_BANNED.indexOf(node.kind) >= 0) { bad = true; break; }
      (incoming.get(id) || []).forEach((p) => {
        if (!seen.has(p)) { seen.add(p); stack.push(p); }
      });
    }
    if (bad) return;
    if (seen.size < 5 || seen.size > 20) return;
    const ruleKinds = new Set();
    seen.forEach((id) => {
      const node = byId.get(id);
      if (node && !['atom', 'term', 'pred', 'not', 'imp', 'and', 'or', 'iff', 'all', 'exists', 'mem'].includes(node.kind)) {
        ruleKinds.add(node.kind);
      }
    });
    out.push({
      id: n.id, tokens: r.tokens.slice(), size: seen.size, nodes: Array.from(seen),
      order, rules: ruleKinds, hasMp: ruleKinds.has('mp'),
      complex: Array.from(ruleKinds).some((k) => k !== 'axiom' && k !== 'subst')
    });
  });
  out.sort((a, b) => a.size - b.size || a.order - b.order);
  /* 这里只负责“列出全部候选”，由 pickNormals 按难度档挑选；不能提前截断，
   * 否则小元件但只有 axiom/subst 的锥会把真正含 mp 的候选挤掉（引理关素材就是这种情况）。 */
  const picked = [], formulas = new Set();
  for (const c of out) {
    const k = key(c.tokens);
    if (formulas.has(k)) continue;
    formulas.add(k);
    picked.push(c);
  }
  return picked;
}

function pickNormals(chapterGroup, sources, hardTargets, lemmaSet) {
  const all = [];
  sources.forEach((l) => {
    normalCandidates(l, hardTargets).forEach((c) => all.push({ level: l, cand: c }));
  });
  all.sort((a, b) => a.cand.size - b.cand.size ||
    (a.level.no || 0) - (b.level.no || 0) ||
    String(a.level.code).localeCompare(String(b.level.code)) ||
    a.cand.order - b.cand.order);
  const picked = [];
  const seen = new Set();
  /* 普通关不能只是“一条 S 就能过”的公理实例：优先含 mp、至少 8 块，
   * 公式也别太长；再按 8–20 块铺开难度。 */
  const tiers = [
    (x) => x.cand.hasMp && x.cand.size >= 8 && x.cand.tokens.length <= 45,
    (x) => x.cand.hasMp && x.cand.size >= 6 && x.cand.tokens.length <= 60,
    (x) => x.cand.complex && x.cand.size >= 6,
    (x) => x.cand.complex
  ];
  const sizes = [8, 9, 10, 11, 12, 14, 16, 18, 19, 20];
  tiers.forEach((test) => {
    if (picked.length === NORMAL_TARGET) return;
    const pool = all.filter((x) => test(x) && !seen.has(key(x.cand.tokens)));
    sizes.forEach((want) => {
      if (picked.length === NORMAL_TARGET) return;
      let best = null;
      pool.forEach((x) => {
        const k = key(x.cand.tokens);
        if (seen.has(k)) return;
        const score = Math.abs(x.cand.size - want) * 100 + x.cand.tokens.length;
        if (!best || score < best.score) best = { x: x, score: score };
      });
      if (!best) return;
      seen.add(key(best.x.cand.tokens));
      picked.push(best.x);
    });
  });
  return { all: all, picked: picked };
}

function makeNormal(level, cand, code, no, chapterGroup) {
  const oldById = new Map(level.solution.nodes.map((n) => [n.id, n]));
  const subset = cand.nodes.map((id) => oldById.get(id)).filter(Boolean);
  const nodeMap = new Map();
  subset.forEach((n, i) => nodeMap.set(n.id, 'n' + (i + 1)));
  const nodes = subset.map((n) => ({
    id: nodeMap.get(n.id),
    kind: n.kind,
    config: clone(n.config || {}),
    x: n.x,
    y: n.y
  }));
  const edges = [];
  let eid = 0;
  level.solution.edges.forEach((e) => {
    if (!nodeMap.has(e.from.node) || !nodeMap.has(e.to.node)) return;
    edges.push({
      id: 'e' + (++eid),
      from: { node: nodeMap.get(e.from.node), port: e.from.port },
      to: { node: nodeMap.get(e.to.node), port: e.to.port }
    });
  });
  const targetTokens = cand.tokens.slice();
  const attached = attachTarget(nodes, edges, nodeMap.get(cand.id), targetTokens);
  const text = fmtTarget(targetTokens);
  return {
    id: code,
    code: code,
    no: no,
    tutorial: false,
    hard: false,
    band: 'base',
    chapter: level.chapter,
    chapterGroup: chapterGroup,
    title: '引理 · ' + text.slice(0, 20),
    teaches: text,
    hint: '第' + chapterGroup + '章先证：' + text + '。先搭最左边的构造块，再沿依赖接到 ⊢。',
    tip: null,
    targetTokens: targetTokens,
    palette: paletteOf(nodes),
    initialNodes: [attached.target],
    solution: { nodes: nodes, edges: attached.edges },
    difficulty: nodes.length + 0.1 * (targetTokens.length / 4),
    mustUse: Array.from(cand.rules).filter((k) => k !== 'axiom' && k !== 'subst'),
    stats: { steps: nodes.length }
  };
}

/* =========================================================================
 * 3. 兜底普通关：A1/A2/M 证 A→A（A 由构造模块拼）
 * ========================================================================= */

function makeBuilder(prefix) {
  let nodeSeq = 0, edgeSeq = 0;
  const nodes = [], edges = [];
  const atomCache = new Map(), formulaCache = new Map();
  function addNode(kind, config) {
    const n = { id: prefix + 'n' + (++nodeSeq), kind: kind, config: config || {}, x: 0, y: 0 };
    nodes.push(n);
    return n;
  }
  function connect(from, fromPort, to, toPort) {
    edges.push({ id: prefix + 'e' + (++edgeSeq), from: { node: from.id, port: fromPort }, to: { node: to.id, port: toPort } });
  }
  function atomNode(name) {
    const up = String(name).toUpperCase();
    if (!atomCache.has(up)) atomCache.set(up, addNode('atom', { name: up }));
    return atomCache.get(up);
  }
  function formula(tree) {
    const k = JSON.stringify(tree);
    if (formulaCache.has(k)) return formulaCache.get(k);
    let node;
    switch (tree.k) {
      case 'atom': node = atomNode(tree.name); break;
      case 'not': { const a = formula(tree.a); node = addNode('not', {}); connect(a, 'out', node, 'a'); break; }
      case 'imp':
      case 'and':
      case 'or':
      case 'iff': {
        const a = formula(tree.a), b = formula(tree.b);
        node = addNode(tree.k, {});
        connect(a, 'out', node, 'a');
        connect(b, 'out', node, 'b');
        break;
      }
      case 'all':
      case 'exists': { const a = formula(tree.a); node = addNode(tree.k, { v: tree.v }); connect(a, 'out', node, 'a'); break; }
      default: throw new Error('无法构造公式节点：' + tree.k);
    }
    formulaCache.set(k, node);
    return node;
  }
  return { nodes: nodes, edges: edges, addNode: addNode, connect: connect, atomNode: atomNode, formula: formula };
}

/** 原始语言 Hilbert 证明：A→A，A 由 bodyText 指定（只用 A1、A2、M、S）。 */
function buildSelfImpCircuit(prefix, bodyText) {
  const b = makeBuilder(prefix);
  const bodyTokens = Term.body(Term.parse(bodyText));
  const A = b.formula(Term.read(['wff'].concat(bodyTokens)));
  const AA = b.addNode('imp', {});
  b.connect(A, 'out', AA, 'a');
  b.connect(A, 'out', AA, 'b');

  const atomP = b.atomNode('P');
  const atomQ = b.atomNode('Q');
  const atomR = b.atomNode('R');

  const ax1a = b.addNode('axiom', { schema: 'A1' });
  const s1a = b.addNode('subst', { groups: 1 });
  b.connect(ax1a, 'out', s1a, 'assertion');
  b.connect(atomP, 'out', s1a, 'atom1'); b.connect(A, 'out', s1a, 'formula1');
  b.connect(atomQ, 'out', s1a, 'atom2'); b.connect(A, 'out', s1a, 'formula2');

  const ax2 = b.addNode('axiom', { schema: 'A2' });
  const s2 = b.addNode('subst', { groups: 2 });
  b.connect(ax2, 'out', s2, 'assertion');
  b.connect(atomP, 'out', s2, 'atom1'); b.connect(A, 'out', s2, 'formula1');
  b.connect(atomQ, 'out', s2, 'atom2'); b.connect(AA, 'out', s2, 'formula2');
  b.connect(atomR, 'out', s2, 'atom3'); b.connect(A, 'out', s2, 'formula3');

  const ax1b = b.addNode('axiom', { schema: 'A1' });
  const s1b = b.addNode('subst', { groups: 1 });
  b.connect(ax1b, 'out', s1b, 'assertion');
  b.connect(atomP, 'out', s1b, 'atom1'); b.connect(A, 'out', s1b, 'formula1');
  b.connect(atomQ, 'out', s1b, 'atom2'); b.connect(AA, 'out', s1b, 'formula2');

  const mp1 = b.addNode('mp', {});
  b.connect(s1b, 'out', mp1, 'a');
  b.connect(s2, 'out', mp1, 'b');
  const mp2 = b.addNode('mp', {});
  b.connect(s1a, 'out', mp2, 'a');
  b.connect(mp1, 'out', mp2, 'b');

  return {
    nodes: b.nodes, edges: b.edges, outId: mp2.id, bodyTokens: bodyTokens,
    targetTokens: ['|-' , '('].concat(bodyTokens, ['->'], bodyTokens, [')'])
  };
}

function makeSyntheticNormal(chapterGroup, chapter, code, no, variant) {
  const bodyText = SYNTHETIC_BODIES[variant % SYNTHETIC_BODIES.length];
  const circuit = buildSelfImpCircuit('y' + variant, bodyText);
  const attached = attachTarget(circuit.nodes, circuit.edges, circuit.outId, circuit.targetTokens);
  const nodes = circuit.nodes;
  const text = fmtTarget(circuit.targetTokens);
  return {
    id: code, code: code, no: no, tutorial: false, hard: false, band: 'base',
    chapter: chapter, chapterGroup: chapterGroup,
    title: '引理 · ' + text.slice(0, 20),
    teaches: text,
    hint: '第' + chapterGroup + '章先证：' + text + '。用 A1、A2 的实例配合 M 拼出 A→A。',
    tip: null,
    targetTokens: circuit.targetTokens,
    palette: paletteOf(nodes),
    initialNodes: [attached.target],
    solution: { nodes: nodes, edges: attached.edges },
    difficulty: nodes.length + 0.1 * (circuit.targetTokens.length / 4),
    mustUse: ['mp'],
    stats: { steps: nodes.length }
  };
}

/* =========================================================================
 * 4. 教学关（契约 §5 的 vi / vii / viii）
 * ========================================================================= */

function makeTutorial(spec) {
  const attached = attachTarget(spec.nodes, spec.edges, spec.outId, spec.targetTokens);
  return {
    id: spec.id,
    code: spec.code,
    no: null,
    tutorial: true,
    hard: false,
    band: 'tutorial',
    chapter: spec.chapter,
    chapterGroup: spec.chapterGroup,
    title: spec.title,
    teaches: spec.teaches,
    hint: spec.hint,
    tip: { code: spec.tipCode, flow: spec.tipFlow },
    targetTokens: spec.targetTokens,
    palette: paletteOf(spec.nodes),
    initialNodes: [attached.target],
    solution: { nodes: spec.nodes, edges: attached.edges },
    difficulty: 4,
    stats: { steps: spec.nodes.length }
  };
}

/** vi（第Ⅰ章）：定义 D——原始形 ⊢ ¬(P→¬Q)→¬(P→¬Q) → def-contract → 表面目标。 */
function tutorialDef() {
  const circuit = buildSelfImpCircuit('a', '¬(P→¬Q)');
  const dc = { id: 'adc', kind: 'def-contract', config: {}, x: 0, y: 0 };
  const nodes = circuit.nodes.concat([dc]);
  const edges = circuit.edges.concat([{
    id: 'aeT', from: { node: circuit.outId, port: 'out' }, to: { node: dc.id, port: 'assertion' }
  }]);
  return makeTutorial({
    id: 'T0vi', code: 'vi', chapter: 0, chapterGroup: 'Ⅰ', title: '定义 D',
    teaches: '∧、∨、↔ 只是原始公式的缩写：A∧B 就是 ¬(A→¬B)。先用 A1/A2/M 证原始形，再用 D⁻ 收缩回表面写法。',
    hint: '参考解先证 ¬(P→¬Q)→¬(P→¬Q)，最后用 D⁻ 收缩成 (P∧Q)→(P∧Q)。',
    tipCode: 'D',
    tipFlow: '¬(A→¬B) ⇒ A∧B',
    nodes: nodes, edges: edges, outId: dc.id,
    targetTokens: Term.parseAssertion('(P∧Q)→(P∧Q)')
  });
}

/** vii（第Ⅰ章）：原始语法——同一公式的原始写法，纯 ¬/→，不用 D。 */
function tutorialRawSyntax() {
  const circuit = buildSelfImpCircuit('b', '¬(P→¬Q)');
  return makeTutorial({
    id: 'T0vii', code: 'vii', chapter: 0, chapterGroup: 'Ⅰ', title: '原始语法',
    teaches: '原始语言只有 ¬ 和 →。把 A 代换成 ¬(P→¬Q) 以后，用 A1、A2 的实例和 M 直接堆出 A→A。',
    hint: '参考解不经过 D：A1、A2 各取实例，两次 M 得到 ¬(P→¬Q)→¬(P→¬Q)。',
    tipCode: '¬ →',
    tipFlow: 'A · A1 · A2 · M',
    nodes: circuit.nodes, edges: circuit.edges, outId: circuit.outId,
    targetTokens: circuit.targetTokens
  });
}

/** viii（第Ⅱ章）：引用已证定理——theorem Ⅰ-14 + subst 实例化。 */
function tutorialTheoremRef() {
  const b = makeBuilder('c');
  const atomP = b.atomNode('P');
  const atomQ = b.atomNode('Q');
  const atomR = b.atomNode('R');
  const atomS = b.atomNode('S');
  const thm = b.addNode('theorem', { code: 'Ⅰ-14' });
  const s = b.addNode('subst', { groups: 1 });
  b.connect(thm, 'out', s, 'assertion');
  b.connect(atomP, 'out', s, 'atom1'); b.connect(atomR, 'out', s, 'formula1');
  b.connect(atomQ, 'out', s, 'atom2'); b.connect(atomS, 'out', s, 'formula2');
  return makeTutorial({
    id: 'T1vi', code: 'vi', chapter: 1, chapterGroup: 'Ⅱ', title: '引用已证定理',
    teaches: '已证关卡可以当定理模块直接引用：theorem 取出 Ⅰ-14 的断言，再用 S 把 P、Q 换成具体公式。',
    hint: '定理 Ⅰ-14 是 (P∧Q)→P；把 P、Q 分别代入 R、S，就得到目标 (R∧S)→R。',
    tipCode: '⊢ · S',
    tipFlow: 'Ⅰ-14 · P:=R · Q:=S',
    nodes: b.nodes, edges: b.edges, outId: s.id,
    targetTokens: Term.parseAssertion('(R∧S)→R')
  });
}

function componentTutorials(chapterGroup) {
  if (chapterGroup === 'Ⅰ') return [tutorialDef(), tutorialRawSyntax()];
  if (chapterGroup === 'Ⅱ') return [tutorialTheoremRef()];
  return [];
}

/* =========================================================================
 * 5. 困难关
 * ========================================================================= */

function remapHard(level, codeMap, normalByTarget) {
  const target = level.initialNodes.find((n) => n.kind === 'target');
  let nodes = [target].concat(clone(level.solution.nodes));
  let edges = clone(level.solution.edges);
  /* 用本关之前的普通引理替换同公式子证明。 */
  const result = evalLevel(level, nodes, edges);
  const rewrite = new Set();
  nodes.forEach((n) => {
    if (n.kind === 'target' || n.kind === 'theorem') return;
    const r = result.results[n.id];
    if (!r || !r.tokens) return;
    const code = normalByTarget.get(key(r.tokens));
    if (!code) return;
    n.kind = 'theorem';
    n.config = { code: code };
    rewrite.add(n.id);
  });
  if (rewrite.size) {
    edges = edges.filter((e) => !rewrite.has(e.to.node));
    const needed = new Set([target.id]);
    let changed = true;
    while (changed) {
      changed = false;
      edges.forEach((e) => {
        if (needed.has(e.to.node) && !needed.has(e.from.node)) { needed.add(e.from.node); changed = true; }
      });
    }
    nodes = nodes.filter((n) => needed.has(n.id) || n.kind === 'target');
    const ids = new Set(nodes.map((n) => n.id));
    edges = edges.filter((e) => ids.has(e.from.node) && ids.has(e.to.node));
  }
  nodes.forEach((n) => {
    if (n.kind !== 'theorem' || n.config.code) return;
    const old = n.config.n;
    const code = codeMap.get(old);
    if (!code) throw new Error('未映射定理 *' + old + ' in ' + level.code);
    n.config = { code: code };
  });
  return { nodes: nodes.filter((n) => n.kind !== 'target'), edges: edges, target: nodes.find((n) => n.kind === 'target') };
}

function makeHard(level, code, no, chapterGroup, codeMap, normalByTarget) {
  const mapped = remapHard(level, codeMap, normalByTarget);
  const target = mapped.target;
  const oldTargetId = target.id;
  target.id = 'nt';
  target.x = 0; target.y = 40;
  const nodes = mapped.nodes;
  const edges = mapped.edges;
  edges.forEach((e) => { if (e.to.node === oldTargetId) e.to.node = 'nt'; });
  const maxX = Math.max.apply(null, nodes.map((n) => n.x).concat([0]));
  target.x = maxX + 268;
  return {
    id: code,
    code: code,
    no: no,
    tutorial: false,
    hard: true,
    band: 'challenge',
    chapter: level.chapter,
    chapterGroup: chapterGroup,
    title: level.title,
    teaches: level.teaches || '',
    hint: null,
    tip: null,
    targetTokens: level.targetTokens.slice(),
    palette: paletteOf(nodes),
    initialNodes: [target],
    solution: { nodes: nodes, edges: edges },
    difficulty: level.difficulty || nodes.length,
    stats: { steps: nodes.length }
  };
}

/* =========================================================================
 * 6. 组装
 * ========================================================================= */

function buildLevels() {
  const lemmas = loadLemmas();
  THEOREM_LEVELS = lemmas.map((l) => ({ code: l.code, targetTokens: l.targetTokens }))
    .concat(LEGACY.map((l) => ({ code: l.code, targetTokens: l.targetTokens })));

  const tutorials = LEGACY.filter((l) => l.tutorial).map((l) => {
    /* 旧教学关素材没有 band 字段；选关页按 band 分带，这里统一补齐。 */
    const lv = clone(l);
    if (!lv.band) lv.band = 'tutorial';
    return lv;
  });
  const mains = LEGACY.filter((l) => !l.tutorial);
  const byChapter = {};
  CHAPTERS.forEach((g) => { byChapter[g] = mains.filter((l) => l.chapterGroup === g); });

  const lemmaCounts = {};
  CHAPTERS.forEach((g) => { lemmaCounts[g] = g === LEMMA_CHAPTER ? lemmas.length : 0; });

  const normalCounts = {};
  const chapterNormals = {};
  const normalSources = {};
  const normalFromHards = {};
  const normalFromLemmas = {};
  const normalOrigins = {};
  const syntheticCounts = {};
  const syntheticCodes = {};
  const lemmaSet = new Set(lemmas);
  CHAPTERS.forEach((g) => {
    const hardTargets = new Set(byChapter[g].map((l) => key(l.targetTokens)));
    if (g === LEMMA_CHAPTER) lemmas.forEach((l) => hardTargets.add(key(l.targetTokens)));
    const sources = byChapter[g].slice();
    /* 第Ⅰ章：困难关里大量子证明已被 theorem 引用取代，普通关素材也从引理关的
     * 原始语言参考证明里取（这些依赖锥同样不含 theorem 引用）。 */
    if (g === LEMMA_CHAPTER) sources.push.apply(sources, lemmas);
    const { picked } = pickNormals(g, sources, hardTargets, lemmaSet);

    const used = new Set(picked.map((x) => key(x.cand.tokens)));
    hardTargets.forEach((k) => used.add(k));
    let variantCursor = 0;
    let synthetic = 0;
    while (picked.length < NORMAL_TARGET) {
      let synth = null;
      while (variantCursor < SYNTHETIC_BODIES.length) {
        const vi = variantCursor;
        variantCursor += 1;
        const body = SYNTHETIC_BODIES[vi];
        const bodyTokens = Term.body(Term.parse(body));
        const tokens = ['|-', '('].concat(bodyTokens, ['->'], bodyTokens, [')']);
        if (used.has(key(tokens))) continue;
        const probe = buildSelfImpCircuit('probe' + vi, body);
        if (probe.nodes.length < SYNTHETIC_MIN_NODES || probe.nodes.length > SYNTHETIC_MAX_NODES) continue;
        used.add(key(tokens));
        synth = { synthetic: true, variant: vi, tokens: tokens };
        break;
      }
      if (!synth) throw new Error('第' + g + '章普通关素材不足，且 8–14 元件的兜底变体已用尽');
      picked.push(synth);
      synthetic += 1;
    }
    chapterNormals[g] = picked;
    normalCounts[g] = picked.length;
    syntheticCounts[g] = synthetic;
    normalSources[g] = picked.filter((x) => !x.synthetic).length;
    normalFromHards[g] = picked.filter((x) => !x.synthetic && !lemmaSet.has(x.level)).length;
    normalFromLemmas[g] = picked.filter((x) => !x.synthetic && lemmaSet.has(x.level)).length;

    /* 章内困难关按定理依赖拓扑排序，同层优先放小证明，保证难度递增。 */
    const list = byChapter[g];
    const byNo = new Map(list.map((l) => [l.no, l]));
    const deps = new Map();
    list.forEach((l) => {
      const set = new Set();
      l.solution.nodes.forEach((n) => {
        if (n.kind === 'theorem' && n.config && n.config.n != null && byNo.has(n.config.n) && n.config.n !== l.no) {
          set.add(n.config.n);
        }
      });
      deps.set(l.no, set);
    });
    const order = [];
    const done = new Set();
    while (order.length < list.length) {
      const ready = list.filter((l) => !done.has(l.no) &&
        Array.from(deps.get(l.no)).every((d) => done.has(d) || !byNo.has(d)));
      if (!ready.length) {
        list.filter((l) => !done.has(l.no)).forEach((l) => { done.add(l.no); order.push(l); });
        break;
      }
      ready.sort((a, b) => a.solution.nodes.length - b.solution.nodes.length || a.no - b.no);
      const pickItem = ready[0];
      done.add(pickItem.no);
      order.push(pickItem);
    }
    byChapter[g] = order;
  });

  /* 先建立全关卡的旧号 → 新代码映射（第Ⅰ章困难关从 20 起）。 */
  const codeMap = new Map();
  CHAPTERS.forEach((g) => {
    const hardBase = normalCounts[g] + lemmaCounts[g];
    byChapter[g].forEach((l, i) => {
      codeMap.set(l.no, g + '-' + PAD(hardBase + i + 1));
    });
  });

  const out = [];
  CHAPTERS.forEach((g) => {
    tutorials.filter((l) => l.chapterGroup === g).forEach((l) => out.push(l));
    componentTutorials(g).forEach((l) => out.push(l));
    /* 普通关按元件数递增编号（Ⅰ-01 最容易 … Ⅰ-10 最难）。 */
    const normalPairs = chapterNormals[g].map((x) => {
      const lv = x.synthetic
        ? makeSyntheticNormal(g, CHAPTER_INDEX[g], '', 0, x.variant)
        : makeNormal(x.level, x.cand, '', 0, g);
      const origin = x.synthetic
        ? ('synthetic:' + SYNTHETIC_BODIES[x.variant % SYNTHETIC_BODIES.length] + '→' + SYNTHETIC_BODIES[x.variant % SYNTHETIC_BODIES.length])
        : (lemmaSet.has(x.level) ? ('lemma:' + x.level.code) : ('hard:*' + PAD(x.level.no)));
      return { x: x, lv: lv, origin: origin };
    });
    normalPairs.sort((a, b) => a.lv.solution.nodes.length - b.lv.solution.nodes.length ||
      a.lv.targetTokens.length - b.lv.targetTokens.length);
    syntheticCodes[g] = [];
    normalOrigins[g] = [];
    normalPairs.forEach((p, i) => {
      const lv = p.lv;
      lv.code = g + '-' + PAD(i + 1);
      lv.id = lv.code;
      lv.no = i + 1;
      if (p.x.synthetic) syntheticCodes[g].push(lv.code);
      normalOrigins[g].push(lv.code + ' <= ' + p.origin + ' (' + lv.solution.nodes.length + ' 元件)');
    });
    const normalLevels = normalPairs.map((p) => p.lv);
    const normalByTarget = new Map();
    normalLevels.forEach((lv) => normalByTarget.set(key(lv.targetTokens), lv.code));
    normalLevels.forEach((lv) => out.push(lv));
    if (g === LEMMA_CHAPTER) lemmas.forEach((l) => out.push(l));
    const hardBase = normalCounts[g] + lemmaCounts[g];
    byChapter[g].forEach((l, i) => {
      const no = hardBase + i + 1;
      out.push(makeHard(l, g + '-' + PAD(no), no, g, codeMap, normalByTarget));
    });
  });

  return {
    levels: out,
    stats: {
      normalCounts: normalCounts,
      lemmaCounts: lemmaCounts,
      syntheticCounts: syntheticCounts,
      syntheticCodes: syntheticCodes,
      normalSources: normalSources,
      normalFromHards: normalFromHards,
      normalFromLemmas: normalFromLemmas,
      normalOrigins: normalOrigins,
      codeMap: codeMap
    }
  };
}

/* =========================================================================
 * 7. 自检（--check）
 * ========================================================================= */

function checkLevels(levels) {
  const problems = [];
  const seenCodes = new Set();
  const seenTutorialCodes = new Map();
  levels.forEach((lv, i) => {
    if (!lv || typeof lv !== 'object') { problems.push('第 ' + i + ' 项不是关卡'); return; }
    const tag = lv.code || lv.id || ('#' + i);
    if (!lv.code) problems.push(tag + ' 缺少 code');
    if (lv.tutorial) {
      /* 教学关的 i/ii/… 是章内编号，跨章可以重复。 */
      const set = seenTutorialCodes.get(lv.chapterGroup) || new Set();
      if (set.has(lv.code)) problems.push('第' + lv.chapterGroup + '章教学关代号重复：' + lv.code);
      set.add(lv.code);
      seenTutorialCodes.set(lv.chapterGroup, set);
    } else {
      if (seenCodes.has(lv.code)) problems.push('关卡代号重复：' + lv.code);
      seenCodes.add(lv.code);
    }

    try {
      if (!Array.isArray(lv.targetTokens) || Term.typeOf(lv.targetTokens) !== '|-') throw new Error('不是 ⊢ 断言');
      Term.read(lv.targetTokens);
    } catch (err) {
      problems.push(tag + ' targetTokens 非法：' + err.message);
    }

    if (lv.tutorial) {
      if (lv.no !== null) problems.push(tag + ' 教学关 no 必须为 null');
      if (lv.band !== 'tutorial') problems.push(tag + ' 教学关 band 必须为 tutorial');
      if (!lv.tip || !lv.tip.code || !lv.tip.flow) problems.push(tag + ' 教学关缺少 tip.code / tip.flow');
      if (!lv.stats || typeof lv.stats.steps !== 'number' || lv.stats.steps > 20) problems.push(tag + ' 教学关 steps 必须 ≤ 20');
    } else {
      if (!new RegExp('^[ⅠⅡⅢⅣ]-\\d{2}$').test(lv.code || '')) problems.push(tag + ' 编号必须是 章节-两位数');
      if (lv.hard) {
        if (lv.hint !== null) problems.push(tag + ' 困难关 hint 必须为 null');
        if (lv.band !== 'challenge') problems.push(tag + ' 困难关 band 必须为 challenge');
      } else {
        if (lv.band !== 'base' && lv.band !== 'lemma') problems.push(tag + ' 普通/引理关 band 非法：' + lv.band);
        if (lv.band === 'base') {
          const n = (lv.solution && lv.solution.nodes || []).length;
          if (n < 5 || n > 20) problems.push(tag + ' 普通关必须有 5–20 个元件，实际 ' + n);
          if (!Array.isArray(lv.mustUse) || !lv.mustUse.length) problems.push(tag + ' 普通关 mustUse 不能为空');
        }
      }
    }

    if (!lv.solution || !Array.isArray(lv.solution.nodes) || !lv.solution.nodes.length ||
        !Array.isArray(lv.solution.edges)) {
      problems.push(tag + ' 缺少参考电路');
    }
    if (!Array.isArray(lv.initialNodes) || !lv.initialNodes.some((n) => n && n.kind === 'target')) {
      problems.push(tag + ' 缺少目标焊盘');
    }
    if (!Array.isArray(lv.palette) || !lv.palette.length) problems.push(tag + ' palette 为空');

    (lv.palette || []).forEach((p) => {
      if (p && DERIVED_KINDS.indexOf(p.kind) >= 0) problems.push(tag + ' palette 残留派生模块 ' + p.kind);
      if (p && p.kind === 'theorem') {
        const j = levels.findIndex((x) => x.code === p.config.code);
        if (j < 0) problems.push(tag + ' palette 定理引用不存在：' + p.config.code);
        else if (j >= i) problems.push(tag + ' palette 定理引用必须更早：' + p.config.code);
      }
    });
    ((lv.solution && lv.solution.nodes) || []).forEach((n) => {
      if (n && DERIVED_KINDS.indexOf(n.kind) >= 0) problems.push(tag + ' 参考解残留派生模块 ' + n.kind);
      if (n && n.kind === 'theorem' && n.config) {
        const j = levels.findIndex((x) => x.code === n.config.code);
        if (j < 0) problems.push(tag + ' 参考解定理引用不存在：' + n.config.code);
        else if (j >= i) problems.push(tag + ' 参考解定理引用必须更早：' + n.config.code);
      }
    });

    if (!lv.solution || !Array.isArray(lv.solution.nodes)) return;
    let nodes, edges;
    try {
      nodes = clone(lv.initialNodes).concat(clone(lv.solution.nodes));
      edges = clone(lv.solution.edges);
    } catch (err) { problems.push(tag + ' 电路无法复制：' + err.message); return; }
    const res = Engine.evaluate(lv, nodes, edges, { levels: levels, levelIndex: i });
    if (!res.complete) {
      const first = (res.errors || [])[0];
      problems.push(tag + ' 参考解未通关：' + (first ? first.message : '未通关'));
    }
  });

  /* 结构：每章 10 普通 + 24 困难；第Ⅰ章额外 9 引理；编号连续、普通关由易到难。 */
  CHAPTERS.forEach((g) => {
    const inChapter = levels.filter((l) => l.chapterGroup === g);
    const base = inChapter.filter((l) => l.band === 'base');
    const lemma = inChapter.filter((l) => l.band === 'lemma');
    const hard = inChapter.filter((l) => l.hard);
    if (!inChapter.some((l) => l.tutorial)) problems.push('第' + g + '章没有教学关');
    if (base.length !== NORMAL_TARGET) problems.push('第' + g + '章普通关应为 ' + NORMAL_TARGET + ' 个，实际 ' + base.length);
    if (hard.length !== 24) problems.push('第' + g + '章困难关应为 24 个，实际 ' + hard.length);
    const wantLemma = g === LEMMA_CHAPTER ? LEMMA_CODES.length : 0;
    if (lemma.length !== wantLemma) problems.push('第' + g + '章引理关应为 ' + wantLemma + ' 个，实际 ' + lemma.length);
    base.forEach((l, i) => {
      const want = g + '-' + PAD(i + 1);
      if (l.code !== want) problems.push('第' + g + '章普通关编号应为 ' + want + '，实际 ' + l.code);
      if (i && base[i - 1].solution.nodes.length > l.solution.nodes.length) {
        problems.push('第' + g + '章普通关必须按元件数递增：' + l.code + ' 比前一关小');
      }
    });
    lemma.forEach((l, i) => {
      const want = g + '-' + PAD(NORMAL_TARGET + i + 1);
      if (l.code !== want) problems.push('第' + g + '章引理关编号应为 ' + want + '，实际 ' + l.code);
    });
    hard.forEach((l, i) => {
      const want = g + '-' + PAD(base.length + lemma.length + i + 1);
      if (l.code !== want) problems.push('第' + g + '章困难关编号应为 ' + want + '，实际 ' + l.code);
    });
  });
  return problems;
}

function summarize(levels) {
  const rows = [];
  CHAPTERS.forEach((g) => {
    const all = levels.filter((l) => l.chapterGroup === g);
    rows.push(g + '：教学 ' + all.filter((l) => l.tutorial).length +
      ' · 普通 ' + all.filter((l) => !l.tutorial && !l.hard && l.band === 'base').length +
      ' · 引理 ' + all.filter((l) => l.band === 'lemma').length +
      ' · 困难 ' + all.filter((l) => l.hard).length);
  });
  const tutorials = levels.filter((l) => l.tutorial).length;
  const base = levels.filter((l) => l.band === 'base').length;
  const lemma = levels.filter((l) => l.band === 'lemma').length;
  const challenge = levels.filter((l) => l.hard).length;
  return {
    total: levels.length, tutorials: tutorials, base: base, lemma: lemma, challenge: challenge, chapters: rows
  };
}

/* =========================================================================
 * 8. 入口
 * ========================================================================= */

function writeOutputs(levels) {
  const header = '/*! 自动生成的关卡数据：每章 教学 → 10 普通关 →（第Ⅰ章 9 引理关）→ 24 困难关。 */\n' +
    '/*! 由 scripts/restructure-levels.js 生成，勿手改；改内容请改 campaign/*.json。 */\n';
  const output = header +
    '(function (host) {\n  \'use strict\';\n  host.RSL = host.RSL || {};\n' +
    '  host.RSL.LEVELS = ' + JSON.stringify(levels) + ';\n' +
    '  if (typeof module !== \'undefined\' && module.exports) module.exports = host.RSL.LEVELS;\n' +
    '})(typeof window !== \'undefined\' ? window : globalThis);\n';
  fs.writeFileSync(LEVELS_FILE, output, 'utf8');
  fs.writeFileSync(path.join(ROOT, 'src', 'campaign-meta.js'),
    '(function (host) {\n  \'use strict\';\n  host.RSL = host.RSL || {};\n' +
    '  host.RSL.CAMPAIGN = ' + JSON.stringify([
      { key: 'prop', id: 'Ⅰ', title: '命题演算' },
      { key: 'pred', id: 'Ⅱ', title: '谓词与量词' },
      { key: 'eq', id: 'Ⅲ', title: '等词' },
      { key: 'classic', id: 'Ⅳ', title: '经典定理' }
    ]) + ';\n' +
    '  host.RSL.CAMPAIGN_META = ' + JSON.stringify({ total: levels.length }) + ';\n' +
    '})(typeof window !== \'undefined\' ? window : globalThis);\n', 'utf8');
}

function main() {
  const doCheck = process.argv.indexOf('--check') >= 0;
  const built = buildLevels();
  const levels = built.levels;
  writeOutputs(levels);

  const info = summarize(levels);
  console.log('levels: ' + info.total + ' · 教学 ' + info.tutorials + ' · 普通 ' + info.base +
    ' · 引理 ' + info.lemma + ' · 困难 ' + info.challenge);
  info.chapters.forEach((row) => console.log('  ' + row));
  CHAPTERS.forEach((g) => {
    const parts = [];
    if (built.stats.normalFromHards[g]) parts.push('困难关锥 ' + built.stats.normalFromHards[g] + ' 关');
    if (built.stats.normalFromLemmas[g]) parts.push('引理关锥 ' + built.stats.normalFromLemmas[g] + ' 关');
    if (built.stats.syntheticCounts[g]) parts.push('兜底合成 ' + built.stats.syntheticCounts[g] + ' 关');
    console.log('  ' + g + ' 普通关来源：' + parts.join('，'));
    if (doCheck) (built.stats.normalOrigins[g] || []).forEach((line) => console.log('    ' + line));
  });
  CHAPTERS.forEach((g) => {
    const n = built.stats.syntheticCounts[g] || 0;
    if (!n) return;
    console.warn('warning: ' + n + ' synthetic normals in chapter ' + g + '（原始素材池不足，' +
      '兜底为 A1/A2/M 原始证明；' + built.stats.syntheticCodes[g].join(' ') + '）');
  });

  if (doCheck) {
    const problems = checkLevels(levels);
    if (problems.length) {
      console.error('自检失败（' + problems.length + ' 项）：');
      problems.slice(0, 20).forEach((p) => console.error('  - ' + p));
      if (problems.length > 20) console.error('  …还有 ' + (problems.length - 20) + ' 项');
      process.exit(1);
    }
    console.log('自检通过：' + levels.length + ' 关参考解全部 Engine complete；无派生 kind；' +
      '普通关 5–20 元件且 mustUse 非空；困难关 hint=null；定理只引用更早关卡。');
  }
}

if (require.main === module) main();

module.exports = {
  buildLevels: buildLevels,
  checkLevels: checkLevels,
  summarize: summarize,
  normalCandidates: normalCandidates,
  paletteOf: paletteOf,
  componentTutorials: componentTutorials,
  buildSelfImpCircuit: buildSelfImpCircuit,
  loadLemmas: loadLemmas
};
