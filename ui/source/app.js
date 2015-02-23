/**
	Define and instantiate your enyo.Application kind in this file.  Note,
	application rendering should be deferred until DOM is ready by wrapping
	it in a call to enyo.ready().
*/
enyo.kind({
    name: "sandbox.Application",
    kind: "enyo.Application",
    view: "sandbox.Views",
    published: {
        currentView: "",
        viewstack: 0,
        currentUser: null,
        currentLocation: null,
        viewTranistioning: false // try to prevent quick taps causing a problem
    },
    components: [{
        kind: "Signals",
    }],
    create: function() {
        this.inherited(arguments);
        this.appStatus = {};
        this.viewstack = [];
        this.setViewDirect("HOME");
    },
    getUserObject: function(){
        console.log(UserModel.userObject);
    },
    currentViewChanged: function(inOldValue) {
        if (this.currentView !== inOldValue) {
            switch (this.currentView) {
                default: break;
            }
        }
    },
    setViewDirect: function(viewName) {
        this.viewstack = []; // reset the stack
        AppConfig.log("setViewDirect", viewName);
        this.pushView(viewName);
    },
    pushView: function(viewName) {
        if (viewName) {
            // use when you want to return from a view
            if (!this.viewTranistioning && (viewName != this.currentView)) {
                this.viewstack.push(viewName);
                this.viewTranistioning = true;
                this.setCurrentView(viewName);
            }
        }
    },
    popView: function() {
        var previousView = this.viewstack.pop();
        var newView = this.viewstack.length ? this.viewstack[this.viewstack.length - 1] : "";
        if (!this.viewTranistioning && newView) {
            this.viewTranistioning = true;
            this.setCurrentView(newView);
            AppConfig.log("Popped:" + previousView + ", setting view to:" + newView, this.viewstack);
        } else {
            this.setViewDirect("HOME");
        }
    },
    showSpinner: function(){
        enyo.Signals.send("showSpinner",{});
    },
    hideSpinner: function(){
        enyo.Signals.send("hideSpinner",{});
    }
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

enyo.ready(function() {
    new sandbox.Application({
        name: "app"
    });
});