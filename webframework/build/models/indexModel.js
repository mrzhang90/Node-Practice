'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class indexModel {
	constructor(ctx) {}
	getData() {
		return new Promise((resolve, reject) => {
			(0, _requestPromise2.default)('http://www.chnc.com.cn/front/news.do').then(htmlString => {
				const $ = _cheerio2.default.load(htmlString);
				const html = $('.honour_details p').map(function (i, el) {
					return $(this).text();
				}).get().join(' ');
				resolve(html);
			}).catch(err => {
				reject(err);
			});
		});
	}
}
exports.default = indexModel;