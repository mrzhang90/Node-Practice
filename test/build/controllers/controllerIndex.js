'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _indexModule = require('../models/indexModule');

var _indexModule2 = _interopRequireDefault(_indexModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const controllerIndex = {
	getRouter() {
		return async (ctx, next) => {
			const module = new _indexModule2.default();
			const result = await module.getData();
			ctx.body = await ctx.render('index', { data: result });
		};
	}
};
exports.default = controllerIndex;