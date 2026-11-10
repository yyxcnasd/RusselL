#!/usr/bin/env node
'use strict';
/*
 * 关卡编译器：把手工编写的关卡（目标 / 参考证明项）展开成棋盘数据。
 *
 * 它只做三件事：
 *   1) 按证明项把断言步骤接成 DAG，并把替换用的公式用构造模块搭出来；
 *   2) 自动排布坐标（作者不手填 x/y）；
 *   3) 用真实 RSL.Engine 逐关求值，参考证明必须 100% 通关，否则报错。
 *
 * 关卡内容（目标、顺序、提示、依赖）全部在 campaign/ 下手写；这里不发明关卡。
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const Term = require(path.join(ROOT, 'src', 'term.js'));
const Engine = require(path.join(ROOT, 'src', 'engine.js'));
const campaign = require(path.join(ROOT, 'campaign', 'index.js'));

const OUT_LEVELS = path.join(ROOT, 'src', 'levels.js');
const OUT_META = path.join(ROOT, 'src', 'campaign-meta.js');

const PAD = (n) => String(n).padStart(2, '0');
const keyOf = (body) => body.join('\u0000');

/* ---------- 公式 → 构造电路 ---------- */
function createBuilder() {
  const nodes = [];
  const edges = [];
  let seq = 0;
  let edgeSeq = 0;
  const formulaCache = new Map();
  const termCache = new Map();

  const used = [];
  const usedSeen = new Set();
  function addNode(kind, config) {
    const id = 'n' + (++seq);
    const cfg = config || {};
    const key = kind + ':' + JSON.stringify(cfg);
    if (!usedSeen.has(key)) { usedSeen.add(key); used.push({ kind, config: cfg }); }
    nodes.push({ id, kind, config: cfg, x: 0, y: 0 });
    return id;
  }
  function connect(from, fromPort, to, toPort) {
    edges.push({
      id: 'e' + (++edgeSeq),
      from: { node: from, port: fromPort },
      to: { node: to, port: toPort }
    });
  }
  function termNode(name) {
    if (termCache.has(name)) return termCache.get(name);
    const id = addNode('term', { name });
    termCache.set(name, id);
    return id;
  }

  /** 把 wff 公式体搭成构造电路，返回输出节点 id。 */
  function formula(body) {
    const k = keyOf(body);
    if (formulaCache.has(k)) return formulaCache.get(k);
    let id;
    if (body.length === 1 && /^[A-Za-z][A-Za-z0-9_]*$/.test(body[0])) {
      id = addNode('atom', { name: body[0] });
    } else if (body[0] === '-.') {
      const a = formula(body.slice(1));
      id = addNode('not', {});
      connect(a, 'out', id, 'a');
    } else if (body[0] === '(') {
      const inner = body.slice(1, -1);
      const AND = '/'.concat(String.fromCharCode(92));
      const OR = String.fromCharCode(92).concat('/');
      const ops = { '->': 'imp', '<->': 'iff' };
      ops[AND] = 'and';
      ops[OR] = 'or';
      let depth = 0, split = -1, opKind = null, opLen = 0;
      for (let i = 0; i < inner.length && split < 0; i += 1) {
        if (inner[i] === '(') depth += 1;
        else if (inner[i] === ')') depth -= 1;
        else if (depth === 0) {
          const two = inner[i] + (inner[i + 1] || '');
          if (ops[two]) { split = i; opKind = ops[two]; opLen = 2; }
          else if (ops[inner[i]]) { split = i; opKind = ops[inner[i]]; opLen = 1; }
        }
      }
      if (split < 0) throw new Error('公式缺少顶层运算符：' + body.join(' '));
      const a = formula(inner.slice(0, split));
      const b = formula(inner.slice(split + opLen));
      id = addNode(opKind, {});
      connect(a, 'out', id, 'a');
      connect(b, 'out', id, 'b');
    } else if (body[0] === 'E.') {
      const ax = formula(body.slice(2));
      id = addNode('exists', { v: body[1] });
      connect(ax, 'out', id, 'a');
    } else if (body[0] === 'A.') {
      const a = formula(body.slice(2));
      id = addNode('all', { v: body[1] });
      connect(a, 'out', id, 'a');
    } else if (body.length === 3 && body[1] === 'e.') {
      const t1 = termNode(body[0]);
      const t2 = termNode(body[2]);
      id = addNode('mem', {});
      connect(t1, 'out', id, 'a');
      connect(t2, 'out', id, 'b');
    } else if (body.length === 3 && body[1] === '=') {
      const t1 = termNode(body[0]);
      const t2 = termNode(body[2]);
      id = addNode('pred', { symbol: '=' });
      connect(t1, 'out', id, 't1');
      connect(t2, 'out', id, 't2');
    } else if (body.length === 4 && body[1] === '(' && body[3] === ')') {
      const t1 = termNode(body[2]);
      id = addNode('pred', { symbol: body[0] });
      connect(t1, 'out', id, 't1');
    } else {
      throw new Error('无法构造公式：' + body.join(' '));
    }
    formulaCache.set(k, id);
    return id;
  }

  return { nodes, edges, formula, termNode, addNode, connect, nextId: () => seq, used: () => used };
}

