"use strict";
SagaEngine.State = function() { };

SagaEngine.State.prototype = {
    enter: function () {},
    exit: function() {},
    update: function(delta) {},
    draw: function(context, camera) {},
    checkForStateChange: function(context) {}
};