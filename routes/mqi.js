var request=require('request');
var mongoose=require('mongoose');
var User=mongoose.model('User');

var proxy_route=function (url){

    return function (req,res){
        var proxy = null;
        if(req.method === 'POST') {
            proxy = request.post({uri: url, json: req.body});
        } else if (req.method === 'DELETE'){
            proxy = request.delete({uri: url, json: req.body});
        }   else if (req.method === 'PUT'){
            proxy = request.put({uri: url, json: req.body});
        } else {
            proxy = request(url);
        }
        req.pipe(proxy).pipe(res);
    }
}

module.exports = function (app){

    app.all('/api/lights',User.authorize,proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SmartLightGateway'));
    app.all('/api/organisation',User.authorize,proxy_route('http://mqciscocls.mqidentity.net:8080/fid-OrganizationAddOn'));
    app.all('/api/subscriber',User.authorize,proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SubscriberAddOn'));

}