#!/usr/bin/env node
'use strict';
/*
 * 关卡生成器：从 research/setmm-data.json 生成
 *   - src/archive.js          set.mm 档案条目（已证定理/公理，规范化公式）
 *   - src/levels-generated.js 每章追加 48 关（总 240 关）
 *
 * 只生成“可被 src/engine.js 实际求值通过”的参考电路；任何一关失败会抛错。
 *
 * 用法：node scripts/gen-levels.js
 */

const fs = require('fs');
const path = require('path');
const { loadRuntime } = require('./lib/load-runtime');

const root = path.resolve(__dirname, '..');
const DATA = path.join(root, 'research', 'setmm-data.json');
const EXTRA_SET = path.join(root, 'research', 'setmm-set-extra.json');
const OUT_ARCHIVE = path.join(root, 'src', 'archive.js');
const OUT_LEVELS = path.join(root, 'src', 'levels-generated.js');

/* ---------- 装载逻辑/现有工程 ---------- */
function load() {
  return loadRuntime({
    files: ['src/logic.js', 'src/library.js', 'src/levels.js'],
    withEngine: true
  });
}
const RSL = load();
const L = RSL.Logic;
const Engine = RSL.Engine;

/* ---------- set.mm 数据规范化 ---------- */
const GREEK = {
  ph: 'P', ps: 'Q', ch: 'R', th: 'S', ta: 'T', et: 'U',
  ze: 'V', si: 'W', rh: 'X', mu: 'Y', la: 'Z', ka: 'A'
};
const GREEK_RE = new RegExp('\\b(' + Object.keys(GREEK).join('|') + ')\\b', 'g');

function normalize(formulaUnicode) {
  let s = String(formulaUnicode).replace(/^⊢\s*/, '').trim();
  s = s.replace(GREEK_RE, (m) => GREEK[m]);
  s = s.replace(/\s+/g, ' ');
  return s;
}

/* 关卡里出现的命题变元只允许这 14 个；档案公式按此归一化（保留已有合法名，其余补空位）。 */
const ATOM_POOL = 'PQRSTUVWXYZABC'.split('');

function mapAtoms(ast, map) {
  switch (ast.k) {
    case 'atom': return { k: 'atom', name: map[ast.name] || ast.name };
    case 'var': return { k: 'var', name: ast.name };
    case 'pred': return { k: 'pred', name: ast.name, args: ast.args.map((a) => ({ k: 'var', name: a.name })) };
    case 'not': return { k: 'not', a: mapAtoms(ast.a, map) };
    case 'or': return { k: 'or', a: mapAtoms(ast.a, map), b: mapAtoms(ast.b, map) };
    case 'imp': return { k: 'imp', a: mapAtoms(ast.a, map), b: mapAtoms(ast.b, map) };
    case 'and': return { k: 'and', a: mapAtoms(ast.a, map), b: mapAtoms(ast.b, map) };
    case 'iff': return { k: 'iff', a: mapAtoms(ast.a, map), b: mapAtoms(ast.b, map) };
    case 'all': return { k: 'all', v: ast.v, a: mapAtoms(ast.a, map) };
    case 'exists': return { k: 'exists', v: ast.v, a: mapAtoms(ast.a, map) };
    default: return ast;
  }
}
function canonicalAtoms(ast) {
  const names = L.atomsOf(ast).slice().sort();
  if (!names.length) return ast;
  const used = new Set();
  const map = Object.create(null);
  /* 优先保留本来就在 14 个名字里的原子，剩下的按池子顺序补。 */
  names.forEach((name) => { if (ATOM_POOL.indexOf(name) >= 0) { map[name] = name; used.add(name); } });
  let cursor = 0;
  names.forEach((name) => {
    if (map[name]) return;
    while (cursor < ATOM_POOL.length && used.has(ATOM_POOL[cursor])) cursor += 1;
    if (cursor >= ATOM_POOL.length) return;
    map[name] = ATOM_POOL[cursor];
    used.add(ATOM_POOL[cursor]);
    cursor += 1;
  });
  return mapAtoms(ast, map);
}

const data = JSON.parse(fs.readFileSync(DATA, 'utf8'));
{
  const seen = new Set(data.map((t) => t.label));
  const extra = JSON.parse(fs.readFileSync(EXTRA_SET, 'utf8'));
  for (const t of extra) {
    if (seen.has(t.label)) continue;
    seen.add(t.label);
    data.push(Object.assign({}, t, { assertionForm: true }));
  }
}
const ARCHIVE = Object.create(null);
const CAND = { prop: [], pred: [], eq: [], set: [] };

function categoryOf(t) {
  const sec = t.section || '';
  const sub = t.subsection || '';
  if (t.module === 'set-pred.mm') {
    if (sec === 'Propositional calculus') return 'prop';
    if (/Predicate calculus/.test(sec)) {
      if (/Universal quantifier|ax-gen|ax-4|ax-5|ax-10|ax-11/.test(sub)) return 'pred';
      if (/Equality|ax-6|ax-7|ax-8|ax-9|ax-12|ax-13|proper substitution|Membership/.test(sub)) return 'eq';
    }
    return null;
  }
  if (t.module === 'set-class.mm' || t.module === 'set-zf.mm' || t.module === 'set-zfc.mm') return 'set';
  return null;
}

function shortName(label, comment) {
  const c = String(comment || '').replace(/\s+/g, ' ').trim();
  if (!c) return label;
  const m = c.split(/(?<=[.!?])\s/)[0];
  return m.length > 64 ? m.slice(0, 61) + '…' : m;
}