/* ---------- 证明项 → 断言电路 ---------- */
function compileProof(proof, builder, ctx) {
  const proofCache = new WeakMap();
  const keyCache = new WeakMap();
  const byKey = new Map();

  function arrayKey(a) {
    return Array.isArray(a) ? a.join('\u0001') : String(a);
  }
  function atomsKey(atoms) {
    const o = atoms || {};
    return Object.keys(o).sort().map((k) => k + '=' + arrayKey(o[k])).join('\u0002');
  }
  function proofKey(pt) {
    if (!pt || typeof pt !== 'object') return String(pt);
    if (keyCache.has(pt)) return keyCache.get(pt);
    let k;
    switch (pt.op) {
      case 'axiom': k = 'ax|' + pt.schema + '|' + (pt.v || '') + '|' + atomsKey(pt.atoms); break;
      case 'lemma': k = 'thm|' + pt.n + '|' + atomsKey(pt.atoms); break;
      case 'subst': k = 'sub|' + proofKey(pt.of) + '|' + atomsKey(pt.atoms) + '|' + JSON.stringify(pt.vars || null); break;
      case 'mp': k = 'mp|' + proofKey(pt.a) + '|' + proofKey(pt.b); break;
      case 'gen': k = 'gen|' + proofKey(pt.of) + '|' + pt.v; break;
      case 'shift': k = 'shift|' + arrayKey(pt.formula) + '|' + pt.v; break;
      case 'allInst': k = 'allInst|' + arrayKey(pt.formula) + '|' + pt.v + '|' + pt.t; break;
      case 'existsGen': k = 'existsGen|' + arrayKey(pt.formula) + '|' + pt.v + '|' + pt.t; break;
      case 'existsE': k = 'existsE|' + proofKey(pt.ex) + '|' + proofKey(pt.imp); break;
      default:
        k = pt.op + '|' + JSON.stringify(pt || {});
        break;
    }
    keyCache.set(pt, k);
    return k;
  }

  function cleanAtoms(atoms) {
    const out = {};
    Object.keys(atoms || {}).forEach((name) => {
      const body = atoms[name];
      /* P ↦ P 这种空代换不生成 S 节点。 */
      if (Array.isArray(body) && body.length === 1 && body[0] === name) return;
      out[name] = body;
    });
    return out;
  }

  function resolve(pt) {
    const pk = proofKey(pt);
    if (byKey.has(pk)) return byKey.get(pk);
    if (proofCache.has(pt)) return proofCache.get(pt);
    let id;
    switch (pt.op) {
      case 'axiom':
      case 'lemma': {
        const base = pt.op === 'axiom'
          ? builder.addNode('axiom', pt.v ? { schema: pt.schema, v: pt.v } : { schema: pt.schema })
          : (function () {
            if (pt.n >= ctx.no) throw new Error('关卡 *' + PAD(ctx.no) + ' 不能引用自己或更晚的 *' + PAD(pt.n));
            return builder.addNode('theorem', { n: pt.n });
          })();
        const atoms = cleanAtoms(pt.atoms);
        const names = Object.keys(atoms);
        if (!names.length) { id = base; break; }
        if (names.length > 3) throw new Error('一个实例最多 3 组原子代入');
        id = builder.addNode('subst', { groups: Math.max(0, names.length - 1) });
        builder.connect(base, 'out', id, 'assertion');
        names.forEach((name, i) => {
          const atomNode = builder.addNode('atom', { name });
          const formulaNode = builder.formula(atoms[name]);
          builder.connect(atomNode, 'out', id, 'atom' + (i + 1));
          builder.connect(formulaNode, 'out', id, 'formula' + (i + 1));
        });
        break;
      }
      case 'subst': {
        const atoms = cleanAtoms(pt.atoms);
        const atomNames = Object.keys(atoms);
        if (atomNames.length > 3) throw new Error('subst 最多 3 组原子');
        let vars = null;
        if (pt.vars) {
          const from = Object.keys(pt.vars)[0];
          if (from !== pt.vars[from]) vars = pt.vars;
        }
        const src = resolve(pt.of);
        if (!atomNames.length && !vars) { id = src; break; }
        id = builder.addNode('subst', { groups: Math.max(0, atomNames.length - 1) });
        builder.connect(src, 'out', id, 'assertion');
        atomNames.forEach((name, i) => {
          const atomNode = builder.addNode('atom', { name });
          const formulaNode = builder.formula(atoms[name]);
          builder.connect(atomNode, 'out', id, 'atom' + (i + 1));
          builder.connect(formulaNode, 'out', id, 'formula' + (i + 1));
        });
        if (vars) {
          const from = Object.keys(vars)[0];
          const to = vars[from];
          const a = builder.termNode(from);
          const b = builder.termNode(to);
          builder.connect(a, 'out', id, 'vleft');
          builder.connect(b, 'out', id, 'vright');
        }
        break;
      }
      case 'mp': {
        id = builder.addNode('mp', {});
        const a = resolve(pt.a);
        const b = resolve(pt.b);
        builder.connect(a, 'out', id, 'a');
        builder.connect(b, 'out', id, 'b');
        break;
      }
      case 'gen': {
        id = builder.addNode('gen', { v: pt.v });
        builder.connect(resolve(pt.of), 'out', id, 'assertion');
        break;
      }
      case 'allInst': {
        id = builder.addNode('all-inst', { v: pt.v });
        builder.connect(builder.formula(pt.formula), 'out', id, 'formula');
        builder.connect(builder.termNode(pt.t), 'out', id, 'term');
        break;
      }
      case 'existsGen': {
        id = builder.addNode('exists-gen', { v: pt.v });
        builder.connect(builder.formula(pt.formula), 'out', id, 'formula');
        builder.connect(builder.termNode(pt.t), 'out', id, 'term');
        break;
      }
      case 'andIntroAx': {
        id = builder.addNode('and-intro-ax', {});
        builder.connect(builder.formula(pt.a), 'out', id, 'a');
        builder.connect(builder.formula(pt.b), 'out', id, 'b');
        break;
      }
      case 'andElimAx': {
        id = builder.addNode('and-elim-ax', { side: pt.side || 'l' });
        builder.connect(builder.formula(pt.a), 'out', id, 'a');
        builder.connect(builder.formula(pt.b), 'out', id, 'b');
        break;
      }
      case 'orIntroAx': {
        id = builder.addNode('or-intro-ax', { side: pt.side || 'l' });
        builder.connect(builder.formula(pt.a), 'out', id, 'a');
        builder.connect(builder.formula(pt.b), 'out', id, 'b');
        break;
      }
      case 'orElimAx': {
        id = builder.addNode('or-elim-ax', {});
        builder.connect(builder.formula(pt.a), 'out', id, 'a');
        builder.connect(builder.formula(pt.b), 'out', id, 'b');
        builder.connect(builder.formula(pt.c), 'out', id, 'c');
        break;
      }
      case 'iffIntroAx': {
        id = builder.addNode('iff-intro-ax', {});
        builder.connect(builder.formula(pt.a), 'out', id, 'a');
        builder.connect(builder.formula(pt.b), 'out', id, 'b');
        break;
      }
      case 'iffElimAx': {
        id = builder.addNode('iff-elim-ax', { dir: pt.dir || 'lr' });
        builder.connect(builder.formula(pt.a), 'out', id, 'a');
        builder.connect(builder.formula(pt.b), 'out', id, 'b');
        break;
      }
      case 'existsE': {
        id = builder.addNode('exists-elim', {});
        builder.connect(resolve(pt.ex), 'out', id, 'exists');
        builder.connect(resolve(pt.imp), 'out', id, 'implication');
        break;
      }
      case 'setExt': {
        id = builder.addNode('set-ext', {});
        builder.connect(builder.termNode(pt.a), 'out', id, 'a');
        builder.connect(builder.termNode(pt.b), 'out', id, 'b');
        break;
      }
      case 'setEmpty': {
        id = builder.addNode('set-empty', {});
        break;
      }
      case 'setPair': {
        id = builder.addNode('set-pair', {});
        builder.connect(builder.termNode(pt.u), 'out', id, 'u');
        builder.connect(builder.termNode(pt.v), 'out', id, 'v');
        break;
      }
      case 'setUnion': {
        id = builder.addNode('set-union', {});
        builder.connect(builder.termNode(pt.a), 'out', id, 'a');
        break;
      }
      case 'shift': {
        id = builder.addNode('shift', { v: pt.v });
        builder.connect(builder.formula(pt.formula), 'out', id, 'formula');
        break;
      }
      case 'eqRefl': {
        id = builder.addNode('eq-refl', { t: pt.t });
        break;
      }
      case 'leibniz': {
        id = builder.addNode('leibniz', { mode: pt.mode || 'abstract', v: pt.v || 'z' });
        builder.connect(builder.termNode(pt.x), 'out', id, 'x');
        builder.connect(builder.termNode(pt.y), 'out', id, 'y');
        builder.connect(builder.formula(pt.formula), 'out', id, 'formula');
        break;
      }
      default:
        throw new Error('未知证明项 ' + pt.op);
    }
    proofCache.set(pt, id);
    byKey.set(pk, id);
    return id;
  }

  return resolve(proof);
}

