/* 关卡作者侧：证明项 DSL。
 *
 * 证明项是对电路的高层描述；`scripts/build-campaign.js` 负责把它展开成棋盘节点/导线，
 * 只为“公式怎么搭、节点放哪”做布局，不发明任何结论。
 */
'use strict';

module.exports = {
  ax: (schema, cfg) => ({ op: 'axiom', schema, v: cfg && cfg.v }),
  shift: (formula, v) => ({ op: 'shift', formula, v }),
  thm: (n) => ({ op: 'lemma', n }),
  subst: (of, maps) => ({ op: 'subst', of, atoms: (maps && maps.atoms) || {}, vars: (maps && maps.vars) || null }),
  mp: (a, b) => ({ op: 'mp', a, b }),
  gen: (of, v) => ({ op: 'gen', of, v }),
  eqRefl: (t) => ({ op: 'eqRefl', t }),
  leibniz: (x, y, formula, opts) => ({ op: 'leibniz', x, y, formula,
    mode: (opts && opts.mode) || 'abstract', v: (opts && opts.v) || 'z' }),
  andIntroAx: (a, b) => ({ op: 'andIntroAx', a, b }),
  andElimAx: (a, b, side) => ({ op: 'andElimAx', a, b, side }),
  orIntroAx: (a, b, side) => ({ op: 'orIntroAx', a, b, side }),
  orElimAx: (a, b, c) => ({ op: 'orElimAx', a, b, c }),
  iffIntroAx: (a, b) => ({ op: 'iffIntroAx', a, b }),
  iffElimAx: (a, b, dir) => ({ op: 'iffElimAx', a, b, dir }),
  allInst: (formula, v, t) => ({ op: 'allInst', formula, v, t }),
  existsGen: (formula, v, t) => ({ op: 'existsGen', formula, v, t }),
  existsE: (ex, imp) => ({ op: 'existsE', ex, imp }),
  setExt: (a, b) => ({ op: 'setExt', a, b }),
  setEmpty: () => ({ op: 'setEmpty' }),
  setPair: (u, v) => ({ op: 'setPair', u, v }),
  setUnion: (a) => ({ op: 'setUnion', a })
};
