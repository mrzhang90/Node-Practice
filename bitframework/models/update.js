let update ={
	updatePassword(data,axios){
		return new Promise((resolve,reject)=>{
			axios.get('http://192.168.1.105/updatePassword.php?'+data)
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