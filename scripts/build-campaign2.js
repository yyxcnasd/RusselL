#!/usr/bin/env node
'use strict';
/*!
 * 关卡编译器 v2（「引理阶梯」管线）
 *
 *   1. 读 campaign/campaign2.js（有序候选关卡 + 证明项/导入 label）；
 *   2. 逐关编译成棋盘电路（真实 Engine 求值），测量模块数；
 *   3. **按测量结果排课程**：普通关 = 10 个 5–21 模块、目标 ≤36 token、依赖闭合的阶梯；
 *      困难关 = 其余关卡按「依赖拓扑 + 小者优先」排序（章内大致递增）；
 *   4. 重映射定理代号，跑门禁（5–21 / ≤200 / 递增容差 / 只能引用更早），
 *      全过才写 campaign/campaign2-levels.json。
 *
 * 证明项 DSL 见 campaign/proof.js；set.mm 导入关由 scripts/lib/mm-bridge.js 翻译。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const { loadRuntime } = require(path.join(ROOT, 'scripts', 'lib', 'load-runtime.js'));
const RSL = loadRuntime({ files: ['src/term.js', 'src/modules.js', 'src/engine.js'] });
const T = RSL.Term;
const Engine = RSL.Engine;

const OUT = path.join(ROOT, 'campaign', 'campaign2-levels.json');
const NORMAL_SLOTS = 10;
const MAX_NORMAL = 21;
const MIN_NORMAL = 5;
const MAX_HARD = 200;
const MAX_NORMAL_TOKENS = 36;
const MAX_HARD_TOKENS = 60;
const INVERSION_ABS = 12;
const INVERSION_REL = 0.2;

/* =========================================================================
 * 1. 电路构造器
 * ========================================================================= */
function createBuilder() {
  const nodes = [];
  const edges = [];
  let seq = 0;
  let edgeSeq = 0;
  const formulaCache = new Map();
  const termCache = new Map();
  const atomCache = new Map();
  const add = (kind, config) => {
    const id = 'n' + (++seq);
    nodes.push({ id, kind, config: config || {}, x: 0, y: 0 });
    return id;
  };
  const connect = (from, fromPort, to, toPort) => {
    edges.push({ id: 'e' + (++edgeSeq), from: { node: from, port: fromPort }, to: { node: to, port: toPort } });
  };
  const termNode = (name) => {
    if (termCache.has(name)) return termCache.get(name);
    const id = add('term', { name });
    termCache.set(name, id);
    return id;
  };
  const atomNode = (name) => {
    if (atomCache.has(name)) return atomCache.get(name);
    const id = add('atom', { name });
    atomCache.set(name, id);
    return id;
  };
  const make = (kind, config, wiring) => {
    const id = add(kind, config);
    if (wiring) wiring(id);
    return id;
  };
  function formula(body) {
    const k = body.join('\u0000');
    if (formulaCache.has(k)) return formulaCache.get(k);
    let id;
    if (body.length === 1 && /^[A-Za-z][A-Za-z0-9_]*$/.test(body[0])) {
      id = atomNode(body[0]);
    } else if (body[0] === '-.') {
      const a = formula(body.slice(1));
      id = make('not', {}, (x) => connect(a, 'out', x, 'a'));
    } else if (body[0] === '(') {
      const inner = body.slice(1, -1);
      const ops = { '->': 'imp', '/\\': 'and', '\\/': 'or', '<->': 'iff' };
      let depth = 0, split = -1, opKind = null;
      for (let i = 0; i < inner.length && split < 0; i += 1) {
        const c = inner[i];
        if (c === '(') depth += 1;
        else if (c === ')') depth -= 1;
        else if (depth === 0 && ops[c]) { split = i; opKind = ops[c]; }
      }
      if (split < 0) throw new Error('公式缺少顶层运算符：' + body.join(' '));
      const a = formula(inner.slice(0, split));
      const b = formula(inner.slice(split + 1));
      id = make(opKind, {}, (x) => { connect(a, 'out', x, 'a'); connect(b, 'out', x, 'b'); });
    } else if (body[0] === 'A.' || body[0] === 'E.') {
      const a = formula(body.slice(2));
      id = make(body[0] === 'A.' ? 'all' : 'exists', { v: body[1] }, (x) => connect(a, 'out', x, 'a'));
    } else if (body.length === 3 && body[1] === 'e.') {
      const t1 = termNode(body[0]), t2 = termNode(body[2]);
      id = make('mem', {}, (x) => { connect(t1, 'out', x, 'a'); connect(t2, 'out', x, 'b'); });
    } else if (body.length === 3 && body[1] === '=') {
      const t1 = termNode(body[0]), t2 = termNode(body[2]);
      id = make('pred', { symbol: '=' }, (x) => { connect(t1, 'out', x, 't1'); connect(t2, 'out', x, 't2'); });
    } else if (body.length === 4 && body[1] === '(' && body[3] === ')') {
      const t1 = termNode(body[2]);
      id = make('pred', { symbol: body[0] }, (x) => connect(t1, 'out', x, 't1'));
    } else if (body.length === 6 && body[1] === '(' && body[3] === ',' && body[5] === ')') {
      const t1 = termNode(body[2]), t2 = termNode(body[4]);
      id = make('pred', { symbol: body[0], arity: 2 }, (x) => {
        connect(t1, 'out', x, 't1');
        connect(t2, 'out', x, 't2');
      });
    } else {
      throw new Error('无法构造公式：' + body.join(' '));
    }
    formulaCache.set(k, id);
    return id;
  }
  return { nodes, edges, formula, add, connect };
}

