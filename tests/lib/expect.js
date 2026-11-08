'use strict';
/*
 * 浏览器测试的小断言库（不依赖 node:test，因为浏览器脚本是独立 CLI）。
 *
 * 设计目标：
 *   - 每个断言都带人类可读的中文标签，失败时给 expected / actual；
 *   - 统计断言数量，供 runTest() 输出 `PASS <name> (N checks)`；
 *   - 只抛错、不打印，避免成功时刷屏。失败由 runTest 统一打印并以 exit 1 结束。
 *
 * 用法：
 *   const { ok, equal, between, matches, includes, checks } = require('./lib/expect');
 *   ok(await page.js('!!document.querySelector(".node")'), '棋盘上出现模块');
 *   equal(wires, 1, '端口连线生成 1 条 wire');
 */

const assert = require('node:assert/strict');

let count = 0;

function inspect(value) {
  try { return JSON.stringify(value); } catch (err) { return String(value); }
}

function ok(value, label) {
  count += 1;
  if (!value) throw new Error(label + '（期望 truthy，实际 ' + inspect(value) + '）');
  return value;
}

function equal(actual, expected, label) {
  count += 1;
  try {
    assert.deepEqual(actual, expected);
  } catch (err) {
    err.message = label + '（期望 ' + inspect(expected) + '，实际 ' + inspect(actual) + '）\n' + err.message;
    throw err;
  }
  return actual;
}

function notEqual(actual, expected, label) {
  count += 1;
  try {
    assert.notDeepEqual(actual, expected);
  } catch (err) {
    err.message = label + '（不应等于 ' + inspect(expected) + '，实际相同）\n' + err.message;
    throw err;
  }
  return actual;
}

function includes(haystack, needle, label) {
  count += 1;
  const text = String(haystack);
  if (text.indexOf(String(needle)) < 0) {
    throw new Error(label + '（' + inspect(text) + ' 不包含 ' + inspect(needle) + '）');
  }
  return haystack;
}

function matches(value, regexp, label) {
  count += 1;
  const text = String(value);
  if (!regexp.test(text)) throw new Error(label + '（' + inspect(text) + ' 不匹配 ' + regexp + '）');
  return value;
}

function between(value, min, max, label) {
  count += 1;
  if (!(typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max)) {
    throw new Error(label + '（期望 ' + min + ' ≤ ' + inspect(value) + ' ≤ ' + max + '）');
  }
  return value;
}

function fail(label) {
  count += 1;
  throw new Error(label);
}

function checks() { return count; }
function reset() { count = 0; }

module.exports = { ok, equal, notEqual, includes, matches, between, fail, checks, reset };
