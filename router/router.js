/**
 * @author yaobei on 2016/11/13
 * @路由
 */

//引入依赖包
var Student = require("../models/Student.js");
var Kecheng = require("../models/Kecheng.js");


//显示首页
exports.showIndex = function(req,res){
    Student.find({},function(err,result){
        //result就是所有学生数组
        res.render("index",{
            "students" : result
        });
    });
};

//显示添加学生页面
exports.showAddStudent = function(req,res){
    //先要去查询，有多少种课程，然后交付add模板引擎
    Kecheng.find({},function(err,result){
        res.render("addStudent",{
            "allkecheng" : result
        });
    });
};

//添加学生信息操作
exports.doAddStudent = function(req,res){
    //存储数据
    //url是   /doAddStudent?sid=10000&name=小红&sex=男&kechengs=100&kechengs=102
    //req.query就是对象
    //{name: 小红 ,  sex:男，  kechengs:[100,102]}

    var id = req.query.sid;

    Student.find({'sid':id},function(err,result){
        if (result.length == 1) {
            console.log("该学生id已经存在，请换个id进行添加学生信息操作！");
        } else {
            Student.create(req.query,function(){
                console.log("添加学生信息成功！");
                //在课程中添加此人
                Kecheng.addStudent(req.query.Kechengs,req.query.sid,function(){
                    res.send("插入成功");
                });
            });
        }
    });
    //跳转到首页
    res.redirect("/");
};

//显示修改学生页面
exports.editStudent = function(req,res) {
    //显示修改界面
    var sid = parseInt(req.params["sid"]);

    Student.findOne({"sid": sid}, function (err, result) {
        if(err || !result){
            res.send("错误");
            return;
        }
        Kecheng.find({},function(err,result2){
            res.render("editStudent", {
                "student": result,
                "allkecheng" : result2
            });
        });
    });
};

//修改学生信息操作
exports.doEditStudent = function(req,res) {
    //执行修改
    //要改的学生sid
    var sid = parseInt(req.params["sid"]);
    Student.update({"sid":sid},req.query,function(){
        //res.send("修改学生信息操作成功！");
        //跳转到首页
        res.redirect("/");
    });
};

//删除学生信息操作
exports.removeStudent = function(req,res) {
    //执行修改
    //要改的学生sid
    var sid = parseInt(req.params["sid"]);
    Student.remove({"sid":sid},function(){
        //跳转到首页
        res.redirect("/");
    });
};

//显示添加课程页面
exports.showAddKecheng = function(req,res){
    Kecheng.find({},function(err,result){
        //result就是所有课程数组
        res.render("addKecheng",{
            "kecheng" : result
        });
    });
};

//执行添加课程操作
exports.doAddKecheng = function(req,res){
    var kid = req.query.kid;
    Kecheng.find({'kid':kid},function(err,result){
        if (result.length == 1) {
            console.log("该课程id已经存在，请换个id进行添加课程操作！");
        } else {
            Kecheng.create(req.query,function(){
                console.log("添加课程成功！");
            });
        }
    });
    //跳转到首页
    res.redirect("/");
};

//删除课程操作
exports.removeKecheng = function(req,res) {
    //执行修改
    var kid = parseInt(req.params["kid"]);
    Kecheng.remove({"kid":kid},function(){
        //跳转到首页
        res.redirect("/");
    });
};