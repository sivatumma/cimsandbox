/*jshint -W087 */ //    For not throwing out debugger statement errors
enyo.kind({
    name: "AppConfig",
    statics: {
        baseURL: "/",
        prodURL: "http://cimsandbox.paradigmit.com/",
        debugURL: "http://cimsandbox.paradigmit.com/",

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
        debug: function() {
            if (AppConfig.debugMode && AppConfig.breakPointsEnabled) {
                debugger;
            }
        },
        debug_: function() {
            //  Use to disable the above functionality for any debug() statements
        },
    create: function() {
        this.inherited(arguments);
        AppConfig.alert("Hellow Vizag");
        if (!window.location.hostname || window.location.hostname.indexOf("localhost") >= 0) {
            AppConfig.baseURL = AppConfig.debugURL;
        }
    }
});