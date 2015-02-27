var request = require('request');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var parseString = require('xml2js').parseString;
var TIMEOUT = 30000;
request.defaults({
    pool: {
        maxSockets: Infinity
    },
    gzip: true
});
var proxy_route = function(url) {
    return function(req, res) {
        console.log("req.body before sending to provider API");
        console.log("=======================================");
        console.log(req.body);
        var proxy = null;
        console.log(req.method + " Request :->" + req.originalUrl);
        if (req.method == 'GET') {
            proxy = request.get({
                uri: url,
                qs: req.query,
                timeout: TIMEOUT
            }, function(error, response, body) {
                if (error) return res.send(500, error);
                console.log('Response recieved:' + req.originalUrl);
            });
        } else {
            proxy = request[req.method.toLowerCase()]({
                uri: url,
                json: req.body,
                timeout: TIMEOUT
            }, function(error, response, body) {
                if (error) return res.send(500, error);
                console.log('Response recieved from :' + req.originalUrl);
                console.log("==================");
                console.log(body);
            });
            // console.log(proxy);
        }
        req.pipe(proxy).pipe(res);
    }
}
module.exports = function(app) {
    app.all('/api/mqi', User.authorize, proxy_route('http://54.169.200.173:8080/fid-CIMQueryInterface'));
    app.all('/api/mqi/crud', User.authorize, proxy_route('http://54.169.200.173:8080/fid-CIMCrudInterface'));
    app.all('/api/ebc', User.authorize, proxy_route('http://54.169.115.123:8080/fid-CIMQueryInterface'));
}