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
const MAX_HARD_TOKENS = 100;
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
  let finalId;
  if (def.circuit) {
    /* 预编译电路：复制节点/导线，定理占位符沿用 def.circuit 里的 code（'@legacy1' 等） */
    const map = new Map();
    def.circuit.nodes.forEach((n) => {
      map.set(n.id, builder.add(n.kind, JSON.parse(JSON.stringify(n.config || {}))));
    });
    def.circuit.edges.forEach((e) => {
      builder.connect(map.get(e.from.node), e.from.port, map.get(e.to.node), e.to.port);
    });
    finalId = map.get(def.circuit.outputId);
    if (!finalId) throw new Error('circuit 缺少 outputId');
  } else {
    finalId = compileProof(def.proof, { builder, defsByLabel });
  }
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
  return { nodes, edges, targetId, palette, targetTokens, size: nodes.length - 1, results: pre.results, order: pre.order };
}

/* =========================================================================
 * 3b. 拆分：从已编译电路里提取 5–21 模块的中间结论，作为普通关候选
 * ========================================================================= */
function coneCandidates(compiled, limitPerLevel) {
  const out = [];
  const seen = new Set();
  let dbgAssert = 0, dbgSizeRej = 0, dbgTokRej = 0, dbgThmRej = 0, dbgOk = 0;
  compiled.forEach((c) => {
    if (!c.results) return;
    const byId = new Map(c.nodes.map((n) => [n.id, n]));
    const incoming = new Map(c.nodes.map((n) => [n.id, []]));
    c.edges.forEach((e) => { if (incoming.has(e.to.node)) incoming.get(e.to.node).push(e.from.node); });
    let count = 0;
    c.nodes.forEach((n) => {
      if (count >= limitPerLevel) return;
      const r = c.results[n.id];
      if (!r || !r.tokens || r.tokens[0] !== '|-' || n.kind === 'target') return;
      const cone = new Set([n.id]);
      const stack = [n.id];
      while (stack.length) {
        const id = stack.pop();
        (incoming.get(id) || []).forEach((p) => { if (!cone.has(p)) { cone.add(p); stack.push(p); } });
      }
      const size = cone.size - 1;
      dbgAssert += 1;
      if (size < 5 || size > 21) { dbgSizeRej += 1; return; }
      const tokens = r.tokens.slice(1);
      if (tokens.length > 36) { dbgTokRej += 1; return; }
      if (Array.from(cone).some((id) => byId.get(id) && byId.get(id).kind === 'theorem')) { dbgThmRej += 1; return; }
      const key = r.tokens.join(' ');
      if (seen.has(key)) return;
      seen.add(key);
      dbgOk += 1;
      count += 1;
      const nodes = c.nodes.filter((x) => cone.has(x.id));
      const edges = c.edges.filter((e) => cone.has(e.from.node) && cone.has(e.to.node));
      out.push({
        def: {
          key: 'cone_' + c.def.placeholder.replace(/[^A-Za-z0-9_]/g, '') + '_' + n.id,
          chapter: c.def.chapter, chapterGroup: c.def.chapterGroup,
          title: '中间引理',
          teaches: tokens.join(' '),
          hint: '目标 ' + T.fmt(['wff'].concat(tokens)) + '：把这段子证明按接线一路拆到公理，后面会把它当黑盒。',
          target: tokens, circuit: { nodes, edges, outputId: n.id }, forceBand: 'base',
          placeholder: '@cone_' + c.def.placeholder.replace(/[^A-Za-z0-9_]/g, '') + '_' + n.id,
        },
        size,
        tokens: r.tokens,
        targetTokens: ['|-'].concat(tokens),
        palette: (function () {
          const seenP = new Set(), pal = [];
          nodes.forEach((x) => {
            const cfg = x.kind === 'subst' ? {} : (x.config || {});
            const k = x.kind + ':' + JSON.stringify(cfg);
            if (seenP.has(k)) return;
            seenP.add(k);
            pal.push({ kind: x.kind, config: cfg });
          });
          return pal;
        })(),
        nodes, edges, targetId: n.id,
        forceBand: 'base',
      });
    });
  });
  if (process.env.LADDER_DEBUG) console.log('cone dbg: assertNodes=' + dbgAssert + ' sizeRej=' + dbgSizeRej + ' tokRej=' + dbgTokRej + ' thmRej=' + dbgThmRej + ' ok=' + dbgOk);
  return out;
}

