'use strict';
/*
 * task-5 独立验收：在干净 profile 下对集成后的成品做端到端验收。
 *
 * 覆盖：
 *   1) 首关真实操作：放置模块 → 端口连线 → 校验 → 通关面板；
 *   2) toast：位于顶栏之下、不遮目标公式、z-index 高于 overlay（通关时仍可见）；
 *   3) 焦点管理：面板打开时 topbar/stage/tray inert、Tab 不逃逸（含末位/首位回绕、
 *      focusin 兜底）、Escape 关闭面板后焦点归还触发按钮；
 *   4) Escape 优先级：调色板 sticky > 面板 > 清选择；
 *   5) 帮助卡片键盘 Enter 打开规则提示窗；成就列表 → 详情 → 返回；
 *   6) 暗色主题；
 *   7) 存档：UI 导出 JSON 字段（version/solved/bestLen/circuits/achievements/lastId）、
 *      Save.clean 导入清洗、非法存档导入只提示不崩；
 *   8) 目标焊盘在 1440×900 / 390×844 / 320×640 完整可见（含 y=640 远目标、105 字长目标）；
 *   9) 320×640 两行 topbar：目标整行、无横向溢出、工具组与关卡号/目标不重叠、移动端帮助按钮可见；
 *  10) dist 构建产物：脚本/样式表清单（含顺序）与源码一致、递归覆盖 mm/ 子目录，
 *      所有引用文件与源码同尺寸，file:// 打开首关能放置→连线→通关（与源码行为一致）。
 *
 * 截图全部写入 .research/shots-qa/。
 * 运行前先 `npm run build:toy`（dist 检查需要）。
 */
const fs = require('fs');
const path = require('path');
const { runTest, ROOT, RESEARCH, fileUrl } = require('./lib/browser');
const { ok, equal, between, matches } = require('./lib/expect');

const SHOT_DIR = path.join(RESEARCH, 'shots-qa');

/* 页面侧几何/焦点小工具，注入到 window.__qa；每次 Page.navigate 后要重新注入。 */
const HELPERS = `(function(){
  window.__qa = {
    rect: function(sel){
      var el = typeof sel === 'string' ? document.querySelector(sel) : sel;
      if (!el) return null;
      var r = el.getBoundingClientRect();
      return {left:r.left, top:r.top, right:r.right, bottom:r.bottom, width:r.width, height:r.height};
    },
    center: function(sel){
      var r = this.rect(sel);
      return r ? {x:(r.left+r.right)/2, y:(r.top+r.bottom)/2} : null;
    },
    overlap: function(a,b){
      if (!a || !b) return 0;
      var w = Math.min(a.right,b.right) - Math.max(a.left,b.left);
      var h = Math.min(a.bottom,b.bottom) - Math.max(a.top,b.top);
      return (w > 0 && h > 0) ? w*h : 0;
    },
    inside: function(inner, outer, tol){
      tol = tol === undefined ? 0.6 : tol;
      return !!inner && !!outer &&
        inner.left >= outer.left - tol && inner.top >= outer.top - tol &&
        inner.right <= outer.right + tol && inner.bottom <= outer.bottom + tol;
    },
    visible: function(sel){
      var el = document.querySelector(sel);
      if (!el) return false;
      var r = el.getBoundingClientRect();
      var cs = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' &&
        cs.display !== 'none' && parseFloat(cs.opacity) > 0.05;
    },
    z: function(sel){
      var el = document.querySelector(sel);
      return el ? (parseInt(getComputedStyle(el).zIndex, 10) || 0) : 0;
    },
    active: function(){
      var a = document.activeElement;
      var sheet = document.getElementById('sheet');
      return {tag:a && a.tagName, id:a && a.id, cls:(a && a.className) || '',
              dataLevel:a && a.getAttribute ? a.getAttribute('data-level') : null,
              inSheet:!!(a && sheet && sheet.contains(a))};
    },
    inerts: function(){
      return ['.topbar','.stage','.tray'].map(function(sel){
        var el = document.querySelector(sel);
        return !!(el && el.hasAttribute('inert'));
      });
    }
  };
  return true;
})()`;

const install = (page) => page.js(HELPERS);

async function refresh(ms) {
  // 仅用于等待 CSS 过渡/动画稳定；不是断言。
  await new Promise((r) => setTimeout(r, ms));
}

async function solveFirstLevel(page) {
  await page.js('window.RSL.APP.loadLevel(0)');
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-01"');
  await page.js('document.querySelector(".tile").click()');
  await page.waitFor('document.querySelectorAll(".node").length === 2');
  await refresh(380); /* 入场动画结束后端口 rect 才稳定 */
  const ports = await page.js(`(function(){
    var a=window.__qa.center('.node[data-kind="axiom"] .port-out');
    var b=window.__qa.center('.node.is-target .port-in');
    return a && b ? {a:a,b:b} : null;
  })()`);
  ok(ports, '首关：公理出端口与目标入端口都存在');
  await page.mouse.drag({ x: ports.a.x, y: ports.a.y }, { x: ports.b.x, y: ports.b.y }, { steps: 4 });
  await page.waitFor('document.querySelectorAll(".wire").length >= 1');
  equal(await page.js('document.querySelectorAll(".wire").length'), 1, '首关：拖拽端口生成 1 条导线');
  equal(await page.js('document.querySelector(".node.is-target").dataset.state'), 'complete', '首关：目标节点状态 complete');
  await page.js('document.getElementById("checkBtn").click()');
  await page.waitFor('!!document.querySelector(".win")');
  ok(await page.js('!!document.querySelector(".win")'), '首关：校验后出现通关面板');
}

async function measureTarget(page, levelId) {
  await page.js(`(function(){
    var app=window.RSL.APP;
    app.state.forceUnlock=true;
    var i=app.state.levels.findIndex(function(l){return l.id===${JSON.stringify(levelId)};});
    if (i >= 0) app.loadLevel(i);
    return i;
  })()`);
  await page.waitFor('window.RSL.APP.state.level.id === ' + JSON.stringify(levelId));
  return page.js(`(function(){
    var t=window.__qa.rect('.node.is-target');
    var b=window.__qa.rect('#board');
    return {level:window.RSL.APP.state.level.id, target:t, board:b, inside:window.__qa.inside(t,b)};
  })()`);
}

