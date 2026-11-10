#!/usr/bin/env node
'use strict';
/*!
 * circuit-dedupe — reference-solution circuit cleanup.
 *
 * The level compiler builds a circuit of modules (nodes) and wires (edges) whose
 * last module feeds the level's `target` pad.  Several reference circuits contain
 * repeated *identical assertions*: the same proposition is proved twice (for
 * example two copies of an imported theorem, or two copies created by circuit
 * splitting).  Those duplicates are harmless for the evaluator but noise for the
 * reference solution, so they are merged here.
 *
 * The old inline implementation in scripts/build-campaign2.js had two blind
 * spots:
 *   1. it only ran when the *whole* circuit evaluated (`pre.complete`), which is
 *      never true while unresolved `theorem` placeholders are present;
 *   2. it only read `Engine` results, so theorem placeholders had no tokens.
 * This module fixes both by accepting a caller supplied `tokensOf(nodeId)`.
 *
 * API
 * ---
 *   dedupeCircuit({ nodes, edges, targetId, results, tokensOf })
 *     -> { nodes, edges, removed, mergedGroups }
 *
 *   tokensOf(nodeId) -> string[] | null
 *     Canonical assertion tokens for a node (e.g. ['|-', '(', 'P', '->', 'P', ')']),
 *     or null when the node is unresolved / is not an assertion.  Callers usually
 *     combine `results.results[id].tokens` with a map of theorem placeholder code
 *     -> level targetTokens.
 *
 *     When `tokensOf` is omitted the default resolver reads
 *     `results.results[nodeId].tokens` (and also accepts a plain id -> result map
 *     for convenience).
 *
 * Rules
 * -----
 *   - Only non-target nodes are merged, and only when both token arrays are
 *     assertions (first token `'|-'`) and exactly equal after joining with
 *     `\u0000`.  Null/empty/non-assertion tokens never merge.
 *   - Survivor preference: theorem > axiom > subst > def-contract/def-expand >
 *     every other kind; ties are broken by the earliest position in the original
 *     node array.  Node creation order is not topological, so if the preferred
 *     node is *downstream* of another duplicate the root-most member wins
 *     instead; removing an ancestor would break the survivor's proof.  Survivor
 *     nodes keep their object identity, id and config.
 *   - Outgoing edges of a merged node are always rewired to the survivor.
 *     Incoming edges are rewired too when the duplicates are parallel.  When the
 *     merged node is downstream of the survivor it is a redundant re-derivation,
 *     so its incoming edges are dropped (its private input cone is pruned);
 *     moving them onto the survivor would close a cycle.  Self-edges are dropped
 *     and duplicate parallel edges (same from node/port and to node/port)
 *     collapse to the first occurrence.
 *   - The merge pass is repeated until it reaches a fixed point, then nodes that
 *     are not backward-reachable from `targetId` are pruned.  If no target can be
 *     identified (or the reachable set would be empty) pruning is skipped, so a
 *     caller can never accidentally lose the whole circuit.
 *   - The input arrays/objects are not mutated.  Unchanged edges keep their
 *     object identity; rewired edges are copied.
 *
 * Intentional limitations
 * -----------------------
 * Equality is *syntactic* (token arrays), not semantic.  Two formulas that are
 * definitionally equal (e.g. `P /\ Q` vs its `-.`/`->` expansion) but have
 * different token arrays are NOT merged.  That is deliberate: the reference
 * circuit must remain a faithful, evaluator-compatible proof.
 *
 * In a cyclic duplicate group (invalid circuits only) there is no root-most
 * member; the pass leaves those nodes unmerged rather than corrupting the graph.
 */

const KEY_SEP = '\u0000';
const ASSERTION_HEAD = '|-';

/* Survivor priority: lower wins.  `def-contract` and `def-expand` share a rank. */
const SURVIVOR_RANK = {
  theorem: 0,
  axiom: 1,
  subst: 2,
  'def-contract': 3,
  'def-expand': 3
};
const DEFAULT_RANK = 4;

/**
 * Canonical key for an assertion token array.
 * Returns null for anything that is not a non-empty array.
 *
 * @param {unknown} tokens
 * @returns {string|null}
 */
function assertionKey(tokens) {
  if (!Array.isArray(tokens) || tokens.length === 0) return null;
  return tokens.join(KEY_SEP);
}

/** True when `tokens` is a non-empty assertion token array (starts with `|-`). */
function isAssertionTokens(tokens) {
  return Array.isArray(tokens) && tokens.length > 0 && tokens[0] === ASSERTION_HEAD;
}

/** Deterministic survivor rank for a node kind. */
function rankOf(node) {
  const kind = node && node.kind;
  if (typeof kind === 'string' && Object.prototype.hasOwnProperty.call(SURVIVOR_RANK, kind)) {
    return SURVIVOR_RANK[kind];
  }
  return DEFAULT_RANK;
}

/**
 * Build the token lookup used by the merge pass.
 * Custom `tokensOf` wins; otherwise fall back to Engine results.
 */
