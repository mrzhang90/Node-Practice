let outMoney=function(data,axios){
	return new Promise((resolve,reject)=>{
		axios.post('http://192.168.1.105/outMoney.php?'+data)
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