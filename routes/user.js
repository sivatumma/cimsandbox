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
                return res.send(403,{message:message});
            }

            var token_object={token:uuid.v4(),token_created:new Date(),token_expires:(new Date().addHours(2))};

            doc.tokens.push(token_object);
            doc.markModified('tokens');
            doc.save(function (err){
                if (err) return res.send(500,{message:err});
                var user = _.cloneDeep(doc.toObject());
                delete user.tokens;
                delete user.password;
                delete user._id;
                delete user.__v;
                delete user.loginAttempts;
                delete user.active;
                res.set(token_object);
                console.log(user);
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

    app.get('/logout',User.authorize,function (req,res){
        req.user.tokens.pull({token:req.headers['token']});
        req.user.markModified('tokens');
        req.user.save(function (err){
            if(err)return res.send(500,{message:err.stack});
            res.send({message:'Ok',status:200});
        })
    });

    app.post('/session/save',User.authorize,function (req,res){

        if(!req.body.user_id || !req.body.session_data) return res.send(500,{message:'Invalid request params.',status:500});

        mongoose.model('User').update({_id:req.body.user_id},{$set:{session_data:req.body.session_data}},function (err){
            if(err)return res.send(500,{message:err});
            res.send({message:'Ok',status:200});
        })

    });



    app.post('/register',function (req,res){
        if(!req.body.username || !req.body.password || !req.body.provider || !req.body.age || !req.body.sex) return res.send(500,{message:'Invalid request params.',status:500});
        var user=new User(req.body);
        user.save(function (err,doc){
            if(err) return res.send(403,'Username or email not available.');
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