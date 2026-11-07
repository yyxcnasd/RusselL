/* Simplified UI: all levels load, level grid, PM level, mobile. */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9351;
const profile = path.join(root, '.research', 'simple-ui');
let proc;
const sleep = ms => new Promise(r => setTimeout(r, ms));
try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) {}
async function main() {
  proc = spawn(edge, ['--headless=new', '--disable-gpu', '--remote-debugging-port=' + port, '--user-data-dir=' + profile, '--window-size=1440,900', 'file:///' + path.join(root, 'index.html').replace(/\\/g, '/')], { stdio: 'ignore' });
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
  await send('Runtime.enable'); await send('Page.enable'); await sleep(1400);
  const info = await js(`(function(){
    var app=window.RSL.APP; var list=[];
    for(var i=0;i<app.state.levels.length;i++){
      app.loadLevel(i);
      list.push({i:i,code:app.state.level.id,goal:document.getElementById('goalFormula').textContent,tiles:document.querySelectorAll('.tile').length});
    }
    return {count:app.state.levels.length, list:list};
  })()`);
  console.log('levels', info.count);
  const bad = info.list.filter(x => !x.goal || !x.tiles);
  console.log('bad', bad);
  const pm = info.list.find(x => x.code === 'PM-2.1');
  if (pm) { await js('window.RSL.APP.loadLevel(' + pm.i + ')'); await sleep(400); await shot('simple-pm.png'); }
  await js('document.getElementById("levelBtn").click()'); await sleep(300);
  console.log('level cells', await js('document.querySelectorAll(".level-cell").length'));
  await shot('simple-levels.png');
  await js('document.getElementById("overlay").click()'); await sleep(200);
  const longIdx = await js('window.RSL.APP.state.levels.findIndex(function(l){return l.code==="*4.87"})');
  if (longIdx >= 0) { await js('window.RSL.APP.loadLevel(' + longIdx + ')'); await sleep(400); await shot('simple-long.png'); console.log('long goal classes', await js('document.getElementById("goal").className')); }
  await js('window.RSL.APP.loadLevel(0)'); await sleep(300);
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send('Page.navigate', { url: 'file:///' + path.join(root, 'index.html').replace(/\\/g, '/') }); await sleep(1200);
  await shot('simple-mobile.png');
  console.log('overflow', await js('document.documentElement.scrollWidth + "/" + innerWidth'));
  ws.close();
}
main().catch(e => { console.error('FAIL', e); process.exitCode = 1; }).finally(async () => { await sleep(200); try { proc && proc.kill(); } catch (e) {} setTimeout(() => process.exit(process.exitCode || 0), 500); });
