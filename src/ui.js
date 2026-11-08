/*!
 * 公理板 / AXIOM BOARD — RSL.UI
 *
 * DOM 基础件：元素表、公式 HTML、toast、面板（sheet）生命周期与滚动条、彩带。
 * 不持有游戏状态；只依赖 RSL.Logic 与 index.html 里固定的 id。
 * 经典脚本，无 ES module。
 */
(function (host) {
  'use strict';
  host.RSL = host.RSL || {};
  var L = host.RSL.Logic;

  var ELEMENT_IDS = [
    'levelBtn', 'goal', 'goalFormula', 'themeBtn', 'soundBtn', 'helpBtn', 'achvBtn', 'hintBtn', 'checkBtn',
    'progressFill', 'board', 'boardWorld', 'wireLayer', 'nodeLayer', 'tray', 'popover', 'toast',
    'overlay', 'sheet', 'coach', 'coachPop', 'saveFile', 'sheetBar'
  ];

  var els = {};
  var toastTimer = null;
  var sheetBarDrag = null;
  var sheetClickHandler = null;
  var lastFocus = null;

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function parse(text) {
    try { return L.parse(text); } catch (e) { return null; }
  }

  /* =========================================================================
   * 1. 公式显示
   *
   * 界面上统一用“全括号”写法（P→(Q→R) 的每个二元/量化子式都加括号），
   * 比 Logic.fmt 的最小括号更易读；DOM 结构与 .formula .f-* 样式约定一致。
   * ========================================================================= */

  function formulaHTML(ast) {
    try { return L.toHTML(ast, { full: true }); }
    catch (e) {
      try { return esc(L.fmt(ast)); } catch (e2) { return ''; }
    }
  }

  function goalHTML(text) {
    var ast = parse(text);
    return ast ? formulaHTML(ast) : esc(text);
  }

  /** 纯文本公式（帮助卡片用）：字母当变量斜体，其余按文本显示。 */
  function helpFormula(text) {
    return '<span class="formula help-formula">' + esc(text).replace(/[A-Za-z]/g, '<span class="f-var">$&</span>') + '</span>';
  }

  /* =========================================================================
   * 2. Toast
   * ========================================================================= */

  function toast(message) {
    clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add('is-on');
    toastTimer = setTimeout(function () { els.toast.classList.remove('is-on'); }, 1800);
  }

  /* =========================================================================
   * 3. Sheet（模态面板）与滚动条
   * ========================================================================= */

  function isSheetOpen() { return !els.overlay.hidden; }

  /* 模态期间让棋盘/顶栏/元件盘不可交互，读屏也不会跑到遮罩后面。 */
  function setBackgroundInert(inert) {
    var nodes = document.querySelectorAll('.topbar,.stage,.tray');
    Array.prototype.forEach.call(nodes, function (el) {
      if (inert) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
  }

  function openSheet(html) {
    if (!isSheetOpen()) lastFocus = document.activeElement;
    els.overlay.hidden = false;
    els.sheet.innerHTML = html;
    els.sheet.scrollTop = 0;
    setBackgroundInert(true);
    showSheetBar();
    focusSheet();
  }

  function closeSheet() {
    els.overlay.hidden = true;
    els.sheet.innerHTML = '';
    hideSheetBar();
    setBackgroundInert(false);
    if (lastFocus && typeof lastFocus.focus === 'function' && document.contains(lastFocus)) {
      try { lastFocus.focus({ preventScroll: true }); } catch (e) { lastFocus.focus(); }
    }
    lastFocus = null;
  }

  function focusSheet() {
    if (!els.sheet.hasAttribute('tabindex')) els.sheet.setAttribute('tabindex', '-1');
    try { els.sheet.focus({ preventScroll: true }); } catch (e) { els.sheet.focus(); }
  }

  function focusables() {
    var list = els.sheet.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])');
    return Array.prototype.filter.call(list, function (el) {
      return typeof el.tabIndex === 'number' && el.tabIndex >= 0;
    });
  }

  function trapTab(e) {
    if (!isSheetOpen() || e.key !== 'Tab') return;
    var list = focusables();
    if (!list.length) { e.preventDefault(); els.sheet.focus(); return; }
    var first = list[0], last = list[list.length - 1];
    var active = document.activeElement;
    if (!els.sheet.contains(active)) { e.preventDefault(); first.focus(); return; }
    if (e.shiftKey && (active === first || active === els.sheet)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
  }

  /* 兜底：部分浏览器/合成按键下 Tab 的默认行为会先把焦点交给 body，
     focusin 时把焦点拉回面板，保证模态期间焦点不逃逸。 */
  function keepFocusInSheet(e) {
    if (!isSheetOpen()) return;
    if (els.sheet.contains(e.target)) return;
    focusSheet();
  }

  function updateSheetBar() {
    if (!els.sheetBar || els.overlay.hidden) return;
    var sheet = els.sheet;
    var max = sheet.scrollHeight - sheet.clientHeight;
    if (max <= 2) { els.sheetBar.hidden = true; return; }
    var r = sheet.getBoundingClientRect();
    var trackH = Math.max(36, r.height - 100);
    els.sheetBar.hidden = false;
    els.sheetBar.style.left = (r.right - 24) + 'px';
    els.sheetBar.style.top = (r.top + 68) + 'px';
    els.sheetBar.style.height = trackH + 'px';
    var thumb = els.sheetBar.querySelector('i');
    var thumbH = Math.max(26, Math.min(trackH, trackH * sheet.clientHeight / sheet.scrollHeight));
    var thumbY = (sheet.scrollTop / max) * (trackH - thumbH);
    thumb.style.height = thumbH + 'px';
    thumb.style.top = Math.max(0, Math.min(trackH - thumbH, thumbY)) + 'px';
  }

  function showSheetBar() {
    if (!els.sheetBar) return;
    els.sheetBar.hidden = false;
    requestAnimationFrame(updateSheetBar);
  }

  function hideSheetBar() {
    if (els.sheetBar) els.sheetBar.hidden = true;
  }

  function bindSheetBar() {
    els.sheet.addEventListener('scroll', updateSheetBar);
    els.sheetBar.addEventListener('pointerdown', function (e) {
      if (els.sheetBar.hidden) return;
      var sheet = els.sheet;
      var max = sheet.scrollHeight - sheet.clientHeight;
      if (max <= 0) return;
      var barRect = els.sheetBar.getBoundingClientRect();
      var thumb = els.sheetBar.querySelector('i');
      if (e.target !== thumb) {
        sheet.scrollTop = clamp(((e.clientY - barRect.top) / barRect.height) * max, 0, max);
        updateSheetBar();
        return;
      }
      e.preventDefault();
      sheetBarDrag = {
        y: e.clientY,
        scroll: sheet.scrollTop,
        max: max,
        track: Math.max(1, els.sheetBar.clientHeight - thumb.offsetHeight)
      };
      if (els.sheetBar.setPointerCapture) els.sheetBar.setPointerCapture(e.pointerId);
    });
    document.addEventListener('pointermove', function (e) {
      if (!sheetBarDrag) return;
      els.sheet.scrollTop = sheetBarDrag.scroll + (e.clientY - sheetBarDrag.y) * sheetBarDrag.max / sheetBarDrag.track;
      updateSheetBar();
    });
    document.addEventListener('pointerup', function () { sheetBarDrag = null; });
    window.addEventListener('resize', updateSheetBar);
  }

  /* =========================================================================
   * 4. 彩带
   * ========================================================================= */

  function confetti() {
    var hostEl = els.sheet.querySelector('.win');
    if (!hostEl) return;
    hostEl.style.position = 'relative';
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
    hostEl.appendChild(box);
    setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 2200);
  }

  /* =========================================================================
   * 5. 初始化与事件绑定
   * ========================================================================= */

  function init() {
    ELEMENT_IDS.forEach(function (id) { els[id] = $(id); });
    bindSheetBar();
    els.overlay.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]') || e.target === els.overlay) { closeSheet(); return; }
      if (sheetClickHandler) sheetClickHandler(e);
    });
    document.addEventListener('keydown', trapTab, true);
    document.addEventListener('focusin', keepFocusInSheet, true);
    els.sheet.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var card = e.target.closest && e.target.closest('[data-coach]');
      if (!card) return;
      e.preventDefault();
      card.click();
    });
    return els;
  }

  /** 面板内点击（选关 / 成就 / 帮助 / 胜利）统一交给上层注册的处理器。 */
  function onSheetClick(handler) { sheetClickHandler = handler; }

  host.RSL.UI = {
    els: els,
    init: init,
    esc: esc,
    clamp: clamp,
    formulaHTML: formulaHTML,
    goalHTML: goalHTML,
    helpFormula: helpFormula,
    toast: toast,
    openSheet: openSheet,
    closeSheet: closeSheet,
    isSheetOpen: isSheetOpen,
    confetti: confetti,
    updateSheetBar: updateSheetBar,
    onSheetClick: onSheetClick
  };

  /* 兼容旧调用：board.js / 测试脚本里的 window.RSL.formatFormula。 */
  host.RSL.formatFormula = formulaHTML;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
