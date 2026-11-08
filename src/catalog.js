/*!
 * 公理板 / AXIOM BOARD — RSL.Catalog
 *
 * 关卡目录的运行时视图：章节分组、统一难度排序、分段与解锁链、调色板条目。
 * 输入是只读的 RSL.LEVELS / RSL.MM_LEVELS / RSL.PARTS / RSL.ARCHIVE / RSL.AXIOMS，
 * 输出是派生的关卡副本（不修改原始数据）。
 *
 * 关卡进程（重新设计后）：
 *   每章 72 关 = 12 个手工/引导关（固定 01–12，豁免单调）
 *              + 48 个接线关（现有生成关，内容不变）
 *              + 12 个 set.mm 证明重放关
 *   13–72 这 60 个按统一难度 D 升序交错排列，位置 1–36 为基础段、37–72 为挑战段，
 *   所以重放关不是独立的一段，而是按难度插在接线关之间（避免段边界断崖）。
 *
 * 难度标尺（见 docs/LEVEL-DESIGN-PROPOSAL.md）：
 *   接线 D = 参考电路模块数 + 0.1 × 目标公式 AST 节点数
 *   重放 D = 1.4 + 2.2417 × log2(1 + 证明步骤数)      （0 步 = 1.4，304 步 ≈ 19.9）
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

  /* 每章结构：12 手工/引导 + 48 接线 + 12 重放 = 72；基础段 36、挑战段 36。 */
  var HAND_SIZE = 12;
  var CHAPTER_SIZE = 72;
  var BAND_SPLIT = 36;

  var REPLAY_D_BASE = 1.4;
  var REPLAY_D_K = 2.2417;

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

  /** mm-replay 开关：flags.js 尚未加载（或没有启用）时一律按关闭处理。 */
  function mmEnabled() {
    var mm = host.RSL.MM;
    var flags = mm && mm.Flags;
    return !!(flags && typeof flags.enabled === 'function' && flags.enabled());
  }

  function astNodes(ast) {
    if (!ast || typeof ast !== 'object' || !ast.k) return 0;
    var n = 1;
    if (Array.isArray(ast.args)) ast.args.forEach(function (x) { n += astNodes(x); });
    if (ast.a) n += astNodes(ast.a);
    if (ast.b) n += astNodes(ast.b);
    return n;
  }

  /** 统一难度：接线 N + 0.1·AST，重放 1.4 + 2.2417·log2(1+steps)。 */
  function difficultyOf(level) {
    if (level.mode === 'mm-proof') {
      var steps = level.stats && typeof level.stats.steps === 'number' ? level.stats.steps : 0;
      return REPLAY_D_BASE + REPLAY_D_K * Math.log(1 + steps) / Math.LN2;
    }
    var nodes = level.solution && level.solution.nodes ? level.solution.nodes.length : 0;
    var ast = 0;
    try { ast = astNodes(L.parse(level.target)); } catch (e) { ast = 0; }
    return nodes + 0.1 * ast;
  }

  /** 生成运行时关卡目录：每章按统一难度交错排列，并串好解锁链。 */
  function build() {
    var list = (host.RSL.LEVELS || []).map(function (level, i) {
      return normalize(level, i);
    });

    /* mm-replay：开关打开时把重放关并进对应章节，参与统一难度排序。 */
    if (mmEnabled()) {
      var mmLevels = host.RSL.MM_LEVELS;
      if (Array.isArray(mmLevels)) {
        mmLevels.forEach(function (level, i) {
          var copy = normalize(level, list.length + i);
          copy.mode = level.mode || 'mm-proof';
          copy.chapterOrder = level.chapterOrder || (i + 1);
          list.push(copy);
        });
      }
    }

    var groups = {};
    CHAPTERS.forEach(function (c) { groups[c.id] = []; });
    list.forEach(function (lv) { (groups[chapterOf(lv)] || groups['Ⅰ']).push(lv); });

    var out = [];
    var prevBaseLast = null;
    CHAPTERS.forEach(function (chapter) {
      var group = groups[chapter.id] || [];
      var hasReplay = group.some(function (lv) { return lv.mode === 'mm-proof'; });
      var ordered;
      var baseEnd;
      if (hasReplay) {
        /* 新进程：12 手工固定，其余 60 个（接线 + 重放）按统一难度 D 升序交错；
           位置 1–36 基础段、37–72 挑战段。 */
        var hand = group.filter(function (lv) {
          return lv.mode !== 'mm-proof' && levelNo(lv) <= HAND_SIZE;
        }).sort(function (a, b) { return levelNo(a) - levelNo(b); });
        var handSet = {};
        hand.forEach(function (lv) { handSet[lv.id] = true; });
        var rest = group.filter(function (lv) { return !handSet[lv.id]; }).map(function (lv) {
          var d = difficultyOf(lv);
          lv._difficulty = d;
          return { lv: lv, d: d };
        });
        rest.sort(function (a, b) {
          return (a.d - b.d) || String(a.lv.id).localeCompare(String(b.lv.id));
        });
        ordered = hand.concat(rest.map(function (x) { return x.lv; }));
        baseEnd = BAND_SPLIT;
      } else {
        /* 关闭重放段时回到旧版 240 关布局：基础按关号 → 挑战按关号，基础 30 / 挑战 30。 */
        var oldBase = group.filter(function (lv) { return lv.band !== 'challenge'; })
          .sort(function (a, b) { return levelNo(a) - levelNo(b); });
        var oldChal = group.filter(function (lv) { return lv.band === 'challenge'; })
          .sort(function (a, b) { return levelNo(a) - levelNo(b); });
        ordered = oldBase.concat(oldChal);
        baseEnd = oldBase.length;
        if (ordered.length > CHAPTER_SIZE) baseEnd = BAND_SPLIT;
        if (ordered.length <= CHAPTER_SIZE && baseEnd >= ordered.length) baseEnd = Math.ceil(ordered.length / 2);
      }

      ordered.forEach(function (lv, i) {
        if (hasReplay) lv.band = i < baseEnd ? 'base' : 'challenge';
        lv.challenge = i === ordered.length - 1;
        lv.chapterOrder = i + 1;
        lv.requires = i === 0 ? (prevBaseLast ? [prevBaseLast] : []) : [ordered[i - 1].id];
        lv.difficulty = Math.round((lv._difficulty === undefined ? difficultyOf(lv) : lv._difficulty) * 100) / 100;
        delete lv._difficulty;
        out.push(lv);
      });
      /* 下一章在「本章基础段末关」完成后解锁（挑战段不挡下一章）。 */
      if (baseEnd > 0 && baseEnd <= ordered.length) prevBaseLast = ordered[baseEnd - 1].id;
    });

    return out;
  }

  function normalize(level, i) {
    var copy = Object.assign({}, level);
    copy.chapter = level.chapter || 'prop';
    copy.band = level.band || 'base';
    copy.targetPos = level.targetPos || { x: 650, y: 300 };
    copy.allowed = (level.allowed || []).slice();
    copy.solution = level.solution || { nodes: [], edges: [] };
    copy._ord = i;
    copy.chapterGroup = chapterOf(copy);
    return copy;
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
    HAND_SIZE: HAND_SIZE,
    CHAPTER_SIZE: CHAPTER_SIZE,
    BAND_SPLIT: BAND_SPLIT,
    chapterOf: chapterOf,
    difficultyOf: difficultyOf,
    build: build,
    isUnlocked: isUnlocked,
    levelById: levelById,
    partsForLevel: partsForLevel
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
