/*! Catalog 单元测试：src/catalog.js 的章节排序、解锁链、调色板条目。
 *
 * 用 scripts/lib/load-runtime.js 以 index.html 的经典脚本顺序加载
 * logic → archive → library → levels → levels-generated → catalog，
 * 因此断言的是真实关卡数据（240 关）上的派生行为。
 */
'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { loadRuntime } = require('../scripts/lib/load-runtime');

const RSL = loadRuntime({
  files: [
    'src/logic.js',
    'src/archive.js',
    'src/library.js',
    'src/levels.js',
    'src/levels-generated.js',
    'src/catalog.js'
  ]
});

const Catalog = RSL.Catalog;
const Logic = RSL.Logic;
const CHAPTERS = Catalog.CHAPTERS;
const CHAPTER_IDS = CHAPTERS.map((c) => c.id);

/* 原始数据快照：用于证明 build() 不污染 window.RSL.LEVELS。 */
const ORIG_BY_ID = new Map(RSL.LEVELS.map((lv) => [lv.id, lv]));
const ORIG_ALLOWED = new Map(RSL.LEVELS.map((lv) => [lv.id, JSON.stringify(lv.allowed || [])]));

const LEVELS = Catalog.build();
const GROUP = {};
for (const lv of LEVELS) {
  (GROUP[lv.chapterGroup] = GROUP[lv.chapterGroup] || []).push(lv);
}

/* vm 上下文里的数组有独立的 Array.prototype，deepStrictEqual 会因为原型不同而失败；
   比较前统一转成本 realm 的普通数组。 */
const plain = (arr) => Array.from(arr || []);

function chapterNo(level) {
  return /^(CH\d+)-/.exec(level.id)[1];
}

function baseOf(group) {
  return group.filter((lv) => lv.band !== 'challenge');
}

function challengeOf(group) {
  return group.filter((lv) => lv.band === 'challenge');
}

/* ---------------------------------------------------------------- 1. build */

test('build(): 240 关、四章各 60、章内按关号升序、章块连续', () => {
  assert.equal(LEVELS.length, 240, '总关卡数应为 240');
  assert.equal(new Set(LEVELS.map((lv) => lv.id)).size, 240, '关卡 id 必须唯一');

  for (const chapter of CHAPTERS) {
    const group = GROUP[chapter.id];
    assert.ok(group, '缺少章节 ' + chapter.id);
    assert.equal(group.length, 60, chapter.id + ' 应有 60 关');

    /* 章内按 CHn-xx 关号升序（01 → 60）。 */
    for (let i = 1; i < group.length; i += 1) {
      const prev = Number(group[i - 1].id.split('-')[1]);
      const cur = Number(group[i].id.split('-')[1]);
      assert.ok(prev < cur, chapter.id + ' 章内顺序错误：' + group[i - 1].id + ' 之后是 ' + group[i].id);
    }
    assert.equal(group[0].id, 'CH' + (CHAPTER_IDS.indexOf(chapter.id) + 1) + '-01', chapter.id + ' 首关');
    assert.equal(group[group.length - 1].id, 'CH' + (CHAPTER_IDS.indexOf(chapter.id) + 1) + '-60', chapter.id + ' 末关');
  }

  /* 四章按 Ⅰ→Ⅳ 连续排列，chapterGroup 与 chapter 字段一致。 */
  const order = LEVELS.map((lv) => lv.chapterGroup).filter((id, i, arr) => i === 0 || arr[i - 1] !== id);
  assert.deepEqual(plain(order), plain(CHAPTER_IDS), '章节块应按 Ⅰ→Ⅳ 连续排列');
  for (const lv of LEVELS) {
    assert.equal(lv.chapterGroup, Catalog.chapterOf(lv), lv.id + ' 的 chapterGroup 与 chapterOf 不一致');
    assert.equal(lv.chapter, CHAPTERS[CHAPTER_IDS.indexOf(lv.chapterGroup)].key, lv.id + ' 的 chapter 字段与章不对应');
  }
});

