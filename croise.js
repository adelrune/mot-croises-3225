var print = console.log;

$(function(){

    $.getJSON("grille_ex.json", function(data){
        gen_grille(data);
    });
    last_case = null;
    alert($(".case")[0]);
    $(".case").click(function(){
        if ($(this).hasClass("noire")){
            return;
        }
        $(last_case).removeClass("selected");
        $(this).addClass("selected");
        last_case = $(this);
    });
    alert("B");
    $(window).keypress(function(event){
        
        $(".selected").html(String.fromCharCode(event.which).toUpperCase());
    });
    alert("C");
});

var gen_grille = function(data){
    data["diagram"].forEach(function(row, j){
        $("#grille").find("tbody").append('<tr id="row' + j + '"></tr>');
        $("div").append("<p> aaaa </p>");
        row.split("").forEach(function(charact, i){
            var cell_html = '<td id="cell' + i + "," + j + '" class="case';
            cell_html += (charact == ".") ? " noire\"" : "\"";
            cell_html += (data["numbers"][j][i] != 0) ? " num=\"" + data["numbers"][j][i] + "\" " : "";
            cell_html += ' sol="'+data["solution"][j][i] + '" ';
            cell_html += "></td>";
            $("#row" + j).append(cell_html);
        });
    });
    alert("A");
    return;
}
