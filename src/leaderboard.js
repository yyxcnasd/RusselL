/* B 站 Toy 排行榜。
 * score = 已通关数 * 100000 + 效率分。
 * 效率分逐关取 min(1, 参考模块数 / 你的模块数) * 800，最后取整求和。
 * 通关数永远是第一关键字；同样通关数下，模块越少、越接近/优于参考解，分越高。
 */
(function () {
  'use strict';
  var root = typeof window !== 'undefined' ? window : globalThis;
  root.RSL = root.RSL || {};

  var BOARD = 1;
  var SOLVED_UNIT = 100000;
  var LEVEL_UNIT = 800;

  function toy() {
    return root.toy && typeof root.toy.getRankList === 'function' ? root.toy : null;
  }

  function isToy() {
    return !!(root.RSL.Hints && root.RSL.Hints.isToyHost());
  }

  function parts(state) {
    var solved = 0, quality = 0;
    (state.levels || []).forEach(function (lv) {
      if (!state.solved[lv.id]) return;
      solved += 1;
      var ref = (lv.solution && lv.solution.nodes.length) || 1;
      var best = state.bestLen[lv.id] || ref;
      quality += Math.round(LEVEL_UNIT * Math.min(1, ref / Math.max(1, best)));
    });
    return { solved: solved, quality: quality, score: solved * SOLVED_UNIT + quality };
  }

  function ensureSdk() {
    if (root.toy) return Promise.resolve(true);
    if (!root.RSL.Hints) return Promise.resolve(false);
    return root.RSL.Hints.loadSdk();
  }

  function submit(state) {
    if (!isToy()) return Promise.resolve(null);
    return ensureSdk().then(function (ok) {
      if (!ok || !toy()) return null;
      var p = parts(state);
      return toy().submitScore({ board: BOARD, score: p.score }).then(function (res) {
        return { score: res && res.score, parts: p };
      }).catch(function () { return null; });
    });
  }

  function load() {
    if (!isToy()) return Promise.resolve(null);
    return ensureSdk().then(function (ok) {
      if (!ok || !toy()) return null;
      return Promise.all([
        toy().getRankList({ board: BOARD, period: 'all', limit: 20 }),
        toy().getMyRank({ board: BOARD, period: 'all' })
      ]).then(function (res) {
        return { list: res[0] || [], mine: res[1] || null };
      }).catch(function () { return null; });
    });
  }

  root.RSL.Leaderboard = {
    BOARD: BOARD,
    SOLVED_UNIT: SOLVED_UNIT,
    LEVEL_UNIT: LEVEL_UNIT,
    parts: parts,
    isToy: isToy,
    submit: submit,
    load: load,
    format: function (score) {
      var s = Math.max(0, score | 0);
      return Math.floor(s / SOLVED_UNIT) + ' 关 · ' + (s % SOLVED_UNIT);
    }
  };
})();
