/*!
 * 公理板 / AXIOM BOARD — RSL.Screens
 *
 * 面板内容：选关、帮助、成就、通关。只负责生成 HTML 与面板内交互，
 * 关卡切换/存档/提示等动作由 main.js 通过 init(ctx) 注入。
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
      (lv.challenge ? ' is-challenge' : '') +
      (lv.band === 'challenge' ? ' is-challenge-band' : '') +
      (unlocked ? '' : ' is-locked');
    return '<button class="' + cls + '" data-level="' + i + '" aria-label="第 ' + (i + 1) + ' 关' + (unlocked ? '' : '，未解锁') + '"' +
      (unlocked ? '' : ' disabled') + style + '>' +
      String(i + 1).padStart(2, '0') +
      '<i class="eff" aria-hidden="true"></i>' +
      '</button>';
  }

  function bandHTML(items, kind) {
    if (!items.length) return '';
    var solved = items.filter(function (x) { return ctx.state.solved[x.lv.id]; }).length;
    var firstLocked = !ctx.isUnlocked(items[0].i);
    var glyph = kind === 'challenge' ? 'i-star' : 'i-book-open';
    return '<div class="band ' + kind + (firstLocked ? ' is-locked' : '') + '">' +
      '<div class="band-head" title="' + (kind === 'challenge' ? '挑战' : '基础') + '">' +
        '<span class="band-glyph"><svg class="icon"><use href="#' + glyph + '"></use></svg></span>' +
        '<span class="band-progress" aria-hidden="true"><i style="width:' + (solved / items.length * 100) + '%"></i></span>' +
      '</div>' +
      '<div class="levels">' + items.map(levelCell).join('') + '</div>' +
    '</div>';
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
      var base = items.filter(function (x) { return x.lv.band !== 'challenge'; });
      var chal = items.filter(function (x) { return x.lv.band === 'challenge'; });
      var chapterLocked = !ctx.isUnlocked(items[0].i);
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
  }

  function openLevels() {
    host.RSL.Audio.sfx('click');
    UI.openSheet('<button class="sheet-x" data-close aria-label="关闭"><svg class="icon"><use href="#i-x-mark"></use></svg></button>' +
      '<div class="chapters">' + levelsHTML() + '</div>');
  }

  /* =========================================================================
   * 2. 帮助
   * ========================================================================= */

  function helpCard(label, kind, formula) {
    return '<div class="help-card" role="button" tabindex="0" data-coach="' + kind + '"><b>' + esc(label) + '</b>' +
      UI.helpFormula(formula) + '</div>';
  }

  function openHelp() {
    host.RSL.Audio.sfx('click');
    UI.openSheet(
      '<button class="sheet-x" data-close aria-label="关闭"><svg class="icon"><use href="#i-x-mark"></use></svg></button>' +
      '<div class="help">' +
        '<div class="help-steps">' +
          '<span class="help-box"><svg class="icon"><use href="#i-plus"></use></svg></span>' +
          '<span class="help-box"><svg class="icon"><use href="#i-arrow-right"></use></svg></span>' +
          '<span class="help-box"><svg class="icon"><use href="#i-play"></use></svg></span>' +
        '</div>' +
        '<div class="help-cards">' +
          helpCard('S', 'subst', 'A · P+B · Q+C ⇒ A′') +
          helpCard('M', 'detach', 'A · (A→B) ⇒ B') +
          helpCard('D', 'replace', 'A→B ⇔ ¬A∨B') +
          helpCard('HS', 'syllogism', '(A→B) · (B→C) ⇒ (A→C)') +
          helpCard('∀I', 'all-intro', 'A ⇒ ∀x A') +
          helpCard('∀E', 'all-elim', '∀x A ⇒ A[t/x]') +
          helpCard('∃I', 'exists-intro', 'A[t/x] ⇒ ∃x A') +
          helpCard('∃E', 'exists-elim', '∃x A · (A[y/x]→B) ⇒ B') +
        '</div>' +
        '<div class="save-row">' +
          '<button class="save-btn" data-save-export title="保存存档" aria-label="保存存档"><svg class="icon"><use href="#i-arrow-down-tray"></use></svg><span>保存</span></button>' +
          '<button class="save-btn" data-save-import title="加载存档" aria-label="加载存档"><svg class="icon"><use href="#i-arrow-up-tray"></use></svg><span>加载</span></button>' +
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
        ' title="' + esc(on ? a.name : '未解锁') + '" aria-label="' + esc(on ? a.name : '未解锁成就') + '">' +
        (on
          ? '<span class="achv-icon"><svg class="icon"><use href="#' + a.symbol + '"></use></svg></span>'
          : '<span class="achv-q"><svg class="icon"><use href="#i-question-mark-circle"></use></svg></span>') +
      '</button>';
    }).join('');
    return '<div class="achv-head"><span class="achv-count">' + got + ' / ' + list.length + '</span>' +
      '<span class="achv-bar"><i style="width:' + (got / list.length * 100) + '%"></i></span></div>' +
      '<div class="achv-grid">' + cards + '</div>';
  }

  function openAchievements() {
    host.RSL.Audio.sfx('click');
    UI.openSheet('<button class="sheet-x" data-close aria-label="关闭"><svg class="icon"><use href="#i-x-mark"></use></svg></button>' +
      achievementsHTML());
  }

  function openAchievement(id) {
    var a = ACH.byId[id];
    if (!a) return;
    var on = !!ctx.state.achievements[id];
    UI.openSheet(
      '<button class="sheet-x" data-close aria-label="关闭"><svg class="icon"><use href="#i-x-mark"></use></svg></button>' +
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

  /** data: { target, len, ref, isLast } */
  function openWin(data) {
    var efficiency = Math.max(1, Math.min(100, Math.round(data.ref / Math.max(1, data.len) * 100)));
    UI.openSheet(
      '<button class="sheet-x" data-close aria-label="关闭"><svg class="icon"><use href="#i-x-mark"></use></svg></button>' +
      '<div class="win">' +
        '<div class="win-check"><svg class="icon"><use href="#i-check"></use></svg></div>' +
        '<div class="win-formula formula">' + UI.goalHTML(data.target) + '</div>' +
        '<div class="win-len" title="推理长度：模块数 / 参考电路模块数">' +
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
