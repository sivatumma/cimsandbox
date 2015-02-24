enyo.kind({
    name: "LoginView",
    classes: "loginView",
    events: {
        onAssignUserRole: ""
    },
    components: [{
        classes: "login",
        components: [{
            name: "logo",
            kind: "branding"
        }, {
            name: "alertMessage",
            kind: "enyo.Control",
            content: "Please check your login credentials ",
            classes: "alertMessage"
        }, {
            name: "username",
            kind: "enyo.Input",
            classes: "loginview_input_text",
            placeholder: "Username",
            onkeydown: "handleKeyStroke"
        }, {
            name: "password",
            kind: "enyo.Input",
            classes: "loginview_input_text",
            placeholder: "Password",
            onkeydown: "handleKeyStroke",
            attributes: {
                type: "password"
            }
        }, {
            name: "loginButton",
            kind: "enyo.Button",
            classes: "loginview_input_button",
            content: "Sign In",
            ontap: "submitLoginForm"
        }, {
            name: "registrationButton",
            kind: "enyo.Button",
            classes: "loginview_input_button",
            content: "Register",
            ontap: "showRegistrationForm"
        }]
    }],
    create: function() {
        this.inherited(arguments);
        if (AppConfig.defaultCredentials && AppConfig.debugMode) {
            this.$.username.setValue(AppConfig.defaultCredentials.split("/")[0]);
            this.$.password.setValue(AppConfig.defaultCredentials.split("/")[1]);
        }
    },
    constructor: function() {
        this.inherited(arguments);
    },
    showRegistrationForm:function(){
        enyo.Signals.send("showRegistrationForm",{});
    },
    showSignupForm: function() {
        AppConfig.log("direct to Signup page <or a openid kind >");
    },
    showForgotPasswordForm: function() {
        AppConfig.log("direct to forgotpassword");
    },
    handleKeyStroke: function(inSender, inEvent) {
        this.$.username.addClass("loginview_input_text");
        if (inEvent.keyCode === 13) {
            this.submitLoginForm();
            return true;
        }
    },
    submitLoginForm: function(inSender, inResponse) {
        var username = this.$.username.getValue().toLowerCase();
        var password = this.$.password.getValue();
        if (username === '' || username === 'Username') {
            this.$.username.addStyles("border:1px solid red;");
            this.$.alertMessage.addStyles("visibility:visible;display:block;");
            this.addStyles("height:290px;");
            return false;
        } else if (password === '' || password == 'Username') {
            this.$.password.addStyles("border:1px solid red;");
            this.$.alertMessage.addStyles("visibility:visible; display:block;");
            this.addStyles("height:290px;");
            return false;
        } else {
            this.$.username.addStyles("border:1px solid silver;");
            this.$.password.addStyles("border:1px solid silver;");
            this.$.alertMessage.addStyles("visibility:hidden; display:none;");
            this.addStyles("height:250px;");
            UserModel.loginUser(username, password, this.loginSuccess, this.loginError, this);
        }
    },
    loginSuccess: function(inSender, inResponse) {
        UserModel.userObject = inResponse;
        localStorage.currentUserObject = JSON.stringify(inResponse);
        enyo.Signals.send("reRenderMenuArea", {});
        enyo.Signals.send("loginSuccess", {});
    },
    loginError: function(inSender, inResponse) {
        this.$.alertMessage.setContent("Login Failure : ", inResponse);
        this.$.alertMessage.show();
        this.$.alertMessage.addStyles("visibility:visible; display:block;");
    }
});
enyo.kind({
    name: "branding",
    classes: "branding",
    components: [{
        kind: "Image",
        // src: "assets/cisco-logo-red.png",
        src: window.location.hostname == "localhost" ? "assets/cisco-logo-tm.jpg" : "assets/logo1.png",
        classes: "logo"
    }, {
        content: "CIM Sandbox",
        classes: "heading"
    }, {
        content: "",
        classes: "subHeading"
    }]
});