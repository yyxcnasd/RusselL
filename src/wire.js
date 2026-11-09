/* 公理板 — port-to-port orthogonal wiring.
 *
 * This is a deliberate from-scratch replacement for the old grid A* router.
 * Wires always leave an output port to the right and enter an input port from
 * the left. Routing is a small set of deterministic candidates:
 *
 *   - local Z: exit stub -> vertical lane between the two columns -> approach
 *   - source/target-stub Z: vertical at the stub when the middle is blocked
 *   - outer corridor: above/below all node rectangles when columns overlap
 *   - simple fallback: last resort, no obstacle avoidance
 *
 * Candidates are checked against node rectangles; vertical lanes are tracked
 * so parallel wires get their own 10px track instead of crossing each other.
 * No grid, no staircase, no hidden straights.
 */
(function () {
  'use strict';
  var root = typeof window !== 'undefined' ? window : globalThis;
  root.RSL = root.RSL || {};

  var STUB = 24;
  var TRACK = 10;
  var PAD = 12;

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

  /* Remove duplicate points and collinear points (including reversals). */
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
      var ov = Math.min(t.y2, seg.y2) - Math.max(t.y1, seg.y1);
      if (ov > 3) return false;
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

  function bendCount(pts) {
    var n = 0;
    for (var i = 1; i < pts.length - 1; i++) {
      var a = pts[i - 1], b = pts[i], c = pts[i + 1];
      if (abs(a.x - b.x) < 0.6 && abs(b.x - c.x) > 0.6) n += 1;
      else if (abs(a.y - b.y) < 0.6 && abs(b.y - c.y) > 0.6) n += 1;
    }
    return n;
  }

  function pathLength(pts) {
    var d = 0;
    for (var i = 1; i < pts.length; i++) {
      d += abs(pts[i].x - pts[i - 1].x) + abs(pts[i].y - pts[i - 1].y);
    }
    return d;
  }

  function makeLocal(a, sa, sb, b, laneX) {
    if (sa.x === a.x && sb.x === b.x) {
      return clean([a, { x: laneX, y: a.y }, { x: laneX, y: b.y }, b]);
    }
    return clean([a, sa, { x: laneX, y: a.y }, { x: laneX, y: b.y }, sb, b]);
  }

  function makeStubZ(a, sa, sb, b, which) {
    if (which === 'left') {
      return clean([a, sa, { x: sa.x, y: b.y }, sb, b]);
    }
    return clean([a, sa, { x: sb.x, y: a.y }, sb, b]);
  }

  function makeOuter(a, sa, sb, b, yLane, xLeft, xRight) {
    return clean([
      a, sa, { x: xRight, y: a.y }, { x: xRight, y: yLane },
      { x: xLeft, y: yLane }, { x: xLeft, y: b.y }, sb, b
    ]);
  }

  /* 竖线贴着两端 stub 走：适合正前方有节点、需要先上下离开再横穿的情况。 */
  function makeStubOuter(a, sa, sb, b, yLane) {
    return clean([a, sa, { x: sa.x, y: yLane }, { x: sb.x, y: yLane }, sb, b]);
  }

  /* Draw a simple deterministic Z for huge reference circuits. */
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

  function bestCandidate(candidates, obstacles, tracks, group) {
    var best = null, bestScore = Infinity;
    candidates.forEach(function (pts) {
      if (!pts || pts.length < 2) return;
      var c = clean(pts);
      if (!pathClear(c, obstacles)) return;
      var ok = verticals(c).every(function (s) { return trackFree(s, tracks, group); });
      if (!ok) return;
      var score = pathLength(c) + bendCount(c) * 40;
      if (score < bestScore) { bestScore = score; best = c; }
    });
    return best;
  }

  function bounding(rects, a, b) {
    var x0 = Math.min(a.x, b.x), x1 = Math.max(a.x, b.x);
    var y0 = Math.min(a.y, b.y), y1 = Math.max(a.y, b.y);
    rects.forEach(function (r) {
      x0 = Math.min(x0, r.x); y0 = Math.min(y0, r.y);
      x1 = Math.max(x1, r.x + r.w); y1 = Math.max(y1, r.y + r.h);
    });
    return { x0: x0, y0: y0, x1: x1, y1: y1 };
  }

  /**
   * route(a, b, rects, opts?)
   *   a, b     output/input port centres
   *   rects    node rectangles (may include the two endpoint nodes)
   *   opts     { fromId, toId, tracks, group }
   */
  function route(a, b, rects, opts) {
    rects = rects || [];
    opts = opts || {};
    var fromId = opts.fromId, toId = opts.toId;
    var obstacles = rects.filter(function (r) { return r.id !== fromId && r.id !== toId; });
    var tracks = opts.tracks || null;
    var group = opts.group || '';

    var dx = b.x - a.x;
    var stub = STUB;
    if (dx >= 0) {
      stub = Math.min(stub, Math.max(0, dx / 2 - 8));
      if (dx < 16) stub = 0;
    }
    var sa = { x: a.x + stub, y: a.y };
    var sb = { x: b.x - stub, y: b.y };

    var candidates = [];
    if (b.x > a.x && sb.x > sa.x + 6) {
      var center = (sa.x + sb.x) / 2;
      var room = (sb.x - sa.x) / 2 - 6;
      var offsets = [0, TRACK, -TRACK, 2 * TRACK, -2 * TRACK, 3 * TRACK, -3 * TRACK,
        4 * TRACK, -4 * TRACK, 6 * TRACK, -6 * TRACK];
      offsets.forEach(function (off) {
        if (abs(off) > room + TRACK) return;
        candidates.push(makeLocal(a, sa, sb, b, center + off));
      });
      /* 中间竖直车道被挡时，让竖线贴着某一端 stub 走，中间留长横线 */
      candidates.push(makeStubZ(a, sa, sb, b, 'left'));
      candidates.push(makeStubZ(a, sa, sb, b, 'right'));
      var midY = (a.y + b.y) / 2;
      candidates.push(clean([a, sa, { x: sa.x, y: midY }, { x: sb.x, y: midY }, sb, b]));
    }

    var box = bounding(obstacles.length ? obstacles : rects, a, b);
    var yTop = box.y0 - PAD - STUB;
    var yBottom = box.y1 + PAD + STUB;
    var xLeft = box.x0 - PAD - STUB;
    var xRight = box.x1 + PAD + STUB;
    candidates.push(makeStubOuter(a, sa, sb, b, yTop));
    candidates.push(makeStubOuter(a, sa, sb, b, yBottom));
    candidates.push(makeOuter(a, sa, sb, b, yTop, xLeft, xRight));
    candidates.push(makeOuter(a, sa, sb, b, yBottom, xLeft, xRight));

    var picked = bestCandidate(candidates, obstacles, tracks, group);
    if (!picked) {
      /* 最后兜底：贴 stub 的外圈，再退回最朴素的 Z。 */
      picked = makeStubOuter(a, sa, sb, b, yBottom);
      if (!pathClear(picked, obstacles)) picked = simpleRoute(a, b);
    }
    registerTracks(picked, tracks, group);
    return picked;
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
