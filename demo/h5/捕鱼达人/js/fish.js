
var FISH_SIZE=[
	null,
	{w: 55, h: 37, collR: 17},
	{w: 78, h: 64, collR: 24},
	{w: 72, h: 56, collR: 20},
	{w: 77, h: 59, collR: 22},
	{w: 107, h: 122, collR: 40}
];

class Fish{
	constructor(type){
		this.type = type;
		this.x = 0;
		this.y = 0;
		this.rotate = 0;
		this.speed = 2;
		this.current = 0;

		this.collR = FISH_SIZE[this.type].collR;

		this.move();
	}

	draw(ctx){
		var {
			w,h
		} = FISH_SIZE[this.type];

		var {
			x,y,current
		} = this;

		ctx.save()

		// ctx.translate(x + w/2,y + h/2);
		// 为和子弹布局x,y保持一致，改为中心位置
		ctx.translate( x , y );
		ctx.rotate(d2a(this.rotate))

		// 右侧鱼需要转一下，阴影在下
		if( this.rotate > 100 ){
			ctx.scale(1,-1);
		}

		ctx.drawImage(imageData['fish'+this.type],
			0,current*h,w,h,
			-w/2,-h/2,w,h
		)

		ctx.restore()
	}

	move(){
		setInterval(() => {
			this.current++
			if( this.current == 4 ){
				this.current = 0;
			}
		},100)

		setInterval(() => {
			var speedX = this.speed * cos(d2a(this.rotate))
			var speedY = this.speed * sin(d2a(this.rotate))

			this.x += speedX
			this.y += speedY
		},30)
	}

	isBulletIn(x,y){
		var dis = sqrt(pow(x - this.x,2)+pow(y - this.y,2));

		return dis < this.collR
	}
}