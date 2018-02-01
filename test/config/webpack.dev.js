const path=require('path');
const conf=require('./webpack.conf');
const options={
	output:{
		path: path.join(__dirname , "/build/"),
		publicPath:'/',
        filename: "assets/script/[name].boundle.js"
	}
}
const _options=Object.assign(conf.dev,options);
module.exports=_options;