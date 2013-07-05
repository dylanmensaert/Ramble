define([
    "App", "lobby/model",
    "lobby/main/route", "lobby/main/controller", "lobby/main/view",
    "lobby/index/route", "lobby/index/controller", "lobby/index/view",
    "lobby/edit/route", "lobby/edit/controller", "lobby/edit/view",
    "lobby/remove/route", "lobby/remove/controller", "lobby/remove/view"
], function (App, Lobby,
             LobbyRoute, LobbyController, LobbyView,
             LobbyIndexRoute, LobbyIndexController, LobbyIndexView,
             LobbyEditRoute, LobbyEditController, LobbyEditView,
             LobbyRemoveRoute, LobbyRemoveController, LobbyRemoveView) {
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

            App.LobbyRemoveRoute = LobbyRemoveRoute;
            App.LobbyRemoveController = LobbyRemoveController;
            App.LobbyRemoveView = LobbyRemoveView;
        }
    };
});
