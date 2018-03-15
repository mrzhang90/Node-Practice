const util = require('../controller/util')
let getInfo=function(axios){
	return new Promise((resolve,reject)=>{
		axios.get('http://43.255.106.169:8081/getWxInfo.php')
		  .then(function (response) {
		  	let userinfo=response.data;
		    let address=util.getBit.getAddress(userinfo.openid,'test')
		    console.log(1,address)
		    userinfo['openid']=address;
		  	resolve(userinfo)
		  })
		  .catch(function (error) {
		    reject(error)
		  });
	})
}
module.exports = {
	getInfo
}