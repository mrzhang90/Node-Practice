//本地引入，方便做合并，判断是开发或者线上环境，然后来做合并
import local from './local';
import path from 'path';
import _ from 'lodash';
const server={
	'port':'80'
}
let config={
	//静态模板目录
	'viewDir':path.join(__dirname,'..','views'),//dirname当前目录名，..向上找两个,views目录
	//静态资源目录
	//静态资源一般的团队都不存在项目里，而存在CDN上的，一般这个assets目录要拷走传到CDN上去，最次放在七牛上,给Node压力小点
	'staticDir':path.join(__dirname,'..','assets'),
	'env':process.env.NODE_ENV//"development"开发模式 production生产模式
}
if(!config.env || config.env == "development"){//开发模式
	config = _.extend(config,local);
}else{
	config = _.extend(config,server)
}

export default config;