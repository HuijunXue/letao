
$(function(){

    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        dataType:"json",
        success:function(data){
            // console.log(data);
            $('.categoryUl').html(template('leftTemplate',data));
            renderById(data.rows[0].id);
            
        }
    });




    $('.left ul').on('click','a',function(){
        $(this).addClass('current').parent().siblings().find('a').removeClass('current');
        var id = $(this).data('id');
        renderById(id);
    });

    

    function renderById(id)
    {
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{
                id: id
              },
            dataType:"json",
            success:function(data){
                // console.log(data);
                $('.right ul').html(template('rightTemplate',data));
            }
        });
    }

});