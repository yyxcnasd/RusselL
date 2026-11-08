#!/usr/bin/env node
'use strict';
/*
 * 用 src/mm/verify.js 重放 31 个 hard label 的 set.mm 压缩证明，产出：
 *   research/mm-proofs/<label>.json   自包含证明 DAG（可不依赖 frames.json 离线校验）
 *   research/mm-report.json           31 个目标的重放/校验报告
 *
 * 用法：
 *   node scripts/mm-verify.js                  # 全部 31 个，失败列出原因
 *   node scripts/mm-verify.js --label pm3.24   # 单个目标的详细轨迹
 *   node scripts/mm-verify.js --json           # 只写产物（供生成器调用）
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FRAMES = path.join(ROOT, 'research', 'mm-frames.json');
const OUT_DIR = path.join(ROOT, 'research', 'mm-proofs');
const REPORT = path.join(ROOT, 'research', 'mm-report.json');

const Verify = require(path.join(ROOT, 'src', 'mm', 'verify.js'));
const Expr = require(path.join(ROOT, 'src', 'mm', 'expr.js'));
const { HARD_LABELS } = require('./mm-build-frames.js');

function loadFrames() {
  if (!fs.existsSync(FRAMES)) {
    throw new Error('缺少 ' + FRAMES + '，先运行 node scripts/mm-build-frames.js');
  }
  return JSON.parse(fs.readFileSync(FRAMES, 'utf8'));
}

function trimFrame(f) {
  return { label: f.label, kind: f.kind, math: f.math, mandatory: f.mandatory || [], dv: f.dv || [] };
}

/**
 * 重放一个 label，返回 { ok, errors, proof }。
 * proof 是自包含 DAG：只保留被用到（可达）的 frame。
 */
function buildProof(db, label, options) {
  const opts = options || {};
  const frame = db.frames[label];
  if (!frame) return { ok: false, errors: ['frames.json 里没有 ' + label], proof: null };

  const vars = db.varKinds || {};
  const hypFrames = db.hyps || {};
  const frameOf = (lb) => db.frames[lb] || hypFrames[lb] || null;
  const res = Verify.replay(frame, frameOf, { vars });

  if (!res.ok) return { ok: false, errors: res.errors, proof: null, replay: res };

  /* 只带被引用到的 frame；假元假设（hypIndex < 0）的 $f frame 也要带上，才能离线校验 */
  const used = {};
  for (const s of res.steps) {
    if (s.kind === 'assert') {
      const f = db.frames[s.label];
      if (!f) return { ok: false, errors: ['缺少 frame: ' + s.label], proof: null };
      used[s.label] = trimFrame(f);
    } else if (s.kind === 'hyp' && !(typeof s.hypIndex === 'number' && s.hypIndex >= 0)) {
      const h = hypFrames[s.label];
      if (!h) return { ok: false, errors: ['缺少假元假设 frame: ' + s.label], proof: null };
      used[s.label] = trimFrame(h);
    }
  }

  /* 本证明出现过的变量（显示与 DV 判断共用） */
  const varsUsed = {};
  const seen = new Set();
  const scan = (tokens) => { for (const t of tokens) if (vars[t]) varsUsed[t] = vars[t]; };
  const proofVars = (tokens) => scan(tokens);
  const scanAll = () => {
    scan(frame.math);
    for (const h of frame.mandatory) scan(h.math);
    for (const k of Object.keys(used)) {
      scan(used[k].math);
      for (const h of used[k].mandatory) scan(h.math);
    }
    for (const s of res.steps) { if (!seen.has(s.id)) { seen.add(s.id); scan(s.conclusion); } }
  };
  scanAll();

  const proof = {
    label,
    kind: frame.kind,
    conclusion: frame.math.slice(),
    mandatory: frame.mandatory.map((h) => ({ label: h.label, kind: h.kind, math: h.math, var: h.var })),
    dv: frame.dv.map((p) => p.slice()),
    steps: res.steps.map((s) => ({
      id: s.id,
      label: s.label,
      kind: s.kind,
      hypIndex: s.hypIndex === undefined ? -1 : s.hypIndex,
      inputs: s.inputs,
      subst: s.subst,
      conclusion: s.conclusion,
      stackDepth: s.stackDepth
    })),
    finalStep: res.finalStep,
    frames: used,
    vars: varsUsed,
    stats: res.stats
  };
  if (opts.includeSubst === false) for (const s of proof.steps) delete s.subst;

  /* 离线自校验：把刚生成的 DAG 再跑一遍 verifyProof */
  const check = Verify.verifyProof(proof);
  if (!check.ok) return { ok: false, errors: check.errors, proof, replay: res };

  proof.sizeBytes = JSON.stringify(proof).length;
  return { ok: true, errors: [], proof, replay: res, checked: check.checked };
}

function main() {
  const args = process.argv.slice(2);
  const quiet = args.includes('--json');
  const one = args.indexOf('--label') >= 0 ? args[args.indexOf('--label') + 1] : null;

  const db = loadFrames();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const targets = one ? [one] : HARD_LABELS;
  const report = { generatedAt: new Date().toISOString(), source: 'assets/data/set.mm', targets: [], ok: 0, failed: 0 };

  for (const label of targets) {
    const r = buildProof(db, label);
    const entry = {
      label,
      ok: r.ok,
      kind: db.frames[label] ? db.frames[label].kind : null,
      errors: r.errors || [],
      stats: r.ok ? r.proof.stats : null,
      sizeBytes: r.ok ? r.proof.sizeBytes : 0,
      checked: r.ok ? r.checked : 0
    };
    report.targets.push(entry);
    if (r.ok) {
      report.ok += 1;
      fs.writeFileSync(path.join(OUT_DIR, label + '.json'), JSON.stringify(r.proof), 'utf8');
    } else {
      report.failed += 1;
    }
    if (!quiet) {
      if (r.ok) {
        const st = r.proof.stats;
        const triv = r.proof.kind === '$a' ? '  [公理·无可重放步骤]' : '';
        console.log('OK   ' + label.padEnd(12) + ' steps=' + String(st.steps).padStart(4) +
          ' asserts=' + String(st.asserts).padStart(3) + ' maxDepth=' + String(st.maxDepth).padStart(3) +
          ' refs=' + String(st.refs.length).padStart(2) +
          ' size=' + (r.proof.sizeBytes / 1024).toFixed(1) + 'KB' + triv);
      } else {
        console.log('FAIL ' + label.padEnd(12) + ' ' + r.errors.join(' | '));
      }
    }
  }

  if (!one) {
    fs.writeFileSync(REPORT, JSON.stringify(report, null, 2), 'utf8');
  }
  const totalBytes = report.targets.reduce((n, t) => n + t.sizeBytes, 0);
  console.log('\nmm-verify: ok=' + report.ok + ' failed=' + report.failed +
    ' totalProofBytes=' + (totalBytes / 1024).toFixed(1) + 'KB');
  if (report.failed) process.exitCode = 1;
}

if (require.main === module) main();
module.exports = { loadFrames, buildProof, trimFrame };
