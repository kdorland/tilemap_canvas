"use strict";
SagaEngine.AnimatedSprite = function() { 
    this.name = null;
    this.type = null;
    this.index = null;
    this.indexList = null;
    this.delay = null;
    this.looping = null;
    this.lastUpdateTime = null;
    this.leftOverTime = null;
};

SagaEngine.AnimatedSprite.prototype = {
    initialize: function(name, indexList, delay, looping) {
        this.name = name;
        this.indexList = indexList;
        this.delay = delay,
        this.looping = looping;
        this.index = 0;
        this.elapsed = 0;
        this.leftOverTime = 0;
    },
    
    update: function(timeNow) {
        if (this.delay == 0) return;
        if (this.lastUpdateTime === null)
            this.lastUpdateTime = timeNow;
        var elapsed = timeNow - this.lastUpdateTime + this.leftOverTime;
        while (elapsed >= this.delay) {
            elapsed = elapsed - this.delay;
            this.index++;
            this.lastUpdateTime = timeNow;
            this.leftOverTime = elapsed;
            
            if (this.index >= this.indexList.length)
                this.index = 0;
        }
    },
    
    draw: function(context, x, y) {
        if (x == 0 && y == 0)
            null;
    
        var index = this.indexList[this.index];
		var picSize = SagaEngine.SpriteSheet.picSize[this.name];
        var width = SagaEngine.SpriteSheet.width[this.name];
        var srcX = Math.floor((index-1) % width) * picSize;
        var srcY = Math.floor((index-1) / width) * picSize;
        if (srcX < 0) srcX = 0;
        if (srcY < 0) srcY = 0;
		
        // drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
        // sx, sy, sw, sh = src clipping and size
        // dx, dy  dw, dh = destination
        var sheet = SagaEngine.SpriteSheet.images[this.name];
        context.drawImage(sheet, srcX, srcY, picSize, picSize, 
                          x, y, picSize, picSize);
    },
    
    clone: function(lut) {
        var sprite = new SagaEngine.AnimatedSprite();
        if (lut) sprite.lastUpdateTime = lut;
        sprite.name = this.name;
        sprite.indexList = this.indexList
        sprite.delay = this.delay,
        sprite.looping = this.looping;
        sprite.index = this.index;
        sprite.elapsed = 0;
        sprite.leftOverTime = 0;
        return sprite;
    }
};