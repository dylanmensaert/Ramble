define([
    "App", "player/model",
    "player/main/route", "player/main/controller", "player/main/view",
    "player/index/route", "player/index/controller", "player/index/view",
    "player/edit/route", "player/edit/controller", "player/edit/view",
    "player/delete/route", "player/delete/controller", "player/delete/view"
], function (App, Player,
             PlayerRoute, PlayerController, PlayerView,
             PlayerIndexRoute, PlayerIndexController, PlayerIndexView,
             PlayerEditRoute, PlayerEditController, PlayerEditView,
             PlayerDeleteRoute, PlayerDeleteController, PlayerDeleteView) {
    "use strict";

    return {
        initialize : function () {
            App.Player = Player;

            App.Player.FIXTURES = App.data.players;

            //TODO: Simplify class-names from function, to shorten line?
            App.PlayerRoute = PlayerRoute;
            App.PlayerController = PlayerController;
            App.PlayerView = PlayerView;

            App.PlayerIndexRoute = PlayerIndexRoute;
            App.PlayerIndexController = PlayerIndexController;
            App.PlayerIndexView = PlayerIndexView;

            App.PlayerEditRoute = PlayerEditRoute;
            App.PlayerEditController = PlayerEditController;
            App.PlayerEditView = PlayerEditView;

            App.PlayerDeleteRoute = PlayerDeleteRoute;
            App.PlayerDeleteController = PlayerDeleteController;
            App.PlayerDeleteView = PlayerDeleteView;
        }
    };
});
