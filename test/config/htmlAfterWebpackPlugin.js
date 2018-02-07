function htmlAfterWebpackPlugin(options) {}

function asetsHelper(assets, type) {
	const dir = {
		css: () => `<link rel="stylesheet" href="${assets}">`,
		js: () => `<script src="${assets}"></script>`,
	}
	return dir[type] && dir[type]();
}
htmlAfterWebpackPlugin.prototype.apply = function(compiler) {
	// ... 
	compiler.plugin('compilation', function(compilation) {
		compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
			// htmlPluginData.html
			var _html=htmlPluginData.html;
			var assets=htmlPluginData.assets;
			console.log(assets)
			htmlPluginData.html=_html;
			callback(null, htmlPluginData);
		});
	});

};

module.exports = htmlAfterWebpackPlugin;