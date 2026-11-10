'use strict';
const { runTest, fileUrl } = require('./lib/browser');
const { ok, equal } = require('./lib/expect');

runTest('story', async ({ openPage }) => {
  const page = await openPage({ width: 1440, height: 900, url: fileUrl('index.html'), shotDir: '.research/shots' });
  await page.ready();
  await page.js('window.RSL.Story.setSeen({}); window.RSL.Story.trigger("intro")');
  await page.sleep(120);
  const first = await page.js(`(function(){
    var layer=document.getElementById('storyLayer');
    return {hidden:layer.hidden, buttons:layer.querySelectorAll('button').length,
      text:document.getElementById('storyText').textContent};
  })()`);
  equal(first.hidden, false, '剧情窗口打开');
  equal(first.buttons, 1, '剧情窗口只有一个按钮');
  ok(first.text.length > 0, '打字机显示第一段');
  await page.js('document.querySelector("#storyLayer button").click()');
  await page.sleep(80);
  const after = await page.js('document.getElementById("storyText").textContent');
  ok(after.length > 0 && after !== first.text, '点箭头进入下一段');
  for (let i = 0; i < 12; i += 1) {
    await page.js('document.querySelector("#storyLayer button") && document.querySelector("#storyLayer button").click()');
    await page.sleep(60);
  }
  equal(await page.js('document.getElementById("storyLayer").hidden'), true, '剧情结束后关闭');
  equal(await page.js('window.RSL.APP.state.storySeen.intro'), true, '已看剧情写入存档状态');
  await page.js('window.RSL.Story.trigger("intro")');
  equal(await page.js('document.getElementById("storyLayer").hidden'), true, '已看剧情不会再次出现');
});
