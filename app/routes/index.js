var express = require('express');
var router = express.Router();

var user = require('../helpers/user');

/* GET home page. */
router.get('/', function(req, res) {
  user.loadUsers().then(function(users){
    res.render('index', {title: 'Express', users: users});
  });
});

module.exports = router;
