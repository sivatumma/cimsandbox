var config=require('./config.js')(process.env.env);
var express = require('express');
var routes = require('./routes');
var https = require('https');
var path = require('path');
var mongoose=require('mongoose');
var app = express();
var fs=require('fs');
var user_model=require('./models/user.js')(mongoose);
var mobile_user_model=require('./models/muser.js')(mongoose);

app.configure(function() {
    app.set('port', process.env.PORT || 443);
    app.set('config', config);
    app.set('env', config.env);
    app.use(express.favicon('public/favicon.ico'));
    if(config.env=='development')
    app.use(express.logger('dev'));
    app.use(express.json({limit:'500mb'}));
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser('secret'));
    app.use(express.cookieSession({ secret: 'tobo!', maxAge: 360*5 }));
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/mobile',express.static(config.mobile_app_root));
    app.use('/portal',express.static(config.portal_app_root));
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
var user = require('./routes/user.js')(app);
var muser = require('./routes/muser.js')(app);
var fixtures = require('./routes/fixtures.js')(app);
var mqi = require('./routes/mqi.js')(app);

mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log(path.join(config.certificates_dir,'server.key'))  ;
    var server_credentials={
        key: fs.readFileSync(path.join(config.certificates_dir,'server.key')),
        ca: fs.readFileSync(path.join(config.certificates_dir,'server.csr')),
        cert: fs.readFileSync(path.join(config.certificates_dir,'server.crt'))
    };

    https.createServer(server_credentials,app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
});
