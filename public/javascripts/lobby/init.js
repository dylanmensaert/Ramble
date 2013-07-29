/* jshint maxstatements: false */
define(function (require) {
    "use strict";

    var App = require("App");

    return {
        initialize : function () {
            App.Lobby = require("lobby/model");

            //TODO: Create API in Express.js
            App.Lobby.FIXTURES = [
                {
                    "id" : 1,
                    "title" : "Game Dylan en Dimitri",
                    "password" : "zonneschijn",
                    "maxMembers" : "5",
                    "owner" : [1],
                    "members" : [2, 3, 5, 8]
                },
                {
                    "id" : 2,
                    "title" : "customgame",
                    "password" : "Peter",
                    "maxMembers" : "7",
                    "owner" : [8],
                    "members" : [4, 9, 3]
                },
                {
                    "id" : 3,
                    "title" : "winners lobby!",
                    "password" : "Dolfijn",
                    "maxMembers" : "12",
                    "owner" : [6],
                    "members" : [5, 3, 8, 1]
                },
                {
                    "id" : 4,
                    "title" : "eten",
                    "password" : "open",
                    "maxMembers" : "7",
                    "owner" : [8],
                    "members" : []
                }
            ];

            App.LobbyRoute = require("lobby/root/route");
            App.LobbyController = require("lobby/root/controller");
            App.LobbyView = require("lobby/root/view");

            App.LobbyIndexRoute = require("lobby/index/route");
            App.LobbyIndexController = require("lobby/index/controller");
            App.LobbyIndexView = require("lobby/index/view");

            App.LobbyCreateRoute = require("lobby/create/route");
            App.LobbyCreateController = require("lobby/create/controller");
            App.LobbyCreateView = require("lobby/create/view");

            App.LobbyEditRoute = require("lobby/edit/route");
            App.LobbyEditController = require("lobby/edit/controller");
            App.LobbyEditView = require("lobby/edit/view");

            App.LobbyDeleteRoute = require("lobby/delete/route");
            App.LobbyDeleteController = require("lobby/delete/controller");
            App.LobbyDeleteView = require("lobby/delete/view");

            App.LobbyListRoute = require("lobby/list/route");
            App.LobbyListController = require("lobby/list/controller");
            App.LobbyListView = require("lobby/list/view");
        }
    };
});
