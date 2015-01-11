var path = require('path');

var express = require('express');

var middleware = require('./middleware/middleware');

var routes = require('./routes/index');
var api = require('./api');

var app = express();

// Set up view templating
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Configure middleware
app.use(middleware.favicon(app));
app.use(middleware.logger());

app.use('/', routes);
app.use('/api', api);

app.use(middleware.errorHandler(app));

module.exports = app;
