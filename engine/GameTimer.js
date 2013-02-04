"use strict";
SagaEngine.GameTimer = function() {
    this.idealTimePerFrame = null;
    this.lastTime = 0;
    this.intervalFunc = null;
    this.updateObject = null;
    this.leftoverTime = 0;
};

SagaEngine.GameTimer.prototype = {
    initialize: function(context, tps) {
        this.idealTimePerFrame = tps;
        this.updateObject = context;
    },

    start: function() {
        var self = this;
        this.lastTime = Date.now();
        this.intervalFunc = setInterval(
            function() { self.tick() }, 
			this.idealTimePerFrame 
		);
    },

    stop: function() {
        clearInterval(this.intervalFunc);
    },
    
    tick: function() {
        if (this.updateObject === null) 
            return;
            
        var timeNow = Date.now();
        var delta = (timeNow - this.lastTime) + this.leftoverTime;
        var catchUpCount = Math.floor(delta / this.idealTimePerFrame);
        
        for (var i = 0; i < catchUpCount; i++) {
            this.updateObject.update(timeNow);
        }
    
        this.leftoverTime = delta - (catchUpCount * this.idealTimePerFrame);
        this.lastTime = timeNow;
    }
};