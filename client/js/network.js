var Network = Class.extend({
    /*
     * Getter for the Game instance
     */
    get Game() { return window.Game; },
    set Game() { },
    
    /*
     * Getter for the Graphics instance
     */
    get Graphics() { return window.Graphics },
    set Graphics() { },
    
    /*
     * Instanciates a Socket.IO object and connects to the server
     */
    Connect: function(host, port) {
        if (typeof(io) === "undefined")
            return;

        var that = this;
    
        this.socket = io.connect('http://' + host + ':' + port);
        this.socket.on('packet', function(data) {
            that.DispatchPacket(data.opcode, data.data);
        });
    },
    
    DispatchPacket: function(opcode, packetData) {
        if (typeof(window.HandlerManager.GetHandlers()[opcode]) !== "undefined")
            window.HandlerManager.GetHandlers()[opcode].call(window.Game, packetData);
    },
});

// Various private properties that are read-only but shouldn't even be EVER accessed.
Object.defineProperty(Network, "GameInstance", {
    value: null,
    writable: false,
    enumerable: true,
    configurable: true
});

window.Network = Network;