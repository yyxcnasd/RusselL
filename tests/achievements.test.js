const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const ctx = { window: {}, console, JSON, Math };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'src/achievements.js'), 'utf8'), ctx, { filename: 'achievements.js' });
const A = ctx.window.RSL.Achievements;

function level(id, chapter, band, ref) {
  return { id, chapter, band, solution: { nodes: new Array(ref || 1).fill({}) } };
}

function state(overrides) {
  return Object.assign({
    levels: [
      level('CH1-01', 'prop', 'base'), level('CH1-31', 'prop', 'challenge', 3),
      level('CH1-08', 'prop', 'base'), level('CH1-10', 'prop', 'base'), level('CH1-12', 'prop', 'base')
    ],
    solved: {}, bestLen: {}, usedKinds: {}, cleanWins: {}
  }, overrides || {});
}

test('achievement list is fixed and described', () => {
  assert.equal(A.list.length, 20);
  assert.equal(A.byId.first.name, '通电');
  A.list.forEach((a) => {
    assert.ok(a.name && a.desc, a.id + ' has name and description');
    assert.ok(A.byId[a.id] === a);
  });
});

test('first level unlocks only 通电', () => {
  const ids = A.evaluate(state({ solved: { 'CH1-01': true } }));
  assert.deepEqual(ids, ['first']);
});

test('progress, clean wins, and metric conditions are evaluated', () => {
  const s = state({
    solved: { 'CH1-01': true, 'CH1-08': true, 'CH1-10': true },
    cleanWins: { 'CH1-01': true, 'CH1-08': true, 'CH1-10': true },
    bestLen: { 'CH1-08': 10, 'CH1-10': 13 }
  });
  const ids = A.evaluate(s);
  assert.ok(ids.includes('three'));
  assert.ok(ids.includes('clean-three'));
  assert.ok(ids.includes('prefix-clean'));
  assert.ok(ids.includes('hs-clean'));
  assert.ok(!ids.includes('compose-clean'));
});

test('efficient only counts challenge levels', () => {
  const base = state({ solved: { 'CH1-01': true }, bestLen: { 'CH1-01': 1 } });
  assert.ok(!A.evaluate(base).includes('efficient'));
  const chal = state({ solved: { 'CH1-31': true }, bestLen: { 'CH1-31': 3 } });
  assert.ok(A.evaluate(chal).includes('efficient'));
});
