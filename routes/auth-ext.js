
/*
 * GET auth for the app.
 *  Currently returns the results of a POST to the auth server
 */

 var crypto = require('crypto'),
 http = require('http');
 fs = require('fs');

 exports.auth-ext = function(req, res, next) {

    var k = '' + (req.params && req.params.k) ? req.params.k : '';
    // console.log('path:%s\nheaders:%s\nparams:%s\nk is %s', req.getPath(), JSON.stringify(req.headers), JSON.stringify(req.params), k );
    console.log('request processing started!!');
    
    var authURL = req.params ? req.params.server : null;
    var tenantName = req.params ? req.params.tenantName : null;

    if (authURL) {
        var authBody = "undefined";

        var uname = "" + new Buffer("YWxRtxaW4x=", 'base64');
        var pwd = "" + new Buffer("a2V5cx3RvxbmVfxYWRtaW4=", 'base64');

        var authBody = "undefined";
        // add the tenantName to the request if present
        if (tenantName) {
            authBody = {auth:{passwordCredentials: {username: uname, password: pwd}, tenantName: tenantName}};
        } else {
            authBody = {auth:{passwordCredentials: {username: uname, password: pwd}}};
        }

        var postBody = JSON.stringify(authBody);

        var options = {
            host: authURL,
            port: 5000,
            path: '/v2.0/tokens',
            method: 'POST',
            agent: false,
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Length': postBody.length
            }
        };

        var restifyResp = res;
        var restifyNext = next;
        var responseData = "";

        var newReq = http.request(options, function(newRes) {
/*
            console.log('STATUS: ' + newRes.statusCode);
            console.log('HEADERS: ' + JSON.stringify(newRes.headers));
*/

            newRes.setEncoding('utf8');

            newRes.on('data', function (chunk) {
                // concatinate the response data
/*                 console.log('BODY: ' + chunk); */
                responseData += chunk;
            });
            newRes.on('end', function() {
/*                 console.log('processing end'); */
                // send the response data back to the original requestor
                restifyResp.headers(newRes.headers);
                restifyResp.send(newRes.statusCode, JSON.parse(responseData));
                return restifyNext();
            });
        });

        newReq.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });

        newReq.write(postBody);
        newReq.end();
    } else {
        res.send(401, "unauthorized\n");
        return next();
    }
}
