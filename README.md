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

GET http://localhost:3030/  app root

GET http://localhost:3030/fixtures/users   will add random / dummy user with testing password.

POST http://localhost:3030/login 
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


GET http://localhost:3030/userlist

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


