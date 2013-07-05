define([
    "App", "lobby/model",
    "lobby/main/route", "lobby/main/controller", "lobby/main/view",
    "lobby/index/route", "lobby/index/controller", "lobby/index/view",
    "lobby/edit/route", "lobby/edit/controller", "lobby/edit/view",
    "lobby/delete/route", "lobby/delete/controller", "lobby/delete/view"
], function (App, Lobby,
             LobbyRoute, LobbyController, LobbyView,
             LobbyIndexRoute, LobbyIndexController, LobbyIndexView,
             LobbyEditRoute, LobbyEditController, LobbyEditView,
             LobbyDeleteRoute, LobbyDeleteController, LobbyDeleteView) {
    "use strict";

    return {
        initialize : function () {
            App.Lobby = Lobby;

            App.Lobby.FIXTURES = App.data.lobbies;

            App.LobbyRoute = LobbyRoute;
            App.LobbyController = LobbyController;
            App.LobbyView = LobbyView;

            App.LobbyIndexRoute = LobbyIndexRoute;
            App.LobbyIndexController = LobbyIndexController;
            App.LobbyIndexView = LobbyIndexView;

            App.LobbyEditRoute = LobbyEditRoute;
            App.LobbyEditController = LobbyEditController;
            App.LobbyEditView = LobbyEditView;

            App.LobbyDeleteRoute = LobbyDeleteRoute;
            App.LobbyDeleteController = LobbyDeleteController;
            App.LobbyDeleteView = LobbyDeleteView;
        }
    };
});
