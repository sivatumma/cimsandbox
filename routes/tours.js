var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');
var Tour = mongoose.model('tour');
var Tours = restifyMongoose(Tour);
var User=mongoose.model('User');
module.exports = function (app){
    app.get('/tours', Tours.query());
    app.get('/tours/:id', Tours.detail());
    app.post('/tours', Tours.insert());
    app.post('/tours/:id', Tours.update());
    app.del('/tours/:id', Tours.remove());
}