/* =========================================================================
 * 2. 证明项 → 电路
 * ========================================================================= */
function compileProof(pt, ctx) {
  const { builder, defsByLabel } = ctx;
  const proofCache = new WeakMap();
  const byKey = new Map();
  const arrayKey = (a) => (Array.isArray(a) ? a.join('\u0001') : String(a));
  const atomsKey = (atoms) => Object.keys(atoms || {}).sort().map((k) => k + '=' + arrayKey(atoms[k])).join('\u0002');
  function proofKey(p) {
    if (!p || typeof p !== 'object') return String(p);
    if (proofCache.has(p)) return proofCache.get(p);
    let k;
    switch (p.op) {
      case 'axiom': k = 'ax|' + p.schema + '|' + (p.v || '') + '|' + atomsKey(p.atoms) + '|' + JSON.stringify(p.vars || null); break;
      case 'lemma': k = 'thm|' + p.code + '|' + atomsKey(p.atoms) + '|' + JSON.stringify(p.vars || null); break;
      case 'subst': k = 'sub|' + proofKey(p.of) + '|' + atomsKey(p.atoms) + '|' + JSON.stringify(p.vars || null); break;
      case 'mp': k = 'mp|' + proofKey(p.a) + '|' + proofKey(p.b); break;
      case 'gen': k = 'gen|' + proofKey(p.of) + '|' + p.v; break;
      case 'defExpand': case 'defContract': k = p.op + '|' + proofKey(p.of); break;
      default: k = p.op + '|' + JSON.stringify(p); break;
    }
    proofCache.set(p, k);
    return k;
  }
  function cleanAtoms(atoms) {
    const out = {};
    Object.keys(atoms || {}).forEach((name) => {
      const body = atoms[name];
      if (Array.isArray(body) && body.length === 1 && body[0] === name) return;
      out[name] = body;
    });
    return out;
  }
  function addSubst(baseId, atoms, vars) {
    const names = Object.keys(atoms || {});
    let id = baseId;
    if (names.length) {
      const sub = builder.add('subst', { groups: Math.max(0, names.length - 1) });
      builder.connect(baseId, 'out', sub, 'assertion');
      names.forEach((name, i) => {
        builder.connect(builder.add('atom', { name }), 'out', sub, 'atom' + (i + 1));
        builder.connect(builder.formula(atoms[name]), 'out', sub, 'formula' + (i + 1));
      });
      id = sub;
    }
    if (vars) {
      const from = Object.keys(vars)[0];
      const to = vars[from];
      if (from !== to) {
        const sub = builder.add('subst', { groups: 0 });
        builder.connect(id, 'out', sub, 'assertion');
        builder.connect(builder.add('term', { name: from }), 'out', sub, 'vleft');
        builder.connect(builder.add('term', { name: to }), 'out', sub, 'vright');
        id = sub;
      }
    }
    return id;
  }
  function resolve(p) {
    const pk = proofKey(p);
    if (byKey.has(pk)) return byKey.get(pk);
    let id;
    switch (p.op) {
      case 'axiom': {
        const base = p.v ? builder.add('axiom', { schema: p.schema, v: p.v }) : builder.add('axiom', { schema: p.schema });
        id = addSubst(base, cleanAtoms(p.atoms), p.vars);
        break;
      }
      case 'lemma': {
        if (!defsByLabel.has(p.code)) throw new Error('未知定理占位：' + p.code);
        const base = builder.add('theorem', { code: p.code });
        id = addSubst(base, cleanAtoms(p.atoms), p.vars);
        break;
      }
      case 'subst':
        id = addSubst(resolve(p.of), cleanAtoms(p.atoms), p.vars);
        break;
      case 'mp': {
        id = builder.add('mp', {});
        builder.connect(resolve(p.a), 'out', id, 'a');
        builder.connect(resolve(p.b), 'out', id, 'b');
        break;
      }
      case 'gen': {
        id = builder.add('gen', { v: p.v });
        builder.connect(resolve(p.of), 'out', id, 'assertion');
        break;
      }
      case 'allInst': {
        id = builder.add('all-inst', { v: p.v });
        builder.connect(builder.formula(p.formula), 'out', id, 'formula');
        builder.connect(builder.add('term', { name: p.t }), 'out', id, 'term');
        break;
      }
      case 'existsGen': {
        id = builder.add('exists-gen', { v: p.v });
        builder.connect(builder.formula(p.formula), 'out', id, 'formula');
        builder.connect(builder.add('term', { name: p.t }), 'out', id, 'term');
        break;
      }
      case 'existsE': {
        id = builder.add('exists-elim', {});
        builder.connect(resolve(p.ex), 'out', id, 'exists');
        builder.connect(resolve(p.imp), 'out', id, 'implication');
        break;
      }
      case 'setExt': {
        id = builder.add('set-ext', {});
        builder.connect(builder.add('term', { name: p.a }), 'out', id, 'a');
        builder.connect(builder.add('term', { name: p.b }), 'out', id, 'b');
        break;
      }
      case 'setEmpty': id = builder.add('set-empty', {}); break;
      case 'setPair': {
        id = builder.add('set-pair', {});
        builder.connect(builder.add('term', { name: p.u }), 'out', id, 'u');
        builder.connect(builder.add('term', { name: p.v }), 'out', id, 'v');
        break;
      }
      case 'setUnion': {
        id = builder.add('set-union', {});
        builder.connect(builder.add('term', { name: p.a }), 'out', id, 'a');
        break;
      }
      case 'shift': {
        id = builder.add('shift', { v: p.v });
        builder.connect(builder.formula(p.formula), 'out', id, 'formula');
        break;
      }
      case 'eqRefl': id = builder.add('eq-refl', { t: p.t }); break;
      case 'leibniz': {
        id = builder.add('leibniz', { mode: p.mode || 'abstract', v: p.v || 'z' });
        builder.connect(builder.add('term', { name: p.x }), 'out', id, 'x');
        builder.connect(builder.add('term', { name: p.y }), 'out', id, 'y');
        builder.connect(builder.formula(p.formula), 'out', id, 'formula');
        break;
      }
      case 'defExpand':
      case 'defContract': {
        id = builder.add(p.op === 'defExpand' ? 'def-expand' : 'def-contract', {});
        builder.connect(resolve(p.of), 'out', id, 'assertion');
        break;
      }
      default:
        throw new Error('未知证明项 ' + p.op);
    }
    byKey.set(pk, id);
    return id;
  }
  return resolve(pt);
}

