/*!
 * 公理板 / AXIOM BOARD — RSL.Screens
 *
 * 面板内容：选关、帮助、成就、通关。只负责生成 HTML 与面板内交互，
 * 关卡切换/存档/提示等动作由 main.js 通过 init(ctx) 注入。
 *
 * 设计约定（见 docs/DESIGN.md）：
 *   - 少字：面板不写标题/说明，只保留数字、公式、代号与必要图例；
 *   - 面板内部是可点的 flat row（soft 底、无描边）；白贴纸材质只留给棋盘上的模块；
 *   - 对象语言用 → / ↔，规则层面用 ⇒ / ⇄；变量与公式一律 STIX 斜体。
 */
(function (host) {
  'use strict';
  host.RSL = host.RSL || {};
  var UI = host.RSL.UI;
  var Catalog = host.RSL.Catalog;
  var ACH = host.RSL.Achievements;

  var ctx = null;
  var esc = UI.esc;

  function init(context) {
    ctx = context;
    UI.onSheetClick(handleClick);
  }

  function closeButton() {
    return '<button class="sheet-x" data-close aria-label="关闭"><svg class="icon"><use href="#i-x-mark"></use></svg></button>';
  }

  /* =========================================================================
   * 1. 选关
   * ========================================================================= */

  function levelCell(entry) {
    var lv = entry.lv, i = entry.i;
    var unlocked = ctx.isUnlocked(i);
    var ref = lv.solution && lv.solution.nodes ? lv.solution.nodes.length : 1;
    var best = ctx.state.bestLen[lv.id];
    var eff = best ? Math.max(8, Math.min(100, Math.round(ref / best * 100))) : 0;
    var style = best ? ' style="--effpx:' + Math.round(34 * eff / 100) + 'px"' : '';
    var cls = 'level-cell' + (i === ctx.state.index ? ' is-current' : '') +
      (ctx.state.solved[lv.id] ? ' is-solved' : '') +
      (unlocked ? '' : ' is-locked');
    var no = Number(lv.no) || (i + 1);
    var label = '第 ' + no + ' 关（*' + String(no).padStart(2, '0') + '）' + (unlocked ? '' : '，未解锁');
    return '<button class="' + cls + '" data-level="' + i + '" aria-label="' + label + '"' +
      (unlocked ? '' : ' disabled') + style + '>' +
      String(no).padStart(2, '0') +
      '<i class="eff" aria-hidden="true"></i>' +
      '</button>';
  }

  function bandHTML(items, kind) {
    if (!items.length) return '';
    var solved = items.filter(function (x) { return ctx.state.solved[x.lv.id]; }).length;
    var firstLocked = !ctx.isUnlocked(items[0].i);
    var glyph = kind === 'challenge' ? 'i-star' : 'i-book-open';
    return '<div class="band ' + kind + (firstLocked ? ' is-locked' : '') + '">' +
      '<div class="band-head">' +
        '<span class="band-glyph"><svg class="icon"><use href="#' + glyph + '"></use></svg></span>' +
        '<span class="band-progress" aria-hidden="true"><i style="width:' + (solved / items.length * 100) + '%"></i></span>' +
        '<span class="band-count">' + solved + ' / ' + items.length + '</span>' +
      '</div>' +
      '<div class="levels">' + bandCells(items) + '</div>' +
    '</div>';
  }

  /* 重放关在章内按统一难度交错，用横跨 5 格的宽行表示（不是独立分带）。 */
  function mmInline(entry) {
    var lv = entry.lv, i = entry.i;
    var solved = !!ctx.state.solved[lv.id];
    var current = i === ctx.state.index;
    var unlocked = ctx.isUnlocked(i);
    var steps = lv.stats ? lv.stats.steps : 0;
    var badge = lv.axiom ? '公理' : steps + ' 步';
    return '<button class="mm-level is-inline' + (solved ? ' is-solved' : '') + (current ? ' is-current' : '') +
      (unlocked ? '' : ' is-locked') + '" data-level="' + i + '"' +
      (unlocked ? '' : ' disabled') +
      ' title="' + esc(lv.note || '') + '"' +
      ' aria-label="' + esc((lv.title || lv.code || '') + '，重放 ' + badge + (unlocked ? '' : '，未解锁')) + '">' +
      '<span class="mm-level-no">' + esc(String(lv.chapterOrder || '').padStart(2, '0')) + '</span>' +
      '<span class="mm-level-title">' + esc(lv.title || '') + '</span>' +
      '<span class="mm-level-steps">' + esc(badge) + '</span>' +
    '</button>';
  }

  function bandCells(items) {
    return items.map(function (entry) {
      var isReplay = entry.lv.track === 'replay';
    return isReplay ? mmInline(entry) : levelCell(entry);
    }).join('');
  }

  function levelsHTML() {
    var buckets = {};
    Catalog.CHAPTERS.forEach(function (c) { buckets[c.id] = []; });
    ctx.state.levels.forEach(function (lv, i) {
      (buckets[Catalog.chapterOf(lv)] || buckets['Ⅰ']).push({ lv: lv, i: i });
    });
    return Catalog.CHAPTERS.map(function (c) {
      var items = buckets[c.id] || [];
      if (!items.length) return '';
      var solved = items.filter(function (x) { return ctx.state.solved[x.lv.id]; }).length;
      var isCurrent = items.some(function (x) { return x.i === ctx.state.index; });
      var base = items.filter(function (x) { return x.lv.band === 'base'; });
      var chal = items.filter(function (x) { return x.lv.band === 'challenge'; });
      var chapterLocked = !ctx.isUnlocked(items[0].i);
      return '<section class="chapter' + (isCurrent ? ' is-current' : '') + (chapterLocked ? ' is-locked' : '') + '">' +
        '<div class="chapter-head">' +
          '<span class="chapter-roman">' + c.id + '</span>' +
          '<span class="chapter-progress" aria-hidden="true"><i style="width:' + (solved / items.length * 100) + '%"></i></span>' +
          '<span class="chapter-count">' + solved + ' / ' + items.length + '</span>' +
        '</div>' +
        bandHTML(base, 'base') +
        bandHTML(chal, 'challenge') +
      '</section>';
    }).join('');
  }

  function openLevels() {
    host.RSL.Audio.sfx('click');
    UI.openSheet(closeButton() + '<div class="chapters">' + levelsHTML() + '</div>');
  }

  /* =========================================================================
   * 2. 帮助
   * ========================================================================= */

  function helpCard(label, kind, formula, hint) {
    var attr = kind ? ' data-coach="' + kind + '"' : '';
    return '<div class="help-card"' + attr + ' role="button" tabindex="0"' +
      (hint ? ' title="' + esc(hint) + '"' : '') + '><b>' + esc(label) + '</b>' +
      UI.helpFormula(formula) + '</div>';
  }

  function helpStep(icon) {
    return '<span class="help-step"><span class="help-box"><svg class="icon"><use href="#' + icon + '"></use></svg></span></span>';
  }

  function openHelp() {
    host.RSL.Audio.sfx('click');
    UI.openSheet(closeButton() +
      '<div class="help">' +
        '<div class="help-steps">' +
          helpStep('i-plus') +
          helpStep('i-arrow-right') +
          helpStep('i-play') +
        '</div>' +
        '<div class="help-cards">' +
          helpCard('P', '', 'P / Q / R / S / T') +
          helpCard('x', '', 'x / y / z') +
          helpCard('F', '', 'F(x) / G(x) / H(x)') +
          helpCard('=', '', 'x = y') +
          helpCard('¬', '', '¬A') +
          helpCard('→', '', 'A→B') +
          helpCard('∀', '', '∀x A') +
          helpCard('∃', '', '∃x A') +
          helpCard('∈', '', 'x ∈ y') +
          helpCard('∧∨↔', '', '连接词') +
          helpCard('Ax', '', '公理 A1–A5') +
          helpCard('EXT', '', '外延公理') +
          helpCard('∅{,}∪', '', '空集/配对/并集') +
          helpCard('∧∨↔ 规则', '', '合取/析取/等值规则') +
          helpCard('S', '', 'A[P↦B]') +
          helpCard('M', '', 'A, A→B ⇒ B') +
          helpCard('∀I', '', 'A ⇒ ∀x A') +
          helpCard('∀*', '', 'A ⇒ A→∀x A') +
          helpCard('∀E', '', '∀x A ⇒ A[t/x]') +
          helpCard('=I', '', 't = t') +
          helpCard('=L', '', 'x=y, A(x) ⇒ A(y)') +
          helpCard('*NN', '', '已证定理') +
        '</div>' +
        '<div class="save-row">' +
          '<button class="save-btn" data-save-export title="保存存档" aria-label="保存存档"><svg class="icon"><use href="#i-arrow-down-tray"></use></svg></button>' +
          '<button class="save-btn" data-save-import title="加载存档" aria-label="加载存档"><svg class="icon"><use href="#i-arrow-up-tray"></use></svg></button>' +
        '</div>' +
      '</div>' +
      '<p class="credit">Design by yyxcnasd</p>');
  }

  /* =========================================================================
   * 3. 成就
   * ========================================================================= */

  function achievementsHTML() {
    var list = ACH.list;
    var got = list.filter(function (a) { return ctx.state.achievements[a.id]; }).length;
    var cards = list.map(function (a) {
      var on = !!ctx.state.achievements[a.id];
      return '<button class="achv' + (on ? ' is-on' : '') + '"' +
        (on ? ' data-achv="' + a.id + '"' : ' disabled') +
        ' title="' + esc(on ? a.name : '未解锁：' + a.name) + '" aria-label="' + esc(on ? a.name : '未解锁成就 ' + a.name) + '">' +
        (on
          ? '<span class="achv-icon"><svg class="icon"><use href="#' + a.symbol + '"></use></svg></span>'
          : '<span class="achv-q"><svg class="icon"><use href="#i-question-mark-circle"></use></svg></span>') +
      '</button>';
    }).join('');
    return '<div class="achv-grid">' + cards + '</div>';
  }

  function openAchievements() {
    host.RSL.Audio.sfx('click');
    UI.openSheet(closeButton() + achievementsHTML());
  }

  function openAchievement(id) {
    var a = ACH.byId[id];
    if (!a) return;
    var on = !!ctx.state.achievements[id];
    UI.openSheet(closeButton() +
      '<div class="achv-detail">' +
        '<button class="achv-back" data-back aria-label="返回成就列表"><svg class="icon"><use href="#i-arrow-left"></use></svg></button>' +
        '<div class="achv-detail-icon' + (on ? ' is-on' : '') + '">' +
          (on
            ? '<svg class="icon"><use href="#' + a.symbol + '"></use></svg>'
            : '<span class="achv-q"><svg class="icon"><use href="#i-question-mark-circle"></use></svg></span>') +
        '</div>' +
        '<h2>' + esc(a.name) + '</h2>' +
        '<p>' + esc(a.desc) + '</p>' +
      '</div>');
  }

  /* =========================================================================
   * 4. 通关面板
   * ========================================================================= */

  function winTargetHTML(data) {
    var T = host.RSL.Term;
    if (Array.isArray(data.tokens) && T) return T.toHTML(T.body(data.tokens), { full: true });
    if (data.target && T) {
      try { return T.toHTML(T.parse(data.target), { full: true }); } catch (e) { /* fallback */ }
    }
    return esc(data.targetUnicode || data.target || '');
  }

  /** data: { tokens, target, len, ref, isLast, caption } */
  function openWin(data) {
    var efficiency = Math.max(1, Math.min(100, Math.round(data.ref / Math.max(1, data.len) * 100)));
    var caption = data.caption || '推理长度：模块数 / 参考电路模块数';
    UI.openSheet(closeButton() +
      '<div class="win">' +
        '<div class="win-check"><svg class="icon"><use href="#i-check"></use></svg></div>' +
        '<div class="win-formula formula">' + winTargetHTML(data) + '</div>' +
        '<div class="win-len" title="' + esc(caption) + '">' +
          '<span class="metric-glyph"><svg class="icon"><use href="#i-squares-2x2"></use></svg></span>' +
          '<b>' + data.len + '</b><span class="metric-ref">/ ' + data.ref + '</span>' +
          '<span class="metric-bar"><i style="width:' + efficiency + '%"></i></span>' +
        '</div>' +
        '<button class="primary next-btn" data-next="1">' + (data.isLast ? '选关' : '下一关') + '</button>' +
      '</div>');
    UI.confetti();
  }

  /* =========================================================================
   * 5. 面板内点击
   * ========================================================================= */

  function handleClick(e) {
    var target = e.target;
    var card = target.closest && target.closest('[data-coach]');
    if (card) {
      UI.closeSheet();
      ctx.showCoachKind(card.dataset.coach);
      return;
    }
    var achv = target.closest && target.closest('[data-achv]');
    if (achv) { openAchievement(achv.dataset.achv); return; }
    if (target.closest && target.closest('[data-back]')) { openAchievements(); return; }
    if (target.closest && target.closest('[data-save-export]')) { ctx.exportSave(); return; }
    if (target.closest && target.closest('[data-save-import]')) { ctx.requestImport(); return; }
    var cell = target.closest && target.closest('[data-level]');
    if (cell) {
      var index = parseInt(cell.dataset.level, 10);
      if (ctx.isUnlocked(index)) ctx.loadLevel(index);
      return;
    }
    if (target.closest && target.closest('[data-next]')) { ctx.nextLevel(); return; }
  }

  host.RSL.Screens = {
    init: init,
    openLevels: openLevels,
    openHelp: openHelp,
    openAchievements: openAchievements,
    openAchievement: openAchievement,
    openWin: openWin
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
