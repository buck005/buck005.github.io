/*
* @Author: Administrator
* @Date:   2016-08-17 14:20:06
* @Last Modified by:   Administrator
* @Last Modified time: 2016-08-20 14:43:27
*/

'use strict';
	function getStyle(obj,name){//获取非行间样式
		return (obj.currentStyle||getComputedStyle(obj,false))[name];
	};

	function move(obj,json,option){//obj对象，json样式，iTarget目标点，duration时间 fn回调函数
		//option也是json
		var option=option||{};
		option.duration=option.duration||700;//如果没有传时间，默认700
		option.easing=option.easing||'ease-out';//
		option.fn = option.fn || null;

		var start={};
		var dis={};

		for(var name in json){
			start[name]=parseInt(getStyle(obj,name));
			dis[name]=json[name]-start[name];
		}
		//var start=obj.offsetLeft;//起始点
		//var start=parseInt(getStyle(obj,name));

		//var end=iTarget;//目标点
		//var dis=end-start;//总距离
		//var time=duration;//总时间
		var count=Math.floor(option.duration/30);//总次数 总步数
		//var step=dis/count;//一次/步走多远

		var n=0;//现在走的次/步数
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			//obj.style[name]=start+dis/count*n+'px';
			for(var name in json){
				//var cur=start[name]+dis[name]/count*n;//匀速
				/*var a=n/count;
				var cur=start[name]+(a*a*a)*dis[name];//加速*/
				/*var a=1-n/count;
				var cur=start[name]+(1-a*a*a)*dis[name];//减速*/

				switch (option.easing){
					case 'linear'://匀速
					var a=n/count;
					var cur=start[name]+dis[name]*a;//匀速
					break;
					case 'ease-in'://加速
					var a=n/count;
					var cur=start[name]+(a*a*a)*dis[name];//加速
					break;
					case 'ease-out':
					var a=1-n/count;//减速
					var cur=start[name]+(1-a*a*a)*dis[name];//减速
					break;
				}

				if(name=='opacity'){
					obj.style.opacity=cur;
					obj.style.filter='alpha(opacity:'+cur*100+')';
				}else{
					obj.style[name]=cur+'px';
				}
			}

			if(n==count){
				clearInterval(obj.timer);
				option.fn&&option.fn();
			}
		},30);
	};
