class DieFish{
	constructor(type) {
		this.type = type;
		this.x = 0;
		this.y = 0;
		this.rotate = 0;
		this.current = 4;

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
			if( this.current == 8 ){
				this.current = 4;
			}

		},100)
	}
}
