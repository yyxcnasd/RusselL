/*!
 * 公理板 / AXIOM BOARD — RSL.Catalog
 *
 * 单章关卡目录：把 RSL.LEVELS（108 关）派生成顺序、解锁链与元件栏。
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

  /* 元件栏顺序：构造 → 公理 → 基本推理 S/M → 定义重写 D/D⁻ → 定理。
     定义重写排在 S/M 之后，和帮助页的 S、M、D、D⁻ 顺序一致。 */
  var RANK = {
    atom: 0, connective: 3,
    axiom: 20, subst: 21, mp: 22,
    'def-expand': 23, 'def-contract': 24,
    theorem: 50
  };

  var CONNECTIVE = { not: 1, imp: 1, and: 1, or: 1, iff: 1 };
  var CONNECTIVE_OP = { not: 'not', imp: 'imp', and: 'and', or: 'or', iff: 'iff' };
  var CONNECTIVE_SYMBOL = { not: '¬', imp: '→', and: '∧', or: '∨', iff: '↔' };
  var CONNECTIVE_NAME = { not: '否定', imp: '蕴涵', and: '合取', or: '析取', iff: '等值' };

  /* 构造类元件在托盘里合并成一个 tile，具体取值（P/Q、x/y、F/=、∀x/∀y、∃x/∃y）
     放到节点的配置弹层里选；规则/公理/定理仍按实际条目显示。 */
  var MERGE = { atom: 1, subst: 1 };
  var FAMILY_SYMBOL = { atom: 'P', subst: 'S' };
  var FAMILY_LABEL = { atom: '原子命题', subst: '代入' };

  function connectivePart(ops) {
    var seen = {};
    var list = [];
    ops.forEach(function (op) {
      if (!CONNECTIVE[op] || seen[op]) return;
      seen[op] = true;
      list.push(op);
    });
    if (!list.length) list = ['not'];
    var variants = list.map(function (op) {
      return {
        op: op,
        sig: JSON.stringify({ op: op }),
        config: { op: op },
        symbol: CONNECTIVE_SYMBOL[op],
        name: CONNECTIVE_NAME[op]
      };
    });
    return {
      key: 'connective:*',
      kind: 'connective',
      symbol: variants[0].symbol,
      name: '连接词：' + variants.map(function (v) { return v.symbol; }).join(' / '),
      config: { op: list[0] },
      ops: list,
      variants: variants
    };
  }

  function atomPart(names) {
    var list = [];
    (names || ['P']).forEach(function (name) {
      if (list.indexOf(name) < 0) list.push(name);
    });
    var variants = list.map(function (name) {
      return { sig: JSON.stringify({ name: name }), config: { name: name }, symbol: name, name: '原子命题 ' + name };
    });
    return {
      key: 'atom:*',
      kind: 'atom',
      symbol: variants[0].symbol,
      name: '原子命题：' + list.join(' / '),
      config: { name: list[0] },
      variants: variants
    };
  }

  function theoremPart() {
    return {
      key: 'theorem:*',
      kind: 'theorem',
      symbol: '⊢',
      name: '已证引理',
      config: { code: '' },
      picker: 'lemma',
      variants: []
    };
  }

  function fullPalette() {
    var out = [atomPart('PQRSTUV'.split('')), connectivePart(['not', 'imp', 'and', 'or', 'iff'])];
    ['A1', 'A2', 'A3'].forEach(function (schema) {
      out.push({
        key: 'axiom:' + JSON.stringify({ schema: schema }),
        kind: 'axiom',
        symbol: schema,
        name: '公理 ' + schema,
        config: { schema: schema }
      });
    });
    out.push({ key: 'subst:{}', kind: 'subst', symbol: 'S', name: '代入', config: {} });
    out.push({ key: 'mp:{}', kind: 'mp', symbol: 'M', name: '分离', config: {} });
    out.push({ key: 'def-expand:{}', kind: 'def-expand', symbol: 'D', name: '定义展开', config: {} });
    out.push({ key: 'def-contract:{}', kind: 'def-contract', symbol: 'D⁻', name: '定义收缩', config: {} });
    out.push(theoremPart());
    return out;
  }

  function partsForLevel(level) {
    /* 困难关 / 魔王关：连接词、A1–A3、S/M/D/D⁻ 全开，并给一个引理选择器。 */
    if (level && (level.band === 'challenge' || level.band === 'demon' || level.hard)) {
      return fullPalette();
    }

    var out = [];
    var merged = {};
    var connOps = [];
    function ensure(family, entry) {
      if (!merged[family]) {
        merged[family] = {
          key: family + ':*',
          kind: family,
          symbol: FAMILY_SYMBOL[family] || symbolOf(entry),
          name: FAMILY_LABEL[family] || nameOf(entry),
          config: Object.assign({}, entry.config || {}),
          variants: []
        };
        out.push(merged[family]);
      }
      return merged[family];
    }
    function addVariant(part, entry) {
      var cfg = Object.assign({}, entry.config || {});
      var sig = JSON.stringify(cfg);
      if (!part.variants.some(function (v) { return v.sig === sig; })) {
        part.variants.push({ sig: sig, config: cfg, symbol: symbolOf(entry), name: nameOf(entry) });
        part.name = part.name.split('：')[0] + '：' + part.variants.map(function (v) { return v.symbol; }).join(' / ');
      }
    }

    (level.palette || []).forEach(function (entry) {
      var kind = entry.kind;
      if (CONNECTIVE[kind]) {
        connOps.push(CONNECTIVE_OP[kind]);
        return;
      }
      if (kind === 'atom') {
        addVariant(ensure('atom', entry), entry);
        return;
      }
      if (MERGE[kind]) {
        addVariant(ensure(kind, entry), entry);
        return;
      }
      out.push({
        key: kind + ':' + JSON.stringify(entry.config || {}),
        kind: kind,
        symbol: symbolOf(entry),
        name: nameOf(entry),
        config: Object.assign({}, entry.config || {})
      });
    });

    if (connOps.length) out.push(connectivePart(connOps));
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
    build: build,
    partsForLevel: partsForLevel,
    levelById: levelById,
    levelByCode: levelByCode
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