for (const t of data) {
  if (!t.assertionForm) continue;
  if (t.kind === 'definition') continue;
  if (/^df/.test(t.label)) continue;
  if (t.kind === 'syntax') continue;
  const cat = categoryOf(t);
  if (!cat) continue;
  let formula = normalize(t.formulaUnicode);
  if (!formula || formula.length > 180) continue;
  let ast;
  try { ast = L.parse(formula); } catch (e) { continue; }
  ast = canonicalAtoms(ast);
  formula = L.fmt(ast);
  const atoms = L.atomsOf(ast);
  const free = L.freeVars(ast);
  const opts = L.replaceOptions(ast);
  const item = {
    label: t.label,
    kind: t.kind,
    section: t.section,
    subsection: t.subsection,
    module: t.module,
    proofLength: t.proofLength || 0,
    formula,
    ast,
    atoms,
    free,
    opts,
    name: shortName(t.label, t.comment)
  };
  ARCHIVE[t.label] = {
    label: t.label,
    code: t.label,
    name: item.name,
    formula,
    kind: t.kind,
    section: t.section,
    module: t.module,
    proofLength: item.proofLength,
    source: 'Metamath set.mm'
  };
  CAND[cat].push(item);
}

/* 数据顺序 = set.mm 顺序；保留它，挑选时做均匀取样。 */
function spread(list, n, offset) {
  const out = [];
  if (!list.length || n <= 0) return out;
  const used = new Set();
  for (let i = 0; i < n; i++) {
    let idx = Math.floor((i + 0.5) * list.length / n + (offset || 0)) % list.length;
    let guard = 0;
    while (used.has(idx) && guard++ < list.length) idx = (idx + 1) % list.length;
    if (used.has(idx)) continue;
    used.add(idx);
    out.push(list[idx]);
  }
  return out;
}
function filter(list, fn) { return list.filter(fn); }
function xyzVars(item) { return item.free.filter((v) => v === 'x' || v === 'y' || v === 'z'); }

/* ---------- 电路构造工具 ---------- */
function Circuit() {
  this.nodes = [];
  this.edges = [];
  this.cache = Object.create(null);
  this.fcount = 0;
}
Circuit.prototype.node = function (id, kind, x, y, config) {
  this.nodes.push({ id, kind, x, y, config: config || {} });
  return id;
};
Circuit.prototype.edge = function (from, fromPort, to, toPort) {
  this.edges.push({ from: { node: from, port: fromPort || 'out' }, to: { node: to, port: toPort } });
};
Circuit.prototype.atom = function (name) {
  const key = 'atom:' + name;
  if (this.cache[key]) return this.cache[key];
  const id = 'a' + (this.fcount++);
  this.node(id, 'atom', 60, 940, { name });
  this.cache[key] = id;
  return id;
};
Circuit.prototype.pred = function (name, arg) {
  const key = 'pred:' + name + '(' + arg + ')';
  if (this.cache[key]) return this.cache[key];
  const id = 'a' + (this.fcount++);
  this.node(id, 'pred', 60, 940, { name, arg });
  this.cache[key] = id;
  return id;
};
Circuit.prototype.formula = function (ast) {
  const key = L.key(ast);
  if (this.cache['f:' + key]) return this.cache['f:' + key];
  const self = this;
  function build(n) {
    if (n.k === 'atom') return self.atom(n.name);
    if (n.k === 'pred') {
      if (!n.args || n.args.length !== 1 || n.args[0].k !== 'var') throw new Error('pred shape unsupported');
      return self.pred(n.name, n.args[0].name);
    }
    if (n.k === 'not') {
      const a = build(n.a);
      const id = 'f' + (self.fcount++);
      self.node(id, 'not', 0, 0);
      self.edge(a, 'out', id, 'a');
      return id;
    }
    if (n.k === 'imp' || n.k === 'or' || n.k === 'and' || n.k === 'iff') {
      const a = build(n.a), b = build(n.b);
      const id = 'f' + (self.fcount++);
      self.node(id, n.k, 0, 0);
      self.edge(a, 'out', id, 'a');
      self.edge(b, 'out', id, 'b');
      return id;
    }
    throw new Error('replacement formula unsupported: ' + n.k);
  }
  const id = build(ast);
  this.cache['f:' + key] = id;
  return id;
};
Circuit.prototype.layoutFormulaNodes = function () {
  let i = 0;
  for (const n of this.nodes) {
    if (n.kind === 'atom' || n.kind === 'pred') {
      n.x = 60 + (i % 8) * 220;
      n.y = 80 + Math.floor(i / 8) * 130;
      i++;
    }
  }
  for (const n of this.nodes) {
    if (n.kind === 'not' || n.kind === 'imp' || n.kind === 'or' || n.kind === 'and' || n.kind === 'iff') {
      n.x = 60 + (i % 8) * 220;
      n.y = 80 + Math.floor(i / 8) * 130;
      i++;
    }
  }
};

function baseCircuit(source) {
  const c = new Circuit();
  if (source.sourceKind === 'axiom') c.node('src', 'axiom', 60, 700, { axiomId: source.id });
  else if (source.sourceKind === 'theorem') c.node('src', 'theorem', 60, 700, { theoremCode: source.id });
  else c.node('src', 'archive', 60, 700, { label: source.label });
  return c;
}

/* ---------- 各种关卡模板 ---------- */
function layoutAndFinish(c, target, spec) {
  c.layoutFormulaNodes();
  const maxX = c.nodes.reduce((m, n) => Math.max(m, n.x || 0), 0);
  const maxY = c.nodes.reduce((m, n) => Math.max(m, n.y || 0), 0);
  const targetX = Math.max(900, maxX + 360);
  const targetY = 640;
  spec.targetPos = { x: targetX, y: targetY };
  spec.world = { w: Math.max(2200, targetX + 520), h: Math.max(1100, maxY + 640) };
  spec.target = target;
  spec.solution = { nodes: c.nodes, edges: c.edges };
  return spec;
}

const CN = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
function levelBase(chapter, num, source, kindName, target) {
  return {
    id: 'CH' + ({ prop: 1, pred: 2, eq: 3, set: 4 }[chapter]) + '-' + String(num).padStart(2, '0'),
    chapter,
    code: 'CH' + ({ prop: 1, pred: 2, eq: 3, set: 4 }[chapter]) + '-' + String(num).padStart(2, '0'),
    title: source.label + ' · ' + kindName,
    kicker: 'set.mm / ' + source.label,
    brief: '',
    hint: '',
    teaches: [kindName],
    allowed: ['archive:' + source.label, 'target'],
    reward: '—',
    note: 'set.mm ' + source.label + (source.section ? '（' + source.section + '）' : '') + '；本作不重证档案定理。',
    target
  };
}

