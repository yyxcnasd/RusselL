#!/usr/bin/env node
'use strict';
/*!
 * set.mm → 关卡证明数据导入（作者侧离线工具）
 *
 * 用法：node scripts/mm-import.js campaign/mm/seeds.json
 *   seeds.json: { "labels": ["id", "pm2.21", …] }
 *
 * 对每个种子 label，重放 set.mm 压缩证明，得到自包含证明 DAG，并对它证明里引用到的
 * 全部定理 label（递归闭包）一并导出到 campaign/mm/proofs/<label>.json。
 * 这样构建关卡时不再需要 51 MB 的 set.mm / frames 文件。
 *
 * 依赖：assets/data/set.mm（本地开发数据，.gitignore 已忽略）+ .research/mm 下的
 *       frame 构建器（从 feat/mm-replay 分支取出的一次性工具）。
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const FRAMES = path.join(ROOT, '.research', 'mm-frames-full.json');
const OUT_DIR = path.join(ROOT, 'campaign', 'mm', 'proofs');

const VERIFY_DIR = path.join(ROOT, '.research', 'mm');

function ensureFrames() {
  if (fs.existsSync(FRAMES)) return;
  if (!fs.existsSync(path.join(ROOT, 'assets', 'data', 'set.mm'))) {
    throw new Error('缺少 assets/data/set.mm（本地开发数据）；或先手工生成 .research/mm-frames-full.json');
  }
  const extract = path.join(ROOT, '.research', 'extract-mm.cjs');
  if (!fs.existsSync(extract)) {
    throw new Error('缺少 .research/extract-mm.cjs（从 feat/mm-replay 分支取 mm 工具的脚本）');
  }
  execFileSync(process.execPath, [extract], { cwd: ROOT, stdio: 'inherit' });
  execFileSync(process.execPath, [path.join(VERIFY_DIR, 'mm-build-frames.js'), '--full', '--quiet',
    '--out', FRAMES], { cwd: ROOT, stdio: 'inherit' });
}

function main() {
  const seedFile = process.argv[2];
  if (!seedFile) {
    console.error('用法：node scripts/mm-import.js campaign/mm/seeds.json');
    process.exit(2);
  }
  ensureFrames();
  const db = JSON.parse(fs.readFileSync(FRAMES, 'utf8'));
  const Verify = require(path.join(VERIFY_DIR, 'verify.js'));
  const trimFrame = (f) => ({ label: f.label, kind: f.kind, math: f.math, mandatory: (f.mandatory || []).map((h) => ({ label: h.label, kind: h.kind, math: h.math, var: h.var || null })), dv: f.dv || [] });

  function replayProof(label) {
    const frame = db.frames[label];
    if (!frame) return { ok: false, errors: ['frames 里没有 ' + label] };
    const frameOf = (lb) => db.frames[lb] || (db.hyps || {})[lb] || null;
    const res = Verify.replay(frame, frameOf, { vars: db.varKinds || {} });
    if (!res.ok) return { ok: false, errors: res.errors };
    const used = {};
    for (const s of res.steps) {
      if (s.kind === 'assert') {
        const f = db.frames[s.label];
        if (!f) return { ok: false, errors: ['缺少 frame: ' + s.label] };
        used[s.label] = trimFrame(f);
      } else if (s.kind === 'hyp' && !(typeof s.hypIndex === 'number' && s.hypIndex >= 0)) {
        const h = (db.hyps || {})[s.label];
        if (h) used[s.label] = trimFrame(h);
      }
    }
    const proof = {
      label,
      conclusion: frame.math.slice(),
      mandatory: (frame.mandatory || []).map((h) => ({ label: h.label, kind: h.kind, math: h.math, var: h.var || null })),
      dv: (frame.dv || []).map((p) => p.slice()),
      steps: res.steps.map((s) => ({
        id: s.id,
        label: s.label,
        kind: s.kind,
        hypIndex: s.hypIndex === undefined ? -1 : s.hypIndex,
        inputs: s.inputs,
        subst: s.subst,
        conclusion: s.conclusion,
      })),
      finalStep: res.finalStep,
      frames: used,
    };
    const check = Verify.verifyProof(proof);
    if (!check.ok) return { ok: false, errors: check.errors };
    return { ok: true, proof };
  }

  const seeds = JSON.parse(fs.readFileSync(path.resolve(ROOT, seedFile), 'utf8'));
  const wanted = seeds.labels.slice();
  const seen = new Set();
  const queue = wanted.slice();
  let written = 0;
  const failures = [];
  while (queue.length) {
    const label = queue.shift();
    if (seen.has(label)) continue;
    seen.add(label);
    if (!db.frames[label]) { failures.push('缺少 frame：' + label); continue; }
    const r = replayProof(label);
    if (!r.ok) { failures.push(label + '：' + r.errors.slice(0, 3).join('；')); continue; }
    /* 证明里引用到的其它定理 label → 递归导出 */
    for (const s of r.proof.steps) {
      if (s.kind === 'assert' && db.frames[s.label] && db.frames[s.label].kind === '$p' && !seen.has(s.label)) {
        queue.push(s.label);
      }
    }
    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(path.join(OUT_DIR, label + '.json'), JSON.stringify(r.proof), 'utf8');
    written += 1;
  }
  console.log('导入证明：' + written + ' 个（种子 ' + wanted.length + '）→ ' + path.relative(ROOT, OUT_DIR));
  if (failures.length) {
    console.error('失败 ' + failures.length + ' 个：');
    failures.forEach((f) => console.error('  - ' + f));
    process.exit(1);
  }
}

main();
