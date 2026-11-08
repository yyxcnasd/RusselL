'use strict';
/*
 * set.mm 证明重放关：真浏览器端到端（Edge headless + CDP）。
 *
 * 覆盖点：
 *   - 默认开启：目录 288 关，四章各 30 基础 + 12 重放 + 30 挑战；
 *   - ?mm=0 关闭：回到 240 关、没有重放段（旧版形态仍可用）；
 *   - 点目录里的重放行（真实用户路径）→ 棋盘与元件栏隐藏、#mmRoot 挂上面板；
 *   - 顶栏「校验」在重放关里是「下一步」：推进到 304 步的最后一步也不卡；
 *   - 最后一步触发通关面板并写入 solved；
 *   - 键盘 → 推进；0 步公理（ax-11）不自动通关，确认后通关；
 *   - 深色主题与 390×844 移动端布局。
 */
const { runTest, fileUrl } = require('./lib/browser');
const { ok, equal, includes } = require('./lib/expect');

const MM_ON = fileUrl('index.html?mm=1');
const MM_OFF = fileUrl('index.html?mm=0');

/* 反复点「下一步」，直到达到给定步骤数（面板只在当前分段渲染行，所以按状态推进）。 */
async function advanceTo(page, target) {
  await page.js(`(function(){
    var btn=document.querySelector('#mmRoot [data-mm-next]');
    var n=0;
    while(btn && !btn.disabled && n < 400) { btn.click(); n++; btn=document.querySelector('#mmRoot [data-mm-next]'); }
    return n;
  })()`);
  await page.waitFor(`window.RSL.APP.state.mmProgress && window.RSL.APP.state.mmProgress.step === ${target}`, { timeout: 8000 });
}

async function loadByCode(page, code) {
  const idx = await page.js(
    'window.RSL.APP.state.levels.findIndex(function(l){return l.code === ' + JSON.stringify(code) + ' && l.mode === "mm-proof"})'
  );
  ok(idx >= 0, '目录里能找到重放关 ' + code);
  await page.js('window.RSL.APP.loadLevel(' + idx + ')');
  await page.waitFor(
    'window.RSL.APP.state.level.code === ' + JSON.stringify(code) + ' && !!document.querySelector("#mmRoot [data-mm-panel]")'
  );
  return idx;
}