/* =========================================================================
 * 3c. 拆分超限关卡：把中间断言锥提成新关卡，父关改为 theorem 引用
 * ========================================================================= */
function splitOversized(entry, maxSize, seq) {
  const out = [];
  let cur = entry;
  let guard = 0;
  while (cur.size > maxSize && guard < 4) {
    guard += 1;
    const c = cur;
    const byId = new Map(c.nodes.map((n) => [n.id, n]));
    const incoming = new Map(c.nodes.map((n) => [n.id, []]));
    const outgoing = new Map(c.nodes.map((n) => [n.id, []]));
    c.edges.forEach((e) => {
      if (incoming.has(e.to.node)) incoming.get(e.to.node).push(e.from.node);
      if (outgoing.has(e.from.node)) outgoing.get(e.from.node).push(e.to.node);
    });
    const candidates = [];
    c.nodes.forEach((n) => {
      const r = c.results && c.results[n.id];
      if (!r || !r.tokens || r.tokens[0] !== '|-' || n.kind === 'target') return;
      const cone = new Set([n.id]);
      const stack = [n.id];
      while (stack.length) {
        const id = stack.pop();
        (incoming.get(id) || []).forEach((p2) => { if (!cone.has(p2)) { cone.add(p2); stack.push(p2); } });
      }
      const size = cone.size - 1;
      if (size < 30 || size > maxSize - 5) return;
      if (r.tokens.length - 1 > 60) return;
      candidates.push({ node: n, cone, size, tokens: r.tokens });
    });
    if (process.env.LADDER_DEBUG) {
      const sizes = c.nodes.map((n) => {
        const r = c.results && c.results[n.id];
        if (!r || !r.tokens || r.tokens[0] !== '|-') return 0;
        const cone = new Set([n.id]);
        const st = [n.id];
        while (st.length) {
          const id = st.pop();
          (incoming.get(id) || []).forEach((p2) => { if (!cone.has(p2)) { cone.add(p2); st.push(p2); } });
        }
        return cone.size - 1;
      }).filter((x) => x > 0).sort((a, b) => a - b);
      console.log('split', c.def.placeholder, 'size', c.size, 'assert cones', sizes.slice(0, 12).join(','), '... max', sizes[sizes.length - 1]);
    }
    if (!candidates.length) break;
    candidates.sort((a, b) => b.size - a.size);
    const pick = candidates[0];
    const childKey = '@split_' + (seq()) ;
    const coneNodes = c.nodes.filter((n) => pick.cone.has(n.id));
    const coneEdges = c.edges.filter((e) => pick.cone.has(e.from.node) && pick.cone.has(e.to.node));
    const child = {
      def: {
        key: childKey, placeholder: childKey,
        chapter: c.def.chapter, chapterGroup: c.def.chapterGroup,
        title: '中间引理',
        teaches: pick.tokens.slice(1).join(' '),
        hint: '把这段子证明单独证出来，后面的关卡会把它当黑盒。',
        target: pick.tokens.slice(1),
        circuit: { nodes: coneNodes, edges: coneEdges, outputId: pick.node.id },
      },
      size: pick.size,
      targetTokens: pick.tokens,
      deps: Array.from(new Set(coneNodes.filter((n) => n.kind === 'theorem').map((n) => n.config.code))),
      nodes: coneNodes, edges: coneEdges, targetId: pick.node.id,
      palette: (function () {
        const seen = new Set(), pal = [];
        coneNodes.forEach((n) => {
          const cfg = n.kind === 'subst' ? {} : (n.config || {});
          const k = n.kind + ':' + JSON.stringify(cfg);
          if (seen.has(k)) return;
          seen.add(k);
          pal.push({ kind: n.kind, config: cfg });
        });
        return pal;
      })(),
    };
    /* 父关：去掉锥，换成 theorem 节点引用子关 */
    const thmId = 'split' + (seq());
    const keptNodes = c.nodes.filter((n) => !pick.cone.has(n.id));
    const keptEdges = [];
    c.edges.forEach((e) => {
      if (pick.cone.has(e.to.node)) return;           /* 锥内部的边丢掉 */
      if (pick.cone.has(e.from.node)) {
        keptEdges.push({ from: { node: thmId, port: e.from.port }, to: { node: e.to.node, port: e.to.port } });
        return;
      }
      keptEdges.push(e);
    });
    keptNodes.push({ id: thmId, kind: 'theorem', config: { code: childKey }, x: 0, y: 0 });
    const parent = Object.assign({}, c, {
      nodes: keptNodes,
      edges: keptEdges,
      size: keptNodes.length - 1,
      deps: Array.from(new Set(keptNodes.filter((n) => n.kind === 'theorem').map((n) => n.config.code))),
    });
    out.push(child);
    cur = parent;
  }
  return { parent: cur, children: out };
}

