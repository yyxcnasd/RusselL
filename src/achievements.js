/* 成就定义与纯条件判定（单章命题演算版）。 */
(function () {
  'use strict';
  window.RSL = window.RSL || {};

  var LIST = [
    { id: 'first', symbol: 'i-play', name: '第一步', desc: '完成任意一关。' },
    { id: 'three', symbol: 'i-book-open', name: '三关', desc: '累计完成 3 关。' },
    { id: 'ten', symbol: 'i-book-open', name: '十关', desc: '累计完成 10 关。' },
    { id: 'quarter', symbol: 'i-star', name: '四分之一', desc: '完成 22 个编号关。' },
    { id: 'half', symbol: 'i-star', name: '半程', desc: '完成 44 个编号关。' },
    { id: 'all', symbol: 'i-check-badge', name: '全通', desc: '完成全部 88 个编号关。' },
    { id: 'tutorial-all', symbol: 'i-book-open', name: '教程通关', desc: '完成全部 8 个教学关。' },
    { id: 'normal-all', symbol: 'i-book-open', name: '普通通关', desc: '完成全部 32 个普通关。' },
    { id: 'hard-first', symbol: 'i-bolt', name: '首个困难关', desc: '完成任意一个困难关。' },
    { id: 'hard-half', symbol: 'i-star', name: '困难半程', desc: '完成任意 28 个困难关。' },
    { id: 'hard-all', symbol: 'i-star', name: '困难全通', desc: '完成全部 56 个困难关。' },
    { id: 'rule-subst', symbol: 'i-arrow-path', name: '代入', desc: '第一次使用代入模块。' },
    { id: 'rule-mp', symbol: 'i-link', name: '分离', desc: '第一次使用分离模块。' },
    { id: 'rule-d', symbol: 'i-squares-2x2', name: '定义重写', desc: '第一次使用 D 或 D⁻。' },
    { id: 'lemma', symbol: 'i-arrow-path', name: '引用定理', desc: '第一次引用 *NN 已证定理。' },
    { id: 'clean-three', symbol: 'i-check-badge', name: '干净三关', desc: '不删模块完成 3 关。' },
    { id: 'clean-ten', symbol: 'i-check-badge', name: '干净十关', desc: '不删模块完成 10 关。' },
    { id: 'efficient', symbol: 'i-bolt', name: '短证明', desc: '用不超过参考电路的模块数完成任一困难关。' },
    { id: 'perfect', symbol: 'i-check-badge', name: '全干净', desc: '全部编号关通关且都未删除模块。' },
    { id: 'no-hints', symbol: 'i-bolt', name: '独立完成', desc: '完成任意一关（提示功能在正式版）。' }
  ];

  var BY_ID = Object.create(null);
  LIST.forEach(function (a) { BY_ID[a.id] = a; });

  function evaluate(state) {
    var levels = state.levels || [];
    var numbered = levels.filter(function (lv) { return !lv.tutorial; });
    var tutorials = levels.filter(function (lv) { return lv.tutorial; });
    var normals = levels.filter(function (lv) { return !lv.tutorial && !lv.hard; });
    var hards = levels.filter(function (lv) { return lv.hard; });
    var solvedAll = levels.filter(function (lv) { return state.solved[lv.id]; });
    var solved = numbered.filter(function (lv) { return state.solved[lv.id]; });
    var out = [];
    function add(id) { out.push(id); }
    function solvedCount(list) { return list.filter(function (lv) { return state.solved[lv.id]; }).length; }

    if (solvedAll.length >= 1) add('first');
    if (solvedAll.length >= 3) add('three');
    if (solvedAll.length >= 10) add('ten');
    if (solved.length >= 22) add('quarter');
    if (solved.length >= 44) add('half');
    if (numbered.length && solved.length === numbered.length) add('all');
    if (tutorials.length && solvedCount(tutorials) === tutorials.length) add('tutorial-all');
    if (normals.length && solvedCount(normals) === normals.length) add('normal-all');

    var hardSolved = solvedCount(hards);
    if (hardSolved >= 1) add('hard-first');
    if (hardSolved >= 28) add('hard-half');
    if (hards.length && hardSolved === hards.length) add('hard-all');

    var kinds = state.usedKinds || {};
    if (kinds.subst) add('rule-subst');
    if (kinds.mp) add('rule-mp');
    if (kinds['def-expand'] || kinds['def-contract']) add('rule-d');
    if (kinds.theorem) add('lemma');

    var clean = numbered.filter(function (lv) { return state.cleanWins && state.cleanWins[lv.id]; }).length;
    if (clean >= 3) add('clean-three');
    if (clean >= 10) add('clean-ten');
    if (numbered.length && clean >= numbered.length) add('perfect');

    var efficient = hards.some(function (lv) {
      var ref = lv.solution && lv.solution.nodes ? lv.solution.nodes.length : 0;
      return ref && state.bestLen[lv.id] && state.bestLen[lv.id] <= ref;
    });
    if (efficient) add('efficient');
    if (solved.length >= 1) add('no-hints');

    return out.filter(function (id, i) { return out.indexOf(id) === i; });
  }

  window.RSL.Achievements = { list: LIST, byId: BY_ID, evaluate: evaluate };
})();
