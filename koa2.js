1������/ʹ�� koa-router
	const Koa = require('koa')
	const router = require('koa-router')()
	const app = new Koa()
	router.get('/hello/:name', async (ctx, next) => {
		// ȡ��·������name��ֵ
		var name = ctx.params.name
		ctx.response.body = `<h1>hello,${name}</h1>`
	})
	app.use(reuter.routes())
2����������(get/post)	ctx.request.method
3������url('/hi')	ctx.request.url
4��get����
	ctx.query || ctx.request.query ���� {a:1,b:2}
	ctx.querystring || ctx.request.querystring ���� a=1&b=2
5��post����
	const bodyParser = require('koa-bodyparser')
	app.use(bodyParser())
	ctx.request.body ����post���ݣ�{a:1,b:2}
6����̬Ŀ¼
	const static = require('koa-static')
	app.use(static(
		path.join(__dirname, staticpath)
	))
7��ʹ��ejs
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