#!/usr/bin/env node
/*!
 * 公理板 — 命题证明搜索器与参考电路生成器
 * ============================================
 *
 * 用法：
 *   node scripts/prove.js "<目标公式>"                     # 打印步骤列表
 *   node scripts/prove.js "<目标公式>" --json              # 打印 {steps:[...]}
 *   node scripts/prove.js "<目标公式>" --circuit           # 额外打印游戏 circuit JSON
 *   node scripts/prove.js "<目标公式>" --circuit --verify  # 用真实引擎评估电路
 *   node scripts/prove.js "<目标公式>" --lemma "id:P→P"    # 复用前面关卡结论（scheme）
 *
 * 选项：
 *   --lemma <spec>     可重复；spec = "<公式>" 或 "<id>:<公式>" / "<id>=<公式>"
 *   --depth <n>        反向搜索迭代加深上限（默认 12）
 *   --budget <n>       反向搜索展开预算（默认 20000）
 *   --engine <name>    backward | dt | auto（默认 auto：先 backward 再 dt）
 *   --json / --circuit / --verify
 *   --out <file>       把 circuit JSON（或步骤 JSON）写到文件
 *
 * 只依赖 src/logic.js（经典脚本方式 vm 加载）与 src/engine.js（仅 --verify）。
 * 不修改 src/ 下的任何文件。
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { loadRuntime } = require('./lib/load-runtime');

/* =========================================================================
 * 0. CLI
 * ========================================================================= */

function parseArgs(argv) {
  const opts = {
    goal: null,
    lemmas: [],
    json: false,
    circuit: false,
    verify: false,
    verbose: false,
    engine: 'auto',
    depth: 12,
    budget: 20000,
    out: null
  };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') opts.json = true;
    else if (a === '--circuit') opts.circuit = true;
    else if (a === '--verify') opts.verify = true;
    else if (a === '--verbose' || a === '-v') opts.verbose = true;
    else if (a === '--help' || a === '-h') opts.help = true;
    else if (a === '--lemma' || a === '--lemmas') opts.lemmas.push(argv[++i]);
    else if (a.startsWith('--lemma=')) opts.lemmas.push(a.slice(8));
    else if (a === '--depth') opts.depth = Number(argv[++i]);
    else if (a.startsWith('--depth=')) opts.depth = Number(a.slice(8));
    else if (a === '--budget') opts.budget = Number(argv[++i]);
    else if (a.startsWith('--budget=')) opts.budget = Number(a.slice(9));
    else if (a === '--engine') opts.engine = argv[++i];
    else if (a.startsWith('--engine=')) opts.engine = a.slice(9);
    else if (a === '--out') opts.out = argv[++i];
    else if (a.startsWith('--out=')) opts.out = a.slice(6);
    else rest.push(a);
  }
  opts.goal = rest.join(' ');
  return opts;
}

/* =========================================================================
 * 1. 以经典脚本方式加载 src/logic.js（以及 --verify 用的 src/engine.js）
 *    vm 样板见 scripts/lib/load-runtime.js。
 * ========================================================================= */

function loadLogic(withEngine) {
  return loadRuntime({ files: ['src/logic.js'], withEngine: withEngine });
}

/* =========================================================================
 * 2. 公理表（set.mm 命题基：Łukasiewicz / Church P2）
 * ========================================================================= */

const AXIOM_DEFS = [
  { id: 'ax-1', code: '*1.2', name: 'Simp', schema: 'P→(Q→P)' },
  { id: 'ax-2', code: '*1.3', name: 'Frege', schema: '(P→(Q→R))→((P→Q)→(P→R))' },
  { id: 'ax-3', code: '*1.4', name: 'Transp', schema: '(¬P→¬Q)→(Q→P)' }
];

/* =========================================================================
 * 3. 证明树 / 推导行
 * ========================================================================= */

/*
 * 证明树（最终产物，叶子只允许公理与引理）：
 *   {type:'axiom', id, env:{原子名 -> AST}}
 *   {type:'lemma', id, env:{原子名 -> AST}}
 *   {type:'mp', major, minor}
 * 推导行（反向搜索 / 消去定理阶段使用，允许假设）：
 *   {formula, kind:'hyp'|'ax'|'mp', id?, env?, from:[i,j]}
 */

function walkAst(n, fn) {
  if (!n || typeof n !== 'object') return;
  fn(n);
  if (n.k === 'not' || n.k === 'all' || n.k === 'exists') walkAst(n.a, fn);
  else if (n.k === 'imp' || n.k === 'or' || n.k === 'and' || n.k === 'iff') { walkAst(n.a, fn); walkAst(n.b, fn); }
  else if (n.k === 'pred' && Array.isArray(n.args)) n.args.forEach(a => walkAst(a, fn));
}

function mapAst(n, fn) {
  const r = fn(n);
  if (r) return r;
  switch (n.k) {
    case 'not': return { k: 'not', a: mapAst(n.a, fn) };
    case 'imp': return { k: 'imp', a: mapAst(n.a, fn), b: mapAst(n.b, fn) };
    case 'or': return { k: 'or', a: mapAst(n.a, fn), b: mapAst(n.b, fn) };
    case 'and': return { k: 'and', a: mapAst(n.a, fn), b: mapAst(n.b, fn) };
    case 'iff': return { k: 'iff', a: mapAst(n.a, fn), b: mapAst(n.b, fn) };
    case 'all': return { k: 'all', v: n.v, a: mapAst(n.a, fn) };
    case 'exists': return { k: 'exists', v: n.v, a: mapAst(n.a, fn) };
    case 'pred': return { k: 'pred', name: n.name, args: n.args.map(a => mapAst(a, fn)) };
    default: return n;
  }
}

