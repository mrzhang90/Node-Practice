const util = require('../controller/util')
let getInfo=function(axios){
	return new Promise((resolve,reject)=>{
		axios.get('http://192.168.1.105/getWxInfo.php')
		  .then(function (response) {
		  	let userinfo=response.data;
		    let address=util.getBit.getAddress(userinfo.openid)
		    console.log(1,address)
		    let payAddress=util.getBit.getPayAddress(userinfo.openid,'test')
		    console.log(2,payAddress)
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