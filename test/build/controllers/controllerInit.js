'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _controllerIndex = require('./controllerIndex');

var _controllerIndex2 = _interopRequireDefault(_controllerIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const controllerInit = {
	getAllRouter(app, router) {
		app.use(router(_ => {
			_.get('/', _controllerIndex2.default.getRouter());
		}));
	}
};
exports.default = controllerInit;