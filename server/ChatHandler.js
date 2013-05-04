var HandlerManager = require("../shared/HandlerManager.js"),
    OpcodeHandler = require("../shared/OpcodeHandler.js");

// Initialization done
var ChatHandlers = new HandlerManager();
ChatHandlers.AddHandler(new OpcodeHandler(Opcodes.CMSG_ROOM_TALK, function(data, emitter) {
    console.log("Received CMSG_ROOM_TALK");
}));

module.exports = ChatHandlers;
