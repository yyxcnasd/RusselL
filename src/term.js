/*!
 * 公理板 / AXIOM BOARD — RSL.Term
 *
 * 唯一的表达式核心。**公式就是 set.mm token 数组**，首 token 是类型码
 * （'wff' / '|-'; 个体项是 'setvar'）。这是重放关与普通关融合的底层：
 * 普通关的公式只是 set.mm token 的一个受限子集，不再有第二套 AST 运行时。
 *
 * 约定（canonical form，全项目唯一）：
 *   - 二元运算一律带括号：['(', ...a, '->', ...b, ')']、'/\\'、'\\/'、'<->'
 *   - 一元/量词是前缀：['-.', ...a]、['A.', 'x', ...a]、['E.', 'x', ...a]
 *   - 关系式是中级：['x', '=', 'y']、['x', 'e.', 'y']
 *   - 谓词应用：['F', '(', 'x', ')']
 *   - 糖（∨ ∧ ↔ ∃）保留用于显示；比较时按 df-or/df-an/dfbi2/df-ex 展开（与旧
 *     Logic.expand 完全同规则），并按出现顺序对约束变元做 α 规范化。
 *
 * 结构视图：需要“子公式”时会用 read(tokens) 派生出 tree（只读，节点形状与旧 AST
 * 兼容，便于迁移对拍）；token 才是真身，tree 不落盘、不跨模块传递。
 *
 * 纯函数、无 DOM；经典脚本 + CommonJS 双导出。
 */
