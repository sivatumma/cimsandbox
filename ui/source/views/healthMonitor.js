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
    components: [{content:"This is a basic view of the System Health. Please look at AWS console for fuller understanding of the system.", classes:"healthMonitorInfo"},{
        kind: "FittableColumns",
        classes:"healthMonitorHeaderBar",
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
    serverIP:"",
    components: [{
    	name:"serverIP",
        content: ""
    }, {
        name: "serverName",
        content: "Server Name"
    }, {
        content: ""
    }, {
        content: ""
    }],
    create: function() {
        this.inherited(arguments);
        this.$.serverName.setContent(this.serverName);
        this.$.serverIP.setContent(this.serverIP);
    }
})