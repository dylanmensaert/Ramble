/* jshint maxparams: false, maxstatements: false, maxlen: false */
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