/* 相同断言的证明节点合并（保留 theorem/axiom 优先） */
function dedupeProofNodes(nodes, edges, targetId, results) {
  const rank = (n) => (n.kind === 'theorem' ? 0 : n.kind === 'axiom' ? 1 : n.kind === 'subst' ? 2 : 3);
  const groups = new Map();
  const orderIndex = new Map();
  (results.order || []).forEach((id, i) => orderIndex.set(id, i));
  nodes.forEach((n) => {
    const r = results.results && results.results[n.id];
    if (!r || !r.tokens || r.tokens[0] !== '|-' || n.kind === 'target') return;
    const key = r.tokens.join('\u0000');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(n);
  });
  const replace = new Map();
  groups.forEach((list) => {
    if (list.length < 2) return;
    list.sort((a, b) => (rank(a) - rank(b)) || ((orderIndex.get(a.id) || 0) - (orderIndex.get(b.id) || 0)));
    list.slice(1).forEach((n) => replace.set(n.id, list[0].id));
  });
  if (!replace.size) return { nodes, edges, removed: 0 };
  const keptEdges = [];
  edges.forEach((e) => {
    const from = replace.get(e.from.node) || e.from.node;
    if (from === e.to.node) return;
    keptEdges.push({ id: e.id, from: { node: from, port: e.from.port }, to: { node: e.to.node, port: e.to.port } });
  });
  const needed = new Set([targetId]);
  for (let changed = true; changed;) {
    changed = false;
    keptEdges.forEach((e) => {
      if (needed.has(e.to.node) && !needed.has(e.from.node)) { needed.add(e.from.node); changed = true; }
    });
  }
  const keptNodes = nodes.filter((n) => needed.has(n.id) || n.kind === 'target');
  const ids = new Set(keptNodes.map((n) => n.id));
  return { nodes: keptNodes, edges: keptEdges.filter((e) => ids.has(e.from.node) && ids.has(e.to.node)), removed: nodes.length - keptNodes.length };
}

