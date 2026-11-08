/*! 关卡进程接线测试：RSL.MM.Flags 开关语义 + Catalog.build 的三段式章节（基础 → 重放 → 挑战）。
 *
 * 用 scripts/lib/load-runtime.js 按 index.html 的经典脚本顺序在 vm 里加载。
 * 注意：vm 沙箱只取 window.RSL，flags.js 的 CommonJS 导出在沙箱里不生效；
 * 因此 query / localStorage 来源都通过 loadRuntime 的 globals / localStorage
 * 选项注入沙箱全局，而不是 require 模块。
 *
 * 覆盖：
 *   1. Flags：默认开启、显式关闭（?mm=0 / 持久 off）、无存储/隐私模式安全降级；
 *   2. Catalog.build()：关闭时逐字段等于旧基线（240 关）；
 *   3. Catalog.build()：开启时 240 + 重放关，插进对应章节的 replay 段，
 *      解锁链为 基础 → 重放 → 挑战，原有 240 关除「首个挑战关的 requires」外不变。
 */
'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { loadRuntime, createMemoryStorage } = require('../scripts/lib/load-runtime');

const DATA_FILES = [
  'src/logic.js',
  'src/archive.js',
  'src/library.js',
  'src/levels.js',
  'src/levels-generated.js'
];
const BASELINE_FILES = DATA_FILES.concat(['src/catalog.js']);
const FLAG_FILES = DATA_FILES.concat(['src/mm/flags.js', 'src/catalog.js']);
const REAL_FILES = DATA_FILES.concat(['src/mm/flags.js', 'src/mm/levels.js', 'src/catalog.js']);

const STORAGE_KEY = 'axiom-simple:mm';

/* 旧版（没有重放关）的目录基线：用来验证「关闭时逐字段不变」。 */
const BASE_RSL = loadRuntime({ files: BASELINE_FILES });
const BASELINE = JSON.parse(JSON.stringify(BASE_RSL.Catalog.build()));

function loadWithFlag(options) {
  return loadRuntime(Object.assign({ files: FLAG_FILES }, options || {}));
}

/* 内存 stub：12 个重放关，chapter 用真实章节（prop），band='replay'。 */
function makeStubLevels(count) {
  const out = [];
  for (let i = 1; i <= count; i += 1) {
    out.push({
      id: 'MM-' + String(i).padStart(2, '0'),
      mode: 'mm-proof',
      chapter: 'prop',
      band: 'replay',
      title: '重放 ' + i,
      code: 'pm3.24',
      targetTokens: ['|-', '-.', '(', 'ph', '/\\', '-.', 'ph', ')'],
      targetUnicode: '⊢ ¬ ( φ ∧ ¬ φ )',
      proofId: 'pm3.24',
      stats: { steps: i },
      requires: [],
      order: i,
      chapterOrder: i
    });
  }
  return out;
}

const plain = (value) => JSON.parse(JSON.stringify(value));

function chapterGroupOf(built, chapterId) {
  return built.filter((lv) => lv.chapterGroup === chapterId);
}

/* --------------------------------------------------------------- 1. Flags 默认 */

test('Flags：默认开启，API 形状固定，无 localStorage 时 set 不抛错', () => {
  const RSL = loadWithFlag();
  const Flags = RSL.MM.Flags;

  assert.ok(Flags, 'flags.js 应挂载 RSL.MM.Flags');
  assert.equal(typeof Flags.enabled, 'function');
  assert.equal(typeof Flags.set, 'function');
  assert.equal(typeof Flags.source, 'function');

  assert.equal(Flags.enabled(), true, '没有 ?mm 与 localStorage 时默认开启重放段');
  assert.equal(Flags.source(), 'default');
  assert.doesNotThrow(() => Flags.set(false), 'localStorage 不可用时 set 应静默忽略');
  assert.equal(Flags.enabled(), true, '无存储时 set(false) 不应改变默认值');
});

test('Flags：localStorage 访问抛错（隐私模式）时安全降级为默认开启', () => {
  const hostile = {
    getItem() { throw new Error('SecurityError'); },
    setItem() { throw new Error('SecurityError'); }
  };
  const RSL = loadWithFlag({ localStorage: hostile });
  const Flags = RSL.MM.Flags;

  assert.equal(Flags.enabled(), true);
  assert.equal(Flags.source(), 'default');
  assert.doesNotThrow(() => Flags.set(false), '存储抛错不应冒泡到页面');
  assert.equal(Flags.enabled(), true);
});

/* -------------------------------------------------------------- 2. query 来源 */

