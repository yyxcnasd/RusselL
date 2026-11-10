'use strict';
/* 存档 schema v4 / 迁移测试。
 *
 * 关键约束：旧 code/id 会被新 campaign 复用，迁移只能按目标公式 token 映射；
 * 旧电路、找不到目标的旧关卡必须丢弃并在 report 里说明。测试用合成 levels，
 * 不绑定某一次 campaign 的具体编号；只有 legacy-targets 一致性测试会读取
 * campaign/campaign2-levels.json，并在 campaign 换代后改用冻结快照哈希校验。
 */
const test = require('node:test');
const assert = require('node:assert');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { loadRuntime } = require('../scripts/lib/load-runtime');

const ROOT = path.join(__dirname, '..');
const { RSL, ctx } = loadRuntime({
  files: ['src/term.js', 'src/save.js', 'src/legacy-targets.js', 'src/cloudsave.js'],
  localStorage: true,
  withContext: true
});
const SAVE = RSL.Save;
const CloudSave = RSL.CloudSave;
const T = RSL.Term;
const BACKSLASH = String.fromCharCode(92);

function level(id, code, targetTokens) {
  return { id, code, targetTokens, tutorial: false, chapter: 0 };
}

function circuit(count) {
  var nodes = [];
  for (var i = 0; i < count; i += 1) nodes.push({ id: 'n' + i, kind: 'axiom', x: 0, y: 0, config: {} });
  return { nodes: nodes, edges: [] };
}

/* vm 上下文里的数组/对象原型与测试进程不同，deepStrictEqual 会误判；
   存档是纯 JSON 数据，用序列化比较语义。 */
function eqJSON(actual, expected, message) {
  assert.strictEqual(JSON.stringify(actual), JSON.stringify(expected), message);
}

function rawV3(extra) {
  return Object.assign({
    version: 3,
    solved: [],
    bestLen: {},
    usedKinds: [],
    cleanWins: [],
    circuits: {},
    achievements: [],
    lastId: null
  }, extra || {});
}

const LEVELS = [
  level('01', '01', ['|-', 'P']),
  level('02', '02', ['|-', 'Q']),
  level('03', '03', ['|-', 'R']),
  /* 新 campaign 里也有一个 code 与旧代号相同的关卡，但目标不同，绝不能被旧存档点亮 */
  level('Ⅰ-01', 'Ⅰ-01', ['|-', 'DIFFERENT'])
];
const LEGACY = {
  'Ⅰ-01': ['|-', 'P'],
  'Ⅰ-02': ['|-', 'Q'],
  'Ⅰ-03': ['|-', 'R']
};

test('payload 带 campaign 指纹，level 变化即指纹变化', () => {
  const fp = SAVE.fingerprint(LEVELS);
  assert.match(fp, /^fnv1a-[0-9a-f]{8}$/);
  const p = SAVE.payload({
    levels: LEVELS,
    solved: { '01': true },
    bestLen: { '01': 3 },
    usedKinds: { mp: true },
    cleanWins: { '01': true },
    circuits: { '01': circuit(2) },
    achievements: { first: true },
    level: { id: '02' }
  });
  assert.strictEqual(p.version, 4);
  assert.strictEqual(p.campaign, fp);
  eqJSON(p.solved, ['01']);
  eqJSON(p.bestLen, { '01': 3 });
  eqJSON(p.usedKinds, ['mp']);
  assert.strictEqual(p.lastId, '02');
  assert.notStrictEqual(SAVE.fingerprint([level('01', '01', ['|-', 'X'])]), fp);
  assert.strictEqual(SAVE.fingerprint([]), null);
});

