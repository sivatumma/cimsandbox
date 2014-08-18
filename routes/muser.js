var mongoose=require('mongoose');
var _=require('lodash');
var uuid=require('node-uuid');
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}
var User=mongoose.model('mUser');
module.exports = function (app){
    var config=app.get('config');
    app.post('/mobile-app/login',function (req,res){
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
                var new_user = _.cloneDeep(doc.toObject());
                delete new_user.tokens;
                delete new_user.password;
                delete new_user.roles;
                delete new_user.__v;
                delete new_user._id;
                delete new_user.loginAttempts;
                delete new_user.active;
                res.set(token_object);
                res.send(user)
            })


        })
    });

    app.post('/mobile-app/register',function (req,res){
        if(!req.body.username || !req.body.password || !req.body.provider || !req.body.age || !req.body.sex) return res.send(500,{message:'Invalid request params.',status:500});
        var user=new User(req.body);
        user.save(function (err,doc){
            if(err) return res.send(500,err.stack);
            var new_user=_.cloneDeep(doc.toObject());
            delete new_user.tokens;
            delete new_user.password;
            delete new_user.roles;
            delete new_user.__v;
            delete new_user._id;
            delete new_user.loginAttempts;
            delete new_user.active;
            res.send(new_user)
        })

});



}