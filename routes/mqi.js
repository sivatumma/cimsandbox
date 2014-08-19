module.exports = function (app){

    app.post('/mq-query',function (req,res){

           res.send({
                   "scopes": [
                       {
                           "id": "*SHKW4W59",
                           "Path": "N01230c7d",
                           "types": [
                               "device"
                           ],
                           "Connection": [
                               {
                                   "connected": true,
                                   "since": "2014-08-14T20:20:47.105Z",
                                   "count": 1
                               }
                           ],
                           "sensors": {},
                           "hardware": {
                               "model": "unode-v2"
                           },
                           "location": {},
                           "sensor-configs": {},
                           "device-fw": {
                               "current": "afc612c"
                           },
                           "light": {},
                           "fixture": {},
                           "faults": {},
                           "wifi-connection": {
                               "ip": "192.168.65.78",
                               "channel": 165,
                               "ssid": "XeraL"
                           }
                       }
                   ]
               }
           );
    });
}