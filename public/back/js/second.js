$(function(){
    var currentPage = 1;
    var pageSize = 5;
    function render()
    {
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{page:currentPage,pageSize:pageSize},
            dataType:"json",
            success:function(data){
                console.log(data);
                $('.table tbody').html(template('brandTemplate',data));
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage:data.page,
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
    $('.addBrand').on('click',function(){
        $('#addBrandrModal').modal('show');
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{page:1,pageSize:100},
            dataType:"json",
            success:function(data){
                console.log(data);
                $('.dropdown-menu').html(template('dropdownTemplate',data));
            }
        });
    });

    $('#addForm').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一个分类"
                    }
                }
            },

            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类名"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请选择一张图片"
                    }
                }
            }
        }
    });

    $('.dropdown-menu').on('click','a',function(){
        var categoryId = $(this).data('id');
        $('.text').text($(this).text());
        $('.categoryId').attr('value',categoryId);
        $('#addForm').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });

    $('#fileupload').fileupload({
        dataType: "json",
        done:function(e,data){
            console.log(data);
            var picUrl = data.result.picAddr;
            $('.showBox').attr('src',picUrl);
            $('.brandImg').attr('value',picUrl);
            $('#addForm').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });

    $('#addForm').on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$('#addForm').serialize(),
            dataType:"json",
            success:function(data){
                console.log(data);
                $('#addBrandrModal').modal('hide');
                
                $('#addForm').data("bootstrapValidator").resetForm('reset');

                currentPage = 1;
                render();
                $('.text').text('请选择二级菜单');
                $('.showBox').attr('src','./images/default.png');
            }
        });
       
    });

});