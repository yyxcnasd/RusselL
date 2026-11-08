'use strict';
/*
 * 截图采集：为 README / 文档生成一组成片截图。
 *
 * 默认写到 .research/shots/capture-simple/（gitignore），不污染仓库；
 * 需要更新仓库里的 screenshots/ 时显式加参数：
 *   node tests/capture-simple.js --repo
 *   node tests/capture-simple.js --out .research/shots/custom
 *
 * 每一步截图前都会断言目标元素存在，所以它同时是“关键界面能渲染”的回归。
 */
const fs = require('fs');
const path = require('path');
const { runTest, fileUrl, ROOT, SHOTS } = require('./lib/browser');
const { ok, equal, includes } = require('./lib/expect');

const args = process.argv.slice(2);
let shotDir = path.join(SHOTS, 'capture-simple');
for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === '--repo') shotDir = path.join(ROOT, 'screenshots');
  else if (arg === '--out') shotDir = path.resolve(args[++i]);
  else if (arg.startsWith('--out=')) shotDir = path.resolve(arg.slice(6));
  else throw new Error('capture-simple: 未知参数 ' + arg + '（支持 --repo / --out <dir>）');
}

runTest('capture-simple', async ({ openPage }) => {
  console.log('shots →', path.relative(ROOT, shotDir) || shotDir);
  const page = await openPage({ width: 1440, height: 900, shotDir });
  await page.ready();
  const shots = [];

  /* 01 首关 */
  ok(await page.js('!!document.querySelector(".node.is-target")'), '首关渲染出目标节点');
  shots.push(await page.shot('01-game.png'));

  /* 11 引导关（CH1-04 的规则提示） */
  await page.js('window.RSL.APP.state.forceUnlock=true');
  await page.js('(function(){var a=window.RSL.APP;a.loadLevel(a.state.levels.findIndex(function(l){return l.id==="CH1-04"}));})()');
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-04"');
  const guide = await page.js(`(function(){
    var pop=document.getElementById('coachPop');
    return {hidden:pop.hidden, text:pop.textContent.trim()};
  })()`);
  equal(guide.hidden, false, 'CH1-04 直接显示规则提示气泡');
  ok(guide.text.length > 0, '规则提示有内容（' + guide.text + '）');
  shots.push(await page.shot('11-guide.png'));
  await page.js('document.getElementById("coachPop").click()');
  await page.waitFor('document.getElementById("coachPop").hidden');
  equal(await page.js('document.getElementById("coachPop").hidden'), true, '点规则提示气泡可以收起');

  /* 07 深色 */
  await page.js('window.RSL.APP.loadLevel(0)');
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-01"');
  await page.js('document.getElementById("themeBtn").click()');
  await page.waitFor('document.documentElement.dataset.theme === "dark"');
  await page.sleep(300);
  equal(await page.js('document.documentElement.dataset.theme'), 'dark', '深色主题生效');
  shots.push(await page.shot('07-dark.png'));

  /* 02 连线（浅色） */
  await page.js('window.RSL.APP.loadLevel(0)');
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-01"');
  await page.js('document.getElementById("themeBtn").click()');
  await page.waitFor('document.documentElement.dataset.theme !== "dark"');
  await page.sleep(200);
  await page.js('document.querySelector(".tile").click()');
  await page.waitFor('document.querySelectorAll(".node").length === 2');
  await page.sleep(350); /* 等新模块入场动画，端口 rect 才稳定 */
  const ports = await page.js(`(function(){
    var out=document.querySelector('.node[data-kind="axiom"] .port-out'),
        inp=document.querySelector('.node.is-target .port-in');
    if(!out||!inp) return null;
    var a=out.getBoundingClientRect(), b=inp.getBoundingClientRect();
    return {ox:a.left+a.width/2, oy:a.top+a.height/2, ix:b.left+b.width/2, iy:b.top+b.height/2};
  })()`);
  ok(ports, '公理出端口与目标入端口都存在');
  await page.mouse.drag({ x: ports.ox, y: ports.oy }, { x: ports.ix, y: ports.iy }, { steps: 4 });
  await page.waitFor('document.querySelectorAll(".wire").length === 1');
  equal(await page.js('document.querySelector(".node.is-target").dataset.state'), 'complete', '截图前目标已完成');
  shots.push(await page.shot('02-wired.png'));

  /* 03 通关面板 */
  await page.js('document.getElementById("checkBtn").click()');
  await page.waitFor('!!document.querySelector(".win")');
  ok(await page.js('!!document.querySelector(".win")'), '通关面板出现');
  await page.sleep(650); /* 等 check-in 动画与彩带起势，避免截到半透明中途帧 */
  shots.push(await page.shot('03-win.png'));
  await page.js('document.querySelector("[data-close]").click()');
  await page.waitFor('document.getElementById("overlay").hidden');

  /* 通关瞬间解锁成就的 toast 在 headless 下可能因计时器节流而停留更久；
     文档截图不需要它叠在面板上（03-win 保留 toast 展示层级）。 */
  await page.js('window.RSL.UI.els.toast.classList.remove("is-on")');
  await page.sleep(260); /* 等 toast 淡出完成 */

  /* 04 关卡表 */
  await page.js('document.getElementById("levelBtn").click()');
  await page.waitFor('document.querySelectorAll(".level-cell").length === 240');
  equal(await page.js('document.querySelectorAll(".level-cell").length'), 240, '关卡表渲染 240 格');
  shots.push(await page.shot('04-levels.png'));
  await page.js('document.querySelector("[data-close]").click()');
  await page.waitFor('document.getElementById("overlay").hidden');

  /* 09 成就 / 14 成就详情 */
  await page.js('document.getElementById("achvBtn").click()');
  await page.waitFor('document.querySelectorAll(".achv").length === 20');
  equal(await page.js('document.querySelectorAll(".achv").length'), 20, '成就面板渲染 20 项');
  shots.push(await page.shot('09-achievements.png'));
  await page.js('document.querySelector(".achv").click()');
  await page.waitFor('!!document.querySelector(".achv-detail")');
  ok(await page.js('!!document.querySelector(".achv-detail")'), '成就详情可以打开');
  shots.push(await page.shot('14-achievement-detail.png'));
  await page.js('document.querySelector("[data-back]").click()');
  await page.waitFor('!document.querySelector(".achv-detail")');
  await page.js('document.querySelector("[data-close]").click()');
  await page.waitFor('document.getElementById("overlay").hidden');

  /* 10 帮助 */
  await page.js('document.getElementById("helpBtn").click()');
  await page.waitFor('document.querySelectorAll(".help-card").length === 8');
  equal(await page.js('document.querySelectorAll(".help-card").length'), 8, '帮助面板渲染 8 张说明卡');
  shots.push(await page.shot('10-help.png'));
  await page.js('document.querySelector("[data-close]").click()');
  await page.waitFor('document.getElementById("overlay").hidden');

  /* 06 谓词关元件（CH2-01 atom 实例） */
  await page.js('window.RSL.APP.state.forceUnlock=true');
  const pm = await page.js('window.RSL.APP.state.levels.findIndex(function(l){return l.id==="CH2-01"})');
  ok(pm >= 0, '关卡表里能找到 CH2-01');
  await page.js('window.RSL.APP.loadLevel(' + pm + ')');
  await page.waitFor('window.RSL.APP.state.level.id === "CH2-01"');
  await page.js('document.querySelector(".tile").click()');
  await page.waitFor('document.querySelectorAll(".node").length === 2');
  equal(await page.js('document.querySelectorAll(".node").length'), 2, 'CH2-01 点元件直接放置 1 个模块');
  shots.push(await page.shot('06-pm.png'));

  /* 08 等词关（CH3-01） */
  const eq = await page.js('window.RSL.APP.state.levels.findIndex(function(l){return l.id==="CH3-01"})');
  ok(eq >= 0, '关卡表里能找到 CH3-01');
  await page.js('window.RSL.APP.loadLevel(' + eq + ')');
  await page.waitFor('window.RSL.APP.state.level.id === "CH3-01"');
  includes((await page.js('document.getElementById("goalFormula").textContent')).replace(/\s+/g, ''), '=', 'CH3-01 目标含等词');
  shots.push(await page.shot('08-equality.png'));

  /* 15 set.mm 证明重放关（mm-replay：和普通关同一块棋盘，拖线 + 参考推进） */
  const mmPage = await openPage({ width: 1440, height: 900, url: fileUrl('index.html'), shotDir });
  await mmPage.ready();
  equal(await mmPage.js('window.RSL.MM.Flags.enabled()'), true, '重放段默认开启');
  await mmPage.js('window.RSL.APP.state.forceUnlock = true');
  const mmIndex = await mmPage.js('window.RSL.APP.state.levels.findIndex(function(l){return l.code==="pm3.24"&&l.mode==="mm-proof"})');
  ok(mmIndex >= 0, '目录里能找到 pm3.24 重放关');
  await mmPage.js('window.RSL.APP.loadLevel(' + mmIndex + ')');
  await mmPage.waitFor('window.RSL.APP.state.level.code === "pm3.24"');
  /* 参考推进 3 次：棋盘上长出步骤节点与导线，再截图 */
  for (let step = 0; step < 3; step++) await mmPage.js('document.getElementById("hintBtn").click()');
  await mmPage.waitFor('document.querySelectorAll(".node[data-kind=\\"mmstep\\"]").length >= 3');
  await mmPage.sleep(250);
  shots.push(await mmPage.shot('15-replay.png'));
  await mmPage.close();

  /* 05 移动端 */
  await page.viewport(390, 844, { deviceScaleFactor: 2, mobile: true });
  await page.send('Page.navigate', { url: page.url });
  await page.ready();
  const mobile = await page.js('(function(){return {w:innerWidth, scroll:document.documentElement.scrollWidth};})()');
  equal(mobile.w, 390, '移动端视口宽 390');
  equal(mobile.scroll, mobile.w, '移动端无横向溢出');
  shots.push(await page.shot('05-mobile.png'));

  /* 所有截图确实落盘且非空 */
  equal(shots.length, 13, '需要的 13 张截图全部采集');
  for (const file of shots) {
    ok(fs.existsSync(file), '截图已写入 ' + path.relative(ROOT, file));
    ok(fs.statSync(file).size > 1000, '截图非空：' + path.basename(file));
  }
});
