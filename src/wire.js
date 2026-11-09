/* 公理板 — port-to-port orthogonal wiring.
 *
 * Routing is a small orthogonal visibility graph:
 *   - candidate x/y lanes come from the 12px clearance boundary of every node
 *     rectangle (plus a parallel-track offset), the port stubs and the outer
 *     bounding box;
 *   - free lane intersections are connected horizontally/vertically when the
 *     segment is clear, then Dijkstra with a bend penalty picks the path;
 *   - the path is cleaned of collinear runs before it becomes SVG.
 *
 * There is no 12px grid, so the result has long clean runs instead of
 * staircase artefacts. Diagonal/chamfer styling is only applied at render.
 */
(function () {
  'use strict';
  var root = typeof window !== 'undefined' ? window : globalThis;
  root.RSL = root.RSL || {};

  var STUB = 24;
  var TRACK = 10;
  var PAD = 12;
  var BEND = 80;

  function abs(v) { return v < 0 ? -v : v; }
  function sign(v) { return v > 0 ? 1 : (v < 0 ? -1 : 0); }

  function unique(pts) {
    var out = [];
    pts.forEach(function (p) {
      var last = out[out.length - 1];
      if (!last || last.x !== p.x || last.y !== p.y) out.push({ x: p.x, y: p.y });
    });
    return out;
  }

  function clean(pts) {
    if (!pts || pts.length < 2) return pts ? pts.slice() : [];
    var src = unique(pts);
    if (src.length < 3) return src;
    var out = [src[0]];
    for (var i = 1; i < src.length - 1; i++) {
      var a = out[out.length - 1], b = src[i], c = src[i + 1];
      var abx = b.x - a.x, aby = b.y - a.y, bcx = c.x - b.x, bcy = c.y - b.y;
      if (abx === 0 && bcx === 0) continue;
      if (aby === 0 && bcy === 0) continue;
      out.push(b);
    }
    out.push(src[src.length - 1]);
    return out;
  }

  function segmentClear(p, q, rects) {
    var horizontal = abs(p.y - q.y) < 0.6;
    var vertical = abs(p.x - q.x) < 0.6;
    var loX = Math.min(p.x, q.x), hiX = Math.max(p.x, q.x);
    var loY = Math.min(p.y, q.y), hiY = Math.max(p.y, q.y);
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
      var x0 = r.x - PAD, x1 = r.x + r.w + PAD;
      var y0 = r.y - PAD, y1 = r.y + r.h + PAD;
      if (horizontal) {
        if (p.y > y0 && p.y < y1 && hiX > x0 && loX < x1) return false;
      } else if (vertical) {
        if (p.x > x0 && p.x < x1 && hiY > y0 && loY < y1) return false;
      }
    }
    return true;
  }

  function pathClear(pts, rects) {
    for (var i = 1; i < pts.length; i++) {
      if (!segmentClear(pts[i - 1], pts[i], rects)) return false;
    }
    return true;
  }

  function verticals(pts) {
    var out = [];
    for (var i = 1; i < pts.length; i++) {
      var p = pts[i - 1], q = pts[i];
      if (abs(p.x - q.x) < 0.6 && abs(p.y - q.y) > 0.6) {
        out.push({ x: p.x, y1: Math.min(p.y, q.y), y2: Math.max(p.y, q.y) });
      }
    }
    return out;
  }

  function trackFree(seg, tracks, group) {
    if (!tracks || !tracks.v) return true;
    for (var i = 0; i < tracks.v.length; i++) {
      var t = tracks.v[i];
      if (t.group === group) continue;
      if (abs(t.x - seg.x) >= TRACK) continue;
      if (Math.min(t.y2, seg.y2) - Math.max(t.y1, seg.y1) > 3) return false;
    }
    return true;
  }

  function registerTracks(pts, tracks, group) {
    if (!tracks) return;
    if (!tracks.v) tracks.v = [];
    verticals(pts).forEach(function (s) {
      tracks.v.push({ x: s.x, y1: s.y1, y2: s.y2, group: group });
    });
  }

  function trackPenalty(seg, tracks, group) {
    if (!tracks || !tracks.v) return 0;
    for (var i = 0; i < tracks.v.length; i++) {
      var t = tracks.v[i];
      if (t.group === group) continue;
      if (abs(t.x - seg.x) >= TRACK) continue;
      if (Math.min(t.y2, seg.y2) - Math.max(t.y1, seg.y1) > 3) return 260;
    }
    return 0;
  }

  /* Deterministic simple Z for drag previews and huge reference circuits. */
  function simpleRoute(a, b) {
    var dx = b.x - a.x;
    var stub = STUB;
    if (dx >= 0) {
      stub = Math.min(stub, Math.max(0, dx / 2 - 8));
      if (dx < 16) stub = 0;
    }
    var sa = { x: a.x + stub, y: a.y };
    var sb = { x: b.x - stub, y: b.y };
    var midX = (sa.x + sb.x) / 2;
    if (stub === 0) return clean([a, { x: midX, y: a.y }, { x: midX, y: b.y }, b]);
    return clean([a, sa, { x: midX, y: a.y }, { x: midX, y: b.y }, sb, b]);
  }

  function uniqueSorted(vals) {
    vals = vals.slice().sort(function (x, y) { return x - y; });
    var out = [];
    vals.forEach(function (v) {
      if (!out.length || abs(v - out[out.length - 1]) > 0.6) out.push(v);
    });
    return out;
  }

  function pointFree(x, y, rects) {
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
      if (x > r.x - PAD && x < r.x + r.w + PAD &&
          y > r.y - PAD && y < r.y + r.h + PAD) return false;
    }
    return true;
  }

  function relevantRects(rects, a, b) {
    var minX = Math.min(a.x, b.x) - 120, maxX = Math.max(a.x, b.x) + 120;
    var minY = Math.min(a.y, b.y) - 120, maxY = Math.max(a.y, b.y) + 120;
    return rects.filter(function (r) {
      return r.x + r.w > minX && r.x < maxX && r.y + r.h > minY && r.y < maxY;
    });
  }

  function route(a, b, rects, opts) {
    rects = rects || [];
    opts = opts || {};
    var fromId = opts.fromId, toId = opts.toId;
    var tracks = opts.tracks || null;
    var group = opts.group || '';
    var allObstacles = rects.filter(function (r) {
      return r.id !== fromId && r.id !== toId;
    });
    var obstacles = opts._all ? allObstacles : relevantRects(allObstacles, a, b);

    var dx = b.x - a.x;
    var stub = STUB;
    if (dx >= 0) {
      stub = Math.min(stub, Math.max(0, dx / 2 - 8));
      if (dx < 16) stub = 0;
    }
    var sa = { x: a.x + stub, y: a.y };
    var sb = { x: b.x - stub, y: b.y };

    var xs = [a.x, sa.x, sb.x, b.x];
    var ys = [a.y, b.y];
    var minX = Math.min(a.x, b.x), maxX = Math.max(a.x, b.x);
    var minY = Math.min(a.y, b.y), maxY = Math.max(a.y, b.y);
    obstacles.forEach(function (r) {
      var x0 = r.x - PAD, x1 = r.x + r.w + PAD;
      var y0 = r.y - PAD, y1 = r.y + r.h + PAD;
      xs.push(x0, x1, x0 - TRACK, x1 + TRACK);
      ys.push(y0, y1, y0 - TRACK, y1 + TRACK);
      minX = Math.min(minX, x0); maxX = Math.max(maxX, x1);
      minY = Math.min(minY, y0); maxY = Math.max(maxY, y1);
    });
    xs.push(minX - STUB, maxX + STUB);
    ys.push(minY - STUB, maxY + STUB);
    xs = uniqueSorted(xs);
    ys = uniqueSorted(ys);

    var nx = xs.length, ny = ys.length;
    var total = nx * ny;
    var free = new Uint8Array(total);
    for (var ix = 0; ix < nx; ix++) {
      for (var iy = 0; iy < ny; iy++) {
        free[ix * ny + iy] = pointFree(xs[ix], ys[iy], obstacles) ? 1 : 0;
      }
    }
    function idx(arr, v) {
      for (var i = 0; i < arr.length; i++) if (abs(arr[i] - v) < 0.6) return i;
      return -1;
    }
    var sx = idx(xs, sa.x), sy = idx(ys, sa.y);
    var ex = idx(xs, sb.x), ey = idx(ys, sb.y);
    if (sx < 0 || sy < 0 || ex < 0 || ey < 0) {
      var fb = simpleRoute(a, b);
      registerTracks(fb, tracks, group);
      return fb;
    }
    free[sx * ny + sy] = 1;
    free[ex * ny + ey] = 1;

    /* 每一行/列把相邻的“空闲点”直接连起来，而不是只连网格邻居：
     * 这样被节点挡住的一串中间点不会把可见的边界车道割断。 */
    var hNext = new Int32Array(total).fill(-1);
    var hPrev = new Int32Array(total).fill(-1);
    var vNext = new Int32Array(total).fill(-1);
    var vPrev = new Int32Array(total).fill(-1);
    var iy, ix;
    for (iy = 0; iy < ny; iy++) {
      var prevFree = -1;
      for (ix = 0; ix < nx; ix++) {
        var cellRow = ix * ny + iy;
        if (!free[cellRow]) continue;
        if (prevFree >= 0) {
          var pPrev = { x: xs[prevFree], y: ys[iy] };
          var pNow = { x: xs[ix], y: ys[iy] };
          if (segmentClear(pPrev, pNow, obstacles)) {
            hNext[prevFree * ny + iy] = cellRow;
            hPrev[cellRow] = prevFree * ny + iy;
          }
        }
        prevFree = ix;
      }
    }
    for (ix = 0; ix < nx; ix++) {
      var prevY = -1;
      for (iy = 0; iy < ny; iy++) {
        var cellCol = ix * ny + iy;
        if (!free[cellCol]) continue;
        if (prevY >= 0) {
          var qPrev = { x: xs[ix], y: ys[prevY] };
          var qNow = { x: xs[ix], y: ys[iy] };
          if (segmentClear(qPrev, qNow, obstacles)) {
            vNext[ix * ny + prevY] = cellCol;
            vPrev[cellCol] = ix * ny + prevY;
          }
        }
        prevY = iy;
      }
    }

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
        var s = heapS[p]; heapS[p] = heapS[n]; heapS[n] = s;
        var f = heapF[p]; heapF[p] = heapF[n]; heapF[n] = f;
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
          var ss = heapS[m]; heapS[m] = heapS[n]; heapS[n] = ss;
          var ff = heapF[m]; heapF[m] = heapF[n]; heapF[n] = ff;
          n = m;
        }
      }
      return top;
    }
    function heur(x, y) { return abs(x - sb.x) + abs(y - sb.y); }

    var startCell = sx * ny + sy, endCell = ex * ny + ey;
    for (var d0 = 0; d0 < 4; d0++) {
      var st = startCell * 4 + d0;
      dist[st] = 0;
      push(st, heur(sa.x, sa.y));
    }
    var found = -1, guard = 0, cap = Math.min(220000, states);
    while (heapS.length && guard++ < cap) {
      var state = pop();
      var dir = state & 3, cell = state >> 2;
      if (cell === endCell) { found = state; break; }
      var cx = (cell / ny) | 0, cy = cell % ny;
      var p = { x: xs[cx], y: ys[cy] };
      var g = dist[state];
      var nb = [hNext[cell], vNext[cell], hPrev[cell], vPrev[cell]];
      for (var nd = 0; nd < 4; nd++) {
        var ncell = nb[nd];
        if (ncell < 0) continue;
        var nIx = (ncell / ny) | 0, nIy = ncell % ny;
        var q = { x: xs[nIx], y: ys[nIy] };
        var len = abs(q.x - p.x) + abs(q.y - p.y);
        var cost = len + (nd !== dir ? BEND : 0);
        if (nd === 1 || nd === 3) cost += trackPenalty({ x: p.x, y1: Math.min(p.y, q.y), y2: Math.max(p.y, q.y) }, tracks, group);
        var nstate = ncell * 4 + nd;
        var ng = g + cost;
        if (ng < dist[nstate]) {
          dist[nstate] = ng;
          prev[nstate] = state;
          push(nstate, ng + heur(q.x, q.y));
        }
      }
    }
    var pts;
    if (found < 0) {
      pts = simpleRoute(a, b);
      if (!pathClear(pts, obstacles)) {
        pts = clean([
          a, sa, { x: sa.x, y: minY - STUB }, { x: sb.x, y: minY - STUB }, sb, b
        ]);
      }
    } else {
      var cells = [];
      var cur = found;
      while (cur >= 0) {
        var c2 = cur >> 2;
        cells.push({ x: xs[(c2 / ny) | 0], y: ys[c2 % ny] });
        cur = prev[cur];
      }
      cells.reverse();
      pts = clean(cells);
      if (stub > 0) {
        pts = [{ x: a.x, y: a.y }].concat(pts);
        pts.push({ x: b.x, y: b.y });
      }
      pts = clean(pts);
    }
    if (!pathClear(pts, allObstacles)) {
      if (!opts._all) {
        opts._all = true;
        return route(a, b, rects, opts);
      }
    }
    registerTracks(pts, tracks, group);
    return pts;
  }

  /* PCB-style 45° chamfers; short runs get half-length cuts. */
  function pathPoints(pts) {
    if (!pts || !pts.length) return '';
    var src = unique(pts);
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
        out.push({ x: b.x - sign(b.x - a.x) * cut, y: b.y - sign(b.y - a.y) * cut });
        out.push({ x: b.x + sign(c.x - b.x) * cut, y: b.y + sign(c.y - b.y) * cut });
      } else out.push(b);
    }
    out.push(src[src.length - 1]);
    var d = 'M' + out[0].x + ' ' + out[0].y;
    for (var j = 1; j < out.length; j++) d += 'L' + out[j].x + ' ' + out[j].y;
    return d;
  }

  root.RSL.Wire = {
    STUB: STUB,
    TRACK: TRACK,
    route: route,
    simpleRoute: simpleRoute,
    pathPoints: pathPoints,
    clean: clean,
    segmentClear: segmentClear,
    pathClear: pathClear
  };
})();
