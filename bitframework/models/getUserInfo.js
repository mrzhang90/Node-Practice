const bitcoin = require('bitcoinjs-lib');
const bigi = require('bigi');
const axios = require('axios')
let getUser=function(openid){
	return new Promise((resolve,reject)=>{
		axios.get('http://43.255.106.169:8081/getUserInfo.php?openid='+openid)
			.then(function (response) {
				resolve(response.data)
			})
			.catch(function (error) {
				reject(error)
			});
	})
}
module.exports = {
	getUser
}