test('Flags：?mm=0 / ?mm=off 显式关闭，?mm=1 / ?mm=on 开启，source=query', () => {
  for (const value of ['1', 'on', 'ON']) {
    const RSL = loadWithFlag({ globals: { location: { search: '?mm=' + value } } });
    assert.equal(RSL.MM.Flags.enabled(), true, '?mm=' + value + ' 应开启');
    assert.equal(RSL.MM.Flags.source(), 'query', '?mm=' + value + ' 的来源应为 query');
  }

  for (const value of ['0', 'off', 'OFF']) {
    const RSL = loadWithFlag({ globals: { location: { search: '?mm=' + value } } });
    assert.equal(RSL.MM.Flags.enabled(), false, '?mm=' + value + ' 应关闭');
    assert.equal(RSL.MM.Flags.source(), 'query', '?mm=' + value + ' 的来源应为 query');
  }

  for (const search of ['', '?mm', '?other=1', '?mm=no']) {
    const RSL = loadWithFlag({ globals: { location: { search: search } } });
    assert.equal(RSL.MM.Flags.enabled(), true, JSON.stringify(search) + ' 应回落到默认开启');
    assert.equal(RSL.MM.Flags.source(), 'default', JSON.stringify(search) + ' 来源应为 default');
  }
});

test('Flags：无 URLSearchParams 时回退到手工解析查询串', () => {
  const RSL = loadWithFlag({
    globals: { location: { search: '?foo=bar&mm=off' }, URLSearchParams: undefined }
  });
  assert.equal(RSL.MM.Flags.enabled(), false);
  assert.equal(RSL.MM.Flags.source(), 'query');
});

/* ---------------------------------------------------------- 3. localStorage 来源 */

test('Flags：localStorage 持久开关，set(true/false) 立即生效且无需刷新', () => {
  const store = createMemoryStorage();
  const RSL = loadWithFlag({ localStorage: store });
  const Flags = RSL.MM.Flags;

  assert.equal(Flags.enabled(), true, '空存储默认开启');
  assert.equal(Flags.source(), 'default');

  Flags.set(false);
  assert.equal(store.getItem(STORAGE_KEY), 'off', 'set(false) 应写入 axiom-simple:mm=off');
  assert.equal(Flags.enabled(), false, 'set(false) 后无需刷新即关闭');
  assert.equal(Flags.source(), 'storage');

  Flags.set(true);
  assert.equal(store.getItem(STORAGE_KEY), 'on', 'set(true) 应写入 on');
  assert.equal(Flags.enabled(), true, 'set(true) 后立即开启');
  assert.equal(Flags.source(), 'storage');
});

test('Flags：持久 off 的存储直接关闭，source=storage', () => {
  const RSL = loadWithFlag({
    localStorage: createMemoryStorage({ [STORAGE_KEY]: 'off' })
  });
  assert.equal(RSL.MM.Flags.enabled(), false);
  assert.equal(RSL.MM.Flags.source(), 'storage');
});

test('Flags：query 优先于 storage（持久 off + ?mm=1 仍开启）', () => {
  const RSL = loadWithFlag({
    globals: { location: { search: '?mm=1' } },
    localStorage: createMemoryStorage({ [STORAGE_KEY]: 'off' })
  });
  assert.equal(RSL.MM.Flags.enabled(), true);
  assert.equal(RSL.MM.Flags.source(), 'query');
});

/* ---------------------------------------------------- 4. Catalog：关闭 == 旧基线 */

test('Catalog.build()：?mm=0 时与旧基线逐字段一致（240 关）', () => {
  const RSL = loadWithFlag({ globals: { location: { search: '?mm=0' } } });
  const built = plain(RSL.Catalog.build());

  assert.equal(built.length, 240, '关闭时仍是 240 关');
  assert.equal(JSON.stringify(built), JSON.stringify(BASELINE),
    '关闭时每关的 id/requires/chapter/band/章节分组等字段必须与改动前完全一致');
});

test('Catalog.build()：关闭时即使 MM 关卡已加载也不拼接', () => {
  const RSL = loadWithFlag({ globals: { location: { search: '?mm=0' } } });
  RSL.MM_LEVELS = makeStubLevels(12);

  const built = plain(RSL.Catalog.build());
  assert.equal(built.length, 240, '关闭时重放关不得进入目录');
  assert.equal(JSON.stringify(built), JSON.stringify(BASELINE), '关闭时目录必须与基线一致');
});

/* ----------------------------------------------------- 5. Catalog：开启 == 三段式 */

