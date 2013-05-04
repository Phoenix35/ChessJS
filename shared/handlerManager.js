var OpcodeHandler = null;
var ClassInstance = null;
if (typeof(require) !== "undefined") {
    OpcodeHandler = require("./OpcodeHandler.js");
    ClassInstance = Class;
} else {
    OpcodeHandler = window.OpcodeHandler;
    ClassInstance = window.Class;
}   

var HandlerManager = ClassInstance.extend({
    init: function() { },
    
    handlers: [],
    
    AddHandler: function(opcode, handler) {
        if (handler instanceof OpcodeHandler)
            this.handlers.push(handler);
    },
    
    GetHandlers: function() { return this.handlers; },
});

if (typeof(exports) === "undefined")
    window.HandlerManager = new HandlerManager();
else
    module.exports = HandlerManager;
