const config=require('../configs/config');
const bitcoin = require('bitcoinjs-lib');
const bigi = require('bigi');
const axios = require('axios')
let insert={
	insertUserInfo(openid,nickname){
		return new Promise((resolve,reject)=>{
			axios.post(config.config+'/insertUserInfo.php?openid='+openid+'&nickname='+nickname)
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
	insert
}