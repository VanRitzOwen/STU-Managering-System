/**
 * @author yaobei on 2016/11/13
 * @课程类
 */

//引入依赖包
var mongoose = require('mongoose');

//schema
var kechengSchema = new mongoose.Schema({
    "kid"  : Number,
    "name" : String,
    "students" : [Number]       //这个数组存放的是学生的sid
});
//索引
kechengSchema.index({ "kid": 1});

//课程添加学生
kechengSchema.statics.addStudent = function(kidarray,sid,callback){
    for(var i = 0 ; i < kidarray.length ; i++){
        Kecheng.update({"kid":kidarray[i]},{$push :{"students":sid}},function(){
            console.log("课程添加学生信息成功！");
        })
    }
}

//model
var Kecheng = mongoose.model("Kecheng",kechengSchema);

//对外暴露课程类接口
module.exports = Kecheng;