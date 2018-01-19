# 笔记-gulp+webpack+koa编译node和前端文件

目录
	src:所有的文件夹都放到这里
		web:前端的文件
			views
			widget:小的组件
		webapp
			vue用到的
		nodeuii(也可以叫server)
			config
				local.js
					本地文件-开发阶段
				config.js
					线上阶段
			controllers
				路由
			modules
				跟后台数据请求
			middleware
				中间件
					错误处理
			views
				静态模板
			assets
				静态资源
			app.js
				入口文件
		build
			gulp生成node
			webpack生成webpack
装包工具
	npm
	yarn
	cnpm
supervisor
	热启
import报错
	方案1.
		Node更新到最新版本
	方案2.
		gulp
			引入gulp的两种方案
				1.dev下引用
					../node_modules/.bin/gulp
				2.全局gulp
cross-env
	让命令在各个平台工作，可以使用cross-env
gulp-prepack
	prepack和rollup相似
	去掉没用的代码
lodash
	非常有用的库，前端提纯的时候要用到的库
	前后端都有用
log4js
	打印错误之类的日志
	建议错误文件记录少点，减少Node服务器压力，Nginx更适合做这件事
		把http正常请求的日志给nginx记录，node来记录error就可以了
extract-text-webpack-plugin
	把CSS提取出来
postcss
	postcss-css-variables
		处理基础的变量
gulp编译node
webpack编译前端

ExtractTextPlugin
	把css提出来，但是有的时候不需要提，那就是css modules
css modules
	webpack把css打到js里，起了个名词，叫做css modules。就是说，他把css像js一样包到一个命名区里去了，
然后往页面插入时，再把它拿出来，所以也叫做"css in js"。(哈哈，可能就是不知道怎么把css整出去，所以起了这么一高大尚的名词)

SSR构建项目流程:
	1.配置前端静态资源文件
	2.webpack css js 插到对应页面的部分去
	3.views 打包到 views文件夹去的真实界面 widget用来组装views的page
	4.views里的index.html 负责作为webpack的打包入口~~~
	5.所有的前端需要编译的资源全部由viewS作为主入口 承载
	6.js负责吐swig 母的是天空 styles scipts  主内容
	7.由webpack-html-plugin吐 -> index.js
	8.page index.js -> index.html  -> views
	index-index.enrty.js -> index.html -> widget -> js -> css -> img  -> assets
