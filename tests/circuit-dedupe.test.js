'use strict';
/* circuit-dedupe 回归测试：参考解电路里的「同一个断言被证明两次」必须合并，
 * 合并后电路仍能被真实 Engine 完整求值（包括 theorem 占位符）。
 *
 * 运行：node --test tests/circuit-dedupe.test.js
 */
const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { loadRuntime } = require('../scripts/lib/load-runtime');
const { dedupeCircuit, assertionKey } = require('../scripts/lib/circuit-dedupe');

const RSL = loadRuntime({
  files: ['src/term.js', 'src/levels.js', 'src/modules.js', 'src/engine.js']
});
const Engine = RSL.Engine;
const levels = RSL.LEVELS;

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function circuitBuilder() {
  let seq = 0;
  const nodes = [];
  const edges = [];
  const add = (kind, config) => {
    const id = 'n' + (++seq);
    nodes.push({ id, kind, config: config || {}, x: 0, y: 0 });
    return id;
  };
  const edge = (from, fromPort, to, toPort) => {
    edges.push({ id: 'e' + (++seq), from: { node: from, port: fromPort }, to: { node: to, port: toPort } });
  };
  return { nodes, edges, add, edge };
}

/**
 * A real proof of ⊢ P→P, duplicated twice.  Each chain:
 *   axH1  : A1                 ⊢ P→(Q→P)
 *   axH2  : A1, Q := (Q→P)     ⊢ P→((Q→P)→P)
 *   axH3  : A2, Q := (Q→P), R := P
 *                              ⊢ (P→((Q→P)→P)) → ((P→(Q→P))→(P→P))
 *   mpA   : axH2 + axH3        ⊢ (P→(Q→P))→(P→P)
 * Only chain 1 is wired to the final MP / target; chain 2 is a second,
 * independent proof of the same intermediate assertions.
 */
function addDiagonalProofChain(builder) {
  const p = builder.add('atom', { name: 'P' });
  const q = builder.add('atom', { name: 'Q' });
  const r = builder.add('atom', { name: 'R' });
  const impQP = builder.add('imp', {}); // (Q→P)
  builder.edge(q, 'out', impQP, 'a');
  builder.edge(p, 'out', impQP, 'b');

  const axH1 = builder.add('axiom', { schema: 'A1' });
  const axH2 = builder.add('axiom', { schema: 'A1' });
  const substH2 = builder.add('subst', { groups: 1 }); // Q := (Q→P)
  builder.edge(axH2, 'out', substH2, 'assertion');
  builder.edge(q, 'out', substH2, 'atom1');
  builder.edge(impQP, 'out', substH2, 'formula1');

  const axH3 = builder.add('axiom', { schema: 'A2' });
  const substH3 = builder.add('subst', { groups: 2 }); // Q := (Q→P), R := P
  builder.edge(axH3, 'out', substH3, 'assertion');
  builder.edge(q, 'out', substH3, 'atom1');
  builder.edge(impQP, 'out', substH3, 'formula1');
  builder.edge(r, 'out', substH3, 'atom2');
  builder.edge(p, 'out', substH3, 'formula2');

  const mpA = builder.add('mp', {});
  builder.edge(substH2, 'out', mpA, 'a');
  builder.edge(substH3, 'out', mpA, 'b');
  return { axH1, axH2, substH2, substH3, mpA };
}

function buildDuplicateProofCircuit() {
  const b = circuitBuilder();
  const chain1 = addDiagonalProofChain(b);
  const chain2 = addDiagonalProofChain(b);

  const finalMP = b.add('mp', {});
  b.edge(chain1.axH1, 'out', finalMP, 'a');
  b.edge(chain1.mpA, 'out', finalMP, 'b');
  const targetId = b.add('target', {});
  b.edge(finalMP, 'out', targetId, 'proof');

  const level = { code: 'TEST-DUPLICATE-PP', targetTokens: ['|-', '(', 'P', '->', 'P', ')'] };
  return { level, nodes: b.nodes, edges: b.edges, targetId, chain1, chain2, finalMP };
}

/** Map assertion key -> non-target node ids, using Engine results. */
function assertionGroups(nodes, results) {
  const rows = results && results.results ? results.results : results;
  const groups = new Map();
  nodes.forEach((node) => {
    if (!node || node.kind === 'target') return;
    const row = rows && rows[node.id];
    const tokens = row && row.tokens;
    if (!Array.isArray(tokens) || tokens[0] !== '|-') return;
    const key = tokens.join('\u0000');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(node);
  });
  return groups;
}

