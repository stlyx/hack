/*
 * 脚本名称: MergeOne 资源修改 (完美签名版 - 修复时间戳来源)
 * 作用: 修改体力 -> 获取请求头时间戳 -> 计算正确MD5签名 -> 伪造响应头
 * 核心算法: md5(appid=...&body=...&signkey=...&time=...&)
 */

// ==========================================
// 1. 配置信息 (已填入固定数组)
// ==========================================

// 原始 AppID 数组 (Char Codes)
const APP_ID_ARR = [25, 15, 12, 30, 44, 28, 60, 37];

// 原始 SignKey 数组 (Char Codes)
const SIGN_KEY_ARR = [73, 72, 27, 30, 77, 78, 28, 77, 28, 75, 78, 74, 70, 28, 73, 70, 25, 74, 75, 28, 30, 29, 26, 30, 76, 28, 74, 72, 73, 73, 75, 74];

// 辅助函数：将 CharCode 数组转换为字符串
function arrToString(arr) {
    return String.fromCharCode.apply(null, arr);
}

// 还原后的配置字符串
const APP_ID = arrToString(APP_ID_ARR);
const SIGN_KEY = arrToString(SIGN_KEY_ARR);

// ==========================================
// 核心代码
// ==========================================
var body = $response.body;
var headers = $response.headers; // 响应头 (我们要修改这里的 sign)
var reqHeaders = $request.headers; // 请求头 (我们要读取这里的 time)

// 1. MD5 库函数
var MD5=function(d){var r=M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d[r],f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;m=md5_ii(m=md5_ii(m=md5_ii(m=md5_ii(m=md5_hh(m=md5_hh(m=md5_hh(m=md5_hh(m=md5_gg(m=md5_gg(m=md5_gg(m=md5_gg(m=md5_ff(m=md5_ff(m=md5_ff(m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,i,d[n+1],12,-389564586),r,i,d[n+2],17,606105819),i,d[n+3],22,-1044525330),f,r,i,d[n+4],7,-176418897),f,r,i,d[n+5],12,1200080426),r,i,d[n+6],17,-1473231341),i,d[n+7],22,-45705983),f,r,i,d[n+8],7,1770035416),f,r,i,d[n+9],12,-1958414417),r,i,d[n+10],17,-42063),i,d[n+11],22,-1990404162),f,r,i,d[n+12],7,1804603682),f,r,i,d[n+13],12,-40341101),r,i,d[n+14],17,-1502002290),i,d[n+15],22,1236535329),m=md5_add(m,h),f=md5_add(f,t),r=md5_add(g,r),i=md5_add(e,i)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return md5_add(bit_rol(md5_add(md5_add(_,d),md5_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function md5_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

// 2. 解密/加密类 (复用之前的逻辑)
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
        var header = originalHeader; // 必须使用原始 Header
        var seedInt = parseInt(header, 16);
        var fullStr = header + "$%" + jsonStr;
        var len = fullStr.length;
        var arr = new Array(len);
        for(var i=0; i<len; i++) arr[i] = fullStr.charCodeAt(i);
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

// 3. 业务逻辑
try {
  var obj = JSON.parse(body);
  var archives = null;
  if (obj.archives) archives = obj.archives;
  else if (obj.data && obj.data.archives) archives = obj.data.archives;

  if (archives && Array.isArray(archives)) {
    var mergeThree = archives.find(function (a) { return a.name === "MergeThree"; });
    if (mergeThree && mergeThree.data) {
      var originalHeader = mergeThree.data.substring(0, 8);
      var decryptedJsonStr = decryptMerge(mergeThree.data);

      if (decryptedJsonStr) {
        var mergeData = JSON.parse(decryptedJsonStr);
        if (Array.isArray(mergeData) && mergeData.length >= 3) {
          var subArchives = mergeData[2];
          var propsData = null;
          if (subArchives && Array.isArray(subArchives)) {
            for (var i = 0; i < subArchives.length; i++) {
              if (subArchives[i][0] === 1) { propsData = subArchives[i][2]; break; }
            }
          }

          if (propsData) {
            var encryptedProps = null;
            if (Array.isArray(propsData) && propsData.length > 1) encryptedProps = propsData[1];
            else if (propsData.data && Array.isArray(propsData.data) && propsData.data.length > 1) encryptedProps = propsData.data[1];

            if (encryptedProps && Array.isArray(encryptedProps)) {
              var isFlatArray = encryptedProps.length > 0 && typeof encryptedProps[0] === 'number';
              var isModified = false;
              var TARGET_POWER = 167; // 目标体力值

              // 修改体力逻辑
              var modifyFunc = function(k, arr) {
                 var id = arr[k]; var valArr = arr[k+1];
                 if (id === 10000004 && Array.isArray(valArr)) { // 体力 ID
                    var oldVal = valArr[0] ^ valArr[1];
                    valArr[0] = TARGET_POWER ^ valArr[1];
                    console.log("🛠️ 修改体力: " + oldVal + " -> " + TARGET_POWER);
                    isModified = true;
                 }
              };

              if (isFlatArray) {
                for (var k = 0; k < encryptedProps.length; k += 2) modifyFunc(k, encryptedProps);
              } else {
                 // 兼容嵌套数组
                 for (var k = 0; k < encryptedProps.length; k++) {
                     var item = encryptedProps[k];
                     if(item[0] === 10000004) {
                         var oldVal = item[1][0] ^ item[1][1];
                         item[1][0] = TARGET_POWER ^ item[1][1];
                         console.log("🛠️ 修改体力: " + oldVal + " -> " + TARGET_POWER);
                         isModified = true;
                     }
                 }
              }

              if (isModified) {
                  // 1. 重新加密数据
                  var newMergeDataStr = JSON.stringify(mergeData);
                  var newEncryptedData = encryptMerge(newMergeDataStr, originalHeader);
                  
                  if (newEncryptedData) {
                      mergeThree.data = newEncryptedData;
                      body = JSON.stringify(obj);
                      console.log("✅ Body 数据已修改");

                      // 2. 重新计算签名
                      // 【关键修改】 从 reqHeaders 获取时间戳
                      var timeKey = Object.keys(reqHeaders).find(k => k.toLowerCase() === 'time') || 
                                    Object.keys(reqHeaders).find(k => k.toLowerCase() === 'timestamp') || "time";
                      var timeVal = reqHeaders[timeKey];

                      if (timeVal) {
                          // 构造签名字符串：appid=...&body=...&signkey=...&time=...&
                          var signStr = "appid=" + APP_ID + 
                                        "&body=" + body + 
                                        "&signkey=" + SIGN_KEY + 
                                        "&time=" + timeVal + "&";
                          
                          var newSign = MD5(signStr);
                          
                          // 更新响应头
                          var signHeaderKey = Object.keys(headers).find(k => k.toLowerCase() === 'sign') || "sign";
                          headers[signHeaderKey] = newSign;
                          
                          console.log("✅ 签名已更新: " + newSign + " (Time: " + timeVal + ")");
                          $notify("MergeThree 修改成功", "", "体力已改并重签");
                      } else {
                          console.log("❌ 未在【请求头】中找到时间戳 (time/timestamp)，无法重签");
                      }
                  }
              }
            }
          }
        }
      }
    }
  }
} catch (e) { console.log("❌ " + e.message); }

$done({ body: body, headers: headers });