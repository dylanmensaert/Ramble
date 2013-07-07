define([
    "App", "player/model",
    "player/root/route", "player/root/controller", "player/root/view",
    "player/index/route", "player/index/controller", "player/index/view",
    "player/edit/route", "player/edit/controller", "player/edit/view",
    "player/delete/route", "player/delete/controller", "player/delete/view"
], function (App, Player, Route, Controller, View, IndexRoute, IndexController, IndexView, EditRoute, EditController, EditView, DeleteRoute, DeleteController, DeleteView) {
    "use strict";

    return {
        initialize : function () {
            App.Player = Player;

            App.Player.FIXTURES = App.data.players;

            App.PlayerRoute = Route;
            App.PlayerController = Controller;
            App.PlayerView = View;

            App.PlayerIndexRoute = IndexRoute;
            App.PlayerIndexController = IndexController;
            App.PlayerIndexView = IndexView;

            App.PlayerEditRoute = EditRoute;
            App.PlayerEditController = EditController;
            App.PlayerEditView = EditView;

            App.PlayerDeleteRoute = DeleteRoute;
            App.PlayerDeleteController = DeleteController;
            App.PlayerDeleteView = DeleteView;
        }
    };
});
