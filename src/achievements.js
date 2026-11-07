/* Achievement definitions and pure condition evaluation. */
(function () {
  'use strict';
  window.RSL = window.RSL || {};

  var LIST = [
    { id: 'first', symbol: 'i-play', name: '通电', desc: '完成第一关。' },
    { id: 'base-prop', symbol: 'i-book-open', name: '命题基础', desc: '打通命题章基础段。' },
    { id: 'base-pred', symbol: 'i-book-open', name: '谓词基础', desc: '打通谓词章基础段。' },
    { id: 'base-eq', symbol: 'i-book-open', name: '等词基础', desc: '打通等词章基础段。' },
    { id: 'base-set', symbol: 'i-book-open', name: '集合基础', desc: '打通集合章基础段。' },
    { id: 'chal-prop', symbol: 'i-star', name: '命题挑战', desc: '打通命题章挑战段。' },
    { id: 'chal-pred', symbol: 'i-star', name: '谓词挑战', desc: '打通谓词章挑战段。' },
    { id: 'chal-eq', symbol: 'i-star', name: '等词挑战', desc: '打通等词章挑战段。' },
    { id: 'chal-set', symbol: 'i-star', name: '集合挑战', desc: '打通集合章挑战段。' },
    { id: 'rule-subst', symbol: 'i-arrow-path', name: '代入', desc: '第一次使用 S 代入模块。' },
    { id: 'rule-replace', symbol: 'i-arrows-right-left', name: '置换', desc: '第一次使用 D 定义置换模块。' },
    { id: 'rule-detach', symbol: 'i-link', name: '分离', desc: '第一次使用 M 分离模块。' },
    { id: 'rule-quant', symbol: 'i-globe-alt', name: '量词', desc: '第一次使用全称、存在或三段论规则。' },
    { id: 'efficient', symbol: 'i-bolt', name: '短证明', desc: '在任一挑战关用不超过参考电路的模块数通关。' },
    { id: 'all', symbol: 'i-check-badge', name: '全通关', desc: '打通全部 240 关。' },
    { id: 'clean-three', symbol: 'i-check-badge', name: '干净三关', desc: '不删除模块完成 3 关。' },
    { id: 'three', symbol: 'i-book-open', name: '三关', desc: '累计通过 3 关。' },
    { id: 'prefix-clean', symbol: 'i-arrow-path', name: '前置同一', desc: '前置同一关用不超过 10 个模块通关。', metric: { level: 'CH1-08', max: 10 } },
    { id: 'hs-clean', symbol: 'i-link', name: '前件叠加', desc: '前件叠加关用不超过 13 个模块通关。', metric: { level: 'CH1-10', max: 13 } },
    { id: 'compose-clean', symbol: 'i-squares-2x2', name: '复合同一', desc: '复合同一关用不超过 5 个模块通关。', metric: { level: 'CH1-12', max: 5 } }
  ];

  var BY_ID = Object.create(null);
  LIST.forEach(function (a) { BY_ID[a.id] = a; });

  function evaluate(state) {
    var out = [];
    var solved = Object.keys(state.solved || {}).length;
    function add(id) { out.push(id); }
    if (solved >= 1) add('first');

    ['prop', 'pred', 'eq', 'set'].forEach(function (key) {
      var group = (state.levels || []).filter(function (lv) { return lv.chapter === key; });
      var base = group.filter(function (lv) { return lv.band !== 'challenge'; });
      var chal = group.filter(function (lv) { return lv.band === 'challenge'; });
      if (base.length && base.every(function (lv) { return state.solved[lv.id]; })) add('base-' + key);
      if (chal.length && chal.every(function (lv) { return state.solved[lv.id]; })) add('chal-' + key);
    });

    var kinds = state.usedKinds || {};
    if (kinds.subst) add('rule-subst');
    if (kinds.replace) add('rule-replace');
    if (kinds.detach) add('rule-detach');
    if (kinds['all-intro'] || kinds['all-elim'] || kinds.syllogism) add('rule-quant');

    var efficient = (state.levels || []).some(function (lv) {
      if (lv.band !== 'challenge') return false;
      var ref = lv.solution && lv.solution.nodes ? lv.solution.nodes.length : 0;
      return ref && state.bestLen[lv.id] && state.bestLen[lv.id] <= ref;
    });
    if (efficient) add('efficient');
    if (solved >= 3) add('three');
    if (Object.keys(state.cleanWins || {}).length >= 3) add('clean-three');

    LIST.forEach(function (a) {
      if (!a.metric) return;
      var best = state.bestLen[a.metric.level];
      if (best && best <= a.metric.max) add(a.id);
    });

    if ((state.levels || []).length && state.levels.every(function (lv) { return state.solved[lv.id]; })) add('all');
    return out.filter(function (id, i) { return out.indexOf(id) === i; });
  }

  window.RSL.Achievements = { list: LIST, byId: BY_ID, evaluate: evaluate };
})();
