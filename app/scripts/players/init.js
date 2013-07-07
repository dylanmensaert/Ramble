define([
    "App",
    "players/root/route", "players/root/controller", "players/root/view",
    "players/index/route", "players/index/controller", "players/index/view",
    "players/create/route", "players/create/controller", "players/create/view"
], function (App, Route, Controller, View, IndexRoute, IndexController, IndexView, CreateRoute, CreateController, CreateView) {
    "use strict";

    return {
        initialize : function () {
            App.PlayersRoute = Route;
            App.PlayersController = Controller;
            App.PlayersView = View;

            App.PlayersIndexRoute = IndexRoute;
            App.PlayersIndexController = IndexController;
            App.PlayersIndexView = IndexView;

            App.PlayersCreateRoute = CreateRoute;
            App.PlayersCreateController = CreateController;
            App.PlayersCreateView = CreateView;
        }
    };
});
