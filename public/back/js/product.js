$(function () {
    var currentPage = 1;
    var pageSize = 2;

    function render() {
        $.ajax({
            type: "GET",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                $('.table tbody').html(template('productTemplate', data));
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: data.page,
                    totalPages: Math.ceil(data.total / data.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    },
                    itemTexts: function (type, page, current) {
                        console.log(type, page, current);
                        switch (type) {
                            case "first":
                                return "首页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            case "prev":
                                return "前一页";
                            case "page":
                                return page;
                        }
                    },
                    tooltipTitles:function(type,page,current){
                        switch (type) {
                            case "first":
                                return "首页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            case "prev":
                                return "前一页";
                            case "page":
                                return "前往第"+page+"页";
                        }
                    },
                    useBootstrapTooltip: true
                });
            }
        });
    }
    render();

    $('.addProduct').on('click',function(){
        $('#addProductModal').modal('show');
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{page:1,pageSize:100},
            dataType:"json",
            success:function(data){
                console.log(data);
                $('.dropdown-menu').html(template('dropdownTemplate',data));
            }
        });
    });

    // $('tbody button').on('click',function(){
    //     var id = $(this).data('id');
    //     if($(this).hasClass('btn-danger'))
    //     {
    //         $.ajax({
    //             type:"",
    //             url:"",
    //             data:"",
    //             dataType:"",
    //             success:function(data){

    //             }
    //         });
    //     }
    // });

    $('.dropdown-menu').on('click','a',function(){
        $('.brandId').attr('value',$(this).data('id'));
        $('#addForm').data("bootstrapValidator").updateStatus("brandId","VALID");
    });

    var imgArr = [];

    $('#fileupload').fileupload({
        dataType:"json",
        done:function(e,data){
            console.log(data);
            imgArr.unshift({
                picAddr:data.result.picAddr,
                picName:data.result.picName
            });
            $('.imgBox').prepend('<img src='+data.result.picAddr+' width="100">');
            if(imgArr.length > 3)
            {
                imgArr.pop();
                console.log($('.imgBox img:last-child'));
                $('.imgBox img:last-child').remove();
            }
            if(imgArr.length === 3)
            {
                $('#addForm').data("bootstrapValidator").updateStatus("imgNum", "VALID")
            }
        }
    });

    $('#addForm').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请选择一个分类"
                    }
                }
            },

            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品数量"
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:"商品库存格式, 必须是非零开头的数字"
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入商品尺寸"
                    },
                    regexp:{
                        regexp:/^[3-4]\d-[3-5]\d$/,
                        message:"尺码格式, 必须是 32-40"
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品原价"
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品现价"
                    }
                }
            },
            imgNum:{
                validators:{
                    notEmpty:{
                        message:"请上传3张图片"
                    }
                }
            }
        }
    });

    $('#addForm').on('success.form.bv',function(){
        console.log(imgArr);
        var dataStr = $('#addForm').serialize();
        dataStr+="&picName1="+imgArr[0].picName+"&picAddr1="+imgArr[0].picAddr+
        "&picName2="+imgArr[1].picName+"&picAddr2="+imgArr[1].picAddr+
        "&picName3="+imgArr[2].picName+"&picAddr3="+imgArr[2].picAddr;
        console.log(dataStr);
        $.ajax({
            type:"POST",
            url:"/product/addProduct",
            data:dataStr,
            dataType:"json",
            success:function(data){
               currentPage = 1;
               render();
            }
        });
    });
});