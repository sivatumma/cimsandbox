
/*
 * GET auth for the app.
 */

var crypto = require('crypto'),
http = require('http');
fs = require('fs');

exports.auth = function(req, res, next) {
	
	var token = crypto.randomBytes(64).toString('hex');
	var username = req.params.username;

	console.log("Generating authentication token: " + token + " for user: " + username);

	var role = (/admin/.test(username)) ? "admin" : "user";
	var date = new Date();

	var response = { access: { issued: date, token: token, role: role }};

	res.send(response);
	return next();

}
