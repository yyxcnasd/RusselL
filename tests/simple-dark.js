'use strict';
/*
 * 深色主题 + 背景音乐。
 *
 * 覆盖点：
 *   - 主题按钮切到 dark，页面底色变暗；
 *   - 放置模块（首次交互）后 #bgm 真正开始播放：paused=false、
 *     readyState≥2、音量在合理范围、currentTime 随时间推进。
 */
const { runTest } = require('./lib/browser');
const { ok, equal, between } = require('./lib/expect');

function rgb(css) {
  const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(String(css));
  return m ? { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) } : null;
}

runTest('simple-dark', async ({ openPage }) => {
  const page = await openPage({
    width: 1440,
    height: 900,
    args: ['--autoplay-policy=no-user-gesture-required']
  });
  await page.ready();

  await page.js('document.getElementById("themeBtn").click()');
  await page.waitFor('document.documentElement.dataset.theme === "dark"');
  await page.sleep(300);
  equal(await page.js('document.documentElement.dataset.theme'), 'dark', '主题按钮切到 dark');
  const bg = await page.js('getComputedStyle(document.body).backgroundColor');
  const color = rgb(bg);
  ok(color && (color.r + color.g + color.b) / 3 < 90, '深色主题下页面底色足够暗（实际 ' + bg + '）');

  await page.js('document.querySelector("#tray .tile").click()');
  await page.waitFor('document.querySelectorAll(".node").length === 2');
  await page.waitFor('(function(){var a=document.getElementById("bgm");return a && !a.paused;})()');
  /* 并行跑多个浏览器实例时音频解码可能稍慢，等真正开始推进时间轴再断言。 */
  await page.waitFor('document.getElementById("bgm").currentTime > 0', { timeout: 8000 });
  const audio = await page.js(`(function(){
    var a=document.getElementById('bgm');
    return {paused:a.paused, time:a.currentTime, volume:a.volume, ready:a.readyState, muted:a.muted, src:a.currentSrc};
  })()`);
  equal(audio.paused, false, '首次交互后背景音乐开始播放');
  ok(audio.ready >= 2, '音频已加载到可播放状态（readyState=' + audio.ready + '）');
  between(audio.volume, 0.1, 0.4, '背景音乐音量在 0.1–0.4 之间（实际 ' + audio.volume + '）');
  ok(audio.time > 0, '播放进度已推进（currentTime=' + audio.time + '）');
  ok(/grassland\.mp3/.test(audio.src), '播放的是 assets/audio/grassland.mp3');

  await page.sleep(500);
  const time2 = await page.js('document.getElementById("bgm").currentTime');
  ok(time2 > audio.time, '背景音乐持续播放（' + audio.time.toFixed(2) + 's → ' + time2.toFixed(2) + 's）');
  await page.shot('dark-final');
});
