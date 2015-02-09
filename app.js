var config=require('./config.js')(process.env.env);
var express = require('express');
var routes = require('./routes');
var https = require('https');
var http = require('http');
var path = require('path');
var mongoose=require('mongoose');
var app = express();
var fs=require('fs');
http.globalAgent.maxSockets = 1000;
require('./models/user.js')(mongoose);
require('./models/muser.js')(mongoose);
require('./models/offer.js')(mongoose);
require('./models/tour.js')(mongoose);
require('./models/feedback.js')(mongoose);
app.configure(function() {
    app.set('port', process.env.PORT || 80);
    app.set('config', config);
    app.set('env', config.env);
    app.use(function (req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept');
        next();
    });
    //app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.json({limit:'500mb'}));
    app.use(express.urlencoded());
    app.use(express.methodOverride());
   // app.use(express.cookieParser('secret'));
   // app.use(express.cookieSession({ secret: 'tobo!', maxAge: 360*5 }));
   // app.use(express.session({ secret: 'keyboard cat' }));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/sandbox/mobile',express.static(config.mobile_app_root));
    app.use('/chicago/mobile-dev',express.static(config.mobile_app_debug_root));
    app.use('/sandbox/portal',express.static(config.portal_app_root));
    app.use('/chicago/portal',express.static(config.portal_app_root));
    app.use('/new/sandbox', express.static(config.sandbox_app_root));
    app.use('/', express.static(config.sandbox_app_root));
});


// development only
//app.use(express.errorHandler());

app.get('/', express.static(config.sandbox_app_root));
var user = require('./routes/user.js')(app);
var muser = require('./routes/muser.js')(app);
var fixtures = require('./routes/fixtures.js')(app);
var mqi = require('./routes/mqi.js')(app);
var offers = require('./routes/offers.js')(app);
var upload = require('./routes/upload.js')(app);
require('./routes/tours.js')(app);
require('./routes/feedbacks.js')(app);
require('./routes/proxy.js')(app);
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
//    var server_credentials={
 //       key: fs.readFileSync(path.join(config.certificates_dir,'server.key')),
  //      ca: fs.readFileSync(path.join(config.certificates_dir,'server.csr')),
   //     cert: fs.readFileSync(path.join(config.certificates_dir,'server.crt'))
    //};

    //https.createServer(server_credentials,app).listen(app.get('port'), function(){
    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
});


process.on('uncaughtException',function (err){
    console.log(err)
    console.log(err.stack);
    process.exit(1);
});
