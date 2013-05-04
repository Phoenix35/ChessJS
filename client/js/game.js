var Game = Class.extend({
    init: function(renderingContainer) {
        window.Graphics = new Renderer(renderingContainer);
    },
    
    Connect: function(host, port) {
        window.Network = new Network(this);
        window.Network.Connect(host, port || 80);
    },
});

window.Game = Game;