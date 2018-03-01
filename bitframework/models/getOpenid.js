const bitcoin = require('bitcoinjs-lib');
const bigi = require('bigi');
const axios = require('axios')
let getOpen=function(){
	return new Promise((resolve,reject)=>{
		axios.get('http://192.168.1.104/')
		  .then(function (response) {
		  	let userinfo=response.data;
		    var hash = bitcoin.crypto.sha256(Buffer.from(userinfo.openid))
		    var d = bigi.fromBuffer(hash)
		    var keyPair = new bitcoin.ECPair(d)
		    var address = keyPair.getAddress()
		    userinfo['openid']=address;
		  	resolve(userinfo)
		  })
		  .catch(function (error) {
		    reject(error)
		  });
	})
}
module.exports = {
	getOpen
}