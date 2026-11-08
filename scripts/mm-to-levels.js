#!/usr/bin/env node
'use strict';
/*
 * 把 research/mm-proofs/<label>.json 打包成随游戏发布的两个数据文件：
 *   src/mm/proofs.js   → window.RSL.MM_PROOFS  （31 个自包含证明 DAG）
 *   src/mm/levels.js   → window.RSL.MM_LEVELS  （31 个 mm-proof 关卡）
 *
 * 依赖：先跑 node scripts/mm-build-frames.js && node scripts/mm-verify.js。
 *
 * 用法：node scripts/mm-to-levels.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PROOF_DIR = path.join(ROOT, 'research', 'mm-proofs');
const REPORT = path.join(ROOT, 'research', 'mm-report.json');
const OUT_PROOFS = path.join(ROOT, 'src', 'mm', 'proofs.js');
const OUT_LEVELS = path.join(ROOT, 'src', 'mm', 'levels.js');
const MAX_PROOFS_BYTES = 2 * 1024 * 1024; // docs/MM-REPLAY.md §5 硬约束
const { TARGETS, CHAPTERS, CHAPTER_NAMES } = require('./mm-targets.js');

const Expr = require(path.join(ROOT, 'src', 'mm', 'expr.js'));
/* 生成阶段用与运行时同一套布局/调色板算法，保证 P4 切换数据驱动时与 Graph.initial 完全一致。
   只是生成器依赖；发布产物（src/mm/levels.js）不含 graph 依赖。 */
const Graph = require(path.join(ROOT, 'src', 'mm', 'graph.js'));

/** 统一 schema（P3）：把证明编译成关卡数据里的 palette / initialNodes / reference。 */
function replaySchema(proof) {
  const levelLike = { targetTokens: proof.conclusion };
  const init = Graph.initial(levelLike, proof);
  /* palette 数据里同时列出可放置断言与给定前提；给定前提标 given:true，
     选关/棋盘只把断言放进元件栏（前提由 initialNodes 预置）。 */
  const palette = Graph.palette(proof).map((p) => ({
    kind: p.kind,
    config: Object.assign({}, p.config)
  })).concat(Graph.hypLabels(proof).map((h) => ({
    kind: 'mmhyp',
    config: { label: h.label },
    given: true
  })));
  const initialNodes = init.nodes.map((node) => {
    const copy = {
      id: node.id,
      kind: node.kind,
      x: node.x,
      y: node.y,
      config: Object.assign({}, node.config)
    };
    if (Array.isArray(node.targetTokens)) copy.targetTokens = node.targetTokens.slice();
    return copy;
  });
  /* 参考动作自带坐标：运行时不再需要 Graph.layout（生成期算一次，避免两套布局）。 */
  const layout = Graph.layout(proof);
  const reference = Graph.plan(proof).map((action) => {
    const pos = (layout.positions && layout.positions[action.stepId]) || null;
    const out = {
      stepId: action.stepId,
      kind: action.kind,
      label: action.label,
      inputs: action.inputs.slice()
    };
    if (pos) { out.x = pos.x; out.y = pos.y; }
    return out;
  });
  return { palette, initialNodes, reference };
}

