define([
    "App", "lobby/model",
    "lobby/root/route", "lobby/root/controller", "lobby/root/view",
    "lobby/index/route", "lobby/index/controller", "lobby/index/view",
    "lobby/edit/route", "lobby/edit/controller", "lobby/edit/view",
    "lobby/delete/route", "lobby/delete/controller", "lobby/delete/view"
], function (App, Lobby, Route, Controller, View, IndexRoute, IndexController, IndexView, EditRoute, EditController, EditView, DeleteRoute, DeleteController, DeleteView) {
    "use strict";

    return {
        initialize : function () {
            App.Lobby = Lobby;

            App.Lobby.FIXTURES = App.data.lobbies;

            App.LobbyRoute = Route;
            App.LobbyController = Controller;
            App.LobbyView = View;

            App.LobbyIndexRoute = IndexRoute;
            App.LobbyIndexController = IndexController;
            App.LobbyIndexView = IndexView;

            App.LobbyEditRoute = EditRoute;
            App.LobbyEditController = EditController;
            App.LobbyEditView = EditView;

            App.LobbyDeleteRoute = DeleteRoute;
            App.LobbyDeleteController = DeleteController;
            App.LobbyDeleteView = DeleteView;
        }
    };
});
