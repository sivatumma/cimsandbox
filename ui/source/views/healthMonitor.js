enyo.kind({
    name: "HealthMonitorView",
    classes: "healthMonitorView",
    kind: "FittableRows",
    published: {
        amiList: [{
            "name": "Portal Server",
            "ip": ""
        }, {
            "name": "MongoDB",
            "ip": "172.19.1.11"
        }, {
            "name": "MQI",
            "ip": ""
        }, {
            "name": "EBC",
            "ip": ""
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
    },
});
enyo.kind({
    kind: "FittableColumns",
    name: "OneAMIStatus",
    classes: "OneAMIStatus",
    serverName: "",
    serverIP: "",
    components: [{
        name: "serverIP",
        content: ""
    }, {
        name: "serverName",
        content: "Server Name"
    }, {
        name:"pingStatus",
        content: "<img src='assets/spinner-tiny.gif'/>",
        allowHtml:true
    }, {
        name:"overallStatus",
        content: ""
    }],
    create: function() {
        this.inherited(arguments);
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
    }
})