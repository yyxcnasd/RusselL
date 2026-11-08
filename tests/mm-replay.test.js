/* set.mm 证明重放：token 公式层 + 压缩证明重放 + 生成产物（31 个 DAG / 31 关）校验。
 *
 * 这些断言全部走运行时真实实现（src/mm/*.js 按 index.html 顺序加载），
 * 不读 research/mm-frames.json；证明数据必须自包含。 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { loadRuntime } = require('../scripts/lib/load-runtime');

const RSL = loadRuntime({
  localStorage: true,
  files: [
    'src/logic.js',
    'src/archive.js',
    'src/library.js',
    'src/levels.js',
    'src/levels-generated.js',
    'src/mm/flags.js',
    'src/mm/proofs.js',
    'src/mm/levels.js',
    'src/mm/expr.js',
    'src/mm/verify.js',
    'src/catalog.js',
    'src/achievements.js'
  ]
});

const MM = RSL.MM;
const Expr = MM.Expr;
const Verify = MM.Verify;
const PROOFS = RSL.MM_PROOFS;
const LEVELS = RSL.MM_LEVELS;

const HARD = [
  'pm3.24', 'pm2.07', 'simp2', '3mix1', 'pm2.5', 'pm3.11', 'simprrr', 'simpr12',
  'alex', 'ax-11', 'exancom', '19.31v', '3exdistr', '19.33b',
  'equequ1', 'ax8', 'axc16', 'axc11r', 'equvel', '19.12vvv',
  'vex', 'vneqv', 'fin41', 'en3lp', 'eqtr2', 'axprlem1', 'ax-pr', 'axunnd', 'oneltri',
  'axrep1', 'axacnd'
];

test('Expr：token 公式的显示、解析与替换', () => {
  const toks = ['|-', '-.', '(', 'ph', '/\\', '-.', 'ph', ')'];
  assert.strictEqual(Expr.toASCII(toks), '|- -. ( ph /\\ -. ph )');
  assert.strictEqual(Expr.toUnicode(toks), '⊢ ¬ ( φ ∧ ¬ φ )');
  assert.strictEqual(Expr.toASCII(Expr.parse(Expr.toASCII(toks))), Expr.toASCII(toks));
  assert.strictEqual(Expr.toASCII(Expr.parse('⊢ ¬ ( φ ∧ ¬ φ )')), Expr.toASCII(toks));

  /* 直接替换（Metamath 语义）：变量整体替换，不检查捕获 */
  const sub = { ph: ['(', 'ps', '->', 'ch', ')'] };
  assert.strictEqual(
    Expr.toASCII(Expr.substTokens(['wff', 'ph'], sub)),
    'wff ( ps -> ch )'
  );
  /* 未被替换的 token 原样保留 */
  assert.strictEqual(Expr.toASCII(Expr.stripType(['wff', 'ph'])), 'ph');
  assert.strictEqual(Expr.stripType(['|-']).length, 0);
});

test('Expr.applyAssertion：$f 绑定变元、$e 用替换式比对、arity 必须匹配', () => {
  const frame = {
    label: 'ax-mp',
    math: ['|-', 'ps'],
    mandatory: [
      { label: 'wph', kind: '$f', math: ['wff', 'ph'], var: 'ph' },
      { label: 'wps', kind: '$f', math: ['wff', 'ps'], var: 'ps' },
      { label: 'min', kind: '$e', math: ['|-', 'ph'] },
      { label: 'maj', kind: '$e', math: ['|-', '(', 'ph', '->', 'ps', ')'] }
    ]
  };
  const actual = [
    ['wff', 'ch'],
    ['wff', 'th'],
    ['|-', 'ch'],
    ['|-', '(', 'ch', '->', 'th', ')']
  ];
  const r = Expr.applyAssertion(frame, actual);
  assert.ok(r.ok, r.error);
  assert.strictEqual(Expr.toASCII(r.conclusion), '|- th');
  assert.strictEqual(Expr.toASCII(r.sub.ph), 'ch');

  /* $e 不一致必须报错，且错误里带假设 label */
  const bad = actual.slice();
  bad[3] = ['|-', '(', 'ch', '->', 'ch', ')'];
  const r2 = Expr.applyAssertion(frame, bad);
  assert.strictEqual(r2.ok, false);
  assert.match(r2.error, /maj/);

  /* 数量不对必须报错：$f 也是栈操作数 */
  const r3 = Expr.applyAssertion(frame, actual.slice(0, 3));
  assert.strictEqual(r3.ok, false);
  assert.match(r3.error, /arity/);
});

