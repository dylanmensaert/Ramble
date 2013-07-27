/* jshint maxparams: false, maxstatements: false, browser: true */
define([
    "App", "text!root/config.json", "root/router",
    "application/init", "index/init", "login/init", "lobby/init", "player/init",
    "EmberEasyForm", "templates", "Bootstrap"
], function (App, config, Router, Application, Index, Login, Lobby, Player, EmberEasyForm) {
    //TODO: Put EmberEasyForm, templates and Bootstrap in seperate GUI-init
    "use strict";

    return {
        initialize : function () {
            window.App = App;

            App.config = JSON.parse(config);

            Router.initialize();

            Application.initialize();
            Index.initialize();
            Login.initialize();
            Lobby.initialize();
            Player.initialize();

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
