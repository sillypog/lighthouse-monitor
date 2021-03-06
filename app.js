var path = require('path');

var express = require('express');

var middleware = require('./app/middleware/middleware');

var routes = require('./app/routes/index');
var api = require('./app/routes/api/api');

var app = express();

// Set up view templating
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'jade');

// Configure middleware
app.use(middleware.favicon(app));
app.use(middleware.logger());
app.use(middleware.sass());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);

app.use(middleware.errorHandler(app));

module.exports = app;
