1、var data = JSON.parse(str);//把字符串转为json对象
	eval解析任何js，不安全
   var str = JSON.stringify(data);//把json对象转为字符串
2、	①处理缓存："&_t="+new Data().getTime();//当前时间戳
	②在php设置header头，禁止浏览器缓存此页面
	header("Cache-Control:no-cache");
	header("Pragma:no-cache");
	header("Expires:-1");
3、步骤
	var xhr = new XMLHttpRequest();
    xhr.open("post","./02post.php",true);
	//post请求时设置请求头
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
	或上传时的请求头： xhr.setRequestHeader('X-Request-With', 'XMLHttpRequest');
    xhr.send("use="+val);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(this.status==200){
				var data = this.responseText;
				//xml使用responseXML属性来处理
			}
		}
	}
	onreadystatechange在h5中不推荐使用,可以使用onload(请求完成并返回正确)代替
4、	get:中文/特殊符号需要编码
	post:中文不需要编码,但特殊符号需要
	js:var val=encodeURIComponent(str);//js中把有特殊字符的参数进行编码
	php:urlencode(str);编码
		urldecode(str);反编码
5、	php生成json：
	json_encode(数组/对象);
	php处理json：
	json_decode(json信息(字符串),boolean);true时为数组，false时为对象
6、阻止from表单提交
	from.onsubmit = function(e){
		e.preventDefault();//通过事件对象阻止浏览器默认动作
		return false;//阻止浏览器from表单提交
	}
7、FormData接收from表单信息(html5)
	表单内容必须有name属性
	特殊符号不用编码
	var f = new FormData(from对象);
	post方式提交ajax时不用设置请求头
	xhr.send(f);
8、文件上传进度条
	xhr.upload.onprogress = function(e){ //文件上传时每隔100ms左右执行一次
		var loaded = e.loaded; //要发送的总量
		var roral = e.total;	//已发送的总量
		var per = Math.floor((loaded/total)*100)+"%";
		document.getElementById('son').style.width=per;
	}
9、ajax跨域
	1、
		ajax请求本域代理，php:
		$url = "接口";
		$cont = file_get_contents($url);
		echo $cont;
	2、CORS
		在跨域的php中允许本域访问(服务端)
		header('Access-Control-Allow-Origin:http://www.a.com');//可以把域名改为*允许所有访问
	3、jsonp
		var url='';
		var script = document.creatElement('script');
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
    // 这里是后台返回的字符串
    box({
      'name': 'test'
    })
		function box(data){
      //处理数据 
    }
	4、IE78跨域
		var xhr = new XDomainRequest();
		xhr.onload = function(){
			alert(this.responseText);
		}
		xhr.open('get','http://www.b.com/ajsx.php',true);
		xhr.send();
  5、使用window.name来进行跨域
  6、html5 postMessage解决跨域、跨窗口消息传递
    5和6一般都是夸文档、窗口
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  