function freshAtoms(source, n, offset) {
  const used = new Set(source.atoms);
  const pool = 'PQRSTUVWXYZABC';
  const out = [];
  for (let i = 0; i < pool.length && out.length < n; i++) {
    const ch = pool[(i + (offset || 0)) % pool.length];
    if (!used.has(ch)) { used.add(ch); out.push(ch); }
  }
  return out;
}

function atom(name) { return { k: 'atom', name }; }
function pred(name, varName) { return { k: 'pred', name, args: [{ k: 'var', name: varName }] }; }
function replacementFor(chapter, kind, names) {
  if (kind === 'pred') return pred(names.length > 1 ? 'G' : 'F', names[0]);
  const a = atom(names[0]);
  const b = names.length > 1 ? atom(names[1]) : null;
  switch (names._shape) {
    case 'not': return { k: 'not', a: a };
    case 'and': return { k: 'and', a, b };
    case 'or': return { k: 'or', a, b };
    case 'iff': return { k: 'iff', a, b };
    default: return { k: 'imp', a, b: b || a };
  }
}

function substLevel(chapter, num, source, mode) {
  let map = {};
  let c = baseCircuit(source);
  let targetAst = source.ast;
  const pos = [];
  if (mode === 'subst1') {
    const atoms = source.atoms;
    if (!atoms.length) return null;
    const aName = atoms[0];
    let repl;
    const shapes = ['imp', 'not', 'and', 'or', 'iff'];
    const shape = shapes[num % shapes.length];
    if (chapter === 'pred') {
      const vars = source.free;
      const v = ['x', 'y', 'z'].find((x) => vars.indexOf(x) < 0) || 'x';
      repl = pred('F', v);
    } else {
      const fresh = freshAtoms(source, 2, num);
      repl = replacementFor(chapter, shape, Object.assign(fresh, { _shape: shape }));
    }
    map[aName] = repl;
    targetAst = L.instantiate(source.ast, map);
    const s = 's0';
    c.node(s, 'subst', 620, 700);
    c.edge('src', 'out', s, 'assertion');
    const at = c.atom(aName);
    c.edge(at, 'out', s, 'atom');
    const f = c.formula(repl);
    c.edge(f, 'out', s, 'formula');
    c.edge(s, 'out', 'target', 'proof');
  } else if (mode === 'subst2') {
    const atoms = source.atoms.slice(0, 2);
    if (atoms.length < 2) return null;
    const fresh = freshAtoms(source, 4, num);
    if (fresh.length < 4) return null;
    const r1 = replacementFor(chapter, 'imp', Object.assign([fresh[0], fresh[1]], { _shape: 'imp' }));
    const r2 = replacementFor(chapter, 'and', Object.assign([fresh[2], fresh[3]], { _shape: 'and' }));
    map[atoms[0]] = r1; map[atoms[1]] = r2;
    targetAst = L.instantiate(source.ast, map);
    let prev = 'src';
    const subs = [[atoms[0], r1, 's0'], [atoms[1], r2, 's1']];
    subs.forEach((row, i) => {
      const s = row[2];
      c.node(s, 'subst', 620 + i * 360, 700);
      c.edge(prev, 'out', s, 'assertion');
      const at = c.atom(row[0]);
      c.edge(at, 'out', s, 'atom');
      const f = c.formula(row[1]);
      c.edge(f, 'out', s, 'formula');
      prev = s;
    });
    c.edge(prev, 'out', 'target', 'proof');
  }
  const spec = levelBase(chapter, num, source, mode === 'subst1' ? '代入' : '双代入', L.fmt(targetAst));
  spec.allowed = ['archive:' + source.label, 'atom', 'pred', 'not', 'imp', 'or', 'and', 'iff', 'subst', 'target'];
  return layoutAndFinish(c, L.fmt(targetAst), spec);
}

function replaceLevel(chapter, num, source) {
  const src = source && source.source ? source.source : source;
  const optIndex = source && typeof source.optIndex === 'number' ? source.optIndex : num;
  const opts = src.opts;
  if (!opts.length) return null;
  const opt = opts[optIndex % opts.length];
  if (L.fmt(opt.result) === L.fmt(src.ast)) return null;
  const c = baseCircuit(src);
  c.node('r0', 'replace', 620, 700, { optionId: opt.id });
  c.edge('src', 'out', 'r0', 'assertion');
  c.edge('r0', 'out', 'target', 'proof');
  const targetAst = opt.result;
  const spec = levelBase(chapter, num, src, '定义置换', L.fmt(targetAst));
  spec.allowed = ['archive:' + src.label, 'replace', 'target'];
  return layoutAndFinish(c, L.fmt(targetAst), spec);
}

function replaceCandidates(list) {
  const out = [];
  for (const source of list) {
    if (!source.opts.length) continue;
    source.opts.forEach((opt, i) => out.push({ source, optIndex: i }));
  }
  return out;
}

/* ---------- 两个 set.mm 条目 + 分离（真·多步推理） ---------- */
function orderBindings(binds) {
  const names = Object.keys(binds);
  const left = names.slice();
  const order = [];
  while (left.length) {
    let found = -1;
    for (let i = 0; i < left.length; i++) {
      const replAtoms = new Set(L.atomsOf(binds[left[i]]));
      const others = left.filter((x, j) => j !== i);
      if (others.every((o) => !replAtoms.has(o))) { found = i; break; }
    }
    if (found < 0) return null;
    order.push(left[found]);
    left.splice(found, 1);
  }
  return order;
}

function detachCandidates(pool) {
  const out = [];
  for (const s of pool) {
    if (!s.ast || s.ast.k !== 'imp') continue;
    for (const t of pool) {
      if (!t.atoms.length) continue;
      let binds;
      try { binds = L.match(t.ast, s.ast.a); } catch (e) { continue; }
      if (!binds) continue;
      const names = Object.keys(binds);
      if (!names.length || names.length > 4) continue;
      const order = orderBindings(binds);
      if (!order) continue;
      let inst;
      try { inst = L.instantiate(t.ast, binds); } catch (e) { continue; }
      if (!L.eq(inst, s.ast.a)) continue;
      out.push({ s, t, binds, order, targetFormula: L.fmt(s.ast.b) });
    }
  }
  return out;
}

