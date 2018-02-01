import indexModule from '../models/indexModule';
const controllerIndex = {
	getRouter() {
		return async(ctx, next) => {
			const module=new indexModule();
			const result=await module.getData();
			ctx.body = await ctx.render('index',{data:result});
		}
	}
}
export default controllerIndex;