function htmlAfterWebpackPlugin(options) {}
/*
*arrs:静态资源下的数组
*type:文件类型
*/
function assetsHelper(assets){
	let result={
		cssarr:[],
		jsarr:[]
	}
	const dir={
		css: (item) => `<link rel="stylesheet" href="${item}"/>`,
		js: (item) => `<script src="${item}"></script>`
	}
	for(let data of assets.css){
		result.cssarr.push(dir.css(data))
	}
	for(let data of assets.css){
		result.jsarr.push(dir.js(data))
	}
	return result;
}
htmlAfterWebpackPlugin.prototype.apply = function(compiler) {
	// ... 
	compiler.plugin('compilation', function(compilation) {
		compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
			// htmlPluginData.html
			var _html=htmlPluginData.html;
			var assets=htmlPluginData.assets;
			// var css=assetsHelper['css'](assets.css)
			// var js=assetsHelper['js'](assets.js)
			const result=assetsHelper(assets)
			console.log('/n---------/n')
			console.log('css:',result.cssarr.join(''));
			console.log('/n---------/n')
			console.log('css:',result.jsarr.join(''));
			console.log('/n---------/n')
			htmlPluginData.html=_html;
			callback(null, htmlPluginData);
		});
	});

};

module.exports = htmlAfterWebpackPlugin;