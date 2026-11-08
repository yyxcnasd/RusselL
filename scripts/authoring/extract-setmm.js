#!/usr/bin/env node
'use strict';
/*
 * 作者侧：把 set.mm 里纯命题（ax-1/ax-2/ax-3 + ax-mp）的证明翻译成新演算的参考证明项。
 *
 * 关卡内容（目标、顺序、提示）仍是手写的；这里只“理解 set.mm 的证明并内化”：
 *   - 只接受完全展开后只用到 ax-1/2/3、ax-mp、wi、wn 的定理（没有定义/其它引理）；
 *   - 把 set.mm 的变量 ph/ps/ch 统一换成本作的 P/Q/R；
 *   - 输出与 campaign/proof.js 同构的证明项 JSON，供 build-campaign 编译成棋盘电路。
 *
 * 用法：
 *   node scripts/authoring/extract-setmm.js --scan            # 列出可翻译的定理
 *   node scripts/authoring/extract-setmm.js --labels a,b,c --out campaign/setmm-proofs.json
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const { parseMm } = require(path.join(ROOT, 'scripts', 'mm-build-frames.js'));
const Verify = require(path.join(ROOT, 'src', 'mm', 'verify.js'));
const Term = require(path.join(ROOT, 'src', 'term.js'));

const VAR_MAP = { ph: 'P', ps: 'Q', ch: 'R', th: 'S', ta: 'T' };
const AXIOM_LABELS = { 'ax-1': 'A1', 'ax-2': 'A2', 'ax-3': 'A3' };
const SYNTAX = new Set(['wi', 'wn', 'wa', 'wo', 'wb', 'wal', 'wex', 'weq', 'wel', 'wcel', 'cv', 'wtru', 'wfal']);
const ALLOWED = new Set(['wi', 'wn', 'ax-1', 'ax-2', 'ax-3', 'ax-mp']);

let DB = null;
function db() {
  if (DB) return DB;
  const src = fs.readFileSync(path.join(ROOT, 'assets', 'data', 'set.mm'), 'utf8');
  const parsed = parseMm(src);
  DB = {
    frames: parsed.frames,
    hypFrames: parsed.hypFrames,
    vars: Object.fromEntries(parsed.varKinds)
  };
  return DB;
}

function convTokens(tokens) {
  const out = [];
  for (const t of tokens) {
    if (VAR_MAP[t]) out.push(VAR_MAP[t]);
    else if (/^[a-z][a-z0-9_.]*$/i.test(t) && ['x', 'y', 'z', 'w', 'v', 'u'].indexOf(t) >= 0) out.push(t);
    else out.push(t);
  }
  return out;
}

function replay(label) {
  const d = db();
  const frame = d.frames.get(label);
  if (!frame) return { ok: false, reason: 'label 不存在' };
  const mandatory = frame.mandatory || [];
  if (mandatory.some((h) => h.kind === '$e')) return { ok: false, reason: '定理带 $e 假设（需要前提节点）' };
  const frameOf = (l) => d.frames.get(l) || d.hypFrames.get(l) || null;
  let res;
  try { res = Verify.replay(frame, frameOf, { vars: d.vars }); } catch (e) { return { ok: false, reason: 'replay 异常：' + e.message }; }
  if (!res.ok) return { ok: false, reason: (res.errors || []).slice(0, 1).join('; ') };
  return { ok: true, frame, res };
}

/** 把 replay 的步骤翻译成新演算证明项；失败返回 {ok:false,reason}。 */
function translate(label) {
  const got = replay(label);
  if (!got.ok) return got;
  const steps = got.res.steps;
  const finalId = got.res.finalStep;
  const byId = {};
  steps.forEach((s) => { byId[s.id] = s; });

  function convSubst(sub) {
    const atoms = {};
    Object.keys(sub || {}).forEach((name) => {
      const mapped = VAR_MAP[name];
      if (!mapped) throw new Error('不支持的变量 ' + name);
      atoms[mapped] = convTokens(sub[name]);
    });
    return atoms;
  }

  const cache = new Map();
  function termOf(id) {
    if (cache.has(id)) return cache.get(id);
    const s = byId[id];
    if (!s) throw new Error('缺少步骤 ' + id);
    let out;
    if (s.kind === 'hyp') throw new Error('证明依赖假设步骤 ' + s.label);
    if (SYNTAX.has(s.label)) return null; // 只用于搭公式，不进断言证明
    if (s.label === 'ax-mp') {
      const a = termOf(s.inputs[0]);
      const b = termOf(s.inputs[1]);
      if (!a || !b) throw new Error('ax-mp 的输入不是断言');
      out = { op: 'mp', a, b };
    } else if (AXIOM_LABELS[s.label]) {
      out = { op: 'axiom', schema: AXIOM_LABELS[s.label], atoms: convSubst(s.subst) };
    } else {
      throw new Error('不支持的面包屑 ' + s.label + '（需要定义/其它引理）');
    }
    cache.set(id, out);
    return out;
  }

  const proof = termOf(finalId);
  const target = convTokens(got.frame.math);
  /* 静态检查：证明项里的公理实例化必须确实得到目标。 */
  function conclusionOf(node) {
    if (node.op === 'axiom') {
      const AXIOMS = {
        A1: ['(', 'P', '->', '(', 'Q', '->', 'P', ')', ')'],
        A2: ['(', '(', 'P', '->', '(', 'Q', '->', 'R', ')', ')', '->', '(', '(', 'P', '->', 'Q', ')', '->', '(', 'P', '->', 'R', ')', ')', ')'],
        A3: ['(', '(', '-.', 'P', '->', '-.', 'Q', ')', '->', '(', 'Q', '->', 'P', ')', ')']
      };
      return Term.substAtoms(['wff'].concat(AXIOMS[node.schema]), node.atoms).slice(1);
    }
    if (node.op === 'mp') {
      const imp = conclusionOf(node.a);
      return Term.read(['wff'].concat(imp)).k === 'imp' ? Term.treeToBody(Term.read(['wff'].concat(imp)).b) : null;
    }
    return null;
  }
  const conclusion = conclusionOf(proof);
  if (JSON.stringify(conclusion) !== JSON.stringify(target.slice(1))) {
    return { ok: false, reason: '翻译结论与目标不一致：' + JSON.stringify(conclusion) + ' vs ' + JSON.stringify(target.slice(1)) };
  }
  const atomsUsed = new Set();
  (function walk(n) {
    if (n.op === 'axiom') Object.keys(n.atoms).forEach((k) => atomsUsed.add(k));
    if (n.op === 'mp') { walk(n.a); walk(n.b); }
  })(proof);
  return {
    ok: true,
    label,
    targetTokens: target,
    proof,
    atoms: Array.from(atomsUsed).sort(),
    stats: { steps: steps.length, asserts: steps.filter((s) => s.kind === 'assert').length }
  };
}

