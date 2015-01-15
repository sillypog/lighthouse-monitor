var https = require('https');

var _ = require('underscore'),
    Q = require('q');

var lighthouse = require('../../helpers/lighthouse'),
    ticket = require('../../helpers/ticket');

// Hit this through /api/user
function user(req, res) {
  var name = req.params.name;

  loadUsersTickets(name)
    .then(function(data){
      var ticketIDs = getTicketNumbers(data);
      return ticket.loadTickets(ticketIDs);
    }).then(function(message){
      res.json(message);
    });
}

function loadUsersTickets(userName){
  var promise = lighthouse.request('tickets', {
    responsible: userName,
    updated: 'since 1 month ago'
  });

  return promise;
}

function getTicketNumbers(data){
  console.log('getTicketNumbers from', data);
  var tickets = JSON.parse(data).tickets;
  var numbers = [];
  for (var i=0; i < tickets.length; i++){
    numbers.push(tickets[i].ticket.number);
  }

  console.log(numbers);
  return numbers;
}

module.exports = user;
