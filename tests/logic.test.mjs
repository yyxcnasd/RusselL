import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/**
 * 以“经典脚本”方式装载 src/logic.js：
 * 不依赖 package.json 的模块类型，同时验证 window.RSL.Logic 与 module.exports 两个出口。
 */
const source = readFileSync(new URL('../src/logic.js', import.meta.url), 'utf8');

function loadLogic() {
  const windowObj = {};
  const moduleObj = { exports: {} };
  const factory = new Function('window', 'module', 'exports', source);
  factory(windowObj, moduleObj, moduleObj.exports);
  return { Logic: moduleObj.exports, windowObj };
}

const { Logic, windowObj } = loadLogic();
const {
  parse, fmt, pretty, toHTML, key, eq, expand, substitute,
  freeVars, atomsOf, predicatesOf, isAtom, replaceOptions,
  applyReplacement, detach, instantiate, match, quantify,
  substituteVar, freshVar
} = Logic;

/* ---- 小工具 ---- */
const atom = (name) => ({ k: 'atom', name });
const vr = (name) => ({ k: 'var', name });
const pred = (name, ...args) => ({ k: 'pred', name, args });

function collectKinds(ast, out) {
  out.add(ast.k);
  switch (ast.k) {
    case 'not':
      collectKinds(ast.a, out);
      break;
    case 'or':
    case 'imp':
    case 'and':
    case 'iff':
      collectKinds(ast.a, out);
      collectKinds(ast.b, out);
      break;
    case 'all':
    case 'exists':
      collectKinds(ast.a, out);
      break;
    default:
      break;
  }
  return out;
}

/* =========================================================================
 * 装载与导出
 * ========================================================================= */

test('classic script exposes window.RSL.Logic and module.exports', () => {
  assert.ok(windowObj.RSL, 'window.RSL 应存在');
  assert.equal(windowObj.RSL.Logic, Logic);
  assert.equal(typeof Logic.parse, 'function');
  const required = [
    'parse', 'fmt', 'toHTML', 'key', 'eq', 'expand',
    'substitute', 'freeVars', 'atomsOf', 'predicatesOf', 'isAtom',
    'replaceOptions', 'applyReplacement', 'detach', 'instantiate',
    'match', 'quantify', 'substituteVar', 'freshVar', 'pretty'
  ];
  for (const name of required) assert.equal(typeof Logic[name], 'function', name);
});

/* =========================================================================
 * 解析
 * ========================================================================= */

test('parse: Unicode 与 ASCII 等价', () => {
  const pairs = [
    ['¬P∨Q', '~P v Q'],
    ['P→Q', 'P -> Q'],
    ['P∧Q', 'P ^ Q'],
    ['P↔Q', 'P <-> Q'],
    ['∀x F(x)', 'forall x F(x)'],
    ['∃x F(x)', 'exists x F(x)'],
    ['¬¬P', '~~P'],
    ['P→(Q∧R)', 'P -> (Q ^ R)'],
    ['F(x, y)', 'F(x,y)']
  ];
  for (const [unicode, ascii] of pairs) {
    assert.deepStrictEqual(parse(ascii), parse(unicode), `${ascii} 应等于 ${unicode}`);
  }
});

test('parse: 优先级与结合性', () => {
  assert.deepStrictEqual(parse('P'), atom('P'));
  assert.deepStrictEqual(parse('F(x, y)'), pred('F', vr('x'), vr('y')));
  assert.deepStrictEqual(parse('F()'), atom('F'));
  assert.deepStrictEqual(parse('P∨Q∧R'), {
    k: 'or',
    a: atom('P'),
    b: { k: 'and', a: atom('Q'), b: atom('R') }
  });
  assert.deepStrictEqual(parse('P→Q→R'), {
    k: 'imp',
    a: atom('P'),
    b: { k: 'imp', a: atom('Q'), b: atom('R') }
  });
  assert.deepStrictEqual(parse('P↔Q↔R'), {
    k: 'iff',
    a: atom('P'),
    b: { k: 'iff', a: atom('Q'), b: atom('R') }
  });
  assert.deepStrictEqual(parse('P↔Q→R'), {
    k: 'iff',
    a: atom('P'),
    b: { k: 'imp', a: atom('Q'), b: atom('R') }
  });
  assert.deepStrictEqual(parse('P∨Q∨R'), {
    k: 'or',
    a: { k: 'or', a: atom('P'), b: atom('Q') },
    b: atom('R')
  });
  assert.deepStrictEqual(parse('(P∨P)→P'), {
    k: 'imp',
    a: { k: 'or', a: atom('P'), b: atom('P') },
    b: atom('P')
  });
  /* 量词体取一元公式：∀x F(x) → G 即 (∀x F(x)) → G */
  assert.deepStrictEqual(parse('∀x F(x)→G'), {
    k: 'imp',
    a: { k: 'all', v: 'x', a: pred('F', vr('x')) },
    b: atom('G')
  });
  assert.deepStrictEqual(parse('∀x (F(x)→G(x))'), {
    k: 'all',
    v: 'x',
    a: {
      k: 'imp',
      a: pred('F', vr('x')),
      b: pred('G', vr('x'))
    }
  });
});

