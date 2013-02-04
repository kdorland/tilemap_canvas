"use strict";
var GenerateMap = {
    waterSeed: null,
    
    testMap: function(sprites, map) {
        var timeNow = Date.now();
        var terrain = new ValueNoise(map.width, map.height);
        var water = new ValueNoise(map.width, map.height);
        var x, y, i, j;
        var tilePicker = new Mana.AreaTilePicker();
        tilePicker.initialize("water");
        
        if (this.waterSeed === null) {
            this.waterSeed = this.makeSeed(10);
        }
        water.seedRandom(this.waterSeed);
        SagaEngine.Logging.trace("waterSeed is \""+this.waterSeed+"\"");
        water.seedRandom("6e79njZPGEd");
        terrain.seedRandom("6e71njZPGEd");
        
        terrain.initNoise(0.55);
        water.initNoise(0.45);
        
        var spriteList = 
            [sprites["grass"], 
             sprites["flowers"], 
             sprites["weed"], 
             sprites["tree"]];
        
        // Generate plains and forests
        for (y = 0; y < map.height; y++) {
            for (x = 0; x < map.width; x++) {
                var l = [1,0];
                var r = l[Math.floor(Math.random() * 2)];
                var s = terrain.getNoiseValue(x,y);
                
                if (s > 0.65) {
                    l = [3,0,1];
                    r = l[Math.floor(Math.random() * 3)];
                }
                
                var tile = new Mana.Tile();
                tile.initialize(spriteList[r].clone(timeNow));
                map.tiles[x][y] = tile;
            }
        }   

        // Create water map array
        var waterMap = new Array(map.width);
        for (i = 0; i < map.width; i++) {
            waterMap[i] = new Array(map.height);
        }
        
        // Fill water map array
        for (j = 0; j < map.height; j++) {
            for (i = 0; i < map.width; i++) {
                var s = water.getNoiseValue(i,j);
                if (s > 0.80)
                    waterMap[i][j] = 1;
                else
                    waterMap[i][j] = 0;
            }
        }
        
        // Convert to water tiles
        for (y = 0; y < map.height; y++) {
            for (x = 0; x < map.width; x++) {
                var tile = new Mana.Tile();
                                       
                if (waterMap[x][y] === 1) {
                    var sprite = tilePicker.pickAreaTile(waterMap, x, y, sprites);
                    tile.initialize(sprite.clone(timeNow));
                    map.tiles[x][y] = tile;
                }
            }
        }       
    },
    
    makeSeed: function(length) {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i = 0; i <= length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
};