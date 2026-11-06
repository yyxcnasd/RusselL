/* 公理板 — application shell, level flow, inspector, codex and archive. */
(function () {
  'use strict';
  window.RSL = window.RSL || {};
  var L = window.RSL.Logic;

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function parse(text) {
    if (!L) return null;
    try { return L.parse(text); } catch (e) { return null; }
  }
  function fullHTML(ast) {
    function sp(cls, text) { return '<span class="' + cls + '">' + esc(text) + '</span>'; }
    function term(t) { return sp('f-var', t && t.name ? t.name : 'x'); }
    function wrap(n, body) {
      return n.k === 'atom' || n.k === 'pred' || n.k === 'var' ? body : sp('f-paren', '(') + body + sp('f-paren', ')');
    }
    function go(n) {
      if (!n) return '';
      switch (n.k) {
        case 'atom': return sp('f-var', n.name);
        case 'var': return sp('f-var', n.name);
        case 'pred': return sp('f-name', n.name) + sp('f-paren', '(') + (n.args || []).map(term).join(sp('f-op', ', ')) + sp('f-paren', ')');
        case 'not': return sp('f-op', '¬') + go(n.a);
        case 'or': return sp('f-paren', '(') + go(n.a) + sp('f-op', ' ∨ ') + go(n.b) + sp('f-paren', ')');
        case 'and': return sp('f-paren', '(') + go(n.a) + sp('f-op', ' ∧ ') + go(n.b) + sp('f-paren', ')');
        case 'imp': return sp('f-paren', '(') + go(n.a) + sp('f-op', ' → ') + go(n.b) + sp('f-paren', ')');
        case 'iff': return sp('f-paren', '(') + go(n.a) + sp('f-op', ' ↔ ') + go(n.b) + sp('f-paren', ')');
        case 'all': return sp('f-quant', '∀') + sp('f-var', n.v) + sp('f-op', ' ') + go(n.a);
        case 'exists': return sp('f-quant', '∃') + sp('f-var', n.v) + sp('f-op', ' ') + go(n.a);
        default: return esc(L && L.fmt ? L.fmt(n) : '');
      }
    }
    try { return go(ast); } catch (e) { return null; }
  }

  function formulaHTML(text, fallback) {
    var ast = parse(text);
    if (ast && L) {
      var full = fullHTML(ast);
      if (full) return full;
      try { return L.toHTML(ast); } catch (e) { /* fall through */ }
    }
    return esc(fallback != null ? fallback : text);
  }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function uid(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 8); }
  function deep(o) { return JSON.parse(JSON.stringify(o)); }
  function unique(arr) { return arr.filter(function (v, i) { return arr.indexOf(v) === i; }); }

  var state = {
    levels: [],
    level: null,
    levelIndex: 0,
    solved: {},
    board: null,
    results: null,
    selectedNode: null,
    selectedEdge: null,
    panel: 'target',
    partFilter: 'all',
    partSearch: '',
    showHint: false,
    usedSolution: false,
    started: false,
    won: false,
    sound: true,
    codexTab: 'guide',
    theoremCode: null,
    theoremQuery: '',
    lastSheet: null,
    levelStart: 0,
    drafts: {},
    sheetOpen: false
  };

  var els = {};

  /* ---------------- persistence ---------------- */

  function readJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* sandboxed or full */ }
  }

  function loadProgress() {
    var p = readJSON('axiom-board:v1', null) || {};
    state.solved = {};
    (p.solved || []).forEach(function (id) { state.solved[id] = true; });
    state.sound = p.sound !== false;
    state.drafts = readJSON('axiom-board:drafts:v1', {}) || {};
    state.onboarded = !!p.onboarded;
    state.savedLast = p.lastId || null;
  }

  function persistProgress() {
    writeJSON('axiom-board:v1', {
      solved: Object.keys(state.solved),
      sound: state.sound,
      onboarded: !!state.onboarded,
      lastId: state.level ? state.level.id : state.savedLast
    });
  }

  function persistDrafts() {
    writeJSON('axiom-board:drafts:v1', state.drafts);
  }

  var draftTimer = null;
  function scheduleDraft() {
    if (!state.level || state.solved[state.level.id]) return;
    clearTimeout(draftTimer);
    draftTimer = setTimeout(function () {
      if (!state.level || !state.board) return;
      var data = state.board.getData();
      data.nodes = data.nodes.filter(function (n) { return n.kind !== 'target'; });
      data.edges = data.edges.filter(function (e) { return e.to.node !== 'target'; });
      if (data.nodes.length) state.drafts[state.level.id] = data;
      else delete state.drafts[state.level.id];
      persistDrafts();
    }, 320);
  }

  /* ---------------- helpers ---------------- */

  function levels() {
    if (state.levels.length) return state.levels;
    var list = (window.RSL.LEVELS || []).slice();
    var pred = window.RSL.PREDICATE && window.RSL.PREDICATE.levels;
    if (pred && pred.length) list = list.concat(pred);
    var chapterOrder = {};
    (window.RSL.CHAPTERS || []).forEach(function (c, ci) { chapterOrder[c.id] = ci; });
    list.sort(function (a, b) {
      var ao = chapterOrder[a.chapter] == null ? 99 : chapterOrder[a.chapter];
      var bo = chapterOrder[b.chapter] == null ? 99 : chapterOrder[b.chapter];
      return ao - bo;
    });
    list.forEach(function (lv, i) {
      lv._index = i;
      lv.chapter = lv.chapter || 'primitives';
      lv.allowed = lv.allowed || [];
      lv.targetPos = lv.targetPos || { x: 900, y: 300 };
      lv.world = lv.world || { w: 2000, h: 1000 };
      if (!lv.order) lv.order = i + 1;
    });
    state.levels = list;
    return list;
  }

  function chapterOf(id) {
    var chapters = window.RSL.CHAPTERS || [];
    for (var i = 0; i < chapters.length; i++) if (chapters[i].id === id) return chapters[i];
    return { id: id, code: 'CH', title: id, en: '' };
  }

  function isUnlocked(index) {
    var list = levels();
    if (index <= 0) return true;
    if (state.solved[list[index].id]) return true;
    return !!state.solved[list[index - 1].id];
  }

  function firstResumeIndex() {
    var list = levels();
    if (state.savedLast) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === state.savedLast && isUnlocked(i)) {
          if (!state.solved[list[i].id]) return i;
          for (var k = i + 1; k < list.length; k++) {
            if (isUnlocked(k) && !state.solved[list[k].id]) return k;
          }
        }
      }
    }
    for (var j = 0; j < list.length; j++) if (!state.solved[list[j].id] && isUnlocked(j)) return j;
    return 0;
  }

  function targetHTML(text) {
    return '<span class="turnstile">⊢</span> ' + formulaHTML(text);
  }

  function nodeRef(id) {
    var n = state.board && state.board.node(id);
    if (!n) return '—';
    if (n.kind === 'target') return 'J01';
    var idx = state.board.nodes.indexOf(n) + 1;
    if (n.kind === 'axiom') return 'A' + String(n.config.axiomId || '').replace('A', '');
    if (n.kind === 'theorem') return String(n.config.theoremCode || 'T').replace('*', 'T');
    return 'U' + String(idx).padStart(2, '0');
  }

  function nodeTitle(id) {
    var n = state.board && state.board.node(id);
    if (!n) return '—';
    if (n.kind === 'target') return '目标焊盘';
    var E = window.RSL.Engine;
    if (n.kind === 'axiom' || n.kind === 'pred-axiom') {
      var a = E.getAxiom(n.config.axiomId);
      return a ? '公理 ' + a.id + ' · ' + a.name : '原始命题';
    }
    if (n.kind === 'theorem') {
      var t = window.RSL.theoremData ? window.RSL.theoremData(n.config.theoremCode) : null;
      if (!t) t = E.getPredicateTheorem(n.config.theoremCode);
      return t ? '定理 ' + t.code : '档案定理';
    }
    return E.info(n.kind).label;
  }

  /* ---------------- audio ---------------- */

  var audio = null;
  function ensureAudio() {
    if (!state.sound) return null;
    try {
      if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === 'suspended') audio.resume();
      return audio;
    } catch (e) { return null; }
  }
  function tone(freq, dur, type, gain, delay) {
    var ac = ensureAudio();
    if (!ac) return;
    var t0 = ac.currentTime + (delay || 0);
    var o = ac.createOscillator();
    var g = ac.createGain();
    o.type = type || 'sine';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain || 0.035, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(ac.destination);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }
  function sfxClick() { tone(620, 0.035, 'square', 0.018); }
  function sfxConnect() { tone(880, 0.04, 'sine', 0.03); tone(1320, 0.05, 'sine', 0.022, 0.04); }
  function sfxFail() { tone(190, 0.12, 'triangle', 0.035); }
  function sfxWin() { [523, 659, 784, 1046].forEach(function (f, i) { tone(f, 0.16, 'sine', 0.035, i * 0.085); }); }

  function updateSoundBtn() {
    if (!els.soundBtn) return;
    els.soundBtn.innerHTML = '<svg class="i"><use href="#i-' + (state.sound ? 'sound' : 'mute') + '"/></svg>';
    els.soundBtn.setAttribute('aria-label', state.sound ? '关闭声音' : '打开声音');
  }

  /* ---------------- boot ---------------- */

  function showBootError(msg) {
    var lede = document.querySelector('.boot-lede');
    if (lede) lede.innerHTML = '<strong style="color:var(--negative)">' + esc(msg) + '</strong>';
    var start = $('startBtn');
    if (start) start.disabled = true;
  }

  function startGame() {
    if (!L) { showBootError('逻辑引擎未加载：请确认 src/logic.js 存在。'); return; }
    state.started = true;
    state.onboarded = true;
    persistProgress();
    ensureAudio(); sfxClick();
    els.boot.classList.add('is-off');
    els.boot.setAttribute('aria-hidden', 'true');
    setTimeout(function () { els.boot.hidden = true; }, 420);
    els.app.dataset.boot = 'false';
    var idx = firstResumeIndex();
    loadLevel(idx);
    if (!state.onboarded) state.showHint = true;
    state.showHint = idx === 0;
    renderSide();
  }

  /* ---------------- level flow ---------------- */

  function freeSpot() {
    var nodes = state.board ? state.board.nodes : [];
    var left = 60;
    var top = 60;
    if (state.board) {
      var v = state.board.view;
      left = Math.max(60, -v.x / v.scale + 34);
      top = Math.max(60, -v.y / v.scale + 34);
    }
    var cols = [left, left + 330, left + 660, left + 990, left + 1320];
    var rows = [top, top + 240, top + 480, top + 720];
    for (var c = 0; c < cols.length; c++) {
      for (var r = 0; r < rows.length; r++) {
        var x = cols[c], y = rows[r];
        var hit = nodes.some(function (n) {
          return Math.abs(n.x - x) < 285 && Math.abs(n.y - y) < 225;
        });
        if (!hit) return { x: x, y: y };
      }
    }
    return { x: 60 + Math.random() * 160, y: 60 + Math.random() * 160 };
  }

  function createTarget(level) {
    return {
      id: 'target', kind: 'target',
      x: level.targetPos.x, y: level.targetPos.y,
      target: level.target,
      config: {}
    };
  }

  function loadLevel(index, opts) {
    opts = opts || {};
    var list = levels();
    if (!list.length) return;
    if (!isUnlocked(index) && !opts.force) { toast('先完成上一块板'); return; }
    closeSheet();
    closeDrawers();
    state.levelIndex = index;
    state.level = list[index];
    state.won = false;
    state.usedSolution = false;
    state.showHint = false;
    state.selectedNode = null;
    state.selectedEdge = null;
    state.panel = 'target';
    state.levelStart = Date.now();
    state.theoremCode = null;
    if (!state.started) {
      state.started = true;
      state.onboarded = true;
    }

    var nodes = [createTarget(state.level)];
    var edges = [];
    if (!opts.fresh) {
      var d = state.drafts[state.level.id];
      if (d && d.nodes && d.nodes.length) {
        d.nodes.forEach(function (n) {
          var c = deep(n); if (!c.id) c.id = uid('n');
          nodes.push(c);
        });
        (d.edges || []).forEach(function (e, i) {
          if (!e.id) e.id = 'e-draft-' + i;
          if (e.to && e.to.node === 'target') return;
          edges.push(e);
        });
      }
    }

    state.board.setData(nodes, edges);
    state.board.result = null;
    state.selectedNode = null;
    state.panel = 'target';
    state.showHint = !state.onboarded && index === 0;
    if (!state.showHint && index === 0 && !state.solved[state.level.id]) state.showHint = true;

    updateChrome();
    renderParts();
    refreshAll();

    var W = state.board.board.clientWidth || 900;
    var H = state.board.board.clientHeight || 620;
    var tx = state.level.targetPos.x;
    var ty = state.level.targetPos.y;
    var scale = clamp((W - 40) / (tx + 270), 0.58, 0.82);
    var vx = W - 30 - (tx + 270) * scale;
    var vy = Math.max(26, (H - 300 * scale) / 2 - ty * scale * 0.23);
    state.board.setView(vx, vy, scale);
    if (nodes.length > 1) {
      requestAnimationFrame(function () { state.board.fit(); });
    }
    state.levelStart = Date.now();
    els.app.dataset.chapter = state.level.chapter;
    document.title = '公理板 · ' + state.level.code + ' ' + state.level.title;
    var predTab = els.partsTabs.querySelector('[data-filter="predicate"]');
    if (predTab) predTab.hidden = state.level.chapter !== 'predicate' && state.level.chapter !== 'sandbox';
    persistProgress();
    if (window.innerWidth < 900) closeDrawers();
    scheduleDraft();
  }

  function nextLevel() {
    var next = state.levelIndex + 1;
    if (next >= levels().length) {
      openCodex('theorems');
      return;
    }
    loadLevel(next);
  }

  function resetLevel() {
    if (!state.level) return;
    delete state.drafts[state.level.id];
    persistDrafts();
    loadLevel(state.levelIndex, { fresh: true });
    toast('画布已清空');
    sfxClick();
  }

  function loadSolution() {
    if (!state.level || !state.level.solution) { toast('这一关没有内置参考电路'); return; }
    var sol = state.level.solution;
    var nodes = [createTarget(state.level)];
    (sol.nodes || []).forEach(function (n) {
      var c = deep(n);
      c.id = c.id || uid('n');
      nodes.push(c);
    });
    var edges = (sol.edges || []).map(function (e, i) {
      return { id: 'e-sol-' + i, from: deep(e.from), to: deep(e.to) };
    });
    state.board.setData(nodes, edges);
    state.board.fit();
    state.selectedNode = null;
    state.panel = 'target';
    state.usedSolution = true;
    state.showHint = false;
    refreshAll();
    toast('参考电路已载入，可随时撤销或清空');
    sfxConnect();
  }

  /* ---------------- refresh / evaluation ---------------- */

  function refreshAll() {
    if (!state.level || !state.board) return;
    var data = state.board.getData();
    var result = window.RSL.Engine.evaluate(state.level, data.nodes, data.edges);
    state.results = result;
    state.board.paint(result);
    var target = result.target;
    var ts = els.targetState;
    if (target && target.state === 'complete') {
      ts.dataset.state = 'complete'; ts.textContent = '已接驳 · 待校验';
    } else if (target && target.state === 'error') {
      ts.dataset.state = 'error'; ts.textContent = '断言不一致';
    } else {
      ts.dataset.state = 'open'; ts.textContent = '未接驳';
    }
    var onlyTarget = data.nodes.length <= 1;
    els.boardEmpty.hidden = !onlyTarget;
    if (onlyTarget) {
      var strong = els.boardEmpty.querySelector('strong');
      var span = els.boardEmpty.querySelector('span:last-child');
      if (strong) strong.textContent = '从元件库选一枚元件，焊到这块板上';
      if (span) span.textContent = state.level.hint || '每个模块只执行一条规则；把断言接进目标焊盘。';
    }
    els.boardLed.dataset.state = result.complete ? 'ok' : result.errors.length ? 'error' : 'idle';
    els.boardHudText.textContent = result.complete ? '通过 / 线路通过' : result.errors.length ? '故障 / ' + result.errors.length + ' 个模块异常' : '就绪 / 等待接线';
    els.hudNet.textContent = '连线 ' + String(data.edges.length).padStart(2, '0') + ' · 模块 ' + String(Math.max(0, data.nodes.length - 1)).padStart(2, '0');
    els.statusCount.textContent = '模块 ' + String(Math.max(0, data.nodes.length - 1)).padStart(2, '0') + ' / 连线 ' + String(data.edges.length).padStart(2, '0');
    els.statusSel.textContent = state.selectedNode ? '选中 / ' + nodeRef(state.selectedNode) : state.selectedEdge ? '连线 / ' + state.selectedEdge.slice(-4).toUpperCase() : '选中 / —';
    els.statusMode.textContent = '模式 / ' + (state.board.draft ? '接线' : '选择');
    els.undoBtn.disabled = !state.board.canUndo();
    els.redoBtn.disabled = !state.board.canRedo();
    els.partsFootText.textContent = state.level.code + ' · ' + Math.max(0, data.nodes.length - 1) + ' 个模块';
    renderSide();
    scheduleDraft();
  }

  function verify() {
    if (!state.level) return;
    refreshAll();
    var r = state.results;
    els.board.classList.remove('is-checking');
    void els.board.offsetWidth;
    els.board.classList.add('is-checking');
    setTimeout(function () { els.board.classList.remove('is-checking'); }, 900);
    if (r.complete) {
      completeLevel();
      return;
    }
    if (r.errors.length) {
      toast('还有 ' + r.errors.length + ' 个模块未通过局部检查', 'error');
      var first = r.errors[0];
      if (first) {
        state.panel = 'check';
        state.board.select(first.nodeId);
      }
      sfxFail();
      return;
    }
    if (r.target && r.target.state === 'error') {
      toast('最终断言与目标不一致', 'error');
      state.board.select('target');
      sfxFail();
      return;
    }
    toast('目标焊盘还没有接驳', 'error');
    state.board.select('target');
    sfxFail();
  }

  function completeLevel() {
    if (!state.level) return;
    var wasSolved = !!state.solved[state.level.id];
    state.solved[state.level.id] = true;
    delete state.drafts[state.level.id];
    persistDrafts();
    persistProgress();
    sfxWin();
    els.board.classList.add('is-verified');
    setTimeout(function () { els.board.classList.remove('is-verified'); }, 1800);
    state.won = true;
    var elapsed = Math.max(1, Math.round((Date.now() - state.levelStart) / 1000));
    var kinds = {};
    state.board.nodes.forEach(function (n) { if (n.kind !== 'target') kinds[n.kind] = true; });
    var rules = Object.keys(kinds).map(function (k) { return window.RSL.Engine.info(k).label; });
    var body = '' +
      '<div class="win">' +
        '<div class="win-badge"><span class="led" data-state="on"></span> PROOF VERIFIED</div>' +
        '<div class="win-formula formula">' + targetHTML(state.level.target) + '</div>' +
        '<p class="win-copy">' + (wasSolved ? '这块板再次通过检查。' : '目标断言已接驳。铜线连续，规则闭合。') + '</p>' +
        '<div class="win-stats">' +
          '<div><span>模块</span><b>' + Math.max(0, state.board.nodes.length - 1) + '</b></div>' +
          '<div><span>连线</span><b>' + state.board.edges.length + '</b></div>' +
          '<div><span>用时</span><b>' + Math.floor(elapsed / 60) + ':' + String(elapsed % 60).padStart(2, '0') + '</b></div>' +
          '<div><span>规则</span><b>' + unique(rules).length + '</b></div>' +
        '</div>' +
        '<div class="win-rules">' + unique(rules).map(function (r) { return '<span>' + esc(r) + '</span>'; }).join('') + '</div>' +
        (state.usedSolution ? '<p class="win-note">本次载入了参考电路；可以清空后自己再焊一遍。</p>' : '') +
        '<div class="win-actions">' +
          '<button class="btn btn-primary" data-action="next-level">' + (state.levelIndex + 1 >= levels().length ? '查看定理库' : '下一块板') + '<svg class="i"><use href="#i-arrow"/></svg></button>' +
          '<button class="btn btn-ghost" data-action="replay-level">留在本板</button>' +
          '<button class="btn btn-ghost" data-action="open-codex">定理库</button>' +
        '</div>' +
        '<div class="win-foot">' + esc(state.level.code) + ' · ' + esc(state.level.title) + ' · ' + esc(chapterOf(state.level.chapter).en || '') + '</div>' +
      '</div>';
    openSheet({ title: '线路通过', kicker: 'PROOF VERIFIED / 电气检查', body: body, className: 'sheet--win' });
  }

  /* ---------------- chrome ---------------- */

  function updateChrome() {
    if (!state.level) return;
    var lv = state.level;
    els.levelCode.textContent = lv.code;
    els.levelName.textContent = lv.title;
    els.targetFormula.innerHTML = targetHTML(lv.target);
    els.boardId.textContent = '板 ' + String(state.levelIndex + 1).padStart(2, '0');
    els.boardTitle.textContent = lv.title;
    els.boardSub.textContent = '证明层 / ' + chapterOf(lv.chapter).title;
    els.sideMeta.textContent = 'BENCH / ' + (state.panel === 'target' ? 'TARGET' : state.panel.toUpperCase());
    els.zoomVal.textContent = Math.round(state.board.view.scale * 100) + '%';
    updateSoundBtn();
    els.app.dataset.chapter = lv.chapter;
  }

  /* ---------------- parts ---------------- */

  function allParts() {
    var list = (window.RSL.PARTS || []).slice();
    if (window.RSL.PREDICATE_PARTS) list = list.concat(window.RSL.PREDICATE_PARTS());
    return list;
  }

  function ensureAllowedParts(allowed) {
    var parts = allParts();
    allowed.forEach(function (key) {
      if (key === 'target' || key === '__codex') return;
      if (parts.some(function (p) { return p.key === key; })) return;
      if (key.indexOf('theorem:') === 0) {
        var code = key.slice(8);
        var t = window.RSL.theoremData ? window.RSL.theoremData(code) : null;
        if (t) parts.push({ key: key, kind: 'theorem', group: 'theorem', symbol: code.replace('*', ''), name: '定理 ' + code, code: code, desc: t.formula, config: { theoremCode: code } });
      } else if (key.indexOf('axiom:') === 0) {
        var ax = (window.RSL.AXIOMS || []).filter(function (a) { return a.id === key.slice(6); })[0];
        if (ax) parts.push({ key: key, kind: 'axiom', group: 'axiom', symbol: ax.id, name: '公理 ' + ax.id.slice(1) + ' · ' + ax.name, code: ax.code, desc: ax.schema, config: { axiomId: ax.id } });
      } else if (key.indexOf('pred-axiom:') === 0) {
        var paxs = (window.RSL.PREDICATE && window.RSL.PREDICATE.axioms) || [];
        var pax = paxs.filter(function (a) { return a.id === key.slice(12); })[0];
        if (pax) parts.push({ key: key, kind: 'pred-axiom', group: 'predicate', symbol: pax.id, name: pax.name, code: pax.code, desc: pax.schema, config: { axiomId: pax.id } });
      }
    });
    return parts;
  }

  function partsForCurrentLevel() {
    var allowed = state.level.allowed || [];
    if (allowed.indexOf('*') === -1) return ensureAllowedParts(allowed);
    var parts = allParts().slice();
    var seen = {};
    parts.forEach(function (p) { seen[p.key] = true; });
    (window.RSL.THEOREMS || []).forEach(function (t) {
      var key = 'theorem:' + t.code;
      if (seen[key]) return;
      seen[key] = true;
      parts.push({
        key: key, kind: 'theorem', group: 'theorem', symbol: t.code.replace('*', ''),
        name: '定理 ' + t.code, code: t.code, desc: t.formula, accent: 'silver',
        config: { theoremCode: t.code }
      });
    });
    return parts;
  }

  function renderParts() {
    if (!state.level) return;
    var allowed = state.level.allowed || [];
    var parts = partsForCurrentLevel();
    var map = {};
    parts.forEach(function (p) { map[p.key] = p; });
    var visible = allowed.indexOf('*') === -1
      ? allowed.filter(function (k) { return k !== 'target'; }).map(function (k) { return map[k]; }).filter(Boolean)
      : parts.filter(function (p) { return p.key !== 'target'; });
    // Deduplicate
    var seen = {};
    visible = visible.filter(function (p) { if (seen[p.key]) return false; seen[p.key] = true; return true; });
    if (!visible.some(function (p) { return p.group === 'theorem'; }) && allowed.indexOf('__codex') === -1) {
      visible.push({ key: '__codex', kind: 'codex', group: 'theorem', symbol: '≡', name: '定理库', code: 'ARCHIVE', desc: '浏览 193 条 PM 定理与 Metamath 档案。', special: true });
    } else if (!visible.some(function (p) { return p.group === 'theorem'; })) {
      visible.push({ key: '__codex', kind: 'codex', group: 'theorem', symbol: '≡', name: '定理库', code: 'ARCHIVE', desc: '浏览 193 条 PM 定理与 Metamath 档案。', special: true });
    }
    var filter = state.partFilter;
    var q = state.partSearch.trim().toLowerCase();
    if (filter !== 'all') visible = visible.filter(function (p) { return p.group === filter; });
    if (q) {
      visible = visible.filter(function (p) {
        return (p.name + ' ' + p.code + ' ' + p.desc + ' ' + (p.symbol || '')).toLowerCase().indexOf(q) !== -1;
      });
    }
    var order = { build: 0, axiom: 1, rule: 2, theorem: 3, predicate: 4 };
    visible.sort(function (a, b) { return (order[a.group] == null ? 9 : order[a.group]) - (order[b.group] == null ? 9 : order[b.group]); });
    els.partsList.innerHTML = visible.map(function (p) {
      return '<button class="part-card' + (p.special ? ' part-codex' : '') + '" data-part="' + esc(p.key) + '" data-accent="' + esc(p.accent || 'copper') + '">' +
        '<span class="part-icon" aria-hidden="true">' + esc(p.symbol || '·') + '</span>' +
        '<span class="part-text"><span class="part-name">' + esc(p.name) + '</span>' +
        '<span class="part-desc">' + esc(p.desc || '') + '</span>' +
        '<span class="part-ref">' + esc(p.code || '') + '</span></span>' +
        '<span class="part-add" aria-hidden="true"><svg class="i"><use href="#i-plus"/></svg></span>' +
      '</button>';
    }).join('') || '<div class="empty-row">没有符合条件的元件</div>';
    els.partsMeta.textContent = 'PARTS / ' + String(visible.length).padStart(2, '0');
    els.partsFootText.textContent = state.level.code + ' · ' + visible.length + ' 个可用元件';
    var tabs = els.partsTabs.querySelectorAll('.tab');
    tabs.forEach(function (t) {
      var on = t.dataset.filter === state.partFilter;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  function addPart(key) {
    if (key === '__codex') { openCodex('theorems'); return; }
    var p = partsForCurrentLevel().filter(function (x) { return x.key === key; })[0];
    if (!p) return;
    if ((state.level.allowed || []).indexOf(key) === -1 && (state.level.allowed || []).indexOf('*') === -1) { toast('本关不提供这个元件'); return; }
    var cfg = Object.assign({}, p.config || {});
    if (p.kind === 'atom' && !cfg.name) cfg.name = 'P';
    if (p.kind === 'predicate') cfg = cfg;
    var n = state.board.addNode(p.kind, cfg, freeSpot());
    if (!n) return;
    state.selectedNode = n.id;
    state.panel = 'inspect';
    state.board.selectedNode = n.id;
    state.board.render();
    state.board.select(n.id);
    refreshAll();
    sfxClick();
    closeDrawers();
  }

  /* ---------------- side panel ---------------- */

  function sideFormula(text) {
    return '<div class="side-formula formula">' + targetHTML(text) + '</div>';
  }

  function renderSide() {
    if (!state.level) return;
    var tabs = els.sideTabs.querySelectorAll('.tab');
    tabs.forEach(function (t) {
      var on = t.dataset.panel === state.panel;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (state.selectedEdge) {
      state.panel = 'inspect';
      renderEdgeInspector();
      return;
    }
    if (state.selectedNode) {
      state.panel = 'inspect';
      renderNodeInspector(state.selectedNode);
      return;
    }
    if (state.panel === 'inspect') {
      els.sideTitle.textContent = '元件检查器';
      els.sideMeta.textContent = 'BENCH / INSPECT';
      els.sideBody.innerHTML = '<div class="inspector-empty"><span class="empty-kicker">NO SELECTION</span><strong>选择一个模块</strong><p>点击画布上的模块，查看它的规则、配置和局部校验结果。</p></div>';
      return;
    }
    if (state.panel === 'check') { renderCheck(); return; }
    renderTarget();
  }

  function renderTarget() {
    var lv = state.level;
    var result = state.results;
    var solved = !!state.solved[lv.id];
    els.sideTitle.textContent = '本关目标';
    els.sideMeta.textContent = 'BENCH / TARGET';
    var checks = [
      { on: state.board.nodes.length > 1, label: '放入元件' },
      { on: state.board.edges.length > 0, label: '接上铜线' },
      { on: state.board.nodes.length > 1 && result && result.errors.length === 0, label: '局部检查通过' },
      { on: result && result.complete, label: '目标已接驳' }
    ];
    var html = '' +
      '<div class="target-panel">' +
        '<div class="side-kicker">' + esc(chapterOf(lv.chapter).title + ' / ' + lv.title) + '</div>' +
        '<div class="target-panel-formula formula">' + targetHTML(lv.target) + '</div>' +
        '<p class="target-brief">' + esc(lv.brief || '') + '</p>' +
        (lv.note ? '<p class="target-note">' + esc(lv.note) + '</p>' : '') +
        (state.showHint && lv.hint ? '<div class="hint-card"><span class="hint-label">接线提示</span><p>' + esc(lv.hint) + '</p></div>' : '') +
        '<div class="checklist">' + checks.map(function (c) {
          return '<div class="checkline' + (c.on ? ' is-on' : '') + '"><span class="checkmark">' + (c.on ? '✓' : '·') + '</span><span>' + esc(c.label) + '</span></div>';
        }).join('') + '</div>' +
        '<div class="target-meta"><div><span>关卡</span><b>' + esc(lv.code) + '</b></div><div><span>类别</span><b>' + esc(chapterOf(lv.chapter).title) + '</b></div><div><span>状态</span><b>' + (solved ? '已通过' : '进行中') + '</b></div></div>' +
        '<div class="side-actions">' +
          '<button class="btn btn-primary" data-action="verify">校验电路<svg class="i"><use href="#i-bolt"/></svg></button>' +
          '<button class="btn btn-ghost" data-action="hint-toggle">' + (state.showHint ? '收起提示' : '看提示') + '</button>' +
          '<button class="btn btn-ghost" data-action="reset-level">清空</button>' +
        '</div>' +
        '<div class="teach-row">' + (lv.teaches || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
        '<div class="target-flow"><div class="side-label">信号流<span>FLOW</span></div><div class="flow-row"><span>取件</span><i>→</i><span>接线</span><i>→</i><span>校验</span></div></div>' +
      '</div>';
    els.sideBody.innerHTML = html;
  }

  function availablePartsHTML(lv) {
    var allowed = (lv.allowed || []).filter(function (k) { return k !== 'target' && k !== '__codex'; });
    var parts = allParts();
    var names = [];
    allowed.forEach(function (k) {
      var p = parts.filter(function (x) { return x.key === k; })[0];
      if (p) names.push({ sym: p.symbol || '·', name: p.name, code: p.code || '' });
      else if (k.indexOf('theorem:') === 0) names.push({ sym: 'T', name: '定理 ' + k.slice(8), code: k.slice(8) });
    });
    if (!names.length) return '';
    return '<div class="available-block">' +
      '<div class="side-label">本关可用元件<span>PARTS</span></div>' +
      '<div class="available-chips">' + names.map(function (n) {
        return '<span class="available-chip"><b>' + esc(n.sym) + '</b>' + esc(n.name) + '</span>';
      }).join('') + '</div>' +
      '<p class="source-line">来源 / ' + esc(chapterOf(lv.chapter).title) + ' · ' + esc(lv.code) + ' · Metamath 档案</p>' +
    '</div>';
  }

  function configSelect(key, options, current) {
    return '<select class="field-select" data-config="' + esc(key) + '">' + options.map(function (o) {
      var v = typeof o === 'string' ? o : o.v;
      var t = typeof o === 'string' ? o : o.t;
      return '<option value="' + esc(v) + '"' + (String(current) === String(v) ? ' selected' : '') + '>' + esc(t) + '</option>';
    }).join('') + '</select>';
  }

  function renderNodeInspector(id) {
    var n = state.board.node(id);
    if (!n) { state.selectedNode = null; renderTarget(); return; }
    var r = state.results && state.results.results[id];
    var info = window.RSL.Engine.info(n.kind);
    els.sideTitle.textContent = nodeRef(id) + ' · ' + info.label;
    els.sideMeta.textContent = 'BENCH / ' + (info.kindLabel || n.kind).toUpperCase();
    var stateText = !r ? '未计算' : r.state === 'valid' ? '局部通过' : r.state === 'error' ? '异常' : r.state === 'complete' ? '目标通过' : '等待输入';
    var statusClass = !r ? 'idle' : r.state;
    var cfg = n.config || {};
    var fields = '';
    if (n.kind === 'atom') {
      fields += '<label class="field"><span>原子命题</span>' + configSelect('name', ['P', 'Q', 'R', 'S', 'T'], cfg.name || 'P') + '</label>';
    } else if (n.kind === 'term') {
      fields += '<label class="field"><span>个体词</span>' + configSelect('name', ['x', 'y', 'z', 'a', 'b'], cfg.name || 'x') + '</label>';
    } else if (n.kind === 'pred') {
      fields += '<label class="field"><span>谓词符号</span>' + configSelect('name', ['F', 'G', 'H', 'R'], cfg.name || 'F') + '</label>';
      fields += '<label class="field"><span>论元</span>' + configSelect('arg', ['x', 'y', 'z', 'a'], cfg.arg || 'x') + '</label>';
    } else if (n.kind === 'axiom') {
      var allowedAxioms = (state.level.allowed || []).filter(function (k) { return k.indexOf('axiom:') === 0; }).map(function (k) { return k.slice(6); });
      var axiomOptions = (window.RSL.AXIOMS || []).filter(function (a) { return !allowedAxioms.length || allowedAxioms.indexOf(a.id) !== -1; }).map(function (a) { return { v: a.id, t: 'A' + a.id.slice(1) + ' · ' + a.name }; });
      if (axiomOptions.length > 1) {
        fields += '<label class="field"><span>原始命题</span>' + configSelect('axiomId', axiomOptions, cfg.axiomId || 'A1') + '</label>';
      } else {
        fields += '<div class="field"><span>原始命题</span><div class="readonly">' + esc((window.RSL.AXIOMS.filter(function (a) { return a.id === (cfg.axiomId || 'A1'); })[0] || {}).name || cfg.axiomId) + ' · ' + esc(cfg.axiomId || 'A1') + '</div></div>';
      }
    } else if (n.kind === 'theorem') {
      var th = window.RSL.theoremData ? window.RSL.theoremData(cfg.theoremCode) : null;
      fields += '<div class="field"><span>档案定理</span><div class="readonly">' + esc(cfg.theoremCode || '') + (th && th.name ? ' · ' + esc(th.name) : '') + '</div></div>';
      fields += '<button class="btn btn-ghost btn-small" data-action="open-codex">打开定理库</button>';
    } else if (n.kind === 'replace') {
      var opts = r && r.meta && r.meta.options ? r.meta.options : [];
      if (!opts.length) fields += '<p class="field-note">接入断言后，这里会列出可置换的定义式。</p>';
      else {
        fields += '<div class="field"><span>选择置换</span><div class="replace-options">' + opts.slice(0, 12).map(function (o) {
          return '<button class="replace-option' + (r.meta.optionId === o.id ? ' is-active' : '') + '" data-option-id="' + esc(o.id) + '">' +
            '<span class="replace-opt-head">' + esc(o.def) + ' · ' + (o.dir === 'expand' ? '展开' : '折叠') + '</span>' +
            '<span class="replace-opt-formula formula">' + formulaHTMLFromAst(o.result) + '</span></button>';
        }).join('') + '</div></div>';
      }
    } else if (n.kind === 'subst') {
      fields += '<div class="field"><span>代入映射</span><div class="readonly formula">' + (r && r.meta && r.meta.mapping ? esc(r.meta.mapping.atom) + ' := ' + formulaHTMLFromAst(r.meta.mapping.formula) : '等待三路输入') + '</div></div>';
    } else if (n.kind === 'quant') {
      fields += '<label class="field"><span>量词</span>' + configSelect('kind', [{ v: 'all', t: '∀ 全称' }, { v: 'exists', t: '∃ 存在' }], cfg.kind || 'all') + '</label>';
      fields += '<label class="field"><span>变元</span>' + configSelect('v', ['x', 'y', 'z'], cfg.v || 'x') + '</label>';
    } else if (n.kind === 'all-intro' || n.kind === 'exists-intro') {
      fields += '<label class="field"><span>变元</span>' + configSelect('v', ['x', 'y', 'z'], cfg.v || 'x') + '</label>';
    } else if (n.kind === 'all-elim' || n.kind === 'exists-elim') {
      fields += '<label class="field"><span>例化项 / 新变元</span>' + configSelect(n.kind === 'all-elim' ? 'term' : 'y', ['a', 'b', 'x', 'y', 'z'], (n.kind === 'all-elim' ? cfg.term : cfg.y) || (n.kind === 'all-elim' ? 'a' : 'y')) + '</label>';
    } else if (n.kind === 'pred-axiom') {
      var paxs = (window.RSL.PREDICATE && window.RSL.PREDICATE.axioms) || [];
      fields += '<label class="field"><span>谓词公理</span>' + configSelect('axiomId', paxs.map(function (a) { return { v: a.id, t: a.name }; }), cfg.axiomId) + '</label>';
    }
    var inn = state.board.edges.filter(function (e) { return e.to.node === id; });
    var out = state.board.edges.filter(function (e) { return e.from.node === id; });
    var html = '' +
      '<div class="inspector">' +
        '<div class="inspector-head">' +
          '<div><span class="side-kicker">' + esc(info.kindLabel || n.kind) + '</span><h3>' + esc(nodeTitle(id)) + '</h3></div>' +
          '<span class="status-pill" data-state="' + statusClass + '">' + esc(stateText) + '</span>' +
        '</div>' +
        '<div class="side-formula formula">' + (r && r.ast ? formulaHTMLFromAst(r.ast) : n.kind === 'target' ? targetHTML(n.target) : '<span class="formula-placeholder">等待输入</span>') + '</div>' +
        (r && r.note ? '<p class="inspector-note">' + esc(r.note) + '</p>' : '') +
        (r && r.error ? '<p class="inspector-error">' + esc(r.error) + '</p>' : '') +
        (r && r.state === 'error' ? '<p class="inspector-fix">检查：输入焊盘是否接对，或从右侧改选一个规则/定义。</p>' : '') +
        '<p class="inspector-help">' + esc(info.help || '') + '</p>' +
        fields +
        '<div class="net-list">' +
          '<div class="net-head">输入</div>' + (inn.length ? inn.map(function (e) { return '<button class="net-row" data-select-node="' + esc(e.from.node) + '"><span>' + esc(nodeRef(e.from.node)) + '</span><span>' + esc(nodeTitle(e.from.node)) + '</span></button>'; }).join('') : '<div class="net-empty">— 未接线</div>') +
          '<div class="net-head">输出</div>' + (out.length ? out.map(function (e) { return '<button class="net-row" data-select-node="' + esc(e.to.node) + '"><span>' + esc(nodeRef(e.to.node)) + '</span><span>' + esc(nodeTitle(e.to.node)) + '</span></button>'; }).join('') : '<div class="net-empty">— 未接线</div>') +
        '</div>' +
        '<div class="side-actions">' +
          (n.kind !== 'target' ? '<button class="btn btn-ghost btn-small" data-action="duplicate-node">复制</button><button class="btn btn-danger btn-small" data-action="delete-node">删除</button>' : '') +
        '</div>' +
      '</div>';
    els.sideBody.innerHTML = html;
  }

  function renderEdgeInspector() {
    var e = state.board.edges.filter(function (x) { return x.id === state.selectedEdge; })[0];
    if (!e) { state.selectedEdge = null; renderTarget(); return; }
    els.sideTitle.textContent = '检查铜线';
    els.sideMeta.textContent = 'BENCH / NET';
    els.sideBody.innerHTML = '' +
      '<div class="inspector"><div class="inspector-head"><div><span class="side-kicker">NET</span><h3>' + esc(e.id) + '</h3></div><span class="status-pill" data-state="valid">已接驳</span></div>' +
      '<div class="edge-flow"><span>' + esc(nodeRef(e.from.node)) + '<b>' + esc(nodeTitle(e.from.node)) + '</b></span><svg class="i"><use href="#i-arrow"/></svg><span>' + esc(nodeRef(e.to.node)) + '<b>' + esc(nodeTitle(e.to.node)) + '</b></span></div>' +
      '<p class="inspector-help">一根铜线把一个输出焊盘接到一个输入焊盘。输出可以扇出，输入只接收一根线。</p>' +
      '<div class="side-actions"><button class="btn btn-danger btn-small" data-action="delete-edge">删除连线</button></div></div>';
  }

  function formulaHTMLFromAst(ast) {
    if (!ast || !L) return '';
    var full = fullHTML(ast);
    if (full) return full;
    try { return L.toHTML(ast); } catch (e) { return esc(L.fmt ? L.fmt(ast) : ''); }
  }

  function renderCheck() {
    var r = state.results;
    els.sideTitle.textContent = '电路检查';
    els.sideMeta.textContent = 'BENCH / CHECK';
    var errors = r ? r.errors : [];
    var html = '<div class="check-panel">';
    if (!errors.length && r && r.complete) {
      html += '<div class="check-success"><span class="led" data-state="on"></span><strong>全部通过</strong><p>目标断言已接驳，可以交板。</p></div>';
    } else if (!errors.length) {
      html += '<div class="check-info"><span class="led" data-state="idle"></span><strong>局部检查通过</strong><p>把最后一个输出接到目标焊盘，再点校验。</p></div>';
    } else {
      html += '<div class="check-info error"><span class="led" data-state="error"></span><strong>' + errors.length + ' 个模块异常</strong><p>点击条目定位模块。</p></div>';
    }
    if (errors.length) {
      html += '<div class="error-list">' + errors.map(function (e) {
        return '<button class="error-row" data-select-node="' + esc(e.nodeId) + '"><span class="error-node">' + esc(nodeRef(e.nodeId)) + '</span><span class="error-msg">' + esc(e.message) + '</span></button>';
      }).join('') + '</div>';
    }
    var counts = {};
    (state.board.nodes || []).forEach(function (n) { if (n.kind !== 'target') counts[window.RSL.Engine.info(n.kind).label] = (counts[window.RSL.Engine.info(n.kind).label] || 0) + 1; });
    html += '<div class="check-stats"><div><span>模块</span><b>' + Math.max(0, state.board.nodes.length - 1) + '</b></div><div><span>连线</span><b>' + state.board.edges.length + '</b></div><div><span>可用规则</span><b>' + Object.keys(counts).length + '</b></div></div>';
    html += '<div class="side-actions"><button class="btn btn-primary" data-action="verify">再次校验</button><button class="btn btn-ghost" data-action="open-codex">查看规则</button></div></div>';
    els.sideBody.innerHTML = html;
  }

  /* ---------------- sheet system ---------------- */

  function openSheet(opts) {
    state.lastSheet = { title: opts.title, kicker: opts.kicker, body: opts.body, className: opts.className };
    els.sheetTitle.textContent = opts.title;
    els.sheetKicker.textContent = opts.kicker || 'SHEET';
    els.sheetBody.innerHTML = opts.body;
    els.sheet.className = 'sheet ' + (opts.className || '');
    if (opts.wide) els.sheet.classList.add('sheet-wide');
    els.overlay.hidden = false;
    els.overlay.classList.add('is-open');
    els.overlay.setAttribute('aria-hidden', 'false');
    state.sheetOpen = true;
    els.sheetBody.scrollTop = 0;
    setTimeout(function () { els.sheetClose.focus({ preventScroll: true }); }, 30);
  }

  function closeSheet() {
    if (els.overlay.hidden) return;
    els.levelBtn.setAttribute('aria-expanded', 'false');
    els.overlay.classList.remove('is-open');
    state.sheetOpen = false;
    setTimeout(function () {
      if (!els.overlay.classList.contains('is-open')) {
        els.overlay.hidden = true;
        els.overlay.setAttribute('aria-hidden', 'true');
      }
    }, 180);
    if (!state.started) {
      // stay on boot
    }
  }

  function openLevelDrawer() {
    var list = levels();
    var solvedCount = Object.keys(state.solved).length;
    var chapters = window.RSL.CHAPTERS || [];
    var body = '<div class="level-drawer">' +
      '<div class="archive-summary"><div><span class="side-kicker">CIRCUIT INDEX</span><strong>' + solvedCount + ' / ' + list.length + ' 块板通过</strong></div><div class="summary-bar"><span style="width:' + Math.round(solvedCount / Math.max(1, list.length) * 100) + '%"></span></div></div>';
    chapters.forEach(function (ch) {
      var lvls = list.map(function (lv, i) { return { lv: lv, i: i }; }).filter(function (x) { return x.lv.chapter === ch.id; });
      if (!lvls.length) return;
      var solved = lvls.filter(function (x) { return state.solved[x.lv.id]; }).length;
      body += '<section class="chapter-block"><div class="chapter-head"><div><span class="chapter-code">' + esc(ch.code) + '</span><h3>' + esc(ch.title) + '</h3><p>' + esc(ch.blurb) + '</p></div><span class="chapter-count">' + solved + ' / ' + lvls.length + '</span></div><div class="level-grid">';
      lvls.forEach(function (x) {
        var lv = x.lv, i = x.i;
        var solvedOne = !!state.solved[lv.id];
        var unlocked = isUnlocked(i);
        var current = i === state.levelIndex;
        var stateName = solvedOne ? 'solved' : unlocked ? (current ? 'current' : 'open') : 'locked';
        body += '<button class="level-card" data-level="' + i + '" data-state="' + stateName + '"' + (unlocked ? '' : ' disabled aria-disabled="true"') + '>' +
          '<div class="level-card-top"><span class="level-card-code">' + esc(lv.code) + '</span><span class="level-card-state">' + (solvedOne ? 'PASS' : unlocked ? (current ? 'NOW' : 'OPEN') : 'LOCK') + '</span></div>' +
          '<h4>' + esc(lv.title) + '</h4>' +
          '<div class="level-card-formula formula">' + formulaHTML(lv.target) + '</div>' +
          '<div class="level-card-foot"><span>' + esc(chapterOf(lv.chapter).title) + '</span><span>' + esc(lv.kicker ? lv.kicker.split('/')[0].trim() : '') + '</span></div>' +
        '</button>';
      });
      body += '</div></section>';
    });
    body += '<div class="drawer-foot"><span>点击已解锁的板进入 · 已通过的板可以重做</span><button class="btn btn-ghost btn-small" data-action="open-codex">定理库 193</button></div></div>';
    openSheet({ title: '关卡索引', kicker: 'CIRCUIT INDEX / 电路总览', body: body, className: 'sheet--level' });
    els.levelBtn.setAttribute('aria-expanded', 'true');
  }

  /* ---------------- codex ---------------- */

  var CODEX_TABS = [
    { id: 'guide', label: '操作' },
    { id: 'symbols', label: '符号' },
    { id: 'formation', label: '形成规则' },
    { id: 'definitions', label: '定义' },
    { id: 'axioms', label: '公理' },
    { id: 'rules', label: '变形' },
    { id: 'theorems', label: '定理库' },
    { id: 'predicate', label: '谓词层' },
    { id: 'metamath', label: 'Metamath' }
  ];

  function openCodex(tab, keepDetail) {
    if (tab) { state.codexTab = tab; if (!keepDetail) state.theoremCode = null; }
    var body = '<div class="codex">' +
      '<div class="codex-tabs" role="tablist">' + CODEX_TABS.map(function (t) {
        return '<button class="codex-tab' + (state.codexTab === t.id ? ' is-active' : '') + '" data-codex-tab="' + t.id + '" role="tab" aria-selected="' + (state.codexTab === t.id) + '">' + esc(t.label) + '</button>';
      }).join('') + '</div><div class="codex-body" id="codexBody">' + codexBody() + '</div></div>';
    openSheet({ title: '手册与定理库', kicker: 'CODEX / PM + METAMATH', body: body, className: 'sheet--codex', wide: true });
    if (state.codexTab === 'theorems' && !state.theoremCode) renderTheoremList();
  }

  function codexBody() {
    var tab = state.codexTab;
    if (tab === 'guide') return guideBody();
    if (tab === 'symbols') return symbolsBody();
    if (tab === 'formation') return formationBody();
    if (tab === 'definitions') return definitionsBody();
    if (tab === 'axioms') return axiomsBody();
    if (tab === 'rules') return rulesBody();
    if (tab === 'theorems') return state.theoremCode ? theoremDetailBody(state.theoremCode) : theoremIndexBody();
    if (tab === 'predicate') return predicateBody();
    if (tab === 'metamath') return metamathBody();
    return '';
  }

  function guideBody() {
    return '<div class="codex-prose">' +
      '<p class="lede">一块空板、四条原始命题。每个模块只执行一条规则；把输出焊盘拖到输入焊盘，最后接到目标。</p>' +
      '<div class="guide-steps">' +
        '<div class="guide-step"><span class="guide-num">01</span><h3>取件</h3><p>从左侧元件库点击一枚公理、原子、合成门或规则模块。它会落在画布的空位上。</p></div>' +
        '<div class="guide-step"><span class="guide-num">02</span><h3>接线</h3><p>从模块右侧的铜色输出焊盘按下，拖到另一个模块左侧的金色输入焊盘。也可以先点输出、再点输入（触屏更稳）。输入只接一根线，输出可以扇出。</p></div>' +
        '<div class="guide-step"><span class="guide-num">03</span><h3>配置</h3><p>点击模块，在右侧检查器改原子字母、定义置换方向或量词。替换模块会列出当前断言里所有可置换的位置。</p></div>' +
        '<div class="guide-step"><span class="guide-num">04</span><h3>校验</h3><p>接到目标焊盘后点“校验电路”。每个模块都通过局部检查，且最终断言与目标定义等价，才算交板。</p></div>' +
      '</div>' +
      '<h3>画布操作</h3>' +
      '<table class="key-table"><tbody>' +
        '<tr><td>拖动空白</td><td>平移画布</td></tr><tr><td>滚轮 / + −</td><td>缩放</td></tr><tr><td>F / 适应按钮</td><td>框住全部模块</td></tr>' +
        '<tr><td>Ctrl+Z / Ctrl+Y</td><td>撤销 / 重做</td></tr><tr><td>Delete</td><td>删除选中的模块或连线</td></tr><tr><td>双击模块</td><td>聚焦该模块</td></tr>' +
      '</tbody></table>' +
      '<div class="notice"><strong>数学说明</strong><p>前四关使用《数学原理》*1.2–*1.5 的四条原始命题。档案定理（如 *2.14）是已经证成的历史结果，作为封装模块接入；它们不是在这里从四条公理重新证明的。Metamath 的 PM 证明记录提供了编号、步数与证明带。</p></div>' +
      '</div>';
  }

  function symbolsBody() {
    var rows = [
      ['A, B, C …', '命题变元 / 原子命题', '大写英文字母；图式中可被代入。'],
      ['¬', '否定', '一元联结词；¬A 读作“非 A”。'],
      ['∨', '析取', '二元联结词；A∨B 读作“A 或 B”。'],
      ['( )', '括号', '决定结合方式；合成模块自动补全。'],
      ['⊢', '断言符', '写在公式前，表示该公式是可证的。'],
      ['→', '蕴涵', '定义 D1：A→B 即 ¬A∨B。'],
      ['∧', '合取', '定义 D2：A∧B 即 ¬(¬A∨¬B)。'],
      ['↔', '等值', '定义 D3：(A→B)∧(B→A)。']
    ];
    var pred = window.RSL.PREDICATE;
    if (pred && pred.symbols) pred.symbols.forEach(function (s) { rows.push([s.glyph, s.name, s.desc || '']); });
    return '<div class="codex-prose"><p class="lede">初始符号与定义符号。定义不是新公理，只是把长公式写成短记法。</p><table class="symbol-table"><thead><tr><th>符号</th><th>名称</th><th>说明</th></tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><td class="sym">' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td><td>' + esc(r[2]) + '</td></tr>'; }).join('') +
      '</tbody></table></div>';
  }

  function formationBody() {
    return '<div class="codex-prose"><p class="lede">合式公式由下面的规则有限次生成。合成模块输出时自动补全括号。</p>' +
      '<ol class="rule-list">' +
      '<li><span class="rule-code">F1</span><div><strong>原子</strong><p>符号 π 是合式公式（π 取值为 A、B、C……）。</p></div></li>' +
      '<li><span class="rule-code">F2</span><div><strong>析取</strong><p>如果 A、B 是合式公式，那么 A∨B 也是合式公式。</p></div></li>' +
      '<li><span class="rule-code">F3</span><div><strong>否定</strong><p>如果 A 是合式公式，那么 ¬A 也是合式公式。</p></div></li>' +
      '<li><span class="rule-code">F4</span><div><strong>封闭</strong><p>只有符合 F1–F3 的符号序列才是合式公式。</p></div></li>' +
      '</ol>' +
      '<div class="formula-band"><span class="formula">' + formulaHTML('(P∨Q)→(¬R∨P)') + '</span><span class="formula-caption">一个合式公式：每一步都由 F1–F3 生成。</span></div>' +
      '<p class="small-note">→、∧、↔ 是定义符号；它们在显示上可以直接出现，但校验时会展开到 ¬ 与 ∨。</p></div>';
  }

  function definitionsBody() {
    var defs = window.RSL.DEFINITIONS || [];
    return '<div class="codex-prose"><p class="lede">三个定义式可以双向置换。置换规则允许在任意位置把一个定义式换写成另一个方向。</p><div class="definition-grid">' +
      defs.map(function (d) {
        return '<div class="definition-card"><div class="definition-head"><span class="definition-code">' + esc(d.code) + '</span><span class="definition-id">' + esc(d.id) + '</span></div><h3>' + esc(d.name) + '</h3><div class="definition-formula formula">' + formulaHTML(d.lhs) + '<span class="def-arrow">:=</span>' + formulaHTML(d.rhs) + '</div><p>' + esc(d.gloss) + '</p></div>';
      }).join('') + '</div><div class="notice"><strong>置换不是证明新定理</strong><p>它只改变记法。D1 展开前后是同一个断言，因此可以从 A 得到定义等价的 B。</p></div></div>';
  }

  function axiomsBody() {
    var ax = window.RSL.AXIOMS || [];
    return '<div class="codex-prose"><p class="lede">初始只有四条原始命题。它们是公理图式：大写字母可以被任意合式公式代入。</p><div class="axiom-list">' +
      ax.map(function (a) {
        return '<div class="axiom-row"><div class="axiom-tag"><span>' + esc(a.id) + '</span><em>' + esc(a.code) + '</em></div><div class="axiom-content"><h3>' + esc(a.name) + ' <span>' + esc(a.en) + '</span></h3><div class="formula">' + targetHTML(a.schema) + '</div><p>' + esc(a.gloss) + '</p><small>' + esc(a.note) + '</small></div></div>';
      }).join('') + '</div>' +
      '<div class="notice"><strong>第五条去哪儿了？</strong><p>《数学原理》还有 *1.6 结合律等原始命题。本作的第一章严格采用截图中的四条作为初始公理；后续内容以“档案定理”的方式接入已证结果，不伪造从四条公理出发的完整证明。</p></div></div>';
  }

  function rulesBody() {
    return '<div class="codex-prose"><p class="lede">三种变形规则，分别对应画布上的三个模块。每次推演只做一件事。</p>' +
      '<div class="rule-block"><span class="rule-code">R1</span><div><h3>代入规则</h3><p>将合式公式 A 中出现的某一个符号 π 到处都换成合式公式 B，得到 A[π/B]。如果 ⊢A，则 ⊢A[π/B]。</p><div class="formula">' + formulaHTML('⊢A  ⟹  ⊢A[π/B]') + '</div></div></div>' +
      '<div class="rule-block"><span class="rule-code">R2</span><div><h3>分离规则</h3><p>如果 ⊢A，且 ⊢A→B，则 ⊢B。</p><div class="formula">' + formulaHTML('⊢A, ⊢A→B  ⟹  ⊢B') + '</div></div></div>' +
      '<div class="rule-block"><span class="rule-code">R3</span><div><h3>定义置换</h3><p>定义的左右两方可以互相替换。设公式 A 置换后为公式 B；如果 ⊢A，则 ⊢B。</p><div class="formula">' + formulaHTML('⊢A  ⟹  ⊢B') + '</div></div></div>' +
      '<p class="small-note">代入模块的三个输入：断言 A、原子 π、公式 B。分离模块的两个输入顺序任意。置换模块会在检查器里列出所有可选位置。</p></div>';
  }

  function theoremIndexBody() {
    var list = window.RSL.THEOREMS || [];
    return '<div class="codex-prose theorem-index">' +
      '<div class="theorem-lede"><div><span class="side-kicker">PRINCIPIA MATHEMATICA · PROPOSITIONAL CALCULUS</span><h3>193 条命题</h3><p>Metamath 的 PM 定理索引。点击任意一条查看公式与证明带；在允许的关卡里可以把定理接入画布。</p></div><div class="theorem-total"><b>' + list.length + '</b><span>records</span></div></div>' +
      '<div class="theorem-search"><svg class="i"><use href="#i-search"/></svg><input id="theoremSearch" type="search" placeholder="搜索编号、名称或公式，如 *2.14、DeM、¬¬" value="' + esc(state.theoremQuery) + '" aria-label="搜索定理"><span id="theoremCount">' + list.length + '</span></div>' +
      '<div id="theoremList" class="theorem-list"></div>' +
      '<p class="small-note">来源：Metamath Solitaire 的 <a href="https://us.metamath.org/mmsolitaire/pmproofs-orig.txt" target="_blank" rel="noopener">pmproofs-orig.txt</a>。证明带使用不同的公理基（ax-1–ax-3 + MP）；在本作中这些定理是档案模块，不是从本作四条公理重新推导的。</p></div>';
  }

  function theoremRow(t) {
    var meta = window.RSL.theoremData ? window.RSL.theoremData(t.code) : t;
    return '<button class="theorem-row" data-theorem-code="' + esc(t.code) + '">' +
      '<span class="th-code">' + esc(t.code) + '</span>' +
      '<span class="th-name">' + esc((meta && meta.name) || t.name || '—') + '</span>' +
      '<span class="th-formula formula">' + formulaHTML(t.formula, t.formula) + '</span>' +
      '<span class="th-steps">' + esc(t.steps || '—') + '</span>' +
    '</button>';
  }

  function renderTheoremList() {
    var host = $('theoremList');
    if (!host) return;
    var list = window.RSL.THEOREMS || [];
    var q = state.theoremQuery.trim().toLowerCase();
    var filtered = list.filter(function (t) {
      if (!q) return true;
      return (t.code + ' ' + (t.name || '') + ' ' + (t.formula || '')).toLowerCase().indexOf(q) !== -1;
    });
    host.innerHTML = filtered.length ? filtered.map(theoremRow).join('') : '<div class="empty-row">没有匹配的定理</div>';
    var count = $('theoremCount');
    if (count) count.textContent = filtered.length + ' / ' + list.length;
  }

  function theoremDetailBody(code) {
    var t = window.RSL.theoremData ? window.RSL.theoremData(code) : (window.RSL.THEOREMS || []).filter(function (x) { return x.code === code; })[0];
    if (!t && window.RSL.ARCHIVE_FALLBACK) t = window.RSL.ARCHIVE_FALLBACK[code];
    if (!t) return '<div class="empty-row">找不到这条定理</div>';
    var allowedKey = 'theorem:' + code;
    var allowed = state.level && ((state.level.allowed || []).indexOf(allowedKey) !== -1 || (state.level.allowed || []).indexOf('*') !== -1);
    var tape = proofTape(t.proof || '');
    return '<div class="theorem-detail">' +
      '<button class="btn btn-ghost btn-small" data-codex-back>← 返回定理列表</button>' +
      '<div class="theorem-detail-head"><div><span class="side-kicker">PM ' + esc(code) + '</span><h2>' + esc(t.name || '档案定理') + '</h2></div><span class="theorem-steps">' + esc(t.steps || '?') + ' steps</span></div>' +
      '<div class="detail-formula formula">' + targetHTML(t.formula) + '</div>' +
      '<div class="proof-tape-wrap"><div class="proof-tape-head"><span>证明带 / CONDENSED DETACHMENT</span><span>' + (t.proof ? t.proof.length + ' tokens' : 'no tape') + '</span></div><div class="proof-tape">' + (tape.length ? tape.map(function (x) { return '<span class="tape-token" data-k="' + x.kind + '" title="' + esc(x.label) + '">' + esc(x.token) + '</span>'; }).join('') : '<span class="tape-empty">—</span>') + '</div><div class="proof-tape-legend"><span><i data-k="ax"></i>原始命题</span><span><i data-k="mp"></i>分离</span><span>从左到右为波兰式压缩记录</span></div></div>' +
      '<div class="theorem-actions">' +
        (allowed ? '<button class="btn btn-primary btn-small" data-add-theorem="' + esc(code) + '">接入本关画布<svg class="i"><use href="#i-plus"/></svg></button>' : '<span class="disabled-note">本关不提供这条定理模块</span>') +
        '<a class="btn btn-ghost btn-small" href="https://us.metamath.org/mmsolitaire/pmproofs-orig.txt" target="_blank" rel="noopener">在 Metamath 查看原始记录</a>' +
      '</div>' +
      '<p class="small-note">证明带仅作为档案可视化，不在本作执行。这里的公式是 PM 命题陈述；Metamath 的证明基于 ax-1、ax-2、ax-3 与 ax-mp。</p>' +
    '</div>';
  }

  function proofTape(proof) {
    if (!proof) return [];
    if (window.RSL.METAMATH && typeof window.RSL.METAMATH.proofTape === 'function') {
      try {
        return window.RSL.METAMATH.proofTape(proof).map(function (x) {
          return { token: x.token, kind: x.kind === 'detach' ? 'mp' : 'ax', label: x.label, index: x.index };
        });
      } catch (e) { /* fall through */ }
    }
    return proof.split('').map(function (ch, i) {
      var kind = ch === 'D' ? 'mp' : 'ax';
      var label = ch === 'D' ? 'ax-mp（分离）' : ch === '1' ? 'ax-1' : ch === '2' ? 'ax-2' : ch === '3' ? 'ax-3' : ch;
      return { token: ch, kind: kind, label: label, index: i };
    });
  }

  function predicateBody() {
    var P = window.RSL.PREDICATE;
    if (!P) return '<div class="empty-row">谓词层数据未加载</div>';
    return '<div class="codex-prose"><p class="lede">' + esc(P.intro || '谓词演算把命题拆成个体、谓词与量词。') + '</p>' +
      '<div class="symbol-table-wrap"><table class="symbol-table"><thead><tr><th>符号</th><th>名称</th><th>说明</th></tr></thead><tbody>' +
      (P.symbols || []).map(function (s) { return '<tr><td class="sym">' + esc(s.glyph) + '</td><td>' + esc(s.name) + '</td><td>' + esc(s.desc || '') + '</td></tr>'; }).join('') + '</tbody></table></div>' +
      '<h3>谓词公理与规则</h3><div class="axiom-list compact">' +
      (P.axioms || []).map(function (a) { return '<div class="axiom-row"><div class="axiom-tag"><span>' + esc(a.id) + '</span><em>' + esc(a.code || '') + '</em></div><div class="axiom-content"><h3>' + esc(a.name) + '</h3><div class="formula">' + targetHTML(a.schema) + '</div><p>' + esc(a.note || '') + '</p></div></div>'; }).join('') +
      '</div>' +
      '<div class="rule-list compact">' + (P.rules || []).map(function (r) { return '<li><span class="rule-code">' + esc(r.id) + '</span><div><strong>' + esc(r.name) + '</strong><p>' + esc(r.note || '') + '</p></div></li>'; }).join('') + '</div>' +
      '<p class="small-note">谓词层的引用以《数学原理》相应章节与 Metamath 档案为准；本作不声称覆盖完整的谓词演算证明论。</p></div>';
  }

  function metamathBody() {
    var M = window.RSL.METAMATH;
    var families = (M && M.families) || [
      { title: 'Metamath Proof Explorer', tagline: 'ZFC 集合论', description: '从 ZFC 集合论公理构造数学，包含 40,000+ 条已校验证明。', url: 'https://us.metamath.org/mpeuni/mmset.html', badge: '40,000+' },
      { title: 'Intuitionistic Logic Explorer', tagline: '直觉主义', description: '从构造性逻辑公理出发的数学，排中律不在其中。', url: 'https://us.metamath.org/ileuni/mmset.html', badge: 'INT' },
      { title: 'New Foundations Explorer', tagline: 'Quine NF', description: '从 Quine 的 New Foundations 集合论公理构造数学。', url: 'https://us.metamath.org/nfeuni/mmset.html', badge: 'NF' },
      { title: 'Higher-Order Logic Explorer', tagline: 'HOL', description: '从简单类型论 / 高阶逻辑出发，推导与 ZFC 等价的数学。', url: 'https://us.metamath.org/holuni/mmset.html', badge: 'HOL' }
    ];
    var highlights = (M && M.highlightTheorems) || [
      { code: '*2.08', name: 'Id', formula: 'P→P', steps: 5, note: '同一律。' },
      { code: '*2.14', name: 'DN−', formula: '¬¬P→P', steps: 17, note: '双重否定消去。' }
    ];
    return '<div class="codex-prose"><div class="atlas-head"><div><span class="side-kicker">METAMATH ATLAS</span><h3>不止一块板</h3><p>Metamath 用一台极小的证明校验器，把数学拆成可机器检查的线路。本作的 PM 档案只是其中一层。</p></div><span class="atlas-seal">MM</span></div>' +
      '<div class="atlas-grid">' + families.map(function (f) {
        return '<a class="atlas-card" href="' + esc(f.url) + '" target="_blank" rel="noopener"><div class="atlas-top"><span class="atlas-badge">' + esc(f.badge || 'MM') + '</span><span class="atlas-arrow">↗</span></div><h4>' + esc(f.title) + '</h4><em>' + esc(f.tagline || '') + '</em><p>' + esc(f.description || '') + '</p></a>';
      }).join('') + '</div>' +
      '<h3>档案切片</h3><div class="atlas-highlights">' + highlights.map(function (t) {
        return '<button class="atlas-theorem" data-theorem-code="' + esc(t.code) + '"><span class="th-code">' + esc(t.code) + '</span><span class="formula">' + formulaHTML(t.formula) + '</span><span class="th-steps">' + esc(t.steps) + '</span></button>';
      }).join('') + '</div>' +
      '<div class="notice"><strong>为什么只能看，不能全接？</strong><p>Metamath 的不同 Explorer 使用不同公理基。本作把 PM 命题演算的 193 条记录做成可浏览、可接入的档案；其余馆藏以 Atlas 方式链接，避免把不同系统的公理混在同一块板上。</p></div>' +
      '<p class="small-note">链接指向 us.metamath.org；运行时不请求网络。</p></div>';
  }

  /* ---------------- drawer / mobile ---------------- */

  function openDrawer(panel, preserve) {
    closeDrawers();
    els.drawerScrim.hidden = false;
    requestAnimationFrame(function () { els.drawerScrim.classList.add('is-on'); });
    els.app.classList.add('drawer-open');
    if (panel === 'parts') els.partsPanel.classList.add('is-open');
    if (panel === 'side') els.sidePanel.classList.add('is-open');
    if (panel === 'side' && !preserve) { state.panel = 'target'; state.selectedNode = null; state.selectedEdge = null; renderSide(); }
  }
  function closeDrawers() {
    els.partsPanel.classList.remove('is-open');
    els.sidePanel.classList.remove('is-open');
    els.app.classList.remove('drawer-open');
    els.drawerScrim.classList.remove('is-on');
    setTimeout(function () { if (!els.drawerScrim.classList.contains('is-on')) els.drawerScrim.hidden = true; }, 190);
  }

  /* ---------------- toast ---------------- */

  var toastTimer = null;
  function toast(msg, type, duration) {
    clearTimeout(toastTimer);
    els.toast.textContent = msg;
    els.toast.className = 'toast is-on' + (type ? ' toast-' + type : '');
    els.live.textContent = msg;
    toastTimer = setTimeout(function () { els.toast.classList.remove('is-on'); }, duration || 2800);
  }

  /* ---------------- events ---------------- */

  function bindEvents() {
    els.startBtn.addEventListener('click', startGame);
    els.bootCodexBtn.addEventListener('click', function () { openCodex('guide'); });
    els.levelBtn.addEventListener('click', openLevelDrawer);
    els.brandBtn.addEventListener('click', function (e) { e.preventDefault(); openLevelDrawer(); });
    els.verifyBtn.addEventListener('click', verify);
    els.mVerifyBtn.addEventListener('click', verify);
    els.codexBtn.addEventListener('click', function () { openCodex(state.codexTab || 'guide'); });
    els.mCodexBtn.addEventListener('click', function () { openCodex('guide'); });
    els.inspectorBtn.addEventListener('click', function () { openDrawer('side'); });
    els.helpBtn.addEventListener('click', function () { openCodex('guide'); });
    els.soundBtn.addEventListener('click', function () {
      state.sound = !state.sound;
      updateSoundBtn(); persistProgress();
      if (state.sound) { ensureAudio(); sfxClick(); }
    });
    els.undoBtn.addEventListener('click', function () { state.board.undo(); });
    els.redoBtn.addEventListener('click', function () { state.board.redo(); });
    els.zoomInBtn.addEventListener('click', function () { state.board.zoom(1); });
    els.zoomOutBtn.addEventListener('click', function () { state.board.zoom(-1); });
    els.fitBtn.addEventListener('click', function () { state.board.fit(); });
    els.cleanBtn.addEventListener('click', function () { state.board.autoLayout(); toast('已按信号流整理电路'); });
    els.closeParts.addEventListener('click', closeDrawers);
    els.closeSide.addEventListener('click', closeDrawers);
    els.drawerScrim.addEventListener('click', closeDrawers);
    els.mPartsBtn.addEventListener('click', function () { openDrawer('parts'); });
    els.mTargetBtn.addEventListener('click', function () { openDrawer('side'); });
    els.sheetClose.addEventListener('click', closeSheet);
    els.overlay.addEventListener('click', function (e) { if (e.target.closest('[data-close-overlay]')) closeSheet(); });
    els.hintBtn.addEventListener('click', function () {
      state.showHint = !state.showHint;
      state.panel = 'target';
      state.selectedNode = null;
      state.selectedEdge = null;
      state.board.selectedNode = null;
      state.board.selectedEdge = null;
      state.board.render();
      renderSide();
    });
    els.solutionBtn.addEventListener('click', loadSolution);

    els.partsTabs.addEventListener('click', function (e) {
      var tab = e.target.closest('.tab');
      if (!tab) return;
      state.partFilter = tab.dataset.filter;
      renderParts();
    });
    els.partSearch.addEventListener('input', function () { state.partSearch = els.partSearch.value; renderParts(); });
    els.partsList.addEventListener('click', function (e) {
      var card = e.target.closest('.part-card');
      if (!card) return;
      addPart(card.dataset.part);
    });

    els.sideTabs.addEventListener('click', function (e) {
      var tab = e.target.closest('.tab');
      if (!tab) return;
      state.panel = tab.dataset.panel;
      if (state.panel !== 'inspect') { state.selectedNode = null; state.selectedEdge = null; state.board.selectedNode = null; state.board.selectedEdge = null; state.board.render(); }
      renderSide();
    });

    els.sideBody.addEventListener('click', function (e) {
      var opt = e.target.closest('[data-option-id]');
      if (opt && state.selectedNode) {
        var id = opt.dataset.optionId;
        state.board.updateConfig(state.selectedNode, { optionId: id, preferDef: '', preferDir: '', preferPath: null }, true);
        refreshAll();
        sfxClick();
        return;
      }
      var sel = e.target.closest('[data-select-node]');
      if (sel) { state.board.select(sel.dataset.selectNode); return; }
      var action = e.target.closest('[data-action]');
      if (!action) return;
      var a = action.dataset.action;
      if (a === 'verify') verify();
      else if (a === 'hint-toggle') { state.showHint = !state.showHint; renderSide(); }
      else if (a === 'reset-level') resetLevel();
      else if (a === 'delete-node' && state.selectedNode) {
        var nid = state.selectedNode;
        if (state.board.removeNode(nid)) { state.selectedNode = null; state.panel = 'target'; refreshAll(); toast('模块已移除'); sfxClick(); }
      } else if (a === 'duplicate-node' && state.selectedNode) {
        var n2 = state.board.duplicateNode(state.selectedNode);
        if (n2) { state.board.select(n2.id); refreshAll(); toast('模块已复制'); }
      } else if (a === 'delete-edge' && state.selectedEdge) {
        state.board.removeEdge(state.selectedEdge); state.selectedEdge = null; state.panel = 'target'; refreshAll(); toast('连线已移除');
      } else if (a === 'open-codex') openCodex('theorems');
      else if (a === 'next-level') { closeSheet(); nextLevel(); }
      else if (a === 'replay-level') { closeSheet(); resetLevel(); }
    });

    els.sideBody.addEventListener('change', function (e) {
      var field = e.target.closest('[data-config]');
      if (!field || !state.selectedNode) return;
      var key = field.dataset.config;
      var patch = {};
      patch[key] = field.value;
      // Clear manual replacement preference so the explicit choice wins.
      if (state.board.node(state.selectedNode) && state.board.node(state.selectedNode).kind === 'replace') patch.optionId = null;
      state.board.updateConfig(state.selectedNode, patch, true);
      refreshAll();
      sfxClick();
    });

    els.sheetBody.addEventListener('click', function (e) {
      var tab = e.target.closest('[data-codex-tab]');
      if (tab) { state.codexTab = tab.dataset.codexTab; state.theoremCode = null; openCodex(state.codexTab); return; }
      var back = e.target.closest('[data-codex-back]');
      if (back) { state.theoremCode = null; openCodex('theorems'); return; }
      var lvl = e.target.closest('[data-level]');
      if (lvl && !lvl.disabled) { loadLevel(parseInt(lvl.dataset.level, 10)); return; }
      var th = e.target.closest('[data-theorem-code]');
      if (th && !e.target.closest('[data-add-theorem]')) {
        state.theoremCode = th.dataset.theoremCode;
        state.codexTab = 'theorems';
        openCodex('theorems', true);
        return;
      }
      var add = e.target.closest('[data-add-theorem]');
      if (add) {
        var code = add.dataset.addTheorem;
        var key = 'theorem:' + code;
        if (!state.level || ((state.level.allowed || []).indexOf(key) === -1 && (state.level.allowed || []).indexOf('*') === -1)) { toast('本关不提供这条定理'); return; }
        var n = state.board.addNode('theorem', { theoremCode: code }, freeSpot());
        closeSheet();
        if (n) { state.board.select(n.id); state.selectedNode = n.id; state.panel = 'inspect'; refreshAll(); toast('定理 ' + code + ' 已接入'); sfxConnect(); }
        return;
      }
      var action = e.target.closest('[data-action]');
      if (!action) return;
      if (action.dataset.action === 'next-level') { closeSheet(); nextLevel(); }
      else if (action.dataset.action === 'replay-level') { closeSheet(); resetLevel(); }
      else if (action.dataset.action === 'open-codex') openCodex('theorems');
    });

    els.sheetBody.addEventListener('input', function (e) {
      if (e.target.id === 'theoremSearch') {
        state.theoremQuery = e.target.value;
        renderTheoremList();
      }
    });

    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) closeDrawers();
      if (state.board) state.board._updateWires();
    });
  }

  function onKey(e) {
    if (state.sheetOpen) {
      if (e.key === 'Escape') closeSheet();
      return;
    }
    if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return;
    var meta = e.ctrlKey || e.metaKey;
    if (meta && e.key.toLowerCase() === 'z') { e.preventDefault(); if (e.shiftKey) state.board.redo(); else state.board.undo(); return; }
    if (meta && e.key.toLowerCase() === 'y') { e.preventDefault(); state.board.redo(); return; }
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (state.selectedNode || state.selectedEdge) { e.preventDefault(); state.board.removeSelected(); state.selectedNode = null; state.selectedEdge = null; state.panel = 'target'; refreshAll(); }
      return;
    }
    if (e.key === '+' || e.key === '=') { state.board.zoom(1); return; }
    if (e.key === '-') { state.board.zoom(-1); return; }
    if (e.key.toLowerCase() === 'f') { state.board.fit(); return; }
    if (e.key === 'Escape') { closeDrawers(); }
  }

  /* ---------------- init ---------------- */

  function cacheEls() {
    ['app', 'boot', 'startBtn', 'bootCodexBtn', 'levelBtn', 'brandBtn', 'levelCode', 'levelName', 'targetFormula', 'targetState',
      'soundBtn', 'inspectorBtn', 'codexBtn', 'helpBtn', 'verifyBtn', 'partsPanel', 'partsTabs', 'partsList', 'partsMeta', 'partSearch',
      'partsFootText', 'closeParts', 'board', 'boardWorld', 'wireLayer', 'nodeLayer', 'boardId', 'boardTitle', 'boardSub',
      'boardEmpty', 'boardLed', 'boardHudText', 'hudNet', 'sidePanel', 'sideTitle', 'sideMeta', 'sideTabs', 'sideBody',
      'closeSide', 'hintBtn', 'solutionBtn', 'undoBtn', 'redoBtn', 'zoomInBtn', 'zoomOutBtn', 'zoomVal', 'fitBtn', 'cleanBtn',
      'statusMode', 'statusSel', 'statusCount', 'statusCoord', 'toast', 'live', 'overlay', 'sheet', 'sheetTitle', 'sheetKicker',
      'sheetBody', 'sheetClose', 'drawerScrim', 'mPartsBtn', 'mTargetBtn', 'mCodexBtn', 'mVerifyBtn',
      'mobileDock'].forEach(function (id) { els[id] = $(id); });
    els.mobileDock = document.querySelector('.mobile-dock');
  }

  function init() {
    cacheEls();
    window.RSL.formatFormula = fullHTML;
    try {
      if (window.toy && typeof window.toy.available === 'function' && window.toy.available()) {
        document.documentElement.classList.add('is-toy');
      }
    } catch (e) { /* ordinary browser */ }
    loadProgress();
    updateSoundBtn();
    if (!L) {
      showBootError('逻辑引擎未加载：请确认 src/logic.js 存在。');
      return;
    }
    state.board = new window.RSL.Board({
      board: els.board,
      world: els.boardWorld,
      wireLayer: els.wireLayer,
      nodeLayer: els.nodeLayer,
      onChange: function () { refreshAll(); },
      onSelect: function (nodeId, edgeId) {
        state.selectedNode = nodeId;
        state.selectedEdge = edgeId;
        if (nodeId || edgeId) {
          state.panel = 'inspect';
          if (window.innerWidth <= 1100) openDrawer('side', true);
        }
        refreshAll();
      },
      onToast: function (msg) { toast(msg, 'error'); }
    });
    state.board.onView = function (v) { if (els.zoomVal) els.zoomVal.textContent = Math.round(v.scale * 100) + '%'; };
    state.board.onHistory = function (h) { els.undoBtn.disabled = !h.undo; els.redoBtn.disabled = !h.redo; };
    bindEvents();
    levels();
    // Boot screen shows until the player starts. Keep a valid empty board behind it.
    state.board.setData([], []);
    els.verifyBtn.disabled = false;
    els.undoBtn.disabled = true;
    els.redoBtn.disabled = true;
    if (state.sound) updateSoundBtn();
    window.RSL.APP = { state: state, loadLevel: loadLevel, loadSolution: loadSolution, openCodex: openCodex, verify: verify, startGame: startGame };
    var q = new URLSearchParams(location.search);
    if (q.get('autostart') === '1') {
      setTimeout(function () {
        startGame();
        if (q.get('level')) {
          for (var qi = 0; qi < levels().length; qi++) {
            if (levels()[qi].id === q.get('level')) { loadLevel(qi, { force: true }); break; }
          }
        }
        if (q.get('solution') === '1') setTimeout(loadSolution, 120);
      }, 80);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();










