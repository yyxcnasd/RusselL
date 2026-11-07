/* Routing/overlap/dark-mode smoke. */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9354;
const profile = path.join(root, '.research', 'simple-routing');
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
  const info = await js(`(function(){
    var app=window.RSL.APP; var lv=app.state.levels.find(function(l){return l.id==='RU-07'});
    var target={id:'target',kind:'target',x:lv.targetPos.x,y:lv.targetPos.y,target:lv.target,config:{}};
    var nodes=[target].concat(JSON.parse(JSON.stringify(lv.solution.nodes)));
    var edges=lv.solution.edges.map(function(e,i){return {id:'e'+i,from:e.from,to:e.to}});
    app.state.board.setData(nodes,edges); app.state.board.fit(); app.refresh();
    var before=app.state.board.items.map(function(n){return {id:n.id,x:n.x,y:n.y}});
    app.state.board.addNode('atom',{name:'P'},{x:100,y:100});
    app.state.board.addNode('atom',{name:'Q'},{x:100,y:100});
    var after=app.state.board.items.slice(-2).map(function(n){return {id:n.id,x:n.x,y:n.y}});
    var used={}; var bad=0; var rects=app.state.board._rects();\n    edges.forEach(function(e){var a=app.state.board._portPoint(e.from.node,e.from.port),b=app.state.board._portPoint(e.to.node,e.to.port);if(!a||!b)return;var pts=app.state.board._route(a,b,rects.filter(function(r){return r.id!==e.from.node&&r.id!==e.to.node;}),used);pts.forEach(function(p){rects.forEach(function(r){if(r.id===e.from.node||r.id===e.to.node)return;if(p.x>r.x+2&&p.x<r.x+r.w-2&&p.y>r.y+2&&p.y<r.y+r.h-2)bad++;});});});\n    return {nodes:before.length,after:after,errors:app.state.results.errors.length,complete:app.state.results.complete,wires:document.querySelectorAll('.wire').length,badPins:bad};
  })()`);
  console.log(info);
  await sleep(500);
  await shot('routing.png');
  await js('document.getElementById("themeBtn").click()'); await sleep(400);
  console.log('theme', await js('document.documentElement.dataset.theme'), 'bg', await js('getComputedStyle(document.body).backgroundColor'));
  await shot('dark.png');
  ws.close();
}
main().catch(e => { console.error('FAIL', e); process.exitCode = 1; }).finally(async () => { await sleep(200); try { proc && proc.kill(); } catch (e) {} setTimeout(() => process.exit(process.exitCode || 0), 500); });

