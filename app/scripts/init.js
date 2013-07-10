define([
    "App", "text!data/config.json", "text!data/data.json", "root/router",
    "application/init", "index/init", "login/init", "signup/init", "lobby/init", "player/init",
    "Bootstrap", "EmberEasyForm", "EmberValidations"
], function (App, config, data, Router, Application, Index, Login, Signup, Lobby, Player) {
    "use strict";

    return {
        initialize : function () {
            App.config = JSON.parse(config);
            App.data = JSON.parse(data);

            Router.initialize();

            Application.initialize();
            Index.initialize();
            Login.initialize();
            Signup.initialize();
            Lobby.initialize();
            Player.initialize();

            Ember.EasyForm.Config.registerWrapper("default", {
                formClass: "form-horizontal",
                fieldErrorClass: "error",
                errorClass: "help-inline",
                hintClass: "help-block",
                labelClass: "control-label",
                inputClass: "control-group",
                wrapControls: true,
                controlsWrapperClass: "controls"
            });

            App.advanceReadiness();
        }
    };
});
