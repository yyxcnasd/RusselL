/* Smoke test for the simplified one-screen build. */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9350;
const profile = path.join(root, '.research', 'simple-smoke');
const url = 'file:///' + path.join(root, 'index.html').replace(/\\/g, '/');
let proc;
const sleep = ms => new Promise(r => setTimeout(r, ms));
try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) {}
async function main() {
  proc = spawn(edge, ['--headless=new', '--disable-gpu', '--remote-debugging-port=' + port, '--user-data-dir=' + profile, '--window-size=1440,900', url], { stdio: 'ignore' });
  let list;
  for (let i = 0; i < 40; i++) { await sleep(250); try { list = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json(); if (list.length) break; } catch (e) {} }
  const page = list.find(x => x.type === 'page') || list[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let seq = 0; const pend = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
  const send = (method, params) => new Promise((res, rej) => { const id = ++seq; pend.set(id, m => m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result)); ws.send(JSON.stringify({ id, method, params: params || {} })); });
  const js = async exp => { const r = await send('Runtime.evaluate', { expression: exp, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result.value; };
  const shot = async name => { const r = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(path.join(root, 'screenshots', name), Buffer.from(r.data, 'base64')); };
  await send('Runtime.enable'); await sleep(1300);
  console.log('level', await js('document.getElementById("levelBtn").textContent'), 'goal', await js('document.getElementById("goalFormula").textContent'));
  console.log('tiles', await js('document.querySelectorAll(".tile").length'), 'nodes', await js('document.querySelectorAll(".node").length'));
  await js('document.querySelector(".tile").click()'); await sleep(400);
  console.log('nodes after add', await js('document.querySelectorAll(".node").length'));
  const ports = await js(`(function(){var out=document.querySelector('.node[data-kind="axiom"] .port-out'),inp=document.querySelector('.node.is-target .port-in');var a=out.getBoundingClientRect(),b=inp.getBoundingClientRect();return {ox:a.left+a.width/2,oy:a.top+a.height/2,ix:b.left+b.width/2,iy:b.top+b.height/2};})()`);
  console.log('ports', ports);
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: ports.ox, y: ports.oy, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: (ports.ox + ports.ix) / 2, y: (ports.oy + ports.iy) / 2, button: 'left' });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: ports.ix, y: ports.iy, button: 'left', clickCount: 1 });
  await sleep(500);
  console.log('wires', await js('document.querySelectorAll(".wire").length'), 'target', await js('document.querySelector(".node.is-target").dataset.state'));
  await shot('simple-wired.png');
  await js('document.getElementById("checkBtn").click()'); await sleep(500);
  console.log('win', await js('!!document.querySelector(".win")'), 'overlay', await js('!document.getElementById("overlay").hidden'));
  await js('document.getElementById("themeBtn").click()'); await sleep(150);
  console.log('dark-target', await js('(function(){var t=document.querySelector(".node.is-target"),m=document.querySelector(".target-mark");return {bg:getComputedStyle(t).backgroundColor,border:getComputedStyle(t).borderColor,mark:getComputedStyle(m).color};})()'));
  await js('document.getElementById("themeBtn").click()'); await sleep(120);
  console.log('unlock', await js('(function(){var a=window.RSL.APP;var iv=a.state.levels.findIndex(function(l){return l.chapterGroup==="Ⅳ"});return {next:a.isUnlocked(1),later:a.isUnlocked(iv+2),iv:a.isUnlocked(iv),solved:Object.keys(a.state.solved)};})()'));
  await shot('simple-win.png');
  await js('document.querySelector("[data-next]").click()'); await sleep(400);
  console.log('next level', await js('document.getElementById("levelBtn").textContent'));
  console.log('first-six', await js('window.RSL.APP.state.levels.slice(0,6).map(function(l){return l.id+":"+l.title})'));
  await js('window.RSL.APP.loadLevel(0)'); await sleep(250);
  console.log('saved-circuit', await js('document.querySelectorAll(".node:not(.is-target)").length'));
  await js('window.RSL.APP.loadLevel(1)'); await sleep(250);
  const pal = await js(`(function(){var t=document.querySelector('.tile'),b=document.getElementById('board');var tr=t.getBoundingClientRect(),br=b.getBoundingClientRect();return {tx:tr.left+tr.width/2,ty:tr.top+tr.height/2,bx:br.left+90,by:br.top-12};})()`);
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: pal.tx, y: pal.ty, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pal.tx, y: pal.ty, button: 'left', clickCount: 1 });
  await sleep(180);
  const ghost1 = await js('!!document.querySelector(".module-ghost")');
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: pal.bx, y: pal.by, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pal.bx, y: pal.by, button: 'left', clickCount: 1 });
  await sleep(250);
  console.log('palette-sticky', await js('({ghostBefore:' + ghost1 + ',ghostAfter:!!document.querySelector(".module-ghost"),nodes:document.querySelectorAll(".node:not(.is-target)").length})'));
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: pal.tx, y: pal.ty, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pal.tx, y: pal.ty, button: 'left', clickCount: 1 });
  await sleep(150);
  const ghost2 = await js('!!document.querySelector(".module-ghost")');
  await js('document.dispatchEvent(new MouseEvent("contextmenu",{bubbles:true,cancelable:true}))');
  await sleep(120);
  console.log('palette-right-cancel', await js('({before:' + ghost2 + ',after:!!document.querySelector(".module-ghost")})'));
  await js('document.getElementById("levelBtn").click()'); await sleep(300);
  console.log('level cells', await js('document.querySelectorAll(".level-cell").length'));
  console.log('locks', await js('Array.from(document.querySelectorAll(".chapter")).filter(function(c){return c.classList.contains("is-locked")||c.classList.contains("is-current");}).map(function(c){var b=c.querySelector(".level-cell");return {roman:c.querySelector(".chapter-roman").textContent,cls:c.className,first:b&&b.className,firstDisabled:b&&b.disabled};})'));
  await js('document.getElementById("achvBtn").click()'); await sleep(250);
  console.log('achievements', await js('({total:document.querySelectorAll(".achv").length,on:document.querySelectorAll(".achv.is-on").length,questions:document.querySelectorAll(".achv-q").length})'));
  await js('document.querySelector(".achv").click()'); await sleep(150);
  console.log('achv-detail', await js('({title:document.querySelector(".achv-detail h2")&&document.querySelector(".achv-detail h2").textContent,desc:document.querySelector(".achv-detail p")&&document.querySelector(".achv-detail p").textContent,status:!!document.querySelector(".achv-status")})'));
  await js('document.querySelector("[data-back]").click()'); await sleep(150);
  await js('document.querySelector(".achv:not(.is-on)").click()'); await sleep(150);
  console.log('achv-locked', await js('({detail:!!document.querySelector(".achv-detail"),disabled:document.querySelector(".achv:not(.is-on)").disabled})'));
  await js('document.querySelector("[data-close]").click()'); await sleep(150);
  await js('document.getElementById("helpBtn").click()'); await sleep(250);
  console.log('help', await js('({cards:document.querySelectorAll(".help-card").length,save:document.querySelectorAll(".save-btn").length,credit:document.querySelector(".credit")&&document.querySelector(".credit").textContent})'));
  await js('document.querySelector("[data-close]").click()'); await sleep(150);
  console.log('bands', await js(`(function(){
    var app=window.RSL.APP, L=app.state.levels, idx=function(id){return L.findIndex(function(l){return l.id===id});};
    var base=L.filter(function(l){return l.chapterGroup==='Ⅰ'&&l.band!=='challenge'});
    base.forEach(function(l){app.state.solved[l.id]=true;});
    return {base:base.length,chal:app.isUnlocked(idx('CH1-31')),next:app.isUnlocked(idx('CH2-01')),nextChal:app.isUnlocked(idx('CH2-31')),baseLast:base[base.length-1].id};
  })()`));
  console.log('selection', await js(`(function(){
    var app=window.RSL.APP, b=app.state.board;
    b.board.setPointerCapture=function(){}; b.board.releasePointerCapture=function(){};
    b.setData([{id:'s1',kind:'atom',x:80,y:160,config:{name:'P'}},{id:'s2',kind:'atom',x:320,y:160,config:{name:'Q'}},{id:'s3',kind:'atom',x:80,y:360,config:{name:'R'}},{id:'target',kind:'target',x:900,y:300,target:'P→(Q→P)',config:{}}],[]);
    var r=b.board.getBoundingClientRect();
    function cx(x){return r.left+b.view.x+x*b.view.scale}
    function cy(y){return r.top+b.view.y+y*b.view.scale}
    b._startMarquee({clientX:cx(40),clientY:cy(80),pointerId:1});
    b._updateMarquee(cx(600),cy(500));
    b._endMarquee();
    var n=b.selectedNodes.length;
    var el=b.nodes.querySelector('[data-id="s1"]');
    var before={x:b.node('s1').x,y:b.node('s1').y};
    if(el){
      b._down({target:el,shiftKey:true,clientX:cx(80),clientY:cy(160),pointerId:1,pointerType:'mouse',preventDefault:function(){},stopPropagation:function(){}});
      b._move({clientX:cx(80)+48,clientY:cy(160)+32});
      b._up({});
    }
    var after={x:b.node('s1').x,y:b.node('s1').y};
    return {selected:n,dragged:before.x!==after.x||before.y!==after.y,snapped:after.x%16===0&&after.y%16===0};
  })()`));
  ws.close();
}
main().catch(e => { console.error('FAIL', e); process.exitCode = 1; }).finally(async () => { await sleep(200); try { proc && proc.kill(); } catch (e) {} setTimeout(() => process.exit(process.exitCode || 0), 500); });
