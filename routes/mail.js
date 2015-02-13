var mongoose=require('mongoose');
var _=require('lodash');
var uuid=require('node-uuid');
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}
module.exports = function (app){
    var config=app.get('config');

    app.get('/pushedToSandboxRepo',function (req,res,next){
        console.log("There was some push happened to Sandbox UI Repo");
        var nodemailer = require('nodemailer');

        // create reusable transporter object using SMTP transport
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'siva.tumma@paradigmcreatives.com',
                pass: '1rupee=100$'
            }
        });

        // NB! No need to recreate the transporter object. You can use
        // the same transporter object for all e-mails

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'Siva P Tumma ✔ <siva.tumma>', // sender address
            to: 'siva.tumma@paradigmcreatives.com, vamsi.mutha@paradigmcreatives.com', // list of receivers
            subject: 'Updates are pushed to Sandbox Repo (TEST Auto Deployment) ✔', // Subject line
            text: 'Updates are pushed to Sandbox Repo (TEST Auto Deployment) ✔', // plaintext body
            html: '<b>Updates are pushed to Sandbox Repo (TEST Auto Deployment). <br/> Let us use this hint to autodeploy and configure scaling ✔</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
        });
    });
}
