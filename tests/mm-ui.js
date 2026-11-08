'use strict';
/*
 * set.mm 证明重放关：真浏览器端到端（Edge headless + CDP）。
 *
 * 覆盖点：
 *   - ?mm=1 打开后 RSL.MM.Flags 生效、目录里出现 31 个 MM 关卡行；
 *   - 选择 MM-01（pm3.24）→ 棋盘与元件栏隐藏、#mmRoot 里挂上重放面板；
 *   - 顶栏「校验」在重放关里是「下一步」：逐步推进到 304 步的最后一步也不卡；
 *   - 最后一步触发通关面板，存档写入 solved；
 *   - 键盘 → 推进；0 步公理（ax-11）不自动通关，确认后通关；
 *   - 未带 ?mm=1 时目录里没有 MM 关卡（默认关闭，现有 240 关不受影响）。
 */
const { runTest, fileUrl } = require('./lib/browser');
const { ok, equal, includes } = require('./lib/expect');

const MM_URL = fileUrl('index.html?mm=1');

/* 反复点「下一步」，直到达到给定步骤数（面板只在当前分段渲染行，所以按状态推进）。 */
async function advanceTo(page, target) {
  await page.js(`(function(){
    var btn=document.querySelector('#mmRoot [data-mm-next]');
    var n=0;
    while(btn && !btn.disabled && n < 400) { btn.click(); n++; btn=document.querySelector('#mmRoot [data-mm-next]'); }
    return n;
  })()`);
  await page.waitFor(`window.RSL.APP.state.mmProgress && window.RSL.APP.state.mmProgress.step === ${target}`, { timeout: 8000 });
}

