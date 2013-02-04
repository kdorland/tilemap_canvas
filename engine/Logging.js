"use strict";
SagaEngine.Logging = {
    name: null,
    
    initialize: function() {
    
    },
    
    trace: function(text) {
        if (console.log)
            console.log(this.name + ": "+text);
    }
}