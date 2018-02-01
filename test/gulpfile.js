const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');

gulp.task('builddev', function() {
	return watch('./src/nodeuii/**/*.js', {
		ignoreInitial: false
	}, () => {
		gulp.src('./src/nodeuii/**/*.js')
			.pipe(babel({
				"babelrc": false,
				"plugins": ["transform-es2015-modules-commonjs"]
			}))
			.pipe(gulp.dest('./build/'));
	})
})
gulp.task('buildprod', function() {
	gulp.src('./src/nodeuii/**/*.js')
		.pipe(babel({
			"babelrc": false,
			"plugins": ["transform-es2015-modules-commonjs"]
		}))
		.pipe(gulp.dest('./build/'));
})
gulp.task('default',[process.env.NODE_ENV=="production"?'buildprod':'builddev']);