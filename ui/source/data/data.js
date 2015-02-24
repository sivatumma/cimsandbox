/**
    For simple applications, you might define all of your models, collections,
    and sources in this file.  For more complex applications, you might choose to separate
    these kind definitions into multiple files under this folder.
*/
enyo.kind({
    name: "AjaxAPI",
    statics: {
        defaultErrorHandler: function(inSender, inResponse) {
            var responseHandled = false;
            AppConfig.alert(inResponse);
            switch (inResponse) {
                case 0:
                    enyo.Signals.send("onAjaxError", {
                        errorMessage: "Unable to connect to the server. You will be logged out automatically.",
                        forceLogout: true,
                        errorReason: "unreachable"
                    });
                    break;
                case 'timeout':
                    enyo.Signals.send("onAjaxError", {
                        errorMessage: "Request Timed Out"
                    });
                    break;
                default:
                    if (inSender.xhrResponse.body) {
                        enyo.Signals.send("onAjaxError", {
                            errorMessage: "Error: " + inSender.xhrResponse.body
                        });
                    } else {
                        enyo.Signals.send("onAjaxError", {
                            errorMessage: "Error: Unknown"
                        });
                    }
                    break;
            }
            return responseHandled;
        },
        unifiedSuccessHandler: function(inSender, inResponse) {
            var responseHandled = true;
            if (inResponse !== null && (inResponse === "" || typeof inResponse === 'object') || inSender.contentType === "application/octet-stream") {
                responseHandled = false;
            } else {
                enyo.Signals.send("onAjaxError", {
                    errorMessage: "Session Expired.\n You will be logged out automatically.",
                    errorReason: "session_expired",
                    forceLogout: true
                });
            }
            return responseHandled;
        },
        makeAjaxRequest: function(requestURL, ipArray, context, successCallback, errorCallback, method, postBody, contentType, timeoutValue, token) {
            AppConfig.log(requestURL);
            var successHandler = (context && successCallback) ? enyo.bind(context, successCallback) : null;
            if (requestURL.charAt(0) === "/") {
                requestURL = requestURL.replace("/", "");
            }
            var urlText = requestURL;
            if (urlText.indexOf(AppConfig.baseURL) !== 0) {
                if (AppConfig.baseURL.charAt(AppConfig.baseURL.length - 1) === "/") {
                    urlText = AppConfig.baseURL + requestURL;
                } else {
                    urlText = AppConfig.baseURL + "/" + requestURL;
                }
            }
            if (ipArray) {
                urlText = this.generateParamsText(urlText, ipArray);
            }
            var methodType = (method && method !== "") ? method.toUpperCase() : "GET";
            var ajax = new enyo.Ajax({
                url: urlText,
                cacheBust: false,
                method: methodType,
                timeout: timeoutValue || AppConfig.defaultTimeoutInterval,
                headers: enyo.mixin(token, {}),
                contentType: contentType || "application/json",
                postBody: postBody
            });
            if (postBody) {
                switch (methodType) {
                    case "POST":
                    case "PUT":
                        ajax.postBody = postBody || {};
                        ajax.handleAs = "json";
                        break;
                    default:
                        console.error("Post Body passed to request, but method type is " + methodType, urlText);
                        break;
                }
            }
            ajax.response(function(inSender, inResponse) {
                if (!AjaxAPI.unifiedSuccessHandler(inSender, inResponse) && successHandler) {
                    successHandler(inSender, inResponse, false);
                } else {
                    //  Implies that the response returned is not a valid JSON
                    successHandler(inSender,inResponse,true);
                }
            });
            AppConfig.log(ajax);
            // send parameters the remote service using the 'go()' method
            ajax.go();
            // attach responders to the transaction object
            var successHandler = (context && successCallback) ? enyo.bind(context, successCallback) : null;
            // ajax.response(function(inSender, inResponse) {
            //     // unifiedSuccessHandler returns true if it handled the response, so
            //     //  don't call the handler if it returns true
            //     if (!AjaxAPI.unifiedSuccessHandler(inSender, inResponse)) {
            //         if (successHandler) {
            //             successHandler(inSender, inResponse, false);
            //         }
            //     }
            // });
            var errorHandler = (context && errorCallback) ? enyo.bind(context, errorCallback) : null;
            // user error handler that was passed in or the default handler
            ajax.error(errorHandler || AjaxAPI.defaultErrorHandler);
        },
        generateParamsText: function(urlText, ipArray) {
            urlText = urlText.replace("deviceId=?", "");
            urlText = urlText.replace("?", "");
            _.each(ipArray, function(ip) {
                if (ip === ipArray[0]) {
                    urlText = urlText + "?deviceId=" + ip.toString();
                } else {
                    urlText = urlText + "&deviceId=" + ip.toString();
                }
            }, this);
            return (urlText);
        }
    }
});
enyo.kind({
    name: "UserModel",
    statics: {
        MAC_ADDRESS: null,
        userObject: '',
        responseHeader: '',
        loginUser: function(username, password, successCallback, errorCallback, ctx) {
            AppConfig.log("In UserModel");
            var postBody = {
                "username": username,
                "password": password
            };
            AjaxAPI.makeAjaxRequest("login", null, ctx, successCallback, errorCallback, "POST", postBody);
        },
        logoutUser: function(username, successCallback, errorCallback, ctx) {
            AppConfig.log("Finally in UserModel, loggingout");
            var token = UserModel.responseHeader.token || "4b2891f7-f272-4f1e-a51d";
            var authToken = {
                "token": token
            };
            AjaxAPI.makeAjaxRequest("logout", null, ctx, successCallback, errorCallback, "GET", null, null, null, authToken);
        }
    }
});
