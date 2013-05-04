var Class = require("../shared/class.js").Class;

module.exports = Server = Class.extend({
    init: function(config) { 
        this._config = config;
        
        this.clients = [];
        this.server = require("http").createServer(function() {
            // Just an empty request listener for now, will have a status page somehow sometime
        });
        
        this.RegisterCommandHandlers(); // Load handlers

        this.sockets = require('socket.io').listen(this.server);
        this.server.listen(this._config.port);
        
        var that = this;
        this.sockets.on('connection', function (socket) {
            that.dispatchEvent("ClientLogin", socket);
            
            // CBA to include enums here
            socket.emit('packet', {
                opcode: Opcodes.SMSG_HELLO,
                data: undefined
            });
            
            socket.on('packet', function(packetData) {
                that.dispatchCmsg(packetData, socket);
            });
            
            socket.on('disconnect', function() {
                that.dispatchEvent("ClientLogout", socket.id);
            });
        });
    },
    
    RegisterCommandHandlers: function() {
        this.handlers = { };
        // this._registerCommandHandlers(require('./ChatHandler.js'));
        this._registerCommandHandlers(require('./MiscHandlers.js'));
    },
    
    _registerCommandHandlers: function(obj) {
        obj.GetHandlers().forEach(function(handlerInfo) {
            this.handlers[handlerInfo.Opcode] = handlerInfo.Handler.bind(this);
        }, this);
    },
    
    dispatchEvent: function(eventName, data) {
        if (eventName == "ClientLogin")
            this.clients.push(data);
        else if (eventName == "ClientLogout")
            this.clients.some(function(client, index) {
                var valid = (client.id == data);
                if (valid)
                    delete this.clients[index];
                return valid;
            }, this);
    },
    
    SendPacket: function(client, opcode, packetData) { client.emit('packet', {opcode: opcode, data: packetData}); },
    BroadcastPacket: function(opcode, packetData, except) {
        if (!(except instanceof Array) && typeof(except) !== "undefined")
            except = [except];

        this.clients.forEach(function(client) {
            if (typeof(except) !== "undefined" && except.indexOf(client) != -1)
                this.SendPacket(client, opcode, packetData);
        }, this);
    },
    
    dispatchCmsg: function(packetData, emitter) {
        if (!(typeof(this.handlers[packetData.opcode]) === "undefined"))
            this.handlers[packetData.opcode].call(this, packetData.data, emitter);
        else
            console.log("[ERROR] Unknown packet received", packetData);
    }
});