function duplicateGroupCount(nodes, results) {
  let count = 0;
  for (const members of assertionGroups(nodes, results).values()) {
    if (members.length > 1) count += 1;
  }
  return count;
}

function idsOf(nodes) {
  return nodes.map((node) => node.id).sort();
}

/* ------------------------------------------------------------------ */
/* helper                                                              */
/* ------------------------------------------------------------------ */

test('assertionKey: 用 NUL 连接 canonical tokens；空/非数组返回 null', () => {
  assert.strictEqual(assertionKey(['|-', '(', 'P', '->', 'P', ')']), '|-\u0000(\u0000P\u0000->\u0000P\u0000)');
  assert.strictEqual(assertionKey(['|-']), '|-');
  assert.strictEqual(assertionKey([]), null);
  assert.strictEqual(assertionKey(null), null);
  assert.strictEqual(assertionKey(undefined), null);
  assert.strictEqual(assertionKey('|- P'), null);
});

/* ------------------------------------------------------------------ */
/* 1. synthetic: two independent proofs of the same assertion         */
/* ------------------------------------------------------------------ */

test('两条独立重复证明被合并为一个 survivor，接线重连后电路仍完整求值', () => {
  const { level, nodes, edges, targetId, chain1, chain2, finalMP } = buildDuplicateProofCircuit();
  const inputNodesJson = JSON.stringify(nodes);
  const inputEdgesJson = JSON.stringify(edges);

  const pre = Engine.evaluate(level, nodes, edges, {});
  assert.strictEqual(pre.complete, true, JSON.stringify(pre.errors));
  assert.ok(duplicateGroupCount(nodes, pre) > 0, '前置电路应包含重复断言');

  const out = dedupeCircuit({ nodes, edges, targetId, results: pre });

  assert.ok(out.removed > 0, 'should remove duplicate nodes');
  assert.ok(out.mergedGroups.length >= 4, 'axiom/subst/mp duplicates each form a group');
  assert.strictEqual(duplicateGroupCount(out.nodes, pre), 0, '合并后（用原结果）不应再有重复断言分组');

  /* 输入未被修改 */
  assert.strictEqual(JSON.stringify(nodes), inputNodesJson, 'input nodes 不能被修改');
  assert.strictEqual(JSON.stringify(edges), inputEdgesJson, 'input edges 不能被修改');

  /* survivor 保留对象身份、id、config；被删节点不再出现在任何边上 */
  const byId = new Map(nodes.map((node) => [node.id, node]));
  for (const node of out.nodes) assert.strictEqual(byId.get(node.id), node, node.id + ' 应保留原对象');
  const removedIds = new Set();
  out.mergedGroups.forEach((group) => group.removedIds.forEach((id) => removedIds.add(id)));
  assert.ok(removedIds.size > 0);
  out.edges.forEach((edge) => {
    assert.ok(!removedIds.has(edge.from.node), '边仍指向已删节点：' + edge.from.node);
    assert.ok(!removedIds.has(edge.to.node), '边仍指向已删节点：' + edge.to.node);
  });

  /* 目标节点永远单独保留 */
  const targetNode = nodes.find((node) => node.id === targetId);
  assert.strictEqual(out.nodes.find((node) => node.id === targetId), targetNode);

  /* 同名断言只留一个：chain1/chain2 的两份中间结论不再成对出现 */
  const targetCone = new Set([targetId]);
  out.edges.forEach((edge) => { if (targetCone.has(edge.to.node)) targetCone.add(edge.from.node); });
  for (let changed = true; changed;) {
    changed = false;
    out.edges.forEach((edge) => {
      if (targetCone.has(edge.to.node) && !targetCone.has(edge.from.node)) {
        targetCone.add(edge.from.node);
        changed = true;
      }
    });
  }
  assert.ok(targetCone.has(chain1.axH1) && targetCone.has(chain1.mpA) && targetCone.has(finalMP));

  /* 真实 Engine 在去重后的电路上仍然通关 */
  const post = Engine.evaluate(level, out.nodes, out.edges, {});
  assert.strictEqual(post.complete, true, JSON.stringify(post.errors));
  assert.strictEqual(post.errors.length, 0);
  assert.strictEqual(post.cycle.length, 0);
  assert.strictEqual(duplicateGroupCount(out.nodes, post), 0);
});

