/* Local save schema, validation, and storage. */
(function () {
  'use strict';
  window.RSL = window.RSL || {};

  var KEY = 'axiom-simple:v2';

  function strings(v) {
    return Array.isArray(v) ? v.filter(function (x) { return typeof x === 'string'; }) : [];
  }
  function object(v) {
    return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
  }

  function payload(state) {
    return {
      version: 2,
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

  function clean(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('bad save');
    return {
      version: 2,
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

  window.RSL.Save = { key: KEY, payload: payload, clean: clean, load: load, store: store };
})();
