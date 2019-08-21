const path = require('path');
const fs = require('fs');
const gulp = require('gulp');

// import all tasks
fs.readdirSync('./tasks/').forEach(function(task) 
{
	if (path.extname(task) === '.js')
		require('./tasks/' + task);
});

//-----------------------------------------------------o
// generic tasks

gulp.task('build', gulp.series('webpack'));

gulp.task('default', gulp.series('browser-sync', 'webpack'));