#!/usr/bin/env node
'use strict';
/*!
 * 单章 96 关编译器
 *
 *   1. 读 campaign/campaign2.js（set.mm 命题定理 + 手写命题关 + 教学关）；
 *   2. 编译成棋盘电路，自带定理占位符求值，合并同断言节点；
 *   3. 从大证明里提取 5–21 / 22–200 模块的中间结论；>200 的证明拆成引理；
 *   4. 按目标公式去重（定义展开后比较），选 8 教学 + 32 普通 + 56 困难；
 *   5. 拓扑排序、编号、重映射定理代号、逐关真实 Engine 复验、门禁，写 JSON。
 *
 * 不出现章节字段：只有一条课程线，编号 i…viii / 01…88。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const { loadRuntime } = require(path.join(ROOT, 'scripts', 'lib', 'load-runtime.js'));
const RSL = loadRuntime({ files: ['src/term.js', 'src/modules.js', 'src/engine.js'] });
const T = RSL.Term;
const Engine = RSL.Engine;
const Modules = RSL.Modules;
const { dedupeCircuit: dedupeLib } = require(path.join(ROOT, 'scripts', 'lib', 'circuit-dedupe.js'));

const OUT = path.join(ROOT, 'campaign', 'campaign2-levels.json');
const TUTORIAL_SLOTS = 8;
const NORMAL_SLOTS = 32;
const HARD_SLOTS = 56;
const TOTAL = TUTORIAL_SLOTS + NORMAL_SLOTS + HARD_SLOTS;
const MIN_NORMAL = 5;
const MAX_NORMAL = 21;
const MIN_HARD = 22;
const MAX_HARD = 200;
const MAX_NORMAL_TOKENS = 36;
const MAX_HARD_TOKENS = 100;
const TUT_CODES = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'];
let DEFS_BY_LABEL = new Map();
const ALIAS = new Map();

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
  function cleanAtoms(atoms, allowed) {
    const out = {};
    Object.keys(atoms || {}).forEach((name) => {
      const body = atoms[name];
      if (Array.isArray(body) && body.length === 1 && body[0] === name) return;
      if (allowed && allowed.indexOf(name) < 0) return;
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
        const allowed = p.schema === 'A2' ? ['P', 'Q', 'R'] : ['P', 'Q'];
        id = addSubst(base, cleanAtoms(p.atoms, allowed), p.vars);
        break;
      }
      case 'lemma': {
        if (!defsByLabel.has(p.code)) throw new Error('未知定理占位：' + p.code);
        const base = builder.add('theorem', { code: p.code });
        const def = defsByLabel.get(p.code);
        const allowed = ['|-'].concat(def.target || []).filter((t) => /^[PQRSTUV]$/.test(t));
        id = addSubst(base, cleanAtoms(p.atoms, allowed), p.vars);
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

/* =========================================================================
 * 3. 求值（定理占位符用目标断言喂入）
 * ========================================================================= */
function evaluateCircuit(nodes, edges, theoremTokens) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const incoming = new Map();
  edges.forEach((e) => {
    if (e && e.from && e.to) incoming.set(e.to.node + ':' + e.to.port, e.from.node);
  });
  const t = Engine.topo(nodes, edges);
  const results = {};
  function getInputs(n) {
    const info = Modules.info(n.kind);
    const out = {};
    (info.ports.inputs || []).forEach((p) => {
      const src = incoming.get(n.id + ':' + p.id);
      const up = src ? results[src] : null;
      out[p.id] = up && up.tokens ? up.tokens : null;
    });
    return out;
  }
  t.order.forEach((id) => {
    const n = byId.get(id);
    if (!n) return;
    if (n.kind === 'target') {
      const src = incoming.get(n.id + ':proof');
      const up = src ? results[src] : null;
      results[id] = { tokens: up ? up.tokens : null, state: up && up.tokens ? 'complete' : 'open' };
      return;
    }
    if (n.kind === 'theorem') {
      const tokens = theoremTokens.get(n.config && n.config.code);
      results[id] = { tokens: tokens || null, state: tokens ? 'valid' : 'error' };
      return;
    }
    try {
      const r = Modules.apply(n.kind, getInputs(n), n.config, { levels: [], levelIndex: 999 });
      results[id] = { tokens: r && r.tokens, state: r && r.tokens ? 'valid' : 'open' };
    } catch (err) {
      results[id] = { tokens: null, state: 'error', error: err.message };
    }
  });
  return results;
}