runTest('mm-ui', async ({ openPage }) => {
  /* ---------------- 1. 旧版形态：?mm=0 关闭重放段 ---------------- */
  const off = await openPage({ width: 1280, height: 860, url: MM_OFF });
  await off.ready();
  equal(await off.js('window.RSL.MM.Flags.enabled()'), false, '?mm=0 关闭重放段');
  equal(await off.js('window.RSL.APP.state.levels.length'), 240, '?mm=0 时目录是 240 关');
  await off.js('window.RSL.APP.openLevels()');
  await off.waitFor('document.querySelectorAll(".level-cell").length > 0');
  equal(await off.js('document.querySelectorAll(".band.replay").length'), 0, '关闭时没有重放段');
  equal(await off.js('document.querySelectorAll(".mm-level").length'), 0, '关闭时没有重放行');
  await off.close();

  /* ---------------- 2. 默认开启：目录结构 ---------------- */
  const page = await openPage({ width: 1440, height: 900, url: MM_ON });
  await page.ready();
  /* 重放段在章节里按解锁链排（基础 30 关之后），测试里直接解锁全部关卡。 */
  await page.js('window.RSL.APP.state.forceUnlock = true');

  equal(await page.js('window.RSL.MM.Flags.enabled()'), true, '默认开启重放段');
  equal(await page.js('window.RSL.MM_LEVELS.length'), 48, '48 个重放关卡已随游戏发布（每章 12）');
  equal(await page.js('window.RSL.APP.state.levels.length'), 288, '目录为 240 + 48 = 288 关');
  equal(
    await page.js(`(function(){
      var L=window.RSL.APP.state.levels;
      return ['prop','pred','eq','set'].every(function(ch){
        var g=L.filter(function(l){return l.chapter===ch});
        return g.length === 72 &&
          g.filter(function(l){return l.band==='base'}).length === 36 &&
          g.filter(function(l){return l.band==='challenge'}).length === 36 &&
          g.filter(function(l){return l.mode==='mm-proof'}).length === 12;
      });
    })()`),
    true,
    '每章 72 关：36 基础 + 36 挑战，其中 12 个重放关'
  );

  await page.js('window.RSL.APP.openLevels()');
  await page.waitFor('document.querySelectorAll(".mm-level").length === 48');
  equal(await page.js('document.querySelectorAll(".mm-level").length'), 48, '目录里有 48 个重放关行');
  equal(await page.js('document.querySelectorAll(".band.replay").length'), 0, '重放关不再占独立分带');
  equal(await page.js('document.querySelectorAll(".level-cell").length'), 240, '接线关仍是 240 格');
  const bands = await page.js(`(function(){
    var s=document.querySelectorAll('.chapter')[0];
    return Array.from(s.querySelectorAll('.band')).map(function(b){
      return b.classList.contains('challenge') ? 'challenge' : 'base';
    });
  })()`);
  equal(bands.join(','), 'base,challenge', '章内仍是基础段 + 挑战段（重放关交错在段内）');
  equal(
    await page.js('document.querySelectorAll(".band.base .mm-level, .band.challenge .mm-level").length'),
    48,
    '重放关行按难度交错在基础段与挑战段里'
  );

  /* 第一张重放卡片 = 章内按难度排到的第一个重放目标（MM-01 = pm2.07，3 步） */
  const firstRow = await page.js(`(function(){
    var row=document.querySelector('.mm-level.is-inline');
    if(!row) return null;
    var idx=parseInt(row.getAttribute('data-level'),10);
    var lv=window.RSL.APP.state.levels[idx];
    return {
      no:row.querySelector('.mm-level-no').textContent,
      title:row.querySelector('.mm-level-title').textContent,
      code:lv.code,
      order:lv.chapterOrder,
      steps:row.querySelector('.mm-level-steps').textContent,
      level:idx,
      label:row.getAttribute('aria-label')
    };
  })()`);
  ok(firstRow, '第一张重放卡片存在');
  equal(firstRow.code, 'pm2.07', '命题章按难度排到的第一个重放目标是 pm2.07');
  equal(firstRow.no, String(firstRow.order).padStart(2, '0'), '卡片显示章内位置号而不是 MM id');
  includes(firstRow.steps, '3', '行里显示步骤数');
  ok(firstRow.title.length > 0 && firstRow.title.length <= 14, '行里有中文短名：' + firstRow.title);

  /* 点目录行直接进关（真实用户路径，不是直接调 APP.loadLevel） */
  const pm324 = await page.js(
    'window.RSL.APP.state.levels.findIndex(function(l){return l.code === "pm3.24" && l.mode === "mm-proof"})'
  );
  ok(pm324 >= 0, '目录里有 pm3.24 重放关');
  await page.js('document.querySelector(".mm-level[data-level=\\"' + pm324 + '\\"]").click()');
  await page.waitFor('window.RSL.APP.state.level.code === "pm3.24" && !!document.querySelector("#mmRoot [data-mm-panel]")');
  equal(await page.js('document.getElementById("overlay").hidden'), true, '点目录行后选关面板关闭');

  const mounted = await page.js(`(function(){
    var root=document.getElementById('mmRoot');
    return {
      board:getComputedStyle(document.getElementById('board')).display,
      tray:getComputedStyle(document.getElementById('tray')).display,
      root:getComputedStyle(root).display,
      code:(document.querySelector('#mmRoot [data-mm-code]')||{}).textContent,
      target:(document.querySelector('#mmRoot [data-mm-target]')||{}).textContent,
      progress:(document.querySelector('#mmRoot [data-mm-progress]')||{}).textContent,
      stepRows:document.querySelectorAll('#mmRoot [data-mm-step]').length,
      goal:document.getElementById('goalFormula').textContent.replace(/\\s+/g,''),
      levelNo:document.getElementById('levelBtn').textContent
    };
  })()`);
  equal(mounted.board, 'none', '重放关隐藏棋盘');
  equal(mounted.tray, 'none', '重放关隐藏元件栏');
  ok(mounted.root !== 'none', '#mmRoot 可见');
  equal(mounted.code, 'pm3.24', '面板显示 set.mm label');
  includes(mounted.target, '⊢', '目标公式带 ⊢');
  includes(mounted.target, '¬', '目标公式渲染成 Unicode（¬）');
  equal(mounted.progress, '1 / 14', 'pm3.24 第一步 / 共 14 步');
  equal(mounted.stepRows, 14, '步骤列表渲染 14 行（≤80 步不分段）');
  ok(mounted.goal.indexOf('φ') >= 0 || mounted.goal.indexOf('ph') >= 0, '顶栏目标显示公式');
  ok(/^M\d\d$/.test(mounted.levelNo), '关卡号显示为 Mxx：' + mounted.levelNo);
  await page.shot('mm-replay-pm3.24');

  /* 顶栏按钮：下一步 */
  equal(
    await page.js('document.querySelector("#checkBtn").getAttribute("aria-label")'),
    '下一步',
    '重放关里顶栏校验按钮变成「下一步」'
  );
  await page.js('document.querySelector("#checkBtn").click()');
  await page.waitFor('window.RSL.APP.state.mmProgress.step === 2');
  equal(await page.js('document.querySelector("#mmRoot [data-mm-progress]").textContent'), '2 / 14', '顶栏按钮推进到第 2 步');

  /* 键盘 → 继续推进 */
  await page.key('ArrowRight');
  await page.waitFor('window.RSL.APP.state.mmProgress.step === 3');
  equal(await page.js('window.RSL.APP.state.mmProgress.step'), 3, '键盘 → 推进到第 3 步');

  /* 一路走到最后一步 → 通关面板 */
  await advanceTo(page, 14);
  await page.waitFor('document.querySelector("#sheet .win")');
  const win = await page.js(`(function(){
    var id=window.RSL.APP.state.level.id;
    return {
      solved: !!window.RSL.APP.state.solved[id],
      winText: document.querySelector('#sheet .win').textContent
    };
  })()`);
  equal(win.solved, true, '走完 pm3.24 后写入通关存档');
  includes(win.winText, '14', '通关面板显示 14 步');
  await page.shot('mm-replay-win');
  await page.js('window.RSL.UI.closeSheet()');

  /* ---------------- 3. 大证明：axacnd 304 步，分段 + 跳到末尾 ---------------- */
  const bigIdx = await loadByCode(page, 'axacnd');
  equal(await page.js('window.RSL.APP.state.level.stats.steps'), 304, 'axacnd 有 304 步');
  const segs = await page.js('document.querySelectorAll("#mmRoot [data-mm-seg]").length');
  ok(segs > 1, '304 步的证明分段渲染（实际 ' + segs + ' 段）');
  const t0 = Date.now();
  await page.js('document.querySelector("#mmRoot [data-mm-last]").click()');
  await page.waitFor('window.RSL.APP.state.mmProgress.step === 304', { timeout: 8000 });
  ok(Date.now() - t0 < 8000, '跳到 304 步没有卡死（' + (Date.now() - t0) + 'ms）');
  await page.waitFor('document.querySelector("#sheet .win")');
  equal(await page.js('!!window.RSL.APP.state.solved[window.RSL.APP.state.level.id]'), true, 'axacnd 通关写入存档');
  await page.shot('mm-replay-axacnd');
  await page.js('window.RSL.UI.closeSheet()');

  /* ---------------- 4. 0 步公理：ax-11 不自动通关 ---------------- */
  await loadByCode(page, 'ax-11');
  const axiom = await page.js(`(function(){
    var id=window.RSL.APP.state.level.id;
    return {
      code: window.RSL.APP.state.level.code,
      solved: !!window.RSL.APP.state.solved[id],
      text: document.querySelector('#mmRoot [data-mm-panel]').textContent
    };
  })()`);
  equal(axiom.code, 'ax-11', '重放段里包含 ax-11 公理图式');
  equal(axiom.solved, false, '公理图式载入后不自动通关');
  includes(axiom.text, '公理', '面板明确说明这是公理图式');
  equal(
    await page.js('document.querySelectorAll("#mmRoot [data-mm-mode-toggle]").length'),
    0,
    '0 步公理不提供「自推」切换'
  );
  await page.js('document.querySelector("#checkBtn").click()');
  await page.waitFor('!!window.RSL.APP.state.solved[window.RSL.APP.state.level.id]');
  equal(await page.js('!!window.RSL.APP.state.solved[window.RSL.APP.state.level.id]'), true, '确认后公理图式记完成');

  /* ---------------- 5. 交互式自推（Tier 3）：按参考动作点候选直到通关 ---------------- */
  await page.js('window.RSL.UI.closeSheet()');
  await page.js('window.RSL.APP.loadLevel(' + pm324 + ')');
  await page.waitFor('window.RSL.APP.state.level.code === "pm3.24" && !!document.querySelector("#mmRoot [data-mm-panel]")');
  await page.js('document.querySelector("#mmRoot [data-mm-mode-toggle]").click()');
  await page.waitFor('window.RSL.APP.state.mmProgress && window.RSL.APP.state.mmProgress.mode === "interactive"');
  const inter = await page.js(`(function(){
    var t=document.querySelector('#mmRoot [data-mm-mode-toggle]');
    return {
      pressed: t.getAttribute('aria-pressed'),
      label: t.textContent.trim(),
      hyps: document.querySelectorAll('#mmRoot [data-mm-hyp]').length,
      asserts: document.querySelectorAll('#mmRoot [data-mm-assert]').length,
      stack: !!document.querySelector('#mmRoot [data-mm-stack]'),
      undo: !!document.querySelector('#mmRoot [data-mm-undo]'),
      reset: !!document.querySelector('#mmRoot [data-mm-reset]'),
      hint: !!document.querySelector('#mmRoot [data-mm-hint]'),
      error: !!document.querySelector('#mmRoot [data-mm-error]'),
      actions: (document.querySelector('#mmRoot [data-mm-actions]')||{}).textContent,
      ref: (document.querySelector('#mmRoot [data-mm-ref]')||{}).textContent
    };
  })()`);
  ok(inter.hyps >= 1, '自推模式列出假设候选（' + inter.hyps + '）');
  ok(inter.asserts >= 5, '自推模式列出可用断言（' + inter.asserts + '）');
  ok(inter.stack && inter.undo && inter.reset && inter.hint && inter.error, '自推模式的钩子齐全');
  equal(inter.pressed, 'true', '模式切换按钮处于按下态');
  equal(inter.actions, '0', '初始已用步数为 0');
  equal(inter.ref, '14', '参考步数为 14');
  /* 顶栏按钮变成「提示」 */
  equal(await page.js('document.querySelector("#checkBtn").getAttribute("aria-label")'), '提示', '自推模式顶栏按钮是「提示」');
  await page.js('document.querySelector("#checkBtn").click()');
  await page.waitFor('document.querySelector("#mmRoot [data-mm-hint-text]") && document.querySelector("#mmRoot [data-mm-hint-text]").textContent.length > 0');
  await page.shot('mm-interactive');

  /* 按参考证明的动作序列点候选 chip，直到通关 */
  const acts = await page.js('window.RSL.MM.Verify.referenceActions(window.RSL.MM_PROOFS["pm3.24"])');
  ok(Array.isArray(acts) && acts.length === 14, '参考动作 14 条');
  for (const a of acts) {
    const sel = a.kind === 'hyp'
      ? '[data-mm-hyp="' + a.label + '"]'
      : '[data-mm-assert="' + a.label + '"]';
    const clicked = await page.js(`(function(){
      var el=document.querySelector('#mmRoot ${sel}');
      if(!el || el.disabled) return false;
      el.click(); return true;
    })()`);
    ok(clicked, '候选可点：' + a.label);
  }
  await page.waitFor('!!document.querySelector("#mmRoot [data-mm-solved]")');
  const done = await page.js(`(function(){
    var id=window.RSL.APP.state.level.id;
    return {
      solved: !!window.RSL.APP.state.solved[id],
      actions: (document.querySelector('#mmRoot [data-mm-actions]')||{}).textContent,
      stack: document.querySelectorAll('#mmRoot [data-mm-stack-item]').length
    };
  })()`);
  equal(done.solved, true, '自推通关写入存档');
  equal(done.actions, '14', '自推用了 14 步（与参考一致）');
  ok(done.stack >= 1, '通关时栈里有公式');
  await page.shot('mm-interactive-solved');

  /* 切回回放：步骤列表回来 */
  await page.js('window.RSL.UI.closeSheet()');
  await page.js('document.querySelector("#mmRoot [data-mm-mode-toggle]").click()');
  await page.waitFor('window.RSL.APP.state.mmProgress && window.RSL.APP.state.mmProgress.mode === "replay"');
  equal(await page.js('document.querySelectorAll("#mmRoot [data-mm-step]").length'), 14, '切回回放后步骤列表恢复');
  equal(await page.js('document.querySelector("#checkBtn").getAttribute("aria-label")'), '下一步', '切回回放后顶栏按钮回到「下一步」');

  /* ---------------- 6. 深色主题：面板沿用 token，不出现硬编码色 ---------------- */
  await page.js('window.RSL.APP.loadLevel(' + pm324 + ')');
  await page.waitFor('window.RSL.APP.state.level.code === "pm3.24" && !!document.querySelector("#mmRoot [data-mm-step]")');
  await page.js('document.getElementById("themeBtn").click()');
  await page.waitFor('document.documentElement.dataset.theme === "dark"');
  const dark = await page.js(`(function(){
    var panel=document.querySelector('#mmRoot [data-mm-panel]');
    var row=document.querySelector('#mmRoot [data-mm-step][data-mm-state="current"]');
    var cs=getComputedStyle(panel), rs=getComputedStyle(row);
    return {theme:document.documentElement.dataset.theme,
            panelColor:cs.color, rowBg:rs.backgroundColor,
            boardVisible:getComputedStyle(document.getElementById('board')).display};
  })()`);
  equal(dark.theme, 'dark', '重放关可以切到深色主题');
  equal(dark.boardVisible, 'none', '深色下棋盘仍然隐藏');
  ok(dark.rowBg && dark.rowBg !== 'rgb(255, 255, 255)', '深色下步骤行不是白底（用的是 token）');
  ok(dark.panelColor && dark.panelColor !== 'rgb(0, 0, 0)', '深色下面板文字不是纯黑');
  await page.shot('mm-replay-dark');
  await page.js('document.getElementById("themeBtn").click()');
  await page.waitFor('document.documentElement.dataset.theme !== "dark"');

  /* ---------------- 6. 切回普通关：棋盘恢复 ---------------- */
  await page.js('window.RSL.APP.loadLevel(0)');
  await page.waitFor('window.RSL.APP.state.level.code !== "pm3.24"');
  const restored = await page.js(`(function(){
    return {
      board:getComputedStyle(document.getElementById('board')).display,
      tray:getComputedStyle(document.getElementById('tray')).display,
      mm:document.querySelectorAll('#mmRoot [data-mm-panel]').length,
      label:document.getElementById('checkBtn').getAttribute('aria-label')
    };
  })()`);
  ok(restored.board !== 'none', '普通关棋盘恢复显示');
  ok(restored.tray !== 'none', '元件栏恢复显示');
  equal(restored.mm, 0, '离开重放关后卸载面板');
  equal(restored.label, '校验', '顶栏按钮恢复为「校验」');

  const problems = page.problems();
  equal(problems.length, 0, '页面无 JS 错误：' + JSON.stringify(problems.slice(0, 3)));

  /* ---------------- 7. 移动端（390×844）：详情在上、列表在下，不横向溢出 ---------------- */
  const mobile = await openPage({ width: 390, height: 844, url: MM_ON });
  await mobile.ready();
  await mobile.js('window.RSL.APP.state.forceUnlock = true');
  await loadByCode(mobile, 'axacnd');
  const m = await mobile.js(`(function(){
    var d=document.querySelector('#mmRoot [data-mm-current]').getBoundingClientRect();
    var l=document.querySelector('#mmRoot [data-mm-step-list]').getBoundingClientRect();
    var next=document.querySelector('#mmRoot [data-mm-next]').getBoundingClientRect();
    return {
      detailTop:Math.round(d.top), listTop:Math.round(l.top),
      nextBottom:Math.round(next.bottom), viewportH:window.innerHeight,
      overflowX:document.documentElement.scrollWidth - window.innerWidth,
      targetVisible:!!document.querySelector('#mmRoot [data-mm-target]')
    };
  })()`);
  ok(m.detailTop < m.listTop, '移动端详情区在步骤列表上方（' + m.detailTop + ' < ' + m.listTop + '）');
  ok(m.nextBottom <= m.viewportH + 1, '移动端「下一步」在视口内（' + m.nextBottom + ' ≤ ' + m.viewportH + '）');
  ok(m.overflowX <= 1, '移动端无横向溢出（' + m.overflowX + 'px）');
  ok(m.targetVisible, '移动端目标公式可见');
  await mobile.shot('mm-replay-mobile');
  equal(mobile.problems().length, 0, '移动端页面无 JS 错误');
});
