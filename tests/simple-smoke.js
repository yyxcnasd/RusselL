'use strict';
/*
 * 端到端冒烟：首关加载 → 放置模块 → 端口连线 → 通关面板 → 下一关 → 存档电路 →
 * 调色板粘滞 / 右键取消 → 双代入端口 → 关卡表 / 锁章 → 成就 → 帮助 →
 * bands 解锁 → 多选拖动 / _portPoint 对齐。
 *
 * 失败以 exit 1 结束；成功只打印一行 PASS。
 */
const { runTest } = require('./lib/browser');
const { ok, equal, matches, includes } = require('./lib/expect');

function rgb(css) {
  const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(String(css));
  if (!m) return null;
  return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) };
}

runTest('simple-smoke', async ({ openPage }) => {
  const page = await openPage({ width: 1440, height: 900 });
  await page.ready();

  /* ---- 1. 首关加载 ---- */
  equal(await page.js('document.getElementById("levelBtn").textContent'), '01', '初始关卡编号为 01');
  equal(
    (await page.js('document.getElementById("goalFormula").textContent')).replace(/\s+/g, ''),
    'P→(Q→P)',
    '首关目标是 P→(Q→P)'
  );
  equal(await page.js('document.querySelectorAll(".tile").length'), 1, '首关调色板只有 1 个元件');
  equal(await page.js('document.querySelectorAll(".node").length'), 1, '初始只有目标节点');

  /* ---- 2. 放置模块 ---- */
  await page.js('document.querySelector(".tile").click()');
  await page.waitFor('document.querySelectorAll(".node").length === 2');
  await page.sleep(350); /* 新模块入场动画结束后再取端口 rect */
  equal(await page.js('document.querySelectorAll(".node").length'), 2, '点调色板后出现 1 个公理模块');

  /* ---- 3. 端口连线（真实鼠标事件）---- */
  const ports = await page.js(`(function(){
    var out=document.querySelector('.node[data-kind="axiom"] .port-out'),
        inp=document.querySelector('.node.is-target .port-in');
    if(!out||!inp) return null;
    var a=out.getBoundingClientRect(), b=inp.getBoundingClientRect();
    return {ox:a.left+a.width/2, oy:a.top+a.height/2, ix:b.left+b.width/2, iy:b.top+b.height/2};
  })()`);
  ok(ports, '公理模块的出端口与目标入端口都存在');
  await page.mouse.drag({ x: ports.ox, y: ports.oy }, { x: ports.ix, y: ports.iy }, { steps: 4 });
  await page.waitFor('document.querySelectorAll(".wire").length >= 1');
  equal(await page.js('document.querySelectorAll(".wire").length'), 1, '拖拽端口生成 1 条导线');
  equal(await page.js('document.querySelector(".node.is-target").dataset.state'), 'complete', '目标节点状态为 complete');
  await page.shot('simple-wired');

  /* ---- 4. 校验 → 通关面板 ---- */
  await page.js('document.getElementById("checkBtn").click()');
  await page.waitFor('!!document.querySelector(".win")');
  ok(await page.js('!!document.querySelector(".win")'), '通关面板出现');
  ok(await page.js('!document.getElementById("overlay").hidden'), '通关时遮罩层可见');

  /* ---- 5. 深色主题下的目标节点配色 ---- */
  await page.js('document.getElementById("themeBtn").click()');
  await page.waitFor('document.documentElement.dataset.theme === "dark"');
  await page.sleep(300); /* 主题切换带 .12s 颜色过渡，等渲染稳定再取计算色 */
  equal(await page.js('document.documentElement.dataset.theme'), 'dark', '主题按钮切到 dark');
  const dark = await page.js(`(function(){
    var t=document.querySelector('.node.is-target'), m=document.querySelector('.target-mark');
    return {bg:getComputedStyle(t).backgroundColor, border:getComputedStyle(t).borderColor,
            mark:getComputedStyle(m).color, body:getComputedStyle(document.body).backgroundColor};
  })()`);
  ok(dark, '能读取目标节点与标记的深色配色');
  equal(dark.border, dark.mark, '深色下目标边框与标记同色（成功强调色）');
  const accent = rgb(dark.border);
  ok(accent && accent.g > accent.r && accent.g > accent.b, '深色成功强调色是绿色系（实际 ' + dark.border + '）');
  const body = rgb(dark.body);
  ok(body && (body.r + body.g + body.b) / 3 < 90, '深色下页面底色足够暗（实际 ' + dark.body + '）');
  await page.js('document.getElementById("themeBtn").click()');
  await page.waitFor('document.documentElement.dataset.theme !== "dark"');
  await page.sleep(200);
  ok((await page.js('document.documentElement.dataset.theme')) !== 'dark', '再次点击主题按钮恢复浅色');

  /* ---- 6. 解锁规则 ---- */
  const unlock = await page.js(`(function(){
    var a=window.RSL.APP;
    var iv=a.state.levels.findIndex(function(l){return l.chapterGroup==="Ⅳ"});
    return {next:a.isUnlocked(1), later:a.isUnlocked(iv+2), iv:a.isUnlocked(iv),
            solved:Object.keys(a.state.solved)};
  })()`);
  equal(unlock.next, true, '通关后下一关可解锁');
  equal(unlock.later, false, '第四章之后的关卡仍锁着');
  equal(unlock.iv, false, '第四章首关仍锁着');
  equal(unlock.solved, ['CH1-01'], '已通关记录只有 CH1-01');
  await page.shot('simple-win');

  /* ---- 7. 下一关 ---- */
  await page.js('document.querySelector("[data-next]").click()');
  await page.waitFor('document.getElementById("levelBtn").textContent.trim() === "02"');
  equal((await page.js('document.getElementById("levelBtn").textContent')).trim(), '02', '点“下一关”进入 02');

  /* ---- 8. 前六关目录 ---- */
  const firstSix = await page.js('window.RSL.APP.state.levels.slice(0,6).map(function(l){return l.id+":"+l.title})');
  equal(
    firstSix.map((s) => s.split(':')[0]),
    ['CH1-01', 'CH1-02', 'CH1-03', 'CH1-04', 'CH1-05', 'CH1-06'],
    '前六关 ID 顺序正确'
  );
  ok(firstSix.every((s) => s.split(':')[1] && s.split(':')[1].length), '前六关都有标题');

  /* ---- 9. 存档电路：重新载入首关应恢复 1 个非目标模块 ---- */
  await page.js('window.RSL.APP.loadLevel(0)');
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-01"');
  equal(
    await page.js('document.querySelectorAll(".node:not(.is-target)").length'),
    1,
    '重新载入首关恢复存档里的 1 个模块'
  );

  /* ---- 10. 调色板粘滞 + 右键取消 ---- */
  await page.js('window.RSL.APP.loadLevel(1)');
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-02"');
  await page.js(`(function(){
    var t=document.querySelector('.tile'), b=document.getElementById('board');
    var tr=t.getBoundingClientRect(), br=b.getBoundingClientRect();
    window.__pal={tx:tr.left+tr.width/2, ty:tr.top+tr.height/2, bx:br.left+90, by:br.top-12};
  })()`);
  const pal = await page.js('window.__pal');
  await page.mouse.click(pal.tx, pal.ty);
  await page.waitFor('!!document.querySelector(".module-ghost")');
  equal(await page.js('!!document.querySelector(".module-ghost")'), true, '点调色板进入放置态（出现 ghost）');
  await page.mouse.click(pal.bx, pal.by);
  await page.waitFor('!document.querySelector(".module-ghost")');
  equal(await page.js('!!document.querySelector(".module-ghost")'), false, '点棋盘放置后 ghost 消失（粘滞只一次）');
  equal(await page.js('document.querySelectorAll(".node:not(.is-target)").length'), 1, '粘滞只放置 1 个模块');
  await page.mouse.click(pal.tx, pal.ty);
  await page.waitFor('!!document.querySelector(".module-ghost")');
  equal(await page.js('!!document.querySelector(".module-ghost")'), true, '再次点调色板重新进入放置态');
  await page.js('document.dispatchEvent(new MouseEvent("contextmenu",{bubbles:true,cancelable:true}))');
  await page.waitFor('!document.querySelector(".module-ghost")');
  equal(await page.js('!!document.querySelector(".module-ghost")'), false, '右键取消放置态');

  /* ---- 11. subst 双代入端口 ---- */
  await page.js('window.RSL.APP.state.forceUnlock=true');
  await page.js(`window.RSL.APP.loadLevel(window.RSL.APP.state.levels.findIndex(function(l){return l.id==="CH1-04"}))`);
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-04"');
  await page.js('document.querySelector(".tile[data-key=\\"subst\\"]").click()');
  await page.waitFor('document.querySelectorAll(".node[data-kind=\\"subst\\"] .port-in").length === 3');
  equal(await page.js('document.querySelectorAll(".node[data-kind=\\"subst\\"] .port-in").length'), 3, 'subst 默认 3 个输入端口');
  await page.js('document.querySelector(".opt[data-config=\\"dual\\"]").click()');
  await page.waitFor('document.querySelectorAll(".node[data-kind=\\"subst\\"] .port-in").length === 5');
  equal(await page.js('document.querySelectorAll(".node[data-kind=\\"subst\\"] .port-in").length'), 5, '切到 dual 配置后 subst 有 5 个输入端口');
  await page.js('window.RSL.APP.state.forceUnlock=false');

  /* ---- 12. 关卡表 240 格 + 锁章 ---- */
  await page.js('document.getElementById("levelBtn").click()');
  await page.waitFor('document.querySelectorAll(".level-cell").length === 240');
  equal(await page.js('document.querySelectorAll(".level-cell").length'), 240, '关卡表有 240 个关卡格');
  const locks = await page.js(`(function(){
    return Array.from(document.querySelectorAll('.chapter')).map(function(c){
      var b=c.querySelector('.level-cell');
      return {roman:c.querySelector('.chapter-roman').textContent, cls:c.className,
              first:b&&b.className, firstDisabled:!!(b&&b.disabled)};
    });
  })()`);
  equal(locks.map((c) => c.roman), ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'], '关卡表四章罗马数字顺序正确');
  matches(locks[0].cls, /is-current/, '第一章是当前章');
  for (let i = 1; i < 4; i += 1) {
    matches(locks[i].cls, /is-locked/, '第 ' + (i + 1) + ' 章在未解锁时显示为锁定');
    equal(locks[i].firstDisabled, true, '第 ' + (i + 1) + ' 章首格 disabled');
  }
  matches(locks[0].first, /is-solved/, '第一章首关标记为已通关');
  equal(locks[0].firstDisabled, false, '第一章首关可点击');

  /* ---- 13. 成就面板 ---- */
  await page.js('document.getElementById("achvBtn").click()');
  await page.waitFor('document.querySelectorAll(".achv").length === 20');
  const achv = await page.js(`(function(){
    return {total:document.querySelectorAll('.achv').length,
            on:document.querySelectorAll('.achv.is-on').length,
            questions:document.querySelectorAll('.achv-q').length};
  })()`);
  equal(achv.total, 20, '成就共 20 个');
  equal(achv.on, 1, '首关通关后只有 1 个成就点亮');
  equal(achv.questions, 19, '其余 19 个显示为未解问号');
  await page.js('document.querySelector(".achv").click()');
  await page.waitFor('!!document.querySelector(".achv-detail")');
  const detail = await page.js(`(function(){
    var h=document.querySelector('.achv-detail h2'), p=document.querySelector('.achv-detail p');
    return {title:h&&h.textContent, desc:p&&p.textContent, status:!!document.querySelector('.achv-status')};
  })()`);
  equal(detail.title, '通电', '首个成就详情标题为“通电”');
  equal(detail.desc, '完成第一关。', '首个成就详情描述正确');
  equal(detail.status, false, '已点亮成就详情不显示锁定状态');
  await page.js('document.querySelector("[data-back]").click()');
  await page.waitFor('!document.querySelector(".achv-detail")');
  await page.js('document.querySelector(".achv:not(.is-on)").click()');
  await page.waitFor('!document.querySelector(".achv-detail")');
  const lockedAchv = await page.js(`(function(){
    var el=document.querySelector('.achv:not(.is-on)');
    return {detail:!!document.querySelector('.achv-detail'), disabled:!!(el&&el.disabled)};
  })()`);
  equal(lockedAchv.detail, false, '点未解锁成就不会打开详情');
  equal(lockedAchv.disabled, true, '未解锁成就是 disabled 状态');
  await page.js('document.querySelector("[data-close]").click()');
  await page.waitFor('document.getElementById("overlay").hidden');

  /* ---- 14. 帮助面板 ---- */
  await page.js('document.getElementById("helpBtn").click()');
  await page.waitFor('!!document.querySelector(".help-card")');
  const help = await page.js(`(function(){
    return {cards:document.querySelectorAll('.help-card').length,
            save:document.querySelectorAll('.save-btn').length,
            credit:document.querySelector('.credit')&&document.querySelector('.credit').textContent};
  })()`);
  equal(help.cards, 8, '帮助面板有 8 张说明卡');
  equal(help.save, 2, '帮助面板有 2 个存档按钮');
  includes(help.credit, 'Design by yyxcnasd', '帮助面板保留作者署名');
  await page.js('document.querySelector("[data-close]").click()');
  await page.waitFor('document.getElementById("overlay").hidden');

  /* ---- 15. bands：基础段全通后解锁挑战段与下一章 ---- */
  const bands = await page.js(`(function(){
    var app=window.RSL.APP, L=app.state.levels;
    var idx=function(id){return L.findIndex(function(l){return l.id===id});};
    var base=L.filter(function(l){return l.chapterGroup==='Ⅰ'&&l.band!=='challenge'});
    base.forEach(function(l){app.state.solved[l.id]=true;});
    return {base:base.length, chal:app.isUnlocked(idx('CH1-31')), next:app.isUnlocked(idx('CH2-01')),
            nextChal:app.isUnlocked(idx('CH2-31')), baseLast:base[base.length-1].id};
  })()`);
  equal(bands.base, 30, '第一章基础段 30 关');
  equal(bands.baseLast, 'CH1-30', '基础段最后一关是 CH1-30');
  equal(bands.chal, true, '基础段全通后 CH1-31 挑战关解锁');
  equal(bands.next, true, '基础段全通后下一章 CH2-01 解锁');
  equal(bands.nextChal, false, '下一章挑战段 CH2-31 仍锁着');

  /* ---- 16. 多选拖动 + _portPoint 对齐 ---- */
  const selection = await page.js(`(function(){
    var b=window.RSL.APP.state.board;
    b.board.setPointerCapture=function(){};
    b.board.releasePointerCapture=function(){};
    b.setData([
      {id:'s1',kind:'atom',x:80,y:160,config:{name:'P'}},
      {id:'s2',kind:'atom',x:320,y:160,config:{name:'Q'}},
      {id:'s3',kind:'atom',x:80,y:360,config:{name:'R'}},
      {id:'target',kind:'target',x:900,y:300,target:'P→(Q→P)',config:{}}
    ],[]);
    var r=b.board.getBoundingClientRect();
    function cx(x){return r.left+b.view.x+x*b.view.scale}
    function cy(y){return r.top+b.view.y+y*b.view.scale}
    b._startMarquee({clientX:cx(40),clientY:cy(80),pointerId:1});
    b._updateMarquee(cx(600),cy(500));
    b._endMarquee();
    var selected=b.selectedNodes.length;
    var el=b.nodes.querySelector('[data-id="s1"]');
    var before={x:b.node('s1').x,y:b.node('s1').y};
    if(el){
      b._down({target:el,shiftKey:true,clientX:cx(80),clientY:cy(160),pointerId:1,pointerType:'mouse',
               preventDefault:function(){},stopPropagation:function(){}});
      b._move({clientX:cx(80)+48,clientY:cy(160)+32});
      b._up({});
    }
    var after={x:b.node('s1').x,y:b.node('s1').y};
    /* _portPoint 的不变量：坐标有限、连续读取稳定、与按 DOM 几何重算的端口中心一致，
       且 out 端口中心落在模块右边缘（端口中心不是 16 的倍数，不能断言网格对齐）。 */
    var pin1=b._portPoint('s1','out'), pin2=b._portPoint('s1','out');
    var el=b.nodes.querySelector('[data-id="s1"]');
    var pe=el.querySelector('.port[data-port="out"]');
    var wr=b.world.getBoundingClientRect(), pr=pe.getBoundingClientRect();
    var dom={x:(pr.left+pr.width/2-wr.left)/b.view.scale, y:(pr.top+pr.height/2-wr.top)/b.view.scale};
    return {selected:selected, dragged:before.x!==after.x||before.y!==after.y,
            snapped:after.x%16===0&&after.y%16===0,
            node:[after.x%16,after.y%16],
            pin:[pin1.x,pin1.y], stable:pin1.x===pin2.x&&pin1.y===pin2.y,
            finite:isFinite(pin1.x)&&isFinite(pin1.y),
            dom:dom, edgeDelta:(pin1.x-after.x)-el.offsetWidth};
  })()`);
  equal(selection.selected, 3, '框选命中 3 个模块');
  equal(selection.dragged, true, '拖动被选中的模块生效');
  equal(selection.snapped, true, '拖动落点吸附到 16px 网格');
  equal(selection.node, [0, 0], '模块本体坐标对齐 16px 网格');
  equal(selection.finite, true, '_portPoint 返回有限坐标');
  equal(selection.stable, true, '连续两次 _portPoint 读取结果一致');
  ok(Math.abs(selection.pin[0] - selection.dom.x) < 0.51 && Math.abs(selection.pin[1] - selection.dom.y) < 0.51,
    '_portPoint 与按 DOM 几何重算的端口中心一致（pin ' + JSON.stringify(selection.pin) + ' vs ' + JSON.stringify(selection.dom) + '）');
  ok(Math.abs(selection.edgeDelta) <= 2, 'out 端口中心落在模块右边缘（偏差 ' + selection.edgeDelta + 'px）');
});