test('31 个 hard label 的证明 DAG 全部存在且自包含校验通过', () => {
  assert.deepStrictEqual(Object.keys(PROOFS).sort(), HARD.slice().sort());
  for (const label of HARD) {
    const proof = PROOFS[label];
    assert.ok(Array.isArray(proof.conclusion) && proof.conclusion.length, label + ' 缺少 conclusion');
    assert.ok(proof.kind === '$p' || proof.kind === '$a', label + ' kind 不合法');
    const r = Verify.verifyProof(proof);
    assert.ok(r.ok, label + ' 校验失败：' + r.errors.join(' | '));
    assert.ok(r.checked > 0 || proof.steps.length === 0, label + ' 没有校验任何步骤');
    /* finalStep 必须是最后一步（剪枝保序） */
    if (proof.steps.length) {
      assert.strictEqual(proof.finalStep, proof.steps[proof.steps.length - 1].id, label + ' finalStep 不是最后一步');
    } else {
      assert.strictEqual(proof.finalStep, null, label + ' 无步骤时 finalStep 应为 null');
    }
    /* stats 与 steps 一致 */
    assert.strictEqual(proof.stats.steps, proof.steps.length, label + ' stats.steps 不一致');
    assert.strictEqual(proof.stats.asserts + proof.stats.hyps, proof.steps.length, label + ' asserts+hyps 不一致');
  }
});

test('公理（$a）目标没有可重放步骤，定理（$p）目标至少一步', () => {
  const axioms = HARD.filter((l) => PROOFS[l].kind === '$a');
  assert.deepStrictEqual(axioms.sort(), ['ax-11', 'ax-pr']);
  for (const label of axioms) {
    assert.strictEqual(PROOFS[label].steps.length, 0, label + ' 是公理，不应有重放步骤');
    assert.strictEqual(PROOFS[label].finalStep, null);
  }
  for (const label of HARD) {
    if (PROOFS[label].kind === '$a') continue;
    assert.ok(PROOFS[label].steps.length > 0, label + ' 是定理，必须有重放步骤');
  }
});

test('篡改 DAG 必须被校验抓住（不能静默通过）', () => {
  const proof = JSON.parse(JSON.stringify(PROOFS['pm3.24']));
  const last = proof.steps[proof.steps.length - 1];
  last.conclusion = ['|-', '-.', 'ph'];
  const r = Verify.verifyProof(proof);
  assert.strictEqual(r.ok, false);
  assert.ok(r.errors.length > 0, '篡改后应有错误');

  /* 删掉一个被引用的步骤也必须失败 */
  const proof2 = JSON.parse(JSON.stringify(PROOFS['pm3.24']));
  proof2.steps.pop();
  const r2 = Verify.verifyProof(proof2);
  assert.strictEqual(r2.ok, false);
});

