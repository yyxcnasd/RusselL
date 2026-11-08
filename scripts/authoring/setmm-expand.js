#!/usr/bin/env node
'use strict';
/*
 * 作者侧：把 set.mm 的定理证明完整展开成新演算（ax-1/2/3 + ax-mp + 更早关卡 *NN）的证明项。
 *
 * 关键点：set.mm 的证明大量使用 a1i / mpd / com12 这类“推理式引理”。这里把它们的
 * 证明递归内联：把引理的假设替换成实际的子证明，最终落到三条公理、分离规则和更早关卡
 * 的已证定理上。这样难定理（Peirce、双重否定、HS……）都不需要自动搜索。
 *
 * 用法：node scripts/authoring/setmm-expand.js --labels id,pm2.18,peirce
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const { parseMm } = require(path.join(ROOT, 'scripts', 'mm-build-frames.js'));
const Verify = require(path.join(ROOT, 'src', 'mm', 'verify.js'));
const Term = require(path.join(ROOT, 'src', 'term.js'));

const VAR_MAP = { ph: 'P', ps: 'Q', ch: 'R', th: 'S', ta: 'T' };
const AXIOM_SCHEMA = {
  'ax-1': { schema: 'A1', body: ['(', 'P', '->', '(', 'Q', '->', 'P', ')', ')'] },
  'ax-2': { schema: 'A2', body: ['(', '(', 'P', '->', '(', 'Q', '->', 'R', ')', ')', '->', '(', '(', 'P', '->', 'Q', ')', '->', '(', 'P', '->', 'R', ')', ')', ')'] },
  'ax-3': { schema: 'A3', body: ['(', '(', '-.', 'P', '->', '-.', 'Q', ')', '->', '(', 'Q', '->', 'P', ')', ')'] }
};
const SYNTAX = new Set(['wi', 'wn']);
const SCHEMA_ATOMS = new Set(['P', 'Q', 'R', 'S', 'T']);

let PARSED = null;
function db() {
  if (PARSED) return PARSED;
  PARSED = parseMm(fs.readFileSync(path.join(ROOT, 'assets', 'data', 'set.mm'), 'utf8'));
  return PARSED;
}
const keyOf = (t) => t.join('\u0000');
const GAME_VARS = new Set(['x', 'y', 'z']);
function conv(tokens) {
  return tokens.map((t) => {
    if (VAR_MAP[t]) return VAR_MAP[t];
    if (/^[a-z]$/.test(t) && !GAME_VARS.has(t)) throw new Error('不支持的变元 ' + t);
    return t;
  });
}
const TYPES = new Set(['|-', 'wff', 'setvar', 'class']);
function bodyTokens(expr) {
  return Array.isArray(expr) && TYPES.has(expr[0]) ? expr.slice(1) : expr;
}
function applySub(body, sub) {
  return Term.substBody(body, sub);
}
function matchSchema(schemaBody, goalBody) {
  const s = Term.read(['wff'].concat(schemaBody));
  const g = Term.read(['wff'].concat(goalBody));
  const binds = {};
  function m(a, b) {
    if (a.k === 'atom' && SCHEMA_ATOMS.has(a.name)) {
      if (Object.prototype.hasOwnProperty.call(binds, a.name)) {
        return keyOf(binds[a.name]) === keyOf(Term.treeToBody(b));
      }
      binds[a.name] = Term.treeToBody(b);
      return true;
    }
    if (a.k !== b.k) return false;
    if (a.k === 'atom' || a.k === 'pred' || a.k === 'var') return JSON.stringify(a) === JSON.stringify(b);
    if (a.k === 'not') return m(a.a, b.a);
    if (a.k === 'imp') return m(a.a, b.a) && m(a.b, b.b);
    if (a.k === 'all') return a.v === b.v && m(a.a, b.a);
    return false;
  }
  return m(s, g) ? binds : null;
}

const replayCache = new Map();
function replay(label) {
  if (replayCache.has(label)) return replayCache.get(label);
  const d = db();
  const frame = d.frames.get(label);
  if (!frame) throw new Error('缺少 label ' + label);
  const frameOf = (l) => d.frames.get(l) || d.hypFrames.get(l) || null;
  const res = Verify.replay(frame, frameOf, { vars: Object.fromEntries(d.varKinds) });
  const out = { frame, res, byId: {} };
  res.steps.forEach((s) => { out.byId[s.id] = s; });
  replayCache.set(label, out);
  return out;
}

/**
 * 展开一个定理：
 *   label       set.mm label
 *   sub         变量名 → 实际表达式 token（set.mm 记号；顶层为空）
 *   hypTerms    按 mandatory 顺序，每个 $e 假设的实际子证明（$f 位置为 null）
 *   levelMap    label → {n, targetBody}（更早关卡，可直接引用）
 * 返回证明项（campaign/proof.js 同构）。
 */
