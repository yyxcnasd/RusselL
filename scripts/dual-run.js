#!/usr/bin/env node
'use strict';
/*
 * P2 双跑门禁：旧 Engine（AST，src/engine-legacy.js）与新 Engine（token，
 * src/modules.js + src/engine.js）在同一批关卡/参考电路上逐节点比对。
 *
 * 比对：每个节点的 state、公式等价键（旧 Logic.key(expand) vs 新 Term.key）、
 *       target.state、complete。错误文案只做统计，不参与判定。
 *
 * 用法：node scripts/dual-run.js [--verbose] [--only CH1-01]
 */

const path = require('path');
const { loadRuntime } = require('./lib/load-runtime');

const ROOT = path.resolve(__dirname, '..');
const verbose = process.argv.includes('--verbose');
const onlyIdx = process.argv.indexOf('--only');
const only = onlyIdx >= 0 ? process.argv[onlyIdx + 1] : null;

const dataFiles = ['src/logic.js', 'src/archive.js', 'src/library.js', 'src/levels.js', 'src/levels-generated.js'];

const OLD = loadRuntime({ files: dataFiles.concat(['src/engine-legacy.js']) });
const NEW = loadRuntime({ files: dataFiles.concat(['src/term.js', 'src/modules.js', 'src/engine.js']) });

const levels = OLD.LEVELS || [];
if (!OLD.Engine || !NEW.Engine) {
  console.error('FAIL: 缺少 Engine（old=' + !!OLD.Engine + ' new=' + !!NEW.Engine + '）');
  process.exit(1);
}

function circuitOf(level) {
  const target = { id: 'target', kind: 'target', x: 900, y: 300, target: level.target, config: {} };
  const nodes = [target].concat(JSON.parse(JSON.stringify(level.solution.nodes)));
  const edges = level.solution.edges.map((e, i) => ({ id: 'e' + i, from: { ...e.from }, to: { ...e.to } }));
  return { nodes, edges };
}

const failures = [];
const notes = [];
function fail(levelId, nodeId, what, expected, actual) {
  failures.push({ levelId, nodeId, what, expected, actual });
  if (verbose && failures.length <= 30) {
    console.log('DIFF ' + levelId + ' / ' + nodeId + ' ' + what + '\n  old=' + JSON.stringify(expected) + '\n  new=' + JSON.stringify(actual));
  }
}

let levelsChecked = 0;
let nodesChecked = 0;
for (const level of levels) {
  if (level.mode === 'mm-proof') continue;
  if (only && level.id !== only) continue;
  if (!level.solution || !level.solution.nodes.length) continue;
  levelsChecked += 1;
  const { nodes, edges } = circuitOf(level);
  let oldR, newR;
  try { oldR = OLD.Engine.evaluate(level, nodes, edges); } catch (e) { fail(level.id, '-', 'old throw', 'ok', e.message); continue; }
  try { newR = NEW.Engine.evaluate(level, nodes, edges); } catch (e) { fail(level.id, '-', 'new throw', 'ok', e.message); continue; }

  if (oldR.complete !== newR.complete) fail(level.id, '-', 'complete', oldR.complete, newR.complete);
  if ((oldR.target && oldR.target.state) !== (newR.target && newR.target.state)) {
    fail(level.id, 'target', 'target.state', oldR.target && oldR.target.state, newR.target && newR.target.state);
  }
  nodes.forEach((n) => {
    const a = oldR.results[n.id], b = newR.results[n.id];
    if (!a || !b) { fail(level.id, n.id, 'missing result', !!a, !!b); return; }
    nodesChecked += 1;
    if (a.state !== b.state) { fail(level.id, n.id, 'state', a.state, b.state); return; }
    const oldKey = a.ast ? OLD.Logic.key(a.ast) : null;
    const newKey = b.tokens ? NEW.Term.key(b.tokens) : null;
    if (oldKey !== newKey) {
      fail(level.id, n.id, 'formula key',
        a.ast ? OLD.Logic.fmt(a.ast) : '(null)',
        b.tokens ? b.tokens.join(' ') : '(null)');
    }
    if (a.state === 'error' && a.error && b.error && a.error !== b.error) {
      notes.push({ levelId: level.id, nodeId: n.id, old: a.error.slice(0, 80), new: b.error.slice(0, 80) });
    }
  });
}

console.log('levels: ' + levelsChecked + '，nodes: ' + nodesChecked);
console.log('error 文案差异: ' + notes.length + ' 条（不计入判定）');
if (verbose && notes.length) {
  notes.slice(0, 10).forEach((x) => console.log('  note ' + x.levelId + '/' + x.nodeId + ': ' + JSON.stringify(x)));
}
if (failures.length) {
  console.log('FAIL: ' + failures.length + ' 处差异');
  const by = {};
  failures.forEach((f) => { by[f.what] = (by[f.what] || 0) + 1; });
  console.log('by kind: ' + JSON.stringify(by));
  const byLevel = {};
  failures.forEach((f) => { byLevel[f.levelId] = (byLevel[f.levelId] || 0) + 1; });
  const ids = Object.keys(byLevel).slice(0, 20);
  console.log('levels with diffs (' + Object.keys(byLevel).length + '): ' + ids.map((id) => id + '×' + byLevel[id]).join(' '));
  process.exitCode = 1;
} else {
  console.log('PASS: dual-run 0 差异');
}
