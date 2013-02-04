"use strict";
SagaEngine.GameCanvas = function() {
    this.canvas = null;
};

SagaEngine.GameCanvas.prototype = {
    initialize: function(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1100;
        this.canvas.height = 600;
    },
    
    clear: function() {
        var context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};