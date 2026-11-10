'use strict';
/* 核心校验：108 关 = 8 教学 + 20 普通（10–30）+ 70 困难（25–100）+ 10 魔王（70–500）。
 * 单章命题演算：不允许谓词/等词/集合论元件或章节字段；目标不重复；
 * 全部参考解通过真实 Engine；定理只引用更早关卡。
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

const EXPECTED = { total: 108, tutorials: 8, base: 20, challenge: 70, demon: 10 };
const PROPOSITIONAL_KINDS = new Set([
  'atom', 'not', 'imp', 'and', 'or', 'iff',
  'axiom', 'subst', 'mp', 'def-expand', 'def-contract', 'theorem',
]);

test('运行时只加载需要的脚本', () => {
  const joined = scripts.join(',');
  ['archive.js', 'levels-generated.js', 'mm/', 'logic.js'].forEach((bad) => {
    assert.ok(!joined.includes(bad), '不应加载 ' + bad);
  });
  ['term.js', 'modules.js', 'engine.js', 'levels.js', 'legacy-targets.js'].forEach((good) => {
    assert.ok(joined.includes(good), '缺少 ' + good);
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

test('108 关 = 8 教学 + 20 普通 + 70 困难 + 10 魔王，且只有一条课程线', () => {
  const levels = RSL.LEVELS;
  assert.strictEqual(levels.length, EXPECTED.total, '总关数');
  const tutorials = levels.filter((lv) => lv.tutorial);
  const numbered = levels.filter((lv) => !lv.tutorial);
  assert.strictEqual(tutorials.length, EXPECTED.tutorials, '教学关数');
  assert.strictEqual(numbered.length, EXPECTED.base + EXPECTED.challenge + EXPECTED.demon, '编号关数');
  assert.strictEqual(numbered.filter((lv) => lv.band === 'base').length, EXPECTED.base, '普通关数');
  assert.strictEqual(numbered.filter((lv) => lv.band === 'challenge').length, EXPECTED.challenge, '困难关数');
  assert.strictEqual(numbered.filter((lv) => lv.band === 'demon').length, EXPECTED.demon, '魔王关数');
  assert.strictEqual(levels.filter((lv) => lv.band === 'lemma').length, 0, '不应再有 lemma 带');
  levels.forEach((lv) => {
    assert.ok(!('chapter' in lv), lv.code + ' 不应有 chapter 字段');
    assert.ok(!('chapterGroup' in lv), lv.code + ' 不应有 chapterGroup 字段');
  });
  assert.ok(!/Ⅰ-|Ⅱ-|Ⅲ-|Ⅳ-|章/.test(levels.map((lv) => lv.title + lv.teaches).join(' ')), '标题里不应出现章节字样');
  assert.strictEqual(JSON.stringify(tutorials.map((lv) => lv.code)),
    JSON.stringify(['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii']), '教学关代号');
  assert.strictEqual(JSON.stringify(numbered.map((lv) => lv.code)),
    JSON.stringify(Array.from({ length: 100 }, (_, i) => String(i).padStart(2, '0'))), '编号 00–99 连续');
  const ids = levels.map((lv) => lv.id);
  assert.strictEqual(new Set(ids).size, ids.length, 'id 唯一');
});

test('每关 schema：普通 10–30 + mustUse，困难 25–100 / 魔王 70–500 + hint=null，教学 tip', () => {
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
    } else if (lv.band === 'base') {
      const n = lv.solution.nodes.length;
      assert.ok(n >= 10 && n <= 30, lv.code + ' 普通关 10–30 模块（实际 ' + n + '）');
      assert.ok(Array.isArray(lv.mustUse) && lv.mustUse.length > 0, lv.code + ' 普通关 mustUse');
    } else if (lv.band === 'challenge') {
      const n = lv.solution.nodes.length;
      assert.ok(n >= 25 && n <= 100, lv.code + ' 困难关 25–100 模块（实际 ' + n + '）');
      assert.strictEqual(lv.hint, null, lv.code + ' 困难关 hint=null');
    } else {
      const n = lv.solution.nodes.length;
      assert.ok(n >= 70 && n <= 500, lv.code + ' 魔王关 70–500 模块（实际 ' + n + '）');
      assert.strictEqual(lv.hint, null, lv.code + ' 魔王关 hint=null');
    }
    (lv.palette || []).forEach((e) => {
      assert.ok(PROPOSITIONAL_KINDS.has(e.kind), lv.code + ' 出现非命题元件 ' + e.kind);
      if (e.kind === 'theorem') {
        const idx = levels.findIndex((x) => x.code === e.config.code);
        assert.ok(idx >= 0, lv.code + ' 引用了不存在的定理 ' + e.config.code);
        assert.ok(idx < levels.indexOf(lv), lv.code + ' 定理引用必须更早：' + e.config.code);
      }
    });
  });
});

test('目标公式不重复（定义展开后比较）', () => {
  const levels = RSL.LEVELS;
  const seen = new Map();
  levels.forEach((lv) => {
    const key = RSL.Term.key(lv.targetTokens.slice(1));
    assert.ok(!seen.has(key), '重复目标：' + seen.get(key) + ' / ' + lv.code);
    seen.set(key, lv.code);
  });
});

test('困难/魔王模块数整体上升，且不超过 500', () => {
  const hard = RSL.LEVELS.filter((lv) => lv.band === 'challenge');
  const sizes = hard.map((lv) => lv.solution.nodes.length);
  assert.ok(Math.min.apply(null, sizes) >= 25, '困难关最小模块数');
  assert.ok(Math.max.apply(null, sizes) <= 100, '困难关最大模块数');
  assert.ok(Math.max.apply(null, sizes) > Math.min.apply(null, sizes), '困难关应有明显跨度');
  let inversions = 0;
  for (let i = 1; i < sizes.length; i += 1) if (sizes[i] < sizes[i - 1]) inversions += 1;
  assert.ok(inversions <= 8, '困难关倒挂过多：' + inversions);
  const demon = RSL.LEVELS.filter((lv) => lv.band === 'demon').map((lv) => lv.solution.nodes.length);
  assert.ok(Math.min.apply(null, demon) >= 70 && Math.max.apply(null, demon) <= 500, '魔王关 70–500');
});

test('教学浮窗只含代号/规则式，不含中文', () => {
  RSL.LEVELS.filter((lv) => lv.tutorial).forEach((lv) => {
    const text = String(lv.tip.code || '') + ' ' + String(lv.tip.flow || '');
    assert.ok(!/[\u4e00-\u9fa5]/.test(text), lv.code + ' 教学浮窗含中文：' + text);
  });
});

test('108 关参考证明全部通过真实引擎（逐节点求值）', () => {
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
