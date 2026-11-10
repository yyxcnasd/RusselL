'use strict';
/* 新关卡体系的核心校验：166 关（21 教学 + 40 普通 + 9 引理 + 96 困难）、
 * 统一 schema、参考证明全部通过真实引擎、定理只引用更早关卡、
 * ∧/∨/↔/∃ 不再有派生公理模块而只有 D 定义重写。
 * 契约：docs/LOGIC-REDESIGN.md §2/§3/§4/§7。 */
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

/* 契约 §3/§7 的布局：教学 → 10 普通 →（第Ⅰ章）9 引理 → 24 困难/章。
 * 数字集中在 EXPECTED；src/levels.js 重生成后按实际值核对这几个常量。
 * 21 教学 = 第Ⅰ章 i–viii（8）+ 第Ⅱ章 i–v（5）+ 第Ⅲ/Ⅳ章各 i–iv（4+4）。 */
const EXPECTED = {
  total: 166,
  tutorials: 21,
  base: 40,
  lemma: 9,
  challenge: 96
};
const CHAPTERS = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'];
const LEMMA_CODES = Array.from({ length: EXPECTED.lemma }, (_, i) => 'Ⅰ-' + String(11 + i).padStart(2, '0'));
const LEGACY_DERIVED = [
  'and-intro-ax', 'and-elim-ax', 'or-intro-ax',
  'or-elim-ax', 'iff-intro-ax', 'iff-elim-ax'
];
const CONSTRUCT_KINDS = ['atom', 'term', 'pred', 'not', 'imp', 'all', 'exists', 'mem', 'and', 'or', 'iff'];

const pad = (n) => String(n).padStart(2, '0');
const codeRange = (group, from, to) => {
  const out = [];
  for (let i = from; i <= to; i += 1) out.push(group + '-' + pad(i));
  return out;
};
const isLemma = (lv) => LEMMA_CODES.indexOf(lv.code) >= 0;

/* vm 上下文里的数组与宿主数组原型不同，deepStrictEqual 会因 realm 差异失败；
 * 这里统一按 JSON 结构比较，既避开 realm 问题，报错信息也仍是可读的 token 串。 */
const sameJSON = (actual, expected, message) => {
  assert.strictEqual(JSON.stringify(actual), JSON.stringify(expected), message);
};

test('运行时只加载新体系的脚本（无 archive/mm/logic 生成物）', () => {
  const joined = scripts.join(',');
  assert.ok(!joined.includes('archive.js'));
  assert.ok(!joined.includes('levels-generated.js'));
  assert.ok(!joined.includes('mm/'));
  assert.ok(!joined.includes('logic.js'));
  assert.ok(joined.includes('term.js') && joined.includes('modules.js') && joined.includes('engine.js'));
});

test('模块表：构造 + A1–A5 + 基本推理 + D 定义重写 + 定理，6 个派生公理已删除', () => {
  const kinds = Object.keys(RSL.Modules.MODULES);
  CONSTRUCT_KINDS.forEach((k) => assert.ok(kinds.includes(k), '缺少构造模块 ' + k));
  assert.ok(kinds.includes('axiom'), '缺少公理模块');
  ['subst', 'mp', 'gen', 'shift', 'all-inst', 'exists-gen', 'exists-elim', 'leibniz', 'eq-refl'].forEach((k) => {
    assert.ok(kinds.includes(k), '缺少基本推理模块 ' + k);
  });
  ['def-expand', 'def-contract', 'theorem', 'set-ext', 'set-empty', 'set-pair', 'set-union'].forEach((k) => {
    assert.ok(kinds.includes(k), '缺少模块 ' + k);
  });
  ['archive', 'replace', 'syllogism', 'detach'].forEach((k) => {
    assert.ok(!kinds.includes(k), '不应再有旧模块 ' + k);
  });
  LEGACY_DERIVED.forEach((k) => {
    assert.ok(!kinds.includes(k), '派生公理必须删除：' + k);
  });
  ['A1', 'A2', 'A3', 'A4', 'A5'].forEach((schema) => {
    assert.ok(RSL.Modules.AXIOMS[schema], '缺少公理图式 ' + schema);
  });

  /* D 是“断言 → 断言”的定义重写：不是构造器，也不是公理。 */
  ['def-expand', 'def-contract'].forEach((k) => {
    assert.strictEqual(RSL.Modules.isConstruct(k), false, k + ' 不能是构造模块');
    const info = RSL.Modules.info(k);
    sameJSON(info.ports.inputs.map((p) => p.id), ['assertion'], k + ' 输入端口');
    sameJSON(info.ports.outputs.map((p) => p.id), ['out'], k + ' 输出端口');
    assert.strictEqual(info.ports.inputs[0].type, 'assertion', k + ' 输入必须是断言');
    assert.strictEqual(info.ports.outputs[0].type, 'assertion', k + ' 输出必须是断言');
  });
});

