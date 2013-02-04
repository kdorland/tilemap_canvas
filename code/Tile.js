"use strict";
Mana.Tile = function() { 
    this.sprite = null;
};

Mana.Tile.prototype = {
    initialize: function(sprite) {
        this.sprite = sprite; 
    }
};