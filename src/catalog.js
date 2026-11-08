/*!
 * 公理板 / AXIOM BOARD — RSL.Catalog
 *
 * 关卡目录：把 RSL.LEVELS（96 关手写内容）派生成章节分组、顺序、解锁链与元件栏。
 * 没有难度重排、没有生成关卡：顺序就是 campaign/ 里手写的顺序。
 */
(function (host) {
  'use strict';
  host.RSL = host.RSL || {};

  var chapters = host.RSL.CAMPAIGN || [];
  var levels = host.RSL.LEVELS || [];

  function build() {
    var counts = {};
    return levels.map(function (lv, i) {
      var copy = JSON.parse(JSON.stringify(lv));
      var ch = chapters[lv.chapter] || chapters[0];
      copy.chapterGroup = ch ? ch.id : 'Ⅰ';
      copy.chapterKey = ch ? ch.key : 'prop';
      copy.chapterOrder = (counts[lv.chapter] = (counts[lv.chapter] || 0) + 1);
      copy.index = i;
      copy.order = i + 1;
      copy.band = copy.chapterOrder <= 12 ? 'base' : 'challenge';
      copy.requires = i ? [levels[i - 1].code] : [];
      copy.difficulty = lv.difficulty || 0;
      return copy;
    });
  }

  function chapterOf(level) {
    if (!level) return 'Ⅰ';
    if (level.chapterGroup) return level.chapterGroup;
    var ch = chapters[level.chapter];
    return ch ? ch.id : 'Ⅰ';
  }

  function symbolOf(entry) {
    var kind = entry.kind;
    var cfg = entry.config || {};
    if (kind === 'atom') return cfg.name || 'P';
    if (kind === 'term') return cfg.name || 'x';
    if (kind === 'pred') return cfg.symbol || 'F';
    if (kind === 'all') return '∀' + (cfg.v || 'x');
    if (kind === 'axiom') return cfg.schema || 'Ax';
    if (kind === 'theorem') return '*' + String(cfg.n || 0).padStart(2, '0');
    if (kind === 'not') return '¬';
    if (kind === 'imp') return '→';
    var info = host.RSL.Engine.info ? host.RSL.Engine.info(kind) : null;
    return info && info.symbol ? info.symbol : kind;
  }

  function nameOf(entry) {
    var kind = entry.kind;
    var cfg = entry.config || {};
    if (kind === 'atom') return '原子命题 ' + cfg.name;
    if (kind === 'term') return '个体变元 ' + cfg.name;
    if (kind === 'pred') return cfg.symbol === '=' ? '等词 x = y' : '谓词 ' + cfg.symbol + '(x)';
    if (kind === 'all') return '全称 ∀' + cfg.v;
    if (kind === 'axiom') return '公理 ' + cfg.schema;
    if (kind === 'theorem') return '已证定理 *' + String(cfg.n || 0).padStart(2, '0');
    var info = host.RSL.Engine.info ? host.RSL.Engine.info(kind) : null;
    return info && info.label ? info.label : kind;
  }

  var RANK = {
    atom: 0, term: 1, pred: 2, not: 3, imp: 4, all: 5,
    axiom: 6, subst: 7, mp: 8, gen: 9, 'all-elim': 10, 'all-dist': 11,
    'eq-refl': 12, 'eq-subst': 13, theorem: 14
  };

  function partsForLevel(level) {
    var out = (level.palette || []).map(function (entry) {
      var kind = entry.kind;
      var cfg = Object.assign({}, entry.config || {});
      var symbol = symbolOf(entry);
      return {
        key: kind + ':' + JSON.stringify(cfg),
        kind: kind,
        symbol: symbol,
        name: nameOf(entry),
        config: cfg
      };
    });
    out.sort(function (a, b) { return (RANK[a.kind] || 0) - (RANK[b.kind] || 0); });
    return out;
  }

  function levelById(id) {
    for (var i = 0; i < levels.length; i += 1) if (levels[i].id === id) return levels[i];
    return null;
  }
  function levelByCode(code) {
    for (var i = 0; i < levels.length; i += 1) if (levels[i].code === code) return levels[i];
    return null;
  }

  host.RSL.Catalog = {
    CHAPTERS: chapters,
    build: build,
    chapterOf: chapterOf,
    partsForLevel: partsForLevel,
    levelById: levelById,
    levelByCode: levelByCode
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
