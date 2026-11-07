/* 公理板 — 48 关：Metamath set.mm 的命题 / 谓词 / 等词 / 集合论。
 *
 * 数据来源：assets/data/set.mm（Metamath Proof Explorer，develop，2026-11-07）。
 * 四章各 12 关，同章顺序解锁。参考电路由 tests/levels.test.js 逐关用
 * src/engine.js 实际求值；不允许引用未来的关卡（theorem:<id> 只能指向更早的 id）。
 */
(function () {
  'use strict';
  window.RSL = window.RSL || {};

  var TARGET_Y = 300;

  function n(id, kind, x, y, config) {
    return { id: id, kind: kind, x: x, y: y, config: config || {} };
  }
  function e(from, fromPort, to, toPort) {
    return { from: { node: from, port: fromPort || 'out' }, to: { node: to, port: toPort } };
  }
  function ax(id, x, y, axiomId) { return n(id, 'axiom', x, y, { axiomId: axiomId }); }
  function th(id, x, y, levelId) { return n(id, 'theorem', x, y, { theoremCode: levelId }); }
  function atom(id, x, y, name) { return n(id, 'atom', x, y, { name: name }); }
  function pred(id, x, y, name, arg) { return n(id, 'pred', x, y, { name: name, arg: arg }); }
  function subst(id, x, y) { return n(id, 'subst', x, y); }
  function detach(id, x, y) { return n(id, 'detach', x, y); }
  function alli(id, x, y, v) { return n(id, 'all-intro', x, y, { v: v }); }
  function alle(id, x, y, term) { return n(id, 'all-elim', x, y, { term: term }); }

  function level(spec) {
    spec.chapter = spec.chapter;
    spec.code = spec.code || spec.id;
    spec.target = spec.target.trim();
    spec.allowed = spec.allowed || [];
    spec.solution = spec.solution || { nodes: [], edges: [] };
    return spec;
  }

  var LEVELS = [];

  /* =====================================================================
   * Ⅰ 命题（set.mm ax-1..ax-3、df-or / df-an / dfbi2、早期定理）
   * ===================================================================== */

  LEVELS.push(level({
    id: 'CH1-01', chapter: 'prop', code: 'CH1-01', title: '化简', kicker: 'ax-1 / Simp',
    target: 'P→(Q→P)',
    brief: 'set.mm 的第一条命题公理：P 蕴涵“任何 Q 都蕴涵 P”。',
    hint: '从左侧公理里取 ax-1，直接接到目标焊盘。',
    teaches: ['公理即元件', '焊盘连线'],
    allowed: ['axiom:ax-1', 'target'],
    note: 'Metamath set.mm ax-1。',
  solution: {
      nodes: [ax('a1', 260, 280, 'ax-1')],
      edges: [e('a1', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH1-02', chapter: 'prop', code: 'CH1-02', title: '分配前件', kicker: 'ax-2 / Frege',
    target: '(P→(Q→R))→((P→Q)→(P→R))',
    brief: '同一个前件可以分配到两个后件上。',
    hint: '取 ax-2，输出直接就是目标。',
    teaches: ['蕴涵分配', '多变量图式'],
    allowed: ['axiom:ax-2', 'target'],
    note: 'Metamath set.mm ax-2。',
  solution: {
      nodes: [ax('a2', 260, 280, 'ax-2')],
      edges: [e('a2', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH1-03', chapter: 'prop', code: 'CH1-03', title: '换质位', kicker: 'ax-3 / Transp',
    target: '(¬P→¬Q)→(Q→P)',
    brief: '如果“非 P 蕴涵非 Q”，那么 Q 蕴涵 P。',
    hint: '取 ax-3，直接接目标。',
    teaches: ['否定', '换质位'],
    allowed: ['axiom:ax-3', 'target'],
    note: 'Metamath set.mm ax-3。',
  solution: {
      nodes: [ax('a3', 260, 280, 'ax-3')],
      edges: [e('a3', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH1-04', chapter: 'prop', code: 'CH1-04', title: '析取的定义', kicker: 'df-or',
    target: '(P∨Q)↔(¬P→Q)',
    brief: 'set.mm 没有把 ∨ 当原始符号，而是用 → 和 ¬ 定义它。',
    hint: '取定义 df-or。',
    teaches: ['定义不是定理', '∨ 由 → 定义'],
    allowed: ['axiom:df-or', 'target'],
    note: 'Metamath set.mm df-or。“定义”在 Metamath 里是一条可消去的公理。',
  solution: {
      nodes: [ax('d1', 260, 280, 'df-or')],
      edges: [e('d1', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH1-05', chapter: 'prop', code: 'CH1-05', title: '合取的定义', kicker: 'df-an',
    target: '(P∧Q)↔¬(P→¬Q)',
    brief: '合取也不是原始的：P∧Q 就是“并非 P 蕴涵非 Q”。',
    hint: '取定义 df-an。',
    teaches: ['∧ 由 →/¬ 定义'],
    allowed: ['axiom:df-an', 'target'],
    note: 'Metamath set.mm df-an。',
  solution: {
      nodes: [ax('d2', 260, 280, 'df-an')],
      edges: [e('d2', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH1-06', chapter: 'prop', code: 'CH1-06', title: '等值的定义', kicker: 'dfbi2',
    target: '(P↔Q)↔((P→Q)∧(Q→P))',
    brief: '等值就是两个方向的蕴涵都成立。',
    hint: '取 dfbi2（set.mm 由 df-bi 导出的定理桥）。',
    teaches: ['↔ 由两个 → 定义'],
    allowed: ['axiom:dfbi2', 'target'],
    note: 'Metamath set.mm dfbi2：由 df-bi 导出的 assertion-form 定理；本作把它作为 ↔ 的桥。',
  solution: {
      nodes: [ax('d3', 260, 280, 'dfbi2')],
      edges: [e('d3', 'out', 'target', 'proof')]
    }
  }));

  /* 7–12：命题定理。7 号（同一律）手工给出；8–12 的参考电路由
     scripts/prove.js 生成后填入（允许使用前面关卡的 theorem:<id>）。 */

  LEVELS.push(level({
    id: 'CH1-07', chapter: 'prop', code: 'CH1-07', title: '同一律', kicker: 'id',
    target: 'P→P',
    brief: '用 ax-1 与 ax-2 做三次分离，把 P 推回它自己。',
    hint: '先取两条 ax-1 实例与一条 ax-2 实例；先分离出 (P→P)→(P→P)，再分离出 P→P。',
    teaches: ['多步分离', '代入实例', '公理扇出'],
    allowed: ['atom', 'imp', 'axiom:ax-1', 'axiom:ax-2', 'subst', 'detach', 'target'],
    note: 'set.mm 的 id 定理；这条 6 步证明也出现在很多逻辑教材里。',
  solution: {
      nodes: [
        atom('p', 60, 80, 'P'),
        n('pp', 'imp', 300, 80),
        ax('a1a', 60, 300, 'ax-1'),
        atom('q1', 60, 500, 'Q'),
        subst('s1', 540, 300),
        ax('a1b', 60, 680, 'ax-1'),
        atom('q2', 300, 680, 'Q'),
        subst('s2', 800, 300),
        ax('a2', 60, 860, 'ax-2'),
        atom('q3', 300, 860, 'Q'),
        subst('s3', 1040, 300),
        atom('r1', 540, 860, 'R'),
        subst('s4', 1280, 300),
        detach('m1', 1560, 300),
        detach('m2', 1840, 300)
      ],
      edges: [
        e('p', 'out', 'pp', 'a'),
        e('p', 'out', 'pp', 'b'),
        e('a1a', 'out', 's1', 'assertion'),
        e('q1', 'out', 's1', 'atom'),
        e('pp', 'out', 's1', 'formula'),
        e('a1b', 'out', 's2', 'assertion'),
        e('q2', 'out', 's2', 'atom'),
        e('p', 'out', 's2', 'formula'),
        e('a2', 'out', 's3', 'assertion'),
        e('q3', 'out', 's3', 'atom'),
        e('pp', 'out', 's3', 'formula'),
        e('s3', 'out', 's4', 'assertion'),
        e('r1', 'out', 's4', 'atom'),
        e('p', 'out', 's4', 'formula'),
        e('s1', 'out', 'm1', 'a'),
        e('s4', 'out', 'm1', 'b'),
        e('s2', 'out', 'm2', 'a'),
        e('m1', 'out', 'm2', 'b'),
        e('m2', 'out', 'target', 'proof')
      ]
    }
  }));

  /* 8–10：用前面关卡的结论 + 代入 + 分离/三段论拼出的定理。 */

  LEVELS.push(level({
    id: 'CH1-08', chapter: 'prop', code: 'CH1-08', title: '前置同一', kicker: 'idd',
    target: 'P→(Q→Q)',
    brief: '从同一律 P→P 出发，先把 P 换成 Q，再把 Q→Q 塞进 ax-1。',
    hint: '引用 CH1-07（同一律），把 P 换成 Q，得到 Q→Q；再用 ax-1 把它变成 (Q→Q)→(P→(Q→Q))，最后分离。',
    teaches: ['引用已证结论', '代入复合公式', '分离'],
    allowed: ['atom', 'axiom:ax-1', 'theorem:CH1-07', 'subst', 'detach', 'target'],
    note: 'set.mm 的 idd 是 id 的直接推论。',
  solution: {
      nodes: [
        th('t7', 60, 120, 'CH1-07'),
        atom('p', 60, 380, 'P'),
        atom('q', 60, 540, 'Q'),
        subst('s1', 380, 300),
        ax('a1', 60, 720, 'ax-1'),
        atom('s', 60, 880, 'S'),
        subst('s2', 700, 300),
        subst('s3', 1020, 300),
        subst('s4', 1340, 300),
        detach('m1', 1660, 300)
      ],
      edges: [
        e('t7', 'out', 's1', 'assertion'),
        e('p', 'out', 's1', 'atom'),
        e('q', 'out', 's1', 'formula'),
        e('a1', 'out', 's2', 'assertion'),
        e('q', 'out', 's2', 'atom'),
        e('s', 'out', 's2', 'formula'),
        e('s2', 'out', 's3', 'assertion'),
        e('p', 'out', 's3', 'atom'),
        e('s1', 'out', 's3', 'formula'),
        e('s3', 'out', 's4', 'assertion'),
        e('s', 'out', 's4', 'atom'),
        e('p', 'out', 's4', 'formula'),
        e('s1', 'out', 'm1', 'a'),
        e('s4', 'out', 'm1', 'b'),
        e('m1', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH1-09', chapter: 'prop', code: 'CH1-09', title: '两层前件', kicker: 'ax1w',
    target: 'P→(Q→(S→Q))',
    brief: '在 ax-1 的结论前面再套一层前件。',
    hint: '先用 ax-1 做出 Q→(S→Q)（先 Q:=S，再 P:=Q），再用 ax-1 给它加上前件 P。',
    teaches: ['嵌套蕴涵', '代入顺序'],
    allowed: ['atom', 'axiom:ax-1', 'subst', 'detach', 'target'],
    note: 'set.mm 的 ax1w。',
  solution: {
      nodes: [
        ax('a1', 60, 120, 'ax-1'),
        atom('p', 60, 380, 'P'),
        atom('q', 60, 540, 'Q'),
        atom('s', 60, 700, 'S'),
        subst('s1', 380, 300),
        subst('s2', 700, 300),
        ax('a1b', 60, 880, 'ax-1'),
        atom('t', 60, 1040, 'T'),
        subst('s3', 1020, 300),
        subst('s4', 1340, 300),
        subst('s5', 1660, 300),
        detach('m1', 1980, 300)
      ],
      edges: [
        e('a1', 'out', 's1', 'assertion'),
        e('q', 'out', 's1', 'atom'),
        e('s', 'out', 's1', 'formula'),
        e('s1', 'out', 's2', 'assertion'),
        e('p', 'out', 's2', 'atom'),
        e('q', 'out', 's2', 'formula'),
        e('a1b', 'out', 's3', 'assertion'),
        e('q', 'out', 's3', 'atom'),
        e('t', 'out', 's3', 'formula'),
        e('s3', 'out', 's4', 'assertion'),
        e('p', 'out', 's4', 'atom'),
        e('s2', 'out', 's4', 'formula'),
        e('s4', 'out', 's5', 'assertion'),
        e('t', 'out', 's5', 'atom'),
        e('p', 'out', 's5', 'formula'),
        e('s2', 'out', 'm1', 'a'),
        e('s5', 'out', 'm1', 'b'),
        e('m1', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH1-10', chapter: 'prop', code: 'CH1-10', title: '前件叠加', kicker: 'ax-1 + ax-2 + HS',
    target: '(P→Q)→((S→P)→(S→Q))',
    brief: '把 ax-1 与 ax-2 用假言三段论接起来。',
    hint: 'ax-1 给出 (P→Q)→(S→(P→Q))；ax-2 给出 (S→(P→Q))→((S→P)→(S→Q))；用 HS 串起来。',
    teaches: ['假言三段论', '两个公理接力'],
    allowed: ['atom', 'imp', 'axiom:ax-1', 'axiom:ax-2', 'subst', 'syllogism', 'target'],
    note: 'set.mm 的 imim2。',
  solution: {
      nodes: [
        atom('p', 60, 100, 'P'),
        atom('q', 60, 260, 'Q'),
        n('pq', 'imp', 340, 160),
        ax('a1', 60, 440, 'ax-1'),
        atom('s', 60, 620, 'S'),
        subst('s1a', 620, 300),
        subst('s1b', 900, 300),
        ax('a2', 60, 800, 'ax-2'),
        atom('r', 340, 800, 'R'),
        subst('s2a', 1180, 300),
        subst('s2b', 1460, 300),
        subst('s2c', 1740, 300),
        n('hs', 'syllogism', 2020, 300)
      ],
      edges: [
        e('p', 'out', 'pq', 'a'),
        e('q', 'out', 'pq', 'b'),
        e('a1', 'out', 's1a', 'assertion'),
        e('q', 'out', 's1a', 'atom'),
        e('s', 'out', 's1a', 'formula'),
        e('s1a', 'out', 's1b', 'assertion'),
        e('p', 'out', 's1b', 'atom'),
        e('pq', 'out', 's1b', 'formula'),
        e('a2', 'out', 's2a', 'assertion'),
        e('p', 'out', 's2a', 'atom'),
        e('s', 'out', 's2a', 'formula'),
        e('s2a', 'out', 's2b', 'assertion'),
        e('q', 'out', 's2b', 'atom'),
        e('p', 'out', 's2b', 'formula'),
        e('s2b', 'out', 's2c', 'assertion'),
        e('r', 'out', 's2c', 'atom'),
        e('q', 'out', 's2c', 'formula'),
        e('s1b', 'out', 'hs', 'a'),
        e('s2c', 'out', 'hs', 'b'),
        e('hs', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH1-11', chapter: 'prop', code: 'CH1-11', title: '同一位置', kicker: 'subst',
    target: 'P→(P→P)',
    brief: '把 ax-1 图式里的 Q 也换成 P：同一个原子可以填两个位置。',
    hint: '取 ax-1，用代入模块把 Q 换成 P。',
    teaches: ['图式的同原子实例', '代入'],
    allowed: ['atom', 'axiom:ax-1', 'subst', 'target'],
    note: 'ax-1 在 P、Q 取同一原子时的实例。',
  solution: {
      nodes: [
        ax('a1', 60, 120, 'ax-1'),
        atom('q', 60, 380, 'Q'),
        atom('p', 60, 540, 'P'),
        subst('s1', 380, 300)
      ],
      edges: [
        e('a1', 'out', 's1', 'assertion'),
        e('q', 'out', 's1', 'atom'),
        e('p', 'out', 's1', 'formula'),
        e('s1', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH1-12', chapter: 'prop', code: 'CH1-12', title: '复合同一', kicker: 'id + subst / 挑战',
    target: '(P→Q)→(P→Q)',
    brief: '同一律不只对单个原子成立：把 P 换成整个 P→Q，仍然得到它自己。',
    hint: '引用 CH1-07（P→P），用 imp 门拼出 P→Q，再把定理里的 P 换成它。',
    teaches: ['定理图式实例化', '复合公式作代入项', '挑战关'],
    allowed: ['atom', 'imp', 'theorem:CH1-07', 'subst', 'target'],
    note: 'id 定理的复合实例；这是本章的挑战关。',
  solution: {
      nodes: [
        atom('p', 60, 100, 'P'),
        atom('q', 60, 260, 'Q'),
        n('pq', 'imp', 340, 160),
        th('t7', 60, 440, 'CH1-07'),
        subst('s1', 620, 300)
      ],
      edges: [
        e('p', 'out', 'pq', 'a'),
        e('q', 'out', 'pq', 'b'),
        e('t7', 'out', 's1', 'assertion'),
        e('p', 'out', 's1', 'atom'),
        e('pq', 'out', 's1', 'formula'),
        e('s1', 'out', 'target', 'proof')
      ]
    }
  }));

  /* =====================================================================
   * Ⅱ 谓词（set.mm ax-4 / ax-5 / ax-10 / ax-11、df-ex）
   * ===================================================================== */
  LEVELS.push(level({
    id: 'CH2-01', chapter: 'pred', code: 'CH2-01', title: '量化蕴涵', kicker: 'ax-4',
    target: '(∀x (P→Q))→((∀x P)→(∀x Q))',
    brief: '全称量词分配进蕴涵。',
    hint: '取 ax-4，直接接目标。',
    teaches: ['全称量词', '量词分配'],
    allowed: ['axiom:ax-4', 'target'],
    note: 'Metamath set.mm ax-4。',
  solution: {
      nodes: [ax('a4', 260, 280, 'ax-4')],
      edges: [e('a4', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH2-02', chapter: 'pred', code: 'CH2-02', title: '量化蕴涵 · 实例', kicker: 'ax-4 + subst',
    target: '(∀x (F(x)→G(x)))→((∀x F(x))→(∀x G(x)))',
    brief: '把 ax-4 的 P、Q 同时换成谓词原子 F(x)、G(x)。',
    hint: '先用代入模块把 P 换成 F(x)，再作用一次把 Q 换成 G(x)。',
    teaches: ['代入到公理图式', '两个原子同时实例化'],
    allowed: ['atom', 'pred', 'axiom:ax-4', 'subst', 'target'],
    note: 'ax-4 的谓词实例；仍然是一条公理模式，不需要额外规则。',
  solution: {
      nodes: [
        ax('a4', 60, 120, 'ax-4'),
        atom('p', 60, 380, 'P'),
        pred('fx', 60, 540, 'F', 'x'),
        subst('s1', 380, 300),
        atom('q', 60, 720, 'Q'),
        pred('gx', 60, 880, 'G', 'x'),
        subst('s2', 700, 300)
      ],
      edges: [
        e('a4', 'out', 's1', 'assertion'),
        e('p', 'out', 's1', 'atom'),
        e('fx', 'out', 's1', 'formula'),
        e('s1', 'out', 's2', 'assertion'),
        e('q', 'out', 's2', 'atom'),
        e('gx', 'out', 's2', 'formula'),
        e('s2', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH2-03', chapter: 'pred', code: 'CH2-03', title: '无关量化', kicker: 'ax-5',
    target: 'P→∀x P',
    brief: '如果 P 与 x 无关，那么 P 蕴涵“对所有 x 都有 P”。',
    hint: '取 ax-5。注记里的 DV 条件：x 不在 P 中自由。',
    teaches: ['空量化', 'DV 条件'],
    allowed: ['axiom:ax-5', 'target'],
    note: 'Metamath set.mm ax-5；x 不在 P 中自由。',
  solution: {
      nodes: [ax('a5', 260, 280, 'ax-5')],
      edges: [e('a5', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH2-04', chapter: 'pred', code: 'CH2-04', title: '无关量化 · 实例', kicker: 'ax-5 + subst',
    target: 'F(y)→∀x F(y)',
    brief: 'P 换成 F(y)：x 仍然不在 F(y) 中自由。',
    hint: '把 ax-5 的 P 换成 F(y)。',
    teaches: ['空量化的实例', 'DV 条件仍然满足'],
    allowed: ['atom', 'pred', 'axiom:ax-5', 'subst', 'target'],
    note: 'ax-5 的实例。',
  solution: {
      nodes: [
        ax('a5', 60, 120, 'ax-5'),
        atom('p', 60, 380, 'P'),
        pred('fy', 60, 540, 'F', 'y'),
        subst('s1', 380, 300)
      ],
      edges: [
        e('a5', 'out', 's1', 'assertion'),
        e('p', 'out', 's1', 'atom'),
        e('fy', 'out', 's1', 'formula'),
        e('s1', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH2-05', chapter: 'pred', code: 'CH2-05', title: '量化否定', kicker: 'ax-10',
    target: '¬∀x P→∀x ¬∀x P',
    brief: '“并非所有 x 都有 P”本身与 x 无关。',
    hint: '取 ax-10。',
    teaches: ['量词与否定', '闭公式'],
    allowed: ['axiom:ax-10', 'target'],
    note: 'Metamath set.mm ax-10。',
  solution: {
      nodes: [ax('a10', 260, 280, 'ax-10')],
      edges: [e('a10', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH2-06', chapter: 'pred', code: 'CH2-06', title: '量化否定 · 实例', kicker: 'ax-10 + subst',
    target: '¬∀x F(x)→∀x ¬∀x F(x)',
    brief: '把 ax-10 的 P 换成 F(x)。',
    hint: '把 P 换成谓词原子 F(x)。',
    teaches: ['否定式的量化', '代入实例'],
    allowed: ['atom', 'pred', 'axiom:ax-10', 'subst', 'target'],
    note: 'ax-10 的实例。',
  solution: {
      nodes: [
        ax('a10', 60, 120, 'ax-10'),
        atom('p', 60, 380, 'P'),
        pred('fx', 60, 540, 'F', 'x'),
        subst('s1', 380, 300)
      ],
      edges: [
        e('a10', 'out', 's1', 'assertion'),
        e('p', 'out', 's1', 'atom'),
        e('fx', 'out', 's1', 'formula'),
        e('s1', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH2-07', chapter: 'pred', code: 'CH2-07', title: '量词交换', kicker: 'ax-11',
    target: '∀x ∀y P→∀y ∀x P',
    brief: '两个全称量词可以交换次序。',
    hint: '取 ax-11。',
    teaches: ['量词次序'],
    allowed: ['axiom:ax-11', 'target'],
    note: 'Metamath set.mm ax-11。',
  solution: {
      nodes: [ax('a11', 260, 280, 'ax-11')],
      edges: [e('a11', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH2-08', chapter: 'pred', code: 'CH2-08', title: '量词交换 · 实例', kicker: 'ax-11 + subst',
    target: '∀x ∀y F(x)→∀y ∀x F(x)',
    brief: '把 ax-11 的 P 换成 F(x)。',
    hint: '把 P 换成 F(x)。',
    teaches: ['量词次序的实例'],
    allowed: ['atom', 'pred', 'axiom:ax-11', 'subst', 'target'],
    note: 'ax-11 的实例。',
  solution: {
      nodes: [
        ax('a11', 60, 120, 'ax-11'),
        atom('p', 60, 380, 'P'),
        pred('fx', 60, 540, 'F', 'x'),
        subst('s1', 380, 300)
      ],
      edges: [
        e('a11', 'out', 's1', 'assertion'),
        e('p', 'out', 's1', 'atom'),
        e('fx', 'out', 's1', 'formula'),
        e('s1', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH2-09', chapter: 'pred', code: 'CH2-09', title: '存在的定义', kicker: 'df-ex',
    target: '(∃x P)↔(¬∀x ¬P)',
    brief: 'set.mm 把 ∃ 定义为 ¬∀¬。',
    hint: '取定义 df-ex。',
    teaches: ['∃ 是定义', '量词否定'],
    allowed: ['axiom:df-ex', 'target'],
    note: 'Metamath set.mm df-ex。',
  solution: {
      nodes: [ax('dex', 260, 280, 'df-ex')],
      edges: [e('dex', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH2-10', chapter: 'pred', code: 'CH2-10', title: '存在的定义 · 实例', kicker: 'df-ex + subst',
    target: '(∃x F(x))↔(¬∀x ¬F(x))',
    brief: '把 df-ex 的 P 换成 F(x)。',
    hint: '把 P 换成 F(x)。',
    teaches: ['存在定义的实例'],
    allowed: ['atom', 'pred', 'axiom:df-ex', 'subst', 'target'],
    note: 'df-ex 的实例。',
  solution: {
      nodes: [
        ax('dex', 60, 120, 'df-ex'),
        atom('p', 60, 380, 'P'),
        pred('fx', 60, 540, 'F', 'x'),
        subst('s1', 380, 300)
      ],
      edges: [
        e('dex', 'out', 's1', 'assertion'),
        e('p', 'out', 's1', 'atom'),
        e('fx', 'out', 's1', 'formula'),
        e('s1', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH2-11', chapter: 'pred', code: 'CH2-11', title: '全称闭包', kicker: 'ax-1 + ∀I',
    target: '∀x(F(x)→(G(x)→F(x)))',
    brief: '把 ax-1 的 P、Q 换成 F(x)、G(x)，再用全称推广把 x 收回。',
    hint: '先做两次代入，再用 ∀I(x)。',
    teaches: ['全称推广', '自由变元收回量词'],
    allowed: ['atom', 'pred', 'axiom:ax-1', 'subst', 'all-intro', 'target'],
    note: 'ax-gen 的规则形态（全称推广）；这是 set.mm 的 ax-gen。',
  solution: {
      nodes: [
        ax('a1', 60, 120, 'ax-1'),
        atom('p', 60, 380, 'P'),
        pred('fx', 60, 540, 'F', 'x'),
        subst('s1', 380, 300),
        atom('q', 60, 720, 'Q'),
        pred('gx', 60, 880, 'G', 'x'),
        subst('s2', 700, 300),
        alli('i1', 1020, 300, 'x')
      ],
      edges: [
        e('a1', 'out', 's1', 'assertion'),
        e('p', 'out', 's1', 'atom'),
        e('fx', 'out', 's1', 'formula'),
        e('s1', 'out', 's2', 'assertion'),
        e('q', 'out', 's2', 'atom'),
        e('gx', 'out', 's2', 'formula'),
        e('s2', 'out', 'i1', 'assertion'),
        e('i1', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH2-12', chapter: 'pred', code: 'CH2-12', title: '全称例化', kicker: '∀E',
    target: 'F(a)→(G(a)→F(a))',
    brief: '把上一关的全称闭包例化到常元 a。',
    hint: '引用 CH2-11，接一个 ∀E(term=a)。',
    teaches: ['全称例化', '引用已证结论'],
    allowed: ['theorem:CH2-11', 'all-elim', 'target'],
    note: '从 ∀x A 得到 A[a/x]。',
  solution: {
      nodes: [
        th('t11', 60, 300, 'CH2-11'),
        alle('e1', 420, 300, 'a')
      ],
      edges: [
        e('t11', 'out', 'e1', 'assertion'),
        e('e1', 'out', 'target', 'proof')
      ]
    }
  }));

  /* =====================================================================
   * Ⅲ 等词（set.mm ax-6 / ax-7 / ax-8 / ax-9 / ax-12 / ax-13）
   * ===================================================================== */

  LEVELS.push(level({
    id: 'CH3-01', chapter: 'eq', code: 'CH3-01', title: '存在', kicker: 'ax-6',
    target: '¬∀x¬x=y',
    brief: '对任何 y，都存在一个 x 等于它：论域非空。',
    hint: '取 ax-6。',
    teaches: ['等词存在公理'],
    allowed: ['axiom:ax-6', 'target'],
    note: 'Metamath set.mm ax-6。',
  solution: {
      nodes: [ax('a6', 260, 280, 'ax-6')],
      edges: [e('a6', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH3-02', chapter: 'eq', code: 'CH3-02', title: '存在的闭包', kicker: 'ax-6 + ∀I',
    target: '∀y¬∀x¬x=y',
    brief: 'ax-6 对自由变元 y 成立，因此可以全称推广 y。',
    hint: '取 ax-6，接 ∀I(y)。',
    teaches: ['自由变元的闭包'],
    allowed: ['axiom:ax-6', 'all-intro', 'target'],
    note: 'ax-gen 的规则形态。',
  solution: {
      nodes: [
        ax('a6', 60, 300, 'ax-6'),
        alli('i1', 420, 300, 'y')
      ],
      edges: [
        e('a6', 'out', 'i1', 'assertion'),
        e('i1', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH3-03', chapter: 'eq', code: 'CH3-03', title: '存在的实例', kicker: '∀E',
    target: '¬∀x¬x=a',
    brief: '把上一关的 ∀y 闭包例化到常元 a。',
    hint: '引用 CH3-02，接 ∀E(term=a)。',
    teaches: ['闭包后例化', '常元'],
    allowed: ['theorem:CH3-02', 'all-elim', 'target'],
    note: '全称例化的一个直接用法。',
  solution: {
      nodes: [
        th('t2', 60, 300, 'CH3-02'),
        alle('e1', 420, 300, 'a')
      ],
      edges: [
        e('t2', 'out', 'e1', 'assertion'),
        e('e1', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH3-04', chapter: 'eq', code: 'CH3-04', title: '相等', kicker: 'ax-7',
    target: 'x=y→(x=z→y=z)',
    brief: '相等可以替换：x=y 且 x=z，则 y=z。',
    hint: '取 ax-7。',
    teaches: ['等词的替换性'],
    allowed: ['axiom:ax-7', 'target'],
    note: 'Metamath set.mm ax-7。',
  solution: {
      nodes: [ax('a7', 260, 280, 'ax-7')],
      edges: [e('a7', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH3-05', chapter: 'eq', code: 'CH3-05', title: '相等的闭包', kicker: 'ax-7 + ∀I',
    target: '∀x∀y∀z(x=y→(x=z→y=z))',
    brief: '把 ax-7 的三个自由变元依次全称推广。',
    hint: '依次对 z、y、x 做 ∀I（先内层后外层）。',
    teaches: ['多重量词闭包', 'α-改名'],
    allowed: ['axiom:ax-7', 'all-intro', 'target'],
    note: '三个自由变元 x、y、z 的闭包。',
  solution: {
      nodes: [
        ax('a7', 60, 300, 'ax-7'),
        alli('iz', 360, 300, 'z'),
        alli('iy', 620, 300, 'y'),
        alli('ix', 880, 300, 'x')
      ],
      edges: [
        e('a7', 'out', 'iz', 'assertion'),
        e('iz', 'out', 'iy', 'assertion'),
        e('iy', 'out', 'ix', 'assertion'),
        e('ix', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH3-06', chapter: 'eq', code: 'CH3-06', title: '相等的实例', kicker: '∀E ×3',
    target: 'a=b→(a=c→b=c)',
    brief: '把闭包式按顺序例化到 a、b、c。',
    hint: '引用 CH3-05，依次 ∀E(x→a)、∀E(y→b)、∀E(z→c)。',
    teaches: ['三重例化', '常元替换'],
    allowed: ['theorem:CH3-05', 'all-elim', 'target'],
    note: 'x→a、y→b、z→c 的顺序与量词顺序对应。',
  solution: {
      nodes: [
        th('t5', 60, 300, 'CH3-05'),
        alle('ex', 360, 300, 'a'),
        alle('ey', 620, 300, 'b'),
        alle('ez', 880, 300, 'c')
      ],
      edges: [
        e('t5', 'out', 'ex', 'assertion'),
        e('ex', 'out', 'ey', 'assertion'),
        e('ey', 'out', 'ez', 'assertion'),
        e('ez', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH3-07', chapter: 'eq', code: 'CH3-07', title: '∈ 左替换', kicker: 'ax-8',
    target: 'x=y→(x∈z→y∈z)',
    brief: '相等的个体可以替换 ∈ 左边的位置。',
    hint: '取 ax-8。',
    teaches: ['∈ 的等词替换'],
    allowed: ['axiom:ax-8', 'target'],
    note: 'Metamath set.mm ax-8。',
  solution: {
      nodes: [ax('a8', 260, 280, 'ax-8')],
      edges: [e('a8', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH3-08', chapter: 'eq', code: 'CH3-08', title: '∈ 左替换 · 实例', kicker: '∀I ×3 + ∀E ×3',
    target: 'a=b→(a∈c→b∈c)',
    brief: '先把 ax-8 闭包，再例化到 a、b、c。',
    hint: '取 ax-8，依次 ∀I(z)、∀I(y)、∀I(x)，再依次 ∀E(x→a)、∀E(y→b)、∀E(z→c)。',
    teaches: ['闭包 + 例化的组合', '∈ 的替换实例'],
    allowed: ['axiom:ax-8', 'all-intro', 'all-elim', 'target'],
    note: 'ax-8 的实例。',
  solution: {
      nodes: [
        ax('a8', 60, 300, 'ax-8'),
        alli('iz', 300, 300, 'z'),
        alli('iy', 540, 300, 'y'),
        alli('ix', 780, 300, 'x'),
        alle('ex', 1020, 300, 'a'),
        alle('ey', 1260, 300, 'b'),
        alle('ez', 1500, 300, 'c')
      ],
      edges: [
        e('a8', 'out', 'iz', 'assertion'),
        e('iz', 'out', 'iy', 'assertion'),
        e('iy', 'out', 'ix', 'assertion'),
        e('ix', 'out', 'ex', 'assertion'),
        e('ex', 'out', 'ey', 'assertion'),
        e('ey', 'out', 'ez', 'assertion'),
        e('ez', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH3-09', chapter: 'eq', code: 'CH3-09', title: '∈ 右替换', kicker: 'ax-9',
    target: 'x=y→(z∈x→z∈y)',
    brief: '相等的个体也可以替换 ∈ 右边的位置。',
    hint: '取 ax-9。',
    teaches: ['∈ 右替换'],
    allowed: ['axiom:ax-9', 'target'],
    note: 'Metamath set.mm ax-9。',
  solution: {
      nodes: [ax('a9', 260, 280, 'ax-9')],
      edges: [e('a9', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH3-10', chapter: 'eq', code: 'CH3-10', title: '∈ 右替换 · 实例', kicker: '∀I ×3 + ∀E ×3',
    target: 'a=b→(c∈a→c∈b)',
    brief: '把 ax-9 闭包后例化到 a、b、c。',
    hint: '与 CH3-08 相同的闭包 / 例化顺序。',
    teaches: ['∈ 右替换的实例'],
    allowed: ['axiom:ax-9', 'all-intro', 'all-elim', 'target'],
    note: 'ax-9 的实例。',
  solution: {
      nodes: [
        ax('a9', 60, 300, 'ax-9'),
        alli('iz', 300, 300, 'z'),
        alli('iy', 540, 300, 'y'),
        alli('ix', 780, 300, 'x'),
        alle('ex', 1020, 300, 'a'),
        alle('ey', 1260, 300, 'b'),
        alle('ez', 1500, 300, 'c')
      ],
      edges: [
        e('a9', 'out', 'iz', 'assertion'),
        e('iz', 'out', 'iy', 'assertion'),
        e('iy', 'out', 'ix', 'assertion'),
        e('ix', 'out', 'ex', 'assertion'),
        e('ex', 'out', 'ey', 'assertion'),
        e('ey', 'out', 'ez', 'assertion'),
        e('ez', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH3-11', chapter: 'eq', code: 'CH3-11', title: '替换原理', kicker: 'ax-12',
    target: 'x=y→(∀y P→∀x (x=y→P))',
    brief: '在 x=y 的前提下，可以把全称量词里的 y 换成 x。',
    hint: '取 ax-12。',
    teaches: ['变量替换', '量词作用域'],
    allowed: ['axiom:ax-12', 'target'],
    note: 'Metamath set.mm ax-12（当前版本无 DV；ax12v 才带 x、y 不同）。',
  solution: {
      nodes: [ax('a12', 260, 280, 'ax-12')],
      edges: [e('a12', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH3-12', chapter: 'eq', code: 'CH3-12', title: '量化相等', kicker: 'ax-13',
    target: '¬x=y→(y=z→∀x y=z)',
    brief: '如果 x 不等于 y，那么 y=z 与 x 无关。',
    hint: '取 ax-13。',
    teaches: ['等词与量词'],
    allowed: ['axiom:ax-13', 'target'],
    note: 'Metamath set.mm ax-13（当前版本无 DV；ax13v 才带 x、z 不同）。',
  solution: {
      nodes: [ax('a13', 260, 280, 'ax-13')],
      edges: [e('a13', 'out', 'target', 'proof')]
    }
  }));

  /* =====================================================================
   * Ⅳ 集合论（ZFC 公理，setvar 原始语言）
   * ===================================================================== */

  LEVELS.push(level({
    id: 'CH4-01', chapter: 'set', code: 'CH4-01', title: '外延', kicker: 'ax-ext',
    target: '∀z(z∈x↔z∈y)→x=y',
    brief: '两个集合元素完全相同就相等。',
    hint: '取 ax-ext。',
    teaches: ['ZFC 公理', '∈ 与 = 的原始语言'],
    allowed: ['axiom:ax-ext', 'target'],
    note: 'Metamath set.mm ax-ext。',
  solution: {
      nodes: [ax('ext', 260, 280, 'ax-ext')],
      edges: [e('ext', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH4-02', chapter: 'set', code: 'CH4-02', title: '外延的闭包', kicker: 'ax-ext + ∀I',
    target: '∀x∀y(∀z(z∈x↔z∈y)→x=y)',
    brief: '把自由变元 x、y 依次全称推广。',
    hint: '先 ∀I(y)，再 ∀I(x)。',
    teaches: ['集合论公式的闭包'],
    allowed: ['axiom:ax-ext', 'all-intro', 'target'],
    note: 'ax-ext 的闭包。',
  solution: {
      nodes: [
        ax('ext', 60, 300, 'ax-ext'),
        alli('iy', 360, 300, 'y'),
        alli('ix', 620, 300, 'x')
      ],
      edges: [
        e('ext', 'out', 'iy', 'assertion'),
        e('iy', 'out', 'ix', 'assertion'),
        e('ix', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH4-03', chapter: 'set', code: 'CH4-03', title: '外延的实例', kicker: '∀E ×2',
    target: '∀z(z∈a↔z∈b)→a=b',
    brief: '把上一关的闭包例化到 a、b。',
    hint: '引用 CH4-02，接 ∀E(x→a)、∀E(y→b)。',
    teaches: ['集合论公式的例化'],
    allowed: ['theorem:CH4-02', 'all-elim', 'target'],
    note: 'ax-ext 的实例。',
  solution: {
      nodes: [
        th('t2', 60, 300, 'CH4-02'),
        alle('ex', 360, 300, 'a'),
        alle('ey', 620, 300, 'b')
      ],
      edges: [
        e('t2', 'out', 'ex', 'assertion'),
        e('ex', 'out', 'ey', 'assertion'),
        e('ey', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH4-04', chapter: 'set', code: 'CH4-04', title: '幂集', kicker: 'ax-pow',
    target: '∃y∀z(∀w(w∈z→w∈x)→z∈y)',
    brief: '每个集合都有幂集。',
    hint: '取 ax-pow。',
    teaches: ['幂集公理'],
    allowed: ['axiom:ax-pow', 'target'],
    note: 'Metamath set.mm ax-pow。',
  solution: {
      nodes: [ax('pow', 260, 280, 'ax-pow')],
      edges: [e('pow', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH4-05', chapter: 'set', code: 'CH4-05', title: '幂集 · 实例', kicker: 'ax-pow + ∀I + ∀E',
    target: '∃y∀z(∀w(w∈z→w∈a)→z∈y)',
    brief: '把 ax-pow 的自由变元 x 换成 a。',
    hint: '先 ∀I(x)，再 ∀E(term=a)。',
    teaches: ['集合论公理的变量实例化'],
    allowed: ['axiom:ax-pow', 'all-intro', 'all-elim', 'target'],
    note: 'ax-pow 的实例。',
  solution: {
      nodes: [
        ax('pow', 60, 300, 'ax-pow'),
        alli('ix', 360, 300, 'x'),
        alle('ex', 620, 300, 'a')
      ],
      edges: [
        e('pow', 'out', 'ix', 'assertion'),
        e('ix', 'out', 'ex', 'assertion'),
        e('ex', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH4-06', chapter: 'set', code: 'CH4-06', title: '并集', kicker: 'ax-un',
    target: '∃y∀z(∃w(z∈w∧w∈x)→z∈y)',
    brief: '每个集合的并还是集合。',
    hint: '取 ax-un。',
    teaches: ['并集公理'],
    allowed: ['axiom:ax-un', 'target'],
    note: 'Metamath set.mm ax-un。',
  solution: {
      nodes: [ax('un', 260, 280, 'ax-un')],
      edges: [e('un', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH4-07', chapter: 'set', code: 'CH4-07', title: '并集 · 实例', kicker: 'ax-un + ∀I + ∀E',
    target: '∃y∀z(∃w(z∈w∧w∈a)→z∈y)',
    brief: '把 ax-un 的自由变元 x 换成 a。',
    hint: '先 ∀I(x)，再 ∀E(term=a)。',
    teaches: ['并集公理的实例'],
    allowed: ['axiom:ax-un', 'all-intro', 'all-elim', 'target'],
    note: 'ax-un 的实例。',
  solution: {
      nodes: [
        ax('un', 60, 300, 'ax-un'),
        alli('ix', 360, 300, 'x'),
        alle('ex', 620, 300, 'a')
      ],
      edges: [
        e('un', 'out', 'ix', 'assertion'),
        e('ix', 'out', 'ex', 'assertion'),
        e('ex', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH4-08', chapter: 'set', code: 'CH4-08', title: '正则', kicker: 'ax-reg',
    target: '∃y y∈x→∃y(y∈x∧∀z(z∈y→¬z∈x))',
    brief: '非空集合里有一个与它不相交的元素。',
    hint: '取 ax-reg。',
    teaches: ['正则公理'],
    allowed: ['axiom:ax-reg', 'target'],
    note: 'Metamath set.mm ax-reg。',
  solution: {
      nodes: [ax('reg', 260, 280, 'ax-reg')],
      edges: [e('reg', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH4-09', chapter: 'set', code: 'CH4-09', title: '正则 · 实例', kicker: 'ax-reg + ∀I + ∀E',
    target: '∃y y∈a→∃y(y∈a∧∀z(z∈y→¬z∈a))',
    brief: '把 ax-reg 的自由变元 x 换成 a。',
    hint: '先 ∀I(x)，再 ∀E(term=a)。',
    teaches: ['正则公理的实例'],
    allowed: ['axiom:ax-reg', 'all-intro', 'all-elim', 'target'],
    note: 'ax-reg 的实例。',
  solution: {
      nodes: [
        ax('reg', 60, 300, 'ax-reg'),
        alli('ix', 360, 300, 'x'),
        alle('ex', 620, 300, 'a')
      ],
      edges: [
        e('reg', 'out', 'ix', 'assertion'),
        e('ix', 'out', 'ex', 'assertion'),
        e('ex', 'out', 'target', 'proof')
      ]
    }
  }));

  LEVELS.push(level({
    id: 'CH4-10', chapter: 'set', code: 'CH4-10', title: '无穷', kicker: 'ax-inf',
    target: '∃y(x∈y∧∀z(z∈y→∃w(z∈w∧w∈y)))',
    brief: '存在一个包含 x 且对后继封闭的集合。',
    hint: '取 ax-inf。',
    teaches: ['无穷公理'],
    allowed: ['axiom:ax-inf', 'target'],
    note: 'Metamath set.mm ax-inf。',
  solution: {
      nodes: [ax('inf', 260, 280, 'ax-inf')],
      edges: [e('inf', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH4-11', chapter: 'set', code: 'CH4-11', title: '选择', kicker: 'ax-ac',
    target: '∃y∀z∀w((z∈w∧w∈x)→∃v∀u(∃t((u∈w∧w∈t)∧(u∈t∧t∈y))↔u=v))',
    brief: '选择公理。',
    hint: '取 ax-ac。',
    teaches: ['选择公理'],
    allowed: ['axiom:ax-ac', 'target'],
    note: 'Metamath set.mm ax-ac。',
  solution: {
      nodes: [ax('ac', 260, 280, 'ax-ac')],
      edges: [e('ac', 'out', 'target', 'proof')]
    }
  }));

  LEVELS.push(level({
    id: 'CH4-12', chapter: 'set', code: 'CH4-12', title: '替换', kicker: 'ax-rep',
    target: '∀w∃y∀z(∀y P→z=y)→∃y∀z(z∈y↔∃w(w∈x∧∀y P))',
    brief: '一个集合在可定义函数下的像还是集合。',
    hint: '取 ax-rep。',
    teaches: ['替换公理', 'wff 变元的占位简化'],
    allowed: ['axiom:ax-rep', 'target'],
    note: 'Metamath set.mm ax-rep；原式的 φ 在游戏中以原子 P 占位。',
  solution: {
      nodes: [ax('rep', 260, 280, 'ax-rep')],
      edges: [e('rep', 'out', 'target', 'proof')]
    }
  }));

  /* Normalize: index / order / targetPos / world. */
  LEVELS.forEach(function (lv, i) {
    lv.index = i;
    lv.order = i + 1;
    lv.allowed = lv.allowed || [];
    lv.target = lv.target.trim();
    if (!lv.targetPos) {
      var maxX = 0, maxY = TARGET_Y;
      (lv.solution.nodes || []).forEach(function (node) {
        maxX = Math.max(maxX, node.x || 0);
        maxY = Math.max(maxY, node.y || 0);
      });
      lv.targetPos = maxX ? { x: maxX + 340, y: TARGET_Y } : { x: 900, y: TARGET_Y };
    }
    lv.world = lv.world || { w: Math.max(2200, lv.targetPos.x + 500), h: Math.max(1100, (lv.targetPos.y || 0) + 700) };
  });

  window.RSL.LEVELS = LEVELS;
})();
