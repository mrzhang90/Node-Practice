const indexController = require('./indexController')
const asyncController = require('./asyncController')
const controllerInit = {
	getAllrouters(app, router) {
		app.use(router(_ => {
			_.get('/', indexController.controller.index());
			_.get('/downloadImg', indexController.controller.downloadImg());
			_.get('/info', indexController.controller.info());
			_.get('/sendMoney', indexController.controller.sendMoney());
			_.get('/setPassword', indexController.controller.setPassword());
			_.post('/outMoney', asyncController.controller.outMoney());
			_.post('/updatePassword', asyncController.controller.updatePassword());
		}))
	}
};
module.exports = {
	controllerInit
}