'use strict';
/*
 * 共享的 Edge headless + CDP 测试骨架。
 *
 * 以前 tests/simple-*.js 每个文件都复制约 30 行 spawn / 轮询 /json/list /
 * WebSocket / Runtime.evaluate / Page.captureScreenshot 样板，而且只 console.log
 * 不 assert。这里把它抽成一个可靠的小库：
 *
 *   const { runTest, openPage, fileUrl, sleep } = require('./lib/browser');
 *   const { ok, equal } = require('./lib/expect');
 *
 *   runTest('simple-smoke', async () => {
 *     const page = await openPage({ width: 1440, height: 900 });
 *     await page.ready();
 *     equal(await page.js('document.querySelectorAll(".node").length'), 1, '初始 1 个模块');
 *     ...
 *   });
 *
 * 设计要点：
 *   - 端口：从 9360 起探测空闲端口，并带随机起点，避免并行脚本抢同一端口；
 *     打开失败会换端口重试（最多 attempts 次）。
 *   - profile：默认 .research/<随机名>（gitignored），关闭时尽力清理。
 *   - 截图：默认 .research/shots/，绝不默认写仓库 screenshots/；
 *     需要更新仓库截图时由脚本显式传 shotDir。
 *   - 进程：runTest 在 finally 里关闭所有页面；进程退出 / Ctrl+C 也会兜底 kill，
 *     Windows 用 taskkill /T 结束整棵进程树。
 */

const { spawn, spawnSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const net = require('net');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const EDGE = process.env.EDGE_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const RESEARCH = path.join(ROOT, '.research');
const SHOTS = path.join(RESEARCH, 'shots');
const DEFAULT_TIMEOUT = 15000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* =========================================================================
 * 进程 / 端口
 * ========================================================================= */

const LIVE = new Set();
const OPEN_PAGES = new Set();

function killTree(pid) {
  if (!pid) return;
  if (process.platform === 'win32') {
    try { spawnSync('taskkill', ['/PID', String(pid), '/T', '/F'], { stdio: 'ignore', windowsHide: true }); } catch (err) { /* ignore */ }
  } else {
    try { process.kill(-pid, 'SIGKILL'); } catch (err) {
      try { process.kill(pid, 'SIGKILL'); } catch (err2) { /* ignore */ }
    }
  }
}

function cleanupSync() {
  for (const entry of LIVE) {
    try {
      if (entry.proc && entry.proc.exitCode === null) killTree(entry.proc.pid);
    } catch (err) { /* ignore */ }
  }
  LIVE.clear();
}

process.once('exit', cleanupSync);
process.once('SIGINT', () => { cleanupSync(); process.exit(130); });
process.once('SIGTERM', () => { cleanupSync(); process.exit(143); });

function edgePath() {
  if (!fs.existsSync(EDGE)) {
    throw new Error('找不到 Edge 可执行文件：' + EDGE + '\n可用 EDGE_PATH 环境变量指向 msedge.exe');
  }
  return EDGE;
}

function fileUrl(rel) {
  return 'file:///' + path.join(ROOT, rel || 'index.html').replace(/\\/g, '/');
}

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.once('error', () => resolve(false));
    server.once('listening', () => server.close(() => resolve(true)));
    server.listen(port, '127.0.0.1');
  });
}

let portCursor = 9360 + Math.floor(Math.random() * 200);

async function pickPort() {
  const start = portCursor;
  for (let i = 0; i < 400; i += 1) {
    const port = start + i;
    if (port > 65535) break;
    if (await isPortFree(port)) {
      portCursor = port + 1;
      return port;
    }
  }
  throw new Error('在 ' + start + '… 范围内找不到空闲的 DevTools 端口');
}

async function listTargets(port) {
  const res = await fetch('http://127.0.0.1:' + port + '/json/list', { signal: AbortSignal.timeout(1200) });
  if (!res.ok) throw new Error('/json/list HTTP ' + res.status);
  const list = await res.json();
  if (!Array.isArray(list)) throw new Error('/json/list 返回非数组');
  return list;
}

async function waitForDevtools(port, proc, timeout) {
  const startedAt = Date.now();
  let lastError = null;
  while (Date.now() - startedAt < timeout) {
    if (proc.exitCode !== null) {
      throw new Error('Edge 已退出（code ' + proc.exitCode + '），调试端口 ' + port + ' 没有起来');
    }
    try {
      const list = await listTargets(port);
      if (list.length) return list;
    } catch (err) {
      lastError = err;
    }
    await sleep(150);
  }
  throw new Error('等待 Edge 调试端口 ' + port + ' 超时' + (lastError ? '（最后一次：' + lastError.message + '）' : ''));
}

