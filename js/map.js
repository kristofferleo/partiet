
function Map() {

    // Initalization
    var mapColor = "#c5ef6e";
    var mapBorderColor = "#819d7f";
    var mapDiv = $("#map");
    var margin = { top: 20, right: 20, bottom: 20, left: 20 };
    var width = mapDiv.width() - margin.right - margin.left + 40;
    var height = mapDiv.height() - margin.top - margin.bottom + 40;
    var geoData;
    var kommunData;
    var kommunVoteData;

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
        .center([31, 64.5])
        .scale(1200);

    var path = d3.geo.path()
        .projection(projection);

    g = svg.append("g")
        .attr("id", "g_mapID");
	
    // Ladda kommuner
    d3.json("data/kommun.json", function (data) {
        kommunData = data;
        
        // Ladda geographic data
        d3.json("data/swe_mun.json", function (error, sweden) {

            geoData = topojson.feature(sweden, sweden.objects.swe_mun).features;
            draw(geoData);

        });
    });

    d3.json("data/2014_riksdagsval_per_kommun.json", function (data) {
        kommunVoteData = data;
    });    
	

    // Draw map
    function draw(geoData) {

        var kommuner = g.selectAll(".name").data(geoData);

        kommuner.enter().insert("path")
            .attr("class", "kommuner")
            .attr("d", path)
            .attr("id", function (d) { return d.id; })
            .attr("title", function (d) { return d.properties.name; })
            .style("fill", mapColor)
            .style("border-color", mapBorderColor)

            .style({ 'stroke-opacity': 0.0, 'stroke': '#000000' })
            .on("mousemove", function (d) {

                d3.select(this).transition().duration(100)
                    .style({ 'fill-opacity': 0.4, 'stroke-opacity': 1.0 });

            })
            .on("mouseout", function (d) {

                d3.select(this).transition().duration(100)
                    .style({ 'fill-opacity': 1.0, 'stroke-opacity': 0.0 });

            })
            .on("click", function (d) {

                d3.select()

                var clusterValMonth = $('#clusterbtn_stream').bootstrapSwitch('state');
                
                
                /* uppdaterar information i spelet */
                $(".btn-kommun").html(d.properties.name);
                drawSelectedKommun(d.properties.name);
                updateKummunData(d.properties.name);

                if (clusterValMonth) {

                    d3.select(this)
                        .style("fill", function (d, i) {
                            d3.select("#map").selectAll("path")
                                .style("fill", function (p, i) {
                                    var color = "#c5ef6e";
                                    return color;
                                });

                            return "#a8ca61";

                        });

                }
                else {
                    map.markMun(d.properties.name);
                }
            });

    }

    function drawSelectedKommun(current) {

        $.each(kommunData, function (key, objects) {

            if (current == key) {

                for (var folkmangd in objects) {
                    var value = objects[folkmangd];

                    $(".folkmangd-result").html("Folkmängd: " + value);
                }
            }
        });
    }

    function updateKummunData(current) {

        $.each(kommunVoteData, function (key, objects) {
            if (current == key) {
                /*for(var Mtal in objects) {
                    var val = objects[key]["Mval"];*/
                /*console.log(key + " = " + objects[key]);*/
                /*console.log(val);
            }*/
            
                //Better to construct options first and then pass it as a parameter
                var options = {
                    title: {
                        text: current
                    },
                    animationEnabled: true,
                    data: [
                        {
                            type: "column", //change it to line, area, bar, pie, column etc
                            dataPoints: [
                                /*{ label: "M", y: Mval },*/
                                { label: "M", y: 11 },
                                { label: "C", y: 14 },
                                { label: "MP", y: 16 },
                                { label: "SD", y: 19 },
                                { label: "KD", y: 15 },
                                { label: "FP", y: 12 },
                                { label: "D", y: 10 }
                            ]
                        }
                    ]
                };

                $("#chartContainer").CanvasJSChart(options);

            }
        });
    }


    function pickKommun() {
        document.cookie = "startKommun=yes";

    }

    // Zoom and panning
    function move() {

        var t = d3.event.translate;
        var s = d3.event.scale;

        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");
    }

}