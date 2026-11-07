/* 公理板 — set.mm data: axioms, definitions, module palette.
 *
 * Content source: Metamath Proof Explorer (set.mm), github.com/metamath/set.mm
 * develop branch, downloaded 2026-11-07. Public domain (CC0).
 *
 * 本文件只放“可以焊到板上的原始材料”和调色板条目；关卡在 src/levels.js。
 * 约定：所有公理/定义都用 `RSL.AXIOMS` + `axiom:<id>` 模块，不再区分
 *      predicate/theorem 两套数据源。游戏内已证明的关卡结论用
 *      `theorem:<levelId>` 引用，由 src/engine.js 从 RSL.LEVELS 解析。
 */
(function () {
  'use strict';
  window.RSL = window.RSL || {};

  /* ------------------------------------------------------------------ *
   * 原始公理与定义（set.mm）
   * ------------------------------------------------------------------ */
  var AXIOMS = [
    /* 命题演算（Łukasiewicz / Church P2） */
    {
      id: 'ax-1', code: 'ax-1', type: 'axiom', section: 'prop', name: 'Simp', en: 'Simp',
      symbol: 'A1', schema: 'P→(Q→P)',
      gloss: '化简：从“P 且 Q”可以单独断言 P；等价地，P 蕴涵任何前件下的 P。',
      note: 'Metamath set.mm ax-1（Tarski/Łukasiewicz 命题公理 1）。'
    },
    {
      id: 'ax-2', code: 'ax-2', type: 'axiom', section: 'prop', name: 'Frege', en: 'Frege',
      symbol: 'A2', schema: '(P→(Q→R))→((P→Q)→(P→R))',
      gloss: '把同一个前件分配到两个后件上：这是蕴涵的分配律。',
      note: 'Metamath set.mm ax-2。'
    },
    {
      id: 'ax-3', code: 'ax-3', type: 'axiom', section: 'prop', name: 'Transp', en: 'Transp',
      symbol: 'A3', schema: '(¬P→¬Q)→(Q→P)',
      gloss: '换质位：如果非 P 蕴涵非 Q，那么 Q 蕴涵 P。',
      note: 'Metamath set.mm ax-3。'
    },

    /* 定义 */
    {
      id: 'df-or', code: 'df-or', type: 'definition', section: 'prop', name: '析取', en: 'Disjunction',
      symbol: 'Df∨', schema: '(P∨Q)↔(¬P→Q)',
      gloss: '析取由蕴涵定义：P∨Q 就是“非 P 蕴涵 Q”。',
      note: 'Metamath set.mm df-or（定义，不是定理）。'
    },
    {
      id: 'df-an', code: 'df-an', type: 'definition', section: 'prop', name: '合取', en: 'Conjunction',
      symbol: 'Df∧', schema: '(P∧Q)↔¬(P→¬Q)',
      gloss: '合取由蕴涵与否定定义：P∧Q 就是“并非 P 蕴涵非 Q”。',
      note: 'Metamath set.mm df-an（定义）。'
    },
    {
      id: 'dfbi2', code: 'dfbi2', type: 'theorem', section: 'prop', name: '等值桥', en: 'Biconditional bridge',
      symbol: 'Df↔', schema: '(P↔Q)↔((P→Q)∧(Q→P))',
      gloss: '等值就是两个方向的蕴涵同时成立。',
      note: 'Metamath set.mm dfbi2：由原始定义 df-bi 导出的定理；本作把它作为 ↔ 的定义桥。'
    },
    {
      id: 'df-ex', code: 'df-ex', type: 'definition', section: 'pred', name: '存在量词', en: 'Existential quantifier',
      symbol: 'Df∃', schema: '(∃x P)↔(¬∀x ¬P)',
      gloss: '存在就是“并非所有都非”：∃x P 定义为 ¬∀x¬P。',
      note: 'Metamath set.mm df-ex（定义）。'
    },

    /* 谓词演算（Tarski S2） */
    {
      id: 'ax-4', code: 'ax-4', type: 'axiom', section: 'pred', name: '量化蕴涵', en: 'Quantified implication',
      symbol: 'A4', schema: '(∀x (P→Q))→((∀x P)→(∀x Q))',
      gloss: '全称量词分配进蕴涵：如果所有 x 都有 P→Q，那么所有 x 的 P 蕴涵所有 x 的 Q。',
      note: 'Metamath set.mm ax-4。'
    },
    {
      id: 'ax-5', code: 'ax-5', type: 'axiom', section: 'pred', name: '无关量化', en: 'Distinctness',
      symbol: 'A5', schema: 'P→∀x P',
      gloss: '如果 P 里根本没有 x，那么 P 蕴涵“对所有 x 都有 P”。',
      note: 'Metamath set.mm ax-5；带 DV 条件：x 不在 P 中自由。游戏用注记声明这条限制。'
    },
    {
      id: 'ax-10', code: 'ax-10', type: 'axiom', section: 'pred', name: '量化否定', en: 'Quantified negation',
      symbol: 'A10', schema: '¬∀x P→∀x ¬∀x P',
      gloss: '“并非所有 x 都有 P”这件事本身与 x 无关，因此可以被全称量化。',
      note: 'Metamath set.mm ax-10。'
    },
    {
      id: 'ax-11', code: 'ax-11', type: 'axiom', section: 'pred', name: '量词交换', en: 'Quantifier commutation',
      symbol: 'A11', schema: '∀x ∀y P→∀y ∀x P',
      gloss: '两个全称量词可以交换次序。',
      note: 'Metamath set.mm ax-11。'
    },

    /* 等词 */
    {
      id: 'ax-6', code: 'ax-6', type: 'axiom', section: 'eq', name: '存在', en: 'Existence',
      symbol: 'A6', schema: '¬∀x¬x=y',
      gloss: '对任意 y，总有某个 x 等于 y：论域不空。',
      note: 'Metamath set.mm ax-6（等词的存在公理）。'
    },
    {
      id: 'ax-7', code: 'ax-7', type: 'axiom', section: 'eq', name: '相等', en: 'Equality',
      symbol: 'A7', schema: 'x=y→(x=z→y=z)',
      gloss: '相等可以替换：x=y 且 x=z，则 y=z。',
      note: 'Metamath set.mm ax-7。'
    },
    {
      id: 'ax-8', code: 'ax-8', type: 'axiom', section: 'eq', name: '∈ 左替换', en: 'Left equality for membership',
      symbol: 'A8', schema: 'x=y→(x∈z→y∈z)',
      gloss: '相等的个体可以替换 ∈ 的左边。',
      note: 'Metamath set.mm ax-8。'
    },
    {
      id: 'ax-9', code: 'ax-9', type: 'axiom', section: 'eq', name: '∈ 右替换', en: 'Right equality for membership',
      symbol: 'A9', schema: 'x=y→(z∈x→z∈y)',
      gloss: '相等的个体可以替换 ∈ 的右边。',
      note: 'Metamath set.mm ax-9。'
    },
    {
      id: 'ax-12', code: 'ax-12', type: 'axiom', section: 'eq', name: '替换', en: 'Substitution',
      symbol: 'A12', schema: 'x=y→(∀y P→∀x (x=y→P))',
      gloss: '替换原理：在 x=y 的前提下，可以把全称量词里的 y 换成 x。',
      note: 'Metamath set.mm ax-12（当前版本本身无 DV；带 x、y 不同的弱化版是 ax12v）。'
    },
    {
      id: 'ax-13', code: 'ax-13', type: 'axiom', section: 'eq', name: '量化相等', en: 'Quantified equality',
      symbol: 'A13', schema: '¬x=y→(y=z→∀x y=z)',
      gloss: '如果 x 不等于 y，那么“y=z”与 x 无关，可以被 ∀x 量化。',
      note: 'Metamath set.mm ax-13（当前版本本身无 DV；带 x、z 不同的弱化版是 ax13v）。'
    },

    /* 集合论（ZFC，setvar 原始语言） */
    {
      id: 'ax-ext', code: 'ax-ext', type: 'axiom', section: 'set', name: '外延', en: 'Extensionality',
      symbol: 'Ext', schema: '∀z(z∈x↔z∈y)→x=y',
      gloss: '两个集合若含有完全相同的元素，就相等。',
      note: 'Metamath set.mm ax-ext。集合论关卡只用 ∈ 与 = 的原始语言，不引入类抽象。'
    },
    {
      id: 'ax-rep', code: 'ax-rep', type: 'axiom', section: 'set', name: '替换', en: 'Replacement',
      symbol: 'Rep', schema: '∀w∃y∀z(∀y P→z=y)→∃y∀z(z∈y↔∃w(w∈x∧∀y P))',
      gloss: '一个集合在可定义函数下的像仍然是集合。',
      note: 'Metamath set.mm ax-rep。原式中的 φ 是 wff 变元；游戏中用原子 P 占位，属于简化。'
    },
    {
      id: 'ax-pow', code: 'ax-pow', type: 'axiom', section: 'set', name: '幂集', en: 'Power set',
      symbol: 'Pow', schema: '∃y∀z(∀w(w∈z→w∈x)→z∈y)',
      gloss: '每个集合都有幂集：所有子集构成一个集合。',
      note: 'Metamath set.mm ax-pow。'
    },
    {
      id: 'ax-un', code: 'ax-un', type: 'axiom', section: 'set', name: '并集', en: 'Union',
      symbol: 'Un', schema: '∃y∀z(∃w(z∈w∧w∈x)→z∈y)',
      gloss: '每个集合的并仍然是一个集合。',
      note: 'Metamath set.mm ax-un。'
    },
    {
      id: 'ax-reg', code: 'ax-reg', type: 'axiom', section: 'set', name: '正则', en: 'Regularity',
      symbol: 'Reg', schema: '∃y y∈x→∃y(y∈x∧∀z(z∈y→¬z∈x))',
      gloss: '非空集合里有一个“极小”元素，它与集合本身不相交。',
      note: 'Metamath set.mm ax-reg。'
    },
    {
      id: 'ax-inf', code: 'ax-inf', type: 'axiom', section: 'set', name: '无穷', en: 'Infinity',
      symbol: 'Inf', schema: '∃y(x∈y∧∀z(z∈y→∃w(z∈w∧w∈y)))',
      gloss: '存在一个包含 x 且对“后继”封闭的集合。',
      note: 'Metamath set.mm ax-inf。'
    },
    {
      id: 'ax-ac', code: 'ax-ac', type: 'axiom', section: 'set', name: '选择', en: 'Choice',
      symbol: 'AC', schema: '∃y∀z∀w((z∈w∧w∈x)→∃v∀u(∃t((u∈w∧w∈t)∧(u∈t∧t∈y))↔u=v))',
      gloss: '选择公理：每个集合都有一个选择函数。',
      note: 'Metamath set.mm ax-ac。'
    }
  ];

  var DEFINITIONS = AXIOMS.filter(function (a) { return a.type === 'definition'; });

  /* ------------------------------------------------------------------ *
   * 调色板：key 即关卡 allowed 里写的字符串
   * ------------------------------------------------------------------ */
  var PARTS = [
    { key: 'atom', kind: 'atom', group: 'build', symbol: 'P', name: '原子命题', code: 'U-ATOM', desc: '提供一枚大写字母作为原子命题。', accent: 'copper' },
    { key: 'not', kind: 'not', group: 'build', symbol: '¬', name: '否定门', code: 'U-NOT', desc: '输入公式 A，输出 ¬A。', accent: 'copper' },
    { key: 'imp', kind: 'imp', group: 'build', symbol: '→', name: '蕴涵符号', code: 'U-IMP', desc: '输入 A、B，合成 A→B。', accent: 'copper' },
    { key: 'or', kind: 'or', group: 'build', symbol: '∨', name: '析取符号', code: 'U-OR', desc: '按 df-or 合成 A∨B 的记法。', accent: 'copper' },
    { key: 'and', kind: 'and', group: 'build', symbol: '∧', name: '合取符号', code: 'U-AND', desc: '按 df-an 合成 A∧B 的记法。', accent: 'copper' },
    { key: 'iff', kind: 'iff', group: 'build', symbol: '↔', name: '等值符号', code: 'U-IFF', desc: '按 dfbi2 合成 A↔B 的记法。', accent: 'copper' },

    { key: 'pred', kind: 'pred', group: 'predicate', symbol: 'F', name: '谓词原子', code: 'U-PRED', desc: '合成一元谓词原子 F(x)。', accent: 'copper' },
    { key: 'term', kind: 'term', group: 'predicate', symbol: 'x', name: '个体词', code: 'U-TERM', desc: '提供个体变元 x、y、z 或常元 a、b、c。', accent: 'copper' },
    { key: 'quant', kind: 'quant', group: 'predicate', symbol: '∀', name: '量词门', code: 'U-QNT', desc: '输入公式，输出 ∀x 或 ∃x 量化式。', accent: 'copper' },

    { key: 'subst', kind: 'subst', group: 'rule', symbol: 'S', name: '代入规则', code: 'R-SUB', desc: '断言 + 原子 π + 公式 B → 把 π 全部换成 B。', accent: 'copper' },
    { key: 'replace', kind: 'replace', group: 'rule', symbol: 'D', name: '定义置换', code: 'R-DEF', desc: '按 df-or / df-an / dfbi2 / df-ex 双向往返。', accent: 'copper' },
    { key: 'detach', kind: 'detach', group: 'rule', symbol: 'M', name: '分离规则', code: 'R-MP', desc: 'A 与 A→B 两路断言输入，输出 B。', accent: 'copper' },
    { key: 'all-elim', kind: 'all-elim', group: 'predicate', symbol: '∀E', name: '全称例化', code: 'R-∀E', desc: '从 ∀x A 得到 A[t/x]。', accent: 'copper' },
    { key: 'all-intro', kind: 'all-intro', group: 'predicate', symbol: '∀I', name: '全称推广', code: 'R-∀I', desc: '从 A 得到 ∀x A（ax-gen 的规则形态）。', accent: 'copper' },
    { key: 'exists-intro', kind: 'exists-intro', group: 'predicate', symbol: '∃I', name: '存在引入', code: 'R-∃I', desc: '从 A 得到 ∃x A。', accent: 'copper' },
    { key: 'exists-elim', kind: 'exists-elim', group: 'predicate', symbol: '∃E', name: '存在消去', code: 'R-∃E', desc: '从 ∃x A 与 A[y/x]→B 得到 B（y 新）。', accent: 'copper' },
    { key: 'syllogism', kind: 'syllogism', group: 'predicate', symbol: 'HS', name: '假言三段论', code: 'R-HS', desc: '从 A→B 与 B→C 得到 A→C。', accent: 'copper' }
  ];

  AXIOMS.forEach(function (a) {
    PARTS.push({
      key: 'axiom:' + a.id, kind: 'axiom', group: a.section === 'set' ? 'set' : (a.type === 'definition' ? 'definition' : 'axiom'),
      symbol: a.symbol, name: (a.type === 'definition' ? '定义 ' : '公理 ') + a.code + ' · ' + a.name,
      code: a.code, desc: a.schema, accent: a.type === 'definition' ? 'ink' : 'gold',
      config: { axiomId: a.id }
    });
  });

  var CHAPTERS = [
    { id: 'prop', code: 'CH.01', title: '命题', en: 'PROPOSITIONAL CALCULUS', blurb: 'set.mm 的三条命题公理、四个定义与最早的定理。' },
    { id: 'pred', code: 'CH.02', title: '谓词', en: 'PREDICATE CALCULUS', blurb: '全称量词、存在定义与量词的分配、闭包、例化。' },
    { id: 'eq', code: 'CH.03', title: '等词', en: 'EQUALITY', blurb: '等式的存在、替换与量化公理。' },
    { id: 'set', code: 'CH.04', title: '集合论', en: 'SET THEORY', blurb: 'ZFC 公理：外延、替换、幂集、并、正则、无穷、选择。' }
  ];

  function axiomById(id) {
    for (var i = 0; i < AXIOMS.length; i += 1) if (AXIOMS[i].id === id) return AXIOMS[i];
    return null;
  }

  window.RSL.AXIOMS = AXIOMS;
  window.RSL.DEFINITIONS = DEFINITIONS;
  window.RSL.CHAPTERS = CHAPTERS;
  window.RSL.PARTS = PARTS;
  window.RSL.axiomById = axiomById;
})();
