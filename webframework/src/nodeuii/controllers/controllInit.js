import indexController from './indexController';
const controllerInit = {
	getAllrouters(app, router) {
		app.use(router(_ => {
			_.get('/', indexController.index());
			_.get('/index', indexController.index());
			_.get('/index.html', indexController.index());
		}))
	}
};
export default controllerInit;