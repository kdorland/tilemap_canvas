/*SagaEngine.Sprite = function() { 
    this.name = null;
    this.index = null;
};

SagaEngine.Sprite.prototype = {
    initialize: function(name, index) {
        this.name = name;
        this.index = index;
    },
    update: function(delta) {},
    draw: function(context, x, y) {
        return;
		var picSize = SagaEngine.SpriteSheet.picSize[this.name];
        var width = SagaEngine.SpriteSheet.width[this.name];
        var srcX = Math.floor((this.index-1) % width) * picSize;
        var srcY = Math.floor((this.index-1) / width) * picSize;
        if (srcX < 0) srcX = 0;
        if (srcY < 0) srcY = 0;
		
        // drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
        // sx, sy, sw, sh = src clipping and size
        // dx, dy = dest draw coordinates
        // dw, dh = dest size
        var sheet = SagaEngine.SpriteSheet.images[this.name];
        context.drawImage(sheet, srcX, srcY, 
			picSize, picSize, x, y, picSize, picSize);
    },
    clone: function() {
        var sprite = new SagaEngine.Sprite();
        sprite.name = this.name;
        sprite.index  = this.index;
        return sprite;
    }
};*/