/* ------------------------------------------------------------------ */
/* 2. theorem placeholders with a caller supplied token resolver       */
/* ------------------------------------------------------------------ */

test('theorem 占位符：pre 求值不完整（tokens=null）时仍可用 tokensOf 合并并保持可求值', () => {
  const theoremTokens = ['|-', '(', 'P', '->', 'P', ')'];
  /* 前面两个关卡已被证明，占位符引用它们。 */
  const ctxLevels = [
    { code: 'TEST-T1', targetTokens: theoremTokens },
    { code: 'TEST-T2', targetTokens: theoremTokens }
  ];
  const level = { code: 'TEST-CURRENT', targetTokens: theoremTokens };
  const th1 = { id: 'th1', kind: 'theorem', config: { code: 'TEST-T1' }, x: 0, y: 0 };
  const th2 = { id: 'th2', kind: 'theorem', config: { code: 'TEST-T2' }, x: 0, y: 0 };
  const target = { id: 'target', kind: 'target', config: {}, x: 0, y: 0 };
  const nodes = [th1, th2, target];
  const edges = [
    { id: 'e1', from: { node: 'th1', port: 'out' }, to: { node: 'target', port: 'proof' } },
    { id: 'e2', from: { node: 'th2', port: 'out' }, to: { node: 'target', port: 'proof' } }
  ];

  /* 模拟 build-campaign2 的 pre：levels=[]，theorem 占位符无法求值。 */
  const pre = Engine.evaluate(level, nodes, edges, { levels: [], levelIndex: 999 });
  assert.strictEqual(pre.complete, false);
  assert.strictEqual(pre.results.th1.tokens, null);
  assert.strictEqual(pre.results.th2.tokens, null);

  const tokenMap = new Map([
    ['TEST-T1', theoremTokens],
    ['TEST-T2', theoremTokens]
  ]);
  const tokensOf = (nodeId) => {
    const node = nodes.find((candidate) => candidate.id === nodeId);
    if (!node || node.kind !== 'theorem') return null;
    return tokenMap.get(node.config.code) || null;
  };

  const out = dedupeCircuit({ nodes, edges, targetId: 'target', results: pre, tokensOf });
  assert.strictEqual(out.removed, 1);
  assert.deepStrictEqual(out.nodes.map((node) => node.id), ['th1', 'target']);
  assert.strictEqual(out.edges.length, 1);
  assert.strictEqual(out.edges[0].from.node, 'th1');
  assert.strictEqual(out.mergedGroups.length, 1);
  assert.strictEqual(out.mergedGroups[0].survivorId, 'th1');
  assert.deepStrictEqual(out.mergedGroups[0].removedIds, ['th2']);

  /* survivor 保留自己的 config（不是被合并节点的） */
  assert.deepStrictEqual(out.nodes[0].config, { code: 'TEST-T1' });
  assert.strictEqual(out.nodes[0], th1);

  /* 用正确的 levels 上下文重新求值：仍然完整 */
  const post = Engine.evaluate(level, out.nodes, out.edges, { levels: ctxLevels, levelIndex: ctxLevels.length });
  assert.strictEqual(post.complete, true, JSON.stringify(post.errors));
  assert.strictEqual(post.errors.length, 0);
});

/* ------------------------------------------------------------------ */
/* 3. parallel edges + self edges + unreachable branch                 */
/* ------------------------------------------------------------------ */