function spawnEdge(port, profile, width, height, url, extraArgs) {
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + profile,
    '--window-size=' + width + ',' + height
  ].concat(extraArgs || [], [url]);
  return spawn(edgePath(), args, { stdio: 'ignore', windowsHide: true });
}

function makeProfile() {
  fs.mkdirSync(RESEARCH, { recursive: true });
  const dir = path.join(RESEARCH, 'edge-' + process.pid + '-' + crypto.randomBytes(4).toString('hex'));
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

async function removeProfile(profile) {
  /* Edge 的 crashpad / 子进程在 taskkill 之后还会短暂握着 profile 里的文件，
     所以先快后慢地重试；删不掉也不算测试失败（.research 本来就被 gitignore）。 */
  for (let i = 0; i < 12; i += 1) {
    if (!fs.existsSync(profile)) return true;
    try {
      fs.rmSync(profile, { recursive: true, force: true, maxRetries: 2, retryDelay: 100 });
    } catch (err) { /* ignore, retry below */ }
    if (!fs.existsSync(profile)) return true;
    await sleep(i < 3 ? 150 : 400);
  }
  return !fs.existsSync(profile);
}

/* =========================================================================
 * 页面对象
 * ========================================================================= */

function formatException(details) {
  if (!details) return '未知异常';
  if (details.exception && details.exception.description) return details.exception.description;
  if (details.exception && details.exception.value !== undefined) return String(details.exception.value);
  return details.text || '未知异常';
}

function consoleText(params) {
  return (params.args || []).map((arg) => {
    if (arg.value !== undefined) return typeof arg.value === 'string' ? arg.value : JSON.stringify(arg.value);
    if (arg.description !== undefined) return arg.description;
    return arg.type;
  }).join(' ');
}

async function attachPage(config) {
  const { port, proc, profile, ownsProfile, url, shotDir, callTimeout, consoleLogs } = config;

  const ws = new WebSocket(config.wsUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = () => reject(new Error('WebSocket 连接失败：' + config.wsUrl));
  });

  let seq = 0;
  let closed = false;
  const pending = new Map();

  const entry = { proc, ws, profile, closed: false };
  LIVE.add(entry);

  const failAll = (reason) => {
    for (const [, item] of pending) {
      clearTimeout(item.timer);
      item.reject(reason);
    }
    pending.clear();
  };

  ws.onmessage = (event) => {
    let message;
    try { message = JSON.parse(event.data); } catch (err) { return; }
    if (message.id && pending.has(message.id)) {
      const item = pending.get(message.id);
      pending.delete(message.id);
      clearTimeout(item.timer);
      if (message.error) item.reject(new Error('CDP ' + item.method + ' 失败：' + JSON.stringify(message.error)));
      else item.resolve(message.result);
      return;
    }
    if (message.method === 'Runtime.consoleAPICalled') {
      const type = message.params.type;
      consoleLogs.push({ type, text: consoleText(message.params) });
    } else if (message.method === 'Runtime.exceptionThrown') {
      consoleLogs.push({ type: 'exception', text: formatException(message.params.exceptionDetails) });
    } else if (message.method === 'Log.entryAdded' && message.params.entry) {
      const item = message.params.entry;
      consoleLogs.push({ type: 'log:' + item.level, text: item.text });
    }
  };
  ws.onclose = () => { if (!closed) failAll(new Error('WebSocket 已关闭')); };

  const send = (method, params) => new Promise((resolve, reject) => {
    if (closed) { reject(new Error('页面已关闭，无法调用 ' + method)); return; }
    const id = ++seq;
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error('CDP 调用超时（' + callTimeout + 'ms）：' + method));
    }, callTimeout);
    pending.set(id, { resolve, reject, timer, method });
    try {
      ws.send(JSON.stringify({ id, method, params: params || {} }));
    } catch (err) {
      clearTimeout(timer);
      pending.delete(id);
      reject(err);
    }
  });

  const js = async (expression) => {
    const code = typeof expression === 'function' ? '(' + expression.toString() + ')()' : String(expression);
    const result = await send('Runtime.evaluate', {
      expression: code,
      returnByValue: true,
      awaitPromise: true
    });
    if (result.exceptionDetails) {
      const snippet = code.length > 180 ? code.slice(0, 180) + '…' : code;
      throw new Error('页面脚本异常：' + formatException(result.exceptionDetails) + '\n  表达式：' + snippet);
    }
    return result.result ? result.result.value : undefined;
  };

  const page = {
    port,
    url,
    profile,
    pid: proc.pid,
    shotDir,
    consoleLogs,
    js,
    send,
    sleep,

    async shot(name, options) {
      const opts = options || {};
      const result = await send('Page.captureScreenshot', { format: 'png' });
      const raw = /\.png$/i.test(name) ? name : name + '.png';
      const file = path.isAbsolute(raw) ? raw : path.join(opts.dir || shotDir, raw);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, Buffer.from(result.data, 'base64'));
      return file;
    },

    async viewport(width, height, options) {
      const opts = options || {};
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: opts.deviceScaleFactor === undefined ? 1 : opts.deviceScaleFactor,
        mobile: opts.mobile === undefined ? width <= 700 : !!opts.mobile
      });
      await sleep(opts.settleMs === undefined ? 300 : opts.settleMs);
    },

    async waitFor(expression, options) {
      const opts = options || {};
      const timeout = opts.timeout || 8000;
      const interval = opts.interval || 60;
      const startedAt = Date.now();
      let lastError = null;
      for (;;) {
        try {
          const value = await js(expression);
          if (value) return value;
        } catch (err) {
          lastError = err;
        }
        if (Date.now() - startedAt > timeout) {
          const label = String(expression).length > 160 ? String(expression).slice(0, 160) + '…' : String(expression);
          throw new Error('waitFor 超时（' + timeout + 'ms）：' + label +
            (lastError ? '\n  最后一次错误：' + lastError.message : ''));
        }
        await sleep(interval);
      }
    },

    /* 等待应用初始化完成：文档就绪 + window.RSL.APP + 首关模块出现。 */
    async ready(options) {
      const opts = options || {};
      try {
        await page.waitFor('document.readyState === "complete" && !!(window.RSL && window.RSL.APP) && document.querySelectorAll(".node").length > 0', {
          timeout: opts.timeout || 20000
        });
      } catch (err) {
        const problems = consoleLogs.filter((item) => item.type === 'error' || item.type === 'exception');
        err.message += '\n  页面错误：' + (problems.length ? JSON.stringify(problems.slice(-8)) : '（无）');
        throw err;
      }
      await sleep(opts.settleMs === undefined ? 120 : opts.settleMs);
    },

    problems() {
      return consoleLogs.filter((item) => item.type === 'error' || item.type === 'exception' || item.type === 'log:error');
    },

    /* 发送真实按键（可信输入，会触发浏览器默认行为和页面 keydown 监听）。
       支持 Tab / Enter / Escape / Space / Delete / Backspace / 方向键。 */
    async key(name, options) {
      const opts = options || {};
      const VK = {
        Tab: 9, Enter: 13, Escape: 27, ' ': 32, Delete: 46, Backspace: 8,
        ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40
      };
      const CODE = {
        Tab: 'Tab', Enter: 'Enter', Escape: 'Escape', ' ': 'Space',
        Delete: 'Delete', Backspace: 'Backspace',
        ArrowLeft: 'ArrowLeft', ArrowUp: 'ArrowUp', ArrowRight: 'ArrowRight', ArrowDown: 'ArrowDown'
      };
      const vk = VK[name] || 0;
      const code = CODE[name] || (name.length === 1 ? 'Key' + name.toUpperCase() : name);
      const modifiers = opts.modifiers || 0;
      const base = { key: name, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk, modifiers };
      await send('Input.dispatchKeyEvent', Object.assign({ type: 'rawKeyDown' }, base));
      if (name === 'Enter') {
        await send('Input.dispatchKeyEvent', Object.assign({ type: 'char', text: '\r', unmodifiedText: '\r' }, base));
      }
      await send('Input.dispatchKeyEvent', Object.assign({ type: 'keyUp' }, base));
      await sleep(opts.settleMs === undefined ? 40 : opts.settleMs);
    },

    mouse: {      async down(x, y) {
        await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', buttons: 1, clickCount: 1 });
      },
      async move(x, y, buttons) {
        await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'left', buttons: buttons === undefined ? 1 : buttons });
      },
      async up(x, y) {
        await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', buttons: 0, clickCount: 1 });
      },
      async click(x, y, options) {
        const opts = options || {};
        const button = opts.button || 'left';
        await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button, buttons: 1, clickCount: 1 });
        await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button, buttons: 0, clickCount: 1 });
      },
      async rightClick(x, y) {
        await page.mouse.click(x, y, { button: 'right' });
      },
      /* 拖拽：按下 → 若干移动 → 抬起；steps 越大越接近真实拖动（pointermove 更多）。 */
      async drag(from, to, options) {
        const opts = options || {};
        const steps = opts.steps || 6;
        await page.mouse.down(from.x, from.y);
        for (let i = 1; i <= steps; i += 1) {
          const t = i / steps;
          await page.mouse.move(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t);
          if (opts.pauseMs) await sleep(opts.pauseMs);
        }
        await page.mouse.up(to.x, to.y);
      }
    },

    async close() {
      if (closed) return;
      closed = true;
      entry.closed = true;
      LIVE.delete(entry);
      OPEN_PAGES.delete(page);
      failAll(new Error('页面已关闭'));
      try { if (ws.readyState === 0 || ws.readyState === 1) ws.close(); } catch (err) { /* ignore */ }
      if (proc && proc.exitCode === null) {
        const exited = new Promise((resolve) => {
          const timer = setTimeout(resolve, 4000);
          proc.once('exit', () => { clearTimeout(timer); resolve(); });
        });
        killTree(proc.pid);
        await exited;
        /* 等进程树收尾，避免 profile 锁还没释放就被 rmSync。 */
        await sleep(150);
      }
      if (ownsProfile) await removeProfile(profile);
    }
  };

  for (const method of ['Runtime.enable', 'Page.enable', 'Log.enable']) {
    try { await send(method); } catch (err) { /* Log/Runtime 在极老版本可能缺失，不致命 */ }
  }
  return page;
}

