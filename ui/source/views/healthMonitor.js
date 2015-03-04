enyo.kind({
    name: "HealthMonitorView",
    classes: "healthMonitorView",
    kind: "FittableRows",
    published: {
        amiList: [{
            "name": "Portal Server",
            "ip": "localhost",
            "buildPingURL":"localhost"
        }, {
            "name": "MongoDB",
            "ip": "172.19.1.11",
            "buildPingURL":"172.19.1.11"
        }, {
            "name": "MQI",
            "ip": "54.169.200.173",
            "buildPingURL":"http://54.169.200.173:8080"
        }, {
            "name": "EBC",
            "ip": "54.169.115.123",
            "buildPingURL":"http://54.169.115.123:8080"
        }]
    },
    components: [{
        content: "This is a basic view of the System Health.<br/> If you want to have a full understanding of the system, you may want to refer <a href='https://us-west-2.console.aws.amazon.com/console/'>AWS console</a> using your credentials.<br/> ",
        allowHtml: true,
        classes: "healthMonitorInfo"
    }, {
        kind: "FittableColumns",
        classes: "healthMonitorHeaderBar",
        components: [{
            content: "Host"
        }, {
            content: "Logical Name of the host"
        }, {
            content: "Ping Status <br/>(Machine)",
            allowHtml: true
        }, {
            content: "App Status <br/>(post request)",
            allowHtml: true
        }, {
            content: "Overall Status"
        }]
    }],
    create: function() {
        this.inherited(arguments);
        var that = this;
        _.each(this.amiList, function(server, index) {
            that.createComponent({
                kind: "OneAMIStatus",
                serverName: server.name || "?",
                serverIP: server.ip || "?",
                buildPingURL: server.buildPingURL
            });
        });
        // this.createComponent({
        //     kind: "enyo.Button",
        //     classes: "inline",
        //     content: "RAW_AWS_STATS",
        //     ontap: "showRawAwsStats"
        // });
        this.render();
    },
    showRawAwsStats: function() {
        enyo.Signals.send("showRawAwsStats", {});
    }
});
enyo.kind({
    kind: "FittableColumns",
    name: "OneAMIStatus",
    classes: "OneAMIStatus",
    serverName: "",
    serverIP: "",
    spinnerHtml: "<img src='assets/spinner-tiny.gif'/>",
    components: [{
        name: "serverIP",
        content: ""
    }, {
        name: "serverName",
        content: "Server Name"
    }, {
        name: "pingStatus",
        content: this.spinnerHtml,
        allowHtml: true,
        ontap: "updatePingStatus"
    }, {
        name: "buildPingStatus",
        content: this.spinnerHtml,
        allowHtml: true,
        ontap: "updateBuildPingStatus"
    }, {
        name: "overallStatus",
        content: ""
    }],
    create: function() {
        this.inherited(arguments);
        this.$.pingStatus.setContent(this.spinnerHtml);
        this.$.buildPingStatus.setContent(this.spinnerHtml);
        this.$.serverName.setContent(this.serverName);
        this.$.serverIP.setContent(this.serverIP === "localhost" ? "Sandbox Root Host" : this.serverIP);
        var postBody = {
            host: this.serverIP
        };
        var token = {
            token: "4b2891f7-f272-4f1e-a51d"
        };
        AjaxAPI.makeAjaxRequest('/ping', null, this, this.pingSuccessHandler, this.pingErrorHandler, "POST", postBody, "", null, token);
    },
    rendered:function(){
        this.inherited(arguments);
        AjaxAPI.makeAjaxRequest("/api/proxy?url=" + this.buildPingURL, null, this, this.buildPingCallback, this.buildPingCallback, "POST", null, null, null, token);
    }
    pingSuccessHandler: function(inSender, inResponse, invalidJSON) {
        this.$.pingStatus.setContent(inResponse.message);
    },
    pingErrorHandler: function() {
        this.$.pingStatus.setContent(inResponse);
    },
    showRefreshIcon: function() {
        this.$.pingStatus.setContent("&#x21bb;");
    },
    showSpinnerHtml: function() {
        this.$.pingStatus.setContent(this.spinnerHtml);
    },
    buildPingCallback:function(inSender, inResponse, invalidJSON){
        this.$.buildPingStatus.setContent(inResponse);
    },
    updateBuildPingStatus:function(){
        AjaxAPI.makeAjaxRequest("/api/proxy?url=" + this.buildPingURL, null, this, this.buildPingCallback, this.buildPingCallback, "POST", null, null, null, null);
    },
    updatePingStatus: function() {
        this.$.pingStatus.setContent(this.spinnerHtml);
        var postBody = {
            host: this.serverIP
        };
        var token = {
            token: "4b2891f7-f272-4f1e-a51d"
        };
        AjaxAPI.makeAjaxRequest('/ping', null, this, this.pingSuccessHandler, this.pingErrorHandler, "POST", postBody, "", null, token);
    }
});
enyo.kind({
    name: "RAW_AWS_STATS",
    classes: "RAW_AWS_STATS",
    components: [{
        tag: "pre",
        name: "rawAwsStatsDisplay",
        content: "<img src='assets/spinner-rotate.gif'/>",
        allowHtml: true
    }],
    create: function() {
        this.inherited(arguments);
    },
    constructor: function() {
        this.inherited(arguments);
        // this.updateRawAwsStats();
    },
    awsStatsSuccessHandler: function(inSender, inResponse, invalidJSON) {
        this.$.rawAwsStatsDisplay.setContent(inResponse);
    },
    awsStatsFailureHandler: function(inSender, inResponse, invalidJSON) {
        this.$.rawAwsStatsDisplay.setContent(inResponse);
    },
    updateRawAwsStats: function() {
        var postBody = {
            command: "mon-list-metrics"
        };
        var token = {
            token: "4b2891f7-f272-4f1e-a51d"
        };
        AjaxAPI.makeAjaxRequest('/awsStats', null, this, this.awsStatsSuccessHandler, this.awsStatsFailureHandler, "POST", postBody, "", null, token);
    }
});