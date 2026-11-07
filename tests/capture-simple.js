/* Capture final simplified screenshots. */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9353;
const profile = path.join(root, '.research', 'simple-capture');
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
  await send('Runtime.enable'); await sleep(1400);
  await shot('11-demo.png');
  await js('window.RSL.APP.stopDemo && window.RSL.APP.stopDemo()'); await sleep(250);
  await shot('01-game.png');
  await js('document.getElementById("themeBtn").click()'); await sleep(350);
  await shot('07-dark.png');
  await js('document.getElementById("themeBtn").click()'); await sleep(250);
  await js('document.querySelector(".tile").click()'); await sleep(350);
  const ports = await js(`(function(){var out=document.querySelector('.node[data-kind="axiom"] .port-out'),inp=document.querySelector('.node.is-target .port-in');var a=out.getBoundingClientRect(),b=inp.getBoundingClientRect();return {ox:a.left+a.width/2,oy:a.top+a.height/2,ix:b.left+b.width/2,iy:b.top+b.height/2};})()`);
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: ports.ox, y: ports.oy, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: (ports.ox + ports.ix) / 2, y: (ports.oy + ports.iy) / 2, button: 'left' });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: ports.ix, y: ports.iy, button: 'left', clickCount: 1 });
  await sleep(450);
  await shot('02-wired.png');
  await js('document.getElementById("checkBtn").click()'); await sleep(450);
  await shot('03-win.png');
  await js('document.querySelector("[data-close]").click()'); await sleep(200);
  await js('document.getElementById("levelBtn").click()'); await sleep(300);
  await shot('04-levels.png');
  await js('document.querySelector("[data-close]").click()'); await sleep(200);
  await js('document.getElementById("achvBtn").click()'); await sleep(300);
  await shot('09-achievements.png');
  await js('document.querySelector("[data-close]").click()'); await sleep(200);
  await js('document.getElementById("helpBtn").click()'); await sleep(300);
  await shot('10-help.png');
  await js('document.querySelector("[data-close]").click()'); await sleep(200);
  await js('window.RSL.APP.state.forceUnlock=true');
  const i = await js('window.RSL.APP.state.levels.findIndex(function(l){return l.id==="CH2-01"})');
  await js('window.RSL.APP.loadLevel(' + i + ')'); await sleep(300);
  await js('document.querySelector(".tile").click()'); await sleep(250);
  await shot('06-pm.png');
  const eq = await js('window.RSL.APP.state.levels.findIndex(function(l){return l.id==="CH3-01"})');
  if (eq >= 0) { await js('window.RSL.APP.loadLevel(' + eq + ')'); await sleep(300); await shot('08-equality.png'); }
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send('Page.navigate', { url }); await sleep(1200);
  await shot('05-mobile.png');
  ws.close();
}
main().catch(e => { console.error('FAIL', e); process.exitCode = 1; }).finally(async () => { await sleep(200); try { proc && proc.kill(); } catch (e) {} setTimeout(() => process.exit(process.exitCode || 0), 500); });

