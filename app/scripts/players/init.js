define([
    "App",
    "players/root/route", "players/root/controller", "players/root/view",
    "players/create/route", "players/create/controller", "players/create/view"
], function (App, Route, Controller, View, CreateRoute, CreateController, CreateView) {
    "use strict";

    return {
        initialize : function () {
            App.PlayersRoute = Route;
            App.PlayersController = Controller;
            App.PlayersView = View;

            App.PlayersCreateRoute = CreateRoute;
            App.PlayersCreateController = CreateController;
            App.PlayersCreateView = CreateView;
        }
    };
});
