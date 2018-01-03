'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _controllInit = require('./controllers/controllInit');

var _controllInit2 = _interopRequireDefault(_controllInit);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _errorHandler = require('./middleware/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('环境变量', process.env.NODE_ENV);

_log4js2.default.configure({
  appenders: { mrzhang: { type: 'file', filename: './build/mrzhang.log' } },
  categories: { default: { appenders: ['mrzhang'], level: 'error' } }
});
const logger = _log4js2.default.getLogger('mrzhang');
const app = new _koa2.default();
logger.error('Cheese is too ripe!');
_errorHandler2.default.error(app, logger);
_controllInit2.default.getAllrouters(app, _koaSimpleRouter2.default);
//监听端口
app.listen(_config2.default.port, () => {
  console.log('ydVueSystem listening on port %s', _config2.default.port);
});

// api测试的时候，supertest 文件，就把app暴露出去 
// if(config.ENV == "test"){
exports.default = app;
// }