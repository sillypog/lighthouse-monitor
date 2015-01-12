var helper = require('../../helpers/ticket');

function ticket(req, res){
	var ticketID = req.params.id;

	helper.loadTicket(ticketID).then(function(data){
		res.json(data);
	});
}

module.exports = ticket;
