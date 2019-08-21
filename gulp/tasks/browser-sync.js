let gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	config = require('../config');

//-----------------------------------------------------o 
// live reload

gulp.task('browser-sync', function(callback) 
{
	let options = 
	{
		server: {
			baseDir: config.bin + "demo",
			index: "index.html"
		},
		files: [
			config.bin + "demo/css/style.css", 
			config.bin + "demo/js/script.js",
			config.bin + "demo/index.html"],
		open: true,
		notify: false,
		https: false,
		ui: false,
		ghostMode: false
	};

	browserSync.init(options);

	config.browserSync = browserSync;

	callback();
});

gulp.task('reload', function(callback) 
{
	browserSync.reload();
	callback();
});