/* =========================================================================
 * 4. 排序 + 分带 + 重映射
 * ========================================================================= */
function orderAndBand(compiled, hardSlots, globalPlaced) {
  const globalSet = globalPlaced || new Set();
  const byCode = new Map(compiled.map((c) => [c.def.placeholder, c]));
  const depsOf = new Map(compiled.map((c) => [c.def.placeholder, new Set(c.deps || [])]));
  const tokenLen = (c) => c.targetTokens.length - 1;
  const hardCap = hardSlots || 24;
  const keyOf = (c) => String(c.def.key || c.def.label || '');

  const pref = (c) => {
    if (keyOf(c).indexOf('legacy') === 0) return 0;
    if (keyOf(c).indexOf('cone_') === 0) return 2;
    return 1;
  };
  const fitsNormal = (c) => c.size >= MIN_NORMAL && c.size <= MAX_NORMAL && tokenLen(c) <= MAX_NORMAL_TOKENS;
  const fitSet = new Set(compiled.filter(fitsNormal).map((c) => c.def.placeholder));
  const normalCands = compiled.filter((c) => fitsNormal(c) &&
    (c.deps || []).every((d) => fitSet.has(d)))
    .sort((a, b) => (pref(a) - pref(b)) || (a.size - b.size));
  const candSet = new Set(normalCands.map((c) => c.def.placeholder));

  const normal = [];
  const placedN = new Set();
  for (const cand of normalCands) {
    if (normal.length >= NORMAL_SLOTS) break;
    const ready = Array.from(depsOf.get(cand.def.placeholder)).every((d) => globalSet.has(d) || !candSet.has(d) || placedN.has(d));
    if (!ready) continue;
    normal.push(cand);
    placedN.add(cand.def.placeholder);
  }
  const normalSet = new Set(normal.map((c) => c.def.placeholder));

  /* 困难池 = 其余全部候选；先做依赖自洽过滤（依赖必须在池内或已入选普通关） */
  let hardPool = compiled.filter((c) => !normalSet.has(c.def.placeholder));
  for (let changed = true; changed;) {
    changed = false;
    const have = new Set(hardPool.map((c) => c.def.placeholder).concat(Array.from(normalSet)).concat(Array.from(globalSet)));
    for (let i = hardPool.length - 1; i >= 0; i -= 1) {
      const missing = (hardPool[i].deps || []).filter((d) => !have.has(d));
      if (missing.length) { hardPool.splice(i, 1); changed = true; }
    }
  }
  const prefHard = (c) => (keyOf(c).indexOf('cone_') === 0 ? 1 : 0);
  const placed = new Set();
  const orderedHard = [];
  while (orderedHard.length < hardCap) {
    const ready = hardPool.filter((c) => !placed.has(c.def.placeholder) &&
      Array.from(depsOf.get(c.def.placeholder)).every((d) => globalSet.has(d) || !byCode.has(d) || placed.has(d) || normalSet.has(d)));
    if (!ready.length) break;
    ready.sort((a, b) => (prefHard(a) - prefHard(b)) || (a.size - b.size));
    placed.add(ready[0].def.placeholder);
    orderedHard.push(ready[0]);
  }
  return { normal, hard: orderedHard };
}

