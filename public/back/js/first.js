$(function () {
    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            datType: "json",
            success: function (data) {
                console.log(data);
                $('.table tbody').html(template('userTemplate', data));
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: data.page,
                    totalPages: Math.ceil(data.total / data.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }
    render();

    $('#addForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类！"
                    }
                }
            }
        }
    });

    $('.addCategory').on('click', function () {
        $('#addUserModal').modal('show');
    });

    $('#addForm').on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $('#addForm').serialize(),
            dataType: "json",
            success: function (data) {
                $('#addUserModal').modal('hide');
                render();
            }
        });
    });
});