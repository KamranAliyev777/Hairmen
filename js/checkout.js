function shop_price(x) {
    x = Math.round(x * 100) / 100;
    x = x.toString();
    x = (x.indexOf('.') == -1) ? x + '.00' : (x[x.length - 1] > 0 && x[x.length - 2] == '.') ? x = x + '0' : x = x;
    return x;
}
$(document).ready(function () {
   var storage_box=window.localStorage.getItem('box');
refresh_checkout = () => {
    var orders = JSON.parse(storage_box);
    var subtotal = 0;
    if (storage_box) {
        for (key in orders) {
            subtotal += Number(orders[key].price_total)
            $('.orders_ul').append('<li><span></span></li>');
            $('.orders_ul li').last().append(orders[key].name);
            $('.orders_ul li').last().find('span').text('$' + orders[key].price_total);
        }
    }
    else {
        $('.orders_ul').empty();
    }
    $('.order_tot span').empty().append('$' + shop_price(subtotal));
}
refresh_checkout();


$('.order_button').click(function() {
    var inputs=$('.checkout_input input');
    var mail_input=$('.mail_input').val();
    var regEx = /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;
      var validEmail = regEx.test(mail_input);
    var check_input_val=true;
    inputs.each(
        function(index){
            if($(this).val().length < 1){
                check_input_val=false
            }
        })
    if(check_input_val && validEmail){
    if (storage_box) {
        window.localStorage.removeItem('box');
        refresh_checkout();
    }
}
else{
    alert('Zəhmət olmasa qırmız ulduz işarəsi olan yerləri düzgün doldurun')
}
});


});