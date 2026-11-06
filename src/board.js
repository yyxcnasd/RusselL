/* 公理板 — minimal graph board. */
(function () {
  'use strict';
  window.RSL = window.RSL || {};
  var W = 232;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function uid(p) { return p + Math.random().toString(36).slice(2, 8); }
  function snap(v) { return Math.round(v / 8) * 8; }

  function Board(opts) {
    this.board = opts.board;
    this.world = opts.world;
    this.wires = opts.wires;
    this.nodes = opts.nodes;
    this.onChange = opts.onChange || function () {};
    this.onSelect = opts.onSelect || function () {};
    this.onToast = opts.onToast || function () {};
    this.items = [];
    this.edges = [];
    this.view = { x: 30, y: 30, scale: 0.85 };
    this.selectedNode = null;
    this.selectedEdge = null;
    this.draft = null;
    this.result = null;
    this._drag = null;
    this._pan = null;
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
    this.items = clone(nodes || []);
    this.edges = clone(edges || []);
    this.selectedNode = null;
    this.selectedEdge = null;
    this.draft = null;
    this.render();
  };

  Board.prototype.getData = function () { return { nodes: clone(this.items), edges: clone(this.edges) }; };
  Board.prototype.node = function (id) { return this.items.filter(function (n) { return n.id === id; })[0] || null; };

  Board.prototype.setView = function (x, y, scale) {
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
    this.view.scale = next;
    this.view.x = px - wx * next;
    this.view.y = py - wy * next;
    this._applyView();
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
    var nodeEl = e.target.closest && e.target.closest('.node');
    if (nodeEl) {
      e.preventDefault();
      var node = this.node(nodeEl.dataset.id);
      if (!node) return;
      this.select(node.id);
      if (node.kind === 'target') return;
      var p = this._client(e.clientX, e.clientY);
      this._drag = { id: node.id, dx: p.x - node.x, dy: p.y - node.y, moved: false, sx: e.clientX, sy: e.clientY };
      this.board.setPointerCapture && this.board.setPointerCapture(e.pointerId);
      return;
    }
    if (this.draft) { this._cancelDraft(); return; }
    this._pan = { x: this.view.x, y: this.view.y, sx: e.clientX, sy: e.clientY };
    this.board.classList.add('is-panning');
    this.board.setPointerCapture && this.board.setPointerCapture(e.pointerId);
  };

  Board.prototype._move = function (e) {
    if (this._drag) {
      var node = this.node(this._drag.id);
      if (!node) return;
      var p = this._client(e.clientX, e.clientY);
      node.x = snap(p.x - this._drag.dx);
      node.y = snap(p.y - this._drag.dy);
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
    if (this._drag) {
      var moved = this._drag.moved;
      this._drag = null;
      if (moved) this.onChange();
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
    var del = e.target.closest && e.target.closest('.node-x');
    if (del) {
      var n = del.closest('.node');
      if (n) { this.selectedNode = n.dataset.id; this.removeSelected(); }
      return;
    }
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
    if (nodeEl) { this.select(nodeEl.dataset.id); return; }
    if (this.draft) { this._cancelDraft(); return; }
    this.selectedNode = null;
    this.selectedEdge = null;
    this.render();
    this.onSelect(null, null);
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
    var dx = x2 - x1;
    if (Math.abs(y2 - y1) < 2) return 'M' + x1 + ' ' + y1 + 'H' + x2;
    if (dx > 60) {
      var mx = x1 + dx * 0.5;
      var d = Math.min(16, Math.abs(y2 - y1) / 2);
      var sy = y2 > y1 ? 1 : -1;
      return 'M' + x1 + ' ' + y1 + 'H' + (mx - d) + 'L' + mx + ' ' + (y1 + sy * d) + 'V' + (y2 - sy * d) + 'L' + (mx + d) + ' ' + y2 + 'H' + x2;
    }
    var loop = 28;
    var my = y1 + (y2 - y1) / 2;
    return 'M' + x1 + ' ' + y1 + 'H' + (x1 + loop) + 'V' + (my - 10) + 'L' + (x1 + loop + 10) + ' ' + my + 'H' + (x2 - loop - 10) + 'L' + (x2 - loop) + ' ' + (my + 10) + 'V' + y2 + 'H' + x2;
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

  Board.prototype._updateWires = function () {
    var self = this;
    var ns = 'http://www.w3.org/2000/svg';
    while (this.wires.firstChild) this.wires.removeChild(this.wires.firstChild);
    this.edges.forEach(function (e) {
      var a = self._portPoint(e.from.node, e.from.port);
      var b = self._portPoint(e.to.node, e.to.port);
      if (!a || !b) return;
      var d = self._path(a.x, a.y, b.x, b.y);
      var state = 'idle';
      if (self.result) {
        var from = self.result.results[e.from.node];
        if (from && from.state === 'error') state = 'error';
        else if (from && from.ast) state = 'live';
      }
      var path = document.createElementNS(ns, 'path');
      path.setAttribute('d', d);
      path.setAttribute('class', 'wire' + (self.selectedEdge === e.id ? ' is-selected' : ''));
      path.setAttribute('data-state', state);
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

  Board.prototype._code = function (n) {
    if (n.kind === 'target') return '⊢';
    if (n.kind === 'axiom') return n.config.axiomId || 'A1';
    if (n.kind === 'theorem') return String(n.config.theoremCode || 'T').replace('*', '');
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
    if (n.kind === 'pred-axiom') return n.config.axiomId || 'PA';
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
      el.className = 'node' + (n.kind === 'target' ? ' is-target' : '');
      el.dataset.id = n.id;
      el.dataset.kind = n.kind;
      el.dataset.state = r ? r.state : 'idle';
      el.dataset.selected = self.selectedNode === n.id ? 'true' : 'false';
      el.style.left = n.x + 'px';
      el.style.top = n.y + 'px';
      el.style.width = W + 'px';
      el.setAttribute('aria-label', self._code(n));
      var code = self._code(n);
      var formula = '';
      var ast = null;
      if (n.kind === 'target') {
        try { ast = L.parse(n.target || 'P'); } catch (e) {}
      } else if (r && r.ast) ast = r.ast;
      if (ast) formula = window.RSL.formatFormula ? window.RSL.formatFormula(ast) : L.toHTML(ast);
      var ins = (info.ports.inputs || []).map(function (p, i, arr) {
        var top = arr.length === 1 ? 50 : 30 + (40 * i / (arr.length - 1));
        var role = (n.kind === 'subst' && p.id === 'atom') ? 'atom' : p.type;
        return '<button class="port port-in" data-port="' + esc(p.id) + '" data-role="' + esc(role) + '" style="top:' + top + '%" title="' + esc(p.label) + '" aria-label="' + esc(p.label) + '"></button>';
      }).join('');
      var outs = (info.ports.outputs || []).map(function (p) {
        return '<button class="port port-out" data-port="' + esc(p.id) + '" style="top:50%" title="' + esc(p.label) + '" aria-label="' + esc(p.label) + '"></button>';
      }).join('');
      el.innerHTML =
        '<div class="node-top"><span class="node-code">' + esc(code) + '</span>' +
          (n.kind === 'target' ? '' : '<button class="node-x" aria-label="删除模块">×</button>') +
        '</div>' +
        '<div class="node-formula formula">' + (formula || '<span class="blank">·</span>') + '</div>' +
        ins + outs;
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
      el.dataset.selected = self.selectedNode === n.id ? 'true' : 'false';
      var code = el.querySelector('.node-code');
      if (code) code.textContent = self._code(n);
      var f = el.querySelector('.node-formula');
      if (f) {
        var ast = null;
        if (n.kind === 'target') { try { ast = L.parse(n.target || 'P'); } catch (e) {} }
        else if (r && r.ast) ast = r.ast;
        if (ast) f.innerHTML = window.RSL.formatFormula ? window.RSL.formatFormula(ast) : L.toHTML(ast);
        else f.innerHTML = '<span class="blank">·</span>';
      }
    });
    this._updateWires();
  };

  Board.prototype.select = function (id) {
    this.selectedNode = id;
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
    var edge = { id: uid('e'), from: { node: fromNode, port: fromPort }, to: { node: toNode, port: toPort } };
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
    this.onChange();
    this.onSelect(null, edge.id);
    return true;
  };

  Board.prototype.addNode = function (kind, config, pos) {
    var info = window.RSL.Engine.info(kind);
    if (!info) return null;
    var n = { id: uid('n'), kind: kind, x: Math.round(pos.x), y: Math.round(pos.y), config: Object.assign({}, info.config || {}, config || {}) };
    this.items.push(n);
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
  };

  Board.prototype.removeEdge = function (id) {
    this.edges = this.edges.filter(function (e) { return e.id !== id; });
    this.selectedEdge = null;
    this.render();
    this.onChange();
    this.onSelect(null, null);
  };

  Board.prototype.removeSelected = function () {
    if (this.selectedEdge) this.removeEdge(this.selectedEdge);
    else if (this.selectedNode) this.removeNode(this.selectedNode);
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