test('schema v3 → v4：按 targetTokens 映射 solved/bestLen/cleanWins/lastId，丢弃未知与旧电路', () => {
  const raw = rawV3({
    solved: ['Ⅰ-01', 'Ⅰ-02', 'Ⅰ-99'],
    bestLen: { 'Ⅰ-01': 7, 'Ⅰ-02': 9, 'Ⅰ-99': 2 },
    cleanWins: ['Ⅰ-01', 'Ⅰ-99'],
    circuits: { 'Ⅰ-01': circuit(3), '01': circuit(1), 'Ⅰ-99': circuit(2) },
    achievements: ['first', 'ten'],
    usedKinds: ['mp', 'axiom'],
    lastId: 'Ⅰ-02'
  });
  const legacy = Object.assign({ 'Ⅰ-99': ['|-', 'GONE'] }, LEGACY);
  const out = SAVE.migrate(raw, LEVELS, legacy);
  const save = out.save, report = out.report;

  assert.strictEqual(save.version, 4);
  assert.strictEqual(save.campaign, SAVE.fingerprint(LEVELS));
  eqJSON(save.solved, ['01', '02']);
  /* 旧代号 Ⅰ-01 在新 campaign 里存在但目标不同：不能按 code 误点 */
  assert.strictEqual(save.solved.indexOf('Ⅰ-01'), -1);
  eqJSON(save.bestLen, { '01': 7, '02': 9 });
  eqJSON(save.cleanWins, ['01']);
  assert.strictEqual(save.lastId, '02');
  eqJSON(save.achievements, ['first', 'ten']);
  eqJSON(save.usedKinds, ['mp', 'axiom']);
  /* 旧 campaign 的电路一律丢弃（即使 key 恰好等于新关卡 id） */
  eqJSON(save.circuits, {});

  assert.strictEqual(report.migrated, true);
  assert.strictEqual(report.fromCampaign, 'legacy-v3');
  assert.strictEqual(report.toCampaign, save.campaign);
  assert.strictEqual(report.keptSolved, 2);
  assert.strictEqual(report.droppedSolved, 1);
  eqJSON(report.droppedSolvedIds, ['Ⅰ-99']);
  assert.strictEqual(report.keptBestLen, 2);
  assert.strictEqual(report.droppedBestLen, 1);
  assert.strictEqual(report.keptCleanWins, 1);
  assert.strictEqual(report.droppedCleanWins, 1);
  assert.strictEqual(report.keptCircuits, 0);
  assert.strictEqual(report.droppedCircuits, 3);
  assert.strictEqual(report.lastIdMapped, true);
  assert.strictEqual(report.mapping['Ⅰ-01'], '01');
  assert.strictEqual(report.mapping['Ⅰ-99'], null);
});

test('bestLen 取较小值，cleanWins / lastId 按映射落到新 id', () => {
  const raw = rawV3({
    solved: ['Ⅰ-01'],
    bestLen: { 'Ⅰ-01': 5, 'Ⅰ-02': 4 },
    cleanWins: ['Ⅰ-02'],
    lastId: 'Ⅰ-02'
  });
  const save = SAVE.migrate(raw, LEVELS, LEGACY).save;
  eqJSON(save.solved, ['01']);
  eqJSON(save.bestLen, { '01': 5, '02': 4 });
  eqJSON(save.cleanWins, ['02']);
  assert.strictEqual(save.lastId, '02');
});

test('同一 campaign 的 v4 存档不重映射，保留电路；只过滤已不存在的关卡', () => {
  const fp = SAVE.fingerprint(LEVELS);
  const raw = {
    version: 4,
    campaign: fp,
    solved: ['01', 'removed-level'],
    bestLen: { '01': 2, 'removed-level': 4 },
    usedKinds: ['mp'],
    cleanWins: ['01'],
    circuits: { '01': circuit(2), 'removed-level': circuit(1) },
    achievements: ['first'],
    lastId: '01'
  };
  const out = SAVE.migrate(raw, LEVELS, null);
  eqJSON(out.save.solved, ['01']);
  eqJSON(out.save.bestLen, { '01': 2 });
  eqJSON(Object.keys(out.save.circuits), ['01']);
  eqJSON(out.save.achievements, ['first']);
  assert.strictEqual(out.save.lastId, '01');
  assert.strictEqual(out.report.migrated, true);
  assert.strictEqual(out.report.droppedSolved, 1);
  assert.strictEqual(out.report.droppedCircuits, 1);

  const clean = SAVE.migrate(SAVE.payload({ levels: LEVELS, solved: { '01': true }, level: { id: '01' } }), LEVELS, null);
  assert.strictEqual(clean.report.migrated, false);
  eqJSON(clean.save.solved, ['01']);
});

