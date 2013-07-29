/* jshint browser: true */
define(function (require) {
    //TODO: Put EmberEasyForm, templates and Bootstrap in seperate GUI-init
    "use strict";

    var App = require("App"),
        EmberEasyForm = require("EmberEasyForm");

    require("templates");
    require("Bootstrap");

    return {
        initialize : function () {
            window.App = App;

            require("app/router").initialize();

            require("application/init").initialize();
            require("index/init").initialize();
            require("login/init").initialize();
            require("lobby/init").initialize();
            require("player/init").initialize();

            EmberEasyForm.Config.registerWrapper("default", {
                formClass : "form-horizontal",
                fieldErrorClass : "error",
                errorClass : "help-inline",
                hintClass : "help-block",
                labelClass : "control-label",
                inputClass : "control-group",
                wrapControls : true,
                controlsWrapperClass : "controls"
            });

            App.advanceReadiness();

            //TODO: Is needed to run tests in Phantom.js?
            window.isAppInitialized = true;
        }
    };
});
