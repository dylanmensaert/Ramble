/* jshint maxparams: false */
define([
    "App", "application/root/route", "application/root/controller", "application/root/view"
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
