const APP_ID = "fpsaScCZ";
const SIGN_KEY = "67da21c2c4159c69f54cabea3c576645";

function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff)
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
  return (msw << 16) | (lsw & 0xffff)
}
function bitRotateLeft(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt))
}
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn((b & c) | (~b & d), a, b, x, s, t)
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t)
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t)
}
function binlMD5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32
  x[(((len + 64) >>> 9) << 4) + 14] = len
  var i
  var olda
  var oldb
  var oldc
  var oldd
  var a = 1732584193
  var b = -271733879
  var c = -1732584194
  var d = 271733878
  for (i = 0; i < x.length; i += 16) {
    olda = a
    oldb = b
    oldc = c
    oldd = d
    a = md5ff(a, b, c, d, x[i], 7, -680876936)
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
    b = md5gg(b, c, d, a, x[i], 20, -373897302)
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
    d = md5hh(d, a, b, c, x[i], 11, -358537222)
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)
    a = md5ii(a, b, c, d, x[i], 6, -198630844)
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)
    a = safeAdd(a, olda)
    b = safeAdd(b, oldb)
    c = safeAdd(c, oldc)
    d = safeAdd(d, oldd)
  }
  return [a, b, c, d]
}
function binl2rstr(input) {
  var i
  var output = ''
  var length32 = input.length * 32
  for (i = 0; i < length32; i += 8) {
    output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff)
  }
  return output
}
function rstr2binl(input) {
  var i
  var output = []
  output[(input.length >> 2) - 1] = undefined
  for (i = 0; i < output.length; i += 1) {
    output[i] = 0
  }
  var length8 = input.length * 8
  for (i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32
  }
  return output
}
function rstrMD5(s) {
  return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
}
function rstrHMACMD5(key, data) {
  var i
  var bkey = rstr2binl(key)
  var ipad = []
  var opad = []
  var hash
  ipad[15] = opad[15] = undefined
  if (bkey.length > 16) {
    bkey = binlMD5(bkey, key.length * 8)
  }
  for (i = 0; i < 16; i += 1) {
    ipad[i] = bkey[i] ^ 0x36363636
    opad[i] = bkey[i] ^ 0x5c5c5c5c
  }
  hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
  return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
}
function rstr2hex(input) {
  var hexTab = '0123456789abcdef'
  var output = ''
  var x
  var i
  for (i = 0; i < input.length; i += 1) {
    x = input.charCodeAt(i)
    output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
  }
  return output
}
function str2rstrUTF8(input) {
  return unescape(encodeURIComponent(input))
}
function rawMD5(s) {
  return rstrMD5(str2rstrUTF8(s))
}
function hexMD5(s) {
  return rstr2hex(rawMD5(s))
}
function rawHMACMD5(k, d) {
  return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
}
function hexHMACMD5(k, d) {
  return rstr2hex(rawHMACMD5(k, d))
}
function md5(string, key, raw) {
  if (!key) {
    if (!raw) {
      return hexMD5(string)
    }
    return rawMD5(string)
  }
  if (!raw) {
    return hexHMACMD5(key, string)
  }
  return rawHMACMD5(key, string)
}

var Random = (function () {
  function Random(seed) { this.setSeed(seed); }
  Random.prototype = {
    setSeed: function (seed) { this._seed = 32767 & seed; },
    nextInt: function (min, max) { return (this._rand() % (max - min + 1)) + min; },
    _rand: function () { this._seed = ((this._seed * 214013 + 2531011) >> 16) & 32767; return this._seed; },
  };
  return Random;
})();

function decryptMerge(str) {
  if (!str || str.length < 10 || str.substring(8, 10) !== "$%") return null;
  try {
    var seed = parseInt(str.substring(0, 8), 16);
    var rng = new Random(seed);
    var len = str.length; var payloadLen = len - 10;
    var r = new Array(payloadLen); var o = new Array(payloadLen);
    for (var h = 10; h < len; ++h) { o[h - 10] = rng.nextInt(10, h) - 10; r[h - 10] = str.charCodeAt(h); }
    for (var l = payloadLen - 1; l >= 0; --l) { var t = o[l], d = r[l]; r[l] = r[t]; r[t] = d; }
    var res = ""; var chunkSize = 8192;
    for (var i = 0; i < r.length; i += chunkSize) res += String.fromCharCode.apply(null, r.slice(i, i + chunkSize));
    return res;
  } catch (e) { return null; }
}

function encryptMerge(jsonStr, originalHeader) {
  try {
    var header = originalHeader;
    var seedInt = parseInt(header, 16);
    var fullStr = header + "$%" + jsonStr;
    var len = fullStr.length;
    var arr = new Array(len);
    for (var i = 0; i < len; i++) arr[i] = fullStr.charCodeAt(i);
    var rng = new Random(seedInt);
    for (var u = 10; u < len; ++u) {
      var h = rng.nextInt(10, u);
      var temp = arr[u]; arr[u] = arr[h]; arr[h] = temp;
    }
    var res = ""; var chunkSize = 8192;
    for (var i = 0; i < arr.length; i += chunkSize) res += String.fromCharCode.apply(null, arr.slice(i, i + chunkSize));
    return res;
  } catch (e) { return null; }
}

var body = $response.body;
var headers = $response.headers;
var reqHeaders = $request.headers;