test('parse: 错误输入给出带位置的错误', () => {
  const bad = ['P→', '(P∨Q', 'P $ Q', '∀x', 'F(x,)', 'P Q', '', '∀ (P)'];
  for (const text of bad) {
    assert.throws(
      () => parse(text),
      (error) => error instanceof Error && /语法错误/.test(error.message),
      `应当拒绝：${JSON.stringify(text)}`
    );
  }
  try {
    parse('P→');
  } catch (error) {
    assert.match(error.message, /@3/);
  }
});

/* =========================================================================
 * fmt / toHTML
 * ========================================================================= */

test('fmt: 最小括号与 parse/fmt 往返', () => {
  assert.equal(fmt(parse('((P∨Q))→P')), 'P∨Q→P');
  assert.equal(fmt(parse('(P→Q)→R')), '(P→Q)→R');
  assert.equal(fmt(parse('P→(Q→R)')), 'P→Q→R');
  assert.equal(fmt(parse('P∧(Q∧R)')), 'P∧(Q∧R)');
  assert.equal(fmt(parse('(P∧Q)∧R')), 'P∧Q∧R');
  assert.equal(fmt(parse('¬(P∨Q)')), '¬(P∨Q)');
  assert.equal(fmt(parse('¬¬P')), '¬¬P');
  assert.equal(fmt(parse('∀x F(x)')), '∀x F(x)');
  assert.equal(fmt(parse('∀x (F(x)→G(x))')), '∀x (F(x)→G(x))');
  assert.equal(fmt(parse('∃x∀y R(x, y)')), '∃x ∀y R(x, y)');
  assert.equal(fmt(parse('(P↔Q)↔R')), '(P↔Q)↔R');
  assert.equal(fmt(parse('P↔(Q↔R)')), 'P↔Q↔R');
  assert.equal(pretty(parse('P→Q')), fmt(parse('P→Q')));

  const formulas = [
    '(P∨P)→P',
    'P→(P∨Q)',
    '(P∨Q)→(Q∨P)',
    '(Q→R)→((P∨Q)→(P∨R))',
    '(¬P∨¬P)→¬P',
    '¬¬P→P',
    '(P↔Q)∧¬R',
    '∀x (F(x)→∃y R(x, y))',
    '∀x F(x)',
    '¬(¬P∨¬Q)'
  ];
  for (const text of formulas) {
    const ast = parse(text);
    assert.deepStrictEqual(parse(fmt(ast)), ast, `往返失败：${text}`);
  }
});

test('toHTML: 转义、span 类与最小括号', () => {
  const html = toHTML(parse('¬(P∨Q)→∀x F(x, y)'));
  for (const cls of ['f-var', 'f-op', 'f-paren', 'f-quant', 'f-name']) {
    assert.ok(html.includes(`class="${cls}"`), `缺少 .${cls}`);
  }
  assert.equal(toHTML(parse('P∨Q')).includes('f-paren'), false);
  assert.ok(toHTML(parse('¬(P∨Q)')).includes('f-paren'));

  const evil = toHTML({ k: 'atom', name: '<script>&"' });
  assert.equal(evil.includes('<script'), false);
  assert.ok(evil.includes('&lt;script&gt;'));
  assert.ok(evil.includes('&amp;'));
  assert.ok(evil.includes('&quot;'));

  const predHTML = toHTML(pred('F', vr('x')));
  assert.ok(predHTML.includes('class="f-name"'));
  assert.ok(predHTML.includes('class="f-var"'));
});

/* =========================================================================
 * 展开 / key / eq
 * ========================================================================= */

