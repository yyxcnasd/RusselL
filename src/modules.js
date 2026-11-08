/*!
 * 公理板 / AXIOM BOARD — RSL.Modules
 *
 * 唯一的模块注册表。普通关的 21 个模块与重放关的 mmhyp/mmstep 共用同一接口：
 *
 *   {
 *     kind, label, kindLabel, group, symbol, help,
 *     ports: { inputs:[{id,label,type}], outputs:[{id,label,type}] },
 *     config,                       // 默认配置
 *     construct: bool,              // 构造型模块（不算“来源”）
 *     apply(inputs, config, ctx) -> token[]   // 失败抛 Error（中文可定位消息）
 *   }
 *
 * apply 的 inputs 是 { 端口 id: tokens }，ctx = { level, results, proof }。
 * 公式一律是 RSL.Term 的 token 数组（首 token 类型码）。
 */
(function (host) {
  'use strict';

  host.RSL = host.RSL || {};
  var T = host.RSL.Term;
  if (!T && typeof require === 'function') {
    try { T = require('./term.js'); } catch (e) { T = null; }
  }
  if (!T) throw new Error('RSL.Modules 需要先加载 RSL.Term（src/term.js）');

  function fail(msg) { throw new Error(msg); }
  function inputToken(inputs, id, what) {
    var v = inputs[id];
    if (!v || !Array.isArray(v) || !v.length) fail('等待' + (what || '输入'));
    return v;
  }
  function asBody(tokens) { return T.body(tokens); }
  function assertionOf(bodyTokens) { return ['|-'].concat(bodyTokens); }
  function wffOf(bodyTokens) { return ['wff'].concat(bodyTokens); }

  /* ---- 断言来源解析（公理 / 已证结论 / 档案） ---- */

  var cache = { axiom: {}, theorem: {}, archive: {} };

  function getAxiom(id) {
    var all = host.RSL.AXIOMS || [];
    for (var i = 0; i < all.length; i += 1) if (all[i].id === id) return all[i];
    return null;
  }
  function getLevelTheorem(id) {
    var levels = host.RSL.LEVELS || [];
    for (var i = 0; i < levels.length; i += 1) {
      var lv = levels[i];
      if (lv.id !== id) continue;
      return {
        id: lv.id,
        code: lv.code || lv.id,
        name: (lv.code || lv.id) + (lv.title ? ' · ' + lv.title : ''),
        formula: lv.target
      };
    }
    return null;
  }
  function getArchive(label) {
    var map = host.RSL.ARCHIVE || {};
    var t = map[label];
    if (!t) return null;
    return { label: label, name: t.name || label, formula: t.formula, code: t.code || label, source: t.source || 'set.mm' };
  }

  function axiomTokens(id) {
    if (!cache.axiom[id]) {
      var ax = getAxiom(id);
      if (!ax) fail('找不到公理 ' + id);
      cache.axiom[id] = { ax: ax, tokens: assertionOf(asBody(T.parse(ax.schema))) };
    }
    return cache.axiom[id];
  }
  function theoremTokens(id) {
    if (!cache.theorem[id]) {
      var th = getLevelTheorem(id);
      if (!th) fail('找不到本作已证结论 ' + id);
      cache.theorem[id] = { th: th, tokens: assertionOf(asBody(T.parse(th.formula))) };
    }
    return cache.theorem[id];
  }
  function archiveTokens(label) {
    if (!cache.archive[label]) {
      var ar = getArchive(label);
      if (!ar) fail('找不到 set.mm 档案条目 ' + label);
      cache.archive[label] = { ar: ar, tokens: assertionOf(asBody(T.parse(ar.formula))) };
    }
    return cache.archive[label];
  }
  /** 新增/重写关卡后清缓存（生成器/测试用）。 */
  function resetCache() { cache = { axiom: {}, theorem: {}, archive: {} }; }

  /* ---- 端口帮助函数 ---- */

  function inPorts(list) { return list; }
  var FORMULA = 'formula';
  var ASSERTION = 'assertion';
  var ATOM = 'atom';

  var SUBST_INPUTS = [{ id: 'assertion', label: '断言 A', type: ASSERTION }];
  for (var g = 1; g <= 5; g += 1) {
    var suffix = g === 1 ? '' : String(g);
    SUBST_INPUTS.push({ id: 'atom' + suffix, label: '原子 π' + (g > 1 ? g : '₁'), type: FORMULA });
    SUBST_INPUTS.push({ id: 'formula' + suffix, label: '公式 B' + (g > 1 ? g : '₁'), type: FORMULA });
  }

  var MODULES = {
    target: {
      label: '目标焊盘', kindLabel: 'TARGET', group: 'target', symbol: '◎', construct: true,
      ports: { inputs: [{ id: 'proof', label: '最终断言', type: ASSERTION }], outputs: [] },
      config: {},
      help: '把你要证的断言接到这里。',
      apply: function () { fail('target 由求值器直接处理'); }
    },
    atom: {
      label: '原子命题', kindLabel: 'ATOM', group: 'build', symbol: 'P', construct: true,
      ports: { inputs: [], outputs: [{ id: 'out', label: '公式', type: FORMULA }] },
      config: { name: 'P' },
      help: '提供 PQRSTUVWXYZABC 中的一枚原子命题。',
      apply: function (inputs, cfg) {
        var name = (cfg.name || 'P').toUpperCase().slice(0, 1);
        if (!/^[A-Z]$/.test(name)) name = 'P';
        return { tokens: wffOf([name]), note: '原子命题' };
      }
    },
    term: {
      label: '个体词', kindLabel: 'TERM', group: 'predicate', symbol: 'x', construct: true,
      ports: { inputs: [], outputs: [{ id: 'out', label: 'x', type: FORMULA }] },
      config: { name: 'x' },
      help: '提供个体变元 x、y、z 或常元 a。',
      apply: function (inputs, cfg) {
        var name = (cfg.name || 'x').trim() || 'x';
        return { tokens: wffOf([name]), note: '个体词' };
      }
    },
    pred: {
      label: '谓词原子', kindLabel: 'PRED', group: 'predicate', symbol: 'F', construct: true,
      ports: { inputs: [], outputs: [{ id: 'out', label: 'F(x)', type: FORMULA }] },
      config: { name: 'F', arg: 'x' },
      help: '合成一元谓词原子 F(x)。',
      apply: function (inputs, cfg) {
        var name = (cfg.name || 'F').trim() || 'F';
        var arg = (cfg.arg || 'x').trim() || 'x';
        return { tokens: wffOf([name, '(', arg, ')']), note: '谓词原子' };
      }
    },
    not: {
      label: '否定门', kindLabel: 'NOT', group: 'build', symbol: '¬', construct: true,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }], outputs: [{ id: 'out', label: '¬A', type: FORMULA }] },
      config: {},
      help: '输入 A，输出 ¬A。括号由系统自动补全。',
      apply: function (inputs) {
        var a = inputToken(inputs, 'a', '公式 A');
        return { tokens: wffOf(['-.'].concat(asBody(a))), note: '否定' };
      }
    },
    or: {
      label: '析取门', kindLabel: 'OR', group: 'build', symbol: '∨', construct: true,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }, { id: 'b', label: '公式 B', type: FORMULA }], outputs: [{ id: 'out', label: 'A∨B', type: FORMULA }] },
      config: {},
      help: '输入两路公式，输出 (A∨B)。',
      apply: binaryCtor('\\/', '析取')
    },
    imp: {
      label: '蕴涵符号', kindLabel: 'IMP', group: 'build', symbol: '→', construct: true,
      ports: { inputs: [{ id: 'a', label: '前件 A', type: FORMULA }, { id: 'b', label: '后件 B', type: FORMULA }], outputs: [{ id: 'out', label: 'A→B', type: FORMULA }] },
      config: {},
      help: '合成 A→B；校验时按 set.mm 定义展开比较。',
      apply: binaryCtor('->', '蕴涵')
    },
    and: {
      label: '合取符号', kindLabel: 'AND', group: 'build', symbol: '∧', construct: true,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }, { id: 'b', label: '公式 B', type: FORMULA }], outputs: [{ id: 'out', label: 'A∧B', type: FORMULA }] },
      config: {},
      help: '按 df-an 合成 A∧B 的记法。',
      apply: binaryCtor('/\\', '合取')
    },
    iff: {
      label: '等值符号', kindLabel: 'IFF', group: 'build', symbol: '↔', construct: true,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }, { id: 'b', label: '公式 B', type: FORMULA }], outputs: [{ id: 'out', label: 'A↔B', type: FORMULA }] },
      config: {},
      help: '按 dfbi2 合成 A↔B 的记法。',
      apply: binaryCtor('<->', '等值')
    },
    axiom: {
      label: '公理/定义', kindLabel: 'AXIOM', group: 'axiom', symbol: 'A', construct: false,
      ports: { inputs: [], outputs: [{ id: 'out', label: '断言', type: ASSERTION }] },
      config: { axiomId: 'ax-1' },
      help: 'Metamath set.mm 的原始公理或定义图式。',
      apply: function (inputs, cfg) {
        var got = axiomTokens(cfg.axiomId || 'A1');
        return { tokens: got.tokens, note: got.ax.name + ' · ' + got.ax.code, meta: { axiom: got.ax } };
      }
    },
    theorem: {
      label: '已证结论', kindLabel: 'PROVEN', group: 'theorem', symbol: 'T', construct: false,
      ports: { inputs: [], outputs: [{ id: 'out', label: '断言', type: ASSERTION }] },
      config: { theoremCode: 'CH1-07' },
      help: '本游戏前面关卡已经证成的结论，作为封装好的电路接入。',
      apply: function (inputs, cfg) {
        var got = theoremTokens(cfg.theoremCode || '');
        return { tokens: got.tokens, note: got.th.name, meta: { theorem: got.th } };
      }
    },
    archive: {
      label: 'set.mm 定理', kindLabel: 'ARCHIVE', group: 'archive', symbol: 'M', construct: false,
      ports: { inputs: [], outputs: [{ id: 'out', label: '断言', type: ASSERTION }] },
      config: { label: 'id' },
      help: 'Metamath set.mm 里已经证成的定理/公理（档案条目，本作不重证）。',
      apply: function (inputs, cfg) {
        var label = cfg.label || cfg.code || '';
        var got = archiveTokens(label);
        return { tokens: got.tokens, note: 'set.mm · ' + label, meta: { archive: got.ar } };
      }
    },
    subst: {
      label: '代入规则', kindLabel: 'SUBST', group: 'rule', symbol: 'S', construct: false,
      ports: { inputs: SUBST_INPUTS, outputs: [{ id: 'out', label: 'A[π/B]', type: ASSERTION }] },
      config: {},
      help: '把断言 A 中出现的原子 π 全部替换为合式公式 B；最多同时 5 组代换。',
      apply: function (inputs) {
        var assertion = inputToken(inputs, 'assertion', '断言 A');
        if (T.typeOf(assertion) !== '|-') fail('输入必须是以 ⊢ 开头的断言');
        var bodyTokens = asBody(assertion);
        var map = Object.create(null);
        var groups = 0;
        for (var g = 1; g <= 5; g += 1) {
          var suffix = g === 1 ? '' : String(g);
          var atomVal = inputs['atom' + suffix];
          var formulaVal = inputs['formula' + suffix];
          if (!atomVal && !formulaVal) continue;
          if (!atomVal || !formulaVal) fail('第 ' + g + ' 组代入需要同时接原子和公式');
          if (!T.isAtom(atomVal)) fail('第 ' + g + ' 组原子必须是单个原子命题');
          var atomName = asBody(atomVal)[0];
          if (Object.prototype.hasOwnProperty.call(map, atomName)) fail('多组代入不能使用同一个原子');
          if (bodyTokens.indexOf(atomName) < 0) fail('原子 ' + atomName + ' 没有出现在断言中');
          map[atomName] = asBody(formulaVal);
          groups += 1;
        }
        var out = T.substAtoms(assertion, map);
        var labelText = Object.keys(map).map(function (k) { return k + ' := ' + T.fmt(wffOf(map[k])); }).join('，');
        return { tokens: out, note: labelText, meta: { mapping: map, groups: groups } };
      }
    },
    replace: {
      label: '定义置换', kindLabel: 'DEFINE', group: 'rule', symbol: 'D', construct: false,
      ports: { inputs: [{ id: 'assertion', label: '断言 A', type: ASSERTION }], outputs: [{ id: 'out', label: '断言 B', type: ASSERTION }] },
      config: {},
      help: '按 df-or / df-an / dfbi2 / df-ex 对断言中的一个定义式做双向置换。',
      apply: function (inputs, cfg) {
        var assertion = inputToken(inputs, 'assertion', '断言 A');
        var opts = T.replaceOptions(assertion);
        if (!opts.length) fail('这条断言里没有可置换的定义式');
        var chosen = null;
        if (cfg.optionId) {
          for (var i = 0; i < opts.length; i += 1) if (opts[i].id === cfg.optionId) { chosen = opts[i]; break; }
        }
        if (!chosen && cfg.preferDef) {
          for (var j = 0; j < opts.length; j += 1) {
            if (opts[j].def === cfg.preferDef && (!cfg.preferDir || opts[j].dir === cfg.preferDir)) {
              if (!cfg.preferPath || JSON.stringify(opts[j].path) === JSON.stringify(cfg.preferPath)) { chosen = opts[j]; break; }
            }
          }
        }
        if (!chosen) chosen = opts[0];
        return {
          tokens: assertionOf(asBody(chosen.tokens)),
          note: chosen.label,
          meta: {
            options: opts.map(function (o) {
              return { id: o.id, def: o.def, dir: o.dir, path: o.path, label: o.label, tokens: o.tokens };
            }),
            optionId: chosen.id,
            chosen: { id: chosen.id, label: chosen.label, tokens: chosen.tokens }
          }
        };
      }
    },
    detach: {
      label: '分离规则', kindLabel: 'DETACH', group: 'rule', symbol: 'M', construct: false,
      ports: {
        inputs: [{ id: 'a', label: '断言 A', type: ASSERTION }, { id: 'b', label: '断言 B', type: ASSERTION }],
        outputs: [{ id: 'out', label: '结论', type: ASSERTION }]
      },
      config: {},
      help: '输入 A 与 A→B（顺序任意），输出 B。',
      apply: function (inputs) {
        var a = inputToken(inputs, 'a', '断言 A');
        var b = inputToken(inputs, 'b', '断言 B');
        var r = T.detach(a, b);
        if (!r.ok) fail(r.reason || '两路断言不能分离');
        return { tokens: r.out, note: r.form || '分离' };
      }
    },
    quant: {
      label: '量词门', kindLabel: 'QUANT', group: 'predicate', symbol: '∀', construct: true,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }], outputs: [{ id: 'out', label: '∀x A', type: FORMULA }] },
      config: { kind: 'all', v: 'x' },
      help: '给公式加上 ∀x 或 ∃x。',
      apply: function (inputs, cfg) {
        var a = inputToken(inputs, 'a', '公式 A');
        var kind = cfg.kind === 'exists' ? 'exists' : 'all';
        var v = cfg.v || 'x';
        return { tokens: T.quantify(kind, v, a), note: kind === 'all' ? '全称量化' : '存在量化' };
      }
    },
    'all-intro': {
      label: '全称推广', kindLabel: '∀I', group: 'predicate', symbol: '∀I', construct: false,
      ports: { inputs: [{ id: 'assertion', label: '断言 A', type: ASSERTION }], outputs: [{ id: 'out', label: '∀x A', type: ASSERTION }] },
      config: { v: 'x' },
      help: '从断言 A 得到 ∀x A。',
      apply: function (inputs, cfg) {
        var a = inputToken(inputs, 'assertion', '断言 A');
        var v = cfg.v || 'x';
        if (!/^[xyz]$/.test(v)) fail('全称推广的变元必须是 x/y/z，不能是常元');
        return { tokens: assertionOf(['A.', v].concat(asBody(a))), note: '∀I · ' + v };
      }
    },
    'all-elim': {
      label: '全称例化', kindLabel: '∀E', group: 'predicate', symbol: '∀E', construct: false,
      ports: { inputs: [{ id: 'assertion', label: '断言 ∀x A', type: ASSERTION }], outputs: [{ id: 'out', label: 'A[t/x]', type: ASSERTION }] },
      config: { term: 'a' },
      help: '从 ∀x A 得到 A[t/x]。',
      apply: function (inputs, cfg) {
        var a = inputToken(inputs, 'assertion', '断言 ∀x A');
        var tree = T.read(a);
        if (tree.k !== 'all') fail('输入必须是全称量化式 ∀x A');
        var term = cfg.term || 'a';
        return { tokens: assertionOf(asBody(T.substituteVar(T.wff(T.treeToBody(tree.a)), tree.v, term))), note: '∀E · ' + term };
      }
    },
    'exists-intro': {
      label: '存在引入', kindLabel: '∃I', group: 'predicate', symbol: '∃I', construct: false,
      ports: { inputs: [{ id: 'assertion', label: '断言 A', type: ASSERTION }], outputs: [{ id: 'out', label: '∃x A', type: ASSERTION }] },
      config: { v: 'x' },
      help: '从 A 得到 ∃x A。',
      apply: function (inputs, cfg) {
        var a = inputToken(inputs, 'assertion', '断言 A');
        var v = cfg.v || 'x';
        if (!/^[xyz]$/.test(v)) fail('存在引入的变元必须是 x/y/z，不能是常元');
        return { tokens: assertionOf(['E.', v].concat(asBody(a))), note: '∃I · ' + v };
      }
    },
    'exists-elim': {
      label: '存在消去', kindLabel: '∃E', group: 'predicate', symbol: '∃E', construct: false,
      ports: {
        inputs: [{ id: 'exists', label: '断言 ∃x A', type: ASSERTION }, { id: 'implication', label: '断言 A[y/x]→B', type: ASSERTION }],
        outputs: [{ id: 'out', label: 'B', type: ASSERTION }]
      },
      config: { y: 'y' },
      help: '从 ∃x A 与 A[y/x]→B 得到 B，y 须为新变元。',
      apply: function (inputs, cfg) {
        var ex = inputToken(inputs, 'exists', '断言 ∃x A');
        var imp = inputToken(inputs, 'implication', '断言 A[y/x]→B');
        var exTree = T.read(ex), impTree = T.read(imp);
        if (exTree.k !== 'exists') fail('第一路输入必须是存在量化式 ∃x A');
        if (impTree.k !== 'imp') fail('第二路输入必须是蕴涵式 A[y/x]→B');
        var y = cfg.y || 'y';
        var instantiated = T.substituteVar(T.wff(T.treeToBody(exTree.a)), exTree.v, y);
        if (!T.eq(instantiated, T.wff(T.treeToBody(impTree.a)))) fail('第二路前件与 ∃ 的例化式不一致');
        if (T.freeVars(T.wff(T.treeToBody(exTree.a))).indexOf(y) !== -1) fail('新变元 ' + y + ' 不能在 ∃x A 中自由出现');
        if (T.freeVars(T.wff(T.treeToBody(impTree.b))).indexOf(y) !== -1) fail('新变元 ' + y + ' 在结论 B 中自由出现');
        return { tokens: assertionOf(asBody(T.wff(T.treeToBody(impTree.b)))), note: '∃E · ' + y };
      }
    },
    syllogism: {
      label: '假言三段论', kindLabel: 'HS', group: 'rule', symbol: 'HS', construct: false,
      ports: {
        inputs: [{ id: 'a', label: '断言 A→B', type: ASSERTION }, { id: 'b', label: '断言 B→C', type: ASSERTION }],
        outputs: [{ id: 'out', label: 'A→C', type: ASSERTION }]
      },
      config: {},
      help: '从 A→B 与 B→C 得到 A→C。',
      apply: function (inputs) {
        var a = inputToken(inputs, 'a', '断言 A→B');
        var b = inputToken(inputs, 'b', '断言 B→C');
        var r = T.syllogism(a, b);
        if (!r.ok) fail(r.reason || '两路断言不能合成');
        return { tokens: assertionOf(asBody(r.out)), note: 'HS' };
      }
    },

    /* ---- set.mm 证明重放（同一注册表） ---- */
    mmhyp: {
      label: '前提', kindLabel: 'HYP', group: 'replay', symbol: 'H', construct: false,
      ports: { inputs: [], outputs: [{ id: 'out', label: '前提公式', type: ASSERTION }] },
      config: { label: '' },
      help: '本关自带的前提（$f 变量声明或 $e 假设），可以直接接到需要的输入上。',
      apply: function (inputs, cfg, ctx) {
        var proof = ctx && ctx.proof;
        var frame = proof && proof.frames && proof.frames[cfg.label];
        if (!frame) {
          /* mandatory 里的 $f 也可能没有单独 frames 条目 */
          if (proof && proof.mandatory) {
            for (var i = 0; i < proof.mandatory.length; i += 1) {
              if (proof.mandatory[i].label === cfg.label) { frame = proof.mandatory[i]; break; }
            }
          }
        }
        if (!frame) fail('找不到前提 ' + cfg.label);
        return { tokens: frame.math.slice(), note: cfg.label };
      }
    },
    mmstep: {
      label: '证明步骤', kindLabel: 'STEP', group: 'replay', symbol: 'S', construct: false,
      ports: {
        inputs: [
          { id: 'e1', label: '前提 1', type: ASSERTION },
          { id: 'e2', label: '前提 2', type: ASSERTION },
          { id: 'e3', label: '前提 3', type: ASSERTION },
          { id: 'e4', label: '前提 4', type: ASSERTION },
          { id: 'e5', label: '前提 5', type: ASSERTION },
          { id: 'e6', label: '前提 6', type: ASSERTION },
          { id: 'e7', label: '前提 7', type: ASSERTION },
          { id: 'e8', label: '前提 8', type: ASSERTION }
        ],
        outputs: [{ id: 'out', label: '步骤结论', type: ASSERTION }]
      },
      config: { label: '', arity: 0 },
      help: '套用一条 set.mm 断言：把它的每个前提接到输入上，输出是代入后的结论。',
      apply: function (inputs, cfg, ctx) {
        var proof = ctx && ctx.proof;
        var frame = proof && proof.frames && proof.frames[cfg.label];
        /* $a 公理关没有证明步骤：它自己的 frame 由 mandatory + 结论合成。 */
        if (!frame && proof && proof.kind === '$a' && cfg.label === proof.label) {
          frame = { label: proof.label, kind: '$a', math: proof.conclusion, mandatory: proof.mandatory || [], dv: proof.dv || [] };
        }
        if (!frame) fail('找不到断言 ' + cfg.label);
        var arity = (frame.mandatory || []).length;
        var actual = [];
        for (var i = 1; i <= arity; i += 1) {
          var v = inputs['e' + i];
          if (!v || !v.length) fail('等待第 ' + i + ' 个前提');
          actual.push(v);
        }
        var res = T.applyFrame(frame, actual);
        if (!res.ok) fail(cfg.label + '：' + res.error);
        var dv = T.checkDv(T.mandatoryDv(frame), res.sub, (proof && proof.vars) || {});
        if (!dv.ok) fail(cfg.label + '：' + dv.errors.join('；'));
        return { tokens: res.conclusion, note: cfg.label };
      }
    }
  };

  function binaryCtor(op, note) {
    return function (inputs) {
      var a = inputToken(inputs, 'a', '前件');
      var b = inputToken(inputs, 'b', '后件');
      return { tokens: wffOf(['('].concat(asBody(a), [op], asBody(b), [')'])), note: note };
    };
  }

  var LIST = Object.keys(MODULES).map(function (k) { return MODULES[k]; });
  var ORDER = Object.keys(MODULES);

  function info(kind) {
    var m = MODULES[kind];
    if (!m) return { label: kind, kindLabel: kind, ports: { inputs: [], outputs: [] }, help: '' };
    return {
      label: m.label,
      kindLabel: m.kindLabel,
      group: m.group,
      symbol: m.symbol,
      ports: m.ports,
      config: m.config,
      help: m.help
    };
  }

  function isConstruct(kind) {
    var m = MODULES[kind];
    return !!(m && m.construct);
  }

  function apply(kind, inputs, config, ctx) {
    var m = MODULES[kind];
    if (!m) fail('未知模块类型：' + kind);
    return m.apply(inputs || {}, config || {}, ctx || {});
  }

  host.RSL.Modules = {
    MODULES: MODULES,
    LIST: LIST,
    ORDER: ORDER,
    info: info,
    isConstruct: isConstruct,
    apply: apply,
    getAxiom: getAxiom,
    getLevelTheorem: getLevelTheorem,
    getArchive: getArchive,
    resetCache: resetCache
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = host.RSL.Modules;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
