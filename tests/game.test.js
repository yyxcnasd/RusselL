'use strict';
/* 核心校验：152 关 = 16 教学 + 40 普通 + 96 困难；
 * 每章 4 教学 + 10 普通（5–21 模块）+ 24 困难（≤200 模块、hint=null）；
 * 全部参考解通过真实 Engine；定理只引用更早关卡；模块表无派生连接词公理。
 * 契约：docs/LEVEL-REDESIGN-PLAN.md。
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { loadRuntime } = require('../scripts/lib/load-runtime');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scripts = Array.from(html.matchAll(/<script src="src\/([^"]+)"/g)).map((m) => 'src/' + m[1]);
const RSL = loadRuntime({
  files: [
    'src/term.js', 'src/levels.js', 'src/campaign-meta.js',
    'src/modules.js', 'src/engine.js', 'src/wire.js',
    'src/achievements.js', 'src/save.js', 'src/catalog.js',
  ],
});

const EXPECTED = {
  total: 152,
  tutorials: 16,
  base: 40,
  challenge: 96,
  perChapterBase: 10,
  perChapterChallenge: 24,
  perChapterTutorials: 4,
};
const CHAPTERS = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'];
const LEGACY_DERIVED = ['and-intro-ax', 'and-elim-ax', 'or-intro-ax', 'or-elim-ax', 'iff-intro-ax', 'iff-elim-ax'];
const CONSTRUCT_KINDS = ['atom', 'term', 'pred', 'not', 'imp', 'all', 'exists', 'mem', 'and', 'or', 'iff'];

test('运行时只加载新体系的脚本', () => {
  const joined = scripts.join(',');
  ['archive.js', 'levels-generated.js', 'mm/', 'logic.js'].forEach((bad) => assert.ok(!joined.includes(bad), '不应加载 ' + bad));
  ['term.js', 'modules.js', 'engine.js', 'levels.js'].forEach((good) => assert.ok(joined.includes(good), '缺少 ' + good));
});

test('模块表：构造 + A1–A5 + 基本推理 + D 定义重写 + 定理，无派生连接词公理', () => {
  const kinds = Object.keys(RSL.Modules.MODULES);
  CONSTRUCT_KINDS.forEach((k) => assert.ok(kinds.includes(k), '缺少构造模块 ' + k));
  ['axiom', 'subst', 'mp', 'gen', 'shift', 'all-inst', 'exists-gen', 'exists-elim', 'leibniz', 'eq-refl',
    'def-expand', 'def-contract', 'theorem', 'set-ext', 'set-empty', 'set-pair', 'set-union'].forEach((k) => {
    assert.ok(kinds.includes(k), '缺少模块 ' + k);
  });
  LEGACY_DERIVED.forEach((k) => assert.ok(!kinds.includes(k), '派生公理必须删除：' + k));
  ['A1', 'A2', 'A3', 'A4', 'A5'].forEach((s) => assert.ok(RSL.Modules.AXIOMS[s], '缺少公理 ' + s));
  ['def-expand', 'def-contract'].forEach((k) => {
    assert.strictEqual(RSL.Modules.isConstruct(k), false, k + ' 不能是构造模块');
    const info = RSL.Modules.info(k);
    assert.strictEqual(JSON.stringify(info.ports.inputs.map((p) => p.id)), JSON.stringify(['assertion']));
    assert.strictEqual(info.ports.inputs[0].type, 'assertion');
  });
});

test('D 定义重写 API：expand/contract 幂等、互逆、不改变 T.eq 语义', () => {
  const T = RSL.Term;
  const surface = ['|-', '(', 'P', '/\\', 'Q', ')'];
  const expanded = T.expandDefinitions(surface);
  assert.ok(!expanded.includes('/\\'));
  assert.ok(T.eq(expanded, surface));
  assert.strictEqual(JSON.stringify(T.expandDefinitions(expanded)), JSON.stringify(expanded));
  assert.strictEqual(JSON.stringify(T.contractDefinitions(expanded)), JSON.stringify(surface));
  assert.throws(() => RSL.Modules.apply('def-contract', { assertion: ['wff', 'P'] }, {}, {}), /断言/);
});

test('152 关 = 16 教学 + 40 普通 + 96 困难；每章 4 教学 + 10 普通 + 24 困难', () => {
  const levels = RSL.LEVELS;
  assert.strictEqual(levels.length, EXPECTED.total, '总关数');
  const tutorials = levels.filter((lv) => lv.tutorial);
  const numbered = levels.filter((lv) => !lv.tutorial);
  assert.strictEqual(tutorials.length, EXPECTED.tutorials, '教学关数');
  assert.strictEqual(numbered.length, EXPECTED.base + EXPECTED.challenge, '主线关数');
  assert.strictEqual(numbered.filter((lv) => !lv.hard).length, EXPECTED.base, '普通关数');
  assert.strictEqual(numbered.filter((lv) => lv.hard).length, EXPECTED.challenge, '困难关数');
  assert.strictEqual(levels.filter((lv) => lv.band === 'lemma').length, 0, '不应再有 lemma 带');
  CHAPTERS.forEach((g) => {
    const inCh = levels.filter((lv) => lv.chapterGroup === g);
    assert.strictEqual(inCh.filter((lv) => lv.tutorial).length, EXPECTED.perChapterTutorials, g + ' 教学关数');
    assert.strictEqual(inCh.filter((lv) => !lv.tutorial && !lv.hard).length, EXPECTED.perChapterBase, g + ' 普通关数');
    assert.strictEqual(inCh.filter((lv) => lv.hard).length, EXPECTED.perChapterChallenge, g + ' 困难关数');
  });
  /* 编号：教学关小写罗马数字；编号关 X-NN，每章 01–34 连续 */
  tutorials.forEach((lv) => assert.ok(/^[ⅠⅡⅢⅣ]-[ivx]+$/.test(lv.code), lv.code + ' 教学关代号'));
  CHAPTERS.forEach((g) => {
    const codes = numbered.filter((lv) => lv.chapterGroup === g).map((lv) => lv.code);
    assert.strictEqual(JSON.stringify(codes), JSON.stringify(Array.from({ length: 34 }, (_, i) => g + '-' + String(i + 1).padStart(2, '0'))), g + ' 章编号连续');
  });
  const ids = levels.map((lv) => lv.id);
  assert.strictEqual(new Set(ids).size, ids.length, 'id 唯一');
});