/* =========================================================================
 * 对外 API
 * ========================================================================= */

async function openPage(options) {
  const opts = options || {};
  const width = opts.width || 1440;
  const height = opts.height || 900;
  const url = opts.url || fileUrl();
  const shotDir = path.resolve(opts.shotDir || SHOTS);
  const timeout = opts.timeout || DEFAULT_TIMEOUT;
  const attempts = opts.attempts || 3;
  const callTimeout = opts.callTimeout || 30000;
  const keepProfile = opts.keepProfile === true;
  const ownsProfile = !opts.profile;
  const profile = opts.profile ? path.resolve(opts.profile) : makeProfile();
  const consoleLogs = [];
  fs.mkdirSync(shotDir, { recursive: true });
  fs.mkdirSync(profile, { recursive: true });

  let lastError = null;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const port = await pickPort();
    let proc = null;
    try {
      proc = spawnEdge(port, profile, width, height, url, opts.args);
      const list = await waitForDevtools(port, proc, timeout);
      const target = list.find((item) => item.type === 'page' && /^file:/i.test(item.url || '')) ||
        list.find((item) => item.type === 'page') || list[0];
      if (!target || !target.webSocketDebuggerUrl) throw new Error('没有可用的 page target（list: ' + JSON.stringify(list.map((i) => i.type)) + '）');
      const page = await attachPage({
        wsUrl: target.webSocketDebuggerUrl,
        port,
        proc,
        profile,
        ownsProfile: ownsProfile && !keepProfile,
        url,
        shotDir,
        callTimeout,
        consoleLogs
      });
      OPEN_PAGES.add(page);
      return page;
    } catch (err) {
      lastError = err;
      if (proc && proc.exitCode === null) {
        killTree(proc.pid);
        await new Promise((resolve) => {
          const timer = setTimeout(resolve, 3000);
          proc.once('exit', () => { clearTimeout(timer); resolve(); });
        });
      }
      if (attempt < attempts) await sleep(250);
    }
  }
  if (ownsProfile && !keepProfile) await removeProfile(profile);
  throw new Error('打开页面失败（已尝试 ' + attempts + ' 次）：' + (lastError ? lastError.message : '未知错误'));
}

