/*公共工具方法
* $.cookie 操作cookie
* 设置全局的url接口： 例WebConfigUrl.PublicInterface
* 页面禁止滑动事件
* 日期添加原型方法
* */
//$.cookie 操作cookie
Zepto.cookie = function (h, m, j) {
    if (typeof m != "undefined") {
        j = j || {};
        if (m === null) {
            m = "";
            j.expires = -1
        }
        var f = "";
        if (j.expires && (typeof j.expires == "number" || j.expires.toUTCString)) {
            var d;
            if (typeof j.expires == "number") {
                d = new Date();
                d.setTime(d.getTime() + (j.expires * 24 * 60 * 60 * 1000))
            } else {
                d = j.expires
            }
            f = "; expires=" + d.toUTCString()
        }
        var k = j.path ? "; path=" + j.path : "";
        var e = j.domain ? "; domain=" + j.domain : "";
        var l = j.secure ? "; secure" : "";
        document.cookie = [h, "=", encodeURIComponent(m), f, k, e, l].join("")
    } else {
        var c = null;
        if (document.cookie && document.cookie != "") {
            var b = document.cookie.split(";");
            for (var g = 0; g < b.length; g++) {
                var a = Zepto.trim(b[g]);
                if (a.substring(0, h.length + 1) == (h + "=")) {
                    c = decodeURIComponent(a.substring(h.length + 1));
                    break
                }
            }
        }
        return c
    }
};
$.fn.show = function () {
    this.each(function (c, d) {
        d.style.display = "block"
    });
    return this
};

//localstorage数据获取方法
//
var StorageHelp = {
    SetStorage: function (e, g, exp) {
        if (window.localStorage) {
            var h = window.localStorage;
            try {
                h.setItem(e, g)
            } catch (f) {
                $.cookie(e, g, { expires: 30 })
            }
        } else {
            $.cookie(e, g, { expires: 30 })
        }
    }, GetStorage: function (d) {
        if (window.localStorage) {
            var f = window.localStorage;
            try {
                f = f.getItem(d);
                if (f == null || f == "") {
                    return $.cookie(d) == null ? "" : $.cookie(d)
                } else {
                    return f
                }
            } catch (e) {
                return $.cookie(d) == null ? "" : $.cookie(d)
            }
        } else {
            return $.cookie(d) == null ? "" : $.cookie(d)
        }
    }
};

//弹框方法
var mobileUtil = {
    touch: ("createTouch" in document), start: this.touch ? "touchstart" : "mousedown", move: this.touch ? "touchmove" : "mousemove", end: this.touch ? "touchend" : "mouseup", click: this.touch ? "tap" : "click",
    dialog: function (g, f, e, a) {
        if ($(f + " #showTip").length < 1) {
            var d = { _content_: g, _confirm_: a || "确认" };
            var b = $(this.dialogTpl().replace(/_[^_]*_/g, function (c) {
                return d[c]
            }));
            $(".msg-btn", b[1]).bind("click", function () {
                $("#bgTip").remove();
                $("#showTip").remove();
                startScroll();
                e && e();
            });
            $(f).append(b);
            stopScroll();
        }
    }, dialogTpl: function () {
        var H = window.innerHeight;
        return '<div id="bgTip" style="display: block;"></div><div id="showTip"><div class="msg-title">温馨提示</div><div class="msg-content">_content_</div><div class="msg-btn"><button style="margin:0;" class="btn">_confirm_</button></div></div>'
    },alert: function (g, f, e, a) {
        if ($(f + " #showAlert").length < 1) {
            var d = { _content_: g, _confirm_: a || "确认" };
            var b = $(this.alertTpl().replace(/_[^_]*_/g, function (c) {
                return d[c]
            }));
            $(".msg-btn", b[1]).bind("click", function () {
                e && e();
                $("#bgTip").remove();
                $("#showAlert").remove();
                startScroll();
            });
            $(".close", b[1]).bind(this.click, function () {
                startScroll();
                b.remove();
            });
            $(f).append(b);
            stopScroll();
        }
    },alertTpl: function () {
        var H = window.innerHeight;
        return '<div id="bgTip" style="display: block;"></div><div id="showAlert"><i class="icon-train-new close"></i><div class="msg-content">_content_</div><div class="msg-btn"><button style="margin:0;" class="alertbtn">_confirm_</button></div></div>'
    }, confirm: function (g, f, e, a, d, k) {
        var c = { _cancle_: a || "取消", _confirm_: d || "确认", _content_: g }, b = $(this.confirmTpl().replace(/_[^_]*_/g, function (h) {
            return c[h]
        }));
        $(".cancle", b).bind(this.click, function () {
            startScroll();
            k && k();
            b.remove()
        });
        $(".confirm", b).bind(this.click, function () {
            startScroll();
            e && e();
            b.remove()
        });
        $(f).append(b);
        stopScroll()
    }, confirmTpl: function () {
        return '<div id="bgTip" style="display: block;"><div id="showTip"><p class="msg-title msg-title-show">温馨提示</p><div class="msg-content">_content_</div><div class="msg-btn double"><button  class="cancle btn">_cancle_</button><button  class="confirm btn">_confirm_</button></div></div></div>'
    }
};
function stopScroll(dom) {
    var d=!!dom?dom:"body";
    $(d).on("touchmove", function (a) {
        a.preventDefault();
    })
}
function startScroll(dom) {
    var d=!!dom?dom:"body";
    $(d).off("touchmove")
}

