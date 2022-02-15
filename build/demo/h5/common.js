/*
* @Author: Administrator
* @Date:   2016-10-12 12:39:47
* @Last Modified by:   Administrator
* @Last Modified time: 2016-10-13 00:11:28
*/

'use strict';
var {
	PI,
	random,
	atan2
}=Math;
function rnd(n,m){
	return parseInt(random()*(m-n)+n);
};
function d2a(d){//角度转弧度
	return d/180*PI;
};
function a2d(a){//弧度转角度
	return a*180/PI;
};
function clear(){//清画布
	ctx.clearRect(0, 0, canvas.width, canvas.height)
};