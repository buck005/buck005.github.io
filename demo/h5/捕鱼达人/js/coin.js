class Coin{
	constructor(type) {
		this.type = type
		this.x = 0;
		this.y = 0;
		this.current = 0;

		this.move();
	}

	draw(ctx){
		ctx.save()
		ctx.translate(this.x,this.y);

		ctx.drawImage(imageData[`coinAni${this.type}`],
			0,this.current*60,60,60,
			-30,-30,60,60
		)
		ctx.restore()
	}

	move(){
		setInterval(() => {
			this.current ++;

			if( this.current == 10 ){
				this.current = 0;
			}
		},50)

		setTimeout(() => {

			new Audio('statics/FishingMaster/sound/coin.wav').play()
			setInterval(() => {

				var speed = 10

				this.x += -speed;
				this.y += ((canvas.height - this.y)/this.x)*speed;	
			},16)				
		},300)
	}
}