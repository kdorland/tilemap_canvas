"use strict";
var SagaEngine = {};

SagaEngine.Core = function() {
    this.timer = null;
    this.stateContext = null;
    this.gameCanvas = null;
    this.timeNow = null;
    this.tick = null;
};

SagaEngine.Core.prototype = {
    initialize: function(beginState) {
        SagaEngine.Logging.name = "Mana";
        SagaEngine.Logging.initialize();
        SagaEngine.Logging.trace("Core.initialize: Start");
        
        this.tick = 1000/60;
        this.gameCanvas = new SagaEngine.GameCanvas();    
        this.gameCanvas.initialize("canvas");
        this.timer = new SagaEngine.GameTimer();
        this.timer.initialize(this, this.tick);
        SagaEngine.KeyboardInput.initialize();
        SagaEngine.MouseInput.initialize();
        this.stateContext = new SagaEngine.StateContext(beginState);   
        this.timer.start();
        
        SagaEngine.Logging.trace("Core.initialize: End");
    },
  
    update: function(timeNow) {
        this.timeNow = timeNow;
        this.stateContext.update(timeNow);
        this.render();
    },
  
    render: function() {
        this.gameCanvas.clear();
        this.stateContext.draw(this.gameCanvas.canvas, this.timeNow);
    }
};