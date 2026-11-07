/* 公理板 — minimal one-screen game. */
(function () {
  'use strict';
  window.RSL = window.RSL || {};
  var L = window.RSL.Logic;
  var state = {
    levels: [],
    level: null,
    index: 0,
    solved: {},
    bestLen: {},
    usedKinds: {},
    usedArchive: {},
    usedTheorem: {},
    cleanWins: {},
    deletedThisLevel: false,
    achievements: {},
    coachSeen: {},
    board: null,
    results: null,
    selectedNode: null,
    selectedEdge: null,
    overlay: false,
    lastId: null,
    forceUnlock: false,
    sound: true,
    theme: 'light'
  };
  var els = {};
  var toastTimer = null;
  var SAVE_KEY = 'axiom-simple:v2';

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function parse(s) { try { return L.parse(s); } catch (e) { return null; } }
  function step(n) { return Math.round(n / 8) * 8; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function unique(a) { return a.filter(function (v, i) { return a.indexOf(v) === i; }); }

  function loadProgress() {
    try {
      var p = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}');
      state.solved = {};
      (p.solved || []).forEach(function (id) { state.solved[id] = true; });
      state.bestLen = p.bestLen || {};
      state.usedKinds = {};
      (p.usedKinds || []).forEach(function (k) { state.usedKinds[k] = true; });
      state.usedArchive = {};
      (p.usedArchive || []).forEach(function (k) { state.usedArchive[k] = true; });
      state.usedTheorem = {};
      (p.usedTheorem || []).forEach(function (k) { state.usedTheorem[k] = true; });
      state.cleanWins = {};
      (p.cleanWins || []).forEach(function (k) { state.cleanWins[k] = true; });
      state.achievements = {};
      (p.achievements || []).forEach(function (k) { state.achievements[k] = true; });
      state.coachSeen = {};
      (p.coachSeen || []).forEach(function (k) { state.coachSeen[k] = true; });
      state.lastId = p.lastId || null;
    } catch (e) { state.solved = {}; state.bestLen = {}; state.usedKinds = {}; state.usedArchive = {}; state.usedTheorem = {}; state.cleanWins = {}; state.achievements = {}; }
  }
  function progressPayload() {
    return {
      version: 2,
      solved: Object.keys(state.solved),
      bestLen: state.bestLen,
      usedKinds: Object.keys(state.usedKinds),
      usedArchive: Object.keys(state.usedArchive),
      usedTheorem: Object.keys(state.usedTheorem),
      cleanWins: Object.keys(state.cleanWins),
      achievements: Object.keys(state.achievements),
      coachSeen: Object.keys(state.coachSeen),
      lastId: state.level ? state.level.id : state.lastId
    };
  }
  function saveProgress() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(progressPayload())); } catch (e) {}
  }

  function cleanSave(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('bad save');
    function strings(v) { return Array.isArray(v) ? v.filter(function (x) { return typeof x === 'string'; }) : []; }
    function object(v) { return v && typeof v === 'object' && !Array.isArray(v) ? v : {}; }
    return {
      version: 2,
      solved: strings(raw.solved),
      bestLen: object(raw.bestLen),
      usedKinds: strings(raw.usedKinds),
      usedArchive: strings(raw.usedArchive),
      usedTheorem: strings(raw.usedTheorem),
      cleanWins: strings(raw.cleanWins),
      achievements: strings(raw.achievements),
      coachSeen: strings(raw.coachSeen),
      lastId: typeof raw.lastId === 'string' ? raw.lastId : null
    };
  }

  function exportSave() {
    var data = progressPayload();
    data.exportedAt = new Date().toISOString();
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'russell-save-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    a.parentNode.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    unlockAchv('exporter');
  }

  function importSave(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = cleanSave(JSON.parse(String(reader.result || '')));
        if (data.achievements.indexOf('importer') < 0) data.achievements.push('importer');
        localStorage.setItem(SAVE_KEY, JSON.stringify(data));
        toast('已导入');
        setTimeout(function () { window.location.reload(); }, 650);
      } catch (e) {
        toast('存档不对');
      }
    };
    reader.readAsText(file);
  }

  function loadSettings() {
    try {
      var s = JSON.parse(localStorage.getItem('axiom-simple:settings') || '{}');
      state.sound = s.sound !== false;
      state.theme = s.theme === 'dark' ? 'dark' : 'light';
    } catch (e) { state.sound = true; state.theme = 'light'; }
  }
  function saveSettings() {
    try { localStorage.setItem('axiom-simple:settings', JSON.stringify({ sound: state.sound, theme: state.theme })); } catch (e) {}
  }
  function applyTheme() {
    document.documentElement.dataset.theme = state.theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', state.theme === 'dark' ? '#151311' : '#f6f2e8');
    if (els.themeBtn) {
      els.themeBtn.innerHTML = '<svg class="icon"><use href="#i-' + (state.theme === 'dark' ? 'sun' : 'moon') + '"></use></svg>';
      els.themeBtn.setAttribute('aria-label', state.theme === 'dark' ? '切换浅色模式' : '切换深色模式');
    }
  }
  function updateSoundBtn() {
    if (!els.soundBtn) return;
    els.soundBtn.classList.toggle('is-muted', !state.sound);
    els.soundBtn.innerHTML = '<svg class="icon"><use href="#i-' + (state.sound ? 'speaker-wave' : 'speaker-x-mark') + '"></use></svg>';
    els.soundBtn.setAttribute('aria-label', state.sound ? '关闭音乐' : '开启音乐');
  }

  var bgm = null, audioCtx = null;
  function ensureAudio() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; }
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    if (!bgm) {
      bgm = document.getElementById('bgm');
      if (bgm) bgm.volume = 0.23;
    }
    if (state.sound && bgm && bgm.paused) bgm.play().catch(function () {});
  }
  function tone(freq, dur, type, gain, delay) {
    if (!state.sound) return;
    ensureAudio();
    if (!audioCtx) return;
    var t0 = audioCtx.currentTime + (delay || 0);
    var o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = type || 'sine';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain || 0.03, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }
  function sfx(kind) {
    if (kind === 'place') { tone(330, 0.06, 'triangle', 0.025); tone(495, 0.08, 'sine', 0.02, 0.04); }
    else if (kind === 'connect') { tone(660, 0.04, 'sine', 0.035); tone(990, 0.06, 'sine', 0.025, 0.04); }
    else if (kind === 'win') { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.18, 'sine', 0.04, i * 0.085); }); }
    else if (kind === 'fail') { tone(180, 0.13, 'triangle', 0.035); }
    else { tone(520, 0.035, 'sine', 0.018); }
  }
  function updateProgress() {
    var n = state.levels.length || 1;
    var solved = state.levels.filter(function (lv) { return state.solved[lv.id]; }).length;
    if (els.progressFill) els.progressFill.style.width = (solved / n * 100) + '%';
  }
  function unlockAchv(id) {
    if (state.achievements[id]) return false;
    var a = ACHV_BY_ID[id];
    if (!a) return false;
    state.achievements[id] = true;
    sfx('win');
    toast(a.name);
    saveProgress();
    return true;
  }

  function chapterLevels(key) {
    return state.levels.filter(function (lv) { return lv.chapter === key; });
  }

  function checkAchievements(level, len, kinds) {
    if (Object.keys(state.solved).length >= 1) unlockAchv('first');
    CHAPTERS.forEach(function (c) {
      var group = chapterLevels(c.key);
      var base = group.filter(function (lv) { return lv.band !== 'challenge'; });
      var chal = group.filter(function (lv) { return lv.band === 'challenge'; });
      if (base.length && base.every(function (lv) { return state.solved[lv.id]; })) unlockAchv('base-' + c.key);
      if (chal.length && chal.every(function (lv) { return state.solved[lv.id]; })) unlockAchv('chal-' + c.key);
    });
    if (kinds.subst) unlockAchv('rule-subst');
    if (kinds.replace) unlockAchv('rule-replace');
    if (kinds.detach) unlockAchv('rule-detach');
    if (kinds['all-intro'] || kinds['all-elim'] || kinds.syllogism) unlockAchv('rule-quant');
    var solved = Object.keys(state.solved).length;
    var ref = (level.solution && level.solution.nodes.length) || 0;
    if (ref && len <= ref) unlockAchv('efficient');
    if (ref && len === ref) unlockAchv('perfect');
    if (ref && len < ref) unlockAchv('shorter');
    if (solved >= 10) unlockAchv('ten');
    if (solved >= 120) unlockAchv('half');
    var all = state.levels;
    if (all.length && all.filter(function (lv) { return lv.band !== 'challenge'; }).every(function (lv) { return state.solved[lv.id]; })) unlockAchv('all-base');
    if (all.length && all.filter(function (lv) { return lv.band === 'challenge'; }).every(function (lv) { return state.solved[lv.id]; })) unlockAchv('challenge-all');
    if (Object.keys(state.usedArchive).length >= 10) unlockAchv('archive-ten');
    if (Object.keys(state.usedTheorem).length >= 10) unlockAchv('theorem-ten');
    if (Object.keys(state.cleanWins).length >= 1) unlockAchv('clean-one');
    if (Object.keys(state.cleanWins).length >= 5) unlockAchv('clean-five');
    var hard = all.filter(function (lv) { return lv.band === 'challenge' && state.solved[lv.id]; }).length;
    if (hard >= 10) unlockAchv('hard-ten');
    if (hard >= 30) unlockAchv('hard-thirty');
    if (all.length && all.every(function (lv) { return state.solved[lv.id]; })) unlockAchv('all');
  }

  function openAchievements() {
    sfx('click');
    els.overlay.hidden = false;
    var got = ACHIEVEMENTS.filter(function (a) { return state.achievements[a.id]; }).length;
    var cards = ACHIEVEMENTS.map(function (a) {
      var on = !!state.achievements[a.id];
      return '<button class="achv' + (on ? ' is-on' : '') + '" data-achv="' + a.id + '" title="' + esc(on ? a.name : '未解锁') + '" aria-label="' + esc(on ? a.name : '未解锁成就') + '">' +
        (on ? '<span class="achv-icon"><svg class="icon"><use href="#' + a.symbol + '"></use></svg></span>' : '<span class="achv-q"><svg class="icon"><use href="#i-question-mark-circle"></use></svg></span>') +
      '</button>';
    }).join('');
    els.sheet.innerHTML =
      '<button class="sheet-x" data-close aria-label="关闭"><svg class="icon"><use href="#i-x-mark"></use></svg></button>' +
      '<div class="achv-head"><span class="achv-count">' + got + ' / ' + ACHIEVEMENTS.length + '</span><span class="achv-bar"><i style="width:' + (got / ACHIEVEMENTS.length * 100) + '%"></i></span></div>' +
      '<div class="achv-grid">' + cards + '</div>';
    els.sheet.scrollTop = 0;
  }

  function openAchievement(id) {
    var a = ACHV_BY_ID[id];
    if (!a) return;
    var on = !!state.achievements[id];
    els.overlay.hidden = false;
    els.sheet.innerHTML =
      '<button class="sheet-x" data-close aria-label="关闭"><svg class="icon"><use href="#i-x-mark"></use></svg></button>' +
      '<div class="achv-detail">' +
        '<button class="achv-back" data-back aria-label="返回成就列表"><svg class="icon"><use href="#i-arrow-left"></use></svg></button>' +
        '<div class="achv-detail-icon' + (on ? ' is-on' : '') + '">' +
          (on ? '<svg class="icon"><use href="#' + a.symbol + '"></use></svg>' : '<span class="achv-q"><svg class="icon"><use href="#i-question-mark-circle"></use></svg></span>') +
        '</div>' +
        '<h2>' + esc(a.name) + '</h2>' +
        '<p>' + esc(a.desc) + '</p>' +
        '<span class="achv-status">' + (on ? '已解锁' : '未解锁') + '</span>' +
      '</div>';
    els.sheet.scrollTop = 0;
  }

  /* 规则提示窗：只画“输入 → 模块 → 输出”，不显示本关答案。 */
  var COACH = {
    subst: '<span class="chip">P</span><span class="plus">+</span><span class="chip">B</span><span class="arrow">→</span><span class="coach-mod">S</span><span class="arrow">→</span><span class="chip">A</span>',
    detach: '<span class="chip">A</span><span class="chip">A→B</span><span class="arrow">→</span><span class="coach-mod">M</span><span class="arrow">→</span><span class="chip">B</span>',
    replace: '<span class="chip">A</span><span class="arrow">→</span><span class="coach-mod">D</span><span class="arrow">→</span><span class="chip">A′</span>',
    'all-intro': '<span class="chip">A</span><span class="arrow">→</span><span class="coach-mod">∀I</span><span class="arrow">→</span><span class="chip">∀x A</span>',
    'all-elim': '<span class="chip">∀x A</span><span class="arrow">→</span><span class="coach-mod">∀E</span><span class="arrow">→</span><span class="chip">A[t/x]</span>',
    'exists-intro': '<span class="chip">A[t/x]</span><span class="arrow">→</span><span class="coach-mod">∃I</span><span class="arrow">→</span><span class="chip">∃x A</span>',
    'exists-elim': '<span class="chip">∃x A</span><span class="chip">A[y/x]→B</span><span class="arrow">→</span><span class="coach-mod">∃E</span><span class="arrow">→</span><span class="chip">B</span>',
    syllogism: '<span class="chip">A→B</span><span class="chip">B→C</span><span class="arrow">→</span><span class="coach-mod">HS</span><span class="arrow">→</span><span class="chip">A→C</span>'
  };

  function hideCoach() { els.coachPop.hidden = true; els.coachPop.innerHTML = ''; }

  function showCoachKind(kind) {
    if (!COACH[kind]) return;
    els.coachPop.innerHTML = '<div class="coach-flow">' + COACH[kind] + '</div>';
    els.coachPop.hidden = false;
    sfx('click');
  }

  function showCoach(level) {
    if (!level.coach || state.coachSeen[level.id] || !COACH[level.coach]) return;
    state.coachSeen[level.id] = true;
    saveProgress();
    showCoachKind(level.coach);
  }

  function confetti() {
    var host = els.sheet.querySelector('.win');
    if (!host) return;
    host.style.position = 'relative';
    var box = document.createElement('div');
    box.className = 'confetti';
    var colors = ['#e66f3f', '#3f8e65', '#4f7fb5', '#2b2721', '#e8b04b'];
    for (var i = 0; i < 28; i++) {
      var s = document.createElement('i');
      s.style.setProperty('--c', colors[i % colors.length]);
      s.style.left = (i % 2 ? 4 + Math.random() * 20 : 76 + Math.random() * 20) + '%';
      s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
      s.style.setProperty('--d', (Math.random() * 0.45) + 's');
      s.style.setProperty('--t', (1.1 + Math.random() * 0.8) + 's');
      box.appendChild(s);
    }
    host.appendChild(box);
    setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 2200);
  }

  var CHAPTERS = [
    { id: 'Ⅰ', key: 'prop', title: '命题' },
    { id: 'Ⅱ', key: 'pred', title: '谓词' },
    { id: 'Ⅲ', key: 'eq', title: '等词' },
    { id: 'Ⅳ', key: 'set', title: '集合' }
  ];

  /* 30 个成就：短名称 + 一句条件说明。 */
  var ACHIEVEMENTS = [
    { id: 'first', symbol: 'i-play', name: '通电', desc: '完成第一关。' },
    { id: 'base-prop', symbol: 'i-book-open', name: '命题基础', desc: '打通命题章基础段。' },
    { id: 'base-pred', symbol: 'i-book-open', name: '谓词基础', desc: '打通谓词章基础段。' },
    { id: 'base-eq', symbol: 'i-book-open', name: '等词基础', desc: '打通等词章基础段。' },
    { id: 'base-set', symbol: 'i-book-open', name: '集合基础', desc: '打通集合章基础段。' },
    { id: 'chal-prop', symbol: 'i-star', name: '命题挑战', desc: '打通命题章挑战段。' },
    { id: 'chal-pred', symbol: 'i-star', name: '谓词挑战', desc: '打通谓词章挑战段。' },
    { id: 'chal-eq', symbol: 'i-star', name: '等词挑战', desc: '打通等词章挑战段。' },
    { id: 'chal-set', symbol: 'i-star', name: '集合挑战', desc: '打通集合章挑战段。' },
    { id: 'rule-subst', symbol: 'i-arrow-path', name: '代入', desc: '第一次使用 S 代入模块。' },
    { id: 'rule-replace', symbol: 'i-arrows-right-left', name: '置换', desc: '第一次使用 D 定义置换模块。' },
    { id: 'rule-detach', symbol: 'i-link', name: '分离', desc: '第一次使用 M 分离模块。' },
    { id: 'rule-quant', symbol: 'i-globe-alt', name: '量词', desc: '第一次使用全称、存在或三段论规则。' },
    { id: 'efficient', symbol: 'i-bolt', name: '短证明', desc: '任一关的模块数不超过参考电路。' },
    { id: 'all', symbol: 'i-check-badge', name: '全通关', desc: '打通全部 240 关。' },
    { id: 'perfect', symbol: 'i-squares-2x2', name: '精确复刻', desc: '任一关的模块数与参考电路完全相同。' },
    { id: 'shorter', symbol: 'i-arrow-right', name: '更短', desc: '任一关的模块数少于参考电路。' },
    { id: 'ten', symbol: 'i-book-open', name: '十关', desc: '累计通过 10 关。' },
    { id: 'half', symbol: 'i-book-open', name: '半程', desc: '累计通过 120 关。' },
    { id: 'all-base', symbol: 'i-check-badge', name: '基础全通', desc: '四章基础段全部打通。' },
    { id: 'challenge-all', symbol: 'i-star', name: '挑战全通', desc: '四章挑战段全部打通。' },
    { id: 'archive-ten', symbol: 'i-book-open', name: '档案员', desc: '在 10 个不同关卡里使用档案模块。' },
    { id: 'theorem-ten', symbol: 'i-link', name: '定理员', desc: '在 10 个不同关卡里使用已证结论。' },
    { id: 'clean-one', symbol: 'i-check-badge', name: '一次成功', desc: '不删除模块完成一关。' },
    { id: 'clean-five', symbol: 'i-check-badge', name: '干净五关', desc: '不删除模块完成 5 关。' },
    { id: 'hard-ten', symbol: 'i-bolt', name: '挑战者', desc: '通过 10 个挑战关。' },
    { id: 'hard-thirty', symbol: 'i-bolt', name: '硬核', desc: '通过 30 个挑战关。' },
    { id: 'theme', symbol: 'i-moon', name: '夜间模式', desc: '切换到深色模式。' },
    { id: 'exporter', symbol: 'i-arrow-up-tray', name: '备份', desc: '导出一次存档。' },
    { id: 'importer', symbol: 'i-arrow-down-tray', name: '读档', desc: '导入一次存档。' }
  ];
  var ACHV_BY_ID = {};
  ACHIEVEMENTS.forEach(function (a) { ACHV_BY_ID[a.id] = a; });
  function chapterOf(lv) {
    if (lv.chapter === 'pred') return 'Ⅱ';
    if (lv.chapter === 'eq') return 'Ⅲ';
    if (lv.chapter === 'set') return 'Ⅳ';
    return 'Ⅰ';
  }
  var CHAPTER_RANK = {}; CHAPTERS.forEach(function (c, i) { CHAPTER_RANK[c.id] = i; });

  function buildLevels() {
    var list = (window.RSL.LEVELS || []).slice();
    list.forEach(function (lv, i) {
      lv.chapter = lv.chapter || 'prop';
      lv.band = lv.band || 'base';
      lv.targetPos = lv.targetPos || { x: 650, y: 300 };
      lv.allowed = lv.allowed || [];
      lv._ord = i;
      lv.chapterGroup = chapterOf(lv);
    });
    function levelNo(lv) {
      var m = /^CH\d+-(\d+)$/.exec(String(lv.id || ''));
      return m ? parseInt(m[1], 10) : lv._ord;
    }
    list.sort(function (a, b) {
      return (CHAPTER_RANK[a.chapterGroup] - CHAPTER_RANK[b.chapterGroup]) || (levelNo(a) - levelNo(b));
    });
    var prevBaseLast = null;
    CHAPTERS.forEach(function (c) {
      var group = list.filter(function (lv) { return lv.chapterGroup === c.id; });
      var base = group.filter(function (lv) { return lv.band !== 'challenge'; });
      var chal = group.filter(function (lv) { return lv.band === 'challenge'; });
      base.forEach(function (lv, i) {
        lv.requires = i === 0 ? (prevBaseLast ? [prevBaseLast] : []) : [base[i - 1].id];
        lv.challenge = false;
      });
      chal.forEach(function (lv, i) {
        lv.requires = i === 0 ? (base.length ? [base[base.length - 1].id] : (prevBaseLast ? [prevBaseLast] : [])) : [chal[i - 1].id];
        lv.challenge = i === chal.length - 1;
      });
      if (base.length) prevBaseLast = base[base.length - 1].id;
    });
    /* 关卡数据里的 coach 字段决定是否弹规则提示；没有则安静开始。 */
    state.levels = list;
  }

  function isUnlocked(index) {
    if (state.forceUnlock) return true;
    var lv = state.levels[index];
    if (!lv) return false;
    return (lv.requires || []).every(function (id) { return !!state.solved[id]; });
  }

  function partPool() {
    return (window.RSL.PARTS || []).slice();
  }

  function levelById(id) {
    var levels = window.RSL.LEVELS || [];
    for (var i = 0; i < levels.length; i += 1) if (levels[i].id === id) return levels[i];
    return null;
  }

  function partsForLevel() {
    var allowed = state.level.allowed || [];
    var pool = partPool();
    var out = [];
    allowed.forEach(function (key) {
      if (key === 'target') return;
      var p = pool.filter(function (x) { return x.key === key; })[0];
      if (!p && key.indexOf('theorem:') === 0) {
        var lv = levelById(key.slice(8));
        if (lv) {
          p = {
            key: key, kind: 'theorem', symbol: (lv.code || lv.id).split('-').pop(),
            name: '已证 ' + (lv.code || lv.id) + ' · ' + (lv.title || ''),
            code: lv.id, config: { theoremCode: lv.id }
          };
        }
      }
      if (!p && key.indexOf('archive:') === 0) {
        var label = key.slice(8);
        var ar = window.RSL.ARCHIVE && window.RSL.ARCHIVE[label];
        if (ar) {
          p = {
            key: key, kind: 'archive', symbol: label.slice(0, 6),
            name: 'set.mm ' + label + ' · ' + (ar.name || ''),
            code: label, config: { label: label }
          };
        }
      }
      if (!p && key.indexOf('axiom:') === 0) {
        var id = key.slice(6);
        var a = window.RSL.axiomById ? window.RSL.axiomById(id) : null;
        if (a) p = {
          key: key, kind: 'axiom', symbol: a.symbol || id,
          name: (a.type === 'definition' ? '定义 ' : a.type === 'theorem' ? '定理 ' : '公理 ') + a.code + ' · ' + a.name,
          code: a.code, config: { axiomId: id }
        };
      }
      if (p) out.push(p);
    });
    return out;
  }

  function formulaHTML(ast) {
    function sp(cls, text) { return '<span class="' + cls + '">' + esc(text) + '</span>'; }
    function term(t) { return sp('f-var', t && t.name ? t.name : 'x'); }
    function isBin(n) { return n.k === 'or' || n.k === 'and' || n.k === 'imp' || n.k === 'iff'; }
    function operand(n) {
      var body = go(n);
      return (isBin(n) || n.k === 'all' || n.k === 'exists') ? sp('f-paren', '(') + body + sp('f-paren', ')') : body;
    }
    function go(n) {
      if (!n) return '';
      switch (n.k) {
        case 'atom': return sp('f-var', n.name);
        case 'var': return sp('f-var', n.name);
        case 'pred':
          if ((n.name === '=' || n.name === '∈') && (n.args || []).length === 2) return term(n.args[0]) + sp('f-op', ' ' + n.name + ' ') + term(n.args[1]);
          return sp('f-name', n.name) + sp('f-paren', '(') + (n.args || []).map(term).join(sp('f-op', ', ')) + sp('f-paren', ')');
        case 'not': {
          var c = n.a;
          return sp('f-op', '¬') + ((isBin(c) || c.k === 'all' || c.k === 'exists') ? sp('f-paren', '(') + go(c) + sp('f-paren', ')') : go(c));
        }
        case 'or': return operand(n.a) + sp('f-op', ' ∨ ') + operand(n.b);
        case 'and': return operand(n.a) + sp('f-op', ' ∧ ') + operand(n.b);
        case 'imp': return operand(n.a) + sp('f-op', ' → ') + operand(n.b);
        case 'iff': return operand(n.a) + sp('f-op', ' ↔ ') + operand(n.b);
        case 'all': return sp('f-quant', '∀') + sp('f-var', n.v) + sp('f-op', ' ') + operand(n.a);
        case 'exists': return sp('f-quant', '∃') + sp('f-var', n.v) + sp('f-op', ' ') + operand(n.a);
        default: return esc(L.fmt ? L.fmt(n) : '');
      }
    }
    try { return go(ast); } catch (e) { return esc(L.fmt ? L.fmt(ast) : ''); }
  }

  function goalHTML(text) {
    var ast = parse(text);
    return ast ? formulaHTML(ast) : esc(text);
  }

  function toast(msg) {
    clearTimeout(toastTimer);
    els.toast.textContent = msg;
    els.toast.classList.add('is-on');
    toastTimer = setTimeout(function () { els.toast.classList.remove('is-on'); }, 1800);
  }

  function freeSpot() {
    var nodes = state.board.items || [];
    var v = state.board.view;
    var left = Math.max(30, -v.x / v.scale + 30);
    var top = Math.max(30, -v.y / v.scale + 30);
    var cols = [left, left + 270, left + 540, left + 810];
    var rows = [top, top + 170, top + 340, top + 510];
    for (var c = 0; c < cols.length; c++) {
      for (var r = 0; r < rows.length; r++) {
        var x = cols[c], y = rows[r];
        var hit = nodes.some(function (n) { return Math.abs(n.x - x) < 245 && Math.abs(n.y - y) < 150; });
        if (!hit) return { x: x, y: y };
      }
    }
    return { x: left + 30, y: top + 30 };
  }

  function loadLevel(index) {
    if (!isUnlocked(index)) { toast('先完成前一关'); return; }
    closeOverlay();
    hideCoach();
    state.deletedThisLevel = false;
    state.index = index;
    state.level = state.levels[index];
    state.selectedNode = null;
    state.selectedEdge = null;
    var mobile = window.innerWidth <= 700;
    var tx = mobile ? 250 : state.level.targetPos.x;
    var ty = mobile ? 300 : state.level.targetPos.y;
    var target = {
      id: 'target', kind: 'target',
      x: tx, y: ty,
      target: state.level.target, config: {}
    };
    state.board.setData([target], []);
    els.goalFormula.innerHTML = goalHTML(state.level.target);
    var plain = els.goalFormula.textContent || state.level.target;
    els.goal.classList.toggle('is-long', plain.length > 52);
    els.levelBtn.textContent = String(index + 1).padStart(2, '0');
    els.levelBtn.setAttribute('aria-label', '第 ' + (index + 1) + ' 关，选择关卡');
    els.popover.hidden = true;
    buildTray();
    state.board.result = null;
    refresh();
    var W = state.board.board.clientWidth || 1000;
    var H = state.board.board.clientHeight || 600;
    if (mobile) {
      state.board.setView(18, 26, 0.72);
    } else {
      var scale = clamp((W - 120) / (tx + 280), 0.42, 1.0);
      state.board.setView(W - 60 - (tx + 232) * scale, Math.max(40, (H - 220) / 2 - ty * scale * 0.15), scale);
    }
    els.coach.hidden = !(index === 0 && state.board.items.length <= 1);
    saveProgress();
    showCoach(state.level);
  }

  function buildTray() {
    var parts = partsForLevel();
    els.tray.innerHTML = parts.map(function (p) {
      var symbol = p.symbol || '·';
      var small = symbol.length > 3 ? ' is-long' : '';
      return '<button class="tile' + small + '" data-key="' + esc(p.key) + '" title="' + esc(p.name) + '" aria-label="' + esc(p.name) + '"><span>' + esc(symbol) + '</span></button>';
    }).join('');
  }

  function refresh() {
    if (!state.level) return;
    var data = state.board.getData();
    var r = window.RSL.Engine.evaluate(state.level, data.nodes, data.edges);
    state.results = r;
    state.board.paint(r);
    els.coach.hidden = !(state.index === 0 && data.nodes.length <= 1);
    els.checkBtn.classList.toggle('is-ready', r.complete);
    renderPopover();
    saveProgress();
  }

  function addPart(key) {
    var p = partsForLevel().filter(function (x) { return x.key === key; })[0];
    if (!p) return;
    var pos = freeSpot();
    sfx('place');
    var n = state.board.addNode(p.kind, Object.assign({}, p.config || {}), pos);
    state.board.select(n.id);
    state.selectedNode = n.id;
    state.selectedEdge = null;
    refresh();
  }

  function optionButton(label, kind, patch, extra) {
    return '<button class="option" data-' + kind + '="1"' + (extra || '') + '>' + label + '</button>';
  }

  function renderPopover() {
    var n = state.selectedNode ? state.board.node(state.selectedNode) : null;
    if (!n || n.kind === 'target') { els.popover.hidden = true; return; }
    var r = state.results && state.results.results[n.id];
    var cfg = n.config || {};
    var html = '';
    if (n.kind === 'atom') {
      html = ['P', 'Q', 'R', 'S', 'T'].map(function (x) {
        return '<button class="opt' + (cfg.name === x ? ' is-on' : '') + '" data-config="name" data-value="' + x + '">' + x + '</button>';
      }).join('');
    } else if (n.kind === 'replace' && r && r.meta && r.meta.options) {
      html = r.meta.options.slice(0, 8).map(function (o) {
        return '<button class="opt formula-opt' + (r.meta.optionId === o.id ? ' is-on' : '') + '" data-option="' + esc(o.id) + '">' + (window.RSL.formatFormula ? window.RSL.formatFormula(o.result) : esc(o.label)) + '</button>';
      }).join('');
    } else if (n.kind === 'quant') {
      html = '<button class="opt' + (cfg.kind === 'all' ? ' is-on' : '') + '" data-config="kind" data-value="all">∀</button>' +
        '<button class="opt' + (cfg.kind === 'exists' ? ' is-on' : '') + '" data-config="kind" data-value="exists">∃</button>' +
        '<span class="opt-gap"></span>' + ['x', 'y', 'z'].map(function (v) {
          return '<button class="opt' + (cfg.v === v ? ' is-on' : '') + '" data-config="v" data-value="' + v + '">' + v + '</button>';
        }).join('');
    } else if (n.kind === 'pred') {
      html = ['F', 'G', 'H'].map(function (x) {
        return '<button class="opt' + (cfg.name === x ? ' is-on' : '') + '" data-config="name" data-value="' + x + '">' + x + '</button>';
      }).join('') + '<span class="opt-gap"></span>' + ['x', 'y', 'z'].map(function (v) {
        return '<button class="opt' + (cfg.arg === v ? ' is-on' : '') + '" data-config="arg" data-value="' + v + '">' + v + '</button>';
      }).join('');
    } else if (n.kind === 'all-elim') {
      html = ['a', 'b', 'c', 'x', 'y', 'z'].map(function (v) {
        return '<button class="opt' + (cfg.term === v ? ' is-on' : '') + '" data-config="term" data-value="' + v + '">' + v + '</button>';
      }).join('');
    } else if (n.kind === 'all-intro' || n.kind === 'exists-intro') {
      html = ['x', 'y', 'z'].map(function (v) {
        return '<button class="opt' + (cfg.v === v ? ' is-on' : '') + '" data-config="v" data-value="' + v + '">' + v + '</button>';
      }).join('');
    } else if (n.kind === 'exists-elim') {
      html = ['y', 'z'].map(function (v) {
        return '<button class="opt' + (cfg.y === v ? ' is-on' : '') + '" data-config="y" data-value="' + v + '">' + v + '</button>';
      }).join('');
    }
    if (!html) { els.popover.hidden = true; return; }
    els.popover.innerHTML = html;
    els.popover.hidden = false;
  }

  function deleteSelection() {
    state.board.removeSelected();
    state.selectedNode = null;
    state.selectedEdge = null;
    els.popover.hidden = true;
    refresh();
  }

  function check() {
    var r = state.results;
    if (!r) return;
    if (r.complete) { win(); return; }
    sfx('fail');
    if (r.errors.length) { toast('没接完'); return; }
    if (r.target && r.target.state === 'error') { toast('不对'); return; }
    toast('接到 ⊢');
  }

  function win() {
    var lv = state.level;
    state.solved[lv.id] = true;
    var items = (state.board.items || []).filter(function (n) { return n.kind !== 'target'; });
    var len = items.length;
    var kinds = {};
    items.forEach(function (n) {
      state.usedKinds[n.kind] = true;
      kinds[n.kind] = true;
      if (n.kind === 'archive') state.usedArchive[lv.id] = true;
      if (n.kind === 'theorem') state.usedTheorem[lv.id] = true;
    });
    if (!state.deletedThisLevel) state.cleanWins[lv.id] = true;
    if (!state.bestLen[lv.id] || len < state.bestLen[lv.id]) state.bestLen[lv.id] = len;
    saveProgress();
    checkAchievements(lv, len, kinds);
    sfx('win');
    updateProgress();
    els.levelBtn.classList.remove('just-solved');
    void els.levelBtn.offsetWidth;
    els.levelBtn.classList.add('just-solved');
    setTimeout(function () { els.levelBtn.classList.remove('just-solved'); }, 520);
    var isLast = state.index >= state.levels.length - 1;
    var ref = (lv.solution && lv.solution.nodes.length) || len;
    var eff = Math.max(1, Math.min(100, Math.round(ref / Math.max(1, len) * 100)));
    els.overlay.hidden = false;
    els.sheet.innerHTML =
      '<button class="sheet-x" data-close aria-label="关闭"><svg class="icon"><use href="#i-x-mark"></use></svg></button>' +
      '<div class="win">' +
        '<div class="win-check"><svg class="icon"><use href="#i-check"></use></svg></div>' +
        '<div class="win-formula formula">' + goalHTML(lv.target) + '</div>' +
        '<div class="win-len" title="推理长度：模块数 / 参考电路模块数">' +
          '<span class="metric-glyph"><svg class="icon"><use href="#i-squares-2x2"></use></svg></span><b>' + len + '</b><span class="metric-ref">/ ' + ref + '</span>' +
          '<span class="metric-bar"><i style="width:' + eff + '%"></i></span>' +
        '</div>' +
        '<button class="primary next-btn" data-next="1">' + (isLast ? '选关' : '下一关') + '</button>' +
      '</div>';
    confetti();
  }

  function openLevels() {
    sfx('click');
    els.overlay.hidden = false;
    var buckets = {};
    CHAPTERS.forEach(function (c) { buckets[c.id] = []; });
    state.levels.forEach(function (lv, i) {
      (buckets[chapterOf(lv)] || buckets['Ⅰ']).push({ lv: lv, i: i });
    });
    function cellsFor(items) {
      return items.map(function (x) {
        var unlocked = isUnlocked(x.i);
        var ref = x.lv.solution && x.lv.solution.nodes ? x.lv.solution.nodes.length : 1;
        var best = state.bestLen[x.lv.id];
        var eff = best ? Math.max(8, Math.min(100, Math.round(ref / best * 100))) : 0;
        var style = best ? ' style="--eff:' + eff + '%;--effpx:' + Math.round(34 * eff / 100) + 'px"' : '';
        var cls = 'level-cell' + (x.i === state.index ? ' is-current' : '') +
          (state.solved[x.lv.id] ? ' is-solved' : '') +
          (x.lv.challenge ? ' is-challenge' : '') +
          (x.lv.band === 'challenge' ? ' is-challenge-band' : '') +
          (unlocked ? '' : ' is-locked');
        return '<button class="' + cls + '" data-level="' + x.i + '" aria-label="第 ' + (x.i + 1) + ' 关' + (unlocked ? '' : '，未解锁') + '"' + (unlocked ? '' : ' disabled') + style + '>' +
          String(x.i + 1).padStart(2, '0') +
          '<i class="eff" aria-hidden="true"></i>' +
          '</button>';
      }).join('');
    }
    function bandHTML(items, kind) {
      if (!items.length) return '';
      var solved = items.filter(function (x) { return state.solved[x.lv.id]; }).length;
      var firstLocked = !isUnlocked(items[0].i);
      var glyph = kind === 'challenge' ? 'i-star' : 'i-book-open';
      return '<div class="band ' + kind + (firstLocked ? ' is-locked' : '') + '">' +
        '<div class="band-head" title="' + (kind === 'challenge' ? '挑战' : '基础') + '">' +
          '<span class="band-glyph"><svg class="icon"><use href="#' + glyph + '"></use></svg></span>' +
          '<span class="band-progress" aria-hidden="true"><i style="width:' + (solved / items.length * 100) + '%"></i></span>' +
        '</div>' +
        '<div class="levels">' + cellsFor(items) + '</div>' +
      '</div>';
    }
    var html = CHAPTERS.map(function (c) {
      var items = buckets[c.id] || [];
      if (!items.length) return '';
      var solved = items.filter(function (x) { return state.solved[x.lv.id]; }).length;
      var isCurrent = items.some(function (x) { return x.i === state.index; });
      var base = items.filter(function (x) { return x.lv.band !== 'challenge'; });
      var chal = items.filter(function (x) { return x.lv.band === 'challenge'; });
      var chapterLocked = !isUnlocked(items[0].i);
      return '<section class="chapter' + (isCurrent ? ' is-current' : '') + (chapterLocked ? ' is-locked' : '') + '">' +
        '<div class="chapter-head">' +
          '<span class="chapter-roman">' + c.id + '</span>' +
          '<span class="chapter-title">' + c.title + '</span>' +
          '<span class="chapter-progress" aria-hidden="true"><i style="width:' + (solved / items.length * 100) + '%"></i></span>' +
        '</div>' +
        bandHTML(base, 'base') +
        bandHTML(chal, 'challenge') +
      '</section>';
    }).join('');
    els.sheet.innerHTML = '<button class="sheet-x" data-close aria-label="关闭"><svg class="icon"><use href="#i-x-mark"></use></svg></button><div class="chapters">' + html + '</div>';
    els.sheet.scrollTop = 0;
  }

  function openHelp() {
    sfx('click');
    els.overlay.hidden = false;
    els.sheet.innerHTML =
      '<button class="sheet-x" data-close aria-label="关闭"><svg class="icon"><use href="#i-x-mark"></use></svg></button>' +
      '<div class="help">' +
        '<div class="help-steps">' +
          '<span class="help-box"><svg class="icon"><use href="#i-plus"></use></svg></span>' +
          '<span class="help-box"><svg class="icon"><use href="#i-arrow-right"></use></svg></span>' +
          '<span class="help-box"><svg class="icon"><use href="#i-play"></use></svg></span>' +
        '</div>' +
        '<div class="help-cards">' +
          '<div class="help-card" data-coach="subst"><b>S</b><span>P · B → A</span></div>' +
          '<div class="help-card" data-coach="detach"><b>M</b><span>A · A→B → B</span></div>' +
          '<div class="help-card" data-coach="replace"><b>D</b><span>A↔B ⇄ ¬A∨B</span></div>' +
          '<div class="help-card" data-coach="all-intro"><b>∀</b><span>A(x) ⇄ ∀x A</span></div>' +
        '</div>' +
        '<div class="save-row">' +
          '<button class="save-btn" data-save-export title="导出存档" aria-label="导出存档"><svg class="icon"><use href="#i-arrow-up-tray"></use></svg><span>导出</span></button>' +
          '<button class="save-btn" data-save-import title="导入存档" aria-label="导入存档"><svg class="icon"><use href="#i-arrow-down-tray"></use></svg><span>导入</span></button>' +
        '</div>' +
      '</div>' +
      '<p class="credit">Design by yyxcnasd</p>';
  }

  function closeOverlay() {
    els.overlay.hidden = true;
    els.sheet.innerHTML = '';
    state.overlay = false;
  }

  function nextLevel() {
    var next = state.index + 1;
    if (next >= state.levels.length || !isUnlocked(next)) { openLevels(); return; }
    loadLevel(next);
  }

  function bind() {
    els.levelBtn.addEventListener('click', openLevels);
    els.checkBtn.addEventListener('click', check);
    els.helpBtn.addEventListener('click', openHelp);
    els.achvBtn.addEventListener('click', openAchievements);
    els.coachPop.addEventListener('click', hideCoach);
    els.coachPop.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
    els.sheet.addEventListener('click', function (e) {
      var card = e.target.closest && e.target.closest('[data-coach]');
      if (card) { closeOverlay(); showCoachKind(card.dataset.coach); return; }
      var achv = e.target.closest && e.target.closest('[data-achv]');
      if (achv) { openAchievement(achv.dataset.achv); return; }
      if (e.target.closest && e.target.closest('[data-back]')) { openAchievements(); return; }
      if (e.target.closest && e.target.closest('[data-save-export]')) { exportSave(); return; }
      if (e.target.closest && e.target.closest('[data-save-import]')) { els.saveFile.click(); return; }
    });
    els.saveFile.addEventListener('change', function () {
      importSave(els.saveFile.files && els.saveFile.files[0]);
      els.saveFile.value = '';
    });
    els.themeBtn.addEventListener('click', function () {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      saveSettings();
      if (state.theme === 'dark') unlockAchv('theme');
      sfx('click');
    });
    els.soundBtn.addEventListener('click', function () {
      state.sound = !state.sound;
      updateSoundBtn();
      saveSettings();
      if (state.sound) ensureAudio();
      else if (bgm) bgm.pause();
      sfx('click');
    });
    document.addEventListener('pointerdown', function () {
      ensureAudio();
    });
    els.tray.addEventListener('click', function (e) {
      var tile = e.target.closest('.tile');
      if (tile) addPart(tile.dataset.key);
    });
    els.popover.addEventListener('click', function (e) {
      var opt = e.target.closest('[data-config]');
      if (opt && state.selectedNode) {
        var patch = {};
        patch[opt.dataset.config] = opt.dataset.value;
        state.board.updateConfig(state.selectedNode, patch);
        state.selectedNode = state.board.selectedNode;
        refresh();
        return;
      }
      var ro = e.target.closest('[data-option]');
      if (ro && state.selectedNode) {
        state.board.updateConfig(state.selectedNode, { optionId: ro.dataset.option, preferDef: '', preferDir: '', preferPath: null });
        state.selectedNode = state.board.selectedNode;
        refresh();
      }
    });
    els.overlay.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) { closeOverlay(); return; }
      var lv = e.target.closest('[data-level]');
      if (lv) {
        var idx = parseInt(lv.dataset.level, 10);
        if (!isUnlocked(idx)) return;
        loadLevel(idx);
        return;
      }
      if (e.target.closest('[data-next]')) { nextLevel(); return; }
      if (e.target === els.overlay) closeOverlay();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (!els.overlay.hidden) closeOverlay();
        else { state.board.selectedNode = null; state.board.selectedNodes = []; state.board.selectedEdge = null; state.board.render(); state.selectedNode = null; state.selectedEdge = null; refresh(); }
        return;
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && !e.target.closest('input,textarea')) {
        if (state.selectedNode || state.selectedEdge || (state.board.selectedNodes && state.board.selectedNodes.length)) { e.preventDefault(); deleteSelection(); }
      }
    });
    window.addEventListener('resize', function () { if (state.board) state.board._updateWires(); });
  }

  function init() {
    ['levelBtn', 'goal', 'goalFormula', 'themeBtn', 'soundBtn', 'helpBtn', 'achvBtn', 'checkBtn', 'progressFill', 'board', 'boardWorld', 'wireLayer', 'nodeLayer', 'tray', 'popover', 'toast', 'overlay', 'sheet', 'coach', 'coachPop', 'saveFile'].forEach(function (id) { els[id] = $(id); });
    if (!L) { document.body.innerHTML = '<div class="fatal">逻辑引擎未加载</div>'; return; }
    window.RSL.formatFormula = function (ast) { return formulaHTML(ast); };
    loadProgress();
    loadSettings();
    applyTheme();
    updateSoundBtn();
    buildLevels();
    state.board = new window.RSL.Board({
      board: els.board,
      world: els.boardWorld,
      wires: els.wireLayer,
      nodes: els.nodeLayer,
      onChange: function () { refresh(); },
      onSelect: function (node, edge) {
        state.selectedNode = node;
        state.selectedEdge = edge;
        refresh();
      },
      onToast: function (msg) { toast(msg); },
      onConnect: function () { sfx('connect'); },
      onRemove: function (kind) { if (kind === 'node') state.deletedThisLevel = true; sfx('click'); }
    });
    bind();
    var start = -1;
    if (state.lastId) {
      for (var i = 0; i < state.levels.length; i++) if (state.levels[i].id === state.lastId) { start = i; break; }
    }
    if (start < 0 || state.solved[state.levels[start].id] || !isUnlocked(start)) {
      start = -1;
      for (var j = 0; j < state.levels.length; j++) {
        if (!state.solved[state.levels[j].id] && isUnlocked(j)) { start = j; break; }
      }
      if (start < 0) start = state.levels.length - 1;
    }
    loadLevel(start);
    updateProgress();
    window.RSL.APP = { state: state, loadLevel: loadLevel, refresh: refresh, isUnlocked: isUnlocked, openAchievements: openAchievements };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
















