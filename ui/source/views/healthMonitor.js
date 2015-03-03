enyo.kind({
    name: "HealthMonitorView",
    classes: "healthMonitorView",
    kind: "FittableRows",
    published: {
        amiList: [{
            "name": "Portal Server",
            "ip": "localhost"
        }, {
            "name": "MongoDB",
            "ip": "172.19.1.11"
        }, {
            "name": "MQI",
            "ip": "54.169.200.173"
        }, {
            "name": "EBC",
            "ip": "54.169.115.123"
        }]
    },
    components: [{
        content: "This is a basic view of the System Health.<br/> If you want to have a full understanding of the system, you may want to refer <a href='https://us-west-2.console.aws.amazon.com/console/'>AWS console</a> using your credentials.",
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
            content: "Ping Status"
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
                serverIP: server.ip || "?"
            });
        });
        this.render();
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
        name:"pingStatus",
        content: this.spinnerHtml,
        allowHtml:true,
        ontap:"updatePingStatus"
    }, {
        name:"overallStatus",
        content: ""
    }],
    create: function() {
        this.inherited(arguments);
        this.$.pingStatus.setContent(this.spinnerHtml);
        this.$.serverName.setContent(this.serverName);
        this.$.serverIP.setContent(this.serverIP);
        var postBody = {
            host:this.serverIP
        };
        var token = {
            token: "4b2891f7-f272-4f1e-a51d"
        };
        AjaxAPI.makeAjaxRequest('/ping', null, this, this.pingSuccessHandler, this.pingErrorHandler, "POST", postBody, "", null, token);
    },
    pingSuccessHandler:function(inSender, inResponse){
        this.$.pingStatus.setContent(inResponse.message);
    },
    pingErrorHandler:function(){
        this.$.pingStatus.setContent(inResponse);
    },
    showRefreshIcon:function(){
        this.$.pingStatus.setContent("&#x21bb;");
    },
    showSpinnerHtml:function(){
        this.$.pingStatus.setContent(this.spinnerHtml);
    },
    updatePingStatus:function(){
        this.$.pingStatus.setContent(this.spinnerHtml);
        var postBody = {
            host:this.serverIP
        };
        var token = {
            token: "4b2891f7-f272-4f1e-a51d"
        };
        AjaxAPI.makeAjaxRequest('/ping', null, this, this.pingSuccessHandler, this.pingErrorHandler, "POST", postBody, "", null, token);
    }
})