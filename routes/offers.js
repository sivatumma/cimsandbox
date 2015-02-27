var mongoose = require('mongoose');
var _=require('lodash');
var restifyMongoose = require('restify-mongoose');
var Offer = mongoose.model('offer');
var offers = restifyMongoose(Offer);
var User=mongoose.model('User');
var request=require('request');
var TIMEOUT=10000;
var url="http://54.81.94.142:8080/notification/Offer/chicago/";

module.exports = function (app){

    function offer_post(model){
        request.post({uri: url, json: model,timeout:TIMEOUT},function(error, response, body){
            if(error)return console.log('posting offer to july system failed.'+error);
        });

        var url='http://hmstudio.developer.julysystems.com/s/_35889/Home?macAddress=cc%3Ac3%3Aea%3A28%3A89%3Add&message=%7B%22notificationID%22%3A%22'+model._id+'%22%2C%22message%22%3A+%22Test%22%2C%22notificationType%22%3A+%22Offer%22%2C%22title%22%3A+%22Alert%22%2C%22macAddress%22%3A+%22cc%3Ac3%3Aea%3A28%3A89%3Add%22%7D&triggerPush=true&btnSubmit=Submit';
        request.get({url:url},function (error, response, body){
            if(error)return console.log('posting push offer to july system failed.'+error);
        });
    };

    function offer_delete(model){
        request.del({uri: url+model._id, json: model,timeout:TIMEOUT},function(error, response, body){
            if(error)return console.log('deleting  offer from july system failed.'+error)
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


