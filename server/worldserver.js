var Class = require("../shared/class.js").Class;

module.exports = Server = Class.extend({
    init: function(config) { this._config = config; Start(); },
    Start: function() {
        this.clients = [];
        this.server = require("http").createServer(function() {
            // Just an empty request listener for now, will have a status page somehow sometime
        });
        
        this.RegisterCommandHandlers(); // Load handlers

        this.server.listen(this.config.port);
        this.sockets = require('socket.io').listen(this.server);
        
        var that = this;
        this.sockets.on('connection', function (socket) {
            that.dispatchEvent("ClientLogin", socket);
            socket.on('packet', function(packetData) {
                that.dispatchCmsg(packetData, socket);
            });
        });
    },
    
    RegisterCommandHandlers: function() {
        this.handlers = { };
        this._registerCommandHandlers(require('./handlers/chatHandler.js'));
    },
    
    _registerCommandHandlers: function(obj) {
        var that = this;
        obj.GetHandlers().forEach(function(handlerInfo) {
            this.handlers[handlerInfo.Opcode] = handlerInfo.Handler.bind(that);
        });
    },
    
    dispatchEvent: function(eventName, data) {
        if (eventName == "ClientLogin")
            this.clients.push(data);
    },
    
    sendPacket: function(client, packetData) { client.emit('packet', packetData); },
    broadcastPacket: function(packetData, except) {
        if (!(except instanceof Array) && typeof(except) !== "undefined")
            except = [except];

        var that = this;
        this.clients.forEach(function(client) {
            if (typeof(except) !== "undefined" && except.indexOf(client) != -1)
                that.sendPacket(client, packetData);
        });
    },
    
    dispatchCmsg: function(packetData, emitter) {
        if (!(typeof(this.handlers[packetData.opcode]) === "undefined"))
            this.handlers[packetData.opcode].call(this, packetData, emitter);
        else
            console.log("[ERROR] Unknown packet received", packetData);
    }
});