var modal = {
    checkParam: function(param) {
        var element = typeof param == 'string' ? $('#' + param) : param;
        return element;
    },
    into: function(modalDom, modalBgDom) {
        this.checkParam(modalDom).removeClass("modal-out").addClass("modal-in");
        modalBgDom && this.checkParam(modalBgDom).addClass("modal-bg-visible");
        stopScroll();
    },
    out: function(modalDom, modalBgDom) {
        this.checkParam(modalDom).removeClass("modal-in").addClass("modal-out");
        modalBgDom && this.checkParam(modalBgDom).removeClass("modal-bg-visible");
        startScroll();
    }
};

//日期添加原型方法
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds(),
        "w+": Date.getWeek(this.getDay())
    };


    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
    return format;
};
Date.getWeek = function (e) {
    this.aWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return this.aWeek[e];
}
Date.ParseString = function (e) {
    var b = /(\d{4})-(\d{1,2})-(\d{1,2})(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/i,
        a = b.exec(e),
        c = 0,
        d = null;
    if (a && a.length) {
        if (a.length > 5 && a[6]) {
            c = Date.parse(e.replace(b, "$2/$3/$1 $4:$5:$6"));
        } else {
            c = Date.parse(e.replace(b, "$2/$3/$1"));
        }
    } else {
        c = Date.parse(e);

    }
    if (!isNaN(c)) {
        d = new Date(c);
    }
    return d;
};

//弹出loading信息
function showLoading(loadingText) {
    //$("body").append('<div class="opLayer"><div class="loading"><em class="loadingImg"></em></div></div>');
    loadingText = loadingText ? loadingText : '正在加载...';
    $("body").append('<div class="opLayer"><div class="loading-box"><div class="icon-train loading-icon"><div class="loading-gif"></div></div><p class="loading-content">'+loadingText+'</p></div></div>');

}
//弹出12306登录loading信息
function show12306Logining(loadingText,dom) {
    //$("body").append('<div class="opLayer"><div class="loading"><em class="loadingImg"></em></div></div>');
    loadingText = loadingText ? loadingText : '正在登录12306账号';
    dom=dom||'body';
    $(dom).append('<div class="opLayer"><div class="loading-box"><div class="icon-train-new login-logo"><div class="icon-train-new login-gif"></div></div><p class="logining-content">'+loadingText+'</p></div></div>');

}
//隐藏loading信息
function hideLoading() {
    $(".opLayer").remove();
}

//反馈信息提交成功或取消订单成功弹框显示

function showConfirm(conText) {
    $("body").append('<div class="ex-popoup-hint exph-suc"><s></s><span class="con">' + conText + '</span></div>');
    setTimeout(function () {
        $(".ex-popoup-hint").hide();
    }, 1000);
}


//半透明黑框提示
function showToast(toastText, delay) {
    if (toastText && $('#toastEle').length == 0) {
        $('body').append('<div id="toastEle" class="ui-toast"><div class="ui-toast-padding"><div class="ui-toast-content text-center"">'+toastText+'</div></div></div>')
    } else{
        return;
    }
    var toastEle = $('#toastEle');
    toastEle.css({
        'margin-top': - Math.round(toastEle.offset().height/2) + 'px'
    });
    setTimeout(function () {
        toastEle.css({ opacity: 0 });
        setTimeout(function() {
            toastEle.remove();
        }, 1000);
    }, (delay || 2000));
}
/*
function showMsgLoading(msg, sec, backFn) {
    $("body").append('<div class="opMsgLayer"><div class="loading">' + msg + '</div></div>');
    setTimeout(function () {
        hideMsgLoading();
        typeof backFn != "undefined" && backFn();
    }, sec)
}

function hideMsgLoading() {
    $(".opMsgLayer").remove();
}
*/

//获得url中的queryString OBJ
function getRequest() {
    var searchString = window.location.search.substring(1),
        params = searchString.split("&"),
        hash = {};

    if (searchString == "") return {};
    for(var i=0; i<params.length; i++) {
        // 获取等号位置
        var pos = params[i].indexOf('=');
        if(pos == -1) { continue; }
        // 获取name 和 value
        var paraName = params[i].substring(0, pos),
            paraValue = params[i].substring(pos + 1);
        hash[paraName] = paraValue;
    }
    return hash;
}


function getWxObj() {
    var str = $.cookie("SqUser") ? $.cookie("SqUser") : "0";
    var theRequest = new Object();
    if (str) {
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].slice(0, strs[i].indexOf('='))] = strs[i].slice(strs[i].indexOf('=') + 1);
        }
    }
    return theRequest;
}
function cidInfo(sId) {
    var tj = true;
    var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }
    var iSum = 0
    var info = ""
    if (!/^\d{17}(\d|x)$/i.test(sId)) {
        tj = false;
    }
    sId = sId.replace(/x$/i, "a");
    if (aCity[parseInt(sId.substr(0, 2))] == null) {
        tj = false;
    }
    var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"))
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
        tj = false;
    }
    for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)

    if (iSum % 11 != 1) {
        tj = false;
    }
    return tj;
}
function getIsSellAtNight(backFn) {
            $.ajax({
                url: "CheckWorkTime",
                type: "post",
                timeout: 20000,
                dataType: "text",
                beforeSend: function () {
                },
                success: function (issell) {
                    if (backFn) {
                        backFn(eval(issell));
                    }
                },
                complete: function (req, state) {
                    if (state == "error" || state == "timeout") {
                        mobileUtil.dialog("服务器繁忙，请稍后再试！", "body");
                    }
                }

            });
    }
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}




