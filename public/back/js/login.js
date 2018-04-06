//写入口函数：1是为了防止全局变量的污染  2是等待页面渲染出来之后再执行
$(function(){
    $('form').bootstrapValidator({
        // 配置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength:{
                        min:2,
                        max:12,
                        message:"用户名长度在2到12位"
                    },
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度在6-12位"
                    },
                    callback:{
                        message:"密码不正确"
                    }
                }
            }
        }
    });

    $('form').on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$('form').serialize(),
            dataType:"json",
            success:function(data){
                if(data.error == 1000)
                {
                    // alert("用户名不存在");
                    $("form").data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }
                if(data.error == 1001)
                {
                    // alert("密码错误");
                    $("form").data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }
                if(data.success)
                {
                    window.location.href = "index.html";
                }
            }
        });
    });

    $("[type='reset']").on('click',function(){
        $('form').data('bootstrapValidator').resetForm();  //消除图标和表单的文字
    });
});