function detachPairLevel(chapter, num, cand) {
  const c = baseCircuit(cand.s);
  c.node('t', 'archive', 380, 700, { label: cand.t.label });
  let prev = 't';
  cand.order.forEach((atomName, i) => {
    const s = 's' + i;
    c.node(s, 'subst', 700 + i * 340, 700);
    c.edge(prev, 'out', s, 'assertion');
    const at = c.atom(atomName);
    c.edge(at, 'out', s, 'atom');
    const f = c.formula(cand.binds[atomName]);
    c.edge(f, 'out', s, 'formula');
    prev = s;
  });
  const d = 'd0';
  c.node(d, 'detach', 700 + cand.order.length * 340 + 200, 700);
  c.edge(prev, 'out', d, 'a');
  c.edge('src', 'out', d, 'b');
  c.edge(d, 'out', 'target', 'proof');
  const allowed = new Set(['archive:' + cand.s.label, 'archive:' + cand.t.label, 'atom', 'subst', 'detach', 'target']);
  (function walk(n) {
    if (!n || typeof n !== 'object') return;
    if (n.k === 'not' || n.k === 'imp' || n.k === 'or' || n.k === 'and' || n.k === 'iff') allowed.add(n.k);
    if (n.a) walk(n.a);
    if (n.b) walk(n.b);
    if (n.args) n.args.forEach(walk);
  })(cand.t.ast);
  const spec = levelBase(chapter, num, cand.s, '分离 · ' + cand.t.label + ' → ' + cand.s.label, cand.targetFormula);
  spec.allowed = Array.from(allowed);
  return layoutAndFinish(c, cand.targetFormula, spec);
}

/* 把定理 T 代入定理 S 的前件原子，再分离：S = P→B, T ⊢ B[P:=T]。 */
function detachApplyLevel(chapter, num, pair) {
  const s = pair.s, t = pair.t;
  if (!s || !t || s.ast.k !== 'imp' || s.ast.a.k !== 'atom') return null;
  const atomName = s.ast.a.name;
  const targetAst = L.instantiate(s.ast.b, { [atomName]: t.ast });
  const targetFormula = L.fmt(targetAst);
  const c = baseCircuit(s);
  c.node('t', 'archive', 380, 700, { label: t.label });
  c.node('s0', 'subst', 700, 700);
  c.edge('src', 'out', 's0', 'assertion');
  const at = c.atom(atomName);
  c.edge(at, 'out', 's0', 'atom');
  const f = c.formula(t.ast);
  c.edge(f, 'out', 's0', 'formula');
  c.node('d0', 'detach', 1040, 700);
  c.edge('s0', 'out', 'd0', 'a');
  c.edge('t', 'out', 'd0', 'b');
  c.edge('d0', 'out', 'target', 'proof');
  const allowed = new Set(['archive:' + s.label, 'archive:' + t.label, 'atom', 'subst', 'detach', 'target']);
  (function walk(n) {
    if (!n || typeof n !== 'object') return;
    if (n.k === 'not' || n.k === 'imp' || n.k === 'or' || n.k === 'and' || n.k === 'iff') allowed.add(n.k);
    if (n.a) walk(n.a);
    if (n.b) walk(n.b);
    if (n.args) n.args.forEach(walk);
  })(t.ast);
  const spec = levelBase(chapter, num, s, '分离 · ' + t.label + ' 作为前件', targetFormula);
  spec.allowed = Array.from(allowed);
  return layoutAndFinish(c, targetFormula, spec);
}

function closeVars(ast, vars) {
  let t = ast;
  for (const v of vars) t = { k: 'all', v, a: t };
  return t;
}

function circuitClosure(c, vars) {
  let prev = 'src';
  vars.forEach((v, i) => {
    const id = 'i' + i;
    c.node(id, 'all-intro', 620 + i * 300, 700, { v });
    c.edge(prev, 'out', id, 'assertion');
    prev = id;
  });
  c.edge(prev, 'out', 'target', 'proof');
}

function closureLevel(chapter, num, source, varCount) {
  const vars = xyzVars(source);
  if (!vars.length) return null;
  const use = vars.slice(0, Math.min(varCount || 1, vars.length));
  return closureWithVars(chapter, num, source, use);
}

function closureWithVars(chapter, num, source, use) {
  if (!use || !use.length) return null;
  const targetAst = closeVars(source.ast, use);
  const c = baseCircuit(source);
  circuitClosure(c, use);
  const spec = levelBase(chapter, num, source, '全称闭包', L.fmt(targetAst));
  spec.allowed = ['archive:' + source.label, 'all-intro', 'target'];
  return layoutAndFinish(c, L.fmt(targetAst), spec);
}

function instantiateLevel(chapter, num, source, varCount, termOffset) {
  const vars = xyzVars(source);
  if (!vars.length) return null;
  const use = vars.slice(0, Math.min(varCount || vars.length, vars.length));
  const allTerms = ['a', 'b', 'c'];
  const off = termOffset || 0;
  const terms = allTerms.slice(off).concat(allTerms.slice(0, off));
  let targetAst = source.ast;
  use.forEach((v, i) => { targetAst = L.substituteVar(targetAst, v, { k: 'var', name: terms[i] }); });
  const c = baseCircuit(source);
  const rev = use.slice().reverse();
  let prev = 'src';
  rev.forEach((v, i) => {
    const id = 'i' + i;
    c.node(id, 'all-intro', 620 + i * 300, 700, { v });
    c.edge(prev, 'out', id, 'assertion');
    prev = id;
  });
  use.forEach((v, i) => {
    const id = 'e' + i;
    c.node(id, 'all-elim', 620 + (rev.length + i) * 300, 700, { term: terms[i] });
    c.edge(prev, 'out', id, 'assertion');
    prev = id;
  });
  c.edge(prev, 'out', 'target', 'proof');
  const spec = levelBase(chapter, num, source, '例化', L.fmt(targetAst));
  spec.allowed = ['archive:' + source.label, 'all-intro', 'all-elim', 'target'];
  return layoutAndFinish(c, L.fmt(targetAst), spec);
}

