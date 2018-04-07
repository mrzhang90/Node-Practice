// bitcoin:1McYTSKoHstLLZz7SHEn143VjgPjG7gGyp?amount=1.00001622
const Koa = require('koa');
const render = require('koa-swig');
const serve = require('koa-static');
const router = require('koa-simple-router');
const bodyparser = require('koa-bodyparser')
const session = require('koa-session');
const co = require('co');
const path = require('path');
const _ = require('lodash');
const app=new Koa();
const controller = require('./controller/controller')
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
app.keys = ['zhang guang sen'];
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));
controller.controllerInit.getAllrouters(app,router)
//监听端口
app.listen(config.port,()=>{
	console.log('listening on port %s',config.port);
})