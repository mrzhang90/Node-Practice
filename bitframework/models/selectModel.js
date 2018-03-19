const config=require('../configs/config');
const util = require('../configs/util')
const bitcoin = require('bitcoinjs-lib');
const bigi = require('bigi');
const axios = require('axios')
let select ={
	getUser(openid,axios){
		return new Promise((resolve,reject)=>{
			axios.get(config.config+'/getUserInfo.php?openid='+openid)
				.then(function (response) {
					resolve(response.data)
				})
				.catch(function (error) {
					reject(error)
				});
		})
	},
	getWxInfo(axios){
		return new Promise((resolve,reject)=>{
			axios.get(config.config+'/getWxInfo.php')
			  .then(function (response) {
			  	let userinfo=response.data;
			    let address=util.util.getAddress(userinfo.openid)
			    console.log(1,userinfo.openid,address)
			    userinfo['openid']=address;
			  	resolve(userinfo)
			  })
			  .catch(function (error) {
			    reject(error)
			  });
		})
	},
	getDetails(uid,axios){
		return new Promise((resolve,reject)=>{
			axios.get(config.config+'/getDetails.php?userid='+uid)
			  .then(function (response) {
			  	resolve(response.data)
			  })
			  .catch(function (error) {
			    reject(error)
			  });
		})
	}
}
module.exports = {
	select
}