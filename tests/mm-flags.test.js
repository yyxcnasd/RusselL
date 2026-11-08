/*! mm-replay 接线测试：RSL.MM.Flags 开关语义 + Catalog.build 的 MM 关卡拼接。
 *
 * 用 scripts/lib/load-runtime.js 按 index.html 的经典脚本顺序在 vm 里加载。
 * 注意：vm 沙箱只取 window.RSL，flags.js 的 CommonJS 导出在沙箱里不生效；
 * 因此 query / localStorage 来源都通过 loadRuntime 的 globals / localStorage
 * 选项注入沙箱全局，而不是 require 模块。
 *
 * 覆盖：
 *   1. Flags 默认关闭、API 形状、无存储环境安全降级；
 *   2. ?mm=1 / ?mm=on（含 URLSearchParams 回退）开启，source=query；
 *   3. localStorage 持久开启，set() 立即生效无需刷新；
 *   4. query 优先于 storage；
 *   5. Catalog.build()：关闭时仍 240 关且与改动前逐字段一致；
 *   6. Catalog.build()：开启时 240 + 31，追加项形状正确，原有 240 关不变。
 */
'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { loadRuntime, createMemoryStorage } = require('../scripts/lib/load-runtime');

/* index.html 的顺序：数据 → mm/flags → catalog（catalog 在 ui 之后，这里只取依赖链）。 */
const DATA_FILES = [
  'src/logic.js',
  'src/archive.js',
  'src/library.js',
  'src/levels.js',
  'src/levels-generated.js'
];
const BASELINE_FILES = DATA_FILES.concat(['src/catalog.js']);
const FLAG_FILES = DATA_FILES.concat(['src/mm/flags.js', 'src/catalog.js']);

const STORAGE_KEY = 'axiom-simple:mm';

/* 改动前的行为基线：不加载 flags.js，目录只可能来自原有 240 关。 */
const BASE_RSL = loadRuntime({ files: BASELINE_FILES });
const BASELINE = JSON.parse(JSON.stringify(BASE_RSL.Catalog.build()));

/* 加载带 flags.js 的运行时；测试按需注入 location / localStorage。 */
function loadWithFlag(options) {
  return loadRuntime(Object.assign({ files: FLAG_FILES }, options || {}));
}

/* 契约 §6 的内存 stub：31 个 mm-proof 关卡，不依赖生成器是否已经产出。 */
function makeStubLevels(count) {
  const out = [];
  for (let i = 1; i <= count; i += 1) {
    out.push({
      id: 'MM-' + String(i).padStart(2, '0'),
      mode: 'mm-proof',
      chapter: 'mm',
      band: 'mm',
      title: '重放 ' + i,
      code: 'pm3.24',
      targetTokens: ['|-', '-.', '(', 'ph', '/\\', '-.', 'ph', ')'],
      targetUnicode: '⊢ ¬ ( φ ∧ ¬ φ )',
      proofId: 'pm3.24',
      requires: [],
      order: i
    });
  }
  return out;
}

/* 跨 vm realm 的数组/对象比较统一转成本 realm 的普通结构。 */
const plain = (value) => JSON.parse(JSON.stringify(value));

/* --------------------------------------------------------------- 1. Flags 默认 */

test('Flags：默认关闭，API 形状固定，无 localStorage 时 set 不抛错', () => {
  const RSL = loadWithFlag();
  const Flags = RSL.MM.Flags;

  assert.ok(Flags, 'flags.js 应挂载 RSL.MM.Flags');
  assert.equal(typeof Flags.enabled, 'function');
  assert.equal(typeof Flags.set, 'function');
  assert.equal(typeof Flags.source, 'function');

  assert.equal(Flags.enabled(), false, '没有 ?mm 与 localStorage 时默认关闭');
  assert.equal(Flags.source(), 'default');
  assert.doesNotThrow(() => Flags.set(true), 'localStorage 不可用时 set 应静默忽略');
  assert.equal(Flags.enabled(), false, '无存储时 set(true) 不应开启');
});

test('Flags：localStorage 访问抛错（隐私模式）时安全降级', () => {
  const hostile = {
    getItem() { throw new Error('SecurityError'); },
    setItem() { throw new Error('SecurityError'); }
  };
  const RSL = loadWithFlag({ localStorage: hostile });
  const Flags = RSL.MM.Flags;

  assert.equal(Flags.enabled(), false);
  assert.equal(Flags.source(), 'default');
  assert.doesNotThrow(() => Flags.set(true), '存储抛错不应冒泡到页面');
  assert.equal(Flags.enabled(), false);
});

/* -------------------------------------------------------------- 2. query 来源 */

