
$(function(){
    var queryString = location.search;  
    $('.searchInput').val(querystrToObj("key"));
    function render()
    {
        var param = {};
        param.proName = $('.searchInput').val();
        param.page = 1;
        param.pageSize = 100;
        
        if($('.actionBox .current').length>0)
        {
            var type = $('.actionBox .current').data('type');
            var result = $('.actionBox .current').find('i').hasClass('fa-angle-down');
            if(result)
            {
                param[type] = 2;
            }
            else
            {
                param[type] = 1;
            }
        }

        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            data:param,
            dataType:"json",
            success:function(data){
                $('.product ul').html(template('productTemplate',data));
            }
        });
    }

    render();

    $('.actionBox a[data-type]').on('click',function(){
        $(this).addClass("current").siblings().removeClass("current").find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        render();
    });

    $('.searchBtn').on('click',function(){
        var arr = JSON.parse(localStorage.getItem('search_list'));
        var searchVal = $('.searchInput').val();
        if(arr.indexOf(searchVal) !== -1)
        {
            arr = arr.splice(arr.indexOf(searchVal),1);
        }

        arr.unshift(searchVal);

        if(arr.length > 10)
        {
            arr.pop();
        }

        localStorage.setItem('search_list',JSON.stringify(arr));  
        render(); 
    });

});