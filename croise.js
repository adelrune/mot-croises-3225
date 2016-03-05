$(function(){
    last_case = null;
    $(".case").click(function(){
        if ($(this).hasClass("noire")){
            return;
        }
        $(last_case).removeClass("selected");
        $(this).addClass("selected");
        last_case = $(this);
        $(this).focus();
    });
    $(".selected").keyPress(function(event){
        $(this).html(event.which());
        alert("AAA");
    });
    

});
