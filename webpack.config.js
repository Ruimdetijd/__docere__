const path = require('path')

module.exports = {
	devServer: {
		contentBase: path.resolve(__dirname),
		disableHostCheck: true,
		historyApiFallback: true,
		port: 4000,
		proxy: {
			'/api': {
				target: 'http://localhost:3377',
				pathRewrite: {'^/api': ''}
			},
			'/search': {
				target: 'http://localhost:9200',
				pathRewrite: {'^/search': ''}
			}
		}
	},
	entry: ['./src/index.tsx', './src/export.ts'],
	output: {
			filename: 'bundle.js',
			chunkFilename: '[name].bundle.js',
			path: __dirname + '/build',
			publicPath: '/build/',
	},
	mode: 'development',
	module: {
		rules: [
				// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
				{
					test: /\.tsx?$/,
					loader: "ts-loader",
				}
		]
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	}
};
