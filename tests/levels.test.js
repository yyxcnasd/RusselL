/* 逐关校验：240 关、四章各 60 关、目标可解析、参考电路可被真实引擎求值。
 * 同时检查 theorem:<id> 只引用更早的关卡、axiom:<id> / archive:<label> 存在。 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..');
const ctx = { window: {}, console, JSON, Math, Date, URLSearchParams };
ctx.globalThis = ctx;
vm.createContext(ctx);
for (const f of ['src/logic.js', 'src/archive.js', 'src/library.js', 'src/levels.js', 'src/levels-generated.js', 'src/engine.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
}
const RSL = ctx.window.RSL;
const L = RSL.Logic;
const levels = RSL.LEVELS;
const archiveIds = new Set(Object.keys(RSL.ARCHIVE || {}));

let failures = 0;
function fail(id, message) {
  failures += 1;
  console.log('FAIL', id, message);
}

/* 1. 结构与平衡 */
const CHAPTERS = ['prop', 'pred', 'eq', 'set'];
for (const ch of CHAPTERS) {
  const group = levels.filter((lv) => lv.chapter === ch);
  if (group.length !== 60) fail(ch, '章内关卡数应为 60，实际 ' + group.length);
}
if (levels.length !== 240) fail('catalog', '总关卡数应为 240，实际 ' + levels.length);

const indexOf = {};
levels.forEach((lv, i) => { indexOf[lv.id] = i; });
const axiomIds = new Set(RSL.AXIOMS.map((a) => a.id));

/* 0. 公理目录：id 唯一、公式全部可解析；定义不能混进断言/档案。 */
if (axiomIds.size !== RSL.AXIOMS.length) fail('axioms', '公理 id 有重复');
for (const a of RSL.AXIOMS) {
  try { L.parse(a.schema); } catch (err) { fail('axiom:' + a.id, 'schema 无法解析：' + err.message); }
  if (/^df/.test(a.id)) fail('axioms', '定义不能作为公理模块：' + a.id);
}
for (const label of archiveIds) {
  if (/^df/.test(label)) fail('archive', '定义不能进入档案：' + label);
}
for (const lv of levels) {
  if ((lv.allowed || []).some((k) => /^axiom:df/.test(k))) fail(lv.id, '不能使用 axiom:df-*');
}
const bandCount = { base: 0, challenge: 0 };
levels.forEach((lv) => { bandCount[lv.band] = (bandCount[lv.band] || 0) + 1; });
if (bandCount.base !== 120 || bandCount.challenge !== 120) fail('bands', '基础/挑战应各 120 关，实际 ' + JSON.stringify(bandCount));

/* 挑战段不应该出现“一块档案直接接目标”这种一节点关卡。 */
for (const lv of levels.filter((l) => l.band === 'challenge')) {
  if (lv.solution && lv.solution.nodes.length < 2) fail(lv.id, '挑战段关卡过短：' + lv.solution.nodes.length + ' 个模块');
}

for (const lv of levels) {
  /* 2. 目标可解析 */
  try { L.parse(lv.target); } catch (err) { fail(lv.id, '目标无法解析：' + err.message); continue; }

  /* 3. allowed 引用合法 */
  for (const key of lv.allowed || []) {
    if (key === 'target') continue;
    if (key.indexOf('axiom:') === 0) {
      const id = key.slice(6);
      if (!axiomIds.has(id)) fail(lv.id, '引用了不存在的公理 ' + id);
    } else if (key.indexOf('theorem:') === 0) {
      const id = key.slice(8);
      const idx = indexOf[id];
      if (idx === undefined) fail(lv.id, '引用了不存在的关卡结论 ' + id);
      else if (idx >= indexOf[lv.id]) fail(lv.id, '引用了不早于自己的关卡 ' + id);
    } else if (key.indexOf('archive:') === 0) {
      const label = key.slice(8);
      if (!archiveIds.has(label)) fail(lv.id, '引用了不存在的 set.mm 档案条目 ' + label);
    }
  }

  /* 4. 参考电路 */
  const sol = lv.solution;
  if (!sol || !sol.nodes || !sol.nodes.length) { fail(lv.id, '缺少参考电路'); continue; }
  const target = { id: 'target', kind: 'target', x: 900, y: 300, target: lv.target, config: {} };
  const nodes = [target].concat(sol.nodes.map((n) => ({ ...n, config: { ...n.config } })));
  const edges = sol.edges.map((e, i) => ({ id: 'e' + i, from: { ...e.from }, to: { ...e.to } }));
  let r;
  try { r = RSL.Engine.evaluate(lv, nodes, edges); } catch (err) { fail(lv.id, '引擎异常：' + err.message); continue; }
  if (!r.complete) {
    fail(lv.id, '未完成：' + (r.errors.map((e) => e.message).join(' | ') || ('target=' + (r.target && r.target.state))));
  }

  /* 5. 所有构造/规则模块都出现在 allowed 里（防止参考电路偷偷用未提供的元件） */
  const allowed = new Set(lv.allowed || []);
  for (const node of sol.nodes) {
    if (node.kind === 'axiom') {
      if (!allowed.has('axiom:' + node.config.axiomId)) fail(lv.id, '参考电路用了未列出的公理 ' + node.config.axiomId);
    } else if (node.kind === 'theorem') {
      if (!allowed.has('theorem:' + node.config.theoremCode)) fail(lv.id, '参考电路用了未列出的结论 ' + node.config.theoremCode);
    } else if (node.kind === 'archive') {
      if (!allowed.has('archive:' + node.config.label)) fail(lv.id, '参考电路用了未列出的档案 ' + node.config.label);
    } else if (!allowed.has(node.kind) && node.kind !== 'target') {
      fail(lv.id, '参考电路用了未列出的模块 ' + node.kind);
    }
  }
}

/* 6. 同章内允许使用前面已证的定理模块（跨章也允许；本测试只查顺序）。 */
console.log('\nlevels:', levels.length,
  'chapters:', CHAPTERS.map((ch) => levels.filter((lv) => lv.chapter === ch).length).join('/'),
  'archive:', archiveIds.size,
  'failures:', failures);
process.exit(failures ? 1 : 0);
