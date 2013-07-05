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
            app : "src",
            App : "src/app",

            // Application
            application : "src/application",
            Application : "src/application/Application",

            // Index
            index : "src/index",
            Index : "src/index/Index",

            // TODO: Simplify folder structure so less aliases are needed? Example: lobby/edit/controller
            // Lobby
            lobby : "src/lobby",
            Lobby : "src/lobby/Lobby",
            LobbyShow : "src/lobby/LobbyShow",
            LobbyEdit : "src/lobby/LobbyEdit",
            LobbyRemove : "src/lobby/LobbyRemove",
            Lobbies : "src/lobby/Lobbies",
            LobbiesAdd : "src/lobby/LobbiesAdd",

            // Player
            player : "src/player",
            Player : "src/player/Player",
            PlayerShow : "src/player/PlayerShow",
            PlayerEdit : "src/player/PlayerEdit",
            PlayerRemove : "src/player/PlayerRemove",
            Players : "src/player/Players",
            PlayersAdd : "src/player/PlayersAdd",

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
        "app/init", "domReady"
    ], function (init, domReady) {
        domReady(function () {
            init.initialize();

            window.isAppInitialized = true;
        });
    });
}());