test('expand: D1/D2/D3 展开到核心语言', () => {
  assert.deepStrictEqual(expand(parse('P→Q')), parse('¬P∨Q'));
  assert.deepStrictEqual(expand(parse('P∧Q')), parse('¬(¬P∨¬Q)'));
  assert.deepStrictEqual(expand(parse('P↔Q')), parse('¬(¬(¬P∨Q)∨¬(¬Q∨P))'));

  const kinds = collectKinds(expand(parse('(P→Q)↔(P∧(Q∨R))')), new Set());
  for (const forbidden of ['imp', 'and', 'iff']) {
    assert.equal(kinds.has(forbidden), false, `展开后不应含 ${forbidden}`);
  }
  for (const k of kinds) {
    assert.ok(['atom', 'pred', 'var', 'not', 'or', 'all', 'exists'].includes(k), `意外节点 ${k}`);
  }
});

test('key/eq: 定义等价与 alpha 等价', () => {
  assert.equal(typeof key(parse('P→Q')), 'string');
  assert.equal(key(parse('P→Q')), key(parse('¬P∨Q')));
  assert.equal(key(parse('∀x F(x)')), key(parse('∀y F(y)')));

  assert.equal(eq(parse('P→Q'), parse('¬P∨Q')), true);
  assert.equal(eq(parse('P∧Q'), parse('¬(¬P∨¬Q)')), true);
  assert.equal(eq(parse('P↔Q'), parse('(P→Q)∧(Q→P)')), true);
  assert.equal(eq(parse('∀x F(x)'), parse('∀y F(y)')), true);
  assert.equal(eq(parse('∀x∃y R(x, y)'), parse('∀a∃b R(a, b)')), true);

  assert.equal(eq(parse('P∨Q'), parse('Q∨P')), false);
  assert.equal(eq(parse('∀x F(x)'), parse('∃x F(x)')), false);
  assert.equal(eq(parse('∀x∀y R(x, y)'), parse('∀y∀x R(x, y)')), false);
  assert.equal(eq(parse('∀x F(x)'), parse('∀x F(y)')), false);
});

test('freeVars / atomsOf / predicatesOf / isAtom', () => {
  assert.deepStrictEqual(freeVars(parse('∀x F(x, y, z)')), ['y', 'z']);
  assert.deepStrictEqual(freeVars(parse('∀x F(x)∧G(y)')), ['y']);
  assert.deepStrictEqual(freeVars(parse('P')), []);
  assert.deepStrictEqual(freeVars(parse('∃y R(x, y)∧∀x F(x, z)')), ['x', 'z']);

  assert.deepStrictEqual(atomsOf(parse('P→(Q∧P)')), ['P', 'Q']);
  assert.deepStrictEqual(atomsOf(parse('∀x F(x)')), []);

  assert.deepStrictEqual(predicatesOf(parse('F(x)∧G(y)∨F(z)')), ['F', 'G']);
  assert.deepStrictEqual(predicatesOf(parse('P→Q')), []);

  assert.equal(isAtom(parse('P')), true);
  assert.equal(isAtom(parse('P→Q')), false);
  assert.equal(isAtom(null), false);
});

/* =========================================================================
 * 替换
 * ========================================================================= */

test('substitute: 原子替换与捕获规避', () => {
  assert.deepStrictEqual(substitute(parse('P∧Q'), 'P', parse('R')), parse('R∧Q'));
  assert.deepStrictEqual(substitute(parse('P'), 'P', parse('(Q∨R)')), parse('Q∨R'));
  assert.deepStrictEqual(substitute(parse('∀x F(x)'), 'P', parse('R')), parse('∀x F(x)'));

  /* 替换式自由变元 y 进入 ∀y 作用域时必须给量词改名。 */
  const sub = substitute(parse('∀y (P→F(y))'), 'P', parse('G(y)'));
  assert.equal(sub.k, 'all');
  assert.notEqual(sub.v, 'y');
  assert.deepStrictEqual(freeVars(sub), ['y']);
  assert.equal(eq(sub, parse('∀y1 (G(y)→F(y1))')), true);

  /* 同时实例化多个原子，且只替换一次（不递归替换替换式内部）。 */
  const inst = instantiate(parse('P→(P∨Q)'), { P: parse('¬R'), Q: parse('S') });
  assert.deepStrictEqual(inst, parse('¬R→(¬R∨S)'));
  assert.deepStrictEqual(instantiate(parse('P'), { P: parse('P') }), parse('P'));

  const cap = instantiate(parse('∀y (P→F(y))'), { P: parse('G(y)') });
  assert.deepStrictEqual(freeVars(cap), ['y']);
  assert.equal(eq(cap, parse('∀y1 (G(y)→F(y1))')), true);
});

