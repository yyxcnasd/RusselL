#!/usr/bin/env node
'use strict';
/*
 * P0 特征化基线：把「重放关 / 普通关融合」重构前的当前行为固化成 golden 数据。
 *
 * 用法：
 *   node scripts/golden.js --write   # 重新生成 research/golden.json
 *   node scripts/golden.js --check   # 用当前 src/ 重新计算并逐字段比对，失败退出码 1
 *
 * golden 只记录**行为**（求值结果、公式 key/渲染），不记录时间戳；对象键与数组
 * 全部按确定规则排序，因此同一个工作树的两次 --write 必须产生完全相同的 sha256。
 *
 * 采集内容：
 *   wiring    240 个接线关：目标焊盘 + 参考电路，Engine.evaluate 逐节点 state/公式，
 *             以及 complete / target.state / errors。
 *   replay    48 个重放关：Graph.initial + Graph.plan 摆出参考图，Graph.evaluate 逐节点
 *             kind/label/state/结论 token（Expr.toASCII），以及 complete / target.state / errors。
 *   formulas  240 关目标 + 20 条公理 schema + 993 条 set.mm 档案 + 全部参考电路节点公式：
 *             src 标签 + Logic.fmt + Logic.key(Logic.expand)。
 *   eqPairs   公式语料上的确定性 eq 判定样本（连续 offset + 同 key 等价对），
 *             [aIdx, bIdx, Boolean]，索引指向 formulas 数组。
 *
 * 依赖 scripts/lib/load-runtime.js，按 index.html 里 <script src> 的实际顺序加载全部运行时脚本。
 * UI 脚本（ui/board/main…）在浏览器外需要宿主对象才能加载；这里只提供最小 DOM
 * 垫片，并让 document.readyState = 'loading'，不触发 main.js 的 init（不产生 UI 副作用）。
 * 垫片不参与任何数据计算，golden 内容只来自 Logic/Engine/MM.Graph 的真实求值。
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { loadRuntime, ROOT } = require('./lib/load-runtime');

const SCHEMA_VERSION = 1;
const OUT_FILE = path.join(ROOT, 'research', 'golden.json');

const INDEX_FILE = path.join(ROOT, 'index.html');

/*
 * 运行时脚本清单直接来自 index.html 的 <script src>（顺序一致）。
 * 这样 P2 把 src/term.js、src/modules.js 插到 src/engine.js 之前时，
 * golden 门禁自动跟随产品加载顺序，不需要再手抄一份列表。
 */
