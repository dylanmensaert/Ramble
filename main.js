(function () {
    "use strict";

    require.config({
        paths : {
            //RequireJS-plugins
            domReady : "bower_components/requirejs-domready/domReady",
            text : "bower_components/requirejs-text/text",

            //frameworks
            Ember : "bower_components/ember/ember",
            EmberData : "bower_components/ember-data-shim/ember-data",
            Handlebars : "bower_components/handlebars/handlebars",

            jQuery : "bower_components/jquery/jquery",
            jQueryUI : "bower_components/jquery-ui/ui/jquery-ui",

            Bootstrap : "bower_components/components-bootstrap/js/bootstrap",

            GoogleAnalytics : "https://ssl.google-analytics.com/ga",

            //app
            app : "app",
            App : "app/app",

            //application
            application : "app/application",

            //index
            index : "app/index",

            //lobby
            lobby : "app/lobby",
            lobbies : "app/lobbies",

            //player
            player : "app/player",
            players : "app/players",

            //helpers
            helpers : "app/helpers"
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
        "app/init", "domReady"
    ], function (App, domReady) {
        domReady(function () {
            App.initialize();

            window.isAppInitialized = true;
        });
    });
}());
