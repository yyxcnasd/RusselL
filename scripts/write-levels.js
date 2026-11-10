#!/usr/bin/env node
'use strict';
/*!
 * 把 campaign/campaign2-levels.json 写成游戏运行时数据：
 *   src/levels.js、src/campaign-meta.js
 * palette 从参考解节点重算（定理代号已在构建期重映射）；写完后用真实 Engine 逐关复验。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const { loadRuntime } = require(path.join(ROOT, 'scripts', 'lib', 'load-runtime.js'));
const RSL = loadRuntime({ files: ['src/term.js', 'src/modules.js', 'src/engine.js'] });
const Engine = RSL.Engine;

const IN = path.join(ROOT, 'campaign', 'campaign2-levels.json');
const OUT_LEVELS = path.join(ROOT, 'src', 'levels.js');
const OUT_META = path.join(ROOT, 'src', 'campaign-meta.js');

function computePalette(nodes) {
  const seen = new Set();
  const out = [];
  nodes.forEach((n) => {
    if (n.kind === 'target') return;
    const cfg = n.kind === 'subst' ? {} : (n.config || {});
    const key = n.kind + ':' + JSON.stringify(cfg);
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ kind: n.kind, config: cfg });
  });
  return out;
}

const raw = JSON.parse(fs.readFileSync(IN, 'utf8'));
const levels = raw.map((lv) => {
  const out = JSON.parse(JSON.stringify(lv));
  out.id = out.code;
  delete out.depCodes;
  out.palette = computePalette(out.solution.nodes);
  return out;
});

const failures = [];
levels.forEach((lv, i) => {
  const nodes = JSON.parse(JSON.stringify(lv.initialNodes)).concat(JSON.parse(JSON.stringify(lv.solution.nodes)));
  const edges = JSON.parse(JSON.stringify(lv.solution.edges));
  const res = Engine.evaluate(lv, nodes, edges, { levels, levelIndex: i });
  if (!res.complete) {
    const first = (res.errors || [])[0];
    failures.push(lv.code + '：' + (first ? first.message : '未通关'));
  }
});
if (failures.length) {
  console.error('复验失败 ' + failures.length + ' 关：');
  failures.slice(0, 20).forEach((f) => console.error('  - ' + f));
  process.exit(1);
}

const chapters = [
  { key: 'logic', id: '', title: '命题演算' },
];
const header = '/* 自动生成：node scripts/build-campaign2.js && node scripts/write-levels.js（源：campaign/campaign2.js） */\n';
fs.writeFileSync(OUT_LEVELS, header +
  '(function (host) {\n  \'use strict\';\n  host.RSL = host.RSL || {};\n' +
  '  host.RSL.LEVELS = ' + JSON.stringify(levels) + ';\n' +
  "  if (typeof module !== 'undefined' && module.exports) module.exports = host.RSL.LEVELS;\n" +
  "})(typeof window !== 'undefined' ? window : globalThis);\n", 'utf8');
fs.writeFileSync(OUT_META, header +
  '(function (host) {\n  \'use strict\';\n  host.RSL = host.RSL || {};\n' +
  '  host.RSL.CAMPAIGN = ' + JSON.stringify(chapters) + ';\n' +
  '  host.RSL.CAMPAIGN_META = ' + JSON.stringify({ total: levels.length, id: 'prop-108' }) + ';\n' +
  "})(typeof window !== 'undefined' ? window : globalThis);\n", 'utf8');

const counts = { tutorial: 0, normal: 0, hard: 0, demon: 0 };
levels.forEach((lv) => {
  if (lv.tutorial) counts.tutorial += 1;
  else if (lv.band === 'demon') counts.demon += 1;
  else if (lv.band === 'challenge') counts.hard += 1;
  else counts.normal += 1;
});
console.log('写入 ' + path.relative(ROOT, OUT_LEVELS) + '：' + levels.length + ' 关（复验全部通过）');
console.log('  教学 ' + counts.tutorial + ' · 普通 ' + counts.normal + ' · 困难 ' + counts.hard + ' · 魔王 ' + counts.demon);
