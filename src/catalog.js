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
 *   13–72 这 60 个按统一难度 D 升序交错排列，位置 1–36 为基础段、37–72 为挑战段。
 *
 * 统一 schema（P3）：
 *   每关都有 `track`（wiring|replay）、`targetTokens`、`palette`；重放关另有
 *   `initialNodes` 与 `reference`。旧字段 target/allowed/solution 保留到 P5。
 *
 * 难度标尺（见 docs/LEVEL-DESIGN-PROPOSAL.md）：
 *   接线 D = 参考电路模块数 + 0.1 × 目标公式结构节点数
 *   重放 D = 1.4 + 2.2417 × log2(1 + 证明步骤数)      （0 步 = 1.4，304 步 ≈ 19.9）
 *   结构节点数由唯一 token 核心 RSL.Term 计算；与旧 Logic AST 节点数逐关相等
 *   （240 关已核对 0 差异），因此 288 关顺序不变。
 */
(function (host) {
  'use strict';
  host.RSL = host.RSL || {};
  var T = host.RSL.Term;

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

  /* ------------------------------------------------------------------------
   * 难度：统一用 token 结构节点数（RSL.Term.read 的派生树）。
   * ---------------------------------------------------------------------- */

  function treeNodes(tree) {
    if (!tree || typeof tree !== 'object' || !tree.k) return 0;
    var n = 1;
    if (Array.isArray(tree.args)) tree.args.forEach(function (x) { n += treeNodes(x); });
    if (tree.a) n += treeNodes(tree.a);
    if (tree.b) n += treeNodes(tree.b);
    return n;
  }

  /** 目标公式的结构节点数（缓存到派生副本的 _tokenNodes 上，build 结束前删除）。 */
  function tokenNodeCount(level) {
    if (level._tokenNodes !== undefined) return level._tokenNodes;
    var n = null;
    if (T && Array.isArray(level.targetTokens) && level.targetTokens.length) {
      try { n = treeNodes(T.read(level.targetTokens)); } catch (e) { n = null; }
    } else if (T && typeof level.target === 'string') {
      try { n = treeNodes(T.read(T.parseAssertion(level.target))); } catch (e) { n = null; }
    }
    if (n === null) n = 0;
    level._tokenNodes = n;
    return n;
  }

  /** 统一难度：接线 模块数 + 0.1·结构节点数；重放 1.4 + 2.2417·log2(1+steps)。 */
  function difficultyOf(level) {
    if (level.track === 'replay') {
      var steps = level.stats && typeof level.stats.steps === 'number' ? level.stats.steps : 0;
      return REPLAY_D_BASE + REPLAY_D_K * Math.log(1 + steps) / Math.LN2;
    }
    var nodes = level.solution && level.solution.nodes ? level.solution.nodes.length : 0;
    return nodes + 0.1 * tokenNodeCount(level);
  }

  /* ------------------------------------------------------------------------
   * build
   * ---------------------------------------------------------------------- */

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
      var hasReplay = group.some(function (lv) { return lv.track === 'replay'; });
      var ordered;
      var baseEnd;
      if (hasReplay) {
        /* 新进程：12 手工固定，其余 60 个（接线 + 重放）按统一难度 D 升序交错；
           位置 1–36 基础段、37–72 挑战段。 */
        var hand = group.filter(function (lv) {
          return lv.track !== 'replay' && levelNo(lv) <= HAND_SIZE;
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
        delete lv._tokenNodes;
        out.push(lv);
      });
      /* 下一章在「本章基础段末关」完成后解锁（挑战段不挡下一章）。 */
      if (baseEnd > 0 && baseEnd <= ordered.length) prevBaseLast = ordered[baseEnd - 1].id;
    });

    return out;
  }

  function clonePalette(palette) {
    if (!Array.isArray(palette)) return null;
    return palette.map(function (entry) {
      var copy = {
        kind: entry.kind,
        config: Object.assign({}, entry.config || {})
      };
      if (entry.given === true) copy.given = true;
      return copy;
    });
  }

  function cloneInitialNodes(nodes) {
    if (!Array.isArray(nodes)) return null;
    return nodes.map(function (node) {
      var copy = {
        id: node.id,
        kind: node.kind,
        x: node.x,
        y: node.y,
        config: Object.assign({}, node.config || {})
      };
      if (Array.isArray(node.targetTokens)) copy.targetTokens = node.targetTokens.slice();
      return copy;
    });
  }

  function cloneReference(reference) {
    if (!Array.isArray(reference)) return null;
    return reference.map(function (action) {
      return {
        stepId: action.stepId,
        kind: action.kind,
        label: action.label,
        inputs: Array.isArray(action.inputs) ? action.inputs.slice() : []
      };
    });
  }

  function normalize(level, i) {
    var copy = Object.assign({}, level);
    copy.chapter = level.chapter || 'prop';
    copy.band = level.band || 'base';
    /* 兼容旧数据/stub：没有 track 时按旧 mode 归一化（P5 删除 mode 后这段一起删）。 */
    copy.track = level.track || 'wiring';
    copy.targetPos = level.targetPos || { x: 650, y: 300 };
    copy.allowed = (level.allowed || []).slice();
    copy.solution = level.solution || { nodes: [], edges: [] };
    copy.targetTokens = Array.isArray(level.targetTokens) ? level.targetTokens.slice() : null;
    /* 手工关（src/levels.js）还没有生成 targetTokens：在这里用唯一 token 核心补齐。 */
    if (!copy.targetTokens && T && typeof copy.target === 'string') {
      try { copy.targetTokens = T.parseAssertion(copy.target); } catch (e) { copy.targetTokens = null; }
    }
    copy.palette = clonePalette(level.palette) || paletteFromAllowed(copy.allowed);
    copy.initialNodes = cloneInitialNodes(level.initialNodes);
    copy.reference = cloneReference(level.reference);
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
     关卡 palette/allowed 里的顺序只作组内顺序。 */
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

  /* ---------- 调色板 ---------- */

  /** palette 条目 → 对应的旧 allowed key（用于复用已有解析逻辑）。 */
  function keyOfPaletteEntry(entry) {
    var cfg = entry.config || {};
    if (entry.kind === 'axiom') return 'axiom:' + (cfg.axiomId || '');
    if (entry.kind === 'theorem') return 'theorem:' + (cfg.theoremCode || '');
    if (entry.kind === 'archive') return 'archive:' + (cfg.label || '');
    return entry.kind;
  }

  /** 旧 allowed key → palette 条目（没有 palette 的历史关卡用）。 */
  /** 旧 allowed 数组 → 统一 palette（手工关在运行时补齐用）。 */
  function paletteFromAllowed(allowed) {
    return (allowed || []).map(paletteEntryOfKey).filter(Boolean);
  }

  function paletteEntryOfKey(key) {
    if (!key || key === 'target') return null;
    if (key.indexOf('axiom:') === 0) return { kind: 'axiom', config: { axiomId: key.slice(6) } };
    if (key.indexOf('theorem:') === 0) return { kind: 'theorem', config: { theoremCode: key.slice(8) } };
    if (key.indexOf('archive:') === 0) return { kind: 'archive', config: { label: key.slice(8) } };
    return { kind: key, config: {} };
  }

  /** 关卡调色板条目：优先读统一 schema 的 palette，缺省回退旧 allowed。 */
  function paletteEntriesOf(level) {
    if (Array.isArray(level.palette) && level.palette.length) return level.palette;
    return paletteFromAllowed(level.allowed);
  }

  function partFromKey(key, configOverride) {
    var cfg = Object.assign({}, configOverride || {});
    var pool = host.RSL.PARTS || [];
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
    if (!part) return null;
    return Object.assign({}, part, {
      config: Object.assign({}, part.config || {}, cfg)
    });
  }

  /** 重放关的两种模块（mmhyp / mmstep）没有旧 key，直接生成面板条目。 */
  function partFromReplayEntry(entry) {
    var cfg = Object.assign({}, entry.config || {});
    if (entry.kind === 'mmstep') {
      var label = String(cfg.label || '');
      return {
        key: 'mmstep:' + label,
        kind: 'mmstep',
        symbol: label.slice(0, 10),
        name: 'set.mm ' + label + ' · 需要 ' + (cfg.arity || 0) + ' 个前提',
        config: cfg
      };
    }
    if (entry.kind === 'mmhyp') {
      var hyp = String(cfg.label || '');
      return {
        key: 'mmhyp:' + hyp,
        kind: 'mmhyp',
        symbol: hyp.slice(0, 10),
        name: '前提 ' + hyp,
        config: cfg
      };
    }
    return null;
  }

  /** 关卡调色板：把统一 schema 的 palette（或旧 allowed）解析成可放置的模块条目。 */
  function partsForLevel(level) {
    var out = [];
    paletteEntriesOf(level).forEach(function (entry) {
      /* given:true 的条目（重放关的前提）已经由 initialNodes 预置，不作为可放置元件。 */
      if (entry.given === true) return;
      var part = partFromReplayEntry(entry) || partFromKey(keyOfPaletteEntry(entry), entry.config);
      if (part) out.push(part);
    });
    /* Array.prototype.sort 在 ES2019+ 稳定：同组内保持 palette/allowed 原顺序。 */
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
    tokenNodeCount: tokenNodeCount,
    build: build,
    isUnlocked: isUnlocked,
    levelById: levelById,
    partsForLevel: partsForLevel
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