test('D 定义重写 API：expand/contract 幂等、互逆、不改变 T.eq 语义、不放行 wff', () => {
  const T = RSL.Term;
  assert.strictEqual(typeof T.expandDefinitions, 'function', '缺少 T.expandDefinitions');
  assert.strictEqual(typeof T.contractDefinitions, 'function', '缺少 T.contractDefinitions');

  const surface = ['|-', '(', 'P', '/\\', 'Q', ')'];
  const expanded = T.expandDefinitions(surface);
  assert.ok(
    !expanded.includes('/\\') && !expanded.includes('\\/') && !expanded.includes('<->'),
    '展开后只能剩原始符号：' + JSON.stringify(expanded)
  );
  assert.ok(T.eq(expanded, surface), '定义展开不改变 T.eq 语义');
  sameJSON(T.expandDefinitions(expanded), expanded, '展开幂等');
  sameJSON(T.contractDefinitions(expanded), surface, '收缩回到表面语法');
  sameJSON(T.contractDefinitions(surface), surface, '表面语法收缩幂等');

  ['\\/', '<->'].forEach((op) => {
    const tokens = ['|-', '(', 'P', op, 'Q', ')'];
    sameJSON(T.contractDefinitions(T.expandDefinitions(tokens)), tokens, op + ' 展开/收缩往返');
  });

  ['def-expand', 'def-contract'].forEach((k) => {
    assert.throws(() => RSL.Modules.apply(k, { assertion: ['wff', 'P'] }, {}, {}), /断言/, k + ' 只接受 ⊢ 断言');
    assert.throws(() => RSL.Modules.apply(k, {}, {}, {}), /等待/, k + ' 缺输入时是 idle 而不是凭空产出');
  });
});

