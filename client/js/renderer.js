var Renderer = Class.extend({
    init: function(renderingContainer) {
        this.renderingContainer = renderingContainer;
        
        this.cellSize = 50;
        this.InitialDraw();
    },
    
    /*
     * Getter for the Game instance
     */
    get Game() { return window.Game; },
    set Game() { },
    
    /*
     * Getter for the Network instance
     */
    get Network() { return window.Network; },
    set Network() { },
    
    /*
     * Getter for the rendering node
     */
    get RenderingNode() { return this.renderingContainer; },
    set RenderingNode() { },
    
    /*
     * Finds a node relative to the rendering node
     */
    FindNode: function(selector) { return $(this.RenderingNode.find(selector)); },
    
    /*
     * Renders a blank new board
     */
    InitialDraw: function() {
        
    },
});

// Various private properties that are read-only but shouldn't even be EVER accessed.
Object.defineProperty(Game, "renderingContainer", {
    value: undefined,
    writable: false,
    enumerable: false,
    configurable: false
});

window.Renderer = Network;