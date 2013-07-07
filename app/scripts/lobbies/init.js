define([
    "App",
    "lobbies/root/route", "lobbies/root/controller", "lobbies/root/view",
    "lobbies/index/route", "lobbies/index/controller", "lobbies/index/view",
    "lobbies/create/route", "lobbies/create/controller", "lobbies/create/view"
], function (App, Route, Controller, View, IndexRoute, IndexController, IndexView, CreateRoute, CreateController, CreateView) {
    "use strict";

    return {
        initialize : function () {
            App.LobbiesRoute = Route;
            App.LobbiesController = Controller;
            App.LobbiesView = View;

            App.LobbiesIndexRoute = IndexRoute;
            App.LobbiesIndexController = IndexController;
            App.LobbiesIndexView = IndexView;

            App.LobbiesCreateRoute = CreateRoute;
            App.LobbiesCreateController = CreateController;
            App.LobbiesCreateView = CreateView;
        }
    };
});
