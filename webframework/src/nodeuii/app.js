console.log('环境变量',process.env.NODE_ENV)
// import Koa from 'koa';
// import config from './config/config';
// const app=new Koa();
// //监听端口
// app.listen(config.port,()=>{
// 	console.log('ydVueSystem listening on port %s',config.port);
// })

//api测试的时候，supertest 文件，就把app暴露出去 
// if(config.ENV == "test"){
	// export default app;
// }