/* =========================================================================
 * 4. 合并同断言节点（迭代到不动点）
 * ========================================================================= */
function dedupeCircuit(nodes, edges, targetId) {
  const results = evaluateCircuit(nodes, edges, THEOREM_TOKENS);
  const out = dedupeLib({ nodes, edges, targetId, results });
  return { nodes: out.nodes, edges: out.edges, removed: out.removed };
}

/* =========================================================================
 * 5. 单关编译
 * ========================================================================= */
let THEOREM_TOKENS = new Map();

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

function compileLevel(def) {
  const builder = createBuilder();
  let finalId;
  if (def.circuit) {
    const map = new Map();
    def.circuit.nodes.forEach((n) => map.set(n.id, builder.add(n.kind, JSON.parse(JSON.stringify(n.config || {})))));
    def.circuit.edges.forEach((e) => builder.connect(map.get(e.from.node), e.from.port, map.get(e.to.node), e.to.port));
    finalId = map.get(def.circuit.outputId);
    if (!finalId) throw new Error('circuit 缺少 outputId');
  } else {
    finalId = compileProof(def.proof, { builder, defsByLabel: DEFS_BY_LABEL });
  }
  const targetId = builder.add('target', {});
  builder.connect(finalId, 'out', targetId, 'proof');
  const targetTokens = ['|-'].concat(def.target);
  let nodes = builder.nodes;
  let edges = builder.edges;
  const merged = dedupeCircuit(nodes, edges, targetId);
  nodes = merged.nodes;
  edges = merged.edges;
  const results = evaluateCircuit(nodes, edges, THEOREM_TOKENS);
  layout(nodes, edges, targetId, results);
  const targetNode = nodes.find((n) => n.id === targetId);
  targetNode.targetTokens = targetTokens;
  const palette = [];
  const seen = new Set();
  nodes.forEach((n) => {
    if (n.kind === 'target') return;
    const cfg = n.kind === 'subst' ? {} : (n.config || {});
    const key = n.kind + ':' + JSON.stringify(cfg);
    if (seen.has(key)) return;
    seen.add(key);
    palette.push({ kind: n.kind, config: cfg });
  });
  return {
    def, nodes, edges, targetId, palette, targetTokens,
    size: nodes.length - 1,
    results,
    deps: new Set(nodes.filter((n) => n.kind === 'theorem').map((n) => n.config.code)),
  };
}

/* =========================================================================
 * 6. 目标公式去重键（展开定义）
 * ========================================================================= */
function targetKey(tokens) {
  return tokens.slice(1).join('\u0000');
}

/* =========================================================================
 * 7. 提取 5–21 / 22–200 的中间结论
 * ========================================================================= */
