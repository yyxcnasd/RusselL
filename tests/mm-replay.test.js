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

const { HARD_LABELS } = require('../scripts/mm-targets.js');
const HARD = Array.from(HARD_LABELS);

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

test('48 个重放关卡：目标来自 set.mm 结论、按章成组、组内步数升序', () => {
  assert.strictEqual(LEVELS.length, 48);
  assert.strictEqual(HARD.length, 48);

  const ids = new Set();
  const chapters = ['prop', 'pred', 'eq', 'set'];
  const byChapter = {};
  LEVELS.forEach((level, i) => {
    assert.strictEqual(level.id, 'MM-' + String(i + 1).padStart(2, '0'), 'id 必须连续编号');
    assert.ok(!ids.has(level.id), '重复关卡 id ' + level.id);
    ids.add(level.id);
    assert.strictEqual(level.mode, 'mm-proof');
    assert.ok(chapters.indexOf(level.chapter) >= 0, level.id + ' 的 chapter 必须是真实章节');
    assert.strictEqual(level.band, 'replay', level.id + ' 的 band 应为 replay');
    assert.strictEqual(level.requires.length, 0, level.id + ' 生成数据里不预置解锁链');
    assert.strictEqual(level.order, i + 1);
    (byChapter[level.chapter] = byChapter[level.chapter] || []).push(level);

    const proof = PROOFS[level.proofId];
    assert.ok(proof, level.id + ' 引用了不存在的证明 ' + level.proofId);
    assert.deepStrictEqual(level.targetTokens, proof.conclusion, level.id + ' 目标公式必须等于 set.mm 结论');
    assert.strictEqual(level.targetUnicode, Expr.toUnicode(proof.conclusion), level.id + ' targetUnicode 不一致');
    assert.strictEqual(level.axiom, proof.kind === '$a');
    assert.strictEqual(level.stats.steps, proof.stats.steps);
    assert.ok(level.title && level.title.length <= 14, level.id + ' 缺少中文短名');
    assert.ok(level.code && level.code === level.proofId);
  });

  /* 每章 12 关，组内按步数升序，chapterOrder 连续 */
  for (const chapter of chapters) {
    const group = byChapter[chapter] || [];
    assert.strictEqual(group.length, 12, chapter + ' 章应有 12 个重放关');
    group.forEach((level, i) => {
      assert.strictEqual(level.chapterOrder, i + 1, level.id + ' 的 chapterOrder 应为 ' + (i + 1));
      if (i === 0) return;
      assert.ok(
        level.stats.steps >= group[i - 1].stats.steps,
        chapter + ' 章重放段步数应升序：' + group.map((l) => l.stats.steps).join(',')
      );
    });
    /* 首关从最便宜的开始（<= 6 步），末关至少 10 步，保证曲线有跨度 */
    assert.ok(group[0].stats.steps <= 6, chapter + ' 章重放段应从简单目标开始');
    assert.ok(group[group.length - 1].stats.steps >= 10, chapter + ' 章重放段末尾应有难度');
  }

  /* 48 个 label 全部覆盖，一个不重 */
  assert.strictEqual(
    LEVELS.map((l) => l.code).sort().join(','),
    HARD.slice().sort().join(','),
    '关卡覆盖的 label 与目标清单不一致'
  );
});

test('交互式会话：按参考动作能通关，错步可定位，提示按前缀给', () => {
  const proof = PROOFS['pm3.24'];
  const s = Verify.session(proof);
  assert.strictEqual(s.solved(), false);
  assert.strictEqual(s.state().depth, 0);
  assert.strictEqual(s.hint().label, proof.steps[0].label, '空栈时提示第一条参考动作');

  /* 提前应用需要 2 个前提的 wi 必须失败，且错误信息可定位 */
  const bad = s.apply('wi');
  assert.strictEqual(bad.ok, false);
  assert.match(bad.error, /需要 2 个前提/);
  assert.strictEqual(s.state().actions, 0, '失败的动作不进入历史');

  /* 按参考证明的动作序列走完 */
  const actions = Verify.referenceActions(proof);
  assert.strictEqual(actions.length, proof.steps.length);
  for (const a of actions) {
    const r = s.apply(a.label);
    assert.ok(r.ok, a.label + ' 应用失败：' + r.error);
    if (!s.solved()) assert.ok(s.hint().label, '前缀一致时应始终有提示');
  }
  assert.strictEqual(s.solved(), true, '走完参考动作后通关');
  assert.strictEqual(s.state().actions, actions.length);
  assert.strictEqual(s.state().depth, 1, '通关时栈高为 1');

  /* 撤销一步应该退回未通关状态，且提示指向被撤销的动作 */
  assert.strictEqual(s.undo(), true);
  assert.strictEqual(s.solved(), false);
  assert.strictEqual(s.hint().label, actions[actions.length - 1].label);
  assert.strictEqual(s.undo(), true);
  assert.strictEqual(s.state().actions, actions.length - 2);

  /* 重来清空 */
  s.reset();
  assert.strictEqual(s.state().depth, 0);
  assert.strictEqual(s.state().actions, 0);
  assert.strictEqual(s.solved(), false);
});

