var HandlerManager = require("../../shared/handerManager.js"),
    OpcodeHandler = require("../../shared/OpcodeHandler.js");

for (var enumItem in require('../../shared/enum.js'))
    global[enumItem] = enumData[enumItem];
delete enumItem;

// Initialization done
var ChatHandler = new HandlerManager();
ChatHandler.AddHandler(new OpcodeHandler(Opcodes.CMSG_ROOM_TALK, function() {
    console.log("Received CMSG_ROOM_TALK");
}));

module.exports = ChatHandler;