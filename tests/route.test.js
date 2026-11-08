/* Node vm tests for the pure routing module (src/route.js). */
'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');

function samePoints(pts, expected) {
  assert.equal(pts.length, expected.length, 'point count');
  pts.forEach((p, i) => {
    assert.equal(p.x, expected[i].x, 'x@' + i);
    assert.equal(p.y, expected[i].y, 'y@' + i);
  });
}
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');

function loadRoute() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  const src = fs.readFileSync(path.join(root, 'src', 'route.js'), 'utf8');
  vm.runInContext(src, ctx, { filename: 'src/route.js' });
  assert.ok(ctx.window.RSL, 'route.js must expose window.RSL');
  assert.ok(ctx.window.RSL.Route, 'route.js must expose window.RSL.Route');
  return ctx.window.RSL.Route;
}

const Route = loadRoute();

function orthogonal(pts, label, allowTerminal) {
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], q = pts[i];
    if (p.x === q.x || p.y === q.y) continue;
    // A* works on a 12px grid: an off-grid port can leave a short diagonal
    // connector at either terminal. Everything in between stays orthogonal.
    const terminal = i === 1 || i === pts.length - 1;
    const len = Math.abs(p.x - q.x) + Math.abs(p.y - q.y);
    if (allowTerminal && terminal && len <= 26) continue;
    assert.fail(`${label || 'path'}: segment ${i} not orthogonal (${p.x},${p.y})->(${q.x},${q.y})`);
  }
}

function insideRect(p, r, shrink = 0) {
  return p.x > r.x + shrink && p.x < r.x + r.w - shrink && p.y > r.y + shrink && p.y < r.y + r.h - shrink;
}

function polylineCrossesRect(pts, r) {
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], q = pts[i];
    const steps = Math.max(1, Math.ceil((Math.abs(q.x - p.x) + Math.abs(q.y - p.y)) / 2));
    for (let k = 0; k <= steps; k++) {
      const t = k / steps;
      const x = p.x + (q.x - p.x) * t, y = p.y + (q.y - p.y) * t;
      if (insideRect({ x, y }, r)) return true;
    }
  }
  return false;
}

function sideOf(pts, y) {
  let min = Infinity, max = -Infinity;
  for (const p of pts) { min = Math.min(min, p.y); max = Math.max(max, p.y); }
  return (min + max) / 2 < y ? 'above' : 'below';
}

test('exposes the pure Route API', () => {
  for (const name of ['ROUTE', 'simplePoints', 'pathPoints', 'simplify', 'segmentClear', 'pathClear', 'shortcut', 'fallbackRoute', 'route']) {
    assert.ok(Route[name], `missing Route.${name}`);
  }
  const R = Route.ROUTE;
  assert.equal(R.cell, 12);
  assert.equal(R.clearance, 20);
  assert.equal(R.bound, 28);
  assert.equal(R.stub, 26);
  assert.equal(R.bend, 8);
  assert.equal(R.reverse, 4);
  assert.equal(R.networkPenalty, 64);
  assert.equal(R.segmentPad, 18);
  assert.equal(typeof Route.route, 'function');
});

test('simplePoints stays orthogonal and keeps its endpoints', () => {
  const straight = Route.simplePoints(10, 40, 300, 40);
  assert.equal(straight.length, 2);
  samePoints(straight, [{ x: 10, y: 40 }, { x: 300, y: 40 }]);
  orthogonal(straight, 'simplePoints straight');
  // sub-2px vertical drift is treated as straight (two points, slight slope)
  assert.equal(Route.simplePoints(10, 40, 300, 41).length, 2);

  const jog = Route.simplePoints(10, 40, 300, 240);
  assert.ok(jog.length >= 3);
  samePoints([jog[0], jog[jog.length - 1]], [{ x: 10, y: 40 }, { x: 300, y: 240 }]);
  orthogonal(jog, 'simplePoints jog');

  const loop = Route.simplePoints(300, 40, 100, 240);
  samePoints([loop[0], loop[loop.length - 1]], [{ x: 300, y: 40 }, { x: 100, y: 240 }]);
  orthogonal(loop, 'simplePoints loop');
});

test('pathPoints renders a valid SVG path and 45°-chamfers right angles', () => {
  assert.equal(Route.pathPoints([]), '');
  assert.match(Route.pathPoints([{ x: 0, y: 0 }]), /^M0 0(L0 0)?$/);

  const straight = Route.pathPoints([{ x: 0, y: 0 }, { x: 100, y: 0 }]);
  assert.equal(straight, 'M0 0L100 0');

  const corner = Route.pathPoints([{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }]);
  assert.match(corner, /^M0 0/);
  assert.ok(!/NaN|undefined/.test(corner), `invalid path string: ${corner}`);
  // chamfer: (100,0) is cut to (91,0) and (100,9)
  assert.ok(corner.includes('L91 0'), `expected chamfer point (91,0) in ${corner}`);
  assert.ok(corner.includes('L100 9'), `expected chamfer point (100,9) in ${corner}`);
  const coords = corner.match(/[ML](-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g) || [];
  assert.equal(coords.length, 4);
});

test('simplify drops collinear and direction-preserving points', () => {
  const pts = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 20, y: 0 }, { x: 20, y: 10 }, { x: 20, y: 20 }];
  samePoints(Route.simplify(pts), [{ x: 0, y: 0 }, { x: 20, y: 0 }, { x: 20, y: 20 }]);

  const reversals = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 10 }];
  const out = Route.simplify(reversals);
  samePoints([out[0], out[out.length - 1]], [{ x: 0, y: 0 }, { x: 0, y: 10 }]);
  assert.equal(Route.simplify([{ x: 1, y: 2 }, { x: 3, y: 4 }]).length, 2);
});

