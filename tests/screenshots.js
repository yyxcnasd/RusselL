'use strict';
/*
 * 截图：把当前构建的真实画面写进仓库 screenshots/。
 *
 *   node tests/screenshots.js
 *
 * 浅色（README 引用）：tutorial.png 教学关浮窗；levels.png 选关面板。
 *
 * 使用共享的 Edge headless 骨架（tests/lib/browser.js）；只写 screenshots/，不碰源码。
 */
const fs = require('fs');
const path = require('path');
const { runTest, fileUrl } = require('./lib/browser');
const { ok, equal } = require('./lib/expect');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'screenshots');
const TOTAL = 108;

async function openLevels(page) {
  await page.js('document.querySelector("#levelBtn").click()');
  await page.waitFor('document.querySelectorAll("[data-level]").length === ' + TOTAL);
  await page.sleep(120);
}

async function closeSheet(page) {
  await page.js('window.RSL.UI.closeSheet()');
  await page.sleep(120);
}

runTest('screenshots', async ({ openPage }) => {
  fs.mkdirSync(OUT, { recursive: true });
  const page = await openPage({ width: 1440, height: 900, url: fileUrl('index.html'), shotDir: '.research/shots' });
  await page.ready();
  await page.js('if (window.RSL.Story) { window.RSL.Story.setSeen({intro:true,tutorials:true,normal:true,hard:true,demon:true}); } var sl=document.getElementById("storyLayer"); if(sl) sl.hidden=true;');
  await page.js('window.RSL.APP.state.forceUnlock = true');

  /* ---- 浅色：README 引用的两张 ---- */
  equal(await page.js('document.documentElement.dataset.theme || "light"'), 'light', '默认浅色');
  await page.shot(path.join(OUT, 'tutorial.png'));
  await openLevels(page);
  await page.shot(path.join(OUT, 'levels.png'));
  await closeSheet(page);

  /* ---- 切深色（走真实按钮） ---- */
  const theme = await page.js(`(function(){
    var app = window.RSL.APP;
    if (app.state.theme !== 'dark') document.querySelector('#themeBtn').click();
    return document.documentElement.dataset.theme;
  })()`);
  equal(theme, 'dark', '已切到深色模式');
  await page.sleep(250);

  /* 教学关浮窗 */
  equal(await page.js('window.RSL.APP.state.level.code'), 'i', '首关是教学关 i');
  await page.shot(path.join(OUT, 'tutorial-dark.png'));

  /* 选关面板：单章三条分带（教学/普通/困难） */
  await openLevels(page);
  const bands = await page.js(`(function(){
    var ch = document.querySelectorAll('.chapter')[0];
    return {
      kinds: Array.from(ch.querySelectorAll('.band')).map(function(b){ return b.classList[1]; }),
    };
  })()`);
  await page.shot(path.join(OUT, 'levels-dark.png'));

  /* 普通关 00 棋盘 */
  await page.js(`(function(){
    var app = window.RSL.APP;
    app.loadLevel(app.state.levels.map(function(l){return l.code}).indexOf('00'));
  })()`);
  await page.sleep(250);
  equal(await page.js('window.RSL.APP.state.level.code'), '00', '加载普通关 00');
  ok(await page.js('document.querySelectorAll(".node").length > 0'), '普通关棋盘有模块');
  await page.shot(path.join(OUT, 'game-dark.png'));

  /* 帮助面板（S/M/D/D⁻） */
  await page.js('document.querySelector("#helpBtn").click()');
  await page.waitFor('document.querySelectorAll(".help-card").length === 4');
  await page.sleep(120);
  await page.shot(path.join(OUT, 'help-dark.png'));

  equal(page.problems().length, 0, '截图期间无 JS 错误：' + JSON.stringify(page.problems().slice(0, 3)));
});
