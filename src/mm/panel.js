/*!
 * 公理板 / AXIOM BOARD — RSL.MM.Panel
 *
 * 只读证明重放面板（接口契约见 docs/MM-REPLAY.md §8）。
 * 经典脚本 + IIFE：无构建步骤、无第三方库、无网络请求、不用 ES module。
 *
 * 只通过 mount(container, opts) 的参数与回调通信：不读 RSL.APP，也不持有全局可变状态。
 * 来自 proof / level 的文本进入 innerHTML 前一律 HTML 转义（见 esc / formulaHTML），
 * 其余文本全部走 textContent。
 *
 * 结构：
 *   1. 转义与 token 显示（RSL.MM.Expr.toUnicode 优先，缺失时 join(' ') 兜底）
 *   2. 证明数据规整
 *   3. DOM 构建
 *   4. 状态推进与绘制（next / prev / first / last / 跳段 / 点步骤）
 *   5. mount / destroy
 */
(function (host) {
  'use strict';
  host.RSL = host.RSL || {};
  host.RSL.MM = host.RSL.MM || {};

  /* 步骤数 > 80 时分段折叠，每段 40 步（§8）。 */
  var PAGE_LIMIT = 80;
  var SEGMENT = 40;

  /* 面板自身的静态图标（内联 SVG，不依赖 index.html 的 sprite）。 */
  var ICONS = {
    first: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.75 5.25v13.5M16.5 12 7.5 6.75v10.5Z"/></svg>',
    prev: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>',
    next: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>',
    last: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.25 5.25v13.5M7.5 12 16.5 6.75v10.5Z"/></svg>'
  };

  /* =========================================================================
   * 1. 转义与 token 显示
   * ========================================================================= */

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function exprApi() {
    var mm = host.RSL && host.RSL.MM;
    return mm && mm.Expr ? mm.Expr : null;
  }

  /** token 数组 → Unicode 文本（Expr 缺失时退回 'a b c'）。 */
  function unicode(tokens) {
    if (!Array.isArray(tokens)) return tokens == null ? '' : String(tokens);
    var Expr = exprApi();
    if (Expr && typeof Expr.toUnicode === 'function') {
      try { return String(Expr.toUnicode(tokens)); } catch (e) { /* 落到原始 token 串 */ }
    }
    return tokens.join(' ');
  }

  function displayText(source) {
    return Array.isArray(source) ? unicode(source) : (source == null ? '' : String(source));
  }

  function tokenClass(tok) {
    if (tok === '(' || tok === ')') return 'f-paren';
    if (/^[A-Za-z]$/.test(tok) || /^[\u0391-\u03c9]$/.test(tok)) return 'f-var';
    return 'f-op';
  }

  /** 公式 → 转义后的 `.formula` 内联标记；token 之间的空白统一成单个空格。 */
  function formulaHTML(source) {
    var parts = displayText(source).split(/\s+/);
    var out = [];
    for (var i = 0; i < parts.length; i += 1) {
      var p = parts[i];
      if (!p) continue;
      out.push('<span class="' + tokenClass(p) + '">' + esc(p) + '</span>');
    }
    return out.join(' ');
  }

  /** 替换 map：var ↦ tokens（§5 的 subst 形状）。空 map 只留一个占位破折号。 */
  function substHTML(subst) {
    if (!subst || typeof subst !== 'object') return '';
    var keys = Object.keys(subst);
    if (!keys.length) return '<span class="mm-empty" aria-hidden="true">—</span>';
    return keys.map(function (name) {
      var value = subst[name];
      var tokens = Array.isArray(value) ? value : [value];
      return '<div class="mm-subst-row">' +
        '<span class="formula mm-subst-var">' + formulaHTML([name]) + '</span>' +
        '<span class="mm-map" aria-hidden="true">\u21a6</span>' +
        '<span class="formula mm-subst-val">' + formulaHTML(tokens) + '</span>' +
        '</div>';
    }).join('');
  }

  /* =========================================================================
   * 2. 证明数据规整（只读；不修改传入对象）
   * ========================================================================= */

  function readProof(level, proof) {
    var steps = proof && Array.isArray(proof.steps) ? proof.steps : [];
    var total = steps.length;
    var kind = proof && proof.kind ? String(proof.kind) : '';
    var conclusion = proof && Array.isArray(proof.conclusion)
      ? proof.conclusion
      : (level && Array.isArray(level.targetTokens) ? level.targetTokens : []);

    var finalId = proof && proof.finalStep != null ? proof.finalStep : null;
    var finalIndex = total ? total - 1 : 0;
    if (finalId != null) {
      for (var i = 0; i < total; i += 1) {
        if (String(steps[i].id) === String(finalId)) { finalIndex = i; break; }
      }
    }

    var axiom = !!proof && total === 0 && kind === '$a';
    /* 有 proof 但 0 步却不是 $a、或根本没给 proof：都按数据缺口处理，不假装已完成。 */
    var gap = !proof || (total === 0 && !axiom);

    return {
      steps: steps,
      total: total,
      axiom: axiom,
      gap: gap,
      conclusion: conclusion,
      finalId: finalId,
      finalIndex: finalIndex,
      code: (proof && proof.label) || (level && level.code) || (level && level.proofId) || (level && level.id) || '',
      targetText: level && level.targetUnicode ? String(level.targetUnicode) : unicode(conclusion),
      paged: total > PAGE_LIMIT,
      segmentCount: Math.max(1, Math.ceil(total / SEGMENT))
    };
  }

  /* =========================================================================
   * 3. DOM 构建
   * ========================================================================= */

  function make(doc, tag, cls) {
    var node = doc.createElement(tag);
    if (cls) node.className = cls;
    return node;
  }

  function textEl(doc, tag, cls, text) {
    var node = make(doc, tag, cls);
    node.textContent = text == null ? '' : String(text);
    return node;
  }

  function controlButton(doc, kind, label, icon) {
    var btn = make(doc, 'button', 'mm-ctl mm-ctl-' + kind);
    btn.type = 'button';
    btn.setAttribute('data-mm-' + kind, '');
    btn.setAttribute('aria-label', label);
    btn.innerHTML = icon;
    return btn;
  }

  function buildHead(doc, model) {
    var head = make(doc, 'header', 'mm-head');
    var code = textEl(doc, 'span', 'mm-code', model.code);
    code.setAttribute('data-mm-code', '');
    if (!model.code) code.hidden = true;
    var target = make(doc, 'span', 'formula mm-target');
    target.setAttribute('data-mm-target', '');
    target.innerHTML = formulaHTML(model.targetText);
    var progress = textEl(doc, 'span', 'mm-progress', model.total ? '1 / ' + model.total : '0 / 0');
    progress.setAttribute('data-mm-progress', '');
    progress.setAttribute('aria-live', 'polite');
    head.appendChild(code);
    head.appendChild(target);
    head.appendChild(progress);
    return { head: head, code: code, target: target, progress: progress };
  }

  function buildBody(doc, model) {
    var body = make(doc, 'div', 'mm-body');

    var listCol = make(doc, 'div', 'mm-list-col');
    var segs = make(doc, 'div', 'mm-segments');
    segs.setAttribute('data-mm-segments', '');
    if (!model.paged) segs.hidden = true;
    var list = make(doc, 'ul', 'mm-list');
    list.setAttribute('data-mm-step-list', '');
    list.setAttribute('role', 'list');
    listCol.appendChild(segs);
    listCol.appendChild(list);

    var detail = make(doc, 'section', 'mm-detail');
    detail.setAttribute('data-mm-current', '');

    var headRow = make(doc, 'div', 'mm-detail-head');
    var label = textEl(doc, 'span', 'mm-label', '');
    label.setAttribute('data-mm-label', '');
    var kind = textEl(doc, 'span', 'mm-kind', '');
    kind.setAttribute('data-mm-kind', '');
    headRow.appendChild(label);
    headRow.appendChild(kind);

    var note = textEl(doc, 'p', 'mm-note', '');
    note.setAttribute('data-mm-note', '');
    note.hidden = true;

    var subst = make(doc, 'div', 'mm-subst');
    subst.setAttribute('data-mm-subst', '');

    var conclusion = make(doc, 'div', 'formula mm-conclusion');
    conclusion.setAttribute('data-mm-conclusion', '');

    /* 中间内容单独包一层：详情卡撑满右列时，只有内容滚动，控制条钉在底部，
     * 连续点「下一步」时按钮位置不会上下跳。 */
    var detailBody = make(doc, 'div', 'mm-detail-body');
    detailBody.appendChild(note);
    detailBody.appendChild(subst);
    detailBody.appendChild(conclusion);

    var controls = make(doc, 'div', 'mm-controls');
    var first = controlButton(doc, 'first', '首步', ICONS.first);
    var prev = controlButton(doc, 'prev', '上一步', ICONS.prev);
    var next = controlButton(doc, 'next', '下一步', ICONS.next);
    var last = controlButton(doc, 'last', '末步', ICONS.last);
    controls.appendChild(first);
    controls.appendChild(prev);
    controls.appendChild(next);
    controls.appendChild(last);

    detail.appendChild(headRow);
    detail.appendChild(detailBody);
    detail.appendChild(controls);

    body.appendChild(listCol);
    body.appendChild(detail);

    return {
      body: body,
      listCol: listCol,
      segs: segs,
      list: list,
      detail: detail,
      detailBody: detailBody,
      headRow: headRow,
      label: label,
      kind: kind,
      note: note,
      subst: subst,
      conclusion: conclusion,
      controls: controls,
      first: first,
      prev: prev,
      next: next,
      last: last
    };
  }

  /* =========================================================================
   * 4. mount
   * ========================================================================= */

  /**
   * Panel.mount(container, opts) -> { destroy() }
   * opts = { level, proof, mode:'replay', onSolved(){}, onProgress(info){}, sfx(name){} }
   */
  function mount(container, options) {
    if (!container || typeof container.appendChild !== 'function') {
      throw new Error('RSL.MM.Panel.mount 需要一个容器节点');
    }
    var opts = options || {};
    var level = opts.level || {};
    var model = readProof(level, opts.proof);
    var doc = container.ownerDocument || (typeof document !== 'undefined' ? document : null);

    var cur = 0;
    var revealed = model.total ? 1 : 0;
    var activeSeg = 0;
    var solvedOnce = false;
    var destroyed = false;
    var root = null;
    var refs = {};

    /* ---------- 回调 ---------- */

    function clickSfx() {
      if (typeof opts.sfx === 'function') {
        try { opts.sfx('click'); } catch (e) { /* 音效可选，不打断重放 */ }
      }
    }

    function emitProgress() {
      if (typeof opts.onProgress !== 'function') return;
      opts.onProgress({
        step: model.total ? cur + 1 : 0,
        index: model.total ? cur : -1,
        total: model.total,
        revealed: revealed,
        final: !model.gap && (model.total === 0 || cur >= model.finalIndex),
        solved: solvedOnce,
        paged: model.paged,
        segment: model.paged ? activeSeg : 0,
        label: model.total && model.steps[cur] ? model.steps[cur].label : ''
      });
    }

    function maybeSolve() {
      if (solvedOnce || model.gap) return;
      var reached = model.total === 0 || cur >= model.finalIndex;
      if (!reached) return;
      solvedOnce = true; /* 先置位：onSolved 里重新导航也不会二次触发 */
      if (typeof opts.sfx === 'function') {
        try { opts.sfx('win'); } catch (e) { /* 音效可选 */ }
      }
      if (typeof opts.onSolved === 'function') opts.onSolved();
    }

    /* ---------- 绘制 ---------- */

    function setDisabled(btn, on) {
      btn.disabled = !!on;
      if (on) btn.setAttribute('aria-disabled', 'true');
      else btn.removeAttribute('aria-disabled');
    }

    function paintHead() {
      refs.progress.textContent = model.total ? (cur + 1) + ' / ' + model.total : '0 / 0';
    }

    function buildRow(idx) {
      var step = model.steps[idx] || {};
      var li = make(doc, 'li', 'mm-step-item');
      var btn = make(doc, 'button', 'mm-step');
      btn.type = 'button';
      btn.setAttribute('data-mm-step', step.id == null ? 's' + (idx + 1) : String(step.id));
      btn.setAttribute('data-mm-idx', String(idx));
      var width = String(Math.max(1, model.total)).length;
      var no = textEl(doc, 'span', 'mm-step-no', String(idx + 1).padStart(width, '0'));
      var label = textEl(doc, 'span', 'mm-step-label', step.label == null ? '' : String(step.label));
      var out = make(doc, 'span', 'formula mm-step-out');
      btn.appendChild(no);
      btn.appendChild(label);
      btn.appendChild(out);
      li.appendChild(btn);
      return li;
    }

    function paintRow(li, idx) {
      var btn = li.firstChild;
      var step = model.steps[idx] || {};
      var state = idx === cur ? 'current' : (idx < cur ? 'done' : 'pending');
      var seen = idx < revealed;
      btn.setAttribute('data-mm-state', state);
      btn.setAttribute('data-mm-step-kind', step.kind == null ? '' : String(step.kind));
      btn.setAttribute('data-mm-revealed', seen ? 'true' : 'false');
      btn.classList.toggle('is-current', state === 'current');
      btn.classList.toggle('is-done', state === 'done');
      btn.classList.toggle('is-pending', state === 'pending');
      btn.classList.toggle('is-revealed', seen);
      if (state === 'current') btn.setAttribute('aria-current', 'step');
      else btn.removeAttribute('aria-current');
      var out = btn.lastChild;
      if (seen) {
        var html = formulaHTML(step.conclusion);
        if (out.__mmHTML !== html) {
          out.innerHTML = html;
          out.__mmHTML = html;
        }
      } else if (out.__mmHTML !== '') {
        out.textContent = '\u00b7'; /* 未揭示：只留一个占位点 */
        out.__mmHTML = '';
      }
    }

    function paintList() {
      var start = model.paged ? activeSeg * SEGMENT : 0;
      var end = model.paged ? Math.min(start + SEGMENT, model.total) : model.total;
      if (refs.list.__mmStart !== start) {
        refs.list.innerHTML = '';
        for (var i = start; i < end; i += 1) refs.list.appendChild(buildRow(i));
        refs.list.__mmStart = start;
      }
      var rows = refs.list.children;
      for (var r = 0; r < rows.length; r += 1) paintRow(rows[r], start + r);
      var active = refs.list.querySelector('[data-mm-state="current"]');
      if (active && typeof active.scrollIntoView === 'function') {
        try { active.scrollIntoView({ block: 'nearest' }); } catch (e) { /* 老浏览器忽略参数 */ }
      }
    }

    function paintSegments() {
      if (!model.paged) return;
      if (refs.segs.__mmCount !== model.segmentCount) {
        refs.segs.innerHTML = '';
        for (var s = 0; s < model.segmentCount; s += 1) {
          var from = s * SEGMENT + 1;
          var to = Math.min((s + 1) * SEGMENT, model.total);
          var btn = make(doc, 'button', 'mm-seg');
          btn.type = 'button';
          btn.setAttribute('data-mm-seg', String(s));
          btn.setAttribute('aria-label', '第 ' + from + '\u2013' + to + ' 步');
          btn.textContent = from + '\u2013' + to;
          refs.segs.appendChild(btn);
        }
        refs.segs.__mmCount = model.segmentCount;
      }
      var segs = refs.segs.children;
      for (var i = 0; i < segs.length; i += 1) {
        var on = i === activeSeg;
        segs[i].classList.toggle('is-active', on);
        if (on) segs[i].setAttribute('aria-current', 'true');
        else segs[i].removeAttribute('aria-current');
      }
    }

    function paintDetail() {
      var step = model.total ? model.steps[cur] : null;
      refs.headRow.hidden = !step;
      refs.subst.hidden = !step || model.gap;
      if (step) {
        refs.label.textContent = step.label == null ? '' : String(step.label);
        refs.kind.textContent = step.kind === 'hyp' ? '前提' : '推理';
        refs.kind.setAttribute('data-mm-kind', step.kind == null ? '' : String(step.kind));
        refs.subst.innerHTML = substHTML(step.subst);
        refs.conclusion.innerHTML = formulaHTML(step.conclusion);
      } else {
        refs.label.textContent = '';
        refs.kind.textContent = '';
        refs.kind.setAttribute('data-mm-kind', '');
        refs.subst.innerHTML = '';
        refs.conclusion.innerHTML = formulaHTML(model.conclusion);
      }
      if (model.axiom) {
        refs.note.hidden = false;
        refs.note.textContent = '公理图式 · 无可重放步骤';
      } else if (model.gap) {
        refs.note.hidden = false;
        refs.note.textContent = '缺少证明数据';
      } else {
        refs.note.hidden = true;
        refs.note.textContent = '';
      }
      var locked = model.gap || model.total === 0;
      setDisabled(refs.first, locked || cur <= 0);
      setDisabled(refs.prev, locked || cur <= 0);
      setDisabled(refs.next, locked || cur >= model.total - 1);
      setDisabled(refs.last, locked || cur >= model.total - 1);
    }

    function paint() {
      if (destroyed) return;
      paintHead();
      paintSegments();
      paintList();
      paintDetail();
    }

    /* ---------- 推进 ---------- */

    function goTo(index) {
      if (destroyed || model.gap || !model.total) return;
      var target = Math.max(0, Math.min(model.total - 1, index | 0));
      if (target === cur) return;
      cur = target;
      if (target + 1 > revealed) revealed = target + 1;
      if (model.paged) activeSeg = Math.floor(cur / SEGMENT);
      paint();
      emitProgress();
      clickSfx();
      maybeSolve();
    }

    function next() { if (model.total && cur < model.total - 1) goTo(cur + 1); }
    function prev() { if (model.total && cur > 0) goTo(cur - 1); }
    function first() { if (model.total) goTo(0); }
    function last() { if (model.total) goTo(model.total - 1); }

    function goSegment(seg) {
      if (!model.paged || model.gap) return;
      var index = Math.max(0, Math.min(model.segmentCount - 1, seg | 0)) * SEGMENT;
      goTo(Math.min(index, model.total - 1));
    }

    /* ---------- 事件 ---------- */

    function isEditable(node) {
      if (!node || node.nodeType !== 1) return false;
      var tag = String(node.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
      if (node.isContentEditable) return true;
      if (typeof node.closest === 'function' && node.closest('[contenteditable="true"],[contenteditable=""]')) return true;
      return false;
    }

    function onKeyDown(e) {
      if (destroyed || !root) return;
      if (root.isConnected === false) return;
      if (e.defaultPrevented) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (isEditable(e.target)) return;
      var key = e.key;
      var handled = true;
      if (key === 'ArrowRight') next();
      else if (key === 'ArrowLeft') prev();
      else if (key === 'Home') first();
      else if (key === 'End') last();
      else handled = false;
      if (handled) e.preventDefault();
    }

    function onClick(e) {
      if (destroyed) return;
      var target = e.target;
      if (!target || typeof target.closest !== 'function') return;
      if (target.closest('[data-mm-first]')) { first(); return; }
      if (target.closest('[data-mm-prev]')) { prev(); return; }
      if (target.closest('[data-mm-next]')) { next(); return; }
      if (target.closest('[data-mm-last]')) { last(); return; }
      var seg = target.closest('[data-mm-seg]');
      if (seg) { goSegment(parseInt(seg.getAttribute('data-mm-seg'), 10)); return; }
      var row = target.closest('[data-mm-step]');
      if (row) { goTo(parseInt(row.getAttribute('data-mm-idx'), 10)); }
    }

    /* ---------- 组装 ---------- */

    root = make(doc, 'div', 'mm-panel' + (model.axiom || model.gap ? ' is-empty' : ''));
    root.setAttribute('data-mm-panel', '');
    root.setAttribute('data-mm-mode', 'replay');
    var head = buildHead(doc, model);
    var body = buildBody(doc, model);
    refs = body;
    refs.progress = head.progress;
    root.appendChild(head.head);
    root.appendChild(body.body);

    root.addEventListener('click', onClick);
    doc.addEventListener('keydown', onKeyDown, false);
    container.appendChild(root);

    paint();
    emitProgress();
    maybeSolve();

    /* ---------- handle ---------- */

    function destroy() {
      if (destroyed) return;
      destroyed = true;
      if (doc && typeof doc.removeEventListener === 'function') doc.removeEventListener('keydown', onKeyDown, false);
      if (root) {
        if (typeof root.removeEventListener === 'function') root.removeEventListener('click', onClick);
        if (root.parentNode) root.parentNode.removeChild(root);
      }
      refs = {};
      root = null;
    }

    function state() {
      return {
        destroyed: destroyed,
        current: model.total ? cur + 1 : 0,
        index: model.total ? cur : -1,
        total: model.total,
        revealed: revealed,
        solved: solvedOnce,
        paged: model.paged,
        segment: model.paged ? activeSeg : 0,
        segments: model.segmentCount
      };
    }

    return {
      destroy: destroy,
      state: state,
      /* 供 main.js 的顶栏按钮驱动；返回推进后的状态快照。 */
      next: function () { next(); return state(); },
      prev: function () { prev(); return state(); },
      goTo: function (index) { goTo(index); return state(); }
    };
  }

  host.RSL.MM.Panel = {
    mount: mount,
    SEGMENT: SEGMENT,
    PAGE_LIMIT: PAGE_LIMIT
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = host.RSL.MM.Panel;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
