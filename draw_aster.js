var global_data = [];

console.log("Current is:" +current);
var width = 400,
    height = 380,
    radius = Math.min(width, height) / 2,
    innerRadius = 0.3 * radius;
    margin = {top : 50, right: 50, bottom: 50, left: 50}

var svg = d3.select("body").append("svg")
    .attr("id","svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
create_aster();
function create_aster() {
    d3.csv('aster_graph_data.csv', function(error, data) {
        global_data = data;
        // data.forEach(function (d) {
        //     d.id = d.id;
        //     d.order = +d.order;
        //     d.color = d.color;
        //     d.weight = +d.weight;
        //     d.score = +d.score;
        //     d.width = +d.weight;
        //     d.label = d.label;
        //
        // });
        var fill = d3.scale.category10();
        console.log("In draw aster");
        global_data.forEach(function (d) {
            console.log(d);
            d.id = d.id;
            d.order = +d.order;
            d.color = d.color;
            d.weight = +d.weight;
            d.score = +d.score;
            d.width = +d.weight;
            d.label = d.label;
        });
        // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
        console.log("P");
        var pie = d3.layout.pie()
            .sort(null)
            .value(function (d) {
                return d.width;
            });
        console.log("T");
        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([0, 0])
            .html(function (d) {
                return d.data.label + ": <span style='color:orangered'>" + d.data.score + "</span>";
            });
        console.log("A");
        var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(function (d) {
                console.log((radius - innerRadius) * (d.data.score / 100.0) + innerRadius);
                console.log(d.data.score);
                return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius;
            });

        console.log("O");
        var outlineArc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(radius);
        console.log("S");

        var svg_text = svg.append("svg:text")
            .attr("class", "aster-score")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle"); // text-align: right

        svg.call(tip);

        console.log("PATH");

        var arc1 = svg.selectAll(".solidArc")
            .data(pie(global_data))
            .enter()
            .append("path")
            // .transition().delay(function(d, i) { return i * 100; }).duration(100)
            .attr("fill", function (d) {
                return d.data.color;
            })
            .attr("class", "solidArc")
            .attr("stroke", "gray")
            .attr("d", d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(function (d) {
                    console.log(d);
                    return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius;
                }))
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        console.log("OP");

        var arc = svg.selectAll(".outlineArc")
            .data(pie(global_data))
            .enter().append("path")
            // .transition().delay(function(d, i) { return i * 100; }).duration(100)
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("class", "outlineArc")
            .attr("d", outlineArc);

        console.log("SC");

        // calculate the weighted mean score
        var score =
            global_data.reduce(function (a, b) {
                //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
                return a + (b.score * b.weight);
            }, 0) /
            global_data.reduce(function (a, b) {
                return a + b.weight;
            }, 0);

        svg_text.text("");
        svg_text.text(Math.round(score)+"%");

        var legend = svg.selectAll(".legend")
            .data(d3.scale.category10())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(" + (width - 20) + "," + i * 20 + ")"; });

        // draw legend colored rectangles
        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d) { return fill(d); });

        // draw legend text
        legend.append("text")
            .attr("y", 9)
            .attr("dx", -1)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d;})


    });
}

function make_aster() {

    d3.select("#svg").selectAll("*").remove();
    var svg = d3.select("body").select("#svg")
        .attr("id","svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    console.log("In draw aster");
        global_data.forEach(function (d) {
            console.log(d);
            d.id = d.id;
            d.order = +d.order;
            d.color = d.color;
            d.weight = +d.weight;
            d.score = +d.score;
            d.width = +d.weight;
            d.label = d.label;
        });
        // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
    console.log("P");
    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
            return d.width;
        });
    console.log("T");
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([0, 0])
        .html(function (d) {
            var x = Math.round(d.data.score*100)/100;
            return "<span style='color: #07f0f9;font-weight:BOLD;'>"+d.data.label + ": <span style='color: #94f907;font-weight:BOLD;'>" + x + "</span>";
        });
    var tip2 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([0, 0])
        .html(function (d) {
            return d;
            // var x = Math.round(d.data.score*100)/100;
            // return "<span style='color: #07f0f9;font-weight:BOLD;'>"+d.data.label + ": <span style='color: #94f907;font-weight:BOLD;'>" + x + "</span>";
        });
    console.log("A");
    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(function (d) {
            console.log((radius - innerRadius) * (d.data.score / 100.0) + innerRadius);
            console.log(d.data.score);
            return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius;
        });

    console.log("O");
    var outlineArc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(radius);
    console.log("S");

    var svg_text = svg.append("svg:text")
        .attr("class", "aster-score")
        .attr("dy", ".35em")
        .attr("id","win_t")
        .attr("text-anchor", "middle")
             // text-align: right

    svg.call(tip);

    console.log("PATH");

    var path = svg.selectAll(".solidArc")
        .data(pie(global_data))
        .enter().append("path")
        .attr("fill", function(d) { return d.data.color; })
        .attr("class", "solidArc")
        .attr("stroke", "gray")
        .attr("d", arc)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    var outerPath = svg.selectAll(".outlineArc")
        .data(pie(global_data))
        .enter().append("path")
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("class", "outlineArc")
        .attr("d", outlineArc);

    console.log("SC");
        // calculate the weighted mean score
        var score =
            global_data.reduce(function (a, b) {
                //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
                return a + (b.score * b.weight);
            }, 0) /
            global_data.reduce(function (a, b) {
                return a + b.weight;
            }, 0);
        // svg_text.call(tip2);

        svg_text.text("");
            svg_text.text(Math.round(score)+"%");


}