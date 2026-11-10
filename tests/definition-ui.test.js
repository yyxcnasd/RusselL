'use strict';
/* D / D⁻ 选择性定义重写 + 节点配置弹层的验收。
 *
 * 纯语义部分用 load-runtime 复现 index.html 的经典脚本环境；浏览器冒烟可选，
 * 只在能拿到 Edge 时跑（复用 tests/lib/browser.js），不改任何现有测试。
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { loadRuntime } = require('../scripts/lib/load-runtime');
const { openPage, fileUrl, EDGE } = require('./lib/browser');

const ROOT = path.join(__dirname, '..');
const RSL = loadRuntime({ files: ['src/term.js', 'src/modules.js'] });
const T = RSL.Term;

/* 同一断言里两处 ∧ 定义 + 根上一处 ∨ 定义。 */
const SURFACE = T.parseAssertion('(P∧Q)∨(R∧S)');
const ALL_EXPANDED = T.expandDefinitions(SURFACE);

function countToken(tokens, token) {
  return tokens.filter((t) => t === token).length;
}

/* vm 上下文里的数组原型与本文件不同，deepStrictEqual 会误报，统一先转成本地值。 */
function plain(value) { return JSON.parse(JSON.stringify(value)); }
function sameTokens(actual, expected, message) {
  assert.strictEqual(JSON.stringify(actual), JSON.stringify(expected), message);
}

test('definitionSites：一条断言里列出多处定义位置（expand）', () => {
  const sites = T.definitionSites(SURFACE, 'expand');
  assert.strictEqual(sites.length, 3, '一个 ∨ + 两个 ∧ 共 3 处');
  assert.deepStrictEqual(plain(sites.map((s) => s.kind)), ['or', 'and', 'and']);
  assert.deepStrictEqual(plain(sites.map((s) => s.symbol)), ['∨', '∧', '∧']);
  assert.deepStrictEqual(plain(sites.map((s) => s.path)), [[], [0], [1]]);
  sites.forEach((site) => {
    assert.ok(typeof site.before === 'string' && site.before.length > 0, 'before 文本');
    assert.ok(typeof site.after === 'string' && site.after.length > 0, 'after 文本');
    assert.notStrictEqual(site.before, site.after, '展开前后的局部公式不同');
  });
  /* 路径稳定：同一条断言重复求值得到同一组路径。 */
  assert.deepStrictEqual(
    plain(T.definitionSites(SURFACE, 'expand').map((s) => s.path)),
    [[], [0], [1]]
  );
});

test('expandAt：只改路径所指的一处，另一处保持表面语法', () => {
  const once = T.expandAt(SURFACE, [0]);
  assert.strictEqual(once[0], '|-', '保留类型码');
  assert.strictEqual(countToken(once, '\\/'), 1, '根上的 ∨ 未被展开');
  assert.strictEqual(countToken(once, '/\\'), 1, '另一处 ∧ 仍保持表面语法');
  assert.strictEqual(countToken(once, '->'), 1, '只有被选中的 ∧ 变成 →');

  const remaining = T.definitionSites(once, 'expand');
  assert.deepStrictEqual(plain(remaining.map((s) => s.path)), [[], [1]], '只剩未展开的根 ∨ 与另一处 ∧');

  /* 单点展开后再全量展开，与直接全量展开等价；null 路径就是旧的展开全部。 */
  sameTokens(T.expandDefinitions(once), ALL_EXPANDED);
  sameTokens(T.expandAt(SURFACE, null), ALL_EXPANDED);
  sameTokens(T.expandAt(SURFACE), ALL_EXPANDED);
  /* [] 是根路径，只展开根，不等于全量。 */
  const rootOnly = T.expandAt(SURFACE, []);
  assert.notStrictEqual(JSON.stringify(rootOnly), JSON.stringify(ALL_EXPANDED));
  assert.strictEqual(countToken(rootOnly, '/\\'), 2, '根展开后两处 ∧ 子式原样保留');
});

