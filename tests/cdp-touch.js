/* Mobile touch smoke: add axiom, drag a wire with touch, verify. */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9342;
const profile = path.join(root, '.research', 'cdp-touch');
const url = 'file:///' + path.join(root, 'index.html').replace(/\\/g, '/') + '?autostart=1';
let proc;
const sleep = ms => new Promise(r => setTimeout(r, ms));
try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) {}
async function main() {
  proc = spawn(edge, ['--headless=new', '--disable-gpu', '--remote-debugging-port=' + port, '--user-data-dir=' + profile, 'about:blank'], { stdio: 'ignore' });
  let list;
  for (let i = 0; i < 40; i++) { await sleep(250); try { list = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json(); if (list.length) break; } catch (e) {} }
  const page = list.find(x => x.type === 'page') || list[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let seq = 0; const pend = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
  const send = (method, params) => new Promise((res, rej) => { const id = ++seq; pend.set(id, m => m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result)); ws.send(JSON.stringify({ id, method, params: params || {} })); });
  const js = async exp => { const r = await send('Runtime.evaluate', { expression: exp, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result.value; };
  await send('Runtime.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
  await send('Page.navigate', { url }); await sleep(1600);
  await js('document.getElementById("mPartsBtn").click()'); await sleep(400);
  const part = await js('(function(){var e=document.querySelector("[data-part=\\"axiom:A1\\"]");var r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};})()');
  await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: part.x, y: part.y }] });
  await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await sleep(600);
  console.log('modules', await js('document.querySelectorAll(".module").length'), 'drawer', await js('document.getElementById("partsPanel").classList.contains("is-open")'));
  const ports = await js(`(function(){var out=document.querySelector('.module[data-kind="axiom"] .port-out'), inp=document.querySelector('.module-target .port-in');var a=out.getBoundingClientRect(),b=inp.getBoundingClientRect();return {ox:a.left+a.width/2,oy:a.top+a.height/2,ix:b.left+b.width/2,iy:b.top+b.height/2};})()`);
  console.log('ports', ports);
  await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: ports.ox, y: ports.oy }] });
  await sleep(100);
  await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: (ports.ox + ports.ix) / 2, y: (ports.oy + ports.iy) / 2 }] });
  await sleep(100);
  await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: ports.ix, y: ports.iy }] });
  await sleep(100);
  await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await sleep(600);
  await js('document.querySelector(".module[data-kind=\\"axiom\\"] .port-out").click()');
  console.log('draft after click', await js('!!(window.RSL.APP.state.board && window.RSL.APP.state.board.draft)'));
  await js('document.querySelector(".module-target .port-in").click()');
  console.log('draft after input click', await js('!!(window.RSL.APP.state.board && window.RSL.APP.state.board.draft)'));
  await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: ports.ix, y: ports.iy }] });
  await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await sleep(600);
  console.log('wires', await js('document.querySelectorAll(".wire").length'), 'target', await js('document.getElementById("targetState").dataset.state'));
  await js('document.getElementById("mVerifyBtn").click()'); await sleep(700);
  console.log('win', await js('!!document.querySelector(".win")'));
  ws.close();
}
main().catch(e => { console.error('FAIL', e); process.exitCode = 1; }).finally(async () => { await sleep(200); try { proc && proc.kill(); } catch (e) {} setTimeout(() => process.exit(process.exitCode || 0), 500); });

