/* CDP integration: archive theorem insertion, replacement options, atlas. */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9338;
const url = 'file:///' + path.join(root, 'index.html').replace(/\\/g, '/') + '?autostart=1';
let proc;
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function main() {
  proc = spawn(edge, ['--headless=new', '--disable-gpu', '--remote-debugging-port=' + port, '--user-data-dir=' + path.join(root, '.research', 'cdp-int'), '--window-size=1440,1000', url], { stdio: 'ignore' });
  let list;
  for (let i = 0; i < 40; i++) { await sleep(250); try { list = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json(); if (list.length) break; } catch (e) {} }
  const ws = new WebSocket(list.find(x => x.type === 'page').webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let seq = 0; const pend = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
  const send = (method, params) => new Promise((res, rej) => { const id = ++seq; pend.set(id, m => m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result)); ws.send(JSON.stringify({ id, method, params: params || {} })); });
  const js = async exp => { const r = await send('Runtime.evaluate', { expression: exp, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result.value; };
  const shot = async name => { const r = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(path.join(root, '.research', name), Buffer.from(r.data, 'base64')); };
  await send('Runtime.enable'); await send('Page.enable'); await sleep(1400);
  await js('document.getElementById("startBtn").click()'); await sleep(600);

  // replacement module options
  await js('(function(){var i=window.RSL.APP.state.levels.findIndex(l=>l.id==="RU-06");window.RSL.APP.loadLevel(i,{force:true});window.RSL.APP.loadSolution();})()');
  await sleep(900);
  console.log('replacement modules', await js('document.querySelectorAll(".module[data-kind=replace]").length'));
  await js('(function(){var m=document.querySelector(".module[data-kind=replace]");if(m){var r=m.getBoundingClientRect();window.__mx=r.x+r.width/2;window.__my=r.y+r.height/2;}})()');
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: await js('window.__mx'), y: await js('window.__my'), button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: await js('window.__mx'), y: await js('window.__my'), button: 'left', clickCount: 1 });
  await sleep(500);
  console.log('replace options', await js('document.querySelectorAll(".replace-option").length'), 'inspector', await js('document.getElementById("sideTitle").textContent'));
  await shot('int-replace.png');

  // archive theorem insertion
  await js('(function(){var i=window.RSL.APP.state.levels.findIndex(l=>l.id==="RU-09");window.RSL.APP.loadLevel(i,{force:true});})()');
  await sleep(500);
  await js('document.getElementById("codexBtn").click()'); await sleep(500);
  await js('document.querySelectorAll("[data-codex-tab]")[6].click()'); await sleep(500);
  await js('document.querySelector(".theorem-row[data-theorem-code=\\"*2.14\\"]").click()'); await sleep(500);
  console.log('detail name', await js('document.querySelector(".theorem-detail-head h2").textContent'), 'add button', await js('!!document.querySelector("[data-add-theorem]")'));
  await shot('int-theorem.png');
  await js('document.querySelector("[data-add-theorem]").click()'); await sleep(500);
  console.log('theorem module', await js('document.querySelectorAll(".module[data-kind=theorem]").length'), 'sheet open', await js('document.getElementById("overlay").classList.contains("is-open")'));

  // atlas
  await js('document.getElementById("codexBtn").click()'); await sleep(400);
  await js('document.querySelectorAll("[data-codex-tab]")[8].click()'); await sleep(600);
  console.log('atlas cards', await js('document.querySelectorAll(".atlas-card").length'), 'highlights', await js('document.querySelectorAll(".atlas-theorem").length'));
  await shot('int-atlas.png');
  ws.close();
}
main().catch(e => { console.error('FAIL', e); process.exitCode = 1; }).finally(async () => { await sleep(200); try { proc && proc.kill(); } catch (e) {} setTimeout(() => process.exit(process.exitCode || 0), 500); });
