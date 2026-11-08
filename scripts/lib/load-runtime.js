#!/usr/bin/env node
'use strict';
/*
 * 统一运行时装载器：以经典 <script> 方式在 vm 上下文里加载 src/*.js。
 *
 * 本仓库不使用 ES module / 打包器：index.html 按顺序加载 src/*.js，
 * 每个文件往 window.RSL 上挂命名空间。测试与脚本（tests/levels.test.js、
 * scripts/gen-levels.js、scripts/prove.js …）需要在 Node 里复现同一环境，
 * 以前各自写一份 vm.createContext + runInContext 样板；现在统一走这里。
 *
 * 用法：
 *   const { loadRuntime } = require('../lib/load-runtime');
 *
 *   // 最小集合（logic + library + levels），再追加 engine.js
 *   const RSL = loadRuntime({ withEngine: true });
 *
 *   // 完整关卡校验（顺序即 index.html 的顺序）
 *   const RSL = loadRuntime({
 *     files: ['src/logic.js', 'src/archive.js', 'src/library.js',
 *             'src/levels.js', 'src/levels-generated.js', 'src/engine.js']
 *   });
 *
 *   // 只加载一个文件，并注入 localStorage stub（save.js 这类需要存档的实现）
 *   const RSL = loadRuntime({ files: ['src/save.js'], localStorage: true });
 *
 * 选项：
 *   files        string[]  相对仓库根（也接受绝对路径）的文件列表；默认 DEFAULT_FILES
 *   withEngine   boolean   确保 src/engine.js 被追加到末尾（若尚未包含）
 *   globals      object    额外注入 vm 上下文的全局变量（覆盖默认值）
 *   localStorage boolean|object
 *                           true 注入内存版 localStorage（可 save/load 往返），
 *                           也可直接传入自定义实现
 *   root         string    仓库根，默认脚本所在仓库；少数场景（fixture）可覆盖
 *   console      object    注入的 console，默认 Node console
 *   withContext  boolean   true 时返回 { RSL, ctx }，便于检查 vm 上下文本身
 *
 * 返回 ctx.window.RSL（默认）；若上下文里没有 window.RSL 会直接抛错，
 * 避免调用方在 undefined 上继续执行、得到难查的 TypeError。
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');

/* 生成器与多数测试需要的最小加载顺序；engine.js 由 withEngine 追加。 */
const DEFAULT_FILES = ['src/logic.js', 'src/library.js', 'src/levels.js'];

/* vm 全局：至少覆盖 index.html 里脚本实际用到的宿主对象；
   多注入 Set/Map/URLSearchParams 不会改变行为，但能避免新代码踩坑。 */
const BASE_GLOBALS = {
  JSON,
  Math,
  Date,
  Set,
  Map,
  URLSearchParams,
  Promise,
  Number,
  String,
  Boolean,
  Array,
  Object
};

/* 内存版 localStorage：与浏览器行为一致（值总是字符串、getItem 缺失返回 null）。 */
function createMemoryStorage(seed) {
  const store = new Map();
  if (seed && typeof seed === 'object') {
    for (const key of Object.keys(seed)) store.set(key, String(seed[key]));
  }
  return {
    get length() { return store.size; },
    getItem(key) {
      key = String(key);
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) { store.set(String(key), String(value)); },
    removeItem(key) { store.delete(String(key)); },
    clear() { store.clear(); },
    key(index) { return Array.from(store.keys())[index] ?? null; },
    /* 调试便利：读取底层快照，不影响浏览器语义。 */
    _dump() { return Object.fromEntries(store); }
  };
}

function resolveFile(root, rel) {
  const full = path.isAbsolute(rel) ? rel : path.join(root, rel);
  if (!fs.existsSync(full)) throw new Error('loadRuntime: 找不到 ' + rel + '（' + full + '）');
  return full;
}

function loadRuntime(options) {
  const opts = options || {};
  const root = opts.root ? path.resolve(opts.root) : ROOT;
  const files = (opts.files ? opts.files.slice() : DEFAULT_FILES.slice()).map(String);

  if (opts.withEngine && !files.some((f) => /(^|[\\/])engine\.js$/.test(f))) {
    files.push('src/engine.js');
  }
  if (!files.length) throw new Error('loadRuntime: files 不能为空');

  const sandbox = Object.assign({
    window: {},
    console: opts.console || console
  }, BASE_GLOBALS, opts.globals || {});

  if (opts.localStorage) {
    sandbox.localStorage = opts.localStorage === true ? createMemoryStorage() : opts.localStorage;
  }

  /* 与 index.html 的经典脚本环境一致：globalThis 指向同一沙箱对象。 */
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);

  for (const rel of files) {
    const full = resolveFile(root, rel);
    vm.runInContext(fs.readFileSync(full, 'utf8'), sandbox, { filename: rel });
  }

  const RSL = sandbox.window && sandbox.window.RSL;
  if (!RSL) {
    throw new Error('loadRuntime: ' + files.join(' → ') + ' 没有在 window 上导出 RSL');
  }
  if (opts.withContext) return { RSL, ctx: sandbox };
  return RSL;
}

module.exports = {
  ROOT,
  DEFAULT_FILES,
  loadRuntime,
  createMemoryStorage
};