function closureElimLevel(chapter, num, source, closeCount, elimCount) {
  const vars = xyzVars(source);
  if (!vars.length) return null;
  const close = vars.slice(0, Math.min(closeCount, vars.length));
  const elim = close.slice(0, Math.min(elimCount, close.length));
  const terms = ['a', 'b', 'c'];
  let targetAst = source.ast;
  elim.forEach((v, i) => { targetAst = L.substituteVar(targetAst, v, { k: 'var', name: terms[i] }); });
  const remain = close.slice(elim.length).reverse();
  for (const v of remain) targetAst = { k: 'all', v, a: targetAst };
  const c = baseCircuit(source);
  let prev = 'src';
  close.slice().reverse().forEach((v, i) => {
    const id = 'i' + i;
    c.node(id, 'all-intro', 620 + i * 300, 700, { v });
    c.edge(prev, 'out', id, 'assertion');
    prev = id;
  });
  elim.forEach((v, i) => {
    const id = 'e' + i;
    c.node(id, 'all-elim', 620 + (close.length + i) * 300, 700, { term: terms[i] });
    c.edge(prev, 'out', id, 'assertion');
    prev = id;
  });
  c.edge(prev, 'out', 'target', 'proof');
  const spec = levelBase(chapter, num, source, '闭包 + 部分例化', L.fmt(targetAst));
  spec.allowed = ['archive:' + source.label, 'all-intro', 'all-elim', 'target'];
  return layoutAndFinish(c, L.fmt(targetAst), spec);
}

function substClosureLevel(chapter, num, source, withElim) {
  if (!source.atoms.length) return null;
  const varNames = [];
  (function walk(n) {
    if (!n || typeof n !== 'object') return;
    if (n.k === 'var') varNames.push(n.name);
    if (n.k === 'atom') return;
    if (n.a) walk(n.a);
    if (n.b) walk(n.b);
    if (n.v) varNames.push(n.v);
    if (n.args) n.args.forEach(walk);
  })(source.ast);
  const vset = new Set(varNames);
  const v = ['x', 'y', 'z'].find((x) => !vset.has(x));
  if (!v) return null;
  const aName = source.atoms[0];
  const repl = pred('F', v);
  const inst = L.instantiate(source.ast, { [aName]: repl });
  const c = baseCircuit(source);
  const s = 's0';
  c.node(s, 'subst', 620, 700);
  c.edge('src', 'out', s, 'assertion');
  const at = c.atom(aName);
  c.edge(at, 'out', s, 'atom');
  const f = c.formula(repl);
  c.edge(f, 'out', s, 'formula');
  const i = 'i0';
  c.node(i, 'all-intro', 940, 700, { v });
  c.edge(s, 'out', i, 'assertion');
  let targetAst = { k: 'all', v, a: inst };
  let allowed = ['archive:' + source.label, 'atom', 'pred', 'subst', 'all-intro'];
  if (withElim) {
    const e = 'e0';
    c.node(e, 'all-elim', 1260, 700, { term: 'a' });
    c.edge(i, 'out', e, 'assertion');
    c.edge(e, 'out', 'target', 'proof');
    targetAst = L.substituteVar(inst, v, { k: 'var', name: 'a' });
    allowed = allowed.concat(['all-elim']);
  } else {
    c.edge(i, 'out', 'target', 'proof');
  }
  allowed.push('target');
  const spec = levelBase(chapter, num, source, withElim ? '代入 + 闭包 + 例化' : '代入 + 闭包', L.fmt(targetAst));
  spec.allowed = allowed;
  return layoutAndFinish(c, L.fmt(targetAst), spec);
}

/* ---------- 推理关（替代“直接接档案”）：从公理 / 已证结论出发 ---------- */

function sourceFromAxiom(a) {
  const ast = L.parse(a.schema);
  return {
    sourceKind: 'axiom', id: a.id, label: a.id, formula: a.schema,
    ast, atoms: L.atomsOf(ast), free: L.freeVars(ast),
    section: a.section, name: a.name
  };
}
function sourceFromTheorem(level) {
  const ast = L.parse(level.target);
  return {
    sourceKind: 'theorem', id: level.id, label: level.id, formula: level.target,
    ast, atoms: L.atomsOf(ast), free: L.freeVars(ast),
    section: level.chapter, name: level.title
  };
}

const AXIOM_SOURCE = Object.create(null);
RSL.AXIOMS.forEach((a) => { AXIOM_SOURCE[a.id] = sourceFromAxiom(a); });
const HAND_SOURCE = Object.create(null);
RSL.LEVELS.forEach((lv) => { if (/^CH[1-4]-(0[1-9]|1[0-2])$/.test(lv.id)) HAND_SOURCE[lv.id] = sourceFromTheorem(lv); });

const ALL_CAND = CAND.prop.concat(CAND.pred, CAND.eq, CAND.set);
const ARCHIVE_SOURCE = Object.create(null);
ALL_CAND.forEach((item) => {
  ARCHIVE_SOURCE[item.label] = {
    sourceKind: 'archive', id: item.label, label: item.label, formula: item.formula,
    ast: item.ast, atoms: item.atoms, free: item.free, opts: item.opts, section: item.section
  };
});

const HARD_LABELS = {
  prop: ['pm3.24', 'pm2.07', 'simp2', '3mix1', 'pm2.5', 'pm3.11', 'simprrr', 'simpr12'],
  pred: ['alex', 'ax-11', 'exancom', '19.31v', '3exdistr', '19.33b'],
  eq: ['equequ1', 'ax8', 'axc16', 'axc11r', 'equvel', '19.12vvv'],
  set: ['vex', 'vneqv', 'fin41', 'en3lp', 'eqtr2', 'axprlem1', 'ax-pr', 'axunnd', 'oneltri', 'axrep1', 'axacnd']
};

/* 难证档案定理不直接当答案；用它们作引理，要求做一步真正的推演：
   命题/谓词 → 代入实例；等词/集合 → 全称闭包或闭包 + 例化。 */