test('substituteVar: 个体变元替换与捕获规避', () => {
  assert.deepStrictEqual(substituteVar(parse('F(x, y)'), 'x', vr('z')), parse('F(z, y)'));
  assert.deepStrictEqual(substituteVar(parse('∀x F(x)'), 'x', vr('y')), parse('∀x F(x)'));

  const cap = substituteVar(parse('∀y R(x, y)'), 'x', vr('y'));
  assert.equal(cap.v, 'y1');
  assert.deepStrictEqual(freeVars(cap), ['y']);
  assert.equal(eq(cap, parse('∀y1 R(y, y1)')), true);

  const cap2 = substituteVar(parse('∀x F(x, y)'), 'y', vr('x'));
  assert.equal(cap2.v, 'x1');
  assert.deepStrictEqual(freeVars(cap2), ['x']);
});

test('quantify / freshVar', () => {
  assert.deepStrictEqual(quantify('all', 'x', parse('F(x)')), parse('∀x F(x)'));
  assert.deepStrictEqual(quantify('exists', vr('y'), parse('P')), parse('∃y P'));
  assert.throws(() => quantify('some', 'x', parse('P')), /all \/ exists/);
  assert.throws(() => quantify('all', '1bad', parse('P')), /变元名无效/);

  assert.equal(freshVar(parse('∀x F(x, y)'), 'x'), 'x1');
  assert.equal(freshVar(parse('∀x F(x, y)'), 'z'), 'z');
  assert.equal(freshVar(parse('F(x)')), 'x1');
  assert.equal(freshVar([parse('F(x)'), parse('G(y)')], 'x'), 'x1');
});

/* =========================================================================
 * 定义替换
 * ========================================================================= */

test('replaceOptions: 展开与折叠双向、id 稳定、最多 24 个', () => {
  const ast = parse('(P→Q)∧P');
  const options = replaceOptions(ast);
  assert.ok(options.length >= 2 && options.length <= 24);
  assert.equal(new Set(options.map((o) => o.id)).size, options.length);

  const d1 = options.find((o) => o.def === 'D1' && o.dir === 'expand');
  assert.ok(d1);
  assert.deepStrictEqual(d1.path, ['a']);
  assert.equal(typeof d1.label, 'string');
  assert.deepStrictEqual(d1.before, parse('P→Q'));
  assert.deepStrictEqual(d1.after, parse('¬P∨Q'));
  assert.deepStrictEqual(d1.result, parse('(¬P∨Q)∧P'));

  const d2 = options.find((o) => o.def === 'D2' && o.dir === 'expand');
  assert.ok(d2);
  assert.deepStrictEqual(d2.result, parse('¬(¬(P→Q)∨¬P)'));

  const d1fold = replaceOptions(parse('¬P∨Q')).find((o) => o.def === 'D1' && o.dir === 'fold');
  assert.ok(d1fold);
  assert.deepStrictEqual(d1fold.result, parse('P→Q'));

  const d2fold = replaceOptions(parse('¬(¬P∨¬Q)')).find((o) => o.def === 'D2' && o.dir === 'fold');
  assert.ok(d2fold);
  assert.deepStrictEqual(d2fold.result, parse('P∧Q'));

  const d3fold = replaceOptions(parse('(P→Q)∧(Q→P)')).find((o) => o.def === 'D3' && o.dir === 'fold');
  assert.ok(d3fold);
  assert.deepStrictEqual(d3fold.result, parse('P↔Q'));

  const d3core = replaceOptions(parse('(¬P∨Q)∧(¬Q∨P)')).find((o) => o.def === 'D3' && o.dir === 'fold');
  assert.ok(d3core);
  assert.deepStrictEqual(d3core.result, parse('P↔Q'));

  const d3expand = replaceOptions(parse('P↔Q')).find((o) => o.def === 'D3' && o.dir === 'expand');
  assert.ok(d3expand);
  assert.deepStrictEqual(d3expand.result, parse('(P→Q)∧(Q→P)'));

  /* applyReplacement 与列表一致、幂等，未知 id 抛错。 */
  assert.deepStrictEqual(applyReplacement(ast, d1.id), d1.result);
  const again = replaceOptions(ast);
  assert.deepStrictEqual(again.map((o) => o.id), options.map((o) => o.id));
  assert.deepStrictEqual(again.map((o) => o.result), options.map((o) => o.result));
  assert.throws(() => applyReplacement(ast, 'no-such-id'), /找不到替换项/);

  let big = 'P';
  for (let i = 0; i < 30; i += 1) big = `(${big}∧P)`;
  assert.equal(replaceOptions(parse(big)).length, 24);
});

