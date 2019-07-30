const webpackConfig = require('./webpack.config')

module.exports = () => {
	webpackConfig.mode = "production"
	webpackConfig.output.path = __dirname + '/dist'
	webpackConfig.output.publicPath = '/dist/'
	return webpackConfig
}
