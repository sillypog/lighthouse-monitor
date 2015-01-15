var express = require('express');
var router = express.Router();

var user = require('./user');
var ticket = require('./ticket');

/* GET home page. */
router.get('/users', user.index);
router.get('/user/:name', user.name);
router.get('/ticket/:id', ticket);

module.exports = router;
