'use strict';
/* 浏览器里查 levels 的实际分布，弄清 hint 测试里 43 的来源。 */
const { runTest, fileUrl } = require('./lib/browser');
runTest('probe-levels', async ({ openPage }) => {
  const page = await openPage({ width: 1200, height: 800, url: fileUrl('index.html'), shotDir: '.research/shots' });
  await page.ready();
  const info = await page.js(`(function(){
    var L = window.RSL.APP.state.levels;
    var byBand = {};
    var noHard = 0, tut = 0, hard = 0;
    L.forEach(function (l) {
      byBand[l.band] = (byBand[l.band] || 0) + 1;
      if (l.tutorial) tut += 1;
      if (l.hard) hard += 1;
      if (!l.hard) noHard += 1;
    });
    return { total: L.length, noHard: noHard, hard: hard, tut: tut, byBand: byBand };
  })()`);
  console.log(JSON.stringify(info));
});
