/* Simplified UI: PM theorem level and config popover. */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9352;
const profile = path.join(root, '.research', 'simple-run');
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
  const idx = await js('window.RSL.APP.state.levels.findIndex(function(l){return l.code==="*2.1"})');
  console.log('load', await js('(function(){try{window.RSL.APP.loadLevel(' + idx + ');return "ok"}catch(e){return (e&&e.stack)||String(e)}})()')); await sleep(300);
  console.log('pm', await js('document.getElementById("goalFormula").textContent'), await js('document.querySelectorAll(".tile").length'));
  await js('document.querySelector(".tile[data-key^=\\"theorem:\\"]").click()'); await sleep(300);
  const ports = await js(`(function(){var out=document.querySelector('.node[data-kind="theorem"] .port-out'),inp=document.querySelector('.node.is-target .port-in');var a=out.getBoundingClientRect(),b=inp.getBoundingClientRect();return {ox:a.left+a.width/2,oy:a.top+a.height/2,ix:b.left+b.width/2,iy:b.top+b.height/2};})()`);
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: ports.ox, y: ports.oy, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: (ports.ox + ports.ix) / 2, y: (ports.oy + ports.iy) / 2, button: 'left' });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: ports.ix, y: ports.iy, button: 'left', clickCount: 1 });
  await sleep(400);
  console.log('target after theorem only', await js('document.querySelector(".node.is-target").dataset.state'));
  await shot('simple-pm-wired.png');
  await js('window.RSL.APP.loadLevel(4)'); await sleep(300);
  console.log('L05 tiles', await js('document.querySelectorAll(".tile").length'));
  const part = await js('(function(){var e=document.querySelector("[data-key=\\"atom\\"]"); if(!e)return null;var r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};})()');
  if (part) {
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: part.x, y: part.y, button: 'left', clickCount: 1 });
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: part.x, y: part.y, button: 'left', clickCount: 1 });
    await sleep(400);
  }
  console.log('popover opts', await js('document.querySelectorAll("#popover .opt").length'), 'visible', await js('!document.getElementById("popover").hidden'));
  await shot('simple-popover.png');
  ws.close();
}
main().catch(e => { console.error('FAIL', e); process.exitCode = 1; }).finally(async () => { await sleep(200); try { proc && proc.kill(); } catch (e) {} setTimeout(() => process.exit(process.exitCode || 0), 500); });


