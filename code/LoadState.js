"use strict";
Mana.LoadState = function() {
    this.images = [];
    this.sprites = [];
    this.imagesLoaded = false;
    this.screenColor = 0;
    this.colorDirection = 1;
    this.imageIndex = 0;
}

Mana.LoadState.prototype = new SagaEngine.State();

Mana.LoadState.prototype.enter = function() {
    var i, j;
    jQuery.ajaxSetup({async:false});
    var jsonGraphics = jQuery.get('prop/TileGraphics.json');
    if (!jsonGraphics || jsonGraphics.responseText === "")
        throw "Mana.TileGraphics.Exception: Cannot load.";
    else
        jsonGraphics = JSON.parse(jsonGraphics.responseText);
                
    // Init map and camera
    Mana.map = new Mana.Map();
    Mana.map.initialize("MainMap", 300, 300, 32);
    Mana.camera = new SagaEngine.Camera();
    Mana.camera.initialize();    
    Mana.camera.x = 0;//150*32;
    Mana.camera.y = 0;//150*32;
    
    // Parse images in TileGraphics.json
    for (i in jsonGraphics.images) {
        var jsg = jsonGraphics.images[i];        
        SagaEngine.ResourceHandler.addImage(jsg.sheet, jsg.src);
        
        var img = SagaEngine.ResourceHandler.images[jsg.sheet];
        SagaEngine.SpriteSheet.addSheet(
            jsg.sheet, img, jsg.tileSize, jsg.width, jsg.height);
    }
    
    // Parse namedTiles in TileGraphics.json
    for (i in jsonGraphics.namedSprites) {
        var s = jsonGraphics.namedSprites[i];
        this.sprites[s.name] = new SagaEngine.AnimatedSprite();
        this.sprites[s.name].initialize(s.sheet, s.index, s.duration, s.loop);
    }
    
    // Parse indexedTiles in TileGraphics.json
    for (i in jsonGraphics.indexedSprites) {
        var s = jsonGraphics.indexedSprites[i];
        for (j = 1; j <= s.total; j++) {
            this.sprites[s.name+j] = new SagaEngine.AnimatedSprite();
            this.sprites[s.name+j].initialize(s.sheet, [j], s.duration, s.loop);
            this.sprites.type = "water";
        }
    }

    // Generate map
    GenerateMap.testMap(this.sprites, Mana.map);
    /*
    //DEBUG
    var tile = new Mana.Tile();
    var sprite = this.sprites["water14"];
    tile.initialize(sprite.clone(Date.now()));
    Mana.map.tiles[0][0] = tile;*/
};

Mana.LoadState.prototype.exit = function() {
    delete this.Images;
};

Mana.LoadState.prototype.update = function(delta) {
    if (!this.imagesLoaded) {
        var i = 0;
    
        // Only proceed if resources has been fully loaded
        this.imagesLoaded = true;
        for (i = 0; i < this.images.length; i++) {
            if (SagaEngine.ResourceHandler.images[this.images[i].name].complete !== true) {
                this.imagesLoaded = false;
                break;
            }
        }
      
        this.screenColor += this.colorDirection * 255 * delta;
        if (this.screenColor > 255) {
            this.screenColor = 255;
            this.colorDirection = -1;
        } else if (this.screenColor < 0) {
            this.screenColor = 0;
            this.colorDirection = 1;
        }
    }
};

Mana.LoadState.prototype.draw = function(buffer) {
    var context = buffer.getContext("2d");
    var height = buffer.height;
    var width = buffer.width;
      
    if (!this.imagesLoaded) {
        var color = parseInt(this.ScreenColor, 10);
        context.fillStyle = "rgb(" + color + "," + color + "," + color + ")";
        context.fillRect(0, 0, width, height);
    } else {
        context.fillStyle = "rgb(0, 0, 0)";
        context.fillRect(0, 0, width, height);
    }
};

Mana.LoadState.prototype.checkForStateChange = function(context) {
    if (this.imagesLoaded) {
        context.changeState(new Mana.TestState());
    }
};
