#!/usr/bin/env node
'use strict';
/* 迁移 legacy 派生公理节点 → theorem{code:引理关} → subst{atom:=公式} → 原下游。
 *
 * 契约：docs/LOGIC-REDESIGN.md §4。六种派生公理模块（and/or/iff 的引入/消去）
 * 已被删除，内容层改为引用第Ⅰ章引理关 Ⅰ-11…Ⅰ-19（原始语言证明 + def-contract 得到）。
 * 本脚本就地改写 campaign/legacy-levels.json：
 *
 *   原：  ... → [and-intro-ax a←A b←B] → 下游
 *   新：  theorem{code:'Ⅰ-13'} ─┐
 *         atom{P} ─ atom1       │
 *         A(公式) ─ formula1    ├→ subst{groups:1} → 下游
 *         atom{Q} ─ atom2       │
 *         B(公式) ─ formula2 ───┘
 *
 * 幂等：第二次运行时文件里已没有派生 kind，直接退出、不写文件。
 * 用法：node scripts/migrate-derived-modules.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'campaign', 'legacy-levels.json');

/* 派生 kind → 引理关 code。side/dir 缺省按契约取左侧/默认方向。 */
const DERIVED = {
  'and-intro-ax': () => 'Ⅰ-13',
  'and-elim-ax': (cfg) => (cfg && cfg.side === 'r' ? 'Ⅰ-15' : 'Ⅰ-14'),
  'or-intro-ax': (cfg) => (cfg && cfg.side === 'r' ? 'Ⅰ-12' : 'Ⅰ-11'),
  'or-elim-ax': () => 'Ⅰ-16',
  'iff-intro-ax': () => 'Ⅰ-17',
  'iff-elim-ax': (cfg) => (cfg && cfg.dir === 'rl' ? 'Ⅰ-19' : 'Ⅰ-18')
};
const ATOM_NAMES = ['P', 'Q', 'R'];
const DERIVED_KINDS = Object.keys(DERIVED);

function clone(x) { return JSON.parse(JSON.stringify(x)); }

/* 与 scripts/restructure-levels.js 的 paletteOf 完全同规则：
 * 跳过 target、subst 的 config 归一成 {}、按 kind+config 去重。 */
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

