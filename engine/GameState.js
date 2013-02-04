ManaEngine.GameState = function() { };

ManaEngine.GameState.prototype = {
    enter: function () {},
    exit: function() {},
    update: function(delta) {},
    draw: function(context, camera) {},
    checkForStateChange: function(context) {}
};