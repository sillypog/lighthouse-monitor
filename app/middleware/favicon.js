var path = require('path');

var favicon = require('serve-favicon');

module.exports = function(app){
	var iconPath = path.join(__dirname,'../../public/images/favicon.ico'),
	    options = app.get('env') == 'development' ? {maxAge: 0} : null;
	return favicon(iconPath,options);
};
