'use strict';
/* 新关卡体系的浏览器验收：96 关、*NN 显示、元件栏、选关/帮助/成就面板、最后关卡。 */
const { runTest, fileUrl } = require('./lib/browser');
const { ok, equal, includes } = require('./lib/expect');

runTest('game-ui', async ({ openPage }) => {
  const page = await openPage({ width: 1440, height: 900, url: fileUrl('index.html'), shotDir: '.research/shots' });
  await page.ready();
  await page.js('window.RSL.APP.state.forceUnlock = true');

  const home = await page.js(`(function(){
    var app = window.RSL.APP;
    return {
      levels: app.state.levels.length,
      code: app.state.level.code,
      goal: document.getElementById('goalFormula').textContent.trim(),
      tiles: document.querySelectorAll('.tile').length,
      hasTerm: !!window.RSL.Term,
      hasLogic: !!window.RSL.Logic
    };
  })()`);
  equal(home.levels, 96, '游戏加载 96 关');
  equal(home.code, '*01', '首关显示 *01');
  includes(home.goal.replace(/\s+/g, ''), 'P→P', '首关目标 P→P');
  ok(home.tiles > 0, '元件栏有构造/规则/公理');
  equal(home.hasTerm, true, '唯一表达式核心已加载');
  equal(home.hasLogic, false, '旧 Logic 不再加载');

  /* 选关面板：4 章 × 24 格 */
  await page.js('document.querySelector("#levelBtn").click()');
  await page.waitFor('document.querySelectorAll("[data-level]").length === 96');
  const sheet = await page.js(`(function(){
    return {chapters: document.querySelectorAll('.chapter').length,
            aria: Array.from(document.querySelectorAll('[data-level]')).slice(24,26).map(function(b){return b.getAttribute('aria-label')})};
  })()`);
  equal(sheet.chapters, 4, '选关有 4 章');
  includes(sheet.aria[0], '*25', '第Ⅱ章首关是 *25');
  await page.js('window.RSL.UI.closeSheet()');

  /* 帮助与成就面板 */
  await page.js('document.querySelector("#helpBtn").click()');
  await page.waitFor('document.querySelectorAll(".help-card").length >= 10');
  ok((await page.js('document.querySelectorAll(".help-card").length')) >= 10, '帮助面板列出新模块');
  await page.js('window.RSL.UI.closeSheet()');
  await page.js('document.querySelector("#achvBtn").click()');
  await page.waitFor('document.querySelectorAll(".achv").length === 20');
  equal(await page.js('document.querySelectorAll(".achv").length'), 20, '成就面板 20 格');
  await page.js('window.RSL.UI.closeSheet()');

  /* 最后一关：*96 与目标 */
  await page.js('window.RSL.APP.loadLevel(95)');
  await page.sleep(300);
  const last = await page.js(`(function(){
    return {code: window.RSL.APP.state.level.code,
            goal: document.getElementById('goalFormula').textContent.trim(),
            tiles: document.querySelectorAll('.tile').length};
  })()`);
  equal(last.code, '*96', '可以进入最后一关 *96');
  ok(last.goal.length > 0, '最后一关目标渲染');
  ok(last.tiles > 0, '最后一关元件栏');
  ok(await page.js('window.RSL.APP.state.level.solution.nodes.length > 0'), '最后一关有参考电路');
  equal(page.problems().length, 0, '页面无 JS 错误：' + JSON.stringify(page.problems().slice(0, 3)));
  await page.shot('game-96');
});