/* ---------- 证明节点去重 ---------- */
function dedupeProofNodes(nodes, edges, targetId, evalResult) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const rank = (n) => {
    if (n.kind === 'theorem') return 0;
    if (n.kind === 'axiom') return 1;
    if (n.kind === 'subst') return 2;
    return 3;
  };
  const groups = new Map();
  const orderIndex = new Map();
  (evalResult.order || []).forEach((id, i) => orderIndex.set(id, i));
  nodes.forEach((n) => {
    const r = evalResult.results && evalResult.results[n.id];
    if (!r || !r.tokens || r.tokens[0] !== '|-' || n.kind === 'target') return;
    const key = r.tokens.join('\u0000');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(n);
  });
  const replace = new Map();
  groups.forEach((list) => {
    if (list.length < 2) return;
    list.sort((a, b) => {
      const ra = rank(a), rb = rank(b);
      if (ra !== rb) return ra - rb;
      return (orderIndex.get(a.id) || 0) - (orderIndex.get(b.id) || 0);
    });
    const keep = list[0];
    list.slice(1).forEach((n) => { replace.set(n.id, keep.id); });
  });
  if (!replace.size) return { nodes: nodes, edges: edges, removed: 0 };
  const keptEdges = [];
  edges.forEach((e) => {
    const from = replace.get(e.from.node) || e.from.node;
    if (from === e.to.node) return;
    keptEdges.push({
      id: e.id,
      from: { node: from, port: e.from.port },
      to: { node: e.to.node, port: e.to.port }
    });
  });
  const needed = new Set([targetId]);
  let changed = true;
  while (changed) {
    changed = false;
    keptEdges.forEach((e) => {
      if (needed.has(e.to.node) && !needed.has(e.from.node)) {
        needed.add(e.from.node);
        changed = true;
      }
    });
  }
  const keptNodes = nodes.filter((n) => needed.has(n.id) || n.kind === 'target');
  const keptIds = new Set(keptNodes.map((n) => n.id));
  return {
    nodes: keptNodes,
    edges: keptEdges.filter((e) => keptIds.has(e.from.node) && keptIds.has(e.to.node)),
    removed: nodes.length - keptNodes.length
  };
}

