/* jshint browser: true, maxstatements: false */
define(function (require) {
    "use strict";

    var App = require("App");

    return {
        initialize: function () {
            require("templates");

            require("app/presentation").initialize();
            require("app/models").initialize();
            require("app/router").initialize();

            require("application/init").initialize();
            require("index/init").initialize();
            require("login/init").initialize();
            require("lobby/init").initialize();
            require("player/init").initialize();

            App.advanceReadiness();

            //TODO: Is needed to run tests in Phantom.js with Jasmine?
            window.isAppInitialized = true;
        }
    };
});
