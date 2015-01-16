var path = require('path');

var sass = require('node-sass-middleware');

module.exports = function(){
	return sass({
		src: path.join(__dirname, '..', '..', 'assets', 'scss'),
		dest: path.join(__dirname, '..', '..', 'public', 'stylesheets'),
		outputStyle: 'compressed',
		prefix: '/stylesheets'
	});
};
