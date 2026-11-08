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
 *  10) dist 构建产物：脚本清单与源码一致、16 个运行时 js + simple.css，file:// 打开
 *      首关能放置→连线→通关（与源码行为一致）。
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

  const scriptsOf = (html) => Array.from(html.matchAll(/<script src="src\/([^"]+)"><\/script>/g)).map((m) => m[1]);
  const srcScripts = scriptsOf(fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'));
  const distScripts = scriptsOf(fs.readFileSync(distIndexPath, 'utf8'));
  equal(distScripts, srcScripts, 'dist/index.html 的脚本列表与源码 index.html 完全一致');
  equal(srcScripts.length, 16, '运行时脚本共 16 个（logic…main）');

  const distSrcDir = path.join(distDir, 'src');
  const distSrcAll = fs.readdirSync(distSrcDir).sort();
  const distJs = distSrcAll.filter((f) => f.endsWith('.js')).sort();
  equal(distJs, srcScripts.slice().sort(), 'dist/src 的 js 与 index.html 引用一一对应');
  equal(distJs.length, 16, 'dist/src 含 16 个运行时 js');
  equal(distSrcAll.length, 17, 'dist/src 共 17 个运行时文件（16 js + simple.css）');
  ok(distSrcAll.includes('simple.css'), 'dist/src 含 simple.css');
  for (const file of srcScripts) {
    const a = fs.statSync(path.join(distSrcDir, file)).size;
    const b = fs.statSync(path.join(ROOT, 'src', file)).size;
    equal(a, b, 'dist/src/' + file + ' 与源码同尺寸（拷贝完整）');
  }

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
            countText:(document.querySelector('.achv-count')||{}).textContent||''};
  })()`);
  equal(achvList.total, 20, '成就面板 20 项');
  ok(achvList.on >= 1, '首关通关后至少 1 个成就点亮（实际 ' + achvList.on + '）');
  matches(achvList.countText, /\/\s*20/, '成就计数显示总数 20');
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

  /* ------------------------------------------------------------------
   * J. dist 构建产物 smoke：file:// 打开，首关放置 → 连线 → 通关
   * ------------------------------------------------------------------ */
  await page.js('localStorage.clear()');
  await page.send('Page.navigate', { url: fileUrl('dist/index.html') });
  await page.ready();
  await install(page);
  equal(await page.js('typeof window.RSL.APP === "object" && !!window.RSL.APP'), true, 'dist：window.RSL.APP 初始化成功');
  equal(await page.js('window.RSL.APP.state.levels.length'), 240, 'dist：加载 240 关');
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
