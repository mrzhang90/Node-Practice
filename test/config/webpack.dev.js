const path = require('path');
const webpack = require('webpack');
const conf = require('./webpack.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-plus-webpack-plugin");
const htmlAfterWebpackPlugin = require('./htmlAfterWebpackPlugin.js');
const options = {
	output: {
		path: path.join(__dirname, "../build/"),
		publicPath: '/',
		filename: "assets/script/[name].boundle.js"
	},
	plugins: [
		new ExtractTextPlugin("assets/styles/[name].css"),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new HtmlWebpackPlugin({
			filename: 'assets/admin.html',
			template:'src/web/views/index/pages/index.html',
			inject:false
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || "dev")
		}),
		new htmlAfterWebpackPlugin({})
	]
}
const _options = Object.assign(conf.dev, options);
module.exports = _options;