test('Flags：?mm=1 与 ?mm=on 开启，source=query；其他取值保持关闭', () => {
  for (const value of ['1', 'on', 'ON']) {
    const RSL = loadWithFlag({ globals: { location: { search: '?mm=' + value } } });
    assert.equal(RSL.MM.Flags.enabled(), true, '?mm=' + value + ' 应开启');
    assert.equal(RSL.MM.Flags.source(), 'query', '?mm=' + value + ' 的来源应为 query');
  }

  for (const search of ['', '?mm=0', '?mm=off', '?mm', '?other=1', '?mm=no']) {
    const RSL = loadWithFlag({ globals: { location: { search: search } } });
    assert.equal(RSL.MM.Flags.enabled(), false, JSON.stringify(search) + ' 不应开启');
    assert.equal(RSL.MM.Flags.source(), 'default', JSON.stringify(search) + ' 来源应为 default');
  }
});

test('Flags：无 URLSearchParams 时回退到手工解析查询串', () => {
  const RSL = loadWithFlag({
    globals: { location: { search: '?foo=bar&mm=on' }, URLSearchParams: undefined }
  });
  assert.equal(RSL.MM.Flags.enabled(), true);
  assert.equal(RSL.MM.Flags.source(), 'query');
});

/* ---------------------------------------------------------- 3. localStorage 来源 */

test('Flags：localStorage 持久开启、set(true/false) 立即生效且无需刷新', () => {
  const store = createMemoryStorage();
  const RSL = loadWithFlag({ localStorage: store });
  const Flags = RSL.MM.Flags;

  assert.equal(Flags.enabled(), false, '空存储默认关闭');
  assert.equal(Flags.source(), 'default');

  Flags.set(true);
  assert.equal(store.getItem(STORAGE_KEY), 'on', 'set(true) 应写入 axiom-simple:mm=on');
  assert.equal(Flags.enabled(), true, 'set(true) 后无需刷新即开启');
  assert.equal(Flags.source(), 'storage');

  Flags.set(false);
  assert.notEqual(store.getItem(STORAGE_KEY), 'on', 'set(false) 不应残留 on');
  assert.equal(Flags.enabled(), false, 'set(false) 后立即关闭');
  assert.equal(Flags.source(), 'default');
});

test('Flags：带持久开关的存储直接开启，source=storage', () => {
  const RSL = loadWithFlag({
    localStorage: createMemoryStorage({ [STORAGE_KEY]: 'on' })
  });
  assert.equal(RSL.MM.Flags.enabled(), true);
  assert.equal(RSL.MM.Flags.source(), 'storage');
});

test('Flags：query 优先于 storage（两者都为真时 source=query）', () => {
  const RSL = loadWithFlag({
    globals: { location: { search: '?mm=1' } },
    localStorage: createMemoryStorage({ [STORAGE_KEY]: 'on' })
  });
  assert.equal(RSL.MM.Flags.enabled(), true);
  assert.equal(RSL.MM.Flags.source(), 'query');
});

/* ---------------------------------------------------- 4. Catalog：flag 关闭 */

test('Catalog.build()：flag 关闭时仍 240 关，且与改动前逐字段一致', () => {
  const RSL = loadWithFlag();
  const built = plain(RSL.Catalog.build());

  assert.equal(built.length, 240, '关闭时仍是 240 关');
  assert.equal(JSON.stringify(built), JSON.stringify(BASELINE),
    '关闭时每关的 id/requires/chapter/band/章节分组等字段必须与改动前完全一致');

  /* 原有数据本身保持只读：build 不应把派生字段写回 RSL.LEVELS。 */
  for (const level of RSL.LEVELS) {
    assert.equal(level.requires, undefined, level.id + ' 原始数据不应被写入 requires');
    assert.equal(level.challenge, undefined, level.id + ' 原始数据不应被写入 challenge');
  }
});

test('Catalog.build()：flag 关闭时即使 MM 关卡已加载也不拼接', () => {
  const RSL = loadWithFlag();
  RSL.MM_LEVELS = makeStubLevels(31);

  const built = plain(RSL.Catalog.build());
  assert.equal(built.length, 240, '特性开关关闭时 MM 关卡不得进入目录');
  assert.equal(JSON.stringify(built), JSON.stringify(BASELINE), '关闭时目录必须与基线一致');
});

/* ----------------------------------------------------- 5. Catalog：flag 开启 */