test('31 个重放关卡：目标来自 set.mm 结论、引用合法、顺序稳定', () => {
  assert.strictEqual(LEVELS.length, 31);
  const ids = new Set();
  LEVELS.forEach((level, i) => {
    assert.strictEqual(level.id, 'MM-' + String(i + 1).padStart(2, '0'), 'id 必须连续编号');
    assert.ok(!ids.has(level.id), '重复关卡 id ' + level.id);
    ids.add(level.id);
    assert.strictEqual(level.mode, 'mm-proof');
    assert.strictEqual(level.chapter, 'mm');
    assert.strictEqual(level.band, 'mm');
    assert.strictEqual(level.requires.length, 0, level.id + ' 不参与原有解锁链');
    assert.strictEqual(level.order, i + 1);

    const proof = PROOFS[level.proofId];
    assert.ok(proof, level.id + ' 引用了不存在的证明 ' + level.proofId);
    assert.deepStrictEqual(level.targetTokens, proof.conclusion, level.id + ' 目标公式必须等于 set.mm 结论');
    assert.strictEqual(level.targetUnicode, Expr.toUnicode(proof.conclusion), level.id + ' targetUnicode 不一致');
    assert.strictEqual(level.axiom, proof.kind === '$a');
    assert.strictEqual(level.stats.steps, proof.stats.steps);
    assert.ok(level.title && level.title.length <= 14, level.id + ' 缺少中文短名');
    assert.ok(level.code && level.code === level.proofId);
  });
  /* 31 个 label 全部覆盖，一个不重 */
  assert.strictEqual(
    LEVELS.map((l) => l.code).sort().join(','),
    HARD.slice().sort().join(','),
    '关卡覆盖的 label 与 31 个 hard label 不一致'
  );
});

test('证明数据体积远低于 2MB 上限（docs/MM-REPLAY.md §5）', () => {
  const bytes = Buffer.byteLength(JSON.stringify(PROOFS), 'utf8');
  assert.ok(bytes < 2 * 1024 * 1024, 'proofs.js 超限：' + bytes);
  /* 单关最大步骤数在可折叠范围内（>800 应只做导出报告） */
  const maxSteps = Math.max.apply(null, LEVELS.map((l) => l.stats.steps));
  assert.ok(maxSteps <= 800, '单关步骤过多，需要降级：' + maxSteps);
});

test('flag 关闭时 Catalog 仍是 240 关；开启时追加 31 关且不动原有解锁链', () => {
  const Catalog = RSL.Catalog;
  const before = Catalog.build().map((l) => ({
    id: l.id, requires: l.requires.slice(), chapter: l.chapter, band: l.band, chapterGroup: l.chapterGroup
  }));
  assert.strictEqual(before.length, 240);
  assert.ok(!before.some((l) => l.id.startsWith('MM-')), 'flag 关闭时不应出现重放关');

  RSL.MM.Flags.set(true);
  const after = Catalog.build();
  assert.strictEqual(after.length, 271);
  /* 原有 240 关逐字段不变（只比较解锁链/章节/分段） */
  for (let i = 0; i < 240; i += 1) {
    assert.strictEqual(after[i].id, before[i].id);
    assert.deepStrictEqual(after[i].requires, before[i].requires);
    assert.strictEqual(after[i].chapter, before[i].chapter);
    assert.strictEqual(after[i].band, before[i].band);
  }
  const mm = after.slice(240);
  assert.strictEqual(mm.length, 31);
  assert.ok(mm.every((l) => l.chapterGroup === 'MM' && l.requires.length === 0));
  RSL.MM.Flags.set(false);
});

test('重放关不计入 240 关的成就体系', () => {
  const A = RSL.Achievements;
  const empty = () => ({ bestLen: {}, usedKinds: {}, cleanWins: {}, solved: {} });

  /* 只通关 3 个重放关：不应解锁“通电 / 三关”等任何成就 */
  RSL.MM.Flags.set(true);
  const levels = RSL.Catalog.build();
  const onlyMm = empty();
  onlyMm.levels = levels;
  onlyMm.solved = { 'MM-01': true, 'MM-02': true, 'MM-03': true };
  assert.strictEqual(A.evaluate(onlyMm).join(','), '', '重放关不能刷成就');

  /* 通关 1 个普通关仍然解锁“通电” */
  const board = empty();
  board.levels = levels;
  board.solved = { 'MM-01': true, 'CH1-01': true };
  assert.ok(A.evaluate(board).indexOf('first') >= 0, '普通关仍正常解锁成就');
  RSL.MM.Flags.set(false);
});
