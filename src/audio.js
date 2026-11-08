/*!
 * 公理板 / AXIOM BOARD — RSL.Audio
 *
 * 背景音乐与界面音效。只在用户首次交互后解锁 AudioContext；
 * 无网络请求（bgm 是 index.html 里的本地 <audio>）。
 */
(function (host) {
  'use strict';
  host.RSL = host.RSL || {};

  var soundOn = true;
  var bgm = null;
  var audioCtx = null;

  function ensure() {
    if (!audioCtx) {
      var Ctor = host.AudioContext || host.webkitAudioContext;
      if (Ctor) {
        try { audioCtx = new Ctor(); } catch (e) { audioCtx = null; }
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    if (!bgm) {
      bgm = document.getElementById('bgm');
      if (bgm) bgm.volume = 0.23;
    }
    if (soundOn && bgm && bgm.paused) bgm.play().catch(function () {});
  }

  function tone(freq, dur, type, gain, delay) {
    if (!soundOn) return;
    ensure();
    if (!audioCtx) return;
    var t0 = audioCtx.currentTime + (delay || 0);
    var osc = audioCtx.createOscillator();
    var amp = audioCtx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    amp.gain.setValueAtTime(0.0001, t0);
    amp.gain.exponentialRampToValueAtTime(gain || 0.03, t0 + 0.008);
    amp.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(amp);
    amp.connect(audioCtx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function sfx(kind) {
    if (kind === 'place') { tone(330, 0.06, 'triangle', 0.025); tone(495, 0.08, 'sine', 0.02, 0.04); }
    else if (kind === 'connect') { tone(660, 0.04, 'sine', 0.035); tone(990, 0.06, 'sine', 0.025, 0.04); }
    else if (kind === 'win') { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.18, 'sine', 0.04, i * 0.085); }); }
    else if (kind === 'fail') { tone(180, 0.13, 'triangle', 0.035); }
    else { tone(520, 0.035, 'sine', 0.018); }
  }

  function setSound(on) {
    soundOn = !!on;
    if (soundOn) ensure();
    else if (bgm) bgm.pause();
  }

  host.RSL.Audio = {
    ensure: ensure,
    sfx: sfx,
    setSound: setSound,
    get sound() { return soundOn; }
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
