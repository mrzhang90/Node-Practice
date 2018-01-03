console.log('环境变量',process.env.NODE_ENV)
import Koa from 'koa';
import controllInit from './controllers/controllInit';
import config from './config/config';
import errorHandler from './middleware/errorHandler';
import log4js from 'log4js';
import router from 'koa-simple-router';
log4js.configure({
  appenders: { mrzhang: { type: 'file', filename: './build/mrzhang.log' } },
  categories: { default: { appenders: ['mrzhang'], level: 'error' } }
});
const logger = log4js.getLogger('mrzhang');
const app=new Koa();
logger.error('Cheese is too ripe!');
errorHandler.error(app,logger);
controllInit.getAllrouters(app,router);
//监听端口
app.listen(config.port,()=>{
	console.log('ydVueSystem listening on port %s',config.port);
})

// api测试的时候，supertest 文件，就把app暴露出去 
// if(config.ENV == "test"){
	export default app;
// }