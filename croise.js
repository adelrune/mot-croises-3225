'use strict';
var last_case = null;
var direction = [1, 0];
$(function(){
    $(window).keypress(function(event) {
        // arrows and backspace + space...
        if(($.inArray(event.keyCode, [37, 38, 39, 40, 8]) + 1) || event.which == 32) {
            event.preventDefault();
        }
    });

    $.getJSON("grille_ex.json", function(data){
        gen_grille(data);
        bind_events();
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
        new_select.focus();
        last_case = new_select;
}

var gen_grille = function(data){
    data["diagram"].forEach(function(row, j){
        $("#grille").find("tbody").append('<tr id="row' + j + '"></tr>');
        row.split("").forEach(function(charact, i){
            var cell_html = '<td tabindex="0" id="' + i + "-" + j + '" class="case';
            cell_html += (charact == ".") ? " noire\"" : "\"";
            cell_html += (data["numbers"][j][i] != 0) ? " num=\"" + data["numbers"][j][i] + "\" " : "";
            cell_html += ' sol="'+data["solution"][j][i] + '" ';
            cell_html += "></td>";
            $("#row" + j).append(cell_html);
        });
    });
}

var invert_direction = function(){
    direction[0] = +!direction[0];
    direction[1] = +!direction[1];
}

var change_letter = function (cell, letter) {
    if(letter != cell.attr("sol") && letter != ""){
        cell.addClass("wrong");
    } else {
        cell.removeClass("wrong");
    }
    cell.text(letter);
}

var bind_events = function(){
    $(".case").click(function(){
        if ($(this).hasClass("selected")) {
            invert_direction();
        } else {
            change_selection($(this));
        }
    });
    $(".case").keypress(function(event){
        var current_selection_id = $(this).attr("id").split("-");
        event = event || window.event;
        if(event.keyCode >= 37 && event.keyCode <=40 || event.keyCode == 8){
            switch(event.keyCode){
                //backspace
                case 8:
                    console.log($(this).text());
                    if ($(this).text() != ""){
                        change_letter($(this), "");
                    } else {
                        console.log("pass");
                        change_selection(
                        $("#" + (current_selection_id[0] - direction[0]) +
                         "-" + ((current_selection_id[1]) - direction[1])));
                    }
                break;
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
                change_letter($(this), $(this).attr("sol"));
                $(this).addClass("cheater");
            } else if(clef == " ") {
                invert_direction();
                return;
            } else if(/[a-z]/i.test(clef)){
                change_letter($(this), clef);
            }
            change_selection(
                        $("#" + (+current_selection_id[0] + direction[0]) +
                         "-" + (+(current_selection_id[1]) + direction[1])));
        }
    });
}
