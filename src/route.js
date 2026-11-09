/* 公理板 — pure geometry + orthogonal wire routing.
 * No DOM, no Board instance, no app state. Loaded as a classic script before
 * src/board.js; also safe to load in a Node vm (only touches window.RSL).
 *
 * Routing is a sparse lane graph instead of a 12px A* grid: candidate x/y
 * lanes come from free corridors between node rects plus the two port stubs.
 * Dijkstra on those lanes finds clean orthogonal runs, penalises bends and
 * other networks' already-used segments, and never produces grid staircases.
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

  /* Quick orthogonal polyline. Kept for drag previews and last-resort paths. */
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

  /* PCB-style 45° chamfers. Short runs get a half-length cut so two nearby
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

  /* Drop duplicate points and collinear runs, including reversals (A→B→A). */
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

  /* Exact axis-aligned segment vs padded rect test (no sampling). */
  function segmentClear(p, q, rects) {
    var pad = ROUTE.segmentPad;
    var horizontal = Math.abs(p.y - q.y) < 0.6;
    var vertical = Math.abs(p.x - q.x) < 0.6;
    var loX = Math.min(p.x, q.x), hiX = Math.max(p.x, q.x);
    var loY = Math.min(p.y, q.y), hiY = Math.max(p.y, q.y);
    for (var r = 0; r < rects.length; r++) {
      var rr = rects[r];
      var x0 = rr.x - pad, x1 = rr.x + rr.w + pad;
      var y0 = rr.y - pad, y1 = rr.y + rr.h + pad;
      if (horizontal) {
        if (p.y > y0 && p.y < y1 && hiX > x0 && loX < x1) return false;
      } else if (vertical) {
        if (p.x > x0 && p.x < x1 && hiY > y0 && loY < y1) return false;
      } else {
        var steps = Math.max(1, Math.ceil((abs(q.x - p.x) + abs(q.y - p.y)) / 8));
        for (var i = 1; i < steps; i++) {
          var t = i / steps;
          var x = p.x + (q.x - p.x) * t, y = p.y + (q.y - p.y) * t;
          if (x > x0 && x < x1 && y > y0 && y < y1) return false;
        }
      }
    }
    return true;
  }

  function pathClear(pts, rects) {
    for (var i = 1; i < pts.length; i++) if (!segmentClear(pts[i - 1], pts[i], rects)) return false;
    return true;
  }

  /* Replace a staircase with clean straight / two-segment runs. */
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

  /* Remove tiny H/V jogs left near ports or between nearby corners. */
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

  /* Deterministic outer detour when the lane graph cannot reach b. */
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

  /* --------------------------------------------------------------------- *
   * Occupancy table: global 12px segment keys, used for negotiated routing. *
   * --------------------------------------------------------------------- */

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
        (h[y0] = h[y0] || []).push({ a: Math.min(x0, x1), b: Math.max(x0, x1), groups: groups });
      } else if (x0 === x1) {
        (v[x0] = v[x0] || []).push({ a: Math.min(y0, y1), b: Math.max(y0, y1), groups: groups });
      }
    });
    return { h: h, v: v, cell: cell };
  }

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

  /* --------------------------------------------------------------------- *
   * Sparse lane graph                                                       *
   * --------------------------------------------------------------------- */

  function uniqueSorted(vals) {
    vals = vals.slice().sort(function (a, b) { return a - b; });
    var out = [];
    vals.forEach(function (v) {
      if (!out.length || Math.abs(v - out[out.length - 1]) > 0.6) out.push(v);
    });
    return out;
  }

  function mergeIntervals(list) {
    var sorted = list.slice().sort(function (a, b) { return a[0] - b[0]; });
    var merged = [];
    sorted.forEach(function (it) {
      var last = merged[merged.length - 1];
      if (last && it[0] <= last[1]) last[1] = Math.max(last[1], it[1]);
      else merged.push([it[0], it[1]]);
    });
    return merged;
  }

  function gapCenters(list, min, max) {
    var merged = mergeIntervals(list);
    var out = [min, max];
    var prev = min;
    merged.forEach(function (it) {
      if (it[0] > prev + 1) out.push((prev + it[0]) / 2);
      prev = Math.max(prev, it[1]);
    });
    if (max > prev + 1) out.push((prev + max) / 2);
    return out;
  }

  function buildLanes(rects, a, b) {
    var pad = ROUTE.clearance;
    var xInts = [], yInts = [];
    var minX = Math.min(a.x, b.x) - ROUTE.stub * 2;
    var maxX = Math.max(a.x, b.x) + ROUTE.stub * 2;
    var minY = Math.min(a.y, b.y) - ROUTE.stub * 2;
    var maxY = Math.max(a.y, b.y) + ROUTE.stub * 2;
    rects.forEach(function (r) {
      xInts.push([r.x - pad, r.x + r.w + pad]);
      yInts.push([r.y - pad, r.y + r.h + pad]);
      minX = Math.min(minX, r.x - 120);
      maxX = Math.max(maxX, r.x + r.w + 120);
      minY = Math.min(minY, r.y - 120);
      maxY = Math.max(maxY, r.y + r.h + 120);
    });
    var xs = gapCenters(xInts, minX - 40, maxX + 40);
    var ys = gapCenters(yInts, minY - 40, maxY + 40);
    xs.push(a.x, b.x, a.x + ROUTE.stub, b.x - ROUTE.stub);
    ys.push(a.y, b.y);
    return { xs: uniqueSorted(xs), ys: uniqueSorted(ys) };
  }

  function indexOfValue(arr, v) {
    for (var i = 0; i < arr.length; i++) if (Math.abs(arr[i] - v) < 0.6) return i;
    return -1;
  }

  function route(a, b, rects, used, group, opts) {
    rects = rects || [];
    used = used || Object.create(null);
    opts = opts || {};
    if (Math.abs(a.x - b.x) < 0.6 && Math.abs(a.y - b.y) < 0.6) return [a, b];

    var occupancy = buildOccupancy(used, ROUTE.cell);
    var lanes = buildLanes(rects, a, b);
    var xs = lanes.xs, ys = lanes.ys;
    var nx = xs.length, ny = ys.length;
    var total = nx * ny;
    var free = new Uint8Array(total);
    var pad = ROUTE.clearance;
    for (var ix = 0; ix < nx; ix++) {
      for (var iy = 0; iy < ny; iy++) {
        var px = xs[ix], py = ys[iy], blocked = false;
        for (var r = 0; r < rects.length; r++) {
          var rr = rects[r];
          if (px > rr.x - pad && px < rr.x + rr.w + pad &&
              py > rr.y - pad && py < rr.y + rr.h + pad) { blocked = true; break; }
        }
        free[ix * ny + iy] = blocked ? 0 : 1;
      }
    }
    var sx = indexOfValue(xs, a.x), sy = indexOfValue(ys, a.y);
    var ex = indexOfValue(xs, b.x), ey = indexOfValue(ys, b.y);
    if (sx < 0 || sy < 0 || ex < 0 || ey < 0) {
      var fb0 = fallbackRoute(a, b, rects, opts.fromId, opts.toId);
      markPath(fb0, used, group, ROUTE.cell);
      return fb0;
    }
    free[sx * ny + sy] = 1;
    free[ex * ny + ey] = 1;

    var DX = [1, 0, -1, 0], DY = [0, 1, 0, -1];
    var states = total * 4;
    var dist = new Float64Array(states);
    dist.fill(Infinity);
    var prev = new Int32Array(states);
    prev.fill(-1);
    var heapS = [], heapF = [];
    function push(state, score) {
      heapS.push(state); heapF.push(score);
      var n = heapS.length - 1;
      while (n > 0) {
        var p = (n - 1) >> 1;
        if (heapF[p] <= heapF[n]) break;
        var ts = heapS[p]; heapS[p] = heapS[n]; heapS[n] = ts;
        var tf = heapF[p]; heapF[p] = heapF[n]; heapF[n] = tf;
        n = p;
      }
    }
    function pop() {
      var top = heapS[0], lastS = heapS.pop(), lastF = heapF.pop();
      if (heapS.length) {
        heapS[0] = lastS; heapF[0] = lastF;
        var n = 0;
        while (true) {
          var l = n * 2 + 1, r = l + 1, m = n;
          if (l < heapS.length && heapF[l] < heapF[m]) m = l;
          if (r < heapS.length && heapF[r] < heapF[m]) m = r;
          if (m === n) break;
          var ts = heapS[m]; heapS[m] = heapS[n]; heapS[n] = ts;
          var tf = heapF[m]; heapF[m] = heapF[n]; heapF[n] = tf;
          n = m;
        }
      }
      return top;
    }
    function heuristic(ix, iy) {
      return Math.abs(xs[ix] - b.x) + Math.abs(ys[iy] - b.y);
    }
    var startCell = sx * ny + sy, endCell = ex * ny + ey;
    for (var d0 = 0; d0 < 4; d0++) {
      var st = startCell * 4 + d0;
      dist[st] = 0;
      push(st, heuristic(sx, sy));
    }
    var found = -1, guard = 0, cap = Math.min(240000, states);
    while (heapS.length && guard++ < cap) {
      var state = pop();
      var dir = state & 3, cell = state >> 2;
      if (cell === endCell) { found = state; break; }
      var cx = (cell / ny) | 0, cy = cell % ny;
      var g = dist[state];
      for (var nd = 0; nd < 4; nd++) {
        var nIx = cx + DX[nd], nIy = cy + DY[nd];
        if (nIx < 0 || nIy < 0 || nIx >= nx || nIy >= ny) continue;
        var ncell = nIx * ny + nIy;
        if (!free[ncell]) continue;
        var p = { x: xs[cx], y: ys[cy] }, q = { x: xs[nIx], y: ys[nIy] };
        if (!segmentClear(p, q, rects)) continue;
        var len = Math.abs(q.x - p.x) + Math.abs(q.y - p.y);
        var blocked = segmentBlocked(p, q, group, occupancy);
        var cost = len + (nd !== dir ? ROUTE.bend : 0) +
          (blocked ? ROUTE.networkPenalty * (len / ROUTE.cell) : 0);
        var nstate = ncell * 4 + nd;
        var ndist = g + cost;
        if (ndist < dist[nstate]) {
          dist[nstate] = ndist;
          prev[nstate] = state;
          push(nstate, ndist + heuristic(nIx, nIy));
        }
      }
    }
    if (found < 0) {
      var fb = fallbackRoute(a, b, rects, opts.fromId, opts.toId);
      markPath(fb, used, group, ROUTE.cell);
      return fb;
    }
    var cells = [];
    var cur = found;
    while (cur >= 0) {
      var c2 = cur >> 2;
      cells.push({ x: xs[(c2 / ny) | 0], y: ys[c2 % ny] });
      cur = prev[cur];
    }
    cells.reverse();
    var pts = simplify(cells);
    pts = despike(pts, rects, function (p, q) {
      return !segmentBlocked(p, q, group, occupancy);
    });
    markPath(pts, used, group, ROUTE.cell);
    return pts;
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
    markPath: markPath,
    fallbackRoute: fallbackRoute,
    route: route
  };
})();
