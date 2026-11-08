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
  /* mm-replay 是独立分组，排在原有四章之后；只在特性开关打开时才出现。 */
  CHAPTER_RANK.MM = 4;

  function chapterOf(level) {
    if (level.chapter === 'mm') return 'MM';
    if (level.chapter === 'pred') return 'Ⅱ';
    if (level.chapter === 'eq') return 'Ⅲ';
    if (level.chapter === 'set') return 'Ⅳ';
    return 'Ⅰ';
  }

  function levelNo(level) {
    var m = /^CH\d+-(\d+)$/.exec(String(level.id || ''));
    return m ? parseInt(m[1], 10) : level._ord;
  }

  /** mm-replay 开关：flags.js 尚未加载（或没有启用）时一律按关闭处理。 */
  function mmEnabled() {
    var mm = host.RSL.MM;
    var flags = mm && mm.Flags;
    return !!(flags && typeof flags.enabled === 'function' && flags.enabled());
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

    /* mm-replay（契约 §7）：仅当特性开关为真时，把 RSL.MM_LEVELS 追加到目录末尾。
       重放关不进入原有四章，也不参与原有解锁链（requires 恒为空数组）；
       原有 240 关的 requires / chapter / band 一个字节都不改。 */
    if (mmEnabled()) {
      var mmLevels = host.RSL.MM_LEVELS;
      if (Array.isArray(mmLevels)) {
        mmLevels.forEach(function (level) {
          var copy = Object.assign({}, level);
          copy.chapter = level.chapter || 'mm';
          copy.band = level.band || 'mm';
          copy.targetPos = level.targetPos || { x: 650, y: 300 };
          copy.allowed = (level.allowed || []).slice();
          copy.solution = level.solution || { nodes: [], edges: [] };
          copy._ord = list.length;
          copy.chapterGroup = 'MM';
          copy.requires = [];
          list.push(copy);
        });
      }
    }

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

  /* 调色板分组顺序：原子 → 构造/连接词 → 公理/已证/档案 → 规则。
     关卡 allowed 里的顺序只作组内顺序；有 subst 的关卡自动补进来的构造模块
     因此会排在原子右侧、公理与推理模块之前，而不是被追加到最末尾。 */
  var PART_RANK = {
    atom: 0,
    not: 1, imp: 1, or: 1, and: 1, iff: 1, pred: 1, term: 1, quant: 1,
    axiom: 2, theorem: 2, archive: 2,
    subst: 3, replace: 3, detach: 3, syllogism: 3,
    'all-intro': 3, 'all-elim': 3, 'exists-intro': 3, 'exists-elim': 3
  };
  function partRank(part) {
    var rank = PART_RANK[part.kind];
    return rank === undefined ? 9 : rank;
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
    /* Array.prototype.sort 在 ES2019+ 稳定：同组内保持 allowed 原顺序。 */
    out.sort(function (a, b) { return partRank(a) - partRank(b); });
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
