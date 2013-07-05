define([
    "App", "players/main/route", "players/main/controller", "players/main/view", "players/add/route", "players/add/controller", "players/add/view"
], function (App, PlayersRoute, PlayersController, PlayersView, PlayersAddRoute, PlayersAddController, PlayersAddView) {
    "use strict";

    return {
        initialize : function () {
            App.PlayersRoute = PlayersRoute;
            App.PlayersController = PlayersController;
            App.PlayersView = PlayersView;

            App.PlayersAddRoute = PlayersAddRoute;
            App.PlayersAddController = PlayersAddController;
            App.PlayersAddView = PlayersAddView;
        }
    };
});
