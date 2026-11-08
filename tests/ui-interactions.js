'use strict';
/*
 * 交互细节：引脚网格对齐、断言 turnstile、右键删除模块/导线、
 * 谓词与等词关卡用参考电路通过真实“校验”按钮通关。
 *
 * 覆盖点：
 *   - _portPoint 输出对齐 16px 网格，目标端口也是网格对齐；
 *   - 每关有 1 个 turnstile，没有常驻删除按钮；
 *   - 右键模块删除、右键导线（.wire-hit）删除；
 *   - CH2-01（谓词）与 CH3-04（等词）参考电路 complete、点校验出现通关面板、无错误。
 */
const { runTest } = require('./lib/browser');
const { ok, equal } = require('./lib/expect');

runTest('ui-interactions', async ({ openPage }) => {
  const page = await openPage({ width: 1440, height: 900 });
  await page.ready();
  await page.js('window.RSL.APP.state.forceUnlock=true');

  /* ---- 1. 引脚对齐 + turnstile ---- */
  await page.js('document.querySelector(".tile").click()');
  await page.waitFor('document.querySelectorAll(".node").length === 2');
  await page.sleep(400); /* 新模块有入场动画，等布局稳定后再量引脚坐标 */
  const pins = await page.js(`(function(){
    var b=window.RSL.APP.state.board;
    var n=b.items.find(function(x){return x.kind==='axiom'});
    if(!n) return null;
    var el=b.nodes.querySelector('[data-id="'+n.id+'"]');
    var pEl=el.querySelector('.port[data-port="out"]');
    var wr=b.world.getBoundingClientRect(), pr=pEl.getBoundingClientRect();
    /* 独立按 DOM 几何重算端口中心（_portPoint 的对照实现） */
    var dom={x:(pr.left+pr.width/2-wr.left)/b.view.scale, y:(pr.top+pr.height/2-wr.top)/b.view.scale};
    var p=b._portPoint(n.id,'out');
    var t=b.node('target');
    var ti=b._portPoint('target','proof');
    return {node:[n.x%16,n.y%16], raw:[n.x,n.y,p.x,p.y], dom:dom,
            nodeW:el.offsetWidth, nodeH:el.offsetHeight,
            target:[t.x,t.y,ti.x,ti.y],
            turnstiles:document.querySelectorAll('.node-turnstile').length,
            deleteBtns:document.querySelectorAll('#deleteBtn,.node-x').length};
  })()`);
  ok(pins, '棋盘上有公理模块与目标节点');
  equal(pins.node, [0, 0], '公理模块坐标吸附 16px 网格');
  ok(Math.abs(pins.raw[2] - pins.dom.x) < 0.51 && Math.abs(pins.raw[3] - pins.dom.y) < 0.51,
    '_portPoint 与按 DOM 几何重算的端口中心一致（' + JSON.stringify(pins.dom) + '）');
  ok(Math.abs((pins.raw[2] - pins.raw[0]) - pins.nodeW) <= 2, 'out 端口中心落在模块右边缘（偏移 ' + (pins.raw[2] - pins.raw[0]) + 'px，模块宽 ' + pins.nodeW + 'px）');
  ok(pins.raw[3] > pins.raw[1] && pins.raw[3] < pins.raw[1] + pins.nodeH, 'out 端口纵向落在模块高度范围内');
  equal([pins.target[0] % 16, pins.target[1] % 16], [0, 0], '目标节点坐标吸附 16px 网格');
  ok(Math.abs(pins.target[2] - pins.target[0]) <= 2, 'target proof 端口中心贴近目标左边缘');
  ok(pins.target[3] > pins.target[1], 'target proof 端口纵向位于目标节点内部');
  equal(pins.turnstiles, 1, '目标节点有 1 个断言 turnstile');
  equal(pins.deleteBtns, 0, '没有常驻删除按钮（删除靠右键）');

  /* ---- 2. 右键删除模块 ---- */
  const before = await page.js('window.RSL.APP.state.board.items.length');
  await page.js('(function(){var el=document.querySelector(".node[data-kind=axiom]");el.dispatchEvent(new MouseEvent("contextmenu",{bubbles:true,cancelable:true,button:2}));})()');
  await page.waitFor('window.RSL.APP.state.board.items.length === ' + (before - 1));
  equal(await page.js('window.RSL.APP.state.board.items.length'), before - 1, '右键模块把它从棋盘删除');

  /* ---- 3. 右键删除导线 ---- */
  await page.js('document.querySelector(".tile").click()');
  await page.waitFor('window.RSL.APP.state.board.items.length === 2');
  await page.js(`(function(){
    var b=window.RSL.APP.state.board;
    var a=b.items.find(function(x){return x.kind==='axiom'});
    b.connect(a.id,'out','target','proof');
  })()`);
  await page.waitFor('window.RSL.APP.state.board.edges.length === 1');
  equal(await page.js('window.RSL.APP.state.board.edges.length'), 1, '程序化连接到 1 条导线');
  await page.js('(function(){var w=document.querySelector(".wire-hit");if(w)w.dispatchEvent(new MouseEvent("contextmenu",{bubbles:true,cancelable:true,button:2}));})()');
  await page.waitFor('window.RSL.APP.state.board.edges.length === 0');
  equal(await page.js('window.RSL.APP.state.board.edges.length'), 0, '右键导线命中区把它删除');

  /* ---- 4. 谓词关卡：参考电路 → 校验按钮 → 通关 ---- */
  const predSetup = await page.js(`(function(){
    var app=window.RSL.APP, i=app.state.levels.findIndex(function(l){return l.id==='CH2-01'});
    if(i<0) return null;
    app.loadLevel(i);
    var lv=app.state.level, b=app.state.board;
    var target={id:'target',kind:'target',x:lv.targetPos.x,y:lv.targetPos.y,target:lv.target,config:{}};
    var nodes=[target].concat(JSON.parse(JSON.stringify(lv.solution.nodes)));
    var edges=lv.solution.edges.map(function(e,n){return {id:'e'+n,from:e.from,to:e.to}});
    b.setData(nodes,edges); app.refresh();
    return {id:lv.id, complete:app.state.results.complete, errors:app.state.results.errors.length};
  })()`);
  ok(predSetup, '关卡表里能找到 CH2-01（谓词）');
  equal(predSetup.id, 'CH2-01', '已切换到 CH2-01');
  equal(predSetup.complete, true, 'CH2-01 参考电路判定完成');
  equal(predSetup.errors, 0, 'CH2-01 参考电路无错误');
  await page.js('document.getElementById("checkBtn").click()');
  await page.waitFor('!!document.querySelector(".win")');
  ok(await page.js('!!document.querySelector(".win")'), 'CH2-01 点校验后出现通关面板');
  equal(await page.js('window.RSL.APP.state.results.errors.length'), 0, 'CH2-01 通关结果无错误');

  /* ---- 5. 等词关卡 ---- */
  const eqSetup = await page.js(`(function(){
    var app=window.RSL.APP, i=app.state.levels.findIndex(function(l){return l.id==='CH3-04'});
    if(i<0) return null;
    app.loadLevel(i);
    var lv=app.state.level, b=app.state.board;
    var target={id:'target',kind:'target',x:lv.targetPos.x,y:lv.targetPos.y,target:lv.target,config:{}};
    var nodes=[target].concat(JSON.parse(JSON.stringify(lv.solution.nodes)));
    var edges=lv.solution.edges.map(function(e,n){return {id:'e'+n,from:e.from,to:e.to}});
    b.setData(nodes,edges); app.refresh();
    return {id:lv.id, goal:(document.getElementById('goalFormula').textContent||'').replace(/\\s+/g,''),
            complete:app.state.results.complete, targets:lv.target,
            tiles:document.querySelectorAll('.tile').length};
  })()`);
  ok(eqSetup, '关卡表里能找到 CH3-04（等词）');
  equal(eqSetup.complete, true, 'CH3-04 参考电路判定完成');
  equal(eqSetup.goal, 'x=y→(x=z→y=z)', 'CH3-04 目标是 x=y→(x=z→y=z)');
  equal(eqSetup.tiles, 1, 'CH3-04 调色板只有 1 个元件');
  await page.js('document.getElementById("checkBtn").click()');
  await page.waitFor('!!document.querySelector(".win")');
  ok(await page.js('!!document.querySelector(".win")'), 'CH3-04 点校验后出现通关面板');
});
