var body = $response.body;

// 1. 核心解密类
var Random = function() {
    function Random(seed) { this.setSeed(seed); }
    Random.prototype = {
        setSeed: function(seed) { this._seed = 32767 & seed; },
        nextInt: function(min, max) { return this._rand() % (max - min + 1) + min; },
        _rand: function() {
            this._seed = (this._seed * 214013 + 2531011) >>> 16 & 32767;
            return this._seed;
        }
    };
    return Random;
}();

function decryptMerge(str) {
    if (!str || str.length < 10 || str.substring(8, 10) !== "$%") {
        console.log("❌ Decrypt failed: Invalid format header");
        return null;
    }
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
            var t = o[l], d = r[l];
            r[l] = r[t], r[t] = d;
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

// 2. 业务逻辑
try {
    var obj = JSON.parse(body);
    
    // 兼容 obj.archives 和 obj.data.archives
    var archives = null;
    if (obj.archives) {
        archives = obj.archives;
    } else if (obj.data && obj.data.archives) {
        archives = obj.data.archives;
    }

    if (archives && Array.isArray(archives)) {
        console.log("✅ 找到 archives 列表，长度: " + archives.length);
        
        var mergeThree = archives.find(function(a) { return a.name === "MergeThree"; });
        
        if (mergeThree && mergeThree.data) {
            console.log("✅ 找到 MergeThree 加密数据");
            var decryptedJsonStr = decryptMerge(mergeThree.data);
            
            if (decryptedJsonStr) {
                console.log("✅ MergeThree 解密成功");
                
                // 尝试解析解密后的 JSON
                var mergeData = JSON.parse(decryptedJsonStr);
                
                // 检查 mergeData 结构: [ID, Ver, [SubArchives...]]
                if (Array.isArray(mergeData) && mergeData.length >= 3) {
                    var subArchives = mergeData[2];
                    console.log("ℹ️ 子存档列表类型: " + (Array.isArray(subArchives) ? "Array" : typeof subArchives));
                    
                    var propsData = null;
                    if (subArchives && Array.isArray(subArchives)) {
                        console.log("ℹ️ 遍历子存档寻找 Props (ID=1)...");
                        for (var i = 0; i < subArchives.length; i++) {
                            // subArchives[i] 结构: [ArchiveID, Ver, Data]
                            var subId = subArchives[i][0];
                            // console.log("   - Index " + i + " ID: " + subId); 
                            if (subId === 1) { // ID 1 是 PropsArchive
                                propsData = subArchives[i][2];
                                console.log("✅ 找到 PropsArchive (ID 1)");
                                break;
                            }
                        }
                    } else {
                        console.log("❌ MergeThree 数据结构异常: 索引2不是数组");
                    }
                    
                    if (propsData) {
                        // PropsArchive 结构: { data: [ [普通道具], [加密道具] ] }
                        // 通常加密道具在 data[1]
                        if (propsData.data && Array.isArray(propsData.data) && propsData.data.length > 1) {
                            var encryptedProps = propsData.data[1];
                            console.log("ℹ️ 找到 EncryptedProps 列表，长度: " + (encryptedProps ? encryptedProps.length : "null"));
                            
                            var coin = 0, gem = 0, power = 0;
                            var foundCount = 0;
                            
                            if (encryptedProps) {
                                for (var k = 0; k < encryptedProps.length; k++) {
                                    var item = encryptedProps[k];
                                    var id = item[0];
                                    var valArr = item[1]; // [密文, 密钥, 错误位]
                                    
                                    if (id === 10000001 || id === 10000003 || id === 10000004) {
                                        var realVal = valArr[0] ^ valArr[1];
                                        if (id === 10000001) coin = realVal;
                                        if (id === 10000003) gem = realVal;
                                        if (id === 10000004) power = realVal;
                                        foundCount++;
                                    }
                                }
                                
                                console.log("✅ 统计完成，找到 " + foundCount + " 个关键资源");
                                var fmt = function(num) { return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); };
                                
                                $notify(
                                    "MergeOne 资源统计", 
                                    "", 
                                    "💰 金币: " + fmt(coin) + "\n💎 钻石: " + fmt(gem) + "\n⚡ 体力: " + fmt(power)
                                );
                            } else {
                                console.log("❌ encryptedProps 为空");
                            }
                        } else {
                            console.log("❌ propsData.data 结构异常或长度不足");
                            console.log("   keys: " + Object.keys(propsData));
                        }
                    } else {
                        console.log("❌ 未在 MergeThree 中找到 PropsArchive (ID 1)");
                    }
                } else {
                    console.log("❌ MergeData 解密后格式不符期望 (不是数组或长度<3)");
                }
            } else {
                console.log("❌ decryptMerge 返回 null");
            }
        } else {
            console.log("❌ 未找到 MergeThree 或其 data 字段为空");
        }
    } else {
        console.log("❌ 未找到 archives 数组 (obj.archives 和 obj.data.archives 均为空)");
    }
} catch (e) {
    console.log("❌ 脚本运行异常: " + e.message);
    $notify("Merge脚本错误", "", e.message);
}

$done({});
