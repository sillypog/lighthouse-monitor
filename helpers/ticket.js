var https = require('https');

var _ = require('underscore'),
    Q = require('q');

var config = require('../config/config'),
    lighthouse = require('./lighthouse');

function loadTickets(ticketIDs){
  console.log('loadTickets');
  var deferred = Q.defer();

  // Call loadTicket on all of the ids in parallel
  var tasks = [];
  for (var i=0; i < ticketIDs.length; i++){
    tasks.push(loadTicket(ticketIDs[i]));
  }

  // Combine all of the results into an array
  Q.all(tasks).then(function(data){
    console.log('Parallel ticket loading complete', data);
    deferred.resolve(data);
  });

  return deferred.promise;
}

function loadTicket(ticketID){
  var deferred = Q.defer();

  lighthouse.request('tickets/'+ticketID).then(function(data){
    data = processTicket(data);
    deferred.resolve(data);
  });

  return deferred.promise;
}

function processTicket(json){
  var data = JSON.parse(json);
  var ticket = data.ticket;
  var versions = ticket.versions;
  var stateChanges = [ticket.versions[0]];

  var output = [];

  var currentState = ticket.versions[0].state;

  // Only want to loop over the versions that have a CHANGE of state from the previous
  for (var i = 1; i < versions.length; i++){
    var version = versions[i];
    if (version.state !== versions[i-1].state){
      var creation = new Date(version.created_at);
      var delay = getTimeDifference(creation, stateChanges);

      stateChanges.push(version);

      output.push({state:currentState, time:delay});
      currentState = version.state;
    }
  }

  // If the ticket is not in a closed state, could calculate how long it's been in it's current state
  if (ticket.closed === false){
    var now = new Date();
    var timeInCurrentState = getTimeDifference(now, stateChanges);
    output.push({
      state: ticket.state,
      time: timeInCurrentState
    });
  }

  return {
    id: ticket.number,
    stateChanges: output,
    current: currentState,
    closed: ticket.closed,
    total: _.reduce(output, function(memo, state){
      return memo + state.time;
    }, 0)
  };
}

function getTimeDifference(current, stateChanges){
  var previous = new Date(stateChanges[stateChanges.length-1].created_at);

  var difference = current - previous;
  var differenceSecs = difference/1000;
  var differenceMins = differenceSecs/60;

  return Math.round(differenceMins);
}

module.exports = {
  loadTickets: loadTickets,
  loadTicket: loadTicket
}