function hardPlan(chapter) {
  const labels = HARD_LABELS[chapter] || [];
  return labels.map((label, i) => {
    const source = ARCHIVE_SOURCE[label];
    if (!source) return null;
    const vars = xyzVars(source);
    if (chapter === 'prop' || chapter === 'pred') {
      if (source.atoms.length) return { type: 'subst', source };
      if (vars.length) return { type: 'closure', source, vars };
      return null;
    }
    /* 等词 / 集合：优先代入；没有命题原子就做全称闭包；连自由变元都没有时
       用定义置换；最后兜底闭包一个不自由出现的 x（∀I 允许 vacuous 量化）。 */
    if (source.atoms.length) return { type: 'subst', source };
    if (vars.length) return { type: 'closure', source, vars };
    if (source.opts && source.opts.length) return { type: 'replace', source };
    return { type: 'closure', source, vars: ['x'] };
  }).filter(Boolean);
}

function allowedFromCircuit(nodes) {
  const set = new Set(['target']);
  nodes.forEach((n) => {
    if (n.kind === 'axiom') set.add('axiom:' + n.config.axiomId);
    else if (n.kind === 'theorem') set.add('theorem:' + n.config.theoremCode);
    else if (n.kind === 'archive') set.add('archive:' + n.config.label);
    else if (n.kind !== 'target') set.add(n.kind);
  });
  return Array.from(set);
}

/* 每关的 allowed 只保留参考电路真正用到的模块 + 目标；
   不再给 subst 关一律塞上所有连接词 / 谓词元件。 */
function curateAllowed(spec) {
  spec.allowed = allowedFromCircuit(spec.solution.nodes);
  return spec;
}

function decorateReasoning(spec, source, kindName) {
  if (!spec) return null;
  spec.allowed = allowedFromCircuit(spec.solution.nodes);
  spec.title = source.id + ' · ' + kindName;
  spec.kicker = '推理 / ' + source.id;
  spec.teaches = [kindName];
  spec.note = '不使用档案结论；从 ' + (source.sourceKind === 'axiom' ? '公理 ' : '已证结论 ') +
    source.id + ' 出发，用代入 / 量词 / 分离规则推出目标。';
  return spec;
}

function reasoningSubstLevel(chapter, num, source) {
  return decorateReasoning(substLevel(chapter, num, source, 'subst1'), source, '代入推演');
}
function reasoningClosureLevel(chapter, num, source, vars) {
  return decorateReasoning(closureWithVars(chapter, num, source, vars), source, '全称闭包');
}
function reasoningInstantiateLevel(chapter, num, source, termOffset) {
  return decorateReasoning(instantiateLevel(chapter, num, source, 1, termOffset), source, '闭包 + 例化');
}
function reasoningReplaceLevel(chapter, num, source) {
  return decorateReasoning(replaceLevel(chapter, num, source), source, '定义推演');
}

/* 每章直接接档案的关卡数量，替换成不依赖档案的推理关。 */
function reasoningPlan(chapter) {
  if (chapter === 'prop') {
    return [
      { type: 'subst', source: AXIOM_SOURCE['ax-1'] },
      { type: 'subst', source: AXIOM_SOURCE['ax-2'] },
      { type: 'subst', source: AXIOM_SOURCE['ax-3'] },
      { type: 'subst', source: HAND_SOURCE['CH1-07'] },
      { type: 'subst', source: HAND_SOURCE['CH1-10'] },
      { type: 'subst', source: HAND_SOURCE['CH1-12'] },
      { type: 'subst', source: AXIOM_SOURCE['ax-1'] },
      { type: 'subst', source: AXIOM_SOURCE['ax-2'] }
    ];
  }
  if (chapter === 'pred') {
    return [
      { type: 'subst', source: AXIOM_SOURCE['ax-4'] },
      { type: 'subst', source: AXIOM_SOURCE['ax-5'] },
      { type: 'subst', source: AXIOM_SOURCE['ax-10'] },
      { type: 'subst', source: AXIOM_SOURCE['ax-11'] },
      { type: 'subst', source: HAND_SOURCE['CH1-07'] },
      { type: 'subst', source: HAND_SOURCE['CH1-10'] }
    ];
  }
  if (chapter === 'eq') {
    const closure = ['ax-6', 'ax-12', 'ax-13'].map((id) => ({
      type: 'closure', source: AXIOM_SOURCE[id], vars: xyzVars(AXIOM_SOURCE[id])
    }));
    const inst = [
      { type: 'inst', source: AXIOM_SOURCE['ax-7'], termOffset: 0 },
      { type: 'inst', source: AXIOM_SOURCE['ax-8'], termOffset: 1 },
      { type: 'inst', source: AXIOM_SOURCE['ax-9'], termOffset: 2 }
    ];
    return inst.concat(closure);
  }
  if (chapter === 'set') {
    const base = ['ax-ext', 'ax-rep', 'ax-pow', 'ax-un', 'ax-reg', 'ax-inf', 'ax-ac'].map((id) => ({
      type: 'closure', source: AXIOM_SOURCE[id], vars: xyzVars(AXIOM_SOURCE[id])
    }));
    const extra = [
      { type: 'inst', source: AXIOM_SOURCE['ax-ext'], termOffset: 0 },
      { type: 'inst', source: AXIOM_SOURCE['ax-pow'], termOffset: 1 },
      { type: 'inst', source: AXIOM_SOURCE['ax-un'], termOffset: 2 },
      { type: 'inst', source: AXIOM_SOURCE['ax-ac'], termOffset: 1 }
    ];
    return base.concat(extra);
  }
  return [];
}

function buildReasoningLevel(chapter, num, desc) {
  if (!desc || !desc.source) return null;
  try {
    if (desc.type === 'subst') return reasoningSubstLevel(chapter, num, desc.source);
    if (desc.type === 'closure') return reasoningClosureLevel(chapter, num, desc.source, desc.vars);
    if (desc.type === 'inst') return reasoningInstantiateLevel(chapter, num, desc.source, desc.termOffset);
    if (desc.type === 'replace') return reasoningReplaceLevel(chapter, num, desc.source);
  } catch (e) {
    if (process.env.DEBUG) console.error('reasoning error', chapter, desc.type, desc.source.id, e && e.stack || e);
  }
  return null;
}

