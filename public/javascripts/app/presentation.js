define(function (require) {
    "use strict";

    var Ember = require("ember"),
        EmberEasyForm = require("ember-easyform");

    //TODO: Require only the needed Bootstrap-plugins?
    require("bootstrap");

    return {
        initialize: function () {
            Ember.TextSupport.reopen({
                classNames: ["form-control"]
            });

            Ember.FocussedTextField = Ember.TextField.extend({
                attributeBindings: ["autofocus"],
                autofocus: "autofocus"
            });

            EmberEasyForm.Config.registerInputType("focussed_textfield", Ember.FocussedTextField);

            EmberEasyForm.Config.registerWrapper("default", {
                formClass: "",
                fieldErrorClass: "has-error",
                inputClass: "form-group",
                errorClass: "help-block",
                hintClass: "help-block",
                labelClass: "control-label",
                wrapControls: false,
                controlsWrapperClass: ""
            });
        }
    };
});