function extractCones(compiled, minSize, maxSize, maxTokens, limitPerCircuit) {
  const out = [];
  compiled.forEach((c) => {
    if (!c.results) return;
    const byId = new Map(c.nodes.map((n) => [n.id, n]));
    const incoming = new Map(c.nodes.map((n) => [n.id, []]));
    c.edges.forEach((e) => { if (incoming.has(e.to.node)) incoming.get(e.to.node).push(e.from.node); });
    const candidates = [];
    c.nodes.forEach((n) => {
      if (n.id === c.targetId || n.kind === 'target') return;
      const r = c.results[n.id];
      if (!r || !r.tokens || r.tokens[0] !== '|-' || r.tokens.length - 1 > maxTokens) return;
      const cone = new Set([n.id]);
      const stack = [n.id];
      while (stack.length) {
        const id = stack.pop();
        (incoming.get(id) || []).forEach((p) => { if (!cone.has(p)) { cone.add(p); stack.push(p); } });
      }
      const size = cone.size;
      if (size < minSize || size > maxSize) return;
      if (Array.from(cone).some((id) => byId.get(id) && byId.get(id).kind === 'theorem')) return;
      candidates.push({ node: n, cone, size, tokens: r.tokens });
    });
    candidates.sort((a, b) => Math.abs(a.size - (minSize + maxSize) / 2) - Math.abs(b.size - (minSize + maxSize) / 2));
    candidates.slice(0, limitPerCircuit).forEach((pick) => {
      const nodes = c.nodes.filter((x) => pick.cone.has(x.id));
      const edges = c.edges.filter((e) => pick.cone.has(e.from.node) && pick.cone.has(e.to.node));
      const coneKey = 'cone_' + c.def.key.replace(/[^A-Za-z0-9_]/g, '') + '_' + pick.node.id;
      out.push({
        def: {
          key: coneKey,
          placeholder: '@' + coneKey,
          origin: 'cone',
          parentTitle: c.def.title,
          title: c.def.title + ' · 中间结论',
          teaches: T.fmt(['wff'].concat(pick.tokens.slice(1))),
          hint: '目标是 ' + T.fmt(['wff'].concat(pick.tokens.slice(1))) + '。这是〈' + c.def.title + '〉证明里的一个中间结论，按接线把它单独证出来。',
          target: pick.tokens.slice(1),
          circuit: { nodes, edges, outputId: pick.node.id },
        },
        size: pick.size,
        nodes, edges, targetId: pick.node.id,
        targetTokens: pick.tokens,
        deps: new Set(),
        results: evaluateCircuit(nodes, edges, THEOREM_TOKENS),
      });
    });
  });
  return out;
}

/* =========================================================================
 * 8. 拆分 >200 的证明
 * ========================================================================= */
let SPLIT_SEQ = 0;
function splitOversized(entry, maxSize) {
  const children = [];
  let cur = entry;
  for (let guard = 0; cur.size > maxSize && guard < 8; guard += 1) {
    const c = cur;
    const byId = new Map(c.nodes.map((n) => [n.id, n]));
    const incoming = new Map(c.nodes.map((n) => [n.id, []]));
    c.edges.forEach((e) => { if (incoming.has(e.to.node)) incoming.get(e.to.node).push(e.from.node); });
    const candidates = [];
    c.nodes.forEach((n) => {
      if (n.id === c.targetId || n.kind === 'target' || n.kind === 'theorem') return;
      const r = c.results[n.id];
      if (!r || !r.tokens || r.tokens[0] !== '|-' || r.tokens.length - 1 > MAX_HARD_TOKENS) return;
      const cone = new Set([n.id]);
      const stack = [n.id];
      while (stack.length) {
        const id = stack.pop();
        (incoming.get(id) || []).forEach((p) => { if (!cone.has(p)) { cone.add(p); stack.push(p); } });
      }
      const size = cone.size - 1;
      if (size < 40 || size > maxSize - 5) return;
      candidates.push({ node: n, cone, size, tokens: r.tokens });
    });
    if (!candidates.length) break;
    candidates.sort((a, b) => Math.abs(a.size - 110) - Math.abs(b.size - 110));
    const pick = candidates[0];
    const childKey = 'split_' + (++SPLIT_SEQ);
    const childPlaceholder = '@' + childKey;
    const coneNodes = c.nodes.filter((n) => pick.cone.has(n.id));
    const coneEdges = c.edges.filter((e) => pick.cone.has(e.from.node) && pick.cone.has(e.to.node));
    const child = {
      def: {
        key: childKey, placeholder: childPlaceholder, origin: 'split', parentTitle: c.def.title,
        title: c.def.title + ' · 中间结论',
        teaches: T.fmt(['wff'].concat(pick.tokens.slice(1))),
        hint: null,
        target: pick.tokens.slice(1),
        circuit: { nodes: coneNodes, edges: coneEdges, outputId: pick.node.id },
      },
      size: pick.size, nodes: coneNodes, edges: coneEdges,
      targetId: pick.node.id, targetTokens: pick.tokens, deps: new Set(),
      results: evaluateCircuit(coneNodes, coneEdges, THEOREM_TOKENS),
    };
    children.push(child);
    THEOREM_TOKENS.set(childPlaceholder, child.targetTokens);
    if (!c.deps) c.deps = new Set();
    c.deps.add(childPlaceholder);
    /* 父关：把锥换成 theorem 引用 */
    const keptNodes = c.nodes.filter((n) => !pick.cone.has(n.id));
    const keptEdges = c.edges.filter((e) => !(pick.cone.has(e.from.node) && pick.cone.has(e.to.node)));
    const consumers = [];
    c.edges.forEach((e) => {
      if (pick.cone.has(e.from.node) && !pick.cone.has(e.to.node)) consumers.push(e);
    });
    const thmId = 'split' + (++SPLIT_SEQ);
    keptNodes.push({ id: thmId, kind: 'theorem', config: { code: childPlaceholder }, x: 0, y: 0 });
    consumers.forEach((e) => keptEdges.push({ id: e.id, from: { node: thmId, port: 'out' }, to: e.to }));
    cur.nodes = keptNodes;
    cur.edges = keptEdges;
    cur.size = keptNodes.length - 1;
    cur.results = evaluateCircuit(keptNodes, keptEdges, THEOREM_TOKENS);
    if (cur.results[cur.targetId] && !cur.results[cur.targetId].tokens) break;
  }
  return { parent: cur, children };
}

