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
        name:"USER_ENTRY",
        kind: "UserEntry"
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
        enyo.Signals.send("showOrHideFileUpload");
    },
    logoutUser:function(){
        console.log(JSON.parse(localStorage.currentUserObject).username);
        UserModel.logoutUser(JSON.parse(localStorage.currentUserObject).username,this.logoutSuccess, this.logoutError, this);
    },
    logoutSuccess: function(){
        localStorage.loggedIn = null;
        localStorage.currentUserObject = null;
        this.setIndex(0);
        location.reload();
    },
    logoutError:function(){
        console.log("There was an error; could not log out due to token issues; But clearing the cache so to avoid demo obstacles");
        localStorage.loggedIn = null;
        localStorage.currentUserObject = null;
        this.setIndex(0);
        location.reload();
    }
});