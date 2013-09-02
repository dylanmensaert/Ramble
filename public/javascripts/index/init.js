define(function (require) {
    "use strict";

    var App = require("App");

    return {
        initialize: function () {
            App.IndexRoute = require("index/root/route");
            App.IndexController = require("index/root/controller");
        }
    };
});
