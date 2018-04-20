const conf = require('./webpack.conf');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//这是我自己写的插件
const htmlAfterWebpackPlugin = require('./htmlAfterWebpackPlugin');

const options = {
	output: {
		path: path.join(__dirname, '../build/assets/'),
		publicPath: '/',
		filename: 'scripts/[name].bundle.js'
	},
	plugins: [
		new ExtractTextPlugin("styles/[name].css"),
		//scope hoisting
		new webpack.optimize.ModuleConcatenationPlugin(),
		new HtmlWebpackPlugin({
			filename: '../views/index.html',//要去生成的文件
			template:'src/web/views/index/pages/index.html',//原始的要去读的文件
			inject:false//不要默认的把js插进来，我自定义 控制模板的顺序
		}),
		new HtmlWebpackPlugin({
			filename: '../views/layout.html',//要去生成的文件
			template:'src/web/views/common/pages/layout.html',//原始的要去读的文件
			inject:false//不要默认的把js插进来，我自定义 控制模板的顺序
		}),
		new HtmlWebpackPlugin({
			filename: '../widget/header.html',//要去生成的文件
			template:'src/web/widget/ydheader/header.html',//原始的要去读的文件
			inject:false//不要默认的把js插进来，我自定义 控制模板的顺序
		}),
		new HtmlWebpackPlugin({
			filename: '../widget/footer.html',//要去生成的文件
			template:'src/web/widget/ydfooter/footer.html',//原始的要去读的文件
			inject:false//不要默认的把js插进来，我自定义 控制模板的顺序
		}),
		new HtmlWebpackPlugin({
			filename: '../widget/zhijia.html',//要去生成的文件
			template:'html-withimg-loader!src/web/widget/zhijia/zhijia.html',//原始的要去读的文件
			inject:false//不要默认的把js插进来，我自定义 控制模板的顺序
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev')
		}),
		new htmlAfterWebpackPlugin({})
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