function main() {
  if (!fs.existsSync(REPORT)) throw new Error('缺少 ' + REPORT + '，先运行 node scripts/mm-verify.js');
  const report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));
  const failed = report.targets.filter((t) => !t.ok);
  if (failed.length) {
    throw new Error('mm-verify 还有失败目标：' + failed.map((t) => t.label).join(', '));
  }

  const known = new Set(report.targets.map((t) => t.label));
  const proofs = {};
  let total = 0;
  for (const t of TARGETS) {
    if (!known.has(t.label)) throw new Error('目标清单里有未重放的目标：' + t.label);
  }
  if (TARGETS.length !== report.targets.length) {
    throw new Error('目标清单 ' + TARGETS.length + ' 与报告 ' + report.targets.length + ' 不一致');
  }

  for (const t of TARGETS) {
    const file = path.join(PROOF_DIR, t.label + '.json');
    if (!fs.existsSync(file)) throw new Error('缺少证明文件 ' + file);
    const proof = JSON.parse(fs.readFileSync(file, 'utf8'));
    proofs[t.label] = proof;
    total += JSON.stringify(proof).length;
  }

  const header = '/* 自动生成，勿手改：node scripts/mm-to-levels.js（源：assets/data/set.mm） */\n';
  const proofsBody = header +
    '(function (host) {\n' +
    "  'use strict';\n" +
    '  host.RSL = host.RSL || {};\n' +
    "  host.RSL.MM_PROOFS = " + JSON.stringify(proofs) + ';\n' +
    '  if (typeof module !== \'undefined\' && module.exports) module.exports = host.RSL.MM_PROOFS;\n' +
    "})(typeof window !== 'undefined' ? window : globalThis);\n";

  /* 重放关按章节成组、组内按证明步数升序；章节按 CHAPTERS 顺序。
     这样它们能直接插进对应章节的「基础段 → 重放段 → 挑战段」节奏里。 */
  const chapterRank = { prop: 0, pred: 1, eq: 2, set: 3 };
  const rows = TARGETS.map(function (t) {
    const proof = proofs[t.label];
    if (!proof) throw new Error('缺少 ' + t.label + ' 的证明');
    return {
      target: t,
      proof: proof,
      steps: proof.stats.steps,
      unicode: Expr.toUnicode(proof.conclusion)
    };
  });
  rows.sort(function (a, b) {
    return (chapterRank[a.target.chapter] - chapterRank[b.target.chapter]) || (a.steps - b.steps) ||
      a.target.label.localeCompare(b.target.label);
  });

  const perChapter = {};
  const levels = rows.map(function (row, i) {
    const t = row.target;
    const proof = row.proof;
    perChapter[t.chapter] = (perChapter[t.chapter] || 0) + 1;
    const schema = replaySchema(proof);
    return {
      id: 'MM-' + String(i + 1).padStart(2, '0'),
      track: 'replay',
      chapter: t.chapter,
      band: 'replay',
      group: CHAPTER_NAMES[t.chapter] || t.chapter,
      title: t.title,
      note: t.note,
      code: t.label,
      targetTokens: proof.conclusion,
      targetUnicode: row.unicode,
      proofId: t.label,
      axiom: proof.kind === '$a',
      stats: {
        steps: proof.stats.steps,
        asserts: proof.stats.asserts,
        maxDepth: proof.stats.maxDepth,
        refs: proof.stats.refs.length
      },
      palette: schema.palette,
      initialNodes: schema.initialNodes,
      reference: schema.reference,
      requires: [],
      order: i + 1,
      chapterOrder: perChapter[t.chapter]
    };
  });

  const levelsBody = header +
    '(function (host) {\n' +
    "  'use strict';\n" +
    '  host.RSL = host.RSL || {};\n' +
    "  host.RSL.MM_LEVELS = " + JSON.stringify(levels) + ';\n' +
    '  if (typeof module !== \'undefined\' && module.exports) module.exports = host.RSL.MM_LEVELS;\n' +
    "})(typeof window !== 'undefined' ? window : globalThis);\n";

  fs.writeFileSync(OUT_PROOFS, proofsBody, 'utf8');
  fs.writeFileSync(OUT_LEVELS, levelsBody, 'utf8');

  const proofBytes = fs.statSync(OUT_PROOFS).size;
  const levelBytes = fs.statSync(OUT_LEVELS).size;
  console.log('levels : ' + levels.length + '（公理图式 ' + levels.filter((l) => l.axiom).length + '）');
  console.log('proofs : ' + (proofBytes / 1024).toFixed(1) + ' KB' +
    (proofBytes > MAX_PROOFS_BYTES ? '  !! 超过 2MB 上限' : '（< 2MB 上限）'));
  console.log('levels : ' + (levelBytes / 1024).toFixed(1) + ' KB');
  console.log('steps  : max=' + Math.max.apply(null, levels.map((l) => l.stats.steps)) +
    ' total=' + levels.reduce((n, l) => n + l.stats.steps, 0));
  if (proofBytes > MAX_PROOFS_BYTES) process.exitCode = 1;
}

if (require.main === module) main();
module.exports = { TARGETS };
