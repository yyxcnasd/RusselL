/* 作者侧演绎定理（DT）工具：把假设下的推导转成纯希尔伯特证明。 */
'use strict';
const F = require('../../campaign/formula.js');
const P = require('../../campaign/proof.js');

function leaf(t, f) { return { t, f }; }
function hyp(f) { return { t: null, f, hyp: true }; }
function splitImp(f) {
  if (!Array.isArray(f) || f[0] !== '(') return null;
  const body = f.slice(1, -1);
  let depth = 0;
  for (let i = 0; i < body.length; i += 1) {
    if (body[i] === '(') depth += 1;
    else if (body[i] === ')') depth -= 1;
    else if (depth === 0 && body[i] === '->') return { ant: body.slice(0, i), cons: body.slice(i + 1) };
  }
  return null;
}
function same(a, b) { return a.join(' ') === b.join(' '); }
/* 嵌套 DT：内层消去后仍可能依赖外层假设，此时 t 先留空；
 * 结构（a/b/of）必须保留，供外层 DT 继续消去。 */
function mpp(a, b) {
  const ia = splitImp(a.f), ib = splitImp(b.f);
  const t = a.t && b.t ? P.mp(a.t, b.t) : null;
  if (ia && same(ia.ant, b.f)) return { t, f: ia.cons, a: b, b: a, op: 'mp' };
  if (ib && same(ib.ant, a.f)) return { t, f: ib.cons, a, b, op: 'mp' };
  throw new Error('mpp: 前件不匹配\n a=' + a.f.join(' ') + '\n b=' + b.f.join(' '));
}
function gen(node, v) {
  return { t: node.t ? P.gen(node.t, v) : null, f: F.all(v, node.f), op: 'gen', v, of: node };
}
function dt(node, H) {
  if (node.hyp) {
    if (same(node.f, H)) return leaf(P.subst(P.thm(1), { atoms: { P: H } }), F.imp(H, H));
    const a1 = leaf(P.subst(P.ax('A1'), { atoms: { P: node.f, Q: H } }), F.imp(node.f, F.imp(H, node.f)));
    return mpp(node, a1);
  }
  if (node.op === 'gen') {
    const inner = dt(node.of, H);            // H → A（t 可能为空，结构必须保留）
    const g = gen(inner, node.v);
    const shift = leaf(P.subst(P.thm(64), { atoms: { P: H, Q: node.of.f } }),
      F.imp(F.all(node.v, F.imp(H, node.of.f)), F.imp(H, F.all(node.v, node.of.f))));
    return mpp(g, shift);
  }
  if (node.op === 'mp' && node.a) {
    const da = dt(node.a, H), db = dt(node.b, H);
    const a2 = leaf(P.subst(P.ax('A2'), { atoms: { P: H, Q: node.a.f, R: node.f } }),
      F.imp(F.imp(H, F.imp(node.a.f, node.f)), F.imp(F.imp(H, node.a.f), F.imp(H, node.f))));
    return mpp(da, mpp(db, a2));
  }
  const a1 = leaf(P.subst(P.ax('A1'), { atoms: { P: node.f, Q: H } }), F.imp(node.f, F.imp(H, node.f)));
  return mpp(node, a1);
}
module.exports = { leaf, hyp, mpp, gen, dt, splitImp, same };
