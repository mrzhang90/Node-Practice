"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
//404 500
//koa的async和yeild执行顺序
const errorHandler = {
	error(app, logger) {
		//500
		app.use(async (ctx, next) => {
			try {
				await next();
			} catch (err) {
				ctx.status = ctx.status || 500;
				logger.error(ctx.status + ":" + err);
				ctx.body = "500";
			}
		});
		// 404
		app.use(async (ctx, next) => {
			// ---------->
			await next();
			// <------------
			if (404 != ctx.status) return;
			ctx.status = 404;
			logger.error("404");
			ctx.body = "404";
		});
	}
};
exports.default = errorHandler;