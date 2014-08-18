var config=require('./config.js')(process.env.env);
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
if(config.env=='development')
var tungus=require('tungus');
var mongoose=require('mongoose');
var app = express();
var user_model=require('./models/user.js')(mongoose);
var mobile_user_model=require('./models/muser.js')(mongoose);

app.configure(function() {
    app.set('port', process.env.PORT || 80);
    app.set('config', config);
    app.set('env', config.env);
    app.use(express.favicon('public/favicon.ico'));
    app.set('views', path.join(__dirname, 'views'));
    app.engine('.html', require('ejs').__express);
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
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
var user = require('./routes/user.js')(app);
var muser = require('./routes/muser.js')(app);
var fixtures = require('./routes/fixtures.js')(app);

mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
});