/* =========================================================================
 * 分离与匹配
 * ========================================================================= */

test('detach: A→B + A，接受交换顺序，前件按定义等价比较', () => {
  const r1 = detach(parse('(P∨P)→P'), parse('P∨P'));
  assert.equal(r1.ok, true);
  assert.deepStrictEqual(r1.out, parse('P'));
  assert.equal(r1.form, 'A→B + A');

  const r2 = detach(parse('P∨P'), parse('(P∨P)→P'));
  assert.equal(r2.ok, true);
  assert.deepStrictEqual(r2.out, parse('P'));

  const r3 = detach(parse('(P↔Q)→R'), parse('(P→Q)∧(Q→P)'));
  assert.equal(r3.ok, true);
  assert.deepStrictEqual(r3.out, parse('R'));

  const r4 = detach(parse('P→Q'), parse('R'));
  assert.equal(r4.ok, false);
  assert.equal(typeof r4.reason, 'string');

  const r5 = detach(parse('P'), parse('Q'));
  assert.equal(r5.ok, false);
  assert.equal(typeof r5.reason, 'string');
});

test('match: 单向匹配、alpha 对应与定义等价的一致性', () => {
  const m1 = match(parse('P→P'), parse('(A∨B)→(A∨B)'));
  assert.ok(m1);
  assert.equal(eq(m1.P, parse('A∨B')), true);

  assert.equal(match(parse('P→P'), parse('A→B')), null);

  const m2 = match(parse('∀x F(x)'), parse('∀y F(y)'));
  assert.ok(m2);
  assert.deepStrictEqual(Object.keys(m2), []);

  const m3 = match(parse('∀x (P→F(x))'), parse('∀y (Q→F(y))'));
  assert.ok(m3);
  assert.equal(eq(m3.P, parse('Q')), true);

  assert.equal(match(parse('F(x)'), parse('G(x)')), null, '谓词名刚性');
  assert.equal(match(parse('F(x)'), parse('F(y)')), null, '自由变元刚性');
  assert.equal(match(parse('P∧P'), parse('Q→Q')), null, '结构必须匹配');

  const m4 = match(parse('P→P'), parse('(A→B)→(¬A∨B)'));
  assert.ok(m4);
  assert.equal(eq(m4.P, parse('A→B')), true);
});

/* =========================================================================
 * 10 条命题恒等式（定义展开后结构相同）
 * ========================================================================= */

test('10 条已知命题恒等式', () => {
  const identities = [
    ['P→Q', '¬P∨Q'],
    ['P∧Q', '¬(¬P∨¬Q)'],
    ['P↔Q', '(P→Q)∧(Q→P)'],
    ['P↔Q', '¬(¬(¬P∨Q)∨¬(¬Q∨P))'],
    ['P→(Q→R)', '¬P∨(¬Q∨R)'],
    ['(P∧Q)→R', '¬¬(¬P∨¬Q)∨R'],
    ['P∧(Q∨R)', '¬(¬P∨¬(Q∨R))'],
    ['P∨(Q∧R)', 'P∨¬(¬Q∨¬R)'],
    ['P→(Q∧R)', '¬P∨¬(¬Q∨¬R)'],
    ['(P↔Q)∨R', '((P→Q)∧(Q→P))∨R']
  ];
  assert.equal(identities.length, 10);
  for (const [left, right] of identities) {
    assert.equal(eq(parse(left), parse(right)), true, `${left} ≡ ${right}`);
  }
});

/* =========================================================================
 * 契约里的关卡断言字符串都能解析
 * ========================================================================= */

test('契约公式样本可解析', () => {
  const samples = [
    '(P∨P)→P',
    'P→(P∨Q)',
    '(P∨Q)→(Q∨P)',
    '(Q→R)→((P∨Q)→(P∨R))',
    '(¬P∨¬P)→¬P',
    '¬¬P→P',
    'F(x)→∃y R(x, y)',
    '∀x (F(x)→G(x))'
  ];
  for (const text of samples) {
    const ast = parse(text);
    assert.equal(typeof fmt(ast), 'string');
    assert.equal(typeof key(ast), 'string');
  }
});
