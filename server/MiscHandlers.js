var HandlerManager = require("../shared/HandlerManager.js"),
    OpcodeHandler = require("../shared/OpcodeHandler.js"),
    enumData = require('../shared/enum.js');
    
for (var enumItem in enumData)
    global[enumItem] = enumData[enumItem];
delete enumItem;
delete enumData;

var MiscHandlers = new HandlerManager();
MiscHandlers.AddHandler(new OpcodeHandler(Opcodes.CMSG_START_HANDSHAKE, function(data, emitter) {
    console.log("Received CMSG_START_HANDSHAKE");
    // this.SendPacket(Opcodes.SMSG_START_HANDSHAKE);
}));

module.exports = MiscHandlers;
