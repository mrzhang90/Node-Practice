const bitcoin = require('bitcoinjs-lib');
const bigi = require('bigi');
const axios = require('axios')
let getUser=function(){
	return new Promise((resolve,reject)=>{
		axios.get('http://192.168.1.105/')
		  .then(function (response) {
		    var hash = bitcoin.crypto.sha256(Buffer.from(response.data))
		    var d = bigi.fromBuffer(hash)
		    var keyPair = new bitcoin.ECPair(d)
		    var address = keyPair.getAddress()

			  	resolve(address)
		  })
		  .catch(function (error) {
		    reject(error)
		  });
	})
}
module.exports = {
	getUser
}