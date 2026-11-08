/* 关卡作者侧：公式构造器（返回 canonical token 体，不带类型码）。 */
'use strict';

function atom(name) { return [String(name)]; }
function term(name) { return [String(name)]; }
function pred(name, t1, t2) {
  if (name === '=') return [t1[0], '=', t2[0]];
  return [name, '('].concat(t1, [')']);
}
function not(a) { return ['-.'].concat(a); }
function imp(a, b) { return ['('].concat(a, ['->'], b, [')']); }
function all(v, a) { return ['A.', String(v)].concat(a); }
function exists(v, a) { return ['E.', String(v)].concat(a); }
function mem(a, b) { return [a[0], 'e.', b[0]]; }
function and(a, b) { return ['('].concat(a, ['/\\'], b, [')']); }
function or(a, b) { return ['('].concat(a, ['\\/'], b, [')']); }
function iff(a, b) { return ['('].concat(a, ['<->'], b, [')']); }
function notNot(a) { return not(not(a)); }
function iff(a, b) { return ['('].concat(a, ['<->'], b, [')']); }

module.exports = { atom, term, pred, not, imp, all, exists, mem, and, or, iff, notNot };
