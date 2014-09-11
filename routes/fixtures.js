var mongoose=require('mongoose');
var fakery = require('mongoose-fakery');
module.exports = function (app){
    var config=app.get('config');
    var User=mongoose.model('User');
    app.get('/fixtures/users',function (req,res,next){
        fakery.fake('user', mongoose.model('User'), {
            username: fakery.g.alphanum(5,10),
            password: 'testing',
            roles:fakery.g.pick('subscriber,cityoperator,administrator,lightoperator'.split(',')),
            profile:{
                sex:fakery.g.pick('male,female'.split(',')),
                age:fakery.g.rndint(10,80),
                origin:fakery.g.str(5),
                married:fakery.g.rndbool(),
                children_under_18:fakery.g.rndint(1,10),
                employer:fakery.g.alphanum(5,10),
                occupation:fakery.g.alphanum(5,10),
                interests:[{text:fakery.g.name(),type:fakery.g.name()}]
            }
        });


        fakery.makeAndSave('user', function(err, user) {
           console.log(err);
            res.send(user.toJSON());
        });


    });

    app.get('/fixtures/offers/:type',function (req,res,next){
        fakery.fake('offer', mongoose.model('offer'),{
            "thumb": "/offer-images/placeholder.png",
            "coupon":"/offer-images/placeholder.png",
            "title": fakery.g.alphanum(10,20),
            "location": fakery.g.alphanum(10,20),
            "latlng": {
                "lat": "41.8337329",
                "lng": "-87.7321555"
            },
            "description": fakery.g.alphanum(10,50),
            "category": fakery.g.pick([
                "Arts, Culture, & Entertainment"
                ,"Dining"
                ,"Groups"
                ,"Hotels"
                ,"Music & Nightlife"
                ,"Shopping"
                ,"Sports & Recreation"
                ,"Tours & Attractions"
                ,"Transportation"]),
            "date": fakery.g.pick([new Date()]),
            "crowd_level": fakery.g.pick(['LOW','MEDIUM','HIGH']),
            "parking_available": fakery.g.pick(['LOW','MEDIUM','HIGH']),
            "featured": fakery.g.rndbool(),
            "model": req.params.type
        });


        fakery.makeAndSave('offer', function(err, offer) {
            console.log(err);
            res.send(offer.toJSON());
        });


    });

}