test('Catalog.build()：开启时把重放关按统一难度交错进章节（基础 36 / 挑战 36）', () => {
  const RSL = loadWithFlag();
  const stub = makeStubLevels(12);
  RSL.MM_LEVELS = stub;

  const built = Array.from(RSL.Catalog.build());
  assert.equal(built.length, 252, '开启时应为 240 + 12 关');

  const prop = built.filter((lv) => lv.chapterGroup === 'Ⅰ');
  assert.equal(prop.length, 72, '命题章应为 72 关（12 手工 + 48 接线 + 12 重放）');
  assert.equal(prop.filter((lv) => lv.band === 'base').length, 36, '基础段 36 关');
  assert.equal(prop.filter((lv) => lv.band === 'challenge').length, 36, '挑战段 36 关');

  /* 前 12 关是手工/引导关，按关号固定，豁免单调 */
  assert.equal(
    prop.slice(0, 12).map((lv) => lv.id).join(','),
    Array.from(BASE_RSL.Catalog.build()).filter((lv) => lv.chapterGroup === 'Ⅰ').slice(0, 12).map((lv) => lv.id).join(','),
    '前 12 关是手工关'
  );

  /* 12 关之后按统一难度升序（允许并列） */
  for (let i = 13; i < prop.length; i += 1) {
    assert.ok(prop[i].difficulty >= prop[i - 1].difficulty - 1e-9,
      '章内难度应单调不减：' + prop[i - 1].id + '(' + prop[i - 1].difficulty + ') → ' + prop[i].id + '(' + prop[i].difficulty + ')');
  }

  /* 重放关不是独立一段：它们按难度插在接线关之间（至少有一个不在末尾） */
  const replay = prop.filter((lv) => lv.mode === 'mm-proof');
  assert.equal(replay.length, 12, 'stub 的 12 个重放关都进命题章');
  const lastReplayIdx = prop.map((lv) => lv.mode === 'mm-proof').lastIndexOf(true);
  assert.ok(lastReplayIdx < prop.length - 1, '重放关后面还应该有接线关（交错，不是独立段）');
  assert.ok(replay.every((lv) => lv.band === 'base' || lv.band === 'challenge'));

  /* 解锁链：章内线性；首个基础关（无上一章）不需要前置 */
  assert.equal(JSON.stringify(plain(prop[0].requires)), '[]', '第一章首关无前置');
  for (let i = 1; i < prop.length; i += 1) {
    assert.equal(JSON.stringify(plain(prop[i].requires)), JSON.stringify([prop[i - 1].id]), prop[i].id + ' 应依赖前一关');
  }
});

test('Catalog.build()：开启时章节内容不变，只改顺序/分段/解锁链', () => {
  const RSL = loadWithFlag();
  RSL.MM_LEVELS = makeStubLevels(12);
  const built = Array.from(RSL.Catalog.build());
  const legacy = Array.from(BASE_RSL.Catalog.build());

  /* 240 个接线关一个不少，且内容字段（目标/调色板/参考电路/章节）不变 */
  for (const old of legacy) {
    const hit = built.find((lv) => lv.id === old.id);
    assert.ok(hit, old.id + ' 仍应存在');
    assert.equal(hit.chapter, old.chapter, old.id + ' 的 chapter 不应变');
    assert.equal(JSON.stringify(plain(hit.allowed)), JSON.stringify(plain(old.allowed)), old.id + ' 的 allowed 不应变');
    assert.equal(JSON.stringify(plain(hit.target)), JSON.stringify(old.target), old.id + ' 的 target 不应变');
    assert.equal(JSON.stringify(plain(hit.solution)), JSON.stringify(plain(old.solution)), old.id + ' 的参考电路不应变');
  }
  assert.equal(built.filter((lv) => lv.mode !== 'mm-proof').length, 240, '接线关仍是 240 个');
  /* 没被重放关插入的章节保持旧版布局（基础 30 → 挑战 30） */
  const pred = built.filter((lv) => lv.chapterGroup === 'Ⅱ');
  assert.equal(pred.length, 60, '谓词章没有重放关时仍是 60 关');
  const ch1Base = built.filter((lv) => lv.chapterGroup === 'Ⅰ' && lv.band === 'base');
  assert.equal(
    JSON.stringify(plain(pred[0].requires)),
    JSON.stringify([ch1Base[ch1Base.length - 1].id]),
    '谓词章首关依赖上一章基础段末关'
  );
});

