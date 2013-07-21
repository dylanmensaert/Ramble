define([
    "App", "player/model",
    "player/root/route", "player/root/controller", "player/root/view",
    "player/index/route", "player/index/controller", "player/index/view",
    "player/create/route", "player/create/controller", "player/create/view",
    "player/edit/route", "player/edit/controller", "player/edit/view",
    "player/delete/route", "player/delete/controller", "player/delete/view",
    "player/list/route", "player/list/controller", "player/list/view"
], function (App, Player, Route, Controller, View, IndexRoute, IndexController, IndexView, CreateRoute, CreateController, CreateView, EditRoute, EditController, EditView, DeleteRoute, DeleteController, DeleteView, ListRoute, ListController, ListView) {
    "use strict";

    return {
        initialize : function () {
            App.Player = Player;

            App.Player.FIXTURES = [
                {
                    "id" : 1,
                    "username" : "donut",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [1],
                    "joinedLobbies" : [3]
                },
                {
                    "id" : 2,
                    "username" : "pizaa",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [],
                    "joinedLobbies" : [1]
                },
                {
                    "id" : 3,
                    "username" : "zizima",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [],
                    "joinedLobbies" : [1, 2, 3]
                },
                {
                    "id" : 4,
                    "username" : "madeentje",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [],
                    "joinedLobbies" : [2]
                },
                {
                    "id" : 5,
                    "username" : "cryptex",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [],
                    "joinedLobbies" : [3, 1]
                },
                {
                    "id" : 6,
                    "username" : "heca",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [3],
                    "joinedLobbies" : []
                },
                {
                    "id" : 7,
                    "username" : "bosbes",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [],
                    "joinedLobbies" : []
                },
                {
                    "id" : 8,
                    "username" : "graaaah",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [2, 4],
                    "joinedLobbies" : [3, 1]
                },
                {
                    "id" : 9,
                    "username" : "antiliaan",
                    "email" : "aaaa@gmail.com",
                    "ownedLobbies" : [],
                    "joinedLobbies" : [2]
                }
            ];

            App.PlayerRoute = Route;
            App.PlayerController = Controller;
            App.PlayerView = View;

            App.PlayerIndexRoute = IndexRoute;
            App.PlayerIndexController = IndexController;
            App.PlayerIndexView = IndexView;

            App.PlayerCreateRoute = CreateRoute;
            App.PlayerCreateController = CreateController;
            App.PlayerCreateView = CreateView;

            App.PlayerEditRoute = EditRoute;
            App.PlayerEditController = EditController;
            App.PlayerEditView = EditView;

            App.PlayerDeleteRoute = DeleteRoute;
            App.PlayerDeleteController = DeleteController;
            App.PlayerDeleteView = DeleteView;

            App.PlayerListRoute = ListRoute;
            App.PlayerListController = ListController;
            App.PlayerListView = ListView;
        }
    };
});
