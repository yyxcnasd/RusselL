/*!
 * 公理板 / AXIOM BOARD — RSL.Coach
 *
 * 规则提示窗：只画“输入 → 模块 → 输出”，不显示本关答案。
 * 是否已经看过由 main.js 按关卡记录，这里只负责显示。
 */
(function (host) {
  'use strict';
  host.RSL = host.RSL || {};
  var UI = host.RSL.UI;

  /* 每个规则模块的输入输出示意；占位字母在显示时套上公式字体。 */
  var DIAGRAMS = {
    subst: '<span class="chip">P</span><span class="plus">+</span><span class="chip">B</span><span class="arrow">→</span><span class="coach-mod">S</span><span class="arrow">→</span><span class="chip">A</span>',
    detach: '<span class="chip">A</span><span class="chip">A→B</span><span class="arrow">→</span><span class="coach-mod">M</span><span class="arrow">→</span><span class="chip">B</span>',
    replace: '<span class="chip">A</span><span class="arrow">→</span><span class="coach-mod">D</span><span class="arrow">→</span><span class="chip">A′</span>',
    'all-intro': '<span class="chip">A</span><span class="arrow">→</span><span class="coach-mod">∀I</span><span class="arrow">→</span><span class="chip">∀x A</span>',
    'all-elim': '<span class="chip">∀x A</span><span class="arrow">→</span><span class="coach-mod">∀E</span><span class="arrow">→</span><span class="chip">A[t/x]</span>',
    'exists-intro': '<span class="chip">A[t/x]</span><span class="arrow">→</span><span class="coach-mod">∃I</span><span class="arrow">→</span><span class="chip">∃x A</span>',
    'exists-elim': '<span class="chip">∃x A</span><span class="chip">A[y/x]→B</span><span class="arrow">→</span><span class="coach-mod">∃E</span><span class="arrow">→</span><span class="chip">B</span>',
    syllogism: '<span class="chip">A→B</span><span class="chip">B→C</span><span class="arrow">→</span><span class="coach-mod">HS</span><span class="arrow">→</span><span class="chip">A→C</span>'
  };

  function info() { return UI.els.coachPop; }

  function hide() {
    var pop = info();
    if (!pop) return;
    pop.hidden = true;
    pop.innerHTML = '';
  }

  function showKind(kind) {
    if (!DIAGRAMS[kind]) return;
    var pop = info();
    if (!pop) return;
    pop.innerHTML = '<div class="coach-flow">' + DIAGRAMS[kind] + '</div>';
    pop.querySelectorAll('.chip').forEach(function (el) {
      var html = UI.esc(el.textContent).replace(/[A-Za-z]/g, '<span class="f-var">$&</span>');
      el.innerHTML = '<span class="formula">' + html + '</span>';
    });
    pop.hidden = false;
    host.RSL.Audio.sfx('click');
  }

  function init() {
    var pop = info();
    pop.addEventListener('click', hide);
    pop.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
  }

  host.RSL.Coach = {
    init: init,
    hide: hide,
    showKind: showKind,
    has: function (kind) { return !!DIAGRAMS[kind]; }
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