function layout(nodes, edges, targetId, results) {
  const incoming = new Map(nodes.map((n) => [n.id, []]));
  edges.forEach((e) => { if (incoming.has(e.to.node)) incoming.get(e.to.node).push(e.from.node); });
  const depth = new Map();
  const active = new Set();
  const d = (id) => {
    if (depth.has(id)) return depth.get(id);
    if (active.has(id)) return 0;
    active.add(id);
    let v = 0;
    (incoming.get(id) || []).forEach((p) => { v = Math.max(v, d(p) + 1); });
    active.delete(id);
    depth.set(id, v);
    return v;
  };
  nodes.forEach((n) => d(n.id));
  const columns = new Map();
  nodes.forEach((n) => {
    const c = depth.get(n.id) || 0;
    if (!columns.has(c)) columns.set(c, []);
    columns.get(c).push(n);
  });
  const inputCount = (n) => {
    if (n.kind === 'target') return 1;
    if (n.kind === 'subst') return 1 + 2 * (1 + Math.max(0, Math.min(4, (n.config && n.config.groups) || 0)));
    const info = Engine.info(n.kind);
    return info && info.ports ? (info.ports.inputs || []).length : 1;
  };
  const nodeHeight = (n) => {
    const r = results && results[n.id];
    const lines = Math.max(1, Math.ceil(((r && r.tokens ? r.tokens.length : 16)) / 18));
    return Math.max(112, 64 + lines * 27, 47 + Math.max(0, inputCount(n) - 1) * 32 + 29);
  };
  columns.forEach((list, c) => {
    let y = 40;
    list.forEach((n) => { n.x = 40 + c * 268; n.y = y; y += nodeHeight(n) + 28; });
  });
  const maxDepth = Math.max.apply(null, Array.from(depth.values()).concat([0]));
  const target = nodes.find((n) => n.id === targetId);
  if (target) { target.x = 40 + (maxDepth + 1) * 268; target.y = 40; }
}

