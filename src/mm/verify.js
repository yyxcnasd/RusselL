/*!
 * 公理板 / AXIOM BOARD — RSL.MM.Verify
 *
 * set.mm 压缩证明重放 + 证明 DAG 校验。
 *
 * 压缩证明编码（Metamath 规范）：
 *   证明 = '(' label… ')' 编码串
 *   H = mandatory 假设数量，L = label 数量，base = H + L
 *   每个「步」是一个数：
 *     n <  H     → mandatory[n] 假设步骤（$f / $e 都在证明栈上占一位）
 *     H ≤ n < base → label[n-H] 断言步骤
 *     n ≥ base    → 之前用 Z 保存的栈条目
 *   断言步骤弹出 mandatory.length 个公式（**包括 $f**），按 mandatory 顺序匹配；
 *   $f 用「类型码 + 变元」绑定，$e 用已确定的替换式逐 token 比对；
 *   替换后把断言结论压回栈。结束栈高必须为 1，且等于断言的结论。
 *
 * 本模块只做这一层，不做类抽象/语法糖；DV 只做 basic 覆盖（见 docs/MM-REPLAY.md）。
 * 经典脚本（window.RSL.MM.Verify）+ CommonJS 双导出。
 */
(function (host) {
  'use strict';

  host.RSL = host.RSL || {};
  host.RSL.MM = host.RSL.MM || {};

  var Expr = host.RSL.MM.Expr;
  if (!Expr && typeof require === 'function') {
    try { Expr = require('./expr.js'); } catch (e) { Expr = null; }
  }
  if (!Expr) throw new Error('RSL.MM.Verify 需要先加载 RSL.MM.Expr（src/mm/expr.js）');

  var key = Expr.key;

  /**
   * 断言「强制 DV」条件：只有两个变元都出现在断言 mandatory 假设里的 $d 对才是
   * 应用该断言时必须满足的条件；涉及假元变量（dummy variable，如证明里临时引入
   * 的 x、v、w）的 $d 对在套用时会被忽略。这是 Metamath 的语义，不是放宽检查。
   */
  function mandatoryDv(frame) {
    var active = {};
    var mand = frame.mandatory || [];
    for (var i = 0; i < mand.length; i += 1) {
      if (mand[i].kind === '$f' && mand[i].var) active[mand[i].var] = true;
    }
    return (frame.dv || []).filter(function (pair) {
      return active[pair[0]] && active[pair[1]];
    });
  }

  function err(errors, msg) {
    errors.push(msg);
    return errors;
  }

  /* 拆出 label 列表与编码串（兼容未压缩证明：直接是 label 序列）。 */
  function splitProof(proofTokens) {
    var labels = [];
    var tokens = proofTokens || [];
    if (tokens.length && tokens[0] === '(') {
      var i = 1;
      while (i < tokens.length && tokens[i] !== ')') {
        labels.push(tokens[i]);
        i += 1;
      }
      if (i >= tokens.length) return { ok: false, error: 'label list not closed' };
      return { ok: true, compressed: true, labels: labels, encoded: tokens.slice(i + 1).join('') };
    }
    /* 未压缩：每个 token 都是一个 label 步骤，按出现顺序压栈。 */
    return { ok: true, compressed: false, labels: tokens.slice(), encoded: '' };
  }

  function nextNumber(encoded, pos) {
    var acc = 0;
    var j = pos;
    while (j < encoded.length && encoded[j] >= 'U' && encoded[j] <= 'Y') {
      acc = acc * 5 + (encoded.charCodeAt(j) - 85 + 1);
      j += 1;
    }
    if (j >= encoded.length) return { error: 'truncated number' };
    var d = encoded.charCodeAt(j) - 65;
    if (d < 0 || d > 19) return { error: 'bad digit ' + JSON.stringify(encoded[j]) + ' at ' + j };
    return { value: acc * 20 + d, next: j + 1 };
  }

  /* =========================================================================
   * 重放：压缩证明 → 步骤数组（DAG 边 = inputs）
   * ========================================================================= */

  /**
   * replay(assertion, frameOf, options)
   *   assertion = { label, kind, math, mandatory, dv, proofTokens }
   *   frameOf(label) -> frame | null     未知 label 必须让重放失败
   *   options = { vars, maxSteps }
   * 返回 { ok, errors, steps, finalStep, conclusion, stats, trivial }
   */
  function replay(assertion, frameOf, options) {
    var opts = options || {};
    var errors = [];
    var steps = [];
    var stack = [];   // { formula, id }
    var saved = [];   // 栈条目快照（Z 保存）
    var mand = (assertion && assertion.mandatory) || [];
    var dvAll = [];
    var refs = [];

    if (!assertion || !Array.isArray(assertion.math)) {
      return { ok: false, errors: ['assertion 缺少 math'], steps: [], finalStep: null };
    }
    if (!assertion.proofTokens || !assertion.proofTokens.length) {
      /* 公理（$a）：没有证明可重放，结论就是断言本身。 */
      return {
        ok: true, errors: [], steps: [], finalStep: null, trivial: true,
        conclusion: assertion.math.slice(),
        stats: { steps: 0, asserts: 0, hyps: 0, maxDepth: 0, refs: [], tokens: assertion.math.length }
      };
    }

    var split = splitProof(assertion.proofTokens);
    if (!split.ok) return { ok: false, errors: [split.error], steps: [], finalStep: null };

    var H = mand.length;
    var L = split.labels.length;
    var base = H + L;
    var counter = 0;
    var lastEntry = null;
    var maxSteps = opts.maxSteps || 200000;

    function addStep(step) {
      counter += 1;
      step.id = 's' + counter;
      steps.push(step);
      return step;
    }

    function pushHyp(index, label) {
      var h = mand[index];
      var step = addStep({
        label: label || h.label,
        kind: 'hyp',
        hypIndex: index,
        inputs: [],
        subst: {},
        conclusion: h.math.slice(),
        stackDepth: stack.length + 1
      });
      stack.push({ formula: h.math, id: step.id });
      lastEntry = { formula: h.math, id: step.id };
      return true;
    }

    function apply(frame, label) {
      var n = (frame.mandatory || []).length;
      if (stack.length < n) {
        err(errors, 'stack underflow at step ' + (steps.length + 1) + ' (label ' + label +
          '): need ' + n + ', have ' + stack.length);
        return false;
      }
      var popped = stack.splice(stack.length - n, n);
      var actual = popped.map(function (e) { return e.formula; });
      var res = Expr.applyAssertion(frame, actual);
      if (!res.ok) {
        err(errors, 'mismatch at step ' + (steps.length + 1) + ' (label ' + label + '): ' + res.error);
        return false;
      }
      var dv = Expr.checkDv(mandatoryDv(frame), res.sub, opts.vars);
      dvAll.push(dv);
      if (!dv.ok) {
        err(errors, 'at step ' + (steps.length + 1) + ' (label ' + label + '): ' + dv.errors.join('; '));
        return false;
      }
      var step = addStep({
        label: label,
        kind: 'assert',
        inputs: popped.map(function (e) { return e.id; }),
        subst: res.sub,
        conclusion: res.conclusion,
        stackDepth: stack.length + 1
      });
      stack.push({ formula: res.conclusion, id: step.id });
      lastEntry = { formula: res.conclusion, id: step.id };
      refs.push(label);
      return true;
    }

    function applyLabel(label) {
      var frame = frameOf ? frameOf(label) : null;
      if (!frame) {
        /* label 也可能是本断言自己的假设（$f/$e）。 */
        for (var k = 0; k < mand.length; k += 1) {
          if (mand[k].label === label) return pushHyp(k, label);
        }
        err(errors, 'unknown label at step ' + (steps.length + 1) + ': ' + label);
        return false;
      }
      if (frame.kind === '$f' || frame.kind === '$e') {
        for (var m = 0; m < mand.length; m += 1) {
          if (mand[m].label === label) return pushHyp(m, label);
        }
        /* 引用了不在 mandatory 里的假设：按它的公式压栈（保守处理）。 */
        var step = addStep({
          label: label, kind: 'hyp', hypIndex: -1, inputs: [], subst: {},
          conclusion: frame.math.slice(), stackDepth: stack.length + 1
        });
        stack.push({ formula: frame.math, id: step.id });
        lastEntry = { formula: frame.math, id: step.id };
        return true;
      }
      if ((frame.mandatory || []).length === 0 && !frame.math) {
        err(errors, 'frame 缺少 math: ' + label);
        return false;
      }
      return apply(frame, label);
    }

    if (split.compressed) {
      var pos = 0;
      while (pos < split.encoded.length) {
        var ch = split.encoded[pos];
        if (ch === 'Z') {
          if (!lastEntry) { err(errors, 'Z with no previous step'); break; }
          saved.push(lastEntry);
          pos += 1;
          continue;
        }
        var got = nextNumber(split.encoded, pos);
        if (got.error) { err(errors, got.error); break; }
        pos = got.next;
        var num = got.value;
        if (num < H) {
          if (!pushHyp(num)) break;
        } else if (num < base) {
          if (!applyLabel(split.labels[num - H])) break;
        } else {
          var k2 = num - base;
          if (k2 < 0 || k2 >= saved.length) {
            err(errors, 'stack reference out of range: ' + num + ' (saved=' + saved.length + ')');
            break;
          }
          var entry = saved[k2];
          stack.push({ formula: entry.formula, id: entry.id });
          lastEntry = entry;
        }
        if (steps.length > maxSteps) { err(errors, 'step limit exceeded (>' + maxSteps + ')'); break; }
      }
    } else {
      for (var li = 0; li < split.labels.length; li += 1) {
        if (!applyLabel(split.labels[li])) break;
      }
    }

    if (errors.length) {
      return { ok: false, errors: errors, steps: steps, finalStep: null, conclusion: null };
    }
    if (stack.length !== 1) {
      return {
        ok: false,
        errors: ['final stack height ' + stack.length + ' != 1'],
        steps: steps,
        finalStep: null,
        conclusion: null
      };
    }
    var finalEntry = stack[0];
    if (key(finalEntry.formula) !== key(assertion.math)) {
      return {
        ok: false,
        errors: ['final formula mismatch: got [ ' + Expr.toASCII(finalEntry.formula) +
          ' ] expected [ ' + Expr.toASCII(assertion.math) + ' ]'],
        steps: steps,
        finalStep: finalEntry.id,
        conclusion: finalEntry.formula
      };
    }

    /* 剪掉从 finalStep 不可达的步骤（多由 Z 保存但未使用造成）。 */
    var pruned = prune(steps, finalEntry.id);
    var stats = statsOf(pruned, finalEntry.id, refs);
    return {
      ok: true,
      errors: [],
      steps: pruned,
      finalStep: finalEntry.id,
      conclusion: finalEntry.formula,
      stats: stats,
      trivial: false,
      dvChecked: dvAll.reduce(function (n, d) { return n + d.checked; }, 0)
    };
  }

  function prune(steps, finalId) {
    var byId = {};
    steps.forEach(function (s) { byId[s.id] = s; });
    var keep = {};
    var queue = [finalId];
    while (queue.length) {
      var id = queue.pop();
      if (!id || keep[id] || !byId[id]) continue;
      keep[id] = true;
      byId[id].inputs.forEach(function (x) { queue.push(x); });
    }
    return steps.filter(function (s) { return keep[s.id]; });
  }

  function statsOf(steps, finalId, refs) {
    var byId = {};
    steps.forEach(function (s) { byId[s.id] = s; });
    var depth = {};
    function walk(id) {
      if (depth[id] !== undefined) return depth[id];
      var s = byId[id];
      if (!s) return 0;
      var d = 1;
      s.inputs.forEach(function (x) { d = Math.max(d, 1 + walk(x)); });
      depth[id] = d;
      return d;
    }
    var asserts = 0, hyps = 0, tokens = 0;
    steps.forEach(function (s) {
      if (s.kind === 'assert') asserts += 1; else hyps += 1;
      tokens += s.conclusion.length;
    });
    var uniq = [];
    refs.forEach(function (r) { if (uniq.indexOf(r) < 0) uniq.push(r); });
    return {
      steps: steps.length,
      asserts: asserts,
      hyps: hyps,
      maxDepth: finalId ? walk(finalId) : 0,
      refs: uniq,
      tokens: tokens
    };
  }

  /* =========================================================================
   * 已保存 DAG 的离线校验
   * ========================================================================= */

  /**
   * verifyProof(proof) -> { ok, errors, checked }
   * 自包含：只依赖 proof.frames / proof.mandatory / proof.steps。
   */
  function verifyProof(proof) {
    var errors = [];
    if (!proof || !Array.isArray(proof.steps)) return { ok: false, errors: ['proof 缺少 steps'], checked: 0 };
    var mand = proof.mandatory || [];
    var byId = {};
    var checked = 0;
    for (var i = 0; i < proof.steps.length; i += 1) {
      var s = proof.steps[i];
      if (!s || typeof s.id !== 'string') { err(errors, 'step #' + (i + 1) + ' 缺少 id'); continue; }
      if (byId[s.id]) err(errors, 'duplicate step id: ' + s.id);
      if (!Array.isArray(s.conclusion) || !s.conclusion.length) {
        err(errors, 'step ' + s.id + ' 缺少 conclusion');
        continue;
      }
      if (s.kind === 'hyp') {
        var hi = s.hypIndex;
        if (typeof hi === 'number' && hi >= 0) {
          if (!mand[hi]) {
            err(errors, 'step ' + s.id + ' hypIndex 越界');
          } else if (key(mand[hi].math) !== key(s.conclusion)) {
            err(errors, 'step ' + s.id + ' 假设结论与 mandatory#' + hi + ' 不一致');
          }
          checked += 1;
        } else {
          /* 假元假设（$f 但不在 mandatory 里，例如证明里临时引入的 vt）：用 frame 校验。 */
          var hframe = (proof.frames || {})[s.label];
          if (!hframe) {
            err(errors, 'step ' + s.id + ' 缺少假设 frame: ' + s.label);
          } else if (key(hframe.math) !== key(s.conclusion)) {
            err(errors, 'step ' + s.id + ' 假设结论与 frame(' + s.label + ') 不一致');
          } else {
            checked += 1;
          }
        }
      } else {
        var frame = (proof.frames || {})[s.label];
        if (!frame) { err(errors, 'step ' + s.id + ' 缺少 frame: ' + s.label); continue; }
        var inputs = [];
        var bad = false;
        for (var k = 0; k < (s.inputs || []).length; k += 1) {
          var inp = byId[s.inputs[k]];
          if (!inp) { err(errors, 'step ' + s.id + ' 引用了不存在的步骤 ' + s.inputs[k]); bad = true; break; }
          inputs.push(inp.conclusion);
        }
        if (bad) continue;
        var res = Expr.applyAssertion(frame, inputs);
        if (!res.ok) { err(errors, 'step ' + s.id + ' (' + s.label + '): ' + res.error); continue; }
        if (key(res.conclusion) !== key(s.conclusion)) {
          err(errors, 'step ' + s.id + ' (' + s.label + '): 结论与重算结果不一致');
          continue;
        }
        var dv = Expr.checkDv(mandatoryDv(frame), res.sub, proof.vars);
        if (!dv.ok) {
          err(errors, 'step ' + s.id + ' (' + s.label + '): ' + dv.errors.join('; '));
          continue;
        }
        checked += 1;
      }
      byId[s.id] = s;
    }
    if (proof.steps.length && !proof.finalStep) {
      err(errors, '缺少 finalStep');
    } else if (proof.finalStep) {
      var fin = byId[proof.finalStep];
      if (!fin) err(errors, 'finalStep 不存在: ' + proof.finalStep);
      else if (key(fin.conclusion) !== key(proof.conclusion)) {
        err(errors, 'finalStep 结论与 proof.conclusion 不一致');
      }
    }
    return { ok: errors.length === 0, errors: errors, checked: checked };
  }

  /* =========================================================================
   * Tier 3：交互式会话（玩家自己选断言，引擎校验）
   *
   * 与 replay 共用同一套语义：栈里存完整公式（含类型码），断言按 mandatory 全量
   * 弹栈、$f 绑定变元、$e 逐 token 比对、DV basic 检查。玩家可以：
   *   - 压入本关的 $f / $e 假设（以及证明里用到的假元假设）；
   *   - 应用任意一条本关可用断言（proof.frames 里的 label）；
   *   - 撤销 / 重来 / 要提示（提示只按参考证明的前缀给下一条动作）。
   * 通关条件与 replay 相同：栈高 1 且公式等于证明结论。允许与参考证明不同的路线。
   * ========================================================================= */

  /** 参考证明的动作序列（已剪枝顺序 = 产生顺序）。 */
  function referenceActions(proof) {
    var out = [];
    ((proof && proof.steps) || []).forEach(function (s) {
      out.push({ kind: s.kind === 'hyp' ? 'hyp' : 'assert', label: s.label });
    });
    return out;
  }

  function session(proof) {
    if (!proof || !Array.isArray(proof.conclusion)) throw new Error('session 需要自包含 proof');
    var mand = proof.mandatory || [];
    var frames = proof.frames || {};
    var vars = proof.vars || {};
    var ref = referenceActions(proof);
    var stack = [];      // { form, label, kind }
    var history = [];    // { kind, label }
    var snapshots = [];  // undo 用的栈快照
    var lastError = '';

    function hypLabels() {
      var out = [];
      var seen = {};
      mand.forEach(function (h) {
        if (seen[h.label]) return;
        seen[h.label] = true;
        out.push({ label: h.label, kind: h.kind, math: h.math.slice() });
      });
      Object.keys(frames).forEach(function (label) {
        var f = frames[label];
        if (!f || (f.kind !== '$f' && f.kind !== '$e') || seen[label]) return;
        seen[label] = true;
        out.push({ label: label, kind: f.kind, math: f.math.slice() });
      });
      return out;
    }

    function hypOf(label) {
      var list = hypLabels();
      for (var i = 0; i < list.length; i += 1) if (list[i].label === label) return list[i];
      return null;
    }

    function checkApplicable(label) {
      var frame = frames[label];
      if (!frame || frame.kind === '$f' || frame.kind === '$e') return null;
      var n = (frame.mandatory || []).length;
      if (stack.length < n) {
        return { label: label, ready: false, arity: n, error: '需要 ' + n + ' 个前提，栈上只有 ' + stack.length };
      }
      var popped = stack.slice(stack.length - n);
      var res = Expr.applyAssertion(frame, popped.map(function (e) { return e.form; }));
      if (!res.ok) return { label: label, ready: false, arity: n, error: res.error };
      var dv = Expr.checkDv(mandatoryDv(frame), res.sub, vars);
      if (!dv.ok) return { label: label, ready: false, arity: n, error: dv.errors.join('; ') };
      return { label: label, ready: true, arity: n, error: '' };
    }

    function assertions() {
      var out = [];
      Object.keys(frames).forEach(function (label) {
        var c = checkApplicable(label);
        if (c) out.push(c);
      });
      out.sort(function (a, b) {
        return (b.ready ? 1 : 0) - (a.ready ? 1 : 0) || a.label.localeCompare(b.label);
      });
      return out;
    }

    function apply(label) {
      var frame = frames[label];
      if (!frame || frame.kind === '$f' || frame.kind === '$e') {
        var hyp = hypOf(label);
        if (!hyp) { lastError = '未知 label：' + label; return { ok: false, error: lastError }; }
        snapshots.push(stack.map(function (e) { return { form: e.form, label: e.label, kind: e.kind }; }));
        stack.push({ form: hyp.math.slice(), label: label, kind: 'hyp' });
        history.push({ kind: 'hyp', label: label });
        lastError = '';
        return { ok: true };
      }
      var check = checkApplicable(label);
      if (!check.ready) { lastError = label + '：' + check.error; return { ok: false, error: lastError }; }
      var n = check.arity;
      var popped = stack.slice(stack.length - n);
      var res = Expr.applyAssertion(frame, popped.map(function (e) { return e.form; }));
      snapshots.push(stack.map(function (e) { return { form: e.form, label: e.label, kind: e.kind }; }));
      stack = stack.slice(0, stack.length - n);
      stack.push({ form: res.conclusion, label: label, kind: 'assert' });
      history.push({ kind: 'assert', label: label });
      lastError = '';
      return { ok: true };
    }

    function undo() {
      if (!history.length) return false;
      history.pop();
      stack = snapshots.pop() || [];
      lastError = '';
      return true;
    }

    function reset() {
      stack = [];
      history = [];
      snapshots = [];
      lastError = '';
    }

    function solved() {
      return stack.length === 1 && key(stack[0].form) === key(proof.conclusion);
    }

    function state() {
      return {
        depth: stack.length,
        top: stack.length ? stack[stack.length - 1].form.slice() : null,
        stack: stack.map(function (e) { return { form: e.form.slice(), label: e.label, kind: e.kind }; }),
        actions: history.length,
        history: history.map(function (h) { return { kind: h.kind, label: h.label }; }),
        reference: ref.length,
        solved: solved(),
        error: lastError
      };
    }

    /** 提示：只在玩家动作与参考证明前缀一致时给下一条，避免“猜不到就误导”。 */
    function hint() {
      for (var i = 0; i < history.length; i += 1) {
        if (!ref[i] || ref[i].kind !== history[i].kind || ref[i].label !== history[i].label) {
          return { label: null, kind: null, aligned: false, reason: '与参考证明不同路线，无法给下一步提示' };
        }
      }
      if (history.length >= ref.length) return { label: null, kind: null, aligned: true, reason: '参考证明已走完' };
      return { label: ref[history.length].label, kind: ref[history.length].kind, aligned: true, reason: '' };
    }

    return {
      proof: proof,
      hypotheses: hypLabels,
      assertions: assertions,
      apply: apply,
      undo: undo,
      reset: reset,
      state: state,
      solved: solved,
      hint: hint
    };
  }

  var API = {
    splitProof: splitProof,
    replay: replay,
    verifyProof: verifyProof,
    prune: prune,
    statsOf: statsOf,
    referenceActions: referenceActions,
    session: session
  };

  host.RSL.MM.Verify = API;
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