test('交互式会话：走不同路线时提示明确不可用，不瞎给', () => {
  const proof = PROOFS['pm3.24'];
  const s = Verify.session(proof);
  s.apply('wph');
  s.apply('wph');
  s.apply('wi');       /* 参考证明第 3 步也是 wi，前缀仍一致 */
  assert.strictEqual(s.hint().aligned, true);
  s.apply('wn');       /* 参考第 4 步是 wph，这里偏离 */
  const h = s.hint();
  assert.strictEqual(h.aligned, false);
  assert.strictEqual(h.label, null);
  assert.ok(h.reason.length > 0);
  /* 偏离后仍可继续操作（引擎不强制参考路线） */
  assert.strictEqual(s.state().depth, 1);
  s.undo();
  assert.strictEqual(s.state().depth, 1, '撤销恢复到应用 wn 之前的栈（wi 的结论）');
  assert.strictEqual(s.state().actions, 3);
});

test('交互式会话：公理（$a）无法交互推导，动作集为空', () => {
  const proof = PROOFS['ax-11'];
  const s = Verify.session(proof);
  assert.strictEqual(proof.steps.length, 0);
  assert.strictEqual(s.assertions().length, 0, '公理没有可用断言');
  assert.strictEqual(s.solved(), false);
});

test('证明数据体积远低于 2MB 上限（docs/MM-REPLAY.md §5）', () => {
  const bytes = Buffer.byteLength(JSON.stringify(PROOFS), 'utf8');
  assert.ok(bytes < 2 * 1024 * 1024, 'proofs.js 超限：' + bytes);
  /* 单关最大步骤数在可折叠范围内（>800 应只做导出报告） */
  const maxSteps = Math.max.apply(null, LEVELS.map((l) => l.stats.steps));
  assert.ok(maxSteps <= 800, '单关步骤过多，需要降级：' + maxSteps);
});

test('Catalog：关闭时 240 关；开启时 240 + 48 关并按统一难度交错', () => {
  const Catalog = RSL.Catalog;
  RSL.MM.Flags.set(false);
  const off = Array.from(Catalog.build());
  assert.strictEqual(off.length, 240, '关闭时仍是 240 关');
  assert.ok(!off.some((l) => l.id.indexOf('MM-') === 0), '关闭时不应出现重放关');

  RSL.MM.Flags.set(true);
  const on = Array.from(Catalog.build());
  assert.strictEqual(on.length, 288, '开启时为 240 + 48 关');
  assert.strictEqual(new Set(on.map((l) => l.id)).size, 288, '关卡 id 必须唯一');

  for (const chapter of ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ']) {
    const group = on.filter((l) => l.chapterGroup === chapter);
    assert.strictEqual(group.length, 72, chapter + ' 章应有 72 关');
    assert.strictEqual(group.filter((l) => l.band === 'base').length, 36, chapter + ' 基础段 36');
    assert.strictEqual(group.filter((l) => l.band === 'challenge').length, 36, chapter + ' 挑战段 36');
    const replay = group.filter((l) => l.mode === 'mm-proof');
    assert.strictEqual(replay.length, 12, chapter + ' 章应有 12 个重放关');
    /* 前 12 关是手工/引导关 */
    assert.ok(group.slice(0, 12).every((l) => l.mode !== 'mm-proof'), chapter + ' 前 12 关是手工关');
    /* 从第 13 关起按统一难度单调不减 */
    for (let i = 13; i < group.length; i += 1) {
      assert.ok(group[i].difficulty >= group[i - 1].difficulty - 1e-9,
        chapter + ' 章内难度应单调不减（位置 ' + (i + 1) + '：' + group[i - 1].difficulty + ' → ' + group[i].difficulty + '）');
    }
    /* 重放关交错在接线关之间，而不是独立一段 */
    const idx = [];
    group.forEach((l, i) => { if (l.mode === 'mm-proof') idx.push(i); });
    const contiguous = idx.every((x, i) => i === 0 || x === idx[i - 1] + 1);
    assert.ok(!contiguous, chapter + ' 章的重放关应交错');
    /* 解锁链线性 */
    for (let i = 1; i < group.length; i += 1) {
      assert.strictEqual(JSON.stringify(Array.from(group[i].requires)), JSON.stringify([group[i - 1].id]),
        group[i].id + ' 应依赖前一关');
    }
  }
  /* 第一章首关无前置；第二章首关接第一章基础段末关 */
  const ch1 = on.filter((l) => l.chapterGroup === 'Ⅰ');
  assert.strictEqual(JSON.stringify(Array.from(ch1[0].requires)), '[]', '第一章首关无前置');
  const ch1BaseLast = ch1.filter((l) => l.band === 'base').slice(-1)[0];
  const ch2 = on.filter((l) => l.chapterGroup === 'Ⅱ');
  assert.strictEqual(JSON.stringify(Array.from(ch2[0].requires)), JSON.stringify([ch1BaseLast.id]),
    '第二章首关接第一章基础段末关');
  RSL.MM.Flags.set(true);
});

test('重放关不计入 240 关的成就体系', () => {
  const A = RSL.Achievements;
  const empty = () => ({ bestLen: {}, usedKinds: {}, cleanWins: {}, solved: {} });

  RSL.MM.Flags.set(true);
  const levels = RSL.Catalog.build();
  /* 只通关 3 个重放关：不应解锁“通电 / 三关”等任何成就 */
  const onlyMm = empty();
  onlyMm.levels = levels;
  onlyMm.solved = { 'MM-01': true, 'MM-02': true, 'MM-03': true };
  assert.strictEqual(A.evaluate(onlyMm).join(','), '', '重放关不能刷成就');

  /* 通关 1 个普通关仍然解锁“通电” */
  const board = empty();
  board.levels = levels;
  board.solved = { 'MM-01': true, 'CH1-01': true };
  assert.ok(A.evaluate(board).indexOf('first') >= 0, '普通关仍正常解锁成就');
  RSL.MM.Flags.set(true);
});
