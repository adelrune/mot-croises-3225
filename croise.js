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

function change_selection(new_select){
    if (!new_select[0]) {
        return;
    }
    if (new_select.hasClass("noire")){
            return;
    }
    $(last_case).removeClass("selected");
    new_select.addClass("selected");
    var current_indice = $('.indice[num="' + new_select.attr("num") + '"]');
    var last_indice = $('.indice[num="' + $(last_case).attr("num") + '"]');
    current_indice.addClass("selected");
    last_indice.removeClass("selected");
    new_select.focus();
    last_case = new_select;
    select_word();
}

function validate_word(){
    var ij = $(".selected").attr("id").split("-").map(function(e) {return +e;});
    ij = get_word_beginning(ij[0], ij[1], direction);
    var valid = map_cells(ij, direction, function(sel) {
        return (sel.text() == sel.attr("sol"));
    });
    console.log(valid);
}

function map_cells(ij, direction, fct) {
    var select = $('#' + ij[0] + '-' + ij[1]);
    var res = []
    while (select.length && !select.hasClass("noire")) {
        res.push(fct(select));
        ij[0] += +direction[0];
        ij[1] += +direction[1];
        select = $('#' + ij[0] + '-' + ij[1]);
    }
    return res;
}

function get_word_beginning(i, j, direction) {
    var ij = [i, j];
    direction = direction.map(function(e) {return -e});
    var cells_coord = map_cells(ij, direction, function(sel) {
        return sel.attr("id").split("-");
    });
    var beginning = cells_coord[cells_coord.length - 1].map(function(i) {return +i;});
    return beginning;
}

function select_word(){
    $(".case").each(function() {
        $(this).removeClass("semi-selected");
    });
    var ij = $(".selected").attr("id").split("-").map(function(e) {return +e;});
    ij = get_word_beginning(ij[0], ij[1], direction);
    map_cells(ij, direction, function(sel) {
        sel.addClass("semi-selected");
    });
}

var gen_grille = function(data){
    data["diagram"].forEach(function(row, j) {
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
    data["acrossClues"].forEach(function(h_clue, i) {
        var v_clue = data["downClues"][i];
        if(v_clue){
            $("#v-list").append('<div class="indice" num="' + (i+1) + '">' + (i+1) + '. ' + v_clue + '</li>');
        }
        if(h_clue){
            $("#h-list").append('<div class="indice" num="' + (i+1) + '">' + (i+1) + '. ' + h_clue + '</li>');
        }
    });
}

function invert_direction(){
    direction = direction.map(function(e) {return +!e;});
    select_word();
}

function change_letter(cell, letter) {
    if(letter != cell.attr("sol") && letter != ""){
        cell.addClass("wrong");
    } else {
        cell.removeClass("wrong");
    }
    cell.text(letter);
    validate_word();
}

function bind_events(){
    $(".case").click(function() {
        if ($(this).hasClass("selected")) {
            invert_direction();
        } else {
            change_selection($(this));
        }
    });
    $(".indice").click(function() {
        change_selection($('.case[num="' + $(this).attr("num") + '"]'));
    });
    $(".case").keypress(function(event) {
        var current_selection_id = $(this).attr("id").split("-");
        event = event || window.event;
        if(event.keyCode >= 37 && event.keyCode <=40 || event.keyCode == 8){
            switch(event.keyCode){
                //backspace
                case 8:
                    if ($(this).text() != ""){
                        change_letter($(this), "");
                    } else {
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