/* =========================================================================
 * 3. 单关编译
 * ========================================================================= */
function compileLevel(def, defsByLabel) {
  const builder = createBuilder();
  const finalId = compileProof(def.proof, { builder, defsByLabel });
  const targetId = builder.add('target', {});
  builder.connect(finalId, 'out', targetId, 'proof');
  const targetTokens = ['|-'].concat(def.target);
  let nodes = builder.nodes;
  let edges = builder.edges;
  const stubLevel = { targetTokens, mustUse: null };
  const pre = Engine.evaluate(stubLevel, nodes, edges, { levels: [], levelIndex: 999 });
  if (pre.complete) {
    const merged = dedupeProofNodes(nodes, edges, targetId, pre);
    if (merged.removed > 0) { nodes = merged.nodes; edges = merged.edges; }
  }
  layout(nodes, edges, targetId, pre.results);
  nodes.find((n) => n.id === targetId).targetTokens = targetTokens;
  const palette = [];
  const seen = new Set();
  nodes.forEach((n) => {
    if (n.kind === 'target') return;
    const cfg = n.kind === 'subst' ? {} : (n.config || {});
    const k = n.kind + ':' + JSON.stringify(cfg);
    if (seen.has(k)) return;
    seen.add(k);
    palette.push({ kind: n.kind, config: cfg });
  });
  return { nodes, edges, targetId, palette, targetTokens, size: nodes.length - 1 };
}

/* =========================================================================
 * 4. 排序 + 分带 + 重映射
 * ========================================================================= */
function orderAndBand(compiled) {
  /* compiled: [{ def, nodes, edges, size, deps:Set(placeholder), label }] */
  const byCode = new Map(compiled.map((c) => [c.def.placeholder, c]));
  const depsOf = new Map(compiled.map((c) => [c.def.placeholder, new Set(c.deps)]));

  /* 普通关：按体积升序挑 10 个 5–21 模块、目标 ≤36 token、依赖已入选的 */
  const normal = [];
  const normalSet = new Set();
  const pool = compiled.slice().sort((a, b) => a.size - b.size);
  const tokenLen = (c) => c.targetTokens.length - 1;
  for (const cand of pool) {
    if (normal.length >= NORMAL_SLOTS) break;
    if (cand.size < MIN_NORMAL || cand.size > MAX_NORMAL) continue;
    if (tokenLen(cand) > MAX_NORMAL_TOKENS) continue;
    if (cand.def.forceHard) continue;
    if (Array.from(depsOf.get(cand.def.placeholder)).some((d) => !normalSet.has(d))) continue;
    normal.push(cand);
    normalSet.add(cand.def.placeholder);
  }
  /* 普通关按依赖拓扑 + 体积排序 */
  normal.sort((a, b) => a.size - b.size);
  const orderedNormal = [];
  const placedN = new Set();
  while (placedN.size < normal.length) {
    const ready = normal.filter((c) => !placedN.has(c.def.placeholder) &&
      Array.from(depsOf.get(c.def.placeholder)).every((d) => placedN.has(d) || !normalSet.has(d) || !normalSet.has(d) === false));
    const pick = ready.filter((c) => Array.from(depsOf.get(c.def.placeholder)).every((d) => !normalSet.has(d) || placedN.has(d)));
    if (!pick.length) { normal.forEach((c) => { if (!placedN.has(c.def.placeholder)) { placedN.add(c.def.placeholder); orderedNormal.push(c); } }); break; }
    pick.sort((a, b) => a.size - b.size);
    placedN.add(pick[0].def.placeholder);
    orderedNormal.push(pick[0]);
  }

  /* 困难关：依赖拓扑 + 小者优先 */
  const hardPool = compiled.filter((c) => !normalSet.has(c.def.placeholder));
  const placed = new Set();
  const orderedHard = [];
  while (placed.size < hardPool.length) {
    const ready = hardPool.filter((c) => !placed.has(c.def.placeholder) &&
      Array.from(depsOf.get(c.def.placeholder)).every((d) => !byCode.has(d) || placed.has(d) || normalSet.has(d)));
    if (!ready.length) throw new Error('困难关依赖成环：' + hardPool.filter((c) => !placed.has(c.def.placeholder)).map((c) => c.def.placeholder).join(' '));
    ready.sort((a, b) => a.size - b.size);
    placed.add(ready[0].def.placeholder);
    orderedHard.push(ready[0]);
  }
  return { normal: orderedNormal, hard: orderedHard };
}

