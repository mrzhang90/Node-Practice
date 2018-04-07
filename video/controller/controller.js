const indexController = require('./indexController')
const controllerInit = {
	getAllrouters(app, router) {
		app.use(router(_ => {
			_.get('/', indexController.controller.index());
			_.get('/video', indexController.controller.video());
			// _.post('/updatePassword', indexController.controller.updatePassword());
		}))
	}
};
module.exports = {
	controllerInit
}