/* ---------- 布局 ---------- */
function layout(nodes, edges, targetId, results) {
  const incoming = new Map();
  nodes.forEach((n) => incoming.set(n.id, []));
  edges.forEach((e) => { if (incoming.has(e.to.node)) incoming.get(e.to.node).push(e.from.node); });
  const depth = new Map();
  const visiting = new Set();
  function d(id) {
    if (depth.has(id)) return depth.get(id);
    if (visiting.has(id)) return 0;
    visiting.add(id);
    const parents = incoming.get(id) || [];
    let v = 0;
    parents.forEach((p) => { v = Math.max(v, d(p) + 1); });
    visiting.delete(id);
    depth.set(id, v);
    return v;
  }
  nodes.forEach((n) => d(n.id));
  const columns = new Map();
  nodes.forEach((n) => {
    const c = depth.get(n.id) || 0;
    if (!columns.has(c)) columns.set(c, []);
    columns.get(c).push(n);
  });
  const COL_W = 268;
  const PAD_X = 40;
  const PAD_Y = 40;
  const GAP = 28;
  function inputCount(n) {
    if (n.kind === 'target') return 1;
    if (n.kind === 'subst') {
      const extras = Math.max(0, Math.min(4, (n.config && n.config.groups) || 0));
      return 1 + 2 * (1 + extras);
    }
    const info = Engine.info(n.kind);
    return info && info.ports ? (info.ports.inputs || []).length : 1;
  }
  function nodeHeight(n) {
    const r = results && results[n.id];
    const tokenCount = r && r.tokens ? r.tokens.length : 16;
    const lines = Math.max(1, Math.ceil(tokenCount / 18));
    const formulaH = 64 + lines * 27;
    const portH = n.kind === 'target'
      ? 46 + 29
      : 47 + Math.max(0, inputCount(n) - 1) * 32 + 29;
    return Math.max(112, formulaH, portH);
  }
  columns.forEach((list, c) => {
    let y = PAD_Y;
    list.forEach((n) => {
      n.x = PAD_X + c * COL_W;
      n.y = y;
      y += nodeHeight(n) + GAP;
    });
  });
  const maxDepth = Math.max.apply(null, Array.from(depth.values()).concat([0]));
  const target = nodes.find((n) => n.id === targetId);
  if (target) {
    target.x = PAD_X + (maxDepth + 1) * COL_W;
    target.y = PAD_Y;
  }
}

