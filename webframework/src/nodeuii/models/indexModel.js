import rp from 'request-promise';
import cheerio from 'cheerio';
export default class indexModel {
	constructor(ctx) {}
	getData() {
		return new Promise((resolve, reject) => {
			rp('http://www.chnc.com.cn/front/news.do')
				.then((htmlString) => {
					const $ = cheerio.load(htmlString);
					const html = $('.honour_details p').map(function(i, el) {
					  return $(this).text();
					}).get().join(' ');
					resolve(html);
				})
				.catch((err) => {
					reject(err);
				});
		})
	}
}