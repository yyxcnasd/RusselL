/*!
 * 公理板 / AXIOM BOARD — RSL.MM.Flags
 *
 * set.mm 证明重放子系统的特性开关（接口契约见 docs/MM-REPLAY.md §7）。
 * 默认关闭，因此现有 240 关的目录、解锁链与界面完全不受影响。
 *
 * 开启来源（任一为真即开启，query 优先）：
 *   ?mm=1 / ?mm=on                           —— 本次访问临时开启
 *   localStorage['axiom-simple:mm'] === 'on' —— 持久开启，由 Flags.set 写入
 *
 * 只读环境（无 location、无 localStorage、隐私模式禁用存储）一律安全降级为关闭；
 * 所有入口都是纯读取，不会抛出异常，也不刷新页面。
 */
(function (host) {
  'use strict';
  host.RSL = host.RSL || {};
  host.RSL.MM = host.RSL.MM || {};

  var KEY = 'axiom-simple:mm';
  var ON_VALUES = { '1': true, 'on': true };

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

  /* 读取 ?mm=1 / ?mm=on；查询串缺失或格式异常都按未提供处理。 */
  function queryOn() {
    var loc = locationObject();
    var search = loc && loc.search;
    if (!search || typeof search !== 'string') return false;

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
    return value != null && ON_VALUES[String(value).toLowerCase()] === true;
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
    if (queryOn()) return { enabled: true, source: 'query' };
    if (storageValue() === 'on') return { enabled: true, source: 'storage' };
    return { enabled: false, source: 'default' };
  }

  var Flags = {
    /** 当前是否启用 mm-replay。 */
    enabled: function () {
      return read().enabled;
    },

    /** 当前启用来源：'query'（本次访问）| 'storage'（持久开关）| 'default'（关闭）。 */
    source: function () {
      return read().source;
    },

    /** 写入持久开关；存储不可用时静默忽略（不影响本次访问的 ?mm=1）。 */
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
