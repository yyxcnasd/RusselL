/* Mobile smoke and screenshot at a fresh 390px viewport. */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9335;
const profile = path.join(root, '.research', 'cdp-profile-mobile');
const url = 'file:///' + path.join(root, 'index.html').replace(/\\/g, '/');
let proc;
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function main() {
  proc = spawn(edge, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=' + port, '--user-data-dir=' + profile, '--window-size=500,900', url], { stdio: 'ignore' });
  let list;
  for (let i = 0; i < 40; i++) { await sleep(250); try { list = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json(); if (list.length) break; } catch (e) {} }
  const page = list.find(x => x.type === 'page') || list[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let seq = 0; const pend = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
  const send = (method, params) => new Promise((res, rej) => { const id = ++seq; pend.set(id, m => m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result)); ws.send(JSON.stringify({ id, method, params: params || {} })); });
  const js = async exp => { const r = await send('Runtime.evaluate', { expression: exp, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result.value; };
  const shot = async name => { const r = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(path.join(root, '.research', name), Buffer.from(r.data, 'base64')); };
  await send('Runtime.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send('Page.navigate', { url });
  await sleep(1500);
  await js('document.getElementById("startBtn").click()');
  await sleep(800);
  console.log('viewport', await js('innerWidth + "x" + innerHeight'));
  console.log('target visible', await js('(function(){var e=document.querySelector(".module-target"); if(!e)return "missing"; var r=e.getBoundingClientRect(); return JSON.stringify({x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height),vis:r.x<innerWidth&&r.y<innerHeight});})()'));
  await shot('mobile-fresh.png');
  await js('document.getElementById("mPartsBtn").click()');
  await sleep(500);
  console.log('parts open', await js('document.getElementById("partsPanel").classList.contains("is-open")'));
  await shot('mobile-parts.png');
  await js('document.querySelector("[data-part=\\"axiom:A1\\"]").click()');
  await sleep(500);
  console.log('modules', await js('document.querySelectorAll(".module").length'));
  await js('document.getElementById("mTargetBtn").click()');
  await sleep(400);
  await shot('mobile-target.png');
  ws.close();
}
main().catch(e => { console.error('FAIL', e); process.exitCode = 1; }).finally(async () => { await sleep(200); try { proc && proc.kill(); } catch (e) {} setTimeout(() => process.exit(process.exitCode || 0), 500); });
