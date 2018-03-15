const axios = require('axios')
const fs = require('fs'); 
const path = require('path');
const mineType = require('mime-types'); 
const querystring = require("querystring");
const getWxInfo = require('../models/getWxInfo')
const getUserInfo = require('../models/getUserInfo')
const insertUserInfo = require('../models/insertUserInfo')
let controller = {
	index() {
		return async (ctx, next) => {
			let userinfo;
			if(ctx.cookies.get('userinfo')){
				userinfo = JSON.parse(new Buffer(ctx.cookies.get('userinfo'), 'base64').toString())
			}else{
				let wx_userinfo = await getWxInfo.getInfo(axios);
				let users = await getUserInfo.getUser(wx_userinfo.openid);
				if(users.data.length<=0){
					userinfo=wx_userinfo;
					await insertUserInfo.insertUserInfo(wx_userinfo.openid,wx_userinfo.nickname);
				}else{
					userinfo=users.data[0];
				}
				ctx.cookies.set('userinfo', new Buffer(JSON.stringify(userinfo)).toString('base64'));
			}
			ctx.body = await ctx.render('index',userinfo);
		}
	},
	downloadImg(){
		return async (ctx, next) => {
			let data = ctx.query.codeImg.split('/')
			var fileName = data[data.length-1];
			let filePath=path.join(__dirname,'../assets/images/',fileName)
			var stats = fs.statSync(filePath); 
			if(stats.isFile()){
				ctx.type="application/octet-stream"
				ctx.attachment(fileName);
				ctx.length=stats.size
				ctx.body=fs.readFileSync(filePath);
			} else {
				ctx.status=404
			}
		}
	},
	info() {
		return async (ctx, next) => {
			ctx.body = await ctx.render('info');
		}
	},
	sendMoney() {
		return async (ctx, next) => {
			ctx.body = await ctx.render('sendMoney');
		}
	},
	setPassword() {
		return async (ctx, next) => {
			let data={};
			data['isPayPassword']=ctx.session.isPayPassword || 0;
			ctx.body = await ctx.render('setPassword',data);
		}
	},
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
	}
}
module.exports = {
	controller
}