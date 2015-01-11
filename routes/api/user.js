// Hit this through /api/user
var user =  function(req, res) {
  res.send('Responding from /user');
};

module.exports = user;
