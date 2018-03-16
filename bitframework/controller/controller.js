const indexController = require('./indexController')
const controllerInit = {
	getAllrouters(app, router) {
		app.use(router(_ => {
			_.get('/', indexController.controller.index());
			_.get('/downloadImg', indexController.controller.downloadImg());
			_.get('/sendMoney', indexController.controller.sendMoney());
			_.get('/setPassword', indexController.controller.setPassword());
			_.get('/getDetails', indexController.controller.getDetails());
			_.post('/outMoney', indexController.controller.outMoney());
			_.post('/updatePassword', indexController.controller.updatePassword());
		}))
	}
};
module.exports = {
	controllerInit
}