;(function(root){
    // Store.js
    var store = {},
        win = window,
        doc = win.document,
        localStorageName = 'localStorage',
        scriptTag = 'script',
        storage

    store.disabled = false
    store.version = '1.3.17'
    store.set = function(key, value) {}
    store.get = function(key, defaultVal) {}
    store.has = function(key) { return store.get(key) !== undefined }
    store.remove = function(key) {}
    store.clear = function() {}
    store.transact = function(key, defaultVal, transactionFn) {
        if (transactionFn == null) {
            transactionFn = defaultVal
            defaultVal = null
        }
        if (defaultVal == null) {
            defaultVal = {}
        }
        var val = store.get(key, defaultVal)
        transactionFn(val)
        store.set(key, val)
    }
    store.getAll = function() {}
    store.forEach = function() {}

    store.serialize = function(value) {
        return JSON.stringify(value)
    }
    store.deserialize = function(value) {
        if (typeof value != 'string') { return undefined }
        try { return JSON.parse(value) }
        catch(e) { return value || undefined }
    }

    // Functions to encapsulate questionable FireFox 3.6.13 behavior
    // when about.config::dom.storage.enabled === false
    // See https://github.com/marcuswestin/store.js/issues#issue/13
    function isLocalStorageNameSupported() {
        try { return (localStorageName in win && win[localStorageName]) }
        catch(err) { return false }
    }

    if (isLocalStorageNameSupported()) {
        storage = win[localStorageName]
        store.set = function(key, val) {
            if (val === undefined) { return store.remove(key) }
            storage.setItem(key, store.serialize(val))
            return val
        }
        store.get = function(key, defaultVal) {
            var val = store.deserialize(storage.getItem(key))
            return (val === undefined ? defaultVal : val)
        }
        store.remove = function(key) { storage.removeItem(key) }
        store.clear = function() { storage.clear() }
        store.getAll = function() {
            var ret = {}
            store.forEach(function(key, val) {
                ret[key] = val
            })
            return ret
        }
        store.forEach = function(callback) {
            for (var i=0; i<storage.length; i++) {
                var key = storage.key(i)
                callback(key, store.get(key))
            }
        }
    } else if (doc.documentElement.addBehavior) {
        var storageOwner,
            storageContainer
        // Since #userData storage applies only to specific paths, we need to
        // somehow link our data to a specific path.  We choose /favicon.ico
        // as a pretty safe option, since all browsers already make a request to
        // this URL anyway and being a 404 will not hurt us here.  We wrap an
        // iframe pointing to the favicon in an ActiveXObject(htmlfile) object
        // (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
        // since the iframe access rules appear to allow direct access and
        // manipulation of the document element, even for a 404 page.  This
        // document can be used instead of the current document (which would
        // have been limited to the current path) to perform #userData storage.
        try {
            storageContainer = new ActiveXObject('htmlfile')
            storageContainer.open()
            storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
            storageContainer.close()
            storageOwner = storageContainer.w.frames[0].document
            storage = storageOwner.createElement('div')
        } catch(e) {
            // somehow ActiveXObject instantiation failed (perhaps some special
            // security settings or otherwse), fall back to per-path storage
            storage = doc.createElement('div')
            storageOwner = doc.body
        }
        var withIEStorage = function(storeFunction) {
            return function() {
                var args = Array.prototype.slice.call(arguments, 0)
                args.unshift(storage)
                // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
                // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
                storageOwner.appendChild(storage)
                storage.addBehavior('#default#userData')
                storage.load(localStorageName)
                var result = storeFunction.apply(store, args)
                storageOwner.removeChild(storage)
                return result
            }
        }

        // In IE7, keys cannot start with a digit or contain certain chars.
        // See https://github.com/marcuswestin/store.js/issues/40
        // See https://github.com/marcuswestin/store.js/issues/83
        var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
        var ieKeyFix = function(key) {
            return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
        }
        store.set = withIEStorage(function(storage, key, val) {
            key = ieKeyFix(key)
            if (val === undefined) { return store.remove(key) }
            storage.setAttribute(key, store.serialize(val))
            storage.save(localStorageName)
            return val
        })
        store.get = withIEStorage(function(storage, key, defaultVal) {
            key = ieKeyFix(key)
            var val = store.deserialize(storage.getAttribute(key))
            return (val === undefined ? defaultVal : val)
        })
        store.remove = withIEStorage(function(storage, key) {
            key = ieKeyFix(key)
            storage.removeAttribute(key)
            storage.save(localStorageName)
        })
        store.clear = withIEStorage(function(storage) {
            var attributes = storage.XMLDocument.documentElement.attributes
            storage.load(localStorageName)
            while (attributes.length) {
                storage.removeAttribute(attributes[0].name)
            }
            storage.save(localStorageName)
        })
        store.getAll = function(storage) {
            var ret = {}
            store.forEach(function(key, val) {
                ret[key] = val
            })
            return ret
        }
        store.forEach = withIEStorage(function(storage, callback) {
            var attributes = storage.XMLDocument.documentElement.attributes
            for (var i=0, attr; attr=attributes[i]; ++i) {
                callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
            }
        })
    }

    try {
        var testKey = '__storejs__'
        store.set(testKey, testKey)
        if (store.get(testKey) != testKey) { store.disabled = true }
        store.remove(testKey)
    } catch(e) {
        store.disabled = true
    }
    store.enabled = !store.disabled

    root.store = store;
    root.storeWithExpiration = {
        set: function(key, val, exp) { store.set(key, {val:val, exp:exp, time:new Date().getTime()}); },
        get: function(key) { var info = store.get(key); if (!info) { return null; };  if (new Date().getTime() - info.time > info.exp) { return null; }  return info.val }
    };
})(window);







