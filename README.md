CLS-Portal-Server
=================
# README #

This repo has following .gitignore; Please add these folders when you clone 
* /data 
* /node_modules 

After cloning this repo run the following command on linux or run ** install.bat ** for windows to install required modules

* npm install 

## Running app on linux
* Run on dev mode 
  **env=dev;** and then **node app.js**
* Run on production 
  **node app.js**

## Routers:

GET https://host-domain/  : *app root*  
GET https://host-domain/mobile : *mobile app root*   
GET https://host-domain/portal : *portal app root*   
GET https://host-domain/fixtures/users : *will add random / dummy user with "testing" as password.*   
POST https://host-domain/login

```sh
Request Body:
{
"username":"username",
"password":"password"
}
```
**Response when Success:**   
*Response Headers*
```sh
X-Powered-By: Express
token: 7961c28b-837a-4936-911b-03a8bc3ea69b
token_created: Wed Aug 13 2014 17:30:03 GMT+0530 (India Standard Time)
token_expires: Wed Aug 13 2014 19:30:03 GMT+0530 (India Standard Time)
Content-Type: application/json; charset=utf-8 
Content-Length: 551 
Date: Wed, 13 Aug 2014 12:00:03 GMT 
Connection: keep-alive
```
*Response Body:*
```sh
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
```

GET https://localhost/userlist   
*Request Headers:* 
```sh
token: a954a8f7-8721-4e9c-92b8-0565dbc93c80
```

*Response Body:*
```sh
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
```

GET https://localhost/logout   
*Request Headers:*
```sh
* token: a954a8f7-8721-4e9c-92b8-0565dbc93c80
```
**Response When Success:**   
*Response Body:*
```sh
{
message:ok,
status:200
}
```

## MqIdentity Proxy ##
To use Mqidentity API , we have to use following url and equivalent Service Url.
We can refer same document provided by them.

We must pass token in headers for authorization.

https:/localhost/api/lights  ==> http://mqciscocls.mqidentity.net:8080/fid-SmartLightGateway   
https:/localhost/api/organisation  ==> http://mqciscocls.mqidentity.net:8080/fid-OrganizationAddOn   
https:/localhost/api/subscriber ==>  http://mqciscocls.mqidentity.net:8080/fid-SubscriberAddOn   

*Example:*   
POST https://localhost/api/lights

*Request Header:*
```sh
token: d419a210-599b-4733-b53e-f9dd794bdade
```
*Request body:*
```sh
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
```
Response Body:

```sh
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
```

## Offers and Events ##

Every Service must set "token" header to authencate.

GET https://localhost/offers *Returns array of offers and events*   
GET https://localhost/offers?q={"model":"OFFER"} *Returns array of offers only*   
GET https://localhost/offers?q={"model":"EVENT"} *Returns array of events only*   
GET https://localhost/offers?q={"model":"OFFER","category":"Dining"}  *Returns offers with category dining*   

POST https://localhost/offers *to create a offer /event*   
*Request Body:*
```sh
{

         "thumb": "/offer-images/placeholder.png",
         "title": "f4rauyb3oh",
         "location": "wfqfi5s6g0q62rf2s",
         "description": "uezjhrserw6bmhwnz20ij3aosyxc",
         "category": "Dining",
         "date": "2014-09-05T07:33:07.974Z",
         "model": "OFFER",
         "featured": false,
         "parking_available": "MEDIUM",
         "crowd_level": "LOW",
         "latlng": {
           "lat": "41.8337329",
           "lng": "-87.7321555"
         }
       }
```
POST https://localhost/offers/540967339bd34b840fb0698d  *to update a offer /event*   
*Request Body:*
```sh
{
    "_id": "540967339bd34b840fb0698d",
    "thumb": "/offer-images/placeholder.png",
    "title": "f4rauyb3oh",
    "location": "wfqfi5s6g0q62rf2s",
    "description": "uezjhrserw6bmhwnz20ij3aosyxc",
    "category": "Dining",
    "date": "2014-09-05T07:33:07.974Z",
    "model": "OFFER",
    "featured": false,
    "parking_available": "MEDIUM",
    "crowd_level": "LOW",
    "latlng": {
      "lat": "41.8337329",
      "lng": "-87.7321555"
    }
  }
```
DELETE  https://localhost/offers/540967339bd34b840fb0698d  *delete an event or offer*   

#File upload service#

POST https://localhost/upload  *submit file with name "file"*   
*Response:*
```sh
{
            "image": "/offer-images/1409918820501-penguins.jpg"
}
```
This name is used to create offer /event

#Tour service#

GET https://localhost/tours  *list tours*   
POST https://localhost/tours/  *create tours*   
*request body:*
```sh
{"tour_id":"e92a4b16-a7e9-4eed-test-1c6f5586094a","status":true}
```
POST https://localhost/tours/{_id}  *update tour*   
*request body:*   
```sh
{"tour_id":"e92a4b16-a7e9-4eed-test-1c6f5586094a","status":true}
```
DELETE  https://localhost/tours/{_id}    *delete tour*   