/* 在 AST 上把 meta 节点替换成绑定值；未绑定的 meta 交给 finalize 补默认原子。 */
function resolveAst(n, store) {
  if (n.k === 'meta') {
    let x = n;
    const seen = new Set();
    while (x.k === 'meta' && store[x.id] !== undefined && !seen.has(x.id)) { seen.add(x.id); x = store[x.id]; }
    if (x.k === 'meta') return x;
    return resolveAst(x, store);
  }
  if (n.k === 'not') return { k: 'not', a: resolveAst(n.a, store) };
  if (n.k === 'imp') return { k: 'imp', a: resolveAst(n.a, store), b: resolveAst(n.b, store) };
  if (n.k === 'atom') return { k: 'atom', name: n.name };
  return { k: n.k, a: resolveAst(n.a, store), b: resolveAst(n.b, store) };
}

const DEFAULT_ATOM_POOL = 'XYZWVUTSRQONMLKJIHGFEDCBA'.split('');

function finalizeAst(n, defaults) {
  if (n.k === 'meta') {
    if (!defaults[n.id]) defaults[n.id] = null;
    return null;
  }
  return n;
}

/* =========================================================================
 * 4. 引擎 A：目标制导反向搜索（合一 + 公理右脊柱 + 迭代加深 + 失败 memo）
 * ========================================================================= */

