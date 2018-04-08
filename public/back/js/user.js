$(function(){
    var currentPage = 1;
    var pageSize = 5;
    function render()
    {
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{page:currentPage,pageSize:pageSize},
            dataType:"json",
            success:function(data){
                console.log(data);
                $('.table tbody').html(template('userTemplate',data));
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:data.page,  //当前页，为了给当前这个页加特殊样式
                    totalPages:Math.ceil(data.total/data.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }

    render();

    $('body').on('click','button',function(){
        var id = $(this).parent().data('id');
        var isDelete;
        if($(this).hasClass('btn-danger'))
        {
            isDelete = 0;
        }
        else
        {
            isDelete = 1;
        }
        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{id:id,isDelete:isDelete},
            dataType:"json",
            success:function(data){
                render();
                // console.log(data);
            }
        });
    });
})