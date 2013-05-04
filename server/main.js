var WorldServer = require("./worldserver.js"),
    enumData = require('../shared/enum.js');
    
for (var enumItem in enumData)
    global[enumItem] = enumData[enumItem];
delete enumItem;
delete enumData;

new WorldServer({
    port: 80
});