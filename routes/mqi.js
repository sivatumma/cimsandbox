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
            proxy = request.get({uri:url,qs:req.query});
        }
        req.pipe(proxy).pipe(res);
    }
}

module.exports = function (app){

    app.all('/api/lights',User.authorize,proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SmartLightGateway') );
    app.all('/api/organisation',User.authorize,proxy_route('http://mqciscocls.mqidentity.net:8080/fid-OrganizationAddOn'));
    app.all('/api/subscriber',User.authorize,proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SubscriberAddOn'));
    app.all('/api/parking',User.authorize,proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SmartParkingGateway'));
  //  app.all('/api/subscriber',User.authorize,proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SubscriberAddOn'));

    app.get('/api/poi',function (req,res){
        console.log(req.query);
        proxy = request.get({
            uri:'http://192.168.100.244:8080/rest/poiservice/results.json',
            qs:req.query,
            headers: {
                'User-Agent': 'request',
                'Authorization':'Basic YWRtaW46YWRtaW4=',
                'Username':'admin',
                'Password':'admin'
            }},function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
               console.log('got response')
            }else
            console.log(response)
        });
        req.pipe(proxy).pipe(res);
    });

}