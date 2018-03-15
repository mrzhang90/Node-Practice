let outMoney=function(data,axios){
	return new Promise((resolve,reject)=>{
		axios.post('http://43.255.106.169:8081/outMoney.php?'+data)
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