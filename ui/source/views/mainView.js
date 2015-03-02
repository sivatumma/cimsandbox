/**
    For simple applications, you might define all of your views in this file.  
    For more complex applications, you might choose to separate these kind definitions 
    into multiple files under this folder.
*/
enyo.kind({
    kind: "FittableRows",
    name: "MainView",
    fit: true,
    components: [{
        kind: "onyx.Toolbar",
        classes: "topToolbar",
        components: [{
            kind: "FittableColumns",
            layoutKind: "FittableColumnsLayout",
            classes: "fullwidth",
            components: [{
                kind: "onyx.Button",
                classes: "logoutButton",
                content: "Logout",
                ontap: "logout"
            },{
                kind: "onyx.Button",
                classes: "logoutButton",
                content: "Logout",
                ontap: "logout"
            }, {
                name: "uploadFile",
                kind: "fileUpload",
                content: "Upload to S3",
                style:"float:right;"
            }, {
                content: "CIM Sandbox",
            }, {
                name: "logo",
                fit:true,
                classes: "toolbarlogo"
            }]
        }]
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
            fit: true,
            components: [{
                name: "mainArea",
                kind: "sandbox.APIActions",
                classes: "mainArea",
            }]
        }, {
            name: "documentation",
            classes:"documentation",
            components: [{
                kind: "sandbox.Documentation"
            }]
        }]
    }
    // , {
    //     kind: "onyx.Toolbar",
    //     classes: "bottomToolbar",
    //     components: [
    //         {
    //                     kind: "Input",
    //                     name: "feedBackText"
    //                 }, 
    //         {
    //             kind: "sandbox.BugReportKind",
    //             classes: "cisco-theme",
    //             content: "Report Bug",
    //             ontap: "updateFeedback"
    //         }
    //     ]
    // }
    ],
    create: function() {
        this.inherited(arguments);
    },
    constructor: function() {
        this.inherited(arguments);
    },
    logout: function() {
        enyo.Signals.send("logoutUser", {});
    },
    updateFeedback: function(inSender, inEvent) {
        var link = "mailto:siva.tumma@paradigmcreatives.com" + "?cc=ram@paradigmcreatives.com" + "&subject=" + escape("Please add these suggestions in Sandbox UI") + "&body=" + escape(this.$.feedBackText.value);
        window.location.href = link;
        this.$.feedbackArea.addContent("Feedback posted. Thankyou<br/>");
    }
});