const bitcoin = require('bitcoinjs-lib');
const bigi = require('bigi');
const axios = require('axios')
let insertUserInfo=function(openid,nickname){
	return new Promise((resolve,reject)=>{
		axios.post('http://192.168.1.105/insertUserInfo.php?openid='+openid+'&nickname='+nickname)
		  .then(function (response) {
		  	resolve(response.data)
		  })
		  .catch(function (error) {
		    reject(error)
		  });
	})
}
module.exports = {
	insertUserInfo
}