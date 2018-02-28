const Koa = require('koa');
const render = require('koa-swig');
const serve = require('koa-static');
const router = require('koa-simple-router');
const co = require('co');
const path = require('path');
const _ = require('lodash');
const bitcoin = require('bitcoinjs-lib')
const bigi = require('bigi')
const app=new Koa();
const getOpenid = require('./models/getOpenid')
const getUserInfo = require('./models/getUserInfo')
const insertUserInfo = require('./models/insertUserInfo')
let config={
	'port':'8080',
	//静态模板目录
	'viewDir':path.join(__dirname,'./','views'),//dirname当前目录名，..向上找两个,views目录
	//静态资源目录
	//静态资源一般的团队都不存在项目里，而存在CDN上的，一般这个assets目录要拷走传到CDN上去，最次放在七牛上,给Node压力小点
	'staticDir':path.join(__dirname,'./','assets')
}
//render的配置
app.context.render = co.wrap(render({
  root: config.viewDir,
  autoescape: true,
  cache: 'memory', // disable, set to false
  ext: 'html',
  writeBody: false
}));
app.use(serve(config.staticDir));//配置静态文件
const indexController = {
	index() {
		return async (ctx, next) => {
			var openid = await getOpenid.getUser();
			var getUser = await getUserInfo.getUser(openid);
			if(getUser.data.length<=0){
				console.log(openid)
				var ii = await insertUserInfo.insertUserInfo(openid,'aa');
				console.log(ii)
			}

			// let result;
			// if(ctx.cookies.get('username')){
			// 	result = JSON.parse(new Buffer(ctx.cookies.get('username'), 'base64').toString())
			// }else{
			// 	result = await indexModel.getUser();
			// 	if(result.data.length<=0){

			// 	}
			// 	ctx.cookies.set('username', new Buffer(JSON.stringify(result)).toString('base64'));
			// }
			// ctx.body = await ctx.render('index',{data:result,css:123,js:456});
			ctx.body = await ctx.render('index',{css:123,js:456});
		}
	},
	info() {
		return async (ctx, next) => {
			ctx.body = await ctx.render('info');
		}
	},
	sendMoney() {
		return async (ctx, next) => {
			ctx.body = await ctx.render('sendMoney');
		}
	},
	setPassword() {
		return async (ctx, next) => {
			ctx.body = await ctx.render('setPassword');
		}
	}
}
const controllerInit = {
	getAllrouters(app, router) {
		app.use(router(_ => {
			_.get('/', indexController.index());
			_.get('/info', indexController.info());
			_.get('/sendMoney', indexController.sendMoney());
			_.get('/setPassword', indexController.setPassword());
		}))
	}
};
controllerInit.getAllrouters(app,router)
//监听端口
app.listen(config.port,()=>{
	console.log('ydVueSystem listening on port %s',config.port);
})