/* ---------- 章节计划 ---------- */
const PLANS = {
  prop: (list) => {
    const atoms = filter(list, (x) => x.atoms.length >= 1);
    const atoms2 = filter(list, (x) => x.atoms.length >= 2);
    const sApp = filter(list, (x) => x.ast.k === 'imp' && x.ast.a.k === 'atom' && x.atoms.length >= 1);
    const pairs = [];
    for (let i = 0; i < 40 && sApp.length; i++) {
      pairs.push({ s: sApp[(i * 13 + 3) % sApp.length], t: list[(i * 29 + 7) % list.length] });
    }
    return [
      ['reasoning', 8, hardPlan('prop')],
      ['subst1', 10, spread(atoms, 10, 7)],
      ['subst2', 10, spread(atoms2, 10, 13)],
      ['detachApply', 12, spread(pairs, 12, 19)],
      ['detachApply2', 8, spread(pairs, 8, 31)]
    ];
  },
  pred: (list, all) => {
    const atoms = filter(list.concat(all.prop), (x) => x.atoms.length >= 1);
    const atoms2 = filter(list.concat(all.prop), (x) => x.atoms.length >= 2);
    return [
      ['reasoning', 6, hardPlan('pred')],
      ['subst1', 12, spread(atoms, 12, 5)],
      ['substClosure', 10, spread(filter(all.prop, (x) => x.atoms.length >= 1), 10, 17)],
      ['substClosureElim', 10, spread(filter(all.prop, (x) => x.atoms.length >= 1), 10, 23)],
      ['subst2', 10, spread(atoms2, 10, 11)]
    ];
  },
  eq: (list) => {
    const atoms = filter(list, (x) => x.atoms.length >= 1);
    const vars = filter(list, (x) => xyzVars(x).length >= 1);
    const vars2 = filter(list, (x) => xyzVars(x).length >= 2);
    return [
      ['reasoning', 6, hardPlan('eq')],
      ['subst1', 8, spread(atoms, 8, 9)],
      ['closure', 1, spread(vars, 1, 3)],
      ['replace', 3, spread(filter(list, (x) => x.opts.length > 0), 3, 31)],
      ['instantiate1', 15, spread(vars, 15, 15)],
      ['instantiate', 12, spread(vars2.length >= 12 ? vars2 : vars, 12, 21)],
      ['instantiate1b', 3, spread(vars, 3, 43)]
    ];
  },
  set: (list) => {
    const vars = filter(list, (x) => xyzVars(x).length >= 1);
    const vars2 = filter(list, (x) => xyzVars(x).length >= 2);
    const replacePairs = replaceCandidates(filter(list, (x) => x.opts.length > 0));
    const closureVariants = [];
    for (const s of vars) {
      const vs = xyzVars(s);
      closureVariants.push({ source: s, vars: [vs[0]] });
      if (vs.length > 1) {
        closureVariants.push({ source: s, vars: [vs[1]] });
        closureVariants.push({ source: s, vars: vs.slice(0, 2) });
        closureVariants.push({ source: s, vars: vs.slice(0, 2).reverse() });
      }
    }
    return [
      ['reasoning', 11, hardPlan('set')],
      ['closureVariant', 5, closureVariants],
      ['replace', 2, spread(replacePairs, 2, 23)],
      ['instantiate', 12, spread(vars2, 12, 11)],
      ['instantiate1', 9, spread(vars, 9, 7)],
      ['instantiate1b', 8, spread(vars, 8, 41)],
      ['instantiate1c', 1, spread(vars, 1, 53)]
    ];
  }
};

const TEMPLATE_DIFF = {
  reasoning: 0.5,
  replace: 2,
  closure: 3,
  closureVariant: 3,
  closure2: 4,
  instantiate1: 4,
  instantiate: 5,
  subst1: 4,
  subst2: 6,
  substClosure: 4.5,
  substClosureElim: 5.5,
  detachApply: 7,
  detachApply2: 7
};

function difficultyOf(spec, type) {
  return (TEMPLATE_DIFF[type] || 4) + spec.solution.nodes.length * 0.35 + spec.target.length * 0.01;
}

