var body = $response.body;

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
      this._seed = ((this._seed * 214013 + 2531011) >> 16) & 32767;
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

function encryptMerge(jsonStr, originalHeader) {
  try {
    var header;
    var seedInt;

    if (originalHeader) {
      // 复用模式：使用原始 Header
      header = originalHeader;
      seedInt = parseInt(header, 16);
    } else {
      // 生成模式：生成新的随机 Header
      seedInt =
        Math.floor(Math.random() * (2147483647 - 268435456 + 1)) + 268435456;
      header = seedInt.toString(16);
      while (header.length < 8) header = "0" + header;
    }

    var fullStr = header + "$%" + jsonStr;
    var len = fullStr.length;
    var arr = new Array(len);
    for (var i = 0; i < len; i++) arr[i] = fullStr.charCodeAt(i);

    var rng = new Random(seedInt);

    // 正向洗牌
    for (var u = 10; u < len; ++u) {
      var h = rng.nextInt(10, u);
      var temp = arr[u];
      arr[u] = arr[h];
      arr[h] = temp;
    }

    var res = "";
    var chunkSize = 8192;
    for (var i = 0; i < arr.length; i += chunkSize) {
      res += String.fromCharCode.apply(null, arr.slice(i, i + chunkSize));
    }
    return res;
  } catch (e) {
    console.log("❌ Encrypt exception: " + e);
    throw e;
  }
}

// ==========================================
// 2. 业务逻辑
// ==========================================
try {
  var obj = JSON.parse(body);

  var archives = null;
  if (obj.archives) {
    archives = obj.archives;
  } else if (obj.data && obj.data.archives) {
    archives = obj.data.archives;
  }

  if (archives && Array.isArray(archives)) {
    var mergeThree = archives.find(function (a) {
      return a.name === "MergeThree";
    });

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
              if (subArchives[i][0] === 1) {
                // ID 1 是 PropsArchive
                propsData = subArchives[i][2];
                break;
              }
            }
          }

          if (propsData) {
            var encryptedProps = propsData[1];

            if (encryptedProps && Array.isArray(encryptedProps)) {
              var isModified = false;
              var TARGET_POWER = 167;

              // 扁平数组 [id, val, id, val]
              for (var k = 0; k < encryptedProps.length; k += 2) {
                var id = encryptedProps[k];
                var valArr = encryptedProps[k + 1];

                if (id === 10000004 && Array.isArray(valArr)) {
                  var oldVal = valArr[0] ^ valArr[1];
                  valArr[0] = TARGET_POWER ^ valArr[1];
                  console.log("🛠️ 修改体力: " + oldVal + " -> " + TARGET_POWER);
                  isModified = true;
                }
              }

              if (isModified) {
                console.log(
                  "🔄 重新加密 (使用原始Header: " + originalHeader + ")..."
                );

                var newMergeDataStr = JSON.stringify(mergeData);

                var newEncryptedData = encryptMerge(
                  newMergeDataStr,
                  originalHeader
                );

                if (newEncryptedData) {
                  mergeThree.data = newEncryptedData;
                  body = JSON.stringify(obj);
                  console.log("✅ 数据回写完成");
                } else {
                  console.log("❌ 加密失败");
                }
              } else {
                console.log("⚠️ 未找到体力数据 (ID 10000004)，未修改");
              }

              $notify(
                "MergeThree 修改",
                "",
                isModified ? "体力已改为 " + TARGET_POWER : "未找到体力数据"
              );
            }
          }
        }
      }
    }
  }
} catch (e) {
  console.log("❌ 脚本异常: " + e.message);
}

$done({ body: body });
