$(function(){
    $.ajax({
        type:"get",
        url:"/user/queryUserMessage",
        dataType:"json",
        success:function(data){
            console.log(data);
            if(data.error == 400)
            {
                location.href = "login.html";
                return;
            }
            $('.userInfoLi').html(template('userTemplate',data));
        }
    });

    $('.logoutBtn').on('click',function(){
        $.ajax({
            type:"get",
            url:"/user/logout",
            dataType:"json",
            success:function(data){
                console.log(data);
                location.href = "login.html";
            }
        });
    });
})