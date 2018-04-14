$(function () {
    var queryString = location.search;
    $('.searchInput').val(querystrToObj("key"));
    var currentPage = 1;
    var pageSize = 4;
    function render(callback) {
        if(currentPage == 1)
        {
            $('.product ul').html("<div class='loading'></div>");
        }
        var param = {};
        param.proName = $('.searchInput').val();
        param.page = currentPage;
        param.pageSize = pageSize;

        if ($('.actionBox .current').length > 0) {
            var type = $('.actionBox .current').data('type');
            var result = $('.actionBox .current').find('i').hasClass('fa-angle-down');
            if (result) {
                param[type] = 2;
            } else {
                param[type] = 1;
            }
        }

        //为明显看到效果（loading时一个旋转的小方块）而加settimeout延迟
        setTimeout(function () {
            $.ajax({
                type: "get",
                url: "/product/queryProduct",
                data: param,
                dataType: "json",
                success: function (data) {
                    // $('.product ul').html(template('productTemplate', data));
                    // mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                    // mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh();
                    callback(data);
                }
            });
        }, 500);
    }

    // render();

    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: true, //可选,默认false.首次加载自动下拉刷新一次
                callback:function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    currentPage = 1;
                    render(function(data){
                        $('.product ul').html(template('productTemplate', data));
                        mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                        mui(".mui-scroll-wrapper").pullRefresh().refresh(true);
                    });
                } 
            },
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:false,//可选,默认false.自动上拉加载一次
                callback:function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    currentPage++;
                    render(function(data){
                        console.log(data);
                        if(data.data.length > 0)
                        {
                            $('.product ul').append(template('productTemplate', data));
                            mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh();
                        }
                        else
                        {
                            mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh(true);
                        }
                    });
                } 
              }
            }
    });

    $('.actionBox a[data-type]').on('click', function () {
        $(this).addClass("current").siblings().removeClass("current").find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        render();
    });

    $('.searchBtn').on('click', function () {
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
        var arr = JSON.parse(localStorage.getItem('search_list'));
        var searchVal = $('.searchInput').val();
        if (arr.indexOf(searchVal) !== -1) {
            arr.splice(arr.indexOf(searchVal), 1);
        }

        arr.unshift(searchVal);

        if (arr.length > 10) {
            arr.pop();
        }

        localStorage.setItem('search_list', JSON.stringify(arr));
    });

});