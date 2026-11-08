'use strict';
/*
 * set.mm 证明重放关：真浏览器端到端（Edge headless + CDP）。
 *
 * 重放关和普通关走同一块棋盘：目标焊盘 + 前提节点 + 元件栏里的 set.mm 断言，
 * 拖线接线；「参考」按钮按参考证明摆节点/接线。
 *
 * 覆盖点：
 *   - 默认开启：目录 288 关，四章各 36 基础 + 36 挑战，重放关以卡片交错；
 *   - ?mm=0 关闭：回到 240 关、没有重放卡片；
 *   - 点目录卡片 → 棋盘上是目标 + 前提节点，元件栏是本关断言，顶栏出现「参考」；
 *   - 拖线：前提 → 步骤输入 → 节点算出公式；「校验」按钮给出错误/通关；
 *   - 参考推进：小证明几步走完、axacnd 304 步分批走完都写入通关；
 *   - $a 公理关也能在棋盘上拼；
 *   - 深色主题、390×844 移动端、切回普通关恢复 A* 走线与普通元件栏。
 */
const { runTest, fileUrl } = require('./lib/browser');
const { ok, equal, includes } = require('./lib/expect');

const MM_ON = fileUrl('index.html?mm=1');
const MM_OFF = fileUrl('index.html?mm=0');

async function loadByCode(page, code) {
  const idx = await page.js(
    'window.RSL.APP.state.levels.findIndex(function(l){return l.code === ' + JSON.stringify(code) + ' && l.track === "replay"})'
  );
  ok(idx >= 0, '目录里能找到重放关 ' + code);
  await page.js('window.RSL.APP.loadLevel(' + idx + ')');
  await page.waitFor('window.RSL.APP.state.level.code === ' + JSON.stringify(code));
  return idx;
}

async function hintUntilSolved(page, maxClicks) {
  for (let i = 0; i < maxClicks; i += 1) {
    const done = await page.js('!!(window.RSL.APP.state.results && window.RSL.APP.state.results.complete)');
    if (done) return i;
    await page.js('document.getElementById("hintBtn").click()');
  }
  return maxClicks;
}

