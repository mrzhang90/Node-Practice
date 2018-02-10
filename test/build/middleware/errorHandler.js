'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
const errorHandler = {
	error(app, logger) {
		app.use(async (ctx, next) => {
			try {
				await next();
			} catch (err) {
				ctx.status = crx.status || 500;
				logger.error(crx.status + ':' + err);
				ctx.body = '500';
			}
		});
		app.use(async (ctx, next) => {
			await next();
			if (404 != ctx.status) return;
			ctx.status = 404;
			logger.error(ctx.status);
			ctx.body = '404';
		});
	}
};

exports.default = errorHandler;