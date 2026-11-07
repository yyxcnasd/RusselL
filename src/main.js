/* 公理板 — minimal one-screen game. */
(function () {
  'use strict';
  window.RSL = window.RSL || {};
  var L = window.RSL.Logic;
  var state = {
    levels: [],
    level: null,
    index: 0,
    solved: {},
    board: null,
    results: null,
    selectedNode: null,
    selectedEdge: null,
    overlay: false,
    lastId: null,
    sound: true,
    theme: 'light'
  };
  var els = {};
  var toastTimer = null;

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function parse(s) { try { return L.parse(s); } catch (e) { return null; } }
  function step(n) { return Math.round(n / 8) * 8; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function unique(a) { return a.filter(function (v, i) { return a.indexOf(v) === i; }); }

  function loadProgress() {
    try {
      var p = JSON.parse(localStorage.getItem('axiom-simple:v1') || '{}');
      state.solved = {};
      (p.solved || []).forEach(function (id) { state.solved[id] = true; });
      state.lastId = p.lastId || null;
    } catch (e) { state.solved = {}; }
  }
  function saveProgress() {
    try {
      localStorage.setItem('axiom-simple:v1', JSON.stringify({
        solved: Object.keys(state.solved),
        lastId: state.level ? state.level.id : state.lastId
      }));
    } catch (e) {}
  }

  function loadSettings() {
    try {
      var s = JSON.parse(localStorage.getItem('axiom-simple:settings') || '{}');
      state.sound = s.sound !== false;
      state.theme = s.theme === 'dark' ? 'dark' : 'light';
    } catch (e) { state.sound = true; state.theme = 'light'; }
  }
  function saveSettings() {
    try { localStorage.setItem('axiom-simple:settings', JSON.stringify({ sound: state.sound, theme: state.theme })); } catch (e) {}
  }
  function applyTheme() {
    document.documentElement.dataset.theme = state.theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', state.theme === 'dark' ? '#151311' : '#f6f2e8');
    if (els.themeBtn) {
      els.themeBtn.textContent = state.theme === 'dark' ? '☀' : '◐';
      els.themeBtn.setAttribute('aria-label', state.theme === 'dark' ? '切换浅色模式' : '切换深色模式');
    }
  }
  function updateSoundBtn() {
    if (!els.soundBtn) return;
    els.soundBtn.classList.toggle('is-muted', !state.sound);
    els.soundBtn.setAttribute('aria-label', state.sound ? '关闭音乐' : '开启音乐');
  }

  var bgm = null, audioCtx = null;
  function ensureAudio() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; }
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    if (!bgm) {
      bgm = document.getElementById('bgm');
      if (bgm) bgm.volume = 0.23;
    }
    if (state.sound && bgm && bgm.paused) bgm.play().catch(function () {});
  }
  function tone(freq, dur, type, gain, delay) {
    if (!state.sound) return;
    ensureAudio();
    if (!audioCtx) return;
    var t0 = audioCtx.currentTime + (delay || 0);
    var o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = type || 'sine';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain || 0.03, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }
  function sfx(kind) {
    if (kind === 'place') { tone(330, 0.06, 'triangle', 0.025); tone(495, 0.08, 'sine', 0.02, 0.04); }
    else if (kind === 'connect') { tone(660, 0.04, 'sine', 0.035); tone(990, 0.06, 'sine', 0.025, 0.04); }
    else if (kind === 'win') { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.18, 'sine', 0.04, i * 0.085); }); }
    else if (kind === 'fail') { tone(180, 0.13, 'triangle', 0.035); }
    else { tone(520, 0.035, 'sine', 0.018); }
  }
  function updateProgress() {
    var n = state.levels.length || 1;
    var solved = state.levels.filter(function (lv) { return state.solved[lv.id]; }).length;
    if (els.progressFill) els.progressFill.style.width = (solved / n * 100) + '%';
  }
  function confetti() {
    var host = els.sheet.querySelector('.win');
    if (!host) return;
    host.style.position = 'relative';
    var box = document.createElement('div');
    box.className = 'confetti';
    var colors = ['#e66f3f', '#3f8e65', '#4f7fb5', '#2b2721', '#e8b04b'];
    for (var i = 0; i < 28; i++) {
      var s = document.createElement('i');
      s.style.setProperty('--c', colors[i % colors.length]);
      s.style.left = (i % 2 ? 4 + Math.random() * 20 : 76 + Math.random() * 20) + '%';
      s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
      s.style.setProperty('--d', (Math.random() * 0.45) + 's');
      s.style.setProperty('--t', (1.1 + Math.random() * 0.8) + 's');
      box.appendChild(s);
    }
    host.appendChild(box);
    setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 2200);
  }

  function buildLevels() {
    var list = (window.RSL.LEVELS || []).slice();
    var pred = window.RSL.PREDICATE && window.RSL.PREDICATE.levels;
    if (pred) list = list.concat(pred);
    var order = {};
    (window.RSL.CHAPTERS || []).forEach(function (c, i) { order[c.id] = i; });
    list.sort(function (a, b) {
      var ao = order[a.chapter] == null ? 99 : order[a.chapter];
      var bo = order[b.chapter] == null ? 99 : order[b.chapter];
      return ao - bo;
    });
    list.forEach(function (lv) {
      lv.chapter = lv.chapter || 'primitives';
      lv.targetPos = lv.targetPos || { x: 650, y: 300 };
      lv.allowed = lv.allowed || [];
    });
    state.levels = list;
  }

  function partPool() {
    var parts = (window.RSL.PARTS || []).slice();
    if (window.RSL.PREDICATE_PARTS) parts = parts.concat(window.RSL.PREDICATE_PARTS());
    return parts;
  }

  function partsForLevel() {
    var allowed = state.level.allowed || [];
    var pool = partPool();
    var out = [];
    allowed.forEach(function (key) {
      if (key === 'target') return;
      var p = pool.filter(function (x) { return x.key === key; })[0];
      if (!p && key.indexOf('theorem:') === 0) {
        var code = key.slice(8);
        var t = window.RSL.theoremData ? window.RSL.theoremData(code) : null;
        if (t) p = { key: key, kind: 'theorem', symbol: code.replace('*', ''), name: 'PM ' + code, code: code, config: { theoremCode: code } };
      }
      if (!p && key.indexOf('axiom:') === 0) {
        var id = key.slice(6);
        var a = (window.RSL.AXIOMS || []).filter(function (x) { return x.id === id; })[0];
        if (a) p = { key: key, kind: 'axiom', symbol: id, name: a.name, code: a.code, config: { axiomId: id } };
      }
      if (!p && key.indexOf('pred-axiom:') === 0) {
        var pid = key.slice(11);
        var pa = ((window.RSL.PREDICATE && window.RSL.PREDICATE.axioms) || []).filter(function (x) { return x.id === pid; })[0];
        if (pa) p = { key: key, kind: 'pred-axiom', symbol: pa.id, name: pa.name, config: { axiomId: pid } };
      }
      if (p) out.push(p);
    });
    return out;
  }

  function formulaHTML(ast) {
    function sp(cls, text) { return '<span class="' + cls + '">' + esc(text) + '</span>'; }
    function term(t) { return sp('f-var', t && t.name ? t.name : 'x'); }
    function isBin(n) { return n.k === 'or' || n.k === 'and' || n.k === 'imp' || n.k === 'iff'; }
    function operand(n) {
      var body = go(n);
      return (isBin(n) || n.k === 'all' || n.k === 'exists') ? sp('f-paren', '(') + body + sp('f-paren', ')') : body;
    }
    function go(n) {
      if (!n) return '';
      switch (n.k) {
        case 'atom': return sp('f-var', n.name);
        case 'var': return sp('f-var', n.name);
        case 'pred': return sp('f-name', n.name) + sp('f-paren', '(') + (n.args || []).map(term).join(sp('f-op', ', ')) + sp('f-paren', ')');
        case 'not': {
          var c = n.a;
          return sp('f-op', '¬') + ((isBin(c) || c.k === 'all' || c.k === 'exists') ? sp('f-paren', '(') + go(c) + sp('f-paren', ')') : go(c));
        }
        case 'or': return operand(n.a) + sp('f-op', ' ∨ ') + operand(n.b);
        case 'and': return operand(n.a) + sp('f-op', ' ∧ ') + operand(n.b);
        case 'imp': return operand(n.a) + sp('f-op', ' → ') + operand(n.b);
        case 'iff': return operand(n.a) + sp('f-op', ' ↔ ') + operand(n.b);
        case 'all': return sp('f-quant', '∀') + sp('f-var', n.v) + sp('f-op', ' ') + operand(n.a);
        case 'exists': return sp('f-quant', '∃') + sp('f-var', n.v) + sp('f-op', ' ') + operand(n.a);
        default: return esc(L.fmt ? L.fmt(n) : '');
      }
    }
    try { return go(ast); } catch (e) { return esc(L.fmt ? L.fmt(ast) : ''); }
  }

  function goalHTML(text) {
    var ast = parse(text);
    return ast ? formulaHTML(ast) : esc(text);
  }

  function toast(msg) {
    clearTimeout(toastTimer);
    els.toast.textContent = msg;
    els.toast.classList.add('is-on');
    toastTimer = setTimeout(function () { els.toast.classList.remove('is-on'); }, 1800);
  }

  function freeSpot() {
    var nodes = state.board.items || [];
    var v = state.board.view;
    var left = Math.max(30, -v.x / v.scale + 30);
    var top = Math.max(30, -v.y / v.scale + 30);
    var cols = [left, left + 270, left + 540, left + 810];
    var rows = [top, top + 170, top + 340, top + 510];
    for (var c = 0; c < cols.length; c++) {
      for (var r = 0; r < rows.length; r++) {
        var x = cols[c], y = rows[r];
        var hit = nodes.some(function (n) { return Math.abs(n.x - x) < 245 && Math.abs(n.y - y) < 150; });
        if (!hit) return { x: x, y: y };
      }
    }
    return { x: left + 30, y: top + 30 };
  }

  function loadLevel(index) {
    closeOverlay();
    state.index = index;
    state.level = state.levels[index];
    state.board.allowMixed = state.level.chapter === 'predicate';
    state.selectedNode = null;
    state.selectedEdge = null;
    var mobile = window.innerWidth <= 700;
    var tx = mobile ? 250 : state.level.targetPos.x;
    var ty = mobile ? 300 : state.level.targetPos.y;
    var target = {
      id: 'target', kind: 'target',
      x: tx, y: ty,
      target: state.level.target, config: {}
    };
    state.board.setData([target], []);
    els.goalFormula.innerHTML = goalHTML(state.level.target);
    var plain = els.goalFormula.textContent || state.level.target;
    els.goal.classList.toggle('is-long', plain.length > 52);
    els.levelBtn.textContent = String(index + 1).padStart(2, '0');
    els.levelBtn.setAttribute('aria-label', '第 ' + (index + 1) + ' 关，选择关卡');
    els.popover.hidden = true;
    buildTray();
    state.board.result = null;
    refresh();
    var W = state.board.board.clientWidth || 1000;
    var H = state.board.board.clientHeight || 600;
    if (mobile) {
      state.board.setView(18, 26, 0.72);
    } else {
      var scale = clamp((W - 120) / (tx + 280), 0.42, 1.0);
      state.board.setView(W - 60 - (tx + 232) * scale, Math.max(40, (H - 220) / 2 - ty * scale * 0.15), scale);
    }
    els.coach.hidden = !(index === 0 && state.board.items.length <= 1);
    saveProgress();
  }

  function buildTray() {
    var parts = partsForLevel();
    els.tray.innerHTML = parts.map(function (p) {
      var symbol = p.symbol || '·';
      var small = symbol.length > 3 ? ' is-long' : '';
      return '<button class="tile' + small + '" data-key="' + esc(p.key) + '" title="' + esc(p.name) + '" aria-label="' + esc(p.name) + '"><span>' + esc(symbol) + '</span></button>';
    }).join('');
  }

  function refresh() {
    if (!state.level) return;
    var data = state.board.getData();
    var r = window.RSL.Engine.evaluate(state.level, data.nodes, data.edges);
    state.results = r;
    state.board.paint(r);
    els.coach.hidden = !(state.index === 0 && data.nodes.length <= 1);
    els.checkBtn.classList.toggle('is-ready', r.complete);
    renderPopover();
    saveProgress();
  }

  function addPart(key) {
    var p = partsForLevel().filter(function (x) { return x.key === key; })[0];
    if (!p) return;
    var pos = freeSpot();
    sfx('place');
    var n = state.board.addNode(p.kind, Object.assign({}, p.config || {}), pos);
    state.board.select(n.id);
    state.selectedNode = n.id;
    state.selectedEdge = null;
    refresh();
  }

  function optionButton(label, kind, patch, extra) {
    return '<button class="option" data-' + kind + '="1"' + (extra || '') + '>' + label + '</button>';
  }

  function renderPopover() {
    var n = state.selectedNode ? state.board.node(state.selectedNode) : null;
    if (!n || n.kind === 'target') { els.popover.hidden = true; return; }
    var r = state.results && state.results.results[n.id];
    var cfg = n.config || {};
    var html = '';
    if (n.kind === 'atom') {
      html = ['P', 'Q', 'R', 'S', 'T'].map(function (x) {
        return '<button class="opt' + (cfg.name === x ? ' is-on' : '') + '" data-config="name" data-value="' + x + '">' + x + '</button>';
      }).join('');
    } else if (n.kind === 'replace' && r && r.meta && r.meta.options) {
      html = r.meta.options.slice(0, 8).map(function (o) {
        return '<button class="opt formula-opt' + (r.meta.optionId === o.id ? ' is-on' : '') + '" data-option="' + esc(o.id) + '">' + (window.RSL.formatFormula ? window.RSL.formatFormula(o.result) : esc(o.label)) + '</button>';
      }).join('');
    } else if (n.kind === 'quant') {
      html = '<button class="opt' + (cfg.kind === 'all' ? ' is-on' : '') + '" data-config="kind" data-value="all">∀</button>' +
        '<button class="opt' + (cfg.kind === 'exists' ? ' is-on' : '') + '" data-config="kind" data-value="exists">∃</button>' +
        '<span class="opt-gap"></span>' + ['x', 'y', 'z'].map(function (v) {
          return '<button class="opt' + (cfg.v === v ? ' is-on' : '') + '" data-config="v" data-value="' + v + '">' + v + '</button>';
        }).join('');
    } else if (n.kind === 'pred') {
      html = ['F', 'G', 'H'].map(function (x) {
        return '<button class="opt' + (cfg.name === x ? ' is-on' : '') + '" data-config="name" data-value="' + x + '">' + x + '</button>';
      }).join('') + '<span class="opt-gap"></span>' + ['x', 'y', 'z'].map(function (v) {
        return '<button class="opt' + (cfg.arg === v ? ' is-on' : '') + '" data-config="arg" data-value="' + v + '">' + v + '</button>';
      }).join('');
    } else if (n.kind === 'all-elim') {
      html = ['a', 'x', 'y', 'z'].map(function (v) {
        return '<button class="opt' + (cfg.term === v ? ' is-on' : '') + '" data-config="term" data-value="' + v + '">' + v + '</button>';
      }).join('');
    } else if (n.kind === 'all-intro' || n.kind === 'exists-intro') {
      html = ['x', 'y', 'z'].map(function (v) {
        return '<button class="opt' + (cfg.v === v ? ' is-on' : '') + '" data-config="v" data-value="' + v + '">' + v + '</button>';
      }).join('');
    } else if (n.kind === 'exists-elim') {
      html = ['y', 'z'].map(function (v) {
        return '<button class="opt' + (cfg.y === v ? ' is-on' : '') + '" data-config="y" data-value="' + v + '">' + v + '</button>';
      }).join('');
    }
    if (!html) { els.popover.hidden = true; return; }
    els.popover.innerHTML = '<button class="pop-x" aria-label="关闭">×</button>' + html;
    els.popover.hidden = false;
  }

  function deleteSelection() {
    state.board.removeSelected();
    state.selectedNode = null;
    state.selectedEdge = null;
    els.popover.hidden = true;
    refresh();
  }

  function check() {
    var r = state.results;
    if (!r) return;
    if (r.complete) { win(); return; }
    sfx('fail');
    if (r.errors.length) { toast('还有模块没接好'); return; }
    if (r.target && r.target.state === 'error') { toast('公式不对'); return; }
    toast('把线接到 ⊢');
  }

  function win() {
    var lv = state.level;
    state.solved[lv.id] = true;
    saveProgress();
    sfx('win');
    updateProgress();
    els.levelBtn.classList.remove('just-solved');
    void els.levelBtn.offsetWidth;
    els.levelBtn.classList.add('just-solved');
    setTimeout(function () { els.levelBtn.classList.remove('just-solved'); }, 520);
    var isLast = state.index >= state.levels.length - 1;
    els.overlay.hidden = false;
    els.sheet.innerHTML =
      '<button class="sheet-x" data-close aria-label="关闭">×</button>' +
      '<div class="win">' +
        '<div class="win-check">✓</div>' +
        '<div class="win-formula formula">' + goalHTML(lv.target) + '</div>' +
        '<div class="win-count">' + Object.keys(state.solved).length + ' / ' + state.levels.length + '</div>' +
        '<button class="primary next-btn" data-next="1">' + (isLast ? '选关' : '下一关') + '</button>' +
      '</div>';
    confetti();
  }

  function openLevels() {
    sfx('click');
    els.overlay.hidden = false;
    var grid = state.levels.map(function (lv, i) {
      var cls = 'level-cell' + (i === state.index ? ' is-current' : '') + (state.solved[lv.id] ? ' is-solved' : '');
      return '<button class="' + cls + '" data-level="' + i + '" aria-label="第 ' + (i + 1) + ' 关">' + String(i + 1).padStart(2, '0') + '</button>';
    }).join('');
    els.sheet.innerHTML = '<button class="sheet-x" data-close aria-label="关闭">×</button><div class="levels">' + grid + '</div>';
  }

  function openHelp() {
    sfx('click');
    els.overlay.hidden = false;
    els.sheet.innerHTML =
      '<button class="sheet-x" data-close aria-label="关闭">×</button>' +
      '<div class="help">' +
        '<div><span class="help-icon">+</span><b>放模块</b></div>' +
        '<div><span class="help-icon">→</span><b>拖线</b></div>' +
        '<div><span class="help-icon">✓</span><b>校验</b></div>' +
      '</div>' +
      '<p class="credit">音乐：YannZ · CC BY 4.0</p>';
  }

  function closeOverlay() {
    els.overlay.hidden = true;
    els.sheet.innerHTML = '';
    state.overlay = false;
  }

  function nextLevel() {
    if (state.index + 1 >= state.levels.length) { openLevels(); return; }
    loadLevel(state.index + 1);
  }

  function bind() {
    els.levelBtn.addEventListener('click', openLevels);
    els.checkBtn.addEventListener('click', check);
    els.helpBtn.addEventListener('click', openHelp);
    els.themeBtn.addEventListener('click', function () {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      saveSettings();
      sfx('click');
    });
    els.soundBtn.addEventListener('click', function () {
      state.sound = !state.sound;
      updateSoundBtn();
      saveSettings();
      if (state.sound) ensureAudio();
      else if (bgm) bgm.pause();
      sfx('click');
    });
    document.addEventListener('pointerdown', function () { ensureAudio(); });
    els.tray.addEventListener('click', function (e) {
      var tile = e.target.closest('.tile');
      if (tile) addPart(tile.dataset.key);
    });
    els.popover.addEventListener('click', function (e) {
      if (e.target.closest('.pop-x')) { els.popover.hidden = true; return; }
      var opt = e.target.closest('[data-config]');
      if (opt && state.selectedNode) {
        var patch = {};
        patch[opt.dataset.config] = opt.dataset.value;
        state.board.updateConfig(state.selectedNode, patch);
        state.selectedNode = state.board.selectedNode;
        refresh();
        return;
      }
      var ro = e.target.closest('[data-option]');
      if (ro && state.selectedNode) {
        state.board.updateConfig(state.selectedNode, { optionId: ro.dataset.option, preferDef: '', preferDir: '', preferPath: null });
        state.selectedNode = state.board.selectedNode;
        refresh();
      }
    });
    els.overlay.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) { closeOverlay(); return; }
      var lv = e.target.closest('[data-level]');
      if (lv) { loadLevel(parseInt(lv.dataset.level, 10)); return; }
      if (e.target.closest('[data-next]')) { nextLevel(); return; }
      if (e.target === els.overlay) closeOverlay();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (!els.overlay.hidden) closeOverlay();
        else { state.board.selectedNode = null; state.board.selectedEdge = null; state.board.render(); state.selectedNode = null; state.selectedEdge = null; refresh(); }
        return;
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && !e.target.closest('input,textarea')) {
        if (state.selectedNode || state.selectedEdge) { e.preventDefault(); deleteSelection(); }
      }
    });
    window.addEventListener('resize', function () { if (state.board) state.board._updateWires(); });
  }

  function init() {
    ['levelBtn', 'goal', 'goalFormula', 'themeBtn', 'soundBtn', 'helpBtn', 'checkBtn', 'progressFill', 'board', 'boardWorld', 'wireLayer', 'nodeLayer', 'tray', 'popover', 'toast', 'overlay', 'sheet', 'coach'].forEach(function (id) { els[id] = $(id); });
    if (!L) { document.body.innerHTML = '<div class="fatal">逻辑引擎未加载</div>'; return; }
    window.RSL.formatFormula = function (ast) { return formulaHTML(ast); };
    loadProgress();
    loadSettings();
    applyTheme();
    updateSoundBtn();
    buildLevels();
    state.board = new window.RSL.Board({
      board: els.board,
      world: els.boardWorld,
      wires: els.wireLayer,
      nodes: els.nodeLayer,
      onChange: function () { refresh(); },
      onSelect: function (node, edge) {
        state.selectedNode = node;
        state.selectedEdge = edge;
        refresh();
      },
      onToast: function (msg) { toast(msg); },
      onConnect: function () { sfx('connect'); },
      onRemove: function () { sfx('click'); }
    });
    bind();
    var start = 0;
    if (state.lastId) {
      for (var i = 0; i < state.levels.length; i++) if (state.levels[i].id === state.lastId) { start = i; break; }
    }
    if (state.solved[state.levels[start].id]) {
      var next = -1;
      for (var j = start + 1; j < state.levels.length; j++) if (!state.solved[state.levels[j].id]) { next = j; break; }
      if (next < 0) for (var k = 0; k <= start; k++) if (!state.solved[state.levels[k].id]) { next = k; break; }
      if (next >= 0) start = next;
    }
    loadLevel(start);
    updateProgress();
    window.RSL.APP = { state: state, loadLevel: loadLevel, refresh: refresh };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();







