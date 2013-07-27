/* jshint maxparams: false */
define([
    "App", "login/root/route", "login/root/controller", "login/root/view"
], function (App, Route, Controller, View) {
    "use strict";

    return {
        initialize : function () {
            App.LoginRoute = Route;
            App.LoginController = Controller;
            App.LoginView = View;
        }
    };
});
