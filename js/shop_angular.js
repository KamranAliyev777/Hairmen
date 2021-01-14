function shop_price(x) {
    x = Math.round(x * 100) / 100;
    x = x.toString();
    x = (x.indexOf('.') == -1) ? x + '.00' : (x[x.length - 1] > 0 && x[x.length - 2] == '.') ? x = x + '0' : x = x;
    return x;
}
//angular in shop
var app = angular.module('myApp', []);
app.controller('shop_ctrl', function ($scope) {
    $scope.qty = 1;
    $scope.card_list = [];
    $scope.qty_all = 0;
    var card_list_key = 0;
    $scope.price_all = 0;
    if (window.localStorage.getItem('box')) {
        var box = JSON.parse(localStorage.getItem('box'));
        for (key in box) {
            $scope.card_list.push({
                src: box[key].src,
                name:box[key].name,
                price: box[key].price,
                price_total: box[key].price_total,
                qty:box[key].qty
            })
            $scope.qty_all += box[key].qty
            $scope.price_all +=(Number(box[key].price_total));
        }
    card_list_key+=box.length
    }
    $('.shop_bag span').text($scope.qty_all)
    $scope.price_all=shop_price($scope.price_all)
    $scope.shop_list = JSON.parse(window.localStorage.getItem('shop'));
    $scope.add = function () {
        $scope.price_all = 0;
        $scope.qty_all = 0;
        var check = false;
        for (key in $scope.card_list) {
            var row = $scope.card_list[key];
            if (row.src == $('.shop_list_left img').attr('src')) {
                check = key;
            }
        }
        var price_in = $('.shop_list_right > span').text().substr(1, $('.shop_list_right > span').text().length - 1);
        if (!check) {
            card_list_key++;
            $scope.card_list.push({
                src: $('.shop_list_left img').attr('src'),
                name: $('.shop_list_right').find('h2').text(),
                price: shop_price(price_in),
                price_total: shop_price(price_in * $scope.qty),
                qty: $scope.qty
            });
        }
        else {
            var new_qty = $scope.card_list[check].qty + $scope.qty;
            var new_price = shop_price($scope.card_list[check].price * new_qty);
            $scope.card_list[check]['qty'] = new_qty;
            $scope.card_list[check]['price_total'] = new_price;
        }
        localStorage.setItem('box', JSON.stringify($scope.card_list))
        for (let i = 0; i < card_list_key; i++) {
            $scope.price_all += Number($scope.card_list[i].price_total);
            $scope.qty_all+=$scope.card_list[i].qty
        }
        $scope.price_all = shop_price($scope.price_all);
        $('.shop_bag span').text($('.shop_bag span').val() + $scope.qty_all);
        $scope.qty = 1;
        localStorage.setItem('box', JSON.stringify($scope.card_list))
    }
    $scope.remove_card = function (index) {
        $scope.price_all -= Number($scope.card_list[index].price_total);
        $scope.price_all = shop_price($scope.price_all);
        $scope.qty_all -= $scope.card_list[index].qty;
        $('.shop_bag span').text($('.shop_bag span').val() + $scope.qty_all);
        $scope.card_list.splice(index, 1);
        card_list_key--;
        localStorage.setItem('box', JSON.stringify($scope.card_list))
    }
});