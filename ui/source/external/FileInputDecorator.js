/**
  Allows for improved customizable file input, with support for filetype
  filters, multiple file selection, html5 media capture across a wide breadth
  of browsers.
  
  You can wrap this component around other controls to let taps on them trigger the file input.
  If no inner components are specified, a generic button is used.
  
  Note: filetype filters, multiple file support, and media capture not supported in IE.
*/

enyo.kind({
    name: "enyo.FileInputDecorator",
    published: {
        //* File browser mode: either _"file"_, _"audio"_, _"image"_, or _"video"_.
        type: "file",
        //* Mimetype to filter files for. Confirmed not to work well with IE and Firefox.
        mime: undefined,
        //* Whether to create new files via camera/microphone/camcorder. Only works on mobile devices.
        capture: false,
        //* Whether to input multiple files. Does not work in IE and many mobile browsers
        multiple: false,
        //* Any name attribute you may want to specify
        inputName: undefined,
        //* Disabled or not
        disabled: false
    },
    events: {
        /**
      Triggered when one or more files are selected.
      Event data includes the _"value"_ property which is the standard input value property,
      as well as _"files"_, which is the FileList object (for browsers that support it)
    */
        onSelect: ""
    },
    //* @protected
    tag: "span",
    handlers: {
        ontap: "browse"
    },
    components: [{
            kind: "Signals",
            showFileInputPopup: "browse"
        },

        {
            components: [{
                name: "fileInput",
                kind: "enyo.Input",
                type: "file",
                accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,.war,.ear,.jar,.tar,.zip,.tar.gz",
                onchange: "filesSelected",
                classes: "ff_upload"
            }]
        }, {
            name: "client",
            tag: "span"
        },
    ],
    // defaultClient: [
    //   {kind: (window["onyx"] ? "onyx.Button" : "enyo.Button"), content:"Choose file..."}
    // ],
    create: function() {
        this.inherited(arguments);
        // if(!this.$.client.children || this.$.client.children.length==0) {
        //   this.$.client.createComponents(this.defaultClient);
        // }
        this.updateFileInputAttr();
        this.disabledChanged();
    },
    updateFileInputAttr: function() {
        if (!this.mime) {
            if (this.type == "audio") {
                this.$.fileInput.setAttribute("accept", "audio/*");
                if (this.capture) {
                    this.$.fileInput.setAttribute("capture", "microphone");
                } else {
                    this.$.fileInput.setAttribute("capture", "filesystem");
                }
            } else if (this.type == "image") {
                this.$.fileInput.setAttribute("accept", "image/*");
                if (this.capture) {
                    this.$.fileInput.setAttribute("capture", "camera");
                } else {
                    this.$.fileInput.setAttribute("capture", "filesystem");
                }
            } else if (this.type == "video") {
                this.$.fileInput.setAttribute("accept", "video/*");
                if (this.capture) {
                    this.$.fileInput.setAttribute("capture", "camcorder");
                } else {
                    this.$.fileInput.setAttribute("capture", "filesystem");
                }
            } else {
                this.$.fileInput.setAttribute("accept", "*/*");
                this.$.fileInput.setAttribute("capture", "filesystem");
            }
        } else {
            this.$.fileInput.setAttribute("accept", this.mime);
            this.$.fileInput.setAttribute("capture", "filesystem");
        }
        if (this.multiple) {
            this.$.fileInput.setAttribute("multiple", "multiple");
        } else {
            this.$.fileInput.setAttribute("multiple", null);
        }
        if (this.inputName) {
            this.$.fileInput.setAttribute("name", this.inputName);
        } else {
            this.$.fileInput.setAttribute("name", null);
        }
    },
    typeChanged: function() {
        this.updateFileInputAttr();
    },
    captureChanged: function() {
        this.updateFileInputAttr();
    },
    multipleChanged: function() {
        this.updateFileInputAttr();
    },
    inputNameChanged: function() {
        this.updateFileInputAttr();
    },
    disabledChanged: function() {
        this.$.fileInput.setDisabled(this.disabled);
    },
    //* @public
    //* Trigger the file input browser. This function is called automatically when tapped on.
    // browse: function() {
    //     var node = this.$.fileInput.hasNode();
    //     if (node) {
    //         node.click();
    //     }
    // },
    //* @protected
    filesSelected: function(inSender, inEvent) {
        var filename = inEvent.target.files[0].name;
        var ext = filename.match(/\.([^\.]+)$/)[1];

        // for now checking extension. Let us also check with type that is visible in inEvent.files[index] later
        switch(ext)
        {
            case 'jar':
            case 'war':
            case 'ear':
            case 'zip':
            case 'tar':
            case 'gz':
                this.doSelect({
                    files: inEvent.target.files
                });
                break;
            default:
                alert('not allowed');
                this.value='';
                console.log(inSender);
                return false;
        }
        // this.bubble("onFileUploaded", {files: inEvent.target.files});
    }
});