var WebConfigUrl = {};
WebConfigUrl.PublicInterface = $("#PublicInterface").val();
//新保险接口
WebConfigUrl.newInsurance = $("#ResourceUrl").val() + "Insurance/GetInsurancesWieless";
//轮询下单接口
WebConfigUrl.GetConsumeResult= $("#GetServUrl").val()+"BookOrderConsumerMessage/GetConsumeResult";
//订单详情
WebConfigUrl.OrderDetail = $("#ResourceUrl").val() + "OrderOperation/QueryOrderDetailsV1";
//订单列表
WebConfigUrl.OrderListUrl = $("#ResourceUrl").val() + "OrderOperation/QueryQqOrder";

WebConfigUrl.ticketSearch = WebConfigUrl.trainDetailUrl =  $("#SearchUrl").val() + "ticket/searchfortouch";
WebConfigUrl.StationUrl = $("#SearchUrl").val() + "Station";

WebConfigUrl.GetStopOvers = $("#ResourceUrl").val() + "Station/GetStopOvers";

WebConfigUrl.MonitorHandle = $("#ResourceUrl").val() + "OrderOperation/MonitorHandle";
WebConfigUrl.HotelAjaxCall = $("#HotelAjaxCall").val();
WebConfigUrl.WritePayBack = $("#PayBackUrl").val();
WebConfigUrl.CallBackUrl = $("#CallBackUrl").val();
WebConfigUrl.MerchentReUrl = $("#MerchentReUrl").val();
WebConfigUrl.LoginUrl = $("#LoginUrl").val();
WebConfigUrl.MyOrders = $("#MyOrders").val();
WebConfigUrl.RefundOrderTime = $("#RefundOrderTime").val();
WebConfigUrl.GetCityUrl = $("#GetCityUrl").val();
WebConfigUrl.WorkSTime = $("#WorkSTime").val();
WebConfigUrl.WorkETime = $("#WorkETime").val();
//WebConfigUrl.SaveMemberUrl = $("#ResourceUrl").val() + "FavoriteContacts/SaveMemberLinker";
WebConfigUrl.SaveMemberUrl = $("#ResourceUrl").val() + "FavoriteContacts/SqSaveMemberLinker";
WebConfigUrl.PayUrl = $("#PayUrl").val();
WebConfigUrl.GetOrderTrackingUrl = $("#ResourceUrl").val() + "OrderOperation/SearchOrderTracking";
WebConfigUrl.wxTrainUrl = $("#wxTrainUrl").val();
WebConfigUrl.wxFlightUrl = $("#wxFlightUrl").val();
WebConfigUrl.hotCityUrl = $("#hotCityUrl").val();
WebConfigUrl.letterCityUrl = $("#letterCityUrl").val();
WebConfigUrl.WeChatHoldingSeat = $("#ResourceUrl").val() + "OrderOperation/WeChatHoldingSeat";
WebConfigUrl.QQTrainHomePageUrl = decodeURIComponent($("#QQTrainHomePageUrl").val()); //首页的url
WebConfigUrl.PublicServiceTime = $("#PublicServiceTime").val();  //服务器时间接口
WebConfigUrl.TCOrderUrl=$("#TCOrderUrl").val();
//公告
WebConfigUrl.WeChatNoticeInfomation = $("#ResourceUrl").val() + "Notice/GetNoticeInfoNew";
//投诉与建议
WebConfigUrl.UserAdvice = $("#ResourceUrl").val() + "PublicInterface/TrainInterfaceService";
//退票进度接口
WebConfigUrl.TrainTicketRefundUrl = $("#ResourceUrl").val() + "OrderOperation/RefundTrack";
//夜间单取消接口
WebConfigUrl.CancelNightOrderUrl = $("#ResourceUrl").val() + "Handlers/TrainTicket.ashx";
//身份核验接口
WebConfigUrl.VerificationIdentity = $("#ResourceUrl").val() + "OrderOperation/VerificationIdentity";
//代金券
WebConfigUrl.UseList = $("#ResourceUrl").val() + "ManageWXCard/GetUserTrainActivityUseListForQQ";