function runtimeFilesFromIndex() {
  const html = fs.readFileSync(INDEX_FILE, 'utf8');
  const files = [];
  const re = /<script\b[^>]*\bsrc\s*=\s*["']([^"']+\.js)["'][^>]*>/gi;
  let match;
  while ((match = re.exec(html)) !== null) {
    const src = match[1].trim();
    if (/^https?:\/\//i.test(src)) continue; /* 外部脚本不参与本地 vm 装载 */
    files.push(src.replace(/^\.?\//, ''));
  }
  if (!files.length) throw new Error('index.html 里找不到任何 <script src="*.js">');
  return files;
}

/* ---------- 确定性工具 ---------- */

function byKey(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

/* 递归排序对象键（数组顺序保持不变）。 */
function sortDeep(value) {
  if (Array.isArray(value)) return value.map(sortDeep);
  if (value && typeof value === 'object') {
    const out = {};
    Object.keys(value).sort(byKey).forEach((key) => { out[key] = sortDeep(value[key]); });
    return out;
  }
  return value;
}

/* 节点 config 的规范表示：键排序后的 JSON 字符串（不依赖属性插入顺序）。 */
function canonicalJSON(value) {
  return JSON.stringify(sortDeep(value === undefined ? {} : value));
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

/* ---------- 浏览器宿主垫片（只为让 UI 脚本在 vm 里加载） ---------- */

function elementStub() {
  const cache = new Map();
  const target = function () {};
  const proxy = new Proxy(target, {
    get(t, prop) {
      if (prop === Symbol.toPrimitive) return () => 0;
      if (prop === Symbol.iterator) return function* () {};
      if (prop === 'then') return undefined;
      if (prop === 'length') return 0;
      if (prop === 'getBoundingClientRect') {
        return () => ({ x: 0, y: 0, width: 0, height: 0, left: 0, top: 0, right: 0, bottom: 0 });
      }
      if (prop === 'value' || prop === 'textContent' || prop === 'innerHTML' ||
          prop === 'id' || prop === 'tagName' || prop === 'title') return '';
      if (/^(offset|client|scroll)(Width|Height|Left|Top)$/.test(prop)) return 0;
      if (prop === 'hidden' || prop === 'checked' || prop === 'disabled') return false;
      if (!cache.has(prop)) cache.set(prop, elementStub());
      return cache.get(prop);
    },
    set() { return true; },
    apply() { return elementStub(); }
  });
  return proxy;
}

function loadGoldenRuntime() {
  const documentStub = {
    readyState: 'loading', /* 不触发 main.js 的 init() */
    addEventListener() {},
    removeEventListener() {},
    querySelector() { return elementStub(); },
    querySelectorAll() { return []; },
    getElementById() { return elementStub(); },
    createElement() { return elementStub(); },
    createElementNS() { return elementStub(); },
    body: elementStub(),
    documentElement: elementStub(),
    head: elementStub(),
    hidden: false,
    visibilityState: 'visible',
    fonts: { ready: Promise.resolve() },
    execCommand() {},
    activeElement: { blur() {} }
  };
  const windowStub = {
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {},
    matchMedia() { return { matches: false, addEventListener() {}, removeEventListener() {} }; },
    getComputedStyle() { return elementStub(); },
    location: { search: '', hash: '', href: 'http://localhost/' },
    history: { replaceState() {} },
    requestAnimationFrame() { return 0; },
    cancelAnimationFrame() {},
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    scrollTo() {},
    innerWidth: 1280,
    innerHeight: 800,
    devicePixelRatio: 1
  };
  return loadRuntime({
    files: runtimeFilesFromIndex(),
    localStorage: true,
    globals: {
      document: documentStub,
      window: windowStub,
      navigator: { userAgent: 'node-golden' },
      performance: { now() { return 0; } },
      requestAnimationFrame() { return 0; },
      cancelAnimationFrame() {}
    }
  });
}

/* ---------- 采集 ---------- */

function stepArity(level, label) {
  const spec = (level.palette || []).filter((p) => p.kind === 'mmstep' && p.config && p.config.label === label)[0];
  return spec && spec.config && typeof spec.config.arity === 'number' ? spec.config.arity : 0;
}

function buildGolden() {
  const RSL = loadGoldenRuntime();
  const Term = RSL.Term;
  const Engine = RSL.Engine;

  /* 公式统一是 token（RSL.Term）；golden 的 key/fmt 是 P0 用 Logic 采集的，
     P1 已逐条对拍两者 0 差异，所以 expected 仍然有效。 */
  function formulaOfResult(res) {
    if (!res) return { key: null, fmt: null };
    if (Array.isArray(res.tokens) && res.tokens.length) {
      return { key: Term.key(res.tokens), fmt: Term.fmt(res.tokens) };
    }
    return { key: null, fmt: null };
  }

  const FT = {
    parse: (text) => Term.parse(text),
    fmt: (tokens) => Term.fmt(tokens),
    key: (tokens) => Term.key(tokens)
  };
  const formulas = [];

  function pushFormulaText(src, text) {
    try {
      const parsed = FT.parse(text);
      formulas.push({ src, fmt: FT.fmt(parsed), key: FT.key(parsed) });
    } catch (err) {
      formulas.push({ src, error: err && err.message ? err.message : String(err) });
    }
  }

  function pushFormulaRecord(src, record) {
    if (!record || !record.fmt || !record.key) {
      formulas.push({ src, error: 'no formula' });
      return;
    }
    formulas.push({ src, fmt: record.fmt, key: record.key });
  }

  /* ---- 接线关（240） ---- */
  const wiring = {};
  const wiringAnomalies = [];
  const levels = RSL.LEVELS
    .filter((lv) => lv.track !== 'replay')
    .slice()
    .sort((a, b) => byKey(a.id, b.id));
  let wiringNodes = 0;
  let wiringEdges = 0;

  for (const lv of levels) {
    const target = { id: 'target', kind: 'target', x: 900, y: 300, target: lv.target, config: {} };
    const nodes = [target].concat((lv.solution.nodes || []).map((n) => ({
      ...n,
      config: { ...(n.config || {}) }
    })));
    const edges = (lv.solution.edges || []).map((edge, i) => ({
      id: 'e' + i,
      from: { ...edge.from },
      to: { ...edge.to }
    }));
    wiringNodes += nodes.length;
    wiringEdges += edges.length;

    let result;
    try {
      result = Engine.evaluate(lv, nodes, edges);
    } catch (err) {
      wiringAnomalies.push({ level: lv.id, error: 'evaluate threw: ' + err.message });
      wiring[lv.id] = {
        complete: false,
        targetState: null,
        errors: [{ nodeId: 'level', message: 'evaluate threw: ' + err.message }],
        nodes: []
      };
      continue;
    }

    /* 目标公式进入语料（顺序：每关目标 → 该关参考电路节点，便于同关 eq 采样）。 */
    pushFormulaText('level:' + lv.id, lv.target);

    const sortedNodes = nodes.slice().sort((a, b) => byKey(a.id, b.id));
    const nodeRecords = sortedNodes.map((node) => {
      const res = result.results[node.id];
      const formula = formulaOfResult(res);
      pushFormulaRecord('circuit:' + lv.id + ':' + node.id, formula);
      if (!res) {
        wiringAnomalies.push({ level: lv.id, node: node.id, error: 'no result' });
      } else if (!formula.key && (res.state === 'valid' || res.state === 'complete')) {
        wiringAnomalies.push({
          level: lv.id,
          node: node.id,
          error: 'formula null for state ' + res.state
        });
      }
      return {
        id: node.id,
        kind: node.kind,
        config: canonicalJSON(node.config),
        state: res ? res.state : null,
        key: formula.key,
        fmt: formula.fmt
      };
    });

    const errors = (result.errors || [])
      .map((e) => ({ nodeId: e.nodeId, message: e.message }))
      .sort((a, b) => byKey(a.nodeId, b.nodeId));
    if (!result.complete) {
      wiringAnomalies.push({
        level: lv.id,
        error: 'incomplete: ' + (errors.map((e) => e.message).join(' | ') || 'target=' + (result.target && result.target.state))
      });
    }
    if (errors.length) {
      wiringAnomalies.push({ level: lv.id, error: 'errors: ' + JSON.stringify(errors) });
    }

    wiring[lv.id] = {
      complete: !!result.complete,
      targetState: result.target ? result.target.state : null,
      errors,
      nodes: nodeRecords
    };
  }

  /* ---- 公理 schema（20） ---- */
  const axioms = RSL.AXIOMS.slice().sort((a, b) => byKey(a.id, b.id));
  for (const axiom of axioms) {
    pushFormulaText('axiom:' + axiom.id, axiom.schema);
  }

  /* ---- set.mm 档案（993） ---- */
  const archiveLabels = Object.keys(RSL.ARCHIVE || {}).sort(byKey);
  for (const label of archiveLabels) {
    pushFormulaText('archive:' + label, RSL.ARCHIVE[label].formula);
  }

  /* ---- 重放关（48） ---- */
  const replay = {};
  const replayAnomalies = [];
  const mmLevels = RSL.MM_LEVELS.slice().sort((a, b) => byKey(a.id, b.id));
  let replayNodes = 0;
  let replayEdges = 0;

  for (const lv of mmLevels) {
    const proof = RSL.MM_PROOFS[lv.proofId];
    if (!proof) {
      replayAnomalies.push({ level: lv.id, error: 'missing proof ' + lv.proofId });
      replay[lv.id] = {
        complete: false,
        targetState: null,
        errors: [{ nodeId: 'proof', message: 'missing proof ' + lv.proofId }],
        nodes: []
      };
      continue;
    }

    /* 与运行时同一份数据：initialNodes 提供目标 + 前提，reference 提供参考动作与坐标。
       节点 id 沿用旧 Graph 的命名（h_<label> / s_<stepId>），golden 可以继续逐节点比对。 */
    const nodes = lv.initialNodes.map((node) => JSON.parse(JSON.stringify(node)));
    const edges = [];
    const byStep = {};
    for (const action of lv.reference) {
      if (action.kind === 'hyp') {
        byStep[action.stepId] = 'h_' + action.label;
        continue;
      }
      const nodeId = 'n_' + action.stepId;
      nodes.push({
        id: nodeId,
        kind: 'mmstep',
        x: typeof action.x === 'number' ? action.x : 0,
        y: typeof action.y === 'number' ? action.y : 0,
        config: { label: action.label, arity: stepArity(lv, action.label) }
      });
      byStep[action.stepId] = nodeId;
      action.inputs.forEach((input, i) => {
        edges.push({
          id: 'e_' + action.stepId + '_' + i,
          from: { node: byStep[input], port: 'out' },
          to: { node: nodeId, port: 'e' + (i + 1) }
        });
      });
    }
    const finalAction = lv.reference.filter((action) => action.kind === 'assert').pop();
    if (!finalAction) {
      replayAnomalies.push({ level: lv.id, error: 'reference has no assert step' });
      replay[lv.id] = { complete: false, targetState: null, errors: [{ nodeId: 'plan', message: 'reference has no assert step' }], nodes: [] };
      continue;
    }
    edges.push({ id: 'e_final', from: { node: byStep[finalAction.stepId], port: 'out' }, to: { node: 'target', port: 'proof' } });
    replayNodes += nodes.length;
    replayEdges += edges.length;

    let result;
    try {
      result = Engine.evaluate(lv, nodes, edges, { proof });
    } catch (err) {
      replayAnomalies.push({ level: lv.id, error: 'evaluate threw: ' + err.message });
      replay[lv.id] = { complete: false, targetState: null, errors: [{ nodeId: 'level', message: 'evaluate threw: ' + err.message }], nodes: [] };
      continue;
    }

    const sortedNodes = nodes.slice().sort((a, b) => byKey(a.id, b.id));
    const nodeRecords = sortedNodes.map((node) => {
      const res = result.results[node.id];
      const tokens = res && Array.isArray(res.tokens) ? res.tokens : null;
      if (res && !tokens && res.state !== 'idle') {
        replayAnomalies.push({ level: lv.id, node: node.id, error: 'tokens null for state ' + res.state });
      }
      const cfg = node.config || {};
      return {
        id: node.id,
        kind: node.kind,
        label: cfg.label || '',
        state: res ? res.state : null,
        formula: tokens ? tokens.join(' ') : null,
        error: res && res.error ? res.error : null
      };
    });

    const errors = (result.errors || [])
      .map((e) => ({ nodeId: e.nodeId, message: e.message }))
      .sort((a, b) => byKey(a.nodeId, b.nodeId));
    if (!result.complete) {
      replayAnomalies.push({
        level: lv.id,
        error: 'incomplete: ' + (errors.map((e) => e.message).join(' | ') || 'target=' + (result.target && result.target.state))
      });
    }
    if (errors.length) {
      replayAnomalies.push({ level: lv.id, error: 'errors: ' + JSON.stringify(errors) });
    }

    replay[lv.id] = {
      complete: !!result.complete,
      targetState: result.target ? result.target.state : null,
      errors,
      nodes: nodeRecords
    };
  }

  /* 公式语料按 src 标签排序，保证数组顺序只由标签决定（而不是采集顺序）。 */
  const order = formulas
    .map((entry, i) => i)
    .sort((a, b) => byKey(formulas[a].src, formulas[b].src) || a - b);
  const orderedFormulas = order.map((i) => formulas[i]);

  /* ---- eq 采样 ---- */
  const eqPairs = buildEqPairs(orderedFormulas);

  const formulasBySrc = { level: 0, archive: 0, axiom: 0, circuit: 0 };
  for (const entry of orderedFormulas) {
    const kind = entry.src.slice(0, entry.src.indexOf(':'));
    if (Object.prototype.hasOwnProperty.call(formulasBySrc, kind)) formulasBySrc[kind] += 1;
  }

  const data = {
    schemaVersion: SCHEMA_VERSION,
    counts: {
      wiringLevels: levels.length,
      wiringNodes,
      wiringEdges,
      replayLevels: mmLevels.length,
      replayNodes,
      replayEdges,
      formulas: orderedFormulas.length,
      eqPairs: eqPairs.length,
      formulasBySrc
    },
    wiring,
    replay,
    formulas: orderedFormulas,
    eqPairs
  };

  return { data, wiringAnomalies, replayAnomalies };
}

/*
 * eq 判定样本（确定性）：
 *   1) 每个公式与 i+1 / i+3 / i+7（环形）比较，覆盖相邻与跨段；
 *   2) 同一个 expand-key 的公式之间补少量 true 对，保证 true/false 都有样本。
 * 结果按 [a, b] 升序去重后输出。
 */
function buildEqPairs(formulas) {
  const n = formulas.length;
  const seen = new Set();
  const pairs = [];

  function add(a, b) {
    if (a === b) return;
    if (a > b) { const t = a; a = b; b = t; }
    const left = formulas[a];
    const right = formulas[b];
    if (!left || !right || !left.key || !right.key) return;
    const dedupeKey = a + ',' + b;
    if (seen.has(dedupeKey)) return;
    seen.add(dedupeKey);
    /* eq 在旧 Logic 与新 Term 里都是「展开 + α 规范化后 key 相等」，直接用 key。 */
    pairs.push([a, b, left.key === right.key]);
  }

  if (n > 1) {
    const offsets = [1, 3, 7];
    for (let i = 0; i < n; i += 1) {
      for (const offset of offsets) add(i, (i + offset) % n);
    }
  }

  /* 同 key 等价对：每组取首条与其他最多 4 条配对（不重复已有对）。 */
  const groups = new Map();
  for (let i = 0; i < n; i += 1) {
    const entry = formulas[i];
    if (!entry.key) continue;
    if (!groups.has(entry.key)) groups.set(entry.key, []);
    groups.get(entry.key).push(i);
  }
  for (const indices of groups.values()) {
    if (indices.length < 2) continue;
    const first = indices[0];
    for (let i = 1; i < indices.length && i <= 4; i += 1) add(first, indices[i]);
  }

  pairs.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]));
  return pairs;
}

/* ---------- 比对 ---------- */

function typeName(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

function compareDeep(expected, actual, path, state) {
  const te = typeName(expected);
  const ta = typeName(actual);
  if (te !== ta) {
    state.count += 1;
    if (!state.first) state.first = { path: path || '<root>', expected, actual };
    return;
  }
  if (te === 'array') {
    if (expected.length !== actual.length) {
      state.count += 1;
      if (!state.first) {
        state.first = { path: (path || '<root>') + '.length', expected: expected.length, actual: actual.length };
      }
    }
    const len = Math.min(expected.length, actual.length);
    for (let i = 0; i < len; i += 1) compareDeep(expected[i], actual[i], path + '[' + i + ']', state);
    return;
  }
  if (te === 'object') {
    const keys = new Set(Object.keys(expected).concat(Object.keys(actual)));
    for (const key of Array.from(keys).sort(byKey)) {
      compareDeep(expected[key], actual[key], path ? path + '.' + key : key, state);
    }
    return;
  }
  if (!Object.is(expected, actual)) {
    state.count += 1;
    if (!state.first) state.first = { path: path || '<root>', expected, actual };
  }
}

function preview(value, limit) {
  let text;
  try {
    text = JSON.stringify(value);
  } catch (err) {
    text = String(value);
  }
  if (text === undefined) text = 'undefined';
  if (text.length > limit) return text.slice(0, limit) + '…';
  return text;
}

function describeCounts(counts) {
  return [
    'wiring ' + counts.wiringLevels + ' levels / ' + counts.wiringNodes + ' nodes / ' + counts.wiringEdges + ' edges',
    'replay ' + counts.replayLevels + ' levels / ' + counts.replayNodes + ' nodes / ' + counts.replayEdges + ' edges',
    'formulas ' + counts.formulas + ' (' +
      'level ' + counts.formulasBySrc.level + ', archive ' + counts.formulasBySrc.archive +
      ', axiom ' + counts.formulasBySrc.axiom + ', circuit ' + counts.formulasBySrc.circuit + ')',
    'eqPairs ' + counts.eqPairs
  ].join('\n  ');
}

function writeGolden() {
  const started = Date.now();
  const { data, wiringAnomalies, replayAnomalies } = buildGolden();
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  const text = JSON.stringify(sortDeep(data), null, 2) + '\n';
  fs.writeFileSync(OUT_FILE, text, 'utf8');
  const buffer = fs.readFileSync(OUT_FILE);
  const elapsed = Date.now() - started;

  console.log('golden written: ' + path.relative(ROOT, OUT_FILE));
  console.log('  bytes: ' + buffer.length);
  console.log('  sha256: ' + sha256(buffer));
  console.log('  entries:\n  ' + describeCounts(data.counts));
  console.log('  elapsed: ' + elapsed + ' ms');
  if (wiringAnomalies.length) {
    console.log('  wiring anomalies: ' + wiringAnomalies.length);
    for (const item of wiringAnomalies.slice(0, 10)) console.log('    ' + JSON.stringify(item));
  }
  if (replayAnomalies.length) {
    console.log('  replay anomalies: ' + replayAnomalies.length);
    for (const item of replayAnomalies.slice(0, 10)) console.log('    ' + JSON.stringify(item));
  }
  return 0;
}

function checkGolden() {
  const started = Date.now();
  if (!fs.existsSync(OUT_FILE)) {
    console.error('golden check FAILED: 找不到 ' + path.relative(ROOT, OUT_FILE) + '，先运行 node scripts/golden.js --write');
    return 1;
  }
  let expected;
  const buffer = fs.readFileSync(OUT_FILE);
  try {
    expected = JSON.parse(buffer.toString('utf8'));
  } catch (err) {
    console.error('golden check FAILED: ' + path.relative(ROOT, OUT_FILE) + ' 不是合法 JSON：' + err.message);
    return 1;
  }

  const { data: actual, wiringAnomalies, replayAnomalies } = buildGolden();
  const state = { count: 0, first: null };
  compareDeep(expected, sortDeep(actual), '', state);
  const elapsed = Date.now() - started;

  if (state.count > 0) {
    console.error('golden check FAILED');
    console.error('  file: ' + path.relative(ROOT, OUT_FILE) + ' (' + buffer.length + ' bytes, sha256 ' + sha256(buffer) + ')');
    console.error('  first diff: ' + state.first.path);
    console.error('    expected: ' + preview(state.first.expected, 500));
    console.error('    actual:   ' + preview(state.first.actual, 500));
    console.error('  total diffs: ' + state.count);
    console.error('  elapsed: ' + elapsed + ' ms');
    return 1;
  }

  console.log('golden check PASS');
  console.log('  file: ' + path.relative(ROOT, OUT_FILE) + ' (' + buffer.length + ' bytes, sha256 ' + sha256(buffer) + ')');
  console.log('  entries:\n  ' + describeCounts(actual.counts));
  console.log('  elapsed: ' + elapsed + ' ms');
  if (wiringAnomalies.length || replayAnomalies.length) {
    console.log('  note: 重新采集时出现 ' + (wiringAnomalies.length + replayAnomalies.length) + ' 条异常（golden 已记录其行为）');
  }
  return 0;
}

/* ---------- CLI ---------- */

function main(argv) {
  const args = argv.slice(2);
  if (args.length !== 1) {
    console.error('用法: node scripts/golden.js --write | --check');
    return 2;
  }
  if (args[0] === '--write') return writeGolden();
  if (args[0] === '--check') return checkGolden();
  if (args[0] === '--help' || args[0] === '-h') {
    console.log('用法: node scripts/golden.js --write | --check');
    return 0;
  }
  console.error('未知参数: ' + args[0]);
  console.error('用法: node scripts/golden.js --write | --check');
  return 2;
}

if (require.main === module) {
  process.exitCode = main(process.argv);
}

module.exports = { buildGolden, runtimeFilesFromIndex, OUT_FILE };
