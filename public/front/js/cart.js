$(function () {
    var size;
    var num;

    function render() {
        $.ajax({
            type: "get",
            url: "/cart/queryCart",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.error == 400) {
                    location.href = "login.html";
                    return;
                }
                $('.cart-products').html(template('cartTemplate', {
                    list: data
                }));
            }
        });
        $('.context').text('订单总金额    ¥00.00');
    }
    render();
    $('body').on('tap', '.size span', function () {
        $(this).addClass('current').siblings().removeClass('current');
        size = $(this).text();
    });
    $('.cart-products').on('tap', '.btn_edit', function () {
        var data = this.dataset;
        console.log(data);
        var str = template('confirmTemplate', data).replace(/\n/g, '');
        mui.confirm(str, "编辑商品", ["确定", "取消"], function (e) {
            if (e.index === 0) {
                num = mui('.mui-numbox').numbox().getValue();
                size = $('.size .current').text();
                $.ajax({
                    type: "post",
                    url: "/cart/updateCart",
                    data: {
                        id: data.cartid,
                        size: size,
                        num: num,
                    },
                    dataType: "json",
                    success: function (data) {
                        render();
                    }
                });
            }
        });
        mui(".mui-numbox").numbox();
    });

    $('.cart-products').on('tap', '.btn_delete', function () {
        console.log("hahha");
        var id = $(this).data('cartid');
        mui.confirm("删除商品", "温馨提示", ["确定", "取消"], function (e) {
            if (e.index == 0) {
                $.ajax({
                    type: "get",
                    url: "/cart/deleteCart",
                    data: {
                        id: [id]
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        render();
                    }
                });
            }
        });
    });

    //计价
    $('body').on('change','.ck',function(){
        var total = 0;
        console.log($('.ck:checked'));
        $('.ck:checked').forEach(function(v,i){
            total+= $(v).data('num')*$(v).data('price');
        });
        $('.context').text('订单总金额    ¥'+total.toFixed(2));
    });
})