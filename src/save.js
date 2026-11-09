/* Local save schema, validation, and storage.
 *
 * 当前 schema v3；clean() 接受 v2 并统一输出 v3。localStorage key 保持
 * 'axiom-simple:v2'，避免已发布版本的存档丢失。旧字段（usedArchive/usedTheorem/
 * coachSeen）会被忽略，不再读写。
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
      cleanWins: Object.keys(state.cleanWins || {}),
      circuits: object(state.circuits),
      achievements: Object.keys(state.achievements || {}),
      lastId: state.level ? state.level.id : state.lastId
    };
  }

  function circuits(v) {
    var src = object(v), out = {};
    Object.keys(src).forEach(function (id) {
      var c = src[id];
      if (!c || !Array.isArray(c.nodes) || !Array.isArray(c.edges)) return;
      var edges = c.edges.slice(0, 400);
      /* 终点连线必须保留，不能被 400 条上限截掉 */
      c.edges.forEach(function (e) {
        if (e && e.to && e.to.port === 'proof' && edges.indexOf(e) < 0) edges.push(e);
      });
      out[id] = { nodes: c.nodes.slice(0, 200), edges: edges };
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
      cleanWins: strings(raw.cleanWins),
      circuits: circuits(raw.circuits),
      achievements: strings(raw.achievements),
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
