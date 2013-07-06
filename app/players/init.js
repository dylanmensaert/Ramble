define([
    "App", "players/main/route", "players/main/controller", "players/main/view", "players/create/route", "players/create/controller", "players/create/view"
], function (App, PlayersRoute, PlayersController, PlayersView, PlayersCreateRoute, PlayersCreateController, PlayersCreateView) {
    "use strict";

    return {
        initialize : function () {
            App.PlayersRoute = PlayersRoute;
            App.PlayersController = PlayersController;
            App.PlayersView = PlayersView;

            App.PlayersCreateRoute = PlayersCreateRoute;
            App.PlayersCreateController = PlayersCreateController;
            App.PlayersCreateView = PlayersCreateView;
        }
    };
});
