'use strict';
var last_case = null;
var direction = [1, 0];
var start = null;
$(function(){
    //Remove default behaviors of some keys.
    $(window).keypress(function(event) {
        // arrows and backspace + space...
        if(($.inArray(event.keyCode, [37, 38, 39, 40, 8]) + 1) || event.which == 32) {
            event.preventDefault();
        }
    });
    $("select").change(function(event) {
        $("tbody").remove();
        $("table").append("<tbody></tbody>");
        $(".indice").remove();
        $.getJSON($(":selected").attr("value"), grid_ajax_callback);
    });
    $.getJSON($(":selected").attr("value"), grid_ajax_callback);

});

function grid_ajax_callback(data){
    gen_grille(data);
    bind_events();
    start = $.now();
    $('#other-wrapper > *').height($('#grille').height());
}

function change_selection(new_select){

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

    change_clue_selection();

    select_word();
}
// changes the clue selection from old to new
function change_clue_selection() {
    var orientation = (direction[0] == 1) ? "h": "v";
    var num = find_num();
    $(".indice").removeClass("selected");
    $('.indice.' + orientation + '[num="' + num + '"]').addClass("selected");
}

//why do I need this TT_TT
function find_num(dir) {
    dir = dir || direction;
    var ij = $(".selected").attr("id").split("-").map(function(e) {return +e;});
    ij = get_word_beginning(ij[0], ij[1], dir);
    var num = map_cells(ij, dir, function(sel) {
        var orientation = (dir[0] == 1) ? "h": "v";
        return ($('.indice.' + orientation + '[num="' + sel.attr("num")).length) ? sel.attr("num"): null;
    }).filter(function(el) {return el != null;});
    return num[0];
}

function validate_word() {
    function valid(direction) {
        var ij = $(".selected").attr("id").split("-").map(function(e) {return +e;});
        ij = get_word_beginning(ij[0], ij[1], direction);
        var valid = map_cells(ij, direction, function(sel) {
            return ($("span",sel).text() == sel.attr("sol"));
        });
        var orientation = (direction[0] == 1) ? "h": "v";
        var num = find_num(direction);
        var indice = $('.indice.' + orientation + '[num="' + num + '"]');
        if ($.inArray(false, valid) == -1){
            indice.addClass("done");
        } else {
            indice.removeClass("done");
        }
    }
    valid([1,0]);
    valid([0,1]);
    if(!$(".indice:not(.done)").length){
        alert("félicitation, vous avez résolus la grille en "+ Math.round(($.now() - start) / 1000) + " secondes !!");
    }
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

function gen_grille(data) {
    data["diagram"].forEach(function(row, j) {
        $("#grille").find("tbody").append('<tr id="row' + j + '"></tr>');
        row.split("").forEach(function(charact, i) {
            var cell_html = '<td tabindex="0" id="' + i + "-" + j + '" class="case';
            cell_html += (charact == ".") ? ' noire"' : '"';
            cell_html += (data["numbers"][j][i] != 0) ? ' num="' + data["numbers"][j][i] + '" ' : '';
            cell_html += ' sol="'+data["solution"][j][i] + '" ';
            cell_html += "><span></span></td>";
            $("#row" + j).append(cell_html);
            if (data["numbers"][j][i] != 0) {
                $('#' + i + '-' + j).append('<p class="small-num">' + data["numbers"][j][i] + "</p>");
            }
        });
    });
    data["acrossClues"].forEach(function(h_clue, i) {
        var v_clue = data["downClues"][i];
        if(v_clue) {
            $("#v-list").append('<div class="indice v" num="' + (i+1) + '">' + (i+1) + '. ' + v_clue + '</li>');
        }
        if(h_clue) {
            $("#h-list").append('<div class="indice h" num="' + (i+1) + '">' + (i+1) + '. ' + h_clue + '</li>');
        }
    });
}

function invert_direction() {
    direction = direction.map(function(e) {return +!e;});
    change_clue_selection();
    select_word();
}

function change_letter(cell, letter) {
    if(letter != cell.attr("sol") && letter != ""){
        cell.addClass("wrong");
    } else {
        cell.removeClass("wrong");
    }
    cell.find("span").text(letter);
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
        var ind_orient = $(this).hasClass("h") ? "h" : "v";
        var orientation = (direction[0] == 1) ? "h": "v";
        //Change orientation if its not the same.
        if (!(ind_orient == orientation)){
            invert_direction();
        }
        change_selection($('.case[num="' + $(this).attr("num") + '"]'));
    });
    $(".case").keypress(function(event) {
        var current_selection_id = $(this).attr("id").split("-");
        event = event || window.event;
        if(event.keyCode >= 37 && event.keyCode <=40 || event.keyCode == 8){
            switch(event.keyCode){
                //backspace
                case 8:
                    if ($("span", this).text() != ""){
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