test('Catalog.build()：flag 开启时追加 31 关到末尾，原有 240 关不变', () => {
  const RSL = loadWithFlag({ globals: { location: { search: '?mm=1' } } });
  const stub = makeStubLevels(31);
  RSL.MM_LEVELS = stub;

  const built = RSL.Catalog.build();
  assert.equal(built.length, 271, '开启时应为 240 + 31 关');

  /* 原有 240 关逐字段不变（顺序、requires 链、章节分组都不能被 MM 关卡影响）。 */
  const first240 = plain(built.slice(0, 240));
  assert.equal(JSON.stringify(first240), JSON.stringify(BASELINE), '原有 240 关必须逐字段不变');

  /* 追加项在末尾，顺序与 RSL.MM_LEVELS 一致。 */
  const appended = Array.from(built.slice(240));
  assert.deepEqual(
    appended.map((lv) => lv.id),
    stub.map((lv) => lv.id),
    'MM 关卡应按 RSL.MM_LEVELS 顺序追加到末尾'
  );

  appended.forEach((level, i) => {
    assert.equal(level.chapterGroup, 'MM', level.id + ' 的 chapterGroup 应为 MM');
    assert.equal(level.chapter, 'mm', level.id + ' 的 chapter 应为 mm');
    assert.equal(level.band, 'mm', level.id + ' 的 band 应为 mm');
    assert.deepEqual(plain(level.requires), [], level.id + ' 的 requires 应为空数组（不参与原有解锁链）');
    assert.equal(level._ord, 240 + i, level.id + ' 的 _ord 应从 240 顺延');
    assert.equal(level.mode, 'mm-proof', level.id + ' 的 mode 应保留');
    assert.equal(level.proofId, stub[i].proofId, level.id + ' 的 proofId 应保留');
  });

  /* 追加的是副本：不修改 RSL.MM_LEVELS 原对象。 */
  assert.equal(stub[0].chapterGroup, undefined, '不应写回 chapterGroup 到原始 MM 关卡');
  assert.equal(stub[0]._ord, undefined, '不应写回 _ord 到原始 MM 关卡');
  assert.notEqual(appended[0], stub[0], '目录里的 MM 关卡应是副本');

  /* 重复 build 稳定。 */
  const again = RSL.Catalog.build();
  assert.equal(again.length, 271);
  assert.deepEqual(
    Array.from(again.map((lv) => lv.id)),
    Array.from(built.map((lv) => lv.id)),
    '重复 build 的关卡顺序应稳定'
  );
});

test('Catalog.build()：真实 src/mm/levels.js 落地后追加 31 关且原有 240 关不变', {
  skip: fs.existsSync(path.join(__dirname, '..', 'src', 'mm', 'levels.js'))
    ? false
    : '真实 MM 关卡尚未生成（src/mm/levels.js 缺失）'
}, () => {
  const RSL = loadRuntime({
    files: DATA_FILES.concat(['src/mm/flags.js', 'src/mm/levels.js', 'src/catalog.js']),
    globals: { location: { search: '?mm=1' } }
  });
  const real = RSL.MM_LEVELS;
  assert.equal(real.length, 31, '真实 RSL.MM_LEVELS 应为 31 关');

  const built = RSL.Catalog.build();
  assert.equal(built.length, 271, '真实数据下开启 flag 应为 240 + 31 关');
  assert.equal(
    JSON.stringify(plain(built.slice(0, 240))),
    JSON.stringify(BASELINE),
    '真实 MM 关卡追加后，原有 240 关仍必须逐字段不变'
  );

  const appended = Array.from(built.slice(240));
  assert.deepEqual(appended.map((lv) => lv.id), Array.from(real.map((lv) => lv.id)), '追加顺序应等于 RSL.MM_LEVELS');
  const ids = new Set(appended.map((lv) => lv.id));
  assert.equal(ids.size, 31, '追加的 MM 关卡 id 应唯一');
  appended.forEach((level, i) => {
    assert.equal(level.chapterGroup, 'MM', level.id + ' 的 chapterGroup 应为 MM');
    assert.equal(level.chapter, 'mm', level.id + ' 的 chapter 应为 mm');
    assert.equal(level.band, 'mm', level.id + ' 的 band 应为 mm');
    assert.deepEqual(plain(level.requires), [], level.id + ' 的 requires 应为空数组');
    assert.equal(level._ord, 240 + i, level.id + ' 的 _ord 应从 240 顺延');
    assert.equal(level.mode, 'mm-proof', level.id + ' 的 mode 应为 mm-proof');
    assert.equal(level.proofId, real[i].proofId, level.id + ' 的 proofId 应保留');
  });
});

test('Catalog.build()：flag 开启但 RSL.MM_LEVELS 缺失时仍 240 关不崩溃', () => {
  const RSL = loadWithFlag({ globals: { location: { search: '?mm=on' } } });
  const built = plain(RSL.Catalog.build());
  assert.equal(built.length, 240);
  assert.equal(JSON.stringify(built), JSON.stringify(BASELINE));
});

/* ------------------------------------------------------------ 6. 目录杂项契约 */

test('Catalog.chapterOf：mm 章节映射为独立分组 MM', () => {
  const RSL = loadWithFlag();
  assert.equal(RSL.Catalog.chapterOf({ chapter: 'mm' }), 'MM');
  /* 原有四章映射不受影响。 */
  assert.equal(RSL.Catalog.chapterOf({ chapter: 'prop' }), 'Ⅰ');
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
