var request=require('request');
var mongoose=require('mongoose');
var User=mongoose.model('User');
var parseString = require('xml2js').parseString;
var TIMEOUT=30000;
request.defaults({pool: {maxSockets: Infinity},gzip: true});

var proxy_route=function (url){

    return function (req,res){

        var proxy = null;
		console.log(req.method +" Request :->"+req.originalUrl);
		if(req.method == 'GET'){
			proxy = request.get({uri:url,qs:req.query,timeout:TIMEOUT},function(error, response, body){  
						if(error)return res.send(500,error);
						console.log('Response recieved:'+req.originalUrl);
					});
		}else {
			proxy = request[req.method.toLowerCase()]({uri: url, json: req.body,timeout:TIMEOUT},function(error, response, body){    
						if(error)return res.send(500,error);
						console.log('Response recieved:'+req.originalUrl);
			});			
		}
		
        req.pipe(proxy).pipe(res);
    }
}

var pb_proxy_route=function (url){

   var  headers = {
            'Authorization':'Basic YWRtaW46YWRtaW4=',
            'Username':'admin',
            'Password':'admin'
    }

    return function (req,res){
		console.log(req.method +" Request :->"+req.originalUrl);
        var proxy = null;
      	if(req.method == 'GET'){
			proxy = request.get({uri:url,qs:req.query,headers:headers,timeout:TIMEOUT},function(error, response, body){  
						if(error)return res.send(500,error);
						console.log('Response recieved:'+req.originalUrl);
					});
		}else {
			proxy = request[req.method.toLowerCase()]({uri: url, json: req.body,headers:headers,timeout:TIMEOUT},function(error, response, body){    
						if(error)return res.send(500,error);
			});			
		}
        req.pipe(proxy).pipe(res);
    }
}

var lc_proxy_route=function (url){

    var  headers = {
        'Authorization':'Basic Y2l0eWFwcDpJb1RXRjIwMTQ=',
        'Username':'cityapp',
        'Password':'IoTWF2014'
    }

    return function (req,res){
        console.log(req.method +" Request :->"+req.originalUrl);
        var to_path=req.path.replace('/api/mse/','');
        console.log(url+to_path)
        var proxy = null;
        if(req.method == 'GET'){
            proxy = request.get({uri:url+to_path,qs:req.query,headers:headers,timeout:TIMEOUT,rejectUnauthorized: false,requestCert: true,agent: false},function(error, response, body){
                if(error)return res.send(500,error);
                if (!error && response.statusCode == 200) {
                    parseString(body, function (err, result) {
                        if(err)return res.send(500,err);
                        res.send(result);
                    });
                }else {
                    res.send(response);
                }
            });
        }else {
            proxy = request[req.method.toLowerCase()]({uri: url+to_path, json: req.body,headers:headers,timeout:TIMEOUT,rejectUnauthorized: false,requestCert: true,agent: false},function(error, response, body){
                if(error)return res.send(500,error);
            });
            req.pipe(proxy).pipe(res);
        }

    }
}

function ise_proxy_route(req,res){
   var url='https://68.20.187.152:9060/ers/config/endpoint';
   var  headers = {
        'Authorization':'Basic ZXJzOklvdHJlc3QxIQ==',
        'Content-Type':'application/vnd.com.cisco.ise.identity.endpoint.1.0+xml',
        'Accept':'application/vnd.com.cisco.ise.identity.endpoint.1.0+xml'
   }

    if(!req.body.mac)return res.send(500,{message:'MAC address missing in body.'})

    if(req.method == 'DELETE'){
            request.get({uri:url+'?filter=mac.EQ.'+req.body.mac,headers:headers,timeout:TIMEOUT,rejectUnauthorized: false,requestCert: true,agent: false},function(error, response, body){
                if(error)return res.send(500,error);
                if (!error && response.statusCode == 200) {
                    parseString(body, function (err, result) {
                        if(err)return res.send(500,err);
                        try {
                            var token=result['ns2:searchResult']['resources'][0]['resource'][0]['$']['id'];
                            console.log('found token'+token);
                            request.del({uri: url+'/'+token, headers:headers,timeout:TIMEOUT,rejectUnauthorized: false,requestCert: true,agent: false},function(error, response, body){
                                if(error)return res.send(500,error);
                                res.send({message:'OK'});
                            });

                        }catch(e){
                         return res.send(500,e);
                        }
                    });
                }else {
                    res.send(response);
                }
            });
    }

}

