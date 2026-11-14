'use strict';
/* 交互规则验收：解锁顺序、困难/魔王全开、引理选择、连接词合并、半成品存档。 */
const { runTest, fileUrl } = require('./lib/browser');
const { ok, equal } = require('./lib/expect');

runTest('features', async ({ openPage }) => {
  const page = await openPage({ width: 1440, height: 900, url: fileUrl('index.html') });
  await page.ready();
  await page.js(`window.RSL.Story.setSeen({intro:true,tutorials:true,normal:true,hard:true,demon:true});
    document.getElementById('storyLayer').hidden = true;`);

  const rules = await page.js(`(function(){
    var app = window.RSL.APP;
    var levels = app.state.levels;
    var tut = levels.filter(function(x){return x.band==='tutorial'});
    var base = levels.filter(function(x){return x.band==='base'});
    var hard = levels.filter(function(x){return x.band==='challenge'});
    var demon = levels.filter(function(x){return x.band==='demon'});
    function idx(lv){return levels.indexOf(lv)}
    app.state.forceUnlock = false;
    app.state.solved = {};
    var t0 = app.isUnlocked(idx(tut[0])), t1 = app.isUnlocked(idx(tut[1]));
    app.state.solved[tut[0].id] = true;
    var t1after = app.isUnlocked(idx(tut[1]));
    tut.forEach(function(x){app.state.solved[x.id]=true});
    base.forEach(function(x){app.state.solved[x.id]=true});
    var hardFirst = app.isUnlocked(idx(hard[0]));
    var demonBefore = app.isUnlocked(idx(demon[0]));
    hard.forEach(function(x){app.state.solved[x.id]=true});
    var demonAfter = app.isUnlocked(idx(demon[0]));
    return {t0:t0,t1:t1,t1after:t1after,hardFirst:hardFirst,demonBefore:demonBefore,demonAfter:demonAfter};
  })()`);
  equal(rules.t0, true, '第一关教学默认解锁');
  equal(rules.t1, false, '第二关教学需要先通关前一关');
  equal(rules.t1after, true, '教学关逐关解锁');
  equal(rules.hardFirst, true, '普通全通后困难第一关解锁');
  equal(rules.demonBefore, false, '困难未全通时魔王关锁定');
  equal(rules.demonAfter, true, '困难全通后魔王关解锁');

  const tray = await page.js(`(function(){
    var app = window.RSL.APP;
    app.state.forceUnlock = true;
    var hard = app.state.levels.filter(function(x){return x.band==='challenge'})[0];
    app.loadLevel(app.state.levels.indexOf(hard));
    var parts = app.state.parts;
    var conn = parts.filter(function(p){return p.kind==='connective'})[0];
    var labels = Array.from(document.querySelectorAll('.tile')).map(function(t){return t.textContent.trim()});
    return {
      labels: labels,
      connTiles: parts.filter(function(p){return p.kind==='connective'}).length,
      connOps: conn.ops,
      theoremTiles: parts.filter(function(p){return p.kind==='theorem'}).length,
      picker: parts.filter(function(p){return p.picker==='lemma'}).length
    };
  })()`);
  equal(tray.connTiles, 1, '所有连接词只占一个元件');
  equal(tray.connOps.join(','), 'not,imp,and,or,iff', '困难关五个连接词全开');
  equal(tray.theoremTiles, 1, '困难关显示一个引理选择器');
  equal(tray.picker, 1, '引理选择器可打开大面板');
  ok(tray.labels.indexOf('S') < tray.labels.indexOf('D'), 'D 排在 S 之后');
  ok(tray.labels.indexOf('M') < tray.labels.indexOf('D⁻'), 'D⁻ 排在 M 之后');

  const conn = await page.js(`(function(){
    var app = window.RSL.APP;
    var n = app.state.board.addNode('connective', {op:'not'}, {x:100,y:100});
    var unary = app.state.board._nodeView(n, null).inputPorts.map(function(p){return p.id});
    app.state.board.setConnectiveOp(n.id, 'and');
    var binary = app.state.board._nodeView(app.state.board.node(n.id), null).inputPorts.map(function(p){return p.id});
    return {unary:unary, binary:binary};
  })()`);
  equal(conn.unary.join(','), 'a', '一元连接词只有一个输入');
  equal(conn.binary.join(','), 'a,b', '二元连接词有两个输入');

  const lemmas = await page.js(`(function(){
    var app = window.RSL.APP;
    var levels = app.state.levels;
    var tut = levels.filter(function(x){return x.band==='tutorial'})[0];
    var base = levels.filter(function(x){return x.band==='base'})[0];
    var hard = levels.filter(function(x){return x.band==='challenge'})[0];
    app.state.solved = {};
    app.state.solved[tut.id] = true;
    app.state.solved[base.id] = true;
    app.state.solved[hard.id] = true;
    app.loadLevel(levels.indexOf(hard));
    document.querySelector('.tile[data-key="theorem:*"]').click();
    return {rows:document.querySelectorAll('.lemma-row').length,
      sheet:!!document.querySelector('.lemma-sheet')};
  })()`);
  equal(lemmas.sheet, true, '引理选择器打开大面板');
  equal(lemmas.rows, 2, '只列出已通关的非教学引理（不含教学关）');
  await page.js('document.querySelector(".lemma-row").click()');
  await page.sleep(120);
  const added = await page.js(`(function(){
    var app = window.RSL.APP;
    return {theorems:app.state.board.items.filter(function(n){return n.kind==='theorem'}).length,
      sheet:!!document.querySelector('.lemma-sheet')};
  })()`);
  equal(added.theorems, 1, '选中引理后放到画布');
  equal(added.sheet, false, '选择后关闭引理面板');

  const theoremRules = await page.js(`(function(){
    var app = window.RSL.APP;
    var levels = app.state.levels;
    var hard = levels.filter(function(x){return x.band==='challenge'});
    var tut = levels.filter(function(x){return x.band==='tutorial'})[0];
    var current = hard[1];
    var later = hard[6];
    app.state.solved[later.id] = true;
    app.state.solved[tut.id] = true;
    var ctx = {levels:levels, levelIndex:levels.indexOf(current), solved:app.state.solved};
    function evalTheorem(code) {
      var target = {id:'t',kind:'target',x:400,y:0,config:{},targetTokens:later.targetTokens};
      var th = {id:'th',kind:'theorem',x:0,y:0,config:{code:code}};
      return window.RSL.Engine.evaluate(current,[target,th],[
        {id:'e',from:{node:'th',port:'out'},to:{node:'t',port:'proof'}}
      ],ctx);
    }
    var okLater = evalTheorem(later.code);
    var badTutorial = evalTheorem(tut.code);
    return {later:okLater.complete, laterErr:okLater.errors,
      tutorial:badTutorial.complete, tutorialErr:(badTutorial.errors[0]||{}).message || ''};
  })()`);
  equal(theoremRules.later, true, '可以引用编号更晚但已通关的引理');
  equal(theoremRules.tutorial, false, '非教学关不能引用教学关');
  ok(/教学关/.test(theoremRules.tutorialErr), '引用教学关会给出明确错误');

  const works = await page.js(`(function(){
    var app = window.RSL.APP;
    app.loadLevel(0);
    for (var i = app.state.board.items.length - 1; i >= 0; i -= 1) {
      if (app.state.board.items[i].kind !== 'target') app.state.board.removeNode(app.state.board.items[i].id);
    }
    app.state.board.addNode('atom', {name:'Q'}, {x:120,y:120});
    app.refresh();
    var lv = app.state.level;
    var stored = JSON.parse(localStorage.getItem('axiom-simple:v2') || '{}');
    var before = app.state.works[lv.id] ? app.state.works[lv.id].nodes.length : -1;
    app.loadLevel(1);
    app.loadLevel(0);
    return {before:before,
      after:app.state.board.items.filter(function(n){return n.kind==='atom'}).length,
      stored:stored.works && stored.works[lv.id] ? stored.works[lv.id].nodes.length : -1};
  })()`);
  equal(works.before, 1, '画布变化后立即写入本关半成品');
  equal(works.stored, 1, '半成品写入 localStorage');
  equal(works.after, 1, '离开再回来恢复半成品');

  equal(page.problems().length, 0, '页面无 JS 错误：' + JSON.stringify(page.problems().slice(0, 3)));
});
