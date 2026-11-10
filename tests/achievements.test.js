'use strict';
/* 成就定义数量、ID 唯一性与新增趣味条件的纯函数验收。 */
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { loadRuntime } = require('../scripts/lib/load-runtime');

const RSL = loadRuntime({ files: ['src/achievements.js'] });
const ACH = RSL.Achievements;

function state(extra) {
  return Object.assign({
    levels: [
      { id: 't', code: 'i', band: 'tutorial', tutorial: true, solution: { nodes: [] } },
      { id: 'n', code: '00', band: 'base', solution: { nodes: [] } },
      { id: 'h', code: '20', band: 'challenge', solution: { nodes: [] } },
      { id: 'd', code: '90', band: 'demon', solution: { nodes: [] } }
    ],
    solved: {},
    bestLen: {},
    cleanWins: {},
    levelKinds: {},
    usedKinds: {},
    usedOps: []
  }, extra || {});
}

test('成就共 20 个，ID 与名称唯一，均有说明', () => {
  assert.strictEqual(ACH.list.length, 20);
  assert.strictEqual(new Set(ACH.list.map((a) => a.id)).size, 20, 'ID 唯一');
  assert.strictEqual(new Set(ACH.list.map((a) => a.name)).size, 20, '名称唯一');
  ACH.list.forEach((a) => {
    assert.ok(a.symbol && /^i-/.test(a.symbol), a.id + ' 使用 Heroicons symbol');
    assert.ok(a.desc && a.desc.length > 2, a.id + ' 有说明');
  });
});

test('新增趣味成就会按条件分别触发', () => {
  const cases = [
    ['flash-win', { fastWin: true }],
    ['persistent', { failedChecks: 10 }],
    ['declutter', { deletions: 30 }],
    ['copycat', { pastes: 1 }],
    ['axiom-set', { usedAxioms: ['A1', 'A2', 'A3'] }],
    ['d-both', { levelKinds: { h: ['def-expand', 'def-contract'] } }],
    ['later-lemma', { laterLemma: true }]
  ];
  cases.forEach(([id, extra]) => {
    assert.ok(ACH.evaluate(state(extra)).indexOf(id) >= 0, id + ' 应在条件满足时解锁');
    assert.ok(ACH.evaluate(state()).indexOf(id) < 0, id + ' 不应无条件解锁');
  });
});

test('旧条件仍然有效：五连、超长证明、徒手困难、夜猫子', () => {
  const got = ACH.evaluate(state({
    solved: { h: true },
    levelKinds: { h: ['axiom', 'connective'] },
    usedOps: ['not', 'imp', 'and', 'or', 'iff'],
    maxLen: 40,
    nightOwl: true
  }));
  ['five-conn', 'long-proof', 'no-theorem-hard', 'night-owl'].forEach((id) => {
    assert.ok(got.indexOf(id) >= 0, id + ' 应解锁');
  });
});
