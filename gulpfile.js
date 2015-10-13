'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var debug = require('gulp-debug');

gulp.task('default', function() {
	// test
});

gulp.task('sass', function() {
	gulp.src('assets/style/**/*.scss')
		.pipe(debug())
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./public/style/'));
});

gulp.task('sass:watch', function() {
	gulp.watch('assets/style/**/*.scss', ['sass']);
});

gulp.task('typescript', function() {
	gulp.src('assets/typescript/**/*.ts')
		.pipe(ts())
		.pipe(gulp.dest('public/js'));
});

gulp.task('typescript:watch', function() {
	gulp.watch('assets/typescript/**/*.ts', ['typescript']);
});

gulp.task('default:watch', ['typescript:watch', 'sass:watch']);