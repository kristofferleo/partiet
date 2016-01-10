function car() {
    var obj = {};
    
    obj.wheel = 4;
    
    obj.drive = function () {
        console.log('Driving');
    };
    
    return obj;
}

var car =  car();

function threewheeeler() {
    var obj = car();
    
    obj.wheels = 3;
    
    return obj;
}


var parties = {};
JSON.load('partier.json').forEach(function (element, index) {
    parties[element.partikort] = element;
});

parties.SD.q1 === 1;

JSON.load()

var world = {};

world.parties = parties;
world.couties = kommuner;





// Module pattern
var myModule = function () {
    var variable = 3;
    
    function internalIncrement() {
        variable += 1;
    }
    
    return {
        increment: internalIncrement,
        getVariable: function () { return variable; }
    };
}();

myModule.variable = 5;