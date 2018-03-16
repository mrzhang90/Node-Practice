const axios = require('axios')
const fs = require('fs'); 
const path = require('path');
const mineType = require('mime-types'); 
const querystring = require("querystring");
const model_insert = require('../models/insertModel')
const model_update = require('../models/updateModel')
const model_select = require('../models/selectModel')
let controller = {
	index() {
		return async (ctx, next) => {
			let userinfo;
			if(ctx.cookies.get('userinfo')){
				userinfo = JSON.parse(new Buffer(ctx.cookies.get('userinfo'), 'base64').toString())
			}else{
				let wx_userinfo = await model_select.select.getWxInfo(axios);
				let users = await model_select.select.getUser(wx_userinfo.openid,axios);
				if(users.data.length<=0){
					userinfo=wx_userinfo;
					await model_insert.insert.insertUserInfo(wx_userinfo.openid,wx_userinfo.nickname);
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
	getDetails() {
		return async (ctx, next) => {
			let data;
			if(ctx.cookies.get('userinfo')){
				let userinfo = JSON.parse(new Buffer(ctx.cookies.get('userinfo'), 'base64').toString())
				let result=await model_select.select.getDetails(userinfo['uid'],axios)
				if(result.status==0){
					data=result.data;
				}
			}else{
				ctx.response.redirect('/',data);
			}
			console.log(data)
			// {authors: ['Paul', 'Jim', 'Jane']}
			ctx.body = await ctx.render('info',{datas:data});
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
			//-1支付密码为空 -2提币失败 0 OK
			let result=await model_update.update.outMoney(querystring.stringify(data),axios);
			if(result.status==-2){
				ctx.session.isPayPassword = -2;
			}
			ctx.body = result;
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