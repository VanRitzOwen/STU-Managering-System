/**
 * 时间对象的格式化
 */
Date.prototype.format = function (pattern) {
    var format = pattern || "yyyy-MM-dd HH:mm:ss";
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "S": this.getMilliseconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3)    //季度
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

// Ajax 文件下载
jQuery.download = function (url, data, method) {    // 获得url和data
    if (url) {
        var inputs = '';
        if (data) {
            // data 是 string 或者 array/object
            data = typeof data == 'string' ? data : jQuery.param(data);
            // 把参数组装成 form的input
            jQuery.each(data.split('&'), function () {
                var pair = this.split('=');
                inputs += '<input type="hidden" name="'+pair[0]+'" value="' + pair[1] + '" />';
            });
        }
        // request发送请求
        jQuery('<form action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>')
            .appendTo('body').submit().remove();
    }
};

(function ($) {
    /**
     * 表单序列化
     */
    $.fn.serializeForm = function () {
        var form = $(this);
        var o = {};
        $.each(form.serializeArray(), function (index) {
            // 如果表单项的值非空，才进行序列化操作
            if (this['value'] != undefined && this['value'].length > 0) {
                if (o[this['name']]) {
                    o[this['name']] = o[this['name']] + "," + this['value'];
                } else {
                    o[this['name']] = this['value'];
                }
            }
        });
        return o;
    };
})(jQuery);

/*
$(function () {
    $('#').datebox({
        onShowPanel: function () {//显示日期选择对象后再触发弹出月份层的事件，初始化时没有生成月份层
            span.trigger('click'); //触发click事件弹出月份层
            if (!tds) setTimeout(function () {//延时触发获取月份对象，因为上面的事件触发和对象生成有时间间隔
                tds = p.find('div.calendar-menu-month-inner td');
                tds.click(function (e) {
                    e.stopPropagation(); //禁止冒泡执行easyui给月份绑定的事件
                    var year = /\d{4}/.exec(span.html())[0]//得到年份
                        , month = parseInt($(this).attr('abbr'), 10); //月份，这里不需要+1
                    $('#db').datebox('hidePanel')//隐藏日期对象
                        .datebox('setValue', year + '-' + month); //设置日期的值
                });
            }, 0)
        },
        parser: function (s) {
            if (!s) return new Date();
            var arr = s.split('-');
            return new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, 1);
        },
        formatter: function (d) { return d.getFullYear() + '-' + (d.getMonth()+1);/!*getMonth返回的是0开始的，忘记了。。已修正*!/ }
    });
    var p = $('#db').datebox('panel'), //日期选择对象
        tds = false, //日期选择对象中月份
        span = p.find('span.calendar-text'); //显示月份层的触发控件
});
*/