function implicationCandidates() {
  const d = db();
  const VAR = new Set(['ph', 'ps', 'ch', 'th', 'ta', 'et', 'ze', 'si', 'rh', 'mu', 'la', 'ka']);
  const out = [];
  for (const [label, frame] of d.frames) {
    if (frame.kind !== '$p' || !frame.proofTokens || !frame.proofTokens.length) continue;
    if ((frame.mandatory || []).some((h) => h.kind === '$e')) continue;
    if (!frame.math.every((t) => t === '|-' || t === '(' || t === ')' || t === '->' || t === '-.' || VAR.has(t))) continue;
    out.push(label);
  }
  return out;
}

function auto() {
  const labels = implicationCandidates();
  const ok = [];
  const skipped = {};
  labels.forEach((label) => {
    let r;
    try { r = translate(label); } catch (e) { r = { ok: false, reason: 'throw: ' + e.message }; }
    if (r.ok) ok.push(r);
    else skipped[(r.reason || 'unknown').slice(0, 24)] = (skipped[(r.reason || 'unknown').slice(0, 24)] || 0) + 1;
  });
  ok.sort((a, b) => a.stats.steps - b.stats.steps);
  console.log('可翻译', ok.length, '/', labels.length);
  console.log('跳过原因：', JSON.stringify(skipped).slice(0, 300));
  ok.forEach((r) => console.log(
    r.stats.steps.toString().padStart(4),
    r.label.padEnd(12),
    r.proof ? '(proof)' : '',
    r.targetTokens.slice(1).join(' ').slice(0, 70)
  ));
  return ok;
}

function scan() {
  const d = db();
  const out = [];
  for (const [label, frame] of d.frames) {
    if (frame.kind !== '$p') continue;
    if (!frame.proofTokens || !frame.proofTokens.length) continue;
    const mandatory = frame.mandatory || [];
    if (mandatory.some((h) => h.kind === '$e')) continue;
    /* 只看结论/假设里只含 wi/wn 的定理 */
    const refs = (frame.proofTokens || []);
    const bad = refs.find((x) => !ALLOWED.has(x) && !SYNTAX.has(x) && x !== '(' && x !== ')');
    if (bad) continue;
    out.push({ label, math: frame.math.join(' '), refs: refs.length });
  }
  return out;
}

function main() {
  const args = process.argv.slice(2);
  const scanOnly = args.includes('--scan');
  const labelsIdx = args.indexOf('--labels');
  const outIdx = args.indexOf('--out');
  if (args.includes('--auto')) {
    const ok = auto();
    const outIdx2 = args.indexOf('--out');
    if (outIdx2 >= 0) {
      fs.writeFileSync(path.join(ROOT, args[outIdx2 + 1]), JSON.stringify(ok, null, 2) + '\n', 'utf8');
      console.log('written', args[outIdx2 + 1], ok.length, 'entries');
    }
    return;
  }
  if (scanOnly) {
    const list = scan();
    console.log('候选（直接引用全在 ax-1/2/3/ax-mp/wi/wn）：', list.length);
    list.slice(0, 80).forEach((x) => console.log(x.label.padEnd(10), x.math.slice(0, 80)));
    return;
  }
  if (labelsIdx < 0) { console.error('需要 --scan 或 --labels'); process.exit(1); }
  const labels = args[labelsIdx + 1].split(',').map((s) => s.trim()).filter(Boolean);
  const results = [];
  labels.forEach((label) => {
    const r = translate(label);
    if (r.ok) { results.push(r); console.log('OK  ', label, r.targetTokens.join(' '), 'steps=' + r.stats.steps); }
    else console.log('SKIP', label, r.reason.slice(0, 100));
  });
  if (outIdx >= 0 && results.length) {
    fs.writeFileSync(path.join(ROOT, args[outIdx + 1]), JSON.stringify(results, null, 2) + '\n', 'utf8');
    console.log('written', args[outIdx + 1], results.length, 'entries');
  }
}

main();
