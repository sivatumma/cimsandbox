enyo.kind({
    name: "sandbox.BugReportKind",
    components: [{
        kind: "onyx.MenuDecorator",
        components: [{
            name: "bugReportButton",
            kind: "Button",
            disabled:true,
            classes: "bugReportButton",
            content: "Request a feature or Report a bug"
        }, {
            kind: "onyx.ContextualPopup",
            name: "bugReportContainer",
            title: "Report a bug or Request a new feature",
            floating: true,
            components: [{kind:"TextArea", classes:"onyx-textarea"},{
                classes: "onyx-contextual-popup-action-buttons",
                components: [{
                    content: "Cancel",
                    kind: "Button",
                    classes:"onyx-contextual-popup-action-button-cancel",
                    ontap: "closeThisPopup"
                }, {
                    content: "Done",
                    kind: "Button",
                    classes:"onyx-contextual-popup-action-button",
                    ontap: "sendEmail"
                }]
            }]
        }]
    }],
    create: function() {
        this.inherited(arguments);
    },
    sendEmail: function() {
        // Send an email with all the content and close this 
        this.$.bugReportContainer.hide();
    },
    closeThisPopup: function() {
        this.$.bugReportContainer.hide();
    }
});