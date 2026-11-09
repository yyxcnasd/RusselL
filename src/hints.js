/* 关卡提示：每关一段短文字，只给方向，不替你接线。
 * B 站 Toy 内需要关注作者才能打开；GitHub Pages / 本地直接可用。
 */
(function () {
  'use strict';
  var root = typeof window !== 'undefined' ? window : globalThis;
  root.RSL = root.RSL || {};

  var AUTHOR = {
    mid: '3461564009024072',
    name: '夜与星尘_NaSd'
  };

  var OVERRIDES = {
    T0i: 'A1 接目标。',
    T0ii: 'A2 接目标，P/Q/R 对齐。',
    T0iii: 'A3 接目标，P/Q 对齐否定。',
    T0iv: 'S 做一次同时代入。',
    T0v: 'A、A→B 接 M。',
    T1i: 'A 接 ∀*，再全称推广。',
    T1ii: '∀x A 接 ∀E*，选 t。',
    T1iii: 'A 接 ∀I，x 对齐目标。',
    T1iv: 'A[t/x] 接 ∃I*。',
    T1v: 'A5 接目标。',
    T2i: '=I 接目标。',
    T2ii: 'x=y、F(x) 接 =L。',
    T2iii: 'y=x、F(y) 接 =L。',
    T2iv: 'x=y、x=z 接 =L。',
    T3i: 'EXT 接目标。',
    T3ii: '∅ 接目标。',
    T3iii: 'x、y 接 {,}。',
    T3iv: 'x 接 ∪。',
    '*36': '同 *38，先拆外层量词。',
    '*44': '同 *38，先拆第三层。',
    '*78': '=L 反向替换属于关系。',
    '*88': '=L 反向替换，先对变元。'
  };

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

  function text(level) {
    if (!level) return '';
    return OVERRIDES[level.id] || OVERRIDES[level.code] || level.hint || level.teaches || '';
  }

  function checkGate() {
    if (isPreview()) return Promise.resolve({ mode: 'toy', allowed: true, reason: 'preview' });
    return loadSdk().then(function (hasToy) {
      if (!hasToy || !root.toy || typeof root.toy.getAuthorRelation !== 'function') {
        return { mode: 'web', allowed: true };
      }
      return root.toy.getAuthorRelation().then(function (res) {
        if (res && res.status === 'ok' && res.data) {
          return {
            mode: 'toy',
            allowed: !!(res.data.isFollowing || res.data.isAuthor),
            reason: res.data.isFollowing || res.data.isAuthor ? 'following' : 'not-following'
          };
        }
        return { mode: 'toy', allowed: false, reason: (res && res.status) || 'unavailable' };
      }).catch(function () {
        return { mode: 'toy', allowed: false, reason: 'error' };
      });
    });
  }

  function follow() {
    if (root.toy && typeof root.toy.navigate === 'function') {
      return root.toy.navigate({ type: 'space', id: AUTHOR.mid });
    }
    window.open('https://space.bilibili.com/' + AUTHOR.mid, '_blank', 'noopener');
    return Promise.resolve();
  }

  root.RSL.Hints = {
    author: AUTHOR,
    text: text,
    checkGate: checkGate,
    follow: follow,
    loadSdk: loadSdk,
    isToyHost: isToyHost,
    isPreview: isPreview
  };
})();
