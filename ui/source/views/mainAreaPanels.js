enyo.kind({
    kind: "enyo.Panels",
    draggable:false,
    name: "MainAreaPanels",
    classes:"fullheight",
    components: [{
        kind: "Signals",
        showHome:"showHome",
        showSystemHealth: "showSystemHealth"
    }, {
        kind: "FittableColumns",
        fit: true,
        components: [{
            classes: "leftMenu",
            name: "leftMenu",
            kind: "FittableRows",
            components: [{
                content: "Provider Services",
                classes: "header"
            }, {
                kind: "sandbox.APITree"
            }]
        }, {
            kind: "enyo.Scroller",
            name: "mainAreaScroller",
            fit: true,
            components: [{
                name: "mainArea",
                kind: "sandbox.APIActions",
                classes: "mainArea",
            }]
        }, {
            name: "documentation",
            classes: "documentation",
            kind: "sandbox.Documentation"
        }]
    }, {
        kind: "HealthMonitorView",
    }],
    create: function() {
    	this.inherited(arguments);
    },
    constructor:function(){
    	this.inherited(arguments);
    },
    showSystemHealth: function() {
        this.setIndex(1);
    },
    showHome:function(){
    	this.setIndex(0);
    }
});