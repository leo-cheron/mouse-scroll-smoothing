let gulp = require('gulp'),
	gutil = require('gulp-util'),
	config = require('../config'),
	webpack = require('webpack'),
	TerserPlugin = require('terser-webpack-plugin');

//-----------------------------------------------------o task

gulp.task('webpack', function(callback)
{
	var webpackConfig = config.webpack;

	if(config.env !== 'prod')
	{
		webpackConfig.devtool = 'cheap-module-eval-source-map';

		var built = false;
		webpack(webpackConfig).watch(200, function(err, stats)
		{
			logger(err, stats);
			
			// On the initial compile, let gulp know the task is done
			if(!built)
			{
				built = true;
				callback();
			}
		});
	}
	else
	{
		webpackConfig.optimization = {
			minimizer: [
				new TerserPlugin({
					cache: true, parallel: true, terserOptions: { output: {comments: false} }
				})
			]
		};

		webpack(webpackConfig, function(err, stats)
		{
			logger(err, stats);
			if(err) failed = true;
			callback();
		});
	}
});

//-----------------------------------------------------o logs management

var logger = function(err, stats)
{
	if(err) throw new gutil.PluginError('webpack', err);

	if(stats.compilation.errors.length > 0)
	{
		console.log(gutil.colors.red('Webpack errors:'));
		stats.compilation.errors.forEach(function(error)
		{
			if(error.origin)
				gutil.log(gutil.colors.underline.red(error.origin.resource) + ":\n" + gutil.colors.red(error.toString()));
			else
				gutil.log(gutil.colors.red(error.toString()));
		});

		if(!config.env == 'prod') process.exit(1);
	}
	else
	{
		gutil.log(gutil.colors.green('JS built in ' + (stats.endTime - stats.startTime) + 'ms'));
	}
};