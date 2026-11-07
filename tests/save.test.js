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
  return ctx.window.RSL.Save;
}

test('payload and clean round-trip progress plus winning circuits', () => {
  const Save = load();
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
  const saved = Save.clean(Save.payload(state));
  assert.deepEqual(saved.solved, ['CH1-01']);
  assert.equal(saved.bestLen['CH1-01'], 1);
  assert.equal(saved.circuits['CH1-01'].nodes.length, 1);
  assert.equal(saved.lastId, 'CH1-01');
  assert.ok(Save.store(saved));
  assert.equal(Save.load().solved[0], 'CH1-01');
});

test('clean rejects malformed input and strips unknown circuit fields', () => {
  const Save = load();
  assert.throws(() => Save.clean(null));
  assert.throws(() => Save.clean([]));
  const clean = Save.clean({
    solved: ['a', 1, null],
    circuits: { x: { nodes: [], edges: [], extra: true }, bad: { nodes: [] } }
  });
  assert.deepEqual(clean.solved, ['a']);
  assert.deepEqual(Object.keys(clean.circuits), ['x']);
  assert.equal(clean.circuits.x.extra, undefined);
});
