//404 500
//koa的async和yeild执行顺序
const errorHandler={
	error(app){
		app.use(async(ctx,next)=>{
			try{
				await next();
			}catch(err){
				console.log('errorCode',err);
				ctx.status = err.status || 500;
				ctx.body = await ctx.render('500',{data:err.status});
			}
		});
		app.use(async(ctx,next)=>{
			await next();
			if(404!=ctx.status)
					return;
			ctx.status = 404;
			ctx.body = await ctx.render('404');
		})
	}
};
export default errorHandler;