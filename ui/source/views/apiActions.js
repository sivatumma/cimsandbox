enyo.kind({
    name: "sandbox.APIActions",
    kind: "FittableRows",
    components: [{
        kind: "Signals",
        selectionUpdate: "selectionUpdate",
        showSpinner: "showSpinner",
        hideSpinner:"hideSpinner"
    }, {
        kind: "FittableRows",
        name: "parameters",
        components: [{
            name: "requrestDescription",
            // content: "Descriptive information here about each request being made"
        }, {
            kind: "FittableColumns",
            classes: "parameters",
            components: [{
                name: "url",
                content: "URL"
            }, {
                name: "urlValue",
                kind: "Input",
                content: "",
            }]
        }, {
            kind: "FittableColumns",
            classes: "parameters",
            components: [{
                name: "headers",
                content: "Headers",
            }, {
                kind: "Input",
                placeholder: "token: 4768f88b-61cf-416f-b8a4-9e196d615cf1",
            }]
        }]
    }, {
        kind: "FittableColumns",
        name: "requestAndResponse",
        classes: "requestAndResponse",
        components: [{
            name: "request",
            classes: "request",
            kind: "FittableRows",
            components: [{
                content: "Request",
            }, {
                kind: "TextArea",
                classes: "textAreaForServices",
                name: "requestJson",
                postBodyForLights: {
                    "query": {
                        "documentation": "Get all lights operated by specified organization (maps to logical scopes)",
                        "find": {
                            "light": {
                                "operatedBy": "sensity-qa"
                            }
                        }
                    }
                },
                postBodyForKiosks: {
                    "query": {
                        "documentation": "Get kiosks at specified location",
                        "find": {
                            "kiosk": {}
                        }
                    }
                },
                postBodyForParking: {
                    "query": {
                        "documentation": "Get parking space operated by specified organization",
                        "find": {
                            "parkingSpace": {
                                "operatedBy": "worldsensing"
                            }
                        }
                    }
                }
            }]
        }, {
            name: "spinner",
            kind: "Spinner",
            classes: "hidden spinner"
        }, {
            name: "response",
            classes: "response",
            kind: "FittableRows",
            components: [{
                kind: "FittableColumns",
                components: [{
                    content: "Response",
                }, {
                    name: "httpResponseCode",
                    classes: "httpResponseCode"
                }]
            }, {
                kind: "TextArea",
                classes: "textAreaForServices",
                name: "responseJson",
            }]
        }]
    }],
    create: function() {
        this.inherited(arguments);
    },
    selectionUpdate: function(inSender, inEvent) {
        console.log("this is the selectionUpdate");
        var currentURL = (inEvent.selected.data.url !== undefined) ?  inEvent.selected.data.url : Statics[Statics.currentProvider].endPoint;
        console.log("CurrentURL : ", currentURL);
        if (!inEvent.selected.data.topLevelService) {
            this.$.httpResponseCode.addClass("hidden");
            this.$.urlValue.setValue(AppConfig.debugURL + currentURL);
            this.$.requestJson.setValue(JSON.stringify(inEvent.selected.data.postBody, null, "\t"));
            app.showSpinner();
            this.$.responseJson.setValue("");
            this.$.responseJson.removeClass("invalidJSON");
            console.log(currentURL);
            AjaxAPI.makeAjaxRequest(currentURL, null, this, this.defaultSuccessCallback, this.defaultErrorCallback, "POST", inEvent.selected.data.postBody, 'application/json', null, null);
        }
    },
    defaultErrorCallback: function(inEvent, inResponse) {
        console.log("defaultErrorCallback has been called");
        console.log(inResponse);
        this.$.responseJson.setValue("Error : HTTP Response Code is : " + inResponse);
//        this.$.httpResponseCode.addRemoveClass("httpResponseCode");
	this.$.httpResponseCode.setContent(inResponse);
	this.$.httpResponseCode.addClass("invalidJSON");
	this.$.responseJson.addClass("invalidJSON");
	app.hideSpinner();
    },
    defaultSuccessCallback: function(inEvent, inResponse, invalidJSON) {
        console.log("defaultSuccessCallback has been called");
        this.$.httpResponseCode.setContent("HTTP Response Code : " + inEvent.xhrResponse.status);
        this.$.httpResponseCode.removeClass("hidden");
        console.log(inResponse);
        if (invalidJSON) this.$.responseJson.addClass("invalidJSON");
        this.$.responseJson.setValue(JSON.stringify(inResponse, null, "\t"));
        app.hideSpinner();
    },
    showSpinner: function() {
        this.$.spinner.removeClass("hidden");
    },
    hideSpinner: function() {
        this.$.spinner.addClass("hidden");
    }
});
enyo.kind({
    name: "Spinner",
    components: [{
        components: [{
            kind: "onyx.Spinner"
        }]
    }]
});
