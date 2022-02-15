
var CANNON_SIZE=[
	null,
	{w: 74, h: 74},
	{w: 74, h: 76},
	{w: 74, h: 76},
	{w: 74, h: 83},
	{w: 74, h: 85},
	{w: 74, h: 90},
	{w: 74, h: 94}
];

class Cannon{
	constructor(type){
		this.x = 431;
		this.y = 570;

		this.current = 0;

		this.rotate = 0;
		this.type = type;
		this.timer = null;
	}

	draw(ctx){
		var {
			w,h
		} = CANNON_SIZE[this.type];

		var {
			x,y,current
		} = this;

		ctx.save()

		ctx.translate(x, y);
		ctx.rotate(d2a(this.rotate))
		ctx.drawImage(imageData['cannon'+this.type],
			0,current*h,w,h,
			-w/2,-h/2,w,h
		)

		ctx.restore()
	}

	emit(){
		clearInterval(this.timer);
		
		this.timer = setInterval(() => {
			this.current++

			if( this.current == 5 ){
				this.current = 0;
				clearInterval(this.timer);
			}
		},30)

		new Audio('statics/FishingMaster/sound/cannon.mp3').play()
	}
}
