define([
    "App", "text!config.json", "text!data.json", "app/router", "application/init", "index/init", "lobby/init"
], function (App, config, data, Router, Application, Index, Lobby) {
    "use strict";

    return {
        initialize : function () {
            App.config = JSON.parse(config);
            App.data = JSON.parse(data);

            Router.initialize();
            Application.initialize();
            Index.initialize();
            Lobby.initialize();

            App.advanceReadiness();
        }
    };
});
