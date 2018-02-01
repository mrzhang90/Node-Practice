import controllerIndex from './controllerIndex';
const controllerInit = {
	getAllRouter(app, router) {
		app.use(router(_ => {
			_.get('/', controllerIndex.getRouter())
		}))
	}
}
export default controllerInit;