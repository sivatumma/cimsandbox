enyo.kind({
    name: "Statics",
    statics: {
    	currentProvider:"MQI",
        MQI: {
            endPoint: AppConfig.baseURL + "/api/mqi",
            API_KEY:"EXAMPLE: 4b2891f7-f272-4f1e-a51d",
            services:{
	            light:[
		            {"Get All Light Data" : {"query":{"documentation":"Get all lights","find":{"light":{}}}}},
		            {"Get Light Data in Viewport" : {"query":{"documentation":"Get all lights within the specified viewport. Lat is specified in the format minLat,maxLat and Lon is specified as minLong, maxLong","find":{"light":{"geocoordinates":{"lat":"+37.232976,+37.442615","lon":"-122.174149,-121.771088"}}}}}},
		            {"Set State to : ON" : {"query":{"documentation":"Turn on all lights with the following IDs","process":{"set":{"powerstate":"ON"}},"find":{"light":{"sid":"sensity.*8D1A5ZW9"}}}}},
                    {"Set State to : OFF" : {"query":{"documentation":"Turn off all lights with the following IDs","process":{"set":{"powerstate":"OFF"}},"find":{"sid":"sensity.*8D1A5ZW9"}}}}
	            ],
	            ambience:[
                    {"Get Ambience from All Sensors":{"query":{"documentation":"Get ambient light level from all sensors","find":{"ambience":{}}}}},
                    {"Get from specific Sensors":{"query":{"documentation":"Get ambient light level from all sensors within the specified bounding box","find":{"ambience":{"geocoordinates":{"lat":"+37.232976,+37.442615","lon":"-122.174149,-121.771088"}}}}}},
                    {"Filter on Flux level" : {"query":{"documentation":"Get ambient light level from all sensors within the specified bounding box where the lux level < 100","find":{"ambience":{"geocoordinates":{"lat":"+37.232976,+37.442615","lon":"-122.174149,-121.771088"},"illuminance":{"Value":{"lt":100}}}}}}}
	        	],
	        	traffic:[
                    {"Get for Roads": {"query":{"documentation":"Get traffic details for all the road segments.","find":{"roadSegment":{}}}}},
                    {"Get for Routes" : {"query":{"documentation":"Get traffic details for all the routes.","find":{"route":{}}}}}
	        	],
	        	parking:[
                    {"Get All Parking Data" :{"query":{"documentation":"Get parking space info","find":{"parkingSpace":{}}}}},
                    {"Filter - Occupied" : {"query":{"documentation":"Get parking space info, retrieve only parking spots with specified state","find":{"parkingSpace":{"parkingSpots":{"state":{"occupied":true}}}}}}},
                    {"Filter - Vacant" : {"query":{"documentation":"Get parking space operated by specified organization, but retrieve only parking spots with specified state","find":{"parkingSpace":{"operatedBy":"sensity‐qa","parkingSpots":{"state":{"occupied":false}}}}}}}
	        	]
            }

        }
    }
});