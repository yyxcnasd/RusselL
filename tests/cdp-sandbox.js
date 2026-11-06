/* Sandbox: all parts, all 193 theorem modules, insertion. */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9346;
const profile = path.join(root, '.research', 'cdp-sandbox');
const url = 'file:///' + path.join(root, 'index.html').replace(/\\/g, '/') + '?autostart=1';
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
  await send('Runtime.enable'); await sleep(1600);
  await js('document.getElementById("startBtn").click()'); await sleep(500);
  const out = await js(`(function(){
    var app=window.RSL.APP;
    var i=app.state.levels.findIndex(l=>l.id==='SB-01');
    app.loadLevel(i,{force:true});
    var partCount=document.querySelectorAll('.part-card').length;
    var th=document.querySelector('.part-card[data-part="theorem:*4.51"]');
    if(th) th.click();
    return JSON.stringify({index:i,partCount:partCount,moduleCount:document.querySelectorAll('.module').length,hasTheorems:!!document.querySelector('[data-part^="theorem:"]'),level:document.getElementById('levelCode').textContent});
  })()`);
  console.log(out);
  ws.close();
}
main().catch(e => { console.error('FAIL', e); process.exitCode = 1; }).finally(async () => { await sleep(200); try { proc && proc.kill(); } catch (e) {} setTimeout(() => process.exit(process.exitCode || 0), 500); });
