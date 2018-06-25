<!DOCTYPE html>
<head>
<link rel="stylesheet" type="text/css" href="visualization.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <meta charset="utf-8">
    <title>
    Assignment 2
</title>
<style>

        #line {
    opacity: .2;
    stroke: gray;
    stroke-width: 8px;
    fill: none;
}


</style>

</head>
<body>
<nav class="navbar navbar-inverse">
    <div class="container-fluid">
    <div class="navbar-header">
    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="visualization.html">Interactive Visualizations</a>
</div>
<div class="collapse navbar-collapse" id="myNavbar">
    <ul class="nav navbar-nav">
    <li class="active"><a href="visualization.html">Winners Prediction Probability</a></li>
<li><a href="#">Bonus Task</a></li>
<li><a href="#">Write-Up</a></li>
</ul>
</div>
</div>
</nav>
<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>


    <script>

// reference
// http://www.theguardian.com

var w = 200,
    h = 125,
    pad = 0, radius = 10;

var svg = d3.select("body")
    .append("svg")
    .attr("transform","translate(" + 50 +"," +50 + ")")
    .attr({width: w, height: h, id: "ace_svg"});


var center = svg.append("g")
    .attr("transform", translation(w / 2, h / 2));

center.append("text")
    .attr("x", -100)
    .attr("y", 50)
    .text("ACE");
// .on("click",function(){   // onclick function
//
//     if(flag_dragged==true){ d3.select(this).remove();
//         center.append("text").attr({
//             x:0,
//             y:75
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","50px")
//             .style("fill","#ccc").text(answerText).attr("text-anchor", "middle") ;
//         d3.select("#circle1").attr("r",radius2).style("fill","orange");
//
//
//
//         center.append("text").attr({
//             x:-50,
//             y:50,
//             id:"answer"
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","30px")
//             .style("fill","#ccc").text(Math.round(xscale(-50))).attr("text-anchor", "middle") ;
//
//     }
// });


// drag object
var drag = d3.behavior.drag()
    .on("dragstart", start)
    .on("drag", dragmove);


// function change_value() {
//     ace_change(num);
//
// }


// path
var point = [[-90, 0], [90, 0]];

var line = d3.svg.line()
    .x(function (d) {
        return d[0];
    })
    .y(function (d) {
        return d[1];
    });

center.append("path")
    .attr("d", line(point))
    .attr("id", "line");


