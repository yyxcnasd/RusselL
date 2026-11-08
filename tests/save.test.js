const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
function load() {
  const store = {};
  const ctx = {
    window: {}, console, JSON, Math,
    localStorage: {
      getItem(k) { return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null; },
      setItem(k, v) { store[k] = String(v); }
    }
  };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'src/save.js'), 'utf8'), ctx, { filename: 'save.js' });
  return { Save: ctx.window.RSL.Save, store };
}

test('payload and clean round-trip progress plus winning circuits (schema v3)', () => {
  const { Save } = load();
  const state = {
    solved: { 'CH1-01': true },
    bestLen: { 'CH1-01': 1 },
    usedKinds: { subst: true },
    usedArchive: {},
    usedTheorem: {},
    cleanWins: { 'CH1-01': true },
    circuits: {
      'CH1-01': { nodes: [{ id: 'a', kind: 'axiom', x: 16, y: 16, config: {} }], edges: [] }
    },
    achievements: { first: true },
    coachSeen: {},
    level: { id: 'CH1-01' },
    lastId: null
  };
  const payload = Save.payload(state);
  assert.equal(payload.version, 3, 'payload 应输出 schema v3');
  const saved = Save.clean(payload);
  assert.equal(saved.version, 3, 'clean 应输出 schema v3');
  assert.deepEqual(saved.solved, ['CH1-01']);
  assert.equal(saved.bestLen['CH1-01'], 1);
  assert.equal(saved.circuits['CH1-01'].nodes.length, 1);
  assert.equal(saved.circuits['CH1-01'].nodes[0].config && Object.keys(saved.circuits['CH1-01'].nodes[0].config).length, 0);
  assert.equal(saved.lastId, 'CH1-01');
  assert.ok(Save.store(saved));
  assert.equal(Save.load().solved[0], 'CH1-01');
  assert.equal(Save.load().version, 3);
});

test('clean upgrades a v2 save to v3 and keeps its fields', () => {
  const { Save } = load();
  const v2 = {
    version: 2,
    solved: ['CH1-01', 'MM-01'],
    bestLen: { 'CH1-01': 2, 'MM-01': 7 },
    usedKinds: ['atom'],
    usedArchive: [],
    usedTheorem: [],
    cleanWins: ['CH1-01'],
    circuits: { 'CH1-01': { nodes: [{ id: 'a', kind: 'atom', x: 0, y: 0, config: { name: 'P' } }], edges: [] } },
    achievements: ['first'],
    coachSeen: [],
    lastId: 'CH1-01'
  };
  const upgraded = Save.clean(v2);
  assert.equal(upgraded.version, 3, 'v2 存档应升级为 v3');
  assert.deepEqual(upgraded.solved, v2.solved);
  assert.equal(upgraded.bestLen['MM-01'], 7);
  assert.equal(upgraded.circuits['CH1-01'].nodes[0].config.name, 'P', '节点 config 原样保留');
  assert.deepEqual(upgraded.achievements, ['first']);
  assert.equal(upgraded.lastId, 'CH1-01');
});

test('clean rejects malformed input, unknown versions and strips unknown circuit fields', () => {
  const { Save } = load();
  assert.throws(() => Save.clean(null));
  assert.throws(() => Save.clean([]));
  assert.throws(() => Save.clean('v2'), '字符串不是存档');
  assert.throws(() => Save.clean({ version: 99 }), '未知 schema 版本应拒绝');
  assert.throws(() => Save.clean({ version: '3' }), '版本号必须是数字');
  /* v2/v3/缺省版本都接受（缺省版本 = 旧的无版本存档）。 */
  assert.equal(Save.clean({}).version, 3);
  assert.equal(Save.clean({ version: 3 }).version, 3);

  const clean = Save.clean({
    solved: ['a', 1, null],
    circuits: { x: { nodes: [], edges: [], extra: true }, bad: { nodes: [] } }
  });
  assert.deepEqual(clean.solved, ['a']);
  assert.deepEqual(Object.keys(clean.circuits), ['x']);
  assert.equal(clean.circuits.x.extra, undefined);
});
