// console.log(process.env.NODE_ENV)
import Koa from "koa";
import router from "koa-simple-router";
import render from "koa-swig";
import serve from 'koa-static';
import log4js from 'log4js';
import co from 'co';
import config from './config/config.js'
import controllerInit from './controllers/controllerInit.js'
import errorHandler from './middleware/errorHandler';
const app = new Koa();
log4js.configure({
	appenders: {
		mrzhang: {
			type: 'file',
			filename: './build/logs/mrzhang.log'
		}
	},
	categories: {
		default: {
			appenders: ['mrzhang'],
			level: 'error'
		}
	}
});
const logger = log4js.getLogger('mrzhang');

app.context.render = co.wrap(render({
	root: config.viewDir,
	autoescape: true,
	cache: 'memory',
	ext: 'html',
	writeBody: false
}));

controllerInit.getAllRouter(app, router);
app.use(serve(config.staticDir))
errorHandler.error(app, logger);
app.listen(config.port, () => {
	console.log('welcome listen to prot %s', config.port)
});