/*!
 * 公理板 / AXIOM BOARD — RSL.MM.Expr
 *
 * set.mm 完整公式的 token 层：完全不解析成 AST，只做 token 序列的
 * 替换 / 匹配 / 断言应用 / 显示。Metamath 的证明重放只需要这一层。
 *
 * 语义要点（不是 bug）：
 *   - 替换是「盲替换」：wff 变元换成含被约束变元的公式时，自由变元会被外层
 *     量词捕获，这是 Metamath 的直接替换语义。
 *   - $f 假设在证明栈上占一个位置：应用断言时按 mandatory 全量弹栈，$f 用
 *     「typecode + 变元」绑定变元，$e 用已确定的替换式逐 token 比对。
 *
 * 经典脚本（window.RSL.MM.Expr）+ CommonJS 双导出；纯函数、无 DOM。
 */
(function (host) {
  'use strict';

  host.RSL = host.RSL || {};
  host.RSL.MM = host.RSL.MM || {};

  /* 显示用映射：只映射真正的 Metamath 常量；变量一律原样输出。 */
  var UNI = {
    '|-': '⊢', '-.': '¬', '->': '→', '<->': '↔', '=/=': '≠',
    '/\\': '∧', '\\/': '∨', 'A.': '∀', 'E.': '∃', 'e.': '∈',
    'E!': '∃!', 'E*': '∃*', 'T.': '⊤', 'F.': '⊥',
    '_V': 'V', '(/)': '∅', 'C_': '⊆', 'C.': '⊂', '~P': '𝒫',
    'u.': '∪', 'i^i': '∩', 'U.': '⋃', '|^|': '⋂', 'X.': '×',
    '_om': 'ω', '_I': 'I', '_E': 'E', '_R': 'R', '|->': '↦',
    '<.': '⟨', '>.': '⟩', '_|_': '⊥', 'suc': 'suc', 'On': 'On',
    'dom': 'dom', 'ran': 'ran', 'cf': 'cf', 'fi': 'fi',
    'P.': 'P.', '1o': '1o', '2o': '2o', 'om': 'ω',
    /* set.mm 的 wff 变元在游戏里一律显示成希腊字母（与 docs/DESIGN.md 的公式记法一致） */
    'ph': 'φ', 'ps': 'ψ', 'ch': 'χ', 'th': 'θ', 'ta': 'τ',
    'et': 'ε', 'ze': 'ζ', 'si': 'σ', 'rh': 'ρ', 'mu': 'μ',
    'la': 'λ', 'ka': 'κ'
  };

  var ASCII = {};
  Object.keys(UNI).forEach(function (k) { ASCII[UNI[k]] = k; });

  function needTokens(tokens, label) {
    if (!Array.isArray(tokens)) throw new TypeError((label || '公式') + ' 必须是 token 数组');
    return tokens;
  }

  function toASCII(tokens) {
    return needTokens(tokens).map(function (t) { return typeof t === 'string' ? t : String(t); }).join(' ');
  }

  function toUnicode(tokens) {
    return needTokens(tokens).map(function (t) { return UNI[t] || t; }).join(' ');
  }

  /* 反向：Unicode/ASCII 混写的公式文本 → token 数组。 */
  function parse(text) {
    if (typeof text !== 'string') throw new TypeError('公式文本必须是字符串');
    var out = [];
    text.split(/\s+/).forEach(function (raw) {
      if (!raw) return;
      var t = ASCII[raw] || raw;
      out.push(t);
    });
    return out;
  }

  function key(tokens) {
    return needTokens(tokens).join('\u0000');
  }

  function eq(a, b) {
    return key(a) === key(b);
  }

  function isFormula(tokens) {
    return Array.isArray(tokens) && tokens.length > 0 && typeof tokens[0] === 'string';
  }

  /** 去掉首 token 的类型码：['wff','ph'] → ['ph']，['|-','x','=','y'] → ['x','=','y']。 */
  function stripType(tokens) {
    needTokens(tokens);
    return tokens.length <= 1 ? [] : tokens.slice(1);
  }

  /**
   * 直接替换：token 出现在 sub 里就整体换成 sub[token] 的 token 序列。
   * 不做 α 规避；这是 Metamath 的语义。
   */
  function substTokens(tokens, sub) {
    needTokens(tokens);
    if (!sub) return tokens.slice();
    var out = [];
    for (var i = 0; i < tokens.length; i += 1) {
      var t = tokens[i];
      if (Object.prototype.hasOwnProperty.call(sub, t)) {
        var rep = sub[t];
        if (!Array.isArray(rep)) throw new TypeError('替换式必须是 token 数组：' + t);
        for (var k = 0; k < rep.length; k += 1) out.push(rep[k]);
      } else {
        out.push(t);
      }
    }
    return out;
  }

  /**
   * $e 假设比对：pattern 用 sub 替换后必须与 actual 完全一致。
   * pattern 里未被 sub 绑定的 token 视为常量（frame 的 $f 一定已经绑定了全部变元）。
   */
  function matchHyp(pattern, actual, sub, where) {
    var expect = substTokens(pattern, sub);
    if (!eq(expect, actual)) {
      return {
        ok: false,
        error: 'mismatch' + (where ? ' at ' + where : '') +
          ': expected [ ' + toASCII(expect) + ' ] but got [ ' + toASCII(actual) + ' ]'
      };
    }
    return { ok: true };
  }

  /**
   * 应用断言：actualFormulas 按 mandatory 顺序给出被弹出的公式。
   * frame = { math, mandatory:[{label, kind, math, var}] }
   * 返回 { ok, conclusion, sub, error }。
   */
  function applyAssertion(frame, actualFormulas) {
    if (!frame || !Array.isArray(frame.math)) return { ok: false, error: 'frame 缺少 math' };
    var mand = frame.mandatory || [];
    var actual = actualFormulas || [];
    if (actual.length !== mand.length) {
      return {
        ok: false,
        error: 'arity mismatch: ' + (frame.label || '?') + ' wants ' + mand.length +
          ' but got ' + actual.length
      };
    }
    var sub = {};
    var i, h, a;
    /* 第一轮：$f 绑定变元（actual 的类型码必须一致）。 */
    for (i = 0; i < mand.length; i += 1) {
      h = mand[i];
      a = actual[i];
      if (!isFormula(a)) return { ok: false, error: 'operand #' + (i + 1) + ' 不是公式' };
      if (h.kind === '$f') {
        if (a[0] !== h.math[0]) {
          return {
            ok: false,
            error: 'typecode mismatch at hypothesis #' + (i + 1) + ' (' + h.label + '): ' +
              'expected ' + h.math[0] + ' but got ' + a[0]
          };
        }
        if (a.length < 2) {
          return { ok: false, error: 'empty expression for variable ' + h.var };
        }
        sub[h.var] = a.slice(1);
      }
    }
    /* 第二轮：$e 用已确定的替换式比对。 */
    for (i = 0; i < mand.length; i += 1) {
      h = mand[i];
      if (h.kind !== '$e') continue;
      var m = matchHyp(h.math, actual[i], sub, h.label ? 'hypothesis ' + h.label : 'hypothesis #' + (i + 1));
      if (!m.ok) return { ok: false, error: m.error };
    }
    return { ok: true, conclusion: substTokens(frame.math, sub), sub: sub };
  }

  /**
   * DV 基本检查：每条 $d 对 (a,b) 的替换式不得共享任何变量 token。
   * vars：可选的变量集合（判断哪些 token 算变量）；缺省时只要两式有共同
   * token 就报错，因此调用方应尽量传入 setVars/wffVars。
   * 口径：basic（只看替换式共享变量），不做完整 Metamath DV 分解。
   */
  function checkDv(dvPairs, sub, vars) {
    var errors = [];
    var checked = 0;
    (dvPairs || []).forEach(function (pair) {
      var a = pair[0], b = pair[1];
      var ea = Object.prototype.hasOwnProperty.call(sub, a) ? sub[a] : [a];
      var eb = Object.prototype.hasOwnProperty.call(sub, b) ? sub[b] : [b];
      var setB = {};
      for (var j = 0; j < eb.length; j += 1) setB[eb[j]] = true;
      for (var i = 0; i < ea.length; i += 1) {
        var t = ea[i];
        if (!setB[t]) continue;
        if (vars && !vars[t]) continue;
        errors.push('dv violation $d ' + a + ' ' + b + ' (shared variable ' + t + ')');
        break;
      }
      checked += 1;
    });
    return { ok: errors.length === 0, errors: errors, checked: checked };
  }

  /* =========================================================================
   * 显示
   * ========================================================================= */

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /**
   * token 公式 → HTML。vars 是 { 变量名: 'wff'|'setvar' }；变量用 <i>，
   * 常量用普通 span；全部转义。
   */
  function toHTML(tokens, vars) {
    needTokens(tokens);
    var kindOf = vars || {};
    return tokens.map(function (t) {
      var shown = UNI[t] || t;
      if (kindOf[t]) return '<i class="mm-var">' + esc(shown) + '</i>';
      return '<span class="mm-const">' + esc(shown) + '</span>';
    }).join(' ');
  }

  var API = {
    UNI: UNI,
    toASCII: toASCII,
    toUnicode: toUnicode,
    parse: parse,
    key: key,
    eq: eq,
    isFormula: isFormula,
    stripType: stripType,
    substTokens: substTokens,
    matchHyp: matchHyp,
    applyAssertion: applyAssertion,
    checkDv: checkDv,
    toHTML: toHTML,
    esc: esc
  };

  host.RSL.MM.Expr = API;
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
