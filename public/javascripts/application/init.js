define(function (require) {
    "use strict";

    var App = require("App");

    return {
        initialize: function () {
            App.ApplicationRoute = require("application/root/route");
            App.ApplicationController = require("application/root/controller");
            App.ApplicationView = require("application/root/view");
        }
    };
});
