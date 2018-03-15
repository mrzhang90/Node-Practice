let select ={
	getPayPassword(openid,axios){
		return new Promise((resolve,reject)=>{
			axios.get('http://43.255.106.169:8081/getPayPassword.php?openid='+openid)
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