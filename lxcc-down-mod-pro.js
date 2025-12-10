const APP_ID = "fpsaScCZ";
const SIGN_KEY = "67da21c2c4159c69f54cabea3c576645";

function safeAdd(r,d){var n=(65535&r)+(65535&d),t=(r>>16)+(d>>16)+(n>>16);return t<<16|65535&n}function bitRotateLeft(r,d){return r<<d|r>>>32-d}function md5cmn(r,d,n,t,m,f){return safeAdd(bitRotateLeft(safeAdd(safeAdd(d,r),safeAdd(t,f)),m),n)}function md5ff(r,d,n,t,m,f,i){return md5cmn(d&n|~d&t,r,d,m,f,i)}function md5gg(r,d,n,t,m,f,i){return md5cmn(d&t|n&~t,r,d,m,f,i)}function md5hh(r,d,n,t,m,f,i){return md5cmn(d^n^t,r,d,m,f,i)}function md5ii(r,d,n,t,m,f,i){return md5cmn(n^(d|~t),r,d,m,f,i)}function binlMD5(r,d){var n,t,m,f,i;r[d>>5]|=128<<d%32,r[14+(d+64>>>9<<4)]=d;var e=1732584193,h=-271733879,g=-1732584194,u=271733878;for(n=0;n<r.length;n+=16)t=e,m=h,f=g,i=u,e=md5ff(e,h,g,u,r[n],7,-680876936),u=md5ff(u,e,h,g,r[n+1],12,-389564586),g=md5ff(g,u,e,h,r[n+2],17,606105819),h=md5ff(h,g,u,e,r[n+3],22,-1044525330),e=md5ff(e,h,g,u,r[n+4],7,-176418897),u=md5ff(u,e,h,g,r[n+5],12,1200080426),g=md5ff(g,u,e,h,r[n+6],17,-1473231341),h=md5ff(h,g,u,e,r[n+7],22,-45705983),e=md5ff(e,h,g,u,r[n+8],7,1770035416),u=md5ff(u,e,h,g,r[n+9],12,-1958414417),g=md5ff(g,u,e,h,r[n+10],17,-42063),h=md5ff(h,g,u,e,r[n+11],22,-1990404162),e=md5ff(e,h,g,u,r[n+12],7,1804603682),u=md5ff(u,e,h,g,r[n+13],12,-40341101),g=md5ff(g,u,e,h,r[n+14],17,-1502002290),h=md5ff(h,g,u,e,r[n+15],22,1236535329),e=md5gg(e,h,g,u,r[n+1],5,-165796510),u=md5gg(u,e,h,g,r[n+6],9,-1069501632),g=md5gg(g,u,e,h,r[n+11],14,643717713),h=md5gg(h,g,u,e,r[n],20,-373897302),e=md5gg(e,h,g,u,r[n+5],5,-701558691),u=md5gg(u,e,h,g,r[n+10],9,38016083),g=md5gg(g,u,e,h,r[n+15],14,-660478335),h=md5gg(h,g,u,e,r[n+4],20,-405537848),e=md5gg(e,h,g,u,r[n+9],5,568446438),u=md5gg(u,e,h,g,r[n+14],9,-1019803690),g=md5gg(g,u,e,h,r[n+3],14,-187363961),h=md5gg(h,g,u,e,r[n+8],20,1163531501),e=md5gg(e,h,g,u,r[n+13],5,-1444681467),u=md5gg(u,e,h,g,r[n+2],9,-51403784),g=md5gg(g,u,e,h,r[n+7],14,1735328473),h=md5gg(h,g,u,e,r[n+12],20,-1926607734),e=md5hh(e,h,g,u,r[n+5],4,-378558),u=md5hh(u,e,h,g,r[n+8],11,-2022574463),g=md5hh(g,u,e,h,r[n+11],16,1839030562),h=md5hh(h,g,u,e,r[n+14],23,-35309556),e=md5hh(e,h,g,u,r[n+1],4,-1530992060),u=md5hh(u,e,h,g,r[n+4],11,1272893353),g=md5hh(g,u,e,h,r[n+7],16,-155497632),h=md5hh(h,g,u,e,r[n+10],23,-1094730640),e=md5hh(e,h,g,u,r[n+13],4,681279174),u=md5hh(u,e,h,g,r[n],11,-358537222),g=md5hh(g,u,e,h,r[n+3],16,-722521979),h=md5hh(h,g,u,e,r[n+6],23,76029189),e=md5hh(e,h,g,u,r[n+9],4,-640364487),u=md5hh(u,e,h,g,r[n+12],11,-421815835),g=md5hh(g,u,e,h,r[n+15],16,530742520),h=md5hh(h,g,u,e,r[n+2],23,-995338651),e=md5ii(e,h,g,u,r[n],6,-198630844),u=md5ii(u,e,h,g,r[n+7],10,1126891415),g=md5ii(g,u,e,h,r[n+14],15,-1416354905),h=md5ii(h,g,u,e,r[n+5],21,-57434055),e=md5ii(e,h,g,u,r[n+12],6,1700485571),u=md5ii(u,e,h,g,r[n+3],10,-1894986606),g=md5ii(g,u,e,h,r[n+10],15,-1051523),h=md5ii(h,g,u,e,r[n+1],21,-2054922799),e=md5ii(e,h,g,u,r[n+8],6,1873313359),u=md5ii(u,e,h,g,r[n+15],10,-30611744),g=md5ii(g,u,e,h,r[n+6],15,-1560198380),h=md5ii(h,g,u,e,r[n+13],21,1309151649),e=md5ii(e,h,g,u,r[n+4],6,-145523070),u=md5ii(u,e,h,g,r[n+11],10,-1120210379),g=md5ii(g,u,e,h,r[n+2],15,718787259),h=md5ii(h,g,u,e,r[n+9],21,-343485551),e=safeAdd(e,t),h=safeAdd(h,m),g=safeAdd(g,f),u=safeAdd(u,i);return[e,h,g,u]}function binl2rstr(r){var d,n="",t=32*r.length;for(d=0;d<t;d+=8)n+=String.fromCharCode(r[d>>5]>>>d%32&255);return n}function rstr2binl(r){var d,n=[];for(n[(r.length>>2)-1]=void 0,d=0;d<n.length;d+=1)n[d]=0;var t=8*r.length;for(d=0;d<t;d+=8)n[d>>5]|=(255&r.charCodeAt(d/8))<<d%32;return n}function rstrMD5(r){return binl2rstr(binlMD5(rstr2binl(r),8*r.length))}function rstrHMACMD5(r,d){var n,t,m=rstr2binl(r),f=[],i=[];for(f[15]=i[15]=void 0,m.length>16&&(m=binlMD5(m,8*r.length)),n=0;n<16;n+=1)f[n]=909522486^m[n],i[n]=1549556828^m[n];return t=binlMD5(f.concat(rstr2binl(d)),512+8*d.length),binl2rstr(binlMD5(i.concat(t),640))}function rstr2hex(r){var d,n,t="0123456789abcdef",m="";for(n=0;n<r.length;n+=1)d=r.charCodeAt(n),m+=t.charAt(d>>>4&15)+t.charAt(15&d);return m}function str2rstrUTF8(r){return unescape(encodeURIComponent(r))}function rawMD5(r){return rstrMD5(str2rstrUTF8(r))}function hexMD5(r){return rstr2hex(rawMD5(r))}function rawHMACMD5(r,d){return rstrHMACMD5(str2rstrUTF8(r),str2rstrUTF8(d))}function hexHMACMD5(r,d){return rstr2hex(rawHMACMD5(r,d))}function md5(r,d,n){return d?n?rawHMACMD5(d,r):hexHMACMD5(d,r):n?rawMD5(r):hexMD5(r)}

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

                if (id === 10000004) { newVal += 1250; name = "⚡"; }
                else if (id === 10000001) { newVal += 100000; name = "💰"; }
                else if (id === 10000003 && oldVal < 100000) { newVal += 111111; name = "💎"; }
                else if (id === 10000008) { newVal += 100; name = "🐸"; }
                else if (id === 10000009) { newVal += 1200; name = "🐦"; }
                else if (id === 10000010) { newVal += 4000; name = "🐱"; }
                else if (id === 10000203) { newVal += 7; name = "✌️"; }
                else if (id === 10000011) { newVal += 3; name = "✂️"; }

                if (newVal !== oldVal) {
                  valArr[0] = newVal ^ valArr[1];
                  logMsg.push(name + " " + oldVal + " → " + newVal);
                  console.log(name + " " + oldVal + " -> " + newVal);
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
                    if (comp.cd > 0 && comp.st > 0 && +new Date() / 1000 - 1609430400 - comp.st < comp.cd * 10) {
                      console.log("🚀 " + item.g + " " + new Date((comp.st + 1609430400) * 1000).toLocaleString('zh', { timeZone: "+0800", month: "numeric", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " - " + comp.cd * 10 + "s");
                      comp.st = comp.st - comp.cd * 10;
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
