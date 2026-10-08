// Quantumult X: script-response-body，用于 /api/archive/get。
// 编辑页的保存接口；content 保存 $response.body 原文，不解密、不重新序列化。
const PASTE_API_URL = "https://paste.stlyx.top/api/pastes/canhabpe";
const PASTE_EDIT_KEY = "43Tttgg8nY0c1qTqufx5tV7b";
const HTTP_TIMEOUT_MS = 8000;

var finished = false;
var timeoutId;

function finish() {
  if (finished) return;
  finished = true;
  clearTimeout(timeoutId);
  $done({});
}

try {
  var body = $response.body;
  if (typeof body !== "string" || !body.length) {
    throw new Error("响应体为空或不是文本");
  }

  timeoutId = setTimeout(function () {
    console.log("❌ 下载响应保存超时，保留原响应");
    finish();
  }, HTTP_TIMEOUT_MS);

  $task.fetch({
    url: PASTE_API_URL,
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      title: "canhabpe",
      content: body,
      key: PASTE_EDIT_KEY,
    }),
  }).then(function (response) {
    if (finished) return;
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error("Paste HTTP " + response.statusCode);
    }
    var result = JSON.parse(response.body);
    if (!result || result.error || !(result.url || result.editUrl)) {
      throw new Error("Paste 未返回保存成功结果");
    }
    console.log("✅ 下载响应体已原样保存到 Paste（" + body.length + " 字符）");
    finish();
  }).catch(function () {
    if (finished) return;
    console.log("❌ 下载响应保存失败，保留原响应");
    finish();
  });
} catch (e) {
  console.log("❌ 下载响应保存失败，保留原响应");
  finish();
}
