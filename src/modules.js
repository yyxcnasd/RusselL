/*!
 * 公理板 / AXIOM BOARD — RSL.Modules
 *
 * 唯一模块注册表（大重构后）：非定理模块收敛为「6 个构造 + 1 个公理 + 7 个推理规则」，
 * 其余一切结论都只能作为更早关卡证过的定理（*NN）使用。
 *
 *   构造：atom 原子 / term 个体变元 / pred 谓词或等词 / not ¬ / imp → / all ∀
 *   公理：axiom，config.schema ∈ A1 | A2 | A3
 *   推理：subst 代入 / mp 分离 / gen 全称推广 / all-elim 全称例化 /
 *         all-dist 全称分配 / eq-refl 等词自反 / eq-subst 等词替换
 *   定理：theorem，config.n = 关卡号，显示 *NN；只允许引用更早关卡（引擎校验）
 *
 * 公式一律是 RSL.Term token 数组。失败抛 Error（消息即玩家看到的错误）。
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
  function need(inputs, id, what) {
    var v = inputs[id];
    if (!v || !Array.isArray(v) || !v.length) fail('等待' + (what || '输入'));
    return v;
  }
  function asBody(tokens) { return T.body(tokens); }
  function assertionOf(bodyTokens) { return ['|-'].concat(bodyTokens); }
  function wffOf(bodyTokens) { return ['wff'].concat(bodyTokens); }

  /* ---------------- 公理图式 ---------------- */

  var AXIOMS = {
    A1: {
      label: '公理 A1', formula: 'P→(Q→P)', why: '任意命题蕴涵一切蕴涵它的命题。'
    },
    A2: {
      label: '公理 A2', formula: '(P→(Q→R))→((P→Q)→(P→R))', why: '蕴涵的分销：前件可以分配到后件的三个位置。'
    },
    A3: {
      label: '公理 A3', formula: '(¬P→¬Q)→(Q→P)', why: '逆否与反证法的基础。'
    },
    A4: {
      label: '公理 A4', formula: '∀x P→P', why: '全称消去：∀x P 推出 P；x 可换成 x/y/z。', needsVar: true
    },
    A5: {
      label: '公理 A5', formula: '∀x(P→Q)→(∀xP→∀xQ)', why: '全称分配：∀ 可以分配到蕴涵两侧。', needsVar: true
    }
  };

  var cache = { axiom: {} };
  function axiomBody(schema, v) {
    var ax = AXIOMS[schema];
    if (!ax) fail('未知公理 ' + schema);
    if (ax.needsVar) {
      var b = v || 'x';
      if (!/^[xyzuvw]$/.test(b)) b = 'x';
      if (schema === 'A4') return ['(', 'A.', b, 'P', '->', 'P', ')'];
      if (schema === 'A5') {
        return ['(', 'A.', b, '(', 'P', '->', 'Q', ')', '->',
          '(', 'A.', b, 'P', '->', 'A.', b, 'Q', ')', ')'];
      }
    }
    if (!cache.axiom[schema]) cache.axiom[schema] = asBody(T.parse(ax.formula));
    return cache.axiom[schema];
  }

  /* ---------------- 规则辅助 ---------------- */

  function assertionBody(inputs, id, what) {
    var v = need(inputs, id, what);
    if (T.typeOf(v) !== '|-') fail('输入必须是 ⊢ 断言');
    return asBody(v);
  }

  /** 在全称式里读出入：{ v, body }；否则报错。 */
  function forallParts(bodyTokens, what) {
    var tree = T.read(wffOf(bodyTokens));
    if (tree.k !== 'all') fail((what || '输入') + '必须是全称量化式 ∀x A');
    return { v: tree.v, body: T.treeToBody(tree.a) };
  }

  function termName(tokens, what) {
    var v = need(inputsGuard(tokens), 'x', what);
    return v;
  }

  /* 小工具：把 term 端口值（['setvar','x']）取成名字。 */
  function termOf(inputs, id, fallback) {
    var v = inputs[id];
    if (!v || !Array.isArray(v) || !v.length) return fallback || 'x';
    var b = T.body(v);
    if (b.length !== 1 || !/^[A-Za-z][A-Za-z0-9_]*$/.test(b[0])) fail('个体变元必须是单个名字');
    return b[0];
  }

  function inputsGuard() { return null; }

  var VAR_POOL = ['x', 'y', 'z', 'u', 'v', 'w'];
  /** 取 n 个不在 used 中的变元名（集合公理需要避开输入集合名）。 */
  function freshVars(used, n) {
    var out = [];
    for (var i = 0; i < VAR_POOL.length && out.length < n; i += 1) {
      if (used.indexOf(VAR_POOL[i]) < 0) out.push(VAR_POOL[i]);
    }
    if (out.length < n) fail('没有足够的变元名可用');
    return out;
  }

  /* 等词式解析：x = y */
  function equalityParts(bodyTokens) {
    var tree = T.read(wffOf(bodyTokens));
    if (tree.k !== 'pred' || tree.name !== '=' || !tree.args || tree.args.length !== 2) {
      fail('输入必须是等词式 x = y');
    }
    return { a: tree.args[0].name, b: tree.args[1].name };
  }

  function substVarAssertion(bodyTokens, from, to) {
    return asBody(T.substituteVar(wffOf(bodyTokens), from, to));
  }

  /* ---------------- 注册表 ---------------- */

  var FORMULA = 'formula';
  var ASSERTION = 'assertion';
  var ATOM = 'atom';
  var TERM = 'term';

  var SUBST_INPUTS = [{ id: 'assertion', label: '断言 A', type: ASSERTION }];
  ['1', '2', '3'].forEach(function (n, i) {
    SUBST_INPUTS.push({ id: 'atom' + n, label: '原子 ' + (i + 1), type: FORMULA });
    SUBST_INPUTS.push({ id: 'formula' + n, label: '公式 ' + (i + 1), type: FORMULA });
  });
  SUBST_INPUTS.push({ id: 'vleft', label: '旧变元', type: TERM });
  SUBST_INPUTS.push({ id: 'vright', label: '新变元', type: TERM });

  function binaryCtor(op, note) {
    return function (inputs) {
      var a = need(inputs, 'a', '公式 A');
      var b = need(inputs, 'b', '公式 B');
      return { tokens: wffOf(['('].concat(asBody(a), [op], asBody(b), [')'])), note: note };
    };
  }

  var MODULES = {
    target: {
      label: '目标焊盘', kindLabel: 'TARGET', group: 'target', symbol: '◎', construct: true,
      ports: { inputs: [{ id: 'proof', label: '最终断言', type: ASSERTION }], outputs: [] },
      config: {},
      help: '把你要证的断言接到这里。',
      apply: function () { fail('target 由求值器直接处理'); }
    },

    /* ---- 构造（6） ---- */
    atom: {
      label: '原子命题', kindLabel: 'ATOM', group: 'build', symbol: 'P', construct: true,
      ports: { inputs: [], outputs: [{ id: 'out', label: '公式', type: FORMULA }] },
      config: { name: 'P' },
      help: '命题变元 P/Q/R/S/T：代入规则可以把它换成任意公式。',
      apply: function (inputs, cfg) {
        var name = (cfg.name || 'P').toUpperCase().slice(0, 1);
        if (!/^[PQRST]$/.test(name)) name = 'P';
        return { tokens: wffOf([name]), note: '原子 ' + name };
      }
    },
    term: {
      label: '个体变元', kindLabel: 'TERM', group: 'build', symbol: 'x', construct: true,
      ports: { inputs: [], outputs: [{ id: 'out', label: '个体', type: TERM }] },
      config: { name: 'x' },
      help: '个体变元 x/y/z；谓词和等词靠它组装。',
      apply: function (inputs, cfg) {
        var name = (cfg.name || 'x').toLowerCase().slice(0, 1);
        if (!/^[xyzuvw]$/.test(name)) name = 'x';
        return { tokens: ['setvar', name], note: '变元 ' + name };
      }
    },
    pred: {
      label: '谓词 / 等词', kindLabel: 'PRED', group: 'build', symbol: 'F', construct: true,
      ports: {
        inputs: [{ id: 't1', label: '个体 1', type: TERM }, { id: 't2', label: '个体 2', type: TERM }],
        outputs: [{ id: 'out', label: 'F(x) / x=y', type: FORMULA }]
      },
      config: { symbol: 'F' },
      help: 'F(x)、G(x)、H(x) 或等词 x = y（符号选“=”，需要两个个体）。',
      apply: function (inputs, cfg) {
        var sym = cfg.symbol || 'F';
        var t1 = termOf(inputs, 't1', 'x');
        if (sym === '=') {
          var t2 = termOf(inputs, 't2', 'x');
          return { tokens: wffOf([t1, '=', t2]), note: t1 + ' = ' + t2 };
        }
        if (!/^[FGH]$/.test(sym)) sym = 'F';
        return { tokens: wffOf([sym, '(', t1, ')']), note: sym + '(' + t1 + ')' };
      }
    },
    exists: {
      label: '存在', kindLabel: 'EXISTS', group: 'build', symbol: '∃', construct: true,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }], outputs: [{ id: 'out', label: '∃x A', type: FORMULA }] },
      config: { v: 'x' },
      help: '给公式加 ∃x / ∃y / ∃z。',
      apply: function (inputs, cfg) {
        var a = need(inputs, 'a', '公式 A');
        var v = (cfg.v || 'x').toLowerCase().slice(0, 1);
        if (!/^[xyzuvw]$/.test(v)) v = 'x';
        return { tokens: wffOf(['E.', v].concat(asBody(a))), note: '∃' + v };
      }
    },
    mem: {
      label: '属于关系', kindLabel: 'MEM', group: 'build', symbol: '∈', construct: true,
      ports: { inputs: [{ id: 'a', label: '个体 a', type: TERM }, { id: 'b', label: '个体 b', type: TERM }], outputs: [{ id: 'out', label: 'a ∈ b', type: FORMULA }] },
      config: {},
      help: '集合论的基本关系：a ∈ b。',
      apply: function (inputs) {
        var a = termOf(inputs, 'a', 'a');
        var b = termOf(inputs, 'b', 'b');
        return { tokens: wffOf([a, 'e.', b]), note: a + ' ∈ ' + b };
      }
    },
    and: {
      label: '合取', kindLabel: 'AND', group: 'build', symbol: '∧', construct: true,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }, { id: 'b', label: '公式 B', type: FORMULA }], outputs: [{ id: 'out', label: 'A∧B', type: FORMULA }] },
      config: {},
      help: '集合公理里用来陈述同时成立的条件。',
      apply: binaryCtor('/\\', '合取')
    },
    or: {
      label: '析取', kindLabel: 'OR', group: 'build', symbol: '∨', construct: true,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }, { id: 'b', label: '公式 B', type: FORMULA }], outputs: [{ id: 'out', label: 'A∨B', type: FORMULA }] },
      config: {},
      help: '集合公理里用来陈述“或”的条件。',
      apply: binaryCtor('\\/', '析取')
    },
    iff: {
      label: '等值', kindLabel: 'IFF', group: 'build', symbol: '↔', construct: true,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }, { id: 'b', label: '公式 B', type: FORMULA }], outputs: [{ id: 'out', label: 'A↔B', type: FORMULA }] },
      config: {},
      help: '集合恒等式常用等值来陈述。',
      apply: binaryCtor('<->', '等值')
    },
    not: {
      label: '否定', kindLabel: 'NOT', group: 'build', symbol: '¬', construct: true,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }], outputs: [{ id: 'out', label: '¬A', type: FORMULA }] },
      config: {},
      help: '输入 A，输出 ¬A。',
      apply: function (inputs) {
        var a = need(inputs, 'a', '公式 A');
        return { tokens: wffOf(['-.'].concat(asBody(a))), note: '否定' };
      }
    },
    imp: {
      label: '蕴涵', kindLabel: 'IMP', group: 'build', symbol: '→', construct: true,
      ports: { inputs: [{ id: 'a', label: '前件 A', type: FORMULA }, { id: 'b', label: '后件 B', type: FORMULA }], outputs: [{ id: 'out', label: 'A→B', type: FORMULA }] },
      config: {},
      help: '合成 A→B。',
      apply: function (inputs) {
        var a = need(inputs, 'a', '前件');
        var b = need(inputs, 'b', '后件');
        return { tokens: wffOf(['('].concat(asBody(a), ['->'], asBody(b), [')'])), note: '蕴涵' };
      }
    },
    all: {
      label: '全称', kindLabel: 'ALL', group: 'build', symbol: '∀', construct: true,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }], outputs: [{ id: 'out', label: '∀x A', type: FORMULA }] },
      config: { v: 'x' },
      help: '给公式加 ∀x / ∀y / ∀z。',
      apply: function (inputs, cfg) {
        var a = need(inputs, 'a', '公式 A');
        var v = (cfg.v || 'x').toLowerCase().slice(0, 1);
        if (!/^[xyzuvw]$/.test(v)) v = 'x';
        return { tokens: wffOf(['A.', v].concat(asBody(a))), note: '∀' + v };
      }
    },

    /* ---- 公理（1 个模块，3 条图式） ---- */
    axiom: {
      label: '公理图式', kindLabel: 'AXIOM', group: 'axiom', symbol: 'Ax', construct: false,
      ports: { inputs: [], outputs: [{ id: 'out', label: '断言', type: ASSERTION }] },
      config: { schema: 'A1' },
      help: '命题演算的三条公理之一；代入规则可以把 P/Q/R 换成任意公式。',
      apply: function (inputs, cfg) {
        var schema = cfg.schema || 'A1';
        var v = cfg.v || 'x';
        var ax = AXIOMS[schema];
        var note = ax.label + (ax.needsVar ? ' · ' + v : '');
        return { tokens: assertionOf(axiomBody(schema, v)), note: note, meta: { axiom: { id: schema, name: ax.label, formula: ax.formula } } };
      }
    },

    /* ---- 推理（7） ---- */
    subst: {
      label: '代入', kindLabel: 'SUBST', group: 'rule', symbol: 'S', construct: false,
      ports: { inputs: SUBST_INPUTS, outputs: [{ id: 'out', label: 'A[P:=B]', type: ASSERTION }] },
      config: {},
      help: '把断言里的原子 P/Q/R 同时换成公式（最多三组）；也可接一组变元改名。',
      apply: function (inputs) {
        var assertion = assertionBody(inputs, 'assertion', '断言 A');
        var bodyTokens = assertion;
        var parts = [];
        var vLeft = inputs.vleft, vRight = inputs.vright;
        if (vLeft || vRight) {
          if (!vLeft || !vRight) fail('变元改名需要同时接旧变元和新变元');
          var fromVar = termOf({ vleft: vLeft }, 'vleft', 'x');
          var toVar = termOf({ vright: vRight }, 'vright', 'y');
          if (T.freeVars(wffOf(bodyTokens)).indexOf(fromVar) < 0) fail('断言里没有自由变元 ' + fromVar);
          bodyTokens = asBody(T.substituteVar(wffOf(bodyTokens), fromVar, toVar));
          parts.push(fromVar + ' → ' + toVar);
        }
        var map = Object.create(null);
        for (var i = 1; i <= 3; i += 1) {
          var atomVal = inputs['atom' + i];
          var formulaVal = inputs['formula' + i];
          if (!atomVal && !formulaVal) continue;
          if (!atomVal || !formulaVal) fail('第 ' + i + ' 组代入需要同时接原子和公式');
          if (!T.isAtom(atomVal)) fail('第 ' + i + ' 组的左边必须是单个原子 P/Q/R/S/T');
          var name = asBody(atomVal)[0];
          if (Object.prototype.hasOwnProperty.call(map, name)) fail('同一原子不能代入两次');
          if (bodyTokens.indexOf(name) < 0) fail('原子 ' + name + ' 没有出现在断言中');
          map[name] = asBody(formulaVal);
          parts.push(name + ' := ' + T.fmt(wffOf(map[name])));
        }
        if (!parts.length) fail('至少接一组代入');
        var resultBody = asBody(T.substAtoms(wffOf(bodyTokens), map));
        return { tokens: assertionOf(resultBody), note: parts.join('，'), meta: { mapping: map } };
      }
    },
    mp: {
      label: '分离', kindLabel: 'MP', group: 'rule', symbol: 'M', construct: false,
      ports: {
        inputs: [{ id: 'a', label: '断言 A', type: ASSERTION }, { id: 'b', label: '断言 A→B', type: ASSERTION }],
        outputs: [{ id: 'out', label: '结论 B', type: ASSERTION }]
      },
      config: {},
      help: 'A 与 A→B 得出 B，顺序任意。',
      apply: function (inputs) {
        var a = assertionBody(inputs, 'a', '断言 A');
        var b = assertionBody(inputs, 'b', '断言 B');
        var r = T.detach(assertionOf(a), assertionOf(b));
        if (!r.ok) fail(r.reason || '两路断言不能分离');
        return { tokens: r.out, note: r.form || '分离' };
      }
    },
    shift: {
      label: '全称引入', kindLabel: '∀I*', group: 'rule', symbol: '∀*', construct: false,
      ports: { inputs: [{ id: 'formula', label: '公式 A', type: FORMULA }], outputs: [{ id: 'out', label: 'A→∀x A', type: ASSERTION }] },
      config: { v: 'x' },
      help: '若 x 不在 A 中自由出现，则从 A 得到 A→∀x A（重言式上的全称引入）。',
      apply: function (inputs, cfg) {
        var a = need(inputs, 'formula', '公式 A');
        var body = asBody(a);
        var v = (cfg.v || 'x').toLowerCase().slice(0, 1);
        if (!/^[xyzuvw]$/.test(v)) v = 'x';
        if (T.freeVars(wffOf(body)).indexOf(v) >= 0) fail('变元 ' + v + ' 在公式中自由出现，不能做全称引入');
        return { tokens: assertionOf(['('].concat(body, ['->', 'A.', v], body, [')'])), note: '∀I* · ' + v };
      }
    },

    'all-inst': {
      label: '全称例化公理', kindLabel: '∀E*', group: 'rule', symbol: '∀E*', construct: false,
      ports: {
        inputs: [{ id: 'formula', label: '公式 A', type: FORMULA }, { id: 'term', label: '个体 t', type: TERM }],
        outputs: [{ id: 'out', label: '∀x A → A[t/x]', type: ASSERTION }]
      },
      config: { v: 'x' },
      help: '真正的全称消去：把绑定变元换成个体 t，得到 ∀x A → A[t/x]。',
      apply: function (inputs, cfg) {
        var a = need(inputs, 'formula', '公式 A');
        var t = termOf(inputs, 'term', 'y');
        var v = (cfg.v || 'x').toLowerCase().slice(0, 1);
        if (!/^[xyzuvw]$/.test(v)) v = 'x';
        var body = asBody(a);
        var inst = asBody(T.substituteVar(wffOf(body), v, t));
        return {
          tokens: assertionOf(['('].concat(['A.', v], body, ['->'], inst, [')'])),
          note: '∀E* · ' + v + '→' + t
        };
      }
    },
    'exists-gen': {
      label: '存在推广公理', kindLabel: '∃I*', group: 'rule', symbol: '∃I*', construct: false,
      ports: {
        inputs: [{ id: 'formula', label: '公式 A', type: FORMULA }, { id: 'term', label: '个体 t', type: TERM }],
        outputs: [{ id: 'out', label: 'A[t/x] → ∃x A', type: ASSERTION }]
      },
      config: { v: 'x' },
      help: '真正的存在推广：A[t/x] → ∃x A。',
      apply: function (inputs, cfg) {
        var a = need(inputs, 'formula', '公式 A');
        var t = termOf(inputs, 'term', 'y');
        var v = (cfg.v || 'x').toLowerCase().slice(0, 1);
        if (!/^[xyzuvw]$/.test(v)) v = 'x';
        var body = asBody(a);
        var inst = asBody(T.substituteVar(wffOf(body), v, t));
        return {
          tokens: assertionOf(['('].concat(inst, ['->'], ['E.', v], body, [')'])),
          note: '∃I* · ' + v + '←' + t
        };
      }
    },
    'and-intro-ax': {
      label: '合取引入公理', kindLabel: '∧I*', group: 'rule', symbol: '∧I*', construct: false,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }, { id: 'b', label: '公式 B', type: FORMULA }], outputs: [{ id: 'out', label: 'A→(B→A∧B)', type: ASSERTION }] },
      config: {},
      help: 'A→(B→(A∧B))：希尔伯特形式的合取引入。',
      apply: function (inputs) {
        var a = asBody(need(inputs, 'a', '公式 A')), b = asBody(need(inputs, 'b', '公式 B'));
        return { tokens: assertionOf(['('].concat(a, ['->'], ['('].concat(b, ['->'], ['('].concat(a, ['/\\'], b, [')']), [')']), [')'])), note: '∧I*' };
      }
    },
    'and-elim-ax': {
      label: '合取消去公理', kindLabel: '∧E*', group: 'rule', symbol: '∧E*', construct: false,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }, { id: 'b', label: '公式 B', type: FORMULA }], outputs: [{ id: 'out', label: '(A∧B)→A / B', type: ASSERTION }] },
      config: { side: 'l' },
      help: '合取的希尔伯特消去：(A∧B)→A 或 (A∧B)→B。',
      apply: function (inputs, cfg) {
        var a = asBody(need(inputs, 'a', '公式 A')), b = asBody(need(inputs, 'b', '公式 B'));
        var pick = cfg.side === 'r' ? b : a;
        return { tokens: assertionOf(['('].concat(['('].concat(a, ['/\\'], b, [')']), ['->'], pick, [')'])), note: '∧E*' };
      }
    },
    'or-intro-ax': {
      label: '析取引入公理', kindLabel: '∨I*', group: 'rule', symbol: '∨I*', construct: false,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }, { id: 'b', label: '公式 B', type: FORMULA }], outputs: [{ id: 'out', label: 'A→A∨B / B→A∨B', type: ASSERTION }] },
      config: { side: 'l' },
      help: 'A→(A∨B) 或 B→(A∨B)。',
      apply: function (inputs, cfg) {
        var a = asBody(need(inputs, 'a', '公式 A')), b = asBody(need(inputs, 'b', '公式 B'));
        var left = cfg.side === 'l' ? a : b;
        return { tokens: assertionOf(['('].concat(left, ['->'], ['('].concat(a, ['\\/'], b, [')']), [')'])), note: '∨I*' };
      }
    },
    'or-elim-ax': {
      label: '析取消去公理', kindLabel: '∨E*', group: 'rule', symbol: '∨E*', construct: false,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }, { id: 'b', label: '公式 B', type: FORMULA }, { id: 'c', label: '公式 C', type: FORMULA }], outputs: [{ id: 'out', label: '(A∨B)→((A→C)→((B→C)→C))', type: ASSERTION }] },
      config: {},
      help: '析取消去的希尔伯特形式。',
      apply: function (inputs) {
        var a = asBody(need(inputs, 'a', '公式 A')), b = asBody(need(inputs, 'b', '公式 B')), c = asBody(need(inputs, 'c', '公式 C'));
        var or = ['('].concat(a, ['\\/'], b, [')']);
        var ac = ['('].concat(a, ['->'], c, [')']);
        var bc = ['('].concat(b, ['->'], c, [')']);
        return { tokens: assertionOf(['('].concat(or, ['->'], ['('].concat(ac, ['->'], ['('].concat(bc, ['->'], c, [')']), [')']), [')'])), note: '∨E*' };
      }
    },
    'iff-intro-ax': {
      label: '等值引入公理', kindLabel: '↔I*', group: 'rule', symbol: '↔I*', construct: false,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }, { id: 'b', label: '公式 B', type: FORMULA }], outputs: [{ id: 'out', label: '(A→B)→((B→A)→A↔B)', type: ASSERTION }] },
      config: {},
      help: '等值引入的希尔伯特形式。',
      apply: function (inputs) {
        var a = asBody(need(inputs, 'a', '公式 A')), b = asBody(need(inputs, 'b', '公式 B'));
        var ab = ['('].concat(a, ['->'], b, [')']);
        var ba = ['('].concat(b, ['->'], a, [')']);
        return { tokens: assertionOf(['('].concat(ab, ['->'], ['('].concat(ba, ['->'], ['('].concat(a, ['<->'], b, [')']), [')']), [')'])), note: '↔I*' };
      }
    },
    'iff-elim-ax': {
      label: '等值消去公理', kindLabel: '↔E*', group: 'rule', symbol: '↔E*', construct: false,
      ports: { inputs: [{ id: 'a', label: '公式 A', type: FORMULA }, { id: 'b', label: '公式 B', type: FORMULA }], outputs: [{ id: 'out', label: '(A↔B)→(A→B) / (B→A)', type: ASSERTION }] },
      config: { dir: 'lr' },
      help: '等值消去的希尔伯特形式。',
      apply: function (inputs, cfg) {
        var a = asBody(need(inputs, 'a', '公式 A')), b = asBody(need(inputs, 'b', '公式 B'));
        var iff = ['('].concat(a, ['<->'], b, [')']);
        var body = cfg.dir === 'rl' ? ['('].concat(b, ['->'], a, [')']) : ['('].concat(a, ['->'], b, [')']);
        return { tokens: assertionOf(['('].concat(iff, ['->'], body, [')'])), note: '↔E*' };
      }
    },

    'exists-elim': {
      label: '存在消去', kindLabel: '∃E', group: 'rule', symbol: '∃E', construct: false,
      ports: {
        inputs: [
          { id: 'exists', label: '断言 ∃x A', type: ASSERTION },
          { id: 'implication', label: '断言 A→B', type: ASSERTION }
        ],
        outputs: [{ id: 'out', label: '断言 B', type: ASSERTION }]
      },
      config: {},
      help: '∃x A 与 A→B 得到 B；x 不能在 B 中自由出现。',
      apply: function (inputs) {
        var ex = need(inputs, 'exists', '断言 ∃x A');
        var imp = need(inputs, 'implication', '断言 A→B');
        if (T.typeOf(ex) !== '|-' || T.typeOf(imp) !== '|-') fail('两路输入都必须是 ⊢ 断言');
        var exTree = T.read(wffOf(asBody(ex)));
        if (exTree.k !== 'exists') fail('第一路输入必须是 ∃x A');
        var impTree = T.read(wffOf(asBody(imp)));
        if (impTree.k !== 'imp') fail('第二路输入必须是 A→B');
        if (!T.eq(wffOf(T.treeToBody(exTree.a)), wffOf(T.treeToBody(impTree.a)))) fail('第二路前件与 ∃ 的内层公式不一致');
        var v = exTree.v;
        if (T.freeVars(wffOf(T.treeToBody(impTree.b))).indexOf(v) >= 0) fail('变元 ' + v + ' 在结论 B 中自由出现');
        return { tokens: assertionOf(T.treeToBody(impTree.b)), note: '∃E · ' + v };
      }
    },






    gen: {
      label: '全称推广', kindLabel: 'GEN', group: 'rule', symbol: '∀I', construct: false,
      ports: { inputs: [{ id: 'assertion', label: '断言 A', type: ASSERTION }], outputs: [{ id: 'out', label: '∀x A', type: ASSERTION }] },
      config: { v: 'x' },
      help: '从 A 得到 ∀x A（x 可选 x/y/z）。',
      apply: function (inputs, cfg) {
        var a = assertionBody(inputs, 'assertion', '断言 A');
        var v = (cfg.v || 'x').toLowerCase().slice(0, 1);
        if (!/^[xyzuvw]$/.test(v)) v = 'x';
        return { tokens: assertionOf(['A.', v].concat(a)), note: '∀I · ' + v };
      }
    },

    'all-dist': {
      label: '全称分配', kindLabel: '∀→', group: 'rule', symbol: '∀→', construct: false,
      ports: { inputs: [{ id: 'assertion', label: '断言 ∀x(A→B)', type: ASSERTION }], outputs: [{ id: 'out', label: '∀x A→∀x B', type: ASSERTION }] },
      config: {},
      help: '把全称式里的蕴涵分配到两侧：∀x(A→B) ⇒ ∀xA→∀xB。',
      apply: function (inputs) {
        var a = assertionBody(inputs, 'assertion', '断言 ∀x(A→B)');
        var got = forallParts(a, '输入');
        var tree = T.read(wffOf(got.body));
        if (tree.k !== 'imp') fail('全称分配的输入必须是 ∀x(A→B)');
        var x = got.v;
        var left = ['A.', x].concat(T.treeToBody(tree.a));
        var right = ['A.', x].concat(T.treeToBody(tree.b));
        return { tokens: assertionOf(['('].concat(left, ['->'], right, [')'])), note: '全称分配' };
      }
    },
    leibniz: {
      label: '等词替换公理', kindLabel: '=L', group: 'rule', symbol: '=L', construct: false,
      ports: {
        inputs: [
          { id: 'x', label: '个体 x', type: TERM },
          { id: 'y', label: '个体 y', type: TERM },
          { id: 'formula', label: '公式 A', type: FORMULA }
        ],
        outputs: [{ id: 'out', label: 'x=y→(A→A[y/x])', type: ASSERTION }]
      },
      config: {},
      help: 'x = y 说明两个个体不可区分：A 推出把 x 捕获规避地换成 y 的结论。',
      apply: function (inputs, cfg) {
        var x = termOf(inputs, 'x', 'x');
        var y = termOf(inputs, 'y', 'y');
        var a = need(inputs, 'formula', '公式 A');
        var bodyA = asBody(a);
        var mode = (cfg && cfg.mode) === 'replace' ? 'replace' : 'abstract';
        var left = bodyA;
        var right;
        if (mode === 'replace') {
          right = asBody(T.substituteVar(wffOf(bodyA), x, y));
        } else {
          var v = (cfg && cfg.v) || 'z';
          if (!/^[xyzuvw]$/.test(v)) v = 'z';
          left = asBody(T.substituteVar(wffOf(bodyA), v, x));
          right = asBody(T.substituteVar(wffOf(bodyA), v, y));
        }
        return {
          tokens: assertionOf(['('].concat([x, '=', y], ['->'], ['('].concat(left, ['->'], right, [')']), [')'])),
          note: '=L · ' + x + '→' + y + (mode === 'replace' ? '' : ' · 抽象')
        };
      }
    },
    'set-ext': {
      label: '外延公理', kindLabel: 'EXT', group: 'set', symbol: 'EXT', construct: false,
      ports: { inputs: [{ id: 'a', label: '集合 a', type: TERM }, { id: 'b', label: '集合 b', type: TERM }], outputs: [{ id: 'out', label: '(∀x(x∈a↔x∈b))→a=b', type: ASSERTION }] },
      config: {},
      help: '两个集合元素完全相同则相等。',
      apply: function (inputs) {
        var a = termOf(inputs, 'a', 'x'), b = termOf(inputs, 'b', 'y');
        var v = freshVars([a, b], 1)[0];
        var inner = ['('].concat([v, 'e.', a], ['<->'], [v, 'e.', b], [')']);
        return { tokens: assertionOf(['('].concat(['A.', v], inner, ['->'], [a, '=', b], [')'])), note: 'EXT' };
      }
    },
    'set-empty': {
      label: '空集公理', kindLabel: 'EMPTY', group: 'set', symbol: '∅', construct: false,
      ports: { inputs: [], outputs: [{ id: 'out', label: '∃z∀x¬(x∈z)', type: ASSERTION }] },
      config: {},
      help: '存在一个不含任何元素的集合。',
      apply: function () {
        return { tokens: assertionOf(['E.', 'z', 'A.', 'x', '-.', 'x', 'e.', 'z']), note: 'EMPTY' };
      }
    },
    'set-pair': {
      label: '配对公理', kindLabel: 'PAIR', group: 'set', symbol: '{,}', construct: false,
      ports: { inputs: [{ id: 'u', label: '集合 u', type: TERM }, { id: 'v', label: '集合 v', type: TERM }], outputs: [{ id: 'out', label: '∃z∀x((x=u∨x=v)↔x∈z)', type: ASSERTION }] },
      config: {},
      help: '任给两个集合，存在恰好以它们为元素的集合。',
      apply: function (inputs) {
        var u = termOf(inputs, 'u', 'x'), v = termOf(inputs, 'v', 'y');
        var fresh = freshVars([u, v], 2);
        var w = fresh[0], e = fresh[1];
        var cond = ['('].concat([w, '=', u], ['\\/'], [w, '=', v], [')']);
        return { tokens: assertionOf(['E.', e].concat(['A.', w], ['('], cond, ['<->'], [w, 'e.', e], [')'])), note: 'PAIR' };
      }
    },
    'set-union': {
      label: '并集公理', kindLabel: 'UNION', group: 'set', symbol: '∪', construct: false,
      ports: { inputs: [{ id: 'a', label: '集合 a', type: TERM }], outputs: [{ id: 'out', label: '∃z∀x((∃y(x∈y∧y∈a))↔x∈z)', type: ASSERTION }] },
      config: {},
      help: '存在一个集合，恰好包含 a 的元素的元素。',
      apply: function (inputs) {
        var a = termOf(inputs, 'a', 'x');
        var AND = '/' + String.fromCharCode(92);
        var fresh = freshVars([a], 3);
        var e = fresh[0], w = fresh[1], y = fresh[2];
        var inner = ['E.', y, '('].concat([w, 'e.', y], [AND], [y, 'e.', a], [')']);
        return { tokens: assertionOf(['E.', e].concat(['A.', w], ['('], inner, ['<->'], [w, 'e.', e], [')'])), note: 'UNION' };
      }
    },
    'eq-refl': {
      label: '等词自反', kindLabel: '=I', group: 'rule', symbol: '=I', construct: false,
      ports: { inputs: [], outputs: [{ id: 'out', label: 't = t', type: ASSERTION }] },
      config: { t: 'x' },
      help: '任何个体自己等于自己：x=x / y=y / z=z。',
      apply: function (inputs, cfg) {
        var t = (cfg.t || 'x').toLowerCase().slice(0, 1);
        if (!/^[xyzuvw]$/.test(t)) t = 'x';
        return { tokens: assertionOf([t, '=', t]), note: '=I · ' + t };
      }
    },


    /* ---- 定理：*NN，只引用更早关卡 ---- */
    theorem: {
      label: '已证定理', kindLabel: 'THEOREM', group: 'theorem', symbol: '*', construct: false,
      ports: { inputs: [], outputs: [{ id: 'out', label: '断言', type: ASSERTION }] },
      config: { n: 0 },
      help: '引用更早关卡已经证过的定理 *NN；只能引用编号更小的关卡。',
      apply: function (inputs, cfg, ctx) {
        var n = Number(cfg.n || 0);
        if (!n || n < 1) fail('定理模块缺少关卡号');
        var levels = (ctx && ctx.levels) || [];
        var current = ctx && ctx.levelNo ? Number(ctx.levelNo) : Infinity;
        if (n >= current) fail('只能引用更早的关卡（不能引用 *' + String(n).padStart(2, '0') + ' 或更晚）');
        var lv = levels.filter(function (x) { return Number(x.no) === n; })[0];
        if (!lv) fail('找不到关卡 *' + String(n).padStart(2, '0'));
        if (!Array.isArray(lv.targetTokens) || !lv.targetTokens.length) fail('关卡 *' + String(n).padStart(2, '0') + ' 缺少目标断言');
        return { tokens: lv.targetTokens.slice(), note: '*' + String(n).padStart(2, '0') };
      }
    }
  };

  function info(kind) {
    var m = MODULES[kind];
    if (!m) return { label: kind, kindLabel: kind, ports: { inputs: [], outputs: [] }, help: '', config: {} };
    return {
      label: m.label,
      kindLabel: m.kindLabel,
      group: m.group,
      symbol: m.symbol,
      ports: m.ports,
      config: Object.assign({}, m.config),
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

  function axiomList() {
    var out = [];
    Object.keys(AXIOMS).forEach(function (k) {
      if (AXIOMS[k].needsVar) {
        ['x', 'y', 'z'].forEach(function (v) {
          out.push({ id: k, v: v, label: AXIOMS[k].label + ' · ' + v, formula: AXIOMS[k].formula, why: AXIOMS[k].why });
        });
      } else {
        out.push({ id: k, label: AXIOMS[k].label, formula: AXIOMS[k].formula, why: AXIOMS[k].why });
      }
    });
    return out;
  }

  host.RSL.Modules = {
    MODULES: MODULES,
    AXIOMS: AXIOMS,
    axiomList: axiomList,
    info: info,
    isConstruct: isConstruct,
    apply: apply
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = host.RSL.Modules;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
