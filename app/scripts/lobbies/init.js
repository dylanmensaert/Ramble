define([
    "App",
    "lobbies/main/route", "lobbies/main/controller", "lobbies/main/view",
    "lobbies/create/route", "lobbies/create/controller", "lobbies/create/view"
], function (App, Route, Controller, View, CreateRoute, CreateController, CreateView) {
    "use strict";

    return {
        initialize : function () {
            App.LobbiesRoute = Route;
            App.LobbiesController = Controller;
            App.LobbiesView = View;

            App.LobbiesCreateRoute = CreateRoute;
            App.LobbiesCreateController = CreateController;
            App.LobbiesCreateView = CreateView;
        }
    };
});
