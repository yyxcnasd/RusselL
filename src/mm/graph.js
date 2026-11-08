/*!
 * 公理板 / AXIOM BOARD — RSL.MM.Graph
 *
 * 把一条 set.mm 证明变成**和普通关卡同一套可视化**的接线图：
 *   - 前提节点（mmhyp）：本关自带的 $f/$e 假设；
 *   - 步骤节点（mmstep）：套用一条断言，输入端口数 = 该断言的 mandatory 数量，
 *     接好全部前提后输出代入后的结论（token 公式）；
 *   - 目标焊盘（target）：接上结论即通关。
 *
 * 求值语义与 src/mm/verify.js 完全一致（按 mandatory 全量弹栈、$f 绑定、$e 逐 token
 * 比对、basic DV）。这里只负责「图」这一层：端口取上游公式、按拓扑序算节点、给提示布局。
 *
 * 经典脚本（window.RSL.MM.Graph）+ CommonJS 双导出；不求值 DOM。
 */
(function (host) {
  'use strict';

  host.RSL = host.RSL || {};
  host.RSL.MM = host.RSL.MM || {};

  var Expr = host.RSL.MM.Expr;
  if (!Expr && typeof require === 'function') {
    try { Expr = require('./expr.js'); } catch (e) { Expr = null; }
  }
  var Verify = host.RSL.MM.Verify;
  if (!Verify && typeof require === 'function') {
    try { Verify = require('./verify.js'); } catch (e) { Verify = null; }
  }
  if (!Expr) throw new Error('RSL.MM.Graph 需要先加载 RSL.MM.Expr');
  if (!Verify) throw new Error('RSL.MM.Graph 需要先加载 RSL.MM.Verify');

  /* 布局网格：一列一个证明深度，一行一个节点。 */
  var COL_W = 260;
  var ROW_H = 168;
  var PAD = 40;
  var HYPS_PER_COL = 6;

  function frameOf(proof, label) {
    if (!proof) return null;
    if (proof.frames && proof.frames[label]) return proof.frames[label];
    var mand = proof.mandatory || [];
    for (var i = 0; i < mand.length; i += 1) if (mand[i].label === label) return mand[i];
    /* $a 公理目标：证明是空的，它自己的 frame 由 mandatory + 结论合成。 */
    if (proof.kind === '$a' && label === proof.label) {
      return {
        label: proof.label,
        kind: '$a',
        math: proof.conclusion,
        mandatory: mand,
        dv: proof.dv || []
      };
    }
    return null;
  }

  function isHypFrame(frame) {
    return !!(frame && (frame.kind === '$f' || frame.kind === '$e'));
  }

  function arityOf(proof, label) {
    var frame = frameOf(proof, label);
    return frame && frame.mandatory ? frame.mandatory.length : 0;
  }

  /** 本关真正用得到的前提 label：mandatory 假设 + 证明里引用到的假元假设。 */
  function hypLabels(proof) {
    var out = [];
    var seen = {};
    function add(label) {
      if (!label || seen[label]) return;
      var frame = frameOf(proof, label);
      if (!isHypFrame(frame)) return;
      seen[label] = true;
      out.push({ label: label, kind: frame.kind, math: frame.math });
    }
    (proof.mandatory || []).forEach(function (h) { add(h.label); });
    Object.keys(proof.frames || {}).forEach(function (label) { add(label); });
    return out;
  }

  /** 本关可用的步骤（断言）清单：首次出现的顺序，去重。 */
  function palette(proof) {
    var seen = {};
    var out = [];
    if (proof.kind === '$a' && !(proof.steps || []).length) {
      return [{
        key: 'mmstep:' + proof.label,
        kind: 'mmstep',
        symbol: proof.label,
        name: 'set.mm ' + proof.label + ' · 公理图式，需要 ' + arityOf(proof, proof.label) + ' 个前提',
        config: { label: proof.label, arity: arityOf(proof, proof.label) }
      }];
    }
    (proof.steps || []).forEach(function (step) {
      if (step.kind !== 'assert' || seen[step.label]) return;
      seen[step.label] = true;
      var frame = frameOf(proof, step.label);
      if (!frame || isHypFrame(frame)) return;
      out.push({
        key: 'mmstep:' + step.label,
        kind: 'mmstep',
        symbol: step.label,
        name: 'set.mm ' + step.label + ' · 需要 ' + arityOf(proof, step.label) + ' 个前提',
        config: { label: step.label, arity: arityOf(proof, step.label) }
      });
    });
    return out;
  }

  /** 参考证明的动作序列（与 Verify.referenceActions 同构，但带上 step id）。 */
  function plan(proof) {
    if (proof.kind === '$a' && !(proof.steps || []).length) {
      var hyps = proof.mandatory || [];
      var acts = hyps.map(function (h, i) {
        return { stepId: 'ax_h_' + i, kind: 'hyp', label: h.label, inputs: [] };
      });
      acts.push({
        stepId: 'ax_step',
        kind: 'assert',
        label: proof.label,
        inputs: acts.map(function (a) { return a.stepId; })
      });
      return acts;
    }
    return (proof.steps || []).map(function (step) {
      return {
        stepId: step.id,
        kind: step.kind === 'hyp' ? 'hyp' : 'assert',
        label: step.label,
        inputs: (step.inputs || []).slice()
      };
    });
  }

  /** 步骤/前提/目标在参考电路里的位置（按深度分列、同列按产生顺序分行）。 */
  function layout(proof) {
    var steps = proof.steps || [];
    if (!steps.length) {
      var axHyps = hypLabels(proof);
      var hypPos = {};
      axHyps.forEach(function (h, i) {
        hypPos[h.label] = { x: PAD, y: PAD + i * ROW_H };
      });
      return {
        positions: { ax_step: { x: PAD + COL_W, y: PAD } },
        hypPos: hypPos,
        target: { x: PAD + 2 * COL_W, y: PAD },
        columns: 2,
        width: PAD * 2 + 4 * COL_W,
        height: PAD * 2 + Math.max(1, axHyps.length) * ROW_H
      };
    }
    var byId = {};
    steps.forEach(function (s) { byId[s.id] = s; });
    var depth = {};
    var visiting = {};
    function depthOf(id) {
      if (depth[id] !== undefined) return depth[id];
      if (visiting[id]) return 0;
      visiting[id] = true;
      var s = byId[id];
      var d = 0;
      if (s && s.kind === 'assert') {
        (s.inputs || []).forEach(function (i) { d = Math.max(d, depthOf(i) + 1); });
      }
      visiting[id] = false;
      depth[id] = d;
      return d;
    }
    steps.forEach(function (s) { depthOf(s.id); });

    var colRow = {};
    var maxDepth = 0;
    var positions = {};
    steps.forEach(function (s) {
      var col = depth[s.id] || 0;
      if (col > maxDepth) maxDepth = col;
      var row = colRow[col] || 0;
      colRow[col] = row + 1;
      positions[s.id] = { x: PAD + (col + 1) * COL_W, y: PAD + row * ROW_H };
    });

    var hyps = hypLabels(proof);
    var hypPos = {};
    hyps.forEach(function (h, i) {
      hypPos[h.label] = {
        x: PAD + Math.floor(i / HYPS_PER_COL) * COL_W,
        y: PAD + (i % HYPS_PER_COL) * ROW_H
      };
    });

    return {
      positions: positions,
      hypPos: hypPos,
      target: { x: PAD + (maxDepth + 2) * COL_W, y: PAD },
      columns: maxDepth + 1,
      width: PAD * 2 + (maxDepth + 3) * COL_W,
      height: PAD * 2 + Math.max(colRow[0] || 1, colRow[1] || 1) * ROW_H
    };
  }

  function hypNodeId(label) { return 'h_' + label; }
  function stepNodeId(stepId) { return 'n_' + stepId; }

  /** 载入关卡时的初始图：目标焊盘 + 全部前提节点（给定输入）。 */
  function initial(level, proof) {
    var lay = layout(proof);
    var nodes = [{
      id: 'target', kind: 'target',
      x: lay.target.x, y: lay.target.y,
      target: Array.isArray(level && level.targetTokens) ? level.targetTokens.join(' ') : '',
      config: {}
    }];
    hypLabels(proof).forEach(function (h) {
      var pos = lay.hypPos[h.label] || { x: PAD, y: PAD };
      nodes.push({
        id: hypNodeId(h.label), kind: 'mmhyp', x: pos.x, y: pos.y,
        config: { label: h.label }
      });
    });
    return { nodes: nodes, edges: [], layout: lay };
  }

  /* =========================================================================
   * 求值：与 Engine.evaluate 同形的结果，但节点公式是 token 串
   * ========================================================================= */

  function incomingMap(edges) {
    var map = {};
    (edges || []).forEach(function (e) {
      if (!e || !e.to || !e.from) return;
      map[e.to.node + ':' + e.to.port] = e.from.node;
    });
    return map;
  }

  function topo(nodes, edges) {
    var byId = {};
    nodes.forEach(function (n) { byId[n.id] = n; });
    var out = {};
    var indeg = {};
    nodes.forEach(function (n) { indeg[n.id] = 0; });
    (edges || []).forEach(function (e) {
      if (!e.from || !e.to || !byId[e.from.node] || !byId[e.to.node]) return;
      (out[e.from.node] = out[e.from.node] || []).push(e.to.node);
      indeg[e.to.node] += 1;
    });
    var q = nodes.filter(function (n) { return indeg[n.id] === 0; }).map(function (n) { return n.id; });
    var order = [];
    while (q.length) {
      var id = q.shift();
      order.push(id);
      (out[id] || []).forEach(function (t) {
        indeg[t] -= 1;
        if (indeg[t] === 0) q.push(t);
      });
    }
    var cycle = nodes.filter(function (n) { return order.indexOf(n.id) === -1; }).map(function (n) { return n.id; });
    return { order: order, cycle: cycle };
  }

  function result(node, tokens, state, error, note) {
    return {
      nodeId: node.id,
      tokens: tokens || null,
      ast: null,
      state: state,
      error: error || null,
      note: note || ''
    };
  }

  function dvPairs(frame) {
    var active = {};
    (frame.mandatory || []).forEach(function (h) { if (h.kind === '$f' && h.var) active[h.var] = true; });
    return (frame.dv || []).filter(function (pair) { return active[pair[0]] && active[pair[1]]; });
  }

  function evaluateNode(level, proof, node, incoming, results) {
    var cfg = node.config || {};
    if (node.kind === 'mmhyp') {
      var hyp = frameOf(proof, cfg.label);
      if (!isHypFrame(hyp)) return result(node, null, 'error', '找不到前提 ' + cfg.label);
      return result(node, hyp.math.slice(), 'valid', null, hyp.label);
    }
    if (node.kind === 'mmstep') {
      var frame = frameOf(proof, cfg.label);
      if (!frame || isHypFrame(frame)) return result(node, null, 'error', '找不到断言 ' + cfg.label);
      var arity = (frame.mandatory || []).length;
      var inputs = [];
      for (var i = 1; i <= arity; i += 1) {
        var srcId = incoming[node.id + ':e' + i];
        var src = srcId ? results[srcId] : null;
        if (!src || !src.tokens) return result(node, null, 'idle', null, '等待第 ' + i + ' 个前提');
        inputs.push(src.tokens);
      }
      var res = Expr.applyAssertion(frame, inputs);
      if (!res.ok) return result(node, null, 'error', cfg.label + '：' + res.error, res.error);
      var dv = Expr.checkDv(dvPairs(frame), res.sub, proof.vars);
      if (!dv.ok) return result(node, null, 'error', cfg.label + '：' + dv.errors.join('；'), dv.errors.join('；'));
      return result(node, res.conclusion, 'valid', null, cfg.label);
    }
    if (node.kind === 'target') {
      var upId = incoming[node.id + ':proof'];
      var up = upId ? results[upId] : null;
      var targetTokens = level && Array.isArray(level.targetTokens) ? level.targetTokens : (proof ? proof.conclusion : null);
      if (!up || !up.tokens) return result(node, null, 'idle', null, '等待结论');
      if (Expr.key(up.tokens) === Expr.key(targetTokens)) {
        return result(node, up.tokens, 'complete', null, '目标达成');
      }
      return result(node, up.tokens, 'error',
        '输出 [ ' + Expr.toASCII(up.tokens) + ' ] 与目标 [ ' + Expr.toASCII(targetTokens) + ' ] 不一致', '与目标不一致');
    }
    return result(node, null, 'error', '未知模块类型：' + node.kind);
  }

  function evaluate(level, proof, nodes, edges) {
    nodes = nodes || [];
    edges = edges || [];
    var byId = {};
    nodes.forEach(function (n) { byId[n.id] = n; });
    var incoming = incomingMap(edges);
    var t = topo(nodes, edges);
    var results = {};
    var errors = [];
    t.cycle.forEach(function (id) {
      results[id] = result({ id: id }, null, 'error', '检测到回路：电路不能闭环');
      errors.push({ nodeId: id, message: results[id].error });
    });
    t.order.forEach(function (id) {
      var node = byId[id];
      if (!node) return;
      var r = evaluateNode(level, proof, node, incoming, results);
      results[id] = r;
      if (r.state === 'error') errors.push({ nodeId: id, message: r.error });
    });
    var validCount = 0;
    nodes.forEach(function (n) { if (results[n.id] && results[n.id].state === 'valid') validCount += 1; });
    var targetNode = nodes.filter(function (n) { return n.kind === 'target'; })[0] || null;
    var target = targetNode ? results[targetNode.id] : null;
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

  var API = {
    COL_W: COL_W,
    ROW_H: ROW_H,
    frameOf: frameOf,
    arityOf: arityOf,
    hypLabels: hypLabels,
    palette: palette,
    plan: plan,
    layout: layout,
    initial: initial,
    hypNodeId: hypNodeId,
    stepNodeId: stepNodeId,
    evaluate: evaluate,
    topo: topo
  };

  host.RSL.MM.Graph = API;
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
