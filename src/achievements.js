/* 成就定义与纯条件判定（新演算版）。 */
(function () {
  'use strict';
  window.RSL = window.RSL || {};

  var LIST = [
    { id: 'first', symbol: 'i-play', name: '第一步', desc: '完成任意一关。' },
    { id: 'three', symbol: 'i-book-open', name: '三关', desc: '累计完成 3 关。' },
    { id: 'ten', symbol: 'i-book-open', name: '十关', desc: '累计完成 10 关。' },
    { id: 'half', symbol: 'i-star', name: '半程', desc: '完成全部 135 关中的 68 关。' },
    { id: 'all', symbol: 'i-check-badge', name: '全通', desc: '完成全部 135 关。' },
    { id: 'chap-1', symbol: 'i-book-open', name: '命题章', desc: '完成第Ⅰ章全部 33 关。' },
    { id: 'chap-2', symbol: 'i-book-open', name: '谓词章', desc: '完成第Ⅱ章全部 34 关。' },
    { id: 'chap-3', symbol: 'i-book-open', name: '等词章', desc: '完成第Ⅲ章全部 34 关。' },
    { id: 'chap-4', symbol: 'i-star', name: '综合章', desc: '完成第Ⅳ章全部 34 关。' },
    { id: 'rule-subst', symbol: 'i-arrow-path', name: '代入', desc: '第一次使用代入模块。' },
    { id: 'rule-mp', symbol: 'i-link', name: '分离', desc: '第一次使用分离模块。' },
    { id: 'rule-gen', symbol: 'i-globe-alt', name: '全称', desc: '第一次使用全称推广 / 引入 / 例化。' },
    { id: 'rule-eq', symbol: 'i-squares-2x2', name: '等词', desc: '第一次使用等词自反或等词替换。' },
    { id: 'lemma', symbol: 'i-arrow-path', name: '引用定理', desc: '第一次引用 *NN 已证定理。' },
    { id: 'clean-three', symbol: 'i-check-badge', name: '干净三关', desc: '不删模块完成 3 关。' },
    { id: 'efficient', symbol: 'i-bolt', name: '短证明', desc: '用不超过参考电路的模块数完成任一挑战段关卡。' },
    { id: 'perfect', symbol: 'i-check-badge', name: '全干净', desc: '全部通关且都未删除模块。' },
    { id: 'hard-48', symbol: 'i-star', name: '挑战半程', desc: '完成任意 24 个困难关。' },
    { id: 'hard-all', symbol: 'i-star', name: '挑战全通', desc: '完成全部 96 个困难关。' },
    { id: 'no-hints', symbol: 'i-bolt', name: '独立完成', desc: '完成任意一关（提示功能在正式版）。' }
  ];

  var BY_ID = Object.create(null);
  LIST.forEach(function (a) { BY_ID[a.id] = a; });

  function evaluate(state) {
    var levels = state.levels || [];
    var numbered = levels.filter(function (lv) { return !lv.tutorial; });
    var solvedAll = levels.filter(function (lv) { return state.solved[lv.id]; });
    var solved = numbered.filter(function (lv) { return state.solved[lv.id]; });
    var out = [];
    function add(id) { out.push(id); }
    if (solvedAll.length >= 1) add('first');
    if (solvedAll.length >= 3) add('three');
    if (solvedAll.length >= 10) add('ten');
    if (solved.length >= Math.ceil(numbered.length / 2)) add('half');
    if (numbered.length && solved.length === numbered.length) add('all');

    for (var c = 0; c < 4; c += 1) {
      var group = numbered.filter(function (lv) { return Number(lv.chapter) === c; });
      if (group.length && group.every(function (lv) { return state.solved[lv.id]; })) add('chap-' + (c + 1));
    }

    var kinds = state.usedKinds || {};
    if (kinds.subst) add('rule-subst');
    if (kinds.mp) add('rule-mp');
    if (kinds.gen || kinds.shift || kinds['all-inst']) add('rule-gen');
    if (kinds['eq-refl'] || kinds.leibniz) add('rule-eq');
    if (kinds.theorem) add('lemma');

    var clean = numbered.filter(function (lv) { return state.cleanWins && state.cleanWins[lv.id]; }).length;
    if (clean >= 3) add('clean-three');
    if (numbered.length && clean >= numbered.length) add('perfect');

    var efficient = levels.some(function (lv) {
      if (!lv.hard) return false;
      var ref = lv.solution && lv.solution.nodes ? lv.solution.nodes.length : 0;
      return ref && state.bestLen[lv.id] && state.bestLen[lv.id] <= ref;
    });
    if (efficient) add('efficient');

    var hard = levels.filter(function (lv) { return lv.hard; });
    var hardSolved = hard.filter(function (lv) { return state.solved[lv.id]; }).length;
    if (hardSolved >= 24) add('hard-48');
    if (hard.length && hardSolved === hard.length) add('hard-all');
    if (solved.length >= 1) add('no-hints');

    return out.filter(function (id, i) { return out.indexOf(id) === i; });
  }

  window.RSL.Achievements = { list: LIST, byId: BY_ID, evaluate: evaluate };
})();
