$(function(){
    var queryString = location.search;
    console.log(queryString);
    $('.yesBtn').on('click',function(){
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        if(!username)
        {
            mui.toast('请输入用户名');
            return;
        }
        if(!password)
        {
            mui.toast('请输入密码');
            return;
        }
        console.log("hahah");
        $.ajax({
            type:"POST",
            url:"/user/login",
            data:{
                username:username,
                password:password
            },
            dataTye:"json",
            success:function(data){
                console.log(data);
                if(data.success)
                {
                    if(!queryString)
                    {
                        location.href = "user.html";
                        return;
                    }
                    location.href = queryString.replace('?resUrl=','');
                }
                if(data.error == 403)
                {
                    mui.toast('用户名或者密码不正确！');
                }
            }
        });
    });  
});