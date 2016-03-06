'use strict';
var last_case = null;
var direction = [1, 0];
$(function(){

    $.getJSON("grille_ex.json", function(data){
        gen_grille(data);
    });
    
    alert($(".case")[0]);
    $(".case").click(function(){
        change_selection($(this));
    });
    $(window).keypress(function(event){
        var current_selection_id = $(".selected").attr("id").split("-");
        if(event.keyCode >= 37 && event.keyCode <=40){
            switch(event.keyCode){
                //left
                case 37:
                    change_selection(
                        $("#" + (current_selection_id[0] - 1) +
                         "-" + current_selection_id[1]) );
                break;
                //up
                case 38:
                    change_selection(
                        $("#" + current_selection_id[0] +
                         "-" + (current_selection_id[1] - 1)));
                break;
                //right
                case 39:
                    change_selection(
                        $("#" + (+current_selection_id[0] + 1) +
                         "-" + current_selection_id[1]));
                break;
                //down
                case 40:
                    change_selection(
                        $("#" + current_selection_id[0] +
                         "-" + (+(current_selection_id[1]) + 1)));
                break;
            }
        } else {
            var clef = String.fromCharCode(event.which).toUpperCase();
            if(clef == "?"){
                $(".selected").text($(".selected").attr("sol"));
                $(".selected").addClass("cheater");
                $(".selected").removeClass("wrong");
            } else if(/[a-z]/i.test(clef)){
                if(clef != $(".selected").attr("sol")){
                    $(".selected").addClass("wrong");
                } else {
                    $(".selected").removeClass("wrong");
                }
                $(".selected").text(clef);
            }
            change_selection(
                        $("#" + (+current_selection_id[0] + direction[0]) +
                         "-" + (+(current_selection_id[1]) + direction[1])));
        }
    });
});
var change_selection = function(new_select){
    if (!new_select[0]) {
        return;
    }
    if (new_select.hasClass("noire")){
            return;
        }
        $(last_case).removeClass("selected");
        new_select.addClass("selected");
        last_case = new_select;
}
var gen_grille = function(data){
    data["diagram"].forEach(function(row, j){
        $("#grille").find("tbody").append('<tr id="row' + j + '"></tr>');
        row.split("").forEach(function(charact, i){
            var cell_html = '<td id="' + i + "-" + j + '" class="case';
            cell_html += (charact == ".") ? " noire\"" : "\"";
            cell_html += (data["numbers"][j][i] != 0) ? " num=\"" + data["numbers"][j][i] + "\" " : "";
            cell_html += ' sol="'+data["solution"][j][i] + '" ';
            cell_html += "></td>";
            $("#row" + j).append(cell_html);
        });
    });
    return;
}
