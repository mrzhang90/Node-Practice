const axios = require('axios')
const querystring = require("querystring");
const model_select = require('../models/select')
const model_outMoney = require('../models/outMoney')
const model_update = require('../models/update')
let controller = {
	outMoney(){
		return async (ctx, next) => {
			let data = ctx.request.body
			let userinfo=JSON.parse(new Buffer(ctx.cookies.get('userinfo'), 'base64').toString());
			data['openid']=userinfo.openid;

			//查询支付密码，是否为空
			let isPayPassword = await model_select.select.getPayPassword(data['openid'],axios);
			if(isPayPassword.status==0){
	    		ctx.body = await model_outMoney.outMoney(querystring.stringify(data),axios)
			}else if(isPayPassword.status==-2){
				ctx.session.isPayPassword = -2;
				isPayPassword.msg='请设置提币密码';
    			ctx.body = await isPayPassword
			}else{
				isPayPassword.msg='请重新尝试';
    			ctx.body = await isPayPassword
    		}
		}
	},
	updatePassword(){
		return async (ctx, next) => {
			let data = ctx.request.body
			let userinfo=JSON.parse(new Buffer(ctx.cookies.get('userinfo'), 'base64').toString());
			data['openid']=userinfo.openid;
    		let result = await model_update.update.updatePassword(querystring.stringify(data),axios);
    		console.log(result.data);
    		if(result.data==0){
    			ctx.session.isPayPassword = 0;
    		}
    		ctx.body = result;
		}
	}
}
module.exports = {
	controller
}