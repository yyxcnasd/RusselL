/* 公理板 — 唯一的电路求值器。
 *
 * 模块元数据与 apply 都在 src/modules.js（唯一注册表）；这里只做：
 *   topo → 按端口取上游 token → modules.apply → { results, errors, target, complete }
 * 公式一律是 RSL.Term token 数组；普通关与重放关走同一条路径（ctx.proof 只给
 * mm 模块提供 frame 数据）。
 */
(function (host) {
  'use strict';
  host.RSL = host.RSL || {};

  var T = host.RSL.Term;
  if (!T && typeof require === 'function') {
    try { T = require('./term.js'); } catch (e) { T = null; }
  }
  var M = host.RSL.Modules;
  if (!M && typeof require === 'function') {
    try { M = require('./modules.js'); } catch (e) { M = null; }
  }
  if (!T || !M) throw new Error('RSL.Engine 需要先加载 RSL.Term 与 RSL.Modules');

  function incomingMap(edges) {
    var map = {};
    (edges || []).forEach(function (e) {
      if (e && e.to && e.from) map[e.to.node + ':' + e.to.port] = e.from.node;
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

  function makeResult(node, tokens, state, error, note, meta) {
    return {
      nodeId: node.id,
      tokens: tokens || null,
      state: state,
      error: error || null,
      note: note || '',
      meta: meta || {}
    };
  }

  function getInputs(node, incoming, results) {
    var info = M.info(node.kind);
    var out = {};
    (info.ports.inputs || []).forEach(function (p) {
      var srcId = incoming[node.id + ':' + p.id];
      var upstream = srcId ? results[srcId] : null;
      out[p.id] = upstream && upstream.tokens ? upstream.tokens : null;
    });
    return out;
  }

  function targetTokensOf(node, level) {
    if (Array.isArray(node.targetTokens) && node.targetTokens.length) return node.targetTokens;
    if (node.target && typeof node.target === 'string') {
      try { return T.parse(node.target); } catch (e) { /* 不是游戏公式文本，继续用关卡目标 */ }
    }
    if (level && Array.isArray(level.targetTokens)) return level.targetTokens;
    return null;
  }

  function evaluateNode(node, incoming, results, ctx, level) {
    if (node.kind === 'target') {
      var upstreamId = incoming[node.id + ':proof'];
      var up = upstreamId ? results[upstreamId] : null;
      if (!up || !up.tokens) return makeResult(node, null, 'open', null, '等待最终断言');
      var target = targetTokensOf(node, level);
      if (!target) return makeResult(node, null, 'error', '目标公式无法解析');
      if (!T.eq(up.tokens, target)) {
        return makeResult(node, null, 'error',
          '输出与目标断言不一致（输出 [ ' + T.fmt(up.tokens) + ' ] / 目标 [ ' + T.fmt(target) + ' ]）');
      }
      return makeResult(node, up.tokens, 'complete', null, '目标已接驳');
    }
    var inputs = getInputs(node, incoming, results);
    try {
      var res = M.apply(node.kind, inputs, node.config, ctx || {});
      return makeResult(node, res && res.tokens, 'valid', null, res && res.note, res && res.meta);
    } catch (err) {
      var msg = err && err.message ? err.message : String(err);
      /* 模块用「等待…」表达缺输入：这是 idle，不是错误。 */
      if (/^等待/.test(msg)) return makeResult(node, null, 'idle', null, msg);
      return makeResult(node, null, 'error', msg, msg);
    }
  }

  /**
   * evaluate(level, nodes, edges, ctx?)
   * ctx = { proof }：重放关传入自包含证明，mmhyp/mmstep 用它取 frame。
   */
  function evaluate(level, nodes, edges, ctx) {
    nodes = nodes || [];
    edges = edges || [];
    var byId = {};
    nodes.forEach(function (n) { byId[n.id] = n; });
    var incoming = incomingMap(edges);
    var t = topo(nodes, edges);
    var results = {};
    var errors = [];
    t.cycle.forEach(function (id) {
      results[id] = makeResult({ id: id, kind: 'unknown' }, null, 'error', '检测到回路：电路不能闭环');
      errors.push({ nodeId: id, message: results[id].error });
    });
    t.order.forEach(function (id) {
      var node = byId[id];
      if (!node) return;
      var r = evaluateNode(node, incoming, results, ctx, level);
      results[id] = r;
      if (r.state === 'error') errors.push({ nodeId: id, message: r.error });
    });
    var validCount = 0;
    nodes.forEach(function (n) { if (results[n.id] && results[n.id].state === 'valid') validCount += 1; });
    var targetNode = nodes.filter(function (n) { return n.kind === 'target'; })[0] || null;
    var target = targetNode ? results[targetNode.id] : null;

    /* 反作弊：目标上游必须真的产生断言（公理/定理/档案/规则/mmstep），
       不能只用构造模块拼出目标公式。construct 标记在模块注册表里。 */
    if (target && target.state === 'complete') {
      var seen = {};
      var queue = [targetNode.id];
      var hasSource = false;
      var usedKinds = {};
      var incomingList = {};
      edges.forEach(function (e) {
        if (!e.to || !e.from) return;
        (incomingList[e.to.node] = incomingList[e.to.node] || []).push(e);
      });
      while (queue.length) {
        var id = queue.shift();
        if (seen[id]) continue;
        seen[id] = true;
        var nd = byId[id];
        if (nd) {
          usedKinds[nd.kind] = true;
          if (nd.kind !== 'target' && !M.isConstruct(nd.kind)) hasSource = true;
        }
        (incomingList[id] || []).forEach(function (e) {
          if (!seen[e.from.node]) queue.push(e.from.node);
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
      vars: (ctx && ctx.proof && ctx.proof.vars) || null,
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

  function info(kind) { return M.info(kind); }

  host.RSL.MODULES = M.MODULES;
  host.RSL.Engine = {
    modules: M.MODULES,
    info: info,
    evaluate: evaluate,
    topo: topo,
    getAxiom: M.getAxiom,
    getLevelTheorem: M.getLevelTheorem,
    getArchive: M.getArchive,
    resetCache: M.resetCache
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = host.RSL.Engine;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
