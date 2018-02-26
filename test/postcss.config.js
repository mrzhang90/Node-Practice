const cssnext =require('postcss-cssnext');
const cssvariables =require('postcss-css-variables');
const precss =require('precss');
module.exports=function(){
	return [
		precss({browsers:"last 3 versions"}),
		cssnext({}),
		cssvariables({})
	];	
}