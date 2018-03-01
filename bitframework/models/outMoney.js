const bitcoin = require('bitcoinjs-lib');
const bigi = require('bigi');
const axios = require('axios')
let outMoney=function(data){
	return new Promise((resolve,reject)=>{
		axios.post('http://192.168.1.104/outMoney.php?address='+data.address+'&number='+data.input_number)
			.then(function (response) {
				resolve(response.data)
			})
			.catch(function (error) {
				reject(error)
			});
	})
}
module.exports = {
	outMoney
}