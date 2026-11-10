'use strict';
/* 新关卡体系的核心校验：153 关、统一 schema、参考证明全部通过真实引擎、定理只引用更早关卡。 */
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
    'src/achievements.js', 'src/save.js', 'src/catalog.js'
  ]
});

test('运行时只加载新体系的脚本（无 archive/mm/logic 生成物）', () => {
  const joined = scripts.join(',');
  assert.ok(!joined.includes('archive.js'));
  assert.ok(!joined.includes('levels-generated.js'));
  assert.ok(!joined.includes('mm/'));
  assert.ok(!joined.includes('logic.js'));
  assert.ok(joined.includes('term.js') && joined.includes('modules.js') && joined.includes('engine.js'));
});

test('模块注册表：构造 + 公理 + 基本推理 + 定理，没有旧模块', () => {
  const kinds = Object.keys(RSL.Modules.MODULES);
  ['atom', 'term', 'pred', 'not', 'imp', 'all'].forEach((k) => assert.ok(kinds.includes(k), k));
  assert.ok(kinds.includes('axiom'));
  ['subst', 'mp', 'gen', 'shift', 'exists-elim', 'leibniz', 'eq-refl'].forEach((k) => assert.ok(kinds.includes(k), k));
  assert.ok(kinds.includes('theorem'));
  ['archive', 'replace', 'syllogism', 'detach'].forEach((k) => {
    assert.ok(!kinds.includes(k), '不应再有旧模块 ' + k);
  });
  ['exists', 'mem', 'and', 'or', 'iff', 'exists-elim',
    'and-intro-ax', 'and-elim-ax', 'or-intro-ax', 'or-elim-ax', 'iff-intro-ax', 'iff-elim-ax',
    'set-ext', 'set-empty', 'set-pair', 'set-union'].forEach((k) => {
    assert.ok(kinds.includes(k), '缺少新模块 ' + k);
  });
});

test('153 关 = 39 普通引理 + 96 困难关 + 18 教学关，每关有 canonical targetTokens / palette / 参考电路', () => {
  const levels = RSL.LEVELS;
  assert.strictEqual(levels.length, 153);
  const numbered = levels.filter((lv) => !lv.tutorial);
  const tutorials = levels.filter((lv) => lv.tutorial);
  assert.strictEqual(numbered.length, 135);
  assert.strictEqual(tutorials.length, 18);
  for (let c = 0; c < 4; c += 1) {
    assert.strictEqual(numbered.filter((lv) => lv.chapter === c).length, c === 0 ? 33 : 34, '章 ' + (c + 1));
    const tut = tutorials.filter((lv) => lv.chapter === c);
    assert.ok(tut.length >= 4 && tut.length <= 6, '每章 4–6 个教学关');
    const labels = tut.map((lv) => lv.code);
    assert.strictEqual(new Set(labels).size, labels.length, '教学关标签唯一');
  }
  numbered.forEach((lv) => {
    assert.ok(/^[ⅠⅡⅢⅣ]-\d{2}$/.test(lv.code), lv.id + ' 章节-序号代号');
    if (!lv.hard) {
      assert.ok(lv.solution.nodes.length >= 5, lv.code + ' 普通关至少 5 个元件');
      assert.ok(lv.solution.nodes.length <= 20, lv.code + ' 普通关不超过 20 个元件');
    }
  });
  tutorials.forEach((lv) => {
    assert.strictEqual(lv.no, null, lv.id + ' 教学关不占编号');
    assert.ok(/^[ivx]+$/.test(lv.code), lv.id + ' 小写罗马数字');
    assert.ok(lv.tip && lv.tip.code && lv.tip.flow, lv.id + ' 教学浮窗提示');
    assert.ok(lv.stats.steps <= 20, lv.id + ' 教学关保持短小（≤20 步）');
  });
  levels.forEach((lv) => {
    assert.ok(Array.isArray(lv.targetTokens) && lv.targetTokens[0] === '|-', lv.id + ' 目标断言');
    assert.ok(Array.isArray(lv.palette) && lv.palette.length > 0, lv.id + ' palette');
    assert.ok(lv.solution && lv.solution.nodes.length > 0, lv.id + ' 参考证明');
    assert.ok(lv.initialNodes.some((n) => n.kind === 'target'), lv.id + ' 目标焊盘');
    (lv.palette || []).forEach((e) => {
      if (e.kind === 'theorem') {
        assert.ok(!lv.tutorial, lv.code + ' 教学关不能引用定理');
        assert.ok(e.config.code, lv.code + ' 定理引用带章节编号');
        assert.ok(levels.findIndex((x) => x.code === e.config.code) < levels.indexOf(lv), lv.code + ' 定理引用必须更早');
      }
    });
  });
});

test('153 关参考证明全部通过真实引擎（逐节点求值）', () => {
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
  assert.deepStrictEqual(failures, []);
});

test('定理引用越界会被引擎拒绝（只能引用更早关卡）', () => {
  const lv = RSL.LEVELS.filter((x) => !x.tutorial)[0];
  const nodes = [{ id: 't', kind: 'target', x: 0, y: 0, targetTokens: lv.targetTokens, config: {} },
    { id: 'x', kind: 'theorem', x: 0, y: 0, config: { code: lv.code }, targetTokens: [] }];
  const res = RSL.Engine.evaluate(lv, nodes, [], { levels: RSL.LEVELS, levelIndex: RSL.LEVELS.indexOf(lv) });
  assert.ok(res.errors.some((e) => /更早|前面/.test(e.message)), JSON.stringify(res.errors));
});
