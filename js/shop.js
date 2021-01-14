$(document).ready(function () {
    //shop in array

    //image database
    /*
    var shop = {
        images: ['shop1', 'shop2', 'shop3', 'shop4', 'shop5', 'shop6', 'shop7', 'shop8'],
        mark: ['$28.00', '$32.00', '$15.00', '$39.00', '$19.00', '$18.00', '$20.00', '$17.00'],
        name: ['Aftershave Cream', 'Shaving Brush', 'Bath Soap', 'Shaving Blade', 'Perfume', 'Shaving Blade 2', 'Shaving Blade 3', 'Cream']
    }
    */

    $('.shop_in ul > li div').mouseover(function () {
        $(this).find('a').stop().slideDown();
    })
    $('.shop_in ul > li div').mouseleave(function () {
        $(this).find('a').stop().slideUp();
    })
    $('.shop_in ul >li div a').click(function (e) {
        e.preventDefault();
        $('.shop_list_in span').click(function () {
            $(this).parents('.shop_list').css('display', 'none');
        })
        var image_src = $(this).parent().find('img').attr('src');
        $('.shop_list').css('display', 'block');
        $('.shop_list .shop_list_left img').remove();
        $('.shop_list .shop_list_left').append('<img src="">');
        $('.shop_list .shop_list_left img').attr('src', image_src);
        $('.shop_list .shop_list_right h2').text($(this).parents('li').find('h3').text());
        $('.shop_list .shop_list_right .sku span').text($(this).parents('li').index());
        $('.shop_list .shop_list_right > span').text($(this).parents('li').find('.mark').text())
        $('.shop_list_left img').addClass('shop_imgs');
    })
    $('.shop_bag').click(function () {
        $('.card').animate({
            right: 10
        }, 400);
        $('.title i').click(function () {
            $('.card').animate({
                right: -($('.card').width()) + 'px'
            }, 400);
        })
    })

    $('.shop_list_right form button').click(function () {
        $(this).parents('.shop_list_in').find('span').trigger('click');
        $('.shop_bag').trigger('click');
    })
})
