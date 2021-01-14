$(document).ready(function () {
    var element = $('.header_in nav ul li, .section_nav ul li, .footer_in button');
    var length = element.length;
    element.find('a').click(function (e) {
        e.preventDefault();
        var src = $(this).data('src');
        var off_top = $(src).offset().top - $('.header').height();
        $('html , body').stop().animate({
            scrollTop: off_top + 'px'
        }, 2000);
    })
    $(window).scroll(function () {
        var scroll = $('html, body').scrollTop() + $('.header').height();
        if (scroll >= $('section').eq(5).offset().top) {
            ind = 5
        }
        else if (scroll >= $('section').eq(4).offset().top) {
            ind = 4
        }
        else if (scroll >= $('section').eq(3).offset().top) {
            ind = 3
        }
        else if (scroll >= $('section').eq(2).offset().top) {
            ind = 2
        }
        else if (scroll >= $('section').eq(1).offset().top) {
            ind = 1
        }
        else {
            ind = 0
        }
        $('.header_in nav ul li').eq(ind).find('a').addClass('nav_top_color').parent().siblings().find('a').removeClass('nav_top_color');
        $('.section_nav ul li').eq(ind).find('a span').addClass('nav_right_color').parents('li').siblings().find('span').removeClass('nav_right_color');
    
        //bg image
        var scroll_Y = $(window).scrollTop();
        if(scroll_Y >= $('.barber_image').height()-$('.header').height()){
        $('.barber_image video').trigger('pause');
        }
		else{
			$('.barber_image video').trigger('play')
		}
    });
});