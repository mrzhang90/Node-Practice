const cssnext=require('postcss-cssnext');
//处理基础的变量
const cssvariables=require('postcss-css-variables');
//预处理的css-类似sass,向写js一样写css
const precss =require('precss');
modules.exports=function(){
	return [
		//浏览器向上3个版本,生成对应的css
		precss({browsers:"last 3 versions"}),
		cssnext({}),
		cssvariables({})

	]
}