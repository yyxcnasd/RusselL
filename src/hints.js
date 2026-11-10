/* 关卡提示：三个层级。
 * 1 方向（自动） / 2 思路（点赞指定视频） / 3 接近完整解法（关注 UP 主）。
 * B 站 Toy 内需要站内互动；预览页与作者本人直接看全部。
 */
(function () {
  'use strict';
  var root = typeof window !== 'undefined' ? window : globalThis;
  root.RSL = root.RSL || {};

  var AUTHOR = {
    mid: '3461564009024072',
    name: '夜与星尘_NaSd'
  };
  var VIDEO = 'BV1pk4J68Egx'; // RusselL - 公理板 | 如果公理系统变成游戏

  var OVERRIDES = {};


  var sdkPromise = null;

  function isToyHost() {
    return /bilibili\.com$/i.test(location.hostname) || /^\/toy\//i.test(location.pathname);
  }

  function isPreview() {
    return /^\/toy\/preview\//i.test(location.pathname);
  }

  function loadSdk() {
    if (root.toy) return Promise.resolve(true);
    if (!isToyHost()) return Promise.resolve(false);
    if (sdkPromise) return sdkPromise;
    sdkPromise = new Promise(function (resolve) {
      var done = false;
      function finish(ok) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(!!ok);
      }
      var timer = setTimeout(function () { finish(!!root.toy); }, 4000);
      var s = document.createElement('script');
      s.src = 'https://s1.hdslb.com/bfs/seed/toy/app/sdk/toy-sdk.js';
      s.onload = function () { finish(!!root.toy); };
      s.onerror = function () { finish(false); };
      document.head.appendChild(s);
    });
    return sdkPromise;
  }

  function sanitize(s) {
    return String(s || '')
      .replace(/\bA\b/g, 'P')
      .replace(/\bB\b/g, 'Q')
      .replace(/\bC\b/g, 'R');
  }

  function baseHint(level) {
    if (level.hard) return '';
    return OVERRIDES[level.id] || OVERRIDES[level.code] || level.hint || level.teaches || '';
  }

  function text(level) {
    return level ? sanitize(baseHint(level)) : '';
  }

  function tier1(level) {
    var h = sanitize(baseHint(level)).trim();
    var info = graphInfo(level);
    var roots = info.rootSources.map(function (n) { return '#' + info.index[n.id] + ' ' + shortLabel(n); });
    var tail = roots.length ? ' 目标最后由 ' + roots.join('、') + ' 接到 ⊢。' : '';
    return h + tail;
  }

  function graphInfo(level) {
    var sol = level.solution || { nodes: [], edges: [] };
    var byId = Object.create(null);
    sol.nodes.forEach(function (n) { byId[n.id] = n; });
    var initial = level.initialNodes || [];
    initial.forEach(function (n) { byId[n.id] = n; });
    var incoming = Object.create(null);
    sol.edges.forEach(function (e) {
      (incoming[e.to.node] = incoming[e.to.node] || []).push(e);
    });
    function portRank(e) {
      var n = byId[e.to.node];
      var info = n && root.RSL.Engine ? root.RSL.Engine.info(n.kind) : null;
      var inputs = info && info.ports ? info.ports.inputs : [];
      var i = inputs.map(function (p) { return p.id; }).indexOf(e.to.port);
      return i < 0 ? 99 : i;
    }
    Object.keys(incoming).forEach(function (id) {
      incoming[id].sort(function (a, b) { return portRank(a) - portRank(b); });
    });
    var indeg = Object.create(null), out = Object.create(null);
    sol.nodes.forEach(function (n) { indeg[n.id] = 0; out[n.id] = []; });
    sol.edges.forEach(function (e) {
      if (indeg[e.from.node] == null || indeg[e.to.node] == null) return;
      indeg[e.to.node] += 1;
      out[e.from.node].push(e.to.node);
    });
    var queue = sol.nodes.filter(function (n) { return indeg[n.id] === 0; });
    var order = [];
    while (queue.length) {
      var n = queue.shift();
      order.push(n);
      out[n.id].forEach(function (id) {
        indeg[id] -= 1;
        if (indeg[id] === 0) queue.push(byId[id]);
      });
    }
    if (order.length !== sol.nodes.length) order = sol.nodes.slice();
    var index = Object.create(null);
    order.forEach(function (n, i) { index[n.id] = i + 1; });
    var target = initial.filter(function (n) { return n.kind === 'target'; })[0];
    var rootSources = target ? (incoming[target.id] || []).map(function (e) { return byId[e.from.node]; }).filter(Boolean) : [];
    return { byId: byId, incoming: incoming, order: order, index: index, target: target, rootSources: rootSources };
  }

  function shortLabel(n) {
    if (!n) return '?';
    var c = n.config || {};
    if (n.kind === 'axiom') return (c.schema || 'axiom') + (c.v ? '(' + c.v + ')' : '');
    if (n.kind === 'def-expand') return 'D';
    if (n.kind === 'def-contract') return 'D⁻';
    if (n.kind === 'theorem') return '*' + String(c.code || '');
    if (n.kind === 'atom') return c.name || 'atom';
    if (n.kind === 'term') return c.name || 'term';
    if (n.kind === 'pred') return c.symbol || 'pred';
    if (n.kind === 'all' || n.kind === 'exists') return n.kind + (c.v ? '(' + c.v + ')' : '');
    return n.kind;
  }

  function targetText(level) {
    if (!level.targetTokens) return '';
    var map = { '|-': '⊢', '->': '→', '/\\': '∧', '\\/': '∨', '<->': '↔', 'A.': '∀', 'E.': '∃', 'e.': '∈', '=': '=', '-.': '¬' };
    return level.targetTokens.map(function (t) { return map[t] || t; }).join(' ');
  }

  function branchLines(info, id, depth, seen) {
    if (depth <= 0) return [];
    var n = info.byId[id];
    if (!n) return [];
    var prefix = '#' + info.index[n.id] + ' ' + shortLabel(n);
    var lines = [];
    (info.incoming[id] || []).forEach(function (e) {
      if (seen[e.from.node]) return;
      var src = info.byId[e.from.node];
      if (!src) return;
      lines.push(prefix + '.' + e.to.port + ' ← #' + info.index[src.id] + ' ' + shortLabel(src));
      seen[src.id] = true;
      lines = lines.concat(branchLines(info, src.id, depth - 1, seen));
    });
    return lines;
  }

  function tier2(level) {
    var info = graphInfo(level);
    var lines = ['目标：' + targetText(level)];
    if (info.target) {
      (info.incoming[info.target.id] || []).forEach(function (e) {
        var src = info.byId[e.from.node];
        if (!src) return;
        lines.push('目标 ← #' + info.index[src.id] + ' ' + shortLabel(src) + '.' + e.from.port);
        lines = lines.concat(branchLines(info, src.id, 2, Object.create(null)));
      });
    }
    if (lines.length === 1) lines.push(sanitize(baseHint(level)));
    return lines.join('\n');
  }

  function tier3(level) {
    var info = graphInfo(level);
    var sol = level.solution || { nodes: [], edges: [] };
    var lines = ['modules:'];
    info.order.forEach(function (n) {
      lines.push('#' + info.index[n.id] + '  ' + nodeLabel(n));
    });
    lines.push('', 'wires:');
    sol.edges.forEach(function (e) {
      var from = info.index[e.from.node] ? '#' + info.index[e.from.node] : '?';
      var to = e.to.node === (info.target && info.target.id)
        ? 'target'
        : (info.index[e.to.node] ? '#' + info.index[e.to.node] : '?');
      lines.push(from + '.' + e.from.port + ' -> ' + to + '.' + e.to.port);
    });
    return lines.join('\n');
  }

  function configText(cfg) {
    if (!cfg) return '';
    var parts = [];
    Object.keys(cfg).forEach(function (k) {
      if (cfg[k] == null || cfg[k] === '') return;
      parts.push(k + '=' + cfg[k]);
    });
    return parts.length ? '(' + parts.join(', ') + ')' : '';
  }

  /** 定理编号统一成 English 标签：theorem *NN；教学关引用显示 theorem *i 之类。 */
  function theoremLabel(cfg) {
    cfg = cfg || {};
    var raw = cfg.code != null ? cfg.code : cfg.n;
    if (raw == null || String(raw).trim() === '') return 'theorem *?';
    var s = String(raw).trim();
    var m = /([ⅠⅡⅢⅣ])-(\d+)/.exec(s);
    if (m) return 'theorem *' + m[2];
    if (/^\d+$/.test(s)) return 'theorem *' + s.padStart(2, '0');
    if (/^[ivx]+$/.test(s)) return 'theorem *' + s;
    return 'theorem *?';
  }

  /* 参考解页的节点标签：English/ASCII，公式保持符号（tier3 不含中文）。 */
  function nodeLabel(n) {
    var c = n.config || {};
    if (n.kind === 'theorem') return theoremLabel(c);
    if (n.kind === 'axiom') return 'axiom ' + (c.schema || 'A?') + (c.v ? '(' + c.v + ')' : '');
    if (n.kind === 'def-expand') return 'def-expand D';
    if (n.kind === 'def-contract') return 'def-contract D⁻';
    if (n.kind === 'atom') return 'atom ' + (c.name || 'P');
    if (n.kind === 'term') return 'term ' + (c.name || 'x');
    if (n.kind === 'pred') return 'pred ' + (c.symbol || 'F');
    if (n.kind === 'subst') return 'subst S';
    if (n.kind === 'mp') return 'mp M';
    if (n.kind === 'all' || n.kind === 'exists') return n.kind + configText(c);
    return n.kind + configText(c);
  }

  function pages(level) {
    return [tier1(level), tier2(level), tier3(level)];
  }

  function access() {
    if (isPreview()) {
      return Promise.resolve({ preview: true, author: true, liked: true, followed: true });
    }
    return loadSdk().then(function (hasToy) {
      if (!hasToy || !root.toy) return { preview: false, author: false, liked: false, followed: false };
      var rel = Promise.resolve(null);
      var likes = Promise.resolve(null);
      if (typeof root.toy.getAuthorRelation === 'function') {
        rel = root.toy.getAuthorRelation().catch(function () { return null; });
      }
      if (typeof root.toy.getVideoUserActions === 'function') {
        likes = root.toy.getVideoUserActions({ videos: [{ bvid: VIDEO }] }).catch(function () { return null; });
      }
      return Promise.all([rel, likes]).then(function (res) {
        var relation = res[0] && res[0].status === 'ok' ? res[0].data : null;
        var item = res[1] && res[1].items && res[1].items[0];
        return {
          preview: false,
          author: !!(relation && relation.isAuthor),
          followed: !!(relation && (relation.isFollowing || relation.isAuthor)),
          liked: !!(item && item.status === 'ok' && item.liked)
        };
      }).catch(function () {
        return { preview: false, author: false, liked: false, followed: false };
      });
    });
  }

  function checkGate() {
    return access().then(function (a) {
      return {
        mode: a.preview ? 'toy' : 'toy',
        allowed: a.followed || a.author || a.preview,
        reason: a.preview ? 'preview' : (a.followed ? 'following' : 'not-following')
      };
    });
  }

  function follow() {
    if (root.toy && typeof root.toy.navigate === 'function') {
      return root.toy.navigate({ type: 'space', id: AUTHOR.mid });
    }
    window.open('https://space.bilibili.com/' + AUTHOR.mid, '_blank', 'noopener');
    return Promise.resolve();
  }

  function likeVideo() {
    if (root.toy && typeof root.toy.navigate === 'function') {
      return root.toy.navigate({ type: 'video', id: VIDEO });
    }
    window.open('https://www.bilibili.com/video/' + VIDEO, '_blank', 'noopener');
    return Promise.resolve();
  }

  root.RSL.Hints = {
    author: AUTHOR,
    video: VIDEO,
    text: text,
    pages: pages,
    access: access,
    checkGate: checkGate,
    follow: follow,
    likeVideo: likeVideo,
    loadSdk: loadSdk,
    isToyHost: isToyHost,
    isPreview: isPreview
  };
})();