function buildChapter(chapter, list, all) {
  const plan = PLANS[chapter](list, all);
  const starts = { prop: 13, pred: 13, eq: 13, set: 13 };
  const handCount = { prop: 12, pred: 12, eq: 12, set: 12 }[chapter];
  const out = [];
  let num = starts[chapter];
  const usedTargets = new Set();
  for (const [type, count, sources] of plan) {
    let picked = 0;
    for (let i = 0; i < sources.length && picked < count; i++) {
      const source = sources[i];
      let spec = null;
      try {
        if (type === 'direct') spec = directLevel(chapter, num, source);
        else if (type === 'reasoning') spec = buildReasoningLevel(chapter, num, source);
        else if (type === 'subst1') spec = substLevel(chapter, num, source, 'subst1');
        else if (type === 'subst2') spec = substLevel(chapter, num, source, 'subst2');
        else if (type === 'replace') spec = replaceLevel(chapter, num, source);
        else if (type === 'replaceSubst') spec = null;
        else if (type === 'detachApply' || type === 'detachApply2') spec = detachApplyLevel(chapter, num, source);
        else if (type === 'detachPair' || type === 'detachPair2') spec = detachPairLevel(chapter, num, source);
        else if (type === 'closure') spec = closureLevel(chapter, num, source, 1);
        else if (type === 'closureVariant') spec = closureWithVars(chapter, num, source.source, source.vars);
        else if (type === 'closure2') spec = closureLevel(chapter, num, source, 2);
        else if (type === 'instantiate') spec = instantiateLevel(chapter, num, source, 2);
        else if (type === 'instantiate1') spec = instantiateLevel(chapter, num, source, 1);
        else if (type === 'instantiate1b') spec = instantiateLevel(chapter, num, source, 1, 1);
        else if (type === 'instantiate1c') spec = instantiateLevel(chapter, num, source, 1, 2);
        else if (type === 'closureElim') spec = closureElimLevel(chapter, num, source, 2, 1);
        else if (type === 'substClosure') spec = substClosureLevel(chapter, num, source, false);
        else if (type === 'substClosureElim') spec = substClosureLevel(chapter, num, source, true);
      } catch (e) {
        if (process.env.DEBUG) console.error('template error', chapter, type, source.label, e && e.stack || e);
        continue;
      }
      if (!spec) continue;
      if (usedTargets.has(spec.target)) continue;
      if (!validate(spec)) continue;
      curateAllowed(spec);
      usedTargets.add(spec.target);
      spec.band = num <= 30 ? 'base' : 'challenge';
      spec._difficulty = difficultyOf(spec, type);
      out.push(spec);
      picked++;
      num++;
    }
    if (picked < count) throw new Error('chapter ' + chapter + ' template ' + type + ' generated ' + picked + '/' + count);
  }

  /* 基础段 / 挑战段各自按难度递增排序，再重新编号。
     这样挑战段从热身逐步走到收尾，而不是按生成模板块排列。 */
  const base = out.filter((lv) => lv.band === 'base').sort((a, b) => a._difficulty - b._difficulty);
  const chal = out.filter((lv) => lv.band === 'challenge').sort((a, b) => a._difficulty - b._difficulty);
  const ordered = base.concat(chal);
  if (base.length !== 30 - handCount) {
    throw new Error('chapter ' + chapter + ' base generated ' + base.length + ', expected ' + (30 - handCount));
  }
  ordered.forEach((lv, i) => {
    const n = starts[chapter] + i;
    lv.id = 'CH' + ({ prop: 1, pred: 2, eq: 3, set: 4 }[chapter]) + '-' + String(n).padStart(2, '0');
    lv.code = lv.id;
    delete lv._difficulty;
  });
  return ordered;
}

/* ---------- 求值校验 ---------- */
let VRSL = null;
function validate(spec) {
  if (!VRSL) {
    VRSL = loadRuntime({
      files: ['src/logic.js', 'src/library.js', 'src/levels.js'],
      withEngine: true
    });
    /* 生成器在内存里构造 ARCHIVE，校验时直接挂到同一 RSL 上。 */
    VRSL.ARCHIVE = ARCHIVE;
  }
  const target = { id: 'target', kind: 'target', x: 900, y: 300, target: spec.target, config: {} };
  const nodes = [target].concat(JSON.parse(JSON.stringify(spec.solution.nodes)));
  const edges = spec.solution.edges.map((e, i) => ({ id: 'e' + i, from: { ...e.from }, to: { ...e.to } }));
  const r = VRSL.Engine.evaluate(spec, nodes, edges);
  if (!r.complete) {
    console.error('validate fail', spec.id, spec.target, r.errors.map((e) => e.message).join('|'));
    return false;
  }
  return true;
}

/* ---------- 生成 ---------- */
const all = { prop: CAND.prop, pred: CAND.pred, eq: CAND.eq, set: CAND.set };
const generated = [];
for (const chapter of ['prop', 'pred', 'eq', 'set']) {
  generated.push(...buildChapter(chapter, CAND[chapter], all));
}

/* archive.js */
const archiveList = Object.values(ARCHIVE).sort((a, b) => a.label.localeCompare(b.label));
const archiveJs = `/* 公理板 — Metamath set.mm 档案条目（由 scripts/gen-levels.js 生成）。
 *
 * 这些是 set.mm 的已证定理/公理/定义，归一化为本游戏 AST 可解析的公式。
 * 在游戏里通过 archive:<label> 模块引用；本作不重证它们。
 */
(function () {
  'use strict';
  window.RSL = window.RSL || {};
  var ARCHIVE = {};
${archiveList.map((a) => '  ARCHIVE[' + JSON.stringify(a.label) + '] = ' + JSON.stringify(a) + ';').join('\n')}
  window.RSL.ARCHIVE = ARCHIVE;
})();
`;
fs.writeFileSync(OUT_ARCHIVE, archiveJs, 'utf8');

/* levels-generated.js */
const JSON_IDS = {};
function emitLevel(spec) {
  return JSON.stringify(spec, null, 2);
}
const levelsJs = `/* 公理板 — 由 scripts/gen-levels.js 从 set.mm 数据生成的关卡（每章 13–60）。
 * 参考电路全部经 src/engine.js 实际求值；不要手改，改生成器后重新生成。
 */
(function () {
  'use strict';
  window.RSL = window.RSL || {};
  var GENERATED = ${JSON.stringify(generated, null, 1)};
  GENERATED.forEach(function (lv, i) {
    lv.index = (window.RSL.LEVELS || []).length + i;
    lv.order = i + 1;
    lv.chapter = lv.chapter;
    lv.allowed = lv.allowed || [];
    lv.target = lv.target.trim();
  });
  window.RSL.LEVELS = (window.RSL.LEVELS || []).concat(GENERATED);
})();
`;
fs.writeFileSync(OUT_LEVELS, levelsJs, 'utf8');

/* 生成后再从磁盘读回、逐关求值（最终验收） */
const R = loadRuntime({
  files: [
    'src/logic.js',
    'src/archive.js',
    'src/library.js',
    'src/levels.js',
    'src/levels-generated.js'
  ],
  withEngine: true
});
let failures = 0;
for (const lv of R.LEVELS) {
  const target = { id: 'target', kind: 'target', x: 900, y: 300, target: lv.target, config: {} };
  const nodes = [target].concat(JSON.parse(JSON.stringify(lv.solution.nodes)));
  const edges = lv.solution.edges.map((e, i) => ({ id: 'e' + i, from: { ...e.from }, to: { ...e.to } }));
  const r = R.Engine.evaluate(lv, nodes, edges);
  if (!r.complete) { failures++; console.error('FINAL FAIL', lv.id, r.errors.map((e) => e.message).join('|')); }
}
console.log('archive entries:', archiveList.length);
console.log('generated levels:', generated.length, 'total levels:', R.LEVELS.length, 'failures:', failures);
process.exit(failures ? 1 : 0);
