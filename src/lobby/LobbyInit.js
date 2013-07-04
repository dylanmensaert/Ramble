define([
    "App", "Lobby", "LobbyFolder/route", "LobbyFolder/controller", "LobbyFolder/view",
    "LobbyEditFolder/route", "LobbyEditFolder/controller", "LobbyEditFolder/view",
    "LobbyRemoveFolder/route", "LobbyRemoveFolder/controller", "LobbyRemoveFolder/view",
    "LobbiesFolder/route", "LobbiesFolder/controller", "LobbiesFolder/view",
    "LobbiesAddFolder/route", "LobbiesAddFolder/controller", "LobbiesAddFolder/view"
], function (App, Lobby, LobbyRoute, LobbyController, LobbyView,
             LobbyEditRoute, LobbyEditController, LobbyEditView,
             LobbyRemoveRoute, LobbyRemoveController, LobbyRemoveView,
             LobbiesRoute, LobbiesController, LobbiesView,
             LobbiesAddRoute, LobbiesAddController, LobbiesAddView) {
    "use strict";

    return {
        initialize : function () {
            App.Lobby = Lobby;

            App.Lobby.FIXTURES = App.data.lobbies;

            App.LobbyRoute = LobbyRoute;
            App.LobbyController = LobbyController;
            App.LobbyView = LobbyView;

            App.LobbyEditRoute = LobbyEditRoute;
            App.LobbyEditController = LobbyEditController;
            App.LobbyEditView = LobbyEditView;

            App.LobbyRemoveRoute = LobbyRemoveRoute;
            App.LobbyRemoveController = LobbyRemoveController;
            App.LobbyRemoveView = LobbyRemoveView;

            App.LobbiesRoute = LobbiesRoute;
            App.LobbiesController = LobbiesController;
            App.LobbiesView = LobbiesView;

            App.LobbiesAddRoute = LobbiesAddRoute;
            App.LobbiesAddController = LobbiesAddController;
            App.LobbiesAddView = LobbiesAddView;
        }
    };
});
