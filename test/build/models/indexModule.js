"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _requestPromise = require("request-promise");

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class indexModule {
	constructor(ctx) {}
	getData() {
		return new Promise((resolve, reject) => {
			(0, _requestPromise2.default)('http://news.baidu.com/').then(htmlString => {
				const $ = _cheerio2.default.load(htmlString);
				let arr = ['<dl><dt>新闻：</dt>'];
				$('.hotnews li').each(function () {
					arr.push('<dd>');
					arr.push('<a href="' + $(this).find('strong a').attr('href') + '">' + $(this).find('strong a').html() + '</a>');
					arr.push('</dd>');
				});
				arr.push('</dl>');
				resolve(arr.join(''));
			}).catch(function (err) {
				reject('err');
			});
		});
	}
}
exports.default = indexModule;