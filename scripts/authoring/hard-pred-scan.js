#!/usr/bin/env node
'use strict';
/*
 * 作者侧扫描：把 set.mm 的纯 ∀ 定理实例化成 F(x)/G(y)/H(z) 真谓词公式，
 * 统计证明规模，用于挑选“复杂推理”关卡。
 */
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const { expand, db } = require('./setmm-expand.js');
const Term = require(path.join(ROOT, 'src', 'term.js'));

const VAR = ['x', 'y', 'z'];
function atomMapFor(label) {
  const d = db();
  const frame = d.frames.get(label);
  const dv = frame && frame.dv ? frame.dv : [];
  const forbidden = {};
  const WFF = ['ph', 'ps', 'ch', 'th', 'ta'];
  dv.forEach((pair) => {
    const wff = pair.find((t) => WFF.indexOf(t) >= 0);
    const sv = pair.find((t) => ['x', 'y', 'z'].indexOf(t) >= 0);
    if (!wff || !sv) return;
    forbidden[wff] = forbidden[wff] || {};
    forbidden[wff][sv] = true;
  });
  const pick = (wffVar, predicate) => {
    const bad = forbidden[wffVar] || {};
    const v = VAR.find((x) => !bad[x]) || 'z';
    return [predicate, '(', v, ')'];
  };
  return {
    P: pick('ph', 'F'),
    Q: pick('ps', 'G'),
    R: pick('ch', 'H'),
    S: pick('th', 'F')
  };
}

function convertTokens(tokens, map) {
  const out = [];
  tokens.forEach((t) => {
    if (map[t]) out.push.apply(out, map[t]);
    else out.push(t);
  });
  return out;
}

function convertProof(node, map) {
  if (!node) return null;
  switch (node.op) {
    case 'axiom':
    case 'lemma': {
      const atoms = {};
      Object.keys(node.atoms || {}).forEach((k) => { atoms[k] = convertTokens(node.atoms[k], map); });
      return Object.assign({}, node, { atoms });
    }
    case 'mp':
      return { op: 'mp', a: convertProof(node.a, map), b: convertProof(node.b, map) };
    case 'gen':
      return { op: 'gen', v: node.v, of: convertProof(node.of, map) };
    case 'shift':
      return { op: 'shift', v: node.v, formula: convertTokens(node.formula, map) };
    default:
      throw new Error('未支持的证明项 ' + node.op);
  }
}
function count(n) {
  if (!n) return 0;
  if (n.op === 'mp') return 1 + count(n.a) + count(n.b);
  if (n.op === 'gen') return 1 + count(n.of);
  return 1;
}

const labels = process.argv.slice(2);
if (!labels.length) {
  console.error('用法: node hard-pred-scan.js label1 label2 ...');
  process.exit(1);
}
labels.forEach((label) => {
  try {
    const map = atomMapFor(label);
    const r = expand(label, {}, [], {});
    const proof = convertProof(r.term, map);
    const target = convertTokens(r.targetTokens.slice(1), map);
    console.log(String(count(proof)).padStart(4), label.padEnd(12),
      JSON.stringify(map).slice(0, 40), '::', Term.fmt(['wff'].concat(target)).slice(0, 100));
  } catch (e) {
    console.log('FAIL', label, e.message.slice(0, 80));
  }
});
