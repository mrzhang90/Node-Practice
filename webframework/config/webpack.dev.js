const conf = require('./webpack.conf');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const options = {
	output: {
		path: path.join(__dirname, '../build/'),
		publicPath: '/',
		filename: 'assets/scripts/[name].bundle.js'
	},
	plugins: [
		new ExtractTextPlugin("assets/styles/[name].css"),
		//scope hoisting
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev')
		}),
		// new webpack.optimize.UglifyJsPlugin({
		// 	output: {
		// 		//最近凑的输出
		// 		beautify: false,
		// 		comments: false,
		//      	},
		//      	//额外的压缩选项
		//      	compress:{
		//       	//在UglifyJs删除没有用到的代码时不输出警告
		//       	warnings: true,
		//      		//通过true放弃对console.*功能的调用
		//      			//如果您希望在函数调用后删除特定的函数调用，
		//      			//例如console.info和/或保留副作用，则可以使用pure_funcs。
		// 		//还可以兼容ie浏览器
		//     			drop_console:true,
		//     			//内嵌定义了但是只用到了一次的变量
		//     			collapse_vars:true,
		//     			//提取出出现多次但是没有定义成变量去引用的静态值
		//     			reduce_vars:true
		//      	},
		//      	//使用源映射将错误消息位置映射到模块（这会降低编译速度）
		//      	sourceMap: false
		// })
	]
}
const _options = Object.assign(conf.dev, options);
module.exports = _options;