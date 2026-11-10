#!/usr/bin/env node
'use strict';
/* 一次性重构：把原 96 关拆成“每章 10 个≤20 块的引理普通关 + 24 个困难关”。
 * 普通关取自原参考电路的完整依赖锥，困难关保留原证明并重新编号。
 * 定理编号改为章节罗马数字 + 两位序号（Ⅰ-01）。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
require(path.join(ROOT, 'src', 'term.js'));
require(path.join(ROOT, 'src', 'modules.js'));
require(path.join(ROOT, 'src', 'engine.js'));
const LEGACY = path.join(ROOT, 'campaign', 'legacy-levels.json');
const LEVELS = fs.existsSync(LEGACY) ? JSON.parse(fs.readFileSync(LEGACY, 'utf8')) : require(path.join(ROOT, 'src', 'levels.js'));
const Term = globalThis.RSL.Term;
const Engine = globalThis.RSL.Engine;

const chapters = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'];
const PAD = (n) => String(n).padStart(2, '0');

function clone(x) { return JSON.parse(JSON.stringify(x)); }
function key(tokens) { return tokens.join('\u0000'); }

function evalLevel(level, nodes, edges) {
  return Engine.evaluate(level, nodes, edges, { levels: LEVELS, levelNo: level.no || 99 });
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
      if (node.kind === 'theorem' || node.kind === 'target') { bad = true; break; }
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
  const picked = [], formulas = new Set();
  for (const c of out) {
    const k = key(c.tokens);
    if (formulas.has(k)) continue;
    formulas.add(k);
    picked.push(c);
    if (picked.length === 10) break;
  }
  return picked;
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
  const target = { id: 'nt', kind: 'target', config: {}, x: 0, y: 40, targetTokens: targetTokens };
  const output = nodeMap.get(cand.id);
  edges.push({ id: 'e' + (++eid), from: { node: output, port: 'out' }, to: { node: 'nt', port: 'proof' } });
  const maxX = Math.max.apply(null, nodes.map((n) => n.x).concat([0]));
  target.x = maxX + 268;
  const allNodes = nodes.concat([target]);
  const text = Term.fmt(targetTokens.slice(1));
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
    initialNodes: [target],
    solution: { nodes: nodes, edges: edges },
    difficulty: nodes.length + 0.1 * (targetTokens.length / 4),
    mustUse: Array.from(cand.rules).filter((k) => k !== 'axiom' && k !== 'subst'),
    stats: { steps: nodes.length }
  };
}

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

function main() {
  const tutorials = LEVELS.filter((l) => l.tutorial);
  const mains = LEVELS.filter((l) => !l.tutorial);
  const byChapter = {};
  chapters.forEach((g) => { byChapter[g] = mains.filter((l) => l.chapterGroup === g); });

  const normalCounts = {};
  const chapterNormals = {};
  chapters.forEach((g) => {
    const hardTargets = new Set(byChapter[g].map((l) => key(l.targetTokens)));
    const all = [];
    byChapter[g].forEach((l) => {
      normalCandidates(l, hardTargets).forEach((c) => all.push({ level: l, cand: c }));
    });
    all.sort((a, b) => a.cand.size - b.cand.size || a.level.no - b.level.no);
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
    const targets = [8, 9, 10, 11, 12, 14, 16, 18, 19, 20];
    tiers.forEach((test) => {
      if (picked.length === 10) return;
      const pool = all.filter((x) => test(x) && !seen.has(key(x.cand.tokens)));
      targets.forEach((target) => {
        if (picked.length === 10) return;
        let best = null;
        pool.forEach((x) => {
          const k = key(x.cand.tokens);
          if (seen.has(k)) return;
          const score = Math.abs(x.cand.size - target) * 100 + x.cand.tokens.length;
          if (!best || score < best.score) best = { x: x, score: score };
        });
        if (!best) return;
        seen.add(key(best.x.cand.tokens));
        picked.push(best.x);
      });
    });
    picked.sort((a, b) => a.cand.size - b.cand.size || a.level.no - b.level.no);
    chapterNormals[g] = picked;
    normalCounts[g] = picked.length;
  });

  /* 先建立全关卡的旧号 → 新代码映射。 */
  const codeMap = new Map();
  chapters.forEach((g) => {
    byChapter[g].forEach((l, i) => {
      codeMap.set(l.no, g + '-' + PAD(normalCounts[g] + i + 1));
    });
  });

  const out = [];
  chapters.forEach((g) => {
    tutorials.filter((l) => l.chapterGroup === g).forEach((l) => out.push(l));
    const normals = chapterNormals[g];
    const normalByTarget = new Map();
    normals.forEach((x, i) => {
      const code = g + '-' + PAD(i + 1);
      const lv = makeNormal(x.level, x.cand, code, i + 1, g);
      normalByTarget.set(key(lv.targetTokens), code);
      out.push(lv);
    });
    byChapter[g].forEach((l, i) => {
      const no = normalCounts[g] + i + 1;
      const code = g + '-' + PAD(no);
      out.push(makeHard(l, code, no, g, codeMap, normalByTarget));
    });
  });

  const output = '/*! 自动重构的关卡数据：每章 10 个普通引理关 + 24 个困难关。 */\n' +
    '(function (host) {\n  \'use strict\';\n  host.RSL = host.RSL || {};\n' +
    '  host.RSL.LEVELS = ' + JSON.stringify(out) + ';\n' +
    '  if (typeof module !== \'undefined\' && module.exports) module.exports = host.RSL.LEVELS;\n' +
    '})(typeof window !== \'undefined\' ? window : globalThis);\n';
  fs.writeFileSync(path.join(ROOT, 'src', 'levels.js'), output, 'utf8');
  fs.writeFileSync(path.join(ROOT, 'src', 'campaign-meta.js'),
    '(function (host) {\n  \'use strict\';\n  host.RSL = host.RSL || {};\n' +
    '  host.RSL.CAMPAIGN = ' + JSON.stringify([
      { key: 'prop', id: 'Ⅰ', title: '命题演算' },
      { key: 'pred', id: 'Ⅱ', title: '谓词与量词' },
      { key: 'eq', id: 'Ⅲ', title: '等词' },
      { key: 'classic', id: 'Ⅳ', title: '经典定理' }
    ]) + ';\n' +
    '  host.RSL.CAMPAIGN_META = ' + JSON.stringify({ total: out.length }) + ';\n' +
    '})(typeof window !== \'undefined\' ? window : globalThis);\n', 'utf8');
  const counts = chapters.map((g) => g + ':' + normalCounts[g] + '+24');
  console.log('levels:', out.length, '· normals:', counts.join(' '));
}

main();
