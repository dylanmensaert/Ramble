(function () {
    "use strict";

    require.config({
        paths : {
            // RequireJS-plugins
            domReady : "bower_components/requirejs-domready/domReady",
            text : "bower_components/requirejs-text/text",

            // Frameworks
            Ember : "bower_components/ember/ember",
            EmberData : "bower_components/ember-data-shim/ember-data",
            Handlebars : "bower_components/handlebars/handlebars",

            jQuery : "bower_components/jquery/jquery",
            jQueryUI : "bower_components/jquery-ui/ui/jquery-ui",

            Bootstrap : "bower_components/components-bootstrap/js/bootstrap",

            GoogleAnalytics : "https://ssl.google-analytics.com/ga",

            // App
            App : "src/App",
            AppInit : "src/AppInit",
            RouterInit : "src/RouterInit",

            // Application
            ApplicationInit : "src/application/ApplicationInit",
            // Routes
            ApplicationRoute : "src/application/route/ApplicationRoute",
            // Controllers
            ApplicationController : "src/application/controller/ApplicationController",
            // Views
            ApplicationView : "src/application/view/ApplicationView",
            // Templates
            ApplicationTemplate : "src/application/template",

            // Index
            IndexInit : "src/index/IndexInit",
            // Routes
            IndexRoute : "src/index/route/IndexRoute",
            // Controllers
            IndexController : "src/index/controller/IndexController",
            // Views
            IndexView : "src/index/view/IndexView",
            // Templates
            IndexTemplate : "src/index/template",

            // Lobby
            LobbyInit : "src/lobby/LobbyInit",
            // Routes
            LobbyRoute : "src/lobby/route/LobbyRoute",
            LobbiesRoute : "src/lobby/route/LobbiesRoute",
            // Models
            Lobby : "src/lobby/model/Lobby",
            // Controllers
            LobbyController : "src/lobby/controller/LobbyController",
            LobbiesController : "src/lobby/controller/LobbiesController",
            // Views
            LobbyView : "src/lobby/view/LobbyView",
            LobbiesView : "src/lobby/view/LobbiesView",
            // Templates
            LobbyTemplate : "src/lobby/template",

            // Helpers
            SomeHelper : "src/helpers/SomeHelper"
        },
        shim : {
            jQuery : {
                exports : "jQuery"
            },
            jQueryUI : {
                deps : [
                    "jQuery"
                ],
                exports : "jQuery"
            },
            Bootstrap : {
                deps : [
                    "jQuery"
                ],
                exports : "jQuery"
            },
            Ember : {
                deps : [
                    "jQuery", "Handlebars", "Bootstrap", "jQueryUI"
                ],
                exports : "Ember"
            },
            EmberData : {
                deps : [
                    "Ember"
                ],
                exports : "DS"
            },
            GoogleAnalytics : {
                exports : "_gaq"
            }
        }
    });

    require([
        "AppInit", "domReady"
    ], function (AppInit, domReady) {
        domReady(function () {
            AppInit.initialize();

            window.isAppInitialized = true;
        });
    });
}());
