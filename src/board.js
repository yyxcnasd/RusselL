/* 公理板 — minimal graph board: DOM, interaction and state only.
 * Pure geometry / wire routing lives in src/route.js (window.RSL.Route).
 * Classic script, no modules; keep the DOM class names and the Board API stable.
 */
(function () {
  'use strict';
  window.RSL = window.RSL || {};
  var Route = window.RSL.Route;
  if (!Route) throw new Error('RSL.Route missing: load src/route.js before src/board.js');
  var ROUTE = Route.ROUTE;

  /* Geometry shared by layout, routing rects and port markers. */
  var NODE_W = 232;          // .node width in simple.css (border-box)
  var TARGET_W = 160;
  var SNAP = 16;             // board snapping grid
  var PORT_TOP = 47;         // first input/output port top offset in the node
  var PORT_STEP = 32;
  var PORT_TAIL = 29;        // reserved space below the last input port
  var NODE_MIN_H = 96;
  var TARGET_PORT_TOP = 46;
  var TARGET_MIN_H = 104;
  var DEFAULT_NODE_H = 112;
  var DEFAULT_TARGET_H = 104;
  var OVERLAP_GAP = 18;
  var VIEW_MIN = 0.35, VIEW_MAX = 1.35;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function uid(p) { return p + Math.random().toString(36).slice(2, 8); }
  function snap(v) { return Math.round(v / SNAP) * SNAP; }
  function nodeWidth(n) { return n.kind === 'target' ? TARGET_W : NODE_W; }
  /* S 元件的额外代入组数（0–4）：总组数 = 1 + extras。兼容旧的 dual 配置。 */
  function substExtras(config) {
    if (!config) return 0;
    var n = typeof config.groups === 'number' ? config.groups : (config.dual ? 1 : 0);
    return Math.max(0, Math.min(4, n));
  }
  function substPortVisible(id, extras) {
    if (id === 'vleft' || id === 'vright') return false; /* 旧变元改名端口不再使用 */
    var m = /^(atom|formula)(\d+)$/.exec(id);
    if (!m) return true;
    return Number(m[2]) <= 1 + extras;
  }
  /* 没有 DOM 元素时也能估算节点高度：S 元件端口多，不能按 112px 敷衍。 */
  function estimateNodeHeight(n) {
    if (n.kind === 'target') return DEFAULT_TARGET_H;
    var info = window.RSL.Engine.info(n.kind);
    var count = (info.ports.inputs || []).length;
    if (n.kind === 'subst') {
      var extras = substExtras(n.config);
      count = (info.ports.inputs || []).filter(function (p) { return substPortVisible(p.id, extras); }).length;
    }
    return Math.max(NODE_MIN_H, PORT_TOP + Math.max(0, count - 1) * PORT_STEP + PORT_TAIL);
  }
  function portTop(n, i) { return (n.kind === 'target' ? TARGET_PORT_TOP : PORT_TOP) + i * PORT_STEP; }

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
    this.tray = opts.tray || null;
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
    this._touches = Object.create(null);   // pointerId -> {x,y}，双指缩放用
    this._pinch = null;
    this._lastTap = null;                  // 双击空板 = 适应视图
    this._pendingDetach = null;            // 按住已接线的输入端口，拖动即拆线
    this._dropTarget = false;              // 模块是否悬停在下边栏删除区
    this._elById = Object.create(null);   // id -> node element, rebuilt by render()
    this._wireEls = Object.create(null);  // edge id -> { path, hit }, rebuilt by full _updateWires
    this._lastUsed = null;
    this._cheapDirty = false;             // cheap drag preview needs a full pass before settling
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
      if (wire) { self.removeEdge(wire.dataset.edge); return; }
      var node = e.target.closest && e.target.closest('.node');
      if (!node) { self.fit({ minScale: 0.35 }); self.onChange(); }
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
      self.selectedNodes = [];
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
    this.view = { x: x, y: y, scale: clamp(scale, VIEW_MIN, VIEW_MAX) };
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
    var next = clamp(old * Math.pow(1.12, dir), VIEW_MIN, VIEW_MAX);
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

  Board.prototype.fit = function (opts) {
    var self = this;
    var minScale = opts && opts.minScale ? opts.minScale : VIEW_MIN;
    var r = this.board.getBoundingClientRect();
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    this.items.forEach(function (n) {
      var el = self._elById[n.id];
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + nodeWidth(n));
      maxY = Math.max(maxY, n.y + (el ? el.offsetHeight : estimateNodeHeight(n)));
    });
    if (!isFinite(minX)) { this.setView(30, 30, 0.9); return; }
    var scale = clamp(Math.min((r.width - 100) / (maxX - minX), (r.height - 100) / (maxY - minY)), minScale, 1.05);
    this.setView((r.width - (maxX - minX) * scale) / 2 - minX * scale, (r.height - (maxY - minY) * scale) / 2 - minY * scale, scale);
  };

  Board.prototype._wheel = function (e) {
    e.preventDefault();
    this.zoom(e.deltaY > 0 ? -1 : 1, e.clientX, e.clientY);
  };

  /* ---- 触屏双指缩放 ---------------------------------------------------- */

  Board.prototype._pinchPair = function () {
    var ids = Object.keys(this._touches);
    if (ids.length < 2) return null;
    return { a: this._touches[ids[0]], b: this._touches[ids[1]] };
  };

  Board.prototype._startPinch = function () {
    var pair = this._pinchPair();
    if (!pair) return;
    this._cancelLong();
    this._drag = null;
    this._groupDrag = null;
    this._pan = null;
    if (this._marquee && this._marquee.el && this._marquee.el.parentNode) {
      this._marquee.el.parentNode.removeChild(this._marquee.el);
    }
    this._marquee = null;
    this._pendingDetach = null;
    this._cancelDraft();
    this.board.classList.remove('is-panning');
    var midX = (pair.a.x + pair.b.x) / 2, midY = (pair.a.y + pair.b.y) / 2;
    this._pinch = {
      dist: Math.hypot(pair.b.x - pair.a.x, pair.b.y - pair.a.y) || 1,
      scale: this.view.scale,
      world: this._client(midX, midY)
    };
    this.board.classList.add('is-pinching');
    this._suppressClick = true;
  };

  Board.prototype._movePinch = function () {
    var pair = this._pinchPair(), pinch = this._pinch;
    if (!pair || !pinch) return;
    var r = this.board.getBoundingClientRect();
    var midX = (pair.a.x + pair.b.x) / 2, midY = (pair.a.y + pair.b.y) / 2;
    var dist = Math.hypot(pair.b.x - pair.a.x, pair.b.y - pair.a.y) || 1;
    var scale = clamp(pinch.scale * dist / pinch.dist, VIEW_MIN, VIEW_MAX);
    this.view.scale = scale;
    this.view.x = midX - r.left - pinch.world.x * scale;
    this.view.y = midY - r.top - pinch.world.y * scale;
    this._applyView();
    this._updateWires('cheap');
  };

  Board.prototype._endPinch = function () {
    this._pinch = null;
    this.board.classList.remove('is-pinching');
    this._updateWires();
    var self = this;
    setTimeout(function () { self._suppressClick = false; }, 80);
  };

  Board.prototype._client = function (cx, cy) {
    var r = this.board.getBoundingClientRect();
    return { x: (cx - r.left - this.view.x) / this.view.scale, y: (cy - r.top - this.view.y) / this.view.scale };
  };

  Board.prototype._nodeEl = function (id) {
    return this._elById[id] || null;
  };

  Board.prototype._incomingEdge = function (nodeId, portId) {
    for (var i = 0; i < this.edges.length; i += 1) {
      var e = this.edges[i];
      if (e.to && e.to.node === nodeId && e.to.port === portId) return e;
    }
    return null;
  };

  /* 模块悬停在下边栏：高亮删除区，松手即删。 */
  Board.prototype._overTray = function (cx, cy) {
    if (!this.tray) return false;
    var r = this.tray.getBoundingClientRect();
    return cx >= r.left - 6 && cx <= r.right + 6 && cy >= r.top - 6 && cy <= r.bottom + 6;
  };

  Board.prototype._setDropTarget = function (on) {
    if (this._dropTarget === on) return;
    this._dropTarget = on;
    if (this.tray) this.tray.classList.toggle('is-drop-target', on);
  };

  Board.prototype._down = function (e) {
    var self = this;
    /* 触屏双指缩放：第二根手指按下时接管，取消正在进行的拖拽/平移。 */
    if (e.pointerType === 'touch' && e.pointerId !== undefined) {
      this._touches[e.pointerId] = { x: e.clientX, y: e.clientY };
      if (Object.keys(this._touches).length >= 2) {
        this._startPinch();
        return;
      }
    }
    var directPort = e.target.closest && e.target.closest('.port');
    if (!directPort && e.pointerType === 'touch') {
      var nearOut = this._nearestPort(e.clientX, e.clientY, '.port-out', 26);
      if (nearOut) {
        e.preventDefault();
        this._startDraft(nearOut.nodeId, nearOut.portId, e.clientX, e.clientY);
        return;
      }
    }
    var port = directPort;
    if (port) {
      e.preventDefault();
      e.stopPropagation();
      var mod = port.closest('.node');
      if (port.classList.contains('port-out')) {
        this._startDraft(mod.dataset.id, port.dataset.port, e.clientX, e.clientY);
      } else if (this.draft) {
        this.connect(this.draft.from.node, this.draft.from.port, mod.dataset.id, port.dataset.port);
        this._cancelDraft();
      } else {
        var wired = this._incomingEdge(mod.dataset.id, port.dataset.port);
        if (wired) {
          this._pendingDetach = { edge: wired, sx: e.clientX, sy: e.clientY };
          this.board.setPointerCapture && this.board.setPointerCapture(e.pointerId);
        }
      }
      return;
    }
    var wireHit = e.target.closest && e.target.closest('.wire-hit');
    if (wireHit) {
      e.preventDefault();
      this.selectedNode = null;
      this.selectedNodes = [];
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
      this._drag = { id: node.id, dx: p.x - node.x, dy: p.y - node.y, ox: node.x, oy: node.y, moved: false, sx: e.clientX, sy: e.clientY };
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
    var self = this;
    if (m.rect) {
      var rr = m.rect;
      var r = this.board.getBoundingClientRect();
      this.selectedNodes = this.items.filter(function (n) {
        if (n.kind === 'target') return false;
        var el = self._elById[n.id];
        var w = nodeWidth(n);
        var h = el ? el.offsetHeight : estimateNodeHeight(n);
        var nx = r.left + self.view.x + n.x * self.view.scale;
        var ny = r.top + self.view.y + n.y * self.view.scale;
        var nw = w * self.view.scale, nh = h * self.view.scale;
        return !(nx > rr.x + rr.w || nx + nw < rr.x || ny > rr.y + rr.h || ny + nh < rr.y);
      }).map(function (n) { return n.id; });
    }
    if (m.el && m.el.parentNode) m.el.parentNode.removeChild(m.el);
    this._marquee = null;
    this.selectedNode = this.selectedNodes.length === 1 ? this.selectedNodes[0] : null;
    this.selectedEdge = null;
    this._suppressClick = true;
    this.render();
    this.onSelect(this.selectedNode, null);
    setTimeout(function () { self._suppressClick = false; }, 80);
  };

  Board.prototype._move = function (e) {
    var self = this;
    if (e.pointerType === 'touch' && this._touches[e.pointerId]) {
      this._touches[e.pointerId] = { x: e.clientX, y: e.clientY };
    }
    if (this._pinch) {
      this._movePinch();
      return;
    }
    if (this._pendingDetach) {
      var pending = this._pendingDetach;
      if (Math.abs(e.clientX - pending.sx) + Math.abs(e.clientY - pending.sy) > 4) {
        this._pendingDetach = null;
        this.edges = this.edges.filter(function (edge) { return edge !== pending.edge; });
        this.selectedEdge = null;
        this.render();
        this._startDraft(pending.edge.from.node, pending.edge.from.port, e.clientX, e.clientY);
        if (this.draft) this.draft.detached = true;
        this.onChange();
      }
      return;
    }
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
        var el = self._elById[id];
        if (el) { el.style.left = n.x + 'px'; el.style.top = n.y + 'px'; }
      });
      this._updateWires('cheap', g.ids);
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
      var el = self._elById[node.id];
      if (el) { el.style.left = node.x + 'px'; el.style.top = node.y + 'px'; }
      this._setDropTarget(this._drag.moved && this._overTray(e.clientX, e.clientY));
      this._updateWires('cheap', [node.id]);
      return;
    }
    if (this._pan) {
      this.view.x = this._pan.x + (e.clientX - this._pan.sx);
      this.view.y = this._pan.y + (e.clientY - this._pan.sy);
      if (Math.abs(e.clientX - this._pan.sx) + Math.abs(e.clientY - this._pan.sy) > 5) this._pan.moved = true;
      this._applyView();
      return;
    }
    if (this.draft) {
      var q = this._client(e.clientX, e.clientY);
      this.draft.x = q.x; this.draft.y = q.y;
      var a = this._portPoint(this.draft.from.node, this.draft.from.port);
      if (a) this._draftPath(a, q, this._draftRects);
    }
  };

  Board.prototype._up = function (e) {
    if (e.pointerType === 'touch' && e.pointerId !== undefined) {
      delete this._touches[e.pointerId];
      if (this._pinch) {
        this._endPinch();
        return;
      }
    }
    this._cancelLong();
    if (this._pendingDetach) {
      var tapDetach = this._pendingDetach;
      this._pendingDetach = null;
      if (Math.abs(e.clientX - tapDetach.sx) + Math.abs(e.clientY - tapDetach.sy) <= 4) return;
    }
    this._setDropTarget(false);
    if (this._marquee) { this._endMarquee(); return; }
    if (this._groupDrag) {
      var g = this._groupDrag;
      var moved = g.moved;
      var staleGroup = this._cheapDirty;
      this._groupDrag = null;
      if (!moved && staleGroup) this._updateWires();
      if (moved) {
        var self = this;
        var conflict = false;
        g.ids.forEach(function (id) {
          var n = self.node(id);
          if (!n || n.kind === 'target') return;
          n.x = snap(n.x); n.y = snap(n.y);
          if (self._overlaps(n, n.x, n.y, g.ids)) conflict = true;
        });
        if (conflict) {
          g.ids.forEach(function (id) {
            var n = self.node(id);
            if (!n) return;
            n.x = g.origin[id].x; n.y = g.origin[id].y;
          });
        }
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
      var drag = this._drag;
      var staleDrag = this._cheapDirty;
      this._drag = null;
      if (moved && this._overTray(e.clientX, e.clientY)) {
        this.removeNode(dragId);
        return;
      }
      if (moved) {
        var dragged = this.node(dragId);
        if (dragged) {
          dragged.x = snap(dragged.x); dragged.y = snap(dragged.y);
          if (this._overlaps(dragged, dragged.x, dragged.y)) {
            dragged.x = drag.ox; dragged.y = drag.oy;
          }
        }
        this.render();
        this.onChange();
      } else if (staleDrag) this._updateWires();
      return;
    }
    if (this._pan) {
      var wasTap = !this._pan.moved;
      this._pan = null;
      this.board.classList.remove('is-panning');
      if (wasTap && e.pointerType === 'touch') this._handleTapFit(e.clientX, e.clientY);
      return;
    }
    if (!this.draft) return;
    var el = document.elementFromPoint(e.clientX, e.clientY);
    var inPort = el && el.closest && el.closest('.port-in');
    if (!inPort && e.pointerType === 'touch') {
      inPort = (function (near) {
        return near ? this.nodes.querySelector('.node[data-id="' + near.nodeId + '"] .port-in[data-port="' + near.portId + '"]') : null;
      }).call(this, this._nearestPort(e.clientX, e.clientY, '.port-in', 30));
    }
    if (inPort) {
      var mod = inPort.closest('.node');
      this.connect(this.draft.from.node, this.draft.from.port, mod.dataset.id, inPort.dataset.port);
      this._cancelDraft();
      return;
    }
    /* 触屏的普通起线要保留 floating draft（先点输出再点输入）；拆下来的线松手即弃。 */
    if (e.pointerType !== 'touch' || this.draft.detached) this._cancelDraft();
  };

  /* 触屏端口命中容差：取离手指最近、且在 maxDist 内的端口。 */
  Board.prototype._nearestPort = function (cx, cy, selector, maxDist) {
    var list = this.nodes.querySelectorAll(selector);
    var best = null, bestDist = maxDist;
    for (var i = 0; i < list.length; i += 1) {
      var el = list[i];
      var r = el.getBoundingClientRect();
      var dx = (r.left + r.width / 2) - cx;
      var dy = (r.top + r.height / 2) - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= bestDist) {
        bestDist = dist;
        var nodeEl = el.closest('.node');
        best = { nodeId: nodeEl.dataset.id, portId: el.dataset.port, el: el, dist: dist };
      }
    }
    return best;
  };

  /* 双击/双点空板：把当前电路（含目标焊盘）重新框进视口。 */
  Board.prototype._handleTapFit = function (cx, cy) {
    var now = Date.now();
    var last = this._lastTap;
    this._lastTap = { t: now, x: cx, y: cy };
    if (!last || now - last.t > 320) return;
    if (Math.sqrt((cx - last.x) * (cx - last.x) + (cy - last.y) * (cy - last.y)) > 24) return;
    this._lastTap = null;
    this.fit({ minScale: 0.35 });
    this.onChange();
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
    this._touches = Object.create(null);
    this._pinch = null;
    this._pendingDetach = null;
    this._setDropTarget(false);
    this.board.classList.remove('is-pinching');
    this._cancelDraft();
    this.board.classList.remove('is-panning');
    if (this._cheapDirty) this._updateWires();
  };

  Board.prototype._cancelDraft = function () {
    this.draft = null;
    this._draftRects = null;
    this.board.classList.remove('is-wiring');
    var d = this.wires.querySelector('.wire-draft');
    if (d) d.remove();
  };

  Board.prototype._startDraft = function (id, port, cx, cy) {
    var a = this._portPoint(id, port);
    if (!a) return;
    var p = this._client(cx, cy);
    this.draft = { from: { node: id, port: port }, x: p.x, y: p.y };
    this._draftRects = this._rects();
    this.board.classList.add('is-wiring');
    this._draftPath(a, p, this._draftRects);
  };

  Board.prototype._draftPath = function (a, b, rects) {
    var d = this.wires.querySelector('.wire-draft');
    if (!d) {
      d = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      d.setAttribute('class', 'wire-draft');
      this.wires.appendChild(d);
    }
    var fromId = this.draft && this.draft.from ? this.draft.from.node : null;
    var group = this.draft && this.draft.from ? (this.draft.from.node + '|' + this.draft.from.port) : '';
    var s = wireStubPoints(a, b);
    var pts = Route.route(s.a, s.b, rects || this._rects(), this._lastUsed || {}, group, { fromId: fromId, toId: null });
    if (s.stub > 0) {
      pts.unshift({ x: a.x, y: a.y });
      pts.push({ x: b.x, y: b.y });
    }
    d.setAttribute('d', Route.pathPoints(pts));
  };

  /* Node rects: width from the shared constants, height measured from the
   * rendered element (text can wrap differently per formula). */
  Board.prototype._nodeRect = function (n, el) {
    var h = el ? el.offsetHeight : estimateNodeHeight(n);
    return { x: n.x, y: n.y, w: nodeWidth(n), h: h, id: n.id };
  };

  Board.prototype._rects = function () {
    var self = this;
    return this.items.map(function (n) { return self._nodeRect(n, self._elById[n.id]); });
  };

  /* Compatibility shim for callers that still route through the board
   * (tests/simple-routing.js). Pure implementation is Route.route. */
  Board.prototype._route = function (a, b, rects, used, fromId, toId, group) {
    return Route.route(a, b, rects, used, group, { fromId: fromId, toId: toId });
  };

  Board.prototype._wireState = function (e) {
    if (!this.result) return 'idle';
    var from = this.result.results[e.from.node];
    if (from && from.state === 'error') return 'error';
    if (from && from.tokens) return 'live';
    return 'idle';
  };

  Board.prototype._wireRole = function (e) {
    var fromNode = this.node(e.from.node);
    if (!fromNode) return 'assertion';
    if (fromNode.kind === 'atom') return 'atom';
    var info = window.RSL.Engine.info(fromNode.kind);
    var p = (info.ports.outputs || []).filter(function (x) { return x.id === e.from.port; })[0];
    return p ? p.type : 'assertion';
  };

  function makePath(ns, d, cls) {
    var path = document.createElementNS(ns, 'path');
    path.setAttribute('d', d);
    if (cls) path.setAttribute('class', cls);
    return path;
  }

  /* Full routing pass: A* for every edge, ordered by span so short wires lay
   * down first. Rebuilds the SVG layer (wire elements are cheap and stable). */
  /* 简单正交折线：重放关的参考电路可能有几百条导线，不需要逐条 A* 避障。 */
  /* 端点很近时缩短出线/入线 stub，避免两个 stub 互相越过、A* 在端口之间来回绕。 */
  function wireStubPoints(a, b) {
    var stub = ROUTE.stub;
    var dx = b.x - a.x;
    if (dx >= 0) {
      stub = Math.min(stub, Math.max(0, dx / 2 - 4));
      if (dx < 16) stub = 0;
    }
    return {
      a: { x: a.x + stub, y: a.y },
      b: { x: b.x - stub, y: b.y },
      stub: stub
    };
  }

  function simpleWirePoints(a, b) {
    var s = wireStubPoints(a, b);
    var x1 = s.a.x, x2 = s.b.x;
    if (x2 < x1) x2 = x1;
    var mx = Math.round((x1 + x2) / 2);
    var pts = [{ x: a.x, y: a.y }];
    if (s.stub > 0) pts.push({ x: x1, y: a.y });
    pts.push({ x: mx, y: a.y }, { x: mx, y: b.y });
    if (s.stub > 0) pts.push({ x: x2, y: b.y });
    pts.push({ x: b.x, y: b.y });
    return pts;
  }

  Board.prototype._updateWires = function (mode, movedIds) {
    if (mode === 'cheap') return this._updateWiresCheap(movedIds);
    var self = this;
    var ns = 'http://www.w3.org/2000/svg';
    this._cheapDirty = false;
    while (this.wires.firstChild) this.wires.removeChild(this.wires.firstChild);
    this._wireEls = Object.create(null);
    var worldRect = this.world.getBoundingClientRect();

    /* 大图：导线用简单正交折线，避免几百条线各跑一次 A*（由 main.js 按图规模开启）。 */
    if (this.simpleWires) {
      var usedSimple = Object.create(null);
      var simpleRoutes = Object.create(null);
      this.edges.forEach(function (e) {
        var a = self._portPoint(e.from.node, e.from.port, worldRect);
        var b = self._portPoint(e.to.node, e.to.port, worldRect);
        if (!a || !b) return;
        simpleRoutes[e.id] = simpleWirePoints(a, b);
      });
      this.edges.forEach(function (e) {
        if (!simpleRoutes[e.id]) return;
        var d = Route.pathPoints(simpleRoutes[e.id]);
        var path = makePath(ns, d, 'wire' + (self.selectedEdge === e.id ? ' is-selected' : '') + (e._new ? ' is-new' : ''));
        path.setAttribute('data-state', self._wireState(e));
        path.setAttribute('data-role', self._wireRole(e));
        self.wires.appendChild(path);
        var hit = makePath(ns, d, 'wire-hit');
        hit.dataset.edge = e.id;
        self.wires.appendChild(hit);
        self._wireEls[e.id] = { path: path, hit: hit };
      });
      this._lastUsed = usedSimple;
      return;
    }

    var rects = this._rects();
    var used = Object.create(null);
    var routes = Object.create(null);
    var worldRect = this.world.getBoundingClientRect();
    var entries = [];
    this.edges.forEach(function (e) {
      var a = self._portPoint(e.from.node, e.from.port, worldRect);
      var b = self._portPoint(e.to.node, e.to.port, worldRect);
      if (!a || !b) return;
      entries.push({ e: e, a: a, b: b, dist: Math.abs(a.x - b.x) + Math.abs(a.y - b.y) });
    });
    entries.sort(function (e1, e2) { return e1.dist - e2.dist; });
    entries.forEach(function (x) {
      var e = x.e;
      var s = wireStubPoints(x.a, x.b);
      var group = e.from.node + '|' + e.from.port;
      var pts = Route.route(s.a, s.b, rects, used, group, { fromId: e.from.node, toId: e.to.node });
      if (s.stub > 0) {
        pts.unshift({ x: x.a.x, y: x.a.y });
        pts.push({ x: x.b.x, y: x.b.y });
      }
      routes[e.id] = pts;
    });
    this.edges.forEach(function (e) {
      if (!routes[e.id]) return;
      var d = Route.pathPoints(routes[e.id]);
      var path = makePath(ns, d, 'wire' + (self.selectedEdge === e.id ? ' is-selected' : '') + (e._new ? ' is-new' : ''));
      path.setAttribute('data-state', self._wireState(e));
      path.setAttribute('data-role', self._wireRole(e));
      self.wires.appendChild(path);
      var hit = makePath(ns, d, 'wire-hit');
      hit.dataset.edge = e.id;
      self.wires.appendChild(hit);
      self._wireEls[e.id] = { path: path, hit: hit };
    });
    this._lastUsed = used;
    if (this.draft) {
      var from = this._portPoint(this.draft.from.node, this.draft.from.port);
      if (from) this._draftPath(from, { x: this.draft.x, y: this.draft.y }, this._draftRects);
    }
  };

  /* Drag-time preview: cheap orthogonal polylines for the wires that touch the
   * moved nodes, patched straight into the existing SVG paths (no A*, no DOM
   * re-creation). pointerup runs render() -> full route again. */
  Board.prototype._updateWiresCheap = function (movedIds) {
    if (!this._lastUsed || !this._wireEls) return this._updateWires();
    var self = this;
    this._cheapDirty = true;
    var moved = null;
    if (movedIds && movedIds.length) {
      moved = Object.create(null);
      movedIds.forEach(function (id) { moved[id] = true; });
    }
    var worldRect = this.world.getBoundingClientRect();
    this.edges.forEach(function (e) {
      if (moved && !(moved[e.from.node] || moved[e.to.node])) return;
      var els = self._wireEls[e.id];
      if (!els) return;
      var a = self._portPoint(e.from.node, e.from.port, worldRect);
      var b = self._portPoint(e.to.node, e.to.port, worldRect);
      if (!a || !b) return;
      var s = wireStubPoints(a, b);
      var pts = Route.simplePoints(s.a.x, s.a.y, s.b.x, s.b.y);
      if (s.stub > 0) {
        pts.unshift({ x: a.x, y: a.y });
        pts.push({ x: b.x, y: b.y });
      }
      var d = Route.pathPoints(pts);
      els.path.setAttribute('d', d);
      els.hit.setAttribute('d', d);
    });
  };

  Board.prototype._portPoint = function (nodeId, portId, worldRect) {
    var nodeEl = this._elById[nodeId] || this.nodes.querySelector('[data-id="' + nodeId + '"]');
    if (!nodeEl) return null;
    var ports = nodeEl._rsl && nodeEl._rsl.ports;
    var p = ports ? ports[portId] : nodeEl.querySelector('.port[data-port="' + portId + '"]');
    if (!p) return null;
    var wr = worldRect || this.world.getBoundingClientRect();
    var pr = p.getBoundingClientRect();
    return { x: (pr.left + pr.width / 2 - wr.left) / this.view.scale, y: (pr.top + pr.height / 2 - wr.top) / this.view.scale };
  };

  Board.prototype._code = function (n) {
    var cfg = n.config || {};
    if (n.kind === 'target') return '⊢';
    if (n.kind === 'atom') return '';
    if (n.kind === 'term') return cfg.name || 'x';
    if (n.kind === 'pred') return cfg.symbol || 'F';
    if (n.kind === 'not') return '¬';
    if (n.kind === 'or') return '∨';
    if (n.kind === 'imp') return '→';
    if (n.kind === 'and') return '∧';
    if (n.kind === 'iff') return '↔';
    if (n.kind === 'mem') return '∈';
    if (n.kind === 'all') return '∀' + (cfg.v || 'x');
    if (n.kind === 'exists') return '∃' + (cfg.v || 'x');
    if (n.kind === 'axiom') return (cfg.schema || 'A1') + (cfg.v ? '·' + cfg.v : '');
    if (n.kind === 'subst') return 'S';
    if (n.kind === 'mp') return 'M';
    if (n.kind === 'gen') return '∀I' + (cfg.v || '');
    if (n.kind === 'shift') return '∀*' + (cfg.v || '');
    if (n.kind === 'all-inst') return '∀E*' + (cfg.v || '');
    if (n.kind === 'exists-gen') return '∃I*' + (cfg.v || '');
    if (n.kind === 'exists-elim') return '∃E';
    if (n.kind === 'leibniz') return '=L';
    if (n.kind === 'eq-refl') return '=I';
    if (n.kind === 'and-intro-ax') return '∧I*';
    if (n.kind === 'and-elim-ax') return '∧E*';
    if (n.kind === 'or-intro-ax') return '∨I*';
    if (n.kind === 'or-elim-ax') return '∨E*';
    if (n.kind === 'iff-intro-ax') return '↔I*';
    if (n.kind === 'iff-elim-ax') return '↔E*';
    if (n.kind === 'set-ext') return 'EXT';
    if (n.kind === 'set-empty') return '∅';
    if (n.kind === 'set-pair') return '{,}';
    if (n.kind === 'set-union') return '∪';
    if (n.kind === 'theorem') return '*' + String(cfg.n || 0).padStart(2, '0');
    return '·';
  };

  /* Single source of truth for the mutable parts of a node marker. render()
   * uses it to build, paint() uses it to update; the two cannot drift. */
  Board.prototype._nodeView = function (n, result) {
    var info = window.RSL.Engine.info(n.kind);
    var inputPorts = (info.ports.inputs || []);
    if (n.kind === 'subst') {
      var extras = substExtras(n.config);
      inputPorts = inputPorts.filter(function (p) { return substPortVisible(p.id, extras); });
    }
    var outputs = info.ports.outputs || [];
    var isAssertion = outputs.some(function (p) { return p.type === 'assertion'; });
    var r = result && result.results[n.id];
    var tokens = n.kind !== 'target' && r && r.tokens ? r.tokens : null;
    var formula = '';
    var plain = '';
    if (tokens) {
      plain = tokens.join(' ');
      /* 公式统一由 RSL.Term 渲染（断言自带 ⊢ 前缀，变量斜体）。 */
      formula = window.RSL.Term
        ? window.RSL.Term.toNodeHTML(tokens, (result && result.vars) || null)
        : tokens.join(' ');
    }
    if (isAssertion && !tokens) formula = '<span class="node-turnstile">⊢</span>';
    var inCount = inputPorts.length;
    return {
      info: info,
      plain: plain,
      code: this._code(n),
      inputPorts: inputPorts,
      outputs: outputs,
      isTarget: n.kind === 'target',
      width: nodeWidth(n),
      minHeight: n.kind === 'target' ? TARGET_MIN_H : Math.max(NODE_MIN_H, PORT_TOP + Math.max(0, inCount - 1) * PORT_STEP + PORT_TAIL),
      formula: formula || '<span class="blank">·</span>'
    };
  };

  Board.prototype._buildNode = function (n, view) {
    var el = document.createElement('article');
    el.className = 'node' + (n.kind === 'target' ? ' is-target' : '') + (n._new ? ' is-new' : '');
    el.dataset.id = n.id;
    el.dataset.kind = n.kind;
    el.style.left = n.x + 'px';
    el.style.top = n.y + 'px';
    el.style.width = view.width + 'px';
    el.style.minHeight = view.minHeight + 'px';
    var ins = view.inputPorts.map(function (p, i) {
      var role = (n.kind === 'subst' && /^atom/.test(p.id)) ? 'atom' : p.type;
      return '<button class="port port-in" data-port="' + esc(p.id) + '" data-role="' + esc(role) + '" style="top:' + portTop(n, i) + 'px" title="' + esc(p.label) + '" aria-label="' + esc(p.label) + '"></button>';
    }).join('');
    var outs = view.outputs.map(function (p) {
      var role = n.kind === 'atom' ? 'atom' : p.type;
      return '<button class="port port-out" data-port="' + esc(p.id) + '" data-role="' + esc(role) + '" style="top:' + PORT_TOP + 'px" title="' + esc(p.label) + '" aria-label="' + esc(p.label) + '"></button>';
    }).join('');
    if (view.isTarget) {
      el.innerHTML = '<div class="target-mark">⊢</div>' + ins;
    } else {
      el.innerHTML =
        '<div class="node-top"><span class="node-code"></span></div>' +
        '<div class="node-formula formula"></div>' + ins + outs;
    }
    var portMap = Object.create(null);
    var portEls = el.querySelectorAll('.port');
    for (var i = 0; i < portEls.length; i++) portMap[portEls[i].dataset.port] = portEls[i];
    el._rsl = {
      code: el.querySelector('.node-code'),
      formula: el.querySelector('.node-formula'),
      ports: portMap
    };
    return el;
  };

  Board.prototype._applyNode = function (el, n, result, selectedMap, view) {
    var v = view || this._nodeView(n, result);
    var r = result && result.results[n.id];
    el.dataset.state = r ? r.state : 'idle';
    el.dataset.selected = selectedMap[n.id] ? 'true' : 'false';
    el.setAttribute('aria-label', v.code);
    if (v.plain) el.title = v.plain;
    else el.removeAttribute('title');
    var refs = el._rsl;
    if (refs) {
      if (refs.code) refs.code.textContent = v.code;
      if (refs.formula) refs.formula.innerHTML = v.formula;
    }
  };

  function selectionMap(ids) {
    var map = Object.create(null);
    (ids || []).forEach(function (id) { map[id] = true; });
    return map;
  }

  Board.prototype.render = function () {
    var self = this;
    this.nodes.innerHTML = '';
    this._elById = Object.create(null);
    var result = this.result;
    var selectedMap = selectionMap(this.selectedNodes);
    this.items.forEach(function (n) {
      var view = self._nodeView(n, result);
      var el = self._buildNode(n, view);
      self._applyNode(el, n, result, selectedMap, view);
      self._elById[n.id] = el;
      self.nodes.appendChild(el);
    });
    this._updateWires();
  };

  Board.prototype.paint = function (result) {
    this.result = result;
    var self = this;
    var selectedMap = selectionMap(this.selectedNodes);
    this.items.forEach(function (n) {
      var el = self._elById[n.id] || self.nodes.querySelector('[data-id="' + n.id + '"]');
      if (!el) return;
      self._elById[n.id] = el;
      self._applyNode(el, n, result, selectedMap);
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
    this.selectedNodes = [];
    this.selectedEdge = edge.id;
    this.render();
    setTimeout(function () { delete edge._new; }, 380);
    this.onChange();
    this.onSelect(null, edge.id);
    this.onConnect();
    return true;
  };

  Board.prototype._overlaps = function (n, x, y, skipIds) {
    var own = this._nodeRect(n, this._elById[n.id]);
    var w = own.w, h = own.h;
    for (var i = 0; i < this.items.length; i++) {
      var m = this.items[i];
      if (m.id === n.id) continue;
      if (skipIds && skipIds.indexOf(m.id) >= 0) continue;
      var r = this._nodeRect(m, this._elById[m.id]);
      if (x < r.x + r.w + OVERLAP_GAP && x + w + OVERLAP_GAP > r.x && y < r.y + r.h + OVERLAP_GAP && y + h + OVERLAP_GAP > r.y) return true;
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
          var x = snap(n.x + ox * PORT_STEP), y = snap(n.y + oy * PORT_STEP);
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
    /* 渲染后拿到真实高度，再确认一次不压到邻居（高 S 元件尤其重要）。 */
    if (this._overlaps(n, n.x, n.y)) {
      this._resolvePosition(n);
      this.render();
    }
    this.onChange();
    return n;
  };

  Board.prototype.removeNode = function (id) {
    var n = this.node(id);
    if (!n || n.kind === 'target') return;
    this.items = this.items.filter(function (x) { return x.id !== id; });
    this.edges = this.edges.filter(function (e) { return e.from.node !== id && e.to.node !== id; });
    this.selectedNode = null;
    this.selectedNodes = [];
    this.render();
    this.onChange();
    this.onSelect(null, null);
    this.onRemove('node');
  };

  Board.prototype.removeEdge = function (id) {
    this.edges = this.edges.filter(function (e) { return e.id !== id; });
    this.selectedEdge = null;
    this.selectedNode = null;
    this.selectedNodes = [];
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

  /* 减少 S 元件的代入组：把已连接到被隐藏组端口的导线一并移除。 */
  Board.prototype.pruneSubstPorts = function (id, groups) {
    var keep = 1 + Math.max(0, Math.min(4, groups));
    this.edges = this.edges.filter(function (e) {
      if (!e.to || e.to.node !== id) return true;
      var m = /^(atom|formula)(\d+)$/.exec(e.to.port);
      if (!m) return true;
      return Number(m[2]) <= keep;
    });
  };

  Board.prototype.updateConfig = function (id, patch) {
    var n = this.node(id);
    if (!n) return;
    n.config = Object.assign({}, n.config, patch);
    this.render();
    if (this._overlaps(n, n.x, n.y)) {
      this._resolvePosition(n);
      this.render();
    }
    this.onChange();
  };

  window.RSL.Board = Board;
})();
