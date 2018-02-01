import local from './local';
import _ from 'lodash';
import path from 'path';
const server={
	'port':'80'
}
let config={
	'viewDir':path.join(__dirname,'..','views'),
	'staticDir':path.join(__dirname,'..','assets'),
	'env':process.env.NODE_ENV
}
if(!config.env || config.env == 'development'){
	config=_.extend(config,local)
}else{
	config=_.extend(config,server)
}
// console.log(config)
export default config;