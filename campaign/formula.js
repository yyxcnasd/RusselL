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
function notNot(a) { return not(not(a)); }
function iff(a, b) { return imp(imp(a, b), imp(b, a)); }

module.exports = { atom, term, pred, not, imp, all, notNot, iff };
