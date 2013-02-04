"use strict";
Mana.AreaTilePicker = function() {
    this.tileName = null;
}

Mana.AreaTilePicker.prototype = {
    initialize: function(tileName) {
        this.tileName = tileName;
    },
    
    isInArea: function(map, x, y) {           
        // Assume area extends beyond map
        if (typeof map[x] === "undefined" || typeof map[x][y] === "undefined")
            return 1;
        
        if (x < 0 || y < 0)
            return 1;
        
        return map[x][y];
    },
    
    tilePatternMatch: function(map, x, y, a) {
        var isArea = this.isInArea;
        
        var b = [isArea(map, x-1, y-1), isArea(map, x, y-1), isArea(map, x+1, y-1),
                 isArea(map, x-1, y),                         isArea(map, x+1, y),
                 isArea(map, x-1, y+1), isArea(map, x, y+1), isArea(map, x+1, y+1)];

        for (var i = 0; i < 8; i++) {
            if (a[i] != b[i] && a[i] !== 2) {
                return false;
            }
        }
        
        return true;
    },
    
    pickAreaTile: function(map, x, y, sprites) {
        var name = this.tileName;
        
        // Chunk 1 - top right 9 squares
        if (this.tilePatternMatch(map, x, y, [2, 0, 2, 
                                              0,    1, 
                                              2, 1, 1])) {
            return sprites[name+1];
        }
        if (this.tilePatternMatch(map, x, y, [2, 0, 2, 
                                              1,    1, 
                                              1, 1, 1])) {
            return sprites[name+2];
        }
        if (this.tilePatternMatch(map, x, y, [2, 0, 2, 
                                              1,    0, 
                                              1, 1, 2])) {
            return sprites[name+3];
        }
        if (this.tilePatternMatch(map, x, y, [2, 1, 1, 
                                              0,    1, 
                                              2, 1, 1])) {
            return sprites[name+12];
        }    
        if (this.tilePatternMatch(map, x, y, [1, 1, 1, 
                                              1,    1, 
                                              1, 1, 1])) {
            return sprites[name+13];
        }  
        if (this.tilePatternMatch(map, x, y, [1, 1, 2, 
                                              1,    0, 
                                              1, 1, 2])) {
            return sprites[name+14];
        }
        if (this.tilePatternMatch(map, x, y, [2, 1, 1, 
                                              0,    1, 
                                              2, 0, 2])) {
            return sprites[name+23];
        }    
        if (this.tilePatternMatch(map, x, y, [1, 1, 1, 
                                              1,    1, 
                                              2, 0, 2])) {
            return sprites[name+24];
        }  
        if (this.tilePatternMatch(map, x, y, [1, 1, 2, 
                                              1,    0, 
                                              2, 0, 2])) {
            return sprites[name+25];
        }  

        // Chunk 2 - 1-corners
        if (this.tilePatternMatch(map, x, y, [0, 1, 1, 
                                              1,    1, 
                                              1, 1, 1])) {
            return sprites[name+4];
        }
        if (this.tilePatternMatch(map, x, y, [1, 1, 0, 
                                              1,    1, 
                                              1, 1, 1])) {
            return sprites[name+5];
        }
        if (this.tilePatternMatch(map, x, y, [1, 1, 1, 
                                              1,    1, 
                                              0, 1, 1])) {
            return sprites[name+15];
        }
        if (this.tilePatternMatch(map, x, y, [1, 1, 1, 
                                              1,    1, 
                                              1, 1, 0])) {
            return sprites[name+16];
        }
        
        // Chunk 3 - 2-corners
        if (this.tilePatternMatch(map, x, y, [0, 1, 0, 
                                              1,    1, 
                                              1, 1, 1])) {
            return sprites[name+6];
        }
        if (this.tilePatternMatch(map, x, y, [1, 1, 0, 
                                              1,    1, 
                                              1, 1, 0])) {
            return sprites[name+7];
        }
        if (this.tilePatternMatch(map, x, y, [0, 1, 1, 
                                              1,    1, 
                                              0, 1, 1])) {
            return sprites[name+17];
        }
        if (this.tilePatternMatch(map, x, y, [1, 1, 1, 
                                              1,    1, 
                                              0, 1, 0])) {
            return sprites[name+18];
        }
        
        // Chunk 4 - 2-corners on diagonal
        if (this.tilePatternMatch(map, x, y, [0, 1, 1, 
                                              1,    1, 
                                              1, 1, 0])) {
            return sprites[name+10];
        }
        if (this.tilePatternMatch(map, x, y, [1, 1, 0, 
                                              1,    1, 
                                              0, 1, 1])) {
            return sprites[name+11];
        }
        
        // Chunk 5 - Sea to stream
        if (this.tilePatternMatch(map, x, y, [2, 1, 2, 
                                              0,    0, 
                                              2, 0, 2])) {
            return sprites[name+32];
        }
        if (this.tilePatternMatch(map, x, y, [2, 0, 2, 
                                              0,    0, 
                                              2, 1, 2])) {
            return sprites[name+21];
        }
        if (this.tilePatternMatch(map, x, y, [2, 0, 2, 
                                              1,    0, 
                                              2, 0, 2])) {
            return sprites[name+31];
        }
        if (this.tilePatternMatch(map, x, y, [2, 0, 2, 
                                              0,    1, 
                                              2, 0, 2])) {
            return sprites[name+30];
        }
        
        // Chunk 6 - 1 sea + 1 corner
        if (this.tilePatternMatch(map, x, y, [2, 0, 2, 
                                              1,    1, 
                                              0, 1, 1])) {
            return sprites[name+36];
        }
        if (this.tilePatternMatch(map, x, y, [2, 0, 2, 
                                              1,    1, 
                                              1, 1, 0])) {
            return sprites[name+37];
        }
        if (this.tilePatternMatch(map, x, y, [0, 1, 1, 
                                              1,    1, 
                                              2, 0, 2])) {
            return sprites[name+47];
        }
        if (this.tilePatternMatch(map, x, y, [1, 1, 0, 
                                              1,    1, 
                                              2, 0, 2])) {
            return sprites[name+48];
        }    

        // Chunk 6b - 1 sea + 1 corner
        if (this.tilePatternMatch(map, x, y, [2, 1, 2, 
                                              0,    1, 
                                              2, 1, 1])) {
            return sprites[name+40];
        }
        if (this.tilePatternMatch(map, x, y, [2, 1, 2, 
                                              1,    0, 
                                              1, 1, 2])) {
            return sprites[name+41];
        }
        
        if (this.tilePatternMatch(map, x, y, [2, 1, 2, 
                                              0,    1, 
                                              2, 1, 0])) {
            return sprites[name+51];
        }
        if (this.tilePatternMatch(map, x, y, [2, 1, 2, 
                                              1,    0, 
                                              0, 1, 2])) {
            return sprites[name+52];
        }
        
        // Chunk 7 - straight streams
        if (this.tilePatternMatch(map, x, y, [2, 1, 2, 
                                              0,    0, 
                                              2, 1, 2])) {
            return sprites[name+28];
        }
        if (this.tilePatternMatch(map, x, y, [2, 0, 2, 
                                              1,    1, 
                                              2, 0, 2])) {
            return sprites[name+29];
        }
        
        // Chunk 8 - bending streams
        if (this.tilePatternMatch(map, x, y, [2, 0, 2, 
                                              0,    1, 
                                              2, 1, 0])) {
            return sprites[name+34];
        }
        if (this.tilePatternMatch(map, x, y, [2, 0, 2, 
                                              1,    0, 
                                              0, 1, 2])) {
            return sprites[name+35];
        }
        if (this.tilePatternMatch(map, x, y, [2, 1, 0, 
                                              0,    1, 
                                              2, 0, 2])) {
            return sprites[name+45];
        }
        if (this.tilePatternMatch(map, x, y, [0, 1, 2, 
                                              1,    0, 
                                              2, 0, 2])) {
            return sprites[name+46];
        }
        
        // Chunk 9 - three corners
        if (this.tilePatternMatch(map, x, y, [0, 1, 0, 
                                              1,    1, 
                                              0, 1, 1])) {
            return sprites[name+8];
        }
        if (this.tilePatternMatch(map, x, y, [0, 1, 0, 
                                              1,    1, 
                                              1, 1, 0])) {
            return sprites[name+9];
        }
        if (this.tilePatternMatch(map, x, y, [0, 1, 1, 
                                              1,    1, 
                                              0, 1, 0])) {
            return sprites[name+19];
        }
        if (this.tilePatternMatch(map, x, y, [1, 1, 0, 
                                              1,    1, 
                                              0, 1, 0])) {
            return sprites[name+20];
        }
      
        // Chunk 9 - three corners and one sea line
        if (this.tilePatternMatch(map, x, y, [2, 0, 2, 
                                              1,    1, 
                                              0, 1, 0])) {
            return sprites[name+39];
        }
        if (this.tilePatternMatch(map, x, y, [0, 1, 0, 
                                              1,    1, 
                                              2, 0, 2])) {
            return sprites[name+50];
        }
        
        // Chunk 10 - cross
        if (this.tilePatternMatch(map, x, y, [0, 1, 0, 
                                              1,    1, 
                                              0, 1, 0])) {
            return sprites[name+27];
        }
        
        // Default sprite
        return sprites[name+26];
    }

}