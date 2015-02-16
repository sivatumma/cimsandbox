/**
    For simple applications, you might define all of your views in this file.  
    For more complex applications, you might choose to separate these kind definitions 
    into multiple files under this folder.
*/
enyo.kind({
    kind: "enyo.Panels",
    name: "sandbox.Views",
    draggable: false,
    components: [{
        kind: "enyo.Signals",
        loginSuccess: "loginSuccess",
        logoutUser:"logoutUser"
    }, {
        name:"LOGIN_VIEW",
        kind: "LoginView"
    }, {
        name:"MAIN_VIEW",
        kind: "MainView"
    }],
    create:function(){
        this.inherited(arguments);
        if(localStorage.loggedIn === "true")
            this.setIndex(1);
    },
    constructor:function(){
        this.inherited(arguments);
    },
    loginSuccess:function(){
        localStorage.loggedIn = true;
        this.setIndex(1);
    },
    logoutUser:function(){
        localStorage.loggedIn = null;
        this.setIndex(0);
        window.location.reload();
    }
});