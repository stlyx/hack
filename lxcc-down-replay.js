// Quantumult X: script-response-body，用于 /api/archive/get。
// 原样替换下载响应体，使用当前请求的时间戳重新计算响应 sign。
const PASTE_RAW_URL = "https://paste.stlyx.top/canhabpe/raw";
const APP_ID = "fpsaScCZ";
const SIGN_KEY = "67da21c2c4159c69f54cabea3c576645";
const HTTP_TIMEOUT_MS = 8000;

// 以下 MD5 签名算法沿用 lxcc-down-mod.js。
function safeAdd(r,d){var n=(65535&r)+(65535&d),t=(r>>16)+(d>>16)+(n>>16);return t<<16|65535&n}function bitRotateLeft(r,d){return r<<d|r>>>32-d}function md5cmn(r,d,n,t,m,f){return safeAdd(bitRotateLeft(safeAdd(safeAdd(d,r),safeAdd(t,f)),m),n)}function md5ff(r,d,n,t,m,f,i){return md5cmn(d&n|~d&t,r,d,m,f,i)}function md5gg(r,d,n,t,m,f,i){return md5cmn(d&t|n&~t,r,d,m,f,i)}function md5hh(r,d,n,t,m,f,i){return md5cmn(d^n^t,r,d,m,f,i)}function md5ii(r,d,n,t,m,f,i){return md5cmn(n^(d|~t),r,d,m,f,i)}function binlMD5(r,d){var n,t,m,f,i;r[d>>5]|=128<<d%32,r[14+(d+64>>>9<<4)]=d;var e=1732584193,h=-271733879,g=-1732584194,u=271733878;for(n=0;n<r.length;n+=16)t=e,m=h,f=g,i=u,e=md5ff(e,h,g,u,r[n],7,-680876936),u=md5ff(u,e,h,g,r[n+1],12,-389564586),g=md5ff(g,u,e,h,r[n+2],17,606105819),h=md5ff(h,g,u,e,r[n+3],22,-1044525330),e=md5ff(e,h,g,u,r[n+4],7,-176418897),u=md5ff(u,e,h,g,r[n+5],12,1200080426),g=md5ff(g,u,e,h,r[n+6],17,-1473231341),h=md5ff(h,g,u,e,r[n+7],22,-45705983),e=md5ff(e,h,g,u,r[n+8],7,1770035416),u=md5ff(u,e,h,g,r[n+9],12,-1958414417),g=md5ff(g,u,e,h,r[n+10],17,-42063),h=md5ff(h,g,u,e,r[n+11],22,-1990404162),e=md5ff(e,h,g,u,r[n+12],7,1804603682),u=md5ff(u,e,h,g,r[n+13],12,-40341101),g=md5ff(g,u,e,h,r[n+14],17,-1502002290),h=md5ff(h,g,u,e,r[n+15],22,1236535329),e=md5gg(e,h,g,u,r[n+1],5,-165796510),u=md5gg(u,e,h,g,r[n+6],9,-1069501632),g=md5gg(g,u,e,h,r[n+11],14,643717713),h=md5gg(h,g,u,e,r[n],20,-373897302),e=md5gg(e,h,g,u,r[n+5],5,-701558691),u=md5gg(u,e,h,g,r[n+10],9,38016083),g=md5gg(g,u,e,h,r[n+15],14,-660478335),h=md5gg(h,g,u,e,r[n+4],20,-405537848),e=md5gg(e,h,g,u,r[n+9],5,568446438),u=md5gg(u,e,h,g,r[n+14],9,-1019803690),g=md5gg(g,u,e,h,r[n+3],14,-187363961),h=md5gg(h,g,u,e,r[n+8],20,1163531501),e=md5gg(e,h,g,u,r[n+13],5,-1444681467),u=md5gg(u,e,h,g,r[n+2],9,-51403784),g=md5gg(g,u,e,h,r[n+7],14,1735328473),h=md5gg(h,g,u,e,r[n+12],20,-1926607734),e=md5hh(e,h,g,u,r[n+5],4,-378558),u=md5hh(u,e,h,g,r[n+8],11,-2022574463),g=md5hh(g,u,e,h,r[n+11],16,1839030562),h=md5hh(h,g,u,e,r[n+14],23,-35309556),e=md5hh(e,h,g,u,r[n+1],4,-1530992060),u=md5hh(u,e,h,g,r[n+4],11,1272893353),g=md5hh(g,u,e,h,r[n+7],16,-155497632),h=md5hh(h,g,u,e,r[n+10],23,-1094730640),e=md5hh(e,h,g,u,r[n+13],4,681279174),u=md5hh(u,e,h,g,r[n],11,-358537222),g=md5hh(g,u,e,h,r[n+3],16,-722521979),h=md5hh(h,g,u,e,r[n+6],23,76029189),e=md5hh(e,h,g,u,r[n+9],4,-640364487),u=md5hh(u,e,h,g,r[n+12],11,-421815835),g=md5hh(g,u,e,h,r[n+15],16,530742520),h=md5hh(h,g,u,e,r[n+2],23,-995338651),e=md5ii(e,h,g,u,r[n],6,-198630844),u=md5ii(u,e,h,g,r[n+7],10,1126891415),g=md5ii(g,u,e,h,r[n+14],15,-1416354905),h=md5ii(h,g,u,e,r[n+5],21,-57434055),e=md5ii(e,h,g,u,r[n+12],6,1700485571),u=md5ii(u,e,h,g,r[n+3],10,-1894986606),g=md5ii(g,u,e,h,r[n+10],15,-1051523),h=md5ii(h,g,u,e,r[n+1],21,-2054922799),e=md5ii(e,h,g,u,r[n+8],6,1873313359),u=md5ii(u,e,h,g,r[n+15],10,-30611744),g=md5ii(g,u,e,h,r[n+6],15,-1560198380),h=md5ii(h,g,u,e,r[n+13],21,1309151649),e=md5ii(e,h,g,u,r[n+4],6,-145523070),u=md5ii(u,e,h,g,r[n+11],10,-1120210379),g=md5ii(g,u,e,h,r[n+2],15,718787259),h=md5ii(h,g,u,e,r[n+9],21,-343485551),e=safeAdd(e,t),h=safeAdd(h,m),g=safeAdd(g,f),u=safeAdd(u,i);return[e,h,g,u]}function binl2rstr(r){var d,n="",t=32*r.length;for(d=0;d<t;d+=8)n+=String.fromCharCode(r[d>>5]>>>d%32&255);return n}function rstr2binl(r){var d,n=[];for(n[(r.length>>2)-1]=void 0,d=0;d<n.length;d+=1)n[d]=0;var t=8*r.length;for(d=0;d<t;d+=8)n[d>>5]|=(255&r.charCodeAt(d/8))<<d%32;return n}function rstrMD5(r){return binl2rstr(binlMD5(rstr2binl(r),8*r.length))}function rstrHMACMD5(r,d){var n,t,m=rstr2binl(r),f=[],i=[];for(f[15]=i[15]=void 0,m.length>16&&(m=binlMD5(m,8*r.length)),n=0;n<16;n+=1)f[n]=909522486^m[n],i[n]=1549556828^m[n];return t=binlMD5(f.concat(rstr2binl(d)),512+8*d.length),binl2rstr(binlMD5(i.concat(t),640))}function rstr2hex(r){var d,n,t="0123456789abcdef",m="";for(n=0;n<r.length;n+=1)d=r.charCodeAt(n),m+=t.charAt(d>>>4&15)+t.charAt(15&d);return m}function str2rstrUTF8(r){return unescape(encodeURIComponent(r))}function rawMD5(r){return rstrMD5(str2rstrUTF8(r))}function hexMD5(r){return rstr2hex(rawMD5(r))}function rawHMACMD5(r,d){return rstrHMACMD5(str2rstrUTF8(r),str2rstrUTF8(d))}function hexHMACMD5(r,d){return rstr2hex(rawHMACMD5(r,d))}function md5(r,d,n){return d?n?rawHMACMD5(d,r):hexHMACMD5(d,r):n?rawMD5(r):hexMD5(r)}

