"use strict";
SagaEngine.StateContext = function(beginState) {
    this.state = null;

    if (beginState != null) {
        this.state = beginState;
        this.state.enter();
    };
};

SagaEngine.StateContext.prototype = {
    changeState: function(newState) {
    if (this.state != null) {
        this.state.exit();
    };
        this.state = newState;
        this.state.enter();
    },

    update: function(delta) {
        this.state.checkForStateChange(this);
        this.state.update(delta);
    },

    draw: function(context, delta) {
        this.state.draw(context, delta);
    }
};