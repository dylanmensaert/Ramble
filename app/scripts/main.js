(function () {
    "use strict";

    require.config({
        paths : {
            //RequireJS-plugins
            domReady : "../../bower_components/requirejs-domready/domReady",
            text : "../../bower_components/requirejs-text/text",

            //frameworks
            Ember : "../../bower_components/ember/ember",
            EmberData : "../../bower_components/ember-data-shim/ember-data",
            Handlebars : "../../bower_components/handlebars/handlebars",
            jQuery : "../../bower_components/jquery/jquery",
            Bootstrap : "../../bower_components/components-bootstrap/js/bootstrap",
            GoogleAnalytics : "https://ssl.google-analytics.com/ga",

            //app
            root : ".",
            App : "app",
            data : "../data"
        },
        shim : {
            Ember : {
                deps : [
                    "jQuery", "Handlebars", "Bootstrap"
                ],
                exports : "Ember"
            },
            EmberData : {
                deps : [
                    "Ember"
                ],
                exports : "DS"
            },
            jQuery : {
                exports : "jQuery"
            },
            Bootstrap : {
                deps : [
                    "jQuery"
                ],
                exports : "jQuery"
            },
            GoogleAnalytics : {
                exports : "_gaq"
            }
        }
    });

    require([
        "root/init", "domReady"
    ], function (App, domReady) {
        domReady(function () {
            App.initialize();

            window.isAppInitialized = true;
        });
    });
}());
