'use strict';
/*!
 * set.mm 证明 DAG → 公理板证明项（作者侧翻译层）
 *
 * 输入：`campaign/mm/proofs/<label>.json`（scripts/mm-import.js 从 set.mm 重放导出的自包含
 * 证明 DAG；steps 带 label/inputs/subst/conclusion，frames 带 mandatory）。
 * 输出：`campaign/proof.js` 那套证明项，交给 scripts/build-campaign2.js 编译成棋盘电路。
 *
 * 映射（只用我们的原始规则，不额外引入公理）：
 *   语法构造 wi/wn/wa/wo/wb/wal/wex/weq/wel… → 不生成节点（公式由构造电路搭）
 *   ax-1 / ax-2 / ax-3   → axiom A1 / A2 / A3
 *   ax-mp                → mp
 *   ax-gen               → gen（输入 ⊢ 断言）
 *   ax-4（∀ 分配）       → axiom A5（带 v）
 *   ax-5（φ→∀xφ）        → shift（带 v，引擎检查 x∉φ）
 *   课程里的更早**闭公式**关卡 → theorem{code} + 代入
 *   推理式（带 $e 前提的 set.mm 引理）→ 内联，$e 前提接调用点的 ⊢ 输入
 *
 * 变量规范：每关按目标公式出现顺序把 wff 变元映射成 P/Q/R/S/T/U/V、setvar 映射成
 * x/y/z/u/v/w；证明项里一切代入都按这套规范名进行。
 */
'use strict';

const OUR_ATOMS = ['P', 'Q', 'R', 'S', 'T', 'U', 'V'];
const OUR_VARS = ['x', 'y', 'z', 'u', 'v', 'w'];
const WFF_VARS = ['ph', 'ps', 'ch', 'th', 'ta', 'et', 'ze'];
const CONSTS = ['(', ')', '-.', '->', '/\\', '\\/', '<->', 'A.', 'E.', '=', 'e.'];
const SYNTAX = new Set(['wi', 'wn', 'wa', 'wo', 'wb', 'wal', 'wex', 'weq', 'wel', 'wsbc', 'wcel', 'wceq',
  'wtru', 'wfal', 'wnf', 'w3a', 'w3o', 'cv', 'csb', 'c0', 'cvv', 'cvv', 'cuni', 'cpw', 'csn', 'cpr', 'cop']);
const SETVAR_RE = /^[a-z]$/;

function isWffVar(t) { return WFF_VARS.indexOf(t) >= 0; }

function canonicalMap(dag) {
  const wff = Object.create(null);
  const vars = Object.create(null);
  let wi = 0;
  let vi = 0;
  const targetWff = new Set();
  const targetVars = new Set();
  (dag.conclusion || []).forEach((t) => {
    if (isWffVar(t)) targetWff.add(t);
    else if (SETVAR_RE.test(t)) targetVars.add(t);
  });
  const assign = (t) => {
    if (isWffVar(t)) {
      if (!wff[t]) { wff[t] = OUR_ATOMS[wi]; wi += 1; }
      return;
    }
    if (['wff', 'setvar', '|-', 'class'].indexOf(t) >= 0) return;
    if (SETVAR_RE.test(t)) {
      if (!vars[t]) { vars[t] = OUR_VARS[vi]; vi += 1; }
    }
  };
  (dag.conclusion || []).forEach(assign);
  (dag.mandatory || []).forEach((h) => (h.math || []).forEach(assign));
  (dag.steps || []).forEach((s) => (s.conclusion || []).forEach(assign));
  return { wff, vars, targetWff, targetVars };
}

