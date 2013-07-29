define(function (require) {
    "use strict";

    var App = require("App");

    return {
        initialize : function () {
            App.LoginRoute = require("login/root/route");
            App.LoginController = require("login/root/controller");
            App.LoginView = require("login/root/view");
        }
    };
});
