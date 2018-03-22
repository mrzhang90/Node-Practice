const bitcoin = require('bitcoinjs-lib');
const bigi = require('bigi');
let util={
	getAddress(openid){
		var address;
		if(process.env.NODE_ENV=="development"){
			function rng () { return Buffer.from(openid) }
			let testnet = bitcoin.networks.testnet
			var keyPair = bitcoin.ECPair.makeRandom({ network: testnet, rng: rng })
    		address = keyPair.getAddress()
		}else{
			function rng () { return Buffer.from(openid) }
			let testnet = bitcoin.networks.testnet
			var keyPair = bitcoin.ECPair.makeRandom({ network: testnet, rng: rng })
    		address = keyPair.getAddress()
			// let hash = bitcoin.crypto.sha256(Buffer.from(openid))
			// let d = bigi.fromBuffer(hash)
			// let keyPair = new bitcoin.ECPair(d)
			// address = keyPair.getAddress()
		}
		return address;
	},
	codeImg(codeUrl,fs,path){
		return new Promise((resolve,reject)=>{
			var base64Data = codeUrl.replace(/^data:image\/\w+;base64,/, "");
			var dataBuffer = new Buffer(base64Data, 'base64');
			var filename="code_"+new Date().getTime()+'.png';
		    fs.writeFile(path.join(__dirname,"../assets/"+filename), dataBuffer, function(err) {
		        if(err){
	          		reject(false);
		        }else{
		        	resolve(filename);
		        }
		    });
		})
	}
}
module.exports = {
	util
}