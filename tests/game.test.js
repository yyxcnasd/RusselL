'use strict';
/* 新关卡体系的核心校验：96 关、统一 schema、参考证明全部通过真实引擎、*NN 只引用更早关卡。 */
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
    'src/modules.js', 'src/engine.js', 'src/route.js',
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

test('模块注册表：6 构造 + 1 公理 + 基本推理 + 定理，没有旧模块', () => {
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

test('115 关 = 96 主线（4 章 × 24）+ 19 教学关，每关有 canonical targetTokens / palette / 参考电路', () => {
  const levels = RSL.LEVELS;
  assert.strictEqual(levels.length, 115);
  const numbered = levels.filter((lv) => !lv.tutorial);
  const tutorials = levels.filter((lv) => lv.tutorial);
  assert.strictEqual(numbered.length, 96);
  assert.strictEqual(tutorials.length, 19);
  for (let c = 0; c < 4; c += 1) {
    assert.strictEqual(numbered.filter((lv) => lv.chapter === c).length, 24, '章 ' + (c + 1));
    const tut = tutorials.filter((lv) => lv.chapter === c);
    assert.ok(tut.length >= 4 && tut.length <= 6, '每章 4–6 个教学关');
    const labels = tut.map((lv) => lv.code);
    assert.strictEqual(new Set(labels).size, labels.length, '教学关标签唯一');
  }
  numbered.forEach((lv, i) => {
    assert.strictEqual(lv.no, i + 1, lv.id + ' 主线关卡号连续');
    assert.strictEqual(lv.code, '*' + String(lv.no).padStart(2, '0'), lv.id + ' 代号 *NN');
  });
  tutorials.forEach((lv) => {
    assert.strictEqual(lv.no, null, lv.id + ' 教学关不占编号');
    assert.ok(/^[ivx]+$/.test(lv.code), lv.id + ' 小写罗马数字');
  });
  levels.forEach((lv) => {
    assert.ok(Array.isArray(lv.targetTokens) && lv.targetTokens[0] === '|-', lv.id + ' 目标断言');
    assert.ok(Array.isArray(lv.palette) && lv.palette.length > 0, lv.id + ' palette');
    assert.ok(lv.solution && lv.solution.nodes.length > 0, lv.id + ' 参考证明');
    assert.ok(lv.initialNodes.some((n) => n.kind === 'target'), lv.id + ' 目标焊盘');
    (lv.palette || []).forEach((e) => {
      if (e.kind === 'theorem') {
        assert.ok(!lv.tutorial, lv.code + ' 教学关不能引用定理');
        assert.ok(e.config.n < lv.no, lv.code + ' 定理引用必须更早');
      }
    });
  });
});

test('115 关参考证明全部通过真实引擎（逐节点求值）', () => {
  const levels = RSL.LEVELS;
  const failures = [];
  levels.forEach((lv) => {
    const nodes = JSON.parse(JSON.stringify(lv.initialNodes)).concat(JSON.parse(JSON.stringify(lv.solution.nodes)));
    const edges = JSON.parse(JSON.stringify(lv.solution.edges));
    const res = RSL.Engine.evaluate(lv, nodes, edges, { levels, levelNo: lv.no });
    if (!res.complete) {
      const first = (res.errors || [])[0];
      failures.push(lv.code + '：' + (first ? first.message : '未通关'));
    }
  });
  assert.deepStrictEqual(failures, []);
});

test('定理引用越界会被引擎拒绝（*NN 只能引用更早关卡）', () => {
  const lv = RSL.LEVELS.filter((x) => !x.tutorial)[0];
  const nodes = [{ id: 't', kind: 'target', x: 0, y: 0, targetTokens: lv.targetTokens, config: {} },
    { id: 'x', kind: 'theorem', x: 0, y: 0, config: { n: 96 }, targetTokens: [] }];
  const res = RSL.Engine.evaluate(lv, nodes, [], { levels: RSL.LEVELS, levelNo: 1 });
  assert.ok(res.errors.some((e) => /更早/.test(e.message)), JSON.stringify(res.errors));
});
