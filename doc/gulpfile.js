'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    gulpSequence = require('gulp-sequence'),
    jsdoc = require('gulp-jsdoc');


gulp.task('clean', function () {
	return gulp.src(['api/*'])
		.pipe(clean({force: true}));
});

gulp.task('api', function () {
	return gulp.src([
		'../src/**/*.js',
	]).pipe(jsdoc('api', {
		path: 'node_modules/jaguarjs-jsdoc',
		anyTemplateSpecificParameter: 'whatever'
	}))
});

gulp.task('default', gulpSequence('clean', ['api']));

