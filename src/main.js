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
    bestLen: {},
    usedKinds: {},
    achievements: {},
    demo: false,
    demoTimer: null,
    board: null,
    results: null,
    selectedNode: null,
    selectedEdge: null,
    overlay: false,
    lastId: null,
    forceUnlock: false,
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
      var p = JSON.parse(localStorage.getItem('axiom-simple:v2') || '{}');
      state.solved = {};
      (p.solved || []).forEach(function (id) { state.solved[id] = true; });
      state.bestLen = p.bestLen || {};
      state.usedKinds = {};
      (p.usedKinds || []).forEach(function (k) { state.usedKinds[k] = true; });
      state.achievements = {};
      (p.achievements || []).forEach(function (k) { state.achievements[k] = true; });
      state.lastId = p.lastId || null;
    } catch (e) { state.solved = {}; state.bestLen = {}; state.usedKinds = {}; state.achievements = {}; }
  }
  function saveProgress() {
    try {
      localStorage.setItem('axiom-simple:v2', JSON.stringify({
        solved: Object.keys(state.solved),
        bestLen: state.bestLen,
        usedKinds: Object.keys(state.usedKinds),
        achievements: Object.keys(state.achievements),
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
      els.themeBtn.innerHTML = '<svg class="icon"><use href="#i-' + (state.theme === 'dark' ? 'sun' : 'moon') + '"></use></svg>';
      els.themeBtn.setAttribute('aria-label', state.theme === 'dark' ? '切换浅色模式' : '切换深色模式');
    }
  }
  function updateSoundBtn() {
    if (!els.soundBtn) return;
    els.soundBtn.classList.toggle('is-muted', !state.sound);
    els.soundBtn.innerHTML = '<svg class="icon"><use href="#i-' + (state.sound ? 'speaker-wave' : 'speaker-x-mark') + '"></use></svg>';
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
  function unlockAchv(id) {
    if (state.achievements[id]) return false;
    var a = ACHV_BY_ID[id];
    if (!a) return false;
    state.achievements[id] = true;
    sfx('win');
    toast(a.icon + ' ' + a.name);
    saveProgress();
    return true;
  }

  function chapterLevels(key) {
    return state.levels.filter(function (lv) { return lv.chapter === key; });
  }

  function checkAchievements(level, len, kinds) {
    if (Object.keys(state.solved).length >= 1) unlockAchv('first');
    CHAPTERS.forEach(function (c) {
      var group = chapterLevels(c.key);
      var base = group.filter(function (lv) { return lv.band !== 'challenge'; });
      var chal = group.filter(function (lv) { return lv.band === 'challenge'; });
      if (base.length && base.every(function (lv) { return state.solved[lv.id]; })) unlockAchv('base-' + c.key);
      if (chal.length && chal.every(function (lv) { return state.solved[lv.id]; })) unlockAchv('chal-' + c.key);
    });
    if (kinds.subst) unlockAchv('rule-subst');
    if (kinds.replace) unlockAchv('rule-replace');
    if (kinds.detach) unlockAchv('rule-detach');
    if (kinds['all-intro'] || kinds['all-elim'] || kinds.syllogism) unlockAchv('rule-quant');
    if (state.bestLen[level.id] && state.bestLen[level.id] <= ((level.solution && level.solution.nodes.length) || 1)) unlockAchv('efficient');
    if (state.levels.length && state.levels.every(function (lv) { return state.solved[lv.id]; })) unlockAchv('all');
  }

  function openAchievements() {
    sfx('click');
    els.overlay.hidden = false;
    var got = ACHIEVEMENTS.filter(function (a) { return state.achievements[a.id]; }).length;
    var cards = ACHIEVEMENTS.map(function (a) {
      var on = !!state.achievements[a.id];
      return '<div class="achv' + (on ? ' is-on' : '') + '" title="' + esc(a.name) + '">' +
        '<span class="achv-icon">' + a.icon + '</span>' +
        '<span class="achv-name">' + esc(a.name) + '</span>' +
      '</div>';
    }).join('');
    els.sheet.innerHTML =
      '<button class="sheet-x" data-close aria-label="关闭"><svg class="icon"><use href="#i-x-mark"></use></svg></button>' +
      '<div class="achv-head"><span class="achv-count">' + got + ' / ' + ACHIEVEMENTS.length + '</span><span class="achv-bar"><i style="width:' + (got / ACHIEVEMENTS.length * 100) + '%"></i></span></div>' +
      '<div class="achv-grid">' + cards + '</div>';
    els.sheet.scrollTop = 0;
  }

  /* 首次出现某个规则时，用无文字演示回放参考电路；点一下提前结束。 */
  function stopDemo() {
    if (!state.demo) return;
    state.demo = false;
    clearTimeout(state.demoTimer);
    document.querySelector('.app').classList.remove('is-demo');
    if (!state.level) return;
    var target = { id: 'target', kind: 'target', x: state.level.targetPos.x, y: state.level.targetPos.y, target: state.level.target, config: {} };
    state.board.setData([target], []);
    refresh();
  }

  function startDemo(level) {
    if (!level.demo || !level.solution || !level.solution.nodes.length) return;
    var target = { id: 'target', kind: 'target', x: level.targetPos.x, y: level.targetPos.y, target: level.target, config: {} };
    var nodes = [target].concat(JSON.parse(JSON.stringify(level.solution.nodes)));
    var edges = level.solution.edges.map(function (e, i) { return { id: 'e' + i, from: e.from, to: e.to }; });
    state.demo = true;
    document.querySelector('.app').classList.add('is-demo');
    state.board.setData(nodes, edges);
    refresh();
    state.demoTimer = setTimeout(stopDemo, 3200);
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

  var CHAPTERS = [
    { id: 'Ⅰ', key: 'prop', title: '命题' },
    { id: 'Ⅱ', key: 'pred', title: '谓词' },
    { id: 'Ⅲ', key: 'eq', title: '等词' },
    { id: 'Ⅳ', key: 'set', title: '集合' }
  ];

  /* 成就：图标 + 极短名称；详细条件不写在界面里。 */
  var ACHIEVEMENTS = [
    { id: 'first', icon: '▶', name: '通电' },
    { id: 'base-prop', icon: 'Ⅰ', name: '命题基础' },
    { id: 'base-pred', icon: 'Ⅱ', name: '谓词基础' },
    { id: 'base-eq', icon: 'Ⅲ', name: '等词基础' },
    { id: 'base-set', icon: 'Ⅳ', name: '集合基础' },
    { id: 'chal-prop', icon: '★', name: '命题挑战' },
    { id: 'chal-pred', icon: '★', name: '谓词挑战' },
    { id: 'chal-eq', icon: '★', name: '等词挑战' },
    { id: 'chal-set', icon: '★', name: '集合挑战' },
    { id: 'rule-subst', icon: 'S', name: '代入' },
    { id: 'rule-replace', icon: 'D', name: '置换' },
    { id: 'rule-detach', icon: 'M', name: '分离' },
    { id: 'rule-quant', icon: '∀', name: '量词' },
    { id: 'efficient', icon: '⚡', name: '短证明' },
    { id: 'all', icon: '⊢', name: '全通关' }
  ];
  var ACHV_BY_ID = {};
  ACHIEVEMENTS.forEach(function (a) { ACHV_BY_ID[a.id] = a; });
  function chapterOf(lv) {
    if (lv.chapter === 'pred') return 'Ⅱ';
    if (lv.chapter === 'eq') return 'Ⅲ';
    if (lv.chapter === 'set') return 'Ⅳ';
    return 'Ⅰ';
  }
  var CHAPTER_RANK = {}; CHAPTERS.forEach(function (c, i) { CHAPTER_RANK[c.id] = i; });

  function buildLevels() {
    var list = (window.RSL.LEVELS || []).slice();
    list.forEach(function (lv, i) {
      lv.chapter = lv.chapter || 'prop';
      lv.band = lv.band || 'base';
      lv.targetPos = lv.targetPos || { x: 650, y: 300 };
      lv.allowed = lv.allowed || [];
      lv._ord = i;
      lv.chapterGroup = chapterOf(lv);
    });
    list.sort(function (a, b) {
      return (CHAPTER_RANK[a.chapterGroup] - CHAPTER_RANK[b.chapterGroup]) || (a._ord - b._ord);
    });
    var prevBaseLast = null;
    CHAPTERS.forEach(function (c) {
      var group = list.filter(function (lv) { return lv.chapterGroup === c.id; });
      var base = group.filter(function (lv) { return lv.band !== 'challenge'; });
      var chal = group.filter(function (lv) { return lv.band === 'challenge'; });
      base.forEach(function (lv, i) {
        lv.requires = i === 0 ? (prevBaseLast ? [prevBaseLast] : []) : [base[i - 1].id];
        lv.challenge = false;
      });
      chal.forEach(function (lv, i) {
        lv.requires = i === 0 ? (base.length ? [base[base.length - 1].id] : (prevBaseLast ? [prevBaseLast] : [])) : [chal[i - 1].id];
        lv.challenge = i === chal.length - 1;
      });
      if (base.length) prevBaseLast = base[base.length - 1].id;
    });
    /* 首次出现某个规则/档案/已证结论时，给一关自动演示（无文字）。 */
    var seen = {};
    list.forEach(function (lv, i) {
      var canDemo = lv.solution && lv.solution.nodes.length <= 14;
      if (!canDemo) return;
      if (i === 0) lv.demo = true;
      (lv.allowed || []).forEach(function (key) {
        var tag = null;
        if (key === 'subst' || key === 'replace' || key === 'detach' ||
            key === 'all-intro' || key === 'all-elim' || key === 'exists-intro' ||
            key === 'exists-elim' || key === 'syllogism') tag = 'r:' + key;
        else if (key.indexOf('archive:') === 0) tag = 'archive';
        else if (key.indexOf('theorem:') === 0) tag = 'theorem';
        if (tag && !seen[tag]) { seen[tag] = true; lv.demo = true; }
      });
    });
    state.levels = list;
  }

  function isUnlocked(index) {
    if (state.forceUnlock) return true;
    var lv = state.levels[index];
    if (!lv) return false;
    return (lv.requires || []).every(function (id) { return !!state.solved[id]; });
  }

  function partPool() {
    return (window.RSL.PARTS || []).slice();
  }

  function levelById(id) {
    var levels = window.RSL.LEVELS || [];
    for (var i = 0; i < levels.length; i += 1) if (levels[i].id === id) return levels[i];
    return null;
  }

  function partsForLevel() {
    var allowed = state.level.allowed || [];
    var pool = partPool();
    var out = [];
    allowed.forEach(function (key) {
      if (key === 'target') return;
      var p = pool.filter(function (x) { return x.key === key; })[0];
      if (!p && key.indexOf('theorem:') === 0) {
        var lv = levelById(key.slice(8));
        if (lv) {
          p = {
            key: key, kind: 'theorem', symbol: (lv.code || lv.id).split('-').pop(),
            name: '已证 ' + (lv.code || lv.id) + ' · ' + (lv.title || ''),
            code: lv.id, config: { theoremCode: lv.id }
          };
        }
      }
      if (!p && key.indexOf('archive:') === 0) {
        var label = key.slice(8);
        var ar = window.RSL.ARCHIVE && window.RSL.ARCHIVE[label];
        if (ar) {
          p = {
            key: key, kind: 'archive', symbol: label.slice(0, 6),
            name: 'set.mm ' + label + ' · ' + (ar.name || ''),
            code: label, config: { label: label }
          };
        }
      }
      if (!p && key.indexOf('axiom:') === 0) {
        var id = key.slice(6);
        var a = window.RSL.axiomById ? window.RSL.axiomById(id) : null;
        if (a) p = {
          key: key, kind: 'axiom', symbol: a.symbol || id,
          name: (a.type === 'definition' ? '定义 ' : a.type === 'theorem' ? '定理 ' : '公理 ') + a.code + ' · ' + a.name,
          code: a.code, config: { axiomId: id }
        };
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
        case 'pred':
          if ((n.name === '=' || n.name === '∈') && (n.args || []).length === 2) return term(n.args[0]) + sp('f-op', ' ' + n.name + ' ') + term(n.args[1]);
          return sp('f-name', n.name) + sp('f-paren', '(') + (n.args || []).map(term).join(sp('f-op', ', ')) + sp('f-paren', ')');
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
    if (!isUnlocked(index)) { toast('先完成前置关卡'); return; }
    closeOverlay();
    state.demo = false;
    clearTimeout(state.demoTimer);
    document.querySelector('.app').classList.remove('is-demo');
    state.index = index;
    state.level = state.levels[index];
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
    if (state.level.demo) startDemo(state.level);
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
      html = ['a', 'b', 'c', 'x', 'y', 'z'].map(function (v) {
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
    els.popover.innerHTML = html;
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
    var items = (state.board.items || []).filter(function (n) { return n.kind !== 'target'; });
    var len = items.length;
    var kinds = {};
    items.forEach(function (n) {
      state.usedKinds[n.kind] = true;
      kinds[n.kind] = true;
    });
    if (!state.bestLen[lv.id] || len < state.bestLen[lv.id]) state.bestLen[lv.id] = len;
    saveProgress();
    checkAchievements(lv, len, kinds);
    sfx('win');
    updateProgress();
    els.levelBtn.classList.remove('just-solved');
    void els.levelBtn.offsetWidth;
    els.levelBtn.classList.add('just-solved');
    setTimeout(function () { els.levelBtn.classList.remove('just-solved'); }, 520);
    var isLast = state.index >= state.levels.length - 1;
    var ref = (lv.solution && lv.solution.nodes.length) || len;
    var eff = Math.max(1, Math.min(100, Math.round(ref / Math.max(1, len) * 100)));
    els.overlay.hidden = false;
    els.sheet.innerHTML =
      '<button class="sheet-x" data-close aria-label="关闭"><svg class="icon"><use href="#i-x-mark"></use></svg></button>' +
      '<div class="win">' +
        '<div class="win-check">✓</div>' +
        '<div class="win-formula formula">' + goalHTML(lv.target) + '</div>' +
        '<div class="win-len" title="推理长度：模块数 / 参考电路模块数">' +
          '<span class="metric-glyph">▦</span><b>' + len + '</b><span class="metric-ref">/ ' + ref + '</span>' +
          '<span class="metric-bar"><i style="width:' + eff + '%"></i></span>' +
        '</div>' +
        '<div class="win-count">' + Object.keys(state.solved).length + ' / ' + state.levels.length + '</div>' +
        '<button class="primary next-btn" data-next="1">' + (isLast ? '选关' : '下一关') + '</button>' +
      '</div>';
    confetti();
  }

  function openLevels() {
    sfx('click');
    els.overlay.hidden = false;
    var buckets = {};
    CHAPTERS.forEach(function (c) { buckets[c.id] = []; });
    state.levels.forEach(function (lv, i) {
      (buckets[chapterOf(lv)] || buckets['Ⅰ']).push({ lv: lv, i: i });
    });
    function cellsFor(items) {
      return items.map(function (x) {
        var unlocked = isUnlocked(x.i);
        var ref = x.lv.solution && x.lv.solution.nodes ? x.lv.solution.nodes.length : 1;
        var best = state.bestLen[x.lv.id];
        var eff = best ? Math.max(8, Math.min(100, Math.round(ref / best * 100))) : 0;
        var style = best ? ' style="--eff:' + eff + '%;--effpx:' + Math.round(34 * eff / 100) + 'px"' : '';
        var cls = 'level-cell' + (x.i === state.index ? ' is-current' : '') +
          (state.solved[x.lv.id] ? ' is-solved' : '') +
          (x.lv.challenge ? ' is-challenge' : '') +
          (x.lv.band === 'challenge' ? ' is-challenge-band' : '') +
          (unlocked ? '' : ' is-locked');
        return '<button class="' + cls + '" data-level="' + x.i + '" aria-label="第 ' + (x.i + 1) + ' 关' + (unlocked ? '' : '，未解锁') + '"' + (unlocked ? '' : ' disabled') + style + '>' +
          String(x.i + 1).padStart(2, '0') +
          '<i class="eff" aria-hidden="true"></i>' +
          '</button>';
      }).join('');
    }
    function bandHTML(items, kind) {
      if (!items.length) return '';
      var solved = items.filter(function (x) { return state.solved[x.lv.id]; }).length;
      var firstLocked = !isUnlocked(items[0].i);
      var glyph = kind === 'challenge' ? '★' : '◆';
      return '<div class="band ' + kind + (firstLocked ? ' is-locked' : '') + '">' +
        '<div class="band-head" title="' + (kind === 'challenge' ? '挑战' : '基础') + '">' +
          '<span class="band-glyph">' + glyph + '</span>' +
          '<span class="band-label">' + (kind === 'challenge' ? '挑战' : '基础') + '</span>' +
          '<span class="band-progress" aria-hidden="true"><i style="width:' + (solved / items.length * 100) + '%"></i></span>' +
        '</div>' +
        '<div class="levels">' + cellsFor(items) + '</div>' +
      '</div>';
    }
    var html = CHAPTERS.map(function (c) {
      var items = buckets[c.id] || [];
      if (!items.length) return '';
      var solved = items.filter(function (x) { return state.solved[x.lv.id]; }).length;
      var isCurrent = items.some(function (x) { return x.i === state.index; });
      var base = items.filter(function (x) { return x.lv.band !== 'challenge'; });
      var chal = items.filter(function (x) { return x.lv.band === 'challenge'; });
      var chapterLocked = !isUnlocked(items[0].i);
      return '<section class="chapter' + (isCurrent ? ' is-current' : '') + (chapterLocked ? ' is-locked' : '') + '">' +
        '<div class="chapter-head">' +
          '<span class="chapter-roman">' + c.id + '</span>' +
          '<span class="chapter-title">' + c.title + '</span>' +
          '<span class="chapter-progress" aria-hidden="true"><i style="width:' + (solved / items.length * 100) + '%"></i></span>' +
        '</div>' +
        bandHTML(base, 'base') +
        bandHTML(chal, 'challenge') +
      '</section>';
    }).join('');
    els.sheet.innerHTML = '<button class="sheet-x" data-close aria-label="关闭"><svg class="icon"><use href="#i-x-mark"></use></svg></button><div class="chapters">' + html + '</div>';
    els.sheet.scrollTop = 0;
  }

  function openHelp() {
    sfx('click');
    els.overlay.hidden = false;
    els.sheet.innerHTML =
      '<button class="sheet-x" data-close aria-label="关闭"><svg class="icon"><use href="#i-x-mark"></use></svg></button>' +
      '<div class="help">' +
        '<div class="help-row"><span class="help-icon">+</span><span class="help-arrow">→</span><span class="help-icon">◉</span></div>' +
        '<div class="help-row"><span class="help-icon">◉</span><span class="help-arrow">→</span><span class="help-icon">⊢</span></div>' +
        '<div class="help-row"><span class="help-icon">▷</span></div>' +
        '<div class="help-cards">' +
          '<div class="help-card"><b>S</b><span>P · B → A</span></div>' +
          '<div class="help-card"><b>M</b><span>A · A→B → B</span></div>' +
          '<div class="help-card"><b>D</b><span>A↔B ⇄ ¬A∨B</span></div>' +
          '<div class="help-card"><b>∀</b><span>A(x) ⇄ ∀x A</span></div>' +
        '</div>' +
      '</div>' +
      '<p class="credit">Design by yyxcnasd</p>';
  }

  function closeOverlay() {
    els.overlay.hidden = true;
    els.sheet.innerHTML = '';
    state.overlay = false;
  }

  function nextLevel() {
    var next = state.index + 1;
    if (next >= state.levels.length || !isUnlocked(next)) { openLevels(); return; }
    loadLevel(next);
  }

  function bind() {
    els.levelBtn.addEventListener('click', openLevels);
    els.checkBtn.addEventListener('click', check);
    els.helpBtn.addEventListener('click', openHelp);
    els.achvBtn.addEventListener('click', openAchievements);
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
    document.addEventListener('pointerdown', function () {
      ensureAudio();
      if (state.demo) stopDemo();
    });
    els.tray.addEventListener('click', function (e) {
      var tile = e.target.closest('.tile');
      if (tile) addPart(tile.dataset.key);
    });
    els.popover.addEventListener('click', function (e) {
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
      if (lv) {
        var idx = parseInt(lv.dataset.level, 10);
        if (!isUnlocked(idx)) return;
        loadLevel(idx);
        return;
      }
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
    ['levelBtn', 'goal', 'goalFormula', 'themeBtn', 'soundBtn', 'helpBtn', 'achvBtn', 'checkBtn', 'progressFill', 'board', 'boardWorld', 'wireLayer', 'nodeLayer', 'tray', 'popover', 'toast', 'overlay', 'sheet', 'coach'].forEach(function (id) { els[id] = $(id); });
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
    var start = -1;
    if (state.lastId) {
      for (var i = 0; i < state.levels.length; i++) if (state.levels[i].id === state.lastId) { start = i; break; }
    }
    if (start < 0 || state.solved[state.levels[start].id] || !isUnlocked(start)) {
      start = -1;
      for (var j = 0; j < state.levels.length; j++) {
        if (!state.solved[state.levels[j].id] && isUnlocked(j)) { start = j; break; }
      }
      if (start < 0) start = state.levels.length - 1;
    }
    loadLevel(start);
    updateProgress();
    window.RSL.APP = { state: state, loadLevel: loadLevel, refresh: refresh, isUnlocked: isUnlocked, stopDemo: stopDemo, openAchievements: openAchievements };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
















