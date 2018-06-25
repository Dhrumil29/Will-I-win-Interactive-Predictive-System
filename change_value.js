function ace_change(num) {
    var win = 0;
    d3.csv('ace.csv', function (error, ace_data) {

        ace_data.forEach(function (d) {
            if (num > d.minimum && num < d.maximum) {
                win = +d.win;
                win = win * 100;
                console.log(global_data);
                change_global("ACE", win);
            }

        });

    });
    // console.log(win);
}
function break_change(num) {
    var win = 0;
    d3.csv('break.csv', function (error, ace_data) {

        ace_data.forEach(function (d) {
            if (num > d.minimum && num < d.maximum) {
                win = +d.win;
                win = win * 100;
                console.log(global_data);
                change_global("BREAK", win);
            }

        });

    });
    // console.log(win);
}
function change_global(attribute,pwin) {
    console.log(global_data);
    //d3.select("body").select(".aster").remove();
    global_data.forEach(function (d) {
        if (d.id == attribute){
            d.score = pwin;
            make_aster();
        }
    });
    console.log("After update");
    console.log(global_data);

}
//make_aster(global_data);

function double_change(num) {
    var win = 0;
    d3.csv('double.csv', function (error, ace_data) {

        ace_data.forEach(function (d) {
            if (num > d.minimum && num < d.maximum) {
                win = +d.win;
                win = win * 100;
                console.log(global_data);
                change_global("DOUBLE", win);
            }

        });

    });
    // console.log(win);
}
function return_change(num) {
    var win = 0;
    d3.csv('return.csv', function (error, ace_data) {

        ace_data.forEach(function (d) {
            if (num > d.minimum && num < d.maximum) {
                win = +d.win;
                win = win * 100;
                console.log(global_data);
                change_global("RETURN", win);
            }

        });

    });
    // console.log(win);
}
function error_change(num) {
    var win = 0;
    d3.csv('error.csv', function (error, ace_data) {

        ace_data.forEach(function (d) {
            if (num > d.minimum && num < d.maximum) {
                win = +d.win;
                win = win * 100;
                console.log(global_data);
                change_global("ERROR", win);
            }

        });

    });
    // console.log(win);
}
function firstpoint_change(num){
    var win = 0;
    d3.csv('firstPointWon.csv', function (error, ace_data) {

        ace_data.forEach(function (d) {
            if (num > d.minimum && num < d.maximum) {
                win = +d.win;
                win = win * 100;
                console.log(global_data);
                change_global("FIRSTPOINTWON", win);
            }

        });

    });
    // console.log(win);
}
function secondpoint_change(num){
    var win = 0;
    d3.csv('secPointWon.csv', function (error, ace_data) {

        ace_data.forEach(function (d) {
            if (num > d.minimum && num < d.maximum) {
                win = +d.win;
                win = win * 100;
                console.log(global_data);
                change_global("SECONDPOINTWON", win);
            }

        });

    });
    // console.log(win);
}
function total_change(num){
    var win = 0;
    d3.csv('total.csv', function (error, ace_data) {

        ace_data.forEach(function (d) {
            if (num > d.minimum && num < d.maximum) {
                win = +d.win;
                win = win * 100;
                console.log(global_data);
                change_global("TOTAL", win);
            }

        });

    });
    // console.log(win);
}