test('build(): 返回派生副本，不修改 window.RSL.LEVELS', () => {
  for (const lv of LEVELS) {
    const orig = ORIG_BY_ID.get(lv.id);
    assert.ok(orig, '派生关卡 ' + lv.id + ' 应能对应到原始数据');
    assert.notEqual(lv, orig, lv.id + ' 应返回副本而不是原对象');
    assert.notEqual(lv.allowed, orig.allowed, lv.id + ' 的 allowed 应是新数组');
    assert.equal(JSON.stringify(orig.allowed || []), ORIG_ALLOWED.get(lv.id), lv.id + ' 的原始 allowed 被修改了');
    assert.equal(orig.requires, undefined, '原始数据不应被写入 requires');
    assert.equal(orig.challenge, undefined, '原始数据不应被写入 challenge');
  }
  /* 再调用一次 build 结果稳定。 */
  const again = Catalog.build();
  assert.deepEqual(plain(again.map((lv) => lv.id)), plain(LEVELS.map((lv) => lv.id)), '重复 build 的关卡顺序应稳定');
  assert.deepEqual(plain(again.map((lv) => lv.requires)), plain(LEVELS.map((lv) => lv.requires)), '重复 build 的 requires 应稳定');
});

/* --------------------------------------------------------- 2. 基础段解锁链 */

test('基础段 requires 链：章首依赖上一章基础段最后一关，其余依赖前一关', () => {
  const baseLastOf = {};
  CHAPTERS.forEach((chapter, ci) => {
    const base = baseOf(GROUP[chapter.id]);
    assert.equal(base.length, 30, chapter.id + ' 基础段应为 30 关');

    base.forEach((lv, i) => {
      if (i === 0) {
        const expected = ci === 0 ? [] : [baseLastOf[CHAPTER_IDS[ci - 1]]];
        assert.deepEqual(plain(lv.requires), expected, lv.id + ' 章首 requires 应为 ' + JSON.stringify(expected));
      } else {
        assert.deepEqual(plain(lv.requires), [base[i - 1].id], lv.id + ' 应依赖前一关 ' + base[i - 1].id);
      }
      assert.equal(lv.challenge, false, lv.id + ' 基础关 challenge 应为 false');
    });
    baseLastOf[chapter.id] = base[base.length - 1].id;
  });

  /* 本作数据允许跨章引用：第四章基础首关要求第三章基础段最后一关。 */
  assert.deepEqual(plain(GROUP['Ⅳ'][0].requires), ['CH3-30'], 'CH4-01 应要求 CH3-30');
  assert.deepEqual(plain(GROUP['Ⅱ'][0].requires), ['CH1-30'], 'CH2-01 应要求 CH1-30');
  assert.deepEqual(plain(GROUP['Ⅲ'][0].requires), ['CH2-30'], 'CH3-01 应要求 CH2-30');
});

/* ----------------------------------------------------------- 3. 挑战段解锁链 */

test('挑战段：章内顺序解锁，最后一关标记 challenge=true，且不挡下一章', () => {
  const baseLast = {};
  CHAPTERS.forEach((chapter, ci) => {
    const group = GROUP[chapter.id];
    const base = baseOf(group);
    const challenge = challengeOf(group);
    assert.equal(challenge.length, 30, chapter.id + ' 挑战段应为 30 关');
    baseLast[chapter.id] = base[base.length - 1].id;

    challenge.forEach((lv, i) => {
      const expected = i === 0 ? [base[base.length - 1].id] : [challenge[i - 1].id];
      assert.deepEqual(plain(lv.requires), expected, lv.id + ' 挑战关 requires 应为 ' + JSON.stringify(expected));
      assert.equal(lv.challenge, i === challenge.length - 1, lv.id + ' challenge 标记应只落在本章最后一关');
      /* 挑战段不允许跨章依赖。 */
      lv.requires.forEach((id) => {
        assert.equal(id.slice(0, 3), chapterNo(lv), lv.id + ' 不应依赖其他章的 ' + id);
      });
    });

    /* 下一章基础首关只依赖本章基础段最后一关，不被挑战段挡住。 */
    if (ci + 1 < CHAPTERS.length) {
      const nextFirst = GROUP[CHAPTERS[ci + 1].id][0];
      assert.deepEqual(plain(nextFirst.requires), [base[base.length - 1].id], nextFirst.id + ' 不应依赖挑战段');
    }
  });

  assert.equal(GROUP['Ⅰ'].filter((lv) => lv.challenge === true)[0].id, 'CH1-60', '挑战段最后一关是 CH1-60');
  assert.equal(LEVELS.filter((lv) => lv.challenge === true).length, 4, '每章恰好 1 个 challenge 收尾关');
});

