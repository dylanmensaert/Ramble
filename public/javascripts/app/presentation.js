define(function (require) {
    "use strict";

    var Ember = require("Ember"),
        EmberEasyForm = require("EmberEasyForm");

    //TODO: Require only the needed Bootstrap-plugins?
    require("Bootstrap");

    return {
        initialize: function () {
            Ember.TextSupport.reopen({
                classNames: ["form-control"]
            });

            Ember.FocussedTextField = Ember.TextField.extend({
                attributeBindings: ["autofocus"],
                autofocus: "autofocus"
            });

            Ember.EasyForm.Config.registerInputType("focus_input", Ember.FocussedTextField);

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
