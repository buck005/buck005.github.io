function loadResources( arr, callback ){
	var count = 0;

	arr.forEach(function( imageSrc, index ){
		var oImage = new Image();
		oImage.src = `statics/FishingMaster/img/${imageSrc}.png`;

		oImage.onload = function(){
			count++;

			imageData[imageSrc] = oImage;

			if( count == arr.length ){
				callback && callback();						
			}
		}
	})
}