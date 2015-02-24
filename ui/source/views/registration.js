enyo.kind({
    name: "RegistrationView",
    classes: "registration",
    published:{
        username:'',
        password:''
    },
    components: [{
            kind: "branding"
        },
        {
            name: "heading",
            classes: "heading"
        }, 
        {
            name: "alertMessgae",
            style: "display:none; font-size:80%;color: #0096d6; margin-bottom:10px; width:95%;"
        }, {
            name: "email",
            kind: "enyo.Input",
            content: "",
            placeholder: "Username or Email"
        }, {
            name: "password",
            kind: "enyo.Input",
            content: "",
            placeholder: "Password",
            attributes: {
                type: "password"
            }
        }, {
            name: "age",
            kind: "enyo.Input",
            content: "",
            placeholder: "Age",
            onkeyup:"ageValidator"
        }, {
            name: "gender",
            kind: "Select",
            classes: "genderSelect",
            style: "display:block;",
            content: "",
            onchange: "selectChanged",
            components: [{
                    content: "Sex",
                    value: "0",
                    classes: "left"
                }, {
                    content: "Male",
                    value: "male"
                }, {
                    content: "Female",
                    value: "female"
                },
                // {content: "Other", value: "O"},
            ]
        }, {
            name: "termsCheckbox",
            kind: "enyo.Checkbox",
            classes: "inline termsCheckbox"
        }, {
            classes: "termsAgreement inline",
            components: [{
                content: "I agree to the ",
                classes: "termsAgreement inline",
            }, {
                content: "Terms of Use.",
                classes: "inline link",
                ontap: "showTerms",
            }]
        }, {
            kind: "Button",
            classes: "clsappRegistrationSubmitButton",
            content: "Register",
            ontap: "handleFormSubmission"
        }, {
            tag: "a",
            content: "Log In",
            ontap: "showLoginScreen",
            classes: "inline anchor"
        }],
    create:function(inSender, inEvent){
        this.inherited(arguments);
        if (UserModel.userObject.loggedIn){
             new cls.MainView().renderInto(document.body);
        }
    },
    isNumberKey: function(inEvent, inObject) {
        var charCode = (inEvent.which) ? inEvent.which : inEvent.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

        return true;
    },
    ageValidator:function(inSender, inEvent){
        if(inEvent.keyCode>47 && inEvent.keyCode<58){
            // if(isNaN(parseInt(inSender.value))){
            //     this.$.alertMessgae.show();
            //     this.$.alertMessgae.setContent("Please enter your age. Numbers Please !");
            // }
            // else{
                this.$.alertMessgae.hide();
                return true;
            // }
        }
        else if(inEvent.keyCode===8){
            var charCodeForLastChar=inSender.value.charCodeAt(inSender.value.length-1);;
            if(charCodeForLastChar>47 && charCodeForLastChar<58){
                this.$.alertMessgae.hide();
                return true;
            }
            else{
                this.$.alertMessgae.show();
                this.$.alertMessgae.setContent("Please enter your age. Numbers Please !");
                return true;
            }
        }
        else{
            this.$.alertMessgae.show();
            this.$.alertMessgae.setContent("Please enter your age. Numbers Please !");
            return true;
        }
    },
    // doRegistrationViaFacebook:function(){
    //     var that = this;
    //     FB.getLoginStatus(function(response) {
    //      that.statusChangeCallback(response);
    //  });
    // },
    registrationSuccess: function(response) {
        this.$.alertMessgae.show();
        localStorage.setItem("registrationComplete", true);
        this.$.alertMessgae.setContent("Success. Automatically logging you in...");
        AnalyticsLogger.logAnalyticsData({
            event: "registrationSuccess"
        });
        enyo.Signals.send("loginFromRegistration",{"username":this.username, "password":this.password});
    },
    registrationError: function(response) {
        var responseText = response.xhrResponse.body;
        if (responseText == 'MAC address missing in body.'){
            this.$.alertMessgae.show();
            this.$.alertMessgae.setContent(responseText);
        }else{
            this.$.alertMessgae.show();
            this.$.alertMessgae.setContent(responseText);
        }
    },
    // statusChangeCallback: function(response) {
    //     var that = this;
    //     if (response.status === 'connected') {
    //         FB.api('/me', function(response) {
    //             var params = {
    //                 "username": response.id,
    //                 "email": response.email,
    //                 "password": response.password || 'testing',
    //                 "age": response.age,
    //                 "sex": response.sex,
    //                 "gender": response.gender,
    //                 "provider": 'facebook'
    //             };
    //             UserModel.registerUser(params, that.registrationSuccess, that.registrationError, that);
    //         });
    //     } else if (response.status === 'not_authorized') {
    //         // The person is logged into Facebook, but not your app.
    //         FB.login(function(response) {
    //             if (response.authResponse) {
    //                 FB.api('/me', function(response) {
    //                     var params = {
    //                         "username": response.id,
    //                         "email": response.email,
    //                         "password": response.password || 'testing',
    //                         "sex": response.sex,
    //                         "age": response.age,
    //                         "gender": response.gender,
    //                         "provider": 'facebook'
    //                     };
    //                     UserModel.registerUser(params, that.registrationSuccess, that.registrationError, that);
    //                 });
    //             } else {
    //                 this.$.alertMessgae.setContent("You have cancelled the facebook registration process");
    //                 this.$.alertMessgae.show();
    //             }
    //         }, {
    //             scope: 'public_profile,email,user_likes,publish_actions',
    //             return_scopes: true
    //         });

    //     } else {
    //         FB.login(function(response) {
    //             if (response.authResponse) {
    //                 FB.api('/me', function(response) {
    //                     var params = {
    //                         "username": response.id,
    //                         "email": response.email,
    //                         "password": response.password || 'testing',
    //                         "sex": response.sex,
    //                         "age": response.age,
    //                         "gender": response.gender,
    //                         "provider": 'facebook'
    //                     };
    //                     UserModel.registerUser(params, that.registrationSuccess, that.registrationError, that);
    //                 });

    //             } else {
    //                 this.$.alertMessgae.setContent("You have cancelled the facebook registration process");
    //                 this.$.alertMessgae.show();
    //             }
    //         }, {
    //             scope: 'email',
    //             return_scopes: true
    //         });
    //     }
    // },
    handleFormSubmission: function() {
        var email = this.$.email.getValue();    //  .toLowerCase();
        this.username = email;
        var password = this.$.password.getValue();
        this.password = password;
        var age = this.$.age.getValue();
        var gender = this.$.gender.getValue();
        var terms = this.$.termsCheckbox.getValue();

        if (email == '' || email == 'Email') {
            this.$.email.addStyles("border:1px solid red;");
            this.$.email.focus();
            this.$.alertMessgae.show();
            this.$.alertMessgae.setContent("We require a username or email of you to register");
            return false;
        } else if (password == '' || password == 'Username') {
            this.$.password.addStyles("border:1px solid red;");
            this.$.alertMessgae.show();
            this.$.alertMessgae.setContent("Please enter a memorable password for yourself");
            return false;
        } else if (age == '' || age == 'Age' ) {
            this.$.age.addStyles("border:1px solid red;");
            this.$.alertMessgae.show();
            this.$.alertMessgae.setContent("Please enter your age. Numbers Please !");
            return false;
        } else if (gender == '' || gender == 0) {
            this.$.gender.addStyles("border:1px solid red;");
            this.$.alertMessgae.show();
            this.$.alertMessgae.setContent("We require your gender too");
            return false;
        } else if (terms == false) {
            this.$.alertMessgae.show();
            this.$.alertMessgae.setContent("Please agree our small terms");
            return false;
        } else {
            this.$.email.addStyles("border:1px solid silver;");
            this.$.password.addStyles("border:1px solid silver;");
            this.$.age.addStyles("border:1px solid silver;");
            this.$.gender.addStyles("border:1px solid silver;");
            this.$.alertMessgae.hide();

            var params = {
                "username": email, //  Normal username or an email as a username
                "password": password,
                "age": age,
                "sex": gender,
                "gender": gender,
                "provider": 'web'
            };
            UserModel.registerUser(params, this.registrationSuccess, this.registrationError, this);
        }
        // var cryptedMessage = CryptoJS.SHA3(username + password);

    },

    showLoginScreen: function(inSender, inEvent) {
        enyo.Signals.send("showLoginScreen", {});
    },
    showTerms: function(inSender, inEvent) {
        this.$.termsOfUsePopup.show();
    }
});

//  Face book logo along with our customized text
// enyo.kind({
//     name: "signupUsingFacebookButton",
//     classes: "signupUsingFacebookButton",
//     kind: "Button",
//     components: [{
//         tag: "i",
//         classes: "inline fa fa-facebook"
//     }, {
//         content: "Sign up using Facebook",
//         classes: "inline flogotext subHeading"
//     }]
// });
