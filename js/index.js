/*console.log(window.innerWidth); //1366
 console.log(window.innerHeight);//642*/

window.onload = function () {

    var oHeader = $('header')
    var oNav = $('nav');
    var oArrow = $('arrow');
    var oList = $('list');
    var oContent = $('content');
    var aLiNav = oNav.getElementsByTagName('li');
    var aLiList = getByClass(oList, 'liList');
    var aDivList = getByClass(oList, 'divList');
    var oWorksContent = $('worksContent');
    var oWorksContent2 = $('worksContent2');
    var oPrev = getByClass(oWorksContent, 'prev')[0];
    var oNext = getByClass(oWorksContent, 'next')[0];
    var aImg = oWorksContent.getElementsByTagName('img');
    var oH1 = getByClass(document, 'commonTitle');
    var iContentHeight = 0;
    var oHomeContent = $('homeContent');
    var oHomeContent1 = getByClass(oHomeContent, 'homeContent1')[0];
    var oHomeContent2 = getByClass(oHomeContent, 'homeContent2')[0];
    var oCourseContent = $('courseContent');

    var oMenu_box = $('menu_box');
    var aLiMenu = oMenu_box.getElementsByTagName('li');
    var oBtn = $('btn');
    var aBtn = oBtn.getElementsByTagName('div')

    var oAboutContent = $('aboutContent');
    var oAboutContent3 = getByClass(oAboutContent, 'aboutContent3')[0];
    var oAside = $('aside');
    var aLiAside = oAside.getElementsByTagName('li');

    var oAuthorContent = $('authorContent');
    var oAuthorContent1 = getByClass(oAuthorContent, 'authorContent1')[0];
    var oAuthorContent2 = getByClass(oAuthorContent, 'authorContent2')[0];
    var oMusic = $('music');
    var oAudio1 = $('audio1');
    var oLoading = $('loading');

    var iNow = 0;
    var prevIndex = 0;
    var bOk = true;

    showLoading();
    contentAuto();
    listContentAuto();
    bindNav();
    mouseWheel();
    homeContent();
    aboutContent();
    authorContent();
    showMusic();
    window.onresize = fnResize;

    //进度条
    function showLoading() {
        var oSpan = oLoading.getElementsByTagName('span')[0];
        var aDiv = oLoading.getElementsByTagName('div');
        //图片预加载
        var arr = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'about1.jpg', 'about2.jpg', 'about3.jpg', 'about4.jpg', 'team.png', 'greenLine.png'];
        var imageiNow = 0;

        for (var i = 0; i < arr.length; i++) {
            var oImage = new Image();
            oImage.src = 'img/' + arr[i];
            oImage.onload = function () {
                imageiNow++;
                oSpan.style.width = imageiNow / arr.length * 100 + '%';
                /*if(imageiNow=arr.length){
                 alert(1)
                 }*/
            };
        }
        oSpan.addEventListener('webKitTransitionend', spanChange, false);
        oSpan.addEventListener('transitionend', spanChange, false);
        function spanChange() {
            if (imageiNow / arr.length * 100 == 100) {
                oSpan.style.display = 'none';
                aDiv[0].style.height = 0 + '%';
                aDiv[1].style.height = 0 + '%';
            }
        };

        aDiv[0].addEventListener('webKitTransitionend', divChange, false);
        aDiv[0].addEventListener('transitionend', divChange, false);

        function divChange() {
            oLoading.parentNode.removeChild(oLoading);//进度条加载完后删除掉，提高性能
            oMusic.onclick();
            cjAnimate[0].inAn();
        };

        //预加载 js css
        /*var bj = document.createElement('object');
         bj.data = 'base.js';
         document.body.appendChild(bj);
         bj.width = 0;
         bj.height = 0;
         bj.onload = function(){
         };*/

    };


    //导航
    function bindNav() {
        var oDiv = aLiNav[0].getElementsByTagName('div')[0];
        //设置默认值
        oDiv.style.width = '100%';
        oArrow.style.left = aLiNav[0].offsetLeft + aLiNav[0].offsetWidth / 2 - oArrow.offsetWidth / 2 + 'px';
        for (var i = 0; i < aLiNav.length; i++) {
            aLiNav[i].index = i;
            aLiNav[i].onmousedown = function () {
                prevIndex = iNow;
                iNow = this.index;
                toMove(this.index);
            };
        }
        //侧边栏
        for (var i = 0; i < aLiAside.length; i++) {
            aLiAside[i].index = i;
            aLiAside[i].onclick = function () {
                prevIndex = iNow;
                iNow = this.index;
                toMove(this.index);
            };
        }
    };
    function toMove(index) {
        for (var i = 0; i < aLiNav.length; i++) {
            var oDiv = aLiNav[i].getElementsByTagName('div')[0];
            oDiv.style.width = '';
        }
        var oDiv = aLiNav[index].getElementsByTagName('div')[0];
        oDiv.style.width = '100%';
        oArrow.style.left = aLiNav[index].offsetLeft + aLiNav[index].offsetWidth / 2 - oArrow.offsetWidth / 2 + 'px';
        oList.style.top = -index * iContentHeight + 'px';
        //侧边栏
        for (var i = 0; i < aLiAside.length; i++) {
            aLiAside[i].className = '';
        }
        aLiAside[index].className = 'active';
        //入场、出场动画

        if (cjAnimate) {
            cjAnimate[index].inAn();
        }
        if (cjAnimate) {
            cjAnimate[prevIndex].outAn();
        }

    };
    function viewWidth() {//获取可视区的宽
        return window.innerWidth || document.documentElement.clientWidth;
    };

    function viewHeight() {//获取可视区的高
        return window.innerHeight || document.documentElement.clientHeight;
    };
    //实时改变可视内容区的高
    function contentAuto() {
        iContentHeight = viewHeight() - oHeader.offsetHeight;

        oContent.style.height = iContentHeight + 'px';
        for (var i = 0; i < aLiList.length; i++) {
            aLiList[i].style.height = iContentHeight + 'px';
        }
        oList.style.top = -iNow * iContentHeight + 'px';
    }

    //内容区域居中
    function listContentAuto() {
        var mt = (iContentHeight - 520) / 2;
        for (var i = 0; i < aDivList.length; i++) {
            aDivList[i].style.marginTop = mt + 'px';
        }
    };
    //浏览器分辨率发生改变时，背景图跟着变
    function fnResize() {
        contentAuto();
        listContentAuto();
    };
    function getByClass(oParent, sClass) {
        if (oParent.getElementsByClassName) {
            return oParent.getElementsByClassName(sClass);
        }
        var aElem = oParent.getElementsByTagName('*');
        var arr = [];
        var re = new RegExp('\\b' + sClass + '\\b');
        for (var i = 0; i < aElem.length; i++) {
            if (re.test(aElem.className)) {
                arr.push(aElem[i]);
            }
        }
    };
    //内容区域添加滚轮事件
    function mouseWheel() {
        var bOk = true;
        var timer = null;
        if (oContent.addEventListener) {
            oContent.addEventListener('DOMMouseScroll', function (ev) {
                var ev = ev || event;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    toChange(ev);
                }, 200);
            }, false);
        }
        oContent.onmousewheel = function () {
            var ev = ev || event;
            clearTimeout(timer)
            timer = setTimeout(function () {
                toChange(ev);
            }, 200);
        };

        function toChange(ev) {
            var ev = ev || event;
            //alert(ev.detail);//↓3 ↑-3
            //alert(ev.wheelDelta);//↓-120 ↑120
            if (ev.detail) {
                bOk = ev.detail > 0 ? true : false;
            } else {
                bOk = ev.wheelDelta < 0 ? true : false;
            }

            if (iNow == 0 && !bOk || iNow == aLiList.length - 1 && bOk) {//防止滚到第一页和最后一页继续调用出厂动画
                return;
            }
            prevIndex = iNow;
            if (bOk) {//↓
                if (iNow != aLiList.length - 1) {
                    iNow++
                }
                toMove(iNow);
            } else {//↑
                if (iNow != 0) {
                    iNow--;
                }
                toMove(iNow);
            }
            if (ev.preventDefault) {
                ev.preventDefault();
            } else {
            }
            return false;
        };
    };


    //标题公共样式
    // var timer1 = setInterval(textShadowColor, 1000);

    function textShadowColor() {
        for (var i = 0; i < oH1.length; i++) {
            oH1[i].style.textShadow = '6px 6px 12px rgba(' + ran(0, 256) + ', ' + ran(0, 256) + ', ' + ran(0, 256) + ', ' + ran(.5, .6) + ')';
            oH1[i].style.color = 'rgb(' + ran(0, 256) + ',' + ran(0, 256) + ',' + ran(0, 256) + ')';
        }
    }

    // 主页（home） 开始
    function homeContent() {
        var aLi1 = oHomeContent1.getElementsByTagName('li');//动态获取，创建也可以获取
        var aLi2 = oHomeContent2.getElementsByTagName('li');
        var oldIndex = 0;
        var iNowHome = 0;
        var data = [
            {href: 'demo/html/《灵魂回响》官方网站/index.html', src: 'img/demo_img/111111.png', text: '灵魂回响'},
            {href: 'demo/html/爱奇艺/index.html', src: 'img/demo_img/222222.png', text: '爱奇艺'},
            {href: 'demo/html/京东/index.html', src: 'img/demo_img/333333.png', text: '京东-移动端'},
            {href: 'demo/html/273二手车网/index.html', src: 'img/demo_img/444444.png', text: '273二手车网'},
            {href: 'demo/html/美丽说-首页/index.html', src: 'img/demo_img/555555.png', text: '美丽说-首页'},
            {href: 'demo/html/小米官网-新版/index.html', src: 'img/demo_img/666666.png', text: '小米官网-新版'},
            {href: 'demo/html/聚划算/index.html', src: 'img/demo_img/777777.png', text: '聚划算-移动端'},
        ];
        create();
        function create() {
            for (var i = 0; i < data.length; i++) {
                var oLi1 = document.createElement('li');
                oLi1.innerHTML = '<p class="op"></p>\
                    <h3 class="commonTitle">' + data[i].text + '</h3>\
                    <a href="' + data[i].href + '" target="_blank">\
                    <img src="' + data[i].src + '" alt="图片挂了">\
                    </a>';
                var oLi2 = document.createElement('li');
                if (i == 0) {
                    oLi1.className = 'active';
                    oLi2.className = 'active';
                }
                oHomeContent1.appendChild(oLi1);
                oHomeContent2.appendChild(oLi2);
            }
        };


        for (var i = 0; i < aLi2.length; i++) {
            aLi2[i].index = i;
            aLi2[i].onclick = function () {
                for (var i = 0; i < aLi2.length; i++) {
                    aLi2[i].className = '';
                }
                this.className = 'active';
                if (oldIndex < this.index) {//从左向右(左边隐，右边显)
                    aLi1[oldIndex].className = 'leftHide';
                    aLi1[this.index].className = 'rightShow';
                } else if (oldIndex > this.index) {//从右向左(左边显，右边隐)
                    aLi1[oldIndex].className = 'rightHide';
                    aLi1[this.index].className = 'leftShow';
                }
                oldIndex = this.index;
            };
        }
        oHomeContent.onmousemove = function () {
            clearInterval(timer);
        };
        oHomeContent.onmouseout = function () {
            timer = setInterval(change, 4000);
        }
        clearInterval(timer);
        var timer = setInterval(change, 4000);

        function change() {
            iNowHome++;
            if (iNowHome == aLi2.length) {
                iNowHome = 0;
            }
            for (var i = 0; i < aLi2.length; i++) {
                aLi2[i].className = '';
            }
            aLi2[iNowHome].className = 'active';
            aLi1[oldIndex].className = 'leftHide';
            aLi1[iNowHome].className = 'rightShow';
            oldIndex = iNowHome;
        };
    };
    // 主页（home） 结束

    //第二页（course）开始
    for (var i = 0; i < aBtn.length; i++) {
        aBtn[i].index = i;
        aBtn[i].onclick = function () {
            for (var i = 0; i < aLiMenu.length; i++) {
                //aLiMenu[i].className = '';
                move(aLiMenu[i], {opacity: 0});
                aLiMenu[i].style.zIndex = '0';
            }
            //aLiMenu[this.index].className = 'active';
            move(aLiMenu[this.index], {opacity: 1}/*,{duration:2000}*/);
            aLiMenu[this.index].style.zIndex = '1';
        };
    }
    //第二页（course）结束

