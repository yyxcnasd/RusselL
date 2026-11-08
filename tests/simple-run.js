'use strict';
/*
 * 引用“已证结论”的关卡（theorem 模块）+ config popover。
 *
 * 覆盖点：
 *   - CH1-08 能加载，目标 P→(Q→Q)，调色板 5 个元件（不再补无用的 imp）；
 *   - 把 theorem:CH1-07（结论 P→P）接到目标：导线生成，但目标断言不匹配 → error；
 *   - 切到另一关后 atom 元件弹出 14 个命题变元选项（PQRSTUVWXYZABC）。
 */
const { runTest } = require('./lib/browser');
const { ok, equal, includes } = require('./lib/expect');

runTest('simple-run', async ({ openPage }) => {
  const page = await openPage({ width: 1440, height: 900 });
  await page.ready();

  await page.js('window.RSL.APP.state.forceUnlock=true');
  const idx = await page.js('window.RSL.APP.state.levels.findIndex(function(l){return l.id==="CH1-08"})');
  ok(idx >= 0, '关卡表里能找到 CH1-08');
  await page.js('window.RSL.APP.loadLevel(' + idx + ')');
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-08"');

  equal(
    (await page.js('document.getElementById("goalFormula").textContent')).replace(/\s+/g, ''),
    'P→(Q→Q)',
    'CH1-08 目标是 P→(Q→Q)'
  );
  equal(await page.js('document.querySelectorAll(".tile").length'), 5, 'CH1-08 调色板只有参考电路需要的 5 个元件');

  await page.js('document.querySelector(".tile[data-key^=\\"theorem:\\"]").click()');
  await page.waitFor('document.querySelectorAll(".node[data-kind=\\"theorem\\"]").length === 1');
  await page.sleep(350); /* 等待入场动画，保证端口 rect 稳定 */
  equal(await page.js('document.querySelectorAll(".node[data-kind=\\"theorem\\"]").length'), 1, '放置了 1 个 theorem 模块');

  const ports = await page.js(`(function(){
    var out=document.querySelector('.node[data-kind="theorem"] .port-out'),
        inp=document.querySelector('.node.is-target .port-in');
    if(!out||!inp) return null;
    var a=out.getBoundingClientRect(), b=inp.getBoundingClientRect();
    return {ox:a.left+a.width/2, oy:a.top+a.height/2, ix:b.left+b.width/2, iy:b.top+b.height/2};
  })()`);
  ok(ports, 'theorem 出端口与目标入端口都存在');
  await page.mouse.drag({ x: ports.ox, y: ports.oy }, { x: ports.ix, y: ports.iy }, { steps: 4 });
  await page.waitFor('document.querySelectorAll(".wire").length === 1');
  equal(await page.js('document.querySelectorAll(".wire").length'), 1, 'theorem 到目标生成 1 条导线');

  const wired = await page.js(`(function(){
    var app=window.RSL.APP;
    return {state:document.querySelector('.node.is-target').dataset.state,
            complete:app.state.results.complete,
            errors:app.state.results.errors.map(function(e){return e.message})};
  })()`);
  equal(wired.complete, false, '只接 theorem 不能通关');
  equal(wired.state, 'error', '结论 P→P 与目标 P→(Q→Q) 不匹配，目标进入 error 态');
  ok(wired.errors.length >= 1, '引擎报告至少 1 条断言错误');
  includes(wired.errors.join(' | '), '不一致', '错误信息说明输出与目标断言不一致');
  await page.shot('simple-pm-wired');

  /* ---- 另一关的 atom 实例 popover ---- */
  await page.js('window.RSL.APP.loadLevel(7)');
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-08"');
  equal(await page.js('document.querySelectorAll(".tile").length'), 5, '重新载入 CH1-08 仍有 5 个元件');

  await page.js('document.querySelector("[data-key=\\"atom\\"]").click()');
  await page.waitFor('document.querySelectorAll("#popover .opt").length === 14');
  const pop = await page.js(`(function(){
    return {opts:document.querySelectorAll('#popover .opt').length,
            visible:!document.getElementById('popover').hidden,
            texts:Array.from(document.querySelectorAll('#popover .opt')).map(function(e){return e.textContent})};
  })()`);
  equal(pop.visible, true, 'atom 元件弹出实例选择 popover');
  equal(pop.opts, 14, 'popover 提供 14 个命题变元选项');
  equal(pop.texts[0] + pop.texts[1], 'PQ', '目标里出现的原子排在最前（P、Q）');
  ok(pop.texts.indexOf('U') >= 0, '命题变元选项包含 U');
  await page.shot('simple-popover');
});
