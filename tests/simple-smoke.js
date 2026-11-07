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
  await js('window.RSL.APP.stopDemo && window.RSL.APP.stopDemo()'); await sleep(250);
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
  console.log('unlock', await js('(function(){var a=window.RSL.APP;var iv=a.state.levels.findIndex(function(l){return l.chapterGroup==="Ⅳ"});return {next:a.isUnlocked(1),later:a.isUnlocked(iv+2),iv:a.isUnlocked(iv),solved:Object.keys(a.state.solved)};})()'));
  await shot('simple-win.png');
  await js('document.querySelector("[data-next]").click()'); await sleep(400);
  console.log('next level', await js('document.getElementById("levelBtn").textContent'));
  await js('document.getElementById("levelBtn").click()'); await sleep(300);
  console.log('level cells', await js('document.querySelectorAll(".level-cell").length'));
  console.log('locks', await js('Array.from(document.querySelectorAll(".chapter")).filter(function(c){return c.classList.contains("is-locked")||c.classList.contains("is-current");}).map(function(c){var b=c.querySelector(".level-cell");return {roman:c.querySelector(".chapter-roman").textContent,cls:c.className,first:b&&b.className,firstDisabled:b&&b.disabled};})'));
  await js('document.getElementById("achvBtn").click()'); await sleep(250);
  console.log('achievements', await js('({total:document.querySelectorAll(".achv").length,on:document.querySelectorAll(".achv.is-on").length})'));
  await js('document.querySelector("[data-close]").click()'); await sleep(150);
  await js('document.getElementById("helpBtn").click()'); await sleep(250);
  console.log('help', await js('({cards:document.querySelectorAll(".help-card").length,credit:document.querySelector(".credit")&&document.querySelector(".credit").textContent})'));
  await js('document.querySelector("[data-close]").click()'); await sleep(150);
  console.log('bands', await js(`(function(){
    var app=window.RSL.APP, L=app.state.levels, idx=function(id){return L.findIndex(function(l){return l.id===id});};
    var base=L.filter(function(l){return l.chapterGroup==='Ⅰ'&&l.band!=='challenge'});
    base.forEach(function(l){app.state.solved[l.id]=true;});
    return {base:base.length,chal:app.isUnlocked(idx('CH1-31')),next:app.isUnlocked(idx('CH2-01')),nextChal:app.isUnlocked(idx('CH2-31')),baseLast:base[base.length-1].id};
  })()`));
  ws.close();
}
main().catch(e => { console.error('FAIL', e); process.exitCode = 1; }).finally(async () => { await sleep(200); try { proc && proc.kill(); } catch (e) {} setTimeout(() => process.exit(process.exitCode || 0), 500); });
