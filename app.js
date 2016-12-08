/**
 * @author yaobei on 2016/11/13
 * @启动
 */

//依赖包
var express = require("express");
var app = express();
var router = require("./router/router.js");
var db = require("./models/db.js");

//设置模板引擎
app.set("view engine","ejs");

//路由表
app.get("/",router.showIndex);                                          //显示首页
app.get("/addStudent",router.showAddStudent);                           //显示添加学生页面
app.get("/doAddStudent",router.doAddStudent);                           //执行添加学生操作
app.get("/editStudent/:sid",router.editStudent);                        //显示修改学生信息页面
app.get("/doEditStudent/:sid",router.doEditStudent);                    //执行修改学生信息操作
app.get("/removeStudent/:sid",router.removeStudent);                    //执行删除学生信息操作
app.get("/addKecheng",router.showAddKecheng);                           //显示添加课程页面
app.get("/doAddKecheng",router.doAddKecheng);                           //执行添加课程操作
app.get("/removeKecheng/:kid",router.removeKecheng);                    //执行删除课程操作



app.listen(8000);
module.exports = app;