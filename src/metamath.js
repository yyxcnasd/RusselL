/*
 * 公理板 / AXIOM BOARD — Metamath Atlas + 证明带 (proof tape)
 *
 * Static data for the codex sheet "Metamath 图鉴": the wider Metamath ecosystem behind the
 * 193-theorem PM archive, a small set of highlight theorems, verified links, and a tokenizer
 * that turns a condensed-detachment proof string into visual tape tokens.
 *
 * NO NETWORK AT RUNTIME. Every URL below is data to display; nothing is fetched by this file.
 * Nothing is executed: `proofTape()` only labels each character, it does not evaluate proofs.
 *
 * URLs verified 2026-11-06 against https://us.metamath.org/index.html and
 * https://us.metamath.org/other.html:
 *   MPE        https://us.metamath.org/mpeuni/mmset.html          ("Over 40,000 proofs")
 *   ILE        https://us.metamath.org/ileuni/mmil.html
 *   NFE        https://us.metamath.org/nfeuni/mmnf.html
 *   HOLE       https://us.metamath.org/holuni/mmhol.html
 *   Solitaire  https://us.metamath.org/mmsolitaire/mms.html        (193 PM theorems)
 *   Other      https://us.metamath.org/other.html                  (Milpgame, XPuzzle)
 *   Milpgame   https://us.metamath.org/other/milpgame/milpgame.html
 *   XPuzzle    listed on other.html#mmrelated; its own site www.xpuzzle.co did NOT resolve
 *              on 2026-11-06, so the Atlas links to the live Other Topics page instead.
 *              (The site names the app XPuzzle, not "XProof".)
 *
 * Attribution: Metamath site text is public domain; PM (1910–1913) is public domain. Metamath
 * Solitaire's Java source is GPL. This file only stores short factual descriptions and URLs.
 *
 * Exposes:
 *   window.RSL.METAMATH = {families, highlightTheorems, links, proofTape, tapeFor, ...}
 *   window.RSL.proofTape(proof)                     — convenience alias
 */

window.RSL = window.RSL || {};

