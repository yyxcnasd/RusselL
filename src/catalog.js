/*!
 * 公理板 / AXIOM BOARD — RSL.Catalog
 *
 * 关卡目录的运行时视图：章节分组、排序、解锁链、调色板条目。
 * 输入是只读的 RSL.LEVELS / RSL.PARTS / RSL.ARCHIVE / RSL.AXIOMS，
 * 输出是派生的关卡副本（不修改原始数据）。
 */
(function (host) {
  'use strict';
  host.RSL = host.RSL || {};
  var L = host.RSL.Logic;

  /* 四章：roman 用于界面，key 对应关卡数据里的 chapter 字段。 */
  var CHAPTERS = [
    { id: 'Ⅰ', key: 'prop', title: '命题' },
    { id: 'Ⅱ', key: 'pred', title: '谓词' },
    { id: 'Ⅲ', key: 'eq', title: '等词' },
    { id: 'Ⅳ', key: 'set', title: '集合' }
  ];
  var CHAPTER_RANK = {};
  CHAPTERS.forEach(function (c, i) { CHAPTER_RANK[c.id] = i; });

  function chapterOf(level) {
    if (level.chapter === 'pred') return 'Ⅱ';
    if (level.chapter === 'eq') return 'Ⅲ';
    if (level.chapter === 'set') return 'Ⅳ';
    return 'Ⅰ';
  }

  function levelNo(level) {
    var m = /^CH\d+-(\d+)$/.exec(String(level.id || ''));
    return m ? parseInt(m[1], 10) : level._ord;
  }

  var CONSTRUCT_KINDS = ['not', 'imp', 'or', 'and', 'iff', 'pred', 'term', 'quant'];

  /* 有代入的关卡必须能构造目标里出现的连接词，否则玩家无法把公式当作代入项。 */
  function allowConstructors(level) {
    if (level.allowed.indexOf('subst') < 0) return;
    if (level.allowed.indexOf('atom') < 0) level.allowed.push('atom');
    var ast = null;
    try { ast = L.parse(level.target); } catch (e) { return; }
    (function walk(n) {
      if (!n) return;
      var kind = n.k;
      if (kind === 'all' || kind === 'exists') kind = 'quant';
      if (CONSTRUCT_KINDS.indexOf(kind) >= 0 && level.allowed.indexOf(kind) < 0) level.allowed.push(kind);
      if (n.a) walk(n.a);
      if (n.b) walk(n.b);
      if (n.args) n.args.forEach(walk);
    })(ast);
  }

  /** 生成运行时关卡目录：补齐字段、按章/关号排序、串好基础段与挑战段的解锁链。 */
  function build() {
    var list = (host.RSL.LEVELS || []).map(function (level, i) {
      var copy = Object.assign({}, level);
      copy.chapter = level.chapter || 'prop';
      copy.band = level.band || 'base';
      copy.targetPos = level.targetPos || { x: 650, y: 300 };
      copy.allowed = (level.allowed || []).slice();
      copy.solution = level.solution || { nodes: [], edges: [] };
      copy._ord = i;
      copy.chapterGroup = chapterOf(copy);
      allowConstructors(copy);
      return copy;
    });

    list.sort(function (a, b) {
      return (CHAPTER_RANK[a.chapterGroup] - CHAPTER_RANK[b.chapterGroup]) || (levelNo(a) - levelNo(b));
    });

    var prevBaseLast = null;
    CHAPTERS.forEach(function (chapter) {
      var group = list.filter(function (lv) { return lv.chapterGroup === chapter.id; });
      var base = group.filter(function (lv) { return lv.band !== 'challenge'; });
      var challenge = group.filter(function (lv) { return lv.band === 'challenge'; });
      base.forEach(function (lv, i) {
        lv.requires = i === 0 ? (prevBaseLast ? [prevBaseLast] : []) : [base[i - 1].id];
        lv.challenge = false;
      });
      challenge.forEach(function (lv, i) {
        lv.requires = i === 0
          ? (base.length ? [base[base.length - 1].id] : (prevBaseLast ? [prevBaseLast] : []))
          : [challenge[i - 1].id];
        lv.challenge = i === challenge.length - 1;
      });
      if (base.length) prevBaseLast = base[base.length - 1].id;
    });

    return list;
  }

  function isUnlocked(state, levels, index) {
    var level = levels[index];
    if (!level) return false;
    if (state.forceUnlock) return true;
    return (level.requires || []).every(function (id) { return !!state.solved[id]; });
  }

  function levelById(id) {
    var levels = host.RSL.LEVELS || [];
    for (var i = 0; i < levels.length; i += 1) if (levels[i].id === id) return levels[i];
    return null;
  }

  /** 关卡调色板：把 allowed 里的 key 解析成可放置的模块条目。 */
  function partsForLevel(level) {
    var allowed = level.allowed || [];
    var pool = host.RSL.PARTS || [];
    var out = [];
    allowed.forEach(function (key) {
      if (key === 'target') return;
      var part = pool.filter(function (x) { return x.key === key; })[0];
      if (!part && key.indexOf('theorem:') === 0) {
        var lv = levelById(key.slice(8));
        if (lv) {
          part = {
            key: key, kind: 'theorem', symbol: '*' + (lv.code || lv.id).split('-').pop(),
            name: '已证 ' + (lv.code || lv.id) + ' · ' + (lv.title || ''),
            code: lv.id, config: { theoremCode: lv.id }
          };
        }
      }
      if (!part && key.indexOf('archive:') === 0) {
        var label = key.slice(8);
        var ar = host.RSL.ARCHIVE && host.RSL.ARCHIVE[label];
        if (ar) {
          part = {
            key: key, kind: 'archive', symbol: label.slice(0, 6),
            name: 'set.mm ' + label + ' · ' + (ar.name || ''),
            code: label, config: { label: label }
          };
        }
      }
      if (!part && key.indexOf('axiom:') === 0) {
        var id = key.slice(6);
        var ax = host.RSL.axiomById ? host.RSL.axiomById(id) : null;
        if (ax) {
          part = {
            key: key, kind: 'axiom', symbol: ax.symbol || id,
            name: (ax.type === 'definition' ? '定义 ' : ax.type === 'theorem' ? '定理 ' : '公理 ') + ax.code + ' · ' + ax.name,
            code: ax.code, config: { axiomId: id }
          };
        }
      }
      if (part) out.push(part);
    });
    return out;
  }

  host.RSL.Catalog = {
    CHAPTERS: CHAPTERS,
    chapterOf: chapterOf,
    build: build,
    isUnlocked: isUnlocked,
    levelById: levelById,
    partsForLevel: partsForLevel
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