/*学生票接口*/
//获取城市接口
WebConfigUrl.GetCityUrl = $("#ResourceUrl").val() + "Student/GetCity";
//获取学校接口
WebConfigUrl.GetSchoolUrl = $("#ResourceUrl").val() + "Student/GetSchool";

//var temp =  "http://10.1.204.83:7577/huochepiao/resource/";
//保存学生票联系人
WebConfigUrl.SaveStuMemberUrl =$("#ResourceUrl").val() + "FavoriteContacts/AddMemberLinker";
//保存多个常旅
WebConfigUrl.SaveMultipleStumemberUrl = $("#ResourceUrl").val() + "FavoriteContacts/AddMemberLinkerForBatch";
//获取学生票联系人
WebConfigUrl.GetStuMemberUrl =$("#ResourceUrl").val() + "FavoriteContacts/QueryMemberLinker";
//删除学生票联系人
WebConfigUrl.DeleteStuMemberUrl = $("#ResourceUrl").val() + "FavoriteContacts/RemoveMemberLinker";
//修改学生票联系人
WebConfigUrl.UpdateStuMemberUrl = $("#ResourceUrl").val() + "FavoriteContacts/UpdateMemberLinker";
//学生票入口开关控制
WebConfigUrl.StudentSwitchUrl = $("#ResourceUrl").val() + "OrderOperation/StudentSwitch";
//热门城市不可退，数据插入后台
WebConfigUrl.insertRefund = $("#ResourceUrl").val() + "OrderOperation/UpdatePassengerInfo";
//服务中心
WebConfigUrl.helpCenter = $("#helpCenterUrl").val() + "AdviceHandler";
//获取是否需要验证码
WebConfigUrl.isUseVerifyCode=$("#captchaUrl").val()+"GetCaptchaStatus";
//获取异步登录状态
WebConfigUrl.checkTrainlogin=$("#captchaUrl").val()+"GetKyfwLoginStatus";
//验证码验证接口
WebConfigUrl.VerifyCode=$("#captchaUrl").val()+"SendCaptChar";
//手机号核验接口
WebConfigUrl.VerifyPhone=$("#ResourceUrl").val() +"OrderOperation/VerifyKyfwMobile";
//检测注册身份信息
WebConfigUrl.CheckUserRegister=$("#ResourceUrl").val()+"OrderOperation/CheckUserRegister";
//检测用户名有效性
WebConfigUrl.CheckUserName=$("#ResourceUrl").val()+"OrderOperation/CheckUserName";
//12306账号注册
WebConfigUrl.RegisterKyfwAccount=$("#ResourceUrl").val()+"OrderOperation/RegisterKyfwAccount";
//获取注册状态
WebConfigUrl.GetKyfwRegisterStatus=$("#captchaUrl").val()+"GetKyfwRegisterStatus";
//改签合并接口
WebConfigUrl.changeOrder=$("#ResourceUrl").val()+"OrderOperation/ApplyChangeTicketV1";
/*
window.utilityServertime = function() {
    var servertime;
    function servertimeRequest() {
        $.ajax({
            url: WebConfigUrl.PublicServiceTime,
            dataType: "jsonp",
            timeout: 3000,
            success: function (obj) {
                if (obj.ResponseStatus) {
                    var serverTimeStr = obj.ResponseMessage.replace(/-/g,'/');
                    //serverTimeStr = "2015-03-06 22:59:50";
                    var localtime = new Date();
                    servertime = {server:new Date(Date.parse(serverTimeStr)),local: localtime};
                    var localtimeStr = localtime.getFullYear() + '/' + (localtime.getMonth()+1) + '/' + localtime.getDate() + ' ' + localtime.getHours() + ':' + localtime.getMinutes() + ':' + localtime.getSeconds();
                    store.set('SERVERTIME', {serverTimeStr: serverTimeStr, localtimeStr: localtimeStr});
                }
            }
        });
    }

    function getServertime() {
        var storageServertime = store.get('SERVERTIME');
        if(storageServertime) {
            try {
                servertime = {
                    server: new Date(Date.parse(storageServertime.serverTimeStr)),
                    local: new Date(Date.parse(storageServertime.localtimeStr))
                }
            } catch(e) {
                servertimeRequest();
            }
        } else {
            servertimeRequest();
        }
    };

    var isExist = function() {
        if (typeof servertime == "undefined" || !servertime.server) {
            return false;
        }
        return true;
    };

    var getDate = function() {
        var currentTime;
        if (isExist()) {
            currentTime = new Date(new Date().getTime() + (servertime.server - servertime.local)); //服务器时间
        } else {
            currentTime = new Date(); //当前时间
        }
        return currentTime;
    };

    var getUnix = function () {
        return getDate().getTime();
    };

    //是否在工作时间之内
    var isWorkTime = function() {
        var workSTime = WebConfigUrl.WorkSTime,
            workETime = WebConfigUrl.WorkETime,
            workSMinute = parseInt(workSTime.split(":")[0]) * 60 +  parseInt(workSTime.split(":")[1]),
            workEMinute = parseInt(workETime.split(":")[0]) * 60 +  parseInt(workETime.split(":")[1]);
        var servertimeMinute = utilityServertime.getDate().getHours() * 60 + utilityServertime.getDate().getMinutes();
        if(servertimeMinute >= workSMinute && servertimeMinute < workEMinute) {
            return true;
        } else {
            return false;
        }
    }

    getServertime();

    return {
        getDate: getDate,
        getUnix: getUnix,
        isWorkTime: isWorkTime
    };
}();
*/
















