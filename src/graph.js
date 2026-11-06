/* 公理板 — PCB graph canvas: nodes, ports, copper wires, pan/zoom/undo. */
(function () {
  'use strict';
  window.RSL = window.RSL || {};
  var L = null;
  function logic() { return L || (L = window.RSL.Logic); }
  var NODE_W = 270;

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function uid(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 8); }
  function snap(v) { return Math.round(v / 8) * 8; }

  function Board(opts) {
    this.board = opts.board;
    this.world = opts.world;
    this.wireLayer = opts.wireLayer;
    this.nodeLayer = opts.nodeLayer;
    this.onChange = opts.onChange || function () {};
    this.onSelect = opts.onSelect || function () {};
    this.onToast = opts.onToast || function () {};
    this.nodes = [];
    this.edges = [];
    this.view = { x: 40, y: 40, scale: 1 };
    this.selectedNode = null;
    this.selectedEdge = null;
    this.draft = null;
    this.result = null;
    this.history = [];
    this.future = [];
    this._drag = null;
    this._pan = null;
    this._bind();
    this._applyView();
    this._onResize = this._resize.bind(this);
    window.addEventListener('resize', this._onResize);
  }

  Board.prototype._bind = function () {
    var self = this;
    this.board.addEventListener('pointerdown', function (e) { self._down(e); });
    this.board.addEventListener('wheel', function (e) { self._wheel(e); }, { passive: false });
    this.board.addEventListener('pointermove', function (e) { self._move(e); });
    this.board.addEventListener('pointerup', function (e) { self._up(e); });
    this.board.addEventListener('pointercancel', function (e) { self._cancel(e); });
    this.board.addEventListener('dblclick', function (e) {
      var mod = e.target.closest && e.target.closest('.module');
      if (mod) self.fit(mod.dataset.node);
    });
    this.board.addEventListener('click', function (e) {
      var port = e.target.closest && e.target.closest('.port');
      if (port) {
        var mod = port.closest('.module');
        if (port.classList.contains('port-out')) {
          if (!self.draft) self._startDraft(mod.dataset.node, port.dataset.port, e.clientX, e.clientY);
        } else if (port.classList.contains('port-in') && self.draft) {
          self.connect(self.draft.from.node, self.draft.from.port, mod.dataset.node, port.dataset.port);
          self._cancelDraft();
        }
        return;
      }
      var onBoard = e.target === self.board || e.target === self.world || (e.target.closest && e.target.closest('.board-fiducials'));
      if (onBoard && self.draft) self._cancelDraft();
    });
    this.wireLayer.addEventListener('click', function (e) {
      var hit = e.target.closest && e.target.closest('.wire-hit');
      if (!hit) return;
      self.selectedEdge = hit.dataset.edge;
      self.selectedNode = null;
      self.render();
      self.onSelect(null, self.selectedEdge);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && self.draft) self._cancelDraft();
    });
    this.board.addEventListener('contextmenu', function (e) {
      if (e.target.closest && e.target.closest('.module')) e.preventDefault();
    });
  };

  Board.prototype.setData = function (nodes, edges) {
    this.nodes = clone(nodes || []);
    this.edges = clone(edges || []);
    this.selectedNode = null;
    this.selectedEdge = null;
    this.draft = null;
    this.history = [];
    this.future = [];
    this.render();
  };

  Board.prototype.getData = function () {
    return { nodes: clone(this.nodes), edges: clone(this.edges) };
  };

  Board.prototype._applyView = function () {
    this.world.style.transform = 'translate(' + this.view.x + 'px,' + this.view.y + 'px) scale(' + this.view.scale + ')';
    this.board.style.setProperty('--zoom', String(this.view.scale));
    if (this.onView) this.onView(this.view);
  };

  Board.prototype.zoom = function (delta, cx, cy) {
    var rect = this.board.getBoundingClientRect();
    var px = (cx == null ? rect.width / 2 : cx - rect.left);
    var py = (cy == null ? rect.height / 2 : cy - rect.top);
    var old = this.view.scale;
    var next = clamp(old * Math.pow(1.12, delta), 0.42, 1.7);
    if (Math.abs(next - old) < 0.001) return;
    var wx = (px - this.view.x) / old;
    var wy = (py - this.view.y) / old;
    this.view.scale = next;
    this.view.x = px - wx * next;
    this.view.y = py - wy * next;
    this._applyView();
  };

  Board.prototype.zoomTo = function (scale) {
    var rect = this.board.getBoundingClientRect();
    this.zoom(Math.log(scale / this.view.scale) / Math.log(1.12), rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  Board.prototype.setView = function (x, y, scale) {
    this.view.x = x;
    this.view.y = y;
    this.view.scale = clamp(scale, 0.42, 1.7);
    this._applyView();
    this._updateWires();
  };

  Board.prototype.fit = function (onlyId) {
    var els = this.nodeLayer.querySelectorAll('.module');
    var rect = this.board.getBoundingClientRect();
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    els.forEach(function (el) {
      var n = this.nodes.filter(function (x) { return x.id === el.dataset.node; })[0];
      if (!n) return;
      if (onlyId && n.id !== onlyId) return;
      var h = el.offsetHeight || 160;
      minX = Math.min(minX, n.x); minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + NODE_W); maxY = Math.max(maxY, n.y + h);
    }, this);
    if (!isFinite(minX)) { this.view = { x: 40, y: 40, scale: 1 }; this._applyView(); return; }
    var pad = onlyId ? 110 : 64;
    var availW = Math.max(320, rect.width - pad * 2);
    var availH = Math.max(260, rect.height - pad * 2);
    var scale = clamp(Math.min(availW / (maxX - minX), availH / (maxY - minY)), 0.42, 1.25);
    this.view.scale = scale;
    this.view.x = (rect.width - (maxX - minX) * scale) / 2 - minX * scale;
    this.view.y = (rect.height - (maxY - minY) * scale) / 2 - minY * scale;
    this._applyView();
  };

  Board.prototype._wheel = function (e) {
    e.preventDefault();
    this.zoom(e.deltaY > 0 ? -1 : 1, e.clientX, e.clientY);
  };

  Board.prototype._hitModule = function (target) {
    var el = target.closest && target.closest('.module');
    if (!el || !this.nodeLayer.contains(el)) return null;
    return this.nodes.filter(function (n) { return n.id === el.dataset.node; })[0] || null;
  };

  Board.prototype._down = function (e) {
    var port = e.target.closest && e.target.closest('.port');
    if (port) {
      e.preventDefault();
      e.stopPropagation();
      if (port.classList.contains('port-out')) {
        var mod = port.closest('.module');
        this._startDraft(mod.dataset.node, port.dataset.port, e.clientX, e.clientY);
      } else if (port.classList.contains('port-in') && this.draft) {
        var inMod = port.closest('.module');
        this.connect(this.draft.from.node, this.draft.from.port, inMod.dataset.node, port.dataset.port);
        this._cancelDraft();
      }
      return;
    }
    var modEl = e.target.closest && e.target.closest('.module');
    if (modEl) {
      e.preventDefault();
      var node = this.nodes.filter(function (n) { return n.id === modEl.dataset.node; })[0];
      if (!node) return;
      this.select(node.id);
      if (node.kind === 'target') return;
      this._pushHistory();
      var pt = this._clientToWorld(e.clientX, e.clientY);
      this._drag = { id: node.id, dx: pt.x - node.x, dy: pt.y - node.y, moved: false, startX: e.clientX, startY: e.clientY };
      this.board.setPointerCapture && this.board.setPointerCapture(e.pointerId);
      return;
    }
    // empty board: cancel a pending tap-wire, otherwise pan
    if (this.draft) { this._cancelDraft(); return; }
    if (e.button === 0 || e.button === 1 || e.pointerType === 'touch') {
      this._pan = { x: this.view.x, y: this.view.y, startX: e.clientX, startY: e.clientY };
      this.board.classList.add('is-panning');
      this.board.setPointerCapture && this.board.setPointerCapture(e.pointerId);
    }
  };

  Board.prototype._move = function (e) {
    if (this._drag) {
      var node = this.nodes.filter(function (n) { return n.id === this._drag.id; }, this)[0];
      if (!node) return;
      var pt = this._clientToWorld(e.clientX, e.clientY);
      var nx = snap(pt.x - this._drag.dx);
      var ny = snap(pt.y - this._drag.dy);
      if (Math.abs(e.clientX - this._drag.startX) + Math.abs(e.clientY - this._drag.startY) > 2) this._drag.moved = true;
      node.x = clamp(nx, -400, 3200);
      node.y = clamp(ny, -300, 2400);
      var el = this.nodeLayer.querySelector('[data-node="' + node.id + '"]');
      if (el) { el.style.left = node.x + 'px'; el.style.top = node.y + 'px'; }
      this._updateWires();
      return;
    }
    if (this._pan) {
      this.view.x = this._pan.x + (e.clientX - this._pan.startX);
      this.view.y = this._pan.y + (e.clientY - this._pan.startY);
      this._applyView();
      return;
    }
    if (this.draft) {
      var p = this._clientToWorld(e.clientX, e.clientY);
      this.draft.x = p.x; this.draft.y = p.y;
      var from = this._portPoint(this.draft.from.node, this.draft.from.port);
      if (from) this._drawDraft(from, p);
    }
  };

  Board.prototype._up = function (e) {
    if (this._drag) {
      var moved = this._drag.moved;
      this._drag = null;
      if (moved) this.onChange();
      return;
    }
    if (this._pan) {
      this._pan = null;
      this.board.classList.remove('is-panning');
      return;
    }
    if (this.draft) {
      var el = document.elementFromPoint(e.clientX, e.clientY);
      var inPort = el && el.closest && el.closest('.port-in');
      if (inPort) {
        var mod = inPort.closest('.module');
        if (mod) {
          this.connect(this.draft.from.node, this.draft.from.port, mod.dataset.node, inPort.dataset.port);
          this._cancelDraft();
          return;
        }
      }
      // A tap on an output leaves a live wire; tap an input pad to finish.
      // A mouse drag that ends in empty space cancels.
      if (e.pointerType !== 'touch') this._cancelDraft();
    }
  };

  Board.prototype._cancel = function () {
    this._drag = null;
    this._pan = null;
    this._cancelDraft();
    this.board.classList.remove('is-panning');
  };

  Board.prototype._cancelDraft = function () {
    this.draft = null;
    this.board.classList.remove('is-wiring');
    var d = this.wireLayer.querySelector('.wire-draft');
    if (d) d.remove();
  };

  Board.prototype._startDraft = function (nodeId, portId, clientX, clientY) {
    var from = this._portPoint(nodeId, portId);
    if (!from) return;
    var p = this._clientToWorld(clientX, clientY);
    this.draft = { from: { node: nodeId, port: portId }, x: p.x, y: p.y };
    this.board.classList.add('is-wiring');
    this._drawDraft(from, p);
  };

  Board.prototype._drawDraft = function (from, to) {
    var d = this.wireLayer.querySelector('.wire-draft');
    if (!d) {
      d = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      d.setAttribute('class', 'wire-draft');
      this.wireLayer.appendChild(d);
    }
    d.setAttribute('d', this._path(from.x, from.y, to.x, to.y));
  };

  Board.prototype._clientToWorld = function (cx, cy) {
    var r = this.board.getBoundingClientRect();
    return { x: (cx - r.left - this.view.x) / this.view.scale, y: (cy - r.top - this.view.y) / this.view.scale };
  };

  Board.prototype._pushHistory = function () {
    this.history.push(clone({ nodes: this.nodes, edges: this.edges, selectedNode: this.selectedNode, selectedEdge: this.selectedEdge }));
    if (this.history.length > 60) this.history.shift();
    this.future = [];
    this._emitHistory();
  };

  Board.prototype._emitHistory = function () {
    if (this.onHistory) this.onHistory({ undo: this.history.length, redo: this.future.length });
  };

  Board.prototype.undo = function () {
    if (!this.history.length) return false;
    this.future.push(clone({ nodes: this.nodes, edges: this.edges, selectedNode: this.selectedNode, selectedEdge: this.selectedEdge }));
    var s = this.history.pop();
    this.nodes = s.nodes; this.edges = s.edges; this.selectedNode = s.selectedNode; this.selectedEdge = s.selectedEdge;
    this.render(); this.onChange(); this._emitHistory(); return true;
  };

  Board.prototype.redo = function () {
    if (!this.future.length) return false;
    this.history.push(clone({ nodes: this.nodes, edges: this.edges, selectedNode: this.selectedNode, selectedEdge: this.selectedEdge }));
    var s = this.future.pop();
    this.nodes = s.nodes; this.edges = s.edges; this.selectedNode = s.selectedNode; this.selectedEdge = s.selectedEdge;
    this.render(); this.onChange(); this._emitHistory(); return true;
  };

  Board.prototype.canUndo = function () { return this.history.length > 0; };
  Board.prototype.canRedo = function () { return this.future.length > 0; };

  Board.prototype.addNode = function (kind, config, pos) {
    var info = window.RSL.Engine.info(kind);
    if (!info) return null;
    this._pushHistory();
    var n = {
      id: uid('n'), kind: kind, x: 0, y: 0,
      config: Object.assign({}, info.config || {}, config || {})
    };
    if (pos) { n.x = snap(pos.x); n.y = snap(pos.y); }
    else {
      var center = this._clientToWorld(this.board.getBoundingClientRect().left + this.board.clientWidth / 2, this.board.getBoundingClientRect().top + this.board.clientHeight / 2);
      var jitter = (this.nodes.length % 4) * 26;
      n.x = snap(center.x - NODE_W / 2 + jitter);
      n.y = snap(center.y - 70 + jitter);
    }
    this.nodes.push(n);
    this.selectedNode = n.id; this.selectedEdge = null;
    this.render();
    this.onChange();
    this._emitHistory();
    return n;
  };

  Board.prototype.duplicateNode = function (id) {
    var orig = this.node(id);
    if (!orig || orig.kind === 'target') return null;
    this._pushHistory();
    var n = clone(orig);
    n.id = uid('n'); n.x += 28; n.y += 28;
    this.nodes.push(n);
    this.selectedNode = n.id;
    this.render(); this.onChange(); this._emitHistory();
    return n;
  };

  Board.prototype.removeNode = function (id) {
    var node = this.node(id);
    if (!node || node.kind === 'target') return false;
    this._pushHistory();
    this.nodes = this.nodes.filter(function (n) { return n.id !== id; });
    this.edges = this.edges.filter(function (e) { return e.from.node !== id && e.to.node !== id; });
    if (this.selectedNode === id) this.selectedNode = null;
    this.render(); this.onChange(); this._emitHistory();
    return true;
  };

  Board.prototype.node = function (id) {
    return this.nodes.filter(function (n) { return n.id === id; })[0] || null;
  };

  Board.prototype.updateConfig = function (id, patch, rerender) {
    var node = this.node(id);
    if (!node) return;
    this._pushHistory();
    node.config = Object.assign({}, node.config || {}, patch);
    if (rerender) this.render();
    this.onChange();
  };

  Board.prototype.select = function (id) {
    this.selectedNode = id;
    this.selectedEdge = null;
    this.render();
    this.onSelect(id, null);
  };

  Board.prototype.connect = function (fromNode, fromPort, toNode, toPort) {
    if (fromNode === toNode) { this.onToast('不能把模块接到自己身上'); return false; }
    var from = this.nodes.filter(function (n) { return n.id === fromNode; })[0];
    var to = this.nodes.filter(function (n) { return n.id === toNode; })[0];
    if (!from || !to) return false;
    var fromInfo = window.RSL.Engine.info(from.kind);
    var toInfo = window.RSL.Engine.info(to.kind);
    var op = (fromInfo.ports.outputs || []).filter(function (p) { return p.id === fromPort; })[0];
    var ip = (toInfo.ports.inputs || []).filter(function (p) { return p.id === toPort; })[0];
    if (!op || !ip) return false;
    if (op.type !== ip.type) { this.onToast('焊盘类型不匹配：' + op.type + ' → ' + ip.type); return false; }
    var existing = this.edges.filter(function (e) { return e.to.node === toNode && e.to.port === toPort; })[0];
    if (existing && existing.from.node === fromNode && existing.from.port === fromPort) return false;
    this._pushHistory();
    if (existing) this.edges = this.edges.filter(function (e) { return e !== existing; });
    var edge = { id: uid('e'), from: { node: fromNode, port: fromPort }, to: { node: toNode, port: toPort } };
    this.edges.push(edge);
    // Reject cycles.
    var topo = window.RSL.Engine.topo(this.nodes, this.edges);
    if (topo.cycle.length) {
      this.edges.pop();
      if (existing) this.edges.push(existing);
      this.onToast('检测到回路，连接取消');
      this._emitHistory();
      return false;
    }
    this.selectedEdge = edge.id; this.selectedNode = null;
    this.render(); this.onChange(); this._emitHistory();
    return true;
  };

  Board.prototype.removeEdge = function (id) {
    var edge = this.edges.filter(function (e) { return e.id === id; })[0];
    if (!edge) return false;
    this._pushHistory();
    this.edges = this.edges.filter(function (e) { return e.id !== id; });
    if (this.selectedEdge === id) this.selectedEdge = null;
    this.render(); this.onChange(); this._emitHistory();
    return true;
  };

  Board.prototype.clearEdges = function () {
    if (!this.edges.length) return;
    this._pushHistory();
    this.edges = [];
    this.render(); this.onChange(); this._emitHistory();
  };

  Board.prototype.removeSelected = function () {
    if (this.selectedEdge) return this.removeEdge(this.selectedEdge);
    if (this.selectedNode) return this.removeNode(this.selectedNode);
    return false;
  };

  Board.prototype._portPoint = function (nodeId, portId) {
    var el = this.nodeLayer.querySelector('[data-node="' + nodeId + '"]');
    if (!el) return null;
    var p = el.querySelector('.port[data-port="' + portId + '"]');
    if (!p) return null;
    var wr = this.world.getBoundingClientRect();
    var pr = p.getBoundingClientRect();
    var s = this.view.scale;
    return { x: (pr.left + pr.width / 2 - wr.left) / s, y: (pr.top + pr.height / 2 - wr.top) / s };
  };

  Board.prototype._path = function (x1, y1, x2, y2) {
    var dx = x2 - x1, dy = y2 - y1;
    if (Math.abs(dy) < 2) return 'M' + x1 + ' ' + y1 + 'H' + x2;
    if (dx > 70) {
      var mx = x1 + dx * 0.5;
      var d = Math.min(14, Math.abs(dy) / 2);
      var sy = dy > 0 ? 1 : -1;
      return 'M' + x1 + ' ' + y1 + 'H' + (mx - d) + 'L' + mx + ' ' + (y1 + sy * d) + 'V' + (y2 - sy * d) + 'L' + (mx + d) + ' ' + y2 + 'H' + x2;
    }
    // backward / tight route
    var loop = 26;
    var my = y1 + dy * 0.5;
    return 'M' + x1 + ' ' + y1 + 'H' + (x1 + loop) + 'V' + (my - 12) + 'L' + (x1 + loop + 12) + ' ' + my + 'H' + (x2 - loop - 12) + 'L' + (x2 - loop) + ' ' + (my + 12) + 'V' + y2 + 'H' + x2;
  };

  Board.prototype._updateWires = function () {
    var self = this;
    var ns = 'http://www.w3.org/2000/svg';
    while (this.wireLayer.firstChild) this.wireLayer.removeChild(this.wireLayer.firstChild);
    this.edges.forEach(function (e) {
      var a = self._portPoint(e.from.node, e.from.port);
      var b = self._portPoint(e.to.node, e.to.port);
      if (!a || !b) return;
      var d = self._path(a.x, a.y, b.x, b.y);
      var state = 'idle';
      if (self.result) {
        var fromR = self.result.results[e.from.node];
        var toR = self.result.results[e.to.node];
        if (fromR && fromR.state === 'error') state = 'error';
        else if (fromR && fromR.ast) state = 'valid';
        if (toR && toR.state === 'error' && toR.error && /不一致|回路/.test(toR.error)) state = 'error';
      }
      var path = document.createElementNS(ns, 'path');
      path.setAttribute('d', d);
      path.setAttribute('data-state', state);
      path.setAttribute('class', 'wire' + (state === 'error' ? ' is-error' : state === 'valid' ? ' is-live' : '') + (self.selectedEdge === e.id ? ' is-selected' : ''));
      path.dataset.edge = e.id;
      self.wireLayer.appendChild(path);
      var hit = document.createElementNS(ns, 'path');
      hit.setAttribute('d', d);
      hit.setAttribute('class', 'wire-hit');
      hit.dataset.edge = e.id;
      self.wireLayer.appendChild(hit);
      // small solder bead at source
      var bead = document.createElementNS(ns, 'circle');
      bead.setAttribute('cx', a.x); bead.setAttribute('cy', a.y); bead.setAttribute('r', 2.6);
      bead.setAttribute('class', 'wire-bead');
      self.wireLayer.appendChild(bead);
    });
    if (this.draft) {
      var from = this._portPoint(this.draft.from.node, this.draft.from.port);
      if (from) this._drawDraft(from, { x: this.draft.x, y: this.draft.y });
    }
  };

  Board.prototype.render = function () {
    var self = this;
    var Lg = logic();
    this.nodeLayer.innerHTML = '';
    this.nodes.forEach(function (node) {
      var info = window.RSL.Engine.info(node.kind);
      var el = document.createElement('article');
      el.className = 'module module-' + node.kind;
      el.dataset.node = node.id;
      el.dataset.kind = node.kind;
      el.style.left = node.x + 'px';
      el.style.top = node.y + 'px';
      el.style.width = NODE_W + 'px';
      el.dataset.selected = self.selectedNode === node.id ? 'true' : 'false';
      el.tabIndex = 0;
      el.setAttribute('aria-label', self._nodeTitle(node) + '，按回车选择');
      var r = self.result && self.result.results[node.id];
      el.dataset.state = r ? r.state : 'idle';
      var title = self._nodeTitle(node);
      var subtitle = self._nodeSubtitle(node);
      var formula = '';
      var targetAst = null;
      if (node.kind === 'target') {
        try { targetAst = Lg ? Lg.parse(node.target || 'P') : null; } catch (e) { targetAst = null; }
        formula = targetAst && Lg ? (window.RSL.formatFormula ? window.RSL.formatFormula(targetAst) : Lg.toHTML(targetAst)) : esc(node.target || '');
      } else if (r && r.ast) {
        formula = window.RSL.formatFormula ? window.RSL.formatFormula(r.ast) : Lg.toHTML(r.ast);
      } else {
        formula = '<span class="formula-placeholder">' + esc(r && r.note ? r.note : '等待输入') + '</span>';
      }
      var statusText = r ? (r.state === 'valid' ? 'PASS' : r.state === 'error' ? 'ERR' : r.state === 'complete' ? 'DONE' : 'OPEN') : '—';
      var code = self._nodeCode(node);
      var inRows = (info.ports.inputs || []).map(function (p) {
        return '<div class="port-row port-row-in">' +
          '<button class="port port-in" data-port="' + esc(p.id) + '" aria-label="输入：' + esc(p.label) + '" title="' + esc(p.label) + '"></button>' +
          '<span class="port-label">' + esc(p.label) + '</span></div>';
      }).join('');
      var outRows = (info.ports.outputs || []).map(function (p) {
        return '<div class="port-row port-row-out">' +
          '<span class="port-label">' + esc(p.label) + '</span>' +
          '<button class="port port-out" data-port="' + esc(p.id) + '" aria-label="输出：' + esc(p.label) + '" title="' + esc(p.label) + '"></button></div>';
      }).join('');
      var body = '' +
        '<div class="module-body">' +
          '<header class="module-head">' +
            '<span class="module-ref">' + esc(code) + '</span>' +
            '<span class="module-kind">' + esc(info.kindLabel || node.kind) + '</span>' +
            '<span class="module-status">' + statusText + '</span>' +
          '</header>' +
          '<div class="module-title">' + esc(title) + '</div>' +
          (subtitle ? '<div class="module-sub">' + esc(subtitle) + '</div>' : '') +
          '<div class="module-formula"><span class="formula">' + formula + '</span></div>' +
          '<div class="module-ports">' + inRows + outRows + '</div>' +
          (node.kind === 'replace' ? '<div class="module-hint">双击模块可聚焦 · 在右侧检查器选择置换</div>' : '') +
        '</div>';
      el.innerHTML = body;
      el.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          self.select(node.id);
        }
      });
      self.nodeLayer.appendChild(el);
    });
    this._updateWires();
  };

  Board.prototype._nodeTitle = function (node) {
    var E = window.RSL.Engine;
    if (node.kind === 'target') return '目标焊盘';
    if (node.kind === 'axiom' || node.kind === 'pred-axiom') {
      var a = E.getAxiom(node.config.axiomId);
      return a ? '公理 ' + a.id + ' · ' + a.name : '原始命题';
    }
    if (node.kind === 'theorem') {
      var t = window.RSL.theoremData ? window.RSL.theoremData(node.config.theoremCode) : null;
      if (!t) t = E.getPredicateTheorem(node.config.theoremCode);
      return t ? '定理 ' + t.code + (t.name ? ' · ' + t.name : '') : '档案定理';
    }
    var info = E.info(node.kind);
    return info.label;
  };

  Board.prototype._nodeSubtitle = function (node) {
    if (node.kind === 'axiom') {
      var a = window.RSL.Engine.getAxiom(node.config.axiomId);
      return a ? a.code + ' / ' + (a.en || 'AXIOM') : '';
    }
    if (node.kind === 'theorem') {
      var t = window.RSL.theoremData ? window.RSL.theoremData(node.config.theoremCode) : null;
      return t ? (t.steps ? 'Metamath · ' + t.steps + ' steps' : 'PM archive') : '';
    }
    if (node.kind === 'target') return 'FINAL PAD / 断言必须完全一致';
    if (node.kind === 'subst') return 'π := B';
    if (node.kind === 'detach') return 'A + A→B ⇒ B';
    if (node.kind === 'replace') return 'D1 / D2 / D3';
    return '';
  };

  Board.prototype._nodeCode = function (node) {
    var index = this.nodes.indexOf(node) + 1;
    if (node.kind === 'target') return 'J01';
    if (node.kind === 'axiom') return 'A' + (node.config.axiomId || '').replace('A', '');
    if (node.kind === 'theorem') return (node.config.theoremCode || 'T').replace('*', 'T');
    return 'U' + String(index).padStart(2, '0');
  };

  Board.prototype.paint = function (result) {
    this.result = result;
    var Lg = logic();
    var self = this;
    this.nodeLayer.querySelectorAll('.module').forEach(function (el) {
      var id = el.dataset.node;
      var node = self.node(id);
      if (!node) return;
      var r = result && result.results[id];
      el.dataset.state = r ? r.state : 'idle';
      el.dataset.selected = self.selectedNode === id ? 'true' : 'false';
      var status = el.querySelector('.module-status');
      if (status) status.textContent = r ? (r.state === 'valid' ? 'PASS' : r.state === 'error' ? 'ERR' : r.state === 'complete' ? 'DONE' : 'OPEN') : '—';
      var f = el.querySelector('.module-formula');
      if (f) {
        var ast = null;
        if (node.kind === 'target') { try { ast = Lg.parse(node.target || 'P'); } catch (e) { ast = null; } }
        else if (r && r.ast) ast = r.ast;
        if (ast) f.innerHTML = '<span class="formula">' + (window.RSL.formatFormula ? window.RSL.formatFormula(ast) : Lg.toHTML(ast)) + '</span>';
        else f.innerHTML = '<span class="formula-placeholder">' + esc(r && r.note ? r.note : '等待输入') + '</span>';
      }
      var sub = el.querySelector('.module-sub');
      if (sub && node.kind === 'replace' && r && r.meta && r.meta.chosen) sub.textContent = r.meta.chosen.def + ' · ' + (r.meta.chosen.dir === 'expand' ? '展开' : '折叠');
    });
    this._updateWires();
  };

  Board.prototype.autoLayout = function () {
    if (this.nodes.length < 2) return;
    this._pushHistory();
    var indeg = {}, out = {};
    this.nodes.forEach(function (n) { indeg[n.id] = 0; out[n.id] = []; });
    this.edges.forEach(function (e) { indeg[e.to.node] = (indeg[e.to.node] || 0) + 1; (out[e.from.node] = out[e.from.node] || []).push(e.to.node); });
    var layer = {};
    var queue = this.nodes.filter(function (n) { return !indeg[n.id]; }).map(function (n) { return n.id; });
    queue.forEach(function (id) { layer[id] = 0; });
    var guard = 0;
    while (queue.length && guard++ < 500) {
      var id = queue.shift();
      (out[id] || []).forEach(function (next) {
        layer[next] = Math.max(layer[next] || 0, layer[id] + 1);
        indeg[next]--;
        if (indeg[next] === 0) queue.push(next);
      });
    }
    var cols = {};
    this.nodes.forEach(function (n) {
      var l = layer[n.id] == null ? 0 : layer[n.id];
      (cols[l] = cols[l] || []).push(n);
    });
    Object.keys(cols).forEach(function (l, li) {
      cols[l].forEach(function (n, i) {
        n.x = 60 + li * 310;
        n.y = 60 + i * 230;
      });
    });
    this.render();
    this.fit();
    this.onChange();
    this._emitHistory();
  };

  Board.prototype._resize = function () { this._updateWires(); };

  window.RSL.Board = Board;
  window.RSL.NODE_W = NODE_W;
})();

