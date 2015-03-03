var mongoose=require('mongoose');
var _=require('lodash');
var uuid=require('node-uuid');

var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

var User=mongoose.model('User');

// var ping = require ("net-ping");


module.exports = function (app){
    var config=app.get('config');

    app.post('/ping',User.authorize,function (req,res){

        if(req.body.host === ""){
            exec("ping localhost", function(err, out, code) {
              if (err instanceof Error)
                throw err;
              res.send({"message":"no host provided, pinged localhost, working"});
            });
        } else {
            console.log(req.body.host);
            exec("ping " + req.body.host, function(err, out, code) {
              if (err instanceof Error)
                res.send({error:err});
              if (out.indexOf("Reply from") > 0)
                res.send({"message":"&#10003;"});
            });
        }

    });


    app.post('/pingSpecial',User.authorize,function (req,res){

        if(!req.body.host){
            var session = ping.createSession ();
            session.pingHost ("localhost", function (error, target) {
                if (error)
                    res.send(target + ": " + error.toString ());
                else
                    res.send(target + ": Alive");
            });
        } else {
            res.send("Will ping, wait.");
        }

    });

}
