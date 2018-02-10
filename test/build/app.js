"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require("koa-simple-router");

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _koaSwig = require("koa-swig");

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _config = require("./config/config.js");

var _config2 = _interopRequireDefault(_config);

var _controllerInit = require("./controllers/controllerInit.js");

var _controllerInit2 = _interopRequireDefault(_controllerInit);

var _errorHandler = require("./middleware/errorHandler");

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default(); // console.log(process.env.NODE_ENV)

_log4js2.default.configure({
	appenders: {
		mrzhang: {
			type: 'file',
			filename: './build/logs/mrzhang.log'
		}
	},
	categories: {
		default: {
			appenders: ['mrzhang'],
			level: 'error'
		}
	}
});
const logger = _log4js2.default.getLogger('mrzhang');

app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
	root: _config2.default.viewDir,
	autoescape: true,
	cache: 'memory',
	ext: 'html',
	writeBody: false
}));

_controllerInit2.default.getAllRouter(app, _koaSimpleRouter2.default);
app.use((0, _koaStatic2.default)(_config2.default.staticDir));
_errorHandler2.default.error(app, logger);
app.listen(_config2.default.port, () => {
	console.log('welcome listen to prot %s', _config2.default.port);
});