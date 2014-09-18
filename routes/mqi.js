var request=require('request');
var mongoose=require('mongoose');
var User=mongoose.model('User');
var TIMEOUT=60000;
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
			'User-Agent': 'request',
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

module.exports = function (app){

    app.all('/api/lights',proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SmartLightGateway') );
    app.all('/api/organisation',proxy_route('http://mqciscocls.mqidentity.net:8080/fid-OrganizationAddOn'));
    app.all('/api/subscriber',proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SubscriberAddOn'));
    app.all('/api/parking',proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SmartParkingGateway'));
	app.all('/api/kiosk',proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SmartKioskGateway'));
    app.all('/api/city-info',proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SmartCityInfoGateway'));
    app.all('/api/smart-movie',proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SmartMovieGateway'));
    app.all('/api/smart-deal',proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SmartDealGateway'));


    app.all('/api/spatial',pb_proxy_route('http://192.168.100.244:8080/rest/Spatial/FeatureService/tables/features.json'));
    app.all('/api/neighborhood',pb_proxy_route('http://192.168.100.244:8080/rest/cc_neighborhood/results.json'));
    app.all('/api/city-asset',pb_proxy_route('http://192.168.100.244:8080/rest/cc_cityasset/results.json'));
    app.all('/api/routes',pb_proxy_route('http://192.168.100.244:8080/rest/cc_routes/results.json'));
    app.all('/api/gov-asset',pb_proxy_route('http://192.168.100.244:8080/rest/cc_govasset/results.json'));
    app.all('/api/directions',pb_proxy_route('http://192.168.100.244:8080/rest/cc_directions_stop/results.json'));
	app.all('/api/real-directions',pb_proxy_route('http://192.168.100.244:8080/rest/cc_real_directions/results.json'));

	

    app.get('/api/poi',function (req,res){
        var proxy = request.get({
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



    app.get('/api/raster/:poiname/',function (req,res){

        var uri='http://192.168.100.244:8080/rest/Spatial/MappingService/maps/image.png;w='+req.query.WIDTH+';h='+req.query.HEIGHT+';b='+req.query.BBOX+',EPSG%3A4326';
        var proxy = request.post({
            uri:uri,
            json: { layers:[ { type:"FeatureLayer", Table: { type:"NamedTable", name:'/cisco/'+req.param('poiname') } } ] },
            headers: {
                'User-Agent': 'request',
                'Authorization':'Basic YWRtaW46YWRtaW4=',
                'Username':'admin',
                'Password':'admin'
            }},function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('from poiname got response')
            }else
                console.log(response)
        });
        req.pipe(proxy).pipe(res);
    });

}