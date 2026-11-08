#!/usr/bin/env node
'use strict';
/*
 * 作者侧：从 set.mm 的命题定理依赖链里挑出一条「只用 ax-1/2/3 + ax-mp」的课程链，
 * 并把每个定理的 set.mm 证明翻译成新演算证明项（引用链上更早的定理 *NN）。
 *
 * 这是把手写关卡和 set.mm 证明连接起来的工具：目标/顺序由人挑（chain），
 * 证明来自 set.mm 并按本作规则重写；不是自动生成关卡内容。
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const { parseMm } = require(path.join(ROOT, 'scripts', 'mm-build-frames.js'));
const Verify = require(path.join(ROOT, 'src', 'mm', 'verify.js'));
const Term = require(path.join(ROOT, 'src', 'term.js'));

const VAR_MAP = { ph: 'P', ps: 'Q', ch: 'R', th: 'S', ta: 'T' };
const AXIOMS = { 'ax-1': 'A1', 'ax-2': 'A2', 'ax-3': 'A3' };
const SYNTAX = new Set(['wi', 'wn']);
const BASE = new Set(['ax-1', 'ax-2', 'ax-3']);

const parsed = parseMm(fs.readFileSync(path.join(ROOT, 'assets', 'data', 'set.mm'), 'utf8'));
const frames = parsed.frames;
const frameOf = (l) => frames.get(l) || parsed.hypFrames.get(l) || null;
const vars = Object.fromEntries(parsed.varKinds);

function convTokens(tokens) {
  const out = [];
  for (const t of tokens) {
    if (VAR_MAP[t]) out.push(VAR_MAP[t]);
    else out.push(t);
  }
  return out;
}
const keyOf = (t) => t.join('\u0000');

function directRefs(frame) {
  const toks = frame.proofTokens || [];
  if (!toks.length) return [];
  if (toks[0] !== '(') return toks.slice();
  const out = [];
  for (let i = 1; i < toks.length && toks[i] !== ')'; i += 1) out.push(toks[i]);
  return out;
}

/* 结构匹配：游戏定理里的 P/Q/R 作为元变元绑定到结论子式。 */
const SCHEMA_ATOMS = new Set(['P', 'Q', 'R', 'S', 'T']);
function matchBody(schemaBody, goalBody, binds) {
  binds = binds || {};
  const s = Term.read(['wff'].concat(schemaBody));
  const g = Term.read(['wff'].concat(goalBody));
  function m(a, b) {
    if (a.k === 'atom' && SCHEMA_ATOMS.has(a.name)) {
      if (Object.prototype.hasOwnProperty.call(binds, a.name)) {
        return keyOf(binds[a.name]) === keyOf(Term.treeToBody(b));
      }
      binds[a.name] = Term.treeToBody(b);
      return true;
    }
    if (a.k !== b.k) return false;
    if (a.k === 'pred' || a.k === 'var' || a.k === 'atom') {
      return JSON.stringify(a) === JSON.stringify(b);
    }
    if (a.k === 'not') return m(a.a, b.a);
    return m(a.a, b.a) && m(a.b, b.b);
  }
  return m(s, g) ? binds : null;
}

