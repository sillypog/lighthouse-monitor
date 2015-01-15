var express = require('express');
var router = express.Router();

var user = require('./routes/api/user');
var ticket = require('./routes/api/ticket');

/* GET home page. */
router.get('/user/:name', user);
router.get('/ticket/:id', ticket);

module.exports = router;
