// Quantumult X: script-response-body，用于 /api/archive/get。
// 编辑页的保存接口；content 保存 $response.body 原文，不解密、不重新序列化。
const PASTE_API_URL = "https://paste.stlyx.top/api/pastes/canhabpe";
const PASTE_EDIT_KEY = "43Tttgg8nY0c1qTqufx5tV7b";
const HTTP_TIMEOUT_MS = 8000;

var finished = false;
var timeoutId;

function safeDetail(value) {
  var text = String(value).split(PASTE_EDIT_KEY).join("[编辑密钥]");
  if (typeof body === "string" && body.length) {
    text = text.split(body).join("[下载响应内容]");
  }
  return text.replace(/[\r\n]+/g, " ").slice(0, 600);
}

function describeError(error) {
  if (error === undefined || error === null) return "未知错误（没有错误详情）";
  if (typeof error !== "object") return safeDetail(error);
  var details = [];
  ["message", "error", "errorDescription", "description", "code"].forEach(function (key) {
    var value = error[key];
    if (typeof value === "string" || typeof value === "number") {
      details.push(key + ": " + safeDetail(value));
    }
  });
  return details.length ? details.join("；") :
    "未知错误（错误字段：" + safeDetail(Object.keys(error).join(", ")) + "）";
}

function pasteResponseInfo(response) {
  var headers = response.headers || {};
  var typeKey = Object.keys(headers).find(function (key) {
    return key.toLowerCase() === "content-type";
  });
  var length = typeof response.body === "string" ? response.body.length : 0;
  return "HTTP " + response.statusCode +
    "，Content-Type=" + safeDetail(typeKey ? headers[typeKey] : "未知") +
    "，返回 " + length + " 字符";
}

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
    console.log("❌ 下载响应保存失败，保留原响应：Paste 请求超过 " +
      HTTP_TIMEOUT_MS + "ms 未完成（下载响应 " + body.length + " 字符）");
    finish();
  }, HTTP_TIMEOUT_MS);

  console.log("📤 正在保存下载响应到 Paste（" + body.length + " 字符）");
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
    var info = pasteResponseInfo(response);
    var result;
    try {
      result = JSON.parse(response.body);
    } catch (parseError) {
      var format = typeof response.body === "string" && /^\s*</.test(response.body) ?
        "返回 HTML/验证页面，预期为 JSON" : "返回内容不是有效 JSON";
      throw new Error("Paste " + info + "；" + format);
    }
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error("Paste " + info +
        (result && result.error ? "；接口错误：" + describeError(result.error) : ""));
    }
    if (result && result.error) {
      throw new Error("Paste " + info + "；接口错误：" + describeError(result.error));
    }
    if (!result || !(result.url || result.editUrl)) {
      throw new Error("Paste " + info + "；保存结果缺少 url/editUrl");
    }
    console.log("✅ 下载响应体已原样保存到 Paste（" + body.length + " 字符）");
    finish();
  }).catch(function (error) {
    if (finished) return;
    console.log("❌ 下载响应保存失败，保留原响应：" + describeError(error));
    finish();
  });
} catch (e) {
  console.log("❌ 下载响应保存失败，保留原响应：" + describeError(e));
  finish();
}
