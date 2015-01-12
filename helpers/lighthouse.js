var https = require('https'),
	querystring = require('querystring'),
    util = require('util');

var Q = require('q');

var config = require('../config/config');

var baseURL = '/projects/'+config.app;

function req(path, params) {
	var deferred = Q.defer();

	var url = generateURL(path, params);
	var options = buildOptions(url);

	console.log(util.inspect(options));

	var request = https.request(options, function(response){
		console.log('statusCode:', response.statusCode);
		console.log('headers:', response.headers);

		var data = '';

		response.on('data', function(d) {
			data += d;
			console.log('Got some data');
		});
		response.on('end', function() {
			console.log('Finished getting data');
			console.log(util.inspect(data));

			deferred.resolve(data);
		});
	});

	request.on('error', function(e){
		console.error('Lighthouse API error:', e);
		deferred.reject();
	});

	request.write('');
	request.end();

	return deferred.promise;
}

function generateURL(path, params){
	var url = baseURL+'/'+path+'.json';
	if (params) {
		// Wrap string parameters in quotes
		for (var key in params) {
			params[key] = '"' + params[key] + '"';
		}
		// Generate parameters of the form:
		// ?q=responsible:"peter" updated:"since 1 month ago"
		url += '?q=' + querystring.stringify(params,'%20',':');
	}

	return url;
}

function buildOptions(url) {
	return {
		hostname: 'bleacherreport.lighthouseapp.com',
		path: url,
		method: 'GET',
		auth: config.username+':'+config.password,
		headers: {
			'content-type': 'application/json'
		}
	};
}

module.exports = {
	request: req
};