function expand(label, sub, hypTerms, levelMap) {
  const { frame, res, byId } = replay(label);
  const mandatory = frame.mandatory || [];
  const cache = new Map();

  function actual(step) {
    const body = bodyTokens(step.conclusion);
    return applySub(body, sub || {});
  }

  function stepTerm(id) {
    if (cache.has(id)) return cache.get(id);
    const s = byId[id];
    if (!s) throw new Error('缺少步骤 ' + id);
    let out = null;
    if (s.kind === 'hyp') {
      if (s.hypIndex >= 0 && mandatory[s.hypIndex] && mandatory[s.hypIndex].kind === '$e') {
        out = hypTerms && hypTerms[s.hypIndex] ? hypTerms[s.hypIndex] : null;
        if (!out) throw new Error(label + ' 的 $e 假设 ' + mandatory[s.hypIndex].label + ' 没有子证明');
      } else {
        out = null;
      }
    } else if (SYNTAX.has(s.label)) {
      out = null;
    } else if (s.label === 'ax-4') {
      /* ax-4: ∀x(φ→ψ) → (∀xφ → ∀xψ)，对应本作 A5（全称分配）。 */
      const body = conv(actual(s));
      const tree = Term.read(['wff'].concat(body));
      if (tree.k !== 'imp' || tree.a.k !== 'all') throw new Error('ax-4 形状不符');
      const v = tree.a.v;
      const inner = Term.read(['wff'].concat(Term.treeToBody(tree.a.a)));
      if (inner.k !== 'imp') throw new Error('ax-4 内层不是蕴涵');
      const P = Term.treeToBody(inner.a);
      const Q = Term.treeToBody(inner.b);
      const right = Term.read(['wff'].concat(Term.treeToBody(tree.b)));
      if (right.k !== 'imp' || right.a.k !== 'all' || right.b.k !== 'all') throw new Error('ax-4 右侧形状不符');
      if (keyOf(Term.treeToBody(right.a.a)) !== keyOf(P) || keyOf(Term.treeToBody(right.b.a)) !== keyOf(Q)) throw new Error('ax-4 实例不匹配');
      out = { op: 'axiom', schema: 'A5', v, atoms: { P, Q } };
    } else if (s.label === 'sp') {
      /* sp: ∀xφ → φ，对应本作 A4（全称消去）。 */
      const body = conv(actual(s));
      const tree = Term.read(['wff'].concat(body));
      if (tree.k !== 'imp' || tree.a.k !== 'all') throw new Error('sp 形状不符');
      const v = tree.a.v;
      const P = Term.treeToBody(tree.a.a);
      if (keyOf(P) !== keyOf(Term.treeToBody(tree.b))) throw new Error('sp 实例不匹配');
      out = { op: 'axiom', schema: 'A4', v, atoms: { P } };
    } else if (s.label === 'ax-5') {
      /* ax-5: φ → ∀xφ（x 不在 φ 中自由出现），对应本作 shift 规则。 */
      const body = conv(actual(s));
      const tree = Term.read(['wff'].concat(body));
      if (tree.k !== 'imp' || tree.b.k !== 'all') throw new Error('ax-5 形状不符');
      const v = tree.b.v;
      const P = Term.treeToBody(tree.a);
      if (keyOf(P) !== keyOf(Term.treeToBody(tree.b.a))) throw new Error('ax-5 实例不匹配');
      out = { op: 'shift', v, formula: P };
    } else if (AXIOM_SCHEMA[s.label]) {
      const ax = AXIOM_SCHEMA[s.label];
      const binds = matchSchema(ax.body, conv(actual(s)));
      if (!binds) throw new Error('无法匹配公理 ' + s.label + '：' + conv(actual(s)).join(' '));
      out = { op: 'axiom', schema: ax.schema, atoms: binds };
    } else if (s.label === 'ax-gen') {
      /* ax-gen 是本作的 gen 规则：从 |-φ 得到 |-∀xφ。 */
      const mand = replay('ax-gen').frame.mandatory || [];
      let binder = 'x';
      let proofId = null;
      for (let i = 0; i < mand.length; i += 1) {
        const h = mand[i];
        const inputStep = s.inputs[i] ? byId[s.inputs[i]] : null;
        if (!inputStep) continue;
        if (h.kind === '$f' && h.var && (/^[xyz]$/.test(h.var))) {
          const body = bodyTokens(inputStep.conclusion);
          if (body.length === 1) binder = body[0];
        }
        if (h.kind === '$e') proofId = s.inputs[i];
      }
      if (!proofId) throw new Error('ax-gen 缺少前提证明');
      const inner = stepTerm(proofId);
      if (!inner) throw new Error('ax-gen 的前提不是断言');
      out = { op: 'gen', of: inner, v: binder };
    } else if (s.label === 'ax-mp') {
      /* ax-mp 的 mandatory 里既有 $f（表达式）也有 $e（两个断言），只能取 $e 位置的输入。 */
      const mpFrame = replay('ax-mp').frame;
      const mand = mpFrame.mandatory || [];
      const terms = [];
      for (let i = 0; i < mand.length; i += 1) {
        if (mand[i].kind !== '$e') continue;
        const t = stepTerm(s.inputs[i]);
        if (!t) throw new Error('ax-mp 的断言输入不是证明（' + label + '）');
        terms.push(t);
      }
      if (terms.length !== 2) throw new Error('ax-mp 断言输入数量异常');
      out = { op: 'mp', a: terms[0], b: terms[1] };
    } else if (levelMap && levelMap[s.label]) {
      const lv = levelMap[s.label];
      const goal = conv(actual(s));
      const binds = matchSchema(lv.targetBody, goal);
      if (binds) out = { op: 'lemma', n: lv.n, atoms: binds };
      else out = expandOther(s.label, s, sub, hypTerms, levelMap);
    } else {
      out = expandOther(s.label, s, sub, hypTerms, levelMap);
    }
    cache.set(id, out);
    return out;
  }

  /** 展开被引用的定理 R：按 R 的 mandatory 从 step.inputs 里取实际输入。 */
  function expandOther(otherLabel, s, parentSub, parentHyps, levelMap2) {
    const r = replay(otherLabel);
    const rMand = r.frame.mandatory || [];
    const inputSteps = (s.inputs || []).map((x) => byId[x]);
    if (inputSteps.length !== rMand.length) throw new Error('arity 不一致 ' + otherLabel);
    const rSub = {};
    const rHyps = [];
    for (let i = 0; i < rMand.length; i += 1) {
      const h = rMand[i];
      const inputStep = inputSteps[i];
      if (h.kind === '$f') {
        rSub[h.var] = actual(inputStep);
      } else {
        rHyps[i] = stepTerm(inputStep.id);
      }
    }
    return expand(otherLabel, rSub, rHyps, levelMap2).term;
  }

  const finalTerm = stepTerm(res.finalStep);
  const finalBody = conv(applySub(bodyTokens(frame.math), sub || {}));
  return { term: finalTerm, targetBody: bodyTokens(finalBody), targetTokens: ['|-'].concat(bodyTokens(finalBody)), stats: { replaySteps: res.steps.length } };
}

