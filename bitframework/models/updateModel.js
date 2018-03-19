const config=require('../configs/config');
let update ={
	updatePassword(data,axios){
		return new Promise((resolve,reject)=>{
			axios.get(config.config+'/updatePassword.php?'+data)
			  .then(function (response) {
			  	resolve(response.data)
			  })
			  .catch(function (error) {
			    reject(error)
			  });
		})
	},
	outMoney(data,axios){
		return new Promise((resolve,reject)=>{
			axios.post(config.config+'/outMoney.php?'+data)
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
	update
}