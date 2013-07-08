define([
    "App",
    "signup/root/route", "signup/root/controller", "signup/root/view"
], function (App, Route, Controller, View) {
    "use strict";

    return {
        initialize : function () {
            App.SignupRoute = Route;
            App.SignupController = Controller;
            App.SignupView = View;
        }
    };
});
