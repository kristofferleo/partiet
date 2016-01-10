function Party(){
    var parties = {};
    JSON.load('data/parties.json').forEach(function (element, index) {
        parties[element.partikort] = element;
        console.log(parties[element.partikort]);
    });
    
    
    return parties;
}


