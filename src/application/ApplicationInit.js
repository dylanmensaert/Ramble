define([
    "App", "ApplicationRoute", "ApplicationController", "ApplicationView"
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