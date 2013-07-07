define([
    "App", "text!data/config.json", "text!data/data.json", "root/router",
    "application/init", "index/init", "login/init", "lobby/init", "lobbies/init", "player/init", "players/init"
], function (App, config, data, Router, Application, Index, Login, Lobby, Lobbies, Player, Players) {
    "use strict";

    return {
        initialize : function () {
            App.config = JSON.parse(config);
            App.data = JSON.parse(data);

            Router.initialize();

            Application.initialize();
            Index.initialize();
            Login.initialize();
            Lobby.initialize();
            Lobbies.initialize();
            Player.initialize();
            Players.initialize();

            App.advanceReadiness();
        }
    };
});
