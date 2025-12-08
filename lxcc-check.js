var body = $request.body || $response.body;

var Random = (function () {
  function Random(seed) {
    this.setSeed(seed);
  }
  Random.prototype = {
    setSeed: function (seed) {
      this._seed = 32767 & seed;
    },
    nextInt: function (min, max) {
      return (this._rand() % (max - min + 1)) + min;
    },
    _rand: function () {
      this._seed = ((this._seed * 214013 + 2531011) >>> 16) & 32767;
      return this._seed;
    },
  };
  return Random;
})();

function decryptMerge(str) {
  if (!str || str.length < 10 || str.substring(8, 10) !== "$%") return null;
  try {
    var seed = parseInt(str.substring(0, 8), 16);
    var rng = new Random(seed);
    var len = str.length;
    var payloadLen = len - 10;
    var r = new Array(payloadLen);
    var o = new Array(payloadLen);

    for (var h = 10; h < len; ++h) {
      o[h - 10] = rng.nextInt(10, h) - 10;
      r[h - 10] = str.charCodeAt(h);
    }
    for (var l = payloadLen - 1; l >= 0; --l) {
      var t = o[l],
        d = r[l];
      (r[l] = r[t]), (r[t] = d);
    }
    var res = "";
    var chunkSize = 8192;
    for (var i = 0; i < r.length; i += chunkSize) {
      res += String.fromCharCode.apply(null, r.slice(i, i + chunkSize));
    }
    return res;
  } catch (e) {
    console.log("❌ Decrypt exception: " + e);
    return null;
  }
}

try {
  if (body) {
    var obj = JSON.parse(body);

    var archives = null;
    if (obj.archives) {
      archives = obj.archives;
    } else if (obj.data && obj.data.archives) {
      archives = obj.data.archives;
    }

    if (archives && Array.isArray(archives)) {
      console.log("========================================");
      console.log("📦 数据包包含: " + archives.map(function(a){ return a.name; }).join(", "));

      for (var i = 0; i < archives.length; i++) {
        var archive = archives[i];
        var name = archive.name || "Unknown";
        var encryptedData = archive.data;

        if (encryptedData) {
          var decryptedStr = decryptMerge(encryptedData);
          if (decryptedStr) {
            try {
                var jsonObj = JSON.parse(decryptedStr);
                console.log("🔓 [" + name + "] 解密数据:\n" + JSON.stringify(jsonObj));
            } catch (jsonErr) {
                console.log("🔓 [" + name + "] 解密内容(非JSON):\n" + decryptedStr);
            }
          } else {
            console.log("❌ [" + name + "] 解密失败 (格式可能不匹配)");
          }
        } else {
          console.log("⚠️ [" + name + "] 无数据内容");
        }
      }
      console.log("========================================");
    }
  }
} catch (e) {
  console.log("❌ 脚本运行错误: " + e);
}

$done({});
