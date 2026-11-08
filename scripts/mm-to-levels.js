#!/usr/bin/env node
'use strict';
/*
 * 把 research/mm-proofs/<label>.json 打包成随游戏发布的两个数据文件：
 *   src/mm/proofs.js   → window.RSL.MM_PROOFS  （31 个自包含证明 DAG）
 *   src/mm/levels.js   → window.RSL.MM_LEVELS  （31 个 mm-proof 关卡）
 *
 * 依赖：先跑 node scripts/mm-build-frames.js && node scripts/mm-verify.js。
 *
 * 用法：node scripts/mm-to-levels.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PROOF_DIR = path.join(ROOT, 'research', 'mm-proofs');
const REPORT = path.join(ROOT, 'research', 'mm-report.json');
const OUT_PROOFS = path.join(ROOT, 'src', 'mm', 'proofs.js');
const OUT_LEVELS = path.join(ROOT, 'src', 'mm', 'levels.js');
const MAX_PROOFS_BYTES = 2 * 1024 * 1024; // docs/MM-REPLAY.md §5 硬约束

const Expr = require(path.join(ROOT, 'src', 'mm', 'expr.js'));

/* 展示元数据：中文短名 + 归属章节。顺序即 MM-01…MM-31。 */
const META = [
  ['pm3.24', '命题', '非矛盾律', '⊢ ¬(φ ∧ ¬φ)：一个 wff 不能同时成立又与否定同时成立。'],
  ['pm2.07', '命题', '自蕴析取', '⊢ (φ → (φ ∨ φ))：析取的自反弱化。'],
  ['simp2', '命题', '三合取简化', '⊢ ((φ ∧ ψ ∧ χ) → ψ)：三元合取取中间项。'],
  ['3mix1', '命题', '三重析取引入', '⊢ (φ → (φ ∨ ψ ∨ χ))：往三重析取里塞第一项。'],
  ['pm2.5', '命题', '否蕴涵换位', '⊢ (¬(φ → ψ) → (¬φ → ψ))。'],
  ['pm3.11', '命题', '德摩根逆推', '⊢ (¬(¬φ ∨ ¬ψ) → (φ ∧ ψ))：从否定析取回到合取。'],
  ['simprrr', '命题', '右深合取化简', '⊢ ((φ ∧ (ψ ∧ (χ ∧ θ))) → θ)：最右项的化简。'],
  ['simpr12', '命题', '深合取化简', '⊢ ((ε ∧ ((φ ∧ ψ ∧ χ) ∧ θ ∧ τ)) → ψ)：嵌套合取里取第二项。'],

  ['alex', '谓词', '全称存在对偶', '⊢ (∀x φ ↔ ¬∃x ¬φ)：全称量词用存在与否定表示。'],
  ['ax-11', '谓词', '量词交换公理', '⊢ (∀x ∀y φ → ∀y ∀x φ)：ax-11，量词交换。'],
  ['exancom', '谓词', '存在内交换', '⊢ (∃x (φ ∧ ψ) ↔ ∃x (ψ ∧ φ))。'],
  ['19.31v', '谓词', '全称分配析取', '⊢ (∀x (φ ∨ ψ) ↔ (∀x φ ∨ ψ))，ψ 与 x 无 DV 冲突的版本。'],
  ['3exdistr', '谓词', '三重存在分配', '⊢ (∃x ∃y ∃z (φ ∧ ψ ∧ χ) ↔ ∃x (φ ∧ ∃y (ψ ∧ ∃z χ)))。'],
  ['19.33b', '谓词', '存在合取的逆', '¬(∃x φ ∧ ∃x ψ) 时给出 ∀x (φ ∨ ψ) 与 ∃x (φ ∨ ψ) 的等价。'],

  ['equequ1', '等词', '等式等价替换', '⊢ (x = y → (x = z ↔ y = z))：等号两边可互换。'],
  ['ax8', '等词', '等式代入', '⊢ (x = y → (x ∈ z → y ∈ z))：由 ax8v1/ax8v2 推出 ax-8。'],
  ['axc16', '等词', '旧公理 ax-c16', '⊢ (∀x x = y → (φ → ∀x φ))：旧版 ax-c16。'],
  ['axc11r', '等词', 'ax-c11 反向', '⊢ (∀y y = x → (∀x φ → ∀y φ))。'],
  ['equvel', '等词', '等式消去变元', '⊢ (∀z (z = x ↔ z = y) → x = y)：不需要 DV 的变元消去。'],
  ['19.12vvv', '等词', '量词换序', '⊢ (∃x ∀y (φ → ψ) ↔ ∀y ∃x (φ → ψ))，带 DV 的版本。'],

  ['vex', '集合', '变元皆集合', '⊢ x ∈ V：每个 setvar 都属于全集。'],
  ['vneqv', '集合', 'V 不是集合', '⊢ ¬x = V：真类不等于任何集合。'],
  ['fin41', '集合', '有限性重合', '⊢ Fin4 = Fin：可数选择下 IV-有限与 I-有限重合。'],
  ['en3lp', '集合', '无三环成员', '⊢ ¬(A ∈ B ∧ B ∈ C ∧ C ∈ A)：成员关系没有三循环。'],
  ['eqtr2', '集合', '类相等传递', '⊢ ((A = B ∧ A = C) → B = C)。'],
  ['axprlem1', '集合', '配对引理', '⊢ ∃x ∀y (∀z ¬z ∈ y → y ∈ x)：ax-pr 的引理。'],
  ['ax-pr', '集合', '配对公理', '⊢ ∃z ∀w ((w = x ∨ w = y) → w ∈ z)：ZF 配对公理。'],
  ['axunnd', '集合', '并集公理', '并集公理在无 DV 条件下的版本。'],
  ['oneltri', '集合', '序数三歧', '⊢ ((A ∈ On ∧ B ∈ On) → (A ∈ B ∨ B ∈ A ∨ A = B))。'],
  ['axrep1', '集合', '替换公理', 'Metamath Solitaire 里使用的替换公理版本。'],
  ['axacnd', '集合', '选择公理', '选择公理在无 DV 条件下的版本，本作里最大的重放目标。']
];

