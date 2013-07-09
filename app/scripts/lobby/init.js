define([
    "App", "lobby/model",
    "lobby/root/route", "lobby/root/controller", "lobby/root/view",
    "lobby/index/route", "lobby/index/controller", "lobby/index/view",
    "lobby/create/route", "lobby/create/controller", "lobby/create/view",
    "lobby/edit/route", "lobby/edit/controller", "lobby/edit/view",
    "lobby/delete/route", "lobby/delete/controller", "lobby/delete/view",
    "lobby/list/route", "lobby/list/controller", "lobby/list/view"
], function (App, Lobby, Route, Controller, View, IndexRoute, IndexController, IndexView, CreateRoute, CreateController, CreateView, EditRoute, EditController, EditView, DeleteRoute, DeleteController, DeleteView, ListRoute, ListController, ListView) {
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

            App.LobbyCreateRoute = CreateRoute;
            App.LobbyCreateController = CreateController;
            App.LobbyCreateView = CreateView;

            App.LobbyEditRoute = EditRoute;
            App.LobbyEditController = EditController;
            App.LobbyEditView = EditView;

            App.LobbyDeleteRoute = DeleteRoute;
            App.LobbyDeleteController = DeleteController;
            App.LobbyDeleteView = DeleteView;

            App.LobbyListRoute = ListRoute;
            App.LobbyListController = ListController;
            App.LobbyListView = ListView;
        }
    };
});
