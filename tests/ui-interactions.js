/* Interaction checks: pin grid, right-click delete, assertion turnstiles, predicate completion. */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9356;
const profile = path.join(root, '.research', 'ui-interactions');
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
  await send('Runtime.enable'); await sleep(1300);
  await js('window.RSL.APP.state.forceUnlock=true');

  // Pin alignment + assertion turnstile
  await js('document.querySelector(".tile").click()'); await sleep(300);
  console.log('pins', await js(`(function(){var b=window.RSL.APP.state.board,n=b.items.find(function(x){return x.kind==='axiom'});var p=b._portPoint(n.id,'out');var t=b.node('target');var ti=b._portPoint('target','proof');return {node:[n.x%16,n.y%16],raw:[n.x,n.y,p.x,p.y],target:[t.x,t.y,ti.x,ti.y],pin:[p.x%16,p.y%16],turnstiles:document.querySelectorAll('.node-turnstile').length,deleteBtns:document.querySelectorAll('#deleteBtn,.node-x').length};})()`));

  // Right-click node delete
  const before = await js('window.RSL.APP.state.board.items.length');
  await js('(function(){var el=document.querySelector(".node[data-kind=axiom]");el.dispatchEvent(new MouseEvent("contextmenu",{bubbles:true,cancelable:true,button:2}));})()');
  await sleep(300);
  console.log('node delete', before, '->', await js('window.RSL.APP.state.board.items.length'));

  // Right-click wire delete
  await js('document.querySelector(".tile").click()'); await sleep(250);
  await js(`(function(){var app=window.RSL.APP,b=app.state.board;var a=b.items.find(function(x){return x.kind==='axiom'});var t=b.node('target');b.connect(a.id,'out','target','proof');})()`);
  await sleep(300);
  const wb = await js('window.RSL.APP.state.board.edges.length');
  await js('(function(){var w=document.querySelector(".wire-hit");if(w)w.dispatchEvent(new MouseEvent("contextmenu",{bubbles:true,cancelable:true,button:2}));})()');
  await sleep(300);
  console.log('wire delete', wb, '->', await js('window.RSL.APP.state.board.edges.length'));

  // Predicate level completion through the real UI
  const pred = await js(`(function(){
    var app=window.RSL.APP, i=app.state.levels.findIndex(function(l){return l.id==='PC-01'});
    app.loadLevel(i);
    var lv=app.state.level, b=app.state.board;
    var target={id:'target',kind:'target',x:lv.targetPos.x,y:lv.targetPos.y,target:lv.target,config:{}};
    var nodes=[target].concat(JSON.parse(JSON.stringify(lv.solution.nodes)));
    var edges=lv.solution.edges.map(function(e,n){return {id:'e'+n,from:e.from,to:e.to}});
    b.setData(nodes,edges); app.refresh();
    var complete=app.state.results.complete;
    document.getElementById('checkBtn').click();
    return {complete:complete, win:!!document.querySelector('.win'), errors:app.state.results.errors.length};
  })()`);
  console.log('predicate', pred);

  const eq = await js(`(function(){
    var app=window.RSL.APP, i=app.state.levels.findIndex(function(l){return l.id==='EQ-04'});
    app.loadLevel(i);
    var lv=app.state.level, b=app.state.board;
    var target={id:'target',kind:'target',x:lv.targetPos.x,y:lv.targetPos.y,target:lv.target,config:{}};
    var nodes=[target].concat(JSON.parse(JSON.stringify(lv.solution.nodes)));
    var edges=lv.solution.edges.map(function(e,n){return {id:'e'+n,from:e.from,to:e.to}});
    b.setData(nodes,edges); app.refresh();
    var complete=app.state.results.complete;
    document.getElementById('checkBtn').click();
    return {complete:complete, win:!!document.querySelector('.win'), target:lv.target, tiles:document.querySelectorAll('.tile').length};
  })()`);
  console.log('equality', eq);
  ws.close();
}
main().catch(e => { console.error('FAIL', e); process.exitCode = 1; }).finally(async () => { await sleep(200); try { proc && proc.kill(); } catch (e) {} setTimeout(() => process.exit(process.exitCode || 0), 500); });