try {
  var obj = JSON.parse(body);
  var archives = null;
  if (obj.archives) archives = obj.archives;
  else if (obj.data && obj.data.archives) archives = obj.data.archives;

  var isGlobalModified = false; // 全局修改标记
  var logMsg = [];

  if (archives && Array.isArray(archives)) {
    var mergeThree = archives.find(function (a) { return a.name === "MergeThree"; });
    if (mergeThree && mergeThree.data) {
      var header3 = mergeThree.data.substring(0, 8);
      var json3 = decryptMerge(mergeThree.data);
      if (json3) {
        var data3 = JSON.parse(json3);
        if (Array.isArray(data3) && data3.length >= 3) {
          var subArchives = data3[2];
          var propsData = null;
          if (subArchives) {
            for (var i = 0; i < subArchives.length; i++) {
              if (subArchives[i][0] === 1) { propsData = subArchives[i][2]; break; }
            }
          }

          if (propsData) {
            var encryptedProps = propsData[1];
            if (encryptedProps && Array.isArray(encryptedProps)) {
              var modified3 = false;

              var modifyFunc = function (k, arr) {
                var id = arr[k]; var valArr = arr[k + 1];
                if (!Array.isArray(valArr)) return;

                var oldVal = valArr[0] ^ valArr[1];
                var newVal = oldVal;
                var name = "";

                if (id === 10000004 && oldVal <= 50) { newVal += 125; name = "⚡"; }
                else if (id === 10000001 && oldVal < 100000) { newVal += 40000; name = "💰"; }
                else if (id === 10000003 && oldVal < 10000) { newVal += 1280; name = "💎"; }
                else if (id === 10000008 && oldVal < 200) { newVal += 100; name = "🐸"; }
                else if (id === 10000009 && oldVal < 10000) { newVal += 1200; name = "🐦"; }
                else if (id === 10000010 && oldVal < 10000) { newVal += 4000; name = "🐱"; }
                else if (id === 10000203 && (new Date().getMinutes() % 10 === 0)) { newVal += 1; name = "✌️"; }
                else if (id === 10000011 && (new Date().getMinutes() % 10 === 0)) { newVal += 1; name = "✂️"; }

                if (newVal !== oldVal) {
                  valArr[0] = newVal ^ valArr[1];
                  logMsg.push(name + ": " + oldVal + "->" + newVal);
                  modified3 = true;
                }
              };

              var isFlat = encryptedProps.length > 0 && typeof encryptedProps[0] === 'number';
              if (isFlat) {
                for (var k = 0; k < encryptedProps.length; k += 2) modifyFunc(k, encryptedProps);
              } else {
                for (var k = 0; k < encryptedProps.length; k++) {
                  var item = encryptedProps[k];
                  if (item) modifyFunc(0, [item[0], item[1]]);
                }
              }

              if (modified3) {
                var enc3 = encryptMerge(JSON.stringify(data3), header3);
                if (enc3) {
                  mergeThree.data = enc3;
                  isGlobalModified = true;
                  console.log("✅ MergeThree 修改完成");
                }
              }
            }
          }
        }
      }
    }

    var mergeSix = archives.find(function (a) { return a.name === "MergeSix"; });
    if (mergeSix && mergeSix.data) {
      var header6 = mergeSix.data.substring(0, 8);
      var json6 = decryptMerge(mergeSix.data);
      if (json6) {
        var data6 = JSON.parse(json6);
        if (Array.isArray(data6) && data6.length >= 3) {
          var subArchives6 = data6[2];
          var boardData = null;
          if (subArchives6) {
            for (var i = 0; i < subArchives6.length; i++) {
              if (subArchives6[i][0] === 13) { boardData = subArchives6[i][2]; break; }
            }
          }

          if (boardData && boardData.g && Array.isArray(boardData.g)) {
            var modifiedCount = 0;
            for (var k = 0; k < boardData.g.length; k++) {
              var item = boardData.g[k];
              if (item && item.c) {
                for (var compKey in item.c) {
                  var comp = item.c[compKey];
                  if (comp && typeof comp.st === 'number' && typeof comp.cd === 'number') {
                    if (comp.cd > 0 && comp.st > 0) {
                      logMsg.push("🚀加速 " + item.g + " " + new Date((comp.st + 1609430400) * 1000).toLocaleTimeString() + " - " + comp.cd + "s");
                      comp.st = comp.st - comp.cd;
                      modifiedCount++;
                    }
                  }
                }
              }
            }

            if (modifiedCount > 0) {
              var enc6 = encryptMerge(JSON.stringify(data6), header6);
              if (enc6) {
                mergeSix.data = enc6;
                isGlobalModified = true;
                logMsg.push("🚀加速 x" + modifiedCount);
                console.log("✅ MergeSix 加速完成");
              }
            }
          }
        }
      }
    }

    if (isGlobalModified) {
      console.log("🔄 检测到数据变动，开始统一重签...");

      body = JSON.stringify(obj);

      var timeKey = Object.keys(reqHeaders).find(k => k.toLowerCase() === 'time') ||
        Object.keys(reqHeaders).find(k => k.toLowerCase() === 'timestamp') || "time";
      var timeVal = reqHeaders[timeKey];

      if (timeVal) {
        var signStr = "appid=" + APP_ID +
          "&body=" + body +
          "&signkey=" + SIGN_KEY +
          "&time=" + timeVal + "&";

        var newSign = md5(signStr);

        var signHeaderKey = Object.keys(headers).find(k => k.toLowerCase() === 'sign') || "sign";
        headers[signHeaderKey] = newSign;

        console.log("✅ 签名重算完毕: " + newSign);
        $notify("修改成功", "", logMsg.join(", "));
      } else {
        console.log("❌ 签名失败: 无法获取请求头时间戳");
      }
    }
  }
} catch (e) {
  console.log("❌ 脚本运行异常: " + e.message);
}

$done({ body: body, headers: headers });