function makeSearcher(Logic, axioms, lemmas, opts) {
  let metaSeq = 0;
  const store = Object.create(null);
  let trail = [];
  const stats = { expanded: 0, unifyCalls: 0, total: 0 };

  function freshMeta(orig) { return { k: 'meta', id: 'm' + (metaSeq++), orig: orig || null }; }
  function deref(n) {
    let x = n;
    const seen = new Set();
    while (x.k === 'meta' && store[x.id] !== undefined && !seen.has(x.id)) { seen.add(x.id); x = store[x.id]; }
    return x;
  }
  function trailMark() { return trail.length; }
  function undoTo(mark) { while (trail.length > mark) { const id = trail.pop(); delete store[id]; } }
  function bind(id, val) { store[id] = val; trail.push(id); }
  function occurs(id, n) {
    n = deref(n);
    if (n.k === 'meta') return n.id === id;
    if (n.k === 'not') return occurs(id, n.a);
    if (n.k === 'imp') return occurs(id, n.a) || occurs(id, n.b);
    return false;
  }
  function unify(a, b) {
    stats.unifyCalls++;
    a = deref(a); b = deref(b);
    if (a.k === 'meta' && b.k === 'meta') {
      if (a.id === b.id) return true;
      bind(b.id, a); return true;
    }
    if (a.k === 'meta') { if (occurs(a.id, b)) return false; bind(a.id, b); return true; }
    if (b.k === 'meta') { if (occurs(b.id, a)) return false; bind(b.id, a); return true; }
    if (a.k !== b.k) return false;
    if (a.k === 'atom') return a.name === b.name;
    if (a.k === 'not') return unify(a.a, b.a);
    if (a.k === 'imp') return unify(a.a, b.a) && unify(a.b, b.b);
    return false;
  }
  function resolve(n) {
    n = deref(n);
    if (n.k === 'not') return { k: 'not', a: resolve(n.a) };
    if (n.k === 'imp') return { k: 'imp', a: resolve(n.a), b: resolve(n.b) };
    return n;
  }

  /* 把 schema（原子视为变量）改写成 meta 形式，得到 原原子名 -> meta 节点 的映射 */
  function schemaToMeta(schema) {
    return mapAst(schema, n => {
      if (n.k !== 'atom') return null;
      return freshMeta(n.name);
    });
  }
  function envOf(ast, schema, atomNames) {
    /* schemaToMeta 后 ast 中每个原子位置都是 meta；建立 原原子名 -> meta 节点 */
    const env = Object.create(null);
    const metas = [];
    walkAst(ast, n => { if (n.k === 'meta' && metas.indexOf(n) < 0) metas.push(n); });
    for (let i = 0; i < atomNames.length && i < metas.length; i++) env[atomNames[i]] = metas[i];
    /* 重新按名字关联：更稳妥的做法是再遍历一次 schema 与 ast 的同步结构 */
    return env;
  }
  /* 更稳妥：同步遍历 schema 与 meta 副本，记录 原子名 -> meta 节点 */
  function buildMeta(schema) {
    const byName = Object.create(null);
    function go(s) {
      if (s.k === 'atom') {
        if (!byName[s.name]) byName[s.name] = freshMeta(s.name);
        return byName[s.name];
      }
      if (s.k === 'not') return { k: 'not', a: go(s.a) };
      if (s.k === 'imp') return { k: 'imp', a: go(s.a), b: go(s.b) };
      if (s.k === 'or') return { k: 'or', a: go(s.a), b: go(s.b) };
      if (s.k === 'and') return { k: 'and', a: go(s.a), b: go(s.b) };
      if (s.k === 'iff') return { k: 'iff', a: go(s.a), b: go(s.b) };
      return Logic.clone ? Logic.clone(s) : s;
    }
    const ast = go(schema);
    return { ast, env: byName };
  }
  function cloneMetaTree(tree, idMap) {
    function go(n) {
      if (n.k === 'meta') {
        if (!idMap[n.id]) idMap[n.id] = freshMeta(n.orig);
        return idMap[n.id];
      }
      if (n.k === 'not') return { k: 'not', a: go(n.a) };
      if (n.k === 'imp') return { k: 'imp', a: go(n.a), b: go(n.b) };
      return n;
    }
    if (tree.type === 'mp') return { type: 'mp', major: cloneMetaTree(tree.major, idMap), minor: cloneMetaTree(tree.minor, idMap) };
    const env = Object.create(null);
    for (const k in tree.env) env[k] = go(tree.env[k]);
    return { type: tree.type, id: tree.id, env };
  }
  function substituteTree(tree, subMap) {
    function go(n) {
      if (n.k === 'meta' && subMap[n.id] !== undefined) return subMap[n.id];
      if (n.k === 'meta') return n;
      if (n.k === 'not') return { k: 'not', a: go(n.a) };
      if (n.k === 'imp') return { k: 'imp', a: go(n.a), b: go(n.b) };
      return n;
    }
    if (tree.type === 'mp') return { type: 'mp', major: substituteTree(tree.major, subMap), minor: substituteTree(tree.minor, subMap) };
    const env = Object.create(null);
    for (const k in tree.env) env[k] = go(tree.env[k]);
    return { type: tree.type, id: tree.id, env };
  }

  function spinePaths(schema) {
    const out = [];
    let node = schema;
    let cur = null;
    while (node.k === 'imp') {
      cur = cur ? cur.concat('b') : ['b'];
      out.push(cur.slice());
      node = node.b;
    }
    return out;
  }
  function atPath(ast, p) { let n = ast; for (const s of p) n = n[s]; return n; }

  /* 断言表：公理 + 引理（都是 scheme） */
  const assertions = [];
  axioms.forEach(a => assertions.push({ kind: 'axiom', id: a.id, schema: a.schema, spines: spinePaths(a.schema) }));
  lemmas.forEach(l => assertions.push({ kind: 'lemma', id: l.id, schema: l.schema, spines: [] }));
  /* 引理只做整式直接匹配；公理允许右脊柱 MP 分解 */

  const failMemo = new Map();

  function hasMeta(n) {
    let yes = false;
    walkAst(n, x => { if (x.k === 'meta') yes = true; });
    return yes;
  }
  function groundKey(n) { return Logic.key(n); }

  function prove(goal, depth) {
    stats.expanded++;
    stats.total++;
    if (opts.budget && stats.total > opts.budget) return undefined; /* 超预算 */
    if (depth <= 0) return null;
    const g = resolve(goal);
    const isGround = !hasMeta(g);
    if (isGround) {
      const k = groundKey(g);
      if (failMemo.has(k) && failMemo.get(k) >= depth) return null;
    }

    /* R1：整式匹配公理 / 引理 */
    for (const A of assertions) {
      const mark = trailMark();
      const built = buildMeta(A.schema);
      if (unify(built.ast, goal)) {
        return { type: A.kind === 'lemma' ? 'lemma' : 'axiom', id: A.id, env: built.env, _depth: depth };
      }
      undoTo(mark);
    }

    /* R2：用公理的右脊柱做 MP 分解（公理 S = A→B，用 B 的右脊柱节点与目标合一） */
    for (const A of assertions) {
      if (A.kind !== 'axiom' || !A.spines.length) continue;
      for (let k = 0; k < A.spines.length; k++) {
        const mark = trailMark();
        const built = buildMeta(A.schema);
        const spineNode = atPath(built.ast, A.spines[k]);
        if (unify(spineNode, goal)) {
          const subgoals = [];
          for (let i = 0; i < A.spines[k].length; i++) {
            const path = A.spines[k].slice(0, i).concat('a');
            subgoals.push(atPath(built.ast, path));
          }
          let tree = { type: 'axiom', id: A.id, env: built.env };
          let ok = true;
          for (const sg of subgoals) {
            const sub = prove(sg, depth - 1);
            if (sub === undefined) { ok = false; break; }
            if (!sub) { ok = false; break; }
            tree = { type: 'mp', major: tree, minor: sub };
          }
          if (ok) return tree;
        }
        undoTo(mark);
      }
    }

    if (isGround) {
      const k = groundKey(g);
      const prev = failMemo.get(k);
      if (prev === undefined || prev < depth) failMemo.set(k, depth);
    }
    return null;
  }

  function solve(goalAst) {
    stats.total = 0;
    for (let d = 1; d <= opts.depth; d++) {
      undoTo(0);
      stats.expanded = 0;
      failMemo.clear();
      const t0 = Date.now();
      const r = prove(goalAst, d);
      if (r === undefined) return { ok: false, reason: 'budget', expanded: stats.expanded };
      if (r) {
        const frozen = Object.create(null);
        for (const k in store) frozen[k] = store[k];
        return { ok: true, proof: r, store: frozen, depth: d, expanded: stats.expanded, ms: Date.now() - t0 };
      }
      if (Date.now() - t0 > 15000) return { ok: false, reason: 'timeout', expanded: stats.expanded };
    }
    return { ok: false, reason: 'depth', expanded: stats.expanded };
  }

  return { solve, stats, store, resolve, undoTo, getMetaSeq: () => metaSeq };
}

/* =========================================================================
 * 5. 引擎 B：消去定理（Deduction Theorem）策略
 *    - 目标 G = A1→(A2→…→An→B)：以 [A1..An] 为假设，搜索 B 的 Hilbert 推导
 *    - 再用 DT 把"带假设推导"翻译成只用 ax-1/ax-2 + MP 的纯 Hilbert 证明
 * ========================================================================= */

