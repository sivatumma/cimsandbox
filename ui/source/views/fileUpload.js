enyo.kind({
    name: "fileUpload",
    kind: "FittableColumns",
    uploadedFiles: {
        build: ""
    },
    components: [{
        kind: "Signals",
        showOrHideFileUpload: "showOrHideFileUpload",
        locationValue: "locationValue"
    }, {
        kind: "onyx.MenuDecorator",
        classes: "fileUploadDecorator",
        components: [{
            name: "fileUpload",
            classes: "fileUploadIcon",
        }, {
            kind: "onyx.ContextualPopup",
            name: "buildUploadContainer",
            title: "Upload your Build here",
            floating: true,
            components: [{
                classes: "",
                kind: "FittableColumns",
                components: [{
                    name: "fileInputDiv",
                    classes: "file-input-div",
                    components: [{
                        kind: "enyo.FileInputDecorator",
                        name: "buildImage",
                        onSelect: "fileUploaded",
                        buildType: "build",
                        classes: "file-upload-field"
                    }]
                }, {
                    tag: "br"
                }, {
                    classes: "actionItems",
                    components: [{
                        kind: "Button",
                        content: "Submit",
                        classes: "upload-buttons",
                        onclick: "createbuild"
                    }]
                }]
            }]
        }]
    }],
    create: function() {
        this.inherited(arguments);
        console.log(this.$.buildImage);
    },
    rendered: function() {
        enyo.Signals.send("showOrHideFileUpload");
    },
    showOrHideFileUpload: function() {
        this.addClass(JSON.parse(localStorage.currentUserObject).provider === true ? "visible" : "invisible");
    },
    createbuild: function() {
        if (this.uploadedFiles["build"]["length"] === 0) {
            this.$.buildImage.controls[0].controls[0].addStyles("border:1px solid red;");
            return false;
        } else {
            this.buildPopUpValuesValidations();
            var token = 123456;
            var authToken = {
                "token": token
            };
            if (this.uploadedFiles["build"]["length"]) {
                var filebody = this.uploadedFiles["build"][0];
                var formData = new FormData();
                formData.append("file", filebody);
                console.log(JSON.parse(localStorage.currentUserObject).username);
                formData.append("providerName", JSON.parse(localStorage.currentUserObject).username.toUpperCase()); //  Shall use userObject.providerName going forward
                app.showSpinner();
                AjaxAPI.makeAjaxRequest("/upload", null, this, "processMyData", null, "POST", formData, "multipart/form-data", null, authToken);
            }
        }
    },
    processMyData: function(inResponse) {
        var statusMessage = inResponse.xhrResponse.status === 200 ? 'Your build is uploaded Successfully' : 'Problem while uploading, returned HTTP code - ' + xhrResponse.status;
        alert(statusMessage);
        app.hideSpinner();
        this.$.buildUploadContainer.hide();
    },
    fileUploaded: function(inSender, inEvent) {
        this.uploadedFiles[inSender.buildType] = inEvent.files;
    },
    hidePopup: function(inSender, inEvent) {
        this.emptybuildPopUpValues();
        this.buildPopUpValuesValidations();
    },
    buildPopUpValuesValidations: function() {
        this.$.buildImage.controls[0].controls[0].addStyles("border:none;");
    },
    emptybuildPopUpValues: function() {
        this.uploadedFiles.build = "";
        this.uploadedFiles.coupon = "";
    },
    closeCreatebuildPopUp: function() {}
});