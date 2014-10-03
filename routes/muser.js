var mongoose=require('mongoose');
var _=require('lodash');
var uuid=require('node-uuid');
var request=require('request');
var parseString = require('xml2js').parseString;
var TIMEOUT=60000;
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
                res.send(new_user) ;
            })


        })
    });

    app.post('/mobile-app/register',ise_proxy_route_1,register_mobile_user);
    app.post('/mobile-app/register-debug',ise_proxy_route,register_mobile_user);

    app.get('/mobile-app/logout',User.authorize,function (req,res){
        req.user.tokens.pull({token:req.headers['token']});
        req.user.markModified('tokens');
        req.user.save(function (err){
            if(err)return res.send(500,{message:err.stack});
            res.send({message:'Ok',status:200});
        })
    });

    function register_mobile_user(req,res){
        if(!req.body.username || !req.body.mac ||  !req.body.password || !req.body.provider || !req.body.age || !req.body.sex) return res.send(500,{message:'Invalid request params.',status:500});
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

    };

    function ise_proxy_route(req,res,next){
        var url='https://68.20.187.152:9060/ers/config/endpoint';
        var  headers = {
            'User-Agent': 'request',
            'Authorization':'Basic ZXJzOklvdHJlc3QxIQ==',
            'Content-Type':'application/vnd.com.cisco.ise.identity.endpoint.1.0+xml',
            'Accept':'application/vnd.com.cisco.ise.identity.endpoint.1.0+xml'
        }

        var  headers1 = {

            'Authorization':'Basic RXJzX3JlYXV0aDpJb3RyZXN0MiE='
            //'Content-Type':'application/vnd.com.cisco.ise.identity.endpoint.1.0+xml',
            //'Accept':'application/vnd.com.cisco.ise.identity.endpoint.1.0+xml'
        };

        var post_body='<ns3:endpoint name="" id="" description="" xmlns:ns2="ers.ise.cisco.com" xmlns:ns3="identity.ers.ise.cisco.com"><groupId>53a17dc0-434e-11e4-a585-005056ad0fa5</groupId><mac>{{mac}}</mac><staticGroupAssignment>true</staticGroupAssignment><staticProfileAssignment>false</staticProfileAssignment></ns3:endpoint>' ;

        if(!req.body.mac)return res.send(500,{message:'MAC address missing in body.'});

        request.post({uri: url, body:post_body.replace('{{mac}}',req.body.mac),headers:headers,timeout:TIMEOUT,rejectUnauthorized: false,requestCert: true,agent: false},function(error, response, body){
            if(error)return res.send(500,error);

            console.log(req.body.mac + 'registration completed.') ;
            console.log(body);

            request.get({uri: "https://68.20.187.152/ise/mnt/CoA/Reauth/server12/"+req.body.mac+"/2",headers:headers1,timeout:TIMEOUT,rejectUnauthorized: false,requestCert: true,agent: false},function(error, response, body){

                if(error)return res.send(500,error);
                console.log(req.body.mac+':authentication  completed.');
                console.log(req.body);
                console.log(body);
                console.log(response.statusCode + 'response code');

                next();
            });
        });

    }

    function ise_proxy_route_1(req,res,next){
        var url='https://68.20.187.152:9060/ers/config/endpoint';
        var  headers = {
            'User-Agent': 'request',
            'Authorization':'Basic ZXJzOklvdHJlc3QxIQ==',
            'Content-Type':'application/vnd.com.cisco.ise.identity.endpoint.1.0+xml',
            'Accept':'application/vnd.com.cisco.ise.identity.endpoint.1.0+xml'
        }
        var post_body='<ns3:endpoint name="name" id="id" description="IOT User Endpoint" xmlns:ns2="ers.ise.cisco.com" xmlns:ns3="identity.ers.ise.cisco.com"><groupId>53a17dc0-434e-11e4-a585-005056ad0fa5</groupId><mac>{{mac}}</mac><staticGroupAssignment>true</staticGroupAssignment><staticProfileAssignment>false</staticProfileAssignment></ns3:endpoint>' ;

        if(!req.body.mac)return res.send(500,{message:'MAC address missing in body.'});

        request.post({uri: url, body:post_body.replace('{{mac}}',req.body.mac),headers:headers,timeout:TIMEOUT,rejectUnauthorized: false,requestCert: true,agent: false},function(error, response, body){
            if(error)return res.send(500,error);

            console.log(req.body.mac + 'registration completed.') ;

            request.get({uri: "https://68.20.187.152/ise/mnt/CoA/Reauth/server12/"+req.body.mac,headers:headers,timeout:TIMEOUT,rejectUnauthorized: false,requestCert: true,agent: false},function(error, response, body){
                if(error)return res.send(500,error);
                console.log(req.body.mac+':authentication  completed.');

            });
        });

        next();
    }



}