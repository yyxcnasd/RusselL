/* 公理板 — module metadata and graph evaluator. */
(function () {
  'use strict';
  window.RSL = window.RSL || {};

  var MODULES = {
    atom: {
      label: '原子命题', kindLabel: 'ATOM', group: 'build', symbol: 'P',
      ports: { inputs: [], outputs: [{ id: 'out', label: '公式', type: 'formula' }] },
      config: { name: 'P' },
      help: '提供 P、Q、R、S 中的一枚原子命题。'
    },
    not: {
      label: '否定门', kindLabel: 'NOT', group: 'build', symbol: '¬',
      ports: { inputs: [{ id: 'a', label: '公式 A', type: 'formula' }], outputs: [{ id: 'out', label: '¬A', type: 'formula' }] },
      help: '输入 A，输出 ¬A。括号由系统自动补全。'
    },
    or: {
      label: '析取门', kindLabel: 'OR', group: 'build', symbol: '∨',
      ports: { inputs: [{ id: 'a', label: '公式 A', type: 'formula' }, { id: 'b', label: '公式 B', type: 'formula' }], outputs: [{ id: 'out', label: 'A∨B', type: 'formula' }] },
      help: '输入两路公式，输出 (A∨B)。'
    },
    imp: {
      label: '蕴涵符号', kindLabel: 'IMP', group: 'build', symbol: '→',
      ports: { inputs: [{ id: 'a', label: '前件 A', type: 'formula' }, { id: 'b', label: '后件 B', type: 'formula' }], outputs: [{ id: 'out', label: 'A→B', type: 'formula' }] },
      help: '合成 A→B；校验时按 set.mm 定义展开比较。'
    },
    and: {
      label: '合取符号', kindLabel: 'AND', group: 'build', symbol: '∧',
      ports: { inputs: [{ id: 'a', label: '公式 A', type: 'formula' }, { id: 'b', label: '公式 B', type: 'formula' }], outputs: [{ id: 'out', label: 'A∧B', type: 'formula' }] },
      help: '按 df-an 合成 A∧B 的记法。'
    },
    iff: {
      label: '等值符号', kindLabel: 'IFF', group: 'build', symbol: '↔',
      ports: { inputs: [{ id: 'a', label: '公式 A', type: 'formula' }, { id: 'b', label: '公式 B', type: 'formula' }], outputs: [{ id: 'out', label: 'A↔B', type: 'formula' }] },
      help: '按 dfbi2 合成 A↔B 的记法。'
    },
    axiom: {
      label: '公理/定义', kindLabel: 'AXIOM', group: 'axiom', symbol: 'A',
      ports: { inputs: [], outputs: [{ id: 'out', label: '断言', type: 'assertion' }] },
      config: { axiomId: 'ax-1' },
      help: 'Metamath set.mm 的原始公理或定义图式。'
    },
    theorem: {
      label: '已证结论', kindLabel: 'PROVEN', group: 'theorem', symbol: 'T',
      ports: { inputs: [], outputs: [{ id: 'out', label: '断言', type: 'assertion' }] },
      config: { theoremCode: 'CH1-07' },
      help: '本游戏前面关卡已经证成的结论，作为封装好的电路接入。'
    },
    archive: {
      label: 'set.mm 定理', kindLabel: 'ARCHIVE', group: 'archive', symbol: 'M',
      ports: { inputs: [], outputs: [{ id: 'out', label: '断言', type: 'assertion' }] },
      config: { label: 'id' },
      help: 'Metamath set.mm 里已经证成的定理/公理（档案条目，本作不重证）。'
    },
    subst: {
      label: '代入规则', kindLabel: 'SUBST', group: 'rule', symbol: 'S',
      ports: {
        inputs: [
          { id: 'assertion', label: '断言 A', type: 'assertion' },
          { id: 'atom', label: '原子 π', type: 'formula' },
          { id: 'formula', label: '公式 B', type: 'formula' }
        ],
        outputs: [{ id: 'out', label: 'A[π/B]', type: 'assertion' }]
      },
      help: '把断言 A 中出现的原子 π 全部替换为合式公式 B。'
    },
    replace: {
      label: '定义置换', kindLabel: 'DEFINE', group: 'rule', symbol: 'D',
      ports: { inputs: [{ id: 'assertion', label: '断言 A', type: 'assertion' }], outputs: [{ id: 'out', label: '断言 B', type: 'assertion' }] },
      help: '按 df-or / df-an / dfbi2 / df-ex 对断言中的一个定义式做双向置换。'
    },
    detach: {
      label: '分离规则', kindLabel: 'DETACH', group: 'rule', symbol: 'M',
      ports: {
        inputs: [{ id: 'a', label: '断言 A', type: 'assertion' }, { id: 'b', label: '断言 B', type: 'assertion' }],
        outputs: [{ id: 'out', label: '结论', type: 'assertion' }]
      },
      help: '输入 A 与 A→B（顺序任意），输出 B。'
    },
    target: {
      label: '目标焊盘', kindLabel: 'TARGET', group: 'target', symbol: '◎',
      ports: { inputs: [{ id: 'proof', label: '最终断言', type: 'assertion' }], outputs: [] },
      help: '把你要证的断言接到这里。'
    },

    /* predicate layer */
    pred: {
      label: '谓词原子', kindLabel: 'PRED', group: 'predicate', symbol: 'F',
      ports: { inputs: [], outputs: [{ id: 'out', label: 'F(x)', type: 'formula' }] },
      config: { name: 'F', arg: 'x' },
      help: '合成一元谓词原子 F(x)。'
    },
    term: {
      label: '个体词', kindLabel: 'TERM', group: 'predicate', symbol: 'x',
      ports: { inputs: [], outputs: [{ id: 'out', label: 'x', type: 'formula' }] },
      config: { name: 'x' },
      help: '提供个体变元 x、y、z 或常元 a。'
    },
    quant: {
      label: '量词门', kindLabel: 'QUANT', group: 'predicate', symbol: '∀',
      ports: { inputs: [{ id: 'a', label: '公式 A', type: 'formula' }], outputs: [{ id: 'out', label: '∀x A', type: 'formula' }] },
      config: { kind: 'all', v: 'x' },
      help: '给公式加上 ∀x 或 ∃x。'
    },
    'all-elim': {
      label: '全称例化', kindLabel: '∀E', group: 'predicate', symbol: '∀E',
      ports: { inputs: [{ id: 'assertion', label: '断言 ∀x A', type: 'assertion' }], outputs: [{ id: 'out', label: 'A[t/x]', type: 'assertion' }] },
      config: { term: 'a' },
      help: '从 ∀x A 得到 A[t/x]。'
    },
    'all-intro': {
      label: '全称推广', kindLabel: '∀I', group: 'predicate', symbol: '∀I',
      ports: { inputs: [{ id: 'assertion', label: '断言 A', type: 'assertion' }], outputs: [{ id: 'out', label: '∀x A', type: 'assertion' }] },
      config: { v: 'x' },
      help: '从 A 得到 ∀x A。'
    },
    'exists-intro': {
      label: '存在引入', kindLabel: '∃I', group: 'predicate', symbol: '∃I',
      ports: { inputs: [{ id: 'assertion', label: '断言 A', type: 'assertion' }], outputs: [{ id: 'out', label: '∃x A', type: 'assertion' }] },
      config: { v: 'x' },
      help: '从 A 得到 ∃x A。'
    },
    'syllogism': {
      label: '假言三段论', kindLabel: 'HS', group: 'predicate', symbol: 'HS',
      ports: { inputs: [{ id: 'a', label: '断言 A→B', type: 'assertion' }, { id: 'b', label: '断言 B→C', type: 'assertion' }], outputs: [{ id: 'out', label: 'A→C', type: 'assertion' }] },
      config: {},
      help: '从 A→B 与 B→C 得到 A→C。'
    },
    'exists-elim': {
      label: '存在消去', kindLabel: '∃E', group: 'predicate', symbol: '∃E',
      ports: {
        inputs: [{ id: 'exists', label: '断言 ∃x A', type: 'assertion' }, { id: 'implication', label: '断言 A[y/x]→B', type: 'assertion' }],
        outputs: [{ id: 'out', label: 'B', type: 'assertion' }]
      },
      config: { y: 'y' },
      help: '从 ∃x A 与 A[y/x]→B 得到 B，y 须为新变元。'
    }
  };

  function list(v) { return v || []; }

  function getAxiom(id) {
    var all = list(window.RSL.AXIOMS);
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }

  /* 本游戏前面关卡已经证成的结论，可作为 theorem:<levelId> 模块引用。 */
  function getLevelTheorem(id) {
    var levels = list(window.RSL.LEVELS);
    for (var i = 0; i < levels.length; i++) {
      if (levels[i].id !== id) continue;
      var lv = levels[i];
      var name = (lv.code || lv.id) + (lv.title ? ' · ' + lv.title : '');
      return { id: lv.id, code: lv.id, name: name, formula: lv.target };
    }
    return null;
  }

  /* set.mm 档案条目（已证定理/公理），来自 src/archive.js。 */
  function getArchive(label) {
    var map = window.RSL.ARCHIVE || {};
    var t = map[label];
    if (!t) return null;
    return { label: label, name: t.name || label, formula: t.formula, code: t.code || label, source: t.source || 'set.mm' };
  }

  function incomingMap(edges) {
    var map = {};
    edges.forEach(function (e) {
      if (!e || !e.to) return;
      map[e.to.node + ':' + e.to.port] = e;
    });
    return map;
  }

  function topo(nodes, edges) {
    var byId = {};
    nodes.forEach(function (n) { byId[n.id] = n; });
    var out = {};
    edges.forEach(function (e) {
      if (!e.from || !byId[e.from.node]) return;
      (out[e.from.node] = out[e.from.node] || []).push(e);
    });
    var indeg = {};
    nodes.forEach(function (n) { indeg[n.id] = 0; });
    edges.forEach(function (e) {
      if (e.to && byId[e.to.node]) indeg[e.to.node] = (indeg[e.to.node] || 0) + 1;
    });
    var q = nodes.filter(function (n) { return !indeg[n.id]; }).map(function (n) { return n.id; });
    var order = [];
    while (q.length) {
      var id = q.shift();
      order.push(id);
      (out[id] || []).forEach(function (e) {
        var t = e.to.node;
        indeg[t]--;
        if (indeg[t] === 0) q.push(t);
      });
    }
    var cycle = nodes.filter(function (n) { return order.indexOf(n.id) === -1; }).map(function (n) { return n.id; });
    return { order: order, cycle: cycle };
  }

  function fail(msg) { return { ok: false, error: msg }; }

  function getInputs(node, edges, results) {
    var ins = incomingMap(edges);
    var def = MODULES[node.kind] || { ports: { inputs: [] } };
    var out = {};
    var missing = [];
    def.ports.inputs.forEach(function (p) {
      var e = ins[node.id + ':' + p.id];
      if (!e) { missing.push(p.id); return; }
      var upstream = results[e.from.node];
      if (!upstream || !upstream.ast) {
        out[p.id] = null;
        missing.push(p.id);
      } else {
        out[p.id] = upstream.ast;
      }
    });
    return { values: out, missing: missing, edges: ins };
  }

  function makeResult(node, ast, state, error, note, meta) {
    return { nodeId: node.id, ast: ast || null, state: state, error: error || null, note: note || '', meta: meta || {} };
  }

  function evaluateNode(node, edges, results) {
    var L = window.RSL.Logic;
    if (!L) return makeResult(node, null, 'error', '逻辑引擎未加载');
    var info = MODULES[node.kind];
    if (!info) return makeResult(node, null, 'error', '未知模块类型：' + node.kind);
    var cfg = node.config || {};
    var inp = getInputs(node, edges, results);
    var vals = inp.values;

    function need(port) {
      if (!vals[port]) return false;
      return true;
    }
    function waiting() {
      return makeResult(node, null, 'idle', null, '等待输入');
    }

    try {
      switch (node.kind) {
        case 'atom': {
          var name = (cfg.name || 'P').toUpperCase().slice(0, 1);
          if (!/^[A-Z]$/.test(name)) name = 'P';
          return makeResult(node, L.parse(name), 'valid', null, '原子命题');
        }
        case 'term': {
          var tn = (cfg.name || 'x').trim() || 'x';
          return makeResult(node, { k: 'var', name: tn }, 'valid', null, '个体词');
        }
        case 'pred': {
          var pname = (cfg.name || 'F').trim() || 'F';
          var arg = (cfg.arg || 'x').trim() || 'x';
          return makeResult(node, { k: 'pred', name: pname, args: [{ k: 'var', name: arg }] }, 'valid', null, '谓词原子');
        }
        case 'not': {
          if (!need('a')) return waiting();
          return makeResult(node, { k: 'not', a: vals.a }, 'valid', null, '否定');
        }
        case 'or': case 'imp': case 'and': case 'iff': {
          if (!need('a') || !need('b')) return waiting();
          return makeResult(node, { k: node.kind, a: vals.a, b: vals.b }, 'valid', null, info.label);
        }
        case 'axiom': {
          var ax = getAxiom(cfg.axiomId || 'A1');
          if (!ax) return makeResult(node, null, 'error', '找不到公理 ' + cfg.axiomId);
          return makeResult(node, L.parse(ax.schema), 'valid', null, ax.name + ' · ' + ax.code, { axiom: ax });
        }
        case 'theorem': {
          var code = cfg.theoremCode || '';
          var th = getLevelTheorem(code);
          if (!th) return makeResult(node, null, 'error', '找不到本作已证结论 ' + code);
          return makeResult(node, L.parse(th.formula), 'valid', null, th.name, { theorem: th });
        }
        case 'archive': {
          var label = cfg.label || cfg.code || '';
          var ar = getArchive(label);
          if (!ar) return makeResult(node, null, 'error', '找不到 set.mm 档案条目 ' + label);
          return makeResult(node, L.parse(ar.formula), 'valid', null, 'set.mm · ' + label, { archive: ar });
        }
        case 'subst': {
          if (!need('assertion') || !need('atom') || !need('formula')) return waiting();
          if (!L.isAtom(vals.atom)) return makeResult(node, null, 'error', '第二路输入必须是单个原子命题');
          var atomName = vals.atom.name;
          var atoms = L.atomsOf(vals.assertion).map(function (a) { return typeof a === 'string' ? a : a.name; });
          if (atoms.indexOf(atomName) === -1) return makeResult(node, null, 'error', '原子 ' + atomName + ' 没有出现在断言中');
          var out = L.substitute(vals.assertion, atomName, vals.formula);
          return makeResult(node, out, 'valid', null, atomName + ' := ' + L.fmt(vals.formula), { mapping: { atom: atomName, formula: vals.formula } });
        }
        case 'replace': {
          if (!need('assertion')) return waiting();
          var opts = L.replaceOptions(vals.assertion);
          if (!opts || !opts.length) return makeResult(node, null, 'error', '这条断言里没有可置换的定义式');
          var chosen = null;
          if (cfg.optionId) {
            for (var i = 0; i < opts.length; i++) if (opts[i].id === cfg.optionId) { chosen = opts[i]; break; }
          }
          if (!chosen && cfg.preferDef) {
            for (var j = 0; j < opts.length; j++) {
              if (opts[j].def === cfg.preferDef && (!cfg.preferDir || opts[j].dir === cfg.preferDir)) {
                if (!cfg.preferPath || JSON.stringify(opts[j].path) === JSON.stringify(cfg.preferPath)) { chosen = opts[j]; break; }
              }
            }
          }
          if (!chosen) chosen = opts[0];
          return makeResult(node, chosen.result, 'valid', null, chosen.label, { options: opts, optionId: chosen.id, chosen: chosen });
        }
        case 'detach': {
          if (!need('a') || !need('b')) return waiting();
          var d = L.detach(vals.a, vals.b);
          if (!d.ok) return makeResult(node, null, 'error', d.reason || '两路断言不能分离');
          return makeResult(node, d.out, 'valid', null, d.form || '分离', {});
        }
        case 'quant': {
          if (!need('a')) return waiting();
          var qk = cfg.kind === 'exists' ? 'exists' : 'all';
          return makeResult(node, { k: qk, v: cfg.v || 'x', a: vals.a }, 'valid', null, qk === 'all' ? '全称量化' : '存在量化');
        }
        case 'all-elim': {
          if (!need('assertion')) return waiting();
          if (vals.assertion.k !== 'all') return makeResult(node, null, 'error', '输入必须是全称量化式 ∀x A');
          var t = { k: 'var', name: cfg.term || 'a' };
          return makeResult(node, L.substituteVar(vals.assertion.a, vals.assertion.v, t), 'valid', null, '∀E · ' + (cfg.term || 'a'));
        }
        case 'all-intro': {
          if (!need('assertion')) return waiting();
          var av = cfg.v || 'x';
          if (!/^[xyz]$/.test(av)) return makeResult(node, null, 'error', '全称推广的变元必须是 x/y/z，不能是常元');
          return makeResult(node, { k: 'all', v: av, a: vals.assertion }, 'valid', null, '∀I · ' + av);
        }
        case 'exists-intro': {
          if (!need('assertion')) return waiting();
          var ev = cfg.v || 'x';
          if (!/^[xyz]$/.test(ev)) return makeResult(node, null, 'error', '存在引入的变元必须是 x/y/z，不能是常元');
          return makeResult(node, { k: 'exists', v: ev, a: vals.assertion }, 'valid', null, '∃I · ' + ev);
        }
        case 'syllogism': {
          if (!need('a') || !need('b')) return waiting();
          if (vals.a.k !== 'imp' || vals.b.k !== 'imp') return makeResult(node, null, 'error', '两路输入都必须是以蕴涵为顶层的断言');
          if (!L.eq(vals.a.b, vals.b.a)) return makeResult(node, null, 'error', '中间命题不匹配');
          return makeResult(node, { k: 'imp', a: vals.a.a, b: vals.b.b }, 'valid', null, 'HS');
        }
        case 'exists-elim': {
          if (!need('exists') || !need('implication')) return waiting();
          if (vals.exists.k !== 'exists') return makeResult(node, null, 'error', '第一路输入必须是存在量化式 ∃x A');
          if (vals.implication.k !== 'imp') return makeResult(node, null, 'error', '第二路输入必须是蕴涵式 A[y/x]→B');
          var y = cfg.y || 'y';
          var instantiated = L.substituteVar(vals.exists.a, vals.exists.v, { k: 'var', name: y });
          if (!L.eq(instantiated, vals.implication.a)) return makeResult(node, null, 'error', '第二路前件与 ∃ 的例化式不一致');
          if (L.freeVars(vals.exists.a).indexOf(y) !== -1) return makeResult(node, null, 'error', '新变元 ' + y + ' 不能在 ∃x A 中自由出现');
          if (L.freeVars(vals.implication.b).indexOf(y) !== -1) return makeResult(node, null, 'error', '新变元 ' + y + ' 在结论 B 中自由出现');
          return makeResult(node, vals.implication.b, 'valid', null, '∃E · ' + y);
        }
        case 'target': {
          if (!need('proof')) return makeResult(node, null, 'open', null, '等待最终断言');
          var targetAst = L.parse(node.target || 'P');
          if (!L.eq(vals.proof, targetAst)) return makeResult(node, null, 'error', '输出与目标断言不一致');
          return makeResult(node, vals.proof, 'complete', null, '目标已接驳');
        }
        default:
          return makeResult(node, null, 'error', '未实现的模块：' + node.kind);
      }
    } catch (err) {
      return makeResult(node, null, 'error', err && err.message ? err.message : String(err));
    }
  }

  function evaluate(level, nodes, edges) {
    var L = window.RSL.Logic;
    nodes = nodes || [];
    edges = edges || [];
    var t = topo(nodes, edges);
    var results = {};
    var errors = [];
    t.cycle.forEach(function (id) {
      results[id] = makeResult({ id: id, kind: 'unknown' }, null, 'error', '检测到回路：电路不能闭环');
    });
    t.order.forEach(function (id) {
      var node = nodes.filter(function (n) { return n.id === id; })[0];
      if (!node) return;
      var r = evaluateNode(node, edges, results);
      results[id] = r;
      if (r.state === 'error') errors.push({ nodeId: id, message: r.error });
    });
    var validCount = 0;
    nodes.forEach(function (n) { if (results[n.id] && results[n.id].state === 'valid') validCount++; });
    var targetNode = nodes.filter(function (n) { return n.kind === 'target'; })[0] || null;
    var target = targetNode ? results[targetNode.id] : null;

    /* 反作弊：目标的上游必须真的包含公理/规则/已证结论，不能只用构造门拼出目标公式。
       构造门（atom/not/imp/or/and/iff/pred/term/quant）本身不产生断言。 */
    if (target && target.state === 'complete') {
      var CONSTRUCT = { atom: 1, not: 1, imp: 1, or: 1, and: 1, iff: 1, pred: 1, term: 1, quant: 1, target: 1 };
      var byId = {};
      nodes.forEach(function (n) { byId[n.id] = n; });
      var seen = {};
      var queue = [targetNode.id];
      var hasSource = false;
      var usedKinds = {};
      while (queue.length) {
        var id = queue.shift();
        if (seen[id]) continue;
        seen[id] = true;
        var nd = byId[id];
        if (nd) {
          usedKinds[nd.kind] = true;
          if (!CONSTRUCT[nd.kind]) hasSource = true;
        }
        edges.forEach(function (e) {
          if (e.to && e.to.node === id && !seen[e.from.node]) queue.push(e.from.node);
        });
      }
      if (!hasSource) {
        target.state = 'error';
        target.error = '目标公式必须由公理/规则/已证结论推出，不能只用构造门拼出来';
        target.note = target.error;
        errors.push({ nodeId: targetNode.id, message: target.error });
      } else if (level && Array.isArray(level.mustUse)) {
        var missing = level.mustUse.filter(function (kind) { return !usedKinds[kind]; })[0];
        if (missing) {
          target.state = 'error';
          target.error = '这一关需要用到 ' + missing + ' 模块';
          target.note = target.error;
          errors.push({ nodeId: targetNode.id, message: target.error });
        }
      }
    }

    return {
      results: results,
      order: t.order,
      cycle: t.cycle,
      errors: errors,
      validCount: validCount,
      total: nodes.length,
      targetNode: targetNode,
      target: target,
      complete: !!(target && target.state === 'complete')
    };
  }

  function info(kind) { return MODULES[kind] || { label: kind, kindLabel: kind, ports: { inputs: [], outputs: [] }, help: '' }; }

  window.RSL.MODULES = MODULES;
  window.RSL.Engine = { modules: MODULES, info: info, evaluate: evaluate, topo: topo, getAxiom: getAxiom, getLevelTheorem: getLevelTheorem, getArchive: getArchive };
})();

