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

var pb_proxy_route=function (url){

   var  headers = {
        'User-Agent': 'request',
            'Authorization':'Basic YWRtaW46YWRtaW4=',
            'Username':'admin',
            'Password':'admin'
    }

    return function (req,res){
        var proxy = null;
        if(req.method === 'POST') {
            proxy = request.post({uri: url, json: req.body,headers:headers});
        } else if (req.method === 'DELETE'){
            proxy = request.delete({uri: url, json: req.body,headers:headers});
        }   else if (req.method === 'PUT'){
            proxy = request.put({uri: url, json: req.body,headers:headers});
        } else {
            proxy = request.get({uri:url,qs:req.query,headers:headers});
        }
        req.pipe(proxy).pipe(res);
    }
}

module.exports = function (app){

    app.all('/api/lights',User.authorize,proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SmartLightGateway') );
    app.all('/api/organisation',User.authorize,proxy_route('http://mqciscocls.mqidentity.net:8080/fid-OrganizationAddOn'));
    app.all('/api/subscriber',User.authorize,proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SubscriberAddOn'));
    app.all('/api/parking',User.authorize,proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SmartParkingGateway'));
	app.all('/api/kiosk',User.authorize,proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SmartKioskGateway'));

    app.all('/api/spatial',User.authorize,pb_proxy_route('http://192.168.100.244:8080/rest/Spatial/FeatureService/tables/features.json'));
    app.all('/api/neighborhood',User.authorize,pb_proxy_route('http://192.168.100.244:8080/rest/cc_neighborhood/results.json'));
    app.all('/api/city-asset',User.authorize,pb_proxy_route('http://192.168.100.244:8080/rest/cc_cityasset/results.json'));
    app.all('/api/routes',User.authorize,pb_proxy_route('http://192.168.100.244:8080/rest/cc_routes/results.json'));
    app.all('/api/gov-asset',User.authorize,pb_proxy_route('http://192.168.100.244:8080/rest/cc_govasset/results.json'));
    app.all('/api/directions',User.authorize,pb_proxy_route('http://192.168.100.244:8080/rest/cc_directions/results.json'));

    app.get('/api/poi',User.authorize,function (req,res){
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