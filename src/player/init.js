define([
    "App", "player/model", "Player/route", "Player/controller", "Player/view",
    "PlayerShow/route", "PlayerShow/controller", "PlayerShow/view",
    "PlayerEdit/route", "PlayerEdit/controller", "PlayerEdit/view",
    "PlayerRemove/route", "PlayerRemove/controller", "PlayerRemove/view",
    "Players/route", "Players/controller", "Players/view",
    "PlayersAdd/route", "PlayersAdd/controller", "PlayersAdd/view"
], function (App, Player, PlayerRoute, PlayerController, PlayerView,
             PlayerShowRoute, PlayerShowController, PlayerShowView,
             PlayerEditRoute, PlayerEditController, PlayerEditView,
             PlayerRemoveRoute, PlayerRemoveController, PlayerRemoveView,
             PlayersRoute, PlayersController, PlayersView,
             PlayersAddRoute, PlayersAddController, PlayersAddView) {
    "use strict";

    return {
        initialize : function () {
            App.Player = Player;

            App.Player.FIXTURES = App.data.players;

            App.PlayerRoute = PlayerRoute;
            App.PlayerController = PlayerController;
            App.PlayerView = PlayerView;

            App.PlayerShowRoute = PlayerShowRoute;
            App.PlayerShowController = PlayerShowController;
            App.PlayerShowView = PlayerShowView;

            App.PlayerEditRoute = PlayerEditRoute;
            App.PlayerEditController = PlayerEditController;
            App.PlayerEditView = PlayerEditView;

            App.PlayerRemoveRoute = PlayerRemoveRoute;
            App.PlayerRemoveController = PlayerRemoveController;
            App.PlayerRemoveView = PlayerRemoveView;

            App.PlayersRoute = PlayersRoute;
            App.PlayersController = PlayersController;
            App.PlayersView = PlayersView;

            App.PlayersAddRoute = PlayersAddRoute;
            App.PlayersAddController = PlayersAddController;
            App.PlayersAddView = PlayersAddView;
        }
    };
});