test('合并后重复平行边折叠、自环丢弃、不可达分支被剪掉，且保留未变边身份', () => {
  const a = { id: 'a', kind: 'axiom', config: { schema: 'A3' } };
  const b = { id: 'b', kind: 'axiom', config: { schema: 'A3' } };
  const target = { id: 'target', kind: 'target', config: {} };
  const strayAxiom = { id: 'strayAxiom', kind: 'axiom', config: { schema: 'A4', v: 'x' } };
  const strayMP = { id: 'strayMP', kind: 'mp', config: {} };
  const nodes = [a, b, target, strayAxiom, strayMP];
  const e1 = { id: 'e1', from: { node: 'a', port: 'out' }, to: { node: 'target', port: 'proof' } };
  const e2 = { id: 'e2', from: { node: 'b', port: 'out' }, to: { node: 'target', port: 'proof' } };
  const e3 = { id: 'e3', from: { node: 'b', port: 'out' }, to: { node: 'b', port: 'loop' } };
  const e4 = { id: 'e4', from: { node: 'strayAxiom', port: 'out' }, to: { node: 'strayMP', port: 'a' } };
  const e5 = { id: 'e5', from: { node: 'strayMP', port: 'out' }, to: { node: 'strayMP', port: 'b' } };
  const edges = [e1, e2, e3, e4, e5];
  const tokens = {
    a: ['|-', 'SAME'],
    b: ['|-', 'SAME'],
    target: ['|-', 'TARGET'],
    strayAxiom: ['|-', 'OTHER'],
    strayMP: null
  };

  const out = dedupeCircuit({ nodes, edges, targetId: 'target', tokensOf: (id) => tokens[id] || null });

  assert.deepStrictEqual(out.nodes.map((node) => node.id), ['a', 'target']);
  assert.strictEqual(out.edges.length, 1);
  assert.strictEqual(out.edges[0], e1, '未变的边应保留对象身份');
  assert.strictEqual(out.edges[0].from.node, 'a');
  assert.strictEqual(out.edges[0].to.node, 'target');
  assert.strictEqual(out.removed, 3); // b 合并 + strayAxiom/strayMP 剪枝
  assert.strictEqual(out.mergedGroups.length, 1);
  assert.strictEqual(out.mergedGroups[0].survivorId, 'a');
  assert.deepStrictEqual(out.mergedGroups[0].removedIds, ['b']);
});

/* ------------------------------------------------------------------ */
/* 4. deterministic survivor                                           */
/* ------------------------------------------------------------------ */

test('survivor 选择确定：theorem > axiom > subst > D > other，同级按原节点顺序', () => {
  const nodes = [
    { id: 'th1', kind: 'theorem' }, { id: 'ax1', kind: 'axiom' }, { id: 'mp1', kind: 'mp' },
    { id: 'ax2', kind: 'axiom' }, { id: 'su2', kind: 'subst' },
    { id: 'su3', kind: 'subst' }, { id: 'de3', kind: 'def-expand' },
    { id: 'de4', kind: 'def-expand' }, { id: 'dc4', kind: 'def-contract' },
    { id: 'mp5', kind: 'mp' }, { id: 'dc5', kind: 'def-contract' },
    { id: 'th6a', kind: 'theorem' }, { id: 'th6b', kind: 'theorem' },
    { id: 'mp7a', kind: 'mp' }, { id: 'mp7b', kind: 'mp' }, { id: 'su7', kind: 'subst' },
    { id: 'gen8a', kind: 'gen' }, { id: 'shift8b', kind: 'shift' },
    { id: 'target', kind: 'target' }
  ];
  const groupsByToken = {
    G1: ['th1', 'ax1', 'mp1'],
    G2: ['ax2', 'su2'],
    G3: ['su3', 'de3'],
    G4: ['de4', 'dc4'],
    G5: ['mp5', 'dc5'],
    G6: ['th6a', 'th6b'],
    G7: ['mp7a', 'mp7b', 'su7'],
    G8: ['gen8a', 'shift8b']
  };
  const expectedSurvivors = {
    G1: 'th1', G2: 'ax2', G3: 'su3', G4: 'de4',
    G5: 'dc5', G6: 'th6a', G7: 'su7', G8: 'gen8a'
  };
  const tokenOfId = new Map();
  Object.keys(groupsByToken).forEach((group) => {
    groupsByToken[group].forEach((id) => tokenOfId.set(id, group));
  });
  const edges = [];
  nodes.forEach((node, index) => {
    if (node.kind === 'target') return;
    edges.push({
      id: 'e' + index,
      from: { node: node.id, port: 'out' },
      to: { node: 'target', port: 'proof' }
    });
  });

  const out = dedupeCircuit({
    nodes,
    edges,
    targetId: 'target',
    tokensOf: (id) => (tokenOfId.has(id) ? ['|-', tokenOfId.get(id)] : null)
  });

  const groups = new Map(out.mergedGroups.map((group) => [group.key, group]));
  Object.keys(expectedSurvivors).forEach((group) => {
    const expected = expectedSurvivors[group];
    const key = assertionKey(['|-', group]);
    const merged = groups.get(key);
    assert.ok(merged, group + ' 应被合并');
    assert.strictEqual(merged.survivorId, expected, group + ' survivor');
    assert.ok(merged.removedIds.indexOf(expected) < 0);
    assert.strictEqual(merged.removedIds.length, groupsByToken[group].length - 1);
  });

  const expectedNodeIds = Object.keys(expectedSurvivors).map((group) => expectedSurvivors[group]).concat(['target']).sort();
  assert.deepStrictEqual(idsOf(out.nodes), expectedNodeIds);
  /* survivor 对象身份不变 */
  const byId = new Map(nodes.map((node) => [node.id, node]));
  out.nodes.forEach((node) => assert.strictEqual(byId.get(node.id), node));
});