// 0------------------100
center.append("text").attr({
    x: -85,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("0").attr("text-anchor", "end");


//100
center.append("text").attr({
    x: 85,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("45").attr("text-anchor", "start");


// arrows function

function ace_arrows() {
    d3.select("#ace_arrow1")
        .transition().duration(500)
        .attr("points", "-30,-10 -40,0 -30,10 ")
        .transition().duration(500)
        .attr("points", "-25,-10 -35,0 -25,10 ");

    d3.select("#ace_arrow2")
        .transition().duration(500)
        .attr("points", "30,-10 40,0 30,10 ")
        .transition().duration(500)
        .attr("points", "25,-10 35,0 25,10 ");
}


// circle
center.append("circle")
    .attr("r", radius)
    .attr("cx", 0)
    .attr("id", "circle1")
    .attr("cy", 0)
    .style({fill: "yellow"})
    .call(drag);


//scale
var ace_xscale = d3.scale.linear().domain([-90, 90]).range([0, 45]);

// text drag value
center.append("text").attr({
    x: 0,
    y: -30,
    id: "ace_text"
})
    .style("font-family", "sans-serif")
    .style("font-size", "25px")
    .style("fill", "#ccc").text("23").attr("text-anchor", "middle");


//polyline *2
center.append("polyline")
    .attr("id", "ace_arrow1")
    .attr("points", "-25,-10 -35,0 -25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


center.append("polyline")
    .attr("points", "25,-10 35,0 25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("id", "ace_arrow2")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


// function & flag
var ace_flag_dragged = false;

// function dragstart

function start() {
    if (ace_flag_dragged == false) {
        ace_flag_dragged = true;
        clearInterval(time);
        d3.select("#ace_arrow1")//.transition().delay(10)
            .remove();
        d3.select("#ace_arrow2")//.transition().delay(10)
            .remove();

    }

}

//function dragmove

var answerText;
var num = 0;

function dragmove(d) {
    if (ace_flag_dragged == true) {
        d3.select(this)
            .attr("cx", Math.max(-90, Math.min(90, d3.event.x)));
        var num = Math.max(0, Math.min(45, Math.round(ace_xscale(d3.event.x))));

        d3.select("#ace_text").text(num).attr("x", Math.max(-85, Math.min(85, d3.event.x)));
        ace_change(num);

        answerText = "Ace:";
    }
    ;
}


// append button


// function preset
ace_arrows();
var time = setInterval("arrows()", 1000);

// setting
function translation(x, y) {
    return 'translate(' + x + ',' + y + ')';
}
</script>


<script type="text/javascript">
// reference
// http://www.theguardian.com

var w = 200,
    h = 125,
    pad = 0, radius = 10;

var svg = d3.select("body")
    .append("svg")
    .attr("transform","translate(" + -150 +"," +150 + ")")
    .attr({width: w, height: h, id: "return_svg"});


var center = svg.append("g")
    .attr("transform", translation(w / 2, h / 2));

center.append("text")
    .attr("x", -100)
    .attr("y", 50)
    .text("Return");
// .on("click",function(){   // onclick function
//
//     if(flag_dragged==true){ d3.select(this).remove();
//         center.append("text").attr({
//             x:0,
//             y:75
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","50px")
//             .style("fill","#ccc").text(answerText).attr("text-anchor", "middle") ;
//         d3.select("#circle1").attr("r",radius2).style("fill","orange");
//
//
//
//         center.append("text").attr({
//             x:-50,
//             y:50,
//             id:"answer"
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","30px")
//             .style("fill","#ccc").text(Math.round(xscale(-50))).attr("text-anchor", "middle") ;
//
//     }
// });


// drag object
var drag = d3.behavior.drag()
    .on("dragstart", start)
    .on("drag", return_dragmove);


// path
var point = [[-95, 0], [95, 0]];

var line = d3.svg.line()
    .x(function (d) {
        return d[0];
    })
    .y(function (d) {
        return d[1];
    });

center.append("path")
    .attr("d", line(point))
    .attr("id", "line");


// 0------------------100
center.append("text").attr({
    x: -85,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("0").attr("text-anchor", "end");


//100
center.append("text").attr({
    x: 80,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("1.0").attr("text-anchor", "start");


// arrows function

function arrows() {
    d3.select("#return_arrow1")
        .transition().duration(500)
        .attr("points", "-30,-10 -40,0 -30,10 ")
        .transition().duration(500)
        .attr("points", "-25,-10 -35,0 -25,10 ");

    d3.select("#return_arrow2")
        .transition().duration(500)
        .attr("points", "30,-10 40,0 30,10 ")
        .transition().duration(500)
        .attr("points", "25,-10 35,0 25,10 ");
}


// circle
center.append("circle")
    .attr("r", radius)
    .attr("cx", 0)
    .attr("id", "circle1")
    .attr("cy", 0)
    .style({fill: "yellow"})
    .call(drag);


//scale
var xscale = d3.scale.linear().domain([-90, 90]).range([0, 1]);

// text drag value
center.append("text").attr({
    x: 0,
    y: -30,
    id: "return_text"
})
    .style("font-family", "sans-serif")
    .style("font-size", "25px")
    .style("fill", "#ccc").text("0.5").attr("text-anchor", "middle");


//polyline *2
center.append("polyline")
    .attr("id", "return_arrow1")
    .attr("points", "-25,-10 -35,0 -25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


center.append("polyline")
    .attr("points", "25,-10 35,0 25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("id", "return_arrow2")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


// function & flag
var return_flag_dragged = false;

// function dragstart

function start() {
    if (return_flag_dragged == false) {
        return_flag_dragged = true;
        clearInterval(time);
        d3.select("#return_arrow1")//.transition().delay(10)
            .remove();
        d3.select("#return_arrow2")//.transition().delay(10)
            .remove();

    }

}

//function dragmove

var answerText;

function return_dragmove(d) {
    if (return_flag_dragged == true) {
        d3.select(this)
            .attr("cx", Math.max(-90, Math.min(90, d3.event.x)));
        var num = Math.max(0, Math.min(1, Math.round(xscale(d3.event.x) * 100) / 100));

        d3.select("#return_text").text(num).attr("x", Math.max(-75, Math.min(75, d3.event.x)));
        return_change(num);

    }
    ;
}


// append button


// function preset
arrows();
var time = setInterval("arrows()", 1000);

// setting
function translation(x, y) {
    return 'translate(' + x + ',' + y + ')';
}
</script>



<!--Break-->
<script type="text/javascript">
// reference
// http://www.theguardian.com

var w = 200,
    h = 125,
    pad = 0, radius = 10;

var svg = d3.select("body")
    .append("svg")
    .attr("transform","translate(" + -350 +"," +250 + ")")
    .attr({width: w, height: h, id: "break_svg"});


var center = svg.append("g")
    .attr("transform", translation(w / 2, h / 2));

center.append("text")
    .attr("x", -100)
    .attr("y", 50)
    .text("Break");
// .on("click",function(){   // onclick function
//
//     if(flag_dragged==true){ d3.select(this).remove();
//         center.append("text").attr({
//             x:0,
//             y:75
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","50px")
//             .style("fill","#ccc").text(answerText).attr("text-anchor", "middle") ;
//         d3.select("#circle1").attr("r",radius2).style("fill","orange");
//
//
//
//         center.append("text").attr({
//             x:-50,
//             y:50,
//             id:"answer"
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","30px")
//             .style("fill","#ccc").text(Math.round(xscale(-50))).attr("text-anchor", "middle") ;
//
//     }
// });


// drag object
var drag = d3.behavior.drag()
    .on("dragstart", break_start)
    .on("drag", break_dragmove);


// path
var point = [[-95, 0], [95, 0]];

var line = d3.svg.line()
    .x(function (d) {
        return d[0];
    })
    .y(function (d) {
        return d[1];
    });

center.append("path")
    .attr("d", line(point))
    .attr("id", "line");


// 0------------------100
center.append("text").attr({
    x: -85,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("0%").attr("text-anchor", "end");


//100
center.append("text").attr({
    x: 80,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("100%").attr("text-anchor", "start");


// arrows function

function break_arrows() {
    d3.select("#break_arrow1")
        .transition().duration(500)
        .attr("points", "-30,-10 -40,0 -30,10 ")
        .transition().duration(500)
        .attr("points", "-25,-10 -35,0 -25,10 ");

    d3.select("#break_arrow2")
        .transition().duration(500)
        .attr("points", "30,-10 40,0 30,10 ")
        .transition().duration(500)
        .attr("points", "25,-10 35,0 25,10 ");
}


// circle
center.append("circle")
    .attr("r", radius)
    .attr("cx", 0)
    .attr("id", "circle1")
    .attr("cy", 0)
    .style({fill: "yellow"})
    .call(drag);


//scale
var xscale = d3.scale.linear().domain([-90, 90]).range([0, 1]);

// text drag value
center.append("text").attr({
    x: 0,
    y: -30,
    id: "break_text"
})
    .style("font-family", "sans-serif")
    .style("font-size", "25px")
    .style("fill", "#ccc").text("0.5").attr("text-anchor", "middle");


//polyline *2
center.append("polyline")
    .attr("id", "break_arrow1")
    .attr("points", "-25,-10 -35,0 -25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


center.append("polyline")
    .attr("points", "25,-10 35,0 25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("id", "break_arrow2")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


// function & flag
var break_flag_dragged = false;

// function dragstart

function break_start() {
    if (break_flag_dragged == false) {
        break_flag_dragged = true;
        clearInterval(time);
        d3.select("#break_arrow1")//.transition().delay(10)
            .remove();
        d3.select("#break_arrow2")//.transition().delay(10)
            .remove();

    }

}

//function dragmove

var answerText;

function break_dragmove(d) {
    if (break_flag_dragged == true) {
        d3.select(this)
            .attr("cx", Math.max(-90, Math.min(90, d3.event.x)));
        var num = Math.max(0, Math.min(1, Math.round(xscale(d3.event.x) * 100) / 100));

        d3.select("#break_text").text(num).attr("x", Math.max(-75, Math.min(75, d3.event.x)));
        break_change(num);

    }
    ;
}


// append button


// function preset
break_arrows();
var time = setInterval("break_arrows()", 1000);

// setting
function translation(x, y) {
    return 'translate(' + x + ',' + y + ')';
}
</script>


<!--double-->
<script type="text/javascript">

// reference
// http://www.theguardian.com

var w = 200,
    h = 125,
    pad = 0, radius = 10;

var svg = d3.select("body")
    .append("svg")
    .attr("transform","translate(" + -550 +"," +350 + ")")
    .attr({width: w, height: h, id: "double_svg"});


var center = svg.append("g")
    .attr("transform", translation(w / 2, h / 2));

center.append("text")
    .attr("x", -100)
    .attr("y", 50)
    .text("Double");
// .on("click",function(){   // onclick function
//
//     if(flag_dragged==true){ d3.select(this).remove();
//         center.append("text").attr({
//             x:0,
//             y:75
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","50px")
//             .style("fill","#ccc").text(answerText).attr("text-anchor", "middle") ;
//         d3.select("#circle1").attr("r",radius2).style("fill","orange");
//
//
//
//         center.append("text").attr({
//             x:-50,
//             y:50,
//             id:"answer"
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","30px")
//             .style("fill","#ccc").text(Math.round(xscale(-50))).attr("text-anchor", "middle") ;
//
//     }
// });


// drag object
var drag = d3.behavior.drag()
    .on("dragstart", double_start)
    .on("drag", double_dragmove);


// function change_value() {
//     ace_change(num);
//
// }


// path
var point = [[-90, 0], [90, 0]];

var line = d3.svg.line()
    .x(function (d) {
        return d[0];
    })
    .y(function (d) {
        return d[1];
    });

center.append("path")
    .attr("d", line(point))
    .attr("id", "line");


// 0------------------100
center.append("text").attr({
    x: -85,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("0").attr("text-anchor", "end");


//100
center.append("text").attr({
    x: 85,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("25").attr("text-anchor", "start");


// arrows function

function double_arrows() {
    d3.select("#double_arrow1")
        .transition().duration(500)
        .attr("points", "-30,-10 -40,0 -30,10 ")
        .transition().duration(500)
        .attr("points", "-25,-10 -35,0 -25,10 ");

    d3.select("#double_arrow2")
        .transition().duration(500)
        .attr("points", "30,-10 40,0 30,10 ")
        .transition().duration(500)
        .attr("points", "25,-10 35,0 25,10 ");
}


// circle
center.append("circle")
    .attr("r", radius)
    .attr("cx", 0)
    .attr("id", "circle1")
    .attr("cy", 0)
    .style({fill: "yellow"})
    .call(drag);


//scale
var double_xscale = d3.scale.linear().domain([-90, 90]).range([0, 25]);

// text drag value
center.append("text").attr({
    x: 0,
    y: -30,
    id: "double_text"
})
    .style("font-family", "sans-serif")
    .style("font-size", "25px")
    .style("fill", "#ccc").text("13").attr("text-anchor", "middle");


//polyline *2
center.append("polyline")
    .attr("id", "double_arrow1")
    .attr("points", "-25,-10 -35,0 -25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


center.append("polyline")
    .attr("points", "25,-10 35,0 25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("id", "double_arrow2")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


// function & flag
var double_flag_dragged = false;

// function dragstart

function double_start() {
    if (double_flag_dragged == false) {
        double_flag_dragged = true;
        clearInterval(time);
        d3.select("#double_arrow1")//.transition().delay(10)
            .remove();
        d3.select("#double_arrow2")//.transition().delay(10)
            .remove();

    }

}

//function dragmove

var answerText;
var num = 0;

function double_dragmove(d) {
    if (double_flag_dragged == true) {
        d3.select(this)
            .attr("cx", Math.max(-90, Math.min(90, d3.event.x)));
        var num = Math.max(0, Math.min(25, Math.round(double_xscale(d3.event.x))));

        d3.select("#double_text").text(num).attr("x", Math.max(-85, Math.min(85, d3.event.x)));
        double_change(num);

    }
    ;
}


// append button


// function preset
double_arrows();
var time = setInterval("double_arrows()", 1000);

// setting
function translation(x, y) {
    return 'translate(' + x + ',' + y + ')';
}
</script>

<!--Error-->
<script type="text/javascript">

// reference
// http://www.theguardian.com

var w = 200,
    h = 125,
    pad = 0, radius = 10;

var svg = d3.select("body")
    .append("svg")
    .attr("transform","translate(" + 550 +"," +50 + ")")
    .attr({width: w, height: h, id: "error_svg"});


var center = svg.append("g")
    .attr("transform", translation(w / 2, h / 2));

center.append("text")
    .attr("x", -100)
    .attr("y", 50)
    .text("Error");
// .on("click",function(){   // onclick function
//
//     if(flag_dragged==true){ d3.select(this).remove();
//         center.append("text").attr({
//             x:0,
//             y:75
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","50px")
//             .style("fill","#ccc").text(answerText).attr("text-anchor", "middle") ;
//         d3.select("#circle1").attr("r",radius2).style("fill","orange");
//
//
//
//         center.append("text").attr({
//             x:-50,
//             y:50,
//             id:"answer"
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","30px")
//             .style("fill","#ccc").text(Math.round(xscale(-50))).attr("text-anchor", "middle") ;
//
//     }
// });


// drag object
var drag = d3.behavior.drag()
    .on("dragstart", error_start)
    .on("drag", error_dragmove);


// function change_value() {
//     ace_change(num);
//
// }


// path
var point = [[-90, 0], [90, 0]];

var line = d3.svg.line()
    .x(function (d) {
        return d[0];
    })
    .y(function (d) {
        return d[1];
    });

center.append("path")
    .attr("d", line(point))
    .attr("id", "line");


// 0------------------100
center.append("text").attr({
    x: -85,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("0%").attr("text-anchor", "end");


//100
center.append("text").attr({
    x: 85,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("100%").attr("text-anchor", "start");


// arrows function

function error_arrows() {
    d3.select("#error_arrow1")
        .transition().duration(500)
        .attr("points", "-30,-10 -40,0 -30,10 ")
        .transition().duration(500)
        .attr("points", "-25,-10 -35,0 -25,10 ");

    d3.select("#error_arrow2")
        .transition().duration(500)
        .attr("points", "30,-10 40,0 30,10 ")
        .transition().duration(500)
        .attr("points", "25,-10 35,0 25,10 ");
}


// circle
center.append("circle")
    .attr("r", radius)
    .attr("cx", 0)
    .attr("id", "circle1")
    .attr("cy", 0)
    .style({fill: "yellow"})
    .call(drag);


//scale
var error_xscale = d3.scale.linear().domain([-90, 90]).range([0, 100]);

// text drag value
center.append("text").attr({
    x: 0,
    y: -30,
    id: "error_text"
})
    .style("font-family", "sans-serif")
    .style("font-size", "25px")
    .style("fill", "#ccc").text("50%").attr("text-anchor", "middle");


//polyline *2
center.append("polyline")
    .attr("id", "error_arrow1")
    .attr("points", "-25,-10 -35,0 -25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


center.append("polyline")
    .attr("points", "25,-10 35,0 25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("id", "error_arrow2")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


// function & flag
var error_flag_dragged = false;

// function dragstart

function error_start() {
    if (error_flag_dragged == false) {
        error_flag_dragged = true;
        clearInterval(time);
        d3.select("#error_arrow1")//.transition().delay(10)
            .remove();
        d3.select("#error_arrow2")//.transition().delay(10)
            .remove();

    }

}

//function dragmove

var answerText;
var num = 0;

function error_dragmove(d) {
    if (error_flag_dragged == true) {
        d3.select(this)
            .attr("cx", Math.max(-90, Math.min(90, d3.event.x)));
        var num = Math.max(0, Math.min(100, Math.round(error_xscale(d3.event.x))));

        d3.select("#error_text").text(num).attr("x", Math.max(-85, Math.min(85, d3.event.x)));
        error_change(num);

    }
    ;
}


// append button


// function preset
error_arrows();
var time = setInterval("error_arrows()", 1000);

// setting
function translation(x, y) {
    return 'translate(' + x + ',' + y + ')';
}
</script>

<!--FirstPointWon-->
<script type="text/javascript">

// reference
// http://www.theguardian.com

var w = 200,
    h = 125,
    pad = 0, radius = 10;

var svg = d3.select("body")
    .append("svg")
    .attr("transform","translate(" + 300 +"," +150 + ")")
    .attr({width: w, height: h, id: "firstpoint_svg"});


var center = svg.append("g")
    .attr("transform", translation(w / 2, h / 2));

center.append("text")
    .attr("x", -100)
    .attr("y", 50)
    .text("First Point ");
// .on("click",function(){   // onclick function
//
//     if(flag_dragged==true){ d3.select(this).remove();
//         center.append("text").attr({
//             x:0,
//             y:75
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","50px")
//             .style("fill","#ccc").text(answerText).attr("text-anchor", "middle") ;
//         d3.select("#circle1").attr("r",radius2).style("fill","orange");
//
//
//
//         center.append("text").attr({
//             x:-50,
//             y:50,
//             id:"answer"
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","30px")
//             .style("fill","#ccc").text(Math.round(xscale(-50))).attr("text-anchor", "middle") ;
//
//     }
// });


// drag object
var drag = d3.behavior.drag()
    .on("dragstart", firstpoint_start)
    .on("drag", firstpoint_dragmove);


// function change_value() {
//     ace_change(num);
//
// }


// path
var point = [[-90, 0], [90, 0]];

var line = d3.svg.line()
    .x(function (d) {
        return d[0];
    })
    .y(function (d) {
        return d[1];
    });

center.append("path")
    .attr("d", line(point))
    .attr("id", "line");


// 0------------------100
center.append("text").attr({
    x: -85,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("0%").attr("text-anchor", "end");


//100
center.append("text").attr({
    x: 85,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("100%").attr("text-anchor", "start");


// arrows function

function firstpoint_arrows() {
    d3.select("#firstpoint_arrow1")
        .transition().duration(500)
        .attr("points", "-30,-10 -40,0 -30,10 ")
        .transition().duration(500)
        .attr("points", "-25,-10 -35,0 -25,10 ");

    d3.select("#firstpoint_arrow2")
        .transition().duration(500)
        .attr("points", "30,-10 40,0 30,10 ")
        .transition().duration(500)
        .attr("points", "25,-10 35,0 25,10 ");
}


// circle
center.append("circle")
    .attr("r", radius)
    .attr("cx", 0)
    .attr("id", "circle1")
    .attr("cy", 0)
    .style({fill: "yellow"})
    .call(drag);


//scale
var firstpoint_xscale = d3.scale.linear().domain([-90, 90]).range([0, 100]);

// text drag value
center.append("text").attr({
    x: 0,
    y: -30,
    id: "firstpoint_text"
})
    .style("font-family", "sans-serif")
    .style("font-size", "25px")
    .style("fill", "#ccc").text("50%").attr("text-anchor", "middle");


//polyline *2
center.append("polyline")
    .attr("id", "firstpoint_arrow1")
    .attr("points", "-25,-10 -35,0 -25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


center.append("polyline")
    .attr("points", "25,-10 35,0 25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("id", "firstpoint_arrow2")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


// function & flag
var firstpoint_flag_dragged = false;

// function dragstart

function firstpoint_start() {
    if (firstpoint_flag_dragged == false) {
        firstpoint_flag_dragged = true;
        clearInterval(time);
        d3.select("#firstpoint_arrow1")//.transition().delay(10)
            .remove();
        d3.select("#firstpoint_arrow2")//.transition().delay(10)
            .remove();

    }

}

//function dragmove

var answerText;
var num = 0;

function firstpoint_dragmove(d) {
    if (firstpoint_flag_dragged == true) {
        d3.select(this)
            .attr("cx", Math.max(-90, Math.min(90, d3.event.x)));
        var num = Math.max(0, Math.min(100, Math.round(firstpoint_xscale(d3.event.x))));

        d3.select("#firstpoint_text").text(num).attr("x", Math.max(-85, Math.min(85, d3.event.x)));
        console.log("Inside first point change");
        console.log(num);
        num = num / 100;
        firstpoint_change(num);

    }
    ;
}


// append button


// function preset
firstpoint_arrows();
var time = setInterval("firstpoint_arrows()", 1000);

// setting
function translation(x, y) {
    return 'translate(' + x + ',' + y + ')';
}
</script>

<!--SecondPointWon-->
<script type="text/javascript">

// reference
// http://www.theguardian.com

var w = 200,
    h = 125,
    pad = 0, radius = 10;

var svg = d3.select("body")
    .append("svg")
    .attr("transform","translate(" + 1320 +"," -50 + ")")
    .attr({width: w, height: h, id: "secondpoint_svg"});


var center = svg.append("g")
    .attr("transform", translation(w / 2, h / 2));

center.append("text")
    .attr("x", -100)
    .attr("y", 50)
    .text("Second Point ");
// .on("click",function(){   // onclick function
//
//     if(flag_dragged==true){ d3.select(this).remove();
//         center.append("text").attr({
//             x:0,
//             y:75
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","50px")
//             .style("fill","#ccc").text(answerText).attr("text-anchor", "middle") ;
//         d3.select("#circle1").attr("r",radius2).style("fill","orange");
//
//
//
//         center.append("text").attr({
//             x:-50,
//             y:50,
//             id:"answer"
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","30px")
//             .style("fill","#ccc").text(Math.round(xscale(-50))).attr("text-anchor", "middle") ;
//
//     }
// });


// drag object
var drag = d3.behavior.drag()
    .on("dragstart", secondpoint_start)
    .on("drag", secondpoint_dragmove);


// function change_value() {
//     ace_change(num);
//
// }


// path
var point = [[-90, 0], [90, 0]];

var line = d3.svg.line()
    .x(function (d) {
        return d[0];
    })
    .y(function (d) {
        return d[1];
    });

center.append("path")
    .attr("d", line(point))
    .attr("id", "line");


// 0------------------100
center.append("text").attr({
    x: -85,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("0%").attr("text-anchor", "end");


//100
center.append("text").attr({
    x: 85,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("100%").attr("text-anchor", "start");


// arrows function

function secondpoint_arrows() {
    d3.select("#secondpoint_arrow1")
        .transition().duration(500)
        .attr("points", "-30,-10 -40,0 -30,10 ")
        .transition().duration(500)
        .attr("points", "-25,-10 -35,0 -25,10 ");

    d3.select("#secondpoint_arrow2")
        .transition().duration(500)
        .attr("points", "30,-10 40,0 30,10 ")
        .transition().duration(500)
        .attr("points", "25,-10 35,0 25,10 ");
}


// circle
center.append("circle")
    .attr("r", radius)
    .attr("cx", 0)
    .attr("id", "circle1")
    .attr("cy", 0)
    .style({fill: "yellow"})
    .call(drag);


//scale
var secondpoint_xscale = d3.scale.linear().domain([-90, 90]).range([0, 100]);

// text drag value
center.append("text").attr({
    x: 0,
    y: -30,
    id: "secondpoint_text"
})
    .style("font-family", "sans-serif")
    .style("font-size", "25px")
    .style("fill", "#ccc").text("50%").attr("text-anchor", "middle");


//polyline *2
center.append("polyline")
    .attr("id", "secondpoint_arrow1")
    .attr("points", "-25,-10 -35,0 -25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


center.append("polyline")
    .attr("points", "25,-10 35,0 25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("id", "secondpoint_arrow2")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


// function & flag
var secondpoint_flag_dragged = false;

// function dragstart

function secondpoint_start() {
    if (secondpoint_flag_dragged == false) {
        secondpoint_flag_dragged = true;
        clearInterval(time);
        d3.select("#secondpoint_arrow1")//.transition().delay(10)
            .remove();
        d3.select("#secondpoint_arrow2")//.transition().delay(10)
            .remove();

    }

}

//function dragmove

var answerText;
var num = 0;

function secondpoint_dragmove(d) {
    if (secondpoint_flag_dragged == true) {
        d3.select(this)
            .attr("cx", Math.max(-90, Math.min(90, d3.event.x)));
        var num = Math.max(0, Math.min(100, Math.round(secondpoint_xscale(d3.event.x))));

        d3.select("#secondpoint_text").text(num).attr("x", Math.max(-85, Math.min(85, d3.event.x)));
        console.log("Inside first point change");
        console.log(num);
        num = num / 100;
        secondpoint_change(num);

    }
    ;
}


// append button


// function preset
secondpoint_arrows();
var time = setInterval("secondpoint_arrows()", 1000);

// setting
function translation(x, y) {
    return 'translate(' + x + ',' + y + ')';
}
</script>


<!--Total-->
<script type="text/javascript">

// reference
// http://www.theguardian.com

var w = 200,
    h = 125,
    pad = 0, radius = 10;

var svg = d3.select("body")
    .append("svg")
    .attr("transform","translate(" + 800 +"," +100 + ")")
    .attr({width: w, height: h, id: "total_svg"});


var center = svg.append("g")
    .attr("transform", translation(w / 2, h / 2));

center.append("text")
    .attr("x", -100)
    .attr("y", 50)
    .text("total");
// .on("click",function(){   // onclick function
//
//     if(flag_dragged==true){ d3.select(this).remove();
//         center.append("text").attr({
//             x:0,
//             y:75
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","50px")
//             .style("fill","#ccc").text(answerText).attr("text-anchor", "middle") ;
//         d3.select("#circle1").attr("r",radius2).style("fill","orange");
//
//
//
//         center.append("text").attr({
//             x:-50,
//             y:50,
//             id:"answer"
//         })
//             .style("font-family","sans-serif")
//             .style("font-size","30px")
//             .style("fill","#ccc").text(Math.round(xscale(-50))).attr("text-anchor", "middle") ;
//
//     }
// });


// drag object
var drag = d3.behavior.drag()
    .on("dragstart", total_start)
    .on("drag", total_dragmove);


// function change_value() {
//     ace_change(num);
//
// }


// path
var point = [[-90, 0], [90, 0]];

var line = d3.svg.line()
    .x(function (d) {
        return d[0];
    })
    .y(function (d) {
        return d[1];
    });

center.append("path")
    .attr("d", line(point))
    .attr("id", "line");


// 0------------------100
center.append("text").attr({
    x: -85,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("0").attr("text-anchor", "end");


//100
center.append("text").attr({
    x: 85,
    y: -5,
    id: ""
})
    .style("font-family", "sans-serif")
    .style("font-size", "15px")
    .style("fill", "#ccc").text("220").attr("text-anchor", "start");


// arrows function

function total_arrows() {
    d3.select("#total_arrow1")
        .transition().duration(500)
        .attr("points", "-30,-10 -40,0 -30,10 ")
        .transition().duration(500)
        .attr("points", "-25,-10 -35,0 -25,10 ");

    d3.select("#total_arrow2")
        .transition().duration(500)
        .attr("points", "30,-10 40,0 30,10 ")
        .transition().duration(500)
        .attr("points", "25,-10 35,0 25,10 ");
}


// circle
center.append("circle")
    .attr("r", radius)
    .attr("cx", 0)
    .attr("id", "circle1")
    .attr("cy", 0)
    .style({fill: "yellow"})
    .call(drag);


//scale
var total_xscale = d3.scale.linear().domain([-90, 90]).range([0, 220]);

// text drag value
center.append("text").attr({
    x: 0,
    y: -30,
    id: "total_text"
})
    .style("font-family", "sans-serif")
    .style("font-size", "25px")
    .style("fill", "#ccc").text("110").attr("text-anchor", "middle");


//polyline *2
center.append("polyline")
    .attr("id", "total_arrow1")
    .attr("points", "-25,-10 -35,0 -25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


center.append("polyline")
    .attr("points", "25,-10 35,0 25,10 ")
    .attr("stroke", "blue")
    .attr("fill", "none")
    .attr("id", "total_arrow2")
    .attr("stroke-width", 3)
    .attr("opacity", .6);


// function & flag
var total_flag_dragged = false;

// function dragstart

function total_start() {
    if (total_flag_dragged == false) {
        total_flag_dragged = true;
        clearInterval(time);
        d3.select("#total_arrow1")//.transition().delay(10)
            .remove();
        d3.select("#total_arrow2")//.transition().delay(10)
            .remove();

    }

}

//function dragmove

var answerText;
var num = 0;

function total_dragmove(d) {
    if (total_flag_dragged == true) {
        d3.select(this)
            .attr("cx", Math.max(-90, Math.min(90, d3.event.x)));
        var num = Math.max(0, Math.min(220, Math.round(total_xscale(d3.event.x))));

        d3.select("#total_text").text(num).attr("x", Math.max(-85, Math.min(85, d3.event.x)));
        console.log("Inside first point change");
        console.log(num);
        total_change(num);

    }
    ;
}


// append button


// function preset
total_arrows();
var time = setInterval("total_arrows()", 1000);

// setting
function translation(x, y) {
    return 'translate(' + x + ',' + y + ')';
}
</script>



<script src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script>
    <script src="draw_aster.js"></script>
    <script src="change_value.js"></script>
    <script type="text/javascript"></script>

    </body>
    </html>
