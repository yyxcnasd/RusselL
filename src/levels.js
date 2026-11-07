/* 公理板 — propositional level catalogue and reference circuits. */
(function () {
  'use strict';
  window.RSL = window.RSL || {};

  var N = 2000;
  var TARGET_X = 900;
  var TARGET_Y = 300;

  function node(id, kind, x, y, config) {
    return { id: id, kind: kind, x: x, y: y, config: config || {} };
  }
  function edge(from, fromPort, to, toPort) {
    return { from: { node: from, port: fromPort || 'out' }, to: { node: to, port: toPort } };
  }

  var LEVELS = [
    {
      id: 'RU-01', chapter: 'primitives', code: 'RU-01', title: '重言式', kicker: 'TAUTOLOGY / 起点',
      target: '(P∨P)→P',
      brief: '公理 1 就长这样。把它焊上板，接到目标焊盘。',
      hint: '从左侧“公理”分类里取公理 1，拖它的输出焊盘到目标节点的输入焊盘。',
      teaches: ['接入原始命题', '焊盘连线', '目标接驳'],
      allowed: ['axiom:A1', 'target'],
      reward: '开通下一块板',
      note: '这是《数学原理》*1.2。证明可以短到只有一根铜线。',
      solution: {
        nodes: [node('a1', 'axiom', 260, 280, { axiomId: 'A1' })],
        edges: [edge('a1', 'out', 'target', 'proof')]
      }
    },
    {
      id: 'RU-02', chapter: 'primitives', code: 'RU-02', title: '加法', kicker: 'ADDITION / 原始命题',
      target: 'P→(P∨Q)',
      brief: '公理 2 说：一个命题可以长出自己的析取分支。',
      hint: '公理 2 的图式已经包含 P、Q 两个位置。直接接到目标。',
      teaches: ['公理图式', '多变量断言'],
      allowed: ['axiom:A2', 'target'],
      reward: '开通下一块板',
      note: '《数学原理》*1.3。',
      solution: {
        nodes: [node('a2', 'axiom', 260, 280, { axiomId: 'A2' })],
        edges: [edge('a2', 'out', 'target', 'proof')]
      }
    },
    {
      id: 'RU-03', chapter: 'primitives', code: 'RU-03', title: '交换', kicker: 'COMMUTATION / 原始命题',
      target: '(P∨Q)→(Q∨P)',
      brief: '析取没有方向。把这条原始命题接进目标，验证交换律。',
      hint: '取公理 3。它的输出就是目标断言。',
      teaches: ['析取交换', '直接接驳'],
      allowed: ['axiom:A3', 'target'],
      reward: '开通下一块板',
      note: '《数学原理》*1.4。',
      solution: {
        nodes: [node('a3', 'axiom', 260, 280, { axiomId: 'A3' })],
        edges: [edge('a3', 'out', 'target', 'proof')]
      }
    },
    {
      id: 'RU-04', chapter: 'primitives', code: 'RU-04', title: '求和', kicker: 'SUMMATION / 原始命题',
      target: '(Q→R)→((P∨Q)→(P∨R))',
      brief: '如果 Q 蕴涵 R，那么在任何 P 的析取语境里都能把 Q 换成 R。',
      hint: '公理 4 的输出是一个蕴涵式，直接接到目标。',
      teaches: ['蕴涵', '析取语境里的替换'],
      allowed: ['axiom:A4', 'target'],
      reward: '进入变形规则',
      note: '《数学原理》*1.5。下一章开始，模块会真正开始“变形”。',
      solution: {
        nodes: [node('a4', 'axiom', 260, 280, { axiomId: 'A4' })],
        edges: [edge('a4', 'out', 'target', 'proof')]
      }
    },

    {
      id: 'RU-05', chapter: 'transform', code: 'RU-05', title: '代入', kicker: 'SUBSTITUTION / 变形规则',
      target: '(¬P∨¬P)→¬P',
      brief: '把公理 1 里的每一个 P 都换成 ¬P。',
      hint: '需要三路输入：公理 1、一枚原子 P、以及由否定门生成的 ¬P。原子模块可以同时接到两处。',
      teaches: ['原子模块', '否定门', '代入规则'],
      allowed: ['atom', 'not', 'axiom:A1', 'subst', 'target'],
      reward: '定义置换模块',
      note: '代入规则：如果 ⊢A，那么 ⊢A[π/B]。它把图式变成实例。',
      solution: {
        nodes: [
          node('p1', 'atom', 110, 150, { name: 'P' }),
          node('n1', 'not', 430, 150),
          node('a1', 'axiom', 110, 420, { axiomId: 'A1' }),
          node('s1', 'subst', 650, 300)
        ],
        edges: [
          edge('p1', 'out', 'n1', 'a'),
          edge('p1', 'out', 's1', 'atom'),
          edge('a1', 'out', 's1', 'assertion'),
          edge('n1', 'out', 's1', 'formula'),
          edge('s1', 'out', 'target', 'proof')
        ]
      }
    },
    {
      id: 'RU-06', chapter: 'transform', code: 'RU-06', title: '定义', kicker: 'DEFINITION / 变形规则',
      target: '¬(P∨P)∨P',
      brief: '公理 1 的箭头，按定义 D1 展开后是什么？',
      hint: '把公理 1 接到定义置换模块，选择 D1 的“展开 →”方向。',
      teaches: ['定义 D1', '定义置换'],
      allowed: ['axiom:A1', 'replace', 'target'],
      reward: '分离模块',
      note: 'A→B 定义为 ¬A∨B。定义置换可以双向使用。',
      solution: {
        nodes: [
          node('a1', 'axiom', 150, 300, { axiomId: 'A1' }),
          node('r1', 'replace', 650, 300, { preferDef: 'D1', preferDir: 'expand', preferPath: [] })
        ],
        edges: [
          edge('a1', 'out', 'r1', 'assertion'),
          edge('r1', 'out', 'target', 'proof')
        ]
      }
    },
    {
      id: 'RU-07', chapter: 'transform', code: 'RU-07', title: '分离', kicker: 'DETACHMENT / 变形规则',
      target: '(P∨(P∨P))→(P∨P)',
      brief: '先用公理 4 造出一支“如果 A1，那么目标”的箭头，再用 A1 把箭头点燃。',
      hint: '把公理 4 的 Q 换成 P∨P、R 换成 P；它的前件正好是公理 1。再把两支断言接入分离模块。',
      teaches: ['多次代入', '断言扇出', '分离规则'],
      allowed: ['atom', 'or', 'axiom:A1', 'axiom:A4', 'subst', 'detach', 'target'],
      reward: '第二块分离板',
      note: '分离：从 A 与 A→B 得到 B。这里是整块板第一次“通电”。',
      solution: {
        targetPos: { x: 1640, y: 440 },
        nodes: [
          node('p1', 'atom', 70, 100, { name: 'P' }),
          node('or1', 'or', 400, 100),
          node('a4', 'axiom', 70, 360, { axiomId: 'A4' }),
          node('q1', 'atom', 70, 590, { name: 'Q' }),
          node('s1', 'subst', 740, 360),
          node('r1', 'atom', 70, 780, { name: 'R' }),
          node('s2', 'subst', 1060, 360),
          node('a1', 'axiom', 740, 640, { axiomId: 'A1' }),
          node('m1', 'detach', 1310, 500)
        ],
        edges: [
          edge('p1', 'out', 'or1', 'a'),
          edge('p1', 'out', 'or1', 'b'),
          edge('a4', 'out', 's1', 'assertion'),
          edge('q1', 'out', 's1', 'atom'),
          edge('or1', 'out', 's1', 'formula'),
          edge('s1', 'out', 's2', 'assertion'),
          edge('r1', 'out', 's2', 'atom'),
          edge('p1', 'out', 's2', 'formula'),
          edge('a1', 'out', 'm1', 'a'),
          edge('s2', 'out', 'm1', 'b'),
          edge('m1', 'out', 'target', 'proof')
        ]
      }
    },
    {
      id: 'RU-08', chapter: 'transform', code: 'RU-08', title: '分离 II', kicker: 'DETACHMENT II / 变形规则',
      target: '(P∨P)→(P∨(P∨Q))',
      brief: '这次把公理 4 的 R 换成一整个析取公式。',
      hint: '公理 4 先做 Q:=P，再做 R:=P∨Q。它的前件会变成公理 2，正好可以分离。',
      teaches: ['公式作为替换项', '分离规则'],
      allowed: ['atom', 'or', 'axiom:A2', 'axiom:A4', 'subst', 'detach', 'target'],
      reward: '档案定理 *2.14',
      note: '替换项本身可以是任意合式公式，不只是一个字母。',
      solution: {
        targetPos: { x: 1630, y: 520 },
        nodes: [
          node('p1', 'atom', 70, 80, { name: 'P' }),
          node('q1', 'atom', 70, 250, { name: 'Q' }),
          node('pq', 'or', 400, 190),
          node('pp', 'or', 400, 40),
          node('a4', 'axiom', 70, 430, { axiomId: 'A4' }),
          node('q2', 'atom', 70, 650, { name: 'Q' }),
          node('sq', 'subst', 740, 430),
          node('r1', 'atom', 70, 820, { name: 'R' }),
          node('sr', 'subst', 1040, 430),
          node('a2', 'axiom', 740, 690, { axiomId: 'A2' }),
          node('m1', 'detach', 1320, 560)
        ],
        edges: [
          edge('p1', 'out', 'pq', 'a'),
          edge('q1', 'out', 'pq', 'b'),
          edge('p1', 'out', 'pp', 'a'),
          edge('p1', 'out', 'pp', 'b'),
          edge('a4', 'out', 'sq', 'assertion'),
          edge('q2', 'out', 'sq', 'atom'),
          edge('p1', 'out', 'sq', 'formula'),
          edge('sq', 'out', 'sr', 'assertion'),
          edge('r1', 'out', 'sr', 'atom'),
          edge('pq', 'out', 'sr', 'formula'),
          edge('a2', 'out', 'm1', 'a'),
          edge('sr', 'out', 'm1', 'b'),
          edge('m1', 'out', 'target', 'proof')
        ]
      }
    },


    {
      id: 'RU-10', chapter: 'archive', code: 'RU-10', title: '代入双重否定', kicker: 'DN SUBSTITUTION / 档案定理',
      target: '¬¬(P∨Q)→(P∨Q)',
      brief: '把定理 *2.14 里的 P 整段换成 P∨Q。',
      hint: '先合成 P∨Q，再用代入模块把它送进 *2.14。',
      teaches: ['定理图式实例化', '公式作为代入项'],
      allowed: ['atom', 'or', 'theorem:*2.14', 'subst', 'target'],
      reward: '定理 *3.26',
      note: '这就是“定理图式”的用法：档案定理本身可以继续做代入。',
      solution: {
        targetPos: { x: 1100, y: 320 },
        nodes: [
          node('p1', 'atom', 110, 130, { name: 'P' }),
          node('q1', 'atom', 110, 300, { name: 'Q' }),
          node('pq', 'or', 450, 210),
          node('t1', 'theorem', 110, 500, { theoremCode: '*2.14' }),
          node('s1', 'subst', 760, 330)
        ],
        edges: [
          edge('p1', 'out', 'pq', 'a'),
          edge('q1', 'out', 'pq', 'b'),
          edge('t1', 'out', 's1', 'assertion'),
          edge('p1', 'out', 's1', 'atom'),
          edge('pq', 'out', 's1', 'formula'),
          edge('s1', 'out', 'target', 'proof')
        ]
      }
    },





  ];

  /* The complete PM problem set: every Metamath theorem not already used above. */
  var usedTheorems = {};
  LEVELS.forEach(function (lv) {
    ((lv.solution && lv.solution.nodes) || []).forEach(function (n) {
      if (n.kind === 'theorem' && n.config && n.config.theoremCode) usedTheorems[n.config.theoremCode] = true;
    });
  });
  (window.RSL.THEOREMS || []).forEach(function (t) {
    if (usedTheorems[t.code]) return;
    var Lg = window.RSL.Logic;
    if (!Lg) return;
    var schema = Lg.parse(t.formula);
    var atoms = Lg.atomsOf(schema);
    var atom = atoms[0] || 'P';
    var map = {};
    map[atom] = Lg.parse('P∨Q');
    var target = Lg.fmt(Lg.instantiate(schema, map));
    LEVELS.push({
      id: 'PM-' + t.code.replace(/[*.]/g, '-'),
      chapter: 'metamath',
      code: t.code,
      title: t.code + (t.name ? ' · ' + t.name : ''),
      kicker: 'METAMATH / PM ' + t.code,
      target: target,
      brief: '',
      hint: '',
      teaches: ['档案定理 ' + t.code, '代入实例'],
      allowed: ['atom', 'or', 'subst', 'theorem:' + t.code, 'target'],
      reward: '—',
      note: '',
      solution: {
        nodes: [
          node('pa', 'atom', 60, 120, { name: atom }),
          node('pp', 'atom', 60, 300, { name: 'P' }),
          node('pq', 'atom', 60, 470, { name: 'Q' }),
          node('por', 'or', 360, 380),
          node('pth', 'theorem', 60, 650, { theoremCode: t.code }),
          node('psub', 'subst', 760, 430)
        ],
        edges: [
          edge('pp', 'out', 'por', 'a'),
          edge('pq', 'out', 'por', 'b'),
          edge('pa', 'out', 'psub', 'atom'),
          edge('pth', 'out', 'psub', 'assertion'),
          edge('por', 'out', 'psub', 'formula'),
          edge('psub', 'out', 'target', 'proof')
        ]
      }
    });
  });

  /* Transformation levels: archive theorem + compound substitution, not just a direct card. */
  var SUB_LEVELS = [
    { code: '*2.12', title: '代入 · 双重否定引入', map: { P: 'P∨Q' } },
    { code: '*2.18', title: '代入 · 否定前件', map: { P: 'P∨Q' } },
    { code: '*2.1', title: '代入 · 排中律', map: { P: 'P∨Q' } },
    { code: '*2.11', title: '代入 · 排中律 II', map: { P: 'P∨Q' } },
    { code: '*2.21', title: '代入 · 双命题', map: { P: 'P∨Q', Q: 'R' } },
    { code: '*2.24', title: '代入 · 反向前件', map: { P: 'P∨Q', Q: 'R' } },
    { code: '*2.27', title: '代入 · 双重分离', map: { P: 'P∨Q', Q: 'R' } },
    { code: '*3.22', title: '代入 · 合取交换', map: { P: 'P∨Q', Q: 'R' } },
    { code: '*4.31', title: '代入 · 析取交换', map: { P: 'P∨Q', Q: 'R' } }
  ];
  SUB_LEVELS.forEach(function (spec, si) {
    var th = window.RSL.theoremData ? window.RSL.theoremData(spec.code) : null;
    if (!th || !window.RSL.Logic) return;
    var Lg = window.RSL.Logic;
    var map = {};
    Object.keys(spec.map).forEach(function (k) { map[k] = Lg.parse(spec.map[k]); });
    var target = Lg.fmt(Lg.instantiate(Lg.parse(th.formula), map));
    var nodes = [
      node('p' + si, 'atom', 60, 80, { name: 'P' }),
      node('q' + si, 'atom', 60, 240, { name: 'Q' }),
      node('or' + si, 'or', 340, 150),
      node('th' + si, 'theorem', 60, 430, { theoremCode: spec.code }),
      node('s1' + si, 'subst', 700, 300)
    ];
    var edges = [
      edge('p' + si, 'out', 'or' + si, 'a'),
      edge('q' + si, 'out', 'or' + si, 'b')
    ];
    if (spec.map.Q) {
      nodes.push(node('r' + si, 'atom', 60, 620, { name: 'R' }));
      nodes.push(node('s2' + si, 'subst', 1000, 300));
      // Replace Q first, then P, so the Q introduced by P := P∨Q survives.
      edges.push(edge('th' + si, 'out', 's1' + si, 'assertion'));
      edges.push(edge('q' + si, 'out', 's1' + si, 'atom'));
      edges.push(edge('r' + si, 'out', 's1' + si, 'formula'));
      edges.push(edge('s1' + si, 'out', 's2' + si, 'assertion'));
      edges.push(edge('p' + si, 'out', 's2' + si, 'atom'));
      edges.push(edge('or' + si, 'out', 's2' + si, 'formula'));
      edges.push(edge('s2' + si, 'out', 'target', 'proof'));
    } else {
      edges.push(edge('th' + si, 'out', 's1' + si, 'assertion'));
      edges.push(edge('p' + si, 'out', 's1' + si, 'atom'));
      edges.push(edge('or' + si, 'out', 's1' + si, 'formula'));
      edges.push(edge('s1' + si, 'out', 'target', 'proof'));
    }
    LEVELS.push({
      id: 'SB-' + spec.code.replace(/[*.]/g, '-'),
      chapter: 'transform',
      code: 'SUB ' + spec.code,
      title: spec.title,
      kicker: 'SUBSTITUTION / ' + spec.code,
      target: target,
      brief: '',
      hint: '',
      teaches: ['代入规则', spec.code],
      allowed: ['atom', 'or', 'subst', 'theorem:' + spec.code, 'target'],
      reward: '—',
      note: '',
      solution: { nodes: nodes, edges: edges }
    });
  });

  /* Multi-step inference: archive theorems + substitution + detachment. */
  LEVELS.push({
    id: 'MIX-01',
    chapter: 'transform',
    code: 'MIX-01',
    title: '组合 · 三段论到同一律',
    kicker: 'SUBST + DETACH',
    target: 'P→P',
    brief: '',
    hint: '',
    teaches: ['*2.05', '*2.12', '*2.14', '分离'],
    allowed: ['atom', 'not', 'subst', 'detach', 'theorem:*2.05', 'theorem:*2.12', 'theorem:*2.14', 'target'],
    reward: '—',
    note: '',
    solution: {
      nodes: [
        node('c1p', 'atom', 40, 80, { name: 'P' }),
        node('c1n1', 'not', 300, 80),
        node('c1n2', 'not', 550, 80),
        node('c1t205', 'theorem', 40, 340, { theoremCode: '*2.05' }),
        node('c1q', 'atom', 40, 560, { name: 'Q' }),
        node('c1s1', 'subst', 820, 340),
        node('c1r', 'atom', 40, 760, { name: 'R' }),
        node('c1s2', 'subst', 1080, 340),
        node('c1t12', 'theorem', 820, 620, { theoremCode: '*2.12' }),
        node('c1t14', 'theorem', 820, 820, { theoremCode: '*2.14' }),
        node('c1d1', 'detach', 1360, 560),
        node('c1d2', 'detach', 1620, 560)
      ],
      edges: [
        edge('c1p', 'out', 'c1n1', 'a'),
        edge('c1n1', 'out', 'c1n2', 'a'),
        edge('c1t205', 'out', 'c1s1', 'assertion'),
        edge('c1q', 'out', 'c1s1', 'atom'),
        edge('c1n2', 'out', 'c1s1', 'formula'),
        edge('c1s1', 'out', 'c1s2', 'assertion'),
        edge('c1r', 'out', 'c1s2', 'atom'),
        edge('c1p', 'out', 'c1s2', 'formula'),
        edge('c1t14', 'out', 'c1d1', 'a'),
        edge('c1s2', 'out', 'c1d1', 'b'),
        edge('c1t12', 'out', 'c1d2', 'a'),
        edge('c1d1', 'out', 'c1d2', 'b'),
        edge('c1d2', 'out', 'target', 'proof')
      ]
    }
  });
  LEVELS.push({
    id: 'MIX-02',
    chapter: 'transform',
    code: 'MIX-02',
    title: '组合 · 否定引入',
    kicker: 'SUBST + DETACH',
    target: 'P→¬¬P',
    brief: '',
    hint: '',
    teaches: ['*2.05', '*2.08', '*2.12', '分离'],
    allowed: ['atom', 'not', 'subst', 'detach', 'theorem:*2.05', 'theorem:*2.08', 'theorem:*2.12', 'target'],
    reward: '—',
    note: '',
    solution: {
      nodes: [
        node('c2p', 'atom', 40, 80, { name: 'P' }),
        node('c2n1', 'not', 300, 80),
        node('c2n2', 'not', 550, 80),
        node('c2t205', 'theorem', 40, 340, { theoremCode: '*2.05' }),
        node('c2q', 'atom', 40, 560, { name: 'Q' }),
        node('c2s1', 'subst', 820, 340),
        node('c2r', 'atom', 40, 760, { name: 'R' }),
        node('c2s2', 'subst', 1080, 340),
        node('c2t12', 'theorem', 820, 620, { theoremCode: '*2.12' }),
        node('c2t08', 'theorem', 820, 820, { theoremCode: '*2.08' }),
        node('c2d1', 'detach', 1360, 560),
        node('c2d2', 'detach', 1620, 560)
      ],
      edges: [
        edge('c2p', 'out', 'c2n1', 'a'),
        edge('c2n1', 'out', 'c2n2', 'a'),
        edge('c2t205', 'out', 'c2s1', 'assertion'),
        edge('c2q', 'out', 'c2s1', 'atom'),
        edge('c2p', 'out', 'c2s1', 'formula'),
        edge('c2s1', 'out', 'c2s2', 'assertion'),
        edge('c2r', 'out', 'c2s2', 'atom'),
        edge('c2n2', 'out', 'c2s2', 'formula'),
        edge('c2t12', 'out', 'c2d1', 'a'),
        edge('c2s2', 'out', 'c2d1', 'b'),
        edge('c2t08', 'out', 'c2d2', 'a'),
        edge('c2d1', 'out', 'c2d2', 'b'),
        edge('c2d2', 'out', 'target', 'proof')
      ]
    }
  });

  /* More predicate levels: archived axiom/theorem cards. */
  var PRED_EXTRA = [
    { id: 'PC-06', key: 'pred-axiom:PA1', target: '(∀x F(x))→F(y)', title: '全称例化 · 基本式' },
    { id: 'PC-07', key: 'pred-axiom:DfNotAll', target: '(¬∀x F(x))↔(∃x ¬F(x))', title: '全称否定' },
    { id: 'PC-08', key: 'pred-axiom:DfNotExists', target: '(¬∃x F(x))↔(∀x ¬F(x))', title: '存在否定' },
    { id: 'PC-09', key: 'theorem:*10.12', target: '(∀x (P∨F(x)))→(P∨(∀x F(x)))', title: '量词分配 · 析取' },
    { id: 'PC-10', key: 'theorem:*10.21', target: '(∀x (P→F(x)))↔(P→(∀x F(x)))', title: '量词分配 · 蕴涵' },
    { id: 'PC-11', key: 'theorem:*10.23', target: '(∀x (F(x)→P))↔((∃x F(x))→P)', title: '量词分配 · 存在' }
  ];
  PRED_EXTRA.forEach(function (spec, pi) {
    var kind = spec.key.indexOf('pred-axiom:') === 0 ? 'pred-axiom' : 'theorem';
    var id = spec.key.split(':')[1];
    var cfg = kind === 'pred-axiom' ? { axiomId: id } : { theoremCode: id };
    LEVELS.push({
      id: spec.id,
      chapter: 'predicate',
      code: spec.id,
      title: spec.title,
      kicker: 'PREDICATE / ' + id,
      target: spec.target,
      brief: '',
      hint: '',
      teaches: [spec.title],
      allowed: [spec.key, 'target'],
      reward: '—',
      note: '',
      solution: {
        nodes: [node('px' + pi, kind, 260, 280, cfg)],
        edges: [edge('px' + pi, 'out', 'target', 'proof')]
      }
    });
  });

  /* Equality chapter: quantifier rules applied to the identity axioms. */
  var EQ_LEVELS = [
    { id: 'EQ-01', target: '∀x x=x', title: '等词自反', nodes: [['eqax', 'pred-axiom', 80, 360, { axiomId: 'EQ1' }], ['eqi', 'all-intro', 720, 300, { v: 'x' }]], edges: [['eqax', 'out', 'eqi', 'assertion'], ['eqi', 'out', 'target', 'proof']] },
    { id: 'EQ-02', target: 'a=a', title: '自反实例', nodes: [['eqax', 'pred-axiom', 80, 360, { axiomId: 'EQ1' }], ['eqi', 'all-intro', 620, 300, { v: 'x' }], ['eqe', 'all-elim', 980, 300, { term: 'a' }]], edges: [['eqax', 'out', 'eqi', 'assertion'], ['eqi', 'out', 'eqe', 'assertion'], ['eqe', 'out', 'target', 'proof']] },
    { id: 'EQ-03', target: '∀x∀y(x=y→y=x)', title: '等词对称', nodes: [['eqax', 'pred-axiom', 80, 400, { axiomId: 'EQ2' }], ['eqy', 'all-intro', 660, 300, { v: 'y' }], ['eqx', 'all-intro', 1010, 300, { v: 'x' }]], edges: [['eqax', 'out', 'eqy', 'assertion'], ['eqy', 'out', 'eqx', 'assertion'], ['eqx', 'out', 'target', 'proof']] },
    { id: 'EQ-04', target: 'a=b→b=a', title: '对称实例', nodes: [['eqax', 'pred-axiom', 80, 400, { axiomId: 'EQ2' }], ['eqy', 'all-intro', 560, 300, { v: 'y' }], ['eqx', 'all-intro', 820, 300, { v: 'x' }], ['ex', 'all-elim', 1080, 300, { term: 'a' }], ['ey', 'all-elim', 1320, 300, { term: 'b' }]], edges: [['eqax', 'out', 'eqy', 'assertion'], ['eqy', 'out', 'eqx', 'assertion'], ['eqx', 'out', 'ex', 'assertion'], ['ex', 'out', 'ey', 'assertion'], ['ey', 'out', 'target', 'proof']] },
    { id: 'EQ-05', target: '∀x∀y∀z((x=y∧y=z)→x=z)', title: '等词传递', nodes: [['eqax', 'pred-axiom', 80, 440, { axiomId: 'EQ3' }], ['eqz', 'all-intro', 620, 300, { v: 'z' }], ['eqy', 'all-intro', 880, 300, { v: 'y' }], ['eqx', 'all-intro', 1140, 300, { v: 'x' }]], edges: [['eqax', 'out', 'eqz', 'assertion'], ['eqz', 'out', 'eqy', 'assertion'], ['eqy', 'out', 'eqx', 'assertion'], ['eqx', 'out', 'target', 'proof']] },
    { id: 'EQ-06', target: '(a=b∧b=c)→a=c', title: '传递实例', nodes: [['eqax', 'pred-axiom', 80, 440, { axiomId: 'EQ3' }], ['eqz', 'all-intro', 520, 300, { v: 'z' }], ['eqy', 'all-intro', 760, 300, { v: 'y' }], ['eqx', 'all-intro', 1000, 300, { v: 'x' }], ['ex', 'all-elim', 1240, 300, { term: 'a' }], ['ey', 'all-elim', 1480, 300, { term: 'b' }], ['ez', 'all-elim', 1720, 300, { term: 'c' }]], edges: [['eqax', 'out', 'eqz', 'assertion'], ['eqz', 'out', 'eqy', 'assertion'], ['eqy', 'out', 'eqx', 'assertion'], ['eqx', 'out', 'ex', 'assertion'], ['ex', 'out', 'ey', 'assertion'], ['ey', 'out', 'ez', 'assertion'], ['ez', 'out', 'target', 'proof']] },
    { id: 'EQ-07', target: '∀x∀y(x=y→(F(x)→F(y)))', title: '等词替换', nodes: [['eqax', 'pred-axiom', 80, 400, { axiomId: 'EQ4' }], ['eqy', 'all-intro', 660, 300, { v: 'y' }], ['eqx', 'all-intro', 1010, 300, { v: 'x' }]], edges: [['eqax', 'out', 'eqy', 'assertion'], ['eqy', 'out', 'eqx', 'assertion'], ['eqx', 'out', 'target', 'proof']] },
    { id: 'EQ-08', target: 'a=b→(F(a)→F(b))', title: '替换实例', nodes: [['eqax', 'pred-axiom', 80, 400, { axiomId: 'EQ4' }], ['eqy', 'all-intro', 520, 300, { v: 'y' }], ['eqx', 'all-intro', 760, 300, { v: 'x' }], ['ea', 'all-elim', 1000, 300, { term: 'a' }], ['eb', 'all-elim', 1240, 300, { term: 'b' }]], edges: [['eqax', 'out', 'eqy', 'assertion'], ['eqy', 'out', 'eqx', 'assertion'], ['eqx', 'out', 'ea', 'assertion'], ['ea', 'out', 'eb', 'assertion'], ['eb', 'out', 'target', 'proof']] },
    { id: 'EQ-09', target: '∀x∀y(x=y→(F(y)→F(x)))', title: '反向替换', nodes: [['eqax', 'pred-axiom', 80, 400, { axiomId: 'EQ5' }], ['eqy', 'all-intro', 660, 300, { v: 'y' }], ['eqx', 'all-intro', 1010, 300, { v: 'x' }]], edges: [['eqax', 'out', 'eqy', 'assertion'], ['eqy', 'out', 'eqx', 'assertion'], ['eqx', 'out', 'target', 'proof']] },
    { id: 'EQ-10', target: 'a=b→(F(b)→F(a))', title: '反向替换实例', nodes: [['eqax', 'pred-axiom', 80, 400, { axiomId: 'EQ5' }], ['eqy', 'all-intro', 520, 300, { v: 'y' }], ['eqx', 'all-intro', 760, 300, { v: 'x' }], ['ea', 'all-elim', 1000, 300, { term: 'a' }], ['eb', 'all-elim', 1240, 300, { term: 'b' }]], edges: [['eqax', 'out', 'eqy', 'assertion'], ['eqy', 'out', 'eqx', 'assertion'], ['eqx', 'out', 'ea', 'assertion'], ['ea', 'out', 'eb', 'assertion'], ['eb', 'out', 'target', 'proof']] },
    { id: 'EQ-11', target: '∃x x=x', title: '存在自反', nodes: [['eqax', 'pred-axiom', 80, 360, { axiomId: 'EQ1' }], ['eqe', 'exists-intro', 720, 300, { v: 'x' }]], edges: [['eqax', 'out', 'eqe', 'assertion'], ['eqe', 'out', 'target', 'proof']] }
  ];
  EQ_LEVELS.forEach(function (spec) {
    var nodes = spec.nodes.map(function (n) { return node(n[0], n[1], n[2], n[3], n[4]); });
    var edges = spec.edges.map(function (e) { return edge(e[0], e[1], e[2], e[3]); });
    LEVELS.push({
      id: spec.id,
      chapter: 'equality',
      code: spec.id,
      title: spec.title,
      kicker: 'EQUALITY',
      target: spec.target,
      brief: '',
      hint: '',
      teaches: ['等词公理', '量词规则'],
      allowed: ['pred-axiom:EQ1', 'pred-axiom:EQ2', 'pred-axiom:EQ3', 'pred-axiom:EQ4', 'pred-axiom:EQ5', 'all-intro', 'all-elim', 'exists-intro', 'target'],
      reward: '—',
      note: '',
      solution: { nodes: nodes, edges: edges }
    });
  });

  /* Normalize and add useful defaults. */
  LEVELS.forEach(function (lv, i) {
    lv.index = i;
    lv.chapter = lv.chapter || 'primitives';
    lv.allowed = lv.allowed || [];
    lv.target = lv.target.trim();
    if (!lv.targetPos) {
      var maxX = 0, maxY = TARGET_Y;
      (lv.solution && lv.solution.nodes || []).forEach(function (n) {
        maxX = Math.max(maxX, n.x || 0);
        maxY = Math.max(maxY, n.y || 0);
      });
      lv.targetPos = maxX ? { x: maxX + 340, y: TARGET_Y } : { x: TARGET_X, y: TARGET_Y };
    }
    lv.world = lv.world || { w: 2200, h: 1100 };
    lv.order = i + 1;
  });

  window.RSL.LEVELS = LEVELS;
  window.RSL.TARGET_X = TARGET_X;
  window.RSL.TARGET_Y = TARGET_Y;
})();


