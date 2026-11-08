#!/usr/bin/env node
'use strict';
/*
 * P1 对拍：新的 RSL.Term（canonical token）与旧的 RSL.Logic（AST）逐公式比对。
 *
 * 语料：
 *   - 240 个关卡目标、993 条档案公式、20 条公理 schema、4 条定义
 *   - 240 关参考电路里每个节点的公式（旧引擎求值得到的 AST）
 * 比对项（任何一项不一致都算失败）：
 *   parse(fmt(ast)) 能解析；Term.fmt == Logic.fmt；Term.key == Logic.key；
 *   Term.toHTML(minimal/full) == Logic.toHTML；
 *   Term.eq 与 Logic.eq 在确定性配对的语料上判定一致。
 *
 * 用法：node scripts/term-diff.js [--verbose]
 */

const path = require('path');
const { loadRuntime } = require('./lib/load-runtime');

const ROOT = path.resolve(__dirname, '..');
const verbose = process.argv.includes('--verbose');

const RSL = loadRuntime({
  files: [
    'src/logic.js',
    'src/archive.js',
    'src/library.js',
    'src/levels.js',
    'src/levels-generated.js',
    'src/term.js',
    'src/modules.js',
    'src/engine-legacy.js'
  ]
});

const L = RSL.Logic;
const T = RSL.Term;
if (!T) {
  console.error('FAIL: src/term.js 没有挂载 RSL.Term');
  process.exit(1);
}

let corpus = [];   // { src, ast, text }
function addAST(src, ast) {
  corpus.push({ src, ast, text: L.fmt(ast) });
}
function addText(src, text) {
  let ast;
  try { ast = L.parse(text); } catch (e) { console.log('SKIP(parse)', src, e.message.split('\n')[0]); return; }
  addAST(src, ast);
}

/* 1. 关卡目标 / 档案 / 公理 / 定义 */
RSL.LEVELS.forEach((lv) => { if (lv.mode !== 'mm-proof') addText('level:' + lv.id, lv.target); });
Object.keys(RSL.ARCHIVE).forEach((label) => addText('archive:' + label, RSL.ARCHIVE[label].formula));
RSL.AXIOMS.forEach((ax) => addText('axiom:' + ax.id, ax.schema));
(RSL.DEFINITIONS || []).forEach((df) => addText('def:' + (df.id || df.code), df.schema));

/* 2. 参考电路每个节点的公式 */
let nodeCount = 0;
RSL.LEVELS.forEach((lv) => {
  if (lv.mode === 'mm-proof' || !lv.solution || !lv.solution.nodes.length) return;
  const target = { id: 'target', kind: 'target', x: 900, y: 300, target: lv.target, config: {} };
  const nodes = [target].concat(JSON.parse(JSON.stringify(lv.solution.nodes)));
  const edges = lv.solution.edges.map((e, i) => ({ id: 'e' + i, from: { ...e.from }, to: { ...e.to } }));
  let result;
  try { result = RSL.Engine.evaluate(lv, nodes, edges); } catch (e) { return; }
  nodes.forEach((n) => {
    const r = result.results[n.id];
    if (r && r.ast) { nodeCount += 1; addAST('node:' + lv.id + ':' + n.id, r.ast); }
  });
});

/* 3. 逐条比对 */
const failures = [];
function fail(src, what, expected, actual) {
  failures.push({ src, what, expected, actual });
  if (verbose && failures.length <= 40) {
    console.log('DIFF [' + src + '] ' + what + '\n  old=' + JSON.stringify(expected) + '\n  new=' + JSON.stringify(actual));
  }
}

let checked = 0;
const parsed = [];
for (const item of corpus) {
  let tokens;
  try {
    tokens = T.parse(item.text);
  } catch (e) {
    fail(item.src, 'Term.parse', item.text, e.message.split('\n')[0]);
    parsed.push(null);
    continue;
  }
  parsed.push(tokens);
  checked += 1;
  const oldFmt = L.fmt(item.ast);
  const newFmt = T.fmt(tokens);
  if (newFmt !== oldFmt) fail(item.src, 'fmt', oldFmt, newFmt);
  const oldKey = L.key(item.ast);
  const newKey = T.key(tokens);
  if (newKey !== oldKey) fail(item.src, 'key', oldKey, newKey);
  for (const mode of [false, true]) {
    const opts = mode ? { full: true } : undefined;
    const oldHTML = L.toHTML(item.ast, opts);
    const newHTML = T.toHTML(tokens, opts);
    if (newHTML !== oldHTML) fail(item.src, mode ? 'toHTML(full)' : 'toHTML', oldHTML, newHTML);
  }
  /* 再 parse 一次：token 必须能自洽（tree 往返） */
  const tokens2 = T.parse(newFmt);
  if (T.key(tokens2) !== newKey) fail(item.src, 'round-trip key', newKey, T.key(tokens2));
}

/* 4. eq 判定对拍：确定性配对 */
const N = parsed.length;
let eqChecked = 0;
const pairs = [];
for (let i = 0; i < N; i += 1) {
  for (const step of [1, 7, 31, 127]) {
    const j = (i * 13 + step) % N;
    pairs.push([i, j]);
  }
  pairs.push([i, i]);
}
for (const [i, j] of pairs) {
  if (!parsed[i] || !parsed[j]) continue;
  eqChecked += 1;
  const oldEq = L.eq(corpus[i].ast, corpus[j].ast);
  const newEq = T.eq(parsed[i], parsed[j]);
  if (oldEq !== newEq) fail('eq:' + corpus[i].src + '~' + corpus[j].src, 'eq', oldEq, newEq);
}

console.log('corpus: ' + corpus.length + ' 条公式（参考电路节点 ' + nodeCount + '）');
console.log('checked: fmt/key/toHTML ' + checked + ' 条；eq 对 ' + eqChecked + ' 对');
if (failures.length) {
  console.log('FAIL: ' + failures.length + ' 处差异');
  const byWhat = {};
  failures.forEach((f) => { byWhat[f.what] = (byWhat[f.what] || 0) + 1; });
  console.log('by kind: ' + JSON.stringify(byWhat));
  process.exitCode = 1;
} else {
  console.log('PASS: term-diff 0 差异');
}
