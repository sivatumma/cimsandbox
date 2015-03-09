enyo.kind({
    name: 'sandbox.APITree',
    classes: 'enyo-unselectable apiTree',
    kind: 'FittableRows',
    published: {
        icons: {
            "light": "assets/light_icon.png",
            "parking": "assets/parking.png",
            "kiosk": "assets/kiosk.png",
            "ambience": "assets/ambience.png",
            "traffic": "assets/traffic.png",
            "illumination": "assets/light_icon.png",
            "CRUD": "assets/crud.svg",
            "City Data": "assets/city.png"
        }
    },
    fit: true,
    components: [{
        kind: "Signals",
        reRenderMenuArea: "reRenderMenuArea"
    }, {
        name: "ErrorConditionMessages",
        style: "color:red; font-weight:bold; padding:10px; display:none;"
    }, {
        name: "menuArea",
        classes:"apiTree",
        kind: 'Scroller',
        // touch: true,
        vertical:"scroll",
        fit: true,
        components: []
    }],
    create: function(inSender, inEvent) {
        this.inherited(arguments);
        var that = this;
        var token = {
            token: "4b2891f7-f272-4f1e-a51d"
        };
        AjaxAPI.makeAjaxRequest('/services.json', null, this, this.successHandler, this.errorHandler, "GET", null, "", null, token);
    },
    constuctor: function() {
        this.inherited(arguments);
        localtion.reload();
    },
    nodeExpand: function(inSender, inEvent) {
        // inSender.setIcon('assets/' + (inSender.expanded ? 'layers.png' : 'layers.png'));
    },
    nodeTap: function(inSender, inEvent) {
        var node = inEvent.originator;
        this.$.selection.select(node.id, node);
    },
    select: function(inSender, inEvent) {
        console.log("Came to select event");
        inEvent.data.$.caption.applyStyle('background-color', 'lightblue');
        enyo.Signals.send("selectionUpdate", {
            "selected": inEvent
        });
    },
    deselect: function(inSender, inEvent) {
        inEvent.data.$.caption.applyStyle('background-color', null);
    },
    successHandler: function(inEvent, inResponse) {
        var that = this;
        _.each(inResponse, function(p, index) {
            console.log("Provider : ", index);
            that.traverse(p);
        });
        this.$.menuArea.render();
    },
    reRenderMenuArea: function(inEvent, inResponse) {
        this.successHandler();
        location.reload();
    },
    errorHandler: function(inEvent, inResponse) {
        this.$.ErrorConditionMessages.show();
        this.$.ErrorConditionMessages.setContent("There was some error while parsing the services file. Please notify to siva.tumma@paradigminfotech.com");
    },
    traverse: function(o) {
        var treeComponentJson = {};
        var that = this;
        treeComponentJson.kind = "Node";
        treeComponentJson.endPoint = o.API.endPoint;
        treeComponentJson.content = o.providerName + (o.catalogLink ? " <a href='catalogues/" + o.catalogLink + "' target='_new'>Docs<img src='assets/pdf.png'/></a>" : " <em>(No docs yet)</em>");
        treeComponentJson.allowHtml = true;
        treeComponentJson.name = o.providerName;
        treeComponentJson.catalogLink = o.catalogLink;
        treeComponentJson.icon = 'assets/api-lb.png';
        treeComponentJson.classes = "topLevelTreeItem";
        treeComponentJson.expandable = true; //  (o.providerName == "MQI");
        treeComponentJson.expanded = false; //  (o.providerName == "MQI");
        treeComponentJson.events = {
            onNodeExpand: "doNodeExpand",
            onNodeTap: "doNodeTap"
        };
        treeComponentJson.components = [{
            kind: 'Selection',
            onSelect: 'select',
            onDeselect: 'deselect'
        }];
        _.each(o.API.services, function(service, index) {
            treeComponentJson.components.push({
                icon: that.icons[service.serviceName],
                content: that.capitalize(service.serviceName) + " - Commands",
                classes: "topLevelService",
                topLevelService: true,
                expanded: false,
                expandable: true,
                components: []
            });
            _.each(service.serviceList, function(sl, i) {
                var subComponents = treeComponentJson.components[treeComponentJson.components.length - 1].components;
                var classNames = JSON.parse(localStorage.currentUserObject).roles === sl.access_type || JSON.parse(localStorage.currentUserObject).roles === "crud" ? "visible" : "invisible";
                subComponents.push({
                    icon: sl.icon || "assets/unknown.png",
                    content: sl.requestDescription,
                    classes: "requestDescription attributes",
                    url: sl.url || o.API.endPoint,
                    postBody: sl.postBody,
                    classes: classNames
                });
            });
        });
        console.log(treeComponentJson);
        this.$.menuArea.createComponent(treeComponentJson, {
            owner: this
        });
    },
    capitalize: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});