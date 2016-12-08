/**
 * @author yaobei on 2016/11/13
 * @数据库常用操作
 */

//引入依赖包
var mongoose = require('mongoose');

//数据库连接操作
mongoose.connect('mongodb://mydb:asdfgh@ds151137.mlab.com:51137/mydb');

//数据库初始化
var db = mongoose.connection;
db.once('open', function (callback) {
    console.log("数据库成功打开");
});

//对外暴露数据库接口
module.exports = db;