var finished = false;
var timeoutId;

function finish(result) {
  if (finished) return;
  finished = true;
  clearTimeout(timeoutId);
  $done(result || {});
}

function findHeader(headers, name) {
  return Object.keys(headers).find(function (key) {
    return key.toLowerCase() === name;
  });
}

function getArchives(obj) {
  if (obj && Array.isArray(obj.archives)) return obj.archives;
  if (obj && obj.data && Array.isArray(obj.data.archives)) return obj.data.archives;
  return null;
}

try {
  var requestHeaders = $request.headers || {};
  var timeKey = findHeader(requestHeaders, "time") || findHeader(requestHeaders, "timestamp");
  var timeVal = timeKey ? requestHeaders[timeKey] : undefined;
  if (timeVal === undefined || timeVal === null || timeVal === "") {
    throw new Error("无法获取当前请求的 time/timestamp");
  }

  timeoutId = setTimeout(function () {
    console.log("❌ 下载响应替换超时，保留原响应");
    finish();
  }, HTTP_TIMEOUT_MS);

  $task.fetch({
    url: PASTE_RAW_URL,
    method: "GET",
    headers: {
      "Accept": "text/plain",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache",
    },
  }).then(function (response) {
    if (finished) return;
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error("Paste HTTP " + response.statusCode);
    }

    var body = response.body;
    if (typeof body !== "string" || !getArchives(JSON.parse(body))) {
      throw new Error("Paste 中不是有效的档案下载响应");
    }

    // 只校验 JSON，不重新序列化：保留响应原文及现有的档案密文。
    var responseHeaders = $response.headers || {};
    var headers = {};
    Object.keys(responseHeaders).forEach(function (key) {
      // 返回未压缩文本，旧长度及压缩编码不再适用。
      if (key.toLowerCase() !== "content-length" && key.toLowerCase() !== "content-encoding") {
        headers[key] = responseHeaders[key];
      }
    });

    var signStr = "appid=" + APP_ID +
      "&body=" + body +
      "&signkey=" + SIGN_KEY +
      "&time=" + timeVal + "&";
    var signKey = findHeader(headers, "sign") || "sign";
    headers[signKey] = md5(signStr);

    console.log("✅ 已从 Paste 原样替换下载响应体并重算响应签名");
    finish({ body: body, headers: headers });
  }).catch(function (error) {
    if (finished) return;
    console.log("❌ 下载响应替换失败，保留原响应: " + error.message);
    finish();
  });
} catch (e) {
  console.log("❌ 下载响应替换失败，保留原响应: " + e.message);
  finish();
}
