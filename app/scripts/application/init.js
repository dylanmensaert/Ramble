define([
    "App",
    "application/main/route", "application/main/controller", "application/main/view"
], function (App, Route, Controller, View) {
    "use strict";

    return {
        initialize : function () {
            App.ApplicationRoute = Route;
            App.ApplicationController = Controller;
            App.ApplicationView = View;
        }
    };
});
