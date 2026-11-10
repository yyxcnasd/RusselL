/*!
 * 公理板 / AXIOM BOARD — RSL.Catalog
 *
 * 单章关卡目录：把 RSL.LEVELS（96 关）派生成顺序、解锁链与元件栏。
 * 没有章节分组、没有难度重排：顺序就是 campaign/ 里排好的顺序。
 */
(function (host) {
  'use strict';
  host.RSL = host.RSL || {};

  var levels = host.RSL.LEVELS || [];

  function build() {
    return levels.map(function (lv, i) {
      var copy = JSON.parse(JSON.stringify(lv));
      copy.tutorial = !!lv.tutorial;
      copy.index = i;
      copy.order = i + 1;
      copy.band = lv.band || (copy.tutorial ? 'tutorial' : (lv.hard ? 'challenge' : 'base'));
      copy.requires = i ? [levels[i - 1].code] : [];
      copy.difficulty = lv.difficulty || 0;
      return copy;
    });
  }

  function chapterOf() { return ''; }

  function symbolOf(entry) {
    var kind = entry.kind;
    var cfg = entry.config || {};
    if (kind === 'atom') return cfg.name || 'P';
    if (kind === 'term') return cfg.name || 'x';
    if (kind === 'pred') return cfg.symbol || 'F';
    if (kind === 'all') return '∀' + (cfg.v || 'x');
    if (kind === 'gen') return '∀I' + (cfg.v || '');
    if (kind === 'shift') return '∀*' + (cfg.v || '');
    if (kind === 'axiom') return (cfg.schema || 'Ax') + (cfg.v ? '·' + cfg.v : '');
    if (kind === 'theorem') return '*' + String(cfg.code || '');
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
    if (kind === 'theorem') return '已证定理 *' + String(cfg.code || '');
    var info = host.RSL.Engine.info ? host.RSL.Engine.info(kind) : null;
    return info && info.label ? info.label : kind;
  }

  /* 元件栏顺序：构造 → 定义重写 → 公理 → 基本推理 → 定理。
     只影响显示排序；未列出的 kind 落到 0，请随模块表一起维护。 */
  var RANK = {
    atom: 0, not: 3, imp: 4, and: 5, or: 6, iff: 7,
    'def-expand': 11, 'def-contract': 12,
    axiom: 20, subst: 21, mp: 22,
    theorem: 50
  };

  /* 构造类元件在托盘里合并成一个 tile，具体取值（P/Q、x/y、F/=、∀x/∀y、∃x/∃y）
     放到节点的配置弹层里选；规则/公理/定理仍按实际条目显示。 */
  var MERGE = { atom: 1, subst: 1 };
  var FAMILY_SYMBOL = { atom: 'P', subst: 'S' };
  var FAMILY_LABEL = { atom: '原子命题', subst: '代入' };

  function partsForLevel(level) {
    var out = [];
    var merged = {};
    (level.palette || []).forEach(function (entry) {
      var kind = entry.kind;
      var cfg = Object.assign({}, entry.config || {});
      if (MERGE[kind]) {
        var part = merged[kind];
        if (!part) {
          part = merged[kind] = {
            key: kind + ':*',
            kind: kind,
            symbol: FAMILY_SYMBOL[kind] || symbolOf(entry),
            name: FAMILY_LABEL[kind] || nameOf(entry),
            config: cfg,
            variants: []
          };
          out.push(part);
        }
        var sig = JSON.stringify(cfg);
        if (!part.variants.some(function (v) { return v.sig === sig; })) {
          part.variants.push({ sig: sig, config: cfg, symbol: symbolOf(entry), name: nameOf(entry) });
          part.name = part.name.split('：')[0] + '：' + part.variants.map(function (v) { return v.symbol; }).join(' / ');
        }
        return;
      }
      out.push({
        key: kind + ':' + JSON.stringify(cfg),
        kind: kind,
        symbol: symbolOf(entry),
        name: nameOf(entry),
        config: cfg
      });
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
    CHAPTERS: [],
    build: build,
    chapterOf: chapterOf,
    partsForLevel: partsForLevel,
    levelById: levelById,
    levelByCode: levelByCode
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
