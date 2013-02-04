"use strict";
var ValueNoise = function(width, height) {
    this.width = width;
    this.height = height;
};

ValueNoise.prototype = {
    width: 0,
    height: 0,
    persistence: 0.55,
    numberOfOctaves: 6,
    _input: {},
    _input_height: 0,
    _input_width: 0,
    _noise: {},
    _noise_height: 0,
    _noise_width: 0,
    
    ran: undefined,
    
    scaleTo0_1: function(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) / (inMax-inMin)) * (outMax-outMin) + outMin;
    },
            
    getInputValue: function(i, x, y) {
        return this._input[i][x + this._noise_width * y];
    }, 
        
    setInputValue: function(i, x, y, v) {
        this._input[i][x + this._noise_width * y] = v;
    }, 
    
    getNoiseValue: function(x, y) {
        return this._noise[x + this._noise_width * y];
    }, 
    
    setNoiseValue: function(x, y, v) {
        this._noise[x + this._noise_width * y] = v;
    }, 

    initArrays: function(index) {      
        this._input[index] = new Float64Array(this.width * this.height);
        this._input_width = this.width;
        this._input_height = this.height;
        
        this._noise = new Float64Array(this.width * this.height);
        this._noise_width = this.width;
        this._noise_height = this.height;
    },
    
    seedRandom: function(seed) {
        this.ran = new MersenneTwister();
        this.ran.init_by_array(seed.split(""), seed.length);
    },
    
    fillInputArray: function(index) {
        var r = this.ran || Math;
        
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                this.setInputValue(index, x, y, r.random());
            }
        }
    },
    
    // Interpolate x between a and b
    cosineInterpolate: function(a, b, x) {
        var angle = x * Math.PI;
        var f = (1 - Math.cos(angle)) * 0.5;
        return a * (1 - f) + b * f;
    },

    interpolate: function(x, y, i) {
        var int_x        = Math.floor(x);
        var fractional_X = x - int_x;
        var int_y        = Math.floor(y);
        var fractional_Y = y - int_y;

        var v1 = this.getInputValue(i, int_x, int_y);
        var v2 = this.getInputValue(i, int_x+1, int_y);
        var v3 = this.getInputValue(i, int_x, int_y+1);
        var v4 = this.getInputValue(i, int_x+1, int_y+1);
        
        var i1 = this.cosineInterpolate(v1, v2, fractional_X);
        var i2 = this.cosineInterpolate(v3, v4, fractional_X);
        return   this.cosineInterpolate(i1, i2, fractional_Y);
    },
    
    getNoise: function(x, y) {
        var result = 0;
        var freq = 1 / 64;
        var ampl = 1;
      
        for (var i = 0; i < this.numberOfOctaves; i++) {
            result += this.interpolate(x * freq, y * freq, i) * ampl;
            freq = freq * 2;
            ampl = ampl * this.persistence;
        }
        
        return result;      
    },
    
    initNoise: function(persistence) {
        var i = 0;
        var x = 0;
        var y = 0;
        
        if (persistence !== undefined) {
            this.persistence = persistence;
        }
        
        // Init arrays
        for (var i = 0; i < this.numberOfOctaves; i++) {
            this.initArrays(i);
            this.fillInputArray(i);
        }
        
        // Fill noise array
        for (x = 0; x < this.width; x++) {
            for (y = 0; y < this.height; y++) {
                this.setNoiseValue(x,y, this.getNoise(x, y));
            }
        }
        
        // Normalize buffer
        var maxValue = 0;
        var minValue = 999999999;
        for (x = 0; x < this.width; x++) {
            for (y = 0; y < this.height; y++) {
                maxValue = Math.max(this.getNoiseValue(x,y), maxValue);
                minValue = Math.min(this.getNoiseValue(x,y), minValue);
            }
        }
        for (x = 0; x < this.width; x++) {
            for (y = 0; y < this.height; y++) {
                var n1 = this.getNoiseValue(x,y);
                var n2 = this.scaleTo0_1(n1, minValue, maxValue, 0, 1);
                this.setNoiseValue(x,y,n2);
                if (n2 > 1)
                    null;
            }
        }
    }
};

