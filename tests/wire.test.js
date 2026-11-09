/* Node vm tests for the pure port-to-port wiring module (src/wire.js). */
'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');

function loadWire() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  const src = fs.readFileSync(path.join(root, 'src', 'wire.js'), 'utf8');
  vm.runInContext(src, ctx, { filename: 'src/wire.js' });
  assert.ok(ctx.window.RSL && ctx.window.RSL.Wire, 'wire.js must expose window.RSL.Wire');
  return ctx.window.RSL.Wire;
}

const Wire = loadWire();

function orthogonal(pts, label) {
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], q = pts[i];
    assert.ok(p.x === q.x || p.y === q.y, `${label}: segment ${i} not orthogonal`);
  }
}

function samePoints(pts, expected) {
  assert.equal(pts.length, expected.length, 'point count');
  pts.forEach((p, i) => {
    assert.equal(p.x, expected[i].x, 'x@' + i);
    assert.equal(p.y, expected[i].y, 'y@' + i);
  });
}

function crossesRect(pts, r) {
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], q = pts[i];
    const steps = Math.max(1, Math.ceil((Math.abs(q.x - p.x) + Math.abs(q.y - p.y)) / 2));
    for (let k = 0; k <= steps; k++) {
      const t = k / steps;
      const x = p.x + (q.x - p.x) * t, y = p.y + (q.y - p.y) * t;
      if (x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h) return true;
    }
  }
  return false;
}

function shortSegments(pts) {
  const out = [];
  for (let i = 1; i < pts.length; i++) {
    out.push(Math.abs(pts[i].x - pts[i - 1].x) + Math.abs(pts[i].y - pts[i - 1].y));
  }
  return out;
}

test('exposes the pure Wire API', () => {
  for (const name of ['STUB', 'TRACK', 'route', 'simpleRoute', 'pathPoints', 'clean', 'segmentClear', 'pathClear']) {
    assert.ok(Wire[name], `missing Wire.${name}`);
  }
  assert.equal(Wire.STUB, 24);
  assert.equal(Wire.TRACK, 10);
});

test('simpleRoute and pathPoints stay orthogonal and keep endpoints', () => {
  const a = { x: 10, y: 40 }, b = { x: 300, y: 240 };
  const pts = Wire.simpleRoute(a, b);
  samePoints([pts[0], pts[pts.length - 1]], [a, b]);
  orthogonal(pts, 'simpleRoute');
  const d = Wire.pathPoints(pts);
  assert.match(d, /^M10 40/);
  assert.ok(!/NaN|undefined/.test(d));
});

test('clean drops duplicates and collinear points', () => {
  const out = Wire.clean([
    { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 10, y: 0 }, { x: 20, y: 0 },
    { x: 20, y: 10 }, { x: 20, y: 20 }
  ]);
  samePoints(out, [{ x: 0, y: 0 }, { x: 20, y: 0 }, { x: 20, y: 20 }]);
});

test('route connects endpoints with at most two bends', () => {
  const a = { x: 0, y: 100 }, b = { x: 500, y: 200 };
  const pts = Wire.route(a, b, [], { fromId: 'a', toId: 'b' });
  samePoints([pts[0], pts[pts.length - 1]], [a, b]);
  orthogonal(pts, 'route');
  assert.ok(pts.length <= 6, 'route should stay a compact Z');
});

test('route goes around a node rect instead of through it', () => {
  const a = { x: 0, y: 200 }, b = { x: 700, y: 200 };
  const obstacle = { x: 250, y: 100, w: 120, h: 200, id: 'obs' };
  const pts = Wire.route(a, b, [obstacle], { fromId: 'a', toId: 'b' });
  orthogonal(pts, 'obstacle route');
  assert.equal(crossesRect(pts, obstacle), false, 'route must not cross the node');
});

test('close ports do not produce a detour loop', () => {
  const a = { x: 0, y: 100 }, b = { x: 48, y: 140 };
  const pts = Wire.route(a, b, [], { fromId: 'a', toId: 'b' });
  samePoints([pts[0], pts[pts.length - 1]], [a, b]);
  orthogonal(pts, 'close route');
  const segs = shortSegments(pts);
  assert.ok(segs.every((n) => n >= 8 || n === 0), 'no micro jogs: ' + segs.join(','));
});

test('route never crosses any node in a crowded layout', () => {
  const rects = [];
  let seed = 7;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  for (let i = 0; i < 24; i++) {
    rects.push({
      id: 'r' + i,
      x: 120 + Math.floor(rnd() * 560),
      y: 80 + Math.floor(rnd() * 520),
      w: 80 + Math.floor(rnd() * 90),
      h: 44 + Math.floor(rnd() * 80)
    });
  }
  for (let i = 0; i < 18; i++) {
    const a = { x: 20, y: 60 + i * 36 };
    const b = { x: 1100, y: 80 + ((i * 67) % 520) };
    const obstacles = rects.filter((r) =>
      !(a.x > r.x && a.x < r.x + r.w && a.y > r.y && a.y < r.y + r.h) &&
      !(b.x > r.x && b.x < r.x + r.w && b.y > r.y && b.y < r.y + r.h));
    const pts = Wire.route(a, b, obstacles, { fromId: 'a' + i, toId: 'b' + i });
    orthogonal(pts, 'crowded route ' + i);
    for (const r of obstacles) {
      assert.equal(crossesRect(pts, r), false, `wire ${i} crossed ${r.id}`);
    }
  }
});

test('parallel wires get separate vertical tracks', () => {
  const tracks = { v: [] };
  const p1 = Wire.route({ x: 0, y: 100 }, { x: 500, y: 200 }, [], { fromId: 'a1', toId: 'b1', tracks, group: 'g1' });
  const p2 = Wire.route({ x: 0, y: 140 }, { x: 500, y: 240 }, [], { fromId: 'a2', toId: 'b2', tracks, group: 'g2' });
  const tx = (pts) => pts.filter((p, i) => i > 0 && p.x === pts[i - 1].x).map((p) => p.x);
  const v1 = tx(p1), v2 = tx(p2);
  assert.ok(v1.length && v2.length, 'both wires should have a vertical run');
  assert.notEqual(v1[0], v2[0], 'parallel wires must not stack on the same vertical lane');
});
