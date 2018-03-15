const bitcoin = require('bitcoinjs-lib');
const bigi = require('bigi');
let getBit={
	getAddress(openid,test){
		var address;
		if(test){
			function rng () { return Buffer.from(openid) }
			let testnet = bitcoin.networks.testnet
			var keyPair = bitcoin.ECPair.makeRandom({ network: testnet, rng: rng })
    		address = keyPair.getAddress()
		}else{
			let hash = bitcoin.crypto.sha256(Buffer.from(openid))
			let d = bigi.fromBuffer(hash)
			let keyPair = new bitcoin.ECPair(d)
			address = keyPair.getAddress()
		}
		return address;
	}
}
module.exports = {
	getBit
}