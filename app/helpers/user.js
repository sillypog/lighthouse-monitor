var _ = require('underscore'),
  Q = require('q');

var lighthouse = require('./lighthouse');

function loadUsers(){
  var deferred = Q.defer();

  lighthouse.request('memberships')
  .then(function(data){
    var jsonData = JSON.parse(data);
    var names = _.chain(jsonData.memberships)
      .pluck('membership')
      .pluck('user')
      .pluck('name')
      .value();
    deferred.resolve(names);
  });

  return deferred.promise;
}

module.exports = {
  loadUsers: loadUsers
};