module.exports = function (app){

    app.all('/api/lights',User.authorize,proxy_route('http://internal-MQ-ELB-1506850226.us-east-1.elb.amazonaws.com:8080/fid-SmartLightGateway') );
    app.all('/api/organisation',User.authorize,proxy_route('http://internal-MQ-ELB-1506850226.us-east-1.elb.amazonaws.com:8080/fid-OrganizationAddOn'));
    app.all('/api/subscriber',User.authorize,proxy_route('http://internal-MQ-ELB-1506850226.us-east-1.elb.amazonaws.com:8080/fid-SubscriberAddOn'));
    app.all('/api/parking',User.authorize,proxy_route('http://internal-MQ-ELB-1506850226.us-east-1.elb.amazonaws.com:8080/fid-SmartParkingGateway'));
	app.all('/api/kiosk',User.authorize,proxy_route('http://internal-MQ-ELB-1506850226.us-east-1.elb.amazonaws.com:8080/fid-SmartKioskGateway'));
    app.all('/api/city-info',User.authorize,proxy_route('http://internal-MQ-ELB-1506850226.us-east-1.elb.amazonaws.com:8080/fid-SmartCityInfoGateway'));
    app.all('/api/smart-movie',User.authorize,proxy_route('http://internal-MQ-ELB-1506850226.us-east-1.elb.amazonaws.com:8080/fid-SmartMovieGateway'));
    app.all('/api/smart-deal',User.authorize,proxy_route('http://internal-MQ-ELB-1506850226.us-east-1.elb.amazonaws.com:8080/fid-SmartDealGateway'));
    app.all('/api/smart-traffic',User.authorize,proxy_route('http://internal-MQ-ELB-1506850226.us-east-1.elb.amazonaws.com:8080/fid-SmartTrafficGateway'));


    app.all('/api/spatial',User.authorize,pb_proxy_route('http://internal-PB-ELB-999255715.us-east-1.elb.amazonaws.com:8080/rest/Spatial/FeatureService/tables/features.json'));
    app.all('/api/neighborhood',User.authorize,pb_proxy_route('http://internal-PB-ELB-999255715.us-east-1.elb.amazonaws.com:8080/rest/cc_neighborhood/results.json'));
    app.all('/api/city-asset',User.authorize,pb_proxy_route('http://internal-PB-ELB-999255715.us-east-1.elb.amazonaws.com:8080/rest/cc_cityasset/results.json'));
    app.all('/api/routes',User.authorize,pb_proxy_route('http://internal-PB-ELB-999255715.us-east-1.elb.amazonaws.com:8080/rest/cc_routes/results.json'));
    app.all('/api/gov-asset',User.authorize,pb_proxy_route('http://internal-PB-ELB-999255715.us-east-1.elb.amazonaws.com:8080/rest/cc_govasset/results.json'));
    app.all('/api/directions',User.authorize,pb_proxy_route('http://internal-PB-ELB-999255715.us-east-1.elb.amazonaws.com:8080/rest/cc_directions_stop/results.json'));
	app.all('/api/real-directions',User.authorize,pb_proxy_route('http://internal-PB-ELB-999255715.us-east-1.elb.amazonaws.com:8080/rest/cc_real_directions/results.json'));

    app.all(/\/api\/mse\/([^\/]+)\/?(.+)?/,User.authorize,lc_proxy_route('https://104.153.228.2:9061/api/contextaware/v1/'));

    app.all('/api/ise',User.authorize,ise_proxy_route);




	

    app.get('/api/poi',User.authorize,function (req,res){
        var proxy = request.get({
            uri:'http://internal-PB-ELB-999255715.us-east-1.elb.amazonaws.com:8080/rest/poiservice/results.json',
            qs:req.query,
            headers: {
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