test('166 关布局：21 教学 + 40 普通 + 9 引理 + 96 困难，编号与 band 固定', () => {
  const levels = RSL.LEVELS;
  assert.strictEqual(levels.length, EXPECTED.total, '总关数');
  const tutorials = levels.filter((lv) => lv.tutorial);
  const numbered = levels.filter((lv) => !lv.tutorial);
  assert.strictEqual(tutorials.length, EXPECTED.tutorials, '教学关数');
  assert.strictEqual(numbered.length, EXPECTED.base + EXPECTED.lemma + EXPECTED.challenge, '主线关数');

  const base = numbered.filter((lv) => !lv.hard && !isLemma(lv));
  const lemma = numbered.filter(isLemma);
  const challenge = numbered.filter((lv) => lv.hard);
  assert.strictEqual(base.length, EXPECTED.base, '普通关数');
  assert.strictEqual(lemma.length, EXPECTED.lemma, '引理关数');
  assert.strictEqual(challenge.length, EXPECTED.challenge, '困难关数');

  /* band=lemma 的集合必须正好是契约 §3 的 9 关，不能多也不能少。 */
  const bandLemma = levels.filter((lv) => lv.band === 'lemma').map((lv) => lv.code).sort();
  sameJSON(bandLemma, LEMMA_CODES.slice().sort(), 'band=lemma 的关卡集合');

  /* 每章 10 普通 + 24 困难；第Ⅰ章额外 9 引理并重编号 Ⅰ-20…Ⅰ-43。 */
  CHAPTERS.forEach((group, c) => {
    const inChapter = numbered.filter((lv) => lv.chapter === c);
    const baseCh = inChapter.filter((lv) => !lv.hard && !isLemma(lv));
    const lemmaCh = inChapter.filter(isLemma);
    const hardCh = inChapter.filter((lv) => lv.hard);
    assert.strictEqual(baseCh.length, 10, group + ' 章普通关数');
    assert.strictEqual(hardCh.length, 24, group + ' 章困难关数');
    sameJSON(baseCh.map((lv) => lv.code).sort(), codeRange(group, 1, 10), group + ' 章普通关编号');
    if (c === 0) {
      assert.strictEqual(lemmaCh.length, 9, '第Ⅰ章引理关数');
      sameJSON(lemmaCh.map((lv) => lv.code).sort(), LEMMA_CODES.slice().sort(), '第Ⅰ章引理关编号');
      sameJSON(hardCh.map((lv) => lv.code).sort(), codeRange(group, 20, 43), '第Ⅰ章困难关编号 Ⅰ-20…Ⅰ-43');
    } else {
      assert.strictEqual(lemmaCh.length, 0, group + ' 章不应有引理关');
      sameJSON(hardCh.map((lv) => lv.code).sort(), codeRange(group, 11, 34), group + ' 章困难关编号');
    }
  });

  /* 教学关：不占编号、小写罗马数字、短小、代号章内唯一。 */
  tutorials.forEach((lv) => {
    assert.strictEqual(lv.no, null, lv.id + ' 教学关不占编号');
    assert.ok(/^[ivx]+$/.test(lv.code), lv.id + ' 小写罗马数字');
    assert.ok(!lv.hard, lv.id + ' 教学关不是困难关');
    assert.ok(lv.tip && lv.tip.code && lv.tip.flow, lv.id + ' 教学浮窗提示');
    assert.ok(!lv.stats || lv.stats.steps <= 20, lv.id + ' 教学关保持短小（≤20 步）');
    assert.ok(lv.chapter >= 0 && lv.chapter < 4, lv.id + ' 章节');
  });
  CHAPTERS.forEach((group, c) => {
    const tut = tutorials.filter((lv) => lv.chapter === c);
    assert.ok(tut.length >= 4 && tut.length <= 12, group + ' 章教学关数量合理');
    const codes = tut.map((lv) => lv.code);
    assert.strictEqual(new Set(codes).size, codes.length, group + ' 章教学关代号唯一');
  });
});

