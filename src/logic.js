/*!
 * 公理板 / AXIOM BOARD — RSL.Logic
 *
 * 纯逻辑库：命题演算 + 一阶谓词演算的一小片。
 * 经典脚本（非 ES module、无 DOM、无网络），同时支持：
 *   window.RSL.Logic = ...
 *   module.exports = ...        （node --test 使用）
 *
 * AST（全部是普通对象）：
 *   {k:'atom', name:'P'}                       命题原子 / 0 元谓词
 *   {k:'pred', name:'F', args:[{k:'var',name:'x'}]}
 *   {k:'var', name:'x'}
 *   {k:'not', a} / {k:'or',a,b} / {k:'imp',a,b} / {k:'and',a,b} / {k:'iff',a,b}
 *   {k:'all', v:'x', a} / {k:'exists', v:'x', a}
 *
 * 约定：纯函数；AST 视为不可变，未改动的子树允许共享；除本命名空间外无全局可变状态。
 */
(function (host) {
  'use strict';

  function LogicError(message) {
    this.name = 'LogicError';
    this.message = message;
    if (Error.captureStackTrace) Error.captureStackTrace(this, LogicError);
  }
  LogicError.prototype = Object.create(Error.prototype);
  LogicError.prototype.constructor = LogicError;

  var KIND = { atom: 1, pred: 1, var: 1, not: 1, or: 1, imp: 1, and: 1, iff: 1, all: 1, exists: 1 };
  var BINARY = { or: 1, imp: 1, and: 1, iff: 1 };
  var PREC = { iff: 1, imp: 2, or: 3, and: 4, not: 5, all: 5, exists: 5, atom: 6, pred: 6, var: 6 };

  function need(n, label) {
    if (!n || typeof n !== 'object' || typeof n.k !== 'string' || !KIND[n.k]) {
      throw new LogicError((label || '公式') + ' 不是合法的逻辑 AST 节点');
    }
    return n;
  }
  function isIdentifier(s) { return typeof s === 'string' && /^[A-Za-z][A-Za-z0-9_]*$/.test(s); }
  function requireName(n, label) {
    if (!n || typeof n.name !== 'string' || !n.name) throw new LogicError((label || '节点') + ' 缺少合法的 name');
    return n.name;
  }
  function requireBinder(n) {
    if (!n || typeof n.v !== 'string' || !n.v) throw new LogicError('量词缺少合法的变元名 v');
    return n.v;
  }
  function blank(n) { return new Array(n + 1).join(' '); }
  function hasOwn(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }

  function clone(n) {
    need(n, '公式');
    switch (n.k) {
      case 'atom': return { k: 'atom', name: n.name };
      case 'var': return { k: 'var', name: n.name };
      case 'pred':
        if (!Array.isArray(n.args)) throw new LogicError('pred.args 必须是数组');
        return { k: 'pred', name: n.name, args: n.args.map(clone) };
      case 'not': return { k: 'not', a: clone(n.a) };
      case 'or': return { k: 'or', a: clone(n.a), b: clone(n.b) };
      case 'imp': return { k: 'imp', a: clone(n.a), b: clone(n.b) };
      case 'and': return { k: 'and', a: clone(n.a), b: clone(n.b) };
      case 'iff': return { k: 'iff', a: clone(n.a), b: clone(n.b) };
      case 'all': return { k: 'all', v: requireBinder(n), a: clone(n.a) };
      case 'exists': return { k: 'exists', v: requireBinder(n), a: clone(n.a) };
      default: throw new LogicError('未知节点类型：' + n.k);
    }
  }

  /* 只复制节点外壳；replaceOptions 沿路径复制时使用。 */
  function shallowClone(n) {
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
      default: throw new LogicError('未知节点类型：' + n.k);
    }
  }

  /* =========================================================================
   * 1. 词法与语法分析
   * ========================================================================= */

  var MULTI_OPS = [['<->', 'IFF'], ['<=>', 'IFF'], ['->', 'IMP'], ['=>', 'IMP'], ['/\\', 'AND'], ['\\/', 'OR']];
  var SINGLE_OPS = {
    '¬': 'NOT', '~': 'NOT', '!': 'NOT', '∨': 'OR', '|': 'OR', '→': 'IMP', '⇒': 'IMP',
    '∧': 'AND', '&': 'AND', '^': 'AND', '↔': 'IFF', '⇔': 'IFF', '∀': 'FORALL', '∃': 'EXISTS',
    '(': 'LPAREN', ')': 'RPAREN', ',': 'COMMA', '=': 'EQ', '∈': 'IN'
  };
  var KEYWORDS = { forall: 'FORALL', exists: 'EXISTS', not: 'NOT' };

  function tokenize(text) {
    var tokens = [], i = 0, n = text.length;
    while (i < n) {
      var ch = text.charAt(i);
      if (/\s/.test(ch)) { i += 1; continue; }

      var op = null;
      for (var m = 0; m < MULTI_OPS.length; m += 1) {
        if (text.substr(i, MULTI_OPS[m][0].length) === MULTI_OPS[m][0]) { op = MULTI_OPS[m]; break; }
      }
      if (op) {
        tokens.push({ t: op[1], raw: op[0], pos: i, end: i + op[0].length });
        i += op[0].length;
        continue;
      }

      /* 局部、非全局正则：不引入模块级可变 lastIndex。 */
      var ident = /^[A-Za-z][A-Za-z0-9_]*/.exec(text.slice(i));
      if (ident) {
        var word = ident[0];
        tokens.push({ t: KEYWORDS[word.toLowerCase()] || 'IDENT', v: word, raw: word, pos: i, end: i + word.length });
        i += word.length;
        continue;
      }

      if (SINGLE_OPS[ch]) {
        tokens.push({ t: SINGLE_OPS[ch], v: ch, raw: ch, pos: i, end: i + 1 });
        i += 1;
        continue;
      }

      throw new LogicError('语法错误 @' + (i + 1) + '：无法识别的字符 “' + ch + '”\n  ' +
        text + '\n  ' + blank(i) + '^');
    }
    tokens.push({ t: 'EOF', raw: '', pos: n, end: n });
    return tokens;
  }

  /**
   * 解析公式文本。Unicode：¬ ∨ → ∧ ↔ ∀ ∃；ASCII：~ v -> ^ <-> forall exists
   * （另容忍 ! | & /\ \/ => <=>）。优先级（松→紧）：↔ < → < ∨ < ∧ < ¬/∀/∃ < 原子；
   * → 与 ↔ 右结合，∧ 与 ∨ 左结合。量词体取一个一元公式（∀x F(x)、∀x (P→Q)、∀x ¬F(x)），
   * 所以 ∀x F(x) → G 解析为 (∀x F(x)) → G；要宽作用域请加括号。
   */
  function parse(text) {
    if (typeof text !== 'string') throw new LogicError('parse 需要字符串');
    var tokens = tokenize(text), index = 0;

    function peek(offset) { return tokens[index + (offset || 0)] || tokens[tokens.length - 1]; }
    function advance() { return tokens[index++]; }
    function describe(t) { return t.t === 'EOF' ? '输入结束' : '“' + t.raw + '”'; }
    function fail(message, t) {
      var at = t || peek();
      throw new LogicError('语法错误 @' + (at.pos + 1) + '：' + message + '\n  ' +
        text + '\n  ' + blank(at.pos) + '^');
    }
    function expect(type, want) {
      var t = peek();
      if (t.t !== type) fail('期待' + want + '，遇到' + describe(t), t);
      return advance();
    }
    /* ASCII 的 v 只在二元运算符位置解释为 ∨，因此它仍可做变元。 */
    function atOr() {
      var t = peek();
      return t.t === 'OR' || (t.t === 'IDENT' && t.v === 'v');
    }

    function primary() {
      var t = peek();
      if (t.t === 'LPAREN') {
        advance();
        var inner = iff();
        expect('RPAREN', ' “)”');
        return inner;
      }
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
        /* F() 按契约视作 0 元谓词 → 原子。 */
        return args.length ? { k: 'pred', name: t.v, args: args } : { k: 'atom', name: t.v };
      }
      fail('期待公式，遇到' + describe(t), t);
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

    function and() {
      var left = unary();
      while (peek().t === 'AND') { advance(); left = { k: 'and', a: left, b: unary() }; }
      return left;
    }
    function or() {
      var left = and();
      while (atOr()) { advance(); left = { k: 'or', a: left, b: and() }; }
      return left;
    }
    function imp() {
      var left = or();
      return peek().t === 'IMP' ? (advance(), { k: 'imp', a: left, b: imp() }) : left;
    }
    function iff() {
      var left = imp();
      return peek().t === 'IFF' ? (advance(), { k: 'iff', a: left, b: iff() }) : left;
    }

    var ast = iff();
    if (peek().t !== 'EOF') fail('多余的输入' + describe(peek()));
    return ast;
  }

  /* =========================================================================
   * 2. 最小括号格式化与 HTML
   * ========================================================================= */

  function needsParens(child, parentKind, side) {
    need(child, '子公式');
    var cp = PREC[child.k], pp = PREC[parentKind];
    if (cp < pp) return true;
    if (cp > pp) return false;
    /* 同优先级：→/↔ 右结合（左孩子加括号）；∧/∨ 左结合（右孩子加括号）。 */
    return (parentKind === 'imp' || parentKind === 'iff') ? side === 'left' : side === 'right';
  }

  function wrapParen(text, paren) { return paren ? '(' + text + ')' : text; }
  function wrapHTML(text, paren) {
    return paren ? '<span class="f-paren">(</span>' + text + '<span class="f-paren">)</span>' : text;
  }

  function fmtChild(child, parentKind, side) {
    return wrapParen(fmtNode(child), needsParens(child, parentKind, side));
  }
  function fmtPrefix(child) {
    return wrapParen(fmtNode(child), PREC[child.k] < 5);
  }
  function fmtBinary(kind, op, a, b) {
    return fmtChild(a, kind, 'left') + op + fmtChild(b, kind, 'right');
  }
  function fmtTerm(term) {
    need(term, '谓词参数');
    if (term.k !== 'var') throw new LogicError('谓词参数必须是变元');
    return requireName(term, '变元');
  }

  function fmtNode(n) {
    need(n, '公式');
    switch (n.k) {
      case 'atom': return requireName(n, '原子');
      case 'var': return requireName(n, '变元');
      case 'pred':
        if (!Array.isArray(n.args)) throw new LogicError('pred.args 必须是数组');
        if ((n.name === '=' || n.name === '∈') && n.args.length === 2) {
          return fmtTerm(n.args[0]) + ' ' + n.name + ' ' + fmtTerm(n.args[1]);
        }
        return requireName(n, '谓词') + '(' + n.args.map(fmtTerm).join(', ') + ')';
      case 'not': return '¬' + fmtPrefix(n.a);
      case 'or': return fmtBinary('or', '∨', n.a, n.b);
      case 'and': return fmtBinary('and', '∧', n.a, n.b);
      case 'imp': return fmtBinary('imp', '→', n.a, n.b);
      case 'iff': return fmtBinary('iff', '↔', n.a, n.b);
      case 'all': return '∀' + requireBinder(n) + ' ' + fmtPrefix(n.a);
      case 'exists': return '∃' + requireBinder(n) + ' ' + fmtPrefix(n.a);
      default: throw new LogicError('未知节点类型：' + n.k);
    }
  }

  /** 规范化文本：最小括号、无多余空格（量词后保留一个空格）。 */
  function fmt(n) { need(n, '公式'); return fmtNode(n); }
  /** 显示文本；与 fmt 相同，保证同一公式在任何地方显示一致。 */
  function pretty(n) { return fmt(n); }

  function escapeHTML(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* “全括号”模式：每个二元/量化子式都加括号，用来显示给玩家看；
     默认（最小括号）用于 fmt/测试。 */
  function groupedForDisplay(child) {
    return child.k === 'or' || child.k === 'and' || child.k === 'imp' || child.k === 'iff' ||
      child.k === 'all' || child.k === 'exists';
  }
  function htmlChild(child, parentKind, side, full) {
    var paren = full ? groupedForDisplay(child) : needsParens(child, parentKind, side);
    return wrapHTML(htmlNode(child, full), paren);
  }
  function htmlPrefix(child, full) {
    var paren = full ? groupedForDisplay(child) : PREC[child.k] < 5;
    return wrapHTML(htmlNode(child, full), paren);
  }
  function htmlBinary(kind, op, a, b, full) {
    return htmlChild(a, kind, 'left', full) + ' <span class="f-op">' + op + '</span> ' +
      htmlChild(b, kind, 'right', full);
  }
  function htmlTerm(term) {
    need(term, '谓词参数');
    if (term.k !== 'var') throw new LogicError('谓词参数必须是变元');
    return '<span class="f-var">' + escapeHTML(requireName(term, '变元')) + '</span>';
  }

  function htmlNode(n, full) {
    need(n, '公式');
    switch (n.k) {
      /* 命题变元按变量显示（数学字体斜体）。 */
      case 'atom': return '<span class="f-var">' + escapeHTML(requireName(n, '原子')) + '</span>';
      case 'var': return '<span class="f-var">' + escapeHTML(requireName(n, '变元')) + '</span>';
      case 'pred':
        if (!Array.isArray(n.args)) throw new LogicError('pred.args 必须是数组');
        if ((n.name === '=' || n.name === '∈') && n.args.length === 2) {
          return htmlTerm(n.args[0]) + '<span class="f-op"> ' + n.name + ' </span>' + htmlTerm(n.args[1]);
        }
        return '<span class="f-name">' + escapeHTML(requireName(n, '谓词')) + '</span>' +
          '<span class="f-paren">(</span>' + n.args.map(htmlTerm).join(', ') + '<span class="f-paren">)</span>';
      case 'not': return '<span class="f-op">¬</span>' + htmlPrefix(n.a, full);
      case 'or': return htmlBinary('or', '∨', n.a, n.b, full);
      case 'and': return htmlBinary('and', '∧', n.a, n.b, full);
      case 'imp': return htmlBinary('imp', '→', n.a, n.b, full);
      case 'iff': return htmlBinary('iff', '↔', n.a, n.b, full);
      case 'all':
        return '<span class="f-quant">∀</span><span class="f-var">' +
          escapeHTML(requireBinder(n)) + '</span> ' + htmlPrefix(n.a, full);
      case 'exists':
        return '<span class="f-quant">∃</span><span class="f-var">' +
          escapeHTML(requireBinder(n)) + '</span> ' + htmlPrefix(n.a, full);
      default: throw new LogicError('未知节点类型：' + n.k);
    }
  }

  /**
   * 转义后的 HTML 片段：变量 .f-var、谓词名 .f-name、运算符 .f-op、括号 .f-paren、量词 .f-quant。
   * options.full = true（或传 'full'）时使用全括号显示。
   */
  function toHTML(n, options) {
    need(n, '公式');
    return htmlNode(n, !!(options === 'full' || (options && options.full)));
  }

  /* =========================================================================
   * 3. 遍历：自由变元 / 原子 / 谓词 / 变元名
   * ========================================================================= */

  function freeVars(n) {
    need(n, '公式');
    var out = Object.create(null);
    (function walk(node, bound) {
      switch (node.k) {
        case 'atom': return;
        case 'var': if (!bound[node.name]) out[node.name] = true; return;
        case 'pred':
          if (!Array.isArray(node.args)) throw new LogicError('pred.args 必须是数组');
          for (var i = 0; i < node.args.length; i += 1) {
            var t = node.args[i];
            need(t, '谓词参数');
            if (t.k === 'var') { if (!bound[t.name]) out[t.name] = true; }
            else { var nested = freeVars(t); for (var j = 0; j < nested.length; j += 1) out[nested[j]] = true; }
          }
          return;
        case 'not': walk(node.a, bound); return;
        case 'or': case 'imp': case 'and': case 'iff':
          walk(node.a, bound); walk(node.b, bound); return;
        case 'all': case 'exists': {
          var next = Object.create(bound);
          next[requireBinder(node)] = true;
          walk(node.a, next);
          return;
        }
        default: throw new LogicError('未知节点类型：' + node.k);
      }
    })(n, Object.create(null));
    return Object.keys(out).sort();
  }

  function atomsOf(n) {
    need(n, '公式');
    var out = Object.create(null);
    (function walk(node) {
      switch (node.k) {
        case 'atom': out[requireName(node, '原子')] = true; return;
        case 'var': case 'pred': return;
        case 'not': walk(node.a); return;
        case 'or': case 'imp': case 'and': case 'iff': walk(node.a); walk(node.b); return;
        case 'all': case 'exists': walk(node.a); return;
        default: throw new LogicError('未知节点类型：' + node.k);
      }
    })(n);
    return Object.keys(out).sort();
  }

  function predicatesOf(n) {
    need(n, '公式');
    var out = Object.create(null);
    (function walk(node) {
      switch (node.k) {
        case 'atom': case 'var': return;
        case 'pred': out[requireName(node, '谓词')] = true; return;
        case 'not': walk(node.a); return;
        case 'or': case 'imp': case 'and': case 'iff': walk(node.a); walk(node.b); return;
        case 'all': case 'exists': walk(node.a); return;
        default: throw new LogicError('未知节点类型：' + node.k);
      }
    })(n);
    return Object.keys(out).sort();
  }

  function isAtom(n) { return !!n && typeof n === 'object' && n.k === 'atom'; }

  /* 所有出现过的个体变元名（自由、约束、绑定都算），freshVar 使用。 */
  function collectVarNames(n, out) {
    need(n, '公式');
    switch (n.k) {
      case 'atom': return;
      case 'var': out[requireName(n, '变元')] = true; return;
      case 'pred':
        if (!Array.isArray(n.args)) throw new LogicError('pred.args 必须是数组');
        for (var i = 0; i < n.args.length; i += 1) {
          var t = n.args[i];
          need(t, '谓词参数');
          if (t.k === 'var') out[requireName(t, '变元')] = true;
          else collectVarNames(t, out);
        }
        return;
      case 'not': collectVarNames(n.a, out); return;
      case 'or': case 'imp': case 'and': case 'iff': collectVarNames(n.a, out); collectVarNames(n.b, out); return;
      case 'all': case 'exists':
        out[requireBinder(n)] = true; collectVarNames(n.a, out); return;
      default: throw new LogicError('未知节点类型：' + n.k);
    }
  }

  /* =========================================================================
   * 4. set.mm 定义展开、稳定 key、定义等价
   * ========================================================================= */

  /**
   * 按 set.mm 的定义展开：
   *   df-or : A∨B  := ¬A→B
   *   df-an : A∧B  := ¬(A→¬B)
   *   dfbi2 : A↔B  := (A→B)∧(B→A)   （set.mm 由 df-bi 导出的展开式）
   *   df-ex : ∃x A := ¬∀x ¬A
   * 规范核只有 ¬ / → / ∀；eq() 仍等价于「展开后结构相同」。
   */
  function expand(n) { need(n, '公式'); return expandNode(n); }

  function expandNode(n) {
    switch (n.k) {
      case 'atom': return { k: 'atom', name: n.name };
      case 'var': return { k: 'var', name: n.name };
      case 'pred':
        if (!Array.isArray(n.args)) throw new LogicError('pred.args 必须是数组');
        return { k: 'pred', name: n.name, args: n.args.map(clone) };
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
          a: {
            k: 'imp',
            a: { k: 'imp', a: p, b: q },
            b: { k: 'not', a: { k: 'imp', a: q, b: p } }
          }
        };
      }
      case 'all': return { k: 'all', v: requireBinder(n), a: expandNode(n.a) };
      case 'exists': {
        var body = expandNode(n.a);
        return { k: 'not', a: { k: 'all', v: requireBinder(n), a: { k: 'not', a: body } } };
      }
      default: throw new LogicError('未知节点类型：' + n.k);
    }
  }

  /** 稳定 key：定义展开 + 约束变元按出现顺序 alpha 规范化（#0、#1…，不会与自由变元冲突）。 */
  function key(n) { need(n, '公式'); return coreKey(expand(n), Object.create(null), { n: 0 }); }

  function coreKey(n, env, counter) {
    var name;
    switch (n.k) {
      case 'atom': return 'A' + JSON.stringify(requireName(n, '原子'));
      case 'var':
        name = requireName(n, '变元');
        return 'V' + JSON.stringify(env[name] || name);
      case 'pred':
        if (!Array.isArray(n.args)) throw new LogicError('pred.args 必须是数组');
        return 'P' + JSON.stringify(requireName(n, '谓词')) + '(' + n.args.map(function (t) {
          if (t && t.k === 'var') return 'V' + JSON.stringify(env[t.name] || t.name);
          return 'T' + JSON.stringify(coreKey(t, env, counter));
        }).join(',') + ')';
      case 'not': return 'N(' + coreKey(n.a, env, counter) + ')';
      case 'or': return 'O(' + coreKey(n.a, env, counter) + ',' + coreKey(n.b, env, counter) + ')';
      case 'imp': return 'I(' + coreKey(n.a, env, counter) + ',' + coreKey(n.b, env, counter) + ')';
      case 'and': return 'A(' + coreKey(n.a, env, counter) + ',' + coreKey(n.b, env, counter) + ')';
      case 'iff': return 'B(' + coreKey(n.a, env, counter) + ',' + coreKey(n.b, env, counter) + ')';
      case 'all': case 'exists': {
        var canon = '#' + counter.n;
        counter.n += 1;
        var next = Object.create(env);
        next[requireBinder(n)] = canon;
        return (n.k === 'all' ? 'Qa' : 'Qe') + '(' + canon + ',' + coreKey(n.a, next, counter) + ')';
      }
      default: throw new LogicError('未知节点类型：' + n.k);
    }
  }

  /** 定义等价 + alpha 等价。 */
  function eq(a, b) { need(a, 'a'); need(b, 'b'); return key(a) === key(b); }

  /* =========================================================================
   * 5. 替换：命题原子、图式实例化、个体变元
   * ========================================================================= */

  function pickFresh(avoid, preferred) {
    var base = isIdentifier(preferred) ? preferred : 'x';
    if (!avoid[base]) { avoid[base] = true; return base; }
    for (var i = 1; i < 100000; i += 1) {
      var cand = base + i;
      if (!avoid[cand]) { avoid[cand] = true; return cand; }
    }
    throw new LogicError('无法生成新的变元名');
  }

  /** 选一个不出现在 node（或 node 数组）中的个体变元名。 */
  function freshVar(n, preferred) {
    var list = Array.isArray(n) ? n : [n];
    if (!list.length) throw new LogicError('freshVar 需要一个公式');
    var avoid = Object.create(null);
    for (var i = 0; i < list.length; i += 1) collectVarNames(list[i], avoid);
    return pickFresh(avoid, preferred);
  }

  /* 把约束变元 from 在 body 中改名；to 必须全新，因此不会捕获。遇到同名内层量词即停。 */
  function renameFreeVar(body, from, to) {
    switch (body.k) {
      case 'atom': return { k: 'atom', name: body.name };
      case 'var': return { k: 'var', name: body.name };
      case 'pred':
        if (!Array.isArray(body.args)) throw new LogicError('pred.args 必须是数组');
        return { k: 'pred', name: body.name, args: body.args.map(function (t) {
          return (t && t.k === 'var') ? { k: 'var', name: t.name === from ? to : t.name } : clone(t);
        }) };
      case 'not': return { k: 'not', a: renameFreeVar(body.a, from, to) };
      case 'or': return { k: 'or', a: renameFreeVar(body.a, from, to), b: renameFreeVar(body.b, from, to) };
      case 'imp': return { k: 'imp', a: renameFreeVar(body.a, from, to), b: renameFreeVar(body.b, from, to) };
      case 'and': return { k: 'and', a: renameFreeVar(body.a, from, to), b: renameFreeVar(body.b, from, to) };
      case 'iff': return { k: 'iff', a: renameFreeVar(body.a, from, to), b: renameFreeVar(body.b, from, to) };
      case 'all': case 'exists':
        if (body.v === from) return clone(body);
        return { k: body.k, v: body.v, a: renameFreeVar(body.a, from, to) };
      default: throw new LogicError('未知节点类型：' + body.k);
    }
  }

  /* instantiate 的核心：把 schema 中的命题原子直接换成 map 里的公式。
   * Metamath 的替换是“逐 token 直接代入”：wff 变元可以被含有约束变元的公式
   * 替换，代换式里的自由变元会被外层量词捕获（这是允许的，不是 bug）。
   * 因此这里不做 alpha 改名；个体变元的替换见 substituteVar。 */
  function substituteAtoms(schema, lookup) {
    return (function go(n) {
      switch (n.k) {
        case 'atom': return hasOwn(lookup, n.name) ? clone(lookup[n.name]) : { k: 'atom', name: n.name };
        case 'var': return { k: 'var', name: n.name };
        case 'pred':
          if (!Array.isArray(n.args)) throw new LogicError('pred.args 必须是数组');
          return { k: 'pred', name: n.name, args: n.args.map(clone) };
        case 'not': return { k: 'not', a: go(n.a) };
        case 'or': return { k: 'or', a: go(n.a), b: go(n.b) };
        case 'imp': return { k: 'imp', a: go(n.a), b: go(n.b) };
        case 'and': return { k: 'and', a: go(n.a), b: go(n.b) };
        case 'iff': return { k: 'iff', a: go(n.a), b: go(n.b) };
        case 'all': case 'exists': return { k: n.k, v: requireBinder(n), a: go(n.a) };
        default: throw new LogicError('未知节点类型：' + n.k);
      }
    })(schema);
  }

  /** 把 schema 里的原子名按 map 同时实例化（Metamath 式直接替换）。 */
  function instantiate(schema, map) {
    need(schema, 'schema');
    if (!map || typeof map !== 'object' || Array.isArray(map)) {
      throw new LogicError('instantiate 需要 “原子名 -> AST” 映射对象');
    }
    var lookup = Object.create(null);
    Object.keys(map).forEach(function (name) {
      var value = map[name];
      need(value, 'map["' + name + '"]');
      lookup[name] = value;
    });
    return substituteAtoms(schema, lookup);
  }

  /** 把所有自由出现的 0 元原子 atomName 替换成 replacement；捕获规避。 */
  function substitute(n, atomName, replacement) {
    need(n, '公式');
    if (typeof atomName !== 'string' || !atomName) throw new LogicError('substitute 需要非空的原子名');
    need(replacement, 'replacement');
    var map = Object.create(null);
    map[atomName] = replacement;
    return instantiate(n, map);
  }

  /**
   * 个体变元替换：把自由出现的 varName 换成 termAst（目前只支持 {k:'var',name}）。
   * 若进入绑定 termAst 自由变元的量词，先把该量词变元改名，避免捕获。
   */
  function substituteVar(n, varName, termAst) {
    need(n, '公式');
    if (typeof varName !== 'string' || !varName) throw new LogicError('substituteVar 需要非空的变元名');
    need(termAst, 'termAst');
    if (termAst.k !== 'var') throw new LogicError('substituteVar 的 termAst 目前只支持 {k:"var"} 个体变元');

    var termFree = [termAst.name];
    var avoid = Object.create(null);
    collectVarNames(n, avoid);
    collectVarNames(termAst, avoid);

    return (function go(node) {
      switch (node.k) {
        case 'atom': return { k: 'atom', name: node.name };
        case 'var': return { k: 'var', name: node.name };
        case 'pred':
          if (!Array.isArray(node.args)) throw new LogicError('pred.args 必须是数组');
          return { k: 'pred', name: node.name, args: node.args.map(function (t) {
            return (t && t.k === 'var' && t.name === varName) ? clone(termAst) : clone(t);
          }) };
        case 'not': return { k: 'not', a: go(node.a) };
        case 'or': return { k: 'or', a: go(node.a), b: go(node.b) };
        case 'imp': return { k: 'imp', a: go(node.a), b: go(node.b) };
        case 'and': return { k: 'and', a: go(node.a), b: go(node.b) };
        case 'iff': return { k: 'iff', a: go(node.a), b: go(node.b) };
        case 'all': case 'exists': {
          var binder = requireBinder(node);
          if (binder === varName) return clone(node);
          var clash = termFree.indexOf(binder) >= 0 && freeVars(node.a).indexOf(varName) >= 0;
          if (!clash) return { k: node.k, v: binder, a: go(node.a) };
          var fresh = pickFresh(avoid, binder);
          return { k: node.k, v: fresh, a: go(renameFreeVar(node.a, binder, fresh)) };
        }
        default: throw new LogicError('未知节点类型：' + node.k);
      }
    })(n);
  }

  /** 构造量化式：quantify('all'|'exists', 'x', ast)。 */
  function quantify(kind, v, ast) {
    need(ast, '公式');
    var k = { all: 'all', forall: 'all', '∀': 'all', exists: 'exists', '∃': 'exists' }[String(kind)];
    if (!k) throw new LogicError('quantify 的量词种类必须是 all / exists');
    var name = (v && typeof v === 'object' && v.k === 'var') ? v.name : v;
    if (!isIdentifier(name)) throw new LogicError('quantify 的变元名无效：' + String(name));
    return { k: k, v: name, a: clone(ast) };
  }

  /* =========================================================================
   * 6. 定义替换选项（单次出现，双向，最多 24 个）
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

  /* dfbi2 折叠：(A→B)∧(B→A) ⇒ A↔B。 */
  function biFold(n) {
    if (n.k !== 'and') return null;
    var l = n.a, r = n.b;
    if (l.k === 'imp' && r.k === 'imp' && eq(l.a, r.b) && eq(l.b, r.a)) {
      return { k: 'iff', a: l.a, b: l.b };
    }
    return null;
  }

  function candidatesAt(n) {
    var list = [];
    if (n.k === 'or') {
      list.push({ def: 'df-or', dir: 'expand', after: { k: 'imp', a: { k: 'not', a: n.a }, b: n.b } });
    }
    if (n.k === 'imp' && n.a.k === 'not') {
      list.push({ def: 'df-or', dir: 'fold', after: { k: 'or', a: n.a.a, b: n.b } });
    }
    if (n.k === 'and') {
      list.push({ def: 'df-an', dir: 'expand', after: {
        k: 'not', a: { k: 'imp', a: n.a, b: { k: 'not', a: n.b } }
      } });
    }
    if (n.k === 'not' && n.a.k === 'imp' && n.a.b.k === 'not') {
      list.push({ def: 'df-an', dir: 'fold', after: { k: 'and', a: n.a.a, b: n.a.b.a } });
    }
    if (n.k === 'iff') {
      list.push({ def: 'dfbi2', dir: 'expand', after: {
        k: 'and', a: { k: 'imp', a: n.a, b: n.b }, b: { k: 'imp', a: n.b, b: n.a }
      } });
    }
    var folded = biFold(n);
    if (folded) list.push({ def: 'dfbi2', dir: 'fold', after: folded });
    if (n.k === 'exists') {
      list.push({ def: 'df-ex', dir: 'expand', after: {
        k: 'not', a: { k: 'all', v: n.v, a: { k: 'not', a: n.a } }
      } });
    }
    if (n.k === 'not' && n.a.k === 'all' && n.a.a.k === 'not') {
      list.push({ def: 'df-ex', dir: 'fold', after: { k: 'exists', v: n.a.v, a: n.a.a.a } });
    }
    return list;
  }

  function replaceAt(node, path, index, replacement) {
    if (index === path.length) return clone(replacement);
    var copy = shallowClone(node);
    copy[path[index]] = replaceAt(node[path[index]], path, index + 1, replacement);
    return copy;
  }

  function nodeAtPath(root, path) {
    var cur = root;
    for (var i = 0; i < path.length; i += 1) cur = cur[path[i]];
    return cur;
  }

  /**
   * 列出所有单次定义替换，最多 24 个，双向：
   *   dir='expand' 展开 →/∧/↔；dir='fold' 把展开式折回。
   * 每项：{id, def, dir, path, label, before, after, result}
   * path 的段为 'a'/'b'；根路径为空数组，对应 id 里写作 '@'。
   */
  function replaceOptions(root) {
    need(root, '公式');
    var out = [];

    function walk(current, path) {
      if (out.length >= MAX_OPTIONS) return;
      var found = candidatesAt(current);
      for (var i = 0; i < found.length && out.length < MAX_OPTIONS; i += 1) {
        var rep = found[i], stem = path.length ? path.join('.') : '@';
        out.push({
          id: rep.def + ':' + rep.dir + ':' + stem,
          def: rep.def,
          dir: rep.dir,
          path: path.slice(),
          label: REPLACE_LABELS[rep.def + ':' + rep.dir],
          before: clone(nodeAtPath(root, path)),
          after: clone(rep.after),
          result: replaceAt(root, path, 0, rep.after)
        });
      }
      if (out.length >= MAX_OPTIONS) return;
      if (current.k === 'not' || current.k === 'all' || current.k === 'exists') {
        walk(current.a, path.concat('a'));
      } else if (BINARY[current.k]) {
        walk(current.a, path.concat('a'));
        walk(current.b, path.concat('b'));
      }
    }

    walk(root, []);
    return out;
  }

  /** 应用 replaceOptions 给出的某个 id；找不到时抛错。 */
  function applyReplacement(root, id) {
    need(root, '公式');
    if (typeof id !== 'string') throw new LogicError('applyReplacement 需要字符串 id');
    var options = replaceOptions(root);
    for (var i = 0; i < options.length; i += 1) {
      if (options[i].id === id) return options[i].result;
    }
    throw new LogicError('找不到替换项：' + id);
  }

  /* =========================================================================
   * 7. 分离与单向匹配
   * ========================================================================= */

  /**
   * 分离：A→B 与 A 得 B，接受任意输入顺序；前件比较用定义等价。
   * 成功 {ok:true, out:B, form:'A→B + A'}；失败 {ok:false, reason}。
   */
  function detach(a, b) {
    need(a, 'a');
    need(b, 'b');
    if (a.k === 'imp' && eq(a.a, b)) return { ok: true, out: clone(a.b), form: 'A→B + A' };
    if (b.k === 'imp' && eq(b.a, a)) return { ok: true, out: clone(b.b), form: 'A→B + A' };
    var reason = (a.k !== 'imp' && b.k !== 'imp')
      ? '两个输入都不是蕴涵式（A→B）'
      : '蕴涵式的前件与另一个输入不定义等值';
    return { ok: false, reason: reason };
  }

  /**
   * 单向匹配 schema → formula。
   * schema 的原子是元变元，可绑定任意公式；同一原子多次出现必须绑定定义等价公式。
   * 谓词名与项结构刚性；量词按 alpha 对应。返回 {原子名: AST} 或 null。
   */
  function match(schema, formula) {
    need(schema, 'schema');
    need(formula, 'formula');
    var binds = Object.create(null), varMap = [];

    function lookupVar(name) {
      for (var i = varMap.length - 1; i >= 0; i -= 1) {
        if (varMap[i].from === name) return varMap[i].to;
      }
      return name;
    }
    function termEqual(s, f) {
      if (!s || !f) return false;
      if (s.k === 'var' && f.k === 'var') return lookupVar(s.name) === f.name;
      return key(s) === key(f);
    }

    var ok = (function go(s, f) {
      if (!s || !f) return false;
      if (s.k === 'atom') {
        if (hasOwn(binds, s.name)) return eq(binds[s.name], f);
        binds[s.name] = clone(f);
        return true;
      }
      if (s.k !== f.k) return false;
      switch (s.k) {
        case 'var': return lookupVar(s.name) === f.name;
        case 'pred':
          if (s.name !== f.name) return false;
          if (!Array.isArray(s.args) || !Array.isArray(f.args) || s.args.length !== f.args.length) return false;
          for (var i = 0; i < s.args.length; i += 1) {
            if (!termEqual(s.args[i], f.args[i])) return false;
          }
          return true;
        case 'not': return go(s.a, f.a);
        case 'or': case 'imp': case 'and': case 'iff': return go(s.a, f.a) && go(s.b, f.b);
        case 'all': case 'exists': {
          varMap.push({ from: s.v, to: f.v });
          var result = go(s.a, f.a);
          varMap.pop();
          return result;
        }
        default: return false;
      }
    })(schema, formula);

    return ok ? binds : null;
  }

  /* =========================================================================
   * 8. 导出
   * ========================================================================= */

  var Logic = {
    parse: parse, fmt: fmt, pretty: pretty, toHTML: toHTML,
    key: key, eq: eq, expand: expand, substitute: substitute,
    freeVars: freeVars, atomsOf: atomsOf, predicatesOf: predicatesOf, isAtom: isAtom,
    replaceOptions: replaceOptions, applyReplacement: applyReplacement,
    detach: detach, instantiate: instantiate, match: match,
    quantify: quantify, substituteVar: substituteVar, freshVar: freshVar
  };

  if (host) {
    host.RSL = host.RSL || {};
    host.RSL.Logic = Logic;
  }
  if (typeof module !== 'undefined' && module && module.exports) module.exports = Logic;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));