test('campaign 不匹配：未知旧存档 0 保留，旧电路全丢，报告明确', () => {
  const raw = {
    version: 4,
    campaign: 'fnv1a-deadbeef',
    solved: ['01'],
    bestLen: { '01': 2 },
    cleanWins: [],
    circuits: { '01': circuit(2) },
    achievements: ['first'],
    lastId: '01'
  };
  const out = SAVE.migrate(raw, LEVELS, null);
  eqJSON(out.save.solved, []);
  eqJSON(out.save.bestLen, {});
  eqJSON(out.save.circuits, {});
  assert.strictEqual(out.save.lastId, null);
  eqJSON(out.save.achievements, ['first']);
  assert.strictEqual(out.report.migrated, true);
  assert.strictEqual(out.report.fromCampaign, 'fnv1a-deadbeef');
  assert.strictEqual(out.report.toCampaign, SAVE.fingerprint(LEVELS));
  assert.strictEqual(out.report.keptSolved, 0);
  assert.strictEqual(out.report.droppedSolved, 1);
  assert.strictEqual(out.report.droppedCircuits, 1);
  /* 没有 legacy 查表时明确标记，调用方不应静默持久化 */
  assert.strictEqual(out.report.missingLegacy, true);
});

test('缺少 legacy 映射：不按 code 瞎猜，全部丢弃并标记 missingLegacy', () => {
  const raw = rawV3({ solved: ['Ⅰ-01', '01'], lastId: 'Ⅰ-01' });
  const out = SAVE.migrate(raw, LEVELS, null);
  eqJSON(out.save.solved, []);
  assert.strictEqual(out.save.lastId, null);
  assert.strictEqual(out.report.missingLegacy, true);
  assert.strictEqual(out.report.keptSolved, 0);
  assert.strictEqual(out.report.droppedSolved, 2);
});

test('T.eq 兜底：旧表面语法能映射到新 campaign 的展开形目标', () => {
  const surface = ['|-', '(', 'P', BACKSLASH + '/', 'Q', ')'];
  const expanded = T.expandDefinitions(surface);
  assert.ok(T.eq(surface, expanded), '测试前提：T.eq 认为两者等价');
  const levels = [level('01', '01', expanded)];
  const out = SAVE.migrate(rawV3({ solved: ['Ⅰ-01'], lastId: 'Ⅰ-01' }), levels, { 'Ⅰ-01': surface });
  eqJSON(out.save.solved, ['01']);
  assert.strictEqual(out.save.lastId, '01');
});

test('迁移幂等：迁移后的 v4 存档再迁移不丢进度、不重复提示', () => {
  const once = SAVE.migrate(rawV3({ solved: ['Ⅰ-01', 'Ⅰ-02'], lastId: 'Ⅰ-02' }), LEVELS, LEGACY);
  const twice = SAVE.migrate(once.save, LEVELS, LEGACY);
  assert.strictEqual(twice.report.migrated, false);
  eqJSON(twice.save.solved, ['01', '02']);
  assert.strictEqual(twice.save.lastId, '02');
});

test('版本处理：接受 v1/v2/v3，拒绝更新或未知版本/损坏结构', () => {
  [1, 2, 3].forEach((v) => {
    const c = SAVE.clean({ version: v, solved: ['x'] });
    assert.strictEqual(c.version, 4);
    assert.strictEqual(c.sourceVersion, v);
    eqJSON(c.solved, ['x']);
  });
  assert.throws(() => SAVE.clean(null), /bad save/);
  assert.throws(() => SAVE.clean([]), /bad save/);
  assert.throws(() => SAVE.clean('{}'), /bad save/);
  [5, 99, 0, -1, 1.5, '3', 'new'].forEach((v) => {
    assert.throws(() => SAVE.clean({ version: v }), /version/);
  });
  assert.throws(() => SAVE.migrate({ version: 5 }, LEVELS, LEGACY), /version/);
});

test('localStorage 写入失败返回 false；backup 保留第一次旧档', () => {
  const storage = ctx.localStorage;
  storage.clear();
  assert.strictEqual(SAVE.store({ version: 4 }), true);
  eqJSON(SAVE.load(), { version: 4 });
  assert.strictEqual(SAVE.backup({ version: 3, solved: ['old'] }), true);
  eqJSON(JSON.parse(storage.getItem(SAVE.backupKey)), { version: 3, solved: ['old'] });
  SAVE.backup({ version: 2, solved: ['older'] });
  eqJSON(JSON.parse(storage.getItem(SAVE.backupKey)), { version: 3, solved: ['old'] });
  storage.clear();
});

