"use strict";
SagaEngine.ResourceHandler = {
    images: {},

    destroy: function() {
        delete this.images;
        return this;
    },
    
    addImage: function(name, src) {
        var tempImage = new Image();
        tempImage.src = src;
        this.images[name] = tempImage;
        return this;
	},
	
    addImages: function(array) {
        for (var i = 0; i < array.length; i++) {
            var tempImage = new Image();
            this.images[array[i].name] = tempImage;
            tempImage.src = array[i].src;
        }
        return this;
    },
	
	clearImages: function() {
		delete this.Images;
        this.images = new Object();
        return this;
	},
	
	removeImage: function(name) {
		delete this.images[name];
		return this;
	}
};