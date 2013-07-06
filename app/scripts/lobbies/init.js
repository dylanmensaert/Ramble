define([
    "App",
    "lobbies/root/route", "lobbies/root/controller", "lobbies/root/view",
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
