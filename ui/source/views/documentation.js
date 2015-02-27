enyo.kind({
    name: 'sandbox.Documentation',
    classes: "documentation",
    components: [{
        content: "Notes",
        classes: "provider",
        ontap: "toggleContent"
    }, {
        name: "Notes",
        kind: "enyo.Drawer",
        classes: "drawer",
        open: true,
        components: [{
            content: "<li>Calls being made to a unified URL (&#10003;)</li><br/><li>The response is colored RED when it is invalid JSON (<span class='invalidJSON'>X</span>)</li><br/><h3>Notes on Release Notes</h3><li>Only CRUD operations are documented so included in this UI for now.</li><br/><li> Notifications are not included in this UI as it is pushed for phase 2</li></li>",
            allowHtml: true
        }]
    }],
    create: function() {
        this.inherited(arguments);
    },
    // names: ['worldsensing', 'MQI'],
    toggleContent: function(inSender, inEvent) {
        this.$[inEvent.originator.content].setOpen(!this.$[inEvent.originator.content].open);
    }
});