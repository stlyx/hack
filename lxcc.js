var body = $response.body;

var Random = function() {
    function Random(seed) {
        this.setSeed(seed);
    }
    Random.prototype = {
        setSeed: function(seed) {
            this._seed = 32767 & seed;
        },
        nextInt: function(min, max) {
            return this._rand() % (max - min + 1) + min;
        },
        _rand: function() {
            this._seed = (this._seed * 214013 + 2531011) >>> 16 & 32767;
            return this._seed;
        }
    };
    return Random;
}();

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
            var t = o[l];
            var d = r[l];
            r[l] = r[t];
            r[t] = d;
        }
        
        var res = "";
        var chunkSize = 8192;
        for (var i = 0; i < r.length; i += chunkSize) {
            res += String.fromCharCode.apply(null, r.slice(i, i + chunkSize));
        }
        return res;
    } catch (e) {
        console.log("Merge decrypt error: " + e);
        throw e;
    }
}

try {
    var obj = JSON.parse(body);
    
    if (obj && obj.data && obj.data.archives && Array.isArray(obj.data.archives)) {
        console.log("found archives");
        var mergeThree = obj.data.archives.find(function(a) { return a.name === "MergeThree"; });
        
        if (mergeThree && mergeThree.data) {
            console.log("found MergeThree");
            var decryptedJsonStr = decryptMerge(mergeThree.data);
            
            if (decryptedJsonStr) {
                console.log("decrypt MergeThree", decryptedJsonStr);
                var mergeData = JSON.parse(decryptedJsonStr);
                
                var subArchives = mergeData[2];
                var propsData = null;
                
                if (subArchives && Array.isArray(subArchives)) {
                    for (var i = 0; i < subArchives.length; i++) {
                        if (subArchives[i][0] === 1) { // ID 1 是 Props
                            propsData = subArchives[i][2];
                            break;
                        }
                    }
                }
                
                if (propsData && propsData.data && propsData.data[1]) {
                    var encryptedProps = propsData.data[1];
                    
                    var coin = 0;
                    var gem = 0;
                    var power = 0;
                    
                    for (var k = 0; k < encryptedProps.length; k++) {
                        var item = encryptedProps[k];
                        var id = item[0];      // 道具ID
                        var valArr = item[1];  // [密文, 密钥, 错误位]
                        
                        var realVal = valArr[0] ^ valArr[1];
                        
                        if (id === 10000001) coin = realVal;      // 金币
                        if (id === 10000003) gem = realVal;       // 钻石
                        if (id === 10000004) power = realVal;     // 体力
                    }
                    
                    var fmt = function(num) { return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); };
                    
                    $notify(
                        "资源统计", 
                        "", 
                        "💰 金币: " + fmt(coin) + "\n💎 钻石: " + fmt(gem) + "\n⚡ 体力: " + fmt(power)
                    );
                    
                    console.log("MergeOne Notify: Coin=" + coin + ", Gem=" + gem);
                }
            }
        }
    }
} catch (e) {
    $notify("MergeOne Script Error: " + e.message);
    console.log("MergeOne Script Error: " + e.message);
}

$done({});
