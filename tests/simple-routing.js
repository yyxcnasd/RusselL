'use strict';
/*
 * 导线绕行 / 自动避让 / 深色主题。
 *
 * 覆盖点：
 *   - 用 CH1-10 的参考电路铺满棋盘后：评估 complete、无错误、导线数正确，
 *     且绕行路径不穿过无关节点的矩形（badPins === 0）；
 *   - 两个新模块落在同一坐标时自动错开，且吸附 16px 网格；
 *   - _route 规划的路径不穿过障碍矩形（avoid.bad === 0）；
 *   - 主题切到 dark 时页面底色变暗。
 */
const { runTest } = require('./lib/browser');
const { ok, equal } = require('./lib/expect');

function rgb(css) {
  const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(String(css));
  return m ? { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) } : null;
}

runTest('simple-routing', async ({ openPage }) => {
  const page = await openPage({ width: 1440, height: 900 });
  await page.ready();

  await page.js('window.RSL.APP.state.forceUnlock=true');
  const setup = await page.js(`(function(){
    var app=window.RSL.APP;
    var lv=app.state.levels.find(function(l){return l.id==='CH1-10'});
    if(!lv) return null;
    var target={id:'target',kind:'target',x:lv.targetPos.x,y:lv.targetPos.y,target:lv.target,config:{}};
    var nodes=[target].concat(JSON.parse(JSON.stringify(lv.solution.nodes)));
    var edges=lv.solution.edges.map(function(e,i){return {id:'e'+i,from:e.from,to:e.to}});
    app.state.board.setData(nodes,edges); app.state.board.fit(); app.refresh();
    var before=app.state.board.items.map(function(n){return {id:n.id,x:n.x,y:n.y}});
    app.state.board.addNode('atom',{name:'P'},{x:100,y:100});
    app.state.board.addNode('atom',{name:'Q'},{x:100,y:100});
    var after=app.state.board.items.slice(-2).map(function(n){return {id:n.id,x:n.x,y:n.y}});
    return {nodes:before.length, expected:1+lv.solution.nodes.length, edgeCount:edges.length,
            after:after, errors:app.state.results.errors.length, complete:app.state.results.complete};
  })()`);
  ok(setup, '能读取 CH1-10 关卡数据');
  await page.sleep(350); /* 新增模块入场动画结束后再算绕行（_portPoint 读 DOM rect） */
  const info = await page.js(`(function(){
    var app=window.RSL.APP;
    var lv=app.state.levels.find(function(l){return l.id==='CH1-10'});
    var edges=lv.solution.edges.map(function(e,i){return {id:'e'+i,from:e.from,to:e.to}});
    var used={}; var bad=0;
    var rects=app.state.board._rects();
    edges.forEach(function(e){
      var a=app.state.board._portPoint(e.from.node,e.from.port);
      var b=app.state.board._portPoint(e.to.node,e.to.port);
      if(!a||!b)return;
      var pts=app.state.board._route(a,b,rects.filter(function(r){return r.id!==e.from.node&&r.id!==e.to.node;}),used);
      pts.forEach(function(p){
        rects.forEach(function(r){
          if(r.id===e.from.node||r.id===e.to.node)return;
          if(p.x>r.x+2&&p.x<r.x+r.w-2&&p.y>r.y+2&&p.y<r.y+r.h-2)bad++;
        });
      });
    });
    return {badPins:bad, wires:document.querySelectorAll('.wire').length};
  })()`);
  equal(setup.nodes, setup.expected, '棋盘上有目标 + 参考电路的全部模块（共 ' + setup.expected + ' 个）');
  equal(setup.complete, true, 'CH1-10 参考电路被真实引擎判定完成');
  equal(setup.errors, 0, '完整电路没有引擎错误');
  equal(info.wires, setup.edgeCount, '导线数与参考电路边数一致（' + setup.edgeCount + ' 条）');
  equal(info.badPins, 0, '所有导线绕行路径都不穿过无关节点');

  equal(setup.after.length, 2, '新增 2 个 atom 模块');
  setup.after.forEach((n) => {
    equal([(n.x % 16) || 0, (n.y % 16) || 0], [0, 0], '新增模块 ' + n.id + ' 吸附 16px 网格');
  });
  ok(setup.after[0].x !== setup.after[1].x || setup.after[0].y !== setup.after[1].y, '同坐标新增的两个模块被自动错开');

  /* ---- 路径规划避障 ---- */
  const avoid = await page.js(`(function(){
    var b=window.RSL.APP.state.board;
    var a={x:100,y:220}, t={x:760,y:300};
    var obstacle={x:320,y:140,w:232,h:120,id:'block'};
    var pts=b._route(a,t,[obstacle],{},'s','t');
    var bad=0;
    for(var i=1;i<pts.length;i++){
      var p=pts[i-1],q=pts[i];
      for(var k=1;k<=20;k++){
        var x=p.x+(q.x-p.x)*k/20, y=p.y+(q.y-p.y)*k/20;
        if(x>obstacle.x&&x<obstacle.x+obstacle.w&&y>obstacle.y&&y<obstacle.y+obstacle.h)bad++;
      }
    }
    return {points:pts.length,bad:bad};
  })()`);
  ok(avoid.points >= 2, '_route 返回折线（' + avoid.points + ' 个点）');
  equal(avoid.bad, 0, '_route 规划的路径不穿过障碍矩形');
  await page.shot('routing');

  /* ---- 深色主题 ---- */
  await page.js('document.getElementById("themeBtn").click()');
  await page.waitFor('document.documentElement.dataset.theme === "dark"');
  await page.sleep(300);
  equal(await page.js('document.documentElement.dataset.theme'), 'dark', '主题按钮切到 dark');
  const bg = await page.js('getComputedStyle(document.body).backgroundColor');
  const color = rgb(bg);
  ok(color && (color.r + color.g + color.b) / 3 < 90, '深色主题下页面底色足够暗（实际 ' + bg + '）');
  await page.shot('dark');
});
