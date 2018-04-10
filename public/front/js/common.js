var gallery = mui('.mui-slider');
gallery.slider({
  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});

mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false //是否显示滚动条
});

$('.footer a').on('click',function(){
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
});

function querystrToObj(key)
{
    var obj = {};
    var arr = decodeURI(location.search).slice(1).split("&");
    arr.forEach(function(v,i){
        var key = v.split("=")[0];
        var value = v.split("=")[1];
        obj[key] = value;
    });
    return obj[key];
}