
********************

1、formidable
	var express = require('express');
	var router = express.Router();
	var fs = require('fs');
	var path= require("path");
	var formidable = require('formidable');
	/* GET home page. */
	router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Express+EJS+mysql+s2' });
	});

	router.post('/file-upload', function(req, res, next) {
		console.log('开始文件上传....');
		var form = new formidable.IncomingForm();
		//设置编辑
		form.encoding = 'utf-8';
		//设置文件存储路径
		form.uploadDir = "./public/images/";
		//保留后缀
		form.keepExtensions = true;
		//设置单文件大小限制    
		form.maxFieldsSize = 2 * 1024 * 1024;
		//form.maxFields = 1000;  设置所以文件的大小总和

		form.parse(req, function(err, fields, files) {
		  //console.log(fields);
		  console.log(files.thumbnail.path);
		  console.log('文件名:'+files.thumbnail.name);
				var t = (new Date()).getTime();
				//生成随机数
				var ran = parseInt(Math.random() * 8999 +10000);
				//拿到扩展名
				var extname = path.extname(files.thumbnail.name);

		  //path.normalize('./path//upload/data/../file/./123.jpg'); 规范格式文件名
		  var oldpath =   path.normalize(files.thumbnail.path);

		  //新的路径
		  let newfilename=t+ran+extname;
		  var newpath =  './public/images/'+newfilename;
		  console.warn('oldpath:'+oldpath+' newpath:'+newpath);
		  fs.rename(oldpath,newpath,function(err){
			if(err){
				  console.error("改名失败"+err);
			}
			res.render('index', { title: '文件上传成功:', imginfo: newfilename });
		  });
		 
		  
		  //res.end(util.inspect({fields: fields, files: files}));
		});
	});

	/* supervisor ./bin/www  */
	module.exports = router;

****************************************************

2、使用mongoose:
	1、引包：npm i -S mongoose
		var mongoose = require('mongoose')
		//连接数据库
			1	mongoose.connect('mongodb://localhost/数据库名')
				var db = mongoose.connection
			2	var db = mongoose.createConnection('mongodb://localhost:27017/数据库名')
		//打开成功
		db.once('open',function(){
			console.log("数据库打开成功")
		})
		//module.exports = db
	
	2、//定义Schema
		var studentSchema = new mongoose.Schema({
			"name":{type:String},
			"age":{type:Number},
			"sex":{type:String}
		});
		var blogSchema = new mongoose.Schema({
			title:String,
			author:String,
			body:String,
			comments:[{body:String,data:Date}],
			date:{type:Date,default:Date.now},
			hidden:Boolean,
			meta:{
				votes:Number,
				favs:Number
			}
		})
		
	
	3、	-------在这里定义静态方法---------
	
	4、	//类与Schema绑定,数据库中的集合为Students
		var Student = db.model("Student",studentSchema);
	
	5、	//创建实例的两种方法（增）：
		1
			//实例化一个学生类
			var xiaoming = new Student({"name":"小明","age":12,"sex":"男"});
			//保存这个学生
			xiaoming.save(function(){
				console.log("存储成功");
			})
		2	//直接有类创建实例
			Student.create({"name":"小红","age":13,"sex":"女"},function(err){
				console.log("保存成功");
			})
		
	6、	静态方法(增删改查)
		1.	//给studentSchema添加静态方法，(通过name找student)
			studentSchema.statics.zhaoren = function(name,callback){
				return this.model('Student').find({name:name},callback);//return不用写
			}
			//用Student类调用静态方法
			Student.zhaoren("小明",function(err,result){
				console.log(result);
			})
		2.	//条件，改成什么，，回调
			studentSchema.statics.xiugai = function(conditions,update,options,callback){
				this.model("Student").update(conditions,update,options,callback);
			}
		
			Student.xiugai({"name":"小明"},{$set:{"age":30}},{},function(){
				console.log("通过姓名该age成功")
			})
		3.	//先查找，在修改
			Cat.find({"name":"汤姆"},function(err,result){
				var xiaomao = result[0];
				xiaomao.age = 8;
				xiaomao.save();
			})
	7、定义对象(实例)方法
		1、	var animalSchema = new mongoose.Schema({name:String,type:String});
		
			animalSchema.methods.findSimilarTypes = function(cb){
				return this.model('Animal').find({type:this.type},cb);
			}
			对象.findSimilarTypes(function(err,result){
				//通过对象找同类(type)
			})
		2、	发表评论
			blogSchema.methods.pinglun = function(obj,callback){
				//根据数据自己，把评论信息添加进数组
				this.comments.push(obj);
				this.save();
			}
****************************************************************