test('contractAt：单点收缩是单点展开的逆，且全量收缩保持旧行为', () => {
  /* 展开 -> 收缩同一个路径：回到原来的表面公式。 */
  const expandedOne = T.expandAt(SURFACE, [1]);
  sameTokens(T.contractAt(expandedOne, [1]), SURFACE);

  const sites = T.definitionSites(ALL_EXPANDED, 'contract');
  assert.ok(sites.length >= 3, '全展开公式里至少能找到 ∨ 与两处 ∧ 的原始定义形');
  assert.ok(sites.some((s) => s.kind === 'or'));
  assert.ok(sites.some((s) => s.kind === 'and'));
  assert.deepStrictEqual(plain(T.definitionSites(ALL_EXPANDED, 'contract').map((s) => s.path)),
    plain(sites.map((s) => s.path)), '收缩路径稳定');

  /* 只收缩 [0,0]：只长出第一处 ∧，其余仍是原始公式。 */
  const partial = T.contractAt(ALL_EXPANDED, [0, 0]);
  assert.strictEqual(partial[0], '|-', '保留类型码');
  assert.strictEqual(countToken(partial, '/\\'), 1, '只收缩一处 ∧');
  assert.ok(countToken(partial, '->') > 0, '其余位置仍是原始 → 公式');

  /* 同路径重复收缩幂等；再展开同路径回到全展开。 */
  sameTokens(T.contractAt(partial, [0, 0]), partial);
  sameTokens(T.expandAt(partial, [0, 0]), ALL_EXPANDED);

  /* null / undefined = 旧的收缩全部行为。 */
  sameTokens(T.contractAt(ALL_EXPANDED, null), SURFACE);
  sameTokens(T.contractDefinitions(ALL_EXPANDED), SURFACE);
});

test('def-expand / def-contract 模块：config.at 选择性，缺省全量（向后兼容）', () => {
  const input = { assertion: SURFACE };
  const expandAll = RSL.Modules.apply('def-expand', input, {}, {});
  sameTokens(expandAll.tokens, ALL_EXPANDED, '没有 at 时展开全部');

  const expandOne = RSL.Modules.apply('def-expand', input, { at: [1] }, {});
  sameTokens(expandOne.tokens, T.expandAt(SURFACE, [1]));
  assert.notStrictEqual(JSON.stringify(expandOne.tokens), JSON.stringify(ALL_EXPANDED), '选择性展开确实不同于全量');
  assert.strictEqual(countToken(expandOne.tokens, '\\/'), 1, '根 ∨ 未受影响');

  const legacy = RSL.Modules.apply('def-expand', input, { at: null, preferPath: null }, {});
  sameTokens(legacy.tokens, ALL_EXPANDED, '非数组 at 走旧的全量逻辑');

  const contractAll = RSL.Modules.apply('def-contract', { assertion: ALL_EXPANDED }, {}, {});
  sameTokens(contractAll.tokens, SURFACE, '没有 at 时收缩全部');

  const contractOne = RSL.Modules.apply('def-contract', { assertion: ALL_EXPANDED }, { at: [1] }, {});
  sameTokens(contractOne.tokens, T.contractAt(ALL_EXPANDED, [1]));
  assert.notStrictEqual(JSON.stringify(contractOne.tokens), JSON.stringify(SURFACE), '选择性收缩不同于全量');
});

test('非法路径 / 非定义位置 / 未知 mode 都抛出清晰错误', () => {
  assert.throws(() => T.expandAt(SURFACE, [9]), /路径越界/);
  assert.throws(() => T.expandAt(SURFACE, [0, 0]), /不是定义展开位置/);
  assert.throws(() => T.contractAt(ALL_EXPANDED, [0]), /不是定义收缩位置/);
  assert.throws(() => T.expandAt(SURFACE, '0'), /路径/);
  assert.throws(() => T.expandAt(SURFACE, [-1]), /路径/);
  assert.throws(() => T.expandAt(SURFACE, [1.5]), /路径/);
  assert.throws(() => T.definitionSites(SURFACE, 'rename'), /mode/);
  assert.throws(() => RSL.Modules.apply('def-expand', { assertion: SURFACE }, { at: [9] }, {}), /路径/);
  assert.throws(() => RSL.Modules.apply('def-contract', { assertion: ALL_EXPANDED }, { at: [0] }, {}), /不是定义收缩位置/);
});