test('Catalog.build()：重放关是副本，不写回 RSL.MM_LEVELS', () => {
  const RSL = loadWithFlag();
  const stub = makeStubLevels(12);
  RSL.MM_LEVELS = stub;
  const built = Array.from(RSL.Catalog.build());
  const replay = built.filter((lv) => lv.mode === 'mm-proof');
  assert.equal(replay.length, 12);
  assert.equal(stub[0].chapterGroup, undefined, '不应写回 chapterGroup');
  assert.equal(stub[0]._ord, undefined, '不应写回 _ord');
  assert.equal(stub[0].band, 'replay', '不应改写源数据的 band');
  assert.notEqual(replay[0], stub[0], '目录里的重放关应是副本');
  assert.equal(replay[0].proofId, stub[0].proofId);
});

/* ------------------------------------------------ 6. 真实 src/mm/levels.js 集成 */

const realAvailable = fs.existsSync(path.join(__dirname, '..', 'src', 'mm', 'levels.js'));

test('Catalog.build()：真实重放关卡按章交错，每章 12 关、章内难度单调', {
  skip: realAvailable ? false : 'src/mm/levels.js 尚未生成'
}, () => {
  const RSL = loadRuntime({ files: REAL_FILES });
  const real = RSL.MM_LEVELS;
  assert.equal(real.length, 48, '真实 RSL.MM_LEVELS 应为 48 关（每章 12）');

  const built = Array.from(RSL.Catalog.build());
  assert.equal(built.length, 288, '真实数据下目录应为 240 + 48 关');
  assert.equal(new Set(built.map((lv) => lv.id)).size, 288, '关卡 id 唯一');

  for (const chapter of ['prop', 'pred', 'eq', 'set']) {
    const group = built.filter((lv) => lv.chapter === chapter);
    assert.equal(group.length, 72, chapter + ' 章应为 72 关');
    assert.equal(group.filter((lv) => lv.band === 'base').length, 36, chapter + ' 基础段 36');
    assert.equal(group.filter((lv) => lv.band === 'challenge').length, 36, chapter + ' 挑战段 36');
    assert.equal(group.filter((lv) => lv.mode === 'mm-proof').length, 12, chapter + ' 应有 12 个重放关');
    for (let i = 13; i < group.length; i += 1) {
      assert.ok(group[i].difficulty >= group[i - 1].difficulty - 1e-9,
        chapter + ' 章内难度应单调不减（位置 ' + (i + 1) + '）');
    }
    /* 重放关与接线关交错：重放关的位置不连续成一段（章末可以是重放终章） */
    const replayIdx = [];
    group.forEach((lv, i) => { if (lv.mode === 'mm-proof') replayIdx.push(i); });
    const contiguous = replayIdx.every((x, i) => i === 0 || x === replayIdx[i - 1] + 1);
    assert.ok(!contiguous, chapter + ' 章的重放关应交错在接线关之间，而不是连续一段');
  }

  /* 章与章之间：基础段末关完成后下一章解锁（挑战段不挡） */
  const ch2 = built.filter((lv) => lv.chapterGroup === 'Ⅱ');
  const ch1BaseLast = built.filter((lv) => lv.chapterGroup === 'Ⅰ' && lv.band === 'base').slice(-1)[0];
  assert.equal(
    JSON.stringify(plain(ch2[0].requires)),
    JSON.stringify([ch1BaseLast.id]),
    '第二章首关接第一章基础段末关'
  );
});

test('Catalog.chapterOf：四章映射不变，未知章节回落到命题章', () => {
  const RSL = loadWithFlag();
  assert.equal(RSL.Catalog.chapterOf({ chapter: 'prop' }), 'Ⅰ');
  assert.equal(RSL.Catalog.chapterOf({ chapter: 'pred' }), 'Ⅱ');
  assert.equal(RSL.Catalog.chapterOf({ chapter: 'eq' }), 'Ⅲ');
  assert.equal(RSL.Catalog.chapterOf({ chapter: 'set' }), 'Ⅳ');
  assert.equal(RSL.Catalog.chapterOf({}), 'Ⅰ');
});

/* ------------------------------------------------ 7. flags.js 的 CommonJS 导出 */

test('flags.js：CommonJS 直接 require 可用并挂到 globalThis.RSL', () => {
  const Flags = require('../src/mm/flags.js');
  assert.ok(Flags && typeof Flags.enabled === 'function', 'module.exports 应导出 Flags');
  assert.equal(typeof Flags.set, 'function');
  assert.equal(typeof Flags.source, 'function');
  assert.ok(globalThis.RSL && globalThis.RSL.MM, 'Node 下应挂到 globalThis.RSL');
  assert.equal(globalThis.RSL.MM.Flags, Flags);
  delete globalThis.RSL;
});
