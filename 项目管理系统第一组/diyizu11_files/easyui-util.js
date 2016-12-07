/**
 * easyui datagrid editors扩展之combogrid
 */
$.extend($.fn.datagrid.defaults.editors, {
    combogrid: {
        init: function (container, options) {
            var input = $('<input type="text" class="datagrid-editable-input">').appendTo(container);
            input.combogrid(options);
            return input;
        },
        destroy: function (target) {
            $(target).combogrid('destroy');
        },
        getValue: function (target) {
            return $(target).combogrid('getValue');
        },
        setValue: function (target, value) {
            $(target).combogrid('setValue', value);
        },
        resize: function (target, width) {
            $(target).combogrid('resize', width);
        }
    }
});

/**
 * panel关闭时回收内存，主要用于layout使用iframe嵌入网页时的内存泄漏问题
 */
$.extend($.fn.panel.defaults, {
    onBeforeDestroy: function () {
        var frame = $('iframe', this);
        try {
            if (frame.length > 0) {
                for (var i = 0; i < frame.length; i++) {
                    frame[i].src = '';
                    frame[i].contentWindow.document.write('');
                    frame[i].contentWindow.close();
                }
                frame.remove();
                if (navigator.userAgent.indexOf("MSIE") > 0) {// IE特有回收内存方法
                    try {
                        CollectGarbage();
                    } catch (e) {
                    }
                }
            }
        } catch (e) {
        }
    }
});

/**
 * 防止panel/window/dialog组件超出浏览器边界
 */
onMove = {
    onMove: function (left, top) {
        var l = left;
        var t = top;
        if (l < 1) {
            l = 1;
        }
        if (t < 1) {
            t = 1;
        }
        var width = parseInt($(this).parent().css('width')) + 14;
        var height = parseInt($(this).parent().css('height')) + 14;
        var right = l + width;
        var buttom = t + height;
        var browserWidth = $(window).width();
        var browserHeight = $(window).height();
        if (right > browserWidth) {
            l = browserWidth - width;
        }
        if (buttom > browserHeight) {
            t = browserHeight - height;
        }
        $(this).parent().css({
            /* 修正面板位置 */
            left: l,
            top: t
        });
    }
};
$.extend($.fn.dialog.defaults, onMove);
$.extend($.fn.window.defaults, onMove);
$.extend($.fn.panel.defaults, onMove);

/**
 * 扩展tree和combotree，使其支持平滑数据格式
 */
$.fn.tree.defaults.loadFilter = {
    loadFilter: function (data, parent) {
        var opt = $(this).data().tree.options;
        var idField, textField, parentField;
        if (opt.parentField) {
            idField = opt.idField || 'id';
            textField = opt.textField || 'text';
            parentField = opt.parentField || 'pid';
            var i, l, treeData = [], tmpMap = [];
            for (i = 0, l = data.length; i < l; i++) {
                tmpMap[data[i][idField]] = data[i];
            }
            for (i = 0, l = data.length; i < l; i++) {
                if (tmpMap[data[i][parentField]] && data[i][idField] != data[i][parentField]) {
                    if (!tmpMap[data[i][parentField]]['children'])
                        tmpMap[data[i][parentField]]['children'] = [];
                    data[i]['text'] = data[i][textField];
                    tmpMap[data[i][parentField]]['children'].push(data[i]);
                } else {
                    data[i]['text'] = data[i][textField];
                    treeData.push(data[i]);
                }
            }
            return treeData;
        }
        return data;
    }
};
$.extend($.fn.combotree.defaults, $.fn.tree.defaults.loadFilter);
$.extend($.fn.tree.defaults, $.fn.tree.defaults.loadFilter);

/**
 * 扩展treegrid，使其支持平滑数据格式
 */
$.extend($.fn.treegrid.defaults, {
    loadFilter: function (data, parentId) {
        var opt = $(this).data().treegrid.options;
        var idField, treeField, parentField;
        if (opt.parentField) {
            idField = opt.idField || 'id';
            treeField = opt.textField || 'text';
            parentField = opt.parentField || 'pid';
            var i, l, treeData = [], tmpMap = [];
            for (i = 0, l = data.length; i < l; i++) {
                tmpMap[data[i][idField]] = data[i];
            }
            for (i = 0, l = data.length; i < l; i++) {
                if (tmpMap[data[i][parentField]] && data[i][idField] != data[i][parentField]) {
                    if (!tmpMap[data[i][parentField]]['children'])
                        tmpMap[data[i][parentField]]['children'] = [];
                    data[i]['text'] = data[i][treeField];
                    tmpMap[data[i][parentField]]['children'].push(data[i]);
                } else {
                    data[i]['text'] = data[i][treeField];
                    treeData.push(data[i]);
                }
            }
            return treeData;
        }
        return data;
    }
});

/**
 * 扩展输入框中限制
 */
$.extend($.fn.validatebox.defaults.rules, {
    //身份证号码验证
    idcard: {
        validator: function (value, param) {
            var reg = /^\d{17}(\d|X|x)$/;
            return reg.test(value);
        },
        message: '请输入正确的身份证号码.'
    },
    //移动手机号码验证
    tel: {//value值为文本框中的值
        validator: function (value) {
            var reg = /^1\d{10}$/;
            return reg.test(value);
        },
        message: '手机号码格式不正确.'
    },
    //检查密码和确认密码是否相同。
    file: {
        validator: function (value, param) {
            var flag = false;
            var fileName = $.trim(value);
            var postfix = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
            $.each(param, function (i, d) {
                if (d.toLowerCase() == postfix) {
                    flag = true;
                }
            });
            return flag;
        },
        message: '文件类型有误.'
    },
    //检查密码和确认密码是否相同。
    password: {
        validator: function (value, param) {
            return value == $(param[0]).val();
        },
        message: '两次输入不一致.'
    }
});

//默认对ajax操作结果的处理
function defaultResultHolder(data,datagrid){
    if(data.success){
        $.messager.show({
            title: '提示',
            msg: data.msg,
            timeout: 2000
        });
        if(datagrid){
            datagrid.datagrid("reload");
        }
    }else
        $.messager.alert(data.msg, data.obj);
}

//往tabs里面添加一个tab
function addTab(tabs,title,url){
    //如果tab不存在就创建，存在则选中。
    if (!tabs.tabs("exists", title)) {
        tabs.tabs("add", {
            fit: true,			//自适应宽高
            closable: true,	    //是否可以关闭
            border: false,		//是否显示边框
            selected: true,	    //是否选中
            title: title,	    //tab的标题
            content : "<iframe src='" + url + "' style='border:0;width:100%;height:99%;' frameBorder='0'></iframe>"
        });
    } else  //选中找到的tab
        tabs.tabs("select", title);
}