test('每关 schema：普通关 5–20 元件 + mustUse，引理关 band/mustUse 例外，困难关 hint=null，定理只引用更早关卡', () => {
  const levels = RSL.LEVELS;
  const indexOf = new Map(levels.map((lv, i) => [lv.code, i]));

  levels.forEach((lv, i) => {
    const lemma = isLemma(lv);
    const base = !lv.tutorial && !lv.hard && !lemma;
    const hard = !lv.tutorial && lv.hard;

    assert.ok(Array.isArray(lv.targetTokens) && lv.targetTokens[0] === '|-', lv.code + ' 目标断言');
    assert.ok(Array.isArray(lv.palette) && lv.palette.length > 0, lv.code + ' palette');
    assert.ok(lv.solution && Array.isArray(lv.solution.nodes) && lv.solution.nodes.length > 0, lv.code + ' 参考证明');
    assert.ok((lv.initialNodes || []).some((n) => n.kind === 'target'), lv.code + ' 目标焊盘');

    /* 6 个派生公理不得再出现在 palette 或参考解里（迁移后的关卡只能引用引理关定理）。 */
    (lv.palette || []).forEach((entry) => {
      assert.ok(!LEGACY_DERIVED.includes(entry.kind), lv.code + ' palette 仍含派生公理 ' + entry.kind);
    });
    (lv.solution.nodes || []).forEach((node) => {
      assert.ok(!LEGACY_DERIVED.includes(node.kind), lv.code + ' 参考解仍含派生公理 ' + node.kind);
    });

    /* 定理引用（palette 与参考解）都必须指向数组里更早的关卡；教学关不再禁止引用定理。 */
    const theoremRefs = [];
    (lv.palette || []).forEach((entry) => {
      if (entry.kind === 'theorem') theoremRefs.push({ where: 'palette', ref: entry.config && entry.config.code });
    });
    (lv.solution.nodes || []).forEach((node) => {
      if (node.kind === 'theorem') theoremRefs.push({ where: 'solution', ref: node.config && node.config.code });
    });
    theoremRefs.forEach((item) => {
      assert.ok(item.ref, lv.code + ' ' + item.where + ' 的定理引用缺少编号');
      const at = indexOf.get(item.ref);
      assert.notStrictEqual(at, undefined, lv.code + ' ' + item.where + ' 引用了不存在的关卡 ' + item.ref);
      assert.ok(at < i, lv.code + ' ' + item.where + ' 的定理引用必须更早：' + item.ref + ' 在 index ' + at);
    });

    if (lemma) {
      assert.strictEqual(lv.band, 'lemma', lv.code + ' band 应为 lemma');
      assert.strictEqual(lv.hard, false, lv.code + ' 引理关不是困难关');
      assert.strictEqual(lv.chapter, 0, lv.code + ' 引理关属于第Ⅰ章');
      assert.ok(lv.no >= 11 && lv.no <= 19, lv.code + ' 引理关编号应为 11–19');
      assert.ok(!lv.mustUse || lv.mustUse.length === 0, lv.code + ' 引理关不强制 mustUse');
      assert.ok(
        lv.hint == null || (typeof lv.hint === 'string' && lv.hint.length > 0),
        lv.code + ' 引理关 hint 允许非 null，但不能是空串'
      );
      /* 契约 §3：参考解统一以 def-contract 收回表面语法后接目标焊盘。 */
      assert.ok(
        lv.solution.nodes.some((node) => node.kind === 'def-contract'),
        lv.code + ' 参考解必须出现 def-contract'
      );
      return;
    }

    if (base) {
      assert.strictEqual(lv.band, 'base', lv.code + ' band 应为 base');
      assert.strictEqual(lv.hard, false, lv.code + ' 普通关不是困难关');
      assert.ok(
        lv.solution.nodes.length >= 5 && lv.solution.nodes.length <= 20,
        lv.code + ' 普通关必须 5–20 个元件，实际 ' + lv.solution.nodes.length
      );
      assert.ok(Array.isArray(lv.mustUse) && lv.mustUse.length > 0, lv.code + ' 普通关 mustUse 不能为空');
      return;
    }

    if (hard) {
      assert.strictEqual(lv.band, 'challenge', lv.code + ' band 应为 challenge');
      assert.strictEqual(lv.hard, true, lv.code + ' 困难关 hard 标记');
      assert.strictEqual(lv.hint, null, lv.code + ' 困难关 hint 必须为 null');
    }
  });
});

test('166 关参考证明全部通过真实引擎（逐节点求值）', () => {
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
  const nodes = [
    { id: 't', kind: 'target', x: 0, y: 0, targetTokens: lv.targetTokens, config: {} },
    { id: 'x', kind: 'theorem', x: 0, y: 0, config: { code: lv.code }, targetTokens: [] }
  ];
  const res = RSL.Engine.evaluate(lv, nodes, [], { levels: RSL.LEVELS, levelIndex: RSL.LEVELS.indexOf(lv) });
  assert.ok(res.errors.some((e) => /更早|前面/.test(e.message)), JSON.stringify(res.errors));
});
