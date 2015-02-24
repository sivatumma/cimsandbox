enyo.kind({
    name: "RegistrationView",
    classes: "registration",
    components: [{
        kind: "branding"
    }, {
        name: "alertMessage",
        classes: "alertMessage",
    }, {
        name: "username",
        kind: "enyo.Input",
        classes: "loginview_input_text",
        placeholder: "Choose a Username"
    }, {
        name: "password",
        kind: "enyo.Input",
        classes: "loginview_input_text",
        placeholder: "Password",
        attributes: {
            type: "password"
        }
    }, {
        name: "email",
        kind: "enyo.Input",
        classes: "loginview_input_text",
        placeholder: "Email",
    }, {
        name: "termsCheckbox",
        // kind: "Checkbox",
        classes: "termsCheckbox"
    }, {
        // content: "We refer and agree for the terms",
    }, {
        kind: "Button",
        classes: "loginview_input_button",
        content: "Register",
        ontap: "handleFormSubmission"
    }, {
        tag: "a",
        content: "Log In",
        ontap: "showLoginForm",
        classes: "anchor"
    }],
    create: function(inSender, inEvent) {
        this.inherited(arguments);
    },
    isNumberKey: function(inEvent, inObject) {
        var charCode = (inEvent.which) ? inEvent.which : inEvent.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) return false;
        return true;
    },
    handleFormSubmission: function() {
        var username = this.$.username.getValue(); //  .toLowerCase();
        this.username = username;
        var password = this.$.password.getValue();
        this.password = password;
        var email = this.$.email.getValue();
        this.email = email;
        // var terms = this.$.termsCheckbox.getValue();
        if (username == '' || username == 'Choose a Username') {
            this.$.username.addStyles("border:1px solid red;");
            this.$.username.focus();
            this.$.alertMessage.setContent("Please choose a username");
            return false;
        } else if (password == '' || password == 'Username') {
            this.$.password.addStyles("border:1px solid red;");
            this.$.alertMessage.show();
            this.$.alertMessage.setContent("Please enter a password");
            return false;
        } else if (email == '' || email == 'Email') {
            this.$.email.addStyles("border:1px solid red;");
            this.$.email.focus();
            this.$.alertMessage.show();
            this.$.alertMessage.setContent("We require email for communicating status");
            return false;
        } 
        // else if (terms == false) {
            // this.$.alertMessage.show();
            // this.$.alertMessage.setContent("Please agree the terms");
            // return false;
        // } 
        else {
            this.$.username.addStyles("border:1px solid silver;");
            this.$.email.addStyles("border:1px solid silver;");
            this.$.password.addStyles("border:1px solid silver;");
            this.$.alertMessage.setContent("Please Wait...");
            var params = {
                "username": username,
                "password": password,
                "email": email,
                "age": 30 || null,
                "sex": "Male" || null,
                "gender": "Male" || null,
                "provider": false
            };
            UserModel.registerUser(params, this.registrationSuccess, this.registrationError, this);
        }
    },
    showLoginForm: function(inSender, inEvent) {
        enyo.Signals.send("showLoginForm", {});
    },
    registrationSuccess: function(response) {
        console.log("Thank you. We will review and keep you posted of the status. Until then, Please use user/user@cisco123 for a restricted access");
        // this.$.alertMessage.setContent("Thank you. You will recieve a mail once approved.");
        if (window.confirm('Thank you. We will review and keep you posted of the status. Until then, Please use user/user@cisco123 for a restricted access'), "Thank you") {
            enyo.Signals.send("showLoginForm", {
                "username": "user",
                "password": "user@cisco123"
            });
        } else {
            enyo.Signals.send("showLoginForm",{});
        }
    },
    registrationError: function(inSender, inResponse) {
        console.log("inside registration error");
        this.$.alertMessage.show();
        this.$.alertMessage.setContent("There was an error while registering");
    },
    authorizeUser: function(params, successCallback, errorCallback, ctx) {
        AjaxAPI.makeAjaxRequest("mobile-app/authorize", null, ctx, successCallback, errorCallback, "POST", postBody);
    }
});