1、引入/使用 koa-router
	const Koa = require('koa')
	const router = require('koa-router')()
	const app = new Koa()
	router.get('/hello/:name', async (ctx, next) => {
		// 取得路径后面name的值
		var name = ctx.params.name
		ctx.response.body = `<h1>hello,${name}</h1>`
	})
	app.use(reuter.routes())
2、请求类型(get/post)	ctx.request.method
3、请求url('/hi')	ctx.request.url
4、get数据
	ctx.query || ctx.request.query 返回 {a:1,b:2}
	ctx.querystring || ctx.request.querystring 返回 a=1&b=2
5、post数据
	const bodyParser = require('koa-bodyparser')
	app.use(bodyParser())
	ctx.request.body 就是post数据：{a:1,b:2}
6、静态目录
	const static = require('koa-static')
	app.use(static(
		path.join(__dirname, staticpath)
	))
7、使用ejs
	install -S koa-views ejs
	const views = require('koa-views')
	app.use(views(path.join(__dirname, './view'),{
		extension: 'ejs'
	}))
	app.use(async (ctx) =>{
		let title = 'htllo koa2'
		await ctx.render('index',{title})
	})
	
	
	
	
---------------------