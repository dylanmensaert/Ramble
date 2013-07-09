define([
    "App", "text!data/config.json", "text!data/data.json", "root/router",
    "application/init", "index/init", "login/init", "signup/init", "lobby/init", "player/init", "players/init",
    "Bootstrap", "EmberEasyForm", "EmberValidations"
], function (App, config, data, Router, Application, Index, Login, Signup, Lobby, Player, Players) {
    "use strict";

    return {
        initialize : function () {
            App.config = JSON.parse(config);
            App.data = JSON.parse(data);

            Router.initialize();

            Application.initialize();
            Index.initialize();
            Login.initialize();
            Signup.initialize();
            Lobby.initialize();
            Player.initialize();
            Players.initialize();

            App.advanceReadiness();
        }
    };
});
