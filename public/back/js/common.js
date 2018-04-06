$(function(){
    $(document).ajaxStart(function(){
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        NProgress.done();
    });

    $('.category-manage').click(function(){
        console.log("hahah");
        $('.nav2').stop().slideToggle();
    });

    $('.menu').click(function(){
        // console.log('hahha');
        $('.aside').toggleClass('menuChange');
        $('.header').toggleClass('leftChange');
        $('.main').toggleClass('leftChange');
    });

    $('.back').click(function(){
        $('.modal').modal();
    });

    $('#logoutBtn').click(function(){
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function(data){
                if(data.success)
                {
                    window.location.href = "login.html";
                }
            }
        });
    });

});