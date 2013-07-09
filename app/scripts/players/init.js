define([
    "App",
    "players/root/route", "players/root/controller", "players/root/view",
    "players/index/route", "players/index/controller", "players/index/view"
], function (App, Route, Controller, View, IndexRoute, IndexController, IndexView) {
    "use strict";

    return {
        initialize : function () {
            App.PlayersRoute = Route;
            App.PlayersController = Controller;
            App.PlayersView = View;

            App.PlayersIndexRoute = IndexRoute;
            App.PlayersIndexController = IndexController;
            App.PlayersIndexView = IndexView;
        }
    };
});