function makeTokenResolver(results, tokensOf) {
  if (typeof tokensOf === 'function') {
    return function resolveCustom(node) { return tokensOf(node.id); };
  }
  /* Engine returns { results: { id: { tokens } } }; tests/callers sometimes pass
     the bare results map.  Support both shapes. */
  const table = results && typeof results === 'object' && results.results &&
    typeof results.results === 'object' ? results.results : results;
  return function resolveFromResults(node) {
    if (!table || typeof table !== 'object') return null;
    const row = table[node.id];
    if (!row || typeof row !== 'object') return null;
    return Array.isArray(row.tokens) ? row.tokens : null;
  };
}

/**
 * Rewire edges through a list of merges, dropping self-edges and duplicate
 * parallel edges.  Unchanged edges keep identity.
 *
 * `merges` is [{ removedId, survivorId, keepIncoming }].  Outgoing edges of a
 * removed node always move to the survivor.  Incoming edges move too by
 * default; when `keepIncoming` is false they are dropped instead.  That is the
 * cycle-safe path for a merged node that is downstream of its survivor: it was
 * a redundant re-derivation, so its input cone is no longer needed, while
 * moving its inputs onto the survivor would close a cycle (I-24 does exactly
 * this).
 */
function rewireEdges(edges, merges) {
  const replace = new Map();
  merges.forEach((merge) => {
    replace.set(merge.removedId, merge);
  });
  const out = [];
  const seen = new Set();
  for (const edge of edges) {
    if (!edge || !edge.from || !edge.to) continue;
    const fromMerge = replace.get(edge.from.node);
    const toMerge = replace.get(edge.to.node);
    const fromId = fromMerge ? fromMerge.survivorId : edge.from.node;
    let toId = edge.to.node;
    if (toMerge) {
      if (!toMerge.keepIncoming) continue; /* drop the removed re-derivation's inputs */
      toId = toMerge.survivorId;
    }
    if (fromId === toId) continue; /* self-edge: never useful, can make cycles */
    const key = JSON.stringify([fromId, edge.from.port, toId, edge.to.port]);
    if (seen.has(key)) continue;
    seen.add(key);
    if (fromId === edge.from.node && toId === edge.to.node) {
      out.push(edge);
    } else {
      out.push(Object.assign({}, edge, {
        from: Object.assign({}, edge.from, { node: fromId }),
        to: Object.assign({}, edge.to, { node: toId })
      }));
    }
  }
  return out;
}

/** Forward adjacency map (node id -> array of downstream node ids). */
function forwardAdjacency(nodes, edges) {
  const adjacency = new Map();
  nodes.forEach((node) => {
    if (node && typeof node.id === 'string') adjacency.set(node.id, []);
  });
  edges.forEach((edge) => {
    if (!edge || !edge.from || !edge.to) return;
    const list = adjacency.get(edge.from.node);
    if (list && adjacency.has(edge.to.node)) list.push(edge.to.node);
  });
  return adjacency;
}

/** Is `to` reachable from `from` (inclusive)?  Cycle-safe. */
function reaches(adjacency, from, to) {
  if (from === to) return true;
  const seen = new Set([from]);
  const stack = [from];
  while (stack.length) {
    const id = stack.pop();
    const next = adjacency.get(id) || [];
    for (const child of next) {
      if (child === to) return true;
      if (!seen.has(child)) {
        seen.add(child);
        stack.push(child);
      }
    }
  }
  return false;
}

/**
 * Decide, per removed node, whether its incoming edges can safely move to the
 * survivor.  In a DAG:
 *   - survivor -> removed  (removed is a redundant re-derivation): moving the
 *     removed node's inputs would close a cycle, so drop them;
 *   - removed -> survivor  (survivor is downstream of the removed node):
 *     removing the ancestor would break the survivor, so keep the duplicate;
 *   - parallel: full rewire is safe.
 */
function planMerges(adjacency, groups) {
  const merges = [];
  for (const group of groups) {
    const survivor = group.survivor;
    for (const removed of group.members) {
      if (removed === survivor) continue;
      if (reaches(adjacency, removed.id, survivor.id)) continue; /* cannot remove an ancestor */
      const keepIncoming = !reaches(adjacency, survivor.id, removed.id);
      merges.push({
        removedId: removed.id,
        survivorId: survivor.id,
        keepIncoming
      });
    }
  }
  return merges;
}

/**
 * Backward reachability from the target.  Keeps the original arrays when no
 * target can be found (so "unreachable logic" can never erase everything).
 */
