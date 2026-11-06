/* 公理板 — static library data: primitive propositions, definitions, parts. */
(function () {
  'use strict';
  window.RSL = window.RSL || {};

  var AXIOMS = [
    {
      id: 'A1', code: '*1.2', name: '重言', en: 'Tautology',
      schema: '(P∨P)→P',
      gloss: '两个 P 的析取蕴涵 P。罗素把这叫作“重言式”。',
      note: '《数学原理》*1.2。在公理板里，它是第一个可以焊上板的原始命题。'
    },
    {
      id: 'A2', code: '*1.3', name: '加法', en: 'Addition',
      schema: 'P→(P∨Q)',
      gloss: 'P 蕴涵 P 或 Q——析取可以向右加入任意命题。',
      note: '《数学原理》*1.3（在 PM 的编号中是 q→(p∨q)，变量命名不同）。'
    },
    {
      id: 'A3', code: '*1.4', name: '交换', en: 'Commutation',
      schema: '(P∨Q)→(Q∨P)',
      gloss: '析取的两个支路可以交换。',
      note: '《数学原理》*1.4。'
    },
    {
      id: 'A4', code: '*1.5', name: '求和', en: 'Summation',
      schema: '(Q→R)→((P∨Q)→(P∨R))',
      gloss: '如果 Q 蕴涵 R，那么在任意 P 的析取语境里，Q 可以被 R 替换。',
      note: '《数学原理》*1.5。它是后面“分离”关卡的核心。'
    }
  ];

  var DEFINITIONS = [
    {
      id: 'D1', code: '*1.01', name: '蕴涵', en: 'Implication',
      lhs: 'A→B', rhs: '¬A∨B',
      gloss: 'A 蕴涵 B，定义为“非 A 或 B”。'
    },
    {
      id: 'D2', code: '*1.02', name: '合取', en: 'Conjunction',
      lhs: 'A∧B', rhs: '¬(¬A∨¬B)',
      gloss: 'A 且 B，定义为“并非（非 A 或非 B）”。'
    },
    {
      id: 'D3', code: '*1.03', name: '等值', en: 'Equivalence',
      lhs: 'A↔B', rhs: '(A→B)∧(B→A)',
      gloss: 'A 与 B 等值，定义为两个方向的蕴涵同时成立。'
    }
  ];

  var ARCHIVE_FALLBACK = {
    '*2.08': { code: '*2.08', name: 'Id', formula: 'P→P', steps: 5, note: '同一律。' },
    '*2.12': { code: '*2.12', name: 'DN+', formula: 'P→¬¬P', steps: 19, note: '双重否定引入。' },
    '*2.14': { code: '*2.14', name: 'DN−', formula: '¬¬P→P', steps: 17, note: '双重否定消去。' },
    '*2.05': { code: '*2.05', name: 'Syll', formula: '(Q→R)→((P→Q)→(P→R))', steps: 7, note: '三段论。' },
    '*2.06': { code: '*2.06', name: 'Syll', formula: '(P→Q)→((Q→R)→(P→R))', steps: 15, note: '三段论的另一种排列。' },
    '*2.1':  { code: '*2.1',  name: 'LEM', formula: '¬P∨P', steps: 17, note: '排中律的析取形式。' },
    '*2.11': { code: '*2.11', name: 'LEM', formula: 'P∨¬P', steps: 5, note: '排中律。' },
    '*3.13': { code: '*3.13', name: 'DeM', formula: '¬(P∧Q)→(¬P∨¬Q)', steps: 47, note: '德摩根律的一个方向。' },
    '*3.26': { code: '*3.26', name: 'Simp', formula: '(P∧Q)→P', steps: 33, note: '合取消去。' },
    '*3.27': { code: '*3.27', name: 'Simp', formula: '(P∧Q)→Q', steps: 27, note: '合取消去。' },
    '*4.51': { code: '*4.51', name: 'DeM', formula: '¬(P∧Q)↔(¬P∨¬Q)', steps: 127, note: '德摩根律。' },
    '*4.6':  { code: '*4.6',  name: 'Imp', formula: '(P→Q)↔(¬P∨Q)', steps: 81, note: '蕴涵的定义式。' }
  };

  var ARCHIVE_ORDER = [
    '*2.08', '*2.05', '*2.06', '*2.12', '*2.14', '*2.1', '*2.11',
    '*3.26', '*3.27', '*3.13', '*4.6', '*4.51'
  ];

  var CHAPTERS = [
    {
      id: 'primitives', code: 'CH.01', title: '原始命题', en: 'PRIMITIVE PROPOSITIONS',
      blurb: '四枚原始命题，先让板子通电。'
    },
    {
      id: 'transform', code: 'CH.02', title: '变形规则', en: 'TRANSFORMATIONS',
      blurb: '代入、定义置换、分离：让公式在板子上移动。'
    },
    {
      id: 'archive', code: 'CH.03', title: '档案定理', en: 'ARCHIVE THEOREMS',
      blurb: '从《数学原理》的定理库接入已经证成的结果。'
    },
    {
      id: 'metamath', code: 'CH.04', title: 'Metamath 题库', en: 'PM PROBLEM SET',
      blurb: '更多《数学原理》命题，按 Metamath 档案编号排列。'
    },
    {
      id: 'predicate', code: 'CH.05', title: '谓词层', en: 'PREDICATE LAYER',
      blurb: '把“所有”和“存在”焊进电路。'
    }
  ];

  function theoremData(code) {
    var list = (window.RSL && window.RSL.THEOREMS) || [];
    var f = ARCHIVE_FALLBACK[code];
    for (var i = 0; i < list.length; i++) {
      if (list[i].code === code) {
        var t = list[i];
        if (f && !t.name) {
          return Object.assign({}, t, { name: f.name, note: f.note });
        }
        return t;
      }
    }
    return f ? { code: f.code, name: f.name, formula: f.formula, proof: '', steps: f.steps, source: 'fallback' } : null;
  }

  function archiveList() {
    var out = [];
    ARCHIVE_ORDER.forEach(function (code) {
      var t = theoremData(code);
      if (!t) return;
      var f = ARCHIVE_FALLBACK[code] || {};
      out.push({
        code: code,
        name: t.name || f.name || '',
        formula: t.formula || f.formula || '',
        steps: t.steps || 0,
        gloss: f.note || '',
        source: t.source || 'Metamath'
      });
    });
    return out;
  }

  /* Palette entries. `key` is what levels put in `allowed`. */
  var PARTS = [
    {
      key: 'atom', kind: 'atom', group: 'build', symbol: 'P', name: '原子命题',
      code: 'U-ATOM', desc: '提供一枚大写字母作为原子命题。', accent: 'copper'
    },
    {
      key: 'not', kind: 'not', group: 'build', symbol: '¬', name: '否定门',
      code: 'U-NOT', desc: '输入合式公式 A，输出 ¬A。', accent: 'copper'
    },
    {
      key: 'or', kind: 'or', group: 'build', symbol: '∨', name: '析取门',
      code: 'U-OR', desc: '输入 A、B，输出 (A∨B)，自动补括号。', accent: 'copper'
    },
    {
      key: 'imp', kind: 'imp', group: 'build', symbol: '→', name: '蕴涵符号',
      code: 'U-IMP', desc: '按定义 D1 合成 A→B 的记法。', accent: 'copper'
    },
    {
      key: 'and', kind: 'and', group: 'build', symbol: '∧', name: '合取符号',
      code: 'U-AND', desc: '按定义 D2 合成 A∧B 的记法。', accent: 'copper'
    },
    {
      key: 'iff', kind: 'iff', group: 'build', symbol: '↔', name: '等值符号',
      code: 'U-IFF', desc: '按定义 D3 合成 A↔B 的记法。', accent: 'copper'
    }
  ];

  AXIOMS.forEach(function (a) {
    PARTS.push({
      key: 'axiom:' + a.id, kind: 'axiom', group: 'axiom', symbol: a.id,
      name: '公理 ' + a.id.slice(1) + ' · ' + a.name,
      code: a.code, desc: a.schema, accent: 'gold',
      config: { axiomId: a.id }
    });
  });

  PARTS.push(
    {
      key: 'subst', kind: 'subst', group: 'rule', symbol: 'S', name: '代入规则',
      code: 'R-SUB', desc: '断言 + 原子 π + 公式 B → 把 π 全部换成 B。', accent: 'copper'
    },
    {
      key: 'replace', kind: 'replace', group: 'rule', symbol: 'D', name: '定义置换',
      code: 'R-DEF', desc: '按 D1–D3 替换断言中的一个定义式。', accent: 'copper'
    },
    {
      key: 'detach', kind: 'detach', group: 'rule', symbol: 'M', name: '分离规则',
      code: 'R-MP', desc: 'A 与 A→B 两路断言输入，输出 B。', accent: 'copper'
    }
  );

  ARCHIVE_ORDER.forEach(function (code) {
    var t = theoremData(code);
    if (!t) return;
    PARTS.push({
      key: 'theorem:' + code, kind: 'theorem', group: 'theorem', symbol: code.replace('*', ''),
      name: '定理 ' + code, code: code,
      desc: t.formula, accent: 'silver', config: { theoremCode: code }
    });
  });

  /* Predicate parts. Added by app after RSL.PREDICATE loads; kept here for a single palette source. */
  function predicateParts() {
    var P = window.RSL && window.RSL.PREDICATE;
    var parts = [];
    if (!P) return parts;
    parts.push(
      { key: 'pred', kind: 'pred', group: 'predicate', symbol: 'F', name: '谓词原子', code: 'U-PRED', desc: '合成 F(x)、R(x,y) 等谓词原子。', accent: 'copper' },
      { key: 'term', kind: 'term', group: 'predicate', symbol: 'x', name: '个体词', code: 'U-TERM', desc: '提供个体变元 x、y、z 或常元 a。', accent: 'copper' },
      { key: 'quant', kind: 'quant', group: 'predicate', symbol: '∀', name: '量词门', code: 'U-QNT', desc: '输入公式，输出 ∀x 或 ∃x 量化式。', accent: 'copper' },
      { key: 'all-elim', kind: 'all-elim', group: 'predicate', symbol: '∀E', name: '全称例化', code: 'R-∀E', desc: '从 ∀x A 得到 A[t/x]。', accent: 'copper' },
      { key: 'all-intro', kind: 'all-intro', group: 'predicate', symbol: '∀I', name: '全称推广', code: 'R-∀I', desc: '从 A 得到 ∀x A（x 不在前提中自由）。', accent: 'copper' },
      { key: 'exists-intro', kind: 'exists-intro', group: 'predicate', symbol: '∃I', name: '存在引入', code: 'R-∃I', desc: '从 A[t/x] 得到 ∃x A。', accent: 'copper' },
      { key: 'exists-elim', kind: 'exists-elim', group: 'predicate', symbol: '∃E', name: '存在消去', code: 'R-∃E', desc: '从 ∃x A 与 A[y/x]→B 得到 B（y 新）。', accent: 'copper' }
    );
    (P.axioms || []).forEach(function (a) {
      parts.push({
        key: 'pred-axiom:' + a.id, kind: 'pred-axiom', group: 'predicate', symbol: a.code || a.id,
        name: a.name, code: a.code || a.id, desc: a.schema, accent: 'gold',
        config: { axiomId: a.id }
      });
    });
    (P.theorems || []).forEach(function (t) {
      parts.push({
        key: 'theorem:' + t.code, kind: 'theorem', group: 'predicate', symbol: t.code,
        name: '定理 ' + t.code, code: t.code, desc: t.formula, accent: 'silver',
        config: { theoremCode: t.code }
      });
    });
    return parts;
  }

  window.RSL.AXIOMS = AXIOMS;
  window.RSL.DEFINITIONS = DEFINITIONS;
  window.RSL.CHAPTERS = CHAPTERS;
  window.RSL.PARTS = PARTS;
  window.RSL.PREDICATE_PARTS = predicateParts;
  window.RSL.theoremData = theoremData;
  window.RSL.archiveList = archiveList;
  window.RSL.ARCHIVE_ORDER = ARCHIVE_ORDER;
  window.RSL.ARCHIVE_FALLBACK = ARCHIVE_FALLBACK;
})();
