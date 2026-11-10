/* 成就定义与纯条件判定（108 关单章版）。
 * 只保留少量有辨识度的目标：通关带、引理、连接词组合、超长证明、夜猫子等。 */
(function () {
  'use strict';
  window.RSL = window.RSL || {};

  var LIST = [
    { id: 'first', symbol: 'i-play', name: '第一步', desc: '完成任意一关。' },
    { id: 'ten', symbol: 'i-book-open', name: '十关', desc: '累计完成 10 个编号关。' },
    { id: 'normal-all', symbol: 'i-book-open', name: '普通全通', desc: '完成全部普通关。' },
    { id: 'hard-all', symbol: 'i-star', name: '困难全通', desc: '完成全部困难关。' },
    { id: 'demon-all', symbol: 'i-bolt', name: '魔王全通', desc: '完成全部魔王关。' },
    { id: 'all', symbol: 'i-check-badge', name: '全通', desc: '完成全部 108 关。' },
    { id: 'flash-win', symbol: 'i-bolt', name: '闪电战', desc: '在 60 秒内完成任意一关。' },
    { id: 'persistent', symbol: 'i-arrow-path', name: '失败是成功之母', desc: '累计 10 次校验未通过。' },
    { id: 'declutter', symbol: 'i-x-mark', name: '断舍离', desc: '累计删除 30 个模块。' },
    { id: 'copycat', symbol: 'i-arrow-down-tray', name: '拿来主义', desc: '第一次粘贴一整段电路。' },
    { id: 'axiom-set', symbol: 'i-book-open', name: '公理集齐', desc: '在通关证明里用过 A1、A2、A3。' },
    { id: 'd-both', symbol: 'i-squares-2x2', name: '反复横跳', desc: '在同一关同时使用 D 和 D⁻。' },
    { id: 'later-lemma', symbol: 'i-arrow-right', name: '后来居上', desc: '引用一个编号更晚但已通关的关卡。' },
    { id: 'lemma', symbol: 'i-arrow-path', name: '站在巨人的肩上', desc: '第一次把已通关的关卡当作引理引用。' },
    { id: 'five-conn', symbol: 'i-squares-2x2', name: '五连', desc: '在一局证明里同时用 ¬、→、∧、∨、↔。' },
    { id: 'long-proof', symbol: 'i-trophy', name: '大而无当', desc: '构造一个包含至少 40 个模块的超长证明。' },
    { id: 'efficient-demon', symbol: 'i-bolt', name: '魔王效率', desc: '用不超过参考电路的模块数完成任一魔王关。' },
    { id: 'clean-hard', symbol: 'i-check-badge', name: '干净困难', desc: '不删模块完成 10 个困难关。' },
    { id: 'no-theorem-hard', symbol: 'i-link', name: '徒手', desc: '不引用任何引理完成一个困难关。' },
    { id: 'night-owl', symbol: 'i-moon', name: '夜猫子', desc: '在 0:00–5:00 之间完成一关。' }
  ];

  var BY_ID = Object.create(null);
  LIST.forEach(function (a) { BY_ID[a.id] = a; });

  function evaluate(state) {
    var levels = state.levels || [];
    var numbered = levels.filter(function (lv) { return !lv.tutorial; });
    var normals = levels.filter(function (lv) { return lv.band === 'base'; });
    var hards = levels.filter(function (lv) { return lv.band === 'challenge'; });
    var demons = levels.filter(function (lv) { return lv.band === 'demon'; });
    var solvedAll = levels.filter(function (lv) { return state.solved[lv.id]; });
    var solved = numbered.filter(function (lv) { return state.solved[lv.id]; });
    var out = [];
    function add(id) { out.push(id); }
    function solvedCount(list) { return list.filter(function (lv) { return state.solved[lv.id]; }).length; }

    if (solvedAll.length >= 1) add('first');
    if (solved.length >= 10) add('ten');
    if (normals.length && solvedCount(normals) === normals.length) add('normal-all');
    if (hards.length && solvedCount(hards) === hards.length) add('hard-all');
    if (demons.length && solvedCount(demons) === demons.length) add('demon-all');
    if (levels.length && solvedAll.length === levels.length) add('all');

    if (state.fastWin) add('flash-win');
    if ((state.failedChecks || 0) >= 10) add('persistent');
    if ((state.deletions || 0) >= 30) add('declutter');
    if ((state.pastes || 0) >= 1) add('copycat');
    var axioms = state.usedAxioms || [];
    if (['A1', 'A2', 'A3'].every(function (id) { return axioms.indexOf(id) >= 0; })) add('axiom-set');
    if (Object.keys(state.levelKinds || {}).some(function (id) {
      var kinds = state.levelKinds[id] || [];
      return kinds.indexOf('def-expand') >= 0 && kinds.indexOf('def-contract') >= 0;
    })) add('d-both');
    if (state.laterLemma) add('later-lemma');

    if ((state.usedKinds && state.usedKinds.theorem) ||
      (state.levelKinds && Object.keys(state.levelKinds).some(function (id) {
        return (state.levelKinds[id] || []).indexOf('theorem') >= 0;
      }))) add('lemma');

    var ops = state.usedOps || [];
    if (['not', 'imp', 'and', 'or', 'iff'].every(function (op) { return ops.indexOf(op) >= 0; })) add('five-conn');

    if ((state.maxLen || 0) >= 40) add('long-proof');

    var efficientDemon = demons.some(function (lv) {
      var ref = lv.solution && lv.solution.nodes ? lv.solution.nodes.length : 0;
      return ref && state.bestLen[lv.id] && state.bestLen[lv.id] <= ref;
    });
    if (efficientDemon) add('efficient-demon');

    var cleanHard = hards.filter(function (lv) { return state.cleanWins && state.cleanWins[lv.id]; }).length;
    if (cleanHard >= 10) add('clean-hard');

    var bareHard = hards.some(function (lv) {
      if (!state.solved[lv.id]) return false;
      var kinds = state.levelKinds && state.levelKinds[lv.id];
      return Array.isArray(kinds) && kinds.indexOf('theorem') < 0;
    });
    if (bareHard) add('no-theorem-hard');

    if (state.nightOwl) add('night-owl');

    return out.filter(function (id, i) { return out.indexOf(id) === i; });
  }

  window.RSL.Achievements = { list: LIST, byId: BY_ID, evaluate: evaluate };
})();