/* =========================================================================
 * 9. 选择 + 排序
 * ========================================================================= */
function levelOriginOrder(c) {
  return { legacy: 0, manual: 1, setmm: 2, split: 3, cone: 4 }[c.def.origin] ?? 5;
}

function hasDepOutside(c, allowed) {
  for (const d of c.deps) if (!allowed.has(d)) return true;
  return false;
}

function main() {
  const campaign = require(path.join(ROOT, 'campaign', 'campaign2.js'));
  const defs = campaign.levels;
  const byLabel = new Map();
  defs.forEach((d, i) => {
    d.placeholder = '@' + (d.label || d.key || ('L' + i));
    byLabel.set(d.placeholder, d);
  });
  DEFS_BY_LABEL = byLabel;

  /* 定理占位符 → 目标断言 */
  THEOREM_TOKENS = new Map();
  defs.forEach((d) => THEOREM_TOKENS.set(d.placeholder, ['|-'].concat(d.target)));

  const problems = [];
  const warnings = [];
  const compiled = [];
  defs.forEach((def) => {
    try {
      const c = compileLevel(def);
      compiled.push(c);
    } catch (err) {
      problems.push('编译失败 ' + def.placeholder + '：' + err.message);
    }
  });
  if (problems.length) {
    console.error('编译阶段失败 ' + problems.length + ' 项：');
    problems.slice(0, 30).forEach((p) => console.error('  - ' + p));
    process.exit(1);
  }

  /* 拆分 >200 */
  for (let i = compiled.length - 1; i >= 0; i -= 1) {
    if (compiled[i].size <= MAX_HARD) continue;
    const before = compiled[i];
    const res = splitOversized(before, MAX_HARD);
    if (res.children.length) {
      compiled.splice(i, 1);
      compiled.push(res.parent, ...res.children);
      res.children.forEach((ch) => {
        THEOREM_TOKENS.set('@' + ch.def.key, ch.targetTokens);
      });
    } else {
      compiled.splice(i, 1);
    }
  }
  /* 拆分后重新求值（父关依赖新占位符） */
  compiled.forEach((c) => { c.results = evaluateCircuit(c.nodes, c.edges, THEOREM_TOKENS); });

  /* 中间结论 */
  const normalCones = extractCones(compiled.filter((c) => c.size > 21), MIN_NORMAL, MAX_NORMAL, MAX_NORMAL_TOKENS, 18);
  const hardCones = extractCones(compiled.filter((c) => c.size > 21), 40, 190, MAX_HARD_TOKENS, 12);
  const all = compiled.concat(normalCones, hardCones);

  /* 目标去重：同目标保留更小、来源更“真实”的 */
  const byTarget = new Map();
  all.forEach((c) => {
    if (!c.targetTokens) return;
    const key = targetKey(c.targetTokens);
    if (!byTarget.has(key)) byTarget.set(key, []);
    byTarget.get(key).push(c);
  });
  const deduped = [];
  byTarget.forEach((list) => {
    list.sort((a, b) => ((a.def.tutorial ? -1 : 0) - (b.def.tutorial ? -1 : 0)) || (levelOriginOrder(a) - levelOriginOrder(b)) || (a.size - b.size));
    deduped.push(list[0]);
    list.slice(1).forEach((c) => { if (list[0].def.placeholder) ALIAS.set(c.def.placeholder, list[0].def.placeholder); });
  });

  compiled.forEach((c) => { if (c.deps) c.deps = new Set(Array.from(c.deps).map((d) => ALIAS.get(d) || d)); });
  deduped.forEach((c) => { if (c.deps) c.deps = new Set(Array.from(c.deps).map((d) => ALIAS.get(d) || d)); });
  const tutorials = defs.filter((d) => d.tutorial).map((d) => compiled.find((c) => c.def.placeholder === d.placeholder)).filter(Boolean);
  if (tutorials.length !== TUTORIAL_SLOTS) problems.push('教学关数量 ' + tutorials.length + ' != 8');

  const tutorialCodes = new Map();
  tutorials.forEach((c, i) => tutorialCodes.set(c.def.placeholder, TUT_CODES[i]));

  if (process.env.LADDER_DEBUG) {
    console.log('pool: all=' + all.length + ' tutorials=' + tutorials.length + ' deduped=' + deduped.length);
    const byOrigin = {}; deduped.forEach((c) => { const k = (c.def.origin || '?') + ':' + (c.def.tutorial ? 'tut' : (c.size >= MIN_HARD ? 'hard' : (c.size >= MIN_NORMAL ? 'normal' : 'tiny'))); byOrigin[k] = (byOrigin[k] || 0) + 1; });
    console.log('pool by kind:', JSON.stringify(byOrigin));
    console.log('normal pool sizes:', deduped.filter((c) => !c.def.tutorial && c.size >= 5 && c.size <= 21).map((c) => (c.def.origin || '?') + ':' + c.size).join(' '));
    console.log('hard pool sizes:', deduped.filter((c) => !c.def.tutorial && c.size >= 22 && c.size <= 200).map((c) => (c.def.origin || '?') + ':' + c.size).join(' '));
  }
  const tutorialTargets = new Set(tutorials.map((c) => targetKey(c.targetTokens)));
  const nonTutorial = deduped.filter((c) => !c.def.tutorial && !tutorialTargets.has(targetKey(c.targetTokens)));

  /* 普通关：先选“真实”小证明，再用中间结论补足 */
  const normalReal = nonTutorial
    .filter((c) => c.size >= MIN_NORMAL && c.size <= MAX_NORMAL && c.targetTokens.length - 1 <= MAX_NORMAL_TOKENS && c.def.origin !== 'cone')
    .sort((a, b) => (levelOriginOrder(a) - levelOriginOrder(b)) || (a.size - b.size));
  const normalChosen = [];
  const normalSet = new Set();
  function tryAddNormal(c) {
    if (normalChosen.length >= NORMAL_SLOTS) return false;
    if (normalSet.has(c.def.placeholder)) return false;
    const missing = Array.from(c.deps || []).filter((d) => {
      if (tutorialCodes.has(d)) return false;
      if (normalSet.has(d)) return false;
      const dep = all.find((x) => x.def.placeholder === d);
      return !dep || dep.size > MAX_NORMAL || dep.size < MIN_NORMAL;
    });
    if (missing.length) return false;
    normalChosen.push(c);
    normalSet.add(c.def.placeholder);
    return true;
  }
  normalReal.forEach((c) => tryAddNormal(c));
  const normalConesSorted = nonTutorial
    .filter((c) => c.def.origin === 'cone' && c.size >= MIN_NORMAL && c.size <= MAX_NORMAL)
    .sort((a, b) => (a.size - b.size) || targetKey(a.targetTokens).localeCompare(targetKey(b.targetTokens)));
  if (process.env.LADDER_DEBUG && normalConesSorted[0]) console.log('first cone', normalConesSorted[0].def.placeholder, normalConesSorted[0].size, normalConesSorted[0].deps && Array.from(normalConesSorted[0].deps), normalConesSorted[0].def.origin);
  /* 先按尺寸轮转各取一个：优先 10–21 的中间结论，最后才用 5–9 的小碎片补数。 */
  const coneBySize = new Map();
  normalConesSorted.forEach((c) => { if (!coneBySize.has(c.size)) coneBySize.set(c.size, []); coneBySize.get(c.size).push(c); });
  const coneSizeOrder = [];
  for (let size = MAX_NORMAL; size >= 10; size -= 1) coneSizeOrder.push(size);
  for (let size = 9; size >= MIN_NORMAL; size -= 1) coneSizeOrder.push(size);
  for (let round = 0; normalChosen.length < NORMAL_SLOTS && round < 12; round += 1) {
    for (const size of coneSizeOrder) {
      if (normalChosen.length >= NORMAL_SLOTS) break;
      const list = coneBySize.get(size) || [];
      if (list[round]) tryAddNormal(list[round]);
    }
  }

  /* 普通关拓扑排序（依赖教程/普通关），同层按体积 */
  const normalOrder = [];
  const defOrder = new Map(defs.map((d, i) => [d.placeholder, i]));
  const normalPriority = (c) => c.def.origin === 'legacy' ? 0 : c.def.origin === 'setmm' ? 100 : c.def.origin === 'manual' ? 200 : 1000;
  {
    const pending = new Map(normalChosen.map((c) => [c.def.placeholder, c]));
    while (pending.size) {
      const ready = Array.from(pending.values()).filter((c) => Array.from(c.deps || []).every((d) => !pending.has(d)));
      if (!ready.length) break;
      ready.sort((a, b) => (normalPriority(a) - normalPriority(b)) || ((defOrder.get(a.def.placeholder) ?? 999) - (defOrder.get(b.def.placeholder) ?? 999)) || (a.size - b.size));
      const pick = ready[0];
      normalOrder.push(pick);
      pending.delete(pick.def.placeholder);
    }
    if (pending.size) problems.push('普通关存在环/缺依赖：' + Array.from(pending.keys()).join(','));
  }
  if (process.env.LADDER_DEBUG) console.log('normal chosen', normalChosen.length, 'cone pool', normalConesSorted.length, 'ordered', normalOrder.length);
  if (process.env.LADDER_DEBUG) console.log('normal list', normalOrder.map((c,i)=> (i+1)+':'+c.size+':'+c.def.origin+':'+(c.def.title||c.def.key)).join(' | '));
  if (normalOrder.length !== NORMAL_SLOTS) problems.push('普通关只有 ' + normalOrder.length + ' 个（需要 32）');

  /* 困难关：真实大证明 → 拆分 → 中间结论；依赖闭包 */
  const normalPlaced = new Set(normalOrder.map((c) => c.def.placeholder));
  const hardPool = nonTutorial
    .filter((c) => c.size >= MIN_HARD && c.size <= MAX_HARD && c.targetTokens.length - 1 <= MAX_HARD_TOKENS && !normalSet.has(c.def.placeholder))
    .sort((a, b) => (levelOriginOrder(a) - levelOriginOrder(b)) || (a.size - b.size));
  const hardMap = new Map(hardPool.map((c) => [c.def.placeholder, c]));
  const hardSet = new Set();
  const hardChosen = [];
  function addHard(c) {
    if (!c || hardSet.has(c.def.placeholder)) return;
    hardSet.add(c.def.placeholder);
    hardChosen.push(c);
    Array.from(c.deps || []).forEach((d) => {
      if (hardMap.has(d) && !hardSet.has(d)) addHard(hardMap.get(d));
    });
  }
  hardPool.forEach((c) => { if (hardChosen.length < HARD_SLOTS) addHard(c); });
  /* 如果不够，按体积补候选中未选的 */
  if (hardChosen.length < HARD_SLOTS) {
    hardPool.forEach((c) => { if (hardChosen.length < HARD_SLOTS) addHard(c); });
  }

  /* 困难关拓扑排序（依赖教程/普通/困难），同层按体积 */
  const hardOrder = [];
  {
    const pending = new Map(hardChosen.map((c) => [c.def.placeholder, c]));
    while (pending.size) {
      const ready = Array.from(pending.values()).filter((c) => Array.from(c.deps || []).every((d) => {
        if (pending.has(d)) return false;
        if (hardSet.has(d)) return hardOrder.some((x) => x.def.placeholder === d);
        return true;
      }));
      if (!ready.length) break;
      ready.sort((a, b) => (a.size - b.size) || (levelOriginOrder(a) - levelOriginOrder(b)) || targetKey(a.targetTokens).localeCompare(targetKey(b.targetTokens)));
      const pick = ready[0];
      hardOrder.push(pick);
      pending.delete(pick.def.placeholder);
    }
    if (pending.size) problems.push('困难关存在环/缺依赖：' + Array.from(pending.keys()).join(','));
  }
  if (process.env.LADDER_DEBUG) console.log('hard chosen', hardChosen.length, 'pool', hardPool.length, 'ordered', hardOrder.length);
  if (hardOrder.length !== HARD_SLOTS) problems.push('困难关只有 ' + hardOrder.length + ' 个（需要 56）');

  const finalList = []
    .concat(tutorials.map((c) => ({ c, band: 'tutorial' })))
    .concat(normalOrder.map((c) => ({ c, band: 'base' })))
    .concat(hardOrder.map((c) => ({ c, band: 'challenge' })));

  if (finalList.length !== TOTAL) problems.push('总关数 ' + finalList.length + ' != 96');

  /* 编号 */
  const remap = new Map();
  let normalNo = 0;
  let hardNo = 32;
  finalList.forEach((entry) => {
    let code;
    if (entry.band === 'tutorial') code = TUT_CODES[tutorials.indexOf(entry.c)];
    else if (entry.band === 'base') code = String(++normalNo).padStart(2, '0');
    else code = String(++hardNo).padStart(2, '0');
    remap.set(entry.c.def.placeholder, code);
    entry.c.finalCode = code;
  });

  const levels = [];
  finalList.forEach((entry, idx) => {
    const c = entry.c;
    /* 补 target 焊盘 */
    if (!c.nodes.some((n) => n.kind === 'target')) {
      const tgt = { id: 'tgt', kind: 'target', config: {}, x: 0, y: 0, targetTokens: c.targetTokens };
      c.edges = c.edges.concat([{ id: 'eT', from: { node: c.targetId, port: 'out' }, to: { node: 'tgt', port: 'proof' } }]);
      c.nodes = c.nodes.concat([tgt]);
      c.targetId = 'tgt';
    }
    c.nodes.forEach((n) => {
      if (n.kind === 'theorem') {
        const target = ALIAS.get(n.config.code) || n.config.code;
        const code = remap.get(target);
        if (process.env.LADDER_DUMP && entry.c.finalCode === '68') console.error('THM68', n.id, n.config.code, 'alias', target, 'code', code, 'target', T.fmt(THEOREM_TOKENS.get(n.config.code) || []));
        if (!code) problems.push(entry.c.finalCode + ' 引用了未入选的定理 ' + n.config.code + ' → ' + target);
        n.config = { code: code || target };
      }
    });
    const targetNode = c.nodes.find((n) => n.id === c.targetId);
    const palette = [];
    const seen = new Set();
    c.nodes.forEach((n) => {
      if (n.kind === 'target') return;
      const cfg = n.kind === 'subst' ? {} : (n.config || {});
      const key = n.kind + ':' + JSON.stringify(cfg);
      if (seen.has(key)) return;
      seen.add(key);
      palette.push({ kind: n.kind, config: cfg });
    });
    const level = {
      id: c.finalCode,
      code: c.finalCode,
      no: entry.band === 'tutorial' ? null : Number(c.finalCode),
      tutorial: entry.band === 'tutorial',
      hard: entry.band === 'challenge',
      band: entry.band,
      title: c.def.title,
      teaches: c.def.teaches || '',
      hint: entry.band === 'challenge' ? null : (c.def.hint || ''),
      tip: c.def.tip || null,
      targetTokens: c.targetTokens,
      palette,
      initialNodes: [JSON.parse(JSON.stringify(targetNode))],
      solution: { nodes: c.nodes.filter((n) => n.id !== c.targetId), edges: c.edges },
      difficulty: c.size,
      stats: { steps: c.size },
      mustUse: Array.from(new Set(palette.map((e) => e.kind))).filter((k) => !Modules.isConstruct(k) && k !== 'theorem'),
    };
    const res = Engine.evaluate(level, c.nodes.concat([]), c.edges, { levels: levels.concat([level]), levelIndex: idx });
    if (!res.complete) {
      const first = (res.errors || [])[0];
      problems.push(level.code + ' 参考解未通关：' + (first ? first.message : '未知'));
      if (process.env.LADDER_DUMP && first) {
        const bad = c.nodes.find((n) => n.id === first.nodeId);
        console.error('BAD', level.code, first.nodeId, bad && bad.kind, bad && JSON.stringify(bad.config));
        c.edges.filter((e) => e.to.node === first.nodeId).forEach((e) => {
          const r = res.results[e.from.node];
          console.error('  in', e.from.node, r && r.tokens && T.fmt(r.tokens));
        });
      }
      if (process.env.LADDER_DUMP) {
        console.error('DUMP ' + level.code + ' target=' + T.fmt(level.targetTokens));
        c.nodes.forEach((n) => console.error('  ', n.id, n.kind, JSON.stringify(n.config || {})));
        c.edges.forEach((e) => console.error('  e', e.from.node + ':' + e.from.port, '->', e.to.node + ':' + e.to.port));
        console.error('  order', res.order.join(','), 'cycle', res.cycle.join(','));
      }
    }
    levels.push(level);
  });

  /* 门禁 */
  const usedTargets = new Map();
  levels.forEach((lv) => {
    const key = targetKey(lv.targetTokens);
    if (usedTargets.has(key)) problems.push('重复目标：' + usedTargets.get(key) + ' / ' + lv.code);
    usedTargets.set(key, lv.code);
    if (lv.tutorial) {
      if (lv.solution.nodes.length > 20) problems.push(lv.code + ' 教学关元件数超过 20');
      if (!lv.tip || !lv.tip.code || !lv.tip.flow) problems.push(lv.code + ' 教学关缺少 tip');
      return;
    }
    const n = lv.solution.nodes.length;
    const tokens = lv.targetTokens.length - 1;
    if (!lv.hard) {
      if (n < MIN_NORMAL || n > MAX_NORMAL) problems.push(lv.code + ' 普通关元件数 ' + n + ' 不在 5–21');
      if (tokens > MAX_NORMAL_TOKENS) problems.push(lv.code + ' 普通关目标 ' + tokens + ' token');
      if (!lv.mustUse.length) problems.push(lv.code + ' 普通关缺少 mustUse');
    } else {
      if (n < MIN_HARD || n > MAX_HARD) problems.push(lv.code + ' 困难关元件数 ' + n + ' 不在 22–200');
      if (tokens > MAX_HARD_TOKENS) problems.push(lv.code + ' 困难关目标 ' + tokens + ' token');
    }
  });
  /* 困难关整体按模块数递增；依赖强制或拆分产生的局部倒挂只记警告。 */
  const hardLevels = levels.filter((l) => l.hard);
  for (let i = 1; i < hardLevels.length; i += 1) {
    const prev = hardLevels[i - 1].solution.nodes.length;
    const cur = hardLevels[i].solution.nodes.length;
    const drop = prev - cur;
    if (drop > 12 && drop > prev * 0.2) {
      warnings.push('困难关倒挂：' + hardLevels[i - 1].code + '(' + prev + ') → ' + hardLevels[i].code + '(' + cur + ')');
    }
  }

  if (problems.length) {
    console.error('关卡门禁失败 ' + problems.length + ' 项：');
    problems.slice(0, 40).forEach((p) => console.error('  - ' + p));
    process.exit(1);
  }
  warnings.forEach((w) => console.log('  ⚠ ' + w));
  fs.writeFileSync(OUT, JSON.stringify(levels, null, 1) + '\n', 'utf8');
  const counts = {
    tutorial: levels.filter((l) => l.tutorial).length,
    normal: levels.filter((l) => !l.tutorial && !l.hard).length,
    hard: levels.filter((l) => l.hard).length,
  };
  console.log('关卡 ' + levels.length + ' → ' + path.relative(ROOT, OUT));
  console.log('  教学 ' + counts.tutorial + ' · 普通 ' + counts.normal + ' · 困难 ' + counts.hard);
  console.log('  普通模块数：' + levels.filter((l) => !l.tutorial && !l.hard).map((l) => l.solution.nodes.length).join('/'));
  console.log('  困难模块数：' + levels.filter((l) => l.hard).map((l) => l.solution.nodes.length).join('/'));
}

main();
