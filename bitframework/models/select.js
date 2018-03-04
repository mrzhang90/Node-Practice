let select ={
	getPayPassword(openid,axios){
		return new Promise((resolve,reject)=>{
			axios.get('http://192.168.1.105/getPayPassword.php?openid='+openid)
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
	select
}