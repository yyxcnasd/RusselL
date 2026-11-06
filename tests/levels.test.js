/* Validate every level's reference circuit against the real engine. */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..');
const ctx = { window: {}, console, JSON, Math, Date, URLSearchParams };
ctx.globalThis = ctx;
vm.createContext(ctx);
for (const f of ['src/logic.js', 'src/theorems.js', 'src/metamath.js', 'src/predicate.js', 'src/library.js', 'src/levels.js', 'src/engine.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
}
const RSL = ctx.window.RSL;
const levels = RSL.LEVELS.slice().concat((RSL.PREDICATE && RSL.PREDICATE.levels) || []);
let failures = 0;
for (const lv of levels) {
  const target = {
    id: 'target', kind: 'target', x: 900, y: 300, target: lv.target, config: {}
  };
  if (!lv.solution || !lv.solution.nodes) {
    console.log('SKIP', lv.id, 'no solution');
    continue;
  }
  const nodes = [target].concat(lv.solution.nodes.map(n => ({ ...n, config: { ...n.config } })));
  const edges = lv.solution.edges.map((e, i) => ({ id: 'e' + i, from: { ...e.from }, to: { ...e.to } }));
  const r = RSL.Engine.evaluate(lv, nodes, edges);
  const status = r.complete ? 'OK  ' : 'FAIL';
  if (!r.complete) failures++;
  console.log(status, lv.id, lv.target, 'errors:', r.errors.map(e => e.message).join(' | '), 'target:', r.target && r.target.state);
  if (!r.complete) {
    for (const n of nodes) {
      const rr = r.results[n.id];
      if (rr && rr.state !== 'valid' && n.kind !== 'target') console.log('   ', n.kind, n.config, '=>', rr.state, rr.error, rr.note);
    }
  }
}
console.log('\nlevels:', levels.length, 'failures:', failures);
process.exit(failures ? 1 : 0);