function makeDtSolver(Logic, axioms, lemmas, opts) {
  const ax1 = axioms.find(a => a.id === 'ax-1').schema;
  const ax2 = axioms.find(a => a.id === 'ax-2').schema;

  function ax1Inst(A, B) { return { type: 'axiom', id: 'ax-1', env: { P: A, Q: B } }; }
  function ax2Inst(A, B, C) { return { type: 'axiom', id: 'ax-2', env: { P: A, Q: B, R: C } }; }

  /* 目标分解：G = A1→(A2→…→An→B) */
  function decompose(goal) {
    const assumptions = [];
    let body = goal;
    while (body.k === 'imp') { assumptions.push(body.a); body = body.b; }
    return { assumptions, body };
  }

  /* 由已知公式出发做饱和：avail 里若有 X 与 X→Y，则加入 Y（记录 MP 来源） */
  function saturate(avail, seen) {
    let changed = true;
    while (changed) {
      changed = false;
      for (const f of avail) {
        if (f.formula.k !== 'imp') continue;
        const ante = avail.filter(x => Logic.eq(x.formula, f.formula.a));
        if (!ante.length) continue;
        const condu = avail.filter(x => Logic.eq(x.formula, f.formula.b));
        if (condu.length) continue;
        const rec = { formula: f.formula.b, kind: 'mp', from: [avail.indexOf(ante[0]), avail.indexOf(f)] };
        avail.push(rec);
        changed = true;
      }
    }
  }

  /* 从 avail 中挑一条与 target 定义等值的行 */
  function findLine(avail, target) {
    for (let i = 0; i < avail.length; i++) if (Logic.eq(avail[i].formula, target)) return i;
    return -1;
  }

  /* 尝试用公理整式证明 target；返回推导行或 null */
  function axiomLine(target) {
    for (const a of axioms) {
      if (Logic.eq(a.schema, target)) {
        const env = Object.create(null);
        for (const name of Logic.atomsOf(a.schema)) env[name] = parseAtom(name);
        return { formula: target, kind: 'ax', id: a.id, env };
      }
    }
    return null;
  }
  function parseAtom(name) { return { k: 'atom', name: name }; }

  /* 反向搜索：derivation lines（可含假设行），depth 限制 */
  function derive(target, avail, depth, budget) {
    budget.n++;
    if (budget.n > opts.budget) return undefined;
    if (depth <= 0) return null;
    const found = findLine(avail, target);
    if (found >= 0) return { formula: avail[found].formula, kind: 'ref', ref: found };
    const ax = axiomLine(target);
    if (ax) return ax;
    /* MP：avail 里后件与 target 等值的蕴涵式 */
    for (const f of avail) {
      if (f.formula.k !== 'imp') continue;
      if (!Logic.eq(f.formula.b, target)) continue;
      const sub = derive(f.formula.a, avail, depth - 1, budget);
      if (sub === undefined) return undefined;
      if (sub) return { formula: target, kind: 'mpFrom', ante: f.formula.a, sub };
    }
    return null;
  }

  /* 主流程 */
  function solve(goal) {
    const { assumptions, body } = decompose(goal);
    if (!assumptions.length) return null;
    /* 假设行 */
    const avail = assumptions.map(a => ({ formula: a, kind: 'hyp' }));
    saturate(avail);
    const t0 = Date.now();
    if (findLine(avail, body) < 0) return null;
    /* 把推导整理成线性行序列（按需展开 MP 来源） */
    const lines = [];
    const index = new Map(); /* formula key -> line index */
    let nline = 0;
    function emit(formula) {
      const k = Logic.key(formula);
      if (index.has(k)) return index.get(k);
      /* 找假设 */
      const hi = assumptions.findIndex(a => Logic.eq(a, formula));
      if (hi >= 0) { lines.push({ formula, kind: 'hyp' }); index.set(k, nline); return nline++; }
      const ax = axiomLine(formula);
      if (ax) { lines.push(ax); index.set(k, nline); return nline++; }
      /* 找到产生它的 MP（在 avail 饱和结果里找） */
      const src = avail.find(x => x.kind === 'mp' && Logic.eq(x.formula, formula));
      if (!src) throw new Error('内部错误：找不到推导来源 ' + Logic.fmt(formula));
      const ai = emit(avail[src.from[0]].formula);
      const mi = emit(avail[src.from[1]].formula);
      lines.push({ formula, kind: 'mp', from: [ai, mi] });
      index.set(k, nline++);
      return nline - 1;
    }
    const last = emit(body);
    /* DT 翻译 */
    const proof = dtTranslate(lines.slice(0, last + 1), assumptions);
    return { ok: true, proof, engine: 'dt', ms: Date.now() - t0, lines: lines.length };
  }

  /* id 证明（A→A，5 步） */
  function idProofLines(A) {
    const L1 = { k: 'imp', a: A, b: { k: 'imp', a: { k: 'imp', a: A, b: A }, b: A } }; /* A→((A→A)→A) */
    /* 直接构造行序列 */
    /* 1: ax-1  P:=A, Q:=(A→A)   => A→((A→A)→A) */
    /* 2: ax-2  P:=A, Q:=(A→A), R:=A => (A→((A→A)→A))→((A→(A→A))→(A→A)) */
    /* 3: MP(1,2) = (A→(A→A))→(A→A) */
    /* 4: ax-1  P:=A, Q:=A       => A→(A→A) */
    /* 5: MP(4,3) = A→A */
    return [
      { formula: { k: 'imp', a: A, b: { k: 'imp', a: { k: 'imp', a: A, b: A }, b: A } }, kind: 'ax', id: 'ax-1', env: { P: A, Q: { k: 'imp', a: A, b: A } } },
      { formula: { k: 'imp', a: { k: 'imp', a: A, b: { k: 'imp', a: { k: 'imp', a: A, b: A }, b: A } }, b: { k: 'imp', a: { k: 'imp', a: A, b: { k: 'imp', a: A, b: A } }, b: { k: 'imp', a: A, b: A } } }, kind: 'ax', id: 'ax-2', env: { P: A, Q: { k: 'imp', a: A, b: A }, R: A } },
      { formula: { k: 'imp', a: { k: 'imp', a: A, b: { k: 'imp', a: A, b: A } }, b: { k: 'imp', a: A, b: A } }, kind: 'mp', from: [0, 1] },
      { formula: { k: 'imp', a: A, b: { k: 'imp', a: A, b: A } }, kind: 'ax', id: 'ax-1', env: { P: A, Q: A } },
      { formula: { k: 'imp', a: A, b: A }, kind: 'mp', from: [3, 2] }
    ];
  }

  /*
   * DT 翻译：输入一个"从 assumptions 得到最后一行公式"的推导行序列，
   * 返回只含公理 + MP 的证明树（Hilbert 证明）。
   */
  function dtTranslate(lines, assumptions) {
    if (!assumptions.length) {
      /* 只能有 ax / mp 行 */
      const trees = [];
      const map = [];
      lines.forEach((ln, i) => {
        if (ln.kind === 'hyp') throw new Error('内部错误：无假设时仍有假设行');
        if (ln.kind === 'ax') { trees[i] = { type: 'axiom', id: ln.id, env: ln.env }; map[i] = i; return; }
        trees[i] = { type: 'mp', major: trees[ln.from[1]], minor: trees[ln.from[0]] };
      });
      return trees[trees.length - 1];
    }
    const A = assumptions[assumptions.length - 1];
    const outer = assumptions.slice(0, -1);
    const newLines = [];
    const mapOld = []; /* old line index -> new line index of "A→formula" */
    function push(line) { newLines.push(line); return newLines.length - 1; }
    lines.forEach((ln, i) => {
      if (ln.kind === 'hyp') {
        if (Logic.eq(ln.formula, A)) {
          /* A→A 的 id 证：5 行，末行 A→A */
          const idl = idProofLines(A);
          const start = newLines.length;
          idl.forEach(l => {
            const copy = { formula: l.formula, kind: l.kind, id: l.id, env: l.env };
            if (l.from) copy.from = l.from.map(x => x + start);
            push(copy);
          });
          mapOld[i] = newLines.length - 1;
          return;
        }
        /* 其余假设：行 X 可用（来自 outer），ax-1 得 X→(A→X) */
        const lineX = push({ formula: ln.formula, kind: 'hyp' });
        const lineImp = push({ formula: { k: 'imp', a: ln.formula, b: { k: 'imp', a: A, b: ln.formula } }, kind: 'ax', id: 'ax-1', env: { P: ln.formula, Q: A } });
        push({ formula: { k: 'imp', a: A, b: ln.formula }, kind: 'mp', from: [lineX, lineImp] });
        mapOld[i] = newLines.length - 1;
        return;
      }
      if (ln.kind === 'ax') {
        const lineAx = push({ formula: ln.formula, kind: 'ax', id: ln.id, env: ln.env });
        const lineImp = push({ formula: { k: 'imp', a: ln.formula, b: { k: 'imp', a: A, b: ln.formula } }, kind: 'ax', id: 'ax-1', env: { P: ln.formula, Q: A } });
        push({ formula: { k: 'imp', a: A, b: ln.formula }, kind: 'mp', from: [lineAx, lineImp] });
        mapOld[i] = newLines.length - 1;
        return;
      }
      /* MP: from[i1] = U, from[i2] = U→X */
      const i1 = ln.from[0], i2 = ln.from[1];
      const U = lines[i1].formula, X = ln.formula;
      const impLine = mapOld[i2]; /* 行：A→(U→X) */
      const anteLine = mapOld[i1]; /* 行：A→U */
      const inst = push({
        formula: { k: 'imp', a: { k: 'imp', a: A, b: { k: 'imp', a: U, b: X } }, b: { k: 'imp', a: { k: 'imp', a: A, b: U }, b: { k: 'imp', a: A, b: X } } },
        kind: 'ax', id: 'ax-2', env: { P: A, Q: U, R: X }
      });
      push({ formula: { k: 'imp', a: { k: 'imp', a: A, b: U }, b: { k: 'imp', a: A, b: X } }, kind: 'mp', from: [impLine, inst] });
      push({ formula: { k: 'imp', a: A, b: X }, kind: 'mp', from: [anteLine, newLines.length - 1] });
      mapOld[i] = newLines.length - 1;
    });
    return dtTranslate(newLines, outer);
  }

  return { solve };
}

