var body = $request.body;

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
  var obj = JSON.parse(body);

  var archives = null;
  if (obj.archives) {
    archives = obj.archives;
  } else if (obj.data && obj.data.archives) {
    archives = obj.data.archives;
  }

  if (archives && Array.isArray(archives)) {
    console.log("ℹ️ 上传模块：" + JSON.stringify(archives.map((a) => a.name)));
    console.log("ℹ️ 上传备份：" + body);

    var mergeThree = archives.find(function (a) {
      return a.name === "MergeThree";
    });

    if (mergeThree && mergeThree.data) {
      var decryptedJsonStr = decryptMerge(mergeThree.data);

      if (decryptedJsonStr) {
        var mergeData = JSON.parse(decryptedJsonStr);
        console.log("✅ 解密成功：" + decryptedJsonStr);

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
              var coin = 0,
                gem = 0,
                power = 0;

              // 扁平数组遍历 (步长为2)
              for (var k = 0; k < encryptedProps.length; k += 2) {
                var id = encryptedProps[k];
                var valArr = encryptedProps[k + 1]; // [密文, 密钥, 错误位]

                // e[e.Start = 10000001] = "Start", e[e.Coin = 10000001] = "Coin", e[e.Exp = 10000002] = "Exp", e[e.Gem = 10000003] = "Gem", e[e.Power = 10000004] = "Power", e[e.Fund = 10000005] = "Fund", e[e.CollectExp = 10000007] = "CollectExp", e[e.TaiYi = 10000008] = "TaiYi", e[e.AJie = 10000009] = "AJie", e[e.Miao = 10000010] = "Miao", e[e.Shears = 10000011] = "Shears", e[e.Turntable = 10000051] = "Turntable", e[e.TurntableSeason = 10000052] = "TurntableSeason", e[e.LowModTool = 10000101] = "LowModTool", e[e.HighModTool = 10000102] = "HighModTool", e[e.BPDiscountCard = 10000201] = "BPDiscountCard", e[e.AdsTicket = 10000202] = "AdsTicket", e[e.TrialCard = 10000203] = "TrialCard", e[e.SevenDayExp = 10000204] = "SevenDayExp", e[e.SeasonSevenDayExp = 10000205] = "SeasonSevenDayExp", e[e.TSCoin = 10000206] = "TSCoin", e[e.ReforgeExp = 10000207] = "ReforgeExp", e[e.BPExp = 10000301] = "BPExp", e[e.STExp = 10000302] = "STExp", e[e.Season = 10000401] = "Season", e[e.GameEnd = 10000402] = "GameEnd", e[e.ClubSelfCoin = 10000501] = "ClubSelfCoin", e[e.CP = 10000502] = "CP", e[e.ClubCoin = 10000503] = "ClubCoin", e[e.PVPCoin = 10000601] = "PVPCoin", e[e.End = 10000602] = "End"

                if (id >= 10000000 && id < 20000000) {
                  if (Array.isArray(valArr)) {
                    var realVal = valArr[0] ^ valArr[1];
                    if (id === 10000001) {
                      coin = realVal;
                    } else if (id === 10000003) {
                      gem = realVal;
                    } else if (id === 10000004) {
                      power = realVal;
                    }
                    console.log(
                      "✅ 上传： " + id + "=" + realVal
                    );
                  }
                }
              }

              $notify(
                "MergeThree 保存",
                "",
                "💰" + coin + " 💎" + gem + " ⚡" + power
              );
            } else {
              console.log("❌ 未找到加密道具列表 (index 1)");
            }
          } else {
            console.log("❌ 未找到 PropsArchive");
          }
        }
      }
    }
  }
} catch (e) {
  console.log("❌ 异常: " + e.message);
}

$done({});