test('segmentClear respects the 18px rect padding', () => {
  const rect = { x: 100, y: 100, w: 100, h: 100 };
  assert.equal(Route.segmentClear({ x: 0, y: 150 }, { x: 300, y: 150 }, [rect]), false);
  assert.equal(Route.segmentClear({ x: 0, y: 50 }, { x: 300, y: 50 }, [rect]), true);
  assert.equal(Route.segmentClear({ x: 0, y: 85 }, { x: 300, y: 85 }, [rect]), false);
  assert.equal(Route.segmentClear({ x: 0, y: 150 }, { x: 300, y: 150 }, []), true);
  assert.equal(Route.pathClear([{ x: 0, y: 150 }, { x: 300, y: 150 }], [rect]), false);
});

test('route connects endpoints with an orthogonal polyline', () => {
  const a = { x: 0, y: 300 }, b = { x: 600, y: 300 };
  const pts = Route.route(a, b, [], {}, 'g1');
  assert.ok(pts.length >= 2);
  samePoints([pts[0], pts[pts.length - 1]], [a, b]);
  orthogonal(pts, 'straight route');
});

test('route goes around an obstacle rect instead of through it', () => {
  const a = { x: 0, y: 300 }, b = { x: 700, y: 300 };
  const obstacle = { x: 250, y: 100, w: 120, h: 400, id: 'obs' };
  const pts = Route.route(a, b, [obstacle], {}, 'g1');
  assert.ok(pts.length >= 2);
  orthogonal(pts, 'obstacle route');
  assert.equal(polylineCrossesRect(pts, obstacle), false, 'route must not pass through the node rect');
  // and it must actually detour, not merely be a 2-point diagonal
  const minY = Math.min(...pts.map(p => p.y));
  const maxY = Math.max(...pts.map(p => p.y));
  assert.ok(minY < obstacle.y || maxY > obstacle.y + obstacle.h, 'route should route around the obstacle');
});

test('route never cuts through any rect for a spread of layouts', () => {
  const rects = [
    { x: 120, y: 40, w: 232, h: 112, id: 'n1' },
    { x: 400, y: 240, w: 232, h: 140, id: 'n2' },
    { x: 220, y: 460, w: 160, h: 104, id: 'n3' }
  ];
  const pairs = [
    [{ x: 0, y: 0 }, { x: 800, y: 700 }],
    [{ x: 0, y: 560 }, { x: 800, y: 80 }],
    [{ x: 400, y: 0 }, { x: 400, y: 700 }],
    [{ x: 0, y: 320 }, { x: 800, y: 320 }]
  ];
  for (const [a, b] of pairs) {
    const pts = Route.route(a, b, rects, {}, 'net');
    assert.ok(pts.length >= 2);
    orthogonal(pts, `route ${a.x},${a.y}->${b.x},${b.y}`, true);
    for (const r of rects) {
      assert.equal(polylineCrossesRect(pts, r), false, `route ${a.x},${a.y}->${b.x},${b.y} cuts rect ${r.id}`);
    }
  }
});

test('route prefers its own network and avoids other groups\' used segments', () => {
  const a = { x: -100, y: 300 }, b = { x: 700, y: 300 };
  const wall = { x: 300, y: -60, w: 100, h: 720, id: 'wall' };
  const rects = [wall];
  const used = {};

  const first = Route.route(a, b, rects, used, 'netA');
  assert.ok(Object.keys(used).length > 0, 'route must record used segments');

  const same = Route.route(a, b, rects, used, 'netA');
  const other = Route.route(a, b, rects, used, 'netB');
  const sideFirst = sideOf(first, 300);
  const sideSame = sideOf(same, 300);
  const sideOther = sideOf(other, 300);
  assert.equal(sideSame, sideFirst, 'same output network should reuse its trunk');
  assert.notEqual(sideOther, sideFirst, 'a different network should prefer the unused corridor');
  for (const pts of [first, same, other]) {
    orthogonal(pts, 'reuse route');
    assert.equal(polylineCrossesRect(pts, wall), false);
  }
});

test('final path occupancy keeps different networks off the same collinear run', () => {
  /* 预置一条别的网络占用的横向走廊：y=0, x=96..204（网格 12px => 8..17）。 */
  const used = {};
  for (let gx = 8; gx < 17; gx += 1) used[gx + ',0|' + (gx + 1) + ',0'] = { other: true };
  const pts = Route.route({ x: 0, y: 0 }, { x: 300, y: 0 }, [], used, 'mine');
  orthogonal(pts, 'occupancy route');
  for (let i = 1; i < pts.length; i += 1) {
    const p = pts[i - 1], q = pts[i];
    if (Math.abs(p.y) < 0.6 && Math.abs(q.y) < 0.6) {
      const overlap = Math.max(0, Math.min(Math.max(p.x, q.x), 204) - Math.max(Math.min(p.x, q.x), 96));
      assert.equal(overlap, 0, 'my net must not be straightened onto another net\'s line');
    }
  }
  const recorded = Object.keys(used).some((key) => used[key] && used[key].mine);
  assert.equal(recorded, true, 'final path segments are registered for later nets');
});

test('fallbackRoute returns a clear deterministic detour when A* cannot reach', () => {
  const a = { x: 0, y: 0 }, b = { x: 300, y: 0 };
  const rect = { x: 100, y: 200, w: 100, h: 100, id: 'far' };
  const pts = Route.fallbackRoute(a, b, [rect], 's', 't');
  assert.ok(pts.length >= 2);
  samePoints([pts[0], pts[pts.length - 1]], [a, b]);
  orthogonal(pts, 'fallbackRoute');
});
