function getStyle(obj,name){
	return (obj.currentStyle||getComputedStyle(obj,false))[name];
}

function move(obj,json,options){
	var options=options||{};
	options.duration=options.duration||700;
	options.easing=options.easing||'ease-out';
	
	
	var start={};
	var dis={};
	
	for(var name in json){
		//alert(getStyle(obj,name));//NaN
		//alert(obj.offsetLeft);//0	
		start[name]=parseInt(getStyle(obj,name));
		if(isNaN(start[name])){
			switch(name){
				case 'width':
					start[name]=obj.offsetWidth;	
					break;
				case 'height':
					start[name]=obj.offsetHeight;	
					break;
				case 'opacity':
					start[name]=1;	
					break;
				case 'left':
					start[name]=0;	
					break;
				case 'top':
					start[name]=0;	
					break;
				//marginLeft/top...	padding
			}	
		}
		
		dis[name]=json[name]-start[name];
		//alert(dis[name]);	
	}
	
	var count=Math.floor(options.duration/30);
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				case 'linear':
					var a=n/count
					var cur=start[name]+a*dis[name];
					break;
				case 'ease-in':
					var a=n/count
					var cur=start[name]+(a*a*a)*dis[name];
					break;
				case 'ease-out':
					var a=1-n/count
					var cur=start[name]+(1-a*a*a)*dis[name]
					break;
			}
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')'
			}else{
				obj.style[name]=cur+'px';
			}	
		}
		if(n==count){
			clearInterval(obj.timer);
			options.complete&&options.complete();	
		}
			
	},30)
}











