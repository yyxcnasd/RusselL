/* B 站 Toy 云存档：登录账号 + 当前 Toy 隔离，自动同步，不提供上传/下载。
 * GitHub Pages / 本地仍走 localStorage。
 *
 * Toy 云存储单 key 上限 1024 字节、最多 128 个 key；这里把精简后的存档
 * 按 UTF-8 字节切片写成 rsl_save_0..N，只保存通关进度和当前关卡电路。
 */
(function () {
  'use strict';
  var root = typeof window !== 'undefined' ? window : globalThis;
  root.RSL = root.RSL || {};

  var PREFIX = 'rsl_save_';
  var COUNT = 'rsl_save_n';
  var CHUNK = 820;
  var timer = null;
  var retryTimer = null;
  var rateRetry = false;
  var lastWritten = '';
  var busy = false;
  var pending = null;
  var ready = false;
  var pendingState = null;

  function isToyHost() {
    return root.RSL.Hints ? root.RSL.Hints.isToyHost() : /bilibili\.com$/i.test(location.hostname);
  }

  function toy() {
    return root.toy && typeof root.toy.getCloudStorage === 'function' ? root.toy : null;
  }

  function setOf(list) {
    var map = {};
    (list || []).forEach(function (id) { map[id] = true; });
    return map;
  }

  function payload(state) {
    var save = root.RSL.Save;
    var data = save ? save.payload(state) : {};
    var currentId = state.level ? state.level.id : state.lastId;
    var circuits = {};
    if (currentId && state.circuits && state.circuits[currentId]) {
      circuits[currentId] = state.circuits[currentId];
    }
    data.circuits = circuits;
    data.lastId = currentId || data.lastId || null;
    data.savedAt = Date.now();
    return data;
  }

  function byteChunks(str) {
    var enc = new TextEncoder();
    var chars = Array.from(str);
    var chunks = [];
    var start = 0;
    var bytes = 0;
    for (var i = 0; i < chars.length; i++) {
      var n = enc.encode(chars[i]).length;
      if (bytes + n > CHUNK && i > start) {
        chunks.push(chars.slice(start, i).join(''));
        start = i;
        bytes = 0;
      }
      bytes += n;
    }
    if (start < chars.length || !chunks.length) chunks.push(chars.slice(start).join(''));
    return chunks;
  }

  function decode(all) {
    if (!all || all[COUNT] == null) return null;
    var n = parseInt(all[COUNT], 10);
    if (!isFinite(n) || n < 1 || n > 64) return null;
    var text = '';
    for (var i = 0; i < n; i++) {
      var part = all[PREFIX + i];
      if (typeof part !== 'string') return null;
      text += part;
    }
    try { return JSON.parse(text); } catch (e) { return null; }
  }

  function write(state) {
    var t = toy();
    if (!t || busy) return Promise.resolve(false);
    var data = payload(state);
    var text = JSON.stringify(data);
    if (text === lastWritten) return Promise.resolve(true);
    var chunks = byteChunks(text);
    if (chunks.length > 120) return Promise.resolve(false);
    var items = {};
    items[COUNT] = String(chunks.length);
    chunks.forEach(function (part, i) { items[PREFIX + i] = part; });
    busy = true;
    pending = state;
    return t.setCloudStorage(items).then(function () {
      lastWritten = text;
      rateRetry = false;
      busy = false;
      pending = null;
      return true;
    }).catch(function (error) {
      busy = false;
      pending = null;
      var limited = error && (error.code === 307044 || /307044/.test(String(error.message || '')));
      if (limited && !rateRetry) {
        rateRetry = true;
        if (!retryTimer) {
          retryTimer = setTimeout(function () {
            retryTimer = null;
            write(state);
          }, 2400);
        }
      }
      return false;
    });
  }

  function schedule(state) {
    if (!isToyHost()) return;
    if (!ready) { pendingState = state; return; }
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      timer = null;
      write(state);
    }, 1400);
  }

  function flush(state) {
    if (!ready) return Promise.resolve(false);
    if (timer) { clearTimeout(timer); timer = null; }
    if (pending) return Promise.resolve(false);
    return write(state);
  }

  function init(state) {
    if (!isToyHost()) { ready = true; return Promise.resolve(null); }
    var work = root.RSL.Hints.loadSdk().then(function () {
      if (!toy()) return null;
      return toy().getCloudStorage().then(function (all) {
        var raw = decode(all);
        if (!raw) return null;
        return root.RSL.Save.clean(raw);
      }).catch(function () { return null; });
    });
    return Promise.race([
      work,
      new Promise(function (resolve) { setTimeout(function () { resolve(null); }, 6000); })
    ]).then(function (result) {
      ready = true;
      var queued = pendingState;
      pendingState = null;
      if (queued) schedule(queued);
      return result;
    });
  }

  function apply(state, p) {
    if (!p) return false;
    state.solved = setOf(p.solved);
    state.bestLen = p.bestLen || {};
    state.usedKinds = setOf(p.usedKinds);
    state.cleanWins = setOf(p.cleanWins);
    state.achievements = setOf(p.achievements);
    state.circuits = p.circuits || {};
    state.lastId = p.lastId || null;
    return true;
  }

  root.RSL.CloudSave = {
    isToyHost: isToyHost,
    init: init,
    apply: apply,
    schedule: schedule,
    flush: flush
  };
})();
