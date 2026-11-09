/* 公理板 — pure geometry + orthogonal wire routing.
 * No DOM, no Board instance, no app state. Loaded as a classic script before
 * src/board.js; also safe to load in a Node vm (only touches window.RSL).
 *
 * Public surface: window.RSL.Route
 *   ROUTE            grid / clearance constants
 *   simplePoints     quick 2-6 point orthogonal polyline between two points
 *   pathPoints       points -> SVG path string (PCB-style 45° chamfers)
 *   simplify         drop collinear + vacuous points
 *   segmentClear     segment vs. padded node rects test
 *   pathClear        polyline vs. padded node rects test
 *   shortcut         replace A* staircase runs with clean two-segment paths
 *   fallbackRoute    deterministic detour when A* cannot reach the target
 *   route            grid A* (bend / reverse / network-reuse penalties)
 */
(function () {
  'use strict';
  var root = typeof window !== 'undefined' ? window : globalThis;
  root.RSL = root.RSL || {};

  var ROUTE = {
    cell: 12,
    clearance: 20,
    bound: 28,
    stub: 26,
    bend: 8,
    reverse: 4,
    networkPenalty: 64,
    segmentPad: 18
  };

  function cellSign(v) { return v > 0 ? 1 : (v < 0 ? -1 : 0); }
  function abs(v) { return v < 0 ? -v : v; }

  /* Quick orthogonal polyline between two arbitrary points. Used while
   * dragging (cheap preview) and as the last-resort fallback. */
  function simplePoints(x1, y1, x2, y2) {
    if (Math.abs(y2 - y1) < 2) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
    if (x2 - x1 > 60) {
      var mx = x1 + (x2 - x1) * 0.5;
      return [{ x: x1, y: y1 }, { x: mx, y: y1 }, { x: mx, y: y2 }, { x: x2, y: y2 }];
    }
    var loop = 28;
    var my = y1 + (y2 - y1) / 2;
    return [
      { x: x1, y: y1 },
      { x: x1 + loop, y: y1 },
      { x: x1 + loop, y: my },
      { x: x2 - loop, y: my },
      { x: x2 - loop, y: y2 },
      { x: x2, y: y2 }
    ];
  }

  /* PCB-style 45° chamfers: cut each right-angle corner by a fixed amount.
   * Points stay integral; only the rendered path string gets the chamfer.
   * Short runs keep their sharp corner / get a half-length cut so two nearby
   * corners can never overlap into a spike. */
  function pathPoints(pts) {
    if (!pts || !pts.length) return '';
    var src = [pts[0]];
    for (var k = 1; k < pts.length; k++) {
      var prev = src[src.length - 1];
      if (pts[k].x !== prev.x || pts[k].y !== prev.y) src.push(pts[k]);
    }
    if (src.length === 1) return 'M' + src[0].x + ' ' + src[0].y;
    var out = [src[0]];
    for (var i = 1; i < src.length - 1; i++) {
      var a = out[out.length - 1], b = src[i], c = src[i + 1];
      var horizontal = abs(a.y - b.y) < 1 && abs(b.y - c.y) > 1;
      var vertical = abs(a.x - b.x) < 1 && abs(b.x - c.x) > 1;
      var ab = abs(a.x - b.x) + abs(a.y - b.y);
      var bc = abs(c.x - b.x) + abs(c.y - b.y);
      var cut = Math.min(9, Math.floor(ab / 2), Math.floor(bc / 2));
      if ((horizontal || vertical) && cut >= 3 && ab > cut * 2 && bc > cut * 2) {
        out.push({ x: b.x - cellSign(b.x - a.x) * cut, y: b.y - cellSign(b.y - a.y) * cut });
        out.push({ x: b.x + cellSign(c.x - b.x) * cut, y: b.y + cellSign(c.y - b.y) * cut });
      } else out.push(b);
    }
    out.push(src[src.length - 1]);
    var d = 'M' + out[0].x + ' ' + out[0].y;
    for (var j = 1; j < out.length; j++) d += 'L' + out[j].x + ' ' + out[j].y;
    return d;
  }

  /* Drop points that do not change the direction of travel; collinear
   * reversals (A→B→A) are dropped as well, otherwise they render as spikes. */
  function simplify(pts) {
    if (!pts || pts.length <= 2) return pts;
    var out = [pts[0]];
    for (var i = 1; i < pts.length - 1; i++) {
      var a = out[out.length - 1], b = pts[i], c = pts[i + 1];
      if (a.x === b.x && a.y === b.y) continue;
      var abx = b.x - a.x, aby = b.y - a.y, bcx = c.x - b.x, bcy = c.y - b.y;
      if (abx === 0 && bcx === 0) continue;
      if (aby === 0 && bcy === 0) continue;
      out.push(b);
    }
    if (out[out.length - 1].x === pts[pts.length - 1].x &&
        out[out.length - 1].y === pts[pts.length - 1].y) return out;
    out.push(pts[pts.length - 1]);
    return out;
  }

  /* Remove tiny H/V jogs left between two nearby corners (common right at a
   * port or where several routes negotiate the same corridor). */
  function despike(pts, rects, freeCheck) {
    if (!pts || pts.length < 3) return pts;
    var out = [pts[0]];
    for (var i = 1; i < pts.length - 1; i++) {
      var a = out[out.length - 1], b = pts[i], c = pts[i + 1];
      var ab = abs(a.x - b.x) + abs(a.y - b.y);
      var bc = abs(c.x - b.x) + abs(c.y - b.y);
      var small = ab < ROUTE.stub || bc < ROUTE.stub;
      var aligned = a.x === c.x || a.y === c.y;
      if (small && aligned && segmentClear(a, c, rects) && (!freeCheck || freeCheck(a, c))) continue;
      out.push(b);
    }
    out.push(pts[pts.length - 1]);
    return simplify(out);
  }

  function segmentClear(p, q, rects) {
    var pad = ROUTE.segmentPad;
    var steps = Math.max(1, Math.ceil((abs(q.x - p.x) + abs(q.y - p.y)) / 8));
    for (var i = 1; i < steps; i++) {
      var t = i / steps;
      var x = p.x + (q.x - p.x) * t, y = p.y + (q.y - p.y) * t;
      for (var r = 0; r < rects.length; r++) {
        var rr = rects[r];
        if (x > rr.x - pad && x < rr.x + rr.w + pad && y > rr.y - pad && y < rr.y + rr.h + pad) return false;
      }
    }
    return true;
  }

  function pathClear(pts, rects) {
    for (var i = 1; i < pts.length; i++) if (!segmentClear(pts[i - 1], pts[i], rects)) return false;
    return true;
  }

  /* Replace the A* staircase with clean straight / two-segment runs.
   * extraFree（可选）用来排除已被其它网络占用的线段，避免 shortcut 把
   * 不同网络的走线压到同一条线上。 */
  function shortcut(pts, rects, extraFree) {
    if (!pts || pts.length < 3) return pts;
    function clear(p, q) {
      return segmentClear(p, q, rects) && (!extraFree || extraFree(p, q));
    }
    function lpath(p, q) {
      if (p.x === q.x || p.y === q.y) return clear(p, q) ? [p, q] : null;
      var c1 = { x: q.x, y: p.y };
      if (clear(p, c1) && clear(c1, q)) return [p, c1, q];
      var c2 = { x: p.x, y: q.y };
      if (clear(p, c2) && clear(c2, q)) return [p, c2, q];
      return null;
    }
    var out = pts.slice();
    for (var pass = 0; pass < 24; pass++) {
      var changed = false;
      for (var i = 0; i < out.length - 2; i++) {
        var target = null;
        for (var j = out.length - 1; j > i + 1; j--) {
          var lp = lpath(out[i], out[j]);
          if (lp) { target = { j: j, path: lp }; break; }
        }
        if (!target) continue;
        out = out.slice(0, i + 1).concat(target.path.slice(1, -1), [out[target.j]], out.slice(target.j + 1));
        changed = true;
        break;
      }
      if (!changed) break;
    }
    return out;
  }

  /* Deterministic detour used when the grid search cannot reach b. */
  function fallbackRoute(a, b, rects, fromId, toId) {
    var obstacles = rects.filter(function (r) { return r.id !== fromId && r.id !== toId; });
    var minY = Math.min(a.y, b.y), maxY = Math.max(a.y, b.y);
    obstacles.forEach(function (r) { minY = Math.min(minY, r.y); maxY = Math.max(maxY, r.y + r.h); });
    var top = minY - 40, bottom = maxY + 40;
    var candidates = [
      simplePoints(a.x, a.y, b.x, b.y),
      [{ x: a.x, y: a.y }, { x: a.x, y: top }, { x: b.x, y: top }, { x: b.x, y: b.y }],
      [{ x: a.x, y: a.y }, { x: a.x, y: bottom }, { x: b.x, y: bottom }, { x: b.x, y: b.y }]
    ];
    for (var i = 0; i < candidates.length; i++) {
      if (pathClear(candidates[i], obstacles)) return simplify(candidates[i]);
    }
    return simplePoints(a.x, a.y, b.x, b.y);
  }

  /* =========================================================================
   * 占用表（negotiated congestion / rip-up 风格的基础）
   *
   * used 的 key 使用**全局**网格坐标（而不是每条走线自己的局部 origin），
   * 这样不同走线之间才能比较“谁占了哪段”。
   *   横向线段：y0 === y1，x 取区间；纵向线段：x0 === x1，y 取区间。
   * shortcut 之前先查占用，避免把两条不同网络的走线折叠到同一条线。
   * ========================================================================= */

  function segmentKey(x0, y0, x1, y1) {
    if (x0 < x1 || (x0 === x1 && y0 < y1)) return x0 + ',' + y0 + '|' + x1 + ',' + y1;
    return x1 + ',' + y1 + '|' + x0 + ',' + y0;
  }

  function addOccupancy(used, group, x0, y0, x1, y1) {
    var key = segmentKey(x0, y0, x1, y1);
    if (!used[key]) used[key] = {};
    used[key][String(group || '')] = true;
  }

  function groupConflict(groups, group) {
    if (!groups) return false;
    for (var gk in groups) {
      if (Object.prototype.hasOwnProperty.call(groups, gk) && gk !== String(group || '')) return true;
    }
    return false;
  }

  function buildOccupancy(used, cell) {
    var h = Object.create(null), v = Object.create(null);
    Object.keys(used || {}).forEach(function (key) {
      var m = /^(-?\d+),(-?\d+)\|(-?\d+),(-?\d+)$/.exec(key);
      if (!m) return;
      var x0 = +m[1], y0 = +m[2], x1 = +m[3], y1 = +m[4];
      var groups = used[key];
      if (y0 === y1) {
        var line = y0;
        (h[line] = h[line] || []).push({ a: Math.min(x0, x1), b: Math.max(x0, x1), groups: groups });
      } else if (x0 === x1) {
        var vline = x0;
        (v[vline] = v[vline] || []).push({ a: Math.min(y0, y1), b: Math.max(y0, y1), groups: groups });
      }
    });
    return { h: h, v: v, cell: cell };
  }

  /* 候选线段是否与其它网络的占用线段共线重叠（占用单位是网格）。 */
  function segmentBlocked(p, q, group, occupancy) {
    var cell = occupancy.cell;
    if (Math.abs(p.y - q.y) < 0.6) {
      var line = Math.round(p.y / cell);
      var list = occupancy.h[line];
      if (!list) return false;
      var a = Math.min(p.x, q.x) / cell, b = Math.max(p.x, q.x) / cell;
      for (var i = 0; i < list.length; i += 1) {
        var e = list[i];
        if (!groupConflict(e.groups, group)) continue;
        if (Math.min(b, e.b) - Math.max(a, e.a) > 0.35) return true;
      }
      return false;
    }
    if (Math.abs(p.x - q.x) < 0.6) {
      var vline = Math.round(p.x / cell);
      var vlist = occupancy.v[vline];
      if (!vlist) return false;
      var c = Math.min(p.y, q.y) / cell, d = Math.max(p.y, q.y) / cell;
      for (var j = 0; j < vlist.length; j += 1) {
        var ve = vlist[j];
        if (!groupConflict(ve.groups, group)) continue;
        if (Math.min(d, ve.b) - Math.max(c, ve.a) > 0.35) return true;
      }
      return false;
    }
    return false;
  }

  /* 把最终路径（而不是 A* 的原始阶梯）登记进占用表。 */
  function markPath(pts, used, group, cell) {
    for (var i = 1; i < pts.length; i += 1) {
      var p = pts[i - 1], q = pts[i];
      if (Math.abs(p.y - q.y) < 0.6) {
        var y = Math.round(p.y / cell);
        var xa = Math.round(p.x / cell), xb = Math.round(q.x / cell);
        var lo = Math.min(xa, xb), hi = Math.max(xa, xb);
        for (var x = lo; x < hi; x += 1) addOccupancy(used, group, x, y, x + 1, y);
      } else if (Math.abs(p.x - q.x) < 0.6) {
        var xcol = Math.round(p.x / cell);
        var ya = Math.round(p.y / cell), yb = Math.round(q.y / cell);
        var ylo = Math.min(ya, yb), yhi = Math.max(ya, yb);
        for (var yy = ylo; yy < yhi; yy += 1) addOccupancy(used, group, xcol, yy, xcol, yy + 1);
      }
    }
  }

  /* A* on a 12px grid: bend penalty + segment-reuse penalty. Reuse only costs
   * extra between *different* output networks (the same source port may share
   * a trunk freely). `used` is owned by the caller and mutated with every
   * routed segment so later routes see earlier trunks.
   *
   * opts (optional) carries endpoint node ids for the fallback path only; A*
   * itself ignores them. `used` and `group` drive the network-reuse penalty:
   * segments laid down by a different group cost extra, same-group reuse is
   * free so a fan-out trunk can share a run. */
  function route(a, b, rects, used, group, opts) {
    rects = rects || [];
    used = used || Object.create(null);
    opts = opts || {};
    var CELL = ROUTE.cell;
    var xs = [a.x, b.x], ys = [a.y, b.y];
    rects.forEach(function (r) { xs.push(r.x - ROUTE.bound, r.x + r.w + ROUTE.bound); ys.push(r.y - ROUTE.bound, r.y + r.h + ROUTE.bound); });
    var minX = Math.floor((Math.min.apply(null, xs) - 180) / CELL) * CELL;
    var maxX = Math.ceil((Math.max.apply(null, xs) + 180) / CELL) * CELL;
    var minY = Math.floor((Math.min.apply(null, ys) - 180) / CELL) * CELL;
    var maxY = Math.ceil((Math.max.apply(null, ys) + 180) / CELL) * CELL;
    var cols = Math.max(2, Math.round((maxX - minX) / CELL) + 1);
    var rows = Math.max(2, Math.round((maxY - minY) / CELL) + 1);
    var blocked = new Uint8Array(cols * rows);
    var i;
    for (i = 0; i < rects.length; i++) {
      var r = rects[i];
      var x0 = Math.floor((r.x - ROUTE.clearance - minX) / CELL), x1 = Math.ceil((r.x + r.w + ROUTE.clearance - minX) / CELL);
      var y0 = Math.floor((r.y - ROUTE.clearance - minY) / CELL), y1 = Math.ceil((r.y + r.h + ROUTE.clearance - minY) / CELL);
      for (var yy = Math.max(0, y0); yy <= Math.min(rows - 1, y1); yy++)
        for (var xx = Math.max(0, x0); xx <= Math.min(cols - 1, x1); xx++) blocked[yy * cols + xx] = 1;
    }
    var sx = Math.max(1, Math.min(cols - 2, Math.round((a.x - minX) / CELL)));
    var sy = Math.max(1, Math.min(rows - 2, Math.round((a.y - minY) / CELL)));
    var ex = Math.max(1, Math.min(cols - 2, Math.round((b.x - minX) / CELL)));
    var ey = Math.max(1, Math.min(rows - 2, Math.round((b.y - minY) / CELL)));
    function clear(cx, cy) {
      for (var oy = -1; oy <= 1; oy++) for (var ox = -1; ox <= 1; ox++) {
        var nx = cx + ox, ny = cy + oy;
        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) blocked[ny * cols + nx] = 0;
      }
    }
    clear(sx, sy); clear(ex, ey);
    var DX = [1, 0, -1, 0], DY = [0, 1, 0, -1];
    var total = cols * rows * 4;
    var dist = new Float32Array(total); dist.fill(1e9);
    var prev = new Int32Array(total); prev.fill(-1);
    var startStates = [];
    for (var d0 = 0; d0 < 4; d0++) {
      var st = (sy * cols + sx) * 4 + d0;
      dist[st] = 0;
      startStates.push(st);
    }
    // binary heap
    var heap = [], hDist = [];
    function push(state, score) {
      heap.push(state); hDist.push(score);
      var n = heap.length - 1;
      while (n > 0) {
        var p = (n - 1) >> 1;
        if (hDist[p] <= hDist[n]) break;
        var ts = heap[p]; heap[p] = heap[n]; heap[n] = ts;
        var td = hDist[p]; hDist[p] = hDist[n]; hDist[n] = td;
        n = p;
      }
    }
    function pop() {
      var top = heap[0], lastS = heap.pop(), lastD = hDist.pop();
      if (heap.length) {
        heap[0] = lastS; hDist[0] = lastD;
        var n = 0;
        while (true) {
          var l = n * 2 + 1, r = l + 1, m = n;
          if (l < heap.length && hDist[l] < hDist[m]) m = l;
          if (r < heap.length && hDist[r] < hDist[m]) m = r;
          if (m === n) break;
          var ts = heap[m]; heap[m] = heap[n]; heap[n] = ts;
          var td = hDist[m]; hDist[m] = hDist[n]; hDist[n] = td;
          n = m;
        }
      }
      return top;
    }
    startStates.forEach(function (s) { push(s, 0); });
    var found = -1;
    var guard = 0;
    while (heap.length && guard++ < 60000) {
      var state = pop();
      var dir = state & 3, cell = state >> 2;
      var cx = cell % cols, cy = (cell / cols) | 0;
      if (cx === ex && cy === ey) { found = state; break; }
      for (var nd = 0; nd < 4; nd++) {
        var nx = cx + DX[nd], ny = cy + DY[nd];
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
        if (blocked[ny * cols + nx]) continue;
        var ncell = ny * cols + nx;
        var nstate = ncell * 4 + nd;
        /* used 的 key 走全局网格坐标：minX/minY 已经是 CELL 的整数倍。 */
        var baseGX = Math.round(minX / CELL), baseGY = Math.round(minY / CELL);
        var sk = (cx < nx || (cx === nx && cy < ny))
          ? ((baseGX + cx) + ',' + (baseGY + cy) + '|' + (baseGX + nx) + ',' + (baseGY + ny))
          : ((baseGX + nx) + ',' + (baseGY + ny) + '|' + (baseGX + cx) + ',' + (baseGY + cy));
        var reuse = groupConflict(used[sk], group);
        var cost = 1 + (nd === (dir + 2) % 4 ? ROUTE.reverse : (nd !== dir ? ROUTE.bend : 0)) + (reuse ? ROUTE.networkPenalty : 0);
        var ndist = dist[state] + cost;
        if (ndist < dist[nstate]) {
          dist[nstate] = ndist;
          prev[nstate] = state;
          push(nstate, ndist + Math.abs(nx - ex) + Math.abs(ny - ey));
        }
      }
    }
    if (found < 0) {
      var fallback = fallbackRoute(a, b, rects, opts.fromId, opts.toId);
      markPath(fallback, used, group, CELL);
      return fallback;
    }
    var cells = [];
    var cur = found;
    while (cur >= 0) {
      var cell2 = cur >> 2;
      cells.push({ x: (cell2 % cols) * CELL + minX, y: ((cell2 / cols) | 0) * CELL + minY });
      cur = prev[cur];
    }
    cells.reverse();
    var pts = [{ x: a.x, y: a.y }];
    cells.forEach(function (p) { if (p.x !== a.x || p.y !== a.y) pts.push(p); });
    pts.push({ x: b.x, y: b.y });
    var occupancy = buildOccupancy(used, CELL);
    var finalPts = shortcut(simplify(pts), rects, function (p, q) {
      return !segmentBlocked(p, q, group, occupancy);
    });
    finalPts = despike(finalPts, rects, function (p, q) {
      return !segmentBlocked(p, q, group, occupancy);
    });
    markPath(finalPts, used, group, CELL);
    return finalPts;
  }

  root.RSL.Route = {
    ROUTE: ROUTE,
    simplePoints: simplePoints,
    pathPoints: pathPoints,
    simplify: simplify,
    segmentClear: segmentClear,
    pathClear: pathClear,
    shortcut: shortcut,
    despike: despike,
    fallbackRoute: fallbackRoute,
    route: route
  };
})();