/* 测试主入口：跑 fn、打印一行 PASS、失败打印 stack 并 exit 1；
 * 无论成功失败都在 finally 里关闭本进程打开过的所有页面。 */
async function runTest(name, fn, options) {
  const opts = options || {};
  const timeout = opts.timeout || 180000;
  let timer = null;

  timer = setTimeout(() => {
    console.error('FAIL ' + name + '：超过 ' + timeout + 'ms 超时');
    cleanupSync();
    process.exit(1);
  }, timeout);
  if (timer.unref) timer.unref();

  try {
    await fn({
      openPage: async (pageOptions) => {
        const page = await openPage(pageOptions);
        OPEN_PAGES.add(page);
        return page;
      }
    });
    let count = 0;
    try { count = require('./expect').checks(); } catch (err) { count = 0; }
    console.log('PASS ' + name + (count ? ' (' + count + ' checks)' : ''));
  } catch (err) {
    console.error('FAIL ' + name);
    console.error((err && err.stack) || String(err));
    process.exitCode = 1;
  } finally {
    clearTimeout(timer);
    await Promise.allSettled(Array.from(OPEN_PAGES).map((page) => page.close()));
    cleanupSync();
    /* 给 stdout/stderr 一点时间刷出（Windows 管道是异步写）。 */
    await sleep(80);
    process.exit(process.exitCode || 0);
  }
}

module.exports = {
  ROOT,
  EDGE,
  RESEARCH,
  SHOTS,
  sleep,
  fileUrl,
  openPage,
  runTest,
  pickPort
};