function migrateLevel(level) {
  const nodes = level.solution.nodes;
  const edges = level.solution.edges || [];
  const derived = nodes.filter((n) => DERIVED_KINDS.indexOf(n.kind) >= 0);
  if (!derived.length) return null;

  const usedNodeIds = new Set();
  nodes.forEach((n) => usedNodeIds.add(n.id));
  (level.initialNodes || []).forEach((n) => usedNodeIds.add(n.id));
  const usedEdgeIds = new Set(edges.map((e) => e.id));
  let nodeSeq = 0, edgeSeq = 0;
  function newNodeId() {
    let id;
    do { id = 'm' + (++nodeSeq); } while (usedNodeIds.has(id));
    usedNodeIds.add(id);
    return id;
  }
  function newEdgeId() {
    let id;
    do { id = 'g' + (++edgeSeq); } while (usedEdgeIds.has(id));
    usedEdgeIds.add(id);
    return id;
  }

  /* 已有 atom 节点可复用（按名字取第一个）。 */
  const atomByName = new Map();
  nodes.forEach((n) => {
    if (n.kind === 'atom' && n.config && n.config.name && !atomByName.has(n.config.name)) {
      atomByName.set(n.config.name, n);
    }
  });

  const byId = new Map(nodes.map((n) => [n.id, n]));
  const removedEdgeIds = new Set();
  const newEdges = [];
  const outgoingPatch = new Map(); /* 旧节点 id → 新 subst id */
  const replacements = new Map();  /* 旧节点 id → 替换后的节点数组 */
  const createdAtoms = [];         /* 本关新建的 atom 节点（按创建顺序） */
  let rewrites = 0;

  derived.forEach((d) => {
    const cfg = d.config || {};
    const code = DERIVED[d.kind](cfg);
    if (!code) throw new Error('无法映射派生模块 ' + d.kind + ' 到引理关');
    if (d.kind === 'and-elim-ax' && cfg.side && cfg.side !== 'l' && cfg.side !== 'r') {
      throw new Error('and-elim-ax 的 side 只能是 l/r：' + JSON.stringify(cfg));
    }

    /* 原节点的输入端口 a/b/c 的上游节点输出就是代换公式 A/B/C。 */
    const ports = ['a', 'b', 'c'];
    const formulaSrc = new Map();
    edges.forEach((e) => {
      if (!e.to || e.to.node !== d.id) return;
      if (ports.indexOf(e.to.port) < 0) throw new Error(d.id + ' 出现未知输入端口 ' + e.to.port);
      if (formulaSrc.has(e.to.port)) throw new Error(d.id + ' 的端口 ' + e.to.port + ' 接了多条边');
      if (!byId.has(e.from.node)) throw new Error(d.id + ' 的上游节点不存在：' + e.from.node);
      formulaSrc.set(e.to.port, e.from.node);
    });
    const groups = ports.filter((p) => formulaSrc.has(p));
    if (groups.length < 2) {
      throw new Error('派生节点 ' + d.id + '（' + level.code + '）缺少公式输入：' + groups.join(','));
    }
    for (let i = 0; i < groups.length; i += 1) {
      if (groups[i] !== ports[i]) throw new Error('派生节点 ' + d.id + ' 的输入端口不连续：' + groups.join(','));
    }

    const theorem = { id: newNodeId(), kind: 'theorem', config: { code }, x: d.x, y: d.y };
    const subst = { id: newNodeId(), kind: 'subst', config: { groups: groups.length - 1 }, x: d.x + 268, y: d.y };
    const localAtoms = [];

    formulaSrc.forEach((srcId, port) => {
      const i = ports.indexOf(port);
      const atomName = ATOM_NAMES[i];
      let atom = atomByName.get(atomName);
      if (!atom) {
        atom = { id: newNodeId(), kind: 'atom', config: { name: atomName }, x: d.x, y: d.y + 140 * (i + 1) };
        atomByName.set(atomName, atom);
        createdAtoms.push(atom);
        localAtoms.push(atom);
      }
      newEdges.push({ id: newEdgeId(), from: { node: atom.id, port: 'out' }, to: { node: subst.id, port: 'atom' + (i + 1) } });
      newEdges.push({ id: newEdgeId(), from: { node: srcId, port: 'out' }, to: { node: subst.id, port: 'formula' + (i + 1) } });
    });
    newEdges.push({ id: newEdgeId(), from: { node: theorem.id, port: 'out' }, to: { node: subst.id, port: 'assertion' } });

    /* 原节点的入边全部撤销；出边改接到新 subst 的 out。 */
    edges.forEach((e) => {
      if (e.to && e.to.node === d.id) removedEdgeIds.add(e.id);
    });
    outgoingPatch.set(d.id, subst.id);
    replacements.set(d.id, localAtoms.concat([theorem, subst]));
    rewrites += 1;
  });

  const keptEdges = edges
    .filter((e) => !removedEdgeIds.has(e.id))
    .map((e) => {
      if (e.from && outgoingPatch.has(e.from.node)) {
        const copy = clone(e);
        copy.from.node = outgoingPatch.get(e.from.node);
        return copy;
      }
      return e;
    });

  const outNodes = [];
  nodes.forEach((n) => {
    if (replacements.has(n.id)) replacements.get(n.id).forEach((nn) => outNodes.push(nn));
    else outNodes.push(n);
  });

  level.solution.nodes = outNodes;
  level.solution.edges = keptEdges.concat(newEdges);
  level.palette = paletteOf(outNodes.concat(level.initialNodes || []));
  if (level.stats && typeof level.stats.steps === 'number') level.stats.steps = outNodes.length;

  return { rewrites, atoms: createdAtoms.length };
}

function main() {
  if (!fs.existsSync(FILE)) {
    console.error('找不到 ' + FILE + '：无法迁移派生公理节点');
    process.exit(2);
  }
  const levels = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const byKind = {};
  let totalRewrites = 0, totalAtoms = 0;
  const touched = [];

  levels.forEach((level) => {
    /* 先登记本关所有派生 kind（统计用），再改写。 */
    (level.solution.nodes || []).forEach((n) => {
      if (DERIVED_KINDS.indexOf(n.kind) >= 0) byKind[n.kind] = (byKind[n.kind] || 0) + 1;
    });
    const r = migrateLevel(level);
    if (!r) return;
    totalRewrites += r.rewrites;
    totalAtoms += r.atoms;
    touched.push(level.code);
  });

  if (!totalRewrites) {
    console.log('派生公理节点：0 个（已迁移过，未改动 ' + path.relative(ROOT, FILE) + '）');
    return;
  }

  /* 迁移后不允许任何派生 kind 残留。 */
  const leftover = [];
  levels.forEach((l) => {
    (l.solution.nodes || []).forEach((n) => { if (DERIVED_KINDS.indexOf(n.kind) >= 0) leftover.push(l.code + ':' + n.id); });
    (l.palette || []).forEach((p) => { if (DERIVED_KINDS.indexOf(p.kind) >= 0) leftover.push(l.code + ':palette:' + p.kind); });
  });
  if (leftover.length) throw new Error('迁移后仍有派生 kind：' + leftover.slice(0, 5).join(', '));

  fs.writeFileSync(FILE, JSON.stringify(levels), 'utf8');

  console.log('已迁移 ' + totalRewrites + ' 个派生公理节点，涉及 ' + touched.length + ' 关，新建 atom 节点 ' + totalAtoms + ' 个');
  console.log('  按 kind：' + Object.keys(byKind).sort().map((k) => k + '=' + byKind[k]).join(' '));
  console.log('  涉及关卡：' + touched.join(' '));
  console.log('  写入 ' + path.relative(ROOT, FILE) + '（' + levels.length + ' 关）');
}

if (require.main === module) main();

module.exports = { DERIVED, paletteOf, migrateLevel };
