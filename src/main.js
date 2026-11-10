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
  var Catalog = window.RSL.Catalog;
  var Screens = window.RSL.Screens;

  var state = {
    levels: [],
    level: null,
    index: 0,
    solved: {},
    bestLen: {},
    usedKinds: {},
    cleanWins: {},
    circuits: {},
    deletedThisLevel: false,
    achievements: {},
    board: null,
    results: null,
    selectedNode: null,
    selectedEdge: null,
    lastId: null,
    forceUnlock: false,
    sound: true,
    theme: 'light',
    parts: [],
    clipboard: null,
    paste: null
  };
  var els = null;
  var paletteHold = null;

  /* =========================================================================
   * 1. 存档
   * ========================================================================= */

  var storeFailureShown = false;
  var migrationToastShown = false;
  var migrationWarningShown = false;
  var rejectToastShown = false;

  function setOf(list) {
    var map = {};
    (list || []).forEach(function (k) { map[k] = true; });
    return map;
  }

  function resetProgress() {
    state.solved = {};
    state.bestLen = {};
    state.usedKinds = {};
    state.cleanWins = {};
    state.circuits = {};
    state.achievements = {};
    state.lastId = null;
  }

  function applyProgress(p) {
    state.solved = setOf(p.solved);
    state.bestLen = p.bestLen || {};
    state.usedKinds = setOf(p.usedKinds);
    state.cleanWins = setOf(p.cleanWins);
    state.circuits = p.circuits || {};
    state.achievements = setOf(p.achievements);
    state.lastId = p.lastId || null;
  }

  /** localStorage 写入失败（配额/隐私模式）只提示一次，不再静默吞掉 false。 */
  function reportStoreFailure() {
    if (storeFailureShown) return;
    storeFailureShown = true;
    UI.toast('存档写入失败：浏览器存储不可用');
  }

  /** 迁移提示只出现一次；返回是否真的弹了 toast。 */
  function showMigrationReport(report) {
    if (!report || !report.migrated) return false;
    if (report.missingLegacy) {
      if (migrationWarningShown) return false;
      migrationWarningShown = true;
      UI.toast('旧存档待更新：缺少旧关卡映射，已备份旧档');
      return true;
    }
    if (migrationToastShown) return false;
    if (!report.keptSolved && !report.droppedSolved) return false;
    migrationToastShown = true;
    var msg = '存档已更新：保留 ' + report.keptSolved + ' 关';
    if (report.droppedSolved) msg += '，移除 ' + report.droppedSolved + ' 关';
    UI.toast(msg);
    return true;
  }

  function loadProgress() {
    var raw = SAVE.load();
    var result;
    try {
      result = SAVE.migrate(raw, state.levels, window.RSL.LEGACY_TARGETS || null);
    } catch (e) {
      /* 版本过新/结构损坏：不拿空进度覆盖，先把原档留底并提示一次。 */
      if (raw && typeof raw === 'object' && Object.keys(raw).length) SAVE.backup(raw);
      resetProgress();
      if (!rejectToastShown) {
        rejectToastShown = true;
        UI.toast('存档版本过新或已损坏，原档已备份');
      }
      return;
    }
    applyProgress(result.save);
    var stored = true;
    if (result.report.migrated) {
      /* 覆盖前留一份旧档；缺失 legacy 映射时不在加载阶段持久化，避免静默洗掉旧字段。 */
      var legacySource = result.report.fromVersion !== SAVE.version ||
        result.report.fromCampaign !== result.report.toCampaign;
      if (legacySource && raw && typeof raw === 'object' && Object.keys(raw).length) SAVE.backup(raw);
      if (!result.report.missingLegacy) stored = SAVE.store(result.save);
    }
    showMigrationReport(result.report);
    /* 写入失败提示放在最后，避免被迁移提示覆盖。 */
    if (!stored) reportStoreFailure();
  }

  function saveProgress() {
    if (!SAVE.store(SAVE.payload(state))) reportStoreFailure();
    if (window.RSL.CloudSave) window.RSL.CloudSave.schedule(state);
  }

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
      var raw, result;
      try {
        raw = JSON.parse(String(reader.result || ''));
        result = SAVE.migrate(raw, state.levels, window.RSL.LEGACY_TARGETS || null);
      } catch (e) {
        UI.toast('存档不对');
        return;
      }
      if (result.report.missingLegacy) {
        UI.toast('导入失败：缺少旧关卡映射');
        return;
      }
      if (!SAVE.store(result.save)) {
        UI.toast('导入失败：本地存储不可用');
        return;
      }
      SAVE.backup(raw);
      UI.toast(result.report.migrated ? '已导入并更新存档' : '已导入');
      setTimeout(function () { window.location.reload(); }, 650);
    };
    reader.onerror = function () { UI.toast('导入失败：文件读取错误'); };
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
    if (state.level) {
      updateLevelButton();
      buildTray();
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

  function isUnlocked(index) {
    if (state.forceUnlock) return true;
    if (index <= 0) return true;
    var lv = state.levels[index];
    if (!lv) return false;
    var levels = state.levels;
    function solved(x) { return !!(x && state.solved[x.id]); }
    if (lv.hard) {
      /* 困难段统一在全部教学 + 普通关完成后开放。 */
      return levels.every(function (x) { return x.hard || solved(x); });
    }
    var prev = levels[index - 1];
    return solved(prev);
  }

  /** 关卡目标的 canonical token（带 |-）。 */
  function targetTokensOf(level) {
    return level && Array.isArray(level.targetTokens) && level.targetTokens.length ? level.targetTokens : null;
  }

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

  function hideTutorialTip() {
    if (!els.tutorialTip) return;
    els.tutorialTip.hidden = true;
    els.tutorialTip.innerHTML = '';
  }

  function showTutorialTip(level) {
    if (!els.tutorialTip) return;
    if (!level || !level.tip) { hideTutorialTip(); return; }
    var tip = level.tip;
    els.tutorialTip.innerHTML =
      '<span class="tip-code">' + UI.esc(tip.code || '') + '</span>' +
      '<span class="tip-flow">' + UI.esc(tip.flow || '') + '</span>';
    els.tutorialTip.hidden = false;
  }

  function updateLevelButton() {
    var level = state.level;
    if (!level || !els.levelBtn) return;
    els.levelBtn.style.backgroundImage = '';
    if (level.tutorial) {
      els.levelBtn.textContent = level.code || '';
      return;
    }
    els.levelBtn.textContent = '*' + String(level.no == null ? '' : level.no).padStart(2, '0');
  }

  /* 载入关卡：初始图/元件来自关卡数据（targetTokens / palette / initialNodes / solution），
     proof 只用于参考提示，不是另一套流程。 */
  function loadLevel(index) {
    if (index < 0 || index >= state.levels.length) return;
    if (!isUnlocked(index)) { UI.toast('先完成前一关'); return; }
    UI.closeSheet();
    clearPaletteHold();
    clearPaste();
    state.deletedThisLevel = false;
    state.index = index;
    state.level = state.levels[index];
    state.selectedNode = null;
    state.selectedEdge = null;

    var level = state.level;
    state.parts = Catalog.partsForLevel(level);
    if (els.tray) els.tray.classList.remove('is-wide');

    var saved = state.circuits[level.id];
    var savedNodes = [];
    var savedEdges = [];
    if (saved && Array.isArray(saved.nodes) && Array.isArray(saved.edges)) {
      saved.nodes.forEach(function (n) {
        if (n && n.kind && n.kind !== 'target') savedNodes.push(JSON.parse(JSON.stringify(n)));
      });
      savedEdges = JSON.parse(JSON.stringify(saved.edges));
      /* 旧存档里的终点连线可能还指向编译产物里的 target id；载入时统一接到
         重新创建的 'target' 节点，避免“每次重进都要重连终点”。 */
      var ids = { target: true };
      savedNodes.forEach(function (n) { ids[n.id] = true; });
      savedEdges.forEach(function (e) {
        if (e && e.to && !ids[e.to.node] && e.to.port === 'proof') e.to.node = 'target';
      });
      savedEdges = savedEdges.filter(function (e) {
        return e && e.from && e.to && ids[e.from.node] && ids[e.to.node];
      });
    }

    var tokens = targetTokensOf(level);
    var nodes, edges;
    if (savedNodes.length) {
      var maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      savedNodes.forEach(function (n) {
        maxX = Math.max(maxX, n.x + 232);
        minY = Math.min(minY, n.y);
        maxY = Math.max(maxY, n.y + 140);
      });
      var tx = maxX + 320;
      var ty = UI.clamp((minY + maxY) / 2 - 52, 120, 720);
      nodes = [{ id: 'target', kind: 'target', x: tx, y: ty, targetTokens: tokens, config: {} }].concat(savedNodes);
      edges = savedEdges;
    } else {
      nodes = JSON.parse(JSON.stringify(level.initialNodes || []));
      edges = [];
      if (!nodes.length) {
        nodes = [{ id: 'target', kind: 'target', x: 860, y: 220, targetTokens: tokens, config: {} }];
      }
      nodes.forEach(function (n) {
        if (n.kind === 'target') n.targetTokens = n.targetTokens || tokens;
      });
    }
    state.board.setData(nodes, edges);

    els.goalFormula.innerHTML = tokens ? UI.goalTokens(tokens) : UI.esc(level.code || '');
    els.goal.classList.toggle('is-long', (els.goalFormula.textContent || '').length > 52);
    updateLevelButton();
    els.levelBtn.setAttribute('aria-label', '第 ' + (index + 1) + ' 关，选择关卡');
    els.popover.hidden = true;
    buildTray();
    state.board.result = null;
    refresh();
    state.board.fit({ minScale: 0.15 });
    showTutorialTip(level);
    saveProgress();
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
    var VARIABLES = { atom: 1 };
    var SYMBOLS = { not: 1, imp: 1, or: 1, and: 1, iff: 1 };
    els.tray.innerHTML = state.parts.map(function (part) {
      var symbol = part.symbol || '·';
      var variant = VARIABLES[part.kind] ? ' is-var' : (SYMBOLS[part.kind] ? ' is-symbol' : ' is-code');
      var long = variant === ' is-code' && symbol.length > 3 ? ' is-long' : '';
      var style = '';
      if (part.kind === 'theorem' && part.config && part.config.code) {
        symbol = '*' + String(part.config.code);
      }
      return '<button class="tile' + variant + long + '" data-key="' + UI.esc(part.key) + '" title="' + UI.esc(part.name) +
        '" aria-label="' + UI.esc(part.name) + '"' + style + '><span>' + UI.esc(symbol) + '</span></button>';
    }).join('');
  }

  function refresh() {
    if (!state.level) return;
    var data = state.board.getData();
    var ctx = { levels: state.levels, levelIndex: state.index };
    var result = window.RSL.Engine.evaluate(state.level, data.nodes, data.edges, ctx);
    state.results = result;
    state.board.paint(result);
    els.checkBtn.classList.toggle('is-ready', result.complete);
    renderPopover();
    saveProgress();
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

  /* =========================================================================
   * 5b. 复制 / 粘贴
   * ========================================================================= */

  function copySelection() {
    var board = state.board;
    var ids = (board.selectedNodes || []).filter(function (id) {
      var n = board.node(id);
      return n && n.kind !== 'target';
    });
    if (!ids.length) return;
    var set = new Set(ids);
    var nodes = [];
    var minX = Infinity, minY = Infinity;
    ids.forEach(function (id) {
      var n = board.node(id);
      var el = board._elById[id];
      nodes.push({
        id: id, kind: n.kind, config: n.config || {},
        dx: n.x, dy: n.y, h: el ? el.offsetHeight : 0
      });
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
    });
    nodes.forEach(function (n) { n.dx -= minX; n.dy -= minY; });
    var edges = (board.edges || []).filter(function (e) {
      return set.has(e.from.node) && set.has(e.to.node);
    }).map(function (e) {
      return { from: { node: e.from.node, port: e.from.port }, to: { node: e.to.node, port: e.to.port } };
    });
    state.clipboard = { nodes: nodes, edges: edges };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(JSON.stringify({ version: 1, nodes: nodes, edges: edges }))
          .catch(function () {});
      }
    } catch (e) {}
    UI.toast('已复制 ' + nodes.length + ' 个模块');
  }

  function allowedForLevel(node) {
    var merged = { atom: 1, term: 1, pred: 1, all: 1, exists: 1, subst: 1 };
    return state.parts.some(function (part) {
      if (part.kind !== node.kind) return false;
      if (merged[node.kind]) return true;
      return JSON.stringify(part.config || {}) === JSON.stringify(node.config || {});
    });
  }

  function clearPaste() {
    var p = state.paste;
    if (!p) return;
    p.ghosts.forEach(function (g) {
      if (g.parentNode) g.parentNode.removeChild(g);
    });
    document.removeEventListener('pointermove', movePaste);
    document.removeEventListener('pointerdown', downPaste, true);
    document.body.classList.remove('is-holding');
    state.paste = null;
  }

  function movePaste(e) {
    var p = state.paste;
    if (!p) return;
    p.cx = e.clientX; p.cy = e.clientY;
    p.ghosts.forEach(function (g, i) {
      var n = p.nodes[i];
      g.style.left = (p.cx + n.dx - p.w / 2) + 'px';
      g.style.top = (p.cy + n.dy - p.h / 2) + 'px';
    });
  }

  function downPaste(e) {
    if (e.button !== 0 || !state.paste) return;
    var r = els.board.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    var p = state.paste;
    var world = state.board._client(e.clientX, e.clientY);
    var ids = state.board.pasteNodes(p.nodes, p.edges, world.x - p.w / 2, world.y - p.h / 2);
    if (!ids) {
      UI.toast('这里放不下');
      return;
    }
    Audio.sfx('place');
    clearPaste();
    state.selectedNodes = ids;
    state.selectedNode = ids.length === 1 ? ids[0] : null;
    state.selectedEdge = null;
    refresh();
  }

  function startPaste() {
    if (!state.clipboard || !state.clipboard.nodes.length) return;
    clearPaste();
    clearPaletteHold();
    var allowed = [];
    var oldToNew = {};
    state.clipboard.nodes.forEach(function (n) {
      if (!allowedForLevel(n)) return;
      allowed.push(n);
      oldToNew[n.id] = n;
    });
    if (!allowed.length) {
      UI.toast('本关没有可粘贴的元件');
      return;
    }
    var filtered = state.clipboard.nodes.length - allowed.length;
    if (filtered) UI.toast('已过滤 ' + filtered + ' 个本关不可用元件');
    var edges = state.clipboard.edges.filter(function (e) {
      return oldToNew[e.from.node] && oldToNew[e.to.node];
    });
    var w = 232, h = 112;
    allowed.forEach(function (n) {
      w = Math.max(w, n.dx + 232);
      h = Math.max(h, n.dy + (n.h || 112));
    });
    var p = { nodes: allowed, edges: edges, w: w, h: h, ghosts: [], cx: 0, cy: 0 };
    allowed.forEach(function (n) {
      var g = makeModuleGhost({ kind: n.kind, config: n.config });
      g.classList.add('paste-ghost');
      document.body.appendChild(g);
      p.ghosts.push(g);
    });
    state.paste = p;
    var r = els.board.getBoundingClientRect();
    movePaste({ clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 });
    document.body.classList.add('is-holding');
    document.addEventListener('pointermove', movePaste);
    document.addEventListener('pointerdown', downPaste, true);
  }

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

  function makeModuleGhost(part) {
    var info = window.RSL.Engine.info(part.kind) || { ports: { inputs: [], outputs: [] } };
    var ins = (info.ports.inputs || []);
    if (part.kind === 'subst') {
      var ghostExtras = substExtras(part.config);
      ins = ins.filter(function (p) { return substPortVisible(p.id, ghostExtras); });
    }
    var outs = (info.ports.outputs || []);
    var config = part.config || {};
    var code = state.board._code({ kind: part.kind, config: config }) || part.symbol || '·';
    var formula = '<span class="blank">·</span>';
    try {
      var preview = window.RSL.Engine.evaluate(state.level, [{ id: '__ghost', kind: part.kind, x: 0, y: 0, config: config }], [], { levels: state.levels, levelIndex: state.index });
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

  /* 托盘合并后，切换器显示完整取值集合，而不是只显示本关参考证明用到的。 */
  var ATOM_CHOICES = 'PQRSTUV'.split('');
  var TERM_CHOICES = 'xyzuvw'.split('');
  var PRED_CHOICES = ['F', 'G', 'H', '='];
  var VAR_CHOICES = 'xyzuvw'.split('');

  /* D / D⁻：沿 assertion 输入边找到上游断言，列出可单点重写的位置。 */
  function definitionInputTokens(nodeId) {
    if (!state.board || !state.results || !state.results.results) return null;
    var data;
    try { data = state.board.getData(); } catch (e) { return null; }
    var edges = data.edges || [];
    var edge = null;
    for (var i = 0; i < edges.length; i += 1) {
      var e = edges[i];
      if (e && e.to && e.to.node === nodeId && e.to.port === 'assertion') { edge = e; break; }
    }
    if (!edge) return null;
    var upstream = state.results.results[edge.from.node];
    return upstream && upstream.tokens ? upstream.tokens : null;
  }

  function defPathKey(path) { return path && path.length ? path.join('.') : '@'; }

  function defPathSame(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    for (var i = 0; i < a.length; i += 1) if (a[i] !== b[i]) return false;
    return true;
  }

  function defFormulaHTML(text) {
    var T = window.RSL.Term;
    try { return T.toHTML(T.parse(text), { full: true }); } catch (e) { return UI.esc(text); }
  }

  function defSiteChipHTML(site, on) {
    return '<button class="opt opt-def' + (on ? ' is-on' : '') + '" data-config="at" data-at="' +
      defPathKey(site.path) + '" title="' + UI.esc(site.before + ' ⇛ ' + site.after) + '">' +
      '<span class="opt-def-sym">' + UI.esc(site.symbol) + '</span>' +
      '<span class="opt-def-flow">' +
        '<span class="formula opt-def-formula">' + defFormulaHTML(site.before) + '</span>' +
        '<span class="opt-def-arrow">⇛</span>' +
        '<span class="formula opt-def-formula">' + defFormulaHTML(site.after) + '</span>' +
      '</span></button>';
  }

  function definitionPickerHTML(node) {
    var T = window.RSL.Term;
    if (!T) return '';
    var input = definitionInputTokens(node.id);
    if (!input) return '';
    var mode = node.kind === 'def-expand' ? 'expand' : 'contract';
    var sites;
    try { sites = T.definitionSites(input, mode); } catch (e) { return ''; }
    var current = node.config && Array.isArray(node.config.at) ? node.config.at : null;
    var html = sites.map(function (site) {
      return defSiteChipHTML(site, !!current && defPathSame(current, site.path));
    }).join('');
    /* 即使当前断言没有可重写位置也保留 all 芯片，便于清掉上游变化后失效的 at。 */
    html += '<button class="opt opt-def opt-def-all' + (current ? '' : ' is-on') +
      '" data-config="at" data-at="all" title="all">all</button>';
    return '<div class="def-title">rewrite</div><div class="def-grid">' + html + '</div>';
  }

  function renderPopover() {
    var node = state.selectedNode ? state.board.node(state.selectedNode) : null;
    var isGrid = !!node && node.kind === 'atom';
    var isDefs = !!node && (node.kind === 'def-expand' || node.kind === 'def-contract');
    els.popover.classList.toggle('is-grid', isGrid);
    els.popover.classList.toggle('is-defs', isDefs);
    if (!node || node.kind === 'target') { els.popover.hidden = true; return; }
    var config = node.config || {};
    var html = '';
    if (node.kind === 'atom') {
      html = '<div class="letter-grid">' + ATOM_CHOICES.map(function (x) {
        return '<button class="opt opt-var' + (config.name === x ? ' is-on' : '') + '" data-config="name" data-value="' + x + '">' + x + '</button>';
      }).join('') + '</div>';
    } else if (node.kind === 'term') {
      html = '<div class="letter-grid">' + TERM_CHOICES.map(function (x) {
        return '<button class="opt opt-var' + (config.name === x ? ' is-on' : '') + '" data-config="name" data-value="' + x + '">' + x + '</button>';
      }).join('') + '</div>';
    } else if (node.kind === 'pred') {
      html = PRED_CHOICES.map(function (x) {
        return '<button class="opt opt-code' + (config.symbol === x ? ' is-on' : '') + '" data-config="symbol" data-value="' + x + '">' + x + '</button>';
      }).join('');
    } else if (node.kind === 'all' || node.kind === 'exists') {
      html = '<span class="opt opt-sym is-on">' + (node.kind === 'all' ? '∀' : '∃') + '</span>' +
        '<span class="opt-gap"></span>' + VAR_CHOICES.map(function (v) {
          return '<button class="opt opt-var' + (config.v === v ? ' is-on' : '') + '" data-config="v" data-value="' + v + '">' + v + '</button>';
        }).join('');
    } else if (node.kind === 'subst') {
      var extras = substExtras(config);
      html = (extras >= 1
        ? '<button class="opt opt-minus" data-config="removeGroup" data-value="1" aria-label="remove group" title="remove group">−</button>'
        : '') +
        (extras < 4
          ? '<button class="opt opt-plus" data-config="dual" data-value="1" aria-label="add group" title="add group">＋</button>'
          : '');
    } else if (node.kind === 'all-inst' || node.kind === 'exists-gen' || node.kind === 'gen' || node.kind === 'shift') {
      html = VAR_CHOICES.map(function (v) {
        return '<button class="opt opt-var' + (config.v === v ? ' is-on' : '') + '" data-config="v" data-value="' + v + '">' + v + '</button>';
      }).join('');
    } else if (node.kind === 'def-expand' || node.kind === 'def-contract') {
      html = definitionPickerHTML(node);
    }
    if (!html) { els.popover.hidden = true; els.popover.classList.remove('is-grid'); els.popover.classList.remove('is-defs'); return; }
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
      UI.toast(msg.length > 34 ? msg.slice(0, 34) + '…' : msg);
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
    var len = items.length;
    items.forEach(function (n) { state.usedKinds[n.kind] = true; });
    if (!state.deletedThisLevel) state.cleanWins[level.id] = true;
    if (!state.circuits[level.id] || !previousBest || len < previousBest) {
      var data = state.board.getData();
      var targetNode = data.nodes.filter(function (n) { return n.kind === 'target'; })[0];
      var targetId = targetNode ? targetNode.id : null;
      state.circuits[level.id] = {
        nodes: data.nodes.filter(function (n) { return n.kind !== 'target'; }).map(function (n) {
          var copy = JSON.parse(JSON.stringify(n));
          delete copy._new;
          return copy;
        }),
        edges: JSON.parse(JSON.stringify(data.edges)).map(function (e) {
          delete e._new;
          if (targetId && e.to && e.to.node === targetId) e.to.node = 'target';
          return e;
        })
      };
    }
    if (!state.bestLen[level.id] || len < state.bestLen[level.id]) state.bestLen[level.id] = len;
    saveProgress();
    if (window.RSL.Leaderboard) window.RSL.Leaderboard.submit(state);
    checkAchievements();
    Audio.sfx('win');
    updateProgress();
    els.levelBtn.classList.remove('just-solved');
    void els.levelBtn.offsetWidth;
    els.levelBtn.classList.add('just-solved');
    setTimeout(function () { els.levelBtn.classList.remove('just-solved'); }, 520);

    var isLast = state.index >= state.levels.length - 1;
    var reference = (level.solution && level.solution.nodes.length) || len;
    Screens.openWin({
      tokens: targetTokensOf(level),
      len: len,
      ref: reference,
      isLast: isLast,
      caption: '推理长度：模块数 / 参考电路模块数'
    });
  }

  function nextLevel() {
    var next = state.index + 1;
    if (next >= state.levels.length || !isUnlocked(next)) { Screens.openLevels(); return; }
    loadLevel(next);
  }

  /** 选一个当前 campaign 里有效、已解锁的起始关（云存档/启动共用）。 */
  function pickStartIndex() {
    var start = -1;
    if (state.lastId && state.levels.length) {
      for (var i = 0; i < state.levels.length; i += 1) {
        if (state.levels[i].id === state.lastId) { start = i; break; }
      }
    }
    if (start < 0 || state.solved[state.levels[start].id] || !isUnlocked(start)) {
      start = -1;
      for (var j = 0; j < state.levels.length; j += 1) {
        if (!state.solved[state.levels[j].id] && isUnlocked(j)) { start = j; break; }
      }
      if (start < 0) start = state.levels.length - 1;
    }
    return start;
  }

  /* =========================================================================
   * 8. 全局事件
   * ========================================================================= */

  function bind() {
    els.levelBtn.addEventListener('click', Screens.openLevels);
    els.checkBtn.addEventListener('click', check);
    els.helpBtn.addEventListener('click', Screens.openHelp);
    els.achvBtn.addEventListener('click', Screens.openAchievements);
    if (els.godBtn) els.godBtn.addEventListener('click', godSolve);
    if (els.hintBtn) els.hintBtn.addEventListener('click', showHint);
    if (els.rankBtn) els.rankBtn.addEventListener('click', openLeaderboard);
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
      hideTutorialTip();
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
      if (!tile) return;
      /* 触屏上把横滑留给元件栏；点一下 tile 仍会进入待放置状态。 */
      if (e.pointerType === 'touch') return;
      startPaletteHold(e, tile);
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

    /* 参数弹层自己的指针事件不要再冒泡到棋盘/文档，否则点字母时会被当成
     * 点空白而取消选择并把弹层收起。 */
    ['pointerdown', 'mousedown', 'pointerup'].forEach(function (name) {
      els.popover.addEventListener(name, function (e) { e.stopPropagation(); }, true);
    });

    els.popover.addEventListener('click', function (e) {
      var opt = e.target.closest('[data-config]');
      if (opt && state.selectedNode) {
        if (opt.dataset.config === 'at') {
          var defNode = state.board.node(state.selectedNode);
          if (defNode && (defNode.kind === 'def-expand' || defNode.kind === 'def-contract')) {
            var at = opt.dataset.at;
            if (at === 'all') {
              if (defNode.config) delete defNode.config.at;
              state.board.render();
            } else {
              var path = at === '@' ? [] : at.split('.').map(function (x) { return parseInt(x, 10); });
              state.board.updateConfig(state.selectedNode, { at: path });
            }
          }
          state.selectedNode = state.board.selectedNode;
          refresh();
          return;
        }
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

    window.addEventListener('pagehide', function () {
      if (window.RSL.CloudSave && window.RSL.CloudSave.isToyHost()) {
        window.RSL.CloudSave.flush(state);
      }
    });

    document.addEventListener('keydown', function (e) {
      var inField = e.target.closest && e.target.closest('input,textarea');
      if ((e.ctrlKey || e.metaKey) && !inField && (e.key === 'c' || e.key === 'C')) {
        if ((state.board.selectedNodes || []).length) { e.preventDefault(); copySelection(); }
        return;
      }
      if ((e.ctrlKey || e.metaKey) && !inField && (e.key === 'v' || e.key === 'V')) {
        e.preventDefault();
        startPaste();
        return;
      }
      if (e.key === 'Escape') {
        if (state.paste) { clearPaste(); return; }
        if (paletteHold) { clearPaletteHold(); return; }
        if (UI.isSheetOpen()) closeSheet();
        else {
          state.board.selectedNode = null;
          state.board.selectedNodes = [];
          state.board.selectedEdge = null;
          state.board.paint(state.board.result);
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

  function showHint() {
    var level = state.level;
    if (!level || !window.RSL.Hints || !window.RSL.Hints.isToyHost()) return;
    if (level.hard || !level.hint) {
      UI.toast('困难关不提供提示');
      return;
    }
    Screens.openHint(level);
  }

  function openLeaderboard() {
    if (!window.RSL.Leaderboard || !window.RSL.Leaderboard.isToy()) return;
    UI.toast('读取排行榜…');
    window.RSL.Leaderboard.load().then(function (data) {
      Screens.openLeaderboard(data, state);
    });
  }

  function followAuthor() {
    if (!window.RSL.Hints) return;
    window.RSL.Hints.follow().catch(function () {
      UI.toast('打开关注页失败，请稍后重试');
    });
  }

  function likeVideo() {
    if (!window.RSL.Hints) return;
    window.RSL.Hints.likeVideo().catch(function () {
      UI.toast('打开视频失败，请稍后重试');
    });
  }

  function godSolve() {
    var level = state.level;
    if (!level || !level.solution) return;
    var target = (level.initialNodes || []).filter(function (n) { return n.kind === 'target'; })[0];
    if (!target) return;
    var nodes = [JSON.parse(JSON.stringify(target))].concat(
      JSON.parse(JSON.stringify(level.solution.nodes))
    );
    var edges = JSON.parse(JSON.stringify(level.solution.edges || []));
    state.board.setData(nodes, edges);
    refresh();
    UI.toast('已按参考解布置');
  }

  async function init() {
    els = UI.init();
    if (!window.RSL.Term || !window.RSL.Engine) { document.body.innerHTML = '<div class="fatal">公式引擎未加载</div>'; return; }
    var toyMode = !!(window.RSL.Hints && window.RSL.Hints.isToyHost());
    var godMode = /(?:^|[?&])godMode=1(?:&|$)/.test(location.search);
    if (els.hintBtn) els.hintBtn.hidden = !toyMode;
    if (els.rankBtn) els.rankBtn.hidden = !toyMode;
    if (els.godBtn) els.godBtn.hidden = !godMode;
    /* 先建关卡表：loadProgress 的 v4 迁移需要当前 levels + targetTokens。 */
    buildLevels();
    loadProgress();
    loadSettings();
    applyTheme();
    updateSoundBtn();
    if (!state.sound) Audio.setSound(false);

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
      exportSave: exportSave,
      requestImport: function () { els.saveFile.click(); },
      followAuthor: followAuthor,
      likeVideo: likeVideo,
      openLeaderboard: openLeaderboard
    });

    bind();

    var start = pickStartIndex();
    loadLevel(start);
    updateProgress();

    /* 云存档在后台同步，绝不在它返回前阻塞游戏启动。 */
    if (window.RSL.CloudSave && toyMode) {
      window.RSL.CloudSave.init(state).then(function (cloud) {
        if (!cloud) return;
        var result;
        try {
          result = SAVE.migrate(cloud, state.levels, window.RSL.LEGACY_TARGETS || null);
        } catch (e) {
          return;
        }
        if (result.report.missingLegacy) {
          UI.toast('云存档待更新：缺少旧关卡映射');
          return;
        }
        /* 云存档与本地进度等价时不再 apply / 重载，避免启动时闪一下棋盘。 */
        if (window.RSL.CloudSave.equal(state, result.save)) {
          /* 旧版云存档即使内容相同也写回一次 v4，避免每次启动重复迁移。 */
          if (result.report.migrated) window.RSL.CloudSave.schedule(state);
          updateProgress();
          return;
        }
        if (!window.RSL.CloudSave.apply(state, result.save)) return;
        var cloudStart = pickStartIndex();
        if (cloudStart >= 0) loadLevel(cloudStart);
        else if (!SAVE.store(SAVE.payload(state))) reportStoreFailure();
        updateProgress();
        checkAchievements();
        /* 迁移后的 v4 存档写回 Toy，下次启动不必再迁移一遍。 */
        window.RSL.CloudSave.schedule(state);
        if (!showMigrationReport(result.report)) UI.toast('已同步账号存档');
      });
    }

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
