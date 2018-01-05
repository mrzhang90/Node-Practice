const conf = require('./webpack.conf');
const path = require('path');
const options = {
	output: {
		path: path.join(__dirname, '../build/');
		publicPath: '/',
		fileame: 'assets/scripts/[name].bundle.js'
	}
}
const _options = Object.assign(conf.dev, options);
module.exports = _options;