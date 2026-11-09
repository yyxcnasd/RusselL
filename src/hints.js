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
    T0i: '从元件盘取 A1，接到目标槽。A1 里的 P 可以换成任意命题，Q 也一样；先让两边公式对上。',
    T0ii: '取 A2，把它接到目标槽。A2 管的是前件分配：P、Q、R 依次对上目标里的三个位置。',
    T0iii: '取 A3。它把两个否定放进前件；让 P、Q 对上目标里被否定的两个公式。',
    T0iv: '取一条已有定理或公理，再放 S。S 用一组代入把 A 变成目标公式，注意替换要同时进行。',
    T0v: '先准备 A 和 A→B 两条线，再取 M 把两者接起来；M 的输出就是 B。',
    T1i: '取 ∀*，把 A 接到它的 assertion；再用全称推广接目标。',
    T1ii: '取 ∀E*，把一条 ∀x A 接到 assertion；在审查框里选好 t，再输出 A[t/x]。',
    T1iii: '取 ∀I，把 A 接到 assertion；变元 x 要符合目标的全称量词。',
    T1iv: '取 ∃I*，先准备 A[t/x]，再接目标里的 ∃x A。',
    T1v: '取 A5，把 ∀x(P→Q) 接到 assertion；P、Q 对上目标的两段。',
    T2i: '取 =I，t 写成目标里的项，再接目标。',
    T2ii: '取 =L，先给 x=y，再给 F(x)；F 里的 x 会被替换成 y。',
    T2iii: '取 =L，这次给 y=x；注意方向和上一条相反。',
    T2iv: '取 =L，x=y 和 x=z 都要接到对应输入；F 用等词构造。',
    T3i: '取 EXT，把 ∀z(z∈x↔z∈y) 接到 assertion，输出 x=y。',
    T3ii: '取 ∅，它直接给出空集存在；把输出接到目标。',
    T3iii: '取 {,}，把 x、y 两个项接到输入，输出配对集。',
    T3iv: '取 ∪，把集合 x 接到输入，输出并集。',
    '*36': '和 *38 同型：先处理外层量词，再把内层辖域移进去。',
    '*44': '和 *38 同型，但这次移动的是第三层量词；先拆最外层。',
    '*78': '用 =L 从 x=y 推出属于关系的替换，注意方向是反向。',
    '*88': '用 =L 处理反向的属于替换；先确认两个变元的位置。'
  };

  var sdkPromise = null;

  function loadSdk() {
    if (root.toy) return Promise.resolve(true);
    if (!/bilibili\.com$/i.test(location.hostname)) return Promise.resolve(false);
    if (sdkPromise) return sdkPromise;
    sdkPromise = new Promise(function (resolve) {
      var s = document.createElement('script');
      s.src = 'https://s1.hdslb.com/bfs/seed/toy/app/sdk/toy-sdk.js';
      s.onload = function () { resolve(!!root.toy); };
      s.onerror = function () { resolve(false); };
      document.head.appendChild(s);
    });
    return sdkPromise;
  }

  function text(level) {
    if (!level) return '';
    return OVERRIDES[level.id] || OVERRIDES[level.code] || level.hint || level.teaches || '';
  }

  function checkGate() {
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
    isToyHost: function () { return /bilibili\.com$/i.test(location.hostname); }
  };
})();
