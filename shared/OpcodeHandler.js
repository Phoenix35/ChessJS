var ClassInstance = null;
if (typeof(require) !== "undefined")
    ClassInstance = Class;
else
    ClassInstance = window.Class;

OpcodeHandler = ClassInstance.extend({
    init: function(opcodeId, handle) {
        this.opcodeId = opcodeId;
        if (typeof(handle) === "function")
            this.handlerFunction = handle;
    },
    
    get Handler() { return this.handlerFunction; },
    get Opcode() { return this.opcodeId; },
    
    set Handler() { },
    set Opcode() { },
    
    // handlerFunction: function() { console.log("Unknown handler for opcode " + this.opcodeId); },  // The actual handler
    // opcodeId: 0,                     // Opcode ID
});

Object.defineProperty(OpcodeHandler, "handlerFunction", {
    value: function() { console.log("Unknown handler for opcode " + this.opcodeId); },
    writable: false,
    enumerable: true,
    configurable: true
});

Object.defineProperty(OpcodeHandler, "opcodeId", {
    value: 0,
    writable: false,
    enumerable: true,
    configurable: true
});

if (typeof(exports) === "undefined")
    window.OpcodeHandler = OpcodeHandler;
else
    module.exports = OpcodeHandler;
