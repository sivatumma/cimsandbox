
/*
 * GET version for app file
 */

exports.roles = function(req, res, next){
//    var k = '' + (req.params && req.params.k) ? req.params.k : 'empty';
//    console.log('path:%s\nheaders:%s\nparams:%s\nk is %s', req.path, JSON.stringify(req.headers), JSON.stringify(req.params), k );
//    console.log('');
	var username = req.params.username;
	var role = (/admin/.test(username)) ? "admin" : "user";
	
	console.log("Retrieving roles for user: " = username);
	console.log("Roles found: " + role);

	var response = { roles: [ role ] };

    res.send(response);
    return next();

};