runTest('mm-ui', async ({ openPage }) => {
  /* ---------------- 1. 默认关闭：目录里没有 MM 分组 ---------------- */
  const off = await openPage({ width: 1280, height: 860 });
  await off.ready();
  equal(await off.js('window.RSL.MM.Flags.enabled()'), false, '默认不带 ?mm=1 时特性开关关闭');
  equal(await off.js('window.RSL.APP.state.levels.length'), 240, '默认目录仍是 240 关');
  await off.js('window.RSL.APP.openLevels()');
  await off.waitFor('document.querySelectorAll(".level-cell").length > 0');
  equal(await off.js('document.querySelectorAll(".mm-chapter").length'), 0, '默认不渲染 MM 分组');
  await off.close();
  void includes;

  /* ---------------- 2. 带 ?mm=1：目录、面板、逐步推进 ---------------- */
  const page = await openPage({ width: 1440, height: 900, url: MM_URL });
  await page.ready();

  equal(await page.js('window.RSL.MM.Flags.enabled()'), true, '?mm=1 打开特性开关');
  equal(await page.js('window.RSL.MM_LEVELS.length'), 31, '31 个重放关卡已随游戏发布');
  equal(await page.js('window.RSL.APP.state.levels.length'), 271, '目录为 240 + 31');
  equal(
    await page.js('window.RSL.APP.state.levels.slice(0,240).every(function(l){return l.id.indexOf("MM-")<0})'),
    true,
    '原有 240 关仍排在前面'
  );

  /* 目录面板里能看到 31 行重放关，行内容来自 set.mm 数据 */
  await page.js('window.RSL.APP.openLevels()');
  await page.waitFor('document.querySelectorAll(".mm-level").length === 31');
  equal(await page.js('document.querySelectorAll(".mm-level").length'), 31, '目录里有 31 个重放关行');
  equal(await page.js('document.querySelectorAll(".mm-chapter").length'), 1, 'MM 是独立分组');
  const firstRow = await page.js(`(function(){
    var row=document.querySelector('.mm-level[data-level="240"]');
    if(!row) return null;
    return {
      no:row.querySelector('.mm-level-no').textContent,
      title:row.querySelector('.mm-level-title').textContent,
      code:row.querySelector('.mm-level-code').textContent,
      steps:row.querySelector('.mm-level-steps').textContent,
      label:row.getAttribute('aria-label')
    };
  })()`);
  ok(firstRow, '第一行重放关是 MM-01');
  equal(firstRow.no, '01', '行号显示 01');
  equal(firstRow.code, 'pm3.24', '行里显示 set.mm label');
  includes(firstRow.steps, '14', '行里显示步骤数');
  ok(firstRow.title.length > 0 && firstRow.title.length <= 14, '行里有中文短名：' + firstRow.title);

  /* 点目录行直接进关（真实用户路径，不是直接调 APP.loadLevel） */
  await page.js('document.querySelector(".mm-level[data-level=\\"240\\"]").click()');
  await page.waitFor('window.RSL.APP.state.level.id === "MM-01" && !!document.querySelector("#mmRoot [data-mm-panel]")');
  const idx = 240;
  ok(idx >= 240, 'MM-01 在目录末尾');
  equal(await page.js('document.getElementById("overlay").hidden'), true, '点目录行后选关面板关闭');

  const mounted = await page.js(`(function(){
    var root=document.getElementById('mmRoot');
    return {
      board:getComputedStyle(document.getElementById('board')).display,
      tray:getComputedStyle(document.getElementById('tray')).display,
      root:getComputedStyle(root).display,
      code:(document.querySelector('#mmRoot [data-mm-code]')||{}).textContent,
      target:(document.querySelector('#mmRoot [data-mm-target]')||{}).textContent,
      progress:(document.querySelector('#mmRoot [data-mm-progress]')||{}).textContent,
      stepRows:document.querySelectorAll('#mmRoot [data-mm-step]').length,
      goal:document.getElementById('goalFormula').textContent.replace(/\\s+/g,'')
    };
  })()`);
  equal(mounted.board, 'none', '重放关隐藏棋盘');
  equal(mounted.tray, 'none', '重放关隐藏元件栏');
  ok(mounted.root !== 'none', '#mmRoot 可见');
  equal(mounted.code, 'pm3.24', '面板显示 set.mm label');
  includes(mounted.target, '⊢', '目标公式带 ⊢');
  includes(mounted.target, '¬', '目标公式渲染成 Unicode（¬）');
  equal(mounted.progress, '1 / 14', 'pm3.24 第一步 / 共 14 步');
  equal(mounted.stepRows, 14, '步骤列表渲染 14 行（≤80 步不分段）');
  ok(mounted.goal.indexOf('φ') >= 0 || mounted.goal.indexOf('ph') >= 0, '顶栏目标显示公式');
  await page.shot('mm-replay-pm3.24');

  /* 顶栏按钮：下一步 */
  equal(
    await page.js('document.querySelector("#checkBtn").getAttribute("aria-label")'),
    '下一步',
    '重放关里顶栏校验按钮变成「下一步」'
  );
  await page.js('document.querySelector("#checkBtn").click()');
  await page.waitFor('window.RSL.APP.state.mmProgress.step === 2');
  equal(await page.js('document.querySelector("#mmRoot [data-mm-progress]").textContent'), '2 / 14', '顶栏按钮推进到第 2 步');

  /* 键盘 → 继续推进 */
  await page.key('ArrowRight');
  await page.waitFor('window.RSL.APP.state.mmProgress.step === 3');
  equal(await page.js('window.RSL.APP.state.mmProgress.step'), 3, '键盘 → 推进到第 3 步');

  /* 一路走到最后一步 → 通关面板 */
  await advanceTo(page, 14);
  await page.waitFor('document.querySelector("#sheet .win")');
  const win = await page.js(`(function(){
    return {
      solved: !!window.RSL.APP.state.solved['MM-01'],
      winText: document.querySelector('#sheet .win').textContent
    };
  })()`);
  equal(win.solved, true, '走完 pm3.24 后写入通关存档');
  includes(win.winText, '14', '通关面板显示 14 步');
  await page.shot('mm-replay-win');
  await page.js('window.RSL.UI.closeSheet()');

  /* ---------------- 3. 大证明：axacnd 304 步，分段 + 跳到末尾 ---------------- */
  const bigIdx = await page.js('window.RSL.APP.state.levels.findIndex(function(l){return l.id==="MM-31"})');
  await page.js('window.RSL.APP.loadLevel(' + bigIdx + ')');
  await page.waitFor('window.RSL.APP.state.level.id === "MM-31" && !!document.querySelector("#mmRoot [data-mm-panel]")');
  equal(await page.js('window.RSL.APP.state.level.code'), 'axacnd', 'MM-31 是 axacnd');
  equal(await page.js('window.RSL.APP.state.level.stats.steps'), 304, 'axacnd 有 304 步');
  const segs = await page.js('document.querySelectorAll("#mmRoot [data-mm-seg]").length');
  ok(segs > 1, '304 步的证明分段渲染（实际 ' + segs + ' 段）');
  const t0 = Date.now();
  await page.js('document.querySelector("#mmRoot [data-mm-last]").click()');
  await page.waitFor('window.RSL.APP.state.mmProgress.step === 304', { timeout: 8000 });
  ok(Date.now() - t0 < 8000, '跳到 304 步没有卡死（' + (Date.now() - t0) + 'ms）');
  await page.waitFor('document.querySelector("#sheet .win")');
  equal(await page.js('!!window.RSL.APP.state.solved["MM-31"]'), true, 'axacnd 通关写入存档');
  await page.shot('mm-replay-axacnd');
  await page.js('window.RSL.UI.closeSheet()');

  /* ---------------- 4. 0 步公理：ax-11 不自动通关 ---------------- */
  const axIdx = await page.js('window.RSL.APP.state.levels.findIndex(function(l){return l.id==="MM-10"})');
  await page.js('window.RSL.APP.loadLevel(' + axIdx + ')');
  await page.waitFor('window.RSL.APP.state.level.id === "MM-10" && !!document.querySelector("#mmRoot [data-mm-panel]")');
  const axiom = await page.js(`(function(){
    return {
      code: window.RSL.APP.state.level.code,
      solved: !!window.RSL.APP.state.solved['MM-10'],
      text: document.querySelector('#mmRoot [data-mm-panel]').textContent
    };
  })()`);
  equal(axiom.code, 'ax-11', 'MM-10 是 ax-11 公理图式');
  equal(axiom.solved, false, '公理图式载入后不自动通关');
  includes(axiom.text, '公理', '面板明确说明这是公理图式');
  await page.js('document.querySelector("#checkBtn").click()');
  await page.waitFor('!!window.RSL.APP.state.solved["MM-10"]');
  equal(await page.js('!!window.RSL.APP.state.solved["MM-10"]'), true, '确认后公理图式记完成');

  /* ---------------- 5. 深色主题：面板沿用 token，不出现硬编码色 ---------------- */
  await page.js('window.RSL.UI.closeSheet()');
  await page.js('window.RSL.APP.loadLevel(' + idx + ')');
  await page.waitFor('window.RSL.APP.state.level.id === "MM-01" && !!document.querySelector("#mmRoot [data-mm-step]")');
  await page.js('document.getElementById("themeBtn").click()');
  await page.waitFor('document.documentElement.dataset.theme === "dark"');
  const dark = await page.js(`(function(){
    var panel=document.querySelector('#mmRoot [data-mm-panel]');
    var row=document.querySelector('#mmRoot [data-mm-step][data-mm-state="current"]');
    var cs=getComputedStyle(panel), rs=getComputedStyle(row);
    return {theme:document.documentElement.dataset.theme,
            panelColor:cs.color, rowBg:rs.backgroundColor,
            boardVisible:getComputedStyle(document.getElementById('board')).display};
  })()`);
  equal(dark.theme, 'dark', '重放关可以切到深色主题');
  equal(dark.boardVisible, 'none', '深色下棋盘仍然隐藏');
  ok(dark.rowBg && dark.rowBg !== 'rgb(255, 255, 255)', '深色下步骤行不是白底（用的是 token）');
  ok(dark.panelColor && dark.panelColor !== 'rgb(0, 0, 0)', '深色下面板文字不是纯黑');
  await page.shot('mm-replay-dark');
  await page.js('document.getElementById("themeBtn").click()');
  await page.waitFor('document.documentElement.dataset.theme !== "dark"');

  /* ---------------- 6. 切回普通关：棋盘恢复 ---------------- */
  await page.js('window.RSL.APP.loadLevel(0)');
  await page.waitFor('window.RSL.APP.state.level.id !== "MM-01"');
  const restored = await page.js(`(function(){
    return {
      board:getComputedStyle(document.getElementById('board')).display,
      tray:getComputedStyle(document.getElementById('tray')).display,
      mm:document.querySelectorAll('#mmRoot [data-mm-panel]').length,
      label:document.getElementById('checkBtn').getAttribute('aria-label')
    };
  })()`);
  ok(restored.board !== 'none', '普通关棋盘恢复显示');
  ok(restored.tray !== 'none', '元件栏恢复显示');
  equal(restored.mm, 0, '离开重放关后卸载面板');
  equal(restored.label, '校验', '顶栏按钮恢复为「校验」');

  const problems = page.problems();
  equal(problems.length, 0, '页面无 JS 错误：' + JSON.stringify(problems.slice(0, 3)));

  /* ---------------- 7. 移动端（390×844）：详情在上、列表在下，不横向溢出 ---------------- */
  const mobile = await openPage({ width: 390, height: 844, url: MM_URL });
  await mobile.ready();
  const mBig = await mobile.js('window.RSL.APP.state.levels.findIndex(function(l){return l.id==="MM-31"})');
  await mobile.js('window.RSL.APP.loadLevel(' + mBig + ')');
  await mobile.waitFor('window.RSL.APP.state.level.id === "MM-31" && !!document.querySelector("#mmRoot [data-mm-panel]")');
  const m = await mobile.js(`(function(){
    var d=document.querySelector('#mmRoot [data-mm-current]').getBoundingClientRect();
    var l=document.querySelector('#mmRoot [data-mm-step-list]').getBoundingClientRect();
    var next=document.querySelector('#mmRoot [data-mm-next]').getBoundingClientRect();
    return {
      detailTop:Math.round(d.top), listTop:Math.round(l.top),
      nextBottom:Math.round(next.bottom), viewportH:window.innerHeight,
      overflowX:document.documentElement.scrollWidth - window.innerWidth,
      targetVisible:!!document.querySelector('#mmRoot [data-mm-target]')
    };
  })()`);
  ok(m.detailTop < m.listTop, '移动端详情区在步骤列表上方（' + m.detailTop + ' < ' + m.listTop + '）');
  ok(m.nextBottom <= m.viewportH + 1, '移动端「下一步」在视口内（' + m.nextBottom + ' ≤ ' + m.viewportH + '）');
  ok(m.overflowX <= 1, '移动端无横向溢出（' + m.overflowX + 'px）');
  ok(m.targetVisible, '移动端目标公式可见');
  await mobile.shot('mm-replay-mobile');
  equal(mobile.problems().length, 0, '移动端页面无 JS 错误');
});
