enyo.kind({
    name: "UserEntry",
    kind: "enyo.Panels",
    draggable: false,
    components: [{
        kind: "Signals",
        showLoginForm: "showLoginForm",
        showRegistrationForm: "showRegistrationForm"
    }, {
        kind: "LoginView"
    }, {
        kind: "Scroller",
        components: [{
            kind: "RegistrationView",
        }]
    }],
    showLoginForm: function() {
        this.setIndex(0);
    },
    showRegistrationForm: function() {
        this.setIndex(1);
    }
})