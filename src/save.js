/* Local save schema, validation, migration, and storage.
 *
 * Schema v4：字段与 v3 相同，另加 campaign 指纹（关卡 code + targetTokens 的
 * FNV-1a 哈希）与未通关画布 works。旧关卡代号会被新 campaign 复用，所以 v4 之前
 * 的存档不能按 code/id 直接套用；migrate() 用旧代号 → targetTokens 的查表（由
 * src/legacy-targets.js 提供）按 canonical token 重新映射到当前关卡。
 *
 * localStorage key 保持 'axiom-simple:v2'，避免已发布版本的存档丢失。
 * clean() 接受 v1/v2/v3（字段按 v2/v3 形状归一化）；只拒绝比当前 schema 更新
 * 的版本或明显损坏的存档。
 */
(function () {
  'use strict';
  var root = typeof window !== 'undefined' ? window : globalThis;
  root.RSL = root.RSL || {};

  var KEY = 'axiom-simple:v2';
  var BACKUP_KEY = 'axiom-simple:pre-v4';
  var SCHEMA_VERSION = 4;
  var ACCEPTED_VERSIONS = [1, 2, 3, 4];

  function strings(v) {
    return Array.isArray(v) ? v.filter(function (x) { return typeof x === 'string' && x; }) : [];
  }
  function object(v) {
    return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
  }
  function unique(list) {
    var seen = Object.create(null), out = [];
    (list || []).forEach(function (x) {
      if (typeof x !== 'string' || !x || seen[x]) return;
      seen[x] = true;
      out.push(x);
    });
    return out;
  }
  function lengths(v) {
    var src = object(v), out = {};
    Object.keys(src).forEach(function (id) {
      var n = src[id];
      if (typeof n === 'number' && isFinite(n) && n >= 0) out[id] = Math.floor(n);
    });
    return out;
  }

  /** 每关实际用过的模块 kind（用于“徒手”等成就），只保留字符串数组。 */
  function kindsMap(v) {
    var src = object(v), out = {};
    Object.keys(src).forEach(function (id) {
      var list = unique(strings(src[id]));
      if (list.length) out[id] = list;
    });
    return out;
  }

  /** targetTokens 的 canonical key（用于快速精确匹配；T.eq 再兜底）。 */
  function tokenKey(tokens) {
    return Array.isArray(tokens) && tokens.length ? JSON.stringify(tokens) : null;
  }

  /** 两串 target token 是否表示同一目标：优先用 Term.eq 的 canonical 语义。 */
  function sameTokens(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) return false;
    var Term = root.RSL.Term;
    if (Term && typeof Term.eq === 'function') {
      try { return Term.eq(a, b); } catch (e) { /* 非法 token 退化为精确比较 */ }
    }
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i += 1) if (a[i] !== b[i]) return false;
    return true;
  }

  /** FNV-1a 32-bit，十六进制 8 位。 */
  function hash(text) {
    var h = 0x811c9dc5;
    for (var i = 0; i < text.length; i += 1) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return ('00000000' + h.toString(16)).slice(-8);
  }

  /** campaign 指纹：顺序 + code + targetTokens 全参与，关卡内容变则指纹变。 */
  function campaignOf(levels) {
    if (!Array.isArray(levels) || !levels.length) return null;
    var parts = [];
    levels.forEach(function (lv) {
      if (!lv || typeof lv !== 'object') return;
      var tokens = Array.isArray(lv.targetTokens) ? lv.targetTokens : [];
      parts.push(String(lv.code || lv.id || '') + '\u0001' + tokens.join('\u001f'));
    });
    if (!parts.length) return null;
    return 'fnv1a-' + hash(parts.join('\u0002'));
  }

  function payload(state, campaign) {
    state = state || {};
    return {
      version: SCHEMA_VERSION,
      campaign: campaign !== undefined ? campaign : campaignOf(state.levels),
      solved: Object.keys(state.solved || {}),
      bestLen: lengths(state.bestLen),
      usedKinds: Object.keys(state.usedKinds || {}),
      cleanWins: Object.keys(state.cleanWins || {}),
      circuits: circuits(state.circuits),
      works: circuits(state.works),
      maxLen: Math.max(0, state.maxLen | 0),
      levelKinds: kindsMap(state.levelKinds),
      usedOps: unique(strings(state.usedOps)),
      nightOwl: !!state.nightOwl,
      achievements: Object.keys(state.achievements || {}),
      godMode: !!state.godMode,
      story: object(state.storySeen),
      lastId: state.level && state.level.id ? state.level.id : (typeof state.lastId === 'string' ? state.lastId : null)
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

  /** 结构校验 + 版本归一化。v1/v2/v3 的字段按 v2/v3 形状读取。 */
  function clean(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('bad save');
    var version = raw.version;
    if (version !== undefined) {
      if (typeof version !== 'number' || !isFinite(version) || Math.floor(version) !== version ||
        version < 1 || ACCEPTED_VERSIONS.indexOf(version) < 0) {
        throw new Error('bad save version: ' + String(version));
      }
    }
    var sourceVersion = version === undefined ? 0 : version;
    /* 云端 init 会先 clean 一次再交给 migrate；保留原始版本号供迁移报告与判定。 */
    if (version === SCHEMA_VERSION && !raw.campaign &&
      typeof raw.sourceVersion === 'number' && ACCEPTED_VERSIONS.indexOf(raw.sourceVersion) >= 0) {
      sourceVersion = raw.sourceVersion;
    }
    var campaign = typeof raw.campaign === 'string' && raw.campaign ? raw.campaign : null;
    return {
      version: SCHEMA_VERSION,
      campaign: campaign,
      sourceVersion: sourceVersion,
      solved: unique(strings(raw.solved)),
      bestLen: lengths(raw.bestLen),
      usedKinds: unique(strings(raw.usedKinds)),
      cleanWins: unique(strings(raw.cleanWins)),
      circuits: circuits(raw.circuits),
      works: circuits(raw.works),
      maxLen: typeof raw.maxLen === 'number' && isFinite(raw.maxLen) && raw.maxLen > 0 ? Math.floor(raw.maxLen) : 0,
      levelKinds: kindsMap(raw.levelKinds),
      usedOps: unique(strings(raw.usedOps)),
      nightOwl: raw.nightOwl === true,
      achievements: unique(strings(raw.achievements)),
      godMode: raw.godMode === true,
      story: object(raw.story),
      lastId: typeof raw.lastId === 'string' && raw.lastId ? raw.lastId : null
    };
  }

  function blankSave(campaign) {
    return {
      version: SCHEMA_VERSION,
      campaign: campaign || null,
      solved: [],
      bestLen: {},
      usedKinds: [],
      cleanWins: [],
      circuits: {},
      works: {},
      maxLen: 0,
      levelKinds: {},
      usedOps: [],
      nightOwl: false,
      achievements: [],
      godMode: false,
      story: {},
      lastId: null
    };
  }

  /** 旧存档查表：既接受裸 map（code → tokens），也接受 { levels: map }。 */
  function legacyTable(legacy) {
    if (!legacy || typeof legacy !== 'object') return null;
    var table = legacy.levels && typeof legacy.levels === 'object' ? legacy.levels : legacy;
    return table && typeof table === 'object' ? table : null;
  }

  function legacyTokens(legacy, id) {
    var table = legacyTable(legacy);
    if (!table || typeof id !== 'string') return null;
    var tokens = table[id];
    return Array.isArray(tokens) && tokens.length ? tokens : null;
  }

  function legacySize(legacy) {
    var table = legacyTable(legacy);
    return table ? Object.keys(table).length : 0;
  }

  /** 当前关卡的目标匹配器；同一目标只映射一次，避免重复目标被重复占用。 */
  function tokenMatcher(levels) {
    var exact = Object.create(null);
    var list = [];
    (levels || []).forEach(function (lv) {
      if (!lv || typeof lv !== 'object') return;
      var tokens = Array.isArray(lv.targetTokens) ? lv.targetTokens : null;
      var key = tokenKey(tokens);
      if (!key) return;
      var entry = { level: lv, tokens: tokens, used: false };
      list.push(entry);
      if (!exact[key]) exact[key] = [];
      exact[key].push(entry);
    });
    return {
      find: function (tokens) {
        var key = tokenKey(tokens);
        if (!key) return null;
        var bucket = exact[key] || [];
        for (var i = 0; i < bucket.length; i += 1) {
          if (!bucket[i].used) { bucket[i].used = true; return bucket[i].level; }
        }
        for (var j = 0; j < list.length; j += 1) {
          if (list[j].used) continue;
          if (sameTokens(tokens, list[j].tokens)) { list[j].used = true; return list[j].level; }
        }
        return null;
      }
    };
  }

  function idSet(levels) {
    var map = Object.create(null);
    (levels || []).forEach(function (lv) {
      if (lv && typeof lv.id === 'string') map[lv.id] = true;
    });
    return map;
  }

  function reportBase(src, toCampaign) {
    return {
      migrated: false,
      fromVersion: src.sourceVersion,
      fromCampaign: src.campaign || (src.sourceVersion ? 'legacy-v' + src.sourceVersion : 'legacy-unknown'),
      toCampaign: toCampaign,
      keptSolved: 0,
      droppedSolved: 0,
      keptBestLen: 0,
      droppedBestLen: 0,
      keptCleanWins: 0,
      droppedCleanWins: 0,
      keptCircuits: 0,
      droppedCircuits: 0,
      keptAchievements: src.achievements.length,
      keptUsedKinds: src.usedKinds.length,
      lastIdMapped: false,
      missingLegacy: false,
      droppedSolvedIds: [],
      droppedCircuitIds: [],
      mapping: {}
    };
  }

  /**
   * 把旧存档映射到当前 levels。
   * - 指纹一致：不重映射，仅过滤当前 campaign 不存在的关卡；
   * - 指纹不同 / 旧版本：用 legacy 查表按 targetTokens 重新映射 solved、
   *   bestLen、cleanWins、lastId，并丢弃旧电路（旧关卡 id 不能安全复用）。
   * 返回 { save, report }；返回的 save 永远是 v4 形状。
   */
  function migrate(raw, levels, legacy) {
    var src = clean(raw);
    /* 152 关旧档与 96 关旧档各有一张 code→target 表；按 code 合并且不覆盖。 */
    if (root.RSL.LEGACY_TARGETS_96) legacy = Object.assign({}, legacy || {}, root.RSL.LEGACY_TARGETS_96);
    var current = Array.isArray(levels) ? levels.filter(function (lv) { return lv && typeof lv === 'object'; }) : [];
    var toCampaign = campaignOf(current);
    var report = reportBase(src, toCampaign);

    if (!current.length) {
      /* 没有关卡表就无法判断映射；原样保留，绝不丢进度。 */
      report.missingLegacy = src.solved.length > 0;
      report.missingLevels = true;
      return { save: src, report: report };
    }

    var byId = idSet(current);

    if (src.campaign && src.campaign === toCampaign) {
      var save = blankSave(toCampaign);
      save.usedKinds = src.usedKinds.slice();
      save.achievements = src.achievements.slice();
      save.godMode = src.godMode;
      save.story = src.story;
      save.maxLen = src.maxLen;
      save.levelKinds = src.levelKinds;
      save.usedOps = src.usedOps.slice();
      save.nightOwl = src.nightOwl;
      save.solved = src.solved.filter(function (id) {
        if (byId[id]) return true;
        report.droppedSolvedIds.push(id);
        return false;
      });
      report.keptSolved = save.solved.length;
      report.droppedSolved = report.droppedSolvedIds.length;

      Object.keys(src.bestLen).forEach(function (id) {
        if (byId[id]) { save.bestLen[id] = src.bestLen[id]; report.keptBestLen += 1; }
        else report.droppedBestLen += 1;
      });
      src.cleanWins.forEach(function (id) {
        if (byId[id]) { save.cleanWins.push(id); report.keptCleanWins += 1; }
        else report.droppedCleanWins += 1;
      });
      Object.keys(src.circuits).forEach(function (id) {
        if (byId[id]) { save.circuits[id] = src.circuits[id]; report.keptCircuits += 1; }
        else { report.droppedCircuits += 1; report.droppedCircuitIds.push(id); }
      });
      Object.keys(src.works).forEach(function (id) {
        if (byId[id]) save.works[id] = src.works[id];
      });
      if (src.lastId && byId[src.lastId]) { save.lastId = src.lastId; report.lastIdMapped = true; }
      report.migrated = report.droppedSolved > 0 || report.droppedBestLen > 0 ||
        report.droppedCleanWins > 0 || report.droppedCircuits > 0 || src.sourceVersion !== SCHEMA_VERSION;
      return { save: save, report: report };
    }

    /* campaign 不匹配（或旧版本没有指纹）：按 target token 迁移。 */
    report.migrated = true;
    var save = blankSave(toCampaign);
    save.usedKinds = src.usedKinds.slice();
    save.achievements = src.achievements.slice();
    save.godMode = src.godMode;
    save.story = src.story;
    save.maxLen = src.maxLen;
    save.levelKinds = src.levelKinds;
    save.usedOps = src.usedOps.slice();
    save.nightOwl = src.nightOwl;
    var matcher = tokenMatcher(current);
    var mapping = report.mapping;
    var legacyCount = legacySize(legacy);

    function mapOld(oldId) {
      if (typeof oldId !== 'string' || !oldId) return null;
      if (Object.prototype.hasOwnProperty.call(mapping, oldId)) return mapping[oldId];
      var tokens = legacyTokens(legacy, oldId);
      if (!tokens) { mapping[oldId] = null; return null; }
      var level = matcher.find(tokens);
      mapping[oldId] = level ? String(level.id) : null;
      return mapping[oldId];
    }

    unique(src.solved).forEach(function (oldId) {
      var newId = mapOld(oldId);
      if (!newId) { report.droppedSolvedIds.push(oldId); return; }
      if (save.solved.indexOf(newId) < 0) save.solved.push(newId);
      report.keptSolved += 1;
    });
    report.droppedSolved = report.droppedSolvedIds.length;
    report.missingLegacy = src.solved.length > 0 && legacyCount === 0;

    Object.keys(src.bestLen).forEach(function (oldId) {
      var newId = mapOld(oldId);
      if (!newId) { report.droppedBestLen += 1; return; }
      var len = src.bestLen[oldId];
      if (!(newId in save.bestLen) || len < save.bestLen[newId]) save.bestLen[newId] = len;
      report.keptBestLen += 1;
    });

    src.cleanWins.forEach(function (oldId) {
      var newId = mapOld(oldId);
      if (!newId || save.cleanWins.indexOf(newId) >= 0) return;
      save.cleanWins.push(newId);
      report.keptCleanWins += 1;
    });
    report.droppedCleanWins = src.cleanWins.length - report.keptCleanWins;

    /* 旧电路属于旧 campaign 的节点/端口/定理代号，不能安全迁移到新关卡。 */
    Object.keys(src.circuits).forEach(function (id) {
      report.droppedCircuitIds.push(id);
    });
    report.droppedCircuits = report.droppedCircuitIds.length;

    if (src.lastId) {
      var lastId = mapOld(src.lastId);
      if (lastId) { save.lastId = lastId; report.lastIdMapped = true; }
    }
    return { save: save, report: report };
  }

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
    catch (e) { return {}; }
  }
  function store(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); return true; }
    catch (e) { return false; }
  }
  /** 迁移覆盖前留一份原始旧档（只留第一次），便于用户/维护者找回。 */
  function backup(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return false;
    try {
      if (localStorage.getItem(BACKUP_KEY) !== null) return true;
      localStorage.setItem(BACKUP_KEY, JSON.stringify(raw));
      return true;
    } catch (e) { return false; }
  }

  root.RSL.Save = {
    key: KEY,
    backupKey: BACKUP_KEY,
    version: SCHEMA_VERSION,
    acceptedVersions: ACCEPTED_VERSIONS,
    fingerprint: campaignOf,
    campaignOf: campaignOf,
    payload: payload,
    clean: clean,
    migrate: migrate,
    load: load,
    store: store,
    backup: backup
  };
})();