function main() {
  if (!fs.existsSync(REPORT)) throw new Error('缺少 ' + REPORT + '，先运行 node scripts/mm-verify.js');
  const report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));
  const failed = report.targets.filter((t) => !t.ok);
  if (failed.length) {
    throw new Error('mm-verify 还有失败目标：' + failed.map((t) => t.label).join(', '));
  }

  const known = new Set(report.targets.map((t) => t.label));
  const proofs = {};
  let total = 0;
  for (const [label, , , ] of META) {
    if (!known.has(label)) throw new Error('META 里有不存在的目标：' + label);
  }
  if (META.length !== report.targets.length) {
    throw new Error('META 数量 ' + META.length + ' 与报告 ' + report.targets.length + ' 不一致');
  }

  for (const [label] of META) {
    const file = path.join(PROOF_DIR, label + '.json');
    if (!fs.existsSync(file)) throw new Error('缺少证明文件 ' + file);
    const proof = JSON.parse(fs.readFileSync(file, 'utf8'));
    proofs[label] = proof;
    total += JSON.stringify(proof).length;
  }

  const header = '/* 自动生成，勿手改：node scripts/mm-to-levels.js（源：assets/data/set.mm） */\n';
  const proofsBody = header +
    '(function (host) {\n' +
    "  'use strict';\n" +
    '  host.RSL = host.RSL || {};\n' +
    "  host.RSL.MM_PROOFS = " + JSON.stringify(proofs) + ';\n' +
    '  if (typeof module !== \'undefined\' && module.exports) module.exports = host.RSL.MM_PROOFS;\n' +
    "})(typeof window !== 'undefined' ? window : globalThis);\n";

  const levels = META.map(function (entry, i) {
    const label = entry[0];
    const group = entry[1];
    const title = entry[2];
    const note = entry[3];
    const proof = proofs[label];
    const unicode = Expr.toUnicode(proof.conclusion);
    return {
      id: 'MM-' + String(i + 1).padStart(2, '0'),
      mode: 'mm-proof',
      chapter: 'mm',
      band: 'mm',
      group: group,
      title: title,
      note: note,
      code: label,
      targetTokens: proof.conclusion,
      targetUnicode: unicode,
      proofId: label,
      axiom: proof.kind === '$a',
      stats: {
        steps: proof.stats.steps,
        asserts: proof.stats.asserts,
        maxDepth: proof.stats.maxDepth,
        refs: proof.stats.refs.length
      },
      requires: [],
      order: i + 1
    };
  });

  const levelsBody = header +
    '(function (host) {\n' +
    "  'use strict';\n" +
    '  host.RSL = host.RSL || {};\n' +
    "  host.RSL.MM_LEVELS = " + JSON.stringify(levels) + ';\n' +
    '  if (typeof module !== \'undefined\' && module.exports) module.exports = host.RSL.MM_LEVELS;\n' +
    "})(typeof window !== 'undefined' ? window : globalThis);\n";

  fs.writeFileSync(OUT_PROOFS, proofsBody, 'utf8');
  fs.writeFileSync(OUT_LEVELS, levelsBody, 'utf8');

  const proofBytes = fs.statSync(OUT_PROOFS).size;
  const levelBytes = fs.statSync(OUT_LEVELS).size;
  console.log('levels : ' + levels.length + '（公理图式 ' + levels.filter((l) => l.axiom).length + '）');
  console.log('proofs : ' + (proofBytes / 1024).toFixed(1) + ' KB' +
    (proofBytes > MAX_PROOFS_BYTES ? '  !! 超过 2MB 上限' : '（< 2MB 上限）'));
  console.log('levels : ' + (levelBytes / 1024).toFixed(1) + ' KB');
  console.log('steps  : max=' + Math.max.apply(null, levels.map((l) => l.stats.steps)) +
    ' total=' + levels.reduce((n, l) => n + l.stats.steps, 0));
  if (proofBytes > MAX_PROOFS_BYTES) process.exitCode = 1;
}

if (require.main === module) main();
module.exports = { META };
