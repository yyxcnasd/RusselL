/*!
 * 公理板 / AXIOM BOARD — 应用层（RSL.APP）
 *
 * 职责：游戏状态与存档、主题/声音设置、关卡流程、底板接线、调色板拖放、
 * 参数弹层、全局事件与启动。界面面板块在 screens.js，DOM 基础件在 ui.js。
 */
(function () {
  'use strict';
  window.RSL = window.RSL || {};
  var SAVE = window.RSL.Save;
  var ACH = window.RSL.Achievements;
  var UI = window.RSL.UI;
  var Audio = window.RSL.Audio;
  var Coach = window.RSL.Coach;
  var Catalog = window.RSL.Catalog;
  var Screens = window.RSL.Screens;

  var state = {
    levels: [],
    level: null,
    index: 0,
    solved: {},
    bestLen: {},
    usedKinds: {},
    usedArchive: {},
    usedTheorem: {},
    cleanWins: {},
    circuits: {},
    deletedThisLevel: false,
    achievements: {},
    coachSeen: {},
    board: null,
    results: null,
    selectedNode: null,
    selectedEdge: null,
    lastId: null,
    forceUnlock: false,
    hintDismissed: false,
    sound: true,
    theme: 'light',
    parts: [],
    proof: null,
    referenceIndex: 0,
    referenceNode: null
  };
  var els = null;
  var paletteHold = null;

  /* =========================================================================
   * 1. 存档
   * ========================================================================= */

  function loadProgress() {
    var empty = {
      solved: {}, bestLen: {}, usedKinds: {}, usedArchive: {}, usedTheorem: {},
      cleanWins: {}, circuits: {}, achievements: {}, coachSeen: {}, lastId: null
    };
    var p;
    try { p = SAVE.clean(SAVE.load()); }
    catch (e) {
      Object.keys(empty).forEach(function (k) { state[k] = empty[k]; });
      return;
    }
    function setOf(list) {
      var map = {};
      (list || []).forEach(function (k) { map[k] = true; });
      return map;
    }
    state.solved = setOf(p.solved);
    state.bestLen = p.bestLen || {};
    state.usedKinds = setOf(p.usedKinds);
    state.usedArchive = setOf(p.usedArchive);
    state.usedTheorem = setOf(p.usedTheorem);
    state.cleanWins = setOf(p.cleanWins);
    state.circuits = p.circuits || {};
    state.achievements = setOf(p.achievements);
    state.coachSeen = setOf(p.coachSeen);
    state.lastId = p.lastId || null;
  }

  function saveProgress() { SAVE.store(SAVE.payload(state)); }

  function exportSave() {
    var data = SAVE.payload(state);
    data.exportedAt = new Date().toISOString();
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'russell-save-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    a.parentNode.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function importSave(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = SAVE.clean(JSON.parse(String(reader.result || '')));
        SAVE.store(data);
        UI.toast('已导入');
        setTimeout(function () { window.location.reload(); }, 650);
      } catch (e) {
        UI.toast('存档不对');
      }
    };
    reader.readAsText(file);
  }

  /* =========================================================================
   * 2. 设置与主题
   * ========================================================================= */

  function loadSettings() {
    try {
      var s = JSON.parse(localStorage.getItem('axiom-simple:settings') || '{}');
      state.sound = s.sound !== false;
      state.theme = s.theme === 'dark' ? 'dark' : 'light';
    } catch (e) {
      state.sound = true;
      state.theme = 'light';
    }
  }
  function saveSettings() {
    try {
      localStorage.setItem('axiom-simple:settings', JSON.stringify({ sound: state.sound, theme: state.theme }));
    } catch (e) {}
  }

  function applyTheme() {
    document.documentElement.dataset.theme = state.theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', state.theme === 'dark' ? '#151311' : '#f7f2e7');
    if (els.themeBtn) {
      els.themeBtn.innerHTML = '<svg class="icon"><use href="#i-' + (state.theme === 'dark' ? 'sun' : 'moon') + '"></use></svg>';
      els.themeBtn.setAttribute('aria-label', state.theme === 'dark' ? '切换浅色模式' : '切换深色模式');
      els.themeBtn.setAttribute('aria-pressed', state.theme === 'dark' ? 'true' : 'false');
    }
  }

  function updateSoundBtn() {
    if (!els.soundBtn) return;
    els.soundBtn.classList.toggle('is-muted', !state.sound);
    els.soundBtn.innerHTML = '<svg class="icon"><use href="#i-' + (state.sound ? 'speaker-wave' : 'speaker-x-mark') + '"></use></svg>';
    els.soundBtn.setAttribute('aria-label', state.sound ? '关闭音乐' : '开启音乐');
    els.soundBtn.setAttribute('aria-pressed', state.sound ? 'true' : 'false');
  }

  /* =========================================================================
   * 3. 进度与成就
   * ========================================================================= */

  function updateProgress() {
    var total = state.levels.length || 1;
    var solved = state.levels.filter(function (lv) { return state.solved[lv.id]; }).length;
    if (els.progressFill) els.progressFill.style.width = (solved / total * 100) + '%';
  }

  function unlockAchievement(id) {
    if (state.achievements[id]) return false;
    var achievement = ACH.byId[id];
    if (!achievement) return false;
    state.achievements[id] = true;
    Audio.sfx('win');
    UI.toast(achievement.name);
    saveProgress();
    return true;
  }

  function checkAchievements() {
    ACH.evaluate(state).forEach(function (id) { unlockAchievement(id); });
  }

  /* =========================================================================
   * 4. 关卡流程
   * ========================================================================= */

  function buildLevels() { state.levels = Catalog.build(); }

  function isUnlocked(index) { return Catalog.isUnlocked(state, state.levels, index); }

  function freeSpot() {
    var nodes = state.board.items || [];
    var view = state.board.view;
    var left = -view.x / view.scale + 30;
    var top = -view.y / view.scale + 30;
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

  /* 载入关卡：普通关与重放关走同一条路径。
     初始图/元件来自关卡数据（targetTokens / palette / initialNodes / solution），
     proof 只是重放关的证明数据（参考提示与 mmstep 求值），不是另一套流程。 */
  function loadLevel(index) {
    if (index < 0 || index >= state.levels.length) return;
    if (!isUnlocked(index)) { UI.toast('先完成前一关'); return; }
    UI.closeSheet();
    clearPaletteHold();
    Coach.hide();
    state.deletedThisLevel = false;
    state.hintDismissed = false;
    state.index = index;
    state.level = state.levels[index];
    state.selectedNode = null;
    state.selectedEdge = null;

    var level = state.level;
    var proof = proofOf(level);
    state.proof = proof;
    state.referenceIndex = 0;
    state.referenceNode = {};
    state.parts = paletteParts(level);

    var hasReference = !!(level.reference && level.reference.length);
    if (els.hintBtn) els.hintBtn.style.display = hasReference ? '' : 'none';
    if (els.tray) els.tray.classList.toggle('is-wide', hasReference);
    /* 大图用简单正交折线，小图仍走 A* 避障：按预计节点数而不是关卡类型决定。 */
    var planSize = (level.reference && level.reference.length)
      || (proof && proof.steps && proof.steps.length)
      || (level.solution ? level.solution.nodes.length : 0);
    state.board.simpleWires = planSize > 60;

    var mobile = window.innerWidth <= 700;
    var saved = state.circuits[level.id];
    var savedNodes = [];
    var savedEdges = [];
    if (saved && Array.isArray(saved.nodes) && Array.isArray(saved.edges)) {
      saved.nodes.forEach(function (n) {
        if (n && n.kind && n.kind !== 'target') savedNodes.push(JSON.parse(JSON.stringify(n)));
      });
      savedEdges = JSON.parse(JSON.stringify(saved.edges));
    }

    var tokens = targetTokensOf(level);
    var nodes, edges, tx = 0, ty = 0;
    if (savedNodes.length) {
      /* 重进已通关关卡：目标焊盘放到存档电路右侧，避免窄屏上与节点重叠。 */
      var maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      savedNodes.forEach(function (n) {
        maxX = Math.max(maxX, n.x + 232);
        minY = Math.min(minY, n.y);
        maxY = Math.max(maxY, n.y + 140);
      });
      tx = maxX + 340;
      ty = UI.clamp((minY + maxY) / 2 - 52, 120, 720);
      nodes = [{ id: 'target', kind: 'target', x: tx, y: ty, target: level.target || '', targetTokens: tokens, config: {} }].concat(savedNodes);
      edges = savedEdges;
    } else if (Array.isArray(level.initialNodes) && level.initialNodes.length) {
      nodes = JSON.parse(JSON.stringify(level.initialNodes));
      edges = [];
      nodes.forEach(function (n) {
        if (n.kind === 'target') { n.target = n.target || level.target || ''; n.targetTokens = n.targetTokens || tokens; }
      });
    } else {
      tx = mobile ? 250 : (level.targetPos ? level.targetPos.x : 900);
      ty = mobile ? 300 : (level.targetPos ? level.targetPos.y : 300);
      nodes = [{ id: 'target', kind: 'target', x: tx, y: ty, target: level.target || '', targetTokens: tokens, config: {} }];
      edges = [];
    }
    state.board.setData(nodes, edges);

    els.goalFormula.innerHTML = tokens ? UI.goalTokens(tokens) : UI.esc(level.targetUnicode || level.target || '');
    var plain = level.targetUnicode || els.goalFormula.textContent || '';
    els.goal.classList.toggle('is-long', String(plain).length > 52);
    var no = hasReference
      ? 'M' + String(level.chapterOrder || level.order || 0).padStart(2, '0')
      : String(index + 1).padStart(2, '0');
    els.levelBtn.textContent = no;
    els.levelBtn.setAttribute('aria-label', '第 ' + no + ' 关，选择关卡');
    els.popover.hidden = true;
    buildTray();
    state.board.result = null;
    refresh();

    var width = state.board.board.clientWidth || 1000;
    var height = state.board.board.clientHeight || 600;
    if (savedNodes.length) {
      state.board.fit({ minScale: 0.32 });
      if (mobile) ensureTargetVisible(tx, ty, 160, 104);
    } else if (hasReference) {
      /* 参考电路可能有 20 多列：整图 fit 会缩到看不清，用 minScale 兜底；参考推进时自动跟焦。 */
      state.board.fit({ minScale: 0.3 });
    } else if (mobile) {
      var scale = UI.clamp((width - 34) / 410, 0.5, 0.72);
      state.board.setView(18, 26, scale);
    } else {
      var desktopScale = UI.clamp((width - 120) / (tx + 280), 0.62, 1.0);
      var viewX = width - 60 - (tx + 232) * desktopScale;
      var viewY = Math.max(40, (height - 220) / 2 - ty * desktopScale * 0.15);
      viewX = Math.min(viewX, width - 24 - (tx + 176) * desktopScale);
      viewY = Math.min(viewY, height - 24 - (ty + 130) * desktopScale);
      state.board.setView(viewX, viewY, desktopScale);
    }
    els.coach.hidden = !(index === 0 && state.board.items.length <= 1 && !state.hintDismissed);
    saveProgress();
    maybeShowCoach(state.level);
  }

  /* 把当前视图夹到“目标焊盘完整可见”的范围内，同时尽量保留 fit() 的取景。 */
  function ensureTargetVisible(tx, ty, targetW, targetH) {
    var board = state.board;
    var width = board.board.clientWidth || 1000;
    var height = board.board.clientHeight || 600;
    var v = board.view, s = v.scale, margin = 16;
    var minX = margin - tx * s;
    var maxX = width - margin - (tx + targetW) * s;
    var minY = margin - ty * s;
    var maxY = height - margin - (ty + targetH) * s;
    function between(value, lo, hi) { return lo > hi ? (lo + hi) / 2 : UI.clamp(value, lo, hi); }
    var nextX = between(v.x, minX, maxX);
    var nextY = between(v.y, minY, maxY);
    if (nextX !== v.x || nextY !== v.y) board.setView(nextX, nextY, s);
  }

  function buildTray() {
    var VARIABLES = { atom: 1, pred: 1, term: 1 };
    var SYMBOLS = { not: 1, imp: 1, or: 1, and: 1, iff: 1, quant: 1 };
    els.tray.innerHTML = state.parts.map(function (part) {
      var symbol = part.symbol || '·';
      var variant = VARIABLES[part.kind] ? ' is-var' : (SYMBOLS[part.kind] ? ' is-symbol' : ' is-code');
      var long = variant === ' is-code' && symbol.length > 3 ? ' is-long' : '';
      return '<button class="tile' + variant + long + '" data-key="' + UI.esc(part.key) + '" title="' + UI.esc(part.name) +
        '" aria-label="' + UI.esc(part.name) + '"><span>' + UI.esc(symbol) + '</span></button>';
    }).join('');
  }

  function refresh() {
    if (!state.level) return;
    var data = state.board.getData();
    var ctx = state.proof ? { proof: state.proof } : null;
    var result = window.RSL.Engine.evaluate(state.level, data.nodes, data.edges, ctx);
    state.results = result;
    state.board.paint(result);
    els.coach.hidden = !(state.index === 0 && data.nodes.length <= 1 && !state.hintDismissed);
    els.checkBtn.classList.toggle('is-ready', result.complete);
    renderPopover();
    saveProgress();
  }

  function maybeShowCoach(level) {
    if (!level.coach || state.coachSeen[level.id] || !Coach.has(level.coach)) return;
    state.coachSeen[level.id] = true;
    saveProgress();
    Coach.showKind(level.coach);
  }

  /* =========================================================================
   * 5. 调色板（点击放置 + 拖放）
   * ========================================================================= */

  function palettePart(key) {
    return state.parts.filter(function (x) { return x.key === key; })[0] || null;
  }

  function addPart(key) {
    var part = palettePart(key);
    if (!part) return;
    var pos = freeSpot();
    Audio.sfx('place');
    var node = state.board.addNode(part.kind, Object.assign({}, part.config || {}), pos);
    state.board.select(node.id);
    state.selectedNode = node.id;
    state.selectedEdge = null;
    refresh();
  }

  function ghostAt(x, y) {
    if (!paletteHold) return;
    paletteHold.ghost.style.left = x + 'px';
    paletteHold.ghost.style.top = y + 'px';
    paletteHold.ghost.style.setProperty('--ghost-scale', state.board.view.scale);
  }

  function clearPaletteHold() {
    if (!paletteHold) return;
    if (paletteHold.ghost && paletteHold.ghost.parentNode) paletteHold.ghost.parentNode.removeChild(paletteHold.ghost);
    document.removeEventListener('pointermove', paletteMove);
    document.removeEventListener('pointerup', paletteUp, true);
    paletteHold = null;
    document.body.classList.remove('is-holding');
  }

  function paletteMove(e) {
    if (!paletteHold) return;
    if (Math.abs(e.clientX - paletteHold.sx) + Math.abs(e.clientY - paletteHold.sy) > 5) paletteHold.dragging = true;
    ghostAt(e.clientX, e.clientY);
  }

  function paletteUp(e) {
    if (!paletteHold) return;
    if (paletteHold.dragging) {
      if (!placePaletteAt(e.clientX, e.clientY)) {
        UI.toast('放不下');
        clearPaletteHold();
      }
      return;
    }
    paletteHold.sticky = true;
    document.removeEventListener('pointerup', paletteUp, true);
  }

  function palettePlacePos(cx, cy, part) {
    var rect = els.board.getBoundingClientRect();
    var edge = 24;
    if (cx < rect.left - edge || cx > rect.right + edge || cy < rect.top - edge || cy > rect.bottom + edge) return null;
    var p = state.board._client(cx, cy);
    var x = Math.round((p.x - 116) / 16) * 16;
    var y = Math.round((p.y - 50) / 16) * 16;
    var probe = { id: '__palette__', kind: part.kind };
    var offsets = [[0, 0], [0, 32], [32, 0], [-32, 0], [0, 64], [64, 0], [32, 32], [-32, 32], [0, 96]];
    for (var i = 0; i < offsets.length; i++) {
      var px = x + offsets[i][0];
      var py = y + offsets[i][1];
      if (!state.board._overlaps(probe, px, py)) return { x: px, y: py };
    }
    return null;
  }

  function placePaletteAt(cx, cy) {
    if (!paletteHold) return false;
    var part = paletteHold.part;
    var pos = palettePlacePos(cx, cy, part);
    if (!pos) return false;
    Audio.sfx('place');
    var node = state.board.addNode(part.kind, Object.assign({}, part.config || {}), pos);
    state.board.select(node.id);
    state.selectedNode = node.id;
    state.selectedEdge = null;
    clearPaletteHold();
    refresh();
    return true;
  }

  function substExtras(config) {
    if (!config) return 0;
    var n = typeof config.groups === 'number' ? config.groups : (config.dual ? 1 : 0);
    return Math.max(0, Math.min(4, n));
  }
  function substPortVisible(id, extras) {
    var m = /^(atom|formula)(\d+)$/.exec(id);
    if (!m) return true;
    return Number(m[2]) <= 1 + extras;
  }

  function makeModuleGhost(part) {
    var info = window.RSL.Engine.info(part.kind) || { ports: { inputs: [], outputs: [] } };
    var ins = (info.ports.inputs || []);
    if (part.kind === 'subst') {
      var ghostExtras = substExtras(part.config);
      ins = ins.filter(function (p) { return substPortVisible(p.id, ghostExtras); });
    }
    if (part.kind === 'mmstep') {
      ins = ins.slice(0, Math.max(0, Math.min(ins.length, (part.config && part.config.arity) || 0)));
    }
    var outs = (info.ports.outputs || []);
    var config = part.config || {};
    var code = state.board._code({ kind: part.kind, config: config }) || part.symbol || '·';
    var formula = '<span class="blank">·</span>';
    try {
      var preview = window.RSL.Engine.evaluate(state.level, [{ id: '__ghost', kind: part.kind, x: 0, y: 0, config: config }], [], state.proof ? { proof: state.proof } : null);
      var result = preview.results && preview.results.__ghost;
      if (result && result.tokens && window.RSL.Term) {
        formula = window.RSL.Term.toNodeHTML(result.tokens);
      }
    } catch (e) {}
    var minHeight = Math.max(96, 47 + Math.max(0, ins.length - 1) * 32 + 29);
    var el = document.createElement('article');
    el.className = 'node module-ghost';
    el.style.width = '232px';
    el.style.minHeight = minHeight + 'px';
    el.style.setProperty('--ghost-scale', state.board.view.scale);
    el.innerHTML =
      '<div class="node-top"><span class="node-code">' + UI.esc(code) + '</span></div>' +
      '<div class="node-formula formula">' + formula + '</div>' +
      ins.map(function (p, i) {
        var role = (part.kind === 'subst' && /^atom/.test(p.id)) ? 'atom' : p.type;
        return '<span class="port port-in" data-port="' + UI.esc(p.id) + '" data-role="' + UI.esc(role) + '" style="top:' + (47 + i * 32) + 'px"></span>';
      }).join('') +
      outs.map(function (p) {
        var role = part.kind === 'atom' ? 'atom' : p.type;
        return '<span class="port port-out" data-port="' + UI.esc(p.id) + '" data-role="' + UI.esc(role) + '" style="top:47px"></span>';
      }).join('');
    return el;
  }

  function startPaletteHold(e, tile) {
    if (e.button !== 0) return;
    e.preventDefault();
    clearPaletteHold();
    var part = palettePart(tile.dataset.key);
    if (!part) return;
    var ghost = makeModuleGhost(part);
    document.body.appendChild(ghost);
    paletteHold = { part: part, ghost: ghost, sx: e.clientX, sy: e.clientY, dragging: false, sticky: false };
    document.body.classList.add('is-holding');
    ghostAt(e.clientX, e.clientY);
    document.addEventListener('pointermove', paletteMove);
    document.addEventListener('pointerup', paletteUp, true);
  }

  /* =========================================================================
   * 6. 模块参数弹层
   * ========================================================================= */

  /* 原子命题固定按 P–Z、A–O 排列：P/Q/R/S/T 在视觉最前，U…Z 紧随其后。
     关卡里只使用 PQRSTUVWXYZABC 这 14 个命题变元。 */
  var ATOM_CHOICES = 'PQRSTUVWXYZABC'.split('');
  function atomChoices() { return ATOM_CHOICES; }

  function renderPopover() {
    var node = state.selectedNode ? state.board.node(state.selectedNode) : null;
    els.popover.classList.toggle('is-grid', !!node && node.kind === 'atom');
    if (!node || node.kind === 'target') { els.popover.hidden = true; return; }
    var result = state.results && state.results.results[node.id];
    var config = node.config || {};
    var html = '';
    if (node.kind === 'atom') {
      html = '<div class="letter-grid">' + atomChoices().map(function (x) {
        return '<button class="opt opt-var' + (config.name === x ? ' is-on' : '') + '" data-config="name" data-value="' + x + '">' + x + '</button>';
      }).join('') + '</div>';
    } else if (node.kind === 'replace' && result && result.meta && result.meta.options) {
      html = result.meta.options.slice(0, 8).map(function (o) {
        var inner = o.tokens && window.RSL.Term ? window.RSL.Term.toHTML(o.tokens, { full: true }) : '';
        return '<button class="opt formula-opt' + (result.meta.optionId === o.id ? ' is-on' : '') + '" data-option="' + UI.esc(o.id) + '">' + inner + '</button>';
      }).join('');
    } else if (node.kind === 'quant') {
      html = '<button class="opt opt-sym' + (config.kind === 'all' ? ' is-on' : '') + '" data-config="kind" data-value="all">∀</button>' +
        '<button class="opt opt-sym' + (config.kind === 'exists' ? ' is-on' : '') + '" data-config="kind" data-value="exists">∃</button>' +
        '<span class="opt-gap"></span>' + ['x', 'y', 'z'].map(function (v) {
          return '<button class="opt opt-var' + (config.v === v ? ' is-on' : '') + '" data-config="v" data-value="' + v + '">' + v + '</button>';
        }).join('');
    } else if (node.kind === 'pred') {
      html = ['F', 'G', 'H'].map(function (x) {
        return '<button class="opt opt-code' + (config.name === x ? ' is-on' : '') + '" data-config="name" data-value="' + x + '">' + x + '</button>';
      }).join('') + '<span class="opt-gap"></span>' + ['x', 'y', 'z'].map(function (v) {
        return '<button class="opt opt-var' + (config.arg === v ? ' is-on' : '') + '" data-config="arg" data-value="' + v + '">' + v + '</button>';
      }).join('');
    } else if (node.kind === 'subst') {
      var extras = substExtras(config);
      html = (extras >= 1
        ? '<button class="opt opt-minus" data-config="removeGroup" data-value="1" aria-label="减少一组代入" title="减少一组代入">−</button>'
        : '') +
        (extras < 4
          ? '<button class="opt opt-plus" data-config="dual" data-value="1" aria-label="加一组代入" title="加一组代入">＋</button>'
          : '');
    } else if (node.kind === 'all-elim') {
      html = ['a', 'b', 'c', 'x', 'y', 'z'].map(function (v) {
        return '<button class="opt opt-var' + (config.term === v ? ' is-on' : '') + '" data-config="term" data-value="' + v + '">' + v + '</button>';
      }).join('');
    } else if (node.kind === 'all-intro' || node.kind === 'exists-intro') {
      html = ['x', 'y', 'z'].map(function (v) {
        return '<button class="opt opt-var' + (config.v === v ? ' is-on' : '') + '" data-config="v" data-value="' + v + '">' + v + '</button>';
      }).join('');
    } else if (node.kind === 'exists-elim') {
      html = ['y', 'z'].map(function (v) {
        return '<button class="opt opt-var' + (config.y === v ? ' is-on' : '') + '" data-config="y" data-value="' + v + '">' + v + '</button>';
      }).join('');
    }
    if (!html) { els.popover.hidden = true; els.popover.classList.remove('is-grid'); return; }
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

  /* =========================================================================
   * 7. 校验与通关
   * ========================================================================= */

  function check() {
    var result = state.results;
    if (!result) return;
    if (result.complete) { win(); return; }
    Audio.sfx('fail');
    if (result.errors && result.errors.length) {
      var msg = result.errors[0].message || '还没接完';
      UI.toast(msg.length > 32 ? msg.slice(0, 32) + '…' : msg);
      return;
    }
    if (result.target && result.target.state === 'error') { UI.toast('不对'); return; }
    UI.toast('接到 ⊢');
  }

  function win() {
    var level = state.level;
    if (!level) return;
    var previousBest = state.bestLen[level.id];
    state.solved[level.id] = true;
    var items = (state.board.items || []).filter(function (n) { return n.kind !== 'target'; });
    /* 工作模块：不含关卡自带的给定前提（mmhyp）；普通关没有这种节点，计数不变。 */
    var work = items.filter(function (n) { return n.kind !== 'mmhyp'; });
    var len = work.length;
    items.forEach(function (n) {
      state.usedKinds[n.kind] = true;
      if (n.kind === 'archive') state.usedArchive[level.id] = true;
      if (n.kind === 'theorem') state.usedTheorem[level.id] = true;
    });
    if (!state.deletedThisLevel) state.cleanWins[level.id] = true;
    if (!state.circuits[level.id] || !previousBest || len < previousBest) {
      var data = state.board.getData();
      state.circuits[level.id] = {
        nodes: data.nodes.filter(function (n) { return n.kind !== 'target'; }).map(function (n) {
          var copy = JSON.parse(JSON.stringify(n));
          delete copy._new;
          return copy;
        }),
        edges: JSON.parse(JSON.stringify(data.edges)).map(function (e) {
          delete e._new;
          return e;
        })
      };
    }
    if (!state.bestLen[level.id] || len < state.bestLen[level.id]) state.bestLen[level.id] = len;
    saveProgress();
    checkAchievements();
    Audio.sfx('win');
    updateProgress();
    els.levelBtn.classList.remove('just-solved');
    void els.levelBtn.offsetWidth;
    els.levelBtn.classList.add('just-solved');
    setTimeout(function () { els.levelBtn.classList.remove('just-solved'); }, 520);

    var isLast = state.index >= state.levels.length - 1;
    var reference = (level.solution && level.solution.nodes.length)
      || (state.proof && state.proof.stats && state.proof.stats.asserts)
      || len;
    Screens.openWin({
      tokens: targetTokensOf(level),
      target: level.target,
      len: len,
      ref: reference,
      isLast: isLast,
      caption: state.proof ? '用了多少个证明步骤节点 / 参考证明的断言数' : '推理长度：模块数 / 参考电路模块数'
    });
  }

  function nextLevel() {
    var next = state.index + 1;
    if (next >= state.levels.length || !isUnlocked(next)) { Screens.openLevels(); return; }
    loadLevel(next);
  }

  /* =========================================================================
   * 7b. 参考提示（普通关与重放关同一套）
   *
   * 关卡数据里带 reference（参考证明的动作序列）或 proof（自包含证明）时，顶栏
   * 「参考」按钮按它摆节点/接线：小证明一次走完，大证明按批推进，最终把结论接到 ⊢。
   * 关卡数据优先；proof 只是数据来源。
   * ========================================================================= */

  function proofOf(level) {
    var proofs = window.RSL.MM_PROOFS || {};
    return (level && level.proofId && proofs[level.proofId]) || null;
  }

  function targetTokensOf(level) {
    if (level && Array.isArray(level.targetTokens) && level.targetTokens.length) return level.targetTokens;
    if (level && level.target) {
      try { return window.RSL.Term.parse(level.target); } catch (e) { return null; }
    }
    return null;
  }

  function partOfSpec(spec) {
    var kind = spec.kind;
    var cfg = spec.config || {};
    var info = window.RSL.Engine.info(kind);
    var key = kind;
    var symbol = info.symbol || '·';
    var name = info.label || kind;
    if (kind === 'axiom' && cfg.axiomId) {
      var ax = window.RSL.Engine.getAxiom(cfg.axiomId);
      if (ax) { symbol = ax.symbol || ax.code; name = (ax.type === 'definition' ? '定义 ' : ax.type === 'theorem' ? '定理 ' : '公理 ') + ax.code + ' · ' + ax.name; }
      key += ':' + cfg.axiomId;
    } else if (kind === 'archive' && cfg.label) {
      var ar = window.RSL.Engine.getArchive(cfg.label);
      if (ar) { symbol = cfg.label.slice(0, 6); name = 'set.mm ' + cfg.label + ' · ' + (ar.name || ''); }
      key += ':' + cfg.label;
    } else if (kind === 'theorem' && cfg.theoremCode) {
      var th = window.RSL.Engine.getLevelTheorem(cfg.theoremCode);
      if (th) { symbol = '*' + String(th.code || '').split('-').pop(); name = '已证 ' + th.code; }
      key += ':' + cfg.theoremCode;
    } else if (cfg.label) {
      key += ':' + cfg.label;
      symbol = cfg.label;
      name = cfg.label;
    }
    return { key: key, kind: kind, symbol: symbol, name: name, config: cfg };
  }

  function paletteParts(level) {
    return Catalog.partsForLevel(level);
  }

  function referencePlan(level) {
    return Array.isArray(level.reference) ? level.reference : [];
  }

  function stepArity(level, label) {
    var spec = (level.palette || []).filter(function (p) {
      return p.kind === 'mmstep' && p.config && p.config.label === label;
    })[0];
    return spec && spec.config && typeof spec.config.arity === 'number' ? spec.config.arity : 0;
  }

  function hypNodeId(level, label) {
    var given = (level.initialNodes || []).filter(function (n) {
      return n.kind === 'mmhyp' && n.config && n.config.label === label;
    })[0];
    return given ? given.id : 'hyp_' + label;
  }

  /** 把某个节点带进视口中心（参考摆放的节点可能在画布外）。 */
  function ensureNodeVisible(node) {
    if (!node || !state.board) return;
    var board = state.board;
    var width = board.board.clientWidth || 1000;
    var height = board.board.clientHeight || 600;
    var v = board.view;
    var sx = v.x + node.x * v.scale;
    var sy = v.y + node.y * v.scale;
    var margin = 140;
    if (sx >= margin && sx <= width - margin && sy >= margin && sy <= height - margin) return;
    board.setView(width / 2 - node.x * v.scale, height / 2 - node.y * v.scale, v.scale);
  }

  /** 参考证明的下一步：摆放步骤节点并接上前提（最后一步接到 ⊢）。 */
  function referenceStep() {
    var level = state.level;
    var proof = state.proof;
    if (!level) return;
    var plan = referencePlan(level);
    if (!plan.length) { UI.toast('这一关没有参考'); return; }
    if (state.results && state.results.complete) { UI.toast('已经完成'); return; }
    if (state.referenceIndex >= plan.length) { UI.toast('参考已经走完'); return; }

    var remaining = plan.length - state.referenceIndex;
    /* 小证明（含公理图式）一次摆完；大证明按批推进，避免几百次全量重绘。 */
    var batch = plan.length <= 6 ? remaining : Math.max(1, Math.min(48, Math.ceil(remaining / 6)));
    var byStep = state.referenceNode || (state.referenceNode = {});
    var data = state.board.getData();
    var nodes = data.nodes;
    var edges = data.edges;
    var added = 0;
    var lastNodeId = null;
    var guard = 0;

    while (state.referenceIndex < plan.length && added < batch && guard < 600) {
      guard += 1;
      var action = plan[state.referenceIndex];
      state.referenceIndex += 1;
      if (action.kind === 'hyp') {
        byStep[action.stepId] = hypNodeId(level, action.label);
        continue;
      }
      var pos = (typeof action.x === 'number' && typeof action.y === 'number')
        ? { x: action.x, y: action.y }
        : freeSpot();
      var nodeId = 'ref_' + action.stepId;
      nodes.push({
        id: nodeId, kind: 'mmstep', x: pos.x, y: pos.y,
        config: {
          label: action.label,
          arity: action.arity != null ? action.arity : stepArity(level, action.label)
        }
      });
      byStep[action.stepId] = nodeId;
      action.inputs.forEach(function (inpStepId, i) {
        var src = byStep[inpStepId];
        if (!src) return;
        edges.push({
          id: 'ref_e_' + action.stepId + '_' + i,
          from: { node: src, port: 'out' },
          to: { node: nodeId, port: 'e' + (i + 1) }
        });
      });
      added += 1;
      lastNodeId = nodeId;
    }

    if (state.referenceIndex >= plan.length && lastNodeId) {
      edges.push({
        id: 'ref_e_final',
        from: { node: lastNodeId, port: 'out' },
        to: { node: 'target', port: 'proof' }
      });
    }
    state.board.setData(nodes, edges);
    refresh();
    if (lastNodeId) ensureNodeVisible(state.board.node(lastNodeId));
    if (added > 1) UI.toast('参考：+' + added + ' 步');
    if (state.results && state.results.complete && !state.solved[level.id]) win();
  }

  /* =========================================================================
   * 8. 全局事件
   * ========================================================================= */

  function bind() {
    els.levelBtn.addEventListener('click', Screens.openLevels);
    els.checkBtn.addEventListener('click', check);
    if (els.hintBtn) els.hintBtn.addEventListener('click', function () { Audio.sfx('click'); referenceStep(); });
    els.helpBtn.addEventListener('click', Screens.openHelp);
    els.achvBtn.addEventListener('click', Screens.openAchievements);
    els.saveFile.addEventListener('change', function () {
      importSave(els.saveFile.files && els.saveFile.files[0]);
      els.saveFile.value = '';
    });

    els.themeBtn.addEventListener('click', function () {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      saveSettings();
      Audio.sfx('click');
    });
    els.soundBtn.addEventListener('click', function () {
      state.sound = !state.sound;
      Audio.setSound(state.sound);
      updateSoundBtn();
      saveSettings();
      Audio.sfx('click');
    });

    document.addEventListener('pointerdown', function (e) {
      Audio.ensure();
      Coach.hide();
      state.hintDismissed = true;
      if (els.coach) els.coach.hidden = true;
      var onSurface = e.target.closest && (e.target.closest('.tile') || e.target.closest('#board'));
      if (paletteHold && paletteHold.sticky && !onSurface) {
        var rect = els.board.getBoundingClientRect();
        if (e.clientX >= rect.left - 24 && e.clientX <= rect.right + 24 && e.clientY >= rect.top - 24 && e.clientY <= rect.bottom + 24) {
          e.preventDefault();
          e.stopPropagation();
          if (!placePaletteAt(e.clientX, e.clientY)) UI.toast('放不下');
          return;
        }
      }
      if (paletteHold && !onSurface) clearPaletteHold();
    }, true);

    document.addEventListener('contextmenu', function (e) {
      if (!paletteHold) return;
      e.preventDefault();
      e.stopPropagation();
      clearPaletteHold();
    }, true);

    els.tray.addEventListener('pointerdown', function (e) {
      var tile = e.target.closest('.tile');
      if (tile) startPaletteHold(e, tile);
    });
    els.tray.addEventListener('click', function (e) {
      if (paletteHold) return;
      var tile = e.target.closest('.tile');
      if (tile) addPart(tile.dataset.key);
    });

    els.board.addEventListener('pointerdown', function (e) {
      if (!paletteHold || !paletteHold.sticky || e.button !== 0) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (!placePaletteAt(e.clientX, e.clientY)) UI.toast('放不下');
    }, true);

    els.popover.addEventListener('click', function (e) {
      var opt = e.target.closest('[data-config]');
      if (opt && state.selectedNode) {
        if (opt.dataset.config === 'dual') {
          var current = state.board.node(state.selectedNode);
          if (current && current.kind === 'subst') {
            var extras = substExtras(current.config || {});
            if (extras < 4) state.board.updateConfig(state.selectedNode, { groups: extras + 1 });
          }
          state.selectedNode = state.board.selectedNode;
          refresh();
          return;
        }
        if (opt.dataset.config === 'removeGroup') {
          var targetNode = state.board.node(state.selectedNode);
          if (targetNode && targetNode.kind === 'subst') {
            var extraGroups = substExtras(targetNode.config || {});
            if (extraGroups > 0) {
              state.board.pruneSubstPorts(targetNode.id, extraGroups - 1);
              state.board.updateConfig(targetNode.id, { groups: extraGroups - 1 });
            }
          }
          state.selectedNode = state.board.selectedNode;
          refresh();
          return;
        }
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

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (paletteHold) { clearPaletteHold(); return; }
        if (UI.isSheetOpen()) closeSheet();
        else {
          state.board.selectedNode = null;
          state.board.selectedNodes = [];
          state.board.selectedEdge = null;
          state.board.render();
          state.selectedNode = null;
          state.selectedEdge = null;
          refresh();
        }
        return;
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && !(e.target.closest && e.target.closest('input,textarea'))) {
        if (state.selectedNode || state.selectedEdge || (state.board.selectedNodes && state.board.selectedNodes.length)) {
          e.preventDefault();
          deleteSelection();
        }
      }
    });

    window.addEventListener('resize', function () { if (state.board) state.board._updateWires(); });
  }

  function closeSheet() {
    UI.closeSheet();
  }

  /* =========================================================================
   * 9. 启动
   * ========================================================================= */

  function init() {
    els = UI.init();
    if (!window.RSL.Term || !window.RSL.Engine) { document.body.innerHTML = '<div class="fatal">公式引擎未加载</div>'; return; }
    loadProgress();
    loadSettings();
    applyTheme();
    updateSoundBtn();
    if (!state.sound) Audio.setSound(false);
    buildLevels();
    Coach.init();

    state.board = new window.RSL.Board({
      board: els.board,
      world: els.boardWorld,
      wires: els.wireLayer,
      nodes: els.nodeLayer,
      tray: els.tray,
      onChange: function () { refresh(); },
      onSelect: function (node, edge) {
        state.selectedNode = node;
        state.selectedEdge = edge;
        refresh();
      },
      onToast: function (msg) { UI.toast(msg); },
      onConnect: function () { Audio.sfx('connect'); },
      onRemove: function (kind) { if (kind === 'node') state.deletedThisLevel = true; Audio.sfx('click'); }
    });

    Screens.init({
      state: state,
      loadLevel: loadLevel,
      nextLevel: nextLevel,
      isUnlocked: isUnlocked,
      showCoachKind: Coach.showKind,
      exportSave: exportSave,
      requestImport: function () { els.saveFile.click(); }
    });

    bind();

    var start = -1;
    if (state.lastId) {
      for (var i = 0; i < state.levels.length; i++) {
        if (state.levels[i].id === state.lastId) { start = i; break; }
      }
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

    window.RSL.APP = {
      state: state,
      loadLevel: loadLevel,
      refresh: refresh,
      isUnlocked: isUnlocked,
      openAchievements: Screens.openAchievements,
      openLevels: Screens.openLevels,
      openHelp: Screens.openHelp
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
