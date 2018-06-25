function remove_aster() {
    d3.select("#aster").remove();
}
$.ajax({
    url: './aster_data.csv',
    dataType: 'text',
}).done(successFunction);
var allRowsData = new Array();
var allRows = new Array();
var original_data = [];
function successFunction(data) {
    console.log("In success");
    console.log(data);
    original_data= data;
    console.log(original_data);
    make_aster(original_data);
}
make_aster();