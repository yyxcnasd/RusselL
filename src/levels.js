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
      id: 'RU-09', chapter: 'archive', code: 'RU-09', title: '双重否定', kicker: 'PM *2.14 / 档案定理',
      target: '¬¬P→P',
      brief: '罗素在《数学原理》*2.14 已经证成：两个否定互相抵消。把档案定理接入板子。',
      hint: '从“定理”分类取 PM *2.14，直接接到目标焊盘。',
      teaches: ['档案定理模块', '引用已证结果'],
      allowed: ['theorem:*2.14', 'target'],
      reward: '定理 *2.12',
      note: '这条定理在 Metamath 的 PM 证明记录里是 17 步。公理板把它作为“已完成的历史电路”接入。',
      solution: {
        nodes: [node('t1', 'theorem', 260, 280, { theoremCode: '*2.14' })],
        edges: [edge('t1', 'out', 'target', 'proof')]
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
    {
      id: 'RU-11', chapter: 'archive', code: 'RU-11', title: '否定引入', kicker: 'PM *2.12 / 档案定理',
      target: 'P→¬¬P',
      brief: '反方向：一个命题蕴涵它的双重否定。',
      hint: '取档案定理 *2.12，直接接入。',
      teaches: ['档案定理 *2.12'],
      allowed: ['theorem:*2.12', 'target'],
      reward: '定理 *3.26',
      note: '《数学原理》*2.12。和 *2.14 合起来，双重否定在双向都成立。',
      solution: {
        nodes: [node('t1', 'theorem', 260, 280, { theoremCode: '*2.12' })],
        edges: [edge('t1', 'out', 'target', 'proof')]
      }
    },
    {
      id: 'RU-12', chapter: 'archive', code: 'RU-12', title: '合取消去', kicker: 'PM *3.26 / 档案定理',
      target: '(P∧Q)→P',
      brief: '从“P 且 Q”里取出 P。',
      hint: '档案定理 *3.26 就是合取消去律。',
      teaches: ['合取定义', '档案定理 *3.26'],
      allowed: ['theorem:*3.26', 'target'],
      reward: '定理 *3.13',
      note: '《数学原理》*3.26。合取在 PM 里由 D2 定义。',
      solution: {
        nodes: [node('t1', 'theorem', 260, 280, { theoremCode: '*3.26' })],
        edges: [edge('t1', 'out', 'target', 'proof')]
      }
    },
    {
      id: 'RU-13', chapter: 'archive', code: 'RU-13', title: '德摩根', kicker: 'PM *3.13 / 档案定理',
      target: '¬(P∧Q)→(¬P∨¬Q)',
      brief: '把“并非 P 且 Q”拆成“非 P 或非 Q”。',
      hint: '取档案定理 *3.13。',
      teaches: ['德摩根律', '档案定理 *3.13'],
      allowed: ['theorem:*3.13', 'target'],
      reward: '定理 *4.6',
      note: '《数学原理》*3.13。另一个方向是 *3.14。',
      solution: {
        nodes: [node('t1', 'theorem', 260, 280, { theoremCode: '*3.13' })],
        edges: [edge('t1', 'out', 'target', 'proof')]
      }
    },
    {
      id: 'RU-14', chapter: 'archive', code: 'RU-14', title: '蕴涵的定义', kicker: 'PM *4.6 / 档案定理',
      target: '(P→Q)↔(¬P∨Q)',
      brief: '让“蕴涵”与“非 P 或 Q”正式等值。',
      hint: '档案定理 *4.6 已经是完整等值式。',
      teaches: ['等值定义', '档案定理 *4.6'],
      allowed: ['theorem:*4.6', 'target'],
      reward: '定理 *4.51',
      note: '《数学原理》*4.6。这条定理把 D1 从定义提升为可引用的等值式。',
      solution: {
        nodes: [node('t1', 'theorem', 260, 280, { theoremCode: '*4.6' })],
        edges: [edge('t1', 'out', 'target', 'proof')]
      }
    },
    {
      id: 'RU-15', chapter: 'archive', code: 'RU-15', title: '德摩根等值', kicker: 'PM *4.51 / 档案定理',
      target: '¬(P∧Q)↔(¬P∨¬Q)',
      brief: '德摩根律的双向等值形式。',
      hint: '取档案定理 *4.51。',
      teaches: ['等值式', '档案定理 *4.51'],
      allowed: ['theorem:*4.51', 'target'],
      reward: '进入谓词层',
      note: '《数学原理》*4.51。Metamath 记录中为 127 步；它在这里是一块封装好的历史电路。',
      solution: {
        nodes: [node('t1', 'theorem', 260, 280, { theoremCode: '*4.51' })],
        edges: [edge('t1', 'out', 'target', 'proof')]
      }
    }
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
    LEVELS.push({
      id: 'PM-' + t.code.replace(/[*.]/g, '-'),
      chapter: 'metamath',
      code: t.code,
      title: t.code + (t.name ? ' · ' + t.name : ''),
      kicker: 'METAMATH / PM ' + t.code,
      target: t.formula,
      brief: '',
      hint: '',
      teaches: ['档案定理 ' + t.code],
      allowed: ['theorem:' + t.code, 'target'],
      reward: '—',
      note: '',
      solution: {
        nodes: [node('t1', 'theorem', 260, 280, { theoremCode: t.code })],
        edges: [edge('t1', 'out', 'target', 'proof')]
      }
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
      lv.targetPos = maxX ? { x: maxX + 340, y: Math.min(700, maxY) } : { x: TARGET_X, y: TARGET_Y };
    }
    lv.world = lv.world || { w: 2200, h: 1100 };
    lv.order = i + 1;
  });

  window.RSL.LEVELS = LEVELS;
  window.RSL.TARGET_X = TARGET_X;
  window.RSL.TARGET_Y = TARGET_Y;
})();

