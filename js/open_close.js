function open_chat_icon() {
    $('.chat').css('bottom', 0);
}
function close_me() {
    $('.chat').css('bottom', -($('.chat').height()));
}
$(document).ready(function () {
    //navigation
    $('.nav_resp button').click(function(){
        if($(this).hasClass('resp_btn')){
        $(this).removeClass('resp_btn');
        }
        else{
        $(this).addClass('resp_btn');
        }
        $('.header_in nav').slideToggle();
    })



	$('.shop_close').click(function(){
    $(this).parents('.shop_list').css('display','none')
})
	
    $('.header_in nav ul li').click(function(){
        if($(window).width() < 850){
       $('.nav_resp').find('button').trigger('click');
        }
    })


    //services faq

    $('.services_list').click(function(){
        about=$(this).parent().find('.services_about');
        $(this).parent().siblings().find('.services_about').fadeOut(0)
        about.fadeToggle(1000);
    })

    //card open
});