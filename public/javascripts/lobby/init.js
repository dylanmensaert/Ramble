/* jshint maxstatements: false */
define(function (require) {
    "use strict";

    var App = require("App");

    return {
        initialize : function () {
            App.Lobby = require("lobby/model");

            App.LobbyRoute = require("lobby/root/route");
            App.LobbyController = require("lobby/root/controller");
            App.LobbyView = require("lobby/root/view");

            App.LobbyIndexRoute = require("lobby/index/route");
            App.LobbyIndexController = require("lobby/index/controller");
            App.LobbyIndexView = require("lobby/index/view");

            App.LobbyEditRoute = require("lobby/edit/route");
            App.LobbyEditController = require("lobby/edit/controller");
            App.LobbyEditView = require("lobby/edit/view");

            App.LobbyDeleteRoute = require("lobby/delete/route");
            App.LobbyDeleteController = require("lobby/delete/controller");
            App.LobbyDeleteView = require("lobby/delete/view");

            App.LobbyListRoute = require("lobby/list/route");
            App.LobbyListController = require("lobby/list/controller");
            App.LobbyListView = require("lobby/list/view");

            App.LobbyCreateRoute = require("lobby/create/route");
            App.LobbyCreateController = require("lobby/create/controller");
            App.LobbyCreateView = require("lobby/create/view");
        }
    };
});
