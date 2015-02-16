enyo.kind({
    name: "fileUpload",
    classes: "create-offer-popup",
    kind: "FittableColumns",
    uploadedFiles: {
        offer: "",
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
                name: "offerImage",
                onSelect: "fileUploaded",
                imageType: "offer",
                classes: "file-upload-field"
            }]
        }, {
            classes: "actionItems",
            components: [{
                kind: "Button",
                content: "Submit",
                classes: "upload-buttons",
                onclick: "createOffer"
            }]
        }]
    }],
    create: function() {
        this.inherited(arguments);
        console.log(this.$.offerImage);
    },
    createOffer: function() {
        if (this.uploadedFiles["offer"]["length"] === 0) {
            this.$.offerImage.controls[0].controls[0].addStyles("border:1px solid red;");
            return false;
        } else {
            this.OfferPopUpValuesValidations();
            var token = 123456;
            var authToken = {
                "token": token
            };
            if (this.uploadedFiles["offer"]["length"]) {
                var filebody = this.uploadedFiles["offer"][0];
                var formData = new FormData();
                formData.append("file", filebody);
                formData.append("providerName","MQI");
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
        this.uploadedFiles[inSender.imageType] = inEvent.files;
    },
    hidePopup: function(inSender, inEvent) {
        this.emptyOfferPopUpValues();
        this.OfferPopUpValuesValidations();
    },
    OfferPopUpValuesValidations: function() {
        this.$.offerImage.controls[0].controls[0].addStyles("border:none;");
    },
    emptyOfferPopUpValues: function() {
        this.uploadedFiles.offer = "";
        this.uploadedFiles.coupon = "";
    },
    closeCreateOfferPopUp: function() {}
});