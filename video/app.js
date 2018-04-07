const Koa=require('koa');
const render = require('koa-swig');
const serve = require('koa-static');
const path = require('path');
const router = require('koa-simple-router');
const co = require('co');
const controller = require('./controller/controller')
const app=new Koa();

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
controller.controllerInit.getAllrouters(app,router)
//监听端口
app.listen(config.port,()=>{
	console.log('listening on port %s',config.port);
})