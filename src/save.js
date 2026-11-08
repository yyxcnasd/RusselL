/* Local save schema, validation, and storage.
 *
 * Schema v3（P3）：内容字段与 v2 相同，版本号升级为 3；clean() 接受 v2 并升级到 v3
 * （目前 v2→v3 没有字段迁移，只是版本标记，后续 P5 会把电路里的公式换成 token）。
 * localStorage 的 key 保持 'axiom-simple:v2'，避免已发布版本的存档丢失。
 */
(function () {
  'use strict';
  window.RSL = window.RSL || {};

  var KEY = 'axiom-simple:v2';
  var SCHEMA_VERSION = 3;
  var ACCEPTED_VERSIONS = [2, 3];

  function strings(v) {
    return Array.isArray(v) ? v.filter(function (x) { return typeof x === 'string'; }) : [];
  }
  function object(v) {
    return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
  }

  function payload(state) {
    return {
      version: SCHEMA_VERSION,
      solved: Object.keys(state.solved || {}),
      bestLen: object(state.bestLen),
      usedKinds: Object.keys(state.usedKinds || {}),
      usedArchive: Object.keys(state.usedArchive || {}),
      usedTheorem: Object.keys(state.usedTheorem || {}),
      cleanWins: Object.keys(state.cleanWins || {}),
      circuits: object(state.circuits),
      achievements: Object.keys(state.achievements || {}),
      coachSeen: Object.keys(state.coachSeen || {}),
      lastId: state.level ? state.level.id : state.lastId
    };
  }

  function circuits(v) {
    var src = object(v), out = {};
    Object.keys(src).forEach(function (id) {
      var c = src[id];
      if (!c || !Array.isArray(c.nodes) || !Array.isArray(c.edges)) return;
      out[id] = { nodes: c.nodes.slice(0, 200), edges: c.edges.slice(0, 400) };
    });
    return out;
  }

  /** v2 与 v3 的字段一致；版本号只用于标记，clean 统一输出 v3。 */
  function clean(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('bad save');
    if (raw.version !== undefined && ACCEPTED_VERSIONS.indexOf(raw.version) < 0) {
      throw new Error('bad save version: ' + String(raw.version));
    }
    return {
      version: SCHEMA_VERSION,
      solved: strings(raw.solved),
      bestLen: object(raw.bestLen),
      usedKinds: strings(raw.usedKinds),
      usedArchive: strings(raw.usedArchive),
      usedTheorem: strings(raw.usedTheorem),
      cleanWins: strings(raw.cleanWins),
      circuits: circuits(raw.circuits),
      achievements: strings(raw.achievements),
      coachSeen: strings(raw.coachSeen),
      lastId: typeof raw.lastId === 'string' ? raw.lastId : null
    };
  }

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
    catch (e) { return {}; }
  }
  function store(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); return true; }
    catch (e) { return false; }
  }

  window.RSL.Save = {
    key: KEY,
    version: SCHEMA_VERSION,
    payload: payload,
    clean: clean,
    load: load,
    store: store
  };
})();
