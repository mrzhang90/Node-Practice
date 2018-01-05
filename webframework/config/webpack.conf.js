const webpack = require('webpack');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const pagesPath = path.join(__dirname, '../src/web/views');
const widgetPath = path.join(__dirname, '../src/widget');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
console.log(_entries)
const _modules = {
	rules: [{
		test: /\.(css)$/,
		loader: ExtractTextPlugin.extract({
			//失败之类-进入这里处理
			fallback: 'style-loader',
			use: [{
				loader: 'css-loader'
			}, {
				loader: 'postcss-loader',
				options: {
					plugins: function() {
						//这里放postcss对应的插件

					}
				}
			}]
		})
	}, {
		test: /\.js$/,
		loader: 'babel-loader',
		options: {
			"presets": ['env']
		}
	}]
}
const _resolve = {
	extensions: [".js", ".css"]
}
const _devLoaders = _.clone(_modules.rules);
const _prodLoaders = _.clone(_modules.rules);
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