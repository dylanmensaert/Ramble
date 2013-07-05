define([
    "App", "player/model",
    "player/main/route", "player/main/controller", "player/main/view",
    "player/index/route", "player/index/controller", "player/index/view",
    "player/edit/route", "player/edit/controller", "player/edit/view",
    "player/remove/route", "player/remove/controller", "player/remove/view"
], function (App, Player,
             PlayerRoute, PlayerController, PlayerView,
             PlayerIndexRoute, PlayerIndexController, PlayerIndexView,
             PlayerEditRoute, PlayerEditController, PlayerEditView,
             PlayerRemoveRoute, PlayerRemoveController, PlayerRemoveView) {
    "use strict";

    return {
        initialize : function () {
            App.Player = Player;

            App.Player.FIXTURES = App.data.players;

            App.PlayerRoute = PlayerRoute;
            App.PlayerController = PlayerController;
            App.PlayerView = PlayerView;

            App.PlayerIndexRoute = PlayerIndexRoute;
            App.PlayerIndexController = PlayerIndexController;
            App.PlayerIndexView = PlayerIndexView;

            App.PlayerEditRoute = PlayerEditRoute;
            App.PlayerEditController = PlayerEditController;
            App.PlayerEditView = PlayerEditView;

            App.PlayerRemoveRoute = PlayerRemoveRoute;
            App.PlayerRemoveController = PlayerRemoveController;
            App.PlayerRemoveView = PlayerRemoveView;
        }
    };
});
