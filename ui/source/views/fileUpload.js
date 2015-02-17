enyo.kind({
    name: "fileUpload",
    kind: "FittableColumns",
    uploadedFiles: {
        build: "",
        coupon: ""
    },
    components: [{
        kind: "Signals",
        locationValue: "locationValue"
    }, {
        classes: "",
        kind: "FittableColumns",
        components: [{
            content: "Upload your Build here",
            classes: "justify"
        }, {
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
            classes: "actionItems",
            components: [{
                kind: "Button",
                content: "Submit",
                classes: "upload-buttons",
                onclick: "createbuild"
            }]
        }]
    }],
    create: function() {
        this.inherited(arguments);
        console.log(this.$.buildImage);
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
                console.log(UserModel.userObject);
                formData.append("providerName",UserModel.userObject.username.toUpperCase());  //  Shall use userObject.providerName going forward
                app.showSpinner();
                AjaxAPI.makeAjaxRequest("/upload", null, this, "processMyData", null, "POST", formData, "multipart/form-data", null, authToken);
            }
        }
    },
    processMyData: function(inResponse) {
        var statusMessage = inResponse.xhrResponse.status === 200 ? 'Your build is uploaded Successfully' : 'Problem while uploading, returned HTTP code - ' + xhrResponse.status;
        alert(statusMessage);
        app.hideSpinner();
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