/* ---------- 主流程 ---------- */
function compileLevel(def, prevLevels) {
  const isTutorial = !!def.tutorial;
  const displayCode = isTutorial ? def.label : '*' + PAD(def.no);
  const builder = createBuilder();
  const finalId = compileProof(def.proof, builder, { no: isTutorial ? 1 : def.no });
  const targetId = builder.addNode('target', {});
  builder.connect(finalId, 'out', targetId, 'proof');
  const targetTokens = ['|-'].concat(def.target);
  const currentNo = isTutorial ? 1 : def.no;
  let nodes = builder.nodes;
  let edges = builder.edges;

  /* 先按“输出断言”合并语义相同的证明节点，再清掉只剩构造节点的死支。
   * 同一个 |- 公式可以由不同路径证明；下游只关心输出，所以可以安全共享。 */
  const pre = Engine.evaluate({ targetTokens: targetTokens }, nodes, edges, { levels: prevLevels, levelNo: currentNo });
  if (pre.complete) {
    const merged = dedupeProofNodes(nodes, edges, targetId, pre);
    if (merged.removed > 0) {
      nodes = merged.nodes;
      edges = merged.edges;
    }
  }

  layout(nodes, edges, targetId, pre.results);
  nodes.find((n) => n.id === targetId).targetTokens = targetTokens;

  /* S 的可见引脚组必须覆盖它所有 atom/formula 接线。 */
  nodes.forEach((n) => {
    if (n.kind !== 'subst') return;
    let maxGroup = 1;
    edges.forEach((e) => {
      if (e.to.node !== n.id) return;
      const m = /^(?:atom|formula)(\d+)$/.exec(e.to.port);
      if (m) maxGroup = Math.max(maxGroup, Number(m[1]));
    });
    const groups = (n.config && n.config.groups) || 0;
    if (groups < maxGroup - 1) {
      throw new Error(displayCode + ' 的 S 元件少生成了引脚组：需要 ' + (maxGroup - 1) + '，实际 ' + groups);
    }
  });

  /* 只收录参考证明实际用到的模块：元件栏保持精简，玩家按参考解法即可通关。 */
  const mergedPalette = [];
  const seenPalette = new Set();
  nodes.forEach((entry) => {
    if (entry.kind === 'target') return;
    const k = entry.kind + ':' + JSON.stringify(entry.config || {});
    if (seenPalette.has(k)) return;
    seenPalette.add(k);
    mergedPalette.push({
      kind: entry.kind,
      config: entry.kind === 'subst' ? {} : (entry.config || {})
    });
  });

  const level = {
    id: isTutorial ? 'T' + def.chapter + def.label : 'L' + PAD(def.no),
    code: displayCode,
    no: isTutorial ? null : def.no,
    tutorial: isTutorial,
    chapter: def.chapter,
    chapterGroup: campaign.chapters[def.chapter].id,
    title: def.title,
    teaches: def.teaches || '',
    hint: def.hint || '',
    tip: isTutorial ? (def.tip || null) : null,
    targetTokens,
    palette: mergedPalette,
    initialNodes: [],
    solution: { nodes: nodes.filter((n) => n.id !== targetId), edges: edges },
    difficulty: 0,
    stats: { steps: 0 }
  };
  const initial = nodes.find((n) => n.id === targetId);
  level.initialNodes = [JSON.parse(JSON.stringify(initial))];
  /* 初始节点里不要带 solution 的 targetTokens 之外的多余引用 */
  level.stats.steps = countSteps(level.solution.nodes);
  level.difficulty = countSteps(level.solution.nodes) + 0.1 * (def.target.length / 4);

  const result = Engine.evaluate(level, nodes, edges, { levels: prevLevels, levelNo: currentNo });
  if (!result.complete) {
    const first = (result.errors || [])[0];
    let detail = '';
    if (first) {
      const bad = nodes.filter((n) => n.id === first.nodeId)[0];
      const ins = edges.filter((e) => e.to.node === first.nodeId);
      detail = ' @' + (bad ? bad.kind + '/' + JSON.stringify(bad.config) : first.nodeId) +
        ' inputs=' + ins.map((e) => {
          const r = result.results[e.from.node];
          return (r && r.tokens ? r.tokens.slice(0, 12).join(' ') : 'null');
        }).join(' | ');
    }
    throw new Error('关卡 ' + displayCode + '（' + def.title + '）参考证明未通关：' +
      (first ? first.message : '未知错误') + detail + '；目标 ' + Term.fmt(targetTokens));
  }
  return level;
}

