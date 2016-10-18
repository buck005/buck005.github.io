var {
	PI,
	random,
	atan2,
	sqrt,
	pow,
	sin,
	cos
} = Math;

function rnd(n,m){
	return parseInt(random()*(m-n)+n)
}

function d2a(d){
	return d/180*PI;
}

function a2d(a){
	return a*180/PI;
}

function clear(ctx){
	ctx.clearRect(0,0,canvas.width,canvas.height)
}

