'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _indexModel = require('../models/indexModel');

var _indexModel2 = _interopRequireDefault(_indexModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const indexController = {
	index() {
		return async (ctx, next) => {
			const indexModelIns = new _indexModel2.default();
			const result = await indexModelIns.getData();
			ctx.body = result;
		};
	}
};
exports.default = indexController;