runTest('acceptance', async ({ openPage }) => {
  /* ------------------------------------------------------------------
   * A. dist 构建产物的静态清单（先跑 npm run build:toy）
   * ------------------------------------------------------------------ */
  const distDir = path.join(ROOT, 'dist');
  const distIndexPath = path.join(distDir, 'index.html');
  ok(fs.existsSync(distIndexPath), 'dist/index.html 存在（先运行 npm run build:toy）');

  /* 从 index.html 提取运行时引用；脚本与样式表各自保持文档顺序。 */
  const scriptsOf = (html) => Array.from(html.matchAll(/<script src="src\/([^"]+)"><\/script>/g)).map((m) => m[1]);
  const stylesOf = (html) => Array.from(html.matchAll(/<link rel="stylesheet" href="src\/([^"]+)">/g)).map((m) => m[1]);

  const srcIndex = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const distIndex = fs.readFileSync(distIndexPath, 'utf8');
  const srcScripts = scriptsOf(srcIndex);
  const distScripts = scriptsOf(distIndex);
  const srcStyles = stylesOf(srcIndex);
  const distStyles = stylesOf(distIndex);

  equal(distScripts, srcScripts, 'dist/index.html 的脚本列表（含顺序）与源码 index.html 完全一致');
  equal(distStyles, srcStyles, 'dist/index.html 的样式表列表（含顺序）与源码 index.html 完全一致');
  equal(new Set(srcScripts).size, srcScripts.length, 'index.html 不应重复引用同一脚本');
  equal(new Set(srcStyles).size, srcStyles.length, 'index.html 不应重复引用同一样式表');

  /* 递归收集目录下的运行时 js/css：mm/ 是子目录，只读顶层会漏掉 6 个脚本与 mm.css。 */
  const runtimeFilesOf = (dir, base) => {
    const out = [];
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const rel = base ? base + '/' + name : name;
      if (fs.statSync(full).isDirectory()) out.push(...runtimeFilesOf(full, rel));
      else if (/\.(js|css)$/i.test(name)) out.push(rel);
    }
    return out.sort();
  };

  const srcDir = path.join(ROOT, 'src');
  const distSrcDir = path.join(distDir, 'src');
  const srcRuntime = runtimeFilesOf(srcDir);
  const distRuntime = runtimeFilesOf(distSrcDir);
  const referenced = srcScripts.concat(srcStyles).sort();

  equal(distRuntime, referenced, 'dist/src 的运行时 js/css 与 index.html 引用一一对应（含 mm/ 子目录）');
  for (const rel of distRuntime) {
    ok(srcRuntime.includes(rel), 'dist/src/' + rel + ' 应存在于源码 src/（dist 是源码的完整拷贝）');
  }
  equal(
    referenced.filter((rel) => !distRuntime.includes(rel)),
    [],
    'index.html 引用的运行时文件必须全部出现在 dist/src 中'
  );
  for (const rel of referenced) {
    ok(srcRuntime.includes(rel), 'index.html 引用的 src/' + rel + ' 必须存在于源码目录');
    const a = fs.statSync(path.join(distSrcDir, rel)).size;
    const b = fs.statSync(path.join(srcDir, rel)).size;
    equal(a, b, 'dist/src/' + rel + ' 与源码同尺寸（拷贝完整）');
  }
  equal(
    distRuntime.filter((f) => f.endsWith('.js')).length,
    srcScripts.length,
    'dist/src 的 js 数量与 index.html 的脚本引用数一致'
  );
  equal(distRuntime.length, referenced.length, 'dist/src 的运行时文件总数与 index.html 引用总数一致');

  const page = await openPage({
    width: 1440,
    height: 900,
    shotDir: SHOT_DIR,
    args: ['--autoplay-policy=no-user-gesture-required']
  });
  await page.ready();
  await install(page);

  /* ------------------------------------------------------------------
   * B. 桌面：首关真实操作 → 通关 → toast
   * ------------------------------------------------------------------ */
  await page.shot('01-desktop');
  await solveFirstLevel(page);
  const winState = await page.js(`(function(){
    return {
      overlay: !document.getElementById('overlay').hidden,
      inerts: window.__qa.inerts(),
      winFormula: (document.querySelector('.win-formula') || {}).textContent || '',
      goal: window.__qa.rect('#goal')
    };
  })()`);
  equal(winState.overlay, true, '通关面板打开时遮罩可见');
  equal(winState.inerts, [true, true, true], '通关面板打开时 topbar/stage/tray 均 inert');
  ok(winState.winFormula.replace(/\s+/g, '').length > 0, '通关面板显示目标公式');

  /* toast 在通关 overlay 之上：z-index 更大、且不遮目标公式 */
  await page.js('window.RSL.UI.toast("演示提示")');
  await refresh(180);
  const toastWin = await page.js(`(function(){
    var t=window.__qa.rect('#toast'), g=window.__qa.rect('#goal');
    return {on:document.getElementById('toast').classList.contains('is-on'),
            visible:window.__qa.visible('#toast'),
            overlapGoal:window.__qa.overlap(t,g),
            toastZ:window.__qa.z('#toast'), overlayZ:window.__qa.z('#overlay'),
            topbarBottom:window.__qa.rect('.topbar').bottom, toastTop:t.top};
  })()`);
  equal(toastWin.on, true, '通关时 toast 处于显示状态');
  equal(toastWin.visible, true, '通关时 toast 实际可见（未被 overlay 盖住）');
  ok(toastWin.toastZ > toastWin.overlayZ, 'toast z-index(' + toastWin.toastZ + ') 高于 overlay(' + toastWin.overlayZ + ')');
  equal(toastWin.overlapGoal, 0, 'toast 与目标公式区域没有重叠');
  ok(toastWin.toastTop >= toastWin.topbarBottom - 0.5, 'toast 位于顶栏下方（top ' + toastWin.toastTop.toFixed(1) + ' ≥ ' + toastWin.topbarBottom.toFixed(1) + '）');
  await page.shot('02-win-toast');

  await page.js('document.querySelector("[data-close]").click()');
  await page.waitFor('document.getElementById("overlay").hidden');
  equal((await page.js('window.__qa.inerts()')), [false, false, false], '关闭通关面板后移除 inert');

  /* 常规 toast 位置 */
  await page.js('window.RSL.UI.toast("提示")');
  await refresh(180);
  const toast = await page.js(`(function(){
    var t=window.__qa.rect('#toast'), g=window.__qa.rect('#goal'), p=window.__qa.rect('.progress');
    return {toast:t, goal:g, progress:p, overlap:window.__qa.overlap(t,g), z:window.__qa.z('#toast'),
            visible:window.__qa.visible('#toast')};
  })()`);
  equal(toast.visible, true, 'toast 可见');
  equal(toast.overlap, 0, 'toast 不遮目标公式');
  ok(toast.toast.top >= toast.progress.bottom - 0.5, 'toast 在进度条/顶栏之下');

  /* ------------------------------------------------------------------
   * C. 焦点陷阱（选关面板）
   * ------------------------------------------------------------------ */
  const levelBtn = await page.js('window.__qa.center("#levelBtn")');
  await page.mouse.click(levelBtn.x, levelBtn.y);
  await page.waitFor('!document.getElementById("overlay").hidden');
  equal(await page.js('(function(){return !document.getElementById("overlay").hidden;})()'), true, '点关卡号打开选关面板');
  equal(await page.js('window.__qa.inerts()'), [true, true, true], '选关面板打开时背景 inert');
  const initialFocus = await page.js('window.__qa.active()');
  equal(initialFocus.inSheet, true, '面板打开后焦点落在面板内（' + initialFocus.tag + '.' + initialFocus.cls + '）');

  const focusables = await page.js(`(function(){
    var sheet=document.getElementById('sheet');
    var list=Array.prototype.slice.call(sheet.querySelectorAll(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
    )).filter(function(el){ return el.tabIndex >= 0; });
    return {count:list.length, first:list[0] && list[0].className, last:list[list.length-1] && list[list.length-1].className};
  })()`);
  ok(focusables.count >= 3, '选关面板内可聚焦元素 ≥ 3（实际 ' + focusables.count + '）');

  let escaped = 0;
  const seen = new Set();
  for (let i = 0; i < 40; i += 1) {
    await page.key('Tab', { settleMs: 12 });
    const active = await page.js('window.__qa.active()');
    if (!active.inSheet) escaped += 1;
    seen.add(active.cls + (active.dataLevel === null ? '' : '#' + active.dataLevel));
  }
  equal(escaped, 0, '连续 40 次 Tab 焦点都没有逃出面板');
  ok(seen.size >= 3, 'Tab 确实在多个可聚焦元素间移动（' + seen.size + ' 个不同落点）');

  /* 末位 Tab 回绕到首位；首位 Shift+Tab 回绕到末位 */
  await page.js(`(function(){
    var sheet=document.getElementById('sheet');
    var list=Array.prototype.slice.call(sheet.querySelectorAll(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
    )).filter(function(el){ return el.tabIndex >= 0; });
    list[list.length-1].focus();
    return true;
  })()`);
  await page.key('Tab', { settleMs: 20 });
  const wrapForward = await page.js('window.__qa.active()');
  ok(wrapForward.inSheet && /sheet-x/.test(wrapForward.cls), '末位 Tab 回绕到面板首个可聚焦元素（关闭按钮）');

  await page.js('document.querySelector(".sheet-x").focus()');
  await page.key('Tab', { modifiers: 8, settleMs: 20 }); /* Shift+Tab */
  const wrapBackward = await page.js('window.__qa.active()');
  ok(wrapBackward.inSheet && /level-cell/.test(wrapBackward.cls), '首位 Shift+Tab 回绕到面板末个可聚焦元素（关卡格）');

  /* focusin 兜底：外部元素被程序聚焦时，焦点被拉回面板 */
  await page.js('(function(){var b=document.createElement("button");b.id="__qa_outside";document.body.appendChild(b);b.focus();return true;})()');
  await refresh(80);
  const fallout = await page.js('window.__qa.active()');
  equal(fallout.inSheet, true, 'focusin 兜底把逃到面板外的焦点拉回面板');
  await page.js('(function(){var b=document.getElementById("__qa_outside");if(b)b.remove();return true;})()');

  /* Escape 关闭 → 焦点归还触发按钮、inert 移除 */
  await page.key('Escape');
  await page.waitFor('document.getElementById("overlay").hidden');
  equal((await page.js('window.__qa.inerts()')), [false, false, false], 'Escape 关闭面板后移除 inert');
  equal((await page.js('window.__qa.active()')).id, 'levelBtn', 'Escape 关闭面板后焦点归还触发按钮 #levelBtn');
  await page.shot('03-focus-levels');

  /* ------------------------------------------------------------------
   * D. 帮助卡片 Enter → 规则提示窗 + 焦点归还
   * ------------------------------------------------------------------ */
  const helpBtn = await page.js('window.__qa.center("#helpBtn")');
  await page.mouse.click(helpBtn.x, helpBtn.y);
  await page.waitFor('!document.getElementById("overlay").hidden');
  ok(await page.js('document.querySelectorAll(".help-card").length === 8'), '帮助面板有 8 张规则卡片');
  const helpDesign = await page.js(`(function(){
    return {
      heads: document.querySelectorAll('.sheet-head').length,
      steps: document.querySelectorAll('.help-step').length,
      stepText: Array.prototype.map.call(document.querySelectorAll('.help-step b'), function(b){ return b.textContent; }),
      groups: document.querySelectorAll('.help-group').length,
      cards: document.querySelectorAll('.help-card').length,
      save: document.querySelectorAll('.save-btn').length
    };
  })()`);
  equal(helpDesign.heads, 0, '帮助面板不再有标题文字');
  equal(helpDesign.steps, 3, '帮助三步只保留图标');
  equal(helpDesign.stepText.length, 0, '帮助步骤没有文字标签');
  equal(helpDesign.groups, 0, '帮助面板不再有分组标题文字');
  equal(helpDesign.cards, 8, '帮助面板保留 8 张规则卡');
  equal(helpDesign.save, 2, '帮助面板保留两个图标式存档按钮');
  await page.js('document.querySelector(".help-card").focus()');
  await page.key('Enter');
  await page.waitFor('!document.getElementById("coachPop").hidden');
  const coach = await page.js(`(function(){
    var p=document.getElementById('coachPop');
    return {hidden:p.hidden, flow:!!p.querySelector('.coach-flow'),
            overlayHidden:document.getElementById('overlay').hidden,
            activeId:document.activeElement.id, activeCls:document.activeElement.className};
  })()`);
  equal(coach.flow, true, '帮助卡片 Enter 打开规则提示窗（含 .coach-flow）');
  equal(coach.overlayHidden, true, '打开提示窗时帮助面板已关闭');
  equal(coach.activeId, 'helpBtn', '关闭帮助面板后焦点归还触发按钮 #helpBtn');
  await page.shot('04-help-coach');
  await page.js('document.getElementById("coachPop").click()');
  await page.waitFor('document.getElementById("coachPop").hidden');

  /* ------------------------------------------------------------------
   * E. 成就：列表 → 详情 → 返回
   * ------------------------------------------------------------------ */
  const achvBtn = await page.js('window.__qa.center("#achvBtn")');
  await page.mouse.click(achvBtn.x, achvBtn.y);
  await page.waitFor('document.querySelectorAll(".achv").length === 20');
  const achvList = await page.js(`(function(){
    return {total:document.querySelectorAll('.achv').length,
            on:document.querySelectorAll('.achv.is-on').length,
            names:document.querySelectorAll('.achv-name').length,
            heads:document.querySelectorAll('.sheet-head').length,
            countText:(document.querySelector('.achv-count')||{}).textContent||''};
  })()`);
  equal(achvList.total, 20, '成就面板 20 项');
  ok(achvList.on >= 1, '首关通关后至少 1 个成就点亮（实际 ' + achvList.on + '）');
  equal(achvList.heads, 0, '成就面板不再有标题文字');
  equal(achvList.names, 0, '成就卡片不写名称（只保留图标）');
  equal(achvList.countText, '', '成就面板不再显示计数文字');
  await page.js('document.querySelector(".achv.is-on").click()');
  await page.waitFor('!!document.querySelector(".achv-detail")');
  equal(await page.js('(document.querySelector(".achv-detail h2")||{}).textContent'), '通电', '首个成就详情标题为“通电”');
  await page.shot('05-achievement-detail');
  await page.js('document.querySelector("[data-back]").click()');
  await page.waitFor('document.querySelectorAll(".achv").length === 20');
  ok(await page.js('!!document.querySelector(".achv-grid")'), '成就详情返回后回到列表');
  await page.key('Escape');
  await page.waitFor('document.getElementById("overlay").hidden');
  equal((await page.js('window.__qa.active()')).id, 'achvBtn', 'Escape 关闭成就面板后焦点归还 #achvBtn');

  /* ------------------------------------------------------------------
   * F. Escape 优先级（调色板 sticky > 面板 > 清选择）
   * ------------------------------------------------------------------ */
  await page.js('window.RSL.APP.loadLevel(1)');
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-02"');
  const tile = await page.js('window.__qa.center("#tray .tile")');
  await page.mouse.click(tile.x, tile.y);
  await page.waitFor('!!document.querySelector(".module-ghost")');
  equal(await page.js('!!document.querySelector(".module-ghost")'), true, '调色板进入 sticky 放置态');
  await page.key('Escape');
  await page.waitFor('!document.querySelector(".module-ghost")');
  equal(await page.js('!!document.querySelector(".module-ghost")'), false, 'Escape 第一优先级：取消 sticky 调色板');

  /* sticky 同时面板打开：第一次 Escape 只取消调色板，第二次才关面板 */
  await page.mouse.click(tile.x, tile.y);
  await page.waitFor('!!document.querySelector(".module-ghost")');
  await page.js('window.RSL.APP.openLevels()');
  await page.waitFor('!document.getElementById("overlay").hidden');
  const levelsDesign = await page.js(`(function(){
    return {
      heads: document.querySelectorAll('.sheet-head').length,
      glyphs: document.querySelectorAll('.band-glyph').length,
      names: document.querySelectorAll('.band-name').length,
      titles: document.querySelectorAll('.chapter-title').length,
      counts: Array.prototype.map.call(document.querySelectorAll('.chapter-count'), function(c){ return c.textContent; }),
      stars: document.querySelectorAll('.level-cell.is-challenge').length
    };
  })()`);
  equal(levelsDesign.heads, 0, '选关面板不再有标题文字');
  equal(levelsDesign.glyphs, 8, '四章各两个分带图标（基础/挑战）');
  equal(levelsDesign.names, 0, '分带不再写“基础/挑战”文字');
  equal(levelsDesign.titles, 0, '章节不再写中文标题（只留罗马数字）');
  ok(levelsDesign.counts.every(function (c) { return /^\d+\s*\/\s*72$/.test(c); }), '章节计数保留为数字（每章 72 关）');
  equal(levelsDesign.stars, 0, '关卡格不再重复星标（挑战段由分带表达）');
  equal(await page.js('!!document.querySelector(".module-ghost")'), true, '程序打开面板时 sticky ghost 仍在');
  await page.key('Escape');
  await page.waitFor('!document.querySelector(".module-ghost")');
  ok(await page.js('!document.querySelector(".module-ghost") && !document.getElementById("overlay").hidden'), 'Escape 优先取消调色板，面板保持打开');
  await page.key('Escape');
  await page.waitFor('document.getElementById("overlay").hidden');
  equal(await page.js('document.getElementById("overlay").hidden'), true, '第二次 Escape 才关闭面板');

  /* 清选择 */
  await page.js('window.RSL.APP.loadLevel(0)');
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-01"');
  const nodesBefore = await page.js('document.querySelectorAll(".node").length');
  await page.js('document.querySelector(".tile").click()');
  await page.waitFor('document.querySelectorAll(".node").length === ' + (nodesBefore + 1));
  await refresh(380);
  const moduleNode = await page.js('window.__qa.center(".node[data-kind=\\"axiom\\"]")');
  await page.mouse.click(moduleNode.x, moduleNode.y);
  await page.waitFor('!!document.querySelector(".node[data-selected=\\"true\\"]")');
  equal(await page.js('!!document.querySelector(".node[data-selected=\\"true\\"]")'), true, '点击模块产生选中态');
  await page.key('Escape');
  await page.waitFor('!document.querySelector(".node[data-selected=\\"true\\"]")');
  equal(await page.js('window.RSL.APP.state.board.selectedNode'), null, 'Escape 清空节点选择');
  equal(await page.js('window.RSL.APP.state.board.selectedNodes.length'), 0, 'Escape 清空多选集合');

  /* ------------------------------------------------------------------
   * F1. 拖回下边栏删除模块 / 拖动已接线的输入端拆线
   * ------------------------------------------------------------------ */
  await page.js('window.RSL.APP.state.forceUnlock = true');
  await page.js('window.RSL.APP.loadLevel(1)');
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-02"');
  await page.js('document.querySelector(".tile").click()');
  await page.waitFor('document.querySelectorAll(".node").length === 2');
  const dragDelete = await page.js(`(function(){
    var b=window.RSL.APP.state.board;
    var n=b.items.find(function(x){return x.kind!=='target'});
    var el=b.nodes.querySelector('[data-id="'+n.id+'"]');
    var nr=el.getBoundingClientRect(), tr=document.getElementById('tray').getBoundingClientRect();
    return {from:{x:nr.left+nr.width/2,y:nr.top+40}, to:{x:tr.left+tr.width/2,y:tr.top+tr.height/2}};
  })()`);
  await page.mouse.down(dragDelete.from.x, dragDelete.from.y);
  await page.mouse.move(dragDelete.from.x, dragDelete.from.y + 40);
  await page.mouse.move(dragDelete.to.x, dragDelete.to.y);
  await page.sleep(120);
  equal(await page.js('document.getElementById("tray").classList.contains("is-drop-target")'), true, '模块拖到下边栏时删除区高亮');
  await page.mouse.up(dragDelete.to.x, dragDelete.to.y);
  await page.sleep(350);
  equal(await page.js('document.querySelectorAll(".node:not(.is-target)").length'), 0, '拖回下边栏的模块被删除');
  equal(await page.js('document.getElementById("tray").classList.contains("is-drop-target")'), false, '松手后删除区高亮消失');

  await page.js('window.RSL.APP.loadLevel(1)');
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-02"');
  await page.js('document.querySelector(".tile").click()');
  await page.waitFor('document.querySelectorAll(".node").length === 2');
  const wirePorts = await page.js(`(function(){
    var o=document.querySelector('.node:not(.is-target) .port-out');
    var i=document.querySelector('.node.is-target .port-in');
    var a=o.getBoundingClientRect(), b=i.getBoundingClientRect();
    return {o:{x:a.left+a.width/2,y:a.top+a.height/2}, i:{x:b.left+b.width/2,y:b.top+b.height/2}};
  })()`);
  await page.mouse.drag(wirePorts.o, wirePorts.i, { steps: 6 });
  await page.waitFor('document.querySelectorAll(".wire").length === 1');
  const detachInfo = await page.js(`(function(){
    var i=document.querySelector('.node.is-target .port-in');
    var a=i.getBoundingClientRect();
    var b=document.getElementById('board').getBoundingClientRect();
    return {from:{x:a.left+a.width/2,y:a.top+a.height/2}, to:{x:b.left+90,y:b.top+90}};
  })()`);
  await page.mouse.drag(detachInfo.from, detachInfo.to, { steps: 8 });
  await page.sleep(300);
  equal(await page.js('document.querySelectorAll(".wire").length'), 0, '从已接线的输入端拖走会拆掉导线');
  equal(await page.js('window.RSL.APP.state.board.edges.length'), 0, '拆线后电路不再保留该连接');
  ok(await page.js('document.querySelector(".node.is-target").dataset.state !== "complete"'), '拆线后目标回到未完成状态');

  /* 自动放置：高 S 元件不能互相压住；加组变高后也不重叠 */
  const placement = await page.js(`(function(){
    var b=window.RSL.APP.state.board;
    var ids=[];
    for(var i=0;i<5;i++) ids.push(b.addNode('subst',{}, {x:320,y:120}).id);
    function overlaps(){
      var n=0;
      var rs=b.items.map(function(x){var el=b.nodes.querySelector('[data-id="'+x.id+'"]');return {x:x.x,y:x.y,w:x.kind==='target'?160:232,h:el?el.offsetHeight:96};});
      for(var i=0;i<rs.length;i++)for(var j=i+1;j<rs.length;j++){var A=rs[i],B=rs[j];if(A.x<B.x+B.w&&A.x+A.w>B.x&&A.y<B.y+B.h&&A.y+A.h>B.y)n++;}
      return n;
    }
    var before=overlaps();
    b.updateConfig(ids[0],{groups:4});
    return {before:before, after:overlaps(), tall:b.nodes.querySelector('[data-id="'+ids[0]+'"]').offsetHeight};
  })()`);
  equal(placement.before, 0, '连续添加 5 个 S 元件时自动避让，无节点重叠');
  equal(placement.after, 0, 'S 元件加满 4 组变高后自动让位，不压住邻居');
  ok(placement.tall > 300, 'S 元件 5 组时高度按端口数增长（' + placement.tall + 'px）');

  /* 世界坐标可以为负：先把画布平移到原点上方，仍能放置而不是提示“放不下” */
  await page.js('window.RSL.APP.loadLevel(1)');
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-02"');
  await page.js(`(function(){
    var b=window.RSL.APP.state.board;
    b.addNode('axiom',{}, {x:0,y:0});
    b.setView(20,300,1);
  })()`);
  await page.sleep(250);
  const negativeDrop = await page.js(`(function(){
    var t=document.querySelector('.tile');
    var br=document.getElementById('board').getBoundingClientRect();
    var tr=t.getBoundingClientRect();
    return {from:{x:tr.left+tr.width/2,y:tr.top+tr.height/2}, to:{x:br.left+160,y:br.top+20}};
  })()`);
  const nodesBeforeNegative = await page.js('document.querySelectorAll(".node:not(.is-target)").length');
  await page.mouse.drag(negativeDrop.from, negativeDrop.to, { steps: 8 });
  await page.sleep(400);
  const negativeAfter = await page.js(`(function(){
    var b=window.RSL.APP.state.board;
    var ys=b.items.filter(function(n){return n.kind!=='target';}).map(function(n){return n.y;});
    return {count:ys.length, minY:Math.min.apply(null,ys), toast:document.getElementById('toast').textContent,
            toastOn:document.getElementById('toast').classList.contains('is-on')};
  })()`);
  equal(negativeAfter.count, nodesBeforeNegative + 1, '画布平移到原点上方后仍能放下模块');
  ok(negativeAfter.minY < 0, '模块可以获得负的世界 y 坐标（实际 ' + negativeAfter.minY + '）');
  equal(negativeAfter.toast.indexOf('放不下'), -1, '放置成功时不再提示“放不下”');
  equal(negativeAfter.toastOn, false, '放置成功后没有遗留错误 toast');

  /* ------------------------------------------------------------------
   * F2. S 元件：最多 4 组额外代换（共 5 组），每组橙原子 + 蓝公式
   * ------------------------------------------------------------------ */
  await page.js('window.RSL.APP.state.forceUnlock = true');
  await page.js(`(function(){
    var st=window.RSL.APP.state;
    var i=st.levels.findIndex(function(l){return l.id==='CH1-04';});
    window.RSL.APP.loadLevel(i);
  })()`);
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-04"');
  await page.js('try{window.RSL.UI.els.coachPop.click();}catch(e){}');
  await page.js('document.querySelector(".tile[data-key=\\"subst\\"]").click()');
  await page.waitFor('!!document.querySelector(".node[data-kind=\\"subst\\"]")');
  await page.js(`(function(){
    var b=window.RSL.APP.state.board;
    var n=b.items.find(function(x){return x.kind==='subst';});
    b.select(n.id);
  })()`);
  const substGroups = await page.js(`(function(){
    for (var i=0;i<4;i++) {
      var plus=document.querySelector('.opt[data-config="dual"]');
      if (plus) plus.click();
    }
    var ports=Array.prototype.map.call(document.querySelectorAll('.node[data-kind="subst"] .port-in'), function(p){
      return {id:p.dataset.port, role:p.dataset.role};
    });
    return {
      count: ports.length,
      atoms: ports.filter(function(p){return p.role==='atom';}).length,
      formulas: ports.filter(function(p){return p.role==='formula';}).length,
      assertion: ports.filter(function(p){return p.role==='assertion';}).length,
      hidden: document.getElementById('popover').hidden,
      last: ports.map(function(p){return p.id;}).slice(-2)
    };
  })()`);
  equal(substGroups.count, 11, 'S 元件最多 1+4 组：共 11 个输入端口');
  equal(substGroups.atoms, 5, '5 组原子端口都是橙色角色');
  equal(substGroups.formulas, 5, '5 组公式端口都是蓝色角色');
  equal(substGroups.assertion, 1, '断言端口仍为墨色角色');
  equal(substGroups.last, ['atom5', 'formula5'], '第 5 组端口是 atom5/formula5');
  equal(substGroups.hidden, false, '加满 4 组后浮条保留并显示减号');

  /* 减号：有 2 组以上时才出现；减少一组会一并移除接在该组端口上的导线 */
  const minusUI = await page.js(`(function(){
    return {minus:!!document.querySelector('.opt[data-config="removeGroup"]'), plus:!!document.querySelector('.opt[data-config="dual"]')};
  })()`);
  equal(minusUI.minus, true, '有 2 组以上代换时出现减号');
  equal(minusUI.plus, false, '加满 4 组后加号隐藏');
  await page.js('document.querySelector(".tile[data-key=\\"atom\\"]").click()');
  await page.waitFor('!!document.querySelector(".node[data-kind=\\"atom\\"]")');
  const pruneBefore = await page.js(`(function(){
    var b=window.RSL.APP.state.board;
    var s=b.items.find(function(x){return x.kind==='subst'});
    var a=b.items.find(function(x){return x.kind==='atom'});
    b.connect(a.id,'out',s.id,'atom5');
    b.select(s.id);
    return {edges:b.edges.length, ports:document.querySelectorAll('.node[data-kind="subst"] .port-in').length};
  })()`);
  equal(pruneBefore.edges, 1, '先把一条线接到第 5 组端口');
  await page.js('document.querySelector(".opt[data-config=\\"removeGroup\\"]").click()');
  await page.sleep(300);
  const pruneAfter = await page.js(`(function(){
    var b=window.RSL.APP.state.board;
    return {edges:b.edges.length, ports:document.querySelectorAll('.node[data-kind="subst"] .port-in').length,
            minus:!!document.querySelector('.opt[data-config="removeGroup"]'),
            plus:!!document.querySelector('.opt[data-config="dual"]')};
  })()`);
  equal(pruneAfter.ports, 9, '减一组后剩 9 个输入端口（1 断言 + 4 组）');
  equal(pruneAfter.edges, 0, '被移除组的连线一并删除');
  equal(pruneAfter.minus, true, '还剩 2 组以上时减号保留');
  equal(pruneAfter.plus, true, '少于 4 组时加号重新出现');
  for (let i = 0; i < 3; i += 1) {
    const has = await page.js('!!document.querySelector(".opt[data-config=\\"removeGroup\\"]")');
    if (has) await page.js('document.querySelector(".opt[data-config=\\"removeGroup\\"]").click()');
    await page.sleep(150);
  }
  const zeroGroups = await page.js(`({
    ports:document.querySelectorAll('.node[data-kind="subst"] .port-in').length,
    minus:!!document.querySelector('.opt[data-config="removeGroup"]'),
    plus:!!document.querySelector('.opt[data-config="dual"]')
  })`);
  equal(zeroGroups.ports, 3, '减到只剩基础 1 组时是 3 个输入端口');
  equal(zeroGroups.minus, false, '只剩 1 组时代换减号隐藏');
  equal(zeroGroups.plus, true, '只剩 1 组时加号仍可继续加组');

  /* 命题变元只有 14 个：PQRSTUVWXYZABC；U 仍可选 */
  await page.js(`(function(){
    var st=window.RSL.APP.state;
    var i=st.levels.findIndex(function(l){return l.id==='CH1-15';});
    window.RSL.APP.loadLevel(i);
  })()`);
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-15"');
  await page.js('try{window.RSL.UI.els.coachPop.click();}catch(e){}');
  await page.js('document.querySelector(".tile[data-key=\\"atom\\"]").click()');
  await page.waitFor('!!document.querySelector(".node[data-kind=\\"atom\\"]")');
  await page.js(`(function(){
    var b=window.RSL.APP.state.board;
    var n=b.items.find(function(x){return x.kind==='atom';});
    b.select(n.id);
  })()`);
  const atomOptions = await page.js(`(function(){
    var opts=Array.prototype.map.call(document.querySelectorAll('.opt[data-config="name"]'),function(o){return o.dataset.value;});
    return {count:opts.length, hasU:opts.indexOf('U')>=0, head:opts.slice(0,5), target:window.RSL.APP.state.level.target};
  })()`);
  equal(atomOptions.count, 14, '命题变元选项正好 14 个');
  equal(atomOptions.hasU, true, '命题 U 能出现在原子选项里');
  equal(atomOptions.head.slice(0, 5).join(''), 'PQRST', '原子选项固定以 P/Q/R/S/T 开头');
  const atomPicker = await page.js(`(function(){
    var p=document.getElementById('popover');
    var tops={};
    Array.prototype.forEach.call(document.querySelectorAll('.letter-grid .opt'),function(o){tops[Math.round(o.getBoundingClientRect().top)]=true;});
    return {overflow:p.scrollWidth>p.clientWidth, rows:Object.keys(tops).length, width:Math.round(p.getBoundingClientRect().width)};
  })()`);
  equal(atomPicker.overflow, false, '26 个原子选项换行成网格，不出现横向溢出');
  ok(atomPicker.rows >= 2, '原子选项分成多行显示（实际 ' + atomPicker.rows + ' 行）');
  await page.js('document.querySelector(".opt[data-value=\\"U\\"]").click()');
  await page.sleep(250);
  const atomU = await page.js(`(function(){
    var b=window.RSL.APP.state.board;
    var n=b.items.find(function(x){return x.kind==='atom';});
    return {name:n.config.name, formula:b.nodes.querySelector('[data-id="'+n.id+'"] .node-formula').textContent};
  })()`);
  equal(atomU.name, 'U', '点 U 后原子模块配置为 U');
  equal(atomU.formula, 'U', '原子模块输出公式 U');

  const multiSubst = await page.js(`(function(){
    var Engine=window.RSL.Engine, L=window.RSL.Logic;
    var nodes=[
      {id:'ax',kind:'axiom',config:{axiomId:'ax-2'}},
      {id:'p',kind:'atom',config:{name:'P'}},
      {id:'q',kind:'atom',config:{name:'Q'}},
      {id:'r',kind:'atom',config:{name:'R'}},
      {id:'s',kind:'subst',config:{groups:2}}
    ];
    var edges=[
      {from:{node:'ax',port:'out'},to:{node:'s',port:'assertion'}},
      {from:{node:'p',port:'out'},to:{node:'s',port:'atom'}},
      {from:{node:'q',port:'out'},to:{node:'s',port:'formula'}},
      {from:{node:'q',port:'out'},to:{node:'s',port:'atom2'}},
      {from:{node:'r',port:'out'},to:{node:'s',port:'formula2'}},
      {from:{node:'r',port:'out'},to:{node:'s',port:'atom3'}},
      {from:{node:'p',port:'out'},to:{node:'s',port:'formula3'}}
    ];
    var r=Engine.evaluate({}, nodes, edges);
    var res=r.results['s'];
    return {state:res.state, eq:res.ast ? L.eq(res.ast, L.parse('(Q→(R→P))→((Q→R)→(Q→P))')) : false};
  })()`);
  equal(multiSubst.state, 'valid', '引擎可以一次应用 3 组代入');
  equal(multiSubst.eq, true, '多组代入结果与逐组替换一致');

  /* ------------------------------------------------------------------
   * G. 暗色主题
   * ------------------------------------------------------------------ */
  const themeBtn = await page.js('window.__qa.center("#themeBtn")');
  await page.mouse.click(themeBtn.x, themeBtn.y);
  await page.waitFor('document.documentElement.dataset.theme === "dark"');
  await refresh(300);
  const dark = await page.js(`(function(){
    var c=getComputedStyle(document.body).backgroundColor;
    var m=/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/.exec(c);
    return {theme:document.documentElement.dataset.theme, bg:c,
            avg:m ? (Number(m[1])+Number(m[2])+Number(m[3]))/3 : 255};
  })()`);
  equal(dark.theme, 'dark', '主题切到 dark');
  ok(dark.avg < 90, '暗色下页面底色足够暗（实际 ' + dark.bg + '）');
  await page.shot('06-dark');
  await page.mouse.click(themeBtn.x, themeBtn.y);
  await page.waitFor('document.documentElement.dataset.theme !== "dark"');
  await refresh(200);

  /* ------------------------------------------------------------------
   * H. 存档导出字段 + 导入清洗 + 非法导入
   * ------------------------------------------------------------------ */
  const helpBtn2 = await page.js('window.__qa.center("#helpBtn")');
  await page.mouse.click(helpBtn2.x, helpBtn2.y);
  await page.waitFor('!document.getElementById("overlay").hidden');
  equal(await page.js('document.querySelectorAll(".save-btn").length'), 2, '帮助面板有保存/加载两个存档按钮');

  const exported = await page.js(`new Promise(function(resolve){
    var captured=null;
    var origCreate=URL.createObjectURL, origClick=HTMLAnchorElement.prototype.click;
    URL.createObjectURL=function(b){ captured=b; return 'blob:qa'; };
    HTMLAnchorElement.prototype.click=function(){};
    var btn=document.querySelector('[data-save-export]');
    if(!btn){ resolve({ok:false,error:'no export button'}); return; }
    btn.click();
    URL.createObjectURL=origCreate; HTMLAnchorElement.prototype.click=origClick;
    if(!captured){ resolve({ok:false,error:'no blob captured'}); return; }
    var fr=new FileReader();
    fr.onload=function(){
      try { resolve({ok:true,data:JSON.parse(fr.result)}); }
      catch(e){ resolve({ok:false,error:String(e)}); }
    };
    fr.readAsText(captured);
  })`);
  ok(exported.ok, '点“保存”生成可解析的存档 Blob' + (exported.error ? '（' + exported.error + '）' : ''));
  const save = exported.data;
  equal(save.version, 2, '导出 JSON version=2');
  ok(Array.isArray(save.solved), '导出 JSON solved 是数组');
  ok(Array.isArray(save.achievements), '导出 JSON achievements 是数组');
  ok(Array.isArray(save.usedKinds) && Array.isArray(save.cleanWins), '导出 JSON usedKinds/cleanWins 是数组');
  ok(save.bestLen && typeof save.bestLen === 'object' && !Array.isArray(save.bestLen), '导出 JSON bestLen 是对象');
  ok(save.circuits && typeof save.circuits === 'object' && !Array.isArray(save.circuits), '导出 JSON circuits 是对象');
  ok(typeof save.lastId === 'string' || save.lastId === null, '导出 JSON lastId 是字符串或 null');
  matches(String(save.exportedAt), /^\d{4}-\d{2}-\d{2}T/, '导出 JSON 带 ISO exportedAt');
  ok(save.solved.indexOf('CH1-01') >= 0, '导出 JSON 记录了已通关的 CH1-01');
  ok(save.circuits['CH1-01'] && Array.isArray(save.circuits['CH1-01'].nodes), '导出 JSON 记录 CH1-01 的电路');
  ok(save.achievements.length >= 1, '导出 JSON 记录已解锁成就');

  const cleaned = await page.js(`(function(){
    var S=window.RSL.Save, out={};
    out.clean=S.clean({
      version:99,
      solved:['a',1,null],
      bestLen:{X:3},
      usedKinds:['subst',2],
      circuits:{ok:{nodes:[],edges:[],extra:1}, bad:{nodes:[]}},
      achievements:['a',2],
      lastId:42
    });
    try { S.clean(null); out.nullThrew=false; } catch(e){ out.nullThrew=true; }
    try { S.clean([]); out.arrThrew=false; } catch(e){ out.arrThrew=true; }
    return out;
  })()`);
  equal(cleaned.clean.version, 2, '导入清洗把 version 归一为 2');
  equal(cleaned.clean.solved, ['a'], '导入清洗过滤非字符串 solved');
  equal(cleaned.clean.circuits, { ok: { nodes: [], edges: [] } }, '导入清洗丢弃坏电路与多余字段');
  equal(cleaned.clean.lastId, null, '导入清洗把非法 lastId 变为 null');
  equal(cleaned.clean.bestLen, { X: 3 }, '导入清洗保留 bestLen 对象');
  equal([cleaned.nullThrew, cleaned.arrThrew], [true, true], '导入清洗拒绝 null / 数组');

  const badImport = await page.js(`new Promise(function(resolve){
    var input=document.getElementById('saveFile');
    var dt=new DataTransfer();
    dt.items.add(new File(['{not json'], 'bad.json', {type:'application/json'}));
    input.files=dt.files;
    input.dispatchEvent(new Event('change', {bubbles:true}));
    setTimeout(function(){
      resolve({toast:document.getElementById('toast').textContent,
               on:document.getElementById('toast').classList.contains('is-on'),
               reloaded:false});
    }, 500);
  })`);
  equal(badImport.toast, '存档不对', '非法存档导入给出“存档不对”提示');
  equal(badImport.on, true, '非法导入提示 toast 可见且页面未崩溃');
  await page.key('Escape');
  await page.waitFor('document.getElementById("overlay").hidden');
  equal((await page.js('window.__qa.active()')).id, 'helpBtn', '关闭帮助面板后焦点归还 #helpBtn');

  /* ------------------------------------------------------------------
   * I. 目标焊盘可见性（桌面 / 移动 / 窄屏）
   * ------------------------------------------------------------------ */
  const deskFirst = await measureTarget(page, 'CH1-01');
  equal(deskFirst.inside, true, '1440×900：首关目标焊盘完整落在棋盘内');
  const deskFar = await measureTarget(page, 'CH1-13');
  equal(deskFar.inside, true, '1440×900：y=640 远目标（CH1-13）载入即完整可见');
  const deskLong = await measureTarget(page, 'CH4-23');
  equal(deskLong.inside, true, '1440×900：105 字长目标（CH4-23）载入即完整可见');
  await page.shot('07-desktop-long-target');

  async function reloadAt(width, height, label) {
    await page.viewport(width, height, { deviceScaleFactor: width <= 700 ? 2 : 1, mobile: width <= 700 });
    await page.send('Page.navigate', { url: fileUrl() });
    await page.ready();
    await install(page);
    const layout = await page.js(`(function(){
      return {innerW:innerWidth, scrollW:document.documentElement.scrollWidth,
              helpVisible:window.__qa.visible('#helpBtn'),
              targetInBoard:window.__qa.inside(window.__qa.rect('.node.is-target'), window.__qa.rect('#board'))};
    })()`);
    equal(layout.scrollW, layout.innerW, label + '：无横向溢出（scrollWidth === innerWidth）');
    equal(layout.helpVisible, true, label + '：移动端保留 #helpBtn 且可见');
    return layout;
  }

  await reloadAt(390, 844, '390×844');
  equal((await measureTarget(page, 'CH1-01')).inside, true, '390×844：首关目标焊盘完整可见');
  equal((await measureTarget(page, 'CH4-23')).inside, true, '390×844：长目标载入即完整可见');

  /* 移动端双指缩放：两根手指拉开后棋盘 scale 明显变大，松手结束 pinch 态 */
  await page.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 2 });
  const pinchBefore = await page.js('window.RSL.APP.state.board.view.scale');
  const boardRect = await page.js('window.__qa.rect("#board")');
  const cx = boardRect.left + boardRect.width / 2;
  const cy = boardRect.top + boardRect.height / 2;
  const touch = (type, points) => page.send('Input.dispatchTouchEvent', {
    type: type,
    touchPoints: points.map((p, i) => ({ x: p.x, y: p.y, id: i }))
  });
  await touch('touchStart', [{ x: cx - 40, y: cy }, { x: cx + 40, y: cy }]);
  await page.sleep(60);
  await touch('touchMove', [{ x: cx - 100, y: cy }, { x: cx + 100, y: cy }]);
  await page.sleep(150);
  const pinchMid = await page.js('({scale:window.RSL.APP.state.board.view.scale, active:!!window.RSL.APP.state.board._pinch})');
  await touch('touchEnd', []);
  await page.sleep(250);
  const pinchAfter = await page.js('({scale:window.RSL.APP.state.board.view.scale, active:!!window.RSL.APP.state.board._pinch})');
  await page.send('Emulation.setTouchEmulationEnabled', { enabled: false });
  ok(pinchMid.active === true, '双指按下进入 pinch 态');
  ok(pinchAfter.scale > pinchBefore * 1.3, '双指拉开后棋盘放大（' + pinchBefore.toFixed(2) + ' → ' + pinchAfter.scale.toFixed(2) + '）');
  equal(pinchAfter.active, false, '松手后退出 pinch 态');

  /* 手指连接：按在端口附近（偏离 9px）也能起线/落线；双击空板回到适应视图 */
  await page.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 2 });
  await page.js('window.RSL.APP.state.forceUnlock = true');
  await page.js('window.RSL.APP.loadLevel(1)');
  await page.waitFor('window.RSL.APP.state.level.id === "CH1-02"');
  await page.js('document.querySelector(".tile").click()');
  await page.waitFor('document.querySelectorAll(".node").length === 2');
  await page.sleep(400);
  const nearPorts = await page.js(`(function(){
    var o=document.querySelector('.node[data-kind="axiom"] .port-out').getBoundingClientRect();
    var i=document.querySelector('.node.is-target .port-in').getBoundingClientRect();
    return {o:{x:o.left+o.width/2+9,y:o.top+o.height/2+7}, i:{x:i.left+i.width/2-9,y:i.top+i.height/2-7}};
  })()`);
  const tapAt = async (pt) => {
    await page.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: pt.x, y: pt.y, id: 0 }] });
    await page.sleep(70);
    await page.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await page.sleep(250);
  };
  await tapAt(nearPorts.o);
  await tapAt(nearPorts.i);
  equal(await page.js('document.querySelectorAll(".wire").length'), 1, '手指偏离端口 9px 仍能完成连线');
  equal(await page.js('document.querySelector(".node.is-target").dataset.state'), 'complete', '手指连线后目标 complete');
  const tapFitBefore = await page.js('window.RSL.APP.state.board.view.scale');
  const boardTap = await page.js(`(function(){var b=document.getElementById('board').getBoundingClientRect();return {x:b.left+b.width/2,y:b.top+b.height*0.78};})()`);
  await tapAt(boardTap);
  await tapAt(boardTap);
  const tapFitAfter = await page.js('window.RSL.APP.state.board.view.scale');
  ok(Math.abs(tapFitAfter - tapFitBefore) > 0.01, '双击空板把视图复位到适应视图（' + tapFitBefore.toFixed(2) + ' → ' + tapFitAfter.toFixed(2) + '）');
  const touchDetach = await page.js(`(function(){
    var i=document.querySelector('.node.is-target .port-in');
    var a=i.getBoundingClientRect();
    var b=document.getElementById('board').getBoundingClientRect();
    return {from:{x:a.left+a.width/2,y:a.top+a.height/2}, to:{x:b.left+70,y:b.top+70}};
  })()`);
  await touch('touchStart', [touchDetach.from]);
  await page.sleep(60);
  await touch('touchMove', [{ x: touchDetach.to.x, y: touchDetach.to.y }]);
  await page.sleep(120);
  await touch('touchEnd', []);
  await page.sleep(300);
  equal(await page.js('window.RSL.APP.state.board.edges.length'), 0, '手指拖走已接线的输入端：线被拆下且未重接即删除');
  await page.send('Emulation.setTouchEmulationEnabled', { enabled: false });
  await page.shot('08-mobile-390');

  await reloadAt(320, 640, '320×640');
  const narrow = await page.js(`(function(){
    var tb=window.__qa.rect('.topbar');
    var goal=window.__qa.rect('#goal');
    var lv=window.__qa.rect('.level-num');
    var actions=window.__qa.rect('.actions');
    return {tb:tb, goal:goal, lv:lv, actions:actions,
            goalVsLv:window.__qa.overlap(goal,lv),
            goalVsActions:window.__qa.overlap(goal,actions),
            lvVsActions:window.__qa.overlap(lv,actions),
            goalTop:goal.top, lvBottom:lv.bottom, actionsBottom:actions.bottom,
            goalWidth:goal.width, tbWidth:tb.width,
            actionsRight:actions.right, tbRight:tb.right};
  })()`);
  ok(narrow.goalTop >= narrow.lvBottom - 1, '320×640：目标公式在第二行（goal.top ' + narrow.goalTop.toFixed(1) + ' ≥ 关卡号 bottom ' + narrow.lvBottom.toFixed(1) + '）');
  ok(narrow.goalTop >= narrow.actionsBottom - 1, '320×640：目标公式不与工具组同一行');
  ok(narrow.goalWidth >= narrow.tbWidth - 24, '320×640：目标公式占满整行（' + narrow.goalWidth.toFixed(1) + '/' + narrow.tbWidth.toFixed(1) + '）');
  equal(narrow.goalVsLv, 0, '320×640：目标公式与关卡号不重叠');
  equal(narrow.goalVsActions, 0, '320×640：目标公式与工具组不重叠');
  equal(narrow.lvVsActions, 0, '320×640：关卡号与工具组不重叠');
  ok(narrow.actionsRight <= narrow.tbRight + 0.5, '320×640：工具组不超出顶栏');
  equal((await measureTarget(page, 'CH1-13')).inside, true, '320×640：y=640 远目标完整可见');
  equal((await measureTarget(page, 'CH4-23')).inside, true, '320×640：长目标完整可见');
  await page.shot('09-narrow-320');

  /* 横屏手机：压缩顶栏/元件盘后棋盘仍保留可用高度 */
  await reloadAt(844, 390, '844×390');
  const landscape = await page.js(`(function(){
    var b=document.getElementById('board').getBoundingClientRect();
    var tb=document.querySelector('.topbar').getBoundingClientRect();
    var tr=document.getElementById('tray').getBoundingClientRect();
    return {boardH:b.height, topbarH:tb.height, trayH:tr.height,
            overflow:document.documentElement.scrollWidth>innerWidth,
            targetInside:window.__qa.inside(window.__qa.rect('.node.is-target'), window.__qa.rect('#board'))};
  })()`);
  ok(landscape.boardH >= 230, '844×390 横屏：棋盘高度 ≥230px（实际 ' + Math.round(landscape.boardH) + 'px）');
  equal(landscape.overflow, false, '844×390 横屏：无横向溢出');
  equal(landscape.targetInside, true, '844×390 横屏：目标焊盘完整可见');
  await page.shot('11-landscape-844');

  /* ------------------------------------------------------------------
   * J. dist 构建产物 smoke：file:// 打开，首关放置 → 连线 → 通关
   * ------------------------------------------------------------------ */
  await page.js('localStorage.clear()');
  await page.send('Page.navigate', { url: fileUrl('dist/index.html') });
  await page.ready();
  await install(page);
  equal(await page.js('typeof window.RSL.APP === "object" && !!window.RSL.APP'), true, 'dist：window.RSL.APP 初始化成功');
  equal(await page.js('window.RSL.APP.state.levels.length'), 288, 'dist：加载 288 关（240 接线 + 48 重放）');
  await solveFirstLevel(page);
  equal(await page.js('document.querySelector(".node.is-target").dataset.state'), 'complete', 'dist：首关连线后目标 complete');
  ok(await page.js('!!document.querySelector(".win")'), 'dist：首关校验后出现通关面板');
  await page.shot('10-dist-win');

  /* 截图落盘检查 */
  for (const name of fs.readdirSync(SHOT_DIR)) {
    const file = path.join(SHOT_DIR, name);
    if (!name.endsWith('.png')) continue;
    ok(fs.statSync(file).size > 1000, 'QA 截图非空：' + name);
  }
}, { timeout: 300000 });
