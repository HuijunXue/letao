$(function () {
    if(!localStorage.getItem('search_list'))
    {
        localStorage.setItem('search_list', JSON.stringify([]));
    }

    function getHistory() {
        var arr = JSON.parse(localStorage.getItem('search_list'));
        return arr;
    }

    function render() {
        var arr = JSON.parse(localStorage.getItem('search_list'));
        $('.historyBox').html(template('historyTemplate', {
            list: arr
        }));
    }
    render();
    $('.searchBtn').on('click', function () {
        var searchVal = $('.searchInput').val().trim();
        if (searchVal.length == 0) {
            mui.toast('请输入搜索内容', {
                duration: 'long',
                type: 'div'
            });
            return;
        }
        
        $('.searchInput').val('');
        var arr = getHistory();
        console.log(arr);
        if (arr.indexOf(searchVal) !== -1) {
            arr.splice(arr.indexOf(searchVal), 1);
        }
        arr.unshift(searchVal);
        if (arr.length > 10) {
            arr.pop();
        }
        console.log(arr);
        localStorage.setItem('search_list', JSON.stringify(arr));
        render();
        location.href="../front/searchList.html?key="+searchVal;
    });

    $('.historyBox').on('click', 'i', function () {
        var index = $(this).data('index');
        mui.confirm('你确定要删除吗？', '温馨提示', ['确定', '取消'], function (e) {
            if (e.index === 0) {
                var arr = getHistory();
                arr.splice(index, 1);
                localStorage.setItem('search_list', JSON.stringify(arr));
                render();
            }
        }, 'div');
    });

    $('.historyBox').on('click', '.clearHistoryBtn', function () {
        mui.confirm('你确定要清空搜索历史记录吗？', '温馨提示', ['确定', '取消'], function (e) {
            if (e.index === 0) {
                localStorage.setItem('search_list', JSON.stringify([]));
                render();
            }
        }, 'div');
    });
})