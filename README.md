CLS-Portal-Server
=================
# README #

This repo has following git ignore, please add these folders when your clone repo 
/data 
/node_modules 

After cloning repo run following command on linux or run "install.bat" for windows to install required modules

npm install 


running app on linux

if you want run on dev mode 
env=dev node app.js

if you want run on production 

node app.js

GET https://localhost/  app root

GET https://localhost/fixtures/users   will add random / dummy user with testing password.

POST https://localhost/login 
Request Body:
{
"username":"username",
"password":"password"
}

When Success:
Response Headers:
X-Powered-By: Express
token: 7961c28b-837a-4936-911b-03a8bc3ea69b
token_created: Wed Aug 13 2014 17:30:03 GMT+0530 (India Standard Time)
token_expires: Wed Aug 13 2014 19:30:03 GMT+0530 (India Standard Time)
Content-Type: application/json; charset=utf-8 
Content-Length: 551 
Date: Wed, 13 Aug 2014 12:00:03 GMT 
Connection: keep-alive

Response Body:
{
  "updated_at": "2014-08-13T12:00:03.010Z",
  "username": "xqrgyl",
  "_id": {
    "id": 14
  },
  "__v": 5,
  "profile": {
    "origin": "uja1v",
    "employer": "g55cctpar",
    "occupation": "vtklhq6",
    "interests": [
      {
        "_id": {
          "id": 15
        },
        "type": "Mary",
        "text": "Alexa"
      }
    ],
    "children_under_18": 2,
    "married": false,
    "age": 64,
    "sex": "male"
  },
  "created_at": "2014-08-13T10:02:35.374Z",
  "roles": [
    "subscriber"
  ],
  "loginAttempts": 0,
  "active": true
}


GET https://localhost/userlist

Request Headers:
token: a954a8f7-8721-4e9c-92b8-0565dbc93c80

Response Body:
[
   {
    "_id": 12,
    "username": "b55kw56"
  },
  {
    "_id": 14,
    "username": "xqrgyl"
  }
]

#Mqidentity Proxy#
To use Mqidentity API , we have to use following localhost url and equivalent Service Url.
We can refer same document provided by them.

We must pass token in headers for authorization.

https:/localhost/api/lights  ==> http://mqciscocls.mqidentity.net:8080/fid-SmartLightGateway
https:/localhost/api/organisation  ==> http://mqciscocls.mqidentity.net:8080/fid-OrganizationAddOn
https:/localhost/api/subscriber ==>  http://mqciscocls.mqidentity.net:8080/fid-SubscriberAddOn

Example:
POST https://localhost/api/lights

Request Header: token: d419a210-599b-4733-b53e-f9dd794bdade

Request body: 
{
    "query": {
        "documentation": "Get all lights operated by specified organization",
        "find": {
            "light": {
                "operatedBy": "sensity-lab",
                "geocoordinates": {
                    "lat": 1.34,
                    "lon": 34.4,
                    "alt": 134
                }
            }
        }
    }
}

Response Body:


{
  "scopes":
  [
    {
      "id":"*SHKW4W59",
      "Path":"N01230c7d",
      "types":
      [
        "device"
      ],
      "Connection":
      [
        {
          "connected":true,
          "since":"2014-08-14T20:20:47.105Z",
          "count":1
        },
        null
      ],
      "sensors":{},
      "hardware":
      {
        "model":"unode-v2"
      },
      "location":{},
      "sensor-configs":{},
      "device-fw":
      {
        "current":"afc612c"
      },
      "light":
      {
        "Schedule":"",
        "fixture":"abcdds"
      },
      "fixture":{},
      "faults":{},
      "wifi-connection":
      {
        "ip":"192.168.65.78",
        "channel":165,
        "ssid":"XeraL"
      }
    }
  ]
}






