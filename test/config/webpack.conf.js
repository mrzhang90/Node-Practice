const webpack = require('webpack');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const pagesPath = path.join(__dirname, '../src/web/views');
// const widgetPath = path.join(__dirname, '../src/web/widget');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//处理所有的js入口文件
const jsEntris = {};
fs.readdirSync(pagesPath).map((o, filename) => {
	const _fd = path.join(pagesPath, o);
	fs.readdirSync(_fd).map((innero, ifile) => {
		if (/.entry.js$/.test(innero)) {
			jsEntris[innero.replace(".entry.js", "")] = path.join(_fd, innero)
		}
	})
})
// 1.入口文件指定OK
// 2.loaders配置OK
// 3.公用的模块
const _entries = Object.assign(jsEntris);
const _modules = {
	rules: [{
		test: /\.js$/,
		loader: 'babel-loader',
		options: {
			"presets": [
				['env', {
					'modules': false //很重要,这样设置后，webpack执行删除无用代码、优化代码都才会生效
				}]
			]
		}
	}, {
		test: /\.css$/,
		loader: ExtractTextPlugin.extract({
			fallback: "style-loader",
			use: "css-loader!postcss-loader"
		})
	}]
}
const _resolve = {
	extensions: [".js", ".css"]
}
const _devLoaders = _.clone(_modules.rules);
const _prodLoaders = _.clone(_modules.rules);
const fileloader = {
	test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
	loader: 'file-loader?name=images/[name].[ext]'
};
_devLoaders.push(fileloader);
_prodLoaders.push({
	test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
	loader: 'file-loader?limit=320&name=images/[name].[hash:5].[ext]' //limit=8192 是说图片小于8192会转成base64
});
// console.log(_devLoaders);
// console.log(_prodLoaders);
const WebpackConfig = {
	dev: {
		entry: _entries,
		module: {
			rules: _devLoaders
		},
		resolve: _resolve
	},
	prod: {
		entry: _entries,
		module: {
			rules: _prodLoaders
		},
		resolve: _resolve
	}
};
module.exports = WebpackConfig;