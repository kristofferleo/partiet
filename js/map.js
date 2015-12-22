
function Map(){

	// Initalization
    var mapColor = "#c5ef6e";
    var mapBorderColor = "#819d7f";
	var mapDiv = $("#map");
	var margin = { top: 20, right: 20, bottom: 20, left: 20 };
	var width = mapDiv.width() - margin.right - margin.left + 40;
    var height = mapDiv.height() - margin.top - margin.bottom + 40;
    var geoData;
    var populationData;

    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 12])
        .on("zoom", move);

    var svg = d3.select("#map").append("svg")
        .attr("id", "mapID")
        .attr("width", width)
        .attr("height", height)
        .style("margin-top", "0px")
        .call(zoom);

    var projection = d3.geo.mercator()
        .center([31, 64.5 ])
        .scale(1200);

    var path = d3.geo.path()
        .projection(projection);

	g = svg.append("g")
        .attr("id", "g_mapID");
	
    // Load kommuner
    d3.json("data/kommun.json", function(data) {
        populationData = data;

            // Load geographic data
            d3.json("data/swe_mun.json", function(error, sweden) {

            geoData = topojson.feature(sweden, sweden.objects.swe_mun).features;
            draw(geoData); 

        });
	});
        
	

    // Draw map
    function draw(geoData) {

    	var kommuner = g.selectAll(".name").data(geoData);

    	kommuner.enter().insert("path")
            .attr("class", "kommuner")
            .attr("d", path)
            .attr("id", function(d) { return d.id; })
            .attr("title", function(d) { return d.properties.name; })
            .style("fill", mapColor)
            .style("border-color", mapBorderColor)
            
            .style({ 'stroke-opacity':0.0,'stroke':'#000000' })
            .on("mousemove", function(d) {
    
                d3.select(this).transition().duration(100)
    				.style({ 'fill-opacity':0.4,'stroke-opacity':1.0 });
                    
            })
            .on("mouseout",  function(d) {
                
            	d3.select(this).transition().duration(100)
    				.style({ 'fill-opacity':1.0,'stroke-opacity':0.0 });

            })
            .on("click", function(d){

                d3.select()

                var clusterValMonth = $('#clusterbtn_stream').bootstrapSwitch('state');

                if (clusterValMonth) {

                    d3.select(this)
                        .style("fill", function(d,i) {
                            d3.select("#map").selectAll("path")
                                .style("fill", function(p,i) {
                                    var color = "#c5ef6e";
                                    return color;
                                }); 

                            return "#a8ca61";
                        });
                        
                     drawSelectedKommun();
                        
                        
                }
                else {
                    map.markMun(d.properties.name);
                }
            });


		
    }

    function drawSelectedKommun(){
        var selectedKommun = "test";
        $(".btn-kommun").html(selectedKommun);
    }
 

    // Zoom and panning
    function move() {

        var t = d3.event.translate;
        var s = d3.event.scale;

        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");
    }

}