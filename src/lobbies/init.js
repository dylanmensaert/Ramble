define([
    "App", "lobbies/main/route", "lobbies/main/controller", "lobbies/main/view", "lobbies/add/route", "lobbies/add/controller", "lobbies/add/view"
], function (App, LobbiesRoute, LobbiesController, LobbiesView, LobbiesAddRoute, LobbiesAddController, LobbiesAddView) {
    "use strict";

    return {
        initialize : function () {
            App.LobbiesRoute = LobbiesRoute;
            App.LobbiesController = LobbiesController;
            App.LobbiesView = LobbiesView;

            App.LobbiesAddRoute = LobbiesAddRoute;
            App.LobbiesAddController = LobbiesAddController;
            App.LobbiesAddView = LobbiesAddView;
        }
    };
});