function main() {
  const campaign = require(path.join(ROOT, 'campaign', 'campaign2.js'));
  const defs = campaign.levels;
  const byLabel = new Map();
  defs.forEach((d, i) => { d.placeholder = '@' + (d.label || d.key || ('L' + i)); byLabel.set(d.placeholder, d); });

  const problems = [];
  const warnings = [];
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
  /* 拆分候选：补足普通关（每章需要 10 个 5–21 模块的阶梯） */
  const coneLimit = Number(process.env.LADDER_CONE_LIMIT || 12);
  compiled.forEach((c) => {
    if (c.def && c.def.chapterGroup) {
      coneCandidates([c], coneLimit).forEach((x) => compiled.push(x));
    }
  });

  if (process.env.LADDER_DEBUG) console.log('cone candidates:', compiled.filter((c) => c.def.forceBand === 'base').length - 5);
  /* 目标公式去重：同目标只留一个（优先体积小、且没有被其它关卡引用） */
  {
    const referenced = new Set();
    compiled.forEach((c) => (c.deps || []).forEach((d) => referenced.add(d)));
    const byTarget = new Map();
    compiled.forEach((c) => {
      const key = c.targetTokens.join(' ');
      if (!byTarget.has(key)) byTarget.set(key, []);
      byTarget.get(key).push(c);
    });
    const drop = new Set();
    byTarget.forEach((list) => {
      if (list.length < 2) return;
      const isCone = (c) => String(c.def.key || c.def.label || '').indexOf('cone_') === 0;
      list.sort((a, b) => (isCone(a) - isCone(b)) || (a.size - b.size));
      const keep = list[0];
      list.slice(1).forEach((c) => {
        if (!referenced.has(c.def.placeholder)) drop.add(c.def.placeholder);
      });
      void keep;
    });
    if (drop.size) {
      for (let i = compiled.length - 1; i >= 0; i -= 1) {
        if (drop.has(compiled[i].def.placeholder)) compiled.splice(i, 1);
      }
    }
  }

  if (process.env.LADDER_DEBUG) console.log('oversized:', compiled.filter((c) => c.size > 200).map((c) => c.def.placeholder + ':' + c.size).join(','));
  /* 超限关先尝试拆分，只有拆不动的才丢弃 */
  {
    let seqN = 0;
    const seq = () => (seqN += 1);
    for (let i = compiled.length - 1; i >= 0; i -= 1) {
      if (compiled[i].size <= 200) continue;
      const res = splitOversized(compiled[i], 200, seq);
      if (res.children.length) {
        compiled.splice(i, 1, res.parent);
        res.children.forEach((ch) => compiled.push(ch));
      } else {
        compiled.splice(i, 1);
      }
    }
  }
  /* 级联剔除依赖缺失的关卡（例如 >200 被删掉的关卡被别处引用） */
  for (let changed = true; changed;) {
    changed = false;
    const have = new Set(compiled.map((c) => c.def.placeholder));
    for (let i = compiled.length - 1; i >= 0; i -= 1) {
      const c = compiled[i];
      if (c.def.forceBand === 'base') continue;      /* 手工指定的普通关必须留下 */
      const missing = (c.deps || []).filter((d) => !have.has(d));
      if (missing.length) { compiled.splice(i, 1); changed = true; }
    }
  }

  if (process.env.LADDER_DEBUG) console.log('pool after dedupe/split/cascade:', compiled.length, '| forceBase:', compiled.filter((c) => c.def.forceBand === 'base').length, '| authored:', compiled.filter((c) => ['chain3','expConv','preSwap'].indexOf(String(c.def.key)) >= 0).length);
  const groups = {};
  compiled.forEach((c) => {
    const ch = c.def.chapterGroup || 'Ⅰ';
    groups[ch] = groups[ch] || [];
    groups[ch].push(c);
  });
  const chapterOrder = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'].filter((g) => groups[g]);
  const finalList = [];
  const globalPlaced = new Set();
  const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi'];
  chapterOrder.forEach((g) => {
    const tuts = groups[g].filter((c2) => c2.def.tutorial);
    tuts.forEach((c2) => { finalList.push({ c: c2, band: 'tutorial' }); globalPlaced.add(c2.def.placeholder); });
    const rest = groups[g].filter((c2) => !c2.def.tutorial);
    const { normal, hard } = orderAndBand(rest, 25, globalPlaced);
    if (normal.length < NORMAL_SLOTS && groups[g].length >= NORMAL_SLOTS) {
      problems.push(g + ' 章只有 ' + normal.length + ' 个满足 5–21 模块的普通关候选（需要 ' + NORMAL_SLOTS + '）');
    }
    normal.forEach((c) => { finalList.push({ c, band: 'base' }); globalPlaced.add(c.def.placeholder); });
    hard.forEach((c) => { finalList.push({ c, band: 'challenge' }); globalPlaced.add(c.def.placeholder); });
  });

  /* 同目标去重：困难关若与普通关（或更小的困难关）目标相同，改为引用那一关并剔除自己 */
  const alias = new Map();
  {
    const byKey = new Map();
    finalList.forEach((entry) => {
      const key = entry.c.targetTokens.join(' ');
      if (!byKey.has(key)) byKey.set(key, []);
      byKey.get(key).push(entry);
    });
    const removed = new Set();
    const referenced = new Set();
    finalList.forEach((e) => (e.c.deps || []).forEach((d) => referenced.add(d)));
    byKey.forEach((list) => {
      if (list.length < 2) return;
      list.sort((a, b) => (a.band === 'base' ? -1 : 1) || (a.c.size - b.c.size));
      const keep = list[0];
      list.slice(1).forEach((e) => {
        if (referenced.has(e.c.def.placeholder)) return;   /* 仍被引用的重复关保留 */
        alias.set(e.c.def.placeholder, keep.c.def.placeholder);
        removed.add(e.c.def.placeholder);
      });
    });
    if (removed.size) {
      for (let i = finalList.length - 1; i >= 0; i -= 1) {
        if (removed.has(finalList[i].c.def.placeholder)) finalList.splice(i, 1);
      }
    }
  }

  /* 未入选候选 → 同目标已入选关卡的别名 */
  const finalPlaceholders = new Set(finalList.map((e) => e.c.def.placeholder));
  compiled.forEach((c) => {
    if (finalPlaceholders.has(c.def.placeholder)) return;
    const key = (c.targetTokens || []).join(' ');
    const twin = finalList.find((e) => e.c.targetTokens.join(' ') === key);
    if (twin) alias.set(c.def.placeholder, twin.c.def.placeholder);
  });

  /* 每章困难关裁到 24（不裁仍被引用的） */
  {
    const referenced = new Set();
    finalList.forEach((e) => (e.c.deps || []).forEach((d) => referenced.add(d)));
    chapterOrder.forEach((g) => {
      for (;;) {
        const hards = finalList.filter((e) => e.band === 'challenge' && (e.c.def.chapterGroup || 'Ⅰ') === g);
        if (hards.length <= 24) break;
        const victim = hards.filter((e) => !referenced.has(e.c.def.placeholder)).pop();
        if (!victim) break;
        finalList.splice(finalList.indexOf(victim), 1);
      }
    });
  }

  /* 重映射代号：@label → Ⅰ-01 … */
  const remap = new Map();
  const countersTut = {};
  const counters = { 'Ⅰ': 0, 'Ⅱ': 0, 'Ⅲ': 0, 'Ⅳ': 0 };
  finalList.forEach((entry) => {
    const g = entry.c.def.chapterGroup || 'Ⅰ';
    let code;
    if (entry.band === 'tutorial') {
      countersTut[g] = (countersTut[g] || 0) + 1;
      code = g + '-' + ROMAN[countersTut[g] - 1];
    } else {
      counters[g] += 1;
      code = g + '-' + String(counters[g]).padStart(2, '0');
    }
    remap.set(entry.c.def.placeholder, code);
    entry.c.finalCode = code;
    entry.c.finalBand = entry.band;
  });
  const levels = [];
  finalList.forEach((entry, idx) => {
    const c = entry.c;
    /* 拆分候选（circuit 来自中间锥）没有 target 焊盘：补一个并接上输出 */
    if (!c.nodes.some((n) => n.kind === 'target')) {
      const tgt = { id: 'tgt', kind: 'target', config: {}, x: 0, y: 0, targetTokens: c.targetTokens };
      c.edges = c.edges.concat([{ id: 'eT', from: { node: c.targetId, port: 'out' }, to: { node: 'tgt', port: 'proof' } }]);
      c.nodes = c.nodes.concat([tgt]);
      c.targetId = 'tgt';
    }
    c.nodes.forEach((n) => {
      if (n.kind === 'theorem') {
        const target = alias.get(n.config.code) || n.config.code;
        n.config = { code: remap.get(target) || target };
      }
    });
    const def = c.def;
    const level = {
      id: c.finalCode,
      code: c.finalCode,
      no: entry.band === 'tutorial' ? null : Number(c.finalCode.split('-')[1]),
      tutorial: entry.band === 'tutorial',
      hard: entry.band === 'challenge',
      band: entry.band,
      chapter: def.chapter != null ? def.chapter : 0,
      chapterGroup: def.chapterGroup || 'Ⅰ',
      title: def.title,
      teaches: def.teaches || '',
      hint: entry.band === 'challenge' ? null : (def.hint || ''),
      tip: def.tip || null,
      targetTokens: c.targetTokens,
      palette: c.palette,
      initialNodes: [JSON.parse(JSON.stringify(c.nodes.find((n) => n.id === c.targetId)))],
      solution: { nodes: c.nodes.filter((n) => n.id !== c.targetId), edges: c.edges },
      difficulty: c.size,
      stats: { steps: c.size },
      mustUse: Array.from(new Set(c.palette.map((e) => e.kind))).filter((k) => !RSL.Modules.isConstruct(k) && k !== 'theorem'),
      depCodes: (c.deps || []).map((d) => remap.get(alias.get(d) || d)).filter(Boolean),
    };
    if (process.env.LADDER_DEBUG) {
      const thms = c.nodes.filter((n) => n.kind === 'theorem').map((n) => n.config.code);
      if (thms.length) console.log('LVL', c.finalCode, 'thmrefs', thms.join(','), '| size', c.size);
    }
    const res = Engine.evaluate(level, c.nodes.concat([]), c.edges, { levels: levels.concat([level]), levelIndex: idx });
    if (!res.complete) {
      const first = (res.errors || [])[0];
      const badNode = first ? c.nodes.find((n) => n.id === first.nodeId) : null;
      if (process.env.LADDER_DEBUG && badNode && badNode.kind === 'mp') {
        const ins = c.edges.filter((e) => e.to.node === badNode.id).map((e) => {
          const r = res.results[e.from.node];
          return (r && r.tokens ? T.fmt(r.tokens) : 'null') + ' [' + (r && r.tokens ? r.tokens.join(' ') : '') + ']';
        });
        console.log('MP inputs @' + c.finalCode, ins.join('  |  '));
      }
      if (process.env.LADDER_DUMP) {
        console.error('DUMP ' + c.finalCode + ' key=' + c.def.key + ' group=' + c.def.chapterGroup + ' chapter=' + c.def.chapter + ' target=' + T.fmt(c.targetTokens));
        c.nodes.forEach((n) => console.error('  ', n.id, n.kind, JSON.stringify(n.config || {})));
        c.edges.forEach((e) => console.error('  e', e.from.node + ':' + e.from.port, '->', e.to.node + ':' + e.to.port));
      }
      problems.push(c.finalCode + ' 参考解未通关：' + (first ? first.message : '未知') +
        (badNode ? ' @' + badNode.kind + JSON.stringify(badNode.config).slice(0, 60) : ''));
    }
    levels.push(level);
  });

  /* 门禁 */
  levels.forEach((lv) => {
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
      if (n > MAX_HARD) problems.push(lv.code + ' 困难关元件数 ' + n + ' > 200');
      if (tokens > MAX_HARD_TOKENS) problems.push(lv.code + ' 困难关目标 ' + tokens + ' token');
    }
  });
  chapterOrder.forEach((g) => {
    const hard = levels.filter((l) => l.chapterGroup === g && l.hard);
    let slack = 0;
    for (let i = 1; i < hard.length; i += 1) {
      const prev = hard[i - 1].solution.nodes.length;
      const cur = hard[i].solution.nodes.length;
      const drop = prev - cur;
      if (cur < 20 || prev < 20) continue;
      if (drop > INVERSION_ABS && drop > prev * INVERSION_REL) {
        /* 依赖强制：若当前关依赖前面体积更大的关，则允许这次下降（拓扑序无法避免） */
        const depCodes = hard[i].depCodes || [];
        const forced = hard.slice(0, i).some((h) => depCodes.indexOf(h.finalCode) >= 0 && h.solution.nodes.length > cur);
        if (!forced) {
          slack += 1;
          if (slack > 5) {
            problems.push(g + ' 困难关倒挂：' + hard[i - 1].code + '(' + prev + ') → ' + hard[i].code + '(' + cur + ')');
          } else {
            warnings.push(g + ' 允许的小倒挂：' + hard[i - 1].code + '(' + prev + ') → ' + hard[i].code + '(' + cur + ')');
          }
        }
      }
    }
  });

  if (problems.length) {
    console.error('关卡门禁失败 ' + problems.length + ' 项：');
    problems.slice(0, 40).forEach((p) => console.error('  - ' + p));
    process.exit(1);
  }

  warnings.forEach((w) => console.log('  ⚠ ' + w));
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
