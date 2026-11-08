/*!
 * 公理板 / AXIOM BOARD — RSL.MM.Flags
 *
 * set.mm 证明重放关的开关（接口契约见 docs/MM-REPLAY.md §7）。
 * 重新设计后的关卡把重放段并进了四章的正常进程，所以**默认开启**；
 * 保留开关是为了让旧版 240 关形态、回归测试与不需要重放的玩家能关掉。
 *
 * 取值优先级：
 *   ?mm=0 / ?mm=off            —— 本次访问关闭（最高优先级）
 *   ?mm=1 / ?mm=on             —— 本次访问开启
 *   localStorage['axiom-simple:mm'] === 'off'  —— 持久关闭
 *   localStorage['axiom-simple:mm'] === 'on'   —— 持久开启
 *   默认 true
 *
 * 只读环境（无 location、无 localStorage、隐私模式禁用存储）一律安全降级；
 * 所有入口都是纯读取，不会抛出异常，也不刷新页面。
 */
(function (host) {
  'use strict';
  host.RSL = host.RSL || {};
  host.RSL.MM = host.RSL.MM || {};

  var KEY = 'axiom-simple:mm';
  var ON_VALUES = { '1': true, 'on': true };
  var OFF_VALUES = { '0': true, 'off': true };

  /* 浏览器里是 window.location；Node/vm 测试可注入同名全局。 */
  function locationObject() {
    if (host.location) return host.location;
    if (typeof location !== 'undefined') return location;
    return null;
  }

  /* localStorage 可能不存在，也可能被隐私模式禁用（访问即抛错），两级兜底。 */
  function storageObject() {
    if (host.localStorage) return host.localStorage;
    if (typeof localStorage !== 'undefined') return localStorage;
    return null;
  }

  /* 读取 ?mm=…：'0'/'off' 为显式关闭，'1'/'on' 为显式开启，其余/缺失返回 null。 */
  function queryValue() {
    var loc = locationObject();
    var search = loc && loc.search;
    if (!search || typeof search !== 'string') return null;

    var value = null;
    try {
      if (typeof URLSearchParams === 'function') {
        value = new URLSearchParams(search).get('mm');
      }
    } catch (err) {
      value = null;
    }
    if (value == null) {
      /* 老环境没有 URLSearchParams 时的保守回退。 */
      var m = /[?&]mm=([^&]*)/.exec(search);
      if (m) {
        try {
          value = decodeURIComponent(m[1].replace(/\+/g, ' '));
        } catch (err) {
          value = m[1];
        }
      }
    }
    if (value == null) return null;
    var v = String(value).toLowerCase();
    if (ON_VALUES[v] === true) return true;
    if (OFF_VALUES[v] === true) return false;
    return null;
  }

  function storageValue() {
    var store = storageObject();
    if (!store) return null;
    try {
      return store.getItem(KEY);
    } catch (err) {
      return null;
    }
  }

  /* 每次调用都重新求值：Flags.set() 之后无需刷新页面即可生效。 */
  function read() {
    var q = queryValue();
    if (q === false) return { enabled: false, source: 'query' };
    if (q === true) return { enabled: true, source: 'query' };
    var stored = storageValue();
    if (stored === 'off') return { enabled: false, source: 'storage' };
    if (stored === 'on') return { enabled: true, source: 'storage' };
    return { enabled: true, source: 'default' };
  }

  var Flags = {
    /** 当前是否启用 mm-replay（默认 true，`?mm=0` 或持久 'off' 可关闭）。 */
    enabled: function () {
      return read().enabled;
    },

    /** 当前取值来源：'query'（本次访问）| 'storage'（持久开关）| 'default'（默认开启）。 */
    source: function () {
      return read().source;
    },

    /** 写入持久开关；存储不可用时静默忽略（不影响本次访问的 ?mm=…）。 */
    set: function (on) {
      var store = storageObject();
      if (!store) return;
      try {
        store.setItem(KEY, on ? 'on' : 'off');
      } catch (err) {
        /* 隐私模式 / 配额已满：保持页面可用，不抛错。 */
      }
    }
  };

  host.RSL.MM.Flags = Flags;

  if (typeof module !== 'undefined' && module.exports) module.exports = Flags;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
