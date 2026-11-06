/* Lightweight CDP smoke test: start screen -> add axiom -> wire -> verify -> win. */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9333;
const profile = path.join(root, '.research', 'cdp-profile');
const url = 'file:///' + path.join(root, 'index.html').replace(/\\/g, '/') + '?autostart=1';
let proc;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) {}
async function getJSON(p) {
  const res = await fetch('http://127.0.0.1:' + port + p);
  return res.json();
}

async function main() {
  proc = spawn(edge, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + profile,
    '--window-size=1440,1000',
    url
  ], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 40; i++) {
    await sleep(250);
    try { list = await getJSON('/json/list'); if (list && list.length) break; } catch (e) {}
  }
  if (!list) throw new Error('CDP not available');
  const page = list.find(x => x.type === 'page') || list[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let seq = 0;
  const pending = new Map();
  ws.onmessage = ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  };
  function send(method, params) {
    return new Promise((resolve, reject) => {
      const id = ++seq;
      pending.set(id, m => m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result));
      ws.send(JSON.stringify({ id, method, params: params || {} }));
    });
  }
  async function evalJS(expression) {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text || 'eval failed');
    return r.result.value;
  }
  await send('Runtime.enable');
  await send('Page.enable');
  await sleep(1200);
  console.log('boot visible:', await evalJS('!document.getElementById("boot").hidden'));
  await evalJS('document.getElementById("startBtn").click()');
  await sleep(700);
  console.log('level:', await evalJS('document.getElementById("levelCode").textContent + " " + document.getElementById("levelName").textContent'));
  console.log('modules:', await evalJS('document.querySelectorAll(".module").length'));
  console.log('parts:', await evalJS('document.querySelectorAll(".part-card").length'));
  const part = await evalJS('(function(){var e=document.querySelector("[data-part=\\"axiom:A1\\"]"); if(!e)return null; var r=e.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2};})()');
  console.log('A1 part center:', part);
  if (part) {
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: part.x, y: part.y, button: 'left', clickCount: 1 });
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: part.x, y: part.y, button: 'left', clickCount: 1 });
  }
  await sleep(500);
  console.log('modules after add:', await evalJS('document.querySelectorAll(".module").length'));
  const ports = await evalJS(`(function(){
    var out=document.querySelector('.module[data-kind="axiom"] .port-out');
    var inp=document.querySelector('.module-target .port-in');
    if(!out||!inp)return null;
    var a=out.getBoundingClientRect(), b=inp.getBoundingClientRect();
    return {ox:a.left+a.width/2,oy:a.top+a.height/2,ix:b.left+b.width/2,iy:b.top+b.height/2};
  })()`);
  console.log('ports:', ports);
  if (ports) {
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: ports.ox, y: ports.oy, button: 'left', clickCount: 1 });
    await sleep(100);
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: (ports.ox + ports.ix) / 2, y: (ports.oy + ports.iy) / 2, button: 'left' });
    await sleep(100);
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: ports.ix, y: ports.iy, button: 'left' });
    await sleep(100);
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: ports.ix, y: ports.iy, button: 'left', clickCount: 1 });
  }
  await sleep(500);
  console.log('wires:', await evalJS('document.querySelectorAll(".wire").length'));
  console.log('target state:', await evalJS('document.getElementById("targetState").dataset.state + " / " + document.getElementById("targetState").textContent'));
  await evalJS('document.getElementById("verifyBtn").click()');
  await sleep(700);
  console.log('sheet open:', await evalJS('document.getElementById("overlay").classList.contains("is-open")'));
  console.log('sheet title:', await evalJS('document.getElementById("sheetTitle").textContent'));
  console.log('win:', await evalJS('!!document.querySelector(".win")'));
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(root, '.research', 'cdp-win.png'), Buffer.from(shot.data, 'base64'));
  console.log('screenshot saved');
  ws.close();
}

main().catch(e => { console.error('FAIL', e); process.exitCode = 1; }).finally(async () => {
  await sleep(200);
  try { proc && proc.kill(); } catch (e) {}
  setTimeout(() => process.exit(process.exitCode || 0), 500);
});

