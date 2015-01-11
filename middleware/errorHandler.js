module.exports = function(app){
	return function(err, req, res, next){
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: app.get('env') == 'development' ? err : {}
		});
	};
};
