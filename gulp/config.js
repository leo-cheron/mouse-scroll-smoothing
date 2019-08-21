var webpack = require("webpack"),
	argv = require("yargs").argv,
	pcwd = process.cwd(),
	path = argv.path || "..",
	root = pcwd + '/' + path + '/',
	src = root + 'src/',
	dest = root;

module.exports = {

	cwd: path,
	root: root,
	src: src,
	bin: dest,

	env: argv.production ? 'prod' : 'dev',

	webpack: {
		mode: argv.production ? 'production' : 'development',
		entry: {
			// "index": src + 'lib/SmoothScroll.js',
			"demo/js/script": src + 'demo/Main.js',
		},
		output: {
			path: dest,
			filename: "[name].js"
		},
		module: {
			rules: [{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true, 
						plugins: [
							["@babel/plugin-proposal-decorators", { "legacy": true }],
							["@babel/plugin-proposal-class-properties"],
						]
					}
				}
			}]
		},
		resolve: {
			unsafeCache: true,
			modules: [
				src,
				root + 'node_modules/'
			],
			extensions: ['.js'],
		},
		plugins: [
			new webpack.ProvidePlugin({
				autobind: ['autobind-decorator', 'default']
			})
		],
		watchOptions: {
			aggregateTimeout: 300,
			ignored: /node_modules/
		}
	}
};