
/**
 * Module dependencies.
 */

var restify = require('restify')
    , path = require('path')
    , express = require('express')
    , favicon = require('serve-favicon')
    , _ = require('underscore')
    , filed = require('filed')
    , mime = require('mime')
    , fs = require('fs');

// not used
// var shared_secret = "asdf";

function serve(req, res, next) {
    var fname = __dirname + '/public/' + req.params[0];//path.normalize('./public' + req.path);

    res.contentType = mime.lookup(fname);
    var f = filed(fname);
    f.pipe(res);
    f.on('end', function () {
        return next(false);
    });

    return false;
}

function redirect(req, res, next) {
    console.log('redirecting %s', req.path);
    res.header('Location', '/public/index.html');
    res.send(302);
    return next(false);
}

// Setup some https server options
var https_options = {
    // key: fs.readFileSync(__dirname +'/privkey.pem'),
    // certificate: fs.readFileSync(__dirname +'/self_cert.pem')
};

// Put any routing, response, etc. logic here. This allows us to define these functions
// only once, and it will be re-used on both the HTTP and HTTPs servers
var routes = _.extend(require('./routes/index'),require('./routes/version'),require('./routes/roles'),require('./routes/auth'));

var setup_server = function(app) {
    // needed for CORS, but probably not secure enough, we should add specific hosts if this goes into production
    app.use(restify.CORS());
    app.use(restify.fullResponse());    

    app.use(restify.acceptParser(app.acceptable));
    app.use(restify.dateParser());
    app.use(restify.queryParser());
    app.use(restify.bodyParser());
    app.use(favicon(__dirname + '/public/assets/favicon.ico'));

    // current version
    app.get('/version', routes.version);

    // roles
    app.get('/roles', routes.roles);

    // authenticate - gets token for admin user, not individual users
    app.post('/auth', routes.auth);

    // plain web server for everything else
    // this should also be locked down to specific directories/files in a production scenario
    app.post(/^(.+)$/, serve);
    app.get(/^(.+)$/, serve);

    // examples of redirecting to where ever we want users to be restricted to
    // app.get('/', redirect);
    // app.get('/public', redirect);
    // app.get(/\/public\/\S+/, serve);

    app.on('NotFound', function(req, res) {
      console.log('Encountered 404:'+req.path);
      res.send(404,'Page was not found');
    });
};

// Instantiate server
var server = restify.createServer({
    'text/html': function formatHTML(req, res, body) {
        if (typeof (body) === 'string')
            return body;

        var html;
        if (body instanceof Error) {
            html = sprintf(HTML_FMT, body.stack);
        } else if (Buffer.isBuffer(body)) {
            html = sprintf(HTML_FMT, body.toString('base64'));
        } else {
            html = sprintf(HTML_FMT, body.toString());
        }

        return html;
    },
    'text/css': function formatCSS(req, res, body) {
        if (typeof (body) === 'string')
            return body;

        return '';
    },

    'image/png': function formatPNG(req, res, body) {
        return body;
    }
});

// Setup server
setup_server(server);

// Start our servers to listen on the appropriate ports
server.listen(process.env.PORT || 80, function() {
    console.log('%s listening at %s', server.name, server.url);
});