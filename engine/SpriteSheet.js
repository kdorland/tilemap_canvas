"use strict";
SagaEngine.SpriteSheet = {
    images: {},
    width: {}, 
    height: {},
    picSize: {},
	
    addSheet: function(name, img, picSize, width, height) {
        this.images[name] = img;
        this.width[name] = width;
        this.height[name] = height;
        this.picSize[name] = picSize;
    }
};