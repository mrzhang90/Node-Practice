const axios = require('axios')
const fs = require('fs'); 
const path = require('path');
const mineType = require('mime-types'); 
const querystring = require("querystring");
// const QRCode = require('qrcode')
// const util = require('../configs/util')
// const model_insert = require('../models/insertModel')
// const model_update = require('../models/updateModel')
// const model_select = require('../models/selectModel')
let controller = {
	index() {
		return async (ctx, next) => {
			// let data={};
			// data['isPayPassword']=ctx.session.isPayPassword || 0;
			ctx.body = await ctx.render('index');
		}
	},
	video(){
		return async (ctx, next) => {
			// axios.get('/video')
			  // .then(function (response) {
			  	// console.log('读取mp4文件')
			  	// let head = { 'Content-Type': 'video/mp4' };
			    //需要设置HTTP HEAD
			    // res.writeHead(200, head);
				ctx.status=200
			    ctx.type="video/mp4"
			    //使用pipe
			    let rs=fs.createReadStream('./assets/1.mp4')
		        	.pipe(ctx.res);
		        // console.log(rs)
			    // ctx.body=rs
			    // ctx.body=await ctx.render('index');
			  // })
			  // .catch(function (error) {
			  // 	console.log('失败')
			  // });
		}
	}
}
module.exports = {
	controller
}