test('每关 schema：普通 5–21 模块 + mustUse，困难 hint=null，教学 tip，定理只引用更早关卡', () => {
  const levels = RSL.LEVELS;
  levels.forEach((lv) => {
    assert.ok(Array.isArray(lv.targetTokens) && lv.targetTokens[0] === '|-', lv.code + ' targetTokens');
    assert.ok(Array.isArray(lv.palette) && lv.palette.length > 0, lv.code + ' palette');
    assert.ok(lv.solution && lv.solution.nodes.length > 0, lv.code + ' 参考解');
    assert.ok(lv.initialNodes.some((n) => n.kind === 'target'), lv.code + ' 目标焊盘');
    if (lv.tutorial) {
      assert.strictEqual(lv.no, null, lv.code + ' 教学关不占编号');
      assert.ok(lv.tip && lv.tip.code && lv.tip.flow, lv.code + ' 教学浮窗');
      assert.ok(lv.solution.nodes.length <= 20, lv.code + ' 教学关保持短小');
    } else if (!lv.hard) {
      const n = lv.solution.nodes.length;
      assert.ok(n >= 5 && n <= 21, lv.code + ' 普通关 5–21 模块（实际 ' + n + '）');
      assert.ok(Array.isArray(lv.mustUse) && lv.mustUse.length > 0, lv.code + ' 普通关 mustUse');
    } else {
      assert.ok(lv.solution.nodes.length <= 200, lv.code + ' 困难关 ≤200 模块');
      assert.strictEqual(lv.hint, null, lv.code + ' 困难关 hint=null');
    }
    (lv.palette || []).forEach((e) => {
      LEGACY_DERIVED.forEach((bad) => assert.notStrictEqual(e.kind, bad, lv.code + ' palette 残留 ' + bad));
      if (e.kind === 'theorem') {
        const idx = levels.findIndex((x) => x.code === e.config.code);
        assert.ok(idx >= 0, lv.code + ' 引用了不存在的定理 ' + e.config.code);
        assert.ok(idx < levels.indexOf(lv), lv.code + ' 定理引用必须更早：' + e.config.code);
      }
    });
  });
});

test('152 关参考证明全部通过真实引擎（逐节点求值）', () => {
  const levels = RSL.LEVELS;
  const failures = [];
  levels.forEach((lv) => {
    const nodes = JSON.parse(JSON.stringify(lv.initialNodes)).concat(JSON.parse(JSON.stringify(lv.solution.nodes)));
    const edges = JSON.parse(JSON.stringify(lv.solution.edges));
    const res = RSL.Engine.evaluate(lv, nodes, edges, { levels, levelIndex: levels.indexOf(lv) });
    if (!res.complete) {
      const first = (res.errors || [])[0];
      failures.push(lv.code + '：' + (first ? first.message : '未通关'));
    }
  });
  assert.strictEqual(JSON.stringify(failures), JSON.stringify([]));
});

test('定理引用越界会被引擎拒绝', () => {
  const lv = RSL.LEVELS.filter((x) => !x.tutorial)[0];
  const nodes = [
    { id: 't', kind: 'target', x: 0, y: 0, targetTokens: lv.targetTokens, config: {} },
    { id: 'x', kind: 'theorem', x: 0, y: 0, config: { code: lv.code } },
  ];
  const res = RSL.Engine.evaluate(lv, nodes, [], { levels: RSL.LEVELS, levelIndex: RSL.LEVELS.indexOf(lv) });
  assert.ok(res.errors.some((e) => /更早|前面/.test(e.message)), JSON.stringify(res.errors));
});
