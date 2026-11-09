'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function load() {
  const ctx = { window: {}, location: { hostname: 'localhost' } };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'src', 'leaderboard.js'), 'utf8'), ctx);
  return ctx.window.RSL.Leaderboard;
}

test('score is solved-count first, module efficiency second', () => {
  const L = load();
  const state = {
    levels: [
      { id: 'a', solution: { nodes: new Array(10) } },
      { id: 'b', solution: { nodes: new Array(20) } },
      { id: 'c', solution: { nodes: new Array(8) } }
    ],
    solved: { a: true, b: true },
    bestLen: { a: 10, b: 40 }
  };
  const p = L.parts(state);
  assert.equal(p.solved, 2);
  assert.equal(p.quality, Math.round(99000 * 20 / 38));
  assert.equal(p.score, 200000 + p.quality);
  assert.ok(p.score < 16777216, 'score fits Toy submitScore range');
});

test('solving one more level always outweighs any efficiency loss', () => {
  const L = load();
  const levels = [];
  for (let i = 0; i < 114; i++) levels.push({ id: 'l' + i, solution: { nodes: new Array(20) } });
  const solved = {};
  for (let i = 0; i < 113; i++) solved['l' + i] = true;
  const a = L.parts({ levels, solved, bestLen: {} });
  const b = L.parts({ levels, solved: Object.assign({}, solved, { l113: true }), bestLen: {} });
  assert.ok(b.score > a.score);
  assert.equal(Math.floor(b.score / L.SOLVED_UNIT), 114);
});
