define([
    "App", "Lobby", "LobbyRoute", "LobbyController", "LobbyView", "LobbiesRoute", "LobbiesController", "LobbiesView"
], function (App, Lobby, LobbyRoute, LobbyController, LobbyView, LobbiesRoute, LobbiesController, LobbiesView) {
    "use strict";

    return {
        initialize : function () {
            App.Lobby = Lobby;

            App.Lobby.FIXTURES = App.data.lobbies;

            App.LobbyRoute = LobbyRoute;
            App.LobbyController = LobbyController;
            App.LobbyView = LobbyView;

            App.LobbiesRoute = LobbiesRoute;
            App.LobbiesController = LobbiesController;
            App.LobbiesView = LobbiesView;
        }
    };
});
