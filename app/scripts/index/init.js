define([
    "App", "index/root/route", "index/root/controller", "index/root/view"
], function (App, Route, Controller, View) {
    "use strict";

    return {
        initialize : function () {
            App.IndexRoute = Route;
            App.IndexController = Controller;
            App.IndexView = View;
        }
    };
});