//js中demo展示区 (第三页)
    var left = 0;
    var timer = null;
    oWorksContent2.innerHTML += oWorksContent2.innerHTML;
    oWorksContent2.style.width = (aImg[0].offsetWidth + 2) * aImg.length + 'px';
    oPrev.onclick = function () {
        clearInterval(timer);
        prev();
    };
    oNext.onclick = function () {
        clearInterval(timer);
        next();
    };
    oWorksContent2.onmouseover = function () {
        clearInterval(timer);
    };
    oWorksContent2.onmouseout = function () {
        clearInterval(timer);
        timer = setInterval(next, 300);
    };
    function prev() {
        clearInterval(timer);
        timer = setInterval(function () {
            left -= 2;
            if (left <= -oWorksContent2.offsetWidth / 2) {
                left = 0;
            }
            oWorksContent2.style.left = left + 'px';
        }, 30);
    };
    function next() {
        clearInterval(timer);
        timer = setInterval(function () {
            left += 2;
            if (left > 0) {
                left = -oWorksContent2.offsetWidth / 2;
            }
            oWorksContent2.style.left = left + 'px';
        }, 30)
    };
    next();
    //js中demo展示区结束(第三页)

    //第四页（about/skill）开始
    function aboutContent() {
        var aUl = oAboutContent3.getElementsByTagName('ul');
        var aSpan = oAboutContent3.getElementsByTagName('span');
        for (var i = 0; i < aUl.length; i++) {
            change(aUl[i], aSpan[i]);
        }
        function change(ul, span) {
            var w = ul.offsetWidth / 2;
            var h = ul.offsetHeight / 2;
            var src = ul.dataset.src;//H5中获取自定义属性
            for (var i = 0; i < 4; i++) {
                var oLi = document.createElement('li');
                oLi.style.width = w + 'px';
                oLi.style.height = h + 'px';
                var oImg = document.createElement('img');
                oImg.src = src;
                //1、3在left值相同  2、4在left值相同  0 1 0 1
                oImg.style.left = -i % 2 * w + 'px';
                oImg.oldleft = -i % 2 * w;//记录初始值
                //1、2在top值相同  3、4在top值相同   0 0 1 1
                oImg.style.top = -Math.floor(i / 2) * h + 'px';
                oImg.oldtop = -Math.floor(i / 2) * h;//记录初始值
                oLi.appendChild(oImg);
                ul.appendChild(oLi);
            }
            var data = [
                {name: 'top', value: h},
                {name: 'left', value: -w * 2},
                {name: 'left', value: w},
                {name: 'top', value: -h * 2}
            ];
            var aImg = ul.getElementsByTagName('img');
            ul.onmouseover = function () {
                for (var i = 0; i < aImg.length; i++) {
                    aImg[i].style[data[i].name] = data[i].value + 'px';
                }
                //span.style.transform='scale(1)';
                setStyle(span, 'transform', 'scale(1)')
            };
            ul.onmouseout = function () {
                for (var i = 0; i < aImg.length; i++) {
                    aImg[i].style[data[i].name] = aImg[i]['old' + data[i].name] + 'px';
                }
                //span.style.WebkitTransform='scale(1.5)';
                setStyle(span, 'transform', 'scale(1.5)');
            };
        }
    };
    //第四页（about/skill）结束

    //第五页（author）开始
    function authorContent() {
        var aLi = oAuthorContent2.getElementsByTagName('li');
        var oCanvas = null;
        var w = 118;
        var h = 448;
        var timer1 = null;
        var timer2 = null;
        //动态创建ul和li
        create();
        function create() {
            var oUl = document.createElement('ul');
            for (var i = 0; i < 8; i++) {
                var oLi = document.createElement('li');
                oLi.style.backgroundPosition = -i * w + 'px,0';
                oUl.appendChild(oLi);
            }
            oAuthorContent2.appendChild(oUl);
        };
        //绑定li动态创建canvas
        bindList();
        function bindList() {
            oAuthorContent2.onmouseleave = function () {
                removeCanvas();
            }
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].index = i;
                aLi[i].onmouseover = function () {
                    addCanvas();
                    oCanvas.style.left = this.index * w + 'px'
                };
            }
        };
        function addCanvas() {
            if (!oCanvas) {
                oCanvas = document.createElement('canvas');
                oCanvas.id = 'canvasBubble';
                oCanvas.width = w;
                oCanvas.height = h;
                oAuthorContent2.appendChild(oCanvas);
                bindCanvas();
            }
        }

        function removeCanvas() {
            clearInterval(timer1);
            clearInterval(timer2);
            oAuthorContent2.removeChild(oCanvas);
            oCanvas = null;
        };
        function bindCanvas() {
            var ctx = oCanvas.getContext('2d');

            var setArr = [];//存储要绘制的所有图形的数据

            timer1 = setInterval(function () {
                //console.log(setArr.length);
                ctx.clearRect(0, 0, oCanvas.width, oCanvas.height);//清除画布路径
                for (var i = 0; i < setArr.length; i++) {//圆在参数不断变化
                    setArr[i].num += 5;
                    //曲线运动
                    setArr[i].x = setArr[i].startX - Math.sin(setArr[i].num * Math.PI / 180) * setArr[i].step;
                    setArr[i].y = setArr[i].startY - (setArr[i].num * Math.PI / 180) * setArr[i].step;
                    if (setArr[i].y < 50) {
                        setArr.splice(i, 1);//y坐标小于50就删除，提高性能
                    }
                }

                for (var i = 0; i < setArr.length; i++) {//绘制圆
                    ctx.fillStyle = 'rgba(' + setArr[i].c1 + ',' + setArr[i].c2 + ',' + setArr[i].c3 + ',' + setArr[i].c4 + ')';
                    ctx.beginPath();//开启一个新的路径
                    ctx.moveTo(setArr[i].x, setArr[i].y);//起点
                    ctx.arc(setArr[i].x, setArr[i].y, setArr[i].r, 0, 360 * Math.PI / 180, false);
                    ctx.closePath();//自动闭合路径,不加上会出现缺角的效果 加在上色之前
                    ctx.fill();
                }
            }, 16);
            timer2 = setInterval(function () {//开定时器存储圆的信息
                var x = Math.random() * oCanvas.width;
                var y = oCanvas.height - 10;
                var r = Math.random() * 6 + 2;
                //随机颜色
                var c1 = Math.round(Math.random() * 255);
                var c2 = Math.round(Math.random() * 255);
                var c3 = Math.round(Math.random() * 255);
                var c4 = 1;

                var num = 0;//初始角度值
                var step = Math.random() * 20 + 10;//放大系数(速度和波峰波谷)
                //起始值
                var startX = x;
                var startY = y;

                setArr.push({
                    x: x,
                    y: y,
                    r: r,
                    c1: c1,
                    c2: c2,
                    c3: c3,
                    c4: c4,
                    num: num,
                    step: step,
                    startX: x,
                    startY: y
                });
                //console.log(setArr)
            }, 100);
        };
    };

    //第五页（author）结束

    //入场/出场动画 开始

    var cjAnimate = [
        {
            inAn: function () {
                oHomeContent1.style.opacity = 1;
                oHomeContent2.style.opacity = 1;
                setStyle(oHomeContent1, 'transform', 'translate(0,0)');
                setStyle(oHomeContent2, 'transform', 'translate(0,0)');
            },
            outAn: function () {
                oHomeContent1.style.opacity = 0;
                oHomeContent2.style.opacity = 0;
                setStyle(oHomeContent1, 'transform', 'translate(0,-150px)');
                setStyle(oHomeContent2, 'transform', 'translate(0,100px)');
            }
        },
        {
            inAn: function () {
                var oPlane1 = getByClass(oCourseContent, 'plane1')[0];
                var oPlane2 = getByClass(oCourseContent, 'plane2')[0];
                var oPlane3 = getByClass(oCourseContent, 'plane3')[0];
                setStyle(oPlane1, 'transform', 'translate(0,0)');
                setStyle(oPlane2, 'transform', 'translate(0,0)');
                setStyle(oPlane3, 'transform', 'translate(0,0)');
            },
            outAn: function () {
                var oPlane1 = getByClass(oCourseContent, 'plane1')[0];
                var oPlane2 = getByClass(oCourseContent, 'plane2')[0];
                var oPlane3 = getByClass(oCourseContent, 'plane3')[0];
                setStyle(oPlane1, 'transform', 'translate(-200px,-200px)');
                setStyle(oPlane2, 'transform', 'translate(-200px,200px)');
                setStyle(oPlane3, 'transform', 'translate(200px,-200px)');
            }
        },
        {
            inAn: function () {
                var oPencel1 = getByClass(oWorksContent, 'pencel1')[0];
                var oPencel2 = getByClass(oWorksContent, 'pencel2')[0];
                var oPencel3 = getByClass(oWorksContent, 'pencel3')[0];
                setStyle(oPencel1, 'transform', 'translate(0,0)');
                setStyle(oPencel2, 'transform', 'translate(0,0)');
                setStyle(oPencel3, 'transform', 'translate(0,0)');
            },
            outAn: function () {
                var oPencel1 = getByClass(oWorksContent, 'pencel1')[0];
                var oPencel2 = getByClass(oWorksContent, 'pencel2')[0];
                var oPencel3 = getByClass(oWorksContent, 'pencel3')[0];
                setStyle(oPencel1, 'transform', 'translate(0,-200px)');
                setStyle(oPencel2, 'transform', 'translate(0,200px)');
                setStyle(oPencel3, 'transform', 'translate(0,200px)');
            }
        },
        {
            inAn: function () {
                var aAboutImg = getByClass(oAboutContent, 'aboutImg');
                setStyle(aAboutImg[0], 'transform', 'rotate(0)');
                setStyle(aAboutImg[1], 'transform', 'rotate(0)');
            },
            outAn: function () {
                var aAboutImg = getByClass(oAboutContent, 'aboutImg');
                setStyle(aAboutImg[0], 'transform', 'rotate(45deg)');
                setStyle(aAboutImg[1], 'transform', 'rotate(-45deg)');
            }
        },
        {
            inAn: function () {
                oAuthorContent1.style.opacity = 1;
                setStyle(oAuthorContent1, 'transform', 'translate(0,0)');
                setStyle(oAuthorContent2, 'transform', 'translate(0,0)');
            },
            outAn: function () {
                oAuthorContent1.style.opacity = 0;
                setStyle(oAuthorContent1, 'transform', 'translate(-200px,0)');
                setStyle(oAuthorContent2, 'transform', 'translate(0,800px)');
            }
        }
    ];
    //cjAnimate[4].outAn();
    //setTimeout(function () {
    //    cjAnimate[0].inAn();
    //}, 1000);

    for (var i = 0; i < cjAnimate.length; i++) {
        cjAnimate[i].outAn();
    }
    /*setTimeout(function () {
     cjAnimate[0].inAn();
     }, 1000);
     */
    //入场/出场动画 结束

    //音乐
    function showMusic() {
        var onoff = true;
        oMusic.onclick = function () {
            if (onoff) {
                this.style.background = 'url(img/musicon.gif)';
                oAudio1.play();
            } else {
                this.style.background = 'url(img/musicoff.gif)';
                oAudio1.pause();
            }
            onoff = !onoff;
        };
    };

    function ran(n, m) {
        return Math.round(Math.random() * (m - n) + n);
    };
    function $(id) {
        return document.getElementById(id);
    }

    function setC3Style(obj, sName, sValue) {
        var str = sName.charAt(0).toUpperCase() + sName.substring(1);
        obj.style['Webkit' + str] = sValue;
        obj.style['Moz' + str] = sValue;
        obj.style['ms' + str] = sValue;
        obj.style['O' + str] = sValue;
        obj.style[sName] = sValue;
    }

    function setStyle(obj, attr, value) {
        obj.style[attr] = value;
        obj.style['webkit' + attr.substring(0, 1).toUpperCase() + attr.substring(1)] = value;
    };
};

