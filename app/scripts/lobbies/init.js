define([
    "App", "lobbies/main/route", "lobbies/main/controller", "lobbies/main/view", "lobbies/create/route", "lobbies/create/controller", "lobbies/create/view"
], function (App, LobbiesRoute, LobbiesController, LobbiesView, LobbiesCreateRoute, LobbiesCreateController, LobbiesCreateView) {
    "use strict";

    return {
        initialize : function () {
            App.LobbiesRoute = LobbiesRoute;
            App.LobbiesController = LobbiesController;
            App.LobbiesView = LobbiesView;

            App.LobbiesCreateRoute = LobbiesCreateRoute;
            App.LobbiesCreateController = LobbiesCreateController;
            App.LobbiesCreateView = LobbiesCreateView;
        }
    };
});
