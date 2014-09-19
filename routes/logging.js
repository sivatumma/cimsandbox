
/*
 * POST log method
 *  Currently returns the results of a POST to the logging 3rd party server
 */


var http = require('http');

// example curl command to test this endpoint
// curl -H "content-type:application/json" -d "{\"message\": \"Hello, world.\"}" HOST:8008/logdata

exports.logdata = function(req, res, next) {
    // console.log('logging processing started!!');

    // get the post body    
    var postBody = req.body ? req.body : null;

    if (postBody) {
        // get passed in logging key or use default
        var clientKey = (req.params && req.params.logKey) ? req.params.logKey : "9b06fa52-17f3-4655-a874-88c8b335ceed";
        // add key if passed
        var logPath = (req.params && req.params.logPath) ? req.params.logPath : "/inputs/" + clientKey;
        // add logPath if passed in
        var logBaseURL = (req.params && req.params.logURL) ? req.params.logURL : "logs.loggly.com";

        postBody = JSON.stringify(postBody);
        // console.log('url',logBaseURL);
        // console.log('path',logPath);
        // console.log('body',postBody, Buffer.byteLength(postBody, 'utf8'));

        var options = {
            host: logBaseURL,
            path: logPath,
            port: 80,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postBody, 'utf8') // calc string length in bytes
            }
        };

        // store the current res and next (closure)
        var restifyResp = res;
        var restifyNext = next;
        var responseData = "";

        var newReq = http.request(options, function(newRes) {
            // console.log('STATUS: ' + newRes.statusCode);
            // console.log('HEADERS: ' + JSON.stringify(newRes.headers));

            newRes.setEncoding('utf8');

            newRes.on('data', function (chunk) {
                // concatinate the response data
                 // console.log('BODY: ' + chunk); 
                 responseData += chunk;
             });
            newRes.on('end', function() {
                 // console.log('processing end'); 
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
