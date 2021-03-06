cmd中：
 cls;  清空控制台
 nvm ls;查看有什么版本的node;
 nvm use 6.7.0;使用node版本；
 node 文件名; 运行js文件
1、module.exports = People;	//暴露一个类
2、在node_modules中的模块文件夹中添加	package.json中添加"main":"app.js"
	只需require("包名")，app.js就是入口文件
3、__dirname	//当前文件的绝对路径
4、require的时候是相对当前js文件的，但是fs等模块的路径是相对cmd命令的，
	所以使用__dirname绝对路径；
	require时将执行那个js文件
5、只要涉及文件上传，form就要加一个属性 enctype="multipart/form-data"
6、req.url	访问 http://127.0.0.1:3000/zmz/index.html?id=2&name=zz
	req.rul为/zmz/index.html?id=2&name=zz
7、判断请求为post时：req.method.toLowerCase() == "post"
8、解析url字符	querystring=require("querystring");
	querystring.parse('foo=bar&abc=xyz&abc=123')解析成
	{ foo: 'bar', abc: ['xyz', '123'] }
9、path.extname('index.html')	//返回字符串的扩展名 .html
10、cookie解析器
	cnpm install cookie-parser
11、session
	cnpm i express-session
12、md5加密
	var crypto = require("crypto");
	var md5 = crypto.createHash('md5');
	var password = md5.update("12345").digest("base64");
	console.log(password);
13、req.query	获得get数据
14、删除文件：fs.unlink('路径')

mongo：
1、	mongod --dbpath F：demo
	启动wiredTiger 存储引擎：
	mongod --storageEngine wiredTiger  --dbpath 数据目录
	启动mmapv1 存储引擎(学的)
	 mongod  --storageEngine mmapv1 --dbpath 数据目录
在另一个cmd中：
	2、mongo	打开数据库、显示版本
	3、show dbs		显示数据库
	4、使用或新建数据库(不存在就是新建)：use 数据库名
	5、查看当前使用的数据库：db
	6、db.dropData
		删除集合：	db.teacher.drop();
	7、db.students.insert({"name":"zmz"})	在students集合中插入一条数据
	8、//在cmd中导入外部数据(不要在mongo中)
		mongoimport --db demo --collection students --drop --file zzz.json
		demo:数据库名
		students:集合名
		--drop:把原来的清空
		zzz.json:导入的文件
	9、db.students.find({"name":"小张","age":"27"})	
		没有数据就查询students里的所有数据
	10、大于条件
		db.students.find({"age":{$gt:20}})
		小于
		find ( { age : { $lt : 20 } } )
	11、或
		db.students.find ( { $or : [ { status : "A" }, { qty : { $lt : 30 } } ] } )
	12、排序(1为升序，-1为降序)
		db.students.find().sort({"score.yuwen":-1,"age":1,"datetime":-1})
	13、//更新age为21(不写$set表示把这整条数据替换)
		db.students.update({"name":"小张"},{$set:{"age":"21"}})
		//改多项
		db.students.update({},{$set:{"age":28}},{multi:true});
	14、删除数据
		//不加justOne表示匹配的都删
		db.student.remove({"score.shuxue":56},{justOne:true});
		//删除集合中所有数据(不删除集合)
		db.students.remove({})
	15、分页
		collection.find({}).skip(1).limit(10)
		skip()表示略过的条数，limit表示查询的条数
		总数：db.students.stats().count
		mongoose:
			//获得动漫的总条数
			allDongmanSchema.statics.getcount = function(callback){
			  return this.model("allDongman").count({},callback)
			}
	16、查看集合的状态
		db.students.stats()
	17、创建索引
		db.students.createIndex({"name":1},{unique:true});
		unique表示索引唯一
	