function pruneUnreachable(nodes, edges, targetId) {
  const ids = new Set();
  nodes.forEach((node) => {
    if (node && typeof node.id === 'string') ids.add(node.id);
  });

  let root = typeof targetId === 'string' && ids.has(targetId) ? targetId : null;
  if (!root) {
    const targetNode = nodes.find((node) => node && node.kind === 'target' && ids.has(node.id));
    root = targetNode ? targetNode.id : null;
  }
  if (!root) return { nodes, edges };

  const incoming = new Map();
  edges.forEach((edge) => {
    if (!edge || !edge.from || !edge.to) return;
    if (!incoming.has(edge.to.node)) incoming.set(edge.to.node, []);
    incoming.get(edge.to.node).push(edge.from.node);
  });

  const keep = new Set([root]);
  const stack = [root];
  while (stack.length) {
    const id = stack.pop();
    const parents = incoming.get(id);
    if (!parents) continue;
    for (const parent of parents) {
      if (ids.has(parent) && !keep.has(parent)) {
        keep.add(parent);
        stack.push(parent);
      }
    }
  }
  if (keep.size === 0) return { nodes, edges }; /* defensive; root is always kept */

  return {
    nodes: nodes.filter((node) => node && keep.has(node.id)),
    edges: edges.filter((edge) => edge && edge.from && edge.to &&
      keep.has(edge.from.node) && keep.has(edge.to.node))
  };
}

/**
 * Merge nodes carrying the same assertion and prune the disconnected remainder.
 *
 * @param {{
 *   nodes?: Array<object>,
 *   edges?: Array<object>,
 *   targetId?: string,
 *   results?: object,
 *   tokensOf?: (nodeId: string) => Array<string>|null
 * }} options
 * @returns {{
 *   nodes: Array<object>,
 *   edges: Array<object>,
 *   removed: number,
 *   mergedGroups: Array<{key: string, survivorId: string, memberIds: string[], removedIds: string[]}>
 * }}
 */
function dedupeCircuit(options) {
  if (!options || typeof options !== 'object') {
    throw new TypeError('dedupeCircuit(options): options object is required');
  }
  const inputNodes = Array.isArray(options.nodes) ? options.nodes : [];
  const inputEdges = Array.isArray(options.edges) ? options.edges : [];
  const targetId = options.targetId;
  const resolveTokens = makeTokenResolver(options.results, options.tokensOf);

  /* Original order is the tie breaker; keep it stable across iterations. */
  const order = new Map();
  inputNodes.forEach((node, index) => {
    if (node && typeof node.id === 'string' && !order.has(node.id)) order.set(node.id, index);
  });
  const orderOf = (node) => (order.has(node.id) ? order.get(node.id) : Number.MAX_SAFE_INTEGER);

  let nodes = inputNodes.slice();
  let edges = inputEdges.slice();
  const mergedGroups = [];

  /* Fixed point.  Every productive iteration removes at least one node, so the
     loop is bounded by inputNodes.length even if tokensOf misbehaves. */
  for (;;) {
    const adjacency = forwardAdjacency(nodes, edges);
    const groups = new Map();
    for (const node of nodes) {
      if (!node || typeof node.id !== 'string') continue;
      if (node.id === targetId || node.kind === 'target') continue;
      const tokens = resolveTokens(node);
      if (!isAssertionTokens(tokens)) continue;
      const key = assertionKey(tokens);
      if (key === null) continue;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(node);
    }

    const merges = [];
    const pendingGroups = [];
    for (const [key, members] of groups) {
      if (members.length < 2) continue;
      members.sort((a, b) => (rankOf(a) - rankOf(b)) || (orderOf(a) - orderOf(b)));
      /* Node creation order is not topological: the rank/order preferred node
         can be a *descendant* of another duplicate.  Removing an ancestor would
         break the survivor's proof, so prefer a member that no other member
         reaches; rank/order picks among the parallel root candidates.  In a
         cyclic group there is no root and the first preferred member is used
         (planMerges will then refuse the cycle-closing merges). */
      let survivor = members[0];
      for (const candidate of members) {
        const hasAncestorInGroup = members.some((other) =>
          other !== candidate && reaches(adjacency, other.id, candidate.id));
        if (!hasAncestorInGroup) {
          survivor = candidate;
          break;
        }
      }
      const planned = planMerges(adjacency, [{ survivor, members }]);
      if (!planned.length) continue;
      merges.push.apply(merges, planned);
      pendingGroups.push({
        key,
        survivorId: survivor.id,
        memberIds: [survivor.id].concat(planned.map((merge) => merge.removedId)),
        removedIds: planned.map((merge) => merge.removedId)
      });
    }
    if (merges.length === 0) break;

    const removedIds = new Set(merges.map((merge) => merge.removedId));
    mergedGroups.push.apply(mergedGroups, pendingGroups);
    nodes = nodes.filter((node) => !removedIds.has(node.id));
    edges = rewireEdges(edges, merges);
  }

  /* Normalise even when nothing merged: drop self edges / duplicate parallel
     edges introduced by an earlier caller and keep edge identity when possible. */
  edges = rewireEdges(edges, []);

  const pruned = pruneUnreachable(nodes, edges, targetId);
  return {
    nodes: pruned.nodes,
    edges: pruned.edges,
    removed: inputNodes.length - pruned.nodes.length,
    mergedGroups
  };
}

module.exports = {
  assertionKey,
  dedupeCircuit
};
