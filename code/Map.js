"use strict";
Mana.Map = function() {
    this.name = null;
    this.tiles = null;
    this.tileSize = null;
    this.width = null;
    this.height = null;
};

Mana.Map.prototype = {
    initialize: function(name, width, height, tileSize) {
        this.name = name;
        this.tileSize = tileSize;
        this.width = width;
        this.height = height;
        this.tiles = new Array(width);
        for (var i = 0; i < width; i++) {
			this.tiles[i] = new Array(height);
        }
    }
};
