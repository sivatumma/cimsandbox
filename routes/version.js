
/*
 * GET version for app file
 */

exports.version = function(req, res, next){

	var response = { version: 0.1 };
    res.send(response);
    return next();

};
