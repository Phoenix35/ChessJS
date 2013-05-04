var Class = require("class.js").Class,
    OpcodeHandler = require("opcodeHandler.js");

module.exports = HandlerManager = Class.extend({
    init: function() { },
    
    handlers: { },
    
    AddHandler: function(opcode, handler) {
        if (handler instanceof OpcodeHandler)
            this.handlers[] = handler;
    },
    
    GetHandlers: function() { return this.handlers; }
});
