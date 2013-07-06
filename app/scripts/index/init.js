define([
    "App",
    "index/main/route", "index/main/controller", "index/main/view"
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
