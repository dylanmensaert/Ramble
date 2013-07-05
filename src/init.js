define([
    "App", "text!config.json", "text!data.json", "app/router", "application/init", "index/init", "lobby/init", "lobbies/init", "player/init"
], function (App, config, data, Router, Application, Index, Lobby, Lobbies, Player) {
    "use strict";

    return {
        initialize : function () {
            App.config = JSON.parse(config);
            App.data = JSON.parse(data);

            Router.initialize();
            Application.initialize();
            Index.initialize();
            Lobby.initialize();
            Lobbies.initialize();
            Player.initialize();

            App.advanceReadiness();
        }
    };
});
