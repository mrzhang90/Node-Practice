const path=require('path');
const webpack=require('webpack');
const conf=require('./webpack.conf');
const options={
	output:{
		path: path.join(__dirname , "../build/"),
		publicPath:'/',
        filename: "assets/script/[name].boundle.js"
	},
	plugins:[
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || "dev")
		}),
	]
}
const _options=Object.assign(conf.dev,options);
module.exports=_options;