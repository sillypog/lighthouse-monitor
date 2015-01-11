var express = require('express');
var router = express.Router();

var user = require('./routes/api/user');

/* GET home page. */
router.get('/user', user);

module.exports = router;
