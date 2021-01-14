$(document).ready(function () {
    var like=[];
    var push_list;
    var check_color;
    var l_storage=window.localStorage;
    /*
    $('.image').on("dblclick",function(e){
       
    })
    */
    $('.image .button_share').click(function () {
        $(this).parent().find('ul').css({
            opacity: 1,
            display: 'block'
        });
        $(this).parent().find('button').css('display', 'none');
    });
    $(".image").contextmenu(function (e) {
        e.preventDefault();
    }
    );
    $('.image').mouseleave(function () {
        $(this).parent().find('ul').css({
            opacity: 0,
            display: 'none'
        });
        $(this).find('button').css('display', 'block');
    })
    $('.image').click(function (event) {
        if (event.target.parentElement.parentElement.nodeName != 'LI' && event.target.className != 'fa fa-share' && event.target.parentNode.className != 'button_share') {
            $(this).parent().find('ul').css({
                opacity: 0,
                display: 'none'
            });
        }
    })
});