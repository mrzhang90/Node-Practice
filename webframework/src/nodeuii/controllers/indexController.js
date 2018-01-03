import indexModel from '../models/indexModel';
const indexController = {
	index() {
		return async (ctx, next) => {
			const indexModelIns = new indexModel();
			const result = await indexModelIns.getData();
			ctx.body = result;
		}
	}
}
export default indexController;