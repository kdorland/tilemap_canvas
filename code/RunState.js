"use strict";
Mana.TestState = function() {
	this.lastUpdateTime = null;
    this.leftoverMove = null;
}

Mana.TestState.prototype = new SagaEngine.State();

Mana.TestState.prototype.enter = function() {
	// Initialize update time
	this.lastUpdateTime = Date.now();
};

Mana.TestState.prototype.exit = function() {

};

Mana.TestState.prototype.update = function(timeNow) {
	var delta = timeNow - this.lastUpdateTime;
    
    var realMove = (delta / 1000) * 48 + this.leftoverMove;
    var mov = Math.floor(realMove);
    this.leftoverMove = realMove % 1;
    
    if (SagaEngine.KeyboardInput.isKeyDown(SagaEngine.keys.A) ||
        SagaEngine.KeyboardInput.isKeyDown(SagaEngine.keys.left)) {
        Mana.camera.x = Mana.camera.x + mov;
    }
    
    if (SagaEngine.KeyboardInput.isKeyDown(SagaEngine.keys.D) ||
        SagaEngine.KeyboardInput.isKeyDown(SagaEngine.keys.right)) {
        Mana.camera.x = Mana.camera.x - mov; 
    }
    
    if (SagaEngine.KeyboardInput.isKeyDown(SagaEngine.keys.W) ||
        SagaEngine.KeyboardInput.isKeyDown(SagaEngine.keys.up)) {
        Mana.camera.y = Mana.camera.y + mov;
    }
    
    if (SagaEngine.KeyboardInput.isKeyDown(SagaEngine.keys.S) ||
        SagaEngine.KeyboardInput.isKeyDown(SagaEngine.keys.down)) {
        Mana.camera.y = Mana.camera.y - mov;
    }
    
    if (SagaEngine.MouseInput.isMouseDown()) {
        Mana.camera.xDrag = SagaEngine.MouseInput.xpos;
        Mana.camera.yDrag = SagaEngine.MouseInput.ypos;
    } else {
        Mana.camera.mergeDrag();
    }
	
	this.lastUpdateTime = timeNow;
};

Mana.TestState.prototype.draw = function(buffer, timeNow) {
    var context = buffer.getContext("2d");
    var camera = Mana.camera;
    var tileSize = Mana.map.tileSize;
    var sizeX = Mana.map.width;
    var sizeY = Mana.map.height;
    var canvasW = buffer.width;
    var canvasH = buffer.height;
    var mapPixelsX = sizeX * tileSize;
    var mapPixelsY = sizeY * tileSize;
    
    if (camera.getX() < 0) camera.setX(0); 
    if (camera.getY() < 0) camera.setY(0);
    
    if (camera.getX() > mapPixelsX - canvasW) camera.setX(mapPixelsX - canvasW);
    if (camera.getY() > mapPixelsY - canvasH) camera.setY(mapPixelsY - canvasH);    

    var xBeginTile = Math.floor(camera.getX() / tileSize);
    var yBeginTile = Math.floor(camera.getY() / tileSize);
    var xEndTile = Math.floor((camera.getX() + canvasW) / tileSize) + 1;
    var yEndTile = Math.floor((camera.getY() + canvasH) / tileSize) + 1;
    
    if (xBeginTile < 0) xBeginTile = 0;
    if (yBeginTile < 0) yBeginTile = 0;
    if (xEndTile > sizeX) xEndTile = sizeX;
    if (yEndTile > sizeY) yEndTile = sizeY;
    
    var tile = null;
    var drawX = null;
    var drawY = null;
    for (var y = yBeginTile; y < yEndTile; y++) {
        for (var x = xBeginTile; x < xEndTile; x++) {        
            tile = Mana.map.tiles[x][y];
            drawX = x*tileSize - camera.getX();
            drawY = y*tileSize - camera.getY();
            tile.sprite.update(timeNow);
            tile.sprite.draw(context, drawX, drawY);
        }
    }
};

Mana.TestState.prototype.checkForStateChange = function(context) {

};