function main() {
  const idx = process.argv.indexOf('--labels');
  const levelArg = process.argv.indexOf('--levels');
  const outIdx = process.argv.indexOf('--out');
  if (idx < 0) { console.error('用法: --labels a,b,c [--levels chain.json] [--out file]'); process.exit(1); }
  const labels = process.argv[idx + 1].split(',').map((s) => s.trim()).filter(Boolean);
  const levelMap = {};
  const levelTargets = {};
  if (levelArg >= 0) {
    const chain = JSON.parse(fs.readFileSync(path.join(ROOT, process.argv[levelArg + 1]), 'utf8'));
    chain.forEach((lv) => {
      levelMap[lv.label] = { n: lv.no, targetBody: lv.targetTokens.slice(1) };
      levelTargets[lv.no] = lv.targetTokens.slice(1);
    });
  }
  const out = [];
  for (const label of labels) {
    try {
      const t0 = Date.now();
      const r = expand(label, {}, [], levelMap);
      const nodes = countNodes(r.term);
      console.log('OK  ', label.padEnd(12), 'nodes=' + String(nodes).padStart(5),
        ((Date.now() - t0) / 1000).toFixed(2) + 's', Term.fmt(['wff'].concat(r.targetBody)).slice(0, 64));
      out.push({ label, targetTokens: r.targetTokens, proof: r.term, stats: { nodes } });
    } catch (e) {
      console.log('FAIL', label.padEnd(12), e.message.slice(0, 110));
    }
  }
  if (outIdx >= 0) {
    fs.writeFileSync(path.join(ROOT, process.argv[outIdx + 1]), JSON.stringify(out, null, 2) + '\n', 'utf8');
    console.log('written', process.argv[outIdx + 1], out.length);
  }
}

function countNodes(t) {
  if (!t) return 0;
  if (t.op === 'mp') return 1 + countNodes(t.a) + countNodes(t.b);
  if (t.op === 'gen') return 1 + countNodes(t.of);
  return 1;
}

if (require.main === module) main();
module.exports = { expand, replay, db };
