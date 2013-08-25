define(function (require) {
    "use strict";

    var EmberEasyForm = require("EmberEasyForm");

    //TODO: Require only the needed Bootstrap-plugins?
    require("Bootstrap");

    return {
        initialize : function () {
            EmberEasyForm.Config.registerWrapper("default", {
                formClass : "",
                fieldErrorClass : "text-danger",
                errorClass : "help-inline",
                hintClass : "help-block",
                labelClass : "",
                inputClass : "form-group",
                wrapControls : false,
                controlsWrapperClass : ""
            });
        }
    };
});
