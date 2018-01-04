console.log('环境变量',process.env.NODE_ENV)
import Koa from 'koa';
import controllInit from './controllers/controllInit';
import config from './config/config';
import errorHandler from './middleware/errorHandler';
import log4js from 'log4js';
import router from 'koa-simple-router';
//还没有用vue做前后的重构，那么这里就先用模板做render
//render是需要配置的，就需要co模板，co是next然后next一步步往下跑的
import render from 'koa-swig';
import serve from 'koa-static';
import co from 'co';
const app=new Koa();
//render的配置
app.context.render = co.wrap(render({
  root: config.viewDir,
  autoescape: true,
  cache: 'memory', // disable, set to false
  ext: 'html',
  writeBody: false
}));
log4js.configure({
  appenders: { mrzhang: { type: 'file', filename: './build/mrzhang.log' } },
  categories: { default: { appenders: ['mrzhang'], level: 'error' } }
});
const logger = log4js.getLogger('mrzhang');
logger.error('Cheese is too ripe!');
errorHandler.error(app,logger);
controllInit.getAllrouters(app,router);
app.use(serve(config.staticDir));//配置静态文件
//监听端口
app.listen(config.port,()=>{
	console.log('ydVueSystem listening on port %s',config.port);
})

// api测试的时候，supertest 文件，就把app暴露出去 
// if(config.ENV == "test"){
	export default app;
// }