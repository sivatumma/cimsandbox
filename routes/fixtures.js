var mongoose=require('mongoose');
var fakery = require('mongoose-fakery');
module.exports = function (app){
    var config=app.get('config');
    var User=mongoose.model('User');
    app.get('/fixtures/users',function (req,res,next){

        fakery.fake('user', mongoose.model('User'), {
            username: fakery.g.alphanum(5,10),
            password: 'testing',
            roles:['subscriber'],
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

}