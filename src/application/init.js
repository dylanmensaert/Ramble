define([
    "App", "application/main/route", "application/main/controller", "application/main/view"
], function (App, ApplicationRoute, ApplicationController, ApplicationView) {
    "use strict";

    return {
        initialize : function () {
            App.ApplicationRoute = ApplicationRoute;
            App.ApplicationController = ApplicationController;
            App.ApplicationView = ApplicationView;
        }
    };
});