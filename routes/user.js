var mongoose=require('mongoose');
var _=require('lodash');
var uuid=require('node-uuid');
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}
var User=mongoose.model('User');
module.exports = function (app){
    var config=app.get('config');


    app.post('/login',function (req,res,next){
       if(!req.body.username || !req.body.password) return res.send(500,{message:'Invalid request params.',status:500});
        User.getAuthenticated(req.body.username,req.body.password,function (err,doc,reason){
            if (err) return res.send(500,{message:err});
            if (!doc) {
                var reasons=User.failedLogin;
                var message='';
                switch(reason){
                    case reasons.NOT_FOUND:
                        message="Username not found."
                        break;
                    case reasons.PASSWORD_INCORRECT:
                        message="Incorrect Password."
                        break;
                    case reasons.MAX_ATTEMPTS:
                        message="Maximum login attempts."
                        break;
                }
                return res.send(500,{message:message});
            }

            var token_object={token:uuid.v4(),token_created:new Date(),token_expires:(new Date().addHours(2))};

            doc.tokens.push(token_object);
            doc.markModified('tokens');
            doc.save(function (err){
                if (err) return res.send(500,{message:err});
                var user = _.cloneDeep(doc.toObject());
                delete user.tokens;
                delete user.password;
                res.set(token_object);
                res.send(user)
            })


        })
    });

    app.get('/userlist',User.authorize,function (req,res){

        User.find({},{username:1},function (err,docs){
            if(err) return res.send(500,{message:err});

           res.send(docs)
        });
    });



}