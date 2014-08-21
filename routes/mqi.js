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

    app.all('/api/lights',User.authorize,function (req,res){
        res.send({
            "lights": [
                {
                    "fixture": null,
                    "latitude": 37.38254771790752,
                    "longitude": -121.98718015293909,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.384767961550246,
                    "longitude": -121.98840012837195,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.38450275607164,
                    "longitude": -121.98793441025396,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.38381647175324,
                    "longitude": -121.98723024392321,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.38264781214167,
                    "longitude": -121.98661352085158,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.38280001319052,
                    "longitude": -121.98788176332091,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.3834191664698,
                    "longitude": -121.98722466950149,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.38325723662558,
                    "longitude": -121.98616201619855,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.3833445820258,
                    "longitude": -121.98815704260619,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.38359937714812,
                    "longitude": -121.98689870624425,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.38195005864051,
                    "longitude": -121.98723985428573,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.384434974246666,
                    "longitude": -121.98920232897885,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.38437091691092,
                    "longitude": -121.98601810102801,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.38304154978986,
                    "longitude": -121.98859831563679,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.383776,
                    "longitude": -121.987397,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.3832205430889,
                    "longitude": -121.98724680236812,
                    "altitude": null
                },
                {
                    "fixture": null,
                    "latitude": 37.38655722701925,
                    "longitude": -121.9885611760122,
                    "altitude": null
                }
            ]
        });
    });
    app.all('/api/organisation',User.authorize,proxy_route('http://mqciscocls.mqidentity.net:8080/fid-OrganizationAddOn'));
    app.all('/api/subscriber',User.authorize,proxy_route('http://mqciscocls.mqidentity.net:8080/fid-SubscriberAddOn'));

}