/* ------------------------------------------------------------------ */
/* 5. target is never merged                                          */
/* ------------------------------------------------------------------ */

test('target 节点不参与合并（默认 results 解析器，两种 shape）', () => {
  const same = ['|-', '(', 'P', '->', 'P', ')'];

  /* Engine 结果 shape */
  const target = { id: 'target', kind: 'target', config: {} };
  const axiom = { id: 'axiom', kind: 'axiom', config: { schema: 'A1' } };
  const nodes = [target, axiom];
  const edges = [{ id: 'e1', from: { node: 'axiom', port: 'out' }, to: { node: 'target', port: 'proof' } }];
  const results = {
    results: {
      target: { nodeId: 'target', tokens: same },
      axiom: { nodeId: 'axiom', tokens: same }
    }
  };
  const out = dedupeCircuit({ nodes, edges, targetId: 'target', results });
  assert.strictEqual(out.removed, 0, 'target 不应被合并，axiom 组只有一个成员');
  assert.strictEqual(out.mergedGroups.length, 0);
  assert.deepStrictEqual(out.nodes.map((node) => node.id), ['target', 'axiom']);
  assert.strictEqual(out.nodes[0], target);
  assert.strictEqual(out.edges.length, 1);

  /* 纯 id -> result map shape（兼容调用方直接传 results） */
  const target2 = { id: 'target2', kind: 'target', config: {} };
  const ax1 = { id: 'ax1', kind: 'axiom', config: { schema: 'A1' } };
  const ax2 = { id: 'ax2', kind: 'axiom', config: { schema: 'A1' } };
  const nodes2 = [target2, ax1, ax2];
  const edges2 = [
    { id: 'f1', from: { node: 'ax1', port: 'out' }, to: { node: 'target2', port: 'proof' } },
    { id: 'f2', from: { node: 'ax2', port: 'out' }, to: { node: 'target2', port: 'proof' } }
  ];
  const plainResults = {
    target2: { tokens: same },
    ax1: { tokens: same },
    ax2: { tokens: same }
  };
  const out2 = dedupeCircuit({ nodes: nodes2, edges: edges2, targetId: 'target2', results: plainResults });
  assert.strictEqual(out2.nodes.find((node) => node.id === 'target2'), target2);
  assert.deepStrictEqual(idsOf(out2.nodes), ['ax1', 'target2']);
  assert.strictEqual(out2.removed, 1);
  assert.strictEqual(out2.edges.length, 1);
});

/* ------------------------------------------------------------------ */
/* 6. null / non-assertion tokens are never merged                    */
/* ------------------------------------------------------------------ */

test('null、空和构造模块 token（非 |-）不参与合并', () => {
  const nodes = [
    { id: 'target', kind: 'target', config: {} },
    { id: 'null1', kind: 'axiom', config: { schema: 'A1' } },
    { id: 'null2', kind: 'axiom', config: { schema: 'A1' } },
    { id: 'wff1', kind: 'atom', config: { name: 'P' } },
    { id: 'wff2', kind: 'atom', config: { name: 'P' } }
  ];
  const edges = [];
  ['null1', 'null2', 'wff1', 'wff2'].forEach((id, index) => {
    edges.push({ id: 'e' + index, from: { node: id, port: 'out' }, to: { node: 'target', port: 'proof' } });
  });
  const tokenMap = {
    target: ['|-', 'TARGET'],
    null1: null,
    null2: null,
    wff1: ['wff', 'P'],
    wff2: ['wff', 'P']
  };
  const out = dedupeCircuit({ nodes, edges, targetId: 'target', tokensOf: (id) => tokenMap[id] || null });
  assert.strictEqual(out.removed, 0);
  assert.strictEqual(out.mergedGroups.length, 0);
  assert.strictEqual(out.nodes.length, 5);
  assert.strictEqual(out.edges.length, 4);
});

/* ------------------------------------------------------------------ */
/* 7. real current level                                              */
/* ------------------------------------------------------------------ */

