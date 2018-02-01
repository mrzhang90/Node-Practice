import rp from "request-promise";
import cheerio from "cheerio";
export default class indexModule {
	constructor(ctx) {}
	getData() {
		return new Promise((resolve, reject) => {
			rp('http://news.baidu.com/')
				.then((htmlString) => {
					const $ = cheerio.load(htmlString)
					let arr=['<dl><dt>新闻：</dt>'];
					$('.hotnews li').each(function(){
						arr.push('<dd>');
						arr.push('<a href="'+$(this).find('strong a').attr('href')+'">'+$(this).find('strong a').html()+'</a>')
						arr.push('</dd>');
					})
					arr.push('</dl>')
					resolve(arr.join(''))
				})
				.catch(function(err) {
					reject('err')
				});
		})
	}
}