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
  equal(home.levels, 115, '游戏加载 96 主线 + 19 教学关');
  equal(home.code, 'i', '首关是教学关 i');
  includes(home.goal.replace(/\s+/g, ''), 'P→P', '教学关目标 P→P');
  ok(home.tiles > 0, '元件栏有构造/规则/公理');
  equal(home.hasTerm, true, '唯一表达式核心已加载');
  equal(home.hasLogic, false, '旧 Logic 不再加载');

  /* 节点代号与端口：A2 不能显示成 A1；S 不显示旧变元改名端口 */
  const labels = await page.js(`(function(){
    var b = window.RSL.APP.state.board;
    var s = b._nodeView({ kind:'subst', config:{ groups:0 } }, null);
    return {
      axiom: b._code({ kind:'axiom', config:{ schema:'A2' } }),
      pred: b._code({ kind:'pred', config:{ symbol:'G' } }),
      theorem: b._code({ kind:'theorem', config:{ n:64 } }),
      substPorts: s.inputPorts.map(function(p){return p.id})
    };
  })()`);
  equal(labels.axiom, 'A2', 'A2 显示 A2');
  equal(labels.pred, 'G', '谓词显示 G');
  equal(labels.theorem, '*64', '定理显示 *64');
  ok(labels.substPorts.indexOf('vleft') < 0 && labels.substPorts.indexOf('vright') < 0,
    'S 不显示旧变元改名端口');

  /* 选关面板：4 章 ×（教学 + 12 普通 + 12 进阶） */
  await page.js('document.querySelector("#levelBtn").click()');
  await page.waitFor('document.querySelectorAll("[data-level]").length === 115');
  const sheet = await page.js(`(function(){
    var labels = Array.from(document.querySelectorAll('[data-level]')).map(function(b){return b.getAttribute('aria-label')});
    return {chapters: document.querySelectorAll('.chapter').length,
            tutorials: document.querySelectorAll('.band.tutorial').length,
            labels: labels};
  })()`);
  equal(sheet.chapters, 4, '选关有 4 章');
  equal(sheet.tutorials, 4, '每章有教学分带');
  includes(sheet.labels.join('|'), '*25', '第Ⅱ章首关是 *25');
  await page.shot('levels');
  await page.js('window.RSL.UI.closeSheet()');

  /* 帮助与成就面板 */
  await page.js('document.querySelector("#helpBtn").click()');
  await page.waitFor('document.querySelectorAll(".help-card").length >= 6');
  const helpCards = await page.js('document.querySelectorAll(".help-card").length');
  ok(helpCards >= 6 && helpCards <= 10, '帮助面板只保留精简图例（' + helpCards + ' 张）');
  await page.shot('help');
  await page.js('window.RSL.UI.closeSheet()');
  await page.js('document.querySelector("#achvBtn").click()');
  await page.waitFor('document.querySelectorAll(".achv").length === 20');
  equal(await page.js('document.querySelectorAll(".achv").length'), 20, '成就面板 20 格');
  await page.js('window.RSL.UI.closeSheet()');

  /* 元件栏合并：原子 P/Q/R 共享一个 tile，具体字母在配置弹层里选 */
  const mergedTray = await page.js(`(function(){
    var app = window.RSL.APP;
    var idx = app.state.levels.map(function(l){return l.code}).indexOf('*01');
    app.loadLevel(idx);
    var parts = window.RSL.Catalog.partsForLevel(app.state.level);
    var atom = parts.filter(function(p){return p.kind==='atom'})[0];
    return {atomTiles: parts.filter(function(p){return p.kind==='atom'}).length,
            variants: atom && atom.variants ? atom.variants.length : 0};
  })()`);
  equal(mergedTray.atomTiles, 1, '原子只占一个元件');
  ok(mergedTray.variants >= 3, '原子弹层包含 P/Q/R 变体');
  await page.js('document.querySelector(".tile[data-key=\\"atom:*\\"]").click()');
  await page.sleep(150);
  const popover = await page.js('document.querySelectorAll(".letter-grid .opt").length');
  ok(popover >= 3, '原子配置弹层可切换字母');

  /* 最后一关：*96 与目标 */
  await page.js('window.RSL.APP.loadLevel(window.RSL.APP.state.levels.map(function(l){return l.code}).indexOf("*96"))');
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