function translate(label, levelNoByLabel, targetByNo) {
  const frame = frames.get(label);
  const res = Verify.replay(frame, frameOf, { vars });
  if (!res.ok) return { ok: false, reason: 'replay: ' + (res.errors || [])[0] };
  const byId = {};
  res.steps.forEach((s) => { byId[s.id] = s; });
  const cache = new Map();
  function termOf(id) {
    if (cache.has(id)) return cache.get(id);
    const s = byId[id];
    if (!s) throw new Error('missing step ' + id);
    if (s.kind === 'hyp') throw new Error('依赖假设 ' + s.label);
    if (SYNTAX.has(s.label)) return null;
    let out;
    if (AXIOMS[s.label]) {
      const atoms = {};
      Object.keys(s.subst || {}).forEach((name) => {
        if (!VAR_MAP[name]) throw new Error('不支持的变量 ' + name);
        atoms[VAR_MAP[name]] = convTokens(s.subst[name]);
      });
      out = { op: 'axiom', schema: AXIOMS[s.label], atoms };
    } else if (s.label === 'ax-mp') {
      const a = termOf(s.inputs[0]);
      const b = termOf(s.inputs[1]);
      if (!a || !b) throw new Error('ax-mp 输入不是断言');
      out = { op: 'mp', a, b };
    } else if (levelNoByLabel[s.label] != null) {
      const n = levelNoByLabel[s.label];
      const target = targetByNo[n];
      const conclusion = convTokens(s.conclusion).slice(1);
      const binds = matchBody(target, conclusion);
      if (!binds) throw new Error('无法把 ' + s.label + ' 匹配到 *' + String(n).padStart(2, '0'));
      out = { op: 'lemma', n, atoms: binds };
    } else {
      throw new Error('未纳入课程链的引用 ' + s.label);
    }
    cache.set(id, out);
    return out;
  }
  const proof = termOf(res.finalStep);
  const targetTokens = convTokens(frame.math);
  /* 结论检查 */
  function conclusionOf(node) {
    if (node.op === 'axiom') {
      const AX = {
        A1: ['(', 'P', '->', '(', 'Q', '->', 'P', ')', ')'],
        A2: ['(', '(', 'P', '->', '(', 'Q', '->', 'R', ')', ')', '->', '(', '(', 'P', '->', 'Q', ')', '->', '(', 'P', '->', 'R', ')', ')', ')'],
        A3: ['(', '(', '-.', 'P', '->', '-.', 'Q', ')', '->', '(', 'Q', '->', 'P', ')', ')']
      };
      return Term.substAtoms(['wff'].concat(AX[node.schema]), node.atoms).slice(1);
    }
    if (node.op === 'lemma') {
      return Term.substAtoms(['wff'].concat(targetByNo[node.n]), node.atoms).slice(1);
    }
    if (node.op === 'mp') {
      const imp = Term.read(['wff'].concat(conclusionOf(node.a)));
      if (imp.k !== 'imp') throw new Error('mp 左边不是蕴涵');
      return Term.treeToBody(imp.b);
    }
    throw new Error('未知证明项');
  }
  if (keyOf(conclusionOf(proof)) !== keyOf(targetTokens.slice(1))) {
    return { ok: false, reason: '结论与目标不一致' };
  }
  return { ok: true, label, targetTokens, proof, steps: res.steps.length };
}

function candidates() {
  const out = [];
  for (const [label, frame] of frames) {
    if (frame.kind !== '$p' || !frame.proofTokens || !frame.proofTokens.length) continue;
    if ((frame.mandatory || []).some((h) => h.kind === '$e')) continue;
    if (!frame.math.every((t) => t === '|-' || t === '(' || t === ')' || t === '->' || t === '-.' ||
      ['ph', 'ps', 'ch', 'th', 'ta', 'et', 'ze', 'si', 'rh', 'mu', 'la', 'ka'].indexOf(t) >= 0)) continue;
    out.push({ label, frame, refs: directRefs(frame), length: frame.proofTokens.length });
  }
  return out;
}

function buildChain(minLevels) {
  const pool = candidates();
  const byLabel = new Map(pool.map((x) => [x.label, x]));
  const selected = [];
  const levelNoByLabel = {};
  const targetByNo = {};
  const usedTargets = new Set();
  const ready = (entry) => entry.refs.every((r) => {
    if (SYNTAX.has(r) || BASE.has(r) || r === '(' || r === ')') return true;
    return levelNoByLabel[r] != null;
  });
  const pending = pool.slice().sort((a, b) => a.length - b.length || a.label.localeCompare(b.label));
  let progress = true;
  while (selected.length < minLevels && progress) {
    progress = false;
    for (const entry of pending.slice()) {
      if (levelNoByLabel[entry.label] != null) continue;
      if (!ready(entry)) continue;
      const target = convTokens(entry.frame.math).slice(1);
      if (usedTargets.has(keyOf(target))) { levelNoByLabel[entry.label] = -1; continue; }
      const no = selected.length + 1;
      levelNoByLabel[entry.label] = no;
      targetByNo[no] = target;
      const tr = translate(entry.label, levelNoByLabel, targetByNo);
      if (!tr.ok) {
        delete levelNoByLabel[entry.label];
        delete targetByNo[no];
        continue;
      }
      usedTargets.add(keyOf(target));
      selected.push({ no, label: entry.label, targetTokens: tr.targetTokens, proof: tr.proof, stats: { steps: tr.steps } });
      progress = true;
      break;
    }
  }
  return selected;
}

const outIdx = process.argv.indexOf('--out');
const minArg = process.argv.indexOf('--min');
const min = minArg >= 0 ? Number(process.argv[minArg + 1]) : 40;
const chain = buildChain(min);
console.log('chain levels:', chain.length);
chain.forEach((lv) => console.log(String(lv.no).padStart(2, '0'), lv.label.padEnd(12),
  'steps=' + String(lv.stats.steps).padStart(3), Term.fmt(['wff'].concat(lv.targetTokens.slice(1))).slice(0, 60)));
if (outIdx >= 0) {
  fs.writeFileSync(path.join(ROOT, process.argv[outIdx + 1]), JSON.stringify(chain, null, 2) + '\n', 'utf8');
  console.log('written', process.argv[outIdx + 1]);
}
