#!/usr/bin/env node
'use strict';
/* 从 src/levels.js 生成 docs/SOLUTIONS.md：全部关卡参考电路的可读清单（计数/编号运行时读取，不写死）。 */
const fs = require('fs');
const path = require('path');
const levels = require('../src/levels.js');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'docs', 'SOLUTIONS.md');

const TOKEN = { '|-': '⊢', '->': '→', '/\\': '∧', '\\/': '∨', '<->': '↔', 'A.': '∀', 'E.': '∃', 'e.': '∈', '=': '=', '-.': '¬' };
function target(tokens) {
  if (!tokens) return '';
  return tokens.map(function (t) { return TOKEN[t] || t; }).join(' ');
}

function configText(cfg) {
  if (!cfg) return '';
  var parts = [];
  Object.keys(cfg).forEach(function (k) {
    var v = cfg[k];
    if (v == null || v === '') return;
    parts.push(k + '=' + v);
  });
  return parts.length ? '(' + parts.join(', ') + ')' : '';
}

function theoremLabel(cfg) {
  cfg = cfg || {};
  var raw = cfg.code != null ? cfg.code : cfg.n;
  if (raw == null || String(raw).trim() === '') return 'theorem *?';
  var s = String(raw).trim();
  var m = /([ⅠⅡⅢⅣ])-(\d+)/.exec(s);
  if (m) return 'theorem *' + m[2];
  if (/^\d+$/.test(s)) return 'theorem *' + s.padStart(2, '0');
  if (/^[ivx]+$/.test(s)) return 'theorem *' + s;
  return 'theorem *?';
}

/* 代码块里的节点标签一律 English/ASCII（周围 Markdown 标题/提示可以保持中文）。 */
function nodeLine(n) {
  var kind = n.kind;
  if (kind === 'theorem') return theoremLabel(n.config);
  if (kind === 'axiom') {
    return 'axiom ' + ((n.config && n.config.schema) || '') + configText(n.config && n.config.v ? { v: n.config.v } : null);
  }
  if (kind === 'atom') return 'atom ' + ((n.config && n.config.name) || '');
  if (kind === 'term') return 'term ' + ((n.config && n.config.name) || '');
  if (kind === 'pred') return 'pred ' + ((n.config && n.config.symbol) || '');
  if (kind === 'subst') return 'subst S';
  if (kind === 'mp') return 'mp M';
  if (kind === 'def-expand') return 'def-expand D';
  if (kind === 'def-contract') return 'def-contract D⁻';
  if (kind === 'all' || kind === 'exists') return kind + configText(n.config);
  return kind + configText(n.config);
}

function edgeLine(e) {
  return e.from.node + '.' + e.from.port + ' -> ' + e.to.node + '.' + e.to.port;
}

var groups = {};
levels.forEach(function (lv) {
  var g = '课程';
  (groups[g] = groups[g] || []).push(lv);
});

var md = [];
md.push('# 公理板 · ' + levels.length + ' 关参考解法清单');
md.push('');
md.push('> 由 `scripts/export-solutions.js` 从 `src/levels.js` 自动生成。每个参考电路都先经过真实 Engine 求值验证；');
md.push('> 清单里的模块按参考电路中的节点顺序排列，接线单独列出，按 `模块.端口 → 模块.端口` 连即可。');
md.push('> 目标槽的节点已在关卡棋盘上，标为 `[target]`。');
md.push('');
md.push('## 快速索引');
md.push('');
md.push('| 关 | 标题 | 目标 | 提示 | 模块/接线 |');
md.push('| --- | --- | --- | --- | --- |');
levels.forEach(function (lv) {
  var code = lv.tutorial ? lv.code : ('`' + lv.code + '`');
  var title = (lv.title || '').replace(/\|/g, '\\|');
  var hint = (lv.hint || lv.teaches || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
  var goal = target(lv.targetTokens).replace(/\|/g, '\\|');
  md.push('| ' + code + ' | ' + title + ' | `' + goal + '` | ' + hint + ' | ' +
    lv.solution.nodes.length + ' / ' + lv.solution.edges.length + ' |');
});
md.push('');

Object.keys(groups).forEach(function (g) {
  md.push('## ' + g);
  md.push('');
  groups[g].forEach(function (lv) {
    var heading = lv.code + (lv.title ? ' · ' + lv.title : '');
    md.push('### ' + heading);
    md.push('');
    md.push('- 目标：`' + target(lv.targetTokens) + '`');
    if (lv.hint || lv.teaches) md.push('- 提示：' + (lv.hint || lv.teaches));
    md.push('- 参考解：' + lv.solution.nodes.length + ' 个模块 / ' + lv.solution.edges.length + ' 条接线');
    md.push('');
    md.push('<details><summary>展开参考电路</summary>');
    md.push('');
    md.push('```text');
    md.push('modules:');
    var targetNode = (lv.initialNodes || []).filter(function (n) { return n.kind === 'target'; })[0];
    if (targetNode) md.push(targetNode.id + '  target');
    lv.solution.nodes.forEach(function (n) {
      md.push(n.id + '  ' + nodeLine(n));
    });
    md.push('');
    md.push('wires:');
    lv.solution.edges.forEach(function (e) {
      md.push(edgeLine(e));
    });
    md.push('```');
    md.push('');
    md.push('</details>');
    md.push('');
  });
});

fs.writeFileSync(out, md.join('\n'), 'utf8');
console.log('wrote', out, (fs.statSync(out).size / 1024).toFixed(1) + ' KB');
