/* 关卡作者侧：证明项 DSL。
 *
 * 证明项是对电路的高层描述；`scripts/build-campaign.js` 负责把它展开成棋盘节点/导线，
 * 只为“公式怎么搭、节点放哪”做布局，不发明任何结论。
 */
'use strict';

module.exports = {
  ax: (schema) => ({ op: 'axiom', schema }),
  thm: (n) => ({ op: 'lemma', n }),
  subst: (of, maps) => ({ op: 'subst', of, atoms: (maps && maps.atoms) || {}, vars: (maps && maps.vars) || null }),
  mp: (a, b) => ({ op: 'mp', a, b }),
  gen: (of, v) => ({ op: 'gen', of, v }),
  allE: (of, t) => ({ op: 'allE', of, t }),
  allDist: (of) => ({ op: 'allDist', of }),
  eqRefl: (t) => ({ op: 'eqRefl', t }),
  eqSubst: (eq, of, dir) => ({ op: 'eqSubst', eq, of, dir: dir || 'l2r' }),
  leibniz: (x, y, formula, opts) => ({ op: 'leibniz', x, y, formula,
    mode: (opts && opts.mode) || 'abstract', v: (opts && opts.v) || 'z' })
};
