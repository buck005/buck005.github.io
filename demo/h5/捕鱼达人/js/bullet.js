var BULLET_SIZE=[
	null,
	{x: 86, y: 0, w: 24, h: 26},
	{x: 62, y: 0, w: 25, h: 29},
	{x: 30, y: 0, w: 31, h: 35},
	{x: 32, y: 35, w: 27, h: 31},
	{x: 30, y: 82, w: 29, h: 33},
	{x: 0, y: 82, w: 30, h: 34},
	{x: 0, y: 0, w: 30, h: 44}
];

class Bullet{
	constructor(type) {
		this.type = type;
		this.x = 0;
		this.y = 0;

		this.rotate = 0;
		this.speed = 5;

		this.timer = null;

		this.move();
	}

	draw(ctx){
		var {
			x,y,w,h
		} = BULLET_SIZE[this.type]

		ctx.save()

		ctx.translate(this.x,this.y)
		ctx.rotate(d2a(this.rotate))
		ctx.drawImage(imageData.bullet,
			x,y,w,h,
			-w/2,-h/2,w,h
		);

		ctx.restore();
	}

	move(){
		this.timer = setInterval(() => {

			var {
				rotate,speed
			} = this;

			this.x += speed*sin(d2a(rotate));

			this.y -= speed*cos(d2a(rotate));

			if(
				this.x < -20 ||
				this.x > canvas.width + 20 || 
				this.y < -20 ||
				this.y > canvas.height + 20
			){
				clearInterval(this.timer);
			}

		},20)
	}
}