runTest('mm-ui', async ({ openPage }) => {
  /* ---------------- 1. ?mm=0：回到旧版 240 关 ---------------- */
  const off = await openPage({ width: 1280, height: 860, url: MM_OFF });
  await off.ready();
  equal(await off.js('window.RSL.MM.Flags.enabled()'), false, '?mm=0 关闭重放关');
  equal(await off.js('window.RSL.APP.state.levels.length'), 240, '?mm=0 时目录是 240 关');
  await off.js('window.RSL.APP.openLevels()');
  await off.waitFor('document.querySelectorAll(".level-cell").length > 0');
  equal(await off.js('document.querySelectorAll(".mm-level").length'), 0, '关闭时没有重放卡片');
  await off.close();

  /* ---------------- 2. 默认开启：目录与重放卡 ---------------- */
  const page = await openPage({ width: 1440, height: 900, url: MM_ON });
  await page.ready();
  await page.js('window.RSL.APP.state.forceUnlock = true');
  equal(await page.js('window.RSL.MM.Flags.enabled()'), true, '默认开启重放关');
  equal(await page.js('window.RSL.MM_LEVELS.length'), 48, '48 个重放关卡已随游戏发布');
  equal(await page.js('window.RSL.APP.state.levels.length'), 288, '目录为 240 + 48 = 288 关');
  await page.js('window.RSL.APP.openLevels()');
  await page.waitFor('document.querySelectorAll(".mm-level").length === 48');
  equal(await page.js('document.querySelectorAll(".mm-level").length'), 48, '目录里有 48 张重放卡片');
  equal(await page.js('document.querySelectorAll(".level-cell").length'), 240, '接线关仍是 240 格');
  const bands = await page.js(`(function(){
    var s=document.querySelectorAll('.chapter')[0];
    return Array.from(s.querySelectorAll('.band')).map(function(b){
      return b.classList.contains('challenge') ? 'challenge' : 'base';
    });
  })()`);
  equal(bands.join(','), 'base,challenge', '章内仍是基础段 + 挑战段');

  /* 点目录里的重放卡片进关（真实用户路径） */
  const pm324 = await page.js(
    'window.RSL.APP.state.levels.findIndex(function(l){return l.code === "pm3.24" && l.track === "replay"})'
  );
  await page.js('document.querySelector(".mm-level[data-level=\\"' + pm324 + '\\"]").click()');
  await page.waitFor('window.RSL.APP.state.level.code === "pm3.24"');

  const mounted = await page.js(`(function(){
    var kinds = {};
    document.querySelectorAll('.node').forEach(function(n){ kinds[n.dataset.kind] = (kinds[n.dataset.kind]||0)+1; });
    return {
      kinds:kinds,
      tiles:document.querySelectorAll('.tile').length,
      trayWide:document.getElementById('tray').classList.contains('is-wide'),
      hint:getComputedStyle(document.getElementById('hintBtn')).display,
      board:getComputedStyle(document.getElementById('board')).display,
      goal:document.getElementById('goalFormula').textContent.replace(/\\s+/g,''),
      levelNo:document.getElementById('levelBtn').textContent,
      panel:document.querySelectorAll('#mmRoot, [data-mm-panel]').length,
      tileKeys:Array.from(document.querySelectorAll('.tile')).map(function(t){return t.dataset.key})
    };
  })()`);
  ok(mounted.board !== 'none', '重放关用普通棋盘显示（display=' + mounted.board + '）');
  equal(mounted.panel, 0, '不再挂独立的重放面板');
  ok(mounted.kinds.target === 1, '棋盘上有目标焊盘');
  ok(mounted.kinds.mmhyp >= 1, '棋盘上有本关前提节点（' + mounted.kinds.mmhyp + ' 个）');
  equal(mounted.tiles, 6, '元件栏是参考证明用到的 6 条断言');
  ok(mounted.trayWide, '元件栏进入大代号样式（可横向滚动）');
  ok(mounted.hint !== 'none', '顶栏出现「参考」按钮');
  includes(mounted.goal, 'φ', '顶栏目标用 set.mm token 公式渲染');
  ok(/^M\d\d$/.test(mounted.levelNo), '关卡号显示 Mxx：' + mounted.levelNo);
  equal(mounted.tileKeys[0], 'mmstep:wi', '元件 key 是 mmstep:<label>');
  await page.shot('mm-board-pm324');

  /* ---------------- 3. 拖线：放置步骤节点并接两个前提 ---------------- */
  await page.js('document.querySelector(\'.tile[data-key="mmstep:wi"]\').click()');
  await page.waitFor('document.querySelectorAll(\'.node[data-kind="mmstep"]\').length === 1');
  await page.sleep(650);
  const placed = await page.js(`(function(){
    var n=document.querySelector('.node[data-kind="mmstep"]');
    return {ports:n.querySelectorAll('.port-in').length,
            code:n.querySelector('.node-code').textContent,
            formula:n.querySelector('.node-formula').textContent.trim()};
  })()`);
  equal(placed.ports, 2, 'wi 节点只渲染 2 个输入端口');
  equal(placed.code, 'wi', '节点代号是 set.mm label');

  async function portPoint(sel) {
    return page.js(`(function(){
      var el=document.querySelector(${JSON.stringify(sel)}); if(!el) return null;
      var r=el.getBoundingClientRect(); return {x:r.left+r.width/2, y:r.top+r.height/2};
    })()`);
  }
  async function drag(fromSel, toSel) {
    const a = await portPoint(fromSel);
    const b = await portPoint(toSel);
    if (!a || !b) return false;
    await page.mouse.drag(a, b, { steps: 6 });
    await page.sleep(220);
    return true;
  }

  ok(await drag('.node[data-kind="mmhyp"] .port-out', '.node[data-kind="mmstep"] .port-in[data-port="e1"]'), '第一次拖线');
  ok(await drag('.node[data-kind="mmhyp"] .port-out', '.node[data-kind="mmstep"] .port-in[data-port="e2"]'), '第二次拖线');
  const wired = await page.js(`(function(){
    var n=document.querySelector('.node[data-kind="mmstep"]');
    return {formula:n.querySelector('.node-formula').textContent.trim(),
            state:n.dataset.state,
            wires:document.querySelectorAll('.wire').length};
  })()`);
  equal(wired.wires, 2, '拖出两条导线');
  equal(wired.state, 'valid', '两个前提接齐后节点有效');
  includes(wired.formula.replace(/\s+/g, ''), 'φ→φ', '节点算出了代入后的结论 wff (φ→φ)：' + wired.formula);
  await page.shot('mm-board-wired');

  /* 未接完时「校验」给错误提示 */
  await page.js('document.getElementById("checkBtn").click()');
  await page.waitFor('document.getElementById("toast").classList.contains("is-on")');
  ok(await page.js('document.getElementById("toast").textContent.length > 0'), '「校验」给出提示');

  /* ---------------- 4. 参考推进：小证明走完并通关 ---------------- */
  await loadByCode(page, 'pm3.24');
  await page.sleep(200);
  const clicks = await hintUntilSolved(page, 40);
  ok(clicks <= 8, 'pm3.24 用「参考」' + clicks + ' 次走完');
  await page.waitFor('!!document.querySelector("#sheet .win")');
  const win = await page.js(`(function(){
    var id=window.RSL.APP.state.level.id;
    return {solved:!!window.RSL.APP.state.solved[id],
            nodes:document.querySelectorAll('.node[data-kind="mmstep"]').length,
            wires:document.querySelectorAll('.wire').length,
            text:document.querySelector('#sheet .win').textContent};
  })()`);
  equal(win.solved, true, '参考走完写入通关存档');
  equal(win.nodes, 7, 'pm3.24 摆了 7 个步骤节点（与参考证明的断言数一致）');
  ok(win.wires >= 12, '导线数 ' + win.wires);
  includes(win.text, '7', '通关面板显示用了 7 个断言节点（参考 7）');
  await page.shot('mm-board-win');
  await page.js('window.RSL.UI.closeSheet()');

  /* ---------------- 5. 大证明：axacnd 304 步分批走完 ---------------- */
  await loadByCode(page, 'axacnd');
  const t0 = Date.now();
  const bigClicks = await hintUntilSolved(page, 30);
  const bigMs = Date.now() - t0;
  await page.waitFor('!!document.querySelector("#sheet .win")');
  const big = await page.js(`(function(){
    var id=window.RSL.APP.state.level.id;
    return {solved:!!window.RSL.APP.state.solved[id],
            nodes:document.querySelectorAll('.node[data-kind="mmstep"]').length,
            wires:document.querySelectorAll('.wire').length,
            steps:window.RSL.APP.state.level.stats.steps};
  })()`);
  equal(big.steps, 304, 'axacnd 有 304 步');
  equal(big.nodes, 139, 'axacnd 摆了 139 个断言节点');
  equal(big.solved, true, '大证明也能走完并写入通关');
  ok(bigMs < 20000, '304 步参考推进没有卡死（' + bigMs + 'ms / ' + bigClicks + ' 次）');
  await page.shot('mm-board-axacnd');
  await page.js('window.RSL.UI.closeSheet()');

  /* ---------------- 6. $a 公理关也能在棋盘上拼 ---------------- */
  await loadByCode(page, 'ax-11');
  const axiom = await page.js(`(function(){
    return {tiles:document.querySelectorAll('.tile').length,
            keys:Array.from(document.querySelectorAll('.tile')).map(function(t){return t.dataset.key}),
            hyps:document.querySelectorAll('.node[data-kind="mmhyp"]').length};
  })()`);
  equal(axiom.tiles, 1, '公理关元件栏只有它自己');
  equal(axiom.keys[0], 'mmstep:ax-11');
  equal(axiom.hyps, 3, 'ax-11 的 3 个前提作为给定节点');
  const axClicks = await hintUntilSolved(page, 5);
  ok(axClicks <= 2, '公理关一次「参考」就成图');
  await page.waitFor('!!document.querySelector("#sheet .win")');
  equal(await page.js('!!window.RSL.APP.state.solved[window.RSL.APP.state.level.id]'), true, '公理关通关');
  await page.js('window.RSL.UI.closeSheet()');

  /* ---------------- 7. 深色主题 ---------------- */
  await loadByCode(page, 'pm3.24');
  await page.js('document.getElementById("themeBtn").click()');
  await page.waitFor('document.documentElement.dataset.theme === "dark"');
  const dark = await page.js(`(function(){
    var node=document.querySelector('.node[data-kind="mmhyp"]');
    var cs=getComputedStyle(node);
    return {theme:document.documentElement.dataset.theme,
            bg:cs.backgroundColor, color:cs.color,
            board:getComputedStyle(document.getElementById('board')).display};
  })()`);
  equal(dark.theme, 'dark', '可以切到深色主题');
  ok(dark.bg !== 'rgb(255, 255, 255)', '深色下节点不是白底（用的是 token）');
  ok(dark.board !== 'none', '深色下棋盘仍显示');
  await page.shot('mm-board-dark');
  await page.js('document.getElementById("themeBtn").click()');
  await page.waitFor('document.documentElement.dataset.theme !== "dark"');

  /* ---------------- 8. 切回普通关：恢复普通元件栏与 A* 走线 ---------------- */
  await page.js('window.RSL.APP.loadLevel(0)');
  await page.waitFor('window.RSL.APP.state.level.code !== "pm3.24"');
  const restored = await page.js(`(function(){
    return {
      trayWide:document.getElementById('tray').classList.contains('is-wide'),
      hint:getComputedStyle(document.getElementById('hintBtn')).display,
      simple:!!window.RSL.APP.state.board.simpleWires,
      check:document.getElementById('checkBtn').getAttribute('aria-label'),
      tiles:document.querySelectorAll('.tile').length
    };
  })()`);
  equal(restored.trayWide, false, '普通关元件栏不是大代号样式');
  equal(restored.hint, 'none', '普通关隐藏「参考」按钮');
  equal(restored.simple, false, '普通关恢复 A* 避障走线');
  equal(restored.check, '校验', '顶栏按钮是「校验」');
  ok(restored.tiles > 0, '普通关有调色板元件');
  equal(page.problems().length, 0, '页面无 JS 错误：' + JSON.stringify(page.problems().slice(0, 3)));

  /* ---------------- 9. 移动端：重放关棋盘可用 ---------------- */
  const mobile = await openPage({ width: 390, height: 844, url: MM_ON });
  await mobile.ready();
  await mobile.js('window.RSL.APP.state.forceUnlock = true');
  await loadByCode(mobile, 'pm3.24');
  await mobile.sleep(200);
  await hintUntilSolved(mobile, 10);
  const m = await mobile.js(`(function(){
    return {
      overflowX:document.documentElement.scrollWidth - window.innerWidth,
      nodes:document.querySelectorAll('.node[data-kind="mmstep"]').length,
      hint:getComputedStyle(document.getElementById('hintBtn')).display,
      tray:Math.round(document.getElementById('tray').getBoundingClientRect().height)
    };
  })()`);
  ok(m.overflowX <= 1, '移动端无横向溢出（' + m.overflowX + 'px）');
  ok(m.nodes >= 1, '移动端参考推进能摆出步骤节点');
  ok(m.hint !== 'none', '移动端也有「参考」按钮');
  await mobile.shot('mm-board-mobile');
  equal(mobile.problems().length, 0, '移动端页面无 JS 错误');
});
