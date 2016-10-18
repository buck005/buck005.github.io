
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var imageData = {};
var bulletArray = [];
var fishArray = [];
var dieFishArray = [];
var netArray = [];
var coinArray = [];

var outDis = 150;
var rule = 0.05;

loadResources(resources,function(){

	var cannon = new Cannon(1);

	setInterval(function(){
		clear(ctx);

		// 生成鱼
		if( Math.random() < rule){
			var fish = new Fish(rnd(1,6));

			var leftSide = Math.random() > 0.5;

			fish.x = leftSide ? -outDis : canvas.width + outDis ;
			fish.y = rnd(100,500);
			fish.rotate = leftSide ? rnd(-45,45) : rnd(135,225)

			fishArray.push(fish);
		}

		// 画鱼
		fishArray.forEach(function(fish,index){
			if(
				fish.x < -outDis ||
				fish.x > canvas.width + outDis || 
				fish.y < -outDis ||
				fish.y > canvas.height + outDis
			){
				fishArray.splice(index,1)
			} else {
				fish.draw(ctx);
			}
		})

		// 画死鱼
		dieFishArray.forEach(function(dieFish,index){
			dieFish.draw(ctx);
		})

		// 画网
		netArray.forEach(function(net){
			net.draw(ctx);
		})

		// 画金币
		coinArray.forEach(function(coin,index){
			if(
				coin.x < -outDis
			){
				coinArray.splice(index,1)
			} else {
				coin.draw(ctx);
			}
		})

		// 检测是否击中
		fishArray.forEach(function(fish,fishIndex){
			bulletArray.forEach(function(bullet,bulletIndex){

				// 击中
				if( fish.isBulletIn(bullet.x,bullet.y) ){

					// 删鱼 删子弹
					fishArray.splice(fishIndex,1);
					bulletArray.splice(bulletIndex,1);

					// 生成死鱼
					var dieFish = new DieFish(fish.type)
						dieFish.x = fish.x;
						dieFish.y = fish.y;
						dieFish.rotate = fish.rotate;

					dieFishArray.push(dieFish)

					// 生成网
					var net = new Net(cannon.type);
						net.x = fish.x;
						net.y = fish.y;

					netArray.push(net);

					setTimeout(function(){
						dieFishArray.shift();
						netArray.shift();

						// 生成金币

						var coin = new Coin(fish.type > 3?2:1);
						coin.x = fish.x;
						coin.y = fish.y;

						coinArray.push(coin);

					},500)
				}

			})
		})

		// 画炮台
		ctx.drawImage(imageData.bottom,
			0,0,765,70,
			0,532,765,70
		)

		bulletArray.forEach(function(bullet,index){

			// 不在画面中
			if(
				bullet.x < -20 ||
				bullet.x > canvas.width + 20 || 
				bullet.y < -20 ||
				bullet.y > canvas.height + 20
			){
				bulletArray.splice(index,1)
			} else {
				bullet.draw(ctx);
			}
		})

		cannon.draw(ctx);
	},16)

	canvas.onclick = function(ev){
		var {
			clientX,
			clientY
		} = ev;

		var disX = clientX - cannon.x;
		var disY = cannon.y - clientY ;

		cannon.rotate = a2d(atan2(disX,disY));
		cannon.emit();

		var bullet = new Bullet(cannon.type);
			bullet.x = cannon.x;
			bullet.y = cannon.y;
			bullet.rotate = cannon.rotate;

		bulletArray.push(bullet);
	}
})
