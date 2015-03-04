var request = require('request');
var TIMEOUT = 10000;
module.exports = function(app) {
    app.all('/api/proxy', function(req, res) {
        if (!req.query.url) return res.send(500, {
            message: 'URL parameter required.'
        })
        var url = req.query.url;
        console.log(url);
        var headers = {};
        if (req.method == 'GET') {
            try {
                proxy = request.get({
                    uri: url,
                    qs: req.query,
                    headers: headers,
                    timeout: TIMEOUT
                }, function(error, response, body) {
                    if (error) return res.send(500, error);
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                proxy = request[req.method.toLowerCase()]({
                    uri: url,
                    json: req.body,
                    headers: headers,
                    timeout: TIMEOUT
                }, function(error, response, body) {
                    if (error) return res.send(500, error);
                });
            } catch (e) {
                console.log(e);
            }
        }
        req.pipe(proxy).pipe(res);
    });
}