'use strict';
/* 单章命题演算的浏览器验收：96 关（8 教学 + 32 普通 + 56 困难）。 */
const { runTest, fileUrl } = require('./lib/browser');
const { ok, equal, includes } = require('./lib/expect');

const TOTAL = 108;
const TUTORIALS = 8;
const BASE = 20;
const HARD = 70;
const DEMON = 10;

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
  equal(home.levels, TOTAL, '游戏加载 100 编号关 + 8 教学关');
  equal(home.code, 'i', '首关是教学关 i');
  includes(home.goal.replace(/\s+/g, ''), 'P→(Q→P)', '教学关目标 A1 实例');
  ok(home.tiles > 0, '元件栏有构造/规则/公理');
  equal(home.hasTerm, true, '唯一表达式核心已加载');
  equal(home.hasLogic, false, '旧 Logic 不再加载');

  /* 教学关浮窗：只给代号与规则式，不出现汉字 */
  const tip = await page.js(`(function(){
    var el = document.getElementById('tutorialTip');
    return {hidden: el.hidden, text: (el.textContent || '').replace(/\\s+/g, ' ').trim()};
  })()`);
  equal(tip.hidden, false, '教学关显示浮窗');
  ok(tip.text.indexOf('A1') === 0, '浮窗显示本关元件代号');
  ok(!/[\u4e00-\u9fa5]/.test(tip.text), '教学浮窗不含汉字');
  await page.shot('tutorial-i');

  /* 节点代号与端口：A2 不能显示成 A1；S 不显示旧变元改名端口 */
  const labels = await page.js(`(function(){
    var b = window.RSL.APP.state.board;
    var s = b._nodeView({ kind:'subst', config:{ groups:0 } }, null);
    return {
      axiom: b._code({ kind:'axiom', config:{ schema:'A2' } }),
      pred: b._code({ kind:'pred', config:{ symbol:'G' } }),
      theorem: b._code({ kind:'theorem', config:{ code:'01' } }),
      substPorts: s.inputPorts.map(function(p){return p.id})
    };
  })()`);
  equal(labels.axiom, 'A2', 'A2 显示 A2');
  equal(labels.pred, 'G', '谓词显示 G');
  equal(labels.theorem, '*01', '定理显示 *01');
  ok(labels.substPorts.indexOf('vleft') < 0 && labels.substPorts.indexOf('vright') < 0,
    'S 不显示旧变元改名端口');

  /* 选关面板：单章，教学 / 普通 / 困难三条带。 */
  await page.js('document.querySelector("#levelBtn").click()');
  await page.waitFor('document.querySelectorAll("[data-level]").length === ' + TOTAL);
  const sheet = await page.js(`(function(){
    var chapters = Array.from(document.querySelectorAll('.chapter'));
    var labels = Array.from(document.querySelectorAll('[data-level]')).map(function(b){return b.getAttribute('aria-label')});
    return {
      chapters: chapters.length,
      tutorials: document.querySelectorAll('.band.tutorial').length,
      tutorialCells: document.querySelectorAll('.band.tutorial [data-level]').length,
      baseCells: document.querySelectorAll('.band.base [data-level]').length,
      challengeCells: document.querySelectorAll('.band.challenge [data-level]').length,
      demonCells: document.querySelectorAll('.band.demon [data-level]').length,
      labels: labels
    };
  })()`);
  equal(sheet.chapters, 1, '选关只有一条课程线');
  equal(sheet.tutorials, 1, '一条教学分带');
  equal(sheet.tutorialCells, 8, '教学分带 8 格');
  equal(sheet.baseCells, BASE, '普通分带 20 格');
  equal(sheet.challengeCells, HARD, '困难分带 70 格');
  equal(sheet.demonCells, DEMON, '魔王分带 10 格');
  includes(sheet.labels.join('|'), 'Level 99', '有 99 号编号关');
  await page.shot('levels');

  /* 点困难关格：应直接加载 20。 */
  await page.js(`(function(){
    var app = window.RSL.APP;
    var idx = app.state.levels.map(function(l){return l.code}).indexOf('20');
    var cell = document.querySelector('[data-level="' + idx + '"]');
    if (!cell) throw new Error('找不到 20 的选关格');
    cell.click();
  })()`);
  await page.sleep(200);
  const lemmaView = await page.js(`(function(){
    var app = window.RSL.APP;
    return {
      code: app.state.level.code,
      band: app.state.level.band,
      hard: app.state.level.hard,
      goal: document.getElementById('goalFormula').textContent.trim(),
      tiles: document.querySelectorAll('.tile').length,
      sheetOpen: document.querySelectorAll('[data-level]').length > 0
    };
  })()`);
  equal(lemmaView.code, '20', '点击困难关加载 20');
  equal(lemmaView.band, 'challenge', '困难关 band 为 challenge');
  equal(lemmaView.hard, true, '20 是困难关');
  ok(lemmaView.goal.length > 0, '引理关目标渲染');
  ok(lemmaView.tiles > 0, '引理关元件栏有可放置模块');
  equal(lemmaView.sheetOpen, false, '点击关卡后选关面板关闭');
  await page.shot('hard-I-11');

  /* 帮助只保留推理/定义规则图例，不列变元/连接词/公理（D/D⁻ 本轮新增）。 */
  await page.js('document.querySelector("#helpBtn").click()');
  await page.waitFor('document.querySelectorAll(".help-card").length === 4');
  const help = await page.js(`(function(){
    return {labels: Array.from(document.querySelectorAll('.help-card b')).map(function(b){return b.textContent}),
            text: document.querySelector('.help-cards').textContent};
  })()`);
  equal(help.labels.join(','), 'S,M,D,D⁻', '帮助列 S/M/D/D⁻');
  ok(!/[\u4e00-\u9fa5]/.test(help.text), '帮助图例不含汉字');
  await page.shot('help');
  await page.js('window.RSL.UI.closeSheet()');

  /* 网页版禁用提示/排行榜；提示内容仍逐关存在 */
  equal(await page.js('document.querySelector("#hintBtn").hidden'), true, '网页版隐藏提示按钮');
  equal(await page.js('document.querySelector("#rankBtn").hidden'), true, '网页版隐藏排行榜按钮');
  /* 回到首关教学关 i：提示面板按当前关渲染；逐关定制提示另行统计。 */
  await page.js('window.RSL.APP.loadLevel(0)');
  await page.sleep(120);
  await page.js('window.RSL.Screens.openHint(window.RSL.APP.state.level)');
  await page.waitFor('document.querySelector(".hint-sheet") !== null');
  const hint = await page.js(`(function(){
    var levels = window.RSL.APP.state.levels;
    var tutorialAndBase = levels.filter(function (l) { return !l.hard; });
    var texts = tutorialAndBase.map(function (l) { return window.RSL.Hints.text(l); });
    var lemmaTexts = [];
    return {
      text: document.querySelector('.hint-page').textContent.trim(),
      nav: document.querySelector('.hint-nav').textContent.trim(),
      count: texts.length,
      missing: texts.filter(function (t) { return !t; }).length,
      unique: new Set(texts).size,
      lemmaHints: lemmaTexts.length,
      lemmaUnique: new Set(lemmaTexts).size
    };
  })()`);
  ok(hint.text.length > 0, '提示面板显示第一层提示');
  ok(/1\s*\/\s*3/.test(hint.nav), '提示面板有三页导航');
  equal(hint.count, TUTORIALS + BASE, '8 教学 + 20 普通关参与提示检查');
  equal(hint.missing, 0, '28 个教学/普通关都有定制提示');
  equal(hint.unique, TUTORIALS + BASE, '教学/普通关提示内容互不重复');
  ok(hint.lemmaHints === 0 || hint.lemmaUnique === hint.lemmaHints, '引理关提示若存在则互不重复');
  await page.js('window.RSL.UI.closeSheet()');

  /* 未点赞/未关注：第 2、3 页分别锁定 */
  await page.js(`window.__realHintHost = window.RSL.Hints.isToyHost;
    window.RSL.Hints.isToyHost = function () { return true; };
    window.toy = {
      getAuthorRelation: function () {
        return Promise.resolve({ status: 'ok', data: { isFollowing: false, isAuthor: false } });
      },
      getVideoUserActions: function () {
        return Promise.resolve({ items: [{ status: 'ok', liked: false }] });
      }
    };
    document.querySelector('#hintBtn').hidden = false;
    document.querySelector('#hintBtn').click();`);
  await page.waitFor('document.querySelector(".hint-page") !== null');
  await page.js('document.querySelector("[data-hint-next]").click()');
  await page.waitFor('document.querySelector(".hint-lock") !== null');
  const likeLock = await page.js(`document.querySelector('.hint-lock .hint-text').textContent`);
  ok(/点赞/.test(likeLock), '提示2需要点赞视频');
  await page.js('document.querySelector("[data-hint-next]").click()');
  await page.waitFor('document.querySelector("[data-hint-follow]") !== null');
  const followLock = await page.js(`document.querySelector('.hint-lock .hint-text').textContent`);
  ok(/关注/.test(followLock), '提示3需要关注 UP 主');
  await page.js('window.RSL.UI.closeSheet()');

  /* 已点赞 + 已关注：三页全部可读 */
  await page.js(`window.toy = {
    getAuthorRelation: function () {
      return Promise.resolve({ status: 'ok', data: { isFollowing: true, isAuthor: false } });
    },
    getVideoUserActions: function () {
      return Promise.resolve({ items: [{ status: 'ok', liked: true }] });
    }
  };
  document.querySelector('#hintBtn').click();`);
  await page.waitFor('document.querySelector(".hint-page") !== null');
  await page.js('document.querySelector("[data-hint-next]").click()');
  await page.waitFor('document.querySelector(".hint-page") !== null');
  const tier2 = await page.js(`document.querySelector('.hint-page').textContent`);
  ok(/目标：/.test(tier2) && /←/.test(tier2), '提示2拆出目标依赖');
  await page.js('document.querySelector("[data-hint-next]").click()');
  await page.waitFor('document.querySelector(".hint-page.is-recipe") !== null');
  const tier3 = await page.js(`document.querySelector('.hint-page.is-recipe').textContent`);
  ok(/modules:/.test(tier3) && /wires:/.test(tier3), '提示3给出完整接线清单（English 标签）');
  ok(!/[\u4e00-\u9fa5]/.test(tier3), '提示3参考解不含汉字');
  await page.js(`window.RSL.UI.closeSheet();
    delete window.toy;
    window.RSL.Hints.isToyHost = window.__realHintHost;
    delete window.__realHintHost;
    document.querySelector('#hintBtn').hidden = true;`);

  /* Toy 帮助页不显示上传/下载，改为云存档说明 */
  await page.js(`window.__realToyHost = window.RSL.CloudSave.isToyHost;
    window.RSL.CloudSave.isToyHost = function () { return true; };
    document.querySelector('#helpBtn').click();`);
  await page.waitFor('document.querySelector(".cloud-note") !== null');
  const toyHelp = await page.js(`(function(){
    return {
      saveButtons: document.querySelectorAll('[data-save-export],[data-save-import]').length,
      note: document.querySelector('.cloud-note').textContent
    };
  })()`);
  equal(toyHelp.saveButtons, 0, 'Toy 帮助页不显示上传/下载存档');
  ok(/账号/.test(toyHelp.note), 'Toy 帮助页说明账号云存档');
  await page.js(`window.RSL.UI.closeSheet();
    window.RSL.CloudSave.isToyHost = window.__realToyHost;
    delete window.__realToyHost;`);

  /* 排行榜渲染：名次、昵称、分数和我的名次 */
  await page.js(`window.RSL.Screens.openLeaderboard({
    list: [
      { rank: 1, nickname: '甲', avatar: '', score: 201200 },
      { rank: 2, nickname: '乙', avatar: '', score: 200800 }
    ],
    mine: { ranked: true, rank: 3, score: 114800 }
  }, window.RSL.APP.state);`);
  await page.waitFor('document.querySelectorAll(".rank-row").length === 2');
  const rank = await page.js(`(function(){
    return {
      rows: document.querySelectorAll('.rank-row').length,
      me: document.querySelector('.rank-me').textContent,
      first: document.querySelector('.rank-row .rank-score').textContent
    };
  })()`);
  equal(rank.rows, 2, '排行榜显示名次行');
  ok(/第 3 名/.test(rank.me), '排行榜显示我的名次');
  ok(/2 关/.test(rank.first), '排行榜分数按通关数显示');
  await page.js('window.RSL.UI.closeSheet()');

  await page.js('document.querySelector("#achvBtn").click()');
  await page.waitFor('document.querySelectorAll(".achv").length === 20');
  equal(await page.js('document.querySelectorAll(".achv").length'), 20, '成就面板 20 格');
  await page.js('window.RSL.UI.closeSheet()');

  /* 元件栏合并：原子 P/Q/R 共享一个 tile，具体字母在配置弹层里选 */
  const mergedTray = await page.js(`(function(){
    var app = window.RSL.APP;
    var idx = app.state.levels.map(function(l){return l.code}).indexOf('00');
    app.loadLevel(idx);
    var parts = window.RSL.Catalog.partsForLevel(app.state.level);
    var atom = parts.filter(function(p){return p.kind==='atom'})[0];
    return {atomTiles: parts.filter(function(p){return p.kind==='atom'}).length,
            variants: atom && atom.variants ? atom.variants.length : 0};
  })()`);
  equal(mergedTray.atomTiles, 1, '原子只占一个元件');
  ok(mergedTray.variants >= 1, '原子 tile 至少包含一个变体');
  await page.js('document.querySelector(".tile[data-key=\\"atom:*\\"]").click()');
  await page.sleep(150);
  const popover = await page.js('document.querySelectorAll(".letter-grid .opt").length');
  equal(popover, 7, '原子切换器显示完整 P–V，而不是只显示本关用到的字母');
  await page.js('document.querySelector(".letter-grid .opt[data-value=\\"Q\\"]").click()');
  await page.sleep(120);
  const popoverAfter = await page.js(`(function(){
    var app=window.RSL.APP;
    var n=app.state.board.node(app.state.selectedNode);
    return {hidden:document.getElementById('popover').hidden,
            selected:!!app.state.selectedNode,
            name:n && n.config && n.config.name};
  })()`);
  equal(popoverAfter.hidden, false, '点原子选项后参数栏不消失');
  equal(popoverAfter.selected, true, '点原子选项后元件仍保持选中');
  equal(popoverAfter.name, 'Q', '原子选项已切换');

  /* 终点连线持久化：旧存档里的 target id 也要在重进时接回 ⊢ */
  const persist = await page.js(`(function(){
    var app = window.RSL.APP;
    var idx = app.state.levels.map(function(l){return l.code}).indexOf('01');
    var lv = app.state.levels[idx];
    app.state.circuits[lv.id] = {
      nodes: JSON.parse(JSON.stringify(lv.solution.nodes)),
      edges: JSON.parse(JSON.stringify(lv.solution.edges))
    };
    app.loadLevel(idx);
    var data = app.state.board.getData();
    return {proofEdge: data.edges.some(function(e){
      return e.to && e.to.node === 'target' && e.to.port === 'proof';
    })};
  })()`);
  equal(persist.proofEdge, true, '重进关卡时终点连线恢复');

  /* 近距离端口：扇入到相邻输入端的线应是短的 Z 折线，而不是绕圈的乱线 */
  const closeWires = await page.js(`(function(){
    document.getElementById('tutorialTip').hidden = true;
    var app = window.RSL.APP;
    var nodes = [
      {id:'a',kind:'atom',x:60,y:80,config:{name:'P'}},
      {id:'c',kind:'atom',x:60,y:250,config:{name:'Q'}},
      {id:'b',kind:'imp',x:340,y:150,config:{}}
    ];
    var edges = [
      {id:'e1',from:{node:'a',port:'out'},to:{node:'b',port:'a'}},
      {id:'e2',from:{node:'c',port:'out'},to:{node:'b',port:'b'}}
    ];
    app.state.board.setData(nodes, edges);
    var res = window.RSL.Engine.evaluate(app.state.level, nodes, edges, {levels: app.state.levels, levelNo: 1});
    app.state.board.paint(res);
    return Array.from(document.querySelectorAll('.wire')).map(function(p){return p.getAttribute('d');});
  })()`);
  closeWires.forEach(function (d, i) {
    const turns = (String(d).match(/L/g) || []).length;
    ok(turns > 0 && turns <= 12, '近距离端口连线保持短折线（线 ' + (i + 1) + '：' + turns + ' 段）');
  });

  /* 同一张电路在缩放前后必须得到同一条端口坐标与同一条 SVG 路径 */
  const zoomStable = await page.js(`(function(){
    document.getElementById('tutorialTip').hidden = true;
    var app = window.RSL.APP;
    var lv = app.state.level;
    var target = JSON.parse(JSON.stringify(lv.initialNodes[0]));
    var nodes = [target, {id:'dbgzoom',kind:'atom',x:120,y:200,config:{name:'P'}}];
    var edges = [{id:'dbgzoome',from:{node:'dbgzoom',port:'out'},to:{node:target.id,port:'proof'}}];
    app.state.board.setData(nodes, edges);
    var path = function(){ var p=document.querySelector('.wire'); return p && p.getAttribute('d'); };
    var base = path();
    app.state.board.setView(30,30,0.65);
    var small = path();
    app.state.board.setView(30,30,1.25);
    var large = path();
    return !!base && base === small && base === large;
  })()`);
  equal(zoomStable, true, '缩放前后导线路径保持一致');
  const zoomMin = await page.js(`(function(){
    var b = window.RSL.APP.state.board;
    b.setView(30, 30, 0.001);
    return b.view.scale;
  })()`);
  equal(zoomMin, 0.05, '缩放下限为 0.05');

  /* 最后一关：99 与目标 */
  await page.js('window.RSL.APP.loadLevel(window.RSL.APP.state.levels.map(function(l){return l.code}).indexOf("99"))');
  await page.sleep(300);
  const last = await page.js(`(function(){
    return {code: window.RSL.APP.state.level.code,
            goal: document.getElementById('goalFormula').textContent.trim(),
            tiles: document.querySelectorAll('.tile').length};
  })()`);
  equal(last.code, '99', '可以进入最后一关 99');
  ok(last.goal.length > 0, '最后一关目标渲染');
  ok(last.tiles > 0, '最后一关元件栏');
  ok(await page.js('window.RSL.APP.state.level.solution.nodes.length > 0'), '最后一关有参考电路');
  equal(page.problems().length, 0, '页面无 JS 错误：' + JSON.stringify(page.problems().slice(0, 3)));
  await page.shot('game-108');
});
