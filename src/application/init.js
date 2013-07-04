define([
    "App", "Application/route", "Application/controller", "Application/view"
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