function main() {
  const campaign = require(path.join(ROOT, 'campaign', 'campaign2.js'));
  const defs = campaign.levels;
  const byLabel = new Map();
  defs.forEach((d, i) => { d.placeholder = '@' + (d.label || d.key || ('L' + i)); byLabel.set(d.placeholder, d); });

  const problems = [];
  const compiled = [];
  defs.forEach((def) => {
    try {
      const c = compileLevel(def, byLabel);
      /* 依赖：电路里 theorem 节点的 code 就是占位符 */
      const deps = new Set(c.nodes.filter((n) => n.kind === 'theorem').map((n) => n.config.code));
      deps.delete(def.placeholder);
      compiled.push(Object.assign(c, { def, deps: Array.from(deps) }));
    } catch (err) {
      problems.push('编译失败 ' + def.placeholder + '：' + err.message);
    }
  });
  if (problems.length) {
    console.error('编译阶段失败 ' + problems.length + ' 项：');
    problems.slice(0, 30).forEach((p) => console.error('  - ' + p));
    process.exit(1);
  }

  if (process.env.LADDER_DEBUG) {
    compiled.slice().sort((a, b) => a.size - b.size).forEach((c) => {
      console.log(String(c.size).padStart(4), c.def.placeholder, (c.def.title || '').slice(0, 14), (c.targetTokens.length - 1) + 'tok');
    });
  }
  const groups = {};
  compiled.forEach((c) => {
    const ch = c.def.chapterGroup || 'Ⅰ';
    groups[ch] = groups[ch] || [];
    groups[ch].push(c);
  });
  const chapterOrder = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'].filter((g) => groups[g]);
  const finalList = [];
  chapterOrder.forEach((g) => {
    const { normal, hard } = orderAndBand(groups[g]);
    if (normal.length < NORMAL_SLOTS && groups[g].length >= NORMAL_SLOTS) {
      problems.push(g + ' 章只有 ' + normal.length + ' 个满足 5–21 模块的普通关候选（需要 ' + NORMAL_SLOTS + '）');
    }
    normal.forEach((c) => finalList.push({ c, band: 'base' }));
    hard.forEach((c) => finalList.push({ c, band: 'challenge' }));
  });

  /* 重映射代号：@label → Ⅰ-01 … */
  const remap = new Map();
  const counters = { 'Ⅰ': 0, 'Ⅱ': 0, 'Ⅲ': 0, 'Ⅳ': 0 };
  finalList.forEach((entry) => {
    const g = entry.c.def.chapterGroup || 'Ⅰ';
    counters[g] += 1;
    const code = g + '-' + String(counters[g]).padStart(2, '0');
    remap.set(entry.c.def.placeholder, code);
    entry.c.finalCode = code;
    entry.c.finalBand = entry.band;
  });
  const levels = [];
  finalList.forEach((entry, idx) => {
    const c = entry.c;
    c.nodes.forEach((n) => {
      if (n.kind === 'theorem') n.config = { code: remap.get(n.config.code) || n.config.code };
    });
    const def = c.def;
    const level = {
      id: c.finalCode,
      code: c.finalCode,
      no: Number(c.finalCode.split('-')[1]),
      tutorial: false,
      hard: entry.band === 'challenge',
      band: entry.band,
      chapter: def.chapter != null ? def.chapter : 0,
      chapterGroup: def.chapterGroup || 'Ⅰ',
      title: def.title,
      teaches: def.teaches || '',
      hint: entry.band === 'challenge' ? null : (def.hint || ''),
      tip: null,
      targetTokens: c.targetTokens,
      palette: c.palette,
      initialNodes: [JSON.parse(JSON.stringify(c.nodes.find((n) => n.id === c.targetId)))],
      solution: { nodes: c.nodes.filter((n) => n.id !== c.targetId), edges: c.edges },
      difficulty: c.size,
      stats: { steps: c.size },
      mustUse: Array.from(new Set(c.palette.map((e) => e.kind))).filter((k) => !RSL.Modules.isConstruct(k) && k !== 'theorem'),
    };
    const res = Engine.evaluate(level, c.nodes.concat([]), c.edges, { levels: levels.concat([level]), levelIndex: idx });
    if (!res.complete) {
      const first = (res.errors || [])[0];
      problems.push(c.finalCode + ' 参考解未通关：' + (first ? first.message : '未知'));
    }
    levels.push(level);
  });

  /* 门禁 */
  levels.forEach((lv) => {
    const n = lv.solution.nodes.length;
    const tokens = lv.targetTokens.length - 1;
    if (!lv.hard) {
      if (n < MIN_NORMAL || n > MAX_NORMAL) problems.push(lv.code + ' 普通关元件数 ' + n + ' 不在 5–21');
      if (tokens > MAX_NORMAL_TOKENS) problems.push(lv.code + ' 普通关目标 ' + tokens + ' token');
      if (!lv.mustUse.length) problems.push(lv.code + ' 普通关缺少 mustUse');
    } else {
      if (n > MAX_HARD) problems.push(lv.code + ' 困难关元件数 ' + n + ' > 200');
      if (tokens > MAX_HARD_TOKENS) problems.push(lv.code + ' 困难关目标 ' + tokens + ' token');
    }
  });
  chapterOrder.forEach((g) => {
    const hard = levels.filter((l) => l.chapterGroup === g && l.hard);
    for (let i = 1; i < hard.length; i += 1) {
      const prev = hard[i - 1].solution.nodes.length;
      const cur = hard[i].solution.nodes.length;
      const drop = prev - cur;
      if (drop > INVERSION_ABS && drop > prev * INVERSION_REL) {
        problems.push(g + ' 困难关倒挂：' + hard[i - 1].code + '(' + prev + ') → ' + hard[i].code + '(' + cur + ')');
      }
    }
  });

  if (problems.length) {
    console.error('关卡门禁失败 ' + problems.length + ' 项：');
    problems.slice(0, 40).forEach((p) => console.error('  - ' + p));
    process.exit(1);
  }

  fs.writeFileSync(OUT, JSON.stringify(levels, null, 1) + '\n', 'utf8');
  console.log('关卡 ' + levels.length + ' → ' + path.relative(ROOT, OUT));
  chapterOrder.forEach((g) => {
    const nl = levels.filter((l) => l.chapterGroup === g && !l.hard);
    const hl = levels.filter((l) => l.chapterGroup === g && l.hard);
    const sizes = hl.map((l) => l.solution.nodes.length);
    console.log('  ' + g + '：普通 ' + nl.length + '（' + nl.map((l) => l.solution.nodes.length).join('/') + '）' +
      ' · 困难 ' + hl.length + '（' + sizes.join('/') + '）');
  });
}

main();
