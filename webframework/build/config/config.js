'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _local = require('./local');

var _local2 = _interopRequireDefault(_local);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = {
	'port': '80'
}; //本地引入，方便做合并，判断是开发或者线上环境，然后来做合并

let config = {
	//静态模板目录
	'viewDir': _path2.default.join(__dirname, '..', 'views'), //dirname当前目录名，..向上找两个,views目录
	//静态资源目录
	//静态资源一般的团队都不存在项目里，而存在CDN上的，一般这个assets目录要拷走传到CDN上去，最次放在七牛上,给Node压力小点
	'staticDir': _path2.default.join(__dirname, '..', 'assets'),
	'env': process.env.NODE_ENV //"development"开发模式 production生产模式
};
if (!config.env || config.env == "development") {
	//开发模式
	config = _lodash2.default.extend(config, _local2.default);
} else {
	config = _lodash2.default.extend(config, server);
}

exports.default = config;