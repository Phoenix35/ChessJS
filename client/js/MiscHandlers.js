window.HandlerManager.AddHandler(new window.OpcodeHandler(Opcodes.SMSG_HELLO, function() {
    console.info("Received SMSG_HELLO");
}));