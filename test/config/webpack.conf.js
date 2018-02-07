const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const pagesPath = path.join(__dirname, '../src/web/views');
const widgetPath = path.join(__dirname, '../src/widget');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//处理所有的js的入口文件
const jsEntris = {};
fs.readdirSync(pagesPath).map((o, filename) => {
	const _fd = path.join(pagesPath, o)
	fs.readdirSync(_fd).map((innero, ifile) => {
		if (/.entry.js$/.test(path.join(_fd, innero))) {
			jsEntris[innero.replace(".entry.js", "")] = path.join(_fd, innero)
		}
	})
})
//1.指定入口文件
//2.loaders配置
//3.公用的模块
const _entries = Object.assign(jsEntris);
const _modules = {
	rules: [
	{
		test: /\.css$/,
		loader: ExtractTextPlugin.extract({
			fallback: "style-loader",
			use: "css-loader!postcss-loader"
		})
	}, 
	{
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
}
module.exports = WebpackConfig;