/* ------------------------------------------- 4. allowed 按参考电路收敛，不批量塞模块 */

test('subst 关卡的 allowed 只包含参考电路用到的模块，且不重复', () => {
  const substLevels = LEVELS.filter((lv) => (lv.allowed || []).indexOf('subst') >= 0);
  assert.ok(substLevels.length > 0, '数据里应有使用 subst 的关卡');

  for (const lv of substLevels) {
    const allowed = lv.allowed;
    assert.ok(allowed.indexOf('atom') >= 0, lv.id + ' 使用 subst 时必须能放置 atom');
    assert.ok(allowed.indexOf('subst') >= 0, lv.id + ' allowed 应含 subst');
    assert.equal(new Set(allowed).size, allowed.length, lv.id + ' allowed 不应有重复项');

    const used = new Set(['target']);
    for (const n of lv.solution.nodes || []) {
      if (n.kind === 'axiom') used.add('axiom:' + n.config.axiomId);
      else if (n.kind === 'theorem') used.add('theorem:' + n.config.theoremCode);
      else if (n.kind === 'archive') used.add('archive:' + n.config.label);
      else if (n.kind !== 'target') used.add(n.kind);
    }
    for (const key of allowed) {
      assert.ok(used.has(key), lv.id + ' 的 allowed 不应包含参考电路没用到的模块：' + key);
    }
  }

  const propPred = LEVELS.filter((lv) => lv.chapter === 'prop' &&
    (lv.allowed || []).some((k) => ['pred', 'term', 'quant', 'all-intro', 'all-elim', 'exists-intro', 'exists-elim'].indexOf(k) >= 0));
  assert.equal(propPred.length, 0, '命题章不应出现谓词/量词元件：' + propPred.map((l) => l.id).join(','));

  const blanket = LEVELS.filter((lv) => ['not', 'imp', 'or', 'and', 'iff'].every((k) => (lv.allowed || []).indexOf(k) >= 0));
  assert.equal(blanket.length, 0, '没有关卡应一次性允许全部连接词：' + blanket.map((l) => l.id).join(','));
});

test('每一关的 allowed 都只包含参考电路用到的模块 + target', () => {
  for (const lv of LEVELS) {
    const used = new Set(['target']);
    for (const n of lv.solution.nodes || []) {
      if (n.kind === 'axiom') used.add('axiom:' + n.config.axiomId);
      else if (n.kind === 'theorem') used.add('theorem:' + n.config.theoremCode);
      else if (n.kind === 'archive') used.add('archive:' + n.config.label);
      else if (n.kind !== 'target') used.add(n.kind);
    }
    const extras = (lv.allowed || []).filter((k) => !used.has(k));
    assert.equal(extras.length, 0, lv.id + ' 的 allowed 有多余模块：' + extras.join(','));
    assert.ok((lv.allowed || []).indexOf('target') >= 0, lv.id + ' allowed 应含 target');
    assert.equal(new Set(lv.allowed).size, lv.allowed.length, lv.id + ' allowed 不应有重复');
  }
});

/* -------------------------------------------------------------- 5. isUnlocked */

