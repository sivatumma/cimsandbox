var mongoose = require('mongoose');
var _=require('lodash');
var restifyMongoose = require('restify-mongoose');
var Offer = mongoose.model('offer');
var offers = restifyMongoose(Offer);
var User=mongoose.model('User');
var request=require('request');
var TIMEOUT=60000;
var url="http://54.81.94.142:8080/notification/Offer/chicago/";

module.exports = function (app){

    function offer_post(model){
        request.post({uri: url, json: model,timeout:TIMEOUT},function(error, response, body){
            if(error)return console.log('posting offer to july system failed.'+error);
            console.log('offer posted to july system.');
            console.log(body);
        });
    };

    function offer_delete(model){
        request.del({uri: url+model._id, json: model,timeout:TIMEOUT},function(error, response, body){
            if(error)return console.log('deleting  offer from july system failed.'+error)
            console.log('offer delete from july system.');
            console.log(response);
        });
    };

    app.get('/offers',offers.query());
    app.get('/offers/:id', offers.detail());
    app.post('/offers', offers.insert());
    app.post('/offers/:id', offers.update());
    app.del('/offers/:id', offers.remove());
    offers.on('update',offer_post);
    offers.on('insert',offer_post );
    offers.on('remove',offer_delete);
}