test('云存档 equal 忽略 savedAt 与本地其它关卡电路；apply 合并电路并更新进度', () => {
  const levels = [level('01', '01', ['|-', 'P']), level('02', '02', ['|-', 'Q'])];
  const fp = SAVE.fingerprint(levels);
  const state = {
    levels,
    level: { id: '01' },
    solved: { '01': true },
    bestLen: { '01': 3 },
    usedKinds: { mp: true },
    cleanWins: { '01': true },
    circuits: { '01': circuit(1), '02': circuit(2) },
    achievements: { first: true },
    lastId: '01'
  };
  const cloud = {
    version: 4,
    campaign: fp,
    solved: ['01'],
    bestLen: { '01': 3 },
    usedKinds: ['mp'],
    cleanWins: ['01'],
    circuits: { '01': circuit(1) },
    achievements: ['first'],
    lastId: '01',
    savedAt: Date.now()
  };
  assert.strictEqual(CloudSave.equal(state, cloud), true);
  assert.strictEqual(CloudSave.equal(state, Object.assign({}, cloud, { solved: ['01', '02'] })), false);

  assert.strictEqual(CloudSave.apply(state, Object.assign({}, cloud, { solved: ['01', '02'], lastId: '02' })), true);
  eqJSON(Object.keys(state.solved), ['01', '02']);
  eqJSON(Object.keys(state.circuits), ['01', '02'], '本地其它关卡电路不被云存档覆盖丢失');
  assert.strictEqual(state.lastId, '02');
});

test('运行时装载冒烟：真实 src/levels.js + legacy 映射可迁移 v3 存档', () => {
  const real = loadRuntime({
    files: ['src/term.js', 'src/levels.js', 'src/campaign-meta.js', 'src/achievements.js', 'src/save.js', 'src/legacy-targets.js']
  });
  assert.ok(Array.isArray(real.LEVELS) && real.LEVELS.length >= 96, '真实关卡表');
  assert.strictEqual(Object.keys(real.LEGACY_TARGETS).length, 152, '旧关卡映射');
  const codes = Object.keys(real.LEGACY_TARGETS).slice(0, 5);
  const raw = rawV3({ solved: codes, lastId: codes[1], bestLen: { [codes[0]]: 3 } });
  const out = real.Save.migrate(raw, real.LEVELS, real.LEGACY_TARGETS);
  assert.ok(out.report.keptSolved >= 1, '真实运行时至少迁移一关：' + out.report.keptSolved);
  assert.ok(out.save.solved.every((id) => real.LEVELS.some((lv) => lv.id === id)), '迁移 id 都属于当前关卡');
  eqJSON(out.save.circuits, {}, '迁移不保留旧电路');
  assert.strictEqual(out.save.campaign, real.Save.fingerprint(real.LEVELS), '指纹与当前关卡一致');
});

test('legacy-targets.js 与旧 152 关 campaign 快照一致', () => {
  const map = RSL.LEGACY_TARGETS;
  assert.ok(map && typeof map === 'object');
  const keys = Object.keys(map);
  assert.strictEqual(keys.length, 152, '旧 campaign 的 code 数');
  keys.forEach((code) => {
    assert.match(code, /^[ⅠⅡⅢⅣ]-(?:[ivx]+|\d{2})$/, code);
    assert.ok(Array.isArray(map[code]), code + ' targetTokens');
    assert.strictEqual(map[code][0], '|-', code + ' targetTokens[0]');
  });
  /* 冻结快照哈希：legacy 数据只生成一次，新 campaign 改写后不能跟着变 */
  assert.strictEqual(
    crypto.createHash('sha256').update(JSON.stringify(map)).digest('hex'),
    '70e98d028b7cdbf425f4b0513e1360ac017d9aaf798d6f2ffcb0f34562e00bf9'
  );

  const campaignPath = path.join(ROOT, 'campaign', 'campaign2-levels.json');
  if (!fs.existsSync(campaignPath)) return;
  const campaign = JSON.parse(fs.readFileSync(campaignPath, 'utf8'));
  const oldCampaign = Array.isArray(campaign) && campaign.length === 152 &&
    campaign.every((lv) => /^[ⅠⅡⅢⅣ]-/.test(String((lv && lv.code) || '')));
  if (oldCampaign) {
    const expected = {};
    campaign.forEach((lv) => { if (!expected[lv.code]) expected[lv.code] = lv.targetTokens; });
    eqJSON(map, expected, 'legacy-targets.js 应由当前旧 campaign 生成');
  }
});