test('isUnlocked：forceUnlock 全开、按 requires 判定、越界 false', () => {
  /* forceUnlock：全部真实关卡都可进。 */
  LEVELS.forEach((lv, i) => {
    assert.equal(Catalog.isUnlocked({ forceUnlock: true, solved: {} }, LEVELS, i), true, lv.id + ' 在 forceUnlock 下应解锁');
  });

  /* 第一章首关无前置。 */
  const at = (id) => LEVELS.findIndex((lv) => lv.id === id);
  assert.equal(Catalog.isUnlocked({ solved: {} }, LEVELS, at('CH1-01')), true, 'CH1-01 无前置，默认可进');
  assert.equal(Catalog.isUnlocked({ solved: {} }, LEVELS, at('CH1-02')), false, 'CH1-02 未解 CH1-01 时应锁');
  assert.equal(Catalog.isUnlocked({ solved: { 'CH1-01': true } }, LEVELS, at('CH1-02')), true, '解开 CH1-01 后 CH1-02 解锁');

  /* 部分解开不够，requirements 全部满足才解锁（挑战段首关依赖基础段末关）。 */
  assert.equal(Catalog.isUnlocked({ solved: { 'CH1-29': true } }, LEVELS, at('CH1-31')), false, 'CH1-31 仍缺 CH1-30');
  assert.equal(Catalog.isUnlocked({ solved: { 'CH1-30': true } }, LEVELS, at('CH1-31')), true, '解开 CH1-30 后挑战段首关解锁');

  /* 跨章解锁链 */
  assert.equal(Catalog.isUnlocked({ solved: { 'CH1-01': true } }, LEVELS, at('CH2-01')), false, 'CH2-01 需要 CH1-30');
  assert.equal(Catalog.isUnlocked({ solved: { 'CH1-30': true } }, LEVELS, at('CH2-01')), true, '解开 CH1-30 后 CH2-01 解锁');

  /* 越界 index */
  assert.equal(Catalog.isUnlocked({ solved: {} }, LEVELS, -1), false, 'index -1 应返回 false');
  assert.equal(Catalog.isUnlocked({ solved: {} }, LEVELS, LEVELS.length), false, 'index 越界（末位之后）应返回 false');
  assert.equal(Catalog.isUnlocked({ solved: {} }, LEVELS, 9999), false, 'index 9999 应返回 false');

  /* 越界优先于 forceUnlock：先取关卡、取不到就 false，forceUnlock 不能把不存在的关卡解锁。 */
  for (const bad of [-1, LEVELS.length, 9999]) {
    assert.equal(
      Catalog.isUnlocked({ forceUnlock: true, solved: {} }, LEVELS, bad),
      false,
      'forceUnlock 下越界 index ' + bad + ' 仍应返回 false'
    );
  }
});

/* ------------------------------------------------------------ 6. partsForLevel */