/* =========================================================================
 * 6. 证明物化 / 校验 / 步骤表
 * ========================================================================= */

function materializeProof(tree, resolveFn, Logic) {
  function go(t) {
    if (t.type === 'mp') return { type: 'mp', major: go(t.major), minor: go(t.minor) };
    const env = Object.create(null);
    for (const k in t.env) env[k] = resolveFn(t.env[k]);
    return { type: t.type, id: t.id, env };
  }
  return go(tree);
}

/* 结构去重：等价的子树共享同一节点（DT 翻译会大量重复同一条公理实例） */
function dedupeProof(tree, Logic) {
  const memo = new Map();
  function go(t) {
    if (t.type === 'mp') {
      const a = go(t.major);
      const b = go(t.minor);
      const key = 'M(' + a.key + ',' + b.key + ')';
      if (memo.has(key)) return memo.get(key);
      const node = { type: 'mp', major: a.node, minor: b.node };
      const out = { node, key };
      memo.set(key, out);
      return out;
    }
    const envKeys = Object.keys(t.env).sort();
    const key = t.type + ':' + t.id + '(' + envKeys.map(k => k + '=' + Logic.key(t.env[k])).join('&') + ')';
    if (memo.has(key)) return memo.get(key);
    const node = { type: t.type, id: t.id, env: t.env };
    const out = { node, key };
    memo.set(key, out);
    return out;
  }
  return go(tree).node;
}