function countSteps(nodes) {
  return nodes.filter((n) => n.kind !== 'target').length;
}

function main() {
  const levels = [];
  const errors = [];
  campaign.levels.forEach((def, i) => {
    try {
      levels.push(compileLevel(def, levels));
    } catch (err) {
      errors.push(err.message);
    }
  });
  if (errors.length) {
    console.error('关卡编译失败 ' + errors.length + ' 关：');
    errors.slice(0, 10).forEach((e) => console.error('  ' + e));
    process.exit(1);
  }
  /* 静态检查：定理引用必须指向更早关卡（教学关无编号，禁止引用定理） */
  levels.forEach((lv, i) => {
    (lv.palette || []).forEach((e) => {
      if (e.kind === 'theorem' && (lv.tutorial || !(e.config.n < lv.no))) {
        throw new Error(lv.code + ' 引用了不早于自己的 *' + PAD(e.config.n));
      }
    });
  });

  const header = '/* 自动生成：node scripts/build-campaign.js（源：campaign/*.js，内容手写） */\n';
  const body = header +
    '(function (host) {\n' +
    "  'use strict';\n" +
    '  host.RSL = host.RSL || {};\n' +
    '  host.RSL.LEVELS = ' + JSON.stringify(levels) + ';\n' +
    "  if (typeof module !== 'undefined' && module.exports) module.exports = host.RSL.LEVELS;\n" +
    "})(typeof window !== 'undefined' ? window : globalThis);\n";
  fs.writeFileSync(OUT_LEVELS, body, 'utf8');

  const meta = header +
    '(function (host) {\n' +
    "  'use strict';\n" +
    '  host.RSL = host.RSL || {};\n' +
    '  host.RSL.CAMPAIGN = ' + JSON.stringify(campaign.chapters) + ';\n' +
    '  host.RSL.CAMPAIGN_META = ' + JSON.stringify({ total: levels.length }) + ';\n' +
    '})(typeof window !== \'undefined\' ? window : globalThis);\n';
  fs.writeFileSync(OUT_META, meta, 'utf8');

  const steps = levels.reduce((s, lv) => s + lv.stats.steps, 0);
  console.log('levels:', levels.length, '· steps:', steps, '· chapters:', campaign.chapters.length);
  const byChapter = {};
  levels.forEach((lv) => { byChapter[lv.chapterGroup] = (byChapter[lv.chapterGroup] || 0) + 1; });
  console.log('by chapter:', JSON.stringify(byChapter));
}

main();
