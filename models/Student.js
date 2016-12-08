/**
 * @author yaobei on 2016/11/13
 * @学生类
 */

//引入依赖包
var mongoose = require('mongoose');

//schema
var studentSchema = new mongoose.Schema({
    "sid"  : Number,
    "name" : String,
    "age" : Number,
    "sex" : String,
    "Kechengs" : [Number]   //存放课程的kid
});

//索引
studentSchema.index({ "sid": 1});

//model
var Student = mongoose.model("Student",studentSchema);

//对外暴露学生类接口
module.exports = Student;