/* 校验证明树：所有叶子都是公理/引理实例，所有 MP 合法，结论与目标定义等值 */
function verifyProofTree(tree, goalAst, Logic, axiomById, lemmaById) {
  const steps = [];
  const errors = [];
  const memo = new Map();
  function build(t) {
    if (memo.has(t)) return memo.get(t);
    if (t.type === 'mp') {
      const major = build(t.major);
      const minor = build(t.minor);
      const d = Logic.detach(major.ast, minor.ast);
      if (!d.ok) { errors.push('detach 失败：' + d.reason); }
      const ast = d.ok ? d.out : major.ast;
      steps.push({ n: steps.length + 1, kind: 'mp', conclusion: Logic.fmt(ast), from: [major.n, minor.n] });
      const rec = { ast, n: steps.length };
      memo.set(t, rec);
      return rec;
    }
    const idx = steps.length;
    steps.push({ n: 0, kind: t.type, id: t.id, subst: {}, conclusion: '' });
    let ast;
    try {
      if (t.type === 'axiom') {
        const a = axiomById[t.id];
        if (!a) throw new Error('未知公理 ' + t.id);
        ast = Logic.instantiate(a.schema, t.env);
      } else {
        const l = lemmaById[t.id];
        if (!l) throw new Error('未知引理 ' + t.id);
        ast = Logic.instantiate(l.schema, t.env);
      }
    } catch (e) {
      errors.push((t.type === 'axiom' ? '公理 ' : '引理 ') + t.id + ' 实例化失败：' + e.message);
      ast = Logic.parse('P');
    }
    const subst = {};
    Object.keys(t.env).forEach(k => { subst[k] = Logic.fmt(t.env[k]); });
    steps[idx] = { n: idx + 1, kind: t.type, id: t.id, subst, conclusion: Logic.fmt(ast) };
    const rec = { ast, n: idx + 1 };
    memo.set(t, rec);
    return rec;
  }
  const root = build(tree);
  if (!Logic.eq(root.ast, goalAst)) errors.push('结论与目标不定义等值：' + Logic.fmt(root.ast) + ' vs ' + Logic.fmt(goalAst));
  return { steps, errors, conclusion: Logic.fmt(root.ast), valid: errors.length === 0 };
}

/* =========================================================================
 * 7. circuit 生成（游戏 {nodes,edges,target}）
 * ========================================================================= */

function buildCircuit(tree, goalText, Logic, axiomById, lemmaById) {
  const nodes = [];
  const edges = [];
  const counters = {};
  const formulaNode = new Map(); /* Logic.key(f) -> node id */
  const atomNode = new Map();    /* 原子名 -> node id */
  const level = new Map();       /* node id -> 列 */
  const nodeIndex = {};
  function newId(prefix) {
    counters[prefix] = (counters[prefix] || 0) + 1;
    return prefix + counters[prefix];
  }
  function addNode(id, kind, config, lv) {
    const n = { id, kind, x: 0, y: 0, config: config || {} };
    nodes.push(n); nodeIndex[id] = n; level.set(id, lv);
    return id;
  }
  function ensureAtom(name) {
    if (atomNode.has(name)) return atomNode.get(name);
    /* 引擎的 atom 模块只接受单个字母 */
    const nm = /^[A-Z]$/.test(name) ? name : (/^[a-z]$/.test(name) ? name.toUpperCase() : 'P');
    const id = newId('at');
    addNode(id, 'atom', { name: nm }, 0);
    atomNode.set(name, id);
    return id;
  }
  function ensureFormula(ast) {
    const key = Logic.key(ast);
    if (formulaNode.has(key)) return formulaNode.get(key);
    let id, lv = 0;
    if (ast.k === 'atom') {
      id = ensureAtom(ast.name);
    } else if (ast.k === 'not') {
      const a = ensureFormula(ast.a);
      id = newId('nt');
      addNode(id, 'not', {}, level.get(a) + 1);
      edges.push({ from: { node: a, port: 'out' }, to: { node: id, port: 'a' } });
    } else if (ast.k === 'imp' || ast.k === 'or' || ast.k === 'and' || ast.k === 'iff') {
      const a = ensureFormula(ast.a);
      const b = ensureFormula(ast.b);
      const kinds = { imp: 'im', or: 'or', and: 'an', iff: 'if' };
      id = newId(kinds[ast.k]);
      addNode(id, ast.k, {}, Math.max(level.get(a), level.get(b)) + 1);
      edges.push({ from: { node: a, port: 'out' }, to: { node: id, port: 'a' } });
      edges.push({ from: { node: b, port: 'out' }, to: { node: id, port: 'b' } });
    } else {
      throw new Error('电路暂不支持构造子：' + ast.k);
    }
    formulaNode.set(key, id);
    return id;
  }
  function permutations(list) {
    if (list.length <= 1) return [list.slice()];
    const out = [];
    list.forEach((x, i) => {
      const rest = list.slice(0, i).concat(list.slice(i + 1));
      permutations(rest).forEach(p => out.push([x].concat(p)));
    });
    return out;
  }
  /* 游戏的 subst 是"一次替换一个原子"的串联语义；而证明里的替换是同时替换。
     对每个叶子找一个原子代入顺序，使串联结果与同时替换一致（否则该叶子无法在电路上实现）。 */
  function chooseOrder(schema, env, names) {
    const target = Logic.instantiate(schema, env);
    for (const perm of permutations(names)) {
      let cur = schema;
      for (const n of perm) cur = Logic.substitute(cur, n, env[n]);
      if (Logic.eq(cur, target)) return perm;
    }
    return null;
  }
  const nonSerializable = [];
  function emitLeaf(t) {
    const def = t.type === 'axiom' ? axiomById[t.id] : lemmaById[t.id];
    const schema = def.schema;
    const atomNames = Logic.atomsOf(schema).filter(n => n in t.env);
    const id = newId(t.type === 'axiom' ? 'ax' : 'th');
    if (t.type === 'axiom') addNode(id, 'axiom', { axiomId: t.id }, 0);
    else addNode(id, 'theorem', { theoremCode: t.id }, 0);
    const chosen = chooseOrder(schema, t.env, atomNames);
    if (!chosen && atomNames.length > 1) nonSerializable.push(t.id);
    const order = chosen || atomNames;
    let cur = id;
    for (const name of order) {
      const repl = t.env[name];
      const atomId = ensureAtom(name);
      const fId = ensureFormula(repl);
      const sid = newId('su');
      addNode(sid, 'subst', {}, Math.max(level.get(cur), level.get(atomId), level.get(fId)) + 1);
      edges.push({ from: { node: cur, port: 'out' }, to: { node: sid, port: 'assertion' } });
      edges.push({ from: { node: atomId, port: 'out' }, to: { node: sid, port: 'atom' } });
      edges.push({ from: { node: fId, port: 'out' }, to: { node: sid, port: 'formula' } });
      cur = sid;
    }
    return cur;
  }
  const memoEmit = new Map(); /* 证明节点 -> 已生成的电路节点 id（共享子树） */
  function emit(t) {
    if (memoEmit.has(t)) return memoEmit.get(t);
    let id;
    if (t.type === 'mp') {
      const a = emit(t.major);
      const b = emit(t.minor);
      id = newId('mp');
      addNode(id, 'detach', {}, Math.max(level.get(a), level.get(b)) + 1);
      edges.push({ from: { node: a, port: 'out' }, to: { node: id, port: 'a' } });
      edges.push({ from: { node: b, port: 'out' }, to: { node: id, port: 'b' } });
    } else {
      id = emitLeaf(t);
    }
    memoEmit.set(t, id);
    return id;
  }
  const outId = emit(tree);
  edges.push({ from: { node: outId, port: 'out' }, to: { node: 'target', port: 'proof' } });

  /* 布局：按列（拓扑层）从上往下排 */
  const byLevel = new Map();
  nodes.forEach(n => {
    const lv = level.get(n.id);
    if (!byLevel.has(lv)) byLevel.set(lv, []);
    byLevel.get(lv).push(n);
  });
  Array.from(byLevel.keys()).sort((a, b) => a - b).forEach(lv => {
    byLevel.get(lv).forEach((n, i) => {
      n.x = 60 + lv * 260;
      n.y = 60 + i * 140;
    });
  });

  const maxLevel = Math.max(0, ...nodes.map(n => level.get(n.id)));
  return {
    nodes,
    edges,
    target: { id: 'target', kind: 'target', x: 60 + (maxLevel + 1) * 260, y: 60, target: goalText, config: {} },
    stats: { nodes: nodes.length, edges: edges.length, columns: maxLevel + 1, nonSerializableLeaves: nonSerializable.length }
  };
}

