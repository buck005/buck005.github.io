function getEle(str, aParent) {
    var arr = str.match(/\S+/g);//id class tagname
    var aParent = aParent || [document];//初始默认的父级
    var aChild = [];	//存返回来的子级

    //for去抓	抓到了存aChild--->aParent=aChild
    /*
     i		父			子
     0		doc			#div1
     1		oDiv		ul
     2		aUl			li
     3		aLi			.box
     */
    for (var i = 0; i < arr.length; i++) {//从父级中抓子级
        aChild = getByStr(aParent, arr[i]);
        aParent = aChild;
    }
    return aChild;
}
;
function getByStr(aParent, str) {
    //alert(str)
    var aChild = [];
    for (var j = 0; j < aParent.length; j++) {
        switch (str.charAt(0)) {
            case '#'://id
                var obj = document.getElementById(str.substring(1));
                aChild.push(obj);
                break;
            case '.'://class
                var aEle = aParent[j].getElementsByClassName(str.substring(1));
                for (var i = 0; i < aEle.length; i++) {//抓到的可能是一堆，循环是为了一个一个push到aChild里面
                    aChild.push(aEle[i]);
                }
                break;
            default://tagname
                if (/\w+#\w+/.test(str)) {//div#div1
                    var arr = str.split('#');//['div','div1']
                    var aEle = aParent[j].getElementsByTagName(arr[0]);//抓到一堆，需循环
                    for (var i = 0; i < aEle.length; i++) {
                        if (aEle[i].id == arr[1]) {
                            aChild.push(aEle[i]);
                            return aChild;
                        }
                    }
                } else if (/\w+\.\w+/.test(str)) {//div.box
                    var arr = str.split('.');//['div','box']
                    //alert(arr)
                    var aEle = aParent[j].getElementsByClassName(arr[1]);
                    //alert(aEle)
                    var re = RegExp('\\b' + arr[1] + '\\b');
                    for (var i = 0; i < aEle.length; i++) {
                        if (re.test(aEle[i].className)) {
                            aChild.push(aEle[i]);
                        }
                    }
                } else if (/\w+\[\w+=\w+\]/.test(str)) {//div[title=bnw]
                    var arr = str.split(/\[|=|\]/g);//['div','title','bnw',''] 注意数组长度为4
                    var aEle = aParent[j].getElementsByTagName(arr[0]);
                    for (var i = 0; i < aEle.length; i++) {
                        if (aEle[i].getAttribute(arr[1]) == arr[2]) {
                            aChild.push(aEle[i]);
                        }
                    }
                } else if (/\w+:\w+(?:\(.\))?/.test(str)) {//div:first/div:last/div:odd/div:even/div:lt(2)/div:gt(2)/div:eq(2)
                    var arr = str.split(/:|\(|\)/g);//['div','eq/fist/last','2',''] 注:数组长度为4
                    var aEle = aParent[j].getElementsByTagName(arr[0]);//
                    switch (arr[1]) {
                        case 'frist':
                            aChild.push(aEle[0]);
                            break;
                        case 'last':
                            aChild.push(aEle[aEle.length - 1]);
                            break;
                        case 'odd':
                            for (var i = 0; i < aEle.length; i++) {
                                if (i % 2 == 1) {
                                    aChild.push(aEle[i]);
                                }
                            }
                            break;
                        case 'even':
                            for (var i = 0; i < aEle.length; i += 2) {
                                aChild.push(aEle[i]);
                            }
                            break;
                        case 'eq':
                            aEle[arr[2]] && aChild.push(aEle[arr[2]]);
                            break;
                        case 'gt':
                            for (var i = parseInt(arr[2]) + 1; i < aEle.length; i++) {
                                aChild.push(aEle[i]);
                            }
                            break;
                        case 'lt':
                            for (var i = 0; i < arr[2]; i++) {
                                aChild.push(aEle[i]);
                            }
                            break;
                    }
                } else {
                    var aEle = aParent[j].getElementsByTagName(str);
                    for (var i = 0; i < aEle.length; i++) {
                        aChild.push(aEle[i]);
                    }
                }
        }
    }
    return aChild;
}
;
function getByClass(oParent, sClass) {
    if (oParent.getElementsByClassName) {
        return oParent.getElementsByClassName(sClass);
    }

    var aEle = oParent.getElementsByTagName('*');
    var result = [];
    var re = new RegExp('\\b' + sClass + '\\b');
    for (var i = 0; i < aEle.length; i++) {
        if (re.test(aEle[i].className)) {
            result.push(aEle[i]);
        }
    }
    return result;
}
function ready(fn) {
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn, false);
    } else {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState == 'complete') {
                fn && fn();
            }
        });
    }
}
function getStyle(obj, attr) {//attr行间样式例如宽/高等
    return (obj.currentStyle || getComputedStyle(obj, false))[attr];//obj.currentStyle 兼容所有IE，gerConputedStyle兼容高版本IE9+，不兼容IE8-
}
;
function addEvent(obj, sEv, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(sEv, function (ev) {//高版本需传ev
            if (fn.call(obj, ev) == false) {
                ev.cancelBubble = true;//阻止冒泡；
                ev.preventDefault();//阻止默认；
            }
        }, false);
    } else {
        obj.attachEvent('on' + sEv, function () {//低版本不需传，本身就有event对象
            if (fn.call(obj, event) == false) {
                event.cancelBubble = true;//阻止冒泡
                return false;//阻止默认
            }
        });
    }
}
;
function ajax(options) {//options参数：url,data,type,timenout,success,error
    //整理options
    options = options || {};
    //if (!options.url) return;
    options.data = options.data || {};
    options.type = options.type || 'get';
    options.timeout = options.timeout || 0;
    options.success = options.success || null;
    options.error = options.error || null;
    //整理data
    options.data.t = Math.random();
    var arr = [];
    for (var key in options.data) {
        arr.push(key + '=' + encodeURIComponent(options.data[key]));
    }
    var str = arr.join('&');//数组转字符串
    //创建ajax
    if (window.XMLHttpRequest) {
        var oAjax = new XMLHttpRequest();
    } else {
        var oAjax = new ActiveXObject('microsoft.XMLHTTP');//兼容IE6
    }
    //连接（与服务器建立连接）
    if (options.type == 'get') {
        oAjax.open('get', options.url + '?' + str, true)//oAjax.open(提交方式，地址，异步加载);
        //发送
        oAjax.send();
    } else {
        oAjax.open('post', options.url, ture);
        //设置请求头  oAjax.setRequestHeader('属性名','属性值')
        oAjax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        //发送
        oAjax.send(str);
    }
    //接收
    oAjax.onreadystatechange = function () {
        if (oAjax.readyState == 4) {
            if (oAjax.status >= 200 && oAjax.status < 300 || oAjax.status == 304) {
                options.success && options.success(oAjax.responseText);//responseText 响应主体，返回请求
                clearTimeout(timer);
            } else {
                options.error && options.error(oAjax.status);
            }
        }
    };
    //超时
    if (options.timeout) {
        var timer = setTimeout(function () {
            alert('数据请求超时了');
            oAjax.abort();//中断ajax请求
        }, options.timeout)
    }
}
;
function move(obj, json, options) {//obj对象，json样式，duration时间 fn回调函数
    //整理options  options也是json
    options = options || {};
    options.duration = options.duration || 300;
    options.easing = options.easing || 'ease-out'
    options.fn = options.fn || null;
    var start = {};//起始位置
    var dis = {};//总距离
    for (var name in json) {
        start[name] = parseFloat(getStyle(obj, name));
        if (isNaN(start[name])) {
            switch (name) {
                case 'width':
                    start[name] = obj.offsetWidth;
                    break;
                case 'height':
                    start[name] = obj.offsetHeight;
                    break;
                case 'left':
                    start[name] = 0;
                    break;
                case 'top':
                    start[name] = 0;
                    break;
                case 'opacity':
                    start[name] = 1;
                    break;
                //marginLeft/marginTop...padding....
            }
        }
        dis[name] = json[name] - start[name];//总距离=目标距离-起始位置
    }
    var count = Math.floor(options.duration / 30);//总步数  总次数
    var n = 0;//现在走的步数/次数   初始值
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        n++;
        for(var name in json){
            switch (options.easing) {
                case 'linear'://匀速
                    var a = n / count;
                    var cur = start[name] + dis[name] * a;//距离计算
                    break;
                case 'ease-in'://加速
                    var a = n / count;
                    var cur = start[name] + dis[name] * (a * a * a);
                    break;
                case 'ease-out'://减速
                    var a = 1 - n / count;
                    var cur = start[name] + dis[name] * (1 - a * a * a);
                    break;
            }
            if (name == 'opacity') {
                obj.style.opacity = cur;
                obj.style.filter = 'alpha(opacity:' + cur * 100 + ')';
            } else {
                obj.style[name] = cur + 'px';
            }
        }
        if (n == count) {
            clearInterval(obj.timer);
            options.fn && options.fn();
        }
    }, 30);

}
;
//构造函数
function zQuery(args) {
    this.elements = [];//oo做一个属性，用来抓到的页面元素
    switch (typeof args) {
        case 'function'://dom 的加载ready 比window.onload快
            ready(args);
            break;
        case 'string'://抓对象（选择器）
            this.elements = getEle(args);
            break;
        case 'object'://原生对象，需要包
            if ('length' in args) {//判断传过来的对象是一个还是多个
                this.elements = args;//包装this.elements引用args
            } else {
                this.elements.push(args);//包装
            }
            break;
    }
}
;
function $(args) {//new zQuery用$代替
    return new zQuery(args);
}
;
//原型(方法写在原型上)
zQuery.prototype.css = function (arg1, arg2) {//arg1:属性名,arg2:   属性值
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 2) {//修改
            this.elements[i].style[arg1] = arg2;
        } else if (elements.length == 1) {//获取和批量修改
            if (typeof arg1 == 'string') {//获取
                if (getStyle(this.elements[0], arg1) == 'auto') {
                    switch (arg1) {
                        case 'width':
                            return this.elements[0].offsetWidth + 'px';
                            break;
                        case 'height':
                            return this.elements[0].offsetHeight + 'px';
                            break;
                        case 'left':
                            return this.elements[0].offsetLeft + 'px';
                            break;
                        case 'top':
                            return this.elements[0].offsetTop + 'px';
                        //......
                    }
                } else {
                    return getStyle(this.elements[0], arg1);
                }
            } else if (typeof arg1 == 'object') {//批量修改
                for (var key in arg1) {
                    this.elements[i].style[key] = arg1[key];
                }
            }
        }
    }
};
zQuery.prototype.attr = function (arg1, arg2) {
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 2) {//修改
            this.elements[i].setAttribute(arg1, arg2);
        } else if (arguments.length == 1) {//获取，批量设置
            if (typeof arg1 == 'string') {//获取
                return this.elements[0].getAttribute(arg1);
            } else if (typeof arg1 == 'object') {//批量设置
                for (var key in arg1) {
                    this.elements[i].setAttribute(key, arg1[key]);
                }
            }
        }
    }
};
zQuery.prototype.hover = function (fn1, fn2) {
    this.mouseenter(fn1);
    this.mouseleave(fn2);
};
zQuery.prototype.toggle = function () {
    var args = arguments;//当参数不确定的时候，用arguments接受参数
    //args fn0 fn1 fn2 fnN
    //args[0]    ==   fn0的函数体
    //args[0]()  调用
    //args[当前按钮被点击的次数 % args.length]()

    for (var i = 0; i < this.elements.length; i++) {//this.elements当前的元素对象
        //alert(typeof this.elements)-->object
        this.elements[i].count = 0;

        addEvent(this.elements[i], 'click', function (ev) {//function (ev){...}函数体就是addEvent里面的fn
            //alert(this)
            if (args[this.count % args.length].call(this, ev) == false) {
                //alert(this)
                this.count++;
                return false;
            }
            this.count++;
        });
    }
};
zQuery.prototype.eq = function (n) {
    return $(this.elements[n]);//$(this.elements[n])  $包装后为 o o
};
zQuery.prototype.get = function (n) {
    return this.elemens[n];//直接返回原生
};
zQuery.prototype.hide = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'none';
    }
};
zQuery.prototype.show = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'block';
    }
};
zQuery.prototype.index = function () {
    var oParent = this.elements[0].parentNode;//找父级  this.elements[0]是原生
    //var oParent=this.get(0); 这种方式找父级也一样
    var aChild = oParent.children;//找一级子 一堆
    for (var i = 0; i < aChild.length; i++) {
        if (aChild[i] == this.elements[0]) {
            return i;
        }
    }
};
zQuery.prototype.find = function (str) {//在当前元素下继续找 $('#div').find('ul li.active')
    //return $(getEle(str,this.elements));//修改getEle 包装过后也可以
    this.elements = getEle(str, this.elements);
    return this;
};
zQuery.prototype.addClass = function (sClass) {
    var re = new RegExp('\\b' + sClass + '\\b');
    for (var i = 0; i < this.elements.length; i++) {
        if (!re.test(this.elements[i].className)) {
            this.elements[i].className = this.elements[i].className + ' ' + sClass;
        }
        this.elements[i].className = this.elements[i].className.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
    }
};
zQuery.prototype.removeClass = function (sClass) {
    var re = new RegExp('\\b' + sClass + '\\b');
    for (var i = 0; i < this.elements.length; i++) {
        if (re.test(this.elements[i].className)) {
            this.elements[i].className = this.elements[i].className.replace(re, '');
        }
        this.elements[i].className = this.elements[i].className.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
        if (!this.elements[i].className) {
            this.elements[i].removeAttribute('class');
        }
    }
};
zQuery.prototype.hasClass = function (sClass) {
    var re = new RegExp('\\b' + sClass + '\\b');
    for (var i = 0; i < this.elements.length; i++) {
        if (re.test(this.elements[i].className)) {
            return true;
        }
    }
    return false;
};
zQuery.prototype.toggleClass = function (sClass) {
    for (var i = 0; i < this.elements.length; i++) {
        $(this.elements[i]).hasClass(sClass) ? $(this.elements[i]).removeClass(sClass) : $(this.elements[i]).addClass(sClass);
    }
};
zQuery.prototype.each = function (fn) {
    for (var i = 0; i < this.elements.length; i++) {
        fn.call(this.elements[i], i, this.elements[i]);
    }
};
//插件
$.fn = zQuery.prototype;//引用
zQuery.prototype.extend = function (json) {
    //key:toRed/toGreen...
    //json[key]=fn/fn;
    for (var key in json) {
        zQuery.prototype[key] = json[key];
    }
};
//ajax
$.ajax = ajax;
zQuery.prototype.animate = function (json, options) {
    for (var i = 0; i < this.elements.length; i++) {
        move(this.elements[i],json, options);
    }
};
/*zQuery.prototype.click = function (fn) {
 for (var i = 0; i < this.elements.length; i++) {
 addEvent(this.elements[i], 'click', fn);
 }
 };
 */
'click/mouseover/mouseout/contextmenu/mousedown/mousemove/mouseup/mouseenter/mouseleave/'.replace(/\w+/g, function (sEv) {
    zQuery.prototype[sEv] = function (fn) {//sEvt----符合规则的字符 click  mouseover ……
        //alert(this.elements.length);
        for (var i = 0; i < this.elements.length; i++) {
            addEvent(this.elements[i], sEv, fn);
        }
    };
});


