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
    var card=document.querySelector('.story-card');
    var mark=document.querySelector('.story-turnstile');
    return {hidden:layer.hidden, buttons:layer.querySelectorAll('button').length,
      text:document.getElementById('storyText').textContent,
      width:card.getBoundingClientRect().width,
      kids:Array.from(card.children).map(function(x){return x.className}),
      mark:mark.textContent, markColor:getComputedStyle(mark).color,
      align:getComputedStyle(document.getElementById('storyText')).textAlign,
      buttonCenter:(function(){var r=document.querySelector('.story-next').getBoundingClientRect();var c=card.getBoundingClientRect();return Math.abs((r.left+r.width/2)-(c.left+c.width/2))<2;})()};
  })()`);
  equal(first.hidden, false, '剧情窗口打开');
  equal(first.buttons, 1, '剧情窗口只有一个按钮');
  ok(first.text.length > 0, '打字机显示第一段');
  ok(first.width < 500, '剧情窗口比通关面板（560）更小');
  equal(first.kids.join(','), 'story-turnstile,story-text,story-next', '从上到下是符号、文字、按钮');
  equal(first.mark, '⊢', '顶部是 ⊢ 符号');
  equal(first.markColor, 'rgb(230, 111, 63)', '符号为橙色');
  equal(first.align, 'center', '剧情文字居中');
  equal(first.buttonCenter, true, '按钮水平居中');
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
