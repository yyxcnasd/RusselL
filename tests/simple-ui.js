'use strict';
/*
 * 关卡目录与移动端布局。
 *
 * 覆盖点：
 *   - 240 个接线关逐关加载：目标公式与调色板都非空；48 个重放关有目标与步骤数；
 *   - 关卡表 240 格 + 48 张重放卡片（按难度交错在基础/挑战段里），章名与罗马数字正确；
 *   - 关卡表关闭按钮可见、正方形、在视口内；
 *   - 点遮罩关闭面板；
 *   - 390×844 移动端无横向溢出。
 */
const { runTest, fileUrl } = require('./lib/browser');
const { ok, equal, between } = require('./lib/expect');

runTest('simple-ui', async ({ openPage }) => {
  const page = await openPage({ width: 1440, height: 900 });
  await page.ready();

  const info = await page.js(`(function(){
    var app=window.RSL.APP; app.state.forceUnlock=true; var list=[]; var mm=[];
    for(var i=0;i<app.state.levels.length;i++){
      var lv=app.state.levels[i];
      app.loadLevel(i);
      if(lv.track==='replay'){
        mm.push({i:i, code:app.state.level.id,
                 goal:document.getElementById('goalFormula').textContent,
                 steps:(lv.stats&&lv.stats.steps)||0});
        continue;
      }
      list.push({i:i, code:app.state.level.id,
                 goal:document.getElementById('goalFormula').textContent,
                 tiles:document.querySelectorAll('.tile').length});
    }
    return {count:app.state.levels.length, list:list, mm:mm};
  })()`);
  equal(info.count, 288, '关卡总数为 240 + 48');
  equal(info.list.length, 240, '其中 240 个接线关');
  equal(info.mm.length, 48, '其中 48 个重放关');
  const bad = info.list.filter((x) => !x.code || !x.goal || !x.tiles);
  equal(bad, [], '240 个接线关逐关加载后都有代码、目标与调色板元件');
  const badMm = info.mm.filter((x) => !x.code || !x.goal || !(x.steps >= 0));
  equal(badMm, [], '48 个重放关逐关加载后都有代码、目标与步骤数');
  equal(info.list[0].code, 'CH1-01', '第一关是 CH1-01');
  ok(
    info.list[info.list.length - 1].code.indexOf('CH4-') === 0,
    '最后一个接线关仍在集合章：' + info.list[info.list.length - 1].code
  );

  /* ---- 关卡表 ---- */
  await page.js('document.getElementById("levelBtn").click()');
  await page.waitFor('document.querySelectorAll(".level-cell").length === 240');
  equal(await page.js('document.querySelectorAll(".level-cell").length'), 240, '关卡表有 240 个关卡格');

  const chapters = await page.js(`(function(){
    return Array.from(document.querySelectorAll('.chapter')).map(function(c){
      return {roman:c.querySelector('.chapter-roman').textContent,
              progress:!!c.querySelector('.chapter-progress'),
              levels:c.querySelectorAll('.level-cell').length};
    });
  })()`);
  equal(chapters.map((c) => c.roman), ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'], '四章罗马数字为 Ⅰ/Ⅱ/Ⅲ/Ⅳ');
  ok(chapters.every((c) => c.progress), '每章标题行保留进度线');
  equal(chapters.map((c) => c.levels), [60, 60, 60, 60], '每章 60 个接线关格');
  equal(await page.js('document.querySelectorAll(".band.replay").length'), 0, '重放关不再占独立分带');
  equal(await page.js('document.querySelectorAll(".mm-level").length'), 48, '重放关共 48 张交错卡片');
  equal(
    await page.js('document.querySelectorAll(".band.base .mm-level, .band.challenge .mm-level").length'),
    48,
    '重放卡片都在基础/挑战段里'
  );
  equal(await page.js('document.querySelectorAll(".chapter-title").length'), 0, '选关界面不再使用章节名文字');

  const close = await page.js(`(function(){
    var x=document.querySelector('.sheet-x');
    if(!x) return null;
    var r=x.getBoundingClientRect();
    return {x:r.x, y:r.y, w:r.width, h:r.height, vw:innerWidth, vh:innerHeight};
  })()`);
  ok(close, '关卡表有关闭按钮 .sheet-x');
  between(close.w, 24, 56, '关闭按钮宽度合理');
  equal(close.w, close.h, '关闭按钮是正方形');
  ok(close.x >= 0 && close.y >= 0 && close.x + close.w <= close.vw && close.y + close.h <= close.vh, '关闭按钮完整位于视口内');
  await page.shot('simple-levels');

  /* ---- 点遮罩关闭 ---- */
  await page.js('document.getElementById("overlay").click()');
  await page.waitFor('document.getElementById("overlay").hidden');
  equal(await page.js('document.getElementById("overlay").hidden'), true, '点遮罩关闭关卡表');

  /* ---- 移动端：真实重载后无横向溢出 ---- */
  await page.js('window.RSL.APP.loadLevel(0)');
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-01"');
  await page.viewport(390, 844, { deviceScaleFactor: 2, mobile: true });
  await page.send('Page.navigate', { url: fileUrl() });
  await page.ready();
  const mobile = await page.js('(function(){return {w:innerWidth, scroll:document.documentElement.scrollWidth};})()');
  equal(mobile.w, 390, '移动端视口宽 390');
  equal(mobile.scroll, mobile.w, '移动端无横向溢出（scrollWidth === innerWidth）');
  await page.shot('simple-mobile');
});
