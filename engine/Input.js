"use strict";
SagaEngine.keys = {
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 80,
    left: 37,
    up: 38,
    right: 39,
    down: 40
};

SagaEngine.KeyboardInput = {
    pressed: new Array(),
    
    initialize: function() {
        var self = this;
        document.onkeydown = function(event) { self.keyDownEvent(event); }
        document.onkeyup = function(event) { self.keyUpEvent(event); }
    },

    isKeyDown: function(key) {
        if (this.pressed[key] != null)
            return this.pressed[key];
        return false;
    },

    keyDownEvent: function(event) {
        this.pressed[event.keyCode] = true;
        this.preventScrolling(event);
    },

    keyUpEvent: function(event) {
        this.pressed[event.keyCode] = false;
        this.preventScrolling(event);
    },

    // prevents scrolling in the browser window
    preventScrolling: function(event) {
        if (event.keyCode >= SagaEngine.keys.left && 
            event.keyCode <= SagaEngine.keys.down){
            event.preventDefault();
        }
    }
};

SagaEngine.MouseInput = {
  pressed: new Array(),
  xpos: 0,
  ypos: 0,
  xStart: 0,
  yStart: 0,
  
  initialize: function() {
    var self = this;
    document.onmousedown = function(event) { self.mouseDownEvent(event); }
    document.onmouseup = function(event) { self.mouseUpEvent(event); }
    document.onmousemove = function(event) { self.mouseMoveEvent(event); }
  },
  
  isMouseDown: function() {
    return this.pressed.mouse;
  },
  
  mouseDownEvent: function(event) {
    this.pressed['mouse'] = true;
    this.xpos = 0;
    this.ypos = 0;
    this.xStart = -event.pageX;
    this.yStart = -event.pageY;
  },
  
  mouseUpEvent: function(event) {
    this.pressed['mouse'] = false;
  },
  
  mouseMoveEvent: function(event) {
    if (this.pressed.mouse) { 
      this.xpos = event.pageX + this.xStart;
      this.ypos = event.pageY + this.yStart;
    }
  }
}
