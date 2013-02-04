"use strict";
SagaEngine.Camera = function() {
	this.x = null;
	this.y = null;
    this.xDrag = null;
    this.yDrag = null;
};

SagaEngine.Camera.prototype = {
    initialize: function() {
        this.x = 0;
        this.y = 0;
        this.xDrag = 0;
        this.yDrag = 0;
    },
    
    mergeDrag: function () {
        this.x = this.x - this.xDrag;
        this.y = this.y - this.yDrag;
        this.xDrag = 0;
        this.yDrag = 0;
    },
    
    getX: function() {
        return this.x - this.xDrag; 
    },
    
    getY: function() {
        return this.y - this.yDrag; 
    },
    
    setX: function(x) {
        this.x = x;
    },
    
    setY: function(y) {
        this.y = y;
    },  
    
}