/* 公理板 — minimal graph board. */
(function () {
  'use strict';
  window.RSL = window.RSL || {};
  var W = 241;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function uid(p) { return p + Math.random().toString(36).slice(2, 8); }
  function snap(v) { return Math.round(v / 16) * 16; }

  function Board(opts) {
    this.board = opts.board;
    this.world = opts.world;
    this.wires = opts.wires;
    this.nodes = opts.nodes;
    this.onChange = opts.onChange || function () {};
    this.onSelect = opts.onSelect || function () {};
    this.onToast = opts.onToast || function () {};
    this.onConnect = opts.onConnect || function () {};
    this.onRemove = opts.onRemove || function () {};
    this.items = [];
    this.edges = [];
    this.view = { x: 30, y: 30, scale: 0.85 };
    this.selectedNode = null;
    this.selectedNodes = [];
    this.selectedEdge = null;
    this.draft = null;
    this.result = null;
    this._drag = null;
    this._groupDrag = null;
    this._marquee = null;
    this._pan = null;
    this._long = null;
    this._bind();
    this._applyView();
  }

  Board.prototype._bind = function () {
    var self = this;
    this.board.addEventListener('pointerdown', function (e) { self._down(e); });
    this.board.addEventListener('pointermove', function (e) { self._move(e); });
    this.board.addEventListener('pointerup', function (e) { self._up(e); });
    this.board.addEventListener('pointercancel', function () { self._cancel(); });
    this.board.addEventListener('wheel', function (e) { self._wheel(e); }, { passive: false });
    this.board.addEventListener('click', function (e) { self._click(e); });
    this.board.addEventListener('dblclick', function (e) {
      var wire = e.target.closest && e.target.closest('.wire-hit');
      if (wire) self.removeEdge(wire.dataset.edge);
    });
    this.board.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      var wire = e.target.closest && e.target.closest('.wire-hit');
      if (wire) { self.removeEdge(wire.dataset.edge); return; }
      var node = e.target.closest && e.target.closest('.node');
      if (node && node.dataset.kind !== 'target') self.removeNode(node.dataset.id);
    });
    this.wires.addEventListener('click', function (e) {
      var wire = e.target.closest && e.target.closest('.wire-hit');
      if (!wire) return;
      self.selectedNode = null;
      self.selectedEdge = wire.dataset.edge;
      self.render();
      self.onSelect(null, self.selectedEdge);
    });
  };

  Board.prototype.setData = function (nodes, edges) {
    this.items = clone(nodes || []).map(function (n) {
      n.x = snap(n.x);
      n.y = snap(n.y);
      return n;
    });
    this.edges = clone(edges || []);
    this.selectedNode = null;
    this.selectedNodes = [];
    this.selectedEdge = null;
    this.draft = null;
    this.render();
  };

  Board.prototype.getData = function () { return { nodes: clone(this.items), edges: clone(this.edges) }; };
  Board.prototype.node = function (id) { return this.items.filter(function (n) { return n.id === id; })[0] || null; };

  Board.prototype.setView = function (x, y, scale) {
    this._viewAnim = null;
    this.view = { x: x, y: y, scale: clamp(scale, 0.35, 1.35) };
    this._applyView();
    this._updateWires();
  };

  Board.prototype._applyView = function () {
    this.world.style.transform = 'translate(' + this.view.x + 'px,' + this.view.y + 'px) scale(' + this.view.scale + ')';
  };

  Board.prototype.zoom = function (dir, cx, cy) {
    var r = this.board.getBoundingClientRect();
    var px = cx == null ? r.width / 2 : cx - r.left;
    var py = cy == null ? r.height / 2 : cy - r.top;
    var old = this.view.scale;
    var next = clamp(old * Math.pow(1.12, dir), 0.35, 1.35);
    var wx = (px - this.view.x) / old;
    var wy = (py - this.view.y) / old;
    this._viewAnim = {
      from: { x: this.view.x, y: this.view.y, scale: old },
      to: { x: px - wx * next, y: py - wy * next, scale: next },
      t: 0
    };
    this._stepView();
  };

  Board.prototype._stepView = function () {
    if (!this._viewAnim) return;
    var a = this._viewAnim;
    a.t = Math.min(1, a.t + 0.18);
    var e = 1 - Math.pow(1 - a.t, 3);
    this.view.x = a.from.x + (a.to.x - a.from.x) * e;
    this.view.y = a.from.y + (a.to.y - a.from.y) * e;
    this.view.scale = a.from.scale + (a.to.scale - a.from.scale) * e;
    this._applyView();
    if (a.t < 1) requestAnimationFrame(this._stepView.bind(this));
    else { this._viewAnim = null; this._updateWires(); }
  };

  Board.prototype.fit = function () {
    var els = this.nodes.querySelectorAll('.node');
    var r = this.board.getBoundingClientRect();
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    els.forEach(function (el) {
      var n = this.node(el.dataset.id);
      if (!n) return;
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + W);
      maxY = Math.max(maxY, n.y + el.offsetHeight);
    }, this);
    if (!isFinite(minX)) { this.setView(30, 30, 0.9); return; }
    var scale = clamp(Math.min((r.width - 100) / (maxX - minX), (r.height - 100) / (maxY - minY)), 0.35, 1.05);
    this.setView((r.width - (maxX - minX) * scale) / 2 - minX * scale, (r.height - (maxY - minY) * scale) / 2 - minY * scale, scale);
  };

  Board.prototype._wheel = function (e) {
    e.preventDefault();
    this.zoom(e.deltaY > 0 ? -1 : 1, e.clientX, e.clientY);
  };

  Board.prototype._client = function (cx, cy) {
    var r = this.board.getBoundingClientRect();
    return { x: (cx - r.left - this.view.x) / this.view.scale, y: (cy - r.top - this.view.y) / this.view.scale };
  };

  Board.prototype._down = function (e) {
    var self = this;
    var port = e.target.closest && e.target.closest('.port');
    if (port) {
      e.preventDefault();
      e.stopPropagation();
      var mod = port.closest('.node');
      if (port.classList.contains('port-out')) {
        this._startDraft(mod.dataset.id, port.dataset.port, e.clientX, e.clientY);
      } else if (this.draft) {
        this.connect(this.draft.from.node, this.draft.from.port, mod.dataset.id, port.dataset.port);
        this._cancelDraft();
      }
      return;
    }
    var wireHit = e.target.closest && e.target.closest('.wire-hit');
    if (wireHit) {
      e.preventDefault();
      this.selectedNode = null;
      this.selectedEdge = wireHit.dataset.edge;
      this.render();
      this.onSelect(null, this.selectedEdge);
      if (e.pointerType === 'touch') this._startLong('edge', this.selectedEdge);
      return;
    }
    var nodeEl = e.target.closest && e.target.closest('.node');
    if (nodeEl) {
      e.preventDefault();
      var node = this.node(nodeEl.dataset.id);
      if (!node) return;
      if (e.shiftKey && node.kind !== 'target') {
        if (this.selectedNodes.indexOf(node.id) < 0) this.selectedNodes.push(node.id);
        this.selectedNode = this.selectedNodes.length === 1 ? node.id : null;
        var origin = {};
        this.selectedNodes.forEach(function (id) {
          var n = self.node(id);
          if (n) origin[id] = { x: n.x, y: n.y };
        });
        var gp = this._client(e.clientX, e.clientY);
        this._groupDrag = {
          ids: this.selectedNodes.slice(), origin: origin,
          start: gp, sx: e.clientX, sy: e.clientY, moved: false
        };
        this.selectedEdge = null;
        this.render();
        this.onSelect(this.selectedNode, null);
        this.board.setPointerCapture && this.board.setPointerCapture(e.pointerId);
        return;
      }
      this.selectedNodes = [node.id];
      this.select(node.id);
      if (e.pointerType === 'touch' && node.kind !== 'target') this._startLong('node', node.id);
      if (node.kind === 'target') return;
      var p = this._client(e.clientX, e.clientY);
      this._drag = { id: node.id, dx: p.x - node.x, dy: p.y - node.y, moved: false, sx: e.clientX, sy: e.clientY };
      this.board.setPointerCapture && this.board.setPointerCapture(e.pointerId);
      return;
    }
    if (this.draft) { this._cancelDraft(); return; }
    if (e.shiftKey) { this._startMarquee(e); return; }
    this.selectedNodes = [];
    this._pan = { x: this.view.x, y: this.view.y, sx: e.clientX, sy: e.clientY };
    this.board.classList.add('is-panning');
    this.board.setPointerCapture && this.board.setPointerCapture(e.pointerId);
  };

  Board.prototype._startMarquee = function (e) {
    var r = this.board.getBoundingClientRect();
    var el = document.createElement('div');
    el.className = 'marquee';
    this.board.appendChild(el);
    this._marquee = {
      sx: e.clientX, sy: e.clientY,
      el: el, left: r.left, top: r.top
    };
    this._updateMarquee(e.clientX, e.clientY);
    this.board.setPointerCapture && this.board.setPointerCapture(e.pointerId);
  };

  Board.prototype._updateMarquee = function (cx, cy) {
    var m = this._marquee;
    if (!m) return;
    var x = Math.min(m.sx, cx) - m.left, y = Math.min(m.sy, cy) - m.top;
    var w = Math.abs(cx - m.sx), h = Math.abs(cy - m.sy);
    m.el.style.left = x + 'px';
    m.el.style.top = y + 'px';
    m.el.style.width = w + 'px';
    m.el.style.height = h + 'px';
    m.rect = { x: Math.min(m.sx, cx), y: Math.min(m.sy, cy), w: w, h: h };
  };

  Board.prototype._endMarquee = function () {
    var m = this._marquee;
    if (!m) return;
    if (m.rect) {
      var rr = m.rect;
      this.selectedNodes = this.items.filter(function (n) {
        if (n.kind === 'target') return false;
        var el = this.nodes.querySelector('[data-id="' + n.id + '"]');
        var w = n.kind === 'target' ? 160 : W;
        var h = el ? el.offsetHeight : 112;
        var r = this.board.getBoundingClientRect();
        var nx = r.left + this.view.x + n.x * this.view.scale;
        var ny = r.top + this.view.y + n.y * this.view.scale;
        var nw = w * this.view.scale, nh = h * this.view.scale;
        return !(nx > rr.x + rr.w || nx + nw < rr.x || ny > rr.y + rr.h || ny + nh < rr.y);
      }, this).map(function (n) { return n.id; });
    }
    if (m.el && m.el.parentNode) m.el.parentNode.removeChild(m.el);
    this._marquee = null;
    this.selectedNode = this.selectedNodes.length === 1 ? this.selectedNodes[0] : null;
    this.selectedEdge = null;
    this._suppressClick = true;
    this.render();
    this.onSelect(this.selectedNode, null);
    var self = this;
    setTimeout(function () { self._suppressClick = false; }, 80);
  };

  Board.prototype._move = function (e) {
    var self = this;
    if (this._groupDrag) {
      var g = this._groupDrag;
      var gp = this._client(e.clientX, e.clientY);
      var dx = gp.x - g.start.x, dy = gp.y - g.start.y;
      if (Math.abs(e.clientX - g.sx) + Math.abs(e.clientY - g.sy) > 3) g.moved = true;
      g.ids.forEach(function (id) {
        var n = self.node(id);
        if (!n || n.kind === 'target') return;
        n.x = g.origin[id].x + dx;
        n.y = g.origin[id].y + dy;
        var el = self.nodes.querySelector('[data-id="' + id + '"]');
        if (el) { el.style.left = n.x + 'px'; el.style.top = n.y + 'px'; }
      });
      this._updateWires();
      return;
    }
    if (this._marquee) {
      this._updateMarquee(e.clientX, e.clientY);
      return;
    }
    if (this._drag) {
      if (this._long) this._cancelLong();
      var node = this.node(this._drag.id);
      if (!node) return;
      var p = this._client(e.clientX, e.clientY);
      node.x = p.x - this._drag.dx;
      node.y = p.y - this._drag.dy;
      if (Math.abs(e.clientX - this._drag.sx) + Math.abs(e.clientY - this._drag.sy) > 3) this._drag.moved = true;
      var el = this.nodes.querySelector('[data-id="' + node.id + '"]');
      if (el) { el.style.left = node.x + 'px'; el.style.top = node.y + 'px'; }
      this._updateWires();
      return;
    }
    if (this._pan) {
      this.view.x = this._pan.x + (e.clientX - this._pan.sx);
      this.view.y = this._pan.y + (e.clientY - this._pan.sy);
      this._applyView();
      return;
    }
    if (this.draft) {
      var q = this._client(e.clientX, e.clientY);
      this.draft.x = q.x; this.draft.y = q.y;
      var a = this._portPoint(this.draft.from.node, this.draft.from.port);
      if (a) this._draftPath(a, q);
    }
  };

  Board.prototype._up = function (e) {
    this._cancelLong();
    if (this._marquee) { this._endMarquee(); return; }
    if (this._groupDrag) {
      var g = this._groupDrag;
      var moved = g.moved;
      this._groupDrag = null;
      if (moved) {
        var self = this;
        g.ids.forEach(function (id) {
          var n = self.node(id);
          if (n && n.kind !== 'target') self._resolvePosition(n);
        });
        this.render();
        this.onChange();
      }
      this._suppressClick = true;
      var me = this;
      setTimeout(function () { me._suppressClick = false; }, 80);
      return;
    }
    if (this._drag) {
      var moved = this._drag.moved;
      var dragId = this._drag.id;
      this._drag = null;
      if (moved) {
        var dragged = this.node(dragId);
        if (dragged) this._resolvePosition(dragged);
        this.render();
        this.onChange();
      }
      return;
    }
    if (this._pan) { this._pan = null; this.board.classList.remove('is-panning'); return; }
    if (!this.draft) return;
    var el = document.elementFromPoint(e.clientX, e.clientY);
    var inPort = el && el.closest && el.closest('.port-in');
    if (inPort) {
      var mod = inPort.closest('.node');
      this.connect(this.draft.from.node, this.draft.from.port, mod.dataset.id, inPort.dataset.port);
      this._cancelDraft();
      return;
    }
    if (e.pointerType !== 'touch') this._cancelDraft();
  };

  Board.prototype._click = function (e) {
    if (this._suppressClick) return;
    var port = e.target.closest && e.target.closest('.port');
    if (port) {
      var mod = port.closest('.node');
      if (port.classList.contains('port-out')) {
        if (!this.draft) this._startDraft(mod.dataset.id, port.dataset.port, e.clientX, e.clientY);
      } else if (this.draft) {
        this.connect(this.draft.from.node, this.draft.from.port, mod.dataset.id, port.dataset.port);
        this._cancelDraft();
      }
      return;
    }
    var nodeEl = e.target.closest && e.target.closest('.node');
    if (nodeEl) { if (!e.shiftKey) { this.selectedNodes = [nodeEl.dataset.id]; this.select(nodeEl.dataset.id); } return; }
    if (this.draft) { this._cancelDraft(); return; }
    this.selectedNode = null;
    this.selectedNodes = [];
    this.selectedEdge = null;
    this.render();
    this.onSelect(null, null);
  };

  Board.prototype._startLong = function (type, id) {
    var self = this;
    this._cancelLong();
    this._long = {
      type: type,
      id: id,
      timer: setTimeout(function () {
        self._long = null;
        self._drag = null;
        self._pan = null;
        self.board.classList.remove('is-panning');
        if (type === 'node') self.removeNode(id);
        else self.removeEdge(id);
      }, 650)
    };
  };

  Board.prototype._cancelLong = function () {
    if (this._long) {
      clearTimeout(this._long.timer);
      this._long = null;
    }
  };

  Board.prototype._cancel = function () {
    this._cancelLong();
    this._drag = null;
    this._groupDrag = null;
    if (this._marquee && this._marquee.el && this._marquee.el.parentNode) this._marquee.el.parentNode.removeChild(this._marquee.el);
    this._marquee = null;
    this._pan = null;
    this._cancelDraft();
    this.board.classList.remove('is-panning');
  };

  Board.prototype._cancelDraft = function () {
    this.draft = null;
    this.board.classList.remove('is-wiring');
    var d = this.wires.querySelector('.wire-draft');
    if (d) d.remove();
  };

  Board.prototype._startDraft = function (id, port, cx, cy) {
    var a = this._portPoint(id, port);
    if (!a) return;
    var p = this._client(cx, cy);
    this.draft = { from: { node: id, port: port }, x: p.x, y: p.y };
    this.board.classList.add('is-wiring');
    this._draftPath(a, p);
  };

  Board.prototype._draftPath = function (a, b) {
    var d = this.wires.querySelector('.wire-draft');
    if (!d) {
      d = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      d.setAttribute('class', 'wire-draft');
      this.wires.appendChild(d);
    }
    d.setAttribute('d', this._path(a.x, a.y, b.x, b.y));
  };

  Board.prototype._path = function (x1, y1, x2, y2) {
    return this._pathPoints(this._simplePoints(x1, y1, x2, y2));
  };

  Board.prototype._simplePoints = function (x1, y1, x2, y2) {
    if (Math.abs(y2 - y1) < 2) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
    if (x2 - x1 > 60) {
      var mx = x1 + (x2 - x1) * 0.5;
      return [{ x: x1, y: y1 }, { x: mx, y: y1 }, { x: mx, y: y2 }, { x: x2, y: y2 }];
    }
    var loop = 28;
    var my = y1 + (y2 - y1) / 2;
    return [{ x: x1, y: y1 }, { x: x1 + loop, y: y1 }, { x: x1 + loop, y: my }, { x: x2 - loop, y: my }, { x: x2 - loop, y: y2 }, { x: x2, y: y2 }];
  };

  Board.prototype._pathPoints = function (pts) {
    if (!pts || !pts.length) return '';
    /* PCB-style 45° chamfers at right-angle corners. */
    var out = [pts[0]];
    for (var i = 1; i < pts.length - 1; i++) {
      var a = out[out.length - 1], b = pts[i], c = pts[i + 1];
      var horizontal = Math.abs(a.y - b.y) < 1 && Math.abs(b.y - c.y) > 1;
      var vertical = Math.abs(a.x - b.x) < 1 && Math.abs(b.x - c.x) > 1;
      var cut = 9;
      if ((horizontal || vertical) && Math.abs(a.x - b.x) + Math.abs(a.y - b.y) > cut * 2 && Math.abs(c.x - b.x) + Math.abs(c.y - b.y) > cut * 2) {
        out.push({ x: b.x - Math.sign(b.x - a.x) * cut, y: b.y - Math.sign(b.y - a.y) * cut });
        out.push({ x: b.x + Math.sign(c.x - b.x) * cut, y: b.y + Math.sign(c.y - b.y) * cut });
      } else out.push(b);
    }
    out.push(pts[pts.length - 1]);
    var d = 'M' + out[0].x + ' ' + out[0].y;
    for (var j = 1; j < out.length; j++) d += 'L' + out[j].x + ' ' + out[j].y;
    return d;
  };

  Board.prototype._simplify = function (pts) {
    if (pts.length <= 2) return pts;
    var out = [pts[0]];
    for (var i = 1; i < pts.length - 1; i++) {
      var a = out[out.length - 1], b = pts[i], c = pts[i + 1];
      var abx = b.x - a.x, aby = b.y - a.y, bcx = c.x - b.x, bcy = c.y - b.y;
      if ((abx === 0 && bcx === 0 && Math.sign(aby) === Math.sign(bcy)) ||
          (aby === 0 && bcy === 0 && Math.sign(abx) === Math.sign(bcx))) continue;
      if (abx === 0 && bcx === 0) continue;
      if (aby === 0 && bcy === 0) continue;
      out.push(b);
    }
    out.push(pts[pts.length - 1]);
    return out;
  };

  Board.prototype._nodeRect = function (n, el) {
    var w = n.kind === 'target' ? 160 : W;
    var h = el ? el.offsetHeight : (n.kind === 'target' ? 104 : 112);
    return { x: n.x, y: n.y, w: w, h: h, id: n.id };
  };

  Board.prototype._rects = function () {
    var self = this;
    return this.items.map(function (n) {
      var el = self.nodes.querySelector('[data-id="' + n.id + '"]');
      return self._nodeRect(n, el);
    });
  };

  /* A* on a 16px grid: bend penalty + reuse penalty for existing wire segments. */
  Board.prototype._route = function (a, b, rects, used, fromId, toId) {
    var CELL = 16;
    var xs = [a.x, b.x], ys = [a.y, b.y];
    rects.forEach(function (r) { xs.push(r.x - 20, r.x + r.w + 20); ys.push(r.y - 20, r.y + r.h + 20); });
    var minX = Math.floor((Math.min.apply(null, xs) - 180) / CELL) * CELL;
    var maxX = Math.ceil((Math.max.apply(null, xs) + 180) / CELL) * CELL;
    var minY = Math.floor((Math.min.apply(null, ys) - 180) / CELL) * CELL;
    var maxY = Math.ceil((Math.max.apply(null, ys) + 180) / CELL) * CELL;
    var cols = Math.max(2, Math.round((maxX - minX) / CELL) + 1);
    var rows = Math.max(2, Math.round((maxY - minY) / CELL) + 1);
    var blocked = new Uint8Array(cols * rows);
    var i, j, k;
    for (i = 0; i < rects.length; i++) {
      var r = rects[i];
      var x0 = Math.floor((r.x - 14 - minX) / CELL), x1 = Math.ceil((r.x + r.w + 14 - minX) / CELL);
      var y0 = Math.floor((r.y - 14 - minY) / CELL), y1 = Math.ceil((r.y + r.h + 14 - minY) / CELL);
      for (var yy = Math.max(0, y0); yy <= Math.min(rows - 1, y1); yy++)
        for (var xx = Math.max(0, x0); xx <= Math.min(cols - 1, x1); xx++) blocked[yy * cols + xx] = 1;
    }
    function snap(v, min) { return Math.max(1, Math.min(Math.round((v - min) / CELL), 100000)); }
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
        var sk = (cx < nx || (cx === nx && cy < ny)) ? (cx + ',' + cy + '|' + nx + ',' + ny) : (nx + ',' + ny + '|' + cx + ',' + cy);
        var reuse = used[sk] || 0;
        var cost = 1 + (nd === (dir + 2) % 4 ? 0 : (nd !== dir ? 3 : 0)) + reuse * 16;
        var ndist = dist[state] + cost;
        if (ndist < dist[nstate]) {
          dist[nstate] = ndist;
          prev[nstate] = state;
          push(nstate, ndist + Math.abs(nx - ex) + Math.abs(ny - ey));
        }
      }
    }
    if (found < 0) return this._fallbackRoute(a, b, rects, fromId, toId);
    var cells = [];
    var cur = found;
    while (cur >= 0) {
      var cell2 = cur >> 2;
      cells.push({ x: (cell2 % cols) * CELL + minX, y: ((cell2 / cols) | 0) * CELL + minY });
      cur = prev[cur];
    }
    cells.reverse();
    // mark used segments
    for (var q = 1; q < cells.length; q++) {
      var p0 = cells[q - 1], p1 = cells[q];
      var gx0 = Math.round((p0.x - minX) / CELL), gy0 = Math.round((p0.y - minY) / CELL);
      var gx1 = Math.round((p1.x - minX) / CELL), gy1 = Math.round((p1.y - minY) / CELL);
      var key = (gx0 < gx1 || (gx0 === gx1 && gy0 < gy1)) ? (gx0 + ',' + gy0 + '|' + gx1 + ',' + gy1) : (gx1 + ',' + gy1 + '|' + gx0 + ',' + gy0);
      used[key] = (used[key] || 0) + 1;
    }
    var pts = [{ x: a.x, y: a.y }];
    cells.forEach(function (p) { if (p.x !== a.x || p.y !== a.y) pts.push(p); });
    pts.push({ x: b.x, y: b.y });
    return this._simplify(pts);
  };

  Board.prototype._segmentClear = function (p, q, rects) {
    var pad = 10;
    var steps = Math.max(1, Math.ceil((Math.abs(q.x - p.x) + Math.abs(q.y - p.y)) / 8));
    for (var i = 1; i < steps; i++) {
      var t = i / steps;
      var x = p.x + (q.x - p.x) * t, y = p.y + (q.y - p.y) * t;
      for (var r = 0; r < rects.length; r++) {
        var rr = rects[r];
        if (x > rr.x - pad && x < rr.x + rr.w + pad && y > rr.y - pad && y < rr.y + rr.h + pad) return false;
      }
    }
    return true;
  };

  Board.prototype._pathClear = function (pts, rects) {
    for (var i = 1; i < pts.length; i++) if (!this._segmentClear(pts[i - 1], pts[i], rects)) return false;
    return true;
  };

  Board.prototype._fallbackRoute = function (a, b, rects, fromId, toId) {
    var obstacles = rects.filter(function (r) { return r.id !== fromId && r.id !== toId; });
    var minY = Math.min(a.y, b.y), maxY = Math.max(a.y, b.y);
    obstacles.forEach(function (r) { minY = Math.min(minY, r.y); maxY = Math.max(maxY, r.y + r.h); });
    var top = minY - 40, bottom = maxY + 40;
    var candidates = [
      this._simplePoints(a.x, a.y, b.x, b.y),
      [{ x: a.x, y: a.y }, { x: a.x, y: top }, { x: b.x, y: top }, { x: b.x, y: b.y }],
      [{ x: a.x, y: a.y }, { x: a.x, y: bottom }, { x: b.x, y: bottom }, { x: b.x, y: b.y }]
    ];
    for (var i = 0; i < candidates.length; i++) {
      if (this._pathClear(candidates[i], obstacles)) return this._simplify(candidates[i]);
    }
    return this._simplePoints(a.x, a.y, b.x, b.y);
  };

  Board.prototype._updateWires = function () {
    var self = this;
    var ns = 'http://www.w3.org/2000/svg';
    while (this.wires.firstChild) this.wires.removeChild(this.wires.firstChild);
    var rects = this._rects();
    var used = Object.create(null);
    var routes = {};
    var dragging = !!(this._drag || this._groupDrag);
    var ordered = this.edges.slice().sort(function (e1, e2) {
      var a1 = self._portPoint(e1.from.node, e1.from.port), b1 = self._portPoint(e1.to.node, e1.to.port);
      var a2 = self._portPoint(e2.from.node, e2.from.port), b2 = self._portPoint(e2.to.node, e2.to.port);
      var d1 = a1 && b1 ? Math.abs(a1.x - b1.x) + Math.abs(a1.y - b1.y) : 0;
      var d2 = a2 && b2 ? Math.abs(a2.x - b2.x) + Math.abs(a2.y - b2.y) : 0;
      return d1 - d2;
    });
    ordered.forEach(function (e) {
      var a = self._portPoint(e.from.node, e.from.port);
      var b = self._portPoint(e.to.node, e.to.port);
      if (!a || !b) return;
      routes[e.id] = dragging ? self._simplePoints(a.x, a.y, b.x, b.y) : self._route(a, b, rects, used, e.from.node, e.to.node);
    });
    this.edges.forEach(function (e) {
      var a = self._portPoint(e.from.node, e.from.port);
      var b = self._portPoint(e.to.node, e.to.port);
      if (!a || !b) return;
      var pts = routes[e.id] || self._simplePoints(a.x, a.y, b.x, b.y);
      var d = self._pathPoints(pts);
      var state = 'idle';
      if (self.result) {
        var from = self.result.results[e.from.node];
        if (from && from.state === 'error') state = 'error';
        else if (from && from.ast) state = 'live';
      }
      var fromNode = self.node(e.from.node);
      var role = 'assertion';
      if (fromNode) {
        if (fromNode.kind === 'atom') role = 'atom';
        else {
          var info = window.RSL.Engine.info(fromNode.kind);
          var p = (info.ports.outputs || []).filter(function (x) { return x.id === e.from.port; })[0];
          if (p) role = p.type;
        }
      }
      var path = document.createElementNS(ns, 'path');
      path.setAttribute('d', d);
      path.setAttribute('class', 'wire' + (self.selectedEdge === e.id ? ' is-selected' : '') + (e._new ? ' is-new' : ''));
      path.setAttribute('data-state', state);
      path.setAttribute('data-role', role);
      self.wires.appendChild(path);
      var hit = document.createElementNS(ns, 'path');
      hit.setAttribute('d', d);
      hit.setAttribute('class', 'wire-hit');
      hit.dataset.edge = e.id;
      self.wires.appendChild(hit);
    });
    if (this.draft) {
      var from = this._portPoint(this.draft.from.node, this.draft.from.port);
      if (from) this._draftPath(from, { x: this.draft.x, y: this.draft.y });
    }
  };

  Board.prototype._portPoint = function (nodeId, portId) {
    var nodeEl = this.nodes.querySelector('[data-id="' + nodeId + '"]');
    if (!nodeEl) return null;
    var p = nodeEl.querySelector('.port[data-port="' + portId + '"]');
    if (!p) return null;
    var wr = this.world.getBoundingClientRect();
    var pr = p.getBoundingClientRect();
    return { x: (pr.left + pr.width / 2 - wr.left) / this.view.scale, y: (pr.top + pr.height / 2 - wr.top) / this.view.scale };
  };

  Board.prototype._code = function (n) {
    if (n.kind === 'target') return '⊢';
    if (n.kind === 'axiom') return n.config.axiomId || 'A1';
    if (n.kind === 'theorem') {
      var tc = String(n.config.theoremCode || 'T');
      var levels = window.RSL.LEVELS || [];
      for (var i = 0; i < levels.length; i += 1) {
        if (levels[i].id === tc) return (levels[i].code || tc).slice(0, 6);
      }
      return tc.replace('*', '');
    }
    if (n.kind === 'atom') return '';
    if (n.kind === 'term') return n.config.name || 'x';
    if (n.kind === 'pred') return n.config.name || 'F';
    if (n.kind === 'not') return '¬';
    if (n.kind === 'or') return '∨';
    if (n.kind === 'imp') return '→';
    if (n.kind === 'and') return '∧';
    if (n.kind === 'iff') return '↔';
    if (n.kind === 'subst') return 'S';
    if (n.kind === 'replace') return 'D';
    if (n.kind === 'detach') return 'M';
    if (n.kind === 'quant') return n.config.kind === 'exists' ? '∃' : '∀';
    if (n.kind === 'all-elim') return '∀E';
    if (n.kind === 'all-intro') return '∀I';
    if (n.kind === 'exists-intro') return '∃I';
    if (n.kind === 'exists-elim') return '∃E';
    if (n.kind === 'archive') return String(n.config.label || 'M').slice(0, 6);
    return '·';
  };

  Board.prototype.render = function () {
    var self = this;
    var L = window.RSL.Logic;
    this.nodes.innerHTML = '';
    this.items.forEach(function (n) {
      var info = window.RSL.Engine.info(n.kind);
      var r = self.result && self.result.results[n.id];
      var el = document.createElement('article');
      el.className = 'node' + (n.kind === 'target' ? ' is-target' : '') + (n._new ? ' is-new' : '');
      el.dataset.id = n.id;
      el.dataset.kind = n.kind;
      el.dataset.state = r ? r.state : 'idle';
      el.dataset.selected = self.selectedNodes.indexOf(n.id) >= 0 ? 'true' : 'false';
      el.style.left = n.x + 'px';
      el.style.top = n.y + 'px';
      el.style.width = (n.kind === 'target' ? 160 : W) + 'px';
      el.setAttribute('aria-label', self._code(n));
      var code = self._code(n);
      var formula = '';
      var ast = null;
      if (n.kind !== 'target' && r && r.ast) ast = r.ast;
      if (ast) formula = window.RSL.formatFormula ? window.RSL.formatFormula(ast) : L.toHTML(ast);
      var isAssertion = (info.ports.outputs || []).some(function (p) { return p.type === 'assertion'; });
      if (isAssertion) formula = '<span class="node-turnstile">⊢</span>' + formula;
      var ins = (info.ports.inputs || []).map(function (p, i, arr) {
        var top = 47 + i * 32;
        var role = (n.kind === 'subst' && p.id === 'atom') ? 'atom' : p.type;
        return '<button class="port port-in" data-port="' + esc(p.id) + '" data-role="' + esc(role) + '" style="top:' + top + 'px" title="' + esc(p.label) + '" aria-label="' + esc(p.label) + '"></button>';
      }).join('');
      var outs = (info.ports.outputs || []).map(function (p) {
        var role = n.kind === 'atom' ? 'atom' : p.type;
        return '<button class="port port-out" data-port="' + esc(p.id) + '" data-role="' + esc(role) + '" style="top:47px" title="' + esc(p.label) + '" aria-label="' + esc(p.label) + '"></button>';
      }).join('');
      var inCount = (info.ports.inputs || []).length;
      el.style.minHeight = (n.kind === 'target' ? 104 : Math.max(96, 47 + Math.max(0, inCount - 1) * 32 + 29)) + 'px';
      if (n.kind === 'target') {
        el.innerHTML = '<div class="target-mark">⊢</div>' + ins.replace('style="top:47px"', 'style="top:46px"');
      } else {
        el.innerHTML =
          '<div class="node-top"><span class="node-code">' + esc(code) + '</span></div>' +
          '<div class="node-formula formula">' + (formula || '<span class="blank">·</span>') + '</div>' +
          ins + outs;
      }
      self.nodes.appendChild(el);
    });
    this._updateWires();
  };

  Board.prototype.paint = function (result) {
    this.result = result;
    var L = window.RSL.Logic;
    var self = this;
    this.nodes.querySelectorAll('.node').forEach(function (el) {
      var n = self.node(el.dataset.id);
      if (!n) return;
      var r = result && result.results[n.id];
      el.dataset.state = r ? r.state : 'idle';
      el.dataset.selected = self.selectedNodes.indexOf(n.id) >= 0 ? 'true' : 'false';
      var code = el.querySelector('.node-code');
      if (code) code.textContent = self._code(n);
      var f = el.querySelector('.node-formula');
      if (f) {
        var ast = r && r.ast ? r.ast : null;
        var info = window.RSL.Engine.info(n.kind);
        var prefix = (info.ports.outputs || []).some(function (p) { return p.type === 'assertion'; }) ? '<span class="node-turnstile">⊢</span>' : '';
        if (ast) f.innerHTML = prefix + (window.RSL.formatFormula ? window.RSL.formatFormula(ast) : L.toHTML(ast));
        else f.innerHTML = '<span class="blank">·</span>';
      }
    });
    this._updateWires();
  };

  Board.prototype.select = function (id) {
    this.selectedNode = id;
    this.selectedNodes = id ? [id] : [];
    this.selectedEdge = null;
    this.render();
    this.onSelect(id, null);
  };

  Board.prototype.connect = function (fromNode, fromPort, toNode, toPort) {
    if (fromNode === toNode) { this.onToast('不能接到自己'); return false; }
    var from = this.node(fromNode), to = this.node(toNode);
    if (!from || !to) return false;
    var outInfo = window.RSL.Engine.info(from.kind);
    var inInfo = window.RSL.Engine.info(to.kind);
    var op = (outInfo.ports.outputs || []).filter(function (p) { return p.id === fromPort; })[0];
    var ip = (inInfo.ports.inputs || []).filter(function (p) { return p.id === toPort; })[0];
    if (!op || !ip) return false;
    if (op.type !== ip.type) { this.onToast('接口不匹配'); return false; }
    var existing = this.edges.filter(function (e) { return e.to.node === toNode && e.to.port === toPort; })[0];
    if (existing && existing.from.node === fromNode && existing.from.port === fromPort) return false;
    if (existing) this.edges = this.edges.filter(function (e) { return e !== existing; });
    var edge = { id: uid('e'), from: { node: fromNode, port: fromPort }, to: { node: toNode, port: toPort }, _new: true };
    this.edges.push(edge);
    var topo = window.RSL.Engine.topo(this.items, this.edges);
    if (topo.cycle.length) {
      this.edges = this.edges.filter(function (e) { return e !== edge; });
      if (existing) this.edges.push(existing);
      this.onToast('不能成环');
      this.render();
      return false;
    }
    this.selectedNode = null;
    this.selectedEdge = edge.id;
    this.render();
    setTimeout(function () { delete edge._new; }, 380);
    this.onChange();
    this.onSelect(null, edge.id);
    this.onConnect();
    return true;
  };

  Board.prototype._overlaps = function (n, x, y) {
    var el = this.nodes.querySelector('[data-id="' + n.id + '"]');
    var own = this._nodeRect(n, el);
    var w = own.w, h = own.h;
    for (var i = 0; i < this.items.length; i++) {
      var m = this.items[i];
      if (m.id === n.id) continue;
      var mel = this.nodes.querySelector('[data-id="' + m.id + '"]');
      var r = this._nodeRect(m, mel);
      if (x < r.x + r.w + 18 && x + w + 18 > r.x && y < r.y + r.h + 18 && y + h + 18 > r.y) return true;
    }
    return false;
  };

  Board.prototype._resolvePosition = function (n) {
    n.x = snap(n.x); n.y = snap(n.y);
    if (!this._overlaps(n, n.x, n.y)) return;
    for (var ring = 1; ring <= 30; ring++) {
      for (var oy = -ring; oy <= ring; oy++) {
        for (var ox = -ring; ox <= ring; ox++) {
          if (Math.max(Math.abs(ox), Math.abs(oy)) !== ring) continue;
          var x = Math.max(0, snap(n.x + ox * 32)), y = Math.max(0, snap(n.y + oy * 32));
          if (!this._overlaps(n, x, y)) { n.x = x; n.y = y; return; }
        }
      }
    }
  };

  Board.prototype.addNode = function (kind, config, pos) {
    var info = window.RSL.Engine.info(kind);
    if (!info) return null;
    var n = { id: uid('n'), kind: kind, x: snap(pos.x), y: snap(pos.y), config: Object.assign({}, info.config || {}, config || {}), _new: true };
    this.items.push(n);
    this._resolvePosition(n);
    setTimeout(function () { delete n._new; }, 320);
    this.select(n.id);
    this.onChange();
    return n;
  };

  Board.prototype.removeNode = function (id) {
    var n = this.node(id);
    if (!n || n.kind === 'target') return;
    this.items = this.items.filter(function (x) { return x.id !== id; });
    this.edges = this.edges.filter(function (e) { return e.from.node !== id && e.to.node !== id; });
    this.selectedNode = null;
    this.render();
    this.onChange();
    this.onSelect(null, null);
    this.onRemove('node');
  };

  Board.prototype.removeEdge = function (id) {
    this.edges = this.edges.filter(function (e) { return e.id !== id; });
    this.selectedEdge = null;
    this.render();
    this.onChange();
    this.onSelect(null, null);
    this.onRemove('edge');
  };

  Board.prototype.removeSelected = function () {
    if (this.selectedEdge) { this.removeEdge(this.selectedEdge); return; }
    if (this.selectedNodes && this.selectedNodes.length) {
      var self = this;
      this.selectedNodes.slice().forEach(function (id) { self.removeNode(id); });
      this.selectedNodes = [];
      this.selectedNode = null;
    }
  };

  Board.prototype.updateConfig = function (id, patch) {
    var n = this.node(id);
    if (!n) return;
    n.config = Object.assign({}, n.config, patch);
    this.render();
    this.onChange();
  };

  window.RSL.Board = Board;
})();










