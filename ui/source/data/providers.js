enyo.kind({
    name: "sandbox.Providers",
    statics: {
        "providerList": [{
            "name": "MQI",
            "credentials": "",
            "services": {
                "lighting Services": {
                    defaultURL: "http://54.169.200.173:8080/fid-SmartLightGateway",
                    defaultMethod:"POST",
                    fetch_all_lights: {
                        "url": "",
                        "method": "POST",
                    },
                    set_policies: {
                        "url": "",
                        "method": "",
                    },
                    unset_policies: {
                        "url": "",
                        "method": "",
                    }
                },
                "kiosk": {
                    "url": "",
                    "method": "",
                    "credentials": ""
                },
                "parking": {
                    "url": "",
                    "method": "",
                    "credentials": ""
                },
                "traffic": {
                    "url": "",
                    "method": "",
                    "credentials": ""
                }
            }
        }, {
            "name": "World Sensing",
            "services": {
                "light": {
                    "url": "",
                    "method": "",
                    "credentials": ""
                },
                "kiosk": {
                    "url": "",
                    "method": "",
                    "credentials": ""
                },
                "parking": {
                    "url": "",
                    "method": "",
                    "credentials": ""
                },
                "traffic": {
                    "url": "",
                    "method": "",
                    "credentials": ""
                }
            }
        }, {
            "name": "DMS",
            "services": {
                "light": {
                    "url": "",
                    "method": "",
                    "credentials": ""
                },
                "kiosk": {
                    "url": "",
                    "method": "",
                    "credentials": ""
                },
                "parking": {
                    "url": "",
                    "method": "",
                    "credentials": ""
                },
                "traffic": {
                    "url": "",
                    "method": "",
                    "credentials": ""
                }
            }
        }]
    },
    "defaultIcons": {
        "light": "assets/light.svg",
        "kiosk": "assets/kiosk.svg",
        "parking": "parking.svg",
        "traffic": "assets/traffic.svg"
    }
});