test('partsForLevel：axiom/theorem/archive 解析、跳过 target 与未知 key', () => {
  const archiveLabel = (() => {
    for (const lv of LEVELS) {
      for (const key of lv.allowed) {
        if (key.indexOf('archive:') === 0) {
          const label = key.slice(8);
          if (RSL.ARCHIVE[label]) return label;
        }
      }
    }
    return null;
  })();
  assert.ok(archiveLabel, '关卡数据里应引用真实 set.mm 档案条目');

  const level = {
    allowed: [
      'target',
      'atom',
      'axiom:ax-1',
      'theorem:CH1-07',
      'archive:' + archiveLabel,
      'nope',
      'axiom:missing-axiom',
      'theorem:CH9-99',
      'archive:missing-label'
    ]
  };
  const snapshot = JSON.stringify(level.allowed);
  const parts = Catalog.partsForLevel(level);

  assert.deepEqual(plain(parts.map((p) => p.key)), [
    'atom',
    'axiom:ax-1',
    'theorem:CH1-07',
    'archive:' + archiveLabel
  ], 'partsForLevel 应按 allowed 顺序返回可解析条目，跳过 target/未知/不存在引用');
  assert.equal(JSON.stringify(level.allowed), snapshot, 'partsForLevel 不应修改 level.allowed');

  const [atom, axiom, theorem, archive] = parts;
  assert.equal(atom.kind, 'atom', 'atom 条目 kind 应为 atom');
  assert.equal(axiom.kind, 'axiom', 'axiom:ax-1 解析为 axiom');
  assert.equal(axiom.config.axiomId, 'ax-1', 'axiom 条目带 config.axiomId');
  assert.equal(axiom.code, 'ax-1', 'axiom 条目 code 为 ax-1');
  assert.equal(theorem.kind, 'theorem', 'theorem:CH1-07 解析为 theorem');
  assert.equal(theorem.config.theoremCode, 'CH1-07', 'theorem 条目带 config.theoremCode');
  assert.equal(theorem.code, 'CH1-07', 'theorem 条目 code 为 CH1-07');
  assert.equal(archive.kind, 'archive', 'archive 条目 kind 为 archive');
  assert.equal(archive.config.label, archiveLabel, 'archive 条目带 config.label');
  assert.equal(archive.code, archiveLabel, 'archive 条目 code 为 label');

  for (const part of parts) {
    assert.ok(part.key && typeof part.key === 'string', '条目应有 key');
    assert.ok(part.name && typeof part.name === 'string', part.key + ' 应有 name');
    assert.ok(part.symbol && typeof part.symbol === 'string', part.key + ' 应有 symbol');
  }
  assert.ok(archive.name.indexOf('set.mm') >= 0, 'archive 条目 name 应带 set.mm 前缀');
  assert.ok(theorem.name.indexOf('已证') >= 0, 'theorem 条目 name 应说明已证');

  /* 真实关卡的 partsForLevel：条目 key 必须来自该关 allowed（target 除外）。 */
  for (const id of ['CH1-01', 'CH1-04', 'CH1-07', 'CH2-01']) {
    const lv = LEVELS.find((x) => x.id === id);
    assert.ok(lv, '应存在关卡 ' + id);
    const allowed = lv.allowed.filter((key) => key !== 'target');
    const got = Catalog.partsForLevel(lv);
    got.forEach((part) => {
      assert.ok(allowed.indexOf(part.key) >= 0, id + ' 的条目 ' + part.key + ' 应来自 allowed');
    });
    assert.ok(got.length > 0, id + ' 的调色板不应为空');
  }
});

/* -------------------------------------------------------- 7. 杂项纯函数契约 */

test('chapterOf / levelById / CHAPTERS 元数据', () => {
  assert.deepEqual(plain(CHAPTERS.map((c) => c.id)), ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'], '四章罗马数字顺序');
  assert.deepEqual(plain(CHAPTERS.map((c) => c.key)), ['prop', 'pred', 'eq', 'set'], '四章 chapter key');
  assert.deepEqual(plain(CHAPTERS.map((c) => c.title)), ['命题', '谓词', '等词', '集合'], '四章标题');
  assert.equal(Catalog.chapterOf({ chapter: 'prop' }), 'Ⅰ', 'prop → Ⅰ');
  assert.equal(Catalog.chapterOf({ chapter: 'pred' }), 'Ⅱ', 'pred → Ⅱ');
  assert.equal(Catalog.chapterOf({ chapter: 'eq' }), 'Ⅲ', 'eq → Ⅲ');
  assert.equal(Catalog.chapterOf({ chapter: 'set' }), 'Ⅳ', 'set → Ⅳ');
  assert.equal(Catalog.chapterOf({}), 'Ⅰ', '缺省 chapter → Ⅰ');

  assert.equal(Catalog.levelById('CH1-01'), ORIG_BY_ID.get('CH1-01'), 'levelById 应返回 window.RSL.LEVELS 里的原始关卡');
  assert.equal(Catalog.levelById('NOPE'), null, '未知 id 返回 null');
});
