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
            ApplicationFolder :  "src/application/Application",

            // Index
            IndexInit : "src/index/IndexInit",
            IndexFolder : "src/index/Index",

            //Lobby
            LobbyInit : "src/lobby/LobbyInit",
            Lobby : "src/lobby/model/Lobby",
            LobbyFolder : "src/lobby/Lobby",
            LobbyEditFolder : "src/lobby/LobbyEdit",
            LobbyRemoveFolder : "src/lobby/LobbyRemove",
            LobbiesFolder : "src/lobby/Lobbies",
            LobbiesAddFolder : "src/lobby/LobbiesAdd",

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
