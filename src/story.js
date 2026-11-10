/* 剧情窗口：一次只显示一句，打字机逐字出现；唯一按钮是右箭头。
 * 已看过的段由外部存进 state.storySeen，展示后不再出现。 */
(function (root) {
  'use strict';
  root.RSL = root.RSL || {};

  var LINES = {
    intro: [
      '欢迎！',
      '又有新人来了，真好！',
      '或许……你就是「他」派来的勇士？',
      '那就去战斗吧……',
      '去击败名为「逻辑」的魔王！'
    ],
    tutorials: [
      '不错嘛，勇士！',
      '你已经掌握了基本的战斗法则了',
      '走到最后吧！',
      '可千万不要放弃啊！'
    ],
    normal: [
      '看来这些基础的问题已经难不倒你了，勇士！',
      '接下来，你将会独自一人战斗',
      '在「定义」与「公理」的帮助下',
      '将一个个「命题」斩下',
      '直至达到「逻辑」的尽头……',
      '前进吧！',
      '我将在终局的开端等着你！'
    ],
    hard: [
      '很高兴再次见到你，勇士！',
      '我本以为你走不到这里',
      '我见过太多这样的勇士了',
      '不过……',
      '你战胜了漫长的孤独',
      '你战胜了无尽的疲倦',
      '你战胜了永恒的未知',
      '而后来到这里',
      '无论接下来成功与否',
      '你的事迹都将被传颂',
      '直至故事的尽头！',
      '去击败魔王吧！'
    ],
    demon: [
      '不……',
      '不对',
      '这不可能！',
      '哈哈……',
      '……',
      '恭喜您！',
      '很不容易，不是吗',
      '「逻辑」的魔王被您踏与足下',
      '您的成就已无人可及',
      '您的名字将无人不知',
      '您将获得至高无上的地位',
      '您将获得至高无上的权利',
      '再次由衷的恭喜您！',
      '再见！',
      '……',
      '……',
      '……',
      'Designed by yyxcnasd',
      '……',
      '……',
      '……',
      'RusselL.2',
      'Coming soon'
    ]
  };

  var layer = null, textEl = null, nextBtn = null;
  var queue = [], current = null, line = 0, timer = null, typing = false, fullText = '';
  var seen = Object.create(null);
  var onSeen = null;

  function init(opts) {
    layer = document.getElementById('storyLayer');
    textEl = document.getElementById('storyText');
    nextBtn = document.getElementById('storyNext');
    if (!layer || !textEl || !nextBtn) return;
    if (opts && typeof opts.onSeen === 'function') onSeen = opts.onSeen;
    nextBtn.addEventListener('click', advance);
  }

  function setSeen(map) {
    seen = Object.create(null);
    Object.keys(map || {}).forEach(function (k) { if (map[k]) seen[k] = true; });
  }

  function trigger(id) {
    if (!LINES[id] || seen[id] || current === id || queue.indexOf(id) >= 0) return;
    queue.push(id);
    if (!current) next();
  }

  function next() {
    if (!queue.length) {
      current = null;
      if (layer) layer.hidden = true;
      return;
    }
    current = queue.shift();
    line = 0;
    if (layer) layer.hidden = false;
    typeLine();
  }

  function typeLine() {
    clearInterval(timer);
    fullText = LINES[current][line];
    textEl.textContent = '';
    textEl.classList.add('is-typing');
    typing = true;
    var i = 0;
    timer = setInterval(function () {
      i += 1;
      textEl.textContent = fullText.slice(0, i);
      if (i >= fullText.length) finishLine();
    }, 30);
  }

  function finishLine() {
    clearInterval(timer);
    typing = false;
    textEl.textContent = fullText;
    textEl.classList.remove('is-typing');
  }

  function advance() {
    if (!current) return;
    if (typing) { finishLine(); return; }
    line += 1;
    if (line >= LINES[current].length) {
      var done = current;
      current = null;
      seen[done] = true;
      if (onSeen) onSeen(done);
      if (layer) layer.hidden = true;
      next();
      return;
    }
    typeLine();
  }

  root.RSL.Story = {
    init: init,
    setSeen: setSeen,
    trigger: trigger,
    isOpen: function () { return !!current; }
  };
})(typeof window !== 'undefined' ? window : globalThis);