/* =========================================================================
 * 8. --verify：用 src/engine.js 真实评估
 * ========================================================================= */

function verifyCircuit(circuit, goalText, lemmaDefs) {
  const RSL = loadLogic(true);
  const Logic = RSL.Logic;
  /* 关键：engine 的 axiom 节点会对 schema 调用 Logic.parse，因此必须注入字符串 */
  RSL.AXIOMS = AXIOM_DEFS.map(a => ({
    id: a.id,
    code: a.code,
    name: a.name,
    schema: a.schema
  }));
  const lemmaMap = Object.create(null);
  lemmaDefs.forEach(l => { lemmaMap[l.id] = { code: l.id, name: l.id, formula: l.text }; });
  RSL.theoremData = function (code) { return lemmaMap[code] || null; };

  const targetNode = Object.assign({}, circuit.target, { config: {} });
  targetNode.target = goalText;
  const nodes = circuit.nodes.map(n => JSON.parse(JSON.stringify(n))).concat([targetNode]);
  const edges = circuit.edges.map(e => JSON.parse(JSON.stringify(e)));
  const r = RSL.Engine.evaluate(null, nodes, edges);
  return {
    complete: !!r.complete,
    errors: r.errors.map(e => e.nodeId + ': ' + e.message),
    targetState: r.target && r.target.state,
    validCount: r.validCount,
    total: r.total
  };
}