(function () {
  'use strict';

  var RETRIEVED = '2026-11-06';
  var HOME = 'https://us.metamath.org/index.html';

  /* --- Metamath 生态各 Explorer ------------------------------------------------------- */
  var FAMILIES = [
    {
      id: 'mpe',
      title: 'Metamath Proof Explorer',
      tagline: 'ZFC 集合论 · 40,000+ 定理',
      description: '从 ZFC 集合论公理出发，把数学从零开始形式化：实数、微积分、拓扑与大量经典定理都在此展开。',
      url: 'https://us.metamath.org/mpeuni/mmset.html',
      badge: '40,000+ 定理',
      count: 40000
    },
    {
      id: 'ile',
      title: 'Intuitionistic Logic Explorer',
      tagline: '构造主义逻辑',
      description: '从直觉主义逻辑公理出发的构造性数学，排中律不成立；适合对照经典与非经典证明的差别。',
      url: 'https://us.metamath.org/ileuni/mmil.html',
      badge: '构造主义',
      count: null
    },
    {
      id: 'nfe',
      title: 'New Foundations Explorer',
      tagline: 'Quine 的 NF 集合论',
      description: '从 Quine 的 New Foundations 公理构造数学，是 ZFC 之外另一种集合论基础。',
      url: 'https://us.metamath.org/nfeuni/mmnf.html',
      badge: 'NF 集合论',
      count: null
    },
    {
      id: 'hol',
      title: 'Higher-Order Logic Explorer',
      tagline: 'HOL / 简单类型论',
      description: '从高阶逻辑（简单类型论）出发，并推导出与 ZFC 公理等价的结果，连接两种基础路线。',
      url: 'https://us.metamath.org/holuni/mmhol.html',
      badge: 'HOL',
      count: null
    },
    {
      id: 'solitaire',
      title: 'Metamath Solitaire',
      tagline: '193 条 PM 定理 · 拼装式证明',
      description: '本游戏定理档案的来源：从 ax-1、ax-2、ax-3、ax-mp 出发，可拼出 PM 命题演算的 193 条定理。',
      url: 'https://us.metamath.org/mmsolitaire/mms.html',
      badge: '193 条定理',
      count: 193
    },
    {
      id: 'other',
      title: 'Other Topics / Milpgame',
      tagline: 'Milpgame · XPuzzle · 更多工具',
      description: 'Metamath 周边：Milpgame 证明助手、XPuzzle 公式拼图（外站 xpuzzle.co 在 2026-11-06 无法解析，入口以 Other Topics 页为准），以及验证器、证明助手与 Metamath 100 等资料。',
      url: 'https://us.metamath.org/other.html',
      badge: '工具与游戏',
      count: null
    }
  ];

  /* --- 可点击的外部链接（仅展示，不在运行时访问） -------------------------------------- */
  var LINKS = [
    {
      id: 'home',
      title: 'Metamath 主页',
      url: HOME,
      note: '各 Explorer、下载与文档的总入口'
    },
    {
      id: 'solitaire',
      title: 'Metamath Solitaire',
      url: 'https://us.metamath.org/mmsolitaire/mms.html',
      note: 'Java applet；本作档案证明的原始拼装工具'
    },
    {
      id: 'pmproofs',
      title: 'pmproofs-orig.txt',
      url: 'https://us.metamath.org/mmsolitaire/pmproofs-orig.txt',
      note: '193 条 PM 定理的 condensed-detachment 证明原文'
    },
    {
      id: 'pmproofs-current',
      title: 'pmproofs.txt（较新版本）',
      url: 'https://us.metamath.org/mmsolitaire/pmproofs.txt',
      note: '站方持续更新的最短证明；本作仍使用契约指定的 orig 版'
    },
    {
      id: 'mpe-theorems',
      title: 'MPE 定理列表',
      url: 'https://us.metamath.org/mpeuni/mmtheorems.html',
      note: '按名称与编号浏览 set.mm 全部定理'
    },
    {
      id: 'metamath-100',
      title: 'Metamath 100',
      url: 'https://us.metamath.org/mm_100.html',
      note: '100 个著名定理的形式化进度'
    },
    {
      id: 'milpgame',
      title: 'Milpgame',
      url: 'https://us.metamath.org/other/milpgame/milpgame.html',
      note: 'Filip Cernatescu 的 Java 证明助手与验证器'
    },
    {
      id: 'xpuzzle',
      title: 'XPuzzle（经 Other Topics）',
      url: 'https://us.metamath.org/other.html#mmrelated',
      note: '公式拼图 Android 应用；外站 xpuzzle.co 在 2026-11-06 无法解析'
    }
  ];

  /* --- 6–10 条重点定理（数据来自 assets/data/pm-proofs.md，193 条之内的子集） ----------- */
  var HIGHLIGHTS = [
    {
      code: '*1.3',
      name: 'Add',
      formula: '(Q → (P ∨ Q))',
      steps: 1,
      note: '一步公理实例：最短的“加法”定理。'
    },
    {
      code: '*2.1',
      name: '',
      formula: '(¬ P ∨ P)',
      steps: 17,
      note: '排中律的 PM 形式：P 或非 P。'
    },
    {
      code: '*2.08',
      name: 'Id',
      formula: '(P → P)',
      steps: 5,
      note: '恒等：最短的非公理定理之一，序章奖励。'
    },
    {
      code: '*2.12',
      name: '',
      formula: '(P → ¬ ¬ P)',
      steps: 19,
      note: '双重否定引入。'
    },
    {
      code: '*2.14',
      name: '',
      formula: '(¬ ¬ P → P)',
      steps: 17,
      note: '双重否定消去，契约点名的首个档案定理模块。'
    },
    {
      code: '*3.26',
      name: 'Simp',
      formula: '((P ∧ Q) → P)',
      steps: 33,
      note: '合取化简（左）。'
    },
    {
      code: '*4.6',
      name: '',
      formula: '((P → Q) ↔ (¬ P ∨ Q))',
      steps: 81,
      note: '蕴涵与析取的定义桥：D1 的双向形式。'
    },
    {
      code: '*4.51',
      name: '',
      formula: '(¬ (P ∧ Q) ↔ (¬ P ∨ ¬ Q))',
      steps: 127,
      note: '德摩根律：否定穿过合取。'
    },
    {
      code: '*4.39',
      name: '',
      formula: '(((P ↔ R) ∧ (Q ↔ S)) → ((P ∨ Q) ↔ (R ∨ S)))',
      steps: 913,
      note: '全部 193 条中最长的证明（913 步）。'
    },
    {
      code: '*4.87',
      name: '',
      formula: '(((((P ∧ Q) → R) ↔ (P → (Q → R))) ∧ ((P → (Q → R)) ↔ (Q → (P → R)))) ∧ ((Q → (P → R)) ↔ ((Q ∧ P) → R)))',
      steps: 531,
      note: '唯一在原文中换行书写的复合定理，531 步。'
    }
  ];

  /* --- 证明带：只标注 token，不执行 ----------------------------------------------------- */
  var TOKEN_MAP = {
    '1': { kind: 'axiom', label: 'ax-1' },
    '2': { kind: 'axiom', label: 'ax-2' },
    '3': { kind: 'axiom', label: 'ax-3' },
    'D': { kind: 'detach', label: 'ax-mp' }
  };

  var TOKEN_LEGEND = [
    { token: '1', kind: 'axiom', label: 'ax-1', meaning: '公理 1 入栈' },
    { token: '2', kind: 'axiom', label: 'ax-2', meaning: '公理 2 入栈' },
    { token: '3', kind: 'axiom', label: 'ax-3', meaning: '公理 3 入栈' },
    { token: 'D', kind: 'detach', label: 'ax-mp', meaning: '分离规则，弹出两条、压入结论' }
  ];

  /**
   * Tokenize a condensed-detachment proof string ("1", "2", "3", "D") for a visual tape.
   * Does NOT execute or verify anything. `index` is 0-based position in the string.
   * Throws on unknown characters so archive data errors surface immediately.
   *
   * @param {string} proof e.g. 'DD2D13D2D1D3DD2DD2D13DD2D1311'
   * @returns {Array<{token:string,index:number,kind:'axiom'|'detach',label:string}>}
   */
  function proofTape(proof) {
    if (typeof proof !== 'string') {
      throw new TypeError('proofTape: expected a proof string');
    }
    var tape = [];
    for (var i = 0; i < proof.length; i++) {
      var ch = proof.charAt(i);
      var entry = TOKEN_MAP[ch];
      if (!entry) {
        throw new Error('proofTape: invalid token "' + ch + '" at index ' + i);
      }
      tape.push({
        token: ch,
        index: i,
        kind: entry.kind,
        label: entry.label
      });
    }
    return tape;
  }

  /** Tape for an archived theorem code; null if the theorem is unknown. */
  function tapeFor(code) {
    if (!window.RSL || typeof window.RSL.getTheorem !== 'function') return null;
    var theorem = window.RSL.getTheorem(code);
    if (!theorem) return null;
    return {
      code: theorem.code,
      formula: theorem.formula,
      steps: theorem.steps,
      tape: proofTape(theorem.proof)
    };
  }

  function getFamily(id) {
    for (var i = 0; i < FAMILIES.length; i++) {
      if (FAMILIES[i].id === id) return FAMILIES[i];
    }
    return null;
  }

  function getHighlight(code) {
    var key = String(code == null ? '' : code).replace(/^\s*\*/, '').trim();
    if (!key) return null;
    for (var i = 0; i < HIGHLIGHTS.length; i++) {
      if (HIGHLIGHTS[i].code === '*' + key) return HIGHLIGHTS[i];
    }
    return null;
  }

  window.RSL.METAMATH = {
    source: HOME,
    retrieved: RETRIEVED,
    families: FAMILIES,
    highlightTheorems: HIGHLIGHTS,
    links: LINKS,
    tokenLegend: TOKEN_LEGEND,
    proofTape: proofTape,
    tapeFor: tapeFor,
    getFamily: getFamily,
    getHighlight: getHighlight,
    caveat: '图鉴只展示 Metamath 生态的数据与链接；游戏运行时不做任何网络请求，也不执行证明搜索。'
  };

  /* Convenience alias for code that only needs the tape. */
  window.RSL.proofTape = proofTape;
})();