test('真实关卡：参考解已无重复断言，dedupe 后仍能通关且不产生回路', () => {
  const idx = levels.findIndex((level) => level.hard);
  assert.ok(idx >= 0, '应存在困难关');
  const level = levels[idx];

  const nodes = JSON.parse(JSON.stringify(level.solution.nodes))
    .concat(JSON.parse(JSON.stringify(level.initialNodes)));
  const edges = JSON.parse(JSON.stringify(level.solution.edges));
  const targetNode = nodes.find((node) => node.kind === 'target');
  assert.ok(targetNode, '关卡应有 target 节点');

  const ctx = { levels: levels.slice(0, idx), levelIndex: idx };
  const pre = Engine.evaluate(level, nodes, edges, ctx);
  assert.strictEqual(pre.complete, true, JSON.stringify(pre.errors));
  assert.strictEqual(duplicateGroupCount(nodes, pre), 0, '构建器应已消掉重复断言');

  const out = dedupeCircuit({ nodes, edges, targetId: targetNode.id, results: pre });
  assert.strictEqual(out.nodes.find((node) => node.id === targetNode.id), targetNode, 'target 保留对象身份');
  assert.strictEqual(duplicateGroupCount(out.nodes, pre), 0, '合并后不应再有非 target 重复断言组');

  const post = Engine.evaluate(level, out.nodes, out.edges, ctx);
  assert.strictEqual(post.complete, true, JSON.stringify(post.errors));
  assert.strictEqual(post.errors.length, 0);
  assert.strictEqual(post.cycle.length, 0);
});

/* ------------------------------------------------------------------ */
/* 8. scale + cycles + no-target fallback                             */
/* ------------------------------------------------------------------ */

test('200+ 节点与环不会卡死；无 target 时宁可保留全部节点也不清空', () => {
  const CHAIN = 220;
  const nodes = [];
  const edges = [];
  const tokenMap = new Map();
  for (let i = 0; i < CHAIN; i += 1) {
    nodes.push({ id: 'c' + i, kind: 'mp', config: {} });
    tokenMap.set('c' + i, ['|-', 'F' + i]);
  }
  nodes.push({ id: 'target', kind: 'target', config: {} });
  for (let i = 0; i < CHAIN - 1; i += 1) {
    edges.push({ id: 'ce' + i, from: { node: 'c' + i, port: 'out' }, to: { node: 'c' + (i + 1), port: 'a' } });
  }
  edges.push({ id: 'celast', from: { node: 'c' + (CHAIN - 1), port: 'out' }, to: { node: 'target', port: 'proof' } });
  /* A duplicate pair inside a cycle that is not reachable from the target. */
  nodes.push({ id: 'cyc1', kind: 'mp', config: {} }, { id: 'cyc2', kind: 'mp', config: {} });
  tokenMap.set('cyc1', ['|-', 'CYCLE']);
  tokenMap.set('cyc2', ['|-', 'CYCLE']);
  edges.push({ id: 'cy1', from: { node: 'cyc1', port: 'out' }, to: { node: 'cyc2', port: 'a' } });
  edges.push({ id: 'cy2', from: { node: 'cyc2', port: 'out' }, to: { node: 'cyc1', port: 'a' } });

  const started = Date.now();
  const out = dedupeCircuit({
    nodes,
    edges,
    targetId: 'target',
    tokensOf: (id) => tokenMap.get(id) || null
  });
  const elapsed = Date.now() - started;

  assert.ok(elapsed < 5000, '不应在环上卡死（耗时 ' + elapsed + 'ms）');
  assert.strictEqual(out.nodes.length, CHAIN + 1);
  assert.strictEqual(out.edges.length, CHAIN);
  assert.ok(!out.nodes.some((node) => node.id === 'cyc1' || node.id === 'cyc2'), '环分支应被剪掉');
  assert.strictEqual(out.nodes.find((node) => node.id === 'target').kind, 'target');

  /* targetId 找不到且没有 target 节点：跳过剪枝，保留所有节点 */
  const orphan1 = { id: 'orphan1', kind: 'axiom', config: {} };
  const orphan2 = { id: 'orphan2', kind: 'axiom', config: {} };
  const fallback = dedupeCircuit({
    nodes: [orphan1, orphan2],
    edges: [],
    targetId: 'missing-target',
    tokensOf: () => ['|-', 'SAME']
  });
  assert.deepStrictEqual(fallback.nodes.map((node) => node.id), ['orphan1']);
  assert.strictEqual(fallback.removed, 1);
  assert.ok(fallback.nodes.length > 0, '不能因为找不到 target 就清空电路');
});
