$(function () {
    var id = querystrToObj("id");
    var size;
    var num;
    console.log(id);
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            id: id
        },
        dataType: "json",
        success: function (data) {
            // console.log(data);
            $('.mui-scroll').html(template('detailTemplate', data));
            mui(".mui-slider").slider({
                interval: 4000
            });
            mui('.mui-numbox').numbox();
        }
    });
    
    $('.main').on('tap', '.size span', function () {
        $(this).addClass('current').siblings().removeClass('current');
        size = $(this).text();
    });

    $('.addCartBtn').on('click', function () {
        num = mui('.mui-numbox').numbox().getValue();
        if (!size) {
            mui.toast('请选择尺码！', {
                duration: 'long',
                type: 'div'
            });
            return;
        }
        $.ajax({
            type: "POST",
            url: "/cart/addCart",
            data: {
                productId: id,
                num: num,
                size: size
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.error == 400) {
                    location.href = "login.html?resUrl="+location.href;
                }

                if (data.success) {
                    mui.confirm("添加成功", "温馨提示", ["去购物车", "继续浏览"], function (e) {
                        if (e.index === 0) {
                            // 前往购物车
                            location.href = "cart.html";
                        }
                    })
                }
            }
        });
    });
});