(function (host) {
  'use strict';

  host.RSL = host.RSL || {};

  var TYPE_CODES = { wff: 1, '|-': 1, setvar: 1, class: 1 };
  var BINARY = { imp: 1, or: 1, and: 1, iff: 1 };
  var PREC = { iff: 1, imp: 2, or: 3, and: 4, not: 5, all: 5, exists: 5, atom: 6, pred: 6, var: 6 };

  function TermError(message) {
    this.name = 'TermError';
    this.message = message;
    if (Error.captureStackTrace) Error.captureStackTrace(this, TermError);
  }
  TermError.prototype = Object.create(Error.prototype);
  TermError.prototype.constructor = TermError;

  function fail(msg) { throw new TermError(msg); }
  function isIdentifier(s) { return typeof s === 'string' && /^[A-Za-z][A-Za-z0-9_]*$/.test(s); }

  /* =========================================================================
   * 1. 类型码与基础
   * ========================================================================= */

  function typeOf(tokens) {
    if (!Array.isArray(tokens) || !tokens.length) fail('公式必须是 token 数组');
    return tokens[0];
  }
  function isFormula(tokens) {
    return Array.isArray(tokens) && tokens.length > 1 && TYPE_CODES[tokens[0]] === 1;
  }
  function body(tokens) {
    if (!Array.isArray(tokens) || !tokens.length) fail('公式必须是 token 数组');
    return TYPE_CODES[tokens[0]] === 1 ? tokens.slice(1) : tokens.slice();
  }
  function wff(bodyTokens) { return ['wff'].concat(bodyTokens || []); }
  function assertion(bodyTokens) { return ['|-'].concat(bodyTokens || []); }
  function keyOf(tokens) { return tokens.join('\u0000'); }
  function tokensOf(tokens) { return Array.isArray(tokens) ? tokens : fail('需要一个 token 数组'); }

  /* =========================================================================
   * 2. 文本 → token（作者侧编译器；也用于 archive/axiom 公式）
   * ========================================================================= */

  var MULTI_OPS = [['<->', 'IFF'], ['<=>', 'IFF'], ['->', 'IMP'], ['=>', 'IMP'], ['/\\', 'AND'], ['\\/', 'OR']];
  var SINGLE_OPS = {
    '¬': 'NOT', '~': 'NOT', '!': 'NOT', '∨': 'OR', '|': 'OR', '→': 'IMP', '⇒': 'IMP',
    '∧': 'AND', '&': 'AND', '^': 'AND', '↔': 'IFF', '⇔': 'IFF', '∀': 'FORALL', '∃': 'EXISTS',
    '(': 'LPAREN', ')': 'RPAREN', ',': 'COMMA', '=': 'EQ', '∈': 'IN'
  };
  var KEYWORDS = { forall: 'FORALL', exists: 'EXISTS', not: 'NOT' };

  function tokenize(text) {
    var out = [], i = 0, n = text.length;
    while (i < n) {
      var ch = text.charAt(i);
      if (/\s/.test(ch)) { i += 1; continue; }
      var op = null;
      for (var m = 0; m < MULTI_OPS.length; m += 1) {
        if (text.substr(i, MULTI_OPS[m][0].length) === MULTI_OPS[m][0]) { op = MULTI_OPS[m]; break; }
      }
      if (op) { out.push({ t: op[1], raw: op[0], pos: i }); i += op[0].length; continue; }
      if (SINGLE_OPS[ch]) { out.push({ t: SINGLE_OPS[ch], raw: ch, pos: i }); i += 1; continue; }
      var ident = /^[A-Za-z][A-Za-z0-9_]*/.exec(text.slice(i));
      if (ident) {
        var word = ident[0];
        out.push({ t: KEYWORDS[word.toLowerCase()] || 'IDENT', v: word, raw: word, pos: i });
        i += word.length; continue;
      }
      fail('无法识别的字符：' + JSON.stringify(ch) + ' @' + (i + 1));
    }
    out.push({ t: 'EOF', raw: '', pos: n });
    return out;
  }

  function blank(n) { return new Array(n + 1).join(' '); }

  /** 解析文本 → 结构树（仅内部使用；对外是 token）。 */
  function parseTree(text) {
    if (typeof text !== 'string') fail('parse 需要字符串');
    var tokens = tokenize(text), index = 0;
    function peek(offset) { return tokens[index + (offset || 0)] || tokens[tokens.length - 1]; }
    function advance() { return tokens[index++]; }
    function atOr() { var t = peek(); return t.t === 'OR' || (t.t === 'IDENT' && t.v === 'v'); }
    function describe(t) { return t.t === 'EOF' ? '输入结束' : '“' + t.raw + '”'; }
    function bad(message, t) {
      var at = t || peek();
      fail('语法错误 @' + (at.pos + 1) + '：' + message + '\n  ' + text + '\n  ' + blank(at.pos) + '^');
    }
    function expect(type, want) {
      var t = peek();
      if (t.t !== type) bad('期待' + want + '，遇到' + describe(t), t);
      return advance();
    }
    function primary() {
      var t = peek();
      if (t.t === 'LPAREN') { advance(); var inner = iff(); expect('RPAREN', ' “)”'); return inner; }
      if (t.t === 'IDENT') {
        advance();
        if (peek().t === 'EQ' || peek().t === 'IN') {
          var rel = advance().t === 'EQ' ? '=' : '∈';
          var rhs = expect('IDENT', rel === '=' ? '等词右项' : '∈ 右项').v;
          return { k: 'pred', name: rel, args: [{ k: 'var', name: t.v }, { k: 'var', name: rhs }] };
        }
        if (peek().t !== 'LPAREN') return { k: 'atom', name: t.v };
        advance();
        var args = [];
        if (peek().t !== 'RPAREN') {
          for (;;) {
            args.push({ k: 'var', name: expect('IDENT', '谓词变元').v });
            if (peek().t !== 'COMMA') break;
            advance();
          }
        }
        expect('RPAREN', ' “)”');
        return args.length ? { k: 'pred', name: t.v, args: args } : { k: 'atom', name: t.v };
      }
      bad('期待公式，遇到' + describe(t), t);
    }
    function unary() {
      var t = peek();
      if (t.t === 'NOT') { advance(); return { k: 'not', a: unary() }; }
      if (t.t === 'FORALL' || t.t === 'EXISTS') {
        advance();
        var v = expect('IDENT', '量词变元').v;
        return { k: t.t === 'FORALL' ? 'all' : 'exists', v: v, a: unary() };
      }
      return primary();
    }
    function and() { var left = unary(); while (peek().t === 'AND') { advance(); left = { k: 'and', a: left, b: unary() }; } return left; }
    function or() { var left = and(); while (atOr()) { advance(); left = { k: 'or', a: left, b: and() }; } return left; }
    function imp() { var left = or(); return peek().t === 'IMP' ? (advance(), { k: 'imp', a: left, b: imp() }) : left; }
    function iff() { var left = imp(); return peek().t === 'IFF' ? (advance(), { k: 'iff', a: left, b: iff() }) : left; }
    var tree = iff();
    if (peek().t !== 'EOF') bad('多余的输入' + describe(peek()));
    return tree;
  }

  /** 结构树 → canonical token（不含类型码）。 */
  function treeToBody(tree) {
    switch (tree.k) {
      case 'atom': return [tree.name];
      case 'var': return [tree.name];
      case 'pred':
        if ((tree.name === '=' || tree.name === '∈') && tree.args.length === 2) {
          return [tree.args[0].name, tree.name === '=' ? '=' : 'e.', tree.args[1].name];
        }
        var predOut = [tree.name, '('];
        tree.args.forEach(function (t, i) {
          if (i) predOut.push(',');
          predOut.push(t.name);
        });
        predOut.push(')');
        return predOut;
      case 'not': return ['-.'].concat(treeToBody(tree.a));
      case 'or': return ['('].concat(treeToBody(tree.a), ['\\/'], treeToBody(tree.b), [')']);
      case 'and': return ['('].concat(treeToBody(tree.a), ['/\\'], treeToBody(tree.b), [')']);
      case 'imp': return ['('].concat(treeToBody(tree.a), ['->'], treeToBody(tree.b), [')']);
      case 'iff': return ['('].concat(treeToBody(tree.a), ['<->'], treeToBody(tree.b), [')']);
      case 'all': return ['A.', tree.v].concat(treeToBody(tree.a));
      case 'exists': return ['E.', tree.v].concat(treeToBody(tree.a));
      default: fail('未知节点类型：' + tree.k);
    }
  }

  /** 文本 → wff token（带 'wff' 类型码）。 */
  function parse(text) { return wff(treeToBody(parseTree(text))); }
  function parseAssertion(text) { return assertion(treeToBody(parseTree(text))); }

  /* =========================================================================
   * 3. token → 结构树（只读视图；路径 'a'/'b' 与旧 AST 一致）
   * ========================================================================= */

  function read(tokens) {
    var t = tokensOf(tokens);
    var b = body(t);
    var pos = 0;

    function expr() {
      var tok = b[pos];
      if (tok === undefined) fail('公式不完整');
      if (tok === 'A.' || tok === 'E.') {
        var v = b[pos + 1];
        if (!isIdentifier(v)) fail('量词后必须是变元：' + JSON.stringify(v));
        pos += 2;
        return { k: tok === 'A.' ? 'all' : 'exists', v: v, a: expr() };
      }
      if (tok === '-.') { pos += 1; return { k: 'not', a: expr() }; }
      if (tok === '(') {
        pos += 1;
        var left = expr();
        var op = b[pos];
        var kind = { '->': 'imp', '/\\': 'and', '\\/': 'or', '<->': 'iff' }[op];
        if (!kind) fail('二元运算缺少运算符：' + JSON.stringify(op));
        pos += 1;
        var right = expr();
        if (b[pos] !== ')') fail('缺少右括号');
        pos += 1;
        return { k: kind, a: left, b: right };
      }
      if (tok === undefined) fail('公式不完整');
      /* 关系式：IDENT '='|'e.' IDENT（两侧在旧 AST 里都是 var 节点） */
      if (isIdentifier(tok) && (b[pos + 1] === '=' || b[pos + 1] === 'e.')) {
        var rel = b[pos + 1] === '=' ? '=' : '∈';
        var rhs = b[pos + 2];
        if (!isIdentifier(rhs)) fail('关系式右项必须是标识符');
        pos += 3;
        return { k: 'pred', name: rel, args: [{ k: 'var', name: tok }, { k: 'var', name: rhs }] };
      }
      if (isIdentifier(tok) && b[pos + 1] === '(') {
        pos += 2;
        var args = [];
        if (b[pos] !== ')') {
          for (;;) {
            if (!isIdentifier(b[pos])) fail('谓词参数必须是标识符');
            args.push({ k: 'var', name: b[pos] });
            pos += 1;
            if (b[pos] === ',') { pos += 1; continue; }
            break;
          }
        }
        if (b[pos] !== ')') fail('谓词应用缺少右括号');
        pos += 1;
        return args.length ? { k: 'pred', name: tok, args: args } : { k: 'atom', name: tok };
      }
      if (!isIdentifier(tok)) fail('无法识别的记号：' + JSON.stringify(tok));
      pos += 1;
      /* 裸标识符在旧解析器里一律是 atom；var 只出现在谓词参数/量词位置。 */
      return { k: 'atom', name: tok };
    }

    var tree = expr();
    if (pos !== b.length) fail('公式有多余 token：' + b.slice(pos).join(' '));
    return tree;
  }

  /* =========================================================================
   * 4. 显示：fmt（最小括号）与 toHTML（全括号/最小括号）
   * ========================================================================= */

  function needNode(n) {
    if (!n || typeof n !== 'object' || !n.k) fail('结构树节点非法');
    return n;
  }
  function needsParens(child, parentKind, side) {
    var cp = PREC[child.k], pp = PREC[parentKind];
    if (cp < pp) return true;
    if (cp > pp) return false;
    return (parentKind === 'imp' || parentKind === 'iff') ? side === 'left' : side === 'right';
  }
  function wrapParen(text, paren) { return paren ? '(' + text + ')' : text; }
  function wrapHTML(text, paren) {
    return paren ? '<span class="f-paren">(</span>' + text + '<span class="f-paren">)</span>' : text;
  }
  function termName(t) {
    if (!t || t.k !== 'var') fail('谓词参数必须是变元');
    return UNI[t.name] || t.name;
  }

  function fmtNode(n) {
    switch (n.k) {
      case 'atom': return UNI[n.name] || n.name;
      case 'var': return UNI[n.name] || n.name;
      case 'pred':
        if ((n.name === '=' || n.name === '∈') && n.args && n.args.length === 2) {
          return termName(n.args[0]) + ' ' + n.name + ' ' + termName(n.args[1]);
        }
        return n.name + '(' + (n.args || []).map(termName).join(', ') + ')';
      case 'not': return '¬' + wrapParen(fmtNode(n.a), PREC[n.a.k] < 5);
      case 'or': return fmtBinary('or', '∨', n.a, n.b);
      case 'and': return fmtBinary('and', '∧', n.a, n.b);
      case 'imp': return fmtBinary('imp', '→', n.a, n.b);
      case 'iff': return fmtBinary('iff', '↔', n.a, n.b);
      case 'all': return '∀' + (UNI[n.v] || n.v) + ' ' + wrapParen(fmtNode(n.a), PREC[n.a.k] < 5);
      case 'exists': return '∃' + (UNI[n.v] || n.v) + ' ' + wrapParen(fmtNode(n.a), PREC[n.a.k] < 5);
      default: fail('未知节点类型：' + n.k);
    }
  }
  function fmtBinary(kind, op, a, b) {
    function side(child, which) {
      return wrapParen(fmtNode(child), needsParens(child, kind, which));
    }
    return side(a, 'left') + op + side(b, 'right');
  }

  function escapeHTML(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function groupedForDisplay(child) {
    return child.k === 'or' || child.k === 'and' || child.k === 'imp' || child.k === 'iff' ||
      child.k === 'all' || child.k === 'exists';
  }
  function htmlTerm(t) { return '<span class="f-var">' + escapeHTML(termName(t)) + '</span>'; }
  function htmlNode(n, full) {
    function child(c, parentKind, side) {
      var paren = full ? groupedForDisplay(c) : needsParens(c, parentKind, side);
      return wrapHTML(htmlNode(c, full), paren);
    }
    function prefix(c) {
      var paren = full ? groupedForDisplay(c) : PREC[c.k] < 5;
      return wrapHTML(htmlNode(c, full), paren);
    }
    function binary(kind, op, a, b) {
      return child(a, kind, 'left') + ' <span class="f-op">' + op + '</span> ' + child(b, kind, 'right');
    }
    switch (n.k) {
      case 'atom': return '<span class="f-var">' + escapeHTML(UNI[n.name] || n.name) + '</span>';
      case 'var': return '<span class="f-var">' + escapeHTML(UNI[n.name] || n.name) + '</span>';
      case 'pred':
        if ((n.name === '=' || n.name === '∈') && n.args && n.args.length === 2) {
          return htmlTerm(n.args[0]) + '<span class="f-op"> ' + n.name + ' </span>' + htmlTerm(n.args[1]);
        }
        return '<span class="f-name">' + escapeHTML(n.name) + '</span><span class="f-paren">(</span>' +
          (n.args || []).map(htmlTerm).join(', ') + '<span class="f-paren">)</span>';
      case 'not': return '<span class="f-op">¬</span>' + prefix(n.a);
      case 'or': return binary('or', '∨', n.a, n.b);
      case 'and': return binary('and', '∧', n.a, n.b);
      case 'imp': return binary('imp', '→', n.a, n.b);
      case 'iff': return binary('iff', '↔', n.a, n.b);
      case 'all': return '<span class="f-quant">∀</span><span class="f-var">' + escapeHTML(UNI[n.v] || n.v) + '</span> ' + prefix(n.a);
      case 'exists': return '<span class="f-quant">∃</span><span class="f-var">' + escapeHTML(UNI[n.v] || n.v) + '</span> ' + prefix(n.a);
      default: fail('未知节点类型：' + n.k);
    }
  }

  /* set.mm 常量 → 显示符号（与 RSL.MM.Expr 的映射一致；Term 是底层，不能反过来依赖 Expr）。 */
  var UNI = {
    '|-': '⊢', '-.': '¬', '->': '→', '<->': '↔', '=/=': '≠',
    '/\\': '∧', '\\/': '∨', 'A.': '∀', 'E.': '∃', 'e.': '∈',
    'E!': '∃!', 'E*': '∃*', 'T.': '⊤', 'F.': '⊥',
    '_V': 'V', '(/)': '∅', 'C_': '⊆', 'C.': '⊂', '~P': '𝒫',
    'u.': '∪', 'i^i': '∩', 'U.': '⋃', '|^|': '⋂', 'X.': '×',
    '_om': 'ω', '_I': 'I', '_E': 'E', '_R': 'R', '|->': '↦',
    '<.': '⟨', '>.': '⟩', '_|_': '⊥',
    /* set.mm 的 wff 变元显示成希腊字母（与 RSL.MM.Expr 一致） */
    'ph': 'φ', 'ps': 'ψ', 'ch': 'χ', 'th': 'θ', 'ta': 'τ',
    'et': 'ε', 'ze': 'ζ', 'si': 'σ', 'rh': 'ρ', 'mu': 'μ',
    'la': 'λ', 'ka': 'κ'
  };

  /** token 平铺渲染：结构读不出来时用（set.mm 的类项/函数项等）。 */
  function flatHTML(tokens, vars) {
    return body(tokens).map(function (t) {
      var shown = UNI[t] || t;
      if (vars && vars[t]) return '<i class="mm-var">' + escapeHTML(shown) + '</i>';
      return '<span class="mm-const">' + escapeHTML(shown) + '</span>';
    }).join(' ');
  }

  function toHTML(tokens, options) {
    var full = !!(options === 'full' || (options && options.full));
    var vars = options && typeof options === 'object' ? options.vars : null;
    try {
      return htmlNode(read(tokens), full);
    } catch (e) {
      return flatHTML(tokens, vars);
    }
  }

  function fmt(tokens) { return fmtNode(read(tokens)); }

  /** 节点/卡片上的公式 HTML：断言自动带 ⊢，其余只画公式体。 */
  function toNodeHTML(tokens, vars) {
    var options = { full: true, vars: vars || null };
    return typeOf(tokens) === '|-'
      ? '<span class="node-turnstile">⊢</span>' + toHTML(body(tokens), options)
      : toHTML(tokens, options);
  }
  /* =========================================================================
   * 5. 定义展开 + α 规范化（等价判定键）
   * ========================================================================= */

  function clone(n) { return JSON.parse(JSON.stringify(n)); }

  function expandNode(n) {
    switch (n.k) {
      case 'atom': return { k: 'atom', name: n.name };
      case 'var': return { k: 'var', name: n.name };
      case 'pred': return { k: 'pred', name: n.name, args: (n.args || []).map(function (t) { return { k: 'var', name: t.name }; }) };
      case 'not': return { k: 'not', a: expandNode(n.a) };
      case 'imp': return { k: 'imp', a: expandNode(n.a), b: expandNode(n.b) };
      case 'or': return { k: 'imp', a: { k: 'not', a: expandNode(n.a) }, b: expandNode(n.b) };
      case 'and': {
        var x = expandNode(n.a), y = expandNode(n.b);
        return { k: 'not', a: { k: 'imp', a: x, b: { k: 'not', a: y } } };
      }
      case 'iff': {
        var p = expandNode(n.a), q = expandNode(n.b);
        return {
          k: 'not',
          a: { k: 'imp', a: { k: 'imp', a: p, b: q }, b: { k: 'not', a: { k: 'imp', a: q, b: p } } }
        };
      }
      case 'all': return { k: 'all', v: n.v, a: expandNode(n.a) };
      case 'exists': {
        var inner = expandNode(n.a);
        return { k: 'not', a: { k: 'all', v: n.v, a: { k: 'not', a: inner } } };
      }
      default: fail('未知节点类型：' + n.k);
    }
  }

  function coreKey(n, env, counter) {
    switch (n.k) {
      case 'atom': return 'A' + JSON.stringify(n.name);
      case 'var': return 'V' + JSON.stringify(env[n.name] || n.name);
      case 'pred':
        return 'P' + JSON.stringify(n.name) + '(' + (n.args || []).map(function (t) {
          return 'V' + JSON.stringify(env[t.name] || t.name);
        }).join(',') + ')';
      case 'not': return 'N(' + coreKey(n.a, env, counter) + ')';
      case 'imp': return 'I(' + coreKey(n.a, env, counter) + ',' + coreKey(n.b, env, counter) + ')';
      case 'all': {
        var canon = '#' + counter.n;
        counter.n += 1;
        var next = Object.create(env);
        next[n.v] = canon;
        return 'Qa(' + canon + ',' + coreKey(n.a, next, counter) + ')';
      }
      default: fail('展开后不应出现的节点：' + n.k);
    }
  }

  /** 等价判定键：定义展开 + 约束变元按出现顺序 α 规范化（与旧 Logic.key 同格式）。 */
  function key(tokens) {
    return coreKey(expandNode(read(tokens)), Object.create(null), { n: 0 });
  }
  function eq(a, b) { return key(a) === key(b); }

  /* =========================================================================
   * 6. 变元/原子分析
   * ========================================================================= */

  function walk(n, visit) {
    visit(n);
    if (n.k === 'not' || n.k === 'all' || n.k === 'exists') walk(n.a, visit);
    else if (BINARY[n.k]) { walk(n.a, visit); walk(n.b, visit); }
  }

  /** 命题原子（不区分作用域；与旧 Logic.atomsOf 一致：返回名字数组）。 */
  function atomsOf(tokens) {
    var out = [];
    walk(read(tokens), function (n) { if (n.k === 'atom' && out.indexOf(n.name) < 0) out.push(n.name); });
    return out;
  }

  /** 自由个体变元名（谓词参数/关系式里出现、且不被内层量词约束）。 */
  function freeVars(tokens) {
    var out = [];
    (function go(n, bound) {
      if (n.k === 'pred') {
        (n.args || []).forEach(function (t) {
          if (bound.indexOf(t.name) < 0 && out.indexOf(t.name) < 0) out.push(t.name);
        });
        return;
      }
      if (n.k === 'not') return go(n.a, bound);
      if (BINARY[n.k]) { go(n.a, bound); go(n.b, bound); return; }
      if (n.k === 'all' || n.k === 'exists') {
        if (bound.indexOf(n.v) < 0) go(n.a, bound.concat([n.v]));
        else go(n.a, bound);
      }
    })(read(tokens), []);
    return out;
  }

  function collectVarNames(n, avoid) {
    walk(n, function (x) {
      if (x.k === 'pred') (x.args || []).forEach(function (t) { avoid[t.name] = true; });
      if (x.k === 'all' || x.k === 'exists') avoid[x.v] = true;
    });
    return avoid;
  }

  function isAtom(tokens) {
    var t = tokensOf(tokens);
    var b = body(t);
    return b.length === 1 && /^[A-Za-z][A-Za-z0-9_]*$/.test(b[0]);
  }

  /* =========================================================================
   * 7. 替换
   * ========================================================================= */

  /** 原子替换（Metamath 式盲替换）：map 是 token → body token 数组。 */
  function substBody(bodyTokens, map) {
    var out = [];
    for (var i = 0; i < bodyTokens.length; i += 1) {
      var t = bodyTokens[i];
      if (Object.prototype.hasOwnProperty.call(map, t)) {
        var rep = map[t];
        for (var k = 0; k < rep.length; k += 1) out.push(rep[k]);
      } else out.push(t);
    }
    return out;
  }

  /**
   * 游戏语义的原子实例化：只替换「公式叶子位置上的 atom」，不碰谓词参数/关系式
   * 两侧的变元 token（那些在结构上是 var，不是 atom）。替换是直接的：不做 α 改名，
   * 代换式里的自由变元可以被外层量词捕获（旧 Logic.instantiate 的语义）。
   */
  function substAtoms(tokens, map) {
    var t = tokensOf(tokens);
    var treeMap = Object.create(null);
    Object.keys(map || {}).forEach(function (name) {
      treeMap[name] = read(wff(body(map[name])));
    });
    function go(node) {
      if (node.k === 'atom') {
        return Object.prototype.hasOwnProperty.call(treeMap, node.name)
          ? clone(treeMap[node.name])
          : { k: 'atom', name: node.name };
      }
      switch (node.k) {
        case 'var': return { k: 'var', name: node.name };
        case 'pred': return { k: 'pred', name: node.name, args: (node.args || []).map(function (x) { return { k: 'var', name: x.name }; }) };
        case 'not': return { k: 'not', a: go(node.a) };
        case 'or': return { k: 'or', a: go(node.a), b: go(node.b) };
        case 'imp': return { k: 'imp', a: go(node.a), b: go(node.b) };
        case 'and': return { k: 'and', a: go(node.a), b: go(node.b) };
        case 'iff': return { k: 'iff', a: go(node.a), b: go(node.b) };
        case 'all': return { k: 'all', v: node.v, a: go(node.a) };
        case 'exists': return { k: 'exists', v: node.v, a: go(node.a) };
        default: fail('未知节点类型：' + node.k);
      }
    }
    return [t[0]].concat(treeToBody(go(read(t))));
  }

  /** 在图式/断言上实例化：map 键是原子名，值是 wff token（带类型码）。 */
  function instantiate(tokens, map) {
    return substAtoms(tokens, map);
  }

  function substitute(tokens, atomName, replacement) {
    if (!isIdentifier(atomName)) fail('substitute 需要非空的原子名');
    var m = Object.create(null);
    m[atomName] = replacement;
    return substAtoms(tokens, m);
  }

  function pickFresh(avoid, preferred) {
    var base = isIdentifier(preferred) ? preferred : 'x';
    if (!avoid[base]) { avoid[base] = true; return base; }
    for (var i = 1; i < 100000; i += 1) {
      var cand = base + i;
      if (!avoid[cand]) { avoid[cand] = true; return cand; }
    }
    fail('无法生成新的变元名');
  }

  function freshVar(tokens, preferred) {
    var avoid = Object.create(null);
    collectVarNames(read(tokens), avoid);
    return pickFresh(avoid, preferred);
  }

  function renameTree(node, from, to) {
    switch (node.k) {
      case 'atom': return { k: 'atom', name: node.name };
      case 'var': return { k: 'var', name: node.name };
      case 'pred':
        return { k: 'pred', name: node.name, args: (node.args || []).map(function (t) {
          return { k: 'var', name: t.name === from ? to : t.name };
        }) };
      case 'not': return { k: 'not', a: renameTree(node.a, from, to) };
      case 'or': return { k: 'or', a: renameTree(node.a, from, to), b: renameTree(node.b, from, to) };
      case 'imp': return { k: 'imp', a: renameTree(node.a, from, to), b: renameTree(node.b, from, to) };
      case 'and': return { k: 'and', a: renameTree(node.a, from, to), b: renameTree(node.b, from, to) };
      case 'iff': return { k: 'iff', a: renameTree(node.a, from, to), b: renameTree(node.b, from, to) };
      case 'all': case 'exists':
        if (node.v === from) return clone(node);
        return { k: node.k, v: node.v, a: renameTree(node.a, from, to) };
      default: fail('未知节点类型：' + node.k);
    }
  }

  /** 捕获规避的个体变元替换：把自由出现的 varName 换成单个变元 termVar。 */
  function substituteVar(tokens, varName, termVar) {
    if (!isIdentifier(varName)) fail('substituteVar 需要非空的变元名');
    if (typeof termVar !== 'string' || !isIdentifier(termVar)) fail('substituteVar 的 term 只支持变元名');
    var root = read(tokens);
    var avoid = Object.create(null);
    collectVarNames(root, avoid);
    avoid[termVar] = true;

    function go(node) {
      switch (node.k) {
        case 'atom': return { k: 'atom', name: node.name };
        case 'var': return { k: 'var', name: node.name };
        case 'pred':
          return { k: 'pred', name: node.name, args: (node.args || []).map(function (t) {
            return { k: 'var', name: t.name === varName ? termVar : t.name };
          }) };
        case 'not': return { k: 'not', a: go(node.a) };
        case 'or': return { k: 'or', a: go(node.a), b: go(node.b) };
        case 'imp': return { k: 'imp', a: go(node.a), b: go(node.b) };
        case 'and': return { k: 'and', a: go(node.a), b: go(node.b) };
        case 'iff': return { k: 'iff', a: go(node.a), b: go(node.b) };
        case 'all': case 'exists': {
          if (node.v === varName) return clone(node);
          var clash = node.v === termVar && freeVarsOfTree(node.a).indexOf(varName) >= 0;
          if (!clash) return { k: node.k, v: node.v, a: go(node.a) };
          var fresh = pickFresh(avoid, node.v);
          return { k: node.k, v: fresh, a: go(renameTree(node.a, node.v, fresh)) };
        }
        default: fail('未知节点类型：' + node.k);
      }
    }
    var t = tokensOf(tokens);
    var out = treeToBody(go(root));
    return [t[0]].concat(out);
  }

  function freeVarsOfTree(root) {
    var out = [];
    (function go(n, bound) {
      if (n.k === 'pred') {
        (n.args || []).forEach(function (t) { if (bound.indexOf(t.name) < 0 && out.indexOf(t.name) < 0) out.push(t.name); });
        return;
      }
      if (n.k === 'not') return go(n.a, bound);
      if (BINARY[n.k]) { go(n.a, bound); go(n.b, bound); return; }
      if (n.k === 'all' || n.k === 'exists') return go(n.a, bound.concat([n.v]));
    })(root, []);
    return out;
  }

  function quantify(kind, v, tokens) {
    var k = kind === 'exists' || kind === '∃' ? 'E.' : 'A.';
    if (!isIdentifier(v)) fail('quantify 的变元名无效');
    var t = tokensOf(tokens);
    return [t[0], k, v].concat(body(t));
  }

  /* =========================================================================
   * 8. 定义置换（与旧 Logic.replaceOptions 同 id/同结果）
   * ========================================================================= */

  var REPLACE_LABELS = {
    'df-or:expand': 'df-or 展开 · A∨B ⇒ ¬A→B',
    'df-or:fold': 'df-or 折叠 · ¬A→B ⇒ A∨B',
    'df-an:expand': 'df-an 展开 · A∧B ⇒ ¬(A→¬B)',
    'df-an:fold': 'df-an 折叠 · ¬(A→¬B) ⇒ A∧B',
    'dfbi2:expand': 'dfbi2 展开 · A↔B ⇒ (A→B)∧(B→A)',
    'dfbi2:fold': 'dfbi2 折叠 · (A→B)∧(B→A) ⇒ A↔B',
    'df-ex:expand': 'df-ex 展开 · ∃x A ⇒ ¬∀x ¬A',
    'df-ex:fold': 'df-ex 折叠 · ¬∀x ¬A ⇒ ∃x A'
  };
  var MAX_OPTIONS = 24;

  function eqTree(a, b) { return keyFromTree(expandNode(a)) === keyFromTree(expandNode(b)); }
  function keyFromTree(expanded) { return coreKey(expanded, Object.create(null), { n: 0 }); }

  function biFold(n) {
    if (n.k !== 'and') return null;
    var l = n.a, r = n.b;
    if (l.k === 'imp' && r.k === 'imp' && eqTree(l.a, r.b) && eqTree(l.b, r.a)) {
      return { k: 'iff', a: l.a, b: l.b };
    }
    return null;
  }

  function candidatesAt(n) {
    var list = [];
    if (n.k === 'or') list.push({ def: 'df-or', dir: 'expand', after: { k: 'imp', a: { k: 'not', a: n.a }, b: n.b } });
    if (n.k === 'imp' && n.a.k === 'not') list.push({ def: 'df-or', dir: 'fold', after: { k: 'or', a: n.a.a, b: n.b } });
    if (n.k === 'and') {
      list.push({
        def: 'df-an', dir: 'expand',
        after: { k: 'not', a: { k: 'imp', a: n.a, b: { k: 'not', a: n.b } } }
      });
    }
    if (n.k === 'not' && n.a.k === 'imp' && n.a.b.k === 'not') {
      list.push({ def: 'df-an', dir: 'fold', after: { k: 'and', a: n.a.a, b: n.a.b.a } });
    }
    if (n.k === 'iff') {
      list.push({
        def: 'dfbi2', dir: 'expand',
        after: { k: 'and', a: { k: 'imp', a: n.a, b: n.b }, b: { k: 'imp', a: n.b, b: n.a } }
      });
    }
    var folded = biFold(n);
    if (folded) list.push({ def: 'dfbi2', dir: 'fold', after: folded });
    if (n.k === 'exists') {
      list.push({
        def: 'df-ex', dir: 'expand',
        after: { k: 'not', a: { k: 'all', v: n.v, a: { k: 'not', a: n.a } } }
      });
    }
    if (n.k === 'not' && n.a.k === 'all' && n.a.a.k === 'not') {
      list.push({ def: 'df-ex', dir: 'fold', after: { k: 'exists', v: n.a.v, a: n.a.a.a } });
    }
    return list;
  }

  function shallowCloneNode(n) {
    switch (n.k) {
      case 'atom': return { k: 'atom', name: n.name };
      case 'var': return { k: 'var', name: n.name };
      case 'pred': return { k: 'pred', name: n.name, args: n.args };
      case 'not': return { k: 'not', a: n.a };
      case 'or': return { k: 'or', a: n.a, b: n.b };
      case 'imp': return { k: 'imp', a: n.a, b: n.b };
      case 'and': return { k: 'and', a: n.a, b: n.b };
      case 'iff': return { k: 'iff', a: n.a, b: n.b };
      case 'all': return { k: 'all', v: n.v, a: n.a };
      case 'exists': return { k: 'exists', v: n.v, a: n.a };
      default: fail('未知节点类型：' + n.k);
    }
  }

  function replaceAt(node, path, index, replacement) {
    if (index === path.length) return clone(replacement);
    var copy = shallowCloneNode(node);
    copy[path[index]] = replaceAt(node[path[index]], path, index + 1, replacement);
    return copy;
  }
  function nodeAtPath(root, path) {
    var cur = root;
    for (var i = 0; i < path.length; i += 1) cur = cur[path[i]];
    return cur;
  }

  /** 列出所有单次定义替换（最多 24 个，双向）。result 同时给 tree 与 token。 */
  function replaceOptions(tokens) {
    var root = read(tokens);
    var t = tokensOf(tokens);
    var out = [];
    (function walk(current, path) {
      if (out.length >= MAX_OPTIONS) return;
      var found = candidatesAt(current);
      for (var i = 0; i < found.length && out.length < MAX_OPTIONS; i += 1) {
        var rep = found[i];
        var stem = path.length ? path.join('.') : '@';
        var resultTree = replaceAt(root, path, 0, rep.after);
        out.push({
          id: rep.def + ':' + rep.dir + ':' + stem,
          def: rep.def,
          dir: rep.dir,
          path: path.slice(),
          label: REPLACE_LABELS[rep.def + ':' + rep.dir],
          result: resultTree,
          tokens: [t[0]].concat(treeToBody(resultTree))
        });
      }
      if (out.length >= MAX_OPTIONS) return;
      if (current.k === 'not' || current.k === 'all' || current.k === 'exists') walk(current.a, path.concat('a'));
      else if (BINARY[current.k]) { walk(current.a, path.concat('a')); walk(current.b, path.concat('b')); }
    })(root, []);
    return out;
  }

  function applyReplacement(tokens, id) {
    var opts = replaceOptions(tokens);
    for (var i = 0; i < opts.length; i += 1) if (opts[i].id === id) return opts[i].tokens;
    fail('找不到替换项：' + id);
  }

  /* =========================================================================
   * 9. 分离 / 匹配
   * ========================================================================= */

  function detach(a, b) {
    var ta = read(a), tb = read(b);
    if (ta.k === 'imp' && eqTree(ta.a, tb)) {
      return { ok: true, out: [typeOf(a)].concat(treeToBody(ta.b)), form: 'A→B + A' };
    }
    if (tb.k === 'imp' && eqTree(tb.a, ta)) {
      return { ok: true, out: [typeOf(b)].concat(treeToBody(tb.b)), form: 'A→B + A' };
    }
    var reason = (ta.k !== 'imp' && tb.k !== 'imp')
      ? '两个输入都不是蕴涵式（A→B）'
      : '蕴涵式的前件与另一个输入不定义等值';
    return { ok: false, reason: reason };
  }

  function syllogism(a, b) {
    var ta = read(a), tb = read(b);
    if (ta.k !== 'imp' || tb.k !== 'imp') return { ok: false, reason: '两路输入都必须是以蕴涵为顶层的断言' };
    if (!eqTree(ta.b, tb.a)) return { ok: false, reason: '中间命题不匹配' };
    return {
      ok: true,
      out: ['wff', '('].concat(treeToBody(ta.a), ['->'], treeToBody(tb.b), [')'])
    };
  }

  /* =========================================================================
   * 10. MV 断言应用（与 src/mm/verify.js 的语义一致；token 层唯一实现）
   * ========================================================================= */

  function stripType(tokens) { var t = tokensOf(tokens); return t.length > 1 ? t.slice(1) : []; }

  function applyFrame(frame, actualFormulas) {
    if (!frame || !Array.isArray(frame.math)) return { ok: false, error: 'frame 缺少 math' };
    var mand = frame.mandatory || [];
    var actual = actualFormulas || [];
    if (actual.length !== mand.length) {
      return { ok: false, error: 'arity mismatch: ' + (frame.label || '?') + ' wants ' + mand.length + ' but got ' + actual.length };
    }
    var sub = {};
    var i, h, a;
    for (i = 0; i < mand.length; i += 1) {
      h = mand[i]; a = actual[i];
      if (!Array.isArray(a) || !a.length) return { ok: false, error: 'operand #' + (i + 1) + ' 不是公式' };
      if (h.kind === '$f') {
        if (a[0] !== (h.math && h.math[0])) {
          return { ok: false, error: 'typecode mismatch at hypothesis #' + (i + 1) + ' (' + h.label + '): expected ' + h.math[0] + ' but got ' + a[0] };
        }
        if (a.length < 2) return { ok: false, error: 'empty expression for variable ' + h.var };
        sub[h.var] = a.slice(1);
      }
    }
    for (i = 0; i < mand.length; i += 1) {
      h = mand[i];
      if (h.kind !== '$e') continue;
      var expect = substBody(h.math, sub);
      if (keyOf(expect) !== keyOf(actual[i])) {
        return { ok: false, error: 'mismatch at hypothesis ' + (h.label || ('#' + (i + 1))) + ': expected [ ' + expect.join(' ') + ' ] but got [ ' + actual[i].join(' ') + ' ]' };
      }
    }
    var out = substBody(frame.math, sub);
    return { ok: true, conclusion: out, sub: sub };
  }

  function mandatoryDv(frame) {
    var active = {};
    (frame.mandatory || []).forEach(function (h) { if (h.kind === '$f' && h.var) active[h.var] = true; });
    return (frame.dv || []).filter(function (pair) { return active[pair[0]] && active[pair[1]]; });
  }

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
        var tk = ea[i];
        if (!setB[tk]) continue;
        if (vars && !vars[tk]) continue;
        errors.push('dv violation $d ' + a + ' ' + b + ' (shared variable ' + tk + ')');
        break;
      }
      checked += 1;
    });
    return { ok: errors.length === 0, errors: errors, checked: checked };
  }

  var API = {
    TYPE_CODES: TYPE_CODES,
    TermError: TermError,
    typeOf: typeOf,
    isFormula: isFormula,
    body: body,
    wff: wff,
    assertion: assertion,
    keyOf: keyOf,
    stripType: stripType,
    tokenize: tokenize,
    parse: parse,
    parseAssertion: parseAssertion,
    parseTree: parseTree,
    treeToBody: treeToBody,
    read: read,
    fmt: fmt,
    toHTML: toHTML,
    toNodeHTML: toNodeHTML,
    key: key,
    eq: eq,
    eqTree: eqTree,
    atomsOf: atomsOf,
    freeVars: freeVars,
    isAtom: isAtom,
    substBody: substBody,
    substAtoms: substAtoms,
    instantiate: instantiate,
    substitute: substitute,
    substituteVar: substituteVar,
    quantify: quantify,
    freshVar: freshVar,
    replaceOptions: replaceOptions,
    applyReplacement: applyReplacement,
    detach: detach,
    syllogism: syllogism,
    applyFrame: applyFrame,
    mandatoryDv: mandatoryDv,
    checkDv: checkDv
  };

  host.RSL.Term = API;
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