/* 可选浏览器冒烟：真实加载 index.html，选中 D 节点，点芯片改配置并刷新公式。
 * 若本机没有 Edge（tests/lib/browser.js 的默认路径），跳过而不伪造通过。 */
test('浏览器冒烟：D 节点打开大面板，点选定义位置后立即重写并更新列表', { skip: !fs.existsSync(EDGE) ? '找不到 Edge，跳过浏览器冒烟' : false }, async () => {
  const page = await openPage({
    width: 1440,
    height: 900,
    url: fileUrl('index.html'),
    shotDir: path.join(ROOT, '.research', 'shots')
  });
  try {
    await page.ready();
    await page.js(`(function () {
      var app = window.RSL.APP;
      var T = window.RSL.Term;
      app.state.forceUnlock = true;
      var levels = app.state.levels;
      /* 借一个更早的关卡当定理来源，并把它临时换成两处定义的目标公式。 */
      levels[0].targetTokens = T.parseAssertion('(P∧Q)∨(R∧S)');
      app.state.solved[levels[0].id] = true;
      app.loadLevel(1);
      var lv = app.state.level;
      var target = { id: 'target', kind: 'target', x: 940, y: 240, config: {}, targetTokens: lv.targetTokens };
      var theorem = { id: 'th', kind: 'theorem', x: 80, y: 240, config: { code: levels[0].code } };
      var def = { id: 'de', kind: 'def-expand', x: 500, y: 240, config: {} };
      app.state.board.setData([target, theorem, def], [
        { id: 'e1', from: { node: 'th', port: 'out' }, to: { node: 'de', port: 'assertion' } },
        { id: 'e2', from: { node: 'de', port: 'out' }, to: { node: 'target', port: 'proof' } }
      ]);
      app.state.board.select('de');
      app.state.selectedNode = 'de';
      app.refresh();
    })()`);
    await page.waitFor('document.querySelectorAll(".definition-sheet .def-row").length >= 3');

    const picker = await page.js(`(function () {
      var rows = Array.prototype.slice.call(document.querySelectorAll('.definition-sheet .def-row'));
      return {
        hidden: document.getElementById('overlay').hidden,
        rows: rows.length,
        input: document.querySelector('.def-input').textContent,
        count: document.querySelector('.def-count').textContent,
        hasPopover: !document.getElementById('popover').hidden,
        beforeTokens: window.RSL.APP.state.results.results.de.tokens,
        width: document.getElementById('sheet').getBoundingClientRect().width
      };
    })()`);
    assert.strictEqual(picker.hidden, false, 'D 节点打开大面板');
    assert.ok(picker.rows >= 3, '列出多处可重写位置（实际 ' + picker.rows + '）');
    assert.ok(picker.width > 600, 'D 面板比旧浮条宽');
    assert.ok(!/[\u4e00-\u9fa5]/.test(picker.input), '顶部输入公式不含汉字');
    assert.strictEqual(picker.hasPopover, false, '不再弹小浮条');
    assert.strictEqual(picker.count.trim(), '0 处已重写');
    assert.strictEqual(countToken(picker.beforeTokens, '/\\'), 2, '未选择时 D 节点保持原始 ∧ 公式');
    await page.shot('definition-picker');

    await page.js('document.querySelector(".definition-sheet .def-row").click()');
    await page.waitFor('document.querySelector(".def-count").textContent.indexOf("1") >= 0');
    const afterClick = await page.js(`(function () {
      var app = window.RSL.APP;
      var node = app.state.board.node('de');
      var result = app.state.results.results.de;
      return {
        hidden: document.getElementById('overlay').hidden,
        selected: app.state.selectedNode,
        steps: node && node.config && node.config.steps,
        count: document.querySelector('.def-count').textContent,
        rows: document.querySelectorAll('.definition-sheet .def-row').length,
        tokens: result && result.tokens,
        formula: (document.querySelector('.node[data-id="de"] .node-formula') || {}).textContent
      };
    })()`);
    assert.strictEqual(afterClick.hidden, false, '点击后大面板不消失');
    assert.strictEqual(afterClick.selected, 'de', '点击后节点仍选中');
    assert.strictEqual(afterClick.steps.length, 1, '记录一步定义重写');
    assert.ok(/1 处已重写/.test(afterClick.count), '已重写计数更新');
    assert.notDeepStrictEqual(afterClick.tokens, picker.beforeTokens, '公式确实发生变化');
    assert.strictEqual(countToken(afterClick.tokens, '\\/'), 0, '根上的 ∨ 已展开');
    assert.strictEqual(countToken(afterClick.tokens, '/\\'), 2, '子式 ∧ 仍保持表面语法');
    assert.strictEqual(afterClick.rows, 2, '列表立刻更新为剩余两处 ∧');

    await page.js('document.querySelector("[data-def-full]").click()');
    await page.waitFor('document.querySelector(".def-count").textContent.indexOf("0") >= 0');
    const afterAll = await page.js(`(function () {
      var app = window.RSL.APP;
      var node = app.state.board.node('de');
      var result = app.state.results.results.de;
      return {
        steps: node.config && node.config.steps,
        full: node.config && node.config.full,
        tokens: result && result.tokens
      };
    })()`);
    assert.deepStrictEqual(afterAll.steps, [], '全部按钮清空分步');
    assert.strictEqual(afterAll.full, true, '全部按钮启用全量展开');
    assert.strictEqual(countToken(afterAll.tokens, '/\\'), 0, '全量展开后没有表面 ∧');

    /* 帮助卡片：只剩 S/M/D/D⁻，两条定义重写都用单向 ⇒。 */
    await page.js('window.RSL.UI.closeSheet(); document.querySelector("#helpBtn").click()');
    await page.waitFor('document.querySelectorAll(".help-card").length === 4');
    const help = await page.js(`(function () {
      return {
        labels: Array.prototype.map.call(document.querySelectorAll('.help-card b'), function (b) { return b.textContent; }),
        text: document.querySelector('.help-cards').textContent,
        arrows: Array.prototype.filter.call(document.querySelectorAll('.help-card'), function (c) {
          return c.textContent.indexOf('⇒') >= 0;
        }).length
      };
    })()`);
    assert.deepStrictEqual(help.labels, ['S', 'M', 'D', 'D⁻'], '帮助只保留 S/M/D/D⁻');
    assert.ok(!/[\u4e00-\u9fa5]/.test(help.text), '帮助卡片不含汉字');
    assert.strictEqual(help.arrows, 4, '四张帮助卡都使用单向 ⇒');
    const dCards = await page.js(`Array.prototype.filter.call(document.querySelectorAll('.help-card'), function (c) {
      var b = c.querySelector('b').textContent;
      return (b === 'D' || b === 'D⁻') && c.textContent.indexOf('⇒') >= 0;
    }).length`);
    assert.strictEqual(dCards, 2, 'D 与 D⁻ 都使用单向 ⇒');
    assert.ok(help.text.indexOf('\u21db') < 0, '不再使用旧箭头');
    await page.shot('definition-help');
    await page.js('window.RSL.UI.closeSheet()');

    assert.strictEqual(page.problems().length, 0, '页面无 JS 错误：' + JSON.stringify(page.problems().slice(0, 3)));
  } finally {
    await page.close();
  }
});