function makeTranslator(dag, sigma, ctx, hypTerms) {
  /* ctx: { labels: Map(label → {code, sigmaCanon}), loadDag(label), inlined: [] } */
  const frames = dag.frames || {};
  const mandatory = dag.mandatory || [];
  const stepById = new Map(dag.steps.map((s) => [s.id, s]));
  const memo = new Map();

  function err(msg) { throw new Error(msg); }

  function tokens(list, sig) {
    sig = sig || sigma;
    const out = [];
    for (const t of list) {
      if (isWffVar(t)) {
        const mapped = sig.wff[t];
        if (!mapped) err('未映射的 wff 变元 ' + t);
        for (const x of mapped) out.push(x);
        continue;
      }
      if (sig.vars[t]) { out.push(sig.vars[t]); continue; }
      if (CONSTS.indexOf(t) >= 0) { out.push(t); continue; }
      if (SETVAR_RE.test(t)) { out.push(t); continue; }
      err('无法翻译的 token：' + t);
    }
    return out;
  }

  function compose(subst) {
    const out = { wff: Object.create(null), vars: Object.create(null) };
    for (const name of Object.keys(subst || {})) {
      const value = subst[name];
      if (isWffVar(name)) out.wff[name] = tokens(value, sigma);
      else out.vars[name] = tokens(value, sigma)[0];
    }
    return out;
  }

  function sigmaForLevel(label, comp) {
    const info = ctx.labels.get(label);
    const canon = info.sigmaCanon;
    const out = { wff: Object.create(null), vars: Object.create(null) };
    for (const name of Object.keys(canon.wff)) {
      if (!canon.targetWff.has(name)) continue;
      if (!comp.wff[name]) err('关卡 ' + label + ' 的 wff 变元 ' + name + ' 没有代入');
      out.wff[canon.wff[name]] = comp.wff[name];
    }
    for (const name of Object.keys(canon.vars)) {
      if (!canon.targetVars.has(name)) continue;
      out.vars[canon.vars[name]] = comp.vars[name] || name;
    }
    return out;
  }

  function isClosed(label) {
    const f = frames[label];
    if (!f) return false;
    return (f.mandatory || []).every((h) => h.kind === '$f');
  }

  /* 内联：把子证明的 $e 前提接到调用点的 ⊢ 输入上 */
  function inline(label, step, comp) {
    const childDag = ctx.loadDag(label);
    if (!childDag) err('引用了课程外、也没有证明数据的引理：' + label);
    const childMand = childDag.mandatory || [];
    const assertInputs = (step.inputs || [])
      .map((id) => stepById.get(id))
      .filter((s) => s && s.conclusion && s.conclusion[0] === '|-');
    const childHypTerms = [];
    let cursor = 0;
    childMand.forEach((h) => {
      if (h.kind === '$e') {
        const src = assertInputs[cursor];
        cursor += 1;
        childHypTerms.push(src ? termOf(src) : null);
      } else {
        childHypTerms.push(null);
      }
    });
    const child = makeTranslator(childDag, comp, ctx, childHypTerms);
    ctx.inlined.push(label);
    return child.translate();
  }

  function termOf(step) {
    if (memo.has(step.id)) return memo.get(step.id);
    let result;
    if (step.kind === 'hyp') {
      const hi = step.hypIndex;
      if (typeof hi === 'number' && hi >= 0) {
        const h = mandatory[hi];
        if (h && h.kind === '$e') {
          const t = hypTerms[hi];
          if (!t) err('$e 前提 ' + h.label + ' 缺少调用点输入');
          result = t;
        } else {
          err('$f 假设不应被当作断言使用：' + step.label);
        }
      } else {
        err('假元假设不支持：' + step.label);
      }
    } else {
      const label = step.label;
      const comp = compose(step.subst);
      const asserts = (step.inputs || [])
        .map((id) => stepById.get(id))
        .filter((s) => s && s.conclusion && s.conclusion[0] === '|-');
      switch (label) {
        case 'ax-1': result = { op: 'axiom', schema: 'A1', atoms: { P: comp.wff.ph, Q: comp.wff.ps } }; break;
        case 'ax-2': result = { op: 'axiom', schema: 'A2', atoms: { P: comp.wff.ph, Q: comp.wff.ps, R: comp.wff.ch } }; break;
        case 'ax-3': result = { op: 'axiom', schema: 'A3', atoms: { P: comp.wff.ph, Q: comp.wff.ps } }; break;
        case 'ax-4': result = { op: 'axiom', schema: 'A5', v: comp.vars.x, atoms: { P: comp.wff.ph, Q: comp.wff.ps } }; break;
        case 'ax-5': result = { op: 'shift', formula: comp.wff.ph, v: comp.vars.x }; break;
        case 'ax-gen':
          if (!asserts.length) err('ax-gen 缺少 ⊢ 输入');
          result = { op: 'gen', of: termOf(asserts[0]), v: comp.vars.x };
          break;
        case 'ax-mp':
          if (asserts.length < 2) err('ax-mp 缺少两个 ⊢ 输入');
          result = { op: 'mp', a: termOf(asserts[0]), b: termOf(asserts[1]) };
          break;
        default: {
          const info = ctx.labels.get(label);
          if (info && isClosed(label)) {
            result = { op: 'lemma', code: info.code, atoms: {}, vars: {} };
            const sub = sigmaForLevel(label, comp);
            Object.keys(sub.wff).forEach((name) => { result.atoms[name] = sub.wff[name]; });
            Object.keys(sub.vars).forEach((name) => {
              if (name !== sub.vars[name]) result.vars[name] = sub.vars[name];
            });
            if (!Object.keys(result.vars).length) delete result.vars;
            break;
          }
          if (SYNTAX.has(label)) err('语法步骤不应产出 ⊢：' + label);
          result = inline(label, step, comp);
          break;
        }
      }
    }
    memo.set(step.id, result);
    return result;
  }

  function translate() {
    if (!dag.finalStep) err('证明 DAG 没有 finalStep');
    const step = stepById.get(dag.finalStep);
    if (!step) err('找不到 finalStep ' + dag.finalStep);
    return termOf(step);
  }

  return { translate, tokens };
}

function translateLevel(dag, ctx) {
  const sigmaCanon = canonicalMap(dag);
  const tr = makeTranslator(dag, sigmaCanon, ctx, []);
  return { target: tr.tokens(dag.conclusion.slice(1)), proof: tr.translate(), sigmaCanon };
}

module.exports = { translateLevel, canonicalMap, makeTranslator, OUR_ATOMS, OUR_VARS, SYNTAX };
