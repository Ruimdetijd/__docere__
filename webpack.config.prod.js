const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
		filename: 'bundle.js',
		path: __dirname + '/build',
		publicPath: '/build/',
  },
  module: {
    rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
			}
		]
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	},
  plugins: [
    new MonacoWebpackPlugin()
  ]
};
