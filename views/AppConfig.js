/*jshint -W087 */ //    For not throwing out debugger statement errors
enyo.kind({
    name: "AppConfig",
    statics: {
        // baseURL: "http://ec2-54-169-179-59.ap-southeast-1.compute.amazonaws.com/",
        baseURL: "/",
        prodURL: "http://cimsandbox.paradigmit.com/",   //  Sandbox area
        // debugURL: "https://173.36.245.244/",
        // debugURL: "https://cim.cisco.com/",
        //debugURL: "http://54.169.186.150/",
        debugURL: "http://cimsandbox.paradigmit.com/",  //  DNS mapped to - http://ec2-54-169-179-59.ap-southeast-1.compute.amazonaws.com/

        //  Set this to true if we wish to enable console logging and alert(). 
        //  Set this to false, before deploying the app into production
        debugMode:              false,
        alertsEnabled:          true, 
        consoleLoggingEnabled:  true, 
        consoleLogTraceEnabled: false,
        breakPointsEnabled:     false, 
        logglyLoggingEnabled:   false, 

        useOfflineDataForKeyCityAssets: true,
        // defaultCredentials:                     "lightop/lightop",
        defaultCredentials:                     "cim/sandbox",
        // defaultCredentials: null,

        useDummyData:           false,

        userLanguage: window.navigator.userLanguage || window.navigator.language,
        locale: "", //  Use this to force take a locale like de_DE other than User locale. If this be null, App would pick locale from User's Computer
        resourceBundle: null,

        /*  List all the city names with their exact latlong in this JSON   */
        availableCities: {
            "Chicago": {
                lat: 41.878114,
                lng: -87.629798
            },
            "Vizag": {
                lat: 17.6883,
                lng: 83.2186
            },
            "Hamburg": {
                lat: 53.5653,
                lng: 10.0014
            },
            "San Francisco": {
                lat: 37.38381647175324,
                lng: -121.98723024392321
            },
            "San Jose":{
                lat:37.3333,
                lng: -121.9000
            }
        },
        /*  Configure the current city */
        currentCity: "San Jose",
        /*  We can put all tile providers here for much Control */
        availableTileProviders: {
            mapbox: {
                url: "http://{s}.tiles.mapbox.com/v3/timtuity.j62gk2ig/{z}/{x}/{y}.png",
                // url: "http://{s}.tiles.mapbox.com/v3/timtuity.90357cd0/{z}/{x}/{y}.png",
                settings: {
                    attribution: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='http://mapbox.com'>Mapbox</a>"
                }
            },
            google: {
                url: "http: //{s}.googleapis.com/vt?lyrs=m@174225136&src=apiv3.8&hl=en-US&x={x}&y={y}&z={z}&s=Galile&style=api%7Csmartmaps",
                settings: {
                    subdomains: ['mt0', 'mt1', 'mt2'],
                    attribution: "Map data © 2012 Google"
                }
            },
            cloudmade: {
                url: "http://{s}.tile.cloudmade.com/" + this.cloudmateApiKey + "/997/256/{z}/{x}/{y}.png",
                settings: {
                    attribution: "Map data © 2011 OpenStreetMap contributors, Imagery © 2011 CloudMade"
                }
            },
            openstreet: {
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                settings: {
                    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                }
            },
            openstreet_blackandwhite: {
                url: 'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png',
                settings: {
                    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                }
            },
            openstreet_DE: {
                url: 'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
                settings: {
                    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                }
            },
            openstreet_HOT: {
                url: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
                settings: {
                    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
                }
            },
            //  Thunder Forest. OpenCycleMap
            tf_openCycleMap: {
                url: 'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
                settings: {
                    attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                }
            },
            //  Thunder Forest. Transport
            tf_transport: {
                url: 'http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
                settings: {
                    attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                }
            },
            //  Thunder Forest. Landscape
            tf_landscape: {
                url: 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
                settings: {
                    attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                }
            },
            //  Thunder Forest. Outdoors
            tf_outdoors: {
                url: 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png',
                settings: {
                    attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                }
            },
            //  OpenMapSurfer. Roads
            oms_roads: {
                url: 'http://openmapsurfer.uni-hd.de/tiles/roads/x={x}&y={y}&z={z}',
                settings: {
                    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                }
            },
            //  OpenMapSurfer. Grayscale
            oms_grayscale: {
                url: 'http://openmapsurfer.uni-hd.de/tiles/roadsg/x={x}&y={y}&z={z}',
                settings: {
                    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                }
            },
            //  Hydda. Base
            hydda_base: {
                url: 'http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png',
                settings: {
                    attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                }
            },
            //  Hydda. Full Maps
            hydda_full: {
                url: 'http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
                settings: {
                    attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                }
            },
            //  MapQuestOpen. OSM 
            mqo_osm: {
                url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg',
                settings: {
                    attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                    subdomains: '1234'
                }
            },
            //  MapQuestOpen. Aerial
            mqo_aerial: {
                url: 'http://oatile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg',
                settings: {
                    attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
                    subdomains: '1234'
                }
            },
            //  Stamen. Toner
            stamen_toner: {
                url: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
                settings: {
                    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                    subdomains: 'abcd'
                }
            },
            //  Stamen. Toner Background
            stamen_tonerBG: {
                url: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
                settings: {
                    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                    subdomains: 'abcd'
                }
            },
            //  Stamen. Toner Light
            stamen_tonerLight: {
                url: 'http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png',
                settings: {
                    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                    subdomains: 'abcd'
                }
            }
        },
        /*  The tile provider we are going to use for this deployment  */
        currentTileProvider: "mapbox",
        /*  Map Configuration  */
        mapOpacity: 1,
        minZoom: 2,
        maxZoom: 20,

        alert: function(message) {
            if (AppConfig.debugMode && AppConfig.alertsEnabled) {
                alert(message);
            }
        },
        alert_: function(args) {
            //  Nothing, use this method to disable any alert statment for the time being.
        },
        log: function(args, trace) {
            if (AppConfig.logglyLoggingEnabled) {AnalyticsLogger.logAnalyticsData(args);}
            // Log only if debugMode and logsMode are true. In production, logs will only goto loggly.
            if (AppConfig.debugMode && AppConfig.consoleLoggingEnabled) {
                if (AppConfig.consoleLogTraceEnabled || trace) {
                    console.log(new Error().stack);
                } else {
                    var lineNumberOfLog = new Error().stack.split('\n')[2].split('/');
                    lineNumberOfLog = lineNumberOfLog[lineNumberOfLog.length - 1];
                    console.log(arguments,lineNumberOfLog);
                }
            }
        },
        log_: function(message) {
            //  Nothing, use this method to disable a specific log statement for the time being.
        },
        getLocaleStrings: function() {
            if (AppConfig.resourceBundle == null) {
                AppConfig.resourceBundle = new ilib.ResBundle({
                    "locale": AppConfig.locale
                });
                return AppConfig.resourceBundle;
            } else {
                return AppConfig.resourceBundle;
            }
        },
        debug: function() {
            if (AppConfig.debugMode && AppConfig.breakPointsEnabled) {
                debugger;
            }
        },
        debug_: function() {
            //  Use to disable the above functionality for any debug() statements
        },
        getReadableTime: function(){
            // return -new Date().getTimezoneOffset()/60;
            // return new Date().getHours();
            var timestamp = 1301090400;
            try {
                //  If it works, use enyo-ilib locale
                var fmt = new ilib.DateFmt();
                var d = fmt.format(timestamp);
                return d;
            } catch (e){
                // if not, use plain js

                var date = new Date(),
                hours = date.getHours(),
                dayOrNight = (hours < 6 || hours > 18) ? "Night time for you" : "Daytime for you";
                var datevalues = [
                   date.getFullYear(),
                   date.getMonth()+1,
                   date.getDate(),
                   date.getHours(),
                   date.getMinutes(),
                   date.getSeconds()
                ];
                return date.toDateString() +", " + datevalues[3] + ":" + datevalues[4] + "<br/>" + dayOrNight;
            }
        }
    },
    create: function() {
        this.inherited(arguments);
        AppConfig.alert("Hellow Vizag");
        if (!window.location.hostname || window.location.hostname.indexOf("localhost") >= 0) {
            AppConfig.baseURL = AppConfig.debugURL;
        }
    }
});