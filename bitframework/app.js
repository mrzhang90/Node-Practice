const Koa = require('koa');
const render = require('koa-swig');
const serve = require('koa-static');
const router = require('koa-simple-router');
const bodyparser = require('koa-bodyparser')
const co = require('co');
const path = require('path');
const _ = require('lodash');
const bitcoin = require('bitcoinjs-lib')
const bigi = require('bigi')
const app=new Koa();
const getOpenid = require('./models/getOpenid')
const getUserInfo = require('./models/getUserInfo')
const insertUserInfo = require('./models/insertUserInfo')
const model_outMoney = require('./models/outMoney')
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
app.use(bodyparser());//把 post 数据处理到 request.body 中，注意不是 response.body 所以不能通过 ctx 直接拿到
const indexController = {
	index() {
		return async (ctx, next) => {
			let userinfo;
			if(ctx.cookies.get('userinfo')){
				userinfo = JSON.parse(new Buffer(ctx.cookies.get('userinfo'), 'base64').toString())
			}else{
				let wx_userinfo = await getOpenid.getOpen();
				let users = await getUserInfo.getUser(wx_userinfo.openid);
				if(users.data.length<=0){
					userinfo=wx_userinfo;
					await insertUserInfo.insertUserInfo(wx_userinfo.openid,wx_userinfo.nickname);
				}else{
					userinfo=users.data[0];
				}
				ctx.cookies.set('userinfo', new Buffer(JSON.stringify(userinfo)).toString('base64'));
			}
			ctx.body = await ctx.render('index',userinfo);
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
	},
	outMoney(){
		return async (ctx, next) => {
			let data = ctx.request.body
			
    		ctx.body = await model_outMoney.outMoney(data)
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
			_.post('/outMoney', indexController.outMoney());
		}))
	}
};
controllerInit.getAllrouters(app,router)
//监听端口
app.listen(config.port,()=>{
	console.log('ydVueSystem listening on port %s',config.port);
})