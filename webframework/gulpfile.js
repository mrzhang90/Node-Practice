const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
//开发环境的gulp
gulp.task('builddev', () => {
	//开发环境 主要是监听到文件变化 自动编译
	return watch('./src/nodeuii/**/*.js', {
		ignoreInitial: false //指示chokidar是否应该忽略初始添加事件
	}, () => {
		gulp.src('./src/nodeuii/**/*.js')
			.pipe(babel({
				//Babel 会在当前目录中查找一个.babelrc 文件。 如果不存在，它会遍历目录树，直到找到一个 .babelrc 文件，或一个 package.json 文件中有 "babel": {}
				//babelrc设置为false，就不会查找.babelrc 文件，因为.babelrc文件设置比较复杂，而目前node除了import，其他的都ES6都认识了，所以只需要在plugins里配置一下就可以了
				"babelrc": false, //停止查找行为
				"plugins": [
					"transform-es2015-modules-commonjs" //它主要是编译import,因为node6以后，只有import不支持，其他ES6语法都被node支持了
				]
			}))
			.pipe(gulp.dest('./build/'))
	})
});
//上线环境的gulp
gulp.task('buildprod', () => {
	//直接编译
	gulp.src('./src/nodeuii/**/*.js')
		.pipe(babel({
			//Babel 会在当前目录中查找一个.babelrc 文件。 如果不存在，它会遍历目录树，直到找到一个 .babelrc 文件，或一个 package.json 文件中有 "babel": {}
			//babelrc设置为false，就不会查找.babelrc 文件，因为.babelrc文件设置比较复杂，而目前node除了import，其他的都ES6都认识了，所以只需要在plugins里配置一下就可以了
			"babelrc": false, //停止查找行为
			"plugins": [
				"transform-es2015-modules-commonjs" //它主要是编译import,因为node6以后，只有import不支持，其他ES6语法都被node支持了
			]
		}))
		.pipe(gulp.dest('./build/'))
});
gulp.task('default', [process.env.NODE_ENV == "production" ? 'buildprod' : 'builddev']);