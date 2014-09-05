var mongoose = require('mongoose');
var _=require('lodash');
var restifyMongoose = require('restify-mongoose');
var Offer = mongoose.model('offer');
var offers = restifyMongoose(Offer);
var User=mongoose.model('User');
module.exports = function (app){
    app.get('/offers', offers.query());
    app.get('/offers/:id', offers.detail());
    app.post('/offers', offers.insert());
    app.post('/offers/:id', offers.update());
    app.del('/offers/:id', offers.remove());
}


