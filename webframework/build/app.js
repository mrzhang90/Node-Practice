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

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('环境变量', process.env.NODE_ENV);
//还没有用vue做前后的重构，那么这里就先用模板做render
//render是需要配置的，就需要co模板，co是next然后next一步步往下跑的

const app = new _koa2.default();
//render的配置
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: _config2.default.viewDir,
  autoescape: true,
  cache: 'memory', // disable, set to false
  ext: 'html',
  writeBody: false,
  varControls: ["[[", "]]"] //修改swig模板的默认标签，避免跟vue的标签冲突
}));
_log4js2.default.configure({
  appenders: { mrzhang: { type: 'file', filename: './logs/mrzhang.log' } },
  categories: { default: { appenders: ['mrzhang'], level: 'error' } }
});
const logger = _log4js2.default.getLogger('mrzhang');
logger.error('Cheese is too ripe!');
_errorHandler2.default.error(app, logger);
_controllInit2.default.getAllrouters(app, _koaSimpleRouter2.default);
app.use((0, _koaStatic2.default)(_config2.default.staticDir)); //配置静态文件
//监听端口
app.listen(_config2.default.port, () => {
  console.log('VueSystem listening on port %s', _config2.default.port);
});

// api测试的时候，supertest 文件，就把app暴露出去 
// if(config.ENV == "test"){
exports.default = app;
// }