/* =========================================================================
 * 9. 主流程
 * ========================================================================= */

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help || !opts.goal) {
    console.log('用法: node scripts/prove.js "<目标公式>" [--json] [--circuit] [--verify] [--lemma id:公式] [--depth n] [--budget n]');
    process.exit(opts.help ? 0 : 2);
  }

  const RSL = loadLogic(false);
  const Logic = RSL.Logic;

  let goalAst;
  try { goalAst = Logic.parse(opts.goal); } catch (e) {
    console.error('目标解析失败：' + e.message);
    process.exit(2);
  }

  /* 只支持 ¬ / → / 原子（其余连接词请先用定义展开） */
  let badKind = null;
  walkAst(goalAst, n => {
    if (['or', 'and', 'iff', 'all', 'exists'].indexOf(n.k) >= 0) badKind = n.k;
  });
  if (badKind) {
    console.error('目标包含暂不支持的连接词 "' + badKind + '"；请先用定义展开（∨/∧/↔ 由 df-or/df-an/dfbi2 展开）。');
    process.exit(2);
  }

  const axioms = AXIOM_DEFS.map(a => ({ id: a.id, code: a.code, name: a.name, schema: Logic.parse(a.schema) }));
  const axiomById = Object.create(null);
  axioms.forEach(a => { axiomById[a.id] = a; });

  const lemmas = opts.lemmas.map((spec, i) => {
    const m = /^([A-Za-z][\w.-]*)\s*[:=]\s*(.+)$/.exec(spec || '');
    let id, text;
    if (m) { id = m[1]; text = m[2]; } else { id = 'L' + (i + 1); text = spec; }
    let schema;
    try { schema = Logic.parse(text); } catch (e) { throw new Error('引理解析失败 ' + spec + '：' + e.message); }
    return { id, text, schema, atoms: Logic.atomsOf(schema) };
  });
  const lemmaById = Object.create(null);
  lemmas.forEach(l => { lemmaById[l.id] = l; });

  const t0 = Date.now();
  let proof = null;
  let engineUsed = null;
  let metaStore = Object.create(null);
  let notes = [];

  const engines = [];
  if (opts.engine === 'auto') engines.push('backward', 'dt');
  else engines.push(opts.engine);

  for (const eng of engines) {
    if (eng === 'backward') {
      const searcher = makeSearcher(Logic, axioms, lemmas, opts);
      const r = searcher.solve(goalAst);
      if (r.ok) { proof = r.proof; engineUsed = 'backward'; metaStore = r.store; notes.push('反向搜索：depth ' + r.depth + '，展开 ' + r.expanded + ' 次'); break; }
      notes.push('反向搜索失败（' + r.reason + '，展开 ' + (r.expanded || 0) + ' 次）');
    } else if (eng === 'dt') {
      const dt = makeDtSolver(Logic, axioms, lemmas, opts);
      const r = dt.solve(goalAst);
      if (r && r.ok) { proof = r.proof; engineUsed = 'dt'; notes.push('消去定理策略成功（' + r.lines + ' 行推导）'); break; }
      if (r === null) notes.push('消去定理策略：无法从假设推导出目标主体');
    }
  }

  if (!proof) {
    console.log(JSON.stringify({ ok: false, goal: Logic.fmt(goalAst), notes, ms: Date.now() - t0 }, null, 2));
    process.exit(1);
  }

  /* 物化：把搜索用的 meta 变量替换成具体公式（未绑定的补默认原子） */
  const defaults = Object.create(null);
  let defIdx = 0;
  function pickDefault() {
    while (defIdx < DEFAULT_ATOM_POOL.length) {
      const c = DEFAULT_ATOM_POOL[defIdx++];
      if (!Logic.atomsOf(goalAst).includes(c)) return c;
    }
    return 'P';
  }
  function resolveDeep(n) {
    n = (n.k === 'meta') ? resolveAst(n, metaStore) : n;
    if (n.k === 'meta') {
      if (!defaults[n.id]) defaults[n.id] = { k: 'atom', name: pickDefault() };
      return defaults[n.id];
    }
    if (n.k === 'not') return { k: 'not', a: resolveDeep(n.a) };
    if (n.k === 'imp') return { k: 'imp', a: resolveDeep(n.a), b: resolveDeep(n.b) };
    if (n.k === 'atom') return { k: 'atom', name: n.name };
    return n;
  }
  const grounded = dedupeProof(materializeProof(proof, resolveDeep, Logic), Logic);

  const ver = verifyProofTree(grounded, goalAst, Logic, axiomById, lemmaById);
  const result = {
    ok: ver.valid,
    goal: Logic.fmt(goalAst),
    engine: engineUsed,
    steps: ver.steps,
    conclusion: ver.conclusion,
    ms: Date.now() - t0,
    notes
  };
  if (!ver.valid) result.errors = ver.errors;

  if (opts.json) {
    console.log(JSON.stringify(result, null, 2));
    if (opts.circuit) {
      const circ = buildCircuit(grounded, opts.goal, Logic, axiomById, lemmaById);
      const outObj = { circuit: circ };
      if (opts.verify) outObj.verify = verifyCircuit(circ, opts.goal, lemmas);
      if (opts.out) fs.writeFileSync(path.resolve(opts.out), JSON.stringify({ steps: result.steps, circuit: circ }, null, 2));
      console.log(JSON.stringify(outObj, null, 2));
    }
    return;
  }

  /* ---- 文本输出 ---- */
  console.log('目标：' + result.goal);
  console.log('引擎：' + engineUsed + '   用时：' + result.ms + 'ms   步骤数：' + result.steps.length);
  if (notes.length) console.log('过程：' + notes.join('；'));
  console.log('');
  result.steps.forEach(s => {
    if (s.kind === 'mp') {
      console.log(String(s.n).padStart(3) + '.  MP       由 ' + s.from.join(' + ') + '   ⇒ ' + s.conclusion);
    } else {
      const subst = Object.keys(s.subst).map(k => k + ':=' + s.subst[k]).join('，');
      console.log(String(s.n).padStart(3) + '.  ' + (s.kind === 'axiom' ? '公理 ' : '引理 ') + s.id +
        (subst ? '  [' + subst + ']' : '') + '   ⇒ ' + s.conclusion);
    }
  });
  console.log('');
  console.log('结论：' + result.conclusion + (ver.valid ? '    ✓ 校验通过' : '    ✗ ' + ver.errors.join('；')));

  if (opts.circuit) {
    const circ = buildCircuit(grounded, opts.goal, Logic, axiomById, lemmaById);
    const out = { goal: opts.goal, circuit: circ };
    if (opts.verify) out.verify = verifyCircuit(circ, opts.goal, lemmas);
    const text = JSON.stringify(out, null, 2);
    if (opts.out) fs.writeFileSync(path.resolve(opts.out), text);
    console.log('');
    console.log('---- circuit ----');
    console.log(text);
    if (out.verify) {
      console.log('');
      console.log('verify: complete=' + out.verify.complete + '  target=' + out.verify.targetState +
        '  valid=' + out.verify.validCount + '/' + out.verify.total +
        (out.verify.errors.length ? '  errors=' + out.verify.errors.join(' | ') : ''));
    }
  }
}

main();
