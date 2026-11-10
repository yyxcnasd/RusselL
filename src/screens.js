/*!
 * 公理板 / AXIOM BOARD — RSL.Screens
 *
 * 面板内容：选关、帮助、成就、通关。只负责生成 HTML 与面板内交互，
 * 关卡切换/存档/提示等动作由 main.js 通过 init(ctx) 注入。
 *
 * 设计约定（见 docs/DESIGN.md）：
 *   - 少字：面板不写标题/说明，只保留数字、公式、代号与必要图例；
 *   - 面板内部是可点的 flat row（soft 底、无描边）；白贴纸材质只留给棋盘上的模块；
 *   - 对象语言用 → / ↔，规则层面用 ⇒ / ⇛；变量与公式一律 STIX 斜体。
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

  function tutorialCell(entry) {
    var lv = entry.lv, i = entry.i;
    var unlocked = ctx.isUnlocked(i);
    var cls = 'level-cell is-tutorial' + (i === ctx.state.index ? ' is-current' : '') +
      (ctx.state.solved[lv.id] ? ' is-solved' : '') +
      (unlocked ? '' : ' is-locked');
    var label = 'Tutorial ' + lv.code + (unlocked ? '' : ', locked');
    return '<button class="' + cls + '" data-level="' + i + '" aria-label="' + esc(label) + '"' +
      (unlocked ? '' : ' disabled') + '>' + esc(lv.code) + '</button>';
  }

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
    var no = (lv.no == null ? i + 1 : Number(lv.no));
    var label = 'Level ' + String(no).padStart(2, '0') + (unlocked ? '' : ', locked');
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
    var glyph = kind === 'tutorial' ? 'i-play'
      : kind === 'challenge' ? 'i-star'
      : 'i-book-open';
    return '<div class="band ' + kind + (firstLocked ? ' is-locked' : '') + '">' +
      '<div class="band-head">' +
        '<span class="band-glyph"><svg class="icon"><use href="#' + glyph + '"></use></svg></span>' +
        '<span class="band-count">' + solved + ' / ' + items.length + '</span>' +
      '</div>' +
      '<div class="levels">' + bandCells(items) + '</div>' +
    '</div>';
  }

  function bandCells(items) {
    return items.map(function (entry) {
      if (entry.lv.tutorial) return tutorialCell(entry);
      return levelCell(entry);
    }).join('');
  }

  function levelsHTML() {
    var items = ctx.state.levels.map(function (lv, i) { return { lv: lv, i: i }; });
    var tut = items.filter(function (x) { return x.lv.band === 'tutorial'; });
    var base = items.filter(function (x) { return x.lv.band === 'base'; });
    var chal = items.filter(function (x) { return x.lv.band === 'challenge'; });
    var demon = items.filter(function (x) { return x.lv.band === 'demon'; });
    var solved = items.filter(function (x) { return ctx.state.solved[x.lv.id]; }).length;
    return '<section class="chapter is-current">' +
      '<div class="chapter-head">' +
        '<span class="chapter-progress" aria-hidden="true"><i style="width:' + (solved / (items.length || 1) * 100) + '%"></i></span>' +
        '<span class="chapter-count">' + solved + ' / ' + items.length + '</span>' +
      '</div>' +
      bandHTML(tut, 'tutorial') +
      bandHTML(base, 'base') +
      bandHTML(chal, 'challenge') +
      bandHTML(demon, 'demon') +
    '</section>';
  }

  function openLevels() {
    host.RSL.Audio.sfx('click');
    UI.openSheet(closeButton() + '<div class="chapters">' + levelsHTML() + '</div>', 'sheet-levels');
  }

  function rankScore(score) {
    var s = Math.max(0, score | 0);
    var solved = Math.floor(s / 100000);
    return solved + ' 关 · ' + (s % 100000);
  }

  function openLeaderboard(data, state) {
    host.RSL.Audio.sfx('click');
    var total = state && state.levels ? state.levels.length : 0;
    function isLegend(row) { return !!total && Math.floor((row.score || 0) / 100000) >= total; }
    var body;
    if (!data) {
      body = '<p class="rank-empty">稍后再试</p>';
    } else {
      var rows = (data.list || []).map(function (row) {
        var legend = isLegend(row);
        return '<li class="rank-row' + (legend ? ' is-legend' : '') + '">' +
          '<span class="rank-no">' + row.rank + '</span>' +
          '<img class="rank-avatar" src="' + UI.esc(row.avatar) + '" alt="" loading="lazy">' +
          '<span class="rank-name">' + UI.esc(row.nickname) + '</span>' +
          '<span class="rank-score">' + (legend ? '<svg class="icon rank-crown"><use href="#i-crown"></use></svg>' : '') + rankScore(row.score) + '</span>' +
        '</li>';
      }).join('');
      if (!rows) rows = '<li class="rank-empty">还没有人上榜</li>';
      var mine = data.mine;
      var meLine = mine && mine.ranked
        ? '第 ' + mine.rank + ' 名 · ' + rankScore(mine.score) + (isLegend(mine) ? ' · <svg class="icon rank-crown"><use href="#i-crown"></use></svg>' : '')
        : '未上榜';
      body = '<p class="rank-me">' + meLine + '</p>' +
        '<ol class="rank-list">' + rows + '</ol>';
    }
    UI.openSheet(closeButton() +
      '<div class="rank-sheet">' +
        '<div class="rank-title">RANK</div>' +
        body +
      '</div>');
  }

  /* =========================================================================
   * 2. 帮助
   * ========================================================================= */

  function helpCard(label, formula, hint) {
    return '<div class="help-card"' +
      (hint ? ' title="' + esc(hint) + '"' : '') + '><b>' + esc(label) + '</b>' +
      UI.helpFormula(formula) + '</div>';
  }

  function helpStep(icon) {
    return '<span class="help-step"><span class="help-box"><svg class="icon"><use href="#' + icon + '"></use></svg></span></span>';
  }

  function openHelp() {
    host.RSL.Audio.sfx('click');
    var toy = host.RSL.CloudSave && host.RSL.CloudSave.isToyHost();
    var saveRow = toy ? '' :
      '<div class="save-row">' +
        '<button class="save-btn" data-save-export title="保存存档" aria-label="保存存档"><svg class="icon"><use href="#i-arrow-down-tray"></use></svg></button>' +
        '<button class="save-btn" data-save-import title="加载存档" aria-label="加载存档"><svg class="icon"><use href="#i-arrow-up-tray"></use></svg></button>' +
      '</div>';
    UI.openSheet(closeButton() +
      '<div class="help">' +
        '<div class="help-steps">' +
          helpStep('i-plus') +
          helpStep('i-arrow-right') +
          helpStep('i-play') +
        '</div>' +
        '<div class="help-cards">' +
          /* 单章命题演算：只列代入、分离与两条定义重写。 */
          helpCard('S', 'A[P↦B] ⇒ A′', '代入：把断言里的原子命题换成任意公式。') +
          helpCard('M', 'A · A→B ⇒ B', '分离：由 A 与 A→B 得到 B。') +
          helpCard('D', 'A∧B ⇛ ¬(A→¬B)', '定义展开：把公式里的 ∧/∨/↔ 按定义改写成只用 ¬/→ 的原始公式；只重写公式，不能凭空产生结论。') +
          helpCard('D⁻', '¬(A→¬B) ⇛ A∧B', '定义收缩：把原始公式折叠回 ∧/∨/↔ 的表面写法；只重写公式，不能凭空产生结论。') +
        '</div>' +
        (toy ? '<p class="cloud-note">存档自动同步到当前 B 站账号</p>' : '') +
        saveRow +
      '</div>' +
      '<p class="credit">Designed by yyxcnasd</p>');
  }

  var hintState = null;

  function hintAccessOk(kind, access) {
    if (!access) return false;
    return !!(access.preview || access.author || (kind === 'like' ? access.liked : access.followed));
  }

  function hintPageHTML() {
    var level = hintState.level;
    var page = hintState.page;
    var access = hintState.access;
    var pages = host.RSL.Hints.pages(level);
    var locked = page === 1 ? !hintAccessOk('like', access) : (page === 2 ? !hintAccessOk('follow', access) : false);
    var body;
    if (locked) {
      if (hintState.loading || !access) {
        body = '<p class="hint-text">检查…</p>';
      } else {
        body = '<div class="hint-lock">' +
          '<p class="hint-text">' + (page === 1 ? '点赞视频后解锁' : '关注 UP 主后解锁') + '</p>' +
          '<button class="hint-follow" data-' + (page === 1 ? 'like-video' : 'hint-follow') + '>' +
          (page === 1 ? '去点赞' : '关注') + '</button>' +
        '</div>';
      }
    } else {
      body = '<div class="hint-page' + (page === 2 ? ' is-recipe' : '') + '">' + UI.esc(pages[page]) + '</div>';
    }
    return closeButton() +
      '<div class="hint-sheet">' +
        '<div class="hint-kicker">' + UI.esc(level.code) + '</div>' +
        body +
        '<div class="hint-nav">' +
          '<button data-hint-prev aria-label="上一页"' + (page === 0 ? ' disabled' : '') + '>‹</button>' +
          '<span>' + (page + 1) + ' / 3</span>' +
          '<button data-hint-next aria-label="下一页"' + (page === 2 ? ' disabled' : '') + '>›</button>' +
        '</div>' +
      '</div>';
  }

  function renderHint() {
    UI.openSheet(hintPageHTML());
  }

  function loadHintAccess() {
    if (hintState.loading || hintState.access) return;
    hintState.loading = true;
    renderHint();
    host.RSL.Hints.access().then(function (access) {
      hintState.access = access || {};
      hintState.loading = false;
      if (hintState && UI.isSheetOpen()) renderHint();
    });
  }

  function openHint(level) {
    host.RSL.Audio.sfx('click');
    hintState = { level: level, page: 0, access: null, loading: false };
    renderHint();
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
        '<button class="primary next-btn" data-next="1" aria-label="' + (data.isLast ? '选关' : '下一关') + '"><svg class="icon"><use href="#i-arrow-right"></use></svg></button>' +
      '</div>');
    UI.confetti();
  }

  /* =========================================================================
   * 5. 面板内点击
   * ========================================================================= */

  function handleClick(e) {
    var target = e.target;
    var achv = target.closest && target.closest('[data-achv]');
    if (achv) { openAchievement(achv.dataset.achv); return; }
    if (target.closest && target.closest('[data-back]')) { openAchievements(); return; }
    if (target.closest && target.closest('[data-save-export]')) { ctx.exportSave(); return; }
    if (target.closest && target.closest('[data-save-import]')) { ctx.requestImport(); return; }
    if (target.closest && target.closest('[data-hint-prev]')) {
      if (hintState && hintState.page > 0) {
        hintState.page -= 1;
        renderHint();
      }
      return;
    }
    if (target.closest && target.closest('[data-hint-next]')) {
      if (hintState && hintState.page < 2) {
        hintState.page += 1;
        renderHint();
        if (hintState.page > 0) loadHintAccess();
      }
      return;
    }
    if (target.closest && target.closest('[data-like-video]')) {
      UI.closeSheet();
      if (ctx.likeVideo) ctx.likeVideo();
      return;
    }
    if (target.closest && target.closest('[data-hint-follow]')) {
      UI.closeSheet();
      if (ctx.followAuthor) ctx.followAuthor();
      return;
    }
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
    openHint: openHint,
    openLeaderboard: openLeaderboard,
    openAchievements: openAchievements,
    openAchievement: openAchievement,
    openWin: openWin
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
