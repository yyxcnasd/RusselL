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
    var works = {};
    if (currentId && state.works && state.works[currentId]) works[currentId] = state.works[currentId];
    data.circuits = circuits;
    data.works = works;
    data.lastId = currentId || data.lastId || null;
    data.savedAt = Date.now();
    return data;
  }

  /* 递归 canonical JSON：云存档和本地 state 的键顺序可能不同，但内容等价时
     不应重复 apply / 重载关卡。只比较进度字段，忽略 savedAt/exportedAt。 */
  function canonical(value) {
    if (Array.isArray(value)) return value.map(canonical);
    if (value && typeof value === 'object') {
      var out = {};
      Object.keys(value).sort().forEach(function (key) { out[key] = canonical(value[key]); });
      return out;
    }
    return value;
  }

  function progressKey(p) {
    p = p || {};
    return JSON.stringify(canonical({
      campaign: p.campaign || null,
      solved: p.solved || [],
      bestLen: p.bestLen || {},
      usedKinds: p.usedKinds || [],
      cleanWins: p.cleanWins || [],
      circuits: p.circuits || {},
      works: p.works || {},
      maxLen: p.maxLen || 0,
      levelKinds: p.levelKinds || {},
      usedOps: p.usedOps || [],
      usedAxioms: p.usedAxioms || [],
      nightOwl: !!p.nightOwl,
      fastWin: !!p.fastWin,
      failedChecks: p.failedChecks || 0,
      deletions: p.deletions || 0,
      pastes: p.pastes || 0,
      laterLemma: !!p.laterLemma,
      achievements: p.achievements || [],
      godMode: !!p.godMode,
      story: p.story || {},
      lastId: p.lastId || null
    }));
  }

  function equal(state, p) {
    if (!p) return false;
    var save = root.RSL.Save;
    var local = save ? save.payload(state) : {};
    /* 云端是精简存档：只带一个当前关卡电路。比较时也只取云端携带的电路 key，
       本地其它关卡的电路不会让“内容相同”误判为不同。 */
    var picked = {};
    Object.keys(p.circuits || {}).forEach(function (id) {
      if (local.circuits && local.circuits[id]) picked[id] = local.circuits[id];
    });
    local.circuits = picked;
    var pickedWorks = {};
    Object.keys(p.works || {}).forEach(function (id) {
      if (local.works && local.works[id]) pickedWorks[id] = local.works[id];
    });
    local.works = pickedWorks;
    return progressKey(local) === progressKey(p);
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
    state.godMode = !!p.godMode;
    state.storySeen = p.story || {};
    state.maxLen = typeof p.maxLen === 'number' ? p.maxLen : 0;
    state.levelKinds = p.levelKinds || {};
    state.usedOps = Array.isArray(p.usedOps) ? p.usedOps.slice() : [];
    state.usedAxioms = Array.isArray(p.usedAxioms) ? p.usedAxioms.slice() : [];
    state.nightOwl = !!p.nightOwl;
    state.fastWin = !!p.fastWin;
    state.failedChecks = typeof p.failedChecks === 'number' ? p.failedChecks : 0;
    state.deletions = typeof p.deletions === 'number' ? p.deletions : 0;
    state.pastes = typeof p.pastes === 'number' ? p.pastes : 0;
    state.laterLemma = !!p.laterLemma;
    /* 云端只保存精简电路；合并而不是整体覆盖，避免丢掉本机其它关卡的电路。 */
    state.circuits = Object.assign({}, state.circuits || {}, p.circuits || {});
    state.works = Object.assign({}, state.works || {}, p.works || {});
    state.lastId = p.lastId || null;
    return true;
  }

  root.RSL.CloudSave = {
    isToyHost: isToyHost,
    init: init,
    apply: apply,
    equal: equal,
    schedule: schedule,
    flush: flush
  };
})();
