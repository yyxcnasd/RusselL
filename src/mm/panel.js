/*!
 * 公理板 / AXIOM BOARD — RSL.MM.Panel
 *
 * 证明面板（接口契约见 docs/MM-REPLAY.md §8，实现备注见 §10）。
 * 经典脚本 + IIFE：无构建步骤、无第三方库、无网络请求、不用 ES module。
 *
 * 两种模式：
 *   - mode:'replay'      只读重放：逐步揭示参考证明（默认，行为与 Tier 2 完全一致）。
 *   - mode:'interactive' 交互式自推：玩家自己压假设 / 应用断言，引擎逐步校验
 *                        （RSL.MM.Verify.session）。
 * 两种模式共用同一份自包含 proof 数据；模式切换会重建 UI，交互会话重置。
 *
 * 只通过 mount(container, opts) 的参数与回调通信：不读 RSL.APP，也不持有全局可变状态。
 * 来自 proof / level 的文本进入 innerHTML 前一律 HTML 转义（见 esc / formulaHTML），
 * 其余文本全部走 textContent。
 *
 * 结构：
 *   1. 转义与 token 显示（RSL.MM.Expr.toUnicode 优先，缺失时 join(' ') 兜底）
 *   2. 证明数据规整
 *   3. DOM 构建（头部 / 重放体 / 交互体）
 *   4. mount：重放推进 + 交互会话 + 模式切换 + 事件
 *   5. handle：destroy / state / setMode / mode / next / prev / goTo
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

  function actionButton(doc, kind, text, label) {
    var btn = make(doc, 'button', 'mm-btn mm-btn-' + kind);
    btn.type = 'button';
    btn.setAttribute('data-mm-' + kind, '');
    btn.textContent = text;
    if (label) btn.setAttribute('aria-label', label);
    return btn;
  }

  /** 模式切换按钮的文案（少字原则：两个字）。 */
  function modeToggleText(mode) {
    return mode === 'interactive' ? '回放' : '自推';
  }

  function buildHead(doc, model, canToggle, mode) {
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

    var toggle = null;
    if (canToggle) {
      toggle = make(doc, 'button', 'mm-mode-toggle');
      toggle.type = 'button';
      toggle.setAttribute('data-mm-mode-toggle', '');
      toggle.setAttribute('aria-pressed', mode === 'interactive' ? 'true' : 'false');
      toggle.textContent = modeToggleText(mode);
      toggle.setAttribute('title', mode === 'interactive' ? '回到只读回放' : '自己选择下一步（交互推导）');
      toggle.setAttribute('aria-label', mode === 'interactive' ? '切换到回放模式' : '切换到交互推导模式');
      head.appendChild(toggle);
    }
    return { head: head, code: code, target: target, progress: progress, toggle: toggle };
  }

  function buildReplayBody(doc, model) {
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

  /**
   * 交互式体：左=候选操作（假设 + 断言，可滚动），右=状态（栈 / 提示 / 错误 / 控制）。
   * 钩子见 §8 与实现备注：candidates / hyp / assert / undo / reset / hint / error /
   * stack / actions / ref / solved。
   */
  function buildInteractiveBody(doc, model) {
    var body = make(doc, 'div', 'mm-body mm-body-interactive');
    body.setAttribute('data-mm-body', 'interactive');

    var cands = make(doc, 'section', 'mm-cands');
    var candsHead = make(doc, 'div', 'mm-cands-head');
    candsHead.appendChild(textEl(doc, 'span', 'mm-cands-title', '可做'));
    var candsCount = textEl(doc, 'span', 'mm-count', '0');
    candsCount.setAttribute('data-mm-cands-count', '');
    candsHead.appendChild(candsCount);

    var scroll = make(doc, 'div', 'mm-cands-scroll');
    scroll.setAttribute('data-mm-candidates', '');
    scroll.setAttribute('role', 'group');
    scroll.setAttribute('aria-label', '可用操作');

    var hypGroup = make(doc, 'div', 'mm-cands-group');
    var hypTitle = textEl(doc, 'h3', 'mm-cands-group-title', '假设');
    hypTitle.setAttribute('data-mm-hyps-title', '');
    var hyps = make(doc, 'div', 'mm-chips');
    hyps.setAttribute('data-mm-hyps', '');
    hypGroup.appendChild(hypTitle);
    hypGroup.appendChild(hyps);

    var assGroup = make(doc, 'div', 'mm-cands-group');
    var assTitle = textEl(doc, 'h3', 'mm-cands-group-title', '断言');
    var asses = make(doc, 'div', 'mm-chips');
    asses.setAttribute('data-mm-asserts', '');
    assGroup.appendChild(assTitle);
    assGroup.appendChild(asses);

    scroll.appendChild(hypGroup);
    scroll.appendChild(assGroup);
    cands.appendChild(candsHead);
    cands.appendChild(scroll);

    var panel = make(doc, 'section', 'mm-state');
    var stateHead = make(doc, 'div', 'mm-state-head');
    var actWrap = make(doc, 'span', 'mm-stat');
    actWrap.appendChild(textEl(doc, 'span', 'mm-stat-label', '已走'));
    var actions = textEl(doc, 'b', 'mm-stat-value', '0');
    actions.setAttribute('data-mm-actions', '');
    actWrap.appendChild(actions);
    var refWrap = make(doc, 'span', 'mm-stat');
    refWrap.appendChild(textEl(doc, 'span', 'mm-stat-label', '参考'));
    var reference = textEl(doc, 'b', 'mm-stat-value', String(model.total || 0));
    reference.setAttribute('data-mm-ref', '');
    refWrap.appendChild(reference);
    stateHead.appendChild(actWrap);
    stateHead.appendChild(refWrap);

    /* 通关横幅按需创建（§8：通关后存在；未通关不占位）。 */
    var solvedSlot = make(doc, 'div', 'mm-solved-slot');
    solvedSlot.setAttribute('data-mm-solved-slot', '');

    var stackTitle = textEl(doc, 'h3', 'mm-cands-group-title', '栈');
    var stack = make(doc, 'div', 'mm-stack');
    stack.setAttribute('data-mm-stack', '');
    stack.setAttribute('role', 'list');

    var hintText = textEl(doc, 'p', 'mm-hint-text', '');
    hintText.setAttribute('data-mm-hint-text', '');
    hintText.hidden = true;

    var error = textEl(doc, 'p', 'mm-error', '');
    error.setAttribute('data-mm-error', '');
    error.setAttribute('role', 'status');
    error.hidden = true;

    var stateBody = make(doc, 'div', 'mm-state-body');
    stateBody.appendChild(stackTitle);
    stateBody.appendChild(stack);
    stateBody.appendChild(hintText);
    stateBody.appendChild(error);

    var controls = make(doc, 'div', 'mm-state-controls');
    var undo = actionButton(doc, 'undo', '撤销', '撤销上一步');
    var reset = actionButton(doc, 'reset', '重来', '清空重来');
    var hint = actionButton(doc, 'hint', '提示', '给出下一步提示');
    controls.appendChild(undo);
    controls.appendChild(reset);
    controls.appendChild(hint);

    panel.appendChild(stateHead);
    panel.appendChild(solvedSlot);
    panel.appendChild(stateBody);
    panel.appendChild(controls);

    body.appendChild(cands);
    body.appendChild(panel);

    return {
      body: body,
      cands: cands,
      scroll: scroll,
      hyps: hyps,
      asses: asses,
      candsCount: candsCount,
      panel: panel,
      actions: actions,
      reference: reference,
      solvedSlot: solvedSlot,
      stack: stack,
      hintText: hintText,
      error: error,
      controls: controls,
      undo: undo,
      reset: reset,
      hint: hint
    };
  }

  /* =========================================================================
   * 4. mount
   * ========================================================================= */

  /**
   * Panel.mount(container, opts) -> handle
   * opts = { level, proof, mode:'replay'|'interactive', onSolved(){}, onProgress(info){}, sfx(name){} }
   */
  function mount(container, options) {
    if (!container || typeof container.appendChild !== 'function') {
      throw new Error('RSL.MM.Panel.mount 需要一个容器节点');
    }
    var opts = options || {};
    var level = opts.level || {};
    var model = readProof(level, opts.proof);
    var doc = container.ownerDocument || (typeof document !== 'undefined' ? document : null);

    var mode = opts.mode === 'interactive' ? 'interactive' : 'replay';
    /* 0 步公理 / 数据缺口没有可推的东西：不给模式切换（§8 交付要求）。 */
    var canToggle = !model.axiom && !model.gap && model.total > 0;

    var cur = 0;
    var revealed = model.total ? 1 : 0;
    var activeSeg = 0;
    var solvedOnce = false;
    var destroyed = false;
    var root = null;
    var headRefs = {};
    var refs = {};
    var session = null;
    var lastHint = null;

    /* ---------- 交互会话 ---------- */

    function createSession() {
      var MM = host.RSL && host.RSL.MM;
      var Verify = MM && MM.Verify;
      if (!Verify || typeof Verify.session !== 'function' || !opts.proof) return null;
      try { return Verify.session(opts.proof); } catch (e) { return null; }
    }

    /* ---------- 回调 ---------- */

    function clickSfx() {
      if (typeof opts.sfx === 'function') {
        try { opts.sfx('click'); } catch (e) { /* 音效可选，不打断重放 */ }
      }
    }

    function winSfx() {
      if (typeof opts.sfx === 'function') {
        try { opts.sfx('win'); } catch (e) { /* 音效可选 */ }
      }
    }

    function emitProgress() {
      if (typeof opts.onProgress !== 'function') return;
      opts.onProgress({
        mode: 'replay',
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

    function emitInteractiveProgress() {
      if (typeof opts.onProgress !== 'function') return;
      var st = session ? session.state() : { actions: 0, reference: model.total, depth: 0, solved: false };
      opts.onProgress({
        mode: 'interactive',
        actions: st.actions,
        reference: st.reference,
        depth: st.depth,
        solved: st.solved,
        hint: lastHint || null
      });
    }

    function maybeSolve() {
      if (solvedOnce || model.gap) return;
      var reached = model.total === 0 || cur >= model.finalIndex;
      if (!reached) return;
      solvedOnce = true; /* 先置位：onSolved 里重新导航也不会二次触发 */
      winSfx();
      if (typeof opts.onSolved === 'function') opts.onSolved();
    }

    function maybeSolveInteractive(st) {
      if (solvedOnce || !st || !st.solved) return;
      solvedOnce = true;
      winSfx();
      if (typeof opts.onSolved === 'function') opts.onSolved();
    }

    /* ---------- 通用绘制件 ---------- */

    function setDisabled(btn, on) {
      if (!btn) return;
      btn.disabled = !!on;
      if (on) btn.setAttribute('aria-disabled', 'true');
      else btn.removeAttribute('aria-disabled');
    }

    /* ---------- 重放：绘制 ---------- */

    function setProgressText() {
      if (!headRefs.progress) return;
      if (mode === 'interactive' && session) {
        var st = session.state();
        headRefs.progress.textContent = st.actions + ' / ' + st.reference;
        return;
      }
      headRefs.progress.textContent = model.total ? (cur + 1) + ' / ' + model.total : '0 / 0';
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
      if (destroyed || mode !== 'replay') return;
      setProgressText();
      paintSegments();
      paintList();
      paintDetail();
    }

    /* ---------- 重放：推进 ---------- */

    function goTo(index) {
      if (destroyed || mode !== 'replay' || model.gap || !model.total) return;
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

    /* ---------- 交互：绘制 ---------- */

    /** 偏离参考证明时的提示（不是引擎错误；只有真的报错才用红色）。 */
    function divergenceNotice() {
      if (!session) return '';
      var h = session.hint();
      if (!h || h.aligned !== false) return '';
      return '偏离参考证明：' + (h.reason || '无法继续提示');
    }

    function makeChip(kind, item) {
      var btn = make(doc, 'button', 'mm-chip mm-chip-' + kind);
      btn.type = 'button';
      if (kind === 'hyp') btn.setAttribute('data-mm-hyp', item.label);
      else btn.setAttribute('data-mm-assert', item.label);
      btn.appendChild(textEl(doc, 'span', 'mm-chip-label', item.label));
      if (kind === 'hyp') {
        var form = make(doc, 'span', 'formula mm-chip-formula');
        form.innerHTML = formulaHTML(item.math);
        btn.appendChild(form);
      } else if (item.arity) {
        btn.appendChild(textEl(doc, 'span', 'mm-chip-arity', '\u00d7' + item.arity));
      }
      var usable = kind === 'hyp' ? true : !!item.ready;
      if (!usable) {
        btn.disabled = true;
        btn.classList.add('is-unready');
        btn.setAttribute('title', item.error || '现在不能用');
      } else {
        btn.setAttribute('title', (kind === 'hyp' ? '压入假设 ' : '应用 ') + item.label);
      }
      if (lastHint && lastHint.label === item.label) {
        btn.classList.add('is-hint');
        btn.setAttribute('title', '提示：下一步用 ' + item.label);
      }
      return btn;
    }

    function focusToken() {
      var active = doc.activeElement;
      if (!active || !refs.scroll || !refs.scroll.contains(active)) return null;
      if (active.hasAttribute('data-mm-hyp')) return { attr: 'data-mm-hyp', label: active.getAttribute('data-mm-hyp') };
      if (active.hasAttribute('data-mm-assert')) return { attr: 'data-mm-assert', label: active.getAttribute('data-mm-assert') };
      return null;
    }

    function refocus(scroll, token) {
      if (!token) return;
      var chips = scroll.querySelectorAll('[' + token.attr + ']');
      for (var i = 0; i < chips.length; i += 1) {
        if (chips[i].getAttribute(token.attr) === token.label && !chips[i].disabled) {
          try { chips[i].focus({ preventScroll: true }); } catch (e) { chips[i].focus(); }
          return;
        }
      }
    }

    function paintCandidates(hyps, asserts, st) {
      var scroll = refs.scroll;
      var scrollTop = scroll.scrollTop;
      var token = focusToken();
      refs.hyps.innerHTML = '';
      refs.asses.innerHTML = '';
      hyps.forEach(function (item) { refs.hyps.appendChild(makeChip('hyp', item)); });
      asserts.forEach(function (item) {
        var chip = makeChip('assert', item);
        if (st.solved) {
          chip.disabled = true;
          chip.setAttribute('title', '已通关');
        }
        refs.asses.appendChild(chip);
      });
      refs.candsCount.textContent = String(hyps.length + asserts.length);
      scroll.scrollTop = scrollTop;
      refocus(scroll, token);
    }

    function paintStack(st) {
      var stack = refs.stack;
      var scrollTop = stack.scrollTop;
      stack.innerHTML = '';
      if (!st.stack.length) {
        var empty = textEl(doc, 'p', 'mm-empty-state', '栈是空的 · 先压入假设');
        empty.setAttribute('data-mm-stack-empty', '');
        stack.appendChild(empty);
      } else {
        st.stack.forEach(function (entry, i) {
          var row = make(doc, 'div', 'mm-stack-row');
          row.setAttribute('data-mm-stack-item', String(i));
          row.appendChild(textEl(doc, 'span', 'mm-stack-no', String(i + 1)));
          row.appendChild(textEl(doc, 'span', 'mm-kind', entry.kind === 'hyp' ? '前提' : '推理'));
          row.appendChild(textEl(doc, 'span', 'mm-stack-label', entry.label));
          var form = make(doc, 'span', 'formula mm-stack-form');
          form.innerHTML = formulaHTML(entry.form);
          row.appendChild(form);
          if (i === st.stack.length - 1) {
            row.classList.add('is-top');
            row.appendChild(textEl(doc, 'span', 'mm-top-tag', '栈顶'));
          }
          stack.appendChild(row);
        });
      }
      stack.scrollTop = scrollTop;
    }

    function paintSolved(st) {
      var slot = refs.solvedSlot;
      if (st.solved) {
        if (!slot.firstChild) {
          var banner = make(doc, 'div', 'mm-solved');
          banner.setAttribute('data-mm-solved', '');
          banner.appendChild(textEl(doc, 'span', 'mm-solved-mark', '✓'));
          banner.appendChild(textEl(doc, 'span', 'mm-solved-text', '已通关'));
          slot.appendChild(banner);
        }
      } else {
        slot.innerHTML = '';
      }
    }

    function paintNotice(st) {
      var text = st.error || '';
      var warn = false;
      if (!text) {
        text = divergenceNotice();
        warn = !!text;
      }
      refs.error.hidden = !text;
      refs.error.textContent = text;
      refs.error.classList.toggle('is-warn', warn);
    }

    function paintInteractive() {
      if (destroyed || mode !== 'interactive') return;
      if (!session) return;
      var st = session.state();
      var hyps = session.hypotheses();
      var asserts = session.assertions();
      setProgressText();
      refs.actions.textContent = String(st.actions);
      refs.reference.textContent = String(st.reference);
      paintCandidates(hyps, asserts, st);
      paintStack(st);
      paintSolved(st);
      paintNotice(st);
      setDisabled(refs.undo, st.actions === 0);
      setDisabled(refs.reset, st.actions === 0 && st.depth === 0);
      setDisabled(refs.hint, st.solved);
      root.classList.toggle('is-solved', !!st.solved);
    }

    /* ---------- 交互：操作 ---------- */

    function afterInteractive() {
      if (destroyed || !session) return;
      var st = session.state();
      paintInteractive();
      emitInteractiveProgress();
      maybeSolveInteractive(st);
    }

    function applyLabel(label) {
      if (destroyed || mode !== 'interactive' || !session) return;
      var result = session.apply(label);
      if (result && result.ok) {
        lastHint = null;
        clickSfx();
        afterInteractive();
      } else {
        /* 失败原因在 session.state().error 里，照常重绘即可显示。 */
        paintInteractive();
        emitInteractiveProgress();
      }
    }

    function undo() {
      if (destroyed || mode !== 'interactive' || !session) return;
      if (!session.undo()) return;
      lastHint = null;
      clickSfx();
      afterInteractive();
    }

    function reset() {
      if (destroyed || mode !== 'interactive' || !session) return;
      session.reset();
      lastHint = null;
      clickSfx();
      afterInteractive();
    }

    function showHint() {
      if (destroyed || mode !== 'interactive' || !session) return;
      lastHint = session.hint();
      var text = '';
      if (lastHint && lastHint.label) {
        text = '下一步：' + lastHint.label + (lastHint.kind === 'hyp' ? '（前提）' : '（断言）');
      } else if (lastHint && lastHint.reason) {
        text = lastHint.reason;
      } else {
        text = '没有可给的下一条提示';
      }
      refs.hintText.textContent = text;
      refs.hintText.hidden = false;
      clickSfx();
      paintInteractive();
      emitInteractiveProgress();
    }

    /* ---------- 组装 ---------- */

    function isEmpty() {
      if (model.axiom || model.gap) return true;
      return mode === 'interactive' && !canToggle;
    }

    function buildEmptyInteractive() {
      var body = make(doc, 'div', 'mm-body mm-body-interactive');
      body.setAttribute('data-mm-body', 'interactive');
      var detail = make(doc, 'section', 'mm-detail');
      var note = textEl(doc, 'p', 'mm-note', '');
      note.setAttribute('data-mm-note', '');
      note.textContent = model.axiom
        ? '公理图式 · 不支持交互推导'
        : (model.gap ? '缺少证明数据' : '这个目标没有可交互的证明');
      var conclusion = make(doc, 'div', 'formula mm-conclusion');
      conclusion.innerHTML = formulaHTML(model.conclusion);
      var conclusionWrap = make(doc, 'div', 'mm-detail-body');
      conclusionWrap.appendChild(conclusion);
      detail.appendChild(note);
      detail.appendChild(conclusionWrap);
      body.appendChild(detail);
      return { body: body, note: note };
    }

    function build() {
      if (!root) return;
      while (root.firstChild) root.removeChild(root.firstChild);
      root.className = 'mm-panel' +
        (isEmpty() ? ' is-empty' : '') +
        (mode === 'interactive' ? ' is-interactive' : '');
      root.setAttribute('data-mm-mode', mode);

      headRefs = buildHead(doc, model, canToggle, mode);
      root.appendChild(headRefs.head);

      if (mode === 'interactive') {
        if (!canToggle) {
          var emptyBody = buildEmptyInteractive();
          refs = emptyBody;
          root.appendChild(emptyBody.body);
          setProgressText();
          return;
        }
        if (!session) session = createSession();
        if (!session) {
          var missing = buildEmptyInteractive();
          missing.note.textContent = '交互引擎未加载';
          refs = missing;
          root.appendChild(missing.body);
          return;
        }
        refs = buildInteractiveBody(doc, model);
        root.appendChild(refs.body);
        paintInteractive();
        return;
      }
      refs = buildReplayBody(doc, model);
      root.appendChild(refs.body);
      paint();
    }

    function setMode(nextMode) {
      if (destroyed) return state();
      var target = nextMode === 'interactive' ? 'interactive' : 'replay';
      if (target === mode) return state();
      if (!canToggle) return state(); /* 公理图式 / 数据缺口不切换 */
      mode = target;
      if (mode === 'interactive') {
        session = createSession(); /* 每次进入自推都重置会话 */
        lastHint = null;
      }
      build();
      if (mode === 'interactive') {
        emitInteractiveProgress();
        maybeSolveInteractive(session ? session.state() : null);
      } else {
        emitProgress();
        maybeSolve();
      }
      return state();
    }

    function toggleMode() {
      setMode(mode === 'replay' ? 'interactive' : 'replay');
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

      /* 交互模式：Backspace 撤销，h 提示；方向键不接管（留给页面滚动）。 */
      if (mode === 'interactive') {
        if (key === 'Backspace') { e.preventDefault(); undo(); return; }
        if (key === 'h' || key === 'H') { e.preventDefault(); showHint(); return; }
        return;
      }

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
      if (target.closest('[data-mm-mode-toggle]')) { toggleMode(); return; }
      if (mode === 'replay') {
        if (target.closest('[data-mm-first]')) { first(); return; }
        if (target.closest('[data-mm-prev]')) { prev(); return; }
        if (target.closest('[data-mm-next]')) { next(); return; }
        if (target.closest('[data-mm-last]')) { last(); return; }
        var seg = target.closest('[data-mm-seg]');
        if (seg) { goSegment(parseInt(seg.getAttribute('data-mm-seg'), 10)); return; }
        var row = target.closest('[data-mm-step]');
        if (row) { goTo(parseInt(row.getAttribute('data-mm-idx'), 10)); }
        return;
      }
      /* interactive */
      if (target.closest('[data-mm-undo]')) { undo(); return; }
      if (target.closest('[data-mm-reset]')) { reset(); return; }
      if (target.closest('[data-mm-hint]')) { showHint(); return; }
      var hyp = target.closest('[data-mm-hyp]');
      if (hyp) { applyLabel(hyp.getAttribute('data-mm-hyp')); return; }
      var ass = target.closest('[data-mm-assert]');
      if (ass) { applyLabel(ass.getAttribute('data-mm-assert')); }
    }

    /* ---------- 挂载 ---------- */

    if (mode === 'interactive' && canToggle) session = createSession();
    root = make(doc, 'div', 'mm-panel');
    root.setAttribute('data-mm-panel', '');
    container.appendChild(root);
    build();
    root.addEventListener('click', onClick);
    doc.addEventListener('keydown', onKeyDown, false);

    if (mode === 'interactive') {
      emitInteractiveProgress();
      maybeSolveInteractive(session ? session.state() : null);
    } else {
      emitProgress();
      maybeSolve();
    }

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
      headRefs = {};
      session = null;
      root = null;
    }

    function state() {
      var base = { mode: mode, destroyed: destroyed };
      if (mode === 'interactive') {
        var st = session ? session.state() : { actions: 0, reference: model.total, depth: 0, stack: [], history: [], solved: false, error: '' };
        base.actions = st.actions;
        base.reference = st.reference;
        base.depth = st.depth;
        base.stack = st.stack;
        base.history = st.history;
        base.solved = st.solved;
        base.error = st.error;
        base.hint = lastHint;
        return base;
      }
      base.current = model.total ? cur + 1 : 0;
      base.index = model.total ? cur : -1;
      base.total = model.total;
      base.revealed = revealed;
      base.solved = solvedOnce;
      base.paged = model.paged;
      base.segment = model.paged ? activeSeg : 0;
      base.segments = model.segmentCount;
      return base;
    }

    return {
      destroy: destroy,
      state: state,
      mode: function () { return mode; },
      setMode: function (nextMode) { return setMode(nextMode); },
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
